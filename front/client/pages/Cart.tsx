import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useMemo, useCallback, useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Cart() {
  const { items, remove, total, clear, updateQuantity, promoCode, applyPromoCode, removePromoCode, subtotal, discountAmount } = useCart();
  const [promoInput, setPromoInput] = useState("");
  const [applyingPromo, setApplyingPromo] = useState(false);
  const { toast } = useToast();

  // Memoize calculations to prevent recalculation on every render
  const calculations = useMemo(() => {
    return {
      finalTotal: total
    };
  }, [total]);

  // Memoize handlers to prevent recreation on every render
  const handleRemove = useCallback((id: string) => {
    remove(id);
  }, [remove]);

  const handleClear = useCallback(() => {
    clear();
  }, [clear]);

  const handleUpdateQuantity = useCallback((id: string, quantity: number) => {
    updateQuantity(id, quantity);
  }, [updateQuantity]);

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
              {items.map((item, index) => {
                // Memoize item subtotal calculation
                const itemSubtotal = item.price * item.quantity;
                
                return (
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
                      <div className="flex items-start justify-between gap-2 sm:gap-4">
                        <div className="flex-1 min-w-0">
                          <Link to={`/product/${item.slug || item.productId}`} className="group/link">
                            <h3 className="font-display text-base sm:text-lg md:text-xl font-semibold group-hover/link:text-primary transition-colors line-clamp-2">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                            ₵{item.price.toFixed(2)} each
                          </p>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemove(item.id)}
                          className="p-1.5 sm:p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                          title="Remove item"
                          aria-label="Remove item from cart"
                        >
                          <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>

                      {/* Quantity and Price */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mt-4 pt-4 border-t">
                        <div className="flex items-center gap-2 sm:gap-3">
                          <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">Quantity:</span>
                          <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 rounded-lg bg-muted">
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                              disabled={item.quantity <= 1}
                              className="text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50 disabled:cursor-not-allowed p-1"
                              aria-label="Decrease quantity"
                            >
                              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="font-semibold min-w-[2ch] text-center text-sm sm:text-base">{item.quantity}</span>
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="text-muted-foreground hover:text-foreground transition-colors p-1"
                              aria-label="Increase quantity"
                            >
                              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:block sm:text-right">
                          <p className="text-xs sm:text-sm text-muted-foreground">Subtotal</p>
                          <p className="text-lg sm:text-xl font-bold text-primary">
                            ₵{itemSubtotal.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                );
              })}

              {/* Clear Cart Button */}
              <button
                onClick={handleClear}
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
                  
                  {/* Promo Code Section */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Promo Code</label>
                    {promoCode ? (
                      <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
                        <div className="flex items-center gap-2">
                          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <p className="text-sm font-semibold text-green-700 dark:text-green-300">{promoCode.code}</p>
                            <p className="text-xs text-green-600 dark:text-green-400">{promoCode.discount_display}</p>
                          </div>
                        </div>
                        <button
                          onClick={async () => {
                            await removePromoCode();
                            toast({
                              title: "Promo code removed",
                              duration: 2000,
                            });
                          }}
                          className="text-red-600 hover:text-red-700 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                          placeholder="Enter code"
                          className="flex-1 px-3 py-2 rounded-lg border bg-background text-sm"
                          disabled={applyingPromo}
                        />
                        <button
                          onClick={async () => {
                            if (!promoInput.trim()) return;
                            setApplyingPromo(true);
                            const result = await applyPromoCode(promoInput.trim());
                            setApplyingPromo(false);
                            
                            if (result.success) {
                              setPromoInput("");
                              toast({
                                title: "Success!",
                                description: result.message,
                                duration: 3000,
                              });
                            } else {
                              toast({
                                title: "Invalid code",
                                description: result.message,
                                variant: "destructive",
                                duration: 3000,
                              });
                            }
                          }}
                          disabled={applyingPromo || !promoInput.trim()}
                          className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {applyingPromo ? "..." : "Apply"}
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-3 py-4 border-y">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">₵{subtotal.toFixed(2)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Discount</span>
                        <span className="font-medium text-green-600">-₵{discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-display text-lg font-semibold">Total</span>
                    <span className="font-display text-3xl font-bold text-primary">
                      ₵{total.toFixed(2)}
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
