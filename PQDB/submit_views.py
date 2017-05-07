from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import re
from PQDB.models import Task, User, Image, Submission
from PQDB.user_views import get_request_sender
from PQDB.image_views import add_image
from Random.random_engine import random_id_no_coll
import base64

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


def create_submit(request):
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

	# print('hello')
	# print(request.FILES['image'].read(), dir(request.FILES['image']))
	# return JsonResponse({
		# 'status': 'OK'
	# })

	image_id = add_image(request.FILES['image'].read(), 'png')

	submit = Submission(
		submit_image_id=image_id,
		sender_id=sender.eid,
		target_task_id=data['target_task_id'],
		submit_number=len(Submission.objects.filter(
			sender_id=sender.eid,
			target_task_id=data['target_task_id'])
		),
		eid=random_id_no_coll(Submission.objects)
	)

	submit.save()
	return JsonResponse({
		'status': 'OK',
	})

def clear_submissions(request):
	submission_list = Submission.objects.all()
	for submit in submission_list:
		submit.delete()
	return HttpResponse('cleared')

def get_all_submissions(request):
	sublist = Submission.objects.all()
	sublist_json = []
	for sub in sublist:
		sublist_json.append({
			'target_task_id': sub.target_task_id,
			'submit_number': sub.submit_number,
			'sender_id': sub.sender_id
		})
	return JsonResponse({
		'status': 'OK',
		'submissions': sublist_json
	})


def get_submission(request):
	data = request.GET if request.method == 'GET' else request.POST

	if data.get('eid', False):
		subs = Submission.objects.filter(eid=data['eid'])
		if subs:
			return JsonResponse({
				'status': 'OK',
				'submission': {
					'sender_id': subs[0].sender_id,
					'target_task_id': subs[0].target_task_id,
					'submit_image_id': subs[0].submit_image_id
				}
			})
		else:
			return JsonResponse({
				'status': 'FAILED'
			})

	sender = get_request_sender(request)
	if sender is None: return JsonResponse({
		'status': 'FAILED',
		'error': 'you are unathorized'
	})

	subs = Submission.objects.filter(
		sender_id=sender.eid,
		target_task_id=data['target_task_id'],
		submit_number=data['submit_number']
	)

	if not subs:
		return JsonResponse({
			'status': 'FAILED',
			'error': 'No such submission'
		})
	return JsonResponse({
		'status': 'OK',
		'submission': {
			'sender_id': subs[0].sender_id,
			'target_task_id': subs[0].target_task_id,
			'submit_image_id': subs[0].submit_image_id
		}
	})

def get_submissions(request):
	data = request.GET if request.method == 'GET' else request.POST
	if data.get('only_ids', False):
		user = get_request_sender(request)
		if not user:
			return JsonResponse({
				'status': 'FAILED'
			})
		return JsonResponse({
			'status': 'OK',
			'ids': [sub.eid for sub in Submission.objects.filter(sender_id=user.eid)]
		})
	return HttpResponse(str(Submission.objects.all()))