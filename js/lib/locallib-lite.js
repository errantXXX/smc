
define('constant', [], function() {
    return {BGM_ALIAS: "bgm",SE_ALIAS: "se",VOICE_ALIAS: "voice",SE_SAMPLE_ALIAS: "sample",VOICE_SAMPLE_ALIAS: "sample",SE_ENHANCE_SUCCESS: "se/success_s_se_1.mp3",SE_ENHANCE_SUCCESS_HIGH: "se/success_l_se_1.mp3",SE_ENHANCE_LEVEL_UP: "se/levelup_arm_se_1.mp3",SE_ENHANCE_GAUGE: "se/gauge_se_1.mp3",SE_ENHANCE_GAUGE_OFFSET: 140,SE_ENHANCE_GAUGE_FREQUENCY: 3,EVENT_ANIMATION_START: "animationstart webkitAnimationStart",EVENT_ANIMATION_END: "animationend webkitAnimationEnd",SE_NEXT_SCENE: "se/serif_se_1.mp3"}
});
define('catalog/ua/sound/webaudio', ["underscore"], function(a) {
    var b = function(b) {
        var c = Game.ua, d = function(a) {
            return a.ua ? a.ua instanceof RegExp ? a.ua.test(c.ua) : c.ua === a.ua : !0
        }, e = function(a) {
            var b = a.device;
            if (!b)
                return !0;
            var d = b.model;
            return d ? c.ua.indexOf(d) >= 0 : !0
        }, f = function(a) {
            var b = a.os;
            if (!b)
                return !0;
            var d = b.name;
            return d ? c.os.name == d : !0
        }, g = function(a) {
            var b = a.os;
            if (!b)
                return !0;
            var d = b.version;
            return d ? c.os.version == d : !0
        }, h = function(a) {
            var b = a.browser;
            if (!b)
                return !0;
            var d = b.name;
            return d ? c.browser.name == d : !0
        };
        return a.some(b, function(a) {
            return d(a) && e(a) && f(a) && g(a) && h(a)
        })
    };
    return {cannotUseWebAudio: function() {
        var a = [{ua: "Mozilla/5.0 (Linux; U; Android 4.4.2; ja-jp; SOL25 Build/17.1.C.0.296) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"}, {ua: new RegExp("Mozilla/5.0 \\(Linux; Android 4.4.2; SOL25 Build/17.1.C.0.296\\) AppleWebKit/537.36 \\(KHTML, like Gecko\\) Chrome/[.0-9]* Mobile Safari/537.36")}, {ua: "Mozilla/5.0 (Linux; U; Android 4.4.2; ja-jp; F-01F Build/V10R22A) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"}, {ua: new RegExp("Mozilla/5.0 \\(Linux; Android 4.4.2; SO-01F Build/14.3.B.0.288\\) AppleWebKit/537.36 \\(KHTML, like Gecko\\) Chrome/[.0-9]* Mobile Safari/537.36")}];
        return b(a)
    },cannotDisconnectWithArguments: function() {
        var a = [{device: {model: "HTL22"},os: {name: "Android"}}, {device: {model: "SO-02E Build/10.3.1.B.0.256"},os: {name: "Android",version: "4.2.2"},browser: {name: "Mobile Safari"}}];
        return b(a)
    },cannotStop: function() {
        var a = [{device: {model: "SC-04E"},os: {name: "Android",version: "4.3"}}];
        return b(a)
    },cannotCreatePanner: function() {
        var a = [{ua: new RegExp("Mozilla/5.0 \\(Linux; U; Android 4.[0-9]+.[0-9]+; ja-jp; SonySO-02F Build/[.0-9a-zA-Z]*\\) AppleWebKit/[.0-9]+ \\(KHTML, like Gecko\\) Version/[.0-9]* Mobile Safari/[.0-9]+")}];
        return !b(a)
    },shouldUseDoublePlaybackRate: function() {
        var a = [{ua: "Mozilla/5.0 (Linux; Android 4.3; ja-jp; SC-04E Build/JSS15J) AppleWebKit/537.36 (KHTML, like Gecko) Version/1.5 Chrome/28.0.1500.94 Mobile Safari/537.36"}];
        return b(a)
    },shouldUseHalfPlaybackRate: function() {
        var a = [{device: {model: "ME173X Build/JDQ39"},os: {name: "Android",version: "4.2.2"},browser: {name: "Chrome"}}];
        return b(a)
    }}
});
define('lib/sound-util', ["catalog/ua/sound/webaudio"], function(a) {
    function b() {
        if (j)
            return j;
        var a, b = document.createElement("audio");
        return b.canPlayType && (a = {}, a.mp3 = !!b.canPlayType("audio/mpeg;").replace(/no/, ""), a.ogg = !!b.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ""), a.wav = !!b.canPlayType('audio/wav; codecs="1"').replace(/no/, ""), a.aac = !!b.canPlayType('audio/mp4; codecs="mp4a.40.2"').replace(/no/, "")), b = null, j = a, a
    }
    function c() {
        return !!b()
    }
    function d() {
        return a.cannotUseWebAudio() ? !1 : window.webkitAudioContext || window.mozAudioContext || window.AudioContext
    }
    function e(a) {
        switch (a) {
            case "mp3":
                return "audio/mpeg";
            case "ogg":
                return "audio/ogg";
            case "wav":
                return "audio/wav";
            case "aac":
            case "m4a":
                return "audio/mp4";
            default:
                return ""
        }
    }
    function f(a, b, c) {
        var d = 0;
        if (3 === a ? 3 === b ? d = [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448][c] : 2 === b ? d = [0, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384][c] : 1 === b && (d = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320][c]) : (2 === a || 0 === a) && (3 === b ? d = [0, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256][c] : (2 === b || 1 === b) && (d = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160][c])), !d)
            throw new Error("unknown bit-rate");
        return d
    }
    function g(a, b) {
        var c = 0;
        if (3 === a ? c = [44100, 48e3, 32e3][b] : 2 === a ? c = [22050, 24e3, 16e3][b] : 0 === a && (c = [11025, 12e3, 8e3][b]), !c)
            throw new Error("unknown sample-rate");
        return c
    }
    function h(a, b) {
        var c = 0;
        if (c = 3 === a ? 3 === b ? 21 : 36 : 3 === b ? 13 : 21, !c)
            throw new Error("unknown info-offset");
        return c
    }
    function i(a) {
        function b() {
            return e[i++]
        }
        function c(a) {
            return e.subarray(i, i += a)
        }
        var d = {}, e = new Uint8Array(a), i = 0;
        if (73 === e[0] && 68 === e[1] && 51 === e[2]) {
            d.id3v2 = !0, i += 5;
            for (var j = b(), k = 0, l = 0; 4 > l; l++)
                k <<= 7, k |= b();
            i += k, 64 & j && (i += 10)
        }
        d.frameHeaderOffset = i;
        var m = c(4);
        if (255 !== m[0] || 224 !== (224 & m[1]))
            return d;
        var n = (24 & m[1]) >> 3, o = (6 & m[1]) >> 1, p = (240 & m[2]) >> 4, q = f(n, o, p), r = (12 & m[2]) >> 2, s = g(n, r), t = (192 & m[3]) >> 6, u = h(n, t);
        i += u - 4, d.bitRate = q, d.sampleRate = s;
        var v = c(4);
        if (!(88 === v[0] && 105 === v[1] && 110 === v[2] && 103 === v[3] || 73 === v[0] && 110 === v[1] && 102 === v[2] && 111 === v[3]))
            return d;
        i += 115, i += 22;
        var w = c(3), x = w[0] << 4 | (240 & w[1]) >> 4, y = (15 & w[1]) << 8 | w[2];
        return d.encoderDelay = x, d.padding = y, d
    }
    var j = null;
    return {getAudioCapabilities: b,isSupportedHTMLAudio: c,isSupportedWebAudio: d,findMediaType: e,readLAMEHeader: i}
});
/**
 * ShellApp Library
 */
