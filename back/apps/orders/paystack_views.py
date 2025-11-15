import requests
import json
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.utils.decorators import method_decorator
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from decouple import config

# Get Paystack secret key from environment
PAYSTACK_SECRET_KEY = config('PAYSTACK_SECRET_KEY', default='sk_test_your_secret_key_here')
PAYSTACK_BASE_URL = 'https://api.paystack.co'

@api_view(['POST'])
@permission_classes([AllowAny])
def initialize_payment(request):
    """Initialize Paystack payment"""
    try:
        # Get payment data from request
        email = request.data.get('email')
        amount = request.data.get('amount')  # Amount in kobo/pesewas
        currency = request.data.get('currency', 'GHS')
        callback_url = request.data.get('callback_url')
        metadata = request.data.get('metadata', {})
        
        # Validate required fields
        if not email or not amount:
            return Response({
                'error': 'Email and amount are required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Prepare Paystack payload
        paystack_data = {
            'email': email,
            'amount': int(amount),  # Ensure amount is integer
            'currency': currency,
            'callback_url': callback_url,
            'metadata': metadata
        }
        
        # Make request to Paystack
        headers = {
            'Authorization': f'Bearer {PAYSTACK_SECRET_KEY}',
            'Content-Type': 'application/json'
        }
        
        response = requests.post(
            f'{PAYSTACK_BASE_URL}/transaction/initialize',
            headers=headers,
            json=paystack_data,
            timeout=30
        )
        
        if response.status_code == 200:
            return Response(response.json())
        else:
            error_data = response.json() if response.content else {'message': 'Payment initialization failed'}
            return Response({
                'error': error_data.get('message', 'Payment initialization failed'),
                'details': error_data
            }, status=status.HTTP_400_BAD_REQUEST)
            
    except requests.exceptions.RequestException as e:
        return Response({
            'error': 'Failed to connect to payment gateway',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    except Exception as e:
        return Response({
            'error': 'An unexpected error occurred',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([AllowAny])
def verify_payment(request):
    """Verify Paystack payment"""
    try:
        reference = request.data.get('reference')
        
        if not reference:
            return Response({
                'error': 'Payment reference is required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Make request to Paystack
        headers = {
            'Authorization': f'Bearer {PAYSTACK_SECRET_KEY}',
            'Content-Type': 'application/json'
        }
        
        response = requests.get(
            f'{PAYSTACK_BASE_URL}/transaction/verify/{reference}',
            headers=headers,
            timeout=30
        )
        
        if response.status_code == 200:
            return Response(response.json())
        else:
            error_data = response.json() if response.content else {'message': 'Payment verification failed'}
            return Response({
                'error': error_data.get('message', 'Payment verification failed'),
                'details': error_data
            }, status=status.HTTP_400_BAD_REQUEST)
            
    except requests.exceptions.RequestException as e:
        return Response({
            'error': 'Failed to connect to payment gateway',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    except Exception as e:
        return Response({
            'error': 'An unexpected error occurred',
            'details': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
@require_http_methods(["POST"])
def paystack_webhook(request):
    """Handle Paystack webhook notifications"""
    try:
        # Verify webhook signature (optional but recommended)
        # signature = request.headers.get('x-paystack-signature')
        
        # Parse webhook data
        webhook_data = json.loads(request.body)
        event = webhook_data.get('event')
        data = webhook_data.get('data', {})
        
        if event == 'charge.success':
            # Handle successful payment
            reference = data.get('reference')
            amount = data.get('amount')
            customer_email = data.get('customer', {}).get('email')
            
            # TODO: Update order status, send confirmation email, etc.
            print(f"Payment successful: {reference}, Amount: {amount}, Email: {customer_email}")
        
        return JsonResponse({'status': 'success'})
        
    except Exception as e:
        print(f"Webhook error: {str(e)}")
        return JsonResponse({'error': str(e)}, status=400)