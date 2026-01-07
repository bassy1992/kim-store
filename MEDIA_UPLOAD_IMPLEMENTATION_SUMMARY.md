# Media Upload Implementation Summary

## What Was Done

Your Django backend now supports **dual-mode image handling** for product images:
1. ✅ **File Upload** - Upload images from local PC (stored in Railway S3 bucket)
2. ✅ **URL Method** - Use external image URLs (existing functionality preserved)

## Files Modified

### 1. Dependencies (`requirements.txt`)
- Added `django-storages==1.14.2` - Django storage backends for S3
- Added `boto3==1.34.34` - AWS SDK for S3-compatible storage

### 2. Django Settings (`back/config/settings.py`)
- Added `storages` to `INSTALLED_APPS`
- Added S3 configuration with Railway bucket support
- Configured `USE_S3` environment variable toggle
- Set up AWS credentials configuration
- Maintained backward compatibility for local development

### 3. Product Model (`back/apps/products/models.py`)
**ProductImage model changes:**
- Added `image` field (ImageField) for file uploads
- Kept `image_url` field for external URLs
- Made both fields optional (but at least one required)
- Added `get_image_url` property to return correct URL
- Added validation in `clean()` method
- Updated `Product.primary_image` to use new property

### 4. Serializers (`back/apps/products/serializers.py`)
**ProductImageSerializer changes:**
- Added `image` field support
- Made `image_url` a SerializerMethodField
- Updated to use `get_image_url` property
- Maintained API backward compatibility

### 5. Admin Interface (`back/apps/products/admin.py`)
**ProductImageInline and ProductImageAdmin changes:**
- Added `image` field to admin forms
- Updated image preview to use `get_image_url`
- Now shows preview for both uploaded files and URLs
- Supports both upload methods in inline forms

### 6. API Views (`back/apps/products/views.py`)
**New endpoints added:**
- `POST /api/products/{slug}/images/` - Upload or add image
- `GET /api/products/{slug}/images/list/` - List all product images
- Added MultiPartParser for file upload support
- Admin-only permissions for image uploads

### 7. Database Migration
- Created migration `0008_remove_category_category_slug_idx_and_more.py`
- Adds `image` field to ProductImage model
- Modifies `image_url` field constraints

## New Features

### Django Admin
- Upload images directly from file picker
- Or paste external URLs
- Mix both methods for different images
- Real-time image preview
- Validation ensures at least one source provided

### API Endpoints
- File upload via multipart/form-data
- URL submission via JSON
- List all images for a product
- Images included in product detail response
- Admin authentication required for uploads

### Storage Configuration
- **Production (Railway)**: Files stored in S3 bucket
- **Development**: Files stored in local `media/` folder
- Automatic URL generation based on storage backend
- Public read access for uploaded files

## Environment Variables

### Required for Railway (Production)
```bash
USE_S3=true
AWS_ACCESS_KEY_ID=<from Railway bucket>
AWS_SECRET_ACCESS_KEY=<from Railway bucket>
AWS_STORAGE_BUCKET_NAME=<from Railway bucket>
AWS_S3_ENDPOINT_URL=<from Railway bucket>
AWS_S3_REGION_NAME=us-east-1  # optional
```

### Local Development
```bash
USE_S3=false  # or omit entirely
```

## How It Works

### Upload Flow
1. Admin uploads file via Django admin or API
2. If `USE_S3=true`: File uploaded to Railway bucket
3. If `USE_S3=false`: File saved to local `media/` folder
4. Database stores file path (for uploads) or URL (for external)
5. `get_image_url` property returns correct URL for frontend

### URL Priority
1. If `image` field has file → return file URL
2. Else if `image_url` has value → return URL
3. Else → return placeholder image

### Validation
- At least one of `image` or `image_url` must be provided
- Validation happens in model's `clean()` method
- Enforced on save in both admin and API

## API Usage Examples

### Upload File
```bash
curl -X POST \
  http://localhost:8000/api/products/product-slug/images/ \
  -H "Authorization: Token YOUR_TOKEN" \
  -F "image=@image.jpg" \
  -F "alt_text=Product image"
```

### Add URL
```bash
curl -X POST \
  http://localhost:8000/api/products/product-slug/images/ \
  -H "Authorization: Token YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"image_url": "https://example.com/image.jpg"}'
```

## Testing Checklist

- [x] Dependencies added to requirements.txt
- [x] Settings configured for S3
- [x] Model updated with image field
- [x] Migration created
- [x] Serializer updated
- [x] Admin interface updated
- [x] API endpoints created
- [ ] Run migration: `python back/manage.py migrate`
- [ ] Install dependencies: `pip install -r requirements.txt`
- [ ] Configure Railway bucket credentials
- [ ] Test upload in Django admin
- [ ] Test API upload endpoint
- [ ] Verify images display on frontend

## Next Steps

### Immediate (Required)
1. Install dependencies: `pip install -r requirements.txt`
2. Run migration: `python back/manage.py migrate`
3. Set up Railway bucket (see RAILWAY_BUCKET_SETUP.md)
4. Add environment variables to Railway
5. Deploy to Railway

### Optional (Frontend)
1. Create upload component in frontend
2. Add drag-and-drop functionality
3. Add image preview before upload
4. Add progress indicator
5. Implement image cropping/resizing

## Documentation Created

1. **RAILWAY_BUCKET_SETUP.md** - Complete Railway bucket setup guide
2. **MEDIA_UPLOAD_QUICK_START.md** - Quick start guide for developers
3. **API_IMAGE_UPLOAD.md** - Detailed API documentation with examples
4. **back/.env.example** - Environment variables template
5. **MEDIA_UPLOAD_IMPLEMENTATION_SUMMARY.md** - This file

## Backward Compatibility

✅ **Fully backward compatible!**
- Existing products with URL-only images work unchanged
- API responses maintain same structure
- Frontend code doesn't need immediate changes
- Can gradually migrate to file uploads

## Support

Need help with:
- Railway bucket setup?
- Frontend upload component?
- Image optimization?
- Bulk upload functionality?

Just ask! 🚀
