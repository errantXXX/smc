!function(a, b, c) {
    var d;
    (a.raid_parts_auto = function(b, d, e) {
        this.initialize(b, d, e, {}), this.frame_0 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0).wait(1)), this.raid_parts_auto = new a.mc_raid_parts_auto, this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.raid_parts_auto}]}).wait(2))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 0, 132, 44), (a.raid_parts_auto_off = function() {
        this.sourceRect = new c.Rectangle(8, 60, 132, 44), this.initialize(b.raid_parts_auto)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 132, 44), (a.raid_parts_auto_on = function() {
        this.sourceRect = new c.Rectangle(8, 8, 132, 44), this.initialize(b.raid_parts_auto)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 132, 44), (a.gr_raid_parts_auto_on = function() {
        this.initialize(), this.instance = new a.raid_parts_auto_on, this.addChild(this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(0, 0, 132, 44), (a.gr_raid_parts_auto_off = function() {
        this.initialize(), this.instance = new a.raid_parts_auto_off, this.addChild(this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(0, 0, 132, 44), (a.gr_raid_parts_auto_gradation = function() {
        this.initialize(), this.shape = (new c.Shape).setTransform(0, 0, 1, 1), this.shape.graphics.lf(["#61B2AC", "#D2FFFC", "#61B2AC"], [.165, .525, .882], -42.7, 0, 42.8, 0).s().p("AmrBVIAAiqINWAAIAACqg"), this.shape.setTransform(43, 9), this.addChild(this.shape)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(0, 0, 86, 17), (a.mc_raid_parts_auto_out = function(b, d, e) {
        this.initialize(b, d, e, {}), this.frame_1 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).wait(1).call(this.frame_1)), this.instance = new a.gr_raid_parts_auto_off, this.instance.setTransform(-24, 0), this.timeline.addTween(c.Tween.get(this.instance).to({_off: !0}, 1).wait(1))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(-24, 0, 132, 44), (a.mc_raid_parts_auto_on_set = function(b, d, e) {
        this.initialize(b, d, e, {});
        var f = (new c.Shape).setTransform(0, 0, 1, 1);
        f._off = !0, f.graphics.p("AhlADIAygpIAAAbIBTAAQAOgBAIgFQALgIACgYIAjAAQgBARgHARQgOAhggAAIhiAAIAAAgg"), f.setTransform(35, 26), this.instance = new a.gr_raid_parts_auto_gradation, this.instance.setTransform(39, 26, 1, 1, 0, 0, 0, 22, 9), this.instance.mask = f, this.timeline.addTween(c.Tween.get(this.instance).to({x: -14}, 9).wait(1));
        var g = (new c.Shape).setTransform(0, 0, 1, 1);
        g._off = !0, g.graphics.p("AhlAyQABgRAHgRQAOghAgAAIBhAAIAAggIA0AvIgzApIAAgbIhSAAQgOABgIAFQgLAIgCAYg"), g.setTransform(35, 18), this.instance_1 = new a.gr_raid_parts_auto_gradation, this.instance_1.setTransform(-17, 18, 1, 1, 0, 0, 0, 22, 9), this.instance_1.mask = g, this.timeline.addTween(c.Tween.get(this.instance_1).to({x: 41}, 9).wait(1)), this.instance_2 = new a.gr_raid_parts_auto_on, this.instance_2.setTransform(66, 22, 1, 1, 0, 0, 0, 66, 22), this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.instance_2}]}).wait(10))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(-39, 0, 171, 44), (a.mc_raid_parts_auto_on = function(b, d, e) {
        this.initialize(b, d, e, {}), this.frame_3 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).wait(3).call(this.frame_3)), this.instance = new a.mc_raid_parts_auto_on_set, this.instance.setTransform(0, 4), this.timeline.addTween(c.Tween.get(this.instance).to({y: 0}, 2).wait(2))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 4, 132, 44), (a.mc_raid_parts_auto_off = function(b, d, e) {
        this.initialize(b, d, e, {}), this.frame_3 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).wait(3).call(this.frame_3)), this.instance = new a.gr_raid_parts_auto_off, this.instance.setTransform(0, 4), this.timeline.addTween(c.Tween.get(this.instance).to({y: 0}, 2).wait(2))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 4, 132, 44), (a.mc_raid_parts_auto_in = function(b, d, e) {
        this.initialize(b, d, e, {}), this.frame_0 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0)), this.instance = new a.gr_raid_parts_auto_off, this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.instance}]}).wait(1))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 0, 132, 44), (a.mc_raid_parts_auto = function(b, d, e) {
        this.initialize(b, d, e, {"in": 0,out: 5,on: 10,off: 16}), this.frame_0 = function() {
            this.raid_parts_auto_in.gotoAndPlay(0)
        }, this.frame_4 = function() {
            this.stop()
        }, this.frame_5 = function() {
            this.raid_parts_auto_out.gotoAndPlay(0)
        }, this.frame_9 = function() {
            this.stop()
        }, this.frame_10 = function() {
            this.raid_parts_auto_on.gotoAndPlay(0)
        }, this.frame_15 = function() {
            this.stop()
        }, this.frame_16 = function() {
            this.raid_parts_auto_off.gotoAndPlay(0)
        }, this.frame_21 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1).call(this.frame_5).wait(4).call(this.frame_9).wait(1).call(this.frame_10).wait(5).call(this.frame_15).wait(1).call(this.frame_16).wait(5).call(this.frame_21)), this.raid_parts_auto_off = new a.mc_raid_parts_auto_off, this.raid_parts_auto_off._off = !0, this.timeline.addTween(c.Tween.get(this.raid_parts_auto_off).wait(16).to({_off: !1}, 0).wait(6)), this.raid_parts_auto_on = new a.mc_raid_parts_auto_on, this.raid_parts_auto_on._off = !0, this.timeline.addTween(c.Tween.get(this.raid_parts_auto_on).wait(10).to({_off: !1}, 0).to({_off: !0}, 6).wait(6)), this.raid_parts_auto_out = new a.mc_raid_parts_auto_out, this.raid_parts_auto_out._off = !0, this.timeline.addTween(c.Tween.get(this.raid_parts_auto_out).wait(5).to({_off: !1}, 0).to({_off: !0}, 5).wait(12)), this.raid_parts_auto_in = new a.mc_raid_parts_auto_in, this.timeline.addTween(c.Tween.get(this.raid_parts_auto_in).to({_off: !0}, 5).wait(17))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 0, 132, 44)
}(lib = lib || {}, images = images || {}, createjs = createjs || {});
var lib, images, createjs;
