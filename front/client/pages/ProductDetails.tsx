import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import ProductCard, { Product } from "@/components/site/ProductCard";

const sampleImages = [
  "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1563170351-be82bc888aa4?q=80&w=1400&auto=format&fit=crop",
];

const related: Product[] = [
  {
    id: "rose-01",
    name: "Eau de Rose",
    price: 89,
    image: sampleImages[0],
    tag: "Best Seller",
  },
  {
    id: "citrus-noir",
    name: "Citrus Noir",
    price: 79,
    image: sampleImages[1],
  },
  {
    id: "amber-oud",
    name: "Amber Oud",
    price: 120,
    image: sampleImages[2],
    tag: "New",
  },
];

export default function ProductDetails() {
  const { id } = useParams();
  const { add } = useCart();
  const [imgIndex, setImgIndex] = useState(0);
  const [size, setSize] = useState("50ml");
  const [qty, setQty] = useState(1);

  const productName = id ? `Product ${id}` : "Signature Fragrance";
  const price = 89;
  const image = sampleImages[imgIndex];

  return (
    <main className="container py-16 animate-fade-in">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Gallery */}
        <div>
          <div className="overflow-hidden rounded-2xl border shadow-lg animate-scale-in">
            <img src={image} alt={productName} className="w-full h-72 sm:h-96 md:h-[420px] lg:h-[520px] object-cover transition-transform duration-500" />
          </div>

          <div className="mt-4 flex gap-3 overflow-x-auto py-1">
            {sampleImages.map((src, i) => (
              <button
                key={src}
                onClick={() => setImgIndex(i)}
                className={`min-w-[72px] h-20 overflow-hidden rounded-lg border transition-transform duration-200 ${i === imgIndex ? "ring-2 ring-primary scale-105" : "opacity-80 hover:opacity-100 hover:scale-105"}`}
              >
                <img src={src} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="space-y-4 animate-slide-up">
          <h1 className="font-display text-3xl">{productName}</h1>
          <div className="flex items-center gap-4">
            <div className="text-2xl font-semibold">${price.toFixed(2)}</div>
            <div className="text-sm text-muted-foreground">Free shipping over $100</div>
          </div>

          <p className="text-muted-foreground">A refined composition blending floral and woody accords with excellent longevity. Top notes: bergamot, neroli. Heart: rose, jasmine. Base: amber, oud.</p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mt-4">
            <div>
              <label className="text-sm text-muted-foreground">Size</label>
              <select value={size} onChange={(e) => setSize(e.target.value)} className="ml-2 rounded-md border px-3 py-2 transition-shadow hover:shadow-sm">
                <option>30ml</option>
                <option>50ml</option>
                <option>100ml</option>
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
              className="w-full sm:w-auto rounded-md bg-primary px-6 py-3 text-primary-foreground font-medium transform transition-transform hover:-translate-y-0.5 active:translate-y-0.5"
              onClick={() => add({ id: id ?? "sku-unknown", name: productName, price, image }, qty)}
            >
              Add to cart
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
        <h2 className="font-display text-2xl mb-4">Reviews</h2>
        <div className="space-y-4">
          <div className="rounded-lg border p-4">
            <div className="font-medium">"Lovely scent — lasts all day"</div>
            <div className="text-sm text-muted-foreground mt-1">— Alex</div>
          </div>
        </div>

        <h2 className="font-display text-2xl mt-10 mb-4">You may also like</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((r) => (
            <ProductCard key={r.id} product={r} />
          ))}
        </div>
      </section>
    </main>
  );
}
