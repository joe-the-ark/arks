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
    var MajorTensionsTip = (function (_super) {
        __extends(MajorTensionsTip, _super);
        /***     初始赋值代码结束    ***/
        function MajorTensionsTip(stageWidth, stageHeight) {
            var _this = _super.call(this) || this;
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            _this.sprite.width = stageWidth;
            _this.sprite.height = stageHeight;
            _this.addChild(_this.sprite);
            _this.tipText();
            return _this;
        }
        MajorTensionsTip.prototype.tipText = function () {
            var title = new egret.TextField();
            var content = new egret.TextField();
            title.text = "Higher numbers indicate bigger tensions between your self-perception & the teams attribution of your position on the scale:";
            title.size = 30;
            title.x = 0;
            title.y = 0;
            title.width = this.stageWidth;
            title.background = true;
            title.backgroundColor = 0x4B8DC3;
            content.text = "• White values: mark areas of authentic action.            • Values over 13: indicate your dissociative effect on the team‘s organizing dynamics.\                  • Red values: mark your self- perception as being outside ZORA.                                                    • Yellow Values: mark your attributed position as being outside ZORA.";
            content.size = 30;
            content.x = 0;
            content.y = 90;
            content.width = this.stageWidth;
            content.background = true;
            content.backgroundColor = 0x4B8DC3;
            this.sprite.addChild(title);
            this.sprite.addChild(content);
        };
        return MajorTensionsTip;
    }(egret.DisplayObjectContainer));
    game.MajorTensionsTip = MajorTensionsTip;
    __reflect(MajorTensionsTip.prototype, "game.MajorTensionsTip");
})(game || (game = {}));
//# sourceMappingURL=MajorTensionsTip.js.map