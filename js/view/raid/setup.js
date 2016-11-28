define(["jquery", "underscore", "backbone", "model/raid/setup", "lib/raid/draw", "lib/raid/motion", "lib/raid/timeline", "lib/raid/effect", "lib/raid/display", "lib/raid/cutin", "model/cjs-loader", "model/manifest-loader", "lib/shellapp", "lib/sound", "model/sound", "model/raid/condition", "model/socket", "view/popup", "model/token-data", "view/content", "util/navigate", "model/data", "util/local-storage", "flexslider", "util/sprite-sheet-manager", "view/raid/ui", "view/raid/_play_pre_battle", "view/raid/_play_pre_battle_sfv", "util/language-message", "model/chat/semiraid"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D) {
    /*     a          b             c               d                  e                f                 g                  h                     i                  j                  k                    l                      m                n          o                 p                      q            r                 s                 t               u                v                 w                 x                   y                       z              A                                     B                                 C                        D                                                                              
          a : jquery,
          b : underscore,
          c : backbone,
          d : model/raid/setup
          e : lib/raid/draw
          f : lib/raid/motion
          g : lib/raid/timeline
          h : lib/raid/effect
          i : lib/raid/display
          j : lib/raid/cutin
          k : model/cjs-loader
          l : model/manifest-loader
          m : lib/shellapp
          n : lib/sound
          o : model/sound
          p : model/raid/condition
          q : model/socket
          r : view/popup
          s : model/token-data
          t : view/content
          u : util/navigate
          v : model/data
          w : util/local-storage
          x : flexslider
          y : util/sprite-sheet-manager
          z : view/raid/ui
          A : view/raid/_play_pre_battle
          B : view/raid/_play_pre_battle_sfv
          C : util/language-message
          D : model/chat/semiraid
    */
    window.onerror = function(e) {
        console.ll('-----------');
        console.ll('error');
        console.ll(e);
        console.ll('-----------');
    }
    var E,F, G = 5,
    H = 3,
    I = 1,
    J = 12,
    K = Math.round(1e3 / J * 100) / 100,
    L = 30,
    M = 99,
    N = "miss",
    O = "guard", 
    P = "noeffect", 
    Q = "7001", 
    R = ["70670", "70950", "80000"], 
    S = {1: 10, 2: 15, 3: 20}, 
    T = {1: 30}, 
    U = "bgm/100_sfvcollabo_congratulations_loop.mp3", 
    V = [1055, 1056], 
    W = 3, 
    X = 1e4, 
    Y = 3, 
    Z = "se/arcarum_result_se_1.mp3", 
    $ = "se/arcarum_supression_se_1b.mp3", 
    _ = "se/arcarum_supression_se_2.mp3", 
    aa = {712954: {className: "img-riddle-splash", filePath: "quest/riddle/assets/bg/bg_22.jpg"}}, 
    ba = {712954: {getMessageId: "riddle_battle_1"}}, 
    ca = {}, 
    da = 300, 
    ea = 20, 
    fa = 10, 
    ga = Game.imgUri + "/sp/assets/npc/raid_normal/3999999999.jpg", 
    ha = function (a, c, d, e) {
        b.isFunction(d) && (e = d, d = !1), 
        (!ca[a] || Number(ca[a]) < Number(c)) && (d || (ca[a] = c), e && e())
    }, 
    ia = function (a, b, c) {
        return ha("members", a, b, c)
    }, 
    ja = function (a, b, c, d) {
        return ha("member_log_" + a, b, c, d)
    }, 
    ka = function (a, b, c) {
        return ha("mvp", a, b, c)
    }, 
    la = function (a, b, c) {
        return ha("user_param", a, b, c)
    }, 
    ma = function (a, b, c) {
        return ha("user_condition", a, b, c)
    }, 
    na = function (a, b, c) {
        return ha("boss_recast", a, b, c)
    }, 
    oa = function (a, b, c) {
        return ha("boss_param", a, b, c)
    }, 
    pa = function (a, b, c) {
        return ha("summon_update", a, b, c)
    }, 
    qa = function (a, b, c) {
        return ha("battle_status", a, b, c)
    }, 
    ra = function (a, b, c) {
        return ha("bgm", a, b, c)
    }, 
    sa = function (a, b, c) {
        return ha("field_effect", a, b, c)
    };
    !function () {
        var a = {};
        //播放音乐
        E = function (b) {
            if (b) {
                a[b] = !0;
                var c = window.stage;
                c && c.pJsnData && (c.pJsnData.bgm = b), o.playBGM(b)
            }
        }, 
        //播放已有音乐
        F = function (c) {
            b.has(a, c) || E(c)
        }
    }();
    var ta, ua, va;
    !function () {
        var a = {};
        //只被引用一次
        ta = function (b, c) {
            c = 0 | c;
            var d = c - (0 | a[b]);
            return 0 >= d ? 0 : d
        }, ua = function (b, c) {
            c = 0 | c, a[b] = c
        }, va = function () {
            a = {}
        }
    }();
    var wa, xa = function (a) {
        var b = a.lastIndexOf("/");
        return 0 > b ? "" : a.substr(0, b)
    }, ya = function (a) {
        var b = a.lastIndexOf("/");
        return 0 > b ? a : a.substr(b + 1)
    }, za = function (a) {
        var b = a.lastIndexOf(".");
        return 0 > b ? "" : a.substr(b + 1)
    }, Aa = function (a) {
        return{dirname: xa(a), basename: ya(a), extension: za(a)}
    }, Ba = function (a, b) {
        var c = Aa(a), d = c.dirname ? c.dirname + "/" : "", e = c.extension ? "." + c.extension : "";
        return d + b + e
    }, 
    Ca = ["ab_0004", "ab_3000", "ab_all_3020", "ab_start", "raid_win", "quest_clear", "quest_failed", "raid_union_summon", "treasure_get", "item_get", "raid_parts_attack", "raid_parts_back", "raid_parts_turn", "raid_parts_next", "raid_cutin", "raid_cutine", "raid_reload", "raid_chain", "raid_effect_heal", "raid_effect_buff", "raid_effect_debuff", "ab_all_70", "raid_parts_auto", "ab_enemy_action", "ef_all_2000", "ef_2000"], Da = ["usf_win", "usf_lose", "usf_arcade_1", "usf_arcade_2"], Ea = ["usf_bonus", "usf_perfect", "usf_timeover"], Fa = ["sfv_win", "sfv_lose"], Ga = ["raid_appear_round_1", "raid_appear_round_2", "raid_appear_round_final", "raid_appear_ready_fight", "raid_appear_stage_final", "sfv_survival_start", "sfv_congratulations", "sfv_game_over", "sfv_suvival_result"], Ha = ["trialbattle_game_end"], 
    Ia = function () {
        return{
        interval: {
            multilog: 1e4,
            condition: 1500,
            raidstate: 1e3,
            balloon: 2e3,
            chatlog: 1e4,
            watching: 1e3
        },
        cjs: {
            win: "raid_win",
            quest_clear: "quest_clear",
            quest_failed: "quest_failed",
            raid_union_summon: "raid_union_summon",
            parts: ["raid_parts_attack", "raid_parts_back", "raid_parts_turn", "raid_parts_auto", "raid_parts_next"],
            raid_cutin: "raid_cutin",
            raid_cutine: "raid_cutine",
            raid_reload: "raid_reload",
            raid_chain: "raid_chain",
            arcade_quest_clear: "usf_win",
            arcade_quest_failed: "usf_lose",
            bonus_stage_quest_clear: "usf_perfect",
            bonus_stage_quest_failed: "usf_timeover",
            sfv_quest_clear: "sfv_win",
            sfv_quest_failed: "sfv_lose",
            sfv_congratulations: "sfv_congratulations",
            sfv_game_over: "sfv_game_over",
            sfv_suvival_result: "sfv_suvival_result",
            trialbattle_game_end: "trialbattle_game_end"},
            grid: {
                parts: {
                    raid_parts_attack: {x: 350, y: 475},
                    raid_parts_back: {x: 0, y: 487},
                    raid_parts_turn: {x: 113, y: 520},
                    raid_parts_auto: {x: 0, y: 540},
                    raid_parts_next: {x: 640, y: 487}
                },
                player: [
                    {x: 430, y: 360},
                    {x: 540, y: 390},
                    {x: 465, y: 485},
                    {x: 570, y: 525}
                ],
                tutorial: [
                    {x: 465, y: 485},
                    {x: 540, y: 390}
                ],
                s: {
                    s1: [
                        {x: 150, y: 520}
                    ],
                    s2: [
                        {x: 215, y: 440},
                        {x: 105, y: 555}
                    ],
                    s3: [
                        {x: 190, y: 430},
                        {x: 150, y: 625},
                        {x: 70, y: 515}
                    ]
                },
                m: {
                    m1: [
                        {x: 150, y: 550}
                    ],
                    m2: [
                        {x: 240, y: 510},
                        {x: 100, y: 575}
                    ],
                    m3: [
                        {x: 190, y: 430},
                        {x: 150, y: 625},
                        {x: 70, y: 515}
                    ]
                },
                l: {
                    l1: [
                        {x: 110, y: 660}
                    ],
                    l2: [
                        {x: 110, y: 660},
                        {x: 110, y: 660}
                    ],
                    l3: [
                        {x: 110, y: 660},
                        {x: 110, y: 660},
                        {x: 110, y: 660}
                    ]
                },
                hit: {
                    player: {x: 0, y: 0},
                    boss: {
                        s: {x: 0, y: 0},
                        m: {x: -20, y: -40},
                        l: {x: 80, y: -120}
                    }
                },
                effect: {
                        player: {x: 0, y: 0},
                    boss: {
                        s: {x: 0, y: 0},
                        m: {x: -20, y: -40},
                        l: {x: 80, y: -120}
                    }
                },
                message: {
                        player: {x: 80, y: -170},
                        boss: {
                            s: {x: -60, y: -230},
                            m: {x: -60, y: -230}, l: {x: -75, y: -370}
                        }
                },
                damage_position_plus: {
                        boss: {
                            s: {x: 0, y: 0},
                            m: {x: 0, y: 0},
                            l: {x: 0, y: 0}
                        }
                }
            },
            relative: {
                offscreen: {player: 350},
                summon: {x: 0, y: 0},
                summon_simple: {x: 360, y: 200},
                summon_union: {x: 0},
                raid_cutin: {x: 0},
                raid_cutine: {x: 0},
                win: {x: 0, y: -70},
                lose: {x: 0, y: -70},
                turnbar: {x: 70},
                treasure: {
                    s: {x: 30, y: -70},
                    m: {x: 60, y: -70},
                    l: {x: 120, y: -120}
                },
                item: {
                    s: {x: 30, y: -70},
                    m: {x: 60, y: -70},
                    l: {x: 120, y: -120}
                }
            },
            timing: {
                0: 0,
                1: 3,
                2: 6,
                3: 9,
                4: 12,
                5: 15
            },
            key_enemy: {
                mode_1: 1,
                mode_2: 2,
                mode_3: 3
            }
        }
    }, Ja = function () {
        return{lock: 0, target: 0, attacking: 0, replacehit: [], waitmode: ["wait", "wait", "wait"], balloon: "wait", finish: !1, retire: !1, lose: !1, clear: !1, motion: !1, menu: !1, attack_action: null, last_drop: null, raid_union_summon_name: "", is_summon_simple: "", message_count: 0, tutorial_state: !1, rep: 0, btn_lock: !1, defaultmotion: "stbwait", dropped: [], attack_count: 0, $use_ability: null, already_finish: !1, node_finish: !1, cheer_compleate: !1, is_clear: !1, serif: 1, ability_popup: 1, ability_pick: null, ability_sub_param: [], pop_limit: !1, pop_revival: !1, battle_end: !1, is_normal_attack: !1, auto_attack: !1, enable_auto_button: !1, auto_button: !0, chat_category: 1, stamp_page: 0, key_enemy_dead: !1, union_enemy: !1, player: {param: [], condition: [], number: 0, all_dead: !1}, boss: {param: [], condition: [], last_die: null, all_dead: !1, form_change_tween: !1}, field: {hasFieldEffect: !1}, defend_order: {hasAssistUnitEffect: !1}, timer: {}, action: {ab_select: ""}, assist: {all: 1, friend: 1, guild: 1}, temporary: {small: 0, large: 0}, potion: {count: 0, limit_flg: !1, limit_number: 0, limit_remain: 0}, command_slide: {state: 0, now_pos: 0}, bossmode: {looks: {mode: [], gauge: []}, already_changed: []}, finishAfterContribution: !1, is_escorted_character_dead: 0, isVersusView: !1, isShowBossGauge: !0, logtimer: 0, motion_lock: !1, shouldReAuth: !1, remain_turn: 0, hide_ability_pos: void 0, isDrawBgImgByCjs: !1, backImage: [], backImageValue: [], isBackImageUpdated: !1, preemptiveDeferred: null, cutinDeferred: null, attackQueue: {index: [], param: [], $useAbility: [], $useAbilityTmp: null, attackButtonPushed: !1, abilityRailUI: null, charaChangeFlag: !1}, form_change_frame: {}}
    }, Ka = {s: {s1: [
        {x: 220, y: 110}
    ], s2: [
        {x: 70, y: 110},
        {x: 350, y: 110}
    ], s3: [
        {x: 10, y: 110},
        {x: 430, y: 110},
        {x: 220, y: 110}
    ]}, m: {m1: [
        {x: 220, y: 110}
    ], m2: [
        {x: 70, y: 110},
        {x: 350, y: 110}
    ], m3: [
        {x: 10, y: 110},
        {x: 430, y: 110},
        {x: 220, y: 110}
    ]}, l: {l1: [
        {x: 75, y: 86}
    ], l2: [
        {x: 70, y: 110},
        {x: 350, y: 110}
    ], l3: [
        {x: 10, y: 110},
        {x: 430, y: 110},
        {x: 220, y: 110}
    ]}}, La = {s: {s1: [
        {x: 180, y: 400}
    ], s2: [
        {x: 245, y: 320},
        {x: 135, y: 435}
    ], s3: [
        {x: 220, y: 309},
        {x: 180, y: 504},
        {x: 99, y: 395}
    ]}, m: {m1: [
        {x: 149, y: 389}
    ], m2: [
        {x: 240, y: 350},
        {x: 100, y: 414}
    ], m3: [
        {x: 220, y: 309},
        {x: 180, y: 504},
        {x: 99, y: 395}
    ]}, l: {l1: [
        {x: 159, y: 359}
    ], l2: [
        {x: 245, y: 320},
        {x: 135, y: 435}
    ], l3: [
        {x: 220, y: 309},
        {x: 180, y: 504},
        {x: 99, y: 395}
    ]}}, 
    Ma = "xhrStart", 
    Na = "xhrEnd", 
    Oa = t.extend({
        el: a(".contents"), 
        stage: null, 
        baseFps: 12, 
        currentFps: 12, 
        attackCount: 20, 
        use_ap: null, 
        popScrollHeightDelta: 0, 
        initialize: function (c) {
            console.l(c,'param is');
        this.content_bind(), this.trigger(Ma);
        var e = this, f = new d, g = c;
        this.assist_flg = !1, 
        this.preemptiveDeferred = new a.Deferred, 
        this.cutinDeferred = new a.Deferred, 
        a("#opaque-mask").show();
        console.l(f.urlRoot(c.action, c.mode, c.is_multi, c.is_semi),'preSave url');
 
        f.preSave(false, g, {url: f.urlRoot(c.action, c.mode, c.is_multi, c.is_semi), silent: !0, error: function (e) {

        }, success: function () {
            console.info('get raid info complate');
            e.trigger(Na), i.reqStartTime = parseInt(new Date / 1e3);
            var d = f.toJSON();

            if (e.use_ap = d.use_ap, e.pJsnData = d, d.base_fps > 0) {
                b.isUndefined(c.speed) ? (12 == d.base_fps && (d.base_fps = 18), e.currentFps = d.base_fps) : 2 == c.speed ? e.currentFps = 1.5 * e.baseFps : e.currentFps = 2 * e.baseFps;
                var g = e.currentFps > 24 ? 24 : e.currentFps < 12 ? 12 : e.currentFps;
                a(".btn-change-speed").attr({fps: g})
            }
            for (var h = !1, j = 0, k = d.boss.param.length; k > j; ++j)if (1 == d.boss.param[j].alive) {
                h = !0;
                break
            }
            if (1 != d.multi && !h) {
                if (!d.is_dungeon || !d.dungeon.dungeon_item)return void u.hash("#quest", {refresh: !0});
                e.dungeonItems = d.dungeon.dungeon_item;
                var l = new r({className: "pop-dungeon-item", title: C.getMessage("raid_2"), body: b.template(a("#tpl-dungeon-item").html(), {name: d.dungeon.drop_enemy, items: d.dungeon.dungeon_item}), flagBtnCancel: 0, flagBtnOk: 0});
                l.render(), l.popShow(!0, 50)
            }
            var m = new a.Deferred;
            a.when(m).done(function () {
                e.render(c)
            }), !d.bgm || d.is_arcade || d.is_survival || o.playBGM(d.bgm), d.is_dungeon && (window.dungeonTransition = !0);
            var n = b.some(R, function (a) {
                return a == d.location_id
            });
            Game.chatView && Game.chatView.on("commentSaved", function (a) {
                a.channel === Game.chatView.CHANNEL_RAID && e.notifyFirstChat()
            });
            var p = new a.Deferred;
            e.prepareLoading(d, n, function () {
                console.l('prepareLoading compelte');

                p.resolve()
            }), 1 == d.invite_enable && e.activateMask();
            var q = new a.Deferred, s = new a.Deferred;
            a.when(p).done(function () {
                var b = new a.Deferred;
                e.loadCJS(d, n, function () {
                    q.resolve(), b.resolve(), a.when(b).done(function () {
                        e.loadSpriteSheet(function () {
                            s.resolve()
                        })
                    })
                })
            });
            var t = new a.Deferred;
            a.when(q, s).done(function () {
                if (1 >= d.battle.total || d.is_dungeon === !0)t.resolve(); else if (d.is_arcade)a(".prt-start-direction").css("display", "none"), a("#opaque-mask").css("display", "none"), t.resolve(); else {
                    var b = 181 / (d.battle.total - 1);
                    a(".prt-start-direction .prt-be").css({"-webkit-transform": "translate3d(-" + b + "px, 0, 0)", transform: "translate3d(-" + b + "px, 0, 0)"}).oneTransitionEnd(function () {
                        a(".prt-start-direction").off("transitionend webkitTransitionEnd"), a(".prt-black-bg").css("display", "none"), i.mSlideIn(), t.resolve(), a("body").hasClass("android2") && setTimeout(function () {
                            a(".cnt-raid-stage").removeClass("anim-slide-in"), a(".prt-slide-mask").removeClass("slide-in").hide(), a(".prt-start-direction").css("display", "none"), a("#opaque-mask").hide()
                        }, 400)
                    }, 600)
                }
            }), a.when(t).done(function () {
                var f = document.getElementById("canvas");
                if (null !== f) {
                    if (f.setAttribute("cjs-noclip", "1"), window.CreateJsShell ? 1 == Game.setting.cjs_mode && f.setAttribute("cjs-context", "shell") : 1 == Game.setting.cjs_mode && (Game.ua.isChromeApp() || Game.ua.isPcPlatform()) && 0 == navigator.platform.indexOf("Win") && f.setAttribute("cjs-context", "2d"), stage = new createjs.Stage(f), window.CreateJsShell && 1 == Game.setting.cjs_mode) {
                        var g = f.getAttribute("dena-context");
                        if ("shell" == g) {
                            for (var h = f.parentElement; h; h = h.parentElement)h.style.backgroundColor = "transparent";
                            a(".prt-bg-effect-brightness, .prt-bg-effect-color").css("display", "none")
                        }
                    }

                    if (stage.clear(), createjs.denaVersion)createjs.Ticker.setFPS(e.currentFps), createjs.Ticker.addEventListener("tick", stage); else {
                        if (a("body").hasClass("android4")) {
                            var i = f.getContext("2d");
                            stage.funcUpdate = function () {
                                i.clearRect(0, 0, 640, 654), stage.Stage_originalUpdate()
                            }
                        } else stage.funcUpdate = function () {
                            stage.Stage_originalUpdate()
                        };
                        console.info('ticker listen stage')
                        createjs.Ticker.setFPS(e.currentFps), createjs.Ticker.addEventListener("tick", stage)
                    }
                    stage.pJsnData = d, stage.gMasterContainer = new createjs.Container, stage.gPlayerContainer = new createjs.Container, stage.gBossContainer = new createjs.Container, stage.gPartsContainer = new createjs.Container, stage.gAryRootAvatar = [], stage.gAryCntnAvatar = [], stage.gAryRootBoss = [], stage.gAryCntnBoss = [], stage.gAryRootParts = [], stage.gAryCntnParts = [], stage.gAryInterval = [], stage.setup = e, stage.gGameParam = b.defaults({fps: e.currentFps, spf: Math.round(1e3 / e.currentFps * 100) / 100}, Ia()), stage.gGameStatus = b.defaults({turn: d.turn, reload_flg: c.reload_flg || !1}, Ja()), stage.gGameStatus.isVersusView = n, stage.gGameStatus.isVersusView ? R[0] == d.location_id ? d.arcade && d.arcade.is_bonus ? (stage.gGameParam.cjs.win = stage.gGameParam.cjs.quest_clear = stage.gGameParam.cjs.bonus_stage_quest_clear, stage.gGameParam.cjs.quest_failed = stage.gGameParam.cjs.bonus_stage_quest_failed, stage.gGameStatus.remain_turn = +d.arcade.bonus_maxtrun - +d.turn + 1) : (stage.gGameParam.cjs.win = stage.gGameParam.cjs.quest_clear = stage.gGameParam.cjs.arcade_quest_clear, stage.gGameParam.cjs.quest_failed = stage.gGameParam.cjs.arcade_quest_failed) : d.is_survival ? (stage.gGameParam.cjs.win = stage.gGameParam.cjs.quest_clear = stage.gGameParam.cjs.sfv_congratulations, stage.gGameParam.cjs.quest_failed = stage.gGameParam.cjs.sfv_game_over) : (stage.gGameParam.cjs.win = stage.gGameParam.cjs.quest_clear = stage.gGameParam.cjs.sfv_quest_clear, stage.gGameParam.cjs.quest_failed = stage.gGameParam.cjs.sfv_quest_failed) : d.is_trialbattle && (stage.gGameParam.cjs.quest_failed = stage.gGameParam.cjs.trialbattle_game_end), stage.gGameStatus.summon_speed = d.summon_speed;
                    var j = stage.gGameParam, k = stage.gGameStatus;
                    b.each(d.boss.param, function (a, c) {
                        k.bossmode.looks.mode[c] = a.modechange, k.bossmode.looks.gauge[c] = a.modegauge, k.bossmode.already_changed[c] = !1, (b.isUndefined(a.message_position) || "" === a.message_position.x) && (stage.pJsnData.boss.param[c].message_position = {x: j.grid.message.boss[d.boss.type].x, y: j.grid.message.boss[d.boss.type].y}), stage.pJsnData.boss.param[c].damage_position_plus ? ("" === stage.pJsnData.boss.param[c].damage_position_plus.x && (stage.pJsnData.boss.param[c].damage_position_plus.x = j.grid.damage_position_plus.boss[d.boss.type].x), "" === stage.pJsnData.boss.param[c].damage_position_plus.y && (stage.pJsnData.boss.param[c].damage_position_plus.y = j.grid.damage_position_plus.boss[d.boss.type].y)) : stage.pJsnData.boss.param[c].damage_position_plus = {x: j.grid.damage_position_plus.boss[d.boss.type].x, y: j.grid.damage_position_plus.boss[d.boss.type].y}
                    }), k.lock = b.isUndefined(d.special_skill_flag) ? 0 : parseInt(d.special_skill_flag),
                        a(".btn-lock").addClass("lock" + k.lock),
                        k.shouldReAuth = d.is_semi && d.event_id_of_semi == Q,
                        stage.pJsnData.tutorial_flag && (j.grid.player[0].x = j.grid.tutorial[0].x, j.grid.player[0].y = j.grid.tutorial[0].y, j.grid.player[1].x = j.grid.tutorial[1].x, j.grid.player[1].y = j.grid.tutorial[1].y);
                    var l = a.extend(!0, {}, stage.pJsnData);
                    stage.pJsnData.player.number = stage.pJsnData.player.number || stage.pJsnData.player.param.length, k.player.number = stage.pJsnData.player.number - 1 <= 3 ? stage.pJsnData.player.number - 1 : 3;
                    for (var o = 0, p = k.player.number; p >= o; ++o)k.player.param.push(l.player.param[l.formation[o]]);
                    k.is_escorted_character_dead = d.is_escorted_character_dead, e.checkPlayerAllDead(), a('[class^="lis-character"]').children("img").attr("src", ga);
                    for (var o = 0, p = stage.pJsnData.boss.param.length; p > o; ++o)k.boss.param.push(l.boss.param[o]);
                    if (stage.pJsnData.battle.count > 1)for (var o = 0, p = j.grid.player.length; p > o; ++o)j.grid.player[o].x += j.relative.offscreen.player;
                    if (k.defaultmotion = 1 == stage.pJsnData.battle.count && 1 == k.turn ? "wait" : "stbwait", "l" === d.boss.type && d.boss.param.length >= 2 && (k.union_enemy = !0), window.CreateJsShell && 1 == Game.setting.cjs_mode) {
                        var f = document.getElementById("canvas");
                        if (f) {
                            var g = f.getAttribute("dena-context");
                            "shell" == g && (k.isDrawBgImgByCjs = !0)
                        }
                    }
                    if (stage.gGameStatus.preemptiveDeferred = new a.Deferred, stage.gGameStatus.cutinDeferred = new a.Deferred, stage.gGameStatus.backImage.push(new createjs.Bitmap(Game.imgUri + stage.pJsnData.background)), b.each(stage.pJsnData.background_image_object, function (a, b) {
                        stage.gGameStatus.isBackImageUpdated = !0, stage.gGameStatus.backImage.push(new createjs.Bitmap(Game.imgUri + a)), stage.gGameStatus.backImageValue.push(b)
                    }), k.isDrawBgImgByCjs === !0 ? stage.addChild(stage.gGameStatus.backImage[0]) : a(".prt-bg-stage-distant").css("background-image", "url(" + Game.imgUri + stage.pJsnData.background + ")"), e.TutorialPreRender(), e.rareEnemyAppearEffectDeferred = new a.Deferred, 1 == stage.pJsnData.battle.count && stage.pJsnData.is_rare ? setTimeout(function () {
                        a(".prt-start-direction").css("display", "none"), a("#opaque-mask").hide(), a(".prt-rare-direction").show().addClass("anim-rare-direction").oneAnimationEnd(function () {
                            a(this).hide(), e.rareEnemyAppearEffectDeferred.resolve()
                        }, 1600)
                    }, 1500) : e.rareEnemyAppearEffectDeferred.resolve(), 1 === d.battle.total || d.is_dungeon === !0) {
                        if (1 === +d.battle.count && b.has(aa, d.quest_id)) {
                            var q = a("#prt-image-over-stage");
                            q.html(b.template(a("#tpl-img-assign").html(), aa[d.quest_id])), q.addClass("show"), q.one("tap", function () {
                                q.addClass("fadeout").oneTransitionEnd(function () {
                                    q.removeClass("show fadeout")
                                }, 600)
                            })
                        }
                        setTimeout(function () {
                            a(".prt-start-direction").css("display", "none"), a("#opaque-mask").hide()
                        }, 1500)
                    }
                    1 == d.multi && d.is_semi === !1 && (k.auto_button = !1), wa = stage.gEnemyStatus = [];
                    var r = d.boss.type + d.boss.number, s = Ka[d.boss.type][r], t = (La[d.boss.type][r], d.overdrive_image), u = d.is_semi;
                    b.each(d.boss.param, function (a, c) {
                        var f, g = a.cjs.split("_")[1];
                        a.enemy_id = g, a.overdrive_image = t, a.is_semi = u, a.switching_hp_gauge = d.switching_hp_gauge || !1, a.condition = b.defaults(a.condition, {debuff: [], buff: []}), k.union_enemy && (a.type = "s"), f = wa[c] = new z.components.EnemyStatus(e.spriteSheetManager.getById("raid_ui_0"), a, c, e.pJsnData.disp_hp_percent_disp), f.x = s[c].x, f.y = s[c].y, "l" === a.type ? e.$el.find(".prt-percent[target=" + (c + 1) + "]").addClass("enemy-size-l") : 0 !== parseInt(a.modeflag, 10) && e.$el.find(".prt-percent[target=" + (c + 1) + "]").addClass("has-mode-gauge")
                    }), e.createFieldConditionComponent(d.boss.param.length), d.is_defendorder && e.createAssistUnitConditionComponent(), u && (e.chatSemiraidModel = new D), m.resolve()
                }
            })
        }})
    }, prepareLoading: function (c, d, e) {
            console.ll('prepareLoading');

        if (o.loadSE("se/treasure_se_6.mp3"), c.is_survival ? (this.$el.find(".cnt-raid-header .prt-battle-num .txt-battle").addClass("stage"), this.$el.find(".prt-start-direction .prt-battle-num .txt-battle").addClass("stage")) : d && (this.$el.find(".cnt-raid-header .prt-battle-num .txt-battle").addClass("round"), this.$el.find(".prt-start-direction .prt-battle-num .txt-battle").addClass("round")), c.is_survival && "undefined" != typeof c.survival && c.survival.is_score_buff)o.playBGM(c.bgm), this.popBattleService(c); else if (c.is_survival && "undefined" != typeof c.survival && 1 == c.survival.stage_number) {
            var f = {cjsName: "sfv_survival_start", fpsNum: 18, canvasElem: "canvas-pre-battle", canvasWidth: 640, canvasHeight: 920};
            c.survival.playerCjsId = c.player.param[0].cjs, B.setParams(f, c.survival);
            var g = a("#" + f.canvasElem);
            g.addClass("sfv"), g.one("endPreBattleCjs", function () {
                a(this).off(), o.playBGM(c.bgm), e()
            })
        } else if (c.is_survival)o.playBGM(c.bgm), e(); else if (c.is_arcade && c.arcade.arcade_skip)o.playBGM(c.bgm), e(); else if (c.is_arcade) {
            var f = {cjsName: "", fpsNum: 24, canvasElem: "canvas-pre-battle", canvasWidth: 640, canvasHeight: 960, isBonus: c.arcade.is_bonus}, h = c.player.param[0].cjs;
            if (c.arcade.is_bonus) {
                f.cjsName = "usf_bonus";
                var j = {grp_me_0_01: 1, kun_me_0_01: 2, ogr_me_0_01: 3, nnj_me_0_01: 4, nnj_kt_0_01: 4, stf_me_0_01: 5, grp_me_1_01: 6, kun_me_1_01: 7, ogr_me_1_01: 8, nnj_me_1_01: 9, nnj_kt_1_01: 9, stf_me_1_01: 10}[h];
                j || (j = ""), window.cjs_usf_bounus_mainchara = j
            } else {
                var k = "usf_arcade_1";
                1 < +c.arcade.stage_number && (k = "usf_arcade_2"), f.cjsName = k, c.arcade.special_skill = c.player.param[0].special_skill, c.arcade.playerCjsId = h
            }
            A.setParams(f, c.arcade), a("#" + f.canvasElem).one("endPreBattleCjs", function () {
                a(this).off(), o.playBGM(c.bgm), e()
            })
        } else if (c.is_dungeon === !0 || c.is_arcarum && !c.is_multi)if (7 == c.arcarum.battle_status) {
            this.arcarum_continue_data = {accumulate: c.arcarum.battle_count, ability_or_summon: c.ability_or_summon || !1, raid_id: c.raid_id};
            var l = {current_tp: {total: c.arcarum.tp || 0}, battleCount: c.arcarum.battle_count - 1}, m = new r({className: "pop-arcarum-continue", title: C.getMessage("arcarum_10"), body: b.template(a("#tpl-arcarum-confirm-continue").html(), l), flagBtnCancel: 1, flagBtnOk: 1});
            m.render(), this.$el.find(".pop-arcarum-continue .btn-usual-ok").addClass("reload"), l.current_tp.total <= 0 && this.$el.find(".pop-arcarum-continue .btn-usual-ok").addClass("disable"), m.popShow(), this.popView = m
        } else {
            var n = c.battle.count.split(""), p = "";
            b.each(n, function (a) {
                p += '<div class="num-battle' + a + '"></div>'
            }), a(".prt-start-direction").append('<div class="prt-battle-count"><div class="battle"></div>' + p + "</div>"), o.playSE("se/ready_se_1.mp3"), e()
        } else 1 !== c.battle.total ? (!b.isUndefined(c.move_background) && c.move_background && a(".prt-progress-bg").children("img").attr("src", Game.imgUri + c.move_background), i.mBattleProgress(c, function () {
            e()
        })) : (a(".prt-start-direction").append('<div class="prt-ready"></div>'), o.playBattleReadySE(), e())
    }, loadCJS: function (a, c, d) {
        var e = [].concat(Ca);

            if(c){
                if(R[0] == a.location_id){
                    if( a.arcade && a.arcade.is_bonus){
                        e = b.union(e, Ea)
                    } else{
                        e =  b.union(e, Da)
                    }
                }else if (a.is_survival){
                    e = b.union(e, Ga);
                } else {
                    e =  b.union(e, Fa)
                }
            }else if(a.is_trialbattle) {
                e = b.union(e, Ha)
            }
            b.each(a.player.param, function (a) {
            e.push(a.cjs), e.push(a.effect)
        }), b.each(a.boss.param, function (a) {
            e.push(a.cjs), e.push(a.effect)
        }), b.isUndefined(a.is_boss) || "" == a.is_boss || e.push(a.is_boss), k.once("complete", function () {
            var c = b.flatten(b.map(e, function (a) {
                return k.manifest(a)
            }));
            b.each(a.weapon, function (a, d) {
                var e = b.find(c, function (a) {
                    return a.id == d
                }), f = Game.imgUri + "/sp/cjs/" + a + ".png";
                e ? e.src = f : c.push({id: d, src: f})
            }), l.once("complete", function () {
                d()
            }), l.loadManifest(c, !0)
        }), k.loadFiles(e)
    }, loadSpriteSheet: function (a) {
        var b = Game.version ? "?version=" + Game.version : "";
        this.spriteSheetManager = new y([
            {id: "raid_ui_0", src: z.utils.getImagePath() + "atlas/raid_ui_0.json" + b}
        ]), this.spriteSheetManager.addEventListener("complete", function () {
            a()
        }), this.spriteSheetManager.load()
    },
        render: function (c) {
 
        var j = this, k = stage.gGameParam, l = stage.gGameStatus, m = stage.pJsnData, n = stage.gPlayerContainer;
        stage.gAryRootAvatar = e.mAdd(l.player.param), stage.gAryCntnAvatar = e.mSet(m.player, stage.gAryRootAvatar, k, n), 1 == m.tutorial_flag && stage.gAryRootAvatar.length >= 2 && n.swapChildrenAt(1, 0);
            e.mShow(stage.gAryCntnAvatar, l.player.param);

            stage.gMasterContainer.addChild(n), stage.gAryRootBoss = e.mAdd(l.boss.param),

                stage.gAryCntnBoss = e.mSet(m.boss, stage.gAryRootBoss, k, stage.gBossContainer),
                console.info(stage.gAryCntnBoss[0]),
                stage.gBossContainer.swapChildrenAt(2, 1), stage.gMasterContainer.addChild(stage.gBossContainer), stage.addChild(stage.gMasterContainer), stage.gMasterContainer.setChildIndex(stage.gBossContainer, 0), stage.gMasterContainer.setChildIndex(n, 1);
        var o = this;
        b.each(wa, function (a, b) {
            stage.addChild(a)
        }), b.each(k.cjs.parts, function (a) {
            stage.gAryRootParts.push(new lib[a])
        });

        for (var p = stage.gAryRootParts, q = stage.gAryCntnParts, r = k.grid, s = 0, t = p.length; t > s; s++)q[s] = new createjs.Container, q[s].addChild(p[s]), stage.gPartsContainer.addChild(q[s]), q[s].x = r.parts[k.cjs.parts[s]].x, q[s].y = r.parts[k.cjs.parts[s]].y, q[s].visible = !1;
        stage.addChild(stage.gPartsContainer);
        for (var u = stage.gAryCntnAvatar.length, v = stage.gAryCntnBoss.length, x = g.mInit("avatar"), s = 0, t = u; t > s; s++)x.timeline[s] = createjs.Tween.get(stage.gAryCntnAvatar[s], {override: !0, paused: !0});
        for (var y = g.mInit("boss"), s = 0, t = v; t > s; s++)y.timeline[s] = createjs.Tween.get(stage.gAryCntnBoss[s], {override: !0, paused: !0});

            var z = g.mInit("common");

        z.timeline[0] = createjs.Tween.get({}, {override: !0, paused: !0}), j.oTweenCommon = z, f.mWaitAll([x, y, z], {playtime: 1}), z.timeline[0].call(function () {
            console.info(-9999);
            for (var a = 0, b = u; b > a; a++)stage.gAryCntnAvatar[a].x -= 9999
        }), f.mWaitAll([x, y, z], {playtime: 1}), z.timeline[0].call(function () {
            console.info(9999);
            for (var a = 0, b = u; b > a; a++)stage.gAryCntnAvatar[a].x += 9999
        });
        var A = [];
        b.isUndefined(m.is_boss) || "" == m.is_boss || z.timeline[0].call(function () {
            j.activateMask()
        });
        var B = b.isUndefined(m.player.init_motion) ? l.defaultmotion : m.player.init_motion;
        f.mChangeMotionAll(stage.gAryRootAvatar, x.timeline, {motion: "hide", mc: l.player.param, type: "player"}), z.timeline[0].call(function () {
            j.renewCharaList(28)
        }), a(".prt-enemy-gauge").hide();

        for (var s = 0, t = u; t > s; s++)i.mPlayerGaugeHp(x.timeline[s], {pos: s, param: l.player.param[s]}), i.mPlayerGaugeRecast(x.timeline[s], {pos: s, param: l.player.param[s]}), i.mPlayerGaugeAttr(x.timeline[s], {pos: s, param: l.player.param[s]});
        for (var s = 0, t = v; t > s; s++)i.mBossGaugeHp(y.timeline[s], wa, m.boss.type, {pos: s, param: l.boss.param[s]}), i.mBossGaugeRecast(y.timeline[s], wa, m.boss.type, {pos: s, param: l.boss.param[s]}), i.mBossGaugeName(y.timeline[s], m.boss.type, {pos: s, param: l.boss.param[s]});
        if (a(".prt-command-summon .prt-list-top").addClass("summon-off"), m.summon)for (var D = m.summon, s = 0, t = D.length; t > s; s++) {
            var E = a(".prt-command-summon .prt-summon-list .lis-summon").eq(s);
            E.addClass("off"), D[s].id ? (E.children("img").attr("src", Game.imgUri + "/sp/assets/summon/raid_normal/" + D[s].id + ".jpg"), E.attr("summon-id", s + 1), E.attr("summon-name", D[s].name), E.attr("summon-skill-name", D[s].skill), E.attr("summon-comment", D[s].comment), E.attr("summon-recast", D[s].recast), E.attr("summon-require", D[s].require), E.attr("summon-code", D[s].id), E.attr("summon-protection-name", D[s].protection_name || C.getMessage("raid_3")), E.attr("summon-protection", D[s].protection || ""), E.attr("summon-quality", D[s].quality || 0), E.attr("summon-evolution-flag", D[s].evolution_flag), E.attr("summon-evolution", D[s].evolution), E.append('<div class="ico-summon-recast txt-recast"><span class="num-recast-s' + D[s].recast + '"></span></div>')) : E.children("img").attr("src", Game.imgUri + "/sp/assets/summon/raid_normal/empty.jpg")
        }
        if (m.supporter) {
            var F = m.supporter, G = a(".prt-command-summon .lis-summon:last");
            G.addClass("off"), F.id ? G.children("img").attr("src", Game.imgUri + "/sp/assets/summon/raid_normal/" + F.id + ".jpg") : G.children("img").attr("src", Game.imgUri + "/sp/assets/summon/raid_normal/empty.jpg"), G.attr("summon-id", "supporter"), G.attr("summon-name", F.name), G.attr("summon-skill-name", F.skill), G.attr("summon-comment", F.comment), G.attr("summon-recast", F.recast), G.attr("summon-require", F.require), G.attr("summon-code", F.id), G.attr("summon-protection-name", F.protection_name || C.getMessage("raid_3")), G.attr("summon-protection", F.protection || ""), G.attr("summon-quality", F.quality || 0), G.attr("summon-evolution-flag", F.evolution_flag), G.attr("summon-evolution", F.evolution), G.append('<div class="ico-summon-recast txt-recast"><span class="num-recast-s' + F.recast + '"></span></div>')
        }
        m.ability && b.each(m.ability, function (a) {
            var c = b.indexOf(m.formation, "" + a.pos);
            i.mSetAbility(a, c)
        }), z.timeline[0].call(function () {
            b.each(l.player.param, function (a, b) {
                1 == l.player.param[b].alive && i.mConditionPlayer(a.condition, b)
            }), i.mConditionBoss(wa)
        }), stage.addChild(stage.gFieldCondition);
        var H = m.field_effect || [];
        if (b.isEmpty(H) || i.mConditionField(H), m.is_defendorder) {
            stage.addChild(stage.gAssistUnitCondition);
            var I = m.effect_unit || [];
            b.isEmpty(I) || i.mConditionAssistUnit(I)
        }
        if (f.mWaitAll([x, y, z], {playtime: 3}), 1 == m.battle.count){
            f.mChangeMotionAll(stage.gAryRootAvatar, x.timeline, {motion: 'stbwait', mc: l.player.param, type: "player", is_alive: "on", wait: 10});
        } else {
            console.info('else timelien');
            for (var s = 0, t = u; t > s; s++)
                //f.mChangeMotion(x.timeline[s], {motion: "setup", pos: s, type: "player", is_alive: "on"}),
                //f.mMoveTo(stage.gAryCntnAvatar, x, {index: s, x: -k.relative.offscreen.player, playtime: 6, ease: "quartOut"}, {tween: [y, z], adjust: -5, wait: 8}),
                f.mChangeMotion(x.timeline[s], {motion: "stbwait", pos: s, type: "player", is_alive: "on"});
            f.mWaitAll([x, y, z], {playtime: 10});
            for (var s = 0, t = r.player.length; t > s; s++)r.player[s].x -= k.relative.offscreen.player
        }
        for (var s = 0, t = m.boss.param.length; t > s; s++)1 != m.boss.param[s].alive && (stage.gAryCntnBoss[s].visible = !1, wa[s].isAlive = !1, m.key_enemy_mode !== k.key_enemy.mode_3 && (stage.gAryRootBoss[s].visible = !1));
        for (var s = 0, t = l.boss.param.length; t > s; s++)1 != l.boss.param[s].alive && void 0 !== l.boss.param[s].dropped && l.boss.param[s].dropped.length >= 1 && (stage.gAryCntnBoss[s].visible = !0, h.mGetTreasure(y.timeline[s], stage.gAryCntnBoss[s], l.boss.param[s].dropped, !0), f.mWaitAll([x, y, z], {playtime: 2}));
        b.isUndefined(m.treasure) || (a(".prt-treasure-wrapper .lis-treasure.type1 .txt-get-value").html("" + m.treasure.treasure_type_1), a(".prt-treasure-wrapper .lis-treasure.type2 .txt-get-value").html("" + m.treasure.treasure_type_2), a(".prt-treasure-wrapper .lis-treasure.type3 .txt-get-value").html("" + m.treasure.treasure_type_3));
        for (var s = 0, t = stage.gAryRootBoss.length; t > s; s++)stage.gAryRootBoss[s][l.boss.param[s].cjs].gotoAndStop(0);
        z.timeline[0].call(function () {
            i.mBossSetup(z.timeline[0], l.boss.param, {size: m.boss.type, force: !0})
        }), b.isUndefined(m.potion) || (l.potion = m.potion), b.isUndefined(m.temporary) || (l.temporary = m.temporary), i.mUpdateTemporaryItem(), b.isUndefined(m.event) ? b.isUndefined(m.defendorder) || (l.event_item_flg = !1, stage.pJsnData.event = {event_type: 3}, stage.gGameStatus.event = {event_type: 3, item: m.defendorder.defendorder_temporary, isDefendOrder: !0}) : (l.event = m.event, l.event_item_flg = !1), l.stone = m.stone, l.shopLowestPrice = m.shop_lowest_price, l.shopPotionId = m.shop_potion_id, l.dispHpPercent = stage.pJsnData.disp_hp_percent_disp, l.abilityRailUse = stage.pJsnData.ability_rail_use;
        var J = this.$el.find(".prt-ability-rail-overlayer");
        2 !== l.abilityRailUse || J.hasClass("small") || J.addClass("small"), l.abilityRailDisp = stage.pJsnData.ability_rail_disp;
        for (var K = !1, s = 0, t = m.player.param.length; t > s; s++)if (0 != m.player.param[s].alive) {
            K = !0;
            break
        }
        if (K || z.timeline[0].call(function () {
            l.clear = !1, l.finish = !0;
            var a = !1;
            l.reload_flg && null != w.get("popCheer_cancel") && null == w.get("cheer_pop_flg") ? "true" == w.get("popCheer_cancel") ? a = !0 : "false" == w.get("popCheer_cancel") && "1" != w.get("lose_pop_flg") && (a = !1) : null != w.get("cheer_already") && null == w.get("cheer_pop_flg") ? "1" == w.get("cheer_already") && (a = !0) : null != w.get("cheer_pop_flg") && ("1" == w.get("cheer_pop_flg") && "1" == w.get("lose_pop_flg") && (a = !0), w.remove("cheer_pop_flg")), w.remove("popCheer_cancel"), w.set("popCheer_cancel", a), m.is_arcarum && m.arcarum.is_tp_recovery ? j.UseTpRecover() : m.is_multi && m.cheer_status && !a && !m.is_semi ? j.popCheer() : m.is_multi || j.LosePopShow()
        }), b.isUndefined(m.is_boss) || "" == m.is_boss)stage.gGameStatus.cutinDeferred.resolve(); else {
            1 == m.battle.count && f.mWaitAll([x, y, z], {playtime: 12});
            var L = new lib[m.is_boss], M = new createjs.Container, N = L[m.is_boss][m.is_boss].timeline.duration;
            z.timeline[0].wait(8).call(function () {
                M.addChild(L), createjs.denaVersion && (M._layer = 1), stage.gMasterContainer.addChild(M), e.mRemove(N, M, stage.gMasterContainer)
            }), f.mWaitAll([x, y, z], {playtime: N}), z.timeline[0].call(function () {
                stage.gGameStatus.cutinDeferred.resolve()
            })
        }
        if (1 != m.battle.count || !b.isUndefined(m.is_boss) && "" != m.is_boss || f.mWaitAll([x, y, z], {playtime: 6}), z.timeline[0].call(function () {
            console.info(stage.gAryCntnBoss[0]);
            e.mShow(stage.gAryCntnBoss, l.boss.param)
        }), m.key_enemy_mode === k.key_enemy.mode_3 && b.each(m.boss.param, function (a, b) {
            1 !== a.alive && f.mChangeMotion(y.timeline[b], {motion: "down", pos: b, type: "boss", is_alive: "off", delay: 8})
        }), f.mChangeMotionAll(stage.gAryRootBoss, y.timeline, {motion: "setin", mc: l.boss.param, type: "boss", is_alive: "on", wait: 8}, {tween: [x, y, z]}), b.each(m.boss.param, function (b, c) {
            2 == b.modechange ? (l.waitmode[c] = "wait_2", a(".prt-enemy-info .prt-enemy-state").eq(c).addClass("over")) : 3 == b.modechange ? (l.waitmode[c] = "wait_3", a(".prt-enemy-info .prt-enemy-state").eq(c).addClass("break")) : l.waitmode[c] = "wait", f.mChangeMotion(y.timeline[c], {motion: l.waitmode[c], pos: c, type: "boss", is_alive: "on", wait: 1})
        }), b.each(m.boss.param, function (a, c) {
            b.isUndefined(a.gauge) ? i.mBreakGauge(z.timeline[0], wa[c], {gauge: a.modegauge}) : "" != a.gauge && i.mBreakGauge(z.timeline[0], wa[c], {gauge: a.gauge})
        }), !m.arcade || m.arcade && !m.arcade.is_bonus ? z.timeline[0].call(function () {
            a(".prt-enemy-gauge").css("display", "block"), b.each(wa, function (a, b) {
                a.show()
            })
        }) : (this.$el.find(".prt-targeting-area .prt-gauge-area").remove(), stage.gGameStatus.isShowBossGauge = !1), 1 == m.multi) {
            var O = a(".prt-total-human");
            m.is_semi && O.find("span.num-info-slash, span.max").remove(), O.show(), a(".prt-remain-time").show(), b.isUndefined(c.cmd) && i.mFellowTimer(z.timeline[0], 0, function () {
                return j.fellowTimeup()
            })
        } else if (m.battle) {
            var P = a(".prt-battle-num .txt-info-num"), Q = String(m.battle.count).split("");
            if (b.each(Q, function (a) {
                P.append('<div class="num-info' + a + '"></div>')
            }), P.append('<span class="num-info-slash"></span>'), m.is_dungeon && m.dungeon.endless_flag)P.append('<div class="num-info-infinity"></div>'); else {
                var R = String(m.battle.total).split("");
                b.each(R, function (a) {
                    P.append('<div class="num-info' + a + '"></div>')
                })
            }
            a(".prt-battle-num").show(), a(".prt-total-human").hide(), a(".prt-remain-time").hide()
        }
        m.balloon && i.mBalloon(z.timeline[0]), z.timeline[0].call(function () {
            if (m.is_multi && m.is_semi !== !0 || b.isUndefined(window.auto_flag) || 1 != window.auto_flag || (window.auto_flag = !1, l.auto_attack = !0, l.auto_button = !0), void 0 !== m.navi_information && (0 != l.serif || 0 != m.is_force_navi) && !l.auto_attack) {
                m.navi_index = 0;
                var c = m.navi_information[0];
                c && j.NaviShow(c)
            }
            if (1 != m.multi || m.is_semi && m.is_defendorder || (l.chat_button = m.chat_button_flag, l.chat_receive = m.chat_receive_flag, l.chat_button && !m.suddenly_attack_flag ? a(".btn-chat").show().addClass("display-on") : a(".btn-chat").show().addClass("display-off"), 0 != m.chat_temporary_flag || m.is_defendorder || m.is_arcarum || a(".btn-chat .ico-attention").show(), l.chat_receive && !m.suddenly_attack_flag ? a(".prt-button .btn-on").addClass("active") : a(".prt-button .btn-off").addClass("active")), a(".cnt-raid-information").show(), a(".prt-command-top, .prt-other").show(), q[0].visible = !0, l.is_escorted_character_dead || 1 == m.is_multi && l.player.all_dead)q[0].visible = !1, p[0][k.cjs.parts[0]].gotoAndPlay("out"), setTimeout(function () {
                q[0].visible = !0
            }, 500), stage.pJsnData.is_watching !== !0 && a(".btn-revival").show(); else if (l.auto_attack && m.auto_attack_display_flag) {
                a(".btn-attack-start").removeClass("display-on"), p[0][k.cjs.parts[0]].gotoAndPlay("out");
                var d = p[0][k.cjs.parts[0]][k.cjs.parts[0] + "_out"].timeline.duration;
                setTimeout(function () {
                    j._inAutoButton(), j._onAutoButton(), j._showAutoButton(), j.activateMask(), j._interactiveAutoButton()
                }, d * k.spf);
                var e = null;
                a.when(stage.gGameStatus.preemptiveDeferred, stage.gGameStatus.cutinDeferred).done(function () {
                    e = j.preemptiveAttack(), e.done(function () {
                        j.AttackSwitch()
                    })
                }), j.AttackSwitch()
            } else p[0][k.cjs.parts[0]].gotoAndPlay("in"), a(".btn-attack-start").addClass("display-on");
            if (stage.pJsnData.suddenly_attack_flag && a.when(stage.gGameStatus.preemptiveDeferred, stage.gGameStatus.cutinDeferred).done(function () {
                q[0].visible = !1, j.preemptiveAttack()
            }), l.diagram = m.diagram_flag, l.diagram && !m.suddenly_attack_flag && a(".img-diagram").addClass("display-on"), "undefined" != typeof m.survival)switch (m.survival.stage_number) {
                case"501":
                case"502":
                case"503":
                    a(".img-score").addClass("score_200 display-on");
                    break;
                case"504":
                case"505":
                    a(".img-score").addClass("score_500 display-on");
                    break;
                case"506":
                    a(".img-score").addClass("score_1000 display-on");
                    break;
                default:
                    a(".img-score").addClass("display-off")
            }
            if (l.serif = m.serif, !b.isUndefined(m.navi_information)) {
                var f = m.navi_information, g = j.getForceNaviIndex(f);
                if (0 == l.serif && 0 == m.is_force_navi)if (g >= 0) {
                    m.navi_index = g;
                    var h = f[g];
                    j.NaviShow(h)
                } else a(".prt-navi").hide()
            }
            l.others_effect_display_flag = m.others_effect_display_flag, l.ability_popup = m.ability_popup_flag, a(".prt-ability-skip").attr({active: l.ability_popup}), l.auto_attack_display_flag = m.auto_attack_display_flag, j.showEnemyInfo()
        }), z.timeline[0].call(function () {
            j.TutorialInit()
        }), 1 == m.tutorial_flag && (a(".btn-attack-start").removeClass("display-on"), q[0].visible = !1, j._hideAutoButton(), a(".prt-temporary").css("display", "none")), z.timeline[0].call(function () {
            m.battle.count >= 2 && 1 == m.is_rare && a(".prt-rare-direction").show().addClass("anim-rare-direction").oneAnimationEnd(function () {
                a(this).hide()
            }, 1600)
        });
        var S = new a.Deferred;
        if (!b.isUndefined(m.battle_condition) && 1 == m.turn && 1 == m.battle.count) {
            var T = a(".prt-battle-condition");
            T.find(".txt-title").html(m.battle_condition.title), T.find(".txt-body").html(m.battle_condition.body), z.timeline[0].call(function () {
                T.show().one("touchstart", function () {
                    a(this).hide(), S.resolve()
                })
            })
        }
        j.setAssistParam(), m.suddenly_attack_flag && !m.is_semi && !m.is_trialbattle && (1 == m.is_coopraid || 1 != m.invite_enable || m.fellow >= m.limit_number || 1 == m.is_skip_to_request_assistance) && stage.gGameStatus.preemptiveDeferred.resolve(), 1 == this.$el.find(".cnt-raid-stage").data("has-revenge-bonus") && 1 == m.turn && 1 == m.battle.count && K ? m.is_rare ? j.rareEnemyAppearEffectDeferred.done(function () {
            j.popRevengeBonus()
        }) : b.isUndefined(m.battle_condition) ? z.timeline[0].call(function () {
            j.popRevengeBonus()
        }) : a.when(S).done(function () {
            j.popRevengeBonus()
        }) : 1 == m.is_coopraid || 1 == m.is_watching || m.is_semi || (1 == m.invite_enable && m.fellow < m.limit_number ? K ? (0 == m.assist[1].on && (l.assist.all = 0), 0 == m.assist[2].on && (l.assist.friend = 0), 0 == m.assist[3].on && (l.assist.guild = 0), m.is_authority ? (b.isUndefined(m.battle_condition) && S.resolve(), m.assist[3].is_enable && 1 == m.turn && 1 == m.battle.count && (j.assistGuildForceDeferred = new a.Deferred, j.postAssistGuildForce()), a(".btn-assist").addClass("disable")) : 1 != m.is_skip_to_request_assistance ? m.is_host || m.is_allowed_to_requesting_assistance ? b.isUndefined(m.battle_condition) ? z.timeline[0].call(function () {
            var a = location.hash.split("/");
            "#raid_multi" === a[0] && j.popShowAssist("first")
        }) : a.when(S).done(function () {
            j.popShowAssist("first")
        }) : z.timeline[0].call(function () {
            j.setAssistButtonUnauthorized(), j.popUnauthorizedAssist()
        }) : m.is_host || m.is_allowed_to_requesting_assistance || 1 != m.is_skip_to_request_assistance || j.setAssistButtonUnauthorized()) : m.is_host || m.is_allowed_to_requesting_assistance || j.setAssistButtonUnauthorized() : (i.mAssistAgain(), a(".btn-assist").addClass("disable"))), m.is_semi && m.is_watching !== !0 ? (this.$el.find(".prt-multi-buttons").remove(), this.$el.find(".prt-multi-mene").addClass("damage-rank").css("display", "none"), (!m.is_defendorder && 1 == m.turn && 1 == m.battle.count || m.is_defendorder && m.pop_up_flg) && (b.isUndefined(m.battle_condition) ? z.timeline[0].call(function () {
            j.popShowSemiNotice()
        }) : a.when(S).done(function () {
            j.popShowSemiNotice()
        }))) : m.is_trialbattle && !m.is_watching && 1 == m.turn && 1 == m.battle.count && (b.isUndefined(m.battle_condition) ? z.timeline[0].call(function () {
            j.popShowTrialBattleNotice()
        }) : a.when(S).done(function () {
            j.popShowTrialBattleNotice()
        })), 1 == m.is_coopraid && (a(".btn-assist").addClass("disable"), a(".lis-lead-prev").each(function () {
            a(this).children(".atx-lead-link").text() == C.getMessage("raid_4") && a(this).remove()
        }), a(".prt-alliance-number .btn-more").remove(), a(".prt-alliance-number .txt-alliance").css("padding-top", "19px")), m.suddenly_attack_flag || z.timeline[0].call(function () {
            j.inactivateMask()
        }), l.menu = "top", l.chara_select = 1, A.push(new createjs.Timeline([].concat(x.timeline, y.timeline, z.timeline), {start: 0}, {useTicks: !0, paused: !0}));
        for (var s = 0, t = A.length; t > s; s++)A[s].setPaused(!1);
        if (o.setRtnMode(), !b.isUndefined(c.cmd)) {
            var U = j.baseFps * (99 != c.fwd ? c.fwd : 1);
            k.spf = Math.round(1e3 / U * 100) / 100, createjs.Ticker.setFPS(U), createjs.Ticker.addEventListener("tick", stage);
            var V = (new a.Deferred).resolve();
            setTimeout(function () {
                b.some(m.rep, function (b) {
                    V = V.then(function () {
                        var b = new a.Deferred;
                        return l.rep >= c.trn - 1 ? (b.resolve(), b) : (99 != c.fwd ? j.Attack(void 0, {}, c, l.rep, b) : (l.rep++, b.resolve()), b)
                    })
                }), a.when(V).done(function () {
                    createjs.Ticker.setFPS(j.baseFps), createjs.Ticker.addEventListener("tick", stage)
                })
            }, 2e3)
        }
        if (m.is_semi && m.ranking && j.updateDamageRanking(m.ranking), stage.pJsnData.is_watching === !0) {
            a(".watching-mask").css("display", "block"), a(".btn-chat").show().addClass("display-off"), a(".prt-button .btn-off").addClass("active"), a(".img-diagram").removeClass("display-on").addClass("display-off"), stage.gPartsContainer.removeChild(stage.gAryCntnParts[0]);
            var W = a("body"), X = a(document).scrollTop();
            Game.ua.isJssdk() && (W = a("#mobage-game-container"), X = a("#mobage-game-container").parent().scrollTop()), a("body").hasClass("pc") || W.on("cgtouchstart", function (a) {
                a.preventDefault()
            }), X > 1 && window.scrollTo(0, 0)
        }
        if (stage.pJsnData.is_watching === !0) {
            var Y = !1;
            stage.gGameStatus.timer.watchingMode = setInterval(function () {
                if (!Y) {
                    Y = !0;
                    var c = new d;
                    c.preSave(stage.gGameStatus.shouldReAuth, {raid_id: stage.pJsnData.raid_id}, {url: c.urlRoot("watching", "", stage.pJsnData.is_multi, stage.pJsnData.is_semi), silent: !0, error: function () {
                    }, success: function (d) {
                        var e = c.toJSON();
                        if (b.isUndefined(e.synchro) || b.each(e.synchro, function (a) {
                            a.special_skill_flag !== stage.gGameStatus.lock && j.CommandLock({}), a.hp < stage.gGameStatus.boss.param[a.pos].hp && (i.mBossGaugeHpForLog(wa, stage.pJsnData.boss.type, {pos: a.pos, param: {hp: a.hp, hpmax: stage.gGameStatus.boss.param[a.pos].hpmax}}), stage.gGameStatus.boss.param[a.pos].hp = a.hp, stage.pJsnData.boss.param[a.pos].hp = a.hp), pLooksMode = stage.gGameStatus.bossmode.looks.mode[a.pos], pLooksGauge = stage.gGameStatus.bossmode.looks.gauge[a.pos], ((1 === pLooksMode || 3 === pLooksMode) && pLooksGauge < a.gauge || 2 === pLooksMode && pLooksGauge > a.gauge) && (i.mBreakGaugeForLog(wa[a.pos], {pos: a.pos, gauge: a.gauge}), j.changeBossMode(a.pos, a.mode), stage.gGameStatus.bossmode.looks.mode[a.pos] = a.mode, stage.gGameStatus.bossmode.looks.gauge[a.pos] = a.gauge)
                        }), "undefined" != typeof e.watching && e.watching.length > 0) {
                            var f = (new a.Deferred).resolve();
                            b.some(e.watching, function (b) {
                                f = f.then(function () {
                                    "undefined" != typeof b.status && b.status.turn !== stage.gGameStatus.turn && (i.mTurn(stage.gGameStatus.turn), stage.gAryRootParts[2][stage.gGameParam.cjs.parts[2]].gotoAndPlay("in"), stage.gAryCntnParts[2].visible = !0);
                                    var c = new a.Deferred;
                                    return j.playScenarios(b, null, null, {}, c), c
                                })
                            }), a.when(f).done(function () {
                                Y = !1
                            })
                        } else Y = !1
                    }})
                }
            }, stage.gGameParam.interval.watching)
        }

    }, events: {"tap .prt-summon-list .prt-list-top": "CommandChangeSummon", 'tap .prt-command-top [class^="lis-character"]': "CommandChangeAbility", "tap .btn-command-back": "CommandBackTop", "touchstart .prt-command-chara": "setCharCommandFlick", "mousedown .prt-command-chara": "setCharCommandFlick", "tap .prt-slide-icon .ico-pre": "slidePre", "tap .prt-slide-icon .ico-next": "slideNext", "tap .btn-attack-start": "AttackSwitch", "tap .btn-lock": "CommandLock", "tap .btn-summon-use": "SelectSummon", "tap .btn-ability-use": "StoreAttackQueue", "tap .btn-command-attack": "Attack", "tap .btn-command-ability": "AbilityOn", "tap .btn-targeting": "enemyTargeting", "tap .prt-info-mask": "showEnemyInfo", "tap .prt-targeting-area .prt-info-mask-targeting": "showEnemyInfo", "tap .btn-enemy-gauge": "ConditionPopBoss", "tap #prt-field-conditions": "fetchFieldCondition", "tap #prt-assist-unit-conditions": "fetchAssistUnitCondition", "tap .btn-temporary": "UseTempItem", "tap .pop-raid-item .item-potion": "popShowItem", "tap .prt-select-item .item-small": "ConfirmTempItemSmall", "tap .prt-select-item .item-large": "ConfirmTempItemLarge", "tap .prt-event-item .btn-event-item": "ConfirmEventItem", "tap .pop-event-item .btn-usual-ok": "UseEventItem", "tap .pop-raid-item .btn-usual-cancel": "CancelTempItemUse", "tap .pop-raid-item .btn-usual-use": "UseTempItemLarge", "tap .btn-raid-menu.menu": "popShowMenu", "tap .btn-assist:not(.unauthorized-assist)": "popAssistCheck", "tap .btn-assist.unauthorized-assist": "popUnauthorizedAssist", "tap .pop-start-assist .btn-check": "AssistSelect", "tap .pop-start-assist .btn-usual-text": "handleAssistOn", "tap .pop-unauthorized-assist .btn-usual-ok": "popRemove", "tap .pop-enable-assist .btn-usual-ok": "popRemove", "tap #pop-scroll, .btn-raid-menu.close": "scrollPopHide", "tap .pop-raid-menu .btn-recover": "UseTempItem", "tap .pop-raid-menu .btn-arcarum-recover": "UseTpRecover", "tap .pop-raid-menu .btn-mypage": "popShowMypage", "tap .pop-raid-menu .btn-event-top": "popConfirmLocationEvent", "tap .pop-raid-menu .btn-event-top-do": "popConfirmLocationDo", "tap .pop-raid-menu .btn-event-top-arcarum": "popConfirmLocationArcarum", "tap .pop-raid-menu .btn-setting-battle-options": "handleBattleOptionSetting", "tap .btn-withdrow": "popShowithdraw", "tap .pop-riddle-batle-menu .btn-riddle-mypage": "popShowMypage", "tap .pop-riddle-batle-menu .btn-riddle-retire": "popShowithdraw", "tap .pop-riddle-batle-menu .btn-usual-close": "popRemoveDefault", "tap .pop-result-withdraw .btn-usual-ok": "Withdraw", "tap .pop-result-withdraw .btn-withdraw": "Withdraw", "tap .pop-limit-over .btn-withdraw-single": "Withdraw", "tap .pop-result-withdraw .btn-usual-cancel": "popWithdrawCancel", "tap .pop-result-withdraw .btn-usual-close": "popWithdrawClose", "tap .pop-location-event-withdraw .btn-usual-cancel": "popWithdrawCancel", "tap .pop-location-defend-order-withdraw .btn-usual-cancel": "popWithdrawCancel", "tap .pop-location-defend-order-withdraw .btn-usual-close": "popWithdrawClose", "tap .pop-arcarum-withdraw .btn-usual-ok": "arcarumWithdrawOk", "tap .pop-arcarum-withdraw:not(.escape) .btn-usual-close": "arcarumWithdrawCancel", "tap .pop-arcarum-withdraw.escape .btn-usual-close": "popRemoveDefault", "tap .pop-arcarum-withdraw .btn-usual-cancel": "arcarumWithdrawCancel", "tap .pop-result-lose .btn-usual-cancel": "popLoseCancel", "tap .pop-result-lose .btn-usual-ok": "popLoseOK", "tap .pop-result-use-potion .btn-usual-cancel": "popItemCancel", "tap .pop-limit-over .btn-close": "popItemCancel", "tap .pop-result-use-potion .btn-usual-ok, .pop-item-confirm .btn-usual-ok": "ItemUseOk", "tap .btn-shop": "locationShop", "tap .btn-stone": "popShowExchange", "tap .pop-exchange .btn-usual-cancel": "LosePopShow", "tap .pop-exchange .btn-usual-exchange": "buyItem", "tap .pop-exchange .btn-usual-ok": "LosePopShow", "change .num-set": "setBuyNum", 'tap .prt-ability-list [class^="lis-ability"]': "popShowAbility", "tap .prt-ability-dialog .btn-usual-cancel": "popHideAbility", "tap .prt-ability-stamped .btn-usual-close": "popHideAbilityStamped", "tap .pop-ability-mark .btn-usual-cancel": "popHideAbilityMark", "tap .pop-ability-hiddenweapon .btn-usual-cancel": "popHideAbilityHiddenweapon", "tap .pop-ability-lupiflip .btn-usual-cancel": "popHideAbilityLupiFlip", 'tap [class^="lis-summon"]': "popShowSummon", "tap .pop-summon-detail .btn-usual-cancel": "popHideSummon", "tap .pop-setting-display .set-diagram .btn-check": "settingChangeSingle", "tap .pop-setting-display .btn-usual-close": "popRemove", "tap .pop-setting-display .btn-set-setting": "handleSettingPostData", "tap .pop-setting-assist .btn-usual-close": "popRemove", "tap .pop-setting-assist .btn-set-setting": "handleSettingPostData", "tap .pop-setting-chat .btn-set-setting": "handleSettingPostData", "tap .pop-rematch-fail .btn-usual-ok": "popHideRematchFail", "tap .btn-chat": "popShowChat", "tap .btn-category": "changeCategory", "tap .pop-ready-stamp .lis-stamp:not(.empty), .pop-chat .lis-text": "ChatSend", "tap .pop-summon-fail .btn-usual-ok": "popHideSummonFail", "tap .pop-revenge-bonus .btn-usual-ok": "popRemove", "tap .ev-back, .pop-assist .btn-usual-ok, .pop-summon-no .btn-usual-ok, .pop-start-assist .btn-usual-cancel, .pop-notice .btn-usual-ok, .pop-item-confirm .btn-usual-cancel, .btn-usual-close, .pop-mypage .btn-usual-cancel, .pop-event-item .btn-usual-cancel, .pop-semi-notice .btn-usual-close, .pop-do-semi-notice .btn-usual-close, .pop-location-event .btn-usual-cancel, .pop-location-defend-order .btn-usual-cancel, .pop-location-arcarum .btn-usual-cancel": "popRemove", "tap .pop-trialbattle-notice .btn-usual-close": "popRemove", "tap .pop-select-member .btn-usual-cancel": "popHideSelectMember", 'tap .pop-select-member:not(".sub-selecter") [class^="lis-character"]': "SelectMember", "tap .prt-supporter": "FriendPop", "tap .btn-friend-use": "FriendAttack", "tap .prt-command .prt-condition .img-ico-status-m": "ConditionPopPlayer", "tap .pop-condition, .btn-raid-menu.close_condition": "ConditionPopHide", "tap .prt-navi": "NaviNext", 'tap .prt-tips[cheer="0"]': "LosePopShow", 'tap .prt-tips[cheer="1"]': "popCheer", "tap .btn-cheer": "CheerSend", "tap .pop-cheer .btn-usual-cancel": "LosePopShow", "tap .pop-cheer .btn-usual-ok": "LosePopShow", "tap .btn-change-speed": "ChangeSpeed", "tap .btn-logs": "BattleLog", "tap .btn-alliance": "allianceList", "tap .set-chat_receive>div": "settingChange", "tap .prt-multilog-overlayer .bgm-change": "setBgmButton", "tap .prt-raid-log": "hideLog", "tap .prt-ability-skip": "settingChangeSingle", "tap .btn-revival": "popShowRevival", "tap .pop-continue-event .btn-usual-cancel": "popItemCancel", "tap .pop-continue-event .btn-event-use": "UseEventRevivalItem", "tap .pop-continue-event .btn-potion-use": "ItemUseOk", "tap .pop-dungeon-item .lis-dungeon-item": "selectDungeonItem", "tap .pop-dungeon-item-selected .btn-usual-ok": "locationResult", 'tap .pop-battle-service .btn-battle-service:not(".disable")': "selectBattleService", 'tap .pop-battle-service .btn-usual-ok:not(".disable")': "sendBattleService", "tap .rail-icon-over": "SelectAbilityRailIcon", 'tap .pop-arcarum-continue .btn-usual-ok:not(".disable")': "sendArcarumContinue", "tap .pop-arcarum-continue .btn-usual-cancel": "sendExitBattle", "tap .pop-arcarum-recover .btn-usual-ok:not(.disable)": "popTriggerOk", "tap .pop-arcarum-recover .btn-usual-cancel": "popItemCancel", "tap .pop-location-arcarum-withdraw .btn-usual-close": "popWithdrawClose", "tap .prt-arcarum-tactical-result .btn-arcarum-next:not(.btn-result)": "popTriggerOk", "tap .pop-info-message .btn-usual-ok": "popTriggerOk", "tap .btn-auto": "changeAutoMode", "tap .lis-ninja-mark": "setNinjaMark", "tap .pop-ability-mark .btn-usual-text": "exeNinjaAbility", "tap .pop-ability-hiddenweapon .btn-box.enabled": "onAbilityHiddenweapon", "tap .pop-ability-hiddenweapon .btn-usual-hiddenweapon": "exeAbilityHiddenweapon", "tap .pop-ability-lupiflip .prt-box.btn-lupiflip": "exeAbilityLupiFlip", 'tap .pop-select-member.sub-selecter [class^="lis-character"]:not(".mask-black")': "exeAbilitySubSelecter", "tap #btn-twitter": "onPushTwitterIcon", "tap .pop-status-check .btn-tweet-post": "handleOnPushPostTwitterButton", "tap .pop-status-check .btn-usual-cancel": "popRemove", "tap .pop-status-check .btn-oauth-ok": "onPushOauthButton", "tap .pop-status-check .btn-pop-re-oauth": "onPushReOuthTwitterButton", "tap .pop-status-check .btn-oauth-pin": "onPushPinCodeButton", "tap .pop-success-post-twitter .btn-usual-ok": "popRemove", "tap .pop-twitter-auth .btn-oauth-ok": "onPushOauthButton", "tap .pop-twitter-auth .btn-usual-cancel": "popRemove", "input #frm-pin": "onInputPinCode", "tap .pop-twitter-auth .btn-oauth-pin": "onPushPinCodeButton", "tap .pop-success-pin .btn-usual-ok": "onPushSuccessPinPopButton", "tap .pop-chrome-app-version-check .btn-redirect-help": "location_href", "tap .pop-chrome-app-version-check .btn-usual-cancel": "popRemove", "tap .location-href": "locationHref"}, CommandChangeTop: function (c) {
        a(".prt-command-chara").hide(), a(".prt-summon").hide(), a(".prt-command-summon").show(), a(".prt-command-summon").removeClass("summon-show"), a(".prt-summon").hide(), stage.gMasterContainer.setChildIndex(stage.gBossContainer, 0), stage.gMasterContainer.setChildIndex(stage.gPlayerContainer, 1), a("[class^='lis-character']").removeClass("invisible"), a(".prt-command-top, .prt-command-top [class^='lis-character'], .prt-sub-command").show(), a(".prt-navi").hasClass("active") && setTimeout(function () {
            a(".prt-navi").addClass("display-on")
        }, 10), a(".prt-battl-state").css("display", "none").removeClass("ready player enemy");
        var d = stage.gGameStatus;
        1 == d.diagram && stage.pJsnData.is_watching !== !0 && a(".img-diagram").removeClass("display-off").addClass("display-on"), "undefined" != typeof stage.pJsnData.survival && stage.pJsnData.survival.score_buff && !a(".img-score").hasClass("display-off") && a(".img-score").addClass("display-on"), 1 != d.chat_button || stage.pJsnData.is_watching === !0 || stage.pJsnData.is_semi && stage.pJsnData.is_defendorder || a(".cnt-raid-information .btn-chat").removeClass("display-off").addClass("display-on"), a(".prt-temporary").removeClass("display-off").addClass("display-on");
        for (var e = d.boss.param, g = 0, h = stage.gAryCntnBoss.length - 1; h >= g; g++)1 == e[g].alive && (stage.gAryCntnBoss[g].visible = !0);
        if (b.isUndefined(c) || !b.isUndefined(c) && 1 == c.motion) {
            for (var i = d.player.param, g = 0, h = stage.gAryRootAvatar.length - 1; h >= g; g++)1 == i[g].alive && (+i[g].recast >= 100 && 1 != d.lock ? !function (a) {
                if (1 == stage.pJsnData.battle.count && 1 == d.turn && (+i[g].recast < +i[g].recastmax || 1 == d.lock)) {
                    var b = f.mChangeMotionInstantly({motion: "setup", pos: g, type: "player"}), c = createjs.Tween.get({}, {override: !0, useTicks: !0, paused: !0});
                    c.wait(b).call(function (a) {
                        f.mChangeMotionInstantly({motion: "ability", pos: a, type: "player"})
                    }, [g]), c.setPaused(!1)
                } else!function (a) {
                    setTimeout(function () {
                        f.mChangeMotionInstantly({motion: "ability", pos: a, type: "player"})
                    }, 0)
                }(g)
            }(g) : !function (a) {
                setTimeout(function () {
                    f.mChangeMotionInstantly({motion: d.defaultmotion, pos: a, type: "player"})
                }, 500)
            }(g));
            for (var g = 0, h = stage.gAryRootBoss.length - 1; h >= g; g++)1 == e[g].alive && f.mChangeMotionInstantly({motion: d.waitmode[g], pos: g, type: "boss"})
        }
        stage.pJsnData.suddenly_attack_flag && (stage.gAryCntnParts[0].visible = !0), d.menu = "top", clearInterval(d.timer.playerCondition)
    }, CommandChangeSummon: function () {
        var b = this;
        if (!stage.gGameStatus.is_escorted_character_dead && !stage.gGameStatus.player.all_dead && 2 != stage.gGameStatus.chara_select && !stage.gGameStatus.attackQueue.attackButtonPushed) {
            if (stage.pJsnData.without_pc)return void this.popShowSummonNo(!0);
            if (1 != stage.pJsnData.player.param[0].alive)return void this.popShowSummonNo(!1);
            var c = this.GetHeroPos();
            if (0 > c || 0 == stage.gGameStatus.player.param[c].condition.summon_available_flag)return void this.popShowSummonFail();
            stage.gGameStatus.balloon = "summon", a(".prt-battl-state").removeClass("ready"), a(".prt-command-top").css("display", "none"), this.HideCommand(), a(".prt-command-summon").show().removeClass("summon-hide"), "summon" !== stage.gGameStatus.menu && b.BackButtonShow(), a(".prt-command-summon").addClass("summon-show"), stage.gGameStatus.menu = "summon";
            for (var d = 0; d <= stage.gAryRootAvatar.length - 1; d++)1 == stage.gGameStatus.player.param[d].alive && f.mChangeMotionInstantly({motion: stage.gGameStatus.defaultmotion, pos: d, type: "player"});
            var c = this.GetHeroPos();
            stage.gGameStatus.motion || f.mChangeMotionInstantly({motion: "summon", pos: c, type: "player"})
        }
    }, CommandChangeAbility: function (b) {
        -1 != Game.ua.ua.toLowerCase().indexOf("windows") && "ontouchstart"in window && "onmousedown"in window && a("#mobage-game-container").css({"-ms-touch-action": "pan-y", "touch-action": "pan-y"});
        var c = this;
        if (!stage.gGameStatus.is_escorted_character_dead && "ability" != stage.gGameStatus.menu && !stage.gGameStatus.attackQueue.attackButtonPushed) {
            var d = a(b.currentTarget);
            if (!d.hasClass("blank")) {
                if (2 == stage.gGameStatus.chara_select)return void(stage.gGameStatus.event_item_flg ? (stage.gGameStatus.event_character_num = a(b.currentTarget).attr("pos"), this.UseEventItem()) : this.UseTempItemSmall(b));
                if (stage.gGameStatus.menu = "ability", stage.gGameStatus.command_slide.now_pos = d.attr("pos"), !a(".prt-battl-state").hasClass("ready")) {
                    a(".prt-command-chara").removeClass("anim-slide-command-right slide_pre anim-slide-command-left slide_next"), stage.gGameStatus.command_slide.state = 0, c.BackButtonShow(), stage.gGameStatus.balloon = "ability";
                    var e = a(".prt-command-chara").eq(a(b.currentTarget).attr("pos"));
                    "block" != e.css("display") && 1 == stage.gGameStatus.player.param[a(b.currentTarget).attr("pos")].alive && (this.HideCommand(), a(".prt-command-top, .prt-command-summon, .prt-sub-command").hide(), e.show().addClass("anim-command-chara-show").oneAnimationEnd(function () {
                        a(this).removeClass("anim-command-chara-show");
                        for (var b = 0, c = 0; c <= stage.gGameStatus.player.number; c++)1 == stage.gGameStatus.player.param[c].alive && b++;
                        b >= 2 && a(".prt-slide-icon").addClass("show-icon")
                    }, 400), a(b.currentTarget).addClass("invisible"), this.motionChangeAbility(a(b.currentTarget).attr("pos"))), i.mSetIntervalPlayerConditions(Number(a(b.currentTarget).attr("pos")) + 1)
                }
            }
        }
    }, motionChangeAbility: function (a) {
        for (var b = 0; b <= stage.gAryRootAvatar.length - 1; b++)1 == stage.gGameStatus.player.param[b].alive && a != b && (parseInt(stage.gGameStatus.player.param[b].recast) < parseInt(stage.gGameStatus.player.param[b].recastmax) || 1 == stage.gGameStatus.lock ? f.mChangeMotionInstantly({motion: stage.gGameStatus.defaultmotion, pos: b, type: "player"}) : f.mChangeMotionInstantly({motion: "stbwait", pos: b, type: "player"}));
        if ("ability" === stage.gGameStatus.menu)if (1 == stage.pJsnData.battle.count && 1 == stage.gGameStatus.turn && (parseInt(stage.gGameStatus.player.param[a].recast) < parseInt(stage.gGameStatus.player.param[a].recastmax) || 1 == stage.gGameStatus.lock)) {
            var c = f.mChangeMotionInstantly({motion: "setup", pos: a, type: "player"}), d = createjs.Tween.get({}, {override: !0, useTicks: !0, paused: !0});
            d.wait(c).call(function (a) {
                f.mChangeMotionInstantly({motion: "ability", pos: a, type: "player"})
            }, [a]), d.setPaused(!1)
        } else setTimeout(function () {
            f.mChangeMotionInstantly({motion: "ability", pos: a, type: "player"})
        }, 500)
    }, CommandBackTop: function (c) {
        -1 != Game.ua.ua.toLowerCase().indexOf("windows") && "ontouchstart"in window && "onmousedown"in window && a("#mobage-game-container").css({"-ms-touch-action": "", "touch-action": ""}), b.isUndefined(c) || "tap" != c.type || (c = void 0), stage.gGameStatus.action.ab_select = "", stage.gGameStatus.motion = !1, stage.gGameStatus.balloon = "wait";
        var d = a(".btn-command-back");
        d.removeClass("display-on").addClass("display-off"), stage.gAryRootParts[1][stage.gGameParam.cjs.parts[1]].gotoAndPlay("out");
        var e = stage.gAryRootParts[1][stage.gGameParam.cjs.parts[1]][stage.gGameParam.cjs.parts[1] + "_out"].timeline.duration;
        setTimeout(function () {
            d.hasClass("display-on") || (stage.gAryCntnParts[1].visible = !1)
        }, e * stage.gGameParam.spf), stage.pJsnData.is_watching === !0 || stage.pJsnData.is_semi && stage.pJsnData.is_defendorder || a(".btn-chat").removeClass("display-off").addClass("display-on"), stage.pJsnData.is_watching !== !0 && stage.gGameStatus.diagram && a(".img-diagram").removeClass("display-off").addClass("display-on"), "undefined" != typeof stage.pJsnData.survival && stage.pJsnData.survival.score_buff && !a(".img-score").hasClass("display-off") && a(".img-score").addClass("display-on"), a(".prt-command-chara").hide(), a(".prt-slide-icon").removeClass("show-icon"), this.CommandChangeTop(c)
    }, BackButtonShow: function () {
        stage.gAryRootParts[1][stage.gGameParam.cjs.parts[1]].gotoAndPlay("in"), stage.gAryCntnParts[1].visible = !0, a(".btn-command-back").addClass("display-on")
    }, HideCommand: function () {
        a(".prt-ability-summon").removeClass("display-on"), a(".img-diagram").removeClass("display-on").addClass("display-off"), a(".prt-temporary").removeClass("display-on").addClass("display-off"), a(".img-score").hasClass("display-on") && a(".img-score").removeClass("display-on"), setTimeout(function () {
            a(".prt-battle, .prt-navi").removeClass("display-on")
        }, 1)
    }, renewCharaList: function (c) {
        c = c ? c : 0;
        for (var d = [], e = [], g = stage.gGameStatus.player.param, h = g.length, i = 0; h > i; i++) {
            var j = ".prt-command-chara.chara" + (i + 1), k = a(j + ' .prt-ability-list div[class^="lis-ability"] div');
            k.hasClass("shine0") ? (a(".prt-member .lis-character" + i + " .txt-ability").removeClass("off").addClass("on"), d[i] = "raid_ability") : (a(".prt-member .lis-character" + i + " .txt-ability").removeClass("on").addClass("off"), d[i] = "raid_normal");
            var l = a(j);
            0 == g[i].condition.ability_available_flag ? l.addClass("ability-disable") : l.removeClass("ability-disable"), 0 == g[i].condition.recast_down_flag ? l.addClass("turn-disable") : l.removeClass("turn-disable"), +g[i].recast >= 100 && (e[i] = !0, 1 != stage.gGameStatus.lock && (d[i] = "raid_special"))
        }
        a(".prt-command [class^='lis-character']").children("img").attr("src", ga);
        for (var m = a(".prt-command-chara"), i = 0; h > i; i++) {
            if (1 == g[i].alive) {
                1 == g[i].leader ? a(".prt-command .lis-character" + i).children("img").attr("src", Game.imgUri + "/sp/assets/leader/raid_normal/" + g[i].pid_image + ".jpg") : a(".prt-command .lis-character" + i).children("img").attr("src", Game.imgUri + "/sp/assets/npc/raid_normal/" + g[i].pid_image + ".jpg");
                var n = a(".prt-command .lis-character" + i + " .txt-hp-value"), p = a(".prt-command-top .lis-character" + i + " .prt-gauge-hp-inner"), q = a(".prt-command-chara .lis-character" + i + " .prt-gauge-hp-inner"), r = parseInt(+g[i].hp / +g[i].hpmax * 100), s = 25 >= r ? "red" : "green";
                n.html("" + g[i].hp).attr({color: s}), p.css("width", r + "%").attr({color: s}), q.css("width", r + "%").attr({color: s}), g[i].condition.hide_hp_flag ? n.addClass("hide-hp") : n.removeClass("hide-hp"), void 0 !== g[i].condition.num && (stage.pJsnData.player.param[g[i].condition.num].condition.hide_hp_flag = g[i].condition.hide_hp_flag);
                var t = m.eq(i), u = t.find('div[class^="txt-name"]'), v = t.find('div[class^="txt-comment"]'), w = g[i].special_skill, x = C.replaceMessage("raid_5", [g[i].special_comment]);
                u.html() !== w && u.html(w), v.html() !== x && v.html(x);
                var y = 2 === g[i].form && g[i].extra_attr > 0 ? g[i].extra_attr : g[i].attr, z = ".prt-command .lis-character" + i;
                a(z + " .ico-type").removeClass(function (a, b) {
                    return(b.match(/ico-attribute-\d*/) || []).join(" ")
                }).addClass("ico-attribute-" + y)
            }
            var A = stage.pJsnData.without_pc ? i + 1 : i;
            h > A && (1 == stage.pJsnData.player.param[A].leader ? a(".pop-select-member .lis-character" + i).children("img").attr("src", Game.imgUri + "/sp/assets/leader/raid_normal/" + stage.pJsnData.player.param[A].pid_image + ".jpg") : a(".pop-select-member .lis-character" + i).children("img").attr("src", Game.imgUri + "/sp/assets/npc/raid_normal/" + stage.pJsnData.player.param[A].pid_image + ".jpg"))
        }
        for (var i = 0; h > i; i++) {
            var k = a(".prt-command .prt-gauge-special.character" + i);
            k.find(".prt-shine").hide(), 0 == i && a('.prt-command-summon div[class^="lis-summon"]').removeClass("on")
        }
        var B = stage.gGameStatus.menu;
        if ("ability" != B && "summon" != B && "temporary" != B && 1 !== stage.gGameStatus.attacking)for (var i = 0; h > i; i++)if ("raid_special" == d[i] && 1 != stage.gGameStatus.lock && 1 == g[i].alive) {
            var D = 0;
            !function (a) {
                setTimeout(function () {
                    1 != stage.gGameStatus.lock && f.mChangeMotionInstantly({motion: "ability", pos: a, type: "player"})
                }, (D + c) * stage.gGameParam.spf)
            }(i)
        }
        setTimeout(function () {
            for (var b = !1, c = 0; h > c; c++) {
                var d = a(".prt-command .prt-gauge-special.character" + c);
                g[c].alive && (1 == e[c] && ("undefined" == typeof g[c].condition.seal_flag || 0 == g[c].condition.seal_flag) && (d.find(".prt-shine").show(), b || (o.playRecastMaxSE(), b = !0)), "undefined" == typeof g[c].condition.seal_flag || 0 == g[c].condition.seal_flag ? d.find(".prt-black-mask").hide() : d.find(".prt-black-mask").show())
            }
        }, 0);
        var E = !1;
        1 == stage.pJsnData.summon_enable && 1 == stage.pJsnData.player.param[0].alive && (b.where(stage.pJsnData.summon, {recast: "0"}).length || 0 == parseInt(stage.pJsnData.supporter.recast)) && (E = !0);
        var F = this.GetHeroPos();
        E ? 0 > F || 0 == g[F].condition.summon_available_flag ? (a(".prt-list-top").addClass("summon-disable"), E = !1) : (a(".prt-list-top").removeClass("summon-disable"), E = !0) : 0 > F || 0 == g[F].condition.summon_available_flag ? a(".prt-list-top").addClass("summon-disable") : a(".prt-list-top").removeClass("summon-disable");
        var k = a(".prt-command-summon .prt-list-top");
        k.removeClass("summon-on summon-off"), E ? k.addClass("summon-on") : k.addClass("summon-off"), a('.prt-command-summon div[class^="lis-summon"]').each(function (c) {
            if (!b.isUndefined(stage.pJsnData.summon[c]) && "" != stage.pJsnData.summon[c].id) {
                var d = a(this);
                1 == stage.pJsnData.summon_enable && 1 == stage.pJsnData.player.param[0].alive && 0 == parseInt(stage.pJsnData.summon[c].recast) && F >= 0 && 0 != g[F].condition.summon_available_flag ? (d.removeClass("off non-reusable").addClass("on"), d.removeClass("btn-summon-unavailable").addClass("btn-summon-available")) : (stage.pJsnData.summon[c].recast > X ? d.removeClass("on off").addClass("non-reusable") : d.removeClass("on non-reusable").addClass("off"), d.removeClass("btn-summon-available").addClass("btn-summon-unavailable")), d.find("span").removeClass().addClass("num-recast-s" + stage.pJsnData.summon[c].recast), d.attr("summon-recast", stage.pJsnData.summon[c].recast)
            }
        });
        var G = a(".prt-command-summon .lis-summon:last");
        1 == stage.pJsnData.summon_enable && 1 == stage.pJsnData.player.param[0].alive && 0 == parseInt(stage.pJsnData.supporter.recast) && F >= 0 && 0 != g[F].condition.summon_available_flag ? (G.removeClass("off non-reusable").addClass("on"), G.removeClass("btn-summon-unavailable").addClass("btn-summon-available")) : (stage.pJsnData.supporter.recast > X ? G.removeClass("on off").addClass("non-reusable") : G.removeClass("on non-reusable").addClass("off"), G.removeClass("btn-summon-available").addClass("btn-summon-unavailable")), G.attr("summon-recast", stage.pJsnData.supporter.recast), G.find("span").removeClass().addClass("num-recast-s" + stage.pJsnData.supporter.recast);
        var k = a(".prt-command-top .prt-member div[class^='lis-character']");
        k.addClass("blank");
        for (var i = 0; i <= stage.gGameStatus.player.number; i++)1 == g[i].alive && a(".prt-command-top .prt-member .lis-character" + i).removeClass("blank");
        stage.pJsnData.is_arcade && stage.pJsnData.arcade.is_bonus && this.updateBonusStageTurn()
    }, updateBonusStageTurn: function () {
        var b = a("#prt-arcade-countdown"), c = b.find(".prt-arcade-number-box"), d = stage.gGameStatus.remain_turn + "", e = d.length, f = [];
        e > 1 ? f = d.split("") : f.push(stage.gGameStatus.remain_turn), c.empty();
        for (var g = 0; e > g; g++)c.append('<div class="prt-turn-num' + f[g] + '"></div>');
        b.css("display", "block")
    }, findFirstPIDInFrontMember: function (a) {
        var c = b.find(stage.gGameStatus.player.param, function (c) {
            if (c.alive && c.pid && !c.leader) {
                var d = b.filter(a, function (a) {
                    return a == c.pid
                });
                if (!b.isEmpty(d))return!0
            }
            return!1
        });
        return b.isEmpty(c) ? null : c.pid
    }, setCharCommandFlick: function (b) {
        if (("mousedown" !== b.type || Game.ua.isPcPlatformHasTouch) && 1 != stage.gGameStatus.command_slide.state) {
            var c = this, d = a(b.currentTarget);
            c.startPageX = 0, c.startPageY = 0,
                c.startTimestamp = 0, c.startScrollY = 0, c.commandSlideDirection = "";
            var e = function (b) {
                "mousedown" === b.type ? (c.startPageX = b.originalEvent.pageX, c.startPageY = b.originalEvent.pageY) : (c.startPageX = b.originalEvent.changedTouches[0].pageX, c.startPageY = b.originalEvent.changedTouches[0].pageY), c.startTimestamp = b.originalEvent.timeStamp, c.startScrollY = a(document).scrollTop(), Game.ua.isJssdk() && (c.startScrollY = a("#mobage-game-container").parent().scrollTop())
            }, f = function (b) {
                var d, e, f = b.originalEvent.timeStamp, g = a(document).scrollTop();
                "mouseup" === b.type ? (d = b.originalEvent.pageX, e = b.originalEvent.pageY) : (d = b.originalEvent.changedTouches[0].pageX, e = b.originalEvent.changedTouches[0].pageY), Game.ua.isJssdk() && (g = a("#mobage-game-container").parent().scrollTop());
                var h = +f - +c.startTimestamp, i = +d - +c.startPageX, j = +e - +c.startPageY, k = +g - +c.startScrollY;
                Game.ua.isChromeApp() && (k = 0), Math.abs(i) < Math.abs(j) || Math.abs(k) > fa || da > h && Math.abs(i) > ea && (c.commandSlideDirection = i > 0 ? "prev" : "next", c.slideCommand())
            };
            "mousedown" === b.type && Game.ua.isPcPlatformHasTouch ? (e(b), d.one("mouseup", f)) : "touchstart" === b.type && (e(b), d.one("touchend", f))
        }
    }, slideCommand: function () {
        if (1 != stage.gGameStatus.command_slide.state) {
            for (var a = 0, b = 0; b <= stage.gGameStatus.player.number; b++)1 == stage.gGameStatus.player.param[b].alive && a++;
            a >= 2 && ("prev" === this.commandSlideDirection ? this.slidePre() : this.slideNext())
        }
    }, slidePre: function () {
        if (1 != stage.gGameStatus.command_slide.state) {
            stage.gGameStatus.command_slide.state = 1;
            var b = this, c = 0, d = parseInt(stage.gGameStatus.command_slide.now_pos) - 1;
            0 > d && (d = stage.gGameStatus.player.number);
            for (var e = d; e >= 0; e--) {
                if (1 == stage.gGameStatus.player.param[e].alive) {
                    c = e;
                    break
                }
                0 == e && (e = stage.gGameStatus.player.number + 1)
            }
            var f = c + 1, g = parseInt(stage.gGameStatus.command_slide.now_pos) + 1;
            a(".prt-command .chara" + g).addClass("anim-slide-command-right"), a(".prt-command .chara" + f).addClass("slide_pre anim-slide-command-right").show().oneAnimationEnd(function () {
                a(".prt-command .chara" + g).hide().removeClass("anim-slide-command-right"), a(this).removeClass("anim-slide-command-right slide_pre"), stage.gGameStatus.command_slide.now_pos = c, stage.gGameStatus.command_slide.state = 0, b.motionChangeAbility(stage.gGameStatus.command_slide.now_pos)
            }, 250), i.mSetIntervalPlayerConditions(f)
        }
    }, slideNext: function () {
        if (1 != stage.gGameStatus.command_slide.state) {
            stage.gGameStatus.command_slide.state = 1;
            var b = this, c = 0, d = parseInt(stage.gGameStatus.command_slide.now_pos) + 1;
            d > stage.gGameStatus.player.number && (d = 0);
            for (var e = d; e <= stage.gGameStatus.player.number; e++) {
                if (1 == stage.gGameStatus.player.param[e].alive) {
                    c = e;
                    break
                }
                e == stage.gGameStatus.player.number && (e = -1)
            }
            var f = c + 1, g = parseInt(stage.gGameStatus.command_slide.now_pos) + 1;
            a(".prt-command .chara" + g).addClass("anim-slide-command-left"), a(".prt-command .chara" + f).addClass("slide_next anim-slide-command-left").show().oneAnimationEnd(function () {
                a(".prt-command .chara" + g).hide().removeClass("anim-slide-command-left"), a(this).removeClass("anim-slide-command-left slide_next"), stage.gGameStatus.command_slide.now_pos = c, stage.gGameStatus.command_slide.state = 0, b.motionChangeAbility(stage.gGameStatus.command_slide.now_pos)
            }, 250), i.mSetIntervalPlayerConditions(f)
        }
    }, hideLog: function (b) {
        var c = this.$el.find(".prt-raid-log");
        c.hide();
        var d = a(document.elementFromPoint(b.x, b.y)).parent();
        d.hasClass("lis-ability") && (d.addClass("on"), o.playSE("se/btn_se/btn_se_03.mp3"), this.popShowAbility({currentTarget: d[0]}))
    }, SelectSummon: function (b) {
        stage.gGameStatus.btn_lock || a(b.currentTarget).parents(".pop-summon-detail").hasClass("disable") || (a(".pop-summon-detail").hide(), this.hideMask(), stage.gGameStatus.motion = !0, a(".btn-attack-start").removeClass("display-on"), stage.gAryRootParts[0][stage.gGameParam.cjs.parts[0]].gotoAndPlay("tap_out"), stage.gAryRootParts[1][stage.gGameParam.cjs.parts[1]].gotoAndPlay("out"), this.SummonUse())
    }, hideMask: function () {
        this.getMask().css("display", "none")
    }, showMask: function () {
        this.getMask().css("display", "block")
    }, getMask: function () {
        var b = a(".mask");
        return this.getMask = function () {
            return b
        }, this.getMask()
    }, SelectAbility: function () {
        stage.gGameStatus.action.ab_select = stage.gGameStatus.attackQueue.index[0], stage.gGameStatus.motion = !0, stage.gGameStatus.usingAbility = 1, this.AbilityUse()
    }, StoreAttackQueue: function (a, b) {
        if (!stage.gGameStatus.btn_lock) {
            if (stage.gGameStatus.btn_lock = !0, "AttackSwitch" === a)return stage.gGameStatus.attackQueue.index.push(a), stage.gGameStatus.attackQueue.param.push(a), stage.gGameStatus.attackQueue.$useAbility.push(a), void(1 === stage.gGameStatus.attackQueue.index.length && this.AttackSwitch());
            if (3 === stage.gGameStatus.abilityRailUse) {
                var c = this.$el.find(".prt-ability-dialog");
                if (c.hasClass("disable"))return void(stage.gGameStatus.btn_lock = !1);
                c.addClass("disable"), this.$el.find(".btn-attack-start").removeClass("display-on"), stage.gAryRootParts[0][stage.gGameParam.cjs.parts[0]].gotoAndPlay("out")
            }
            1 == stage.gGameStatus.ability_popup && (this.$el.find(".prt-ability-dialog").hide(), this.hideMask()), this.$el.find(".pop-summon-detail").addClass("disable"), stage.gGameStatus.attackQueue.$useAbility.push(stage.gGameStatus.attackQueue.$useAbilityTmp);
            var d = stage.gGameStatus.attackQueue.$useAbility[stage.gGameStatus.attackQueue.$useAbility.length - 1], e = this.$el.find(".btn-ability-use"), f = e.attr("ability-character-num"), g = e.attr("ability-name");
            stage.gGameStatus.attackQueue.index.push({num: f, name: g});
            var h, i = e.attr("ability-id");
            h = void 0 !== a && b === !0 ? a : {raid_id: stage.pJsnData.raid_id, target_num: stage.gGameStatus.$target, lock: stage.gGameStatus.lock, ability_id: i, ability_character_num: f, ability_sub_param: stage.gGameStatus.ability_sub_param, ability_aim_num: stage.gGameStatus.ability_aim_num}, stage.gGameStatus.attackQueue.param.push(h);
            var j = d.find('[class^="ico-ability"]'), k = j.attr("class").split(" ")[0];
            this.AddAttackQueueUI(k), ("0" != j.attr("recaset-default") || stage.gGameStatus.ability_sub_param.length > 0) && (d.find(".ico-ability-shine").attr("style", "display : block"), d.addClass("tmp-mask")), stage.gGameStatus.ability_sub_param = [], stage.gGameStatus.btn_lock = !1, stage.gGameStatus.attackQueue.index.length <= 1 && this.SelectAbility()
        }
    }, SelectAbilityRailIcon: function (b) {
        var c = a(b.currentTarget), d = parseInt(c.attr("index"));
        0 !== d && stage.gGameStatus.attackQueue.$useAbility[d] && "AttackSwitch" != stage.gGameStatus.attackQueue.index[d] && (o.playSE("se/btn_se/btn_se_03.mp3"), this.RemoveAttackQueueUI(d), this.RemoveAttackQueue(d))
    }, RemoveAttackQueue: function (a) {
        stage.gGameStatus.attackQueue.index.splice(a, 1), stage.gGameStatus.attackQueue.param.splice(a, 1);
        var b = stage.gGameStatus.attackQueue.$useAbility;
        b[a].removeClass("tmp-mask"), b[a].find(".ico-ability-shine").removeAttr("style"), b.splice(a, 1)
    }, ResetAllAttackQueue: function () {
        this.RemoveAttackQueueUI("all");
        var a = this.$el.find(".tmp-mask");
        a.removeClass("tmp-mask"), a.find(".ico-ability-shine").removeAttr("style"), stage.gGameStatus.attackQueue = {index: [], param: [], $useAbility: [], $useAbilityTmp: stage.gGameStatus.attackQueue.$useAbilityTmp, attackButtonPushed: !1, abilityRailUI: stage.gGameStatus.attackQueue.abilityRailUI, charaChangeFlag: !1}, this.$el.find(".pop-summon-detail").removeClass("disable")
    }, AddAttackQueueUI: function (a) {
        if (3 !== stage.gGameStatus.abilityRailUse) {
            this.$el.find(".prt-ability-rail-overlayer").removeClass("hide");
            var b = stage.gGameStatus.attackQueue.$useAbility;
            if (!(stage.gGameStatus.attackQueue.$useAbility.length > 5)) {
                var c = null === stage.gGameStatus.attackQueue.abilityRailUI ? !1 : !0;
                c || (stage.gGameStatus.attackQueue.abilityRailUI = this.createAbilityRailComponent());
                var d = [], a = b[b.length - 1].find('[class^="ico-ability"]').attr("class").split(" ")[0].split("ico-ability")[1];
                d.push(a), stage.gGameStatus.attackQueue.abilityRailUI.addIcon(b.length - 1, d)
            }
        }
    }, RemoveAttackQueueUI: function (a) {
        if (3 !== stage.gGameStatus.abilityRailUse) {
            var b = null === stage.gGameStatus.attackQueue.abilityRailUI ? !1 : !0;
            if (b) {
                var c = stage.gGameStatus.attackQueue.$useAbility, d = c.length;
                if ("all" == a || 0 === d)return void(b && (stage.gGameStatus.attackQueue.abilityRailUI.hide(), this.$el.find(".prt-ability-rail-overlayer").addClass("hide")));
                if (void 0 === a && (a = 0), "AttackSwitch" != c[a]) {
                    for (var e = [], f = 0; 6 > f && d > f; f++)if ("AttackSwitch" != c[f]) {
                        var g = c[f].find('[class^="ico-ability"]').attr("class").split(" ")[0].split("ico-ability")[1];
                        e.push(g)
                    }
                    stage.gGameStatus.attackQueue.abilityRailUI.removeIcon(a, e)
                }
            }
        }
    }, AttackSwitch: function () {
        if (stage.gGameStatus.is_normal_attack = !0, "ability" === stage.gGameStatus.menu || "summon" === stage.gGameStatus.menu) {
            a(".prt-command-chara").hide(), a(".prt-slide-icon").removeClass("show-icon"), a(".prt-navi").removeClass("active display-on"), a(".btn-command-back").removeClass("display-on"), this.CommandChangeTop({motion: !1});
            for (var b = 0; b <= stage.gAryRootAvatar.length - 1; b++)1 == stage.gGameStatus.player.param[b].alive && (parseInt(stage.gGameStatus.player.param[b].recast) >= parseInt(stage.gGameStatus.player.param[b].recastmax) && 1 != stage.gGameStatus.lock ? f.mChangeMotionInstantly({motion: "ability", pos: b, type: "player"}) : f.mChangeMotionInstantly({motion: stage.gGameStatus.defaultmotion, pos: b, type: "player"}));
            stage.gAryRootParts[0][stage.gGameParam.cjs.parts[0]].gotoAndPlay("tap_out"), stage.gAryRootParts[1][stage.gGameParam.cjs.parts[1]].gotoAndPlay("out");
            var c = stage.gAryRootParts[1][stage.gGameParam.cjs.parts[1]][stage.gGameParam.cjs.parts[1] + "_out"].timeline.duration;
            setTimeout(function () {
                stage.gAryCntnParts[1].visible = !1
            }, c * stage.gGameParam.spf)
        }
        return"AttackSwitch" !== stage.gGameStatus.attackQueue.index[stage.gGameStatus.attackQueue.index.length - 1] ? (stage.gGameStatus.attackQueue.attackButtonPushed = !0, this.StoreAttackQueue("AttackSwitch"), this.$el.find(".btn-attack-start").removeClass("display-on"), void stage.gAryRootParts[0][stage.gGameParam.cjs.parts[0]].gotoAndPlay("tap_out")) : (stage.gGameStatus.attacking = 1, this.trigger(Ma), this.AttackHide(), (!stage.pJsnData.is_arcade || stage.pJsnData.is_arcade && !stage.pJsnData.arcade.is_bonus) && i.mTurn(stage.gGameStatus.turn), void this.Attack())
    }, AttackHide: function () {
        a(".btn-command-back").removeClass("display-on"), a(".btn-attack-start, .img-diagram, .prt-temporary, .cnt-raid-information .btn-chat").removeClass("display-on").addClass("display-off"), a(".prt-battl-state").removeClass("ready").addClass("player"), a(".img-score").hasClass("display-on") && a(".img-score").removeClass("display-on")
    }, playScenarios: function (c, d, e, f, h) {
        console.ll('playScenarios');
        var i = this;
        d = d || 0, e = e || 0, b.isUndefined(stage.pJsnData.rep) || (c = stage.pJsnData.rep[stage.gGameStatus.rep], stage.gGameStatus.rep++), i.preprocessOnPlayScenarios(c);
        var j = g.mInit("avatar"), k = g.mInit("boss"), l = g.mInit("common"), m = i.coreprocessOnPlayScenarios(j, k, l, c, d, e, f, h), n = new a.Deferred;
        return m.done(function (a) {
            i.postprocessOnPlayScenarios(j, k, l, c, h), a.push(new createjs.Timeline([].concat(j.timeline, k.timeline, l.timeline), {start: 0}, {useTicks: !0, paused: !0}));
            for (var b = 0; b <= a.length - 1; b++)a[b].setPaused(!1);
            n.resolve()
        }), n
    }, preprocessOnPlayScenarios: function (c) {
        "block" === a("#pop .pop-usual").css("display") && stage.gGameStatus.attackQueue.index > 0 && (a("#pop .pop-usual").css("display", "none").removeClass("pop-show pop-hide"), this.hideMask(), b.isUndefined(this.popView) || this.popView.popOff()), "block" === a(".pop-usual").css("display") && stage.gGameStatus.attackQueue.index > 0 && (a(".pop-usual").css("display", "none").removeClass("pop-hide"), this.hideMask()), 1 != stage.pJsnData.multi || b.isUndefined(c.status) || (c.status.fellow && (stage.pJsnData.fellow = c.status.fellow), c.status.timer && (stage.pJsnData.timer = c.status.timer));
        for (var d = null, e = 0; e <= c.scenario.length - 1; e++)if ("attack" === c.scenario[e].cmd || "special" === c.scenario[e].cmd || "special_npc" === c.scenario[e].cmd) {
            d = c.scenario[e].pos;
            break
        }
        if ("ability" !== stage.gGameStatus.menu && "summon" !== stage.gGameStatus.menu && "temporary" !== stage.gGameStatus.menu)for (var e = 0; e <= stage.gGameStatus.player.number; e++) {
            var f = a(".prt-command-top div.lis-character" + e);
            e != d && f.addClass("mask-black-fade")
        }
        for (var e = 0; e <= stage.gAryCntnBoss.length - 1; e++)1 == stage.gGameStatus.boss.param[e].alive && (stage.gAryCntnBoss[e].visible = !0);
        this.hideEnemyInfo()
    }, coreprocessOnPlayScenarios: function (c, d, e, h, i, j, m, n) {
        var o = this, p = [];
        p = p.concat(b.pluck(h.scenario, "kind")), p = p.concat(b.pluck(h.scenario, "effect"));
        for (var q = 0; q <= h.scenario.length - 1; q++) {
            if ("object" == typeof h.scenario[q].list)for (var r = 0; r <= h.scenario[q].list.length - 1; r++)p = p.concat(b.pluck(h.scenario[q].list[r].damage, "kind")), p = p.concat(b.pluck(h.scenario[q].list[r].damage, "effect"));
            "formchange" === h.scenario[q].cmd && (p = p.concat(h.scenario[q].param.cjs), p = p.concat(h.scenario[q].param.effect)), "attack" === h.scenario[q].cmd && b.each(h.scenario[q].damage, function (a) {
                b.isUndefined(a[0].additional) || b.each(a[0].additional, function (a) {
                    a.effect && (p = p.concat(a.effect.kind))
                })
            })
        }
        p = b.filter(p, function (a) {
            return a
        }), p.length < 1 && stage.pJsnData.player.param[0].effect && (p = [stage.pJsnData.player.param[0].effect]);
        var s = new a.Deferred;
        return setTimeout(b.partial(k.loadFiles, p, !0), 0), k.once("complete", function () {
            l.once("complete", function () {
                for (var b = 0; b <= stage.gAryCntnAvatar.length - 1; b++)c.timeline[b] = createjs.Tween.get(stage.gAryCntnAvatar[b], {override: !0, paused: !0});
                for (var b = 0; b <= stage.gAryCntnBoss.length - 1; b++)d.timeline[b] = createjs.Tween.get(stage.gAryCntnBoss[b], {override: !0, paused: !0});
                e.timeline[0] = createjs.Tween.get({}, {override: !0, paused: !0});
                var k = [], l = new Date - j, p = parseInt(l / stage.gGameParam.spf + .5);
                i > p && f.mWaitAll([c, d, e], {playtime: p - i}), stage.gGameStatus.balloon = "attack", stage.gGameStatus.message_count = 0, f.mWaitAll([c, d, e], {playtime: 6});
                var q = new a.Deferred;
                o.setupScenarios(h, c/*player timeline*/, d/*boss timeline*/, e, m, n).done(function () {
                    q.resolve()
                }).fail(function () {
                    q.reject()
                }), a.when(q).done(function () {
                    k.push(new createjs.Timeline([].concat(c.timeline, d.timeline, e.timeline), {start: 0}, {useTicks: !0, paused: !0}));
                    var a = g.mResetTimeline(k, [c, d, e]);
                    c = a[0], d = a[1], e = a[2], o.oTweenCommon = e, s.resolve(k)
                })
            });
            var b = "";
            if (stage.pJsnData.player.job_is_formchange) {
                var k = Game.imgUri + "/sp/cjs/" + stage.pJsnData.weapon.weapon + ".png";
                b = {src: k, id: "weapon", type: "image"}
            }
            l.loadManifest([b])
        }), s
    }, postprocessOnPlayScenarios: function (c, d, e, g, h) {
        var j = this;
        if (e.timeline[0].call(function () {
            stage.gGameStatus.retire || g.tutorial_pause || (b.isUndefined(g.status) || (b.isUndefined(g.status.summon) || a('.prt-command-summon div[class^="lis-summon"]').each(function (a) {
                b.isUndefined(stage.pJsnData.summon[a]) || (stage.pJsnData.summon[a].recast = String(g.status.summon.recast[a]))
            }), b.isUndefined(g.status.supporter) || (stage.pJsnData.supporter.recast = String(g.status.supporter.recast)), b.isUndefined(g.status.summon_enable) || (stage.pJsnData.summon_enable = g.status.summon_enable), b.isUndefined(g.status.ability) || (stage.pJsnData.ability = g.status.ability, b.each(stage.pJsnData.ability, function (a) {
                var c = b.indexOf(stage.pJsnData.formation, "" + a.pos);
                i.mSetAbility(a, c)
            })), b.isUndefined(g.status.treasure) || (stage.pJsnData.treasure.treasure_type_1 = g.status.treasure.treasure_type_1, stage.pJsnData.treasure.treasure_type_2 = g.status.treasure.treasure_type_2, stage.pJsnData.treasure.treasure_type_3 = g.status.treasure.treasure_type_3, stage.pJsnData.treasure.treasure_type_4 = g.status.treasure.treasure_type_4, stage.pJsnData.treasure.treasure_type_5 = g.status.treasure.treasure_type_5), b.isUndefined(g.status.balloon) || (stage.pJsnData.balloon.boss = g.status.balloon.boss, i.mBalloon(e.timeline[0])), b.isUndefined(g.status.lupi) || (stage.pJsnData.lupi = g.status.lupi), b.isUndefined(g.status.turn) || (stage.gGameStatus.turn = g.status.turn), stage.pJsnData.is_arcade && stage.pJsnData.arcade.is_bonus && (stage.gGameStatus.remain_turn = +stage.pJsnData.arcade.bonus_maxtrun - +g.status.turn + 1), stage.gGameStatus.defaultmotion = 1 == stage.pJsnData.battle.count && 1 == stage.gGameStatus.turn ? "wait" : "stbwait", b.each(stage.pJsnData.boss.param, function (a, b) {
                stage.gGameStatus.bossmode.already_changed[b] = !1
            }), !stage.gGameStatus.field.hasFieldEffect && a("#prt-field-conditions").hasClass("show") && i.mRemoveConditionField()), stage.gGameStatus.action = {ab_select: ""})
        }), f.mWaitAll([c, d, e], {playtime: 15}), 1 == stage.pJsnData.is_multi && stage.gGameStatus.attack_count > 0 && stage.gGameStatus.attack_count % j.attackCount == 0 && !stage.gGameStatus.finish && !stage.gGameStatus.retire && !stage.gGameStatus.lose && !stage.gGameStatus.clear && 0 === Game.setting.cjs_mode) {
            e.timeline[0].call(function () {
                i.mHideBossGauge(wa)
            }), c.timeline[0].pause(), d.timeline[0].pause(), e.timeline[0].pause();
            var k = i.mBattleReload(e.timeline[0], {kind: stage.gGameParam.cjs.raid_reload});
            f.mWaitAll([c, d, e], {playtime: k + 6}), e.timeline[0].call(function () {
                i.mSlideOut(), setTimeout(function () {
                    j.content_close();
                    var a = stage.pJsnData.is_semi ? "#raid_semi/" + stage.pJsnData.raid_id : "#raid_multi/" + stage.pJsnData.raid_id + "/" + (j.currentFps / 6 - 1) + "/" + stage.gGameStatus.lock;
                    u.hash(a, {refresh: !0})
                }, 500 * (j.currentFps / j.baseFps))
            }), f.mWaitAll([c, d, e], {playtime: 120})
        }
        e.timeline[0].call(function () {
            stage.gGameStatus.already_finish || j.inactivateMask();
            var c = a("body");
            Game.ua.isJssdk() && (c = a("#mobage-game-container")), c.off("cgtouchstart"), j.checkPlayerAllDead(), stage.gGameStatus.pop_limit = !1, stage.gGameStatus.btn_lock = !1;
            var d = g.battleFinishedByThisScenarios || stage.gGameStatus.finish;
            if (!(d || stage.gGameStatus.retire || stage.gGameStatus.lose || g.tutorial_pause || stage.gGameStatus.node_finish)) {
                var e = a(".prt-command-top .prt-member div[class^='lis-character']");
                e.removeClass("mask-black mask-black-fade");
                var e = a(".prt-command-summon .prt-list-top");
                if (e.removeClass("mask-black mask-black-fade"), a(".prt-sub-command>div").removeClass("black"), "none" !== (((g.navi_information || {})[0] || {}).navi || "none")) {
                    stage.pJsnData.navi_information = g.navi_information;
                    var h = j.getForceNaviIndex(stage.pJsnData.navi_information), k = !(0 == stage.gGameStatus.serif && 0 == stage.pJsnData.is_force_navi) || h >= 0;
                    if (!stage.gGameStatus.auto_attack && k) {
                        stage.pJsnData.navi_index = h >= 0 ? h : 0;
                        var l = stage.pJsnData.navi_information[stage.pJsnData.navi_index];
                        l && j.NaviShow(l)
                    } else a(".prt-navi").removeClass("active")
                } else a(".prt-navi").removeClass("active");
                if ("normal_attack_result" == stage.gGameStatus.attack_action ? (j.showEnemyInfo(), stage.gGameStatus.attackQueue.attackButtonPushed = !1) : j.showEnemyInfo({targetedEnemyOnly: !0}), g.status && g.status.voice) {
                    var m, n;
                    (m = g.status.voice.special_skill_gauge_voice) ? o.playVoice(m) : (n = g.status.voice.dying_voice) && o.playVoice(n)
                }
                if (a(".prt-ability-dialog").removeClass("disable"), j.renewCharaList(), stage.gGameStatus.pop_revival = !1, !stage.gGameStatus.auto_attack && stage.gGameStatus.attackQueue.index.length <= 1 && (stage.gAryRootParts[0][stage.gGameParam.cjs.parts[0]].gotoAndPlay("in"), a(".btn-attack-start").removeClass("display-off").addClass("display-on"), j._outAutoButton(), j._noInteractiveAutoButton()), stage.pJsnData.suddenly_attack_flag = !1, stage.gAryCntnParts[0].visible = !0, g.status && stage.pJsnData.is_semi && g.status.ranking && j.updateDamageRanking(g.status.ranking), "ability" === stage.gGameStatus.menu) {
                    stage.gGameStatus.balloon = "ability", stage.gGameStatus.motion = !1, stage.gGameStatus.attacking = 0;
                    var p = stage.gGameStatus.useAbilityPos || +stage.gGameStatus.command_slide.now_pos, e = a(".prt-command-chara").eq(p);
                    b.isUndefined(stage.gGameStatus.player.param[p]) || 1 !== stage.gGameStatus.player.param[p].alive ? (stage.gGameStatus.usingAbility = 0, stage.gGameStatus.menu = "top", j.inactivateMask()) : p !== +stage.gGameStatus.command_slide.now_pos || !e.find("[class^='lis-ability'] div").hasClass("shine0") && (parseInt(stage.gGameStatus.player.param[p].recast) < parseInt(stage.gGameStatus.player.param[p].recastmax) || 1 == stage.gGameStatus.lock) ? f.mChangeMotionInstantly({motion: "stbwait", pos: p, type: "player"}) : b.isUndefined(stage.gGameStatus.hide_ability_pos) && f.mChangeMotionInstantly({motion: "ability", pos: p, type: "player"}), stage.pJsnData.is_semi && stage.pJsnData.is_defendorder || a(".btn-chat").removeClass("display-off").addClass("display-on")
                } else"summon" === stage.gGameStatus.menu ? (stage.gGameStatus.balloon = "summon", stage.gAryRootParts[1][stage.gGameParam.cjs.parts[1]].gotoAndPlay("in"), stage.gGameStatus.usingAbility || j.CommandBackTop()) : "rematch" === stage.gGameStatus.menu ? (stage.pJsnData.bgm && E(stage.pJsnData.bgm), i.mShowBossGauge(wa), j.renewCharaList(), j.CommandBackTop()) : "temporary" === stage.gGameStatus.menu ? (stage.gGameStatus.balloon = "wait", stage.gGameStatus.motion = !1, stage.gGameStatus.menu = "top", j.CommandBackTop()) : (stage.gGameStatus.balloon = "wait", stage.gGameStatus.motion = !1, j.CommandChangeTop())
            }
            1 == stage.pJsnData.tutorial_flag && j.TutorialTurnEnd()
        }), e.timeline[0].call(function () {
            stage.gGameStatus.tutorial_state = g.tutorial_pause
        }), e.timeline[0].call(function () {
            stage.gGameStatus.attacking = 0, stage.gGameStatus.usingAbility = 0
        }), e.timeline[0].call(function () {
            b.isUndefined(g.duplicate_key) || (stage.pJsnData.duplicate_key = g.duplicate_key)
        }), e.timeline[0].call(function () {
            va(), j.invokeAttackPendingQueue(), j.invokeAbilityPendingQueue()
        }), b.isUndefined(h) || e.timeline[0].call(function () {
            h.resolve()
        }), e.timeline[0].call(function () {
            !stage.gGameStatus.is_normal_attack || !stage.gGameStatus.auto_attack || stage.gGameStatus.attacking || stage.gGameStatus.finish || stage.gGameStatus.retire || stage.gGameStatus.lose || g.tutorial_pause || stage.gGameStatus.node_finish || (stage.gGameStatus.is_normal_attack = !1, j.AttackSwitch())
        }), e.timeline[0].call(function () {
            return stage.gGameStatus.finish || stage.gGameStatus.already_finish || "normal_attack_result" !== stage.gGameStatus.attack_action && "ability_result" !== stage.gGameStatus.attack_action ? void j.ResetAllAttackQueue() : ("AttackSwitch" === stage.gGameStatus.attackQueue.param[0] ? j.ResetAllAttackQueue() : j.RemoveAttackQueueUI(0), stage.gGameStatus.attackQueue.charaChangeFlag && stage.gGameStatus.attackQueue.index.length > 1 ? (j.popShowAbilityError("raid_84", "raid_85"), stage.gGameStatus.attacking = 0, stage.gGameStatus.usingAbility = 0, stage.gGameStatus.btn_lock = !1, j.ResetAllAttackQueue(), stage.gAryRootParts[0][stage.gGameParam.cjs.parts[0]].gotoAndPlay("in"), a(".btn-attack-start").removeClass("display-off").addClass("display-on"), void j.CommandBackTop()) : (stage.gGameStatus.attackQueue.charaChangeFlag && (j.$el.find(".pop-usual").css("display", "none"), j.hideMask(), stage.gGameStatus.attackQueue.charaChangeFlag = !1), stage.gGameStatus.attackQueue.index[0] && j.RemoveAttackQueue(0), 0 === stage.gGameStatus.attackQueue.index.length ? (j.ResetAllAttackQueue(), void j.$el.find(".pop-summon-detail").removeClass("disable")) : void("AttackSwitch" === stage.gGameStatus.attackQueue.param[0] ? j.AttackSwitch() : j.SelectAbility())))
        })
    }, playScenariosImmediately: function (a, b, c, d, e) {
        b = b || 0, c = c || 0;
        var f = g.mInit("avatar"), h = g.mInit("boss"), i = g.mInit("common"), j = this.coreprocessOnPlayScenarios(f, h, i, a, b, c, d, e);
        j.done(function (a) {
            a.push(new createjs.Timeline([].concat(f.timeline, h.timeline, i.timeline), {start: 0}, {useTicks: !0, paused: !0}));
            for (var b = 0; b <= a.length - 1; b++)a[b].setPaused(!1)
        })
    }, setupScenarios: function (e/*json*/, g/*player time line*/, k/*boss time line*/, p/*common time line*/, q, s) {
        var t = this, v = window.stage, w = (new a.Deferred).resolve(), x = e.scenario, y = e.status, z = e.ability_id, A = !1, B = 0, D = 0, F = {};
        v.global = {}, v.gGameStatus.hide_ability_pos = void 0, v.gGameStatus.field.hasFieldEffect = !1;
        var G = !1;
        return b.isUndefined(y) || b.isUndefined(y.bossmode) || b.each(y.bossmode, function (a, c) {
            if (null != y.bossmode[c].modechange) {
                var d = !1, e = !1, f = !1, h = null;
                b.some(x, function (a, b) {
                    "turn" === a.cmd && (e = !0), e && "modechange" === a.cmd && c === a.pos && (d = !0, h = a.mode)
                }), (!d || h && h != y.bossmode[c].modechange) && (f = !0), f && v.gGameStatus.bossmode.looks.mode[c] != y.bossmode[c].modechange && (t.executeModeChange(y.bossmode[c].modechange, [g, k, p], y.bossmode[c].special_gauge, null, y.bossmode[c].log_type, c), i.mBreakGauge(p.timeline[0], wa[c], {pos: y.bossmode[c].pos, gauge: y.bossmode[c].modegauge}), v.gGameStatus.bossmode.looks.mode[c] = y.bossmode[c].modechange, v.gGameStatus.bossmode.already_changed[c] = !0, G = !0)
            }
        }), G && f.mWaitAll([g, k, p], {playtime: 12}), y && y.voice && (y.voice.special_skill_gauge_voice && o.loadVoice(y.voice.special_skill_gauge_voice), y.voice.dying_voice && o.loadVoice(y.voice.dying_voice)), v.pJsnData.is_multi && v.pJsnData.is_semi !== !0 || v.gGameStatus.auto_attack || !v.gGameStatus.auto_attack_display_flag || !v.gGameStatus.auto_button || "normal_attack_result" != v.gGameStatus.attack_action || (t._inAutoButton(), t._showAutoButton(), t._interactiveAutoButton()), b.some(x, function (G, H) {
            return!v.gGameStatus.finish || v.gGameStatus.node_finish || v.gGameStatus.already_finish || v.gGameStatus.retire || !(b.isUndefined(s) || "rematch" !== G.cmd && v.pJsnData.is_watching === !0) ? void(w = w.then(function () {
                var w = new a.Deferred, I = [], J = new a.Deferred;
                switch (G.voice && (b.isArray(G.voice) ? I = I.concat(b.compact(G.voice)) : I.push(G.voice)), G.damage && (I = I.concat(b.chain(G.damage).pluck("voice").compact().value())), G.list && (I = I.concat(b.chain(G.list).pluck("damage").flatten().compact().pluck("voice").compact().value())), G.kill_voice && G.kill_voice.path && I.push(G.kill_voice.path), b.isEmpty(I) ? J.resolve() : (n.once("complete", function () {
                    J.resolve()
                }), n.loadFiles(I), J.resolve()), v.global = b.extend(v.global, G.global), G.cmd) {
                    case"turn":
                        "boss" === G.mode && p.timeline[0].call(function () {
                            v.gAryRootParts[2][v.gGameParam.cjs.parts[2]].gotoAndPlay("change")
                        }), A = !0, w.resolve();
                        break;
                    case"attack":
                        if ("player" === G.from) {
                            p.timeline[0].call(function () {
                                v.gMasterContainer.setChildIndex(v.gBossContainer, 0), v.gMasterContainer.setChildIndex(v.gPlayerContainer, 1)
                            }), v.gGameStatus.replacehit[G.pos] && (v.gGameStatus.player.param[G.pos].effect = v.gGameStatus.replacehit[G.pos], v.gGameStatus.replacehit[G.pos] = ""), i.mDisplayStrip(p.timeline[0], {mode: "on", pos: G.pos});
                            var K = 0, L = G.damage.length;
                            b.each(G.damage, function (a) {
                                if (0 == G.single_motion_flag) {
                                    var c = 0;
                                    b.each(a, function (a) {
                                        K > 0 && K == L - 1 && p.timeline[0].call(function () {
                                            var a = C.replaceMessage(2 == L ? "raid_6" : "raid_7", [v.gGameStatus.player.param[G.pos].name]), b = {"class": "log-battle", title: C.getMessage("raid_8"), body: a};
                                            i.mLog(b)
                                        });
                                        var d = 1 == v.pJsnData.player.param[v.pJsnData.formation[G.pos]].leader ? "mortal_A" : "short_attack", e = 0 == K ? 1 == L ? "attack" : d : 1 == K ? "double" : "triple";
                                        if (c = f.mChangeMotion(g.timeline[G.pos], {motion: e, pos: G.pos, type: "player", voice: G.voice ? G.voice[K] : null}), K == L - 1 && f.mChangeMotion(g.timeline[G.pos], {delay: c, motion: "stbwait", pos: G.pos, type: "player"}), h.mHitEffect(k.timeline[a.pos], v.gAryCntnBoss[a.pos], {kind: v.gGameStatus.player.param[G.pos].effect, size: v.pJsnData.boss.type, type: "boss", pos: a.pos}), b.isUndefined(a.miss) || 1 != a.miss)var j = f.mChangeMotion(k.timeline[a.pos], {motion: "damage", pos: a.pos, type: "boss", delay: 2});
                                        f.mWaitAll([g, k, p], {playtime: 2}), h.mDamageRattle(p.timeline[0]);
                                        var l = a.color || G.color || v.gGameStatus.player.param[G.pos].attr, m = t.createDamageComponent(a, "boss", L > 1, l, void 0);
                                        k.timeline[a.pos].call(function () {
                                            m.show()
                                        }), (b.isUndefined(a.miss) || 1 != a.miss) && (i.mBossGaugeHp(k.timeline[a.pos], wa, v.pJsnData.boss.type, {pos: a.pos, param: {hp: a.hp, hpmax: v.gGameStatus.boss.param[a.pos].hpmax}}), f.mChangeMotion(k.timeline[a.pos], {motion: v.gGameStatus.waitmode[a.pos], pos: a.pos, type: "boss", delay: j})), a.additional && b.each(a.additional, function (a) {
                                            a.message && t.executeMessage([g, k, p], a.message), a.effect && t.executeEffect([g, k, p], a.effect)
                                        })
                                    }), L >= 2 ? f.mWaitAll([g, k, p], {playtime: 9}) : f.mWaitAll([g, k, p], {playtime: 9})
                                } else {
                                    K > 0 && K == L - 1 && p.timeline[0].call(function () {
                                        var a = C.replaceMessage(2 == L ? "raid_6" : "raid_7", [v.gGameStatus.player.param[G.pos].name]), b = {"class": "log-battle", title: C.getMessage("raid_8"), body: a};
                                        i.mLog(b)
                                    });
                                    var d = 1 == v.pJsnData.player.param[v.pJsnData.formation[G.pos]].leader ? "mortal_A" : "short_attack", e = 0 == K ? 1 == L ? "attack" : d : 1 == K ? "double" : "triple", j = f.mChangeMotion(g.timeline[G.pos], {motion: e, pos: G.pos, type: "player", voice: G.voice ? G.voice[0] : null});
                                    f.mWaitAll([g, k, p], {playtime: 2}), K == L - 1 && f.mChangeMotion(g.timeline[G.pos], {delay: j, motion: "stbwait", pos: G.pos, type: "player"});
                                    var l = 0;
                                    b.each(a, function (c) {
                                        var d = c.concurrent_attack_count;
                                        if ((G.concurrent_attack_flag === !1 || 0 === d) && (l = h.mHitEffect(k.timeline[c.pos], v.gAryCntnBoss[c.pos], {kind: v.gGameStatus.player.param[G.pos].effect, size: v.pJsnData.boss.type, type: "boss", pos: c.pos})),
                                            G.concurrent_attack_flag === !0 && 0 === d || G.concurrent_attack_flag === !1 && (b.isUndefined(c.miss) || 1 != c.miss))
                                            var e = f.mChangeMotion(k.timeline[c.pos], {motion: "damage", pos: c.pos, type: "boss"});
                                        h.mDamageRattle(p.timeline[0]);
                                        var j = c.color || G.color || v.gGameStatus.player.param[G.pos].attr, m = t.createDamageComponent(c, "boss", L > 1, j, b.isNull(d) ? void 0 : d);
                                        if (k.timeline[c.pos].call(function () {
                                            m.show()
                                        }), 0 === d && f.mWaitAll([g, k, p], {playtime: 3}), b.isUndefined(c.miss) || 1 != c.miss) {
                                            var n = G.concurrent_attack_flag && a.length == d + 1;
                                            i.mBossGaugeHp(k.timeline[c.pos], wa, v.pJsnData.boss.type, {pos: c.pos, param: {hp: c.hp, hpmax: v.gGameStatus.boss.param[c.pos].hpmax, isConcurrentLastAttack: n}}), (G.concurrent_attack_flag === !0 && 0 === d || G.concurrent_attack_flag === !1) && f.mChangeMotion(k.timeline[c.pos], {motion: v.gGameStatus.waitmode[c.pos], pos: c.pos, type: "boss", delay: e})
                                        }
                                        c.additional && b.each(c.additional, function (a) {
                                            a.message && t.executeMessage([g, k, p], a.message), a.effect && t.executeEffect([g, k, p], a.effect)
                                        })
                                    }), G.concurrent_attack_flag === !1 && K !== L - 1 && f.mWaitAll([g, k, p], {playtime: 4}), L >= 2 ? f.mWaitAll([g, k, p], {playtime: 6}) : f.mWaitAll([g, k, p], {playtime: 9})
                                }
                                K++
                            }), B++, i.mDisplayStrip(p.timeline[0], {mode: "off", pos: G.pos})
                        } else if ("boss" == G.from) {
                            f.mWaitAll([g, k, p], {playtime: 2}), p.timeline[0].call(function () {
                                a(".prt-battl-state").removeClass("player").addClass("enemy")
                            }), 0 == D && f.mWaitAll([g, k, p], {playtime: 6}), p.timeline[0].call(function () {
                                v.gMasterContainer.setChildIndex(v.gBossContainer, 1), v.gMasterContainer.setChildIndex(v.gPlayerContainer, 0)
                            }), f.mWaitAll([g, k, p], {playtime: 4});
                            var K = 0, L = G.damage.length;
                            b.each(G.damage, function (a) {
                                b.each(a, function (a) {
                                    K > 0 && K == L - 1 && p.timeline[0].call(function () {
                                        var a = C.replaceMessage(2 == L ? "raid_6" : "raid_7", [v.gGameStatus.boss.param[G.pos].name[Game.lang]]), b = {"class": "log-battle", title: C.getMessage("raid_8"), body: a};
                                        4 > L && i.mLog(b)
                                    }), k.timeline[G.pos].call(function () {
                                        o.setPlayingVoice(!1)
                                    });
                                    var c = "attack", d = f.mChangeMotion(k.timeline[G.pos], {motion: c, pos: G.pos, type: "boss", voice: G.voice ? G.voice[K] : null}), e = d;
                                    if (k.timeline[G.pos].call(function (a, b) {
                                        var c = createjs.denaVersion ? createjs.Ticker.getInterval() : v.gGameParam.spf;
                                        setTimeout(function () {
                                            1 == v.gGameStatus.boss.param[a.pos].alive && f.mChangeMotionInstantly({motion: v.gGameStatus.waitmode[a.pos], pos: a.pos, type: "boss"})
                                        }, b * c)
                                    }, [G, d]), !b.isUndefined(v.gGameStatus.boss.param[G.pos].timing)) {
                                        var j = v.gGameParam.timing[v.gGameStatus.boss.param[G.pos].timing.effect] || !1;
                                        j && (f.mWaitAll([g, k, p], {playtime: j}), e -= j)
                                    }
                                    var d = h.mHitEffect(g.timeline[a.pos], v.gAryCntnAvatar[a.pos], {kind: v.gGameStatus.boss.param[G.pos].effect, type: "player"});
                                    if (!b.isUndefined(v.gGameStatus.boss.param[G.pos].timing)) {
                                        var j = v.gGameParam.timing[v.gGameStatus.boss.param[G.pos].timing.damage] || !1;
                                        j && (f.mWaitAll([g, k, p], {playtime: j}), e -= j)
                                    }
                                    h.mDamageRattle(p.timeline[0]);
                                    var l = t.createDamageComponent(a, "player", L > 1, v.gGameStatus.boss.param[G.pos].attr, void 0);
                                    if (g.timeline[a.pos].call(function () {
                                        l.show(), a.voice && (m.isShellAppAndroid() ? o.isPlayingVoice() || o.playVoice(a.voice) : o.playVoice(a.voice, {alias: "voice" + a.pos}))
                                    }), b.isUndefined(a.miss) || 1 != a.miss) {
                                        i.mPlayerGaugeHp(g.timeline[a.pos], {pos: a.pos, param: {hp: a.hp, hpmax: v.gGameStatus.player.param[a.pos].hpmax}});
                                        var d = f.mChangeMotion(g.timeline[a.pos], {motion: "damage", pos: a.pos, type: "player"});
                                        a.hp > 0 && f.mResetMotion(g.timeline[a.pos], {delay: d, motion: "stbwait", pos: a.pos, type: "player"})
                                    }
                                    f.mWaitAll([g, k, p], {playtime: e}), f.mWaitAll([g, k, p], {playtime: 3})
                                }), K++
                            }), f.mWaitAll([g, k, p], {playtime: 6}), D++
                        }
                        a.when(J).done(function () {
                            w.resolve()
                        });
                        break;
                    case"damage":
                        var M = 0;
                        if (G.list.length <= 0) {
                            v.gGameStatus.is_summon_simple && p.timeline[0].call(function () {
                                for (var a = 0; a <= v.gAryCntnAvatar.length - 1; a++)1 == v.gGameStatus.player.param[a].alive && (v.gAryCntnAvatar[a].visible = !0)
                            }), w.resolve();
                            break
                        }
                        "player" === G.to && (p.timeline[0].call(function () {
                            v.gMasterContainer.setChildIndex(v.gBossContainer, 1), v.gMasterContainer.setChildIndex(v.gPlayerContainer, 0)
                        }), b.each(G.list, function (a) {
                            if (G.effect) {
                                var c = h.mHitEffect(g.timeline[a.pos], v.gAryCntnAvatar[a.pos], {kind: G.effect, type: "player"});
                                f.mWaitAll([g, k, p], {playtime: c})
                            }
                            h.mDamageRattle(p.timeline[0]);
                            var d = t.createDamageComponent(a, "player", G.list.length > 1, G.color, void 0);
                            g.timeline[a.pos].call(function () {
                                d.show();
                            }), (b.isUndefined(a.miss) || 1 != a.miss) && (i.mPlayerGaugeHp(g.timeline[a.pos], {pos: a.pos, param: {hp: a.hp, hpmax: v.gGameStatus.player.param[a.pos].hpmax}}), f.mWaitAll([g, k, p], {playtime: 3}), c = f.mChangeMotion(g.timeline[a.pos], {motion: "damage", pos: a.pos, type: "player"}), a.hp > 0 && f.mResetMotion(g.timeline[a.pos], {delay: c, motion: "stbwait", pos: a.pos, type: "player"}))
                        })), "boss" === G.to && (p.timeline[0].call(function () {
                            v.gMasterContainer.setChildIndex(v.gBossContainer, 0), v.gMasterContainer.setChildIndex(v.gPlayerContainer, 1)
                        }), b.each(G.list, function (a) {
                            if (G.effect) {
                                var c = h.mHitEffect(k.timeline[a.pos], v.gAryCntnBoss[a.pos], {kind: G.effect, size: v.pJsnData.boss.type, type: "boss", pos: a.pos});
                                f.mWaitAll([g, k, p], {playtime: c}), p.timeline[0].call(function () {
                                    b.isUndefined(v.gGameStatus.hide_ability_pos) || setTimeout(function () {
                                        v.gAryCntnAvatar[v.gGameStatus.hide_ability_pos].visible = !0
                                    }, c * v.gGameParam.spf)
                                })
                            }
                            h.mDamageRattle(p.timeline[0]);
                            var d = t.createDamageComponent(a, "boss", G.list.length > 1, G.color, void 0);
                            k.timeline[a.pos].call(function () {
                                d.show()
                            }), (b.isUndefined(a.miss) || 1 != a.miss) && (i.mBossGaugeHp(k.timeline[a.pos], wa, v.pJsnData.boss.type, {pos: a.pos, param: {hp: a.hp, hpmax: v.gGameStatus.boss.param[a.pos].hpmax}}), f.mWaitAll([g, k, p], {playtime: 3}), c = f.mChangeMotion(k.timeline[a.pos], {motion: "damage", pos: a.pos, type: "boss"}), a.hp > 0 && f.mResetMotion(k.timeline[a.pos], {delay: c, motion: v.gGameStatus.waitmode[a.pos], pos: a.pos, type: "boss"}))
                        })), v.gGameStatus.is_summon_simple && (f.mWaitAll([g, k, p], {playtime: 15}), p.timeline[0].call(function () {
                            for (var a = 0; a <= v.gAryCntnAvatar.length - 1; a++)1 == v.gGameStatus.player.param[a].alive && (v.gAryCntnAvatar[a].visible = !0)
                        })), f.mWaitAll([g, k, p], {playtime: 4}), w.resolve();
                        break;
                    case"effect":
                        G.kind && t.executeEffect([g, k, p], G), w.resolve();
                        break;
                    case"windoweffect":
                        if (G.kind) {
                            var M = i.mWindowEffect(p.timeline[0], G);
                            p.timeline[0].call(function () {
                                b.isUndefined(v.gGameStatus.hide_ability_pos) || setTimeout(function () {
                                    v.gAryCntnAvatar[v.gGameStatus.hide_ability_pos].visible = !0
                                }, M * v.gGameParam.spf)
                            }), void 0 === G.wait ? f.mWaitAll([g, k, p], {playtime: M}) : parseInt(G.wait) > 0 && f.mWaitAll([g, k, p], {playtime: parseInt(G.wait)})
                        }
                        w.resolve();
                        break;
                    case"heal":
                        var M = 0;
                        "player" === G.to && ("true" === G.cutin && j.mPlayer(p.timeline[0], {text: C.getMessage("raid_9"), playtime: 24, delay: 0}), b.each(G.list, function (a) {
                            if (G.kind && (b = h.mEffect(g.timeline[a.pos], v.gAryCntnAvatar[a.pos], G)), i.mPlayerGaugeHp(g.timeline[a.pos], {pos: a.pos, param: {hp: a.hp, hpmax: v.gGameStatus.player.param[a.pos].hpmax}}), "1" === a.motion_type) {
                                f.mWaitAll([g, k, p], {playtime: 12});
                                var b = f.mChangeMotion(g.timeline[a.pos], {motion: "damage", pos: a.pos, type: "player", current_hp: a.hp}), c = t.createDamageComponent(a, "player", G.list.length > 1, 0, void 0);
                                g.timeline[a.pos].call(function () {
                                    setTimeout(function () {
                                        c.show()
                                    }, v.gGameParam.spf)
                                }), 0 < a.hp ? f.mResetMotion(g.timeline[a.pos], {delay: b, motion: "stbwait", pos: a.pos, type: "player"}) : "ability" === v.gGameStatus.menu && (t.CommandBackTop(), t.activateMask())
                            } else {
                                var d = t.createHealComponent(a.split, "player", a.pos);
                                g.timeline[a.pos].call(function () {
                                    setTimeout(function () {
                                        d.show()
                                    }, b * v.gGameParam.spf)
                                }), f.mChangeMotion(g.timeline[a.pos], {motion: "stbwait", pos: a.pos, type: "player", current_hp: a.hp})
                            }
                            f.mWaitAll([g, k, p], {playtime: 3})
                        })), "boss" === G.to && b.each(G.list, function (a) {
                            if (G.kind && (b = h.mEffect(k.timeline[a.pos], v.gAryCntnBoss[a.pos], {kind: G.kind, delay: G.delay, pos: a.pos, to: G.to, list: G.list, cjs_param: G.cjs_param})), i.mBossGaugeHp(k.timeline[a.pos], wa, v.pJsnData.boss.type, {pos: a.pos, param: {hp: a.hp, hpmax: v.gGameStatus.boss.param[a.pos].hpmax}}), "1" === a.motion_type) {
                                f.mWaitAll([g, k, p], {playtime: 12});
                                var b = f.mChangeMotion(k.timeline[a.pos], {motion: "damage", pos: a.pos, type: "boss", current_hp: a.hp}), c = t.createDamageComponent(a, "boss", G.list.length > 1, 0, void 0);
                                k.timeline[a.pos].call(function () {
                                    setTimeout(function () {
                                        c.show()
                                    }, v.gGameParam.spf)
                                }), 0 < a.hp && f.mResetMotion(k.timeline[a.pos], {delay: b, motion: v.gGameStatus.waitmode[a.pos], pos: a.pos, type: "boss"})
                            } else {
                                var d = t.createHealComponent(a.split, "boss", a.pos);
                                k.timeline[a.pos].call(function () {
                                    setTimeout(function () {
                                        d.show()
                                    }, b * v.gGameParam.spf)
                                })
                            }
                            f.mWaitAll([g, k, p], {playtime: 3})
                        }), w.resolve();
                        break;
                    case"hp":
                        "player" === G.to ? i.mPlayerGaugeHp(g.timeline[G.pos], {pos: G.pos, param: {hp: G.value, hpmax: G.max}}) : "boss" === G.to && i.mBossGaugeHp(k.timeline[G.pos], wa, v.pJsnData.boss.type, {pos: G.pos, param: {hp: G.value, hpmax: G.max}}), w.resolve();
                        break;
                    case"recast":
                        if ("player" === G.to) {
                            var N = x[H + 1];
                            i.mPlayerGaugeRecast(g.timeline[G.pos], {pos: G.pos, param: {recast: G.value, split: G.split, recastmax: v.gGameStatus.player.param[G.pos].recastmax}, alive: !(N && "die" === N.cmd && N.pos == G.pos)})
                        } else"boss" === G.to && i.mBossGaugeRecast(k.timeline[G.pos], wa, v.pJsnData.boss.type, {pos: G.pos, param: {recast: G.value, split: G.split, recastmax: G.max}});
                        w.resolve();
                        break;
                    case"lupi":
                        var O = b.isUndefined(G.delay) ? 26 : G.delay, P = t.createEnemyRewardComponent(G.value, "lupi", G.pos);
                        k.timeline[G.pos].call(function () {
                            setTimeout(function () {
                                P.show()
                            }, O * v.gGameParam.spf)
                        }), w.resolve();
                        break;
                    case"drop":
                        h.mGetTreasure(k.timeline[G.pos], v.gAryCntnBoss[G.pos], G.get), f.mWaitAll([g, k, p], {playtime: 2}), v.gGameStatus.last_drop = G.pos, w.resolve();
                        break;
                    case"item":
                        p.timeline[0].call(function (a) {
                            var b = {"class": "log-ability", title: a.title, body: a.body};
                            i.mLog(b)
                        }, [G]), h.mGetItem(k.timeline[G.pos], v.gAryCntnBoss[G.pos], G.get), f.mWaitAll([g, k, p], {playtime: 2}), v.gGameStatus.last_drop = G.pos, w.resolve();
                        break;
                    case"contribution":
                        i.mContribution(p.timeline[0], G), v.gGameStatus.finishAfterContribution && (v.gGameStatus.finish = !0, v.gGameStatus.finishAfterContribution = !1), w.resolve();
                        break;
                    case"ability":
                        "ability" === v.gGameStatus.menu && (v.gGameStatus.usingAbility = 1, v.gGameStatus.useAbilityPos = +G.pos), p.timeline[0].call(function () {
                            v.gMasterContainer.setChildIndex(v.gBossContainer, 0), v.gMasterContainer.setChildIndex(v.gPlayerContainer, 1)
                        });
                        var Q = null, R = null;
                        if ("player" === G.to ? (Q = g.timeline[G.pos], R = v.gAryCntnAvatar[G.pos]) : "boss" === G.to && (Q = k.timeline[G.pos], R = v.gAryCntnBoss[G.pos]), G.to && (G.show_ability_name === !0 || !b.isUndefined(z) || G.force_motion === !0 || v.pJsnData.is_watching === !0)) {
                            if ("on" === G.motion && "player" === G.to) {
                                var V = b.isUndefined(z) && G.motion_label ? !0 : !1;
                                if (Q.call(function (a) {
                                    a.voice && o.playVoice(a.voice)
                                }, [G]), G.comment && !V && p.timeline[0].call(function (a) {
                                    if (3 !== v.gGameStatus.abilityRailDisp) {
                                        var b, c, d;
                                        2 === v.gGameStatus.abilityRailDisp ? (b = "log-ability simple", c = C.getMessage("raid_87"), d = C.replaceMessage("raid_88", [a.name])) : (b = "log-ability", c = C.getMessage("raid_10"), d = C.replaceMessage("raid_73", [a.name, a.comment]));
                                        var e = {"class": b, title: c, body: d};
                                        i.mLog(e)
                                    }
                                }, [G]), G.name && !V && j.mPlayer(p.timeline[0], {text: G.name, playtime: 24, delay: 0}), "2" === G.ability_effect_type && p.timeline[0].call(function (a) {
                                    v.gAryCntnAvatar[a.pos].visible = !1, v.gGameStatus.hide_ability_pos = a.pos
                                }, [G]), "2" !== G.ability_effect_type)var W = G.motion_label ? G.motion_label : "attack", M = f.mChangeMotion(g.timeline[G.pos], {motion: W, pos: G.pos, type: "player"});
                                if (G.ability_effect_type || V || "charge" == G.motion_label)"charge" == G.motion_label && f.mWaitAll([g, k, p], {playtime: M}); else var M = h.mEffect(g.timeline[G.pos], v.gAryCntnAvatar[G.pos], {kind: "ab_start"});
                                f.mWaitAll([g, k, p], {playtime: 2})
                            }
                            if (G.kind) {
                                var M = h.mAbility(Q, R, G);
                                f.mWaitAll([g, k, p], {playtime: M + 3})
                            }
                        }
                        a.when(J).done(function () {
                            w.resolve()
                        });
                        break;
                    case"show_ability_name":
                        G.name && j.mPlayer(p.timeline[0], {text: G.name, playtime: 24, delay: 0}), w.resolve();
                        break;
                    case"special":
                    case"special_npc":
                    case"super":
                    case"friend":
                        var Q = null, R = null;
                        "special" === G.cmd || "special_npc" === G.cmd ? (Q = g.timeline[G.pos], R = v.gAryCntnAvatar[G.pos]) : "super" === G.cmd && (Q = k.timeline[G.pos], R = v.gAryCntnBoss[G.pos]), ("special" === G.cmd || "special_npc" === G.cmd) && (i.mDisplayStrip(p.timeline[0], {mode: "on", pos: G.pos}), v.gGameStatus.player.param[G.pos].recast <= 100 && (v.gGameStatus.player.param[G.pos].recast = 100), i.mPlayerGaugeRecast(Q, {pos: G.pos, param: v.gGameStatus.player.param[G.pos]})), "end" !== G.chain && "mid" !== G.chain && h.mBrightnessOut(Q, {duration: "0.3s", count: 1}), p.timeline[0].call(function () {
                            a(".prt-target").hide()
                        }), Q.call(function () {
                            o.setPlayingVoice(!1)
                        });
                        var X = new a.Deferred, Y = [];
                        if (G.name && "end" !== G.chain && "mid" !== G.chain)if ("super" !== G.cmd) {
                            j.mPlayer(p.timeline[0], {text: G.name, playtime: 24, delay: 0, voice: G.voice});
                            var Z = 1 == v.gGameStatus.player.param[G.pos].leader ? "leader" : "npc", $ = v.gGameStatus.player.param[G.pos].pid, _ = G.cutin_image;
                            Y.push({src: Game.imgUri + "/sp/assets/" + Z + "/cutin_special/" + _ + ".jpg", id: "cutin_" + $, type: "image"}), j.mSpecial(p.timeline[0], {pid: $}), f.mWaitAll([g, k, p], {playtime: 20})
                        } else if (j.mBoss(p.timeline[0], {text: G.name, playtime: 24, delay: 0, voice: G.voice}), 1 == parseInt(v.gGameStatus.boss.param[G.pos].cutin_flag)) {
                            var aa = v.gGameStatus.boss.param[G.pos].cjs.match(/enemy_(\d+)/);
                            Y.push({src: Game.imgUri + "/sp/assets/enemy/cutin_super/" + aa[1] + ".jpg", id: "cutin_" + aa[1], type: "image"}), j.mSuper(p.timeline[0], {bid: aa[1]}), f.mWaitAll([g, k, p], {playtime: 20})
                        }
                        l.once("complete", function () {
                            X.resolve()
                        }), l.loadManifest(Y), p.timeline[0].call(function () {
                            a(".prt-target").show()
                        }), "super" === G.cmd ? p.timeline[0].call(function () {
                            v.gMasterContainer.setChildIndex(v.gBossContainer, 1), v.gMasterContainer.setChildIndex(v.gPlayerContainer, 0)
                        }) : p.timeline[0].call(function () {
                            v.gMasterContainer.setChildIndex(v.gBossContainer, 0), v.gMasterContainer.setChildIndex(v.gPlayerContainer, 1)
                        }), v.gScenarioParam = G, f.mWaitAll([g, k, p], {playtime: 10}), ("1" == G.window_effect_mode || "2" == G.window_effect_mode && "1" == v.pJsnData.effect_mode) && (i.mSuperWindowEffectStart(p.timeline[0], wa), p.timeline[0].call(function () {
                            b.each(v.gGameStatus.boss.param, function (a, b) {
                                v.gAryCntnBoss[b].visible && G.pos !== b && (v.gAryCntnBoss[b].visible = !1, v.gAryCntnBoss[b].visibleAfterEffect = !0)
                            })
                        }));
                        var M = h.mSpecial(Q, G, {size: v.pJsnData.boss.type});
                        if (f.mWaitAll([g, k, p], {playtime: M}), ("1" == G.window_effect_mode || "2" == G.window_effect_mode && "1" == v.pJsnData.effect_mode) && (i.mSuperWindowEffectEnd(p.timeline[0], wa), p.timeline[0].call(function () {
                            b.each(v.gGameStatus.boss.param, function (a, b) {
                                !v.gAryCntnBoss[b].visible && v.gAryCntnBoss[b].visibleAfterEffect && G.pos !== b && (v.gAryCntnBoss[b].visible = !0, delete v.gAryCntnBoss[b].visibleAfterEffect)
                            })
                        })), "super" === G.cmd && f.mChangeMotion(k.timeline[G.pos], {motion: v.gGameStatus.waitmode[G.pos], pos: G.pos, type: "boss"}), G.count >= 2 && "start" !== G.chain && p.timeline[0].call(function (b) {
                            5 > b ? (a(".prt-special-chain .prt-chain").show(), a(".prt-special-chain .prt-over-chain").hide(), a(".prt-special-chain .prt-chain>div").removeClass().addClass("chain" + b)) : (a(".prt-special-chain .prt-chain").hide(), a(".prt-special-chain .prt-over-chain").show()), a(".prt-special-chain .prt-chain>div").removeClass().addClass("chain" + b), a(".prt-special-chain").show().addClass("anim-chain").oneAnimationEnd(function () {
                                a(".prt-special-chain").removeClass("anim-chain")
                            }, 400), setTimeout(function () {
                                a(".prt-special-chain").css("display", "none")
                            }, 1200)
                        }, [G.count, G.name]), "start" !== G.chain && "mid" !== G.chain && 99 !== G.attr && G.total && G.total.length >= 1 && (b.each(G.total, function (a) {
                            var b = t.createTotalDamageComponent(a, a.attr, G.total.size, a.count);
                            Q.call(function () {
                                setTimeout(function () {
                                    b.show()
                                }, 10 * v.gGameParam.spf)
                            }), f.mWaitAll([g, k, p], {playtime: 3})
                        }), f.mWaitAll([g, k, p], {playtime: 12})), "start" !== G.chain && "mid" !== G.chain && (h.mBrightnessIn(Q, {duration: "0.3s", count: 1}), "undefined" != typeof v.gGameStatus.player.param[G.pos] && "1" !== v.gGameStatus.player.param[G.pos].formchange_type && ("special" === G.cmd || "special_npc" === G.cmd))) {
                            var W = G.return_motion_label ? G.return_motion_label : "stbwait";
                            f.mChangeMotion(g.timeline[G.pos], {motion: W, pos: G.pos, type: "player"})
                        }
                        if (("special" === G.cmd || "special_npc" === G.cmd) && i.mDisplayStrip(p.timeline[0], {mode: "off", pos: G.pos}), "undefined" != typeof v.gGameStatus.player.param[G.pos] && "1" !== v.gGameStatus.player.param[G.pos].formchange_type) {
                            var ba = "start" !== G.chain && "mid" !== G.chain ? 12 : 3;
                            f.mWaitAll([g, k, p], {playtime: ba})
                        }
                        a.when(J, X).done(function () {
                            w.resolve()
                        });
                        break;
                    case"special_change":
                        p.timeline[0].call(function () {
                            v.gGameStatus.player.param[G.pos].special_skill = G.name, v.gGameStatus.player.param[G.pos].special_comment = G.text, v.pJsnData.player.param[v.pJsnData.formation[G.pos]].special_skill = G.name, v.pJsnData.player.param[v.pJsnData.formation[G.pos]].special_comment = G.text
                        }), w.resolve();
                        break;
                    case"chain_cutin":
                        for (var ca = [], da = 0; da < G.images.length; da++)ca.push({src: Game.imgUri + G.images[da], id: "raid_chain_dummy_img_0" + (da + 1), type: "image"});
                        l.once("complete", function () {
                            var a = h.mChainCutin(p.timeline[0], G);
                            f.mWaitAll([g, k, p], {playtime: a}), w.resolve()
                        }), l.loadManifest(ca);
                        break;
                    case"summon_cutin":
                        var ca = [
                            {src: Game.imgUri + "/sp/assets/summon/cutin/" + G.image1, id: "raid_union_summon_summon1", type: "image"},
                            {src: Game.imgUri + "/sp/assets/summon/cutin/" + G.image2, id: "raid_union_summon_summon2", type: "image"}
                        ];
                        l.once("complete", function () {
                            i.mSummonStart(p.timeline[0], wa), h.mSummonCutin(p.timeline[0], G), f.mWaitAll([g, k, p], {playtime: 12}), p.timeline[0].call(function () {
                                for (var a = 0; a <= v.gAryCntnAvatar.length - 1; a++)1 == v.gGameStatus.player.param[a].alive && (v.gAryCntnAvatar[a].visible = !1)
                            }), f.mWaitAll([g, k, p], {playtime: 18}), w.resolve()
                        }), l.loadManifest(ca);
                        break;
                    case"summon_simple":
                        i.mSummonStart(p.timeline[0], wa), p.timeline[0].call(function () {
                            for (var a = 0; a <= v.gAryCntnAvatar.length - 1; a++)1 == v.gGameStatus.player.param[a].alive && (v.gAryCntnAvatar[a].visible = !1)
                        }), p.timeline[0].call(function () {
                            v.gMasterContainer.setChildIndex(v.gBossContainer, 0), v.gMasterContainer.setChildIndex(v.gPlayerContainer, 1)
                        });
                        for (var ea = 0; ea <= v.gAryCntnAvatar.length - 1; ea++)f.mMoveTo(v.gAryCntnAvatar, g, {index: ea, x: v.gGameParam.relative.summon_simple.x, playtime: 0}, {tween: [k, p], adjust: 0});
                        f.mMoveTo(v.gAryCntnAvatar, g, {index: 0, y: v.gGameParam.relative.summon_simple.y, playtime: 0}, {tween: [k, p], adjust: 0}), p.timeline[0].call(function () {
                            1 == v.gGameStatus.player.param[0].alive && (v.gAryCntnAvatar[0].visible = !0)
                        });
                        var fa = v.gAryRootAvatar[0], ha = v.gGameStatus.player.param[0].cjs;
                        g.timeline[0].call(function (a) {
                            var b = new lib[a.kind];
                            v.gAryCntnAvatar[0].removeChild(v.gAryRootAvatar[0]), v.gAryRootAvatar[0] = b, v.gAryCntnAvatar[0].addChild(b), v.gGameStatus.player.param[0].cjs = a.kind
                        }, [G]), h.mBrightnessOut(g.timeline[0], {duration: "0.3s", count: 1}), G.name && j.mSummon(p.timeline[0], {text: G.name, playtime: 24, delay: 0}), f.mWaitAll([g, k, p], {playtime: 5}), f.mChangeMotion(g.timeline[0], {motion: "chara_in", pos: 0, type: "player"}), f.mMoveTo(v.gAryCntnAvatar, g, {index: 0, x: -v.gGameParam.relative.summon_simple.x, playtime: 4, ease: "quintOut"}, {tween: [k, p], adjust: 0}), f.mChangeMotion(g.timeline[0], {motion: "attack", pos: 0, type: "player"}, {tween: [g, k, p]}), f.mChangeMotion(g.timeline[0], {motion: "chara_out", pos: 0, type: "player"}, {tween: [g, k, p]}), f.mMoveTo(v.gAryCntnAvatar, g, {index: 0, x: v.gGameParam.relative.summon_simple.x, playtime: 0, ease: "quintOut"}, {tween: [k, p], adjust: 0}), p.timeline[0].call(function () {
                            1 == v.gGameStatus.player.param[0].alive && (v.gAryCntnAvatar[0].visible = !1)
                        }), h.mBrightnessIn(g.timeline[0], {duration: "0.3s", count: 1}), "on" === G.change && (v.gGameStatus.is_summon_simple = 1), g.timeline[0].call(function (a) {
                            v.gAryCntnAvatar[0].removeChild(v.gAryRootAvatar[0]), v.gAryRootAvatar[0] = fa, v.gAryCntnAvatar[0].addChild(fa), v.gGameStatus.player.param[0].cjs = ha
                        }, [G]);
                        for (var ea = 0; ea <= v.gAryCntnAvatar.length - 1; ea++)f.mSetTo(v.gAryCntnAvatar, g, {index: ea, x: v.gGameParam.grid.player[ea].x, y: v.gGameParam.grid.player[ea].y});
                        f.mWaitAll([g, k, p], {playtime: 7}), i.mSummonEnd(p.timeline[0], wa), w.resolve();
                        break;
                    case"summon":
                        if (!b.isUndefined(v.gGameStatus.summon_speed) && 3 == v.gGameStatus.summon_speed && G.kind.match(/_attack$/)) {
                            G.name && j.mSummon(p.timeline[0], {text: G.name, playtime: 24, delay: 0}), w.resolve();
                            break
                        }
                        i.mSummonStart(p.timeline[0], wa), p.timeline[0].call(function () {
                            b.some(v.gGameStatus.player.param, function (a, b) {
                                1 == a.alive && (v.gAryCntnAvatar[b].visible = !1)
                            })
                        }), G.name && j.mSummon(p.timeline[0], {text: G.name, playtime: 24, delay: 0});
                        var M = h.mSummon([g, k, p], G, {size: v.pJsnData.boss.type, speed: v.gGameStatus.summon_speed});
                        f.mWaitAll([g, k, p], {playtime: M}), "on" === G.change && p.timeline[0].call(function () {
                            b.some(v.gGameStatus.player.param, function (a, b) {
                                1 == a.alive && (v.gAryCntnAvatar[b].visible = !0)
                            })
                        }), i.mSummonEnd(p.timeline[0], wa), w.resolve();
                        break;
                    case"condition":
                        p.timeline[0].call(function (a) {
                            if (a.pos = parseInt(a.pos), "player" === a.to)v.gGameStatus.player.param[a.pos].condition = a.condition, i.mConditionPlayer(a.condition, a.pos), "ability" === v.gGameStatus.menu && i.mSetIntervalPlayerConditions(Number(v.gGameStatus.command_slide.now_pos) + 1); else if ("boss" === a.to)wa[a.pos].condition.setCondition(a.condition, v.gGameStatus.bossmode.looks.mode[a.pos]), i.mConditionBoss(wa); else if ("field_effect" !== a.to || v.gGameStatus.finish) {
                                if ("effect_unit" === a.to && v.pJsnData.is_defendorder && !v.gGameStatus.finish) {
                                    var c = a.condition || [];
                                    b.isEmpty(c) || i.mConditionAssistUnit(c)
                                }
                            } else {
                                var d = a.condition;
                                b.isEmpty(d) || i.mConditionField(d)
                            }
                        }, [G]), w.resolve();
                        break;
                    case"boss_gauge":
                        var ia = G, da = ia.pos;
                        k.timeline[da].call(function () {
                            var a = v.gGameStatus.boss.param[da];
                            b.each(ia, function (b, c) {
                                void 0 !== b && (a[c] = b)
                            })
                        }), i.mBossGaugeHp(k.timeline[da], wa, v.pJsnData.boss.type, {pos: da, param: v.gGameStatus.boss.param[da]}), i.mBossGaugeRecast(k.timeline[da], wa, v.pJsnData.boss.type, {pos: da, param: v.gGameStatus.boss.param[da]}), i.mBossGaugeName(k.timeline[da], v.pJsnData.boss.type, {pos: da, param: v.gGameStatus.boss.param[da]}), w.resolve();
                        break;
                    case"modechange":
                        if (A || 1 == G.ability_or_summon || 9 === G.mode) {
                            p.timeline[0].call(function () {
                                v.gMasterContainer.setChildIndex(v.gBossContainer, 1), v.gMasterContainer.setChildIndex(v.gPlayerContainer, 0)
                            }), f.mWaitAll([g, k, p], {playtime: 8}), G.mode = Number(G.mode), v.gGameStatus.bossmode.already_changed[G.pos] && v.gGameStatus.bossmode.looks.mode[G.pos] == G.mode || (1 != G.additional || v.gGameStatus.bossmode.looks.mode[G.pos] != G.mode) && t.executeModeChange(G.mode, [g, k, p], G.special_gauge, G.ability_or_summon, G.log_type, G.pos);
                            var ja = 9 === G.mode ? 1 : G.mode;
                            v.gGameStatus.bossmode.looks.mode[G.pos] = ja, v.gGameStatus.bossmode.looks.gauge[G.pos] = G.gauge
                        }
                        b.isUndefined(G.gauge) || 1 !== v.pJsnData.boss.param[G.pos].modeflag || i.mBreakGauge(p.timeline[0], wa[G.pos], {pos: G.pos, gauge: G.gauge}), w.resolve();
                        break;
                    case"formchange":
                        if ("player" === G.to) {
                            if (g.timeline[G.pos].call(function () {
                                v.gGameStatus.motion_lock = !0
                            }), !G.no_motion) {
                                G.no_change_motion || g.timeline[G.pos].call(function () {
                                    f.mChangeMotionInstantly({motion: "change_1", pos: G.pos, type: "player", is_alive: "on"})
                                });
                                var ka = function (a, b, c) {
                                    var d, e = v.gGameStatus.player.param[b].cjs, f = e + c;
                                    return d = v.gAryRootAvatar[b][e] && v.gAryRootAvatar[b][e][f] ? v.gAryRootAvatar[b][e][f].timeline.duration : v.gGameStatus.form_change_frame[a][c]
                                }, na = ka(G.param.name, G.pos, "_change_1");
                                f.mWaitAll([g, k, p], {playtime: na}), g.timeline[G.pos].call(function () {
                                    var a = v.pJsnData.formation[G.pos];
                                    b.each(G.param, function (b, c) {
                                        v.gGameStatus.player.param[G.pos][c] = b, v.pJsnData.player.param[a][c] = b
                                    }), v.gGameStatus.player.param[G.pos].form = G.form, v.pJsnData.player.param[a].form = G.form
                                }), g.timeline[G.pos].call(function () {
                                    v.clone = a.extend(!0, v.gAryRootAvatar[G.pos], {});
                                    var b = new lib[G.param.cjs];
                                    v.gAryCntnAvatar[G.pos].addChild(b), v.gAryRootAvatar[G.pos] = b
                                }), G.no_change_motion || g.timeline[G.pos].call(function () {
                                    f.mChangeMotionInstantly({motion: "change_2", pos: G.pos, type: "player", delay: 0, is_alive: "on"})
                                }), f.mWaitAll([g, k, p], {playtime: 1}), g.timeline[G.pos].call(function () {
                                    v.gAryCntnAvatar[G.pos].removeChild(v.clone), v.clone = null
                                });
                                var pa = ka(G.param.name, G.pos, "_change_2");
                                f.mWaitAll([g, k, p], {playtime: pa})
                            }
                            g.timeline[G.pos].call(function () {
                                v.gGameStatus.motion_lock = !1
                            }), g.timeline[G.pos].call(function () {
                                v.pJsnData.player.param[v.pJsnData.formation[G.pos]].cjs = G.param.cjs, v.pJsnData.player.param[v.pJsnData.formation[G.pos]].alive && (1 == v.gGameStatus.player.param[G.pos].leader ? a(".prt-command .lis-character" + G.pos).children("img").attr("src", Game.imgUri + "/sp/assets/leader/raid_normal/" + v.gGameStatus.player.param[G.pos].pid_image + ".jpg") : a(".prt-command .lis-character" + G.pos).children("img").attr("src", Game.imgUri + "/sp/assets/npc/raid_normal/" + v.gGameStatus.player.param[G.pos].pid_image + ".jpg")), 1 === G.type && f.mChangeMotionInstantly({motion: "stbwait", pos: G.pos, type: "player", delay: 0, is_alive: "on"})
                            })
                        } else if ("boss" === G.to && v.gGameStatus.boss.param[G.pos].form != G.form && ("1" == G.fullscreen && (i.mSuperWindowEffectStart(p.timeline[0], wa), p.timeline[0].call(function () {
                            a(".watching-mask").css("display", "block"), a(".mask").css("display", "none"), a(".pop-usual").css("display", "none"), a("#pop-scroll").empty().css("display", "none"), a("#pop").empty(), v.gAryRootParts[0][v.gGameParam.cjs.parts[0]].gotoAndPlay("out"), b.each(v.gGameStatus.boss.param, function (a, b) {
                                v.gAryCntnBoss[b].visible && G.pos !== b && (v.gAryCntnBoss[b].visible = !1, v.gAryCntnBoss[b].visibleAfterEffect = !0)
                            }), b.each(v.gGameStatus.player.param, function (a, b) {
                                1 == a.alive && (v.gAryCntnAvatar[b].visible = !1)
                            }), a(".btn-chat").removeClass("display-on").addClass("display-off")
                        })), v.gGameStatus.boss.form_change_tween === !1)) {
                            v.gGameStatus.boss.form_change_tween = !0, f.mChangeMotion(k.timeline[G.pos], {motion: "form_change", pos: G.pos, type: "boss"}, {tween: [g, k, p]}), k.timeline[G.pos].call(function () {
                                v.gGameStatus.boss.param[G.pos].form = G.form, b.each(G.param, function (a, b) {
                                    v.gGameStatus.boss.param[G.pos][b] = a
                                })
                            });
                            var sa = v.gAryRootBoss[G.pos], ta = v.pJsnData.boss.param[G.pos].enemy_id;
                            1 != G.form && (ta = ta + "_" + G.form), wa[G.pos].changeThumbnail(ta), k.timeline[G.pos].call(function () {
                                var a = new lib[G.param.cjs];
                                v.gAryRootBoss[G.pos] = a, v.gAryCntnBoss[G.pos].addChild(a), f.mChangeMotionInstantly({motion: "setin_4", pos: G.pos, type: "boss", delay: 0});
                                var b = v.pJsnData.boss.param[G.pos].enemy_id;
                                1 != G.form && (b = b + "_" + G.form), wa[G.pos].changeThumbnail(b)
                            }), 1 != G.form && v.gGameStatus.isBackImageUpdated === !0 && k.timeline[G.pos].call(function () {
                                if (t.CommandBackTop(), v.gGameStatus.isDrawBgImgByCjs === !0) {
                                    if (G.form <= b.last(v.gGameStatus.backImageValue)) {
                                        var c = b.indexOf(v.gGameStatus.backImageValue, String(G.form));
                                        -1 !== c ? v.gGameStatus.backImage[0].image = v.gGameStatus.backImage[G.form - 1].image : v.gGameStatus.backImage[0].image = v.gGameStatus.backImage[G.form - 2].image, v.update()
                                    }
                                } else a(".prt-bg-stage-distant").css("background-image", "url(" + Game.imgUri + G.bg_image + ")")
                            }), "1" == G.fullscreen && (i.mSuperWindowEffectEnd(p.timeline[0], wa), p.timeline[0].call(function () {
                                v.gGameStatus.attackQueue.attackButtonPushed || v.gAryRootParts[0][v.gGameParam.cjs.parts[0]].gotoAndPlay("in"), b.each(v.gGameStatus.boss.param, function (a, b) {
                                    !v.gAryCntnBoss[b].visible && v.gAryCntnBoss[b].visibleAfterEffect && G.pos !== b && (v.gAryCntnBoss[b].visible = !0, delete v.gAryCntnBoss[b].visibleAfterEffect)
                                }), b.each(v.gGameStatus.player.param, function (a, b) {
                                    1 == a.alive && (v.gAryCntnAvatar[b].visible = !0)
                                }), v.pJsnData.is_semi && v.pJsnData.is_defendorder || a(".btn-chat").removeClass("display-off").addClass("display-on"), a(".watching-mask").css("display", "none")
                            })), f.mWaitAll([g, k, p], {playtime: 3}), k.timeline[G.pos].call(function () {
                                v.gAryCntnBoss[G.pos].removeChild(sa), v.gGameStatus.boss.form_change_tween = !1
                            })
                        }
                        w.resolve();
                        break;
                    case"die":
                    case"stop":
                        if ("player" === G.to)v.gGameStatus.attackQueue.charaChangeFlag || "AttackSwitch" === v.gGameStatus.attackQueue.index[0] || (v.gGameStatus.attackQueue.charaChangeFlag = !0), f.mWaitAll([g, k, p], {playtime: 15}), f.mChangeMotion(g.timeline[G.pos], {motion: "dead", pos: G.pos, type: "player", voice: G.voice, se: "se/chara_dead_se_1.mp3"}, {tween: [g, k, p]}), g.timeline[G.pos].call(function (b) {
                            v.gGameStatus.player.param[b].alive = 0, v.pJsnData.player.param[v.pJsnData.formation[b]].alive = 0, v.pJsnData.player.param[v.pJsnData.formation[b]].hp = 0, a(".prt-command .lis-character" + b).children("img").attr("src", ga), i.mConditionPlayer({buff: null, debuff: null}, b), i.mSetAbility({list: {}}, b), a(".prt-command-top .lis-character" + b).addClass("blank"), "ability" === v.gGameStatus.menu && (t.popHideAbility(), t.CommandBackTop())
                        }, [G.pos]); else if ("boss" == G.to) {
                            k.timeline[G.pos].call(function (a) {
                                v.gGameStatus.boss.param[a].alive = 0, v.pJsnData.boss.param[a].alive = 0, v.pJsnData.boss.param[a].hp = 0, wa[a].isAlive = !1
                            }, [G.pos]), k.timeline[G.pos].call(function (a) {
                                v.gGameStatus.boss.all_dead = !0;
                                for (var b = 0; b < v.pJsnData.boss.param.length; b++)0 != v.pJsnData.boss.param[b].alive && (v.gGameStatus.boss.all_dead = !1)
                            }), G.kill_voice && G.kill_voice.id && G.kill_voice.path && (b.has(F, G.kill_voice.id) || (F[G.kill_voice.id] = !0, k.timeline[G.pos].call(function () {
                                o.playVoice(G.kill_voice.path)
                            }))), i.mBossGaugeHp(k.timeline[G.pos], wa, v.pJsnData.boss.type, {pos: G.pos, param: {hp: 0, hpmax: v.gGameStatus.boss.param[G.pos].hpmax}});
                            var ua = "stop" === G.cmd ? "down" : "dead", va = [];
                            "dead" === ua && p.timeline[0].call(function () {
                                v.gMasterContainer.setChildIndex(v.gBossContainer, 1), v.gMasterContainer.setChildIndex(v.gPlayerContainer, 0)
                            }), v.gGameStatus.isVersusView && f.mWaitAll([g, k, p], {playtime: 6}), v.gGameStatus.key_enemy_dead === !1 && G.chain ? (k.timeline[G.pos].call(function () {
                                b.each(v.pJsnData.boss.param, function (a, b) {
                                    G.pos !== b && (f.mChangeMotionInstantly({motion: ua, pos: b, type: "boss", delay: 10}), va.push(b))
                                })
                            }), G.die_type && "dead" === ua || f.mChangeMotion(k.timeline[G.pos], {motion: ua, pos: G.pos, type: "boss", delay: 10}, {tween: [g, k, p]}), v.gGameStatus.key_enemy_dead = !0) : v.gGameStatus.key_enemy_dead || G.die_type && "dead" === ua || f.mChangeMotion(k.timeline[G.pos], {motion: ua, pos: G.pos, type: "boss", delay: 10}, {tween: [g, k, p]});
                            var xa = !1;
                            if (!b.isUndefined(G.rp) && "" != G.rp) {
                                xa = !0;
                                var ya = t.createEnemyRewardComponent(G.rp, "rp", G.pos);
                                k.timeline[G.pos].call(function () {
                                    ya.show()
                                })
                            }
                            if (!b.isUndefined(G.exp) && "" != G.exp) {
                                var O = xa ? 200 : 0, za = t.createEnemyRewardComponent(G.exp, "exp", G.pos);
                                k.timeline[G.pos].call(function () {
                                    setTimeout(function () {
                                        za.show()
                                    }, O)
                                })
                            }
                            f.mWaitAll([g, k, p], {playtime: 10}), "dead" !== ua || v.pJsnData.is_arcade && (!v.pJsnData.is_arcade || v.pJsnData.arcade.is_bonus) || k.timeline[G.pos].call(function (a) {
                                v.gAryRootBoss[G.pos].visible = !1, b.each(va, function (a) {
                                    v.gAryRootBoss[a].visible = !1
                                })
                            }, [G.pos]), k.timeline[G.pos].call(function () {
                                a(".prt-enemy-gauge .lis-enemy").eq(G.pos).css("display", "none");
                                var b = wa[G.pos];
                                b.hide(), v.removeChild(b), t.$el.find(".btn-enemy-gauge.prt-percent[target=" + (G.pos + 1) + "]").removeClass("alive").hide(), a(".prt-enemy-stage .prt-enemy-area .btn-targeting").eq(G.pos).addClass("disable")
                            }), v.gGameStatus.boss.last_die = G.pos, k.timeline[G.pos].call(function (b) {
                                var c = b + 1;
                                a(".enemy-" + c + " .prt-target").removeClass("lock-on"), a(".prt-enemy-gauge .prt-pointer").eq(b).removeClass("lock-on"), a(".prt-boss-area .prt-target").removeClass("lock-on")
                            }, [G.pos])
                        }
                        if (G.is_show_popup && !t.isArcarumInfoMessage) {
                            t.isArcarumInfoMessage = !0;
                            var Aa = t.popInfoMessage({title: G.die_information_title, message: G.die_information_body});
                            Aa.on("onOk", function () {
                                Aa.popRemove(), w.resolve()
                            })
                        } else w.resolve();
                        break;
                    case"resurrection":
                        var Ba = G.pos, Ca = G.index;
                        if (G.cjs && (g.timeline[G.pos].call(function () {
                            v.clone = a.extend(!0, v.gAryRootAvatar[G.pos], {});
                            var b = new lib[G.cjs];
                            v.gAryCntnAvatar[G.pos].addChild(b), v.gAryRootAvatar[G.pos] = b, v.gGameStatus.player.param[Ba].cjs = G.cjs
                        }), g.timeline[G.pos].call(function () {
                            v.gAryCntnAvatar[G.pos].removeChild(v.clone), v.clone = null
                        })), h.mBrightnessOut(g.timeline[0], {duration: "0.3s", count: 1}), f.mWaitAll([g, k, p], {playtime: 12}), j.mPlayer(p.timeline[0], {text: G.name, playtime: 24, delay: 0}), b.isUndefined(G.no_motion) || !G.no_motion)var M = f.mChangeMotion(g.timeline[G.performer], {motion: "attack", pos: G.performer, type: "player"});
                        if (i.mWindowEffect(p.timeline[0], {kind: G.kind}), b.isUndefined(G.no_motion) || !G.no_motion) {
                            f.mWaitAll([g, k, p], {playtime: M});
                            var M = f.mChangeMotion(g.timeline[G.performer], {motion: "stbwait", pos: G.performer, type: "player"})
                        }
                        var Da = b.isUndefined(G.no_motion) || !G.no_motion ? 24 : 36;
                        f.mWaitAll([g, k, p], {playtime: Da}), "" !== Ba && f.mChangeMotion(p.timeline[0], {motion: v.gGameStatus.defaultmotion, pos: Ba, type: "player", current_hp: G.hp}), p.timeline[0].call(function () {
                            v.pJsnData.player.param[Ca].hp = G.hp, G.hpmax && (v.pJsnData.player.param[Ca].hpmax = G.hpmax), v.pJsnData.player.param[Ca].condition.buff = [], v.pJsnData.player.param[Ca].condition.debuff = [], v.pJsnData.player.param[Ca].condition.hide_hp_flag = !1, "number" == typeof Ba && (v.gGameStatus.player.param[Ba].hp = G.hp, G.hpmax && (v.gGameStatus.player.param[Ba].hpmax = G.hpmax), v.gGameStatus.player.param[Ba].condition.buff = [], v.gGameStatus.player.param[Ba].condition.debuff = [])
                        }), "" !== Ba && (i.mPlayerGaugeHp(p.timeline[0], {pos: Ba, param: {hp: G.hp, hpmax: v.pJsnData.player.param[Ca].hpmax}}), i.mPlayerGaugeRecast(p.timeline[0], {pos: Ba, param: v.gGameStatus.player.param[Ba]}), i.mPlayerGaugeAttr(p.timeline[0], {pos: Ba, param: v.gGameStatus.player.param[Ba]})), h.mBrightnessIn(g.timeline[0], {duration: "0.3s", count: 1}), p.timeline[0].call(function () {
                            v.pJsnData.player.param[Ca].alive = 1, "number" == typeof Ba && (v.gGameStatus.player.param[Ba].alive = 1)
                        }), p.timeline[0].call(function (a) {
                            var b = {"class": "log-ability", title: a.title, body: a.comment};
                            i.mLog(b)
                        }, [G]), w.resolve();
                        break;
                    case"replace":
                        v.gGameStatus.attackQueue.charaChangeFlag || "AttackSwitch" === v.gGameStatus.attackQueue.index[0] || (v.gGameStatus.attackQueue.charaChangeFlag = !0);
                        var Ea = a.extend(!0, {}, v.pJsnData), Fa = new lib[Ea.player.param[G.npc].cjs];
                        if (null !== v.pJsnData.player.param[G.npc].formchange_type) {
                            var Ga = v.pJsnData.player.param[G.npc].name, Ha = function (a, b) {
                                var c = v.pJsnData.player.param[G.npc].cjs, d = c + b, e = Fa[c][d].timeline.duration;
                                v.gGameStatus.form_change_frame[a][b] = e
                            };
                            v.gGameStatus.form_change_frame[Ga] = {}, Ha(Ga, "_change_1"), Ha(Ga, "_change_2")
                        }
                        g.timeline[G.pos].call(function (b) {
                            v.gAryCntnAvatar[b.pos].x += 9999, a.each(v.gGameStatus.player.param[b.pos], function (a, c) {
                                v.gGameStatus.player.param[b.pos][a] = Ea.player.param[b.npc][a]
                            }), v.gAryCntnAvatar[b.pos].removeChild(v.gAryRootAvatar[b.pos]), v.gAryRootAvatar[b.pos] = Fa, v.gAryCntnAvatar[b.pos].addChild(Fa)
                        }, [G]), G.hide && (f.mChangeMotion(g.timeline[G.pos], {motion: "hide", pos: G.pos, type: "player"}), f.mWaitAll([g, k, p], {playtime: 3})), g.timeline[G.pos].call(function (b) {
                            v.gGameStatus.player.param[b.pos].alive = 1, v.pJsnData.formation[b.pos] = String(b.npc), 1 == v.gGameStatus.player.param[b.pos].leader ? a(".prt-command .lis-character" + b.pos).children("img").attr("src", Game.imgUri + "/sp/assets/leader/raid_normal/" + v.gGameStatus.player.param[b.pos].pid_image + ".jpg") : a(".prt-command .lis-character" + b.pos).children("img").attr("src", Game.imgUri + "/sp/assets/npc/raid_normal/" + v.gGameStatus.player.param[b.pos].pid_image + ".jpg"), a(".prt-command-top .lis-character" + b.pos).removeClass("blank")
                        }, [G]), v.gGameStatus.replacehit[G.pos] = v.pJsnData.player.param[G.npc].effect, i.mPlayerGaugeHp(g.timeline[G.pos], {pos: G.pos, param: {hp: v.pJsnData.player.param[G.npc].hp, hpmax: v.pJsnData.player.param[G.npc].hpmax}}), i.mPlayerGaugeRecast(g.timeline[G.pos], {pos: G.pos, param: v.pJsnData.player.param[G.npc]}), i.mPlayerGaugeAttr(g.timeline[G.pos], {pos: G.pos, param: v.pJsnData.player.param[G.npc]}), G.hide || (f.mWaitAll([g, k, p], {playtime: 3}), f.mChangeMotion(g.timeline[G.pos], {motion: "chara_in", pos: G.pos, type: "player", voice: G.voice})), g.timeline[G.pos].call(function (a) {
                            v.gAryCntnAvatar[a.pos].x -= 9999
                        }, [G]), G.hide || f.mChangeMotion(g.timeline[G.pos], {motion: "stbwait", pos: G.pos, type: "player", is_replace: "on"}), w.resolve();
                        break;
                    case"win":
                        if ((b.isUndefined(G.dungeon_item_exist) || 1 != G.dungeon_item_exist) && (x[H + 1] && "contribution" === x[H + 1].cmd && v.pJsnData.is_defendorder ? v.gGameStatus.finishAfterContribution = !0 : (v.gGameStatus.finish = !0, e.battleFinishedByThisScenarios = !0)), v.gGameStatus.shouldPlayFixedBGM = !0, p.timeline[0].call(function () {
                            a(".prt-condition").css("display", "none"), i.mHideBossGauge(wa), i.mRemoveConditionField(), v.pJsnData.is_defendorder && i.mRemoveConditionAssistUnit()
                        }), p.timeline[0].call(function () {
                            a(".prt-battle-num").hide(), a(".prt-total-human").hide(), a(".prt-remain-time").hide(), a(".prt-treasure").css("display", "block")
                        }), p.timeline[0].call(function () {
                            b.each(v.gGameStatus.timer, function (a, b, c) {
                                clearInterval(a)
                            })
                        }), f.mWaitAll([g, k, p], {playtime: 2}), p.timeline[0].call(function () {
                            v.gAryCntnParts[2].removeChild(v.gAryRootParts[2]), t._removeAutoButton()
                        }), f.mWaitAll([g, k, p], {playtime: 6}), null != v.gGameStatus.last_drop && v.gGameStatus.last_drop == v.gGameStatus.boss.last_die ? f.mWaitAll([g, k, p], {playtime: 12}) : f.mWaitAll([g, k, p], {playtime: 12}), v.gGameStatus.dropped.length > 0) {
                            var Ia = {}, Ja = 0;
                            f.mWaitAll([g, k, p], {
                                playtime: 3}), b.each(v.gGameStatus.dropped, function (a) {
                                Ja = h.mOpenTreasure(p.timeline[0], a), b.each(a[0], function (a) {
                                    var c = parseInt(a);
                                    Ia[c] = b.isUndefined(Ia[c]) ? 1 : Ia[c] + 1
                                })
                            });
                            var Da = 5;
                            f.mWaitAll([g, k, p], {playtime: Da}), p.timeline[0].call(function () {
                                var b = a(".prt-treasure-wrapper .lis-treasure.type1 .txt-get-value").html(), c = a(".prt-treasure-wrapper .lis-treasure.type2 .txt-get-value").html(), d = a(".prt-treasure-wrapper .lis-treasure.type3 .txt-get-value").html();
                                b < y.treasure.treasure_type_1 && a(".prt-treasure-wrapper .lis-treasure.type1 .anim-shine").show().oneAnimationEnd(function () {
                                    a(this).hide()
                                }, 1600), c < y.treasure.treasure_type_2 && a(".prt-treasure-wrapper .lis-treasure.type2 .anim-shine").show().oneAnimationEnd(function () {
                                    a(this).hide()
                                }, 1600), d < y.treasure.treasure_type_3 && a(".prt-treasure-wrapper .lis-treasure.type3 .anim-shine").show().oneAnimationEnd(function () {
                                    a(this).hide()
                                }, 1600), a(".prt-treasure-wrapper .lis-treasure.type1 .txt-get-value").html("" + y.treasure.treasure_type_1), a(".prt-treasure-wrapper .lis-treasure.type2 .txt-get-value").html("" + y.treasure.treasure_type_2), a(".prt-treasure-wrapper .lis-treasure.type3 .txt-get-value").html("" + y.treasure.treasure_type_3)
                            }), f.mWaitAll([g, k, p], {playtime: Ja - Da})
                        }
                        t.isSfvSurvivalResult = !1, t.isArcarumResult = !1;
                        var Ka = null;
                        if (Ka = v.pJsnData.is_arcarum ? v.pJsnData.survival && v.pJsnData.survival.stage_number == T[v.pJsnData.survival.difficult] : v.pJsnData.survival && v.pJsnData.survival.stage_number == S[v.pJsnData.survival.difficult], 2 == G.mode || 3 == G.mode || 1 == G.mode && v.gGameStatus.isVersusView || Ka) {
                            v.gGameStatus.clear = !0;
                            var La = new a.Deferred, Ma = new a.Deferred, Na = new a.Deferred, Oa = 2 == G.mode ? v.gGameParam.cjs.quest_clear : v.gGameParam.cjs.win, Fa = new lib[Oa], Pa = new createjs.Container;
                            Pa.addChild(Fa), Pa.x = v.gGameParam.relative.win.x, Pa.y = v.gGameParam.relative.win.y, Pa.visible = !1, v.gMasterContainer.addChild(Pa);
                            var Qa = Fa[Oa][Oa + "_end"].timeline.duration;
                            p.timeline[0].call(function (b) {
                                b.visible = !0, Fa[Oa].gotoAndPlay("start"), a(".prt-battl-state").hide().removeClass("ready player enemy"), a(".prt-command-battle").css("display", "none"), v.gAryCntnParts[2].visible = !1, Ka && U && !v.pJsnData.is_arcarum && o.playBGM(U)
                            }, [Pa]), f.mWaitAll([g, k, p], {playtime: 3}), f.mChangeMotionAll(v.gAryRootAvatar, g.timeline, {motion: "win", mc: v.gGameStatus.player.param, type: "player", is_alive: "on"}), f.mWaitAll([g, k, p], {playtime: 9}), p.timeline[0].call(function () {
                                Fa[Oa].gotoAndPlay("end"), 3 == G.mode && o.stopBGM()
                            }, []), p.timeline[0].call(function () {
                                v.gGameStatus.isVersusView ? Na.done(function () {
                                    Ma.resolve()
                                }) : Ma.resolve(), Ma.done(function () {
                                    if (o.playVoice(G.voice), !G.voice || m.isShellAppAndroid() || 0 === Game.setting.sound_flag)La.resolve(); else {
                                        var a = !1, b = function () {
                                            a || (a = !0, La.resolve())
                                        };
                                        t.setNamedTimeout("voiceCompleteTimeout", b, 8e3), n.once(G.voice, "complete", function () {
                                            t.clearTimeoutOne("voiceCompleteTimeout"), b()
                                        })
                                    }
                                })
                            }, []), f.mWaitAll([g, k, p], {playtime: Qa}), p.timeline[0].call(function () {
                                3 == G.mode && o.playResultBGM(), v.gGameStatus.is_clear = !0
                            });
                            var Ra = Fa[Oa][Oa + "_end"];
                            Ra.stop = function () {
                                v.gMasterContainer.removeChild(Pa), delete Ra.stop, Ra.stop(), Na.resolve()
                            }
                        } else if (4 == G.mode || 5 == G.mode) {
                            5 == G.mode && (v.gGameStatus.remain_turn = "0", t.updateBonusStageTurn());
                            var Oa = v.gGameParam.cjs.quest_failed, Fa = new lib[Oa], Pa = new createjs.Container;
                            Pa.addChild(Fa), Pa.x = v.gGameParam.relative.lose.x, Pa.y = v.gGameParam.relative.lose.y, v.gMasterContainer.addChild(Pa);
                            var M = Fa[Oa][Oa + "_end"].timeline.duration;
                            p.timeline[0].call(function () {
                                Fa[Oa].gotoAndPlay("end")
                            }, [Pa]), f.mWaitAll([g, k, p], {playtime: M + 12}), p.timeline[0].call(function () {
                                v.gMasterContainer.removeChild(Pa)
                            })
                        } else if (6 == G.mode)t.isSfvSurvivalResult = !0, p.timeline[0].call(function () {
                            window.cjs_sfv_score = +v.pJsnData.survival.score_point, window.cjs_sfv_score_plus = +v.pJsnData.survival.add_point, window.cjs_sfv_stage = +v.pJsnData.survival.stage_number, window.cjs_sfv_course_mode = 3 == +v.pJsnData.survival.difficult ? 4 : +v.pJsnData.survival.difficult;
                            var a = v.gGameParam.cjs.sfv_suvival_result;
                            t.suvivalResultContainer = new createjs.Container, window.exportRoot = new lib[a], t.suvivalResultContainer.addChild(window.exportRoot), t.suvivalResultContainer.x = 0, t.suvivalResultContainer.y = 0, o.stopBGM(), v.gMasterContainer.addChild(t.suvivalResultContainer)
                        }), f.mWaitAll([g, k, p], {playtime: 66}), p.timeline[0].call(function () {
                            v.gMasterContainer.removeChild(t.suvivalResultContainer), t.popBattleService(G)
                        }); else if (7 == G.mode)if (t.isArcarumResult = !0, G.arcarum_area_param.occupied) {
                            var Oa = v.gGameParam.cjs.quest_failed, Fa = new lib[Oa], Pa = new createjs.Container;
                            Pa.addChild(Fa), Pa.x = v.gGameParam.relative.lose.x, Pa.y = v.gGameParam.relative.lose.y, v.gMasterContainer.addChild(Pa);
                            var M = Fa[Oa][Oa + "_end"].timeline.duration;
                            p.timeline[0].call(function () {
                                Fa[Oa].gotoAndPlay("end")
                            }, [Pa]), f.mWaitAll([g, k, p], {playtime: M + 12}), p.timeline[0].call(function () {
                                t.popNextBattle(G, v.pJsnData.arcarum.next_popup)
                            })
                        } else p.timeline[0].call(function () {
                            t.popNextBattle(G, v.pJsnData.arcarum.next_popup)
                        });
                        1 == v.pJsnData.is_multi && p.timeline[0].call(function () {
                            v.gAryCntnParts[0].visible = !1, v.pJsnData.is_watching === !0 || v.pJsnData.is_semi && v.pJsnData.is_defendorder || a(".btn-chat").removeClass("display-off").addClass("display-on")
                        }), p.timeline[0].call(function (d) {
                            "top" !== v.gGameStatus.menu && t.CommandBackTop({motion: !1}), (6 != G.mode && 7 != G.mode && b.isUndefined(q) || 7 == G.mode && G.arcarum_area_param && !G.arcarum_area_param.is_change_occupation) && (v.gAryRootParts[4][v.gGameParam.cjs.parts[4]].gotoAndPlay("in"), v.gAryCntnParts[4].visible = !0, a(".prt-command-end").css("display", "block"), a(".prt-mask-other").show());
                            var e = "", f = location.hash.split("/");
                            if ("#tutorial" === f[0]) {
                                var g = parseInt(f[1]) + 1;
                                e = "#tutorial/" + g
                            } else"" != G.next_url ? e = G.next_url : G.is_last_raid ? G.is_endless_quest ? e = "#quest/index" : 1 == v.pJsnData.is_multi ? (e = "#result_multi/" + d.raid_id + "/" + (t.currentFps / 6 - 1), (v.pJsnData.bgm_setting || {}).is_change_bgm && (e += "/1")) : Ka ? e = "#result_survival/" + d.raid_id + "/1" : (e = "#result/" + d.raid_id + "/" + (t.currentFps / 6 - 1), (v.pJsnData.bgm_setting || {}).is_change_bgm && (e += "/1")) : e = "#raid/" + d.raid_id + "/" + (t.currentFps / 6 - 1) + "/" + v.gGameStatus.lock;
                            if (a(".btn-result").one("tap", function () {
                                if (v.gAryRootParts[4][v.gGameParam.cjs.parts[4]].gotoAndPlay("out"), a(".btn-result").off(), !Ka && v.pJsnData.is_arcarum && v.pJsnData.arcarum.next_popup)return void t.$el.find(".cnt-raid").trigger("tapArcarumNextPop");
                                t.off(), t.undelegateEvents(), t.stopListening(), t.clearTimeoutOne("raidAutoLocationNext");
                                var b = function () {
                                }, d = 500 * (t.currentFps / t.baseFps);
                                G.is_last_raid ? b = function () {
                                    Ka ? (t.content_close(), c.history.navigate(e, !0)) : location.hash = e
                                } : 1 == G.mode ? (i.mSlideOut(), b = function () {
                                    h.mDeleteTreasure(v.gGameStatus.dropped, {delay: 12}), location.hash = e
                                }) : b = function () {
                                    location.hash = e
                                }, t.setNamedTimeout("raidTapNextLocationTimeout", b, d)
                            }), 1 == v.pJsnData.is_multi && a(".btn-assist").addClass("disable"), t.inactivateMask(), t.ResetAllAttackQueue(), t.$el.find(".btn-attack-start").hasClass("display-on") && (a(".btn-attack-start").removeClass("display-on"), v.gAryRootParts[0][v.gGameParam.cjs.parts[0]].gotoAndPlay("tap_out")), v.pJsnData.is_dungeon === !0 && !G.dungeon_item_exist && 2 != G.mode) {
                                var j = a(Game.ua.isJssdk() ? "#mobage-game-container" : "body");
                                j.off("cgtouchstart"), location.hash = e
                            }
                            if (v.gGameStatus.auto_attack && t.isSfvSurvivalResult)window.auto_flag = !0; else if (v.gGameStatus.auto_attack && t.isArcarumResult && (G.arcarum_area_param.is_change_occupation === !0 || v.pJsnData.arcarum.next_popup === !0))window.auto_flag = !0; else if (v.gGameStatus.auto_attack && t.isArcarumResult && G.arcarum_area_param.is_change_occupation === !1) {
                                window.auto_flag = !0;
                                var k = function () {
                                    location.hash = e
                                };
                                t.setNamedTimeout("nextBattleLocationTimeout", k, 1e3)
                            } else if (v.gGameStatus.auto_attack && 0 == v.pJsnData.is_dungeon) {
                                window.auto_flag = !0;
                                var j = a(Game.ua.isJssdk() ? "#mobage-game-container" : "body");
                                j.off("cgtouchstart"), 2 == G.mode ? a.when(La, Na).done(function () {
                                    t.setNamedTimeout("raidAutoLocationNext", function () {
                                        location.hash = e
                                    }, 500)
                                }) : location.hash = e
                            }
                        }, [G]), w.resolve();
                        break;
                    case"finished":
                        v.gGameStatus.finish = !0, v.gGameStatus.already_finish = !0, p.timeline[0].call(function () {
                            t.popShowRematchFail()
                        }), w.resolve();
                        break;
                    case"rematch":
                        v.gGameStatus.finish = !1, v.gGameStatus.retire = !1;
                        var Sa = b.isUndefined(G.is_revival) || 1 != G.is_revival ? !1 : !0, Ta = b.clone(v.gGameStatus.player.param);
                        p.timeline[0].call(function () {
                            Sa || G.tp || 0 == G.tp ? G.tp && (v.pJsnData.arcarum.tp = G.tp) : v.gGameStatus.potion.count = G.potion.count, b.isUndefined(G.potion) || (v.gGameStatus.potion.limit_remain = G.potion.limit_remain), v.pJsnData.formation = [];
                            for (var c = 0; c <= v.gGameStatus.player.number; c++)v.pJsnData.formation.push(String(c));
                            for (var c = 0; c < v.pJsnData.player.number; c++) {
                                if (b.contains(v.pJsnData.formation, String(c)) || (v.pJsnData.player.param[c].hp = Sa ? G.hp[c] : v.pJsnData.player.param[c].hpmax), !Sa) {
                                    var d = v.pJsnData.player.param[c].recastmax;
                                    d > 100 && d - 100 > v.pJsnData.player.param[c].recast && (d = v.pJsnData.player.param[c].recast + 100), v.pJsnData.player.param[c].recast = d
                                }
                                v.pJsnData.player.param[c].alive = 1, v.pJsnData.player.param[c].condition.buff = [], v.pJsnData.player.param[c].condition.debuff = []
                            }
                            var e = a.extend(!0, {}, v.pJsnData);
                            v.gGameStatus.player.param = [];
                            for (var c = 0; c <= v.gGameStatus.player.number; c++)v.gGameStatus.player.param.push(e.player.param[e.formation[c]]), v.gGameStatus.replacehit[e.formation[c]] = v.pJsnData.player.param[e.formation[c]].effect
                        }), f.mWaitAll([g, k, p], {playtime: 1});
                        var M = 0, ba = 2;
                        b.each(b.range(v.gGameStatus.player.number + 1), function (c) {
                            p.timeline[0].call(function (b) {
                                v.gAryCntnAvatar[b].removeChild(v.gAryRootAvatar[b]);
                                var c = new lib[v.pJsnData.player.param[b].cjs];
                                v.gAryRootAvatar[b] = c, v.gAryCntnAvatar[b].addChild(c), f.mChangeMotionInstantly({motion: "chara_in", pos: b, type: "player"}), 0 == b ? a(".lis-character" + b + ">img").attr("src", Game.imgUri + "/sp/assets/leader/raid_normal/" + v.pJsnData.player.param[b].pid_image + ".jpg") : a(".lis-character" + b + ">img").attr("src", Game.imgUri + "/sp/assets/npc/raid_normal/" + v.pJsnData.player.param[b].pid_image + ".jpg")
                            }, [c]), p.timeline[0].call(function (b) {
                                a(".prt-command-top .prt-member .lis-character" + b).removeClass("blank"), a(".prt-command-top .prt-member .lis-character" + b).removeClass("mask-black-fade");
                                for (var c = 0; c < v.gGameStatus.player.param.length; c++)a(".prt-command .prt-gauge-special.character" + c).find(".prt-shine").hide()
                            }, [da]), i.mPlayerGaugeHp(g.timeline[c], {pos: c, param: {hp: Sa ? G.hp[c] : v.pJsnData.player.param[c].hpmax, hpmax: v.pJsnData.player.param[c].hpmax}});
                            var d = a.extend(!0, {}, v.pJsnData.player.param[c]);
                            i.mPlayerGaugeRecast(g.timeline[c], {pos: c, param: d}), i.mPlayerGaugeAttr(g.timeline[c], {pos: c, param: v.pJsnData.player.param[c]}), M = h.mEffect(g.timeline[c], v.gAryCntnAvatar[c], {kind: "ab_3000"}), f.mWaitAll([g, k, p], {playtime: ba});
                            var e = 0;
                            if (Sa) {
                                var j = /^-\d+$/;
                                e = j.test(G.hp[c] - Ta[c].hp) ? String(G.hp[c]).split("") : String(G.hp[c] - Ta[c].hp).split("")
                            } else e = String(b.clone(v.pJsnData.player.param[c].hpmax) - Ta[c].hp).split("");
                            var l = t.createHealComponent(e, "player", c);
                            g.timeline[c].call(function () {
                                l.show()
                            })
                        }), p.timeline[0].call(function () {
                            v.gGameStatus.menu = "rematch"
                        }), p.timeline[0].call(function () {
                            a(".prt-condition").css("display", "block")
                        }), p.timeline[0].call(function () {
                            v.gGameStatus.lose = !1
                        }), f.mWaitAll([g, k, p], {playtime: 3}), w.resolve();
                        break;
                    case"lose":
                    case"force_lose":
                    case"survival_lose":
                        v.gGameStatus.finish = !0, v.gGameStatus.lose = !0, v.gGameStatus.shouldPlayFixedBGM = !0, p.timeline[0].call(function () {
                            v.gGameStatus.auto_attack && t.changeAutoMode(), t.ResetAllAttackQueue()
                        }), v.pJsnData.is_multi || p.timeline[0].call(function () {
                            a(".prt-condition").css("display", "none"), a(".prt-condition").fadeOut(), i.mHideBossGauge(wa), i.mRemoveConditionField()
                        });
                        var Oa = v.gGameParam.cjs.quest_failed, Fa = new lib[Oa], Pa = new createjs.Container;
                        Pa.addChild(Fa), Pa.x = v.gGameParam.relative.lose.x, Pa.y = v.gGameParam.relative.lose.y, v.gMasterContainer.addChild(Pa);
                        var M = Fa[Oa][Oa + "_end"].timeline.duration;
                        p.timeline[0].call(function () {
                            Fa[Oa].gotoAndPlay("end")
                        }, [Pa]);
                        var Ua = ((((v || {}).gGameStatus || {}).bossmode || {}).looks || {}).mode;
                        Ua && b.each(Ua, function (a, b) {
                            k.timeline[0].call(function () {
                                t.changeBossMode(b, a)
                            })
                        }), f.mWaitAll([g, k, p], {playtime: M + 12}), p.timeline[0].call(function () {
                            o.unsetBGM()
                        }), 1 != v.pJsnData.multi && p.timeline[0].call(function () {
                            b.each(v.gGameStatus.timer, function (a) {
                                clearInterval(a)
                            })
                        }), (b.isUndefined(s) || v.gGameStatus.rep + 1 == q.trn) && p.timeline[0].call(function () {
                            if (v.pJsnData.is_arcarum && v.pJsnData.arcarum.is_tp_recovery)t.UseTpRecover(); else if ("force_lose" == G.cmd || "survival_lose" == G.cmd) {
                                v.gGameStatus.force_lose = !0, v.gAryRootParts[4][v.gGameParam.cjs.parts[4]].gotoAndPlay("in"), v.gAryCntnParts[4].visible = !0, a(".prt-command-end").css("display", "block"), a(".prt-mask-other").show();
                                var d;
                                d = 1 == v.pJsnData.is_multi ? "#result_multi/" + v.pJsnData.raid_id + "/" + (t.currentFps / 6 - 1) : "#result/" + v.pJsnData.raid_id + "/" + (t.currentFps / 6 - 1), a(".btn-result").one("tap", function () {
                                    o.stopBGM(v.pJsnData.bgm), v.gAryRootParts[4][v.gGameParam.cjs.parts[4]].gotoAndPlay("out"), t.content_close(), c.history.navigate(d, !0)
                                })
                            } else b.isUndefined(G.tips) ? t.LosePopShow() : (v.pJsnData.is_multi && v.pJsnData.cheer_status && !v.pJsnData.is_semi ? a(".prt-tips").attr({cheer: "1"}) : a(".prt-tips").attr({cheer: "0"}), a(".prt-tips .txt-title").html(G.tips.title), a(".prt-tips .txt-body").html(G.tips.body), a(".prt-tips").show())
                        }), p.timeline[0].call(function () {
                            v.gMasterContainer.removeChild(Pa)
                        }), w.resolve();
                        break;
                    case"temporary":
                        p.timeline[0].call(function () {
                            v.gGameStatus.temporary.small = G.small || 0, v.gGameStatus.temporary.large = G.large || 0, i.mUpdateTemporaryItem()
                        }), w.resolve();
                        break;
                    case"event_temporary":
                    case"defendorder_temporary":
                        p.timeline[0].call(function () {
                            v.gGameStatus.event.item[G.item_id].number = G.number
                        }), w.resolve();
                        break;
                    case"message":
                        t.executeMessage([g, k, p], G, function () {
                            w.resolve()
                        });
                        break;
                    case"information":
                        t.MultiLog({message: G.text, language: G.language}), w.resolve();
                        break;
                    case"serif":
                        var Q = null;
                        "player" === G.to ? Q = g.timeline[G.pos] : "boss" === G.to && (Q = k.timeline[G.pos]), i.mBalloonMessage(Q, G), a.when(J).done(function () {
                            w.resolve()
                        });
                        break;
                    case"time_up":
                    case"retire":
                        if (v.gGameStatus.finish)t.popQuestRetire(e, function () {
                            var a = "#quest";
                            G.next_url ? a = G.next_url : v.pJsnData.is_coopraid && (a = v.pJsnData.event_coopraid_name ? "#" + v.pJsnData.event_coopraid_name + "/coopraid" : "#coopraid"), t.content_close(), u.hash(a, {refresh: !0})
                        }); else {
                            v.gGameStatus.finish = !0, v.gGameStatus.battle_end = !0, p.timeline[0].call(function () {
                                a(".prt-mask-other").show()
                            }), p.timeline[0].call(function () {
                                b.each(v.gGameStatus.timer, function (a) {
                                    clearInterval(a)
                                })
                            });
                            var Va = "retire" !== G.cmd ? v.gGameStatus.defaultmotion : "hide";
                            f.mChangeMotionAll(v.gAryRootAvatar, g.timeline, {motion: Va, mc: v.gGameStatus.player.param, type: "player", is_alive: "on"}), p.timeline[0].call(function () {
                                a(".prt-condition").css("display", "none"), i.mHideBossGauge(wa), i.mRemoveConditionField(), v.pJsnData.is_defendorder && i.mRemoveConditionAssistUnit(), a(".img-diagram").removeClass("display-on").addClass("display-off"), a(".prt-temporary").removeClass("display-on").addClass("display-off"), a(".cnt-raid-information .btn-chat").removeClass("display-on").addClass("display-off"), a(".btn-attack-start, .btn-command-back").hide(), t.$el.find(".prt-targeting-area").remove(), a(".img-score").hasClass("display-on") && a(".img-score").removeClass("display-on"), "retire" === G.cmd && (v.gAryRootParts[0][v.gGameParam.cjs.parts[0]].gotoAndPlay("out"), v.gAryRootParts[1][v.gGameParam.cjs.parts[1]].gotoAndPlay("out"), v.gAryCntnParts[2].removeChild(v.gAryRootParts[2]), t._removeAutoButton())
                            });
                            var M = v.gAryRootParts[0][v.gGameParam.cjs.parts[0]][v.gGameParam.cjs.parts[0] + "_out"].timeline.duration;
                            f.mWaitAll([g, k, p], {playtime: M});
                            var Oa = v.gGameParam.cjs.quest_failed, Fa = new lib[Oa], Pa = new createjs.Container;
                            Pa.addChild(Fa), Pa.x = v.gGameParam.relative.lose.x, Pa.y = v.gGameParam.relative.lose.y, v.gMasterContainer.addChild(Pa);
                            var M = Fa[Oa][Oa + "_end"].timeline.duration;
                            p.timeline[0].call(function (a) {
                                Fa[Oa].gotoAndPlay("end")
                            }, [Pa]), f.mWaitAll([g, k, p], {playtime: M}), p.timeline[0].call(function () {
                                o.unsetBGM()
                            });
                            var Wa = !1;
                            p.timeline[0].call(function () {
                                a(".prt-command-end").css("display", "block").addClass("retire"), "retire" === G.cmd && (v.gAryRootParts[4][v.gGameParam.cjs.parts[4]].gotoAndPlay("in"), v.gAryCntnParts[4].visible = !0), "time_up" === G.cmd && t.popShowTimeUp(), a(".btn-result, .pop-time-up .btn-usual-ok").click(function () {
                                    if ("retire" === G.cmd && v.gAryRootParts[4][v.gGameParam.cjs.parts[4]].gotoAndPlay("out"), !Wa)if (Wa = !0, "time_up" === G.cmd) {
                                        var a = new d, b = {raid_id: v.pJsnData.raid_id};
                                        a.preSave(v.gGameStatus.shouldReAuth, b, {url: a.urlRoot("time_up", "", v.pJsnData.is_multi, v.pJsnData.is_semi), silent: !0, error: function () {
                                            Wa = !1
                                        }, success: function () {
                                            if (t.off(), t.undelegateEvents(), t.stopListening(), v.pJsnData.is_multi)var a = "#result_multi/" + v.pJsnData.raid_id; else var a = "#result/" + v.pJsnData.raid_id;
                                            Game.baseUri + a;
                                            location.hash = a
                                        }})
                                    } else"retire" === G.cmd && t.popQuestRetire(e, function () {
                                        var a = "#quest";
                                        G.next_url && "#event/sky" != G.next_url ? a = G.next_url : v.pJsnData.is_coopraid && (a = v.pJsnData.event_coopraid_name ? "#" + v.pJsnData.event_coopraid_name + "/coopraid" : "#coopraid");
                                        Game.baseUri + a;
                                        t.content_close(), u.hash(a, {refresh: !0})
                                    })
                                })
                            })
                        }
                        w.resolve();
                        break;
                    case"wait":
                        f.mWaitAll([g, k, p], {playtime: G.fps}), w.resolve();
                        break;
                    case"bgm":
                        v.gGameStatus.shouldPlayFixedBGM || p.timeline[0].call(function () {
                            var a = v.pJsnData.bgm = G.value;
                            a && E(a)
                        }), w.resolve();
                        break;
                    case"battlelog":
                        p.timeline[0].call(function () {
                            var a = b.isObject(G.title) ? G.title[Game.lang] : G.title, c = b.isObject(G.body) ? G.body[Game.lang] : G.body, d = {"class": "log-battle", title: a, body: c};
                            i.mLog(d)
                        }), w.resolve();
                        break;
                    case"dungeon_item":
                        v.gGameStatus.finish = !0, t.dungeonItems = G.items, p.timeline[0].call(function () {
                            var c = new r({className: "pop-dungeon-item", title: C.getMessage("raid_11"), body: b.template(a("#tpl-dungeon-item").html(), {name: G.name, items: G.items}), flagBtnCancel: 0, flagBtnOk: 0});
                            c.render(), c.popShow(!0, 50)
                        }), w.resolve();
                        break;
                    case"image_change":
                        p.timeline[0].call(function () {
                            v.pJsnData.player.param[v.pJsnData.formation[G.pos]].pid_image = G.image_id, v.gGameStatus.player.param[G.pos].pid_image = G.image_id, t.renewCharaList()
                        }), w.resolve();
                        break;
                    case"threeact_type_aura_reset":
                        p.timeline[0].call(function () {
                            f.mChangeMotionInstantly({motion: "attack", pos: G.pos, type: "player"})
                        }), w.resolve();
                        break;
                    default:
                        w.resolve()
                }
                if (e.microtime)switch (G.cmd) {
                    case"rematch":
                        la(e.microtime), ma(e.microtime);
                        break;
                    case"attack":
                        G.from && (G.from.indexOf("player") >= 0 ? oa(e.microtime) : G.from.indexOf("boss") >= 0 && la(e.microtime));
                        break;
                    case"damage":
                    case"effect":
                    case"heal":
                    case"ability":
                    case"die":
                    case"resurrection":
                    case"replace":
                        G.to && (G.to.indexOf("player") >= 0 ? la(e.microtime) : G.to.indexOf("boss") >= 0 && oa(e.microtime));
                        break;
                    case"special":
                    case"special_npc":
                    case"super":
                    case"friend":
                        G.target && (G.target.indexOf("player") >= 0 ? la(e.microtime) : G.target.indexOf("boss") >= 0 && oa(e.microtime));
                        break;
                    case"summon":
                    case"summon_simple":
                        oa(e.microtime);
                        break;
                    case"condition":
                        G.to && (G.to.indexOf("player") >= 0 ? ma(e.microtime) : G.to.indexOf("boss") >= 0 && oa(e.microtime));
                        break;
                    case"modechange":
                        oa(e.microtime);
                        break;
                    case"win":
                    case"finished":
                    case"time_up":
                    case"retire":
                        qa(e.microtime);
                        break;
                    case"bgm":
                        ra(e.microtime)
                }
                return w
            })) : !0
        }), w
    }, createDamageComponent: function (a, c, d, e, f) {
        var g = {}, h = 12 * (a.split.length - 1);
        if ("player" === c) {
            var i = stage.gGameParam.grid.player[a.pos];
            g.x = i.x - h, g.y = i.y - 100
        } else {
            var j = this.convertBossPositionToContainerIndex(a.pos), k = stage.gBossContainer.getChildAt(j);
            "l" === stage.pJsnData.boss.type ? (g.x = k.x + h, g.y = k.y - 270) : (g.x = k.x + h, g.y = k.y - 150), g.x = g.x + +stage.pJsnData.boss.param[a.pos].damage_position_plus.x, g.y = g.y + +stage.pJsnData.boss.param[a.pos].damage_position_plus.y
        }
        if (!b.isUndefined(a.miss) && 1 == a.miss) {
            var l = new z.components.OverheadMessage(this.spriteSheetManager.getById("raid_ui_0"), "miss", "", !1);
            return l.x = g.x, l.y = g.y, l.addEventListener("animationEnd", function p() {
                l.parent.removeChild(l), l.removeEventListener("animationEnd", p)
            }), stage.addChild(l), l
        }
        var e = b.isUndefined(a.attr) ? e || 0 : a.attr, m = a.size || "m", n = {attributeId: e, num: a.split, size: m, isCritical: a.critical}, o = new z.components.Damage(this.spriteSheetManager.getById("raid_ui_0"), n);
        if (o.x = g.x, o.y = g.y, !b.isUndefined(f))switch (f) {
            case 0:
                o.y += 50;
                break;
            case 1:
                o.x += 70, o.y -= 50
        }
        return d && ("player" === c ? (o.x += Math.round(30 * Math.random()) - 20, o.y += Math.round(100 * Math.random()) - 40) : (o.x += Math.round(80 * Math.random()) - 20, o.y += Math.round(80 * Math.random()) - 40)), o.addEventListener("animationEnd", function q() {
            o.parent.removeChild(o), o.removeEventListener("animationEnd", q)
        }), stage.addChild(o), o
    }, createTotalDamageComponent: function (a, b, c, d) {
        var b = b || 0, e = c || "l", f = {attributeId: b, num: a.split, size: e, isTotal: !0}, d = d || 0, g = new z.components.Damage(this.spriteSheetManager.getById("raid_ui_0"), f);
        if ("l" === stage.pJsnData.boss.type)g.x = 400 + 50 * d, g.y = 350 + 60 * d; else {
            var h = this.convertBossPositionToContainerIndex(a.pos), i = stage.gBossContainer.getChildAt(h);
            g.x = i.x + 50 + 50 * d, g.y = i.y - 150 + 60 * d
        }
        return g.addEventListener("animationEnd", function j() {
            g.parent.removeChild(g), g.removeEventListener("animationEnd", j)
        }), stage.addChild(g), g
    }, createHealComponent: function (a, b, c) {
        var d = new z.components.Heal(this.spriteSheetManager.getById("raid_ui_0"), a), e = 12 * (a.length - 1);
        if ("player" === b) {
            var f = stage.gGameParam.grid.player[c];
            d.x = f.x - e, d.y = f.y - 160
        } else {
            var g = this.convertBossPositionToContainerIndex(c), h = stage.gBossContainer.getChildAt(g);
            "l" === stage.pJsnData.boss.type ? (d.x = h.x + e, d.y = h.y - 330) : (d.x = h.x + e, d.y = h.y - 210), d.x = d.x + +stage.pJsnData.boss.param[c].damage_position_plus.x, d.y = d.y + +stage.pJsnData.boss.param[c].damage_position_plus.y
        }
        return d.addEventListener("animationEnd", function i() {
            d.parent.removeChild(d), d.removeEventListener("animationEnd", i)
        }), stage.addChild(d), d
    }, createOverheadMessageComponent: function (a, b) {
        var c = this._toMissType(a.miss, a.status), d = a.type ? parseInt(a.type, 10) : "", e = new z.components.OverheadMessage(this.spriteSheetManager.getById("raid_ui_0"), c, a.text, d);
        if ("player" === b) {
            var f = stage.gGameParam.grid.player[a.pos];
            e.x = f.x + stage.gGameParam.grid.message.player.x - e.getBounds().width, e.y = f.y + stage.gGameParam.grid.message.player.y
        } else {
            var g = this.convertBossPositionToContainerIndex(a.pos), h = stage.gBossContainer.getChildAt(g);
            e.x = h.x + parseInt(stage.pJsnData.boss.param[a.pos].message_position.x, 10), e.y = h.y + parseInt(stage.pJsnData.boss.param[a.pos].message_position.y, 10)
        }
        return e.scaleX = .9, e.scaleY = .9, e.addEventListener("animationEnd", function i() {
            e.parent.removeChild(e), e.removeEventListener("animationEnd", i)
        }), stage.addChild(e), e
    }, createEnemyRewardComponent: function (a, b, c) {
        var d = new z.components.EnemyReward(this.spriteSheetManager.getById("raid_ui_0"), b, a), e = this.convertBossPositionToContainerIndex(c), f = stage.gBossContainer.getChildAt(e);
        switch (b) {
            case"rp":
                "l" === stage.pJsnData.boss.type ? (d.x = f.x, d.y = f.y - 330) : (d.x = f.x, d.y = f.y - 230);
                break;
            case"exp":
                "l" === stage.pJsnData.boss.type ? (d.x = f.x, d.y = f.y - 280) : (d.x = f.x, d.y = f.y - 180);
                break;
            case"lupi":
                "l" === stage.pJsnData.boss.type ? (d.x = f.x, d.y = f.y - 250) : (d.x = f.x + 20, d.y = f.y - 150)
        }
        return d.addEventListener("animationEnd", function g() {
            null != d.parent && d.parent.removeChild(d), d.removeEventListener("animationEnd", g)
        }), stage.addChild(d), d
    }, createFieldConditionComponent: function (b) {
        stage.gFieldCondition = new z.components.FieldCondition(b);
        var c = b || 1;
        a("#prt-field-conditions").addClass("position" + c)
    }, createAssistUnitConditionComponent: function () {
        stage.gAssistUnitCondition = new z.components.AssistUnitCondition, a("#prt-assist-unit-conditions").addClass("show")
    }, createAbilityRailComponent: function () {
        var a = new z.components.abilityRail(stage.gGameStatus.abilityRailUse);
        return a.addEventListener("animationEnd", function b() {
            a.parent.removeChild(a), a.removeEventListener("animationEnd", b)
        }), stage.addChild(a), a
    }, loadStatusIcons: function (a, c) {
        var d = [];
        b.each(a, function (a) {
            var b = "icon_status_" + a;
            if (!window.images || !window.images[b]) {
                var c = Game.imgUri + "/sp/ui/icon/status/x64/status_" + a + ".png";
                d.push({src: c, id: b, type: createjs.LoadQueue.IMAGE})
            }
        }), l.addEventListener("complete", function () {
            c()
        }), l.loadManifest(d, !0)
    }, convertBossPositionToContainerIndex: function (a) {
        var b = a;
        return 3 === stage.pJsnData.boss.number && (1 == a ? b = 2 : 2 == a && (b = 1)), b
    }, Attack: function (c, e, g, h, i) {

        var j = this;
        stage.gGameStatus.attacking = 1;
        var k = "normal_attack_result", l = {}, m = {raid_id: stage.pJsnData.raid_id, target_num: stage.gGameStatus.target, lock: stage.gGameStatus.lock};
        b.isUndefined(c) ? l = m : (k = c, l = e || m), stage.gGameStatus.attack_action = k, b.isUndefined(stage.pJsnData.duplicate_key) || (l.duplicate_key = stage.pJsnData.duplicate_key), stage.pJsnData.bgm && (l.playing_bgm = stage.pJsnData.bgm), b.isUndefined(stage.pJsnData.rep) || (j.AttackHide(), k = "rep"), "normal_attack_result" === k && stage.gGameStatus.attack_count++, stage.gGameStatus.node_finish || stage.gGameStatus.is_clear || "ability" === stage.gGameStatus.menu || j.activateMask();
        var n = a("body"), o = n, p = a(document).scrollTop();
        Game.ua.isJssdk() && (n = a("#mobage-game-container"), p = a("#mobage-game-container").parent().scrollTop());
        var q = o.hasClass("pc") || o.hasClass("jssdk");
        if (q || n.on("cgtouchstart", function (a) {
            a.preventDefault()
        }), p > 1 && window.scrollTo(0, 0), a(".prt-battle, .prt-navi").removeClass("display-on"), a(".btn-chat").removeClass("display-on").addClass("display-off"), clearInterval(stage.gGameStatus.timer.mBalloon), "ability_result" === k ? a(".prt-sub-command> div.btn-temporary").addClass("black") : a(".prt-sub-command> div").addClass("black"), stage.pJsnData.tutorial_flag && stage.gAryRootParts[0][stage.gGameParam.cjs.parts[0]].gotoAndPlay("tap_out"), a(".btn-revival").hide(), "ability" !== stage.gGameStatus.menu && "summon" !== stage.gGameStatus.menu && "temporary" !== stage.gGameStatus.menu && !stage.gGameStatus.tutorial_state) {
            a(".prt-command-chara").hide();
            var r = a("#okugi-btn-mask"), s = a("#prt-sub-command-group");
            r.css("display", "block"), s.find(".btn-lock").addClass("black"), setTimeout(function () {
                r.css("display", "none"), s.find(".btn-lock").removeClass("black")
            }, 1250);
            var t = stage.gAryRootParts[0][stage.gGameParam.cjs.parts[0]][stage.gGameParam.cjs.parts[0] + "_out"].timeline.duration;
            setTimeout(function () {
                stage.gAryRootParts[2][stage.gGameParam.cjs.parts[2]].gotoAndPlay("in"), stage.gAryCntnParts[2].visible = !0
            }, t * stage.gGameParam.spf)
        }
        if ("temporary" !== stage.gGameStatus.menu && !stage.gGameStatus.tutorial_state) {
            var u = 0, v = 0;
            if (!stage.gGameStatus.motion) {
                for (var t = 0, w = 0; w < stage.gAryCntnAvatar.length; w++)1 == stage.gGameStatus.player.param[w].alive && 1 == stage.pJsnData.battle.count && 1 == stage.gGameStatus.turn && (parseInt(stage.gGameStatus.player.param[w].recast) < parseInt(stage.gGameStatus.player.param[w].recastmax) || 1 == stage.gGameStatus.lock) && (t = f.mChangeMotionInstantly({motion: "setup", pos: w, type: "player", delay: v * w}), stage.pJsnData.tutorial_flag !== !0 && f.mChangeMotionInstantly({motion: "stbwait", pos: w, type: "player", delay: t + v * w}));
                u = v * (stage.gAryCntnAvatar.length - 1) + t + v
            }
        }
        var x = new Date, y = new d, z = this;
        console.ll('attack');

        y.preSave(stage.gGameStatus.shouldReAuth, l, {url: y.urlRoot(k, l.mode, stage.pJsnData.is_multi, stage.pJsnData.is_semi), silent: !0, error: function () {
            z.inactivateMask(), stage.gGameStatus.attacking = 0, stage.gGameStatus.usingAbility = 0, j.ResetAllAttackQueue(), j.CommandChangeTop()
        }, success: function () {
            z.trigger(Na);
            var c = y.toJSON();
            console.l(c,'attack_result');
            console.ll('trigger play scenario');
            console.l(u,'u');
            console.l(g,'g');
            console.l(i,'i');
            if (c.is_round_end) {
                var d = c.is_in_intermission ? C.getMessage("arcarum_inter_mission_1") : C.getMessage("arcarum_7");
                j.popQuestMessage({title: C.getMessage("arcarum_6"), message: d, url: c.redirect_url || "event/arcarum001/top"})
            } 
            else b.isUndefined(c.scenario) || !0 === c.errorPopFlag ? b.isUndefined(stage.pJsnData.rep) ? (j.inactivateMask(), a(".prt-sub-command>div").removeClass("black"), stage.gGameStatus.attacking = 0, stage.gGameStatus.usingAbility = 0, j.$el.find(".pop-usual:not(.common-pop-error)").css("display", "none").removeClass("pop-show pop-hide"), j.ResetAllAttackQueue(), j.CommandBackTop(), n.off("cgtouchstart"), stage.gAryRootParts[0][stage.gGameParam.cjs.parts[0]].gotoAndPlay("in"), a(".btn-attack-start").removeClass("display-off").addClass("display-on"), j._offAutoButton(), j._hideAutoButton(), "ability_result" === k && (a(".prt-ability-dialog").removeClass("disable"), stage.gGameStatus.$use_cancel_ability.children().attr("ability-recast", 0)), stage.gGameStatus.btn_lock = !1) : j.playScenarios(c, u, x, g, i) : (j.RejectSameTimeAttack(c), !window.dmode && (isNaN(stage.gGameParam.fps) || createjs.Ticker.getFPS() > 24) && createjs.Ticker.setFPS(24), b.isUndefined(c.status) || (stage.gGameStatus.is_escorted_character_dead = b.isUndefined(c.status.is_escorted_character_dead) ? 0 : c.status.is_escorted_character_dead), j.playScenarios(c, u, x, g, i))
        }})
    }, RejectSameTimeAttack: function (a) {
        var c = !1;
        if (b.each(a.scenario, function (a) {
            "win" !== a.cmd || a.is_finisher || (c = !0)
        }), c) {
            var d = [];
            b.each(a.scenario, function (a) {
                ("die" === a.cmd || "drop" === a.cmd || "win" === a.cmd) && d.push(a)
            }), a.scenario = d
        }
    }, checkPlayerAllDead: function () {
        stage.gGameStatus.player.all_dead = !0;
        for (var a = 0; a < stage.gGameStatus.player.param.length; a++)if (0 != stage.gGameStatus.player.param[a].alive) {
            stage.gGameStatus.player.all_dead = !1;
            break
        }
    }, AbilityOn: function () {
        a(".pop-ability").show()
    }, AbilityUse: function () {
        if (stage.gGameStatus.action.ab_select) {
            var c = stage.gGameStatus.attackQueue.$useAbility[0], d = c.children().attr("ability-character-num"), e = b.indexOf(stage.pJsnData.formation, String(d)), f = stage.gGameStatus.player.param[e].condition.ability_available_flag, g = "", h = "", i = parseInt(c.find('[class^="ico-ability"]').attr("ability-pick"));
            if (2 == i || 4 == i) {
                var j = stage.gGameStatus.attackQueue.param[0].ability_aim_num;
                (b.indexOf(stage.pJsnData.formation, String(j)) < 0 || 0 == stage.pJsnData.player.param[j].alive || stage.pJsnData.player.param[j].hp < 1 || 4 != i && stage.pJsnData.player.param[j].hp >= stage.pJsnData.player.param[j].hpmax) && (g = "raid_82", h = "raid_86")
            } else 0 != f && c.hasClass("btn-ability-available") || (g = "raid_82", h = "raid_83");
            if ("" != g && "" != h)this.popShowAbilityError(g, h), stage.gGameStatus.attacking = 0, stage.gGameStatus.usingAbility = 0, stage.gGameStatus.btn_lock = !1, this.ResetAllAttackQueue(), stage.gAryRootParts[0][stage.gGameParam.cjs.parts[0]].gotoAndPlay("in"), a(".btn-attack-start").removeClass("display-off").addClass("display-on"), this.CommandBackTop(); else {
                var k = stage.gGameStatus.menu;
                stage.gGameStatus.menu = "ability", stage.gGameStatus.attackQueue.param[0].target_num = stage.gGameStatus.target, this.Attack("ability_result", stage.gGameStatus.attackQueue.param[0]), stage.gGameStatus.menu = k
            }
        }
    }, SummonUse: function () {
        if (1 == stage.pJsnData.player.param[0].alive) {
            var b = this.GetHeroPos();
            if (0 > b || 0 == stage.gGameStatus.player.param[b].condition.summon_available_flag)return stage.gAryRootParts[0][stage.gGameParam.cjs.parts[0]].gotoAndPlay("in"), a(".btn-attack-start").removeClass("display-off").addClass("display-on"), this.CommandBackTop(), void this.popShowSummonFail();
            if (!stage.gGameStatus.btn_lock) {
                stage.gGameStatus.btn_lock = !0;
                var c = a(".btn-summon-use").attr("summon-id"), d = {raid_id: stage.pJsnData.raid_id, target_id: stage.gGameStatus.target, lock: stage.gGameStatus.lock, summon_id: c};
                this.Attack("summon_result", d)
            }
        }
    }, ConditionPopBoss: function (b) {
        var c = parseInt(a(b.currentTarget).attr("target")) - 1;
        this.ConditionPop(1, c, c)
    }, ConditionPopPlayer: function (b) {
        var c = a(b.currentTarget).parent("div").attr("target"), d = a(b.currentTarget).parent("div").attr("pos"), e = a(b.currentTarget).parent("div").attr("pos");
        this.ConditionPop(c, d, e)
    }, ConditionPop: function (c, d, e) {
        if (!stage.gGameStatus.is_escorted_character_dead && !stage.gGameStatus.player.all_dead) {
            var f = this, g = 0 == c ? stage.gGameStatus.player.param[d].name : stage.gGameStatus.boss.param[d].name[Game.lang];
            0 == c && (d = stage.pJsnData.formation[d]), this.scrollPopShow("<div class='pop-condition'>" + C.getMessage("raid_12") + "</div>");
            var h = new p;
            h.fetch({url: h.urlRoot("condition/" + stage.pJsnData.raid_id + "/" + c + "/" + d, "", stage.pJsnData.is_multi, stage.pJsnData.is_semi), silent: !0, error: function () {
            }, success: function () {
                var j = h.toJSON();
                "undefined" == typeof j.condition.buff && (j.condition.buff = []), "undefined" == typeof j.condition.debuff && (j.condition.debuff = []), +W !== +stage.gGameStatus.bossmode.looks.mode[d] && (j.condition.debuff = b.reject(j.condition.debuff, function (a) {
                    return b.some(V, function (b) {
                        return+b === +a.status
                    })
                })), f.$el.find("#pop-scroll .pop-condition").html(b.template(a("#tpl-condition-list").html(), b.extend(j, {pos: d + 1, tgt: c
                }))), a(".pop-condition .prt-condition-title").html(g);
                var k = f.$el.find(".pop-condition"), l = f.$el.find(".cnt-raid");
                if (f.popScrollHeightDelta = +l.outerHeight() - +k.outerHeight(), 0 > f.popScrollHeightDelta) {
                    var m = +l.css("padding-bottom").replace(/px/g, "") + Math.abs(f.popScrollHeightDelta);
                    l.css("padding-bottom", m + "px")
                }
                var n = 0 == c ? "player" : "boss";
                stage.gGameStatus[n].param[e].condition.buff = [], stage.gGameStatus[n].param[e].condition.debuff = [], b.each(j.condition.buff, function (a) {
                    stage.gGameStatus[n].param[e].condition.buff.push({status: a.status})
                }), b.each(j.condition.debuff, function (a) {
                    stage.gGameStatus[n].param[e].condition.debuff.push({status: a.status, is_unusable_harb: a.is_unusable_harb})
                }), 0 == c ? i.mConditionPlayer(j.condition, e) : (wa[d].condition.setCondition(stage.gGameStatus[n].param[e].condition, stage.gGameStatus.bossmode.looks.mode[d]), i.mConditionBoss(wa))
            }})
        }
    }, fetchFieldCondition: function () {
        this.scrollPopShow("<div class='pop-condition'>" + C.getMessage("raid_12") + "</div>");
        var a = new (v.extend({urlRoot: Game.baseUri + this.getRaidType() + "/field_effect/" + stage.pJsnData.raid_id}));
        this.stopListening(a), this.listenTo(a, "sync", this.popFieldCondition), this.fetchFieldCondition = function () {
            a.fetch()
        }, this.fetchFieldCondition()
    }, popFieldCondition: function (c) {
        var d = c.toJSON();
        b.isEmpty(d) ? i.mRemoveConditionField() : i.mConditionField(d);
        var e = a("#pop-scroll .pop-condition");
        e.html(b.template(a("#tpl-pop-field-condition").html(), {field_effect: d})), e.find(".prt-field-condition-title").text(C.getMessage("raid_81"))
    }, fetchAssistUnitCondition: function () {
        this.scrollPopShow("<div class='pop-condition'>" + C.getMessage("raid_12") + "</div>");
        var a = new (v.extend({urlRoot: Game.baseUri + this.getRaidType() + "/unit_effect/" + stage.pJsnData.raid_id}));
        this.stopListening(a), this.listenTo(a, "sync", this.popAssistUnitCondition), this.fetchAssistUnitCondition = function () {
            a.fetch()
        }, this.fetchAssistUnitCondition()
    }, popAssistUnitCondition: function (c) {
        var d = c.toJSON(), e = a("#pop-scroll .pop-condition");
        e.html(b.template(a("#tpl-pop-assist-unit-condition").html(), {assist_unit: d})), e.find(".prt-assist-unit-condition-title").text(C.getMessage("raid_do_3"))
    }, enemyTargeting: function (c) {
        var d = parseInt(a(c.currentTarget).attr("target")), e = d - 1;
        0 != stage.gGameStatus.boss.param[e].alive && (stage.gGameStatus.target == d ? (stage.gGameStatus.target = 0, a(".btn-targeting").removeClass("lock-on"), wa[e].unmarkTarget()) : (b.each(wa, function (a) {
            a.unmarkTarget()
        }), stage.gGameStatus.target = d, a(".btn-targeting").removeClass("lock-on"), a('.btn-targeting[target="' + d + '"]').addClass("lock-on"), wa[e].markTarget()), this.showEnemyInfo())
    }, CommandLock: function (b) {
        if (!this._isCommandLockDisallowed() && !a(b.currentTarget).hasClass("disabled")) {
            var c = stage.gGameStatus;
            if (1 === +c.lock)c.lock = 0; else if (0 === +c.lock && (c.lock = 1, "ability" !== c.menu && "summon" !== c.menu && 1 !== c.attacking))for (var d = c.player.param, e = 0, g = stage.gAryRootAvatar.length; g > e; ++e)1 === +d[e].alive && f.mChangeMotionInstantly({motion: c.defaultmotion, pos: e, type: "player"});
            this._setting_model || (this._setting_model = new (s.extend({urlRoot: Game.baseUri + "raid/setting"}))), this._setting_model.save({set: "special_skill", value: c.lock}, {success: function () {
            }, error: function () {
            }, silent: !0}), a(".btn-lock").removeClass().addClass("btn-lock lock" + c.lock), stage.gGameStatus.attacking || this.renewCharaList()
        }
    }, _isCommandLockDisallowed: function () {
        this.commandLockTime || (this.commandLockTime = 0);
        var a = Date.now();
        return a - this.commandLockTime < 1e3 ? !0 : (this.commandLockTime = a, !1)
    }, ItemUseOk: function () {
        if (w.remove("lose_pop_flg"), w.remove("cheer_compleate"), w.remove("cheer_effect_text"), stage.gAryRootParts[0][stage.gGameParam.cjs.parts[0]].gotoAndPlay("out"), stage.gGameStatus.node_finish || this.HideCommand(), !stage.gGameStatus.btn_lock) {
            stage.gGameStatus.btn_lock = !0, stage.gGameStatus.pop_limit = !0, this.popView.popClose(), this.hideMask(), a(".btn-revival").hide(), stage.gGameStatus.menu = "temporary", stage.gGameStatus.finish = !1;
            for (var c = {raid_id: stage.pJsnData.raid_id}, d = b.clone(stage.pJsnData.player.param), e = d.length, f = 0; e > f; f += 1) {
                var g = d[f];
                b.isUndefined(g) || (g.condition.hide_hp_flag = !1)
            }
            this.Attack("user_recovery", c)
        }
    }, UseTempItem: function (c) {
        if (!(a(c.currentTarget).hasClass("disabled") || b.isUndefined(stage.gGameStatus.temporary) || b.isUndefined(stage.gGameStatus.temporary.small) || b.isUndefined(stage.gGameStatus.temporary.large) || 1 == stage.gGameStatus.attacking || stage.gGameStatus.attackQueue.index.length > 0)) {
            stage.gGameStatus.event_item_flg = !1;
            var d = {temporary_potion_one_count_before: stage.gGameStatus.temporary.small, temporary_potion_one_count_after: stage.gGameStatus.temporary.small <= 0 ? 0 : stage.gGameStatus.temporary.small - 1, temporary_potion_all_count_before: stage.gGameStatus.temporary.large, temporary_potion_all_count_after: stage.gGameStatus.temporary.large <= 0 ? 0 : stage.gGameStatus.temporary.large - 1, potion_count_before: stage.gGameStatus.potion.count, potion_count_after: stage.gGameStatus.potion.count <= 0 ? 0 : stage.gGameStatus.potion.count - 1, temporary_potion_one_name: stage.pJsnData.temporary_potion_one_name, temporary_potion_all_name: stage.pJsnData.temporary_potion_all_name, event: b.isUndefined(stage.gGameStatus.event) ? !1 : stage.gGameStatus.event, can_use_event_item: stage.pJsnData.event_coopraid_name ? !1 : !0};
            this.popView = new r({className: "pop-raid-item", title: C.getMessage("raid_13"), body: b.template(this._getTplPopRecover(), d), flagBtnCancel: 1, flagBtnOk: 0}), this.popView.render(), this.popView.popShow(!0, "50px"), a(".prt-command").css({"z-index": "5"}), a(".prt-item-small, .prt-item-large, .btn-usual-use").hide(), stage.gGameStatus.player.all_dead && a(".pop-raid-item .item-large, .pop-raid-item .item-small").addClass("dead")
        }
    }, _getTplPopRecover: function () {
        var b = a("#tpl-pop-recover").html();
        return this._getTplPopRecover = function () {
            return b
        }, this._getTplPopRecover()
    }, ConfirmTempItemSmall: function (a) {
        if (0 != stage.gGameStatus.temporary.small && !stage.gGameStatus.player.all_dead) {
            stage.gGameStatus.chara_select = 2, "top" !== stage.gGameStatus.menu && this.CommandBackTop(), this.$el.find(".prt-sub-command>div").addClass("black disabled prt-silent-se");
            var c = {temporary_potion_one_count_before: stage.gGameStatus.temporary.small, temporary_potion_one_count_after: stage.gGameStatus.temporary.small <= 0 ? 0 : stage.gGameStatus.temporary.small - 1, temporary_potion_one_name: stage.pJsnData.temporary_potion_one_name};
            this.popView.popClose(), this.popView = new r({className: "pop-raid-item", title: C.getMessage("raid_13"), body: b.template(this._getTplTemporarySmall(), c), flagBtnCancel: 1, flagBtnOk: 0}), this.popView.render(), this.popView.popShow(!0, "50px"), i.mPlayerBannerList(), this.$el.find(".prt-command-top .prt-member .btn-command-character.mask-black, .prt-command-top .prt-member .btn-command-character.blank").addClass("prt-silent-se"), this.$el.find(".prt-command-summon .btn-command-summon, .prt-command-summon .lis-summon").addClass("prt-silent-se")
        }
    }, _getTplTemporarySmall: function () {
        var b = a("#tpl-temporary-small").html();
        return this._getTplTemporarySmall = function () {
            return b
        }, this._getTplTemporarySmall()
    }, ConfirmTempItemLarge: function () {
        if (0 != stage.gGameStatus.temporary.large && !stage.gGameStatus.player.all_dead) {
            var c = {temporary_potion_all_count_before: stage.gGameStatus.temporary.large, temporary_potion_all_count_after: stage.gGameStatus.temporary.large <= 0 ? 0 : stage.gGameStatus.temporary.large - 1, temporary_potion_all_name: stage.pJsnData.temporary_potion_all_name};
            this.popView.popClose(), this.popView = new r({className: "pop-raid-item", title: C.getMessage("raid_13"), body: b.template(this._getTplTemporaryLarge(), c), flagBtnCancel: 1, flagBtnOk: 0});
            var d = this;
            setTimeout(function () {
                d.popView.render(), d.popView.popShow(!0, "50px");
                for (var b = !1, c = 0; c < stage.pJsnData.formation.length; c++) {
                    var e = stage.pJsnData.formation[c];
                    1 == stage.pJsnData.player.param[e].alive && stage.pJsnData.player.param[e].hp < stage.pJsnData.player.param[e].hpmax && (b = !0)
                }
                b ? a(".pop-raid-item .prt-popup-footer").append('<div class="btn-usual-use"></div>') : a(".txt-select-chara").html(C.getMessage("raid_14"))
            }, 1)
        }
    }, _getTplTemporaryLarge: function () {
        var b = a("#tpl-temporary-large").html();
        return this._getTplTemporaryLarge = function () {
            return b
        }, this._getTplTemporaryLarge()
    }, CancelTempItemUse: function () {
        stage.gGameStatus.chara_select = 1, stage.gGameStatus.event_item_flg = !1, a(".prt-command").css({"z-index": "5"}), a(".prt-command-top [class^='lis-character']").removeClass("mask-black prt-silent-se"), a(".prt-summon-list>div").removeClass("mask-black prt-silent-se"), this.$el.find(".prt-sub-command>div").removeClass("black disabled prt-silent-se"), this.popView.popRemove()
    }, UseTempItemSmall: function (b) {
        var c = a(b.currentTarget).attr("pos");
        if (!a(".prt-command-top .lis-character" + c).hasClass("mask-black") && !stage.gGameStatus.btn_lock) {
            stage.gGameStatus.btn_lock = !0, stage.gGameStatus.menu = "temporary", stage.gGameStatus.finish = !1, stage.gAryRootParts[0][stage.gGameParam.cjs.parts[0]].gotoAndPlay("out"), stage.gGameStatus.node_finish || this.HideCommand();
            var d = {raid_id: stage.pJsnData.raid_id, character_num: stage.pJsnData.formation[c]};
            this.Attack("temporary_item_result", d), this.CancelTempItemUse(b)
        }
    }, UseTempItemLarge: function () {
        var a = this;
        if (stage.gAryRootParts[0][stage.gGameParam.cjs.parts[0]].gotoAndPlay("out"), stage.gGameStatus.node_finish || a.HideCommand(), !stage.gGameStatus.btn_lock) {
            stage.gGameStatus.btn_lock = !0, stage.gGameStatus.menu = "temporary", stage.gGameStatus.finish = !1;
            var b = {raid_id: stage.pJsnData.raid_id};
            a.Attack("temporary_item_result", b), a.popView.popRemove(), setTimeout(function () {
                a.hideMask()
            }, 240)
        }
    }, ConfirmEventItem: function (b) {
        var c = a(b.currentTarget).attr("item-id");
        stage.gGameStatus.event.item[c].number <= 0 || (stage.gGameStatus.event_item_flg = !0, stage.gGameStatus.event_use_item_id = c, stage.gGameStatus.event_character_num = !1, 2 == stage.gGameStatus.event.item[c].target ? this.ConfirmPopEventItemAll(c) : this.ConfirmPopEventItemOne(c))
    }, ConfirmPopEventItemAll: function (c) {
        if (this.popView.popClose(), this.popView = new r({className: "pop-event-item", title: C.getMessage("raid_13"), body: b.template(this._getTplTemporaryEvent(), stage.gGameStatus.event.item[c]), flagBtnCancel: 1, flagBtnOk: 1}), this.popView.render(), 1 == c) {
            for (var d = !1, e = 0; e < stage.pJsnData.formation.length; e++) {
                var f = stage.pJsnData.formation[e];
                1 == stage.pJsnData.player.param[f].alive && stage.pJsnData.player.param[f].hp < stage.pJsnData.player.param[f].hpmax && (d = !0)
            }
            d || (a(".txt-select-chara").html(C.getMessage("raid_14")), a(".pop-event-item .prt-popup-footer .btn-usual-ok").remove())
        } else if (3 == c || 4 == stage.pJsnData.event.event_type && 5 == c) {
            for (var d = !1, e = 0; e < stage.pJsnData.player.number; e++)1 != stage.pJsnData.player.param[e].alive && (d = !0);
            d || (a(".txt-select-chara").html(C.getMessage("raid_14")), a(".pop-event-item .prt-popup-footer .btn-usual-ok").remove())
        }
        this.popView.popShow()
    }, _getTplTemporaryEvent: function () {
        var b = a("#tpl-temporary-event").html();
        return this._getTplTemporaryEvent = function () {
            return b
        }, this._getTplTemporaryEvent()
    }, ConfirmPopEventItemOne: function (a) {
        stage.gGameStatus.chara_select = 2, "top" !== stage.gGameStatus.menu && this.CommandBackTop(), this.$el.find(".prt-sub-command").children().addClass("black disabled prt-silent-se"), this.popView.popClose(), this.popView = new r({className: "pop-raid-item", title: C.getMessage("raid_13"), body: b.template(this._getTplTemporaryEvent(), stage.gGameStatus.event.item[a]), flagBtnCancel: 1, flagBtnOk: 0}), this.popView.render(), this.popView.popShow(!0, "50px"), i.mPlayerBannerList({type: "condition"})
    }, UseEventItem: function () {
        if (!a(".prt-command-top .lis-character" + stage.gGameStatus.event_character_num).hasClass("mask-black") && (stage.gAryRootParts[0][stage.gGameParam.cjs.parts[0]].gotoAndPlay("out"), stage.gGameStatus.node_finish || this.HideCommand(), !stage.gGameStatus.btn_lock)) {
            stage.gGameStatus.btn_lock = !0, stage.gGameStatus.menu = "temporary", stage.gGameStatus.finish = !1;
            var b = {raid_id: stage.pJsnData.raid_id, event_type: stage.pJsnData.event.event_type, item_id: stage.gGameStatus.event_use_item_id, character_num: stage.pJsnData.formation[stage.gGameStatus.event_character_num]};
            3 == stage.pJsnData.event.event_type ? stage.pJsnData.is_defendorder ? this.Attack("defendorder_temporary_item_result", b) : this.Attack("event_temporary_item_result", b) : this.Attack("temporary_item_result", b), this.CancelTempItemUse()
        }
    }, UseEventRevivalItem: function (b) {
        if (!stage.gGameStatus.btn_lock) {
            stage.gGameStatus.btn_lock = !0, stage.gGameStatus.menu = "temporary", stage.gGameStatus.finish = !1;
            var c = {raid_id: stage.pJsnData.raid_id, event_type: stage.pJsnData.event.event_type, item_id: a(b.currentTarget).attr("item_id"), character_num: null};
            3 == stage.pJsnData.event.event_type ? stage.pJsnData.is_defendorder ? this.Attack("defendorder_temporary_item_result", c) : this.Attack("event_temporary_item_result", c) : this.Attack("temporary_item_result", c), this.popRemove()
        }
    }, getForceNaviIndex: function (a, c) {
        a = a || stage.pJsnData.navi_information, c = c || 0;
        var d = b.find(b.range(c, b.size(a)), function (b) {
            return 1 === +a[b].is_force
        });
        return void 0 === d && (d = -1), d
    }, NaviShow: function (a) {
        a.navi_type && +a.navi_type === Y && this.activateMask();
        var b = this.$el.find(".prt-navi");
        "block" != b.css("display") && b.css("display", "block"), b.addClass("active display-on"), b.find(".img-chara").attr({src: Game.imgUri + "/sp/raid/navi_face/" + a.navi + ".png"}), b.children(".prt-advice").html(a.text)
    }, NaviNext: function () {
        var b = stage.pJsnData.navi_information, c = ++stage.pJsnData.navi_index;
        0 == stage.gGameStatus.serif && 0 == stage.pJsnData.is_force_navi && (c = this.getForceNaviIndex(b, c)), this.inactivateMask();
        var d = (b || {})[c];
        d ? (stage.pJsnData.navi_index = c, this.NaviShow(d)) : a(".prt-navi").removeClass("active display-on")
    }, popShowMenu: function () {
        if (!stage.gGameStatus.battle_end) {
            if (!stage.gGameStatus.is_escorted_character_dead && !stage.gGameStatus.player.all_dead && stage.gGameStatus.finish)return!0;
            if (!stage.gGameStatus.force_lose) {
                if (b.has(ba, stage.pJsnData.quest_id))return this.popRiddleBattleMenu();
                var c = [], d = {image: ga, alive: ""};
                c[0] = {}, c[0].image = Game.imgUri + "/sp/assets/leader/raid_normal/" + stage.pJsnData.player.param[0].pid_image + ".jpg", c[0].alive = 1 == stage.pJsnData.player.param[0].alive ? "alive" : "dead";
                for (var e = 1; 6 > e; e++)c[e] = {}, b.isUndefined(stage.pJsnData.player.param[e]) ? c[e] = d : (c[e].image = Game.imgUri + "/sp/assets/npc/raid_normal/" + stage.pJsnData.player.param[e].pid_image + ".jpg", c[e].alive = 1 == stage.pJsnData.player.param[e].alive ? "alive" : "dead");
                stage.pJsnData.without_pc && (c = b.reject(c, function (a, b) {
                    return 0 == b
                }), c.push(d));
                var f = {lupi: stage.pJsnData.lupi, treasure1: stage.pJsnData.treasure.treasure_type_1, treasure2: stage.pJsnData.treasure.treasure_type_2, treasure3: stage.pJsnData.treasure.treasure_type_3, treasure4: stage.pJsnData.treasure.treasure_type_4, treasure5: stage.pJsnData.treasure.treasure_type_5, temporary_small: stage.gGameStatus.temporary.small, temporary_large: stage.gGameStatus.temporary.large, potion: stage.gGameStatus.potion.count, multi: stage.pJsnData.multi, member: c, diagram: stage.gGameStatus.diagram, serif: stage.gGameStatus.serif, effect: stage.gGameStatus.others_effect_display_flag, auto: stage.gGameStatus.auto_attack_display_flag, isSemi: stage.pJsnData.is_semi, isDefendOrder: stage.pJsnData.is_defendorder || !1, isArcarum: stage.pJsnData.is_arcarum || !1, isCoopraid: stage.pJsnData.is_coopraid};
                f.battleOptionsDisplayFlag = !0, f.battleOptionsAssistFlag = stage.pJsnData.multi && !stage.pJsnData.is_coopraid && !stage.pJsnData.is_semi, f.battleOptionsChatFlag = stage.pJsnData.multi && !stage.pJsnData.is_semi, f.battleOptionsButtonCount = b.reduce([f.battleOptionsDisplayFlag, f.battleOptionsAssistFlag, f.battleOptionsChatFlag], function (a, b) {
                    return a + Boolean(b)
                }, 0), this.popView = new r({className: "pop-raid-menu", title: C.getMessage("raid_15"), body: b.template(a("#tpl-pop-menu").html(), f), flagBtnCancel: 0, flagBtnOk: 0}), this.popView.render(), a(".pop-raid-menu .prt-popup-footer").append('<div class="btn-usual-close ev-back"></div>'), this.popView.popShow(!0, "5px");
                var g = this.popView.$el.find(".menu-command-area .btn-withdrow");
                1 == stage.pJsnData.is_coopraid ? g.addClass("breakaway") : stage.pJsnData.is_arcade && stage.pJsnData.arcade && stage.pJsnData.arcade.is_bonus && g.remove()
            }
        }
    }, popRiddleBattleMenu: function () {
        var c = {questTitle: C.getMessage(ba[stage.pJsnData.quest_id].getMessageId)};
        this.popView = new r({className: "pop-riddle-batle-menu", title: C.getMessage("raid_15"), body: b.template(a("#tpl-pop-riddle-batle-menu").html(), c), flagBtnClose: 1}), this.popView.render().popShow(!0, "5px")
    }, AssistSelect: function (b) {
        a(b.currentTarget).hasClass("disable") || (1 == a(b.currentTarget).attr("active") ? (a(b.currentTarget).attr({active: 0}), stage.gGameStatus.assist[a(b.currentTarget).attr("type")] = 0) : (a(b.currentTarget).attr({active: 1}), stage.gGameStatus.assist[a(b.currentTarget).attr("type")] = 1), a('.prt-select-assist .btn-check[active="1"]').length > 0 && !stage.pJsnData.is_authority ? a(".pop-start-assist .prt-popup-footer .btn-usual-text").removeClass("disable") : a(".pop-start-assist .prt-popup-footer .btn-usual-text").addClass("disable"))
    }, checkAllowedRequestAssist: function (a, b) {
        if (stage.pJsnData.is_multi) {
            var c = this, d = new (s.extend({urlRoot: Game.baseUri + "multiraid/assist_check"}));
            c.stopListening(d), c.listenToOnce(d, "sync", function (a) {
                a.get("is_allowed_to_requesting_assistance") ? b() : (c.setAssistButtonUnauthorized(), c.popUnauthorizedAssist())
            }), d.set({raid_id: stage.pJsnData.raid_id}), d.save()
        }
    }, handleAssistOn: function (a) {
        var b = this;
        this.checkAllowedRequestAssist(a, function () {
            b.AssistOn(a)
        })
    }, AssistOn: function (c) {
        if (!a(c.currentTarget).hasClass("disable") && 1 != this.assist_flg) {
            this.assist_flg = !0;
            var e = this;
            o.playAssistSE();
            var f = new a.Deferred, g = new r({className: "pop-raid-assist", title: C.getMessage("raid_16"), body: C.getMessage("raid_17"), flagBtnCancel: 0, flagBtnOk: 1});
            g.on("ok", function () {
                e.popRemove(), f.resolve(), stage.pJsnData.suddenly_attack_flag && "resolved" !== stage.gGameStatus.preemptiveDeferred.state() && stage.gGameStatus.preemptiveDeferred.resolve(), this.off()
            }), g.render().popShow(), stage.gGameStatus.assist.all && (stage.pJsnData.assist[1].is_enable = !1, stage.pJsnData.assist[1].is_first = !1), stage.gGameStatus.assist.friend && (stage.pJsnData.assist[2].is_enable = !1), stage.gGameStatus.assist.guild && (stage.pJsnData.assist[3].is_enable = !1), stage.pJsnData.assist[1].is_enable || stage.pJsnData.assist[2].is_enable || stage.pJsnData.assist[3].is_enable || (a(".btn-assist").addClass("disable"), i.mAssistAgain(), stage.pJsnData.invite_enable = 0);
            var h = new d, j = {raid_id: stage.pJsnData.raid_id, is_all: stage.gGameStatus.assist.all, is_friend: stage.gGameStatus.assist.friend, is_guild: stage.gGameStatus.assist.guild, is_update_state: 1};
            b.isUndefined(stage.pJsnData.duplicate_key) || (j.duplicate_key = stage.pJsnData.duplicate_key);
            var k = this;
            a(c.currentTarget);
            h.preSave(stage.gGameStatus.shouldReAuth, j, {url: h.urlRoot("assist", "", stage.pJsnData.is_multi, stage.pJsnData.is_semi), silent: !0, error: function () {
                k.assist_flg = !1, k.popRemove()
            }, success: function (a) {
                if (k.assist_flg = !1, a.get("finished"))return stage.gGameStatus.finish = !0, stage.gGameStatus.already_finish = !0, void k.popShowRematchFail();
                var c = a.get("scenario");
                b.each(c, function (a) {
                    switch (a.cmd) {
                        case"information":
                            f.done(function () {
                                e.MultiLog({message: a.text, language: a.language})
                            });
                            break;
                        case"temporary":
                            stage.gGameStatus.temporary.small = a.small || 0, stage.gGameStatus.temporary.large = a.large || 0, i.mUpdateTemporaryItem()
                    }
                });
                var d = h.toJSON();
                b.isUndefined(d.duplicate_key) || (stage.pJsnData.duplicate_key = d.duplicate_key)
            }})
        }
    }, postAssistGuildForce: function () {
        var a = this, b = new d, c = {raid_id: stage.pJsnData.raid_id, is_all: 0, is_friend: 0, is_guild: 1, is_update_state: 0, duplicate_key: stage.pJsnData.duplicate_key};
        b.preSave(stage.gGameStatus.shouldReAuth, c, {url: b.urlRoot("assist", "", stage.pJsnData.is_multi, stage.pJsnData.is_semi), silent: !0, error: function () {
            a.assistGuildForceDeferred.resolve()
        }, success: function (c) {
            stage.gGameStatus.assist.guild = 1, stage.pJsnData.assist[3].is_enable = !1;
            var d = b.toJSON();
            stage.pJsnData.duplicate_key = d.duplicate_key, a.assistGuildForceDeferred.resolve()
        }})
    }, scrollPopShow: function (b) {
        this.$el.find("#pop-scroll").html(b), a(".prt-enemy-gauge").css({"z-index": "20"}), a(".btn-raid-menu").removeClass("menu").addClass("close"), a("#pop-scroll").show(), window.scrollTo(0, 0)
    }, scrollPopHide: function () {
        a("#pop-scroll").hide().html(""), a(".prt-enemy-gauge").css({"z-index": "30"}), a(".btn-raid-menu").removeClass("close").addClass("menu");
        var b = this.$el.find(".cnt-raid");
        if (0 > this.popScrollHeightDelta) {
            var c = +b.css("padding-bottom").replace(/px/g, "") - Math.abs(this.popScrollHeightDelta);
            b.css("padding-bottom", c + "px"), this.popScrollHeightDelta = 0
        }
        window.scrollTo(0, 0)
    }, handleBattleOptionSetting: function (b) {
        if (!(stage.gGameStatus.attackQueue.index.length > 0)) {
            var c = this, d = new (v.extend({urlRoot: Game.baseUri + this.getRaidType() + "/setting"}));
            this.handleBattleOptionSetting = function () {
                var e = function (a) {
                    c.popSettingBattleDisplay(a)
                };
                a(b.currentTarget).hasClass("assist") ? e = function (a) {
                    c.popSettingBattleAssist(a)
                } : a(b.currentTarget).hasClass("chat") && (e = function (a) {
                    c.popSettingBattleChat(a)
                }), c.stopListening(d), c.listenToOnce(d, "sync", e), d.fetch()
            }, this.handleBattleOptionSetting()
        }
    }, popSettingBattleDisplay: function (c) {
        this.popView && this.popRemove();
        var d = c.toJSON();
        d.diagram = stage.gGameStatus.diagram, d.serif = stage.gGameStatus.serif, d.effect = stage.gGameStatus.others_effect_display_flag, stage.pJsnData.is_multi ? d.notification = Game.setting.rtn_mode : d.auto = stage.gGameStatus.auto_attack_display_flag, this.popView = new r({className: "pop-setting-display", title: C.getMessage("raid_setting_1"), body: b.template(a("#tpl-pop-setting-display").html(), d), flagBtnClose: 1}), this.popView.render().popShow()
    }, popSettingBattleAssist: function (c) {
        this.popView && this.popRemove();
        var d = c.toJSON();
        this.popView = new r({className: "pop-setting-assist", title: C.getMessage("raid_setting_2"), body: b.template(a("#tpl-pop-setting-assist").html(), d), flagBtnClose: 1}), this.popView.render().popShow()
    }, popSettingBattleChat: function (c) {
        this.popView && this.popRemove();
        var d = c.toJSON();
        this.popView = new r({className: "pop-setting-chat", title: C.getMessage("raid_setting_3"), body: b.template(a("#tpl-pop-setting-chat").html(), d), flagBtnClose: 1}), this.popView.render().popShow()
    }, handleSettingPostData: function (b) {
        this.trigger("xhrStart");
        var c = {}, d = "";
        a(b.currentTarget).hasClass("assist") ? (d = this.$el.find(".pop-setting-assist"), c = {0: {set: "is_skip_to_request_assistance", value: +d.find('input[name="assist-pop-force"]:checked').val()}, 1: {set: "is_guests_allowed_to_request_assistance", value: +d.find('input[name="allow-assist"]:checked').val()}}) : a(b.currentTarget).hasClass("chat") ? (d = this.$el.find(".pop-setting-chat"), c = {0: {set: "chat_stamp", value: +d.find('input[name="show-others-stamp"]:checked').val()}}, Game.setting.chat_stamp = c[0].value) : (d = this.$el.find(".pop-setting-display"), c = {0: {set: "summon_speed", value: +d.find('input[name="summon-speed"]:checked').val()}}), this.postBattleSetting(c, 0)
    }, postBattleSetting: function (c, d) {
        var e = this, f = new (s.extend({urlRoot: Game.baseUri + this.getRaidType() + "/setting"}));
        e.stopListening(f), e.listenToOnce(f, "sync", function () {
            "summon_speed" === c[d].set && (stage.gGameStatus.summon_speed = c[d].value), b.size(c) <= d + 1 ? (e.popRemove(), e.trigger("xhrEnd")) : a(document).one("ajaxStop", function () {
                e.postBattleSetting(c, d + 1)
            })
        }), f.set(c[d]), f.save()
    }, popShowMypage: function () {
        var b;
        b = 1 == stage.pJsnData.is_coopraid ? a("#tpl-mypage-coop").html() : stage.pJsnData.is_defendorder ? a("#tpl-mypage-defend-order").html() : stage.pJsnData.is_semi ? a("#tpl-mypage-semi").html() : 1 == stage.pJsnData.multi ? a("#tpl-mypage-multi").html() : a("#tpl-mypage").html(), this.popView.popClose(), this.popView = new r({className: "pop-mypage", title: C.getMessage("raid_18"), body: b, flagBtnCancel: 1, flagBtnOk: 1}), this.popView.render(), a(".pop-mypage .btn-usual-ok").attr({"data-href": "mypage"}), this.popView.popShow()
    }, popConfirmLocationEvent: function () {
        this.popView.popClose(), this.popView = new r({className: "pop-location-event", title: C.getMessage("raid_19"), body: a("#tpl-pop-location-event").html(), flagBtnCancel: 1, flagBtnOk: 1}), this.popView.render(), this.popView.$el.find(".btn-usual-ok").attr("data-href", "surprise/limited_battle"), this.popView.popShow()
    }, popConfirmLocationEventWithdraw: function () {
        this.popView.popClose(), this.popView = new r({className: "pop-location-event-withdraw", title: C.getMessage("raid_19"), body: a("#tpl-pop-location-event").html(), flagBtnCancel: 1, flagBtnOk: 1}), this.popView.render(), this.popView.$el.find(".btn-usual-ok").attr("data-href", "surprise/limited_battle"), this.popView.popShow()
    }, popConfirmLocationDo: function () {
        this.popView.popClose(), this.popView = new r({className: "pop-location-defend-order", title: C.getMessage("raid_do_1"), body: a("#tpl-pop-location-defend-order").html(), flagBtnCancel: 1, flagBtnOk: 1}), this.popView.render(), this.popView.$el.find(".btn-usual-ok").attr("data-href", "defend_order/island/" + stage.pJsnData.defendorder_location_id + "/" + stage.pJsnData.defendorder_id), this.popView.popShow()
    }, popConfirmLocationDoWithdraw: function () {
        var b = stage.pJsnData.is_defendorder ? [1, 0] : [0, 1];
        this.popView.popClose(), this.popView = new r({className: "pop-location-defend-order-withdraw", title: C.getMessage("raid_do_1"), body: a("#tpl-pop-location-defend-order").html(), flagBtnClose: b[0], flagBtnCancel: b[1], flagBtnOk: 1}), this.popView.render(), this.popView.$el.find(".btn-usual-ok").attr("data-href", "defend_order/island/" + stage.pJsnData.defendorder_location_id + "/" + stage.pJsnData.defendorder_id), this.popView.popShow()
    }, popConfirmLocationArcarum: function () {
        var b = stage.pJsnData.is_arcarum ? [1, 0] : [0, 1];
        this.popView.popClose(), this.popView = new r({className: "pop-location-arcarum", title: C.getMessage("arcarum_5"), body: a("#tpl-pop-location-arcarum").html(), flagBtnClose: b[0], flagBtnCancel: b[1], flagBtnOk: 1}), this.popView.render(), this.popView.$el.find(".btn-usual-ok").attr("data-href", "event/arcarum001/top"), this.popView.popShow()
    }, popConfirmLocationArcarumWithdraw: function () {
        var b = stage.pJsnData.is_arcarum ? [1, 0] : [0, 1];
        this.popView.popClose(), this.popView = new r({className: "pop-location-arcarum-withdraw", title: C.getMessage("raid_do_1"), body: a("#tpl-pop-location-arcarum").html(), flagBtnClose: b[0], flagBtnCancel: b[1], flagBtnOk: 1}), this.popView.render(), this.popView.$el.find(".btn-usual-ok").attr("data-href", "event/arcarum001/top"), this.popView.popShow()
    }, popShowithdraw: function (a) {
        stage.gGameStatus.attackQueue.index.length > 0 || (stage.pJsnData.is_arcarum ? 1 == stage.pJsnData.multi ? this.popConfirmLocationArcarumWithdraw() : this.$el.find(a.currentTarget).hasClass("btn-arcarum-escape") ? this.popConfirmArcarumEscapeWithdraw() : this.popConfirmArcarumWithdraw(a) : stage.pJsnData.is_defendorder ? this.popConfirmLocationDoWithdraw() : 1 != stage.pJsnData.multi || stage.pJsnData.is_semi ? stage.pJsnData.is_semi ? this.popConfirmLocationEventWithdraw() : this.popShowithdrawSingle() : this.popShowithdrawMulti())
    }, popConfirmArcarumWithdraw: function (c) {
        var d = parseInt(stage.pJsnData.arcarum.battle_count, 10), e = C.getMessage("arcarum_1");
        switch (!0) {
            case 10 > d:
                break;
            case d >= 11 && 20 > d:
                e = C.getMessage("arcarum_2");
                break;
            case d >= 21:
                e = C.getMessage("arcarum_3")
        }
        var f = {lupi: stage.pJsnData.lupi, treasure1: stage.pJsnData.treasure.treasure_type_1, treasure2: stage.pJsnData.treasure.treasure_type_2, treasure3: stage.pJsnData.treasure.treasure_type_3, treasure4: stage.pJsnData.treasure.treasure_type_4, treasure5: stage.pJsnData.treasure.treasure_type_5, temporary_small: stage.gGameStatus.temporary.small, temporary_large: stage.gGameStatus.temporary.large, isArcarum: stage.pJsnData.is_arcarum || !1, battleCount: this.pJsnData.arcarum.battle_count, multi: stage.pJsnData.multi, use_ap: this.use_ap};
        this.popView && this.popView.popClose(), this.popView = new r({className: "pop-arcarum-withdraw", title: C.getMessage("arcarum_4"), body: b.template(a("#tpl-pop-withdraw").html(), f), flagBtnCancel: 1, flagBtnOk: 1}), this.popView.render(), this.$el.find(".pop-result-withdraw .txt-lose-notice").html(e), this.popView.popShow(!0, "50px")
    }, popConfirmArcarumEscapeWithdraw: function (a) {
        var b = parseInt(stage.pJsnData.arcarum.battle_count, 10), c = C.getMessage("arcarum_1");
        switch (!0) {
            case 10 > b:
                break;
            case b >= 11 && 20 > b:
                c = C.getMessage("arcarum_2");
                break;
            case b >= 21:
                c = C.getMessage("arcarum_3")
        }
        this.popView = new r({className: "pop-arcarum-withdraw escape", title: C.getMessage("arcarum_4"), body: c, flagBtnClose: 1, flagBtnOk: 1}), this.popView.render(), this.popView.popShow(!0, "50px")
    }, arcarumWithdrawOk: function () {
        var a = parseInt(stage.pJsnData.arcarum.battle_count, 10);
        a > 10 ? this.sendArcarumWithdraw() : this.Withdraw()
    }, sendArcarumWithdraw: function () {
        var a = new (s.extend({urlRoot: Game.baseUri + "raid/arcarum_withdraw"})), b = "undefined" == typeof stage ? this.arcarum_continue_data.raid_id : stage.pJsnData.raid_id;
        this.listenToOnce(a, "sync", function (a) {
            var b = a.get("raid_id");
            this.content_close(), c.history.navigate("result/" + b, !0)
        }), a.set({raid_id: b}), a.save()
    }, arcarumWithdrawCancel: function () {
        !stage.gGameStatus.clear && stage.gGameStatus.finish ? (this.popView.popClose(), this.LosePopShow()) : this.popView.popRemove()
    }, popShowithdrawSingle: function () {
        var c, d = {lupi: stage.pJsnData.lupi, treasure1: stage.pJsnData.treasure.treasure_type_1, treasure2: stage.pJsnData.treasure.treasure_type_2, treasure3: stage.pJsnData.treasure.treasure_type_3, treasure4: stage.pJsnData.treasure.treasure_type_4, treasure5: stage.pJsnData.treasure.treasure_type_5, temporary_small: stage.gGameStatus.temporary.small, temporary_large: stage.gGameStatus.temporary.large, multi: stage.pJsnData.multi, use_ap: this.use_ap};
        if (c = stage.pJsnData.is_trialbattle ? a("#tpl-pop-withdraw-trialbatle").html() : b.template(a("#tpl-pop-withdraw").html(), d), this.popView && this.popView.popClose(), this.popView = new r({className: "pop-result-withdraw", title: C.getMessage("raid_20"), body: c, flagBtnCancel: 1, flagBtnOk: 1}), this.popView.render(), this.popView.popShow(!0, "50px"), 1 == stage.pJsnData.is_coopraid) {
            var e = a(".pop-result-withdraw").html().replace(new RegExp(C.getMessage("raid_21"), "g"), C.getMessage("raid_22"));
            a(".pop-result-withdraw").html(e), a(".pop-result-withdraw .btn-usual-ok").addClass("coop")
        }
    }, popShowithdrawMulti: function () {
        if (this.popView.popClose(), this.popView = new r({className: "pop-result-withdraw", title: C.getMessage("raid_20"), body: b.template(a("#tpl-pop-withdraw-multi").html(), {isSemi: stage.pJsnData.is_semi || !1}), flagBtnCancel: 0, flagBtnOk: 0}), this.popView.render(), a(".pop-result-withdraw .prt-popup-footer").append('<div class="btn-usual-close"></div>'), this.popView.popShow(!0, "50px"), 1 == stage.pJsnData.is_coopraid) {
            var c = a(".pop-result-withdraw").html().replace(new RegExp(C.getMessage("raid_21"), "g"), C.getMessage("raid_22"));
            a(".pop-result-withdraw").html(c), a(".pop-result-withdraw .btn-usual-ok").addClass("coop")
        }
    }, Withdraw: function () {
        var a = this;
        if (!stage.gGameStatus.btn_lock) {
            stage.gGameStatus.btn_lock = !0, stage.gGameStatus.menu = "temporary", stage.gGameStatus.retire = !0, a.popView.popRemove(), setTimeout(function () {
                a.hideMask()
            }, 240);
            var b = {raid_id: stage.pJsnData.raid_id};
            a.Attack("retire", b)
        }
    }, popWithdrawCancel: function () {
        !stage.gGameStatus.clear && stage.gGameStatus.finish ? (this.popView.popClose(), this.LosePopShow()) : this.popView.popRemove()
    }, popWithdrawClose: function () {
        var b = window.stage;
        (b.gGameStatus.is_escorted_character_dead || b.gGameStatus.player.all_dead) && (a(".btn-revival").show(), !b.pJsnData.is_multi || b.pJsnData.is_semi && b.pJsnData.is_defendorder || a(".btn-chat").removeClass("display-off").addClass("display-on"), b.pJsnData.is_multi && a(".img-diagram").removeClass("display-off").addClass("display-on"), "undefined" != typeof b.pJsnData.survival && b.pJsnData.survival.score_buff && !a(".img-score").hasClass("display-off") && a(".img-score").addClass("display-on"), E(b.pJsnData.bgm), b.gGameStatus.shouldPlayFixedBGM = !1)
    }, popShowItem: function () {
        if (!(stage.gGameStatus.attackQueue.index.length > 0) && (stage.pJsnData.is_trialbattle || 0 != stage.gGameStatus.potion.count)) {
            if (stage.gGameStatus.potion.limit_flg && 0 == stage.gGameStatus.potion.limit_remain)return void this.popPotionLimitOver();
            var c = {confirm: "normal", before: stage.gGameStatus.potion.count, after: stage.gGameStatus.potion.count - 1, item_name: stage.pJsnData.is_trialbattle ? C.getMessage("raid_trial_1") : stage.gGameStatus.potion.item_name, cheer: !1, potion_limit: {number: stage.gGameStatus.potion.limit_number, remain: stage.gGameStatus.potion.limit_remain
            }};
            this.popView.popClose(), this.popView = new r({className: "pop-item-confirm", title: C.getMessage("raid_23"), body: b.template(a("#tpl-pop-use-item").html(), c), flagBtnCancel: 1, flagBtnOk: 1}), this.popView.render(), this.popView.popShow(!0, "50px");
            for (var d = !1, e = 0; e < stage.pJsnData.player.param.length; e++) {
                if (1 != stage.pJsnData.player.param[e].alive) {
                    d = !0;
                    break
                }
                stage.pJsnData.player.param[e].hp < stage.pJsnData.player.param[e].hpmax && (d = !0)
            }
            0 == d && a(".pop-item-confirm .txt-notice").show()
        }
    }, popPotionLimitOver: function () {
        var c = {potion_limit: {number: stage.gGameStatus.potion.limit_number, remain: stage.gGameStatus.potion.limit_remain}, lose_pop_flg: w.get("lose_pop_flg")};
        this.popView = new r({className: "pop-limit-over", title: C.getMessage("raid_24"), body: b.template(a("#tpl-pop-potion-limit").html(), c), flagBtnCancel: 0, flagBtnOk: 0}), this.popView.render(), stage.pJsnData.is_multi ? a(".pop-limit-over .prt-popup-footer").append('<a href="javascript:void(0);" class="btn-close">' + C.getMessage("raid_25") + "</a>") : (a(".pop-limit-over .txt-single").show(), stage.gGameStatus.player.all_dead || !b.isUndefined(stage.pJsnData.battle_condition) && 1 == stage.gGameStatus.lose ? a(".pop-limit-over .prt-popup-footer").append('<a href="javascript:void(0);" class="btn-withdraw-single">' + C.getMessage("raid_26") + "</a>") : a(".pop-limit-over .prt-popup-footer").append('<a href="javascript:void(0);" class="btn-close">' + C.getMessage("raid_25") + "</a>")), this.popView.popShow(!0, "50px")
    }, popCheer: function () {
        a(".prt-tips").hide(), this.popView && this.popView.popRemove(), this.popView = new r({className: "pop-cheer", title: C.getMessage("raid_27"), body: b.template(a("#tpl-cheer").html(), {cheer_effect_text: stage.pJsnData.cheer_effect_text}), flagBtnCancel: 1, flagBtnOk: 0}), this.popView.render(), a(".pop-cheer .prt-popup-footer").append('<a href="javascript:void(0);" class="btn-cheer">' + C.getMessage("raid_28") + "</a>"), this.popView.popShow(!0, "50px"), w.set("cheer_pop_flg", "1"), this.temp_cheer_pop_flg = !0
    }, CheerSend: function () {
        this._sendCheer()
    }, _sendCheer: function () {
        var a = new (s.extend({urlRoot: Game.baseUri + this.getRaidType() + "/cheer"}));
        this._sendCheer = function () {
            var b = this;
            a.save({raid_id: stage.pJsnData.raid_id}, {success: function () {
                b.broadcastChatLog({userId: stage.pJsnData.user_id, viewerId: stage.pJsnData.viewer_id, chatId: M, categoryId: M}), b.popCheerComplete()
            }, error: function () {
                b.LosePopShow()
            }, silent: !0})
        }, this._sendCheer()
    }, popCheerComplete: function () {
        var b = new r({className: "pop-cheer", title: C.getMessage("raid_29"), body: a("#tpl-cheer-compleate").html(), flagBtnCancel: 0, flagBtnOk: 1});
        this.popCheerComplete = function () {
            stage.pJsnData.cheer_status = !1, b.render(), b.popShow(!0, "50px"), this.popView = b, stage.gGameStatus.cheer_compleate = !0, w.set("cheer_already", "1"), this.temp_cheer_already = !0
        }, this.popCheerComplete()
    }, LosePopShow: function () {
        var c = window.stage, d = c.gGameStatus;
        w.set("lose_pop_flg", "1"), null != w.get("cheer_compleate") ? ("true" == w.get("cheer_compleate") ? d.cheer_compleate = !0 : d.cheer_compleate = !1, c.pJsnData.cheer_effect_text = w.get("cheer_effect_text")) : "1" == w.get("cheer_already") && 1 != this.temp_cheer_already && (d.cheer_compleate = !1), null != this.lose_cheer_flg && this.stone_change_flg && (d.cheer_compleate = this.lose_cheer_flg);
        var e = d.cheer_compleate;
        this.lose_cheer_flg = e, w.set("cheer_compleate", e), w.set("cheer_effect_text", c.pJsnData.cheer_effect_text), this.lose_cheer_flg && this.stone_change_flg && (this.lose_cheer_flg = !1), this.stone_change_flg = !1, d.cheer_compleate = !1, a(".prt-tips").hide(), d.pop_limit = !1;
        var f, g, h = !1, i = d.event;
        b.isUndefined(i) || (f = 3 == i.event_type ? 3 : 5, g = i.item[f], g.number > 0 && (h = !0));
        var j = d.potion, k = !1;
        if (j.limit_flg && 0 == j.limit_remain && (k = !0, !c.pJsnData.is_defendorder || !h))return void this.popPotionLimitOver();
        if (!c.pJsnData.is_trialbattle && 0 == j.count) {
            var l = !1;
            if (b.isUndefined(i) ? l = !0 : i.item[f].number <= 0 && (l = !0), l)return this.popView = new r({className: "pop-result-use-potion", title: C.getMessage("raid_30"), body: b.template(a("#tpl-pop-no-item").html(), {cheer: e, cheer_effect_text: w.get("cheer_effect_text")}), flagBtnCancel: 1, flagBtnOk: 0}), this.popView.render(), this.popView.popShow(!0, "50px"), void(d.stone < parseInt(d.shopLowestPrice) && a(".btn-stone").addClass("disable"))
        }
        if (!b.isUndefined(i)) {
            var m = {before: j.count, after: j.count > 0 ? j.count - 1 : 0, item_name: j.item_name, event_item: g, isLimitedPotion: k, potionLimitNumber: j.limit_number, can_use_event_item: c.pJsnData.event_coopraid_name ? !1 : !0};
            return this.popView = new r({className: "pop-continue-event", title: C.getMessage("raid_30"), body: b.template(a("#tpl-pop-continue-event").html(), m), flagBtnCancel: 1, flagBtnOk: 0}), this.popView.render(), void this.popView.popShow(!0, "50px")
        }
        var m = {confirm: "lose", before: j.count, after: j.count - 1, item_name: c.pJsnData.is_trialbattle ? C.getMessage("raid_trial_1") : j.item_name, cheer: e, cheer_effect_text: w.get("cheer_effect_text"), potion_limit: {number: j.limit_number, remain: j.limit_remain}};
        this.popView = new r({className: "pop-result-use-potion", title: C.getMessage("raid_30"), body: b.template(a("#tpl-pop-use-item").html(), m), flagBtnCancel: 1, flagBtnOk: 1}), this.popView.render(), this.popView.popShow(!0, "50px")
    }, popShowRevival: function () {
        stage.gGameStatus.pop_revival = !0, stage.pJsnData.is_arcarum && stage.pJsnData.arcarum.is_tp_recovery ? this.UseTpRecover() : this.LosePopShow()
    }, popLoseCancel: function () {
        this.popView.popClose(), this.popShowithdraw()
    }, popShowExchange: function (c) {
        if (!a(c.currentTarget).hasClass("disable")) {
            var d = stage.gGameStatus.shopPotionId;
            this.article = new (v.extend({urlRoot: Game.baseUri + "shop/article/" + d}));
            var e = this;
            this.article.listenToOnce(this.article, "sync", function (c) {
                var d = c.attributes;
                e.popView = new r({className: "pop-exchange", title: C.getMessage("raid_31"), body: "", flagBtnCancel: 1, flagBtnOk: 0}), e.popView.render(), a(".pop-exchange .prt-popup-footer").append("<div class='btn-usual-exchange'></div>"), a(".pop-exchange .txt-popup-body").html(b.template(a("#tpl-pop-exchange").html(), d)), e.popView.popShow(!0, "50px"), e.setBuyNum(), e.trigger(Na)
            }), this.article.fetch(), this.stone_change_flg = !0, this.trigger(Ma)
        }
    }, buyItem: function () {
        var b = new (s.extend({urlRoot: Game.baseUri + "shop/purchase/"}));
        this.buyItem = function () {
            this.trigger(Ma);
            var c = a(".num-set").children(":selected").val(), d = stage.gGameStatus.shopPotionId, e = a(".pop-exchange .txt-popup-body").html(), f = a(".cnt-confirm").data("duplicate-key") + "_" + d + "_" + c;
            b.set({article_id: d, duplicate_key: f}), b.set({num: c}), this.listenToOnce(b, "sync", function (a) {
                this.popView && this.popView.popRemove(), this.stopListening(this.purchase), this.purchase.stopListening(), this.render_result(a, e)
            }), this.listenToOnce(b, "error", function () {
                this.popView && this.popView.popRemove(), this.stopListening(this.purchase), this.purchase.stopListening(), this.error_message()
            }), b.save(), this.purchase = b
        }, this.buyItem()
    }, error_message: function () {
        var b = new r({className: "pop-exchange", title: C.getMessage("raid_32"), body: "", flagBtnCancel: 1, flagBtnOk: 0});
        this.error_message = function () {
            b.render(), a(".pop-confirm .txt-popup-body").html(C.getMessage("raid_33")), b.popShow(), this.popView = b, this.trigger(Na)
        }, this.error_message()
    }, render_result: function (b, c) {
        var d = new r({className: "pop-exchange", title: C.getMessage("raid_34"), body: c, flagBtnCancel: 0, flagBtnOk: 1});
        d.render();
        var e = b.attributes;
        a(".pop-result .item-explain").css("display", "none"), a(".pop-exchange .cnt-confirm").children("div").slice(2, 5).css("display", "none"), a(".pop-exchange .btn-usual-cancel").css("display", "none"), a(".pop-exchange .result").html(C.replaceMessage("raid_35", [e.num])), d.popShow(!0, "50px"), this.popView = d;
        var f = stage.gGameStatus;
        f.potion.count = e.num, f.stone -= +a(".pop-exchange .item-price").attr("price"), this.trigger(Na)
    }, setBuyNum: function () {
        var b = a(".pop-exchange .item-price").attr("price"), c = stage.gGameStatus.stone;
        a(".before-money").html("" + c), a(".after-money").html("" + (c - b * a(".num-set").children(":selected").val()))
    }, popItemCancel: function (a) {
        1 != stage.gGameStatus.pop_limit && (stage.gGameStatus.is_escorted_character_dead ? (this.popView.popClose(), this.popShowithdraw(a)) : stage.gGameStatus.pop_revival || !stage.gGameStatus.is_multi && !stage.gGameStatus.player.all_dead ? this.popView.popRemove() : (this.popView.popClose(), this.popShowithdraw(a)))
    }, locationShop: function () {
        w.set("return_raid_url", location.hash), this.content_close(), u.hash("#shop", {refresh: !0})
    }, popHideSelectMember: function (b) {
        var c = a(".pop-select-member");
        this.hideMask(), c.hide(), c.trigger("hide")
    }, SelectMember: function (c) {
        var d = a(c.currentTarget).attr("pos"), e = pCharacterPos;
        if (stage.pJsnData.without_pc && (e = stage.gGameStatus.abilityCharacterNum), !(1 == stage.gGameStatus.ability_pick && 1 == stage.pJsnData.player.param[d].alive || (2 == stage.gGameStatus.ability_pick || 4 == stage.gGameStatus.ability_pick) && (b.indexOf(stage.pJsnData.formation, String(d)) < 0 || 0 == stage.pJsnData.player.param[d].alive || stage.pJsnData.player.param[d].hp < 1 || 4 != stage.gGameStatus.ability_pick && stage.pJsnData.player.param[d].hp >= stage.pJsnData.player.param[d].hpmax) || 5 == stage.gGameStatus.ability_pick && (b.indexOf(stage.pJsnData.formation, String(d)) < 0 || 0 == stage.pJsnData.player.param[d].alive || stage.pJsnData.player.param[d].recast >= stage.pJsnData.player.param[d].recastmax || e == d) || 7 == stage.gGameStatus.ability_pick && (b.indexOf(stage.pJsnData.formation, String(d)) < 0 || 0 == stage.pJsnData.player.param[d].alive || stage.gGameStatus.abilityCharacterNum == d))) {
            stage.gGameStatus.menu = "ability", stage.gGameStatus.motion = !0;
            var f = {raid_id: stage.pJsnData.raid_id, ability_aim_num: d, ability_id: a(".btn-ability-use").attr("ability-id"), ability_character_num: a(".btn-ability-use").attr("ability-character-num")};
            this.StoreAttackQueue(f, !0), this.popHideSelectMember()
        }
    }, popShowAbility: function (c) {
        if (2 != stage.gGameStatus.chara_select) {
            var d = a(c.currentTarget), e = this;
            if (d || e.popShowAbilityError("raid_82", "raid_83"), !d.find("div:first").hasClass("ico-ability") && (stage.gGameStatus.$use_ability = d, stage.gGameStatus.$use_cancel_ability = d, !stage.gGameStatus.btn_lock)) {
                stage.gGameStatus.attackQueue.$useAbilityTmp = d;
                var f = d.children().attr("ability-name"), g = d.children().attr("text-data"), h = d.children().attr("ability-id"), i = d.children().attr("ability-character-num"), j = d.children().attr("ability-recast"), k = d.children().attr("ability-pick"), l = d.children().attr("recaset-default"), m = d.children().attr("duration"), n = d.children().attr("duration-second");
                d.children().attr("duration-type");
                stage.gGameStatus.ability_pick = k, pCharacterPos = b.indexOf(stage.pJsnData.formation, String(i)), stage.gGameStatus.abilityCharacterNum = i;
                var o = null;
                if (0 == stage.gGameStatus.player.param[pCharacterPos].condition.ability_available_flag ? o = ".prt-ability-stamped" : (1 == k || 2 == k || 4 == k || 5 == k || 7 == k) && 1 > j && !d.hasClass("tmp-mask") ? (o = ".pop-select-member", a(o + " .prt-percent").empty()) : o = 3 == k ? ".pop-ability-mark" : 6 == k && 1 > j && !d.hasClass("tmp-mask") ? ".pop-ability-hiddenweapon" : 8 == k ? ".pop-ability-lupiflip" : ".prt-ability-dialog", a(o).removeClass("sub-selecter"), 3 !== stage.gGameStatus.abilityRailUse || !stage.gGameStatus.attacking || 1 != k && 2 != k && 3 != k && 4 != k && 5 != k && 6 != k && 7 != k && 8 != k) {
                    if (d.children().attr("ability-multi") && (g += '<br><span class="red">' + C.getMessage("raid_36") + "</span>"), a(o).attr("type", "ability"), h > 0) {
                        var p = g.split("（"), q = p[0];
                        a(o + " .name").html(f), a(o + " .effect").html(g), a(o + " .recast").html(C.getMessage("raid_37") + l + C.getMessage(l > 1 ? "raid_78" : "raid_39")), "" != m && "" != n ? a(o + " .duration").html(C.getMessage("raid_38") + m + C.getMessage(m > 1 ? "raid_78" : "raid_39") + "/" + n + C.getMessage(n > 1 ? "raid_79" : "raid_40")) : "" != m ? a(o + " .duration").html(C.getMessage("raid_38") + m + C.getMessage(m > 1 ? "raid_78" : "raid_39")) : "" != n ? a(o + " .duration").html(C.getMessage("raid_38") + n + C.getMessage(n > 1 ? "raid_79" : "raid_40")) : a(o + " .duration").html(""), a(".btn-ability-use").attr({"ability-id": h, "ability-character-num": i, "ability-name": q}), a(o + " .prt-icon>div").removeClass().addClass(d.children().attr("class"))
                    }
                    if (0 == stage.gGameStatus.player.param[pCharacterPos].condition.ability_available_flag)a(o + " .prt-icon").removeClass("ability-disable").addClass("ability-disable"); else if (1 == k) {
                        (parseInt(j) > 0 || d.hasClass("tmp-mask")) && a(".btn-ability-use").hide(), a(o + " .hideable").hide(), a(".txt-select-chara").html(C.getMessage("raid_41"));
                        for (var r = 0; r < stage.pJsnData.player.param.length; r++) {
                            var s = stage.pJsnData.player.param[r];
                            if (!b.isUndefined(s)) {
                                var t = ".prt-character .lis-character" + r, u = 2 === s.form && s.extra_attr > 0 ? s.extra_attr : s.attr;
                                a(t + " .ico-type").removeClass(function (a, b) {
                                    return(b.match(/ico-attribute-\d*/) || []).join(" ")
                                }).addClass("ico-attribute-" + u), a(t + " .hideable").hide(), 1 == s.leader ? a(t).children("img").attr("src", Game.imgUri + "/sp/assets/leader/raid_normal/" + s.pid_image + ".jpg") : a(t).children("img").attr("src", Game.imgUri + "/sp/assets/npc/raid_normal/" + s.pid_image + ".jpg"), 1 == s.alive ? a(t).addClass("mask-black") : a(t).removeClass("mask-black")
                            }
                        }
                    } else if (2 == k || 4 == k) {
                        (parseInt(j) > 0 || d.hasClass("tmp-mask")) && a(".btn-ability-use").hide(), a(o + " .hideable").hide(), a(".txt-select-chara").html(C.getMessage("raid_41"));
                        var v = b.clone(stage.pJsnData.player.param);
                        if (stage.pJsnData.without_pc) {
                            v = b.reject(v, function (a, b) {
                                return 0 == b
                            });
                            var w = v.length, x = v.length + 1, y = a(o).find(".prt-character .lis-character" + w);
                            y.children(".img-chara-command").attr("src", ga), y.children(".ico-type").removeClass().addClass("ico-type");
                            for (var z = 0; x > z; z++)a(o).find(".prt-character .lis-character" + z).attr("pos", z + 1)
                        }
                        for (var r = 0; r < v.length; r++) {
                            var s = v[r];
                            if (!b.isUndefined(s)) {
                                var t = o + " .prt-character .lis-character" + r, u = 2 === s.form && s.extra_attr > 0 ? s.extra_attr : s.attr;
                                a(t + " .ico-type").removeClass(function (a, b) {
                                    return(b.match(/ico-attribute-\d*/) || []).join(" ")
                                }).addClass("ico-attribute-" + u);
                                var A = parseInt(s.hp / s.hpmax * 100), B = 25 >= A ? "red" : "green", D = a(t + " .txt-hp-value"), E = a(t + " .prt-gauge-hp-inner");
                                E.css("width", A + "%").attr({color: B}), D.html("" + s.hp).attr({color: B}), !s.condition.hide_hp_flag || 1 != s.alive || b.indexOf(stage.pJsnData.formation, String(r)) < 0 ? D.removeClass("hide-hp") : D.addClass("hide-hp");
                                var F = parseInt(s.recast / s.recastmax * s.recastmax);
                                a(t + " .prt-gauge-special-inner").css("width", F + "%"), a(t + " .hideable").show(), 1 == s.leader ? a(t).children("img").attr("src", Game.imgUri + "/sp/assets/leader/raid_normal/" + s.pid_image + ".jpg") : a(t).children("img").attr("src", Game.imgUri + "/sp/assets/npc/raid_normal/" + s.pid_image + ".jpg"), b.indexOf(stage.pJsnData.formation, String(r)) < 0 && !stage.pJsnData.without_pc || 0 == s.alive || s.hp < 1 || 4 != k && s.hp >= s.hpmax ? a(t).addClass("mask-black") : a(t).removeClass("mask-black")
                            }
                        }
                    } else if (3 == k) {
                        var G = a(".pop-ability-mark");
                        G.find(".prt-ninja-mark div").removeClass("active first second"), G.find(".btn-usual-text").addClass("disable"), stage.gGameStatus.ability_sub_param = [], parseInt(j) > 0 || d.hasClass("tmp-mask") ? (a(".pop-ability-mark .btn-usual-text").hide(), a(".pop-ability-mark .prt-ninja-mark, .pop-ability-mark .txt-info").hide()) : (a(".pop-ability-mark .btn-usual-text").show(), a(".pop-ability-mark .prt-ninja-mark, .pop-ability-mark .txt-info").show())
                    } else if (5 == k || 7 == k) {
                        (parseInt(j) > 0 || d.hasClass("tmp-mask")) && a(".btn-ability-use").hide(), a(o + " .hideable").hide(), a(".txt-select-chara").html(C.getMessage("raid_41"));
                        var v = b.clone(stage.pJsnData.player.param);
                        if (stage.pJsnData.without_pc) {
                            v = b.reject(v, function (a, b) {
                                return 0 == b
                            });
                            var w = v.length, x = v.length + 1, y = a(o).find(".prt-character .lis-character" + w);
                            y.children(".img-chara-command").attr("src", ga), y.children(".ico-type").removeClass().addClass("ico-type");
                            for (var z = 0; x > z; z++)a(o).find(".prt-character .lis-character" + z).attr("pos", z + 1)
                        }
                        for (var r = 0; r < v.length; r++) {
                            var s = v[r], H = stage.pJsnData.without_pc ? +r + 1 : r;
                            if (!b.isUndefined(s)) {
                                var t = ".prt-character .lis-character" + r, u = 2 === s.form && s.extra_attr > 0 ? s.extra_attr : s.attr;
                                a(t + " .ico-type").removeClass(function (a, b) {
                                    return(b.match(/ico-attribute-\d*/) || []).join(" ")
                                }).addClass("ico-attribute-" + u);
                                var A = parseInt(s.hp / s.hpmax * 100), B = 25 >= A ? "red" : "green", D = a(t + " .txt-hp-value"), E = a(t + " .prt-gauge-hp-inner");
                                E.css("width", A + "%").attr({color: B}), D.html("" + s.hp).attr({color: B}), !s.condition.hide_hp_flag || 1 != s.alive || b.indexOf(stage.pJsnData.formation, String(H)) < 0 ? D.removeClass("hide-hp") : D.addClass("hide-hp");
                                var F = parseInt(s.recast / s.recastmax * s.recastmax);
                                a(t + " .prt-gauge-special-inner").css("width", F + "%"), a(t + " .prt-percent").html('<span class="txt-gauge-value">' + F + "</span>%"), a(t + " .hideable").show(), 1 == s.leader ? a(t).children("img").attr("src", Game.imgUri + "/sp/assets/leader/raid_normal/" + s.pid_image + ".jpg") : a(t).children("img").attr("src", Game.imgUri + "/sp/assets/npc/raid_normal/" + s.pid_image + ".jpg"), b.indexOf(stage.pJsnData.formation, String(H)) < 0 || 0 == s.alive || 7 != k && s.recast >= s.recastmax || 7 != k && pCharacterPos == H || 7 == k && i == H ? a(t).addClass("mask-black") : a(t).removeClass("mask-black")
                            }
                        }
                    } else if (8 == k) {
                        parseInt(j) > 0 || d.hasClass("tmp-mask") ? a(".prt-lupiflip").css("display", "none") : a(".prt-lupiflip").css("display", "block");
                        var G = a(".pop-ability-lupiflip");
                        stage.gGameStatus.ability_sub_param = [], a.when(e.getLupiFlip({raid_id: stage.pJsnData.raid_id})).done(function (c) {
                            G.find(".prt-lupiflip").html(b.template(a("#tpl-lupiflip").html(), {list: c})), G.css("display", "block")
                        }), o = null
                    } else if (6 == k && 1 > j && !d.hasClass("tmp-mask")) {
                        var G = a(".pop-ability-hiddenweapon"), I = G.find(".txt-trialbattle-comment");
                        stage.gGameStatus.ability_sub_param = [], a.when(e.getHiddenWeapon({raid_id: stage.pJsnData.raid_id})).done(function (c) {
                            e.$el.find(".pop-ability-hiddenweapon .prt-item-box").html(b.template(a("#tpl-item-hiddenweapon").html(), {list: c})), c.hiddenweapon_info.is_trialbattle && !I.hasClass("show") ? I.addClass("show") : !c.hiddenweapon_info.is_trialbattle && I.hasClass("show") && I.removeClass("show"), G.css("display", "block")
                        }), G.find(".prt-popup-footer .btn-usual-hiddenweapon").addClass("disable-hiddenweapon").removeClass("btn-usual-hiddenweapon"), o = null
                    } else {
                        if (1 != stage.gGameStatus.ability_popup)return void(0 != parseInt(j) || d.hasClass("tmp-mask") || this.StoreAttackQueue());
                        parseInt(j) > 0 || d.hasClass("tmp-mask") ? a(".btn-ability-use").hide() : (a(".btn-ability-use").show(), a(".lis-chara0").children(".txt-attack-name").text(q), a(".lis-chara0").attr("pos", d.parents(".prt-command-chara").attr("pos")))
                    }
                    a(o).show(), this.showMask()
                }
            }
        }
    }, popHideAbility: function () {
        a(".prt-ability-dialog").hide(), this.hideMask()
    }, popHideAbilityStamped: function () {
        a(".prt-ability-stamped").hide(), this.hideMask()
    }, popHideAbilityMark: function () {
        a(".pop-ability-mark").hide(), this.hideMask()
    }, popHideAbilityHiddenweapon: function () {
        a(".pop-ability-hiddenweapon").hide(), this.hideMask()
    }, popHideAbilityLupiFlip: function () {
        a(".pop-ability-lupiflip").css("display", "none"), this.hideMask()
    }, popShowSummon: function (b) {
        if ("top" != stage.gGameStatus.menu && 2 != stage.gGameStatus.chara_select) {
            var c = a(b.currentTarget), d = c.attr("summon-id");
            if (d) {
                var e = c.attr("summon-name"), f = c.attr("summon-skill-name"), g = c.attr("summon-comment"), h = c.attr("summon-recast"), i = c.attr("summon-require"), j = c.attr("summon-protection-name"), k = c.attr("summon-protection"), l = c.attr("summon-quality"), m = Number(c.attr("summon-evolution"));
                this.showMask();
                var n = "", o = a(".txt-summon-protection");
                1 == d || "supporter" == d && (1 == stage.pJsnData.supporter.friend || stage.pJsnData.supporter.available_skill) ? (a(".prt-summon-detail").removeClass("disenable").addClass("enable"), 3 == m ? o.addClass("bless-rank1-style") : o.removeClass("bless-rank1-style"), m >= 4 ? o.addClass("bless-rank2-style") : o.removeClass("bless-rank2-style")) : (a(".prt-summon-detail").removeClass("enable").addClass("disenable"), o.removeClass("bless-rank1-style bless-rank2-style"), n = "supporter" == d ? C.getMessage("raid_42") : C.getMessage("raid_43")), parseInt(h) >= 1 || 1 != stage.pJsnData.summon_enable ? a(".btn-summon-use").hide() : a(".btn-summon-use").show(), a(".btn-summon-use").attr({"summon-id": d, "summon-skill-name": f}), a(".prt-summon-detail .img-summon").attr("src", c.find("img").attr("src")), a(".prt-summon-detail .prt-icon .prt-detail-quality").remove(), l > 0 && a(".prt-summon-detail .prt-icon").append('<div class="prt-detail-quality">+' + l + "</div>"), a(".txt-summon-name").html(e), a(".txt-summon-skill").html(f), a(".txt-summon-effect").html(g), a(".recast").html(C.getMessage("raid_37") + i + C.getMessage(i > 1 ? "raid_78" : "raid_39")), a(".txt-summon-protection-name").html(j), o.html(k), a(".txt-disenable").html(n), a(".pop-summon-detail").show(), a(".lis-chara0").children(".txt-attack-name").text(f), a(".lis-chara0").addClass("summon")
            }
        }
    }, popHideSummon: function () {
        a(".pop-summon-detail").hide(), this.hideMask()
    }, popShowSummonNo: function (a) {
        a || (a = !1);
        var b = new r({className: "pop-summon-no", title: C.getMessage("raid_44"), body: C.getMessage("raid_45"), flagBtnCancel: 0, flagBtnOk: 1});
        this.popShowSummonNo = function (a) {
            a && (b.options.body = C.getMessage("cannot_summon_1")), b.render(), b.popShow(!0, "50px"), this.popView = b
        }, this.popShowSummonNo(a)
    }, popAssistCheck: function () {
        if (!stage.gGameStatus.clear && 1 != stage.pJsnData.is_coopraid && 1 != stage.pJsnData.is_semi && 1 != stage.pJsnData.is_authority && !stage.pJsnData.is_defendorder && !stage.pJsnData.is_arcarum) {
            var b = this, c = new (s.extend({urlRoot: Game.baseUri + this.getRaidType() + "/assist_check"}));
            c.save({raid_id: stage.pJsnData.raid_id}, {success: function (c) {
                b.trigger(Na), stage.pJsnData.assist = c.changed.assist, b.setAssistParam(), 1 == stage.pJsnData.invite_enable ? a(".btn-assist").removeClass("disable") : a(".btn-assist").addClass("disable"), b.popShowAssist()
            }, error: function () {
                b.trigger(Na)
            }}), this.trigger(Ma)
        }
    }, popShowSemiNotice: function () {
        var b = stage.pJsnData.is_defendorder ? "#tpl-pop-semi-notice-do" : "#tpl-pop-semi-notice", c = stage.pJsnData.is_defendorder ? "pop-do-semi-notice" : "pop-semi-notice", d = a(b).html(), e = new r({className: c, title: C.getMessage("raid_46"), body: d, flagBtnClose: 1, flagBtnOk: 0});
        e.render().popShow(), this.popView = e
    }, popShowTrialBattleNotice: function () {
        var b = new r({className: "pop-trialbattle-notice", title: C.getMessage("raid_trial_2"), body: a("#tpl-pop-trialbattle-notice").html(), flagBtnClose: 1});
        b.render().popShow(), this.popView = b
    }, popShowAssist: function (c) {
        var d = c, e = a("#tpl-pop-assist").html();
        this.popShowAssist = function (c) {
            d != c && (d = c);
            var f = stage.pJsnData;
            if (f.fellow >= f.limit_number)return void this.popShowAssistOver();
            this.inactivateMask();
            var g = "first" === d ? !0 : !1, h = new r({className: "pop-start-assist", title: C.getMessage("raid_16"), body: b.template(e, {guildFlag: f.guild, firstView: g, isDefendOrder: f.is_defendorder || !1}), flagBtnCancel: 1, flagBtnOk: 0});
            h.render();
            var i = "btn-usual-text", j = stage.gGameStatus.assist, k = f.assist;
            0 != j.all && 0 != k[1].is_enable || 0 != j.friend && 0 != k[2].is_enable || 0 != j.guild && 0 != k[3].is_enable || (i += " disable"), a(".pop-start-assist .prt-popup-footer").append('<a href="javascript:void(0);" class="' + i + '">' + C.getMessage("raid_16") + "</a>"), f.is_authority && a(".pop-start-assist .prt-popup-footer .btn-usual-text").addClass("disable"), h.popShow(), this.popView = h
        }, this.popShowAssist(c)
    }, popShowAssistOver: function () {
        var a = new r({className: "pop-notice", title: C.getMessage("raid_16"), body: C.getMessage("raid_47"), flagBtnCancel: 0, flagBtnOk: 1});
        this.popShowAssistOver = function () {
            a.render(), a.popShow(), this.popView = a
        }, this.popShowAssistOver()
    }, popUnauthorizedAssist: function () {
        this.popView = new r({className: "pop-unauthorized-assist", title: C.getMessage("raid_16"), body: a("#tpl-pop-unauthorized-assist").html(), flagBtnCancel: 0, flagBtnOk: 1}), this.popView.render().popShow()
    }, popEnableAssist: function () {
        this.popView = new r({className: "pop-enable-assist", title: C.getMessage("raid_16"), body: a("#tpl-pop-enable-assist").html(), flagBtnCancel: 0, flagBtnOk: 1}), this.popView.render().popShow()
    }, setAssistButtonUnauthorized: function () {
        this.$el.find(".btn-assist").addClass("disable unauthorized-assist")
    }, unsetAssistButtonUnauthorized: function () {
        this.$el.find(".btn-assist").removeClass("disable unauthorized-assist")
    }, setEnableAssist: function () {
        0 == stage.pJsnData.invite_enable || stage.pJsnData.fellow >= stage.pJsnData.limit_number || (this.unsetAssistButtonUnauthorized(), this.popEnableAssist())
    }, settingChange: function (b) {
        var c = a(b.currentTarget), d = c.attr("set"), e = c.attr("value");
        a(".prt-setting .set-" + d + ">div").removeClass("active"), a(".prt-setting .set-" + d + ">div[value=" + e + "]").addClass("active"), "" != c.attr("change_class") && "top" == stage.gGameStatus.menu && (1 == e ? a(c.attr("change_class")).removeClass("display-off").addClass("display-on") : a(c.attr("change_class")).removeClass("display-on").addClass("display-off")), stage.gGameStatus[d] = e;
        var f = new (s.extend({urlRoot: Game.baseUri + "raid/setting"}));
        f.save({set: d, value: e}, {success: function () {
        }, error: function () {
        }, silent: !0})
    }, settingChangeSingle: function (b) {
        var c = this, d = a(b.currentTarget), e = d.attr("set"), f = d.attr("active"), g = 1 == f ? 0 : 1;
        d.attr({active: g}), "" != d.attr("targets") && a(d.attr("targets")).attr({active: g});
        var h = d.attr("change_class"), i = a(h);
        if (1 == d.attr("display_type"))if (1 == g)i.show(); else if (".prt-navi" === h)if (1 == stage.pJsnData.is_force_navi); else {
            var j = stage.pJsnData.navi_information, k = stage.pJsnData.navi_index, l = this.getForceNaviIndex(j, k);
            if (l >= 0) {
                stage.pJsnData.navi_index = l;
                var m = j[l];
                this.NaviShow(m)
            } else i.hide()
        } else i.hide(); else"" !== d.attr("change_class") && "top" === stage.gGameStatus.menu && (1 == g ? a(d.attr("change_class")).removeClass("display-off").addClass("display-on") : a(d.attr("change_class")).removeClass("display-on").addClass("display-off"));
        ({rtn_mode: !0})[e] ? Game.setting[e] = g : stage.gGameStatus[e] = g;
        var n = new (s.extend({urlRoot: Game.baseUri + "raid/setting"}));
        n.save({set: e, value: g}, {success: function () {
            "rtn_mode" == e && c.setRtnMode()
        }, error: function () {
        }, silent: !0})
    }, setBgmButton: function (b) {
        a(".btn-bgm-change").trigger("tap")
    }, popShowChat: function (c) {
        var d, e = this, f = a(c.currentTarget).attr("category"), g = "pop-chat", h = C.getMessage("raid_48"), i = {};
        this.stopEventPropagation(c, !0), "-1" == f && (f = stage.gGameStatus.chat_category, h = C.getMessage("raid_49")), 9999 !== +f ? d = stage.pJsnData.chat[f] : (g = "pop-ready-stamp", d = b.filter(stage.pJsnData.chat[f], function (a) {
            return+a.priority <= 32
        }), d = b.sortBy(d, function (a) {
            return+a.priority
        }), i.showRecentStamps = w.isSupported(), i.showRecentStamps && (i.recentStamps = e.getRecentStamps())), i.category = f, i.chat_list = d, this.popView = new r({className: g, title: h, body: b.template(a("#tpl-chat-pop").html(), i), flagBtnCancel: 0, flagBtnOk: 0}), this.popView.render(), "9999" == f && (a(".prt-stamp-wrapper .lis-stamp-slider").hide().addClass("invisible"), a(".prt-stamp-image").flexslider({selector: ".prt-stamp-wrapper > .lis-stamp-slider", animation: "slide", animationLoop: !1, slideshow: !1, prevText: "", nextText: "", startAt: stage.gGameStatus.stamp_page, start: function () {
            if (0 != stage.gGameStatus.stamp_page) {
                var b = -268 * stage.gGameStatus.stamp_page;
                a(".prt-stamp-wrapper").css({transform: "translate3d(" + b + "px, 0px, 0px)", "-webkit-transform": "translate3d(" + b + "px, 0px, 0px)"})
            }
            a(".prt-stamp-wrapper .lis-stamp-slider").show().removeClass("invisible"), a(".prt-stamp-wrapper .lis-stamp-slider").css("display", "block")
        }, after: function () {
            var b = a(".flex-control-paging a").index(a(".flex-control-paging .flex-active"));
            b >= 0 && (stage.gGameStatus.stamp_page = b)
        }})), a(".pop-chat .prt-popup-footer").append('<div class="btn-usual-close ev-back"></div>'), a(".pop-ready-stamp .prt-popup-footer").append('<div class="btn-usual-close ev-back"></div>'), this.popView.popShow(), 0 == stage.pJsnData.chat_temporary_flag && (a(".pop-chat .txt-notice").css("display", "block"), a(".pop-ready-stamp .txt-notice").css("display", "block"))
    }, getRecentStamps: function () {
        var a, c, d = this, e = [], f = 16;
        if (d.recentStamps = d.recentStamps || [], a = w.getItem("recentStamps"), a && (a = JSON.parse(a)), !a) {
            for (c = 0; f > c; c++)e[c] = 0;
            w.setObject("recentStamps", e), a = e
        }
        for (c = 0; f > c; c++)d.recentStamps[c] = b.find(stage.pJsnData.chat[9999], function (b) {
            return+b.chat_id === a[c]
        }), void 0 === d.recentStamps[c] && (d.recentStamps[c] = {chat_id: "0"});
        return d.recentStamps
    }, prepareLatestStamp: function (a) {
        var b = this;
        b.preparedLatestStamp = a
    }, setLatestStamp: function () {
        var a, c, d, e, f = this, g = [], h = 16;
        if (a = f.preparedLatestStamp || null, null !== a) {
            for (d = f.getRecentStamps(), c = b.filter(d, function (b) {
                return+b.chat_id !== a
            }), e = h; e--;)void 0 === c[e] && (c[e] = {chat_id: "0"}), g[e + 1] = +c[e].chat_id;
            g[0] = a, w.setObject("recentStamps", g)
        }
    }, changeCategory: function (c) {
        var d = a(c.currentTarget).attr("category");
        stage.gGameStatus.chat_category = d, a(".pop-chat .txt-popup-body").html(b.template(a("#tpl-chat-pop").html(), {category: d, chat_list: stage.pJsnData.chat[d]})), 0 == stage.pJsnData.chat_temporary_flag && a(".pop-chat .txt-notice").show()
    }, ChatSend: function (b) {
        this.doChatSend(a(b.currentTarget).attr("chatId"), a(b.currentTarget).attr("category"))
    }, doChatSend: function (a, b) {
        if (b || (b = 9999), 1 != this.chat_limited) {
            var c = this;
            this.chat_limited = !0, setTimeout(function () {
                c.chat_limited = !1
            }, 3500), this.popRemove();
            var d = this;
            9999 === +b && w.isSupported() && (this.prepareLatestStamp(+a), this.setLatestStamp());
            var e = stage.pJsnData.user_id, f = stage.pJsnData.viewer_id, g = (stage.pJsnData.nickname, a), h = b;
            d.broadcastChatLog({userId: e, viewerId: f, chatId: g, categoryId: h}), d.notifyFirstChat()
        }
    }, popShowAbilityError: function (a, b) {
        this.$el.find(".pop-usual").css("display", "none"), this.hideMask();
        var c = new r({className: "pop-raid-ability-error", title: C.getMessage(a), body: C.getMessage(b), flagBtnCancel: 0, flagBtnOk: 1});
        c.on("ok", function () {
            this.popRemove(), this.off()
        }), c.render().popShow(), this.popView = c
    }, popRemove: function () {
        stage.pJsnData.suddenly_attack_flag && stage.gGameStatus.preemptiveDeferred.resolve(), b.isUndefined(this.popView) || this.popView.popRemove()
    }, invokeAttackPendingQueue: function () {
        var a = this;
        if (a.attackPendingQueue) {
            var c = b.clone(a.attackPendingQueue || []);
            a.attackPendingQueue = [], b.each(c, function (a) {
                a()
            })
        }
    }, invokeAbilityPendingQueue: function () {
        var a = this;
        if (a.abilityPendingQueue) {
            var c = b.clone(a.abilityPendingQueue || []);
            a.abilityPendingQueue = [], b.each(c, function (a) {
                a()
            })
        }
    }, setRtnMode: function () {
        b.isUndefined(stage.pJsnData.cmd) && stage.pJsnData.multi && (Game.setting.rtn_mode ? (this.initSocket(stage.pJsnData.raid_id), this.getLatestMultiMemberInfo()) : (this.destroySocket(), this.displayMVP()))
    },
     initSocket: function (c) {
        function d(a) {
            window.stage && stage.gGameStatus && stage.gGameStatus.attacking && stage.gGameStatus.attackQueue.index.length > 0 ? f.attackPendingQueue.push(a) : a()
        }

        function e(a, b) {
            ka(b, function () {
                f.resetAllianceMember(a)
            })
        }

        var f = this;
        f.destroySocket(), f.attackPendingQueue = [], f.abilityPendingQueue = [];
        var g = f.socket = new q({room: "raid" + c, socketUriController: ""}), h = f.chatSocket = new q({room: "raid" + c, socketUriController: "chat/raid"});
        g.multiLog = {}, g.boss = {param: {}, status: {}, recast: {}}, g.user = {param: {}, status: {}, recast: {}};
        var j = {};
        j.memberJoin = function (a) {
            a.member.user_id != Game.userId && (ia(a.timestamp, function () {
                f.addAllianceMember(a.member)
            }), ja(a.member.user_id, a.timestamp, function () {
                f.MultiLog(a.member)
            }), o.playAssistJoinedSE())
        }, j.memberRetire = function (a) {
            var c = a.member;
            c.retired_flag = !0, c.hp_ratio = 0;
            var d = f.getAllianceData({userId: c.user_id});
            ia(a.timestamp, function () {
                f.updateAllianceMember(c)
            }), a.member.user_id != Game.userId && (ja(a.member.user_id, a.timestamp, function () {
                f.MultiLog(b.defaults(c, d))
            }), e(a.mvpList, a.timestamp), a.isHost === !0 && f.setEnableAssist())
        }, j.mvpReset = function (a) {
            e(a.mvpList, a.timestamp)
        }, j.mvpUpdate = function (a) {
            e(a.mvpList, a.timestamp)
        }, j.userParam = function (a) {
            ia(a.timestamp, function () {
                f.resetAllianceMember(a.member)
            });
            var c = a.membersParams[Game.userId];
            b.isEmpty(c) || d(function () {
                la(a.timestamp, function () {
                    f.updateUserParam(c)
                })
            })
        }, j.userCondition = function (a) {
            var c = a.membersConditions[Game.userId];
            b.isEmpty(c) || d(function () {
                ma(a.timestamp, function () {
                    f.updateUserStatus(c)
                })
            })
        }, j.bossRecast = function (a) {
            var c = a.membersRecasts[Game.userId];
            b.isEmpty(c) || d(function () {
                na(a.timestamp, function () {
                    f.updateBossRecast(c)
                })
            })
        }, j.bossUpdate = function (a) {
            d(function () {
                oa(a.timestamp, function () {
                    f.updateBossParam(a.param)
                })
            })
        }, j.fieldEffect = function (a) {
            d(function () {
                sa(a.timestamp, function () {
                    i.mConditionField(a.param)
                })
            })
        }, j.summonUpdate = function (a) {
            a.user_id != Game.userId && pa(a.timestamp, function () {
                f.FusionChance(a.summon_id)
            })
        }, j.battleFinish = function (b) {
            b.log.user_id != Game.userId && d(function () {
                qa(b.timestamp, function () {
                    f.MultiLog(b.log), stage.gGameStatus.node_finish = !0, stage.gGameStatus.finish ? stage.gGameStatus.player.all_dead && f.Attack() : (a(".btn-attack-start").removeClass("display-on"), stage.gAryRootParts[0][stage.gGameParam.cjs.parts[0]].gotoAndPlay("tap_out"),
                        stage.gAryRootParts[1][stage.gGameParam.cjs.parts[1]].gotoAndPlay("out"), a(".pop-usual, .mask").hide(), f.AttackHide(), f.Attack())
                })
            })
        }, j.battleLose = function (a) {
            if (a.log.user_id != Game.userId) {
                var b = a.log;
                ia(a.timestamp, function () {
                    var a = f.getAllianceData({userId: b.user_id});
                    a.hp_ratio = 0, f.updateAllianceMember(a)
                }), ja(b.user_id, a.timestamp, function () {
                    f.MultiLog(b)
                })
            }
        }, j.battleRematch = function (a) {
            if (a.log.user_id != Game.userId) {
                var b = a.log;
                ja(b.user_id, a.timestamp, function () {
                    f.MultiLog(b)
                })
            }
        };
        var k = {};
        j.logPop = function (a) {
            var c = Game.userId;
            b.each(a.log, function (e) {
                if (e.user_id != c) {
                    var g = function (a) {
                        var c = window.stage;
                        c && c.gGameStatus && c.gGameStatus.retire || (f.MultiLog(a), c.gGameStatus.others_effect_display_flag && b.each(a.scenario, function (a) {
                            var b = a.kind;
                            if (k[b] = k[b] || 0, !(k[b] + 1 > I)) {
                                ++k[b];
                                var d = createjs.Tween.get({}), e = i.mWindowEffect(d, a), f = e * (c.gGameParam.spf || K);
                                d.wait(f), d.call(function () {
                                    k[b]--
                                })
                            }
                        }))
                    };
                    switch (e.type) {
                        case"heal":
                            d(function () {
                                la(a.timestamp, !0, function () {
                                    g(e)
                                })
                            });
                            break;
                        case"buff":
                            d(function () {
                                ma(a.timestamp, !0, function () {
                                    g(e)
                                })
                            });
                            break;
                        case"debuff":
                            d(function () {
                                oa(a.timestamp, !0, function () {
                                    g(e)
                                })
                            });
                            break;
                        default:
                            g(e)
                    }
                }
            })
        }, j.logAdd = function (a) {
            var c = a.log;
            b.isArray(c) ? b.each(c, function (a) {
                f.prependMultiBattleLog(a)
            }) : f.prependMultiBattleLog(c)
        }, j.scenarioPlay = function (a) {
            var c = {timestamp: a.timestamp, user_id: a.user_id, scenario: []};
            return b.each(a.scenario, function (a) {
                "formchange" === a.cmd && "boss" === a.to && c.scenario.push(a)
            }), a.user_id != Game.userId || b.isEmpty(c.scenario) ? void(a.user_id != Game.userId && d(function () {
                f.playScenariosImmediately(a)
            })) : void d(function () {
                f.playScenariosImmediately(c)
            })
        }, j.bossKill = function (a) {
            a.user_id != Game.userId && d(function () {
                oa(a.timestamp, function () {
                    var b = a.data.pos;
                    stage.gGameStatus.boss.param[b].alive && (f.checkReward(), f.MultiLog(a.data))
                })
            })
        }, j.bgmPlay = function (a) {
            a.user_id != Game.userId && d(function () {
                ra(a.timestamp, function () {
                    window.stage.gGameStatus.shouldPlayFixedBGM || F(a.bgm)
                })
            })
        }, g.onSocket("raid", function (a) {
            b.each(a, function (a, b) {
                var c = j[b] || function () {
                };
                c.call(this, a)
            })
        });
        var l = {};
        l.raidPost = function (a) {
            return a && a.user_comment ? void(1 * Game.setting.chat_mode !== 0 && (a.user_comment.is_stamp ? (Game.setting.chat_stamp || a.user_id == Game.userId) && f.insertStamp(a.user_comment.stamp_id, a.platform_id) : f.insertComment(a.user_comment.text, a.platform_id))) : void 0
        }, l.chatAdd = function (a) {
            (!a.commentData.isStamp || Game.setting.chat_stamp || a.userId == Game.userId) && f.displayChat(a)
        }, h.onSocket("chat", function (a) {
            b.each(a, function (a, b) {
                var c = l[b] || function () {
                };
                c.call(this, a)
            })
        }), h.onSocket("raid", function (a) {
            b.each(a, function (a, b) {
                var c = l[b] || function () {
                };
                c.call(this, a)
            })
        })
    }, destroySocket: function () {
        this.socket && (this.socket.destroy(), delete this.socket), this.chatSocket && (this.chatSocket.destroy(), delete this.chatSocket)
    }, destroy: function () {
        this.off(), this.undelegateEvents(), this.stopListening();
        var c = window.stage, d = a(Game.ua.isJssdk() ? "#mobage-game-container" : "body");
        d.off("cgtouchstart"), b.each([".active-mask", ".mask", "#opaque-mask"], function (b) {
            a(b).css("display", "none")
        }), b.isUndefined(c) || b.isUndefined(c.gGameStatus) || b.each(c.gGameStatus.timer, function (a) {
            clearInterval(a)
        });
        var e = this;
        e.oTweenCommon && e.oTweenCommon.timeline[0].call(function () {
            b.each(c.gGameStatus.timer, function (a) {
                clearInterval(a)
            })
        }), e.socket && (e.socket.destroy(), delete e.socket), e.chatSocket && (e.chatSocket.destroy(), delete e.chatSocket)
    }, displayLog: function (b) {
        var c = this;
        return c.deferredDisplayLog = c.deferredDisplayLog || (new a.Deferred).resolve(), b && (c.deferredDisplayLog = c.deferredDisplayLog.then(function () {
            var c = new a.Deferred;
            if (b.log) {
                var d = {"class": "log-multipop", title: C.getMessage("raid_50"), body: b.log};
                i.mLog(d), setTimeout(function () {
                    c.resolve()
                }, 2e3)
            } else c.resolve();
            return c
        })), c.deferredDisplayLog
    }, updateUserParam: function (a, c) {
        var d = window.stage;
        if (d && d.pJsnData && d.gGameStatus && d.gGameStatus.player && d.gGameStatus.player.param) {
            var e = {};
            b.each(d.pJsnData.formation, function (a, b) {
                e[a] = b
            }), b.each(a, function (a) {
                if (b.has(e, a.num)) {
                    var g = a.pos = e[a.num], h = d.gGameStatus.player.param[g];
                    h && a.param && (c || h.hp < a.param.hp) && (i.mPlayerGaugeHpForLog(a), 1 != d.gGameStatus.attacking && !b.isUndefined(g) && h.alive && f.mChangeMotionInstantly({motion: "stbwait", pos: g, type: "player"}))
                }
            })
        }
    }, updateUserStatus: function (c) {
        var d = this, e = window.stage;
        if (e && e.pJsnData && e.gGameStatus && e.gGameStatus.player && e.gGameStatus.player.param) {
            var f = {};
            b.each(e.pJsnData.formation, function (a, b) {
                f[a] = b
            }), b.each(c, function (a) {
                if (b.has(f, a.num)) {
                    var c = a.pos = f[a.num], d = e.gGameStatus.player.param[c];
                    if (d) {
                        var g = d.condition = a.condition;
                        if (i.mConditionPlayer(g, c), a.param && a.param.recast_plus) {
                            var h = ta(c, a.param.recast_plus), j = 0 | d.recast, k = 0 | d.recastmax, l = Math.max(Math.min(j + h, k), 0);
                            i.mPlayerGaugeRecastForLog({pos: c, param: {recast: l, recastmax: k}}), ua(c, a.param.recast_plus)
                        }
                    }
                }
            }), d.renewCharaList()
        }
        return new a.Deferred
    }, updateBossRecast: function (c) {
        return window.stage && stage.pJsnData && stage.pJsnData.boss && stage.gGameStatus && stage.gGameStatus.boss && b.each(c, function (a, b) {
            i.mBossGaugeRecastForLog(wa, stage.pJsnData.boss.type, {pos: b, param: {recast: a.recast, recastmax: a.recastmax}})
        }), new a.Deferred
    }, changeBossMode: function (a, b) {
        var c = window.stage, d = c.gGameStatus;
        if (d) {
            var e = d.bossmode;
            e && (e.already_changed && (e.already_changed[a] = !0), e.looks && e.looks.mode && (e.looks.mode[a] = b));
            var g = wa[a];
            g && g.mode && g.mode.changeMode(b);
            var h = 1 == b ? "wait" : "wait_" + b;
            d.waitmode && (d.waitmode[a] = h);
            var i = "1" != c.pJsnData.effect_mode ? f.mCjsLabelSelecter("enemy", h) : h, j = c.gAryRootBoss, k = d.boss && d.boss.param;
            if (j && j[a] && k && k[a]) {
                var l = j[a][k[a].cjs];
                l.gotoAndPlay(i)
            }
            3 == b ? wa[a].recast.disableRecast() : wa[a].recast.enableRecast()
        }
    }, updateBossParam: function (c) {
        var d = this, e = new a.Deferred;
        return window.stage && stage.gGameStatus && stage.gGameStatus.boss && (b.each(stage.gGameStatus.boss.param, function (a, b) {
            var f = "boss" + (b + 1);
            a.hp = c[f + "_hp"], i.mBossGaugeHpForLog(wa, stage.pJsnData.boss.type, {pos: b, param: {hp: a.hp, hpmax: a.hpmax}});
            var g = c[f + "_mode"];
            1 == g && "wait" !== stage.gGameStatus.waitmode[b] ? (d.changeBossMode(b, g), e.resolve()) : 2 == g && "wait_2" !== stage.gGameStatus.waitmode[b] ? (d.changeBossMode(b, g), d.displayLog({log: C.getMessage("raid_51"), "class": "over"}).always(function () {
                e.resolve()
            })) : 3 == g && "wait_3" !== stage.gGameStatus.waitmode[b] ? (d.changeBossMode(b, g), d.displayLog({log: C.getMessage("raid_52"), "class": "break"}).always(function () {
                e.resolve()
            })) : e.resolve();
            var h = c[f + "_mode_gauge"];
            i.mBreakGaugeForLog(wa[b], {pos: b, gauge: h});
            var j = c[f + "_condition"];
            j && (stage.gGameStatus.boss.param[b].condition = j, wa[b].condition.setCondition(j, stage.gGameStatus.bossmode.looks.mode[b]))
        }), i.mConditionBoss(wa)), e
    }, createChat: function (a) {
        var b, c = this, d = a.categoryId, e = a.chatId, f = a.viewerId, g = a.date;
        b = a.text ? {category: d, chat_id: e, text: a.text} : this.pJsnData.chat && this.pJsnData.chat[d] && this.pJsnData.chat[d][e];
        var h = this.getAllianceData({viewerId: f});
        return b && h ? {chat: b, name: h.nickname, image: h.pc_image, date: g} : (c.getLatestMultiMemberInfo(), null)
    }, displayChat: function (c, d) {
        function e(b) {
            b.removeClass("pop-comment-show"), clearTimeout(b.attr("data-timer"));
            var c = setTimeout(function () {
                a("body").hasClass("android2") ? (b.addClass("pop-comment-hide"), b.remove()) : b.addClass("pop-comment-hide").oneAnimationEnd(function () {
                    b.remove()
                }, 300)
            }, 2e3);
            b.attr("data-timer", c)
        }

        if (d = d || this.createChat(c)) {
            var f = a(".prt-history"), g = f.children("div");
            if (g.size() >= 3) {
                var h = g.last();
                clearTimeout(h.attr("data-timer")), h.remove()
            }
            var i = b.template(a("#tpl-chat-parts").html(), d), j = Math.round(220 * Math.random()), k = Math.round(50 * Math.random());
            if (a("body").hasClass("android2")) {
                f.prepend(i).find("div:first").addClass("pop-comment-show").css({top: k + "px", left: j + "px"});
                var l = f.find(".pop-comment-show"), m = setTimeout(function () {
                    e(l), clearTimeout(m)
                }, 1e3)
            } else f.prepend(i).find("div:first").addClass("pop-comment-show").css({top: k + "px", left: j + "px"}).oneAnimationEnd(function () {
                var b = a(this);
                e(b)
            }, 1100)
        }
    }, insertComment: function (a, b) {
        var c = {categoryId: 0, chatId: 0, text: a, viewerId: b};
        this.displayChat(c)
    }, insertStamp: function (a, b) {
        var c = {categoryId: 9999, chatId: a, viewerId: b};
        this.displayChat(c)
    }, isMulti: function () {
        return window.stage && stage.pJsnData && 1 == stage.pJsnData.multi
    }, broadcastChatLog: function (a) {
        var c = this;
        stage.pJsnData.is_semi ? c.chatSemiraidModel.postChatModel.save(b.extend({raidId: stage.pJsnData.raid_id}, a), {patch: !0, success: function () {
            Game.chatView.updateSemiraidCommentList()
        }}) : c.isMulti() && c.socket && (a.type = "chatAdd", c.chatSocket.emit("raid", a))
    }, TutorialPreRender: function () {
    }, TutorialInit: function () {
    }, TutorialTurnEnd: function () {
    }, fellowTimeup: function () {
        stage.gGameStatus.finish = !1, stage.gGameStatus.menu = "temporary", this.Attack()
    }, ChangeSpeed: function (b) {
        if (!this._isChangeSpeedDisallowed() && !a(b.currentTarget).hasClass("disabled")) {
            var c;
            switch (this.currentFps) {
                case parseInt(1.5 * this.baseFps):
                    this.currentFps = 2 * this.baseFps, c = "3";
                    break;
                case 2 * this.baseFps:
                    this.currentFps = parseInt(1.5 * this.baseFps), c = "2";
                    break;
                default:
                    this.currentFps = parseInt(1.5 * this.baseFps), c = "2"
            }
            this._setting_model || (this._setting_model = new (s.extend({urlRoot: Game.baseUri + "raid/setting"}))), this._setting_model.save({set: "battle_speed", value: c}, {success: function () {
            }, error: function () {
            }, silent: !0}), a(".btn-change-speed").attr({fps: this.currentFps}), stage.gGameParam.spf = Math.round(1e3 / this.currentFps * 100) / 100, createjs.Ticker.setFPS(this.currentFps)
        }
    }, _isChangeSpeedDisallowed: function () {
        this.changeSpeedTime || (this.changeSpeedTime = 0);
        var a = Date.now();
        return a - this.changeSpeedTime < 1e3 ? !0 : (this.changeSpeedTime = a, !1)
    }, BattleLog: function () {
        if (!stage.pJsnData.is_semi) {
            this.scrollPopShow("<div class='pop-log-window'>" + C.getMessage("raid_12") + "</div>");
            var a = this, b = new d;
            b.preSave(stage.gGameStatus.shouldReAuth, {raid_id: stage.pJsnData.raid_id}, {url: b.urlRoot("multi_battle_log", "", stage.pJsnData.is_multi, stage.pJsnData.is_semi), silent: !0, error: function () {
            }, success: function (b) {
                var c = b.get("multi_battle_log");
                a.displayBattleLog(c)
            }})
        }
    }, displayBattleLog: function (c) {
        var d = this, e = a("#tpl-multi-log").html(), f = a(".pop-log-window");
        if (f.html(""), 0 === c.length)f.html(C.getMessage("raid_53")); else {
            var g = !1;
            b.each(c, function (a) {
                var c = d.getAllianceData({userId: a.user_id});
                c ? f.prepend(b.template(e, b.defaults(b.defaults(a, c), {my_user_id: stage.pJsnData.user_id}))) : g = !0
            }), g && d.getLatestMultiMemberInfo()
        }
    }, allianceList: function () {
        if (!stage.pJsnData.is_semi) {
            this.scrollPopShow("<div class='pop-alliance-window'></div>");
            var c = a(".pop-alliance-window"), d = this.pJsnData.user_id || Game.userId, e = b.reject(this.pJsnData.multi_raid_member_info, function (a) {
                return a.user_id != d && a.retired_flag
            });
            c.html(b.template(a("#tpl-alliance-list").html(), {user_list: b.first(e, L), excess: this.pJsnData.fellow - L}));
            var f = c.find('[data-id="' + stage.pJsnData.user_id + '"]');
            f.addClass("player").prependTo(c), b.each(e, function (a) {
                var b = c.find('[data-id="' + a.user_id + '"]');
                b.addClass("rank" + a.rank)
            })
        }
    }, popShowRematchFail: function () {
        var a = new r({className: "pop-rematch-fail", title: C.getMessage("raid_54"), body: C.getMessage("raid_55"), flagBtnCancel: 0, flagBtnOk: 1});
        this.popShowRematchFail = function () {
            a.render(), a.popShow(!0, "50px"), this.popView = a
        }, this.popShowRematchFail()
    }, popHideRematchFail: function () {
        this.hideMask(), this.popView && this.popView.popRemove(), stage.gGameStatus.boss.all_dead ? stage.gGameStatus.node_finish && !stage.gGameStatus.is_clear && this.activateMask() : this.Attack()
    }, popShowTimeUp: function () {
        var a = new r({className: "pop-time-up", title: C.getMessage("raid_54"), body: C.getMessage("raid_80"), flagBtnCancel: 0, flagBtnOk: 1});
        this.popShowTimeUp = function () {
            a.render(), a.popShow(!0, "50px"), this.popView = a
        }, this.popShowTimeUp()
    }, isPlayerAlive: function () {
        return 1 == stage.pJsnData.player.param[0].alive
    }, FusionChance: function (b) {
        var c = a(".prt-fusion");
        b && this.isPlayerAlive() ? (c.find(".img-summon").attr({src: Game.imgUri + "/sp/assets/summon/raid_normal/" + b + ".jpg"}).css({display: "block"}), c.css("display", "block"), clearTimeout(stage.gGameStatus.timer.mFusion), stage.gGameStatus.timer.mFusion = setTimeout(function () {
            c.css("display", "none")
        }, 4700)) : (clearTimeout(stage.gGameStatus.timer.mFusion), c.css("display", "none"))
    }, MultiLog: function (c) {
        var d = window.stage;
        if (1 == d.pJsnData.effect_mode && !(d.gGameStatus.logtimer > 0)) {
            d.gGameStatus.logtimer = 2, c.viewer_id = c.viewer_id || d.pJsnData.viewer_id, c.user_id = c.user_id || d.pJsnData.user_id;
            var e = c.pc_image, f = c.nickname, g = c.message;
            b.isObject(g) && (g = g[Game.lang]);
            var h = c.priority || 0;
            if (!(h < (this.multilogPriority || 0))) {
                if (!(e && f && g)) {
                    var i = this.getAllianceData({userId: c.user_id});
                    if (!i)return void this.getLatestMultiMemberInfo();
                    e = e || i.pc_image, f = f || i.nickname
                }
                var j = a(".prt-multilog");
                j.hide(), e ? j.find(".img-user").attr({src: Game.imgUri + "/sp/assets/leader/raid_log/" + e + ".png"}) : j.find(".img-user").attr({src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAABmJLR0QA/wD/AP+gvaeTAAAADUlEQVQI12NgYGBgAAAABQABXvMqOgAAAABJRU5ErkJggg=="}), j.find(".txt-body").html(g), j.show(), clearTimeout(this.multilogTimer);
                var k = this;
                this.multilogTimer = setTimeout(function () {
                    j.hide(), k.multilogTimer = null, delete k.multilogTimer, k.multilogPriority = null, delete k.multilogPriority
                }, 2300), this.multilogPriority = h, delete c.message
            }
        }
    }, getAllianceData: function (a) {
        return b.find(this.pJsnData.multi_raid_member_info, function (b) {
            return b.user_id == a.userId || b.viewer_id == a.viewerId
        })
    }, initializeMVP: function (a, c) {
        a ? this.pJsnData.multi_raid_member_info = a : a = this.pJsnData.multi_raid_member_info, c ? this.pJsnData.mvp_info = c : c = this.pJsnData.mvp_info, b.each(a, function (a) {
            var d = b.find(c, function (b) {
                return b.user_id == a.user_id
            });
            d ? b.extend(a, d) : (a.rank = a.rank || c.length + 1, a.point = a.point || 0)
        }), this.calculateMVP()
    }, calculateMVP: function () {
        var a = this.pJsnData.multi_raid_member_info;
        a.sort(function (a, b) {
            return b.point - a.point || a.rank - b.rank
        }), this.updateMVPRank()
    }, updateMVPRank: function () {
        var a = this.pJsnData.multi_raid_member_info, c = this.pJsnData.user_id || Game.userId, d = stage && stage.gGameStatus && stage.gGameStatus.retire, e = 1;
        b.each(a, function (a) {
            a.retired_flag || a.user_id == c && d ? a.rank = null : a.rank = e++
        })
    }, updateAllianceNumber: function () {
        this.pJsnData.fellow = b.size(this.pJsnData.multi_raid_member_info)
    }, updateAllianceMember: function (a) {
        var c, d = a.user_id;
        (c = this.getAllianceData({userId: d})) && b.extend(c, a), this.calculateMVP(), this.displayMVP()
    }, addAllianceMember: function (a) {
        if (a) {
            var b = a.user_id, c = this.pJsnData.multi_raid_member_info = this.pJsnData.multi_raid_member_info || [];
            this.getAllianceData({userId: b}) || (a.rank = a.rank || c.length + 1, a.point = a.point || 0, c.push(a)), this.updateAllianceMember(a), this.updateAllianceNumber()
        }
    }, removeAllianceMember: function (a) {
        var c = a.user_id || a;
        c && (this.pJsnData.multi_raid_member_info = b.reject(this.pJsnData.multi_raid_member_info, function (a) {
            return a.user_id == c
        }), this.updateMVPRank(), this.displayMVP(), this.updateAllianceNumber())
    }, resetAllianceMember: function (a) {
        var c = this.pJsnData.multi_raid_member_info, d = !1;
        return b.each(a, function (a) {
            var e;
            (e = b.find(c, function (b) {
                return b.user_id == a.user_id
            })) ? b.extend(e, a) : d = !0
        }), d ? void this.getLatestMultiMemberInfo() : (this.calculateMVP(), void this.displayMVP())
    }, displayMVP: function () {
        if (!stage.pJsnData.is_defendorder) {
            var c = this, d = this.$el.find(".prt-mvp"), e = this.pJsnData.user_id || Game.userId;
            if (d.hide(), Game.setting.rtn_mode) {
                var f = d.children().removeClass("player"), g = 0, h = this.getAllianceData({userId: e});
                if (h) {
                    var i = a(f[g++]), j = c.displayMVPElement(i, h);
                    j.addClass("player"), i && i.length || d.prepend(j)
                }
                var k = b.reject(this.pJsnData.multi_raid_member_info, function (a) {
                    return a.retired_flag
                }), l = b.filter(b.first(k, H), function (a) {
                    return a.user_id != e
                });
                b.each(b.range(g, H), function (b) {
                    var e = a(f[b]), g = l.shift();
                    if (g && !g.retired_flag) {
                        var h = c.displayMVPElement(e, g);
                        e && e.length || d.append(h), h.show()
                    } else e.hide()
                }), d.show()
            }
        }
    }, displayMVPElement: function (c, d) {
        if (d.point = d.point ? Math.floor(d.point) : 0, c && c.length) {
            c.removeClass(b.filter(c.attr("class").split(" "), function (a) {
                return 0 === a.indexOf("rank")
            }).join(" "));
            var e = c.find(".prt-rank");
            if (b.isNaN(parseInt(d.rank, 10)) ? e.html("") : (c.addClass("rank" + d.rank), c.find(".prt-rank").html(C.replaceMessage("raid_1", [d.rank]))), d.pc_image) {
                var f = c.find(".img-character");
                f.attr("src", Ba(f.attr("src"), d.pc_image))
            }
            d.nickname && c.find(".txt-name").html(d.nickname), b.isNaN(parseInt(d.point, 10)) || c.find(".txt-point").html(d.point + "pt")
        } else try {
            c = a(b.template(a("#tpl-mvp-user").html(), d))
        } catch (g) {
        }
        return c
    }, getLatestMultiMemberInfo: function () {
        var a = this, b = 1e3, c = Date.now();
        if (!(a._prevConnectionTime && c < a._prevConnectionTime + b)) {
            a._prevConnectionTime = c;
            var d = new (s.extend({urlRoot: Game.baseUri + this.getRaidType() + "/multi_member_info"}));
            d.save({raid_id: a.pJsnData.raid_id}).done(function () {
                var b = d.get("multi_raid_member_info"), c = d.get("mvp_info");
                void 0 !== b && void 0 !== c && (a.initializeMVP(d.get("multi_raid_member_info"), d.get("mvp_info")), a.displayMVP(), a.updateAllianceNumber())
            })
        }
    }, updateDamageRanking: function (c) {
        var d = this.$el.find(".prt-mvp");
        d.hasClass("damage-rank") || d.addClass("damage-rank"), this.$el.find(".prt-multi-mene.damage-rank").css("display", "block");
        var e = b.template(a("#tpl-damage-ranking").html());
        this.updateDamageRanking = function (a) {
            var c = b.clone(a), f = !0, g = !0, h = !0, i = c.personal || null, j = c.total || null, k = c.turn || null;
            i && i.job_id && i.weapon && i.sex && i.nickname ? c.personal.pc_image = i.pc_image : f = !1, c.isDisplayPersonal = f, j && j.job_id && j.weapon && j.sex && j.nickname ? c.total.pc_image = j.pc_image : g = !1, c.isDisplayTotal = g, k && k.job_id && k.weapon && k.sex && k.nickname ? c.turn.pc_image = k.pc_image : h = !1, c.isDisplayTurn = h, d.html(e(c))
        }, this.updateDamageRanking(c)
    }, notifyFirstChat: function () {
        if (!stage.pJsnData.is_defendorder) {
            var c = this;
            if (!this.alreadySentChat) {
                this.alreadySentChat = !0;
                var e = new d;
                e.preSave(stage.gGameStatus.shouldReAuth, {raid_id: stage.pJsnData.raid_id}, {url: e.urlRoot("chat_result", "", stage.pJsnData.is_multi, stage.pJsnData.is_semi), silent: !0, ignoreError: !0, error: function () {
                }, success: function (d) {
                    b.each(d.get("scenario"), function (b) {
                        switch (b.cmd) {
                            case"information":
                                c.MultiLog({message: b.text, language: b.language});
                                break;
                            case"temporary":
                                stage.gGameStatus.temporary.small = b.small || 0, stage.gGameStatus.temporary.large = b.large || 0, i.mUpdateTemporaryItem(), stage.pJsnData.chat_temporary_flag = 1, a(".btn-chat .ico-attention").hide()
                        }
                    })
                }})
            }
        }
    }, checkReward: function () {
        this.Attack("reward")
    }, appendMultiBattleLog: function (a, c) {
        var d = stage.pJsnData.user_id || Game.userId;
        a.user_id != d && this.MultiLog(b.defaults(a, {message: a.comment}))
    }, prependMultiBattleLog: function (a) {
        this.appendMultiBattleLog(a, !0)
    }, activateMask: function () {
        this.getActiveMask().css("display", "block")
    }, inactivateMask: function () {
        this.getActiveMask().css("display", "none")
    }, getActiveMask: function () {
        var b = a(".active-mask");
        return this.getActiveMask = function () {
            return b
        }, this.getActiveMask()
    }, executeModeChange: function (a, c, d, e, g, h) {
        if (9 === a || 1 == a && ("wait" !== stage.gGameStatus.waitmode[h] || 1 != e))f.mChangeMotion(c[1].timeline[h], {motion: "wait", pos: h, type: "boss", is_alive: "on"}), c[1].timeline[h].call(function (a) {
            stage.gGameStatus.waitmode[a] = "wait", 1 === stage.pJsnData.boss.param[a].modeflag && wa[a].mode.changeMode(1), wa[a].recast.enableRecast()
        }, [h]); else if (2 != a || "wait_2" === stage.gGameStatus.waitmode[h] && 1 == e)3 != a || "wait_3" === stage.gGameStatus.waitmode[h] && 1 == e || (pFrame = f.mChangeMotion(c[1].timeline[h], {motion: "setin_3", pos: h, type: "boss", is_alive: "on"}, {tween: c}), f.mChangeMotion(c[1].timeline[h], {motion: "wait_3", pos: h, type: "boss", is_alive: "on"}), c[1].timeline[h].call(function (a) {
            stage.gGameStatus.waitmode[a] = "wait_3", 1 === stage.pJsnData.boss.param[a].modeflag && wa[a].mode.changeMode(3), wa[a].recast.disableRecast()
        }, [h]), c[2].timeline[0].call(function () {
            var a = {"class": "log-battle", title: C.getMessage("raid_8"), body: C.getMessage("raid_59")};
            i.mLog(a)
        })); else {
            pFrame = f.mChangeMotion(c[1].timeline[h], {motion: "setin_2", pos: h, type: "boss", is_alive: "on"}, {tween: c}), f.mChangeMotion(c[1].timeline[h], {motion: "wait_2", pos: h, type: "boss", is_alive: "on"}), c[1].timeline[0].call(function (a) {
                stage.gGameStatus.waitmode[a] = "wait_2", 1 === stage.pJsnData.boss.param[a].modeflag && wa[a].mode.changeMode(2)
            }, [h]);
            var j = d ? C.getMessage("rai_56") : "", k = b.isUndefined(g) || 1 != g ? "" : C.getMessage("raid_57");
            c[2].timeline[0].call(function () {
                var a = {"class": "log-battle", title: C.getMessage("raid_8"), body: C.replaceMessage("raid_58", [k, j])};
                i.mLog(a)
            })
        }
    }, popShowSummonFail: function () {
        this.popView = new r({className: "pop-summon-fail", title: C.getMessage("raid_60"), body: C.getMessage("raid_61"), flagBtnCancel: 0, flagBtnOk: 1}), this.popView.render(), this.popView.popShow(!0, "50px")
    }, popHideSummonFail: function () {
        a(".pop-summon-fail").hide(), this.hideMask()
    }, GetHeroPos: function () {
        var a = b.indexOf(stage.pJsnData.formation, "0");
        return a
    }, setAssistParam: function () {
        var a = stage.pJsnData;
        a.is_defendorder && (a.assist[1].is_enable = !1, a.assist[2].is_enable = !1, a.assist[3].is_enable = !1);
        var c = !1;
        b.each(a.assist, function (a, b) {
            a.is_enable && (c = !0)
        }), c ? a.invite_enable = 1 : a.invite_enable = 0
    }, showEnemyInfo: function (c) {
        for (var d = 0; d <= stage.gGameStatus.boss.param.length - 1; d++)if (1 == stage.gGameStatus.boss.param[d].alive) {
            var e = d + 1;
            a(".btn-enemy-gauge[target=" + e + "]").css({display: "block"}), a(".btn-targeting[target=" + e + "]").show();
            var f = a(".btn-enemy-gauge[target=" + e + "].prt-percent");
            stage.gGameStatus.dispHpPercent ? f.addClass("alive") : f.css({display: "none"}), (b.isUndefined(c) || 1 != c.targetedEnemyOnly || e == stage.gGameStatus.target) && a(".btn-targeting[target=" + e + "]").removeClass("invisible")
        }
        clearTimeout(this.hideInfoTimer), this.hideInfoTimer = setTimeout(function () {
            a(".prt-stage-area .btn-targeting:not(.lock-on)").addClass("invisible")
        }, 3e3)
    }, hideEnemyInfo: function () {
        a(".btn-targeting, .btn-enemy-gauge:not(.prt-percent)").hide()
    }, selectDungeonItem: function (c) {
        if (null == this.selectedDungeonItem) {
            var d = this;
            this.selectedDungeonItem = a(c.currentTarget).attr("key"), item_id = a(c.currentTarget).attr("item-id");
            var e = new (s.extend({urlRoot: Game.baseUri + "raid/dungeon_item"}));
            e.save({item_id: item_id, raid_id: stage.pJsnData.raid_id}, {success: function (c) {
                var e = new r({className: "pop-dungeon-item-selected", title: C.getMessage("raid_62"), body: b.template(a("#tpl-dungeon-item-selected").html(), {item: d.dungeonItems[d.selectedDungeonItem]}), flagBtnCancel: 0, flagBtnOk: 1});
                e.render(), e.popShow(!0, 50), o.playSE("se/ab_0060_se_1.mp3")
            }, silent: !0})
        }
    }, locationResult: function () {
        var a = "result/" + stage.pJsnData.raid_id + "/" + (this.currentFps / 6 - 1);
        this.content_close(), c.history.navigate(a, !0)
    }, popBattleService: function (c) {
        this.survival = c.survival || stage.pJsnData.survival, this.score_point = this.survival.is_score_buff ? parseInt(this.survival.score_point) : parseInt(this.survival.score_point) + parseInt(this.survival.add_point), this.popView = new r({className: "pop-battle-service", title: C.getMessage("battle_service_1"), body: b.template(a("#tpl-battle-service").html(), {items: this.survival, score: this.score_point}), flagBtnCancel: 0, flagBtnOk: 1}), this.popView.render(), this.$el.find(".pop-battle-service .btn-usual-ok").addClass("disable prt-silent-se").attr({"raid-id": c.raid_id}), this.popView.popShow(!0, 50)
    }, selectBattleService: function (b) {
        var c = this.$el.find(".pop-battle-service .btn-usual-ok");
        this.select_battle_service = a(b.currentTarget).attr("select");
        var d = parseInt(a(b.currentTarget).attr("point")), e = a(b.currentTarget).attr("comment"), f = a(b.currentTarget).attr("charge") || null, g = this.score_point - d;
        c.hasClass("disable") && c.removeClass("disable prt-silent-se"), 0 > g ? (c.hasClass("disable") || c.addClass("disable prt-silent-se"), e += C.getMessage("battle_service_2")) : 0 == f ? (c.hasClass("disable") || c.addClass("disable prt-silent-se"), e += C.getMessage("battle_service_3")) : f > 0 && (e += f > 1 ? C.replaceMessage("battle_service_5", [f]) : C.replaceMessage("battle_service_4", [f])), this.$el.find(".pop-battle-service .btn-battle-service").removeClass("disable"), this.$el.find(".pop-battle-service .btn-battle-service." + this.select_battle_service).addClass("disable"), this.$el.find(".pop-battle-service .txt-point-after").html("<span>" + g + "</span>"), this.$el.find(".pop-battle-service .prt-battle-service-comment .txt-comment").html(e)
    }, sendBattleService: function (b) {
        this.trigger("xhrStart");
        var d = this, e = a(b.currentTarget).attr("raid-id"), f = new (s.extend({urlRoot: Game.baseUri + "raid/battle_service"}));
        this.stopListening(f), this.listenToOnce(f, "sync", function () {
            if (d.survival.is_score_buff)location.reload(); else {
                o.stopBGM("bgm/99_sfvcollabo_result_short.mp3");
                var a = "#raid/" + e;
                d.content_close(), c.history.navigate(a, !0)
            }
        }), f.save({service_id: this.select_battle_service, raid_id: e})
    }, popNextBattle: function (c, d) {
        var e = c.arcarum_area_param;
        if (e.round_closed) {
            stage.gGameStatus.auto_attack && this._offAutoButton();
            var f = e.is_in_intermission ? C.getMessage("arcarum_inter_mission_1") : C.getMessage("arcarum_7");
            this.popQuestMessage({title: C.getMessage("arcarum_6"), message: f, url: e.redirect_url})
        } else if (e.occupied)stage.gGameStatus.auto_attack && this._offAutoButton(), this.popQuestMessage({title: C.getMessage("arcarum_6"), message: C.getMessage("arcarum_8"), url: e.redirect_url}); else if (e.lifeline_unlinked)stage.gGameStatus.auto_attack && this._offAutoButton(), this.popQuestMessage({title: C.getMessage("arcarum_6"), message: C.getMessage("arcarum_11"), url: e.redirect_url}); else {
            if (d) {
                var g = this.$el.find(".cnt-raid");
                stage.gGameStatus.auto_attack && this._offAutoButton(), this.arcarum_continue_data = c, c.battleCount = this.pJsnData.arcarum.battle_count;
                var h = this.renderPopArcarumContinue(c)
            }
            if (e.before_occupation_group_number == e.occupation_group_number)a("#pop-arcarum-result").html(b.template(a("#tpl-arcarum-score-result").html(), e)), this.setNamedTimeout("onPop", function () {
                a(".prt-arcarum-score-result").addClass("pop-show"), o.playSE(Z)
            }, 100), d && g.one("tapArcarumNextPop", function () {
                h.popShow()
            }); else {
                stage.gGameStatus.auto_attack && !d && this._offAutoButton();
                var i = e.occupation_group_number == e.my_group_number ? $ : _;
                a("#pop-arcarum-result").html(b.template(a("#tpl-arcarum-tactical-result").html(), e));
                var j = this.$el.find(".prt-arcarum-tactical-result");
                this.setNamedTimeout("onPop", function () {
                    j.addClass("pop-show"), o.playSE(i)
                }, 100), d && (j.find(".btn-arcarum-next.btn-result").removeClass("btn-result"), g.one("onOk", function () {
                    a("#pop-arcarum-result").empty(), h.popShow()
                }))
            }
        }
    }, renderPopArcarumContinue: function (c) {
        var d = new r({className: "pop-arcarum-continue", title: C.getMessage("arcarum_10"), body: b.template(a("#tpl-arcarum-confirm-continue").html(), c), flagBtnCancel: 1, flagBtnOk: 1});
        return d.render(), c.current_tp.total <= 0 && d.$el.find(".btn-usual-ok").addClass("disable"), d
    }, sendArcarumContinue: function (a) {
        this.trigger("xhrStart");
        var b = this, d = new (s.extend({urlRoot: Game.baseUri + "raid/arcarum_continue"}));
        this.stopListening(d), this.listenToOnce(d, "sync", function (a) {
            o.stopBGM("bgm/99_sfvcollabo_result_short.mp3");
            var d = a.get("raid_id");
            b.content_close(), c.history.navigate("#raid/" + d, !0)
        });
        var e = this.arcarum_continue_data.accumulate, f = this.arcarum_continue_data.ability_or_summon, g = "undefined" == typeof stage.pJsnData ? this.arcarum_continue_data.raid_id : stage.pJsnData.raid_id;
        d.save({raid_id: g, accumulate: e, ability_or_summon: f}).done(function (c) {
            b.$el.find(a.currentTarget).hasClass("reload") && location.reload()
        })
    }, sendExitBattle: function () {
        this.sendArcarumWithdraw()
    }, changeAutoMode: function () {
        stage.gGameStatus.enable_auto_button && (stage.gGameStatus.auto_attack ? this._offAutoButton() : this._onAutoButton())
    }, _removeAutoButton: function () {
        stage.gAryCntnParts[3].removeChild(stage.gAryRootParts[3])
    }, _showAutoButton: function () {
        stage.gAryCntnParts[3].visible = !0
    }, _hideAutoButton: function () {
        stage.gAryCntnParts[3].visible = !1
    }, _onAutoButton: function () {
        stage.gGameStatus.auto_attack = !0, stage.gAryRootParts[3][stage.gGameParam.cjs.parts[3]].gotoAndPlay("on")
    }, _offAutoButton: function () {
        stage.gGameStatus.auto_attack = !1, stage.gAryRootParts[3][stage.gGameParam.cjs.parts[3]].gotoAndPlay("off")
    }, _outAutoButton: function () {
        stage.gGameStatus.enable_auto_button = !1, stage.gAryRootParts[3][stage.gGameParam.cjs.parts[3]].gotoAndPlay("out")
    }, _inAutoButton: function () {
        stage.gGameStatus.enable_auto_button = !0, stage.gAryRootParts[3][stage.gGameParam.cjs.parts[3]].gotoAndPlay("in")
    }, _noInteractiveAutoButton: function () {
        a(".btn-auto").hide()
    }, _interactiveAutoButton: function () {
        a(".btn-auto").show()
    }, _toMissType: function (a, b) {
        var c = b;
        switch (a) {
            case 1:
                c = N;
                break;
            case 2:
                c = O;
                break;
            case 3:
                c = P
        }
        return c
    }, setNinjaMark: function (b) {
        var c = stage.gGameStatus.ability_sub_param.length, d = "se/btn_se/btn_se_06.mp3", e = "se/btn_se/btn_se_02.mp3", f = a(b.currentTarget);
        0 == c ? (o.playSE(d), stage.gGameStatus.ability_sub_param[0] = a(b.currentTarget).attr("mark"), f.addClass("first"), f.find('[class^="ico-ninja-mark"]').addClass("active")) : 1 == c ? (o.playSE(d), stage.gGameStatus.ability_sub_param[1] = f.attr("mark"), f.addClass("second"), f.find('[class^="ico-ninja-mark"]').addClass("active"), a(".pop-ability-mark .btn-usual-text").removeClass("disable")) : f.hasClass("second") && (o.playSE(e), stage.gGameStatus.ability_sub_param.splice(1, 1), f.removeClass("second"), f.hasClass("first") || f.find('[class^="ico-ninja-mark"]').removeClass("active"), a(".pop-ability-mark .btn-usual-text").addClass("disable"))
    }, exeNinjaAbility: function (b) {
        a(b.currentTarget).hasClass("disable") || (a(".pop-ability-mark, .mask").hide(), this.StoreAttackQueue())
    }, onAbilityHiddenweapon: function (a) {
        var b = this, c = this.$el.find(".pop-ability-hiddenweapon"), d = c.find(".prt-ability-detail");
        this.onAbilityHiddenweapon = function (a) {
            var e = b.$el.find(a.currentTarget), f = d.find(".text-blue").length ? '<br><span class="text-blue">' + d.find(".text-blue").html() + "</span>" : null;
            c.find(".btn-box").addClass("invalid").removeClass("active"), e.addClass("active").removeClass("invalid"), c.find(".disable-hiddenweapon").addClass("btn-usual-hiddenweapon").removeClass("disable-hiddenweapon"), d.find(".name").html(e.data("name")), d.find(".effect").html(e.data("comment") + f)
        }, this.onAbilityHiddenweapon(a)
    }, exeAbilityHiddenweapon: function () {
        var b = this, c = this.$el.find(".pop-ability-hiddenweapon");
        this.exeAbilityHiddenweapon = function () {
            var d = c.find(".btn-box.active");
            return stage.gGameStatus.ability_sub_param.push(d.data("pos")), a(".pop-ability-hiddenweapon, .mask").hide(), "2" == d.data("pick") || "5" == d.data("pick") ? void b.popAbilitySubSelecter(null, d) : void b.StoreAttackQueue()
        }, this.exeAbilityHiddenweapon()
    }, exeAbilityLupiFlip: function (b) {
        var c = a(b.currentTarget);
        stage.gGameStatus.ability_sub_param.push(c.data("id")), a(".pop-ability-lupiflip, .mask").css("display", "none"), this.StoreAttackQueue()
    }, popAbilitySubSelecter: function (c, d) {
        var e = d || a(c.currentTarget), f = ".pop-select-member", g = this.$el.find(f), h = 0, i = e.data("pick");
        (parseInt(h) > 0 || e.hasClass("tmp-mask")) && a(".btn-ability-use").hide(), a(f + " .hideable").hide(), a(".txt-select-chara").html("キャラクターを選択してください。");
        var j = g.find(".prt-ability-detail").html(), k = {img: e.find(".prt-thum").html(), name: e.data("name"), effect: e.data("comment"), num: e.data("number"), limit: e.data("limit")};
        g.find(".prt-ability-detail").html(b.template(a("#tpl-ability-detail").html(), k));
        for (var l = 0; l < stage.pJsnData.player.param.length; l++) {
            var m = stage.pJsnData.player.param[l];
            if (!b.isUndefined(m)) {
                var n = f + " .prt-character .lis-character" + l, o = 2 === m.form && m.extra_attr > 0 ? m.extra_attr : m.attr;
                a(n + " .ico-type").removeClass(function (a, b) {
                    return(b.match(/ico-attribute-\d*/) || []).join(" ")
                }).addClass("ico-attribute-" + o);
                var p = parseInt(m.hp / m.hpmax * 100), q = 25 >= p ? "red" : "green", r = a(n + " .txt-hp-value"), s = a(n + " .prt-gauge-hp-inner");
                s.css("width", p + "%").attr({color: q}), r.html("" + m.hp).attr({color: q}), m.condition.hide_hp_flag ? r.addClass("hide-hp") : r.removeClass("hide-hp");
                var t = parseInt(m.recast / m.recastmax * m.recastmax);
                a(n + " .prt-gauge-special-inner").css("width", t + "%"), a(n + " .hideable").show(), 1 == m.leader ? a(n).children("img").attr("src", Game.imgUri + "/sp/assets/leader/raid_normal/" + m.pid_image + ".jpg") : a(n).children("img").attr("src", Game.imgUri + "/sp/assets/npc/raid_normal/" + m.pid_image + ".jpg"), b.indexOf(stage.pJsnData.formation, String(l)) < 0 || 0 == m.alive || m.hp < 1 || 4 != i && m.hp >= m.hpmax || 5 == i && l == stage.gGameStatus.pCharacterPos ? a(n).addClass("mask-black") : a(n).removeClass("mask-black")
            }
        }
        a(f).addClass("sub-selecter"), a(f).bind("hide", function () {
            g.find(".prt-ability-detail").html(j);
        }), a(f).show(), this.showMask()
    }, exeAbilitySubSelecter: function (c) {
        var d = a(c.currentTarget), e = d.attr("pos");
        b.indexOf(stage.pJsnData.formation, String(e)) < 0 || (stage.gGameStatus.ability_aim_num = e, this.popHideSelectMember(), this.StoreAttackQueue())
    }, popQuestRetire: function (c, d) {
        if (this.popView && this.popRemove(), !c.ap || "undefined" == typeof c.ap.before)return void d();
        var e = c.ap.before, f = c.ap.after, g = C.getMessage("raid_63"), h = C.replaceMessage("raid_64", [f - e, e, f]);
        c.start_bonus_revenge_action_param && c.start_bonus_revenge_action_param > 0 && (h += b.template(a("#tpl-revenge-bonus-pop-retire").html(), {revengeBonusParam: c.start_bonus_revenge_action_param, revengeBonusCount: c.start_bonus_revenge_count}));
        var i = new r({className: "pop-retire", title: g, body: h, flagBtnCancel: 0, flagBtnOk: 1});
        i.render(), i.popShow(), this.popView = i, a(".pop-retire .btn-usual-ok").addClass("btn-usual-questlist").removeClass("btn-usual-ok"), a(".pop-retire .btn-usual-questlist").on("tap", function () {
            d()
        })
    }, popRevengeBonus: function () {
        this.popView = new r({className: "pop-revenge-bonus", title: C.getMessage("revenge_bonus_1"), body: a("#tpl-pop-revenge-bonus").html(), flagBtnOk: 1}), this.popView.render().popShow()
    }, preemptiveAttack: function () {
        stage.gGameStatus.attacking = 1, this.activateMask();
        var b = a("body"), c = a(document).scrollTop();
        Game.ua.isJssdk() && (b = a("#mobage-game-container"), c = a("#mobage-game-container").parent().scrollTop()), a("body").hasClass("pc") || b.on("cgtouchstart", function (a) {
            a.preventDefault()
        }), c > 1 && window.scrollTo(0, 0), clearInterval(stage.gGameStatus.timer.mBalloon), a(".prt-sub-command>div").addClass("black");
        var d = this, e = new a.Deferred, f = d.playScenarios({scenario: stage.pJsnData.scenario});
        return f.done(function () {
            e.resolve()
        }), e
    }, getRaidType: function () {
        var a = "raid";
        switch (stage.pJsnData.is_multi) {
            case!0:
                a = stage.pJsnData.is_semi === !0 ? "semiraid" : "multiraid"
        }
        return a
    }, checkOauthTwitter: function (a) {
        a = a || {}, a.success = a.success || function () {
        }, a.error = a.error || function () {
        };
        var b = this, c = new (v.extend({urlRoot: Game.baseUri + "twitter/twitter_info/" + G + "/" + stage.pJsnData.twitter.battle_id + "/" + stage.pJsnData.twitter.enemy_id}));
        this.listenToOnce(c, "sync", function (c) {
            var d = c.toJSON();
            b.chromeAppFlag = !1, d.chromeapp && d.chromeapp.version && (b.chromeAppFlag = !0), d.chromeapp && d.chromeapp.error ? b.popupAttentionChromeApp(d.chromeapp) : d.twitter.screen_name ? a.success(d) : a.error(d)
        }), c.fetch()
    }, onPushTwitterIcon: function (a) {
        var b = this;
        b.checkOauthTwitter({success: function (a) {
            b.campaign_id = a.twitter.campaign_info.campaign_id, b.popTwitter(a)
        }, error: function (a) {
            b.campaign_id = a.twitter.campaign_info.campaign_id, b.popOauthTwitter()
        }})
    }, popTwitter: function (c) {
        var d = c.twitter, e = d.screen_name, f = d.default_message, g = d.forced_message.replace(/\/n/g, "<br>"), h = d.rest_tweet_mes_length;
        this.restCharaNum = h;
        var i = (d.campaign_info, "");
        this.popView = new r({className: "pop-status-check", title: C.getMessage("raid_65"), body: b.template(a("#tpl-pop-post-twitter").html(), {name: e, defaultText: f, addText: g, text: i, restCharaNum: h - f.length}), flagBtnCancel: 1, flagBtnOk: 1}), this.popView.render(), this.popView.$el.find(".pop-status-check .btn-usual-ok").removeClass().addClass("btn-tweet-post"), this.addEventTwitterTextArea(), this.popView.popShow()
    }, addEventTwitterTextArea: function () {
        var b = this, c = 13, d = 3, e = 1, f = a("#frm-post-tweet");
        f.keyup(function (a) {
            return b.textPostTweetPattern(f), a.keyCode == c ? !1 : void 0
        }), f.keypress(function (a) {
            return a.keyCode == c ? !1 : void 0
        }), f.focus(function (a) {
            f.attr("rows", d)
        }), f.focusout(function (b) {
            a(b.currentTarget).val() || f.attr("rows", e)
        })
    }, textPostTweetPattern: function (b) {
        var c = b.val().length, d = this.restCharaNum - c, e = a(".twitter-mes-counter"), f = 10, g = 0, h = 0 >= c ? 1 : 3, i = 0 >= c ? "" : d, j = "max", k = "disable";
        e.html(i), b.attr("rows", h), e.toggleClass(j, f >= d), a(".btn-tweet-post").toggleClass(k, g > d)
    }, popOauthTwitter: function () {
        var c = this, d = new (v.extend({urlRoot: Game.baseUri + "twitter/twitter_redirect"}));
        c.listenToOnce(d, "sync", function (d) {
            var e = d.toJSON();
            c.requestUrl = e.request_url, c.popView = new r({className: "pop-twitter-auth", title: C.getMessage("raid_66"), body: b.template(a("#tpl-pop-twitter-auth").html(), {}), flagBtnCancel: 1, flagBtnOk: 0}), c.popView.render(), c.popView.popShow()
        }), d.fetch()
    }, handleOnPushPostTwitterButton: function (a) {
        var b = this;
        this.checkAllowedRequestAssist(a, function () {
            b.onPushPostTwitterButton()
        })
    }, onPushPostTwitterButton: function () {
        var b = this, c = +this.restCharaNum, d = a("#frm-post-tweet").val().length;
        0 > c - d || this.postTwitter({comment: a("#frm-post-tweet").val(), message_id: null, raid_id: stage.pJsnData.twitter.raid_id, enemy_id: stage.pJsnData.twitter.enemy_id, battle_id: stage.pJsnData.twitter.battle_id, success: function (a) {
            b.popSuccessPostTwitter(a)
        }, error: function (a, c) {
            b.checkOauthTwitter({success: function (d) {
                b.popSelectOauthOrPost(d, a, c)
            }, error: function (a) {
                b.popOauthTwitter()
            }})
        }})
    }, popSuccessPostTwitter: function (a) {
        var b = this, c = C.getMessage("raid_67");
        b.popView = new r({className: "pop-success-post-twitter", title: C.getMessage("raid_68"), body: c, flagBtnCancel: 0, flagBtnOk: 1, showEndCallback: function () {
            o.playRecoverySE()
        }}), b.popView.render(), b.popView.popShow()
    }, popSelectOauthOrPost: function (c, d, e) {
        var f = c.twitter, g = f.screen_name, h = f.default_message, i = f.forced_message, j = f.rest_tweet_mes_length;
        this.restCharaNum = j;
        var k = (f.campaign_info, "");
        this.popView = new r({className: "pop-status-check", title: C.getMessage("raid_65"), body: b.template(a("#tpl-pop-re-post-twitter").html(), {name: g, defaultText: h, addText: i, text: k, restCharaNum: j - h.length}), flagBtnCancel: 1, flagBtnOk: 0}), this.popView.render(), this._addErrorCodePopup(d, e), this.addEventTwitterTextArea(), this.popView.popShow()
    }, _addErrorCodePopup: function (b, c) {
        var d = '<div class="txt-error-code">Error code:' + b + "<br>" + c + "</div>";
        a(".pop-status-check .txt-failed-post").append(d)
    }, postTwitter: function (a) {
        var b = new (s.extend({urlRoot: Game.baseUri + "twitter/tweet"}));
        this.listenToOnce(b, "sync", function (b) {
            var c = b.toJSON(), d = 2;
            c.result === d ? a.success(c.reward_status) : a.error(c.error_code, c.error_message)
        }), b.set({comment: a.comment}), b.set({message_id: a.message_id}), b.set({calling_id: G}), b.set({raid_id: a.raid_id}), b.set({enemy_id: a.enemy_id}), b.set({battle_id: a.battle_id}), b.save()
    }, onPushOauthButton: function () {
        this.openUrl(this.requestUrl)
    }, openUrl: function (a) {
        m.isShellApp() ? m.openBrowser(a) : this.chromeAppFlag ? location.href = a : window.open(a)
    }, onInputPinCode: function (c) {
        var d = a(c.currentTarget).val(), e = 7;
        return b.isNaN(+d) || d.length !== e ? void this.disableButton(a(".btn-oauth-pin")) : void this.enableButton(a(".btn-oauth-pin"))
    }, enableButton: function (a) {
        a.removeClass("disable")
    }, disableButton: function (a) {
        a.addClass("disable")
    }, checkPin: function (a) {
        var b = new (s.extend({urlRoot: Game.baseUri + "twitter/oauth"}));
        this.listenToOnce(b, "sync", function (b) {
            var c = b.toJSON(), d = 4;
            c.result === d ? a.success() : a.error(c.reseted)
        }), b.set({pin: a.pin}), b.save()
    }, onPushPinCodeButton: function (b) {
        if (!a(b.currentTarget).hasClass("disable")) {
            var c = this, d = a("#frm-pin").val() || "error";
            this.checkPin({pin: d, success: function () {
                c.popSuccessPin()
            }, error: function (b) {
                if (a(".prt-pin-error-text").css({display: "block"}), b) {
                    var d = new (v.extend({urlRoot: Game.baseUri + "twitter/twitter_redirect"}));
                    c.listenToOnce(d, "sync", function (a) {
                        var b = a.toJSON();
                        c.requestUrl = b.request_url
                    }), d.fetch(), a(".prt-pin-error-text").css({display: "none"}), a(".txt-popup-title").css({display: "none"}), a(".txt-popup-title-error").css({display: "block"}), c.disableButton(a(".btn-oauth-pin"))
                }
            }})
        }
    }, popSuccessPin: function () {
        this.popView = new r({className: "pop-success-pin", title: C.getMessage("raid_69"), body: C.getMessage("raid_70"), flagBtnCancel: 0, flagBtnOk: 1}), this.popView.render(), this.popView.$el.find(".btn-usual-ok").addClass("btn-assist"), this.popView.popShow()
    }, onPushSuccessPinPopButton: function () {
        this.popView.popRemove()
    }, onPushReOuthTwitterButton: function () {
        this.popOauthTwitter()
    }, popPcDisabled: function () {
        this.popView = new r({className: "pop-pc-disabled", title: C.getMessage("raid_71"), body: C.getMessage("raid_72"), flagBtnCancel: 0, flagBtnOk: 1}), this.popView.render().popShow()
    }, popRemoveDefault: function () {
        this.popView.popRemove()
    }, executeMessage: function (a, c, d) {
        c.nowait || (f.mWaitAll(a, {playtime: 2e3 * stage.gGameStatus.message_count}), a[2].timeline[0].call(function () {
            stage.gGameStatus.message_count++
        }));
        var e = b.chain(c.list).pluck("status").compact().uniq().value(), g = this;
        d ? g.loadStatusIcons(e, function () {
            g._executeMessage(a, c), d && d()
        }) : g._executeMessage(a, c)
    }, _executeMessage: function (a, c, d) {
        var e = this;
        "player" === c.to ? b.each(c.list, function (b) {
            var c = e.createOverheadMessageComponent(b, "player");
            a[2].timeline[0].call(function () {
                c.show()
            })
        }) : "boss" === c.to && b.each(c.list, function (b) {
            var c = e.createOverheadMessageComponent(b, "boss");
            a[2].timeline[0].call(function () {
                c.show()
            })
        })
    }, executeEffect: function (a, b) {
        var c = 0;
        if ("player" === b.to || "player_fullscreen" === b.to) {
            if (b.name && j.mBoss(a[2].timeline[0], {text: b.name, playtime: 24, delay: 0}), b.list.length > 0)for (var d = 0; d <= b.list.length - 1; d++)c = h.mEffect(a[0].timeline[b.list[d]], stage.gAryCntnAvatar[b.list[d]], b), "serial" === b.mode && f.mWaitAll(a, {playtime: c - 6}); else c = h.mEffect(a[2].timeline[0], stage.gPlayerContainer, b);
            "serial" === b.mode ? f.mWaitAll(a, {playtime: 6}) : "parallel" !== b.mode || b.nowait || f.mWaitAll(a, {playtime: c})
        }
        if ("boss" === b.to || "boss_fullscreen" === b.to) {
            if (b.name && j.mPlayer(a[2].timeline[0], {text: b.name, playtime: 24, delay: 0}), b.list.length > 0)for (var d = 0, e = b.list.length - 1; e >= d; ++d)c = h.mEffect(a[1].timeline[b.list[d]], stage.gAryCntnBoss[b.list[d]], {kind: b.kind, delay: b.delay, pos: b.list[d], to: b.to, list: b.list, cjs_param: b.cjs_param}), "serial" === b.mode && f.mWaitAll(a, {playtime: c - 6}); else c = h.mEffect(a[2].timeline[0], stage.gBossContainer, {kind: b.kind, delay: b.delay, pos: 0, to: b.to, list: b.list, cjs_param: b.cjs_param});
            "serial" === b.mode ? f.mWaitAll(a, {playtime: 6}) : "parallel" !== b.mode || b.nowait || f.mWaitAll(a, {playtime: c})
        }
    }, getHiddenWeapon: function (b) {
        var c = null, d = new (v.extend({urlRoot: Game.baseUri + this.getRaidType() + "/get_hiddenweapon"}));
        return d.set(b), d.on("sync", function (a) {
            c.resolve(a.toJSON())
        }), this.getHiddenWeapon = function () {
            return c = a.Deferred(), d.save(), c
        }, this.getHiddenWeapon()
    }, popQuestMessage: function (a) {
        this.popView && this.popRemove();
        var b = new r({className: "pop-quest-message", title: a.title, body: a.message, flagBtnCancel: 0, flagBtnOk: 1});
        b.render(), this.$el.find(".pop-quest-message .btn-usual-ok").addClass("location-href").attr("data-location-href", a.url), b.popShow(), this.popView = b
    }, locationHref: function (a) {
        var b = this.$el.find(a.currentTarget).data("location-href");
        this.content_close(), c.history.navigate(b, !0)
    }, UseTpRecover: function () {
        var c = this, d = stage.pJsnData;
        this.popUseTpRecoverConfirm(d).on("onOk", function () {
            if (c.checkPlayerAllDead(), w.remove("lose_pop_flg"), w.remove("cheer_compleate"), w.remove("cheer_effect_text"), stage.gAryRootParts[0][stage.gGameParam.cjs.parts[0]].gotoAndPlay("out"), stage.gGameStatus.node_finish || c.HideCommand(), !stage.gGameStatus.btn_lock) {
                stage.gGameStatus.btn_lock = !0, stage.gGameStatus.pop_limit = !0, c.popView.popClose(), c.hideMask(), a(".btn-revival").hide(), stage.gGameStatus.menu = "temporary", stage.gGameStatus.finish = !1;
                for (var e = ({raid_id: stage.pJsnData.raid_id}, b.clone(stage.pJsnData.player.param)), f = e.length, g = 0; f > g; g += 1) {
                    var h = e[g];
                    b.isUndefined(h) || (h.condition.hide_hp_flag = !1)
                }
                c.Attack("arcarum_recovery_use_tp", {raid_id: d.raid_id})
            }
        })
    }, popUseTpRecoverConfirm: function (c) {
        this.popView && this.popRemove();
        var d = new r({className: "pop-arcarum-recover", title: C.getMessage("arcarum_9"), body: b.template(a("#tpl-arcarum-recover").html(), {current_tp: c.arcarum.tp}), flagBtnCancel: 1, flagBtnOk: 1});
        return d.render(), c.arcarum.tp <= 0 && this.$el.find(".pop-arcarum-recover .btn-usual-ok").addClass("disable"), d.popShow(), this.popView = d, this.popView
    }, popTriggerOk: function () {
        !!this.popView && this.popView.trigger("onOk"), this.$el.find(".cnt-raid").trigger("onOk")
    }, checkDeadHandler: function () {
        popShowithdraw
    }, getLupiFlip: function (b) {
        var c = null, d = new (v.extend({urlRoot: Game.baseUri + this.getRaidType() + "/get_lupiflip"}));
        return d.set(b), d.on("sync", function (a) {
            c.resolve(a.toJSON())
        }), this.getLupiFlip = function () {
            return c = a.Deferred(), d.save(), c
        }, this.getLupiFlip()
    }, popInfoMessage: function (a) {
        this.popView && this.popRemove();
        var b = new r({className: "pop-info-message", title: a.title, body: a.message, flagBtnCancel: 0, flagBtnOk: 1});
        return b.render().popShow(), this.popView = b, this.popView
    }});
    return Oa
});