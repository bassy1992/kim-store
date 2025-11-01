export default function Terms() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: "By accessing and using Kimmy's Fragrance website and services, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services."
    },
    {
      title: "2. Use of Website",
      content: "You agree to use our website only for lawful purposes and in a way that does not infringe the rights of others or restrict their use and enjoyment of the website. Prohibited behavior includes harassing others, transmitting obscene content, or disrupting the normal flow of dialogue."
    },
    {
      title: "3. Product Information",
      content: "We strive to provide accurate product descriptions, images, and pricing. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, current, or error-free. If a product is not as described, your sole remedy is to return it in unused condition."
    },
    {
      title: "4. Pricing and Payment",
      content: "All prices are listed in Ghana Cedis (GHS) and are subject to change without notice. We reserve the right to refuse or cancel any order for any reason, including pricing errors. Payment must be received before order processing begins."
    },
    {
      title: "5. Shipping and Delivery",
      content: "We aim to process and ship orders within 1-2 business days. Delivery times are estimates and not guaranteed. We are not responsible for delays caused by shipping carriers or customs. Risk of loss and title for items pass to you upon delivery to the carrier."
    },
    {
      title: "6. Returns and Refunds",
      content: "Unopened products in original packaging may be returned within 30 days of purchase for a full refund. Due to hygiene reasons, opened fragrances cannot be returned unless defective. See our Returns Policy page for complete details."
    },
    {
      title: "7. Intellectual Property",
      content: "All content on this website, including text, graphics, logos, images, and software, is the property of Kimmy's Fragrance and protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works without our express written permission."
    },
    {
      title: "8. User Accounts",
      content: "If you create an account, you are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account."
    },
    {
      title: "9. Limitation of Liability",
      content: "Kimmy's Fragrance shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services, even if we have been advised of the possibility of such damages."
    },
    {
      title: "10. Indemnification",
      content: "You agree to indemnify and hold harmless Kimmy's Fragrance and its affiliates from any claims, damages, losses, liabilities, and expenses arising from your use of our services or violation of these terms."
    },
    {
      title: "11. Privacy",
      content: "Your use of our website is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices regarding the collection and use of your personal information."
    },
    {
      title: "12. Modifications to Terms",
      content: "We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website after changes are posted constitutes acceptance of the modified terms."
    },
    {
      title: "13. Governing Law",
      content: "These Terms and Conditions are governed by and construed in accordance with the laws of Ghana. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of Ghana."
    },
    {
      title: "14. Contact Information",
      content: "If you have any questions about these Terms and Conditions, please contact us at hello@kimmysfragrance.com or through our Contact page."
    }
  ];

  return (
    <main className="container py-16 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl mb-4 animate-slide-up">Terms & Conditions</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{animationDelay: "100ms"}}>
          Please read these terms carefully before using our services
        </p>
        <p className="text-sm text-muted-foreground mt-4">
          Last updated: October 31, 2025
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto">
        <div className="rounded-2xl border bg-card p-8 md:p-12 mb-8">
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed mb-8">
              Welcome to Kimmy's Fragrance. These Terms and Conditions outline the rules and regulations for the use of our website and services. By accessing this website, we assume you accept these terms and conditions. Do not continue to use Kimmy's Fragrance if you do not agree to all of the terms and conditions stated on this page.
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

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: "Privacy Policy", link: "/privacy", icon: "🔒" },
            { title: "Shipping Policy", link: "/shipping", icon: "📦" },
            { title: "Return Policy", link: "/returns", icon: "↩️" }
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
        <div className="mt-8 relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary p-8 text-center">
          <div className="relative z-10">
            <h3 className="font-display text-2xl mb-3">Questions About Our Terms?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              If you have any questions or concerns about these terms, please don't hesitate to reach out.
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
