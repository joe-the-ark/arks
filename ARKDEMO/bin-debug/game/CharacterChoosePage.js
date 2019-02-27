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
    var CharacterChoosePage = (function (_super) {
        __extends(CharacterChoosePage, _super);
        function CharacterChoosePage(game_secret, inviter, player, gameName, stageWidth, stageHeight, playerCount) {
            var _this = _super.call(this) || this;
            _this.unselectedCharacterList = [];
            _this.selectedChaeacterList = [];
            _this.game_secret = '';
            _this.gameName = '';
            _this.inviter = '';
            _this.player = '';
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            _this.count = 0;
            _this._touchStatus = false;
            _this.select_list = [];
            _this.playerCount = 0;
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.player = player;
            _this.gameName = gameName;
            _this.game_secret = game_secret;
            _this.inviter = inviter;
            _this.playerCount = playerCount;
            _this.sprite = new egret.Sprite();
            _this.addChild(_this.sprite);
            _this.sprite.touchEnabled = true;
            _this.titleBackground = new egret.Shape();
            _this.sprite.addChild(_this.titleBackground);
            _this.drawTitleBackground();
            _this.createTitle();
            _this.getCharacterList();
            _this.drawSplitLine();
            // this.addTensionScale();
            _this.confirmButton = new egret.Shape();
            _this.confirmButton.graphics.beginFill(0x00cc00);
            _this.confirmButton.graphics.drawRect(0, 0, 200, 50);
            _this.confirmButton.graphics.endFill();
            // this.confirmButton.x = unselectedCharacter.x;
            _this.confirmButton.y = 200;
            _this.confirmButton.touchEnabled = true;
            // this.nextTouch.bind(this.a);
            // this.nextTouch(a, e:event);
            _this.confirmButton.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.addTensionScale, _this);
            _this.confirmText = new egret.TextField();
            _this.confirmText.text = 'Confirm';
            _this.confirmText.size = 30;
            // this.confirmText.x = unselectedCharacter.x + 50;
            _this.confirmText.y = _this.confirmButton.y + 10;
            _this.sprite.addChild(_this.confirmButton);
            _this.sprite.addChild(_this.confirmText);
            _this.confirmText.visible = false;
            _this.confirmButton.visible = false;
            _this.rightIcon = new egret.Bitmap(RES.getRes('right_png'));
            _this.rightIcon.width = 100;
            _this.rightIcon.height = 100;
            _this.rightIcon.anchorOffsetX = _this.rightIcon.width / 2;
            _this.rightIcon.anchorOffsetY = _this.rightIcon.height / 2;
            _this.rightIcon.x = stageWidth - 50;
            _this.rightIcon.y = stageHeight - 100;
            return _this;
        }
        CharacterChoosePage.prototype.getPlayerCharacterList = function () {
            var self = this;
            base.API.Init("http://39.104.85.167:8105/api/");
            base.API.call('get_player_characterlist', {
                'game_secret': self.game_secret,
                'inviter': self.inviter,
                'player': self.player,
                'gameName': self.gameName,
            }).then(function (response) {
                var character_list = response['data'];
                var count = 0;
                character_list.forEach(function (val, index, array) {
                    var player_name = val[0];
                    console.log(count);
                    if (player_name != self.player) {
                        count++;
                        var tensionScale = new game.TensionScale(self.stageWidth, self.stageHeight, val[1]);
                        self.stage.addChild(tensionScale);
                        tensionScale.x = self.stageWidth - 200;
                        tensionScale.y = 180 + count * 150;
                    }
                    if (count + 1 == self.playerCount) {
                        self.addChild(self.rightIcon);
                    }
                });
            });
        };
        CharacterChoosePage.prototype.startGame = function (game_secret, gameName, inviter) {
            if (this.stage) {
                var enterGame = new game.EnterGame(game_secret, gameName, inviter, this.stage.stageWidth, this.stage.stageHeight);
                this.stage.addChild(enterGame);
                this.sprite.visible = false;
                this.label.visible = false;
            }
        };
        CharacterChoosePage.prototype.drawTitleBackground = function () {
            var shape1 = this.titleBackground;
            shape1.graphics.beginFill(0x00ff00, 0.5);
            shape1.graphics.drawRect(0, 0, this.stageWidth, 130);
            shape1.graphics.endFill();
        };
        CharacterChoosePage.prototype.createTitle = function () {
            var title = new egret.TextField();
            title.text = "Choose 2 kinds of character";
            title.size = 30;
            title.width = 480;
            title.x = 320 - title.textWidth / 2;
            title.y = 50;
            this.sprite.addChild(title);
        };
        CharacterChoosePage.prototype.drawSplitLine = function () {
            var splitLine = new egret.Shape();
            splitLine.graphics.lineStyle(2, 0xffffff);
            splitLine.graphics.moveTo(400, this.stageHeight);
            splitLine.graphics.lineTo(400, 130);
            splitLine.graphics.endFill();
            this.sprite.addChild(splitLine);
        };
        CharacterChoosePage.prototype.getCharacterList = function () {
            // base.API.Init("http://39.104.85.167:8105/api/");
            base.API.Init("http://39.104.85.167:8105/api/");
            var self = this;
            base.API.call('get_character_list', {}).then(function (response) {
                var _this = this;
                self.unselectedCharacterList = response['characters'];
                self.unselectedCharacterList.forEach(function (val, index, array) {
                    var unselectedCharacter = new egret.TextField();
                    unselectedCharacter.text = val;
                    unselectedCharacter.textAlign = egret.HorizontalAlign.CENTER;
                    unselectedCharacter.size = 30;
                    unselectedCharacter.lineSpacing = 10;
                    unselectedCharacter.touchEnabled = true;
                    unselectedCharacter.border = true;
                    unselectedCharacter.width = 100;
                    unselectedCharacter.borderColor = 0x00ff00;
                    unselectedCharacter.x = 70;
                    unselectedCharacter.y = 300 + index * 50;
                    unselectedCharacter.background = true;
                    unselectedCharacter.backgroundColor = 0x636363;
                    if (val.length * 18 < 100) {
                        unselectedCharacter.width = 100;
                    }
                    else {
                        unselectedCharacter.width = val.length * 18;
                    }
                    var player_score = new egret.TextField();
                    player_score.text = '';
                    player_score.size = 30;
                    player_score.border = true;
                    player_score.width = 50;
                    player_score.borderColor = 0x00ff00;
                    player_score.textAlign = egret.HorizontalAlign.CENTER;
                    var flag = 0;
                    unselectedCharacter.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                        // console.log(self.count)
                        // var confirmButton: egret.Shape = new egret.Shape();
                        // confirmButton.graphics.beginFill( 0x00cc00 );
                        // confirmButton.graphics.drawRect(0, 0, 200, 50);
                        // confirmButton.graphics.endFill();
                        // confirmButton.y = 200;
                        // confirmButton.touchEnabled = true;
                        // // this.nextTouch.bind(this.a);
                        // // this.nextTouch(a, e:event);
                        // confirmButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.addTensionScale, self);
                        // var confirmText: egret.TextField = new egret.TextField();
                        // confirmText.text = 'Confirm';
                        // confirmText.size = 30;
                        // confirmText.y = confirmButton.y + 10;
                        // self.sprite.addChild(confirmButton);
                        // self.sprite.addChild(confirmText);
                        // confirmText.visible =false
                        // confirmButton.visible =false
                        self.count++;
                        if (self.count == 1) {
                            unselectedCharacter.backgroundColor = 0x00cc00;
                            self.select_list.push(unselectedCharacter.text);
                            // unselectedCharacter.touchEnabled = false
                        }
                        else if (self.count == 2) {
                            self.select_list.push(unselectedCharacter.text);
                            unselectedCharacter.backgroundColor = 0x00cc00;
                            unselectedCharacter.touchEnabled = false;
                            self.confirmButton.x = unselectedCharacter.x;
                            self.confirmText.x = unselectedCharacter.x + 50;
                            self.confirmButton.visible = true;
                            self.confirmText.visible = true;
                        }
                        // if(self.count == 2){
                        // }else {
                        //     self.confirmButton.visible =false
                        //     self.confirmText.visible=false
                        // }
                        // if (flag == 0) {
                        //     unselectedCharacter.backgroundColor = 0x00cc00;
                        //     flag = 1;
                        //     unselectedCharacter.touchEnabled=false
                        // } else {
                        //     unselectedCharacter.backgroundColor = 0x636363;
                        //     flag = 0;
                        // }
                    }, _this);
                    function confirmButton() {
                        console.log("1231231231");
                    }
                    self.sprite.addChild(unselectedCharacter);
                });
            });
        };
        CharacterChoosePage.prototype.addTensionScale = function () {
            var self = this;
            if (this.select_list.length = 2) {
                // console.log()
                console.log(1111111111);
                base.API.Init('http://39.104.85.167:8105/api/');
                base.API.call('save_character_choose', {
                    'inviterName': self.inviter,
                    'gameSecret': self.game_secret,
                    'playerName': self.player,
                    'gameName': self.gameName,
                    'charaChooser': self.select_list
                }).then(function (response) {
                    self.timer = new egret.Timer(1000, 0);
                    self.timer.addEventListener(egret.TimerEvent.TIMER, self.getPlayerCharacterList, self);
                    self.timer.start();
                });
            }
            if (this.stage) {
                var tensionScale = new game.TensionScale(this.stageWidth, this.stageHeight, this.select_list);
                console.log(tensionScale);
                this.stage.addChild(tensionScale);
                tensionScale.x = this.stageWidth - 200;
                tensionScale.y = 180;
            }
        };
        CharacterChoosePage.prototype.onTouchBegin = function () {
            console.log(this.stage);
            if (this.stage) {
                var inviteScene = new game.CreateGame(this.stage.stageWidth, this.stage.stageHeight);
                this.stage.addChild(inviteScene);
                this.sprite.visible = false;
                this.label.visible = false;
                // this.stage.removeChild( this.sprite );
            }
        };
        CharacterChoosePage.prototype.onTouchEnd = function () {
            egret.log("onTouchEnd");
        };
        CharacterChoosePage.prototype.onTouchMove = function () {
            egret.log("onTouchMove");
        };
        CharacterChoosePage.prototype.onTouchTap = function () {
            egret.log("onTouchTap");
        };
        return CharacterChoosePage;
    }(egret.DisplayObjectContainer));
    game.CharacterChoosePage = CharacterChoosePage;
    __reflect(CharacterChoosePage.prototype, "game.CharacterChoosePage");
})(game || (game = {}));
//# sourceMappingURL=CharacterChoosePage.js.map