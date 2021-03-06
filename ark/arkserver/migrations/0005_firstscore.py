# Generated by Django 2.1.3 on 2019-03-18 11:26

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('arkserver', '0004_auto_20190315_1201'),
    ]

    operations = [
        migrations.CreateModel(
            name='FirstScore',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_score', models.CharField(max_length=20, verbose_name='first score')),
                ('game', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='arkserver.Game', verbose_name='game')),
                ('player', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='arkserver.Player', verbose_name='player')),
            ],
            options={
                'verbose_name': 'first score',
                'verbose_name_plural': 'first score',
            },
        ),
    ]
