!function(a, b, c) {
    var d;
    (a.raid_parts_back = function(b, d, e) {
        this.initialize(b, d, e, {}), this.frame_0 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0).wait(1)), this.raid_parts_back = new a.mc_raid_parts_back, this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.raid_parts_back}]}).wait(2))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 0, 142, 86), (a.raid_parts_back_all = function() {
        this.sourceRect = new c.Rectangle(1, 1, 142, 86), this.initialize(b.raid_parts_back)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 142, 86), (a.gr_raid_parts_back = function() {
        this.initialize(), this.instance = new a.raid_parts_back_all, this.addChild(this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(0, 0, 142, 86), (a.mc_raid_parts_back_out = function(b, d, e) {
        this.initialize(b, d, e, {}), this.frame_3 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).wait(3).call(this.frame_3)), this.instance = new a.gr_raid_parts_back("synched", 0), this.instance.setTransform(0, -45, 1, 1, 0, 0, 0, 0, -48), this.timeline.addTween(c.Tween.get(this.instance).to({y: -48}, 2).to({_off: !0}, 1).wait(1))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 3, 142, 86), (a.mc_raid_parts_back_in = function(b, d, e) {
        this.initialize(b, d, e, {}), this.frame_0 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0)), this.instance = new a.gr_raid_parts_back("synched", 0), this.instance.setTransform(0, -48, 1, 1, 0, 0, 0, 0, -48), this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.instance}]}).wait(1))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 0, 142, 86), (a.mc_raid_parts_back = function(b, d, e) {
        this.initialize(b, d, e, {"in": 0,out: 5}), this.frame_0 = function() {
            this.raid_parts_back_in.gotoAndPlay(0)
        }, this.frame_4 = function() {
            this.stop(), this.raid_parts_back_in.removeEventListener("mousedown", this.raid_parts_back_in._onPress), this.raid_parts_back_in._onPress = _.bind(function(a) {
                if (createjs.Touch.isSupported()) {
                    ("mousedown" === window.__onPressEventType && !1 in window || "touchstart" === window.__onPressEventType && !1 in window) && (window.__onPressEventType = null);
                    var b = a.nativeEvent.type;
                    if (window.__onPressEventType) {
                        if (window.__onPressEventType !== b)
                            return "mousedown" === b && (window.__onPressEventType = "mousedown"), !1
                    } else {
                        if ("mousedown" !== b && "touchstart" !== b)
                            return !1;
                        window.__onPressEventType = b
                    }
                }
                this.parent.gotoAndPlay("out")
            }, this.raid_parts_back_in), this.raid_parts_back_in.addEventListener("mousedown", this.raid_parts_back_in._onPress)
        }, this.frame_5 = function() {
            this.raid_parts_back_out.gotoAndPlay(0)
        }, this.frame_9 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1).call(this.frame_5).wait(4).call(this.frame_9)), this.raid_parts_back_out = new a.mc_raid_parts_back_out, this.raid_parts_back_out._off = !0, this.timeline.addTween(c.Tween.get(this.raid_parts_back_out).wait(5).to({_off: !1}, 0).wait(5)), this.raid_parts_back_in = new a.mc_raid_parts_back_in, this.timeline.addTween(c.Tween.get(this.raid_parts_back_in).to({_off: !0}, 5).wait(5))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 0, 142, 86)
}(lib = lib || {}, images = images || {}, createjs = createjs || {});
var lib, images, createjs;
