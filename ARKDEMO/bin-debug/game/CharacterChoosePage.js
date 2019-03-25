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
            _this.playerCharacterList = [];
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
            _this.drawSplitLine();
            // this.addTensionScale();
            _this.getCharacterList();
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
            var probessBar = new game.ProcessBar(stageWidth, stageHeight, 20, 'Mission 1 > Tension Scales');
            _this.sprite.addChild(probessBar);
            return _this;
            // this.createChildren()
            // this.createScrollableCharacterList()
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
            base.API.Init("http://127.0.0.1:8000/api/");
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
                    var player_1 = self.player;
                    var gameName = self.gameName;
                    var stageWidth = self.stageWidth;
                    var stageHeight = self.stageHeight;
                    var count = 0;
                    self.characterList.push(self.playerList);
                    self.characterList.push(self.allcharacterlist);
                    console.log('22222222');
                    console.log(self.characterList);
                    // [['1', '2'], [[c1,c2],[c1,c2]]]
                    console.log('111111111');
                    self.timer.stop();
                    var playerAndOthersCharacterList_1 = [];
                    // ['1', [c1, c2], [['2', '3'], [[c1, c2], [c1, c2]]]
                    var otherCharacterList = [];
                    var othersList_1 = [];
                    var characterList_1 = [];
                    self.playerList.forEach(function (val, index, array) {
                        if (val == player_1) {
                            playerAndOthersCharacterList_1.push(val);
                            playerAndOthersCharacterList_1.push(self.allcharacterlist[index]);
                        }
                        else {
                            othersList_1.push(val);
                            characterList_1.push(self.allcharacterlist[index]);
                        }
                    });
                    otherCharacterList.push(othersList_1);
                    otherCharacterList.push(characterList_1);
                    playerAndOthersCharacterList_1.push(otherCharacterList);
                    console.log(playerAndOthersCharacterList_1);
                    var charater = new game.Character(game_secret, inviter, player_1, gameName, stageWidth, stageHeight, count, self.characterList, playerAndOthersCharacterList_1);
                    self.stage.addChild(charater);
                    self.sprite.visible = false;
                    self.rightIcon.visible = false;
                }
            });
        };
        CharacterChoosePage.prototype.getPlayerCharacterList = function () {
            var self = this;
            base.API.Init("http://127.0.0.1:8000/api/");
            base.API.call('get_player_characterlist', {
                'game_secret': self.game_secret,
                'inviter': self.inviter,
                'player': self.player,
                'gameName': self.gameName,
            }).then(function (response) {
                var character_list = response['data'];
                console.log(character_list);
                character_list.forEach(function (val, index, array) {
                    var player_name = val[0];
                    //如果玩家已选择scale
                    if (player_name == self.player) {
                        self.select_list = val[1];
                        console.log(self.select_list);
                        self.sprite.addChild(self.rightIcon);
                        self.playerCharacterList = val[1];
                    }
                    if (self.playerList.indexOf(player_name) == -1) {
                        self.count++;
                        var tensionScale = new game.TensionScale(self.stageWidth, self.stageHeight, val[1], 0, 0, 0, 0);
                        self.allcharacterlist.push(val[1]);
                        self.sprite.addChild(tensionScale);
                        tensionScale.x = self.stageWidth - 200;
                        tensionScale.y = self.count * 150;
                        self.playerList.push(player_name);
                    }
                });
                // if (self.count == self.playerCount) {
                // self.characterList.push(self.playerList)
                // self.characterList.push(self.allcharacterlist)
                // }
            });
        };
        CharacterChoosePage.prototype.drawTitleBackground = function () {
            var shape1 = this.titleBackground;
            shape1.graphics.beginFill(0x359f93, 0.5);
            shape1.graphics.drawRect(0, 0, this.stageWidth, 130);
            shape1.graphics.endFill();
        };
        CharacterChoosePage.prototype.createTitle = function () {
            var title = new egret.TextField();
            title.text = "Task: screen through the list and name the twosomes of formative tensions that unite, seperate and define the organizing dynamics in your team.";
            title.size = 25;
            title.width = this.stageWidth;
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
                    unselectedCharacter.width = 100;
                    unselectedCharacter.border = true;
                    unselectedCharacter.borderColor = 0x00ff00;
                    unselectedCharacter.x = 50;
                    unselectedCharacter.y = 300 + index * 50;
                    unselectedCharacter.background = true;
                    unselectedCharacter.backgroundColor = 0x636363;
                    self.sprite.addChild(unselectedCharacter);
                    // console.log('222222222222222')
                    // console.log(self.select_list.length)
                    // console.log('222222222222222')
                    // if(self.select_list.length == 2){
                    //     self.chooseone.text = self.select_list[0]
                    //     self.choosetwo.text = self.select_list[1]
                    // }
                    // else {
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
                    unselectedCharacter.addEventListener(egret.TouchEvent.TOUCH_BEGIN, function (e) {
                        self._touchStatus = true;
                        var dx = e.stageX;
                        var px = unselectedCharacter.x;
                        var py = unselectedCharacter.y;
                        var dy = e.stageY;
                        // unselectedCharacter.width = w * 2
                        // unselectedCharacter.height = h * 2
                        if (self.flag1 != 1 || self.flag2 != 1) {
                            unselectedCharacter.addEventListener(egret.TouchEvent.TOUCH_MOVE, function (e) {
                                if (self._touchStatus) {
                                    unselectedCharacter.x = e.stageX - dx + px;
                                    unselectedCharacter.y = e.stageY - dy + py;
                                    // unselectedCharacter.x = e.stageX
                                    // unselectedCharacter.y = e.stageY
                                }
                                if (unselectedCharacter.y < 185 && unselectedCharacter.y > 170 && unselectedCharacter.x > 0 && unselectedCharacter.x < 80) {
                                    if (self.flag1 == 1) {
                                        console.log('already have');
                                    }
                                    else {
                                        self.flag1 = 1;
                                    }
                                    unselectedCharacter.touchEnabled = false;
                                    self.select_list.push(unselectedCharacter.text);
                                    self.chooseone.text = '';
                                    if (self.flag1 == 1 && self.flag2 == 1) {
                                        self.confirmText.visible = true;
                                        self.confirmButton.visible = true;
                                    }
                                }
                                else if (unselectedCharacter.y < 185 && unselectedCharacter.y > 170 && unselectedCharacter.x > 210 && unselectedCharacter.x < 280) {
                                    if (self.flag2 == 1) {
                                        console.log('already have');
                                    }
                                    else {
                                        self.flag2 = 1;
                                    }
                                    unselectedCharacter.touchEnabled = false;
                                    self.select_list.push(unselectedCharacter.text);
                                    self.choosetwo.text = '';
                                    if (self.flag1 == 1 && self.flag2 == 1) {
                                        self.confirmText.visible = true;
                                        self.confirmButton.visible = true;
                                    }
                                }
                            }, _this);
                        }
                        else if (self.flag1 == 1 && self.flag2 == 1) {
                            self.confirmText.visible = true;
                            self.confirmButton.visible = true;
                        }
                    }, _this);
                    unselectedCharacter.addEventListener(egret.TouchEvent.TOUCH_END, function (e) {
                        self._touchStatus = false;
                        // unselectedCharacter.width = w
                        // unselectedCharacter.height = h
                        unselectedCharacter.removeEventListener(egret.TouchEvent.TOUCH_MOVE, _this.mouseMove, _this);
                    }, _this);
                    // }
                });
            });
        };
        //     private list: eui.List;
        //     protected createScrollableCharacterList() {
        //         let group = new eui.Group()
        //         let exml = `
        //         <e:Skin xmlns:e="http://ns.egret.com/eui" states="up,down" height="50">
        //             <e:Label text="{data}" textColor.down="0xFFFFFF" textColor.up="0x666666" horizontalCenter="0" verticalCenter="0"/> 
        //         </e:Skin>`;
        //         let list = new eui.List()
        //         list.dataProvider = new eui.ArrayCollection([
        //             "accuracy", "adventurousness", "altruism",
        //             "ambition", "autonomy", "avant-garde",
        //             "beauty", "carefulness", "change",
        //             "commitment", "companionship", "composure",
        //             "connectedness", "control", "conviviality",
        //             "cordiality", "courage", "creativity",
        //             "curative", "curiosity", "development",
        //             "dirruption", "dominance", "economy",
        //             "efficiency", "effort", "effortlessness",
        //             "ego", "elitism", "enforcement",
        //             "fairness", "family", "fantasy",
        //             "fighting", "flexibility", "freedom",
        //             "generosity", "glory", "harmony",
        //             "health", "honor", "humanity",
        //             "humor", "invasiveness", "joy",
        //             "learning", "logic", "loyalty",
        //             "mindfulness", "narcissism", "nostalgia",
        //             "obedience", "openness", "originality",
        //             "pain", "passion", "patience",
        //             "performance", "persistence", "pleasure",
        //             "power", "pride", "purity",
        //             "quality", "rank", "reliability",
        //             "responsibility", "role", "security",
        //             "sensuality", "spontaneity", "submission",
        //             "sustainability", "thrill", "tolerance",
        //             "tradition", "trust", "truth", "winning"])
        //         list.itemRendererSkinName = exml
        //         list.allowMultipleSelection = true
        //         group.addChild(list)
        //         this.list = list
        //         list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChange, this)
        //         let myScroller = new eui.Scroller()
        //         myScroller.width = 300
        //         myScroller.height = 700
        //         myScroller.x = 75
        //         myScroller.y = 300
        //         myScroller.viewport = group
        //         this.sprite.addChild(myScroller)
        //     }
        //     private onChange(e: eui.PropertyEvent): void {
        //         // 获取点击消息
        //         console.log('已选中的性格：' + this.list.selectedItems)
        //         if (this.list.selectedItems.length == 2) {
        //             this.list.touchEnabled = false
        //             // this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChange, this)
        //             console.log('当前选中的索引列表长度：' + this.list.selectedIndices.length)
        //             // this.list.allowMultipleSelection = false
        //         }
        //     }
        //     private onTouchCancel(e: eui.PropertyEvent): void {
        //         if (this.list.selectedItem.length >= 2) {
        //             this.list.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onChange, this)
        //         }
        //     }
        CharacterChoosePage.prototype.addTensionScale = function () {
            var self = this;
            if (this.select_list.length = 2) {
                base.API.Init('http://127.0.0.1:8000/api/');
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
                var tensionScale = new game.TensionScale(this.stageWidth, this.stageHeight, this.select_list, 0, 0, 0, 0);
                console.log(tensionScale);
                this.sprite.addChild(tensionScale);
                tensionScale.x = this.stageWidth - 200;
                tensionScale.y = (this.count + 1) * 150;
            }
        };
        return CharacterChoosePage;
    }(egret.DisplayObjectContainer));
    game.CharacterChoosePage = CharacterChoosePage;
    __reflect(CharacterChoosePage.prototype, "game.CharacterChoosePage");
})(game || (game = {}));
//# sourceMappingURL=CharacterChoosePage.js.map