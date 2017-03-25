from django.db import models
from PTasks.models import Task

# Create your models here.
class User(models.Model):
	name = models.CharField(max_length=100)
	password = models.CharField(max_length=100)
	email = models.CharField(max_length=100)
