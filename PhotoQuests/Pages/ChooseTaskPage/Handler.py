from django.http import HttpResponse
from django.template import Template, Context
from PhotoQuests.templates.load_engine import get_templates
from django.template.context_processors import csrf
# from Server.LoadEngine import load_template

def load_page(request):
	main_page = Template(open('PhotoQuests/Pages/ChooseTaskPage/index_pre2.html').read())
	temp = get_templates()
	temp.update(csrf(request))
	context = Context(temp)
	main_page = main_page.render(context)
	return HttpResponse(main_page)

