namespace game {
    export class ExpandedTensionScale extends egret.DisplayObjectContainer {
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
        public individualTensionScale = []
        public individualTensionScaleMedian = 0
        public deviationBetweenITSM_SP = 0
        public teamTensionScaleMedian = 0

        public game_secret
        public inviter
        public player
        public gameName
        private character1Sprite: egret.TextField
        private character2Sprite: egret.TextField
        private itsm_Deviation: egret.TextField
        private individualTensionScaleMedianPlayerName: egret.TextField
        private _shape: egret.Shape;
        private zora: egret.TextField;
        private zoraMedianLine: egret.Shape;
        private zoraMin = 0
        private  tiptext: egret.TextField
        public lowest = 0
        public highest = 0
        public count = 0
        public median = 0
        public timer: egret.Timer
        public chooser
        public scorecount:number

        public noticetext: egret.TextField

        public playerCount
        private votedScalesNumber = 1
        private scalesNumber = 7

        public constructor(stageWidth, stageHeight, character1, character2, playerName, selfPerception, game_secret, inviter, gameName, chooser, scorecount) {
            super()
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.character1 = character1
            this.character2 = character2
            this.playerName = playerName
            this.selfPerception = selfPerception

            this.game_secret = game_secret
            this.inviter = inviter
            this.gameName = gameName
            this.chooser = chooser

            this.scorecount = scorecount

            this.sprite = new egret.Sprite()
            this.sprite.addEventListener(egret.Event.ADDED_TO_STAGE, this.tensionScale, this)
            this.addChild(this.sprite)

            this.character1Sprite  = new egret.TextField()
            this.character2Sprite = new egret.TextField()
            this.itsm_Deviation = new egret.TextField()
            this.individualTensionScaleMedianPlayerName = new egret.TextField()

            this.sprite.addChild(this.character1Sprite)
            this.sprite.addChild(this.character2Sprite)
            this.sprite.addChild(this.itsm_Deviation)
            this.sprite.addChild(this.individualTensionScaleMedianPlayerName)
            this.zora = new egret.TextField();
            this.sprite.addChild(this.zora);
            this.zoraMedianLine = new egret.Shape();
            this.sprite.addChild(this.zoraMedianLine);

            this.initSprite()
            this.timer = new egret.Timer(10, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.getttsm, this);
            this.timer.start()
            this.rightIcon()

            this.tiptext = new egret.TextField()
            this.noticetext = new egret.TextField()
            this.sprite.addChild(this.noticetext)
            this.sprite.addChild(this.tiptext)
            this.tip()
            this.notice2()

        }

        private initSprite(){

            // 上面的性格
            let character1Sprite: egret.TextField = this.character1Sprite
            character1Sprite.text = this.character1
            character1Sprite.x = this._x
            character1Sprite.width = this._width
            character1Sprite.textAlign = egret.HorizontalAlign.CENTER
            character1Sprite.border = true
            character1Sprite.borderColor = 0x000000
            character1Sprite.background = true
            character1Sprite.backgroundColor = 0x539f93
            // this.sprite.addChild(character1)

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
            // this.sprite.addChild(character2)

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

            let itsm_Deviation: egret.TextField = this.itsm_Deviation
            itsm_Deviation.text = this.individualTensionScaleMedian.toString() + "/" + this.deviationBetweenITSM_SP.toString()
            itsm_Deviation.textColor = 0x000000
            itsm_Deviation.x = this._x + this.character1Sprite.width / 2
            itsm_Deviation.y = this.individualTensionScaleMedian / 81 * 810 - itsm_Deviation.height / 2
            itsm_Deviation.width = 100
            itsm_Deviation.textAlign = egret.HorizontalAlign.CENTER
            itsm_Deviation.border = true
            itsm_Deviation.borderColor = 0x000000
            itsm_Deviation.background = true
            itsm_Deviation.backgroundColor = 0xffffff

            // ITSM 的玩家名
            let individualTensionScaleMedianPlayerName: egret.TextField = this.individualTensionScaleMedianPlayerName
            individualTensionScaleMedianPlayerName.text = this.playerName
            individualTensionScaleMedianPlayerName.textColor = 0x000000
            individualTensionScaleMedianPlayerName.x = itsm_Deviation.x - individualTensionScaleMedianPlayerName.width
            individualTensionScaleMedianPlayerName.y = this.individualTensionScaleMedian / 81 * 810 - individualTensionScaleMedianPlayerName.height / 2
            individualTensionScaleMedianPlayerName.width = 100
            individualTensionScaleMedianPlayerName.textAlign = egret.HorizontalAlign.CENTER
            individualTensionScaleMedianPlayerName.border = true
            individualTensionScaleMedianPlayerName.borderColor = 0x00000

        }

