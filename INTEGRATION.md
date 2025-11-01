# Frontend-Backend Integration Guide

This guide explains how to run both the Django backend and React frontend together.

## Quick Start

### 1. Start the Backend (Django)

```bash
# Navigate to backend directory
cd back

# Activate virtual environment (if not already activated)
# Windows: venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

# Run the development server
python manage.py runserver
```

The backend API will be available at `http://localhost:8000/`

### 2. Start the Frontend (React)

Open a new terminal:

```bash
# Navigate to frontend directory
cd front

# Install dependencies (first time only)
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:5173/`

## API Configuration

The frontend is configured to connect to the backend via environment variables.

**Frontend Configuration** (`front/.env`):
```env
VITE_API_URL=http://localhost:8000/api
```

**Backend Configuration** (`back/.env`):
```env
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

## API Integration

The frontend uses a centralized API client located at `front/client/lib/api.ts` that provides:

### Products API
- `productsApi.list()` - Get all products with filtering
- `productsApi.get(slug)` - Get single product
- `productsApi.create()` - Create product (admin)
- `productsApi.update()` - Update product (admin)
- `productsApi.delete()` - Delete product (admin)

### Cart API
- `cartApi.get()` - Get current cart
- `cartApi.addItem()` - Add item to cart
- `cartApi.updateItem()` - Update cart item
- `cartApi.removeItem()` - Remove cart item
- `cartApi.clear()` - Clear cart

### Orders API
- `ordersApi.create()` - Create order
- `ordersApi.list()` - List user orders
- `ordersApi.get()` - Get order details

### Auth API
- `authApi.register()` - Register new user
- `authApi.login()` - Login user
- `authApi.logout()` - Logout user
- `authApi.getProfile()` - Get user profile
- `authApi.updateProfile()` - Update profile

### Reviews API
- `reviewsApi.list()` - Get product reviews
- `reviewsApi.create()` - Create review
- `reviewsApi.delete()` - Delete review (admin)

### Blog API
- `blogApi.list()` - Get blog posts
- `blogApi.get()` - Get single post
- `blogApi.create()` - Create post (admin)
- `blogApi.update()` - Update post (admin)
- `blogApi.delete()` - Delete post (admin)

## Example Usage

### Fetching Products

```typescript
import { useQuery } from '@tanstack/react-query';
import { productsApi } from '@/lib/api';

function ProductList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: () => productsApi.list({ category: 'floral' }),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data?.results.map(product => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### Adding to Cart

```typescript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { cartApi } from '@/lib/api';

function AddToCartButton({ productId }: { productId: number }) {
  const queryClient = useQueryClient();
  
  const addToCart = useMutation({
    mutationFn: (quantity: number) => cartApi.addItem(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  return (
    <button onClick={() => addToCart.mutate(1)}>
      Add to Cart
    </button>
  );
}
```

### Authentication

```typescript
import { authApi, setAuthToken } from '@/lib/api';

async function login(username: string, password: string) {
  try {
    const response = await authApi.login(username, password);
    setAuthToken(response.token);
    // Redirect to dashboard or home
  } catch (error) {
    console.error('Login failed:', error);
  }
}
```

## Testing the Integration

1. **Start both servers** (backend on :8000, frontend on :5173)

2. **Load seed data** in the backend:
   ```bash
   cd back
   python manage.py seed_data
   ```

3. **Visit the frontend** at `http://localhost:5173/shop`

4. **Verify the connection**:
   - Products should load from the backend
   - You should see 8 sample products
   - Filtering and sorting should work
   - Cart operations should persist

## API Documentation

Interactive API documentation is available at:
- Swagger UI: `http://localhost:8000/api/docs/`
- ReDoc: `http://localhost:8000/api/redoc/`

## Troubleshooting

### CORS Errors

If you see CORS errors in the browser console:

1. Check that the backend `.env` has the correct frontend URL:
   ```env
   CORS_ALLOWED_ORIGINS=http://localhost:5173
   ```

2. Restart the Django server after changing `.env`

### Connection Refused

If the frontend can't connect to the backend:

1. Verify the backend is running: `http://localhost:8000/api/products/`
2. Check the frontend `.env` has the correct API URL
3. Restart the frontend dev server

### Authentication Issues

If authentication isn't working:

1. Check that the token is being stored: `localStorage.getItem('auth_token')`
2. Verify the token is being sent in requests (check Network tab)
3. Make sure the backend has `rest_framework.authtoken` in `INSTALLED_APPS`

## Production Deployment

For production deployment:

1. **Backend**:
   - Set `DEBUG=False`
   - Use PostgreSQL instead of SQLite
   - Configure proper CORS origins
   - Use gunicorn or similar WSGI server
   - Set up HTTPS

2. **Frontend**:
   - Update `VITE_API_URL` to production backend URL
   - Build the frontend: `npm run build`
   - Serve the `dist` folder with a web server

3. **Both**:
   - Use environment-specific configuration
   - Set up proper logging and monitoring
   - Configure CDN for static assets
   - Implement rate limiting and security measures

## Next Steps

- Implement authentication UI (login/register pages)
- Connect cart context to backend API
- Add product detail page with reviews
- Implement checkout flow
- Add user profile page
- Implement admin dashboard
