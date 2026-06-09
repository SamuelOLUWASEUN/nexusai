"use client";
export default function OfflinePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 gap-6">
      <div className="w-20 h-20 rounded-2xl bg-navy-50 dark:bg-navy-800 border border-navy-100 dark:border-navy-700 flex items-center justify-center text-4xl">
        📡
      </div>
      <div>
        <h1 className="font-display text-3xl font-semibold text-navy-900 dark:text-cream-100 mb-2">
          You are offline
        </h1>
        <p className="font-body text-navy-500 dark:text-cream-400 text-sm max-w-xs leading-relaxed">
          Nexus AI needs an internet connection to work. Please check your connection and try again.
        </p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="btn-primary"
      >
        Try again
      </button>
    </div>
  );
}
