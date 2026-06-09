import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

async function getStripe() {
  const Stripe = (await import("stripe")).default;
  return new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-04-10" });
}

export async function POST() {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("stripe_customer_id")
      .eq("id", user.id)
      .single();

    if (!profile?.stripe_customer_id) {
      return NextResponse.json({ error: "No billing account found" }, { status: 404 });
    }

    const stripe  = await getStripe();
    const appUrl  = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const session = await stripe.billingPortal.sessions.create({
      customer:   profile.stripe_customer_id,
      return_url: `${appUrl}/dashboard`,
    });

    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error("Portal error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to open billing portal" },
      { status: 500 }
    );
  }
}
