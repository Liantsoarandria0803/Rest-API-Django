from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import book_detail,create_book


urlpatterns = [
    path('book/<int:pk>/',book_detail,name='book' ),
    path('create',create_book,name='create_book'),
]
