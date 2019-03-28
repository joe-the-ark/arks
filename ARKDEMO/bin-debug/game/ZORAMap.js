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
    var ZORAMap = (function (_super) {
        __extends(ZORAMap, _super);
        function ZORAMap(characterOne, characterTwo, player_name, player_score, median, stageWidth, stageHeight, ttsm, simulatedData, inviter, game_secret, gameName) {
            var _this = _super.call(this) || this;
            _this.playerList = [];
            _this.game_secret = '';
            _this.player = '';
            _this.gameName = '';
            _this.inviter = '';
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            _this.characterTwo = 'Fully';
            _this.characterOne = 'Insufficiently';
            _this._touchStatus = false;
            _this._distance = new egret.Point();
            _this.playerScore = '';
            _this.tensionMedian = '';
            _this.player_name = '';
            _this.median = 0;
            _this.characterList = [];
            _this.map = {};
            _this.ttsm = 0;
            _this.selfPerciption = 1;
            _this.individualTensionScaleMedian = 60;
            // public deviationBetweenITSM_SP = this.selfPerciption - this.individualTensionScaleMedian
            _this.absoluteValueOfDeviation = 0;
            _this.teamTensionScaleMedian = 30;
            _this.ZORAMin = 0;
            _this.ZORAMax = 0;
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.ttsm = Number(ttsm);
            console.log(stageWidth);
            _this.inviter = inviter;
            _this.player = player_name;
            _this.game_secret = game_secret;
            _this.gameName = gameName;
            _this.playerScore = player_score;
            _this.tensionMedian = median;
            _this.characterTwo = characterTwo;
            _this.characterOne = characterOne;
            _this.player_name = player_name;
            _this.simulatedData = simulatedData;
            _this.median = Math.abs(Number(player_score) - Number(median));
            _this.absoluteValueOfDeviation = _this.median;
            _this.selfPerciption = Number(_this.playerScore);
            _this.individualTensionScaleMedian = Number(_this.tensionMedian);
            _this.teamTensionScaleMedian = _this.ttsm;
            _this.ZORAMin = _this.teamTensionScaleMedian - 13;
            _this.ZORAMax = _this.teamTensionScaleMedian + 13;
            _this.sprite = new egret.Sprite();
            _this.sprite.width = stageWidth;
            _this.sprite.height = stageHeight;
            _this.sprite.x = 0;
            _this.sprite.y = 0;
            _this.addChild(_this.sprite);
            _this._shape = new egret.Shape();
            _this.sprite.addChild(_this._shape);
            _this.drawVoteArea();
            _this.rightIcon = new egret.Bitmap(RES.getRes('right_png'));
            _this.rightIcon.width = 100;
            _this.rightIcon.height = 100;
            _this.rightIcon.anchorOffsetX = _this.rightIcon.width / 2;
            _this.rightIcon.anchorOffsetY = _this.rightIcon.height / 2;
            _this.rightIcon.x = stageWidth - 50;
            _this.rightIcon.y = stageHeight - 100;
            _this.rightIcon.touchEnabled = true;
            _this.rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.rightNext, _this);
            _this.sprite.addChild(_this.rightIcon);
            return _this;
        }
        ZORAMap.prototype.rightNext = function () {
            var settingSail = new game.SettingSail(this.stageWidth, this.stageHeight, 0, this.simulatedData, this.player_name, this.inviter, this.game_secret, this.gameName);
            this.stage.addChild(settingSail);
            this.sprite.visible = false;
        };
        ZORAMap.prototype.drawVoteArea = function () {
            var character1 = new egret.TextField();
            var character2 = new egret.TextField();
            var line = this._shape;
            var playerName = new egret.TextField();
            var playerScore = new egret.TextField();
            var playerX = Math.ceil((Number(this.playerScore) - this.ttsm) * (200 / 81) + (this.stageWidth / 2));
            var tensionScaleMedian = new egret.TextField();
            var tensionScaleMedianName = new egret.TextField();
            var tensionScaleX = Math.ceil((Number(this.tensionMedian) - this.ttsm) * (200 / 81) + (this.stageWidth / 2));
            character1.text = this.characterOne;
            character1.textAlign = egret.HorizontalAlign.CENTER;
            character1.size = 30;
            character1.border = true;
            character1.width = 60;
            character1.height = 120;
            character1.borderColor = 0x3a5fcd;
            character1.background = true;
            character1.backgroundColor = 0xFBF9F2;
            character1.textColor = 0x000000;
            character1.x = Math.ceil((this.stageWidth / 2) - ((200 / 81) * this.ttsm + 60));
            character1.y = 150;
            character2.text = this.characterTwo;
            character2.textAlign = egret.HorizontalAlign.CENTER;
            character2.size = 30;
            character2.border = true;
            character2.width = 60;
            character2.height = 120;
            character2.borderColor = 0x3a5fcd;
            character2.x = (this.stageWidth / 2) + Math.ceil(((200 / 81) * (81 - this.ttsm) + 60));
            character2.y = 150;
            character2.background = true;
            character2.backgroundColor = 0xFBF9F2;
            character2.textColor = 0x000000;
            line.graphics.lineStyle(2, 0xdd2222);
            line.graphics.moveTo(character1.x + 60, 210);
            line.graphics.lineTo(character2.x, 210);
            playerName.text = this.player_name;
            playerName.textAlign = egret.HorizontalAlign.CENTER;
            playerName.size = 20;
            playerName.border = true;
            playerName.width = 50;
            playerName.height = 20;
            playerName.anchorOffsetX = playerName.width / 2;
            playerName.anchorOffsetY = playerName.height / 2;
            playerName.borderColor = 0x000000;
            playerName.x = playerX;
            playerName.y = 260;
            playerName.rotation = 270;
            playerName.textColor = 0x000000;
            playerScore.text = this.playerScore;
            playerScore.textAlign = egret.HorizontalAlign.CENTER;
            playerScore.size = 20;
            playerScore.border = true;
            playerScore.width = 50;
            playerScore.height = 20;
            playerScore.borderColor = 0x000000;
            playerScore.x = playerX;
            playerScore.y = 210;
            playerScore.rotation = 270;
            playerScore.textColor = 0x000000;
            playerScore.anchorOffsetX = playerScore.width / 2;
            playerScore.anchorOffsetY = playerScore.height / 2;
            tensionScaleMedian.text = this.tensionMedian + '/' + this.median;
            tensionScaleMedian.textAlign = egret.HorizontalAlign.CENTER;
            tensionScaleMedian.size = 20;
            tensionScaleMedian.border = true;
            tensionScaleMedian.width = 60;
            tensionScaleMedian.height = 20;
            tensionScaleMedian.borderColor = 0x000000;
            tensionScaleMedian.x = tensionScaleX;
            tensionScaleMedian.y = 210;
            tensionScaleMedian.rotation = 270;
            tensionScaleMedian.textColor = 0x000000;
            tensionScaleMedian.anchorOffsetX = tensionScaleMedian.width / 2;
            tensionScaleMedian.anchorOffsetY = tensionScaleMedian.height / 2;
            tensionScaleMedianName.text = this.player_name;
            tensionScaleMedianName.textAlign = egret.HorizontalAlign.CENTER;
            tensionScaleMedianName.size = 20;
            tensionScaleMedianName.border = true;
            tensionScaleMedianName.width = 60;
            tensionScaleMedianName.height = 20;
            tensionScaleMedianName.borderColor = 0x000000;
            tensionScaleMedianName.x = tensionScaleX;
            tensionScaleMedianName.y = 270;
            tensionScaleMedianName.rotation = 270;
            tensionScaleMedianName.textColor = 0x000000;
            tensionScaleMedianName.anchorOffsetX = tensionScaleMedianName.width / 2;
            tensionScaleMedianName.anchorOffsetY = tensionScaleMedianName.height / 2;
            if (this.ZORAMin > this.selfPerciption || this.selfPerciption > this.ZORAMax) {
                playerScore.background = true;
                playerScore.backgroundColor = 0xC14343;
                if (this.ZORAMin > this.individualTensionScaleMedian || this.individualTensionScaleMedian > this.ZORAMax) {
                    tensionScaleMedian.background = true;
                    tensionScaleMedian.backgroundColor = 0xC9CA68;
                }
                else {
                    tensionScaleMedian.background = true;
                    tensionScaleMedian.backgroundColor = 0xFBF9F2;
                }
                character1.backgroundColor = 0x5E5E5E;
                character2.backgroundColor = 0x5E5E5E;
            }
            else if (this.ZORAMin <= this.selfPerciption && this.selfPerciption <= this.ZORAMax) {
                playerScore.background = true;
                playerScore.backgroundColor = 0xFBF9F2;
                if (this.ZORAMin <= this.individualTensionScaleMedian && this.individualTensionScaleMedian <= this.ZORAMax) {
                    playerScore.background = true;
                    playerScore.backgroundColor = 0xFBF9F2;
                    tensionScaleMedian.background = true;
                    tensionScaleMedian.backgroundColor = 0xFBF9F2;
                }
                else if (this.ZORAMin > this.individualTensionScaleMedian || this.individualTensionScaleMedian > this.ZORAMax) {
                    tensionScaleMedian.background = true;
                    tensionScaleMedian.backgroundColor = 0xC9CA68;
                    character1.backgroundColor = 0x5E5E5E;
                    character2.backgroundColor = 0x5E5E5E;
                }
            }
            this.sprite.addChild(character1);
            this.sprite.addChild(character2);
            this.sprite.addChild(line);
            this.sprite.addChild(playerName);
            this.sprite.addChild(playerScore);
            this.sprite.addChild(tensionScaleMedian);
            this.sprite.addChild(tensionScaleMedianName);
        };
        return ZORAMap;
    }(egret.DisplayObjectContainer));
    game.ZORAMap = ZORAMap;
    __reflect(ZORAMap.prototype, "game.ZORAMap");
})(game || (game = {}));
//# sourceMappingURL=ZORAMap.js.map