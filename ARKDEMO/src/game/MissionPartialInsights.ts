namespace game {
    export class MissionPartialInsights extends egret.DisplayObjectContainer {
        /***     初始赋值代码开始    ***/
        private sprite: egret.Sprite
        public stageWidth = 0
        public stageHeight = 0
        /***     初始赋值代码结束    ***/
        private _width = 600
        private _x = 20
        public character1 = "Carefulness"
        public character2 = "Power"
        public playerName = "Joe"
        public selfPerception = 6
        public individualTensionScale
        public teamTensionScaleMedian

        private game_secret = ''
        public gameName = ''
        public inviter = ''
        public chooser = ''
        public scorecount = 0

        public timer: egret.Timer
        
        public constructor(stageWidth, stageHeight, character1, character2, player, selfPerception, inviter, game_secret, gameName, scorecount, chooser) {
            super()
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.sprite = new egret.Sprite()
            this.addChild(this.sprite)

            this.game_secret = game_secret
            this.playerName = player
            this.gameName = gameName
            this.inviter = inviter
            this.character1 = character1
            this.character2 = character2
            this.chooser = chooser
            this.selfPerception = selfPerception
            this.scorecount = scorecount

            this.processBar()
            this.drawPotentialScale()
            
        }
        private processBar(): void {
            let processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 50, "Mission 1 > Partial Insights")
            this.sprite.addChild(processBar)
        }

        private drawPotentialScale(): void {
            let expandedTensionScale = new game.ExpandedTensionScale(this.stageWidth, this.stageHeight, this.character1, this.character2, this.playerName, this.selfPerception,this.game_secret, this.inviter, this.gameName, this.chooser, this.scorecount )
            expandedTensionScale.x = this._x + 350
            expandedTensionScale.y = 180
            this.sprite.addChild(expandedTensionScale)
        }
    }
}
