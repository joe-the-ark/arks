namespace game {

    export class TensionScale extends egret.DisplayObjectContainer {

        public sprite: egret.Sprite
        private unselectedCharacterList = []
        private selectedChaeacterList = []
        private game_secret = ''
        private gameName = ''
        public inviter = ''
        public timer: egret.Timer
        public stageWidth = 0
        public stageHeight = 0;

        public _touchStatus: boolean = false;
        public label: egret.TextField

        public select_list = []
        public score = '';
        public constructor(stageWidth, stageHeight, select_list, score) {
            super();
            
            this.select_list = select_list
            this.score = score;
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.sprite = new egret.Sprite();
            this.addChild(this.sprite);
            this.sprite.touchEnabled = true;
            this.drawCharacter();
            this.drawScore();
        }

        // private startGame(game_secret: string, gameName: string, inviter: string) {
        //     if (this.stage) {
        //         let enterGame = new game.EnterGame(game_secret, gameName, inviter, this.stage.stageWidth, this.stage.stageHeight);
        //         this.stage.addChild(enterGame)
        //         this.sprite.visible = false
        //         this.label.visible = false
        //     }
        // }

        private drawCharacter() {
            let randomColor = 0x0000ff + Math.floor(Math.random() * 100) * (0xffffff / 100);

            let topCharacterBg: egret.Shape = new egret.Shape();
            let bottomCharacterBg: egret.Shape = new egret.Shape();
            topCharacterBg.graphics.beginFill(0x7171C6);
            topCharacterBg.graphics.drawRect(0, 0, 180, 60);
            topCharacterBg.graphics.endFill();

            let toptext:egret.TextField= new egret.TextField()
            toptext.x = topCharacterBg.x
            console.log(topCharacterBg.y)
            console.log(topCharacterBg.x)

            toptext.y = 10
            toptext.text = this.select_list[0]

            bottomCharacterBg.graphics.beginFill(0x7171C6);
            bottomCharacterBg.graphics.drawRect(0, 80, 180, 60);
            bottomCharacterBg.graphics.endFill();

            let buttomtext:egret.TextField= new egret.TextField()
            buttomtext.x = bottomCharacterBg.x
            buttomtext.y = 90
            buttomtext.text = this.select_list[1]
            console.log(bottomCharacterBg.y)
            console.log(bottomCharacterBg.x)

            this.sprite.addChild(topCharacterBg);
            this.sprite.addChild(bottomCharacterBg);

            this.sprite.addChild(toptext);
            this.sprite.addChild(buttomtext);
            
        }

        private drawScore() {
            let score_bg: egret.Shape = new egret.Shape();
            let score: egret.TextField = new egret.TextField();
            let randomColor = 0x0000ff + Math.floor(Math.random() * 100) * (0xffffff / 100);
            // let randomColor = 0x0000ff 
            let randomLineColor = 0x0000ff + Math.floor(Math.random() * 100) * (0xffffff / 100);
            let randomScore = this.score;
            score_bg.graphics.beginFill(0x7FFFD4, 0.7);
            score_bg.graphics.lineStyle(2, 0x7D9EC0);
            score_bg.graphics.drawCircle(90, 70, 20);
            score_bg.graphics.endFill();
            this.sprite.addChild(score_bg);

            score.text = randomScore
            score.size = 20;
            score.textColor = 0xffffff;
            score.x = 80;
            score.y = 60;
            this.sprite.addChild(score);
            
        }

        private onTouchBegin(): void {
            if (this.stage) {
                let inviteScene = new game.CreateGame(this.stage.stageWidth, this.stage.stageHeight);
                this.stage.addChild(inviteScene)
                this.sprite.visible = false
                this.label.visible = false
            }
        }

        public getRandomScore(Min, Max): Number {
            var Range = Max - Min;
            var Rand = Math.random();
            return (Min + Math.round(Rand * Range));
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