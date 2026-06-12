import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "About" };

const team = [
  { name: "David Chen",   role: "CEO & Co-founder",       bg: "from-blue-400 to-indigo-500",  bio: "Previously VP Product at Notion. Built and scaled 3 enterprise SaaS products." },
  { name: "Sarah Kim",    role: "CTO & Co-founder",        bg: "from-teal-400 to-blue-500",    bio: "Ex-Google Brain. PhD in NLP from Stanford. Led AI infra at Scale AI." },
  { name: "Jin Park",     role: "Head of AI",              bg: "from-indigo-400 to-purple-500", bio: "Former researcher at Anthropic. Expert in RAG systems and enterprise AI." },
  { name: "Priya Nair",   role: "Chief Security Officer",  bg: "from-rose-400 to-pink-500",    bio: "15 years in enterprise security. Led security at Stripe and Cloudflare." },
  { name: "Marcus Reid",  role: "Head of Product",         bg: "from-amber-400 to-orange-500", bio: "Previously PM at Linear and Figma. Obsessed with developer experience." },
  { name: "Amara Levi",   role: "Head of Engineering",     bg: "from-green-400 to-teal-500",   bio: "10 years at Google and Meta. Expert in distributed systems and real-time data." },
];

const values = [
  { icon: "🎯", title: "Relentlessly useful",    desc: "Every feature we build must save real people real time. We measure success in hours returned to teams, not features shipped." },
  { icon: "🔒", title: "Security is not optional", desc: "Enterprise teams trust us with their most sensitive data. We treat that responsibility seriously — SOC 2, encryption, and privacy by default." },
  { icon: "🧠", title: "Honest about AI",         desc: "We cite sources. We show confidence levels. We tell you when Sypora doesn't know something. AI should augment judgment, not replace it." },
  { icon: "🤝", title: "Customers are partners",  desc: "Our best features come from customer conversations. We ship fast, share roadmaps openly, and treat feedback as the most valuable input we receive." },
];

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 text-center py-20">
        <div className="section-tag mx-auto">Our story</div>
        <h1 className="section-title">We built Sypora because<br />we lived the problem.</h1>
        <p className="section-sub mx-auto text-center">
          Our founders spent years at fast-growing companies watching smart people waste hours searching for information that already existed somewhere in their tools. Sypora is the product we wished we'd had.
        </p>
      </div>

      {/* Mission */}
      <div className="bg-navy-900 dark:bg-navy-800 py-20 px-4 mb-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="font-mono text-xs text-cream-500 tracking-widest uppercase mb-4">Our mission</p>
          <h2 className="font-display text-4xl font-semibold text-white leading-tight mb-5">
            Make every person at every company as informed and capable as their best colleague.
          </h2>
          <p className="font-body text-cream-400 leading-relaxed">
            We believe the knowledge your organization has built is one of its greatest assets — and that today, most of it is locked away in tools that don't talk to each other. Sypora exists to change that.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-6xl mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          <div className="section-tag mx-auto">What we believe</div>
          <h2 className="section-title">Values that guide every decision.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <div key={i} className="card p-7 flex items-start gap-5">
              <span className="text-3xl flex-shrink-0">{v.icon}</span>
              <div>
                <h3 className="font-display text-xl font-semibold text-navy-900 dark:text-cream-100 mb-2">{v.title}</h3>
                <p className="font-body text-sm text-navy-500 dark:text-cream-400 leading-relaxed">{v.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="max-w-6xl mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          <div className="section-tag mx-auto">The team</div>
          <h2 className="section-title">Built by people who've<br />been in your shoes.</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {team.map((member, i) => (
            <div key={i} className="card p-6 text-center hover:-translate-y-1 transition-all">
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.bg} flex items-center justify-center text-white font-display font-bold text-xl mx-auto mb-4`}>
                {member.name.split(" ").map(n => n[0]).join("")}
              </div>
              <h3 className="font-display font-semibold text-navy-900 dark:text-cream-100 text-lg mb-0.5">{member.name}</h3>
              <p className="font-mono text-xs text-accent-blue mb-3">{member.role}</p>
              <p className="font-body text-sm text-navy-500 dark:text-cream-400 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Investors */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-20">
        <p className="font-mono text-xs text-navy-400 dark:text-cream-500 tracking-widest uppercase mb-6">Backed by</p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {["Index Ventures", "Sequoia Capital", "Y Combinator", "angel investors"].map(investor => (
            <span key={investor} className="font-display font-semibold text-xl text-navy-300 dark:text-navy-600">{investor}</span>
          ))}
        </div>
      </div>

      {/* Join us CTA */}
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="card p-10">
          <h2 className="font-display text-3xl font-semibold text-navy-900 dark:text-cream-100 mb-3">We're hiring.</h2>
          <p className="font-body text-navy-500 dark:text-cream-400 mb-6 leading-relaxed">
            We're a small, ambitious team building something genuinely hard and genuinely useful. If that sounds like your kind of work, we'd love to talk.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/careers" className="btn-primary">View open roles <ArrowRight size={16} /></Link>
            <Link href="/contact" className="btn-secondary">Get in touch</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
