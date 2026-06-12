import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Toaster }       from "sonner";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfcf8" },
    { media: "(prefers-color-scheme: dark)",  color: "#090f28" },
  ],
  width:        "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title:       { default: "Sypora AI — Your Team's AI Workspace Hub", template: "%s | Sypora AI" },
  description: "Connect your tools. Ask anything. Get instant answers, automated summaries, and AI-powered insights.",
  manifest:    "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "Sypora AI" },
  icons: {
    icon:  [{ url: "/icons/icon-96.png", sizes: "96x96",   type: "image/png" }],
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
        <Toaster
          position="bottom-right"
          toastOptions={{ style: { fontFamily: "'Cabinet Grotesk', sans-serif", fontSize: "14px" } }}
        />
      </body>
    </html>
  );
}