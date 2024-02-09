from django.db import models

# Create your models here.
class Blog(models.Model):
    author = models.CharField(max_length=40)
    description = models.TextField()
    title = models.CharField(max_length=20)
    
    def __str__(self):
        return "by " + self.author + "\n" + self.title
    