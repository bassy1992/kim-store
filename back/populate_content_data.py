"""
Script to populate sample data for the content app
Run with: python manage.py shell < populate_content_data.py
Or: python populate_content_data.py
"""

import os
import django

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.content.models import (
    FAQ, Testimonial, ShippingInfo, ReturnPolicy,
    TermsAndConditions, PrivacyPolicy, GiftCard
)
from datetime import date

def populate_faqs():
    """Create sample FAQs"""
    faqs = [
        {
            'question': 'How long does shipping take?',
            'answer': 'Standard shipping takes 3-5 business days within Ghana. Express shipping is available for 1-2 business days delivery.',
            'category': 'Shipping',
            'order': 1
        },
        {
            'question': 'Do you offer free shipping?',
            'answer': 'Yes! We offer free standard shipping on all orders over GHS 250.',
            'category': 'Shipping',
            'order': 2
        },
        {
            'question': 'What is your return policy?',
            'answer': 'We accept returns within 30 days of purchase. Products must be unused and in original packaging.',
            'category': 'Returns',
            'order': 3
        },
        {
            'question': 'Are your fragrances authentic?',
            'answer': 'Absolutely! All our fragrances are 100% authentic and sourced directly from authorized distributors.',
            'category': 'Products',
            'order': 4
        },
        {
            'question': 'How should I store my perfume?',
            'answer': 'Store perfumes in a cool, dry place away from direct sunlight and heat to preserve their quality.',
            'category': 'Products',
            'order': 5
        },
        {
            'question': 'Do you ship internationally?',
            'answer': 'Currently, we only ship within Ghana. International shipping will be available soon!',
            'category': 'Shipping',
            'order': 6
        },
        {
            'question': 'Can I track my order?',
            'answer': 'Yes! Once your order ships, you will receive a tracking number via email.',
            'category': 'Orders',
            'order': 7
        },
        {
            'question': 'What payment methods do you accept?',
            'answer': 'We accept all major credit/debit cards, mobile money, and bank transfers through our secure Paystack gateway.',
            'category': 'Payment',
            'order': 8
        },
    ]
    
    for faq_data in faqs:
        FAQ.objects.get_or_create(
            question=faq_data['question'],
            defaults=faq_data
        )
    print(f"✅ Created {len(faqs)} FAQs")


def populate_testimonials():
    """Create sample testimonials"""
    testimonials = [
        {
            'customer_name': 'Sarah M.',
            'rating': 5,
            'comment': 'The best fragrance I\'ve ever owned. Lasts all day and gets so many compliments!',
            'is_featured': True
        },
        {
            'customer_name': 'James K.',
            'rating': 5,
            'comment': 'Elegant packaging and amazing scents. Highly recommend to anyone looking for quality perfumes!',
            'is_featured': True
        },
        {
            'customer_name': 'Emma L.',
            'rating': 5,
            'comment': 'Perfect gift for my partner. They absolutely loved it! Will definitely order again.',
            'is_featured': True
        },
        {
            'customer_name': 'Michael R.',
            'rating': 5,
            'comment': 'Quality fragrances at great prices. Fast shipping and excellent customer service!',
            'is_featured': True
        },
        {
            'customer_name': 'Aisha B.',
            'rating': 5,
            'comment': 'Love the variety of scents available. Found my signature fragrance here!',
            'is_featured': False
        },
        {
            'customer_name': 'David O.',
            'rating': 4,
            'comment': 'Great products and fast delivery. Only wish there were more woody scents.',
            'is_featured': False
        },
    ]
    
    for test_data in testimonials:
        Testimonial.objects.get_or_create(
            customer_name=test_data['customer_name'],
            defaults=test_data
        )
    print(f"✅ Created {len(testimonials)} testimonials")


def populate_shipping_info():
    """Create shipping information"""
    shipping_content = """
    <h2>Shipping Policy</h2>
    <p>We are committed to delivering your fragrances safely and promptly.</p>
    
    <h3>Delivery Times</h3>
    <ul>
        <li><strong>Standard Delivery:</strong> 3-5 business days</li>
        <li><strong>Express Delivery:</strong> 1-2 business days (additional fee applies)</li>
    </ul>
    
    <h3>Free Shipping</h3>
    <p>Enjoy free standard shipping on all orders over GHS 250!</p>
    
    <h3>Shipping Locations</h3>
    <p>We currently ship to all regions within Ghana. International shipping coming soon!</p>
    
    <h3>Order Tracking</h3>
    <p>Once your order is shipped, you will receive a tracking number via email to monitor your delivery.</p>
    
    <h3>Packaging</h3>
    <p>All fragrances are carefully packaged to ensure they arrive in perfect condition. We use eco-friendly materials whenever possible.</p>
    """
    
    ShippingInfo.objects.get_or_create(
        title='Shipping Information',
        defaults={
            'content': shipping_content,
            'free_shipping_threshold': 250.00,
            'standard_delivery_days': '3-5 business days',
            'express_delivery_days': '1-2 business days',
            'international_shipping': False
        }
    )
    print("✅ Created shipping information")


def populate_return_policy():
    """Create return policy"""
    return_content = """
    <h2>Return & Refund Policy</h2>
    <p>Your satisfaction is our priority. We want you to love your fragrance!</p>
    
    <h3>30-Day Return Window</h3>
    <p>You may return any unused product within 30 days of purchase for a full refund.</p>
    
    <h3>Return Conditions</h3>
    <ul>
        <li>Product must be unused and in original packaging</li>
        <li>All seals must be intact</li>
        <li>Original receipt or proof of purchase required</li>
    </ul>
    
    <h3>How to Return</h3>
    <ol>
        <li>Contact our customer service team</li>
        <li>Receive return authorization and instructions</li>
        <li>Ship the product back to us</li>
        <li>Receive your refund within 5-7 business days</li>
    </ol>
    
    <h3>Exchanges</h3>
    <p>We're happy to exchange products for a different scent or size. Contact us to arrange an exchange.</p>
    
    <h3>Damaged or Defective Items</h3>
    <p>If you receive a damaged or defective product, please contact us immediately. We will replace it at no cost to you.</p>
    """
    
    ReturnPolicy.objects.get_or_create(
        title='Return Policy',
        defaults={
            'content': return_content,
            'return_window_days': 30,
            'refund_processing_days': '5-7 business days'
        }
    )
    print("✅ Created return policy")


