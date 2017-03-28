from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import re
from PQDB.models import Task, User, Image, Submission, Bookmark
from PQDB.user_views import get_request_sender
from PQDB.image_views import add_image

# Create your views here.

# def validate_create_submit_data(data):
# 	rules = {
# 		'name': {
# 			'max_length': 50,
# 			'min_length': 3
# 		},
# 		'description': {
# 			'max_length': 128,
# 			'min_length': 10
# 		},
# 		'difficuilty': {
# 			'max_length': 128,
# 			'min_length': 1
# 		},
# 		'location': {
# 			'max_length': 1000,
# 			'min_length': 1
# 		}
# 	}

# 	for key in rules.keys():
# 		if data.get(key, None) is None:
# 			return {
# 				'key': key,
# 				'error': 'specify ' + key
# 			}

# 		if not (rules[key]['min_length'] <= len(data[key]) <= rules[key]['max_length']):
# 			return {
# 				'key': key,
# 				'error': 'length of {key} must be from {min_length} to {max_length}'.format(
# 					key=key,
# 					min_length=rules[key]['min_length'],
# 					max_length=rules[key]['max_length']
# 				)
# 			}


def create_bookmark(request):
	data = request.GET if request.method == 'GET' else request.POST
	sender = get_request_sender(request)
	if sender is None: return JsonResponse({
		'status': 'FAILED',
		'error': 'you are unathorized'
	})

	# val = validate_create_task_data(data)
	# if val:
		# val['status'] = 'FAILED'
		# return JsonResponse(val)

	bookmark = Bookmark(
		setter_user_id=sender.eid,
		target_task_id=data['target_task_id']
	)

	bookmark.save()
	return JsonResponse({
		'status': 'OK',
	})

# def get_submissions(request):
	# data = request.GET if request.method == 'GET' else request.POST
	# return HttpResponse(str(Submission.objects.all()))