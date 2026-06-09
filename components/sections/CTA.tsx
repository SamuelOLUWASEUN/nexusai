import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTA() {
  return (
    <section className="section bg-cream-50 dark:bg-navy-950">
      <div className="container">
        <div className="relative rounded-3xl bg-navy-900 dark:bg-navy-800 overflow-hidden px-8 py-20 text-center">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-grid-white bg-[size:40px_40px] opacity-30" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-accent-blue/20 blur-3xl rounded-full" />
          <div className="absolute bottom-0 left-1/4 w-64 h-32 bg-accent-indigo/15 blur-3xl rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-64 h-32 bg-blue-500/10 blur-3xl rounded-full" />

          <div className="relative z-10 max-w-2xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-cream-300 font-mono text-xs font-medium mb-6">
              <Sparkles size={12} className="text-accent-blue" />
              Start free — no credit card required
            </div>

            <h2 className="font-display text-4xl md:text-5xl font-semibold text-white leading-tight tracking-tight mb-5">
              Your team is losing
              <br />
              <span className="italic text-accent-blue">2.8 hours a day.</span>
            </h2>

            <p className="font-body text-lg text-cream-400 leading-relaxed mb-10 max-w-xl mx-auto">
              Every day your team spends searching for information, writing status updates and sitting in alignment meetings is a day Nexus could give back. Start today — results in your first week, guaranteed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link href="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-white text-navy-900 font-body font-semibold text-base hover:bg-cream-100 transition-all shadow-lg hover:shadow-xl">
                Get started free <ArrowRight size={16} />
              </Link>
              <Link href="/contact?type=demo" className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/20 text-white font-body font-medium text-base hover:bg-white/5 hover:border-white/30 transition-all">
                Book a live demo
              </Link>
            </div>

            {/* Trust row */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {[
                "✓ Free forever plan",
                "✓ 14-day Pro trial",
                "✓ SOC 2 certified",
                "✓ Cancel anytime",
              ].map((item) => (
                <span key={item} className="font-body text-sm text-cream-400">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
