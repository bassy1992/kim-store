import { createContext, useContext, useState, useEffect, useCallback } from "react";

// Direct connection to Railway - CORS is configured on backend
const USE_CORS_PROXY = false; // Disabled - using direct connection
const RAILWAY_API_URL = import.meta.env.VITE_API_URL || 'https://web-production-46fa5.up.railway.app/api';
const CORS_PROXY_URL = '/api'; // Vercel serverless function proxy (not used)

const API_BASE_URL = USE_CORS_PROXY ? CORS_PROXY_URL : RAILWAY_API_URL;

console.log('🛒 Cart API Configuration:', {
  USE_CORS_PROXY,
  API_BASE_URL,
  environment: import.meta.env.MODE
});

// Developer utility: Add to window for easy cart debugging
if (typeof window !== 'undefined') {
  (window as any).clearCartData = () => {
    localStorage.removeItem('cartId');
    sessionStorage.removeItem('cartId');
    console.log('✅ Cart data cleared! Refresh the page to see changes.');
  };
  console.log('💡 Dev tip: Run window.clearCartData() to clear cart storage');
}

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  productId?: number;
  dupeId?: number;
  airAmbienceId?: number;
  perfumeOilId?: number;
  size?: string;
  slug?: string; // Product slug for routing
};

type CartContextType = {
  items: CartItem[];
  promoCode?: PromoCode;
  subtotal: number;
  discountAmount: number;
  total: number;
  add: (item: Omit<CartItem, "quantity">, quantity?: number) => Promise<void>;
  updateQuantity: (id: string, quantity: number) => Promise<void>;
  remove: (id: string) => Promise<void>;
  clear: () => Promise<void>;
  applyPromoCode: (code: string) => Promise<{ success: boolean; message: string }>;
  removePromoCode: () => Promise<void>;
  loading: boolean;
  refreshCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState<PromoCode | undefined>();
  const [subtotal, setSubtotal] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch cart from Django backend
  const refreshCart = useCallback(async () => {
    try {
      // Get cart ID from localStorage
      const cartId = localStorage.getItem('cartId');
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (cartId) {
        headers['X-Cart-ID'] = cartId;
      }
      
      console.log('Fetching cart from:', `${API_BASE_URL}/cart/`, 'with cart ID:', cartId);
      const response = await fetch(`${API_BASE_URL}/cart/`, {
        headers,
      });
      
      console.log('Cart fetch response status:', response.status);
      
      // Store cart ID from response
      const responseCartId = response.headers.get('X-Cart-ID');
      if (responseCartId) {
        localStorage.setItem('cartId', responseCartId);
        console.log('Stored cart ID:', responseCartId);
      }
      
      if (response.ok) {
        const data = await response.json();
        console.log('Cart data received:', data);
        
        // Transform Django cart items to match our CartItem type
        const transformedItems: CartItem[] = (data.items || []).map((item: any) => ({
          id: String(item.id),
          name: item.product.name,
          price: parseFloat(item.product.price),
          image: item.product.primary_image || item.product.image || '/placeholder.jpg',
          quantity: item.quantity,
          productId: item.product.id,
          slug: item.product.slug, // Add slug for routing
          size: item.size,
        }));
        
        setItems(transformedItems);
        setPromoCode(data.promo_code);
        setSubtotal(parseFloat(data.subtotal || 0));
        setDiscountAmount(parseFloat(data.discount_amount || 0));
        setTotal(parseFloat(data.total || 0));
        console.log('Cart updated with items:', transformedItems.length);
      } else if (response.status === 404) {
        // Cart not found - clear localStorage and reset state
        console.warn('Cart not found, clearing localStorage');
        localStorage.removeItem('cartId');
        setItems([]);
        setPromoCode(undefined);
        setSubtotal(0);
        setDiscountAmount(0);
        setTotal(0);
      } else {
        console.error('Failed to fetch cart, status:', response.status);
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  }, []);

  // Load cart on mount
  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  // Add item to cart
  const add = async (item: Omit<CartItem, "quantity">, quantity: number = 1) => {
    setLoading(true);
    try {
      console.log('Adding to cart:', { item, quantity });

      // Get cart ID from localStorage
      const cartId = localStorage.getItem('cartId');
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (cartId) {
        headers['X-Cart-ID'] = cartId;
      }

      // Build request body - support product_id, dupe_id, air_ambience_id, and perfume_oil_id
      const requestBody: any = {
        quantity,
        size: item.size || '50ml',
      };

      if (item.airAmbienceId) {
        // Adding an air ambience product
        requestBody.air_ambience_id = item.airAmbienceId;
        console.log('Adding air ambience to cart:', { air_ambience_id: item.airAmbienceId, quantity });
      } else if (item.perfumeOilId) {
        // Adding a perfume oil product
        requestBody.perfume_oil_id = item.perfumeOilId;
        console.log('Adding perfume oil to cart:', { perfume_oil_id: item.perfumeOilId, quantity });
      } else if (item.dupeId) {
        // Adding a dupe product
        requestBody.dupe_id = item.dupeId;
        console.log('Adding dupe to cart:', { dupe_id: item.dupeId, quantity });
      } else if (item.productId) {
        // Adding a regular product
        requestBody.product_id = item.productId;
        console.log('Adding product to cart:', { product_id: item.productId, quantity });
      } else {
        // Try to parse the string ID to number
        const parsedId = parseInt(item.id, 10);
        if (isNaN(parsedId) || parsedId <= 0) {
          console.error('Invalid product ID:', item.id, 'Item:', item);
          throw new Error(`Invalid product ID: ${item.id}`);
        }
        requestBody.product_id = parsedId;
        console.log('Adding product to cart (parsed):', { product_id: parsedId, quantity });
      }

      const response = await fetch(`${API_BASE_URL}/cart/items/`, {
        method: 'POST',
        headers,
        body: JSON.stringify(requestBody),
      });
      
      // Store cart ID from response
      const responseCartId = response.headers.get('X-Cart-ID');
      if (responseCartId) {
        localStorage.setItem('cartId', responseCartId);
        console.log('Stored cart ID after add:', responseCartId);
      }

      if (response.ok) {
        console.log('✅ Successfully added to cart');
        const cartData = await response.json();
        
        // Optimistic update - update state directly instead of refetching
        const transformedItems: CartItem[] = (cartData.items || []).map((item: any) => ({
          id: String(item.id),
          name: item.product.name,
          price: parseFloat(item.product.price),
          image: item.product.primary_image || item.product.image || '/placeholder.jpg',
          quantity: item.quantity,
          productId: item.product.id,
          slug: item.product.slug,
          size: item.size,
        }));
        
        setItems(transformedItems);
        setPromoCode(cartData.promo_code);
        setSubtotal(parseFloat(cartData.subtotal || 0));
        setDiscountAmount(parseFloat(cartData.discount_amount || 0));
        setTotal(parseFloat(cartData.total || 0));
        
        console.log(`🎉 Added ${item.name} to cart!`);
      } else {
        const error = await response.json().catch(() => ({ error: 'Unknown server error' }));
        console.error('❌ Failed to add to cart:', error);
        console.error('Response status:', response.status);
        console.error('Request body was:', requestBody);
        throw new Error(error.error || error.detail || `Server error: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert(error instanceof Error ? error.message : 'Failed to add item to cart');
    } finally {
      setLoading(false);
    }
  };

  // Update item quantity
  const updateQuantity = async (id: string, quantity: number) => {
    // Optimistic update - update UI immediately
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
    
    // Recalculate totals optimistically
    const newSubtotal = items.reduce((sum, item) => {
      const qty = item.id === id ? quantity : item.quantity;
      return sum + (item.price * qty);
    }, 0);
    setSubtotal(newSubtotal);
    setTotal(newSubtotal - discountAmount);
    
    setLoading(true);
    try {
      const cartId = localStorage.getItem('cartId');
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (cartId) {
        headers['X-Cart-ID'] = cartId;
      }

      const response = await fetch(`${API_BASE_URL}/cart/items/${id}/`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ quantity }),
      });

      if (response.ok) {
        // Optimistic update - use response data instead of refetching
        const cartData = await response.json();
        const transformedItems: CartItem[] = (cartData.items || []).map((item: any) => ({
          id: String(item.id),
          name: item.product.name,
          price: parseFloat(item.product.price),
          image: item.product.primary_image || item.product.image || '/placeholder.jpg',
          quantity: item.quantity,
          productId: item.product.id,
          slug: item.product.slug,
          size: item.size,
        }));
        
        setItems(transformedItems);
        setPromoCode(cartData.promo_code);
        setSubtotal(parseFloat(cartData.subtotal || 0));
        setDiscountAmount(parseFloat(cartData.discount_amount || 0));
        setTotal(parseFloat(cartData.total || 0));
      } else if (response.status === 404) {
        // Item not found - cart might be stale, refresh it
        console.warn('Cart item not found, refreshing cart...');
        await refreshCart();
      } else {
        const error = await response.json().catch(() => ({ error: 'Failed to update quantity' }));
        console.error('Failed to update quantity:', error);
        throw new Error(error.error || error.detail || 'Failed to update quantity');
      }
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const remove = async (id: string) => {
    setLoading(true);
    try {
      const cartId = localStorage.getItem('cartId');
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (cartId) {
        headers['X-Cart-ID'] = cartId;
      }

      const response = await fetch(`${API_BASE_URL}/cart/items/${id}/`, {
        method: 'DELETE',
        headers,
      });

      if (response.ok) {
        // Optimistic update - use response data instead of refetching
        const cartData = await response.json();
        const transformedItems: CartItem[] = (cartData.items || []).map((item: any) => ({
          id: String(item.id),
          name: item.product.name,
          price: parseFloat(item.product.price),
          image: item.product.primary_image || item.product.image || '/placeholder.jpg',
          quantity: item.quantity,
          productId: item.product.id,
          slug: item.product.slug,
          size: item.size,
        }));
        
        setItems(transformedItems);
        setPromoCode(cartData.promo_code);
        setSubtotal(parseFloat(cartData.subtotal || 0));
        setDiscountAmount(parseFloat(cartData.discount_amount || 0));
        setTotal(parseFloat(cartData.total || 0));
      } else if (response.status === 404) {
        // Item not found - cart might be stale, refresh it
        console.warn('Cart item not found, refreshing cart...');
        await refreshCart();
      }
    } catch (error) {
      console.error('Failed to remove from cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Clear cart
  const clear = async () => {
    // Optimistic update - clear immediately for instant feedback
    setItems([]);
    setPromoCode(undefined);
    setSubtotal(0);
    setDiscountAmount(0);
    setTotal(0);
    
    setLoading(true);
    try {
      const cartId = localStorage.getItem('cartId');
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (cartId) {
        headers['X-Cart-ID'] = cartId;
      }

      const response = await fetch(`${API_BASE_URL}/cart/clear/`, {
        method: 'DELETE',
        headers,
      });

      if (!response.ok) {
        // If failed, refresh to get actual state
        await refreshCart();
      } else {
        // Clear localStorage cart ID when cart is cleared
        localStorage.removeItem('cartId');
      }
    } catch (error) {
      console.error('Failed to clear cart:', error);
      // Refresh on error to get actual state
      await refreshCart();
    } finally {
      setLoading(false);
    }
  };

  // Apply promo code
  const applyPromoCode = async (code: string): Promise<{ success: boolean; message: string }> => {
    setLoading(true);
    try {
      const cartId = localStorage.getItem('cartId');
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (cartId) {
        headers['X-Cart-ID'] = cartId;
      }
      
      const response = await fetch(`${API_BASE_URL}/cart/apply-promo/`, {
        method: 'POST',
        headers,
        body: JSON.stringify({ code: code.trim().toUpperCase() }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update cart with new data
        const cartData = data.cart;
        const transformedItems: CartItem[] = (cartData.items || []).map((item: any) => ({
          id: String(item.id),
          name: item.product.name,
          price: parseFloat(item.product.price),
          image: item.product.primary_image || item.product.image || '/placeholder.jpg',
          quantity: item.quantity,
          productId: item.product.id,
          slug: item.product.slug, // Add slug for routing
          size: item.size,
        }));
        
        setItems(transformedItems);
        setPromoCode(cartData.promo_code);
        setSubtotal(parseFloat(cartData.subtotal || 0));
        setDiscountAmount(parseFloat(cartData.discount_amount || 0));
        setTotal(parseFloat(cartData.total || 0));

        return { success: true, message: data.message };
      } else {
        return { success: false, message: data.error || 'Failed to apply promo code' };
      }
    } catch (error) {
      console.error('Failed to apply promo code:', error);
      return { success: false, message: 'Network error. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  // Remove promo code
  const removePromoCode = async () => {
    setLoading(true);
    try {
      const cartId = localStorage.getItem('cartId');
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      
      if (cartId) {
        headers['X-Cart-ID'] = cartId;
      }
      
      const response = await fetch(`${API_BASE_URL}/cart/remove-promo/`, {
        method: 'POST',
        headers,
      });

      if (response.ok) {
        await refreshCart();
      }
    } catch (error) {
      console.error('Failed to remove promo code:', error);
    } finally {
      setLoading(false);
    }
  };

  const value: CartContextType = {
    items,
    promoCode,
    subtotal,
    discountAmount,
    total,
    add,
    updateQuantity,
    remove,
    clear,
    applyPromoCode,
    removePromoCode,
    loading,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
