namespace game {
    export class DigestAdd extends egret.DisplayObjectContainer {
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
        private noticeHeight = 90
        private _x = 20
        private _margin = 20
        private noticeBox: egret.TextField
        public result = []
        private rightIcon: egret.Bitmap;
        public constructor(stageWidth, stageHeight,result, inviter, game_secret, gameName, player) {
            super()
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.sprite = new egret.Sprite()

            this.inviter = inviter
            this.player = player
            this.game_secret = game_secret
            this.gameName = gameName

            this.result =result
            this.addChild(this.sprite)
            this.processBar()
            this.notice()
            this.add()
            this.addFeedback()
            this.rightIcon = new egret.Bitmap(RES.getRes("right_png") as egret.Texture)
            this.rightIcon.width = 100
            this.rightIcon.height = 100
            this.rightIcon.anchorOffsetX = this.rightIcon.width / 2
            this.rightIcon.anchorOffsetY = this.rightIcon.height / 2
            this.rightIcon.x = this.stageWidth - 50
            this.rightIcon.y = this.stageHeight / 2
            this.rightIcon.touchEnabled = true
            this.rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextPage, this)
            this.sprite.addChild(this.rightIcon)
        }

        private processBar(): void {
            let processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 85, "Mission 2 > Digest ADD")
            this.sprite.addChild(processBar)
        }

        private notice(): void {
            this.noticeBox = new egret.TextField()
            this.noticeBox.text = "Digest your 1 to 1 Feedback. Keep in mind: Feedback is a present from the heart. Direct feedback expresses care for your\nrelationship."
            this.noticeBox.textColor = 0x000000
            this.noticeBox.width = this._width
            this.noticeBox.x = this._x
            this.noticeBox.y = 60
            this.noticeBox.background = true
            this.noticeBox.backgroundColor = 0xffcc33
            this.sprite.addChild(this.noticeBox)
        }

        private add(): void {
            let add: egret.TextField = new egret.TextField()
            add.text = "I would \nLOVE \nyou\neven\nmore,\nif..."
            add.size = 30
            add.x = this._x
            add.y = this.noticeBox.height + 80
            this.sprite.addChild(add)
        }

        private addFeedback(): void {
            let group = new eui.Group()
            let exml = `
                        <e:Skin xmlns:e="http://ns.egret.com/eui" states="up,down" height="50">
                            <e:Label text="{data}" textColor.down="0xFFFFFF" textColor.up="0x666666" horizontalCenter="0" verticalCenter="0"/> 
                        </e:Skin>`;
            let list = new eui.List()
            let addFeedback = this.result[1]
            list.dataProvider = new eui.ArrayCollection(addFeedback)
            list.itemRendererSkinName = exml
            group.addChild(list)

            let myScroller = new eui.Scroller()
            myScroller.width = 470
            myScroller.height = this.stageHeight - 300
            myScroller.x = 130 + this._margin
            myScroller.y = this.noticeBox.height + 80
            myScroller.viewport = group
            this.sprite.addChild(myScroller)
        }

  
        private nextPage(){
            this.rightIcon.touchEnabled = false
            base.API.call('save_players_process', { 
                    'inviter_name': this.inviter, 
                    'game_secret': this.game_secret,
                    'player': this.player,
                    'game_name': this.gameName,
                    'process': '7'
                }).then(function (response){
                
                })
            this.sprite.visible = false
            this.removeChild(this.sprite)
            let digestAsk =  new game.DigestAsk(this.stageWidth, this.stageHeight, this.result, this.inviter, this.game_secret, this.gameName, this.player)
            this.stage.addChild(digestAsk)

        }
    }
}