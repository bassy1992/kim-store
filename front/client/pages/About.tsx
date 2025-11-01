export default function About() {
  return (
    <main className="container py-16 animate-fade-in">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary via-accent/30 to-primary/10 p-12 md:p-16 mb-16">
        <div className="relative z-10 max-w-3xl">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-6 animate-slide-up">About Kimmy's Fragrance</h1>
          <p className="text-lg text-foreground/80 leading-relaxed animate-slide-up" style={{animationDelay: "100ms"}}>
            Crafting modern, niche perfumes with meticulous attention to quality and storytelling. We blend premium ingredients to create memorable scents that define moments and evoke emotions.
          </p>
        </div>
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -left-10 -top-10 w-60 h-60 bg-accent/30 rounded-full blur-3xl" />
      </div>

      {/* Story Grid */}
      <section className="grid gap-8 md:grid-cols-2 mb-16">
        <div className="group relative overflow-hidden rounded-2xl border bg-card p-8 transition-all hover:shadow-xl hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="font-display text-2xl mb-3">Our Story</h3>
            <p className="text-muted-foreground leading-relaxed">
              Founded in 2025, Kimmy's Fragrance emerged from a passion to create scents that feel deeply personal and timelessly elegant. Each fragrance tells a story, capturing the essence of moments worth remembering.
            </p>
          </div>
        </div>

        <div className="group relative overflow-hidden rounded-2xl border bg-card p-8 transition-all hover:shadow-xl hover:-translate-y-1">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/20 text-accent-foreground mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-display text-2xl mb-3">Quality First</h3>
            <p className="text-muted-foreground leading-relaxed">
              We source only the finest aromatic materials from trusted suppliers worldwide. Our commitment to ethical practices extends throughout our entire supply chain, ensuring every bottle meets our exacting standards.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="mb-16">
        <h2 className="font-display text-3xl md:text-4xl mb-8 text-center">Our Values</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { icon: "🌿", title: "Sustainable", desc: "Eco-conscious ingredients and packaging" },
            { icon: "✨", title: "Artisanal", desc: "Hand-crafted in small batches" },
            { icon: "🤝", title: "Ethical", desc: "Cruelty-free and fair trade" },
            { icon: "💎", title: "Premium", desc: "Only the finest materials" },
            { icon: "🎨", title: "Creative", desc: "Unique and innovative compositions" },
            { icon: "❤️", title: "Passionate", desc: "Made with love and dedication" }
          ].map((value, i) => (
            <div 
              key={value.title} 
              className="flex items-start gap-4 p-6 rounded-xl bg-muted/50 hover:bg-muted transition-colors animate-fade-in"
              style={{animationDelay: `${i * 50}ms`}}
            >
              <span className="text-3xl">{value.icon}</span>
              <div>
                <h4 className="font-semibold mb-1">{value.title}</h4>
                <p className="text-sm text-muted-foreground">{value.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Image Gallery */}
      <section>
        <h2 className="font-display text-3xl md:text-4xl mb-8 text-center">Behind the Scenes</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=800&auto=format&fit=crop"
          ].map((src, i) => (
            <div key={i} className="group relative aspect-square overflow-hidden rounded-2xl animate-scale-in" style={{animationDelay: `${i * 100}ms`}}>
              <img 
                src={src} 
                alt={`Gallery ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
