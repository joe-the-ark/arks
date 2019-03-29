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
    var Preview = (function (_super) {
        __extends(Preview, _super);
        function Preview(stageWidth, stageHeight, player, inviter, game_secret, gameName, count, loveFeedbackList, addFeedbackList, askFeedbackList, simulatedData) {
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
            _this.loveFeedbackList = [];
            _this.addFeedbackList = [];
            _this.askFeedbackList = [];
            _this.simulatedData = [];
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            _this.player = player;
            _this.inviter = inviter;
            _this.game_secret = game_secret;
            _this.gameName = gameName;
            _this.count = count;
            _this.simulatedData = simulatedData;
            _this.loveFeedbackList = loveFeedbackList;
            _this.addFeedbackList = addFeedbackList;
            _this.askFeedbackList = askFeedbackList;
            _this.addChild(_this.sprite);
            _this.processBar();
            _this.notice();
            _this.love();
            _this.add();
            _this.ask();
            _this.loveFeedback();
            _this.askFeedback();
            _this.addFeedback();
            _this.rightIcon();
            return _this;
        }
        Preview.prototype.processBar = function () {
            var processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 15, "Love, Add, Ask > PREVIEW");
            this.sprite.addChild(processBar);
        };
        Preview.prototype.notice = function () {
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
        Preview.prototype.love = function () {
            var love = new egret.TextField();
            love.text = "LOVE";
            love.size = 40;
            love.x = this._x;
            love.y = this.noticeBox.height + 80;
            this.sprite.addChild(love);
        };
        Preview.prototype.loveFeedback = function () {
            var group = new eui.Group();
            var exml = "\n                        <e:Skin xmlns:e=\"http://ns.egret.com/eui\" states=\"up,down\" height=\"50\">\n                            <e:Label text=\"{data}\" textColor.down=\"0xFFFFFF\" textColor.up=\"0x666666\" horizontalCenter=\"0\" verticalCenter=\"0\"/> \n                        </e:Skin>";
            var list = new eui.List();
            var loveFeedback = this.loveFeedbackList;
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
        Preview.prototype.add = function () {
            var add = new egret.TextField();
            add.text = "ADD";
            add.size = 40;
            add.x = this._x;
            add.y = this.noticeBox.height + 80 + (this.stageHeight - 120 - this._margin * 2) / 3 + this._margin;
            this.sprite.addChild(add);
        };
        Preview.prototype.addFeedback = function () {
            var group = new eui.Group();
            var exml = "\n                        <e:Skin xmlns:e=\"http://ns.egret.com/eui\" states=\"up,down\" height=\"50\">\n                            <e:Label text=\"{data}\" textColor.down=\"0xFFFFFF\" textColor.up=\"0x666666\" horizontalCenter=\"0\" verticalCenter=\"0\"/> \n                        </e:Skin>";
            var list = new eui.List();
            var addFeedback = this.addFeedbackList;
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
        Preview.prototype.ask = function () {
            var ask = new egret.TextField();
            ask.text = "ASK";
            ask.size = 40;
            ask.x = this._x;
            ask.y = this.noticeBox.height + 80 + 2 * (this.stageHeight - 120 - this._margin * 2) / 3 + this._margin;
            this.sprite.addChild(ask);
        };
        Preview.prototype.askFeedback = function () {
            var group = new eui.Group();
            var exml = "\n                        <e:Skin xmlns:e=\"http://ns.egret.com/eui\" states=\"up,down\" height=\"50\">\n                            <e:Label text=\"{data}\" textColor.down=\"0xFFFFFF\" textColor.up=\"0x666666\" horizontalCenter=\"0\" verticalCenter=\"0\"/> \n                        </e:Skin>";
            var list = new eui.List();
            var askFeedback = this.askFeedbackList;
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
        Preview.prototype.rightIcon = function () {
            var rightIcon = new egret.Bitmap(RES.getRes("right_png"));
            rightIcon.width = 100;
            rightIcon.height = 100;
            rightIcon.anchorOffsetX = rightIcon.width / 2;
            rightIcon.anchorOffsetY = rightIcon.height / 2;
            rightIcon.x = this.stageWidth - 50;
            rightIcon.y = this.stageHeight / 2;
            rightIcon.touchEnabled = true;
            rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextPage, this);
            this.sprite.addChild(rightIcon);
        };
        Preview.prototype.nextPage = function () {
            var self = this;
            base.API.Init("http://work.metatype.cn:8105/api/");
            base.API.call('get_players', {
                'inviter': self.inviter,
                'game_secret': self.game_secret,
                'gameName': self.gameName,
                'player': self.player
            }).then(function (response) {
                var result = response['result'];
                console.log(result);
                var player_list = result;
                var player_count = result.length;
                var votedPlayerList = result.slice(0, self.count + 1);
                var remainingPlayersList = result.slice(self.count + 1);
                var votedScalesNumber = votedPlayerList.length;
                var scalesNumber = player_count;
                var remainingScalesNumber = player_count - self.count + 1;
                var keepUpSupporting = new game.KeepUpSupporting(this.stageWidth, this.stageHeight, this.player, this.inviter, this.game_secret, this.gameName, this.count, this.simulatedData, player_list, votedPlayerList, remainingPlayersList);
                this.stage.addChild(keepUpSupporting);
                this.sprite.visible = false;
            });
        };
        return Preview;
    }(egret.DisplayObjectContainer));
    game.Preview = Preview;
    __reflect(Preview.prototype, "game.Preview");
})(game || (game = {}));
//# sourceMappingURL=Preview.js.map