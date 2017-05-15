define(['underscore','view/content', "view/quest/abstract-view","collection/quest/scenario-collection","loadmanager", "view/quest/scenario-talk-view"],function(_, Content, abstractVview, scenarioCollection,loadManager, ScenarioTalkView){
    var scenarioTimer = null;
    var content =   abstractVview.extend({
        events: {"tap .prt-message-area": "next","tap #btn-auto":"toggleAuto"},
        toggleAuto:function(e) {
            console.info(e);
            $('#btn-auto').toggleClass('on');
            $('#btn-auto').toggleClass('off');
        },
        initialize: function (option) {
            this.scenarioCollection = new scenarioCollection;


            this.scenario_index = 0;
            this.listenTo(this.scenarioCollection, "reset", function () {
                this.image_download();
            });
            this.scenarioCollection.fetch({reset: !0});
            this.imageDownloadCompleted = false;



        },
        next: function (a) {
            var_this = this, c = function () {
            };
            //this.isForcefulNext || this._clearSceneTimeoutID(),this._clearNextSetTimeout();
            //var d = this.scenarioCollection.at(this.scenario_index);
            if ( this.imageDownloadCompleted && "none" == $(".ico-cursor-talk").css("display")) {
                this.scenario_execute(this.scenario_index, false, null, !0);
                return;
            };
            //this.isVibrateCharStopNext && (this.isVibrateCharStopSoon = !0, this.isVibrateCharStopNext = !1),
            //this.isVibrateBgStopNext && (this.isVibrateBgStopSoon = !0, this.isVibrateBgStopNext = !1),
            //"mute" != a && x.playNextSceneSE();
            //b.isForcefulNext && (b.isForcefulNext = !1, b._clearSceneTimeoutID());
            this.scenario_index++,
            this.scenario_execute(this.scenario_index, !0, null, !0);
        },
        start: function () {
            console.info('start',this.scenario_index);
            this.delegateEvents(this.events),
                this.trigger("loadEnd"),
                this.scenario_execute(this.scenario_index, !0);
        },
        end:function() {
            alert('end');
        },
        scenario_execute: function (scenario_index/*b*/, typing/*c*/, d, e) {

            var f = this;

            //force && 0 !== this.next_scenario_index && (scenario_index = this.scenario_index = this.next_scenario_index, this.next_scenario_index = 0);
            var thisScenario = this.scenarioCollection.at(scenario_index);
            console.info(scenario_index);
            if (scenario_index >= this.scenarioCollection.length)return void this.end();
            if (thisScenario) {
                if ("undefined" != typeof thisScenario.get("open_scene_file") && thisScenario.get("open_scene_file") && this.open_scene(thisScenariog),
                    "undefined" != typeof thisScenario.get("next_scene_file") && "" != thisScenario.get("next_scene_file"))return this.next_scene(thisScenario),
                    void this._clearNextSetTimeout();
                "" != thisScenario.get("next") && (this.next_scenario_index = thisScenario.get("next")),
                    this.sel_next1 = thisScenario.get("sel_next1"),
                    this.sel_next2 = thisScenario.get("sel_next2"),
                    this.sel_next3 = thisScenario.get("sel_next3"),
                    this.sel_next4 = thisScenario.get("sel_next4"),
                    "undefined" != typeof this.sel_next1 && "" !== this.sel_next1 && (this.hasResponseChoices = !0);
                var h = $("#scene_fast_text_mode").data("scene-fast-text-mode");
                this._initAutoNext();
//                if (h = "off" === h ? !0 : !1, y.isShellAppAndroid() && (h = !0), this._initAutoNext(), d === !0) {
//                    var i = g.get("se");
//                    return i && this.se_delay && x.playSE(i), void this._playEventSceneTalk(g, h ? c : !1, !0)
//                }
                this._playEventSceneTalk(thisScenario, typing);
                if (!typing) {
                    return;
                }
                var characterConfig = {
                    name: thisScenario.get('character_name'),
                    big_img: thisScenario.get('big_img'),
                    command: thisScenario.get('command'),
                    position: thisScenario.get('position'),
                    effect: thisScenario.get('effect'),
                    chara_obj: this.$char
                };
                this.char_setting($("#char-img"), characterConfig);
                $('.character-name').html("<span>" + thisScenario.get('character_name') + "</span>");
                this._playVoice();
                return;
                (e || 0 == typing) && this.charaList.forEach(function (a) {
                    -1 != ["L-slidein", "L-slideout", "R-slidein", "R-slideout", "T-slidein", "T-slideout", "B-slidein", "B-slideout"].indexOf(a.command) && a.chara_obj.stop(!0, !0)
                });
                if ( 0 == c)return void(this.charaList = []);
                if (-1 == $.inArray(g.id, this.scenes)) {
                    this.scenes.push(g.id);
                    var j = new n;
                    this.addSubView(j), j.append(g)
                }
                var k = [];
//                a(3).times(function (a) {
//                    var b = a + 1, c = {name: g.get("charcter" + b + "_name"), big_image: g.get("charcter" + b + "_big_image"), small_image: g.get("charcter" + b + "_small_image"), position: g.get("charcter" + b + "_position"), command: g.get("command" + b), effect: g.get("effect" + b), chara_obj: f["$char" + b]};
//                    f.char_setting(f["$char" + b], c), k.push(c), f.charaList.push(c)
//                });
                var l = +this._getNextParameter(k);
                l && this._clearNextDeferred();
                var m = {name: "&nbsp;"};
                if (this.isNotEmpty(k[0].name) && (m = k[0]), f.bg_setting(f.$bg1, {image: g.get("bg1")}), f.$bg1.show(), f.bg_setting(f.$bg2, {image: g.get("bg2")}), this.isTutorialScene === !0 && !a.isEmpty(this.tutorialInputtedName) && this.tutorialTempNameStatus === C[2] || this.shouldReplaceTempName === !0) {
                    var o = this.shouldReplaceTempName === !0 ? this.$el.data("nick-name") : this.tutorialInputtedName;
                    m.name = m.name.replace("<span class='nickname'></span>", o)
                };

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
        }, _playEventSceneTalk: function (json/*b*/, typeing, d) {

            var _this = this, f = [], eventSceneTalkView = new ScenarioTalkView, talkText = json.get("detail");
            this.addSubView(eventSceneTalkView);
            //this._scenario_execute_exception(b);
            this.listenToOnce(eventSceneTalkView, "talkEnd", function () {
                _this.EventSceneTalkDeferred.resolve()
            });

//        if (   d === !0 && (f = [b.get("sel1_txt"), b.get("sel2_txt"), b.get("sel3_txt"), b.get("sel4_txt")], this.hasResponseChoices = !1), this.isTutorialScene === !0 && !a.isEmpty(this.tutorialInputtedName) && this.tutorialTempNameStatus === C[2] || this.shouldReplaceTempName === !0) {
//            var i = this.shouldReplaceTempName === !0 ? this.$el.data("nick-name") : this.tutorialInputtedName;
//            h = h.replace("<span class='nickname'></span>", i)
//        }
            eventSceneTalkView.render(talkText, typeing, f);
        },
        effect: function (a, b) {
            if (b.effect)switch (b.effect) {
                case"up_and_down":
                    a.addClass("up_and_down")
            }
        },
        _playVoice: function (a) {
            var _this = this;
            this.voiceDeferred.resolve();
//            a && "silent" !== a ? y.isShellAppAndroid() ? (b.voiceDeferred.resolve(), x.playVoice(a)) : 0 === Game.setting.sound_flag ? b.voiceDeferred.resolve() : (x.playVoice(a), w.once(a, "complete", function (a) {
//                b.voiceDeferred.resolve()
//            })) : b.voiceDeferred.resolve()
        },
        _clearNextSetTimeout: function () {
            scenarioTimer && window.clearTimeout(scenarioTimer)
        },
        _initAutoNext: function (a) {
            var _this = this, c = $.Deferred(), d = $.Deferred();
            this.voiceDeferred = $.Deferred(),
            this.EventSceneTalkDeferred =  $.Deferred(),
            $.when(this.voiceDeferred,this.EventSceneTalkDeferred).done(function () {
                _this._clearNextSetTimeout();
                console.info('all done')
                if($("#btn-auto").hasClass("on") ) {
                    console.info('auto next');
                    scenarioTimer = window.setTimeout(function () {
                        _this.next()
                    }, 800);
                }
            })
        },
        char_setting: function (ele, setting) {
            console.info(setting);
            ele.attr("src", Game.imgUri + setting.big_img);
            var c = 0;
            if (setting.position)switch (setting.position) {
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
            this.command(ele, setting, c)
        },
        command: function(obj,setting,c) {
            var _this = this, e = "0px";
            this.timerId = 0;
            if ( setting.command) {
                switch (setting.command) {
                    case"fadein":
                        obj.css("opacity", 1), obj.css("z-index", 2), obj.hide(), obj.animate({top: e, left: c + "px"}, 0, function () {
                            _this.effect(obj, setting)
                        }), obj.hide(), obj.fadeIn(300);
                        break;
                };
            }
        },
        image_download: function() {
            var imgList = [];
            var _this =this;
            this.scenarioCollection.each(function (scenario) {

                if(scenario.get('big_image')!= '') {
                    imgList.push(scenario.get('big_image'));
                }
            });
            var myLoader = new loadManager;
            myLoader._queueArr = [],
                myLoader._registerArr = [],
                myLoader._successArr = [],
                myLoader._errorArr = [],
                myLoader._isStarted = !1,
                myLoader._isRunning = !1,
                myLoader._isFinished = !1,
                myLoader._currentQueues = [],
                myLoader._queueCount = 0;
            for (var e = 0; e < imgList.length; e++) {
                imgList[e] && myLoader.add(Game.imgUri + imgList[e]);
            }
            console.info(imgList);
            myLoader.onComplete = function (a) {
                console.info('myLoader complete')
                _this.imageDownloadCompleted = !0, _this.start()
            }, _.isEmpty(myLoader._registerArr) ? myLoader.onComplete() : myLoader.start()


        }
    });
    return content;
})