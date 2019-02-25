from restapi import api, APIError
from .models import *

@api
def create_player(player_name, game_secret, gameName, inviter):

    player = Player.objects.filter(name=player_name, game_secret=game_secret, game_name=gameName, inviter_name=inviter).first()
    if not player:
        player = Player.objects.create(name=player_name, game_secret=game_secret, game_name=gameName, inviter_name=inviter)

    return {'code': 0, 'msg': '创建玩家成功'}

@api
def create_game(inviter, gameName, game_id):
    print(inviter)
    print(gameName)
    print(game_id)

    player = Player.objects.filter(name=inviter, game_secret=game_id, game_name=gameName, inviter_name=inviter).first()
    if not player:
        player = Player.objects.create(name=inviter, game_secret=game_id, game_name=gameName, inviter_name=inviter)

    Game.objects.create(game_secret=game_id, game_name=gameName, inviter=player)

    return {'code': 0}


@api
def get_game_list(**params):

    games = Game.objects.filter(status=0)

    game_list = []
    for game in games:
        game_list.append([game.game_secret, game.game_name, game.inviter.name])

    print(game_list)

    return {'code': 0, 'gameList':game_list}


@api
def find_players(game_secret, gameName):
    # game = Game.objects.filter(game_secret=game_secret, game_name=gameName).first()
    players = Player.objects.filter(game_secret=game_secret, game_name=gameName)

    player_list = [ p.name for p in players]
    print(player_list)

    return {'code': 0, 'player_list': player_list}

@api
def get_player_list(game_secret, gameName, inviter):
    players = Player.objects.filter(game_secret=game_secret, game_name=gameName, inviter_name=inviter)
    player_list = [ p.name for p in players ]

    return {'code': 0, 'player_list': player_list}


@api
def get_character():

    characters = [ _.name for _ in Character.objects.all()]

    return {'code': 0, 'characters': characters}