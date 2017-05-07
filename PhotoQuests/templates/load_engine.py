from django.template import Context, Template

def get_templates():
	temp = {
		'static_list': open('PhotoQuests/templates/static_list.html').read(),
		'login_panel': open('PhotoQuests/templates/Login/login.html').read(),
		'logo': open('PhotoQuests/templates/Logotype.html').read(),
		'add_task': open('PhotoQuests/templates/add_task.html').read(),
		'static_jquery': open('PhotoQuests/templates/static_jquery.html').read(),
		'screen_darker': open('PhotoQuests/templates/screen_darker.html').read(),
		'authentication': open('PhotoQuests/templates/authentication.html').read()
	}

	temp['header'] = Template(open('PhotoQuests/templates/Header/header.html').read()).render(
		Context(temp)
	)

	return temp