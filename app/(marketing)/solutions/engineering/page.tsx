import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, GitBranch, AlertTriangle, BookOpen, Check } from "lucide-react";

export const metadata: Metadata = { title: "Nexus AI for Engineering" };

const engineeringFeatures = [
  {
    icon: AlertTriangle,
    title: "Faster incident response",
    desc: "When something breaks at 2am, Nexus surfaces past incidents, relevant runbooks and related Slack threads instantly. Get to context in seconds, not 40 minutes.",
    stat: "40% faster resolution",
  },
  {
    icon: GitBranch,
    title: "Code review context",
    desc: "Link every PR to the original Slack discussion, Linear ticket and Notion spec that motivated it. Reviewers understand decisions without blocking comment threads.",
    stat: "60% fewer blocking comments",
  },
  {
    icon: BookOpen,
    title: "Living documentation",
    desc: "Ask Nexus where the architecture diagram is, what the deployment process for service X is, or why a particular technical decision was made. No more 'ask Alice'.",
    stat: "90% of doc searches answered",
  },
  {
    icon: Code2,
    title: "Sprint retrospectives in 30s",
    desc: "Nexus generates full sprint summaries with velocity data, blockers, highlights and action items automatically — from your Linear, GitHub and Slack data.",
    stat: "2h prep → 30 seconds",
  },
];

export default function EngineeringPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <div className="section-tag mx-auto">For Engineering</div>
        <h1 className="font-display text-5xl md:text-6xl font-semibold text-navy-900 dark:text-cream-50 leading-tight tracking-tight mb-5">
          Ship faster with
          <br />
          <span className="italic text-accent-blue">less friction.</span>
        </h1>
        <p className="section-sub mx-auto text-center mb-10">
          Give your engineering team an AI that understands your codebase, your history and your processes. Less time searching, more time building.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup" className="btn-primary text-base px-8 py-3.5">
            Get started free <ArrowRight size={16} />
          </Link>
          <Link href="/contact?type=demo" className="btn-secondary text-base px-8 py-3.5">
            Book a demo
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-6xl mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          <h2 className="section-title">Built around how engineers actually work.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {engineeringFeatures.map((f, i) => (
            <div key={i} className="card p-7">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/30 flex items-center justify-center flex-shrink-0">
                  <f.icon size={18} className="text-accent-teal" />
                </div>
                <span className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-mono text-xs font-medium border border-green-100 dark:border-green-900">
                  {f.stat}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold text-navy-900 dark:text-cream-100 mb-2">{f.title}</h3>
              <p className="font-body text-sm text-navy-500 dark:text-cream-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Integrations relevant to engineers */}
      <div className="bg-navy-50 dark:bg-navy-900/50 py-16 px-4 mb-20 border-y border-navy-100 dark:border-navy-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="section-title">Connects to your entire engineering stack.</h2>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {["GitHub", "GitLab", "Linear", "Jira", "Confluence", "Notion", "Slack", "PagerDuty", "Datadog", "Sentry", "Loom", "Zoom"].map(tool => (
              <span key={tool} className="px-4 py-2 rounded-xl card font-body text-sm text-navy-600 dark:text-cream-300 font-medium">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* What engineering teams say */}
      <div className="max-w-3xl mx-auto px-4 mb-20">
        <div className="card p-8">
          <div className="flex gap-1 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 14 14" fill="#FBBF24">
                <path d="M7 1l1.5 4.5H13L9.5 8l1.5 4L7 9.5 3 12l1.5-4L1 5.5h4.5L7 1z"/>
              </svg>
            ))}
          </div>
          <blockquote className="font-body text-lg text-navy-700 dark:text-cream-200 leading-relaxed mb-6 italic">
            "We had an incident at 3am. Engineer on call found the root cause and relevant runbook in 4 minutes using Nexus. Previously that would have taken 45 minutes of Slack searching and waking people up."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center text-white font-bold text-sm">AL</div>
            <div>
              <p className="font-body font-semibold text-navy-900 dark:text-cream-100 text-sm">Amara Levi</p>
              <p className="font-body text-xs text-navy-400 dark:text-cream-500">Head of Engineering at Pulsar</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="card p-10">
          <h2 className="font-display text-3xl font-semibold text-navy-900 dark:text-cream-100 mb-3">
            Give your engineers their time back.
          </h2>
          <p className="font-body text-navy-500 dark:text-cream-400 mb-6 leading-relaxed">
            Free to start. Setup takes 4 minutes. Your team will see the value on day one.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup" className="btn-primary">
              Start for free <ArrowRight size={16} />
            </Link>
            <Link href="/contact?type=demo" className="btn-secondary">
              Book a demo
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            {["No credit card", "14-day Pro trial", "Free forever plan"].map(item => (
              <div key={item} className="flex items-center gap-1.5">
                <Check size={13} className="text-green-600 dark:text-green-400" />
                <span className="font-body text-sm text-navy-500 dark:text-cream-400">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
