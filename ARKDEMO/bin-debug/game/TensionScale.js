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
    var TensionScale = (function (_super) {
        __extends(TensionScale, _super);
        function TensionScale(stageWidth, stageHeight, select_list, score) {
            var _this = _super.call(this) || this;
            _this.unselectedCharacterList = [];
            _this.selectedChaeacterList = [];
            _this.game_secret = '';
            _this.gameName = '';
            _this.inviter = '';
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            _this._touchStatus = false;
            _this.select_list = [];
            _this.score = '';
            _this.select_list = select_list;
            _this.score = score;
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            _this.addChild(_this.sprite);
            _this.sprite.touchEnabled = true;
            _this.drawCharacter();
            _this.drawScore();
            return _this;
        }
        // private startGame(game_secret: string, gameName: string, inviter: string) {
        //     if (this.stage) {
        //         let enterGame = new game.EnterGame(game_secret, gameName, inviter, this.stage.stageWidth, this.stage.stageHeight);
        //         this.stage.addChild(enterGame)
        //         this.sprite.visible = false
        //         this.label.visible = false
        //     }
        // }
        TensionScale.prototype.drawCharacter = function () {
            var randomColor = 0x0000ff + Math.floor(Math.random() * 100) * (0xffffff / 100);
            var topCharacterBg = new egret.Shape();
            var bottomCharacterBg = new egret.Shape();
            topCharacterBg.graphics.beginFill(0x7171C6);
            topCharacterBg.graphics.drawRect(0, 0, 180, 60);
            topCharacterBg.graphics.endFill();
            var toptext = new egret.TextField();
            toptext.x = topCharacterBg.x;
            console.log(topCharacterBg.y);
            console.log(topCharacterBg.x);
            toptext.y = 10;
            toptext.text = this.select_list[0];
            bottomCharacterBg.graphics.beginFill(0x7171C6);
            bottomCharacterBg.graphics.drawRect(0, 80, 180, 60);
            bottomCharacterBg.graphics.endFill();
            var buttomtext = new egret.TextField();
            buttomtext.x = bottomCharacterBg.x;
            buttomtext.y = 90;
            buttomtext.text = this.select_list[1];
            console.log(bottomCharacterBg.y);
            console.log(bottomCharacterBg.x);
            this.sprite.addChild(topCharacterBg);
            this.sprite.addChild(bottomCharacterBg);
            this.sprite.addChild(toptext);
            this.sprite.addChild(buttomtext);
        };
        TensionScale.prototype.drawScore = function () {
            var score_bg = new egret.Shape();
            var score = new egret.TextField();
            var randomColor = 0x0000ff + Math.floor(Math.random() * 100) * (0xffffff / 100);
            // let randomColor = 0x0000ff 
            var randomLineColor = 0x0000ff + Math.floor(Math.random() * 100) * (0xffffff / 100);
            var randomScore = this.score;
            score_bg.graphics.beginFill(0x7FFFD4, 0.7);
            score_bg.graphics.lineStyle(2, 0x7D9EC0);
            score_bg.graphics.drawCircle(90, 70, 20);
            score_bg.graphics.endFill();
            this.sprite.addChild(score_bg);
            score.text = randomScore;
            score.size = 20;
            score.textColor = 0xffffff;
            score.x = 80;
            score.y = 60;
            this.sprite.addChild(score);
        };
        TensionScale.prototype.onTouchBegin = function () {
            if (this.stage) {
                var inviteScene = new game.CreateGame(this.stage.stageWidth, this.stage.stageHeight);
                this.stage.addChild(inviteScene);
                this.sprite.visible = false;
                this.label.visible = false;
            }
        };
        TensionScale.prototype.getRandomScore = function (Min, Max) {
            var Range = Max - Min;
            var Rand = Math.random();
            return (Min + Math.round(Rand * Range));
        };
        TensionScale.prototype.onTouchEnd = function () {
            egret.log("onTouchEnd");
        };
        TensionScale.prototype.onTouchMove = function () {
            egret.log("onTouchMove");
        };
        TensionScale.prototype.onTouchTap = function () {
            egret.log("onTouchTap");
        };
        return TensionScale;
    }(egret.DisplayObjectContainer));
    game.TensionScale = TensionScale;
    __reflect(TensionScale.prototype, "game.TensionScale");
})(game || (game = {}));
//# sourceMappingURL=TensionScale.js.map