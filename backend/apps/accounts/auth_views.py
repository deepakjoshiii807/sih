"""
Authentication endpoints:
  POST /api/auth/register        create account + role profile
  POST /api/auth/token           email + password -> access/refresh (SimpleJWT)
  POST /api/auth/token/refresh   refresh -> new access token
  POST /api/auth/token/verify    validate an access token
  GET  /api/auth/me              current user + role summary
"""
from django.db import transaction
from rest_framework import serializers
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from .models import (
    AcademicianProfile,
    IndustryProfile,
    InstitutionAdminProfile,
    Role,
    StudentProfile,
    User,
)


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, min_length=8)
    role = serializers.ChoiceField(choices=Role.choices)
    name = serializers.CharField(required=False, allow_blank=True, default="")
    phone = serializers.CharField(required=False, allow_blank=True, default="")

    # Optional role-specific payload (created lazily if provided).
    institution_id = serializers.IntegerField(required=False)
    department_id = serializers.IntegerField(required=False)
    roll_number = serializers.CharField(required=False, allow_blank=True, default="")
    course = serializers.CharField(required=False, allow_blank=True, default="BAMS")
    year = serializers.CharField(required=False, allow_blank=True, default="3rd Year")
    graduation_year = serializers.IntegerField(required=False)
    location = serializers.CharField(required=False, allow_blank=True, default="")

    def validate_email(self, value: str) -> str:
        if User.objects.filter(email__iexact=value).exists():
            raise serializers.ValidationError("An account with this email already exists.")
        return value.lower()


class RegisterView(APIView):
    permission_classes = (AllowAny,)

    @transaction.atomic
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        first, _, last = data["name"].partition(" ")
        user = User.objects.create_user(
            email=data["email"],
            password=data["password"],
            role=data["role"],
            phone=data.get("phone", ""),
            first_name=first,
            last_name=last.strip(),
        )
        self._create_profile(user, data)
        refresh = RefreshToken.for_user(user)
        return Response(
            {
                "id": user.id,
                "email": user.email,
                "role": user.role,
                "name": user.display_name,
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            },
            status=201,
        )

    @staticmethod
    def _create_profile(user, data) -> None:
        if user.role == Role.STUDENT:
            StudentProfile.objects.create(
                user=user,
                institution_id=data.get("institution_id"),
                department_id=data.get("department_id"),
                roll_number=data.get("roll_number", ""),
                course=data.get("course", "BAMS"),
                year=data.get("year", "3rd Year"),
                graduation_year=data.get("graduation_year"),
                location=data.get("location", ""),
            )
        elif user.role == Role.INDUSTRY:
            IndustryProfile.objects.create(
                user=user,
                name=data.get("name") or user.display_name,
                company_email=user.email,
                phone=data.get("phone", ""),
            )
        elif user.role == Role.ACADEMICIAN:
            AcademicianProfile.objects.create(
                user=user,
                institution_id=data.get("institution_id"),
                department_id=data.get("department_id"),
                designation=data.get("designation", "Faculty"),
            )
        elif user.role == Role.INSTITUTION_ADMIN:
            InstitutionAdminProfile.objects.create(
                user=user,
                institution_id=data.get("institution_id"),
                title="Administrator",
            )


class MeView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        user = request.user
        return Response(
            {
                "id": user.id,
                "email": user.email,
                "name": user.display_name,
                "initials": user.initials,
                "role": user.role,
                "is_verified": user.is_verified,
                "phone": user.phone,
            }
        )


class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = "email"


class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer


class DemoAccountsView(APIView):
    """Public demo helper listing the seeded demo logins (dev only)."""

    permission_classes = (AllowAny,)

    def get(self, request):
        accounts = (
            User.objects.filter(email__endswith="@demo.aiia.local")
            .order_by("id")
            .values("email", "role", "display_name")
        )
        return Response(list(accounts))
