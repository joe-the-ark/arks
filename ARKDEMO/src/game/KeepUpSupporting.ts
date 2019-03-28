namespace game {
    export class KeepUpSupporting extends egret.DisplayObjectContainer {
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
        private noticeHeight = 120
        private _x = 20
        private _margin = 20
        private noticeBox: egret.TextField
        public timer: egret.Timer
        private characterListParams = []
        private votedScalesNumber = 1
        private scalesNumber = 7
        private remainingScalesNumber = this.scalesNumber - this.votedScalesNumber
        public ttsms = []
        public constructor(stageWidth, stageHeight, process, missionName) {
            super()
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.sprite = new egret.Sprite()
            this.addChild(this.sprite)
            this.processBar()
            this.notice()
            this.background()
            this.remainingPlayers()
            this.votedPlayers()
            this.rightIcon()
            this.timer = new egret.Timer(1000, 0);
            // this.timer.addEventListener(egret.TimerEvent.TIMER, this.getGameResult, this);
            this.timer.start()
        }

        private processBar(): void {
            let processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 55, "Mission 2 > Keep Up Voting")
            this.sprite.addChild(processBar)
        }

        private notice(): void {
            let votedScalesNumber = this.votedScalesNumber.toString()
            let scalesNumber = this.scalesNumber.toString()
            let remainingScalesNumber = this.remainingScalesNumber.toString()
            this.noticeBox = new egret.TextField()
            this.noticeBox.text = "Great! You answered " + votedScalesNumber.toString() + " out of " + scalesNumber.toString() + " Feedbacks. Fill in the remaining " + remainingScalesNumber.toString() + " to finish Mission 2 and Embrace your teammates anonymous Feedback for a better deployment of the team's potentialities.!"
            this.noticeBox.textColor = 0x000000
            this.noticeBox.width = this._width
            this.noticeBox.height = this.noticeHeight
            this.noticeBox.x = this._x
            this.noticeBox.y = 60
            this.noticeBox.background = true
            this.noticeBox.backgroundColor = 0xffcc33
            this.sprite.addChild(this.noticeBox)
        }

        private background(): void {
            let grey: egret.Shape = new egret.Shape()
            grey.x = this._x / 2  // 20会多
            grey.y = this.noticeBox.height - 20  // 减掉多的空白
            grey.graphics.beginFill(0xcccccc, 1)
            grey.graphics.drawRect(grey.x, grey.y, 380, this.stageHeight)
            grey.graphics.endFill()
            this.sprite.addChild(grey)

            let orange: egret.Shape = new egret.Shape()
            orange.x = this._x / 2 + grey.width / 2 + this._margin / 2
            orange.y = this.noticeBox.height - 20
            orange.graphics.beginFill(0xffcc33, 1)
            orange.graphics.drawRect(orange.x, orange.y, 200, this.stageHeight)
            orange.graphics.endFill()
            this.sprite.addChild(orange)
        }

        private remainingPlayers(): void {  // 未被投票的玩家名
            let group = new eui.Group()
            let exml = `
                        <e:Skin xmlns:e="http://ns.egret.com/eui" states="up,down" height="50">
                            <e:Label text="{data}" textColor.down="0xFFFFFF" textColor.up="0x666666" horizontalCenter="0" verticalCenter="0"/> 
                        </e:Skin>`;
            let list = new eui.List()
            let remainingPlayers = [
                "Joe", "Oliver", "Jake",
                "Callum", "Jacob", "Noah",
                "Liam", "Mason", "James",
                "William", "Thomas", "Charles",
                "Joseph", "Richard", "David",
                "Joe", "Oliver", "Jake",
                "Callum", "Jacob", "Noah",
                "Liam", "Mason", "James",
                "William", "Thomas", "Charles",
                "Joseph", "Richard", "David",
            ]
            list.dataProvider = new eui.ArrayCollection(remainingPlayers)
            list.itemRendererSkinName = exml
            group.addChild(list)

            let myScroller = new eui.Scroller()
            myScroller.width = 380
            myScroller.height = this.stageHeight - 80 - this.noticeBox.height
            myScroller.x = myScroller.width / 2 - 40
            myScroller.y = this.noticeBox.height + 80
            myScroller.viewport = group
            this.sprite.addChild(myScroller)
        }

        private votedPlayers(): void {  // 已被投票的玩家名
            let group = new eui.Group()
            let exml = `
                        <e:Skin xmlns:e="http://ns.egret.com/eui" states="up,down" height="50">
                            <e:Label text="{data}" textColor.down="0xFFFFFF" textColor.up="0x666666" horizontalCenter="0" verticalCenter="0"/> 
                        </e:Skin>`;
            let list = new eui.List()
            let votedPlayers = [
                "Joe", "Oliver", "Jake",
            ]
            list.dataProvider = new eui.ArrayCollection(votedPlayers)
            list.itemRendererSkinName = exml
            group.addChild(list)

            let myScroller = new eui.Scroller()
            myScroller.width = 380
            myScroller.height = this.stageHeight - 80 - this.noticeBox.height
            myScroller.x = this.stageWidth - myScroller.width / 2 + 30
            myScroller.y = this.noticeBox.height + 80
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
            rightIcon.y = this.stageHeight - 50
            rightIcon.touchEnabled = true
            rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rightIcon, this)
            this.sprite.addChild(rightIcon)
        }
    }
}