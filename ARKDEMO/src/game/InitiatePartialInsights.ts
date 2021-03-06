namespace game {
    export class InitiatePartialInsights extends egret.DisplayObjectContainer {
      
        /***     初始赋值代码开始    ***/
        private sprite: egret.Sprite
        public stageWidth = 0
        public stageHeight = 0
        /***     初始赋值代码结束    ***/
        private _width = 600
        private _x = 20
        public character1 = "Insufficiently"
        public character2 = "Fully"
        public playerName = "Joe"
        public selfPerception = 20
        public game_secret
        public inviter
        public player
        public gameName
        public playerCount = 0
        public othersSelfPerception = [27, 31, 40, 47, 63]
        private rightIcon: egret.Bitmap;

        public constructor(game_secret, inviter, player, gameName, stageWidth, stageHeight, playerCount, playerSCore) {
            super()
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.sprite = new egret.Sprite()

            this.game_secret = game_secret
            this.inviter = inviter
            this.player = player
            this.gameName = gameName
            this.playerCount = playerCount

            this.selfPerception = playerSCore
            this.playerName = player

            this.addChild(this.sprite)
            this.processBar()
            this.tip()


            this.rightIcon = new egret.Bitmap(RES.getRes("right_png") as egret.Texture)
            this.rightIcon.width = 100
            this.rightIcon.height = 100
            this.rightIcon.anchorOffsetX = this.rightIcon.width / 2
            this.rightIcon.anchorOffsetY = this.rightIcon.height / 2
            this.rightIcon.x = this.stageWidth - 50
            this.rightIcon.y = this.stageHeight - 50
            this.rightIcon.touchEnabled = true
            this.rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextTouch, this)
            this.sprite.addChild(this.rightIcon)            

            this.drawPotentialScale()
        }


        private processBar(): void {
            let processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 12, "Initaite > Partial Insights")
            this.sprite.addChild(processBar)
        }
        
        private tip(): void {
            let intro: egret.TextField = new egret.TextField()
            intro.text = "Our Basic Hypothesis is simple: a\ncontainment of tensions within the team\nresults in less conflict & a better deployment of \n the team‘s potentialities.\n\n\n\n\n\n"
            intro.width = this._width
            intro.x = this._x
            intro.y = this.stageHeight - 180
            intro.background = true
            intro.backgroundColor = 0x359f93
            this.sprite.addChild(intro)
        }


        private drawPotentialScale(): void {
            let potentialScale = new game.PotentialScale(this.stageWidth, this.stageHeight, this.character1, this.character2, this.playerName, this.selfPerception, this.game_secret, this.inviter, this.player, this.gameName, this.playerCount)
            potentialScale.x = this._x + 350
            potentialScale.y = 80
            this.sprite.addChild(potentialScale)
        }
        private nextTouch() {
            this.rightIcon.touchEnabled = false
            // var renderTexture:egret.RenderTexture = new egret.RenderTexture();
            // renderTexture.drawToTexture(this.sprite);
            // let base64Str = renderTexture.toDataURL("image/png");
            // console.log(base64Str)
            // base.API.call('save_result',{
            //     'base64Str':base64Str,
            //     'name':'InitiatePartialInsights',
            //     'game_secret':this.game_secret,
            //     'inviter':this.inviter
            // })

            var self = this
            base.API.Init("http://work.metatype.cn:8105/api/");
            base.API.call('save_players_process', {
                'inviter_name': self.inviter,
                'game_secret': self.game_secret,
                'player': self.player,
                'game_name': self.gameName,
                'process': '0.2'
            }).then(function (response) {
                let game_secret = self.game_secret
                let inviter = self.inviter
                let player = self.player
                let gameName = self.gameName
                let stageWidth = self.stageWidth
                let stageHeight = self.stageHeight
                let playerSCore = self.selfPerception 
                let playerCount = self.playerCount
                self.sprite.visible = false
                self.removeChild(self.sprite)
                let characterChoosePage = new game.CharacterChoosePage(
                    game_secret,
                    inviter,
                    player,
                    gameName,
                    stageWidth,
                    stageHeight,
                    playerCount
                )
                self.stage.addChild(characterChoosePage)
                
            })

        }
    }
}