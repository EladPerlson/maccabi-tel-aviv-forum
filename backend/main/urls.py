from django.urls import path
from . import views

urlpatterns = [
    path("/blog", views.blog, name="blogs"),
    path("/blog/<int:id>", views.blogDesc, name="blogDesc"),
    path("/blog/login", views.login, name="login"),
    path("/blog/signup", views.signup, name="signup"),
    path("/blog/users/<int:id>", views.getUser, name="getUser"),
    path("/blog/test_token", views.test_token, name="test_token"),

]
