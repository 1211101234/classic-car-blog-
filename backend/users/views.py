from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
import logging

logger = logging.getLogger(__name__)


# ------------------------------
# Generate JWT Token Helper
# ------------------------------
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


# ------------------------------
# User Registration Endpoint
# ------------------------------
class UserCreateView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            tokens = get_tokens_for_user(user)
            return Response(
                {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "usernameOrEmail": user.username,
                    "token": tokens["access"],  # Angular expects "token"
                    "refresh": tokens["refresh"],
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
        )


# ------------------------------
# User Login Endpoint
# ------------------------------
class UserLoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            data = request.data if request.data else request.POST
            login_input = data.get("usernameOrEmail")
            password = data.get("password")

            if not login_input or not password:
                return Response(
                    {"error": "Username/email and password are required"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Try login via username first
            user = authenticate(username=login_input, password=password)

            # Try via email if username fails
            if user is None:
                try:
                    user_obj = User.objects.get(email=login_input)
                    user = authenticate(username=user_obj.username, password=password)
                except User.DoesNotExist:
                    user = None

            if user is not None:
                tokens = get_tokens_for_user(user)
                return Response(
                    {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                        "usernameOrEmail": user.username,
                        "token": tokens["access"],
                        "refresh": tokens["refresh"],
                    },
                    status=status.HTTP_200_OK,
                )

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
# User List (Admin only)
# ------------------------------
class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]


# ------------------------------
# User Detail (Self or Admin)
# ------------------------------
class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        user = super().get_object()
        if self.request.user == user or self.request.user.is_staff:
            return user
        from rest_framework.exceptions import PermissionDenied
        raise PermissionDenied("You do not have permission to view this user.")
