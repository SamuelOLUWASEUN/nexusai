import type { Metadata } from "next";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-10">
          <p className="font-mono text-xs text-navy-400 dark:text-cream-500 mb-2">Last updated: June 1, 2026</p>
          <h1 className="font-display text-4xl font-semibold text-navy-900 dark:text-cream-50 mb-4">Terms of Service</h1>
          <p className="font-body text-navy-500 dark:text-cream-400 leading-relaxed">
            These Terms of Service ("Terms") govern your access to and use of the Nexus AI platform. By using our service, you agree to these Terms.
          </p>
        </div>

        <div className="space-y-10">
          {[
            {
              title: "1. Acceptance of Terms",
              content: `By creating an account or using Nexus AI, you agree to these Terms and our Privacy Policy. If you are using Nexus on behalf of an organization, you represent that you have authority to bind that organization to these Terms.`,
            },
            {
              title: "2. Service Description",
              content: `Nexus AI provides an AI-powered workspace intelligence platform that connects to your third-party tools and enables natural language search, document generation, meeting summaries and insights.

The service is provided "as is" and we continually improve and update it. We may add, modify or remove features at any time with reasonable notice.`,
            },
            {
              title: "3. Account Responsibilities",
              content: `You are responsible for maintaining the security of your account credentials. You must notify us immediately of any unauthorized access.

You may not share your account with others, use the service for illegal purposes, attempt to reverse engineer our technology, or use the service in ways that violate the terms of your connected third-party tools.`,
            },
            {
              title: "4. Data and Privacy",
              content: `You retain ownership of all data you bring into Nexus. By connecting your tools, you grant us a limited license to access and process that data solely to provide the service.

We will never sell your data, use it to train AI models, or share it with other customers. Our data handling is described in detail in our Privacy Policy.`,
            },
            {
              title: "5. Subscription and Payment",
              content: `Paid subscriptions are billed in advance on a monthly or annual basis. All fees are non-refundable except where required by law.

You may cancel your subscription at any time. Cancellation takes effect at the end of your current billing period. We do not prorate refunds for unused time.

We reserve the right to change our pricing with 30 days advance notice. Continued use after a price change constitutes acceptance of the new pricing.`,
            },
            {
              title: "6. Acceptable Use",
              content: `You agree not to use Nexus to generate illegal, harmful, harassing or deceptive content. You agree not to attempt to extract or scrape data in unauthorized ways, interfere with the service's operation, or use the service to violate any applicable laws.

We reserve the right to suspend or terminate accounts that violate these policies.`,
            },
            {
              title: "7. Limitation of Liability",
              content: `To the maximum extent permitted by law, Nexus AI shall not be liable for any indirect, incidental, special, consequential or punitive damages arising from your use of the service.

Our total liability for any claim arising from these Terms shall not exceed the amount you paid us in the 12 months preceding the claim.`,
            },
            {
              title: "8. Governing Law",
              content: `These Terms are governed by the laws of the State of California, USA. Any disputes shall be resolved in the courts of San Francisco County, California.`,
            },
            {
              title: "9. Contact",
              content: `For questions about these Terms, contact us at legal@nexusai.com or by mail at Nexus AI, Inc., San Francisco, CA, USA.`,
            },
          ].map((section, i) => (
            <div key={i}>
              <h2 className="font-display text-xl font-semibold text-navy-900 dark:text-cream-100 mb-3">{section.title}</h2>
              <div className="space-y-3">
                {section.content.split("\n\n").map((para, j) => (
                  <p key={j} className="font-body text-sm text-navy-600 dark:text-cream-300 leading-relaxed">{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
