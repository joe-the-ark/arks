namespace game {
    export class KeepUpVoting extends egret.DisplayObjectContainer {
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
        private noticeBox: egret.TextField
        public timer: egret.Timer
        private characterListParams = []
        private votedScalesNumber = 1
        private scalesNumber = 7
        private remainingScalesNumber = this.scalesNumber - this.votedScalesNumber
        private simulatedData1 = []
        private simulatedData2 = []
        public ttsms = []
        public scorecount=0

        private rightIcon: egret.Bitmap;
        public simulatedData = []

        public playerCount
        
        
        public constructor(stageWidth, stageHeight, process, missionName, inviter, game_secret, player, gameName, scorecount) {
            super()
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.game_secret = game_secret
            this.player = player
            this.gameName = gameName
            this.inviter = inviter
            this.scorecount = scorecount
            this.sprite = new egret.Sprite()
            this.addChild(this.sprite)
            this.noticeBox = new egret.TextField()
            this.background()
            this.sprite.addChild(this.noticeBox)
            // this.notice()
            // this.tensionScale()
            this.initNotice()
            this.processBar()
            // var idTimeout:number = egret.setTimeout( function( arg ){
                // this.rightIcon()
            this.rightIcon = new egret.Bitmap(RES.getRes('right_png') as egret.Texture)
            this.rightIcon.width = 100
            this.rightIcon.height = 100
            this.rightIcon.anchorOffsetX = this.rightIcon.width / 2
            this.rightIcon.anchorOffsetY = this.rightIcon.height / 2
            this.rightIcon.x = stageWidth - 50
            this.rightIcon.y = stageHeight / 2
            this.rightIcon.touchEnabled = true
            this.sprite.addChild(this.rightIcon)
            this.rightIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.nextTouch, this)
            
                // }, this, 1000, "egret"
            // );

            this.timer = new egret.Timer(1000, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.getGameResult, this);
            this.timer.start()
        }

        private initNotice(){
            // let votedScalesNumber =this.votedScalesNumber.toString()
            // let scalesNumber = this.scalesNumber.toString()
            // let remainingScalesNumber = this.remainingScalesNumber.toString()
            let noticeBox: egret.TextField = this.noticeBox
            noticeBox.textColor = 0x000000
            noticeBox.width = this._width
            noticeBox.x = this._x
            noticeBox.y = 60
            noticeBox.background = true
            noticeBox.backgroundColor = 0xffcc33

        }

        private processBar(): void {
            let processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 55, "Mission 1 > Keep Up Voting")
            this.sprite.addChild(processBar)
        }

        private notice(): void {
            let votedScalesNumber = this.votedScalesNumber.toString()
            let scalesNumber = this.scalesNumber.toString()
            let remainingScalesNumber = this.remainingScalesNumber.toString()
            this.noticeBox = new egret.TextField()
            this.noticeBox.text = "Great! You cleared " + votedScalesNumber.toString() + " out of " + scalesNumber.toString() + " Tension Scales\n. Vote the remaining " + remainingScalesNumber.toString() + " to finish Mission 1 and\ndiscover your teams Zone of Responsible\nAction!"
            this.noticeBox.textColor = 0x000000
            this.noticeBox.width = this._width
            this.noticeBox.x = this._x
            this.noticeBox.y = 60
            this.noticeBox.background = true
            this.noticeBox.backgroundColor = 0xffcc33
            this.sprite.addChild(this.noticeBox)
        }

        private background(): void {
            let grey: egret.Shape = new egret.Shape()
            grey.x = this._x / 2  // 20会多
            grey.y = 120 - 20  // 减掉多的空白
            grey.graphics.beginFill(0xcccccc, 1)
            grey.graphics.drawRect(grey.x, grey.y, 380, this.stageHeight)
            grey.graphics.endFill()
            this.sprite.addChild(grey)

            let orange: egret.Shape = new egret.Shape()
            orange.x = this._x / 2 + grey.width / 2 + this._margin / 2
            orange.y = 120 - 20
            orange.graphics.beginFill(0xffcc33, 1)
            orange.graphics.drawRect(orange.x, orange.y, 200, this.stageHeight)
            orange.graphics.endFill()
            this.sprite.addChild(orange)
        }

        private getGameResult() {
            var self = this
            base.API.Init("http://work.metatype.cn:8105/api/");
            base.API.call('getKeepUpVotingData', {
                'inviter_name': self.inviter,
                'game_secret': self.game_secret,
                'player': self.player,
                'gameName': self.gameName,
            }).then(function (response) {
                
                self.simulatedData1 = response['simulatedData1']
                self.simulatedData2 = response['simulatedData2']

                let votedScalesNumber = self.simulatedData2.length
                let scalesNumber = votedScalesNumber + self.simulatedData1.length

                let remainingScalesNumber = self.simulatedData1.length
                self.noticeBox.text = "Great! You cleared " + votedScalesNumber.toString() + " out of " + scalesNumber.toString() + " Tension Scales. Vote the remaining " + remainingScalesNumber.toString() + " to finish Mission 1 and discover your teams Zone of Responsible Action!"

                self.tensionScale();

            })
        }

        private tensionScale(): void {
            this.simulatedData1.forEach((val, index, array) => {
                let character1 = val[0]
                let character2 = val[1]

                let middle_score = Number(val[2].toString())
                let player_score = Number(val[3].toString())
                let absoluteValueOfDeviation = Math.abs(player_score - middle_score)
                let individualTensionScaleMedian = middle_score
                let teamTensionScaleMedian = 0
                let tensionScale = new game.TensionScale(100, 60, [val[0], val[1]], absoluteValueOfDeviation, player_score, teamTensionScaleMedian, individualTensionScaleMedian)

                if (index % 2 == 1) {  // 左侧
                    tensionScale.x = 25
                    tensionScale.y = 210 + (index - 1) * 100
                } else if (index % 2 == 0) {  // 右侧
                    tensionScale.x = 215
                    tensionScale.y = 210 + index * 100
                }
                this.sprite.addChild(tensionScale)
            });

            this.simulatedData2.forEach((val, index, array) => {
                let character1 = val[0]
                let character2 = val[1]
                let individualTensionScaleMedian = Number(val[2].toString())
                let absoluteValueOfDeviation = Number(val[3].toString())
                let player_score = Number(val[4].toString())
                // let absoluteValueOfDeviation = Math.abs(player_score - middle_score)
                // let individualTensionScaleMedian = middle_score
                let teamTensionScaleMedian = 0
                let tensionScale = new game.TensionScale(100, 60, [val[0], val[1]], absoluteValueOfDeviation, player_score, teamTensionScaleMedian, individualTensionScaleMedian)
                tensionScale.x = 430
                tensionScale.y = 210 + index * 150
                this.sprite.addChild(tensionScale)                
            })
        }

        // private rightIcon(): void {
        //     let rightIcon = new egret.Bitmap(RES.getRes("right_png") as egret.Texture)
        //     rightIcon.width = 100
        //     rightIcon.height = 100
        //     rightIcon.anchorOffsetX = rightIcon.width / 2
        //     rightIcon.anchorOffsetY = rightIcon.height / 2
        //     rightIcon.x = this.stageWidth - 50
        //     rightIcon.y = this.stageHeight - 50
        //     rightIcon.touchEnabled = true
        //     rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextTouch, this)
        //     this.sprite.addChild(rightIcon)
        // }

        private nextTouch(){
            this.rightIcon.touchEnabled = false
            var self = this
            let scorecount = self.scorecount + 1
            base.API.Init("http://work.metatype.cn:8105/api/");
            base.API.call('getCharacterList', {
                'inviter_name': self.inviter,
                'game_secret': self.game_secret,
                'player': self.player,
                'gameName': self.gameName,
            }).then(function (response) {

                var characterListParams = response['characterListParams']
                let playerCount = response['playerCount']
                console.log('playerCount',playerCount)
                console.log('scorecount',scorecount)
                var check_score = response['check_score']
                console.log('check_score',check_score)
                self.playerCount = playerCount

                if(playerCount > scorecount){
                    if(characterListParams[1][scorecount] != undefined ){
                        self.timer.stop()
                        self.sprite.visible = false
                        self.removeChild(self.sprite)
                        let charater = new game.Character(self.game_secret, self.inviter, self.player, self.gameName, self.stageWidth, self.stageHeight, self.scorecount+1, characterListParams, []);
                        self.stage.addChild(charater);
                    }else {
                        alert('Please wait for others to choose scale')
                    }
                }
                else{
                    base.API.call('get_game_score', {
                        'characterListParams': characterListParams,
                        'inviter': self.inviter,
                        'gameSecret': self.game_secret,
                        'player': self.player,
                        'gameName': self.gameName,
                    }).then(function (response) {
                        var result = response['result']
                        self.simulatedData = result
                    })

                    if(check_score == 'true'){
                        base.API.call('save_players_process', {
                            'inviter_name': self.inviter,
                            'game_secret': self.game_secret,
                            'player': self.player,
                            'game_name': self.gameName,
                            'process': '2.0'
                        }).then(function (response) {
                            self.timer.stop()
                            self.sprite.visible = false;
                            self.removeChild(self.sprite)
                            let toTensionScaleResult = new game.TensionScaleResult(
                                self.stageWidth,
                                self.stageHeight,
                                self.inviter,
                                self.game_secret,
                                self.player,
                                self.gameName,
                                characterListParams,
                                self.playerCount
                            )
                            self.stage.addChild(toTensionScaleResult);
                        })
                    }else {
                        alert('Please wait for others to vote')
                    }
                }
            })
        }
    }
}