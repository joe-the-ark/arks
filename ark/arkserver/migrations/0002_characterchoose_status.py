# Generated by Django 2.1.3 on 2019-02-28 11:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('arkserver', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='characterchoose',
            name='status',
            field=models.IntegerField(choices=[(0, '正常'), (1, '已展示')], default=0, verbose_name='性格展示状态'),
        ),
    ]
