define(["underscore"], function(a) {
    return function(b) {
        var c = function(a) {
            this.initialize(a)
        }, d = c.prototype = new b.EventDispatcher;
        return d.EventDispatcher_initialize = d.initialize, d.initialize = function(a) {
            this.EventDispatcher_initialize(), this.manifest = a, this.spriteSheet = {}
        }, d.load = function() {
            this.queue = new b.LoadQueue(!1), this.queue.setMaxConnections(5), this.queue.on("complete", this.loaded, this), this.queue.loadManifest(this.manifest)
        }, d.loaded = function() {
            this.dispatchEvent("complete")
        }, d.getById = function(c) {
            return a.has(this.spriteSheet, c) ? this.spriteSheet[c] : (this.spriteSheet[c] = new b.SpriteSheet(this.queue.getResult(c)), this.spriteSheet[c])
        }, c
    }(createjs)
});
