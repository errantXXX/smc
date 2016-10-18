define(["underscore", "lib/raid/draw"], function(a, b) {
    var c = {mBrightnessOut: function(a, b) {
        b.duration = b.duration ? b.duration : "0.3s", b.count = b.count ? b.count : "1", a.call(function() {
            var a = $(".prt-bg-effect-brightness");
            a.addClass("to-black-stop").css({"animation-duration": b.duration,"-webkit-animation-duration": b.duration,"animation-iteration-count": b.count,"-webkit-animation-iteration-count": b.count})
        })
    },mBrightnessIn: function(a, b) {
        b.duration = b.duration ? b.duration : "0.3s", b.count = b.count ? b.count : "1", a.call(function() {
            var a = $(".prt-bg-effect-brightness");
            a.removeClass("to-black-stop").addClass("to-black-start").css({"animation-duration": b.duration,"-webkit-animation-duration": b.duration,"animation-iteration-count": b.count,"-webkit-animation-iteration-count": b.count}).on("animationend webkitAnimationEnd", function() {
                $(this).removeClass("to-black-start").attr("style", "")
            })
        })
    },mDamageRattle: function(a, b) {
        var c = this;
        b = b ? b : 0, a.call(function(a) {
            setTimeout(function() {
                var a = 25, b = 2;
                c.mCommonShake(stage.gAryCntnAvatar, a, b), c.mCommonShake(stage.gAryCntnBoss, a, b)
            }, a)
        }, [b])
    },mCommonShake: function(b, c, d) {
        var e = 1;
        a.each(b, function(b) {
            b.beforeY = b.beforeY || b.y, b.y = b.beforeY;
            var f = createjs.Tween.get(b, {override: !0});
            a.each(a.range(d), function() {
                f = f.wait(c).set({y: b.y + e}).wait(c).set({y: b.y - e}).wait(c).set({y: b.y})
            })
        })
    },mHitEffect: function(a, c, d) {
        d.kind = d.kind ? d.kind : "", d.delay = d.delay ? d.delay : 0;
        var e = d.pos || 0, f = new lib[d.kind], g = new createjs.Container, h = f[d.kind][d.kind + "_effect"].timeline.duration;
        return g.addChild(f), a.call(function(a, c, d) {
            setTimeout(function() {
                var b = c.type, d = stage.gGameStatus.union_enemy;
                d && "boss" === b ? stage.gBossContainer.addChild(g) : a.addChild(g);
                var h = stage.gGameParam.grid.hit;
                if ("player" === b)
                    g.x += h[b].x, g.y += h[b].y;
                else if ("boss" === b) {
                    var i = stage.pJsnData.boss.param[e].effect_position || {x: 0,y: 0};
                    d ? (g.x = 190 + (+i.x || 0), g.y = 540 + (+i.y || 0)) : (g.x += h[b][c.size].x + (+i.x || 0), g.y += h[b][c.size].y + (+i.y || 0))
                }
                f[c.kind].gotoAndPlay(6)
            }, c.delay * stage.gGameParam.spf), stage.gGameStatus.union_enemy && "boss" === c.type ? b.mRemove(d + c.delay, g, stage.gBossContainer) : b.mRemove(d + c.delay, g, a)
        }, [c, d, h]), h
    },mEffect: function(a, c, d) {
        d.kind = d.kind ? d.kind : "", d.delay = d.delay ? d.delay : 0;
        var e = d.pos || 0, f = new lib[d.kind](void 0, void 0, void 0, d.cjs_param), g = new createjs.Container, h = f[d.kind][d.kind + "_effect"].timeline.duration;
        return g.addChild(f), a.call(function(a, c, d) {
            setTimeout(function() {
                var b = stage.gGameStatus.union_enemy, d = c.to;
                if (!b || "boss" !== d && "boss_fullscreen" !== d ? a.addChild(g) : stage.gBossContainer.addChild(g), "player_fullscreen" !== d && "boss_fullscreen" !== d) {
                    var f = c.list ? c.list.length : 0;
                    if ("player" === d)
                        if (f > 0) {
                            var h = stage.gGameParam.grid.effect[d];
                            g.x += h.x, g.y += h.y
                        } else
                            g.x = 490, g.y = 540;
                    else if ("boss" === d) {
                        var i = stage.pJsnData.boss.param[e].effect_position || {x: 0,y: 0};
                        if (b)
                            g.x = 190 + (+i.x || 0), g.y = 540 + (+i.y || 0);
                        else if (f > 0) {
                            var h = stage.gGameParam.grid.effect[d][stage.pJsnData.boss.type];
                            g.x += h.x + (+i.x || 0), g.y += h.y + (+i.y || 0)
                        } else
                            g.x = 190, g.y = 540
                    }
                }
            }, c.delay * stage.gGameParam.spf), !stage.gGameStatus.union_enemy || "boss" !== c.to && "boss_fullscreen" !== c.to ? b.mRemove(d + c.delay, g, a) : b.mRemove(d + c.delay, g, stage.gBossContainer)
        }, [c, d, h]), h
    },mAbility: function(a, c, d) {
        d.kind = d.kind ? d.kind : "";
        var e = new lib[d.kind], f = new createjs.Container, g = e[d.kind][d.kind + "_effect"].timeline.duration;
        return f.addChild(e), a.call(function(a, c, d) {
            a.addChild(f), "player" === c.to ? (f.x += stage.gGameParam.grid.effect[c.to].x, f.y += stage.gGameParam.grid.effect[c.to].y) : "boss" === c.to && (f.x += stage.gGameParam.grid.effect[c.to][stage.pJsnData.boss.type].x, f.y += stage.gGameParam.grid.effect[c.to][stage.pJsnData.boss.type].y), b.mRemove(d, f, a)
        }, [c, d, g]), g
    },mSpecial: function(a, c, d) {
        d.size = d.size ? d.size : "";
        var e = new lib[c.kind](void 0, void 0, void 0, c.cjs_param), f = new createjs.Container, g = e[c.kind][c.kind + "_special"].timeline.duration;
        return f.addChild(e), a.call(function(a, c, d) {
            if (stage.gScenarioParam = a, "player" === a.target) {
                if (stage.gPlayerContainer.addChild(f), 0 === a.to || a.to) {
                    var e = 30;
                    f.x = stage.gAryCntnAvatar[a.to].x, f.y = stage.gAryCntnAvatar[a.to].y + e
                } else
                    f.x = 490, f.y = 540;
                b.mRemove(d, f, stage.gPlayerContainer)
            } else if ("boss" === a.target) {
                stage.gBossContainer.addChild(f);
                var g = {s: 160,m: 100,l: 0}, e = g[c.size];
                0 === a.to || a.to ? (f.x = stage.gAryCntnBoss[a.to].x, f.y = stage.gAryCntnBoss[a.to].y + e) : (f.x = 190, f.y = 540), b.mRemove(d, f, stage.gBossContainer)
            }
        }, [c, d, g]), g
    },mChainCutin: function(a, c) {
        window.chain_num = Number(c.chain_num);
        var d = c.images.length, e = "raid_" + d + "chain", f = "raid_chain_" + d + "chain", g = new lib[stage.gGameParam.cjs.raid_chain], h = g[stage.gGameParam.cjs.raid_chain][f].timeline.duration, i = new createjs.Container;
        return i.addChild(g), stage.gMasterContainer.addChild(i), a.call(function() {
            if (createjs.denaVersion) {
                i._layer = 1;
                for (var a = stage.gMasterContainer.getNumChildren() - 1; a >= 0; --a) {
                    var c = stage.gMasterContainer.getChildAt(a);
                    c !== i && (c._passive = 1)
                }
            }
            g[stage.gGameParam.cjs.raid_chain].gotoAndPlay(e), b.mRemove(h, i, stage.gMasterContainer)
        }, [c]), h
    },mSummonCutin: function(a, c) {
        a.call(function(a) {
            stage.gGameStatus.raid_union_summon_name = a.name;
            var c = new lib[stage.gGameParam.cjs.raid_union_summon], d = c[stage.gGameParam.cjs.raid_union_summon].ui_parts.timeline.duration, e = new createjs.Container;
            e.addChild(c), e.x = stage.gGameParam.relative.summon_union.x, e.y = 0, stage.gMasterContainer.addChild(e), b.mRemove(d, e, stage.gMasterContainer)
        }, [c])
    },mSummon: function(a, c, d) {
        d.size = d.size ? d.size : "", c.target = "boss", d.speed = d.speed ? d.speed : "";
        var e = new lib[c.kind], f = new createjs.Container, g = e[c.kind][c.kind].timeline.duration;
        f.addChild(e);
        var h, i, j;
        if ("undefined" != typeof d.speed && 2 == d.speed && c.kind.match(/_attack$/)) {
            if (10 >= g)
                return 0;
            1 === stage.pJsnData.effect_mode ? (h = 8, i = 4, j = 12) : (h = 0, i = 1, j = 18);
            var k = g - h - j, l = parseInt(k / (i - 1)), m = "1" === stage.pJsnData.effect_mode ? k % (i - 1) : 0;
            g = h + j + j * (i - 1) + m
        }
        if (a[2].timeline[0].call(function(a, c, d) {
                if (stage.gScenarioParam = a, createjs.denaVersion) {
                    f._layer = 1;
                    for (var e = stage.gMasterContainer.getNumChildren() - 1; e >= 0; --e) {
                        var g = stage.gMasterContainer.getChildAt(e);
                        g._passive = 1
                    }
                }
                stage.gMasterContainer.addChild(f), f.x = stage.gGameParam.relative.summon.x, f.y = stage.gGameParam.relative.summon.y, b.mRemove(d, f, stage.gMasterContainer)
            }, [c, d, g]), "undefined" != typeof d.speed && 2 == d.speed && c.kind.match(/_attack$/)) {
            for (var n = 0; 1 >= n; n++)
                for (var o = 0; o <= a[n].timeline.length - 1; o++)
                    a[n].timeline[o].wait(h);
            a[2].timeline[0].wait(h);
            for (var p = h, n = 0; i - 1 > n; n++) {
                for (var o = 0; 1 >= o; o++)
                    for (var q = 0; q <= a[o].timeline.length - 1; q++)
                        a[o].timeline[q].wait(j);
                a[2].timeline[0].wait(j).call(function(a, b) {
                    p += l, b[a.kind][a.kind].gotoAndPlay(p)
                }, [c, e])
            }
            g = j + m
        }
        return g
    },mGetTreasure: function(b, c, d, e) {
        var f = new lib.treasure_get(null, null, null, d.length, a.map(d, function(a) {
            return parseInt(a)
        })), g = new createjs.Container;
        g.addChild(f), g.x += stage.gGameParam.relative.treasure[stage.pJsnData.boss.type].x, g.y += stage.gGameParam.relative.treasure[stage.pJsnData.boss.type].y, c.addChild(g), stage.gGameStatus.dropped.push([d, f, g]), b.call(function(a) {
            a ? f.treasure_get.gotoAndPlay("wait") : f.treasure_get.gotoAndPlay("start")
        }, [e])
    },mOpenTreasure: function(a, b) {
        a.call(function(a) {
            a[1].treasure_get.gotoAndPlay("end")
        }, [b]);
        var c = b[1].treasure_get.timeline.duration;
        return c
    },mDeleteTreasure: function(c, d) {
        a.each(c, function(a) {
            b.mRemove(d.delay, a[1], a[2])
        })
    },mGetItem: function(a, c, d) {
        var e = new lib.item_get(null, null, null, parseInt(d[0])), f = new createjs.Container;
        f.addChild(e), f.x += stage.gGameParam.relative.item[stage.pJsnData.boss.type].x, f.y += stage.gGameParam.relative.item[stage.pJsnData.boss.type].y, c.addChild(f), a.call(function(a) {
            e.item_get.gotoAndPlay("start");
            var c = 60;
            b.mRemove(c, f, a)
        }, [c])
    }};
    return c
});