        private getttsm(){
            var self = this
            base.API.Init("http://work.metatype.cn:8105/api/");
            base.API.call('getttsmindividual', {
                'inviter_name': self.inviter,
                'game_secret': self.game_secret,
                'player': self.playerName,
                'gameName': self.gameName,
                'c1':self.character1,
                'c2':self.character2,
                'chooser':self.chooser
            }).then(function (response) {
                self.teamTensionScaleMedian = response['ttsm']
                self.individualTensionScale = response['individualTensionScale']

                self.playerCount = response['playerCount']
                self.votedScalesNumber = self.individualTensionScale.length + 1

                self.noticetext.text =  Math.ceil(((self.votedScalesNumber)/self.playerCount) * 100).toString() +  "% of your Teammates (" + self.votedScalesNumber.toString() + " out of " + self.playerCount + ') have so far voted the ' + self.character1 + " & " + self.character2 + "Tension Scale. Here are Early Insights:"

                self.tensionScale()
            })
        }

        private notice(): void {
            let notice: egret.TextField = new egret.TextField()
            notice.text = "54% of your Teammates (7 out of 13) have so far voted the Carefulness & Power Tension Scale. Here are Early Insights:"
            notice.width = 600
            notice.x = -350
            notice.y = 60 - 190
            notice.background = true
            notice.backgroundColor = 0x359f93
            this.sprite.addChild(notice)
        }
        private notice2(): void {
            let notice: egret.TextField = this.noticetext
            // notice.text = "54% of your Teammates (7 out of 13) have so far voted the Carefulness & Power Tension Scale. Here are Early Insights:"
            notice.width = 600
            notice.x = -350
            notice.y = 60 - 190
            notice.background = true
            notice.backgroundColor = 0x359f93
            
        }

        private tip2(){
            let tip: egret.TextField = this.tiptext
            tip.text = ''
            tip.width = 350
            tip.x = -350
            tip.y = 80
            tip.background = true
            tip.backgroundColor = 0x359f93
            this.sprite.addChild(tip)
        }

        private tip(): void {
            let tip: egret.TextField = new egret.TextField()

            tip.text = "• Your Self-Perception at 6 points is inside the preliminary Zone of Responsible Action.\n\n• Your teammates rank you at 46 a total of 40 points higher than your self-perception at 6 points.\n\n• While 21 points is the lowest and 70 points the highest value that others attributed to you.\n\n• Thus 71% of your relationships on this scale are tense."

            tip.width = 350
            tip.x = -350
            tip.y = 180 - 190 
            tip.background = true
            tip.backgroundColor = 0x359f93
            this.sprite.addChild(tip)
        }

        private rightIcon(): void {
            let rightIcon = new egret.Bitmap(RES.getRes("right_png") as egret.Texture)
            rightIcon.width = 100
            rightIcon.height = 100
            rightIcon.anchorOffsetX = rightIcon.width / 2
            rightIcon.anchorOffsetY = rightIcon.height / 2
            rightIcon.x = 140
            rightIcon.y = this.stageHeight - 230
            rightIcon.touchEnabled = true
            rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextTouch, this)
            this.sprite.addChild(rightIcon)
        }

        private nextTouch() {
            let process = '1'
            let missionName = '1'
            this.timer.stop()

            base.API.Init("http://work.metatype.cn:8105/api/");
            base.API.call('save_players_process', {
                'inviter_name': this.inviter,
                'game_secret': this.game_secret,
                'player': this.playerName,
                'game_name': this.gameName,
                'process': '1.'+this.scorecount.toString()+'2'
            }).then(function (response) {

            })

            this.sprite.visible = false
            let keepUpVoting =  new game.KeepUpVoting(this.stageWidth, this.stageHeight, process, missionName, this.inviter, this.game_secret, this.playerName, this.gameName, this.scorecount)
            this.stage.addChild(keepUpVoting)

        }

