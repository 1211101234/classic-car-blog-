# users/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer
from rest_framework import generics, permissions
import logging

logger = logging.getLogger(__name__)


# ------------------------------
# User Registration Endpoint
# ------------------------------
class UserCreateView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token, _ = Token.objects.get_or_create(user=user)
            return Response(
                {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "usernameOrEmail": user.username,  # convenient for Angular login
                    "token": token.key,
                },
                status=status.HTTP_201_CREATED,
            )
        else:
            return Response(
                {"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
            )


# ------------------------------
# User Login Endpoint
# ------------------------------
class UserLoginView(APIView):
    def post(self, request):
        try:
            # Accept both JSON and form-data
            data = request.data if request.data else request.POST

            login_input = data.get("usernameOrEmail")
            password = data.get("password")

            if not login_input or not password:
                return Response(
                    {"error": "Username/email and password are required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Try login by username first
            user = authenticate(username=login_input, password=password)

            # If login by username fails, try email
            if user is None:
                try:
                    user_obj = User.objects.get(email=login_input)
                    user = authenticate(username=user_obj.username, password=password)
                except User.DoesNotExist:
                    user = None

            if user is not None:
                token, _ = Token.objects.get_or_create(user=user)
                return Response(
                    {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "usernameOrEmail": user.username,
                        "token": token.key,
                    },
                    status=status.HTTP_200_OK,
                )
            else:
                return Response(
                    {"error": "Invalid username/email or password"},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

        except Exception as e:
            logger.exception("User login failed")
            return Response(
                {"error": "Internal Server Error"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )


# ------------------------------
# User List (admin only)
# ------------------------------
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]  # Only admins can list all users


# ------------------------------
# User Detail (user or admin)
# ------------------------------
class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        user = super().get_object()
        # Only allow admin or the user themselves
        if self.request.user == user or self.request.user.is_staff:
            return user
        else:
            from rest_framework.exceptions import PermissionDenied

            raise PermissionDenied("You do not have permission to view this user.")
