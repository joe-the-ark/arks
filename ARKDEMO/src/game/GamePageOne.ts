namespace game {

    export class GamePageOne extends egret.DisplayObjectContainer {

        private sprite: egret.Sprite
        private playerList = []
        private game_secret = ''
        private player = ''
        public gameName = ''
        public inviter = ''
        public stageWidth = 0
        public stageHeight = 0

        public characterTwo = 'Fully'
        public characterOne = 'Insufficiently'

        public _touchStatus:boolean = false;
        public _distance:egret.Point = new egret.Point();
        private _shape:egret.Shape; 

        private rectShapeOne: egret.Shape;
        private rectShapeTwo: egret.Shape

        private charater2: egret.TextField

        private rightIcon: egret.Bitmap;
        private closeIcon: egret.Bitmap;

        private tiptext: egret.TextField

        private characterList = []
        private map:{[key:string] : string} = {}
        public constructor(game_secret,inviter, player, gameName, stageWidth, stageHeight) {
            
            super();
            this.game_secret = game_secret
            this.player = player
            this.gameName = gameName
            this.inviter = inviter

            this.stageWidth = stageWidth
            this.stageHeight = stageHeight

            this.sprite = new egret.Sprite();
            this.sprite.width = stageWidth
            this.sprite.height = stageHeight
            this.sprite.x = 0
            this.sprite.y = 0
            this.addChild(this.sprite);
            this.sprite.addEventListener(egret.Event.ADDED_TO_STAGE, this.getPlayList, this)

            this.rectShapeOne = new egret.Shape();
            this.rectShapeTwo = new egret.Shape();
            this.sprite.addChild(this.rectShapeOne);
            this.sprite.addChild(this.rectShapeTwo);
            this.drawRect()


            var character1:egret.TextField = new egret.TextField()
            character1.text = 'Insufficiently'

            character1.textAlign = egret.HorizontalAlign.CENTER
            character1.size = 40
            character1.border = true
            character1.width = 280
            character1.borderColor = 0x3A5FCD;
            character1.x = stageWidth - 390
            character1.y = 200
            this.sprite.addChild(character1)

            this._shape = new egret.Shape();
            this.addChild(this._shape);
            this.initGraphics();

            this.charater2 = new egret.TextField();
            this.sprite.addChild(this.charater2)
            this.initCharacter(stageWidth - 390, this.stageHeight - 150)

            this.rightIcon = new egret.Bitmap(RES.getRes('right_png') as egret.Texture)
            this.rightIcon.width = 100
            this.rightIcon.height = 100
            this.rightIcon.anchorOffsetX = this.rightIcon.width / 2
            this.rightIcon.anchorOffsetY = this.rightIcon.height / 2
            this.rightIcon.x = stageWidth - 50
            this.rightIcon.y = stageHeight / 2
            this.rightIcon.touchEnabled = true
            this.rightIcon.visible = false
            this.addChild(this.rightIcon)

            this.rightIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.nextTouch, this)

            this.closeIcon = new egret.Bitmap(RES.getRes('close-circle_png') as egret.Texture)
            this.closeIcon.width = 40
            this.closeIcon.height = 40
            this.closeIcon.anchorOffsetX = this.closeIcon.width / 2
            this.closeIcon.anchorOffsetY = this.closeIcon.height / 2
            this.closeIcon.x = stageWidth - 30
            this.closeIcon.y = 150
            this.closeIcon.touchEnabled = true
            this.closeIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.closeTip, this)
            this.addChild(this.closeIcon)
            
            this.tiptext = new egret.TextField()
            this.addChild(this.tiptext)
            var msg = " The ARK is serving the cause of tapping into your teams‘ full potential. Your first task: ANONY- MOUSLY rank your team on this Potentiality Sca- le from 1 to 81."
            this.tip(1,50, msg, 30)

            let probessBar = new game.ProcessBar(stageWidth, stageHeight, 5, 'Inititate > Potential Scale')
            this.sprite.addChild(probessBar)

        }


        private closeTip():void{
            if(this.tiptext.parent){
                this.removeChild(this.tiptext)
            }
        }

        private nextTouch(){
            var scoreCounts = this.sprite.numChildren-this.playerList.length-4
            // if(this.playerList.length == scoreCounts){
                if(this.stage){
                    var self = this
                    base.API.Init("http://39.104.85.167:8105/api/");
                    base.API.call('save_players_process', {
                        'inviter_name': self.inviter, 
                        'game_secret': self.game_secret,
                        'player': self.player,
                        'game_name': self.gameName,
                        'process': '2.0'
                    }).then(function (response){

                        let game_secret = self.game_secret
                        let inviter = self.inviter
                        let player = self.player
                        let gameName = self.gameName
                        let stageWidth = self.stageWidth
                        let stageHeight = self.stageHeight
                        let count = 0
                        let playerCount = self.playerList.length
                        let characterChoosePage = new game.CharacterChoosePage(
                            game_secret,
                            inviter, 
                            player, 
                            gameName, 
                            stageWidth, 
                            stageHeight,
                            playerCount
                        )

                        self.stage.addChild(characterChoosePage)
                        self.sprite.visible = false;
                        self.removeChild(self.rightIcon);
                        self.removeChild(self.closeIcon);
                        self.closeTip();
                        self._shape.visible = false

                    })

                    // this.characterList = {'zjy':['Loyality', 'Joy'], '1':['Power', 'Courage'], '2':['Harmony', 'Disruption']}
                    // this.characterList = [['zjy', '1', '2'], [['Loyality', 'Joy'], ['Power', 'Courage'], ['Harmony', 'Disruption']]]
                    // let charater = new game.Character(game_secret,inviter, player, gameName, stageWidth, stageHeight, count, this.characterList);
                    // this.stage.addChild(charater);
                    // this.sprite.visible = false
                    // this.tiptext.text = ''
                    // this.removeChild(this.rightIcon)
                    // this.removeChild(this.closeIcon)
                    
                }
        }

        private tip(width, height, msg, size){
            var tiptext:egret.TextField = this.tiptext;

            tiptext.x = width
            tiptext.y = height
            tiptext.text = msg
            tiptext.size = size
            tiptext.width = this.stageWidth

        }
        private drawRect() {

            var shape1: egret.Shape = this.rectShapeOne;
            shape1.graphics.beginFill(0x359f93, 0.5);
            shape1.graphics.drawRect(0, 0, this.stageWidth + 60, 180);
            shape1.graphics.endFill();

            var shape2: egret.Shape = this.rectShapeTwo;
            shape2.graphics.beginFill(0x359f93, 0.5);
            shape2.graphics.drawRect(0, this.stageHeight - 100, this.stageWidth + 60, 200);
            shape2.graphics.endFill();


        }

            //初始化赋值
        private initGraphics():void {
            var shape:egret.Shape = this._shape;
            shape.graphics.lineStyle(2, 0xff00ff);
            shape.graphics.moveTo(this.stageWidth - 250, this.stageHeight - 150);
            shape.graphics.lineTo(this.stageWidth - 250, 240);
        }
        private initCharacter(cx, cy) {
            var charater2:egret.TextField = this.charater2
            charater2.text = 'Fully'

            charater2.textAlign = egret.HorizontalAlign.CENTER
            charater2.size = 40
            charater2.border = true
            charater2.width = 280
            charater2.borderColor = 0x3A5FCD
            charater2.x = cx
            charater2.y = cy
        }

        private getPlayList():void{
            base.API.Init("http://39.104.85.167:8105/api/");
            let self=this;
            base.API.call('get_player_list', {
                'game_secret': self.game_secret,
                'gameName': self.gameName,
                'inviter': self.inviter
            }).then(function (response) {
                self.playerList = response['player_list']
                console.log(self.playerList)
                // self.playerCounts = 
                self.playerList.forEach((val, index, array) => {

                    if(val == self.player){
                        var player_name: egret.TextField = new egret.TextField()
                        player_name.text = val
                        player_name.textAlign =  egret.HorizontalAlign.CENTER
                        player_name.size = 30
                        player_name.lineSpacing = 10
                        player_name.touchEnabled = true
                        player_name.border = true;

                        if(val.length * 18 < 100){
                            player_name.width = 100    
                        }else {
                            player_name.width = val.length * 18
                        }
                        
                        player_name.borderColor = 0x00ff00;
                        player_name.x = 70
                        player_name.y = 300 + index * 50;

                        var player_score: egret.TextField = new egret.TextField()
                        player_score.text = ''
                        player_score.size = 30
                        player_score.border = true;
                        player_score.width = 50
                        player_score.borderColor = 0x00ff00;
                        player_score.textAlign = egret.HorizontalAlign.CENTER

                        player_name.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e) => {
                            self._touchStatus = true;
                            var dx = e.stageX
                            var px = player_name.x
                            var py = player_name.y
                            var dy = e.stageY

                            player_name.addEventListener(egret.TouchEvent.TOUCH_MOVE, (e) => {
                                if (self._touchStatus) {
                                    player_name.x = e.stageX - dx + px;
                                    player_name.y = e.stageY - dy + py

                                    if (player_score.parent) {
                                        player_score.parent.removeChild(player_score)
                                    }

                                    let w = 100
                                    if(player_name.width > 100){
                                        w = player_name.width
                                    }
                                    // player_score.visible = false

                                    if(player_name.x > (self.stageWidth-250-w)){
                                        player_name.x = self.stageWidth-250-w
                                        
                                        if(player_name.y > 240   && player_name.y < self.stageHeight-150-player_name.height){
                                            
                                            player_score.x = player_name.x + w
                                            player_score.y = player_name.y
                                            var scorey = (self.stageHeight-150-240-player_name.height)/81
                                            player_score.text =  (Math.ceil((player_score.y - 240) / scorey)).toString()
                                            self.sprite.addChild(player_score)
                                            let _score = (Math.ceil((player_score.y - 240) / scorey)).toString()
                                            let playerName = player_name.text
                                            self.map[playerName] = _score

                                            self.rightIcon.visible = true
                                        }
                                    }
                                    if(player_name.y > self.stageHeight - 150 - player_name.height){
                                        player_name.y = self.stageHeight -150 -player_name.height
                                    }

                                }
                            }, this)
                        }, this);

                        player_name.addEventListener(egret.TouchEvent.TOUCH_END, (e) => {
                            self._touchStatus = false;
                            player_name.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);

                        }, this);


                        self.sprite.addChild(player_name)

                    }


                }) 
            })
        }

    }
}