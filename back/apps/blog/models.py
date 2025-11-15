from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify


class BlogPost(models.Model):
    """Blog articles"""
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    content = models.TextField()
    excerpt = models.TextField(blank=True, help_text="Short summary for list views")
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='blog_posts')
    featured_image_url = models.URLField(
        max_length=500,
        blank=True,
        help_text="URL of the blog post featured image"
    )
    is_published = models.BooleanField(default=False)
    published_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-published_at', '-created_at']
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
