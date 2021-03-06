namespace game {

    export class ZORAMap extends egret.DisplayObjectContainer {

        private sprite: egret.Sprite
        private playerList = []
        private game_secret = ''
        private player = ''
        public gameName = ''
        public inviter = ''
        public stageWidth = 0
        public stageHeight = 0

        public characterTwo = 'Fully'
        public characterOne = 'Insufficiently'

        public _touchStatus: boolean = false
        public _distance: egret.Point = new egret.Point()
        private _shape: egret.Shape

        private rectShapeOne: egret.Shape
        private rectShapeTwo: egret.Shape

        private playerScore = ''
        private tensionMedian = ''
        private characterText: egret.TextField
        private charater2: egret.TextField


        private closeIcon: egret.Bitmap

        private tiptext: egret.TextField

        private player_name = ''
        private median = 0
        private characterList = []
        private map: { [key: string]: string } = {}

        public ttsm = 0


        public selfPerciption = 1
        public individualTensionScaleMedian = 60
        // public deviationBetweenITSM_SP = this.selfPerciption - this.individualTensionScaleMedian
        public absoluteValueOfDeviation = 0
        public teamTensionScaleMedian = 30
        public ZORAMin = 0
        public ZORAMax = 0
        
        public simulatedData

        public constructor(characterOne, characterTwo, player_name, player_score, median, stageWidth, stageHeight, ttsm, simulatedData, inviter, game_secret, gameName) {
            super()

            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.ttsm = Number(ttsm)

            this.inviter = inviter
            this.player = player_name
            this.game_secret = game_secret
            this.gameName = gameName


            this.playerScore = player_score
            this.tensionMedian = median

            this.characterTwo = characterTwo
            this.characterOne = characterOne
            this.player_name = player_name

            this.simulatedData = simulatedData

            this.median = Math.abs(Number(player_score) - Number(median))
            this.absoluteValueOfDeviation = this.median
            this.selfPerciption = Number(this.playerScore)
            this.individualTensionScaleMedian = Number(this.tensionMedian)
            this.teamTensionScaleMedian = this.ttsm
            this.ZORAMin = this.teamTensionScaleMedian - 13
            this.ZORAMax = this.teamTensionScaleMedian + 13

            this.sprite = new egret.Sprite()
            this.sprite.width = stageWidth
            this.sprite.height = stageHeight
            this.sprite.x = 0
            this.sprite.y = 0
            this.addChild(this.sprite)
            this._shape = new egret.Shape()
            this.sprite.addChild(this._shape)
            this.drawVoteArea()

        }

        private drawVoteArea(): void {
            let character1: egret.TextField = new egret.TextField()
            let character2: egret.TextField = new egret.TextField()
            let line: egret.Shape = this._shape
            let playerName: egret.TextField = new egret.TextField()
            let playerScore: egret.TextField = new egret.TextField()
            let playerX = Math.ceil((Number(this.playerScore) - this.ttsm) * (200 / 81) + (this.stageWidth / 2))
            let tensionScaleMedian: egret.TextField = new egret.TextField()
            let tensionScaleMedianName: egret.TextField = new egret.TextField()

            let tensionScaleX = Math.ceil((Number(this.tensionMedian) - this.ttsm) * (200 / 81) + (this.stageWidth / 2))

            character1.text = this.characterOne
            character1.textAlign = egret.HorizontalAlign.CENTER
            character1.size = 30
            character1.border = true
            character1.width = 60
            character1.height = 120
            character1.borderColor = 0x3a5fcd
            character1.background = true
            character1.backgroundColor = 0xFBF9F2
            character1.textColor = 0x000000
            character1.x = Math.ceil((this.stageWidth / 2) - ((200 / 81) * this.ttsm + 60))

            character1.y = 150
            character2.text = this.characterTwo
            character2.textAlign = egret.HorizontalAlign.CENTER
            character2.size = 30
            character2.border = true
            character2.width = 60
            character2.height = 120
            character2.borderColor = 0x3a5fcd
            character2.x = (this.stageWidth / 2) + Math.ceil(((200 / 81) * (81 - this.ttsm) + 60))
            character2.y = 150
            character2.background = true
            character2.backgroundColor = 0xFBF9F2
            character2.textColor = 0x000000

            line.graphics.lineStyle(2, 0xdd2222)
            line.graphics.moveTo(character1.x + 60, 210)
            line.graphics.lineTo(character2.x, 210)

            playerName.text = this.player_name
            playerName.textAlign = egret.HorizontalAlign.CENTER
            playerName.size = 20
            playerName.border = true
            playerName.width = 50
            playerName.height = 20
            playerName.anchorOffsetX = playerName.width / 2
            playerName.anchorOffsetY = playerName.height / 2
            playerName.borderColor = 0x000000
            playerName.x = playerX
            playerName.y = 260
            playerName.rotation = 270
            playerName.textColor = 0x000000

            playerName.touchEnabled = true
            playerName.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
                playerName.width = playerName.width * 3
                playerName.height = playerName.height * 3
                playerName.size = playerName.size * 2
                // playerName.x = playerName.x - 100
            }, self)
            playerName.addEventListener(egret.TouchEvent.TOUCH_END, () => {
                playerName.width = playerName.width / 3
                playerName.height = playerName.height / 3
                playerName.size = playerName.size / 2
                // playerName.x = playerName.x + 100
            }, self)
            playerName.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, () => {
                playerName.width = playerName.width / 3
                playerName.height = playerName.height / 3
                playerName.size = playerName.size / 2
            }, self)

            playerScore.text = this.playerScore
            playerScore.textAlign = egret.HorizontalAlign.CENTER
            playerScore.size = 20
            playerScore.border = true
            playerScore.width = 50
            playerScore.height = 20
            playerScore.borderColor = 0x000000
            playerScore.x = playerX
            playerScore.y = 210
            playerScore.rotation = 270
            playerScore.textColor = 0x000000
            playerScore.anchorOffsetX = playerScore.width / 2
            playerScore.anchorOffsetY = playerScore.height / 2
            playerScore.touchEnabled = true
            playerScore.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
                playerScore.width = playerScore.width * 3
                playerScore.height = playerScore.height * 3
                playerScore.size = playerScore.size * 2
                // playerScore.x = playerScore.x - 100
            }, self)
            playerScore.addEventListener(egret.TouchEvent.TOUCH_END, () => {
                playerScore.width = playerScore.width / 3
                playerScore.height = playerScore.height / 3
                playerScore.size = playerScore.size / 2
                // playerName.x = playerName.x + 100
            }, self)
            playerScore.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, () => {
                playerScore.width = playerScore.width / 3
                playerScore.height = playerScore.height / 3
                playerScore.size = playerScore.size / 2
            }, self)

            tensionScaleMedian.text = this.tensionMedian + '/' + this.median
            tensionScaleMedian.textAlign = egret.HorizontalAlign.CENTER
            tensionScaleMedian.size = 20
            tensionScaleMedian.border = true;
            tensionScaleMedian.width = 60
            tensionScaleMedian.height = 20
            tensionScaleMedian.borderColor = 0x000000
            tensionScaleMedian.x = tensionScaleX
            tensionScaleMedian.y = 210
            tensionScaleMedian.rotation = 270
            tensionScaleMedian.textColor = 0x000000
            tensionScaleMedian.anchorOffsetX = tensionScaleMedian.width / 2
            tensionScaleMedian.anchorOffsetY = tensionScaleMedian.height / 2

            tensionScaleMedian.touchEnabled = true
            tensionScaleMedian.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
                tensionScaleMedian.width = tensionScaleMedian.width * 3
                tensionScaleMedian.height = tensionScaleMedian.height * 3
                tensionScaleMedian.size = tensionScaleMedian.size * 2
                // tensionScaleMedian.x = tensionScaleMedian.x - 100
            }, self)
            tensionScaleMedian.addEventListener(egret.TouchEvent.TOUCH_END, () => {
                tensionScaleMedian.width = tensionScaleMedian.width / 3
                tensionScaleMedian.height = tensionScaleMedian.height / 3
                tensionScaleMedian.size = tensionScaleMedian.size / 2
                // playerName.x = playerName.x + 100
            }, self)

            tensionScaleMedian.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, () => {
                tensionScaleMedian.width = tensionScaleMedian.width / 3
                tensionScaleMedian.height = tensionScaleMedian.height / 3
                tensionScaleMedian.size = tensionScaleMedian.size / 2
            }, self)

            tensionScaleMedianName.text = this.player_name
            tensionScaleMedianName.textAlign = egret.HorizontalAlign.CENTER
            tensionScaleMedianName.size = 20
            tensionScaleMedianName.border = true
            tensionScaleMedianName.width = 60
            tensionScaleMedianName.height = 20
            tensionScaleMedianName.borderColor = 0x000000
            tensionScaleMedianName.x = tensionScaleX
            tensionScaleMedianName.y = 270
            tensionScaleMedianName.rotation = 270
            tensionScaleMedianName.textColor = 0x000000
            tensionScaleMedianName.anchorOffsetX = tensionScaleMedianName.width / 2
            tensionScaleMedianName.anchorOffsetY = tensionScaleMedianName.height / 2

            tensionScaleMedianName.touchEnabled = true
            tensionScaleMedianName.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
                tensionScaleMedianName.width = tensionScaleMedianName.width * 3
                tensionScaleMedianName.height = tensionScaleMedianName.height * 3
                tensionScaleMedianName.size = tensionScaleMedianName.size * 2
            }, self)
            tensionScaleMedianName.addEventListener(egret.TouchEvent.TOUCH_END, () => {
                tensionScaleMedianName.width = tensionScaleMedianName.width / 3
                tensionScaleMedianName.height = tensionScaleMedianName.height / 3
                tensionScaleMedianName.size = tensionScaleMedianName.size / 2
            }, self)

            tensionScaleMedianName.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, () => {
                tensionScaleMedianName.width = tensionScaleMedianName.width / 3
                tensionScaleMedianName.height = tensionScaleMedianName.height / 3
                tensionScaleMedianName.size = tensionScaleMedianName.size / 2
            }, self)

            if (this.ZORAMin > this.selfPerciption || this.selfPerciption > this.ZORAMax) {  // SP在ZORA之外
                playerScore.background = true
                playerScore.backgroundColor = 0xC14343
                if (this.ZORAMin > this.individualTensionScaleMedian || this.individualTensionScaleMedian > this.ZORAMax) {  // ITSM在ZORA之外
                    tensionScaleMedian.background = true
                    tensionScaleMedian.backgroundColor = 0xC9CA68
                } else {
                    tensionScaleMedian.background = true
                    tensionScaleMedian.backgroundColor = 0xFBF9F2
                }
                character1.backgroundColor = 0x5E5E5E
                character2.backgroundColor = 0x5E5E5E
            }
            else if (this.ZORAMin <= this.selfPerciption && this.selfPerciption <= this.ZORAMax) {
                playerScore.background = true
                playerScore.backgroundColor = 0xFBF9F2
                if (this.ZORAMin <= this.individualTensionScaleMedian && this.individualTensionScaleMedian <= this.ZORAMax) {
                    playerScore.background = true
                    playerScore.backgroundColor = 0xFBF9F2
                    tensionScaleMedian.background = true
                    tensionScaleMedian.backgroundColor = 0xFBF9F2
                }
                else if (this.ZORAMin > this.individualTensionScaleMedian || this.individualTensionScaleMedian > this.ZORAMax) {
                    tensionScaleMedian.background = true
                    tensionScaleMedian.backgroundColor = 0xC9CA68
                    character1.backgroundColor = 0x5E5E5E
                    character2.backgroundColor = 0x5E5E5E
                }
            }
            this.sprite.addChild(character1)
            this.sprite.addChild(character2)
            this.sprite.addChild(line)
            this.sprite.addChild(playerName)
            this.sprite.addChild(playerScore)
            this.sprite.addChild(tensionScaleMedian)
            this.sprite.addChild(tensionScaleMedianName)
        }

    }
}