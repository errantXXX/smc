define(["backbone", "model/data", "model/token-data", "view/content", "util/navigate"], function (a, b, c, d, e) {
    var f = d.extend({init: function () {
        window.SCENE_RETURN_ID_STAGE = "0", window.SCENE_RETURN_ID_RAID = "1", window.SCENE_RETURN_ID_LIST = "2", window.SCENE_RETURN_ID_REWARD = "3", window.SCENE_RETURN_ID_GACHA = "4", window.SCENE_RETURN_ID_ARCHIVE = "5", window.SCENE_RETURN_ID_ISLAND_RELEASE = "6", window.SCENE_RETURN_ID_MYPAGE = "7", window.SCENE_RETURN_ID_EVENT = "8", window.SCENE_RETURN_ID_DEBUG = "9", window.SCENE_RETURN_ID_COOP_QUEST = "10", window.SCENE_RETURN_ID_FATE = "12", window.SCENE_RETURN_ID_ARCHAIC = "13", window.SCENE_RETURN_ID_APRILFOOL = "14", window.SCENE_RETURN_ID_SKY = "15", window.SCENE_RETURN_ID_REWARD_NOT_FATE = "23"
    }, fowardTo: function (d, e, f, g, h, i) {
        var j = h || "";
        this.content_close();
        if (d == window.SCENE_RETURN_ID_RAID)this.locationRaid(j); else if (d == window.SCENE_RETURN_ID_LIST)this.fowardQuestList(e, f); else if (d == window.SCENE_RETURN_ID_REWARD)this._fowardRewardPre(); else if (d == window.SCENE_RETURN_ID_GACHA)window.history.back(); else {
            if (d == window.SCENE_RETURN_ID_ARCHIVE)return void history.back();
            if (d == window.SCENE_RETURN_ID_ISLAND_RELEASE)a.history.navigate("quest/island/release/" + g, !0); else if (d == window.SCENE_RETURN_ID_MYPAGE)a.history.navigate("mypage", !0); else if (d == window.SCENE_RETURN_ID_EVENT) {
                (_.isUndefined(e) || _.isNull(e)) && (e = ""), (_.isUndefined(f) || _.isNull(f)) && (f = "");
                var k = new (b.extend({urlRoot: Game.baseUri + "quest/redirect_location/" + e + "/" + f}));
                k.fetch()
            } else if (d == window.SCENE_RETURN_ID_COOP_QUEST)a.history.navigate("coopraid", !0); else if (d == window.SCENE_RETURN_ID_FATE) {
                var l = i ? "quest/fate/q" + i : "quest/fate";
                a.history.navigate(l, !0)
            } else if (d == window.SCENE_RETURN_ID_ARCHAIC)a.history.navigate("archaic/numbers", !0); else if (d == window.SCENE_RETURN_ID_APRILFOOL)a.history.navigate("surprise/aprilfool", !0); else if (d == window.SCENE_RETURN_ID_SKY)a.history.navigate("surprise/sky", !0); else if (d == window.SCENE_RETURN_ID_REWARD_NOT_FATE)Game.ua.isIOS() && Game.ua.versionCompare(Game.ua.os.version, "8") >= 0 ? setTimeout(function () {
                location.hash = "#result/quest/"
            }, 500) : a.history.navigate("result/quest/", !0); else {
                var m = new (c.extend({urlRoot: Game.baseUri + "quest/update_prologue_browsed_flg_already_read"}));
                this.stopListening(m, "sync"), this.listenToOnce(m, "sync", function () {
                    a.history.navigate("quest/stage", !0)
                }), m.save()
            }
        }
    }, locationRaid: function (a) {
        var c = $(".prt-scene-stage").data("duplicate-key");
        c || (c = $("#cnt-quest").data("duplicate-key-two") || $("#cnt-room-index").data("duplicate-key-two"));
        var d = new (b.extend({urlRoot: Game.baseUri + "quest/raid_info"}));
        this.stopListening(d, "sync"), this.listenToOnce(d, "sync", this.fowardRaid), d.set("duplicate_key", c), d.set("quest_type", a), d.save()
    }, fowardRaid: function (a) {
        this.stopStageEvent();
        var b = a.get("raid_id");
        1 == a.get("is_multi") ? e.hash("raid_multi/" + b, {refresh: !0}) : e.hash("raid/" + b, {refresh: !0})
    }, fowardQuestList: function (b, c) {
        b ? a.history.navigate("quest/index/" + b + "/" + c, !0) : a.history.navigate("quest/index", !0)
    }, _fowardRewardPre: function () {
        var a = new (c.extend({urlRoot: Game.baseUri + "quest/check_fate_quest_progress"}));
        this.stopListening(a, "sync"), this.listenToOnce(a, "sync", this._fowardReward), a.fetch()
    }, _fowardReward: function (b) {
        1 == b.get("result") && (Game.ua.isIOS() && Game.ua.versionCompare(Game.ua.os.version, "8") >= 0 ? setTimeout(function () {
            location.hash = "#result/quest/"
        }, 500) : a.history.navigate("result/quest/", !0))
    }, removeDelimited: function (a) {
        return a.replace(/,/g, "")
    }, currencyFormat: function (a) {
        for (var b = String(a); b != (b = b.replace(/^(-?\d+)(\d{3})/, "$1,$2")););
        return b
    }, startsWith: function (a, b) {
        return 0 == a.indexOf(b)
    }, addPortion: function (a) {
        var b = $(".ico-s").attr("title");
        $(".ico-s").attr("title", parseInt(b) + parseInt(a))
    }, addPortionAll: function (a) {
        var b = $(".ico-l").attr("title");
        $(".ico-l").attr("title", parseInt(b) + parseInt(a))
    }, stopStageEvent: function () {
        "undefined" != typeof stage && createjs.Ticker.removeEventListener("tick", stage)
    }, isNotEmpty: function (a) {
        return"null" === a ? !1 : "　" === a ? !1 : " " === a ? !1 : a ? !0 : !1
    }});
    return f
});