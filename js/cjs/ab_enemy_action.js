!function(a, b, c) {
    var d;
    (a.ab_enemy_action = function(b, d, e) {
        this.initialize(b, d, e, {}), this.frame_0 = function() {
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0).wait(1)), this.ab_enemy_action = new a.ab_enemy_action_1, this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.ab_enemy_action}]}).wait(2))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 0, 0, 0), (a.ab_enemy_action_f1 = function() {
        this.sourceRect = new c.Rectangle(8, 8, 200, 200), this.initialize(b.ab_enemy_action)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 200, 200), (a.ab_enemy_action_f2 = function() {
        this.sourceRect = new c.Rectangle(216, 8, 14, 275), this.initialize(b.ab_enemy_action)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 14, 275), (a.ab_enemy_action_f213 = function() {
        this.sourceRect = new c.Rectangle(8, 216, 28, 28), this.initialize(b.ab_enemy_action)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 28, 28), (a.gr_ab_enemy_action_white = function() {
        this.initialize(), this.shape = (new c.Shape).setTransform(0, 0, 1, 1), this.shape.graphics.f("#FFFFFF").s().p("EkWzD0HMAAAnoOMItnAAAMAAAHoOg"), this.shape.setTransform(892.3, 781.2), this.addChild(this.shape)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(-892.1, -781.1, 3568.9, 3124.8), (a.gr_ab_enemy_action_f213 = function() {
        this.initialize(), this.instance = new a.ab_enemy_action_f213, this.addChild(this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(0, 0, 28, 28), (a.gr_ab_enemy_action_f2 = function(b, d, e) {
        this.initialize(b, d, e, {}), this.frame_0 = function() {
            this.compositeOperation = "lighter"
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0)), this.instance = new a.ab_enemy_action_f2, this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.instance}]}).wait(1))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 0, 14, 275), (a.gr_ab_enemy_action_f1 = function() {
        this.initialize(), this.instance = new a.ab_enemy_action_f1, this.addChild(this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(0, 0, 200, 200), (a.mc_ab_enemy_action_effect = function(b, d, e) {
        null == e && (e = !1), this.initialize(b, d, e, {}), this.frame_1 = function() {
            require(["lib/sound"], function(a) {
                a.play("se/ab_0000_se_1.mp3")
            })
        }, this.frame_13 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).wait(1).call(this.frame_1).wait(12).call(this.frame_13)), this.instance = new a.gr_ab_enemy_action_f2, this.instance.setTransform(.4, -174.8, 23.7, 1.767, 90, 0, 0, 7, 137.5), this.instance.compositeOperation = "lighter", this.instance._off = !0, this.timeline.addTween(c.Tween.get(this.instance).wait(6).to({_off: !1}, 0).wait(1).to({scaleX: 11.7,scaleY: 3.57}, 0).to({scaleX: 4.62,scaleY: 4.77,x: .3,y: -174.8}, 1).to({scaleX: 2.26,scaleY: 5.17,x: .4,y: -174.7,alpha: .199}, 3).to({_off: !0}, 1).wait(2)), this.instance_1 = new a.gr_ab_enemy_action_f1, this.instance_1.setTransform(.4, -175.5, 2.4, 2.4, 0, 0, 0, 100, 100), this.instance_1._off = !0, this.timeline.addTween(c.Tween.get(this.instance_1).wait(7).to({_off: !1}, 0).to({scaleX: 2.63,scaleY: 2.63,alpha: .602}, 2).to({scaleX: 2.98,scaleY: 2.98,alpha: .129}, 3).to({_off: !0}, 1).wait(1)), this.instance_2 = new a.gr_ab_enemy_action_f213, this.instance_2.setTransform(1.3, -173.6, 2.4, 2.4, 0, 0, 0, 14, 14), this.instance_2.alpha = .25, this.instance_2._off = !0, this.timeline.addTween(c.Tween.get(this.instance_2).wait(1).to({_off: !1}, 0).wait(1).to({scaleX: 6.68,scaleY: 6.68,y: -173.4,alpha: .488}, 0).to({scaleX: 7.11,scaleY: 7.11,y: -173.7,alpha: .691}, 1).to({scaleX: 8.39,scaleY: 8.39,y: -173.4,alpha: 1}, 3).wait(1).to({scaleX: 25.95,scaleY: 25.95,x: -8.1,alpha: .602}, 0).wait(1).to({scaleX: 27.71,scaleY: 27.71,alpha: .301}, 0).to({_off: !0}, 1).wait(5)), this.instance_3 = new a.gr_ab_enemy_action_white, this.instance_3.setTransform(116, -132.9, 1, 1, 0, 0, 0, 892.2, 781.2), this.instance_3.alpha = .191, this.instance_3._off = !0, this.timeline.addTween(c.Tween.get(this.instance_3).wait(4).to({_off: !1}, 0).to({alpha: .699}, 3).to({alpha: .25}, 2).to({alpha: .102}, 2).to({_off: !0}, 1).wait(2))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 0, 0, 0), (a.ab_enemy_action_1 = function(b, d, e) {
        null == e && (e = !1), this.initialize(b, d, e, {}), this.frame_0 = function() {
            this.ab_enemy_action_effect.gotoAndPlay(0)
        }, this.frame_6 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0).wait(6).call(this.frame_6)), this.ab_enemy_action_effect = new a.mc_ab_enemy_action_effect, this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.ab_enemy_action_effect}]}).wait(7))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 0, 0, 0)
}(lib = lib || {}, images = images || {}, createjs = createjs || {});
var lib, images, createjs;
