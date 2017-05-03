define(['model/content','view/quest/event-scenario-view','view/quest/abstract-view'],function(contentModel,eventScenarioView,abstractView){

    var myAbstarctView = abstractView.extend({
        initialize: function (option) {
            this.scenario_id = option.scenario_id;
            this.content_model = new contentModel({controller: "quest", action: "scene"});
            this.content_model.fetch();
            this.listenTo(this.content_model, "change", this.render);
        },
        render: function(a) {
            console.info(a.get("data"));
            console.info(this.$el);
            console.info('rendr app');
            var b = this.instanceEventSceneView();
            this.$el.html(decodeURIComponent(a.get("data")));
        },
        instanceEventSceneView:function(){
            var eventSceneView = new eventScenarioView({scenario_id: this.scenario_id});
            return this.addSubView(eventSceneView), eventSceneView;
        }
    })
    return myAbstarctView;
})