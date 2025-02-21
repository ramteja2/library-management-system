from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from library_app.views import upload_books  # Import the file upload view

def home(request):
    return JsonResponse({"message": "Welcome to Library Management System API"})

urlpatterns = [
    path("", home),  # Home endpoint.
    path("admin/", admin.site.urls),
    path("api/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/upload-books/", upload_books, name="upload_books"),  # New file upload endpoint.
    path("api/", include("library_app.urls")),  # Other API endpoints (like /api/books/)
]
