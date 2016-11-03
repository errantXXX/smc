!function(a, b, c) {
    var d;
    (a.raid_cutin = function(b, d, e) {
        this.initialize(b, d, e, {}), this.frame_0 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0).wait(1)), this.raid_cutin = new a.mc_raid_cutin, this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.raid_cutin}]}).wait(2))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 223, 1e3, 270), (a.cutin = function() {
        this.initialize(b.cutin)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 1e3, 270), (a.mc_raid_cutin_gra_cutin_img = function() {
        this.initialize(), this.instance = new a.cutin, this.addChild(this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(0, 0, 1e3, 270), (a.mc_raid_cutin_UI = function(b, d, e) {
        this.initialize(b, d, e, {cutin: 0}), this.frame_19 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).wait(19).call(this.frame_19)), this.instance = new a.mc_raid_cutin_gra_cutin_img, this.instance.setTransform(500, 358, 1, 1, 0, 0, 0, 500, 135), this.instance.alpha = .738, this.timeline.addTween(c.Tween.get(this.instance).to({x: 340,alpha: 1}, 3, c.Ease.get(1)).to({x: 290}, 11).to({x: 140,alpha: .391}, 2, c.Ease.get(-.99)).to({_off: !0}, 1).wait(3))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 223, 1e3, 270), (a.mc_raid_cutin = function(b, d, e) {
        this.initialize(b, d, e, {}), this.ui_parts = new a.mc_raid_cutin_UI, this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.ui_parts}]}).wait(8))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 223, 1e3, 270)
}(lib = lib || {}, images = images || {}, createjs = createjs || {});
var lib, images, createjs;