define('lib/shellapp', ["jquery", "underscore"], function(a, b) {
    function c(a, c, d) {
        var e = window.mobage.shellapp[a] || {}, f = e[c], g = d || [];
        return b.isFunction(f) ? f.apply(f, g) : void 0
    }
    var d = {};
    d = b.isEmpty(window.mobage) ? function(a, d, e) {
        return b.isEmpty(window.mobage) ? void 0 : c(a, d, e)
    } : function(a, b, d) {
        return c(a, b, d)
    };
    var e = function() {
        this.uid = b.uniqueId("uid")
    };
    return b.extend(e.prototype, {Defined: {OsName: {IOS: "iOS"},StoreUrl: {IOS: "https://itunes.apple.com/jp/app/guranburufantaji/id852882903?mt=8&uo=4",ANDROID: "https://play.google.com/store/apps/details?id=jp.mbga.a12016007.lite"},DocType: {CONTACT: function() {
        return b.isEmpty(window.mobage) ? null : window.mobage.shellapp.Service.DocType.CONTACT
    },LEGAL: function() {
        return b.isEmpty(window.mobage) ? null : window.mobage.shellapp.Service.DocType.LEGAL
    }},Callbacks: {NAMESPACE: "window.mobage.shellapp.Callbacks."}},isShellApp: function() {
        return window.mobage && window.mobage.shellapp && window.mobage.shellapp.App ? !0 : !1
    },isShellAppIOS: function() {
        return this.isShellApp() && Game.ua.os.name == this.Defined.OsName.IOS ? !0 : !1
    },isShellAppAndroid: function() {
        return this.isShellApp() && !this.isShellAppIOS()
    },isShellAppWKWebView: function() {
        var a = window.Game.ua;
        return this.isShellAppIOS() && a.versionCompare(a.os.version, "8.0") >= 0
    },getUpdateUrl: function() {
        return this.isShellApp() ? this.isShellAppIOS() ? this.Defined.StoreUrl.IOS : this.Defined.StoreUrl.ANDROID : ""
    },setOnShellAppReady: function(a) {
        document.addEventListener("onShellAppReady", a)
    },openBrowser: function(a) {
        return d("Device", "openURLWithBrowser", [a])
    },getVersionName: function() {
        return d("App", "getVersionName")
    },getVersionCode: function() {
        return d("App", "getVersionCode")
    },openDocument: function(a) {
        return d("Service", "openDocument", [a])
    },openUserProfile: function(a) {
        return d("Service", "openUserProfile", [a])
    },logoutDialog: function() {
        return d("Service", "showLogoutDialog")
    },showCommunityUI: function() {
        return d("Service", "showCommunityUI")
    },getRemoteNotification: function() {
        return d("RemoteNotification", "getPayload")
    },playMusic: function(a, b, c) {
        b = b || 0, c = c || 0;
        var e = a.replace(/\//g, "_").toLowerCase().replace(/_all(?!\w)/g, "_00").replace(/\.mp3$/, "");
        return d("Music", "play", [e, b, c])
    },pauseMusic: function(a) {
        return a = a || 1, d("Music", "pause", [a])
    },resumeMusic: function(a) {
        return a = a || 1, d("Music", "resume", [a])
    },stopMusic: function(a) {
        return a = a || 0, d("Music", "stop", [a])
    },playSoundEffect: function(a) {
        var b = a.replace(/\//g, "_").toLowerCase().replace(/\.mp3$/, "");
        return d("SoundEffect", "play", [b])
    },loadVoice: function(a) {
        var b = a.replace(/\//g, "_").toLowerCase().replace(/\.mp3$/, "");
        return d("Voice", "load", [b])
    },playVoice: function(a, b) {
        var c = a.replace(/\//g, "_").toLowerCase().replace(/\.mp3$/, "");
        return d("Voice", "play", [c, !!b])
    },pauseVoice: function() {
        return d("Voice", "pause")
    },resumeVoice: function() {
        return d("Voice", "resume")
    },stopVoice: function() {
        return d("Voice", "stop")
    },setMute: function(a) {
        return a = 0 | (a ? 1 : 0), d("Sound", "setMute", [a])
    },setMusicMute: function(a) {
        return a = 0 | (a ? 1 : 0), d("Sound", "setMusicMute", [a])
    },setSEMute: function(a) {
        return a = 0 | (a ? 1 : 0), d("Sound", "setSEMute", [a])
    },setVoiceMute: function(a) {
        return a = 0 | (a ? 1 : 0), d("Sound", "setVoiceMute", [a])
    },setMusicVolume: function(a) {
        return d("Sound", "setMusicVolume", [+a])
    },setSEVolume: function(a) {
        return d("Sound", "setSEVolume", [+a])
    },setVoiceVolume: function(a) {
        return d("Sound", "setVoiceVolume", [+a])
    },setLocalNotification: function(a) {
        if (window.gbfLocalPushNotification) {
            var b = JSON.stringify(a);
            return d("Notification", "sendAlert", [b])
        }
    },pseudoLocalStorage: function(a) {
        return d("PseudoLocalStorage", "exec", [a])
    },sendAnalyticsLtv: function(a, c, e) {
        return e && !b.isString(e) && (e = JSON.stringify(e)), window.mobage && window.mobage.shellapp && window.mobage.shellapp.Analytics && window.mobage.shellapp.Analytics.sendLtv ? d("Analytics", "sendLtv", [a, c, e]) : void 0
    },sendAnalyticsEvent: function(a, b, c, e, f, g, h, i, j) {
        return a = a || "purchase", h = +h, i = 0 | i, b = b || null, c = c || null, e = e || null, f = f || null, g = g || null, j = j || null, window.mobage && window.mobage.shellapp && window.mobage.shellapp.Analytics && window.mobage.shellapp.Analytics.sendEvent ? d("Analytics", "sendEvent", [a, b, c, e, f, g, h, i, j]) : void 0
    }}), function(b) {
        function c(b, c, d) {
            var e = window.mobage.shellapp, f = new a.Deferred;
            b += "_";
            var g = b + c + "_success", h = b + c + "_error", i = JSON.stringify({command: b + "plocalstorage",key: c,value: d,callback_ok: this.Defined.Callbacks.NAMESPACE + g,callback_ng: this.Defined.Callbacks.NAMESPACE + h});
            return e.Callbacks || (e.Callbacks = {}), e.Callbacks[g] = function(a) {
                f.resolve(a)
            }, e.Callbacks[h] = function(a) {
                f.reject(a)
            }, this.pseudoLocalStorage(i), f.promise()
        }
        b.getPseudoLocalStorage = function(a) {
            return c.call(this, "get", a)
        }, b.setPseudoLocalStorage = function(a, b) {
            return c.call(this, "set", a, b)
        }
    }(e.prototype), new e
});
/**
 * Event API
 */
define('util/event', ["underscore"], function(a) {
    var b = {};
    return b.on = b.addEventListener = function(a, b) {
        this._eventListeners = this._eventListeners || {}, this._eventListeners[a] = this._eventListeners[a] || [], this._eventListeners[a].push(b)
    }, b.removeEventListener = function(b, c) {
        var d = this;
        c._once && d.removeEventListener(b, c._once), d._eventListeners && (d._eventListeners[b] && (d._eventListeners[b] = a.reject(d._eventListeners[b], function(a) {
            return !c || a === c || a === c._once
        })), a.isEmpty(d._eventListeners[b]) && delete d._eventListeners[b], a.isEmpty(d._eventListeners) && (d._eventListeners = null, delete d._eventListeners))
    }, b.removeAllEventListeners = function(b) {
        var c = this;
        c._eventListeners && (b ? a.each(c._eventListeners[b], function(a) {
            c.removeEventListener(b, a)
        }) : a.each(c._eventListeners, function(a, b) {
            c.removeAllEventListeners(b)
        }))
    }, b.off = function(a, b) {
        var c = this;
        b ? c.removeEventListener(a, b) : c.removeAllEventListeners(a)
    }, b.hasEventListener = function(b, c) {
        var d = this;
        return d._eventListeners ? !!a.find(d._eventListeners[b], function(a) {
            return !c || a === c
        }) : !1
    }, b.once = function(a, b) {
        var c = this;
        b._once = function() {
            c.removeEventListener(a, b._once), b.apply(c, arguments)
        }, c.addEventListener(a, b._once)
    }, b.trigger = function(b) {
        var c = this;
        c._eventListeners && a.each(c._eventListeners[b], function(a) {
            a.call(c)
        })
    }, b
});
/**
 * define primitive functions
 */
define('util/function', ["jquery"], function(a) {
    return {returnTrue: function() {
        return !0
    },returnFalse: function() {
        return !1
    },returnEmptyObject: function() {
        return {}
    },returnResolvedPromise: function() {
        return (new a.Deferred).resolve().promise()
    },returnRejectedPromise: function() {
        return (new a.Deferred).reject().promise()
    }}
});
// FIXME 外部プラグインを使う
define('util/jquery.whenall', ["jquery", "underscore"], function(a, b) {
    return a.extend({whenAll: function() {
        return a.when.apply(null, b.map(arguments, function(b) {
            var c = new a.Deferred;
            return b.always(function() {
                c.resolve()
            }), c
        }))
    }}), a
});
/**
 * Sound Player
 *
 * Requires: soundjs, boombox or multisound
 *
 * Example:
 *	 var bgm = 'bgm.mp3';
 *	 SoundPlayer.once('complete', function() {
 *		 SoundPlayer.play(bgm);
 *	 });
 *	 SoundPlayer.loadFile(bgm);
 */
define('lib/sound-player', ["jquery", "underscore", "lib/sound-util", "lib/shellapp", "util/event", "util/function", "util/jquery.whenall"], function(a, b, c, d, e, f) {
    var g = "silent", h = 5e3, i = 4, j = 5, k = /^\^?bgm/, l = /^\^?se/, m = /^\^?voice/, n = "bgm/", o = "se/", p = "voice/", q = function() {
        return window.Game.ua && "Android" === window.Game.ua.os.name
    }(), r = function() {
        return window.Game.ua && "iOS" === window.Game.ua.os.name
    }(), s = {};
    (function() {
        var a = this;
        a.ready = f.returnFalse, a.destroy = f.returnFalse, a.getInstances = f.returnEmptyObject, a.load = f.returnRejectedPromise, a.play = f.returnRejectedPromise, a.repeat = f.returnRejectedPromise, a.stop = f.returnFalse, a.isPlaying = f.returnFalse, a.setPlaying = f.returnFalse, a.mute = f.returnFalse, a.unmute = f.returnFalse, a.setVolume = f.returnFalse, a.replay = f.returnFalse, a.once = f.returnFalse, a.requiresUserAction = f.returnFalse
    }).call(s);
    var t = b.clone(s);

    var u = function(d) {
        console.info('ddd');
        d._instances = {}, d._loadedSources = {}, d._bindingCallbackList = {};
        var e = new a.Deferred;
        return d._setup ? e.resolve() : (d._setup = !0, function(g) {
            if (g.HTMLAudioPlugin.MAX_INSTANCES = i, g.Sound.initializeDefaultPlugins()) {
                var h = new g.LoadQueue(!1);
                h.installPlugin(g.Sound), h.setMaxConnections(j), d.ready = function() {
                    return g.Sound.isReady()
                }, d.destroy = function(a) {
                    d._instances[a] && (delete d._instances[a], g.Sound.removeSound(a)), d._loadedSources[a] && delete d._loadedSources[a]
                }, d.getInstances = function() {
                    return d._instances
                }, d.load = function(b, c) {



                    c = c || {};
                    var e;
                    if (c.src)
                        e = c.src;
                    else {
                        var f = c.dir ? c.dir + "/" : "", i = c.file || b;
                        e = f + i
                    }
                    if (d._loadedSources[b] === e)
                        return (new a.Deferred).resolve().promise();
                    var j = new a.Deferred, k = function(a) {
                        a.item.id === b && a.item.src === e && (m(), d._loadedSources[b] = e, j.resolve())
                    }, l = function(a) {
                        a.item.id === b && a.item.src === e && (m(), delete d._loadedSources[b], j.reject())
                    }, m = function() {
                        h.removeEventListener("fileload", k), h.removeEventListener("error", l)
                    };
                    h.addEventListener("fileload", k), h.addEventListener("error", l);
                    var n = h._numItems;
                    return h.loadFile({id: b,src: e,type: g.LoadQueue.SOUND,cache: !0}), n == h._numItems && (m(), delete d._loadedSources[b], j.reject()), j.promise()
                }, d.play = function(a, c) {
                    return d.load(a, c).done(function() {
                        var e = d._instances[a] = d._instances[a] || g.Sound.createInstance(a), f = c.interrupt || g.Sound.INTERRUPT_NONE;
                        b.each(d._bindingCallbackList[a], function(b, c) {
                            d.once(a, c, function() {
                                b(e)
                            })
                        }), delete d._bindingCallbackList[a];
                        var h = c.delay || 0, i = c.offset || 0, j = b.isNumber(c.loop) ? c.loop : c.loop ? -1 : 0, k = c.volume;
                        e.play(f, h, i, j, k)
                    })
                }, d.repeat = function(a, b) {
                    console.info(a);
                    return d.load(a, b).done(function() {
                        var c = d._instances[a] = d._instances[a] || g.Sound.createInstance(a);
                        if (c) {
                            var e = b.interrupt || g.Sound.INTERRUPT_NONE, f = b.delay || 0, h = b.offset || 0, i = -1, j = b.volume;
                            c.play(e, f, h, i, j)
                        }
                    })
                }, d.stop = function(a) {
                    var b = d._instances[a];
                    b && b.stop()
                }, d.isPlaying = function(a) {
                    var b = d._instances[a];
                    return b && b.playState === g.Sound.PLAY_SUCCEEDED
                }, d.mute = function(a, b) {
                    var c = d._instances[a];
                    c && c.setMute(!0)
                }, d.unmute = function(a, b) {
                    var c = d._instances[a];
                    c && c.setMute(!1)
                }, d.setVolume = function(a, c, e) {
                    if (!b.isUndefined(c)) {
                        var f = d._instances[a];
                        f && f.setVolume(c)
                    }
                }, d.pause = function(a) {
                    var b = d._instances[a];
                    b && b.pause()
                }, d.resume = function(a) {
                    var b = d._instances[a];
                    b && b.resume()
                }, d.duration = function(a) {
                    var b = d._instances[a];
                    return b ? 1 == window.Game.setting.cjs_mode ? 1e3 * b.Nb.buffer.duration : b.getDuration() : void 0
                }, d.position = function(a) {
                    var b = d._instances[a];
                    return b ? 1 == window.Game.setting.cjs_mode ? (new Date).getTime() - window.sTime : b.getPosition() : void 0
                }, d.replay = function(a) {
                    var b = d._instances[a];
                    b && (0 != b._remainingLoops ? b.play(g.Sound.INTERRUPT_NONE, 0, 0, -1) : b.play())
                }, d.once = function(a, b, c) {
                    var e = d._instances[a];
                    if (e)
                        c._once = function() {
                            e.removeEventListener(b, c._once), c.apply(e, arguments)
                        }, e.addEventListener(b, c._once);
                    else {
                        d._bindingCallbackList[a] = d._bindingCallbackList[a] || {};
                        var f = function(d) {
                            c.apply(d, [a, b, c])
                        };
                        d._bindingCallbackList[a][b] = f
                    }
                }, d.requiresUserAction = f.returnFalse, c.isSupportedWebAudio() ? (g.WebAudioPlugin.playEmptySound(), setTimeout(function() {
                    (null == g.WebAudioPlugin.context || 0 === g.WebAudioPlugin.context.currentTime) && (d.requiresUserAction = f.returnTrue, g.Sound.activePlugin instanceof g.WebAudioPlugin && window.addEventListener("touchstart", function a() {
                        null != g.WebAudioPlugin.context && (window.removeEventListener("touchstart", a, !0), g.WebAudioPlugin.playEmptySound())
                    }, !0)), e.resolve()
                }, 100)) : e.resolve()
            }
        }(window.createjs)), e.promise()
    }, v = function(b) {
        var c = new a.Deferred;
        b.ready = f.returnTrue, b.setup = f.returnResolvedPromise;
        var e = (b.load, b.play), g = b.repeat, h = b.stop, i = b.pause, j = b.resume, n = b.setVolume, o = b.isPlaying, p = b.setPlaying;
        if (q) {
            var s = {};
            b.isPlaying = function(a) {
                return a.match(k) ? s.bgm : a.match(l) ? s.se : a.match(m) ? s.voice : void o.call(b, a)
            }, b.setPlaying = function(a, c) {
                a.match(k) ? s.bgm = c : a.match(l) ? s.se = c : a.match(m) ? s.voice = c : p.call(b, a, c)
            }, b.load = function(b, c) {
                return b.match(m) && d.loadVoice(b), (new a.Deferred).resolve().promise()
            }, b.play = function(c, f) {
                return c.match(k) ? (s.bgm = !0, d.playMusic(c), (new a.Deferred).resolve().promise()) : c.match(l) ? (s.se = !0, d.playSoundEffect(c), (new a.Deferred).resolve().promise()) : c.match(m) ? (s.voice = !0, d.playVoice(c, f && f.force), (new a.Deferred).resolve().promise()) : (d.pauseMusic(), e.call(b, c, f).done(function() {
                    b.once(c, "complete", function() {
                        d.resumeMusic()
                    })
                }))
            }, b.repeat = function(c, e) {
                console.info('yes it is repeat');
                console.info(c);
                return c.match(k) ? (s.bgm = !0, d.playMusic(c, 0, -1), (new a.Deferred).resolve().promise()) : c.match(l) ? (s.se = !0, d.playSoundEffect(c), (new a.Deferred).resolve().promise()) : c.match(m) ? (s.voice = !0, d.playVoice(c, e && e.force), (new a.Deferred).resolve().promise()) : (d.pauseMusic(), g.call(b, c, e).done(function() {
                    b.once(c, "complete", function() {
                        d.resumeMusic()
                    })
                }))
            }, b.stop = function(a, c) {
                a.match(k) ? (s.bgm = !1, d.stopMusic()) : a.match(l) ? s.se = !1 : a.match(m) ? (s.voice = !1, d.stopVoice()) : (d.resumeMusic(), h.call(b, a, c))
            }, b.pause = function(a, c) {
                a.match(k) ? (s.bgm = !1, d.pauseMusic()) : a.match(l) ? s.se = !1 : a.match(m) ? (s.voice = !1, d.pauseVoice()) : (d.resumeMusic(), i.call(b, a, c))
            }, b.resume = function(a, c) {
                a.match(k) ? (s.bgm = !1, d.resumeMusic()) : a.match(l) ? s.se = !1 : a.match(m) ? (s.voice = !1, d.resumeVoice()) : (d.pauseMusic(), j.call(b, a, c))
            }, b.setVolume = function(a, c) {
                a.match(k) ? d.setMusicVolume(c) : a.match(l) ? d.setSEVolume(c) : a.match(m) ? d.setVoiceVolume(c) : n.call(b, a, c)
            }
        } else
            r && (b.setVolume = function(a, c) {
                a.match(k) ? d.setMusicVolume(c) : a.match(l) ? d.setSEVolume(c) : a.match(m) && d.setVoiceVolume(c), n.call(b, a, c)
            });
        return c.promise()
    };
    (function() {
        console.info(u);
        console.info(a);
        console.info(b.partial)
        var a = this;
        a.setup = b.partial(u, a)
    }).call(t), (q || r) && (d.isShellApp() ? !function(a) {
        var c = a.setup;
        a.setup = function() {
            return c.call(a).always(b.partial(v, a))
        }
    }(t) : d.setOnShellAppReady(function() {
        !function(a) {
            var c = a.setup;
            a.setup = function() {
                return c.call(a).always(b.partial(v, a))
            }
        }(t)
    }));
    var w = {};
    b.extend(w, e), function() {
        var e = this;
        e._directory = {}, e._alias = {}, e._masterVolume = 1, e._localVolume = {}, e._disabled = {}, e._muted = {}, e._sounds = {}, e._reservedSounds = {}, e._errorSounds = {}, e._destroyTimer = {}, e._isPlayed = {}, e._destroy = function(a) {
            t.destroy(a), clearTimeout(e._destroyTimer[a]), delete e._destroyTimer[a], delete e._sounds[a], delete e._reservedSounds[a], delete e._errorSounds[a], delete e._isPlayed[a]
        }, e._registerDestroy = function(a) {
            clearTimeout(e._destroyTimer[a]), e._destroyTimer[a] = setTimeout(function() {
                e._destroy(a)
            }, h)
        }, e._unregisterDestroy = function(a) {
            clearTimeout(e._destroyTimer[a]), delete e._destroyTimer[a]
        }, e._each = function(a, c) {
            b.each(t.getInstances(), function(b, d) {
                d.match(a) && c(d, b)
            })
        }, e._isPlayable = function(a) {
            return !a || a == g || e.isDisabled(a) ? !1 : !0
        }, e._handleComplete = function() {
            e.isLoaded() && e.trigger("complete")
        }, e._loadAndCall = function(c, f) {
            console.info('_loadAndCall');
            console.info(c);
            console.info(f);
            f = f || {}, f.dir = f.dir || e.getDirectory(c);
            var g = new a.Deferred;
            if (!d.isShellApp()) {
                if (b.has(e._sounds, c))
                    return g.resolve().promise();
                if (b.has(e._errorSounds, c))
                    return g.reject().promise()
            }

            return e.load(c, f)
        }, e._setGain = function(a, b) {
            t.setVolume(a, e.getLocalVolume(a), b), e.isMuted(a) ? t.mute(a, b) : t.unmute(a, b)
        }, e.isSupportedHTMLAudio = function() {
            return c.isSupportedHTMLAudio()
        }, e.isSupportedWebAudio = function() {
            return c.isSupportedWebAudio()
        }, e.isSupportedNativeAudio = function() {
            return q && d.isShellApp()
        }, e.isSupported = function() {
            return e.isSupportedHTMLAudio() || e.isSupportedWebAudio() || e.isSupportedNativeAudio()
        }, e.setup = function(c) {

            var d = new a.Deferred;
            return e._setup ? d.resolve() : (e._setup = !0, t.setup().done(function() {
                t.requiresUserAction() && (c ? b.each(t.getInstances(), function(a, b) {
                    e.isPlayed(b) && t.replay(b)
                }) : window.addEventListener("touchstart", function a() {
                    window.removeEventListener("touchstart", a, !0), b.each(t.getInstances(), function(a, b) {
                        e.isPlayed(b) && t.replay(b)
                    })
                }, !0)), d.resolve()
            }).fail(function() {
                d.reject()
            })), d.promise()
        }, e.destroy = function(a) {
            a = e._alias[a] || a || "", e._each(a, function(a, b) {
                t.stop(a), e._destroy(a)
            }), t.stop(a)
        }, e.registerDestroy = function(a) {
            a = e._alias[a] || a || "", e._each(a, function(a, b) {
                t.stop(a), e._registerDestroy(a)
            }), t.stop(a)
        }, e.unregisterDestroy = function(a) {
            a = e._alias[a] || a || "", e._each(a, function(a) {
                e._unregisterDestroy(a)
            })
        }, e.setDirectory = function(a, b) {
            b || (b = a, a = ""), a = e._alias[a] || a || "", e._directory[a] = b, e.destroy(a)
        }, e.getDirectory = function(a) {
            a = e._alias[a] || a || "";
            var c = b.find(b.keys(e._directory), function(b) {
                return a.match(b)
            });
            return e._directory[c] || ""
        }, e.enable = function(a) {
            a = e._alias[a] || a || "", delete e._disabled[a], e.unregisterDestroy(a), d.isShellApp() && (e.isEnabled(n) && d.setMusicMute(0), e.isEnabled(o) && d.setSEMute(0), e.isEnabled(p) && d.setVoiceMute(0))
        }, e.disable = function(a) {
            a = e._alias[a] || a || "", e._disabled[a] = !0, e.registerDestroy(a), d.isShellApp() && (a ? a.match(k) ? d.setMusicMute(1) : a.match(l) ? d.setSEMute(1) : a.match(m) && d.setVoiceMute(1) : d.setMute(1))
        }, e.isEnabled = function(a) {
            return !e.isDisabled(a)
        }, e.isDisabled = function(a) {
            return a = e._alias[a] || a || "", b.some(e._disabled, function(b, c) {
                return a.match(c) && b
            })
        }, e.isMuted = function(a) {
            return a = e._alias[a] || a || "", b.some(e._muted, function(b, c) {
                return a.match(c) && b
            })
        }, e.mute = function(a) {
            a = e._alias[a] || a || "", e._muted[a] = !0, e._each(a, function(a, b) {
                t.mute(a)
            }), t.mute(a)
        }, e.unmute = function(a) {
            a = e._alias[a] || a || "", delete e._muted[a], delete e._muted[""], e._each(a, function(a, b) {
                t.unmute(a)
            }), t.unmute(a)
        }, e.getVolume = function(a) {
            a = e._alias[a] || a || "";
            var b = e.getMasterVolume();
            return a ? b * e.getLocalVolume(a) : b
        }, e.setVolume = function(a, c) {
            b.isUndefined(c) ? (c = a, e.setMasterVolume(c)) : e.setLocalVolume(a, c)
        }, e.getMasterVolume = function() {
            return e._masterVolume
        }, e.setMasterVolume = function(a) {
            b.isUndefined(a) || (e._masterVolume = a)
        }, e.getLocalVolume = function(a) {
            a = e._alias[a] || a || "";
            var c = b.find(b.keys(e._localVolume), function(b) {
                return a.match(b)
            });
            return c ? e._localVolume[c] : 1
        }, e.setLocalVolume = function(a, c) {
            b.isUndefined(c) || (a = e._alias[a] || a || "", e._localVolume[a] = c, e._each(a, function(a, b) {
                t.setVolume(a, c)
            }), t.setVolume(a, c))
        }, e.hasAlias = function(a) {
            return b.has(e._alias, a)
        }, e.setAlias = function(a, b) {
            e._alias[b] = a
        }, e.unsetAlias = function(a) {
            e._alias[a] = null, delete e._alias[a]
        }, e.setAliasAndPlay = function(a, b, c) {
            e._isPlayable(a) || e.stop(b);
            var d = e._alias[b];
            if (a) {
                e.setAlias(a, b);
                var f;
                f = d == a && a.match(l) ? e.play(b, c) : e.stopAndPlay(d, a, c)
            }
        }, e.setAliasAndRepeat = function(a, b, c) {

            e._isPlayable(a) || e.stop(b);

            var d = e._alias[b];
            if (a) {
                e.setAlias(a, b);
                var f;
                d != a ? f = e.stopAndRepeat(d, a, c) : e.isPlaying(b) || (f = e.repeat(b, c))
            }
        }, e.isPlayed = function(a) {
            return a = e._alias[a] || a || "", a && e._isPlayed[a]
        }, e.isPlaying = function(a) {
            return a = e._alias[a] || a || "", a && e._sounds[a] && t.isPlaying(a)
        }, e.setPlaying = function(a, b) {
            return a = e._alias[a] || a || "", a && t.setPlaying(a, b)
        }, e.load = function(b, c) {
            console.l(t,'t is');
            if(c.force || e._isPlayable(b)){
                if(e._reservedSounds[b] || e._sounds[b] || e._errorSounds[b]) {
                   return (new a.Deferred).resolve().promise()
                } else{
                    e._reservedSounds[b] = b, console.info('start loading sound');
                    return t.load(b, c).done(function() {
                        e._sounds[b] = b, delete e._reservedSounds[b], delete e._errorSounds[b], c.ignoreComplete || e._handleComplete()
                    }).fail(function() {
                        console.info('fail');
                        e._errorSounds[b] = b, delete e._reservedSounds[b], c.ignoreComplete || e._handleComplete()
                    });

                }
            } else {
                return (new a.Deferred).resolve().promise()
            }
/*            return c.force || e._isPlayable(b) ? e._reservedSounds[b] || e._sounds[b] || e._errorSounds[b] ? (new a.Deferred).resolve().promise() : (e._reservedSounds[b] = b, console.info('start loading sound'),
                t.load(b, c).done(function() {
                e._sounds[b] = b, delete e._reservedSounds[b], delete e._errorSounds[b], c.ignoreComplete || e._handleComplete()
            }).fail(function() {
                console.info('fail');
                e._errorSounds[b] = b, delete e._reservedSounds[b], c.ignoreComplete || e._handleComplete()
            })) : (new a.Deferred).resolve().promise()*/
        }, b.each(["play", "repeat"], function(a) {
            e[a] = function(b, c) {
                return c = c || {}, b = e._alias[b] || b || "", c.force || e._isPlayable(b) ? (null == c.volume && (c.volume = e.getLocalVolume(b)), e._isPlayed[b] = !0, e._loadAndCall(b, c).done(function() {
                    e._isPlayed[b] && t[a](b, c).done(function() {
                        e._setGain(b, c)
                    })
                })) : void 0
            }
        }), b.each(["stop"], function(a) {
            e[a] = function(b, c) {
                b = e._alias[b] || b || "", e._isPlayed[b] = !1, t[a](b, c)
            }
        }), e.resume = function(a, b) {
            if (b = b || {}, a = e._alias[a] || a || "") {
                if (!b.force && !e._isPlayable(a))
                    return;
                return null == b.volume && (b.volume = e.getLocalVolume(a)), e._isPlayed[a] = !0, e._loadAndCall(a, b).done(function() {
                    e._isPlayed[a] && (t.resume(a, b), e._setGain(a, b))
                })
            }
            e._each("", function(a) {
                a && e._isPlayed[a] && e.resume(a, b)
            })
        }, e.pause = function(a, b) {
            a = e._alias[a] || a || "", a ? t.pause(a, b) : e._each("", function(a) {
                a && e.pause(a)
            })
        }, e.duration = function(a) {
            return t.duration(a)
        }, e.position = function(a) {
            return t.position(a)
        }, e.stopAndPlay = function(a, b, c) {
            return a = e._alias[a] || a || "", b = e._alias[b] || b || "", c = c || {}, c.force || e._isPlayable(b) ? (e._isPlayed[a] = !1, e._isPlayed[b] = !0, e._loadAndCall(b, c).always(function() {
                a !== b && e._isPlayed[a] || t.stop(a, c)
            }).done(function() {

                e._isPlayed[b] && (null == c.volume && (c.volume = e.getLocalVolume(b)), t.play(b, c).done(function() {
                    e._setGain(b, c)
                }))
            })) : void e.stop(a, c)
        }, e.stopAndRepeat = function(a, b, c) {
            return a = e._alias[a] || a || "", b = e._alias[b] || b || "", c = c || {}, c.force || e._isPlayable(b) ? (e._isPlayed[a] = !1, e._isPlayed[b] = !0, e._loadAndCall(b, c).always(function() {
                console.info('after always');
                a === b && e._isPlayed[a] || t.stop(a, c)
            }).done(function() {
                console.info('stopAndRepeat Done')
                e._isPlayed[b] && (null == c.volume && (c.volume = e.getLocalVolume(b)), t.repeat(b, c).done(function() {
                    e._setGain(b, c)
                }))
            })) : void e.stop(a, c)
        }, e.loadManifest = function(c, f) {
            if (!t.ready())
                return e.trigger("complete"), (new a.Deferred).reject();
            f = f || {};
            var g = b.filter(c, function(a) {
                var b = f.force || !e.isDisabled(a.id), c = d.isShellApp() || !e._sounds[a.id] && !e._reservedSounds[a.id];
                return a.id && a.src && c && b
            });
            return b.isEmpty(g) ? (e._handleComplete(), (new a.Deferred).resolve().promise()) : a.whenAll.apply(null, b.map(c, function(a) {
                return f.dir = f.dir || e.getDirectory(a.id), f.ignoreComplete = !0, e.load(a.id, b.defaults(a, f))
            })).always(function() {
                e._handleComplete()
            })
        }, e.getPath = function(a) {
            var b = e.getDirectory(a);
            return (b ? b + "/" : "") + a
        }, e.loadFile = function(a, b) {
            return e.loadFiles([a], b)
        }, e.loadFiles = function(a, c) {
            var d = b.map(b.uniq(b.filter(a, function(a) {
                return a && a !== g
            })), function(a) {
                return {id: a,src: e.getPath(a)}
            });
            return e.loadManifest(d, c)
        }, e.isLoaded = function(a) {
            if (a = e._alias[a] || a || "")
                return b.has(e._sounds, a) || !e._isPlayable(a);
            var c = b.isEmpty(b.difference(b.keys(e._reservedSounds), b.keys(e._sounds)));
            return c
        }, e.clearInstances = function(a) {
            a = a || {};
            var c = a.exclude || "";
            b.each(t.getInstances(), function(a, b) {
                t.isPlaying(b) || c && b.match(c) || e._destroy(b)
            })
        }, e.once = function(a, b, c) {
            return t.once(a, b, c)
        }
    }.call(w); w.setup(!1);


    var x, y;
    return document.hidden ? (x = "hidden", y = "visibilitychange") : document.mozHidden ? (x = "mozHidden", y = "mozvisibilitychange") : document.msHidden ? (x = "msHidden", y = "msvisibilitychange") : document.webkitHidden && (x = "webkitHidden", y = "webkitvisibilitychange"), x && y && document.addEventListener(y, function() {
        document[x] ? w.mute() : w.unmute()
    }), b.each(["blur", "pagehide", "unload", "beforeunload"], function(a) {
        window.addEventListener(a, function() {
            w.mute()
        })
    }), b.each(["focus", "pageshow"], function(a) {
        window.addEventListener(a, function() {
            w.unmute()
        })
    }), w
});
/**
 * Sound Interface
 */
define('lib/sound', ["jquery", "underscore", "lib/sound-player"], function(a, b, c) {
    function d(a) {
        b.each(c, function(b, c) {
            g[c] = function() {
                a.push([c, arguments])
            }
        })
    }
    function e(a) {
        b.each(a, function(a) {
            var b = a[0], c = a[1];
            g[b].apply(g, c)
        })
    }
    function f(a) {
        b.each(c, function(b, c) {
            g[c] = function() {
                return a[c].apply(a, arguments)
            }
        })
    }
    var g = {};
    return window !== window.parent ? window.parent.SoundPlayer ? window.parent.readySoundPlayer ? f(window.parent.SoundPlayer) : (window.parent.loadingSoundPlayer = window.parent.loadingSoundPlayer || new a.Deferred, d(window.parent.pendingSoundPlayer = []), window.parent.loadingSoundPlayer.done(function() {
        f(window.parent.SoundPlayer), e(window.parent.pendingSoundPlayer), delete window.parent.pendingSoundPlayer
    })) : f(c) : (f(c), (window.loadingSoundPlayer = window.loadingSoundPlayer || new a.Deferred).resolve(), window.readySoundPlayer = !0), g
});
define('util/navigate', ["underscore", "backbone"], function(a, b) {
    var c = function(b) {
        var c = 0 === b.indexOf("?") ? b.slice(1) : b, d = c ? c.split("&") : [];
        return a.object(a.map(d, function(a) {
            return a.split("=")
        }))
    }, d = function(c, d) {
        var e = window.location;
        d.refresh ? (b.history.stop(), e.hash = c, e.reload()) : b.History.started ? (d = d || {}, a.has(d, "trigger") || (d.trigger = !0), b.history.navigate(c, d)) : e.hash = c
    }, e = function(a, c) {
        var d = window.location;
        c.refresh ? (b.history.stop(), d.href = a, d.reload()) : d.href = a
    }, f = function(a) {
        if (window.Game && window.Game.ajaxConnecting) {
            var b = $(document);
            b.on("ajaxStop", function c() {
                b.off("ajaxStop", c), a()
            })
        } else
            a()
    }, g = function(b, c) {
        c = c || {};
        var e = a.partial(d, b, c);
        c.sync ? f(e) : e()
    }, h = function(b, c) {
        c = c || {};
        var d = a.partial(e, b, c);
        c.sync ? f(d) : d()
    };
    return {parseQuery: c,hash: g,href: h}
});
define('util/ajax', ["jquery", "underscore"], function(a, b) {
    var c = function() {
        function a(a) {
            this.ajaxLimits = {}, this.startNum = a.length - 1
        }
        var b = 1, c = 0;
        return a.prototype.add = function(a) {
            this.check(a) || (this.ajaxLimits[a] = b)
        }, a.prototype.remove = function(a) {
            this.check(a) && (this.ajaxLimits[a] = c)
        }, a.prototype.check = function(a) {
            var c = this.ajaxLimits[a];
            return b === c ? !0 : !1
        }, a.prototype.getRequestString = function(a) {
            var b = a.indexOf("?");
            return 0 > b && (b = a.length), a.substring(this.startNum, b)
        }, new a(Game.baseUri)
    }(), d = function() {
        this.initialize.apply(this, arguments)
    };
    !function(a) {
        a.initialize = function() {
            return this._pool = {}, this._index = 0, this
        }, a.add = function(a) {
            var b = this._pool, d = this._index++;
            a._index = d, b[d] = a, c.add(a._requestKey)
        }, a.remove = function(a) {
            a ? (c.remove(a._requestKey), delete this._pool[a._index]) : this._pool = {}
        }, a.abort = function(a) {
            a ? (a._isManuallyAborted = !0, a.abort(), this.remove(a)) : (b.each(this._pool, function(a) {
                c.remove(a._requestKey), a._isManuallyAborted = !0, a.abort()
            }), this.remove())
        }
    }(d.prototype);
    var e = function() {
        return new d
    }, f = e(), g = function(a) {
        f.add(a)
    }, h = function(a) {
        f.remove(a)
    }, i = function(a) {
        f.abort(a)
    }, j = function(a, b) {
        return a._requestKey = c.getRequestString(b), c.check(a._requestKey)
    }, k = function(a) {
        return a._isManuallyAborted && "abort" === a.statusText
    };
    return {createXHRPool: e,addXHR: g,removeXHR: h,abortXHR: i,isManuallyAbortedXHR: k,controlXHR: j}
});
/**
 * @fileoverview LocalStorage utility
 */
define('util/local-storage', ["underscore"], function(a) {
    var b = !1, c = "_", d = "_", e = window.localStorage, f = {}, g = function() {
    };
    if (f.isSupported = function() {
            if (!e)
                return !1;
            try {
                return e.setItem(c, d), e.getItem(c) ? (e.removeItem(c), !0) : !1
            } catch (a) {
                return !1
            }
        }, f.isSupported()) {
        if (b) {
            var h = function(a) {
                if (!a)
                    return a;
                for (var b = "", c = 0, d = a.length; d > c; c += 2)
                    b += String.fromCharCode((255 & a.charCodeAt(c)) << 8 | 255 & a.charCodeAt(c + 1));
                return b
            }, i = function(a) {
                if (!a)
                    return a;
                for (var b = "", c = 0, d = a.length; d > c; c++) {
                    var e = a.charCodeAt(c);
                    b += String.fromCharCode(e >>> 8, 255 & e)
                }
                return b
            }, j = e.getItem;
            e.getItem = function(a) {
                var b = j.call(e, a);
                return i(b)
            };
            var k = e.setItem;
            e.setItem = function(a, b) {
                return b = h(b), k.call(e, a, b)
            }
        }
        f.get = f.getItem = function(a) {
            return e.getItem(a)
        }, f.remove = f.removeItem = function(a) {
            return e.removeItem(a), this
        }, f.set = f.setItem = function(a, b) {
            try {
                return e.setItem(a, b), !0
            } catch (c) {
                return 22 == c.code, !1
            }
        }, f.clear = function() {
            return e.clear(), !0
        }, f.getObject = function(a) {
            return JSON.parse(f.get(a))
        }, f.setObject = function(a, b) {
            return f.set(a, JSON.stringify(b))
        }, f.each = function(a) {
            for (var b = 0, c = e.length; c > b; b++) {
                var d = e.key(b), f = e.getItem(d);
                a.call(this, f, d)
            }
        }, f.map = function(a) {
            for (var b = [], c = 0, d = e.length; d > c; c++) {
                var f = e.key(c), g = e.getItem(f), h = a.call(this, g, f);
                b.push(h)
            }
            return b
        }
    } else
        a.each(["get", "remove", "set", "clear", "getObject", "setObject", "each", "map"], function(a) {
            f[a] = function() {
                return g(), !1
            }
        });
    var l = 0;
    f.maxBytes = function(b) {
        return a.isUndefined(b) ? l : l = Number(b)
    };
    var m = "default";
    f.namespace = function(a) {
        return m = a
    }, f.contentKey = function(a) {
        return m + "." + a
    }, f.checksumKey = function(a) {
        return m + "-checksum." + a
    }, f.countKey = function(a) {
        return m + "-count." + a
    }, f.timeKey = function(a) {
        return m + "-time." + a
    }, f.isContentKey = function(a) {
        return 0 == a.indexOf(m + ".")
    }, f.originalKeyOfContent = function(a) {
        return a.slice(m.length + 1)
    };
    var n = function() {
        var b = f.map(function(a, b) {
            return b
        });
        return a.filter(b, function(a) {
            return f.isContentKey(a)
        })
    }, o = function(b) {
        var c = a.sortBy(n(), function(a) {
            var b = f.originalKeyOfContent(a), c = f.getCount(b);
            return Number(c)
        });
        return p(c, b)
    }, p = function(a, b) {
        var c, d, e, g, h, i, j = 0;
        for (c = 0, e = a.length; e > c && b > j; c++)
            g = a[c], h = f.get(g), j += h.length;
        if (b > j)
            return !1;
        for (d = 0; c > d; d++)
            g = a[d], i = f.originalKeyOfContent(g), f.removeContent(i), f.removeChecksum(i), f.removeTime(i), f.removeCount(i);
        return !0
    }, q = function(a) {
        return o(a)
    };
    return a.each(["get", "set", "remove"], function(a) {
        f[a + "Checksum"] = function(b, c) {
            return f[a](f.checksumKey(b), c)
        }, f[a + "Time"] = function(b, c) {
            return f[a](f.timeKey(b), c)
        }, f[a + "Count"] = function(b, c) {
            return f[a](f.countKey(b), c)
        }
    }), f.getContent = function(a) {
        return f.updateTime(a), f.updateCount(a), i(f.get(f.contentKey(a)))
    }, f.hasContent = function(a) {
        return !!f.get(f.contentKey(a))
    }, f.setContent = function(a, b) {
        var c = b.length;
        if (l && c > l)
            return !1;
        f.updateTime(a), f.updateCount(a);
        var d = h(b);
        return f.set(f.contentKey(a), d) ? !0 : q(c) ? f.set(f.contentKey(a), d) : (f.removeContent(a), !1)
    }, f.removeContent = function(a) {
        return f.removeChecksum(a), f.removeTime(a), f.removeCount(a), f.remove(f.contentKey(a))
    }, f.updateTime = f.updateAccessTime = function(a) {
        return f.setTime(a, (new Date).getTime())
    }, f.updateCount = f.updateAccessCount = function(a) {
        var b = Number(f.getCount(a)) || 0;
        return f.setCount(a, b + 1)
    }, f.verifyChecksum = function(a, b) {
        return f.hasContent(a) ? f.getChecksum(a) == b : (f.removeChecksum(a), f.removeTime(a), f.removeCount(a), !1)
    }, f.clearExpired = function(b) {
        var c = n();
        if (!a.isEmpty(c)) {
            var d = a.map(c, function(a) {
                return f.originalKeyOfContent(a)
            }), e = a.sortBy(d, function(a) {
                return f.getTime(a)
            })[0], g = f.getTime(e);
            b > g && f.clear()
        }
    }, f
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
define('lib/mobage-jssdk', ["jquery", "underscore", "util/navigate"], function(a, b, c) {
    function d(c, d, e, f) {
        function g(a) {
            function g(a, b, d) {
                var e = "[JSSDK] response status " + a.status, f = 0 === a.status ? "F" : "B";
                e += " error Type " + f + " random code " + j, h.reportError(e, c, null, null, null, function() {
                    d && d(a, b, j)
                })
            }
            var j = ("0000" + b.random(1, 99999)).slice(-5), k = "t=" + (new Date).getTime() + "&uid=" + h.userId + "&code=" + j;
            c += (c.indexOf("?") >= 0 ? "&" : "?") + k;
            var l = new XMLHttpRequest;
            if (l.open("POST", c), l.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), h.shellAppFlag && (l.setRequestHeader("X-MOBAGE-SHELLAPP", 1), a)) {
                var m = a.getVersionName(), n = Number(a.getVersionCode());
                "1.0" === m && n && n > 0 && (m += ".0." + n), l.setRequestHeader("X-MOBAGE-SHELLAPP-VERSION", m)
            }
            l.setRequestHeader("X-VERSION", h.version), l.onreadystatechange = function() {
                if (4 === l.readyState) {
                    if (200 <= l.status && l.status < 300) {
                        var a = l.response;
                        i.resolve(a), e && e(a)
                    } else {
                        var b = l.statusText;
                        i.reject(b), g(l, b, f)
                    }
                    l.onreadystatechange = new Function
                }
            }, l.send(JSON.stringify(d))
        }
        var h = window.Game, i = new a.Deferred;
        return h.shellAppFlag ? require(["lib/shellapp"], function(a) {
            g(a)
        }) : g(), i.promise()
    }
    function e(a) {
        if (a !== g) {
            var b = 0 === a.indexOf("#") ? a : h;
            c.hash(b, {refresh: !0})
        }
    }
    var f = "mobage", g = "null", h = "#top", i = "grbl", j = "1", k = !1, l = !1, m = null, n = null, o = null, p = null, q = {}, r = {}, s = r.callAfterReady = function(a) {
        a && (l ? a() : document.addEventListener("mobageReady", function() {
            l = !0, a()
        }))
    };
    r.requireOnceJSSDKClient = function(a) {
        if (a && !k) {
            k = !0;
            var b = document.createElement("script");
            b.type = "text/javascript", b.async = !0, b.src = a, document.getElementsByTagName("script")[0].parentNode.appendChild(b)
        }
    }, r.mobageInit = function(a) {
        return a ? void s(function() {
            if (m !== a.clientId || n !== a.redirectUri) {
                m = a.clientId, n = a.redirectUri;
                try {
                    window.mobage.init(a)
                } catch (b) {
                    m = null, n = null
                }
            }
        }) : null
    }, r.mobageGetConnectedStatus = function(b, c, d) {
        var e = new a.Deferred;
        return s(function() {
            window.mobage.oauth.getConnectedStatus(b, function(a, b) {
                b ? (e.resolve(b), c && c(b)) : (e.reject(a), d && d(a))
            })
        }), e.promise()
    };
    var t = r.mobageConnect = function(c, d, e) {
        var f = new a.Deferred;
        return c = b.defaults(c, {customTheme: i,appearanceVersion: j}), s(function() {
            window.mobage.oauth.connect(c, function(a, b) {
                a ? (f.reject(a), e && e(a)) : (f.resolve(b), d && d(b))
            })
        }), f.promise()
    }, u = r.login = function(a, c, f, g) {
        var h = window.Game, i = c && c.response || {}, j = {code: i.code,state: i.state,session_state: i.session_state}, k = a && a.redirectUri || n;
        return b.isUndefined(f) && (f = e), b.isUndefined(g) && (g = function(a, b, c) {
            if (h.view)
                h.view.trigger("data_error", [a.status, c]);
            else {
                var d = h.message.connectionError;
                alert(d)
            }
        }), d(k, j, f, g)
    }, v = r.tryLogin = function(c, d, f, g) {
        b.isUndefined(f) && (f = e);
        var h = new a.Deferred;
        return u(c, d, function(a) {
            "#authentication/failed_empty" === a || "#authentication/failed_exist" === a ? (h.reject(), g && g()) : (h.resolve(), f && f(a))
        }, function(a, b, c) {
            h.reject(), g && g()
        }), h.promise()
    }, w = (r.singleLogin = function(b, c, d) {
        var e = new a.Deferred;
        return t(b, function(a) {
            u(b, a, c, d).done(function(a) {
                e.resolve(a)
            }).fail(function(a) {
                e.reject(a)
            }).always(function() {
                var b = a && a.response && a.response.session_state;
                b && Game.reportError("LOGOUT_CHECK_357124:mobage-jssdk singleLogin mobageSubscribeLogout sessionState = " + b, null, null, null, null, function() {
                    z(b)
                })
            })
        }, function(a) {
            e.reject(a)
        }), e.promise()
    }, r.trySingleLogin = function(b, c, d) {
        var e = new a.Deferred;
        return t(b, function(a) {
            v(b, a, c, d).done(function(a) {
                e.resolve(a)
            }).fail(function(a) {
                e.reject(a)
            }).always(function() {
                var b = a && a.response && a.response.session_state;
                b && Game.reportError("LOGOUT_CHECK_357124:mobage-jssdk trySingleLogin mobageSubscribeLogout sessionState = " + b, null, null, null, null, function() {
                    z(b)
                })
            })
        }, function(a) {
            e.reject(a)
        }), e.promise()
    }), x = r.mobageLogout = function(b, c, d) {
        Game.reportError("LOGOUT_CHECK_357124:mobage-jssdk mobageLogout", null, null, null, null, function() {
            var e = new a.Deferred;
            return s(function() {
                window.mobage.oauth.logout(b, function(a, b) {
                    a ? (e.reject(a), d && d(a)) : (e.resolve(b), c && c(b))
                })
            }), e.promise()
        })
    }, y = r.logout = function(a, c, f) {
        Game.reportError("LOGOUT_CHECK_357124:mobage-jssdk logout", null, null, null, null, function() {
            return b.isUndefined(c) && (c = e), b.isUndefined(f) && (f = null), d("logout", a, c, f)
        })
    };
    r.singleLogout = function(b, c, d) {
        var e = new a.Deferred;
        return x(b, function(a) {
            y(b, c, d).done(function(a) {
                e.resolve(a)
            }).fail(function(a) {
                e.reject(a)
            })
        }, function(a) {
            e.reject(a)
        }), e.promise()
    };
    r.mobageSubscribeLogin = function(a, c) {
        b.isUndefined(c) && (c = function(b) {
            w({state: a})
        }), s(function() {
            if (o !== a) {
                o = a;
                var b = "oauth.loginRequired", d = q[b];
                d && window.mobage.event.unsubscribe(d), q[b] = window.mobage.event.subscribe(b, function() {
                    c && c(b)
                })
            }
        })
    };
    var z = r.mobageSubscribeLogout = function(a, c) {
        b.isUndefined(c) && (c = function(b) {
            y({platform: f,session_state: a})
        }), s(function() {
            if (p !== a) {
                p = a;
                var b = "oauth.sessionStateChange", d = q[b];
                d && window.mobage.event.unsubscribe(d), q[b] = window.mobage.event.subscribe(b, a, function(a) {
                    "changed" === a && c && c(b)
                })
            }
        })
    };
    return r
});
//define('model/data', ["underscore", "backbone", "util/ajax", "lib/shellapp", "util/local-storage", "util/language-message", "lib/mobage-jssdk"], function(_, backbone, ajaxUtil, shellApp,localStorageUtil,languageUtil, jsSdk) {
define('model/data', ["underscore", "backbone", "util/ajax", "lib/shellapp", "util/local-storage", "util/language-message", "lib/mobage-jssdk"], function(a, b, c, d,e,f, g) {
                             /*a        b            c              d               e                    f                        g*/
    var h = [],
        i = !1,
        j =b.Model.extend({
            initialize: function() {
                this.listenTo(this, "error", this.error),
                    this.error = this.getErrorStorageValue()
            },parse: function(json) {
                return json
            },error: function(b, d, f) {
                if (!c.isManuallyAbortedXHR(d) && (404 === d.status && null === d.getResponseHeader("Content-Length") && (d.status = 0), 409 != d.status && 410 != d.status)) {
                    var g = ("0000" + a.random(1, 99999)).slice(-5), h = "[DataModel] response status " + d.status, i = 0 === d.status ? "F" : "B";
                    f.ignoreError ? Game.reportError(h, b.url() || f.url) : 0 === this.error && e.isSupported() ? (Game.reportError(h + this.getXHRErrorMsg(i, "POPUP", g), b.url() || f.url), Game.view.trigger("data_error", [d.status, g]), this.setErrorStorageValue(1)) : (Game.reportError(h + this.getXHRErrorMsg(i, "PAGE", g), b.url() || f.url), Game.view.trigger("page_error"), this.removeErrorStorageValue())
                }
            },sync: function(a, c, d) {
                return d = d || {}, d.cache = d.cache || !1, b.Model.prototype.sync.apply(this, arguments)
            },setErrorStorageValue: function(a) {
                var b = this.getStorageKey();
                e.set("model_error_hash", b), e.set(b, a)
            },getErrorStorageValue: function() {
                return e.get(this.getStorageKey()) || 0
            },removeErrorStorageValue: function() {
                e.remove("model_error_hash"), e.remove(this.getStorageKey())
            },getStorageKey: function() {
                return location.hash + "_model_error"
            },getXHRErrorMsg: function(a, b, c) {
                return " error Type " + a + "-" + b + " random code " + c
            }});
    return j
});
define('model/token-data', ["jquery", "underscore", "backbone", "model/data", "util/ajax"], function(a, b, c, d, e) {
    var f = d.extend({defaults: function() {
        return {special_token: null}
    },initialize: function() {
        d.prototype.initialize.apply(this)
    },setToken: function() {
        this.set(this.security.attributes), this.set({special_token: Math.floor(1e4 * Math.random())})
    },save: function(c, e, f) {
        var g;
        null == c || "object" == typeof c ? (g = c, f = e) : (g = {}, g[c] = e), f = f || {}, f.url = f.url || this.url(), f.url = f.url + "?_=" + (new Date).getTime();
        var h = b.bind(d.prototype.save, this, g, f);
        if (this._cflExists()) {
            var i = this;
            this.func = h;
            var j = this.saveDeferred = new a.Deferred, k = this.saveDeferred.promise();
            return k.abort = function() {
                delete i.func, j.reject(), j = null, k.abort = function() {
                }
            }, this.security = new (d.extend({urlRoot: Game.baseUri + "security/csrf"})), this.listenToOnce(this, "change:special_token", this._check), this.listenToOnce(this.security, "change", this.setToken), this.security.fetch(), k
        }
        return h()
    },_check: function() {
        var a = this;
        if (void 0 == this.func)
            ;
        else {
            var b = this.func();
            b.done(function() {
                a.saveDeferred.resolve(a)
            }).fail(function() {
                a.saveDeferred.reject()
            }), a.saveDeferred.fail(function() {
                e.abortXHR(b)
            }).always(function() {
                a.saveDeferred = null
            })
        }
    },_cflExists: function() {
        var a = this._getSegment(this.url()), c = new Function("return " + b.unescape(Game.cfl))();

        return c&& c[a] ? !0 : !1
    },_getSegment: function(a) {
        var b = Game.baseUri.length - 1, c = a.indexOf("?");
        return 0 > c && (c = a.length), a.substring(b, c).replace(/(\/$|.json)/, "")
    }});
    return f
});
define('model/content', ["underscore", "backbone", "model/data", "lib/sound", "model/sound"], function(a, b, c, d, e) {
                             /*a           b           c              d             e*/
    var f = c.extend({urlRoot: function() {
        var b = Game.baseUri + ("" !== this.get("module") ? this.get("module") + "/" : "") + this.get("controller") + "/content/" + this.get("action"), c = this.get("param");
        if (null != c) {
            var d = "";
            a.each(c, function(a, b) {
                d += "/" + a
            }), b += d
        }
        console.info(b);
        return b
    },initialize: function(a) {
        c.prototype.initialize.apply(this)
    },defaults: function() {
        return {module: "",controller: "",action: "index",param: null}
    },error: function(a, b, d) {
        c.prototype.error.apply(this, [a, b, d])
    }});
    return f
});
define('general',function(){
    var object = {
        hideURLbar:function(){

        }
    };
    return object;
})
define('view/loading', ["underscore", "backbone", "general"], function(a, b, c) {
    var d = b.View.extend({el: "#loading",initialize: function() {
        a.bindAll(this)
    },loadStart: function() {
        this.$el.add("#ready").css("display", "block"), $(".contents").css("display", "none"), this.fadeControll(!0), c.hideURLbar()
    },xhrStart: function() {
        this.$el.css("display", "block"), this.fadeControll(!0)
    },loadEnd: function() {
        this.$el.css("display", "none"), this.fadeControll(!1), this.trigger("fadeOut")
    },xhrEnd: function() {
        this.$el.css("display", "none"), this.fadeControll(!1)
    },fadeControll: function(a) {
        a ? this.$el.find(".img-load").css("display", "block") : this.$el.find(".img-load").css("display", "none")
    }});
    return d
});
/**
 * @fileoverview CreateJS manifest Loader
 */
define('model/manifest-loader', ["underscore", "backbone", "util/backbone-singleton"], function(a, b) {
    var c = window.images = window.images || {}, d = {}, e = b.Model.extend({initialize: function() {
        this.loadQueue = new createjs.LoadQueue(!1), this.loadQueue.setMaxConnections(5), this.loadQueue.addEventListener("error", a.bind(this.handleError, this)), this.loadQueue.addEventListener("fileload", a.bind(this.handleFileLoad, this)), this.loadQueue.addEventListener("complete", a.bind(this.handleComplete, this)), window.CreateJsShell && 1 == Game.setting.cjs_mode && (this.loadQueue._progress = 1)
    },setImageAlias: function(a, b) {
        c[b] = c[a], d[b] = d[a]
    },handleFileLoad: function(a) {
        var b, d = a.item.id;
        switch (a.item.type) {
            case createjs.LoadQueue.IMAGE:
                b = a.result, c[d] = b
        }
        this.trigger("fileload", a)
    },handleComplete: function(a) {
        this.trigger("complete", a), window.CreateJsShell && 1 == Game.setting.cjs_mode && (this.loadQueue._progress = 0)
    },handleError: function(a) {
        this.trigger("error", a)
    },getLoadingTarget: function(b) {
        if (!b)
            return null;
        a.isObject(b) || (b = {id: b,src: b});
        var e = b.id;
        return a.has(c, e) && d[e] == b.src ? null : (d[e] = b.src, a.defaults({type: createjs.LoadQueue.IMAGE}, b))
    },loadManifest: function(b, c, d) {
        var e = this, f = [];
        a.each(b, function(b) {
            var c = e.getLoadingTarget(b);
            c && (a.defaults(c, {cache: !0}), f.push(c))
        }), f = a.uniq(f), a.isEmpty(f) ? this.loadQueue.dispatchEvent("complete") : this.loadQueue.loadManifest(f, c, d)
    },loadFile: function(b, c, d) {
        var e = this, f = e.getLoadingTarget(b);
        f && (a.defaults(f, {cache: !0}), this.loadQueue.loadFile(f, c, d))
    },load: function() {
        this.loadQueue.load()
    },close: function() {
        this.loadQueue.close()
    },setMaxConnections: function(a) {
        this.loadQueue.setMaxConnections(a)
    },addEventListener: function(a, b) {
        this.once(a, b)
    },clear: function() {
        a.each(d, function(a, b) {
            delete c[b]
        }), d = {}
    },reset: function() {
        this.loadQueue.reset()
    }});
    return e.makeSingleton(["loadFile", "loadManifest", "load", "clear", "setImageAlias", "on", "off", "once", "addEventListener", "reset"]), e
});
define('model/cjs-loader', ["jquery", "underscore", "backbone", "model/manifest-loader", "util/jquery.whenall", "util/backbone-singleton"], function(a, b, c, d) {
    var e = window.lib = window.lib || {}, f = {}, g = {}, h = {}, i = {}, j = "cjs/", k = "model/manifest/", l = Game.baseUri + "cassets/cache/" + Game.jsUri.replace(/.*\//g, ""), m = c.Model.extend({loadFiles: function(c, l) {
        var m = this, n = new a.Deferred, o = b.reject(c, function(a) {
            return b.has(f, a) || b.has(g, a)
        });
        b.each(o, function(a) {
            g[a] = 1
        }), o = b.unique(b.sortBy(o));
        var p = function() {
            n.resolve();
            var a = b.difference(b.union(c, b.keys(g)), b.keys(f));
            b.isEmpty(a) && m.trigger("complete")
        };
        if (b.isEmpty(o))
            p();
        else {
            var q = new a.Deferred, r = new createjs.LoadQueue(!1, Game.jsUri + "/", !0);
            r.setMaxConnections(5), r.on("complete", function() {
                q.resolve()
            }), r.on("fileload", function(a) {
                if (a.item) {
                    var c = a.item.id;
                    if (c) {
                        var d = b.last(c.split("/"));
                        e[d].prototype.playFunc = function(a) {
                            createjs.Tween.get().wait(1).call(a)
                        }, f[d] = d, h[c] = e[d]
                    }
                }
            }), r.on("error", function(a) {
                q.reject()
            });
            var s = b.map(o, function(a) {
                var b = j + a;
                return {id: b,src: b + ".js",type: createjs.LoadQueue.JAVASCRIPT,cache: !0}
            });
            r.loadManifest(s);
            var t = a.whenAll.apply(null, b.map(o, function(b) {
                var c = k + b, e = new a.Deferred;
                return require([c], function(a) {
                    if (i[c] = a.prototype.defaults.manifest, l) {
                        var b = i[c];
                        d.once("complete", function() {
                            e.resolve()
                        }), d.loadManifest(b, !0)
                    } else
                        e.resolve()
                }, function(a) {
                    e.reject()
                }), e
            }));
            a.when(q, t).always(function() {
                p()
            })
        }
        return n
    },cjs: function(a) {
        return a ? h[j + a] : b.values(h)
    },manifest: function(a) {
        return a ? i[k + a] : b.values(i)
    },clear: function() {
        b.each(b.keys(requirejs.s.contexts._.defined), function(a) {
            0 == a.indexOf(l) && (require.undef(a), delete e[a])
        }), b.each(h, function(a, b) {
            require.undef(b), delete e[b]
        }), b.each(i, function(a, b) {
            require.undef(b), delete e[b]
        }), f = {}, g = {}, h = {}, i = {}, d.clear()
    }});
    return m.makeSingleton(["loadFiles", "cjs", "manifest", "clear", "on", "off", "once"]), m
});
define('util/backbone-singleton', ["underscore", "backbone"], function(a, b) {
    var c = function(b, c) {
        return c = c || a.reject(a.keys(b.prototype), function(a) {
            return "_" == a[0]
        }), b.prototype.constructor = function() {
            return b._instance ? b._instance : (b._instance = this, b.prototype.constructor.apply(this, arguments))
        }, b.getInstance = function() {
            return this._instance = this._instance || new b, this._instance
        }, a.each(c, function(a) {
            b[a] = function() {
                var c = b.getInstance();
                return c[a].apply(c, arguments)
            }
        }), b
    };
    return b.Model.makeSingleton = function(a) {
        c(this, a)
    }, {makeSingleton: c}
});
define('model/data-loader', ["jquery", "underscore", "backbone", "util/backbone-singleton"], function(a, b, c) {
    var d = {}, e = c.Model.extend({clear: function(a) {
        a ? b.has(d, a) && delete d[a] : d = {}
    },load: function(c, e) {
        var f = this;
        if (e = e || {}, e = b.defaults(e, {cache: !0}), e.cache && b.has(d, c))
            return e.success && e.success.call(f, d[c]), f.trigger("complete"), (new a.Deferred).resolve().promise();
        var g = new a.Deferred;
        return a.ajax({url: Game.baseUri + c,cache: !1,success: function(a) {
            e.success && e.success.apply(f, arguments), e.cache && (d[c] = a), g.resolve(), f.trigger("complete")
        },error: function() {
            e.error && e.error.apply(f, arguments), g.reject()
        }}), g.promise()
    }});
    return e.makeSingleton(["load", "clear", "on", "off", "once"]), e
});
define('model/sound', ["jquery", "underscore", "backbone", "constant", "lib/sound", "model/data", "model/data-loader", "util/local-storage"], function(a, b, c, d, e, f, g, h) {
    var i = "silent", j = "se/btn_se/btn_se_03.mp3", k = [{se: i,classes: ["prt-silent-se", "btn-silent-se", "btn-help-topic-title", "btn-command-forward"]}, {se: "se/queststart_se_1.mp3",classes: ["se-quest-start"]}, {se: "se/target_se_1.mp3",classes: ["btn-targeting"]}, {se: "se/book_open_se_1.mp3",classes: ["btn-story", "btn-archive-list", "btn-library"]}, {se: "se/stamp_se_1.mp3",classes: ["btn-stamp-ok"]}, {se: "se/btn_se/btn_se_02.mp3",classes: ["btn-usual-cancel", "btn-usual-text-cancel", "btn-usual-cancel-small", "btn-usual-close", "btn-head-close", "btn-deck-cancel", "btn-cancel", "btn-close", "btn-help-close", "btn-command-back", "btn-log", "btn-ability-unavailable", "btn-summon-unavailable", "btn-tutorial-disable", "btn-play uncleared"]}, {se: "se/menu_open_se_1.mp3",classes: ["btn-head-pop", "btn-open"]}, {se: "se/menu_close_se_1.mp3",classes: ["btn-head-close"]}, {se: "se/btn_se/btn_se_04.mp3",classes: ["se-start", "btn-result", "btn-start", "btn-tutorial-start"]}, {se: "se/btn_se/btn_se_05.mp3",classes: ["btn-attack-start"]}, {se: "se/btn_se/btn_se_01.mp3",classes: ["se-ok", "btn-select-baloon", "btn-usual-ok"]}, {se: j,classes: ["btn-shine", "btn-ability-available", "btn-summon-available", "btn-archive-item", "btn-treasure-item"]}], l = [{se: "se/sell_se_1.mp3",classes: ["pop-sell-result"]}], m = c.Model.extend({
        loadSound: function(a, b) {
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
        return b = b || {},
            b.alias = b.alias || d.BGM_ALIAS,
            b.loop = !0,
        b.force && (b.force = !1, delete b.force),
            this.playSound(a, b)
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
define('view/content', ["underscore", "backbone", "model/content","lib/shellapp"],function(_,backbone,contentModel,shellApp) {
    var view = backbone.View.extend(
        {
            el: ".contents",
            setTimeoutTimerIdObj: {},
            setIntervalTimerIdObj: {},
            initialize: function (params) {

            },
            content_render:function(json){
                this.$el.html(decodeURIComponent(json.get("data")));
                var cssResource = this.$el.find("#asset-css").attr("css");
                var isError = false;
                var _this = this;
                var cssPath = Game.cssUri + cssResource, loadQueue = new createjs.LoadQueue(!0);
                $("head>style.page").remove();
                loadQueue.addEventListener("fileload", function(e) {
                    e.item.type === createjs.LoadQueue.CSS && (e.result.className = "page")
                }), loadQueue.addEventListener("complete", function(a) {
                    loadQueue.removeAllEventListeners(), isError || ($(".contents").css("display", "block"), $("#ready").css("display", "none"), _this.trigger("readyFadeOut"))
                }), loadQueue.addEventListener("error", function(a) {
                    alert("init content failed"), isError = true
                }), loadQueue.loadFile(cssPath);

            },
        addSubView: function(subView) {
            this._subViews || (this._subViews = {}), this._subViews[subView.cid] = subView
         },
        removeSubView: function(subView) {
            delete this._subViews[subView.cid]
        },
            content_bind: function () {
                this.on("loadStart", Game.loading.loadStart),
                    this.on("xhrStart", Game.loading.xhrStart),
                    this.on("loadEnd", Game.loading.loadEnd),
                    this.on("xhrEnd", Game.loading.xhrEnd),
                    this.on("page_error", this.page_error),
                    this.on("data_error", this.data_error),
                    this.on("popup_error", this.popup_error)
            },
            content_clear:function(){
                $(".mask").removeClass().addClass("mask")
            },
            content_close: function() {
                /*this.off(),
                    this.undelegateEvents(),
                    this.stopListening(),
                    this.timerOff(),
                    this.clearTimeoutAll(),
                    this.clearIntervalAll(),
                    this.destroy && this.destroy(),
                    this.destroySubViews(),
                    this.destroyStage(),
                    this.abortAjax();
                */
            },
            destroyImages: function() {
                if (this.el && !f.isShellApp()) {
                    var a = 0, b = this.el.getElementsByTagName("img");
                    for (a = 0; a < b.length; ++a)
                        b[a].src = "";
                    var c = this.el.getElementsByTagName("canvas");
                    for (a = 0; a < c.length; ++a)
                        c[a].width = 0
                }
            }
        });
    return view;
});
define('view/popup', ["underscore", "backbone", "model/sound"], function(a, b, c) {
    var d = 0, e = b.View.extend({el: "#pop",defaults: {className: null,title: null,body: null,flagBtnCancel: 0,flagBtnOk: 0,flagBtnClose: 0,btnOkClassName: null,btnCancelClassName: null,btnCloseClassName: null,showStartCallback: null,showEndCallback: null},events: {"tap .btn-usual-ok": "onPushOk","tap .btn-usual-cancel": "onPushCancel","tap .btn-usual-close": "onPushClose"},initialize: function() {
        this.options = this.options || {}, this.options.targetObj && $(this.options.targetObj).length && (this.el = this.options.targetObj), this.setElement(this.el), this.options = a.defaults(this.options, this.defaults)
    },render: function() {
        return this.$el.html(a.template($("#popup").html(), this.options)), this
    },popShow: function(a, b) {
        this.options.showStartCallback && this.options.showStartCallback(), clearTimeout(d), $(".mask").css("display", "block");
        var e = this.$el.find(".pop-usual"), f = this;
        c.playPopShowSE(e);
        var g = this.options.showEndCallback;
        g && e.oneTransitionEnd(function() {
            e.off("transitionend webkitTransitionEnd"), g()
        }, 300);
        var h, i = Number($("html").height()), j = Number($("html").css("zoom")), k = $(document).scrollTop();
        Game.ua.isJssdk() && (i = Number($("#mobage-game-container").height()), j = 1 >= j ? Number($("#mobage-game-container").css("zoom")) : j, k = $("#mobage-game-container").parent().scrollTop());
        var l = $(window).height() / j, m = 50 * +j;
        if (0 < $("#debug").length && (m = m + +$("#debug").height() + 30), "undefined" != typeof a)
            h = b;
        else {
            var n = k / j;
            l + n > i && (n = i - l), h = (l - e.height()) / 2 + n
        }
        e.css({display: "block",top: h + "px"}).delay(100).queue(function() {
            if (a)
                $(this).removeClass("pop-hide").addClass("pop-show");
            else {
                var b = h, c = b + e.height(), d = Game.ua.isChromeApp() && 100 > m ? 100 : m, g = i - d;
                c > g && (b = g - e.height()), 0 > b && (b = 0);
                var j = +i - +e.height() - +m;
                if (0 > j) {
                    var k = Math.abs(j), l = $("#wrapper").css("margin-bottom").replace(/px/g, ""), n = +l + k + 50;
                    f.updatedWrapperMargin = !0, f.updateWrapperMargin(1, n)
                }
                h != b ? (e.css("top", b + "px"), setTimeout(function() {
                    e.removeClass("pop-hide").addClass("pop-show")
                }, 100)) : $(this).removeClass("pop-hide").addClass("pop-show")
            }
        })
    },popClose: function() {
        var a = this;
        this.updateWrapperMargin(0, 0), this.$el.find(".pop-usual").removeClass("pop-show").addClass("pop-hide").oneTransitionEnd(function() {
            $(this).css("display", "none"), a.popOff(), a.trigger("popClose")
        }, 300)
    },popRemove: function(a) {
        var b = this;
        this.trigger("removeStart"), this.updateWrapperMargin(0, 0), this.$el.find(".pop-usual").removeClass("pop-show").addClass("pop-hide").oneTransitionEnd(function() {
            1 != a && $(this).add(".mask").css("display", "none"), b.trigger("removeEnd"), $(this).off("transitionend webkitTransitionEnd"), b.destroy()
        }, 300)
    },locationUnclaimed: function(a) {
        this.popRemove(), b.history.navigate("#quest/assist/unclaimed", !0)
    },popOff: function() {
        this.off(), this.undelegateEvents(), this.stopListening()
    },popDelete: function() {
        this.$el.find(".pop-usual").removeClass("pop-show").addClass("pop-hide"), $(this).add(".mask").css("display", "none"), $(this).off("transitionend webkitTransitionEnd"), this.off(), this.undelegateEvents(), this.stopListening(), this.updateWrapperMargin(0, 0)
    },destroy: function() {
        this.popOff(), this.$el.empty()
    },onPushOk: function() {
        this.trigger("ok")
    },onPushCancel: function() {
        this.trigger("cancel")
    },onPushClose: function() {
        this.trigger("close")
    },updateWrapperMargin: function(a, b) {
        this.updatedWrapperMargin && (this.defaultWrapperMarginBottom || (this.defaultWrapperMarginBottom = $("#wrapper").css("margin-bottom").replace(/px/g, "")), 0 === a ? $("#wrapper").css("margin-bottom", this.defaultWrapperMarginBottom + "px") : $("#wrapper").css("margin-bottom", b + "px"))
    }});
    return e
});