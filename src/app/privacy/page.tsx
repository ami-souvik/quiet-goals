import Link from "next/link";

export default function PrivacyPolicy() {
  const lastUpdated = "January 15, 2026";

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="w-full flex justify-center bg-white border-b border-stone-100">
        <nav className="w-full py-4 max-w-3xl md:max-w-5xl xl:max-w-6xl px-6 flex items-center space-x-2 text-sm font-medium text-stone-500">
          <Link href="/" className="hover:text-stone-900 transition-colors">
            Home
          </Link>
          <span className="text-stone-300">/</span>
          <span className="text-stone-900">Privacy</span>
        </nav>
      </div>
      <main className="min-h-screen bg-stone-50 px-6 py-12 md:py-20">
        <div className="max-w-2xl mx-auto space-y-12 text-stone-800">
          <div className="mb-16 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-serif text-stone-900 mb-6 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-sm text-stone-400 font-sans">
              Last updated: {lastUpdated}
            </p>
          </div>
          <section className="space-y-8 font-sans leading-relaxed">
            <p className="text-lg text-stone-600">
              Quiet Goals respects your privacy. This Privacy Policy explains how we handle information when you use our mobile app and website.
            </p>

            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-stone-900">1. Overview</h2>
              <div className="space-y-4 text-stone-600">
                <p>Quiet Goals is designed to be a local-first, privacy-friendly app.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>We do not require accounts.</li>
                  <li>We do not collect personal information.</li>
                  <li>Your goals, notes, and wallpapers are created and stored on your device.</li>
                </ul>
                <p className="italic font-serif text-stone-900 mt-4">
                  Our guiding principle is simple: Your intentions are yours.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-stone-900">2. Information We Collect</h2>
              <div className="space-y-6 text-stone-600">
                <div>
                  <h3 className="font-medium text-stone-900 mb-2">a) Personal Information</h3>
                  <p>We do not collect personal information such as name, email address, phone number, location, contacts, or identifiers.</p>
                </div>
                <div>
                  <h3 className="font-medium text-stone-900 mb-2">b) User Content</h3>
                  <p>Any text you enter (goals, reminders, notes, or intentions) is processed locally on your device. It is not sent to our servers, nor is it stored or accessed by us.</p>
                </div>
                <div>
                  <h3 className="font-medium text-stone-900 mb-2">c) Automatically Collected Information</h3>
                  <p>We may collect anonymous, non-identifiable usage data (such as page views or feature usage) to improve the product. This data does not identify you personally, does not include your content, and is used only for basic analytics.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-stone-900">3. How We Use Information</h2>
              <div className="space-y-4 text-stone-600">
                <p>If anonymous analytics are enabled, we use them only to improve app performance, fix bugs, and understand general usage patterns.</p>
                <p className="font-medium text-stone-900">We do not:</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Sell data</li>
                  <li>Share data with advertisers</li>
                  <li>Build user profiles</li>
                  <li>Track you across apps or websites</li>
                </ul>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-stone-900">4. Data Storage & Security</h2>
              <div className="space-y-4 text-stone-600">
                <p>Quiet Goals does not maintain user accounts. Your goals and wallpapers remain on your device. We do not store your content on external servers. Because we collect minimal data, the risk of data exposure is significantly reduced.</p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-stone-900">5. Children’s Privacy</h2>
              <div className="space-y-4 text-stone-600">
                <p>Quiet Goals does not knowingly collect data from children under the age of 13. Since no personal data is collected, no accounts are created, and no communication features exist, the app is safe to use without sharing personal information.</p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-stone-900">6. Third-Party Services</h2>
              <div className="space-y-4 text-stone-600">
                <p>Quiet Goals may use privacy-friendly third-party tools for basic analytics and app distribution (Google Play). These services are limited to what is necessary to operate and improve the app and do not receive your personal content.</p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-stone-900">7. Your Choices</h2>
              <div className="space-y-4 text-stone-600">
                <p>You can use Quiet Goals without providing any personal information, stop using the app at any time, or clear app data from your device to remove all locally stored content.</p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="font-serif text-2xl text-stone-900">8. Changes to This Policy</h2>
              <div className="space-y-4 text-stone-600">
                <p>We may update this Privacy Policy from time to time. If changes are made, the updated policy will be posted on our website and the “Last updated” date will be revised.</p>
              </div>
            </div>

            <div className="space-y-6 pt-8 border-t border-stone-200">
              <h2 className="font-serif text-2xl text-stone-900">9. Contact Us</h2>
              <div className="space-y-2 text-stone-600">
                <p>If you have any questions about this Privacy Policy or your privacy while using Quiet Goals, you can contact us at:</p>
                <p>Email: <a href="mailto:support@qurtesy.com" className="text-stone-900 hover:underline">support@qurtesy.com</a></p>
                <p>Website: <a href="https://quiet-goals.qurtesy.com" className="text-stone-900 hover:underline">https://quiet-goals.qurtesy.com</a></p>
              </div>
            </div>
          </section>

          <footer className="pt-12 pb-8 border-t border-stone-200">
            <p className="text-xs text-stone-400 font-light text-center">
              Designed for focus. Built with silence.
            </p>
          </footer>
        </div>
      </main>
    </div>
  );
}
