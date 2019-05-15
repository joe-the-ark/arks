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
    var Preview2 = (function (_super) {
        __extends(Preview2, _super);
        function Preview2(stageWidth, stageHeigh) {
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
            _this.stageHeight = stageHeigh;
            _this.sprite = new egret.Sprite();
            _this.addChild(_this.sprite);
            _this.processBar();
            _this.notice();
            _this.love();
            _this.loveFeedback();
            _this.add();
            _this.ask();
            _this.askFeedback();
            _this.addFeedback();
            rightIcon = new egret.Bitmap(RES.getRes("right_png"));
            rightIcon.width = 100;
            rightIcon.height = 100;
            rightIcon.anchorOffsetX = rightIcon.width / 2;
            rightIcon.anchorOffsetY = rightIcon.height / 2;
            rightIcon.x = _this.stageWidth - 50;
            rightIcon.y = _this.stageHeight / 2;
            rightIcon.touchEnabled = true;
            rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.rightIcon, _this);
            _this.sprite.addChild(rightIcon);
            return _this;
        }
        Preview2.prototype.processBar = function () {
            var processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 15, "Love, Add, Ask > PREVIEW");
            this.sprite.addChild(processBar);
        };
        Preview2.prototype.notice = function () {
            this.noticeBox = new egret.TextField();
            this.noticeBox.text = "You receive previews on your feedback in return for your efforts. The full list with all feedbacks will be your reward upon completion of Mission 2.";
            this.noticeBox.textColor = 0x000000;
            this.noticeBox.width = this._width;
            this.noticeBox.x = this._x;
            this.noticeBox.y = 60;
            this.noticeBox.background = true;
            this.noticeBox.backgroundColor = 0xffcc33;
            this.sprite.addChild(this.noticeBox);
        };
        Preview2.prototype.love = function () {
            var love = new egret.TextField();
            love.text = "LOVE";
            love.size = 40;
            love.x = this._x;
            love.y = this.noticeBox.height + 80;
            this.sprite.addChild(love);
        };
        Preview2.prototype.loveFeedback = function () {
            var group = new eui.Group();
            var exml = "\n                        <e:Skin xmlns:e=\"http://ns.egret.com/eui\" states=\"up,down\" height=\"50\">\n                            <e:Label text=\"{data}\" textColor.down=\"0xFFFFFF\" textColor.up=\"0x666666\" horizontalCenter=\"0\" verticalCenter=\"0\"/> \n                        </e:Skin>";
            var list = new eui.List();
            var loveFeedback = [
                "Example text Example text text", "doloru inctiae et, qui tem eos ", "niminctur moluptu reius.Solum,",
                "reiciis natureped molumet,cupta", "mint. Eimil inctur, volo et ut", ". Uciaecte cus se te nus ullace",
                "atio. Uciaecte cus se volo te", "doloru inctiae et, qui tem eos ", "niminctur moluptu reius.Solum,",
                "reiciis natureped molumet,cupta", "mint. Eimil inctur, volo et ut", ". Uciaecte cus se te nus ullace",
                "atio. Uciaecte cus se volo te", "doloru inctiae et, qui tem eos ", "niminctur moluptu reius.Solum,",
                "reiciis natureped molumet,cupta", "mint. Eimil inctur, volo et ut", ". Uciaecte cus se te nus ullace",
                "atio. Uciaecte cus se volo te", "doloru inctiae et, qui tem eos ", "niminctur moluptu reius.Solum,",
                "reiciis natureped molumet,cupta", "mint. Eimil inctur, volo et ut", ". Uciaecte cus se te nus ullace",
                "atio. Uciaecte cus se volo te", "doloru inctiae et, qui tem eos ", "niminctur moluptu reius.Solum,",
                "reiciis natureped molumet,cupta", "mint. Eimil inctur, volo et ut", ". Uciaecte cus se te nus ullace",
                "atio. Uciaecte cus se volo te", "doloru inctiae et, qui tem eos ", "niminctur moluptu reius.Solum,",
                "reiciis natureped molumet,cupta", "mint. Eimil inctur, volo et ut", ". Uciaecte cus se te nus ullace",
                "atio. Uciaecte cus se volo te", "doloru inctiae et, qui tem eos ", "niminctur moluptu reius.Solum,",
                "reiciis natureped molumet,cupta", "mint. Eimil inctur, volo et ut", ". Uciaecte cus se te nus ullace",
            ];
            list.dataProvider = new eui.ArrayCollection(loveFeedback);
            list.itemRendererSkinName = exml;
            group.addChild(list);
            var myScroller = new eui.Scroller();
            myScroller.width = 470;
            myScroller.height = (this.stageHeight - 120 - this._margin * 2) / 3;
            myScroller.x = 130 + this._margin;
            myScroller.y = this.noticeBox.height + 80;
            myScroller.viewport = group;
            this.sprite.addChild(myScroller);
        };
        Preview2.prototype.add = function () {
            var add = new egret.TextField();
            add.text = "ADD";
            add.size = 40;
            add.x = this._x;
            add.y = this.noticeBox.height + 80 + (this.stageHeight - 120 - this._margin * 2) / 3 + this._margin;
            this.sprite.addChild(add);
        };
        Preview2.prototype.addFeedback = function () {
            var group = new eui.Group();
            var exml = "\n                        <e:Skin xmlns:e=\"http://ns.egret.com/eui\" states=\"up,down\" height=\"50\">\n                            <e:Label text=\"{data}\" textColor.down=\"0xFFFFFF\" textColor.up=\"0x666666\" horizontalCenter=\"0\" verticalCenter=\"0\"/> \n                        </e:Skin>";
            var list = new eui.List();
            var addFeedback = [
                "Example text Example text text", "doloru inctiae et, qui tem eos ", "niminctur moluptu reius.Solum,",
                "reiciis natureped molumet,cupta", "mint. Eimil inctur, volo et ut", ". Uciaecte cus se te nus ullace",
                "atio. Uciaecte cus se volo te", "doloru inctiae et, qui tem eos ", "niminctur moluptu reius.Solum,",
                "reiciis natureped molumet,cupta", "mint. Eimil inctur, volo et ut", ". Uciaecte cus se te nus ullace",
                "atio. Uciaecte cus se volo te", "doloru inctiae et, qui tem eos ", "niminctur moluptu reius.Solum,",
                "reiciis natureped molumet,cupta", "mint. Eimil inctur, volo et ut", ". Uciaecte cus se te nus ullace",
                "atio. Uciaecte cus se volo te", "doloru inctiae et, qui tem eos ", "niminctur moluptu reius.Solum,",
                "reiciis natureped molumet,cupta", "mint. Eimil inctur, volo et ut", ". Uciaecte cus se te nus ullace",
                "atio. Uciaecte cus se volo te", "doloru inctiae et, qui tem eos ", "niminctur moluptu reius.Solum,",
                "reiciis natureped molumet,cupta", "mint. Eimil inctur, volo et ut", ". Uciaecte cus se te nus ullace",
                "atio. Uciaecte cus se volo te", "doloru inctiae et, qui tem eos ", "niminctur moluptu reius.Solum,",
                "reiciis natureped molumet,cupta", "mint. Eimil inctur, volo et ut", ". Uciaecte cus se te nus ullace",
                "atio. Uciaecte cus se volo te", "doloru inctiae et, qui tem eos ", "niminctur moluptu reius.Solum,",
                "reiciis natureped molumet,cupta", "mint. Eimil inctur, volo et ut", ". Uciaecte cus se te nus ullace",
            ];
            list.dataProvider = new eui.ArrayCollection(addFeedback);
            list.itemRendererSkinName = exml;
            group.addChild(list);
            var myScroller = new eui.Scroller();
            myScroller.width = 470;
            myScroller.height = (this.stageHeight - 120 - this._margin * 2) / 3;
            myScroller.x = 130 + this._margin;
            myScroller.y = this.noticeBox.height + 80 + 2 * (this.stageHeight - 120 - this._margin * 2) / 3 + this._margin;
            myScroller.viewport = group;
            this.sprite.addChild(myScroller);
        };
        Preview2.prototype.ask = function () {
            var ask = new egret.TextField();
            ask.text = "ASK";
            ask.size = 40;
            ask.x = this._x;
            ask.y = this.noticeBox.height + 80 + 2 * (this.stageHeight - 120 - this._margin * 2) / 3 + this._margin;
            this.sprite.addChild(ask);
        };
        Preview2.prototype.askFeedback = function () {
            var group = new eui.Group();
            var exml = "\n                        <e:Skin xmlns:e=\"http://ns.egret.com/eui\" states=\"up,down\" height=\"50\">\n                            <e:Label text=\"{data}\" textColor.down=\"0xFFFFFF\" textColor.up=\"0x666666\" horizontalCenter=\"0\" verticalCenter=\"0\"/> \n                        </e:Skin>";
            var list = new eui.List();
            var askFeedback = [
                "Example text Example text text", "doloru inctiae et, qui tem eos ", "niminctur moluptu reius.Solum,",
                "reiciis natureped molumet,cupta", "mint. Eimil inctur, volo et ut", ". Uciaecte cus se te nus ullace",
                "atio. Uciaecte cus se volo te", "doloru inctiae et, qui tem eos ", "niminctur moluptu reius.Solum,",
                "reiciis natureped molumet,cupta", "mint. Eimil inctur, volo et ut", ". Uciaecte cus se te nus ullace",
                "atio. Uciaecte cus se volo te", "doloru inctiae et, qui tem eos ", "niminctur moluptu reius.Solum,",
                "reiciis natureped molumet,cupta", "mint. Eimil inctur, volo et ut", ". Uciaecte cus se te nus ullace",
                "atio. Uciaecte cus se volo te", "doloru inctiae et, qui tem eos ", "niminctur moluptu reius.Solum,",
                "reiciis natureped molumet,cupta", "mint. Eimil inctur, volo et ut", ". Uciaecte cus se te nus ullace",
                "atio. Uciaecte cus se volo te", "doloru inctiae et, qui tem eos ", "niminctur moluptu reius.Solum,",
                "reiciis natureped molumet,cupta", "mint. Eimil inctur, volo et ut", ". Uciaecte cus se te nus ullace",
                "atio. Uciaecte cus se volo te", "doloru inctiae et, qui tem eos ", "niminctur moluptu reius.Solum,",
                "reiciis natureped molumet,cupta", "mint. Eimil inctur, volo et ut", ". Uciaecte cus se te nus ullace",
                "atio. Uciaecte cus se volo te", "doloru inctiae et, qui tem eos ", "niminctur moluptu reius.Solum,",
                "reiciis natureped molumet,cupta", "mint. Eimil inctur, volo et ut", ". Uciaecte cus se te nus ullace",
            ];
            list.dataProvider = new eui.ArrayCollection(askFeedback);
            list.itemRendererSkinName = exml;
            group.addChild(list);
            var myScroller = new eui.Scroller();
            myScroller.width = 470;
            myScroller.height = (this.stageHeight - 120 - this._margin * 2) / 3;
            myScroller.x = 130 + this._margin;
            myScroller.y = this.noticeBox.height + 80 + (this.stageHeight - 120 - this._margin * 2) / 3 + this._margin;
            myScroller.viewport = group;
            this.sprite.addChild(myScroller);
        };
        return Preview2;
    }(egret.DisplayObjectContainer));
    game.Preview2 = Preview2;
    __reflect(Preview2.prototype, "game.Preview2");
})(game || (game = {}));
//# sourceMappingURL=Preview2.js.map