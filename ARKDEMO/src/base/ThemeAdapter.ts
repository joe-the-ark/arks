namespace base {

    export class ThemeAdapter implements eui.IThemeAdapter {

        getTheme(url: string, onSuccess: Function, onError: Function, thisObject: any): void {
            function onResGet(e: string): void {
                onSuccess.call(thisObject, e);
            }

            function onResError(e: RES.ResourceEvent): void {
                if (e.resItem.url === url) {
                    RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError as any, null);
                    onError.call(thisObject);
                }
            }

            if (typeof generateEUI !== 'undefined') {
                egret.callLater(() => {
                    onSuccess.call(thisObject, generateEUI);
                }, this);
            }
            else if (typeof generateEUI2 !== 'undefined') {
                RES.getResByUrl("resource/gameEui.json", (data: any, url: any) => {
                    (window as any)["JSONParseClass"]["setData"](data);
                    onResGet(data);
                    egret.callLater(() => {
                        onSuccess.call(thisObject, generateEUI2);
                    }, this);
                }, this, RES.ResourceItem.TYPE_JSON);
            }
            else {
                RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, onResError as any, null);
                RES.getResByUrl(url, onResGet, this, RES.ResourceItem.TYPE_TEXT);
            }
        }
    }

    declare var generateEUI: { paths: string[], skins: any };
    declare var generateEUI2: { paths: string[], skins: any };

}