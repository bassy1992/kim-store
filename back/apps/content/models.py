from django.db import models
from django.utils.text import slugify


class FAQ(models.Model):
    """Frequently Asked Questions"""
    question = models.CharField(max_length=300)
    answer = models.TextField()
    category = models.CharField(max_length=100, default='General', help_text="e.g., Shipping, Products, Returns")
    order = models.PositiveIntegerField(default=0, help_text="Display order (lower numbers first)")
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['order', 'category', 'id']
        verbose_name = 'FAQ'
        verbose_name_plural = 'FAQs'
    
    def __str__(self):
        return self.question


class Testimonial(models.Model):
    """Customer testimonials and reviews"""
    customer_name = models.CharField(max_length=100)
    rating = models.PositiveSmallIntegerField(default=5, help_text="Rating out of 5")
    comment = models.TextField()
    product_name = models.CharField(max_length=200, blank=True, help_text="Optional: specific product reviewed")
    is_featured = models.BooleanField(default=False, help_text="Show on homepage")
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-is_featured', '-created_at']
    
    def __str__(self):
        return f"{self.customer_name} - {self.rating}/5"


class GalleryImage(models.Model):
    """Gallery photos for the gallery page"""
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    
    # Option 1: URL-based image
    image_url = models.URLField(
        max_length=500,
        blank=True,
        help_text="URL of the gallery image (e.g., from CDN or external source)"
    )
    
    # Option 2: File upload
    image_file = models.ImageField(
        upload_to='gallery/',
        blank=True,
        null=True,
        help_text="Upload image from your computer"
    )
    
    category = models.CharField(max_length=100, default='General', help_text="e.g., Products, Events, Behind the Scenes")
    order = models.PositiveIntegerField(default=0)
    is_published = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', '-created_at']
    
    def __str__(self):
        return self.title
    
    @property
    def url(self):
        """Return the image URL - prioritizes uploaded file over URL field"""
        if self.image_file:
            return self.image_file.url
        return self.image_url or 'https://via.placeholder.com/400x300?text=Gallery+Image'
    
    def clean(self):
        from django.core.exceptions import ValidationError
        if not self.image_url and not self.image_file:
            raise ValidationError('Please provide either an image URL or upload an image file.')


class ShippingInfo(models.Model):
    """Shipping policies and information"""
    title = models.CharField(max_length=200, default="Shipping Information")
    content = models.TextField(help_text="Full shipping policy content (supports HTML)")
    free_shipping_threshold = models.DecimalField(max_digits=10, decimal_places=2, default=250.00, help_text="Minimum order for free shipping")
    standard_delivery_days = models.CharField(max_length=50, default="3-5 business days")
    express_delivery_days = models.CharField(max_length=50, default="1-2 business days", blank=True)
    international_shipping = models.BooleanField(default=False)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Shipping Information'
        verbose_name_plural = 'Shipping Information'
    
    def __str__(self):
        return self.title


class ReturnPolicy(models.Model):
    """Return and refund policies"""
    title = models.CharField(max_length=200, default="Return Policy")
    content = models.TextField(help_text="Full return policy content (supports HTML)")
    return_window_days = models.PositiveIntegerField(default=30, help_text="Number of days for returns")
    refund_processing_days = models.CharField(max_length=50, default="5-7 business days")
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Return Policy'
        verbose_name_plural = 'Return Policies'
    
    def __str__(self):
        return self.title


class TermsAndConditions(models.Model):
    """Terms of service"""
    title = models.CharField(max_length=200, default="Terms and Conditions")
    content = models.TextField(help_text="Full terms and conditions (supports HTML)")
    effective_date = models.DateField()
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Terms and Conditions'
        verbose_name_plural = 'Terms and Conditions'
    
    def __str__(self):
        return f"{self.title} (Effective: {self.effective_date})"


class PrivacyPolicy(models.Model):
    """Privacy policy"""
    title = models.CharField(max_length=200, default="Privacy Policy")
    content = models.TextField(help_text="Full privacy policy (supports HTML)")
    effective_date = models.DateField()
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Privacy Policy'
        verbose_name_plural = 'Privacy Policies'
    
    def __str__(self):
        return f"{self.title} (Effective: {self.effective_date})"


