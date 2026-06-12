import { Search, FileText, Video, BarChart3, Shield, Globe } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Universal AI Search",
    description: "Search across every tool your company uses simultaneously. Find that Slack message from 3 months ago, the Notion doc someone mentioned in a meeting, or the GitHub PR that fixed a bug — instantly.",
    bullets: ["Cross-tool semantic search", "Source citations on every answer", "Filters by date, tool, person", "Real-time indexing"],
    color: "accent-blue",
    bg: "bg-blue-50 dark:bg-blue-950/20",
    badge: "Most used feature",
  },
  {
    icon: Video,
    title: "AI Meeting Assistant",
    description: "Never take manual notes again. Sypora joins your Zoom, Google Meet or Teams calls, transcribes in real time, identifies action items, and sends a structured summary to everyone — automatically.",
    bullets: ["Real-time transcription", "Auto-detected action items", "Speaker identification", "Searchable meeting archive"],
    color: "accent-indigo",
    bg: "bg-indigo-50 dark:bg-indigo-950/20",
    badge: "2.1h saved per person/week",
  },
  {
    icon: FileText,
    title: "AI Writing Assistant",
    description: "Generate first drafts grounded in your company context. Investor updates, customer emails, PRDs, Slack summaries, blog posts — all written in your brand voice using your actual company data.",
    bullets: ["Company-aware drafts", "Tone and style matching", "Auto-filled from connected data", "One-click send or export"],
    color: "accent-teal",
    bg: "bg-teal-50 dark:bg-teal-950/20",
    badge: "Used 4.2M times/month",
  },
  {
    icon: BarChart3,
    title: "Predictive Insights",
    description: "Sypora analyzes patterns across all your tools to surface risks, trends and opportunities before they become problems. Know what's slowing your team down before your team tells you.",
    bullets: ["Weekly insight digests", "Bottleneck detection", "Team health scoring", "Custom alert thresholds"],
    color: "accent-amber",
    bg: "bg-amber-50 dark:bg-amber-950/20",
    badge: "Enterprise tier",
  },
  {
    icon: Globe,
    title: "100+ Integrations",
    description: "Sypora connects to the tools your team already uses. One-click OAuth setup with Slack, Notion, Google Workspace, GitHub, Jira, Linear, HubSpot, Salesforce, Zoom and many more.",
    bullets: ["One-click OAuth", "Bi-directional sync", "Webhook support", "Custom API connector"],
    color: "accent-blue",
    bg: "bg-blue-50 dark:bg-blue-950/20",
    badge: "New integrations weekly",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "SOC 2 Type II certified. Your data is encrypted at rest and in transit. Choose cloud, private cloud or on-premise deployment. Full audit logs and granular permission controls included.",
    bullets: ["SOC 2 Type II certified", "SSO / SAML support", "Granular permissions", "On-premise option"],
    color: "accent-rose",
    bg: "bg-rose-50 dark:bg-rose-950/20",
    badge: "Enterprise ready",
  },
];

export function Features() {
  return (
    <section className="section bg-cream-50 dark:bg-navy-950">
      <div className="container">
        <div className="text-center mb-16">
          <div className="section-tag mx-auto">Core capabilities</div>
          <h2 className="section-title">One AI. Every capability<br />your team needs.</h2>
          <p className="section-sub mx-auto text-center">
            Sypora isn't a point solution. It's the complete AI layer for your entire organization — search, writing, meetings and insights in one place.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div key={i} className={`group card p-7 cursor-default ${feature.bg} border-transparent hover:border-navy-200 dark:hover:border-navy-600`}>
              {/* Header */}
              <div className="flex items-start justify-between mb-5">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-white dark:bg-navy-800 shadow-card`}>
                  <feature.icon size={20} className={`text-${feature.color}`} />
                </div>
                <span className="tag-blue text-xs">{feature.badge}</span>
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-semibold text-navy-900 dark:text-cream-100 mb-3 group-hover:text-accent-blue transition-colors">
                {feature.title}
              </h3>
              <p className="font-body text-sm text-navy-500 dark:text-cream-400 leading-relaxed mb-5">
                {feature.description}
              </p>

              {/* Bullets */}
              <ul className="space-y-2">
                {feature.bullets.map((bullet, j) => (
                  <li key={j} className="flex items-center gap-2.5 font-body text-sm text-navy-600 dark:text-cream-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent-blue flex-shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
