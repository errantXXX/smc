/**
 * Created by Administrator on 2016/10/18.
 */
define(["model/manifest-loader", "model/sound", "lib/raid/draw"], function(a, b, c) {
    var d = {mPlayer: function(a, c) {
        a.call(function(a) {
            a.text = a.text ? a.text : "", a.playtime = a.playtime ? Math.round(stage.gGameParam.spf * a.playtime) : 0, a.delay = a.delay ? Math.round(stage.gGameParam.spf * a.delay) : 0, setTimeout(function() {
                $(".txt-cutin-party").html(a.text), $(".txt-cutin-party").show()
            }, a.delay), setTimeout(function() {
                $(".txt-cutin-party").hide()
            }, a.playtime + a.delay), a.voice && b.playVoice(a.voice)
        }, [c])
    },mSummon: function(a, b) {
        a.call(function(a) {
            a.text = a.text ? a.text : "", a.playtime = a.playtime ? Math.round(stage.gGameParam.spf * a.playtime) : 0, a.delay = a.delay ? Math.round(stage.gGameParam.spf * a.delay) : 0, setTimeout(function() {
                $(".txt-cutin-summon").html(a.text), $(".txt-cutin-summon").show()
            }, a.delay), setTimeout(function() {
                $(".txt-cutin-summon").hide()
            }, a.playtime + a.delay)
        }, [b])
    },mBoss: function(a, c) {
        a.call(function(a) {
            a.text = a.text ? a.text : "", a.playtime = a.playtime ? Math.round(stage.gGameParam.spf * a.playtime) : 0, a.delay = a.delay ? Math.round(stage.gGameParam.spf * a.delay) : 0, setTimeout(function() {
                $(".txt-cutin-enemy").html(a.text), $(".txt-cutin-enemy").show()
            }, a.delay), setTimeout(function() {
                $(".txt-cutin-enemy").hide()
            }, a.playtime + a.delay), a.voice && b.playVoice(a.voice)
        }, [c])
    },mSpecial: function(b, d) {
        b.call(function(b) {
            a.setImageAlias("cutin_" + b.pid, "cutin");
            var d = new lib[stage.gGameParam.cjs.raid_cutin], e = d[stage.gGameParam.cjs.raid_cutin].ui_parts.timeline.duration, f = new createjs.Container;
            if (f.addChild(d), f.x = stage.gGameParam.relative.raid_cutin.x, f.y = 0, createjs.denaVersion) {
                f._layer = 1;
                for (var g = stage.gMasterContainer.getNumChildren() - 1; g >= 0; --g) {
                    var h = stage.gMasterContainer.getChildAt(g);
                    h._passive = 1
                }
            }
            stage.gMasterContainer.addChild(f), c.mRemove(e, f, stage.gMasterContainer)
        }, [d])
    },mSuper: function(b, d) {
        b.call(function(b) {
            a.setImageAlias("cutin_" + b.bid, "cutine");
            var d = new lib[stage.gGameParam.cjs.raid_cutine], e = d[stage.gGameParam.cjs.raid_cutine].ui_parts.timeline.duration, f = new createjs.Container;
            f.addChild(d), f.x = stage.gGameParam.relative.raid_cutine.x, f.y = 0, stage.gMasterContainer.addChild(f), c.mRemove(e, f, stage.gMasterContainer)
        }, [d])
    }};
    return d
});
