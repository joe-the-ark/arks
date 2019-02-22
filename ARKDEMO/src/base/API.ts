namespace base {

    export class API {
        baseUrl: string;

        private static instance: API = null;

        private constructor(baseUrl: string) {
            this.baseUrl = baseUrl;       
        }

        public static Init(baseUrl: string) {
            API.instance = new API(baseUrl);
        }

        public static async call(name:string, params: Object) {
            let p = new Promise((resolve, reject) => {
                let req = new egret.HttpRequest();
                req.responseType = egret.HttpResponseType.TEXT;
                req.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");

                req.open(this.instance.baseUrl + name + '/', 'POST');
                
                req.send(JSON.stringify(params));
                req.addEventListener(egret.Event.COMPLETE, (e) => {
                    let res = JSON.parse(req.response);
                    if (res.success) {
                        resolve(res.result);
                    }
                    else {
                        reject({ code: res.code, msg: res.msg });
                    }
                }, this);
            });
            return p;
        }
    }

}