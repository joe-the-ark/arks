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

        public resultTimer: egret.Timer
        
        
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
            // this.resultTimer = new egret.Timer(1000, 0);
            // this.resultTimer.addEventListener(egret.TimerEvent.TIMER, this.saveResult, this);
            // this.resultTimer.start()
            
        }
        private processBar(): void {
            let processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 50, "Mission 1 > Partial Insights")
            this.sprite.addChild(processBar)
        }

        private drawPotentialScale(): void {
            let expandedTensionScale = new game.ExpandedTensionScale(this.stageWidth, this.stageHeight, this.character1, this.character2, this.playerName, this.selfPerception,this.game_secret, this.inviter, this.gameName, this.chooser, this.scorecount)
            expandedTensionScale.x = this._x + 350
            expandedTensionScale.y = 180
            this.sprite.addChild(expandedTensionScale)
        }

        // private saveResult(){
        //     var self = this
        //     base.API.Init("http://work.metatype.cn:8105/api/");
        //     base.API.call('getttsmindividual', {
        //         'inviter_name': self.inviter,
        //         'game_secret': self.game_secret,
        //         'player': self.playerName,
        //         'gameName': self.gameName,
        //         'c1':self.character1,
        //         'c2':self.character2,
        //         'chooser':self.chooser
        //     }).then(function (response) {
        //         self.teamTensionScaleMedian = response['ttsm']
        //         self.individualTensionScale = response['individualTensionScale']
        //         var playerCount = response['playerCount']
        //         var votedScalesNumber = self.individualTensionScale.length + 1
              
        //         if(votedScalesNumber == playerCount){
        //             var idTimeout:number = egret.setTimeout( function( arg ){
        //                 var renderTexture:egret.RenderTexture = new egret.RenderTexture();
                        
        //                 renderTexture.drawToTexture(self.sprite);
        //                 let base64Str = renderTexture.toDataURL("image/png");
        //                 base.API.call('save_result',{
        //                     'base64Str':base64Str,
        //                     'player':self.playerName,
        //                     'name':'ExpandedTensionScale'+self.scorecount.toString(),
        //                     'game_secret':self.game_secret,
        //                     'inviter':self.inviter
        //                 })
        //                 self.resultTimer.stop()

        //                 }, this, 1000, "egret"
        //             );
        //         }
        //     })
        // }
    }
}
