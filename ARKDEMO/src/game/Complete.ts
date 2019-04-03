namespace game {
    export class Complete extends egret.DisplayObjectContainer {
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
        }

        private processBar(): void {
            let processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 100, "Mission 2 > Complete")
            this.sprite.addChild(processBar)
        }

        private intro(): void {
            let intro = new egret.TextField()
            intro.text = "Thank you for travelling with The ARK!\n\nDownload a PDF with your journeys data\n\nWeChat with the developer \n\nRe-Embark on The ARK \n\nRecommend The ARK to your friends\n\nCoffee for the developer"
            intro.width = this._width
            intro.x = this._x
            intro.y = 100
            this.sprite.addChild(intro)

            base.API.call('game_end', { 
                'inviter_name': this.inviter, 
                'game_secret': this.game_secret,
                'player': this.player,
                'gameName': this.gameName,
            }).then(function (response){
            
            })


        }

    }
}