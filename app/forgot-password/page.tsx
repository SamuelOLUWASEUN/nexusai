"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Check } from "lucide-react";
import { createClient } from "@/supabase/client";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail]   = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent]     = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }
    setSent(true);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-sm">
        <Link href="/login" className="inline-flex items-center gap-2 text-sm font-body text-navy-500 dark:text-cream-400 hover:text-navy-900 dark:hover:text-white transition-colors mb-10">
          <ArrowLeft size={14} /> Back to sign in
        </Link>

        {sent ? (
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-5">
              <Check size={24} className="text-green-600 dark:text-green-400" />
            </div>
            <h1 className="font-display text-2xl font-semibold text-navy-900 dark:text-cream-50 mb-2">Check your email</h1>
            <p className="font-body text-sm text-navy-500 dark:text-cream-400 leading-relaxed mb-6">
              We've sent a password reset link to <strong className="text-navy-900 dark:text-cream-100">{email}</strong>. It expires in 1 hour.
            </p>
            <Link href="/login" className="btn-primary w-full justify-center">Back to sign in</Link>
          </div>
        ) : (
          <>
            <h1 className="font-display text-3xl font-semibold text-navy-900 dark:text-cream-50 mb-2">Reset your password</h1>
            <p className="font-body text-sm text-navy-500 dark:text-cream-400 mb-8">
              Enter your email and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="font-body text-sm font-medium text-navy-700 dark:text-cream-300 block mb-1.5">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="input"
                />
              </div>
              <button type="submit" disabled={loading || !email} className="btn-primary w-full py-3">
                {loading ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : "Send reset link"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
