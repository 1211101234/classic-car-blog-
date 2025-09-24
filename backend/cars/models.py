from django.db import models
from django.conf import settings

# --- Car Model ---
class Car(models.Model):
    name = models.CharField(max_length=200)
    year = models.IntegerField()
    origin = models.CharField(max_length=100)
    engine = models.CharField(max_length=100, blank=True, null=True)
    horsepower = models.IntegerField(blank=True, null=True)
    top_speed = models.IntegerField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    image = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name

# --- Like Model ---
class Like(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='likes')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='car_likes')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('car', 'user')
        ordering = ['-created_at']

    def __str__(self):
        return f"Like(car={self.car_id}, user={self.user_id})"

# --- Comment & Reply Model ---
class Comment(models.Model):
    car = models.ForeignKey(Car, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['created_at']

    def __str__(self):
        return f"{self.user} on {self.car.name}"
