from django.contrib import admin
from django.contrib.admin import AdminSite
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

# Temporarily disable CSRF for admin login to debug
class CustomAdminSite(AdminSite):
    @method_decorator(csrf_exempt)
    def login(self, request, extra_context=None):
        return super().login(request, extra_context)

# Replace default admin site
admin.site.__class__ = CustomAdminSite
