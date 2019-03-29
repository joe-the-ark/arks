namespace game {
    export class Preview extends egret.DisplayObjectContainer {
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

        private loveFeedbackList = []
        private addFeedbackList = []
        private askFeedbackList = []


        public constructor(stageWidth, stageHeight, player, inviter, game_secret, gameName, count, loveFeedbackList, addFeedbackList, askFeedbackList) {
            super()
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.sprite = new egret.Sprite()

            this.player = player
            this.inviter = inviter
            this.game_secret= game_secret
            this.gameName = gameName

            this.loveFeedbackList = loveFeedbackList
            this.addFeedbackList = addFeedbackList
            this.askFeedbackList = askFeedbackList


            // this.timer = new egret.Timer(1000, 0);
            // this.timer.addEventListener(egret.TimerEvent.TIMER, this.initDate, this);
            // this.timer.start()

            this.addChild(this.sprite)
            this.processBar()
            this.notice()
            this.love()
            
            this.add()
            this.ask()

            this.rightIcon()
        }


        // private initDate(){
        //     let self = this
        //     base.API.Init("http://work.metatype.cn:8105/api/");
        //     base.API.call('getOthersFeedback', {

        //         'inviter':self.inviter,
        //         'game_secret':self.game_secret,
        //         'gameName':self.gameName,
        //         'player': self.player
                
        //     }).then(function (response){

        //         var result = response['result']

        //         console.log(result)

        //         self.loveFeedbackList = result['loveFeedback']
        //         self.addFeedbackList = result['addFeedback']
        //         self.askFeedbackList = result['loveFeedback']
        //         // self.loveFeedback()
        //         // self.askFeedback()
        //         // self.addFeedback()

        //     })  
        // }


        private processBar(): void {
            let processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 15, "Love, Add, Ask > PREVIEW")
            this.sprite.addChild(processBar)
        }

        private notice(): void {
            this.noticeBox = new egret.TextField()
            this.noticeBox.text = "You receive previews on your feedback in return for your efforts. The full list with all feedbacks will be your reward upon completion of Mission 2."
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
        }

        private loveFeedback(): void {
            let group = new eui.Group()
            let exml = `
                        <e:Skin xmlns:e="http://ns.egret.com/eui" states="up,down" height="50">
                            <e:Label text="{data}" textColor.down="0xFFFFFF" textColor.up="0x666666" horizontalCenter="0" verticalCenter="0"/> 
                        </e:Skin>`;
            let list = new eui.List()
            let loveFeedback = this.loveFeedbackList

            list.dataProvider = new eui.ArrayCollection(loveFeedback)
            list.itemRendererSkinName = exml
            group.addChild(list)
            
            
            let myScroller = new eui.Scroller()
            myScroller.width = 470
            myScroller.height = (this.stageHeight - 120 - this._margin * 2) / 3
            myScroller.x = 130 + this._margin
            myScroller.y = this.noticeBox.height + 80
            myScroller.viewport = group
            this.sprite.addChild(myScroller)
        }

        private add(): void {
            let add: egret.TextField = new egret.TextField()
            add.text = "ADD"
            add.size = 40
            add.x = this._x
            add.y = this.noticeBox.height + 80 + (this.stageHeight - 120 - this._margin * 2) / 3 + this._margin
            this.sprite.addChild(add)
        }

        private addFeedback(): void {
            let group = new eui.Group()
            let exml = `
                        <e:Skin xmlns:e="http://ns.egret.com/eui" states="up,down" height="50">
                            <e:Label text="{data}" textColor.down="0xFFFFFF" textColor.up="0x666666" horizontalCenter="0" verticalCenter="0"/> 
                        </e:Skin>`;
            let list = new eui.List()
            let addFeedback = this.addFeedbackList
            list.dataProvider = new eui.ArrayCollection(addFeedback)
            list.itemRendererSkinName = exml
            group.addChild(list)

            let myScroller = new eui.Scroller()
            myScroller.width = 470
            myScroller.height = (this.stageHeight - 120 - this._margin * 2) / 3
            myScroller.x = 130 + this._margin
            myScroller.y = this.noticeBox.height + 80 + 2 * (this.stageHeight - 120 - this._margin * 2) / 3 + this._margin
            myScroller.viewport = group
            this.sprite.addChild(myScroller)
        }

        private ask(): void {
            let ask: egret.TextField = new egret.TextField()
            ask.text = "ASK"
            ask.size = 40
            ask.x = this._x
            ask.y = this.noticeBox.height + 80 + 2 * (this.stageHeight - 120 - this._margin * 2) / 3 + this._margin
            this.sprite.addChild(ask)
        }


        private askFeedback(): void {
            let group = new eui.Group()
            let exml = `
                        <e:Skin xmlns:e="http://ns.egret.com/eui" states="up,down" height="50">
                            <e:Label text="{data}" textColor.down="0xFFFFFF" textColor.up="0x666666" horizontalCenter="0" verticalCenter="0"/> 
                        </e:Skin>`;
            let list = new eui.List()
            let askFeedback = this.askFeedbackList
            list.dataProvider = new eui.ArrayCollection(askFeedback)
            list.itemRendererSkinName = exml
            group.addChild(list)

            let myScroller = new eui.Scroller()
            myScroller.width = 470
            myScroller.height = (this.stageHeight - 120 - this._margin * 2) / 3
            myScroller.x = 130 + this._margin
            myScroller.y = this.noticeBox.height + 80 + (this.stageHeight - 120 - this._margin * 2) / 3 + this._margin
            myScroller.viewport = group
            this.sprite.addChild(myScroller)
        }

        private rightIcon(): void {
            let rightIcon = new egret.Bitmap(RES.getRes("right_png") as egret.Texture)
            rightIcon.width = 100
            rightIcon.height = 100
            rightIcon.anchorOffsetX = rightIcon.width / 2
            rightIcon.anchorOffsetY = rightIcon.height / 2
            rightIcon.x = this.stageWidth - 50
            rightIcon.y = this.stageHeight / 2
            rightIcon.touchEnabled = true
            rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rightIcon, this)
            this.sprite.addChild(rightIcon)
        }
    }
}