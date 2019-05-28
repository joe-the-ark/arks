namespace game {
    export class Complete extends egret.DisplayObjectContainer {
        /***     初始赋值代码开始    ***/
        private sprite: egret.Sprite
        public stageWidth = 0
        public stageHeight = 0
        /***     初始赋值代码结束    ***/
        private game_secret = ''
        private gameName = ''
        public inviter = ''
        public player = ''
        private _width = 600
        private _x = 20
        private _margin = 20
        public constructor(stageWidth, stageHeight,inviter,game_secret,player,gameName) {
            super()
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.sprite = new egret.Sprite()

            this.player=player
            this.inviter=inviter
            this.game_secret=game_secret
            this.gameName = gameName

            this.addChild(this.sprite)
            this.processBar()
            this.intro()
        }

        private processBar(): void {
            let processBar = new game.ProcessBar(this.stageWidth, this.stageHeight, 100, "Mission 2 > Complete")
            this.sprite.addChild(processBar)
        }

        private intro(): void {
            let intro = new egret.TextField()
            intro.text = "Thank you for travelling with The ARK!\n\nWeChat with the developer \n\nRe-Embark on The ARK \n\nYou can recommend it to your friends by sharing the link ark. metatype. cn\n"
            intro.width = this._width
            intro.x = this._x
            intro.y = 100

            var tx2: egret.TextField = new egret.TextField;
            tx2.textFlow = new Array<egret.ITextElement>(
                { text: "View results",style: { "href": "http://ark.metatype.cn:8105/result/complete/"+this.player+"/"+this.game_secret+"/"+this.inviter+"/" } }
            );
            tx2.touchEnabled = true;
            tx2.background = true
            tx2.backgroundColor = 0xffcc33

            var tx: egret.TextField = new egret.TextField;
            tx.textFlow = new Array<egret.ITextElement>(
                { text: "Coffee for the developer",style: { "href": "https://www.paypal.me/joetheark" } }
            );
            tx.touchEnabled = true;
            tx.background = true
            tx.backgroundColor = 0xffcc33
            
            tx2.addEventListener(egret.TextEvent.LINK,function(evt: egret.TextEvent) {
                console.log(evt.text);
            },this);
            tx2.x = 20;
            tx2.y = 400;
            this.sprite.addChild(tx2);

            tx.addEventListener(egret.TextEvent.LINK,function(evt: egret.TextEvent) {
                console.log(evt.text);
            },this);
            tx.x = 20;
            tx.y = 500;
            this.sprite.addChild(tx);

            this.sprite.addChild(intro)

        }
    }
}