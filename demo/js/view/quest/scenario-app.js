define(['model/content','view/quest/scenario-view','view/quest/abstract-view'],function(contentModel,ScenarioView,abstractView){
    var decodeURIComponentEx = function(uriComponent){
        if(!uriComponent){
            return  uriComponent;
        }
        var ret;
        try{
            ret = decodeURIComponent(uriComponent);
        }catch(ex){
            ret = unescape(uriComponent);
        }
        return ret;
    };
    var myAbstarctView = abstractView.extend({
        initialize: function (option) {
            this.scenario_id = option.scenario_id;
            this.content_model = new contentModel({controller: "quest", action: "scene"});
            this.content_model.fetch();
            this.listenTo(this.content_model, "change", this.render);
        },
        render: function(a) {
            this.content_render(this.content_model);
            var b = this.instanceEventSceneView();

            //this.$el.html(decodeURIComponentEx(a.get("data")));
        },
        instanceEventSceneView:function(){
            var eventSceneView = new ScenarioView({scenario_id: this.scenario_id});
            return this.addSubView(eventSceneView), eventSceneView;
        }
    })
    return myAbstarctView;
})