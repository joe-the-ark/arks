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
            _this.sprite = new egret.Sprite();
            _this.sprite.width = stageWidth;
            _this.sprite.height = stageHeight;
            _this.addChild(_this.sprite);
            _this.nickname = nickname;
            _this.openid = openid;
            _this.status = status;
            _this.game_secret = game_secret;
            _this.inviter = inviter;
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            alert(status);
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
                // this.label.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
                _this.addChild(_this.label);
                _this.label3 = new egret.TextField();
                _this.label3.text = "play game";
                _this.label3.height = 30;
                _this.label3.width = 200;
                _this.label3.anchorOffsetX = _this.label3.width / 2;
                _this.label3.anchorOffsetY = _this.label3.height / 2;
                _this.label3.x = _this.stageWidth / 2;
                _this.label3.y = _this.stageHeight / 1.5;
                _this.label3.background = true;
                _this.label3.backgroundColor = 0xffffff;
                _this.label3.border = true;
                _this.label3.borderColor = 0x00ff00;
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
            // var shape: egret.Shape = new egret.Shape();
            // shape.graphics.beginFill(0xFFF5EE);
            // shape.graphics.drawRect(0, 0, 300, 50);
            // shape.graphics.endFill();
            // shape.x = this.sprite.width / 2 + 60
            // shape.y = this.sprite.height / 3
            // shape.anchorOffsetX = shape.width / 2
            // shape.anchorOffsetY = shape.height / 2
            // this.sprite.addChild(shape)
            // this.txInput = new egret.TextField();
            // this.txInput.type = egret.TextFieldType.INPUT;
            // this.txInput.inputType = egret.TextFieldInputType.TEXT;
            // this.txInput.width = 290;
            // this.txInput.height = 50;
            // this.txInput.x = this.sprite.width / 2 + 60
            // this.txInput.y = this.sprite.height / 3
            // this.txInput.anchorOffsetX = this.txInput.width / 2
            // this.txInput.anchorOffsetY = this.txInput.height / 2
            // this.txInput.textColor = 0x0D0D0D;
            // this.txInput.size = 40;
            // var text: egret.TextField = new egret.TextField();
            // text.text = 'password:';
            // text.x = this.sprite.width / 2 - 280
            // text.y = this.sprite.height / 3 - 18
            // text.size = 30
            // this.sprite.addChild(text)
            // this.sprite.addChild(this.txInput)
            // var shape2: egret.Shape = new egret.Shape();
            // shape2.graphics.beginFill(0xFFF5EE);
            // shape2.graphics.drawRect(0, 0, 300, 50);
            // shape2.graphics.endFill();
            // shape2.x = this.sprite.width / 2 + 60
            // shape2.y = this.sprite.height / 3 - 80
            // shape2.anchorOffsetX = shape2.width / 2
            // shape2.anchorOffsetY = shape2.height / 2
            // this.sprite.addChild(shape2)
            // var shape3: egret.Shape = new egret.Shape();
            // shape3.graphics.beginFill(0xFFF5EE);
            // shape3.graphics.drawRect(0, 0, 300, 50);
            // shape3.graphics.endFill();
            // shape3.x = this.sprite.width / 2 + 60
            // shape3.y = this.sprite.height / 3 - 160
            // shape3.anchorOffsetX = shape2.width / 2
            // shape3.anchorOffsetY = shape2.height / 2
            // this.sprite.addChild(shape3)
            // this.txInput2 = new egret.TextField();
            // this.txInput2.type = egret.TextFieldType.INPUT;
            // this.txInput2.inputType = egret.TextFieldInputType.TEXT;
            // this.txInput2.width = 290;
            // this.txInput2.height = 50;
            // this.txInput2.x = this.sprite.width / 2 + 60
            // this.txInput2.y = this.sprite.height / 3 - 75
            // this.txInput2.anchorOffsetX = this.txInput2.width / 2
            // this.txInput2.anchorOffsetY = this.txInput2.height / 2
            // this.txInput2.textColor = 0x0D0D0D;
            // this.txInput2.size = 40;
            // var text3: egret.TextField = new egret.TextField();
            // text3.text = 'game name:';
            // text3.x = this.sprite.width / 2 - 280
            // text3.y = this.sprite.height / 3 - 90
            // text3.size = 30
            // this.sprite.addChild(text3)
            // this.sprite.addChild(this.txInput2)
            // this.txInput3 = new egret.TextField();
            // this.txInput3.type = egret.TextFieldType.INPUT;
            // this.txInput3.inputType = egret.TextFieldInputType.TEXT;
            // this.txInput3.width = 290;
            // this.txInput3.height = 50;
            // this.txInput3.x = this.sprite.width / 2 + 60
            // this.txInput3.y = this.sprite.height / 3 - 150
            // this.txInput3.anchorOffsetX = this.txInput3.width / 2
            // this.txInput3.anchorOffsetY = this.txInput3.height / 2
            // this.txInput3.textColor = 0x0D0D0D;
            // this.txInput3.size = 40;
            // var text4: egret.TextField = new egret.TextField();
            // text4.text = 'your name:';
            // text4.x = this.sprite.width / 2 - 280
            // text4.y = this.sprite.height / 3 - 170
            // text4.size = 30
            // this.sprite.addChild(text4)
            // this.sprite.addChild(this.txInput3)
            // var button: egret.Shape = new egret.Shape();
            // button.graphics.beginFill(0x00cc00);
            // button.graphics.drawRect(0, 0, 200, 50);
            // button.graphics.endFill();
            // button.x = this.sprite.width / 2
            // button.y = this.sprite.height / 2;
            // button.anchorOffsetX = button.width / 2
            // button.anchorOffsetY = button.height / 2
            // button.touchEnabled = true;
            // button.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this)
            // this.sprite.addChild(button)
            // var label: egret.TextField = new egret.TextField();
            // label.text = "create";
            // label.anchorOffsetX = label.width / 2
            // label.anchorOffsetY = label.height / 2
            // label.x = this.sprite.width / 2
            // label.y = this.sprite.height / 2
            // this.sprite.addChild(label)
            // this.text2 = new egret.TextField()
            // this.text2.width = stageWidth
            // this.sprite.addChild(this.text2)
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
            base.API.call('getGameStatus', { 'inviter_name': self.inviter, 'game_secret': self.game_secret, 'gameName': self.game_secret }).then(function (response) {
                var status = response['result'];
                if (status == 1) {
                    var inviter = this.inviter;
                    var gameName = this.game_secret;
                    var game_id = this.game_secret;
                    this.timer.stop();
                    var enter = new game.GamePageOne(this.game_secret, this.inviter, this.inviter, this.game_secret, this.stage.stageWidth, this.stage.stageHeight);
                    this.stage.addChild(enter);
                    this.sprite.visible = false;
                }
            });
        };
        CreateGame.prototype.invateFriends = function () {
            console.log(1);
            var link1 = window.location.href;
            var link = 'http://ark.metatype.cn/index.html?game_id=' + this.openid + '&inviter=' + this.nickname;
            console.log('link:');
            console.log(link);
            console.log('linkurl:');
            console.log(link1);
            alert('link:' + link);
            base.API.Init("http://work.metatype.cn:8105/api/");
            var self = this;
            base.API.call("wechatapi", { 'url': link1 }).then(function (response) {
                console.log(response);
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
                        // wx.checkJsApi({
                        //     jsApiList: [
                        //         "onMenuShareAppMessage",
                        //         "checkJsApi"
                        //     ], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                        //     success: function(res) {
                        //     }
                        // });
                        var desc = 'your friend ' + self.nickname + ' invite you to join the game';
                        // var bodyMenuShareAppMessage = new BodyMenuShareAppMessage()
                        // bodyMenuShareAppMessage.title = '123'
                        // bodyMenuShareAppMessage.desc = '123'
                        // bodyMenuShareAppMessage.desc = 'http://10.145.108.57:5365/index.html'
                        // wx.onMenuShareAppMessage(bodyMenuShareAppMessage)
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
            this.timer.stop();
            var enter = new game.GamePageOne(this.game_secret, this.inviter, this.inviter, this.game_secret, this.stage.stageWidth, this.stage.stageHeight);
            this.stage.addChild(enter);
            this.sprite.visible = false;
            // if (inviter && gameName && game_id) {
            //     // base.API.Init("http://work.metatype.cn:8105/api/");
            //     base.API.Init("http://work.metatype.cn:8105/api/");
            //     base.API.call("create_game", { 'inviter': inviter, 'gameName': gameName, 'game_id':game_id }).then(function (response) {
            //         // var play = new game.LevelOneScene(_this.index);
            //         // _this.Switch(play);
            //     }).catch(function (err) {
            //         console.log(err);
            //     });
            //     if (this.stage) {
            //         let inviteFriends = new game.InviteFriends(game_id, inviter, gameName, this.stage.stageWidth, this.stage.stageHeight);
            //         this.stage.addChild(inviteFriends)
            //         this.sprite.visible = false
            //     }
            // } else {
            //     this.text2.text = "you must input your name , the game's name and the game_id"
            // }
            // if(){
            //     var duplicate = 0
            //     this.playerList.forEach((val, index, array) => {
            //         console.log(val)
            //         if(val == player){
            //             this.text2.text = 'please dont invite the duplicate player !'
            //             duplicate = 1
            //         }
            //     })
            //     console.log(duplicate)
            //     if(duplicate == 0) {
            //         this.playerList.push(player)
            //         this.count += 1
            //         this.text2.text = 'You have invited '+ this.count + ' players'
            //     }
            // }
        };
        CreateGame.prototype.onTouchEnd = function () {
            egret.log("onTouchEnd");
        };
        CreateGame.prototype.onTouchMove = function () {
            egret.log("onTouchMove");
        };
        CreateGame.prototype.onTouchTap = function () {
            egret.log("onTouchTap");
        };
        return CreateGame;
    }(egret.DisplayObjectContainer));
    game.CreateGame = CreateGame;
    __reflect(CreateGame.prototype, "game.CreateGame");
})(game || (game = {}));
//# sourceMappingURL=CreateGame.js.map