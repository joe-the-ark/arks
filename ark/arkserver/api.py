from restapi import api, APIError
from .models import *
import requests
import json
import string
import random
import time
import hashlib

@api
def create_player(player_name, game_secret, gameName, inviter):

    player = Player.objects.filter(name=player_name, game_secret=game_secret, game_name=gameName, inviter_name=inviter).first()
    if not player:
        player = Player.objects.create(name=player_name, game_secret=game_secret, game_name=gameName, inviter_name=inviter)

    return {'code': 0, 'msg': '创建玩家成功'}

@api
def create_game(inviter, gameName, game_id):
    player = Player.objects.filter(name=inviter, game_secret=game_id, game_name=gameName, inviter_name=inviter).first()
    if not player:
        player = Player.objects.create(name=inviter, game_secret=game_id, game_name=gameName, inviter_name=inviter)

    game = Game.objects.create(game_secret=game_id, game_name=gameName, inviter=player)

    # character_one = Character.objects.filter(name='Insufficiently').first()
    # character_two = Character.objects.filter(name='Fully').first()
    # print(character_two)
    # print(character_one)
    # CharacterChoose.objects.create(
    #     character_one=character_one, character_two=character_two,
    #     player=player, game=game
    # )

    return {'code': 0}


@api
def get_game_list(**params):

    games = Game.objects.filter(status=0)

    game_list = []
    for game in games:
        game_list.append([game.game_secret, game.game_name, game.inviter.name])

    return {'code': 0, 'gameList':game_list}


@api
def find_players(game_secret, gameName):
    players = Player.objects.filter(game_secret=game_secret, game_name=gameName)
    player_list = [ p.name for p in players]

    return {'code': 0, 'player_list': player_list}

@api
def get_player_list(game_secret, gameName, inviter):
    players = Player.objects.filter(game_secret=game_secret, game_name=gameName, inviter_name=inviter)
    player_list = [ p.name for p in players ]

    return {'code': 0, 'player_list': player_list}


@api
def get_character_list():

    characters = [ _.name for _ in Character.objects.all()]

    return {'code': 0, 'characters': characters}

@api
def set_player_score(
    params, inviter_name, gameSecret, player, gameName,
    charaChooser, characterOne, characterTwo):

    # print(params, inviter_name, gameSecret, player, gameName, charaChooser, characterOne, characterTwo, sep='\n')

    inviter = Player.objects.filter(
        name=inviter_name,
        inviter_name=inviter_name,
        game_name=gameName,
        game_secret=gameSecret
    ).first()


    scorer = Player.objects.filter(
        name=player,
        inviter_name=inviter_name,
        game_name=gameName,
        game_secret=gameSecret
    ).first()

    print(player)
    print(inviter_name)
    print(scorer)

    charaChooser2 = Player.objects.filter(
        name=charaChooser,
        inviter_name=inviter_name,
        game_name=gameName,
        game_secret=gameSecret
    ).first()

    game = Game.objects.filter(
        game_secret=gameSecret,
        inviter=inviter,
        game_name=gameName,
        status=0
    ).first()

    character_one = Character.objects.filter(name=characterOne).first()
    character_two = Character.objects.filter(name=characterTwo).first()


    characterChoose = CharacterChoose.objects.filter(
        character_one = character_one,
        character_two = character_two,
        player=charaChooser2,
        game=game
    ).first()

    for k, v in params.items():
        _player = Player.objects.filter(
            name=k, game_secret=gameSecret, game_name=gameName, inviter_name=inviter_name
        ).first()


        playerScore = PlayerScore.objects.filter(
            character_choose=characterChoose,
            scorer=scorer,
            player=_player,
            game=game
        ).first()

        if playerScore:
            playerScore.score = v
            playerScore.save()
        else:
            PlayerScore.objects.create(
                character_choose=characterChoose,
                score=v,
                scorer=scorer,
                player=_player,
                game=game
            )

    return {'code':0, 'msg':'打分成功'}

