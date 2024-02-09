from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
from .models import Blog
from .serializerz import blogSerializer,userSerializer
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from django.shortcuts import get_object_or_404
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes

@api_view(['GET','POST'])    
def blog(request):
    if request.method== 'GET':
        blogs = Blog.objects.all()
        ser = blogSerializer(blogs, many=True)
        return Response(ser.data, status=status.HTTP_200_OK)
    if request.method == 'POST':
        ser = blogSerializer(data=request.data)
        if ser.is_valid():
            ser.save()
            return Response(ser.data,status=status.HTTP_201_CREATED)
        
@api_view(['GET','PUT', 'DELETE'])    
def blogDesc(request, id):
    try:
        blog = Blog.objects.get(pk=id)
    except:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
       ser = blogSerializer(blog)
       return Response(ser.data, status=status.HTTP_200_OK)
    elif request.method == "PUT":
        ser = blogSerializer(blog, data=request.data)
        if ser.is_valid():
            ser.save()
            return Response(ser.data, status=status.HTTP_200_OK)
        return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
     blog.delete()
     return Response(status=status.HTTP_204_NO_CONTENT)
   
@api_view(['GET','PUT', 'DELETE'])
def getUser(request,id):
    try:
        user = User.objects.get(pk=id)
    except:
       return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method == "GET":
        ser = userSerializer(user)
        return Response(ser.data, status=status.HTTP_200_OK)  
    elif request.method == "PUT":
        ser = userSerializer(user, data=request.data)
        if ser.is_valid():
            ser.save()
            return Response(ser.data, status=status.HTTP_200_OK)
        return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == "DELETE":
     user.delete()
     return Response(status=status.HTTP_204_NO_CONTENT)
@api_view(['POST'])    
def login(request):
    user = get_object_or_404(User, username=request.data["username"])
    if not user.check_password(request.data["password"]):
        return Response({"detail": "Not found."}, status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    ser = userSerializer(instance=user)
    return Response({"token": token.key, "user":ser.data})

@api_view(['POST'])    
def signup(request):
    ser = userSerializer(data=request.data)
    if ser.is_valid():
        ser.save()
        user = User.objects.get(username=request.data["username"])
        user.set_password(request.data["password"])
        user.save()
        token = Token.objects.create(user=user)

        return Response({"token": token.key, "user":ser.data})
    return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])    
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("passed!")
