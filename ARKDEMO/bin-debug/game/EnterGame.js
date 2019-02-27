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
    var EnterGame = (function (_super) {
        __extends(EnterGame, _super);
        function EnterGame(game_secret, gameName, inviter, stageWidth, stageHeight) {
            var _this = _super.call(this) || this;
            _this.count = 0;
            _this.playerList = [];
            _this.game_secret = '';
            _this.gameName = '';
            _this.isPlayer = 0;
            _this.inviter = '';
            _this.game_secret = game_secret;
            _this.gameName = gameName;
            _this.inviter = inviter;
            _this.sprite = new egret.Sprite();
            _this.sprite.width = stageWidth;
            _this.sprite.height = stageHeight;
            _this.addChild(_this.sprite);
            var shape = new egret.Shape();
            shape.graphics.beginFill(0xFFF5EE);
            shape.graphics.drawRect(0, 0, 300, 50);
            shape.graphics.endFill();
            shape.x = _this.sprite.width / 2 + 80;
            shape.y = _this.sprite.height / 3;
            shape.anchorOffsetX = shape.width / 2;
            shape.anchorOffsetY = shape.height / 2;
            _this.sprite.addChild(shape);
            var shape2 = new egret.Shape();
            shape2.graphics.beginFill(0xFFF5EE);
            shape2.graphics.drawRect(0, 0, 300, 50);
            shape2.graphics.endFill();
            shape2.x = _this.sprite.width / 2 + 80;
            shape2.y = _this.sprite.height / 3 - 100;
            shape2.anchorOffsetX = shape2.width / 2;
            shape2.anchorOffsetY = shape2.height / 2;
            _this.sprite.addChild(shape2);
            _this.txInput2 = new egret.TextField();
            _this.txInput2.type = egret.TextFieldType.INPUT;
            _this.txInput2.inputType = egret.TextFieldInputType.TEXT;
            _this.txInput2.width = 290;
            _this.txInput2.height = 50;
            _this.txInput2.x = _this.sprite.width / 2 + 80;
            _this.txInput2.y = _this.sprite.height / 3 - 100;
            _this.txInput2.anchorOffsetX = _this.txInput2.width / 2;
            _this.txInput2.anchorOffsetY = _this.txInput2.height / 2;
            _this.txInput2.textColor = 0x0D0D0D;
            _this.txInput2.size = 40;
            var text2 = new egret.TextField();
            text2.text = 'input game secret:';
            text2.x = _this.sprite.width / 2 - 320;
            text2.y = _this.sprite.height / 3 - 118;
            text2.size = 30;
            _this.sprite.addChild(text2);
            _this.sprite.addChild(_this.txInput2);
            _this.txInput = new egret.TextField();
            _this.txInput.type = egret.TextFieldType.INPUT;
            _this.txInput.inputType = egret.TextFieldInputType.TEXT;
            _this.txInput.width = 290;
            _this.txInput.height = 50;
            _this.txInput.x = _this.sprite.width / 2 + 80;
            _this.txInput.y = _this.sprite.height / 3;
            _this.txInput.anchorOffsetX = _this.txInput.width / 2;
            _this.txInput.anchorOffsetY = _this.txInput.height / 2;
            _this.txInput.textColor = 0x0D0D0D;
            _this.txInput.size = 40;
            var text = new egret.TextField();
            text.text = 'input your name:';
            text.x = _this.sprite.width / 2 - 320;
            text.y = _this.sprite.height / 3 - 18;
            text.size = 30;
            _this.sprite.addChild(text);
            _this.sprite.addChild(_this.txInput);
            var button = new egret.Shape();
            button.graphics.beginFill(0x00cc00);
            button.graphics.drawRect(0, 0, 200, 50);
            button.graphics.endFill();
            button.x = _this.sprite.width / 2;
            button.y = _this.sprite.height / 2;
            button.anchorOffsetX = button.width / 2;
            button.anchorOffsetY = button.height / 2;
            button.touchEnabled = true;
            button.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
            _this.sprite.addChild(button);
            var label = new egret.TextField();
            label.text = "play";
            label.anchorOffsetX = label.width / 2;
            label.anchorOffsetY = label.height / 2;
            label.x = _this.sprite.width / 2;
            label.y = _this.sprite.height / 2;
            _this.sprite.addChild(label);
            _this.text2 = new egret.TextField();
            _this.text2.text = "please input your name and the game's secret";
            _this.text2.width = stageWidth;
            _this.sprite.addChild(_this.text2);
            return _this;
        }
        EnterGame.prototype.onTouchBegin = function () {
            var player = this.txInput.text;
            var game_secret = this.txInput2.text;
            console.log('player:' + player);
            var self = this;
            if (player && game_secret) {
                console.log(game_secret);
                console.log(this.game_secret);
                // base.API.Init("http://39.104.85.167:8105/api/")
                base.API.Init("http://39.104.85.167:8105/api/");
                base.API.call("find_players", { 'game_secret': self.game_secret, 'gameName': self.gameName }).then(function (response) {
                    console.log(response);
                    var play_list = response['player_list'];
                    var index = play_list.indexOf(self.txInput.text);
                    self.isPlayer = index;
                }).catch(function (err) {
                    console.log(err);
                });
                if (game_secret != this.game_secret) {
                    this.text2.text = "please input the correct secret to enter the game";
                }
                else if (self.isPlayer == -1) {
                    this.text2.text = "you aren't invited !";
                }
                else {
                    if (this.stage) {
                        console.log(33333);
                        var gamePageOne = new game.GamePageOne(game_secret, self.inviter, player, self.gameName, this.stage.stageWidth, this.stage.stageHeight);
                        this.stage.addChild(gamePageOne);
                        self.sprite.visible = false;
                    }
                }
            }
            else {
                this.text2.text = "you must input your name and the game's secret";
            }
            // if(player){
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
            //         base.API.Init("http://39.104.85.167:8105/api/")
            // base.API.call("create_player", {'player_name': player} ).then(function (response) {
            //     console.log(response)
            // }).catch(function (err) {
            //     console.log(err);
            // });
            //     }
            // }
        };
        EnterGame.prototype.onTouchEnd = function () {
            egret.log("onTouchEnd");
        };
        EnterGame.prototype.onTouchMove = function () {
            egret.log("onTouchMove");
        };
        EnterGame.prototype.onTouchTap = function () {
            egret.log("onTouchTap");
        };
        return EnterGame;
    }(egret.DisplayObjectContainer));
    game.EnterGame = EnterGame;
    __reflect(EnterGame.prototype, "game.EnterGame");
})(game || (game = {}));
//# sourceMappingURL=EnterGame.js.map