namespace game {
    export class AffinityMapping extends egret.DisplayObjectContainer {
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
        public player_list = []


        public text:egret.TextField

        public choose

        public votingPlayerName: egret.TextField
        public constructor(stageWidth, stageHeight, player_list) {
            super()
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.sprite = new egret.Sprite()

            this.player_list =player_list

            this.text = new egret.TextField()
            this.text.text = "My relation to \nis based on..."
            this.text.width = 200
            this.text.x = this._x
            this.text.y = 200
            this.sprite.addChild(this.text)

            this.votingPlayerName = new egret.TextField()
            this.votingPlayerName.text = "Babettete"
            this.votingPlayerName.width = 120
            this.votingPlayerName.x = this._x + this.text.width
            this.votingPlayerName.y = 200
            this.sprite.addChild(this.votingPlayerName)
            

            this.addChild(this.sprite)
            this.processBar()
            this.intro()
            this.playerName()

            this.rightIcon()
        }

        private processBar(): void {
            let processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 99, "Cliffhanger > Affinity Mapping")
            this.sprite.addChild(processBar)
        }

        private intro(): void {
            let intro = new egret.TextField()
            intro.text = "Describe the nature of your relationships..."
            intro.width = this._width
            intro.x = this._x
            intro.y = 100
            this.sprite.addChild(intro)
        }

        private playerName(): void {

            // let group = new eui.Group()
            // let exml = `
            //             <e:Skin xmlns:e="http://ns.egret.com/eui" states="up,down" height="50">
            //                 <e:Label text="{data}" textColor.down="0x666666" textColor.up="0x666666" horizontalCenter="0" verticalCenter="0"/> 
            //             </e:Skin>`;
            // let list = new eui.List()
            // let addFeedback = 
            // list.dataProvider = new eui.ArrayCollection(addFeedback)
            // list.itemRendererSkinName = exml
            // group.addChild(list)

            // let myScroller = new eui.Scroller()
            // myScroller.width = 470
            // myScroller.height = this.stageHeight - 300
            // myScroller.x = 100
            // myScroller.y = 200 + 80
            // myScroller.viewport = group
            // this.sprite.addChild(myScroller)

            let emotion = ["Love", "Appreciation", "Indifference", "Hidden Conflict", "Open Conflict"]
            emotion.forEach((val, index, array) => {
                let area = new egret.TextField()
                area.text = emotion[index]
                area.width = 220
                area.height = 150
                area.x = this._x + this.text.width + this.votingPlayerName.width + this._margin
                area.y = 200 + index * 170
                area.border = true
                area.borderColor = 0x000000
                area.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chooseArea.bind(area.x, area.y), this)
                this.sprite.addChild(area)

            })
        }

        private chooseArea(x,y){

            let choose = new egret.TextField()
            choose.text = this.choose
            
            choose.width = 200
            choose.height = 50
            choose.size = 30
            choose.x = x
            choose.y = y + 50
            choose.border = true
            choose.borderColor = 0x000000
            this.sprite.addChild(choose)
        }

        private playerListMove() {
            this.player_list.forEach((val, index, array) => {
                    var player: egret.TextField = new egret.TextField()
                    player.text = val
                    player.textAlign = egret.HorizontalAlign.CENTER
                    player.size = 30
                    player.lineSpacing = 10
                    player.touchEnabled = true
                    player.width = 100
                    player.border = true;
                    player.borderColor = 0x00ff00;
                    player.x = 100
                    player.y = 250 + index * 50;
                    player.background = true;
                    player.backgroundColor = 0x636363;
                    this.sprite.addChild(player)

                    if (val.length * 18 < 100) {
                        player.width = 100
                    } else {
                        player.width = val.length * 18
                    }

                    var flag = 0 //0：未被点击 1：已点击
                    player.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {

                            player.backgroundColor = 0x00ff00;
                            player.alpha = 0.4
                            player.touchEnabled = false
                            this.votingPlayerName.text = player.text
                            this.choose = player.text
                    }, this)
            })
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
            rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextPage, this)
            this.sprite.addChild(rightIcon)
        }


        private nextPage(){
            let digestAsk =  new game.Complete(this.stageWidth, this.stageHeight)
            this.stage.addChild(digestAsk)
            this.sprite.visible = false
        }







    }
}