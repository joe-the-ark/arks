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
    var TensionScaleResult = (function (_super) {
        __extends(TensionScaleResult, _super);
        function TensionScaleResult(stageWidth, stageHeight, inviter, game_secret, player, gameName, characterListParams, playerCount) {
            var _this = _super.call(this) || this;
            _this.unselectedCharacterList = [];
            _this.selectedChaeacterList = [];
            _this.game_secret = '';
            _this.player = '';
            _this.gameName = '';
            _this.inviter = '';
            _this.characterListParams = [];
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            _this.playerCount = 0;
            _this.simulatedData = [];
            _this._touchStatus = false;
            _this.game_secret = game_secret;
            _this.player = player;
            _this.gameName = gameName;
            _this.inviter = inviter;
            _this.characterListParams = characterListParams;
            _this.playerCount = playerCount;
            console.log(characterListParams);
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            _this.addChild(_this.sprite);
            _this.sprite.touchEnabled = true;
            _this.drawTensionScale();
            _this.drawTitle();
            _this.timer = new egret.Timer(1000, 0);
            _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.getGameResult, _this);
            _this.timer.start();
            _this.rightIcon = new egret.Bitmap(RES.getRes('right_png'));
            _this.rightIcon.width = 100;
            _this.rightIcon.height = 100;
            _this.rightIcon.anchorOffsetX = _this.rightIcon.width / 2;
            _this.rightIcon.anchorOffsetY = _this.rightIcon.height / 2;
            _this.rightIcon.x = stageWidth - 50;
            _this.rightIcon.y = stageHeight - 100;
            _this.rightIcon.touchEnabled = true;
            _this.rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.rightNext, _this);
            return _this;
        }
        TensionScaleResult.prototype.getGameResult = function () {
            var self = this;
            base.API.Init("http://127.0.0.1:8000/api/");
            base.API.call('get_game_score', {
                'characterListParams': self.characterListParams,
                'inviter': self.inviter,
                'gameSecret': self.game_secret,
                'player': self.player,
                'gameName': self.gameName,
            }).then(function (response) {
                var result = response['result'];
                self.simulatedData = result;
                self.drawTensionScale();
            });
        };
        TensionScaleResult.prototype.drawTitle = function () {
            var shape = new egret.Shape();
            shape.graphics.beginFill(0x00ff00, 0.5);
            shape.graphics.drawRect(0, 0, this.stageWidth, 130);
            shape.graphics.endFill();
            this.sprite.addChild(shape);
            var title = new egret.TextField();
            title.text = "Identify the major sources of tension with you teammates";
            title.size = 30;
            title.width = this.stageWidth;
            title.x = 20;
            title.y = 2;
            this.sprite.addChild(title);
        };
        TensionScaleResult.prototype.drawTensionScale = function () {
            var _this = this;
            console.log(this.simulatedData);
            this.simulatedData.forEach(function (val, index, array) {
                try {
                    var player_score = val[3].toString();
                    var middle_score = val[2].toString();
                    var character1 = val[0];
                    var character2 = val[2];
                    var tensionScale = new game.TensionScale(100, 60, [val[0], val[1]], player_score);
                    if (index % 2 == 1) {
                        tensionScale.x = 150;
                        tensionScale.y = 150 + (index - 1) * 100;
                    }
                    else if (index % 2 == 0) {
                        tensionScale.x = 350;
                        tensionScale.y = 150 + index * 100;
                    }
                    _this.sprite.addChild(tensionScale);
                }
                catch (error) {
                }
            });
            console.log(this.simulatedData);
            if (this.simulatedData[2]) {
                if (this.playerCount == this.simulatedData[2].length - 1) {
                    this.addChild(this.rightIcon);
                    this.timer.stop();
                }
            }
        };
        TensionScaleResult.prototype.rightNext = function () {
            // console.log('向右像牛')
            // var self = this
            // base.API.call('save_players_process', { 
            //     'inviter_name': self.inviter, 
            //     'game_secret': self.game_secret,
            //     'player': self.player,
            //     'game_name': self.gameName,
            //     'process': '5.0'
            // }).then(function (response){
            //     var missionResult = new game.MissionResult(self.stageWidth, self.stageHeight, self.inviter, self.game_secret, self.player, self.gameName)
            //     self.stage.addChild(missionResult)
            //     self.sprite.visible=false
            //     self.rightIcon.visible=false
            // })
            var self = this;
            if (self.stage) {
                var missionResult = new game.MissionResult(self.stageWidth, self.stageHeight, self.inviter, self.game_secret, self.player, self.gameName, self.characterListParams);
                self.stage.addChild(missionResult);
                self.sprite.visible = false;
                self.rightIcon.visible = false;
            }
        };
        TensionScaleResult.prototype.onTouchBegin = function () {
            if (this.stage) {
                var inviteScene = new game.CreateGame(this.stage.stageWidth, this.stage.stageHeight);
                this.stage.addChild(inviteScene);
                this.sprite.visible = false;
                this.label.visible = false;
            }
        };
        TensionScaleResult.prototype.getRandomScore = function (Min, Max) {
            var Range = Max - Min;
            var Rand = Math.random();
            return (Min + Math.round(Rand * Range));
        };
        TensionScaleResult.prototype.onTouchEnd = function () {
            egret.log("onTouchEnd");
        };
        TensionScaleResult.prototype.onTouchMove = function () {
            egret.log("onTouchMove");
        };
        TensionScaleResult.prototype.onTouchTap = function () {
            egret.log("onTouchTap");
        };
        return TensionScaleResult;
    }(egret.DisplayObjectContainer));
    game.TensionScaleResult = TensionScaleResult;
    __reflect(TensionScaleResult.prototype, "game.TensionScaleResult");
})(game || (game = {}));
//# sourceMappingURL=TensionScaleResult.js.map