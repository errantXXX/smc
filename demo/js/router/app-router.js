define('router/app-router', ["backbone","model/cjs-loader","util/ajax","lib/sound","model/manifest-loader"/*,"lib/raid/destroy","model/sound"*/],function (backbone,cjsLoader,uAjax,soundLib,manifestLoader,destroyLib,soundModel) {
    var object = backbone.Router.extend(
        {
            initialize: function() {
                console.info('init router');
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
                    uAjax.abortXHR();
                    //destroyLib.mSetInterval(),
                    //destroyLib.mCreateJS();
                //$("#mbga-pf-footer").remove(),
                //k.clearMessage()
            },
            routes:{
                "":"quest",
                "raid/:raid_id/:speed/:lock":"raid"
            },

            quest: function(questId) {
                console.info('quest scenario')
                this.move();
                require(["view/quest/scenario-app"], function(app) {
                    Game.view = new app({
                        scenario_id:1
                    });
                })
            }
        }
    );
    return object;
});