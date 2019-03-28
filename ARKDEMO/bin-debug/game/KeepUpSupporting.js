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
    var KeepUpSupporting = (function (_super) {
        __extends(KeepUpSupporting, _super);
        function KeepUpSupporting(stageWidth, stageHeight, process, missionName) {
            var _this = _super.call(this) || this;
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            /***     初始赋值代码结束    ***/
            _this.game_secret = '';
            _this.gameName = '';
            _this.inviter = '';
            _this.player = '';
            _this._width = 600;
            _this.noticeHeight = 120;
            _this._x = 20;
            _this._margin = 20;
            _this.characterListParams = [];
            _this.votedScalesNumber = 1;
            _this.scalesNumber = 7;
            _this.remainingScalesNumber = _this.scalesNumber - _this.votedScalesNumber;
            _this.ttsms = [];
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            _this.addChild(_this.sprite);
            _this.processBar();
            _this.notice();
            _this.background();
            _this.remainingPlayers();
            _this.votedPlayers();
            _this.rightIcon();
            _this.timer = new egret.Timer(1000, 0);
            // this.timer.addEventListener(egret.TimerEvent.TIMER, this.getGameResult, this);
            _this.timer.start();
            return _this;
        }
        KeepUpSupporting.prototype.processBar = function () {
            var processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 55, "Mission 2 > Keep Up Voting");
            this.sprite.addChild(processBar);
        };
        KeepUpSupporting.prototype.notice = function () {
            var votedScalesNumber = this.votedScalesNumber.toString();
            var scalesNumber = this.scalesNumber.toString();
            var remainingScalesNumber = this.remainingScalesNumber.toString();
            this.noticeBox = new egret.TextField();
            this.noticeBox.text = "Great! You answered " + votedScalesNumber.toString() + " out of " + scalesNumber.toString() + " Feedbacks. Fill in the remaining " + remainingScalesNumber.toString() + " to finish Mission 2 and Embrace your teammates anonymous Feedback for a better deployment of the team's potentialities.!";
            this.noticeBox.textColor = 0x000000;
            this.noticeBox.width = this._width;
            this.noticeBox.height = this.noticeHeight;
            this.noticeBox.x = this._x;
            this.noticeBox.y = 60;
            this.noticeBox.background = true;
            this.noticeBox.backgroundColor = 0xffcc33;
            this.sprite.addChild(this.noticeBox);
        };
        KeepUpSupporting.prototype.background = function () {
            var grey = new egret.Shape();
            grey.x = this._x / 2; // 20会多
            grey.y = this.noticeBox.height - 20; // 减掉多的空白
            grey.graphics.beginFill(0xcccccc, 1);
            grey.graphics.drawRect(grey.x, grey.y, 380, this.stageHeight);
            grey.graphics.endFill();
            this.sprite.addChild(grey);
            var orange = new egret.Shape();
            orange.x = this._x / 2 + grey.width / 2 + this._margin / 2;
            orange.y = this.noticeBox.height - 20;
            orange.graphics.beginFill(0xffcc33, 1);
            orange.graphics.drawRect(orange.x, orange.y, 200, this.stageHeight);
            orange.graphics.endFill();
            this.sprite.addChild(orange);
        };
        KeepUpSupporting.prototype.remainingPlayers = function () {
            var group = new eui.Group();
            var exml = "\n                        <e:Skin xmlns:e=\"http://ns.egret.com/eui\" states=\"up,down\" height=\"50\">\n                            <e:Label text=\"{data}\" textColor.down=\"0xFFFFFF\" textColor.up=\"0x666666\" horizontalCenter=\"0\" verticalCenter=\"0\"/> \n                        </e:Skin>";
            var list = new eui.List();
            var remainingPlayers = [
                "Joe", "Oliver", "Jake",
                "Callum", "Jacob", "Noah",
                "Liam", "Mason", "James",
                "William", "Thomas", "Charles",
                "Joseph", "Richard", "David",
                "Joe", "Oliver", "Jake",
                "Callum", "Jacob", "Noah",
                "Liam", "Mason", "James",
                "William", "Thomas", "Charles",
                "Joseph", "Richard", "David",
            ];
            list.dataProvider = new eui.ArrayCollection(remainingPlayers);
            list.itemRendererSkinName = exml;
            group.addChild(list);
            var myScroller = new eui.Scroller();
            myScroller.width = 380;
            myScroller.height = this.stageHeight - 80 - this.noticeBox.height;
            myScroller.x = myScroller.width / 2 - 40;
            myScroller.y = this.noticeBox.height + 80;
            myScroller.viewport = group;
            this.sprite.addChild(myScroller);
        };
        KeepUpSupporting.prototype.votedPlayers = function () {
            var group = new eui.Group();
            var exml = "\n                        <e:Skin xmlns:e=\"http://ns.egret.com/eui\" states=\"up,down\" height=\"50\">\n                            <e:Label text=\"{data}\" textColor.down=\"0xFFFFFF\" textColor.up=\"0x666666\" horizontalCenter=\"0\" verticalCenter=\"0\"/> \n                        </e:Skin>";
            var list = new eui.List();
            var votedPlayers = [
                "Joe", "Oliver", "Jake",
            ];
            list.dataProvider = new eui.ArrayCollection(votedPlayers);
            list.itemRendererSkinName = exml;
            group.addChild(list);
            var myScroller = new eui.Scroller();
            myScroller.width = 380;
            myScroller.height = this.stageHeight - 80 - this.noticeBox.height;
            myScroller.x = this.stageWidth - myScroller.width / 2 + 30;
            myScroller.y = this.noticeBox.height + 80;
            myScroller.viewport = group;
            this.sprite.addChild(myScroller);
        };
        KeepUpSupporting.prototype.rightIcon = function () {
            var rightIcon = new egret.Bitmap(RES.getRes("right_png"));
            rightIcon.width = 100;
            rightIcon.height = 100;
            rightIcon.anchorOffsetX = rightIcon.width / 2;
            rightIcon.anchorOffsetY = rightIcon.height / 2;
            rightIcon.x = this.stageWidth - 50;
            rightIcon.y = this.stageHeight - 50;
            rightIcon.touchEnabled = true;
            rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rightIcon, this);
            this.sprite.addChild(rightIcon);
        };
        return KeepUpSupporting;
    }(egret.DisplayObjectContainer));
    game.KeepUpSupporting = KeepUpSupporting;
    __reflect(KeepUpSupporting.prototype, "game.KeepUpSupporting");
})(game || (game = {}));
//# sourceMappingURL=KeepUpSupporting.js.map