define([], function() {
    var a = {mAdd: function(a) {
        for (var b = [], c = 0; c <= a.length - 1; c++) {
            var d = new lib[a[c].cjs];
            b.push(d)
        }
        return b
    },mSet: function(a/*pJson*/, b/*gAryRootAvatar*/, c/*gGameParam*/, d/*container*/) {
        for (var e = [], f = 0; f <= b.length - 1; f++)
            e[f] = new createjs.Container, e[f].visible = !1, e[f].addChild(b[f]);
        for (var g = [], f = 0; f <= b.length - 1; f++) {
            d.addChild(e[f]);
            var h, i;
            "player" === a.type ? (h = c.grid[a.type][f].x, i = c.grid[a.type][f].y) : (h = c.grid[a.type][a.type + a.number][f].x, i = c.grid[a.type][a.type + a.number][f].y), e[f].x = h ? h : 0, e[f].y = i ? i : 0, g.push(e[f])
        }
        return g
    },mShow: function(a) {
        for (var b = 0; b <= a.length - 1; b++)
            a[b].visible = !0;
        return !0
    },mRemove: function(a, b, c) {
        var d = createjs.Tween.get({}, {override: !0,useTicks: !0,paused: !0});
        return d.wait(a).call(function(a, b, c) {
            if (c.removeChild(b), createjs.denaVersion)
                for (var d = c.getNumChildren() - 1; d >= 0; --d)
                    c.getChildAt(d)._passive = 0
        }, [a, b, c]), d.setPaused(!1), !0
    }};
    return a
});
