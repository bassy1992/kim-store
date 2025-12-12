from django.contrib import admin
from django.contrib.admin import AdminSite
from django.utils.translation import gettext_lazy as _


class KimStoreAdminSite(AdminSite):
    """
    Custom admin site for Kim Store with enhanced branding
    """
    site_title = _('Kim Store Admin')
    site_header = _('Kim Store Administration')
    index_title = _('Welcome to Kim Store Admin Panel')
    
    def each_context(self, request):
        """
        Return a dictionary of variables to put in the template context for
        every page in the admin site.
        """
        context = super().each_context(request)
        context.update({
            'site_url': '/',  # Link to your frontend
            'has_permission': request.user.is_active and request.user.is_staff,
        })
        return context


# Create custom admin site instance
admin_site = KimStoreAdminSite(name='kim_admin')

# You can register models to the custom admin site if needed
# admin_site.register(YourModel, YourModelAdmin)