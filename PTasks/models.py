from django.db import models
from PUsers.models import User

# Create your models here.
class Task(models.Model):
	name = models.CharField(max_length=100)
	description = models.CharField(max_length=1000)
	difficuilty = models.CharField(max_length=100)
	location = models.CharField(max_length=1000)
	poster = models.ForeignKey(User)
