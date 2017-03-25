"""PhotoQuests URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from django.contrib import admin
from PhotoQuests.Pages.MainPage import Handler as MainPageHandler
from PhotoQuests.Pages.ChooseTaskPage import Handler as ChooseTaskPageHandler
from PhotoQuests.Pages.Register import Handler as RegisterPageHandler
from PhotoQuests.Pages.AddTask import Handler as AddTaskPageHandler
from PQDB import user_views as userdb
from PQDB import task_views as taskdb

urlpatterns = [
    # url(r'^admin/', admin.site.urls),
    url(r'^choosetask/', ChooseTaskPageHandler.load_page),
    url(r'^register', RegisterPageHandler.load_page),
    url(r'^add_task', AddTaskPageHandler.load_page),
    url(r'^cli/register/', userdb.register),
    url(r'^cli/add_task/', taskdb.create_task),
    url(r'^cli/get_tasks/', taskdb.get_tasks),
    url(r'^cli/login/', userdb.login),
    url(r'^', MainPageHandler.load_page),
]
