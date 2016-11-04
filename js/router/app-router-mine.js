define('mine/view/raid/main',['underscore'],function (_) {
    alert('load');
})
define('lib/raid/destroy', ["underscore"], function(underscore) {
    var object = {
        mSetInterval: function() {
            // var b = window.stage;

            var gameStage = window.stage;
            gameStage && gameStage.gGameStatus && underscore.each(b.gGameStatus.timer, function(timer) {
                clearInterval(timer)
            })
        },mCreateJS: function() {
            var gameStage = window.stage;
            null != gameStage && (createjs.Ticker.removeEventListener("tick",gameStage), createjs.Ticker.removeEventListener("tick", gameStage.funcUpdate), "undefined" != typeof gameStage.gAryCntnAvatar && (underscore.each(gameStage.gAryCntnAvatar, function(container) {
                container.removeAllChildren()
            }), gameStage.gAryCntnAvatar = null, gameStage.gAryRootAvatar = null), "undefined" != typeof gameStage.gAryCntnBoss && (underscore.each(gameStage.gAryCntnBoss, function(contaienr) {
                contaienr.removeAllChildren()
            }), gameStage.gAryCntnBoss = null, gameStage.gAryRootBoss = null), "undefined" != typeof gameStage.gBossContainer && (gameStage.gBossContainer = null), "undefined" != typeof gameStage.gPlayerContainer && (gameStage.gPlayerContainer = null), "undefined" != typeof gameStage.gMasterContainer && (gameStage.gMasterContainer = null))
        }};
    return object
});
define('router/app-router-mine', ["backbone","model/cjs-loader","util/ajax","lib/sound","model/manifest-loader","lib/raid/destroy","model/sound"],function (backbone,cjsLoader,uAjax,soundLib,manifestLoader,destroyLib,soundModel) {
    var object = backbone.Router.extend(
        {
            initialize: function() {
                //console.info('top');
                //this.router_href();
                window.onerror =function (e) {
                    console.info(e);
                }
            },
            move: function () {
                console.info('startMove');
                Game.loading.loadStart(),
               // Game.ua.isJssdk() && $("#mobage-game-container").parent().scrollTop(0),
                Game.view && (Game.view.content_close(), Game.view.destroyImages()),
                    cjsLoader.clear(),
                    cjsLoader.off(),
                    manifestLoader.off(),
                    //soundModel.stopVoice(),
                    soundLib.clearInstances({exclude: /btn_se/}),
                    soundLib.off(),
                    uAjax.abortXHR(),
                    destroyLib.mSetInterval(),
                    destroyLib.mCreateJS();
                    //$("#mbga-pf-footer").remove(),
                    //k.clearMessage()
            },
            routes:{
                "":"index",
                "raid/:raid_id/:speed/:lock":"raid"
            },
            index:function () {
                 console.info('default index');
            },
            raid: function(raidId, speed, isLock) {
                this.move();
                require(["view/raid/main-mine"], function(RaidMain) {
                    Game.view = new RaidMain({
                        raid_id: raidId,
                        action: "start",
                        speed: speed,
                        lock: isLock
                    });
                })
            }
        }
    );
    return object;
});