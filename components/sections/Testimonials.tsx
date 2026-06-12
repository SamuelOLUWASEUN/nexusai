const testimonials = [
  {
    quote: "Sypora replaced four internal tools we were paying for. Our engineering team's ramp-up time dropped from 3 weeks to 4 days. It's not an exaggeration — it literally changed how we operate.",
    author: "Sarah Kim",
    role: "CTO",
    company: "Flowbase",
    avatar: "SK",
    color: "from-blue-400 to-indigo-500",
    metric: "3 weeks → 4 days onboarding",
  },
  {
    quote: "Every executive was spending 3-4 hours on Fridays assembling board reports. Now Sypora does it in 10 minutes. That's 16 hours of senior leadership time saved every single week.",
    author: "Marcus Reid",
    role: "VP of Operations",
    company: "Archtype",
    avatar: "MR",
    color: "from-teal-400 to-blue-500",
    metric: "16h saved per week",
  },
  {
    quote: "We tried 6 other AI tools. None of them understood our specific workflows and permissions. Sypora was the first one our security team actually approved — and the first one people actually used.",
    author: "Amara Levi",
    role: "Head of Engineering",
    company: "Pulsar",
    avatar: "AL",
    color: "from-indigo-400 to-purple-500",
    metric: "100% security team approval",
  },
  {
    quote: "Our customer support resolution time dropped 40% in the first month. Agents no longer switch between 5 tools — they just ask Sypora and get everything in one place.",
    author: "James Okafor",
    role: "Director of Support",
    company: "Terrapin",
    avatar: "JO",
    color: "from-amber-400 to-orange-500",
    metric: "40% faster resolution",
  },
  {
    quote: "I was skeptical about another AI tool. But Sypora actually reads our Slack, understands our jargon, and gives answers that feel like they came from someone who's been at the company for years.",
    author: "Nina Walsh",
    role: "Product Lead",
    company: "Creativelab",
    avatar: "NW",
    color: "from-rose-400 to-pink-500",
    metric: "4.9★ team rating",
  },
  {
    quote: "The meeting summaries alone justified the cost. We had 120 meetings last month. Sypora summarized all of them, extracted every action item and sent them to the right people. Zero manual work.",
    author: "David Chen",
    role: "CEO",
    company: "Meridian",
    avatar: "DC",
    color: "from-green-400 to-teal-500",
    metric: "120 meetings auto-summarized",
  },
];

export function Testimonials() {
  return (
    <section className="section bg-navy-900 dark:bg-navy-950 overflow-hidden">
      <div className="container">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-widest uppercase bg-white/10 text-cream-300 border border-white/10 mb-5">
            Customer stories
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-white leading-tight tracking-tight mb-5">
            Loved by teams<br />at every stage.
          </h2>
          <p className="font-body text-lg text-cream-400 max-w-xl mx-auto">
            From 5-person startups to Fortune 500 enterprises — here's what teams say after their first month with Sypora.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="group bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill="#FBBF24">
                    <path d="M7 1l1.5 4.5H13L9.5 8l1.5 4L7 9.5 3 12l1.5-4L1 5.5h4.5L7 1z"/>
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="font-body text-sm text-cream-300 leading-relaxed mb-5 flex-1">
                "{t.quote}"
              </blockquote>

              {/* Metric pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/8 border border-white/10 mb-5">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                <span className="font-mono text-xs text-green-400 font-medium">{t.metric}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.color} flex items-center justify-center font-body font-bold text-sm text-white flex-shrink-0`}>
                  {t.avatar}
                </div>
                <div>
                  <p className="font-body font-semibold text-white text-sm">{t.author}</p>
                  <p className="font-body text-xs text-cream-500">{t.role} · {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stat bar */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/10">
          {[
            { num: "2,400+", label: "Teams using Sypora"          },
            { num: "4.9/5",  label: "Average rating"              },
            { num: "2.8h",   label: "Saved per employee per day"  },
            { num: "99.9%",  label: "Uptime SLA"                  },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-3xl font-semibold text-white mb-1">{stat.num}</div>
              <div className="font-body text-sm text-cream-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
