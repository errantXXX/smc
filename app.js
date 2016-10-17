console.ll = console.info;
console.ll(22);
var loadCreateJS = function(a) {
    0 === Game.setting.cjs_mode ? require(["lib/createjs"], function() {
        require(["lib/createjs-patch", "lib/soundjs-0.5.2-patch"], function() {
            a()
        })
    }) : 1 === Game.setting.cjs_mode && require(["createjsliteopengl"], function(b) {
        window.createjs = b, require(["lib/createjslite-patch"], function() {
            a()
        })
    })
};


require(["lib/common"], function() {

    require(["util/device"]);
    var a = (new UAParser).getResult();
    if (Game.ua = Game.ua ? _.extend(Game.ua, a) : a, window.AndroidCacheProxy) {
        window.AndroidCacheProxy.setCacheManifest = function(a, b, c) {
            var d = window.localStorage.cy_last_time || 0;
            window.localStorage.cy_last_time = Date.now();
            var e = window.localStorage.cy_cache_manifest || "";
            if (a != e) {
                var f = .001 * d | 0;
                AndroidCacheProxy.dispatch("updateCache," + f + "," + a), window.localStorage.cy_cache_manifest = a
            } else
                AndroidCacheProxy.dispatch("clearCache," + b + "," + c)
        };
        var b = window.localStorage.cache_size || 0, c = window.localStorage.cache_retention || 0;
        AndroidCacheProxy.setCacheManifest(Game.modifiedListUri, b, c)
    }
    loadCreateJS(function() {
        require(["jquery", "underscore", "util/ajax", "lib/shellapp"], function(a, b, c, d) {
            function e(a, c, d) {
                var e = new XMLHttpRequest;
                e.url = "", e.onreadystatechange = function() {
                    (e.readyState === XMLHttpRequest.prototype.DONE || e.readyState === XMLHttpRequest.prototype.UNSENT) && d && d(e)
                }, e.open("POST", i.baseUri + "survey/status?_=" + (new Date).getTime()), e.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                var f = b.map({url: a,status: c,href: window.location.href}, function(a, b) {
                    return b + "=" + a
                }).join("&");
                e.send(f)
            }
            var f = function() {
                if (window.AndroidCacheProxy && window.localCacheServerPort) {
                    var a = {jpg: !0,jpeg: !0,png: !0,mp3: !0,mp4: !0,woff: !0,ogg: !0}, c = function(b, c) {
                        var d = b.substring(b.lastIndexOf("/") + 1), e = d.indexOf("?");
                        -1 !== e && (d = d.substring(0, e));
                        var f = d.indexOf("#");
                        -1 !== f && (d = d.substring(0, f));
                        var g = !1;
                        if (c)
                            g = !0;
                        else {
                            var h = d.substring(d.lastIndexOf(".") + 1);
                            g = a[h] === !0
                        }
                        return g ? "http://localhost:" + window.localCacheServerPort + "/" + d + "?oriUri=" + b : b
                    }, d = function(a) {
                        var b = document.createElement("img");
                        b.crossOrigin = "anonymous";
                        var d = function() {
                            b.removeEventListener("load", e), b.removeEventListener("error", f), b.src = "", b = null
                        }, e = function() {
                            var c = document.createElement("canvas"), e = c.getContext("2d");
                            e.drawImage(b, 0, 0);
                            try {
                                e.getImageData(0, 0, 1, 1)
                            } catch (f) {
                                return void d()
                            }
                            a(), d()
                        }, f = function() {
                            d()
                        };
                        b.addEventListener("load", e), b.addEventListener("error", f), b.src = c(window.Game.baseUri + "favicon.ico", !0)
                    }, e = function() {
                        var a = window.createjs.LoadQueue.prototype, d = a.loadFile;
                        a.loadFile = function(a, b, e) {
                            "string" == typeof a ? a = c(a) : "string" == typeof a.src && (a.src = c(a.src)), d.call(this, a, b, e)
                        };
                        var e = a.loadManifest;
                        a.loadManifest = function(a, d, f) {
                            b.isArray(a) && b.each(a, function(a) {
                                "string" == typeof a.src && (a.src = c(a.src))
                            }), e.call(this, a, d, f)
                        }
                    }, f = document.createElement("canvas"), g = f.getContext("webgl") || f.getContext("experimental-webgl");
                    window.createjs.denaVersion && g ? d(e) : e()
                }
            };
            if (f(), d.isShellApp() && window.Game.ua.versionCompare(d.getVersionName(), "1.3.9") > 0) {
                var g = function() {
                    function a() {
                        window.mobage && window.mobage.shellapp && window.mobage.shellapp.ChangeLanguage && window.mobage.shellapp.ChangeLanguage.exec(d)
                    }
                    function b() {
                        window.mobage && window.mobage.shellapp && window.mobage.shellapp.ChangeLanguage && window.mobage.shellapp.ChangeLanguage.exec(e + "ja" + f)
                    }
                    function c() {
                        window.mobage && window.mobage.shellapp && window.mobage.shellapp.ChangeLanguage && window.mobage.shellapp.ChangeLanguage.exec(e + "en" + f)
                    }
                    var d = '{"command": "get_current_language", "callback_ok": "callbackOKLanguageV", "callback_ng": "callbackNGLanguageV"}', e = '{"command": "set_language", "language": "', f = '", "callback_ok": "callbackOKLanguage", "callback_ng": "callbackNGLanguageV"}';
                    window.callbackOKLanguage = function() {
                    }, window.callbackNGLanguage = function() {
                    }, window.callbackOKLanguageV = function(a) {
                    }, window.callbackNGLanguageV = function(a) {
                    }, window.callbackOKLanguageV = function(a) {
                        if (window.Game.lang != a)
                            switch (window.Game.lang) {
                                case "ja":
                                    b();
                                    break;
                                case "en":
                                default:
                                    c()
                            }
                    }, a()
                };
                g()
            }
            var h = null, i = window.Game;
            i.ajaxConnecting = !1;
            var j = a(document);
            j.on("ajaxError", function(a, b, c) {
                (409 == b.status || 410 == b.status) && (i.ajaxStatus = b.status, requirejs.onError = function() {
                }, h = c.url)
            }), j.on("ajaxStart", function() {
                i.ajaxConnecting = !0
            }), j.on("ajaxStop", function() {
                i.ajaxConnecting = !1, 409 == i.ajaxStatus && e(h, 409, function() {
                    alert(i.message.update), window.location.reload()
                }), 410 == i.ajaxStatus && e(h, 410, function() {
                    alert(i.message.appUpdate), d.openBrowser(d.getUpdateUrl())
                })
            }), a.ajaxSetup({beforeSend: function(a, b) {
                if (b.url) {
                    var e = (new Date).getTime() + "&uid=" + i.userId;
                    b.url += (b.url.indexOf("?") >= 0 ? "&t=" : "?t=") + e
                }
                if ("GET" !== b.type && c.controlXHR(a, b.url))
                    return !1;
                if (i.shellAppFlag) {
                    a.setRequestHeader("X-MOBAGE-SHELLAPP", 1);
                    var f = d.getVersionName(), g = Number(d.getVersionCode());
                    "1.0" === f && g && g > 0 && (f += ".0." + g), a.setRequestHeader("X-MOBAGE-SHELLAPP-VERSION", f)
                }
                a.setRequestHeader("X-VERSION", i.version), (409 == i.ajaxStatus || 410 == i.ajaxStatus) && a.abort(), c.addXHR(a)
            },complete: function(a) {
                c.removeXHR(a)
            }}), require(["lib/locallib"], function() {
                require(["backbone", "view/loading", "router/app-router"], function(a, b, c) {
                    i.loading = new b, i.router = new c, a.history.start(), i.submenu && require(["submenu"])
                })
            })
        })
    })
});
