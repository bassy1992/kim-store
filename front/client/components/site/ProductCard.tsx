import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";

export type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  tag?: string;
  productId?: number;
};

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    try {
      // Use productId if available, otherwise parse the string id
      let productId = product.productId;
      if (!productId) {
        productId = parseInt(product.id, 10);
        if (isNaN(productId)) {
          console.error('Invalid product ID:', product.id, 'Product:', product);
          alert(`Invalid product ID: ${product.id}`);
          return;
        }
      }
      
      console.log('🛒 Adding to cart:', { 
        productId, 
        productName: product.name, 
        productPrice: product.price 
      });
      
      await add({ ...product, productId }, 1);
      
      // Show success feedback
      console.log('✅ Successfully added to cart:', product.name);
      
    } catch (error) {
      console.error('❌ Failed to add to cart:', error);
      alert(`Failed to add ${product.name} to cart. Please try again.`);
    } finally {
      setTimeout(() => setIsAdding(false), 800);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="group relative">
      {/* Large Image Container */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden rounded-2xl bg-muted/30 mb-4">
        {/* Large Tag Badge */}
        {product.tag && (
          <div className="absolute left-3 top-3 z-10">
            <span className="inline-block px-3 py-1.5 text-xs font-bold tracking-wider uppercase bg-black/80 text-white backdrop-blur-sm rounded-md">
              {product.tag}
            </span>
          </div>
        )}

        {/* Large Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute right-3 top-3 z-10 w-9 h-9 rounded-full bg-white/90 dark:bg-black/90 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <Heart className={`w-4 h-4 transition-all ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-foreground'}`} />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          decoding="async"
        />

        {/* Large Add to Cart Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full py-3 px-4 bg-white text-black font-semibold rounded-xl text-base hover:bg-white/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isAdding ? (
              <>
                <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>Adding...</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Large Product Info */}
      <div className="space-y-3">
        <Link to={`/product/${product.id}`} className="block group/title">
          <h3 className="text-base font-semibold text-foreground/90 group-hover/title:text-foreground line-clamp-2 leading-snug min-h-[3rem]">
            {product.name}
          </h3>
        </Link>

        {/* Large Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-foreground">
            ₵{product.price.toFixed(2)}
          </span>
        </div>

        {/* Large Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">4.9</span>
          <span className="text-sm text-muted-foreground/50">•</span>
          <span className="text-sm text-muted-foreground/70">128 reviews</span>
        </div>
      </div>
    </div>
  );
}
