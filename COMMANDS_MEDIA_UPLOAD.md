# Quick Commands - Media Upload Setup

## Local Development Setup

```bash
# 1. Install dependencies
pip install -r requirements.txt

# 2. Run migrations
python back/manage.py migrate

# 3. Create superuser (if not exists)
python back/manage.py createsuperuser

# 4. Run development server
python back/manage.py runserver

# 5. Access admin
# Open: http://localhost:8000/admin
```

## Railway Deployment

```bash
# 1. Commit changes
git add .
git commit -m "Add Railway bucket support for media uploads"

# 2. Push to Railway (auto-deploys)
git push

# 3. Run migrations on Railway
railway run python back/manage.py migrate

# Or use Railway CLI
railway shell
python back/manage.py migrate
exit
```

## Testing Commands

### Test File Upload (curl)
```bash
# Get admin token first
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "your-password"}'

# Upload image
curl -X POST http://localhost:8000/api/products/product-slug/images/ \
  -H "Authorization: Token YOUR_TOKEN" \
  -F "image=@test-image.jpg" \
  -F "alt_text=Test image"
```

### Test URL Method (curl)
```bash
curl -X POST http://localhost:8000/api/products/product-slug/images/ \
  -H "Authorization: Token YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "image_url": "https://via.placeholder.com/300",
    "alt_text": "Test image"
  }'
```

### List Product Images
```bash
curl http://localhost:8000/api/products/product-slug/images/list/
```

## Railway Bucket Setup

```bash
# 1. Install Railway CLI (if not installed)
npm install -g @railway/cli

# 2. Login to Railway
railway login

# 3. Link to your project
railway link

# 4. Add environment variables
railway variables set USE_S3=true
railway variables set AWS_ACCESS_KEY_ID=your-key
railway variables set AWS_SECRET_ACCESS_KEY=your-secret
railway variables set AWS_STORAGE_BUCKET_NAME=your-bucket
railway variables set AWS_S3_ENDPOINT_URL=your-endpoint

# 5. Restart service
railway restart
```

## Useful Django Commands

```bash
# Check migrations
python back/manage.py showmigrations

# Create new migration
python back/manage.py makemigrations

# Apply migrations
python back/manage.py migrate

# Rollback migration
python back/manage.py migrate products 0007

# Check for issues
python back/manage.py check

# Collect static files
python back/manage.py collectstatic --noinput

# Create superuser
python back/manage.py createsuperuser

# Django shell
python back/manage.py shell
```

## Python Shell Testing

```python
# Start Django shell
python back/manage.py shell

# Test image upload
from apps.products.models import Product, ProductImage
from django.core.files.uploadedfile import SimpleUploadedFile

# Get a product
product = Product.objects.first()

# Create image with URL
img1 = ProductImage.objects.create(
    product=product,
    image_url='https://via.placeholder.com/300',
    alt_text='Test image from URL'
)

# Test get_image_url property
print(img1.get_image_url)

# Create image with file (example)
# with open('test.jpg', 'rb') as f:
#     img2 = ProductImage.objects.create(
#         product=product,
#         image=SimpleUploadedFile('test.jpg', f.read()),
#         alt_text='Test uploaded image'
#     )
```

## Troubleshooting Commands

```bash
# Check Python version
python --version

# Check installed packages
pip list

# Check Django version
python -c "import django; print(django.get_version())"

# Check if storages is installed
python -c "import storages; print('storages installed')"

# Check if boto3 is installed
python -c "import boto3; print('boto3 installed')"

# View Railway logs
railway logs

# Check Railway environment variables
railway variables

# Test Railway connection
railway run python back/manage.py check
```

## Git Commands

```bash
# Check status
git status

# View changes
git diff

# Add all changes
git add .

# Commit with message
git commit -m "Add media upload functionality"

# Push to Railway
git push

# View commit history
git log --oneline

# Create new branch
git checkout -b feature/media-upload

# Switch back to main
git checkout main
```

## Environment Setup

### Create .env file (local development)
```bash
# Windows
copy back\.env.example back\.env

# Linux/Mac
cp back/.env.example back/.env

# Edit the file
notepad back\.env  # Windows
nano back/.env     # Linux/Mac
```

### Example .env content
```bash
DEBUG=True
SECRET_KEY=your-secret-key-here
USE_S3=false

# For Railway (production)
# USE_S3=true
# AWS_ACCESS_KEY_ID=your-key
# AWS_SECRET_ACCESS_KEY=your-secret
# AWS_STORAGE_BUCKET_NAME=your-bucket
# AWS_S3_ENDPOINT_URL=https://your-endpoint
```

## Quick Test Workflow

```bash
# 1. Install and migrate
pip install -r requirements.txt
python back/manage.py migrate

# 2. Start server
python back/manage.py runserver

# 3. In another terminal, test API
curl http://localhost:8000/api/products/

# 4. Test admin
# Open browser: http://localhost:8000/admin

# 5. Upload test image in admin
# Products → Product Images → Add

# 6. Verify in API
curl http://localhost:8000/api/products/product-slug/
```

## Production Checklist

```bash
# Before deploying to Railway:
- [ ] Update requirements.txt
- [ ] Create and test migrations locally
- [ ] Set DEBUG=False in production
- [ ] Configure Railway bucket
- [ ] Add all environment variables
- [ ] Test file upload locally
- [ ] Commit and push changes
- [ ] Run migrations on Railway
- [ ] Test upload on production
- [ ] Verify images display correctly
```