class GiftCard(models.Model):
    """Gift card products"""
    name = models.CharField(max_length=200, default="Gift Card")
    description = models.TextField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Option 1: URL-based image
    image_url = models.URLField(
        max_length=500,
        blank=True,
        help_text="URL of the gift card image (e.g., from CDN or external source)"
    )
    
    # Option 2: File upload
    image_file = models.ImageField(
        upload_to='giftcards/',
        blank=True,
        null=True,
        help_text="Upload image from your computer"
    )
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['amount']
    
    def __str__(self):
        return f"{self.name} - GHS {self.amount}"
    
    @property
    def url(self):
        """Return the image URL - prioritizes uploaded file over URL field"""
        if self.image_file:
            return self.image_file.url
        return self.image_url or 'https://via.placeholder.com/300x300?text=Gift+Card'


class ContactMessage(models.Model):
    """Contact form submissions"""
    SUBJECT_CHOICES = [
        ('general', 'General Inquiry'),
        ('wholesale', 'Wholesale'),
        ('press', 'Press'),
        ('product', 'Product Question'),
        ('order', 'Order Support'),
    ]
    
    name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=50, choices=SUBJECT_CHOICES, default='general')
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    is_replied = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} - {self.subject} ({self.created_at.strftime('%Y-%m-%d')})"


