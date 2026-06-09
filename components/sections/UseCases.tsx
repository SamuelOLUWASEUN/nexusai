"use client";
import { useState } from "react";
import { Rocket, Building2, Code2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const useCases = [
  {
    id: "startup",
    icon: Rocket,
    label: "Startups",
    headline: "Move fast without losing context.",
    subheadline: "Small teams wear many hats. Nexus makes sure nothing falls through the cracks.",
    color: "text-accent-blue",
    activeBg: "bg-accent-blue",
    scenarios: [
      {
        title: "New hire ramp-up",
        before: "New engineer asks 12 different people 'where is the onboarding doc?' over 3 days",
        after: "Nexus answers instantly with a summary pulled from Notion, Confluence and Slack history",
        saving: "3 days → 30 minutes",
      },
      {
        title: "Weekly investor update",
        before: "Founder spends 3 hours pulling metrics from Stripe, Linear, HubSpot and writing the update",
        after: "Nexus pulls all data and drafts the full update in 90 seconds — just review and send",
        saving: "3 hours → 5 minutes",
      },
      {
        title: "Customer support context",
        before: "Support rep searches 4 tools to understand what the customer previously complained about",
        after: "Nexus surfaces full customer history from Intercom, HubSpot and email in one click",
        saving: "8 min/ticket → 45 seconds",
      },
    ],
    metrics: ["87% faster onboarding", "3h saved per founder/week", "4.2× faster support resolution"],
  },
  {
    id: "enterprise",
    icon: Building2,
    label: "Enterprise",
    headline: "Intelligence at scale, control at every level.",
    subheadline: "For large organizations that need AI that's powerful, compliant and fully in their control.",
    color: "text-accent-indigo",
    activeBg: "bg-accent-indigo",
    scenarios: [
      {
        title: "Cross-team knowledge search",
        before: "Sales asks engineering what the product roadmap says about a feature — email chain takes 2 days",
        after: "Any employee asks Nexus and gets a real-time, permission-aware answer from relevant docs",
        saving: "2 days → instant",
      },
      {
        title: "Executive reporting",
        before: "4 VPs spend Friday afternoon assembling data from 8 systems into a board deck",
        after: "Nexus generates a fully sourced executive brief with charts and summaries automatically",
        saving: "4 people × 4h → 10 minutes",
      },
      {
        title: "Compliance & audit prep",
        before: "Legal team manually searches through years of Slack, email and docs for an audit",
        after: "Nexus retrieves all relevant communications instantly with full audit trail and access logs",
        saving: "Weeks of work → hours",
      },
    ],
    metrics: ["SOC 2 Type II certified", "GDPR & HIPAA compliant", "Granular RBAC permissions", "Full audit logging"],
  },
  {
    id: "engineering",
    icon: Code2,
    label: "Engineering",
    headline: "Ship faster with less friction.",
    subheadline: "Give your engineering team an AI that understands their codebase, history and processes.",
    color: "text-accent-teal",
    activeBg: "bg-teal-600",
    scenarios: [
      {
        title: "Incident response",
        before: "On-call engineer spends 40 minutes reading through Slack threads and runbooks during an outage",
        after: "Nexus surfaces past incidents, relevant runbooks and Slack context in one organized view",
        saving: "40 min → 5 min to context",
      },
      {
        title: "Code review context",
        before: "Reviewer doesn't know why a decision was made 6 months ago and leaves a blocking comment",
        after: "Nexus links the PR to the original Slack discussion, Linear ticket and Notion spec automatically",
        saving: "Eliminates 60% of blocking review comments",
      },
      {
        title: "Sprint retrospectives",
        before: "PM manually reads all Linear tickets and Slack threads to prepare the retro doc",
        after: "Nexus generates a full sprint summary with velocity, blockers and highlights in 30 seconds",
        saving: "2h prep → 30 seconds",
      },
    ],
    metrics: ["40% faster incident resolution", "60% fewer blocking PR comments", "2h saved per sprint"],
  },
];

export function UseCases() {
  const [active, setActive] = useState("startup");
  const current = useCases.find(u => u.id === active)!;

  return (
    <section className="section bg-white dark:bg-navy-900">
      <div className="container">
        <div className="text-center mb-12">
          <div className="section-tag mx-auto">Use cases</div>
          <h2 className="section-title">Built for every team,<br />tailored to your reality.</h2>
          <p className="section-sub mx-auto text-center">
            Whether you're a 5-person startup or a 5,000-person enterprise, Nexus adapts to how your team actually works.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-navy-50 dark:bg-navy-800 rounded-2xl p-1.5 gap-1">
            {useCases.map(uc => (
              <button
                key={uc.id}
                onClick={() => setActive(uc.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl font-body font-medium text-sm transition-all duration-200",
                  active === uc.id
                    ? "bg-white dark:bg-navy-700 text-navy-900 dark:text-cream-100 shadow-card"
                    : "text-navy-500 dark:text-cream-400 hover:text-navy-700 dark:hover:text-cream-200"
                )}
              >
                <uc.icon size={16} className={active === uc.id ? current.color : ""} />
                {uc.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Left — headline + metrics */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-3xl font-semibold text-navy-900 dark:text-cream-50 mb-3 leading-tight">
              {current.headline}
            </h3>
            <p className="font-body text-navy-500 dark:text-cream-400 mb-8 leading-relaxed">
              {current.subheadline}
            </p>
            <div className="space-y-3">
              {current.metrics.map((m, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-navy-50 dark:bg-navy-800 border border-navy-100 dark:border-navy-700">
                  <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <Check size={11} className="text-green-600 dark:text-green-400" />
                  </div>
                  <span className="font-body text-sm font-medium text-navy-700 dark:text-cream-200">{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — scenarios */}
          <div className="lg:col-span-3 space-y-4">
            {current.scenarios.map((scenario, i) => (
              <div key={i} className="card p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h4 className="font-display font-semibold text-navy-900 dark:text-cream-100">{scenario.title}</h4>
                  <span className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-mono text-xs font-medium border border-green-100 dark:border-green-900">
                    {scenario.saving}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30">
                    <p className="font-mono text-xs text-red-500 dark:text-red-400 font-medium mb-1.5 uppercase tracking-wider">Before</p>
                    <p className="font-body text-sm text-navy-600 dark:text-cream-400 leading-relaxed">{scenario.before}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30">
                    <p className="font-mono text-xs text-green-600 dark:text-green-400 font-medium mb-1.5 uppercase tracking-wider">With Nexus</p>
                    <p className="font-body text-sm text-navy-600 dark:text-cream-400 leading-relaxed">{scenario.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
