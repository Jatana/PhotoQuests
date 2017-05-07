from django.shortcuts import render
from django.http import HttpResponse, JsonResponse, FileResponse
import re
from PQDB.models import Task, User, Image, Submission
from Random.random_engine import random_id
import base64

def add_image(bytes, img_type):
	rid = random_id()
	while Image.objects.filter(eid=rid):
		rid = random_id()

	image = Image(
		bytes=base64.b64encode(bytes),
		eid=rid,
		img_type=img_type
	)

	image.save()
	return rid

def all_images(request):
	images = Image.objects.all()
	json_images = []
	for image in images:
		json_images.append({
			# 'bytes': image.bytes,
			'id': image.eid,
			'real_id': image.id
		})
	return JsonResponse({
		'status': 'OK',
		'images': json_images
	})

def get_image(request):
	data = request.GET if request.method == 'GET' else request.POST
	if data.get('id', None) is None:
		return JsonResponse({
			'status': 'FAILED',
			'error': 'wher is ID?'
		})

	eid = data['id']
	_s = Image.objects.filter(eid=eid)[0].bytes
	img_type = Image.objects.filter(eid=eid)[0].img_type
	# print(open('/Users/Uhuhu/Pictures/like.png', 'rb').read(), file=open('/Users/Uhuhu/temp/log1', 'w'))
	# print(str(bt), file=open('/Users/Uhuhu/temp/log2', 'w'))
	# print(open('/Users/Uhuhu/Pictures/like.png', 'rb').read(), ':dif:', bt)
	# return HttpResponse(bt, content_type='image/png')
	return HttpResponse(base64.b64decode(_s), content_type=('image/png'))
	# return HttpResponse(Image.objects.filter(eid=eid)[0].bytes)

def clear_images(request):
	image_list = Image.objects.all()
	for image in image_list:
		image.delete()
	return HttpResponse('cleared')