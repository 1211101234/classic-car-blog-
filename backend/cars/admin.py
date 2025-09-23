from django.contrib import admin
from .models import Car

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'year', 'origin', 'horsepower', 'top_speed', 'engine', 'description', 'image')
    search_fields = ('name', 'origin', 'engine', 'description', 'year', 'horsepower', 'top_speed', 'id', 'image')
