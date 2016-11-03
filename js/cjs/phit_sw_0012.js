!function(a, b, c) {
    var d;
    (a.phit_sw_0012 = function(b, d, e) {
        null == e && (e = !1), this.initialize(b, d, e, {}), this.frame_0 = function() {
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0).wait(1)), this.phit_sw_0012 = new a.mc_phit_sw_0012, this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.phit_sw_0012}]}).wait(2))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 0, 0, 0), (a.phit_sw_0012_all = function() {
        this.sourceRect = new c.Rectangle(1, 1, 160, 100), this.initialize(b.phit_sw_0012)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 160, 100), (a.phit_sw_0012_ef6 = function() {
        this.initialize(), this.instance = new a.phit_sw_0012_all, this.instance.setTransform(0, -480), this.addChild(this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(0, -480, 160, 100), (a.mc_phit_sw_0012_effect = function(b, d, e) {
        null == e && (e = !1), this.initialize(b, d, e, {}), this.frame_0 = function() {
        }, this.frame_1 = function() {
            require(["lib/sound"], function(a) {
                a.play("se/phit_sp_0001_se_1.mp3")
            })
        }, this.frame_6 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(5).call(this.frame_6)), this.instance = new a.phit_sw_0012_ef6, this.instance.setTransform(-1421, 388, .292, 3.597, 67.7), this.instance._off = !0, this.timeline.addTween(c.Tween.get(this.instance).wait(2).to({_off: !1}, 0).wait(1).to({scaleX: 2.66,scaleY: .94,rotation: 22.5,x: -315,y: 122}, 0).wait(1).to({scaleX: 2.62,scaleY: .46,x: -231,y: -63}, 0).wait(1).to({scaleX: 1.74,scaleY: .08,x: -99,y: -180}, 0).to({_off: !0}, 1).wait(1)), this.instance_1 = new a.phit_sw_0012_ef6, this.instance_1.setTransform(-97, -175, 1.084, .119, 28.1), this.instance_1._off = !0, this.timeline.addTween(c.Tween.get(this.instance_1).wait(2).to({_off: !1}, 0).to({_off: !0}, 1).wait(4))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 0, 0, 0), (a.mc_phit_sw_0012 = function(b, d, e) {
        this.initialize(b, d, e, {}), this.frame_0 = function() {
            this.phit_sw_0012_effect.gotoAndPlay(0)
        }, this.frame_6 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0).wait(6).call(this.frame_6)), this.phit_sw_0012_effect = new a.mc_phit_sw_0012_effect, this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.phit_sw_0012_effect}]}).wait(7))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 0, 0, 0)
}(lib = lib || {}, images = images || {}, createjs = createjs || {});
var lib, images, createjs;
