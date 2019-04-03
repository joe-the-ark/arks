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
    var Complete = (function (_super) {
        __extends(Complete, _super);
        function Complete(stageWidth, stageHeight) {
            var _this = _super.call(this) || this;
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            /***     初始赋值代码结束    ***/
            _this.game_secret = '';
            _this.gameName = '';
            _this.inviter = '';
            _this.player = '';
            _this._width = 600;
            _this._x = 20;
            _this._margin = 20;
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            _this.addChild(_this.sprite);
            _this.processBar();
            _this.intro();
            return _this;
        }
        Complete.prototype.processBar = function () {
            var processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 100, "Mission 2 > Complete");
            this.sprite.addChild(processBar);
        };
        Complete.prototype.intro = function () {
            var intro = new egret.TextField();
            intro.text = "Thank you for travelling with The ARK!\n\nDownload a PDF with your journeys data\n\nWeChat with the developer \n\nRe-Embark on The ARK \n\nRecommend The ARK to your friends\n\nCoffee for the developer";
            intro.width = this._width;
            intro.x = this._x;
            intro.y = 100;
            this.sprite.addChild(intro);
            base.API.call('game_end', {
                'inviter_name': this.inviter,
                'game_secret': this.game_secret,
                'player': this.player,
                'gameName': this.gameName,
            }).then(function (response) {
            });
        };
        return Complete;
    }(egret.DisplayObjectContainer));
    game.Complete = Complete;
    __reflect(Complete.prototype, "game.Complete");
})(game || (game = {}));
//# sourceMappingURL=Complete.js.map