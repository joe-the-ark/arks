namespace game {

    export class TeamTensionScale extends egret.DisplayObjectContainer {
        /***     初始赋值代码开始    ***/
        private sprite: egret.Sprite
        public stageWidth = 0
        public stageHeight = 0
        /***     初始赋值代码结束    ***/
        public select_list = []
        // public absoluteValueOfDeviation
        public selfPerception = 1
        public individualTensionScaleMedian = 60
        // public deviationBetweenITSM_SP = this.selfPerception - this.individualTensionScaleMedian
        public absoluteValueOfDeviation = 0
        public teamTensionScaleMedian = 30
        public ZORAMin = 0
        public ZORAMax = 0
        public constructor(stageWidth, stageHeight, select_list, absoluteValueOfDeviation, selfPerception, teamTensionScaleMedian, individualTensionScaleMedian) {
            super()
            this.select_list = select_list
            this.selfPerception = selfPerception
            this.teamTensionScaleMedian = teamTensionScaleMedian
            this.absoluteValueOfDeviation = absoluteValueOfDeviation
            this.ZORAMin = this.teamTensionScaleMedian - 13
            this.ZORAMax = this.teamTensionScaleMedian + 13

            this.individualTensionScaleMedian = individualTensionScaleMedian

            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.sprite = new egret.Sprite()
            this.addChild(this.sprite)
            this.sprite.touchEnabled = true
            this.drawCharacter()
            this.drawScore()

        }

        private drawCharacter() {
            let randomColor = 0x0000ff + Math.floor(Math.random() * 100) * (0xffffff / 100)

            let topCharacterBg: egret.Shape = new egret.Shape()
            topCharacterBg.graphics.beginFill(0x7171C6)
            topCharacterBg.graphics.drawRect(0, 0, 180, 60)
            topCharacterBg.graphics.endFill()
            this.sprite.addChild(topCharacterBg)

            let bottomCharacterBg: egret.Shape = new egret.Shape()
            bottomCharacterBg.graphics.beginFill(0x7171C6)
            bottomCharacterBg.graphics.drawRect(0, 80, 180, 60)
            bottomCharacterBg.graphics.endFill()
            this.sprite.addChild(bottomCharacterBg)

            let toptext: egret.TextField = new egret.TextField()
            toptext.textAlign = egret.HorizontalAlign.CENTER
            toptext.x = topCharacterBg.x
            toptext.y = 10
            toptext.text = this.select_list[0]
            this.sprite.addChild(toptext)

            let bottomtext: egret.TextField = new egret.TextField()
            bottomtext.textAlign = egret.HorizontalAlign.CENTER
            bottomtext.x = bottomCharacterBg.x
            bottomtext.y = 90
            bottomtext.text = this.select_list[1]
            this.sprite.addChild(bottomtext)
        }

        private drawScore(): void {
            let scoreRedBg: egret.Shape = new egret.Shape()
            let scoreYellowBg: egret.Shape = new egret.Shape()
            let scoreWhiteBg: egret.Shape = new egret.Shape()
            let absoluteValueOfDeviation: egret.TextField = new egret.TextField()

            scoreRedBg.graphics.beginFill(0xC14343)
            scoreRedBg.graphics.lineStyle(2, 0xffffff)
            scoreRedBg.graphics.drawCircle(90, 70, 30)
            scoreRedBg.graphics.endFill()

            scoreYellowBg.graphics.beginFill(0xC9CA68)
            scoreYellowBg.graphics.lineStyle(2, 0xffffff)
            scoreYellowBg.graphics.drawCircle(90, 70, 30)
            scoreYellowBg.graphics.endFill()

            scoreWhiteBg.graphics.beginFill(0xFBF9F2)
            scoreWhiteBg.graphics.lineStyle(2, 0xffffff)
            scoreWhiteBg.graphics.drawCircle(90, 70, 30)
            scoreWhiteBg.graphics.endFill()

            if (this.ZORAMin > this.selfPerception || this.selfPerception > this.ZORAMax) {
                this.sprite.addChild(scoreRedBg)
                if (this.ZORAMin > this.individualTensionScaleMedian || this.individualTensionScaleMedian > this.ZORAMax) {
                    scoreYellowBg.graphics.beginFill(0xC14343)
                    scoreYellowBg.graphics.lineStyle(0, 0xffffff)
                    scoreYellowBg.graphics.drawCircle(90, 70, 20)
                    scoreYellowBg.graphics.endFill()
                    this.sprite.addChild(scoreYellowBg)
                }
            }
            else if (this.ZORAMin <= this.selfPerception && this.selfPerception <= this.ZORAMax) {
                if (this.ZORAMin <= this.individualTensionScaleMedian && this.individualTensionScaleMedian <= this.ZORAMax) {
                    this.sprite.addChild(scoreWhiteBg)
                }
                else if (this.ZORAMin > this.individualTensionScaleMedian || this.individualTensionScaleMedian > this.ZORAMax) {
                    this.sprite.addChild(scoreYellowBg)
                }
            }

            absoluteValueOfDeviation.text = this.absoluteValueOfDeviation.toString()
            absoluteValueOfDeviation.size = 20
            absoluteValueOfDeviation.textColor = 0x000000
            absoluteValueOfDeviation.x = 80
            absoluteValueOfDeviation.y = 60
            this.sprite.addChild(absoluteValueOfDeviation)
            if (this.individualTensionScaleMedian == 0) {  // ITSM 无数据则不显示|差值|
                this.sprite.removeChild(absoluteValueOfDeviation)
            }

        }
    }
}