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
    var KeepUpVoting = (function (_super) {
        __extends(KeepUpVoting, _super);
        function KeepUpVoting(stageWidth, stageHeight, process, missionName, inviter, game_secret, player, gameName, scorecount) {
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
            _this.characterListParams = [];
            _this.votedScalesNumber = 1;
            _this.scalesNumber = 7;
            _this.remainingScalesNumber = _this.scalesNumber - _this.votedScalesNumber;
            _this.simulatedData1 = [];
            _this.simulatedData2 = [];
            _this.ttsms = [];
            _this.scorecount = 0;
            _this.simulatedData = [];
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.game_secret = game_secret;
            _this.player = player;
            _this.gameName = gameName;
            _this.inviter = inviter;
            _this.scorecount = scorecount;
            _this.sprite = new egret.Sprite();
            _this.addChild(_this.sprite);
            _this.noticeBox = new egret.TextField();
            _this.background();
            _this.sprite.addChild(_this.noticeBox);
            // this.notice()
            // this.tensionScale()
            _this.initNotice();
            _this.processBar();
            var idTimeout = egret.setTimeout(function (arg) {
                this.rightIcon();
            }, _this, 2000, "egret");
            _this.timer = new egret.Timer(1000, 0);
            _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.getGameResult, _this);
            _this.timer.start();
            return _this;
        }
        KeepUpVoting.prototype.initNotice = function () {
            // let votedScalesNumber =this.votedScalesNumber.toString()
            // let scalesNumber = this.scalesNumber.toString()
            // let remainingScalesNumber = this.remainingScalesNumber.toString()
            var noticeBox = this.noticeBox;
            noticeBox.textColor = 0x000000;
            noticeBox.width = this._width;
            noticeBox.x = this._x;
            noticeBox.y = 60;
            noticeBox.background = true;
            noticeBox.backgroundColor = 0xffcc33;
        };
        KeepUpVoting.prototype.processBar = function () {
            var processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 55, "Mission 1 > Keep Up Voting");
            this.sprite.addChild(processBar);
        };
        KeepUpVoting.prototype.notice = function () {
            var votedScalesNumber = this.votedScalesNumber.toString();
            var scalesNumber = this.scalesNumber.toString();
            var remainingScalesNumber = this.remainingScalesNumber.toString();
            this.noticeBox = new egret.TextField();
            this.noticeBox.text = "Great! You cleared " + votedScalesNumber.toString() + " out of " + scalesNumber.toString() + " Tension Scales\n. Vote the remaining " + remainingScalesNumber.toString() + " to finish Mission 1 and\ndiscover your teams Zone of Responsible\nAction!";
            this.noticeBox.textColor = 0x000000;
            this.noticeBox.width = this._width;
            this.noticeBox.x = this._x;
            this.noticeBox.y = 60;
            this.noticeBox.background = true;
            this.noticeBox.backgroundColor = 0xffcc33;
            this.sprite.addChild(this.noticeBox);
        };
        KeepUpVoting.prototype.background = function () {
            var grey = new egret.Shape();
            grey.x = this._x / 2; // 20会多
            grey.y = 120 - 20; // 减掉多的空白
            grey.graphics.beginFill(0xcccccc, 1);
            grey.graphics.drawRect(grey.x, grey.y, 380, this.stageHeight);
            grey.graphics.endFill();
            this.sprite.addChild(grey);
            var orange = new egret.Shape();
            orange.x = this._x / 2 + grey.width / 2 + this._margin / 2;
            orange.y = 120 - 20;
            orange.graphics.beginFill(0xffcc33, 1);
            orange.graphics.drawRect(orange.x, orange.y, 200, this.stageHeight);
            orange.graphics.endFill();
            this.sprite.addChild(orange);
        };
        KeepUpVoting.prototype.getGameResult = function () {
            var self = this;
            base.API.Init("http://work.metatype.cn:8105/api/");
            base.API.call('getKeepUpVotingData', {
                'inviter_name': self.inviter,
                'game_secret': self.game_secret,
                'player': self.player,
                'gameName': self.gameName,
            }).then(function (response) {
                self.simulatedData1 = response['simulatedData1'];
                self.simulatedData2 = response['simulatedData2'];
                var votedScalesNumber = self.simulatedData2.length;
                var scalesNumber = votedScalesNumber + self.simulatedData1.length;
                var remainingScalesNumber = self.simulatedData1.length;
                self.noticeBox.text = "Great! You cleared " + votedScalesNumber.toString() + " out of " + scalesNumber.toString() + " Tension Scales. Vote the remaining " + remainingScalesNumber.toString() + " to finish Mission 1 and discover your teams Zone of Responsible Action!";
                self.tensionScale();
            });
        };
        KeepUpVoting.prototype.tensionScale = function () {
            var _this = this;
            this.simulatedData1.forEach(function (val, index, array) {
                var character1 = val[0];
                var character2 = val[1];
                var middle_score = Number(val[2].toString());
                var player_score = Number(val[3].toString());
                var absoluteValueOfDeviation = Math.abs(player_score - middle_score);
                var individualTensionScaleMedian = middle_score;
                var teamTensionScaleMedian = 0;
                var tensionScale = new game.TensionScale(100, 60, [val[0], val[1]], absoluteValueOfDeviation, player_score, teamTensionScaleMedian, individualTensionScaleMedian);
                if (index % 2 == 1) {
                    tensionScale.x = 25;
                    tensionScale.y = 210 + (index - 1) * 100;
                }
                else if (index % 2 == 0) {
                    tensionScale.x = 215;
                    tensionScale.y = 210 + index * 100;
                }
                _this.sprite.addChild(tensionScale);
            });
            this.simulatedData2.forEach(function (val, index, array) {
                var character1 = val[0];
                var character2 = val[1];
                var individualTensionScaleMedian = Number(val[2].toString());
                var absoluteValueOfDeviation = Number(val[3].toString());
                var player_score = Number(val[4].toString());
                // let absoluteValueOfDeviation = Math.abs(player_score - middle_score)
                // let individualTensionScaleMedian = middle_score
                var teamTensionScaleMedian = 0;
                var tensionScale = new game.TensionScale(100, 60, [val[0], val[1]], absoluteValueOfDeviation, player_score, teamTensionScaleMedian, individualTensionScaleMedian);
                tensionScale.x = 430;
                tensionScale.y = 210 + index * 150;
                _this.sprite.addChild(tensionScale);
            });
        };
        KeepUpVoting.prototype.rightIcon = function () {
            var rightIcon = new egret.Bitmap(RES.getRes("right_png"));
            rightIcon.width = 100;
            rightIcon.height = 100;
            rightIcon.anchorOffsetX = rightIcon.width / 2;
            rightIcon.anchorOffsetY = rightIcon.height / 2;
            rightIcon.x = this.stageWidth - 50;
            rightIcon.y = this.stageHeight - 50;
            rightIcon.touchEnabled = true;
            rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextTouch, this);
            this.sprite.addChild(rightIcon);
        };
        KeepUpVoting.prototype.nextTouch = function () {
            var self = this;
            var scorecount = self.scorecount + 1;
            base.API.Init("http://work.metatype.cn:8105/api/");
            base.API.call('getCharacterList', {
                'inviter_name': self.inviter,
                'game_secret': self.game_secret,
                'player': self.player,
                'gameName': self.gameName,
            }).then(function (response) {
                var characterListParams = response['characterListParams'];
                var playerCount = response['playerCount'];
                self.playerCount = playerCount;
                if (playerCount > scorecount) {
                    if (characterListParams[1][scorecount] != undefined) {
                        self.timer.stop();
                        self.sprite.visible = false;
                        self.removeChild(self.sprite);
                        var charater = new game.Character(self.game_secret, self.inviter, self.player, self.gameName, self.stageWidth, self.stageHeight, self.scorecount + 1, characterListParams, []);
                        self.stage.addChild(charater);
                        // self.rightIcon.visible = false
                    }
                    else {
                        alert('Please wait for others to choose scale');
                    }
                }
                else {
                    base.API.call('get_game_score', {
                        'characterListParams': self.characterListParams,
                        'inviter': self.inviter,
                        'gameSecret': self.game_secret,
                        'player': self.player,
                        'gameName': self.gameName,
                    }).then(function (response) {
                        var result = response['result'];
                        self.simulatedData = result;
                    });
                    var flag = true;
                    //  for(var i=0;i<self.simulatedData.length;i++){
                    //     if(self.simulatedData[i].length < 4){
                    //         alert('Please wait for everyone to finish scoring.')
                    //         flag = false 
                    //         break
                    //     }
                    //  }
                    if (flag == true) {
                        base.API.call('save_players_process', {
                            'inviter_name': self.inviter,
                            'game_secret': self.game_secret,
                            'player': self.player,
                            'game_name': self.gameName,
                            'process': '2.0'
                        }).then(function (response) {
                            self.timer.stop();
                            self.sprite.visible = false;
                            self.removeChild(self.sprite);
                            var toTensionScaleResult = new game.TensionScaleResult(self.stageWidth, self.stageHeight, self.inviter, self.game_secret, self.player, self.gameName, characterListParams, self.playerCount);
                            self.stage.addChild(toTensionScaleResult);
                        });
                    }
                }
            });
        };
        return KeepUpVoting;
    }(egret.DisplayObjectContainer));
    game.KeepUpVoting = KeepUpVoting;
    __reflect(KeepUpVoting.prototype, "game.KeepUpVoting");
})(game || (game = {}));
//# sourceMappingURL=KeepUpVoting.js.map