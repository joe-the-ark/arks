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
        function Index(stageWidth, stageHeight, nickname, openid) {
            var _this = _super.call(this) || this;
            _this.game_list = [];
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            _this.addChild(_this.sprite);
            _this.sprite.touchEnabled = true;
            _this.nickname = nickname;
            _this.openid = openid;
            _this.label = new egret.TextField();
            _this.label.text = "start";
            _this.label.height = 30;
            _this.label.width = 80;
            _this.label.anchorOffsetX = _this.label.width / 2;
            _this.label.anchorOffsetY = _this.label.height / 2;
            _this.label.x = _this.stageWidth / 2;
            _this.label.y = _this.stageHeight / 2;
            _this.label.touchEnabled = true;
            _this.label.background = true;
            _this.label.backgroundColor = 0xffffff;
            _this.label.border = true;
            _this.label.borderColor = 0x00ff00;
            _this.label.fontFamily = "Arial";
            _this.label.textColor = 0xFF0000;
            _this.label.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
            _this.sprite.addChild(_this.label);
            return _this;
        }
        Index.prototype.onTouchBegin = function () {
            base.API.Init("http://work.metatype.cn:8105/api/");
            base.API.call("create_game", { 'inviter': this.nickname, 'gameName': this.openid, 'game_id': this.openid }).then(function (response) {
            }).catch(function (err) {
            });
            if (this.stage) {
                this.sprite.visible = false;
                this.removeChild(this.sprite);
                var inviteScene = new game.CreateGame(this.stage.stageWidth, this.stage.stageHeight, this.nickname, this.openid, this.openid, this.nickname, 'inviter');
                this.stage.addChild(inviteScene);
            }
        };
        return Index;
    }(egret.DisplayObjectContainer));
    game.Index = Index;
    __reflect(Index.prototype, "game.Index");
})(game || (game = {}));
//# sourceMappingURL=Index.js.map