from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from accounts.views import  RegisterView, LoginView, LogoutView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
urlpatterns = [
    path('register', RegisterView.as_view(), name='register'),
    path('login', LoginView.as_view(), name='token_obtain_pair'),
    path('logout', LogoutView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    ]