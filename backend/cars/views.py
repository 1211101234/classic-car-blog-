from rest_framework import viewsets, generics, permissions
from django.shortcuts import get_object_or_404
from .models import Car, Comment, Like
from .serializers import CarSerializer, CommentSerializer
from rest_framework.response import Response
from rest_framework.views import APIView

# --- Car ViewSet with Likes info ---
class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

# --- Like Toggle API ---
class CarLikeToggleAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, car_id):
        user = request.user
        car = get_object_or_404(Car, id=car_id)

        like, created = Like.objects.get_or_create(car=car, user=user)
        if not created:
            like.delete()
            liked = False
        else:
            liked = True

        return Response({'liked': liked, 'like_count': car.likes.count()})

# --- Comments API ---
class CarCommentsListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        car_id = self.kwargs['car_id']
        return Comment.objects.filter(car_id=car_id, parent=None)

    def perform_create(self, serializer):
        car_id = self.kwargs['car_id']
        serializer.save(user=self.request.user, car_id=car_id)

class CommentRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_update(self, serializer):
        serializer.save()
