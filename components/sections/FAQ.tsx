"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "How does Nexus AI actually work?",
    answer: "Nexus connects to your tools via secure OAuth and indexes your data continuously. When you ask a question, our AI searches across all connected sources simultaneously, synthesizes the most relevant information, and returns a cited answer in under a second. All processing respects your existing tool permissions — users only see data they already have access to.",
  },
  {
    question: "Is my company's data safe?",
    answer: "Absolutely. Nexus is SOC 2 Type II certified and ISO 27001 compliant. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We never use your company's data to train our models. Enterprise customers can choose private cloud or on-premise deployment for complete data sovereignty. Full audit logs are available for all queries.",
  },
  {
    question: "How long does setup take?",
    answer: "Most teams are fully set up in under 10 minutes. Connect your first integration in 60 seconds via OAuth — no API keys, no engineering work required. Nexus begins indexing immediately and typically has your first workspace ready to query within 4 minutes. Our onboarding team is available to help for Pro and Enterprise customers.",
  },
  {
    question: "Does Nexus work with our existing permissions?",
    answer: "Yes — this is one of Nexus's most important features. When a user asks a question, Nexus only searches data that user already has permission to access in the source tool. If someone can't see a private Slack channel, they won't see its contents in Nexus answers. Permissions are checked in real time, not cached.",
  },
  {
    question: "What happens to my data if I cancel?",
    answer: "If you cancel your subscription, we give you 30 days to export all your data. After that period, all your data is permanently deleted from our systems within 7 business days. We'll send you a deletion confirmation when complete. You own your data — always.",
  },
  {
    question: "Can I try Nexus before paying?",
    answer: "Yes. The Starter plan is completely free forever with no credit card required. Pro includes a 14-day free trial with full access to all features. Enterprise customers can request a custom proof-of-concept engagement. We're confident you'll see measurable value within your first week.",
  },
  {
    question: "Does Nexus support on-premise deployment?",
    answer: "Yes — on-premise deployment is available on our Enterprise plan. We provide a Docker-based deployment package, full installation support, and ongoing maintenance updates. On-premise customers get the same feature set as cloud customers, with complete control over where their data lives.",
  },
  {
    question: "How does pricing work for large teams?",
    answer: "Pro supports up to 15 members at a flat $49/month. For teams larger than 15, our Enterprise plan offers unlimited seats with custom pricing based on your team size and needs. We offer volume discounts, annual billing discounts of up to 20%, and non-profit pricing. Contact our sales team for a custom quote.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section bg-white dark:bg-navy-900">
      <div className="container">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="section-tag mx-auto">FAQ</div>
            <h2 className="section-title">Common questions,<br />honest answers.</h2>
            <p className="section-sub mx-auto text-center">
              Can't find what you're looking for?{" "}
              <a href="/contact" className="text-accent-blue hover:underline font-medium">Chat with our team →</a>
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-2xl border transition-all duration-200 overflow-hidden",
                  open === i
                    ? "border-accent-blue/30 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-900/50"
                    : "border-navy-100 dark:border-navy-700 bg-navy-50/30 dark:bg-navy-800/30 hover:border-navy-200 dark:hover:border-navy-600"
                )}
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
                >
                  <span className={cn(
                    "font-body font-semibold text-base transition-colors",
                    open === i
                      ? "text-accent-blue"
                      : "text-navy-900 dark:text-cream-100"
                  )}>
                    {faq.question}
                  </span>
                  <div className={cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-all",
                    open === i
                      ? "bg-accent-blue text-white"
                      : "bg-navy-100 dark:bg-navy-700 text-navy-500 dark:text-cream-400"
                  )}>
                    {open === i ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                {open === i && (
                  <div className="px-6 pb-5 animate-fade-in">
                    <p className="font-body text-sm text-navy-600 dark:text-cream-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
