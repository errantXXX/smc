!function(a, b, c) {
    var d;
    (a.raid_cutine = function(b, d, e) {
        this.initialize(b, d, e, {}), this.frame_0 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0).wait(1)), this.raid_cutine = new a.mc_raid_cutine, this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.raid_cutine}]}).wait(2))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(-28, -28, 700, 940), (a.cutine = function() {
        this.initialize(b.cutine)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 1e3, 270), (a.mc_raid_cutine_gra_cutine_img = function() {
        this.initialize(), this.instance = new a.cutine, this.addChild(this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(0, 0, 1e3, 270), (a.mc_raid_cutine_gra_black = function() {
        this.initialize(), this.shape = (new c.Shape).setTransform(0, 0, 1, 1), this.shape.graphics.f("rgba(0,0,0,0.698)").s().p("Eg2rBJbMAAAiS1MBtWAAAMAAACS1g"), this.shape.setTransform(318, 442), this.addChild(this.shape)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(-32, -28, 700, 940), (a.mc_raid_cutine_UI = function(b, d, e) {
        this.initialize(b, d, e, {cutine: 0}), this.frame_1 = function() {
            require(["lib/sound"], function(a) {
                a.play("se/cutin_se_1.mp3")
            })
        }, this.frame_19 = function() {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).wait(1).call(this.frame_1).wait(18).call(this.frame_19));
        var f = (new c.Shape).setTransform(0, 0, 1, 1);
        f._off = !0;
        var g = (new c.Graphics).p("Eg1PAeyIAAjJMBqfAAAIAADJg"), h = (new c.Graphics).p("Eg1PAljIAA+NMBqfAAAIAAeNg"), i = (new c.Graphics).p("Eg1PApnMAAAguaMBqfAAAMAAAAuag"), j = (new c.Graphics).p("Eg1PAq9MAAAgz1MBqfAAAMAAAAz1g");
        this.timeline.addTween(c.Tween.get(f).to({graphics: g,x: 329,y: 197}).wait(1).to({graphics: h,x: 329,y: 240}).wait(1).to({graphics: i,x: 329,y: 266}).wait(1).to({graphics: j,x: 329,y: 275}).wait(14).to({graphics: null,x: 0,y: 0}).wait(3)), this.instance = new a.mc_raid_cutine_gra_cutine_img, this.instance.setTransform(-180, 358, 1, 1, 0, 0, 0, 500, 135), this.instance.alpha = .738, this.instance.mask = f, this.timeline.addTween(c.Tween.get(this.instance).to({scaleX: 1.01,scaleY: 1.01,x: 297,y: 356,alpha: 1}, 3, c.Ease.get(1)).to({scaleX: .97,scaleY: .97,x: 305,y: 358}, 1).to({scaleX: 1,scaleY: 1,x: 309}, 1).to({x: 350}, 9).to({x: 500,alpha: .391}, 2, c.Ease.get(-.99)).to({_off: !0}, 1).wait(3)), this.instance_1 = new a.mc_raid_cutine_gra_black, this.instance_1.setTransform(320, 480, 1, 1, 0, 0, 180, 320, 480), this.instance_1.alpha = 0, this.timeline.addTween(c.Tween.get(this.instance_1).to({alpha: 1}, 3, c.Ease.get(1)).wait(11).to({alpha: 0}, 5, c.Ease.get(-.99)).wait(1))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(-680, -28, 1352, 940), (a.mc_raid_cutine = function(b, d, e) {
        this.initialize(b, d, e, {}), this.ui_parts = new a.mc_raid_cutine_UI, this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.ui_parts}]}).wait(8))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(-28, -28, 700, 940)
}(lib = lib || {}, images = images || {}, createjs = createjs || {});
var lib, images, createjs;
