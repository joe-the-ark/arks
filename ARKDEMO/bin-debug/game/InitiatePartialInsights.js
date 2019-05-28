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
    var InitiatePartialInsights = (function (_super) {
        __extends(InitiatePartialInsights, _super);
        function InitiatePartialInsights(game_secret, inviter, player, gameName, stageWidth, stageHeight, playerCount, playerSCore) {
            var _this = _super.call(this) || this;
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            /***     初始赋值代码结束    ***/
            _this._width = 600;
            _this._x = 20;
            _this.character1 = "Insufficiently";
            _this.character2 = "Fully";
            _this.playerName = "Joe";
            _this.selfPerception = 20;
            _this.playerCount = 0;
            _this.othersSelfPerception = [27, 31, 40, 47, 63];
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            _this.game_secret = game_secret;
            _this.inviter = inviter;
            _this.player = player;
            _this.gameName = gameName;
            _this.playerCount = playerCount;
            _this.selfPerception = playerSCore;
            _this.playerName = player;
            _this.addChild(_this.sprite);
            _this.processBar();
            _this.tip();
            _this.rightIcon = new egret.Bitmap(RES.getRes("right_png"));
            _this.rightIcon.width = 100;
            _this.rightIcon.height = 100;
            _this.rightIcon.anchorOffsetX = _this.rightIcon.width / 2;
            _this.rightIcon.anchorOffsetY = _this.rightIcon.height / 2;
            _this.rightIcon.x = _this.stageWidth - 50;
            _this.rightIcon.y = _this.stageHeight - 50;
            _this.rightIcon.touchEnabled = true;
            _this.rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.nextTouch, _this);
            _this.sprite.addChild(_this.rightIcon);
            _this.drawPotentialScale();
            return _this;
        }
        InitiatePartialInsights.prototype.processBar = function () {
            var processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 12, "Initaite > Partial Insights");
            this.sprite.addChild(processBar);
        };
        InitiatePartialInsights.prototype.tip = function () {
            var intro = new egret.TextField();
            intro.text = "Our Basic Hypothesis is simple: a\ncontainment of tensions within the team\nresults in less conflict & a better deployment of \n the team‘s potentialities.\n\n\n\n\n\n";
            intro.width = this._width;
            intro.x = this._x;
            intro.y = this.stageHeight - 180;
            intro.background = true;
            intro.backgroundColor = 0x359f93;
            this.sprite.addChild(intro);
        };
        InitiatePartialInsights.prototype.drawPotentialScale = function () {
            var potentialScale = new game.PotentialScale(this.stageWidth, this.stageHeight, this.character1, this.character2, this.playerName, this.selfPerception, this.game_secret, this.inviter, this.player, this.gameName, this.playerCount);
            potentialScale.x = this._x + 350;
            potentialScale.y = 80;
            this.sprite.addChild(potentialScale);
        };
        InitiatePartialInsights.prototype.nextTouch = function () {
            this.rightIcon.touchEnabled = false;
            // var renderTexture:egret.RenderTexture = new egret.RenderTexture();
            // renderTexture.drawToTexture(this.sprite);
            // let base64Str = renderTexture.toDataURL("image/png");
            // console.log(base64Str)
            // base.API.call('save_result',{
            //     'base64Str':base64Str,
            //     'name':'InitiatePartialInsights',
            //     'game_secret':this.game_secret,
            //     'inviter':this.inviter
            // })
            var self = this;
            base.API.Init("http://work.metatype.cn:8105/api/");
            base.API.call('save_players_process', {
                'inviter_name': self.inviter,
                'game_secret': self.game_secret,
                'player': self.player,
                'game_name': self.gameName,
                'process': '0.2'
            }).then(function (response) {
                var game_secret = self.game_secret;
                var inviter = self.inviter;
                var player = self.player;
                var gameName = self.gameName;
                var stageWidth = self.stageWidth;
                var stageHeight = self.stageHeight;
                var playerSCore = self.selfPerception;
                var playerCount = self.playerCount;
                self.sprite.visible = false;
                self.removeChild(self.sprite);
                var characterChoosePage = new game.CharacterChoosePage(game_secret, inviter, player, gameName, stageWidth, stageHeight, playerCount);
                self.stage.addChild(characterChoosePage);
            });
        };
        return InitiatePartialInsights;
    }(egret.DisplayObjectContainer));
    game.InitiatePartialInsights = InitiatePartialInsights;
    __reflect(InitiatePartialInsights.prototype, "game.InitiatePartialInsights");
})(game || (game = {}));
//# sourceMappingURL=InitiatePartialInsights.js.map