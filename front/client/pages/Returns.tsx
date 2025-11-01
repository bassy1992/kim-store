export default function Returns() {
  const steps = [
    {
      step: "1",
      title: "Contact Us",
      desc: "Email us within 30 days with your order number and reason for return"
    },
    {
      step: "2",
      title: "Get Approval",
      desc: "We'll review your request and provide return instructions"
    },
    {
      step: "3",
      title: "Ship Back",
      desc: "Pack the item securely and ship using the provided label"
    },
    {
      step: "4",
      title: "Receive Refund",
      desc: "Get your refund within 5-7 days after we receive the item"
    }
  ];

  return (
    <main className="container py-16 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl mb-4 animate-slide-up">Refund & Return Policy</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{animationDelay: "100ms"}}>
          Your satisfaction is our priority. We offer hassle-free returns within 30 days.
        </p>
      </div>

      {/* Quick Summary */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: "📅", title: "30-Day Window", desc: "Return within 30 days of purchase" },
          { icon: "💰", title: "Full Refund", desc: "Get 100% of your money back" },
          { icon: "✅", title: "Easy Process", desc: "Simple 4-step return procedure" }
        ].map((item, i) => (
          <div 
            key={item.title}
            className="text-center p-6 rounded-2xl border bg-card animate-scale-in"
            style={{animationDelay: `${i * 100}ms`}}
          >
            <div className="text-4xl mb-3">{item.icon}</div>
            <h3 className="font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Return Process */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="font-display text-3xl mb-8 text-center">How to Return</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((item, i) => (
            <div key={item.step} className="relative animate-fade-in" style={{animationDelay: `${i * 100}ms`}}>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground font-bold text-xl mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-7 left-[calc(50%+28px)] w-[calc(100%-56px)] h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Policy */}
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="rounded-2xl border bg-card p-8">
          <h2 className="font-display text-2xl mb-6">Return Policy Details</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-green-500">✓</span>
                Eligible for Return
              </h3>
              <ul className="text-muted-foreground text-sm leading-relaxed space-y-1 ml-7">
                <li>• Unopened products in original packaging</li>
                <li>• Items received within the last 30 days</li>
                <li>• Products with proof of purchase</li>
                <li>• Damaged or defective items (any condition)</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-red-500">✗</span>
                Not Eligible for Return
              </h3>
              <ul className="text-muted-foreground text-sm leading-relaxed space-y-1 ml-7">
                <li>• Opened or used fragrances (hygiene reasons)</li>
                <li>• Products without original packaging</li>
                <li>• Items purchased more than 30 days ago</li>
                <li>• Gift cards and digital products</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">💰</span>
                Refund Process
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Once we receive and inspect your return, we'll process your refund within 5-7 business days. The refund will be credited to your original payment method. Please note that it may take an additional 3-5 business days for the refund to appear in your account, depending on your bank or card issuer.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">📦</span>
                Return Shipping
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                For defective or damaged items, we'll provide a prepaid return label at no cost to you. For other returns, customers are responsible for return shipping costs. We recommend using a trackable shipping service to ensure your return reaches us safely.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">🔄</span>
                Exchanges
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We currently don't offer direct exchanges. If you'd like a different product, please return the original item for a refund and place a new order. This ensures you get your preferred item as quickly as possible.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">⚠️</span>
                Damaged or Defective Items
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                If you receive a damaged or defective product, please contact us immediately with photos of the item and packaging. We'll arrange for a replacement or full refund, including return shipping costs. Your satisfaction is our top priority.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary p-8 text-center">
          <div className="relative z-10">
            <h3 className="font-display text-2xl mb-3">Need to Start a Return?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Contact our customer service team and we'll guide you through the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Contact Support
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <a 
                href="mailto:hello@kimmysfragrance.com" 
                className="inline-flex items-center justify-center gap-2 rounded-xl border bg-background px-6 py-3 font-medium hover:bg-accent transition-colors"
              >
                Email Us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
        </div>
      </div>
    </main>
  );
}
