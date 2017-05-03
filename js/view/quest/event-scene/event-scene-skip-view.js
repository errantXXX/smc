define(["view/quest/abstract-view", "view/popup"], function (a, b) {
    var c = a.extend({el: ".btn-skip", events: {tap: "showSynopsis"}, initialize: function (a) {
        this.init(), this.scene_id = a.scene_id, this.forwardFlg = a.forwardFlg, this.areaId = a.areaId, this.completedQuestId = a.completed_quest_id, this.locationId = a.location_id, this.nextNumbersId = a.nextNumbersId
    }, setSynopsis: function (a, b) {
        this.synopsisTitle = a, this.synopsisBody = b
    }, setOpenScene: function (a) {
        this.open_scene_url = a
    }, showSynopsis: function () {
        var a = {title: this.synopsisTitle, synopsis: this.synopsisBody};
        this.popView = new b({className: "pop-synopsis", title: a.title, body: _.template($("#tpl-synopsis").html(), a), flagBtnCancel: 1, flagBtnOk: 1}), a.synopsis ? (this.popView.render(), this.popView.popShow()) : this.end(), this.trigger("tap")
    }, end: function () {
        cjs.stage.sceneEffect && cjs.stage.sceneEffect.removeAllEventListeners("tick"), cjs.stage.scenePrivate && cjs.stage.scenePrivate.removeAllEventListeners("tick"), this.forwardFlg === window.SCENE_RETURN_ID_DEBUG ? location.href = Game.baseUri + "debug" : this.open_scene_url ? (this.content_close(), Backbone.history.navigate(this.open_scene_url, !0)) : this.fowardTo(this.forwardFlg, this.areaId, this.completedQuestId, this.locationId, null, this.nextNumbersId)
    }});
    return c
});