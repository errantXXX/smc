define(["backbone", "model/cjs-loader", "model/manifest-loader"], function(a, b, c) {
    var d = {setParams: function(a, b) {
        if (this.cjsName = a.cjsName, this.fpsNum = a.fpsNum, this.canvasElem = a.canvasElem, this.isBonus = a.isBonus, this.arcadeJsonData = b, "usf_arcade_1" == this.cjsName || "usf_arcade_2" == this.cjsName) {
            var c = [{my_cjs: b.playerCjsId,location_id: +b.location_id,boss_cjs: b.boss_cjs,special_skill: b.special_skill,boss_special_skill: b.boss_special_skill}];
            "usf_arcade_1" == this.cjsName ? window.usf_arcade_1_array = c : window.usf_arcade_2_array = c
        }
        window.stage_pre_battle && (window.stage_pre_battle.removeAllChildren(), createjs.Ticker.removeEventListener("tick", window.stage_pre_battle)), this.setCanvas(a.canvasElem, a.canvasWidth, a.canvasHeight)
    },setCanvas: function(a, b, c) {
        var d = document.getElementById(a);
        d.width = b, d.height = c, window.stage_pre_battle = new createjs.Stage(d), this.loadCjs()
    },loadCjs: function() {
        var a = [this.cjsName], c = this;
        b.once("complete", function() {
            c.loadManifest(a)
        }), b.loadFiles(a)
    },loadManifest: function(a) {
        var d = this, e = _.flatten(_.map(a, function(a) {
            return b.manifest(a)
        })), f = [];
        if ("usf_arcade_1" == this.cjsName || "usf_arcade_2" == this.cjsName) {
            var g = this.getPlayerJobImageName(this.arcadeJsonData.playerCjsId), h = this.getPlayerVsImageName(this.arcadeJsonData.playerCjsId), i = this.getPlayerIconImageName(this.arcadeJsonData.playerCjsId), j = this.getEnemyVsImageName(this.arcadeJsonData.boss_cjs), k = Game.imgUri + "/sp/cjs/", l = [];
            "usf_arcade_1" == this.cjsName ? (l = ["usf_arcade_1_mainchara_vs_dummy", "usf_arcade_1_vschara_dummy", "usf_arcade_1_chara_ui_00_dummy", "usf_arcade_1_jobchara_dummy"], f = _.filter(e, function(a) {
                return a.id != l[0] && a.id != l[1] && a.id != l[2] && a.id != l[3]
            }), f.push({src: k + i + ".png",id: l[2],type: "image"}), f.push({src: k + g + ".png",id: l[3],type: "image"})) : (l = ["usf_arcade_2_mainchara_vs_dummy", "usf_arcade_2_vschara_dummy"], f = _.filter(e, function(a) {
                return a.id != l[0] && a.id != l[1]
            })), f.push({src: k + h + ".png",id: l[0],type: "image"}), f.push({src: k + j + ".png",id: l[1],type: "image"})
        } else
            f = e;
        c.once("complete", function() {
            d.setContainer()
        }), c.loadManifest(f, !0)
    },setContainer: function() {
        var a = new createjs.Container;
        a.x = 0, a.y = 0, exportRoot = new lib[this.cjsName], a.addChild(exportRoot), window.stage_pre_battle.addChild(a), this.playThis()
    },playThis: function() {
        var a = $("#" + this.canvasElem);
        a.css("display", "block"), createjs.Ticker.setFPS(this.fpsNum), createjs.Ticker.addEventListener("tick", window.stage_pre_battle), a.one("playEnd", function() {
            a.css("display", "none"), a.trigger("endPreBattleCjs")
        })
    },getPlayerJobImageName: function(a) {
        var b = {grp_me_0_01: "usf_arcade_1_jobchara_g_00",grp_me_1_01: "usf_arcade_1_jobchara_d_00",kun_me_0_01: "usf_arcade_1_jobchara_g_02",kun_me_1_01: "usf_arcade_1_jobchara_d_02",ogr_me_0_01: "usf_arcade_1_jobchara_g_01",ogr_me_1_01: "usf_arcade_1_jobchara_d_01",stf_me_0_01: "usf_arcade_1_jobchara_g_04",stf_me_1_01: "usf_arcade_1_jobchara_d_04",nnj_me_0_01: "usf_arcade_1_jobchara_g_03",nnj_kt_0_01: "usf_arcade_1_jobchara_g_03",nnj_me_1_01: "usf_arcade_1_jobchara_d_03",nnj_kt_0_01: "usf_arcade_1_jobchara_d_03"}[a];
        return b || (b = ""), b
    },getPlayerVsImageName: function(a) {
        var b = {grp_me_0_01: "usf_arcade_1_mainchara_vs_g_00",grp_me_1_01: "usf_arcade_1_mainchara_vs_d_00",kun_me_0_01: "usf_arcade_1_mainchara_vs_g_02",kun_me_1_01: "usf_arcade_1_mainchara_vs_d_02",ogr_me_0_01: "usf_arcade_1_mainchara_vs_g_01",ogr_me_1_01: "usf_arcade_1_mainchara_vs_d_01",stf_me_0_01: "usf_arcade_1_mainchara_vs_g_04",stf_me_1_01: "usf_arcade_1_mainchara_vs_d_04",nnj_me_0_01: "usf_arcade_1_mainchara_vs_g_03",nnj_kt_0_01: "usf_arcade_1_mainchara_vs_g_03",nnj_me_1_01: "usf_arcade_1_mainchara_vs_d_03",nnj_kt_1_01: "usf_arcade_1_mainchara_vs_d_03"}[a];
        return b || (b = ""), b
    },getPlayerIconImageName: function(a) {
        var b = {grp_me_0_01: "usf_arcade_1_chara_ui_00_g_00",grp_me_1_01: "usf_arcade_1_chara_ui_00_d_00",kun_me_0_01: "usf_arcade_1_chara_ui_00_g_02",kun_me_1_01: "usf_arcade_1_chara_ui_00_d_02",ogr_me_0_01: "usf_arcade_1_chara_ui_00_g_01",ogr_me_1_01: "usf_arcade_1_chara_ui_00_d_01",stf_me_0_01: "usf_arcade_1_chara_ui_00_g_04",stf_me_1_01: "usf_arcade_1_chara_ui_00_d_04",nnj_me_0_01: "usf_arcade_1_chara_ui_00_g_03",nnj_kt_0_01: "usf_arcade_1_chara_ui_00_g_03",nnj_me_1_01: "usf_arcade_1_chara_ui_00_d_03",nnj_kt_1_01: "usf_arcade_1_chara_ui_00_d_03"}[a];
        return b || (b = ""), b
    },getEnemyVsImageName: function(a) {
        var b = {enemy_6201573: "usf_arcade_1_vschara_05",enemy_6201583: "usf_arcade_1_vschara_06",enemy_6201483: "usf_arcade_1_vschara_01",enemy_6201493: "usf_arcade_1_vschara_02",enemy_6201503: "usf_arcade_1_vschara_03",enemy_6201513: "usf_arcade_1_vschara_04",enemy_6201523: "usf_arcade_1_vschara_10",enemy_6201533: "usf_arcade_1_vschara_07",enemy_6201543: "usf_arcade_1_vschara_08",enemy_6201593: "usf_arcade_1_vschara_08",enemy_6201553: "usf_arcade_1_vschara_09"}[a];
        return b || (b = ""), b
    }};
    return d
});
