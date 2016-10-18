define(["backbone", "model/content", "view/content", "view/raid/setup", "sky/view/content", "util/local-storage"], function (a, b, c, d, e, f) {
    var g = "app", h = "chromeapp", i = "shellapp", j = c.extend({content_model: null, raid_id: null, action: null, events: {"tap .cnt-raid-header": "dispatchCanvasTap", "touchstart .cnt-raid-header": "dispatchCanvasTap", "touchend .cnt-raid-header": "dispatchCanvasTap"}, dispatchCanvasTap: function (a) {
        if ("undefined" != typeof a.originalEvent) {
            var b = "touchstart" === a.type ? "pressdown" : "pressup", c = a.x || a.originalEvent.changedTouches[0].clientX || a.originalEvent.touches[0].clientX, d = a.y || a.originalEvent.changedTouches[0].clientY || a.originalEvent.touches[0].clientY, e = new createjs.MouseEvent(b, !0, !1, c, d, a, -1, !0, c, d);
            "pressdown" === b ? stage._handlePointerDown(-1, e, c, d) : stage._handlePointerUp(-1, e, !1)
        }
    }, initialize: function (a) {
        if (a.is_semi) {
            var b = this, c = "#wrapper", d = new e;
            d.getReAuthStatus(c, a), $(c).on("complete_check_reauth", function () {
                $(this).off("complete_check_reauth"), b.raidMainInitialize(a)
            })
        } else this.raidMainInitialize(a)
    }, raidMainInitialize: function (a) {
        this.content_bind(), this.reload_flg = !1, null != f.get("hold_raid") && (f.get("hold_raid") == location.hash && null == f.get("return_raid_url") && (this.reload_flg = !0), f.remove("hold_raid")), f.set("hold_raid", location.hash), f.get("return_raid_url") == location.hash || this.reload_flg || (f.remove("cheer_already"), f.remove("cheer_compleate"), f.remove("cheer_effect_text"), f.remove("cheer_pop_flg"), f.remove("popCheer_cancel"), f.remove("lose_pop_flg")), f.remove("return_raid_url");
        var c = {raid_id: a.raid_id};
        this.raid_id = a.raid_id, this.action = a.action, this.is_multi = a.is_multi, this.is_semi = a.is_semi, a.speed && (this.speed = a.speed, c.speed = this.speed), a.lock && (this.lock = a.lock), a.cmd && (this.cmd = a.cmd, this.uid = a.uid, this.stp = a.stp, this.trn = a.trn, this.fwd = a.fwd, this.tgt = a.tgt, c.cmd = this.cmd, c.uid = this.uid, c.stp = this.stp, c.trn = this.trn, c.fwd = this.fwd, c.tgt = this.tgt), a.is_semi ? this.content_model = new b({controller: "semiraid", action: "index", param: c}) : a.is_multi ? this.content_model = new b({controller: "multiraid", action: "index", param: c}) : this.content_model = new b({controller: "raid", action: "index", param: c}), this.listenTo(this.content_model, "change", this.render), this.content_model.fetch(), $(window).on("orientationchange", function () {
            stage.alpha = 0;
            var a = $(".lis-log");
            a.hide(), setTimeout(function () {
                window.scrollTo(0, 0), stage.alpha = 1, a.show()
            }, 1e3)
        })
    }, render: function () {
        this.content_render(this.content_model);
        var a = {raid_id: this.raid_id, action: this.action, is_multi: this.is_multi, is_semi: this.is_semi};
        return this.speed && (a.speed = this.speed), this.lock && (a.lock = this.lock), this.cmd && (a.cmd = this.cmd, a.uid = this.uid, a.stp = this.stp, a.trn = this.trn, a.fwd = this.fwd, a.tgt = this.tgt), this.reload_flg && (a.reload_flg = this.reload_flg), this.reload_flg && (a.reload_flg = this.reload_flg), this.setupView = new d(a), this.addSubView(this.setupView), Game.ua.isChromeApp() ? $(".cnt-raid").addClass(g + " " + h) : Game.shellAppFlag && $(".cnt-raid").addClass(g + " " + i), this.trigger("loadEnd"), this
    }});
    return j
});