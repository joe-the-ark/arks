namespace game {
    export class MajorTensionsTip extends egret.DisplayObjectContainer {
        /***     初始赋值代码开始    ***/
        private sprite: egret.Sprite
        public stageWidth = 0
        public stageHeight = 0
        /***     初始赋值代码结束    ***/
        public constructor(stageWidth, stageHeight) {
            super()
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.sprite = new egret.Sprite()
            this.sprite.width = stageWidth
            this.sprite.height = stageHeight
            this.addChild(this.sprite)
            this.tipText()
        }

        private tipText(): void {
            let title: egret.TextField = new egret.TextField()
            let content: egret.TextField = new egret.TextField()

            title.text = "Higher numbers indicate bigger tensions between your self-perception & the teams attribution of your position on the scale:"
            title.size = 30
            title.x = 0
            title.y = 0
            title.width = this.stageWidth
            title.background = true
            title.backgroundColor = 0x4B8DC3
            content.text = "• White values: mark areas of authentic action.            • Values over 13: indicate your dissociative effect on the team‘s organizing dynamics.\                  • Red values: mark your self- perception as being outside ZORA.                                                    • Yellow Values: mark your attributed position as being outside ZORA."
            content.size = 30
            content.x = 0
            content.y = 90
            content.width = this.stageWidth
            content.background = true
            content.backgroundColor = 0x4B8DC3

            this.sprite.addChild(title)
            this.sprite.addChild(content)
        }
    }
}