def populate_terms():
    """Create terms and conditions"""
    terms_content = """
    <h2>Terms and Conditions</h2>
    <p>Last updated: January 2025</p>
    
    <h3>1. Agreement to Terms</h3>
    <p>By accessing and using Kimmy's Fragrance website, you agree to be bound by these Terms and Conditions.</p>
    
    <h3>2. Use of Website</h3>
    <p>You may use our website for lawful purposes only. You agree not to use the website in any way that could damage, disable, or impair the website.</p>
    
    <h3>3. Product Information</h3>
    <p>We strive to provide accurate product descriptions and pricing. However, we do not warrant that product descriptions or other content is accurate, complete, or error-free.</p>
    
    <h3>4. Orders and Payment</h3>
    <p>All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order for any reason.</p>
    
    <h3>5. Intellectual Property</h3>
    <p>All content on this website, including text, graphics, logos, and images, is the property of Kimmy's Fragrance and protected by copyright laws.</p>
    
    <h3>6. Limitation of Liability</h3>
    <p>Kimmy's Fragrance shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our products or website.</p>
    
    <h3>7. Changes to Terms</h3>
    <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website.</p>
    
    <h3>8. Contact Us</h3>
    <p>If you have any questions about these Terms and Conditions, please contact us at hello@kimmysfragrance.com</p>
    """
    
    TermsAndConditions.objects.get_or_create(
        title='Terms and Conditions',
        defaults={
            'content': terms_content,
            'effective_date': date(2025, 1, 1)
        }
    )
    print("✅ Created terms and conditions")


def populate_privacy():
    """Create privacy policy"""
    privacy_content = """
    <h2>Privacy Policy</h2>
    <p>Last updated: January 2025</p>
    
    <h3>1. Information We Collect</h3>
    <p>We collect information you provide directly to us, including:</p>
    <ul>
        <li>Name and contact information</li>
        <li>Shipping and billing addresses</li>
        <li>Payment information</li>
        <li>Order history</li>
        <li>Email preferences</li>
    </ul>
    
    <h3>2. How We Use Your Information</h3>
    <p>We use the information we collect to:</p>
    <ul>
        <li>Process and fulfill your orders</li>
        <li>Communicate with you about your orders</li>
        <li>Send you marketing communications (with your consent)</li>
        <li>Improve our products and services</li>
        <li>Prevent fraud and enhance security</li>
    </ul>
    
    <h3>3. Information Sharing</h3>
    <p>We do not sell or rent your personal information to third parties. We may share your information with:</p>
    <ul>
        <li>Service providers who assist with order fulfillment and payment processing</li>
        <li>Law enforcement when required by law</li>
    </ul>
    
    <h3>4. Data Security</h3>
    <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.</p>
    
    <h3>5. Your Rights</h3>
    <p>You have the right to:</p>
    <ul>
        <li>Access your personal information</li>
        <li>Correct inaccurate information</li>
        <li>Request deletion of your information</li>
        <li>Opt-out of marketing communications</li>
    </ul>
    
    <h3>6. Cookies</h3>
    <p>We use cookies to enhance your browsing experience and analyze website traffic. You can control cookie preferences through your browser settings.</p>
    
    <h3>7. Changes to Privacy Policy</h3>
    <p>We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
    
    <h3>8. Contact Us</h3>
    <p>If you have questions about this Privacy Policy, please contact us at hello@kimmysfragrance.com</p>
    """
    
    PrivacyPolicy.objects.get_or_create(
        title='Privacy Policy',
        defaults={
            'content': privacy_content,
            'effective_date': date(2025, 1, 1)
        }
    )
    print("✅ Created privacy policy")


def populate_gift_cards():
    """Create sample gift cards"""
    gift_cards = [
        {
            'name': 'Gift Card - GHS 50',
            'description': 'Perfect for trying a new fragrance',
            'amount': 50.00
        },
        {
            'name': 'Gift Card - GHS 100',
            'description': 'Great for fragrance lovers',
            'amount': 100.00
        },
        {
            'name': 'Gift Card - GHS 200',
            'description': 'Premium gift option',
            'amount': 200.00
        },
        {
            'name': 'Gift Card - GHS 500',
            'description': 'Ultimate luxury gift',
            'amount': 500.00
        },
    ]
    
    for gc_data in gift_cards:
        GiftCard.objects.get_or_create(
            amount=gc_data['amount'],
            defaults=gc_data
        )
    print(f"✅ Created {len(gift_cards)} gift cards")


def main():
    """Run all population functions"""
    print("🚀 Starting data population...\n")
    
    populate_faqs()
    populate_testimonials()
    populate_shipping_info()
    populate_return_policy()
    populate_terms()
    populate_privacy()
    populate_gift_cards()
    
    print("\n✨ Data population complete!")
    print("\n📝 Next steps:")
    print("1. Visit http://localhost:8000/admin/ to manage content")
    print("2. Add gallery images through admin")
    print("3. Create dupe products through admin")
    print("4. Test API endpoints at http://localhost:8000/api/docs/")


if __name__ == '__main__':
    main()
