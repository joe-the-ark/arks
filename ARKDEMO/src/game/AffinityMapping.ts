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
        public constructor(stageWidth, stageHeight) {
            super()
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.sprite = new egret.Sprite()

            this.addChild(this.sprite)
            this.processBar()
            this.intro()
            this.playerName()
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
            let text = new egret.TextField()
            text.text = "My relation to \nis based on..."
            text.width = 200
            text.x = this._x
            text.y = 200
            this.sprite.addChild(text)

            let votingPlayerName = new egret.TextField()
            votingPlayerName.text = "Babettete"
            votingPlayerName.width = 120
            votingPlayerName.x = this._x + text.width
            votingPlayerName.y = 200
            this.sprite.addChild(votingPlayerName)

            let group = new eui.Group()
            let exml = `
                        <e:Skin xmlns:e="http://ns.egret.com/eui" states="up,down" height="50">
                            <e:Label text="{data}" textColor.down="0x666666" textColor.up="0x666666" horizontalCenter="0" verticalCenter="0"/> 
                        </e:Skin>`;
            let list = new eui.List()
            let addFeedback = [
                "Jung", "James", "Element",
                "Sidorica", "Andy", "Nuby",
                "Jung", "James", "Element",
                "Sidorica", "Andy", "Nuby",
                "Jung", "James", "Element",
                "Sidorica", "Andy", "Nuby",
            ]
            list.dataProvider = new eui.ArrayCollection(addFeedback)
            list.itemRendererSkinName = exml
            group.addChild(list)

            let myScroller = new eui.Scroller()
            myScroller.width = 470
            myScroller.height = this.stageHeight - 300
            myScroller.x = 100
            myScroller.y = 200 + 80
            myScroller.viewport = group
            this.sprite.addChild(myScroller)

            let emotion = ["Love", "Appreciation", "Indifference", "Hidden Conflict", "Open Conflict"]
            emotion.forEach((val, index, array) => {
                let area = new egret.TextField()
                area.text = emotion[index]
                area.width = 220
                area.height = 150
                area.x = this._x + text.width + votingPlayerName.width + this._margin
                area.y = 200 + index * 170
                area.border = true
                area.borderColor = 0x000000
                this.sprite.addChild(area)
            })


        }
    }
}