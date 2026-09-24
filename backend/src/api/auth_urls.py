"""URL configuration for auth API"""

from django.urls import path
from src.api.children import views

urlpatterns = [
    path("csrf/", views.csrf_view, name="csrf"),
    path("login/", views.login_view, name="login"),
    path("register/", views.register_view, name="register"),
    path("me/", views.me_view, name="me"),
    path("logout/", views.logout_view, name="logout"),
]
