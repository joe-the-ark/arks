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
        function Complete(stageWidth, stageHeight, inviter, game_secret, player, gameName) {
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
            _this.player = player;
            _this.inviter = inviter;
            _this.game_secret = game_secret;
            _this.gameName = gameName;
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
            intro.text = "Thank you for travelling with The ARK!\n\nWeChat with the developer \n\nRe-Embark on The ARK \n\nYou can recommend it to your friends by sharing the link ark. metatype. cn\n";
            intro.width = this._width;
            intro.x = this._x;
            intro.y = 100;
            var tx2 = new egret.TextField;
            tx2.textFlow = new Array({ text: "View results", style: { "href": "https://ark.metatype.cn:8105/result/complete/" + this.player + "/" + this.game_secret + "/" + this.inviter + "/" } });
            tx2.touchEnabled = true;
            tx2.background = true;
            tx2.backgroundColor = 0xffcc33;
            var tx = new egret.TextField;
            tx.textFlow = new Array({ text: "Coffee for the developer", style: { "href": "https://www.paypal.me/joetheark" } });
            tx.touchEnabled = true;
            tx.background = true;
            tx.backgroundColor = 0xffcc33;
            tx2.addEventListener(egret.TextEvent.LINK, function (evt) {
                console.log(evt.text);
            }, this);
            tx2.x = 20;
            tx2.y = 400;
            this.sprite.addChild(tx2);
            tx.addEventListener(egret.TextEvent.LINK, function (evt) {
                console.log(evt.text);
            }, this);
            tx.x = 20;
            tx.y = 500;
            this.sprite.addChild(tx);
            this.sprite.addChild(intro);
        };
        return Complete;
    }(egret.DisplayObjectContainer));
    game.Complete = Complete;
    __reflect(Complete.prototype, "game.Complete");
})(game || (game = {}));
//# sourceMappingURL=Complete.js.map