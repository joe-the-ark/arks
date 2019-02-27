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

        public constructor(stageWidth, stageHeight) {
            super();
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.sprite = new egret.Sprite();
            this.addChild(this.sprite);
            this.sprite.touchEnabled = true;
            this.drawCharacter();
            this.drawScore();
        }

        private startGame(game_secret: string, gameName: string, inviter: string) {
            if (this.stage) {
                let enterGame = new game.EnterGame(game_secret, gameName, inviter, this.stage.stageWidth, this.stage.stageHeight);
                this.stage.addChild(enterGame)
                this.sprite.visible = false
                this.label.visible = false
            }
        }

        private drawCharacter() {
            let topCharacterBg: egret.Shape = new egret.Shape();
            let bottomCharacterBg: egret.Shape = new egret.Shape();
            let randomColor = 0x0000ff + Math.floor(Math.random() * 100) * (0xffffff / 100);

            topCharacterBg.graphics.beginFill(randomColor);
            topCharacterBg.graphics.drawRect(0, 0, 100, 60);
            topCharacterBg.graphics.endFill();
            bottomCharacterBg.graphics.beginFill(randomColor);
            bottomCharacterBg.graphics.drawRect(0, 80, 100, 60);
            bottomCharacterBg.graphics.endFill();

            this.sprite.addChild(topCharacterBg);
            this.sprite.addChild(bottomCharacterBg);
        }

        private drawScore() {
            let score_bg: egret.Shape = new egret.Shape();
            let score: egret.TextField = new egret.TextField();
            let randomColor = 0x0000ff + Math.floor(Math.random() * 100) * (0xffffff / 100);
            let randomLineColor = 0x0000ff + Math.floor(Math.random() * 100) * (0xffffff / 100);
            let randomScore = this.getRandomScore(1, 81);

            score_bg.graphics.beginFill(randomColor, 0.7);
            score_bg.graphics.lineStyle(2, randomColor);
            score_bg.graphics.drawCircle(50, 70, 20);
            score_bg.graphics.endFill();
            this.sprite.addChild(score_bg);

            score.text = randomScore.toString();
            score.size = 20;
            score.textColor = 0xffffff;
            score.x = 40;
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