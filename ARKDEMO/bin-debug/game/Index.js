var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var game;
(function (game) {
    var Index = (function (_super) {
        __extends(Index, _super);
        function Index(stageWidth, stageHeight, nickname, openid) {
            var _this = _super.call(this) || this;
            _this.game_list = [];
            _this.stageWidth = 0;
            _this.stageHeight = 0;
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            _this.sprite = new egret.Sprite();
            _this.addChild(_this.sprite);
            _this.sprite.touchEnabled = true;
            _this.nickname = nickname;
            _this.openid = openid;
            _this.label = new egret.TextField();
            _this.label.text = "start";
            _this.label.height = 80;
            _this.label.width = 180;
            _this.label.anchorOffsetX = _this.label.width / 2;
            _this.label.anchorOffsetY = _this.label.height / 2;
            _this.label.x = _this.stageWidth / 2;
            _this.label.y = _this.stageHeight / 2;
            _this.label.touchEnabled = true;
            _this.label.background = true;
            _this.label.backgroundColor = 0xffffff;
            _this.label.border = true;
            _this.label.borderColor = 0x00ff00;
            _this.label.fontFamily = "Arial";
            _this.label.textColor = 0xFF0000;
            _this.label.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
            _this.addChild(_this.label);
            return _this;
            // this.sprite.addEventListener(egret.Event.ADDED_TO_STAGE, this.getGameList, this)
        }
        // private getGameList():void {
        //     base.API.Init("http://work.metatype.cn:8105/api/");
        //     let self=this;
        //     base.API.call('get_game_list', {}).then(function (response){
        //         this.game_list = response['gameList']
        //         this.game_list.forEach((val, index,array) => {
        //             var game_name:egret.TextField = new egret.TextField()
        //             game_name.text = val[1]
        //             game_name.size = 40
        //             game_name.lineSpacing = 10
        //             game_name.touchEnabled = true
        //             game_name.border = true;
        //             game_name.borderColor = 0x00ff00;
        //             game_name.anchorOffsetX = game_name.width /2
        //             game_name.anchorOffsetY = game_name.height / 2
        //             game_name.x = self.stageWidth /2
        //             game_name.y = 100 + index * 50;
        //             game_name.addEventListener(egret.TouchEvent.TOUCH_BEGIN, self.startGame.bind(self, val[0], val[1], val[2]), this)
        //             self.sprite.addChild(game_name)
        //         })
        //     })
        // }
        // private startGame(game_secret:string, gameName:string, inviter:string) {
        //     if(this.stage){
        //         let enterGame = new game.EnterGame(game_secret, gameName, inviter, this.stage.stageWidth, this.stage.stageHeight);
        //         this.stage.addChild(enterGame)
        //         this.sprite.visible = false
        //         this.label.visible = false
        //     }
        // }
        Index.prototype.onTouchBegin = function () {
            base.API.Init("http://work.metatype.cn:8105/api/");
            base.API.call("create_game", { 'inviter': this.nickname, 'gameName': this.openid, 'game_id': this.openid }).then(function (response) {
                // var play = new game.LevelOneScene(_this.index);
                // _this.Switch(play);
            }).catch(function (err) {
                console.log(err);
            });
            // if (this.stage) {
            //     let inviteFriends = new game.InviteFriends(game_id, inviter, gameName, this.stage.stageWidth, this.stage.stageHeight);
            //     this.stage.addChild(inviteFriends)
            //     this.sprite.visible = false
            // }
            console.log(this.stage);
            if (this.stage) {
                var inviteScene = new game.CreateGame(this.stage.stageWidth, this.stage.stageHeight, this.nickname, this.openid, 'inviter');
                this.stage.addChild(inviteScene);
                this.sprite.visible = false;
                this.label.visible = false;
                // this.stage.removeChild( this.sprite );
            }
        };
        Index.prototype.onTouchEnd = function () {
            egret.log("onTouchEnd");
        };
        Index.prototype.onTouchMove = function () {
            egret.log("onTouchMove");
        };
        Index.prototype.onTouchTap = function () {
            egret.log("onTouchTap");
        };
        return Index;
    }(egret.DisplayObjectContainer));
    game.Index = Index;
    __reflect(Index.prototype, "game.Index");
})(game || (game = {}));
//# sourceMappingURL=Index.js.map