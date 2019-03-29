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
    var Cliffhanger = (function (_super) {
        __extends(Cliffhanger, _super);
        function Cliffhanger(stageWidth, stageHeight, inviter, game_secret, gameName, player) {
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
            _this.inviter = inviter;
            _this.player = player;
            _this.game_secret = game_secret;
            _this.gameName = gameName;
            _this.addChild(_this.sprite);
            _this.processBar();
            _this.intro();
            _this.rightIcon();
            return _this;
        }
        Cliffhanger.prototype.processBar = function () {
            var processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 95, "Cliffhanger > Mission 3");
            this.sprite.addChild(processBar);
        };
        Cliffhanger.prototype.intro = function () {
            var intro = new egret.TextField();
            intro.text = "Before you may download the PDF with souvenirs from your journey, please ano- nymously vote one last scale.";
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
            tip.text = "We call it the relationship scale. The results will be displays to nobody, yet will help us developing the next level on your journey with The ARK: Missi- on 3 > Empathy Walk";
            tip.width = this._width;
            tip.x = this._x;
            tip.y = img.y + img.height + this._margin;
            this.sprite.addChild(tip);
        };
        Cliffhanger.prototype.rightIcon = function () {
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
        Cliffhanger.prototype.nextPage = function () {
            var self = this;
            base.API.Init("http://work.metatype.cn:8105/api/");
            base.API.call('get_players', {
                'inviter': self.inviter,
                'game_secret': self.game_secret,
                'gameName': self.gameName,
                'player': self.player
            }).then(function (response) {
                var result = response['result'];
                var player_list = result;
                console.log(11111);
                console.log(player_list);
                console.log(11111);
                var cliffhanger = new game.AffinityMapping(self.stageWidth, self.stageHeight, player_list);
                self.stage.addChild(cliffhanger);
                self.sprite.visible = false;
            });
        };
        return Cliffhanger;
    }(egret.DisplayObjectContainer));
    game.Cliffhanger = Cliffhanger;
    __reflect(Cliffhanger.prototype, "game.Cliffhanger");
})(game || (game = {}));
//# sourceMappingURL=Cliffhanger.js.map