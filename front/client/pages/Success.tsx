export default function Success() {
  return (
    <main className="container py-16 min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto animate-fade-in">
        {/* Success Icon */}
        <div className="relative mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 animate-scale-in">
            <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-green-500/20 animate-ping" style={{animationDuration: "2s"}} />
          </div>
        </div>

        {/* Message */}
        <h1 className="font-display text-4xl md:text-5xl mb-4 animate-slide-up">Order Confirmed!</h1>
        <p className="text-lg text-muted-foreground mb-8 animate-slide-up" style={{animationDelay: "100ms"}}>
          Thank you for your purchase! A confirmation email has been sent to your inbox with all the details.
        </p>

        {/* Order Details Card */}
        <div className="rounded-2xl border bg-card p-8 mb-8 text-left animate-scale-in" style={{animationDelay: "200ms"}}>
          <h2 className="font-semibold mb-4 text-center">What happens next?</h2>
          <div className="space-y-4">
            {[
              { icon: "📧", title: "Check your email", desc: "We've sent order confirmation and receipt" },
              { icon: "📦", title: "We'll prepare your order", desc: "Processing takes 1-2 business days" },
              { icon: "🚚", title: "Track your shipment", desc: "You'll receive tracking info once shipped" },
              { icon: "🎁", title: "Enjoy your fragrance", desc: "Delivery in 3-7 business days" }
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-xl">
                  {step.icon}
                </div>
                <div>
                  <div className="font-medium">{step.title}</div>
                  <div className="text-sm text-muted-foreground">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a 
            href="/" 
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </a>
          <a 
            href="/shop" 
            className="inline-flex items-center justify-center gap-2 rounded-xl border bg-background px-6 py-3 font-medium hover:bg-accent transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Continue Shopping
          </a>
        </div>

        {/* Support Link */}
        <div className="mt-8 pt-8 border-t">
          <p className="text-sm text-muted-foreground mb-2">Need help with your order?</p>
          <a href="/contact" className="text-primary font-medium hover:underline">
            Contact Support
          </a>
        </div>
      </div>
    </main>
  );
}
