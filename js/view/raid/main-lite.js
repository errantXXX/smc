define("view/raid/setup-lite",["backbone"],function(backbone){
    var view = backbone.View.extend({});
    return view;
})
define(["backbone", "model/content", "view/content", "view/raid/setup-lite", "sky/view/content", "util/local-storage"], function (backbone, contentModel, contentView, setupRaidView, contentViewSky, localStorageUtil) {
                /*a          b               c                   d                e                   f*/
    var g = "app",
        h = "chromeapp",
        i = "shellapp",
        j = contentView.extend({
            content_model: null,
            raid_id: null,
            action: null,
            events: {
                "tap .cnt-raid-header": "dispatchCanvasTap",
                "touchstart .cnt-raid-header": "dispatchCanvasTap",
                "touchend .cnt-raid-header": "dispatchCanvasTap"
            },
            dispatchCanvasTap: function (a) {
                if ("undefined" != typeof a.originalEvent) {
                    var b = "touchstart" === a.type ? "pressdown" : "pressup", c = a.x || a.originalEvent.changedTouches[0].clientX || a.originalEvent.touches[0].clientX, d = a.y || a.originalEvent.changedTouches[0].clientY || a.originalEvent.touches[0].clientY, e = new createjs.MouseEvent(b, !0, !1, c, d, a, -1, !0, c, d);
                    "pressdown" === b ? stage._handlePointerDown(-1, e, c, d) : stage._handlePointerUp(-1, e, !1)
                }
            },
            initialize: function (params) {
                    this.raidMainInitialize(params)
            },
            raidMainInitialize: function (params) {

                //this.content_bind(),
                console.info(params);
                var param = {
                    raid_id: params.raid_id
                };
                this.content_model = new contentModel({controller: "raid", action: "index", param: param}), this.listenTo(this.content_model, "change", this.render),
                this.content_model.fetch();

            },
            render: function () {
                this.content_render(this.content_model);
                var option = {raid_id: this.raid_id, action: this.action, is_multi: this.is_multi, is_semi: this.is_semi};
                this.setupView = new setupRaidView(option);
                    this.addSubView(this.setupView),
                    this.trigger("loadEnd");
                return this;
            }

        });
    return j
});