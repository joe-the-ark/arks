namespace game {

    export class GamePageOne extends egret.DisplayObjectContainer {

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
            character1.text = 'Carefulness'
            character1.textAlign = egret.HorizontalAlign.CENTER
            character1.size = 40
            character1.border = true
            character1.width = 280
            character1.borderColor = 0x3A5FCD;
            character1.x = stageWidth - 390
            character1.y = 200
            this.sprite.addChild(character1)

            this._shape = new egret.Shape();
            this.sprite.addChild(this._shape);
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
        }

        private closeTip():void{
            if(this.tiptext.parent){
                
                this.removeChild(this.tiptext)
            }
            
        }

        private nextTouch(){


            console.log(this.sprite.numChildren-this.playerList.length-5)
            var scoreCounts = this.sprite.numChildren-this.playerList.length-5
            if(this.playerList.length == scoreCounts){

            }else{

                this.addChild(this.tiptext)
                this.tip(100, 100, 'Everyont must be graded!')

            }

        }

        private tip(width, height, msg){
            var tiptext:egret.TextField = this.tiptext;
            tiptext.x = width
            tiptext.y = height
            tiptext.text = msg
            tiptext.size = 40
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
            charater2.text = 'Power'
            charater2.textAlign = egret.HorizontalAlign.CENTER
            charater2.size = 40
            charater2.border = true
            charater2.width = 280
            charater2.borderColor = 0x3A5FCD
            charater2.x = cx
            charater2.y = cy
        }

        private getPlayList():void{
            base.API.Init("http://127.0.0.1:8000/api/");
            let self=this;
            base.API.call('get_player_list', {
                'game_secret': self.game_secret,
                'gameName': self.gameName,
                'inviter': self.inviter
            }).then(function (response){
                self.playerList = response['player_list']
                // self.playerCounts = 
                self.playerList.forEach((val, index,array) => {
                    var player_name:egret.TextField = new egret.TextField()
                    player_name.text = val
                    player_name.textAlign =  egret.HorizontalAlign.CENTER
                    player_name.size = 30
                    player_name.lineSpacing = 10
                    player_name.touchEnabled = true
                    player_name.border = true;
                    player_name.width = 100
                    player_name.borderColor = 0x00ff00;
                    player_name.x = 70
                    player_name.y = 300 + index * 50;

                    var player_score:egret.TextField = new egret.TextField()
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
                            if( self._touchStatus ){
                                player_name.x = e.stageX - dx + px;
                                player_name.y = e.stageY - dy + py

                                if(player_score.parent){
                                    player_score.parent.removeChild(player_score)
                                }

                                // player_score.visible = false
                                if(player_name.x > (self.stageWidth-250-100)){
                                    player_name.x = self.stageWidth-250-100
                                    console.log(player_name.x)
                                    console.log(player_name.y)
                                    if(player_name.y > 240 && player_name.y < self.stageHeight -100){
                                        
                                        player_score.x = player_name.x + 100
                                        player_score.y = player_name.y
                                        var scorey = (self.stageHeight-150-240)/81
                                        player_score.text =  (Math.ceil((player_score.y - 240) / scorey)).toString()
                                        self.sprite.addChild(player_score)

                                    }
                                }
                            }
                        }, this)
                    } , this);

                    player_name.addEventListener(egret.TouchEvent.TOUCH_END, (e) => {
                        self._touchStatus = false;
                        player_name.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.mouseMove, this);

                    } , this);
                    self.sprite.addChild(player_name)

                }) 
            })
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