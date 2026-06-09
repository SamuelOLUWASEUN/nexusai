"use client";
import { useState } from "react";
import Link from "next/link";
import { Check, Minus, ArrowRight } from "lucide-react";
import { PLANS } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      key: "free",
      ...PLANS.free,
      cta: "Start for free",
      ctaHref: "/signup",
      featured: false,
      description: "Perfect for solo builders and small teams getting started with AI.",
    },
    {
      key: "pro",
      ...PLANS.pro,
      cta: "Start 14-day trial",
      ctaHref: "/signup?plan=pro",
      featured: true,
      description: "Everything you need for a growing team that wants unlimited AI power.",
    },
    {
      key: "enterprise",
      ...PLANS.enterprise,
      cta: "Talk to sales",
      ctaHref: "/contact?type=enterprise",
      featured: false,
      description: "For large organizations that need compliance, custom deployment and SLAs.",
    },
  ];

  const compareRows = [
    { label: "AI queries",          free: "50/day",       pro: "Unlimited",     enterprise: "Unlimited"    },
    { label: "Integrations",        free: "3",            pro: "All 100+",      enterprise: "All + custom" },
    { label: "Workspace members",   free: "1",            pro: "Up to 15",      enterprise: "Unlimited"    },
    { label: "History retention",   free: "7 days",       pro: "Unlimited",     enterprise: "Custom"       },
    { label: "Meeting summaries",   free: false,          pro: true,            enterprise: true           },
    { label: "AI writing assistant",free: false,          pro: true,            enterprise: true           },
    { label: "Predictive insights", free: false,          pro: true,            enterprise: true           },
    { label: "Custom prompts",      free: false,          pro: true,            enterprise: true           },
    { label: "SSO / SAML",         free: false,          pro: false,           enterprise: true           },
    { label: "Private cloud",       free: false,          pro: false,           enterprise: true           },
    { label: "SLA guarantee",       free: false,          pro: false,           enterprise: true           },
    { label: "Dedicated CSM",       free: false,          pro: false,           enterprise: true           },
    { label: "Support",             free: "Community",    pro: "Priority email", enterprise: "24/7 dedicated"},
  ];

  return (
    <section className="section bg-cream-50 dark:bg-navy-950" id="pricing">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="section-tag mx-auto">Pricing</div>
          <h2 className="section-title">Simple, honest pricing.<br />No surprises.</h2>
          <p className="section-sub mx-auto text-center mb-8">
            Start free. Upgrade when you're ready. Cancel anytime. No hidden fees, no setup costs, no per-seat surprises.
          </p>

          {/* Annual toggle */}
          <div className="inline-flex items-center gap-3 bg-navy-50 dark:bg-navy-800 rounded-xl p-1.5 border border-navy-100 dark:border-navy-700">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                "px-4 py-2 rounded-lg font-body text-sm font-medium transition-all",
                !annual ? "bg-white dark:bg-navy-700 text-navy-900 dark:text-cream-100 shadow-sm" : "text-navy-500 dark:text-cream-400"
              )}
            >Monthly</button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg font-body text-sm font-medium transition-all",
                annual ? "bg-white dark:bg-navy-700 text-navy-900 dark:text-cream-100 shadow-sm" : "text-navy-500 dark:text-cream-400"
              )}
            >
              Annual
              <span className="px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-mono text-xs font-bold">-20%</span>
            </button>
          </div>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan) => (
            <div key={plan.key} className={cn(
              "relative rounded-2xl p-7 border transition-all duration-300",
              plan.featured
                ? "bg-navy-900 dark:bg-accent-blue border-navy-900 dark:border-accent-blue shadow-navy scale-105"
                : "bg-white dark:bg-navy-800 border-navy-100 dark:border-navy-700 shadow-card hover:shadow-card-hover"
            )}>
              {plan.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent-blue dark:bg-white text-white dark:text-navy-900 font-mono text-xs font-bold">
                  MOST POPULAR
                </div>
              )}

              <div className={`font-mono text-xs font-medium tracking-widest uppercase mb-3 ${plan.featured ? "text-cream-400" : "text-navy-400 dark:text-cream-500"}`}>
                {plan.name}
              </div>

              <div className={`font-display font-semibold mb-1 ${plan.featured ? "text-white" : "text-navy-900 dark:text-cream-50"}`}>
                {plan.price === null ? (
                  <span className="text-3xl">Custom</span>
                ) : (
                  <div className="flex items-end gap-1">
                    <span className="text-4xl">${annual && plan.price > 0 ? Math.floor(plan.price * 0.8) : plan.price}</span>
                    <span className={`text-base mb-1 font-body font-normal ${plan.featured ? "text-cream-400" : "text-navy-400 dark:text-cream-400"}`}>
                      {plan.price === 0 ? "forever" : "/mo"}
                    </span>
                  </div>
                )}
              </div>

              {annual && plan.price && plan.price > 0 && (
                <div className={`font-mono text-xs mb-3 ${plan.featured ? "text-cream-500" : "text-navy-400"}`}>
                  Billed ${Math.floor(plan.price * 0.8 * 12)}/year
                </div>
              )}

              <p className={`font-body text-sm leading-relaxed mb-6 ${plan.featured ? "text-cream-300" : "text-navy-500 dark:text-cream-400"}`}>
                {plan.description}
              </p>

              <Link href={plan.ctaHref} className={cn(
                "flex items-center justify-center gap-2 w-full py-3 rounded-xl font-body font-semibold text-sm mb-6 transition-all duration-200",
                plan.featured
                  ? "bg-white text-navy-900 hover:bg-cream-100"
                  : plan.key === "enterprise"
                  ? "bg-navy-900 dark:bg-accent-blue text-white hover:bg-navy-700 dark:hover:bg-blue-500"
                  : "border-2 border-navy-200 dark:border-navy-600 text-navy-700 dark:text-cream-200 hover:border-navy-400 dark:hover:border-navy-400"
              )}>
                {plan.cta} {plan.key !== "free" && <ArrowRight size={15} />}
              </Link>

              <ul className="space-y-2.5">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${plan.featured ? "bg-white/20" : "bg-green-100 dark:bg-green-900/30"}`}>
                      <Check size={10} className={plan.featured ? "text-white" : "text-green-600 dark:text-green-400"} />
                    </div>
                    <span className={`font-body text-sm ${plan.featured ? "text-cream-200" : "text-navy-600 dark:text-cream-300"}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Compare table */}
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-navy-100 dark:border-navy-700 bg-navy-50 dark:bg-navy-800/50">
            <h3 className="font-display font-semibold text-navy-900 dark:text-cream-100">Full comparison</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy-100 dark:border-navy-700">
                  <th className="text-left px-6 py-3 font-body text-sm font-medium text-navy-500 dark:text-cream-400 w-1/2">Feature</th>
                  {["Starter", "Pro", "Enterprise"].map(p => (
                    <th key={p} className="text-center px-6 py-3 font-mono text-xs font-bold text-navy-900 dark:text-cream-100 uppercase tracking-wider">{p}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row, i) => (
                  <tr key={i} className="border-b border-navy-50 dark:border-navy-800 hover:bg-navy-50/50 dark:hover:bg-navy-800/30 transition-colors">
                    <td className="px-6 py-3 font-body text-sm text-navy-700 dark:text-cream-300">{row.label}</td>
                    {[row.free, row.pro, row.enterprise].map((val, j) => (
                      <td key={j} className="px-6 py-3 text-center">
                        {typeof val === "boolean" ? (
                          val
                            ? <Check size={16} className="text-green-500 mx-auto" />
                            : <Minus size={16} className="text-navy-200 dark:text-navy-700 mx-auto" />
                        ) : (
                          <span className="font-mono text-xs text-navy-600 dark:text-cream-400">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
