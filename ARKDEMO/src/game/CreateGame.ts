namespace game {

    export class CreateGame extends egret.DisplayObjectContainer {

        private sprite: egret.Sprite
        private _icon: egret.DisplayObject;

        private txInput2: egret.TextField
        private txInput3: egret.TextField
        private txInput: egret.TextField

        private count: number = 0
        private text2: egret.TextField
        private playerList = []
        public label:egret.TextField
        public label2:egret.TextField
        public label3:egret.TextField

        public stageWidth
        public stageHeight

        public nickname
        public openid
        public status

        public player
        public game_secret
        public inviter

        public timer:egret.Timer

        private characterList = []
        private allcharacterlist = []

        public constructor(stageWidth, stageHeight, nickname, openid, game_secret, inviter, status) {
            super();
            this.sprite = new egret.Sprite();
            this.sprite.width = stageWidth
            this.sprite.height = stageHeight
            this.addChild(this.sprite)

            this.nickname = nickname
            this.player = nickname
            this.openid = openid
            this.status = status
            this.game_secret = game_secret
            this.inviter = inviter

            this.stageWidth = stageWidth
            this.stageHeight = stageHeight
            this.label2 = new egret.TextField();

            this.label2.text = "be ready friends: ";
            this.label2.height = 30;
            this.label2.anchorOffsetX = this.label2.width/2
            this.label2.anchorOffsetY = this.label2.height/2

            this.label2.x = this.stageWidth /2
            this.label2.y = this.stageHeight / 6
            this.label2.background = true;
            this.label2.backgroundColor = 0xffffff;
            this.label2.border = true;
            this.label2.borderColor = 0x00ff00;
            this.label2.fontFamily = "Arial";
            this.label2.textColor = 0xFF0000;
            this.sprite.addChild(this.label2)

            if(status == 'inviter'){
                this.label = new egret.TextField();
                this.label.text = "Click on the top right corner to invite friends ";
                this.label.height = 30;
                this.label.anchorOffsetX = this.label.width/2
                this.label.anchorOffsetY = this.label.height/2
                this.label.x = this.stageWidth /2
                this.label.y = this.stageHeight / 10
                this.label.background = true;
                this.label.backgroundColor = 0xffffff;
                this.label.border = true;
                this.label.borderColor = 0x00ff00;
                this.label.fontFamily = "Arial";
                this.label.textColor = 0xFF0000;
                this.sprite.addChild(this.label)
                var idTimeout:number = egret.setTimeout( function( arg ){
                    this.label3 = new egret.TextField();
                    this.label3.text = "play game";
                    this.label3.height = 30;
                    this.label3.width = 180;
                    this.label3.anchorOffsetX = this.label3.width/2
                    this.label3.anchorOffsetY = this.label3.height/2
                    this.label3.x = this.stageWidth /2
                    this.label3.y = this.stageHeight / 1.5
                    this.label3.background = true;
                    this.label3.backgroundColor = 0xffffff;
                    this.label3.border = true;
                    this.label3.borderColor = 0x00ff00;
                    this.label3.touchEnabled = true
                    this.label3.fontFamily = "Arial";
                    this.label3.textColor = 0xFF0000;
                    this.label3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBegin, this);
                    this.sprite.addChild(this.label3)
                    
                    }, this, 1000, "egret"
                );

                
                this.invateFriends()
            }

            this.timer = new egret.Timer(1000, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.getPlayeList, this);
            this.timer.start()

        }
        private getPlayeList(){
            var self = this
            base.API.Init("http://work.metatype.cn:8105/api/")
            base.API.call('getPlayerList', {'inviter_name':self.inviter, 'game_secret':self.game_secret, 'gameName': self.game_secret}).then(function(response){
                var playerList = response['result']
                playerList.forEach( (val, index, array)=> {
                    var player_name: egret.TextField = new egret.TextField()
                    player_name.text = val
                    player_name.textAlign = egret.HorizontalAlign.CENTER
                    player_name.size = 30
                    player_name.lineSpacing = 10
                    player_name.touchEnabled = true
                    player_name.border = true;

                    if (val.length * 20 < 100) {
                        player_name.width = 100
                    } else {
                        player_name.width = val.length * 18
                    }

                    player_name.borderColor = 0x00ff00;
                    player_name.x = 70
                    player_name.y = 300 + index * 50;
                    self.sprite.addChild(player_name)
                })
            })

            if(self.status == 'player'){
                base.API.call('getGameStatus', {'inviter_name':self.inviter, 'game_secret':self.game_secret, 'gameName':self.game_secret, 'openid':self.openid, 'nickname':self.nickname}).then(function(response){
                    var status = response['result']
                    if(status == 1){
                        base.API.call('get_players_process', {
                            'game_secret': self.game_secret,
                            'inviter_name': self.inviter,
                            'player': self.nickname,
                            'gameName': self.game_secret

                        }).then(function (response) {

                            var process = response['process']
                            if(process == '0.1'){
                                var playerCount = response['playercount']
                                var playerScore = response['playerScore']
                                let game_secret = self.game_secret
                                let inviter = self.inviter
                                let player = self.player
                                let gameName = self.game_secret
                                let stageWidth = self.stageWidth
                                let stageHeight = self.stageHeight
                                self.timer.stop()
                                self.sprite.visible = false;
                                self.removeChild(self.sprite)

                                let initiatePartialInsights =  new game.InitiatePartialInsights(
                                    game_secret,
                                    inviter,
                                    player,
                                    gameName,
                                    stageWidth,
                                    stageHeight,
                                    playerCount,
                                    playerScore
                                )

                                self.stage.addChild(initiatePartialInsights)
                            }
                            else if (process == '0.2'){
                                var playerCount = response['playercount']
                                let game_secret = self.game_secret
                                let inviter = self.inviter
                                let player = self.player
                                let gameName = self.game_secret
                                let stageWidth = self.stageWidth
                                let stageHeight = self.stageHeight
                                self.timer.stop()
                                self.sprite.visible = false
                                self.removeChild(self.sprite)
                                let characterChoosePage = new game.CharacterChoosePage(
                                    game_secret,
                                    inviter,
                                    player,
                                    gameName,
                                    stageWidth,
                                    stageHeight,
                                    playerCount
                                )
                                self.stage.addChild(characterChoosePage)
                            }
                            else if (process == '1.0.0'){
                                    var count = 0
                                    base.API.call('get_player_characterlist', {
                                        'game_secret': self.game_secret,
                                        'inviter': self.inviter,
                                        'player': self.player,
                                        'gameName': self.game_secret,
                                    }).then(function (response) {
                                        var character_list = response['data']

                                        var characterList = []

                                        character_list.forEach((val, index, array) => {
                                            var player_name = val[0]
                                            if (self.playerList.indexOf(player_name) == -1) {
                                                count++
                                                self.allcharacterlist.push(val[1])
                                                self.playerList.push(player_name)
                                            }
                                        })
                                        characterList.push(self.playerList)
                                        characterList.push(self.allcharacterlist)

                                        let playerAndOthersCharacterList = []
                                        // ['1', [c1, c2], [['2', '3'], [[c1, c2], [c1, c2]]]
                                        let otherCharacterList = []
                                        let othersList = []
                                        let characterList2 = []

                                        self.playerList.forEach((val, index, array) => {

                                            if(val == self.player){
                                                playerAndOthersCharacterList.push(val)
                                                playerAndOthersCharacterList.push(self.allcharacterlist[index])
                                            }else {
                                                othersList.push(val)
                                                characterList2.push(self.allcharacterlist[index])
                                            }
                                        })
                                        otherCharacterList.push(othersList)
                                        otherCharacterList.push(characterList2)
                                        playerAndOthersCharacterList.push(otherCharacterList)

                                        let game_secret = self.game_secret
                                        let inviter = self.inviter
                                        let player = self.player
                                        let gameName = self.game_secret
                                        let stageWidth = self.stage.stageWidth
                                        let stageHeight = self.stage.stageHeight
                                        var count = 0
                                        self.timer.stop()
                                        self.sprite.visible = false
                                        self.removeChild(self.sprite)
                                        let charater = new game.Character(game_secret, inviter, player, gameName, stageWidth, stageHeight, count, characterList, playerAndOthersCharacterList);
                                        self.stage.addChild(charater);
                                    })
                            }else{
                                var inviter = self.inviter
                                var gameName = self.game_secret
                                var game_id = self.game_secret
                                self.sprite.visible = false
                                self.removeChild(self.sprite)
                                self.timer.stop()
                                let enter = new game.GamePageOne(self.game_secret, self.inviter, self.nickname, self.game_secret, self.stage.stageWidth, self.stage.stageHeight);
                                self.stage.addChild(enter)
                            }
                        })
                    }
                })
            }

            if(self.status == 'inviter'){

                 base.API.call('getGameStatus', {'inviter_name':self.inviter, 'game_secret':self.game_secret, 'gameName':self.game_secret, 'openid':self.openid, 'nickname':self.nickname}).then(function(response){
                    var status = response['result']
                    if(status == 1){
                        base.API.call('get_players_process', {
                            'game_secret': self.game_secret,
                            'inviter_name': self.inviter,
                            'player': self.nickname,
                            'gameName': self.game_secret
                        }).then(function (response) {
                                var process = response['process']
                                if(process == '0.1'){
                                    var playerCount = response['playercount']
                                    var playerScore = response['playerScore']
                                    let game_secret = self.game_secret
                                    let inviter = self.inviter
                                    let player = self.player
                                    let gameName = self.game_secret
                                    let stageWidth = self.stageWidth
                                    let stageHeight = self.stageHeight
                                    self.timer.stop()
                                    self.sprite.visible = false;
                                    self.removeChild(self.sprite)
                                    let initiatePartialInsights =  new game.InitiatePartialInsights(
                                        game_secret,
                                        inviter,
                                        player,
                                        gameName,
                                        stageWidth,
                                        stageHeight,
                                        playerCount,
                                        playerScore
                                    )
                                    self.stage.addChild(initiatePartialInsights)
                                }
                                else if (process == '0.2'){
                                    var playerCount = response['playercount']
                                    let game_secret = self.game_secret
                                    let inviter = self.inviter
                                    let player = self.player
                                    let gameName = self.game_secret
                                    let stageWidth = self.stageWidth
                                    let stageHeight = self.stageHeight
                                    self.sprite.visible = false
                                    self.removeChild(self.sprite)
                                    self.timer.stop()

                                    let characterChoosePage = new game.CharacterChoosePage(
                                        game_secret,
                                        inviter,
                                        player,
                                        gameName,
                                        stageWidth,
                                        stageHeight,
                                        playerCount
                                    )
                                    self.stage.addChild(characterChoosePage)
                                }

                                else if (process == '1.0.0'){
                                        var that = self
                                        var count = 0
                                        base.API.call('get_player_characterlist', {
                                            'game_secret': that.game_secret,
                                            'inviter': that.inviter,
                                            'player': that.player,
                                            'gameName': that.game_secret,
                                        }).then(function (response) {
                                            var character_list = response['data']

                                            var characterList = []

                                            character_list.forEach((val, index, array) => {
                                                var player_name = val[0]
                                                if (self.playerList.indexOf(player_name) == -1) {
                                                    count++
                                                    that.allcharacterlist.push(val[1])
                                                    that.playerList.push(player_name)
                                                }
                                            })
                                            characterList.push(that.playerList)
                                            characterList.push(that.allcharacterlist)

                                            // }
                                            let playerAndOthersCharacterList = []
                                            // ['1', [c1, c2], [['2', '3'], [[c1, c2], [c1, c2]]]
                                            let otherCharacterList = []
                                            let othersList = []
                                            let characterList2 = []

                                            self.playerList.forEach((val, index, array) => {

                                                if(val == that.player){
                                                    playerAndOthersCharacterList.push(val)
                                                    playerAndOthersCharacterList.push(that.allcharacterlist[index])
                                                }else {
                                                    othersList.push(val)
                                                    characterList2.push(that.allcharacterlist[index])
                                                }
                                            })
                                            otherCharacterList.push(othersList)
                                            otherCharacterList.push(characterList2)
                                            playerAndOthersCharacterList.push(otherCharacterList)

                                            let game_secret = that.game_secret
                                            let inviter = that.inviter
                                            let player = that.player
                                            let gameName = that.game_secret
                                            let stageWidth = that.stage.stageWidth
                                            let stageHeight = that.stage.stageHeight
                                            var count = 0
                                            self.timer.stop()
                                            that.sprite.visible = false

                                            let charater = new game.Character(game_secret, inviter, player, gameName, stageWidth, stageHeight, count, characterList, playerAndOthersCharacterList);
                                            that.stage.addChild(charater);

                                        })
                                }else{
                                    var inviter = self.inviter
                                    var gameName = self.game_secret
                                    var game_id = self.game_secret
                                    self.timer.stop()
                                    self.sprite.visible = false
                                    self.removeChild(self.sprite)
                                    let enter = new game.GamePageOne(self.game_secret, self.inviter, self.nickname, self.game_secret, self.stage.stageWidth, self.stage.stageHeight);
                                    self.stage.addChild(enter)
                                }
                        })
                    }
                 })
            }
        }
        private invateFriends(){
            var link1 = window.location.href
            var link = 'http://ark.metatype.cn/index.html?game_id=' +this.openid + '&inviter=' + this.nickname
            base.API.Init("http://work.metatype.cn:8105/api/");
            var self = this
            base.API.call("wechatapi", {'url': link1 }).then(function (response) {

                var bodyConfig:BodyConfig = new BodyConfig();
                bodyConfig.appId = response['params']['appId'];
                bodyConfig.timestamp = response['params']['timestamp']
                bodyConfig.nonceStr = response['params']['nonceStr']
                bodyConfig.jsApiList = response['params']['jsApiList']
                bodyConfig.signature = response['params']['signature']

                if(wx) {
                    wx.config(bodyConfig)
                    wx.ready(function(){
                       let desc = 'your friend '+ self.nickname + ' invite you to join the game'
                        wx.onMenuShareAppMessage({
                            // title: 'ARK', // 分享标题
                            // desc: desc, // 分享描述
                            title:'Hilton 100 years',
                            desc:'Hilton 100 years',
                            link: 'https://pinkslash.metatype.cn/user_login/', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                            imgUrl: 'https://pinkslash.metatype.cn/static/images/100years.png', // 分享图标
                            type: '', // 分享类型,music、video或link，不填默认为link
                            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                            trigger:function(){
                            },
                            success:function(res){
                            },
                            cancel: function(){
                            },
                            fail: function(res){
                            }
                        });
                    })
                    wx.error(function(res){
                    })
                }
            }).catch(function (err) {
                console.log(err);
            });
        }
        private onTouchBegin(){
            this.label3.touchEnabled = false
            var inviter = this.inviter
            var gameName = this.game_secret
            var game_id = this.game_secret
            var self = this
            base.API.Init("http://work.metatype.cn:8105/api/")
            // base.API.Init("http://127.0.0.1:8000/api/")
            base.API.call('create_game',  {'inviter': inviter, 'gameName': gameName, 'game_id':game_id }).then(function (response) {
            })

            // base.API.call('save_players_process', {
            //     'inviter_name': this.inviter,
            //     'game_secret': this.game_secret,
            //     'player': this.player,
            //     'game_name': this.game_secret,
            //     'process': '0'
            // }).then(function (response){
            // })

            self.sprite.visible = false

            self.timer.stop()

            let enter = new game.GamePageOne(this.game_secret, this.inviter, this.inviter, this.game_secret, this.stage.stageWidth, this.stage.stageHeight);
            self.stage.addChild(enter)

        }

    }
}