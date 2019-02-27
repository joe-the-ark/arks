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

        private rightIcon:egret.Bitmap;

        private select_list = []
        private playerCount = 0
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
            this.confirmButton.y = 200;
            this.confirmButton.touchEnabled = true;
            // this.nextTouch.bind(this.a);
            // this.nextTouch(a, e:event);
            this.confirmButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addTensionScale, this);
            this.confirmText = new egret.TextField();
            this.confirmText.text = 'Confirm';
            this.confirmText.size = 30;
            // this.confirmText.x = unselectedCharacter.x + 50;
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

        }

        private getPlayerCharacterList(){
            var self = this
            base.API.Init("http://39.104.85.167:8105/api/");
            base.API.call('get_player_characterlist', {
                'game_secret':self.game_secret,
                'inviter':self.inviter,
                'player' : self.player,
                'gameName' : self.gameName,
            }).then(function (response){
                var character_list = response['data']
                var count = 0
                character_list.forEach((val, index, array) =>{
                    var player_name = val[0]

                    console.log(count)

                    if(player_name != self.player){
                        count ++ 
                        let tensionScale = new game.TensionScale(self.stageWidth, self.stageHeight, val[1])
                        self.stage.addChild(tensionScale)
                        tensionScale.x = self.stageWidth - 200
                        tensionScale.y = 180 + count * 150
                        
                    }

                    if(count+1 == self.playerCount){
                    
                        self.addChild(self.rightIcon)

                    }

                })

                


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
            shape1.graphics.beginFill(0x00ff00, 0.5);
            shape1.graphics.drawRect(0, 0, this.stageWidth, 130);
            shape1.graphics.endFill();
        }

        private createTitle() {
            let title: egret.TextField = new egret.TextField();
            title.text = "Choose 2 kinds of character";
            title.size = 30;
            title.width = 480;
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
            // base.API.Init("http://39.104.85.167:8105/api/");
            base.API.Init("http://39.104.85.167:8105/api/");
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

                    let player_score: egret.TextField = new egret.TextField()
                    player_score.text = ''
                    player_score.size = 30
                    player_score.border = true;
                    player_score.width = 50
                    player_score.borderColor = 0x00ff00;
                    player_score.textAlign = egret.HorizontalAlign.CENTER

                    var flag = 0;
                    unselectedCharacter.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
                        // console.log(self.count)
                        // var confirmButton: egret.Shape = new egret.Shape();
                        // confirmButton.graphics.beginFill( 0x00cc00 );
                        // confirmButton.graphics.drawRect(0, 0, 200, 50);
                        // confirmButton.graphics.endFill();
                        // confirmButton.y = 200;
                        // confirmButton.touchEnabled = true;
                        // // this.nextTouch.bind(this.a);
                        // // this.nextTouch(a, e:event);
                        // confirmButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.addTensionScale, self);
                        // var confirmText: egret.TextField = new egret.TextField();
                        // confirmText.text = 'Confirm';
                        // confirmText.size = 30;
                        
                        // confirmText.y = confirmButton.y + 10;
                        // self.sprite.addChild(confirmButton);
                        // self.sprite.addChild(confirmText);
                        // confirmText.visible =false
                        // confirmButton.visible =false

                        self.count++
                        if (self.count == 1){
                            unselectedCharacter.backgroundColor = 0x00cc00;

                            self.select_list.push(unselectedCharacter.text)

                            // unselectedCharacter.touchEnabled = false
                        }
                        else if(self.count == 2){

                            self.select_list.push(unselectedCharacter.text)
                            unselectedCharacter.backgroundColor = 0x00cc00;
                            unselectedCharacter.touchEnabled = false
                            self.confirmButton.x = unselectedCharacter.x;
                            self.confirmText.x = unselectedCharacter.x + 50;
                            self.confirmButton.visible =true
                            self.confirmText.visible=true

                        }
                        
                        
                        // if(self.count == 2){
                        
                        // }else {
                        //     self.confirmButton.visible =false
                        //     self.confirmText.visible=false
                        // }
                        // if (flag == 0) {
                        //     unselectedCharacter.backgroundColor = 0x00cc00;
                        //     flag = 1;

                        //     unselectedCharacter.touchEnabled=false

                            
                        // } else {
                        //     unselectedCharacter.backgroundColor = 0x636363;
                        //     flag = 0;
                        // }

                    }, this);
                    
                    function confirmButton() {
                        console.log("1231231231")
                    }

                    self.sprite.addChild(unselectedCharacter)
                })
            })
        }
        private addTensionScale(): void {

            var self = this

            if(this.select_list.length = 2){
                // console.log()
                console.log(1111111111)
                base.API.Init('http://39.104.85.167:8105/api/')
                base.API.call('save_character_choose', {
                    'inviterName':self.inviter, 
                    'gameSecret':self.game_secret, 
                    'playerName':self.player, 
                    'gameName':self.gameName, 
                    'charaChooser':self.select_list
                }).then(function (response){
                    self.timer = new egret.Timer(1000, 0);
                    self.timer.addEventListener(egret.TimerEvent.TIMER, self.getPlayerCharacterList, self);
                    self.timer.start()
                })
            }

            

            if (this.stage) {
                let tensionScale = new game.TensionScale(this.stageWidth, this.stageHeight, this.select_list)
                console.log(tensionScale)
                this.stage.addChild(tensionScale)
                tensionScale.x = this.stageWidth - 200
                tensionScale.y = 180

            }

        }

        private onTouchBegin(): void {
            console.log(this.stage)
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