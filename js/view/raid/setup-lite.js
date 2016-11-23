define(["jquery","underscore","backbone","view/content","model/raid/setup", "model/sound","model/cjs-loader","model/manifest-loader","util/sprite-sheet-manager","view/raid/ui","lib/raid/motion","lib/raid/draw","lib/raid/timeline","lib/raid/effect"],function ($,_,backbone,contentView,setupRaidModel,soundModel,cjsLoaderModel,manifestLoaderModel,spriteSheetManagerUtil,uiRaidView,motionControl,drawControl,timelineControl,effectControl) {
    var XHR_START = "xhrStart";
    var R = ["70670", "70950", "80000"];
    var Q = "7001";
    var GAME_PARAMS = function () {
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
    };
    var GAME_STATUS = function () {
        return{
            lock: 0,
            target: 0,
            attacking: 0,
            replacehit: [],
            waitmode: ["wait", "wait", "wait"],
            balloon: "wait", finish: !1, retire: !1, lose: !1, clear: !1, motion: !1, menu: !1, attack_action: null, last_drop: null, raid_union_summon_name: "",
            is_summon_simple: "", message_count: 0, tutorial_state: !1, rep: 0, btn_lock: !1, defaultmotion: "stbwait", dropped: [], attack_count: 0, $use_ability: null,
            already_finish: !1, node_finish: !1, cheer_compleate: !1, is_clear: !1, serif: 1, ability_popup: 1, ability_pick: null, ability_sub_param: [], pop_limit: !1,
            pop_revival: !1, battle_end: !1, is_normal_attack: !1, auto_attack: !1, enable_auto_button: !1, auto_button: !0, chat_category: 1, stamp_page: 0,
            key_enemy_dead: !1, union_enemy: !1, player: {param: [], condition: [], number: 0, all_dead: !1}, boss: {param: [], condition: [], last_die: null,
                all_dead: !1, form_change_tween: !1}, field: {hasFieldEffect: !1}, defend_order: {hasAssistUnitEffect: !1}, timer: {}, action: {ab_select: ""},
            assist: {all: 1, friend: 1, guild: 1}, temporary: {small: 0, large: 0}, potion: {count: 0, limit_flg: !1, limit_number: 0, limit_remain: 0}, command_slide: {state: 0, now_pos: 0}, bossmode: {looks: {mode: [], gauge: []}, already_changed: []}, finishAfterContribution: !1, is_escorted_character_dead: 0, isVersusView: !1, isShowBossGauge: !0, logtimer: 0, motion_lock: !1, shouldReAuth: !1, remain_turn: 0, hide_ability_pos: void 0, isDrawBgImgByCjs: !1, backImage: [], backImageValue: [], isBackImageUpdated: !1, preemptiveDeferred: null, cutinDeferred: null, attackQueue: {index: [], param: [], $useAbility: [], $useAbilityTmp: null, attackButtonPushed: !1, abilityRailUI: null, charaChangeFlag: !1}, form_change_frame: {}}
    };
    Ka = {s: {s1: [
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
    ]}};
    var defaultCharacterImg  = Game.imgUri + "/sp/assets/npc/raid_normal/3999999999.jpg";
    var RAID_CONS_CJS = ["ab_0004", "ab_3000", "ab_all_3020", "ab_start", "raid_win", "quest_clear", "quest_failed", "raid_union_summon", "treasure_get", "item_get", "raid_parts_attack", "raid_parts_back", "raid_parts_turn", "raid_parts_next", "raid_cutin", "raid_cutine", "raid_reload", "raid_chain", "raid_effect_heal", "raid_effect_buff", "raid_effect_debuff", "ab_all_70", "raid_parts_auto", "ab_enemy_action", "ef_all_2000", "ef_2000"];
    RAID_CONS_CJS = [];
    var view = contentView.extend({
        el: $(".contents"),
        stage: null,
        baseFps: 12,
        currentFps: 12,
        attackCount: 20,
        use_ap: null,
        popScrollHeightDelta: 0,
        initialize: function (params) {
            var _this = this;
            this.content_bind(),
                this.trigger(XHR_START);
            var raidModel = new setupRaidModel;
            var params = params;
            raidModel.preSave(false, params, {url: raidModel.urlRoot(params.action, params.mode, params.is_multi, params.is_semi),
                silent: !0,
                error: function (e) {
                },
                success: function () {
                    var json = raidModel.toJSON();
                    //soundModel.loadBGM(json.bgm);
                    //soundModel.playBGM('/Astral/sound/bt.mp3');
                    //soundModel.playSuccessSE();


                    var allReadyPromise = new $.Deferred;

                    var preparePromise = new $.Deferred;
                    $.when(allReadyPromise).done(function () {
                        _this.render(params);
                    })
                    if(json.bgm){

                    };
                    var n = _.some(R, function (a) {
                        return a == json.location_id
                    });
                    _this.prepareLoading(json, n, function () {
                        console.l('prepareLoading compelte');
                        preparePromise.resolve()
                    });
                    var loadCJSPromise = new $.Deferred, loadSpriteSheetPromise = new $.Deferred;
                    $.when(preparePromise).done(function(){

                        _this.loadCJS(json, n, function () {
                                 loadCJSPromise.resolve(),
                                     $.when(loadCJSPromise).done(function () {
                                        _this.loadSpriteSheet(function () {
                                            loadSpriteSheetPromise.resolve()
                                         })
                                    })
                        })
                    });
                    var resourcePromise = new $.Deferred;
                    $.when(loadCJSPromise,loadSpriteSheetPromise).done(function(){
                        //TODO animate preloading
                        resourcePromise.resolve();
                    });
                    $.when(resourcePromise).done(function () {
                        console.info('init');

                        var canvasEle  = document.getElementById("canvas");

                        if(canvasEle != null) {

                            stage = new createjs.Stage(canvasEle);
                            //stage.clear();

                            createjs.Ticker.setFPS(_this.currentFps),
                            createjs.Ticker.addEventListener("tick", stage);

                            stage.pJsnData = json,
                                stage.gMasterContainer = new createjs.Container,
                                stage.gPlayerContainer = new createjs.Container,
                                stage.gBossContainer = new createjs.Container,
                                stage.gPartsContainer = new createjs.Container,
                                stage.gAryRootAvatar = [],
                                stage.gAryCntnAvatar = [],
                                stage.gAryRootBoss = [],
                                stage.gAryCntnBoss = [],
                                stage.gAryRootParts = [],
                                stage.gAryCntnParts = [],
                                stage.gAryInterval = [],
                                stage.setup = _this,
                                stage.gGameParam = _.defaults({fps: _this.currentFps, spf: Math.round(1e3 / _this.currentFps * 100) / 100}, GAME_PARAMS()),
                                stage.gGameStatus = _.defaults({turn: json.turn, reload_flg: params.reload_flg || !1},GAME_STATUS()),
                                stage.gGameStatus.isVersusView = n;
                                //stage.gGameStatus.isVersusView ? R[0] == json.location_id ? json.arcade && json.arcade.is_bonus ? (stage.gGameParam.cjs.win = stage.gGameParam.cjs.quest_clear = stage.gGameParam.cjs.bonus_stage_quest_clear, stage.gGameParam.cjs.quest_failed = stage.gGameParam.cjs.bonus_stage_quest_failed, stage.gGameStatus.remain_turn = +d.arcade.bonus_maxtrun - +d.turn + 1) : (stage.gGameParam.cjs.win = stage.gGameParam.cjs.quest_clear = stage.gGameParam.cjs.arcade_quest_clear, stage.gGameParam.cjs.quest_failed = stage.gGameParam.cjs.arcade_quest_failed) : d.is_survival ? (stage.gGameParam.cjs.win = stage.gGameParam.cjs.quest_clear = stage.gGameParam.cjs.sfv_congratulations, stage.gGameParam.cjs.quest_failed = stage.gGameParam.cjs.sfv_game_over) : (stage.gGameParam.cjs.win = stage.gGameParam.cjs.quest_clear = stage.gGameParam.cjs.sfv_quest_clear, stage.gGameParam.cjs.quest_failed = stage.gGameParam.cjs.sfv_quest_failed) : d.is_trialbattle && (stage.gGameParam.cjs.quest_failed = stage.gGameParam.cjs.trialbattle_game_end), stage.gGameStatus.summon_speed = d.summon_speed;
                                var j = stage.gGameParam, k = stage.gGameStatus;
                                var gGameStatus = stage.gGameStatus;
                            _.each(json.boss.param, function (bossParam, index) {
                                stage.gGameStatus.bossmode.looks.mode[index] = bossParam.modechange,
                                    stage.gGameStatus.bossmode.looks.gauge[index] = bossParam.modegauge,
                                    stage.gGameStatus.bossmode.already_changed[index] = !1,
                                    (_.isUndefined(bossParam.message_position) || "" === bossParam.message_position.x) && (stage.pJsnData.boss.param[index].message_position = {x: stage.gGameParam.grid.message.boss[json.boss.type].x, y: stage.gGameParam.grid.message.boss[json.boss.type].y}),
                                    stage.pJsnData.boss.param[index].damage_position_plus ? ("" === stage.pJsnData.boss.param[index].damage_position_plus.x && (stage.pJsnData.boss.param[index].damage_position_plus.x = stage.gGameParam.grid.damage_position_plus.boss[json.boss.type].x),
                                        "" === stage.pJsnData.boss.param[index].damage_position_plus.y && (stage.pJsnData.boss.param[index].damage_position_plus.y =stage.gGameParam.grid.damage_position_plus.boss[json.boss.type].y)) : stage.pJsnData.boss.param[index].damage_position_plus = {x: stage.gGameParam.grid.damage_position_plus.boss[json.boss.type].x, y: stage.gGameParam.grid.damage_position_plus.boss[json.boss.type].y}
                            });
                            stage.gGameStatus.lock = _.isUndefined(json.special_skill_flag) ? 0 : parseInt(json.special_skill_flag),
                                stage.gGameStatus.shouldReAuth = json.is_semi && json.event_id_of_semi == Q;
                            //var l = $.extend(!0, {}, stage.pJsnData);
                            var pJsnData = $.extend(!0, {}, stage.pJsnData);
                            stage.pJsnData.player.number = stage.pJsnData.player.number || stage.pJsnData.player.param.length;
                            stage.gGameStatus.player.number = stage.pJsnData.player.number - 1 <= 3 ? stage.pJsnData.player.number - 1 : 3;
                            console.info(stage.gGameStatus.player.number);
                            for (var o = 0, p = gGameStatus.player.number; p >= o; ++o)gGameStatus.player.param.push(pJsnData.player.param[pJsnData.formation[o]]);
                            gGameStatus.is_escorted_character_dead = json.is_escorted_character_dead,
                            //_this.checkPlayerAllDead()
                            $('[class^="lis-character"]').find("img").attr("src", defaultCharacterImg);
                            for (var o = 0, p = stage.pJsnData.boss.param.length; p > o; ++o)gGameStatus.boss.param.push(pJsnData.boss.param[o]);
                            if (stage.pJsnData.battle.count > 1)for (var o = 0, p = game.gGameParam.grid.player.length; p > o; ++o)game.gGameParam.grid.player[o].x += game.gGameParam.relative.offscreen.player;
                            gGameStatus.defaultmotion = 1 == stage.pJsnData.battle.count && 1 == gGameStatus.turn ? "wait" : "stbwait",
                                "l" === json.boss.type && json.boss.param.length >= 2 && (game.gGameStatus.union_enemy = !0);
                            stage.gGameStatus.preemptiveDeferred = new $.Deferred,
                                stage.gGameStatus.cutinDeferred = new $.Deferred,
                                stage.gGameStatus.backImage.push(new createjs.Bitmap(Game.imgUri + stage.pJsnData.background)),
                                _.each(stage.pJsnData.background_image_object, function (bgImg, index) {
                                stage.gGameStatus.isBackImageUpdated = !0, stage.gGameStatus.backImage.push(new createjs.Bitmap(Game.imgUri + bgImg)),
                                    stage.gGameStatus.backImageValue.push(index)
                            }),
                                    stage.gGameStatus.isDrawBgImgByCjs === !0 ? stage.addChild(stage.gGameStatus.backImage[0]) : $(".prt-bg-stage-distant").css("background-image", "url(" + Game.imgUri + stage.pJsnData.background + ")"),
                                //_this.TutorialPreRender(),
                                /*_this.rareEnemyAppearEffectDeferred = new a.Deferred,
                                    1 == stage.pJsnData.battle.count && stage.pJsnData.is_rare ? setTimeout(function () {
                                a(".prt-start-direction").css("display", "none"), a("#opaque-mask").hide(), a(".prt-rare-direction").show().addClass("anim-rare-direction").oneAnimationEnd(function () {
                                    a(this).hide(), e.rareEnemyAppearEffectDeferred.resolve()
                                }, 1600)
                            }, 1500) : e.rareEnemyAppearEffectDeferred.resolve();*/
                            1 == json.multi && json.is_semi === !1 && (stage.gGameStatus.auto_button = !1),
                                wa = stage.gEnemyStatus = [];

                            var r = json.boss.type + json.boss.number,
                                s = Ka[json.boss.type][r],
                                t = (La[json.boss.type][r], json.overdrive_image),
                                u = json.is_semi;
                            _.each(json.boss.param, function (bossParam, index) {
                                var f, g = bossParam.cjs.split("_")[1];

                                bossParam.enemy_id = g,
                                    bossParam.overdrive_image = t,
                                    bossParam.is_semi = u,
                                    bossParam.switching_hp_gauge = json.switching_hp_gauge || !1,
                                    bossParam.condition = _.defaults(bossParam.condition, {debuff: [], buff: []}),
                                    stage.gGameStatus.union_enemy && (bossParam.type = "s"),
                                    f = wa[index] = new uiRaidView.components.EnemyStatus(_this.spriteSheetManager.getById("raid_ui_0"),
                                        bossParam, index, pJsnData.disp_hp_percent_disp),
                                    f.x = s[index].x,
                                    f.y = s[index].y,
                                        "l" === bossParam.type ? _this.$el.find(".prt-percent[target=" + (index + 1) + "]").addClass("enemy-size-l") : 0 !== parseInt(bossParam.modeflag, 10) && _this.$el.find(".prt-percent[target=" + (index + 1) + "]").addClass("has-mode-gauge")
                            });


                        }
                        allReadyPromise.resolve();
                    })
                    //1 == d.invite_enable && e.activateMask();

                }
            });

        }, events: {"click .attack-btn": "Attack"},
        Attack:function () {

            var action = "normal_attack_result";
            var _this = this;
            var raidModel = new setupRaidModel;
            raidModel.preSave(false, {}, {
                url: raidModel.urlRoot(action, "on",false, false),
                silent: !0,
                error: function () {
                },
                success: function (json) {
                    var json = raidModel.toJSON();
                    var u = stage.gAryCntnAvatar.length, v = stage.gAryCntnBoss.length;
                    for (_this.avatarTimeLineArray = avatarTimeLineArray = timelineControl.mInit("avatar"), s = 0, t = u; t > s; s++)
                        avatarTimeLineArray.timeline[s] = createjs.Tween.get(stage.gAryCntnAvatar[s], {override: !0,paused: !0});
                    for (_this.bossTimeLineArray = bossTimeLineArray = timelineControl.mInit("boss"), s = 0, t = v; t > s; s++)
                        bossTimeLineArray.timeline[s] = createjs.Tween.get(stage.gAryCntnBoss[s], {override: !0,paused: !0});
                    _this.commonTimeLineArray = commonTimeLineArray = timelineControl.mInit('common');
                    commonTimeLineArray.timeline[0] = createjs.Tween.get({}, {override: !0,paused: false});
                    _this.oTweenCommon = commonTimeLineArray;
                    _this.play(json,avatarTimeLineArray,bossTimeLineArray,commonTimeLineArray);
                }});

        },
        play:function(json,avatarTimeLineArray,bossTimeLineArray,commonTimeLineArray){
            var scenario = json.scenario;
            var _this = this;



            for(var i=0;i<scenario.length;i++){
                var scenarioUnit = scenario[i];
                switch (scenarioUnit.cmd){
                    case "attack":
                        if(scenarioUnit.from == 'player') {
                            motionControl.mWaitAll([_this.avatarTimeLineArray,_this.bossTimeLineArray, _this.commonTimeLineArray], {playtime:1});
                            var durTime = motionControl.mChangeMotion(_this.avatarTimeLineArray.timeline[scenarioUnit.pos],{
                                motion:'attack',
                                pos: scenarioUnit.pos,
                                type:'player',
                                voice:null
                            });

                                motionControl.mWaitAll([_this.avatarTimeLineArray,_this.bossTimeLineArray, _this.commonTimeLineArray], {playtime:durTime});
                                motionControl.mChangeMotion(_this.avatarTimeLineArray.timeline[scenarioUnit.pos],{
                                    motion:'stbwait',
                                    pos: scenarioUnit.pos,
                                    type:'player',
                                    voice:null
                                });



                        } else {

                        }

                };
                var timelineList = [];
                timelineList.push(new createjs.Timeline([].concat(avatarTimeLineArray.timeline, bossTimeLineArray.timeline, commonTimeLineArray.timeline), {start: 0}, {useTicks: !0, paused: !0}));
                for (var s = 0, t = timelineList.length; t > s; s++)timelineList[s].setPaused(!1);

            }
        },
       render:function(params){

            var _this = this,
                gGameParam = stage.gGameParam,
                gGameStatus = stage.gGameStatus,
                pJsnData =  stage.pJsnData;
                stage.gMasterContainer.addChild(stage.gPlayerContainer),
                stage.gAryRootAvatar = drawControl.mAdd(gGameStatus.player.param),
                stage.gAryCntnAvatar = drawControl.mSet(pJsnData.player, stage.gAryRootAvatar, gGameParam, stage.gPlayerContainer),
                //1 == pJsnData.tutorial_flag && stage.gAryRootAvatar.length >= 2 && n.swapChildrenAt(1, 0),
                drawControl.mShow(stage.gAryCntnAvatar, pJsnData.player.param),

                stage.gMasterContainer.addChild(stage.gBossContainer),
                stage.gAryRootBoss = drawControl.mAdd(gGameStatus.boss.param),
                stage.gAryCntnBoss =drawControl.mSet(pJsnData.boss, stage.gAryRootBoss, gGameParam, stage.gBossContainer),
                drawControl.mShow(stage.gAryCntnBoss, pJsnData.boss.param),
                stage.gBossContainer.swapChildrenAt(2, 1),


                stage.addChild(stage.gMasterContainer),
                    stage.gMasterContainer.setChildIndex(stage.gBossContainer, 0),
                    stage.gMasterContainer.setChildIndex(stage.gPlayerContainer, 1);
;
              var o = this;
               /* _.each(wa, function (a) {
                    stage.addChild(a)
                }),
                _.each(gGameParam.cjs.parts, function (a) {
                    stage.gAryRootParts.push(new lib[a])
                });*/

            for (var p = stage.gAryRootParts,
                     q = stage.gAryCntnParts,
                     r = gGameParam.grid,
                     s = 0,
                     t = p.length; t > s; s++) {
                        q[s] = new createjs.Container,
                            q[s].addChild(p[s]),
                            stage.gPartsContainer.addChild(q[s]),
                            q[s].x = r.parts[gGameParam.cjs.parts[s]].x,
                            q[s].y = r.parts[gGameParam.cjs.parts[s]].y,
                            q[s].visible = false;
            }
            //(stage.gPartsContainer);

           var u = stage.gAryCntnAvatar.length, v = stage.gAryCntnBoss.length;
           for (_this.avatarTimeLineArray = avatarTimeLineArray = timelineControl.mInit("avatar"), s = 0, t = u; t > s; s++)
               avatarTimeLineArray.timeline[s] = createjs.Tween.get(stage.gAryCntnAvatar[s], {override: !0,paused: !0});
           for (_this.bossTimeLineArray = bossTimeLineArray = timelineControl.mInit("boss"), s = 0, t = v; t > s; s++)
               bossTimeLineArray.timeline[s] = createjs.Tween.get(stage.gAryCntnBoss[s], {override: !0,paused: !0});
           _this.commonTimeLineArray = commonTimeLineArray = timelineControl.mInit('common');
           commonTimeLineArray.timeline[0] = createjs.Tween.get({}, {override: !0,paused: false});
             _this.oTweenCommon = commonTimeLineArray;

            motionControl.mWaitAll([avatarTimeLineArray, bossTimeLineArray, commonTimeLineArray], {playtime: 1}), commonTimeLineArray.timeline[0].call(function() {
                console.info(-9999)
            for (var a = 0, b = u; b > a; a++)
            stage.gAryCntnAvatar[a].x -= 9999;
                console.info(9999)

            }),
            motionControl.mWaitAll([avatarTimeLineArray, bossTimeLineArray, commonTimeLineArray], {playtime: 1}), commonTimeLineArray.timeline[0].call(function() {
            for (var a = 0, b = u; b > a; a++)
            stage.gAryCntnAvatar[a].x += 9999
            });

           motionControl.mChangeMotionAll(stage.gAryRootAvatar, avatarTimeLineArray.timeline, {
               motion: "setup",mc: gGameStatus.player.param,type: "player",is_alive: "on",wait: 10
           });
           motionControl.mWaitAll([avatarTimeLineArray, bossTimeLineArray, commonTimeLineArray], {playtime: 1});
           motionControl.mChangeMotionAll(stage.gAryRootAvatar, avatarTimeLineArray.timeline, {
               motion: "stbwait",mc: gGameStatus.player.param,type: "player",is_alive: "on",wait: 10
           });
        /*   motionControl.mChangeMotionAll(stage.gAryRootAvatar, avatarTimeLineArray.timeline, {
               motion: "attack",
               mc: gGameStatus.player.param,
               type: "player",
               is_alive: "on",wait: 100
           });
           motionControl.mChangeMotionAll(stage.gAryRootAvatar, avatarTimeLineArray.timeline, {
               motion: "stbwait",
               mc: gGameStatus.player.param,
               type: "player",
               is_alive: "on",wait: 700
           });*/

           motionControl.mChangeMotionAll(stage.gAryRootBoss, bossTimeLineArray.timeline, {motion: "wait",mc: gGameStatus.boss.param,type: "boss",is_alive: "on",wait: 8});
           var timelineList = [];
           timelineList.push(new createjs.Timeline([].concat(avatarTimeLineArray.timeline, bossTimeLineArray.timeline, commonTimeLineArray.timeline), {start: 0}, {useTicks: !0, paused: !0}));
           for (var s = 0, t = timelineList.length; t > s; s++)timelineList[s].setPaused(!1);
           //motionControl.mWaitAll([_this.avatarTimeLineArray,_this.bossTimeLineArray, _this.commonTimeLineArray], {playtime:5000});








        },

        loadCJS: function (json, c, callback) {
            var resourceList = [].concat(RAID_CONS_CJS);
            /*if(c){
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
            }*/
            //c ? e = R[0] == a.location_id ? a.arcade && a.arcade.is_bonus ? b.union(e, Ea) : b.union(e, Da) : a.is_survival ? b.union(e, Ga) : b.union(e, Fa) : a.is_trialbattle && (e = b.union(e, Ha)),
                _.each(json.player.param, function (player) {
                    resourceList.push(player.cjs),
                        resourceList.push(player.effect)
            }), _.each(json.boss.param, function (boss) {
                    resourceList.push(boss.cjs), resourceList.push(boss.effect)
            }), _.isUndefined(json.is_boss) || "" == json.is_boss || resourceList.push(json.is_boss),
                    cjsLoaderModel.loadFiles(resourceList),
                    cjsLoaderModel.once("complete", function () {
                        console.info('cjs done')
                var manifestList = _.flatten(_.map(resourceList, function (obj) {
                    return cjsLoaderModel.manifest(obj)
                }));
                _.each(json.weapon, function (weapon, index) {
                    var object = _.find(manifestList, function (target) {
                        return target.id == index
                    }), imgUrl = Game.imgUri + "/sp/cjs/" + weapon + ".png";
                    object ? object.src = imgUrl : manifestList.push({id:index, src: imgUrl})
                }), manifestLoaderModel.once("complete", function () {
                    callback()
                }), manifestLoaderModel.loadManifest(manifestList, !0)
            })
        }, loadSpriteSheet: function (callback) {
           var gameVersion = Game.version ? "?version=" + Game.version : "";
            this.spriteSheetManager = new spriteSheetManagerUtil([
                {id: "raid_ui_0", src: uiRaidView.utils.getImagePath() + "atlas/raid_ui_0.json" + gameVersion}
            ]), this.spriteSheetManager.addEventListener("complete", function () {
                callback();
            }), this.spriteSheetManager.load()

        },
        prepareLoading: function (json,R,callback) {
                callback();
        }
    });
    return view;
})