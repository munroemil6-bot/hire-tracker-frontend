from django.http import JsonResponse
from django.urls import path

from .views import LoginView, RegisterView


def api_root(request):
    return JsonResponse(
        {
            "message": "Hire tracker API is running",
            "routes": {
                "login": "/api/login/",
                "register": "/api/register/",
                "admin": "/admin/",
            },
        }
    )


urlpatterns = [
    path("", api_root, name="api-root"),
    path("login/", LoginView.as_view(), name="login"),
    path("register/", RegisterView.as_view(), name="register"),
]