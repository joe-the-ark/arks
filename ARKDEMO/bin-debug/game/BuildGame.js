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
    var BuildGame = (function (_super) {
        __extends(BuildGame, _super);
        function BuildGame() {
            var _this = _super.call(this) || this;
            _this.sprite = new egret.Sprite();
            _this.sprite.graphics.beginFill(0xff0000);
            _this.sprite.graphics.drawRect(0, 0, 200, 300);
            _this.sprite.graphics.endFill();
            _this.addChild(_this.sprite);
            _this.sprite.touchEnabled = true;
            _this.sprite.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
            _this.sprite.addEventListener(egret.TouchEvent.TOUCH_END, _this.onTouchEnd, _this);
            _this.sprite.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.onTouchMove, _this);
            _this.sprite.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchTap, _this);
            return _this;
        }
        BuildGame.prototype.onTouchBegin = function () {
            // if( this.sprite.parent ) {
            //     this.sprite.parent.removeChild( this.sprite );
            // }
        };
        BuildGame.prototype.onTouchEnd = function () {
            egret.log("onTouchEnd");
        };
        BuildGame.prototype.onTouchMove = function () {
            egret.log("onTouchMove");
        };
        BuildGame.prototype.onTouchTap = function () {
            egret.log("onTouchTap");
        };
        return BuildGame;
    }(egret.DisplayObjectContainer));
    game.BuildGame = BuildGame;
    __reflect(BuildGame.prototype, "game.BuildGame");
})(game || (game = {}));
//# sourceMappingURL=BuildGame.js.map