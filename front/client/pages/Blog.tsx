export default function Blog() {
  const posts = [
    {
      title: "How to Choose Your Signature Scent",
      excerpt: "Discover the art of finding a fragrance that truly represents you. Learn about fragrance families, notes, and how to test perfumes properly.",
      image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop",
      date: "Oct 28, 2025",
      category: "Guide"
    },
    {
      title: "The Science Behind Fragrance Longevity",
      excerpt: "Why do some perfumes last all day while others fade quickly? Explore the chemistry and techniques for making your scent last longer.",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop",
      date: "Oct 25, 2025",
      category: "Education"
    },
    {
      title: "New Season Collection Launch",
      excerpt: "Introducing our latest collection inspired by autumn landscapes. Three new fragrances that capture the essence of the season.",
      image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=800&auto=format&fit=crop",
      date: "Oct 20, 2025",
      category: "News"
    },
    {
      title: "Layering Fragrances Like a Pro",
      excerpt: "Master the art of fragrance layering to create a unique scent profile. Tips and combinations that work beautifully together.",
      image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=800&auto=format&fit=crop",
      date: "Oct 15, 2025",
      category: "Tips"
    }
  ];

  return (
    <main className="container py-16 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-display text-4xl md:text-5xl mb-4 animate-slide-up">Blog & News</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{animationDelay: "100ms"}}>
          Latest stories about fragrances, launches, and expert tips
        </p>
      </div>

      {/* Featured Post */}
      <article className="group relative overflow-hidden rounded-3xl border bg-card mb-12 animate-scale-in">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
            <img 
              src={posts[0].image} 
              alt={posts[0].title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute top-4 left-4">
              <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                Featured
              </span>
            </div>
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4 text-sm text-muted-foreground">
              <span className="px-2 py-1 rounded-md bg-accent/20 text-accent-foreground">{posts[0].category}</span>
              <span>•</span>
              <span>{posts[0].date}</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl mb-4 group-hover:text-primary transition-colors">
              {posts[0].title}
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {posts[0].excerpt}
            </p>
            <button className="inline-flex items-center gap-2 text-primary font-medium group/btn">
              Read more 
              <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </article>

      {/* Blog Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.slice(1).map((post, i) => (
          <article 
            key={post.title}
            className="group cursor-pointer animate-fade-in"
            style={{animationDelay: `${i * 100}ms`}}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl mb-4">
              <img 
                src={post.image} 
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
              <span className="px-2 py-1 rounded-md bg-muted">{post.category}</span>
              <span>•</span>
              <span>{post.date}</span>
            </div>
            <h3 className="font-display text-xl mb-2 group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {post.excerpt}
            </p>
          </article>
        ))}
      </div>

      {/* Newsletter CTA */}
      <div className="mt-16 relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary p-12 text-center">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h3 className="font-display text-3xl mb-4">Stay Updated</h3>
          <p className="text-muted-foreground mb-6">
            Subscribe to our newsletter for the latest fragrance tips, launches, and exclusive offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email"
              placeholder="Enter your email" 
              className="flex-1 rounded-xl border px-4 py-3 bg-background/80 backdrop-blur"
            />
            <button className="rounded-xl bg-primary px-6 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -left-20 -top-20 w-60 h-60 bg-accent/20 rounded-full blur-3xl" />
      </div>
    </main>
  );
}
