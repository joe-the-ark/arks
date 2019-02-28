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
    var TensionScaleResult = (function (_super) {
        __extends(TensionScaleResult, _super);
        function TensionScaleResult(stageWidth, stageHeight, inviter, game_secret, player, gameName, characterListParams) {
            var _this = _super.call(this) || this;
            _this.unselectedCharacterList = [];
            _this.selectedChaeacterList = [];
            _this.game_secret = '';
            _this.player = '';
            _this.gameName = '';
            _this.inviter = '';
            _this.characterListParams = [];
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            _this.simulatedData = [];
            _this._touchStatus = false;
            _this.game_secret = game_secret;
            _this.player = player;
            _this.gameName = gameName;
            _this.inviter = inviter;
            _this.characterListParams = characterListParams;
            console.log(characterListParams);
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            _this.addChild(_this.sprite);
            _this.sprite.touchEnabled = true;
            _this.drawTensionScale();
            _this.drawTitle();
            _this.timer = new egret.Timer(1000, 0);
            _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.getGameResult, _this);
            _this.timer.start();
            return _this;
        }
        TensionScaleResult.prototype.getGameResult = function () {
            var self = this;
            base.API.Init("http://39.104.85.167:8105/api/");
            base.API.call('get_game_score', {
                'characterListParams': self.characterListParams,
                'inviter': self.inviter,
                'gameSecret': self.game_secret,
                'player': self.player,
                'gameName': self.gameName,
            }).then(function (response) {
                var result = response['result'];
                self.simulatedData = result;
                self.drawTensionScale();
            });
        };
        TensionScaleResult.prototype.startGame = function (game_secret, gameName, inviter) {
            if (this.stage) {
                var enterGame = new game.EnterGame(game_secret, gameName, inviter, this.stage.stageWidth, this.stage.stageHeight);
                this.stage.addChild(enterGame);
                this.sprite.visible = false;
                this.label.visible = false;
            }
        };
        TensionScaleResult.prototype.drawTitle = function () {
            var shape = new egret.Shape();
            shape.graphics.beginFill(0x00ff00, 0.5);
            shape.graphics.drawRect(0, 0, this.stageWidth, 130);
            shape.graphics.endFill();
            this.sprite.addChild(shape);
            var title = new egret.TextField();
            title.text = "Identify the major sources of tension with you teammates";
            title.size = 30;
            title.width = this.stageWidth;
            title.x = 20;
            title.y = 2;
            this.sprite.addChild(title);
        };
        TensionScaleResult.prototype.drawTensionScale = function () {
            var _this = this;
            console.log(this.simulatedData);
            this.simulatedData.forEach(function (val, index, array) {
                var tensionScale = new game.TensionScale(100, 60, [val[0], val[1]], val[2]);
                if (index % 2 == 1) {
                    tensionScale.x = 150;
                    tensionScale.y = 150 + (index - 1) * 100;
                }
                else if (index % 2 == 0) {
                    tensionScale.x = 350;
                    tensionScale.y = 150 + index * 100;
                }
                _this.sprite.addChild(tensionScale);
            });
        };
        TensionScaleResult.prototype.onTouchBegin = function () {
            if (this.stage) {
                var inviteScene = new game.CreateGame(this.stage.stageWidth, this.stage.stageHeight);
                this.stage.addChild(inviteScene);
                this.sprite.visible = false;
                this.label.visible = false;
            }
        };
        TensionScaleResult.prototype.getRandomScore = function (Min, Max) {
            var Range = Max - Min;
            var Rand = Math.random();
            return (Min + Math.round(Rand * Range));
        };
        TensionScaleResult.prototype.onTouchEnd = function () {
            egret.log("onTouchEnd");
        };
        TensionScaleResult.prototype.onTouchMove = function () {
            egret.log("onTouchMove");
        };
        TensionScaleResult.prototype.onTouchTap = function () {
            egret.log("onTouchTap");
        };
        return TensionScaleResult;
    }(egret.DisplayObjectContainer));
    game.TensionScaleResult = TensionScaleResult;
    __reflect(TensionScaleResult.prototype, "game.TensionScaleResult");
})(game || (game = {}));
//# sourceMappingURL=TensionScaleResult.js.map