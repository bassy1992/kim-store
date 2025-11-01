export default function Shipping() {
  const shippingOptions = [
    {
      name: "Standard Shipping",
      time: "3-7 business days",
      cost: "GHS 15",
      icon: "📦",
      features: ["Free on orders over GHS 100", "Tracking included", "Signature not required"]
    },
    {
      name: "Express Shipping",
      time: "1-2 business days",
      cost: "GHS 35",
      icon: "⚡",
      features: ["Priority handling", "Real-time tracking", "Signature required"]
    },
    {
      name: "International",
      time: "7-14 business days",
      cost: "Varies",
      icon: "🌍",
      features: ["Customs fees may apply", "Full tracking", "Secure packaging"]
    }
  ];

  const regions = [
    { region: "Accra & Greater Accra", time: "1-3 days", cost: "GHS 15" },
    { region: "Kumasi & Ashanti Region", time: "2-4 days", cost: "GHS 20" },
    { region: "Other Regions", time: "3-7 days", cost: "GHS 25" },
    { region: "International", time: "7-14 days", cost: "Varies" }
  ];

  return (
    <main className="container py-16 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl mb-4 animate-slide-up">Shipping Policy</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{animationDelay: "100ms"}}>
          Fast, reliable delivery to your doorstep. We ship nationwide and internationally.
        </p>
      </div>

      {/* Shipping Options */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {shippingOptions.map((option, i) => (
          <div 
            key={option.name}
            className="group relative overflow-hidden rounded-2xl border bg-card p-8 transition-all hover:shadow-xl hover:-translate-y-1 animate-scale-in"
            style={{animationDelay: `${i * 100}ms`}}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="text-4xl mb-4">{option.icon}</div>
              <h3 className="font-display text-2xl mb-2">{option.name}</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl font-bold text-primary">{option.cost}</span>
                <span className="text-sm text-muted-foreground">/ {option.time}</span>
              </div>
              <ul className="space-y-2">
                {option.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Regional Delivery Times */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="font-display text-3xl mb-8 text-center">Delivery Times by Region</h2>
        <div className="rounded-2xl border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 font-semibold">Region</th>
                  <th className="text-left p-4 font-semibold">Delivery Time</th>
                  <th className="text-left p-4 font-semibold">Shipping Cost</th>
                </tr>
              </thead>
              <tbody>
                {regions.map((region, i) => (
                  <tr key={region.region} className="border-t hover:bg-muted/30 transition-colors">
                    <td className="p-4">{region.region}</td>
                    <td className="p-4 text-muted-foreground">{region.time}</td>
                    <td className="p-4 font-medium">{region.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Important Information */}
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="rounded-2xl border bg-card p-8">
          <h2 className="font-display text-2xl mb-6">Important Information</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">📍</span>
                Order Processing
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Orders are processed within 1-2 business days (Monday-Friday, excluding holidays). You'll receive a confirmation email with tracking information once your order ships.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">🎁</span>
                Free Shipping
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Enjoy free standard shipping on all orders over GHS 100 within Ghana. The discount is automatically applied at checkout.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">📦</span>
                Package Tracking
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                All shipments include tracking. You can monitor your package's journey from our warehouse to your door using the tracking number provided in your shipping confirmation email.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">🌍</span>
                International Shipping
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We ship to select international destinations. Delivery times vary by location (typically 7-14 business days). Customers are responsible for any customs duties, taxes, or fees imposed by their country.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <span className="text-primary">🔒</span>
                Secure Packaging
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                All fragrances are carefully packaged with protective materials to ensure they arrive in perfect condition. We use discreet packaging with no external branding.
              </p>
            </div>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary p-8 text-center">
          <div className="relative z-10">
            <h3 className="font-display text-2xl mb-3">Questions About Shipping?</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Our customer service team is here to help with any shipping-related questions.
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Contact Support
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
