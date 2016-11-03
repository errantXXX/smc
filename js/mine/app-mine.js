console.ll = console.info;
console.l = function(log,name) {
    console.ll('-----------------');
    if(name){
        console.ll(name + 'is:');
    }
    console.ll(log);
    console.ll('-----------------');

}
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
    console.log('lib/common')
    var userAgent = (new UAParser).getResult();
    Game.ua = Game.ua ? _.extend(Game.ua, userAgent) : userAgent;

    if ( window.AndroidCacheProxy) {
        window.AndroidCacheProxy.setCacheManifest = function(a, b, c) {
            var cyLastTime = window.localStorage.cy_last_time || 0;
            window.localStorage.cy_last_time = Date.now();
            var cyCacheManifest = window.localStorage.cy_cache_manifest || "";
            if (a != cyCacheManifest) {
                var timeValue = .001 * cyLastTime | 0;
                AndroidCacheProxy.dispatch("updateCache," + timeValue + "," + a), window.localStorage.cy_cache_manifest = a
            } else
                AndroidCacheProxy.dispatch("clearCache," + b + "," + c)
        };
        var cacheSize = window.localStorage.cache_size || 0;
        var cacheRetention = window.localStorage.cache_retention || 0;
        AndroidCacheProxy.setCacheManifest(Game.modifiedListUri, cacheSize, cacheRetention);
    }
    loadCreateJS(function() {
        console.info('loadCreatejs');
        require(["jquery", "underscore", "util/ajax", "lib/shellapp"], function($/*a*/, _/*b*/, ajaxUtil/*c*/, shellApp/*d*/) {

            /*//send ajax funtion
            function sendAjax(a, c, d) {
                var ajax = new XMLHttpRequest;
                ajax.url = "", ajax.onreadystatechange = function() {
                    (ajax.readyState === XMLHttpRequest.prototype.DONE || ajax.readyState === XMLHttpRequest.prototype.UNSENT) && d && d(e)
                }, ajax.open("POST", i.baseUri + "survey/status?_=" + (new Date).getTime()), ajax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                var url = _.map({url: a,status: c,href: window.location.href}, function(a, b) {
                    return b + "=" + a
                }).join("&");
                ajax.send(f)
            }*/
            //init resource
            var initResource = function() {
                if (window.AndroidCacheProxy && window.localCacheServerPort) {
                    var a = {jpg: true,jpeg: true,png: true,mp3: true,mp4: true,woff: true,ogg: true};
                    var getUri = function(b, c) {
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
                    };
                    var d = function(a) {
                        var imgObject = document.createElement("img");
                        imgObject.crossOrigin = "anonymous";
                        var d = function() {
                            imgObject.removeEventListener("load", e), imgObject.removeEventListener("error", f), imgObject.src = "", imgObject = null
                        }
                        var e = function() {
                            var c = document.createElement("canvas"), e = c.getContext("2d");
                            e.drawImage(b, 0, 0);
                            try {
                                e.getImageData(0, 0, 1, 1)
                            } catch (f) {
                                return void d()
                            }
                            a(), d()
                        }
                        var f = function() {
                            d()
                        };
                        imgObject.addEventListener("load", e), imgObject.addEventListener("error", f), imgObject.src = getUri(window.Game.baseUri + "favicon.ico", true)
                    }
                    var e = function() {
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
                    }
                    var f = document.createElement("canvas"), g = f.getContext("webgl") || f.getContext("experimental-webgl");
                    window.createjs.denaVersion && g ? d(e) : e()
                }
            };
            initResource();
            if (shellApp.isShellApp() && window.Game.ua.versionCompare(shellApp.getVersionName(), "1.3.9") > 0) {
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
            var globalGame = window.Game;
            globalGame.ajaxConnecting = false;
            var doc = $(document);
            doc.on("ajaxError", function(a, ajaxStatus, data) {
                if (409 == ajaxStatus.status || 410 == ajaxStatus.status)  {
                    globalGame.ajaxStatus = ajaxStatus.status;
                    requirejs.onError = function() {
                    };
                }
            });
            doc.on("ajaxStart", function() {
                globalGame.ajaxConnecting = true;
            });
            doc.on("ajaxStop", function() {
                globalGame.ajaxConnecting = false;
                if(409 == globalGame.ajaxStatus) {
                    alert(globalGame.message.update), window.location.reload()
                } ;
                if(410 == globalGame.ajaxStatus ){
                    alert(globalGame.message.appUpdate), shellApp.openBrowser(shellApp.getUpdateUrl())
                };
            });
            $.ajaxSetup({
                beforeSend: function(request,option) {
                if (option.url) {
                    var param = (new Date).getTime() + "&uid=" + globalGame.userId;
                    option.url += (option.url.indexOf("?") >= 0 ? "&t=" : "?t=") + param
                }
                if ("GET" !== option.type && ajaxUtil.controlXHR(request, option.url))
                    return !1;
                if (globalGame.shellAppFlag) {
                    request.setRequestHeader("X-MOBAGE-SHELLAPP", 1);
                    var versionName = shellApp.getVersionName(), code = Number(shellApp.getVersionCode());
                    "1.0" === versionName && code && code > 0 && (versionName += ".0." + code), request.setRequestHeader("X-MOBAGE-SHELLAPP-VERSION", versionName)
                }
                request.setRequestHeader("X-VERSION", globalGame.version), (409 == globalGame.ajaxStatus || 410 == globalGame.ajaxStatus) && request.abort();
                    ajaxUtil.addXHR(request);
            },complete: function(request) {
                    ajaxUtil.removeXHR(request)
            }});

            require(["lib/locallib-mine"], function() {

                require(["backbone", "view/loading", "router/app-router-mine"], function(backbone, loadingObject, appRouter) {

                    globalGame.loading = new loadingObject,
                        globalGame.router = new appRouter,
                        backbone.history.start(),
                    globalGame.submenu && require(["submenu"]);
                    globalGame.router.on('route',function (e) {
                        console.info(e);
                    })
                })
            })
        })
    })
});
