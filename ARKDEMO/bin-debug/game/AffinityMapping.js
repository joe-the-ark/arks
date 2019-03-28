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
        function AffinityMapping(stageWidth, stageHeight, process, missionName) {
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
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            _this.addChild(_this.sprite);
            _this.processBar();
            _this.intro();
            _this.playerName();
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
            var _this = this;
            var text = new egret.TextField();
            text.text = "My relation to \nis based on...";
            text.width = 200;
            text.x = this._x;
            text.y = 200;
            this.sprite.addChild(text);
            var votingPlayerName = new egret.TextField();
            votingPlayerName.text = "Babettete";
            votingPlayerName.width = 120;
            votingPlayerName.x = this._x + text.width;
            votingPlayerName.y = 200;
            this.sprite.addChild(votingPlayerName);
            var group = new eui.Group();
            var exml = "\n                        <e:Skin xmlns:e=\"http://ns.egret.com/eui\" states=\"up,down\" height=\"50\">\n                            <e:Label text=\"{data}\" textColor.down=\"0x666666\" textColor.up=\"0x666666\" horizontalCenter=\"0\" verticalCenter=\"0\"/> \n                        </e:Skin>";
            var list = new eui.List();
            var addFeedback = [
                "Jung", "James", "Element",
                "Sidorica", "Andy", "Nuby",
                "Jung", "James", "Element",
                "Sidorica", "Andy", "Nuby",
                "Jung", "James", "Element",
                "Sidorica", "Andy", "Nuby",
            ];
            list.dataProvider = new eui.ArrayCollection(addFeedback);
            list.itemRendererSkinName = exml;
            group.addChild(list);
            var myScroller = new eui.Scroller();
            myScroller.width = 470;
            myScroller.height = this.stageHeight - 300;
            myScroller.x = 100;
            myScroller.y = 200 + 80;
            myScroller.viewport = group;
            this.sprite.addChild(myScroller);
            var emotion = ["Love", "Appreciation", "Indifference", "Hidden Conflict", "Open Conflict"];
            emotion.forEach(function (val, index, array) {
                var area = new egret.TextField();
                area.text = emotion[index];
                area.width = 220;
                area.height = 150;
                area.x = _this._x + text.width + votingPlayerName.width + _this._margin;
                area.y = 200 + index * 170;
                area.border = true;
                area.borderColor = 0x000000;
                _this.sprite.addChild(area);
            });
        };
        return AffinityMapping;
    }(egret.DisplayObjectContainer));
    game.AffinityMapping = AffinityMapping;
    __reflect(AffinityMapping.prototype, "game.AffinityMapping");
})(game || (game = {}));
//# sourceMappingURL=AffinityMapping.js.map