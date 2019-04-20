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
    var GamePageOne = (function (_super) {
        __extends(GamePageOne, _super);
        function GamePageOne(game_secret, inviter, player, gameName, stageWidth, stageHeight) {
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
            _this.characterList = [];
            _this.map = {};
            _this.playerSCore = '';
            _this.game_secret = game_secret;
            _this.player = player;
            _this.gameName = gameName;
            _this.inviter = inviter;
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            _this.sprite.width = stageWidth;
            _this.sprite.height = stageHeight;
            _this.sprite.x = 0;
            _this.sprite.y = 0;
            _this.addChild(_this.sprite);
            _this.sprite.addEventListener(egret.Event.ADDED_TO_STAGE, _this.getPlayList, _this);
            _this.clickTip();
            _this.rectShapeOne = new egret.Shape();
            _this.rectShapeTwo = new egret.Shape();
            _this.sprite.addChild(_this.rectShapeOne);
            _this.sprite.addChild(_this.rectShapeTwo);
            _this.drawRect();
            var character1 = new egret.TextField();
            character1.text = 'Insufficiently';
            character1.textAlign = egret.HorizontalAlign.CENTER;
            character1.size = 40;
            character1.border = true;
            character1.width = 280;
            character1.borderColor = 0x3A5FCD;
            character1.x = stageWidth - 390;
            character1.y = 200;
            _this.sprite.addChild(character1);
            _this._shape = new egret.Shape();
            _this.sprite.addChild(_this._shape);
            _this.initGraphics();
            _this.initdata();
            _this.charater2 = new egret.TextField();
            _this.sprite.addChild(_this.charater2);
            _this.initCharacter(stageWidth - 390, _this.stageHeight - 150);
            _this.rightIcon = new egret.Bitmap(RES.getRes('right_png'));
            _this.rightIcon.width = 100;
            _this.rightIcon.height = 100;
            _this.rightIcon.anchorOffsetX = _this.rightIcon.width / 2;
            _this.rightIcon.anchorOffsetY = _this.rightIcon.height / 2;
            _this.rightIcon.x = stageWidth - 50;
            _this.rightIcon.y = stageHeight / 2;
            _this.rightIcon.touchEnabled = true;
            _this.rightIcon.visible = false;
            _this.sprite.addChild(_this.rightIcon);
            _this.rightIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.nextTouch, _this);
            // this.closeIcon = new egret.Bitmap(RES.getRes('close-circle_png') as egret.Texture)
            // this.closeIcon.width = 40
            // this.closeIcon.height = 40
            // this.closeIcon.anchorOffsetX = this.closeIcon.width / 2
            // this.closeIcon.anchorOffsetY = this.closeIcon.height / 2
            // this.closeIcon.x = stageWidth - 30
            // this.closeIcon.y = 150
            // this.closeIcon.touchEnabled = true
            // this.closeIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.closeTip, this)
            // this.sprite.addChild(this.closeIcon)
            _this.tiptext = new egret.TextField();
            _this.sprite.addChild(_this.tiptext);
            var msg = " The ARK is serving the cause of tapping into \n your teams‘ full potential. Your first task:\n ANON-YMOUSLY rank your team on this \n Potentiality Scale from 1 to 81.";
            _this.tip(1, 50, msg, 30);
            var probessBar = new game.ProcessBar(stageWidth, stageHeight, 5, 'Inititate > Potential Scale');
            _this.sprite.addChild(probessBar);
            return _this;
        }
        GamePageOne.prototype.initdata = function () {
            var self = this;
            base.API.call('get_player_list', {
                'game_secret': self.game_secret,
                'gameName': self.gameName,
                'inviter': self.inviter
            }).then(function (response) {
                self.playerList = response['player_list'];
            });
        };
        // private closeTip(): void {
        //     if (this.tiptext.parent) {
        //         this.removeChild(this.tiptext)
        //     }
        // }
        GamePageOne.prototype.nextTouch = function () {
            if (this.stage) {
                var self = this;
                base.API.Init("http://work.metatype.cn:8105/api/");
                base.API.call('firstvote', {
                    'score': self.playerSCore,
                    'game_secret': self.game_secret,
                    'inviter_name': self.inviter,
                    'player': self.player,
                    'gameName': self.gameName,
                }).then(function (response) {
                });
                base.API.call('save_players_process', {
                    'inviter_name': self.inviter,
                    'game_secret': self.game_secret,
                    'player': self.player,
                    'game_name': self.gameName,
                    'process': '0.1'
                }).then(function (response) {
                    var game_secret = self.game_secret;
                    var inviter = self.inviter;
                    var player = self.player;
                    var gameName = self.gameName;
                    var stageWidth = self.stageWidth;
                    var stageHeight = self.stageHeight;
                    var playerSCore = self.playerSCore;
                    var playerCount = self.playerList.length;
                    self.sprite.visible = false;
                    self._shape.visible = false;
                    var initiatePartialInsights = new game.InitiatePartialInsights(game_secret, inviter, player, gameName, stageWidth, stageHeight, playerCount, playerSCore);
                    self.stage.addChild(initiatePartialInsights);
                });
            }
        };
        GamePageOne.prototype.tip = function (width, height, msg, size) {
            var tiptext = this.tiptext;
            tiptext.x = width;
            tiptext.y = height;
            tiptext.text = msg;
            tiptext.size = size;
            tiptext.width = this.stageWidth;
        };
        GamePageOne.prototype.clickTip = function () {
            var clickTip = new egret.TextField();
            clickTip.text = "Drag & Drop your\nIcon on the scale\nas you see fit. The\nquestion: In\nretrospective, to\nwhat extent does your\nteam tap into its\nfull POTENTIAL...";
            clickTip.width = 250;
            clickTip.x = 30;
            clickTip.y = 450;
            clickTip.background = true;
            clickTip.backgroundColor = 0x359f93;
            this.sprite.addChild(clickTip);
        };
        GamePageOne.prototype.drawRect = function () {
            var shape1 = this.rectShapeOne;
            shape1.graphics.beginFill(0x359f93, 0.5);
            shape1.graphics.drawRect(0, 0, this.stageWidth + 60, 180);
            shape1.graphics.endFill();
            var shape2 = this.rectShapeTwo;
            shape2.graphics.beginFill(0x359f93, 0.5);
            shape2.graphics.drawRect(0, this.stageHeight - 100, this.stageWidth + 60, 200);
            shape2.graphics.endFill();
        };
        GamePageOne.prototype.initGraphics = function () {
            var shape = this._shape;
            shape.graphics.lineStyle(2, 0xff00ff);
            shape.graphics.moveTo(this.stageWidth - 250, this.stageHeight - 150);
            shape.graphics.lineTo(this.stageWidth - 250, 240);
        };
        GamePageOne.prototype.initCharacter = function (cx, cy) {
            var charater2 = this.charater2;
            charater2.text = 'Fully';
            charater2.textAlign = egret.HorizontalAlign.CENTER;
            charater2.size = 40;
            charater2.border = true;
            charater2.width = 280;
            charater2.borderColor = 0x3A5FCD;
            charater2.x = cx;
            charater2.y = cy;
        };
        GamePageOne.prototype.getPlayList = function () {
            var _this = this;
            var self = this;
            var player_name = new egret.TextField();
            player_name.text = self.player;
            player_name.textAlign = egret.HorizontalAlign.CENTER;
            player_name.size = 30;
            player_name.lineSpacing = 10;
            player_name.touchEnabled = true;
            player_name.border = true;
            if (self.player.length * 18 < 100) {
                player_name.width = 100;
            }
            else {
                player_name.width = self.player.length * 18;
            }
            player_name.borderColor = 0x00ff00;
            player_name.x = 70;
            player_name.y = 300;
            var player_score = new egret.TextField();
            player_score.text = '';
            player_score.size = 30;
            player_score.border = true;
            player_score.width = 50;
            player_score.borderColor = 0x00ff00;
            player_score.textAlign = egret.HorizontalAlign.CENTER;
            player_name.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
                self._touchStatus = true;
                var dx = e.stageX;
                var px = player_name.x;
                var py = player_name.y;
                var dy = e.stageY;
                player_name.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (e) {
                    if (self._touchStatus) {
                        player_name.x = e.stageX - dx + px;
                        player_name.y = e.stageY - dy + py;
                        if (player_score.parent) {
                            player_score.parent.removeChild(player_score);
                        }
                        var w = 100;
                        if (player_name.width > 100) {
                            w = player_name.width;
                        }
                        if (player_name.x > (self.stageWidth - 250 - w)) {
                            player_name.x = self.stageWidth - 250 - w;
                            if (player_name.y > 240 && player_name.y < self.stageHeight - 150 - player_name.height) {
                                player_score.x = player_name.x + w;
                                player_score.y = player_name.y;
                                var scorey = (self.stageHeight - 150 - 240 - player_name.height) / 81;
                                player_score.text = (Math.ceil((player_score.y - 240) / scorey)).toString();
                                self.sprite.addChild(player_score);
                                var _score = (Math.ceil((player_score.y - 240) / scorey)).toString();
                                self.playerSCore = _score;
                                var playerName = player_name.text;
                                self.map[playerName] = _score;
                                self.rightIcon.visible = true;
                            }
                        }
                        if (player_name.y > self.stageHeight - 150 - player_name.height) {
                            player_name.y = self.stageHeight - 150 - player_name.height;
                        }
                    }
                }, _this);
            }, this);
            self.sprite.addChild(player_name);
        };
        return GamePageOne;
    }(egret.DisplayObjectContainer));
    game.GamePageOne = GamePageOne;
    __reflect(GamePageOne.prototype, "game.GamePageOne");
})(game || (game = {}));
//# sourceMappingURL=GamePageOne.js.map