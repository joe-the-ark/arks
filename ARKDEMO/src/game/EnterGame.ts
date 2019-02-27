namespace game {

    export class EnterGame extends egret.DisplayObjectContainer {

        private sprite: egret.Sprite
        private _icon: egret.DisplayObject;

        private txInput: egret.TextField
        private txInput2: egret.TextField

        private count: number = 0
        private text2: egret.TextField
        private playerList = []
        private game_secret = ''
        private gameName = ''
        private isPlayer = 0
        private inviter = ''
        public constructor(game_secret, gameName, inviter, stageWidth, stageHeight) {
            super();
            this.game_secret = game_secret
            this.gameName = gameName
            this.inviter = inviter

            this.sprite = new egret.Sprite();
            this.sprite.width = stageWidth
            this.sprite.height = stageHeight
            this.addChild(this.sprite)

            var shape: egret.Shape = new egret.Shape();
            shape.graphics.beginFill(0xFFF5EE);
            shape.graphics.drawRect(0, 0, 300, 50);
            shape.graphics.endFill();
            shape.x = this.sprite.width / 2 + 80
            shape.y = this.sprite.height / 3
            shape.anchorOffsetX = shape.width / 2
            shape.anchorOffsetY = shape.height / 2
            this.sprite.addChild(shape)

            var shape2: egret.Shape = new egret.Shape();
            shape2.graphics.beginFill(0xFFF5EE);
            shape2.graphics.drawRect(0, 0, 300, 50);
            shape2.graphics.endFill();
            shape2.x = this.sprite.width / 2 + 80
            shape2.y = this.sprite.height / 3 - 100
            shape2.anchorOffsetX = shape2.width / 2
            shape2.anchorOffsetY = shape2.height / 2
            this.sprite.addChild(shape2)
            this.txInput2 = new egret.TextField();
            this.txInput2.type = egret.TextFieldType.INPUT;
            this.txInput2.inputType = egret.TextFieldInputType.TEXT;
            this.txInput2.width = 290;
            this.txInput2.height = 50;
            this.txInput2.x = this.sprite.width / 2 + 80
            this.txInput2.y = this.sprite.height / 3 - 100
            this.txInput2.anchorOffsetX = this.txInput2.width / 2
            this.txInput2.anchorOffsetY = this.txInput2.height / 2
            this.txInput2.textColor = 0x0D0D0D;
            this.txInput2.size = 40;

            var text2: egret.TextField = new egret.TextField();
            text2.text = 'input game secret:';
            text2.x = this.sprite.width / 2 - 320
            text2.y = this.sprite.height / 3 - 118
            text2.size = 30
            this.sprite.addChild(text2)
            this.sprite.addChild(this.txInput2)

            this.txInput = new egret.TextField();
            this.txInput.type = egret.TextFieldType.INPUT;
            this.txInput.inputType = egret.TextFieldInputType.TEXT;
            this.txInput.width = 290;
            this.txInput.height = 50;
            this.txInput.x = this.sprite.width / 2 + 80
            this.txInput.y = this.sprite.height / 3
            this.txInput.anchorOffsetX = this.txInput.width / 2
            this.txInput.anchorOffsetY = this.txInput.height / 2
            this.txInput.textColor = 0x0D0D0D;
            this.txInput.size = 40;

            var text: egret.TextField = new egret.TextField();
            text.text = 'input your name:';
            text.x = this.sprite.width / 2 - 320
            text.y = this.sprite.height / 3 - 18
            text.size = 30
            this.sprite.addChild(text)
            this.sprite.addChild(this.txInput)

            var button: egret.Shape = new egret.Shape();
            button.graphics.beginFill( 0x00cc00 );
            button.graphics.drawRect(0, 0, 200, 50);
            button.graphics.endFill();
            button.x = this.sprite.width / 2
            button.y = this.sprite.height / 2;
            button.anchorOffsetX = button.width / 2
            button.anchorOffsetY = button.height / 2
            button.touchEnabled = true;
            button.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this)
            this.sprite.addChild(button)

            var label: egret.TextField = new egret.TextField();
            label.text = "play";
            label.anchorOffsetX = label.width / 2
            label.anchorOffsetY = label.height / 2
            label.x = this.sprite.width / 2
            label.y = this.sprite.height / 2
            this.sprite.addChild(label)

            this.text2 = new egret.TextField()
            this.text2.text = "please input your name and the game's secret"
            this.text2.width = stageWidth
            this.sprite.addChild(this.text2)
        }

        private onTouchBegin(): void {
            var player = this.txInput.text
            var game_secret = this.txInput2.text

            console.log('player:' + player)

            var self = this
            if (player && game_secret) {
                console.log(game_secret)
                console.log(this.game_secret)

                // base.API.Init("http://39.104.85.167:8105/api/");
                base.API.Init("http://127.0.0.1:8000/api/")
                base.API.call("find_players", { 'game_secret': self.game_secret, 'gameName': self.gameName }).then(function (response) {
                    console.log(response)
                    let play_list = response['player_list']

                    var index = play_list.indexOf(self.txInput.text)
                    self.isPlayer = index

                }).catch(function (err) {
                    console.log(err);
                });
                if (game_secret != this.game_secret) {
                    this.text2.text = "please input the correct secret to enter the game"
                } else if (self.isPlayer == -1) {
                    this.text2.text = "you aren't invited !"
                } else {
                    if (this.stage) {
                        console.log(33333)
                        let gamePageOne = new game.GamePageOne(game_secret, self.inviter, player, self.gameName, this.stage.stageWidth, this.stage.stageHeight);
                        this.stage.addChild(gamePageOne)
                        self.sprite.visible = false
                    }

                }

            } else {
                this.text2.text = "you must input your name and the game's secret"
            }


            // if(player){
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

            //         base.API.Init("http://127.0.0.1:8000/api/")
            // base.API.call("create_player", {'player_name': player} ).then(function (response) {

            //     console.log(response)

            // }).catch(function (err) {
            //     console.log(err);
            // });

            //     }
            // }

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