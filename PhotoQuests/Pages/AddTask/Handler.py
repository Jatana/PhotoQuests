from django.http import HttpResponse
from django.template import Template, Context
# from Server.LoadEngine import load_template

def load_page(request):
	page = Template(open('PhotoQuests/Pages/AddTask/index.html').read())
	context = Context({
		# "header": load_template('header.html'),
		# "default_style_links": load_template('default_style_links.html')
	})
	page = page.render(context)
	return HttpResponse(page)

