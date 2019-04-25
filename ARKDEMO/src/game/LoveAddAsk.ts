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

        public loveInputText:eui.TextInput;
        public askInputText:eui.TextInput;
        public addInputText:eui.TextInput;


        public constructor(stageWidth, stageHeight, count, simulatedData, player, inviter, game_secret, gameName) {
            super()


            console.log(simulatedData)

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

            
            this.processBar()
            this.notice()
            this.love()
            this.loveInput()
            this.add()
            this.addInput()
            this.ask()
            this.askInput()
            this.tensionScale()

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


            this.initData()
            
        }

        private rightNext() {

            if(this.loveInputText.text != '' && this.addInputText.text != '' && this.askInputText.text != ''){

                base.API.call('save_players_process', { 
                    'inviter_name': this.inviter, 
                    'game_secret': this.game_secret,
                    'player': this.player,
                    'game_name': this.gameName,
                    'process': '4.'+this.count.toString()+'.1'
                }).then(function (response){
                
                })

                let self = this
                base.API.Init("http://work.metatype.cn:8105/api/");
                base.API.call('push_feedback', {

                    'game_secret': self.game_secret,
                    'gameName': self.gameName,
                    'player':self.player,
                    'inviter_name':self.inviter,
                    'love':self.loveInputText.text,
                    'add':self.addInputText.text,
                    'ask':self.askInputText.text,
                    'teammate':self.playerName

                }).then(function (response){
                    var count = self.count
                    var result = response['result']
                    var loveFeedbackList = result[0]
                    var addFeedbackList = result[1]
                    var askFeedbackList = result[2]
                    self.sprite.visible = false

                    let preview =  new game.Preview(self.stageWidth, self.stageHeight,self.player, self.inviter, self.game_secret, self.gameName, count, loveFeedbackList, addFeedbackList, askFeedbackList, self.simulatedData)
                    // let preview =  new game.Preview2(self.stageWidth, self.stageHeight)
                    self.stage.addChild(preview)

                })  

                
            }else {
                alert('Please fill in all the feedback boards.')
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
                self.noticeBox.text = "Feedback time for " + self.playerName + "\nLook at the basic integrative powers &\ntensions as a basis for ANONYMOUS\nfeedback. What do you LOVE about her as a\nteammate, what could she ADD and did you\nalways wanted to ask her? Take 1 minute\nper question, write fast & from the heart."

            })     
        }

        private processBar(): void {
            let processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 10, "Mission 2 > Love, Add, Ask")
            this.sprite.addChild(processBar)
        }

        private notice(): void {
            this.noticeBox = new egret.TextField()
            this.noticeBox.text = "Feedback time for " + this.playerName + "\nLook at the basic integrative powers &\ntensions as a basis for ANONYMOUS\nfeedback. What do you LOVE about her as a\nteammate, what could she ADD and did you\nalways wanted to ask her? Take 1 minute\nper question, write fast & from the heart."
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
            

            this.loveInputText = new eui.TextInput();
            this.loveInputText.width = 250
            var buttonSkin =
                `<e:Skin class="skins.TextInputSkin" minHeight="40" minWidth="300" 
                    states="normal,disabled,normalWithPrompt,disabledWithPrompt" xmlns:e="http://ns.egret.com/eui"> <e:Image width="100%" height="100%" scale9Grid="1,3,8,8" source="button_up_png"/> <e:Rect height="100%" width="100%" fillColor="0xffffff"/> <e:EditableText id="textDisplay" verticalCenter="0" left="10" right="10"
                    textColor="0x000000" textColor.disabled="0xff0000" 
                    width="200" height="100%" size="20" /> <e:Label id="promptDisplay" verticalCenter="0" left="10" right="10"
                    textColor="0xa9a9a9" width="100%" height="24" size="20" 
                    touchEnabled="false" includeIn="normalWithPrompt,disabledWithPrompt"/> 
                </e:Skin>`;
            this.loveInputText.skinName = buttonSkin;
            this.loveInputText.height = 250
            this.loveInputText.x = this._x + 120
            this.loveInputText.y = this.noticeBox.height + 60 + this._margin
            this.loveInputText.prompt = 'click here to write...'
            this.loveInputText.textColor = 0x4D4D4D
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
            sentence.text = "I would\nlove this\nperson \neven more,\n if..."
            sentence.size = 20
            sentence.x = this._x
            sentence.y = this.noticeBox.height + 130 + 250 + this._margin
            sentence.width = 100
            this.sprite.addChild(sentence)
        }

        private addInput(): void {
            this.addInputText = new eui.TextInput();
            this.addInputText.width = 250
            this.addInputText.height = 250
            var buttonSkin =
                `<e:Skin class="skins.TextInputSkin" minHeight="40" minWidth="300" 
                    states="normal,disabled,normalWithPrompt,disabledWithPrompt" xmlns:e="http://ns.egret.com/eui"> <e:Image width="100%" height="100%" scale9Grid="1,3,8,8" source="button_up_png"/> <e:Rect height="100%" width="100%" fillColor="0xffffff"/> <e:EditableText id="textDisplay" verticalCenter="0" left="10" right="10"
                    textColor="0x000000" textColor.disabled="0xff0000" 
                    width="200" height="100%" size="20" /> <e:Label id="promptDisplay" verticalCenter="0" left="10" right="10"
                    textColor="0xa9a9a9" width="100%" height="24" size="20" 
                    touchEnabled="false" includeIn="normalWithPrompt,disabledWithPrompt"/> 
                </e:Skin>`;
            this.addInputText.skinName = buttonSkin;
            this.addInputText.x = this._x + 120
            this.addInputText.y = this.noticeBox.height + 60 + this._margin * 2 + 250
            this.loveInputText.textColor = 0x4D4D4D
            this.addInputText.prompt = 'click here to write...'
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
            sentence.text = "I always\nwanted to\nask you..."
            sentence.size = 20
            sentence.x = this._x
            sentence.y = this.noticeBox.height + 130 + 500 + this._margin * 2
            sentence.width = 100
            this.sprite.addChild(sentence)
            
        }

        private askInput(): void {
            this.askInputText =  new eui.TextInput();
            this.askInputText.width = 250
            this.askInputText.height = 250
            this.askInputText.x = this._x + 120
            this.askInputText.y = this.noticeBox.height + 60 + this._margin * 3 + 500
            var buttonSkin =
                `<e:Skin class="skins.TextInputSkin" minHeight="40" minWidth="300" 
                    states="normal,disabled,normalWithPrompt,disabledWithPrompt" xmlns:e="http://ns.egret.com/eui"> <e:Image width="100%" height="100%" scale9Grid="1,3,8,8" source="button_up_png"/> <e:Rect height="100%" width="100%" fillColor="0xffffff"/> <e:EditableText id="textDisplay" verticalCenter="0" left="10" right="10"
                    textColor="0x000000" textColor.disabled="0xff0000" 
                    width="200" height="100%" size="20" /> <e:Label id="promptDisplay" verticalCenter="0" left="10" right="10"
                    textColor="0xa9a9a9" width="100%" height="24" size="20" 
                    touchEnabled="false" includeIn="normalWithPrompt,disabledWithPrompt"/> 
                </e:Skin>`;
            this.loveInputText.textColor = 0x4D4D4D
            this.askInputText.prompt = 'click here to write...'
            this.askInputText.skinName = buttonSkin;
            this.sprite.addChild(this.askInputText)
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