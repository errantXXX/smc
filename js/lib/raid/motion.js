define(["lib/raid/timeline", "model/sound"], function(a, b) {
    var c = {pDownTarget: "stbwait",pDownLabel: "down",pDownThreshold: .25,oCjsLabelMap: {job: {wait: "wait",stbwait: "wait",chara_select: "wait",setup: "setup",ability_wait: "setup",chara_in: "setup",attack: "attack",mortal: "attack",mortal_A: "attack",mortal_A_1: "attack",mortal_A_2: "attack",mortal_B: "attack",mortal_B_1: "attack",mortal_B_2: "attack",mortal_C: "attack",mortal_C_1: "attack",mortal_C_2: "attack",mortal_D: "attack",mortal_D_1: "attack",mortal_D_2: "attack",mortal_E: "attack",mortal_E_1: "attack",mortal_E_2: "attack","double": "attack",triple: "attack",dead: "dead",damage: "damage",win: "win",ability: "ability",chara_out: "chara_out",hide: "chara_out",summon: "summon",down: "down",alive: "alive",change_1: "change_1",change_2: "change_2",charge: "charge"},npc: {wait: "wait",stbwait: "wait",chara_select: "wait",setup: "setup",ability_wait: "setup",chara_in: "setup",attack: "attack",mortal: "attack",mortal_A: "attack",mortal_A_1: "attack",mortal_A_2: "attack",mortal_B: "attack",mortal_B_1: "attack",mortal_B_2: "attack",mortal_C: "attack",mortal_C_1: "attack",mortal_C_2: "attack",mortal_D: "attack",mortal_D_1: "attack",mortal_D_2: "attack",mortal_E: "attack",mortal_E_1: "attack",mortal_E_2: "attack","double": "attack",triple: "attack",short_attack: "attack",dead: "dead",damage: "damage",win: "win",ability: "ability",chara_out: "chara_out",hide: "chara_out",down: "down",change: "change",change_1: "change_1",change_2: "change_2",pf: "pf"},enemy: {setin: "setin",wait: "wait",setin_2: "wait",wait_2: "wait",setin_3: "wait",wait_3: "wait",damage: "damage",dead: "dead",attack: "attack",mortal_A: "attack",mortal_B: "attack",mortal_C: "attack",mortal: "attack",escape: "escape",form_change: "form_change",down: "down",setin_4: "setin_4"}},mWaitAll: function(a, b) {
        b.playtime = b.playtime ? b.playtime : 10;
        for (var c = 0; c <= a.length - 1; c++)
            for (var d = 0; d <= a[c].timeline.length - 1; d++)
                a[c].timeline[d].wait(b.playtime);
        return !0
    },mSetTo: function(a, b, c) {
        c.x = c.x ? c.x : 0, c.y = c.y ? c.y : 0;
        var d = {};
        c.x && (d.x = c.x, b.beforeX[c.index] = d.x), c.y && (d.y = c.y, b.beforeY[c.index] = d.y), b.timeline[c.index].to(d)
    },mMoveToInstantry: function(a, b) {
        b.x = b.x ? b.x : 0, b.y = b.y ? b.y : 0, b.playtime = b.playtime ? b.playtime : 0, b.ease = b.ease ? b.ease : "linear";
        var c = {};
        b.x && (c.x = a.x + b.x), b.y && (c.y = a.y + b.y), createjs.Tween.get(a).to(c, b.playtime, createjs.Ease[b.ease])
    },mMoveTo: function(b, c, d, e) {
        var f;
        d.x = d.x ? d.x : 0, d.y = d.y ? d.y : 0, d.playtime = d.playtime ? d.playtime : 0, d.ease = d.ease ? d.ease : "linear", e.wait = e.wait ? e.wait : 0;
        for (var g = 0; g <= b.length - 1; g++) {
            if (d.index == g) {
                c.beforeX[g] || (c.beforeX[g] = b[g].x), c.beforeY[g] || (c.beforeY[g] = b[g].y);
                var h = {};
                d.x && (h.x = c.beforeX[g] + d.x, c.beforeX[g] = h.x), d.y && (h.y = c.beforeY[g] + d.y, c.beforeY[g] = h.y), c.timeline[g].wait(e.wait).to(h, d.playtime, createjs.Ease[d.ease]), f = parseInt(d.playtime)
            }
            d.index != g && c.timeline[g].wait(d.playtime + e.adjust)
        }
        return e && a.mAdjust(e, f), f
    },mChangeMotionAll: function(b, d, e, f) {
        e.motion = e.motion ? e.motion : "", e.is_alive = e.is_alive ? e.is_alive : "", e.type = e.type ? e.type : "", e.is_replace = e.is_replace ? e.is_replace : "", e.wait = e.wait ? e.wait : 0, e.current_hp = e.current_hp ? e.current_hp : "";
        for (var g = stage.gGameStatus[e.type].param, h = !0, i = "", j = "", k = 0; k <= d.length - 1; k++)
            if ("on" !== e.is_alive || 0 != g[k].alive) {
                h = !1;
                var l = "player" === e.type ? 1 == stage.gGameStatus.player.param[k].leader ? "job" : "npc" : "enemy";
                i = "", "player" === e.type && (j = e.current_hp ? e.current_hp : stage.gGameStatus.player.param[k].hp), i = !e.is_replace && e.motion == c.pDownTarget && "player" === e.type && j / stage.gGameStatus.player.param[k].hpmax <= c.pDownThreshold ? c.pDownLabel : e.motion, this.mIsSpecialMotion({type: e.type,pos: k,motion: i}) && (i = stage.gGameStatus.player.param[k].condition.special_motion), "1" != stage.pJsnData.effect_mode && (i = c.mCjsLabelSelecter(l, i)), d[k].wait(e.wait).call(function(a, b, c) {
                    ("on" !== e.is_alive || g[a].alive > 0) && b[a][e.mc[a].cjs].gotoAndPlay(c)
                }, [k, b, i])
            }
        var m = 0;
        if (!h) {
            var n = e.mc[0].cjs + "_" + i;
            m = b[0][e.mc[0].cjs][n].timeline.duration
        }
        return f && a.mAdjust(f, m), m
    },mChangeMotion: function(d, e, f) {
        e.motion = e.motion ? e.motion : "", e.type = e.type ? e.type : "", e.delay = e.delay ? e.delay * (1e3 / createjs.Ticker.getFPS()) : 0, e.is_alive = e.is_alive ? e.is_alive : "", e.is_replace = e.is_replace ? e.is_replace : "", e.current_hp = e.current_hp ? e.current_hp : "";
        var g = "player" === e.type ? stage.gAryRootAvatar[e.pos] : "boss" === e.type ? stage.gAryRootBoss[e.pos] : "", h = stage.gGameStatus[e.type].param, i = "player" === e.type ? 1 == stage.gGameStatus.player.param[e.pos].leader ? "job" : "npc" : "enemy", j = "", k = "";
        "player" === e.type && (k = e.current_hp ? e.current_hp : stage.gGameStatus.player.param[e.pos].hp), j = !e.is_replace && e.motion == c.pDownTarget && "player" === e.type && k / stage.gGameStatus.player.param[e.pos].hpmax <= c.pDownThreshold ? c.pDownLabel : e.motion, this.mIsSpecialMotion({type: e.type,pos: e.pos,motion: j}) && (j = stage.gGameStatus.player.param[e.pos].condition.special_motion), "1" != stage.pJsnData.effect_mode && (j = c.mCjsLabelSelecter(i, j)), d.call(function() {
            if ("on" !== e.is_alive || 0 != h[e.pos].alive) {
                var a = "player" === e.type ? stage.gAryRootAvatar[e.pos] : "boss" === e.type ? stage.gAryRootBoss[e.pos] : "";
                setTimeout(function() {
                    e.se && b.playSE(e.se), e.voice && b.playVoice(e.voice);
                    var c = a[h[e.pos].cjs];
                    c && _.isFunction(c.gotoAndPlay) && c.gotoAndPlay(j)
                }, e.delay)
            }
        });
        var l = 0;
        if ("on" !== e.is_alive || 0 != h[e.pos].alive) {
            var m = h[e.pos].cjs + "_" + j;
            l = g[h[e.pos].cjs][m].timeline.duration, f && a.mAdjust(f, l)
        }
        return l
    },mResetMotion: function(a, b) {
        var d = createjs.denaVersion ? createjs.Ticker.getInterval() : stage.gGameParam.spf;
        b.delay = b.delay ? b.delay * d : 0, b.motion = b.motion ? b.motion : "", b.type = b.type ? b.type : "", b.is_replace = b.is_replace ? b.is_replace : "", b.current_hp = b.current_hp ? b.current_hp : "";
        var e = "player" === b.type ? 1 == stage.gGameStatus.player.param[b.pos].leader ? "job" : "npc" : "enemy", f = "", g = "";
        "player" === b.type && (g = b.current_hp ? b.current_hp : stage.gGameStatus.player.param[b.pos].hp), f = !b.is_replace && b.motion == c.pDownTarget && "player" === b.type && g / stage.gGameStatus.player.param[b.pos].hpmax <= c.pDownThreshold ? c.pDownLabel : b.motion, this.mIsSpecialMotion({type: b.type,pos: b.pos,motion: f}) && (f = stage.gGameStatus.player.param[b.pos].condition.special_motion), "1" != stage.pJsnData.effect_mode && (f = c.mCjsLabelSelecter(e, f)), a.call(function(a) {
            var b = "player" === a.type ? stage.gAryRootAvatar[a.pos] : "boss" === a.type ? stage.gAryRootBoss[a.pos] : "", c = stage.gGameStatus[a.type].param[a.pos].cjs;
            setTimeout(function() {
                stage.gGameStatus.motion_lock === !1 && b[c].gotoAndPlay(f)
            }, a.delay)
        }, [b])
    },mChangeMotionInstantly: function(a) {
        a.motion = a.motion ? a.motion : "", a.type = a.type ? a.type : "";
        var b = createjs.denaVersion ? createjs.Ticker.getInterval() : stage.gGameParam.spf;
        a.delay = a.delay ? a.delay * b : 0, a.is_replace = a.is_replace ? a.is_replace : "", a.current_hp = a.current_hp ? a.current_hp : "", a.is_alive = a.is_alive ? a.is_alive : "";
        var d = "player" === a.type ? stage.gAryRootAvatar[a.pos] : "boss" === a.type ? stage.gAryRootBoss[a.pos] : "", e = stage.gGameStatus[a.type].param, f = stage.gGameStatus[a.type].param[a.pos].cjs, g = "player" === a.type ? 1 == stage.gGameStatus.player.param[a.pos].leader ? "job" : "npc" : "enemy", h = "", i = "";
        "player" === a.type && (i = a.current_hp ? a.current_hp : stage.gGameStatus.player.param[a.pos].hp), h = !a.is_replace && a.motion == c.pDownTarget && "player" === a.type && i / stage.gGameStatus.player.param[a.pos].hpmax <= c.pDownThreshold ? c.pDownLabel : a.motion, this.mIsSpecialMotion({type: a.type,pos: a.pos,motion: h}) && (h = stage.gGameStatus.player.param[a.pos].condition.special_motion), "1" != stage.pJsnData.effect_mode && (h = c.mCjsLabelSelecter(g, h));
        var j = 0;
        if ("on" !== a.is_alive || 0 != e[a.pos].alive) {
            var k = f + "_" + h;
            j = d[f][k].timeline.duration, setTimeout(function() {
                d[f].gotoAndPlay(h)
            }, a.delay)
        }
        return j
    },mCjsLabelSelecter: function(a, b) {
        return c.oCjsLabelMap[a][b]
    },mIsSpecialMotion: function(a) {
        return "player" !== a.type || 0 != stage.gGameStatus.attacking && "stbwait" !== a.motion && "wait" !== a.motion || "undefined" == typeof stage.gGameStatus.player.param[a.pos].condition.special_motion ? !1 : !0
    }};
    return c
});
