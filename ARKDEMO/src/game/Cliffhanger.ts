namespace game {
    export class Cliffhanger extends egret.DisplayObjectContainer {
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
        public constructor(stageWidth, stageHeight) {
            super()
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.sprite = new egret.Sprite()

            this.addChild(this.sprite)
            this.processBar()
            this.intro()
            this.rightIcon()
        }

        private processBar(): void {
            let processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 95, "Cliffhanger > Mission 3")
            this.sprite.addChild(processBar)
        }

        private intro(): void {
            let intro = new egret.TextField()
            intro.text = "Before you may download the PDF with souvenirs from your journey, please ano- nymously vote one last scale."
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
            tip.text = "We call it the relationship scale. The results will be displays to nobody, yet will help us developing the next level on your journey with The ARK: Missi- on 3 > Empathy Walk"
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

        private nextPage(){



            let self = this
            base.API.Init("http://work.metatype.cn:8105/api/");
            base.API.call('get_players', {
                'inviter':self.inviter,
                'game_secret': self.game_secret,
                'gameName': self.gameName,
                'player':self.player

            }).then(function (response){
                let result = response['result']
                var player_list = result
                let cliffhanger =  new game.AffinityMapping(self.stageWidth, self.stageHeight, player_list)
                self.stage.addChild(cliffhanger)
                self.sprite.visible = false
            })


        }

    }
}