from django.contrib import admin

from .models import ProfessionalProfile


@admin.register(ProfessionalProfile)
class ProfessionalProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "status", "approved_at", "updated_at")
    list_filter = ("status",)
    search_fields = ("user__username", "user__email")
