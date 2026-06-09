import Link from "next/link";
import { Twitter, Linkedin, Github, Mail } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features",     href: "/features"     },
    { label: "Integrations", href: "/integrations" },
    { label: "Pricing",      href: "/pricing"      },
    { label: "Security",     href: "/security"     },
    { label: "Changelog",    href: "/changelog"    },
  ],
  Solutions: [
    { label: "For Startups",    href: "/solutions/startups"    },
    { label: "For Enterprise",  href: "/solutions/enterprise"  },
    { label: "For Engineering", href: "/solutions/engineering" },
  ],
  Company: [
    { label: "About",   href: "/about"   },
    { label: "Blog",    href: "/blog"    },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy",    href: "/privacy" },
    { label: "Terms of Service",  href: "/terms"   },
    { label: "Cookie Policy",     href: "/cookies" },
    { label: "DPA",               href: "/dpa"     },
  ],
};

export function Footer() {
  return (
    <footer className="bg-navy-900 dark:bg-navy-950 text-cream-200 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 pb-16 border-b border-navy-700">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-lg bg-accent-blue flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
                  <path d="M9 2V16M2.5 6L15.5 12M15.5 6L2.5 12" stroke="white" strokeWidth="1" opacity="0.5"/>
                </svg>
              </div>
              <span className="font-display font-semibold text-xl text-white">Nexus <span className="text-accent-blue">AI</span></span>
            </div>
            <p className="font-body text-sm text-cream-400 leading-relaxed max-w-56 mb-6">
              The AI workspace hub that knows your entire company — so your team can move faster.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Twitter,  href: "#" },
                { icon: Linkedin, href: "#" },
                { icon: Github,   href: "#" },
                { icon: Mail,     href: "#" },
              ].map(({ icon: Icon, href }) => (
                <a key={href} href={href}
                  className="w-8 h-8 rounded-lg bg-navy-800 flex items-center justify-center text-cream-400 hover:text-white hover:bg-navy-700 transition-all">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <p className="font-mono text-xs font-medium text-cream-500 tracking-widest uppercase mb-4">{category}</p>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="font-body text-sm text-cream-400 hover:text-white transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-xs text-cream-500">© 2026 Nexus AI, Inc. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-mono text-xs text-cream-500">All systems operational</span>
          </div>
          <p className="font-body text-xs text-cream-600">SOC 2 Type II · ISO 27001 · GDPR Compliant</p>
        </div>
      </div>
    </footer>
  );
}
