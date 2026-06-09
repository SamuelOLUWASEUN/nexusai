"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Play, Sparkles, ChevronRight } from "lucide-react";
import { DEMO_QUERIES } from "@/lib/utils";

export function Hero() {
  const [currentQuery, setCurrentQuery] = useState(0);
  const [typed, setTyped] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [response, setResponse] = useState("");
  const [showResponse, setShowResponse] = useState(false);

  const RESPONSES = [
    "Here's a summary of 47 Intercom conversations from last week:\n\n**Top complaints:**\n• Slow dashboard load times (18 mentions)\n• Export feature not working (12 mentions)\n• Billing confusion on plan upgrades (9 mentions)\n\n**Sentiment:** 62% negative, 28% neutral, 10% positive\n**Recommended action:** Prioritize dashboard performance fix for next sprint.",
    "**Yesterday's Product Meeting Summary**\n\nAttendees: Sarah, Marcus, Priya, Dev team\n\n**Decisions made:**\n• Ship v2.3 on Friday (confirmed)\n• Push analytics redesign to Q4\n• Hire 2 senior engineers by August\n\n**Action items:**\n• Marcus → finalize pricing page copy by Wednesday\n• Dev team → fix P1 export bug before release",
    "**Q3 Investor Update Draft**\n\nDear Investors,\n\nWe're pleased to share our Q3 results. Revenue grew 34% QoQ to $2.1M ARR, driven by strong enterprise adoption. Key highlights include 3 Fortune 500 partnerships signed and NPS improving from 42 to 67.\n\nLooking ahead to Q4, we're focused on...",
    "**Open P1 Bugs — Backend Team**\n\nFound 8 open P1 issues in Linear:\n\n1. [BE-2341] Auth token expiry causes silent logout — *Jake* · 3 days old\n2. [BE-2356] API rate limit not resetting — *Priya* · 1 day old\n3. [BE-2389] Database timeout on large exports — *Marcus* · 5 hours old\n\n*Oldest unresolved: 3 days. Recommend daily standup review.*",
  ];

  useEffect(() => {
    const query = DEMO_QUERIES[currentQuery];
    let i = 0;
    setTyped("");
    setShowResponse(false);
    setResponse("");
    setIsTyping(true);

    const typeInterval = setInterval(() => {
      if (i < query.length) {
        setTyped(query.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTimeout(() => {
          setShowResponse(true);
          const resp = RESPONSES[currentQuery % RESPONSES.length];
          let j = 0;
          const respInterval = setInterval(() => {
            if (j < resp.length) {
              setResponse(resp.slice(0, j + 1));
              j += 3;
            } else {
              clearInterval(respInterval);
              setTimeout(() => {
                setCurrentQuery(q => (q + 1) % DEMO_QUERIES.length);
              }, 3500);
            }
          }, 18);
        }, 600);
      }
    }, 38);

    return () => clearInterval(typeInterval);
  }, [currentQuery]);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-16 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-grid-navy bg-[size:48px_48px] dark:bg-grid-white opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-cream-50 via-cream-50/95 to-cream-50 dark:from-navy-950 dark:via-navy-950/95 dark:to-navy-950" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-indigo/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Announcement banner */}
        <div className="flex justify-center mb-8">
          <Link href="/blog/series-a" className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-navy-800 border border-navy-100 dark:border-navy-700 shadow-card hover:shadow-card-hover transition-all">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-accent-blue text-white font-mono text-xs font-bold">NEW</span>
            <span className="font-body text-sm text-navy-600 dark:text-cream-300">Nexus AI raises $12M Series A to scale enterprise AI</span>
            <ChevronRight size={14} className="text-navy-400 group-hover:text-accent-blue group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto mb-6">
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-navy-900 dark:text-cream-50 leading-[1.05] tracking-tight mb-6 animate-fade-up">
            The AI that knows
            <br />
            <span className="italic text-accent-blue">your entire company.</span>
          </h1>
          <p className="font-body text-xl text-navy-500 dark:text-cream-400 leading-relaxed max-w-2xl mx-auto animate-fade-up [animation-delay:100ms]">
            Connect Slack, Notion, GitHub, Jira and 100+ tools. Ask anything. Get instant answers, automated summaries, and AI actions — across your whole organization.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16 animate-fade-up [animation-delay:200ms]">
          <Link href="/signup" className="btn-primary text-base px-8 py-3.5">
            Start for free <ArrowRight size={16} />
          </Link>
          <Link href="/demo" className="btn-secondary text-base px-8 py-3.5">
            <Play size={15} className="text-accent-blue" /> Watch 3-min demo
          </Link>
        </div>

        {/* Social proof */}
        <div className="flex flex-wrap items-center justify-center gap-6 mb-14 animate-fade-up [animation-delay:300ms]">
          {[
            { num: "2,400+", label: "Teams" },
            { num: "4.9★",   label: "Rating" },
            { num: "2.8h",   label: "Saved daily" },
            { num: "99.9%",  label: "Uptime" },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="font-display font-semibold text-navy-900 dark:text-cream-100">{s.num}</span>
              <span className="font-body text-sm text-navy-400 dark:text-cream-500">{s.label}</span>
              <span className="w-px h-4 bg-navy-200 dark:bg-navy-700 last:hidden" />
            </div>
          ))}
        </div>

        {/* Live Demo Window */}
        <div className="relative max-w-3xl mx-auto animate-fade-up [animation-delay:400ms]">
          {/* Window chrome */}
          <div className="bg-white dark:bg-navy-800 rounded-2xl border border-navy-100 dark:border-navy-700 shadow-[0_24px_80px_rgba(9,15,40,0.12)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.4)] overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-navy-100 dark:border-navy-700 bg-navy-50/50 dark:bg-navy-900/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-navy-100 dark:bg-navy-800 text-navy-400 dark:text-cream-500 font-mono text-xs">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  nexus.ai/workspace
                </div>
              </div>
              <div className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-accent-blue/10 text-accent-blue font-mono text-xs">
                <Sparkles size={11} />
                Live AI
              </div>
            </div>

            {/* Chat interface */}
            <div className="p-6 min-h-72">
              {/* Sources */}
              <div className="flex gap-2 mb-5 flex-wrap">
                {["Slack", "Notion", "Intercom", "Linear", "GitHub"].map(s => (
                  <span key={s} className="tag text-xs">{s}</span>
                ))}
                <span className="tag text-xs text-accent-blue border-accent-blue/20 bg-accent-blue/5">+96 more</span>
              </div>

              {/* User message */}
              <div className="flex justify-end mb-4">
                <div className="chat-bubble-user max-w-md">
                  {typed}
                  {isTyping && <span className="inline-block w-0.5 h-4 bg-white ml-0.5 animate-pulse" />}
                </div>
              </div>

              {/* AI response */}
              {showResponse && (
                <div className="flex gap-3 animate-fade-in">
                  <div className="w-7 h-7 rounded-lg bg-navy-900 dark:bg-accent-blue flex items-center justify-center flex-shrink-0 mt-1">
                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
                      <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="chat-bubble-ai max-w-lg flex-1">
                    <div className="whitespace-pre-wrap text-sm leading-relaxed font-body">
                      {response.split("**").map((part, i) => (
                        i % 2 === 1
                          ? <strong key={i} className="font-semibold text-navy-900 dark:text-cream-50">{part}</strong>
                          : <span key={i}>{part}</span>
                      ))}
                      {showResponse && response.length < RESPONSES[currentQuery % RESPONSES.length].length && (
                        <span className="inline-block w-0.5 h-4 bg-navy-400 ml-0.5 animate-pulse" />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input bar */}
            <div className="px-4 pb-4">
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-navy-200 dark:border-navy-600 bg-navy-50 dark:bg-navy-900">
                <span className="font-body text-sm text-navy-300 dark:text-navy-500 flex-1">Ask Nexus anything about your company...</span>
                <div className="flex items-center gap-2">
                  <kbd className="px-1.5 py-0.5 rounded text-xs font-mono text-navy-400 bg-white dark:bg-navy-800 border border-navy-200 dark:border-navy-700">⌘K</kbd>
                  <div className="w-7 h-7 rounded-lg bg-navy-900 dark:bg-accent-blue flex items-center justify-center">
                    <ArrowRight size={13} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating cards */}
          <div className="absolute -left-16 top-16 hidden xl:block animate-float">
            <div className="bg-white dark:bg-navy-800 rounded-xl border border-navy-100 dark:border-navy-700 shadow-card p-3 w-44">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-md bg-green-100 flex items-center justify-center text-xs">✓</div>
                <span className="font-body text-xs font-semibold text-navy-900 dark:text-cream-100">Time saved</span>
              </div>
              <div className="font-display text-2xl font-semibold text-green-600">2.8h</div>
              <div className="font-body text-xs text-navy-400 mt-0.5">per employee / day</div>
            </div>
          </div>
          <div className="absolute -right-16 bottom-16 hidden xl:block animate-float [animation-delay:2s]">
            <div className="bg-white dark:bg-navy-800 rounded-xl border border-navy-100 dark:border-navy-700 shadow-card p-3 w-48">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-md bg-blue-100 flex items-center justify-center text-xs">⚡</div>
                <span className="font-body text-xs font-semibold text-navy-900 dark:text-cream-100">Answer speed</span>
              </div>
              <div className="font-display text-2xl font-semibold text-accent-blue">0.8s</div>
              <div className="font-body text-xs text-navy-400 mt-0.5">avg. response time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