@api
def save_character_choose(inviterName, gameSecret, playerName, gameName, charaChooser):

    character_one = Character.objects.filter(name=charaChooser[0]).first()
    character_two = Character.objects.filter(name=charaChooser[1]).first()

    player = Player.objects.filter(
        name=playerName, game_secret=gameSecret,
        inviter_name=inviterName, game_name=gameName
    ).first()

    inviter = Player.objects.filter(
        name=inviterName, inviter_name=inviterName,
        game_name=gameName, game_secret=gameSecret
    ).first()

    game = Game.objects.filter(
        game_secret=gameSecret, inviter=inviter,
        game_name=gameName, status=0
    ).first()


    cc = CharacterChoose.objects.filter(player=player, game=game).first()
    if cc:
        cc.character_one = character_one
        cc.character_two = character_two
        cc.save()
    else:
        CharacterChoose.objects.create(
            character_one=character_one, character_two=character_two,
            player=player, game=game
        )

    return {'code:':0}

@api
def get_player_score(inviter, gameName, gameSecret, player, character_one, character_two, chooser):


    _player = Player.objects.filter(
        name=player, game_secret=gameSecret,
        inviter_name=inviter, game_name=gameName
    ).first()

    _inviter = Player.objects.filter(
        name=inviter, game_secret=gameSecret,
        inviter_name=inviter, game_name=gameName
    ).first()

    chooser = Player.objects.filter(
        name=chooser, game_secret=gameSecret,
        inviter_name=inviter, game_name=gameName
    ).first()

    game = Game.objects.filter(
        game_secret=gameSecret,
        inviter=_inviter,
        game_name=gameName,
        status=0
    ).first()


    character_one = Character.objects.filter(name=character_one).first()
    character_two = Character.objects.filter(name=character_two).first()
    characterChoose = CharacterChoose.objects.filter(
        character_one=character_one, character_two=character_two,
        player=chooser, game=game
    ).first()

    player_scores = PlayerScore.objects.filter(game=game, player=_player, character_choose=characterChoose)

    player_list = []
    player_score_list = []

    for _ in player_scores:
        # if _.scorer.id == _player.id:
        #     continue
        player_list.append(_.scorer.name)
        player_score_list.append(int(_.score))

    _player_score_list = []


    for _ in player_scores:
        if _.scorer.id == _player.id:
            continue
        _player_score_list.append(_.score)


    if len(_player_score_list):
        middle = int(sum(list(map(int, _player_score_list))) / len(_player_score_list))
    else:
        middle = 0

    # player_list.append(player)
    # player_score_list.append(middle)

    return {'code':0, 'player_score_list':player_score_list, 'player_list': player_list, 'middle': middle}


@api
def get_player_characterlist(game_secret,inviter,player,gameName):

    _inviter = Player.objects.filter(
        name=inviter, inviter_name=inviter,
        game_name=gameName, game_secret=game_secret
    ).first()

    game = Game.objects.filter(
        game_secret=game_secret, inviter=_inviter,
        game_name=gameName, status=0
    ).first()

    cha_list = CharacterChoose.objects.filter(game=game)

    data = [ [_.player.name, [_.character_one.name, _.character_two.name]]  for _ in cha_list if cha_list]

    return {'code':0, 'data':data}


