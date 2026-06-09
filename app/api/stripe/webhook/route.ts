import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

async function getStripe() {
  const Stripe = (await import("stripe")).default;
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-04-10" });
}

export async function POST(request: Request) {
  const body      = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: any;

  try {
    const stripe = await getStripe();
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createClient();

  try {
    switch (event.type) {

      // ── Subscription created / updated ──────────────────────────
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const subscription = event.data.object;
        const userId       = subscription.metadata?.supabase_user_id;
        const plan         = subscription.metadata?.plan || "pro";

        if (userId) {
          const status = subscription.status;
          const newPlan = status === "active" || status === "trialing" ? plan : "free";

          await supabase
            .from("profiles")
            .update({
              plan,
              stripe_subscription_id:     subscription.id,
              stripe_subscription_status: status,
            })
            .eq("id", userId);
        }
        break;
      }

      // ── Subscription deleted / cancelled ────────────────────────
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const userId       = subscription.metadata?.supabase_user_id;

        if (userId) {
          await supabase
            .from("profiles")
            .update({
              plan:                       "free",
              stripe_subscription_id:     null,
              stripe_subscription_status: "cancelled",
            })
            .eq("id", userId);
        }
        break;
      }

      // ── Payment succeeded ────────────────────────────────────────
      case "invoice.payment_succeeded": {
        const invoice  = event.data.object;
        const customerId = invoice.customer;

        const { data: profile } = await supabase
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profile) {
          await supabase.from("billing_events").insert({
            user_id:    profile.id,
            event_type: "payment_succeeded",
            amount:     invoice.amount_paid,
            currency:   invoice.currency,
            invoice_id: invoice.id,
          });
        }
        break;
      }

      // ── Payment failed ───────────────────────────────────────────
      case "invoice.payment_failed": {
        const invoice    = event.data.object;
        const customerId = invoice.customer;

        const { data: profile } = await supabase
          .from("profiles")
          .select("id, email")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profile) {
          await supabase.from("billing_events").insert({
            user_id:    profile.id,
            event_type: "payment_failed",
            amount:     invoice.amount_due,
            currency:   invoice.currency,
            invoice_id: invoice.id,
          });
        }
        break;
      }

      default:
        // Unhandled event type — safe to ignore
        break;
    }
  } catch (error: any) {
    console.error("Webhook handler error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
