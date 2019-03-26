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
    var PotentialScale = (function (_super) {
        __extends(PotentialScale, _super);
        function PotentialScale(stageWidth, stageHeight, character1, character2, playerName, selfPerception, game_secret, inviter, player, gameName, playerCount) {
            var _this = _super.call(this) || this;
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            /***     初始赋值代码结束    ***/
            _this._x = 20;
            _this._width = 230;
            _this.character1 = "";
            _this.character2 = "";
            _this.playerName = "";
            _this.selfPerception = 0;
            _this.othersSelfPerception = [];
            _this.zoraMin = 0;
            _this.lowest = 0;
            _this.highest = 0;
            _this.count = 0;
            _this.median = 0;
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.character1 = character1;
            _this.character2 = character2;
            _this.playerName = playerName;
            _this.selfPerception = selfPerception;
            // this.othersSelfPerception = othersSelfPerception
            _this.game_secret = game_secret;
            _this.inviter = inviter;
            _this.player = player;
            _this.gameName = gameName;
            _this.playerCount = playerCount;
            _this.sprite = new egret.Sprite();
            _this.sprite.addEventListener(egret.Event.ADDED_TO_STAGE, _this.potentialScale, _this);
            _this.addChild(_this.sprite);
            _this.character1Sprite = new egret.TextField();
            _this.character2Sprite = new egret.TextField();
            _this.sprite.addChild(_this.character1Sprite);
            _this.sprite.addChild(_this.character2Sprite);
            _this._shape = new egret.Shape();
            _this.sprite.addChild(_this._shape);
            _this.zora = new egret.TextField();
            _this.sprite.addChild(_this.zora);
            _this.zoraMedianLine = new egret.Shape();
            _this.sprite.addChild(_this.zoraMedianLine);
            _this.tiptext = new egret.TextField();
            _this.tip();
            _this.initSprite();
            _this.timer = new egret.Timer(1000, 0);
            _this.timer.addEventListener(egret.TimerEvent.TIMER, _this.getOthersSelfPerception, _this);
            _this.timer.start();
            return _this;
        }
        PotentialScale.prototype.initSprite = function () {
            // 上面的性格
            // this.sprite.visible = true
            var character1Sprite = this.character1Sprite;
            character1Sprite.text = this.character1;
            character1Sprite.x = this._x;
            character1Sprite.width = this._width;
            character1Sprite.textAlign = egret.HorizontalAlign.CENTER;
            character1Sprite.border = true;
            character1Sprite.borderColor = 0x000000;
            character1Sprite.background = true;
            character1Sprite.backgroundColor = 0x539f93;
            // 下面的性格
            var character2Sprite = this.character2Sprite;
            character2Sprite.text = this.character2;
            character2Sprite.x = this._x;
            character2Sprite.y = 840;
            character2Sprite.width = this._width;
            character2Sprite.textAlign = egret.HorizontalAlign.CENTER;
            character2Sprite.border = true;
            character2Sprite.borderColor = 0x000000;
            character2Sprite.background = true;
            character2Sprite.backgroundColor = 0x539f93;
            // 性格连接线
            var line = new egret.Shape();
            line.graphics.lineStyle(2, 0xaa2200);
            line.graphics.moveTo(this._x + character1Sprite.width / 2, character1Sprite.height);
            line.graphics.lineTo(this._x + character2Sprite.width / 2, character2Sprite.y);
            line.graphics.endFill();
            this.sprite.addChild(line);
            var zora = this.zora;
            zora.x = this._x;
            zora.width = 230;
            zora.border = true;
            zora.background = true;
            zora.backgroundColor = 0xcbcc66;
            // zora.graphics.beginFill(0xcbcc66)
            // zora.graphics.drawRect(this._x, 0, 230, )
            // zora.graphics.endFill()
            var zoraMedianLine = this.zoraMedianLine;
            zoraMedianLine.graphics.lineStyle(5, 0x333333);
            zoraMedianLine.graphics.moveTo(this._x, 0);
            zoraMedianLine.graphics.lineTo(250, 0);
            zoraMedianLine.graphics.endFill();
        };
        PotentialScale.prototype.tip = function () {
            var tip = this.tiptext;
            tip.text = '';
            tip.width = 350;
            tip.x = -350;
            tip.y = 80;
            tip.background = true;
            tip.backgroundColor = 0x359f93;
            this.sprite.addChild(tip);
        };
        PotentialScale.prototype.getOthersSelfPerception = function () {
            var flag = this.othersSelfPerception.length + 1;
            if (flag == this.playerCount) {
                this.timer.stop();
            }
            var self = this;
            base.API.Init("http://work.metatype.cn:8105/api/");
            base.API.call('getOthersSelfPerception', {
                'inviter_name': self.inviter,
                'game_secret': self.game_secret,
                'player': self.player,
                'gameName': self.gameName,
            }).then(function (response) {
                self.othersSelfPerception = response['OthersSelfPerceptionList'];
                //  self.sprite.visible = false
                self.potentialScale();
                self.tiptext.text = Math.ceil(((self.othersSelfPerception.length + 1) / self.playerCount) * 100).toString() + '% of your Team (' + (self.othersSelfPerception.length + 1).toString() + 'out of ' + self.playerCount.toString() + ')) has so far voted the Potential Scale. Invite everyone to follow suit.Here are Early Insights:\n\n• ' + self.lowest.toString() + ' is the lowest and ' + self.highest.toString() + '    the highest value on the Scale.\n• The teams preliminary median is ' + self.median.toString() + '.\n• The perception of ' + self.count.toString() + ' people varies remarkably from the team average.';
                console.log(self.othersSelfPerception);
            });
        };
        PotentialScale.prototype.potentialScale = function () {
            // 上面的性格
            // this.sprite.visible = true
            // let character1: egret.TextField = new egret.TextField()
            // character1.text = this.character1
            // character1.x = this._x
            // character1.width = this._width
            // character1.textAlign = egret.HorizontalAlign.CENTER
            // character1.border = true
            // character1.borderColor = 0x000000
            // character1.background = true
            // character1.backgroundColor = 0x539f93
            // this.sprite.addChild(character1)
            var _this = this;
            // // 下面的性格
            // let character2: egret.TextField = new egret.TextField()
            // character2.text = this.character2
            // character2.x = this._x
            // character2.y = 840
            // character2.width = this._width
            // character2.textAlign = egret.HorizontalAlign.CENTER
            // character2.border = true
            // character2.borderColor = 0x000000
            // character2.background = true
            // character2.backgroundColor = 0x539f93
            // this.sprite.addChild(character2)
            // // 性格连接线
            // let line: egret.Shape = this._shape
            // line.graphics.lineStyle(2, 0xaa2200)
            // line.graphics.moveTo(this._x + character1.width / 2, character1.height)
            // line.graphics.lineTo(this._x + character1.width / 2, character2.y)
            // line.graphics.endFill()
            // this.sprite.addChild(line)
            // 添加玩家 SelfPerception
            var allSelfPerception = [];
            var count = 0;
            allSelfPerception.push(Number(this.selfPerception));
            // 其他玩家分数
            // ZORA 区域绘制
            this.othersSelfPerception.forEach(function (val, index, array) {
                allSelfPerception.push(_this.othersSelfPerception[index]);
            });
            var zoraMedian = Math.round(allSelfPerception.reduce(function (previous, current) { return current += previous; }) / allSelfPerception.length);
            var zoraMedianPosition = zoraMedian * (810 / 81) - 5 / 2;
            var zoraMin = zoraMedian - 13;
            this.zoraMin = zoraMin;
            var zoraMax = zoraMedian + 13;
            var zoraMinPosition = zoraMin * (810 / 81);
            var zoraMaxPosition = zoraMax * (810 / 81);
            this.othersSelfPerception.forEach(function (val, index, array) {
                var othersSelfPerception = new egret.TextField();
                othersSelfPerception.text = _this.othersSelfPerception[index].toString();
                othersSelfPerception.x = _this._x + _this.character1Sprite.width / 2;
                othersSelfPerception.y = _this.othersSelfPerception[index] / 81 * 810 - othersSelfPerception.height / 2;
                othersSelfPerception.width = 70;
                othersSelfPerception.textAlign = egret.HorizontalAlign.CENTER;
                othersSelfPerception.textColor = 0x000000;
                othersSelfPerception.border = true;
                othersSelfPerception.borderColor = 0x000000;
                othersSelfPerception.background = true;
                othersSelfPerception.backgroundColor = 0xfffecc;
                if (index % 2 == 0) {
                    othersSelfPerception.x = _this._x + _this.character1Sprite.width / 2 - othersSelfPerception.width;
                }
                // if (index == this.othersSelfPerception.length - 1) {  // 最大值
                //     othersSelfPerception.backgroundColor = 0xffff00
                // }
                if (zoraMin > _this.othersSelfPerception[index] || _this.othersSelfPerception[index] > zoraMax) {
                    othersSelfPerception.backgroundColor = 0xfeff33;
                    count++;
                }
                _this.sprite.addChild(othersSelfPerception);
            });
            var allscore = allSelfPerception.sort();
            this.lowest = allscore[0];
            this.highest = allscore.pop();
            this.median = zoraMedian;
            console.log(zoraMinPosition);
            console.log(zoraMaxPosition);
            var zora = this.zora;
            zora.height = zoraMaxPosition - zoraMinPosition;
            zora.y = zoraMinPosition;
            // zora.graphics.beginFill(0xcbcc66)
            // zora.graphics.drawRect(this._x, zoraMinPosition, 230, zoraMaxPosition - zoraMinPosition)
            // zora.graphics.endFill()
            this.sprite.setChildIndex(zora, 0);
            // let zoraMedianLine: egret.Shape = this.zoraMedianLine
            // zoraMedianLine.graphics.lineStyle(5, 0x333333)
            // zoraMedianLine.graphics.moveTo(this._x, zoraMedianPosition)
            // zoraMedianLine.graphics.lineTo(250, zoraMedianPosition)
            // zoraMedianLine.graphics.endFill()
            // this.sprite.addChild(this.zoraMedianLine)
            this.zoraMedianLine.y = zoraMedianPosition;
            // 自我评价分
            var selfPerception = new egret.TextField();
            selfPerception.text = this.selfPerception.toString();
            selfPerception.textColor = 0x000000;
            selfPerception.x = this._x + this.character1Sprite.width / 2;
            selfPerception.y = this.selfPerception / 81 * 810 - selfPerception.height / 2;
            selfPerception.width = 70;
            selfPerception.textAlign = egret.HorizontalAlign.CENTER;
            selfPerception.border = true;
            selfPerception.borderColor = 0x000000;
            selfPerception.background = true;
            selfPerception.backgroundColor = 0xffffff;
            if (zoraMin > this.selfPerception || this.selfPerception > zoraMax) {
                selfPerception.backgroundColor = 0xcc9932;
                count++;
            }
            this.sprite.addChild(selfPerception);
            this.count = count;
            // 玩家名
            var playerName = new egret.TextField();
            playerName.text = this.playerName;
            playerName.textColor = 0x000000;
            playerName.x = selfPerception.x - playerName.width;
            playerName.y = this.selfPerception / 81 * 810 - playerName.height / 2;
            playerName.width = 100;
            playerName.textAlign = egret.HorizontalAlign.CENTER;
            playerName.border = true;
            playerName.borderColor = 0x000000;
            if (this.playerName.length * 18 < 100) {
                playerName.width = 100;
                playerName.x = selfPerception.x - playerName.width;
            }
            else {
                playerName.width = this.playerName.length * 18;
                playerName.x = selfPerception.x - playerName.width;
            }
            this.sprite.addChild(playerName);
        };
        return PotentialScale;
    }(egret.DisplayObjectContainer));
    game.PotentialScale = PotentialScale;
    __reflect(PotentialScale.prototype, "game.PotentialScale");
})(game || (game = {}));
//# sourceMappingURL=PotentialScale.js.map