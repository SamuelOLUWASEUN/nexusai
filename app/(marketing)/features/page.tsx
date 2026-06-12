import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Search, Video, FileText, BarChart3, Shield, Globe, Zap, Bell, Lock } from "lucide-react";

export const metadata: Metadata = { title: "Features" };

const featureGroups = [
  {
    category: "AI Search",
    icon: Search,
    color: "bg-blue-50 dark:bg-blue-950/30 text-accent-blue",
    items: [
      { title: "Cross-tool semantic search",  desc: "Search across Slack, Notion, Drive, GitHub, Jira and 100+ more simultaneously with a single query." },
      { title: "Source citations",            desc: "Every answer links back to the original source so your team can verify and dig deeper." },
      { title: "Context-aware answers",       desc: "Sypora understands follow-up questions and maintains conversation context like a real colleague." },
      { title: "Permission-aware results",    desc: "Users only see results from tools they already have access to — automatically enforced." },
      { title: "Real-time indexing",          desc: "Data indexed continuously. Ask about a Slack message posted 5 minutes ago." },
      { title: "People search",              desc: "Find anything related to a specific colleague — their projects, decisions, documents." },
    ],
  },
  {
    category: "Meeting Intelligence",
    icon: Video,
    color: "bg-indigo-50 dark:bg-indigo-950/30 text-accent-indigo",
    items: [
      { title: "Auto transcription",          desc: "Joins Zoom, Google Meet and Teams automatically and transcribes every word in real time." },
      { title: "Action item extraction",      desc: "AI identifies and assigns action items, sends them to the right people automatically." },
      { title: "Smart summaries",             desc: "Structured meeting summaries with decisions, next steps and key discussion points." },
      { title: "Speaker identification",      desc: "Knows who said what — searchable by speaker name across your entire meeting history." },
      { title: "Meeting search",              desc: "Search across all your past meetings. Find any decision made in any call." },
      { title: "Follow-up automation",        desc: "Sypora drafts follow-up emails and Slack messages after meetings automatically." },
    ],
  },
  {
    category: "AI Writing",
    icon: FileText,
    color: "bg-teal-50 dark:bg-teal-950/30 text-accent-teal",
    items: [
      { title: "Company-aware drafts",        desc: "Write investor updates, PRDs, emails and Slack summaries using your actual company data." },
      { title: "Brand voice matching",        desc: "Learns your writing style and tone from past documents to keep output consistent." },
      { title: "Auto-populated templates",    desc: "Fill in templates automatically by pulling live data from connected tools." },
      { title: "One-click export",            desc: "Export to Notion, Google Docs, email or copy to clipboard in one click." },
      { title: "Multi-language support",      desc: "Write and translate content in 40+ languages with context-aware accuracy." },
      { title: "Version history",             desc: "All AI-generated content is versioned and auditable." },
    ],
  },
  {
    category: "Insights & Analytics",
    icon: BarChart3,
    color: "bg-amber-50 dark:bg-amber-950/30 text-accent-amber",
    items: [
      { title: "Weekly insight digests",      desc: "Auto-generated summaries of what happened across your org every week." },
      { title: "Bottleneck detection",        desc: "Identifies where work is getting stuck before it becomes a problem." },
      { title: "Team health scoring",         desc: "Measures team sentiment, velocity and collaboration from tool usage patterns." },
      { title: "Custom dashboards",           desc: "Build custom insight dashboards with drag-and-drop simplicity." },
      { title: "Proactive alerts",            desc: "Get notified when something unusual happens — a spike in support tickets, a stalled project." },
      { title: "ROI reporting",               desc: "See exactly how much time Sypora is saving your team every week." },
    ],
  },
  {
    category: "Security & Compliance",
    icon: Shield,
    color: "bg-rose-50 dark:bg-rose-950/30 text-accent-rose",
    items: [
      { title: "SOC 2 Type II certified",     desc: "Independently audited annually for security, availability and confidentiality." },
      { title: "End-to-end encryption",       desc: "AES-256 at rest, TLS 1.3 in transit. Data is encrypted before it leaves your tools." },
      { title: "SSO & SAML",                  desc: "Supports Okta, Azure AD, Google Workspace and any SAML 2.0 identity provider." },
      { title: "Granular permissions",        desc: "Control exactly who can search what, with role-based access control at the team and user level." },
      { title: "Full audit logs",             desc: "Every query, every action, every user — logged with timestamps and exportable." },
      { title: "GDPR & HIPAA ready",          desc: "Data processing agreements, retention controls and right-to-delete tooling included." },
    ],
  },
  {
    category: "Platform & Integrations",
    icon: Globe,
    color: "bg-green-50 dark:bg-green-950/30 text-green-600 dark:text-green-400",
    items: [
      { title: "100+ native integrations",    desc: "One-click OAuth connections with the most popular business tools." },
      { title: "REST API",                    desc: "Build custom integrations and automate workflows with our full-featured API." },
      { title: "Webhook support",             desc: "Push Sypora answers and insights to any system via webhooks." },
      { title: "Browser extension",           desc: "Access Sypora in any tab — search without leaving your current workflow." },
      { title: "Mobile app",                  desc: "iOS and Android apps for on-the-go access to your workspace intelligence." },
      { title: "Slack & Teams bots",          desc: "Ask Sypora directly in Slack or Teams without opening a new tab." },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 text-center py-20">
        <div className="section-tag mx-auto">All Features</div>
        <h1 className="section-title">Everything your team needs.<br />In one AI workspace.</h1>
        <p className="section-sub mx-auto text-center mb-8">
          Sypora isn't a single-purpose AI tool. It's the complete intelligence layer for your organization — search, meetings, writing, insights and security, all in one place.
        </p>
        <Link href="/signup" className="btn-primary">
          Start for free <ArrowRight size={16} />
        </Link>
      </div>

      {/* Feature groups */}
      <div className="max-w-7xl mx-auto px-4 space-y-20">
        {featureGroups.map((group, gi) => (
          <div key={gi}>
            <div className="flex items-center gap-3 mb-8">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${group.color}`}>
                <group.icon size={20} />
              </div>
              <h2 className="font-display text-2xl font-semibold text-navy-900 dark:text-cream-100">{group.category}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.items.map((item, ii) => (
                <div key={ii} className="card p-5 hover:-translate-y-0.5 transition-transform">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2 2 4-4" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-body font-semibold text-navy-900 dark:text-cream-100 text-sm mb-1">{item.title}</p>
                      <p className="font-body text-sm text-navy-500 dark:text-cream-400 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="max-w-2xl mx-auto px-4 text-center mt-24">
        <h2 className="font-display text-3xl font-semibold text-navy-900 dark:text-cream-100 mb-4">Ready to see it in action?</h2>
        <p className="font-body text-navy-500 dark:text-cream-400 mb-8">Start for free — no credit card required. Get your first answer in under 4 minutes.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup" className="btn-primary">Get started free <ArrowRight size={16} /></Link>
          <Link href="/contact?type=demo" className="btn-secondary">Book a demo</Link>
        </div>
      </div>
    </div>
  );
}
