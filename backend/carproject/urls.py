from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('cars.urls')),  # API accessible at /api/cars/
    path('api/users/', include('users.urls')),  # User API accessible at /api/users/
]
