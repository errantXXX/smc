!function(a, b, c) {
    var d;
    (a.phit_kn_0003 = function(b, d, e) {
        this.initialize(b, d, e, {}), this.frame_0 = function() {
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0).wait(1)), this.phit_kn_0003 = new a.mc_phit_kn_0003, this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.phit_kn_0003}]}).wait(2))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 0, 0, 0), (a.phit_kn_0003_all = function() {
        this.sourceRect = new c.Rectangle(1, 1, 186, 128), this.initialize(b.phit_kn_0003)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 186, 128), (a.phit_kn_0003_ef6 = function() {
        this.initialize(), this.instance = new a.phit_kn_0003_all, this.instance.setTransform(-93, -64), this.addChild(this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(-93, -64, 186, 128), (a.mc_phit_kn_0003_effect = function(b, d, e) {
        null == e && (e = !1), this.initialize(b, d, e, {}), this.frame_0 = function() {
        }, this.frame_1 = function() {
            require(["lib/sound"], function(a) {
                a.play("se/phit_kn_0003_se_1.mp3")
            })
        }, this.frame_6 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(5).call(this.frame_6)), this.instance = new a.phit_kn_0003_ef6, this.instance.setTransform(146, -257, 1.994, 1.198, 0, -30, -29.7, 93, 0), this.instance._off = !0, this.timeline.addTween(c.Tween.get(this.instance).wait(2).to({_off: !1}, 0).wait(1).to({regY: .3,scaleX: 3.02,scaleY: .41,rotation: -29.6,skewX: 0,skewY: 0,x: 244,y: -298}, 0).wait(1).to({regY: .1,scaleY: .21,x: 247,y: -294}, 0).to({_off: !0}, 1).wait(2)), this.instance_1 = new a.phit_kn_0003_ef6, this.instance_1.setTransform(181, -104, 1.995, 1.199, 23.1, 0, 0, 93, 0), this.instance_1._off = !0, this.timeline.addTween(c.Tween.get(this.instance_1).wait(3).to({_off: !1}, 0).wait(1).to({scaleX: 3.02,scaleY: .41,rotation: 23,x: 250,y: -59}, 0).wait(1).to({regY: .3,scaleY: .21,x: 252,y: -51}, 0).to({_off: !0}, 1).wait(1))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 0, 0, 0), (a.mc_phit_kn_0003 = function(b, d, e) {
        null == e && (e = !1), this.initialize(b, d, e, {}), this.frame_0 = function() {
            this.phit_kn_0003_effect.gotoAndPlay(0)
        }, this.frame_6 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0).wait(6).call(this.frame_6)), this.phit_kn_0003_effect = new a.mc_phit_kn_0003_effect, this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.phit_kn_0003_effect}]}).wait(7))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 0, 0, 0)
}(lib = lib || {}, images = images || {}, createjs = createjs || {});
var lib, images, createjs;
