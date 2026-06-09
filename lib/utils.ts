import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: "numeric",
  }).format(new Date(dateString));
}

export function formatRelativeTime(dateString: string): string {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export const PLANS = {
  free: {
    name: "Starter",
    price: 0,
    queries: 50,
    integrations: 3,
    members: 1,
    features: [
      "50 AI queries per day",
      "3 integrations",
      "1 workspace member",
      "7-day history",
      "Community support",
    ],
  },
  pro: {
    name: "Pro",
    price: 49,
    queries: -1,
    integrations: -1,
    members: 15,
    features: [
      "Unlimited AI queries",
      "All integrations",
      "Up to 15 members",
      "Unlimited history",
      "Priority support",
      "Advanced analytics",
      "Custom prompts",
    ],
  },
  enterprise: {
    name: "Enterprise",
    price: null,
    queries: -1,
    integrations: -1,
    members: -1,
    features: [
      "Everything in Pro",
      "Unlimited members",
      "Private cloud option",
      "SSO / SAML",
      "Custom data retention",
      "SLA guarantee",
      "Dedicated CSM",
      "On-premise option",
    ],
  },
};

export const INTEGRATIONS = [
  { name: "Slack",       slug: "slack",       icon: "💬", category: "communication" },
  { name: "Notion",      slug: "notion",      icon: "📝", category: "docs"          },
  { name: "Google Drive",slug: "gdrive",      icon: "📁", category: "docs"          },
  { name: "GitHub",      slug: "github",      icon: "🐙", category: "code"          },
  { name: "Linear",      slug: "linear",      icon: "◈",  category: "project"       },
  { name: "Jira",        slug: "jira",        icon: "🔷", category: "project"       },
  { name: "HubSpot",     slug: "hubspot",     icon: "🟠", category: "crm"           },
  { name: "Salesforce",  slug: "salesforce",  icon: "☁️", category: "crm"           },
  { name: "Zoom",        slug: "zoom",        icon: "📹", category: "communication" },
  { name: "Confluence",  slug: "confluence",  icon: "📖", category: "docs"          },
  { name: "Figma",       slug: "figma",       icon: "🎨", category: "docs"          },
  { name: "Intercom",    slug: "intercom",    icon: "💭", category: "communication" },
];

export const DEMO_QUERIES = [
  "Summarize all customer complaints from last week's Intercom conversations",
  "What did we decide in yesterday's product meeting?",
  "Draft a Q3 progress update email for our investors",
  "Find all open P1 bugs assigned to the backend team",
  "What's our current MRR and how does it compare to last month?",
  "Write meeting notes from today's standup recording",
];
