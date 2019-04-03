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
    var MissionPartialInsights = (function (_super) {
        __extends(MissionPartialInsights, _super);
        function MissionPartialInsights(stageWidth, stageHeight, character1, character2, player, selfPerception, inviter, game_secret, gameName, scorecount, chooser) {
            var _this = _super.call(this) || this;
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            /***     初始赋值代码结束    ***/
            _this._width = 600;
            _this._x = 20;
            _this.character1 = "Carefulness";
            _this.character2 = "Power";
            _this.playerName = "Joe";
            _this.selfPerception = 6;
            _this.game_secret = '';
            _this.gameName = '';
            _this.inviter = '';
            _this.chooser = '';
            _this.scorecount = 0;
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            _this.addChild(_this.sprite);
            _this.game_secret = game_secret;
            _this.playerName = player;
            _this.gameName = gameName;
            _this.inviter = inviter;
            _this.character1 = character1;
            _this.character2 = character2;
            _this.chooser = chooser;
            _this.selfPerception = selfPerception;
            _this.scorecount = scorecount;
            _this.processBar();
            _this.drawPotentialScale();
            return _this;
        }
        MissionPartialInsights.prototype.processBar = function () {
            var processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 50, "Mission 1 > Partial Insights");
            this.sprite.addChild(processBar);
        };
        MissionPartialInsights.prototype.drawPotentialScale = function () {
            var expandedTensionScale = new game.ExpandedTensionScale(this.stageWidth, this.stageHeight, this.character1, this.character2, this.playerName, this.selfPerception, this.game_secret, this.inviter, this.gameName, this.chooser, this.scorecount);
            expandedTensionScale.x = this._x + 350;
            expandedTensionScale.y = 180;
            this.sprite.addChild(expandedTensionScale);
        };
        return MissionPartialInsights;
    }(egret.DisplayObjectContainer));
    game.MissionPartialInsights = MissionPartialInsights;
    __reflect(MissionPartialInsights.prototype, "game.MissionPartialInsights");
})(game || (game = {}));
//# sourceMappingURL=MissionPartialInsights.js.map