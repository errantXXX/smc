/**
 * Created by Administrator on 2016/10/18.
 */
define([], function() {
    var a = [/Windows NT (?:5\.1|5\.2)/], b = [/Android 4\..*SC-02C Build\/.* Chrome\/[\.0-9]*/], c = [/Android 4\..*HTL21 Build\/JRO03C.*Version\/4/, /Android 4\..*SO-04E Build\/10\.3\.1\.B.*Version\/4/, /Android 4\..*SOL25 Build\/17\.1.*Version\/4/], d = [/Android 5\..*SO-02G Build\/23\..*Version\/4/];
    return {requiresLayoutInUpdate: function() {
        return Game.ua.isChromeApp() ? !1 : /Android 4\.[0-2].*L-05E Build\/JDQ39.*Version\/4/.test(navigator.userAgent)
    },shouldUseTimeoutTiming: function() {
        return Game.ua.isChromeApp() ? _(a).some(function(a) {
            return a.test(Game.ua.chromeAppUserAgent)
        }) : _(b).some(function(a) {
            return a.test(navigator.userAgent)
        })
    },isDoMapGaugeExceptionModel: function() {
        return _(c).some(function(a) {
            return a.test(navigator.userAgent)
        })
    },shouldPatchWorldMapRender: function() {
        return _(d).some(function(a) {
            return a.test(navigator.userAgent)
        })
    }}
});
