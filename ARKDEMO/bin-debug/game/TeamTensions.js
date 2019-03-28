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
    var TeamTensions = (function (_super) {
        __extends(TeamTensions, _super);
        function TeamTensions(stageWidth, stageHeight, process, missionName) {
            var _this = _super.call(this) || this;
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            /***     初始赋值代码结束    ***/
            _this.game_secret = '';
            _this.gameName = '';
            _this.inviter = '';
            _this.player = '';
            _this._width = 600;
            _this.noticeHeight = 80;
            _this._x = 20;
            _this._margin = 20;
            _this.simulatedData = [
                ["Family", "Narcissism", 20, 40, [14, 7, 20, 15, 11, 25, 7, 12, 31, 16, 14, 20, 14]],
                ["Sensuality", "Fighting", 10, 24, [4, 7, 2, 5, 6, 5, 7, 4, 31, 16, 14, 20, 14]],
                ["Loyality", "Joy", 30, 19, [14, 7, 2, 5, 11, 5, 7, 12, 22, 16, 4, 2, 14]],
                ["Harmony", "Disruption", 4, 15, [14, 7, 2, 5, 11, 5, 7, 5, 1, 6, 14, 20, 14]],
                ["Carefulness", "Power", 12, 11, [14, 7, 2, 5, 1, 5, 7, 2, 1, 6, 4, 20, 14]],
            ];
            _this.absoluteValueOfDeviationList = [14, 7, 2, 5, 11, 5, 7, 12, 31, 16, 14, 20, 14];
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            _this.addChild(_this.sprite);
            _this.processBar();
            _this.notice();
            _this.background();
            // this.tensionScale()
            // this.drawPotentialScale()
            _this.rightIcon();
            return _this;
        }
        TeamTensions.prototype.processBar = function () {
            var processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 60, "Mission 2 > Team Tensions");
            this.sprite.addChild(processBar);
        };
        TeamTensions.prototype.notice = function () {
            this.noticeBox = new egret.TextField();
            this.noticeBox.text = "Identify the major integrative values and sources of tension within your team.";
            this.noticeBox.textColor = 0x000000;
            this.noticeBox.width = this._width;
            this.noticeBox.height = this.noticeHeight;
            this.noticeBox.x = this._x;
            this.noticeBox.y = 60;
            this.noticeBox.background = true;
            this.noticeBox.backgroundColor = 0xffcc33;
            this.sprite.addChild(this.noticeBox);
        };
        TeamTensions.prototype.background = function () {
            var grey = new egret.Shape();
            grey.x = this._x / 2; // 20会多
            grey.y = this.noticeBox.height;
            grey.graphics.beginFill(0xcccccc, 1);
            grey.graphics.drawRect(grey.x, grey.y, 200, this.stageHeight);
            grey.graphics.endFill();
            this.sprite.addChild(grey);
        };
        // private tensionScale(): void {
        //     this.simulatedData.forEach((val, index, array) => {
        //         let character1 = val[0]
        //         let character2 = val[1]
        //         let middle_score = Number(val[2].toString())
        //         let player_score = Number(val[3].toString())
        //         let absoluteValueOfDeviation = Math.abs(player_score - middle_score)
        //         let individualTensionScaleMedian = middle_score
        //         let teamTensionScaleMedian = 0
        //         let tensionScale = new game.TensionScale(100, 60, [character1, character2], "Joe", absoluteValueOfDeviation, teamTensionScaleMedian, individualTensionScaleMedian, val[4])
        //         tensionScale.x = this._x + 10
        //         tensionScale.y = this.noticeBox.height + 100 + index * 150
        //         this.sprite.addChild(tensionScale)
        //     });
        // }
        // private drawPotentialScale(): void {
        //     let expandedTensionScale = new game.ExpandedTensionScale(this.stageWidth, this.stageHeight, this.simulatedData[0][0], this.simulatedData[0][1], "Babette", 20, [], 0, this.absoluteValueOfDeviationList)
        //     expandedTensionScale.x = this._x + 350
        //     expandedTensionScale.y = 180
        //     this.sprite.addChild(expandedTensionScale)
        // }
        TeamTensions.prototype.rightIcon = function () {
            var rightIcon = new egret.Bitmap(RES.getRes("right_png"));
            rightIcon.width = 100;
            rightIcon.height = 100;
            rightIcon.anchorOffsetX = rightIcon.width / 2;
            rightIcon.anchorOffsetY = rightIcon.height / 2;
            rightIcon.x = this.stageWidth - 50;
            rightIcon.y = this.stageHeight / 2;
            rightIcon.touchEnabled = true;
            // rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rightIcon, this)
            this.sprite.addChild(rightIcon);
        };
        return TeamTensions;
    }(egret.DisplayObjectContainer));
    game.TeamTensions = TeamTensions;
    __reflect(TeamTensions.prototype, "game.TeamTensions");
})(game || (game = {}));
//# sourceMappingURL=TeamTensions.js.map