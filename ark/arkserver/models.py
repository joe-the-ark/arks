from django.db import models

# Create your models here.

class Player(models.Model):
    name = models.CharField(max_length=100, verbose_name='玩家名')
    game_secret = models.CharField(max_length=200, verbose_name='游戏房间密码', null=True, blank=True)
    game_name = models.CharField(max_length=200, verbose_name='游戏名称')
    inviter_name = models.CharField(max_length=200, verbose_name='邀请人名称')

    class Meta(object):
            verbose_name = verbose_name_plural = '玩家表'

    def __str__(self):
        return self.name

class Game(models.Model):
    game_secret = models.CharField(max_length=200, verbose_name='游戏房间密码', null=True, blank=True)
    game_name = models.CharField(max_length=200, verbose_name='游戏名称')
    inviter = models.ForeignKey(Player, on_delete=models.CASCADE, verbose_name='游戏发起人', related_name='inviter_game')
    status = models.IntegerField(
        default=0,
        choices=((0, '正常'), (1, '已结束')),
        verbose_name='游戏状态'
    )

    class Meta(object):
            verbose_name = verbose_name_plural = '游戏表'

    def __str__(self):
        return 'name:' + self.game_name + '，' + 'inviter:'+self.inviter.name

class Character(models.Model):
    name = models.CharField(max_length=100, verbose_name='性格')
    class Meta(object):
            verbose_name = verbose_name_plural = '性格表'

    def __str__(self):
        return self.name

class CharacterChoose(models.Model):
    character_one = models.ForeignKey(Character, on_delete=models.CASCADE, verbose_name='性格一', related_name='character_one')
    character_two = models.ForeignKey(Character, on_delete=models.CASCADE, verbose_name='性格二', related_name='character_two')
    player = models.ForeignKey(Player, on_delete=models.CASCADE, verbose_name='选择人')
    game = models.ForeignKey(Game, on_delete=models.CASCADE, verbose_name='游戏')
    status = models.IntegerField(
        default=0,
        choices=((0, '正常'), (1, '已展示')),
        verbose_name='性格展示状态'
    )

    class Meta(object):
            verbose_name = verbose_name_plural = '性格选择表'

    def __str__(self):
        return self.character_one.name +','+self.character_two.name

class PlayerScore(models.Model):
    character_choose = models.ForeignKey('CharacterChoose', on_delete=models.CASCADE)
    score = models.CharField(max_length=100, verbose_name='分数')
    scorer = models.ForeignKey(Player, on_delete=models.CASCADE, verbose_name='打分人', related_name='scorer_score')
    player = models.ForeignKey(Player, on_delete=models.CASCADE, verbose_name='被打分人', related_name='player_score')
    game = models.ForeignKey('Game', on_delete=models.CASCADE, verbose_name='游戏')

    class Meta(object):
            verbose_name = verbose_name_plural = '玩家打分表'

    def __str__(self):
        return self.player.name + ':'+ self.score



