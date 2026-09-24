from rest_framework.permissions import BasePermission

from .models import is_approved_professional


class IsApprovedProfessional(BasePermission):
    """Allow only approved professionals and Django superusers."""

    message = "Se requiere aprobación como profesional autorizado."

    def has_permission(self, request, view):
        return is_approved_professional(request.user)
