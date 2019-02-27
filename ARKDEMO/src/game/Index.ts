namespace game {

    export class Index extends egret.DisplayObjectContainer {

        public sprite:egret.Sprite
     
        public game_list = []
        public timer:egret.Timer
        public stageWidth = 0
        public stageHeight = 0

        public label:egret.TextField
        public constructor(stageWidth, stageHeight) {
            super();
            
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.sprite = new egret.Sprite();
            // this.sprite.graphics.beginFill(0xff0000);
            // this.sprite.graphics.drawRect(0, 0, 200, 50);
            // this.sprite.graphics.endFill();
            // this.sprite.anchorOffsetX = this.sprite.width / 2 ;
            // this.sprite.anchorOffsetY = this.sprite.height / 2 ;
            this.addChild(this.sprite);
            this.sprite.touchEnabled = true;
            // this.sprite.x = stageWidth / 2
            // this.sprite.y = stageHeight / 2

            this.label = new egret.TextField(); 
            this.label.text = "create game"; 
            this.label.height = 80;
            this.label.width = 180;
            this.label.anchorOffsetX = this.label.width/2
            this.label.anchorOffsetY = this.label.height/2
            this.label.x = this.stageWidth /2 
            this.label.y = this.stageHeight 
            this.label.touchEnabled = true
            this.label.background = true;
            this.label.backgroundColor = 0xffffff;
            this.label.border = true;
            this.label.borderColor = 0x00ff00;
            this.label.fontFamily = "Arial";
            this.label.textColor = 0xFF0000;
            this.label.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addChild(this.label)



            // this.sprite.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            // this.sprite.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            // this.sprite.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);

            this.sprite.addEventListener(egret.Event.ADDED_TO_STAGE, this.getGameList, this)

        }

        private getGameList():void {
            // base.API.Init("http://127.0.0.1:8000/api/");
            base.API.Init("http://127.0.0.1:8000/api/");
            let self=this;
            base.API.call('get_game_list', {}).then(function (response){
                this.game_list = response['gameList']
                this.game_list.forEach((val, index,array) => {
                    var game_name:egret.TextField = new egret.TextField()
                    game_name.text = val[1]
                    game_name.size = 40
                    game_name.lineSpacing = 10
                    game_name.touchEnabled = true
                    game_name.border = true;
                    game_name.borderColor = 0x00ff00;
                    game_name.anchorOffsetX = game_name.width /2
                    game_name.anchorOffsetY = game_name.height / 2
                    game_name.x = self.stageWidth /2
                    game_name.y = 100 + index * 50;
                    game_name.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.startGame.bind(self, val[0], val[1], val[2]), this)
                    
                    self.sprite.addChild(game_name)
                })
            })
        }

        private startGame(game_secret:string, gameName:string, inviter:string) {

            if(this.stage){
                let enterGame = new game.EnterGame(game_secret, gameName, inviter, this.stage.stageWidth, this.stage.stageHeight);
                this.stage.addChild(enterGame)
                this.sprite.visible = false
                this.label.visible = false
            }
        }

        private onTouchBegin():void {
            console.log(this.stage)
            if( this.stage ) {
                let inviteScene = new game.CreateGame(this.stage.stageWidth, this.stage.stageHeight);
                this.stage.addChild(inviteScene)
                this.sprite.visible = false
                this.label.visible = false
                // this.stage.removeChild( this.sprite );
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