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
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(stageWidth, stageHeight) {
        var _this = _super.call(this) || this;
        ///设置Group,用于给按钮布局，具体可参看布局示例。
        var group = new eui.Group();
        group.width = stageWidth;
        group.height = stageHeight;
        _this.addChild(group);
        var layout = new eui.VerticalLayout();
        layout.gap = 30;
        layout.verticalAlign = egret.VerticalAlign.MIDDLE;
        layout.horizontalAlign = egret.HorizontalAlign.CENTER;
        group.layout = layout;
        ///绘制icon，并保存。
        var icon = new egret.Shape();
        icon.graphics.beginFill(0xcc2211);
        icon.graphics.drawCircle(12, 12, 6);
        icon.graphics.endFill();
        _this._icon = icon;
        var renderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(icon);
        /*** 本示例关键代码段开始 ***/
        var btn1 = new eui.Button();
        ///设置按钮的标签
        btn1.label = "按钮";
        btn1.icon = renderTexture;
        btn1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouch, _this);
        group.addChild(btn1);
        return _this;
    }
    Button.prototype.onTouch = function (event) {
        ///获得当前按钮
        var btn = event.target;
        ///获得按钮icon，并绘转换为纹理
        var renderTexture = new egret.RenderTexture();
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
            default:
                break;
        }
    };
    return Button;
}(eui.UILayer));
__reflect(Button.prototype, "Button");
//# sourceMappingURL=Button.js.map