export default function Contact() {
  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: "Email",
      value: "hello@yayrasfragrance.com",
      link: "mailto:hello@yayrasfragrance.com"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Phone",
      value: "+233 (0) 123 456 789",
      link: "tel:+233123456789"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Location",
      value: "Accra, Ghana",
      link: null
    }
  ];

  return (
    <main className="container py-16 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl mb-4 animate-slide-up">Get in Touch</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{animationDelay: "100ms"}}>
          Have questions? We'd love to hear from you. Reach out for wholesale, press, or general inquiries.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Form */}
        <div className="animate-fade-in" style={{animationDelay: "200ms"}}>
          <div className="rounded-3xl border bg-card p-8 md:p-10">
            <h2 className="font-display text-2xl mb-6">Send us a message</h2>
            <form className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input 
                  type="text"
                  className="w-full rounded-xl border px-4 py-3 transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" 
                  placeholder="Your name" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input 
                  type="email"
                  className="w-full rounded-xl border px-4 py-3 transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" 
                  placeholder="your@email.com" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <select className="w-full rounded-xl border px-4 py-3 transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                  <option>General Inquiry</option>
                  <option>Wholesale</option>
                  <option>Press</option>
                  <option>Product Question</option>
                  <option>Order Support</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea 
                  className="w-full rounded-xl border px-4 py-3 transition-all focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none resize-none" 
                  placeholder="Tell us how we can help..." 
                  rows={6}
                />
              </div>
              <button className="w-full rounded-xl bg-primary px-6 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-all hover:shadow-lg">
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-8 animate-fade-in" style={{animationDelay: "300ms"}}>
          {/* Contact Methods */}
          <div className="space-y-4">
            {contactMethods.map((method, i) => (
              <a
                key={method.title}
                href={method.link || '#'}
                className={`group flex items-start gap-4 p-6 rounded-2xl border bg-card transition-all hover:shadow-lg hover:-translate-y-1 ${!method.link && 'pointer-events-none'}`}
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {method.icon}
                </div>
                <div>
                  <div className="font-medium mb-1">{method.title}</div>
                  <div className="text-muted-foreground">{method.value}</div>
                </div>
              </a>
            ))}
          </div>

          {/* Business Hours */}
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-display text-xl mb-4">Business Hours</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monday - Friday</span>
                <span className="font-medium">9:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Saturday</span>
                <span className="font-medium">10:00 AM - 4:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sunday</span>
                <span className="font-medium">Closed</span>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="rounded-2xl border bg-card p-6">
            <h3 className="font-display text-xl mb-4">Follow Us</h3>
            <div className="flex gap-3">
              {[
                { name: 'Instagram', icon: '📷' },
                { name: 'Facebook', icon: '👍' },
                { name: 'Twitter', icon: '🐦' },
                { name: 'TikTok', icon: '🎵' }
              ].map(social => (
                <button 
                  key={social.name}
                  className="w-12 h-12 rounded-xl border bg-background hover:bg-accent transition-colors flex items-center justify-center text-xl"
                  aria-label={social.name}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Link */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary p-6">
            <div className="relative z-10">
              <h3 className="font-display text-xl mb-2">Need Quick Answers?</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Check out our FAQ page for instant answers to common questions.
              </p>
              <a href="/faqs" className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
                Visit FAQ
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </main>
  );
}
