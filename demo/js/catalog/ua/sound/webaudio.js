/**
 * Created by Administrator on 2016/10/18.
 */
define(["underscore"], function(a) {
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
