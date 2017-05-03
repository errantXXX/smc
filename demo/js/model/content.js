define(['backbone'],function(backbone){
    var j = backbone.Model.extend({
        urlRoot :function(){
            return 'http://127.0.0.1:8080/test.json';
        }
    });
    return j
});