class Newsletter(models.Model):
    """Newsletter subscriptions"""
    email = models.EmailField(unique=True)
    is_active = models.BooleanField(default=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    unsubscribed_at = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-subscribed_at']
    
    def __str__(self):
        status = "Active" if self.is_active else "Unsubscribed"
        return f"{self.email} ({status})"


class DupeProduct(models.Model):
    """Designer fragrance alternatives (dupes)"""
    name = models.CharField(max_length=200, help_text="Our dupe product name")
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Original designer fragrance info
    designer_brand = models.CharField(max_length=100, help_text="e.g., Chanel, Dior")
    designer_fragrance = models.CharField(max_length=200, help_text="e.g., Coco Mademoiselle")
    designer_price = models.DecimalField(max_digits=10, decimal_places=2, help_text="Original designer price")
    
    # Designer fragrance image - Option 1: URL-based
    designer_image_url = models.URLField(
        max_length=500,
        blank=True,
        help_text="URL of the designer fragrance image (e.g., from CDN or external source)"
    )
    
    # Designer fragrance image - Option 2: File upload
    designer_image_file = models.ImageField(
        upload_to='designer_fragrances/',
        blank=True,
        null=True,
        help_text="Upload designer fragrance image from your computer"
    )
    
    # Comparison details
    similarity_percentage = models.PositiveSmallIntegerField(default=90, help_text="Similarity to original (0-100%)")
    scent_notes = models.TextField(help_text="Top, middle, and base notes")
    longevity = models.CharField(max_length=100, default="6-8 hours")
    
    # Option 1: URL-based image
    image_url = models.URLField(
        max_length=500,
        blank=True,
        help_text="URL of the dupe product image (e.g., from CDN or external source)"
    )
    
    # Option 2: File upload
    image_file = models.ImageField(
        upload_to='dupes/',
        blank=True,
        null=True,
        help_text="Upload image from your computer"
    )
    
    stock_quantity = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-is_featured', '-created_at']
    
    def __str__(self):
        return f"{self.name} (Dupe of {self.designer_brand} {self.designer_fragrance})"
    
    @property
    def url(self):
        """Return the image URL - prioritizes uploaded file over URL field"""
        if self.image_file:
            return self.image_file.url
        return self.image_url or 'https://via.placeholder.com/300x300?text=Dupe+Product'
    
    @property
    def designer_image(self):
        """Return the designer fragrance image URL - prioritizes uploaded file over URL field"""
        if self.designer_image_file:
            return self.designer_image_file.url
        return self.designer_image_url or 'https://via.placeholder.com/300x300?text=Designer+Fragrance'
        return self.image_url or 'https://via.placeholder.com/300x300?text=Dupe+Product'
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def get_savings(self):
        """Calculate savings compared to designer fragrance"""
        return self.designer_price - self.price
    
    def get_savings_percentage(self):
        """Calculate savings percentage"""
        if self.designer_price > 0:
            return round((self.get_savings() / self.designer_price) * 100, 1)
        return 0


class AirAmbience(models.Model):
    """Air care and ambience products"""
    PRODUCT_TYPE_CHOICES = [
        ('humidifier', 'Humidifier'),
        ('diffuser', 'Diffuser'),
        ('essential_oil', 'Essential Oil'),
        ('room_spray', 'Room Spray'),
        ('car_freshener', 'Car Freshener'),
        ('candle', 'Scented Candle'),
    ]
    
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    product_type = models.CharField(max_length=20, choices=PRODUCT_TYPE_CHOICES)
    
    # Product details
    scent_notes = models.TextField(blank=True, help_text="Fragrance notes and description")
    size_options = models.CharField(max_length=100, default='50ml', help_text="Available sizes")
    usage_instructions = models.TextField(blank=True, help_text="How to use the product")
    
    # Features
    features = models.TextField(blank=True, help_text="Key features and benefits")
    coverage_area = models.CharField(max_length=100, blank=True, help_text="e.g., Up to 500 sq ft")
    duration = models.CharField(max_length=100, blank=True, help_text="e.g., Lasts 30 days")
    
    # Option 1: URL-based image
    image_url = models.URLField(
        max_length=500,
        blank=True,
        help_text="URL of the air ambience product image (e.g., from CDN or external source)"
    )
    
    # Option 2: File upload
    image_file = models.ImageField(
        upload_to='air_ambience/',
        blank=True,
        null=True,
        help_text="Upload image from your computer"
    )
    
    stock_quantity = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-is_featured', '-created_at']
        verbose_name = 'Air Ambience Product'
        verbose_name_plural = 'Air Ambience Products'
    
    def __str__(self):
        return f"{self.name} ({self.get_product_type_display()})"
    
    @property
    def url(self):
        """Return the image URL - prioritizes uploaded file over URL field"""
        if self.image_file:
            return self.image_file.url
        return self.image_url or 'https://via.placeholder.com/300x300?text=Air+Ambience'
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class PerfumeOil(models.Model):
    """Perfume oil products"""
    CONCENTRATION_CHOICES = [
        ('pure_oil', 'Pure Oil'),
        ('oil_blend', 'Oil Blend'),
        ('concentrated', 'Concentrated'),
    ]
    
    LONGEVITY_CHOICES = [
        ('4-8 hours', '4-8 hours'),
        ('8-12 hours', '8-12 hours'),
        ('12-16 hours', '12-16 hours'),
        ('16-24 hours', '16-24 hours'),
        ('24+ hours', '24+ hours'),
    ]
    
    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    
    # Oil-specific details
    concentration = models.CharField(max_length=20, choices=CONCENTRATION_CHOICES, default='pure_oil')
    size_options = models.CharField(max_length=100, default='10ml', help_text="Available sizes (e.g., 10ml, 15ml)")
    longevity = models.CharField(max_length=20, choices=LONGEVITY_CHOICES, default='8-12 hours')
    
    # Fragrance details
    top_notes = models.CharField(max_length=200, blank=True, help_text="Top notes (comma separated)")
    middle_notes = models.CharField(max_length=200, blank=True, help_text="Middle notes (comma separated)")
    base_notes = models.CharField(max_length=200, blank=True, help_text="Base notes (comma separated)")
    scent_family = models.CharField(max_length=100, blank=True, help_text="e.g., Woody, Floral, Oriental")
    
    # Application and care
    application_tips = models.TextField(blank=True, help_text="How to apply and use")
    ingredients = models.TextField(blank=True, help_text="Key ingredients and benefits")
    
    # Option 1: URL-based image
    image_url = models.URLField(
        max_length=500,
        blank=True,
        help_text="URL of the perfume oil image (e.g., from CDN or external source)"
    )
    
    # Option 2: File upload
    image_file = models.ImageField(
        upload_to='perfume_oils/',
        blank=True,
        null=True,
        help_text="Upload image from your computer"
    )
    
    stock_quantity = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    is_custom_blend = models.BooleanField(default=False, help_text="Available for custom blending")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-is_featured', '-created_at']
        verbose_name = 'Perfume Oil'
        verbose_name_plural = 'Perfume Oils'
    
    def __str__(self):
        return f"{self.name} ({self.get_concentration_display()})"
    
    @property
    def url(self):
        """Return the image URL - prioritizes uploaded file over URL field"""
        if self.image_file:
            return self.image_file.url
        return self.image_url or 'https://via.placeholder.com/300x300?text=Perfume+Oil'
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)
    
    def get_all_notes(self):
        """Get all fragrance notes as a list"""
        notes = []
        if self.top_notes:
            notes.extend([note.strip() for note in self.top_notes.split(',')])
        if self.middle_notes:
            notes.extend([note.strip() for note in self.middle_notes.split(',')])
        if self.base_notes:
            notes.extend([note.strip() for note in self.base_notes.split(',')])
        return notes