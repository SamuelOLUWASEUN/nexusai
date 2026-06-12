"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Mail, MessageSquare, ArrowRight, Loader2, Check } from "lucide-react";
import { toast } from "sonner";

function ContactForm() {
  const params  = useSearchParams();
  const type    = params.get("type") ?? "general";
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm]     = useState({
    name: "", email: "", company: "", message: "",
    type: type === "enterprise" ? "Enterprise inquiry" : type === "demo" ? "Book a demo" : "General question",
  });

  function set(key: string, value: string) { setForm(f => ({ ...f, [key]: value })); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setSent(true);
    setLoading(false);
    toast.success("Message sent! We'll reply within 24 hours.");
  }

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 items-start">

          {/* Left */}
          <div className="lg:col-span-2">
            <div className="section-tag">Contact</div>
            <h1 className="font-display text-4xl font-semibold text-navy-900 dark:text-cream-50 leading-tight mb-4">
              Let's talk.
            </h1>
            <p className="font-body text-navy-500 dark:text-cream-400 leading-relaxed mb-8">
              Whether you're evaluating Sypora for your team, have a question about our enterprise plan, or just want to say hello — we'd love to hear from you.
            </p>

            <div className="space-y-5">
              {[
                { icon: Mail,           title: "Email us",          desc: "hello@sypora-ai.com",           sub: "We reply within 24 hours"        },
                { icon: MessageSquare,  title: "Enterprise sales",   desc: "sales@sypora-ai.com",           sub: "Custom pricing and deployment"   },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl border border-navy-100 dark:border-navy-700 bg-navy-50/50 dark:bg-navy-800/30">
                  <div className="w-9 h-9 rounded-lg bg-white dark:bg-navy-800 border border-navy-100 dark:border-navy-700 flex items-center justify-center flex-shrink-0 shadow-card">
                    <item.icon size={16} className="text-accent-blue" />
                  </div>
                  <div>
                    <p className="font-body font-semibold text-navy-900 dark:text-cream-100 text-sm">{item.title}</p>
                    <p className="font-mono text-sm text-accent-blue">{item.desc}</p>
                    <p className="font-body text-xs text-navy-400 dark:text-cream-500 mt-0.5">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="card p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-5">
                  <Check size={28} className="text-green-600 dark:text-green-400" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-navy-900 dark:text-cream-100 mb-2">Message sent!</h2>
                <p className="font-body text-navy-500 dark:text-cream-400">
                  Thanks for reaching out. Our team will get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="card p-8 space-y-5">
                <div>
                  <label className="font-body text-sm font-medium text-navy-700 dark:text-cream-300 block mb-1.5">Inquiry type</label>
                  <select value={form.type} onChange={e => set("type", e.target.value)} className="input">
                    <option>General question</option>
                    <option>Book a demo</option>
                    <option>Enterprise inquiry</option>
                    <option>Partnership</option>
                    <option>Press & media</option>
                    <option>Technical support</option>
                  </select>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-body text-sm font-medium text-navy-700 dark:text-cream-300 block mb-1.5">Your name *</label>
                    <input type="text" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Jane Smith" required className="input" />
                  </div>
                  <div>
                    <label className="font-body text-sm font-medium text-navy-700 dark:text-cream-300 block mb-1.5">Work email *</label>
                    <input type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="jane@company.com" required className="input" />
                  </div>
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-navy-700 dark:text-cream-300 block mb-1.5">Company</label>
                  <input type="text" value={form.company} onChange={e => set("company", e.target.value)} placeholder="Acme Inc." className="input" />
                </div>
                <div>
                  <label className="font-body text-sm font-medium text-navy-700 dark:text-cream-300 block mb-1.5">Message *</label>
                  <textarea value={form.message} onChange={e => set("message", e.target.value)}
                    placeholder="Tell us about your team, what you're looking for, and any questions you have..."
                    rows={5} required className="input resize-none" />
                </div>
                <button type="submit" disabled={loading || !form.name || !form.email || !form.message} className="btn-primary w-full py-3">
                  {loading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <>Send message <ArrowRight size={16} /></>}
                </button>
                <p className="font-body text-xs text-navy-400 dark:text-cream-500 text-center">
                  By submitting you agree to our{" "}
                  <a href="/privacy" className="text-accent-blue hover:underline">Privacy Policy</a>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 size={24} className="animate-spin text-accent-blue" /></div>}>
      <ContactForm />
    </Suspense>
  );
}
