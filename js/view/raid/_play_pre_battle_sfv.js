define(["backbone", "model/cjs-loader", "model/manifest-loader"], function (a, b, c) {
    var d = {
        setParams: function (a, b) {
            this.cjsName = a.cjsName, this.fpsNum = a.fpsNum, this.canvasElem = a.canvasElem, this.survivalJsonData = b, window.stage_pre_battle && (window.stage_pre_battle.removeAllChildren(), createjs.Ticker.removeEventListener("tick", window.stage_pre_battle)), this.setCanvas(a.canvasElem, a.canvasWidth, a.canvasHeight)
        }, setCanvas: function (a, b, c) {
            var d = document.getElementById(a);
            d.width = b, d.height = c, window.stage_pre_battle = new createjs.Stage(d), this.loadCjs()
        }, loadCjs: function () {
            var a = [this.cjsName], c = this;
            b.once("complete", function () {
                c.loadManifest(a)
            }), b.loadFiles(a)
        }, loadManifest: function (a) {
            var d = this, e = _.flatten(_.map(a, function (a) {
                return b.manifest(a)
            })), f = [], g = this.getPlayerJobImageName(this.survivalJsonData.playerCjsId), h = this.getPlayerIconImageName(this.survivalJsonData.playerCjsId), i = Game.imgUri + "/sp/cjs/", j = [];
            j = ["sfv_survival_start_main_dummy", "sfv_survival_start_thumb_dummy"], f = _.filter(e, function (a) {
                return a.id != j[0] && a.id != j[1]
            }), f.push({src: i + g + ".png", id: j[0], type: "image"}), f.push({
                src: i + h + ".png",
                id: j[1],
                type: "image"
            }), c.once("complete", function () {
                d.setContainer()
            }), c.loadManifest(f, !0)
        }, setContainer: function () {
            var a = new createjs.Container;
            a.x = 0, a.y = 0, window.exportRoot = new lib[this.cjsName], a.addChild(window.exportRoot), window.stage_pre_battle.addChild(a), this.playThis()
        }, playThis: function () {
            var a = $("#" + this.canvasElem);
            a.css("display", "block"), createjs.Ticker.setFPS(this.fpsNum), createjs.Ticker.addEventListener("tick", window.stage_pre_battle), a.one("playEnd", function () {
                a.css("display", "none"), a.trigger("endPreBattleCjs")
            })
        }, getPlayerJobImageName: function (a) {
            var b = {
                grp_me_0_01: "sfv_survival_start_main_grp_0",
                grp_me_1_01: "sfv_survival_start_main_grp_1",
                kun_me_0_01: "sfv_survival_start_main_kun_0",
                kun_me_1_01: "sfv_survival_start_main_kun_1",
                ogr_me_0_01: "sfv_survival_start_main_ogr_0",
                ogr_me_1_01: "sfv_survival_start_main_ogr_1",
                stf_me_0_01: "sfv_survival_start_main_usf_0",
                stf_me_1_01: "sfv_survival_start_main_usf_1",
                nnj_me_0_01: "sfv_survival_start_main_nnj_0",
                nnj_kt_0_01: "sfv_survival_start_main_nnj_0",
                nnj_me_1_01: "sfv_survival_start_main_nnj_1",
                nnj_kt_1_01: "sfv_survival_start_main_nnj_1"
            }[a];
            return b || (b = ""), b
        }, getPlayerIconImageName: function (a) {
            var b = {
                grp_me_0_01: "sfv_survival_start_thumb_grp_0",
                grp_me_1_01: "sfv_survival_start_thumb_grp_1",
                kun_me_0_01: "sfv_survival_start_thumb_kun_0",
                kun_me_1_01: "sfv_survival_start_thumb_kun_1",
                ogr_me_0_01: "sfv_survival_start_thumb_ogr_0",
                ogr_me_1_01: "sfv_survival_start_thumb_ogr_1",
                stf_me_0_01: "sfv_survival_start_thumb_usf_0",
                stf_me_1_01: "sfv_survival_start_thumb_usf_1",
                nnj_me_0_01: "sfv_survival_start_thumb_nnj_0",
                nnj_kt_0_01: "sfv_survival_start_thumb_nnj_0",
                nnj_me_1_01: "sfv_survival_start_thumb_nnj_1",
                nnj_kt_1_01: "sfv_survival_start_thumb_nnj_1"
            }[a];
            return b || (b = ""), b
        }
    };
    return d
});