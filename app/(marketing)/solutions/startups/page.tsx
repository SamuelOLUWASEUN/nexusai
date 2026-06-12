import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, Zap, Users, Clock, TrendingUp } from "lucide-react";

export const metadata: Metadata = { title: "Sypora AI for Startups" };

const painPoints = [
  { icon: Clock,      title: "Hours lost to context switching",       desc: "Your team switches between 6+ tools daily. Every switch costs focus time. Sypora makes one query search all of them." },
  { icon: Users,      title: "New hires take weeks to ramp up",       desc: "Without a single source of truth, onboarding means interrupting senior engineers. Sypora gives new hires answers instantly." },
  { icon: TrendingUp, title: "Decisions made without full context",   desc: "Important decisions get made before someone finds the relevant Slack thread from 3 months ago. Sypora surfaces it first." },
  { icon: Zap,        title: "Founders drowning in admin writing",    desc: "Investor updates, all-hands recaps, customer emails — Sypora drafts them all using your real company data." },
];

const results = [
  { metric: "87%",      label: "Faster new hire onboarding"   },
  { metric: "3h/week",  label: "Saved per founder"            },
  { metric: "4× faster",label: "Customer support resolution"  },
  { metric: "< 4 min",  label: "Average setup time"           },
];

const workflow = [
  { step: "01", title: "Connect in 4 minutes",   desc: "Link Slack, Notion, GitHub and your other tools with one-click OAuth. No engineering work, no IT tickets." },
  { step: "02", title: "Ask your first question", desc: "Type naturally — 'What did we decide about the pricing change last month?' Sypora finds the answer across all your tools." },
  { step: "03", title: "Share with your team",   desc: "Invite teammates, set permissions and watch your entire team start saving hours every day." },
];

export default function StartupsPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <div className="section-tag mx-auto">For Startups</div>
        <h1 className="font-display text-5xl md:text-6xl font-semibold text-navy-900 dark:text-cream-50 leading-tight tracking-tight mb-5">
          Move fast without
          <br />
          <span className="italic text-accent-blue">losing context.</span>
        </h1>
        <p className="section-sub mx-auto text-center mb-10">
          Small teams can't afford to waste hours searching for information. Sypora connects your tools and makes your entire company's knowledge instantly searchable — so your team can stay focused on building.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup" className="btn-primary text-base px-8 py-3.5">
            Start free — no credit card <ArrowRight size={16} />
          </Link>
          <Link href="/contact?type=demo" className="btn-secondary text-base px-8 py-3.5">
            Book a 20-min demo
          </Link>
        </div>
      </div>

      {/* Results */}
      <div className="bg-navy-900 dark:bg-navy-800 py-14 px-4 mb-20">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {results.map((r, i) => (
            <div key={i}>
              <div className="font-display text-3xl font-semibold text-white mb-1">{r.metric}</div>
              <div className="font-body text-sm text-cream-400">{r.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pain points */}
      <div className="max-w-6xl mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          <h2 className="section-title">The problems every startup knows.</h2>
          <p className="section-sub mx-auto text-center">Sypora solves the knowledge problems that slow every growing team down.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {painPoints.map((point, i) => (
            <div key={i} className="card p-7 flex items-start gap-5">
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center flex-shrink-0">
                <point.icon size={18} className="text-accent-blue" />
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-navy-900 dark:text-cream-100 mb-2">{point.title}</h3>
                <p className="font-body text-sm text-navy-500 dark:text-cream-400 leading-relaxed">{point.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How it works for startups */}
      <div className="bg-navy-50 dark:bg-navy-900/50 py-20 px-4 mb-20 border-y border-navy-100 dark:border-navy-800">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-title">Up and running before lunch.</h2>
          </div>
          <div className="space-y-6">
            {workflow.map((step, i) => (
              <div key={i} className="flex items-start gap-6 card p-6">
                <span className="font-mono text-3xl font-bold text-navy-100 dark:text-navy-700 flex-shrink-0">{step.step}</span>
                <div>
                  <h3 className="font-display text-xl font-semibold text-navy-900 dark:text-cream-100 mb-2">{step.title}</h3>
                  <p className="font-body text-sm text-navy-500 dark:text-cream-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Startup pricing highlight */}
      <div className="max-w-3xl mx-auto px-4 mb-20">
        <div className="card p-8 text-center border-accent-blue/20 bg-blue-50/30 dark:bg-blue-950/10">
          <div className="font-mono text-xs text-accent-blue tracking-widest uppercase mb-3">Startup-friendly pricing</div>
          <div className="font-display text-4xl font-semibold text-navy-900 dark:text-cream-100 mb-1">Free to start</div>
          <p className="font-body text-navy-500 dark:text-cream-400 mb-6">
            The Starter plan is completely free forever. Upgrade to Pro at $49/month when you're ready for unlimited queries and all integrations.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {["No credit card", "Free forever plan", "14-day Pro trial", "Cancel anytime"].map(item => (
              <div key={item} className="flex items-center gap-2">
                <Check size={14} className="text-green-600 dark:text-green-400" />
                <span className="font-body text-sm text-navy-600 dark:text-cream-300">{item}</span>
              </div>
            ))}
          </div>
          <Link href="/signup" className="btn-primary">
            Get started free <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
