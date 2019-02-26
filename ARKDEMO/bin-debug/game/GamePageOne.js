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
            _this.characterTwo = 'Power';
            _this.characterOne = 'Carefulness';
            _this._touchStatus = false;
            _this._distance = new egret.Point();
            _this.characterList = [];
            _this.map = {};
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
            _this.rectShapeOne = new egret.Shape();
            _this.rectShapeTwo = new egret.Shape();
            _this.sprite.addChild(_this.rectShapeOne);
            _this.sprite.addChild(_this.rectShapeTwo);
            _this.drawRect();
            var character1 = new egret.TextField();
            character1.text = 'Carefulness';
            character1.textAlign = egret.HorizontalAlign.CENTER;
            character1.size = 40;
            character1.border = true;
            character1.width = 280;
            character1.borderColor = 0x3A5FCD;
            character1.x = stageWidth - 390;
            character1.y = 200;
            _this.sprite.addChild(character1);
            _this._shape = new egret.Shape();
            _this.addChild(_this._shape);
            _this.initGraphics();
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
            _this.addChild(_this.rightIcon);
            _this.rightIcon.touchEnabled = true;
            _this.rightIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.nextTouch, _this);
            _this.closeIcon = new egret.Bitmap(RES.getRes('close-circle_png'));
            _this.closeIcon.width = 40;
            _this.closeIcon.height = 40;
            _this.closeIcon.anchorOffsetX = _this.closeIcon.width / 2;
            _this.closeIcon.anchorOffsetY = _this.closeIcon.height / 2;
            _this.closeIcon.x = stageWidth - 30;
            _this.closeIcon.y = 150;
            _this.closeIcon.touchEnabled = true;
            _this.closeIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.closeTip, _this);
            _this.addChild(_this.closeIcon);
            _this.tiptext = new egret.TextField();
            return _this;
        }
        GamePageOne.prototype.closeTip = function () {
            if (this.tiptext.parent) {
                this.removeChild(this.tiptext);
            }
        };
        GamePageOne.prototype.nextTouch = function () {
            console.log(this.sprite.numChildren - this.playerList.length - 4);
            var scoreCounts = this.sprite.numChildren - this.playerList.length - 4;
            if (this.playerList.length == scoreCounts) {
                if (this.stage) {
                    var game_secret_1 = this.game_secret;
                    var inviter_1 = this.inviter;
                    var player_1 = this.player;
                    var gameName_1 = this.gameName;
                    var stageWidth_1 = this.stageWidth;
                    var stageHeight_1 = this.stageHeight;
                    var count = 0;
                    var self = this;
                    base.API.Init("http://127.0.0.1:8000/api/");
                    base.API.call('set_player_score', {
                        'params': this.map,
                        'inviter_name': this.inviter,
                        'gameSecret': this.game_secret,
                        'player': this.player,
                        'gameName': this.gameName,
                        'charaChooser': this.inviter,
                        'characterOne': this.characterOne,
                        'characterTwo': this.characterTwo
                    }).then(function (response) {
                        var pageOneResult = new game.PageOneResult(game_secret_1, inviter_1, player_1, gameName_1, stageWidth_1, stageHeight_1);
                        self.stage.addChild(pageOneResult);
                        self.sprite.visible = false;
                        self.tiptext.text = '';
                        self.removeChild(self.rightIcon);
                        self.removeChild(self.closeIcon);
                    });
                    // this.characterList = {'zjy':['Loyality', 'Joy'], '1':['Power', 'Courage'], '2':['Harmony', 'Disruption']}
                    // this.characterList = [['zjy', '1', '2'], [['Loyality', 'Joy'], ['Power', 'Courage'], ['Harmony', 'Disruption']]]
                    // let charater = new game.Character(game_secret,inviter, player, gameName, stageWidth, stageHeight, count, this.characterList);
                    // this.stage.addChild(charater);
                    // this.sprite.visible = false
                    // this.tiptext.text = ''
                    // this.removeChild(this.rightIcon)
                    // this.removeChild(this.closeIcon)
                }
            }
            else {
                this.addChild(this.tiptext);
                this.tip(100, 100, 'Everyont must be graded!');
            }
        };
        GamePageOne.prototype.tip = function (width, height, msg) {
            var tiptext = this.tiptext;
            tiptext.x = width;
            tiptext.y = height;
            tiptext.text = msg;
            tiptext.size = 40;
            tiptext.width = this.stageWidth;
        };
        GamePageOne.prototype.drawRect = function () {
            var shape1 = this.rectShapeOne;
            shape1.graphics.beginFill(0xff0000, 0.5);
            shape1.graphics.drawRect(0, 0, this.stageWidth + 60, 180);
            shape1.graphics.endFill();
            var shape2 = this.rectShapeTwo;
            shape2.graphics.beginFill(0xff0000, 0.5);
            shape2.graphics.drawRect(0, this.stageHeight - 100, this.stageWidth + 60, 200);
            shape2.graphics.endFill();
        };
        //初始化赋值
        GamePageOne.prototype.initGraphics = function () {
            var shape = this._shape;
            shape.graphics.lineStyle(2, 0xff00ff);
            shape.graphics.moveTo(this.stageWidth - 250, this.stageHeight - 150);
            shape.graphics.lineTo(this.stageWidth - 250, 240);
        };
        GamePageOne.prototype.initCharacter = function (cx, cy) {
            var charater2 = this.charater2;
            charater2.text = 'Power';
            charater2.textAlign = egret.HorizontalAlign.CENTER;
            charater2.size = 40;
            charater2.border = true;
            charater2.width = 280;
            charater2.borderColor = 0x3A5FCD;
            charater2.x = cx;
            charater2.y = cy;
        };
        GamePageOne.prototype.getPlayList = function () {
            // base.API.Init("http://39.104.85.167:8105/api/");
            base.API.Init("http://127.0.0.1:8000/api/");
            var self = this;
            base.API.call('get_player_list', {
                'game_secret': self.game_secret,
                'gameName': self.gameName,
                'inviter': self.inviter
            }).then(function (response) {
                var _this = this;
                self.playerList = response['player_list'];
                // self.playerCounts = 
                self.playerList.forEach(function (val, index, array) {
                    var player_name = new egret.TextField();
                    player_name.text = val;
                    console.log(val.length);
                    player_name.textAlign = egret.HorizontalAlign.CENTER;
                    player_name.size = 30;
                    player_name.lineSpacing = 10;
                    player_name.touchEnabled = true;
                    player_name.border = true;
                    if (val.length * 18 < 100) {
                        player_name.width = 100;
                    }
                    else {
                        player_name.width = val.length * 18;
                    }
                    player_name.borderColor = 0x00ff00;
                    player_name.x = 70;
                    player_name.y = 300 + index * 50;
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
                                // player_score.visible = false
                                if (player_name.x > (self.stageWidth - 250 - w)) {
                                    player_name.x = self.stageWidth - 250 - w;
                                    console.log(player_name.x);
                                    console.log(player_name.y);
                                    if (player_name.y > 240 && player_name.y < self.stageHeight - 100) {
                                        player_score.x = player_name.x + w;
                                        player_score.y = player_name.y;
                                        var scorey = (self.stageHeight - 150 - 240) / 81;
                                        player_score.text = (Math.ceil((player_score.y - 240) / scorey)).toString();
                                        self.sprite.addChild(player_score);
                                        var _score = (Math.ceil((player_score.y - 240) / scorey)).toString();
                                        var playerName = player_name.text;
                                        self.map[playerName] = _score;
                                    }
                                }
                            }
                        }, _this);
                    }, _this);
                    player_name.addEventListener(egret.TouchEvent.TOUCH_END, function (e) {
                        self._touchStatus = false;
                        player_name.removeEventListener(egret.TouchEvent.TOUCH_MOVE, _this.mouseMove, _this);
                    }, _this);
                    self.sprite.addChild(player_name);
                });
            });
        };
        GamePageOne.prototype.onTouchEnd = function () {
            egret.log("onTouchEnd");
        };
        GamePageOne.prototype.onTouchMove = function () {
            egret.log("onTouchMove");
        };
        GamePageOne.prototype.onTouchTap = function () {
            egret.log("onTouchTap");
        };
        return GamePageOne;
    }(egret.DisplayObjectContainer));
    game.GamePageOne = GamePageOne;
    __reflect(GamePageOne.prototype, "game.GamePageOne");
})(game || (game = {}));
//# sourceMappingURL=GamePageOne.js.map