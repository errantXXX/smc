define(["jquery", "backbone"], function(a, b) {
    var c = b.Model.extend({defaults: {manifest: [{src: Game.imgUri + "/sp/cjs/weapon.png?s=796c75eff302c3ea8de5cd6cca960064",id: "weapon",type: "image"}, {src: Game.imgUri + "/sp/cjs/kni_sw_0_01.png?s=8d0389230a5c8b193076d538af960666",id: "kni_sw_0_01",type: "image"}, {src: Game.imgUri + "/sp/cjs/kni_sw_0_01_head.png?s=cce94acb877941be175f99062f4da806",id: "kni_sw_0_01_head",type: "image"}]}});
    return c
});
