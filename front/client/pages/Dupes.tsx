import { ArrowRight, Sparkles, ShoppingCart, Plus, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
console.log('API_BASE_URL:', API_BASE_URL);

interface DupeProduct {
  id: number;
  slug: string;
  name: string;
  price: string;
  designer_brand: string;
  designer_fragrance: string;
  designer_price: string;
  similarity_percentage: number;
  image: string | null;
  is_featured: boolean;
  savings: number;
  savings_percentage: number;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export default function Dupes() {
  const [dupeProducts, setDupeProducts] = useState<DupeProduct[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingToCart, setAddingToCart] = useState<number | null>(null);
  const { add: addToCart } = useCart();
  const { toast } = useToast();

  // Fetch dupe products from API
  useEffect(() => {
    const fetchDupes = async () => {
      try {
        console.log('Fetching dupes from:', `${API_BASE_URL}/dupes/`);
        const response = await fetch(`${API_BASE_URL}/dupes/`);
        console.log('Response status:', response.status);
        
        if (response.ok) {
          const data = await response.json();
          console.log('Dupes data received:', data);
          setDupeProducts(data.results || data);
          
          if ((data.results || data).length > 0) {
            toast({
              title: "Dupes loaded!",
              description: `Found ${(data.results || data).length} amazing fragrance alternatives.`,
              duration: 2000,
            });
          }
        } else {
          const errorText = await response.text();
          console.error('API Error:', response.status, errorText);
          setError(`Failed to load dupe products: ${response.status}`);
          toast({
            title: "Failed to load dupes",
            description: "Please refresh the page to try again.",
            variant: "destructive",
            duration: 4000,
          });
        }
      } catch (err) {
        console.error('Network error fetching dupes:', err);
        setError('Failed to connect to server');
        toast({
          title: "Connection error",
          description: "Unable to connect to server. Please check your internet connection.",
          variant: "destructive",
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDupes();
  }, []);

  const handleAddToCart = async (product: DupeProduct) => {
    setAddingToCart(product.id);
    try {
      await addToCart({
        id: product.slug,
        name: product.name,
        price: parseFloat(product.price),
        image: product.image || '/placeholder.jpg',
        dupeId: product.id,  // Send dupe_id instead of product_id
        size: '50ml'
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

  if (loading) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        <div className="container py-16 text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dupe pairs...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-background via-background to-muted/20">
        <div className="container py-16 text-center">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-destructive/10 flex items-center justify-center">
            <svg className="w-12 h-12 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="font-display text-2xl font-bold mb-3 text-destructive">Oops! Something went wrong</h3>
          <p className="text-muted-foreground mb-6">{error}</p>
          <Button 
            onClick={() => {
              window.location.reload();
              toast({
                title: "Refreshing page...",
                description: "Attempting to reload the dupes.",
                duration: 2000,
              });
            }}
          >
            Try Again
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Clean Hero Section */}
      <div className="border-b">
        <div className="container py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              Designer Fragrance Alternatives
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Luxury Scents,
              <span className="block text-primary">Affordable Prices</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover high-quality fragrance alternatives that capture the essence of your favorite designer perfumes at a fraction of the cost.
            </p>
          </div>
        </div>
      </div>

      <div className="container py-12 md:py-16">
        {/* Simple Info Banner */}
        <div className="mb-12 p-6 rounded-xl bg-muted/50 border">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1">What are Fragrance Dupes?</h3>
              <p className="text-muted-foreground text-sm">
                Fragrance dupes are affordable alternatives that capture the essence of luxury perfumes. 
                They offer similar scent profiles at a fraction of the cost, making premium fragrances accessible to everyone.
              </p>
            </div>
          </div>
        </div>

        {/* Dupes Grid */}
        <div className="space-y-8">
          {dupeProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <Sparkles className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="font-display text-2xl font-bold mb-3">No Dupe Products Available</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                We're working on adding more fragrance alternatives. Check back soon or browse our full collection!
              </p>
              <Button asChild>
                <a href="/shop">Browse All Products</a>
              </Button>
            </div>
          ) : (
            dupeProducts.map((product, index) => (
            <div 
              key={product.id}
              className="bg-card border rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center">
                {/* Designer Original */}
                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 bg-muted rounded-full text-xs font-medium">
                    Designer Original
                  </span>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center">
                      <span className="text-lg font-bold text-muted-foreground">
                        {product.designer_brand.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">{product.designer_brand}</p>
                      <h3 className="font-semibold text-lg">{product.designer_fragrance}</h3>
                      <p className="text-lg font-bold">₵{parseFloat(product.designer_price).toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Arrow & Savings */}
                <div className="flex md:flex-col items-center gap-3 py-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 text-primary md:rotate-90" />
                  </div>
                  <div className="text-center">
                    <div className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                      Save ₵{product.savings.toFixed(2)}
                    </div>
                  </div>
                </div>

                {/* Our Alternative */}
                <div className="space-y-4">
                  <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                    Our Alternative
                  </span>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                      <img 
                        src={product.image || '/placeholder.jpg'} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground">Kim Fragrance</p>
                      <h3 className="font-semibold text-lg">{product.name}</h3>
                      <p className="text-lg font-bold text-primary">₵{parseFloat(product.price).toFixed(2)}</p>
                    </div>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <Button 
                    onClick={() => handleAddToCart(product)}
                    disabled={addingToCart === product.id}
                    className="w-full"
                    size="sm"
                  >
                    {addingToCart === product.id ? (
                      <>
                        <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                        Adding...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 pt-4 border-t flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {product.similarity_percentage}% similarity
                </span>
                <span className="font-medium text-green-600 dark:text-green-400">
                  {product.savings_percentage}% savings
                </span>
              </div>
            </div>
            ))
          )}
        </div>

        {/* Simple CTA Section */}
        <div className="mt-16 p-8 md:p-12 rounded-2xl bg-primary/5 border text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h3 className="font-display text-3xl md:text-4xl font-bold">
              Ready to Save on Luxury Scents?
            </h3>
            <p className="text-muted-foreground text-lg">
              Browse our collection of premium fragrance alternatives and discover your new signature scent without breaking the bank.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <a 
                href="/shop" 
                onClick={() => {
                  toast({
                    title: "Redirecting to shop...",
                    description: "Browse our full collection of fragrances.",
                    duration: 2000,
                  });
                }}
                className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-primary-foreground font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
              >
                Shop All Fragrances
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href="/contact" 
                onClick={() => {
                  toast({
                    title: "Getting help...",
                    description: "Our fragrance experts are here to help you choose!",
                    duration: 2000,
                  });
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-background border-2 px-8 py-4 font-semibold hover:bg-muted transition-all hover:scale-105"
              >
                Need Help Choosing?
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
