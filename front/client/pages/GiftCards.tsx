export default function GiftCards() {
  const amounts = [50, 100, 200, 500];

  return (
    <main className="container py-16 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl mb-4 animate-slide-up">Gift Cards</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{animationDelay: "100ms"}}>
          Give the gift of choice with a Kimmy's Fragrance digital gift card
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* Gift Card Preview */}
        <div className="mb-12 animate-scale-in" style={{animationDelay: "200ms"}}>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-accent to-secondary p-12 md:p-16 text-white shadow-2xl">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                  <span className="text-2xl">🎁</span>
                </div>
                <span className="font-display text-2xl">Kimmy's Fragrance</span>
              </div>
              <div className="space-y-2">
                <div className="text-white/80 text-sm">Gift Card Value</div>
                <div className="font-display text-5xl md:text-6xl">GHS 100</div>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex-1 h-px bg-white/20" />
                <span className="text-white/60 text-xs">XXXX-XXXX-XXXX-XXXX</span>
                <div className="flex-1 h-px bg-white/20" />
              </div>
            </div>
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute -left-20 -top-20 w-60 h-60 bg-white/10 rounded-full blur-3xl" />
          </div>
        </div>

        {/* Amount Selection */}
        <div className="mb-12">
          <h2 className="font-display text-2xl mb-6 text-center">Select Amount</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {amounts.map((amount, i) => (
              <button
                key={amount}
                className="group relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-card p-6 text-center transition-all hover:border-primary hover:shadow-lg hover:-translate-y-1 animate-fade-in"
                style={{animationDelay: `${i * 50}ms`}}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative z-10">
                  <div className="font-display text-3xl mb-1">GHS {amount}</div>
                  <div className="text-xs text-muted-foreground">Digital delivery</div>
                </div>
              </button>
            ))}
          </div>
          <div className="mt-4 text-center">
            <button className="text-sm text-primary font-medium hover:underline">
              Enter custom amount
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: "⚡",
              title: "Instant Delivery",
              desc: "Delivered via email immediately after purchase"
            },
            {
              icon: "♾️",
              title: "Never Expires",
              desc: "No expiration date or hidden fees"
            },
            {
              icon: "🎨",
              title: "Personalize",
              desc: "Add a custom message for the recipient"
            }
          ].map((feature, i) => (
            <div 
              key={feature.title}
              className="text-center p-6 rounded-2xl border bg-card animate-fade-in"
              style={{animationDelay: `${i * 100}ms`}}
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary p-12 text-center">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="font-display text-3xl mb-4">Coming Soon!</h3>
            <p className="text-muted-foreground mb-6">
              Digital gift cards are launching soon. In the meantime, contact us directly to purchase a gift card for someone special.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="/contact" 
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
              >
                Contact Us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <button className="inline-flex items-center justify-center gap-2 rounded-xl border bg-background px-8 py-3 font-medium hover:bg-accent transition-colors">
                Notify Me
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
            </div>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -left-20 -top-20 w-60 h-60 bg-accent/20 rounded-full blur-3xl" />
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <h2 className="font-display text-2xl mb-8 text-center">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: "1", title: "Choose Amount", desc: "Select or enter a custom amount" },
              { step: "2", title: "Personalize", desc: "Add a message and recipient details" },
              { step: "3", title: "Purchase", desc: "Complete secure checkout" },
              { step: "4", title: "Delivered", desc: "Recipient receives email instantly" }
            ].map((item, i) => (
              <div key={item.step} className="text-center animate-fade-in" style={{animationDelay: `${i * 100}ms`}}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
