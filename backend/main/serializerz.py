from rest_framework import serializers
from .models import Blog
from django.contrib.auth.models import User
class blogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ["id", "author", "description","title"]
        
        
        
class userSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password","email"]
        