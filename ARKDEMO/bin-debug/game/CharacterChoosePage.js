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
        function CharacterChoosePage(stageWidth, stageHeight) {
            var _this = _super.call(this) || this;
            _this.unselectedCharacterList = [];
            _this.selectedChaeacterList = [];
            _this.game_secret = '';
            _this.gameName = '';
            _this.inviter = '';
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            _this.count = 0;
            _this._touchStatus = false;
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            _this.addChild(_this.sprite);
            _this.sprite.touchEnabled = true;
            _this.titleBackground = new egret.Shape();
            _this.sprite.addChild(_this.titleBackground);
            _this.drawTitleBackground();
            _this.createTitle();
            _this.getCharacterList();
            _this.drawSplitLine();
            _this.addTensionScale();
            return _this;
        }
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
            base.API.Init("http://127.0.0.1:8000/api/");
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
                        if (flag == 0) {
                            unselectedCharacter.backgroundColor = 0x00cc00;
                            flag = 1;
                            self.count++;
                            if (self.count >= 2) {
                                var confirmButton_1 = new egret.Shape();
                                confirmButton_1.graphics.beginFill(0x00cc00);
                                confirmButton_1.graphics.drawRect(0, 0, 200, 50);
                                confirmButton_1.graphics.endFill();
                                confirmButton_1.x = unselectedCharacter.x;
                                confirmButton_1.y = 200;
                                confirmButton_1.touchEnabled = true;
                                // this.nextTouch.bind(this.a);
                                // this.nextTouch(a, e:event);
                                confirmButton_1.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.addTensionScale, self);
                                self.sprite.addChild(confirmButton_1);
                                var confirmText = new egret.TextField();
                                confirmText.text = 'Confirm';
                                confirmText.size = 30;
                                confirmText.x = unselectedCharacter.x + 50;
                                confirmText.y = confirmButton_1.y + 10;
                                self.sprite.addChild(confirmText);
                            }
                        }
                        else if (flag == 1) {
                            unselectedCharacter.backgroundColor = 0x636363;
                            flag = 0;
                            self.count--;
                        }
                    }, _this);
                    function confirmButton() {
                        console.log("1231231231");
                    }
                    self.sprite.addChild(unselectedCharacter);
                });
            });
        };
        CharacterChoosePage.prototype.addTensionScale = function () {
            var tensionScale = new game.TensionScale(60, 40);
            tensionScale.x = this.stageWidth - 165;
            tensionScale.y = 180;
            this.sprite.addChild(tensionScale);
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