        private tensionScale(): void {
            // // 上面的性格
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

            // 性格连接线
            // let line: egret.Shape = new egret.Shape()
            // line.graphics.lineStyle(2, 0xaa2200)
            // line.graphics.moveTo(this._x + character1.width / 2, character1.height)
            // line.graphics.lineTo(this._x + character1.width / 2, character2.y)
            // line.graphics.endFill()
            // this.sprite.addChild(line)

            // ZORA 区域绘制
            let zoraMedian = this.teamTensionScaleMedian
            console.log(zoraMedian)
            let zoraMedianPosition = zoraMedian * (810 / 81) - 5 / 2
            let zoraMin = zoraMedian - 13

            this.zoraMin = zoraMin

            let zoraMax = zoraMedian + 13
            let zoraMinPosition = zoraMin * (810 / 81)
            let zoraMaxPosition = zoraMax * (810 / 81)
            // let zora: egret.Shape = new egret.Shape()
            // zora.graphics.beginFill(0xcbcc66)
            // zora.graphics.drawRect(this._x, zoraMinPosition, 230, zoraMaxPosition - zoraMinPosition)
            // zora.graphics.endFill()
            // this.sprite.addChild(zora)
            let zora: egret.TextField = this.zora
            zora.height = zoraMaxPosition - zoraMinPosition
            zora.y = zoraMinPosition
            this.sprite.setChildIndex(zora, 0)

            this.zoraMedianLine.y = zoraMedianPosition
            // let zoraMedianLine: egret.Shape = new egret.Shape()
            // zoraMedianLine.graphics.lineStyle(5, 0x333333)
            // zoraMedianLine.graphics.moveTo(this._x, zoraMedianPosition)
            // zoraMedianLine.graphics.lineTo(250, zoraMedianPosition)
            // zoraMedianLine.graphics.endFill()
            // this.sprite.addChild(zoraMedianLine)

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
            if (zoraMin > this.selfPerception || this.selfPerception > zoraMax) {  // 不在 ZORA 范围内
                selfPerception.backgroundColor = 0xcc9932
            }
            this.sprite.addChild(selfPerception)

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

            if (this.playerName.length * 18 < 100) {
                playerName.width = 100
                playerName.x = selfPerception.x - playerName.width
            } else {
                playerName.width = this.playerName.length * 18
                playerName.x = selfPerception.x - playerName.width
            }
            this.sprite.addChild(playerName)

            
            // 绘制 ITSM

            if(this.individualTensionScale.length > 0){

                console.log(this.individualTensionScale)

                this.individualTensionScaleMedian = Math.round(this.individualTensionScale.reduce((previous, current) => current += previous) / this.individualTensionScale.length)
                this.deviationBetweenITSM_SP = this.selfPerception - this.individualTensionScaleMedian

            }

            let itsm_Deviation: egret.TextField = this.itsm_Deviation
            itsm_Deviation.text = this.individualTensionScaleMedian.toString() + "/" + this.deviationBetweenITSM_SP.toString()
            // itsm_Deviation.textColor = 0x000000
            // itsm_Deviation.x = this._x + this.character1Sprite.width / 2
            itsm_Deviation.y = this.individualTensionScaleMedian / 81 * 810 - itsm_Deviation.height / 2
            // itsm_Deviation.width = 100
            // itsm_Deviation.textAlign = egret.HorizontalAlign.CENTER
            // itsm_Deviation.border = true
            // itsm_Deviation.borderColor = 0x000000
            // itsm_Deviation.background = true
            // itsm_Deviation.backgroundColor = 0xffffff

            if (zoraMin > this.individualTensionScaleMedian || this.individualTensionScaleMedian > zoraMax) {  // 不在 ZORA 范围内
                itsm_Deviation.backgroundColor = 0xfeff33
            }
            this.sprite.addChild(itsm_Deviation)

            // ITSM 的玩家名
            let individualTensionScaleMedianPlayerName: egret.TextField = this.individualTensionScaleMedianPlayerName
            individualTensionScaleMedianPlayerName.text = this.playerName
            individualTensionScaleMedianPlayerName.x = itsm_Deviation.x - individualTensionScaleMedianPlayerName.width
            individualTensionScaleMedianPlayerName.y = this.individualTensionScaleMedian / 81 * 810 - individualTensionScaleMedianPlayerName.height / 2

            if (this.playerName.length * 18 < 100) {
                individualTensionScaleMedianPlayerName.width = 100
                individualTensionScaleMedianPlayerName.x = itsm_Deviation.x - individualTensionScaleMedianPlayerName.width
            } else {
                individualTensionScaleMedianPlayerName.width = this.playerName.length * 18
                individualTensionScaleMedianPlayerName.x = itsm_Deviation.x - individualTensionScaleMedianPlayerName.width
            }

            // 其他玩家分数
            this.individualTensionScale.forEach((val, index, array) => {
                let individualTensionScale: egret.TextField = new egret.TextField()
                individualTensionScale.text = this.individualTensionScale[index].toString()
                individualTensionScale.x = this._x + this.character1Sprite.width / 2
                individualTensionScale.y = this.individualTensionScale[index] / 81 * 810 - individualTensionScale.height / 2
                individualTensionScale.width = 70
                individualTensionScale.textAlign = egret.HorizontalAlign.CENTER
                individualTensionScale.textColor = 0x000000
                individualTensionScale.border = true
                individualTensionScale.borderColor = 0x000000
                individualTensionScale.background = true
                individualTensionScale.backgroundColor = 0xffffff
                if (index % 2 == 0) {  // 偶数项在左侧
                    individualTensionScale.x = this._x + this.character1Sprite.width / 2 - individualTensionScale.width
                }
                if (zoraMin > this.individualTensionScale[index] || this.individualTensionScale[index] > zoraMax) {  // 不在 ZORA 范围内
                    individualTensionScale.backgroundColor = 0xcc9932
                }
                this.sprite.addChild(individualTensionScale)


            })
            // 添加玩家 SelfPerception
            // let allSelfPerception = []
            // allSelfPerception.push(this.selfPerception)
            // allSelfPerception.push(this.individualTensionScale[index])
            // allSelfPerception.sort()
            // allSelfPerception.pop()
            // allSelfPerception.shift()


            let othersSelfPerception =  this.individualTensionScale
            othersSelfPerception.sort()
            let hight = othersSelfPerception.pop()
            let low = othersSelfPerception.shift()

            var s = 0;
            this.individualTensionScale.forEach(function(val, idx, arr) {
                s += val;
            }, 0);

            let itsm = Math.ceil(s/this.playerCount)

        }
    }
}