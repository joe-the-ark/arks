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
    var LoadingScene = (function (_super) {
        __extends(LoadingScene, _super);
        function LoadingScene() {
            var _this = _super.call(this) || this;
            _this.sprite = new egret.Sprite();
            _this.sprite.graphics.beginFill(0xff0000);
            _this.sprite.graphics.drawRect(0, 0, 100, 100);
            _this.sprite.graphics.endFill();
            _this.addChild(_this.sprite);
            _this.sprite.touchEnabled = true;
            _this.sprite.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
            _this.sprite.addEventListener(egret.TouchEvent.TOUCH_END, _this.onTouchEnd, _this);
            _this.sprite.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this.onTouchMove, _this);
            _this.sprite.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchTap, _this);
            return _this;
        }
        LoadingScene.prototype.onTouchBegin = function () {
            // if( this.sprite.parent ) {
            //     this.sprite.parent.removeChild( this.sprite );
            // }
            this.sprite.visible = false;
            var buildGame = new game.BuildGame();
            this.stage.addChild(buildGame);
        };
        LoadingScene.prototype.onTouchEnd = function () {
            egret.log("onTouchEnd");
        };
        LoadingScene.prototype.onTouchMove = function () {
            egret.log("onTouchMove");
        };
        LoadingScene.prototype.onTouchTap = function () {
            egret.log("onTouchTap");
        };
        return LoadingScene;
    }(egret.DisplayObjectContainer));
    game.LoadingScene = LoadingScene;
    __reflect(LoadingScene.prototype, "game.LoadingScene");
})(game || (game = {}));
//# sourceMappingURL=LoadingScene.js.map