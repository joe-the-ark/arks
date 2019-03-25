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
    var InitiatePartialInsights = (function (_super) {
        __extends(InitiatePartialInsights, _super);
        function InitiatePartialInsights(game_secret, inviter, player, gameName, stageWidth, stageHeight, playerCount, playerSCore) {
            var _this = _super.call(this) || this;
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            /***     初始赋值代码结束    ***/
            _this._width = 600;
            _this._x = 20;
            _this.character1 = "Insufficiently";
            _this.character2 = "Fully";
            _this.playerName = "Joe";
            _this.selfPerception = 20;
            _this.othersSelfPerception = [27, 31, 40, 47, 63];
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            _this.game_secret = game_secret;
            _this.inviter = inviter;
            _this.player = player;
            _this.gameName = gameName;
            _this.playerCount = playerCount;
            _this.selfPerception = playerSCore;
            _this.playerName = player;
            _this.addChild(_this.sprite);
            _this.processBar();
            _this.tip();
            _this.rightIcon();
            _this.drawPotentialScale();
            return _this;
        }
        InitiatePartialInsights.prototype.processBar = function () {
            var processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 12, "Initaite > Partial Insights");
            this.sprite.addChild(processBar);
        };
        InitiatePartialInsights.prototype.tip = function () {
            // let tip: egret.TextField = new egret.TextField()
            // tip.text = "35% of your Team (6 out of 14) has so far voted the Potential Scale. Invite everyone to follow suit. Here are Early Insights:\n\n• 20 is the lowest and 63 the highest value on the Scale.\n• The teams preliminary median is 38.\n• The perception of 2 people varies remarkably from the team average."
            // tip.width = 350
            // tip.x = this._x
            // tip.y = 80
            // tip.background = true
            // tip.backgroundColor = 0x359f93
            // this.sprite.addChild(tip)
            var intro = new egret.TextField();
            intro.text = "Our Basic Hypothesis is simple: a containment of tensions within the team results in less conflict & a better deployment of the team‘s potentialities.\n\n\n\n\n\n";
            intro.width = this._width;
            intro.x = this._x;
            intro.y = this.stageHeight - 180;
            intro.background = true;
            intro.backgroundColor = 0x359f93;
            this.sprite.addChild(intro);
        };
        InitiatePartialInsights.prototype.rightIcon = function () {
            var rightIcon = new egret.Bitmap(RES.getRes("right_png"));
            rightIcon.width = 100;
            rightIcon.height = 100;
            rightIcon.anchorOffsetX = rightIcon.width / 2;
            rightIcon.anchorOffsetY = rightIcon.height / 2;
            rightIcon.x = this.stageWidth - 50;
            rightIcon.y = this.stageHeight - 50;
            rightIcon.touchEnabled = true;
            rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextTouch, this);
            this.sprite.addChild(rightIcon);
        };
        InitiatePartialInsights.prototype.drawPotentialScale = function () {
            var potentialScale = new game.PotentialScale(this.stageWidth, this.stageHeight, this.character1, this.character2, this.playerName, this.selfPerception, this.game_secret, this.inviter, this.player, this.gameName, this.playerCount);
            potentialScale.x = this._x + 350;
            potentialScale.y = 80;
            this.sprite.addChild(potentialScale);
        };
        InitiatePartialInsights.prototype.nextTouch = function () {
            var game_secret = this.game_secret;
            var inviter = this.inviter;
            var player = this.player;
            var gameName = this.gameName;
            var stageWidth = this.stageWidth;
            var stageHeight = this.stageHeight;
            // let count = 0
            var playerSCore = this.selfPerception;
            var playerCount = this.playerCount;
            var characterChoosePage = new game.CharacterChoosePage(game_secret, inviter, player, gameName, stageWidth, stageHeight, playerCount);
            this.stage.addChild(characterChoosePage);
            this.sprite.visible = false;
        };
        return InitiatePartialInsights;
    }(egret.DisplayObjectContainer));
    game.InitiatePartialInsights = InitiatePartialInsights;
    __reflect(InitiatePartialInsights.prototype, "game.InitiatePartialInsights");
})(game || (game = {}));
//# sourceMappingURL=InitiatePartialInsights.js.map