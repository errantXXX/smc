
define('lib/raid/destroy', ["underscore"], function(underscore) {
    var object = {
        mSetInterval: function() {
           // var b = window.stage;

        var gameStage = window.stage;
            gameStage && gameStage.gGameStatus && underscore.each(b.gGameStatus.timer, function(timer) {
            clearInterval(timer)
        })
    },mCreateJS: function() {
        var gameStage = window.stage;
        null != gameStage && (createjs.Ticker.removeEventListener("tick",gameStage), createjs.Ticker.removeEventListener("tick", gameStage.funcUpdate), "undefined" != typeof gameStage.gAryCntnAvatar && (underscore.each(gameStage.gAryCntnAvatar, function(container) {
            container.removeAllChildren()
        }), gameStage.gAryCntnAvatar = null, gameStage.gAryRootAvatar = null), "undefined" != typeof gameStage.gAryCntnBoss && (underscore.each(gameStage.gAryCntnBoss, function(contaienr) {
            contaienr.removeAllChildren()
        }), gameStage.gAryCntnBoss = null, gameStage.gAryRootBoss = null), "undefined" != typeof gameStage.gBossContainer && (gameStage.gBossContainer = null), "undefined" != typeof gameStage.gPlayerContainer && (gameStage.gPlayerContainer = null), "undefined" != typeof gameStage.gMasterContainer && (gameStage.gMasterContainer = null))
    }};
    return object
});
/**
 * Data Loader Model to obscure Ajax
 */
