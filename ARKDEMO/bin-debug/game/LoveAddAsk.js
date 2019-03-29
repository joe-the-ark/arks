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
    var LoveAddAsk = (function (_super) {
        __extends(LoveAddAsk, _super);
        function LoveAddAsk(stageWidth, stageHeight, count, simulatedData, player, inviter, game_secret, gameName) {
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
            _this.playerName = "";
            _this.simulatedData = [];
            _this.player_list = [];
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            _this.addChild(_this.sprite);
            // this.playerName = playerName
            _this.count = count;
            _this.simulatedData = simulatedData;
            _this.player = player;
            _this.inviter = inviter;
            _this.game_secret = game_secret;
            _this.gameName = gameName;
            _this.rightIcon = new egret.Bitmap(RES.getRes('right_png'));
            _this.rightIcon.width = 100;
            _this.rightIcon.height = 100;
            _this.rightIcon.anchorOffsetX = _this.rightIcon.width / 2;
            _this.rightIcon.anchorOffsetY = _this.rightIcon.height / 2;
            _this.rightIcon.x = stageWidth - 50;
            _this.rightIcon.y = stageHeight - 100;
            _this.rightIcon.touchEnabled = true;
            _this.rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.rightNext, _this);
            _this.sprite.addChild(_this.rightIcon);
            _this.processBar();
            _this.notice();
            _this.love();
            _this.loveInput();
            _this.add();
            _this.addInput();
            _this.ask();
            _this.askInput();
            _this.tensionScale();
            _this.initData();
            return _this;
        }
        LoveAddAsk.prototype.rightNext = function () {
            if (this.loveInputText.text != '' && this.addInputText.text != '' && this.askInputText.text != '') {
                var self_1 = this;
                base.API.Init("http://work.metatype.cn:8105/api/");
                base.API.call('push_feedback', {
                    'game_secret': self_1.game_secret,
                    'gameName': self_1.gameName,
                    'player': self_1.player,
                    'inviter': self_1.inviter,
                    'love': self_1.loveInputText.text,
                    'add': self_1.addInputText.text,
                    'ask': self_1.askInputText.text,
                    'teammate': self_1.playerName
                }).then(function (response) {
                    var count = this.count + 1;
                    var preview = new game.Preview(self_1.stageWidth, self_1.stageHeight);
                    self_1.stage.addChild(preview);
                    self_1.sprite.visible = false;
                });
            }
            else {
                alert('Please fill in all the feedback boards.');
            }
        };
        LoveAddAsk.prototype.initData = function () {
            var self = this;
            base.API.Init("http://work.metatype.cn:8105/api/");
            base.API.call('get_players', {
                'inviter': self.inviter,
                'game_secret': self.game_secret,
                'gameName': self.gameName,
                'player': self.player
            }).then(function (response) {
                var result = response['result'];
                console.log(result);
                self.player_list = result;
                self.playerName = self.player_list[self.count];
                self.noticeBox.text = "Feedback time for " + self.playerName + "\nLook at the basic integrative powers & tensions as a basis for ANONYMOUS feedback. What do you LOVE about her as a teammate, what could she ADD and did you always wanted to ask her? Take 1 minute per question, write fast & from the heart.";
            });
        };
        LoveAddAsk.prototype.processBar = function () {
            var processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 10, "Mission 2 > Love, Add, Ask");
            this.sprite.addChild(processBar);
        };
        LoveAddAsk.prototype.notice = function () {
            this.noticeBox = new egret.TextField();
            this.noticeBox.text = "Feedback time for " + this.playerName + "\nLook at the basic integrative powers & tensions as a basis for ANONYMOUS feedback. What do you LOVE about her as a teammate, what could she ADD and did you always wanted to ask her? Take 1 minute per question, write fast & from the heart.";
            this.noticeBox.textColor = 0x000000;
            this.noticeBox.width = this._width;
            this.noticeBox.x = this._x;
            this.noticeBox.y = 60;
            this.noticeBox.background = true;
            this.noticeBox.backgroundColor = 0xffcc33;
            this.sprite.addChild(this.noticeBox);
        };
        LoveAddAsk.prototype.love = function () {
            var love = new egret.TextField();
            love.text = "LOVE";
            love.size = 40;
            love.x = this._x;
            love.y = this.noticeBox.height + 80;
            this.sprite.addChild(love);
            var sentence = new egret.TextField();
            sentence.text = "I love this person, \nbecause...";
            sentence.size = 20;
            sentence.x = this._x;
            sentence.y = this.noticeBox.height + 130;
            sentence.width = 100;
            this.sprite.addChild(sentence);
        };
        LoveAddAsk.prototype.loveInput = function () {
            this.loveInputText = new egret.TextField();
            this.loveInputText.type = egret.TextFieldType.INPUT;
            this.loveInputText.inputType = egret.TextFieldInputType.TEXT;
            this.loveInputText.width = 250;
            this.loveInputText.height = 250;
            this.loveInputText.x = this._x + 120;
            this.loveInputText.y = this.noticeBox.height + 60 + this._margin;
            this.loveInputText.textColor = 0x0d0d0d;
            this.loveInputText.size = 20;
            this.loveInputText.border = true;
            this.loveInputText.borderColor = 0x000000;
            this.loveInputText.multiline = true;
            this.sprite.addChild(this.loveInputText);
        };
        LoveAddAsk.prototype.add = function () {
            var add = new egret.TextField();
            add.text = "ADD";
            add.size = 40;
            add.x = this._x;
            add.y = this.noticeBox.height + 100 + 250;
            this.sprite.addChild(add);
            var sentence = new egret.TextField();
            sentence.text = "I would love this person even more, if...";
            sentence.size = 20;
            sentence.x = this._x;
            sentence.y = this.noticeBox.height + 130 + 250 + this._margin;
            sentence.width = 100;
            this.sprite.addChild(sentence);
        };
        LoveAddAsk.prototype.addInput = function () {
            this.addInputText = new egret.TextField();
            this.addInputText.type = egret.TextFieldType.INPUT;
            this.addInputText.inputType = egret.TextFieldInputType.TEXT;
            this.addInputText.width = 250;
            this.addInputText.height = 250;
            this.addInputText.x = this._x + 120;
            this.addInputText.y = this.noticeBox.height + 60 + this._margin * 2 + 250;
            this.addInputText.textColor = 0x0d0d0d;
            this.addInputText.size = 20;
            this.addInputText.border = true;
            this.addInputText.borderColor = 0x000000;
            this.addInputText.multiline = true;
            this.sprite.addChild(this.addInputText);
        };
        LoveAddAsk.prototype.ask = function () {
            var ask = new egret.TextField();
            ask.text = "ASK";
            ask.size = 40;
            ask.x = this._x;
            ask.y = this.noticeBox.height + 120 + 500;
            this.sprite.addChild(ask);
            var sentence = new egret.TextField();
            sentence.text = "I always wanted to ask you...";
            sentence.size = 20;
            sentence.x = this._x;
            sentence.y = this.noticeBox.height + 130 + 500 + this._margin * 2;
            sentence.width = 100;
            this.sprite.addChild(sentence);
        };
        LoveAddAsk.prototype.askInput = function () {
            this.askInputText = new egret.TextField();
            this.askInputText.type = egret.TextFieldType.INPUT;
            this.askInputText.inputType = egret.TextFieldInputType.TEXT;
            this.askInputText.width = 250;
            this.askInputText.height = 250;
            this.askInputText.x = this._x + 120;
            this.askInputText.y = this.noticeBox.height + 60 + this._margin * 3 + 500;
            this.askInputText.textColor = 0x0d0d0d;
            this.askInputText.size = 20;
            this.askInputText.border = true;
            this.askInputText.borderColor = 0x000000;
            this.askInputText.multiline = true;
            this.sprite.addChild(this.askInputText);
            // base.API.Init("http://127.0.0.1:8000/api/")
            // base.API.Init("http://work.metatype.cn:8105/api/");
            // base.API.call("push_feedback", {"game_secret": this.game_secret, "gameName": this.gameName, "player": this.player, "inviter_name": this.inviter, "love": this.love, "add": this.add, "ask": this.ask, "teammate": this.playerName}).then(function (response) {
            //     askInput.addEventListener(egret.FocusEvent.FOCUS_OUT, this.pushFeedback, this)
            // }).catch(function (err) {
            //     console.log(err)
            // })
        };
        LoveAddAsk.prototype.pushFeedback = function () {
            console.log('123');
        };
        LoveAddAsk.prototype.tensionScale = function () {
            var _this = this;
            this.simulatedData.forEach(function (val, index, array) {
                var character1 = val[0];
                var character2 = val[1];
                var middle_score = Number(val[2].toString());
                var player_score = Number(val[3].toString());
                var absoluteValueOfDeviation = Math.abs(player_score - middle_score);
                var individualTensionScaleMedian = middle_score;
                var teamTensionScaleMedian = 0;
                var tensionScale = new game.TensionScale(100, 60, [val[0], val[1]], absoluteValueOfDeviation, player_score, teamTensionScaleMedian, individualTensionScaleMedian);
                tensionScale.x = 420;
                tensionScale.y = _this.noticeBox.height + 210 + _this._margin + (index - 1) * 150;
                _this.sprite.addChild(tensionScale);
            });
        };
        return LoveAddAsk;
    }(egret.DisplayObjectContainer));
    game.LoveAddAsk = LoveAddAsk;
    __reflect(LoveAddAsk.prototype, "game.LoveAddAsk");
})(game || (game = {}));
//# sourceMappingURL=LoveAddAsk.js.map