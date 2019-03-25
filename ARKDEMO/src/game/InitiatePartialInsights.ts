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
        public playerCount
        public othersSelfPerception = [27, 31, 40, 47, 63]

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
            this.rightIcon()
            this.drawPotentialScale()
        }



        private processBar(): void {
            let processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 12, "Initaite > Partial Insights")
            this.sprite.addChild(processBar)
        }
        
        private tip(): void {
            // let tip: egret.TextField = new egret.TextField()
            // tip.text = "35% of your Team (6 out of 14) has so far voted the Potential Scale. Invite everyone to follow suit. Here are Early Insights:\n\n• 20 is the lowest and 63 the highest value on the Scale.\n• The teams preliminary median is 38.\n• The perception of 2 people varies remarkably from the team average."
            // tip.width = 350
            // tip.x = this._x
            // tip.y = 80
            // tip.background = true
            // tip.backgroundColor = 0x359f93
            // this.sprite.addChild(tip)
            let intro: egret.TextField = new egret.TextField()
            intro.text = "Our Basic Hypothesis is simple: a containment of tensions within the team results in less conflict & a better deployment of the team‘s potentialities.\n\n\n\n\n\n"
            intro.width = this._width
            intro.x = this._x
            intro.y = this.stageHeight - 180
            intro.background = true
            intro.backgroundColor = 0x359f93
            this.sprite.addChild(intro)
        }

        private rightIcon(): void {
            let rightIcon = new egret.Bitmap(RES.getRes("right_png") as egret.Texture)
            rightIcon.width = 100
            rightIcon.height = 100
            rightIcon.anchorOffsetX = rightIcon.width / 2
            rightIcon.anchorOffsetY = rightIcon.height / 2
            rightIcon.x = this.stageWidth - 50
            rightIcon.y = this.stageHeight - 50
            rightIcon.touchEnabled = true
            rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextTouch, this)
            this.sprite.addChild(rightIcon)
        }

        private drawPotentialScale(): void {
            let potentialScale = new game.PotentialScale(this.stageWidth, this.stageHeight, this.character1, this.character2, this.playerName, this.selfPerception, this.game_secret, this.inviter, this.player, this.gameName, this.playerCount)
            potentialScale.x = this._x + 350
            potentialScale.y = 80
            this.sprite.addChild(potentialScale)
        }

        private nextTouch() {

            let game_secret = this.game_secret
            let inviter = this.inviter
            let player = this.player
            let gameName = this.gameName
            let stageWidth = this.stageWidth
            let stageHeight = this.stageHeight
            // let count = 0
            let playerSCore = this.selfPerception 
            let playerCount = this.playerCount


            let characterChoosePage = new game.CharacterChoosePage(
                game_secret,
                inviter,
                player,
                gameName,
                stageWidth,
                stageHeight,
                playerCount
            )
            this.stage.addChild(characterChoosePage)
            this.sprite.visible = false
            
        }


    }
}