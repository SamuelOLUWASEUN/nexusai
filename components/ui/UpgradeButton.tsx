"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { createClient } from "@/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Props = {
  plan:     "pro" | "enterprise";
  billing:  "monthly" | "annual";
  label:    string;
  className?: string;
};

export function UpgradeButton({ plan, billing, label, className }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleClick() {
    // Check auth first
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      router.push(`/signup?plan=${plan}`);
      return;
    }

    if (plan === "enterprise") {
      router.push("/contact?type=enterprise");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/stripe/checkout", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ plan, billing }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to create checkout");
      if (data.url) window.location.href = data.url;

    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={cn(
        "flex items-center justify-center gap-2 w-full py-3 rounded-xl font-body font-semibold text-sm transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed",
        className
      )}
    >
      {loading ? (
        <><Loader2 size={15} className="animate-spin" /> Redirecting to checkout...</>
      ) : (
        label
      )}
    </button>
  );
}
