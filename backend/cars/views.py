from rest_framework import viewsets, generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from .models import Car, Comment, Like
from .serializers import CarSerializer, CommentSerializer

# --- Custom Permission: Only owner can edit/delete comment ---
class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Custom permission to allow only the owner of a comment to edit or delete it.
    """
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed for any request
        if request.method in permissions.SAFE_METHODS:
            return True
        # Write permissions only for the owner
        return obj.user == request.user


# --- Car ViewSet (CRUD + like/comment info) ---
class CarViewSet(viewsets.ModelViewSet):
    queryset = Car.objects.all()
    serializer_class = CarSerializer

    def get_serializer_context(self):
        """
        Include request in context so user_liked can be computed correctly.
        """
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


# --- Like Toggle API (like/unlike a car) ---
class CarLikeToggleAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, car_id):
        """
        Toggle like status for a car. 
        If the user already liked it, unlike it. Otherwise, like it.
        """
        user = request.user
        car = get_object_or_404(Car, id=car_id)

        like, created = Like.objects.get_or_create(car=car, user=user)
        if not created:
            # User already liked → remove like
            like.delete()
            liked = False
        else:
            # User just liked
            liked = True

        return Response({
            'liked': liked,
            'like_count': car.likes.count(),
            'car_id': car.id
        }, status=status.HTTP_200_OK)


# --- Comments List + Create API for a specific car ---
class CarCommentsListCreateAPIView(generics.ListCreateAPIView):
    """
    GET → list all top-level comments for a car
    POST → add new comment to a car
    """
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        car_id = self.kwargs['car_id']
        # Only fetch top-level comments (not replies)
        return Comment.objects.filter(car_id=car_id, parent=None).order_by('-created_at')

    def perform_create(self, serializer):
        car_id = self.kwargs['car_id']
        serializer.save(user=self.request.user, car_id=car_id)


# --- Comment Retrieve / Update / Delete API ---
class CommentRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    """
    Handles single comment:
    - GET → view a comment (including replies)
    - PUT/PATCH → update comment (owner only)
    - DELETE → delete comment (owner only)
    """
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()
    permission_classes = [permissions.IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]

    def perform_update(self, serializer):
        serializer.save()
