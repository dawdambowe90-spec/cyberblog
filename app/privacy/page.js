export const metadata = {
  title: 'Privacy Policy | Cyberblog',
  description: 'How we handle your data and privacy at Cyberblog.',
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 lg:px-8 max-w-3xl space-y-12 py-12 animate-fade-in">
      <header className="space-y-4">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">
          Privacy <span className="text-primary italic">Policy</span>
        </h1>
        <p className="text-slate italic font-medium">Last updated: January 21, 2026</p>
      </header>

      <div className="prose prose-lg prose-slate dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold">Introduction</h2>
          <p>
            At Cyberblog, we value your privacy. This policy explains how we collect and use information when you visit our platform. 
            We aim for total transparency and follow best practices in data protection (GDPR/CCPA compliance).
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Data Collection</h2>
          <p>We collect minimal data to provide a premium experience:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Analytics:</strong> Anonymous usage patterns via Vercel Analytics.</li>
            <li><strong>Email:</strong> Only if you explicitly subscribe to our newsletter.</li>
            <li><strong>Cookies:</strong> Small files used by ad partners to show relevant content.</li>
          </ul>
        </section>

        <section className="p-8 rounded-[40px] bg-primary/5 border border-primary/20">
          <h2 className="text-2xl font-bold text-primary mb-4">Advertising Disclosure</h2>
          <p className="text-sm leading-relaxed italic">
            Cyberblog participates in various affiliate marketing programs and display advertising networks. 
            This means we may earn a commission on purchases made through our links, or revenue from ads shown on the site. 
            <strong> This comes at no additional cost to you</strong> and helps keep our deep tech insights free for everyone.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold">Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal data at any time. 
            Contact us at hello@cyberblog.dev for any privacy-related inquiries.
          </p>
        </section>
      </div>
    </div>
  )
}
