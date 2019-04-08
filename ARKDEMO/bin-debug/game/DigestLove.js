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
    var DigestLove = (function (_super) {
        __extends(DigestLove, _super);
        function DigestLove(stageWidth, stageHeight, result, inviter, game_secret, gameName, player) {
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
            _this.love();
            _this.loveFeedback();
            _this.rightIcon();
            return _this;
        }
        DigestLove.prototype.processBar = function () {
            var processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 80, "Mission 2 > Digest LOVE");
            this.sprite.addChild(processBar);
        };
        DigestLove.prototype.notice = function () {
            this.noticeBox = new egret.TextField();
            this.noticeBox.text = "Digest your 1 to 1 Feedback. Keep in mind: Feedback is a present from the heart. Direct feedback expresses care for your\nrelationship.";
            this.noticeBox.textColor = 0x000000;
            this.noticeBox.width = this._width;
            this.noticeBox.x = this._x;
            this.noticeBox.y = 60;
            this.noticeBox.background = true;
            this.noticeBox.backgroundColor = 0xffcc33;
            this.sprite.addChild(this.noticeBox);
        };
        DigestLove.prototype.love = function () {
            var love = new egret.TextField();
            love.text = "I LOVE\nyou\nbecause...";
            love.size = 30;
            love.x = this._x;
            love.y = this.noticeBox.height + 80;
            this.sprite.addChild(love);
        };
        DigestLove.prototype.loveFeedback = function () {
            var group = new eui.Group();
            var exml = "\n                        <e:Skin xmlns:e=\"http://ns.egret.com/eui\" states=\"up,down\" height=\"50\">\n                            <e:Label text=\"{data}\" textColor.down=\"0xFFFFFF\" textColor.up=\"0x666666\" horizontalCenter=\"0\" verticalCenter=\"0\"/> \n                        </e:Skin>";
            var list = new eui.List();
            var loveFeedback = this.result[0];
            list.dataProvider = new eui.ArrayCollection(loveFeedback);
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
        DigestLove.prototype.rightIcon = function () {
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
        DigestLove.prototype.nextPage = function () {
            base.API.call('save_players_process', {
                'inviter_name': this.inviter,
                'game_secret': this.game_secret,
                'player': this.player,
                'game_name': this.gameName,
                'process': '6'
            }).then(function (response) {
            });
            this.sprite.visible = false;
            var digestAdd = new game.DigestAdd(this.stageWidth, this.stageHeight, this.result, this.inviter, this.game_secret, this.gameName, this.player);
            // let preview =  new game.Preview2(this.stageWidth, this.stageHeight)
            this.stage.addChild(digestAdd);
        };
        return DigestLove;
    }(egret.DisplayObjectContainer));
    game.DigestLove = DigestLove;
    __reflect(DigestLove.prototype, "game.DigestLove");
})(game || (game = {}));
//# sourceMappingURL=DigestLove.js.map