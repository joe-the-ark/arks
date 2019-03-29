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
        private simulatedData = []
        private count

        private rightIcon: egret.Bitmap;
        public player_list = []

        public loveInputText:egret.TextField
        public askInputText:egret.TextField
        public addInputText:egret.TextField

        public constructor(stageWidth, stageHeight, count, simulatedData, player, inviter, game_secret, gameName) {
            super()

            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.sprite = new egret.Sprite()
            this.addChild(this.sprite)
            // this.playerName = playerName

            this.count = count
            this.simulatedData = simulatedData

            this.player = player
            this.inviter = inviter
            this.game_secret = game_secret
            this.gameName = gameName
            this.notice()

            this.rightIcon = new egret.Bitmap(RES.getRes('right_png') as egret.Texture)
            this.rightIcon.width = 100
            this.rightIcon.height = 100
            this.rightIcon.anchorOffsetX = this.rightIcon.width / 2
            this.rightIcon.anchorOffsetY = this.rightIcon.height / 2
            this.rightIcon.x = stageWidth - 50
            this.rightIcon.y = stageHeight - 100
            this.rightIcon.touchEnabled = true
            this.rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rightNext, this)
            this.sprite.addChild(this.rightIcon)
            this.processBar()
           
            this.love()
            this.loveInput()
            this.add()
            this.addInput()
            this.ask()
            this.askInput()
            this.tensionScale()

            this.initData()
            
        }

        private rightNext() {


            if(this.loveInputText.text && this.addInputText.text && this.askInputText){


                alert(111111)

            }else {


                alert(2222222)
            }
            




        }

        private initData(){

            let self = this
            base.API.Init("http://work.metatype.cn:8105/api/");
            base.API.call('get_players', {
                'inviter':self.inviter,
                'game_secret': self.game_secret,
                'gameName': self.gameName,
                'player':self.player

            }).then(function (response){
                let result = response['result']
                console.log(result)
                self.player_list = result
                self.playerName = self.player_list[self.count]
                self.noticeBox.text = "Feedback time for " + self.playerName + "\nLook at the basic integrative powers & tensions as a basis for ANONYMOUS feedback. What do you LOVE about her as a teammate, what could she ADD and did you always wanted to ask her? Take 1 minute per question, write fast & from the heart."

            })     
        }

        private processBar(): void {
            let processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 10, "Mission 2 > Love, Add, Ask")
            this.sprite.addChild(processBar)
        }

        private notice(): void {
            this.noticeBox = new egret.TextField()
            // this.noticeBox.text = "Feedback time for " + this.playerName + "\nLook at the basic integrative powers & tensions as a basis for ANONYMOUS feedback. What do you LOVE about her as a teammate, what could she ADD and did you always wanted to ask her? Take 1 minute per question, write fast & from the heart."
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
            this.loveInputText = new egret.TextField()
            this.loveInputText.type = egret.TextFieldType.INPUT
            this.loveInputText.inputType = egret.TextFieldInputType.TEXT
            this.loveInputText.width = 250
            this.loveInputText.height = 250
            this.loveInputText.x = this._x + 120
            this.loveInputText.y = this.noticeBox.height + 60 + this._margin
            this.loveInputText.textColor = 0x0d0d0d
            this.loveInputText.size = 20
            this.loveInputText.border = true
            this.loveInputText.borderColor = 0x000000
            this.loveInputText.multiline = true
            this.sprite.addChild(this.loveInputText)
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
            this.addInputText = new egret.TextField()
            this.addInputText.type = egret.TextFieldType.INPUT
            this.addInputText.inputType = egret.TextFieldInputType.TEXT
            this.addInputText.width = 250
            this.addInputText.height = 250
            this.addInputText.x = this._x + 120
            this.addInputText.y = this.noticeBox.height + 60 + this._margin * 2 + 250
            this.addInputText.textColor = 0x0d0d0d
            this.addInputText.size = 20
            this.addInputText.border = true
            this.addInputText.borderColor = 0x000000
            this.addInputText.multiline = true
            this.sprite.addChild(this.addInputText)
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
            this.askInputText = new egret.TextField()
            this.askInputText.type = egret.TextFieldType.INPUT
            this.askInputText.inputType = egret.TextFieldInputType.TEXT
            this.askInputText.width = 250
            this.askInputText.height = 250
            this.askInputText.x = this._x + 120
            this.askInputText.y = this.noticeBox.height + 60 + this._margin * 3 + 500
            this.askInputText.textColor = 0x0d0d0d
            this.askInputText.size = 20
            this.askInputText.border = true
            this.askInputText.borderColor = 0x000000
            this.askInputText.multiline = true
            this.sprite.addChild(this.askInputText)
            // base.API.Init("http://127.0.0.1:8000/api/")
            // base.API.Init("http://work.metatype.cn:8105/api/");
            // base.API.call("push_feedback", {"game_secret": this.game_secret, "gameName": this.gameName, "player": this.player, "inviter_name": this.inviter, "love": this.love, "add": this.add, "ask": this.ask, "teammate": this.playerName}).then(function (response) {
            //     askInput.addEventListener(egret.FocusEvent.FOCUS_OUT, this.pushFeedback, this)
            // }).catch(function (err) {
            //     console.log(err)
            // })
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