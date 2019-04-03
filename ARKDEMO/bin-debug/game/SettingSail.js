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
    var SettingSail = (function (_super) {
        __extends(SettingSail, _super);
        function SettingSail(stageWidth, stageHeight, process, simulatedData, player_name, inviter, game_secret, gameName) {
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
            _this.addChild(_this.sprite);
            _this.simulatedData = simulatedData;
            _this.player = player_name;
            _this.inviter = inviter;
            _this.game_secret = game_secret;
            _this.gameName = gameName;
            _this.processBar();
            _this.intro();
            _this.rightIcon();
            return _this;
        }
        SettingSail.prototype.processBar = function () {
            var processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 5, "Mission 2 > Setting Sail");
            this.sprite.addChild(processBar);
        };
        SettingSail.prototype.intro = function () {
            var intro = new egret.TextField();
            intro.text = "To progress in containing your team‘s tensions set sail to:\n\n• Learn about your teams major tensions\n• Give 1 on 1 Feedback to help safeguarding your Zone of Responsible Action (ZORA)\nLearn what others LOVE about you, what they think you should ADD & what they always wanted to ASK you.";
            intro.width = this._width;
            intro.x = this._x;
            intro.y = 100;
            this.sprite.addChild(intro);
            var img = new egret.Bitmap(RES.getRes("bg_jpg"));
            img.width = this._width;
            img.height = 550;
            img.x = this._x;
            img.y = intro.y + intro.height + this._margin;
            this.sprite.addChild(img);
            var tip = new egret.TextField();
            tip.text = "The treasure at the end of Mission TWO? Embrace your teammates anonymous Feedback for a better deployment of the team‘s potentialities.";
            tip.width = this._width;
            tip.x = this._x;
            tip.y = img.y + img.height + this._margin;
            this.sprite.addChild(tip);
        };
        SettingSail.prototype.rightIcon = function () {
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
        SettingSail.prototype.nextPage = function () {
            base.API.call('save_players_process', {
                'inviter_name': this.inviter,
                'game_secret': this.game_secret,
                'player': this.player,
                'game_name': this.gameName,
                'process': '4.0.0'
            }).then(function (response) {
            });
            console.log('SettingSail');
            console.log('this.simulateDate');
            var count = 0;
            var loveAddAsk = new game.LoveAddAsk(this.stageWidth, this.stageHeight, count, this.simulatedData, this.player, this.inviter, this.game_secret, this.gameName);
            this.stage.addChild(loveAddAsk);
            this.sprite.visible = false;
        };
        return SettingSail;
    }(egret.DisplayObjectContainer));
    game.SettingSail = SettingSail;
    __reflect(SettingSail.prototype, "game.SettingSail");
})(game || (game = {}));
//# sourceMappingURL=SettingSail.js.map