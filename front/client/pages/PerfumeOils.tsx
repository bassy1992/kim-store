import { Droplet, Sparkles, Clock, Heart, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface PerfumeOilProduct {
  id: number;
  slug: string;
  name: string;
  price: string;
  concentration: string;
  size_options: string;
  longevity: string;
  scent_family: string;
  image: string | null;
  is_featured: boolean;
  stock_quantity: number;
  all_notes: string[];
}

// Default images for different scent families
const getDefaultImage = (scentFamily: string) => {
  const family = scentFamily.toLowerCase();
  if (family.includes('oriental')) return "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=400&auto=format&fit=crop";
  if (family.includes('floral')) return "https://images.unsplash.com/photo-1588405748880-12d1d2a59bd9?q=80&w=400&auto=format&fit=crop";
  if (family.includes('woody')) return "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=400&auto=format&fit=crop";
  if (family.includes('citrus')) return "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=400&auto=format&fit=crop";
  if (family.includes('musky')) return "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=400&auto=format&fit=crop";
  if (family.includes('spicy')) return "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=400&auto=format&fit=crop";
  return "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=400&auto=format&fit=crop";
};

const benefits = [
  {
    icon: Droplet,
    title: "Alcohol-Free",
    description: "Pure concentrated oils without harsh chemicals or alcohol"
  },
  {
    icon: Clock,
    title: "Long-Lasting",
    description: "Lasts 8-24 hours with just a small application"
  },
  {
    icon: Heart,
    title: "Skin-Friendly",
    description: "Gentle on sensitive skin, moisturizing properties"
  },
  {
    icon: Sparkles,
    title: "Highly Concentrated",
    description: "A little goes a long way, better value for money"
  }
];

export default function PerfumeOils() {
  const [oilProducts, setOilProducts] = useState<PerfumeOilProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const { add: addToCart } = useCart();
  const { toast } = useToast();

  // Fetch perfume oil products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/perfume-oils/`);
        if (response.ok) {
          const data = await response.json();
          console.log('Perfume Oils API response:', data);
          setOilProducts(data.results || data);
        } else {
          console.error('Failed to fetch perfume oil products');
        }
      } catch (error) {
        console.error('Error fetching perfume oil products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product: PerfumeOilProduct) => {
    setAddingToCart(product.id);
    try {
      await addToCart({
        id: product.slug, // Use slug for routing
        name: product.name,
        price: parseFloat(product.price),
        image: product.image || getDefaultImage(product.scent_family),
        productId: product.id, // Numeric ID for cart API
        slug: product.slug, // Add slug for product links
        size: product.size_options.split(',')[0].trim() // Use first size option
      });
      
      toast({
        title: "Added to cart!",
        description: `${product.name} has been added to your cart.`,
        duration: 3000,
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
      toast({
        title: "Failed to add to cart",
        description: "Please try again later.",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setAddingToCart(null);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5 border-b">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="container relative py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Droplet className="w-4 h-4" />
              Pure & Concentrated
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight animate-slide-up">
              Perfume Oils
              <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Pure Luxury
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{animationDelay: "100ms"}}>
              Experience the richness of alcohol-free, highly concentrated perfume oils that last all day
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12 md:py-16">
        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Perfume Oils?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="group p-6 rounded-2xl bg-card border-2 hover:border-primary/50 transition-all duration-300 animate-fade-in hover:shadow-xl"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Info Banner */}
        <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-2 border-primary/20">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-1">How to Apply Perfume Oils</h3>
              <p className="text-muted-foreground">
                Apply a small amount to pulse points (wrists, neck, behind ears). The warmth of your body will help diffuse the scent throughout the day. 
                A little goes a long way with pure oils!
              </p>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Our Collection
            </h2>
            <div className="text-sm text-muted-foreground">
              {loading ? (
                <span>Loading...</span>
              ) : (
                <span><span className="font-semibold text-foreground">{oilProducts.length}</span> products</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {loading ? (
              // Loading skeleton
              Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="aspect-square bg-muted rounded-t-lg"></div>
                  <div className="p-2 bg-card rounded-b-lg border border-t-0">
                    <div className="h-3 bg-muted rounded mb-1"></div>
                    <div className="h-2 bg-muted rounded mb-1"></div>
                    <div className="h-2 bg-muted rounded w-3/4"></div>
                  </div>
                </div>
              ))
            ) : oilProducts.length > 0 ? (
              oilProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className="group relative overflow-hidden rounded-2xl bg-card border hover:border-primary/40 transition-all duration-200 hover:shadow-lg"
                >
                  {/* Large Image Section */}
                  <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-muted">
                    <img 
                      src={product.image || getDefaultImage(product.scent_family)} 
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                    
                    {/* Large Featured Badge */}
                    {product.is_featured && (
                      <div className="absolute top-3 left-3">
                        <div className="w-3 h-3 rounded-full bg-primary"></div>
                      </div>
                    )}
                    
                    {/* Large Price Badge */}
                    <div className="absolute bottom-3 right-3">
                      <div className="px-3 py-1.5 rounded-md text-sm bg-black/70 text-white font-bold">
                        ₵{parseFloat(product.price).toFixed(0)}
                      </div>
                    </div>
                  </div>

                  {/* Large Content */}
                  <div className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{product.scent_family}</p>
                    </div>
                    
                    {/* Large Details */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="truncate">{product.size_options.split(',')[0].trim()}</span>
                      <span>•</span>
                      <span>{product.longevity.split('-')[0]}h+</span>
                    </div>

                    {/* Stock */}
                    <div className="text-sm">
                      <span className={product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}>
                        {product.stock_quantity > 0 ? 'In stock' : 'Out of stock'}
                      </span>
                    </div>

                    {/* Large Button */}
                    <button 
                      onClick={() => handleAddToCart(product)}
                      disabled={addingToCart === product.id || product.stock_quantity === 0}
                      className={`w-full py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                        product.stock_quantity === 0
                          ? 'bg-muted text-muted-foreground cursor-not-allowed'
                          : 'bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-[1.02]'
                      }`}
                    >
                      {addingToCart === product.id ? (
                        <>
                          <div className="w-4 h-4 animate-spin rounded-full border border-current border-t-transparent" />
                          <span>Adding...</span>
                        </>
                      ) : product.stock_quantity === 0 ? (
                        <span>Out of Stock</span>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No perfume oil products available at the moment.</p>
              </div>
            )}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border-2 border-primary/20">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="relative z-10 p-12 md:p-16 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-2">
                <Sparkles className="w-4 h-4" />
                Custom Blends Available
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-bold">
                Looking for a Custom Blend?
              </h3>
              <p className="text-muted-foreground text-lg">
                We can create personalized perfume oil blends tailored to your preferences. 
                Contact us to discuss your ideal scent profile.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a 
                  href="/contact" 
                  className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
                >
                  Request Custom Blend
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <a 
                  href="/shop" 
                  className="inline-flex items-center gap-2 rounded-xl bg-background border-2 px-8 py-4 font-semibold hover:bg-muted transition-all hover:scale-105"
                >
                  Browse All Products
                </a>
              </div>
            </div>
          </div>
          <div className="absolute -right-32 -bottom-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -left-32 -top-32 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>
      </div>
    </main>
  );
}
