namespace game {

    export class PageOneResult extends egret.DisplayObjectContainer {

        private sprite:egret.Sprite
        private playerList = []
        private game_secret = ''
        private player= ''
        public gameName = ''
        public inviter = ''
        public stageWidth = 0
        public stageHeight = 0

        public _touchStatus:boolean = false;
        public _distance:egret.Point = new egret.Point();

        private _shape:egret.Shape; 

        private rectShapeOne:egret.Shape;
        private rectShapeTwo:egret.Shape

        private charater2:egret.TextField
        private rightIcon:egret.Bitmap;
        private closeIcon:egret.Bitmap;

        private tiptext:egret.TextField

        private characterList = []
        public characterTwo = 'Fully'
        public characterOne = 'Insufficiently'

        public player_score_list = []
        public player_list = []

        private timer: egret.Timer
        private playerscore = 0
        
        private middle = 0
        private middleScore:egret.TextField
        private middlePlayer:egret.TextField
        
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
            this.sprite.addEventListener(egret.Event.ADDED_TO_STAGE, this.getPlayScoreList, this)


            this.rectShapeOne = new egret.Shape();
            this.rectShapeTwo = new egret.Shape();
            this.sprite.addChild(this.rectShapeOne);
            this.sprite.addChild(this.rectShapeTwo);
            this.drawRect()            


            var character1:egret.TextField = new egret.TextField()
            character1.text = this.characterOne
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
            this.initCharacter(stageWidth - 390, this.stageHeight -150)

            this.rightIcon = new egret.Bitmap(RES.getRes('right_png') as egret.Texture )
            this.rightIcon.width = 100
            this.rightIcon.height = 100
            this.rightIcon.anchorOffsetX = this.rightIcon.width/2
            this.rightIcon.anchorOffsetY = this.rightIcon.height /2 
            this.rightIcon.x = stageWidth - 50
            this.rightIcon.y = stageHeight /2 
            this.addChild(this.rightIcon)

            this.rightIcon.touchEnabled = true
            this.rightIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.nextTouch, this)

