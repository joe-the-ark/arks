var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var base;
(function (base) {
    var AssetAdapter = (function () {
        function AssetAdapter() {
        }
        AssetAdapter.prototype.getAsset = function (source, compFunc, thisObject) {
            function onGetRes(data) {
                compFunc.call(thisObject, data, source);
            }
            var data = RES.getRes(source);
            if (data) {
                onGetRes(data);
            }
            else {
                RES.getResAsync(source, onGetRes, this);
            }
        };
        return AssetAdapter;
    }());
    base.AssetAdapter = AssetAdapter;
    __reflect(AssetAdapter.prototype, "base.AssetAdapter", ["eui.IAssetAdapter"]);
})(base || (base = {}));
//# sourceMappingURL=AssetAdapter.js.map