namespace game {

    export class CharacterChoosePage extends egret.DisplayObjectContainer {

        public sprite: egret.Sprite
        private unselectedCharacterList = []
        private selectedChaeacterList = []
        private game_secret = ''
        private gameName = ''
        public inviter = ''
        public player = ''
        public timer: egret.Timer
        public stageWidth = 0
        public stageHeight = 0
        public count = 0

        public _touchStatus: boolean = false;
        public label: egret.TextField
        private titleBackground: egret.Shape
        private confirmButton: egret.Shape
        private confirmText: egret.TextField

        private chooseone: egret.TextField
        private choosetwo: egret.TextField

        private rightIcon: egret.Bitmap;

        private select_list = []
        private playerCount = 0
        private playerList = []
        private flag1 = 0
        private flag2 = 0

        private characterList = []
        private allcharacterlist = []

        private chooseText = []
        private playerCharacterList = []

        public constructor(game_secret, inviter, player, gameName, stageWidth, stageHeight, playerCount) {
            super();
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.player = player
            console.log('player')
            console.log(player)
            this.gameName = gameName
            this.game_secret = game_secret
            this.inviter = inviter

            this.playerCount = playerCount

            this.sprite = new egret.Sprite();
            this.addChild(this.sprite);
            this.sprite.touchEnabled = true;

            this.titleBackground = new egret.Shape();
            this.sprite.addChild(this.titleBackground);
            this.drawTitleBackground();
            this.createTitle();
            
            this.drawSplitLine();
            // this.addTensionScale();
            this.getCharacterList();
            this.confirmButton = new egret.Shape();
            this.confirmButton.graphics.beginFill(0x00cc00);
            this.confirmButton.graphics.drawRect(0, 0, 200, 50);
            this.confirmButton.graphics.endFill();
            // this.confirmButton.x = unselectedCharacter.x;
            this.confirmButton.y = 230;
            this.confirmButton.x = 100;
            this.confirmButton.touchEnabled = true;
            // this.nextTouch.bind(this.a);
            // this.nextTouch(a, e:event);
            this.confirmButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addTensionScale, this);
            this.confirmText = new egret.TextField();
            this.confirmText.text = 'Confirm';
            this.confirmText.size = 30;

            this.confirmText.x = this.confirmButton.x + 50;
            this.confirmText.y = this.confirmButton.y + 10;

            this.sprite.addChild(this.confirmButton);
            this.sprite.addChild(this.confirmText);
            this.confirmText.visible = false
            this.confirmButton.visible = false

            this.rightIcon = new egret.Bitmap(RES.getRes('right_png') as egret.Texture)
            this.rightIcon.width = 100
            this.rightIcon.height = 100
            this.rightIcon.anchorOffsetX = this.rightIcon.width / 2
            this.rightIcon.anchorOffsetY = this.rightIcon.height / 2
            this.rightIcon.x = stageWidth - 50
            this.rightIcon.y = stageHeight - 100
            this.rightIcon.touchEnabled = true
            this.rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rightNext, this)

