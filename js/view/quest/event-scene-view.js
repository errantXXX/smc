define(["underscore", "backbone", "collection/quest/scenario-collection", "collection/quest/coop-scenario-collection", "collection/quest/archaic-scenario-collection", "collection/quest/archaic-job-scenario-collection", "collection/quest/archaic-bahamut-scenario-collection", "collection/quest/casino-scenario-collection", "collection/quest/archive-scenario-collection", "loadmanager", "general", "view/quest/abstract-view", "view/quest/event-scene-talk-view", "view/quest/event-scene/event-scene-log-view", "view/cjs/cjs-phit_sw_0002", "view/cjs/cjs-ehit_0001", "view/cjs/cjs-ab_3000", "view/cjs/cjs-scene-effect", "view/cjs/cjs-scene-effect-load", "view/cjs/cjs-scene-private", "view/cjs/cjs-quest_encount", "lib/quest/extension", "lib/sound", "model/sound", "lib/shellapp", "util/language"], function (a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z) {
    var A = null, B = null, C = [0, 1, 2], D = l.extend({effectCjs: null, isForcefulNext: !1, el: ".cnt-quest-scene", charaList: [], tutorialInputtedName: "", tutorialTempNameStatus: C[0], shouldReplaceTempName: !1, events: {"tap canvas, .prt-scene-comment": "next", "tap .img-skip": "end", "tap .txt-sel1": "selNext1", "tap .txt-sel2": "selNext2", "tap .txt-sel3": "selNext3", "tap .txt-sel4": "selNext4", "tap .prt-scene-comment .btn-play-voice": "playButtonVoice", "tap .prt-sel-area .btn-sel-taparea": "dummyButtonVoice"}, initialize: function (b) {
        this.stopStageEvent(),
            this.content_bind(),
            this.init(),
            this.coop_flg = 0,
            this.archaic_flg = 0,
            this.casino_flg = 0,
            this.archive_flg = 0;
        var j = b.seasonEventId || 0,
            k = b.uniqueId || 0,
            l = b.event_id || 0,
            m = b.isBirthdayScenario || !1,
            n = b.isStoryNpc || 0;
        b.coop_flg && (this.coop_flg = b.coop_flg),
            b.archaic_flg && (this.archaic_flg = b.archaic_flg),
            b.casino_flg && (this.casino_flg = b.casino_flg),
            b.archive_flg && (this.archive_flg = b.archive_flg);
        var o = b.skyScenarioController || !1,
            p = b.isDefendOrder || !1,
            q = b.isSolotreasure || !1,
            r = b.isEventScene || !1,
            s = "",
            t = "",
            u = b.isArchiveNpc || !1,
            v = b.questId || 0,
            w = b.currentLocationId || null,
            x = b.questType || null;
        1 == this.coop_flg ? this.scenarioCollection = new d : 1 == this.archaic_flg ? this.scenarioCollection = new e : 2 == this.archaic_flg ? this.scenarioCollection = new f : 3 == this.archaic_flg ? this.scenarioCollection = new g : this.casino_flg ? this.scenarioCollection = new h : this.archive_flg ? this.scenarioCollection = new i : (this.scenarioCollection = new c, j && (this.scenarioCollection.url = Game.baseUri + "npc/season_event_scenario/"),
            q && (t = b.eventModuleName, this.scenarioCollection.url = Game.baseUri + t + "/quest/scenario/"),
            r && (t = b.eventModuleName, s = b.eventController, this.scenarioCollection.url = Game.baseUri + t + "/" + s + "/scenario/"),
            4 === this.archaic_flg && (this.scenarioCollection.url = Game.baseUri + "archaic/seraphic/scenario/"),
            l && (this.scenarioCollection.url = Game.baseUri + "quest/scenario_campaign/"),
            m && (this.scenarioCollection.url = Game.baseUri + "archive/scenario_birthday/"),
            o && (this.scenarioCollection.url = Game.baseUri + "sky/" + o + "/scenario/"),
            p && (this.scenarioCollection.url = Game.baseUri + "defendorder/island/scenario/"),
            null !== w && null !== x && (this.scenarioCollection.url = Game.baseUri + "quest/scenario_epilogue/" + v + "/" + w + "/" + x + "/"),
            u && (this.scenarioCollection.url = Game.baseUri + "quest/scenario_archive/" + v + "/")),
            this.imageDownloadCompleted = !1,
            this.listenTo(this.scenarioCollection, "reset", function () {
            var b = a.clone(this.scenarioCollection.at(0).get("scenario"));
            b && (Game.isReceivedSeasonMessageItem = this.scenarioCollection.at(0).get("popup"),
                this.scenarioCollection.set(b)),
                this.image_download()
        }),
            this.scene_id = b.scene_id,
            this.forwardFlg = b.forwardFlg,
            this.areaId = b.areaId,
            this.completedQuestId = b.completed_quest_id,
            this.locationId = b.location_id,
            this.forceFirststoryPlay = b.forceFirststoryPlay,
            this.nextNumbersId = b.nextNumbersId,
            this.sex = $(this.el).data("sex"),
            this.branch_npcs = b.branch_npcs || null,
            this.open_scene_hash = null,
            this.isTutorialScene = b.isTutorialScene || !1,
            this.baseUrl = this.scenarioCollection.url;
        var y = this.scenarioCollection.url + this.scene_id;
        this.seasonEventParam = "",
            j && (this.seasonEventParam = "/" + b.isStoryNpc + "/" + j + "/" + b.viewCount + "/" + k, y += this.seasonEventParam),
            l && (y = y + "/" + n + "/" + l), m && (y = y + "/" + n), null != this.branch_npcs && (y = y + "/" + this.branch_npcs),
            this.forceFirststoryPlay && (y = null != this.branch_npcs ? y + "/" + this.forceFirststoryPlay : y + "/0/" + this.forceFirststoryPlay),
            this.scenarioCollection.url = y,
            this.scenarioCollection.fetch({reset: !0}),
            this.$char1 = $("#char1"),
            this.$char2 = $("#char2"),
            this.$char3 = $("#char3"),
            this.$char1.hide(),
            this.$char2.hide(),
            this.$char3.hide(),
            this.$bg1 = $("#bg1"),
            this.$bg2 = $("#bg2"),
            this.$bg1.hide(),
            this.$bg2.hide(),
            this.scenario_index = 0,
            this.next_scenario_index = 0,
            this.sel_next1 = "",
            this.sel_next2 = "",
            this.sel_next3 = "",
            this.sel_next4 = "",
            this.hasResponseChoices = !1, this.scenes = new Array
    }, setEventSceneSkipView: function (a) {
        this.eventSceneSkipView = a
    }, start: function () {

        this.delegateEvents(this.events), this.trigger("loadEnd"), this.scenario_execute(this.scenario_index, !0), w.once("complete", function () {
        });
        var b = a.filter(a.uniq(a.map(this.scenarioCollection.models, function (a) {
            return a.get("bgm")
        })), a.identity),
        c = a.filter(a.uniq(a.map(this.scenarioCollection.models, function (a) {
            return a.get("se")
        })), a.identity);
        a.filter(a.uniq(a.map(this.scenarioCollection.models, function (a) {
            return a.get("voice")
        })), a.identity);
        w.loadFiles(a.union(b, c))
    }, next: function (a) {
        var b = this, c = function () {
        };
        this.isForcefulNext || b._clearSceneTimeoutID(), b._clearNextSetTimeout();
        var d = this.scenarioCollection.at(this.scenario_index);
        if ("" == d.get("sel1_txt") && "" == d.get("sel2_txt") && "" == d.get("sel3_txt") && "" == d.get("sel4_txt") && d.get("sel_next1") && d.get("sel_next2") && d.get("sel_next3") && d.get("sel_next4") && (0 == this.sex ? this.scenario_index = d.get("sel_next1") - 1 : this.scenario_index = d.get("sel_next2") - 1),
            this.imageDownloadCompleted && "none" == $(".ico-cursor-talk").css("display"))this.scenario_execute(this.scenario_index, !1, null, !0);
        else if (this.imageDownloadCompleted && "block" == $(".ico-cursor-talk").css("display") && this.hasResponseChoices)this.scenario_execute(this.scenario_index, !1, !0, !0);
        else if (this.imageDownloadCompleted && "block" == $(".ico-cursor-talk").css("display"))if (this.isVibrateCharStopNext && (this.isVibrateCharStopSoon = !0, this.isVibrateCharStopNext = !1), this.isVibrateBgStopNext && (this.isVibrateBgStopSoon = !0, this.isVibrateBgStopNext = !1),
        c = function () {
            "mute" != a && x.playNextSceneSE(), b.isForcefulNext && (b.isForcefulNext = !1, b._clearSceneTimeoutID()),
                b.scenario_index++, b.scenario_execute(b.scenario_index, !0, null, !0)
        },
            this.isTutorialScene === !0 && this.tutorialTempNameStatus === C[1]) {
            var e = function (a) {
                b.tutorialTempNameStatus = C[2], b.setNicknameFont(), b.tutorialInputtedName = a, c()
            };
            this.trigger("shouldPopInputName", e)
        } else c()
    }, _clearSceneTimeoutID: function () {
        B && window.clearTimeout(B)
    }, selNext1: function () {
        this.scenario_index = this.sel_next1 - 1, this.next("mute"), $(".btn-skip").show()
    }, selNext2: function () {
        this.scenario_index = this.sel_next2 - 1, this.next("mute"), $(".btn-skip").show()
    }, selNext3: function () {
        this.scenario_index = this.sel_next3 - 1, this.next("mute"), $(".btn-skip").show()
    }, selNext4: function () {
        this.scenario_index = this.sel_next4 - 1, this.next("mute"), $(".btn-skip").show()
    }, end: function () {
        cjs.stage.sceneEffect && cjs.stage.sceneEffect.removeAllEventListeners("tick"), cjs.stage.scenePrivate && cjs.stage.scenePrivate.removeAllEventListeners("tick"), this.open_scene_hash ? (this.content_close(), b.history.navigate(this.open_scene_hash.join("/"), !0)) : this.fowardTo(this.forwardFlg, this.areaId, this.completedQuestId, this.locationId, null, this.nextNumbersId)
    }, click_on: function () {
        this.delegateEvents()
    }, click_off: function () {
        this.$el.off("tap")
    }, image_download: function () {
        var b = this, c = [];

        this.scenarioCollection.each(function (d, e) {
            d.get("synopsis") && b.eventSceneSkipView.setSynopsis(d.get("chapter_name"),
                d.get("synopsis")),
                a(["charcter1_big_image", "charcter1_small_image", "charcter2_big_image", "charcter2_small_image", "charcter3_big_image", "charcter3_small_image", "bg1", "bg2"]).each(function (a) {
                var e = d.get(a);
                //console.info(e);
                b.isNotEmpty(e) && c.push(e)
            })
        });
        var d = new j;
        d._queueArr = [], d._registerArr = [], d._successArr = [], d._errorArr = [], d._isStarted = !1, d._isRunning = !1, d._isFinished = !1, d._currentQueues = [], d._queueCount = 0;
        for (var e = 0; e < c.length; e++)c[e] && d.add(Game.imgUri + c[e]);
        d.onComplete = function (a) {
            b.imageDownloadCompleted = !0, z.isJapanese() && b.webfontSet(b.scene_id), b.start()
        }, a.isEmpty(d._registerArr) ? d.onComplete() : d.start()
    }, scenario_execute: function (b, c, d, e) {

        var f = this;
        c && 0 !== this.next_scenario_index && (b = this.scenario_index = this.next_scenario_index, this.next_scenario_index = 0);
        var g = this.scenarioCollection.at(b);
        if (b == this.scenarioCollection.length)return void this.end();
        if (g) {
            if ("undefined" != typeof g.get("open_scene_file") && g.get("open_scene_file") && this.open_scene(g),
                "undefined" != typeof g.get("next_scene_file") && "" != g.get("next_scene_file"))return this.next_scene(g),
                void this._clearNextSetTimeout();
            "" != g.get("next") && (this.next_scenario_index = g.get("next")),
                this.sel_next1 = g.get("sel_next1"),
                this.sel_next2 = g.get("sel_next2"),
                this.sel_next3 = g.get("sel_next3"),
                this.sel_next4 = g.get("sel_next4"),
                "undefined" != typeof this.sel_next1 && "" !== this.sel_next1 && (this.hasResponseChoices = !0);
            var h = $("#scene_fast_text_mode").data("scene-fast-text-mode");
            if (h = "off" === h ? !0 : !1, y.isShellAppAndroid() && (h = !0), this._initAutoNext(), d === !0) {
                var i = g.get("se");
                return i && this.se_delay && x.playSE(i), void this._playEventSceneTalk(g, h ? c : !1, !0)
            }
            if (this._playEventSceneTalk(g, h ? c : !1), (e || 0 == c) && this.charaList.forEach(function (a) {
                -1 != ["L-slidein", "L-slideout", "R-slidein", "R-slideout", "T-slidein", "T-slideout", "B-slidein", "B-slideout"].indexOf(a.command) && a.chara_obj.stop(!0, !0)
            }), 0 == c)return void(this.charaList = []);
            if (-1 == $.inArray(g.id, this.scenes)) {
                this.scenes.push(g.id);
                var j = new n;
                this.addSubView(j), j.append(g)
            }
            var k = [];
            a(3).times(function (a) {
                var b = a + 1, c = {name: g.get("charcter" + b + "_name"), big_image: g.get("charcter" + b + "_big_image"), small_image: g.get("charcter" + b + "_small_image"), position: g.get("charcter" + b + "_position"), command: g.get("command" + b), effect: g.get("effect" + b), chara_obj: f["$char" + b]};
                f.char_setting(f["$char" + b], c), k.push(c), f.charaList.push(c)
            });
            var l = +this._getNextParameter(k);
            l && this._clearNextDeferred();
            var m = {name: "&nbsp;"};
            if (this.isNotEmpty(k[0].name) && (m = k[0]), f.bg_setting(f.$bg1, {image: g.get("bg1")}), f.$bg1.show(), f.bg_setting(f.$bg2, {image: g.get("bg2")}), this.isTutorialScene === !0 && !a.isEmpty(this.tutorialInputtedName) && this.tutorialTempNameStatus === C[2] || this.shouldReplaceTempName === !0) {
                var o = this.shouldReplaceTempName === !0 ? this.$el.data("nick-name") : this.tutorialInputtedName;
                m.name = m.name.replace("<span class='nickname'></span>", o)
            }
            this.$(".txt-character-name").html("<span>" + m.name + "</span>"), f.se_delay = !1, a.each(k, function (a, b) {
                "play_se_choices" == a.command && (f.se_delay = !0)
            });
            var p, i;
            p = g.get("bgm"), p && x.playBGM(p), i = g.get("se"), i && !f.se_delay && x.playSE(i), x.stopVoice();
            var q = g.get("voice") || "";
            if (this._playVoice(q), !Game.setting.effect_mode || w.isSupportedHTMLAudio() && !w.isSupportedWebAudio() && !w.isSupportedNativeAudio()) {
                var r = this.$el.find(".btn-play-voice");
                "silent" == q && (q = ""), r.attr("data-voice", q);
                var s = q && m.name && !m.name.match(/^[\s　]$/) ? "block" : "none";
                r.css("display", s)
            }
            var t = this.scenarioCollection.at(b + 1);
            t && (p = t.get("bgm"), p && x.loadBGM(p), i = t.get("se"), i && x.loadSE(i), q = t.get("voice"), q && x.loadVoice(q))
        }
    }, open_scene: function (b) {
        var c = this, d = b.get("open_scene_file"), e = location.hash.split("/");
        this.open_scene_hash = e, a.each(e, function (a, b) {
            "scene_" == a.substr(0, 6) && (c.open_scene_hash[b] = d)
        }), this.eventSceneSkipView.setOpenScene(this.open_scene_hash.join("/"))
    }, next_scene: function (b) {
        var c = b.get("next_scene_file");
        this.scene_id = c, this.scenarioCollection.url = this.baseUrl + this.scene_id, a.isEmpty(this.seasonEventParam) || (this.scenarioCollection.url = this.scenarioCollection.url + this.seasonEventParam), null != this.branch_npcs && (this.scenarioCollection.url = this.scenarioCollection.url + "/" + this.branch_npcs), this.scenario_index = 0, this.next_scenario_index = 0, this.scenarioCollection.fetch({reset: !0}), this.scenes = [], this.trigger("xhrStart")
    }, _getNextParameter: function (b) {
        var c = this, d = 0;
        return a(b).each(function (a) {
            if ("next" === c.getCommand(a.command)) {
                var b = c.getParam(a.command);
                d = b[0] ? b : d
            }
        }), d
    }, _initAutoNext: function (a) {
        var b = this, c = $.Deferred(), d = $.Deferred();
        this.voiceDeferred = c, this.EventSceneTalkDeferred = d, $.when(c, d).done(function () {
            b._clearNextSetTimeout(), y.isShellAppAndroid() || 0 !== Game.setting.effect_mode && ($("#btn-auto").hasClass("off") || (A = window.setTimeout(function () {
                b._canTapCanvas() && b.next()
            }, 800)))
        })
    }, _canTapCanvas: function () {
        return"none" === $(".prt-sel-area").css("display")
    }, _clearNextDeferred: function () {
        this.voiceDeferred.reject(), this.EventSceneTalkDeferred.reject(), this._clearNextSetTimeout()
    }, _clearNextSetTimeout: function () {
        A && window.clearTimeout(A)
    }, _playVoice: function (a) {
        var b = this;
        a && "silent" !== a ? y.isShellAppAndroid() ? (b.voiceDeferred.resolve(), x.playVoice(a)) : 0 === Game.setting.sound_flag ? b.voiceDeferred.resolve() : (x.playVoice(a), w.once(a, "complete", function (a) {
            b.voiceDeferred.resolve()
        })) : b.voiceDeferred.resolve()
    }, _playEventSceneTalk: function (b, c, d) {
        var e = this, f = [], g = new m, h = b.get("detail");
        if (this.addSubView(g), this._scenario_execute_exception(b), this.listenToOnce(g, "talkEnd", function (a) {
            e.EventSceneTalkDeferred.resolve()
        }), d === !0 && (f = [b.get("sel1_txt"), b.get("sel2_txt"), b.get("sel3_txt"), b.get("sel4_txt")], this.hasResponseChoices = !1), this.isTutorialScene === !0 && !a.isEmpty(this.tutorialInputtedName) && this.tutorialTempNameStatus === C[2] || this.shouldReplaceTempName === !0) {
            var i = this.shouldReplaceTempName === !0 ? this.$el.data("nick-name") : this.tutorialInputtedName;
            h = h.replace("<span class='nickname'></span>", i)
        }
        g.render(h, c, f)
    }, _scenario_execute_exception: function (a) {
        var b = this.scenarioCollection.length, c = Number(a.get("id")), d = this.scene_id;
        "scene_fate_chr080_ep1" == d && 47 == b && 44 == c && this._initItem(a), "scene_fate_chr026_ep1" == d && 52 == b && 49 == c && this._initItem(a), "scene_fate_chr012_ep1" == d && 36 == b && 33 == c && this._initItem(a), "scene_fate_chr064_ep1" == d && 35 == b && 32 == c && this._initItem(a)
    }, _initItem: function (a) {
        a.attributes.sel1_txt = "", a.attributes.sel2_txt = "", a.attributes.sel3_txt = "", a.attributes.sel4_txt = "", a.attributes.sel_next1 = "", a.attributes.sel_next2 = "", a.attributes.sel_next3 = "", a.attributes.sel_next4 = ""
    }, bg_setting: function (a, b) {
        b.image && a.attr("src", Game.imgUri + b.image)
    }, char_setting: function (a, b) {
        this.isNotEmpty(b.big_image) && a.attr("src", Game.imgUri + b.big_image);
        var c = 0;
        if (b.position)switch (b.position) {
            case"R":
                c = 60;
                break;
            case"C":
                c = -0;
                break;
            case"L":
                c = -60;
                break;
            case"R2":
                c = 70;
                break;
            case"L2":
                c = -70
        }
        this.command(a, b, c)
    }, command: function (a, b, c) {
        var d = this, e = "0px", f = this.getParam(b.command);
        if (this.timerId = 0, b.command)switch (this.getCommand(b.command)) {
            case"L-slidein":
                a.css("opacity", 1), a.css("z-index", 2), a.hide(), a.css("left", -1 * parseInt(a.css("width")) + "px"), a.show(), a.animate({top: e, left: c + "px"}, 300, function () {
                    d.effect(a, b)
                });
                break;
            case"L-slideout":
                a.animate({top: e, left: -1 * parseInt(a.css("width")) + "px"}, 1e3, function () {
                    a.hide()
                });
                break;
            case"R-slidein":
                a.css("opacity", 1), a.css("z-index", 2), a.hide(), a.css("left", 1 * parseInt(a.css("width")) + "px"), a.show(), a.animate({top: e, left: c + "px"}, 300, function () {
                    d.effect(a, b)
                });
                break;
            case"R-slideout":
                a.animate({top: e, left: 1 * parseInt(a.css("width")) + "px"}, 1e3, function () {
                    a.hide()
                });
                break;
            case"T-slidein":
                a.css("opacity", 1), a.css("z-index", 2), a.hide(), a.css("top", -1 * parseInt(a.css("height")) + "px"), a.show(), a.animate({top: e, left: c}, 300, function () {
                    d.effect(a, b)
                });
                break;
            case"T-slideout":
                a.animate({top: -1 * parseInt(a.css("height")) + "px", left: c}, 300, function () {
                    a.hide()
                });
                break;
            case"B-slidein":
                a.css("opacity", 1), a.css("z-index", 2), a.hide(), a.css("top", parseInt(a.css("height")) + "px"), a.show(), a.animate({top: e, left: c}, 300, function () {
                    d.effect(a, b)
                });
                break;
            case"B-slideout":
                a.animate({top: parseInt(a.css("height")) + "px", left: c}, 300, function () {
                    a.hide()
                });
                break;
            case"fadein":
                a.css("opacity", 1), a.css("z-index", 2), a.hide(), a.animate({top: e, left: c + "px"}, 0, function () {
                    d.effect(a, b)
                }), a.hide(), a.fadeIn(300);
                break;
            case"fadeout":
                a.fadeOut(300);
                break;
            case"vague":
                a.css("z-index", 1), a.css("opacity", .5);
                break;
            case"worsen":
                a.css("z-index", 1);
                break;
            case"color_start":
                this.colorChange($(".onm-effect-layer"), f[0], f[1], f[2], f[3]);
                break;
            case"color_end":
                $(".onm-effect-layer").css({"background-color": "transparent"});
                break;
            case"color_fadein":
                this.colorFade($(".onm-effect-layer"), f[0], f[1], f[2], f[3], f[4]);
                break;
            case"color_fadeout":
                $(".onm-effect-layer").css({"background-color": "transparent"}).oneTransitionEnd(function () {
                    $(this).removeClass("trans").attr("style", "").off("transitionend webkitTransitionEnd")
                }, 1100);
                break;
            case"initialize":
                this.initializeEffect();
                break;
            case"vibrate":
                this.addEffect($(".prt-scene-stage"), "shake-regular", "0.18s", f[0]);
                break;
            case"vibrate_loop_start":
                var g = f[0] || 0;
                this.startVibrateLoop($(".prt-scene-stage"), 180, g);
                break;
            case"vibrate_loop_end":
                this.stopVibrateLoop($(".prt-scene-stage"));
                break;
            case"flash":
                this.addEffect($(".onm-effect-layer"), "to-white-start", "0.5s", "1");
                break;
            case"jump":
                a.css({top: "10px"}).animate({top: "-25px"}, 110).animate({top: "10px"}, 110).animate({top: "0px"}, 30);
                break;
            case"jump_loop_start":
                this.addEffect(a, "jump-full", "0.25s", "infinite");
                break;
            case"jump_loop_end":
                this.removeEffect(a, "jump-full");
                break;
            case"char_vibrate":
                this.vibrate_regular(a, 180, 10, 0);
                break;
            case"char_vibrate_one":
                this.vibrate_regular(a, 180, 10, 1);
                break;
            case"bg_vibrate":
                this.vibrate_bg($(".prt-scene-bg"), 180, 10, 0);
                break;
            case"bg_vibrate_one":
                this.vibrate_bg($(".prt-scene-bg"), 180, 10, 1);
                break;
            case"phit_sw_0002":
                this.effectCjs && this.effectCjs.removeChildren();
                var h = 240 + 2 * c;
                this.effectCjs = new o({posX: h});
                break;
            case"ehit_0001":
                this.effectCjs && this.effectCjs.removeChildren();
                var h = 330 + 2 * c;
                this.effectCjs = new p({posX: h});
                break;
            case"ab_3000":
                this.effectCjs && this.effectCjs.removeChildren();
                var h = 340 + 2 * c;
                this.effectCjs = new q({posX: h});
                break;
            case"blackin":
                null == this.effectCjs ? this.effectCjs = new r({motion: "fadein"}) : "fadeCjs" != this.effectCjs.identifier ? (this.effectCjs.removeChildren(), this.effectCjs = new r({motion: "fadein"})) : this.effectCjs.motionCall("fadein");
                break;
            case"blackout":
                null == this.effectCjs ? this.effectCjs = new r({motion: "fadeout"}) : "fadeCjs" != this.effectCjs.identifier ? (this.effectCjs.removeChildren(), this.effectCjs = new r({motion: "fadeout"})) : this.effectCjs.motionCall("fadeout");
                break;
            case"sceneCjs":
                this.effectCjs && (this.effectCjs = null);
                var i = f[1] || 12;
                this.effectCjs = new t({scene_id: this.scene_id, motion: f[0], label: 5, fpsNum: i});
                break;
            case"cjsLoad":
                this.effectCjs && (this.effectCjs = null), this.effectCjs = new s({load: f[0], label: 5});
                break;
            case"cjsEncount":
                $("#btn-auto").remove(), $(".ico-cursor-talk").show(), this.effectCjs && (this.effectCjs = null), $("#cjs-scene-effect").siblings().hide(), this.effectCjs = new s({load: f[0]});
                break;
            case"cjsEncountAssignImage":
                $("#btn-auto").remove(), $(".ico-cursor-talk").show(), this.effectCjs && (this.effectCjs = null), $("#cjs-scene-effect").siblings().hide(), this.effectCjs = new u({load: f[0]});
                break;
            case"cjsDelete":
                this.effectCjs && this.effectCjs.removeChildren();
                break;
            case"inputTemporaryName":
                this.isTutorialScene === !0 ? this.tutorialTempNameStatus = C[1] : this.shouldReplaceTempName = !0;
                break;
            case"next":
                B = setTimeout(function () {
                    d.next("mute")
                }, 1e3 * f[0]);
                break;
            case"next_forceful":
                this.isForcefulNext = !0, B = setTimeout(function () {
                    d.isForcefulNext = !1, d.next("mute")
                }, 1e3 * f[0])
        }
    }, effect: function (a, b) {
        if (b.effect)switch (b.effect) {
            case"up_and_down":
                a.addClass("up_and_down")
        }
    }, initializeEffect: function () {
        $(".prt-scene-stage").removeClass().addClass("prt-scene-stage"), $(".onm-effect-layer").removeClass().addClass("onm-effect-layer"), $(".prt-scene-bg").removeClass().addClass("prt-scene-bg"), $(".img-scene-character").removeClass().addClass("img-scene-character")
    }, vibrate_regular: function (a, b, c, d) {
        var e = this, f = 0, g = b / 5;
        this.isVibrateCharStopSoon = !1;
        var h = setInterval(function () {
            setTimeout(function () {
                e.vibrateStyle(a, g, "2px")
            }, 4 * g), setTimeout(function () {
                e.vibrateStyle(a, g, "-2px")
            }, 3 * g), setTimeout(function () {
                e.vibrateStyle(a, g, "2px")
            }, 2 * g), setTimeout(function () {
                e.vibrateStyle(a, g, "-2px")
            }, g), e.vibrateStyle(a, g, "2px"), f++, (f > c || e.isVibrateCharStopSoon) && (setTimeout(function () {
                e.vibrateStyle(a, 1, 0), e.isVibrateCharStopSoon = !1
            }, 5 * g), clearInterval(h))
        }, b);
        1 == d && (this.isVibrateCharStopNext = !0)
    }, vibrate_bg: function (a, b, c, d) {
        var e = this, f = 0, g = b / 5;
        this.isVibrateBgStopSoon = !1;
        var h = setInterval(function () {
            setTimeout(function () {
                e.vibrateStyle(a, g, "2px")
            }, 4 * g), setTimeout(function () {
                e.vibrateStyle(a, g, "-2px")
            }, 3 * g), setTimeout(function () {
                e.vibrateStyle(a, g, "2px")
            }, 2 * g), setTimeout(function () {
                e.vibrateStyle(a, g, "-2px")
            }, g), e.vibrateStyle(a, g, "2px"), f++, (f > c || e.isVibrateBgStopSoon) && (setTimeout(function () {
                e.vibrateStyle(a, 1, 0), e.isVibrateBgStopSoon = !1
            }, 5 * g), clearInterval(h))
        }, b);
        1 == d && (this.isVibrateBgStopNext = !0)
    }, vibrateStyle: function (a, b, c) {
        a.css({"-webkit-transition-property": "-webkit-transform", "-webkit-transition-duration": b, "-webkit-transform": "translateX(" + c + ")", "transition-property": "transform", "transition-duration": b, transform: "translateX(" + c + ")"})
    }, startVibrateLoop: function (a, b, c) {
        var d = this, e = 0, f = b / 4;
        this.isLoopVibrateY = !0;
        var g = function () {
            d.isLoopVibrateY && (setTimeout(function () {
                0 !== c && e == c ? d.stopVibrateLoop() : (e++, g())
            }, b), setTimeout(function () {
                d.vibrateStyleY(a, f, "-1px")
            }, 3 * f), setTimeout(function () {
                d.vibrateStyleY(a, f, "1px")
            }, 2 * f), setTimeout(function () {
                d.vibrateStyleY(a, f, "-1px")
            }, f), d.vibrateStyleY(a, f, "1px"))
        };
        g()
    }, stopVibrateLoop: function (a) {
        this.isLoopVibrateY = !1, this.vibrateStyleY(a, 0, "0px")
    }, vibrateStyleY: function (a, b, c) {
        this.isLoopVibrateY || (b = 0, c = "0px"), a.css({"-webkit-transition-property": "-webkit-transform", "-webkit-transition-duration": b, "-webkit-transform": "translateY(" + c + ")", "transition-property": "transform", "transition-duration": b, transform: "translateY(" + c + ")"})
    }, addEffect: function (a, b, c, d) {
        var e = c.replace(/s/g, ""), f = 1e3 * +e, g = a;
        g.addClass(b).css({"animation-duration": c, "-webkit-animation-duration": c, "animation-iteration-count": d, "-webkit-animation-iteration-count": d}).oneAnimationEnd(function () {
            $(this).removeClass(b).css("-webkit-animation", "")
        }, f + 100)
    }, removeEffect: function (a, b) {
        var c = a;
        c.removeClass(b).css("-webkit-animation", "")
    }, colorChange: function (a, b, c, d, e) {
        var f = a;
        f.css({"background-color": "rgba(" + b + "," + c + "," + d + "," + e + ")"})
    }, colorFade: function (a, b, c, d, e, f) {
        var g = a;
        g.addClass("trans").css({"background-color": "rgba(" + b + "," + c + "," + d + "," + e + ")", "transition-duration": f, "-webkit-transition-duration": f})
    }, getCommand: function (a) {
        var b = a.indexOf("(");
        if (-1 === b)return a;
        var c = a.substring(0, b);
        return c
    }, getParam: function (a) {
        var b = a.indexOf("(");
        if (-1 === b)return Array;
        var c = a.substring(b + 1, a.length - 1), d = c.split(",");
        return d
    }, webfontSet: function (a) {
        var b = "@font-face {font-family: " + a + ";src: url(" + Game.fontUri + "/scene/" + a + ".woff);}", c = document.styleSheets[0], d = c.cssRules.length;
        c.insertRule(b, d), this.$el.find(".prt-scene-comment").add(".prt-log-display").css("font-family", "nickname_scene, " + a + ', "FOT-ニューシネマA Std D", "Average Sans", sans-serif')
    }, setNicknameFont: function () {
        var a = "@font-face{font-family: nickname_scene; src: url(" + Game.baseUri + "/user/scene_nickname.woff);}", b = document.styleSheets[0], c = b.cssRules.length;
        b.insertRule(a, c)
    }, playButtonVoice: function (a) {
        a.stopPropagation();
        var b = $(a.currentTarget).attr("data-voice");
        x.playVoice(b, {force: !0})
    }, dummyButtonVoice: function () {
        this.$el.find(".prt-scene-comment .btn-play-voice").trigger("tap")
    }});
    return D
});