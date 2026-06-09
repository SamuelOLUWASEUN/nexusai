import type { Metadata } from "next";
import Link from "next/link";
import { Shield, Lock, Eye, Server, FileCheck, ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Security" };

const certifications = [
  { name: "SOC 2 Type II", icon: "🏅", desc: "Independently audited annually for security, availability and confidentiality controls." },
  { name: "ISO 27001",     icon: "🔐", desc: "Certified information security management system, reviewed every year." },
  { name: "GDPR",          icon: "🇪🇺", desc: "Full compliance with EU data protection regulations. DPA available on request." },
  { name: "HIPAA Ready",   icon: "🏥", desc: "Healthcare-grade data handling with BAA available for Enterprise customers." },
  { name: "CCPA",          icon: "🌴", desc: "California Consumer Privacy Act compliant with full data portability support." },
  { name: "PCI DSS",       icon: "💳", desc: "Payment data handled through PCI-compliant processors. No card data stored." },
];

const securityFeatures = [
  {
    icon: Lock,
    title: "End-to-end encryption",
    items: [
      "AES-256 encryption at rest for all stored data",
      "TLS 1.3 in transit — no exceptions",
      "Encryption keys managed with AWS KMS",
      "Zero-knowledge architecture for sensitive fields",
    ],
  },
  {
    icon: Eye,
    title: "Access control",
    items: [
      "Role-based access control (RBAC) at user and team level",
      "SSO support via SAML 2.0, Okta, Azure AD, Google Workspace",
      "Multi-factor authentication required for all accounts",
      "Session management with configurable timeout policies",
    ],
  },
  {
    icon: Server,
    title: "Infrastructure",
    items: [
      "Hosted on AWS with multi-region redundancy",
      "99.9% uptime SLA with real-time status page",
      "Automated daily backups with 30-day retention",
      "DDoS protection and Web Application Firewall",
    ],
  },
  {
    icon: FileCheck,
    title: "Audit & compliance",
    items: [
      "Full audit logs for every query, action and login",
      "Logs exportable in standard formats (JSON, CSV)",
      "Configurable data retention policies",
      "Right-to-delete tooling for GDPR compliance",
    ],
  },
];

export default function SecurityPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 text-center py-16">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 flex items-center justify-center mx-auto mb-6">
          <Shield size={28} className="text-accent-blue" />
        </div>
        <div className="section-tag mx-auto">Security</div>
        <h1 className="section-title">Enterprise-grade security.<br />No compromises.</h1>
        <p className="section-sub mx-auto text-center mb-8">
          Your company's data is your most valuable asset. We treat security as a core product requirement — not an afterthought. Here's exactly how we protect it.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/contact?type=enterprise" className="btn-primary">Request security review <ArrowRight size={16} /></Link>
          <a href="/nexusai-security-whitepaper.pdf" className="btn-secondary">Download security whitepaper</a>
        </div>
      </div>

      {/* Certifications */}
      <div className="bg-navy-50 dark:bg-navy-900/50 py-16 px-4 mb-20 border-y border-navy-100 dark:border-navy-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-display text-2xl font-semibold text-navy-900 dark:text-cream-100 text-center mb-10">
            Certified and compliant
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {certifications.map((cert, i) => (
              <div key={i} className="card p-5 text-center hover:-translate-y-1 transition-all cursor-default">
                <div className="text-3xl mb-2">{cert.icon}</div>
                <p className="font-body font-semibold text-navy-900 dark:text-cream-100 text-sm mb-1">{cert.name}</p>
                <p className="font-body text-xs text-navy-400 dark:text-cream-500 leading-tight">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Security features */}
      <div className="max-w-6xl mx-auto px-4 mb-20">
        <h2 className="font-display text-3xl font-semibold text-navy-900 dark:text-cream-100 text-center mb-12">
          Built secure from the ground up
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {securityFeatures.map((feature, i) => (
            <div key={i} className="card p-7">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/30 flex items-center justify-center">
                  <feature.icon size={18} className="text-accent-blue" />
                </div>
                <h3 className="font-display text-xl font-semibold text-navy-900 dark:text-cream-100">{feature.title}</h3>
              </div>
              <ul className="space-y-2.5">
                {feature.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4l1.5 1.5 3-3" stroke="#16a34a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="font-body text-sm text-navy-600 dark:text-cream-300 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Deployment options */}
      <div className="max-w-6xl mx-auto px-4 mb-20">
        <h2 className="font-display text-3xl font-semibold text-navy-900 dark:text-cream-100 text-center mb-10">
          Deploy where you need to
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: "Cloud",         icon: "☁️", desc: "Fully managed on AWS. SOC 2 certified. Best for most teams. Up and running in minutes.", tag: "Most popular" },
            { title: "Private Cloud", icon: "🏢", desc: "Dedicated infrastructure in your preferred region. Full isolation from other customers.", tag: "Enterprise" },
            { title: "On-Premise",   icon: "🖥️", desc: "Deploy entirely within your own infrastructure. Complete data sovereignty. Docker-based.", tag: "Enterprise" },
          ].map((opt, i) => (
            <div key={i} className={`card p-7 text-center ${i === 0 ? "border-accent-blue/30 bg-blue-50/30 dark:bg-blue-950/10" : ""}`}>
              <div className="text-4xl mb-4">{opt.icon}</div>
              <div className="inline-flex items-center px-2.5 py-1 rounded-full bg-navy-100 dark:bg-navy-700 font-mono text-xs text-navy-500 dark:text-cream-400 mb-3">{opt.tag}</div>
              <h3 className="font-display text-xl font-semibold text-navy-900 dark:text-cream-100 mb-3">{opt.title}</h3>
              <p className="font-body text-sm text-navy-500 dark:text-cream-400 leading-relaxed">{opt.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="card p-10">
          <h2 className="font-display text-2xl font-semibold text-navy-900 dark:text-cream-100 mb-3">Have security questions?</h2>
          <p className="font-body text-navy-500 dark:text-cream-400 mb-6">Our security team is happy to answer questions, complete your vendor questionnaire, or set up a technical deep dive.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact?type=enterprise" className="btn-primary">Talk to our security team <ArrowRight size={16} /></Link>
            <a href="mailto:security@nexusai.com" className="btn-secondary">security@nexusai.com</a>
          </div>
        </div>
      </div>
    </div>
  );
}
