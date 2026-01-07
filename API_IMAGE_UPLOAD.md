# Product Image Upload API Documentation

## Overview

The API now supports uploading product images via two methods:
1. **File Upload**: Upload image files from local storage
2. **URL**: Provide external image URLs

## Endpoints

### 1. Upload/Add Product Image

**Endpoint:** `POST /api/products/{slug}/images/`

**Authentication:** Admin only (Token or Session)

**Content-Type:** 
- `multipart/form-data` (for file uploads)
- `application/json` (for URLs)

#### Method A: File Upload

```bash
curl -X POST \
  http://localhost:8000/api/products/product-slug/images/ \
  -H "Authorization: Token YOUR_ADMIN_TOKEN" \
  -F "image=@/path/to/image.jpg" \
  -F "alt_text=Product image" \
  -F "is_primary=true" \
  -F "order=0"
```

**JavaScript Example:**

```javascript
const formData = new FormData();
formData.append('image', fileInput.files[0]);
formData.append('alt_text', 'Product image');
formData.append('is_primary', true);
formData.append('order', 0);

fetch('http://localhost:8000/api/products/product-slug/images/', {
  method: 'POST',
  headers: {
    'Authorization': 'Token YOUR_ADMIN_TOKEN'
  },
  body: formData
})
.then(response => response.json())
.then(data => console.log(data));
```

**React Example:**

```jsx
const handleImageUpload = async (file, productSlug) => {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('alt_text', 'Product image');
  formData.append('is_primary', true);
  
  try {
    const response = await fetch(
      `${API_URL}/api/products/${productSlug}/images/`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Token ${adminToken}`
        },
        body: formData
      }
    );
    
    const data = await response.json();
    console.log('Image uploaded:', data);
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

#### Method B: URL

```bash
curl -X POST \
  http://localhost:8000/api/products/product-slug/images/ \
  -H "Authorization: Token YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "image_url": "https://example.com/image.jpg",
    "alt_text": "Product image",
    "is_primary": true,
    "order": 0
  }'
```

**JavaScript Example:**

```javascript
fetch('http://localhost:8000/api/products/product-slug/images/', {
  method: 'POST',
  headers: {
    'Authorization': 'Token YOUR_ADMIN_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    image_url: 'https://example.com/image.jpg',
    alt_text: 'Product image',
    is_primary: true,
    order: 0
  })
})
.then(response => response.json())
.then(data => console.log(data));
```

#### Request Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `image` | File | No* | Image file to upload |
| `image_url` | String | No* | External image URL |
| `alt_text` | String | No | Alternative text for accessibility |
| `is_primary` | Boolean | No | Set as primary product image (default: false) |
| `order` | Integer | No | Display order (default: 0) |

*At least one of `image` or `image_url` is required.

#### Response

**Success (201 Created):**

```json
{
  "id": 1,
  "image": "/media/products/image_abc123.jpg",
  "image_url": "https://your-bucket.railway.app/products/image_abc123.jpg",
  "alt_text": "Product image",
  "is_primary": true,
  "order": 0
}
```

**Error (400 Bad Request):**

```json
{
  "non_field_errors": [
    "Either upload an image file or provide an image URL."
  ]
}
```

### 2. List Product Images

**Endpoint:** `GET /api/products/{slug}/images/list/`

**Authentication:** Public (no auth required)

```bash
curl http://localhost:8000/api/products/product-slug/images/list/
```

**Response:**

```json
[
  {
    "id": 1,
    "image": "/media/products/image1.jpg",
    "image_url": "https://your-bucket.railway.app/products/image1.jpg",
    "alt_text": "Front view",
    "is_primary": true,
    "order": 0
  },
  {
    "id": 2,
    "image": null,
    "image_url": "https://example.com/external-image.jpg",
    "alt_text": "Side view",
    "is_primary": false,
    "order": 1
  }
]
```

### 3. Get Product Details (includes images)

**Endpoint:** `GET /api/products/{slug}/`

**Authentication:** Public

```bash
curl http://localhost:8000/api/products/product-slug/
```

**Response includes images array:**

