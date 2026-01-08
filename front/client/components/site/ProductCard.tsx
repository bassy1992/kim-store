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
      let productId = product.productId;
      if (!productId) {
        productId = parseInt(product.id, 10);
        if (isNaN(productId)) {
          console.error('Invalid product ID:', product.id);
          return;
        }
      }
      
      await add({ ...product, productId }, 1);
    } catch (error) {
      console.error('Failed to add to cart:', error);
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
      {/* Image Container */}
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden rounded-lg sm:rounded-xl bg-muted/30 mb-2 sm:mb-3">
        {/* Tag Badge */}
        {product.tag && (
          <div className="absolute left-1.5 top-1.5 sm:left-2 sm:top-2 z-10">
            <span className="inline-block px-1.5 py-0.5 sm:px-2 sm:py-1 text-[10px] sm:text-xs font-semibold uppercase bg-black/80 text-white rounded">
              {product.tag}
            </span>
          </div>
        )}

        {/* Wishlist Button - hidden on mobile */}
        <button
          onClick={handleWishlist}
          className="absolute right-1.5 top-1.5 sm:right-2 sm:top-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />

        {/* Add to Cart Overlay - desktop only */}
        <div className="hidden sm:block absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="w-full py-2 bg-white text-black font-medium rounded-lg text-sm hover:bg-white/90 transition-colors flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {isAdding ? (
              <span>Adding...</span>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </Link>

      {/* Product Info */}
      <div className="space-y-1">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-xs sm:text-sm font-medium text-foreground line-clamp-2 leading-tight">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between">
          <span className="text-sm sm:text-base font-bold text-foreground">
            ₵{product.price.toFixed(2)}
          </span>
          
          {/* Mobile Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className="sm:hidden w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
