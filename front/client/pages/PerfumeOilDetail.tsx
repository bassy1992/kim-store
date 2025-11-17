import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Droplet, Clock, Heart, Sparkles, ShoppingCart } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

interface PerfumeOilProduct {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: string;
  concentration: string;
  size_options: string;
  longevity: string;
  scent_family: string;
  top_notes: string;
  middle_notes: string;
  base_notes: string;
  application_tips: string;
  ingredients: string;
  image_url: string;
  stock_quantity: number;
  is_featured: boolean;
  is_custom_blend: boolean;
}

const getDefaultImage = (scentFamily: string) => {
  const family = scentFamily.toLowerCase();
  if (family.includes('oriental')) return "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop";
  if (family.includes('floral')) return "https://images.unsplash.com/photo-1588405748880-12d1d2a59bd9?q=80&w=800&auto=format&fit=crop";
  if (family.includes('woody')) return "https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=800&auto=format&fit=crop";
  if (family.includes('citrus')) return "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?q=80&w=800&auto=format&fit=crop";
  return "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=800&auto=format&fit=crop";
};

export default function PerfumeOilDetail() {
  const { slug } = useParams();
  const { add } = useCart();
  const { toast } = useToast();
  const [product, setProduct] = useState<PerfumeOilProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/perfume-oils/${slug}/`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
          // Set default size
          const sizes = data.size_options.split(',').map((s: string) => s.trim()).filter((s: string) => s);
          if (sizes.length > 0) {
            setSize(sizes[0]);
          }
        } else {
          console.error('Failed to fetch product');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    setAddingToCart(true);
    try {
      await add({
        id: product.slug,
        name: product.name,
        price: parseFloat(product.price),
        image: product.image_url || getDefaultImage(product.scent_family),
        perfumeOilId: product.id,
        slug: product.slug,
        size
      }, qty);
      
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
      setAddingToCart(false);
    }
  };

  if (loading) {
    return (
      <main className="container py-16">
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="mt-6 text-muted-foreground">Loading product...</p>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="container py-16">
        <div className="text-center py-24">
          <h2 className="font-display text-3xl font-bold mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/perfume-oils" className="inline-block px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90">
            Back to Perfume Oils
          </Link>
        </div>
      </main>
    );
  }

  const sizeOptions = product.size_options.split(',').map(s => s.trim()).filter(s => s);
  const image = product.image_url || getDefaultImage(product.scent_family);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm">
          <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
          <span className="text-muted-foreground">/</span>
          <Link to="/perfume-oils" className="text-muted-foreground hover:text-primary">Perfume Oils</Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Image */}
          <div className="animate-fade-in">
            <div className="overflow-hidden rounded-2xl border shadow-lg">
              <img 
                src={image} 
                alt={product.name} 
                className="w-full h-96 md:h-[500px] object-cover" 
              />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6 animate-slide-up">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{product.name}</h1>
              {product.is_featured && (
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  Featured
                </span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold text-primary">₵{parseFloat(product.price).toFixed(2)}</div>
              {product.stock_quantity > 0 ? (
                <span className="text-sm text-green-600 font-medium">In Stock ({product.stock_quantity} available)</span>
              ) : (
                <span className="text-sm text-red-600 font-medium">Out of Stock</span>
              )}
            </div>

            <p className="text-muted-foreground text-lg">{product.description}</p>

            {/* Product Info */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-lg bg-muted/50">
              <div>
                <p className="text-sm text-muted-foreground">Concentration</p>
                <p className="font-semibold capitalize">{product.concentration.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Longevity</p>
                <p className="font-semibold">{product.longevity}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Scent Family</p>
                <p className="font-semibold capitalize">{product.scent_family}</p>
              </div>
              {product.is_custom_blend && (
                <div>
                  <p className="text-sm text-muted-foreground">Custom Blend</p>
                  <p className="font-semibold text-primary">Available</p>
                </div>
              )}
            </div>

            {/* Fragrance Notes */}
            {(product.top_notes || product.middle_notes || product.base_notes) && (
              <div className="space-y-3 p-4 rounded-lg border">
                <h3 className="font-semibold text-lg">Fragrance Notes</h3>
                {product.top_notes && (
                  <div>
                    <p className="text-sm text-muted-foreground">Top Notes</p>
                    <p className="text-sm">{product.top_notes}</p>
                  </div>
                )}
                {product.middle_notes && (
                  <div>
                    <p className="text-sm text-muted-foreground">Middle Notes</p>
                    <p className="text-sm">{product.middle_notes}</p>
                  </div>
                )}
                {product.base_notes && (
                  <div>
                    <p className="text-sm text-muted-foreground">Base Notes</p>
                    <p className="text-sm">{product.base_notes}</p>
                  </div>
                )}
              </div>
            )}

            {/* Size and Quantity */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm text-muted-foreground block mb-2">Size</label>
                <select 
                  value={size} 
                  onChange={(e) => setSize(e.target.value)} 
                  className="w-full rounded-lg border px-4 py-2.5 bg-background"
                >
                  {sizeOptions.map((sizeOption) => (
                    <option key={sizeOption} value={sizeOption}>{sizeOption}</option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="text-sm text-muted-foreground block mb-2">Quantity</label>
                <div className="flex items-center gap-2">
                  <button 
                    className="rounded-lg border px-4 py-2.5 hover:bg-muted transition-colors" 
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <div className="w-16 text-center font-semibold">{qty}</div>
                  <button 
                    className="rounded-lg border px-4 py-2.5 hover:bg-muted transition-colors" 
                    onClick={() => setQty((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                disabled={product.stock_quantity === 0 || addingToCart}
                className="flex-1 rounded-xl bg-primary px-6 py-4 text-primary-foreground font-semibold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {addingToCart ? (
                  <>
                    <div className="w-5 h-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    <span>Adding...</span>
                  </>
                ) : product.stock_quantity === 0 ? (
                  <span>Out of Stock</span>
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </>
                )}
              </button>

              <Link 
                to="/cart" 
                className="rounded-xl border-2 px-6 py-4 flex items-center justify-center transition-colors hover:bg-accent font-semibold"
              >
                Go to Cart
              </Link>
            </div>

            {/* Application Tips */}
            {product.application_tips && (
              <div className="p-4 rounded-lg border bg-card">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-primary" />
                  How to Use
                </h4>
                <p className="text-sm text-muted-foreground">{product.application_tips}</p>
              </div>
            )}

            {/* Ingredients */}
            {product.ingredients && (
              <div className="p-4 rounded-lg border bg-card">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Ingredients
                </h4>
                <p className="text-sm text-muted-foreground">{product.ingredients}</p>
              </div>
            )}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-8 text-center">Why Choose Perfume Oils?</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Droplet, title: "Alcohol-Free", desc: "Pure concentrated oils" },
              { icon: Clock, title: "Long-Lasting", desc: "Lasts 8-24 hours" },
              { icon: Heart, title: "Skin-Friendly", desc: "Gentle and moisturizing" },
              { icon: Sparkles, title: "Concentrated", desc: "A little goes a long way" }
            ].map((benefit, i) => (
              <div key={i} className="p-6 rounded-xl bg-card border text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
