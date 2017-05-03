define(["model/content", "model/data", "model/token-data", "view/quest/abstract-view", "view/quest/event-scene-view", "view/quest/event-scene/event-scene-event-footer-view", "view/quest/event-scene/event-scene-skip-view", "view/popup", "general"], function (a, b, c, d, e, f, g, h, i) {
    var j = null, k = d.extend({questId: null, currentLocationId: null, questType: null, scene_id: null, forwardFlg: null, popView: null, initialize: function (b) {

        this.content_bind(),
            this.questId = b.questId,
            this.currentLocationId = b.currentLocationId,
            this.questType = b.questType,
            this.scene_id = b.scene_id,
            this.forwardFlg = b.forwardFlg,
            this.areaId = b.area_id,
            this.completedQuestId = b.completed_quest_id,
            this.locationId = b.location_id,
            this.sub_contents = b.sub_contents,
            this.forceFirststoryPlay = b.force_firststory_play || 0,
            this.nextNumbersId = b.nextNumbersId || 0,
            this.content_model = new a({controller: "quest", action: "scene"}),
            this.listenTo(this.content_model, "change", this.render),
            this.listenTo(this.content_model, "error", this.error),
            this.content_model.fetch()
    }, events: {"tap .skip_confirm .btn-usual-cancel": "popRemove", "tap .skip_confirm .btn-usual-ok": "sceneSkipRequest", "tap .pop-synopsis .btn-usual-ok": "sceneSkipEnd", "tap .pop-synopsis .btn-usual-cancel": "popSynopsisRemove", "tap .btn-auto": "pushAutoButton", "tap #cjs-scene-effect": "pushSceneCanvas"},
        render: function (a) {

        this.sub_contents ? $("#sub_contents").html(decodeURIComponent(a.get("data"))) : this.$el.html(decodeURIComponent(a.get("data")));
        var b = this.instanceEventSceneView();
        this.eventSceneSkipView = this.instanceEventSceneSkipView(),
            b.setEventSceneSkipView(this.eventSceneSkipView), this.listenTo(this.eventSceneSkipView, "tap", function () {
            b._clearNextDeferred()
        });
        var c = this.instanceEventSceneEventFooterView(b);
        return this.listenTo(c, "pushLogButton", function () {
            b._clearNextDeferred()
        }), this.global_initialize(), this
    }, instanceEventSceneView: function () {
        var a = new e({questId: this.questId, currentLocationId: this.currentLocationId, questType: this.questType, scene_id: this.scene_id, forwardFlg: this.forwardFlg, areaId: this.areaId, completed_quest_id: this.completedQuestId, location_id: this.locationId, forceFirststoryPlay: this.forceFirststoryPlay, nextNumbersId: this.nextNumbersId});
        return this.addSubView(a), a
    }, instanceEventSceneSkipView: function () {
        var a = new g({scene_id: this.scene_id, forwardFlg: this.forwardFlg, areaId: this.areaId, completed_quest_id: this.completedQuestId, location_id: this.locationId, forceFirststoryPlay: this.forceFirststoryPlay, nextNumbersId: this.nextNumbersId});
        return this.addSubView(a), a
    }, instanceEventSceneEventFooterView: function (a) {
        var b = new f({event_scene: a});
        return this.addSubView(b), b
    }, popRemove: function () {
        this.popView.popRemove()
    }, popSynopsisRemove: function () {
        this.eventSceneSkipView.popView.popRemove()
    }, sceneSkip: function () {
        this.content_close(), null !== this.popView && this.popView.popRemove(), this.eventSceneSkipView.end()
    }, sceneSkipEnd: function () {
        var a = this, b = window.location.hash;
        this.$el.find(".cnt-quest-scene").fadeOut(2e3, function () {
            b === window.location.hash && a.eventSceneSkipView.end()
        })
    }, pushAutoButton: function (a) {
        var b = this, d = $("#btn-auto"), e = this.isOnAutoButton(), f = new (c.extend({urlRoot: Game.baseUri + "quest/setting_scene_auto"}));
        this.listenToOnce(f, "sync", function (a) {
            e ? (d.addClass("off"), b.fadeInAutoButton()) : (d.removeClass("off"), b.fadeOutAutoButton())
        }), f.set({mode_scene_auto: e ? "off" : "on"}), f.save()
    }, fadeInAutoButton: function () {
        this.appearAutoButton(), j && window.clearTimeout(j)
    }, fadeOutAutoButton: function () {
        this.appearAutoButton(), this.delayFadeoutAutoButton(2e3)
    }, appearAutoButton: function () {
        $("#btn-auto").css("opacity", 1)
    }, disappearAutoButton: function () {
        $("#btn-auto").css("opacity", .001)
    }, pushSceneCanvas: function () {
        this.appearAutoButton(), this.delayFadeoutAutoButton(2e3)
    }, isOnAutoButton: function () {
        return+!$("#btn-auto").hasClass("off")
    }, delayFadeoutAutoButton: function (a) {
        if (this.isOnAutoButton()) {
            var b = this;
            this.listenToOnce(this, "runTask", function () {
                b.disappearAutoButton()
            }), this.delayRun(a)
        }
    }, delayRun: function (a) {
        var b = this;
        j && window.clearTimeout(j), j = window.setTimeout(function () {
            b.trigger("runTask")
        }, a)
    }});
    return k
});