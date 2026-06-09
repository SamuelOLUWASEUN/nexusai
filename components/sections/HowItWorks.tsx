import { Plug, MessageSquare, Zap } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Plug,
    title: "Connect your tools",
    description: "OAuth in one click. Connect Slack, Notion, GitHub, Jira, HubSpot, Google Drive and 100+ more. No API keys, no IT tickets, no engineering required.",
    detail: "Average setup time: 4 minutes",
    color: "bg-blue-50 dark:bg-blue-950/30 border-blue-100 dark:border-blue-900",
    iconColor: "text-accent-blue bg-blue-100 dark:bg-blue-900/50",
  },
  {
    number: "02",
    icon: MessageSquare,
    title: "Ask in plain English",
    description: "Type naturally like you're messaging a colleague. No query syntax, no boolean operators, no filters. Nexus understands context, intent and follow-up questions.",
    detail: "Works in 40+ languages",
    color: "bg-indigo-50 dark:bg-indigo-950/30 border-indigo-100 dark:border-indigo-900",
    iconColor: "text-accent-indigo bg-indigo-100 dark:bg-indigo-900/50",
  },
  {
    number: "03",
    icon: Zap,
    title: "Get results and take action",
    description: "Receive cited answers, generated drafts, meeting summaries or triggered automations — all in under a second. Nexus shows its sources so you always know where information came from.",
    detail: "Average response: 0.8 seconds",
    color: "bg-teal-50 dark:bg-teal-950/30 border-teal-100 dark:border-teal-900",
    iconColor: "text-accent-teal bg-teal-100 dark:bg-teal-900/50",
  },
];

export function HowItWorks() {
  return (
    <section className="section bg-white dark:bg-navy-950">
      <div className="container">
        <div className="text-center mb-16">
          <div className="section-tag mx-auto">How it works</div>
          <h2 className="section-title">Up and running in minutes.<br />Transformative from day one.</h2>
          <p className="section-sub mx-auto text-center">
            No long onboarding. No complex setup. Connect your tools, ask your first question and instantly see why thousands of teams use Nexus every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-[calc(33%+24px)] right-[calc(33%+24px)] h-px border-t-2 border-dashed border-navy-200 dark:border-navy-700" />

          {steps.map((step, i) => (
            <div key={i} className={`relative rounded-2xl border p-8 ${step.color} transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover`}>
              <div className="flex items-start justify-between mb-6">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${step.iconColor}`}>
                  <step.icon size={20} />
                </div>
                <span className="font-mono text-4xl font-bold text-navy-100 dark:text-navy-800 select-none">{step.number}</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-navy-900 dark:text-cream-100 mb-3">{step.title}</h3>
              <p className="font-body text-sm text-navy-500 dark:text-cream-400 leading-relaxed mb-5">{step.description}</p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/60 dark:bg-navy-800/60 border border-white/80 dark:border-navy-700">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                <span className="font-mono text-xs text-navy-500 dark:text-cream-500">{step.detail}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
