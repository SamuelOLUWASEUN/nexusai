import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "placeholder", {
  apiVersion: "2024-04-10",
});

const PRICE_IDS: Record<string, { monthly: string; annual: string }> = {
  pro: {
    monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID || "",
    annual:  process.env.STRIPE_PRO_ANNUAL_PRICE_ID  || "",
  },
  enterprise: {
    monthly: process.env.STRIPE_ENT_MONTHLY_PRICE_ID || "",
    annual:  process.env.STRIPE_ENT_ANNUAL_PRICE_ID  || "",
  },
};

export async function POST(request: Request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    const supabase  = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { plan, billing } = await request.json();
    if (!plan || !PRICE_IDS[plan]) return NextResponse.json({ error: "Invalid plan" }, { status: 400 });

    const priceId = PRICE_IDS[plan][billing === "annual" ? "annual" : "monthly"];
    const appUrl  = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id, email, full_name")
      .eq("id", user.id)
      .single();

    let customerId = profile?.stripe_customer_id;

    if (!customerId) {
      const customer = await stripe.customers.create({
        email:    profile?.email || user.email || "",
        name:     profile?.full_name || "",
        metadata: { supabase_user_id: user.id },
      });
      customerId = customer.id;
      await supabase.from("profiles").update({ stripe_customer_id: customerId }).eq("id", user.id);
    }

    const session = await stripe.checkout.sessions.create({
      customer:             customerId,
      mode:                 "subscription",
      payment_method_types: ["card"],
      line_items:           [{ price: priceId, quantity: 1 }],
      success_url:          `${appUrl}/dashboard?upgrade=success&plan=${plan}`,
      cancel_url:           `${appUrl}/pricing?upgrade=cancelled`,
      subscription_data:    { trial_period_days: 14, metadata: { supabase_user_id: user.id, plan } },
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: error?.message || "Failed to create checkout" }, { status: 500 });
  }
}