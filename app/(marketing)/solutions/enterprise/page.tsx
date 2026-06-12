import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Shield, Lock, Server, Users, Check } from "lucide-react";

export const metadata: Metadata = { title: "Sypora AI for Enterprise" };

const enterpriseFeatures = [
  { icon: Shield, title: "SOC 2 Type II certified",  desc: "Independently audited. Full compliance documentation and pentest reports available under NDA." },
  { icon: Lock,   title: "SSO & SAML 2.0",           desc: "Integrates with Okta, Azure Active Directory, Google Workspace and any SAML 2.0 provider." },
  { icon: Server, title: "Private cloud & on-premise",desc: "Deploy in your own AWS/GCP account or fully on-premise. Complete data sovereignty." },
  { icon: Users,  title: "Unlimited seats",           desc: "Add every employee without per-seat pricing surprises. One predictable enterprise contract." },
];

const objections = [
  { q: "What about our existing security review process?",   a: "We'll complete your vendor questionnaire, provide SOC 2 reports, and schedule a technical call with our security team — whatever your process requires." },
  { q: "Can we control what data Sypora accesses?",           a: "Completely. You configure which tools connect, which channels and folders are indexed, and which employees have access to what. Granular controls at every level." },
  { q: "What does implementation look like?",                a: "Your dedicated Customer Success Manager handles rollout. Most enterprises are fully deployed in under 2 weeks with change management support included." },
  { q: "How does pricing work for large teams?",             a: "Enterprise pricing is based on your team size and use case. We offer multi-year agreements, custom SLAs and volume discounts. Contact us for a custom quote." },
];

export default function EnterprisePage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <div className="max-w-5xl mx-auto px-4 py-16 text-center">
        <div className="section-tag mx-auto">For Enterprise</div>
        <h1 className="font-display text-5xl md:text-6xl font-semibold text-navy-900 dark:text-cream-50 leading-tight tracking-tight mb-5">
          Intelligence at scale.
          <br />
          <span className="italic text-accent-blue">Control at every level.</span>
        </h1>
        <p className="section-sub mx-auto text-center mb-10">
          Sypora Enterprise gives large organizations the AI capabilities they need with the compliance, security and governance controls they require. Private cloud, SSO, SLAs and a dedicated success team included.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact?type=enterprise" className="btn-primary text-base px-8 py-3.5">
            Talk to enterprise sales <ArrowRight size={16} />
          </Link>
          <Link href="/contact?type=demo" className="btn-secondary text-base px-8 py-3.5">
            Book a live demo
          </Link>
        </div>
      </div>

      {/* Enterprise features */}
      <div className="max-w-6xl mx-auto px-4 mb-20">
        <div className="text-center mb-12">
          <h2 className="section-title">Built for enterprise requirements.</h2>
          <p className="section-sub mx-auto text-center">
            Every capability enterprise IT and security teams expect — included as standard, not as add-ons.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enterpriseFeatures.map((f, i) => (
            <div key={i} className="card p-7 flex items-start gap-5">
              <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center flex-shrink-0">
                <f.icon size={20} className="text-accent-blue" />
              </div>
              <div>
                <h3 className="font-display text-xl font-semibold text-navy-900 dark:text-cream-100 mb-2">{f.title}</h3>
                <p className="font-body text-sm text-navy-500 dark:text-cream-400 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* What's included */}
      <div className="bg-navy-900 dark:bg-navy-800 py-20 px-4 mb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-display text-3xl font-semibold text-white text-center mb-12">
            Everything in the Enterprise plan
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              "Unlimited team members",
              "All 100+ integrations",
              "Unlimited AI queries",
              "Private cloud or on-premise",
              "SSO / SAML 2.0",
              "Custom data retention",
              "99.9% uptime SLA",
              "Dedicated CSM",
              "24/7 priority support",
              "Full audit logging",
              "RBAC and team permissions",
              "Custom AI prompts and personas",
              "Webhook and REST API access",
              "Volume discounts available",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center flex-shrink-0">
                  <Check size={11} className="text-green-400" />
                </div>
                <span className="font-body text-sm text-cream-200">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Common objections */}
      <div className="max-w-4xl mx-auto px-4 mb-20">
        <h2 className="section-title text-center mb-10">Common enterprise questions.</h2>
        <div className="space-y-4">
          {objections.map((item, i) => (
            <div key={i} className="card p-6">
              <h3 className="font-display font-semibold text-navy-900 dark:text-cream-100 mb-2 text-lg">{item.q}</h3>
              <p className="font-body text-sm text-navy-500 dark:text-cream-400 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="card p-10">
          <h2 className="font-display text-3xl font-semibold text-navy-900 dark:text-cream-100 mb-3">
            Ready to evaluate Sypora?
          </h2>
          <p className="font-body text-navy-500 dark:text-cream-400 mb-6 leading-relaxed">
            Our enterprise team will walk you through a live demo tailored to your use case, complete your security questionnaire and build a custom proposal.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact?type=enterprise" className="btn-primary">
              Talk to enterprise sales <ArrowRight size={16} />
            </Link>
            <Link href="/security" className="btn-secondary">
              View security docs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
