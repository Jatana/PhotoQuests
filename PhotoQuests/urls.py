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
from PhotoQuests.Pages.Top import Handler as TopPageHandler
from PhotoQuests.Pages.About import Handler as AboutHandler
from PhotoQuests.Pages.Register import Handler as RegisterPageHandler
from PhotoQuests.Pages.AddTask import Handler as AddTaskPageHandler
from PhotoQuests.Pages.Profile import Handler as ProfilePageHandler
from PhotoQuests.Pages.Rate import Handler as RatePageHandler
from PhotoQuests.Pages.Training import Handler as TrainingHandler
from PQDB import user_views as userdb
from PQDB import task_views as taskdb
from PQDB import submit_views as submitdb
from PQDB import image_views as imagedb

urlpatterns = [
    # url(r'^admin/', admin.site.urls),
    url(r'^choosetask/', ChooseTaskPageHandler.load_page),
    url(r'^choosetask', ChooseTaskPageHandler.load_page),
    url(r'^tasks', ChooseTaskPageHandler.load_page),
    url(r'^top', TopPageHandler.load_page),
    url(r'^about', AboutHandler.load_page),
    url(r'^register', RegisterPageHandler.load_page),
    url(r'^add_task', AddTaskPageHandler.load_page),
    url(r'^profile', ProfilePageHandler.load_page),
    url(r'^rate', RatePageHandler.load_page),
    url(r'^training', TrainingHandler.load_page),
    url(r'^cli/register/', userdb.register),
    url(r'^cli/add_task/', taskdb.create_task),
    url(r'^cli/get_tasks/', taskdb.get_tasks),
    url(r'^cli/add_submission/', submitdb.create_submit),
    url(r'^cli/get_submissions/', submitdb.get_submissions),
    url(r'^cli/get_submission/', submitdb.get_submission),
    url(r'^cli/clear_submissions/', submitdb.clear_submissions),
    url(r'^cli/clear_tasks/', taskdb.clear_tasks),
    url(r'^cli/all_submissions/', submitdb.get_all_submissions),
    url(r'^cli/all_images/', imagedb.all_images),
    url(r'^cli/get_image/', imagedb.get_image),
    url(r'^cli/clear_images/', imagedb.clear_images),
    url(r'^cli/login/', userdb.login),
    url(r'^cli/get_user_data/', userdb.get_user_data),
    url(r'^cli/userdb/update_profile_image/', userdb.update_profile_image),
    url(r'^cli/all_users/', userdb.all_users),
    url(r'^cli/get_users_ratings/', userdb.get_users_ratings),
    url(r'^', ChooseTaskPageHandler.load_page),
]
