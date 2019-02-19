from django.db import models

# Create your models here.

class Player(models.Model):
    name = models.CharField(max_length=100, verbose_name='玩家名')
    game = models.ForeignKey('Game', on_delete=models.CASCADE, verbose_name='游戏组')

class Game(models.Model):
    game_id = models.CharField(max_length=200, verbose_name='游戏id')


