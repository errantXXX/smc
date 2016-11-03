define(["jquery", "backbone", "model/token-data"], function (a, b, c) {
    var d = c.extend({
        urlRoot: function (a, b, c, d) {
            return 1 == d ? Game.baseUri + "semiraid/" + a + ".json" : 1 == c ? Game.baseUri + "multiraid/" + a + ".json" : Game.baseUri + "raid/" + a + ".json"
        }
    });
    return d
});