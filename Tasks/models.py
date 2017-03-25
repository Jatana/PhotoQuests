from django.db import models

# Create your models here.
class Task(models.Model):
	DIFFICUILTY_EASY = 0
	DIFFICUILTY_MIDDLE = 1
	DIFFICUILTY_HARD = 2

	description = models.CharField(max_length=1000)
