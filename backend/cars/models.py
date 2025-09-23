from django.db import models

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