```json
{
  "id": 1,
  "name": "Product Name",
  "slug": "product-slug",
  "images": [
    {
      "id": 1,
      "image": "/media/products/image1.jpg",
      "image_url": "https://your-bucket.railway.app/products/image1.jpg",
      "alt_text": "Product image",
      "is_primary": true,
      "order": 0
    }
  ],
  "primary_image": "https://your-bucket.railway.app/products/image1.jpg",
  // ... other product fields
}
```

## Frontend Integration Examples

### React Component with File Upload

```jsx
import React, { useState } from 'react';

const ProductImageUpload = ({ productSlug, onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image', file);
    formData.append('alt_text', file.name);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/products/${productSlug}/images/`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Token ${localStorage.getItem('adminToken')}`
          },
          body: formData
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      onUploadSuccess(data);
      setFile(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange}
        disabled={uploading}
      />
      <button 
        onClick={handleUpload}
        disabled={!file || uploading}
      >
        {uploading ? 'Uploading...' : 'Upload Image'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ProductImageUpload;
```

### Vue Component with Drag & Drop

```vue
<template>
  <div 
    class="upload-area"
    @drop.prevent="handleDrop"
    @dragover.prevent
  >
    <input 
      type="file" 
      ref="fileInput"
      @change="handleFileSelect"
      accept="image/*"
      style="display: none"
    />
    
    <button @click="$refs.fileInput.click()">
      Choose File
    </button>
    
    <p>or drag and drop here</p>
    
    <div v-if="uploading">Uploading...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script>
export default {
  props: ['productSlug'],
  data() {
    return {
      uploading: false,
      error: null
    };
  },
  methods: {
    handleDrop(e) {
      const file = e.dataTransfer.files[0];
      if (file) this.uploadFile(file);
    },
    
    handleFileSelect(e) {
      const file = e.target.files[0];
      if (file) this.uploadFile(file);
    },
    
    async uploadFile(file) {
      this.uploading = true;
      this.error = null;
      
      const formData = new FormData();
      formData.append('image', file);
      formData.append('alt_text', file.name);
      
      try {
        const response = await fetch(
          `${process.env.VUE_APP_API_URL}/api/products/${this.productSlug}/images/`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Token ${localStorage.getItem('adminToken')}`
            },
            body: formData
          }
        );
        
        if (!response.ok) throw new Error('Upload failed');
        
        const data = await response.json();
        this.$emit('upload-success', data);
      } catch (err) {
        this.error = err.message;
      } finally {
        this.uploading = false;
      }
    }
  }
};
</script>
```

## Testing

### Test File Upload (with curl)

```bash
# Create a test image
curl -o test-image.jpg https://via.placeholder.com/300

# Upload it
curl -X POST \
  http://localhost:8000/api/products/your-product-slug/images/ \
  -H "Authorization: Token YOUR_TOKEN" \
  -F "image=@test-image.jpg" \
  -F "alt_text=Test image"
```

### Test URL Method

```bash
curl -X POST \
  http://localhost:8000/api/products/your-product-slug/images/ \
  -H "Authorization: Token YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "image_url": "https://via.placeholder.com/300",
    "alt_text": "Test image from URL"
  }'
```

## Error Handling

| Status Code | Description |
|-------------|-------------|
| 201 | Image created successfully |
| 400 | Bad request (validation error) |
| 401 | Unauthorized (no token or invalid token) |
| 403 | Forbidden (not admin) |
| 404 | Product not found |
| 413 | File too large |
| 415 | Unsupported media type |

## File Size Limits

- Maximum file size: 10MB (configurable in Django settings)
- Supported formats: JPG, JPEG, PNG, GIF, WebP
- Recommended size: 1000x1000px or smaller

## Security Notes

1. Only admin users can upload images
2. Files are validated for type and size
3. Uploaded files are stored securely in Railway bucket
4. URLs are validated before saving
5. CORS is configured for frontend access

## Next Steps

1. Implement frontend upload component
2. Add image preview before upload
3. Add progress indicator for large files
4. Implement image cropping/resizing
5. Add bulk upload functionality
