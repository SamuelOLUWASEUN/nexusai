import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Integrations" };

const integrationCategories = [
  {
    name: "Communication",
    tools: [
      { name: "Slack",       icon: "💬", desc: "Search messages, channels and files. Get answers from conversation history.",  popular: true  },
      { name: "Microsoft Teams", icon: "🟦", desc: "Index team chats and meeting recordings across all your channels.",       popular: true  },
      { name: "Gmail",       icon: "📧", desc: "Search your email history and draft context-aware replies.",                   popular: false },
      { name: "Zoom",        icon: "📹", desc: "Transcribe and summarize meetings automatically.",                              popular: true  },
      { name: "Loom",        icon: "🎬", desc: "Make video content searchable. Find decisions from recorded walkthroughs.",    popular: false },
      { name: "Intercom",    icon: "💭", desc: "Search customer conversations and surface common issues.",                     popular: false },
    ],
  },
  {
    name: "Documents & Knowledge",
    tools: [
      { name: "Notion",       icon: "📝", desc: "Search across all pages, databases and inline content.",                     popular: true  },
      { name: "Google Drive", icon: "📁", desc: "Index Docs, Sheets, Slides and PDFs across shared drives.",                  popular: true  },
      { name: "Confluence",   icon: "📖", desc: "Make your engineering and product docs instantly searchable.",                popular: false },
      { name: "Dropbox",      icon: "📦", desc: "Search PDFs, presentations and documents stored in Dropbox.",                popular: false },
      { name: "SharePoint",   icon: "🔷", desc: "Connect Microsoft SharePoint and OneDrive document libraries.",              popular: false },
      { name: "Airtable",     icon: "🗃",  desc: "Search records, views and attachments across your bases.",                  popular: false },
    ],
  },
  {
    name: "Project Management",
    tools: [
      { name: "Linear",      icon: "◈",  desc: "Search issues, projects and cycles. Generate sprint summaries.",              popular: true  },
      { name: "Jira",        icon: "🔷", desc: "Find tickets, epics and roadmap items. Understand sprint history.",            popular: true  },
      { name: "Asana",       icon: "🔴", desc: "Search tasks, projects and teams across your workspace.",                     popular: false },
      { name: "Monday.com",  icon: "🗓", desc: "Index boards, items and updates across your organization.",                   popular: false },
      { name: "ClickUp",     icon: "🟣", desc: "Search docs, tasks and goals across all your ClickUp spaces.",                popular: false },
      { name: "Trello",      icon: "🟦", desc: "Make boards, cards and attachments searchable with AI.",                      popular: false },
    ],
  },
  {
    name: "CRM & Sales",
    tools: [
      { name: "HubSpot",     icon: "🟠", desc: "Search contacts, deals and email history. Understand customer context.",      popular: true  },
      { name: "Salesforce",  icon: "☁️", desc: "Query opportunities, accounts and activity history with natural language.",   popular: false },
      { name: "Zendesk",     icon: "🎫", desc: "Surface ticket history and customer context for support teams.",              popular: false },
      { name: "Pipedrive",   icon: "🟢", desc: "Search deals, notes and email threads across your pipeline.",                 popular: false },
    ],
  },
  {
    name: "Engineering",
    tools: [
      { name: "GitHub",      icon: "🐙", desc: "Search PRs, issues, discussions and code comments.",                         popular: true  },
      { name: "GitLab",      icon: "🦊", desc: "Index merge requests, issues and wiki pages.",                               popular: false },
      { name: "PagerDuty",   icon: "🚨", desc: "Search past incidents and runbooks to resolve issues faster.",               popular: false },
      { name: "Sentry",      icon: "🔍", desc: "Connect error tracking to your knowledge base for faster debugging.",        popular: false },
    ],
  },
  {
    name: "Analytics & Data",
    tools: [
      { name: "Looker",      icon: "📊", desc: "Ask natural language questions about your Looker dashboards and reports.",   popular: false },
      { name: "Mixpanel",    icon: "📈", desc: "Query product analytics data in plain English.",                             popular: false },
      { name: "Amplitude",   icon: "⚡", desc: "Surface user behavior insights without writing queries.",                   popular: false },
    ],
  },
];

export default function IntegrationsPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 text-center py-16">
        <div className="section-tag mx-auto">Integrations</div>
        <h1 className="section-title">Connects to everything<br />your team already uses.</h1>
        <p className="section-sub mx-auto text-center mb-8">
          One-click OAuth connections. No API keys, no engineering work. Nexus indexes your tools continuously so your answers are always up to date.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/signup" className="btn-primary">
            Connect your first tool free <ArrowRight size={16} />
          </Link>
          <Link href="/contact?type=enterprise" className="btn-secondary">
            Request a custom integration
          </Link>
        </div>
      </div>

      {/* How connections work */}
      <div className="bg-navy-50 dark:bg-navy-900/50 py-12 px-4 mb-16 border-y border-navy-100 dark:border-navy-800">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { icon: "⚡", title: "One-click OAuth",     desc: "Connect any tool in 60 seconds via secure OAuth. No API keys required." },
            { icon: "🔄", title: "Real-time indexing",  desc: "Data indexed continuously. Ask about something posted 5 minutes ago." },
            { icon: "🔒", title: "Permission-aware",    desc: "Nexus enforces your existing tool permissions on every single query." },
          ].map((item, i) => (
            <div key={i} className="card p-6">
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-display font-semibold text-navy-900 dark:text-cream-100 mb-2">{item.title}</h3>
              <p className="font-body text-sm text-navy-500 dark:text-cream-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Integration categories */}
      <div className="max-w-6xl mx-auto px-4 space-y-16">
        {integrationCategories.map((category, ci) => (
          <div key={ci}>
            <div className="flex items-center gap-3 mb-6">
              <h2 className="font-display text-2xl font-semibold text-navy-900 dark:text-cream-100">{category.name}</h2>
              <span className="font-mono text-xs text-navy-400 dark:text-cream-500 bg-navy-100 dark:bg-navy-800 px-2.5 py-1 rounded-full">
                {category.tools.length} tools
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.tools.map((tool, ti) => (
                <div key={ti} className="card p-5 flex items-start gap-4 hover:-translate-y-0.5 transition-transform group cursor-default">
                  <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">{tool.icon}</span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-body font-semibold text-navy-900 dark:text-cream-100 text-sm">{tool.name}</p>
                      {tool.popular && (
                        <span className="px-1.5 py-0.5 rounded-full bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-mono text-xs border border-green-100 dark:border-green-900">
                          Popular
                        </span>
                      )}
                    </div>
                    <p className="font-body text-xs text-navy-500 dark:text-cream-400 leading-relaxed">{tool.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Custom integration CTA */}
      <div className="max-w-3xl mx-auto px-4 mt-20 text-center">
        <div className="card p-10">
          <div className="text-4xl mb-4">🔌</div>
          <h2 className="font-display text-2xl font-semibold text-navy-900 dark:text-cream-100 mb-3">
            Don't see your tool?
          </h2>
          <p className="font-body text-navy-500 dark:text-cream-400 mb-6 leading-relaxed">
            We add new integrations every week. You can also build your own using our REST API and webhook support, or request a custom integration as part of an Enterprise contract.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="btn-primary">
              Request an integration <ArrowRight size={16} />
            </Link>
            <a href="/docs/api" className="btn-secondary">
              View API docs
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
