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

        private rightIcon: egret.Bitmap;
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


            this.rightIcon = new egret.Bitmap(RES.getRes("right_png") as egret.Texture)
            this.rightIcon.width = 100
            this.rightIcon.height = 100
            this.rightIcon.anchorOffsetX = this.rightIcon.width / 2
            this.rightIcon.anchorOffsetY = this.rightIcon.height / 2
            this.rightIcon.x = this.stageWidth - 50
            this.rightIcon.y = this.stageHeight / 2
            this.rightIcon.touchEnabled = true
            this.rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextPage, this)
            this.sprite.addChild(this.rightIcon)

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

        private nextPage() {
            this.rightIcon.touchEnabled = false
            base.API.call('save_players_process', { 
                'inviter_name': this.inviter, 
                'game_secret': this.game_secret,
                'player': this.player,
                'game_name': this.gameName,
                'process': '4.0.0'
            }).then(function (response){
              
            })

            var count = 0
            this.sprite.visible = false
            this.removeChild(this.sprite)
            var loveAddAsk =  new game.LoveAddAsk(this.stageWidth, this.stageHeight, count, this.simulatedData, this.player,  this.inviter, this.game_secret, this.gameName)
            this.stage.addChild(loveAddAsk)

        }
    }
}