!function(a, b, c) {
    var d;
    (a.raid_parts_turn = function(b, d, e) {
        this.initialize(b, d, e, {}), this.frame_0 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0).wait(1)), this.raid_parts_turn = new a.mc_raid_parts_turn, this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.raid_parts_turn}]}).wait(2))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(532, 0, 420, 44), (a.raid_parts_turn_enemy = function() {
        this.sourceRect = new c.Rectangle(4, 100, 420, 44), this.initialize(b.raid_parts_turn)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 420, 44), (a.raid_parts_turn_player = function() {
        this.sourceRect = new c.Rectangle(4, 4, 420, 44), this.initialize(b.raid_parts_turn)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 420, 44), (a.raid_parts_turn_player_white = function() {
        this.sourceRect = new c.Rectangle(4, 52, 420, 44), this.initialize(b.raid_parts_turn)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 420, 44), (a.gr_raid_parts_turn_player_white = function() {
        this.initialize(), this.instance = new a.raid_parts_turn_player_white, this.addChild(this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(0, 0, 420, 44), (a.gr_raid_parts_turn_player = function() {
        this.initialize(), this.instance = new a.raid_parts_turn_player, this.addChild(this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(0, 0, 420, 44), (a.gr_raid_parts_turn_enemy = function() {
        this.initialize(), this.instance = new a.raid_parts_turn_enemy, this.addChild(this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(0, 0, 420, 44), (a.mc_raid_parts_turn_in = function(b, d, e) {
        this.initialize(b, d, e, {}), this.frame_16 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).wait(16).call(this.frame_16)), this.instance = new a.gr_raid_parts_turn_player_white, this.instance.setTransform(210, 22, 1, 1, 0, 0, 0, 210, 22), this.instance.alpha = .5, this.instance._off = !0, this.timeline.addTween(c.Tween.get(this.instance).wait(5).to({_off: !1}, 0).to({alpha: 0}, 6).to({_off: !0}, 1).wait(5)), this.instance_1 = new a.gr_raid_parts_turn_player, this.instance_1.setTransform(532, 0), this.instance_1.alpha = .199, this.timeline.addTween(c.Tween.get(this.instance_1).to({x: 16,alpha: 1}, 2).to({x: 0}, 3).wait(8).to({alpha: 0}, 3).wait(1))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(532, 0, 420, 44), (a.mc_raid_parts_turn_change = function(b, d, e) {
        this.initialize(b, d, e, {}), this.frame_17 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).wait(17).call(this.frame_17)), this.instance = new a.gr_raid_parts_turn_enemy, this.instance.setTransform(-532, -20, 1, 1, 0, 0, 0, 0, -20), this.instance.alpha = .199, this.timeline.addTween(c.Tween.get(this.instance).to({x: -16,alpha: 1}, 2).to({x: 0}, 3, c.Ease.get(1)).wait(8).to({alpha: 0}, 3).to({_off: !0}, 1).wait(1))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(-532, 0, 420, 44), (a.mc_raid_parts_turn = function(b, d, e) {
        this.initialize(b, d, e, {"in": 0,change: 5}), this.frame_0 = function() {
            this.raid_parts_turn_in.gotoAndPlay(0)
        }, this.frame_4 = function() {
            this.stop()
        }, this.frame_5 = function() {
            this.raid_parts_turn_change.gotoAndPlay(0)
        }, this.frame_11 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0).wait(4).call(this.frame_4).wait(1).call(this.frame_5).wait(6).call(this.frame_11)), this.raid_parts_turn_change = new a.mc_raid_parts_turn_change, this.raid_parts_turn_change._off = !0, this.timeline.addTween(c.Tween.get(this.raid_parts_turn_change).wait(5).to({_off: !1}, 0).wait(7)), this.raid_parts_turn_in = new a.mc_raid_parts_turn_in, this.timeline.addTween(c.Tween.get(this.raid_parts_turn_in).to({_off: !0}, 5).wait(7))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(532, 0, 420, 44)
}(lib = lib || {}, images = images || {}, createjs = createjs || {});
var lib, images, createjs;
