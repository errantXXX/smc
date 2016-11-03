define(["jquery", "backbone"], function(a, b) {
    var c = b.Model.extend({defaults: {manifest: [{src: Game.imgUri + "/sp/cjs/raid_chain_dummy_img_01.jpg?s=7cf5e95b530931abe4d5cb63e1efcfd2",id: "raid_chain_dummy_img_01",type: "image"}, {src: Game.imgUri + "/sp/cjs/raid_chain_dummy_img_02.jpg?s=896018bae3a7f1d90ab975ea012183f7",id: "raid_chain_dummy_img_02",type: "image"}, {src: Game.imgUri + "/sp/cjs/raid_chain_dummy_img_03.jpg?s=d3acd43861c9eb145d93baccc8840cae",id: "raid_chain_dummy_img_03",type: "image"}, {src: Game.imgUri + "/sp/cjs/raid_chain_dummy_img_04.jpg?s=b783c4b761148b9964054f139625d663",id: "raid_chain_dummy_img_04",type: "image"}, {src: Game.imgUri + "/sp/cjs/raid_chain.png?s=9f7c0d3a5730a056bb8d0a65e18cc806",id: "raid_chain",type: "image"}]}});
    return c
});
