# -*- coding: utf-8 -*-
# Generated by Django 1.9.1 on 2017-03-27 06:11
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('PQDB', '0002_auto_20170326_1725'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bookmark',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('setter_user_id', models.CharField(max_length=1000)),
                ('target_task_id', models.CharField(max_length=1000)),
            ],
        ),
    ]