!function(a, b, c) {
    var d;
    (a.raid_parts_attack = function(b, d, e) {
        null == e && (e = !1), this.initialize(b, d, e, {}), this.frame_0 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0).wait(1)), this.raid_parts_attack = new a.mc_raid_parts_attack, this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.raid_parts_attack}]}).wait(2))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(4, 0, 282, 105), (a.raid_parts_attack_off = function() {
        this.sourceRect = new c.Rectangle(0, 0, 282, 105), this.initialize(b.raid_parts_attack)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 282, 105), (a.raid_parts_attack_on = function() {
        this.sourceRect = new c.Rectangle(282, 0, 282, 105), this.initialize(b.raid_parts_attack)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 282, 105), (a.gr_raid_parts_attack_on = function() {
        this.initialize(), this.instance = new a.raid_parts_attack_on, this.addChild(this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(0, 0, 282, 105), (a.gr_raid_parts_attack = function() {
        this.initialize(), this.instance = new a.raid_parts_attack_off, this.addChild(this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(0, 0, 282, 105), (a.mc_raid_parts_tap_attack_out = function(b, d, e) {
        this.initialize(b, d, e, {}), this.frame_3 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).wait(3).call(this.frame_3)), this.instance = new a.gr_raid_parts_attack_on, this.instance.setTransform(4, -28.3, 1, 1, 0, 0, 0, 0, -33.4), this.timeline.addTween(c.Tween.get(this.instance).to({y: -33.2,alpha: 0}, 2).to({_off: !0}, 1).wait(1)), this.instance_1 = new a.gr_raid_parts_attack, this.instance_1.setTransform(4, -29.3, 1, 1, 0, 0, 0, 0, -33.4), this.timeline.addTween(c.Tween.get(this.instance_1).to({y: -33.2}, 2).to({_off: !0}, 1).wait(1))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(4, 4, 282, 106), (a.mc_raid_parts_attack_out = function(b, d, e) {
        this.initialize(b, d, e, {}), this.frame_1 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).wait(1).call(this.frame_1)), this.instance = new a.gr_raid_parts_attack, this.instance.setTransform(28, -33.3, 1, 1, 0, 0, 0, 0, -33.4), this.timeline.addTween(c.Tween.get(this.instance).to({_off: !0}, 1).wait(1))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(28, 0, 282, 105), (a.mc_raid_parts_attack_in = function(b, d, e) {
        this.initialize(b, d, e, {}), this.frame_0 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0)), this.instance = new a.gr_raid_parts_attack, this.instance.setTransform(4, -33.3, 1, 1, 0, 0, 0, 0, -33.4), this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.instance}]}).wait(1))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(4, 0, 282, 105), (a.mc_raid_parts_attack = function(b, d, e) {
        this.initialize(b, d, e, {"in": 0,out: 5,tap_out: 10}), this.frame_0 = function() {
            this.raid_parts_attack_in.gotoAndPlay(0)
        }, this.frame_4 = function() {
            this.stop()
        }, this.frame_5 = function() {
            this.raid_parts_attack_out.gotoAndPlay(0)
        }, this.frame_9 = function() {
            this.stop()
        }, this.frame_10 = function() {
            this.raid_parts_attack_tap_out.gotoAndPlay(0)
        }, this.frame_15 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1).call(this.frame_5).wait(4).call(this.frame_9).wait(1).call(this.frame_10).wait(5).call(this.frame_15)), this.raid_parts_attack_tap_out = new a.mc_raid_parts_tap_attack_out, this.raid_parts_attack_tap_out._off = !0, this.timeline.addTween(c.Tween.get(this.raid_parts_attack_tap_out).wait(10).to({_off: !1}, 0).wait(6)), this.raid_parts_attack_out = new a.mc_raid_parts_attack_out, this.raid_parts_attack_out._off = !0, this.timeline.addTween(c.Tween.get(this.raid_parts_attack_out).wait(5).to({_off: !1}, 0).to({_off: !0}, 5).wait(6)), this.raid_parts_attack_in = new a.mc_raid_parts_attack_in, this.timeline.addTween(c.Tween.get(this.raid_parts_attack_in).to({_off: !0}, 5).wait(11))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(4, 0, 282, 105)
}(lib = lib || {}, images = images || {}, createjs = createjs || {});
var lib, images, createjs;
