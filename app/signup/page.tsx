"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Loader2, Check } from "lucide-react";
import { createClient } from "@/supabase/client";
import { toast } from "sonner";
import { Suspense } from "react";

function SignupForm() {
  const router     = useRouter();
  const params     = useSearchParams();
  const plan       = params.get("plan") ?? "free";
  const [step, setStep]         = useState(1);
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [form, setForm]         = useState({
    email: "", password: "", fullName: "", company: "", role: "",
  });

  function set(key: string, value: string) {
    setForm(f => ({ ...f, [key]: value }));
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email || !form.password || !form.fullName) return;
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email:    form.email,
      password: form.password,
      options:  { data: { full_name: form.fullName, company: form.company, role: form.role } },
    });
    if (error) { toast.error(error.message); setLoading(false); return; }
    toast.success("Account created! Check your email to confirm.");
    router.push("/dashboard");
  }

  const benefits = [
    "Free forever — no credit card required",
    "Connect your first tool in 60 seconds",
    "14-day Pro trial included",
    "Set up in under 4 minutes",
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left — decorative */}
      <div className="hidden lg:flex flex-1 bg-navy-900 dark:bg-navy-800 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white bg-[size:40px_40px] opacity-20" />
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-accent-blue/20 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-sm">
          <div className="font-display text-4xl font-semibold text-white mb-6 leading-tight">
            Join 2,400+ teams already saving hours every day.
          </div>
          <div className="space-y-3 mb-8">
            {benefits.map((b, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center flex-shrink-0">
                  <Check size={11} className="text-green-400" />
                </div>
                <span className="font-body text-sm text-cream-300">{b}</span>
              </div>
            ))}
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
            <p className="font-body text-sm text-cream-300 italic mb-3">
              "We had Nexus connected and answering questions in 6 minutes. By end of day 1, three different teams were using it."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center font-body font-bold text-xs text-white">SK</div>
              <div>
                <p className="font-body font-semibold text-white text-xs">Sarah Kim</p>
                <p className="font-body text-xs text-cream-500">CTO at Flowbase</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-sm">
          <Link href="/" className="flex items-center gap-2 mb-10">
            <div className="w-7 h-7 rounded-lg bg-navy-900 dark:bg-accent-blue flex items-center justify-center">
              <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-display font-semibold text-lg text-navy-900 dark:text-cream-50">Nexus <span className="text-accent-blue">AI</span></span>
          </Link>

          <h1 className="font-display text-3xl font-semibold text-navy-900 dark:text-cream-50 mb-2">Create your account</h1>
          <p className="font-body text-sm text-navy-500 dark:text-cream-400 mb-8">
            {plan === "pro" ? "14-day Pro trial · " : "Free forever · "}No credit card required.{" "}
            <Link href="/login" className="text-accent-blue hover:underline font-medium">Already have an account?</Link>
          </p>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="font-body text-sm font-medium text-navy-700 dark:text-cream-300 block mb-1.5">Full Name *</label>
              <input type="text" value={form.fullName} onChange={e => set("fullName", e.target.value)}
                placeholder="Jane Smith" required className="input" />
            </div>
            <div>
              <label className="font-body text-sm font-medium text-navy-700 dark:text-cream-300 block mb-1.5">Work Email *</label>
              <input type="email" value={form.email} onChange={e => set("email", e.target.value)}
                placeholder="jane@company.com" required className="input" />
            </div>
            <div>
              <label className="font-body text-sm font-medium text-navy-700 dark:text-cream-300 block mb-1.5">Company</label>
              <input type="text" value={form.company} onChange={e => set("company", e.target.value)}
                placeholder="Acme Inc." className="input" />
            </div>
            <div>
              <label className="font-body text-sm font-medium text-navy-700 dark:text-cream-300 block mb-1.5">Your Role</label>
              <select value={form.role} onChange={e => set("role", e.target.value)} className="input">
                <option value="">Select your role...</option>
                {["Founder / CEO", "CTO / Engineering Lead", "Product Manager", "Engineering", "Marketing", "Sales", "Operations", "Other"].map(r => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="font-body text-sm font-medium text-navy-700 dark:text-cream-300 block mb-1.5">Password *</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} value={form.password} onChange={e => set("password", e.target.value)}
                  placeholder="At least 8 characters" required minLength={8} className="input pr-10" />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600 dark:hover:text-cream-200 transition-colors">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading || !form.email || !form.password || !form.fullName}
              className="btn-primary w-full py-3 text-base mt-2">
              {loading
                ? <><Loader2 size={16} className="animate-spin" /> Creating account...</>
                : <>Create account <ArrowRight size={16} /></>}
            </button>
          </form>

          <p className="font-body text-xs text-navy-400 dark:text-cream-500 text-center mt-5">
            By creating an account you agree to our{" "}
            <Link href="/terms" className="text-accent-blue hover:underline">Terms</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-accent-blue hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 size={24} className="animate-spin text-accent-blue" /></div>}>
      <SignupForm />
    </Suspense>
  );
}
