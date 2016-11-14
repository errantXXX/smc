/**
 * Created by cjloryisme on 2016/3/15.
 */
define(["lib/raid/timeline"], function(a, b) {
    var c = {
        pDownTarget: "stbwait",
        pDownLabel: "down",
        pDownThreshold: .25,
        oCjsLabelMap: {job: {wait: "wait", stbwait: "wait", chara_select: "wait", setup: "setup", ability_wait: "setup", chara_in: "setup", attack: "attack", mortal: "attack", mortal_A: "attack", mortal_A_1: "attack", mortal_A_2: "attack", mortal_B: "attack", mortal_B_1: "attack", mortal_B_2: "attack", mortal_C: "attack", mortal_C_1: "attack", mortal_C_2: "attack", mortal_D: "attack", mortal_D_1: "attack", mortal_D_2: "attack", mortal_E: "attack", mortal_E_1: "attack", mortal_E_2: "attack", "double": "attack", triple: "attack", dead: "dead", damage: "damage", win: "win", ability: "ability", chara_out: "chara_out", hide: "chara_out", summon: "summon", down: "down", alive: "alive", change_1: "change_1", change_2: "change_2", charge: "charge"}, npc: {wait: "wait", stbwait: "wait", chara_select: "wait", setup: "setup", ability_wait: "setup", chara_in: "setup", attack: "attack", mortal: "attack", mortal_A: "attack", mortal_A_1: "attack", mortal_A_2: "attack", "double": "attack", triple: "attack", short_attack: "attack", dead: "dead", damage: "damage", win: "win", ability: "ability", chara_out: "chara_out", hide: "chara_out", down: "down", change: "change", change_1: "change_1", change_2: "change_2"}, enemy: {setin: "setin", wait: "wait", setin_2: "wait", wait_2: "wait", setin_3: "wait", wait_3: "wait", damage: "damage", dead: "dead", attack: "attack", mortal_A: "attack", mortal_B: "attack", mortal_C: "attack", mortal: "attack", escape: "escape", form_change: "form_change", down: "down", setin_4: "setin_4"}},
        mWaitAll: function (a, b) {
            b.playtime = b.playtime ? b.playtime : 10;
            for (var c = 0; c <= a.length - 1; c++)
                for (var d = 0; d <= a[c].timeline.length - 1; d++)
                    a[c].timeline[d].wait(b.playtime);
            return !0
        },
        mChangeMotionAll: function(mcList/* b mc list*/, timelineManager/* d timeline*/, option/*option*/, f/*adjust timeline*/) {
            option.motion = option.motion ? option.motion : "";
            option.is_alive = option.is_alive ? option.is_alive : "";
            option.type = option.type ? option.type : "";
            option.is_replace = option.is_replace ? option.is_replace : "";
            option.wait = option.wait ? option.wait : 0;
            option.current_hp = option.current_hp ? option.current_hp : "";
            var objectStatus = stage.gGameStatus[option.type].param;
            var h = !0, i = "", targetMotion = "";

            for (var k = 0; k <= timelineManager.length - 1; k++)
                if ("on" !== option.is_alive || 0 != objectStatus[k].alive) {
                    h = !1;
                    var targetType = "player" === option.type ? 1 == stage.gGameStatus.player.param[k].leader ? "job" : "npc" : "enemy";
                    i = "",
                        "player" === option.type && (targetCurrentHp = option.current_hp ? option.current_hp : stage.gGameStatus.player.param[k].hp),
                        targetMotion = !option.is_replace && option.motion == c.pDownTarget && "player" === option.type && targetCurrentHp / stage.gGameStatus.player.param[k].hpmax <= c.pDownThreshold ? c.pDownLabel : option.motion,
                        //this.mIsSpecialMotion({type: option.type,pos: k,motion: targetMotion}) && (targetMotion = stage.gGameStatus.player.param[k].condition.special_motion),
                        //"1" != stage.pJsnData.effect_mode && (targetMotion = c.mCjsLabelSelecter(targetType, targetMotion)),

                        timelineManager[k].wait(option.wait).call(function(index, mcList, targetMotion) {

                            ("on" !== option.is_alive || objectStatus[index].alive > 0) && mcList[index][option.mc[index].cjs].gotoAndPlay(targetMotion)
                        }, [k, mcList, targetMotion])
                }
            var m = 0;
            if (!h) {
                var n = option.mc[0].cjs + "_" + targetMotion;
                m = mcList[0][option.mc[0].cjs][n].timeline.duration
            }
            return f && a.mAdjust(f, m), m
        },/*mChangeMotionAll end*/
        mChangeMotion: function(d, e, f) {
            console.info("e.pos");
            console.info(e.pos);
            console.info(stage.gGameStatus.player.param)
            e.motion = e.motion ? e.motion : "", e.type = e.type ? e.type : "", e.delay = e.delay ? e.delay * stage.gGameParam.spf : 0, e.is_alive = e.is_alive ? e.is_alive : "", e.is_replace = e.is_replace ? e.is_replace : "", e.current_hp = e.current_hp ? e.current_hp : "";
            var g = "player" === e.type ? stage.gAryRootAvatar[e.pos] : "boss" === e.type ? stage.gAryRootBoss[e.pos] : "", h = stage.gGameStatus[e.type].param, i = "player" === e.type ? 1 == stage.gGameStatus.player.param[e.pos].leader ? "job" : "npc" : "enemy", j = "", k = "";
            "player" === e.type && (k = e.current_hp ? e.current_hp : stage.gGameStatus.player.param[e.pos].hp),
             j = !e.is_replace && e.motion == c.pDownTarget && "player" === e.type && k / stage.gGameStatus.player.param[e.pos].hpmax <= c.pDownThreshold ? c.pDownLabel : e.motion,
             this.mIsSpecialMotion({type: e.type,pos: e.pos,motion: j}) && (j = stage.gGameStatus.player.param[e.pos].condition.special_motion),
             "1" != stage.pJsnData.effect_mode && (j = c.mCjsLabelSelecter(i, j)), d.call(function() {
                if ("on" !== e.is_alive || 0 != h[e.pos].alive) {
                    var a = "player" === e.type ? stage.gAryRootAvatar[e.pos] : "boss" === e.type ? stage.gAryRootBoss[e.pos] : "";
                    setTimeout(function() {
                        //e.se && b.playSE(e.se), e.voice && b.playVoice(e.voice), a[h[e.pos].cjs].gotoAndPlay(j)
                    }, e.delay)
                }
            });
            var l = 0;
            if ("on" !== e.is_alive || 0 != h[e.pos].alive) {
                var m = h[e.pos].cjs + "_" + j;
                l = g[h[e.pos].cjs][m].timeline.duration, f && a.mAdjust(f, l)
            }
            return l
        },
        mCjsLabelSelecter: function(a, b) {
            return c.oCjsLabelMap[a][b]
        },mIsSpecialMotion: function(a) {
            return "player" !== a.type || 0 != stage.gGameStatus.attacking && "stbwait" !== a.motion && "wait" !== a.motion || "undefined" == typeof stage.gGameStatus.player.param[a.pos].condition.special_motion ? !1 : !0
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
        }

    }
    return c
})