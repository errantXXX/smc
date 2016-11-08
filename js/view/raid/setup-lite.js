define(["jquery","underscore","backbone","view/content","model/raid/setup", "model/sound","model/cjs-loader","model/manifest-loader","util/sprite-sheet-manager","view/raid/ui"],function ($,_,backbone,contentView,setupRaidModel,soundModel,cjsLoaderModel,manifestLoaderModel,spriteSheetManagerUtil,uiRaidView) {
    var XHR_START = "xhrStart";
    var R = ["70670", "70950", "80000"];
    var RAID_CONS_CJS = ["ab_0004", "ab_3000", "ab_all_3020", "ab_start", "raid_win", "quest_clear", "quest_failed", "raid_union_summon", "treasure_get", "item_get", "raid_parts_attack", "raid_parts_back", "raid_parts_turn", "raid_parts_next", "raid_cutin", "raid_cutine", "raid_reload", "raid_chain", "raid_effect_heal", "raid_effect_buff", "raid_effect_debuff", "ab_all_70", "raid_parts_auto", "ab_enemy_action", "ef_all_2000", "ef_2000"];
    var view = contentView.extend({
        el: $(".contents"),
        stage: null,
        baseFps: 12,
        currentFps: 12,
        attackCount: 20,
        use_ap: null,
        popScrollHeightDelta: 0,
        initialize: function (params) {
            var _this = this;
            this.content_bind(),
                this.trigger(XHR_START);
            var raidModel = new setupRaidModel;
            var params = params;
            raidModel.preSave(false, params, {url: raidModel.urlRoot(params.action, params.mode, params.is_multi, params.is_semi),
                silent: !0,
                error: function (e) {
                },
                success: function () {
                    var json = raidModel.toJSON();
                    var allReadyPromise = new $.Deferred;
                    var preparePromise = new $.Deferred;
                    $.when(allReadyPromise).done(function () {
                        _this.render(params);
                    })
                    if(json.bgm){

                    };
                    var n = _.some(R, function (a) {
                        return a == json.location_id
                    });
                    _this.prepareLoading(json, n, function () {
                        console.l('prepareLoading compelte');
                        preparePromise.resolve()
                    });
                    var loadCJSPromise = new $.Deferred, loadSpriteSheetPromise = new $.Deferred;
                    $.when(preparePromise).done(function(){

                        _this.loadCJS(json, n, function () {
                                 loadCJSPromise.resolve(),
                                     $.when(loadCJSPromise).done(function () {
                                        _this.loadSpriteSheet(function () {
                                            loadSpriteSheetPromise.resolve()
                                         })
                                    })
                        })
                    });
                    var resourcePromise = new $.Deferred;
                    $.when(loadCJSPromise,loadSpriteSheetPromise).done(function(){
                        //TODO animate preloading
                        resourcePromise.resolve();
                    });
                    $.when(resourcePromise).done(function () {
                        var canvasEle  = document.getElementById("canvas");
                        if(canvasEle != null) {

                        }
                    })
                    //1 == d.invite_enable && e.activateMask();
                }
            });

        },
        loadCJS: function (json, c, callback) {
            var resourceList = [].concat(RAID_CONS_CJS);
            /*if(c){
                if(R[0] == a.location_id){
                    if( a.arcade && a.arcade.is_bonus){
                        e = b.union(e, Ea)
                    } else{
                        e =  b.union(e, Da)
                    }
                }else if (a.is_survival){
                    e = b.union(e, Ga);
                } else {
                    e =  b.union(e, Fa)
                }
            }else if(a.is_trialbattle) {
                e = b.union(e, Ha)
            }*/
            //c ? e = R[0] == a.location_id ? a.arcade && a.arcade.is_bonus ? b.union(e, Ea) : b.union(e, Da) : a.is_survival ? b.union(e, Ga) : b.union(e, Fa) : a.is_trialbattle && (e = b.union(e, Ha)),
                _.each(json.player.param, function (player) {
                    resourceList.push(player.cjs), resourceList.push(player.effect)
            }), _.each(json.boss.param, function (boss) {
                    resourceList.push(boss.cjs), resourceList.push(boss.effect)
            }), _.isUndefined(json.is_boss) || "" == json.is_boss || resourceList.push(json.is_boss),
                    cjsLoaderModel.loadFiles(resourceList),
                    cjsLoaderModel.once("complete", function () {
                        console.info('cjs done')
                var manifestList = _.flatten(_.map(resourceList, function (obj) {
                    return cjsLoaderModel.manifest(obj)
                }));
                _.each(json.weapon, function (weapon, index) {
                    var object = _.find(manifestList, function (target) {
                        return target.id == index
                    }), imgUrl = Game.imgUri + "/sp/cjs/" + weapon + ".png";
                    object ? object.src = imgUrl : manifestList.push({id:index, src: imgUrl})
                }), manifestLoaderModel.once("complete", function () {
                    callback()
                }), manifestLoaderModel.loadManifest(manifestList, !0)
            })
        }, loadSpriteSheet: function (callback) {
           var gameVersion = Game.version ? "?version=" + Game.version : "";
            this.spriteSheetManager = new spriteSheetManagerUtil([
                {id: "raid_ui_0", src: uiRaidView.utils.getImagePath() + "atlas/raid_ui_0.json" + gameVersion}
            ]), this.spriteSheetManager.addEventListener("complete", function () {
                callback();
            }), this.spriteSheetManager.load()

        },
        prepareLoading: function (json,R,callback) {
            callback();
        }
    });
    return view;
})