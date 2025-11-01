export default function Reviews() {
  const reviews = [
    {
      name: "Sarah M.",
      rating: 5,
      title: "Absolutely stunning fragrance",
      text: "The Eau de Rose has become my signature scent. It's elegant, long-lasting, and I receive compliments everywhere I go. Worth every penny!",
      product: "Eau de Rose",
      verified: true,
      date: "Oct 28, 2025"
    },
    {
      name: "James K.",
      rating: 5,
      title: "Best purchase this year",
      text: "Citrus Noir is incredibly unique. The blend of citrus and woody notes is perfect for both day and evening wear. Highly recommend!",
      product: "Citrus Noir",
      verified: true,
      date: "Oct 25, 2025"
    },
    {
      name: "Emily R.",
      rating: 5,
      title: "Luxurious and long-lasting",
      text: "I'm obsessed with Amber Oud. The scent is rich, warm, and sophisticated. It lasts all day without being overpowering.",
      product: "Amber Oud",
      verified: true,
      date: "Oct 22, 2025"
    },
    {
      name: "Michael T.",
      rating: 4,
      title: "Great quality",
      text: "Vanilla Bloom is lovely. Sweet but not too sweet, perfect for everyday wear. The packaging is also beautiful!",
      product: "Vanilla Bloom",
      verified: true,
      date: "Oct 20, 2025"
    },
    {
      name: "Lisa P.",
      rating: 5,
      title: "My new favorite",
      text: "The quality is exceptional. These fragrances rival luxury brands at a fraction of the price. Customer service was also excellent!",
      product: "Eau de Rose",
      verified: true,
      date: "Oct 18, 2025"
    },
    {
      name: "David L.",
      rating: 5,
      title: "Impressive longevity",
      text: "I'm amazed by how long these fragrances last. Applied in the morning and still going strong by evening. Will definitely order again!",
      product: "Citrus Noir",
      verified: true,
      date: "Oct 15, 2025"
    }
  ];

  const stats = [
    { label: "Average Rating", value: "4.9", icon: "⭐" },
    { label: "Total Reviews", value: "2,847", icon: "💬" },
    { label: "Verified Buyers", value: "98%", icon: "✓" },
    { label: "Would Recommend", value: "96%", icon: "👍" }
  ];

  return (
    <main className="container py-16 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl mb-4 animate-slide-up">Customer Reviews</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{animationDelay: "100ms"}}>
          Hear what our customers have to say about their fragrance experience
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {stats.map((stat, i) => (
          <div 
            key={stat.label}
            className="relative overflow-hidden rounded-2xl border bg-card p-6 text-center animate-scale-in"
            style={{animationDelay: `${i * 50}ms`}}
          >
            <div className="text-3xl mb-2">{stat.icon}</div>
            <div className="font-display text-3xl mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Reviews Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, i) => (
          <article 
            key={i}
            className="group relative overflow-hidden rounded-2xl border bg-card p-6 transition-all hover:shadow-xl hover:-translate-y-1 animate-fade-in"
            style={{animationDelay: `${i * 50}ms`}}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              {/* Rating */}
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i}
                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-lg mb-2">{review.title}</h3>

              {/* Review Text */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                "{review.text}"
              </p>

              {/* Product Tag */}
              <div className="inline-block px-3 py-1 rounded-full bg-accent/20 text-accent-foreground text-xs mb-4">
                {review.product}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div>
                  <div className="font-medium text-sm">{review.name}</div>
                  <div className="text-xs text-muted-foreground">{review.date}</div>
                </div>
                {review.verified && (
                  <div className="flex items-center gap-1 text-xs text-green-600">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span>Verified</span>
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <div className="inline-block relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary p-12">
          <div className="relative z-10">
            <h3 className="font-display text-3xl mb-4">Share Your Experience</h3>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Purchased from us? We'd love to hear your thoughts! Your feedback helps us improve and helps others make informed decisions.
            </p>
            <button className="rounded-xl bg-primary px-8 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
              Write a Review
            </button>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -left-20 -top-20 w-60 h-60 bg-accent/20 rounded-full blur-3xl" />
        </div>
      </div>
    </main>
  );
}
