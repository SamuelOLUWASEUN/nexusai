import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Blog" };

const posts = [
  {
    slug:     "why-teams-lose-28-hours-a-day",
    category: "Research",
    title:    "Why teams lose 2.8 hours a day searching for information — and what to do about it",
    excerpt:  "A new study of 1,200 knowledge workers reveals the staggering cost of information silos. Here's what the data says and how AI can fix it.",
    author:   "Sarah Kim",
    role:     "Head of Research",
    date:     "June 2, 2026",
    readTime: "8 min read",
    featured: true,
  },
  {
    slug:     "ai-meeting-summaries-guide",
    category: "Product",
    title:    "The complete guide to AI meeting summaries: what works, what doesn't",
    excerpt:  "Not all AI meeting tools are created equal. We tested 12 tools over 6 months to find out which ones actually save time and which ones create more work.",
    author:   "Marcus Reid",
    role:     "Product Lead",
    date:     "May 28, 2026",
    readTime: "12 min read",
    featured: false,
  },
  {
    slug:     "enterprise-ai-security-checklist",
    category: "Security",
    title:    "The enterprise AI security checklist: 14 questions to ask before you deploy",
    excerpt:  "Before your security team approves any AI tool, make sure you can answer these 14 questions. We've seen what goes wrong when you skip them.",
    author:   "Priya Nair",
    role:     "CISO",
    date:     "May 20, 2026",
    readTime: "10 min read",
    featured: false,
  },
  {
    slug:     "startup-onboarding-nexus",
    category: "Case Study",
    title:    "How Flowbase cut onboarding from 3 weeks to 4 days with Sypora AI",
    excerpt:  "Flowbase's CTO explains exactly how they used Sypora to build a self-serve onboarding system that new hires love — and managers barely have to touch.",
    author:   "Amara Levi",
    role:     "Guest Author",
    date:     "May 12, 2026",
    readTime: "6 min read",
    featured: false,
  },
  {
    slug:     "series-a",
    category: "Company",
    title:    "Sypora AI raises $12M Series A to bring workplace AI to every team",
    excerpt:  "Today we're announcing our $12M Series A, led by Index Ventures with participation from Sequoia and angels including the founders of Notion and Linear.",
    author:   "David Chen",
    role:     "CEO",
    date:     "May 1, 2026",
    readTime: "4 min read",
    featured: false,
  },
  {
    slug:     "rag-vs-finetuning",
    category: "Engineering",
    title:    "RAG vs fine-tuning: which approach actually works for enterprise knowledge bases?",
    excerpt:  "After building both approaches for hundreds of enterprise customers, here's what we've learned about when to use RAG, when to fine-tune, and when to combine them.",
    author:   "Jin Park",
    role:     "Head of AI",
    date:     "April 22, 2026",
    readTime: "15 min read",
    featured: false,
  },
];

const categoryColors: Record<string, string> = {
  Research:    "bg-blue-50 dark:bg-blue-950/30 text-accent-blue",
  Product:     "bg-indigo-50 dark:bg-indigo-950/30 text-accent-indigo",
  Security:    "bg-rose-50 dark:bg-rose-950/30 text-accent-rose",
  "Case Study":"bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400",
  Company:     "bg-amber-50 dark:bg-amber-950/30 text-accent-amber",
  Engineering: "bg-teal-50 dark:bg-teal-950/30 text-accent-teal",
};

export default function BlogPage() {
  const featured = posts.find(p => p.featured);
  const rest     = posts.filter(p => !p.featured);

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-14">
          <div className="section-tag">Blog</div>
          <h1 className="section-title">Insights on AI, productivity<br />and the future of work.</h1>
          <p className="section-sub">Research, product updates, case studies and engineering deep dives from the Sypora AI team.</p>
        </div>

        {/* Featured post */}
        {featured && (
          <Link href={`/blog/${featured.slug}`} className="group block card p-8 mb-10 hover:-translate-y-1 transition-all">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
              <div className="lg:col-span-3">
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium ${categoryColors[featured.category]}`}>
                    {featured.category}
                  </span>
                  <span className="font-mono text-xs text-navy-400 dark:text-cream-500">{featured.readTime}</span>
                </div>
                <h2 className="font-display text-2xl font-semibold text-navy-900 dark:text-cream-100 leading-tight mb-3 group-hover:text-accent-blue transition-colors">
                  {featured.title}
                </h2>
                <p className="font-body text-sm text-navy-500 dark:text-cream-400 leading-relaxed mb-5">{featured.excerpt}</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-blue to-accent-indigo flex items-center justify-center text-white font-body font-bold text-xs">
                    {featured.author[0]}
                  </div>
                  <div>
                    <p className="font-body font-semibold text-navy-900 dark:text-cream-100 text-sm">{featured.author}</p>
                    <p className="font-body text-xs text-navy-400 dark:text-cream-500">{featured.role} · {featured.date}</p>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 bg-gradient-to-br from-navy-50 to-blue-50 dark:from-navy-800 dark:to-blue-950/30 rounded-xl h-48 flex items-center justify-center text-5xl border border-navy-100 dark:border-navy-700">
                📊
              </div>
            </div>
          </Link>
        )}

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="group card p-6 hover:-translate-y-1 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium ${categoryColors[post.category]}`}>
                  {post.category}
                </span>
                <span className="font-mono text-xs text-navy-400 dark:text-cream-500">{post.readTime}</span>
              </div>
              <h2 className="font-display text-lg font-semibold text-navy-900 dark:text-cream-100 leading-tight mb-3 group-hover:text-accent-blue transition-colors">
                {post.title}
              </h2>
              <p className="font-body text-sm text-navy-500 dark:text-cream-400 leading-relaxed mb-5 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-navy-100 dark:border-navy-700">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-navy-400 to-navy-600 flex items-center justify-center text-white font-body font-bold text-xs">
                    {post.author[0]}
                  </div>
                  <p className="font-body text-xs text-navy-500 dark:text-cream-500">{post.author} · {post.date}</p>
                </div>
                <ArrowRight size={14} className="text-navy-300 dark:text-navy-600 group-hover:text-accent-blue transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
