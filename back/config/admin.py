from django.contrib import admin
from django.contrib.admin import AdminSite
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator

# Custom AdminSite that ensures CSRF cookie
class CustomAdminSite(AdminSite):
    @method_decorator(ensure_csrf_cookie)
    def login(self, request, extra_context=None):
        return super().login(request, extra_context)

# Replace default admin site
admin.site.__class__ = CustomAdminSite
