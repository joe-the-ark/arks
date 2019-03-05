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
        private confirmButton:egret.Shape
        private confirmText:egret.TextField
        
        private chooseone:egret.TextField
        private choosetwo:egret.TextField

        private rightIcon:egret.Bitmap;

        private select_list = []
        private playerCount = 0
        private playerList = []
        private flag1 = 0
        private flag2 = 0

        private characterList = []
        private allcharacterlist = []

        private chooseText = []


        public constructor(game_secret,inviter, player, gameName, stageWidth, stageHeight,playerCount) {
            super();
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.player = player
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
            this.getCharacterList();
            this.drawSplitLine();
            // this.addTensionScale();

            this.confirmButton = new egret.Shape();
            this.confirmButton.graphics.beginFill( 0x00cc00 );
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
            this.confirmText.visible =false
            this.confirmButton.visible =false

            this.rightIcon = new egret.Bitmap(RES.getRes('right_png') as egret.Texture )
            this.rightIcon.width = 100
            this.rightIcon.height = 100
            this.rightIcon.anchorOffsetX = this.rightIcon.width/2
            this.rightIcon.anchorOffsetY = this.rightIcon.height /2 
            this.rightIcon.x = stageWidth - 50
            this.rightIcon.y = stageHeight -100
            this.rightIcon.touchEnabled = true
            this.rightIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rightNext, this)

            this.chooseone = new egret.TextField
            this.chooseone.textAlign =  egret.HorizontalAlign.CENTER
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
            this.choosetwo.textAlign =  egret.HorizontalAlign.CENTER
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

        }

        private touchone(){
            if(this.chooseText[0]){

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

        private touchtwo(){
            if(this.chooseText[1]){
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

                this.confirmButton.visible =true
                this.confirmText.visible = true

            }
        }

        private rightNext(){

                var self = this
                base.API.Init("http://127.0.0.1:8000/api/");
                base.API.call('save_players_process', {
                    'inviter_name': self.inviter, 
                    'game_secret': self.game_secret,
                    'player': self.player,
                    'game_name': self.gameName,
                    'process': '3.0'

                }).then(function (response){
                    if(self.stage){
                        let game_secret = self.game_secret
                        let inviter = self.inviter
                        let player = self.player
                        let gameName = self.gameName
                        let stageWidth = self.stageWidth
                        let stageHeight = self.stageHeight
                        let count = 0
                        let charater = new game.Character(game_secret,inviter, player, gameName, stageWidth, stageHeight, count, self.characterList);
                        self.stage.addChild(charater);
                        self.sprite.visible = false
                        self.rightIcon.visible = false
                    }   
                })
        }

        private getPlayerCharacterList(){
            var self = this
            base.API.Init("http://127.0.0.1:8000/api/");
            
            base.API.call('get_player_characterlist', {
                'game_secret':self.game_secret,
                'inviter':self.inviter,
                'player' : self.player,
                'gameName' : self.gameName,
            }).then(function (response){
                var character_list = response['data']
                character_list.forEach((val, index, array) =>{
                    var player_name = val[0]
                    if(self.playerList.indexOf(player_name) == -1){
                        self.count ++ 
                        let tensionScale = new game.TensionScale(self.stageWidth, self.stageHeight, val[1], 0)
                        self.allcharacterlist.push(val[1])
                        self.sprite.addChild(tensionScale)
                        tensionScale.x = self.stageWidth - 200
                        tensionScale.y = self.count * 150
                        self.playerList.push(player_name)
                    }
                })
                if(self.count == self.playerCount){
                    self.characterList.push(self.playerList)
                    self.characterList.push(self.allcharacterlist)
                    self.addChild(self.rightIcon)
                    self.timer.stop()
                }
            })
        }

        private startGame(game_secret: string, gameName: string, inviter: string) {

            if (this.stage) {
                let enterGame = new game.EnterGame(game_secret, gameName, inviter, this.stage.stageWidth, this.stage.stageHeight);
                this.stage.addChild(enterGame)
                this.sprite.visible = false
                this.label.visible = false
            }
        }

        private drawTitleBackground() {
            let shape1: egret.Shape = this.titleBackground;
            shape1.graphics.beginFill(0xff0000, 0.5);
            shape1.graphics.drawRect(0, 0, this.stageWidth, 130);
            shape1.graphics.endFill();
        }

        private createTitle() {
            let title: egret.TextField = new egret.TextField();
            title.text = "Task: SCREEN through the list and name the TWOSOMES of formative tensions that unite, seperate and define the organizing dynamics in your team.";
            title.size = 30;
            title.width = this.stageWidth;
            title.x = 320 - title.textWidth / 2;
            title.y = 10;
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
            base.API.Init("http://127.0.0.1:8000/api/");
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
                    unselectedCharacter.border = true;
                    unselectedCharacter.width = 100
                    unselectedCharacter.borderColor = 0x00ff00;
                    unselectedCharacter.x = 70
                    unselectedCharacter.y = 300 + index * 50;
                    unselectedCharacter.background = true;

                    unselectedCharacter.backgroundColor = 0x636363;

                    if (val.length * 18 < 100) {
                        unselectedCharacter.width = 100
                    } else {
                        unselectedCharacter.width = val.length * 18
                    }

                    var flag = 0 //0：未被点击 1：已点击
                    unselectedCharacter.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {

                        if(flag == 0){

                        }

                        if(self.chooseText.length == 2){
                            // unselectedCharacter.touchEnabled = false
                            self.chooseText.pop()
                            self.chooseText.push(unselectedCharacter.text)
                            self.select_list.push(unselectedCharacter.text)

                        }else {
                            self.chooseText.push(unselectedCharacter.text)
                            self.select_list.push(unselectedCharacter.text)
                            unselectedCharacter.backgroundColor = 0x00ff00;
                            unselectedCharacter.alpha = 0.4
                            unselectedCharacter.touchEnabled = false

                        }

                    }, this)
                    

                    // unselectedCharacter.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e) => {
                    //     self._touchStatus = true;
                    //     var dx = e.stageX
                    //     var px = unselectedCharacter.x
                    //     var py = unselectedCharacter.y
                    //     var dy = e.stageY

                    //     // unselectedCharacter.width = w * 2
                    //     // unselectedCharacter.height = h * 2

                    //     if(self.flag1 != 1 || self.flag2 != 1){
                    //         unselectedCharacter.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e) =>{
                    //             if(self._touchStatus){
                    //                 unselectedCharacter.x = e.stageX - dx + px;
                    //                 unselectedCharacter.y = e.stageY - dy + py
                    //                 // unselectedCharacter.x = e.stageX
                    //                 // unselectedCharacter.y = e.stageY
                    //             }

                    //             if(unselectedCharacter.y < 185 && unselectedCharacter.y >170 && unselectedCharacter.x > 0 && unselectedCharacter.x <80){
                    //                 if(self.flag1 == 1){
                    //                     console.log('already have')
                    //                 }else {
                    //                     self.flag1 = 1
                    //                 }
                    //                 unselectedCharacter.touchEnabled = false
                    //                 self.select_list.push(unselectedCharacter.text)
                    //                 self.chooseone.text = ''

                    //                 if(self.flag1 ==1 && self.flag2 == 1) {
                    //                     self.confirmText.visible = true
                    //                     self.confirmButton.visible =true
                    //                 }
                    //             }
                    //             else if(unselectedCharacter.y < 185 && unselectedCharacter.y >170 && unselectedCharacter.x > 210 && unselectedCharacter.x <280){
                                    
                    //                 if(self.flag2 == 1){
                    //                     console.log('already have')
                    //                 }else {
                    //                     self.flag2 = 1
                    //                 }
                    //                 unselectedCharacter.touchEnabled = false
                    //                 self.select_list.push(unselectedCharacter.text)
                    //                 self.choosetwo.text = ''
                    //                 if(self.flag1 ==1 && self.flag2 == 1) {
                    //                     self.confirmText.visible = true
                    //                     self.confirmButton.visible =true
                    //                 }
                    //             }
                    //         }, this)
                            
                    //     }else if(self.flag1 ==1 && self.flag2 == 1) {
                    //         self.confirmText.visible = true
                    //         self.confirmButton.visible =true
                    //     }
                    // }, this)
                    // unselectedCharacter.addEventListener(egret.TouchEvent.TOUCH_END, (e) => {
                    //     self._touchStatus = false;
                    //     // unselectedCharacter.width = w
                    //     // unselectedCharacter.height = h
                    //     unselectedCharacter.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);
                    // }, this);


                    self.sprite.addChild(unselectedCharacter)
                })
            })
        }

        private addTensionScale(): void {
            var self = this
            if(this.select_list.length = 2){
                base.API.Init('http://127.0.0.1:8000/api/')
                base.API.call('save_character_choose', {
                    'inviterName':self.inviter, 
                    'gameSecret':self.game_secret, 
                    'playerName':self.player, 
                    'gameName':self.gameName, 
                    'charaChooser':self.select_list
                }).then(function (response){

                    self.confirmButton.touchEnabled = false

                })
            }

            if (this.stage) {
                let tensionScale = new game.TensionScale(this.stageWidth, this.stageHeight, this.select_list, 0)
                console.log(tensionScale)
                this.sprite.addChild(tensionScale)
                tensionScale.x = this.stageWidth - 200
                tensionScale.y = (this.count+1) *150
            }

        }

        private onTouchBegin(): void {
           
            if (this.stage) {
                let inviteScene = new game.CreateGame(this.stage.stageWidth, this.stage.stageHeight);
                this.stage.addChild(inviteScene)
                this.sprite.visible = false
                this.label.visible = false
                // this.stage.removeChild( this.sprite );
            }
        }

        private onTouchEnd(): void {
            egret.log("onTouchEnd");
        }

        private onTouchMove(): void {
            egret.log("onTouchMove");
        }

        private onTouchTap(): void {
            egret.log("onTouchTap");
        }

    }
}