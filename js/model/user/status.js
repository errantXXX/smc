define(["backbone", "model/data"], function (a, b) {
    var c = b.extend({
        urlRoot: function () {
            return Game.baseUri + "user/status"
        }
    });
    return c
});