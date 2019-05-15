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
    var Character = (function (_super) {
        __extends(Character, _super);
        function Character(game_secret, inviter, player, gameName, stageWidth, stageHeight, count, characterListParams, playerAndOthersCharacterList) {
            var _this = _super.call(this) || this;
            _this.playerList = [];
            _this.game_secret = '';
            _this.player = '';
            _this.gameName = '';
            _this.inviter = '';
            _this.characterTwo = '';
            _this.characterOne = '';
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            _this._touchStatus = false;
            _this._distance = new egret.Point();
            _this.characterList = [];
            _this.characterListParams = [];
            _this.charaChooser = [];
            _this.playerAndOthersCharacterList = [];
            _this.map = {};
            _this.game_secret = game_secret;
            _this.player = player;
            _this.gameName = gameName;
            _this.inviter = inviter;
            _this.count = count;
            _this.characterListParams = characterListParams;
            _this.playerAndOthersCharacterList = playerAndOthersCharacterList;
            _this.characterList = characterListParams[1];
            _this.charaChooser = characterListParams[0];
            _this.characterTwo = _this.characterList[count][1];
            _this.characterOne = _this.characterList[count][0];
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
            _this._shape = new egret.Shape();
            _this.addChild(_this._shape);
            _this.initGraphics();
            _this.charater1 = new egret.TextField();
            _this.sprite.addChild(_this.charater1);
            _this.initCharacter1(stageWidth - 390, 200);
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
            // this.closeIcon = new egret.Bitmap(RES.getRes('close-circle_png') as egret.Texture)
            // this.closeIcon.width = 40
            // this.closeIcon.height = 40
            // this.closeIcon.anchorOffsetX = this.closeIcon.width / 2
            // this.closeIcon.anchorOffsetY = this.closeIcon.height / 2
            // this.closeIcon.x = stageWidth - 30
            // this.closeIcon.y = 150
            // this.closeIcon.touchEnabled = true
            // this.closeIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.closeTip, this)
            // this.addChild(this.closeIcon)
            _this.tiptext = new egret.TextField();
            var process = Math.ceil(((count + 1) / _this.charaChooser.length) * 65 + 20);
            var probessBar = new game.ProcessBar(stageWidth, stageHeight, process, 'Mission 1 > Vote Tension Scale');
            _this.sprite.addChild(probessBar);
            return _this;
        }
        // private closeTip(): void {
        //     if (this.tiptext.parent) {
        //         this.removeChild(this.tiptext)
        //     }
        // }
        Character.prototype.nextTouch = function () {
            this.rightIcon.touchEnabled = false;
            var scoreCounts = this.sprite.numChildren - this.playerList.length - 5;
            if (this.playerList.length == scoreCounts) {
                var game_secret = this.game_secret;
                var inviter = this.inviter;
                var player = this.player;
                var gameName = this.gameName;
                var stageWidth = this.stageWidth;
                var stageHeight = this.stageHeight;
                var characterone = this.characterListParams[1][this.count][0];
                var charactertwo = this.characterListParams[1][this.count][1];
                base.API.Init("http://work.metatype.cn:8105/api/");
                base.API.call('set_player_score', {
                    'params': this.map,
                    'inviter_name': this.inviter,
                    'gameSecret': this.game_secret,
                    'player': this.player,
                    'gameName': this.gameName,
                    'charaChooser': this.charaChooser[this.count],
                    'characterOne': characterone,
                    'characterTwo': charactertwo
                }).then(function (response) {
                });
                var count = this.count;
                base.API.call('save_players_process', {
                    'inviter_name': this.inviter,
                    'game_secret': this.game_secret,
                    'player': this.player,
                    'game_name': this.gameName,
                    'process': '1.' + count.toString() + '.1'
                }).then(function (response) {
                });
                this.sprite.visible = false;
                this.removeChild(this.sprite);
                this.removeChild(this.rightIcon);
                this.removeChild(this.closeIcon);
                this._shape.visible = false;
                this.tiptext.text = '';
                var chooser = this.charaChooser[this.count];
                var missionPartialInsights = new game.MissionPartialInsights(this.stageWidth, this.stageHeight, characterone, charactertwo, this.player, this.player_score, this.inviter, this.game_secret, this.gameName, count, chooser);
                this.stage.addChild(missionPartialInsights);
            }
            else {
                this.addChild(this.tiptext);
                this.tip(100, 100, 'Everyone must be graded!');
            }
        };
        Character.prototype.tip = function (width, height, msg) {
            var tiptext = this.tiptext;
            tiptext.x = width;
            tiptext.y = height;
            tiptext.text = msg;
            tiptext.size = 40;
            tiptext.width = this.stageWidth;
        };
        Character.prototype.drawRect = function () {
            var shape1 = this.rectShapeOne;
            shape1.graphics.beginFill(0x359f93, 0.5);
            shape1.graphics.drawRect(0, 0, this.stageWidth + 60, 180);
            shape1.graphics.endFill();
            var shape2 = this.rectShapeTwo;
            shape2.graphics.beginFill(0x359f93, 0.5);
            shape2.graphics.drawRect(0, this.stageHeight - 100, this.stageWidth + 60, 200);
            shape2.graphics.endFill();
        };
        //初始化赋值
        Character.prototype.initGraphics = function () {
            var shape = this._shape;
            shape.graphics.lineStyle(2, 0xff00ff);
            shape.graphics.moveTo(this.stageWidth - 250, this.stageHeight - 150);
            shape.graphics.lineTo(this.stageWidth - 250, 240);
        };
        Character.prototype.initCharacter = function (cx, cy) {
            var charater2 = this.charater2;
            charater2.text = this.characterTwo;
            charater2.textAlign = egret.HorizontalAlign.CENTER;
            charater2.size = 40;
            charater2.border = true;
            charater2.width = 280;
            charater2.borderColor = 0x3A5FCD;
            charater2.x = cx;
            charater2.y = cy;
        };
        Character.prototype.initCharacter1 = function (cx, cy) {
            var charater1 = this.charater1;
            charater1.text = this.characterOne;
            charater1.textAlign = egret.HorizontalAlign.CENTER;
            charater1.size = 40;
            charater1.border = true;
            charater1.width = 280;
            charater1.borderColor = 0x3A5FCD;
            charater1.x = cx;
            charater1.y = cy;
        };
        Character.prototype.getPlayList = function () {
            base.API.Init("http://work.metatype.cn:8105/api/");
            // base.API.Init("http://work.metatype.cn:8105/api/");
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
                                if (player_name.x > (self.stageWidth - 250 - w)) {
                                    player_name.x = self.stageWidth - 250 - w;
                                    if (player_name.y > 240 && player_name.y < self.stageHeight - 150 - player_name.height) {
                                        player_score.x = player_name.x + w;
                                        player_score.y = player_name.y;
                                        var scorey = (self.stageHeight - 150 - 240 - player_name.height) / 81;
                                        player_score.text = (Math.ceil((player_score.y - 240) / scorey)).toString();
                                        self.sprite.addChild(player_score);
                                        var _score = (Math.ceil((player_score.y - 240) / scorey)).toString();
                                        var playerName = player_name.text;
                                        if (playerName == self.player) {
                                            self.player_score = _score;
                                        }
                                        self.map[playerName] = _score;
                                    }
                                }
                                if (player_name.y > self.stageHeight - 150 - player_name.height) {
                                    player_name.y = self.stageHeight - 150 - player_name.height;
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
        return Character;
    }(egret.DisplayObjectContainer));
    game.Character = Character;
    __reflect(Character.prototype, "game.Character");
})(game || (game = {}));
//# sourceMappingURL=Character.js.map