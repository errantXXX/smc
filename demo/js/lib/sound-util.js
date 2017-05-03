define(["catalog/ua/sound/webaudio"], function(a) {
    function b() {
        if (j)
            return j;
        var a, b = document.createElement("audio");
        return b.canPlayType && (a = {}, a.mp3 = !!b.canPlayType("audio/mpeg;").replace(/no/, ""), a.ogg = !!b.canPlayType('audio/ogg; codecs="vorbis"').replace(/no/, ""), a.wav = !!b.canPlayType('audio/wav; codecs="1"').replace(/no/, ""), a.aac = !!b.canPlayType('audio/mp4; codecs="mp4a.40.2"').replace(/no/, "")), b = null, j = a, a
    }
    function c() {
        return !!b()
    }
    function d() {
        return a.cannotUseWebAudio() ? !1 : window.webkitAudioContext || window.mozAudioContext || window.AudioContext
    }
    function e(a) {
        switch (a) {
            case "mp3":
                return "audio/mpeg";
            case "ogg":
                return "audio/ogg";
            case "wav":
                return "audio/wav";
            case "aac":
            case "m4a":
                return "audio/mp4";
            default:
                return ""
        }
    }
    function f(a, b, c) {
        var d = 0;
        if (3 === a ? 3 === b ? d = [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448][c] : 2 === b ? d = [0, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384][c] : 1 === b && (d = [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320][c]) : (2 === a || 0 === a) && (3 === b ? d = [0, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256][c] : (2 === b || 1 === b) && (d = [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160][c])), !d)
            throw new Error("unknown bit-rate");
        return d
    }
    function g(a, b) {
        var c = 0;
        if (3 === a ? c = [44100, 48e3, 32e3][b] : 2 === a ? c = [22050, 24e3, 16e3][b] : 0 === a && (c = [11025, 12e3, 8e3][b]), !c)
            throw new Error("unknown sample-rate");
        return c
    }
    function h(a, b) {
        var c = 0;
        if (c = 3 === a ? 3 === b ? 21 : 36 : 3 === b ? 13 : 21, !c)
            throw new Error("unknown info-offset");
        return c
    }
    function i(a) {
        function b() {
            return e[i++]
        }
        function c(a) {
            return e.subarray(i, i += a)
        }
        var d = {}, e = new Uint8Array(a), i = 0;
        if (73 === e[0] && 68 === e[1] && 51 === e[2]) {
            d.id3v2 = !0, i += 5;
            for (var j = b(), k = 0, l = 0; 4 > l; l++)
                k <<= 7, k |= b();
            i += k, 64 & j && (i += 10)
        }
        d.frameHeaderOffset = i;
        var m = c(4);
        if (255 !== m[0] || 224 !== (224 & m[1]))
            return d;
        var n = (24 & m[1]) >> 3, o = (6 & m[1]) >> 1, p = (240 & m[2]) >> 4, q = f(n, o, p), r = (12 & m[2]) >> 2, s = g(n, r), t = (192 & m[3]) >> 6, u = h(n, t);
        i += u - 4, d.bitRate = q, d.sampleRate = s;
        var v = c(4);
        if (!(88 === v[0] && 105 === v[1] && 110 === v[2] && 103 === v[3] || 73 === v[0] && 110 === v[1] && 102 === v[2] && 111 === v[3]))
            return d;
        i += 115, i += 22;
        var w = c(3), x = w[0] << 4 | (240 & w[1]) >> 4, y = (15 & w[1]) << 8 | w[2];
        return d.encoderDelay = x, d.padding = y, d
    }
    var j = null;
    return {getAudioCapabilities: b,isSupportedHTMLAudio: c,isSupportedWebAudio: d,findMediaType: e,readLAMEHeader: i}
});
