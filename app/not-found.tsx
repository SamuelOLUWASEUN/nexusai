import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 gap-6">
      <div className="w-20 h-20 rounded-2xl bg-navy-50 dark:bg-navy-800 border border-navy-100 dark:border-navy-700 flex items-center justify-center text-4xl">
        🔍
      </div>
      <div>
        <h1 className="font-display text-6xl font-semibold text-navy-900 dark:text-cream-100 mb-2">404</h1>
        <p className="font-display text-2xl text-navy-400 dark:text-cream-400 mb-1">Page not found</p>
        <p className="font-body text-navy-500 dark:text-cream-500 text-sm">This page doesn't exist or was moved.</p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/" className="btn-primary">Back to home</Link>
        <Link href="/contact" className="btn-secondary">Contact support</Link>
      </div>
    </div>
  );
}
