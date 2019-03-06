namespace game {

    export class ProcessBar extends egret.DisplayObjectContainer {
        /***     初始赋值代码开始    ***/
        private sprite: egret.Sprite
        public stageWidth = 0
        public stageHeight = 0
        /***     初始赋值代码结束    ***/
        public processX = 20
        public process = 100
        public missionName = ''
        public constructor(stageWidth, stageHeight, process, missionName) {
            super()
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.sprite = new egret.Sprite()

            this.process = process
            this.missionName = missionName

            this.addChild(this.sprite)
            this.processBar()
        }

        private processBar(): void {
            let border: egret.Shape = new egret.Shape()
            let processBar: egret.Shape = new egret.Shape()
            let processText: egret.TextField = new egret.TextField()
            let missionName: egret.TextField = new egret.TextField()

            border.graphics.beginFill(0x51BEC4)
            border.graphics.drawRect(0, 0, this.stageWidth, 50)
            border.graphics.endFill()
            processBar.graphics.beginFill(0x373193)
            processBar.graphics.drawRect(this.processX, 10, this.process * 2, 30)
            processBar.graphics.endFill()
            processText.text = this.process.toString() + '%'
            processText.size = 20
            processText.x = this.processX + this.process * 2 + 15
            processText.y = 15
            processText.textColor = 0xffffff
            if (this.process > 50) {
                processText.x = (this.processX + this.process * 2) / 2 - (15 * (this.process / 100))
            }
            missionName.text = this.missionName
            missionName.textAlign = egret.VerticalAlign.MIDDLE
            missionName.size = 27
            missionName.x = 250
            missionName.y = 5
            missionName.textColor = 0xffffff

            this.sprite.addChild(border)
            this.sprite.addChild(processBar)
            this.sprite.addChild(processText)
            this.sprite.addChild(missionName)
        }
    }
}