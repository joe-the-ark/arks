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
    var KeepUpSupporting = (function (_super) {
        __extends(KeepUpSupporting, _super);
        function KeepUpSupporting(stageWidth, stageHeight, player, inviter, game_secret, gameName, count, simulatedData, player_list, votedPlayerList, remainingPlayersList) {
            var _this = _super.call(this) || this;
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            /***     初始赋值代码结束    ***/
            _this.game_secret = '';
            _this.gameName = '';
            _this.inviter = '';
            _this.player = '';
            _this._width = 600;
            _this.noticeHeight = 140;
            _this._x = 20;
            _this._margin = 20;
            _this.characterListParams = [];
            _this.votedScalesNumber = 1;
            _this.scalesNumber = 7;
            _this.ttsms = [];
            _this.player_list = [];
            _this.votedPlayerList = [];
            _this.remainingPlayersList = [];
            _this.simulatedData = [];
            _this.checkpoint = 0;
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            _this.addChild(_this.sprite);
            _this.player = player;
            _this.inviter = inviter;
            _this.game_secret = game_secret;
            _this.gameName = gameName;
            _this.count = count;
            _this.simulatedData = simulatedData;
            _this.player_list = player_list;
            _this.votedPlayerList = votedPlayerList;
            _this.remainingPlayersList = remainingPlayersList;
            _this.scalesNumber = _this.player_list.length;
            _this.votedScalesNumber = _this.votedPlayerList.length;
            _this.remainingScalesNumber = _this.scalesNumber - _this.votedScalesNumber;
            _this.background();
            _this.remainingPlayers();
            _this.votedPlayers();
            _this.processBar();
            _this.notice();
            _this.noticeBox = new egret.TextField();
            _this.rightIcon = new egret.Bitmap(RES.getRes("right_png"));
            _this.rightIcon.width = 100;
            _this.rightIcon.height = 100;
            _this.rightIcon.anchorOffsetX = _this.rightIcon.width / 2;
            _this.rightIcon.anchorOffsetY = _this.rightIcon.height / 2;
            _this.rightIcon.x = _this.stageWidth - 50;
            _this.rightIcon.y = _this.stageHeight - 50;
            _this.rightIcon.touchEnabled = true;
            _this.rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.nextPage, _this);
            _this.sprite.addChild(_this.rightIcon);
            return _this;
        }
        KeepUpSupporting.prototype.processBar = function () {
            var processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 55, "Mission 2 > Keep Up Supporting");
            this.sprite.addChild(processBar);
        };
        KeepUpSupporting.prototype.notice = function () {
            var votedScalesNumber = this.votedScalesNumber.toString();
            var scalesNumber = this.scalesNumber.toString();
            var remainingScalesNumber = this.remainingScalesNumber.toString();
            this.noticeBox = new egret.TextField();
            this.noticeBox.text = "Great! You answered " + votedScalesNumber.toString() + " out of " + scalesNumber.toString() + " Feedbacks. Fill in the remaining " + remainingScalesNumber.toString() + " to finish Mission 2 and Embrace your teammates anonymous Feedback for a better deployment of the team's potentialities.!";
            this.noticeBox.textColor = 0x000000;
            this.noticeBox.width = this._width;
            this.noticeBox.height = this.noticeHeight;
            this.noticeBox.x = this._x;
            this.noticeBox.y = 60;
            this.noticeBox.background = true;
            this.noticeBox.backgroundColor = 0xffcc33;
            this.sprite.addChild(this.noticeBox);
        };
        KeepUpSupporting.prototype.background = function () {
            var grey = new egret.Shape();
            grey.x = this._x / 2; // 20会多
            grey.y = 100; // 减掉多的空白
            grey.graphics.beginFill(0xcccccc, 1);
            grey.graphics.drawRect(grey.x, grey.y, 380, this.stageHeight);
            grey.graphics.endFill();
            this.sprite.addChild(grey);
            var orange = new egret.Shape();
            orange.x = this._x / 2 + grey.width / 2 + this._margin / 2;
            orange.y = 100;
            orange.graphics.beginFill(0xffcc33, 1);
            orange.graphics.drawRect(orange.x, orange.y, 200, this.stageHeight);
            orange.graphics.endFill();
            this.sprite.addChild(orange);
        };
        KeepUpSupporting.prototype.remainingPlayers = function () {
            var group = new eui.Group();
            var exml = "\n                        <e:Skin xmlns:e=\"http://ns.egret.com/eui\" states=\"up,down\" height=\"50\">\n                            <e:Label text=\"{data}\" textColor.down=\"0xFFFFFF\" textColor.up=\"0x666666\" horizontalCenter=\"0\" verticalCenter=\"0\"/> \n                        </e:Skin>";
            var list = new eui.List();
            var remainingPlayers = this.remainingPlayersList;
            list.dataProvider = new eui.ArrayCollection(remainingPlayers);
            list.itemRendererSkinName = exml;
            group.addChild(list);
            var myScroller = new eui.Scroller();
            myScroller.width = 380;
            myScroller.height = this.stageHeight - 80 - 120;
            myScroller.x = myScroller.width / 2 - 40;
            myScroller.y = 150 + 80;
            myScroller.viewport = group;
            this.sprite.addChild(myScroller);
        };
        KeepUpSupporting.prototype.votedPlayers = function () {
            var group = new eui.Group();
            var exml = "\n                        <e:Skin xmlns:e=\"http://ns.egret.com/eui\" states=\"up,down\" height=\"50\">\n                            <e:Label text=\"{data}\" textColor.down=\"0xFFFFFF\" textColor.up=\"0x666666\" horizontalCenter=\"0\" verticalCenter=\"0\"/> \n                        </e:Skin>";
            var list = new eui.List();
            var votedPlayers = this.votedPlayerList;
            list.dataProvider = new eui.ArrayCollection(votedPlayers);
            list.itemRendererSkinName = exml;
            group.addChild(list);
            var myScroller = new eui.Scroller();
            myScroller.width = 380;
            myScroller.height = this.stageHeight - 80 - 120;
            myScroller.x = this.stageWidth - myScroller.width / 2 + 30;
            myScroller.y = 150 + 80;
            myScroller.viewport = group;
            this.sprite.addChild(myScroller);
        };
        KeepUpSupporting.prototype.nextPage = function () {
            if (this.count + 1 == this.player_list.length) {
                base.API.call('save_players_process', {
                    'inviter_name': this.inviter,
                    'game_secret': this.game_secret,
                    'player': this.player,
                    'game_name': this.gameName,
                    'process': '5'
                }).then(function (response) { });
                var self_1 = this;
                base.API.call('check_game_point', {
                    'inviter_name': self_1.inviter,
                    'game_secret': self_1.game_secret,
                    'player': self_1.player,
                    'game_name': self_1.gameName,
                }).then(function (response) {
                    var result = response['result'];
                    console.log('result', result);
                    var code = result['code'];
                    if (code == 1) {
                        alert('Please wait for others to complete the review');
                    }
                    else {
                        var that = self_1;
                        base.API.call('getOthersFeedback', {
                            'game_secret': that.game_secret,
                            'gameName': that.gameName,
                            'player': that.player,
                            'inviter': that.inviter,
                        }).then(function (response) {
                            var result = response['result'];
                            that.sprite.visible = false;
                            that.removeChild(that.sprite);
                            var preview = new game.DigestLove(that.stageWidth, that.stageHeight, result, that.inviter, that.game_secret, that.gameName, that.player);
                            that.stage.addChild(preview);
                        });
                    }
                });
                // base.API.Init("http://work.metatype.cn:8105/api/");
            }
            else {
                var self = this;
                self.rightIcon.touchEnabled = false;
                var count = self.count + 1;
                self.sprite.visible = false;
                self.removeChild(self.sprite);
                var loveAddAsk = new game.LoveAddAsk(self.stageWidth, self.stageHeight, count, self.simulatedData, self.player, self.inviter, self.game_secret, self.gameName);
                self.stage.addChild(loveAddAsk);
            }
        };
        return KeepUpSupporting;
    }(egret.DisplayObjectContainer));
    game.KeepUpSupporting = KeepUpSupporting;
    __reflect(KeepUpSupporting.prototype, "game.KeepUpSupporting");
})(game || (game = {}));
//# sourceMappingURL=KeepUpSupporting.js.map