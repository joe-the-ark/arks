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
    var DigestAdd = (function (_super) {
        __extends(DigestAdd, _super);
        function DigestAdd(stageWidth, stageHeight, result, inviter, game_secret, gameName, player) {
            var _this = _super.call(this) || this;
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            /***     初始赋值代码结束    ***/
            _this.game_secret = '';
            _this.gameName = '';
            _this.inviter = '';
            _this.player = '';
            _this._width = 600;
            _this.noticeHeight = 90;
            _this._x = 20;
            _this._margin = 20;
            _this.result = [];
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            _this.inviter = inviter;
            _this.player = player;
            _this.game_secret = game_secret;
            _this.gameName = gameName;
            _this.result = result;
            _this.addChild(_this.sprite);
            _this.processBar();
            _this.notice();
            _this.add();
            _this.addFeedback();
            _this.rightIcon();
            return _this;
        }
        DigestAdd.prototype.processBar = function () {
            var processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 85, "Mission 2 > Digest ADD");
            this.sprite.addChild(processBar);
        };
        DigestAdd.prototype.notice = function () {
            this.noticeBox = new egret.TextField();
            this.noticeBox.text = "Digest your 1 to 1 Feedback. Keep in mind: Feedback is a present from the heart. Direct feedback expresses care for your relationship.";
            this.noticeBox.textColor = 0x000000;
            this.noticeBox.width = this._width;
            this.noticeBox.x = this._x;
            this.noticeBox.y = 60;
            this.noticeBox.background = true;
            this.noticeBox.backgroundColor = 0xffcc33;
            this.sprite.addChild(this.noticeBox);
        };
        DigestAdd.prototype.add = function () {
            var add = new egret.TextField();
            add.text = "I would \nLOVE \nJOE\neven\nmore,\nif...";
            add.size = 30;
            add.x = this._x;
            add.y = this.noticeBox.height + 80;
            this.sprite.addChild(add);
        };
        DigestAdd.prototype.addFeedback = function () {
            var group = new eui.Group();
            var exml = "\n                        <e:Skin xmlns:e=\"http://ns.egret.com/eui\" states=\"up,down\" height=\"50\">\n                            <e:Label text=\"{data}\" textColor.down=\"0xFFFFFF\" textColor.up=\"0x666666\" horizontalCenter=\"0\" verticalCenter=\"0\"/> \n                        </e:Skin>";
            var list = new eui.List();
            var addFeedback = this.result[1];
            list.dataProvider = new eui.ArrayCollection(addFeedback);
            list.itemRendererSkinName = exml;
            group.addChild(list);
            var myScroller = new eui.Scroller();
            myScroller.width = 470;
            myScroller.height = this.stageHeight - 300;
            myScroller.x = 130 + this._margin;
            myScroller.y = this.noticeBox.height + 80;
            myScroller.viewport = group;
            this.sprite.addChild(myScroller);
        };
        DigestAdd.prototype.rightIcon = function () {
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
        DigestAdd.prototype.nextPage = function () {
            base.API.call('save_players_process', {
                'inviter_name': this.inviter,
                'game_secret': this.game_secret,
                'player': this.player,
                'game_name': this.gameName,
                'process': '7'
            }).then(function (response) {
            });
            this.sprite.visible = false;
            var digestAsk = new game.DigestAsk(this.stageWidth, this.stageHeight, this.result, this.inviter, this.game_secret, this.gameName, this.player);
            this.stage.addChild(digestAsk);
        };
        return DigestAdd;
    }(egret.DisplayObjectContainer));
    game.DigestAdd = DigestAdd;
    __reflect(DigestAdd.prototype, "game.DigestAdd");
})(game || (game = {}));
//# sourceMappingURL=DigestAdd.js.map