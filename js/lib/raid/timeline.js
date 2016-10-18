define([], function() {
    var a = {mInit: function(a) {
        return {prefix: a,timeline: [],beforeX: [],beforeY: [],diff: []}
    },mAdjust: function(a, b) {
        a.adjust = a.adjust ? a.adjust : 0, a.ignore = a.ignore ? a.ignore : [];
        for (var c = b + a.adjust >= 0 ? b + a.adjust : 0, d = 0; d <= a.tween.length - 1; d++) {
            var e = $.inArray(a.tween[d].prefix, a.ignore) >= 0;
            if (!e)
                for (var f = 0; f <= a.tween[d].timeline.length - 1; f++) {
                    var e = $.inArray(a.tween[d].prefix + f, a.ignore) >= 0;
                    if (!e) {
                        var g = c;
                        a.tween[d].diff[f] && (g += a.tween[d].diff[f], 0 > g ? (a.tween[d].diff[f] = g, g = 0) : a.tween[d].diff[f] = 0), a.tween[d].timeline[f].wait(g)
                    }
                }
        }
    },mResetTimeline: function(a, b) {
        for (var c = 0; c <= b.length - 1; c++) {
            var d = $.extend(!0, {}, b[c]);
            b[c] = {prefix: b[c].prefix,timeline: [],beforeX: [],beforeY: [],diff: []};
            for (var e = 0; e <= d.timeline.length - 1; e++)
                b[c].timeline[e] = createjs.Tween.get(d.timeline[e].target), (d.beforeX[e] || d.beforeY[e]) && b[c].timeline[e].to({x: d.beforeX[e],y: d.beforeY[e]}, 0), b[c].timeline[e].wait(a[a.length - 1].duration), b[c].beforeX[e] = d.beforeX[e], b[c].beforeY[e] = d.beforeY[e]
        }
        return b
    }};
    return a
});
