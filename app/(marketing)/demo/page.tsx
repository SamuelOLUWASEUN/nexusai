import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export const metadata: Metadata = { title: "See a Demo" };

export default function DemoPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="section-tag mx-auto">Live Demo</div>
          <h1 className="section-title">See Sypora AI in action.</h1>
          <p className="section-sub mx-auto text-center mb-8">
            Watch how teams use Sypora to find answers, summarize meetings and draft documents — in under 3 minutes.
          </p>
        </div>

        {/* Video placeholder */}
        <div className="relative rounded-3xl overflow-hidden bg-navy-900 dark:bg-navy-800 border border-navy-700 aspect-video mb-16 group cursor-pointer hover:border-accent-blue/40 transition-all shadow-navy">
          <div className="absolute inset-0 bg-grid-white bg-[size:40px_40px] opacity-20" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-48 bg-accent-blue/15 rounded-full blur-3xl" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
            <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all">
              <Play size={28} className="text-white ml-1" fill="white" />
            </div>
            <p className="font-body text-cream-300 text-sm">Watch 3-minute product demo</p>
          </div>
          <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 h-1 bg-white/10 rounded-full">
              <div className="w-0 h-full bg-accent-blue rounded-full" />
            </div>
            <span className="font-mono text-xs text-cream-500">3:12</span>
          </div>
        </div>

        {/* Demo highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {[
            { time: "0:00", title: "Connect in 60 seconds",    desc: "Watch how Sypora connects to Slack, Notion and GitHub with one-click OAuth — no engineering required." },
            { time: "1:20", title: "Ask your first question",  desc: "See how natural language search works across all connected tools simultaneously with cited sources." },
            { time: "2:30", title: "Auto-generate a summary",  desc: "Watch Sypora draft a full sprint update from Linear tickets and Slack messages in under 30 seconds." },
          ].map((item, i) => (
            <div key={i} className="card p-5 cursor-pointer hover:border-accent-blue/30 transition-all">
              <span className="font-mono text-xs text-accent-blue bg-accent-blue/10 px-2 py-0.5 rounded border border-accent-blue/20 mb-3 inline-block">{item.time}</span>
              <h3 className="font-display font-semibold text-navy-900 dark:text-cream-100 mb-2">{item.title}</h3>
              <p className="font-body text-sm text-navy-500 dark:text-cream-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Try it yourself CTA */}
        <div className="card p-10 text-center">
          <h2 className="font-display text-3xl font-semibold text-navy-900 dark:text-cream-100 mb-3">
            Ready to try it yourself?
          </h2>
          <p className="font-body text-navy-500 dark:text-cream-400 mb-8 max-w-lg mx-auto leading-relaxed">
            The fastest way to understand Sypora is to use it. Start for free in 4 minutes — no demo call required, no credit card needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup" className="btn-primary text-base px-8 py-3.5">
              Start for free <ArrowRight size={16} />
            </Link>
            <Link href="/contact?type=demo" className="btn-secondary text-base px-8 py-3.5">
              Book a live walkthrough
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