@api
def get_game_score(characterListParams, inviter, gameSecret, player, gameName):

    _player = Player.objects.filter(
        name=player, game_secret=gameSecret,
        inviter_name=inviter, game_name=gameName
    ).first()  # 取当前玩家名

    _inviter = Player.objects.filter(
        name=inviter, game_secret=gameSecret,
        inviter_name=inviter, game_name=gameName
    ).first()

    game = Game.objects.filter(
        game_secret=gameSecret,
        inviter=_inviter,
        game_name=gameName,
        status=0
    ).first()

    chooser_list = characterListParams[0]
    character_list = characterListParams[1]
    playercount = len(chooser_list)

    result_list = []
    player_scores = []

    # print('characterListParams:'+characterListParams)

    for index in range(0, playercount):

        result = [character_list[index][0], character_list[index][1]]

        chooser = Player.objects.filter(
            name=chooser_list[index], game_secret=gameSecret,
            inviter_name=inviter, game_name=gameName
        ).first()

        character_one = Character.objects.filter(name=character_list[index][0]).first()
        character_two = Character.objects.filter(name=character_list[index][1]).first()

        characterChoose = CharacterChoose.objects.filter(
            character_one=character_one, character_two=character_two,
            player=chooser, game=game
        ).first()

        player_scores = PlayerScore.objects.filter(game=game, player=_player, character_choose=characterChoose)
        count = player_scores.count()

        _player_score_list = []

        if count == playercount:
            player_score = 0
            for _ in player_scores:
                if _.scorer.id == _player.id:
                    player_score = _.score
                    # continue
                _player_score_list.append(_.score)

            middle = str(int(sum(list(map(int, _player_score_list))) / len(_player_score_list)))

            result.append(middle)
            result.append(player_score)
        result_list.append(result)


    _inviter = Player.objects.filter(
        name=inviter, game_secret=gameSecret,
        inviter_name=inviter, game_name=gameName
    ).first()

    game = Game.objects.filter(
        game_secret=gameSecret,
        inviter=_inviter,
        game_name=gameName,
        status=0
    ).first()

    players = Player.objects.filter(
        game_secret=gameSecret, inviter_name=inviter, game_name=gameName
    )
    ttsms = []
    for _player in players:

        chooser_list = characterListParams[0]
        character_list = characterListParams[1]
        playercount = len(chooser_list)

        middles = []
        for index in range(0, playercount):
            chooser = Player.objects.filter(
                name=chooser_list[index], game_secret=gameSecret,
                inviter_name=inviter, game_name=gameName
            ).first()
            character_one = Character.objects.filter(name=character_list[index][0]).first()
            character_two = Character.objects.filter(name=character_list[index][1]).first()
            characterChoose = CharacterChoose.objects.filter(
                character_one=character_one, character_two=character_two,
                player=chooser, game=game
            ).first()
            player_scores = PlayerScore.objects.filter(game=game, player=_player, character_choose=characterChoose)
            print(player_scores)
            _player_score_list = []

            for _ in player_scores:
                _player_score_list.append(_.score)

            middle = int(sum(list(map(int, _player_score_list))) / len(_player_score_list))
            middles.append(middle)
            print(middles)
        ttsms.append(str(int(sum(middles) / playercount)))

    print('ttsms11111111:')
    print(ttsms)

    return {'code':0, 'result': result_list, 'ttsms':ttsms}


@api
def save_players_process(inviter_name, game_secret, player, game_name, process, *args, **kwargs):

    _player = Player.objects.filter(
        name=player, game_secret=game_secret,
        inviter_name=inviter_name, game_name=game_name
    ).first()

    _inviter = Player.objects.filter(
        name=inviter_name, game_secret=game_secret,
        inviter_name=inviter_name, game_name=game_name
    ).first()

    game = Game.objects.filter(
        game_secret=game_secret,
        inviter=_inviter,
        game_name=game_name,
        status=0
    ).first()

    game_process = GameProcess.objects.filter(game=game, player=_player).first()
    if game_process:  # 之前存在的process
        game_process.process = process  # 赋值给新的game_process
        game_process.save()  # 保存进度

    else:  # 玩家没有进度的情况
        GameProcess.objects.create(game=game, player=_player, process=process)

