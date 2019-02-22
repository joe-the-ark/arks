class Button extends eui.UILayer {
    private loadingView:LoadingUI;
    ///自定义按钮的 icon 显示对象
    private _icon:egret.DisplayObject;

     public constructor(stageWidth, stageHeight) {
        super();
        ///设置Group,用于给按钮布局，具体可参看布局示例。
        var group = new eui.Group();
        group.width = stageWidth;
        group.height = stageHeight;
        this.addChild(group);

        var layout = new eui.VerticalLayout();
        layout.gap = 30;
        layout.verticalAlign = egret.VerticalAlign.MIDDLE;
        layout.horizontalAlign = egret.HorizontalAlign.CENTER;
        group.layout = layout;

        ///绘制icon，并保存。
        var icon:egret.Shape = new egret.Shape();
        icon.graphics.beginFill(0xcc2211);
        icon.graphics.drawCircle(12,12,6);
        icon.graphics.endFill();
        this._icon = icon;

        var renderTexture:egret.RenderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(icon);
        /*** 本示例关键代码段开始 ***/
        var btn1 = new eui.Button();
        ///设置按钮的标签
        btn1.label = "按钮";
        btn1.icon = renderTexture;
        btn1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onTouch,this);
        group.addChild(btn1);
        
        
    }

    private onTouch(event:egret.TouchEvent) {
        ///获得当前按钮
        var btn:eui.Button = <eui.Button>event.target;
        ///获得按钮icon，并绘转换为纹理
        var renderTexture:egret.RenderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(this._icon);
        switch (event.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                //设置按钮的 icon
                btn.icon = renderTexture;
                break;
            case egret.TouchEvent.TOUCH_END:
                //取消按钮的 icon
                btn.icon = null;
                break;
            default :
                break;
        }

    }
}
