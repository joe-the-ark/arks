namespace game {

    export class TensionScaleResult extends egret.DisplayObjectContainer {

        public sprite: egret.Sprite
        private unselectedCharacterList = []
        private selectedChaeacterList = []
        private game_secret = ''
        private player= ''
        private gameName = ''
        public inviter = ''
        private characterListParams = []
        public timer: egret.Timer
        public stageWidth = 0
        public stageHeight = 0;
        public simulatedData = [];

        public _touchStatus: boolean = false;
        public label: egret.TextField

        public constructor(stageWidth, stageHeight, inviter, game_secret, player, gameName, characterListParams) {
            super();

            this.game_secret = game_secret
            this.player = player
            this.gameName = gameName
            this.inviter = inviter
            this.characterListParams = characterListParams
            console.log(characterListParams)
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.sprite = new egret.Sprite();
            this.addChild(this.sprite);
            this.sprite.touchEnabled = true;
            this.drawTensionScale();
            this.drawTitle();
            this.timer = new egret.Timer(1000, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.getGameResult, this);
            this.timer.start()
        }

        private getGameResult(){
            var self = this
            base.API.Init("http://39.104.85.167:8105/api/");
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
        private startGame(game_secret: string, gameName: string, inviter: string) {
            if (this.stage) {
                let enterGame = new game.EnterGame(game_secret, gameName, inviter, this.stage.stageWidth, this.stage.stageHeight);
                this.stage.addChild(enterGame)
                this.sprite.visible = false
                this.label.visible = false
            }
        }

        private drawTitle() {
            let shape: egret.Shape = new egret.Shape();
            shape.graphics.beginFill(0x00ff00, 0.5);
            shape.graphics.drawRect(0, 0, this.stageWidth, 130);
            shape.graphics.endFill();
            this.sprite.addChild(shape);

            let title: egret.TextField = new egret.TextField();
            title.text = "Identify the major sources of tension with you teammates"
            title.size = 30;
            title.width = this.stageWidth;
            title.x = 20
            title.y = 2;
            this.sprite.addChild(title)
        }

        private drawTensionScale() {
            console.log(this.simulatedData)
            this.simulatedData.forEach((val, index, array) => {
                try {
                    var score = val[2].toString()
                    let tensionScale = new game.TensionScale(100, 60, [val[0], val[1]], score);
                    if (index % 2 == 1) {
                        tensionScale.x = 150;
                        tensionScale.y = 150 + (index - 1) * 100;
                    } 
                    else if (index % 2 == 0) {
                        tensionScale.x = 350;
                        tensionScale.y = 150 + index * 100;
                    }
                    this.sprite.addChild(tensionScale);

                } catch (error) {
                    // score = ''
                    console.log(1111111)
                }

            });
        }
        private onTouchBegin(): void {
            if (this.stage) {
                let inviteScene = new game.CreateGame(this.stage.stageWidth, this.stage.stageHeight);
                this.stage.addChild(inviteScene)
                this.sprite.visible = false
                this.label.visible = false
            }
        }

        public getRandomScore(Min, Max): Number {
            var Range = Max - Min;
            var Rand = Math.random();
            return (Min + Math.round(Rand * Range));
        }

        private onTouchEnd(): void {
            egret.log("onTouchEnd");
        }

        private onTouchMove(): void {
            egret.log("onTouchMove");
        }

        private onTouchTap(): void {
            egret.log("onTouchTap");
        }

    }
}