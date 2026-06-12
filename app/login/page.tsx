"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";
import { createClient } from "@/supabase/client";
import { toast } from "sonner";

export default function LoginPage() {
  const router  = useRouter();
  const [email, setEmail]       = useState("");
  const [password, setPass]     = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading]   = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    toast.success("Welcome back!");
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex">
      {/* Left — form */}
      <div className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 mb-10 group">
            <div className="w-7 h-7 rounded-lg bg-navy-900 dark:bg-accent-blue flex items-center justify-center">
              <svg width="15" height="15" viewBox="0 0 18 18" fill="none">
                <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-display font-semibold text-lg text-navy-900 dark:text-cream-50">
              Sypora <span className="text-accent-blue">AI</span>
            </span>
          </Link>

          <h1 className="font-display text-3xl font-semibold text-navy-900 dark:text-cream-50 mb-2">Welcome back</h1>
          <p className="font-body text-sm text-navy-500 dark:text-cream-400 mb-8">
            Sign in to your workspace.{" "}
            <Link href="/signup" className="text-accent-blue hover:underline font-medium">No account? Sign up</Link>
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="font-body text-sm font-medium text-navy-700 dark:text-cream-300 block mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="input"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="font-body text-sm font-medium text-navy-700 dark:text-cream-300">Password</label>
                <Link href="/forgot-password" className="font-body text-xs text-accent-blue hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPass(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="input pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-navy-400 hover:text-navy-600 dark:hover:text-cream-200 transition-colors"
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="btn-primary w-full py-3 text-base mt-2"
            >
              {loading ? <><Loader2 size={16} className="animate-spin" /> Signing in...</> : <>Sign in <ArrowRight size={16} /></>}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-navy-100 dark:border-navy-700" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-3 bg-cream-50 dark:bg-navy-950 font-body text-xs text-navy-400 dark:text-cream-500">or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {["Google", "Microsoft"].map(provider => (
              <button key={provider} className="btn-secondary py-2.5 text-sm">
                {provider === "Google" ? "🅖" : "🪟"} {provider}
              </button>
            ))}
          </div>

          <p className="font-body text-xs text-navy-400 dark:text-cream-500 text-center mt-6">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-accent-blue hover:underline">Terms</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-accent-blue hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>

      {/* Right — decorative panel */}
      <div className="hidden lg:flex flex-1 bg-navy-900 dark:bg-navy-800 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white bg-[size:40px_40px] opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent-blue/20 rounded-full blur-3xl" />
        <div className="relative z-10 max-w-sm text-center">
          <div className="text-5xl mb-6">🧠</div>
          <h2 className="font-display text-3xl font-semibold text-white mb-4 leading-tight">
            "Sypora saved our team 16 hours of senior leadership time every week."
          </h2>
          <p className="font-body text-cream-400 text-sm">Marcus Reid, VP of Operations at Archtype</p>
          <div className="flex justify-center gap-1 mt-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 14 14" fill="#FBBF24">
                <path d="M7 1l1.5 4.5H13L9.5 8l1.5 4L7 9.5 3 12l1.5-4L1 5.5h4.5L7 1z"/>
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
