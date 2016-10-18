define(["jquery", "backbone", "model/token-data", "sky/view/content"], function(a, b, c, d) {
    var e = c.extend({
        urlRoot: function(a, b, c, d) {
            var e = b ? "tutorial" : "raid";
            return this.action = a || this.action, this.is_multi = c || this.is_multi, this.is_semi = d || this.is_semi, this.is_semi ? Game.baseUri + "semiraid/" + this.action + ".json" : this.is_multi ? Game.baseUri + "multiraid/" + this.action + ".json" : Game.baseUri + e + "/" + this.action + ".json"
        },preSave: function(a, b, c, d) {
            a ? this.checkReAuth(b, c, d) : this.save(b, c, d)
        },checkReAuth: function(b, c, e) {
            var f = this, g = ".cnt-raid", h = new d;
            h.getReAuthStatus(g), a(g).on("complete_check_reauth", function(d) {
                a(this).off(d), f.save(b, c, e)
            })
        }});
    return e
});
