from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    """Product category model"""
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    description = models.TextField(blank=True)
    
    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['name']
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Product(models.Model):
    """Main product model for fragrances"""
    PRODUCT_TYPE_CHOICES = [
        ('perfume', 'Perfume'),
        ('perfume_oil', 'Perfume Oil'),
        ('air_ambience', 'Air Ambience'),
    ]
    
    SCENT_FAMILY_CHOICES = [
        ('floral', 'Floral'),
        ('woody', 'Woody'),
        ('citrus', 'Citrus'),
        ('oriental', 'Oriental'),
        ('fresh', 'Fresh'),
        ('spicy', 'Spicy'),
    ]
    
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    
    # Product classification
    product_type = models.CharField(max_length=20, choices=PRODUCT_TYPE_CHOICES, default='perfume')
    scent_family = models.CharField(max_length=20, choices=SCENT_FAMILY_CHOICES, blank=True)
    
    # Fragrance details
    scent_notes = models.TextField(blank=True, help_text="Top, middle, and base notes")
    size_options = models.CharField(max_length=100, default='50ml', help_text="Available sizes (e.g., 50ml, 100ml)")
    
    # Inventory and status
    stock_quantity = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    is_new = models.BooleanField(default=False)
    is_best_seller = models.BooleanField(default=False)
    is_limited_edition = models.BooleanField(default=False)
    

    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    @property
    def tag(self):
        """Return display tag based on product status"""
        if self.is_limited_edition:
            return 'Limited Edition'
        elif self.is_new:
            return 'New'
        elif self.is_best_seller:
            return 'Best Seller'
        elif self.is_featured:
            return 'Featured'
        return None
    
    @property
    def primary_image(self):
        """Get the primary product image URL"""
        primary = self.images.filter(is_primary=True).first()
        if primary:
            return primary.url
        # Fallback to first image
        first_image = self.images.first()
        return first_image.url if first_image else None
    
    @property
    def average_rating(self):
        """Calculate average rating from reviews"""
        reviews = self.reviews.all()
        if reviews.exists():
            return round(sum(r.rating for r in reviews) / reviews.count(), 1)
        return 0
    
    @property
    def review_count(self):
        """Get total number of reviews"""
        return self.reviews.count()


class ProductImage(models.Model):
    """Multiple images for each product - supports both URL and file upload"""
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    
    # Option 1: URL-based image
    image_url = models.URLField(
        max_length=500,
        blank=True,
        help_text="URL of the product image (e.g., from CDN or external source)"
    )
    
    # Option 2: File upload (uses Cloudinary in production)
    image_file = models.ImageField(
        upload_to='products/',
        blank=True,
        null=True,
        help_text="Upload image from your computer"
    )
    
    alt_text = models.CharField(
        max_length=200, 
        blank=True,
        help_text="Alternative text for accessibility"
    )
    is_primary = models.BooleanField(default=False)
    order = models.PositiveIntegerField(default=0)
    
    class Meta:
        ordering = ['order', 'id']
    
    def __str__(self):
        return f"{self.product.name} - Image {self.id}"
    
    @property
    def url(self):
        """Return the image URL - prioritizes uploaded file over URL field"""
        if self.image_file:
            return self.image_file.url
        return self.image_url or 'https://via.placeholder.com/300x300?text=No+Image'
    
    def clean(self):
        from django.core.exceptions import ValidationError
        if not self.image_url and not self.image_file:
            raise ValidationError('Please provide either an image URL or upload an image file.')
