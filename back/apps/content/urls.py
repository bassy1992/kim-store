from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    FAQViewSet, TestimonialViewSet, GalleryImageViewSet,
    ShippingInfoViewSet, ReturnPolicyViewSet, TermsAndConditionsViewSet,
    PrivacyPolicyViewSet, GiftCardViewSet, ContactMessageViewSet,
    NewsletterViewSet, DupeProductViewSet, AirAmbienceViewSet, PerfumeOilViewSet
)

router = DefaultRouter()
router.register(r'faqs', FAQViewSet, basename='faq')
router.register(r'testimonials', TestimonialViewSet, basename='testimonial')
router.register(r'gallery', GalleryImageViewSet, basename='gallery')
router.register(r'shipping-info', ShippingInfoViewSet, basename='shipping-info')
router.register(r'return-policy', ReturnPolicyViewSet, basename='return-policy')
router.register(r'terms', TermsAndConditionsViewSet, basename='terms')
router.register(r'privacy', PrivacyPolicyViewSet, basename='privacy')
router.register(r'gift-cards', GiftCardViewSet, basename='gift-card')
router.register(r'contact', ContactMessageViewSet, basename='contact')
router.register(r'newsletter', NewsletterViewSet, basename='newsletter')
router.register(r'dupes', DupeProductViewSet, basename='dupe')
router.register(r'air-ambience', AirAmbienceViewSet, basename='air-ambience')
router.register(r'perfume-oils', PerfumeOilViewSet, basename='perfume-oil')

urlpatterns = [
    path('', include(router.urls)),
]
