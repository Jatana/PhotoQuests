"""
WSGI config for PhotoQuests project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/1.9/howto/deployment/wsgi/
"""


import os
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "PhotoQuests.settings")

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
try:
	from whitenoise.django import DjangoWhiteNoise
	application = DjangoWhiteNoise(application)
except:
	pass
	"""
	if except there host is localhost
	"""