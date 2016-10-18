define(["backbone", "util/navigate", "view/content", "view/popup", "sky/view/auth/handle", "model/user/status", "model/token-data"], function(a, b, c, d, e, f, g) {
    var h = c.extend({getReAuthStatus: function(a, b) {
        var c = this, d = new (g.extend({urlRoot: Game.baseUri + "sky/user/user_status"}));
        this.stopListening(d, "sync"), this.listenToOnce(d, "sync", function(d) {
            var f = d.toJSON();
            f.re_auth ? (f.last_check ? e.getGeolocationWatch(a) : e.getGeolocation(a, 1), $(a).on({success_post_reauth: function(c) {
                $(this).off(c), $(a).trigger("complete_check_reauth", b)
            },error_post_reauth: function(a) {
                $(this).off(a), c.popErrorReAuth()
            }})) : $(a).trigger("complete_check_reauth", b)
        }), d.save()
    },popErrorReAuth: function() {
        var a = this, b = "位置情報が取得できませんでした。<br>イベントTOPページに戻ります。", c = new d({el: "#pop-force",className: "pop-error-reauth",title: "位置情報認証",body: b,flagBtnOk: 1});
        c.on("ok", function() {
            c.popRemove(), a.locationAuthCheckRefresh()
        }), c.$el.html(_.template($("#exception-error-popup").html(), c.options)), c.popShow()
    },locationSkyTopRefresh: function() {
        b.hash("#sky/top", {refresh: !0})
    },locationAuthCheckRefresh: function() {
        b.hash("#sky/auth/check", {refresh: !0})
    },getStatus: function() {
        var a = new f;
        this.stopListening(a, "sync"), this.listenToOnce(a, "sync", this.statusRender), a.fetch()
    },statusRender: function(a) {
        var b = a.toJSON().status;
        this.$el.find(".prt-user-status").html(_.template($("#tpl-user-status").html(), b)), this.numRepStatus($(".txt-stamina-value"), "num-stamina"), this.bpReplace($(".prt-user-bp-value"), $(".prt-user-bp-value").attr("title")), this.getSkyUserStatusDeferred.resolve()
    },bpReplace: function(a, b) {
        a.html("");
        for (var c = 0; b > c; c++)
            a.append("<span class='ico-bp' />")
    }});
    return h
});
