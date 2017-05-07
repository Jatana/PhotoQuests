from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import re
from PQDB.models import User, Task, Image
from PQDB.image_views import add_image
from Random.random_engine import random_id_no_coll, random_id
# Create your views here.

EMAIL_RE = re.compile(r'[a-zA-Z0-9_]+@[a-zA-Z0-9_]+.[a-zA-Z0-9_]+')
LOGIN_RE = re.compile(r'[a-zA-Z0-9_]')


def validate_register_data(data):
	rules = {
		'username': {
			'max_length': 50,
			'min_length': 3
		},
		'password': {
			'max_length': 128,
			'min_length': 10
		},
		'email': {
			'max_length': 128,
			'min_length': 1
		}
	}

	for key in rules.keys():
		if data.get(key, None) is None:
			return {
				'key': key,
				'error': 'specify ' + key
			}

		if not (rules[key]['min_length'] <= len(data[key]) <= rules[key]['max_length']):
			return {
				'key': key,
				'error': 'length of {key} must be from {min_length} to {max_length}'.format(
					key=key,
					min_length=rules[key]['min_length'],
					max_length=rules[key]['max_length']
				)
			}
	if not LOGIN_RE.match(data['username']):
		return {
			'key': 'username',
			'error': 'Bad chars in username',
		}
	if not EMAIL_RE.match(data['email']):
		return {
			'key': 'email',
			'error': 'Bad email'
		}

def validate_login_data(data):
	if data.get('username', None) is None:
		return {
			'key': 'username',
			'error': 'specify username'
		}

	if data.get('password', None) is None:
		return {
			'key': 'password',
			'error': 'specify password'
		}

def get_request_sender(request):
	data = request.COOKIES
	if data.get('session_id', None) is not None:
		if len(data['session_id']) < 10: return None
		users = User.objects.filter(session_id=data['session_id'])
		if not users: return None
		return users[0]
	return None

def get_user_data(request):
	user = get_request_sender(request)
	if not user:
		return JsonResponse({
			'status': 'FAILED',
			'error': 'No session'
		})
	return JsonResponse({
		'status': 'OK',
		'user': {
			'name': user.login,
			'profile_image_id': user.profile_image_id
		}
	})

def register(request):
	data = request.GET if request.method == 'GET' else request.POST
	# print (request.scheme)
	val = validate_register_data(data)
	if val:
		val['status'] = 'FAILED'
		return JsonResponse(val)
	else:
		if User.objects.filter(login=data['username']):
			return JsonResponse({
				'status': 'FAILED',
				'error': 'User with this username already exist'
			})

		if User.objects.filter(email=data['email']):
			return JsonResponse({
				'status': 'FAILED',
				'error': 'user with this email already exist'
			})

		user = User(
			login=data['username'],
			password=data['password'],
			email=data['email'],
			eid=random_id_no_coll(User.objects),
			session_id="-1",
			session_expire="-1"
		)
		user.save()
		return JsonResponse({
			'status': 'OK',
			'msg': 'user added'
		})

def login(request):
	data = request.GET if request.method == 'GET' else request.POST
	val = validate_login_data(data)
	if val:
		val['status'] = 'FAILED'
		return JsonResponse(val)
	else:
		users = User.objects.filter(login=data['username'])
		if not users:
			return JsonResponse({
				'status': 'FAILED',
				'error': 'User with this name does not exist',
				'key': 'username'
			})
		if users[0].password != data['password']:
			return JsonResponse({
				'status': 'FAILED',
				'error': 'Incorrect password',
				'key': 'password'
			})

		users[0].session_id = random_id()
		resp = JsonResponse({
			'status': 'OK',
		})

		users[0].save()

		resp.set_cookie('session_id', users[0].session_id)
		return resp

def update_profile_image(request):
	user = get_request_sender(request)
	if user is None:
		return JsonResponse({
			'status': 'FAILED',
			'error': 'auth?'
		})

	if user.profile_image_id:
		img = Image.objects.filter(eid=user.profile_image_id)[0]
		img.delete()

	new_img_id = add_image(request.FILES['image'].read(), 'png')
	user.profile_image_id = new_img_id
	user.save()
	return JsonResponse({
		'status': 'OK',
		'new_id': user.profile_image_id
	})

def get_users_ratings(request):
	users_json = []
	for user in User.objects.all():
		users_json.append({
			'name': user.login,
			'rating': user.rating
		})
	return JsonResponse({
		'status': 'OK',
		'users': users_json	
	})

def all_users(request):
	users_json = []
	for user in User.objects.all():
		users_json.append({
			'name': user.login,
			'session_id': user.session_id
		})

	return JsonResponse({
		'status': 'OK',
		'users': users_json
	})