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
    var TeamTensionScale = (function (_super) {
        __extends(TeamTensionScale, _super);
        function TeamTensionScale(stageWidth, stageHeight, select_list, absoluteValueOfDeviation, selfPerception, teamTensionScaleMedian, individualTensionScaleMedian) {
            var _this = _super.call(this) || this;
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            /***     初始赋值代码结束    ***/
            _this.select_list = [];
            // public absoluteValueOfDeviation
            _this.selfPerception = 1;
            _this.individualTensionScaleMedian = 60;
            // public deviationBetweenITSM_SP = this.selfPerception - this.individualTensionScaleMedian
            _this.absoluteValueOfDeviation = 0;
            _this.teamTensionScaleMedian = 30;
            _this.ZORAMin = 0;
            _this.ZORAMax = 0;
            _this.select_list = select_list;
            _this.selfPerception = selfPerception;
            _this.teamTensionScaleMedian = teamTensionScaleMedian;
            _this.absoluteValueOfDeviation = absoluteValueOfDeviation;
            _this.ZORAMin = _this.teamTensionScaleMedian - 13;
            _this.ZORAMax = _this.teamTensionScaleMedian + 13;
            _this.individualTensionScaleMedian = individualTensionScaleMedian;
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            _this.addChild(_this.sprite);
            _this.sprite.touchEnabled = true;
            _this.drawCharacter();
            _this.drawScore();
            return _this;
        }
        TeamTensionScale.prototype.drawCharacter = function () {
            var randomColor = 0x0000ff + Math.floor(Math.random() * 100) * (0xffffff / 100);
            var topCharacterBg = new egret.Shape();
            topCharacterBg.graphics.beginFill(0x7171C6);
            topCharacterBg.graphics.drawRect(0, 0, 180, 60);
            topCharacterBg.graphics.endFill();
            this.sprite.addChild(topCharacterBg);
            var bottomCharacterBg = new egret.Shape();
            bottomCharacterBg.graphics.beginFill(0x7171C6);
            bottomCharacterBg.graphics.drawRect(0, 80, 180, 60);
            bottomCharacterBg.graphics.endFill();
            this.sprite.addChild(bottomCharacterBg);
            var toptext = new egret.TextField();
            toptext.textAlign = egret.HorizontalAlign.CENTER;
            toptext.x = topCharacterBg.x;
            toptext.y = 10;
            toptext.text = this.select_list[0];
            this.sprite.addChild(toptext);
            var bottomtext = new egret.TextField();
            bottomtext.textAlign = egret.HorizontalAlign.CENTER;
            bottomtext.x = bottomCharacterBg.x;
            bottomtext.y = 90;
            bottomtext.text = this.select_list[1];
            this.sprite.addChild(bottomtext);
        };
        TeamTensionScale.prototype.drawScore = function () {
            var scoreRedBg = new egret.Shape();
            var scoreYellowBg = new egret.Shape();
            var scoreWhiteBg = new egret.Shape();
            var absoluteValueOfDeviation = new egret.TextField();
            scoreRedBg.graphics.beginFill(0xC14343);
            scoreRedBg.graphics.lineStyle(2, 0xffffff);
            scoreRedBg.graphics.drawCircle(90, 70, 30);
            scoreRedBg.graphics.endFill();
            scoreYellowBg.graphics.beginFill(0xC9CA68);
            scoreYellowBg.graphics.lineStyle(2, 0xffffff);
            scoreYellowBg.graphics.drawCircle(90, 70, 30);
            scoreYellowBg.graphics.endFill();
            scoreWhiteBg.graphics.beginFill(0xFBF9F2);
            scoreWhiteBg.graphics.lineStyle(2, 0xffffff);
            scoreWhiteBg.graphics.drawCircle(90, 70, 30);
            scoreWhiteBg.graphics.endFill();
            if (this.ZORAMin > this.selfPerception || this.selfPerception > this.ZORAMax) {
                this.sprite.addChild(scoreRedBg);
                if (this.ZORAMin > this.individualTensionScaleMedian || this.individualTensionScaleMedian > this.ZORAMax) {
                    scoreYellowBg.graphics.beginFill(0xC14343);
                    scoreYellowBg.graphics.lineStyle(0, 0xffffff);
                    scoreYellowBg.graphics.drawCircle(90, 70, 20);
                    scoreYellowBg.graphics.endFill();
                    this.sprite.addChild(scoreYellowBg);
                }
            }
            else if (this.ZORAMin <= this.selfPerception && this.selfPerception <= this.ZORAMax) {
                if (this.ZORAMin <= this.individualTensionScaleMedian && this.individualTensionScaleMedian <= this.ZORAMax) {
                    this.sprite.addChild(scoreWhiteBg);
                }
                else if (this.ZORAMin > this.individualTensionScaleMedian || this.individualTensionScaleMedian > this.ZORAMax) {
                    this.sprite.addChild(scoreYellowBg);
                }
            }
            absoluteValueOfDeviation.text = this.absoluteValueOfDeviation.toString();
            absoluteValueOfDeviation.size = 20;
            absoluteValueOfDeviation.textColor = 0x000000;
            absoluteValueOfDeviation.x = 80;
            absoluteValueOfDeviation.y = 60;
            this.sprite.addChild(absoluteValueOfDeviation);
            if (this.individualTensionScaleMedian == 0) {
                this.sprite.removeChild(absoluteValueOfDeviation);
            }
        };
        return TeamTensionScale;
    }(egret.DisplayObjectContainer));
    game.TeamTensionScale = TeamTensionScale;
    __reflect(TeamTensionScale.prototype, "game.TeamTensionScale");
})(game || (game = {}));
//# sourceMappingURL=TeamTensionScale.js.map