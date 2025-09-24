from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CarViewSet, CarLikeToggleAPIView, CarCommentsListCreateAPIView, CommentRetrieveUpdateDestroyAPIView

router = DefaultRouter()
router.register(r'cars', CarViewSet, basename='car')

urlpatterns = [
    path('', include(router.urls)),
    path('cars/<int:car_id>/like/', CarLikeToggleAPIView.as_view(), name='car-like-toggle'),
    path('cars/<int:car_id>/comments/', CarCommentsListCreateAPIView.as_view(), name='car-comments'),
    path('comments/<int:pk>/', CommentRetrieveUpdateDestroyAPIView.as_view(), name='comment-detail'),
]
