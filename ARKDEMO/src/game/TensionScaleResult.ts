namespace game {

    export class TensionScaleResult extends egret.DisplayObjectContainer {

        public sprite: egret.Sprite
        private unselectedCharacterList = []
        private selectedChaeacterList = []
        private game_secret = ''
        private player = ''
        private gameName = ''
        public inviter = ''
        private characterListParams = []
        public timer: egret.Timer
        public stageWidth = 0
        public stageHeight = 0;
        public playerCount = 0;
        public simulatedData = [];
        private rightIcon: egret.Bitmap;

        public _touchStatus: boolean = false;
        public label: egret.TextField
        public ttsms = []

        public constructor(stageWidth, stageHeight, inviter, game_secret, player, gameName, characterListParams, playerCount) {
            super();
            this.game_secret = game_secret
            this.player = player
            this.gameName = gameName
            this.inviter = inviter
            this.characterListParams = characterListParams
            this.playerCount = playerCount
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

            this.rightIcon = new egret.Bitmap(RES.getRes('right_png') as egret.Texture)
            this.rightIcon.width = 100
            this.rightIcon.height = 100
            this.rightIcon.anchorOffsetX = this.rightIcon.width / 2
            this.rightIcon.anchorOffsetY = this.rightIcon.height / 2
            this.rightIcon.x = stageWidth - 50
            this.rightIcon.y = stageHeight - 100
            this.rightIcon.touchEnabled = true
            this.rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rightNext, this)

            let probessBar = new game.ProcessBar(stageWidth, stageHeight, 90, 'Mission 1 > Major Tensions')
            this.sprite.addChild(probessBar)

            let tip = new game.MajorTensionsTip(stageWidth, stageHeight)
            tip.y = stageHeight - 300
            tip.x = 3
            tip.width = stageWidth - 3
            this.sprite.addChild(tip)
        }

        private getGameResult() {
            var self = this
            base.API.Init("http://work.metatype.cn:8105/api/");
            base.API.call('get_game_score', {
                'characterListParams': self.characterListParams,
                'inviter': self.inviter,
                'gameSecret': self.game_secret,
                'player': self.player,
                'gameName': self.gameName,
            }).then(function (response) {
                var result = response['result']

                self.ttsms = response['ttsms']
                self.simulatedData = result
                self.drawTensionScale();
            })
        }

        private drawTitle() {
            let shape: egret.Shape = new egret.Shape();
            shape.graphics.beginFill(0x359f93, 0.5);
            shape.graphics.drawRect(0, 0, this.stageWidth, 130);
            shape.graphics.endFill();
            this.sprite.addChild(shape);

            let title: egret.TextField = new egret.TextField();
            title.text = "Identify the major sources of tension with you teammates"
            title.size = 30;
            title.width = this.stageWidth;
            title.x = 1
            title.y = 50;
            this.sprite.addChild(title)
        }

        private drawTensionScale() {
            console.log(this.simulatedData)
            console.log('tssmsssssddsfasdfasdf')
            console.log(this.ttsms)
            console.log('tssmsssssddsfasdfasdf')
            this.simulatedData.forEach((val, index, array) => {
                try {
                    var player_score = Number(val[3].toString())
                    var middle_score = Number(val[2].toString())
                    var character1 = val[0]
                    var character2 = val[2]
                    var absoluteValueOfDeviation = Math.abs(player_score - middle_score)
                    var individualTensionScaleMedian = middle_score
                    let tensionScale = new game.TensionScale(100, 60, [val[0], val[1]], absoluteValueOfDeviation, player_score, Number(this.ttsms[index]), individualTensionScaleMedian);

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
                }

            });

            console.log(111111111)
            console.log(this.simulatedData)
            console.log(this.playerCount)
            console.log(this.simulatedData.length)
            console.log(111111111)

            if (this.simulatedData) {
                if (this.playerCount == this.simulatedData.length) {
                    this.sprite.addChild(this.rightIcon)
                    this.timer.stop()
                }
            }
        }
        private rightNext() {
            // console.log('向右像牛')
            // var self = this
            // base.API.call('save_players_process', { 
            //     'inviter_name': self.inviter, 
            //     'game_secret': self.game_secret,
            //     'player': self.player,
            //     'game_name': self.gameName,
            //     'process': '5.0'
            // }).then(function (response){
            //     var missionResult = new game.MissionResult(self.stageWidth, self.stageHeight, self.inviter, self.game_secret, self.player, self.gameName)
            //     self.stage.addChild(missionResult)
            //     self.sprite.visible=false
            //     self.rightIcon.visible=false
            // })
            var self = this
            if (self.stage) {
                var missionResult = new game.MissionResult(self.stageWidth, self.stageHeight, self.inviter, self.game_secret, self.player, self.gameName, self.characterListParams)
                self.stage.addChild(missionResult)
                self.sprite.visible = false
                // self.rightIcon.visible = false
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