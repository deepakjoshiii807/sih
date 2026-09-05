from rest_framework.permissions import BasePermission, SAFE_METHODS


def _has_role(user, *roles) -> bool:
    return bool(user and user.is_authenticated and user.role in roles)


class IsRole(BasePermission):
    """Allow requests only for users whose role is listed on the class."""

    roles: tuple = ()

    def has_permission(self, request, view) -> bool:
        if request.method in SAFE_METHODS:
            return _has_role(request.user, *self.roles)
        return _has_role(request.user, *self.roles)


class IsStudent(IsRole):
    roles = ("student",)


class IsIndustry(IsRole):
    roles = ("industry",)


class IsAcademician(IsRole):
    roles = ("academician",)


class IsInstitutionAdmin(IsRole):
    roles = ("institution_admin",)


class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view) -> bool:
        if request.method in SAFE_METHODS:
            return True
        return _has_role(request.user, "admin")


class IsStudentOrAdmin(BasePermission):
    def has_permission(self, request, view) -> bool:
        return _has_role(request.user, "student", "admin")