            this.closeIcon =new egret.Bitmap(RES.getRes('close-circle_png') as egret.Texture)
            this.closeIcon.width = 40
            this.closeIcon.height = 40
            this.closeIcon.anchorOffsetX = this.closeIcon.width/2
            this.closeIcon.anchorOffsetY = this.closeIcon.height /2
            this.closeIcon.x = stageWidth -30
            this.closeIcon.y = 150
            this.closeIcon.touchEnabled = true
            this.closeIcon.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.closeTip, this)
            this.addChild(this.closeIcon)
            this.tiptext = new egret.TextField()


            this.timer = new egret.Timer(1000, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.getPlayScoreList, this);
            this.timer.start()

            this.middleScore = new egret.TextField()
            this.middleScore.textAlign = egret.HorizontalAlign.CENTER
            this.middleScore.size = 30
            this.middleScore.lineSpacing = 10
            this.middleScore.border = true
            this.middleScore.background= true
            this.middleScore.backgroundColor = 0x7A378B
            this.middleScore.borderColor = 0x00ff00
            this.middleScore.visible = false
            this.sprite.addChild(this.middleScore)
            
            this.middlePlayer = new egret.TextField()
            this.middlePlayer.textAlign = egret.HorizontalAlign.CENTER
            this.middlePlayer.size = 30
            this.middlePlayer.lineSpacing = 10
            this.middlePlayer.border = true
            this.middlePlayer.background= true
            this.middlePlayer.borderColor = 0x00ff00
            this.middlePlayer.visible = false
            this.middlePlayer.backgroundColor = 0x6CA6CD
            this.sprite.addChild(this.middlePlayer)

        }
        private getPlayScoreList(){
            var self = this
            base.API.Init("http://work.metatype.cn:8105/api/");
            base.API.call('get_player_score', {'inviter': this.inviter, 'gameName': this.gameName, 'gameSecret':this.game_secret, 'player':this.player, 'character_one':this.characterOne, 'character_two':this.characterTwo, 'chooser':this.inviter }).then(function (response){
                // self.middle = response['middle']
                // console.log(self.middle)
                // self.middlePlayer.text = self.player

                // var score_text = self.middle.toString() + '/' +  (self.playerscore - self.middle).toString()
                // self.middleScore.text = score_text
                // self.middleScore.width = 100

                // if(self.middlePlayer.text.length * 18 < 100){
                //     self.middlePlayer.width = 100    
                // }else {
                //     self.middlePlayer.width = self.middlePlayer.text.length  * 18
                // }
                // // let w = 100
                // // if(player_name.width > 100){
                // //     w = player_name.width
                // // }
                // self.middlePlayer.x = self.stageWidth - 250 - self.middlePlayer.width
                // self.middleScore.x = self.stageWidth-250
                // self.middlePlayer.y = self.middle * ((self.stageHeight-150-240)/81) + 240
                // self.middleScore.y = self.middlePlayer.y
                // self.middlePlayer.visible=true
                // self.middleScore.visible= true
                // self.player_list = response['player_list']
                // self.player_score_list = response['player_score_list']

                self.player_list.forEach((val, index, array) => {

                    var player_name:egret.TextField = new egret.TextField()
                    player_name.text = val
                    player_name.textAlign =  egret.HorizontalAlign.CENTER
                    player_name.size = 30
                    player_name.lineSpacing = 10
                    player_name.touchEnabled = true
                    player_name.border = true;
                    player_name.background = true
                    player_name.borderColor = 0x00ff00;
                    player_name.alpha = 0.5

                    var player_score:egret.TextField = new egret.TextField()
                    player_score.size = 30
                    player_score.border = true;
                    player_score.background = true
                    player_score.borderColor = 0x00df23;
                    player_score.textAlign = egret.HorizontalAlign.CENTER
                    player_score.alpha = 0.5

                    if(val == self.player && index != self.player_score_list.length){
                        self.playerscore = self.player_score_list[index]
                        player_name.backgroundColor = 0x6CA6CD
                    }else {
                        player_name.backgroundColor = 0x636363
                    }

                    if(val.length * 18 < 100){
                        player_name.width = 100    
                    }else {
                        player_name.width = val.length * 18
                    }

                    let w = 100
                    if(player_name.width > 100){
                        w = player_name.width
                    }


                    if(index % 2 != 0){
                        player_name.x = self.stageWidth-250-w
                        player_score.x = player_name.x - 50
                    }
                    else {
                        player_name.x = self.stageWidth-250
                        player_score.x = player_name.x + w
                    }

                    var score = self.player_score_list[index]
                    player_name.y = score * ((self.stageHeight-150-240)/81) + 240
                    self.sprite.addChild(player_name)
                    

                    // if(index+1 == self.player_list.length){

                    //     if(player_score.parent){
                    //         self.sprite.removeChild(player_score)
                    //     }

                    // var score_text = middle.toString() + '/' +  (self.playerscore - middle).toString()
                    // console.log(score_text)
                    // let chashu = self.player_score_list[index] 
                    // player_score.text = score_text
                    // player_score.width = 100
                    // player_name.backgroundColor = 0x6CA6CD
                    // player_name.x = self.stageWidth- 250 - w
                    // player_score.x = self.stageWidth - 250
                    // self.sprite.addChild(player_score)
                    // }else{
                    player_score.text = self.player_score_list[index]
                    player_score.width = 50
                    player_score.y = player_name.y
                    player_score.backgroundColor = 0xFF7F24
                    self.sprite.addChild(player_score)
                    // }


                })


            })
        }
        
        private closeTip():void{
            if(this.tiptext.parent){
                
                this.removeChild(this.tiptext)
            }
            
        }

        private nextTouch(){
            // conset_player_scoreole.log(this.sprite.numChildren-this.playerList.length-4)
            // var scoreCounts = this.sprite.numChildren-this.playerList.length-4
            // if(this.playerList.length == scoreCounts){

                if(this.stage){
                    let game_secret = this.game_secret
                    let inviter = this.inviter
                    let player = this.player
                    let gameName = this.gameName
                    let stageWidth = this.stageWidth
                    let stageHeight = this.stageHeight
                    let count = 0

                    // base.API.Init("http://work.metatype.cn:8105/api/");
                    // base.API.call('get_choose_list', {})
                    // this.characterList = {'zjy':['Loyality', 'Joy'], '1':['Power', 'Courage'], '2':['Harmony', 'Disruption']}
                    let playerAndOthersCharacterList = []
                    this.characterList = [['zjy', '1', '2'], [['Loyality', 'Joy'], ['Power', 'Courage'], ['Harmony', 'Disruption']]]
                    let charater = new game.Character(game_secret,inviter, player, gameName, stageWidth, stageHeight, count, this.characterList, playerAndOthersCharacterList);
                    this.stage.addChild(charater);
                    this.sprite.visible = false
                    this.removeChild(this.sprite)
                    this.tiptext.text = ''
                    this.removeChild(this.rightIcon)
                    this.removeChild(this.closeIcon)
                    
                }
            // }else{

            //     this.addChild(this.tiptext)
            //     this.tip(100, 100, 'Everyont must be graded!')
            // }
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

            var shape1:egret.Shape = this.rectShapeOne;
            shape1.graphics.beginFill( 0xff0000, 0.5); 
            shape1.graphics.drawRect( 0, 0, this.stageWidth + 60, 180 ); 
            shape1.graphics.endFill();

            var shape2:egret.Shape = this.rectShapeTwo;
            shape2.graphics.beginFill( 0xff0000, 0.5); 
            shape2.graphics.drawRect( 0, this.stageHeight - 100, this.stageWidth+60, 200); 
            shape2.graphics.endFill();

        }
            //初始化赋值
        private initGraphics():void {
            var shape:egret.Shape = this._shape;
            shape.graphics.lineStyle(2, 0xff00ff);
            shape.graphics.moveTo(this.stageWidth-250, this.stageHeight -150);
            shape.graphics.lineTo(this.stageWidth-250, 240);
        }
        private initCharacter(cx, cy) {
            var charater2:egret.TextField = this.charater2
            charater2.text = this.characterTwo
            charater2.textAlign = egret.HorizontalAlign.CENTER
            charater2.size = 40
            charater2.border = true
            charater2.width = 280
            charater2.borderColor = 0x3A5FCD
            charater2.x = cx
            charater2.y = cy
        }
        private onTouchEnd():void {
            egret.log("onTouchEnd");
        }
        private onTouchMove():void {
            egret.log("onTouchMove");
        }
        private onTouchTap():void {
            egret.log("onTouchTap");
        }

    }
}