namespace game {
    export class LoveAddAsk extends egret.DisplayObjectContainer {
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
        private playerName = ""
        private simulatedData = [  // 玩家模拟数据
            ["Family", "Narcissism", 20, 40],
            ["Sensuality", "Fighting", 10, 24],
            ["Loyality", "Joy", 30, 19],
            ["Harmony", "Disruption", 4, 15],
            ["Carefulness", "Power", 12, 11],
            // ["Effort", "Loyality", 40, 4],
            // ["Power", "Courage", 2, 1],
        ]
        public constructor(stageWidth, stageHeight, process, missionName, playerName) {
            super()
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.sprite = new egret.Sprite()
            this.playerName = playerName
            this.addChild(this.sprite)
            this.processBar()
            this.notice()
            this.love()
            this.loveInput()
            this.add()
            this.addInput()
            this.ask()
            this.askInput()
            this.tensionScale()
        }

        private processBar(): void {
            let processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 10, "Mission 2 > Love, Add, Ask")
            this.sprite.addChild(processBar)
        }

        private notice(): void {
            this.noticeBox = new egret.TextField()
            this.noticeBox.text = "Feedback time for " + this.playerName + "\nLook at the basic integrative powers & tensions as a basis for ANONYMOUS feedback. What do you LOVE about her as a teammate, what could she ADD and did you always wanted to ask her? Take 1 minute per question, write fast & from the heart."
            this.noticeBox.textColor = 0x000000
            this.noticeBox.width = this._width
            this.noticeBox.x = this._x
            this.noticeBox.y = 60
            this.noticeBox.background = true
            this.noticeBox.backgroundColor = 0xffcc33
            this.sprite.addChild(this.noticeBox)
        }

        private love(): void {
            let love: egret.TextField = new egret.TextField()
            love.text = "LOVE"
            love.size = 40
            love.x = this._x
            love.y = this.noticeBox.height + 80
            this.sprite.addChild(love)

            let sentence = new egret.TextField()
            sentence.text = "I love this person, \nbecause..."
            sentence.size = 20
            sentence.x = this._x
            sentence.y = this.noticeBox.height + 130
            sentence.width = 100
            this.sprite.addChild(sentence)
        }

        private loveInput(): void {
            let loveInput = new egret.TextField()
            loveInput.type = egret.TextFieldType.INPUT
            loveInput.inputType = egret.TextFieldInputType.TEXT
            loveInput.width = 250
            loveInput.height = 250
            loveInput.x = this._x + 120
            loveInput.y = this.noticeBox.height + 60 + this._margin
            loveInput.textColor = 0x0d0d0d
            loveInput.size = 20
            loveInput.border = true
            loveInput.borderColor = 0x000000
            loveInput.multiline = true
            this.sprite.addChild(loveInput)
        }

        private add(): void {
            let add: egret.TextField = new egret.TextField()
            add.text = "ADD"
            add.size = 40
            add.x = this._x
            add.y = this.noticeBox.height + 100 + 250
            this.sprite.addChild(add)

            let sentence = new egret.TextField()
            sentence.text = "I would love this person even more, if..."
            sentence.size = 20
            sentence.x = this._x
            sentence.y = this.noticeBox.height + 130 + 250 + this._margin
            sentence.width = 100
            this.sprite.addChild(sentence)
        }

        private addInput(): void {
            let addInput = new egret.TextField()
            addInput.type = egret.TextFieldType.INPUT
            addInput.inputType = egret.TextFieldInputType.TEXT
            addInput.width = 250
            addInput.height = 250
            addInput.x = this._x + 120
            addInput.y = this.noticeBox.height + 60 + this._margin * 2 + 250
            addInput.textColor = 0x0d0d0d
            addInput.size = 20
            addInput.border = true
            addInput.borderColor = 0x000000
            addInput.multiline = true
            this.sprite.addChild(addInput)
        }

        private ask(): void {
            let ask: egret.TextField = new egret.TextField()
            ask.text = "ASK"
            ask.size = 40
            ask.x = this._x
            ask.y = this.noticeBox.height + 120 + 500
            this.sprite.addChild(ask)

            let sentence = new egret.TextField()
            sentence.text = "I always wanted to ask you..."
            sentence.size = 20
            sentence.x = this._x
            sentence.y = this.noticeBox.height + 130 + 500 + this._margin * 2
            sentence.width = 100
            this.sprite.addChild(sentence)
        }

        private askInput(): void {
            let askInput = new egret.TextField()
            askInput.type = egret.TextFieldType.INPUT
            askInput.inputType = egret.TextFieldInputType.TEXT
            askInput.width = 250
            askInput.height = 250
            askInput.x = this._x + 120
            askInput.y = this.noticeBox.height + 60 + this._margin * 3 + 500
            askInput.textColor = 0x0d0d0d
            askInput.size = 20
            askInput.border = true
            askInput.borderColor = 0x000000
            askInput.multiline = true
            this.sprite.addChild(askInput)

            base.API.Init("http://127.0.0.1:8000/api/")
            base.API.call("push_feedback", {"game_secret": this.game_secret, "gameName": this.gameName, "player": this.player, "inviter_name": this.inviter, "love": this.love, "add": this.add, "ask": this.ask, "teammate": this.playerName}).then(function (response) {
                askInput.addEventListener(egret.FocusEvent.FOCUS_OUT, this.pushFeedback, this)
            }).catch(function (err) {
                console.log(err)
            })
        }

        private pushFeedback(): void {
            console.log('123')
        }

        private tensionScale(): void {
            this.simulatedData.forEach((val, index, array) => {
                let character1 = val[0]
                let character2 = val[1]
                let middle_score = Number(val[2].toString())
                let player_score = Number(val[3].toString())
                let absoluteValueOfDeviation = Math.abs(player_score - middle_score)
                let individualTensionScaleMedian = middle_score
                let teamTensionScaleMedian = 0
                let tensionScale = new game.TensionScale(100, 60, [val[0], val[1]], absoluteValueOfDeviation, player_score, teamTensionScaleMedian, individualTensionScaleMedian)
                tensionScale.x = 420
                tensionScale.y = this.noticeBox.height + 210 + this._margin + (index - 1) * 150
                this.sprite.addChild(tensionScale)
            });
        }
    }
}