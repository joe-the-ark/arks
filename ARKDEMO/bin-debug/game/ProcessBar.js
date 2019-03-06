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
    var ProcessBar = (function (_super) {
        __extends(ProcessBar, _super);
        function ProcessBar(stageWidth, stageHeight, process, missionName) {
            var _this = _super.call(this) || this;
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            /***     初始赋值代码结束    ***/
            _this.processX = 20;
            _this.process = 100;
            _this.missionName = '';
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            _this.process = process;
            _this.missionName = missionName;
            _this.addChild(_this.sprite);
            _this.processBar();
            return _this;
        }
        ProcessBar.prototype.processBar = function () {
            var border = new egret.Shape();
            var processBar = new egret.Shape();
            var processText = new egret.TextField();
            var missionName = new egret.TextField();
            border.graphics.beginFill(0x51BEC4);
            border.graphics.drawRect(0, 0, this.stageWidth, 50);
            border.graphics.endFill();
            processBar.graphics.beginFill(0x373193);
            processBar.graphics.drawRect(this.processX, 10, this.process * 2, 30);
            processBar.graphics.endFill();
            processText.text = this.process.toString() + '%';
            processText.size = 20;
            processText.x = this.processX + this.process * 2 + 15;
            processText.y = 15;
            processText.textColor = 0xffffff;
            if (this.process > 50) {
                processText.x = (this.processX + this.process * 2) / 2 - (15 * (this.process / 100));
            }
            missionName.text = this.missionName;
            missionName.textAlign = egret.VerticalAlign.MIDDLE;
            missionName.size = 27;
            missionName.x = 250;
            missionName.y = 5;
            missionName.textColor = 0xffffff;
            this.sprite.addChild(border);
            this.sprite.addChild(processBar);
            this.sprite.addChild(processText);
            this.sprite.addChild(missionName);
        };
        return ProcessBar;
    }(egret.DisplayObjectContainer));
    game.ProcessBar = ProcessBar;
    __reflect(ProcessBar.prototype, "game.ProcessBar");
})(game || (game = {}));
//# sourceMappingURL=ProcessBar.js.map