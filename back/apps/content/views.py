from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from django.utils import timezone
from django.db import models
from .models import (
    FAQ, Testimonial, GalleryImage, ShippingInfo, ReturnPolicy,
    TermsAndConditions, PrivacyPolicy, GiftCard, ContactMessage,
    Newsletter, DupeProduct, AirAmbience, PerfumeOil
)
from .serializers import (
    FAQSerializer, TestimonialSerializer, GalleryImageSerializer,
    ShippingInfoSerializer, ReturnPolicySerializer, TermsAndConditionsSerializer,
    PrivacyPolicySerializer, GiftCardSerializer, ContactMessageSerializer,
    NewsletterSerializer, DupeProductListSerializer, DupeProductDetailSerializer,
    AirAmbienceListSerializer, AirAmbienceDetailSerializer,
    PerfumeOilListSerializer, PerfumeOilDetailSerializer
)


class FAQViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for FAQs - Read only for public
    """
    queryset = FAQ.objects.filter(is_published=True)
    serializer_class = FAQSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        """Filter by category if provided"""
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__iexact=category)
        return queryset


class TestimonialViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Testimonials - Read only for public
    """
    queryset = Testimonial.objects.filter(is_published=True)
    serializer_class = TestimonialSerializer
    permission_classes = [AllowAny]
    
    @action(detail=False, methods=['get'])
    def featured(self, request):
        """Get featured testimonials for homepage"""
        testimonials = self.queryset.filter(is_featured=True)[:4]
        serializer = self.get_serializer(testimonials, many=True)
        return Response(serializer.data)


class GalleryImageViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Gallery Images - Read only for public
    """
    queryset = GalleryImage.objects.filter(is_published=True)
    serializer_class = GalleryImageSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        """Filter by category if provided"""
        queryset = super().get_queryset()
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__iexact=category)
        return queryset


class ShippingInfoViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Shipping Information - Read only for public
    """
    queryset = ShippingInfo.objects.all()
    serializer_class = ShippingInfoSerializer
    permission_classes = [AllowAny]
    
    @action(detail=False, methods=['get'])
    def latest(self, request):
        """Get the latest shipping information"""
        shipping_info = self.queryset.first()
        if shipping_info:
            serializer = self.get_serializer(shipping_info)
            return Response(serializer.data)
        return Response({'detail': 'No shipping information available'}, status=status.HTTP_404_NOT_FOUND)


class ReturnPolicyViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Return Policy - Read only for public
    """
    queryset = ReturnPolicy.objects.all()
    serializer_class = ReturnPolicySerializer
    permission_classes = [AllowAny]
    
    @action(detail=False, methods=['get'])
    def latest(self, request):
        """Get the latest return policy"""
        policy = self.queryset.first()
        if policy:
            serializer = self.get_serializer(policy)
            return Response(serializer.data)
        return Response({'detail': 'No return policy available'}, status=status.HTTP_404_NOT_FOUND)


class TermsAndConditionsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Terms and Conditions - Read only for public
    """
    queryset = TermsAndConditions.objects.all().order_by('-effective_date')
    serializer_class = TermsAndConditionsSerializer
    permission_classes = [AllowAny]
    
    @action(detail=False, methods=['get'])
    def latest(self, request):
        """Get the latest terms and conditions"""
        terms = self.queryset.first()
        if terms:
            serializer = self.get_serializer(terms)
            return Response(serializer.data)
        return Response({'detail': 'No terms and conditions available'}, status=status.HTTP_404_NOT_FOUND)


class PrivacyPolicyViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Privacy Policy - Read only for public
    """
    queryset = PrivacyPolicy.objects.all().order_by('-effective_date')
    serializer_class = PrivacyPolicySerializer
    permission_classes = [AllowAny]
    
    @action(detail=False, methods=['get'])
    def latest(self, request):
        """Get the latest privacy policy"""
        policy = self.queryset.first()
        if policy:
            serializer = self.get_serializer(policy)
            return Response(serializer.data)
        return Response({'detail': 'No privacy policy available'}, status=status.HTTP_404_NOT_FOUND)


class GiftCardViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Gift Cards - Read only for public
    """
    queryset = GiftCard.objects.filter(is_active=True)
    serializer_class = GiftCardSerializer
    permission_classes = [AllowAny]


class ContactMessageViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Contact Messages
    - Create: Public (anyone can submit)
    - List/Retrieve/Update/Delete: Admin only
    """
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    
    def get_permissions(self):
        """Allow anyone to create, admin only for other actions"""
        if self.action == 'create':
            return [AllowAny()]
        return [IsAdminUser()]
    
    def create(self, request, *args, **kwargs):
        """Create a new contact message"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {'detail': 'Message sent successfully. We will get back to you soon!'},
            status=status.HTTP_201_CREATED
        )


class NewsletterViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Newsletter Subscriptions
    - Subscribe: Public (anyone can subscribe)
    - List/Retrieve/Update/Delete: Admin only
    """
    queryset = Newsletter.objects.all()
    serializer_class = NewsletterSerializer
    
    def get_permissions(self):
        """Allow anyone to subscribe, admin only for other actions"""
        if self.action in ['create', 'subscribe']:
            return [AllowAny()]
        return [IsAdminUser()]
    
    @action(detail=False, methods=['post'])
    def subscribe(self, request):
        """Subscribe to newsletter"""
        email = request.data.get('email')
        if not email:
            return Response(
                {'detail': 'Email is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if already subscribed
        newsletter, created = Newsletter.objects.get_or_create(
            email=email,
            defaults={'is_active': True}
        )
        
        if not created:
            if newsletter.is_active:
                return Response(
                    {'detail': 'You are already subscribed to our newsletter'},
                    status=status.HTTP_200_OK
                )
            else:
                # Reactivate subscription
                newsletter.is_active = True
                newsletter.unsubscribed_at = None
                newsletter.save()
                return Response(
                    {'detail': 'Welcome back! Your subscription has been reactivated'},
                    status=status.HTTP_200_OK
                )
        
        return Response(
            {'detail': 'Successfully subscribed to newsletter!'},
            status=status.HTTP_201_CREATED
        )
    
    @action(detail=False, methods=['post'])
    def unsubscribe(self, request):
        """Unsubscribe from newsletter"""
        email = request.data.get('email')
        if not email:
            return Response(
                {'detail': 'Email is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            newsletter = Newsletter.objects.get(email=email)
            newsletter.is_active = False
            newsletter.unsubscribed_at = timezone.now()
            newsletter.save()
            return Response(
                {'detail': 'Successfully unsubscribed from newsletter'},
                status=status.HTTP_200_OK
            )
        except Newsletter.DoesNotExist:
            return Response(
                {'detail': 'Email not found in our newsletter list'},
                status=status.HTTP_404_NOT_FOUND
            )


class DupeProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Dupe Products - Read only for public
    """
    queryset = DupeProduct.objects.filter(is_active=True)
    lookup_field = 'slug'
    permission_classes = [AllowAny]
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'list':
            return DupeProductListSerializer
        return DupeProductDetailSerializer
    
    def get_queryset(self):
        """Filter and search dupes"""
        queryset = super().get_queryset()
        
        # Search by designer brand or fragrance
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                models.Q(name__icontains=search) |
                models.Q(designer_brand__icontains=search) |
                models.Q(designer_fragrance__icontains=search)
            )
        
        # Filter by designer brand
        brand = self.request.query_params.get('brand')
        if brand:
            queryset = queryset.filter(designer_brand__iexact=brand)
        
        # Filter featured
        featured = self.request.query_params.get('featured')
        if featured and featured.lower() in ['true', '1', 'yes']:
            queryset = queryset.filter(is_featured=True)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def brands(self, request):
        """Get list of all designer brands"""
        brands = self.queryset.values_list('designer_brand', flat=True).distinct().order_by('designer_brand')
        return Response(list(brands))


class AirAmbienceViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Air Ambience Products - Read only for public
    """
    queryset = AirAmbience.objects.filter(is_active=True)
    lookup_field = 'slug'
    permission_classes = [AllowAny]
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'list':
            return AirAmbienceListSerializer
        return AirAmbienceDetailSerializer
    
    def get_queryset(self):
        """Filter and search air ambience products"""
        queryset = super().get_queryset()
        
        # Search by name or description
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                models.Q(name__icontains=search) |
                models.Q(description__icontains=search) |
                models.Q(scent_notes__icontains=search)
            )
        
        # Filter by product type
        product_type = self.request.query_params.get('type')
        if product_type:
            queryset = queryset.filter(product_type=product_type)
        
        # Filter featured
        featured = self.request.query_params.get('featured')
        if featured and featured.lower() in ['true', '1', 'yes']:
            queryset = queryset.filter(is_featured=True)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def types(self, request):
        """Get list of all product types"""
        types = self.queryset.values_list('product_type', flat=True).distinct()
        return Response([{'value': t, 'label': dict(AirAmbience.PRODUCT_TYPE_CHOICES)[t]} for t in types])

class PerfumeOilViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for Perfume Oil Products - Read only for public
    """
    queryset = PerfumeOil.objects.filter(is_active=True)
    lookup_field = 'slug'
    permission_classes = [AllowAny]
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'list':
            return PerfumeOilListSerializer
        return PerfumeOilDetailSerializer
    
    def get_queryset(self):
        """Filter and search perfume oil products"""
        queryset = super().get_queryset()
        
        # Search by name, description, or notes
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(
                models.Q(name__icontains=search) |
                models.Q(description__icontains=search) |
                models.Q(top_notes__icontains=search) |
                models.Q(middle_notes__icontains=search) |
                models.Q(base_notes__icontains=search) |
                models.Q(scent_family__icontains=search)
            )
        
        # Filter by concentration
        concentration = self.request.query_params.get('concentration')
        if concentration:
            queryset = queryset.filter(concentration=concentration)
        
        # Filter by scent family
        scent_family = self.request.query_params.get('scent_family')
        if scent_family:
            queryset = queryset.filter(scent_family__icontains=scent_family)
        
        # Filter featured
        featured = self.request.query_params.get('featured')
        if featured and featured.lower() in ['true', '1', 'yes']:
            queryset = queryset.filter(is_featured=True)
        
        # Filter custom blends
        custom_blend = self.request.query_params.get('custom_blend')
        if custom_blend and custom_blend.lower() in ['true', '1', 'yes']:
            queryset = queryset.filter(is_custom_blend=True)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def concentrations(self, request):
        """Get list of all concentrations"""
        concentrations = self.queryset.values_list('concentration', flat=True).distinct()
        return Response([{'value': c, 'label': dict(PerfumeOil.CONCENTRATION_CHOICES)[c]} for c in concentrations])
    
    @action(detail=False, methods=['get'])
    def scent_families(self, request):
        """Get list of all scent families"""
        families = self.queryset.exclude(scent_family='').values_list('scent_family', flat=True).distinct()
        return Response(list(families))