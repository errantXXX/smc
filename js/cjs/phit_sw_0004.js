!function(a, b, c) {
    var d;
    (a.phit_sw_0004 = function(b, d, e) {
        this.initialize(b, d, e, {}), this.frame_0 = function() {
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0).wait(1)), this.phit_sw_0004 = new a.mc_phit_sw_0004, this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.phit_sw_0004}]}).wait(2))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 0, 0, 0), (a.phit_sw_0004_all = function() {
        this.sourceRect = new c.Rectangle(1, 1, 52, 240), this.initialize(b.phit_sw_0004)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 52, 240), (a.phit_sw_0004_ef6 = function() {
        this.initialize(), this.instance = new a.phit_sw_0004_all, this.instance.setTransform(-26, -120), this.addChild(this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(-26, -120, 52, 240), (a.mc_phit_sw_0004_effect = function(b, d, e) {
        null == e && (e = !1), this.initialize(b, d, e, {}), this.frame_0 = function() {
        }, this.frame_1 = function() {
            require(["lib/sound"], function(a) {
                a.play("se/phit_sp_0001_se_1.mp3")
            })
        }, this.frame_6 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(5).call(this.frame_6)), this.instance = new a.phit_sw_0004_ef6, this.instance.setTransform(72, -252, .827, .474, 37.1, 0, 0, 0, 120), this.instance._off = !0, this.timeline.addTween(c.Tween.get(this.instance).wait(2).to({_off: !1}, 0).wait(1).to({regX: .1,regY: 120.1,scaleX: .28,scaleY: 1.7,x: -98,y: -28}, 0).wait(1).to({regX: -.1,regY: 120,scaleX: .22,scaleY: 1.07,x: -126,y: 7}, 0).wait(1).to({regX: .1,regY: 119.9,scaleX: .13,scaleY: .54,x: -145,y: 34}, 0).to({_off: !0}, 1).wait(1))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 0, 0, 0), (a.mc_phit_sw_0004 = function(b, d, e) {
        null == e && (e = !1), this.initialize(b, d, e, {}), this.frame_0 = function() {
            this.phit_sw_0004_effect.gotoAndPlay(0)
        }, this.frame_6 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0).wait(6).call(this.frame_6)), this.phit_sw_0004_effect = new a.mc_phit_sw_0004_effect, this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.phit_sw_0004_effect}]}).wait(7))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 0, 0, 0)
}(lib = lib || {}, images = images || {}, createjs = createjs || {});
var lib, images, createjs;
