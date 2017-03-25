from django.db import models

# Create your models here.
class User(models.Model):
	name = models.CharField(max_length=100)
	password = models.CharField(max_length=100)
	email = models.CharField(max_length=100)
	
class Task(models.Model):
	name = models.CharField(max_length=100)
	description = models.CharField(max_length=1000)
	difficuilty = models.CharField(max_length=100)
	location = models.CharField(max_length=1000)
	poster = models.ForeignKey(User)


