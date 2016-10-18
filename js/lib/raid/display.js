/**
 * Created by Administrator on 2016/10/18.
 */
define(["underscore", "model/sound", "model/raid/setup", "util/language-message"], function(a, b, c, d) {
    var e = [], f = !1, g = !1, h = 16, i = {reqStartTime: 0,mBossSetup: function(a, b, c) {
        if (c.size = c.size ? c.size : "s", c.force = c.force ? c.force : !1, c.force)
            for (var d = 0; d <= b.length - 1; d++)
                1 == b[d].alive && (c.force = !1);
        $(".prt-targeting-area").attr({type: stage.pJsnData.boss.type + stage.pJsnData.boss.number});
        for (var d = 0; d <= b.length - 1; d++)
            (1 == b[d].alive || c.force) && ($(".lis-enemy").eq(d).addClass("enemy-" + stage.pJsnData.boss.type), a.call(function(a, b, c) {
                if ("s" === c.size || "m" === c.size) {
                    var d = a + 1;
                    $(".prt-enemy-area.enemy-" + d).addClass("enemy-" + c.size), $(".prt-enemy-area.enemy-" + d).css({top: stage.gAryCntnBoss[a].y / 2 + "px"}), $(".prt-enemy-area.enemy-" + d).css({left: stage.gAryCntnBoss[a].x / 2 + "px"}), 1 == b[a].alive || c.force ? $(".enemy-" + d).show() : $(".enemy-" + d).hide()
                } else
                    "l" === c.size && ($(".prt-enemy-area").hide(), $(".prt-boss-area").show(), $(".prt-boss-area").css({top: stage.gAryCntnBoss[a].y / 2 + "px"}), $(".prt-boss-area").css({left: stage.gAryCntnBoss[a].x / 2 + "px"}))
            }, [d, b, c]))
    },mPlayerGaugeHp: function(a, b) {
        a.call(function(a, b) {
            i.mPlayerGaugeHpForLog(b)
        }, [a, b])
    },mPlayerGaugeHpForLog: function(a) {
        var b = Number(a.pos), c = parseInt(a.param.hp / a.param.hpmax * 100), d = 25 >= c ? "red" : "green", e = $(".prt-command-top .lis-character" + b + " .prt-gauge-hp-inner"), f = $(".prt-command-chara .lis-character" + b + " .prt-gauge-hp-inner"), g = $(".prt-command .lis-character" + b + " .txt-hp-value");
        e.css("width", c + "%").attr({color: d}), f.css("width", c + "%").attr({color: d}), g.attr({color: d}), clearInterval(stage.gAryInterval[b]), stage.gAryInterval[b] = setInterval(i.mPlayerHpRenew, 1e3 / 24, b, stage.gGameStatus.player.param[b].hp, a.param.hp), stage.gGameStatus.player.param[b].hp = a.param.hp, stage.pJsnData.player.param[stage.pJsnData.formation[b]].hp = a.param.hp
    },mPlayerHpRenew: function(a, b, c) {
        if (b == c)
            return $(".prt-command .lis-character" + a + " .txt-hp-value").html("" + b), void clearInterval(stage.gAryInterval[a]);
        var d = b > c ? -1 : 1, e = Math.abs(parseInt((b - c) / 12));
        1 >= e && (e = 1);
        var f = parseInt($(".prt-command .lis-character" + a + " .txt-hp-value").html(), 10) + d * e;
        (-1 == d && c >= f || 1 == d && f >= c) && (f = c), $(".prt-command .lis-character" + a + " .txt-hp-value").html("" + f), (-1 == d && c >= f || 1 == d && f >= c) && clearInterval(stage.gAryInterval[a])
    },mPlayerGaugeRecast: function(a, b) {
        a.call(function(a, b) {
            i.mPlayerGaugeRecastForLog(b)
        }, [a, b])
    },mPlayerGaugeRecastForLog: function(a) {
        var b = $(".prt-command .prt-gauge-special.character" + a.pos), c = parseInt(a.param.recast);
        if (b.find(".prt-gauge-special-inner").css("width", c + "%"), c > 100) {
            var d = c - 100;
            b.find(".prt-gauge-special2-inner").css("width", d + "%"), c >= 200 ? b.find(".prt-shine2").show() : b.find(".prt-shine2").hide()
        } else
            b.find(".prt-gauge-special2-inner").css("width", "0%"), b.find(".prt-shine2").hide();
        $(".prt-command .lis-character" + a.pos + " .prt-percent .txt-gauge-value").html("" + c), $(".prt-command-chara.chara" + (parseInt(a.pos) + 1) + " .txt-percent").html("" + c), stage.gGameStatus.player.param[a.pos].recast = a.param.recast, stage.pJsnData.player.param[stage.pJsnData.formation[a.pos]].recast = a.param.recast;
        var e = $(".prt-command-top .lis-character" + a.pos);
        100 > c && e.find(".prt-shine").hide()
    },mPlayerGaugeAttr: function(a, b) {
        a.call(function(a, b) {
            var c = Number(b.pos);
            $(".lis-character" + c + " .ico-type").removeClass().addClass("ico-type"), b.param.attr > 0 && $(".lis-character" + c + " .ico-type").addClass("ico-attribute-" + b.param.attr)
        }, [a, b])
    },mBossGaugeHp: function(a, b, c, d) {
        a.call(function(a, b, c) {
            i.mBossGaugeHpForLog(a, b, c)
        }, [b, c, d])
    },mBossGaugeHpForLog: function(a, b, c) {
        var d = Number(c.pos), e = c.param.isConcurrentLastAttack || !1;
        a[d].hp.change(c.param.hp, c.param.hpmax, e, d), stage.gGameStatus.boss.param[d].hp = c.param.hp, stage.pJsnData.boss.param[d].hp = c.param.hp
    },mBossGaugeRecast: function(a, b, c, d) {
        a.call(function(a, b, c) {
            i.mBossGaugeRecastForLog(a, b, c)
        }, [b, c, d])
    },mBossGaugeRecastForLog: function(a, b, c) {
        var d = Number(c.pos);
        a[d].recast.colorRecast(c.param.recast, c.param.recastmax), stage.gGameStatus.boss.param[d].recast = c.param.recast, stage.pJsnData.boss.param[d].recast = c.param.recast
    },mBossGaugeName: function(a, b, c) {
        a.call(function(a, b) {
            var c = parseInt(b.pos) + 1, d = $(".enemy-" + c);
            d.find(".name").html(b.param.name[Game.lang]), d.find(".attribute").removeClass().addClass("attribute ico-attribute-" + b.param.attr), "1" == b.param.rare_flag && d.find(".ico-rm").show()
        }, [b, c])
    },mHideBossGauge: function(b) {
        a.each(b, function(a) {
            a.hide()
        }), $(".prt-enemy-gauge").find(".lis-enemy").css("display", "none"), $(".prt-enemy-stage").find(".prt-target").css("display", "none")
    },mShowBossGauge: function(b) {
        stage.gGameStatus.isShowBossGauge && (a.each(b, function(a) {
            a.show()
        }), $(".prt-enemy-gauge").find(".lis-enemy").css("display", "block"), $(".prt-enemy-stage").find(".prt-target").css("display", "block"))
    },mConditionPlayer: function(b, c) {
        var d = $(".prt-command-top .lis-character" + c + " .prt-status"), e = $(".prt-command-chara.chara" + (+c + 1) + " .lis-character" + c + " .prt-status"), f = $(".prt-command-chara.chara" + (+c + 1) + " .prt-condition");
        d.hide(), e.hide(), f.hide();
        var g = {};
        a.each(b.buff, function(a) {
            g[a.status] = a.status
        }), a.each(b.debuff, function(a) {
            g[a.status] = a.status
        });
        var h = a.clone(g);
        d.children().filter(function() {
            var b = $(this).data("status");
            return a.has(g, b) ? (delete h[b], !1) : !0
        }).each(function(a, b) {
            b.src = ""
        }).remove(), e.children().filter(function() {
            var b = $(this).data("status");
            return a.has(g, b) ? !1 : !0
        }).each(function(a, b) {
            b.src = ""
        }).remove(), f.children().filter(function() {
            var b = $(this).data("status");
            return a.has(g, b) ? !1 : !0
        }).each(function(a, b) {
            b.src = ""
        }).remove();
        var i = [], j = [], k = [];
        a.each(h, function(a) {
            i.push('<img class="img-ico-status-s" src="' + Game.imgUri + "/sp/ui/icon/status/x64/status_" + a + '.png" data-status="' + a + '">'), j.push('<img class="img-ico-status-s" src="' + Game.imgUri + "/sp/ui/icon/status/x64/status_" + a + '.png" data-status="' + a + '">'), k.push('<img class="img-ico-status-m" src="' + Game.imgUri + "/sp/ui/icon/status/x64/status_" + a + '.png" data-status="' + a + '">')
        }), a.isEmpty(i) || d.append(i.join("")), a.isEmpty(j) || e.append(j.join("")), a.isEmpty(k) || f.append(k.join(""));
        var l = d.find(".img-ico-status-s").length - 4 * Math.floor(d.find(".img-ico-status-s").length / 4);
        l > 0 && (d.find(".img-ico-status-s").eq(l).before("<br>"), e.find(".img-ico-status-s").eq(l).before("<br>")), d.show(), e.show(), f.show()
    },mSetIntervalPlayerConditions: function(a) {
        var b = this, c = $(".prt-command-chara.chara" + a + " .prt-condition");
        clearInterval(stage.gGameStatus.timer.playerCondition), c.find(".img-ico-status-m").length >= 8 ? (this.playerConditionGroupNum = 1, stage.gGameStatus.timer.playerCondition = setInterval(function() {
            var a = c.find(".img-ico-status-m").length;
            if (8 > a)
                return clearInterval(stage.gGameStatus.timer.playerCondition), void c.find(".img-ico-status-m").show();
            b.playerConditionGroupNum++, Math.ceil(a / 7) < b.playerConditionGroupNum && (b.playerConditionGroupNum = 1);
            var d = 7 * (b.playerConditionGroupNum - 1), e = d + 7;
            c.find(".img-ico-status-m").hide(), c.find(".img-ico-status-m").slice(d, e).show()
        }, 1500)) : c.find(".img-ico-status-m").show()
    },mConditionBoss: function(b) {
        a.each(b, function(a) {
            a.condition.show(), a.condition.blinkCondition()
        })
    },mConditionField: function(a) {
        if (!stage.gGameStatus.finish) {
            stage.gFieldCondition.setCondition(a), stage.gGameStatus.field.hasFieldEffect = f = !0;
            var b = $("#prt-field-conditions");
            b.hasClass("show") || b.addClass("show")
        }
    },mRemoveConditionField: function() {
        stage.gFieldCondition.removeCondition(), stage.gGameStatus.field.hasFieldEffect = f = !1, $("#prt-field-conditions").removeClass("show")
    },mConditionAssistUnit: function(b) {
        stage.gAssistUnitCondition.setCondition(b), stage.gGameStatus.defend_order.hasAssistUnitEffect = g = !0;
        var c = $("#prt-assist-unit-conditions");
        c.hasClass("show") || c.addClass("show");
        var d = a.size(b) * h;
        c.css("width", d + "px")
    },mRemoveConditionAssistUnit: function() {
        stage.gAssistUnitCondition.removeCondition(), stage.gGameStatus.defend_order.hasAssistUnitEffect = g = !1, $("#prt-assist-unit-conditions").removeClass("show")
    },mSummonStart: function(b, c) {
        b.call(function() {
            $('.prt-enemy-stage div[class^="prt-target"]').hide(), $(".prt-enemy-gauge").hide(), $(".btn-enemy-gauge.prt-percent.alive").css("display", "none"), a.each(c, function(a, b) {
                a.hide()
            }), stage.gGameStatus.diagram && $(".img-diagram").removeClass("display-on").addClass("display-off"), stage.gAryCntnParts[2].visible = !1, f && (stage.gFieldCondition.hide(), $("#prt-field-conditions").removeClass("show")), g && (stage.gAssistUnitCondition.hide(), $("#prt-assist-unit-conditions").removeClass("show"))
        })
    },mSummonEnd: function(b, c) {
        b.call(function() {
            stage.gGameStatus.isShowBossGauge && ($('.prt-enemy-stage div[class^="prt-target"]').show(), $(".prt-enemy-gauge").show(), $(".btn-enemy-gauge.prt-percent.alive").css("display", "block"), a.each(c, function(a, b) {
                a.show()
            }), f && (stage.gFieldCondition.show(), $("#prt-field-conditions").addClass("show")), g && (stage.gAssistUnitCondition.show(), $("#prt-assist-unit-conditions").addClass("show")))
        })
    },mSuperWindowEffectStart: function(b, c) {
        b.call(function() {
            $('.prt-enemy-stage div[class^="prt-target"]').css("display", "none"), $(".prt-enemy-gauge").css("display", "none"), $(".btn-enemy-gauge.prt-percent.alive").css("display", "none"), a.each(c, function(a, b) {
                a.hide()
            }), stage.gGameStatus.diagram && $(".img-diagram").removeClass("display-on").addClass("display-off")
        })
    },mSuperWindowEffectEnd: function(b, c) {
        b.call(function() {
            stage.gGameStatus.isShowBossGauge && ($('.prt-enemy-stage div[class^="prt-target"]').css("display", "block"), $(".prt-enemy-gauge").css("display", "block"), $(".btn-enemy-gauge.prt-percent.alive").css("display", "block"), a.each(c, function(a, b) {
                a.show()
            })), stage.gGameStatus.diagram && $(".img-diagram").removeClass("display-off").addClass("display-on")
        })
    },mFellowTimer: function(b, c, d) {
        b.call(function(b, c) {
            var d = !1, e = !1, f = !0, g = setInterval(function() {
                if (stage.gGameStatus.timer.mFellowTimer = g, f && (stage.pJsnData.timer += i.reqStartTime - parseInt(new Date / 1e3), f = !1), stage.pJsnData.timer <= 0 && (e || d && !(0 >= d) || 1 == stage.gGameStatus.attacking ? d && d-- : (e = !0, i._mGetRemain(function(a) {
                        e = !1, a.timer <= 0 ? (clearInterval(g), c && c()) : d = a.timer
                    }))), stage.pJsnData.timer >= 0 && !f) {
                    if (stage.pJsnData.fellow || 0 == stage.pJsnData.fellow) {
                        var b = $(".prt-total-human .prt-human-value .txt-info-num");
                        if (b.css("display", "block"), stage.pJsnData.fellow !== stage.pJsnData.previousFellow) {
                            var h = stage.pJsnData.fellow.toString().split(""), j = b.find(".current");
                            j.removeClass(function(a, b) {
                                return (b.match(/num-info\d+/g) || []).join(" ")
                            }), h.reverse();
                            var k = j.size();
                            a.each(h, function(a, b) {
                                $(j[k - 1 - b]).addClass("num-info" + a)
                            }), stage.pJsnData.previousFellow = stage.pJsnData.fellow
                        }
                        if (stage.pJsnData.limit_number !== stage.pJsnData.previousLimit) {
                            var l = stage.pJsnData.limit_number.toString().split(""), m = b.find(".max");
                            m.removeClass(function(a, b) {
                                return (b.match(/num-info\d+/g) || []).join(" ")
                            }), l.reverse();
                            var n = m.size();
                            a.each(l, function(a, b) {
                                $(m[n - 1 - b]).addClass("num-info" + a)
                            }), stage.pJsnData.previousLimit = stage.pJsnData.limit_number
                        }
                    }
                    if (stage.pJsnData.timer || 0 == stage.pJsnData.timer) {
                        var o = $(".prt-remain-time .prt-clocl-value .txt-info-num");
                        o.css("display", "block");
                        var p = parseInt(stage.pJsnData.timer / 3600);
                        p = 10 > p ? "0" + p : p.toString();
                        var q = p.split(""), r = o.find(".hour");
                        r.removeClass(function(a, b) {
                            return (b.match(/num-info\d+/g) || []).join(" ")
                        }), q.reverse();
                        var s = r.size();
                        a.each(q, function(a, b) {
                            $(r[s - 1 - b]).addClass("num-info" + a)
                        });
                        var t = parseInt((stage.pJsnData.timer - 3600 * p) / 60);
                        t = 10 > t ? "0" + t : t.toString();
                        var u = t.split(""), v = o.find(".minute");
                        v.removeClass(function(a, b) {
                            return (b.match(/num-info\d+/g) || []).join(" ")
                        }), u.reverse();
                        var w = v.size();
                        a.each(u, function(a, b) {
                            $(v[w - 1 - b]).addClass("num-info" + a)
                        }), stage.pJsnData.timer--
                    }
                }
                stage.gGameStatus.logtimer > 0 && stage.gGameStatus.logtimer--
            }, stage.gGameParam.interval.raidstate)
        }, [c, d])
    },_mGetRemain: function(a) {
        var b = new c, d = {raid_id: stage.pJsnData.raid_id};
        b.save(d, {url: b.urlRoot("remain_time", "", !0, stage.pJsnData.is_semi),silent: !0,error: function() {
        },success: function() {
            a && a(b.toJSON())
        }})
    },mBalloon: function(b) {
        b.call(function() {
            var b = stage.gGameParam.interval.balloon, c = "";
            stage.gGameStatus.timer.mBalloon && clearInterval(stage.gGameStatus.timer.mBalloon), stage.gGameStatus.timer.mBalloon = setInterval(function() {
                var b = null, d = null, e = null;
                if ("wait" === stage.gGameStatus.balloon) {
                    var f = [], g = [];
                    if (a.each(stage.pJsnData.balloon.boss, function(a) {
                            a.serif && (f[a.pos] = {type: "boss",pos: a.pos,serif: a.serif}, g.push(a.pos))
                        }), g.length > 0) {
                        var h = g.length > 1 && "undefined" != typeof c ? a.without(g, c) : [g[0]], i = parseInt(Math.random() * h.length);
                        c = h[i], b = f[h[i]].type, d = f[h[i]].pos, e = f[h[i]].serif
                    }
                    if (e) {
                        var j = null;
                        if ("boss" === b) {
                            var b = "l" === stage.pJsnData.boss.type ? ".prt-boss-area" : ".prt-enemy-area.enemy-" + (d + 1) + ".enemy-" + stage.pJsnData.boss.type;
                            j = $(b + " .prt-comment"), j.find(".txt-comment").html(e), j.show().addClass("anim-baloon pos-wait").on("animationend webkitAnimationEnd", function() {
                                $(this).removeClass("anim-baloon pos-wait").hide()
                            })
                        }
                    }
                }
            }, b)
        })
    },mDisplayStrip: function(a, b) {
        a.call(function(a) {
            var b = $(".prt-command-top .lis-character" + a.pos);
            "on" === a.mode ? (b.removeClass("mask-shine"), b.find("prt-shine").hide(), b.removeClass("mask-black-fade"), b.addClass("attack")) : "off" === a.mode && (b.removeClass("attack"), b.addClass("mask-black"))
        }, [b])
    },mUpdateTemporaryItem: function() {
        var a = $(".prt-select-item .prt-item-info .lis-item"), b = stage.gGameStatus.temporary.small, c = 0;
        b > 0 && (c = b - 1);
        var d = a.eq(0);
        d.find('span[class^="having-num"]').html("" + b), d.find('span[class^="after-num"]').html("" + c), $(".prt-temporary .img-item-small").html("" + b), $(".prt-item-small .having-num").html("" + b), $(".prt-item-small .after-num").html("" + c);
        var e = stage.gGameStatus.temporary.large, c = 0;
        e > 0 && (c = e - 1);
        var f = a.eq(1);
        f.find('span[class^="having-num"]').html("" + e), f.find('span[class^="after-num"]').html("" + c), $(".prt-temporary .img-item-large").html("" + e), $(".prt-item-large .having-num").html("" + e), $(".prt-item-large .after-num").html("" + c), 0 == b && 0 == e ? $(".ico-temporary").addClass("off") : $(".ico-temporary").removeClass("off")
    },mPlayerBannerList: function(b) {
        stage.gGameStatus.chara_select = 2, $(".prt-command").css({"z-index": "999999"}), $(".prt-summon-list>div").addClass("mask-black");
        var c = !1, e = "undefined" == typeof b ? "hp" : b.type;
        if ("hp" === e)
            for (var f = 0; f < stage.pJsnData.formation.length; f++) {
                var g = stage.pJsnData.formation[f];
                1 != stage.pJsnData.player.param[g].alive || stage.pJsnData.player.param[g].hp >= stage.pJsnData.player.param[g].hpmax ? $(".prt-command-top .lis-character" + f).addClass("mask-black") : c = !0
            }
        else if ("condition" === e)
            for (var f = 0; f < stage.pJsnData.formation.length; f++)
                if (0 != stage.gGameStatus.player.param[f].alive)
                    if (null == stage.gGameStatus.player.param[f].condition.debuff || null != stage.gGameStatus.player.param[f].condition.debuff && 0 == stage.gGameStatus.player.param[f].condition.debuff.length)
                        $(".prt-command-top .lis-character" + f).addClass("mask-black");
                    else {
                        var h = !1;
                        a.each(stage.gGameStatus.player.param[f].condition.debuff, function(a) {
                            (null == a.is_unusable_harb || 0 == a.is_unusable_harb) && (c = !0, h = !0)
                        }), 0 == h && $(".prt-command-top .lis-character" + f).addClass("mask-black")
                    }
        c ? $(".txt-select-chara").html(d.getMessage("raid_74")) : $(".txt-select-chara").html(d.getMessage("raid_14"))
    },mSetAbility: function(b, c) {
        var d = c + 1, f = $(".prt-command-chara.chara" + d + " .prt-ability-list"), g = $(".lis-character" + c + " .prt-ability-state");
        if (0 === f.children().length) {
            var h = $("#ability-list").html();
            f.html(a.template(h, {num: d}))
        }
        var i = f.find(".lis-ability"), j = b.list;
        i.each(function(b) {
            var c = $(this), f = b + 1, h = ["ability-character-num", d, f].join("-"), i = ["ability-icon-num", d, f].join("-"), k = j[f], l = g.find(".ability" + f);
            if (null != k || "0" !== l.attr("state")) {
                var m = c.find("." + h), n = c.find(".ico-ability-shine"), o = c.find("." + i);
                if (null == k)
                    a.each(e, function(a) {
                        m.removeAttr(a)
                    }), m.removeClass().addClass("ico-ability").addClass(h), o.removeAttr("value").removeClass().addClass(i), n.removeClass().addClass("ico-ability-shine"), c.removeClass("btn-ability-available btn-ability-unavailable"), l.removeAttr("type").attr({state: "0"});
                else {
                    var p = k[0], q = k[1];
                    if (0 === e.length && (e = a.keys(p)), m.attr(p), o.attr(q), null == p["ability-id"])
                        return;
                    var r = p["ability-recast"], s = p["icon-type"];
                    n.removeClass().addClass("shine" + r).addClass("ico-ability-shine"), 0 == r ? (c.removeClass("btn-ability-unavailable").addClass("btn-ability-available"), l.attr({state: "2",type: s})) : (c.removeClass("btn-ability-available").addClass("btn-ability-unavailable"), l.attr({state: "1",type: s}))
                }
            }
        })
    },mBalloonMessage: function(a, c) {
        a.call(function(a) {
            if (a.serif) {
                if ("player" === a.to)
                    ;
                else if ("boss" === a.to) {
                    var c = "l" === stage.pJsnData.boss.type ? ".prt-boss-area" : ".prt-enemy-area.enemy-" + (a.pos + 1) + ".enemy-" + stage.pJsnData.boss.type;
                    $(c + " .prt-comment").hide();
                    var d = null, c = "l" === stage.pJsnData.boss.type ? ".prt-boss-area" : ".prt-enemy-area.enemy-" + (a.pos + 1) + ".enemy-" + stage.pJsnData.boss.type;
                    d = $(c + " .prt-comment"), d.find(".txt-comment").html(a.serif), d.show().addClass("anim-baloon pos-wait").on("animationend webkitAnimationEnd", function() {
                        $(this).removeClass("anim-baloon pos-wait").hide()
                    })
                }
                a.voice && b.playVoice(a.voice)
            }
        }, [c])
    },mLog: function(a) {
        var b = $(".prt-raid-log");
        b.removeClass("simple"), b.addClass(a["class"]), b.find(".txt-title").html(a.title), b.find(".txt-body").html(a.body), b.show(), setTimeout(function() {
            b.css({display: "none"})
        }, 2e3)
    },mTurn: function(a) {
        for (var b = $(".prt-turn-info .prt-number").children(), c = a.toString(), d = 0; d < c.length; d++)
            b.eq(d).removeClass().addClass("num-turn" + c.substring(d, d + 1)).show();
        $(".prt-turn-info").addClass("anim-on").on("animationend webkitAnimationEnd", function() {
            $(this).removeClass("anim-on")
        })
    },mContribution: function(a, b) {
        a.call(function(a, b) {
            if (b.limit_flag) {
                var c = d.getMessage("raid_75");
                stage.pJsnData.is_defendorder && (c = d.getMessage("raid_do_2"));
                var e = {"class": "log-ability",title: d.getMessage("raid_8"),body: d.replaceMessage("raid_77", [c, c])};
                i.mLog(e)
            } else {
                var f = Math.floor(b.amount), g = $(".prt-contribution");
                g.find(".prt-value").html("+" + f), stage.pJsnData.is_defendorder && !g.hasClass("defend-order") && g.addClass("defend-order"), g.show().one("animationend webkitAnimationEnd", function() {
                    $(this).hide()
                })
            }
        }, [a, b])
    },mBreakGauge: function(a, b, c) {
        a.call(function(a, b, c) {
            i.mBreakGaugeForLog(b, c)
        }, [a, b, c])
    },mBreakGaugeForLog: function(a, b) {
        "undefined" != typeof a.mode && a.mode.changeGauge(b.gauge)
    },mSlideIn: function() {
        $(".prt-slide-mask").addClass("slide-in").show(), $(".cnt-raid-stage").addClass("anim-slide-in").find(".prt-slide-mask").oneAnimationEnd(function() {
            $(".cnt-raid-stage").removeClass("anim-slide-in"), $(".prt-slide-mask").removeClass("slide-in").hide(), $(".prt-start-direction").css("display", "none"), $("#opaque-mask").hide()
        }, 500)
    },mSlideOut: function() {
        $(".prt-slide-mask").removeClass("slide-in").addClass("slide-out").show(), $(".cnt-raid-stage").addClass("anim-slide-out").one("webkitAnimationEnd", function() {
        })
    },mBattleProgress: function(a, b) {
        $("img#img-start-be").attr({src: Game.imgUri + "/sp/raid/be.png"}), $("img#img-start-be").load(function() {
            var c = $(".prt-start-direction .prt-progress");
            c.ready(function() {
                var d = parseInt(a.battle.total), e = parseInt(a.battle.count);
                c.find(".now").addClass("num-battle" + e), c.find(".all").addClass("num-battle" + d);
                for (var f = 1; d >= f; f++)
                    c.find(".prt-position").append("<div class='lis-spot'><div class='icon-spot'></div></div>"), 1 == f ? c.find(".lis-spot").eq(f - 1).addClass("boss") : e > d - f + 1 ? c.find(".lis-spot").eq(f - 1).addClass("clear") : 1 == a.is_rare && e == d - f + 1 ? c.find(".lis-spot").eq(f - 1).addClass("rare") : c.find(".lis-spot").eq(f - 1).addClass("normal");
                var g = 181 / (d - 1), h = 228 - (e - 2) * g;
                $(".prt-start-direction .prt-be").css({left: h + "px"}), c.css({display: "block"}), b(g)
            })
        })
    },mBattleReload: function(a, b) {
        return this.mWindowEffect(a, b)
    },mWindowEffect: function(a, b) {
        var c = new lib[b.kind], d = new createjs.Container, e = c[b.kind][b.kind + "_end"], f = e.timeline.duration;
        return a.call(function() {
            d.addChild(c), stage.gMasterContainer.addChild(d), c[b.kind].gotoAndPlay("end");
            var a = 3e4, g = window.setTimeout(function() {
                stage && stage.gMasterContainer && stage.gMasterContainer.removeChild(d)
            }, f * stage.gGameParam.spf + a), h = createjs.MovieClip.prototype.stop;
            e.stop = function() {
                delete e.stop, window.clearTimeout(g), h.apply(this, arguments), stage.gMasterContainer.removeChild(d)
            }
        }), f
    },mAssistAgain: function() {
        if (stage.pJsnData.is_host) {
            var b = 6e5;
            a.each(stage.pJsnData.assist, function(a) {
                var c = 1e3 * a.remain_time;
                0 != c && b > c && (b = c)
            }), clearTimeout(stage.gGameStatus.timer.assist_again), stage.gGameStatus.timer.assist_again = setTimeout(function() {
                $(".btn-assist").removeClass("disable")
            }, b)
        }
    }};
    return i
});
