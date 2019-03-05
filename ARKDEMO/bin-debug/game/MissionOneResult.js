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
    var MissionOneResult = (function (_super) {
        __extends(MissionOneResult, _super);
        function MissionOneResult(stageWidth, stageHeigh, inviter, game_secret, player, gameName, characterOne, characterTwo, playerScore, middle) {
            return _super.call(this) || this;
        }
        return MissionOneResult;
    }(egret.DisplayObjectContainer));
    game.MissionOneResult = MissionOneResult;
    __reflect(MissionOneResult.prototype, "game.MissionOneResult");
})(game || (game = {}));
//# sourceMappingURL=MissionOneResult.js.map