from django.urls import path, include
from rest_framework import routers
from book.views import BookCreateView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from book.views import BookCreateView

urlpatterns = [


    # path('books/', BooksView.as_view()),
    path('create/', BookCreateView.as_view()),
    path('all/', BookCreateView.as_view()),
    path('list/', BookCreateView.as_view()),
    path('<id>/', BookCreateView.as_view()),
    path('update/<id>/', BookCreateView.as_view()),
    path('delete/<id>/', BookCreateView.as_view()),
    path('delete/all/', BookCreateView.as_view()),

]
