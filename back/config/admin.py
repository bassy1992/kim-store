from django.contrib import admin
from django.views.decorators.csrf import ensure_csrf_cookie
from django.utils.decorators import method_decorator

# Force CSRF cookie on admin login
admin.site.login = method_decorator(ensure_csrf_cookie)(admin.site.login)
