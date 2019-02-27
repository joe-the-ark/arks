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
    var TensionScale = (function (_super) {
        __extends(TensionScale, _super);
        function TensionScale(stageWidth, stageHeight) {
            var _this = _super.call(this) || this;
            _this.unselectedCharacterList = [];
            _this.selectedChaeacterList = [];
            _this.game_secret = '';
            _this.gameName = '';
            _this.inviter = '';
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            _this._touchStatus = false;
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            _this.addChild(_this.sprite);
            _this.sprite.touchEnabled = true;
            _this.drawCharacter();
            _this.drawScore();
            return _this;
        }
        TensionScale.prototype.startGame = function (game_secret, gameName, inviter) {
            if (this.stage) {
                var enterGame = new game.EnterGame(game_secret, gameName, inviter, this.stage.stageWidth, this.stage.stageHeight);
                this.stage.addChild(enterGame);
                this.sprite.visible = false;
                this.label.visible = false;
            }
        };
        TensionScale.prototype.drawCharacter = function () {
            var topCharacterBg = new egret.Shape();
            var bottomCharacterBg = new egret.Shape();
            var randomColor = 0x0000ff + Math.floor(Math.random() * 100) * (0xffffff / 100);
            topCharacterBg.graphics.beginFill(randomColor);
            topCharacterBg.graphics.drawRect(0, 0, 100, 60);
            topCharacterBg.graphics.endFill();
            bottomCharacterBg.graphics.beginFill(randomColor);
            bottomCharacterBg.graphics.drawRect(0, 80, 100, 60);
            bottomCharacterBg.graphics.endFill();
            this.sprite.addChild(topCharacterBg);
            this.sprite.addChild(bottomCharacterBg);
        };
        TensionScale.prototype.drawScore = function () {
            var score_bg = new egret.Shape();
            var score = new egret.TextField();
            var randomColor = 0x0000ff + Math.floor(Math.random() * 100) * (0xffffff / 100);
            var randomLineColor = 0x0000ff + Math.floor(Math.random() * 100) * (0xffffff / 100);
            var randomScore = this.getRandomScore(1, 81);
            score_bg.graphics.beginFill(randomColor, 0.7);
            score_bg.graphics.lineStyle(2, randomColor);
            score_bg.graphics.drawCircle(50, 70, 20);
            score_bg.graphics.endFill();
            this.sprite.addChild(score_bg);
            score.text = randomScore.toString();
            score.size = 20;
            score.textColor = 0xffffff;
            score.x = 40;
            score.y = 60;
            this.sprite.addChild(score);
        };
        TensionScale.prototype.onTouchBegin = function () {
            if (this.stage) {
                var inviteScene = new game.CreateGame(this.stage.stageWidth, this.stage.stageHeight);
                this.stage.addChild(inviteScene);
                this.sprite.visible = false;
                this.label.visible = false;
            }
        };
        TensionScale.prototype.getRandomScore = function (Min, Max) {
            var Range = Max - Min;
            var Rand = Math.random();
            return (Min + Math.round(Rand * Range));
        };
        TensionScale.prototype.onTouchEnd = function () {
            egret.log("onTouchEnd");
        };
        TensionScale.prototype.onTouchMove = function () {
            egret.log("onTouchMove");
        };
        TensionScale.prototype.onTouchTap = function () {
            egret.log("onTouchTap");
        };
        return TensionScale;
    }(egret.DisplayObjectContainer));
    game.TensionScale = TensionScale;
    __reflect(TensionScale.prototype, "game.TensionScale");
})(game || (game = {}));
//# sourceMappingURL=TensionScale.js.map