!function(a, b, c) {
    var d;
    (a.ehit_sw_0004 = function() {
        this.initialize(), this.ehit_sw_0004 = new a.mc_ehit_sw_0004, this.addChild(this.ehit_sw_0004)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(0, 0, 0, 0), (a.ehit_sw_0004_all = function() {
        this.sourceRect = new c.Rectangle(1, 1, 52, 240), this.initialize(b.ehit_sw_0004)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 52, 240), (a.ehit_sw_0004_ef6 = function() {
        this.initialize(), this.instance = new a.ehit_sw_0004_all, this.instance.setTransform(-26, -120), this.addChild(this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(-26, -120, 52, 240), (a.ehit_sw_0004_effect = function(b, d, e) {
        null == e && (e = !1), this.initialize(b, d, e, {}), this.frame_0 = function() {
        }, this.frame_1 = function() {
            require(["lib/sound"], function(a) {
                a.play("se/phit_sw_0002_se_1.mp3")
            })
        }, this.frame_7 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(6).call(this.frame_7)), this.instance = new a.ehit_sw_0004_ef6, this.instance.setTransform(-81, -201, .816, .47, 0, -36.4, 142.3, 0, 120), this.instance._off = !0, this.timeline.addTween(c.Tween.get(this.instance).wait(2).to({_off: !1}, 0).wait(1).to({regX: 0,regY: 120,scaleX: .27,scaleY: 1.69,x: 85,y: 23}, 0).wait(1).to({regX: 0,regY: 120,scaleX: .21,scaleY: 1.07,x: 112,y: 58}, 0).wait(1).to({regX: 0,scaleX: .12,scaleY: .53,x: 131,y: 85}, 0).to({_off: !0}, 1).wait(2))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 0, 0, 0), (a.mc_ehit_sw_0004 = function(b, d, e) {
        this.initialize(b, d, e, {}), this.frame_4 = function() {
            this.stop()
        }, this.frame_5 = function() {
            this.ehit_sw_0004_effect.gotoAndPlay(0)
        }, this.frame_11 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).wait(4).call(this.frame_4).wait(1).call(this.frame_5).wait(6).call(this.frame_11)), this.ehit_sw_0004_effect = new a.ehit_sw_0004_effect, this.ehit_sw_0004_effect._off = !0, this.timeline.addTween(c.Tween.get(this.ehit_sw_0004_effect).wait(5).to({_off: !1}, 0).wait(7))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 0, 0, 0)
}(lib = lib || {}, images = images || {}, createjs = createjs || {});
var lib, images, createjs;
