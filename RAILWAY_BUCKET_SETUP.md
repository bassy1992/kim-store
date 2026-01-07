# Railway Bucket Setup for Media Uploads

This guide will help you set up Railway buckets for storing uploaded media files (product images, etc.).

## What Changed

Your Django app now supports **both** methods for product images:
1. **File Upload**: Upload images from your local PC (stored in Railway bucket)
2. **URL**: Provide external image URLs (existing functionality)

## Railway Bucket Setup Steps

### 1. Create a Railway Bucket

1. Go to your Railway project dashboard
2. Click on your backend service
3. Go to the **"Variables"** tab
4. Click **"+ New Variable"** and select **"Add Volume"** or look for **"Buckets"** option
5. Create a new bucket (Railway will provide S3-compatible storage)

### 2. Get Your Bucket Credentials

Railway will provide you with these credentials (check your service variables):
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_STORAGE_BUCKET_NAME`
- `AWS_S3_ENDPOINT_URL`
- `AWS_S3_REGION_NAME` (optional, defaults to us-east-1)

### 3. Add Environment Variables to Railway

In your Railway backend service, add these environment variables:

```bash
USE_S3=true
AWS_ACCESS_KEY_ID=your_access_key_here
AWS_SECRET_ACCESS_KEY=your_secret_key_here
AWS_STORAGE_BUCKET_NAME=your_bucket_name_here
AWS_S3_ENDPOINT_URL=https://your-bucket-endpoint.railway.app
AWS_S3_REGION_NAME=us-east-1
```

### 4. Deploy Updated Code

```bash
# Install new dependencies
pip install -r requirements.txt

# Run migrations
python back/manage.py migrate

# Deploy to Railway
git add .
git commit -m "Add Railway bucket support for media uploads"
git push
```

## How to Use

### In Django Admin

1. Go to **Products** → **Product Images**
2. You now have TWO options:

   **Option A: Upload File**
   - Click on the **"Image"** field
   - Select a file from your computer
   - The file will be uploaded to Railway bucket automatically

   **Option B: Use URL**
   - Leave **"Image"** field empty
   - Fill in the **"Image url"** field with an external URL
   - Example: `https://example.com/image.jpg`

3. You can mix both methods - some images uploaded, some from URLs

### Validation

- At least ONE of the two fields (image or image_url) must be provided
- If you provide both, the uploaded file takes priority
- The system automatically returns the correct URL in API responses

## API Response

The API will return the correct image URL regardless of the method used:

```json
{
  "id": 1,
  "image": "/media/products/image.jpg",  // If uploaded
  "image_url": "https://example.com/image.jpg",  // If URL provided
  "alt_text": "Product image",
  "is_primary": true,
  "order": 0
}
```

The `get_image_url` property automatically returns:
1. Uploaded file URL (if exists)
2. External URL (if provided)
3. Placeholder image (if neither exists)

## Local Development

For local development without Railway bucket:

1. Keep `USE_S3=false` in your `.env` file (or don't set it)
2. Uploaded files will be stored in `back/media/` folder
3. Make sure to add `media/` to your `.gitignore`

## Troubleshooting

### Images not uploading
- Check that `USE_S3=true` is set in Railway
- Verify all AWS credentials are correct
- Check Railway logs for S3 connection errors

### Images not displaying
- Verify bucket permissions are set to public-read
- Check CORS settings on the bucket
- Ensure `AWS_S3_ENDPOINT_URL` is correct

### Mixed content warnings
- Ensure `AWS_S3_ENDPOINT_URL` uses HTTPS
- Check that your frontend is also using HTTPS

## New Dependencies

Added to `requirements.txt`:
- `django-storages==1.14.2` - Django storage backends
- `boto3==1.34.34` - AWS SDK for Python (S3 compatible)

## Files Modified

1. `requirements.txt` - Added storage dependencies
2. `back/config/settings.py` - Added S3 configuration
3. `back/apps/products/models.py` - Updated ProductImage model
4. `back/apps/products/serializers.py` - Updated serializer
5. `back/apps/products/admin.py` - Updated admin interface

## Next Steps

1. Set up Railway bucket and get credentials
2. Add environment variables to Railway
3. Deploy the updated code
4. Test uploading an image in Django admin
5. Verify images display correctly on frontend
