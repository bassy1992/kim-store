/**
 * API Client for Django Backend
 */

// Temporary CORS proxy solution while Railway is down
const USE_CORS_PROXY = true;
const RAILWAY_API_URL = import.meta.env.VITE_API_URL || 'https://kim-store-production.up.railway.app/api';
const CORS_PROXY_URL = '/api'; // Vercel serverless function proxy

const API_BASE_URL = USE_CORS_PROXY ? CORS_PROXY_URL : RAILWAY_API_URL;

// Types
export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price: number;
  category: {
    id: number;
    name: string;
    slug: string;
  };
  stock_quantity: number;
  primary_image?: string;
  tag?: string;
  average_rating?: number;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  size: string;
  subtotal: number;
}

export interface PromoCode {
  id: number;
  code: string;
  description: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  discount_display: string;
  minimum_order_amount: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
  promo_code?: PromoCode;
  subtotal: number;
  discount_amount: number;
  total: number;
  item_count: number;
}

export interface Order {
  id: number;
  order_number: string;
  email: string;
  full_name: string;
  shipping_address: string;
  phone: string;
  status: string;
  total_amount: number;
  items: Array<{
    id: number;
    product_name: string;
    product_price: number;
    quantity: number;
    size: string;
    subtotal: number;
  }>;
  created_at: string;
}

export interface Review {
  id: number;
  reviewer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  author_name: string;
  featured_image?: string;
  published_at: string;
}

export interface User {
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Helper function to get auth token
function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}

// Helper function to set auth token
export function setAuthToken(token: string) {
  localStorage.setItem('auth_token', token);
}

// Helper function to clear auth token
export function clearAuthToken() {
  localStorage.removeItem('auth_token');
}

// Generic fetch wrapper
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Token ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
}

// Products API
export const productsApi = {
  list: (params?: {
    category?: string;
    min_price?: number;
    max_price?: number;
    search?: string;
    sort_by?: string;
    featured?: boolean;
    page?: number;
  }) => {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, String(value));
        }
      });
    }
    const url = `/products/?${queryParams}`;
    console.log('🌐 API URL:', `${API_BASE_URL}${url}`);
    return apiFetch<{ results: Product[]; count: number; next: string | null; previous: string | null }>(
      url
    );
  },

  get: (slug: string) => apiFetch<Product>(`/products/${slug}/`),

  create: (data: Partial<Product>) =>
    apiFetch<Product>('/products/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (slug: string, data: Partial<Product>) =>
    apiFetch<Product>(`/products/${slug}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (slug: string) =>
    apiFetch<void>(`/products/${slug}/`, { method: 'DELETE' }),
};

// Categories API
export const categoriesApi = {
  list: () => apiFetch<Category[]>('/categories/'),
  get: (slug: string) => apiFetch<Category>(`/categories/${slug}/`),
};

// Cart API
export const cartApi = {
  get: () => apiFetch<Cart>('/cart/'),

  addItem: (productId: number, quantity: number = 1, size: string = '50ml') =>
    apiFetch<Cart>('/cart/items/', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId, quantity, size }),
    }),

  updateItem: (itemId: number, quantity: number) =>
    apiFetch<Cart>(`/cart/items/${itemId}/`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    }),

  removeItem: (itemId: number) =>
    apiFetch<Cart>(`/cart/items/${itemId}/`, { method: 'DELETE' }),

  clear: () => apiFetch<Cart>('/cart/clear/', { method: 'DELETE' }),

  applyPromoCode: (code: string) =>
    apiFetch<{ message: string; cart: Cart }>('/cart/apply-promo/', {
      method: 'POST',
      body: JSON.stringify({ code }),
    }),

  removePromoCode: () =>
    apiFetch<{ message: string; cart: Cart }>('/cart/remove-promo/', {
      method: 'POST',
    }),
};

// Orders API
export const ordersApi = {
  create: (data: {
    email: string;
    full_name: string;
    shipping_address: string;
    phone: string;
  }) =>
    apiFetch<Order>('/orders/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  list: () => apiFetch<{ results: Order[] }>('/orders/'),

  get: (orderNumber: string) => apiFetch<Order>(`/orders/${orderNumber}/`),
};

// Reviews API
export const reviewsApi = {
  list: (productId: number) =>
    apiFetch<Review[]>(`/products/${productId}/reviews/`),

  create: (productId: number, data: {
    reviewer_name: string;
    rating: number;
    comment: string;
  }) =>
    apiFetch<Review>(`/products/${productId}/reviews/`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  delete: (reviewId: number) =>
    apiFetch<void>(`/reviews/${reviewId}/`, { method: 'DELETE' }),
};

// Blog API
export const blogApi = {
  list: (page?: number) => {
    const params = page ? `?page=${page}` : '';
    return apiFetch<{ results: BlogPost[]; count: number; next: string | null; previous: string | null }>(
      `/blog/${params}`
    );
  },

  get: (slug: string) => apiFetch<BlogPost>(`/blog/${slug}/`),

  create: (data: Partial<BlogPost>) =>
    apiFetch<BlogPost>('/blog/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (slug: string, data: Partial<BlogPost>) =>
    apiFetch<BlogPost>(`/blog/${slug}/`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  delete: (slug: string) =>
    apiFetch<void>(`/blog/${slug}/`, { method: 'DELETE' }),
};

// Auth API
export const authApi = {
  register: (data: {
    username: string;
    email: string;
    password: string;
    password_confirm: string;
    first_name?: string;
    last_name?: string;
  }) =>
    apiFetch<AuthResponse>('/auth/register/', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (username: string, password: string) =>
    apiFetch<AuthResponse>('/auth/login/', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    }),

  logout: () =>
    apiFetch<{ message: string }>('/auth/logout/', { method: 'POST' }),

  getProfile: () =>
    apiFetch<{
      username: string;
      email: string;
      first_name?: string;
      last_name?: string;
      phone?: string;
      default_shipping_address?: string;
    }>('/auth/profile/'),

  updateProfile: (data: {
    first_name?: string;
    last_name?: string;
    phone?: string;
    default_shipping_address?: string;
  }) =>
    apiFetch<any>('/auth/profile/', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),
};
