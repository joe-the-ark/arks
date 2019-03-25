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
    var MissionPartialInsights = (function (_super) {
        __extends(MissionPartialInsights, _super);
        function MissionPartialInsights(stageWidth, stageHeight, character1, character2, player, selfPerception, inviter, game_secret, gameName, scorecount, chooser) {
            var _this = _super.call(this) || this;
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            /***     初始赋值代码结束    ***/
            _this._width = 600;
            _this._x = 20;
            _this.character1 = "Carefulness";
            _this.character2 = "Power";
            _this.playerName = "Joe";
            _this.selfPerception = 6;
            _this.game_secret = '';
            _this.gameName = '';
            _this.inviter = '';
            _this.chooser = '';
            _this.scorecount = 0;
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            _this.addChild(_this.sprite);
            _this.game_secret = game_secret;
            _this.playerName = player;
            _this.gameName = gameName;
            _this.inviter = inviter;
            _this.character1 = character1;
            _this.character2 = character2;
            _this.chooser = chooser;
            _this.selfPerception = selfPerception;
            _this.scorecount = scorecount;
            _this.processBar();
            _this.drawPotentialScale();
            return _this;
            // this.tip()
            // this.notice()
            // this.timer = new egret.Timer(1000, 0);
            // this.timer.addEventListener(egret.TimerEvent.TIMER, this.getttsm, this);
            // this.timer.start()
        }
        // private getttsm(){
        //     var self = this
        //     base.API.Init("http://127.0.0.1:8000/api/");
        //     base.API.call('getttsmindividual', {
        //         'inviter_name': self.inviter,
        //         'game_secret': self.game_secret,
        //         'player': self.playerName,
        //         'gameName': self.gameName,
        //         'c1':self.character1,
        //         'c2':self.character2,
        //         'chooser':self.chooser
        //     }).then(function (response) {
        //         console.log('ttsm')
        //         console.log(response)
        //         self.teamTensionScaleMedian = response['ttsm']
        //         self.individualTensionScale = response['individualTensionScale']
        //     })
        // }
        MissionPartialInsights.prototype.processBar = function () {
            var processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 50, "Mission 1 > Partial Insights");
            this.sprite.addChild(processBar);
        };
        // private notice(): void {
        //     let notice: egret.TextField = new egret.TextField()
        //     notice.text = "54% of your Teammates (7 out of 13) have so far voted the Carefulness & Power Tension Scale. Here are Early Insights:"
        //     notice.width = this._width
        //     notice.x = this._x 
        //     notice.y = 60
        //     notice.background = true
        //     notice.backgroundColor = 0x359f93
        //     this.sprite.addChild(notice)
        // }
        // private tip(): void {
        //     let tip: egret.TextField = new egret.TextField()
        //     tip.text = "• Your Self-Perception at 6 points is inside the preliminary Zone of Responsible Action.\n\n• Your teammates rank you at 46 a total of 40 points higher than your self-perception at 6 points.\n\n• While 21 points is the lowest and 70 points the highest value that others attributed to you.\n\n• Thus 71% of your relationships on this scale are tense."
        //     tip.width = 350
        //     tip.x = this._x
        //     tip.y = 180
        //     tip.background = true
        //     tip.backgroundColor = 0x359f93
        //     this.sprite.addChild(tip)
        // }
        // private rightIcon(): void {
        //     let rightIcon = new egret.Bitmap(RES.getRes("right_png") as egret.Texture)
        //     rightIcon.width = 100
        //     rightIcon.height = 100
        //     rightIcon.anchorOffsetX = rightIcon.width / 2
        //     rightIcon.anchorOffsetY = rightIcon.height / 2
        //     rightIcon.x = this.stageWidth - 50
        //     rightIcon.y = this.stageHeight - 50
        //     rightIcon.touchEnabled = true
        //     rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rightIcon, this)
        //     this.sprite.addChild(rightIcon)
        // }
        MissionPartialInsights.prototype.drawPotentialScale = function () {
            var expandedTensionScale = new game.ExpandedTensionScale(this.stageWidth, this.stageHeight, this.character1, this.character2, this.playerName, this.selfPerception, this.game_secret, this.inviter, this.gameName, this.chooser, this.scorecount);
            expandedTensionScale.x = this._x + 350;
            expandedTensionScale.y = 180;
            this.sprite.addChild(expandedTensionScale);
        };
        return MissionPartialInsights;
    }(egret.DisplayObjectContainer));
    game.MissionPartialInsights = MissionPartialInsights;
    __reflect(MissionPartialInsights.prototype, "game.MissionPartialInsights");
})(game || (game = {}));
//# sourceMappingURL=MissionPartialInsights.js.map