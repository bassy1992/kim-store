import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/site/ProductCard";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@/lib/api";

const logoUrl =
  "https://cdn.builder.io/api/v1/image/assets%2F261a98e6df434ad1ad15c1896e5c6aa3%2Fdf532e50700b467496efcdf88eec7598?format=webp&width=800";

const heroSlides = [
  {
    id: 1,
    title: "Discover Your Signature Scent",
    subtitle: "Luxury fragrances crafted for the modern connoisseur",
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2000&auto=format&fit=crop",
    cta: "Shop Collection",
    badge: "New Arrivals"
  },
  {
    id: 2,
    title: "Timeless Elegance",
    subtitle: "Hand-crafted perfumes that tell your story",
    image: "https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=2000&auto=format&fit=crop",
    cta: "Explore Now",
    badge: "Best Sellers"
  },
  {
    id: 3,
    title: "Unforgettable Moments",
    subtitle: "Premium scents for every occasion",
    image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=2000&auto=format&fit=crop",
    cta: "Shop Now",
    badge: "Limited Edition"
  }
];

const testimonials = [
  { name: "Sarah M.", text: "The best fragrance I've ever owned. Lasts all day!", rating: 5 },
  { name: "James K.", text: "Elegant packaging and amazing scents. Highly recommend!", rating: 5 },
  { name: "Emma L.", text: "Perfect gift for my partner. They absolutely loved it!", rating: 5 },
  { name: "Michael R.", text: "Quality fragrances at great prices. Will buy again!", rating: 5 },
];

