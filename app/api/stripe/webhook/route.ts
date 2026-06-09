import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "placeholder", {
  apiVersion: "2024-04-10",
});

export async function POST(request: Request) {
  const body      = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err: any) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const supabase = createClient();

  try {
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        const sub    = event.data.object as Stripe.Subscription;
        const userId = sub.metadata?.supabase_user_id;
        const plan   = sub.metadata?.plan || "pro";
        if (userId) {
          await supabase.from("profiles").update({
            plan,
            stripe_subscription_id:     sub.id,
            stripe_subscription_status: sub.status,
          }).eq("id", userId);
        }
        break;
      }
      case "customer.subscription.deleted": {
        const sub    = event.data.object as Stripe.Subscription;
        const userId = sub.metadata?.supabase_user_id;
        if (userId) {
          await supabase.from("profiles").update({
            plan:                       "free",
            stripe_subscription_id:     null,
            stripe_subscription_status: "cancelled",
          }).eq("id", userId);
        }
        break;
      }
    }
  } catch (error: any) {
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}