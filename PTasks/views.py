from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import re
from PTasks.models import Task

# Create your views here.

def validate_create_task_data(data):
	rules = {
		'name': {
			'max_length': 50,
			'min_length': 3
		},
		'description': {
			'max_length': 128,
			'min_length': 10
		},
		'difficuilty': {
			'max_length': 128,
			'min_length': 1
		}
		'location': {
			'max_length': 1000,
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


def create_task(request):
	data = request.GET if request.method == 'GET' else request.POST

	val = validate_create_task_data(data)
	if val:
		val['status'] = 'FAILED'
		return JsonResponse(val)
	
	

