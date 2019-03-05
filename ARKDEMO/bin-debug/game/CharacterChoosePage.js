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
            _this.playerList = [];
            _this.flag1 = 0;
            _this.flag2 = 0;
            _this.characterList = [];
            _this.allcharacterlist = [];
            _this.chooseText = [];
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
            _this.confirmButton.y = 230;
            _this.confirmButton.x = 100;
            _this.confirmButton.touchEnabled = true;
            // this.nextTouch.bind(this.a);
            // this.nextTouch(a, e:event);
            _this.confirmButton.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.addTensionScale, _this);
            _this.confirmText = new egret.TextField();
            _this.confirmText.text = 'Confirm';
            _this.confirmText.size = 30;
            _this.confirmText.x = _this.confirmButton.x + 50;
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
            _this.rightIcon.touchEnabled = true;
            _this.rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.rightNext, _this);
            _this.chooseone = new egret.TextField;
            _this.chooseone.textAlign = egret.HorizontalAlign.CENTER;
            _this.chooseone.textAlign = egret.VerticalAlign.MIDDLE;
            _this.chooseone.size = 30;
            _this.chooseone.text = 'point & click';
            _this.chooseone.lineSpacing = 10;
            _this.chooseone.border = true;
            _this.chooseone.width = 190;
            _this.chooseone.borderColor = 0x3A5FCD;
            _this.chooseone.height = 40;
            _this.chooseone.y = 170;
            _this.chooseone.touchEnabled = true;
            _this.chooseone.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchone, _this);
            _this.sprite.addChild(_this.chooseone);
            _this.choosetwo = new egret.TextField;
            _this.choosetwo.textAlign = egret.HorizontalAlign.CENTER;
            _this.chooseone.textAlign = egret.VerticalAlign.BOTTOM;
            _this.choosetwo.size = 30;
            _this.choosetwo.lineSpacing = 10;
            _this.choosetwo.text = 'point & click';
            _this.choosetwo.border = true;
            _this.choosetwo.width = 190;
            _this.choosetwo.borderColor = 0x3A5FCD;
            _this.choosetwo.height = 40;
            _this.choosetwo.y = 170;
            _this.choosetwo.x = 210;
            _this.choosetwo.touchEnabled = true;
            _this.choosetwo.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchtwo, _this);
            _this.sprite.addChild(_this.choosetwo);
            _this.timer = new egret.Timer(1000, 0);
            _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.getPlayerCharacterList, _this);
            _this.timer.start();
            return _this;
        }
        CharacterChoosePage.prototype.touchone = function () {
            if (this.chooseText[0]) {
                this.chooseone.text = '';
                var selectedCharacter = new egret.TextField();
                selectedCharacter.text = this.chooseText[0];
                selectedCharacter.textAlign = egret.HorizontalAlign.CENTER;
                selectedCharacter.size = 30;
                selectedCharacter.lineSpacing = 10;
                // selectedCharacter.touchEnabled = true
                selectedCharacter.border = true;
                selectedCharacter.width = this.chooseone.width;
                selectedCharacter.height = this.chooseone.height;
                selectedCharacter.background = true;
                selectedCharacter.borderColor = 0x636363;
                selectedCharacter.backgroundColor = 0x7171C6;
                selectedCharacter.x = this.chooseone.x;
                selectedCharacter.y = this.chooseone.y;
                this.sprite.addChild(selectedCharacter);
            }
        };
        CharacterChoosePage.prototype.touchtwo = function () {
            if (this.chooseText[1]) {
                this.choosetwo.text = '';
                var selectedCharacter = new egret.TextField();
                selectedCharacter.text = this.chooseText[1];
                selectedCharacter.textAlign = egret.HorizontalAlign.CENTER;
                selectedCharacter.size = 30;
                selectedCharacter.lineSpacing = 10;
                // selectedCharacter.touchEnabled = true
                selectedCharacter.border = true;
                selectedCharacter.width = this.choosetwo.width;
                selectedCharacter.height = this.choosetwo.height;
                selectedCharacter.background = true;
                selectedCharacter.borderColor = 0x636363;
                selectedCharacter.backgroundColor = 0x7171C6;
                selectedCharacter.x = this.choosetwo.x;
                selectedCharacter.y = this.choosetwo.y;
                this.sprite.addChild(selectedCharacter);
                this.confirmButton.visible = true;
                this.confirmText.visible = true;
            }
        };
        CharacterChoosePage.prototype.rightNext = function () {
            var self = this;
            base.API.Init("http://39.104.85.167:8105/api/");
            base.API.call('save_players_process', {
                'inviter_name': self.inviter,
                'game_secret': self.game_secret,
                'player': self.player,
                'game_name': self.gameName,
                'process': '3.0'
            }).then(function (response) {
                if (self.stage) {
                    var game_secret = self.game_secret;
                    var inviter = self.inviter;
                    var player = self.player;
                    var gameName = self.gameName;
                    var stageWidth = self.stageWidth;
                    var stageHeight = self.stageHeight;
                    var count = 0;
                    var charater = new game.Character(game_secret, inviter, player, gameName, stageWidth, stageHeight, count, self.characterList);
                    self.stage.addChild(charater);
                    self.sprite.visible = false;
                    self.rightIcon.visible = false;
                }
            });
        };
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
                character_list.forEach(function (val, index, array) {
                    var player_name = val[0];
                    if (self.playerList.indexOf(player_name) == -1) {
                        self.count++;
                        var tensionScale = new game.TensionScale(self.stageWidth, self.stageHeight, val[1], 0);
                        self.allcharacterlist.push(val[1]);
                        self.sprite.addChild(tensionScale);
                        tensionScale.x = self.stageWidth - 200;
                        tensionScale.y = self.count * 150;
                        self.playerList.push(player_name);
                    }
                });
                if (self.count == self.playerCount) {
                    self.characterList.push(self.playerList);
                    self.characterList.push(self.allcharacterlist);
                    self.addChild(self.rightIcon);
                    self.timer.stop();
                }
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
            shape1.graphics.beginFill(0xff0000, 0.5);
            shape1.graphics.drawRect(0, 0, this.stageWidth, 130);
            shape1.graphics.endFill();
        };
        CharacterChoosePage.prototype.createTitle = function () {
            var title = new egret.TextField();
            title.text = "Task: SCREEN through the list and name the TWOSOMES of formative tensions that unite, seperate and define the organizing dynamics in your team.";
            title.size = 30;
            title.width = this.stageWidth;
            title.x = 320 - title.textWidth / 2;
            title.y = 10;
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
                    var flag = 0; //0：未被点击 1：已点击
                    unselectedCharacter.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                        if (flag == 0) {
                        }
                        if (self.chooseText.length == 2) {
                            // unselectedCharacter.touchEnabled = false
                            self.chooseText.pop();
                            self.chooseText.push(unselectedCharacter.text);
                            self.select_list.push(unselectedCharacter.text);
                        }
                        else {
                            self.chooseText.push(unselectedCharacter.text);
                            self.select_list.push(unselectedCharacter.text);
                            unselectedCharacter.backgroundColor = 0x00ff00;
                            unselectedCharacter.alpha = 0.4;
                            unselectedCharacter.touchEnabled = false;
                        }
                    }, _this);
                    // unselectedCharacter.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e) => {
                    //     self._touchStatus = true;
                    //     var dx = e.stageX
                    //     var px = unselectedCharacter.x
                    //     var py = unselectedCharacter.y
                    //     var dy = e.stageY
                    //     // unselectedCharacter.width = w * 2
                    //     // unselectedCharacter.height = h * 2
                    //     if(self.flag1 != 1 || self.flag2 != 1){
                    //         unselectedCharacter.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e) =>{
                    //             if(self._touchStatus){
                    //                 unselectedCharacter.x = e.stageX - dx + px;
                    //                 unselectedCharacter.y = e.stageY - dy + py
                    //                 // unselectedCharacter.x = e.stageX
                    //                 // unselectedCharacter.y = e.stageY
                    //             }
                    //             if(unselectedCharacter.y < 185 && unselectedCharacter.y >170 && unselectedCharacter.x > 0 && unselectedCharacter.x <80){
                    //                 if(self.flag1 == 1){
                    //                     console.log('already have')
                    //                 }else {
                    //                     self.flag1 = 1
                    //                 }
                    //                 unselectedCharacter.touchEnabled = false
                    //                 self.select_list.push(unselectedCharacter.text)
                    //                 self.chooseone.text = ''
                    //                 if(self.flag1 ==1 && self.flag2 == 1) {
                    //                     self.confirmText.visible = true
                    //                     self.confirmButton.visible =true
                    //                 }
                    //             }
                    //             else if(unselectedCharacter.y < 185 && unselectedCharacter.y >170 && unselectedCharacter.x > 210 && unselectedCharacter.x <280){
                    //                 if(self.flag2 == 1){
                    //                     console.log('already have')
                    //                 }else {
                    //                     self.flag2 = 1
                    //                 }
                    //                 unselectedCharacter.touchEnabled = false
                    //                 self.select_list.push(unselectedCharacter.text)
                    //                 self.choosetwo.text = ''
                    //                 if(self.flag1 ==1 && self.flag2 == 1) {
                    //                     self.confirmText.visible = true
                    //                     self.confirmButton.visible =true
                    //                 }
                    //             }
                    //         }, this)
                    //     }else if(self.flag1 ==1 && self.flag2 == 1) {
                    //         self.confirmText.visible = true
                    //         self.confirmButton.visible =true
                    //     }
                    // }, this)
                    // unselectedCharacter.addEventListener(egret.TouchEvent.TOUCH_END, (e) => {
                    //     self._touchStatus = false;
                    //     // unselectedCharacter.width = w
                    //     // unselectedCharacter.height = h
                    //     unselectedCharacter.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
                    // }, this);
                    self.sprite.addChild(unselectedCharacter);
                });
            });
        };
        CharacterChoosePage.prototype.addTensionScale = function () {
            var self = this;
            if (this.select_list.length = 2) {
                base.API.Init('http://39.104.85.167:8105/api/');
                base.API.call('save_character_choose', {
                    'inviterName': self.inviter,
                    'gameSecret': self.game_secret,
                    'playerName': self.player,
                    'gameName': self.gameName,
                    'charaChooser': self.select_list
                }).then(function (response) {
                    self.confirmButton.touchEnabled = false;
                });
            }
            if (this.stage) {
                var tensionScale = new game.TensionScale(this.stageWidth, this.stageHeight, this.select_list, 0);
                console.log(tensionScale);
                this.sprite.addChild(tensionScale);
                tensionScale.x = this.stageWidth - 200;
                tensionScale.y = (this.count + 1) * 150;
            }
        };
        CharacterChoosePage.prototype.onTouchBegin = function () {
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