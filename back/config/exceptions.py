from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ValidationError as DjangoValidationError


def custom_exception_handler(exc, context):
    """
    Custom exception handler for consistent error responses.
    Returns error responses in the format:
    {
        "error": {
            "code": "error_code",
            "message": "Error message",
            "details": {...}
        }
    }
    """
    # Call REST framework's default exception handler first
    response = exception_handler(exc, context)
    
    if response is not None:
        # Customize the response format
        error_code = get_error_code(exc)
        error_message = get_error_message(exc, response)
        error_details = get_error_details(response.data)
        
        custom_response_data = {
            'error': {
                'code': error_code,
                'message': error_message,
                'details': error_details
            }
        }
        
        response.data = custom_response_data
    else:
        # Handle Django validation errors
        if isinstance(exc, DjangoValidationError):
            custom_response_data = {
                'error': {
                    'code': 'validation_error',
                    'message': 'Validation error',
                    'details': {'non_field_errors': exc.messages}
                }
            }
            response = Response(custom_response_data, status=status.HTTP_400_BAD_REQUEST)
    
    return response


def get_error_code(exc):
    """Determine error code based on exception type"""
    exc_class = exc.__class__.__name__
    
    error_codes = {
        'ValidationError': 'validation_error',
        'ParseError': 'parse_error',
        'AuthenticationFailed': 'authentication_failed',
        'NotAuthenticated': 'not_authenticated',
        'PermissionDenied': 'permission_denied',
        'NotFound': 'not_found',
        'MethodNotAllowed': 'method_not_allowed',
        'NotAcceptable': 'not_acceptable',
        'UnsupportedMediaType': 'unsupported_media_type',
        'Throttled': 'throttled',
    }
    
    return error_codes.get(exc_class, 'server_error')


def get_error_message(exc, response):
    """Get a user-friendly error message"""
    if hasattr(exc, 'detail'):
        if isinstance(exc.detail, str):
            return exc.detail
        elif isinstance(exc.detail, dict):
            # Get first error message
            for key, value in exc.detail.items():
                if isinstance(value, list) and len(value) > 0:
                    return str(value[0])
                return str(value)
    
    # Default messages based on status code
    status_messages = {
        400: 'Invalid input data',
        401: 'Authentication credentials were not provided or are invalid',
        403: 'You do not have permission to perform this action',
        404: 'The requested resource was not found',
        405: 'Method not allowed',
        500: 'An internal server error occurred',
    }
    
    return status_messages.get(response.status_code, 'An error occurred')


def get_error_details(data):
    """Extract error details from response data"""
    if isinstance(data, dict):
        return data
    elif isinstance(data, list):
        return {'errors': data}
    else:
        return {'detail': str(data)}
