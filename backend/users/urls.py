from django.urls import path
from .views import (
    UserCreateView, 
    UserLoginView, 
    UserListView, 
    UserDetailView
)

urlpatterns = [
    path('create/', UserCreateView.as_view(), name='user-create'),
    path('login/', UserLoginView.as_view(), name='user-login'),
    path('', UserListView.as_view(), name='user-list'),         # GET /api/users/
    path('<int:pk>/', UserDetailView.as_view(), name='user-detail'),  # GET /api/users/<id>/
]
