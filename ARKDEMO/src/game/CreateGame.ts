namespace game {

    export class CreateGame extends egret.DisplayObjectContainer {

        private sprite:egret.Sprite
        private _icon:egret.DisplayObject;
        
        private txInput2:egret.TextField
        private txInput3:egret.TextField
        private txInput:egret.TextField

        private count:number = 0
        private text2:egret.TextField
        private playerList = []
        public constructor(stageWidth, stageHeight) {
            super();
            this.sprite = new egret.Sprite();
            this.sprite.width = stageWidth
            this.sprite.height = stageHeight
            this.addChild(this.sprite)

            var shape:egret.Shape = new egret.Shape();
            shape.graphics.beginFill(0xFFF5EE);
            shape.graphics.drawRect( 0, 0, 300, 50 );
            shape.graphics.endFill();
            shape.x = this.sprite.width /2 + 60
            shape.y = this.sprite.height /3 
            shape.anchorOffsetX = shape.width/2
            shape.anchorOffsetY = shape.height/2
            this.sprite.addChild(shape)

            this.txInput = new egret.TextField();
            this.txInput.type = egret.TextFieldType.INPUT;
            this.txInput.inputType = egret.TextFieldInputType.TEXT;
            this.txInput.width = 290;
            this.txInput.height = 50;
            this.txInput.x = this.sprite.width /2 + 60
            this.txInput.y = this.sprite.height /3
            this.txInput.anchorOffsetX = this.txInput.width / 2
            this.txInput.anchorOffsetY = this.txInput.height / 2
            this.txInput.textColor = 0x0D0D0D;
            this.txInput.size = 40;

            var text:egret.TextField = new egret.TextField();
            text.text = 'game id:';
            text.x = this.sprite.width /2 - 280
            text.y = this.sprite.height /3 - 18
            text.size = 30
            this.sprite.addChild(text)
            this.sprite.addChild(this.txInput)

            var shape2:egret.Shape = new egret.Shape();
            shape2.graphics.beginFill(0xFFF5EE);
            shape2.graphics.drawRect( 0, 0, 300, 50 );
            shape2.graphics.endFill();
            shape2.x = this.sprite.width /2 + 60
            shape2.y = this.sprite.height /3 - 80
            shape2.anchorOffsetX = shape2.width/2
            shape2.anchorOffsetY = shape2.height/2
            this.sprite.addChild(shape2)

            var shape3:egret.Shape = new egret.Shape();
            shape3.graphics.beginFill(0xFFF5EE);
            shape3.graphics.drawRect( 0, 0, 300, 50 );
            shape3.graphics.endFill();
            shape3.x = this.sprite.width /2 + 60
            shape3.y = this.sprite.height /3 - 160
            shape3.anchorOffsetX = shape2.width/2
            shape3.anchorOffsetY = shape2.height/2
            this.sprite.addChild(shape3)
            

            this.txInput2 = new egret.TextField();
            this.txInput2.type = egret.TextFieldType.INPUT;
            this.txInput2.inputType = egret.TextFieldInputType.TEXT;
            this.txInput2.width = 290;
            this.txInput2.height = 50;
            this.txInput2.x = this.sprite.width /2 + 60
            this.txInput2.y = this.sprite.height / 3  - 75
            this.txInput2.anchorOffsetX = this.txInput2.width / 2
            this.txInput2.anchorOffsetY = this.txInput2.height / 2
            this.txInput2.textColor = 0x0D0D0D;
            this.txInput2.size = 40;

            var text3:egret.TextField = new egret.TextField();
            text3.text = 'game name:';
            text3.x = this.sprite.width /2 - 280
            text3.y = this.sprite.height /3 - 90
            text3.size = 30
            this.sprite.addChild(text3)
            this.sprite.addChild(this.txInput2)

            this.txInput3 = new egret.TextField();
            this.txInput3.type = egret.TextFieldType.INPUT;
            this.txInput3.inputType = egret.TextFieldInputType.TEXT;
            this.txInput3.width = 290;
            this.txInput3.height = 50;
            this.txInput3.x = this.sprite.width /2 + 60
            this.txInput3.y = this.sprite.height / 3  - 150
            this.txInput3.anchorOffsetX = this.txInput3.width / 2
            this.txInput3.anchorOffsetY = this.txInput3.height / 2
            this.txInput3.textColor = 0x0D0D0D;
            this.txInput3.size = 40;

            var text4:egret.TextField = new egret.TextField();
            text4.text = 'your name:';
            text4.x = this.sprite.width /2 - 280
            text4.y = this.sprite.height /3 - 170
            text4.size = 30
            this.sprite.addChild(text4)
            this.sprite.addChild(this.txInput3)


            var button:egret.Shape =  new egret.Shape();
            button.graphics.beginFill(0x00cc00);
            button.graphics.drawRect(0,0,200,50);
            button.graphics.endFill();
            button.x = this.sprite.width / 2
            button.y = this.sprite.height / 2;
            button.anchorOffsetX = button.width / 2 
            button.anchorOffsetY = button.height / 2
            button.touchEnabled = true;
            button.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this)
            this.sprite.addChild(button)

            var label:egret.TextField = new egret.TextField(); 
            label.text = "create"; 
            label.anchorOffsetX = label.width/2
            label.anchorOffsetY = label.height/2
            label.x = this.sprite.width / 2
            label.y = this.sprite.height /2
            this.sprite.addChild(label)


            this.text2 = new egret.TextField()
            this.text2.width = stageWidth
            this.sprite.addChild(this.text2)

        }

        private onTouchBegin():void {
            var inviter =  this.txInput3.text
            var gameName = this.txInput2.text
            var game_id = this.txInput.text
            if(inviter && gameName && game_id){

                base.API.Init("http://127.0.0.1:8000/api/");
                base.API.call("create_game", { 'inviter': inviter, 'gameName': gameName, 'game_id':game_id }).then(function (response) {
                    // var play = new game.LevelOneScene(_this.index);
                    // _this.Switch(play);

                }).catch(function (err) {
                    console.log(err);
                });

                if(this.stage) {
                    let inviteFriends = new game.InviteFriends(game_id, inviter, gameName, this.stage.stageWidth, this.stage.stageHeight);
                    this.stage.addChild(inviteFriends)
                    this.sprite.visible = false
                }

            }else {
                this.text2.text = "you must input your name , the game's name and the game_id"
            }

            // if(){
            //     var duplicate = 0
            //     this.playerList.forEach((val, index, array) => {
            //         console.log(val)
            //         if(val == player){
            //             this.text2.text = 'please dont invite the duplicate player !'
            //             duplicate = 1
            //         }
            //     })
            //     console.log(duplicate)
            //     if(duplicate == 0) {
            //         this.playerList.push(player)
            //         this.count += 1
            //         this.text2.text = 'You have invited '+ this.count + ' players'
            //     }
            // }

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