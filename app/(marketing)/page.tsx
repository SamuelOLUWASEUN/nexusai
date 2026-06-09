import { Hero }         from "@/components/sections/Hero";
import { LogoBar }      from "@/components/sections/LogoBar";
import { HowItWorks }   from "@/components/sections/HowItWorks";
import { Features }     from "@/components/sections/Features";
import { UseCases }     from "@/components/sections/UseCases";
import { Integrations } from "@/components/sections/Integrations";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing }      from "@/components/sections/Pricing";
import { FAQ }          from "@/components/sections/FAQ";
import { Waitlist }     from "@/components/sections/Waitlist";
import { CTA }          from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoBar />
      <HowItWorks />
      <Features />
      <UseCases />
      <Integrations />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Waitlist />
      <CTA />
    </>
  );
}
