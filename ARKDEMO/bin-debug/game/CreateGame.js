var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var game;
(function (game) {
    var CreateGame = (function (_super) {
        __extends(CreateGame, _super);
        function CreateGame(stageWidth, stageHeight, nickname, openid, game_secret, inviter, status) {
            var _this = _super.call(this) || this;
            _this.count = 0;
            _this.playerList = [];
            _this.characterList = [];
            _this.allcharacterlist = [];
            _this.sprite = new egret.Sprite();
            _this.sprite.width = stageWidth;
            _this.sprite.height = stageHeight;
            _this.addChild(_this.sprite);
            _this.nickname = nickname;
            _this.player = nickname;
            alert(nickname);
            _this.openid = openid;
            _this.status = status;
            _this.game_secret = game_secret;
            _this.inviter = inviter;
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.label2 = new egret.TextField();
            _this.label2.text = "be ready friends: ";
            _this.label2.height = 30;
            _this.label2.anchorOffsetX = _this.label2.width / 2;
            _this.label2.anchorOffsetY = _this.label2.height / 2;
            _this.label2.x = _this.stageWidth / 2;
            _this.label2.y = _this.stageHeight / 6;
            _this.label2.background = true;
            _this.label2.backgroundColor = 0xffffff;
            _this.label2.border = true;
            _this.label2.borderColor = 0x00ff00;
            _this.label2.fontFamily = "Arial";
            _this.label2.textColor = 0xFF0000;
            _this.sprite.addChild(_this.label2);
            if (status == 'inviter') {
                _this.label = new egret.TextField();
                _this.label.text = "Click on the top right corner to invite friends ";
                _this.label.height = 30;
                _this.label.anchorOffsetX = _this.label.width / 2;
                _this.label.anchorOffsetY = _this.label.height / 2;
                _this.label.x = _this.stageWidth / 2;
                _this.label.y = _this.stageHeight / 10;
                _this.label.background = true;
                _this.label.backgroundColor = 0xffffff;
                _this.label.border = true;
                _this.label.borderColor = 0x00ff00;
                _this.label.fontFamily = "Arial";
                _this.label.textColor = 0xFF0000;
                _this.sprite.addChild(_this.label);
                _this.label3 = new egret.TextField();
                _this.label3.text = "play game";
                _this.label3.height = 30;
                _this.label3.width = 180;
                _this.label3.anchorOffsetX = _this.label3.width / 2;
                _this.label3.anchorOffsetY = _this.label3.height / 2;
                _this.label3.x = _this.stageWidth / 2;
                _this.label3.y = _this.stageHeight / 1.5;
                _this.label3.background = true;
                _this.label3.backgroundColor = 0xffffff;
                _this.label3.border = true;
                _this.label3.borderColor = 0x00ff00;
                _this.label3.touchEnabled = true;
                _this.label3.fontFamily = "Arial";
                _this.label3.textColor = 0xFF0000;
                _this.label3.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
                _this.sprite.addChild(_this.label3);
                _this.invateFriends();
            }
            _this.timer = new egret.Timer(1000, 0);
            _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.getPlayeList, _this);
            _this.timer.start();
            return _this;
        }
        CreateGame.prototype.getPlayeList = function () {
            var self = this;
            base.API.Init("http://work.metatype.cn:8105/api/");
            // base.API.Init("http://127.0.0.1:8000/api/")
            base.API.call('getPlayerList', { 'inviter_name': self.inviter, 'game_secret': self.game_secret, 'gameName': self.game_secret }).then(function (response) {
                var playerList = response['result'];
                playerList.forEach(function (val, index, array) {
                    var player_name = new egret.TextField();
                    player_name.text = val;
                    player_name.textAlign = egret.HorizontalAlign.CENTER;
                    player_name.size = 30;
                    player_name.lineSpacing = 10;
                    player_name.touchEnabled = true;
                    player_name.border = true;
                    if (val.length * 20 < 100) {
                        player_name.width = 100;
                    }
                    else {
                        player_name.width = val.length * 18;
                    }
                    player_name.borderColor = 0x00ff00;
                    player_name.x = 70;
                    player_name.y = 300 + index * 50;
                    self.sprite.addChild(player_name);
                });
            });
            if (self.status == 'player') {
                base.API.call('getGameStatus', { 'inviter_name': self.inviter, 'game_secret': self.game_secret, 'gameName': self.game_secret, 'openid': self.openid, 'nickname': self.nickname }).then(function (response) {
                    var status = response['result'];
                    if (status == 3) {
                        base.API.call('get_players_process', {
                            'game_secret': self.game_secret,
                            'inviter_name': self.inviter,
                            'player': self.nickname,
                            'gameName': self.game_secret
                        }).then(function (response) {
                            console.log(response);
                            var process = response['process'];
                            if (process == '0.1') {
                                var playerCount = response['playercount'];
                                var playerScore = response['playerScore'];
                                var game_secret = self.game_secret;
                                var inviter_1 = self.inviter;
                                var player = self.player;
                                var gameName_1 = self.game_secret;
                                var stageWidth = self.stageWidth;
                                var stageHeight = self.stageHeight;
                                var initiatePartialInsights = new game.InitiatePartialInsights(game_secret, inviter_1, player, gameName_1, stageWidth, stageHeight, playerCount, playerScore);
                                self.timer.stop();
                                self.sprite.visible = false;
                                self.stage.addChild(initiatePartialInsights);
                            }
                            else if (process == '0.2') {
                                var playerCount = response['playercount'];
                                var game_secret = self.game_secret;
                                var inviter_2 = self.inviter;
                                var player = self.player;
                                var gameName_2 = self.game_secret;
                                var stageWidth = self.stageWidth;
                                var stageHeight = self.stageHeight;
                                var characterChoosePage = new game.CharacterChoosePage(game_secret, inviter_2, player, gameName_2, stageWidth, stageHeight, playerCount);
                                self.timer.stop();
                                this.stage.addChild(characterChoosePage);
                                this.sprite.visible = false;
                            }
                            else if (process == '0.3') {
                                var that = self;
                                var count = 0;
                                base.API.call('get_player_characterlist', {
                                    'game_secret': that.game_secret,
                                    'inviter': that.inviter,
                                    'player': that.player,
                                    'gameName': that.game_secret,
                                }).then(function (response) {
                                    var character_list = response['data'];
                                    console.log(character_list);
                                    var characterList = [];
                                    character_list.forEach(function (val, index, array) {
                                        var player_name = val[0];
                                        if (self.playerList.indexOf(player_name) == -1) {
                                            count++;
                                            // console.log(count)
                                            // let tensionScale = new game.TensionScale(self.stageWidth, self.stageHeight, val[1], 0)
                                            that.allcharacterlist.push(val[1]);
                                            // self.sprite.addChild(tensionScale)
                                            // tensionScale.x = self.stageWidth - 200
                                            // tensionScale.y = self.count * 150
                                            that.playerList.push(player_name);
                                        }
                                    });
                                    // if (count == playerCount) {
                                    console.log('character_list');
                                    characterList.push(that.playerList);
                                    characterList.push(that.allcharacterlist);
                                    // }
                                    var playerAndOthersCharacterList = [];
                                    // ['1', [c1, c2], [['2', '3'], [[c1, c2], [c1, c2]]]
                                    var otherCharacterList = [];
                                    var othersList = [];
                                    var characterList2 = [];
                                    self.playerList.forEach(function (val, index, array) {
                                        if (val == that.player) {
                                            playerAndOthersCharacterList.push(val);
                                            playerAndOthersCharacterList.push(that.allcharacterlist[index]);
                                        }
                                        else {
                                            othersList.push(val);
                                            characterList2.push(that.allcharacterlist[index]);
                                        }
                                    });
                                    otherCharacterList.push(othersList);
                                    otherCharacterList.push(characterList2);
                                    playerAndOthersCharacterList.push(otherCharacterList);
                                    console.log(playerAndOthersCharacterList);
                                    var game_secret = that.game_secret;
                                    var inviter = that.inviter;
                                    var player = that.player;
                                    var gameName = that.game_secret;
                                    var stageWidth = that.stage.stageWidth;
                                    var stageHeight = that.stage.stageHeight;
                                    // let processson1 = processson
                                    var count = 0;
                                    var charater = new game.Character(game_secret, inviter, player, gameName, stageWidth, stageHeight, count, characterList, playerAndOthersCharacterList);
                                    that.stage.addChild(charater);
                                    that.sprite.visible = false;
                                });
                            }
                            else {
                                var inviter = self.inviter;
                                var gameName = self.game_secret;
                                var game_id = self.game_secret;
                                self.timer.stop();
                                var enter = new game.GamePageOne(self.game_secret, self.inviter, self.nickname, self.game_secret, self.stage.stageWidth, self.stage.stageHeight);
                                self.stage.addChild(enter);
                                self.sprite.visible = false;
                            }
                        });
                    }
                });
            }
            if (self.status == 'inviter') {
                base.API.call('getGameStatus', { 'inviter_name': self.inviter, 'game_secret': self.game_secret, 'gameName': self.game_secret, 'openid': self.openid, 'nickname': self.nickname }).then(function (response) {
                    var status = response['result'];
                    if (status == 3) {
                        base.API.call('get_players_process', {
                            'game_secret': self.game_secret,
                            'inviter_name': self.inviter,
                            'player': self.nickname,
                            'gameName': self.game_secret
                        }).then(function (response) {
                            console.log(response);
                            var process = response['process'];
                            if (process == '0.1') {
                                var playerCount = response['playercount'];
                                var playerScore = response['playerScore'];
                                var game_secret = self.game_secret;
                                var inviter_3 = self.inviter;
                                var player = self.player;
                                var gameName_3 = self.game_secret;
                                var stageWidth = self.stageWidth;
                                var stageHeight = self.stageHeight;
                                var initiatePartialInsights = new game.InitiatePartialInsights(game_secret, inviter_3, player, gameName_3, stageWidth, stageHeight, playerCount, playerScore);
                                self.timer.stop();
                                self.sprite.visible = false;
                                self.stage.addChild(initiatePartialInsights);
                            }
                            else if (process == '0.2') {
                                var playerCount = response['playercount'];
                                var game_secret = self.game_secret;
                                var inviter_4 = self.inviter;
                                var player = self.player;
                                var gameName_4 = self.game_secret;
                                var stageWidth = self.stageWidth;
                                var stageHeight = self.stageHeight;
                                var characterChoosePage = new game.CharacterChoosePage(game_secret, inviter_4, player, gameName_4, stageWidth, stageHeight, playerCount);
                                self.timer.stop();
                                this.stage.addChild(characterChoosePage);
                                this.sprite.visible = false;
                            }
                            else if (process == '0.3') {
                                var that = self;
                                var count = 0;
                                base.API.call('get_player_characterlist', {
                                    'game_secret': that.game_secret,
                                    'inviter': that.inviter,
                                    'player': that.player,
                                    'gameName': that.game_secret,
                                }).then(function (response) {
                                    var character_list = response['data'];
                                    console.log(character_list);
                                    var characterList = [];
                                    character_list.forEach(function (val, index, array) {
                                        var player_name = val[0];
                                        if (self.playerList.indexOf(player_name) == -1) {
                                            count++;
                                            // console.log(count)
                                            // let tensionScale = new game.TensionScale(self.stageWidth, self.stageHeight, val[1], 0)
                                            that.allcharacterlist.push(val[1]);
                                            // self.sprite.addChild(tensionScale)
                                            // tensionScale.x = self.stageWidth - 200
                                            // tensionScale.y = self.count * 150
                                            that.playerList.push(player_name);
                                        }
                                    });
                                    // if (count == playerCount) {
                                    console.log('character_list');
                                    characterList.push(that.playerList);
                                    characterList.push(that.allcharacterlist);
                                    // }
                                    var playerAndOthersCharacterList = [];
                                    // ['1', [c1, c2], [['2', '3'], [[c1, c2], [c1, c2]]]
                                    var otherCharacterList = [];
                                    var othersList = [];
                                    var characterList2 = [];
                                    self.playerList.forEach(function (val, index, array) {
                                        if (val == that.player) {
                                            playerAndOthersCharacterList.push(val);
                                            playerAndOthersCharacterList.push(that.allcharacterlist[index]);
                                        }
                                        else {
                                            othersList.push(val);
                                            characterList2.push(that.allcharacterlist[index]);
                                        }
                                    });
                                    otherCharacterList.push(othersList);
                                    otherCharacterList.push(characterList2);
                                    playerAndOthersCharacterList.push(otherCharacterList);
                                    console.log(playerAndOthersCharacterList);
                                    var game_secret = that.game_secret;
                                    var inviter = that.inviter;
                                    var player = that.player;
                                    var gameName = that.game_secret;
                                    var stageWidth = that.stage.stageWidth;
                                    var stageHeight = that.stage.stageHeight;
                                    // let processson1 = processson
                                    var count = 0;
                                    var charater = new game.Character(game_secret, inviter, player, gameName, stageWidth, stageHeight, count, characterList, playerAndOthersCharacterList);
                                    that.stage.addChild(charater);
                                    that.sprite.visible = false;
                                });
                            }
                            else {
                                var inviter = self.inviter;
                                var gameName = self.game_secret;
                                var game_id = self.game_secret;
                                self.timer.stop();
                                var enter = new game.GamePageOne(self.game_secret, self.inviter, self.nickname, self.game_secret, self.stage.stageWidth, self.stage.stageHeight);
                                self.stage.addChild(enter);
                                self.sprite.visible = false;
                            }
                        });
                    }
                });
            }
        };
        CreateGame.prototype.invateFriends = function () {
            var link1 = window.location.href;
            var link = 'http://ark.metatype.cn/index.html?game_id=' + this.openid + '&inviter=' + this.nickname;
            base.API.Init("http://work.metatype.cn:8105/api/");
            var self = this;
            base.API.call("wechatapi", { 'url': link1 }).then(function (response) {
                var bodyConfig = new BodyConfig();
                bodyConfig.debug = true;
                bodyConfig.appId = response['params']['appId'];
                bodyConfig.timestamp = response['params']['timestamp'];
                bodyConfig.nonceStr = response['params']['nonceStr'];
                bodyConfig.jsApiList = response['params']['jsApiList'];
                bodyConfig.signature = response['params']['signature'];
                if (wx) {
                    wx.config(bodyConfig);
                    wx.ready(function () {
                        var desc = 'your friend ' + self.nickname + ' invite you to join the game';
                        wx.onMenuShareAppMessage({
                            title: 'ARK',
                            desc: desc,
                            link: link,
                            imgUrl: '',
                            type: '',
                            dataUrl: '',
                            trigger: function () {
                            },
                            success: function (res) {
                                alert('分享完成');
                            },
                            cancel: function () {
                                alert('淘气了哦，你取消分享');
                                console.log('cancel');
                            },
                            fail: function (res) {
                                console.log(res);
                                console.log('fail');
                            }
                        });
                    });
                    wx.error(function (res) {
                        console.log('error');
                        console.log(res);
                    });
                }
            }).catch(function (err) {
                console.log(err);
            });
        };
        CreateGame.prototype.onTouchBegin = function () {
            var inviter = this.inviter;
            var gameName = this.game_secret;
            var game_id = this.game_secret;
            var self = this;
            base.API.Init("http://work.metatype.cn:8105/api/");
            // base.API.Init("http://127.0.0.1:8000/api/")
            base.API.call('create_game', { 'inviter': inviter, 'gameName': gameName, 'game_id': game_id }).then(function (response) {
            });
            var enter = new game.GamePageOne(this.game_secret, this.inviter, this.inviter, this.game_secret, this.stage.stageWidth, this.stage.stageHeight);
            this.stage.addChild(enter);
            this.sprite.visible = false;
            this.timer.stop();
        };
        return CreateGame;
    }(egret.DisplayObjectContainer));
    game.CreateGame = CreateGame;
    __reflect(CreateGame.prototype, "game.CreateGame");
})(game || (game = {}));
//# sourceMappingURL=CreateGame.js.map