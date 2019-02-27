namespace game {

    export class InviteFriends extends egret.DisplayObjectContainer {

        private sprite:egret.Sprite
        private _icon:egret.DisplayObject;
        
        private txInput:egret.TextField

        private count:number = 0
        private text2:egret.TextField
        private playerList = []
        private game_secret = ''
        private inviter= ''
        private gameName = ''
        public constructor(game_secret, inviter, gameName, stageWidth, stageHeight) {

            super();
            this.game_secret = game_secret
            this.inviter = inviter
            this.gameName = gameName

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
            text.text = 'input player:';
            text.x = this.sprite.width /2 - 280
            text.y = this.sprite.height /3 - 18
            text.size = 30
            this.sprite.addChild(text)
            this.sprite.addChild(this.txInput)

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
            label.text = "invite"; 
            label.anchorOffsetX = label.width/2
            label.anchorOffsetY = label.height/2
            label.x = this.sprite.width / 2
            label.y = this.sprite.height /2
            this.sprite.addChild(label)


            var button2:egret.Shape =  new egret.Shape();
            button2.graphics.beginFill(0x00cc00);
            button2.graphics.drawRect(0,0,200,50);
            button2.graphics.endFill();
            button2.x = this.sprite.width / 2
            button2.y = this.sprite.height / 2 + 100;
            button2.anchorOffsetX = button.width / 2 
            button2.anchorOffsetY = button.height / 2
            button2.touchEnabled = true;
            button2.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin2, this)
            this.sprite.addChild(button2)

            var label2:egret.TextField = new egret.TextField(); 
            label2.text = "play"; 
            label2.anchorOffsetX = label2.width/2
            label2.anchorOffsetY = label2.height/2
            label2.x = this.sprite.width / 2
            label2.y = this.sprite.height /2 + 100

            this.sprite.addChild(label2)

            this.text2 = new egret.TextField()
            this.text2.text = 'You have invited '+ this.count + ' players'
            this.text2.width = stageWidth
            this.sprite.addChild(this.text2)

        }

        private onTouchBegin():void {



            var player =  this.txInput.text
            if(player){
                var duplicate = 0
                this.playerList.forEach((val, index, array) => {
                    console.log(val)
                    if(val == player){
                        this.text2.text = 'please dont invite the duplicate player !'
                        duplicate = 1
                    }
                })
                console.log(duplicate)
                if(duplicate == 0) {
                    this.playerList.push(player)
                    this.count += 1
                    this.text2.text = 'You have invited '+ this.count + ' players'

                    var self = this

<<<<<<< HEAD
                    // base.API.Init("http://127.0.0.1:8000/api/");
                    base.API.Init("http://127.0.0.1:8000/api/");
=======
                    // base.API.Init("http://39.104.85.167:8105/api/");

                    base.API.Init("http://39.104.85.167:8105/api/");
>>>>>>> origin/master
                    base.API.call("create_player", {'player_name': player, 'game_secret':self.game_secret, 'gameName':self.gameName, 'inviter':self.inviter} ).then(function (response) {

                        console.log(response)

                    }).catch(function (err) {
                        console.log(err);
                    });

                }
            }

        }

        private onTouchBegin2():void {
            if(this.playerList.length < 3){
                this.text2.text = 'You must invite 10 players to start the game at least!'
            }else {

                var self = this
                if( this.stage ) {
                    let enter = new game.GamePageOne(self.game_secret, self.inviter,self.inviter, self.gameName, this.stage.stageWidth, this.stage.stageHeight);
                    this.stage.addChild(enter)
                    self.sprite.visible = false
                }
                // console.log(this.stage)
<<<<<<< HEAD
                //base.API.Init("http://127.0.0.1:8000/api/");
                // base.API.Init("http://127.0.0.1:8000/api/");
=======

                //base.API.Init("http://39.104.85.167:8105/api/");
                // base.API.Init("http://39.104.85.167:8105/api/");
>>>>>>> origin/master
                // base.API.call("invite_players", { 'playerList': this.playerList }).then(function (response) {
                //     console.log(response);
                //     // var play = new game.LevelOneScene(_this.index);
                //     // _this.Switch(play);

                // }).catch(function (err) {
                //     console.log(err);
                // });

            }

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