"use client";

const companies = [
  "Stripe", "Vercel", "Linear", "Notion", "Figma",
  "Loom", "Retool", "Supabase", "Clerk", "Resend",
];

export function LogoBar() {
  return (
    <section className="py-16 px-4 border-y border-navy-100 dark:border-navy-800 bg-navy-50/50 dark:bg-navy-900/30">
      <div className="max-w-7xl mx-auto">
        <p className="text-center font-mono text-xs text-navy-400 dark:text-cream-500 tracking-widest uppercase mb-10">
          Trusted by teams at world-class companies
        </p>
        <div className="relative overflow-hidden">
          <div
            className="flex gap-16 items-center w-max"
            style={{ animation: "nexusScroll 25s linear infinite" }}
          >
            {[...companies, ...companies].map((name, i) => (
              <span
                key={i}
                className="font-display font-semibold text-lg text-navy-300 dark:text-navy-600 hover:text-navy-500 dark:hover:text-navy-400 transition-colors whitespace-nowrap cursor-default"
              >
                {name}
              </span>
            ))}
          </div>
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-navy-50/80 dark:from-navy-900/80 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-navy-50/80 dark:from-navy-900/80 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Keyframe defined inline to avoid styled-jsx */}
      <style>{`
        @keyframes nexusScroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
