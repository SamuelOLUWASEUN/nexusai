"use client";
import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

export function PWAInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showBanner, setShowBanner]         = useState(false);
  const [installed, setInstalled]           = useState(false);

  useEffect(() => {
    // Register service worker
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((err) => console.warn("SW registration failed:", err));
    }

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setInstalled(true);
      return;
    }

    // Check if user previously dismissed
    const dismissed = localStorage.getItem("nexus-pwa-dismissed");
    if (dismissed) return;

    // Listen for install prompt
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show banner after 30 seconds of use
      setTimeout(() => setShowBanner(true), 30000);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") setInstalled(true);
    setDeferredPrompt(null);
    setShowBanner(false);
  }

  function handleDismiss() {
    setShowBanner(false);
    localStorage.setItem("nexus-pwa-dismissed", "true");
  }

  if (!showBanner || installed) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 z-50 animate-fade-up">
      <div className="bg-white dark:bg-navy-800 border border-navy-100 dark:border-navy-700 rounded-2xl shadow-card-hover p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-navy-900 dark:bg-accent-blue flex items-center justify-center flex-shrink-0">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M9 2L15.5 6V12L9 16L2.5 12V6L9 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-body font-semibold text-navy-900 dark:text-cream-100 text-sm">
              Install Sypora AI
            </p>
            <p className="font-body text-xs text-navy-500 dark:text-cream-400 mt-0.5 leading-relaxed">
              Add to your home screen for instant access — works offline too.
            </p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={handleInstall}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-900 dark:bg-accent-blue text-white font-body font-medium text-xs hover:opacity-90 transition-opacity"
              >
                <Download size={12} /> Install
              </button>
              <button
                onClick={handleDismiss}
                className="px-3 py-1.5 rounded-lg text-navy-500 dark:text-cream-400 font-body text-xs hover:bg-navy-50 dark:hover:bg-navy-700 transition-colors"
              >
                Not now
              </button>
            </div>
          </div>
          <button
            onClick={handleDismiss}
            className="text-navy-400 hover:text-navy-600 dark:hover:text-cream-200 transition-colors flex-shrink-0"
          >
            <X size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
