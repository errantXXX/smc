/**
 * Created by Administrator on 2016/10/18.
 */
window.displayInitialize = function() {
    var deviceRatio = window.innerWidth / 320;
    return deviceRatio;
};
window.fitScreenByZoom = function(deviceRatio) {
    var html = document.getElementsByTagName('html')[0];
    html.style.zoom = deviceRatio;
};
var  Game = {};

Game.controller = '';
Game.baseUri    = '/Astral/';
Game.imgUri     = 'http://gbf.game-a1.mbga.jp/assets_en/1480056298/img_mid';
Game.cssUri     = '/Astral/css/';
Game.jsUri      = '/Astral/js';
Game.fontUri    = '/Astral/font';
Game.soundUri   = '/Astral/sound';
Game.setting = {};
Game.setting.cjs_mode = 0;
Game.cjsScale = 0.75;
window.deviceRatio = 1;
Game.ua = {
    isChromeApp: function() {
        return true;
    },
    isJssdk: function(){
        return false;
    },
    isMbga: function(){
        return true;
    },
    isGree: function(){
        return false;
    },

    isGreeLogin: function(){
        return false;
    },
    isPcPlatform: function() {
        return false;
    },
    //MEMO touch.jsで Game.ua.isPcPlatformHasTouch というのも追加しています（そこで使うためにできたもので、こっちに置くと却ってわかりづらいと思うのでコメントだけ残す）
    isJssdkSideMenu: function(){
        return false;
    },
    isJssdkFooter: function() {
        return false;
    },
    versionCompare: function(version1, version2) {
        var v1Split = version1.split('.');
        var v2Split = version2.split('.');
        var v1Len   = v1Split.length;
        var v2Len   = v2Split.length;
        var minLen  = Math.min(v1Len, v2Len);
        var ret = 0; // 0:等しい, -1:version1が小さい(version2が大きい), 1:version2が小さい(version1が大きい)

        for(var i = 0; i < minLen; i++) {
            v1Split[i] = parseInt(v1Split[i], 10)
            v2Split[i] = parseInt(v2Split[i], 10)

            if(v1Split[i] === v2Split[i]) {
                continue;
            }

            ret = v1Split[i] < v2Split[i] ? -1 : 1;
            break;
        }

        if (ret === 0) {
            if (v1Len < v2Len) {
                ret = -1;
            } else if (v1Len > v2Len){
                ret = 1;
            }
        }

        return ret;
    },
    chromeAppUserAgent:  'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.153 Safari/537.36' ,
    isAndroid: function() {
        return this.os.name === 'Android';
    },
    isIOS: function() {
        return this.os.name === 'iOS';
    }
};