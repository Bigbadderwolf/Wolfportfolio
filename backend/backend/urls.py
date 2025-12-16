from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse

def home(request):
    return HttpResponse("Welcome to WolfPortfolio Backend API 👋")

urlpatterns = [    path('', home),  # 👈 this handles /
    path('admin/', admin.site.urls),
    path('api/', include('portfolio.urls')),  # or whatever your app is called
]
# Serve media + static files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
