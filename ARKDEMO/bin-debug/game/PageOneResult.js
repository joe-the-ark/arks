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
    var PageOneResult = (function (_super) {
        __extends(PageOneResult, _super);
        function PageOneResult(game_secret, inviter, player, gameName, stageWidth, stageHeight) {
            var _this = _super.call(this) || this;
            _this.playerList = [];
            _this.game_secret = '';
            _this.player = '';
            _this.gameName = '';
            _this.inviter = '';
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            _this._touchStatus = false;
            _this._distance = new egret.Point();
            _this.characterList = [];
            _this.characterTwo = 'Fully';
            _this.characterOne = 'Insufficiently';
            _this.player_score_list = [];
            _this.player_list = [];
            _this.playerscore = 0;
            _this.middle = 0;
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
            _this.sprite.addEventListener(egret.Event.ADDED_TO_STAGE, _this.getPlayScoreList, _this);
            _this.rectShapeOne = new egret.Shape();
            _this.rectShapeTwo = new egret.Shape();
            _this.sprite.addChild(_this.rectShapeOne);
            _this.sprite.addChild(_this.rectShapeTwo);
            _this.drawRect();
            var character1 = new egret.TextField();
            character1.text = _this.characterOne;
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
            _this.timer = new egret.Timer(1000, 0);
            _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.getPlayScoreList, _this);
            _this.timer.start();
            _this.middleScore = new egret.TextField();
            _this.middleScore.textAlign = egret.HorizontalAlign.CENTER;
            _this.middleScore.size = 30;
            _this.middleScore.lineSpacing = 10;
            _this.middleScore.border = true;
            _this.middleScore.background = true;
            _this.middleScore.backgroundColor = 0x7A378B;
            _this.middleScore.borderColor = 0x00ff00;
            _this.middleScore.visible = false;
            _this.sprite.addChild(_this.middleScore);
            _this.middlePlayer = new egret.TextField();
            _this.middlePlayer.textAlign = egret.HorizontalAlign.CENTER;
            _this.middlePlayer.size = 30;
            _this.middlePlayer.lineSpacing = 10;
            _this.middlePlayer.border = true;
            _this.middlePlayer.background = true;
            _this.middlePlayer.borderColor = 0x00ff00;
            _this.middlePlayer.visible = false;
            _this.middlePlayer.backgroundColor = 0x6CA6CD;
            _this.sprite.addChild(_this.middlePlayer);
            return _this;
        }
        PageOneResult.prototype.getPlayScoreList = function () {
            var self = this;
            base.API.Init("http://127.0.0.1:8000/api/");
            base.API.call('get_player_score', { 'inviter': this.inviter, 'gameName': this.gameName, 'gameSecret': this.game_secret, 'player': this.player, 'character_one': this.characterOne, 'character_two': this.characterTwo, 'chooser': this.inviter }).then(function (response) {
                // self.middle = response['middle']
                // console.log(self.middle)
                // self.middlePlayer.text = self.player
                // var score_text = self.middle.toString() + '/' +  (self.playerscore - self.middle).toString()
                // self.middleScore.text = score_text
                // self.middleScore.width = 100
                // if(self.middlePlayer.text.length * 18 < 100){
                //     self.middlePlayer.width = 100    
                // }else {
                //     self.middlePlayer.width = self.middlePlayer.text.length  * 18
                // }
                // // let w = 100
                // // if(player_name.width > 100){
                // //     w = player_name.width
                // // }
                // self.middlePlayer.x = self.stageWidth - 250 - self.middlePlayer.width
                // self.middleScore.x = self.stageWidth-250
                // self.middlePlayer.y = self.middle * ((self.stageHeight-150-240)/81) + 240
                // self.middleScore.y = self.middlePlayer.y
                // self.middlePlayer.visible=true
                // self.middleScore.visible= true
                // self.player_list = response['player_list']
                // self.player_score_list = response['player_score_list']
                self.player_list.forEach(function (val, index, array) {
                    var player_name = new egret.TextField();
                    player_name.text = val;
                    player_name.textAlign = egret.HorizontalAlign.CENTER;
                    player_name.size = 30;
                    player_name.lineSpacing = 10;
                    player_name.touchEnabled = true;
                    player_name.border = true;
                    player_name.background = true;
                    player_name.borderColor = 0x00ff00;
                    player_name.alpha = 0.5;
                    var player_score = new egret.TextField();
                    player_score.size = 30;
                    player_score.border = true;
                    player_score.background = true;
                    player_score.borderColor = 0x00df23;
                    player_score.textAlign = egret.HorizontalAlign.CENTER;
                    player_score.alpha = 0.5;
                    if (val == self.player && index != self.player_score_list.length) {
                        self.playerscore = self.player_score_list[index];
                        player_name.backgroundColor = 0x6CA6CD;
                    }
                    else {
                        player_name.backgroundColor = 0x636363;
                    }
                    if (val.length * 18 < 100) {
                        player_name.width = 100;
                    }
                    else {
                        player_name.width = val.length * 18;
                    }
                    var w = 100;
                    if (player_name.width > 100) {
                        w = player_name.width;
                    }
                    if (index % 2 != 0) {
                        player_name.x = self.stageWidth - 250 - w;
                        player_score.x = player_name.x - 50;
                    }
                    else {
                        player_name.x = self.stageWidth - 250;
                        player_score.x = player_name.x + w;
                    }
                    var score = self.player_score_list[index];
                    player_name.y = score * ((self.stageHeight - 150 - 240) / 81) + 240;
                    self.sprite.addChild(player_name);
                    // if(index+1 == self.player_list.length){
                    //     if(player_score.parent){
                    //         self.sprite.removeChild(player_score)
                    //     }
                    // var score_text = middle.toString() + '/' +  (self.playerscore - middle).toString()
                    // console.log(score_text)
                    // let chashu = self.player_score_list[index] 
                    // player_score.text = score_text
                    // player_score.width = 100
                    // player_name.backgroundColor = 0x6CA6CD
                    // player_name.x = self.stageWidth- 250 - w
                    // player_score.x = self.stageWidth - 250
                    // self.sprite.addChild(player_score)
                    // }else{
                    player_score.text = self.player_score_list[index];
                    player_score.width = 50;
                    player_score.y = player_name.y;
                    player_score.backgroundColor = 0xFF7F24;
                    self.sprite.addChild(player_score);
                    // }
                });
            });
        };
        PageOneResult.prototype.closeTip = function () {
            if (this.tiptext.parent) {
                this.removeChild(this.tiptext);
            }
        };
        PageOneResult.prototype.nextTouch = function () {
            // conset_player_scoreole.log(this.sprite.numChildren-this.playerList.length-4)
            // var scoreCounts = this.sprite.numChildren-this.playerList.length-4
            // if(this.playerList.length == scoreCounts){
            if (this.stage) {
                var game_secret = this.game_secret;
                var inviter = this.inviter;
                var player = this.player;
                var gameName = this.gameName;
                var stageWidth = this.stageWidth;
                var stageHeight = this.stageHeight;
                var count = 0;
                // base.API.Init("http://127.0.0.1:8000/api/");
                // base.API.call('get_choose_list', {})
                // this.characterList = {'zjy':['Loyality', 'Joy'], '1':['Power', 'Courage'], '2':['Harmony', 'Disruption']}
                this.characterList = [['zjy', '1', '2'], [['Loyality', 'Joy'], ['Power', 'Courage'], ['Harmony', 'Disruption']]];
                var charater = new game.Character(game_secret, inviter, player, gameName, stageWidth, stageHeight, count, this.characterList);
                this.stage.addChild(charater);
                this.sprite.visible = false;
                this.tiptext.text = '';
                this.removeChild(this.rightIcon);
                this.removeChild(this.closeIcon);
            }
            // }else{
            //     this.addChild(this.tiptext)
            //     this.tip(100, 100, 'Everyont must be graded!')
            // }
        };
        PageOneResult.prototype.tip = function (width, height, msg, size) {
            var tiptext = this.tiptext;
            tiptext.x = width;
            tiptext.y = height;
            tiptext.text = msg;
            tiptext.size = size;
            tiptext.width = this.stageWidth;
        };
        PageOneResult.prototype.drawRect = function () {
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
        PageOneResult.prototype.initGraphics = function () {
            var shape = this._shape;
            shape.graphics.lineStyle(2, 0xff00ff);
            shape.graphics.moveTo(this.stageWidth - 250, this.stageHeight - 150);
            shape.graphics.lineTo(this.stageWidth - 250, 240);
        };
        PageOneResult.prototype.initCharacter = function (cx, cy) {
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
        PageOneResult.prototype.onTouchEnd = function () {
            egret.log("onTouchEnd");
        };
        PageOneResult.prototype.onTouchMove = function () {
            egret.log("onTouchMove");
        };
        PageOneResult.prototype.onTouchTap = function () {
            egret.log("onTouchTap");
        };
        return PageOneResult;
    }(egret.DisplayObjectContainer));
    game.PageOneResult = PageOneResult;
    __reflect(PageOneResult.prototype, "game.PageOneResult");
})(game || (game = {}));
