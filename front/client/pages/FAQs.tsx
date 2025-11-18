import { useState } from "react";

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      category: "Shipping & Delivery",
      questions: [
        {
          q: "How long does shipping take?",
          a: "Standard shipping typically takes 3-7 business days within Ghana. Express shipping is available for 1-2 business day delivery. International orders may take 7-14 business days depending on location."
        },
        {
          q: "Do you offer free shipping?",
          a: "Yes! We offer free standard shipping on all orders over GHS 100. Orders under this amount have a flat shipping fee of GHS 15."
        },
        {
          q: "Can I track my order?",
          a: "Absolutely. Once your order ships, you'll receive a tracking number via email. You can use this to monitor your package's journey in real-time."
        }
      ]
    },
    {
      category: "Products & Quality",
      questions: [
        {
          q: "Are your fragrances authentic?",
          a: "Yes, all our fragrances are 100% authentic and sourced directly from authorized distributors. We guarantee the quality and authenticity of every product we sell."
        },
        {
          q: "How long do the fragrances last?",
          a: "Our Eau de Parfum concentrations typically last 6-8 hours on skin. Longevity can vary based on skin type, application method, and environmental factors. We recommend applying to pulse points for best results."
        },
        {
          q: "Are your products cruelty-free?",
          a: "Yes, we are committed to cruelty-free practices. None of our products are tested on animals, and we work with suppliers who share our ethical values."
        }
      ]
    },
    {
      category: "Returns & Refunds",
      questions: [
        {
          q: "What is your return policy?",
          a: "We accept returns within 30 days of purchase for unopened products in original packaging. Due to hygiene reasons, we cannot accept returns on opened fragrances. See our Returns page for full details."
        },
        {
          q: "How do I initiate a return?",
          a: "Contact our customer service team at hello@yayrasfragrance.com with your order number. We'll provide you with return instructions and a prepaid shipping label if applicable."
        },
        {
          q: "When will I receive my refund?",
          a: "Refunds are processed within 5-7 business days after we receive your returned item. The refund will be credited to your original payment method."
        }
      ]
    },
    {
      category: "Payment & Security",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept all major credit cards, debit cards, and mobile money through our secure Paystack payment gateway. All transactions are encrypted and secure."
        },
        {
          q: "Is my payment information secure?",
          a: "Yes, we use industry-standard SSL encryption and PCI-compliant payment processing. We never store your full credit card information on our servers."
        }
      ]
    },
    {
      category: "Fragrance Advice",
      questions: [
        {
          q: "How do I choose the right fragrance?",
          a: "Consider the occasion, season, and your personal style. Floral and citrus scents are great for daytime, while woody and oriental fragrances work well for evening. We recommend reading our blog post 'How to Choose Your Signature Scent' for detailed guidance."
        },
        {
          q: "Can I sample fragrances before buying?",
          a: "We're working on a sample program! In the meantime, check our detailed product descriptions and customer reviews to help guide your decision."
        },
        {
          q: "How should I store my fragrances?",
          a: "Store fragrances in a cool, dry place away from direct sunlight and heat. Keep bottles tightly closed when not in use. Proper storage can extend the life of your fragrance significantly."
        }
      ]
    }
  ];

  let questionIndex = 0;

  return (
    <main className="container py-16 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl mb-4 animate-slide-up">
          Frequently Asked Questions
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{animationDelay: "100ms"}}>
          Find answers to common questions about our products, shipping, and policies
        </p>
      </div>

      {/* Quick Contact Banner */}
      <div className="mb-12 relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-secondary p-8 text-center">
        <div className="relative z-10">
          <p className="text-muted-foreground mb-4">
            Can't find what you're looking for?
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

      {/* FAQ Sections */}
      <div className="max-w-4xl mx-auto space-y-8">
        {faqs.map((section, sectionIdx) => (
          <div key={section.category} className="animate-fade-in" style={{animationDelay: `${sectionIdx * 100}ms`}}>
            <h2 className="font-display text-2xl mb-4 flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">
                {sectionIdx + 1}
              </span>
              {section.category}
            </h2>
            <div className="space-y-3">
              {section.questions.map((faq) => {
                const currentIndex = questionIndex++;
                const isOpen = openIndex === currentIndex;
                
                return (
                  <div 
                    key={currentIndex}
                    className="group rounded-xl border bg-card overflow-hidden transition-all hover:shadow-md"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : currentIndex)}
                      className="w-full flex items-center justify-between gap-4 p-5 text-left transition-colors hover:bg-accent/5"
                    >
                      <span className="font-medium pr-4">{faq.q}</span>
                      <svg 
                        className={`flex-shrink-0 w-5 h-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <div 
                      className={`overflow-hidden transition-all ${isOpen ? 'max-h-96' : 'max-h-0'}`}
                    >
                      <div className="px-5 pb-5 text-muted-foreground leading-relaxed">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Resources */}
      <div className="mt-16 grid gap-6 md:grid-cols-3 max-w-4xl mx-auto">
        {[
          {
            title: "Shipping Policy",
            desc: "Learn about our delivery options and timelines",
            link: "/shipping",
            icon: "🚚"
          },
          {
            title: "Return Policy",
            desc: "Understand our return and refund process",
            link: "/returns",
            icon: "↩️"
          },
          {
            title: "Contact Us",
            desc: "Get in touch with our support team",
            link: "/contact",
            icon: "💬"
          }
        ].map((resource, i) => (
          <a
            key={resource.title}
            href={resource.link}
            className="group relative overflow-hidden rounded-2xl border bg-card p-6 transition-all hover:shadow-lg hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <div className="text-3xl mb-3">{resource.icon}</div>
              <h3 className="font-semibold mb-2">{resource.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{resource.desc}</p>
              <span className="inline-flex items-center gap-1 text-sm text-primary font-medium">
                Learn more
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </a>
        ))}
      </div>
    </main>
  );
}
