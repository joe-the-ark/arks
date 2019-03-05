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
        private player = ''
        private allcharacterlist = []
        private playerCount = 0
        private characterList = []
        private stageWidth = 0
        private stageHeight = 0
        public constructor(game_secret, gameName, inviter, stageWidth, stageHeight) {
            super();
            this.game_secret = game_secret
            this.gameName = gameName
            this.inviter = inviter

            this.sprite = new egret.Sprite();

            
            this.stageHeight = stageHeight
            this.stageWidth = stageWidth


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
            this.player = player
            var game_secret = this.txInput2.text

            console.log('player:' + player)

            var self = this
            if (player && game_secret) {
                base.API.Init("http://39.104.85.167:8105/api/");
				base.API.call("find_players", {'game_secret': self.game_secret, 'gameName': self.gameName} ).then(function (response) {
					let play_list = response['player_list']
					var index = play_list.indexOf(self.txInput.text)
                    if(game_secret != self.game_secret){
                        self.text2.text = "please input the correct secret to enter the game"
                    }else if( index == -1) {
                        self.text2.text = "you aren't invited !"

                    }else {
                        if(self.stage){
                            base.API.call('get_players_process', {
                                'game_secret':self.game_secret,
                                'inviter_name':self.inviter,
                                'player':player,
                                'gameName': self.gameName

                            }).then(function (response){

                                console.log(response)
                                var process = response['process']
                                var playerCount = response['playercount']
                                var processson = response['processson']
                                self.playerCount = playerCount


                                if(process == '2.0'){
                                    let characterChoosePage = new game.CharacterChoosePage(
                                        game_secret,
                                        self.inviter, 
                                        player, 
                                        self.gameName, 
                                        self.stage.stageWidth, 
                                        self.stage.stageHeight,
                                        playerCount
                                    )
                                    self.stage.addChild(characterChoosePage)
                                    self.sprite.visible = false
                                }
                                else if(process == '3'){

                                    var that = self
                                    var count = 0
                                    base.API.call('get_player_characterlist', {
                                        'game_secret':that.game_secret,
                                        'inviter':that.inviter,
                                        'player' : that.player,
                                        'gameName' : that.gameName,
                                    }).then(function (response){
                                        var character_list = response['data']

                                        var characterList = []
                                        
                                        character_list.forEach((val, index, array) =>{
                                            var player_name = val[0]
                                            if(self.playerList.indexOf(player_name) == -1){
                                                count ++ 
                                                // console.log(count)
                                                // let tensionScale = new game.TensionScale(self.stageWidth, self.stageHeight, val[1], 0)
                                                that.allcharacterlist.push(val[1])
                                                // self.sprite.addChild(tensionScale)
                                                // tensionScale.x = self.stageWidth - 200
                                                // tensionScale.y = self.count * 150
                                                that.playerList.push(player_name)
                                            }
                                        })
                                        if(count == playerCount){
                                            console.log('character_list')
                                            characterList.push(that.playerList)
                                            characterList.push(that.allcharacterlist)
                                        }

                                        let game_secret = that.game_secret
                                        let inviter = that.inviter
                                        let player = that.player
                                        let gameName = that.gameName
                                        let stageWidth = that.stage.stageWidth
                                        let stageHeight = that.stage.stageHeight
                                        let processson1 = processson
                                        let charater = new game.Character(game_secret,inviter, player, gameName, stageWidth, stageHeight, processson1, characterList);
                                        that.stage.addChild(charater);
                                        that.sprite.visible = false

                                    })
 

                                }
                                else if(process == '4'){
                                    var that = self
                                    var count = 0
                                    base.API.call('get_player_characterlist', {
                                        'game_secret':that.game_secret,
                                        'inviter':that.inviter,
                                        'player' : that.player,
                                        'gameName' : that.gameName,
                                    }).then(function (response){
                                        var character_list = response['data']

                                        var characterList = []
                                        character_list.forEach((val, index, array) =>{
                                            var player_name = val[0]
                                            if(self.playerList.indexOf(player_name) == -1){
                                                count ++ 
                                                that.allcharacterlist.push(val[1])
                                                that.playerList.push(player_name)
                                            }
                                        })
                                        if(count == playerCount){
                                            console.log('character_list')
                                            characterList.push(that.playerList)
                                            characterList.push(that.allcharacterlist)
                                        }

                                        let toTensionScaleResult = new game.TensionScaleResult(
                                            that.stage.stageWidth,
                                            that.stage.stageHeight,
                                            that.inviter, 
                                            game_secret,
                                            player,
                                            that.gameName, 
                                            characterList,
                                            playerCount
                                        )
                                        that.stage.addChild(toTensionScaleResult);
                                        that.sprite.visible = false;
                                    })
                                }
                                else {
                                    let gamePageOne = new game.GamePageOne(game_secret, self.inviter, player, self.gameName, self.stage.stageWidth, self.stage.stageHeight);
                                    self.stage.addChild(gamePageOne)
                                    self.sprite.visible = false
                                }
                            })
                        }
                    }
					self.isPlayer = index

				}).catch(function (err) {
					console.log(err);
				});

			}else {
				this.text2.text = "you must input your name and the game's secret"
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