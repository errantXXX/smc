/**
 * Created by Administrator on 2016/10/18.
 */
define(["jquery", "underscore"], function(a, b) {
    var c = function() {
        function a(a) {
            this.ajaxLimits = {}, this.startNum = a.length - 1
        }
        var b = 1, c = 0;
        return a.prototype.add = function(a) {
            this.check(a) || (this.ajaxLimits[a] = b)
        }, a.prototype.remove = function(a) {
            this.check(a) && (this.ajaxLimits[a] = c)
        }, a.prototype.check = function(a) {
            var c = this.ajaxLimits[a];
            return b === c ? !0 : !1
        }, a.prototype.getRequestString = function(a) {
            var b = a.indexOf("?");
            return 0 > b && (b = a.length), a.substring(this.startNum, b)
        }, new a(Game.baseUri)
    }(), d = function() {
        this.initialize.apply(this, arguments)
    };
    !function(a) {
        a.initialize = function() {
            return this._pool = {}, this._index = 0, this
        }, a.add = function(a) {
            var b = this._pool, d = this._index++;
            a._index = d, b[d] = a, c.add(a._requestKey)
        }, a.remove = function(a) {
            a ? (c.remove(a._requestKey), delete this._pool[a._index]) : this._pool = {}
        }, a.abort = function(a) {
            a ? (a._isManuallyAborted = !0, a.abort(), this.remove(a)) : (b.each(this._pool, function(a) {
                c.remove(a._requestKey), a._isManuallyAborted = !0, a.abort()
            }), this.remove())
        }
    }(d.prototype);
    var e = function() {
        return new d
    }, f = e(), g = function(a) {
        f.add(a)
    }, h = function(a) {
        f.remove(a)
    }, i = function(a) {
        f.abort(a)
    }, j = function(a, b) {
        return a._requestKey = c.getRequestString(b), c.check(a._requestKey)
    }, k = function(a) {
        return a._isManuallyAborted && "abort" === a.statusText
    };
    return {createXHRPool: e,addXHR: g,removeXHR: h,abortXHR: i,isManuallyAbortedXHR: k,controlXHR: j}
});
