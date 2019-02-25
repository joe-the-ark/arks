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
    var Index = (function (_super) {
        __extends(Index, _super);
        function Index(stageWidth, stageHeight) {
            var _this = _super.call(this) || this;
            _this.game_list = [];
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            // this.sprite.graphics.beginFill(0xff0000);
            // this.sprite.graphics.drawRect(0, 0, 200, 50);
            // this.sprite.graphics.endFill();
            // this.sprite.anchorOffsetX = this.sprite.width / 2 ;
            // this.sprite.anchorOffsetY = this.sprite.height / 2 ;
            _this.addChild(_this.sprite);
            _this.sprite.touchEnabled = true;
            // this.sprite.x = stageWidth / 2
            // this.sprite.y = stageHeight / 2
            _this.label = new egret.TextField();
            _this.label.text = "create game";
            _this.label.height = 80;
            _this.label.width = 180;
            _this.label.anchorOffsetX = _this.label.width / 2;
            _this.label.anchorOffsetY = _this.label.height / 2;
            _this.label.x = _this.stageWidth / 2;
            _this.label.y = _this.stageHeight;
            _this.label.touchEnabled = true;
            _this.label.background = true;
            _this.label.backgroundColor = 0xffffff;
            _this.label.border = true;
            _this.label.borderColor = 0x00ff00;
            _this.label.fontFamily = "Arial";
            _this.label.textColor = 0xFF0000;
            _this.label.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
            _this.addChild(_this.label);
            // this.sprite.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            // this.sprite.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            // this.sprite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            _this.sprite.addEventListener(egret.Event.ADDED_TO_STAGE, _this.getGameList, _this);
            return _this;
        }
        Index.prototype.getGameList = function () {
            base.API.Init("http://39.104.85.167:8105/api/");
            // base.API.Init("http://127.0.0.1:8000/api/");
            var self = this;
            base.API.call('get_game_list', {}).then(function (response) {
                var _this = this;
                this.game_list = response['gameList'];
                this.game_list.forEach(function (val, index, array) {
                    var game_name = new egret.TextField();
                    game_name.text = val[1];
                    game_name.size = 40;
                    game_name.lineSpacing = 10;
                    game_name.touchEnabled = true;
                    game_name.border = true;
                    game_name.borderColor = 0x00ff00;
                    game_name.anchorOffsetX = game_name.width / 2;
                    game_name.anchorOffsetY = game_name.height / 2;
                    game_name.x = self.stageWidth / 2;
                    game_name.y = 100 + index * 50;
                    game_name.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.startGame.bind(self, val[0], val[1], val[2]), _this);
                    self.sprite.addChild(game_name);
                });
            });
        };
        Index.prototype.startGame = function (game_secret, gameName, inviter) {
            if (this.stage) {
                var enterGame = new game.EnterGame(game_secret, gameName, inviter, this.stage.stageWidth, this.stage.stageHeight);
                this.stage.addChild(enterGame);
                this.sprite.visible = false;
                this.label.visible = false;
            }
        };
        Index.prototype.onTouchBegin = function () {
            console.log(this.stage);
            if (this.stage) {
                var inviteScene = new game.CreateGame(this.stage.stageWidth, this.stage.stageHeight);
                this.stage.addChild(inviteScene);
                this.sprite.visible = false;
                this.label.visible = false;
                // this.stage.removeChild( this.sprite );
            }
        };
        Index.prototype.onTouchEnd = function () {
            egret.log("onTouchEnd");
        };
        Index.prototype.onTouchMove = function () {
            egret.log("onTouchMove");
        };
        Index.prototype.onTouchTap = function () {
            egret.log("onTouchTap");
        };
        return Index;
    }(egret.DisplayObjectContainer));
    game.Index = Index;
    __reflect(Index.prototype, "game.Index");
})(game || (game = {}));
//# sourceMappingURL=Index.js.map