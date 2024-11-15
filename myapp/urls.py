from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import book_detail,create_book,books_page,get_books


urlpatterns = [
    path('book/<int:pk>/',book_detail,name='book' ),
    path('create',create_book,name='create_book'),
    path('books/', books_page, name='books_page'),
    path('AllBooks',get_books,name="all")
]