            this.chooseone = new egret.TextField
            this.chooseone.textAlign = egret.HorizontalAlign.CENTER
            this.chooseone.textAlign = egret.VerticalAlign.MIDDLE
            this.chooseone.size = 30
            this.chooseone.text = 'point & click'
            this.chooseone.lineSpacing = 10
            this.chooseone.border = true;
            this.chooseone.width = 190
            this.chooseone.borderColor = 0x3A5FCD
            this.chooseone.height = 40
            this.chooseone.y = 170
            this.chooseone.touchEnabled = true
            this.chooseone.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchone, this)
            this.sprite.addChild(this.chooseone)

            this.choosetwo = new egret.TextField
            this.choosetwo.textAlign = egret.HorizontalAlign.CENTER
            this.chooseone.textAlign = egret.VerticalAlign.BOTTOM
            this.choosetwo.size = 30
            this.choosetwo.lineSpacing = 10
            this.choosetwo.text = 'point & click'
            this.choosetwo.border = true;
            this.choosetwo.width = 190
            this.choosetwo.borderColor = 0x3A5FCD
            this.choosetwo.height = 40
            this.choosetwo.y = 170
            this.choosetwo.x = 210
            this.choosetwo.touchEnabled = true
            this.choosetwo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchtwo, this)
            this.sprite.addChild(this.choosetwo)

            this.timer = new egret.Timer(1000, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.getPlayerCharacterList, this);
            this.timer.start()

            let probessBar = new game.ProcessBar(stageWidth, stageHeight, 20, 'Mission 1 > Tension Scales')
            this.sprite.addChild(probessBar)
            // this.createChildren()
            // this.createScrollableCharacterList()
        }

        private touchone() {
            if (this.chooseText[0]) {

                this.chooseone.text = ''
                var selectedCharacter: egret.TextField = new egret.TextField()
                selectedCharacter.text = this.chooseText[0]
                selectedCharacter.textAlign = egret.HorizontalAlign.CENTER
                selectedCharacter.size = 30
                selectedCharacter.lineSpacing = 10
                // selectedCharacter.touchEnabled = true
                selectedCharacter.border = true;
                selectedCharacter.width = this.chooseone.width
                selectedCharacter.height = this.chooseone.height
                selectedCharacter.background = true;
                selectedCharacter.borderColor = 0x636363;
                selectedCharacter.backgroundColor = 0x7171C6;
                selectedCharacter.x = this.chooseone.x
                selectedCharacter.y = this.chooseone.y
                this.sprite.addChild(selectedCharacter)
            }
        }
        private touchtwo() {
            if (this.chooseText[1]) {
                this.choosetwo.text = ''
                var selectedCharacter: egret.TextField = new egret.TextField()
                selectedCharacter.text = this.chooseText[1]
                selectedCharacter.textAlign = egret.HorizontalAlign.CENTER
                selectedCharacter.size = 30
                selectedCharacter.lineSpacing = 10
                // selectedCharacter.touchEnabled = true
                selectedCharacter.border = true;
                selectedCharacter.width = this.choosetwo.width
                selectedCharacter.height = this.choosetwo.height
                selectedCharacter.background = true;
                selectedCharacter.borderColor = 0x636363;
                selectedCharacter.backgroundColor = 0x7171C6;
                selectedCharacter.x = this.choosetwo.x
                selectedCharacter.y = this.choosetwo.y
                this.sprite.addChild(selectedCharacter)
                this.confirmButton.visible = true
                this.confirmText.visible = true

            }
        }

        private rightNext() {
            var self = this
            base.API.Init("http://work.metatype.cn:8105/api/");
            base.API.call('save_players_process', {
                'inviter_name': self.inviter,
                'game_secret': self.game_secret,
                'player': self.player,
                'game_name': self.gameName,
                'process': '0.3'
            }).then(function (response) {
                if (self.stage) {
                    let game_secret = self.game_secret
                    let inviter = self.inviter
                    let player = self.player
                    let gameName = self.gameName
                    let stageWidth = self.stageWidth
                    let stageHeight = self.stageHeight
                    let count = 0

                    self.characterList.push(self.playerList)
                    self.characterList.push(self.allcharacterlist)
                    self.timer.stop()
                    let playerAndOthersCharacterList = []
                    let otherCharacterList = []
                    let othersList = []
                    let characterList = []

                    self.playerList.forEach((val, index, array) => {

                        if(val == player){
                            playerAndOthersCharacterList.push(val)
                            playerAndOthersCharacterList.push(self.allcharacterlist[index])
                        }else {
                            othersList.push(val)
                            characterList.push(self.allcharacterlist[index])
                        }
                    })
                    otherCharacterList.push(othersList)
                    otherCharacterList.push(characterList)
                    playerAndOthersCharacterList.push(otherCharacterList)
                    console.log(playerAndOthersCharacterList)
                    
                    let charater = new game.Character(game_secret, inviter, player, gameName, stageWidth, stageHeight, count, self.characterList, playerAndOthersCharacterList);
                    self.stage.addChild(charater);
                    self.sprite.visible = false
                    self.rightIcon.visible = false

                }

            })
        }
        private getPlayerCharacterList() {
            var self = this
            base.API.Init("http://work.metatype.cn:8105/api/");
            base.API.call('get_player_characterlist', {
                'game_secret': self.game_secret,
                'inviter': self.inviter,
                'player': self.player,
                'gameName': self.gameName,
            }).then(function (response) {

                var character_list = response['data']
                console.log(character_list)
                character_list.forEach((val, index, array) => {
                    var player_name = val[0]
                    //如果玩家已选择scale
                    if(player_name == self.player){
                        self.select_list = val[1]
                        console.log(self.select_list)
                        self.sprite.addChild(self.rightIcon)
                        self.playerCharacterList = val[1]
                    }
                    if (self.playerList.indexOf(player_name) == -1) {
                        self.count++
                        let tensionScale = new game.TensionScale(self.stageWidth, self.stageHeight, val[1], 0, 0, 0, 0)
                        self.allcharacterlist.push(val[1])
                        self.sprite.addChild(tensionScale)
                        tensionScale.x = self.stageWidth - 200
                        tensionScale.y = self.count * 150
                        self.playerList.push(player_name)
                    }
                })
                // if (self.count == self.playerCount) {
                // self.characterList.push(self.playerList)
                // self.characterList.push(self.allcharacterlist)
                // }
            })
        }

        private drawTitleBackground() {
            let shape1: egret.Shape = this.titleBackground;
            shape1.graphics.beginFill(0x359f93, 0.5);
            shape1.graphics.drawRect(0, 0, this.stageWidth, 130);
            shape1.graphics.endFill();
        }

        private createTitle() {
            let title: egret.TextField = new egret.TextField();
            title.text = "Task: screen through the list and name the twosomes of formative tensions that unite, seperate and define the organizing dynamics in your team.";
            title.size = 25;
            title.width = this.stageWidth;
            title.x = 320 - title.textWidth / 2;
            title.y = 50;
            this.sprite.addChild(title);
        }

        private drawSplitLine() {
            let splitLine: egret.Shape = new egret.Shape();
            splitLine.graphics.lineStyle(2, 0xffffff)
            splitLine.graphics.moveTo(400, this.stageHeight)
            splitLine.graphics.lineTo(400, 130)
            splitLine.graphics.endFill()
            this.sprite.addChild(splitLine)
        }

        private getCharacterList(): void {
            base.API.Init("http://work.metatype.cn:8105/api/");
            const self = this;
            base.API.call('get_character_list', {}).then(function (response) {
                self.unselectedCharacterList = response['characters']
                self.unselectedCharacterList.forEach((val, index, array) => {
                    var unselectedCharacter: egret.TextField = new egret.TextField()
                    unselectedCharacter.text = val
                    unselectedCharacter.textAlign = egret.HorizontalAlign.CENTER
                    unselectedCharacter.size = 30
                    unselectedCharacter.lineSpacing = 10
                    unselectedCharacter.touchEnabled = true
                    unselectedCharacter.width = 100
                    unselectedCharacter.border = true;
                    unselectedCharacter.borderColor = 0x00ff00;
                    unselectedCharacter.x = 50
                    unselectedCharacter.y = 300 + index * 50;
                    unselectedCharacter.background = true;
                    unselectedCharacter.backgroundColor = 0x636363;
                    self.sprite.addChild(unselectedCharacter)

                    if (val.length * 18 < 100) {
                        unselectedCharacter.width = 100
                    } else {
                        unselectedCharacter.width = val.length * 18
                    }

                    var flag = 0 //0：未被点击 1：已点击
                    unselectedCharacter.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {

                        if (flag == 0) {}

                        if (self.chooseText.length == 2) {
                            // unselectedCharacter.touchEnabled = false
                            self.chooseText.pop()
                            self.chooseText.push(unselectedCharacter.text)
                            self.select_list.push(unselectedCharacter.text)
                        } else {
                            self.chooseText.push(unselectedCharacter.text)
                            self.select_list.push(unselectedCharacter.text)
                            unselectedCharacter.backgroundColor = 0x00ff00;
                            unselectedCharacter.alpha = 0.4
                            unselectedCharacter.touchEnabled = false
                        }

                    }, this)

                    unselectedCharacter.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e) => {
                        self._touchStatus = true;
                        var dx = e.stageX
                        var px = unselectedCharacter.x
                        var py = unselectedCharacter.y
                        var dy = e.stageY

                        // unselectedCharacter.width = w * 2
                        // unselectedCharacter.height = h * 2

                        if(self.flag1 != 1 || self.flag2 != 1){
                            unselectedCharacter.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e) =>{
                                if(self._touchStatus){
                                    unselectedCharacter.x = e.stageX - dx + px;
                                    unselectedCharacter.y = e.stageY - dy + py
                                    // unselectedCharacter.x = e.stageX
                                    // unselectedCharacter.y = e.stageY
                                }
                                if(unselectedCharacter.y < 185 && unselectedCharacter.y >170 && unselectedCharacter.x > 0 && unselectedCharacter.x <80){
                                    if(self.flag1 == 1){
                                        console.log('already have')
                                    }else {
                                        self.flag1 = 1
                                    }
                                    unselectedCharacter.touchEnabled = false
                                    self.select_list.push(unselectedCharacter.text)
                                    self.chooseone.text = ''

                                    if(self.flag1 ==1 && self.flag2 == 1) {
                                        self.confirmText.visible = true
                                        self.confirmButton.visible =true
                                    }
                                }
                                else if(unselectedCharacter.y < 185 && unselectedCharacter.y >170 && unselectedCharacter.x > 210 && unselectedCharacter.x <280){

                                    if(self.flag2 == 1){
                                        console.log('already have')
                                    }else {
                                        self.flag2 = 1
                                    }
                                    unselectedCharacter.touchEnabled = false
                                    self.select_list.push(unselectedCharacter.text)
                                    self.choosetwo.text = ''
                                    if(self.flag1 ==1 && self.flag2 == 1) {
                                        self.confirmText.visible = true
                                        self.confirmButton.visible =true
                                    }
                                }
                            }, this)

                        }else if(self.flag1 ==1 && self.flag2 == 1) {
                            self.confirmText.visible = true
                            self.confirmButton.visible =true
                        }
                    }, this)

                    unselectedCharacter.addEventListener(egret.TouchEvent.TOUCH_END, (e) => {
                        self._touchStatus = false;
                        // unselectedCharacter.width = w
                        // unselectedCharacter.height = h
                        unselectedCharacter.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
                    }, this);

                    // }
                    

                })
            })


        }


    //     private list: eui.List;
    //     protected createScrollableCharacterList() {
    //         let group = new eui.Group()
    //         let exml = `
    //         <e:Skin xmlns:e="http://ns.egret.com/eui" states="up,down" height="50">
    //             <e:Label text="{data}" textColor.down="0xFFFFFF" textColor.up="0x666666" horizontalCenter="0" verticalCenter="0"/> 
    //         </e:Skin>`;
    //         let list = new eui.List()
    //         list.dataProvider = new eui.ArrayCollection([
    //             "accuracy", "adventurousness", "altruism",
    //             "ambition", "autonomy", "avant-garde",
    //             "beauty", "carefulness", "change",
    //             "commitment", "companionship", "composure",
    //             "connectedness", "control", "conviviality",
    //             "cordiality", "courage", "creativity",
    //             "curative", "curiosity", "development",
    //             "dirruption", "dominance", "economy",
    //             "efficiency", "effort", "effortlessness",
    //             "ego", "elitism", "enforcement",
    //             "fairness", "family", "fantasy",
    //             "fighting", "flexibility", "freedom",
    //             "generosity", "glory", "harmony",
    //             "health", "honor", "humanity",
    //             "humor", "invasiveness", "joy",
    //             "learning", "logic", "loyalty",
    //             "mindfulness", "narcissism", "nostalgia",
    //             "obedience", "openness", "originality",
    //             "pain", "passion", "patience",
    //             "performance", "persistence", "pleasure",
    //             "power", "pride", "purity",
    //             "quality", "rank", "reliability",
    //             "responsibility", "role", "security",
    //             "sensuality", "spontaneity", "submission",
    //             "sustainability", "thrill", "tolerance",
    //             "tradition", "trust", "truth", "winning"])
    //         list.itemRendererSkinName = exml
    //         list.allowMultipleSelection = true
    //         group.addChild(list)
    //         this.list = list
    //         list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChange, this)
    //         let myScroller = new eui.Scroller()
    //         myScroller.width = 300
    //         myScroller.height = 700
    //         myScroller.x = 75
    //         myScroller.y = 300
    //         myScroller.viewport = group
    //         this.sprite.addChild(myScroller)
    //     }

    //     private onChange(e: eui.PropertyEvent): void {
    //         // 获取点击消息
    //         console.log('已选中的性格：' + this.list.selectedItems)
    //         if (this.list.selectedItems.length == 2) {
    //             this.list.touchEnabled = false
    //             // this.list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onChange, this)
    //             console.log('当前选中的索引列表长度：' + this.list.selectedIndices.length)
    //             // this.list.allowMultipleSelection = false
    //         }
    //     }

    //     private onTouchCancel(e: eui.PropertyEvent): void {
    //         if (this.list.selectedItem.length >= 2) {
    //             this.list.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onChange, this)
    //         }
    //     }

        private addTensionScale(): void {
            var self = this
            if (this.select_list.length = 2) {
                base.API.Init('http://work.metatype.cn:8105/api/')
                base.API.call('save_character_choose', {
                    'inviterName': self.inviter,
                    'gameSecret': self.game_secret,
                    'playerName': self.player,
                    'gameName': self.gameName,
                    'charaChooser': self.select_list
                }).then(function (response) {

                    self.confirmButton.touchEnabled = false

                })
            }

            if (this.stage) {
                let tensionScale = new game.TensionScale(this.stageWidth, this.stageHeight, this.select_list, 0, 0, 0, 0)
                console.log(tensionScale)
                this.sprite.addChild(tensionScale)
                tensionScale.x = this.stageWidth - 200
                tensionScale.y = (this.count + 1) * 150
            }

        }

    //     private onTouchBegin(): void {

    //         if (this.stage) {
    //             let inviteScene = new game.CreateGame(this.stage.stageWidth, this.stage.stageHeight);
    //             this.stage.addChild(inviteScene)
    //             this.sprite.visible = false
    //             this.label.visible = false
    //             // this.stage.removeChild( this.sprite );
    //         }
    //     }

    //     private onTouchEnd(): void {
    //         egret.log("onTouchEnd");
    //     }

    //     private onTouchMove(): void {
    //         egret.log("onTouchMove");
    //     }

    //     private onTouchTap(): void {
    //         egret.log("onTouchTap");
    //     }

    // }

    // export class ItemRendererDemo extends eui.Group {
    //     public constructor() {
    //         super()
    //     }
    //     protected createChildren(): void {
    //         //先创建一个数组
    //         var sourceArr: any[] = []
    //         for (var i: number = 1; i < 5; i++) {
    //             //给数据中添加一个含有"label"属性的对象
    //             sourceArr.push({ label: "item" + i })
    //         }
    //         //用ArrayCollection包装
    //         var myCollection: eui.ArrayCollection = new eui.ArrayCollection(sourceArr)
    //         var dataGroup: eui.DataGroup = new eui.DataGroup()
    //         dataGroup.dataProvider = myCollection
    //         this.addChild(dataGroup)
    //         var exml = `
    //         <e:Skin xmlns:e="http://ns.egret.com/eui"> 
    //             <e:Image source="resource/assets/frame.png"/> 
    //             <e:Label textColor="0xfd0000" text="{data.label}"/> 
    //         </e:Skin>`
    //         dataGroup.itemRenderer = LabelRenderer
    //         //dataGroup.itemRendererSkinName = exml//也可以直接设置 exml 文件做为 ItemRenderer
    //     }
    // }

    // export class LabelRenderer extends eui.ItemRenderer {
    //     private labelDisplay: eui.Label
    //     public constructor() {
    //         super()
    //         //自定义的 ItemRenderer
    //         this.touchChildren = true
    //         var bg = new eui.Image("resource/assets/frame.png")
    //         this.labelDisplay = new eui.Label()
    //         this.labelDisplay.textColor = 0xfd0000
    //         this.addChild(this.labelDisplay)
    //     }
    //     protected dataChanged(): void {
    //         //数据改变时，会自动调用 dataChanged 这个方法
    //         //显示数据中的 label 值
    //         this.labelDisplay.text = this.data.label
    //     }
    }
}