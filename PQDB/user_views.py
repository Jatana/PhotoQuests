from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import re
from PQDB.models import User, Task
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



def register(request):
	data = request.GET if request.method == 'GET' else request.POST
	print (request.scheme)
	val = validate_register_data(data)
	if val:
		val['status'] = 'FAILED'
		return JsonResponse(val)
	else:
		if User.objects.filter(name=data['username']):
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
			name=data['username'],
			password=data['password'],
			email=data['email']
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
		users = User.objects.filter(name=data['username'])
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
		return JsonResponse({
			'status': 'OK',
		})