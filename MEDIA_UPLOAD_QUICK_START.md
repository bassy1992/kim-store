# Media Upload Quick Start Guide

## Overview

Your app now supports **dual-mode image handling**:
- ✅ Upload files from your PC (Railway bucket storage)
- ✅ Use external URLs (existing method)

## Quick Setup (3 Steps)

### Step 1: Install Dependencies

```bash
pip install -r requirements.txt
```

### Step 2: Run Migration

```bash
python back/manage.py migrate
```

### Step 3: Configure Railway (Production Only)

Add these variables in Railway dashboard:

```
USE_S3=true
AWS_ACCESS_KEY_ID=<from Railway bucket>
AWS_SECRET_ACCESS_KEY=<from Railway bucket>
AWS_STORAGE_BUCKET_NAME=<from Railway bucket>
AWS_S3_ENDPOINT_URL=<from Railway bucket>
```

## Usage Examples

### Django Admin

**Upload from PC:**
1. Go to Products → Add Product Image
2. Select file in "Image" field
3. Fill other fields (alt text, order, etc.)
4. Save

**Use External URL:**
1. Go to Products → Add Product Image
2. Leave "Image" field empty
3. Fill "Image url" field: `https://example.com/image.jpg`
4. Save

### API (Coming Soon)

You can also upload via API endpoints:

```python
# POST /api/products/{id}/images/
# Content-Type: multipart/form-data

{
  "image": <file>,
  "alt_text": "Product image",
  "is_primary": true,
  "order": 0
}
```

Or use URL:

```python
# POST /api/products/{id}/images/
# Content-Type: application/json

{
  "image_url": "https://example.com/image.jpg",
  "alt_text": "Product image",
  "is_primary": true,
  "order": 0
}
```

## Local Development

For local testing without Railway:

1. Don't set `USE_S3` (or set to `false`)
2. Files save to `back/media/` folder
3. Access at `http://localhost:8000/media/products/image.jpg`

## Model Changes

**ProductImage model now has:**

```python
class ProductImage(models.Model):
    image = models.ImageField(upload_to='products/', blank=True, null=True)
    image_url = models.URLField(blank=True)
    # ... other fields
    
    @property
    def get_image_url(self):
        # Returns uploaded file URL or external URL
        if self.image:
            return self.image.url
        elif self.image_url:
            return self.image_url
        return 'placeholder.jpg'
```

## Validation Rules

- ✅ At least ONE field required (image OR image_url)
- ✅ Both fields can be provided (image takes priority)
- ❌ Both fields empty = validation error

## Testing Checklist

- [ ] Install dependencies
- [ ] Run migrations
- [ ] Upload test image in admin
- [ ] Add test URL in admin
- [ ] Verify images display on frontend
- [ ] Check Railway bucket (production)
- [ ] Test API endpoints (if implemented)

## Troubleshooting

**"No module named 'storages'"**
→ Run `pip install -r requirements.txt`

**"Either upload an image file or provide an image URL"**
→ You must provide at least one image source

**Images not uploading to Railway**
→ Check `USE_S3=true` and verify all AWS credentials

**Images not displaying**
→ Check bucket permissions and CORS settings

## What's Next?

1. ✅ Models updated
2. ✅ Admin interface ready
3. ⏳ API endpoints (optional - let me know if needed)
4. ⏳ Frontend upload component (optional)

Need help with API endpoints or frontend integration? Just ask!
