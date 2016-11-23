!function (a, b, c) {
    var d;
    (a.enemy_6200032 = function () {
        this.initialize(), this.enemy_6200032 = new a.mc_enemy_6200032, this.addChild(this.enemy_6200032)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(0, 0, 0, 0), (a.enemy_6200032_attack = function () {

        this.sourceRect = new c.Rectangle(0, 0, 320, 400), this.initialize(b.enemy_6200032)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 320, 400), (a.enemy_6200032_body = function () {
        this.sourceRect = new c.Rectangle(0, 400, 320, 400), this.initialize(b.enemy_6200032)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 320, 400), (a.enemy_6200032_damage = function () {
        this.sourceRect = new c.Rectangle(320, 0, 320, 400), this.initialize(b.enemy_6200032)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 320, 400), (a.enemy_6200032_dead = function () {
        this.sourceRect = new c.Rectangle(640, 0, 320, 400), this.initialize(b.enemy_6200032)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 320, 400), (a.enemy_6200032_Larm = function () {
        this.sourceRect = new c.Rectangle(320, 400, 320, 400), this.initialize(b.enemy_6200032)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 320, 400), (a.enemy_6200032_Rarm = function () {
        this.sourceRect = new c.Rectangle(640, 400, 320, 400), this.initialize(b.enemy_6200032)
    }).prototype = d = new c.Bitmap, d.nominalBounds = new c.Rectangle(0, 0, 320, 400), (a.mc_enemy_6200032_shadow = function () {
        this.initialize(), this.shape = (new c.Shape).setTransform(0, 0, 1, 1), this.shape.graphics.rf(["rgba(0,0,0,0.502)", "rgba(0,0,0,0.2)", "rgba(0,0,0,0)"], [.525, .843, 1], 0, 0, 0, 0, 0, 64.2).s().p("Am7G8Qi4i4AAkEQAAkEC4i4QC4i3EDAAQEEAAC4C3QC4C4AAEEQAAEEi4C4Qi4C4kEAAQkDAAi4i4g"), this.shape.setTransform(0, -2), this.addChild(this.shape)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(-63, -65, 126, 126), (a.enemy_6200032_Rarm_1 = function () {
        this.initialize(), this.instance = new a.enemy_6200032_Rarm, this.instance.setTransform(-160, -400), this.addChild(this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(-160, -400, 320, 400), (a.enemy_6200032_Larm_1 = function () {
        this.initialize(), this.instance = new a.enemy_6200032_Larm, this.instance.setTransform(-160, -400), this.addChild(this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(-160, -400, 320, 400), (a.enemy_6200032_dead_1 = function () {
        this.initialize(), this.instance = new a.enemy_6200032_dead, this.instance.setTransform(-160, -400), this.addChild(this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(-160, -400, 320, 400), (a.enemy_6200032_damage_1 = function () {
        this.initialize(), this.instance = new a.enemy_6200032_damage, this.instance.setTransform(-160, -400), this.addChild(this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(-160, -400, 320, 400), (a.enemy_6200032_body_1 = function () {
        this.initialize(), this.instance = new a.enemy_6200032_body, this.instance.setTransform(-160, -400), this.addChild(this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(-160, -400, 320, 400), (a.enemy_6200032_attack_1 = function () {
        this.initialize(), this.instance = new a.enemy_6200032_attack, this.instance.setTransform(-160, -400), this.addChild(this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(-160, -400, 320, 400), (a.mc_enemy_6200032_wait = function (b, d, e) {
        this.initialize(b, d, e, {wait_loop: 0}), this.instance = new a.enemy_6200032_Rarm_1, this.timeline.addTween(c.Tween.get(this.instance).to({
            scaleY: 1,
            skewX: 3.2,
            skewY: .3,
            x: -16,
            y: 4
        }, 6).to({
            scaleY: 1,
            skewX: 0,
            skewY: 0,
            x: 0,
            y: 0
        }, 6).wait(1)), this.instance_1 = new a.enemy_6200032_body_1("synched", 0), this.timeline.addTween(c.Tween.get(this.instance_1).to({
            scaleY: .98,
            y: -2
        }, 6).to({
            scaleY: 1,
            y: 0
        }, 6).wait(1)), this.instance_2 = new a.enemy_6200032_Larm_1, this.timeline.addTween(c.Tween.get(this.instance_2).to({
            skewX: 1.3,
            skewY: .2,
            x: -7,
            y: 3
        }, 6).to({
            skewX: 0,
            skewY: 0,
            x: 0,
            y: 0
        }, 6).wait(1)), this.instance_3 = new a.mc_enemy_6200032_shadow, this.instance_3.setTransform(-20, -80, 2.041, .51), this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.instance_3}]}).wait(13))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(-160, -400, 320, 400), (a.mc_enemy_6200032_mortal_A = function (b, d, e) {
        this.initialize(b, d, e, {}), this.frame_10 = function () {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).wait(10).call(this.frame_10)), this.instance = new a.enemy_6200032_Rarm_1, this.instance.setTransform(-80, -263, 1, 1, 0, 0, 0, -80, -263), this.timeline.addTween(c.Tween.get(this.instance).wait(1).to({
            x: -76,
            y: -262
        }, 4, c.Ease.get(-.99)).to({
            scaleY: 1.01,
            skewX: 6.5,
            skewY: -2.3,
            x: -99,
            y: -260
        }, 2, c.Ease.get(1)).to({
            scaleY: 1,
            rotation: -1,
            skewX: 0,
            skewY: 0,
            x: -84,
            y: -261
        }, 2).wait(1).to({
            rotation: 0,
            x: -80,
            y: -263
        }, 0).wait(1)), this.instance_1 = new a.enemy_6200032_body_1("synched", 0), this.instance_1.setTransform(-42, -89, 1, 1, 0, 0, 0, -42, -89), this.timeline.addTween(c.Tween.get(this.instance_1).to({startPosition: 0}, 1, c.Ease.get(-.99)).to({
            regX: -42,
            scaleY: .99,
            skewX: 1.3
        }, 4, c.Ease.get(-.99)).to({regX: -42, scaleY: 1, skewX: -4.7}, 2, c.Ease.get(1)).to({
            scaleY: 1,
            skewX: 0
        }, 3).wait(1)), this.instance_2 = new a.enemy_6200032_Larm_1, this.instance_2.setTransform(-29, -255, 1, 1, 0, 0, 0, -29, -255), this.timeline.addTween(c.Tween.get(this.instance_2).wait(1).to({
            scaleX: .95,
            x: -23,
            y: -254
        }, 4, c.Ease.get(-.99)).to({
            regX: -29,
            regY: -255,
            scaleX: 1,
            scaleY: 1,
            skewX: -7.1,
            skewY: -2.8,
            x: -52,
            y: -255
        }, 2, c.Ease.get(1)).to({
            regX: -29,
            scaleY: 1,
            rotation: -.5,
            skewX: 0,
            skewY: 0,
            x: -33,
            y: -254
        }, 2).wait(1).to({
            regY: -255,
            rotation: 0,
            x: -29,
            y: -255
        }, 0).wait(1)), this.instance_3 = new a.mc_enemy_6200032_shadow, this.instance_3.setTransform(-20, -80, 2.041, .51), this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.instance_3}]}).wait(11))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(-160, -400, 320, 400), (a.mc_enemy_6200032_attack = function (b, d, e) {
        this.initialize(b, d, e, {}), this.frame_10 = function () {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).wait(10).call(this.frame_10)), this.instance = new a.enemy_6200032_Rarm_1, this.instance.setTransform(-80, -263, 1, 1, 0, 0, 0, -80, -263), this.timeline.addTween(c.Tween.get(this.instance).wait(1).to({
            x: -76,
            y: -262
        }, 4, c.Ease.get(-.99)).to({
            scaleY: 1.01,
            skewX: 6.5,
            skewY: -2.3,
            x: -99,
            y: -260
        }, 2, c.Ease.get(1)).to({
            scaleY: 1,
            rotation: -1,
            skewX: 0,
            skewY: 0,
            x: -84,
            y: -261
        }, 2).wait(1).to({
            rotation: 0,
            x: -80,
            y: -263
        }, 0).wait(1)), this.instance_1 = new a.enemy_6200032_body_1("synched", 0), this.instance_1.setTransform(-42, -89, 1, 1, 0, 0, 0, -42, -89), this.timeline.addTween(c.Tween.get(this.instance_1).to({startPosition: 0}, 1, c.Ease.get(-.99)).to({
            regX: -42,
            scaleY: .99,
            skewX: 1.3
        }, 4, c.Ease.get(-.99)).to({regX: -42, scaleY: 1, skewX: -4.7}, 2, c.Ease.get(1)).to({
            scaleY: 1,
            skewX: 0
        }, 3).wait(1)), this.instance_2 = new a.enemy_6200032_Larm_1, this.instance_2.setTransform(-29, -255, 1, 1, 0, 0, 0, -29, -255), this.timeline.addTween(c.Tween.get(this.instance_2).wait(1).to({
            scaleX: .95,
            x: -23,
            y: -254
        }, 4, c.Ease.get(-.99)).to({
            regX: -29,
            regY: -255,
            scaleX: 1,
            scaleY: 1,
            skewX: -7.1,
            skewY: -2.8,
            x: -52,
            y: -255
        }, 2, c.Ease.get(1)).to({
            regX: -29,
            scaleY: 1,
            rotation: -.5,
            skewX: 0,
            skewY: 0,
            x: -33,
            y: -254
        }, 2).wait(1).to({
            regY: -255,
            rotation: 0,
            x: -29,
            y: -255
        }, 0).wait(1)), this.instance_3 = new a.mc_enemy_6200032_shadow, this.instance_3.setTransform(-20, -80, 2.041, .51), this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.instance_3}]}).wait(11))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(-160, -400, 320, 400), (a.enemy_6200032_all = function () {
        this.initialize(), this.instance = new a.enemy_6200032_Rarm_1, this.instance_1 = new a.enemy_6200032_body_1("synched", 0), this.instance_2 = new a.enemy_6200032_Larm_1, this.addChild(this.instance_2, this.instance_1, this.instance)
    }).prototype = d = new c.Container, d.nominalBounds = new c.Rectangle(-160, -400, 320, 400), (a.mc_enemy_6200032_wait_3 = function (b, d, e) {
        this.initialize(b, d, e, {}), this.frame_0 = function () {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0)), this.instance = new a.enemy_6200032_all("single", 0), this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.instance}]}).wait(1)), this.instance_1 = new a.mc_enemy_6200032_shadow, this.instance_1.setTransform(-20, -80, 2.041, .51), this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.instance_1}]}).wait(1))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(-160, -400, 320, 400), (a.mc_enemy_6200032_wait_2 = function (b, d, e) {
        this.initialize(b, d, e, {}), this.frame_0 = function () {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0)), this.instance = new a.enemy_6200032_all("single", 0), this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.instance}]}).wait(1)), this.instance_1 = new a.mc_enemy_6200032_shadow, this.instance_1.setTransform(-20, -80, 2.041, .51), this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.instance_1}]}).wait(1))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(-160, -400, 320, 400), (a.mc_enemy_6200032_setin_3 = function (b, d, e) {
        this.initialize(b, d, e, {}), this.frame_0 = function () {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0)), this.instance = new a.enemy_6200032_all("single", 0), this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.instance}]}).wait(1)), this.instance_1 = new a.mc_enemy_6200032_shadow, this.instance_1.setTransform(-20, -80, 2.041, .51), this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.instance_1}]}).wait(1))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(-160, -400, 320, 400), (a.mc_enemy_6200032_setin_2 = function (b, d, e) {
        this.initialize(b, d, e, {}), this.frame_0 = function () {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).call(this.frame_0)), this.instance = new a.enemy_6200032_all("synched", 0), this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.instance}]}).wait(1)), this.instance_1 = new a.mc_enemy_6200032_shadow, this.instance_1.setTransform(-20, -80, 2.041, .51), this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.instance_1}]}).wait(1))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(-160, -400, 320, 400), (a.mc_enemy_6200032_setin = function (b, d, e) {
        console.info('npc setin');

        this.initialize(b, d, e, {}), this.frame_6 = function () {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).wait(6).call(this.frame_6)), this.instance = new a.enemy_6200032_all("single", 0), this.instance.setTransform(-224, 0), this.instance.alpha = 0, this.timeline.addTween(c.Tween.get(this.instance).to({
            x: 0,
            alpha: 1
        }, 3, c.Ease.get(1)).wait(1).to({skewX: 1}, 0).wait(1).to({skewX: 0}, 0).wait(2)), this.instance_1 = new a.mc_enemy_6200032_shadow, this.instance_1.setTransform(-245, -80, 2.041, .51), this.instance_1.alpha = 0, this.timeline.addTween(c.Tween.get(this.instance_1).to({
            x: -20,
            alpha: 1
        }, 3, c.Ease.get(1)).wait(4))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(-384, -400, 320, 400), (a.mc_enemy_6200032_mortal_C = function (b, d, e) {
        this.initialize(b, d, e, {}), this.frame_9 = function () {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).wait(9).call(this.frame_9)), this.instance = new a.enemy_6200032_attack_1("synched", 0), this.instance._off = !0, this.timeline.addTween(c.Tween.get(this.instance).wait(1).to({
            startPosition: 0,
            _off: !1
        }, 0).to({alpha: 0}, 4).to({_off: !0}, 1).wait(4)), this.instance_1 = new a.enemy_6200032_all("single", 0), this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.instance_1}]}).wait(10)), this.instance_2 = new a.mc_enemy_6200032_shadow, this.instance_2.setTransform(-20, -80, 2.041, .51), this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.instance_2}]}).wait(10))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(-160, -400, 320, 400), (a.mc_enemy_6200032_mortal_B = function (b, d, e) {
        this.initialize(b, d, e, {}), this.frame_9 = function () {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).wait(9).call(this.frame_9)), this.instance = new a.enemy_6200032_attack_1("synched", 0), this.instance._off = !0, this.timeline.addTween(c.Tween.get(this.instance).wait(1).to({
            startPosition: 0,
            _off: !1
        }, 0).to({alpha: 0}, 4).to({_off: !0}, 1).wait(4)), this.instance_1 = new a.enemy_6200032_all("single", 0), this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.instance_1}]}).wait(10)), this.instance_2 = new a.mc_enemy_6200032_shadow, this.instance_2.setTransform(-20, -80, 2.041, .51), this.timeline.addTween(c.Tween.get({}).to({state: [{t: this.instance_2}]}).wait(10))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(-160, -400, 320, 400), (a.mc_enemy_6200032_dead = function (b, d, e) {
        this.initialize(b, d, e, {}), this.frame_1 = function () {
            require(["lib/sound"], function (a) {
                a.play("se/dead_se_1.mp3")
            })
        }, this.frame_6 = function () {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).wait(1).call(this.frame_1).wait(5).call(this.frame_6)), this.instance = new a.enemy_6200032_all("single", 0), this.instance.alpha = .5, this.timeline.addTween(c.Tween.get(this.instance).to({_off: !0}, 1).wait(6)), this.instance_1 = new a.enemy_6200032_dead_1("synched", 0), this.timeline.addTween(c.Tween.get(this.instance_1).wait(1).to({startPosition: 0}, 0).to({alpha: 0}, 4).to({_off: !0}, 1).wait(1)), this.instance_2 = new a.mc_enemy_6200032_shadow, this.instance_2.setTransform(-20, -80, 2.041, .51), this.timeline.addTween(c.Tween.get(this.instance_2).wait(1).to({alpha: 0}, 4).to({_off: !0}, 1).wait(1))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(-160, -400, 320, 400), (a.mc_enemy_6200032_damage = function (b, d, e) {
        this.initialize(b, d, e, {}), this.frame_9 = function () {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).wait(9).call(this.frame_9)), this.instance = new a.enemy_6200032_damage_1("synched", 0), this.instance.setTransform(-5, -2, 1, 1, 0, -4.9, 0), this.instance.alpha = .398, this.instance._off = !0, this.timeline.addTween(c.Tween.get(this.instance).wait(1).to({
            startPosition: 0,
            _off: !1
        }, 0).wait(1).to({
            skewX: 0,
            skewY: 1.5,
            x: 5,
            y: 2,
            alpha: .199
        }, 0).to({_off: !0}, 1).wait(7)), this.instance_1 = new a.enemy_6200032_all("single", 0), this.timeline.addTween(c.Tween.get(this.instance_1).wait(1).to({
            skewX: -4.8,
            x: -5,
            y: -2
        }, 0).wait(1).to({skewX: 0, skewY: 1.5, x: 5, y: 2}, 0).wait(1).to({
            skewX: .5,
            x: 0,
            y: 0
        }, 0).wait(1).to({
            skewX: 0,
            skewY: 0
        }, 0).wait(6)), this.instance_2 = new a.mc_enemy_6200032_shadow, this.instance_2.setTransform(-20, -80, 2.041, .51), this.timeline.addTween(c.Tween.get(this.instance_2).wait(1).to({x: -31}, 0).wait(1).to({
            x: -15,
            y: -78
        }, 0).wait(1).to({x: -19, y: -80}, 0).wait(1).to({x: -20}, 0).wait(6))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(-160, -400, 320, 400), (a.mc_enemy_6200032 = function (b, d, e) {
        null == e && (e = !1), this.initialize(b, d, e, {
            setin: 6,
            wait: 14,
            setin_2: 24,
            wait_2: 32,
            setin_3: 40,
            wait_3: 49,
            damage: 59,
            dead: 69,
            attack: 79,
            mortal_A: 90,
            mortal_B: 100,
            mortal_C: 110
        }), this.frame_4 = function () {
            this.stop()
        }, this.frame_5 = function () {
            this.stop(), this.enemy_6200032_setin.stop()
        }, this.frame_6 = function () {
            this.enemy_6200032_setin.gotoAndPlay(0)
        }, this.frame_13 = function () {
            this.stop()
        }, this.frame_14 = function () {
            this.enemy_6200032_wait.gotoAndPlay(0)
        }, this.frame_23 = function () {
            this.stop()
        }, this.frame_24 = function () {
            this.enemy_6200032_setin_2.gotoAndPlay(0)
        }, this.frame_31 = function () {
            this.stop()
        }, this.frame_32 = function () {
            this.enemy_6200032_wait_2.gotoAndPlay(0)
        }, this.frame_39 = function () {
            this.stop()
        }, this.frame_40 = function () {
            this.enemy_6200032_setin_3.gotoAndPlay(0)
        }, this.frame_48 = function () {
            this.stop()
        }, this.frame_49 = function () {
            this.enemy_6200032_wait_3.gotoAndPlay(0)
        }, this.frame_58 = function () {
            this.stop()
        }, this.frame_59 = function () {
            this.enemy_6200032_damage.gotoAndPlay(0)
        }, this.frame_68 = function () {
            this.stop()
        }, this.frame_69 = function () {
            this.enemy_6200032_dead.gotoAndPlay(0)
        }, this.frame_78 = function () {
            this.stop()
        }, this.frame_79 = function () {
            this.enemy_6200032_attack.gotoAndPlay(0)
        }, this.frame_89 = function () {
            this.stop()
        }, this.frame_90 = function () {
            this.enemy_6200032_mortal_A.gotoAndPlay(0)
        }, this.frame_99 = function () {
            this.stop()
        }, this.frame_100 = function () {
            this.enemy_6200032_mortal_B.gotoAndPlay(0)
        }, this.frame_109 = function () {
            this.stop()
        }, this.frame_110 = function () {
            this.enemy_6200032_mortal_C.gotoAndPlay(0)
        }, this.frame_119 = function () {
            this.stop()
        }, this.timeline.addTween(c.Tween.get(this).wait(4).call(this.frame_4).wait(1).call(this.frame_5).wait(1).call(this.frame_6).wait(7).call(this.frame_13).wait(1).call(this.frame_14).wait(9).call(this.frame_23).wait(1).call(this.frame_24).wait(7).call(this.frame_31).wait(1).call(this.frame_32).wait(7).call(this.frame_39).wait(1).call(this.frame_40).wait(8).call(this.frame_48).wait(1).call(this.frame_49).wait(9).call(this.frame_58).wait(1).call(this.frame_59).wait(9).call(this.frame_68).wait(1).call(this.frame_69).wait(9).call(this.frame_78).wait(1).call(this.frame_79).wait(10).call(this.frame_89).wait(1).call(this.frame_90).wait(9).call(this.frame_99).wait(1).call(this.frame_100).wait(9).call(this.frame_109).wait(1).call(this.frame_110).wait(9).call(this.frame_119)), this.enemy_6200032_mortal_C = new a.mc_enemy_6200032_mortal_C, this.enemy_6200032_mortal_C.setTransform(28, 31, .936, .936), this.enemy_6200032_mortal_C._off = !0, this.timeline.addTween(c.Tween.get(this.enemy_6200032_mortal_C).wait(110).to({_off: !1}, 0).wait(10)), this.enemy_6200032_mortal_B = new a.mc_enemy_6200032_mortal_B, this.enemy_6200032_mortal_B.setTransform(28, 31, .936, .936), this.enemy_6200032_mortal_B._off = !0, this.timeline.addTween(c.Tween.get(this.enemy_6200032_mortal_B).wait(100).to({_off: !1}, 0).to({_off: !0}, 10).wait(10)), this.enemy_6200032_mortal_A = new a.mc_enemy_6200032_mortal_A, this.enemy_6200032_mortal_A.setTransform(28, 31, .936, .936), this.enemy_6200032_mortal_A._off = !0, this.timeline.addTween(c.Tween.get(this.enemy_6200032_mortal_A).wait(90).to({_off: !1}, 0).to({_off: !0}, 10).wait(20)), this.enemy_6200032_attack = new a.mc_enemy_6200032_attack, this.enemy_6200032_attack.setTransform(28, 31, .936, .936), this.enemy_6200032_attack._off = !0, this.timeline.addTween(c.Tween.get(this.enemy_6200032_attack).wait(79).to({_off: !1}, 0).to({_off: !0}, 11).wait(30)), this.enemy_6200032_dead = new a.mc_enemy_6200032_dead, this.enemy_6200032_dead.setTransform(28, 31, .936, .936), this.enemy_6200032_dead._off = !0, this.timeline.addTween(c.Tween.get(this.enemy_6200032_dead).wait(69).to({_off: !1}, 0).to({_off: !0}, 10).wait(41)), this.enemy_6200032_damage = new a.mc_enemy_6200032_damage, this.enemy_6200032_damage.setTransform(28, 31, .936, .936), this.enemy_6200032_damage._off = !0, this.timeline.addTween(c.Tween.get(this.enemy_6200032_damage).wait(59).to({_off: !1}, 0).to({_off: !0}, 10).wait(51)), this.enemy_6200032_wait_3 = new a.mc_enemy_6200032_wait_3, this.enemy_6200032_wait_3.setTransform(28, 31, .936, .936), this.enemy_6200032_wait_3._off = !0, this.timeline.addTween(c.Tween.get(this.enemy_6200032_wait_3).wait(49).to({_off: !1}, 0).to({_off: !0}, 10).wait(61)), this.enemy_6200032_setin_3 = new a.mc_enemy_6200032_setin_3, this.enemy_6200032_setin_3.setTransform(28, 31, .936, .936), this.enemy_6200032_setin_3._off = !0, this.timeline.addTween(c.Tween.get(this.enemy_6200032_setin_3).wait(40).to({_off: !1}, 0).to({_off: !0}, 9).wait(71)), this.enemy_6200032_wait_2 = new a.mc_enemy_6200032_wait_2, this.enemy_6200032_wait_2.setTransform(28, 31, .936, .936), this.enemy_6200032_wait_2._off = !0, this.timeline.addTween(c.Tween.get(this.enemy_6200032_wait_2).wait(32).to({_off: !1}, 0).to({_off: !0}, 8).wait(80)), this.enemy_6200032_setin_2 = new a.mc_enemy_6200032_setin_2, this.enemy_6200032_setin_2.setTransform(28, 31, .936, .936), this.enemy_6200032_setin_2._off = !0, this.timeline.addTween(c.Tween.get(this.enemy_6200032_setin_2).wait(24).to({_off: !1}, 0).to({_off: !0}, 8).wait(88)), this.enemy_6200032_wait = new a.mc_enemy_6200032_wait, this.enemy_6200032_wait.setTransform(28, 31, .936, .936), this.enemy_6200032_wait._off = !0, this.timeline.addTween(c.Tween.get(this.enemy_6200032_wait).wait(14).to({_off: !1}, 0).to({_off: !0}, 10).wait(96)), this.enemy_6200032_setin = new a.mc_enemy_6200032_setin, this.enemy_6200032_setin.setTransform(28, 31, .936, .936), this.enemy_6200032_setin._off = !0, this.timeline.addTween(c.Tween.get(this.enemy_6200032_setin).wait(5).to({_off: !1}, 0).to({_off: !0}, 9).wait(106))
    }).prototype = d = new c.MovieClip, d.nominalBounds = new c.Rectangle(0, 0, 0, 0)
}(lib = lib || {}, images = images || {}, createjs = createjs || {});
var lib, images, createjs;