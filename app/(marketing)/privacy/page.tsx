import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4">
        <div className="mb-10">
          <p className="font-mono text-xs text-navy-400 dark:text-cream-500 mb-2">Last updated: June 1, 2026</p>
          <h1 className="font-display text-4xl font-semibold text-navy-900 dark:text-cream-50 mb-4">Privacy Policy</h1>
          <p className="font-body text-navy-500 dark:text-cream-400 leading-relaxed">
            Sypora AI, Inc. ("Sypora," "we," "us," or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose and safeguard your information when you use our service.
          </p>
        </div>

        <div className="prose-like space-y-10">
          {[
            {
              title: "1. Information We Collect",
              content: `We collect information you provide directly to us, such as when you create an account, connect integrations or contact us for support. This includes your name, email address, company name and job role.

We also collect usage data automatically, including how you interact with our service, which features you use, query logs (to improve AI accuracy) and technical data such as IP address, browser type and device information.

When you connect third-party tools (Slack, Notion, etc.), we index the data from those tools to power search and AI features. We access only what is necessary for the service and respect the permission settings of each tool.`,
            },
            {
              title: "2. How We Use Your Information",
              content: `We use the information we collect to provide, maintain and improve our services, process transactions, send service communications, and respond to your requests.

We use indexed data from your connected tools solely to power the AI search and generation features you request. We do not use your company's data to train our AI models. Your data is never shared with other customers or used for advertising.`,
            },
            {
              title: "3. Data Sharing",
              content: `We do not sell your personal information. We do not share your data with third parties for their marketing purposes.

We may share data with trusted service providers who assist in operating our platform (such as cloud hosting providers), but only under strict confidentiality agreements and only as necessary to provide the service.

We may disclose data if required by law or to protect the rights, property or safety of Sypora, our customers or others.`,
            },
            {
              title: "4. Data Retention",
              content: `We retain your data for as long as your account is active or as needed to provide the service. Enterprise customers can configure custom retention policies.

When you delete your account, we delete your personal data within 30 days and your workspace data (indexed content) within 7 business days. You will receive a deletion confirmation email.`,
            },
            {
              title: "5. Security",
              content: `We use industry-standard security measures including AES-256 encryption at rest, TLS 1.3 in transit, and SOC 2 Type II certified infrastructure. We conduct annual third-party security audits and penetration tests.

Despite these measures, no system is completely secure. We encourage you to use a strong unique password and enable multi-factor authentication.`,
            },
            {
              title: "6. Your Rights",
              content: `Depending on your location, you may have rights to access, correct, delete or export your personal data. You may also have the right to restrict or object to certain processing.

To exercise these rights, contact us at privacy@sypora-ai.com. We will respond within 30 days. If you are in the EU or UK, you have additional rights under GDPR and UK GDPR.`,
            },
            {
              title: "7. Cookies",
              content: `We use cookies and similar technologies to operate our service, remember your preferences and analyze usage. You can control cookie settings through your browser settings.

We use strictly necessary cookies (required for the service to function), functional cookies (to remember your preferences such as dark mode), and analytics cookies (to understand how the service is used). We do not use advertising cookies.`,
            },
            {
              title: "8. Contact Us",
              content: `If you have questions about this Privacy Policy or our data practices, please contact us at:

Sypora AI, Inc.
privacy@sypora-ai.com
San Francisco, CA, USA

For EU/UK data subjects, our Data Protection Officer can be reached at dpo@sypora-ai.com.`,
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
