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
        function CreateGame(stageWidth, stageHeight) {
            var _this = _super.call(this) || this;
            _this.count = 0;
            _this.playerList = [];
            _this.sprite = new egret.Sprite();
            _this.sprite.width = stageWidth;
            _this.sprite.height = stageHeight;
            _this.addChild(_this.sprite);
            var shape = new egret.Shape();
            shape.graphics.beginFill(0xFFF5EE);
            shape.graphics.drawRect(0, 0, 300, 50);
            shape.graphics.endFill();
            shape.x = _this.sprite.width / 2 + 60;
            shape.y = _this.sprite.height / 3;
            shape.anchorOffsetX = shape.width / 2;
            shape.anchorOffsetY = shape.height / 2;
            _this.sprite.addChild(shape);
            _this.txInput = new egret.TextField();
            _this.txInput.type = egret.TextFieldType.INPUT;
            _this.txInput.inputType = egret.TextFieldInputType.TEXT;
            _this.txInput.width = 290;
            _this.txInput.height = 50;
            _this.txInput.x = _this.sprite.width / 2 + 60;
            _this.txInput.y = _this.sprite.height / 3;
            _this.txInput.anchorOffsetX = _this.txInput.width / 2;
            _this.txInput.anchorOffsetY = _this.txInput.height / 2;
            _this.txInput.textColor = 0x0D0D0D;
            _this.txInput.size = 40;
            var text = new egret.TextField();
            text.text = 'password:';
            text.x = _this.sprite.width / 2 - 280;
            text.y = _this.sprite.height / 3 - 18;
            text.size = 30;
            _this.sprite.addChild(text);
            _this.sprite.addChild(_this.txInput);
            var shape2 = new egret.Shape();
            shape2.graphics.beginFill(0xFFF5EE);
            shape2.graphics.drawRect(0, 0, 300, 50);
            shape2.graphics.endFill();
            shape2.x = _this.sprite.width / 2 + 60;
            shape2.y = _this.sprite.height / 3 - 80;
            shape2.anchorOffsetX = shape2.width / 2;
            shape2.anchorOffsetY = shape2.height / 2;
            _this.sprite.addChild(shape2);
            var shape3 = new egret.Shape();
            shape3.graphics.beginFill(0xFFF5EE);
            shape3.graphics.drawRect(0, 0, 300, 50);
            shape3.graphics.endFill();
            shape3.x = _this.sprite.width / 2 + 60;
            shape3.y = _this.sprite.height / 3 - 160;
            shape3.anchorOffsetX = shape2.width / 2;
            shape3.anchorOffsetY = shape2.height / 2;
            _this.sprite.addChild(shape3);
            _this.txInput2 = new egret.TextField();
            _this.txInput2.type = egret.TextFieldType.INPUT;
            _this.txInput2.inputType = egret.TextFieldInputType.TEXT;
            _this.txInput2.width = 290;
            _this.txInput2.height = 50;
            _this.txInput2.x = _this.sprite.width / 2 + 60;
            _this.txInput2.y = _this.sprite.height / 3 - 75;
            _this.txInput2.anchorOffsetX = _this.txInput2.width / 2;
            _this.txInput2.anchorOffsetY = _this.txInput2.height / 2;
            _this.txInput2.textColor = 0x0D0D0D;
            _this.txInput2.size = 40;
            var text3 = new egret.TextField();
            text3.text = 'game name:';
            text3.x = _this.sprite.width / 2 - 280;
            text3.y = _this.sprite.height / 3 - 90;
            text3.size = 30;
            _this.sprite.addChild(text3);
            _this.sprite.addChild(_this.txInput2);
            _this.txInput3 = new egret.TextField();
            _this.txInput3.type = egret.TextFieldType.INPUT;
            _this.txInput3.inputType = egret.TextFieldInputType.TEXT;
            _this.txInput3.width = 290;
            _this.txInput3.height = 50;
            _this.txInput3.x = _this.sprite.width / 2 + 60;
            _this.txInput3.y = _this.sprite.height / 3 - 150;
            _this.txInput3.anchorOffsetX = _this.txInput3.width / 2;
            _this.txInput3.anchorOffsetY = _this.txInput3.height / 2;
            _this.txInput3.textColor = 0x0D0D0D;
            _this.txInput3.size = 40;
            var text4 = new egret.TextField();
            text4.text = 'your name:';
            text4.x = _this.sprite.width / 2 - 280;
            text4.y = _this.sprite.height / 3 - 170;
            text4.size = 30;
            _this.sprite.addChild(text4);
            _this.sprite.addChild(_this.txInput3);
            var button = new egret.Shape();
            button.graphics.beginFill(0x00cc00);
            button.graphics.drawRect(0, 0, 200, 50);
            button.graphics.endFill();
            button.x = _this.sprite.width / 2;
            button.y = _this.sprite.height / 2;
            button.anchorOffsetX = button.width / 2;
            button.anchorOffsetY = button.height / 2;
            button.touchEnabled = true;
            button.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.invateFriends, _this);
            _this.sprite.addChild(button);
            var label = new egret.TextField();
            label.text = "create";
            label.anchorOffsetX = label.width / 2;
            label.anchorOffsetY = label.height / 2;
            label.x = _this.sprite.width / 2;
            label.y = _this.sprite.height / 2;
            _this.sprite.addChild(label);
            _this.text2 = new egret.TextField();
            _this.text2.width = stageWidth;
            _this.sprite.addChild(_this.text2);
            return _this;
        }
        CreateGame.prototype.invateFriends = function () {
            console.log(1);
            base.API.Init("http://39.104.85.167:8105/api/");
            base.API.call("wechatapi", { 'url': 'http://10.145.110.219:5365/index.html' }).then(function (response) {
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
                        console.log(12);
                        wx.checkJsApi({
                            jsApiList: [
                                "onMenuShareAppMessage",
                                "checkJsApi"
                            ],
                            success: function (res) {
                                console.log(333);
                                console.log(res);
                                alert(res);
                            }
                        });
                        // var bodyMenuShareAppMessage = new BodyMenuShareAppMessage()
                        // bodyMenuShareAppMessage.title = '123'
                        // bodyMenuShareAppMessage.desc = '123'
                        // bodyMenuShareAppMessage.desc = 'http://10.145.108.57:5365/index.html'
                        // wx.onMenuShareAppMessage(bodyMenuShareAppMessage)
                        wx.onMenuShareAppMessage({
                            title: 'ARK',
                            desc: '123',
                            link: 'http://10.145.110.219:5365/index.html',
                            imgUrl: '',
                            type: '',
                            dataUrl: '',
                            trigger: function () {
                                console.log('trigger');
                            },
                            success: function () {
                                alert('分享完成');
                                console.log('success');
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
            var inviter = this.txInput3.text;
            var gameName = this.txInput2.text;
            var game_id = this.txInput.text;
            if (inviter && gameName && game_id) {
                // base.API.Init("http://39.104.85.167:8105/api/");
                base.API.Init("http://39.104.85.167:8105/api/");
                base.API.call("create_game", { 'inviter': inviter, 'gameName': gameName, 'game_id': game_id }).then(function (response) {
                    // var play = new game.LevelOneScene(_this.index);
                    // _this.Switch(play);
                }).catch(function (err) {
                    console.log(err);
                });
                if (this.stage) {
                    var inviteFriends = new game.InviteFriends(game_id, inviter, gameName, this.stage.stageWidth, this.stage.stageHeight);
                    this.stage.addChild(inviteFriends);
                    this.sprite.visible = false;
                }
            }
            else {
                this.text2.text = "you must input your name , the game's name and the game_id";
            }
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