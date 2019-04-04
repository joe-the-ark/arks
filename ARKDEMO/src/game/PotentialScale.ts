namespace game {
    export class PotentialScale extends egret.DisplayObjectContainer {
        /***     初始赋值代码开始    ***/
        private sprite: egret.Sprite
        public stageWidth = 0
        public stageHeight = 0
        /***     初始赋值代码结束    ***/
        private _x = 20
        private _width = 230
        public character1 = ""
        public character2 = ""
        public playerName = ""
        public selfPerception = 0
        public othersSelfPerception = []
        public timer: egret.Timer

        public game_secret
        public inviter
        public player
        public gameName
        public playerCount
        private character1Sprite: egret.TextField
        private character2Sprite: egret.TextField
        private _shape: egret.Shape;
        private zora: egret.TextField;
        private zoraMedianLine: egret.Shape;
        private zoraMin = 0
        private  tiptext: egret.TextField
        public lowest = 0
        public highest = 0
        public count = 0
        public median = 0

        public constructor(stageWidth, stageHeight, character1, character2, playerName, selfPerception, game_secret, inviter, player, gameName, playerCount) {
            super()
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.character1 = character1
            this.character2 = character2
            this.playerName = playerName
            this.selfPerception = selfPerception

            this.game_secret = game_secret
            this.inviter = inviter
            this.player = player
            this.gameName = gameName
            this.playerCount = playerCount

            this.sprite = new egret.Sprite()
            this.sprite.addEventListener(egret.Event.ADDED_TO_STAGE, 
            this.potentialScale, this)
            this.addChild(this.sprite)


            this.character1Sprite  = new egret.TextField()
            this.character2Sprite = new egret.TextField()
            this.sprite.addChild(this.character1Sprite)
            this.sprite.addChild(this.character2Sprite)
            this._shape = new egret.Shape();
            this.sprite.addChild(this._shape);            
            this.zora = new egret.TextField();
            this.sprite.addChild(this.zora);

            this.zoraMedianLine = new egret.Shape();
            this.sprite.addChild(this.zoraMedianLine);

            this.tiptext = new egret.TextField()
            this.tip()

            this.initSprite()
            this.timer = new egret.Timer(1000, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.getOthersSelfPerception, this);
            this.timer.start()

        }

        private initSprite(){
            // 上面的性格
            // this.sprite.visible = true
            let character1Sprite: egret.TextField = this.character1Sprite
            character1Sprite.text = this.character1
            character1Sprite.x = this._x
            character1Sprite.width = this._width
            character1Sprite.textAlign = egret.HorizontalAlign.CENTER
            character1Sprite.border = true
            character1Sprite.borderColor = 0x000000
            character1Sprite.background = true
            character1Sprite.backgroundColor = 0x539f93

            // 下面的性格
            let character2Sprite: egret.TextField = this.character2Sprite
            character2Sprite.text = this.character2
            character2Sprite.x = this._x
            character2Sprite.y = 840
            character2Sprite.width = this._width
            character2Sprite.textAlign = egret.HorizontalAlign.CENTER
            character2Sprite.border = true
            character2Sprite.borderColor = 0x000000
            character2Sprite.background = true
            character2Sprite.backgroundColor = 0x539f93

            // 性格连接线
            let line: egret.Shape = new egret.Shape()
            line.graphics.lineStyle(2, 0xaa2200)
            line.graphics.moveTo(this._x + character1Sprite.width / 2, character1Sprite.height)
            line.graphics.lineTo(this._x + character2Sprite.width / 2, character2Sprite.y)
            line.graphics.endFill()
            this.sprite.addChild(line)

            let zora: egret.TextField = this.zora
            zora.x = this._x
            zora.width = 230

            zora.border = true
            zora.background = true
            zora.backgroundColor = 0xcbcc66

            // zora.graphics.beginFill(0xcbcc66)
            // zora.graphics.drawRect(this._x, 0, 230, )
            // zora.graphics.endFill()

            let zoraMedianLine: egret.Shape = this.zoraMedianLine
            zoraMedianLine.graphics.lineStyle(5, 0x333333)
            zoraMedianLine.graphics.moveTo(this._x, 0)
            zoraMedianLine.graphics.lineTo(250, 0)
            zoraMedianLine.graphics.endFill()
            
        }

        private tip(){
            let tip: egret.TextField = this.tiptext
            tip.text = ''
            tip.width = 350
            tip.x = -350
            tip.y = 80
            tip.background = true
            tip.backgroundColor = 0x359f93
            this.sprite.addChild(tip)
        }

        private getOthersSelfPerception() {

            let flag = this.othersSelfPerception.length + 1
            if(flag == this.playerCount ){
                this.timer.stop()
            }   

            var self = this
            base.API.Init("http://work.metatype.cn:8105/api/");
            base.API.call('getOthersSelfPerception', {

                'inviter_name': self.inviter,
                'game_secret': self.game_secret,
                'player': self.player,
                'gameName': self.gameName,

            }).then(function (response) {
                self.othersSelfPerception = response['OthersSelfPerceptionList']
                //  self.sprite.visible = false
                self.potentialScale()
                self.tiptext.text = Math.ceil(((self.othersSelfPerception.length+1)/self.playerCount) * 100).toString() + '% of your Team \n (' + (self.othersSelfPerception.length+1).toString() + ' out of ' + self.playerCount.toString() + ' ) has so far\n voted the Potential Scale.\nInvite ev-eryone to follow suit.\nHere are Early Insights:\n\n• ' + self.lowest.toString() + ' is the lowest and ' + self.highest.toString() + '    the highest value on the  Scale.\n• The teams preliminary  median is ' + self.median.toString() + '.\n\n• The perception of ' + self.count.toString() + '\npeople varies remarkably \nfrom the team average.'
            })
        }

        private potentialScale(): void {
            
            let allSelfPerception = []
            let count = 0
            allSelfPerception.push(Number(this.selfPerception))
            // 其他玩家分数
            // ZORA 区域绘制

            this.othersSelfPerception.forEach((val, index, array) => {
                allSelfPerception.push(this.othersSelfPerception[index])

            })

            
            let zoraMedian = Math.round(allSelfPerception.reduce((previous, current) => current += previous) / allSelfPerception.length)
            let zoraMedianPosition = zoraMedian * (810 / 81) - 5 / 2
            let zoraMin = zoraMedian - 13
            this.zoraMin = zoraMin
            let zoraMax = zoraMedian + 13
            let zoraMinPosition = zoraMin * (810 / 81)
            let zoraMaxPosition = zoraMax * (810 / 81)


            this.othersSelfPerception.forEach((val, index, array) => {
                let othersSelfPerception: egret.TextField = new egret.TextField()
                othersSelfPerception.text = this.othersSelfPerception[index].toString()
                othersSelfPerception.x = this._x + this.character1Sprite.width / 2
                othersSelfPerception.y = this.othersSelfPerception[index] / 81 * 810 - othersSelfPerception.height / 2
                othersSelfPerception.width = 70
                othersSelfPerception.textAlign = egret.HorizontalAlign.CENTER
                othersSelfPerception.textColor = 0x000000
                othersSelfPerception.border = true
                othersSelfPerception.borderColor = 0x000000
                othersSelfPerception.background = true
                othersSelfPerception.backgroundColor = 0xfffecc


                othersSelfPerception.touchEnabled = true
                othersSelfPerception.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
                    othersSelfPerception.width = othersSelfPerception.width * 2.5
                    othersSelfPerception.height = othersSelfPerception.height * 2
                    othersSelfPerception.size = othersSelfPerception.size * 2
                    othersSelfPerception.x = othersSelfPerception.x - 100
                }, self)
                othersSelfPerception.addEventListener(egret.TouchEvent.TOUCH_END, () => {
                    othersSelfPerception.width = othersSelfPerception.width / 2.5
                    othersSelfPerception.height = othersSelfPerception.height / 2
                    othersSelfPerception.size = othersSelfPerception.size / 2
                    othersSelfPerception.x = othersSelfPerception.x + 100
                }, self)





                if (index % 2 == 0) {  // 偶数项在左侧
                    othersSelfPerception.x = this._x + this.character1Sprite.width / 2 - othersSelfPerception.width
                }
                // if (index == this.othersSelfPerception.length - 1) {  // 最大值
                //     othersSelfPerception.backgroundColor = 0xffff00
                // }
                if (zoraMin > this.othersSelfPerception[index] || this.othersSelfPerception[index] > zoraMax) {  // 不在 ZORA 区域
                    othersSelfPerception.backgroundColor = 0xfeff33
                    count ++ 

                }
                this.sprite.addChild(othersSelfPerception)
            })

            let allscore = allSelfPerception.sort()
            this.lowest = allscore[0]
            this.highest = allscore.pop()
            this.median = zoraMedian

            console.log(zoraMinPosition)
            console.log(zoraMaxPosition)

            let zora: egret.TextField = this.zora
            zora.height = zoraMaxPosition - zoraMinPosition
            zora.y = zoraMinPosition

            // zora.graphics.beginFill(0xcbcc66)
            // zora.graphics.drawRect(this._x, zoraMinPosition, 230, zoraMaxPosition - zoraMinPosition)
            // zora.graphics.endFill()

            this.sprite.setChildIndex(zora, 0)
            // let zoraMedianLine: egret.Shape = this.zoraMedianLine
            // zoraMedianLine.graphics.lineStyle(5, 0x333333)
            // zoraMedianLine.graphics.moveTo(this._x, zoraMedianPosition)
            // zoraMedianLine.graphics.lineTo(250, zoraMedianPosition)
            // zoraMedianLine.graphics.endFill()
            // this.sprite.addChild(this.zoraMedianLine)
            this.zoraMedianLine.y = zoraMedianPosition
            // 自我评价分
            let selfPerception: egret.TextField = new egret.TextField()
            selfPerception.text = this.selfPerception.toString()
            selfPerception.textColor = 0x000000
            selfPerception.x = this._x + this.character1Sprite.width / 2
            selfPerception.y = this.selfPerception / 81 * 810 - selfPerception.height / 2
            selfPerception.width = 70
            selfPerception.textAlign = egret.HorizontalAlign.CENTER
            selfPerception.border = true
            selfPerception.borderColor = 0x000000
            selfPerception.background = true
            selfPerception.backgroundColor = 0xffffff

            selfPerception.touchEnabled = true
            selfPerception.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
                selfPerception.width = selfPerception.width * 2.5
                selfPerception.height = selfPerception.height * 2
                selfPerception.size = selfPerception.size * 2
                selfPerception.x = selfPerception.x - 100
            }, self)
            selfPerception.addEventListener(egret.TouchEvent.TOUCH_END, () => {
                selfPerception.width = selfPerception.width / 2.5
                selfPerception.height = selfPerception.height / 2
                selfPerception.size = selfPerception.size / 2
                selfPerception.x = selfPerception.x + 100
            }, self)

            if (zoraMin > this.selfPerception || this.selfPerception > zoraMax) {  // 不在 ZORA 区域
                selfPerception.backgroundColor = 0xcc9932
                count ++ 
            }
            this.sprite.addChild(selfPerception)
            this.count = count
            // 玩家名
            let playerName: egret.TextField = new egret.TextField()
            playerName.text = this.playerName
            playerName.textColor = 0x000000
            playerName.x = selfPerception.x - playerName.width
            playerName.y = this.selfPerception / 81 * 810 - playerName.height / 2
            playerName.width = 100
            playerName.textAlign = egret.HorizontalAlign.CENTER
            playerName.border = true
            playerName.borderColor = 0x000000

            playerName.touchEnabled = true
            playerName.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
                playerName.width = playerName.width * 2.5
                playerName.height = playerName.height * 2
                playerName.size = playerName.size * 2
                playerName.x = playerName.x - 100
            }, self)
            playerName.addEventListener(egret.TouchEvent.TOUCH_END, () => {
                playerName.width = playerName.width / 2.5
                playerName.height = playerName.height / 2
                playerName.size = playerName.size / 2
                playerName.x = playerName.x + 100
            }, self)

            if (this.playerName.length * 18 < 100) {
                playerName.width = 100
                playerName.x = selfPerception.x - playerName.width
            } else {
                playerName.width = this.playerName.length * 18
                playerName.x = selfPerception.x - playerName.width
            }
            this.sprite.addChild(playerName)

        }
    }
}