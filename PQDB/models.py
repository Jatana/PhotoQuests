from django.db import models

# Create your models here.

class Image(models.Model):
	bytes = models.CharField(max_length=1000000000)
	img_type = models.CharField(max_length=1000)
	eid = models.CharField(max_length=1000)

class User(models.Model):
	login = models.CharField(max_length=100)
	password = models.CharField(max_length=100)
	email = models.CharField(max_length=100)
	eid = models.CharField(max_length=1000)
	session_id = models.CharField(max_length=1000)
	session_expire = models.CharField(max_length=1000)
	rating = models.CharField(max_length=1000)
	profile_image_id = models.CharField(max_length=1000)
	
class Submission(models.Model):
	target_task_id = models.CharField(max_length=1000)
	sender_id = models.CharField(max_length=1000)
	submit_image_id = models.CharField(max_length=1000)
	submit_number = models.CharField(max_length=1000)
	eid = models.CharField(max_length=1000)

class Bookmark(models.Model):
	setter_user_id = models.CharField(max_length=1000)
	target_task_id = models.CharField(max_length=1000)

class Task(models.Model):
	name = models.CharField(max_length=100)
	description = models.CharField(max_length=1000)
	difficuilty = models.CharField(max_length=100)
	location = models.CharField(max_length=1000)
	expire_date = models.CharField(max_length=1000)
	poster = models.ForeignKey(User)
	eid = models.CharField(max_length=1000)

