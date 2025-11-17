import { Wind, Droplets, Sparkles, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface AirAmbienceProduct {
  id: number;
  slug: string;
  name: string;
  price: string;
  product_type: string;
  image: string | null;
  is_featured: boolean;
  stock_quantity: number;
  coverage_area: string;
  duration: string;
}

// Icon mapping for product types
const getProductIcon = (productType: string) => {
  switch (productType) {
    case 'humidifier': return Droplets;
    case 'diffuser': return Wind;
    case 'essential_oil': return Sparkles;
    case 'room_spray': return Wind;
    case 'car_freshener': return Wind;
    case 'candle': return Sparkles;
    default: return Wind;
  }
};

// Default image mapping for product types
const getProductImage = (productType: string) => {
  switch (productType) {
    case 'humidifier': 
      return "https://images.unsplash.com/photo-1585421514738-01798e348b17?q=80&w=800&auto=format&fit=crop";
    case 'diffuser': 
      return "https://images.unsplash.com/photo-1602874801006-96e9d5e4c0c5?q=80&w=800&auto=format&fit=crop";
    case 'essential_oil': 
      return "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop";
    case 'room_spray': 
      return "https://images.unsplash.com/photo-1556228578-8c89e6adf883?q=80&w=800&auto=format&fit=crop";
    case 'car_freshener': 
      return "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800&auto=format&fit=crop";
    case 'candle': 
      return "https://images.unsplash.com/photo-1602874801006-96e9d5e4c0c5?q=80&w=800&auto=format&fit=crop";
    default: 
      return "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=800&auto=format&fit=crop";
  }
};

const benefits = [
  {
    icon: Wind,
    title: "Fresh Air",
    description: "Purify and freshen your living space naturally"
  },
  {
    icon: Droplets,
    title: "Perfect Humidity",
    description: "Maintain optimal moisture levels for comfort"
  },
  {
    icon: Sparkles,
    title: "Aromatherapy",
    description: "Enhance mood and wellbeing with natural scents"
  }
];

export default function AirAmbience() {
  const [products, setProducts] = useState<AirAmbienceProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const { add: addToCart } = useCart();
  const { toast } = useToast();

  // Fetch air ambience products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/air-ambience/`);
        if (response.ok) {
          const data = await response.json();
          console.log('Air Ambience API response:', data);
          // Handle paginated response
          setProducts(data.results || data);
        } else {
          console.error('Failed to fetch air ambience products');
        }
      } catch (error) {
        console.error('Error fetching air ambience products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product: AirAmbienceProduct) => {
    setAddingToCart(product.id);
    try {
      await addToCart({
        id: product.slug, // Use slug for routing
        name: product.name,
        price: parseFloat(product.price),
        image: product.image || getProductImage(product.product_type),
        productId: product.id, // Numeric ID for cart API
        slug: product.slug, // Add slug for product links
        size: '50ml' // Default size for air ambience products
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
              <Wind className="w-4 h-4" />
              Transform Your Space
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight animate-slide-up">
              Air & Ambience
              <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Breathe Better
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{animationDelay: "100ms"}}>
              Create the perfect atmosphere with our collection of humidifiers, diffusers, and essential oils
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12 md:py-16">
        {/* Benefits Section */}
        <div className="mb-16">
          <div className="grid sm:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="group p-6 rounded-2xl bg-card border-2 hover:border-primary/50 transition-all duration-300 animate-fade-in hover:shadow-xl text-center"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors mx-auto">
                  <benefit.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Shop by Category
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Discover our curated selection of air care and ambience products
            </p>
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
            ) : products.length > 0 ? (
              products.map((product, index) => {
                const ProductIcon = getProductIcon(product.product_type);
                return (
                  <div
                    key={product.id}
                    className="group relative overflow-hidden rounded-2xl bg-card border hover:border-primary/40 transition-all duration-200 hover:shadow-lg"
                  >
                    {/* Large Image Section */}
                    <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-muted">
                      <img 
                        src={product.image || getProductImage(product.product_type)} 
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
                      
                      {/* Large Product Type Icon */}
                      <div className="absolute top-3 right-3">
                        <div className="w-8 h-8 rounded-full bg-white/90 dark:bg-black/90 flex items-center justify-center">
                          <ProductIcon className="w-4 h-4 text-primary" />
                        </div>
                      </div>
                    </div>

                    {/* Large Content */}
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="font-semibold text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 capitalize">{product.product_type.replace('_', ' ')}</p>
                      </div>
                      
                      {/* Large Details */}
                      <div className="text-sm text-muted-foreground">
                        {product.coverage_area && (
                          <div className="flex items-center gap-2">
                            <Wind className="w-4 h-4" />
                            <span className="truncate">{product.coverage_area}</span>
                          </div>
                        )}
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
                            <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
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
                );
              })
            ) : (
              // No products fallback
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No air ambience products available at the moment.</p>
              </div>
            )}
          </div>
        </div>

        {/* Info Banner */}
        <div className="mb-16 p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 border-2 border-primary/20">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Pro Tip
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold">
              Create Your Perfect Atmosphere
            </h3>
            <p className="text-muted-foreground text-lg">
              Combine a humidifier with essential oils for the ultimate aromatherapy experience. 
              Our experts recommend using 3-5 drops of essential oil per 100ml of water for optimal fragrance.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/10 border-2 border-primary/20">
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
          <div className="relative z-10 p-12 md:p-16 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-2">
                <Sparkles className="w-4 h-4" />
                Need Help Choosing?
              </div>
              <h3 className="font-display text-3xl md:text-4xl font-bold">
                Not Sure Where to Start?
              </h3>
              <p className="text-muted-foreground text-lg">
                Our fragrance experts can help you choose the perfect air care products for your space and needs.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a 
                  href="/contact" 
                  className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
                >
                  Get Expert Advice
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