export default function Index() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Fetch featured products from API
  const { data: productsData } = useQuery({
    queryKey: ['featured-products'],
    queryFn: () => productsApi.list({ sort_by: 'featured' }),
  });

  const products = productsData?.results?.slice(0, 8) || [];

  // Auto-play hero slider
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
  };

  return (
    <>
      {/* Hero Slider */}
      <section className="relative h-[400px] xs:h-[450px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden w-full">
        {/* Slides */}
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide 
                ? 'opacity-100 scale-100 z-[1]' 
                : 'opacity-0 scale-105 z-0 pointer-events-none'
            }`}
          >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/65 to-black/85 sm:bg-gradient-to-r sm:from-black/80 sm:via-black/60 sm:to-black/40 md:from-black/70 md:via-black/50 md:to-transparent" />
            </div>

            {/* Content */}
            <div className="relative h-full w-full flex items-center justify-center sm:justify-start z-10 px-3 xs:px-4 sm:px-6 md:px-8">
              <div className="w-full max-w-full sm:max-w-2xl space-y-2 xs:space-y-3 sm:space-y-4 md:space-y-6 text-white text-center sm:text-left animate-fade-in">
                {/* Badge */}
                <div className="inline-flex items-center gap-1 xs:gap-1.5 sm:gap-2 px-2 xs:px-2.5 py-0.5 xs:py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[9px] xs:text-[10px] sm:text-xs md:text-sm font-medium">
                  <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{slide.badge}</span>
                </div>
                
                {/* Title */}
                <h1 className="font-display text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold leading-tight tracking-tight break-words">
                  {slide.title}
                </h1>
                
                {/* Subtitle */}
                <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 max-w-xl mx-auto sm:mx-0 break-words">
                  {slide.subtitle}
                </p>
                
                {/* Buttons */}
                <div className="flex flex-col xs:flex-row items-stretch xs:items-center justify-center sm:justify-start gap-2 xs:gap-2.5 sm:gap-3 md:gap-4 pt-4 xs:pt-2 sm:pt-3 md:pt-4 max-w-full">
                  <Button 
                    size="lg" 
                    asChild 
                    className="text-xs xs:text-sm sm:text-base md:text-lg px-4 py-3 xs:px-5 xs:py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 rounded-lg sm:rounded-xl shadow-2xl hover:scale-105 transition-transform w-full xs:w-auto max-w-full"
                  >
                    <Link to="/shop">{slide.cta}</Link>
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline" 
                    asChild 
                    className="hidden xs:flex text-xs xs:text-sm sm:text-base md:text-lg px-4 py-3 xs:px-5 xs:py-4 sm:px-6 sm:py-5 md:px-8 md:py-6 rounded-lg sm:rounded-xl bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:scale-105 transition-transform w-full xs:w-auto max-w-full"
                  >
                    <a href="#bestsellers">Learn More</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-1 xs:left-2 sm:left-4 top-1/2 -translate-y-1/2 p-1.5 xs:p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all hover:scale-110 z-20 active:scale-95"
          aria-label="Previous slide"
        >
          <svg className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-1 xs:right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 xs:p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all hover:scale-110 z-20 active:scale-95"
          aria-label="Next slide"
        >
          <svg className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-3 xs:bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-1.5 xs:gap-2 sm:gap-3 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlaying(false);
              }}
              className={`transition-all ${
                index === currentSlide
                  ? 'w-6 xs:w-8 sm:w-10 md:w-12 h-1.5 xs:h-2 sm:h-2.5 md:h-3 bg-white rounded-full'
                  : 'w-1.5 xs:w-2 sm:w-2.5 md:w-3 h-1.5 xs:h-2 sm:h-2.5 md:h-3 bg-white/50 rounded-full hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Features Bar */}
      <section className="border-y bg-muted/30">
        <div className="container py-6 sm:py-8 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: "🚚", title: "Free Shipping", desc: "On orders over $50" },
              { icon: "✨", title: "Premium Quality", desc: "Luxury ingredients" },
              { icon: "🎁", title: "Gift Wrapping", desc: "Complimentary service" },
              { icon: "💯", title: "Satisfaction", desc: "30-day guarantee" }
            ].map((feature, i) => (
              <div key={i} className="text-center space-y-1 sm:space-y-2 animate-fade-in" style={{animationDelay: `${i * 100}ms`}}>
                <div className="text-2xl sm:text-3xl md:text-4xl">{feature.icon}</div>
                <h3 className="font-semibold text-xs sm:text-sm md:text-base">{feature.title}</h3>
                <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers with Horizontal Scroll */}
      <section id="bestsellers" className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container">
          <div className="mb-12 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              Best Sellers
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Customer Favorites
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover the fragrances our community can't get enough of
            </p>
          </div>

          {products.length > 0 ? (
            <div className="relative">
              <div className="overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex gap-6 px-4">
                  {products.map((p: any, i: number) => (
                    <div 
                      key={p.id} 
                      className="flex-none w-[280px] animate-fade-in"
                      style={{animationDelay: `${i * 100}ms`}}
                    >
                      <ProductCard product={{
                        id: p.slug,
                        name: p.name,
                        price: parseFloat(p.price),
                        image: p.primary_image || "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1400&auto=format&fit=crop",
                        tag: p.tag,
                      }} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center mt-8">
                <Button size="lg" asChild className="rounded-xl px-8">
                  <Link to="/shop">View All Products</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="animate-spin w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full mx-auto" />
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of satisfied fragrance lovers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial, i) => (
              <div 
                key={i} 
                className="p-6 rounded-2xl bg-background border shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 animate-fade-in"
                style={{animationDelay: `${i * 150}ms`}}
              >
                <div className="flex gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                <p className="font-semibold">— {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Showcase */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Shop by Category
            </h2>
            <p className="text-lg text-muted-foreground">
              Find your perfect scent family
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Floral", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=800&auto=format&fit=crop", desc: "Romantic & Elegant" },
              { name: "Woody", image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop", desc: "Warm & Sophisticated" },
              { name: "Citrus", image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=800&auto=format&fit=crop", desc: "Fresh & Energizing" },
              { name: "Oriental", image: "https://images.unsplash.com/photo-1602874801006-e04b6d0c5d85?q=80&w=800&auto=format&fit=crop", desc: "Exotic & Mysterious" }
            ].map((category, i) => (
              <Link
                key={i}
                to={`/shop?category=${category.name.toLowerCase()}`}
                className="group relative overflow-hidden rounded-2xl aspect-[3/4] animate-fade-in hover:scale-105 transition-transform duration-300"
                style={{animationDelay: `${i * 100}ms`}}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-display text-2xl font-bold mb-1">{category.name}</h3>
                  <p className="text-white/80 text-sm">{category.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container py-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-accent to-secondary p-12 md:p-16 text-center">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          <div className="relative z-10 max-w-3xl mx-auto space-y-6 text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
              </svg>
              Special Offer
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold">
              Get 15% Off Your First Order
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Subscribe to our newsletter and receive exclusive offers, fragrance tips, and early access to new releases
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full sm:w-96 px-6 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 px-8 py-4 rounded-xl font-semibold">
                Subscribe
              </Button>
            </div>
            <p className="text-sm text-white/70">
              Join 10,000+ fragrance enthusiasts. Unsubscribe anytime.
            </p>
          </div>
          <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -left-32 -top-32 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
        </div>
      </section>
    </>
  );
}
