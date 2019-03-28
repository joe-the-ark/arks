namespace game {
    export class SettingSail extends egret.DisplayObjectContainer {
        /***     初始赋值代码开始    ***/
        private sprite: egret.Sprite
        public stageWidth = 0
        public stageHeight = 0
        /***     初始赋值代码结束    ***/
        private game_secret = ''
        private gameName = ''
        public inviter = ''
        public player = ''
        private _width = 600
        private _x = 20
        private _margin = 20

        public simulatedData

        
        public constructor(stageWidth, stageHeight, process, simulatedData, player_name, inviter, game_secret, gameName) {
            super()
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.sprite = new egret.Sprite()
            this.addChild(this.sprite)

            this.simulatedData = simulatedData
            this.player = player_name
            this.inviter = inviter
            this.game_secret = game_secret
            this.gameName = gameName

            this.processBar()
            this.intro()
            this.rightIcon()
        }

        private processBar(): void {
            let processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 5, "Mission 2 > Setting Sail")
            this.sprite.addChild(processBar)
        }

        private intro(): void {
            let intro = new egret.TextField()
            intro.text = "To progress in containing your team‘s tensions set sail to:\n\n• Learn about your teams major tensions\n• Give 1 on 1 Feedback to help safeguarding your Zone of Responsible Action (ZORA)\nLearn what others LOVE about you, what they think you should ADD & what they always wanted to ASK you."
            intro.width = this._width
            intro.x = this._x
            intro.y = 100
            this.sprite.addChild(intro)

            let img = new egret.Bitmap(RES.getRes("bg_jpg") as egret.Texture)
            img.width = this._width
            img.height = 550
            img.x = this._x
            img.y = intro.y + intro.height + this._margin
            this.sprite.addChild(img)

            let tip = new egret.TextField()
            tip.text = "The treasure at the end of Mission TWO? Embrace your teammates anonymous Feedback for a better deployment of the team‘s potentialities."
            tip.width = this._width
            tip.x = this._x
            tip.y = img.y + img.height + this._margin
            this.sprite.addChild(tip)
        }

        private rightIcon(): void {
            let rightIcon = new egret.Bitmap(RES.getRes("right_png") as egret.Texture)
            rightIcon.width = 100
            rightIcon.height = 100
            rightIcon.anchorOffsetX = rightIcon.width / 2
            rightIcon.anchorOffsetY = rightIcon.height / 2
            rightIcon.x = this.stageWidth - 50
            rightIcon.y = this.stageHeight / 2
            rightIcon.touchEnabled = true
            rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextPage, this)
            this.sprite.addChild(rightIcon)
        }


        private nextPage() {

            var count = 0
            var loveAddAsk =  new game.LoveAddAsk(this.stageWidth, this.stageHeight, count, this.simulatedData, this.player,  this.inviter, this.game_secret, this.gameName)
            this.stage.addChild(loveAddAsk)
            this.sprite.visible = false


        }

    }
}