var Game = window.Game = window.Game || {}, hitTestCanvas = createjs.DisplayObject._hitTestCanvas;
hitTestCanvas.width = 2, hitTestCanvas.height = 2, createjs.Container.prototype._testHit = function(a) {
    var b;
    try {
        var c = a.getImageData(0, 0, 2, 2).data;
        b = 1 < c[3], b = b || 1 < c[7], b = b || 1 < c[11], b = b || 1 < c[15]
    } catch (d) {
        if (!createjs.Container.suppressCrossDomainErrors)
            throw "An error has occurred. This is most likely due to security restrictions on reading canvas pixel data with local or cross-domain images."
    }
    return b
}, createjs.Container.prototype._getObjectsUnderPoint = function(a, b, c, d, e) {
    var f = createjs.Container, g = createjs.DisplayObject._hitTestContext, h = this._matrix;
    e = e || d && this._hasMouseEventListener();
    for (var i = this.children, j = i.length, k = j - 1; k >= 0; k--) {
        var l = i[k], m = l.hitArea;
        if (l.visible && (m || l.isVisible()) && (!d || l.mouseEnabled))
            if (!m && l instanceof f) {
                var n = l._getObjectsUnderPoint(a, b, c, d, e);
                if (!c && n)
                    return d && !this.mouseChildren ? this : n
            } else {
                if (!e && !l._hasMouseEventListener())
                    continue;
                if (l.getConcatenatedMatrix(h), m && (h.appendTransform(m.x, m.y, m.scaleX, m.scaleY, m.rotation, m.skewX, m.skewY, m.regX, m.regY), h.alpha = m.alpha), g.globalAlpha = h.alpha, g.setTransform(h.a, h.b, h.c, h.d, h.tx - a, h.ty - b), (m || l).draw(g), !this._testHit(g))
                    continue;
                if (g.setTransform(1, 0, 0, 1, 0, 0), g.clearRect(0, 0, 3, 3), !c)
                    return d && !this.mouseChildren ? this : l;
                c.push(l)
            }
    }
    return null
};
var originalUpdate = createjs.Stage.prototype.Stage_originalUpdate = createjs.Stage.prototype.update;
require(["catalog/ua/canvas"], function(a) {
    a.requiresLayoutInUpdate() && (createjs.Stage.prototype.update = function(a) {
        if (this.canvas && this.autoClear) {
            var b = this.canvas.style.display;
            "none" != b && (this.canvas.style.display = "none", this.canvas.offsetHeight, this.canvas.style.display = b)
        }
        originalUpdate.apply(this, arguments)
    })
});
var patchWithCJSScale = function(a) {
    var b = createjs.Stage.prototype.initialize;
    createjs.Stage.prototype.initialize = function(c) {
        if (c) {
            var d = parseInt(c.getAttribute("data-width"), 10) || parseInt(c.style.width, 10) || c.width / 2,
                e = parseInt(c.getAttribute("data-height"), 10) || parseInt(c.style.height, 10) || c.height / 2;
            c.setAttribute("data-width", d),
                c.setAttribute("data-height", e),
                c.style.zoom = 1 / window.deviceRatio,
                c.style.width = d * window.deviceRatio + "px",
                c.style.height = e * window.deviceRatio + "px",
                c.width = 2 * d * a,
                c.height = 2 * e * a
        }
        var f = b.apply(this, arguments);
        return this.clear(), f
    };
    var c = createjs.Bitmap.prototype.initialize;
    createjs.Bitmap.prototype.initialize = function(b) {
        var d = c.apply(this, arguments);
        if (this.sourceRect) {
            var e = this.sourceRect;
            this.sourceRect.x = e.x * a, this.sourceRect.y = e.y * a, this.sourceRect.width = Math.round(e.width * a), this.sourceRect.height = Math.round(e.height * a)
        }
        return d
    };
    var d = createjs.SpriteSheet.prototype.initialize;
    createjs.SpriteSheet.prototype.initialize = function(b) {
        return b.images = _.map(b.images, function(a) {
            return Game.imgUri + "/" + a
        }), b.frames = _.map(b.frames, function(b) {
            return _.map(b, function(b) {
                return b * a
            })
        }), d.call(this, b)
    };
    var e = createjs.DisplayObject.prototype.setTransform;
    createjs.Shape.prototype.setTransform = function(b, c, d, f, g, h, i, j, k) {
        return e.call(this, b, c, (null == d ? 1 : d) * a, (null == f ? 1 : f) * a, g, h, i, j, k)
    };
    var f = createjs.DisplayObject.prototype.cache;
    createjs.DisplayObject.prototype.cache = function(b, c, d, e, g) {
        return f.call(this, b ? b * a : b, c ? c * a : c, d ? d * a : d, e ? e * a : e, g)
    };
    var g = createjs.Text.prototype.initialize;
    createjs.Text.prototype.initialize = function(b, c, d) {
        if (c) {
            var e = c.split(/\s+/);
            _.each(e, function(b, c) {
                var d = b.match(/^(\d+)(px|%|em|ex|pt|in|cm|mm|pc)$/);
                null !== d && (e[c] = Math.round(d[1] * a) + d[2])
            }), c = e.join(" ")
        }
        var f = this;
        return this.draw = function() {
            delete f.draw, this.lineWidth = null != this.lineWidth ? Math.round(this.lineWidth * a) : null, this.lineHeight = null != this.lineHeight ? Math.round(this.lineHeight * a) : null, f.__proto__.draw.apply(this, arguments)
        }, g.call(this, b, c, d)
    };
    var h = createjs.Matrix2D.prototype.appendTransform;
    createjs.Matrix2D.prototype.appendTransform = function(b, c, d, e, f, g, i, j, k) {
        var l = h.call(this, b ? b * a : b, c ? c * a : c, d, e, f, g, i, j ? j * a : j, k ? k * a : k);
        return l
    };
    var i = createjs.Matrix2D_prependTransform = createjs.Matrix2D.prototype.prependTransform;
    createjs.Matrix2D.prototype.prependTransform = function(b, c, d, e, f, g, h, j, k) {
        var l = i.call(this, b ? b * a : b, c ? c * a : c, d, e, f, g, h, j ? j * a : j, k ? k * a : k);
        return l
    }, createjs.DisplayObject.prototype.setScaleX = function(b) {
        this.scaleX = b * a
    }, createjs.DisplayObject.prototype.setScaleY = function(b) {
        this.scaleY = b * a
    }, createjs.DisplayObject.prototype.setRegX = function(b) {
        this.regX = b / a
    }, createjs.DisplayObject.prototype.setRegY = function(b) {
        this.regY = b / a
    };
    var j = createjs.LoadQueue.prototype._createTag;
    createjs.LoadQueue.prototype._createTag = function(a) {
        a.type === createjs.LoadQueue.IMAGE && (this._crossOrigin = "anonymous");
        var b = j.call(this, a);
        return b && b.tagName && "SCRIPT" === b.tagName.toUpperCase() && ("" == this._crossOrigin || this._isLocal(a) || (b.crossOrigin = this._crossOrigin)), b
    }
};
patchWithCJSScale(Game.cjsScale);
