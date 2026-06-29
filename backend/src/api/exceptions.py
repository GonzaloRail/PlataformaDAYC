"""Custom exception handlers for API responses"""
import logging
import traceback
from django.conf import settings
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
            'detail': str(exc) if settings.DEBUG else 'An unexpected error occurred'
        }
    }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