define('model/data-loader', ["jquery", "underscore", "backbone", "util/backbone-singleton"], function($/*a*/, _/*b*/, backbone/*c*/) {
    var d = {};
    vare = c.Model.extend(
        {
        clear: function(model) {
                model ?_.has({}, model) && delete d[model] : d = {}
        },
        load: function(c, e) {
            var f = this;
            if (e = e || {}, e = b.defaults(e, {cache: !0}), e.cache && b.has(d, c))
                return e.success && e.success.call(f, d[c]), f.trigger("complete"), (new a.Deferred).resolve().promise();
            var g = new a.Deferred;
            return a.ajax({url: Game.baseUri + c,cache: !1,success: function(a) {
                e.success && e.success.apply(f, arguments), e.cache && (d[c] = a), g.resolve(), f.trigger("complete")
            },error: function() {
                e.error && e.error.apply(f, arguments), g.reject()
            }}), g.promise()
        }
        });
    return e.makeSingleton(["load", "clear", "on", "off", "once"]), e
});
define('model/sound', ["jquery", "underscore", "backbone", "constant", "lib/sound", "model/data", "model/data-loader", "util/local-storage"], function(a, b, c, d, e, f, g, h) {
    var i = "silent", j = "se/btn_se/btn_se_03.mp3", k = [{se: i,classes: ["prt-silent-se", "btn-silent-se", "btn-help-topic-title", "btn-command-forward"]}, {se: "se/queststart_se_1.mp3",classes: ["se-quest-start"]}, {se: "se/target_se_1.mp3",classes: ["btn-targeting"]}, {se: "se/book_open_se_1.mp3",classes: ["btn-story", "btn-archive-list", "btn-library"]}, {se: "se/stamp_se_1.mp3",classes: ["btn-stamp-ok"]}, {se: "se/btn_se/btn_se_02.mp3",classes: ["btn-usual-cancel", "btn-usual-text-cancel", "btn-usual-cancel-small", "btn-usual-close", "btn-head-close", "btn-deck-cancel", "btn-cancel", "btn-close", "btn-help-close", "btn-command-back", "btn-log", "btn-ability-unavailable", "btn-summon-unavailable", "btn-tutorial-disable", "btn-play uncleared"]}, {se: "se/menu_open_se_1.mp3",classes: ["btn-head-pop", "btn-open"]}, {se: "se/menu_close_se_1.mp3",classes: ["btn-head-close"]}, {se: "se/btn_se/btn_se_04.mp3",classes: ["se-start", "btn-result", "btn-start", "btn-tutorial-start"]}, {se: "se/btn_se/btn_se_05.mp3",classes: ["btn-attack-start"]}, {se: "se/btn_se/btn_se_01.mp3",classes: ["se-ok", "btn-select-baloon", "btn-usual-ok"]}, {se: j,classes: ["btn-shine", "btn-ability-available", "btn-summon-available", "btn-archive-item", "btn-treasure-item"]}], l = [{se: "se/sell_se_1.mp3",classes: ["pop-sell-result"]}], m = c.Model.extend({loadSound: function(a, b) {
        return b = b || {}, e.loadFile(a, b)
    },loadBGM: function(a, b) {
        return b = b || {}, b.alias = b.alias || d.BGM_ALIAS, this.loadSound(a, b)
    },loadSE: function(a, b) {
        return b = b || {}, b.alias = b.alias || d.SE_ALIAS, this.loadSound(a, b)
    },loadVoice: function(a, b) {
        return b = b || {}, b.alias = b.alias || d.VOICE_ALIAS, this.loadSound(a, b)
    },playSound: function(a, c) {
        c = c || {};
        var d;
        c.force && e.setup(!0), c.alias ? (d = c.loop ? e.setAliasAndRepeat : e.setAliasAndPlay, d = b.partial(d, a, c.alias, b.omit(c, "alias"))) : (d = c.loop ? e.repeat : e.play, d = b.partial(d, a, c)), c.force ? e.setup(!0).done(d) : d()
    },playBGM: function(a, b) {
        return b = b || {}, b.alias = b.alias || d.BGM_ALIAS, b.loop = !0, b.force && (b.force = !1, delete b.force), this.playSound(a, b)
    },playSE: function(a, b) {
        return b = b || {}, b.alias = b.alias || d.SE_ALIAS, this.playSound(a, b)
    },playVoice: function(a, b) {
        return b = b || {}, b.alias = b.alias || d.VOICE_ALIAS, this.playSound(a, b)
    },stopBGM: function(a) {
        a ? e.stop(a) : e.stop(d.BGM_ALIAS)
    },stopSE: function(a) {
        a ? e.stop(a) : (e.stop(d.SE_ALIAS), e.stop(d.SE_SAMPLE_ALIAS))
    },stopVoice: function(a) {
        a ? e.stop(a) : (e.stop(d.VOICE_ALIAS), e.stop(d.VOICE_SAMPLE_ALIAS))
    },unsetBGM: function(a) {
        e.unsetAlias(a || d.BGM_ALIAS)
    },unsetSE: function(a) {
        e.unsetAlias(a || d.SE_ALIAS)
    },unsetVoice: function(a) {
        e.unsetAlias(a || d.VOICE_ALIAS)
    },isPlayingBGM: function(a) {
        return e.isPlaying(a || d.BGM_ALIAS)
    },isPlayingSE: function(a) {
        return e.isPlaying(a || d.SE_ALIAS)
    },isPlayingVoice: function(a) {
        return e.isPlaying(a || d.VOICE_ALIAS)
    },setPlayingVoice: function(a) {
        return e.setPlaying(d.VOICE_ALIAS, a)
    },_getLocationId: function(a) {
        var b = this;
        return (new (f.extend({urlRoot: window.Game.baseUri + "user/location_id"}))).fetch({ignoreError: !0}).done(function(c) {
            a && a.call(b, c)
        })
    },_getPreLocationId: function(a) {
        var b = this;
        return (new (f.extend({urlRoot: window.Game.baseUri + "user/pre_location_id"}))).fetch({ignoreError: !0}).done(function(c) {
            a && a.call(b, c)
        })
    },_getShipId: function(a, b) {
        var c = this;
        return (new (f.extend({urlRoot: window.Game.baseUri + "guild_airship/ship_type" + (a ? "/" + a : "")}))).fetch({ignoreError: !0}).done(function(a) {
            b && b.call(c, a)
        })
    },_getJukebox: function(a, b) {
        var c = this;
        return (new (f.extend({urlRoot: window.Game.baseUri + "guild_airship/bgm_file" + (a ? "/" + a : "")}))).fetch({ignoreError: !0}).done(function(a) {
            b && b.call(c, a)
        })
    },_getSoundData: function(a, c, d) {
        var e = this;
        return b.isFunction(c) && (d = c, c = null), g.load(a, {success: function(a) {
            if (d) {
                var f = a.data;
                b.isObject(f) && !b.isArray(f) && (f = f[c]), b.isArray(f) && (f = f[b.random(f.length - 1)]), d.call(e, f)
            }
        }})
    },playTownBGM: function(a) {
        var b = this;
        if (a)
            return b._getSoundData("sound/town_bgm?data=" + a, a, function(a) {
                b.playBGM(a)
            });
        if (h.isSupported()) {
            var c = h.get("mypage_char_bgm");
            if (c && "default" != c)
                return void b.playBGM("bgm/" + c)
        }
        return b._getLocationId(function(a) {
            a && b.playTownBGM(a)
        })
    },playQuestMapBGM: function(a, c) {
        var d = this;
        if ("normal" === a)
            return d._getPreLocationId(function(a) {
                a && d.playQuestMapBGM(a, c)
            });
        if (a) {
            var e = b.filter([a ? "location_id=" + a : null, c ? "quest_id=" + c : null], b.identity).join("&");
            return d._getSoundData("sound/quest_map_bgm?" + e, function(a) {
                d.playBGM(a)
            })
        }
        return d._getLocationId(function(a) {
            a && d.playQuestMapBGM(a, c)
        })
    },playQuestSupporterBGM: function(a, c) {
        var d = this;
        if (a) {
            var e = b.filter([a ? "location_id=" + a : null, c ? "quest_id=" + c : null], b.identity).join("&");
            return d._getSoundData("sound/quest_supporter_bgm?" + e, function(a) {
                d.playBGM(a)
            })
        }
        return d._getLocationId(function(a) {
            a && d.playQuestSupporterBGM(a, c)
        })
    },playShipBGM: function(a, b) {
        var c = this;
        return a ? c._getSoundData("sound/ship_bgm?data=" + a, a, function(a) {
            c.playBGM(a)
        }) : c._getShipId(b, function(a) {
            a ? c.playShipBGM(a) : c.playTownBGM()
        })
    },playGuildBGM: function(a, b) {
        var c = this;
        return a ? void this.playBGM("bgm/" + a + ".mp3") : c._getJukebox(b, function(a) {
            a && c.playGuildBGM(a)
        })
    },playJukeboxDefaultBGM: function() {
        return this.playBGM("bgm/13_event_generalpurpose_00.mp3")
    },playTutorialQuestBGM: function() {
        return this.playBGM("bgm/02_field_01.mp3")
    },playTutorialTownBGM: function() {
        return this.playBGM("bgm/11_kaze_reel_00.mp3")
    },playShopBGM: function() {
        return this.playBGM("bgm/11_kaze_reel_00.mp3")
    },playResultBGM: function() {
        return this.playBGM("bgm/05_gatcha_02.mp3")
    },playEventBGM: function() {
        return this.playBGM("bgm/12_baltz_06.mp3")
    },playLimitedBGM: function(a) {
        var b = "2009" == a ? "bgm/31_garonzo_02.mp3" : "bgm/02_field_02.mp3";
        return this.playBGM(b)
    },loadMypageVoiceData: function(a) {
        var b = this;
        b._getSoundData("sound/mypage_voice?data=" + a, a)
    },playMypageVoice: function(a) {
        var b = this;
        b._getSoundData("sound/mypage_voice?data=" + a, a, function(a) {
            b.playVoice(a)
        })
    },loadArchiveVoiceData: function(a) {
        var b = this;
        b._getSoundData("sound/archive_voice?data=" + a, a)
    },playArchiveVoice: function(a) {
        var b = this;
        b._getSoundData("sound/archive_voice?data=" + a, a, function(a) {
            b.playVoice(a, {force: !0})
        })
    },playWinVoice: function(a) {
        var b = this;
        b._getSoundData("sound/win_voice?data=" + a, a, function(a) {
            b.playVoice(a)
        })
    },playDyingVoice: function(a) {
        var b = this;
        b._getSoundData("sound/dying_voice?data=" + a, a, function(a) {
            b.playVoice(a)
        })
    },playSpecialSkillGaugeVoice: function(a) {
        var b = this;
        b._getSoundData("sound/special_skill_gauge_voice?data=" + a, a, function(a) {
            b.playVoice(a)
        })
    },playFormationVoice: function(a) {
        var b = this;
        b._getSoundData("sound/formation_voice?data=" + a, a, function(a) {
            b.playVoice(a)
        })
    },playGachaVoice: function(a) {
        var b = this;
        b._getSoundData("sound/gacha_voice?data=" + a, a, function(a) {
            b.playVoice(a)
        })
    },playEvolutionVoice: function(a) {
        var b = this;
        b._getSoundData("sound/evolution_voice?data=" + a, a, function(a) {
            b.playVoice(a)
        })
    },playSampleSE: function(a) {
        var b = this;
        b._getSoundData("sound/sample_se", function(a) {
            b.playSE(a, {alias: d.SE_SAMPLE_ALIAS})
        })
    },playSampleVoice: function(a) {
        var b = this;
        b._getSoundData("sound/sample_voice", function(a) {
            b.playVoice(a, {alias: d.VOICE_SAMPLE_ALIAS})
        })
    },playRecastMaxSE: function() {
        return this.playSE("se/ougi_gauge_se_1.mp3")
    },playSlideSE: function() {
        return this.playSE("se/btn_se/btn_se_02.mp3")
    },playEquipSE: function() {
        return this.playSE("se/equip_se_1.mp3")
    },playChangeWeaponSE: function() {
        return this.playSE("se/set_sw_se_1.mp3")
    },playSortSE: function() {
        return this.playSE("se/sort_se_1.mp3")
    },playNextSceneSE: function() {
        return this.playSE(d.SE_NEXT_SCENE, {alias: d.SE_NEXT_SCENE})
    },playExpGaugeSE: function() {
        return this.playSound("se/gauge_se_1.mp3", {offset: .15})
    },playAssistSE: function() {
        return this.playSound("se/help_se_1_01.mp3")
    },playAssistJoinedSE: function() {
        return this.playSE("se/help_se_2.mp3")
    },playBattleReadySE: function() {
        return this.playSE("se/ready_se_1.mp3")
    },playOpenAccordionSE: function() {
        return this.playSE("se/page_se_1.mp3")
    },playCloseAccordionSE: function() {
        return this.playSE("se/page_back_se_1.mp3")
    },playOpenMenuSE: function() {
        return this.playSE("se/menu_open_se_1.mp3")
    },playCloseMenuSE: function() {
        return this.playSE("se/menu_close_se_1.mp3")
    },playGetItemSE: function() {
        return this.playSE("se/itemget_04_se_1.mp3")
    },playGetTreasureSE: function() {
        return this.playSE("se/itemget_03_se_1.mp3")
    },playRankUpSE: function() {
        return this.playSE("se/rankup_se_1.mp3")
    },playLevelUpSE: function() {
        return this.playSE("se/levelup_se_1.mp3")
    },playPopSE: function() {
        return this.playSE("se/popup_se_1.mp3")
    },playQuestForwardButtonSE: function() {
        return this.playSE("se/btn_se/btn_se_01.mp3")
    },playSuccessSE: function() {
        return this.playSE("se/success_s_se_1.mp3")
    },playGreatSuccessSE: function() {
        return this.playSE("se/success_l_se_1.mp3")
    },playPushStampSE: function() {
        return this.playSE("se/stamp_se_1.mp3")
    },playRecoverySE: function() {
        return this.playSE("se/item_use_se_1.mp3")
    },playButtonSE: function(a) {
        var c = this;
        if (a.hasClass("btn-disable-sound") || (a.hasClass("btn-switch-sound") || a.hasClass("btn-bgm-change")) && a.hasClass("soundOn"))
            ;
        else {
            var d = b.some(k, function(d) {
                return b.some(d.classes, function(b) {
                    return a.hasClass(b) ? (d.se !== i && c.playSE(d.se), !0) : !1
                })
            });
            d || c.playSE(j)
        }
    },playPopShowSE: function(a) {
        var c = this;
        b.some(l, function(d) {
            return b.some(d.classes, function(b) {
                return a.hasClass(b) ? (c.playSE(d.se), !0) : !1
            })
        })
    }});
    return m.makeSingleton(), m
});
define('util/language-message', ["underscore"], function(a) {
    var b = {list: null};
    return {setMessage: function(c) {
        a.isNull(b.list) ? b.list = c : a.extend(b.list, c)
    },getMessage: function(a) {
        return b.list[a].msg || ""
    },clearMessage: function() {
        b.list = null
    },replaceMessage: function(b, c, d) {
        var d = void 0 !== d && a.isBoolean(d) ? d : !0, e = this.getMessage(b);
        return a.each(c, function(b, c) {
            e = e.replace(a.isNumber(c) ? "%s" : c, b)
        }), e = d ? e.replace(/\\n/g, "\n") : e
    }}
});
define('router/app-router', ["backbone", "lib/sound", "lib/raid/destroy", "model/sound", "util/local-storage", "util/navigate", "util/ajax", "model/data-loader", "model/cjs-loader", "model/manifest-loader", "util/language-message"], function(a, b, c, d, e, f, g, h, i, j, k) {
                                /*a          b,              c,                d,               e,                    f,           g,              h,                   i,                   j,                      k*/
    var l = {},
        m = a.Router.extend({initialize: function() {
        this.router_href()
    },
        routes: {"": "index","_=_": "index",top: "top",authentication: "authentication","authentication/failed_empty": "authentication_failed_empty","authentication/failed_exist": "authentication_failed_exist","presetting/:page(/:attr1)": "presetting",opmovie: "openingmovie","tutorial(/*subroute)": "tutorial",mypage: "user","quest(/*subroute)": "quest","scene/:scene_id/:redirect": "scene","external/scene/:scene_id/:redirect": "external_scene","raid/:raid_id": "raid","raid/:raid_id/:speed": "raid","raid/:raid_id/:speed/:lock": "raid","raid/:raid_id/:cmd/:uid/:stp/:trn/:fwd/:tgt": "raid_rep","raid_multi/:raid_id": "raid_multi","raid_multi/:raid_id/:speed": "raid_multi","raid_multi/:raid_id/:speed/:lock": "raid_multi","raid_multi/:raid_id/:cmd/:uid/:stp/:trn/:fwd/:tgt": "raid_rep_multi","raid_semi/:raid_id(/watching)": "raid_semi","party(/*subroute)": "party","deckcombination/storage/:deck_id": "deckcombination_storage","deckcombination/:deck_id": "deckcombination","result/quest/": "result_quest","result/:raid_id": "result","result/empty/:raid_id": "result_empty","result/quest/empty/": "result_quest_empty","result/tresure/:raid_id": "tresure","result/detail/:raid_id": "result_detail","result_multi/:raid_id": "result_multi","result_multi/detail/:raid_id": "result_detail","result_multi/detail/:raid_id/:defendOrderId": "result_detail_do","result_multi/empty/:raid_id": "result_multi_empty","result_multi/:raid_id/:speed": "result_multi","result_multi/:raid_id/:speed/:isPlayingBgm": "result_multi","result/:raid_id/:speed": "result","result/:raid_id/:speed/:isPlayingBgm": "result","result_dungeon/:raid_id": "result_dungeon","result_survival/:raid_id/:isPlayingBgm": "resultSurvival","guild(/*subroute)": "guild","gacha(/*subroute)": "gacha","shop(/*subroute)": "shop","induce(/*subroute)": "induce",present: "present","present/:active_tab": "present",item: "item","item/:active_tab": "item","item/list_npc/:item_id/:mode": "item_list_npc","item/npc/:item_id/:mode/:record_id": "item_npc","archaic(/*subroute)": "archaic","enhancement(/*subroute)": "enhancement","evolution(/*subroute)": "evolution",list: "list_all","list/detail_weapon/:deck_num/:set_num/:param_id/:active_tab": "list_all_detail_weapon","list/detail_summon/:deck_num/:set_num/:param_id/:active_tab": "list_all_detail_summon","list/detail_npc/:deck_num/:set_num/:param_id/:active_tab": "list_all_detail_npc","list/move/:type/:c_id": "list_all_move","list/:deck_num/:set_num/:param_id/:active_tab": "list_all_tab","sell/:active_tab": "sell","detail/decompose/:type/:param_id/:previous_id": "decompose","container(/*subroute)": "container",profile: "profile","profile/share": "profileShare","profile/greet": "profileGreet","profile/lookback": "profileLookback","profile/setting": "profileSetting","profile/fix/list/:category/:type": "profileFixList","profile/fix/detail/:category/:param_id/:type": "profileFixDetail","profile/fix/show/:category/:param_id/:type": "profileFixPopShow","profile/fix/float/:category/:param_id/:type": "profileFloatPopShow","profile/detail/:category/:param_id/:user_id": "profileDetail","profile/pushed_npc/list": "profilePushedNpcList","profile/pushed_npc/detail/:param_id": "profilePushedNpcDetail","profile/pushed_npc/detail/:param_id/:cnt": "profilePushedNpcDetail","profile/cooproom/:user_id/:room_id": "profile_cooproom","profile/skyroom/:user_id/:room_id": "profile_skyroom","profile/:user_id": "profile","profile/:user_id/greet": "profileGreet","profile_do/:defendOrderId/:user_id": "profileDefendOrder","profile_arcarum/:arcarumId/:user_id": "profileArcarum",title: "title","title/parent/:parent_page": "title","title/reward": "titleReward","title/set_list": "titleSetList","title/add/:event_type/:event_id": "titleAdd",setting: "setting","setting/:items": "setting","setting/:items/:setted": "setting","archive(/*subroute)": "archive",friend: "friend","friend/search": "friendSearch","friend/:tabFlag": "friendTab",comic: "comic","comic/guide": "comicGuide","comic/:episode_id": "comicEpisode","mutual/:app_code": "mutual","collaboration/reward/:event_id": "collaborationReward","collaboration/campaign/:type": "collaborationCampaign","collaboration/:type": "collaboration","collaboration/:type/last": "collaborationLast",help: "help","help/:category/:sub_category/:topic": "help_sub_category_topic","help_detail/:category/:sub_category/:topic": "helpDetail",news: "news","news/bug/:prev_id": "news_bug","news/detail/:topic_id/:prev_id": "news_detail","news/detail/:topic_id/:prev_id/:category/:page": "news_detail","news/:category/:page": "news","loginbonus/:cjsname": "loginbonus","limitedloginbonus/:cjsname": "limited_loginbonus",campaign: "campaign","campaign/:campaign_name": "campaignDetail","campaign/:campaign_name/gacha": "campaignGacha","campaign/:campaign_name/:page": "campaignDetail","campaign/:campaign_name/:page/:category_id": "campaignPanel","opening/gacha/:publicity_id": "opening_gacha","auth/index": "auth_confirm","static/charge_check": "charge_check","static/do_charge_confirm/:code": "charge_confirm","static/:page_name": "static","static/:page_name/:back": "static",serialcode: "serial_index","serialcode/list/:campaign_code/:campaign_id": "serial_form","debug/quest/scene/:scene_id/:index/:disp_flag": "debug_scene","debug/quest/scene/:scene_id/:index/:branch_npc_list/:disp_flag": "debug_scene","casino(/*subroute)": "casino","event(/*subroute)(/*path)": "event_router","event_exchange/:page": "event_exchange","incentive/:incentive_type": "incentive","incentive/download/:incentive_type/:image": "incentive_download","incentive/result/:from_notice": "incentive_result","limited/:event_id/landing": "event_limited_landing","limited/:event_id/opening/:scene_id/:page": "event_limited_opening","limited/:event_id/scene/:scene_id/:page": "event_limited_scene","limited/index": "event_limited_index","limited/multi/index": "event_limited_index_multi","limited/multi/index/:event_id": "event_limited_index_multi","limited/:event_id/index": "event_limited_index","limited/:event_id/end": "event_limited_end","limited/:event_id/ending/:scene_id": "event_limited_ending","limited/:event_id/collaboration": "event_limited_collaboration","limited/:event_id/changes": "event_limited_changes","limited/:event_id/title": "event_limited_title","event_general/index": "event_general","event_general/index/:event_id": "event_general","event_general/end": "event_general_end","event_general/end/:event_id": "event_general_end","coopraid(/*subroute)": "coopraid",teaser: "teaser","teaser/:event_id": "teaser","announce/casino": "announce_casino","announce/coop": "announce_coop","zenith(/*subroute)": "zenith","surprise(/*subroute)": "surprise","sky(/*subroute)(/*path)": "sky_router","defend_order(/*subroute)": "defend_order_router",deal: "deal","deal/:empty": "deal",tanka: "tanka","tanka/index": "tanka",oogiri: "oogiri_index","oogiri/index": "oogiri_index","oogiri/incentive": "oogiri_incentive","oogiri/end": "oogiri_end",vote: "vote_index","vote/index": "vote_index","job/bullet/index/:weapon_id/:parent_page": "job_bullet_index","job/bullet/setting/:weapon_id/:slot_no/:unique_weapon_id/:parent_page": "job_bullet_setting","job/hiddenweapon/index/:parent/:deck": "job_hiddenweapon_index","job/hiddenweapon/index/:parent/:deck/:page": "job_hiddenweapon_index","job/hiddenweapon/setting/:parent/:deck/:slot": "job_hiddenweapon_setting","job/hiddenweapon/preset/:parent/:deck": "job_hiddenweapon_preset","oogiri/result": "oogiri_result",trial_battle: "trialBattle","trial_battle/:selectedTab": "trialBattle","trial_battle/chara/:trialId": "trialBattleCharacterDetail",orchestra: "orchestra","orchestra/index": "orchestra","orchestra/registration": "orchestra_registration","orchestra/pia": "orchestra_registration_pia","restrict/:rest_page": "restrict",arcarum: "arcarumEnhancementIndex","arcarum/enhancement/index": "arcarumEnhancementIndex","arcarum/enhancement/detail/:cardId": "arcarumEnhancementDetail",
        "*error": "error"},
        move: function() {
        Game.loading.loadStart(), Game.ua.isJssdk() && $("#mobage-game-container").parent().scrollTop(0), Game.view && (Game.view.content_close(), Game.view.destroyImages()), i.clear(), i.off(), j.off(), d.stopVoice(), b.clearInstances({exclude: /btn_se/}), b.off(), g.abortXHR(), c.mSetInterval(), c.mCreateJS(), $("#mbga-pf-footer").remove(), k.clearMessage()
    },router_href: function() {
        $("#wrapper, #general-chat").on("tap", "[data-href]", function(b) {
            var c = ["mypage"], d = $(b.currentTarget).attr("data-href"), e = a.history.getFragment(d);
            c.indexOf(d) >= 0 && (Game.loading.loadStart(), Game.view && (Game.view.content_close(), Game.view.destroyImages()), f.hash("#" + d, {refresh: !0})), a.history.fragment == e && (a.history.fragment = null), a.history.navigate(e, !0), Game.view && Game.view.stopEventPropagation(b, !0)
        })
    },index: function() {
        -1 === location.href.lastIndexOf("debug") && -1 === location.href.lastIndexOf("skyadmin") && -1 === location.href.lastIndexOf("fatetest") && this.top()
    },top: function() {
        this.move();
        var a = window.navigator.userAgent;
        (Game.ua.isPcPlatform() && "Safari" !== Game.ua.browser.name && "Chrome" !== Game.ua.browser.name || a.toLowerCase().indexOf("edge") > -1) && (window.location.href = "http://granbluefantasy.jp/browser/"), require(["view/game/top"], function(a) {
            d.stopBGM(), Game.view = new a
        })
    },authentication: function() {
        this.move(), require(["view/authentication/index"], function(a) {
            d.stopBGM(), Game.view = new a
        })
    },authentication_failed_empty: function() {
        this.move(), require(["view/authentication/failed_empty"], function(a) {
            d.stopBGM(), Game.view = new a
        })
    },authentication_failed_exist: function() {
        this.move(), require(["view/authentication/failed_exist"], function(a) {
            d.stopBGM(), Game.view = new a
        })
    },presetting: function(a, b) {
        this.move(), "undefined" == typeof b ? require(["view/presetting/" + a], function(a) {
            Game.view = new a
        }) : require(["view/presetting/" + a], function(a) {
            Game.view = new a({attr1: b})
        })
    },openingmovie: function() {
        this.move(), require(["view/game/opmovie"], function(a) {
            Game.view = new a
        })
    },tutorial: function(a) {
        l.tutorial || require(["router/tutorial-router"], function(a) {
            l.tutorial = new a("tutorial")
        })
    },user: function() {
        this.move(), require(["view/user/index"], function(a) {
            Game.view = new a
        })
    },quest: function(a) {
        l.quest || require(["router/quest-router"], function(a) {
            l.quest = new a("quest")
        })
    },scene: function(a, b) {
        this.move(), require(["view/scene/scene"], function(c) {
            Game.view = new c({scene_id: a,redirect: b})
        })
    },external_scene: function(a, b) {
        this.move(), require(["view/scene/external_scene"], function(c) {
            Game.view = new c({scene_id: a,redirect: b})
        })
    },raid: function(a, b, c) {
        this.move(), require(["view/raid/main"], function(d) {
            Game.view = new d({raid_id: a,action: "start",speed: b,lock: c})
        })
    },raid_multi: function(a, b, c) {
        this.move(), require(["view/raid/main"], function(d) {
            Game.view = new d({raid_id: a,action: "start",speed: b,lock: c,is_multi: !0})
        })
    },raid_semi: function(a) {
        this.move(), require(["view/raid/main"], function(b) {
            Game.view = new b({raid_id: a,action: "start",is_multi: !0,is_semi: !0})
        })
    },raid_rep: function(a, b, c, d, e, f, g) {
        this.move(), require(["view/raid/main"], function(h) {
            Game.view = new h({raid_id: a,action: "start",cmd: b,uid: c,stp: d,trn: e,fwd: f,tgt: g})
        })
    },raid_rep_multi: function(a, b, c, d, e, f, g) {
        this.move(), require(["view/raid/main"], function(h) {
            Game.view = new h({raid_id: a,action: "start",cmd: b,uid: c,stp: d,trn: e,fwd: f,tgt: g,is_multi: !0})
        })
    },result_quest: function() {
        this.move(), require(["view/result/index-main"], function(a) {
            Game.view = new a
        })
    },result: function(a, b, c) {
        this.move(), require(["view/result/index-main"], function(d) {
            Game.view = new d({raid_id: a,speed: b,isPlayingBgm: c || 0})
        })
    },resultSurvival: function(a, b) {
        this.move(), require(["view/result/index-main"], function(c) {
            Game.view = new c({raid_id: a,isPlayingBgm: b})
        })
    },result_empty: function(a) {
        this.move(), require(["view/result/empty"], function(b) {
            Game.view = new b({raid_id: a})
        })
    },result_quest_empty: function() {
        this.move(), require(["view/result/empty"], function(a) {
            Game.view = new a
        })
    },result_multi: function(a, b, c) {
        this.move(), require(["view/result/index-main"], function(d) {
            Game.view = new d({raid_id: a,speed: b,is_multi: !0,isPlayingBgm: c || 0})
        })
    },result_multi_empty: function(a) {
        this.move(), require(["view/result/empty"], function(b) {
            Game.view = new b({raid_id: a,is_multi: !0})
        })
    },result_dungeon: function(a) {
        this.move(), require(["view/result/dungeon"], function(b) {
            Game.view = new b({raid_id: a})
        })
    },tresure: function(a) {
        this.move(), require(["view/result/tresure-main"], function(b) {
            Game.view = new b({raid_id: a})
        })
    },result_detail: function(a) {
        this.move(), require(["view/result/detail"], function(b) {
            Game.view = new b({raid_id: a,isDefendOrder: !1})
        })
    },result_detail_do: function(a, b) {
        this.move(), require(["view/result/detail"], function(c) {
            Game.view = new c({raid_id: a,isDefendOrder: !0,defendOrderId: b})
        })
    },party: function(a) {
        l.party || require(["router/party-router"], function(a) {
            l.party = new a("party")
        })
    },deckcombination: function(a) {
        this.move(), require(["view/deckcombination/index"], function(b) {
            d.playTownBGM(), Game.view = new b({deck_id: a})
        })
    },deckcombination_storage: function(a) {
        this.move(), require(["view/deckcombination/storage"], function(b) {
            d.playTownBGM(), Game.view = new b({deck_id: a})
        })
    },guild: function(a) {
        l.guild || require(["router/guild-router"], function(a) {
            l.guild = new a("guild")
        })
    },gacha: function(a) {
        l.gacha || require(["router/gacha-router"], function(a) {
            l.gacha = new a("gacha")
        })
    },shop: function(a) {
        l.shop || require(["router/shop-router"], function(a) {
            l.shop = new a("shop")
        })
    },induce: function(a) {
        l.induce || require(["router/induce-router"], function(a) {
            l.induce = new a("induce")
        })
    },present: function(a) {
        this.move(), require(["view/present/index"], function(b) {
            d.playTownBGM(), Game.view = new b({active_tab: a})
        })
    },item: function(a) {
        this.move(), require(["view/item/index"], function(b) {
            "undefined" == typeof a && (a = 0), d.playTownBGM(), Game.view = new b({active_tab: a})
        })
    },item_list_npc: function(a, b) {
        this.move(), require(["view/item/list_npc"], function(c) {
            d.playTownBGM(), Game.view = new c({item_id: a,mode: b})
        })
    },item_npc: function(a, b, c) {
        this.move(), require(["view/item/npc"], function(e) {
            d.playTownBGM(), Game.view = new e({item_id: a,mode: b,record_id: c})
        })
    },archaic: function(a) {
        l.archaic || require(["router/archaic-router"], function(a) {
            l.archaic = new a("archaic")
        })
    },enhancement: function(a) {
        l.enhancement || require(["router/enhancement-router"], function(a) {
            l.enhancement = new a("enhancement")
        })
    },evolution: function(a) {
        l.evolution || require(["router/evolution-router"], function(a) {
            l.evolution = new a("evolution")
        })
    },list_all: function() {
        this.move(), require(["view/listall/index"], function(a) {
            d.playTownBGM(), Game.view = new a
        })
    },list_all_tab: function(a, b, c, e) {
        this.move(), require(["view/listall/index"], function(f) {
            d.playTownBGM(), Game.view = new f({deck_num: a,set_num: b,param_id: c,active_tab: e})
        })
    },list_all_detail_weapon: function(a, b, c, e) {
        this.move(), require(["view/listall/detail_weapon"], function(f) {
            d.playTownBGM(), Game.view = new f({deck_num: a,set_num: b,param_id: c,active_tab: e})
        })
    },list_all_detail_summon: function(a, b, c, e) {
        this.move(), require(["view/listall/detail_summon"], function(f) {
            d.playTownBGM(), Game.view = new f({deck_num: a,set_num: b,param_id: c,active_tab: e})
        })
    },list_all_detail_npc: function(a, b, c, e) {
        this.move(), require(["view/listall/detail_npc"], function(f) {
            d.playTownBGM(), Game.view = new f({deck_num: a,set_num: b,param_id: c,active_tab: e})
        })
    },list_all_move: function(a, b) {
        this.move(), require(["view/listall/move"], function(c) {
            d.playTownBGM(), Game.view = new c({type: a,c_id: b})
        })
    },sell: function(a) {
        this.move(), require(["view/sell/index"], function(b) {
            d.playTownBGM(), Game.view = new b({active_tab: a})
        })
    },decompose: function(a, b, c) {
        this.move(), require(["view/detail/decompose"], function(e) {
            d.playTownBGM(), Game.view = new e({type: a,param_id: b,previous_id: c})
        })
    },container: function() {
        l.container || require(["router/container-router"], function(a) {
            l.container = new a("container")
        })
    },profile: function(a) {
        this.move(), require(["view/profile/index"], function(b) {
            "undefined" == typeof a && (a = null), d.playTownBGM(), Game.view = new b({user_id: a})
        })
    },profile_cooproom: function(a, b) {
        this.move(), require(["view/profile/index"], function(c) {
            "undefined" == typeof a && (a = null), "undefined" == typeof b && (b = null), d.playTownBGM(), Game.view = new c({user_id: a,room_id: b,is_sky: !1})
        })
    },profile_skyroom: function(a, b) {
        this.move(), require(["view/profile/index"], function(c) {
            "undefined" == typeof a && (a = null), "undefined" == typeof b && (b = null), d.playTownBGM(), Game.view = new c({user_id: a,room_id: b,is_sky: !0})
        })
    },profileShare: function() {
        this.move(), require(["view/profile/index"], function(a) {
            d.playTownBGM(), Game.view = new a({jump: "share"})
        })
    },profileDefendOrder: function(a, b) {
        this.move(), require(["view/profile/index"], function(c) {
            b || (b = null), d.playTownBGM(), Game.view = new c({defendOrderId: a,user_id: b,isDefendOrderRank: !0})
        })
    },profileArcarum: function(a, b) {
        this.move(), require(["view/profile/index"], function(c) {
            b || (b = null), d.playTownBGM(), Game.view = new c({arcarumId: a,user_id: b,isArcarum: !0})
        })
    },profileGreet: function(a) {
        this.move(), require(["view/profile/greet"], function(b) {
            "undefined" == typeof a && (a = null), d.playTownBGM(), Game.view = new b({user_id: a})
        })
    },profileLookback: function() {
        this.move(), require(["view/profile/lookback"], function(a) {
            d.playTownBGM(), Game.view = new a
        })
    },profileSetting: function() {
        this.move(), require(["view/profile/setting"], function(a) {
            d.playTownBGM(), Game.view = new a
        })
    },profileFixList: function(a, b) {
        this.move(), require(["view/profile/fix_list"], function(c) {
            d.playTownBGM(), Game.view = new c({category: a,type: b})
        })
    },profileFixDetail: function(a, b, c) {
        this.move(), "summon" === a && require(["view/profile/fix_summon_detail"], function(a) {
            d.playTownBGM(), Game.view = new a({param_id: b,type: c})
        })
    },profileFixPopShow: function(a, b, c) {
        this.move(), "summon" === a && require(["view/profile/index"], function(a) {
            d.playTownBGM(), Game.view = new a({jump: "fix_summon",item_id: b,type: c})
        })
    },profileFloatPopShow: function(a, b, c) {
        this.move(), "summon" === a && require(["view/profile/index"], function(a) {
            d.playTownBGM(), Game.view = new a({jump: "float_summon",item_id: b,type: c})
        })
    },profileDetail: function(a, b, c) {
        this.move(), require(["view/profile/detail"], function(e) {
            d.playTownBGM(), Game.view = new e({category: a,param_id: b,user_id: c})
        })
    },profilePushedNpcList: function() {
        this.move(), require(["view/profile/pushed_npc/list"], function(a) {
            d.playTownBGM(), Game.view = new a
        })
    },profilePushedNpcDetail: function(a, b) {
        var b = b || null;
        this.move(), require(["view/profile/pushed_npc/detail"], function(c) {
            d.playTownBGM(), Game.view = new c({param_id: a,cnt: b})
        })
    },title: function(a) {
        this.move(), require(["view/title/index"], function(b) {
            d.playTownBGM(), Game.view = new b({parent_page: a})
        })
    },titleReward: function() {
        this.move(), require(["view/title/reward"], function(a) {
            d.playTownBGM(), Game.view = new a
        })
    },titleSetList: function() {
        this.move(), require(["view/title/set_list"], function(a) {
            d.playTownBGM(), Game.view = new a
        })
    },titleAdd: function(a, b) {
        this.move(), require(["view/title/add"], function(c) {
            d.playTownBGM(), Game.view = new c({event_type: a,event_id: b})
        })
    },setting: function(a, b) {
        this.move(), require(["view/setting/index"], function(c) {
            d.playTownBGM(), Game.view = new c({items: a,setted: b})
        })
    },archive: function(a) {
        l.archive || require(["router/archive-router"], function(a) {
            l.archive = new a("archive")
        })
    },friend: function() {
        this.move(), require(["view/friend/index"], function(a) {
            d.playTownBGM(), Game.view = new a({tabFlag: "friend"})
        })
    },friendTab: function(a) {
        this.move(), require(["view/friend/index"], function(b) {
            d.playTownBGM(), Game.view = new b({tabFlag: a})
        })
    },friendSearch: function() {
        this.move(), require(["view/friend/search"], function(a) {
            d.playTownBGM(), Game.view = new a
        })
    },comic: function() {
        this.move(), require(["view/comic/index"], function(a) {
            d.playTownBGM(), Game.view = new a
        })
    },comicGuide: function() {
        this.move(), require(["view/comic/guide"], function(a) {
            d.playTownBGM(), Game.view = new a
        })
    },comicEpisode: function(a) {
        this.move(), require(["view/comic/episode"], function(b) {
            d.playTownBGM(), Game.view = new b({episode_id: a})
        })
    },mutual: function(a) {
        this.move(), require(["view/mutual/index"], function(b) {
            d.playTownBGM(), Game.view = new b({app_code: a})
        })
    },collaborationReward: function(a) {
        this.move(), require(["view/collaboration/reward"], function(b) {
            d.playTownBGM(), Game.view = new b({event_id: a})
        })
    },collaborationCampaign: function(a) {
        this.move(), require(["view/collaboration/campaign"], function(b) {
            d.playTownBGM(), Game.view = new b({type: a})
        })
    },collaboration: function(a) {
        this.move(), require(["view/collaboration/index"], function(b) {
            d.playTownBGM(), Game.view = new b({type: a,action: "top"})
        })
    },collaborationLast: function(a) {
        this.move(), require(["view/collaboration/last"], function(b) {
            d.playTownBGM(), Game.view = new b({type: a,action: "last"})
        })
    },help: function() {
        this.move(), require(["view/help/index"], function(a) {
            d.playTownBGM(), Game.view = new a
        })
    },help_sub_category_topic: function(a, b, c) {
        this.move(), require(["view/help/sub_category_topic"], function(e) {
            d.playTownBGM(), Game.view = new e({category: a,sub_category: b,topic: c,isUniqueTopicId: !1})
        })
    },helpDetail: function(a, b, c) {
        this.move(), require(["view/help/sub_category_topic"], function(e) {
            d.playTownBGM(), Game.view = new e({category: a,sub_category: b,topic: c,isUniqueTopicId: !0})
        })
    },news: function(a, b) {
        this.move(), require(["view/news/index"], function(c) {
            d.playTownBGM(), Game.view = new c({category: a,page: b})
        })
    },news_detail: function(a, b, c, e) {
        this.move(), require(["view/news/detail"], function(f) {
            d.playTownBGM(), Game.view = new f({topic_id: a,prev_id: b,category: c,page: e})
        })
    },news_bug: function(a) {
        this.move(), require(["view/news/bug"], function(b) {
            d.playTownBGM(), Game.view = new b({prev_id: a})
        })
    },loginbonus: function(a) {
        this.move(), require(["view/loginbonus/index"], function(b) {
            d.playTownBGM(), Game.view = new b({cjsname: a})
        })
    },limited_loginbonus: function(a) {
        this.move(), require(["view/loginbonus/limited"], function(b) {
            Game.view = new b({cjsname: a})
        })
    },campaign: function() {
        this.move(), require(["view/campaign/index"], function(a) {
            d.playTownBGM(), Game.view = new a
        })
    },campaignGacha: function(a) {
        this.move(), require(["view/campaign/" + a + "/gacha"], function(a) {
            d.playTownBGM(), Game.view = new a
        })
    },campaignDetail: function(a, b) {
        this.move(), "undefined" == typeof b && (b = "index"), require(["view/campaign/" + a + "/" + b], function(c) {
            d.playTownBGM(), Game.view = new c({campaign_name: a,page: b})
        })
    },campaignPanel: function(a, b, c) {
        this.move(), require(["view/campaign/" + a + "/" + b], function(e) {
            d.playTownBGM(), Game.view = new e({campaign_name: a,page: b,category_id: c})
        })
    },opening_gacha: function(a) {
        this.move(), require(["view/opening/gacha"], function(b) {
            Game.view = new b({publicity_id: a})
        })
    },debug_scene: function(a, b, c, d) {
        this.move(), require(["view/quest/debug-event-scene-app"], function(e) {
            Game.view = new e({scene_id: a,start_index: b,branch_npc_list: c || null,disp_flag: d})
        })
    },auth_confirm: function() {
        this.move(), require(["view/auth/index"], function(a) {
            d.playTownBGM(), Game.view = new a
        })
    },charge_check: function() {
        this.move(), require(["view/static/charge_check"], function(a) {
            d.playTownBGM(), Game.view = new a
        })
    },charge_confirm: function(a) {
        this.move(), require(["view/static/charge_confirm"], function(b) {
            Game.view = new b({code: a})
        })
    },"static": function(a, b) {
        this.move(), require(["view/static/index"], function(c) {
            "undefined" == typeof b && (b = null), d.playTownBGM(), Game.view = new c({page_name: a,back: b})
        })
    },serial_index: function(a) {
        this.move(), require(["view/serialcode/index"], function(b) {
            d.playTownBGM(), Game.view = new b({campaign_code: a})
        })
    },serial_form: function(a, b) {
        this.move(), require(["view/serialcode/detail"], function(c) {
            d.playTownBGM(), Game.view = new c({campaign_code: a,campaign_id: b})
        })
    },casino: function(a) {
        l.casino || require(["router/casino-router"], function(a) {
            l.casino = new a("casino")
        })
    },event_router: function(a, b) {
        if (!l.eventRouter) {
            var c = "event/" + a + "/router/" + a + "-router";
            require([c], function(b) {
                var c = "event/" + a;
                l[a] = new b(c)
            }, function(a) {
                location.href = Game.baseUri
            })
        }
    },event_exchange: function(a) {
        this.move(), require(["view/event_exchange/" + a], function(a) {
            d.playTownBGM(), Game.view = new a
        })
    },incentive: function(a) {
        this.move(), require(["view/incentive/index"], function(b) {
            d.playTownBGM(), Game.view = new b({incentive_type: a})
        })
    },incentive_download: function(a, b) {
        this.move(), require(["view/incentive/download"], function(c) {
            d.playTownBGM(), Game.view = new c({incentive_type: a,image: b})
        })
    },incentive_result: function(a) {
        this.move(), require(["view/incentive/result"], function(b) {
            d.playTownBGM(), Game.view = new b({from_notice: a})
        })
    },event_limited_opening: function(a, b, c) {
        this.move(), require(["view/limited/landing/opening"], function(e) {
            d.stopBGM(), Game.view = new e({event_id: a,scene_id: b,page: c})
        })
    },event_limited_scene: function(a, b, c) {
        this.move(), require(["view/limited/landing/opening"], function(e) {
            d.stopBGM(), Game.view = new e({event_id: a,scene_id: b,page: c})
        })
    },event_limited_landing: function(a) {
        this.move(), require(["view/limited/landing/index"], function(b) {
            Game.view = new b({event_id: a})
        })
    },event_limited_index: function(a) {
        this.move();
        var b = "view/limited/index";
        require([b], function(b) {
            Game.view = new b({event_id: a})
        })
    },event_limited_index_multi: function(a) {
        this.move(), require(["view/limited/index_multi"], function(b) {
            Game.view = new b({event_id: a})
        })
    },event_limited_end: function(a) {
        this.move(), require(["view/limited/end/index"], function(b) {
            Game.view = new b({event_id: a})
        })
    },event_limited_ending: function(a, b) {
        this.move(), require(["view/limited/end/ending"], function(c) {
            d.stopBGM(), Game.view = new c({event_id: a,scene_id: b})
        })
    },event_limited_collaboration: function(a) {
        this.move(), require(["view/limited/collaboration/index"], function(b) {
            Game.view = new b({event_id: a})
        })
    },event_limited_changes: function(a) {
        this.move(), require(["view/limited/changes"], function(b) {
            Game.view = new b({event_id: a})
        })
    },event_limited_title: function(a) {
        this.move(), require(["view/limited/title/index"], function(b) {
            Game.view = new b({event_id: a})
        })
    },event_general: function(a) {
        this.move(), require(["view/event_general/index"], function(b) {
            Game.view = new b({event_id: a})
        })
    },event_general_end: function(a) {
        this.move(), require(["view/event_general/end"], function(b) {
            Game.view = new b({event_id: a})
        })
    },coopraid: function(a) {
        l.coopraid || require(["router/coopraid-router"], function(a) {
            l.coopraid = new a("coopraid")
        })
    },teaser: function(a) {
        this.move(), require(["view/teaser/index"], function(b) {
            Game.view = new b({event_id: a})
        })
    },announce: function() {
        this.move(), require(["view/announce/index"], function(a) {
            d.playTownBGM(), Game.view = new a
        })
    },announce_casino: function() {
        this.move(), require(["view/announce/casino"], function(a) {
            d.playTownBGM(), Game.view = new a
        })
    },announce_coop: function() {
        this.move(), require(["view/announce/coop"], function(a) {
            d.playTownBGM(), Game.view = new a
        })
    },zenith: function(a) {
        l.zenith || require(["router/zenith-router"], function(a) {
            l.zenith = new a("zenith")
        })
    },surprise: function(a) {
        l.surprise || require(["router/surprise-router"], function(a) {
            l.surprise = new a("surprise")
        })
    },sky_router: function() {
        l.skyRouter || require(["sky/router/sky-router"], function(a) {
            l.guild = new a("sky")
        })
    },defend_order_router: function(a) {
        l.defend_order || require(["router/defend-order-router"], function(a) {
            l.defend_order = new a("defend_order")
        })
    },deal: function(a) {
        a ? (this.move(), require(["view/deal/empty"], function(a) {
            Game.view = new a
        })) : (this.move(), require(["view/deal/index"], function(a) {
            Game.view = new a
        }))
    },tanka: function() {
        this.move(), require(["view/tanka/index"], function(a) {
            d.playTownBGM(), Game.view = new a
        })
    },oogiri_index: function() {
        this.move(), require(["view/oogiri/index"], function(a) {
            Game.view = new a
        })
    },oogiri_incentive: function() {
        this.move(), require(["view/oogiri/incentive"], function(a) {
            Game.view = new a
        })
    },oogiri_end: function() {
        this.move(), require(["view/oogiri/end"], function(a) {
            Game.view = new a
        })
    },oogiri_result: function() {
        this.move(), require(["view/oogiri/result"], function(a) {
            Game.view = new a
        })
    },vote_index: function() {
        this.move(), require(["view/vote/index"], function(a) {
            Game.view = new a
        })
    },job_bullet_index: function(a, b) {
        this.move(), require(["view/job/bullet/index"], function(c) {
            Game.view = new c({parent_page: b,weapon_id: a})
        })
    },job_bullet_setting: function(a, b, c, d) {
        this.move(), require(["view/job/bullet/setting"], function(e) {
            Game.view = new e({parent_page: d,weapon_id: a,slot_no: b,unique_weapon_id: c})
        })
    },job_hiddenweapon_index: function(a, b, c) {
        this.move(), require(["view/job/hidden_weapon/index"], function(e) {
            d.playTownBGM(), Game.view = new e({parent: a,deck: b,page: c})
        })
    },job_hiddenweapon_setting: function(a, b, c) {
        this.move(), require(["view/job/hidden_weapon/setting"], function(e) {
            d.playTownBGM(), Game.view = new e({parent: a,deck: b,slot: c})
        })
    },job_hiddenweapon_preset: function(a, b) {
        this.move(), require(["view/job/hidden_weapon/preset"], function(c) {
            d.playTownBGM(), Game.view = new c({parent: a,deck: b})
        })
    },trialBattle: function(a) {
        this.move(), require(["view/trialbattle/index"], function(b) {
            d.playTownBGM(), Game.view = new b({selectedTab: a || 0})
        })
    },trialBattleCharacterDetail: function(a) {
        this.move(), require(["view/trialbattle/character_detail"], function(b) {
            d.playTownBGM(), Game.view = new b({trialId: a})
        })
    },orchestra: function() {
        this.move(), require(["view/orchestra/index"], function(a) {
            d.playBGM("bgm/01_main_02.mp3"), Game.view = new a
        })
    },orchestra_registration: function(a) {
        this.move(), require(["view/orchestra/registration"], function(b) {
            d.playBGM("bgm/01_main_02.mp3"), Game.view = new b({pia: a})
        })
    },orchestra_registration_pia: function(a) {
        this.move(), require(["view/orchestra/registration"], function(a) {
            d.playBGM("bgm/01_main_02.mp3"), Game.view = new a({pia: "pia"})
        })
    },restrict: function(a) {
        this.move(), require(["view/restrict/index"], function(b) {
            Game.view = new b({rest_page: a})
        })
    },arcarumEnhancementIndex: function() {
        Game.router.move(), require(["view/arcarum/enhancement/index"], function(a) {
            d.playBGM("bgm/51_arcana_event_00.mp3"), Game.view = new a
        })
    },arcarumEnhancementDetail: function(a) {
        Game.router.move(), require(["view/arcarum/enhancement/detail"], function(b) {
            d.playBGM("bgm/51_arcana_event_00.mp3"), Game.view = new b({cardId: a})
        })
    },error: function() {
        this.move(), require(["view/content"], function(a) {
            d.playTownBGM(), Game.view = new a, Game.view.page_error()
        })
    }});
    return m
});
