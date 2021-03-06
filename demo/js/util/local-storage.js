/**
 * @fileoverview LocalStorage utility
 */
define(["underscore"], function(a) {
    var b = !1, c = "_", d = "_", e = window.localStorage, f = {}, g = function() {
    };
    if (f.isSupported = function() {
            if (!e)
                return !1;
            try {
                return e.setItem(c, d), e.getItem(c) ? (e.removeItem(c), !0) : !1
            } catch (a) {
                return !1
            }
        }, f.isSupported()) {
        if (b) {
            var h = function(a) {
                if (!a)
                    return a;
                for (var b = "", c = 0, d = a.length; d > c; c += 2)
                    b += String.fromCharCode((255 & a.charCodeAt(c)) << 8 | 255 & a.charCodeAt(c + 1));
                return b
            }, i = function(a) {
                if (!a)
                    return a;
                for (var b = "", c = 0, d = a.length; d > c; c++) {
                    var e = a.charCodeAt(c);
                    b += String.fromCharCode(e >>> 8, 255 & e)
                }
                return b
            }, j = e.getItem;
            e.getItem = function(a) {
                var b = j.call(e, a);
                return i(b)
            };
            var k = e.setItem;
            e.setItem = function(a, b) {
                return b = h(b), k.call(e, a, b)
            }
        }
        f.get = f.getItem = function(a) {
            return e.getItem(a)
        }, f.remove = f.removeItem = function(a) {
            return e.removeItem(a), this
        }, f.set = f.setItem = function(a, b) {
            try {
                return e.setItem(a, b), !0
            } catch (c) {
                return 22 == c.code, !1
            }
        }, f.clear = function() {
            return e.clear(), !0
        }, f.getObject = function(a) {
            return JSON.parse(f.get(a))
        }, f.setObject = function(a, b) {
            return f.set(a, JSON.stringify(b))
        }, f.each = function(a) {
            for (var b = 0, c = e.length; c > b; b++) {
                var d = e.key(b), f = e.getItem(d);
                a.call(this, f, d)
            }
        }, f.map = function(a) {
            for (var b = [], c = 0, d = e.length; d > c; c++) {
                var f = e.key(c), g = e.getItem(f), h = a.call(this, g, f);
                b.push(h)
            }
            return b
        }
    } else
        a.each(["get", "remove", "set", "clear", "getObject", "setObject", "each", "map"], function(a) {
            f[a] = function() {
                return g(), !1
            }
        });
    var l = 0;
    f.maxBytes = function(b) {
        return a.isUndefined(b) ? l : l = Number(b)
    };
    var m = "default";
    f.namespace = function(a) {
        return m = a
    }, f.contentKey = function(a) {
        return m + "." + a
    }, f.checksumKey = function(a) {
        return m + "-checksum." + a
    }, f.countKey = function(a) {
        return m + "-count." + a
    }, f.timeKey = function(a) {
        return m + "-time." + a
    }, f.isContentKey = function(a) {
        return 0 == a.indexOf(m + ".")
    }, f.originalKeyOfContent = function(a) {
        return a.slice(m.length + 1)
    };
    var n = function() {
        var b = f.map(function(a, b) {
            return b
        });
        return a.filter(b, function(a) {
            return f.isContentKey(a)
        })
    }, o = function(b) {
        var c = a.sortBy(n(), function(a) {
            var b = f.originalKeyOfContent(a), c = f.getCount(b);
            return Number(c)
        });
        return p(c, b)
    }, p = function(a, b) {
        var c, d, e, g, h, i, j = 0;
        for (c = 0, e = a.length; e > c && b > j; c++)
            g = a[c], h = f.get(g), j += h.length;
        if (b > j)
            return !1;
        for (d = 0; c > d; d++)
            g = a[d], i = f.originalKeyOfContent(g), f.removeContent(i), f.removeChecksum(i), f.removeTime(i), f.removeCount(i);
        return !0
    }, q = function(a) {
        return o(a)
    };
    return a.each(["get", "set", "remove"], function(a) {
        f[a + "Checksum"] = function(b, c) {
            return f[a](f.checksumKey(b), c)
        }, f[a + "Time"] = function(b, c) {
            return f[a](f.timeKey(b), c)
        }, f[a + "Count"] = function(b, c) {
            return f[a](f.countKey(b), c)
        }
    }), f.getContent = function(a) {
        return f.updateTime(a), f.updateCount(a), i(f.get(f.contentKey(a)))
    }, f.hasContent = function(a) {
        return !!f.get(f.contentKey(a))
    }, f.setContent = function(a, b) {
        var c = b.length;
        if (l && c > l)
            return !1;
        f.updateTime(a), f.updateCount(a);
        var d = h(b);
        return f.set(f.contentKey(a), d) ? !0 : q(c) ? f.set(f.contentKey(a), d) : (f.removeContent(a), !1)
    }, f.removeContent = function(a) {
        return f.removeChecksum(a), f.removeTime(a), f.removeCount(a), f.remove(f.contentKey(a))
    }, f.updateTime = f.updateAccessTime = function(a) {
        return f.setTime(a, (new Date).getTime())
    }, f.updateCount = f.updateAccessCount = function(a) {
        var b = Number(f.getCount(a)) || 0;
        return f.setCount(a, b + 1)
    }, f.verifyChecksum = function(a, b) {
        return f.hasContent(a) ? f.getChecksum(a) == b : (f.removeChecksum(a), f.removeTime(a), f.removeCount(a), !1)
    }, f.clearExpired = function(b) {
        var c = n();
        if (!a.isEmpty(c)) {
            var d = a.map(c, function(a) {
                return f.originalKeyOfContent(a)
            }), e = a.sortBy(d, function(a) {
                return f.getTime(a)
            })[0], g = f.getTime(e);
            b > g && f.clear()
        }
    }, f
});
