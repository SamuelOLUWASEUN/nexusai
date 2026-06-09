import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        body: ["'Cabinet Grotesk'", "sans-serif"],
        mono: ["'Fira Code'", "monospace"],
      },
      colors: {
        navy: {
          50:  "#f0f4ff",
          100: "#e0e9ff",
          200: "#c7d7fe",
          300: "#a5bbfc",
          400: "#8193f8",
          500: "#6366f1",
          600: "#1a2f6e",
          700: "#152559",
          800: "#0f1b45",
          900: "#090f28",
          950: "#050812",
        },
        cream: {
          50:  "#fdfcf8",
          100: "#faf8f0",
          200: "#f5f0e4",
          300: "#ede4d0",
          400: "#ddd0b4",
          500: "#c9b990",
        },
        accent: {
          blue:   "#2563eb",
          indigo: "#4f46e5",
          teal:   "#0d9488",
          amber:  "#d97706",
          rose:   "#e11d48",
        }
      },
      animation: {
        "fade-up":      "fadeUp 0.6s ease both",
        "fade-in":      "fadeIn 0.4s ease both",
        "slide-right":  "slideRight 0.5s ease both",
        "float":        "float 6s ease-in-out infinite",
        "pulse-slow":   "pulse 4s ease-in-out infinite",
        "shimmer":      "shimmer 2.5s linear infinite",
        "draw":         "draw 1.5s ease forwards",
        "count-up":     "countUp 2s ease both",
      },
      keyframes: {
        fadeUp:    { from: { opacity: "0", transform: "translateY(28px)" }, to: { opacity: "1", transform: "none" } },
        fadeIn:    { from: { opacity: "0" },                                to: { opacity: "1" } },
        slideRight:{ from: { opacity: "0", transform: "translateX(-20px)" }, to: { opacity: "1", transform: "none" } },
        float:     { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        shimmer:   { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        draw:      { from: { strokeDashoffset: "1000" }, to: { strokeDashoffset: "0" } },
      },
      backgroundImage: {
        "grid-navy": "linear-gradient(rgba(26,47,110,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(26,47,110,0.07) 1px, transparent 1px)",
        "grid-white": "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
        "noise": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        "card":       "0 1px 3px rgba(9,15,40,0.06), 0 4px 16px rgba(9,15,40,0.04)",
        "card-hover": "0 4px 12px rgba(9,15,40,0.08), 0 16px 40px rgba(9,15,40,0.08)",
        "navy":       "0 8px 32px rgba(9,15,40,0.2)",
        "blue":       "0 8px 32px rgba(37,99,235,0.25)",
        "glow":       "0 0 60px rgba(37,99,235,0.15)",
      },
    },
  },
  plugins: [],
};
export default config;