@api
def get_players_process(game_secret, inviter_name, player, gameName):

    _player = Player.objects.filter(
        name=player, game_secret=game_secret,
        inviter_name=inviter_name, game_name=gameName
    ).first()

    _inviter = Player.objects.filter(
        name=inviter_name, game_secret=game_secret,
        inviter_name=inviter_name, game_name=gameName
    ).first()


    game = Game.objects.filter(
        game_secret=game_secret,
        inviter=_inviter,
        game_name=gameName,
        status=0
    ).first()

    playercount = Player.objects.filter(game_secret=game_secret, inviter_name=inviter_name, game_name=gameName).count()

    gameProcess = GameProcess.objects.filter(game=game, player=_player).first()
    if gameProcess:
        process = gameProcess.process
        if process[0] == '2':
            return {'code':0, 'process':'2.0', 'playercount':playercount}

        elif process[0] == '3':
            return {'code':0, 'process':3, 'processson':int(process[2]), 'playercount':playercount}

        elif process[0] == '4':
            return {'code':0, 'process':4, 'playercount':playercount}


    return {'code': 0, 'process':1}

@api
def get_ttsm(characterListParams, inviter, gameSecret, player, gameName):

    _inviter = Player.objects.filter(
        name=inviter, game_secret=gameSecret,
        inviter_name=inviter, game_name=gameName
    ).first()

    game = Game.objects.filter(
        game_secret=gameSecret,
        inviter=_inviter,
        game_name=gameName,
        status=0
    ).first()

    players = Player.objects.filter(
        game_secret=gameSecret, inviter_name=inviter, game_name=gameName
    )

    print(players)
    ttsms = []
    for _player in players:

        chooser_list = characterListParams[0]
        character_list = characterListParams[1]
        playercount = len(chooser_list)

        middles = []
        for index in range(0, playercount):
            chooser = Player.objects.filter(
                name=chooser_list[index], game_secret=gameSecret,
                inviter_name=inviter, game_name=gameName
            ).first()

            character_one = Character.objects.filter(name=character_list[index][0]).first()
            character_two = Character.objects.filter(name=character_list[index][1]).first()
            characterChoose = CharacterChoose.objects.filter(
                character_one=character_one, character_two=character_two,
                player=chooser, game=game
            ).first()
            player_scores = PlayerScore.objects.filter(game=game, player=_player, character_choose=characterChoose)
            print(player_scores)
            _player_score_list = []

            for _ in player_scores:
                _player_score_list.append(_.score)

            middle = int(sum(list(map(int, _player_score_list))) / len(_player_score_list))
            middles.append(middle)

            print(middles)

        ttsms.append(str(int(sum(middles) / playercount)))

    print(ttsms)

    return {'code':0, 'result':ttsms}


@api
def wechatapi(url):

    url = url
    appid = 'wx4f735f8d65cf5f28'
    secret = '101a2636c102453e871a7beed1cfefb1'
    access_token_params = {
        'appid': appid,
        'secret': secret,
        'grant_type': 'client_credential'
    }
    get_access_token_url = 'https://api.weixin.qq.com/cgi-bin/token'

    response = requests.get(url=get_access_token_url, params=access_token_params)
    response.encoding = 'utf-8'
    print(response)
    response = json.loads(response.text)
    print(response)
    access_token = response['access_token']
    get_jsapi_ticket_url = 'https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token={0}&type=jsapi'.format(access_token)

    jsapi_response = requests.get(url=get_jsapi_ticket_url)
    jsapi_response.encoding = 'utf-8'
    print(jsapi_response)
    jsapi_response = json.loads(jsapi_response.text)
    jsapi_ticket = jsapi_response['ticket']
    print(jsapi_response)

    noncestr = ''.join(random.sample(string.ascii_letters + string.digits, 8))

    timestamp = int(time.time())

    string1 = 'jsapi_ticket={0}&noncestr={1}&timestamp={2}&url={3}'.format(jsapi_ticket, noncestr, timestamp, url)
    print(string1)
    signature = hashlib.sha1(string1.encode('utf-8')).hexdigest()

    params = {
        'appId': appid,
        'timestamp': timestamp,
        'nonceStr': noncestr,
        'signature': signature,
        'jsApiList': ['onMenuShareAppMessage', 'checkJsApi']

    }

    return {'code': 0, 'params': params}


@api
def firstvote():

    pass

