define(["underscore", "backbone", "typist", "view/quest/abstract-view"], function (a, b, c, d) {
    var e = null, f = d.extend({el: ".prt-message-area", render: function (a, b, c) {
        debugger;
        var d = this;
        e && clearTimeout(e), $(".prt-sel-area").hide(), d.$el.html('<span class="txt-message"></span>');
        var f = {height: "auto", fontFamily: "inherit", fontSize: 0}, g = d.$(".txt-message").typist(f), h = a.split(/<br.*?>/gi), i = d._countMessageLength(h), j = function () {
            $(".ico-cursor-talk").show()
        }, k = function () {
            if (void 0 !== c[0] && "" !== c[0]) {
                $(".cnt-quest-scene .prt-sel-area").css("display", "block").append('<div class="btn-sel-taparea"></div>');
                var a = $(".prt-scene-comment .btn-play-voice");
                $(".prt-sel-area .btn-sel-taparea").on("cgtouchstart", function () {
                    a.addClass("on")
                }).on("cgtouchmove cgtouchend", function () {
                    a.removeClass("on")
                }), $(".btn-skip").css("opacity", "0.5"), d._renderSelect(c)
            }
        };
        if (a.length <= 0)return j(), void d.trigger("talkEnd", {message: a, talkLength: i, displayMode: "full"});
        var l = function () {
            $(h).each(function (a, b) {
                console.info(b)
                g.typist("echo", b).typist("wait", 500)
            }), g.typist("wait", 600).typist("call", function () {
                console.info('end')
                j(), d.trigger("talkEnd", {message: a, talkLength: i, displayMode: "full"})
            })
        }, m = Game.setting.effect_mode;
        b && 0 != m ? ($(".btn-skip").css("opacity", "1"), $(".ico-cursor-talk").hide(), l()) : (this.$(".txt-message").html(a), j(), $(".btn-skip").css("opacity", "1"), c.length > 0 && k(), e = setTimeout(function () {
            d.trigger("talkEnd", {message: a, talkLength: i, displayMode: "simple"})
        }, 120 * i + 500))
    }, _renderSelect: function (b) {
        this._initSelect();
        var c = $(".prt-sel-inner"), d = 1 === a.without(b, void 0, "").length;
        c.toggleClass("prt-one-sel", d), a(b).each(function (a, b) {
            void 0 !== a && "" !== a && c.append('<div class="btn-select-baloon txt-sel' + (b + 1) + '">' + a + "</div>")
        })
    }, _initSelect: function () {
        $(".prt-sel-inner").html("")
    }, _countMessageLength: function (a) {
        var b = 0, c = !0;
        for (var d in a)for (var e in a[d])"<" === a[d][e] ? c = !1 : ">" === a[d][e] && (c = !0), c && b++;
        return b
    }});
    return f
});