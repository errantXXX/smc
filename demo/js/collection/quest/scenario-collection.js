define(["backbone", "model/quest/scenario-model", "collection/data"], function (a, b, c) {
    var d = c.extend({model: b, url: Game.baseUri + "quest/scenario/info.json?" + Math.random()});
    return d
});