namespace game {

    export class TensionScale extends egret.DisplayObjectContainer {
        /***     初始赋值代码开始    ***/
        private sprite: egret.Sprite
        public stageWidth = 0
        public stageHeight = 0
        /***     初始赋值代码结束    ***/
        public select_list = []
        // public absoluteValueOfDeviation
        public selfPerciption = 1
        public individualTensionScaleMedian = 60
        // public deviationBetweenITSM_SP = this.selfPerciption - this.individualTensionScaleMedian
        public absoluteValueOfDeviation = 0
        public teamTensionScaleMedian = 30
        public ZORAMin = 0
        public ZORAMax = 0
        public constructor(stageWidth, stageHeight, select_list, absoluteValueOfDeviation, selfPerciption, teamTensionScaleMedian, individualTensionScaleMedian ) {
            super()
            this.select_list = select_list
            this.selfPerciption = selfPerciption
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
            let bottomCharacterBg: egret.Shape = new egret.Shape()
            topCharacterBg.graphics.beginFill(0x7171C6)
            topCharacterBg.graphics.drawRect(0, 0, 180, 60)
            topCharacterBg.graphics.endFill()

            let toptext: egret.TextField = new egret.TextField()
            toptext.x = topCharacterBg.x
            console.log(topCharacterBg.y)
            console.log(topCharacterBg.x)

            toptext.y = 10
            toptext.text = this.select_list[0]
            bottomCharacterBg.graphics.beginFill(0x7171C6)
            bottomCharacterBg.graphics.drawRect(0, 80, 180, 60)
            bottomCharacterBg.graphics.endFill()

            let buttomtext: egret.TextField = new egret.TextField()
            buttomtext.x = bottomCharacterBg.x
            buttomtext.y = 90
            buttomtext.text = this.select_list[1]
            console.log(bottomCharacterBg.y)
            console.log(bottomCharacterBg.x)

            this.sprite.addChild(topCharacterBg)
            this.sprite.addChild(bottomCharacterBg)

            this.sprite.addChild(toptext)
            this.sprite.addChild(buttomtext)

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

            if (this.ZORAMin > this.selfPerciption || this.selfPerciption > this.ZORAMax) {
                this.sprite.addChild(scoreRedBg)
                if (this.ZORAMin > this.individualTensionScaleMedian || this.individualTensionScaleMedian > this.ZORAMax) {
                    scoreYellowBg.graphics.beginFill(0xC14343)
                    scoreYellowBg.graphics.lineStyle(0, 0xffffff)
                    scoreYellowBg.graphics.drawCircle(90, 70, 20)
                    scoreYellowBg.graphics.endFill()
                    this.sprite.addChild(scoreYellowBg)
                }
            }
            else if (this.ZORAMin <= this.selfPerciption && this.selfPerciption <= this.ZORAMax) {
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

        }
    }
}