namespace game {

    export class CharacterChoosePage extends egret.DisplayObjectContainer {

        public sprite: egret.Sprite
        private unselectedCharacterList = []
        private selectedChaeacterList = []
        private game_secret = ''
        private gameName = ''
        public inviter = ''
        public timer: egret.Timer
        public stageWidth = 0
        public stageHeight = 0
        public count = 0

        public _touchStatus: boolean = false;
        public label: egret.TextField
        private titleBackground: egret.Shape

        public constructor(stageWidth, stageHeight) {
            super();
            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.sprite = new egret.Sprite();
            this.addChild(this.sprite);
            this.sprite.touchEnabled = true;

            this.titleBackground = new egret.Shape();
            this.sprite.addChild(this.titleBackground);
            this.drawTitleBackground();
            this.createTitle();
            this.getCharacterList();
            this.drawSplitLine();
            this.addTensionScale();

        }


        private startGame(game_secret: string, gameName: string, inviter: string) {

            if (this.stage) {
                let enterGame = new game.EnterGame(game_secret, gameName, inviter, this.stage.stageWidth, this.stage.stageHeight);
                this.stage.addChild(enterGame)
                this.sprite.visible = false
                this.label.visible = false
            }
        }

        private drawTitleBackground() {
            let shape1: egret.Shape = this.titleBackground;
            shape1.graphics.beginFill(0x00ff00, 0.5);
            shape1.graphics.drawRect(0, 0, this.stageWidth, 130);
            shape1.graphics.endFill();
        }

        private createTitle() {
            let title: egret.TextField = new egret.TextField();
            title.text = "Choose 2 kinds of character";
            title.size = 30;
            title.width = 480;
            title.x = 320 - title.textWidth / 2;
            title.y = 50;
            this.sprite.addChild(title);
        }

        private drawSplitLine() {
            let splitLine: egret.Shape = new egret.Shape();
            splitLine.graphics.lineStyle(2, 0xffffff)
            splitLine.graphics.moveTo(400, this.stageHeight)
            splitLine.graphics.lineTo(400, 130)
            splitLine.graphics.endFill()
            this.sprite.addChild(splitLine)
        }

        private getCharacterList(): void {
            // base.API.Init("http://39.104.85.167:8105/api/");
            base.API.Init("http://127.0.0.1:8000/api/");
            const self = this;
            base.API.call('get_character_list', {}).then(function (response) {
                self.unselectedCharacterList = response['characters']
                self.unselectedCharacterList.forEach((val, index, array) => {
                    var unselectedCharacter: egret.TextField = new egret.TextField()
                    unselectedCharacter.text = val
                    unselectedCharacter.textAlign = egret.HorizontalAlign.CENTER
                    unselectedCharacter.size = 30
                    unselectedCharacter.lineSpacing = 10
                    unselectedCharacter.touchEnabled = true
                    unselectedCharacter.border = true;
                    unselectedCharacter.width = 100
                    unselectedCharacter.borderColor = 0x00ff00;
                    unselectedCharacter.x = 70
                    unselectedCharacter.y = 300 + index * 50;
                    unselectedCharacter.background = true;
                    unselectedCharacter.backgroundColor = 0x636363;
                    if (val.length * 18 < 100) {
                        unselectedCharacter.width = 100
                    } else {
                        unselectedCharacter.width = val.length * 18
                    }

                    let player_score: egret.TextField = new egret.TextField()
                    player_score.text = ''
                    player_score.size = 30
                    player_score.border = true;
                    player_score.width = 50
                    player_score.borderColor = 0x00ff00;
                    player_score.textAlign = egret.HorizontalAlign.CENTER

                    let flag = 0;
                    unselectedCharacter.addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
                        if (flag == 0) {
                            unselectedCharacter.backgroundColor = 0x00cc00;
                            flag = 1;
                            self.count++;
                            if (self.count >= 2) {
                                let confirmButton: egret.Shape = new egret.Shape();
                                confirmButton.graphics.beginFill( 0x00cc00 );
                                confirmButton.graphics.drawRect(0, 0, 200, 50);
                                confirmButton.graphics.endFill();
                                confirmButton.x = unselectedCharacter.x;
                                confirmButton.y = 200;
                                confirmButton.touchEnabled = true;
                                // this.nextTouch.bind(this.a);
                                // this.nextTouch(a, e:event);
                                confirmButton.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.addTensionScale, self);
                                self.sprite.addChild(confirmButton);
                                

                                let confirmText: egret.TextField = new egret.TextField();
                                confirmText.text = 'Confirm';
                                confirmText.size = 30;
                                confirmText.x = unselectedCharacter.x + 50;
                                confirmText.y = confirmButton.y + 10;
                                self.sprite.addChild(confirmText);
                            }
                        } else if (flag == 1) {
                            unselectedCharacter.backgroundColor = 0x636363;
                            flag = 0;
                            self.count--;
                        }
                    }, this);
                    function confirmButton() {
                        console.log("1231231231")
                    }
                    self.sprite.addChild(unselectedCharacter)
                })
            })
        }

        private addTensionScale(): void {
            let tensionScale = new game.TensionScale(60, 40)
            tensionScale.x = this.stageWidth - 165
            tensionScale.y = 180
            this.sprite.addChild(tensionScale)
        }

        private onTouchBegin(): void {
            console.log(this.stage)
            if (this.stage) {
                let inviteScene = new game.CreateGame(this.stage.stageWidth, this.stage.stageHeight);
                this.stage.addChild(inviteScene)
                this.sprite.visible = false
                this.label.visible = false
                // this.stage.removeChild( this.sprite );
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