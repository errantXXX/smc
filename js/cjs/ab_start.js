!function(a, b, c) {
    var d;
    (a.ab_start = function(b, d, e) {
        this.initialize(b, d, e, {}), this.frame_0 = function() {
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0).wait(1)), this.ab_start = new a.ab_start3_1, this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.ab_start}]}).wait(2))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 0, 0, 0), (a.ab_start_f213 = function() {
        this.sourceRect = new c.Rectangle(56, 216, 28, 28), this.initialize(b.ab_start)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 28, 28), (a.ab_start1 = function() {
        this.sourceRect = new c.Rectangle(8, 8, 200, 200), this.initialize(b.ab_start)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 200, 200), (a.ab_start2 = function() {
        this.sourceRect = new c.Rectangle(216, 8, 14, 275), this.initialize(b.ab_start)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 14, 275), (a.ab_start3 = function() {
        this.sourceRect = new c.Rectangle(8, 216, 40, 40), this.initialize(b.ab_start)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 40, 40), (a.ab_start2_1 = function(b, d, e) {
        this.initialize(b, d, e, {}), this.frame_0 = function() {
            this.compositeOperation = "lighter"
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0)), this.instance = new a.ab_start2, this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.instance}]}).wait(1))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 0, 14, 275), (a.ab_start1_1 = function() {
        this.initialize(), this.instance = new a.ab_start1, this.addChild(this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(0, 0, 200, 200), (a.ab_start_f213_1 = function() {
        this.initialize(), this.instance = new a.ab_start_f213, this.addChild(this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(0, 0, 28, 28), (a.mc_ab_start_effect = function(b, d, e) {
        null == e && (e = !1), this.initialize(b, d, e, {}), this.frame_1 = function() {
            require(["lib/sound"], function(a) {
                a.play("se/ab_0000_se_1.mp3")
            })
        }, this.frame_13 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).wait(1).call(this.frame_1).wait(12).call(this.frame_13)), this.instance = new a.ab_start2_1, this.instance.setTransform(0, -106, 11.85, .884, 90, 0, 0, 7, 138), this.instance.compositeOperation = "lighter", this.instance._off = !0, this.timeline.addTween(c.Tween.get(this.instance).wait(6).to({_off: !1}, 0).wait(1).to({scaleX: 5.85,scaleY: 1.79}, 0).to({scaleX: 2.31,scaleY: 2.38,x: 0}, 1).to({scaleX: 1.13,scaleY: 2.59,x: 0,alpha: .199}, 3).to({_off: !0}, 1).wait(2)), this.instance_1 = new a.ab_start1_1, this.instance_1.setTransform(0, -107, 1, 1, 0, 0, 0, 100, 100), this.instance_1._off = !0, this.timeline.addTween(c.Tween.get(this.instance_1).wait(7).to({_off: !1}, 0).to({scaleX: 1.1,scaleY: 1.1,alpha: .602}, 2).to({scaleX: 1.24,scaleY: 1.24,alpha: .129}, 3).to({_off: !0}, 1).wait(1)), this.instance_2 = new a.ab_start_f213_1, this.instance_2.setTransform(0, -106, 1, 1, 0, 0, 0, 14, 14), this.instance_2.alpha = .25, this.instance_2._off = !0, this.timeline.addTween(c.Tween.get(this.instance_2).wait(1).to({_off: !1}, 0).wait(1).to({scaleX: 2.78,scaleY: 2.78,alpha: .488}, 0).to({scaleX: 2.96,scaleY: 2.96,y: -106,alpha: .691}, 1).to({scaleX: 3.5,scaleY: 3.5,y: -105,alpha: 1}, 3).wait(1).to({scaleX: 10.81,scaleY: 10.81,x: -4,alpha: .602}, 0).wait(1).to({scaleX: 11.55,scaleY: 11.55,alpha: .301}, 0).to({_off: !0}, 1).wait(5))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 0, 0, 0), (a.ab_start3_1 = function(b, d, e) {
        null == e && (e = !1), this.initialize(b, d, e, {}), this.frame_0 = function() {
            this.ab_start_effect.gotoAndPlay(0)
        }, this.frame_6 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0).wait(6).call(this.frame_6)), this.ab_start_effect = new a.mc_ab_start_effect, this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.ab_start_effect}]}).wait(7))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 0, 0, 0)
}(lib = lib || {}, images = images || {}, createjs = createjs || {});
var lib, images, createjs;
