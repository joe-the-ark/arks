namespace game{

    export class MissionResult extends egret.DisplayObjectContainer {

        public sprite: egret.Sprite
        private game_secret = ''
        private gameName = ''
        public inviter = ''
        public player = ''
        public timer: egret.Timer
        public stageWidth = 0
        public stageHeight = 0
        private titleBackground: egret.Shape
        private characterListParams = []
        public simulatedData = [];

        public constructor(stageWidth, stageHeight, inviter, game_secret, player, gameName, characterListParams) {
            super();
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.player = player
            this.gameName = gameName
            this.game_secret = game_secret
            this.inviter = inviter
            this.characterListParams = characterListParams
            
            this.sprite = new egret.Sprite();
            this.addChild(this.sprite);
            this.drawTitle();
            // this.drawLine()
            this.drawResult()

        }

        private drawResult(){
            var self = this
            base.API.Init("http://127.0.0.1:8000/api/");
            base.API.call('get_game_score', {
                'characterListParams': self.characterListParams,
                'inviter':self.inviter,
                'gameSecret': self.game_secret,
                'player': self.player,
                'gameName': self.gameName,
            }).then(function (response){
                var result = response['result']
                self.simulatedData = result
                self.drawTensionScale();
            })
        }

        private drawTensionScale() {
            console.log(this.simulatedData)
            this.simulatedData.forEach((val, index, array) => {
                try {
                    var score = val[2].toString()
                    // let tensionScale = new game.TensionScale(100, 60, [val[0], val[1]], score);

                    let zoramap = new game.ZORAMap(val[0], val[1], this.player, val[2], val[3], this.stageWidth, this.stageHeight)
                    zoramap.x = 10
                    zoramap.y = 200 + (index-1)*150

                    // if (index % 2 == 1) {
                    //     zoramap.x = 150;
                    //     zoramap.y = 150 + (index - 1) * 100;
                    // } 
                    // else if (index % 2 == 0) {
                    //     zoramap.x = 350;
                    //     zoramap.y = 150 + index * 100;
                    // }
                    this.sprite.addChild(zoramap);

                } catch (error) {
                }

            });
        }


        private drawLine() {
            var shape:egret.Shape = new egret.Shape()
            shape.graphics.lineStyle(4, 0xff00ff)
            shape.graphics.moveTo(this.stageWidth/2, this.stageHeight)
            shape.graphics.lineTo(this.stageWidth/2, 150)
            this.sprite.addChild(shape)

        }

        private drawTitle() {
            let shape: egret.Shape = new egret.Shape();
            shape.graphics.beginFill(0x00ff00, 0.5);
            shape.graphics.drawRect(0, 0, this.stageWidth, 130);
            shape.graphics.endFill();
            this.sprite.addChild(shape);

            let title: egret.TextField = new egret.TextField();
            title.text = "Mission 1 Complete: Here is an image of you in your Team‘s Zone of Responsible Action."
            title.size = 30;
            title.width = this.stageWidth;
            title.x = 10
            title.y = 2;
            this.sprite.addChild(title)
        }

    }
}