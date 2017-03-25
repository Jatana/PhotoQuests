from django.http import HttpResponse
from django.template import Template, Context
# from Server.LoadEngine import load_template

def load_page(request):
	main_page = Template(open('PhotoQuests/Pages/MainPage/index.html').read())
	context = Context({
		# "header": load_template('header.html'),
		# "default_style_links": load_template('default_style_links.html')
	})
	main_page = main_page.render(context)
	return HttpResponse(main_page)

