"""Custom exception handlers for API responses"""
import logging
import traceback
from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status

logger = logging.getLogger(__name__)


class APIException(Exception):
    """Base API exception"""
    def __init__(self, message, status_code=status.HTTP_400_BAD_REQUEST):
        self.message = message
        self.status_code = status_code
        super().__init__(message)


class ValidationError(APIException):
    """Validation error exception"""
    def __init__(self, message):
        super().__init__(message, status.HTTP_400_BAD_REQUEST)


class NotFoundError(APIException):
    """Resource not found exception"""
    def __init__(self, message):
        super().__init__(message, status.HTTP_404_NOT_FOUND)


class UnauthorizedError(APIException):
    """Unauthorized access exception"""
    def __init__(self, message="Unauthorized"):
        super().__init__(message, status.HTTP_401_UNAUTHORIZED)


class ForbiddenError(APIException):
    """Forbidden access exception"""
    def __init__(self, message="Forbidden"):
        super().__init__(message, status.HTTP_403_FORBIDDEN)


class ExternalServiceError(APIException):
    """External service failure exception"""
    def __init__(self, message="External service unavailable"):
        super().__init__(message, status.HTTP_503_SERVICE_UNAVAILABLE)


def custom_exception_handler(exc, context):
    """Global exception handler for DRF"""
    response = exception_handler(exc, context)
    
    if response is not None:
        error_response = {
            'success': False,
            'error': {
                'code': response.status_code,
                'message': str(exc.detail) if hasattr(exc, 'detail') else str(exc),
            }
        }
        response.data = error_response
        return response
    
    if isinstance(exc, APIException):
        return Response({
            'success': False,
            'error': {
                'code': exc.status_code,
                'message': exc.message
            }
        }, status=exc.status_code)
    
    logger.error(f"Unhandled exception: {exc}\n{traceback.format_exc()}")
    
    return Response({
        'success': False,
        'error': {
            'code': 500,
            'message': 'Internal server error',
            'detail': str(exc) if __debug__ else 'An unexpected error occurred'
        }
    }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)