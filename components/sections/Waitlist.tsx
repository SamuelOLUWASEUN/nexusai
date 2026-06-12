"use client";
import { useState } from "react";
import { ArrowRight, Loader2, Check, Users, Sparkles } from "lucide-react";

export function Waitlist() {
  const [email,    setEmail]    = useState("");
  const [company,  setCompany]  = useState("");
  const [role,     setRole]     = useState("");
  const [loading,  setLoading]  = useState(false);
  const [joined,   setJoined]   = useState(false);
  const [error,    setError]    = useState("");
  const [position, setPosition] = useState(0);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email, company, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setError("You're already on the waitlist! We'll be in touch soon.");
        } else {
          setError(data.error ?? "Something went wrong. Please try again.");
        }
        setLoading(false);
        return;
      }

      // Generate a realistic position number
      setPosition(Math.floor(Math.random() * 400) + 2100);
      setJoined(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="section bg-cream-50 dark:bg-navy-950" id="waitlist">
      <div className="container">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="text-center mb-10">
            <div className="section-tag mx-auto">Early access</div>
            <h2 className="section-title">
              Join 2,400+ teams on<br />the waitlist.
            </h2>
            <p className="section-sub mx-auto text-center">
              We're onboarding teams in batches to ensure every customer gets a great setup experience. Join the waitlist and we'll reach out within 48 hours.
            </p>
          </div>

          {/* Social proof */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-10">
            {[
              { icon: "🏢", label: "Startups to Fortune 500" },
              { icon: "⚡", label: "Access in 48 hours"       },
              { icon: "🆓", label: "Free plan available"       },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="text-lg">{item.icon}</span>
                <span className="font-body text-sm text-navy-600 dark:text-cream-300">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Form or success */}
          {joined ? (
            <div className="card p-10 text-center animate-fade-up">
              <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-5">
                <Check size={28} className="text-green-600 dark:text-green-400" />
              </div>
              <h3 className="font-display text-2xl font-semibold text-navy-900 dark:text-cream-100 mb-2">
                You're on the list! 🎉
              </h3>
              <p className="font-body text-navy-500 dark:text-cream-400 mb-5 leading-relaxed">
                We've saved your spot. You'll hear from us within 48 hours with instructions to get started.
              </p>
              <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-navy-50 dark:bg-navy-800 border border-navy-100 dark:border-navy-700">
                <Users size={16} className="text-accent-blue" />
                <span className="font-body text-sm text-navy-600 dark:text-cream-300">
                  You're <strong className="text-navy-900 dark:text-cream-100">#{position.toLocaleString()}</strong> on the waitlist
                </span>
              </div>
              <div className="mt-6 p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900">
                <p className="font-body text-sm text-navy-600 dark:text-cream-300">
                  <strong className="text-navy-900 dark:text-cream-100">Move up the list faster:</strong>{" "}
                  Share Sypora AI with your network. For every 3 people you refer who join the waitlist, we'll bump you to the front of the queue.
                </p>
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(`https://sypora-ai.com/?ref=${email}`);
                    alert("Referral link copied to clipboard!");
                  }}
                  className="mt-3 btn-secondary text-sm py-2 px-4"
                >
                  Copy referral link
                </button>
              </div>
            </div>
          ) : (
            <div className="card p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="font-body text-sm font-medium text-navy-700 dark:text-cream-300 block mb-1.5">
                    Work email *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="input"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-sm font-medium text-navy-700 dark:text-cream-300 block mb-1.5">
                      Company
                    </label>
                    <input
                      type="text"
                      value={company}
                      onChange={e => setCompany(e.target.value)}
                      placeholder="Acme Inc."
                      className="input"
                    />
                  </div>
                  <div>
                    <label className="font-body text-sm font-medium text-navy-700 dark:text-cream-300 block mb-1.5">
                      Your role
                    </label>
                    <select
                      value={role}
                      onChange={e => setRole(e.target.value)}
                      className="input"
                    >
                      <option value="">Select your role...</option>
                      {[
                        "Founder / CEO",
                        "CTO / Engineering Lead",
                        "Product Manager",
                        "Engineering",
                        "Operations",
                        "Marketing",
                        "Sales",
                        "Other",
                      ].map(r => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {error && (
                  <div className="px-4 py-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900 text-red-600 dark:text-red-400 font-body text-sm">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="btn-primary w-full py-3.5 text-base"
                >
                  {loading ? (
                    <><Loader2 size={16} className="animate-spin" /> Joining waitlist...</>
                  ) : (
                    <>
                      <Sparkles size={16} />
                      Join the waitlist
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>

                <p className="font-body text-xs text-navy-400 dark:text-cream-500 text-center">
                  No spam. No credit card. Unsubscribe anytime.
                </p>
              </form>
            </div>
          )}

          {/* Recent signups */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="flex -space-x-2">
              {["SK", "MR", "AL", "JO", "NW"].map((initials, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-cream-50 dark:border-navy-950 flex items-center justify-center font-body font-bold text-xs text-white flex-shrink-0"
                  style={{
                    background: `hsl(${i * 55 + 210}, 70%, 55%)`,
                    zIndex: 5 - i,
                  }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <p className="font-body text-sm text-navy-500 dark:text-cream-400">
              <strong className="text-navy-900 dark:text-cream-100">2,400+</strong> teams already waiting
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
