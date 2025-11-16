import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { initializePaystackPayment, generatePaymentReference } from "@/lib/paystack";

export default function Checkout() {
  const { items, promoCode, subtotal, discountAmount, total, clear, applyPromoCode, removePromoCode } = useCart();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
  // Promo code state
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [promoLoading, setPromoLoading] = useState(false);
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const shipping = 0; // Free shipping
  const tax = subtotal * 0.1;
  const finalTotal = subtotal - discountAmount + shipping + tax;

  const handlePayRedirect = async () => {
    setError(null);
    setLoading(true);
    
    try {
      // Initialize Paystack payment
      const paystackData = {
        email,
        amount: Math.round(finalTotal * 100), // Convert to pesewas (smallest currency unit)
        currency: "GHS",
        metadata: {
          full_name: name,
          phone: phone || 'N/A',
          shipping_address: `${address}, ${city}${postalCode ? ', ' + postalCode : ''}`,
          cart_items: items.map(item => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price
          }))
        },
        callback_url: `${window.location.origin}/success`
      };

      console.log('Initializing Paystack payment with data:', paystackData);

      // Use Django backend API
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const res = await fetch(`${API_BASE_URL}/paystack/initialize/`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paystackData),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ message: 'Failed to initialize payment' }));
        throw new Error(errorData.error || errorData.message || 'Failed to initialize payment');
      }

      const paystackResponse = await res.json();
      
      // Redirect to Paystack payment page
      if (paystackResponse.data && paystackResponse.data.authorization_url) {
        window.location.href = paystackResponse.data.authorization_url;
      } else {
        throw new Error('Invalid payment initialization response');
      }
      
    } catch (err: any) {
      console.error('Payment initialization error:', err);
      setError(err.message || 'Failed to initialize payment. Please try again.');
    } finally {
      setLoading(false);
    }
  };



  const handleApplyPromoCode = async () => {
    if (!promoCodeInput.trim()) {
      setPromoMessage({ type: 'error', text: 'Please enter a promo code' });
      return;
    }

    setPromoLoading(true);
    setPromoMessage(null);

    const result = await applyPromoCode(promoCodeInput);
    
    if (result.success) {
      setPromoMessage({ type: 'success', text: result.message });
      setPromoCodeInput("");
    } else {
      setPromoMessage({ type: 'error', text: result.message });
    }
    
    setPromoLoading(false);
  };

  const handleRemovePromoCode = async () => {
    setPromoLoading(true);
    await removePromoCode();
    setPromoMessage(null);
    setPromoLoading(false);
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!email) return setError("Please provide an email.");
    if (!name) return setError("Please provide your name.");
    if (!address) return setError("Please provide your address.");
    if (!city) return setError("Please provide your city.");
    
    // Check if cart has items
    if (items.length === 0) {
      return setError("Your cart is empty. Please add items before checking out.");
    }
    
    await handlePayRedirect();
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-background/50 backdrop-blur-sm">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold">Secure Checkout</h1>
              <p className="text-muted-foreground mt-1">Complete your purchase securely</p>
            </div>
            <Link to="/cart" className="text-primary hover:underline flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Cart
            </Link>
          </div>
        </div>
      </div>

      <div className="container py-8 md:py-12">
        {items.length === 0 ? (
          /* Empty Cart State */
          <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
            <div className="w-32 h-32 rounded-full bg-muted flex items-center justify-center mb-6">
              <svg className="w-16 h-16 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="font-display text-3xl font-bold mb-3">Your cart is empty</h2>
            <p className="text-muted-foreground text-lg mb-8">Add some items before checking out</p>
            <Button size="lg" asChild className="rounded-xl px-8">
              <Link to="/shop">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Progress Steps */}
              <div className="bg-card rounded-2xl border p-6">
                <div className="flex items-center justify-between">
                  {[
                    { num: 1, label: "Information", icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" },
                    { num: 2, label: "Shipping", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
                    { num: 3, label: "Payment", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" }
                  ].map((s, i) => (
                    <div key={s.num} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          step >= s.num 
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {step > s.num ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
                            </svg>
                          )}
                        </div>
                        <span className={`text-xs mt-2 font-medium ${step >= s.num ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {s.label}
                        </span>
                      </div>
                      {i < 2 && (
                        <div className={`h-0.5 flex-1 mx-2 transition-all ${step > s.num ? 'bg-primary' : 'bg-muted'}`} />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handlePay} className="space-y-6">
                {/* Contact Information */}
                <div className="bg-card rounded-2xl border p-6 space-y-4 animate-fade-in">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <h2 className="font-display text-xl font-bold">Contact Information</h2>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Full Name *</label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Address *</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                      placeholder="+233 XX XXX XXXX"
                    />
                  </div>
                </div>

                {/* Shipping Address */}
                <div className="bg-card rounded-2xl border p-6 space-y-4 animate-fade-in" style={{animationDelay: "100ms"}}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h2 className="font-display text-xl font-bold">Shipping Address</h2>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Street Address *</label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                      placeholder="123 Main Street"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">City *</label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                        placeholder="Accra"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Postal Code</label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border-2 bg-background focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                        placeholder="00233"
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div className="bg-card rounded-2xl border p-6 space-y-4 animate-fade-in" style={{animationDelay: "200ms"}}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <h2 className="font-display text-xl font-bold">Payment Method</h2>
                  </div>

                  <div className="p-4 rounded-xl bg-primary/5 border-2 border-primary/20">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
                        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                          <rect width="24" height="24" rx="4" fill="#00C3F7"/>
                          <path d="M7 12h10M7 8h10M7 16h6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold">Paystack</p>
                        <p className="text-sm text-muted-foreground">Secure payment gateway</p>
                      </div>
                      <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-start gap-3">
                      <svg className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-destructive">{error}</p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={loading}
                    className="w-full rounded-xl text-lg py-6 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                  >
                    {loading ? (
                      <>
                        <svg className="w-5 h-5 mr-2 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Pay GHS {finalTotal.toFixed(2)}
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground">
                    🔒 Your payment information is secure and encrypted
                  </p>
                </div>
              </form>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-card rounded-2xl border p-6 space-y-4">
                  <h2 className="font-display text-xl font-bold">Order Summary</h2>

                  {/* Items */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold">
                            {item.quantity}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm line-clamp-2">{item.name}</p>
                          <p className="text-sm text-muted-foreground">GHS {item.price.toFixed(2)}</p>
                        </div>
                        <p className="font-semibold text-sm">GHS {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Promo Code Section */}
                  <div className="pt-4 border-t">
                    <h3 className="font-semibold text-sm mb-3">Promo Code</h3>
                    
                    {promoCode ? (
                      <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-green-800">{promoCode.code}</div>
                            <div className="text-sm text-green-600">{promoCode.description}</div>
                          </div>
                          <button
                            onClick={handleRemovePromoCode}
                            disabled={promoLoading}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={promoCodeInput}
                            onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                            placeholder="Enter promo code"
                            className="flex-1 px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                            disabled={promoLoading}
                          />
                          <button
                            onClick={handleApplyPromoCode}
                            disabled={promoLoading || !promoCodeInput.trim()}
                            className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {promoLoading ? 'Applying...' : 'Apply'}
                          </button>
                        </div>
                        
                        {promoMessage && (
                          <div className={`text-sm p-2 rounded ${
                            promoMessage.type === 'success' 
                              ? 'bg-green-50 text-green-700 border border-green-200' 
                              : 'bg-red-50 text-red-700 border border-red-200'
                          }`}>
                            {promoMessage.text}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Totals */}
                  <div className="space-y-3 pt-4 border-t">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">GHS {subtotal.toFixed(2)}</span>
                    </div>
                    
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-green-600">Discount ({promoCode?.code})</span>
                        <span className="font-medium text-green-600">-GHS {discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (10%)</span>
                      <span className="font-medium">GHS {tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t">
                      <span className="font-display text-lg font-semibold">Total</span>
                      <span className="font-display text-2xl font-bold text-primary">GHS {finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="bg-muted/50 rounded-2xl border p-6 space-y-3">
                  <h3 className="font-semibold text-sm">Why shop with us?</h3>
                  {[
                    { icon: "🔒", text: "Secure SSL Encryption" },
                    { icon: "✓", text: "100% Authentic Products" },
                    { icon: "🚚", text: "Fast & Free Delivery" },
                    { icon: "↩️", text: "30-Day Returns" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-muted-foreground">{item.text}</span>
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
