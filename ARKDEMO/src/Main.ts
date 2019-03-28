//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {



    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin

            context.onUpdate = () => {

            }
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }
        this.runGame().catch(e => {
            console.log(e);
        })
    }
    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        // this.startAnimation(result);
        await platform.login();
        const userInfo = await platform.getUserInfo();
        console.log(userInfo);

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }
    private textfield: egret.TextField;
    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene() {
        base.API.Init("http://work.metatype.cn:8105/api/");
        console.log('首页')
        var url = window.location.href;
        console.log(url)
        if(url.indexOf('game_id') != -1){
            let game_secret = url.split('?')[1].split('&')[0].split('=')[1]
            let inviter = url.split('?')[1].split('&')[1].split('=')[1]

                    if(url.indexOf('code') != -1){
                        var code = url.split('?')[1].split('&')[2].split('=')[1]
                        let self=this;
                        base.API.call('wechatlogin', {'code':code, 'inviter':inviter, 'game_name':game_secret, 'game_secret':game_secret}).then(function (response){
                            let user_data = response['result']
                            let openid = user_data['openid']
                            let nickname = user_data['nickname']
                            let stageWidth = self.stage.stageWidth
                            let stageHeight = self.stage.stageHeight

                            base.API.call('getGameStatus', {'inviter_name':inviter, 'game_secret':game_secret, 'gameName':game_secret, 'openid':openid, 'nickname':nickname}).then(function(response){

                                var status = response['result']
                                
                                if(status == 3){
                                    let scene = new game.CreateGame(stageWidth, stageHeight, nickname, openid, game_secret, inviter,  'player')
                                    self.stage.addChild(scene)
                                }else{
                                    alert('The game is in progress.')
                                }
                                
                            })
                        })
                    }else {
                        var redirect_uri = encodeURIComponent('http://ark.metatype.cn/index.html?game_id='+game_secret+'&nickname='+inviter)
                        console.log(redirect_uri)
                        var s = window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc7594d7d49e0235f&redirect_uri=" + redirect_uri + "&response_type=code&scope=snsapi_userinfo&state=1";
                    }
        }else{
            if(url.indexOf('code') != -1){
                var code = url.split('?')[1].split('&')[0].split('=')[1]
                base.API.Init("http://work.metatype.cn:8105/api/");
                let self=this;
                base.API.call('wechatlogin', {'code':code}).then(function (response){
                    let user_data = response['result']
                    let openid = user_data['openid']
                    let nickname = user_data['nickname']
                    let stageWidth = self.stage.stageWidth
                    let stageHeight = self.stage.stageHeight
                    let scene = new game.Index(stageWidth, stageHeight, nickname, openid)
                    self.stage.addChild(scene)
                })
            }else {
                var redirect_uri = encodeURIComponent('http://ark.metatype.cn/index.html')
                var s = window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxc7594d7d49e0235f&redirect_uri=" + redirect_uri + "&response_type=code&scope=snsapi_userinfo&state=1";
            }
        }
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string) {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result: string[]) {
        let parser = new egret.HtmlTextParser();
        let textflowArr = result.map(text => parser.parse(text));
        let textfield = this.textfield;
        let count = -1;
        let change = () => {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            let textFlow = textflowArr[count];
            // 切换描述内容
            // Switch to described content
            textfield.textFlow = textFlow;
            let tw = egret.Tween.get(textfield);
            tw.to({ "alpha": 1 }, 200);
            tw.wait(2000);
            tw.to({ "alpha": 0 }, 200);
            tw.call(change, this);
        };
        change();
    }
}