export default function Privacy() {
  const sections = [
    {
      title: "1. Information We Collect",
      content: "We collect information you provide directly to us, including name, email address, shipping address, phone number, and payment information when you make a purchase. We also automatically collect certain information about your device and how you interact with our website, including IP address, browser type, pages visited, and time spent on pages."
    },
    {
      title: "2. How We Use Your Information",
      content: "We use the information we collect to process and fulfill your orders, communicate with you about your orders and our products, send marketing communications (with your consent), improve our website and services, prevent fraud and enhance security, and comply with legal obligations."
    },
    {
      title: "3. Information Sharing",
      content: "We do not sell your personal information. We may share your information with service providers who assist us in operating our website and conducting our business (such as payment processors and shipping companies), when required by law or to protect our rights, and in connection with a business transfer or merger."
    },
    {
      title: "4. Payment Information",
      content: "We use Paystack as our payment processor. Your payment information is transmitted directly to Paystack and is not stored on our servers. Paystack's use of your personal information is governed by their privacy policy."
    },
    {
      title: "5. Cookies and Tracking",
      content: "We use cookies and similar tracking technologies to track activity on our website and hold certain information. Cookies are files with small amounts of data that may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent."
    },
    {
      title: "6. Data Security",
      content: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure."
    },
    {
      title: "7. Your Rights",
      content: "You have the right to access, correct, or delete your personal information. You can opt out of marketing communications at any time by clicking the unsubscribe link in our emails or contacting us directly. You may also have the right to data portability and to object to certain processing."
    },
    {
      title: "8. Data Retention",
      content: "We retain your personal information for as long as necessary to fulfill the purposes outlined in this privacy policy, unless a longer retention period is required or permitted by law. Order information is typically retained for 7 years for tax and accounting purposes."
    },
    {
      title: "9. Children's Privacy",
      content: "Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you are a parent or guardian and believe your child has provided us with personal information, please contact us."
    },
    {
      title: "10. International Data Transfers",
      content: "Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that are different from the laws of your country. We take steps to ensure that your information receives an adequate level of protection."
    },
    {
      title: "11. Third-Party Links",
      content: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these third-party sites. We encourage you to read the privacy policies of any third-party sites you visit."
    },
    {
      title: "12. Changes to This Policy",
      content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the 'Last Updated' date. You are advised to review this Privacy Policy periodically for any changes."
    },
    {
      title: "13. Contact Us",
      content: "If you have any questions about this Privacy Policy or our data practices, please contact us at hello@kimmysfragrance.com or through our Contact page. We will respond to your inquiry within a reasonable timeframe."
    }
  ];

  return (
    <main className="container py-16 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl mb-4 animate-slide-up">Privacy Policy</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{animationDelay: "100ms"}}>
          Your privacy is important to us. Learn how we collect, use, and protect your information.
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Last updated: October 31, 2025
        </p>
      </div>

      {/* Quick Summary */}
      <div className="max-w-4xl mx-auto mb-12">
        <div className="rounded-2xl border bg-card p-8">
          <h2 className="font-display text-2xl mb-6 text-center">Privacy at a Glance</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "🔒", title: "Secure", desc: "Your data is encrypted and protected" },
              { icon: "🚫", title: "Not Sold", desc: "We never sell your personal information" },
              { icon: "✓", title: "Your Control", desc: "You can access, update, or delete your data" }
            ].map((item, i) => (
              <div key={item.title} className="text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl border bg-card p-8 md:p-12 mb-8">
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-8">
              At Kimmy's Fragrance, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or make a purchase from us.
            </p>

            <div className="space-y-8">
              {sections.map((section, i) => (
                <div 
                  key={i}
                  className="animate-fade-in"
                  style={{animationDelay: `${i * 50}ms`}}
                >
                  <h2 className="font-display text-xl mb-3 text-foreground">{section.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Rights Card */}
        <div className="rounded-2xl border bg-card p-8 mb-8">
          <h2 className="font-display text-2xl mb-6">Your Data Rights</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "👁️", title: "Right to Access", desc: "Request a copy of your personal data" },
              { icon: "✏️", title: "Right to Correct", desc: "Update inaccurate information" },
              { icon: "🗑️", title: "Right to Delete", desc: "Request deletion of your data" },
              { icon: "📤", title: "Right to Export", desc: "Receive your data in a portable format" },
              { icon: "🚫", title: "Right to Object", desc: "Object to certain data processing" },
              { icon: "📧", title: "Right to Opt-Out", desc: "Unsubscribe from marketing emails" }
            ].map((right) => (
              <div key={right.title} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl">
                  {right.icon}
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{right.title}</h3>
                  <p className="text-sm text-muted-foreground">{right.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {[
            { title: "Terms & Conditions", link: "/terms", icon: "📄" },
            { title: "Contact Us", link: "/contact", icon: "💬" }
          ].map((item) => (
            <a
              key={item.title}
              href={item.link}
              className="group flex items-center gap-3 p-4 rounded-xl border bg-card hover:bg-accent transition-colors"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="font-medium group-hover:text-primary transition-colors">{item.title}</span>
              <svg className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary p-8 text-center">
          <div className="relative z-10">
            <h3 className="font-display text-2xl mb-3">Privacy Questions?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              If you have questions about how we handle your data or want to exercise your rights, we're here to help.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Contact Us
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
        </div>
      </div>
    </main>
  );
}
