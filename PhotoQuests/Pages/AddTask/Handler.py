from django.http import HttpResponse
from django.template import Template, Context
from PhotoQuests.templates.load_engine import get_templates
# from Server.LoadEngine import load_template

def load_page(request):
	main_page = Template(open('PhotoQuests/Pages/AddTask/index_pre2.html').read())
	context = Context(get_templates())
	main_page = main_page.render(context)
	return HttpResponse(main_page)