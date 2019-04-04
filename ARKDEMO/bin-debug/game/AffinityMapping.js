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
    var AffinityMapping = (function (_super) {
        __extends(AffinityMapping, _super);
        function AffinityMapping(stageWidth, stageHeight, player_list, inviter, game_secret, player, gameName) {
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
            _this.player_list = [];
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            _this.player = player;
            _this.inviter = inviter;
            _this.game_secret = game_secret;
            _this.gameName = gameName;
            _this.player_list = player_list;
            _this.text = new egret.TextField();
            _this.text.text = "My relation to \nis based on...";
            _this.text.width = 200;
            _this.text.x = _this._x;
            _this.text.y = 200;
            _this.sprite.addChild(_this.text);
            _this.votingPlayerName = new egret.TextField();
            _this.votingPlayerName.text = "Babettete";
            _this.votingPlayerName.width = 120;
            _this.votingPlayerName.x = _this._x + _this.text.width;
            _this.votingPlayerName.y = 200;
            _this.sprite.addChild(_this.votingPlayerName);
            _this.addChild(_this.sprite);
            _this.processBar();
            _this.intro();
            _this.playerName();
            _this.playerListMove();
            _this.rightIcon();
            return _this;
        }
        AffinityMapping.prototype.processBar = function () {
            var processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 99, "Cliffhanger > Affinity Mapping");
            this.sprite.addChild(processBar);
        };
        AffinityMapping.prototype.intro = function () {
            var intro = new egret.TextField();
            intro.text = "Describe the nature of your relationships...";
            intro.width = this._width;
            intro.x = this._x;
            intro.y = 100;
            this.sprite.addChild(intro);
        };
        AffinityMapping.prototype.playerName = function () {
            // let group = new eui.Group()
            // let exml = `
            //             <e:Skin xmlns:e="http://ns.egret.com/eui" states="up,down" height="50">
            //                 <e:Label text="{data}" textColor.down="0x666666" textColor.up="0x666666" horizontalCenter="0" verticalCenter="0"/> 
            //             </e:Skin>`;
            // let list = new eui.List()
            // let addFeedback = 
            // list.dataProvider = new eui.ArrayCollection(addFeedback)
            // list.itemRendererSkinName = exml
            // group.addChild(list)
            var _this = this;
            // let myScroller = new eui.Scroller()
            // myScroller.width = 470
            // myScroller.height = this.stageHeight - 300
            // myScroller.x = 100
            // myScroller.y = 200 + 80
            // myScroller.viewport = group
            // this.sprite.addChild(myScroller)
            var emotion = ["Love", "Appreciation", "Indifference", "Hidden Conflict", "Open Conflict"];
            emotion.forEach(function (val, index, array) {
                var area = new egret.TextField();
                area.touchEnabled = true;
                area.text = emotion[index];
                area.width = 220;
                area.height = 150;
                area.x = _this._x + _this.text.width + _this.votingPlayerName.width + _this._margin;
                area.y = 200 + index * 170;
                area.border = true;
                area.borderColor = 0x000000;
                _this.sprite.addChild(area);
                var x = area.x;
                var y = area.y;
                area.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.chooseArea.bind(_this, area.x, area.y), _this);
            });
        };
        AffinityMapping.prototype.chooseArea = function (x, y) {
            var self = this;
            var choose = new egret.TextField();
            choose.text = self.choose;
            choose.width = 200;
            choose.height = 50;
            choose.size = 30;
            choose.x = x;
            choose.y = y + 50;
            // choose.border = true
            self.sprite.addChild(choose);
            self.choose = '';
        };
        AffinityMapping.prototype.playerListMove = function () {
            var _this = this;
            this.player_list.forEach(function (val, index, array) {
                console.log(val);
                var player = new egret.TextField();
                player.text = val;
                player.textAlign = egret.HorizontalAlign.CENTER;
                player.size = 30;
                player.lineSpacing = 10;
                player.touchEnabled = true;
                player.border = true;
                player.borderColor = 0x00ff00;
                player.x = 100;
                player.y = 270 + index * 50;
                player.background = true;
                player.backgroundColor = 0x636363;
                _this.sprite.addChild(player);
                player.width = 200;
                // if (val.length * 18 < 100) {
                //     player.width = 100
                // } else {
                //     player.width = val.length * 18
                // }
                player.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) {
                    player.backgroundColor = 0x00ff00;
                    player.alpha = 0.4;
                    player.touchEnabled = false;
                    _this.votingPlayerName.text = player.text;
                    _this.choose = player.text;
                }, _this);
            });
        };
        AffinityMapping.prototype.rightIcon = function () {
            var rightIcon = new egret.Bitmap(RES.getRes("right_png"));
            rightIcon.width = 100;
            rightIcon.height = 100;
            rightIcon.anchorOffsetX = rightIcon.width / 2;
            rightIcon.anchorOffsetY = rightIcon.height / 2;
            rightIcon.x = this.stageWidth - 50;
            rightIcon.y = this.stageHeight / 2;
            rightIcon.touchEnabled = true;
            rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextPage, this);
            this.sprite.addChild(rightIcon);
        };
        AffinityMapping.prototype.nextPage = function () {
            var self = this;
            base.API.call('save_players_process', {
                'inviter_name': self.inviter,
                'game_secret': self.game_secret,
                'player': self.player,
                'game_name': self.gameName,
                'process': '10'
            }).then(function (response) {
                base.API.call('game_end', {
                    'inviter_name': self.inviter,
                    'game_secret': self.game_secret,
                    'player': self.player,
                    'gameName': self.gameName,
                }).then(function (response) {
                });
            });
            this.sprite.visible = false;
            var digestAsk = new game.Complete(this.stageWidth, this.stageHeight);
            this.stage.addChild(digestAsk);
        };
        return AffinityMapping;
    }(egret.DisplayObjectContainer));
    game.AffinityMapping = AffinityMapping;
    __reflect(AffinityMapping.prototype, "game.AffinityMapping");
})(game || (game = {}));
//# sourceMappingURL=AffinityMapping.js.map