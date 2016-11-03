define(["underscore", "util/language-message"], function (a, b) {
    var c = window.Game, d = window.createjs, e = 0 == c.setting.effect_mode, f = function () {
        return c.imgUri + "/sp/"
    }, g = function (a, b) {
        var c = new d.Shape;
        return c.graphics.beginFill("#000000").drawRect(0, 0, a, b), c
    }, h = function (a) {
        this.initialize(a)
    };
    h.prototype = new d.Bitmap, h.prototype.initialize = function (a) {
        d.Bitmap.prototype.initialize.call(this, a);
        var b = this;
        this.image.onload = function () {
            var a = b.image;
            a && (b.hitArea = g(a.width, a.height))
        }
    };
    var i = function (a, b) {
        this.initialize(a, b)
    };
    i.prototype = new d.Sprite, i.prototype.initialize = function (a, b) {
        d.Sprite.prototype.initialize.call(this, a, b);
        var c = this, e = c.getBounds();
        c.hitArea = g(e.width, e.height)
    };
    var j = function () {
        function a(a, b, c, d) {
            this.initialize(a, b, c, d)
        }

        var b = 32, f = "FOT-ニューロダン Pro M, FOT-筑紫オールド明朝 Pro R, Average Sans, sans-serif", g = "#FFD700", h = "#a8fbff", i = "#FFFF40", j = "#150f0f", k = 1, l = 2, m = 3, n = 2, o = 2, p = 1, q = 0, r = 0, s = 3, t = 64, u = 100, v = 200, w = 13, x = 400, y = 400, z = "miss", A = "guard", B = "noeffect", C = a.prototype = new d.Container;
        return C.Container_initialize = C.initialize, C.initialize = function (a, b, d, e) {
            this.Container_initialize(), this.spriteSheet = a, this.alpha = 0, this.createIcon(b);
            var f;
            if (this.isMissStatus(b))f = b === B ? v : u; else {
                this.createText(d, e);
                var g = this.getChildByName("text").getBounds() ? this.getChildByName("text").getBounds().width : 0;
                f = g / c.cjsScale + t
            }
            this.setBounds(0, 0, f, null)
        }, C.createIcon = function (a) {
            if (null !== a) {
                var b;
                if (this.isMissStatus(a))b = new d.Sprite(this.spriteSheet, a); else {
                    var e = window.images["icon_status_" + a] || c.imgUri + "/sp/ui/icon/status/x64/status_" + a + ".png";
                    b = new d.Bitmap(e), b.name = "bitmap"
                }
                this.addChild(b)
            }
        }, C.isMissStatus = function (a) {
            return a === z || a === A || a === B
        }, C.createText = function (a, b) {
            var c = this.instantiateText(!1, a, b);
            c.name = "text";
            var d = this.instantiateText(!0, a, b);
            this.addChild(d), this.addChild(c)
        }, C.instantiateText = function (a, c, e) {
            var g = "bold " + b + "px " + f;
            if (d.denaVersion) {
                var h = a ? j : this.getTextColor(e), i = new d.Text(c, g, h);
                return i.x = a ? t + n : t, i.y = a ? w + o : w, i._redraw = 0, i
            }
            var h = a ? "transparent" : this.getTextColor(e), i = new d.Text(c, g, h);
            return i.x = t, i.y = w, i.lineWidth = null, a ? i.shadow = new d.Shadow(j, q, r, s) : i.shadow = new d.Shadow(j, n, o, p), i
        }, C.getTextColor = function (a) {
            var b;
            switch (a) {
                case k:
                    b = g;
                    break;
                case l:
                    b = h;
                    break;
                case m:
                    b = i;
                    break;
                default:
                    b = h
            }
            return b
        }, e ? C.show = function () {
            var a = this;
            a.alpha = 1, a.visible = !0, d.Tween.get(a).wait(x + y).call(function () {
                a.visible = !1
            }).call(this.dispatchEvent, ["animationEnd"])
        } : C.show = function () {
            var a = this;
            a.alpha = 1, a.visible = !0, d.Tween.get(a).wait(x).to({alpha: 0}, y).call(function () {
                a.visible = !1
            }).call(this.dispatchEvent, ["animationEnd"])
        }, a
    }(), k = function () {
        function b(a, b, c, d) {
            this.initialize(a, b, c, d)
        }

        function e(a) {
            return a /= 100, a *= j, a = Math.round(a), a /= j
        }

        var g = 0, j = 1e3, k = "l", l = 20, m = "FOT-ニューロダン Pro M, FOT-筑紫オールド明朝 Pro R, Average Sans, sans-serif", n = "#f2eee2", o = "#000", p = 2, q = 2, r = 2, s = -1, t = -1, u = 6, v = 0, w = 0, x = 62, y = 4, z = 12, A = 17, B = 490, C = 32, D = 28, E = 16, F = 235, G = 34, H = 54, I = 7, J = 62, K = 32, L = 28, M = 32, N = 62, O = 105, P = -5, Q = 5, R = 55, S = 92, T = 2, U = 5, V = -18, W = -12, X = -8, Y = -7, Z = -10, _ = 3, aa = b.prototype = new d.Container;
        aa.Container_initialize = aa.initialize, aa.initialize = function (a, b, c, d) {
            this.Container_initialize(), this.spriteSheet = a, this.isTarget = !1, this.isAlive = !0, this.pos = c, this.rare_flag = b.rare_flag;
            var e = b.enemy_id;
            this.hide(), this.createTarget(b.type, b.modeflag), this.createThumbnail(e), b.is_semi === !0 && b.switching_hp_gauge ? this.createHPGauge(b.type, b.modeflag, b.hp, b.hpmax, b.type, 4) : this.createHPGauge(b.type, b.modeflag, b.hp, b.hpmax, b.type), this.createModeGauge(b.type, b.modeflag, b.modegauge, b.overdrive_image, b.modechange), this.createRecast(b.type, b.modeflag, b.recast, b.recastmax, _ === parseInt(b.modechange, 10), b.no_special_flag), this.createCondition(b.type, b.condition.debuff, b.condition.buff, b.modechange, d)
        }, aa.show = function () {
            this.isAlive && (this.visible = !0, $("#enemy-name" + this.pos).show())
        }, aa.hide = function () {
            this.visible = !1, $("#enemy-name" + this.pos).hide()
        }, aa.remove = function () {
            this.removeAllChildren()
        }, aa.createThumbnail = function (a) {
            this.thumbnail = new h(f() + "assets/enemy/s/" + a + ".png"), this.thumbnail.x = v, this.thumbnail.y = w, this.addChild(this.thumbnail), "1" === this.rare_flag && (this.rareIcon = new i(this.spriteSheet, "rm_battle"), this.rareIcon.y = V, this.rareIcon.x = U, this.addChild(this.rareIcon))
        }, aa.createHPGauge = function (a, b, c, d, a, e) {
            this.hp = new ba(this.spriteSheet, c, d, a, e);
            var f = this.hp.getCurrentBarNumber(c, d);
            this.multiHpGaugeIndicator = new ca(this.spriteSheet, e, f), this.hp.setMultiHpGaugeIndicator(this.multiHpGaugeIndicator), this.hp.createGauge(c, d, a), this.hp.x = x, this.setUIPositionY(a, b, this.hp, [A, y, z]), this.addChild(this.hp), this.multiHpGaugeIndicator.x = B, this.setUIPositionY(a, b, this.multiHpGaugeIndicator, [E, C, D]), this.addChild(this.multiHpGaugeIndicator)
        }, aa.createModeGauge = function (a, b, c, d, e) {
            void 0 === b && (b = 0), g !== parseInt(b, 10) && (this.mode = new da(this.spriteSheet, c, d, e, a), this.setUIPositionY(a, b, this.mode, [G, I, 0]), this.setUIPositionX(a, b, this.mode, [F, H, 0]), this.addChild(this.mode))
        }, aa.createRecast = function (a, b, c, d, e, f) {
            this.recast = new ea(this.spriteSheet, parseInt(c, 10), parseInt(d, 10), e, f), this.recast.x = J, this.setUIPositionY(a, b, this.recast, [M, K, L]), this.addChild(this.recast)
        }, aa.createCondition = function (a, b, c, d, e) {
            var f = b.concat(c);
            this.condition = new fa(a, f, d, e), k === a ? (this.condition.x = e ? O : N, this.condition.y = P) : (this.condition.x = Q, this.condition.y = R), this.addChild(this.condition)
        }, aa.createText = function (a) {
            var b = this.instantiateText(!0, a);
            this.addChild(b);
            var c = this.instantiateText(!1, a);
            this.text = c, this.addChild(c)
        }, aa.instantiateText = function (a, b) {
            var c = new d.Text(b, l + "px " + m, n);
            return c.lineWidth = null, c.x = S, c.y = T, a ? c.shadow = new d.Shadow(o, s, t, u) : c.shadow = new d.Shadow(o, p, q, r), c
        }, aa.createTarget = function (a, b) {
            var c, d;
            this.targeting = new ga(this.spriteSheet, a, b), k === a ? (c = W, d = X) : (c = Y, d = Z), this.targeting.x = c, this.targeting.y = d, this.targeting.hide(), this.addChild(this.targeting)
        }, aa.markTarget = function () {
            this.isTarget = this.targeting.show()
        }, aa.unmarkTarget = function () {
            null !== this.targeting && (this.isTarget = this.targeting.hide())
        }, aa.toggleTarget = function () {
            this.isTarget = this.targeting.toggle()
        }, aa.setUIPositionY = function (a, b, c, d) {
            k === a ? c.y = d[0] : g !== parseInt(b, 10) ? c.y = d[1] : c.y = d[2]
        }, aa.setUIPositionX = function (a, b, c, d) {
            k === a ? c.x = d[0] : g !== parseInt(b, 10) ? c.x = d[1] : c.x = d[2]
        }, aa.changeThumbnail = function (a) {
            this.removeChild(this.thumbnail), this.thumbnail = new h(f() + "assets/enemy/s/" + a + ".png"), this.addChild(this.thumbnail)
        };
        var ba = function () {
            var b = 416, f = 135, g = 8, h = 100, j = "#C2C2C2", l = "#c7cebd", m = ["#ee0000", "#ffbb00", "#0033ff", "#770088"], n = -7, o = -12, p = 6, q = 4, r = 6, s = 4, t = 2, u = [[100], [50, 50], [33, 34, 33], [25, 25, 25, 25]], v = function (a, b, c, d, e, f) {
                this.initialize(a, b, c, d, e, f)
            }, w = v.prototype = new d.Container;
            return w.Container_initialize = w.initialize, w.initialize = function (a, b, c, d, e, f) {
                this.Container_initialize(), this.spriteSheet = a, this.maxBarNum = e || 1, this.currentBarNum = this.getCurrentBarNumber(b, c), this.hpBarDiff = [], this.hpBar = [], this.hpAddFlag = [], this.hpBarDiffChangeQueue = [], this.isChangingDiffBar = !1
            }, w.setMultiHpGaugeIndicator = function (a) {
                this.multiHpGaugeIndicator = a
            }, w.createGauge = function (c, e, u) {
                var v, w;
                k === u ? (w = "l", v = b) : (w = "s", v = f), this.hpBarBack = new i(this.spriteSheet, "gauge_hp_base_" + w), this.hpBarBack.y = o, this.hpBarBack.x = n;
                var x = this;
                a.each(a.range(x.maxBarNum), function (a) {
                    var b, c;
                    c = new d.Graphics, c.beginFill(j).drawRect(0, 0, v, g), x.hpBarDiff[a] = new d.Shape(c), x.hpBarDiff[a].setTransform(0, 0, 1, 1, 0, 0, 0, 0, 0), b = new d.Graphics, b.beginLinearGradientFill([l, m[a]], [0, 1], 0, 0, 0, g).drawRect(0, 0, v, g), x.hpBar[a] = new d.Shape(b), x.hpBar[a].setTransform(0, 0, 1, 1, 0, 0, 0, 0, 0), x.hpBarDiff[a].y = q, x.hpBarDiff[a].x = p, x.hpBar[a].y = s, x.hpBar[a].x = r, x.hpBar[a].setScaleX(x.getScaleX(h)), x.hpBarDiff[a].setScaleX(x.getScaleX(h)), x.hpAddFlag[a] = !0
                });
                var y = k === u ? b : f;
                this.indicationIconS1 = new i(this.spriteSheet, "icon_gauge_s"), this.indicationIconS1.x = this.getIndicationIconX(y, 25), this.indicationIconS2 = new i(this.spriteSheet, "icon_gauge_s"), this.indicationIconS2.x = this.getIndicationIconX(y, 75) - 2, this.indicationIconL = new i(this.spriteSheet, "icon_gauge_l"), this.indicationIconL.x = this.getIndicationIconX(y, 50), this.indicationIconS1.y = this.indicationIconS2.y = this.indicationIconL.y = t, k === u ? (this.indicationIconS1.x = this.indicationIconS1.x - 2, this.indicationIconS2.x = this.indicationIconS2.x - 1, this.indicationIconL.x = this.indicationIconL.x - 6) : (this.indicationIconS1.x = this.indicationIconS1.x - 2, this.indicationIconS2.x = this.indicationIconS2.x - 2, this.indicationIconL.x = this.indicationIconL.x - 5), this.show();
                var z = this.getPercent(c, e), A = this.getTargetBarPercent(c, e, this.currentBarNum);
                this.changeBar(z, A)
            }, w.getPercent = function (a, b) {
                return Math.min(Math.ceil(100 * a / b, 10), h)
            }, w.getCurrentBarNumber = function (b, c) {
                var d = u[this.maxBarNum - 1], e = 100 * b / c, f = [], g = 0;
                return a.each(d, function (a, b) {
                    g += a, e > g && f.push(a)
                }), f.length
            }, w.getTargetBarPercent = function (b, c, d) {
                var e = u[this.maxBarNum - 1], f = 100 * b / c, g = 0;
                return a.some(a.range(this.maxBarNum), function (a) {
                    return a === d ? (g = e[a], !0) : (f = f -= e[a], 0 > f && (f = 0), !1)
                }), Math.min(Math.ceil(100 * f / g, 10), h)
            }, w.getIndicationIconX = function (a, b) {
                var c = .01 * b;
                return parseInt(a * c, 10)
            }, w.show = function () {
                this.addChild(this.hpBarBack);
                var b = this;
                a.each(a.range(b.maxBarNum), function (a) {
                    b.addChild(b.hpBarDiff[a], b.hpBar[a])
                }), this.addChild(this.indicationIconS1, this.indicationIconS2, this.indicationIconL)
            }, w.getScaleX = e, w.change = function (b, e, f, g) {
                var h = this.getPercent(b, e), i = this.getTargetBarPercent(b, e, this.currentBarNum), j = this.getScaleX(i);
                (0 === i || 100 === i) && (this.changeBar(h, i), j = this.getScaleX(this.getTargetBarPercent(b, e, this.currentBarNum)));
                var k = $("#enemy-hp" + g);
                k.text(h), this.hpBar[this.currentBarNum].setScaleX(j);
                var l = this.hpBar[this.currentBarNum].scaleX, m = this;
                d.Tween.get(this.hpBarDiff[this.currentBarNum]).to({scaleX: a.clone(l)}, 300, d.Ease.linear).call(function () {
                    f && 1 != c.setting.cjs_mode && d.Tween.get(m.hpBarDiff[m.currentBarNum]).to({scaleX: a.clone(l)}, 300, d.Ease.linear)
                })
            }, w.changeBar = function (b, c) {
                var d = u[this.maxBarNum - 1], e = 0, f = !1, g = this;
                a.each(a.range(d.length), function (a) {
                    e += d[a], e >= b && !f ? (f = !0, g.currentBarNum = a) : f && (g.hpAddFlag[a] = !1, g.removeChild(g.hpBar[a], g.hpBarDiff[a]), g.multiHpGaugeIndicator.removeEnemyMultiHPGaugeIndicator(g.multiHpGaugeIndicator, g.currentBarNum))
                })
            }, v
        }(), ca = function () {
            var b = 20, c = "hp_cell_on", e = "hp_cell_off", f = function (a, b, c) {
                this.initialize(a, b, c)
            }, g = f.prototype = new d.Container;
            return g.Container_initialize = g.initialize, g.initialize = function (a, b, c) {
                this.Container_initialize(), this.spriteSheet = a, this.maxBarNum = b, this.createEnemyMultiHPGaugeIndicator(b, c)
            }, g.createEnemyMultiHPGaugeIndicator = function (d, f) {
                this.hpIndicators = [];
                var g = this;
                this.colorIndex = f;
                var h = c, j = e;
                a.each(a.range(d - 1), function (a, c) {
                    g.spriteHpIndicator = new i(g.spriteSheet, c <= g.colorIndex - 1 ? h : j), g.spriteHpIndicator.x = a * b, g.hpIndicators.push(g.spriteHpIndicator), g.addChild(g.spriteHpIndicator)
                })
            }, g.removeEnemyMultiHPGaugeIndicator = function (d, f) {
                self = d;
                var g = c, h = e;
                a.each(a.range(self.maxBarNum - 1), function (a, c) {
                    self.spriteHpIndicator = new i(self.spriteSheet, f - 1 >= c ? g : h), self.spriteHpIndicator.x = a * b, self.hpIndicators.push(self.spriteHpIndicator), self.addChild(self.spriteHpIndicator)
                })
            }, f
        }(), da = function () {
            var b = 2, c = 72, g = 6, j = 85, l = 5, m = 85, n = 7, o = 73, p = 64, q = 17, r = -15, s = -34, t = -15, u = -34, v = -32, w = function (a, b, c, d, e) {
                this.initialize(a, b, c, d, e)
            }, x = w.prototype = new d.Container;
            return x.Container_initialize = x.initialize, x.initialize = function (a, b, c, d, e) {
                this.Container_initialize(), this.spriteSheet = a, this.createGauge(b, c, d, e)
            }, x.createGauge = function (b, d, e, w) {
                var x, y, z, A, B, C, D, E, F;
                k === w ? (x = "", A = "mode_gauge_yel.png", z = c, y = g, E = j, F = l, C = m, D = n) : (x = "_s", A = "mode_gauge_yel_s.png", z = p, y = q, E = r, F = s, C = t, D = u), B = "enemy_text_od", a.isEmpty(d) || (A = "special_gauge_01.png", B = "special_gauge_01_text", C = k === w ? o : v), this.modeBack = new i(this.spriteSheet, "mode_gauge" + x), this.modeGauge = new h(f() + "raid/parts/" + A), this.modeGauge.x = this.modeBack.x + z, this.modeGauge.y = this.modeBack.y + y, this.modeGauge.scaleX = this.getScaleX(b), this.modeOverDrive = new i(this.spriteSheet, B), this.modeOverDrive.x = this.modeBack.x + C, this.modeOverDrive.y = this.modeBack.y + D, this.modeBreak = new i(this.spriteSheet, "enemy_text_break"), this.modeBreak.x = this.modeBack.x + E, this.modeBreak.y = this.modeBack.y + F, this.show(), this.changeMode(e)
            }, x.show = function () {
                this.addChild(this.modeBack), this.addChild(this.modeGauge)
            }, x.getScaleX = e, x.changeGauge = function (a) {
                this.modeGauge.scaleX = this.getScaleX(a)
            }, x.changeMode = function (a) {
                a = parseInt(a, 10), b === a ? this.addChild(this.modeOverDrive) : _ === a ? (this.removeChild(this.modeOverDrive), this.addChild(this.modeBreak)) : (this.removeChild(this.modeBreak), this.removeChild(this.modeOverDrive))
            }, w
        }(), ea = function () {
            var b = 20, c = "enemy_cell_on", e = "enemy_cell_off", f = "enemy_cell_light", g = "cell_on_break", h = "cell_off_break", j = 200, k = 1, l = 1, m = function (a, b, c, d, e) {
                this.initialize(a, b, c, d, e)
            }, n = m.prototype = new d.Container;
            return n.Container_initialize = n.initialize, n.initialize = function (a, b, c, d, e) {
                this.Container_initialize(), this.spriteSheet = a, this.currentRecast = b, this.maxRecast = c, this.isDisable = d, this.noSpecialFlag = e, this.isProcessing() && this.createRecast(b)
            }, n.changeRecast = function (a, b) {
                return this.isProcessing() && (a > this.currentRecast || b !== this.maxRecast) ? (this.removeAllChildren(), this.currentRecast = a, this.maxRecast = b, this.createRecast(a), !0) : !1
            }, n.createRecast = function (d) {
                this.recasts = [], this.alreadyBlinked = !1;
                var f, j, k = this, l = this.maxRecast - d - 1;
                this.isDisable ? (f = g, j = h) : (f = c, j = e), a.each(a.range(this.maxRecast - 1), function (a, c) {
                    var d = new i(k.spriteSheet, l >= c ? f : j);
                    d.x = a * b, k.recasts.push(d), k.addChild(d)
                }), this.isBlink(d) && !1 === this.isDisable && this.blinkRecast()
            }, n.colorRecast = function (a, b) {
                if (this.isProcessing()) {
                    var e;
                    if (a = parseInt(a, 10), b = parseInt(b, 10), !this.changeRecast(a, b))if (this.currentRecast = a, this.isBlink(a) && !1 === this.isDisable)this.blinkRecast(); else {
                        if (e = this.maxRecast - this.currentRecast - 1, 0 > e)this.clearRecast(); else for (var f = e; f >= 0; f--)d.denaVersion && d.Tween.removeTweens(this), "undefined" != typeof this.recasts[f] && this.recasts[f].gotoAndStop(this.isDisable ? g : c);
                        this.alreadyBlinked = !1
                    }
                }
            }, n.isBlink = function (a) {
                return this.isProcessing() ? k === a ? !0 : !1 : void 0
            }, n.blinkRecast = function () {
                if (this.isProcessing() && !this.alreadyBlinked) {
                    if (d.denaVersion)return d.Tween.removeTweens(this), d.Tween.get(this, {loop: !0}).wait(j).call(function () {
                        if (k == this.currentRecast)for (var a = this.recasts.length, b = 0; a > b; ++b)this.recasts[b].gotoAndStop(f)
                    }).wait(j).call(function () {
                        if (k == this.currentRecast)for (var a = this.recasts.length, b = 0; a > b; ++b)this.recasts[b].gotoAndStop(c)
                    }), void(this.alreadyBlinked = !0);
                    a.each(this.recasts, function (a) {
                        d.Tween.get(a, {loop: !0}).wait(j).call(function () {
                            this.gotoAndStop(f)
                        }).wait(j).call(function () {
                            this.gotoAndStop(c)
                        })
                    }), this.alreadyBlinked = !0
                }
            }, n.enableRecast = function () {
                if (this.isProcessing()) {
                    var b = this.maxRecast - this.currentRecast;
                    if (d.denaVersion) {
                        d.Tween.removeTweens(this);
                        for (var f = this.recasts.length, g = 0; f > g; ++g)this.recasts[g].gotoAndStop(b > g ? c : e);
                        return k === this.currentRecast && this.blinkRecast(), void(this.isDisable = !1)
                    }
                    a.each(this.recasts, function (a, f) {
                        d.Tween.removeTweens(a), a.gotoAndStop(b > f ? c : e)
                    }), k === this.currentRecast && this.blinkRecast(), this.isDisable = !1
                }
            }, n.disableRecast = function () {
                if (this.isProcessing()) {
                    var b = this.maxRecast - this.currentRecast;
                    if (d.denaVersion) {
                        d.Tween.removeTweens(this);
                        for (var c = this.recasts.length, e = 0; c > e; ++e)this.recasts[e].gotoAndStop(b > e ? g : h);
                        return this.isDisable = !0, void(this.alreadyBlinked = !1)
                    }
                    a.each(this.recasts, function (a, c) {
                        d.Tween.removeTweens(a), a.gotoAndStop(b > c ? g : h)
                    }), this.isDisable = !0, this.alreadyBlinked = !1
                }
            }, n.clearRecast = function () {
                if (this.isProcessing()) {
                    if (this.currentRecast = this.maxRecast, d.denaVersion) {
                        d.Tween.removeTweens(this);
                        for (var b = this.recasts.length, c = 0; b > c; ++c)this.recasts[c].gotoAndStop(this.isDisable ? h : e);
                        return void(this.alreadyBlinked = !1)
                    }
                    a.each(this.recasts, function (a) {
                        d.Tween.removeTweens(a), a.gotoAndStop(this.isDisable ? h : e)
                    }), this.alreadyBlinked = !1
                }
            }, n.isProcessing = function () {
                return l === this.noSpecialFlag ? !1 : !0
            }, m
        }(), fa = function () {
            var b = .4, c = .4, e = 24, g = 24, i = 1e3, j = 8, l = 18, m = 16, n = [1055, 1056], o = 2, p = 1, q = function (a, b, c, d) {
                this.initialize(a, b, c, d)
            }, r = q.prototype = new d.Container;
            return r.Container_initialize = r.initialize, r.initialize = function (a, b, c, d) {
                this.Container_initialize();
                var e = d ? m : l;
                this.maxLen = k === a ? e : j, this.rowNum = k === a ? p : o, this.showConditionGroupNum = 0, this.beforeConditionGroupNum = 0, this.setCondition(b, c), this.setConditionGroupList(), this.show(), this.blinkCondition()
            }, r.setCondition = function (b, c) {
                var d, e, f, g = c || 0, h = [];
                a.isEmpty(b) ? (e = [], f = []) : (e = a.isNull(b.buff) ? [] : b.buff, f = a.isNull(b.debuff) ? [] : b.debuff, d = void 0 === b.buff || void 0 === b.debuff ? b : f.concat(e)), a.each(d, function (b) {
                    var c = !0;
                    a.every(h, function (a) {
                        return a.status === b.status ? (c = !1, !1) : !0
                    }), c && h.push(b)
                }), _ != g && (h = a.reject(h, function (b) {
                    return a.some(n, function (a) {
                        return +a == +b.status
                    })
                })), this.conditions = h, this.removeAllChildren(), this.setConditionGroupList()
            }, r.setConditionGroupList = function () {
                var d = this.maxLen - 1, e = [];
                this.conditionGroupList = [];
                var g = this;
                a.each(this.conditions, function (a, i) {
                    var j = new h(f() + "ui/icon/status/x64/status_" + a.status + ".png");
                    j.scaleX = b, j.scaleY = c, e.push(j), (1 === g.maxLen || i % g.maxLen === d) && (g.conditionGroupList.push(e), e = [])
                }), e.length && this.conditionGroupList.push(e)
            }, r.show = function () {
                if (!(this.conditionGroupList.length <= 0)) {
                    var b = this;
                    a.each(a.range(b.rowNum), function (c) {
                        if (b.conditionGroupList[b.showConditionGroupNum + c]) {
                            var d = c * g;
                            a.each(b.conditionGroupList[b.showConditionGroupNum + c], function (a, c) {
                                a.y = d, a.x = c * e, b.addChild(a)
                            })
                        }
                    })
                }
            }, r.showBlinkCondition = function () {
                var b = this;
                a.each(a.range(b.rowNum), function (a) {
                    b.removeChild.apply(b, b.conditionGroupList[b.beforeConditionGroupNum + a])
                }), this.show()
            }, r.blinkCondition = function () {
                if (!(this.conditionGroupList.length <= 1)) {
                    d.Tween.removeTweens(this);
                    var a = this;
                    d.Tween.get(this, {loop: !0}).wait(i).call(function () {
                        a.beforeConditionGroupNum = a.showConditionGroupNum, a.showConditionGroupNum += a.rowNum, a.showConditionGroupNum >= a.conditionGroupList.length && (a.showConditionGroupNum = 0), a.showBlinkCondition()
                    })
                }
            }, q
        }(), ga = function () {
            var a = 220, b = -15, c = 80, e = -17, f = function (a, b, c) {
                this.initialize(a, b, c)
            }, h = f.prototype = new d.Container;
            return h.Container_initialize = h.initialize, h.initialize = function (a, b, c) {
                this.Container_initialize(), this.spriteSheet = a, this.type = b, this.modeflag = c, this.createSprite(b)
            }, h.createSprite = function () {
                var f, g, h;
                k === this.type ? (f = "gauge_target_l", g = a, h = b) : (f = "gauge_target_s", g = c, h = e);
                var i = new d.Sprite(this.spriteSheet, f);
                this.addChild(i), this.IndicatorSprite = new d.Sprite(this.spriteSheet, "deco_target"), this.IndicatorSprite.x = g, this.IndicatorSprite.y = h, this.addChild(this.IndicatorSprite)
            }, h.show = function () {
                return this.visible = !0, !0
            }, h.hide = function () {
                return this.visible = !1, !1
            }, h.showIndicator = function () {
                k !== this.type && g !== parseInt(this.modeflag, 10) && (this.IndicatorSprite.visible = !0)
            }, h.hideIndicator = function () {
                k !== this.type && g !== parseInt(this.modeflag, 10) && (this.IndicatorSprite.visible = !1)
            }, h.toggle = function () {
                var a;
                return a = this.visible ? this.hide() : this.show()
            }, f
        }();
        return b
    }(), l = function () {
        var b = .5, c = .5, e = 32, g = 32, i = 2, j = [{x: 6, y: 100}, {x: 6, y: 126}, {
            x: 6,
            y: 210
        }], k = function (a) {
            this.initialize(a)
        }, l = k.prototype = new d.Container;
        return l.Container_initialize = l.initialize, l.initialize = function (a) {
            this.Container_initialize(), this.positionNum = +a - 1, this.x = j[this.positionNum].x, this.y = j[this.positionNum].y
        }, l.setCondition = function (d) {
            var e = [], g = this;
            this.fieldConditionList = [], a.isEmpty(d) || (a.each(d, function (b) {
                var c = !0;
                a.every(e, function (a) {
                    return +a.status === +b.status ? (c = !1, !1) : !0
                }), c && e.push(b)
            }), this.removeAllChildren(), a.each(e, function (a) {
                var d = new h(f() + "ui/icon/field_effect/status_" + a.status + ".png");
                d.scaleX = b, d.scaleY = c, g.fieldConditionList.push(d)
            }), this.addConditionIcons())
        }, l.addConditionIcons = function () {
            if (!(1 > this.fieldConditionList.length)) {
                var b = this;
                a.each(this.fieldConditionList, function (a, c) {
                    i > b.positionNum ? a.x = c * g : a.y = c * e, b.addChild(a)
                }), this.show()
            }
        }, l.removeCondition = function () {
            this.removeAllChildren(), this.hide()
        }, l.show = function () {
            this.visible = !0
        }, l.hide = function () {
            this.visible = !1
        }, k
    }(), m = function () {
        var b = .5, c = .5, e = 32, g = {x: 78, y: 145}, i = function () {
            this.initialize()
        }, j = i.prototype = new d.Container;
        return j.Container_initialize = j.initialize, j.initialize = function () {
            this.Container_initialize(), this.x = g.x, this.y = g.y
        }, j.setCondition = function (d) {
            var e = [], g = this;
            this.AssistUnitConditionList = [], a.isEmpty(d) || (a.each(d, function (b) {
                var c = !0;
                a.every(e, function (a) {
                    return +a.image === +b.image ? (c = !1, !1) : !0
                }), c && e.push(b)
            }), this.removeAllChildren(), a.each(e, function (a) {
                var d = new h(f() + "ui/icon/status/defendorder/" + a.image + "_" + +a.status + ".png");
                d.scaleX = b, d.scaleY = c, g.AssistUnitConditionList.push(d)
            }), this.addConditionIcons())
        }, j.addConditionIcons = function () {
            if (!(1 > this.AssistUnitConditionList.length)) {
                var b = this;
                a.each(this.AssistUnitConditionList, function (a, c) {
                    a.x = c * e, b.addChild(a)
                }), this.show()
            }
        }, j.removeCondition = function () {
            this.removeAllChildren(), this.hide()
        }, j.show = function () {
            this.visible = !0
        }, j.hide = function () {
            this.visible = !1
        }, i
    }(), n = function () {
        function b(a, b) {
            this.initialize(a, b)
        }

        var c = 44, f = 13, g = 1.2, h = .5, i = .8, j = 10, k = -10, l = -10, m = -10, n = -20, o = 100, p = 250, q = 300, r = 800, s = 300, t = 500, u = -30, v = b.prototype = new d.Container;
        return v.Container_initialize = v.initialize, v.initialize = function (a, b) {
            this.Container_initialize(), this.spriteSheet = a, this.attributeId = b.attributeId, this.numSplit = b.num, this.size = b.size, this.isTotal = b.isTotal || !1, this.alpha = 0, this.isCritical = b.isCritical, this.create()
        }, v.create = function () {
            var b, e, g, h, i, j, k = this;
            99 === parseInt(k.attributeId, 10) ? (j = "heal_", k.size = "m") : j = "damage" + k.attributeId + "_l_", a.each(k.numSplit, function (a, b) {
                "-" !== a && (g = new d.Sprite(k.spriteSheet, j + a), 1 === parseInt(a, 10) ? g.x = c * b + f : g.x = c * b, k.addChild(g))
            }), b = k.getBounds(), k.regX = b.width / 2, k.regY = b.height / 2, k.numSplit.length >= 7 && (k.regX += u), k.isTotal ? (e = new d.Sprite(k.spriteSheet, "text_total" + k.attributeId), e.name = "total", e.y = l, e.alpha = 0, k.addChild(e)) : "l" === k.size && (k.isCritical ? (e = new d.Sprite(k.spriteSheet, "text_critical" + k.attributeId), e.name = "weakpoint", e.y = n) : (e = new d.Sprite(k.spriteSheet, "text_weakpoint" + k.attributeId), e.name = "weakpoint", e.y = m), e.visible = !1, k.addChild(e), i = k.numSplit.length - 1, h = new d.Sprite(k.spriteSheet, "damage" + k.attributeId + "_l_attention"), h.x = c * i + c, k.addChild(h))
        }, e ? v.show = function () {
            var a = this;
            a.alpha = 1, a.visible = !0, "s" === a.size ? a.scaleX = a.scaleY = h : "m" === a.size && (a.scaleX = a.scaleY = i), a.isTotal ? (a.getChildByName("total").alpha = 1, d.Tween.get(a).wait(q + r + p).call(function () {
                a.visible = !1
            }).call(this.dispatchEvent, ["animationEnd"])) : "l" === a.size ? (a.getChildByName("weakpoint").visible = !0, d.Tween.get(a).wait(q + s + p).call(function () {
                a.visible = !1
            }).call(this.dispatchEvent, ["animationEnd"])) : d.Tween.get(a).wait(o + t + p).call(function () {
                a.visible = !1
            }).call(this.dispatchEvent, ["animationEnd"])
        } : v.show = function () {
            var a = this;
            a.alpha = 0, a.visible = !0;
            var b = 0;
            "s" === a.size ? (b = j, a.scaleX = a.scaleY = h) : "m" === a.size && (b = k, a.scaleX = a.scaleY = i);
            var c = 3 * b;
            a.isTotal ? (a.alpha = 1, d.Tween.get(a).call(function () {
                a.getChildByName("total").alpha = 1
            }).to({scaleX: g, scaleY: g}, 0).to({
                scaleX: 1,
                scaleY: 1
            }, q, d.Ease.cubicIn).wait(r).to({alpha: 0}, p, d.Ease.cubicOut).call(function () {
                a.visible = !1
            }).call(this.dispatchEvent, ["animationEnd"])) : "l" === a.size ? (a.alpha = 1, d.Tween.get(a).to({
                scaleX: g,
                scaleY: g
            }, 0).call(function () {
                a.getChildByName("weakpoint").visible = !0
            }).to({
                scaleX: 1,
                scaleY: 1
            }, q, d.Ease.cubicIn).wait(s).to({alpha: 0}, p, d.Ease.cubicOut).call(function () {
                a.visible = !1
            }).call(this.dispatchEvent, ["animationEnd"])) : d.Tween.get(a).to({
                y: a.y + b,
                alpha: 1
            }, o).wait(t).to({y: a.y + c, alpha: 0}, p, d.Ease.cubicOut).call(function () {
                a.visible = !1
            }).call(this.dispatchEvent, ["animationEnd"])
        }, b
    }(), o = function () {
        function b(a, b) {
            this.initialize(a, b)
        }

        var c = 40, f = 13, g = 500, h = 500, i = b.prototype = new d.Container;
        return i.Container_initialize = i.initialize, i.initialize = function (a, b) {
            this.Container_initialize(), this.spriteSheet = a, this.alpha = 0, this.createSprite(b)
        }, i.createSprite = function (b) {
            var e, g = this;
            e = a.isArray(b) ? b : b.toString().split(""), a.each(e, function (a, b) {
                if ("-" !== a) {
                    var e = new d.Sprite(g.spriteSheet, "heal_" + a);
                    1 === parseInt(a, 10) ? e.x = c * b + f : e.x = c * b, g.addChild(e)
                }
            });
            var h = g.getBounds();
            g.regX = h.width / 2, g.regY = h.height / 2
        }, e ? i.show = function () {
            var a = this;
            a.alpha = 1, a.visible = !0, d.Tween.get(a).wait(g + h).call(function () {
                a.visible = !1
            }).call(this.dispatchEvent, ["animationEnd"])
        } : i.show = function () {
            var a = this;
            a.alpha = 1, a.visible = !0, d.Tween.get(a).wait(g).to({alpha: 0}, h).call(function () {
                a.visible = !1
            }).call(this.dispatchEvent, ["animationEnd"])
        }, b
    }(), p = function () {
        function b(a, b, c) {
            this.initialize(a, b, c)
        }

        var c = 75, f = 28, g = 52, h = 28, i = 40, j = 20, k = 15, l = 400, m = 800, n = 400, o = b.prototype = new d.Container;
        return o.Container_initialize = o.initialize, o.initialize = function (a, b, d) {
            this.Container_initialize(), this.spriteSheet = a, this.alpha = 0;
            var e, k, l = d.toString().split("");
            switch (b) {
                case"exp":
                    e = c, k = f;
                    break;
                case"rp":
                    e = g, k = h;
                    break;
                case"lupi":
                    e = i, k = j
            }
            this.createSprite(b, l, e, k)
        }, o.createSprite = function (b, c, e, f) {
            var g = this, h = new d.Sprite(g.spriteSheet, "prefix_" + b);
            h.y = "exp" === b || "rp" === b ? k : 0, g.addChild(h), a.each(c, function (a, c) {
                var h = new d.Sprite(g.spriteSheet, b + "_" + a);
                h.x = e + f * c, g.addChild(h)
            });
            var i = g.getBounds();
            g.regX = i.width / 2, g.regY = i.height / 2
        }, e ? o.show = function () {
            var a = this;
            a.alpha = 1, a.visible = !0, d.Tween.get(a).wait(l + m + n).call(function () {
                a.visible = !1
            }).call(this.dispatchEvent, ["animationEnd"])
        } : o.show = function () {
            var a = this;
            a.visible = !0, d.Tween.get(a).to({scaleX: .2, scaleY: .2, alpha: 1}, 0).to({
                scaleX: 1,
                scaleY: 1
            }, l, d.Ease.cubicIn).wait(m).to({alpha: 0}, n, d.Ease.cubicOut).call(function () {
                a.visible = !1
            }).call(this.dispatchEvent, ["animationEnd"])
        }, b
    }(), q = function () {
        function a(a) {
            this.initialize(a)
        }

        var b = 0, e = 193, g = -60, h = 1, i = 100, j = 300, k = 5, l = 50, m = 4, n = 3, o = 50, p = .7, q = 3, r = a.prototype = new d.Container;
        return r.Container_initialize = r.initialize, r.initialize = function (a) {
            this.isSmallSize = 2 === a ? !0 : !1, this.Container_initialize();
            var b = !0;
            this.createBG(b), this.icons = [], this.gIconPaths = [], this.removing = !1, this.adding = !1
        }, r.createBG = function (a) {
            var c = this, i = new d.Bitmap(f() + "raid/command/task_rail.png"), j = this.isSmallSize ? h * p : h;
            i.scaleX = j, i.scaleY = j, c.addChild(i), c.x = a ? g : b, c.y = e
        }, r.show = function () {
            var a = this;
            a.alpha = 1, a.visible = !0, a.removeAllChildren();
            var c = !0;
            a.createBG(c), d.Tween.get(a, {override: !0}).to({x: b}, i)
        }, r.hide = function () {
            var a = this;
            a.alpha = 1, a.visible = !0;
            for (var b in a.icons)a.removeChild(a.icons[b]);
            a.icons = [], a.gIconPaths = [], d.Tween.get(a).to({x: g}, i)
        }, r.updateIcon = function (a) {
            var b = this;
            if (!b.removing && !b.adding) {
                if (b.gIconPaths = a, 0 === b.gIconPaths.length || void 0 === b.gIconPaths)return void b.hide();
                b.removeAllChildren(), b.createBG();
                var c = r.preLoadImage(b.gIconPaths);
                c.done(function (a) {
                    b.icons = [];
                    for (var c = 0; k > c && c < a.length; c++) {
                        var d = b.createIcon(c, a[c]);
                        b.addChild(d), b.icons.push(d)
                    }
                }), c.fail(function () {
                })
            }
        }, r.addIcon = function (a, b) {
            var c = this;
            c.adding = !0, (0 === c.icons.length || void 0 === c.icons) && c.show(), c.gIconPaths.push(b[0]);
            var e = r.preLoadImage(b);
            e.done(function (a) {
                var b = c.createIcon(c.gIconPaths.length - 1, a[0]);
                b.x = g, c.addChild(b), c.icons.push(b), d.Tween.get(b).to({x: this.isSmallSize ? q : m}, i, d.Ease.cubicInOut).call(function () {
                    c.adding = !1, c.updateIcon(c.gIconPaths)
                })
            }), e.fail(function () {
            })
        }, r.removeIcon = function (a, b) {
            var c = this;
            c.gIconPaths = b, c.gIconPaths.splice(a, 1), c.removing = !0, d.Tween.get(c.icons[a]).to({alpha: 0}, j, d.Ease.cubicInOut).call(function () {
                c.removeChild(c.icons[a]), c.icons.splice(a, 1), c.removing = !1, c.updateIcon(c.gIconPaths)
            })
        }, r.preLoadImage = function (a) {
            for (var b = [], c = [], d = $.Deferred(), e = 0; k > e && e < a.length; e++) {
                var g = f() + "ui/icon/ability/m/" + a[e] + ".png", h = r.loadImage(g, e);
                h.done(function (a) {
                    b.push(a)
                }), c.push(h)
            }
            return $.when.apply(null, c).done(function () {
                d.resolve(b)
            }), $.when.apply(null, c).fail(function () {
                d.reject()
            }), d.promise()
        }, r.loadImage = function (a, b) {
            var c = $.Deferred(), d = new Image;
            return d.onload = function () {
                c.resolve(d)
            }, d.src = a, c.promise()
        }, r.createIcon = function (a, b) {
            var e = new d.Bitmap(b.src), f = this.isSmallSize ? l * p : l;
            e.scaleX = f / b.naturalWidth * c.cjsScale, e.scaleY = f / b.naturalHeight * c.cjsScale, e.x = this.isSmallSize ? q : m;
            var g = this.isSmallSize ? o * p : o;
            return e.y = n + g * a, e
        }, a
    }(), r = {
        utils: {getImagePath: f},
        components: {
            OverheadMessage: j,
            EnemyStatus: k,
            FieldCondition: l,
            AssistUnitCondition: m,
            Damage: n,
            Heal: o,
            EnemyReward: p,
            abilityRail: q
        }
    };
    return r
});