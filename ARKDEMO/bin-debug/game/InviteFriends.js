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
    var InviteFriends = (function (_super) {
        __extends(InviteFriends, _super);
        function InviteFriends(game_secret, inviter, gameName, stageWidth, stageHeight) {
            var _this = _super.call(this) || this;
            _this.count = 0;
            _this.playerList = [];
            _this.game_secret = '';
            _this.inviter = '';
            _this.gameName = '';
            _this.game_secret = game_secret;
            _this.inviter = inviter;
            _this.gameName = gameName;
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
            text.text = 'input player:';
            text.x = _this.sprite.width / 2 - 280;
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
            label.text = "invite";
            label.anchorOffsetX = label.width / 2;
            label.anchorOffsetY = label.height / 2;
            label.x = _this.sprite.width / 2;
            label.y = _this.sprite.height / 2;
            _this.sprite.addChild(label);
            var button2 = new egret.Shape();
            button2.graphics.beginFill(0x00cc00);
            button2.graphics.drawRect(0, 0, 200, 50);
            button2.graphics.endFill();
            button2.x = _this.sprite.width / 2;
            button2.y = _this.sprite.height / 2 + 100;
            button2.anchorOffsetX = button.width / 2;
            button2.anchorOffsetY = button.height / 2;
            button2.touchEnabled = true;
            button2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin2, _this);
            _this.sprite.addChild(button2);
            var label2 = new egret.TextField();
            label2.text = "play";
            label2.anchorOffsetX = label2.width / 2;
            label2.anchorOffsetY = label2.height / 2;
            label2.x = _this.sprite.width / 2;
            label2.y = _this.sprite.height / 2 + 100;
            _this.sprite.addChild(label2);
            _this.text2 = new egret.TextField();
            _this.text2.text = 'You have invited ' + _this.count + ' players';
            _this.text2.width = stageWidth;
            _this.sprite.addChild(_this.text2);
            return _this;
        }
        InviteFriends.prototype.onTouchBegin = function () {
            var _this = this;
            var player = this.txInput.text;
            if (player) {
                var duplicate = 0;
                this.playerList.forEach(function (val, index, array) {
                    console.log(val);
                    if (val == player) {
                        _this.text2.text = 'please dont invite the duplicate player !';
                        duplicate = 1;
                    }
                });
                console.log(duplicate);
                if (duplicate == 0) {
                    this.playerList.push(player);
                    this.count += 1;
                    this.text2.text = 'You have invited ' + this.count + ' players';
                    var self = this;
                    base.API.Init("http://127.0.0.1:8000/api/");
                    base.API.call("create_player", { 'player_name': player, 'game_secret': self.game_secret, 'gameName': self.gameName, 'inviter': self.inviter }).then(function (response) {
                        console.log(response);
                    }).catch(function (err) {
                        console.log(err);
                    });
                }
            }
        };
        InviteFriends.prototype.onTouchBegin2 = function () {
            if (this.playerList.length < 3) {
                this.text2.text = 'You must invite 10 players to start the game at least!';
            }
            else {
                var self = this;
                if (this.stage) {
                    var enter = new game.GamePageOne(self.game_secret, self.inviter, self.inviter, self.gameName, this.stage.stageWidth, this.stage.stageHeight);
                    this.stage.addChild(enter);
                    self.sprite.visible = false;
                }
                // console.log(this.stage)
            }
        };
        InviteFriends.prototype.onTouchEnd = function () {
            egret.log("onTouchEnd");
        };
        InviteFriends.prototype.onTouchMove = function () {
            egret.log("onTouchMove");
        };
        InviteFriends.prototype.onTouchTap = function () {
            egret.log("onTouchTap");
        };
        return InviteFriends;
    }(egret.DisplayObjectContainer));
    game.InviteFriends = InviteFriends;
    __reflect(InviteFriends.prototype, "game.InviteFriends");
})(game || (game = {}));
//# sourceMappingURL=InviteFriends.js.map