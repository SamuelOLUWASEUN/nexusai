"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/supabase/client";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useThemeStore } from "@/lib/theme-store";
import { cn } from "@/lib/utils";

function NavbarAuth() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user ?? null));
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <Link href="/dashboard" className="btn-ghost text-sm hidden md:flex">
          Dashboard
        </Link>
        <Link href="/dashboard"
          className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-blue to-accent-indigo flex items-center justify-center text-white font-bold text-sm">
          {(user.user_metadata?.full_name || user.email)?.[0]?.toUpperCase()}
        </Link>
      </div>
    );
  }

  return (
    <>
      <Link href="/login" className="hidden md:flex btn-ghost text-sm">Sign in</Link>
      <Link href="/signup" className="btn-primary text-sm px-5 py-2.5">
        Get started free
      </Link>
    </>
  );
}

const navLinks = [
  {
    label: "Product",
    children: [
      { href: "/features",  label: "Features",     desc: "Everything Nexus can do" },
      { href: "/integrations", label: "Integrations", desc: "100+ tool connections"   },
      { href: "/security",  label: "Security",     desc: "Enterprise-grade protection"},
    ],
  },
  {
    label: "Solutions",
    children: [
      { href: "/solutions/startups",    label: "For Startups",    desc: "Move fast, stay aligned"      },
      { href: "/solutions/enterprise",  label: "For Enterprise",  desc: "Scale across your org"        },
      { href: "/solutions/engineering", label: "For Engineering", desc: "Ship faster with less friction"},
    ],
  },
  { label: "Pricing", href: "/pricing" },
  { label: "Blog",    href: "/blog"    },
];

export function Navbar() {
  const pathname  = usePathname();
  const { theme, toggleTheme } = useThemeStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled
        ? "bg-white/95 dark:bg-navy-950/95 backdrop-blur-xl border-b border-navy-100 dark:border-navy-800 py-3 shadow-sm"
        : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-navy-900 dark:bg-accent-blue flex items-center justify-center shadow-navy group-hover:shadow-blue transition-all duration-200">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M9 2V16M2.5 6L15.5 12M15.5 6L2.5 12" stroke="white" strokeWidth="1" opacity="0.5"/>
            </svg>
          </div>
          <span className="font-display font-semibold text-xl text-navy-900 dark:text-cream-50 tracking-tight">
            Nexus <span className="text-accent-blue">AI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            link.children ? (
              <div key={link.label} className="relative"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}>
                <button className={cn(
                  "flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-150",
                  "text-navy-600 dark:text-cream-300 hover:text-navy-900 dark:hover:text-white hover:bg-navy-50 dark:hover:bg-navy-800"
                )}>
                  {link.label} <ChevronDown size={14} className={cn("transition-transform", activeDropdown === link.label && "rotate-180")} />
                </button>
                {activeDropdown === link.label && (
                  <div className="absolute top-full left-0 pt-2 w-64 animate-fade-up">
                    <div className="bg-white dark:bg-navy-800 border border-navy-100 dark:border-navy-700 rounded-2xl shadow-card-hover overflow-hidden p-2">
                      {link.children.map(child => (
                        <Link key={child.href} href={child.href}
                          className="flex flex-col gap-0.5 px-3 py-2.5 rounded-xl hover:bg-navy-50 dark:hover:bg-navy-700 transition-colors group">
                          <span className="font-body font-semibold text-sm text-navy-900 dark:text-cream-100 group-hover:text-accent-blue transition-colors">{child.label}</span>
                          <span className="font-body text-xs text-navy-400 dark:text-cream-400">{child.desc}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link key={link.href} href={link.href!} className={cn(
                "px-4 py-2 rounded-lg text-sm font-body font-medium transition-all duration-150",
                pathname === link.href
                  ? "bg-navy-50 dark:bg-navy-800 text-navy-900 dark:text-white"
                  : "text-navy-600 dark:text-cream-300 hover:text-navy-900 dark:hover:text-white hover:bg-navy-50 dark:hover:bg-navy-800"
              )}>{link.label}</Link>
            )
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-navy-500 dark:text-cream-400 hover:bg-navy-100 dark:hover:bg-navy-800 transition-all"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <NavbarAuth />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-navy-600 dark:text-cream-300 hover:bg-navy-100 dark:hover:bg-navy-800 transition-all"
              >
             {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-9 h-9 rounded-lg flex items-center justify-center text-navy-600 dark:text-cream-300 hover:bg-navy-100 dark:hover:bg-navy-800 transition-all"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-navy-100 dark:border-navy-800 bg-white dark:bg-navy-950 px-4 py-4 space-y-1 animate-fade-in">
          {navLinks.map((link) => (
            link.children ? (
              <div key={link.label}>
                <p className="px-3 py-1.5 text-xs font-mono font-medium text-navy-400 dark:text-cream-500 uppercase tracking-wider">{link.label}</p>
                {link.children.map(child => (
                  <Link key={child.href} href={child.href} onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 rounded-xl text-sm font-body text-navy-700 dark:text-cream-200 hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors">
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link key={link.href} href={link.href!} onClick={() => setMobileOpen(false)}
                className="block px-3 py-2.5 rounded-xl text-sm font-body text-navy-700 dark:text-cream-200 hover:bg-navy-50 dark:hover:bg-navy-800 transition-colors">
                {link.label}
              </Link>
            )
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <Link href="/login" className="btn-secondary w-full text-center" onClick={() => setMobileOpen(false)}>Sign in</Link>
            <Link href="/signup" className="btn-primary w-full text-center" onClick={() => setMobileOpen(false)}>Get started free</Link>
          </div>
        </div>
      )}
    </header>
  );
}
