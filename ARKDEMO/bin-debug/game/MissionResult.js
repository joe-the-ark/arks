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
    var MissionResult = (function (_super) {
        __extends(MissionResult, _super);
        function MissionResult(stageWidth, stageHeight, inviter, game_secret, player, gameName, characterListParams) {
            var _this = _super.call(this) || this;
            _this.game_secret = '';
            _this.gameName = '';
            _this.inviter = '';
            _this.player = '';
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            _this.characterListParams = [];
            _this.simulatedData = [];
            _this.ttsms = [];
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.player = player;
            _this.gameName = gameName;
            _this.game_secret = game_secret;
            _this.inviter = inviter;
            _this.characterListParams = characterListParams;
            _this.sprite = new egret.Sprite();
            _this.addChild(_this.sprite);
            _this.drawTitle();
            // this.drawLine()
            _this.drawResult();
            _this._shape = new egret.Shape();
            _this.addChild(_this._shape);
            _this._shape.alpha = 0.5;
            var probessBar = new game.ProcessBar(stageWidth, stageHeight, 100, 'Mission 1 > ZORA Map');
            _this.sprite.addChild(probessBar);
            console.log('ttsmsstart3:');
            console.log(_this.ttsms);
            console.log('ttsmsend3:');
            return _this;
        }
        MissionResult.prototype.getTTSMS = function () {
            var self = this;
            base.API.Init("http://39.104.85.167:8105/api/");
            base.API.call('get_ttsm', {
                'characterListParams': self.characterListParams,
                'inviter': self.inviter,
                'gameSecret': self.game_secret,
                'player': self.player,
                'gameName': self.gameName,
            }).then(function (response) {
                var result = response['result'];
                self.ttsms = result;
                console.log('ttsmsstart1:');
                console.log(self.ttsms);
                console.log('ttsmsend1:');
            });
        };
        MissionResult.prototype.initGraphics = function () {
            var shape = this._shape;
            shape.graphics.lineStyle(2, 0xFAFAD2);
            shape.graphics.moveTo(this.stageWidth / 2, this.stageHeight);
            shape.graphics.lineTo(this.stageWidth / 2, 130);
            var buffer = this._shape;
            buffer.graphics.beginFill(0xFFF68F, 0.5);
            buffer.graphics.lineStyle(0);
            buffer.graphics.drawRect(this.stageWidth / 2 - Math.ceil(200 / 81 * 13), 130, Math.ceil(200 / 81 * 13) * 2, this.stageHeight);
            buffer.graphics.endFill();
        };
        MissionResult.prototype.drawResult = function () {
            var self = this;
            base.API.Init("http://39.104.85.167:8105/api/");
            base.API.call('get_game_score', {
                'characterListParams': self.characterListParams,
                'inviter': self.inviter,
                'gameSecret': self.game_secret,
                'player': self.player,
                'gameName': self.gameName,
            }).then(function (response) {
                var result = response['result'];
                self.simulatedData = result;
                var that = self;
                base.API.call('get_ttsm', {
                    'characterListParams': that.characterListParams,
                    'inviter': that.inviter,
                    'gameSecret': that.game_secret,
                    'player': that.player,
                    'gameName': that.gameName,
                }).then(function (response) {
                    var result = response['result'];
                    that.ttsms = result;
                    console.log('ttsmsstart1:');
                    console.log(that.ttsms);
                    console.log('ttsmsend1:');
                    self.drawTensionScale(that.ttsms);
                });
                self.initGraphics();
                // self.drawTensionScale();
            });
            console.log(11111111111);
            console.log(self.simulatedData);
            console.log(111111111);
            console.log('ttsmsstart2:');
            console.log(self.ttsms);
            console.log('ttsmsend2:');
        };
        MissionResult.prototype.drawTensionScale = function (ttsms) {
            var _this = this;
            console.log(this.simulatedData);
            this.ttsms = ttsms;
            console.log(this.ttsms);
            console.log(222222);
            this.simulatedData.forEach(function (val, index, array) {
                try {
                    var ttsm = _this.ttsms[index];
                    var score = val[2].toString();
                    // let tensionScale = new game.TensionScale(100, 60, [val[0], val[1]], score);
                    var zoramap = new game.ZORAMap(val[0], val[1], _this.player, val[3], val[2], _this.stageWidth, _this.stageHeight, ttsm);
                    // zoramap.x = 10
                    console.log(zoramap);
                    zoramap.y = 200 + (index - 1) * 150;
                    // if (index % 2 == 1) {
                    //     zoramap.x = 150;
                    //     zoramap.y = 150 + (index - 1) * 100;
                    // } 
                    // else if (index % 2 == 0) {
                    //     zoramap.x = 350;
                    //     zoramap.y = 150 + index * 100;
                    // }
                    _this.sprite.addChild(zoramap);
                }
                catch (error) {
                }
            });
        };
        MissionResult.prototype.drawLine = function () {
            var shape = new egret.Shape();
            shape.graphics.lineStyle(Math.ceil((200 / 81) * 13), 0xff00ff);
            shape.graphics.moveTo(this.stageWidth / 2, this.stageHeight);
            shape.graphics.lineTo(this.stageWidth / 2, 150);
            this.sprite.addChild(shape);
        };
        MissionResult.prototype.drawTitle = function () {
            var shape = new egret.Shape();
            shape.graphics.beginFill(0x359f93, 0.5);
            shape.graphics.drawRect(0, 0, this.stageWidth, 130);
            shape.graphics.endFill();
            this.sprite.addChild(shape);
            var title = new egret.TextField();
            title.text = "Mission 1 Complete: Here is an image of you in your Team‘s Zone of Responsible Action.";
            title.size = 30;
            title.width = this.stageWidth;
            title.x = 1;
            title.y = 50;
            this.sprite.addChild(title);
        };
        return MissionResult;
    }(egret.DisplayObjectContainer));
    game.MissionResult = MissionResult;
    __reflect(MissionResult.prototype, "game.MissionResult");
})(game || (game = {}));
//# sourceMappingURL=MissionResult.js.map