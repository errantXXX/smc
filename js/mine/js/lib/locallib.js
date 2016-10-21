define('view/loading', ["underscore", "backbone"], function(_,Backbone) {
    var loading = Backbone.View.extend({el: "#loading",initialize: function() {
        _.bindAll(this)
    },loadStart: function() {
        this.$el.add("#ready").css("display", "block"), $(".contents").css("display", "none"), this.fadeControll(!0);
    },xhrStart: function() {
        this.$el.css("display", "block"), this.fadeControll(!0)
    },loadEnd: function() {
        this.$el.css("display", "none"), this.fadeControll(!1), this.trigger("fadeOut")
    },xhrEnd: function() {
        this.$el.css("display", "none"), this.fadeControll(!1)
    },fadeControll: function(isHide) {
        isHide ? this.$el.find(".img-load").css("display", "block") : this.$el.find(".img-load").css("display", "none")
    }});
    return loading
});
define(["view/loading"]);