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
        function TensionScale(stageWidth, stageHeight, select_list, absoluteValueOfDeviation, selfPerciption, teamTensionScaleMedian) {
            var _this = _super.call(this) || this;
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            /***     初始赋值代码结束    ***/
            _this.select_list = [];
            // public absoluteValueOfDeviation
            _this.selfPerciption = 1;
            _this.individualTensionScaleMedian = 60;
            _this.deviationBetweenITSM_SP = _this.selfPerciption - _this.individualTensionScaleMedian;
            _this.absoluteValueOfDeviation = Math.abs(_this.deviationBetweenITSM_SP);
            _this.teamTensionScaleMedian = 30;
            _this.ZORAMin = _this.teamTensionScaleMedian - 13;
            _this.ZORAMax = _this.teamTensionScaleMedian + 13;
            _this.select_list = select_list;
            _this.selfPerciption = selfPerciption;
            _this.teamTensionScaleMedian = teamTensionScaleMedian;
            _this.absoluteValueOfDeviation = absoluteValueOfDeviation;
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            _this.addChild(_this.sprite);
            _this.sprite.touchEnabled = true;
            _this.drawCharacter();
            _this.drawScore();
            return _this;
        }
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
            if (this.ZORAMin > this.selfPerciption || this.selfPerciption > this.ZORAMax) {
                this.sprite.addChild(scoreRedBg);
                if (this.ZORAMin > this.individualTensionScaleMedian || this.individualTensionScaleMedian > this.ZORAMax) {
                    scoreYellowBg.graphics.beginFill(0xC14343);
                    scoreYellowBg.graphics.lineStyle(0, 0xffffff);
                    scoreYellowBg.graphics.drawCircle(90, 70, 20);
                    scoreYellowBg.graphics.endFill();
                    this.sprite.addChild(scoreYellowBg);
                }
            }
            else if (this.ZORAMin <= this.selfPerciption && this.selfPerciption <= this.ZORAMax) {
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
        };
        return TensionScale;
    }(egret.DisplayObjectContainer));
    game.TensionScale = TensionScale;
    __reflect(TensionScale.prototype, "game.TensionScale");
})(game || (game = {}));
//# sourceMappingURL=TensionScale.js.map