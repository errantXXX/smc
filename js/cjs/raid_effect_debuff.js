!function(a, b, c) {
    var d;
    (a.raid_effect_debuff = function(b, d, e) {
        this.initialize(b, d, e, {}), this.raid_effect_debuff = new a.mc_raid_effect_debuff_root, this.raid_effect_debuff.setTransform(427, 405, 1, 1, 0, 0, 0, 427, 405), this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.raid_effect_debuff}]}).wait(2))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(-221, -276, 861, 939), (a.raid_effect_debuff01 = function() {
        this.sourceRect = new c.Rectangle(218, 2, 146, 472), this.initialize(b.raid_effect_debuff)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 146, 472), (a.raid_effect_debuff02 = function() {
        this.sourceRect = new c.Rectangle(2, 2, 214, 448), this.initialize(b.raid_effect_debuff)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 214, 448), (a.raid_effect_debuff_color = function() {
        this.initialize(), this.shape = (new c.Shape).setTransform(0, 0, 1, 1), this.shape.graphics.f("#980000").s().p("EhCuA72MAAAh3sMCFcAAAMAAAB3sg"), this.shape.setTransform(427, 383), this.addChild(this.shape)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(0, 0, 854, 766), (a.mc_raid_effect_debuff02 = function() {
        this.initialize(), this.instance = new a.raid_effect_debuff02, this.addChild(this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(0, 0, 214, 448), (a.mc_raid_effect_debuff01 = function() {
        this.initialize(), this.instance = new a.raid_effect_debuff01, this.addChild(this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(0, 0, 146, 472), (a.mc_raid_effect_debuff = function(b, d, e) {
        this.initialize(b, d, e, {}), this.frame_1 = function() {
            require(["lib/sound"], function(a) {
                a.play("se/ab_1110_se_1.mp3")
            })
        }, this.frame_14 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).wait(1).call(this.frame_1).wait(13).call(this.frame_14)), this.instance = new a.raid_effect_debuff_color, this.instance.setTransform(320, 327, .749, .854, 0, 0, 0, 427, 383), this.instance.alpha = 0, this.instance.compositeOperation = "lighter", this.timeline.addTween(c.Tween.get(this.instance).to({alpha: .301}, 2).wait(8).to({alpha: 0}, 4).wait(1)), this.instance_1 = new a.mc_raid_effect_debuff02, this.instance_1.setTransform(76, 134, 2.776, 1.828, 0, 0, 180, 107, 224), this.instance_1.alpha = 0, this.timeline.addTween(c.Tween.get(this.instance_1).to({y: 153,alpha: 1}, 2).to({x: 76,y: 201}, 8).to({x: 76,y: 230,alpha: 0}, 4).wait(1)), this.instance_2 = new a.mc_raid_effect_debuff02, this.instance_2.setTransform(216, 254, 2.776, 1.828, 0, 0, 0, 107, 224), this.instance_2.alpha = 0, this.timeline.addTween(c.Tween.get(this.instance_2).to({x: 216,y: 273,alpha: 1}, 2).to({x: 216,y: 321}, 8).to({y: 350,alpha: 0}, 4).wait(1)), this.instance_3 = new a.mc_raid_effect_debuff01, this.instance_3.setTransform(266, 93, 1.931, 1, 0, 0, -33.2, 73, 236), this.instance_3.alpha = 0, this.instance_3.compositeOperation = "lighter", this.instance_3._off = !0, this.timeline.addTween(c.Tween.get(this.instance_3).wait(2).to({_off: !1}, 0).to({regY: 236,scaleX: 1.93,scaleY: 1.06,y: 174,alpha: 1}, 2).to({scaleX: 2.24,scaleY: 1.55,skewY: -43.6,y: 363}, 8, c.Ease.get(1)).to({scaleX: 1.79,scaleY: .77,skewY: -25.2,y: 505,alpha: 0}, 2, c.Ease.get(1)).wait(1)), this.instance_4 = new a.mc_raid_effect_debuff01, this.instance_4.setTransform(65, 93, 1.931, 1, 0, 0, -146.6, 73, 236), this.instance_4.alpha = 0, this.instance_4.compositeOperation = "lighter", this.instance_4._off = !0, this.timeline.addTween(c.Tween.get(this.instance_4).wait(2).to({_off: !1}, 0).to({regY: 236,scaleX: 1.93,scaleY: 1.06,y: 174,alpha: 1}, 2).to({scaleX: 2.24,scaleY: 1.55,skewY: -136,y: 363}, 8, c.Ease.get(1)).to({scaleX: 1.79,scaleY: .77,skewY: -154.4,y: 505,alpha: 0}, 2, c.Ease.get(1)).wait(1))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(-221, -276, 861, 939), (a.mc_raid_effect_debuff_root = function(b, d, e) {
        this.initialize(b, d, e, {}), this.frame_0 = function() {
            this.raid_effect_debuff_end.gotoAndPlay(0)
        }, this.frame_6 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0).wait(6).call(this.frame_6)), this.raid_effect_debuff_end = new a.mc_raid_effect_debuff, this.raid_effect_debuff_end.setTransform(9, 9, 1, 1, 0, 0, 0, 9, 9), this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.raid_effect_debuff_end}]}).wait(7))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(-221, -276, 861, 939)
}(lib = lib || {}, images = images || {}, createjs = createjs || {});
var lib, images, createjs;
