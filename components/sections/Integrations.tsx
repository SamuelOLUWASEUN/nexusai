import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { INTEGRATIONS } from "@/lib/utils";

const categories = ["All", "Communication", "Docs", "Project", "CRM", "Code"];

const allIntegrations = [
  { name: "Slack",         icon: "💬", category: "communication", popular: true  },
  { name: "Notion",        icon: "📝", category: "docs",          popular: true  },
  { name: "Google Drive",  icon: "📁", category: "docs",          popular: true  },
  { name: "GitHub",        icon: "🐙", category: "code",          popular: true  },
  { name: "Linear",        icon: "◈",  category: "project",       popular: true  },
  { name: "Jira",          icon: "🔷", category: "project",       popular: false },
  { name: "HubSpot",       icon: "🟠", category: "crm",           popular: false },
  { name: "Salesforce",    icon: "☁️", category: "crm",           popular: false },
  { name: "Zoom",          icon: "📹", category: "communication", popular: false },
  { name: "Confluence",    icon: "📖", category: "docs",          popular: false },
  { name: "Figma",         icon: "🎨", category: "docs",          popular: false },
  { name: "Intercom",      icon: "💭", category: "communication", popular: false },
  { name: "Asana",         icon: "🔴", category: "project",       popular: false },
  { name: "Monday.com",    icon: "🗓", category: "project",       popular: false },
  { name: "Zendesk",       icon: "🎫", category: "crm",           popular: false },
  { name: "Gmail",         icon: "📧", category: "communication", popular: false },
  { name: "Loom",          icon: "🎬", category: "communication", popular: false },
  { name: "Airtable",      icon: "🗃",  category: "docs",          popular: false },
];

export function Integrations() {
  return (
    <section className="section bg-cream-50 dark:bg-navy-950">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <div className="section-tag">Integrations</div>
            <h2 className="section-title">Works with the tools<br />your team already uses.</h2>
            <p className="section-sub mb-8">
              No migrations, no new workflows, no convincing your team to change how they work. Sypora slots into your existing stack in minutes and makes everything smarter.
            </p>
            <div className="space-y-4 mb-8">
              {[
                { icon: "⚡", title: "One-click setup",    desc: "OAuth connection in under 60 seconds. No API keys or engineering work needed." },
                { icon: "🔄", title: "Real-time sync",     desc: "Data is indexed continuously. Ask about something posted 5 minutes ago." },
                { icon: "🔒", title: "Permission aware",   desc: "Sypora respects your existing tool permissions. Users only see what they're allowed to see." },
                { icon: "🔌", title: "Custom connector",   desc: "Build your own integration with our REST API and webhook support. Full documentation included." },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors">
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <div>
                    <p className="font-body font-semibold text-navy-900 dark:text-cream-100 text-sm mb-1">{item.title}</p>
                    <p className="font-body text-sm text-navy-500 dark:text-cream-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/integrations" className="btn-primary">
              See all 100+ integrations <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right — integration grid */}
          <div className="relative">
            <div className="grid grid-cols-3 gap-3">
              {allIntegrations.slice(0, 18).map((integration, i) => (
                <div key={i}
                  className={`card p-4 flex flex-col items-center gap-2 text-center cursor-default group
                    ${integration.popular ? "border-navy-200 dark:border-navy-600" : ""}`}>
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-200">
                    {integration.icon}
                  </span>
                  <span className="font-body text-xs font-medium text-navy-600 dark:text-cream-300 leading-tight">
                    {integration.name}
                  </span>
                  {integration.popular && (
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" title="Popular" />
                  )}
                </div>
              ))}
            </div>

            {/* "And more" card */}
            <div className="absolute bottom-0 right-0 card p-4 bg-navy-900 dark:bg-accent-blue border-navy-900 dark:border-accent-blue text-white text-center w-[calc(33.33%-6px)]">
              <span className="font-display font-semibold text-2xl">+82</span>
              <p className="font-body text-xs text-cream-300 mt-0.5">more tools</p>
            </div>

            {/* Fade overlay at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-cream-50 dark:from-navy-950 to-transparent pointer-events-none rounded-b-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
