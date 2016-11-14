define(["jquery", "backbone"], function (a, b) {
    var c = b.Model.extend({
        defaults: {
            manifest: [{
                src: Game.imgUri + "/sp/cjs/weapon.png?s=293f2bfa762056a6cf0059eb7a63385d",
                id: "weapon",
                type: "image"
            }, {
                src: Game.imgUri + "/sp/cjs/kni_sw_0_01.png?s=1a38b66a222a44d6d04684dfaab8ef21",
                id: "kni_sw_0_01",
                type: "image"
            }, {
                src: Game.imgUri + "/sp/cjs/kni_sw_0_01_head.png?s=923978e46849b8c1a35f035234fb0ca3",
                id: "kni_sw_0_01_head",
                type: "image"
            }]
        }
    });
    return c
});
