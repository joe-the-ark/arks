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
    var MissionResult = (function (_super) {
        __extends(MissionResult, _super);
        function MissionResult(stageWidth, stageHeight, inviter, game_secret, player, gameName, characterListParams) {
            var _this = _super.call(this) || this;
            _this.game_secret = '';
            _this.gameName = '';
            _this.inviter = '';
            _this.player = '';
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            _this.characterListParams = [];
            _this.simulatedData = [];
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.player = player;
            _this.gameName = gameName;
            _this.game_secret = game_secret;
            _this.inviter = inviter;
            _this.characterListParams = characterListParams;
            _this.sprite = new egret.Sprite();
            _this.addChild(_this.sprite);
            _this.drawTitle();
            // this.drawLine()
            _this.drawResult();
            return _this;
        }
        MissionResult.prototype.drawResult = function () {
            var self = this;
            base.API.Init("http://127.0.0.1:8000/api/");
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
        MissionResult.prototype.drawTensionScale = function () {
            var _this = this;
            console.log(this.simulatedData);
            this.simulatedData.forEach(function (val, index, array) {
                try {
                    var score = val[2].toString();
                    // let tensionScale = new game.TensionScale(100, 60, [val[0], val[1]], score);
                    var zoramap = new game.ZORAMap(val[0], val[1], _this.player, val[2], val[3], _this.stageWidth, _this.stageHeight);
                    zoramap.x = 10;
                    zoramap.y = 200 + (index - 1) * 150;
                    // if (index % 2 == 1) {
                    //     zoramap.x = 150;
                    //     zoramap.y = 150 + (index - 1) * 100;
                    // } 
                    // else if (index % 2 == 0) {
                    //     zoramap.x = 350;
                    //     zoramap.y = 150 + index * 100;
                    // }
                    _this.sprite.addChild(zoramap);
                }
                catch (error) {
                }
            });
        };
        MissionResult.prototype.drawLine = function () {
            var shape = new egret.Shape();
            shape.graphics.lineStyle(4, 0xff00ff);
            shape.graphics.moveTo(this.stageWidth / 2, this.stageHeight);
            shape.graphics.lineTo(this.stageWidth / 2, 150);
            this.sprite.addChild(shape);
        };
        MissionResult.prototype.drawTitle = function () {
            var shape = new egret.Shape();
            shape.graphics.beginFill(0x00ff00, 0.5);
            shape.graphics.drawRect(0, 0, this.stageWidth, 130);
            shape.graphics.endFill();
            this.sprite.addChild(shape);
            var title = new egret.TextField();
            title.text = "Mission 1 Complete: Here is an image of you in your Team‘s Zone of Responsible Action.";
            title.size = 30;
            title.width = this.stageWidth;
            title.x = 10;
            title.y = 2;
            this.sprite.addChild(title);
        };
        return MissionResult;
    }(egret.DisplayObjectContainer));
    game.MissionResult = MissionResult;
    __reflect(MissionResult.prototype, "game.MissionResult");
})(game || (game = {}));
//# sourceMappingURL=MissionResult.js.map