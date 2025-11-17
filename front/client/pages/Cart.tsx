import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Cart() {
  const { items, remove, total, clear, updateQuantity } = useCart();

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold">Shopping Cart</h1>
              <p className="text-muted-foreground mt-1">
                {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <Link to="/shop" className="text-primary hover:underline flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="relative mb-8">
              <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center">
                <svg className="w-16 h-16 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div className="absolute -top-2 -right-2 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-2xl">🛍️</span>
              </div>
            </div>
            <h2 className="font-display text-3xl font-bold mb-3">Your cart is empty</h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-md text-center">
              Looks like you haven't added any fragrances yet. Start exploring our collection!
            </p>
            <Button size="lg" asChild className="rounded-xl px-8">
              <Link to="/shop">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Browse Products
              </Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <div 
                  key={item.id} 
                  className="group relative bg-card rounded-2xl border p-4 md:p-6 hover:shadow-lg transition-all animate-fade-in"
                  style={{animationDelay: `${index * 50}ms`}}
                >
                  <div className="flex gap-4 md:gap-6">
                    {/* Product Image */}
                    <Link to={`/product/${item.slug || item.productId}`} className="flex-shrink-0">
                      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden bg-muted">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                        />
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <Link to={`/product/${item.slug || item.productId}`} className="group/link">
                            <h3 className="font-display text-lg md:text-xl font-semibold group-hover/link:text-primary transition-colors line-clamp-2">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground mt-1">
                            ₵{item.price.toFixed(2)} each
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => remove(item.id)}
                          className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                          title="Remove item"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-muted-foreground">Quantity:</span>
                          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted">
                            <button 
                              onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              disabled={item.quantity <= 1}
                              className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="font-semibold min-w-[2ch] text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Subtotal</p>
                          <p className="text-xl font-bold text-primary">
                            ₵{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Clear Cart Button */}
              <button
                onClick={clear}
                className="w-full py-3 rounded-xl border-2 border-dashed border-muted-foreground/30 text-muted-foreground hover:border-destructive hover:text-destructive hover:bg-destructive/5 transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Clear Cart
              </button>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Summary Card */}
                <div className="bg-card rounded-2xl border p-6 space-y-4">
                  <h2 className="font-display text-2xl font-bold">Order Summary</h2>
                  
                  <div className="space-y-3 py-4 border-y">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">₵{total.toFixed(2)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span className="font-medium">₵{(total * 0.1).toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-display text-lg font-semibold">Total</span>
                    <span className="font-display text-3xl font-bold text-primary">
                      ₵{(total * 1.1).toFixed(2)}
                    </span>
                  </div>

                  <Button size="lg" asChild className="w-full rounded-xl text-lg py-6 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all">
                    <a href="/checkout">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Proceed to Checkout
                    </a>
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    Secure checkout powered by Stripe
                  </p>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: "🔒", text: "Secure Payment" },
                    { icon: "🚚", text: "Free Shipping" },
                    { icon: "↩️", text: "Easy Returns" },
                    { icon: "✓", text: "Authentic" }
                  ].map((badge, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border">
                      <span className="text-2xl">{badge.icon}</span>
                      <span className="text-xs font-medium">{badge.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
