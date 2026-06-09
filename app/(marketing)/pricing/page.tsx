import type { Metadata } from "next";
import { Pricing } from "@/components/sections/Pricing";
import { FAQ }     from "@/components/sections/FAQ";
import { CTA }     from "@/components/sections/CTA";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <div className="pt-16">
      <Pricing />
      <FAQ />
      <CTA />
    </div>
  );
}
