 /**
 * ShellApp Library
 */
define(["jquery", "underscore"], function(a, b) {
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
