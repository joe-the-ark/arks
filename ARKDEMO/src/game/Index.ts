namespace game {

    export class Index extends egret.DisplayObjectContainer {

        public sprite:egret.Sprite
     
        public game_list = []
        public timer:egret.Timer
        public stageWidth = 0
        public stageHeight = 0

        public label:egret.TextField
        public nickname
        public openid
        public constructor(stageWidth, stageHeight, nickname, openid) {
            super();
            
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.sprite = new egret.Sprite();
            this.addChild(this.sprite);
            this.sprite.touchEnabled = true;

            this.nickname = nickname
            this.openid = openid

            this.label = new egret.TextField(); 
            this.label.text = "start"; 
            this.label.height = 30;
            this.label.width = 80;
            this.label.anchorOffsetX = this.label.width/2
            this.label.anchorOffsetY = this.label.height/2
            this.label.x = this.stageWidth /2 
            this.label.y = this.stageHeight / 2
            this.label.touchEnabled = true
            this.label.background = true;
            this.label.backgroundColor = 0xffffff;
            this.label.border = true;
            this.label.borderColor = 0x00ff00;
            this.label.fontFamily = "Arial";
            this.label.textColor = 0xFF0000;
            this.label.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.sprite.addChild(this.label)
        }
        
        private onTouchBegin():void {
            base.API.Init("http://work.metatype.cn:8105/api/");
            base.API.call("create_game", { 'inviter': this.nickname, 'gameName': this.openid, 'game_id':this.openid }).then(function (response) {

            }).catch(function (err) {
                
            });

            if( this.stage ) {
                this.sprite.visible = false
                let inviteScene = new game.CreateGame(this.stage.stageWidth, this.stage.stageHeight, this.nickname, this.openid,this.openid, this.nickname, 'inviter');
                this.stage.addChild(inviteScene)
                
            }
        }
    }
}