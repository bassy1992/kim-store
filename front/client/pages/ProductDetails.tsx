import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import ProductCard, { Product } from "@/components/site/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { productsApi } from "@/lib/api";

const defaultImage = "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1400&auto=format&fit=crop";

export default function ProductDetails() {
  const { id } = useParams();
  const { add } = useCart();
  const [imgIndex, setImgIndex] = useState(0);
  const [size, setSize] = useState("");
  const [qty, setQty] = useState(1);

  // Fetch product details from API
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => productsApi.get(id!),
    enabled: !!id,
  });

  // Fetch related products (same category)
  const { data: relatedData } = useQuery({
    queryKey: ['related-products', product?.category?.slug],
    queryFn: () => productsApi.list({ 
      category: product?.category?.slug,
    }),
    enabled: !!product?.category?.slug,
  });

  // Filter out current product from related products
  const relatedProducts = relatedData?.results?.filter(p => p.slug !== id).slice(0, 3) || [];

  // Use all product images from the API, fallback to primary_image or default
  const productImages = product?.images && product.images.length > 0
    ? product.images.map((img: { url?: string; image_url?: string }) => img.url || img.image_url)
    : product?.primary_image 
      ? [product.primary_image] 
      : [defaultImage];
  
  const image = productImages[imgIndex] || defaultImage;

  // Parse size options from product data
  const sizeOptions = product?.size_options 
    ? product.size_options.split(',').map(s => s.trim()).filter(s => s)
    : ['50ml'];

  // Set default size when product loads
  if (product && !size && sizeOptions.length > 0) {
    setSize(sizeOptions[0]);
  }

  // Loading state
  if (isLoading) {
    return (
      <main className="container px-4 py-8 md:py-16">
        <div className="flex flex-col items-center justify-center py-24">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <p className="mt-6 text-muted-foreground">Loading product...</p>
        </div>
      </main>
    );
  }

  // Error state
  if (error || !product) {
    return (
      <main className="container px-4 py-8 md:py-16">
        <div className="text-center py-24">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/shop" className="inline-block px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90">
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-6 md:py-12 animate-fade-in">
      <div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
        {/* Gallery */}
        <div className="w-full min-w-0">
          <div className="overflow-hidden rounded-xl border shadow-lg">
            <img 
              src={image} 
              alt={product.name} 
              className="w-full aspect-square object-cover" 
            />
          </div>

          {productImages.length > 1 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
              {productImages.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setImgIndex(i)}
                  className={`flex-shrink-0 w-16 h-16 overflow-hidden rounded-lg border-2 ${i === imgIndex ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"}`}
                >
                  <img src={src} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-4 min-w-0">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/shop" className="hover:text-primary">Shop</Link>
            <span>/</span>
            <span className="truncate">{product.category?.name || 'Products'}</span>
          </div>
          
          <h1 className="font-display text-2xl md:text-3xl break-words">{product.name}</h1>
          
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xl md:text-2xl font-semibold">₵{parseFloat(product.price).toFixed(2)}</span>
            {product.stock_quantity > 0 ? (
              <span className="text-sm text-green-600 font-medium">In Stock</span>
            ) : (
              <span className="text-sm text-red-600 font-medium">Out of Stock</span>
            )}
          </div>

          {product.tag && (
            <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {product.tag}
            </span>
          )}

          <p className="text-sm md:text-base text-muted-foreground break-words">
            {product.description || "A refined composition blending floral and woody accords with excellent longevity."}
          </p>

          {/* Size & Quantity */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <label className="text-sm text-muted-foreground w-12">Size</label>
              <select 
                value={size} 
                onChange={(e) => setSize(e.target.value)} 
                className="flex-1 max-w-[140px] rounded-md border px-3 py-2 text-sm"
              >
                {sizeOptions.map((sizeOption) => (
                  <option key={sizeOption} value={sizeOption}>{sizeOption}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-3">
              <label className="text-sm text-muted-foreground w-12">Qty</label>
              <div className="flex items-center">
                <button 
                  className="w-9 h-9 rounded-l-md border flex items-center justify-center hover:bg-muted" 
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                >
                  -
                </button>
                <div className="w-12 h-9 border-t border-b flex items-center justify-center text-sm">{qty}</div>
                <button 
                  className="w-9 h-9 rounded-r-md border flex items-center justify-center hover:bg-muted" 
                  onClick={() => setQty((q) => q + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              className="flex-1 rounded-md bg-primary px-4 py-3 text-primary-foreground font-medium disabled:opacity-50"
              disabled={product.stock_quantity === 0}
              onClick={() => {
                add({ 
                  id: product.slug, 
                  name: product.name, 
                  price: parseFloat(product.price), 
                  image: product.primary_image || defaultImage,
                  productId: product.id,
                  size 
                }, qty);
              }}
            >
              {product.stock_quantity > 0 ? 'Add to cart' : 'Out of Stock'}
            </button>

            <Link 
              to="/cart" 
              className="flex-1 rounded-md border px-4 py-3 text-center hover:bg-accent"
            >
              Go to cart
            </Link>
          </div>

          {/* Additional info */}
          <div className="space-y-3 pt-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm">Product details</h4>
              <p className="text-sm text-muted-foreground mt-1">Concentration: Eau de Parfum. Cruelty-free.</p>
            </div>

            <div className="rounded-lg border p-4">
              <h4 className="font-semibold text-sm">How to use</h4>
              <p className="text-sm text-muted-foreground mt-1">Spray on pulse points and allow to dry naturally.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews & Related */}
      <section className="mt-10">
        <h2 className="font-display text-xl md:text-2xl mb-4">Customer Reviews</h2>
        {product.average_rating && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.round(product.average_rating!) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {product.average_rating.toFixed(1)} out of 5
            </span>
          </div>
        )}
        <div className="rounded-lg border p-4 text-center text-sm text-muted-foreground">
          <p>No reviews yet. Be the first to review this product!</p>
        </div>

        {relatedProducts.length > 0 && (
          <>
            <h2 className="font-display text-xl md:text-2xl mt-8 mb-4">You may also like</h2>
            <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <ProductCard 
                  key={p.id} 
                  product={{
                    id: p.slug,
                    name: p.name,
                    price: parseFloat(p.price),
                    image: p.primary_image || defaultImage,
                    tag: p.tag,
                    productId: p.id,
                  }} 
                />
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
