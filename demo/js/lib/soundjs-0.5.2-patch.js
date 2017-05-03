 /**
 * SoundJS 0.5.2 に対するパッチ
 */
define(["underscore", "lib/sound-util", "catalog/ua/sound/webaudio", "util/function"], function(a, b, c, d) {
    var e = 529, f = 576, g = 1152, h = 1;
    c.shouldUseDoublePlaybackRate() ? h = 2 : c.shouldUseHalfPlaybackRate() && (h = .5);
    var i = window.createjs;
    i.denaVersion || (a.each([i.HTMLAudioPlugin, i.WebAudioPlugin], function(a) {
        var d = a._generateCapabilities;
        a._generateCapabilities = function() {
            var e = d.apply(this, arguments), f = a._capabilities;
            return f && (f.mp3 = f.mp3 || b.getAudioCapabilities().mp3, c.cannotCreatePanner() && (f.panning = !1)), e
        }
    }), c.cannotUseWebAudio() && (i.WebAudioPlugin.isSupported = d.returnFalse), function() {
        var a = i.LoadQueue.prototype, b = a._createTag;
        a._createTag = function(a) {
            if (a.type === i.LoadQueue.SOUND) {
                var c = this._typeCallbacks[a.type] || this._extensionCallbacks[a.ext];
                if (c && c.scope === i.Sound && i.Sound.activePlugin instanceof i.WebAudioPlugin)
                    return null
            }
            return b.apply(this, arguments)
        }
    }.call(this), function() {
        var c = i.WebAudioPlugin.Loader.prototype;
        c.load = function(a) {
            null != a && (this.src = a), this.request = new XMLHttpRequest, this.request.open("GET", this.src, !0), this.request.responseType = "arraybuffer", this.request.onload = i.proxy(this.handleLoad, this), this.request.onerror = i.proxy(this.handleError, this), this.request.onprogress = i.proxy(this.handleProgress, this), this.request.send()
        }, c.handleLoad = function(c) {
            if (a.each(["onload", "onerror", "onprogress"], function(a) {
                c.currentTarget[a] = null
            }), c.target && 2 != String(c.target.status)[0] && 3 != String(c.target.status)[0])
                return this.handleError(c);
            var d = this, j = this.owner.context, k = this.request.response, l = i.proxy(this.handleError, this), m = b.readLAMEHeader(k);
            if (h > 1) {
                var n = new Uint8Array(k);
                m.id3v2 && m.frameHeaderOffset && (n[m.frameHeaderOffset + 1] &= 243);
                var o = new Uint8Array(k.byteLength * h);
                o.set(n, 0), k = o.buffer, n = null, o = null
            }
            var p = function(a) {
                if (m && m.sampleRate) {
                    m.id3v2 ? (a.id3v2 = m.id3v2, a.delay = m.encoderDelay ? m.encoderDelay / m.sampleRate : f / m.sampleRate, a.padding = m.padding ? m.padding / m.sampleRate : g / m.sampleRate) : (a.delay = m.encoderDelay ? (m.encoderDelay + e) / m.sampleRate : (f + e) / m.sampleRate, a.padding = m.padding ? m.padding / m.sampleRate : g / m.sampleRate);
                    var b = 100;
                    a.delay = Math.ceil(a.delay * b) / b, a.padding = Math.ceil(a.padding * b) / b
                }
                d.handleAudioDecoded(a)
            };
            j.decodeAudioData(k, p, function(a) {
                if (a)
                    return l(a);
                var b = new Uint8Array(k);
                b.indexOf = Array.prototype.indexOf;
                for (var c = 0; ; ) {
                    if (c = b.indexOf(255, c), -1 == c || b[c + 1] & !0)
                        break;
                    c++
                }
                c >= 0 && j.decodeAudioData(k.slice(c), p, function(a) {
                    return a ? l(a) : void 0
                })
            })
        }, c.handleError = function(b) {
            a.each(["onload", "onerror", "onprogress"], function(a) {
                b.currentTarget[a] = null
            }), this.owner.removeSound(this.src), this.onerror && this.onerror(b)
        }
    }.call(this), function() {
        var a = i.HTMLAudioPlugin.SoundInstance, b = a.prototype;
        b._handleSoundReady = function(a) {
            return this._duration = 1e3 * this.tag.duration || .5, this.playState = i.Sound.PLAY_SUCCEEDED, this.paused = this._paused = !1, this.tag.removeEventListener(i.HTMLAudioPlugin._AUDIO_READY, this._readyHandler, !1), this._offset >= this.getDuration() ? void this.playFailed() : (this._offset > 0 && (this.tag.currentTime = .001 * this._offset), -1 == this._remainingLoops && (this.tag.loop = !0), 0 != this._remainingLoops && (this.tag.addEventListener(i.HTMLAudioPlugin._AUDIO_SEEKED, this.loopHandler, !1), this.tag.loop = !0), void this.tag.play())
        }
    }.call(this), function() {
        var a = i.WebAudioPlugin.SoundInstance.prototype;
        a._init = function(a, b) {
            this._owner = b, this.src = a, this.gainNode = this._owner.context.createGain(), c.cannotCreatePanner() || (this.panNode = this._owner.context.createPanner(), this.panNode.panningModel = this._owner._panningModel, this.panNode.connect(this.gainNode)), this._owner.isPreloadComplete(this.src) && (this._duration = 1e3 * this._owner._arrayBuffers[this.src].duration), this._endedHandler = i.proxy(this._handleSoundComplete, this)
        }, a._cleanUpAudioNode = function(a) {
            if (a) {
                try {
                    a.stop(0)
                } catch (b) {
                }
                try {
                    this.panNode ? a.disconnect(this.panNode) : a.disconnect(this.gainNode)
                } catch (b) {
                    a.disconnect()
                }
                a = null
            }
            return a
        }, a._handleSoundReady = function(a) {
            if (null != window.createjs) {
                if (1e3 * this._offset > this.getDuration())
                    return void this.playFailed();
                this._offset < 0 && (this._offset = 0), this.playState = i.Sound.PLAY_SUCCEEDED, this._paused = !1, this.gainNode.connect(this._owner.gainNode);
                var b = this._owner._arrayBuffers[this.src], c = b.padding || 0, d = b.delay || 0;
                0 == this._remainingLoops ? (c = 0, d = 0) : (c += d, d = 0);
                var e = b.duration / h;
                this.sourceNode = this._createAndPlayAudioNode(this._owner.context.currentTime - e, this._offset), this._duration = 1e3 * e, this._startTime = this.sourceNode.startTime - (this._offset + c), b.id3v2 && (this.sourceNode.gain.setValueAtTime(this.sourceNode.gain.value, this.sourceNode.startTime + e - c), this.sourceNode.gain.linearRampToValueAtTime(0, this.sourceNode.startTime + e), this.sourceNode.gain.cancelScheduledValues(this.sourceNode.startTime + e + 1)), this._soundCompleteTimeout = setTimeout(this._endedHandler, 1e3 * (e - (this._offset + c))), 0 != this._remainingLoops && (this._sourceNodeNext = this._createAndPlayAudioNode(this._startTime, d), b.id3v2 && (this._sourceNodeNext.gain.setValueAtTime(this._sourceNodeNext.gain.value, this._sourceNodeNext.startTime + e - (d + c)), this._sourceNodeNext.gain.linearRampToValueAtTime(0, this._sourceNodeNext.startTime + e - d), this._sourceNodeNext.gain.cancelScheduledValues(this._sourceNodeNext.startTime + e - d + 1)))
            }
        }, a._createAndPlayAudioNode = function(a, b) {
            var c = this._owner.context.createBufferSource();
            if ("undefined" == typeof c.gain) {
                var d = this._owner.context.createGain();
                c.gain = d.gain
            }
            c.buffer = this._owner._arrayBuffers[this.src], this.panNode ? c.connect(this.panNode) : c.connect(this.gainNode);
            this._owner.context.currentTime;
            return c.startTime = a + c.buffer.duration / h, c.playbackRate.value = h, c.start(c.startTime, b, c.buffer.duration - b), c
        }, a._handleSoundComplete = function(a) {
            this._offset = 0;
            var b = this, c = this._owner._arrayBuffers[this.src], d = this.sourceNode, e = this._owner.context, f = d.startTime + c.duration;
            if (0 != this._remainingLoops) {
                if (this._remainingLoops--, this._sourceNodeNext) {
                    var g = c.padding || 0, h = c.delay || 0;
                    g += h, h = 0;
                    var j = setInterval(function() {
                        f < e.currentTime && (b._cleanUpAudioNode(d), clearInterval(j))
                    }, 1e3);
                    this.sourceNode = this._sourceNodeNext, this._startTime = this.sourceNode.startTime - (h + g), this._sourceNodeNext = this._createAndPlayAudioNode(this._startTime, h), this._soundCompleteTimeout = setTimeout(this._endedHandler, 1e3 * Math.max(0, this._startTime - e.currentTime) + this._duration), c.id3v2 && (this._sourceNodeNext.gain.setValueAtTime(this._sourceNodeNext.gain.value, this._sourceNodeNext.startTime + this._duration / 1e3 - (h + g)), this._sourceNodeNext.gain.linearRampToValueAtTime(0, this._sourceNodeNext.startTime + this._duration / 1e3 - h), this._sourceNodeNext.gain.cancelScheduledValues(this._sourceNodeNext.startTime + this._duration / 1e3 - h + 1))
                } else
                    this._handleSoundReady(null);
                return void this._sendEvent("loop")
            }
            if (null != window.createjs) {
                this.playState = i.Sound.PLAY_FINISHED, this._sendEvent("complete");
                var j = setInterval(function k() {
                    return b.playState !== i.Sound.PLAY_FINISHED ? clearInterval(j) : f < e.currentTime && (b._cleanUp(), clearInterval(j)), k
                }(), 1e3)
            }
        }
    }.call(this))
});
