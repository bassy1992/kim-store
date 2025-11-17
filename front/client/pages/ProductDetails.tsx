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

  // Use product images or fallback to default
  const productImages = product?.primary_image 
    ? [product.primary_image, product.primary_image, product.primary_image] 
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
      <main className="container py-16">
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
      <main className="container py-16">
        <div className="text-center py-24">
          <h2 className="font-display text-3xl font-bold mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/shop" className="inline-block px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90">
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container py-16 animate-fade-in">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="overflow-hidden rounded-2xl border shadow-lg animate-scale-in">
            <img src={image} alt={product.name} className="w-full h-72 sm:h-96 md:h-[420px] lg:h-[520px] object-cover transition-transform duration-500" />
          </div>

          <div className="mt-4 flex gap-3 overflow-x-auto py-1">
            {productImages.map((src, i) => (
              <button
                key={i}
                onClick={() => setImgIndex(i)}
                className={`min-w-[72px] h-20 overflow-hidden rounded-lg border transition-transform duration-200 ${i === imgIndex ? "ring-2 ring-primary scale-105" : "opacity-80 hover:opacity-100 hover:scale-105"}`}
              >
                <img src={src} alt={`${product.name} ${i + 1}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4 animate-slide-up">
          <div className="flex items-center gap-2">
            <Link to="/shop" className="text-sm text-muted-foreground hover:text-primary">Shop</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-sm text-muted-foreground">{product.category?.name || 'Products'}</span>
          </div>
          
          <h1 className="font-display text-3xl">{product.name}</h1>
          
          <div className="flex items-center gap-4">
            <div className="text-2xl font-semibold">₵{parseFloat(product.price).toFixed(2)}</div>
            {product.stock_quantity > 0 ? (
              <span className="text-sm text-green-600 font-medium">In Stock ({product.stock_quantity} available)</span>
            ) : (
              <span className="text-sm text-red-600 font-medium">Out of Stock</span>
            )}
          </div>

          {product.tag && (
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
              {product.tag}
            </div>
          )}

          <p className="text-muted-foreground">{product.description || "A refined composition blending floral and woody accords with excellent longevity."}</p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4">
            <div>
              <label className="text-sm text-muted-foreground">Size</label>
              <select value={size} onChange={(e) => setSize(e.target.value)} className="ml-2 rounded-md border px-3 py-2 transition-shadow hover:shadow-sm">
                {sizeOptions.map((sizeOption) => (
                  <option key={sizeOption} value={sizeOption}>{sizeOption}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm text-muted-foreground">Quantity</label>
              <div className="ml-2 flex items-center gap-2">
                <button className="rounded-md border px-3 py-1 hover:bg-muted" onClick={() => setQty((q) => Math.max(1, q - 1))}>-</button>
                <div className="w-10 text-center">{qty}</div>
                <button className="rounded-md border px-3 py-1 hover:bg-muted" onClick={() => setQty((q) => q + 1)}>+</button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              className="w-full sm:w-auto rounded-md bg-primary px-6 py-3 text-primary-foreground font-medium transform transition-transform hover:-translate-y-0.5 active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
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

            <Link to="/cart" className="w-full sm:w-auto rounded-md border px-6 py-3 flex items-center justify-center transition-colors hover:bg-accent">Go to cart</Link>
          </div>

          {/* Additional info */}
          <div className="mt-8 grid gap-4">
            <div className="rounded-lg border p-4">
              <h4 className="font-semibold">Product details</h4>
              <p className="text-sm text-muted-foreground mt-2">Concentration: Eau de Parfum. Cruelty-free. Hand-mixed batches.</p>
            </div>

            <div className="rounded-lg border p-4">
              <h4 className="font-semibold">How to use</h4>
              <p className="text-sm text-muted-foreground mt-2">Spray on pulse points and allow to dry naturally. Layer with matching body lotion for longevity.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews & Related */}
      <section className="mt-12">
        <h2 className="font-display text-2xl mb-4">Customer Reviews</h2>
        {product.average_rating && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${i < Math.round(product.average_rating!) ? 'text-yellow-400' : 'text-gray-300'}`}
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
        <div className="rounded-lg border p-4 text-center text-muted-foreground">
          <p>No reviews yet. Be the first to review this product!</p>
        </div>

        {relatedProducts.length > 0 && (
          <>
            <h2 className="font-display text-2xl mt-10 mb-4">You may also like</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
