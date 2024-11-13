from django.shortcuts import render,get_object_or_404
from rest_framework.decorators import api_view 
from rest_framework import status
from rest_framework.response import Response
from .models import Book
from .serializers import BookSerializer

@api_view(['POST'])
def create_book(request):
    serializer=BookSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET','PUT','DELETE'])
def book_detail(request, pk):
    try:
        book = Book.objects.get(pk=pk)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        serializer = BookSerializer(book)  # Utiliser l'instance 'book'
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = BookSerializer(book, data=request.data)  # Corriger 'Book' en 'book'
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        book.delete()  # Utiliser 'book.delete()' au lieu de 'Book.delete()'
        return Response(status=status.HTTP_204_NO_CONTENT)