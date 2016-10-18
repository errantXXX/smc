define(["jquery", "backbone", "model/token-data"], function(a, b, c) {
    var d = "success_post_location", e = "error_post_location", f = "success_post_reauth", g = "error_post_reauth", h = Game.ua.ua, i = ["KYY21"], j = _.any(i, function(a) {
        return -1 != h.indexOf(a)
    }), k = function(b, c) {
        var d = {};
        navigator.geolocation && !j ? navigator.geolocation.getCurrentPosition(function(a) {
            var d = a.coords, e = d.latitude, f = d.longitude, g = d.accuracy;
            1 === c ? n(e, f, g, b) : m(e, f, g, b)
        }, function(f) {
            1 === c ? n(0, 0, 0, b) : (d = {status: "error",errorCode: f.code}, a(b).trigger(e, d))
        }, {enableHighAccuracy: !0,timeout: 1e4,maximumAge: 0}) : 1 === c ? n(0, 0, 0, b) : (d = {status: "error",errorCode: 99}, a(b).trigger(e, d))
    }, l = function(a) {
        if (navigator.geolocation && !j)
            var b, c, d, e = 1, f = 12500, g = navigator.geolocation.watchPosition(function(h) {
                var i = h.coords;
                if (b = i.latitude, c = i.longitude, d = i.accuracy, e >= 2)
                    n(b, c, d, a), navigator.geolocation.clearWatch(g), j && clearTimeout(j);
                else
                    var j = setTimeout(function() {
                        n(b, c, d, a), navigator.geolocation.clearWatch(g), clearTimeout(j)
                    }, f + 1500);
                e++
            }, function(b) {
                n(0, 0, 0, a), navigator.geolocation.clearWatch(g)
            }, {enableHighAccuracy: !0,timeout: f,maximumAge: 0});
        else
            n(0, 0, 0, a)
    }, m = function(f, g, h, i) {
        var j = {}, k = {lat: f,lng: g,acc: h}, l = new (c.extend({urlRoot: Game.baseUri + "sky/auth/location"}));
        b.stopListening(l, "sync"), b.stopListening(l, "error"), b.listenToOnce(l, "sync", function(b) {
            var c = b.toJSON();
            c.status ? (j = {status: "success"}, a(i).trigger(d, j)) : (j = {status: "error",errorCode: 90}, a(i).trigger(e, j))
        }), b.listenToOnce(l, "error", function() {
            j = {status: "error",errorCode: 10}, a(i).trigger(e, j)
        }), l.save(k)
    }, n = function(d, e, h, i) {
        var j = {lat: d,lng: e,acc: h}, k = new (c.extend({urlRoot: Game.baseUri + "sky/user/reauth"}));
        b.stopListening(k, "sync"), b.stopListening(k, "error"), b.listenToOnce(k, "sync", function(b) {
            var c = b.toJSON();
            c.status ? a(i).trigger(f) : a(i).trigger(g)
        }), b.listenToOnce(k, "error", function() {
            n(0, 0, 0, i)
        }), k.save(j)
    };
    return {getGeolocation: k,getGeolocationWatch: l}
});
