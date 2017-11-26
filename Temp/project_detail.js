define("module/common/load_file", function(require) {
        require("jquery");
        var a = require("module/common/dialog"),
            b = require("module/common/login");
        $('a[event="down_file"]').on("click", function() {
            $.post("/ajax/zjxm/get_file.html", "id=" + $(this).attr("zjxm_id") + "&save_name=" + $(this).attr("save_name"), function(c) {
                if (500 == c.code) return b.dialog(), void 0;
                if (200 == c.code) {
                    var d = $("<form>");
                    d.attr("style", "display:none"), d.attr("target", ""), d.attr("method", "get"), d.attr("action", c.data.url), $("body").append(d), d.submit()
                } else a.dialog_ok(c.error)
            }, "json")
        })
    }), define("component/scroll_bar", function(require) {
        var a = require("jquery");
        if (0 != a("#j-fixed-nav-all").length) {
            var b = 0;
            0 == a("#j-fixed-nav-all").position().top && (b = a("#j-fixed-nav-all").height()), a(window).scroll(function() {
                if (a(window).scrollTop() + 1 > a("#page").find(".j-ret").eq(0).position().top - b) {
                    var c = 0;
                    a(".j-ret").each(function() {
                        var d = a("#page").find(".j-ret").index(this);
                        a(window).scrollTop() + 1 > a("#page .j-ret").parent().children(".j-ret").eq(d).position().top - b && (0 == c && a("#j-fixed-nav-all").css("display", "block"), c++)
                    }), a("body").children().hasClass("j-sll-bar") && a(".j-sll-bar").hide(), a("#j-fixed-nav").children().eq(c - 1).addClass("cur").siblings().removeClass("cur")
                } else a("body").children().hasClass("j-sll-bar") && a(".j-sll-bar").show(), a("#j-fixed-nav-all").css("display", "none")
            }), a("#j-fixed-nav").children().click(function() {
                var c = a(this).parent().children().index(this);
                return a("body,html").animate({
                    scrollTop: a("#page .j-ret").parent().children(".j-ret").eq(c).position().top - b
                }, 300), !1
            })
        }
    }), define("component/lightbox/lightbox-2.6.min", function(require) {
        var a = require("jquery");
        ! function() {
            var b, c, d;
            b = a, d = function() {
                function a() {
                    this.fadeDuration = 500, this.fitImagesInViewport = !0, this.resizeDuration = 700, this.showImageNumberLabel = !0, this.wrapAround = !1
                }
                return a.prototype.albumLabel = function(a, b) {
                    return "Image " + a + " of " + b
                }, a
            }(), c = function() {
                function a(a) {
                    this.options = a, this.album = [], this.currentImageIndex = void 0, this.init()
                }
                return a.prototype.init = function() {
                    return this.enable(), this.build()
                }, a.prototype.enable = function() {
                    var a = this;
                    return b("body").on("click", "a[rel^=lightbox], area[rel^=lightbox], a[data-lightbox], area[data-lightbox]", function(c) {
                        return a.start(b(c.currentTarget)), !1
                    })
                }, a.prototype.build = function() {
                    var a = this;
                    return b("<div id='lightboxOverlay' class='lightboxOverlay'></div><div id='lightbox' class='lightbox'><div class='lb-outerContainer'><div class='lb-container'><img class='lb-image' src='' /><div class='lb-nav'><a class='lb-prev' href='' ></a><a class='lb-next' href='' ></a></div><div class='lb-loader'><a class='lb-cancel'></a></div></div></div><div class='lb-dataContainer'><div class='lb-data'><div class='lb-details'><span class='lb-caption'></span><span class='lb-number'></span></div><div class='lb-closeContainer'><a class='lb-close'></a></div></div></div></div>").appendTo(b("body")), this.$lightbox = b("#lightbox"), this.$overlay = b("#lightboxOverlay"), this.$outerContainer = this.$lightbox.find(".lb-outerContainer"), this.$container = this.$lightbox.find(".lb-container"), this.containerTopPadding = parseInt(this.$container.css("padding-top"), 10), this.containerRightPadding = parseInt(this.$container.css("padding-right"), 10), this.containerBottomPadding = parseInt(this.$container.css("padding-bottom"), 10), this.containerLeftPadding = parseInt(this.$container.css("padding-left"), 10), this.$overlay.hide().on("click", function() {
                        return a.end(), !1
                    }), this.$lightbox.hide().on("click", function(c) {
                        return "lightbox" === b(c.target).attr("id") && a.end(), !1
                    }), this.$outerContainer.on("click", function(c) {
                        return "lightbox" === b(c.target).attr("id") && a.end(), !1
                    }), this.$lightbox.find(".lb-prev").on("click", function() {
                        return 0 === a.currentImageIndex ? a.changeImage(a.album.length - 1) : a.changeImage(a.currentImageIndex - 1), !1
                    }), this.$lightbox.find(".lb-next").on("click", function() {
                        return a.currentImageIndex === a.album.length - 1 ? a.changeImage(0) : a.changeImage(a.currentImageIndex + 1), !1
                    }), this.$lightbox.find(".lb-loader, .lb-close").on("click", function() {
                        return a.end(), !1
                    })
                }, a.prototype.start = function(a) {
                    var c, d, e, f, g, h, i, j, k, l, m, n, o;
                    if (b(window).on("resize", this.sizeOverlay), b("select, object, embed").css({
                            visibility: "hidden"
                        }), this.$overlay.width(b(document).width()).height(b(document).height()).fadeIn(this.options.fadeDuration), this.album = [], g = 0, e = a.attr("data-lightbox"))
                        for (n = b(a.prop("tagName") + '[data-lightbox="' + e + '"]'), f = j = 0, l = n.length; l > j; f = ++j) d = n[f], this.album.push({
                            link: b(d).attr("href"),
                            title: b(d).attr("title")
                        }), b(d).attr("href") === a.attr("href") && (g = f);
                    else if ("lightbox" === a.attr("rel")) this.album.push({
                        link: a.attr("href"),
                        title: a.attr("title")
                    });
                    else
                        for (o = b(a.prop("tagName") + '[rel="' + a.attr("rel") + '"]'), f = k = 0, m = o.length; m > k; f = ++k) d = o[f], this.album.push({
                            link: b(d).attr("href"),
                            title: b(d).attr("title")
                        }), b(d).attr("href") === a.attr("href") && (g = f);
                    c = b(window), i = c.scrollTop() + c.height() / 10, h = c.scrollLeft(), this.$lightbox.css({
                        top: i + "px",
                        left: h + "px"
                    }).fadeIn(this.options.fadeDuration), this.changeImage(g)
                }, a.prototype.changeImage = function(a) {
                    var c, d, e = this;
                    this.disableKeyboardNav(), c = this.$lightbox.find(".lb-image"), this.sizeOverlay(), this.$overlay.fadeIn(this.options.fadeDuration), b(".lb-loader").fadeIn("slow"), this.$lightbox.find(".lb-image, .lb-nav, .lb-prev, .lb-next, .lb-dataContainer, .lb-numbers, .lb-caption").hide(), this.$outerContainer.addClass("animating"), d = new Image, d.onload = function() {
                        var f, g, h, i, j, k, l;
                        return c.attr("src", e.album[a].link), f = b(d), c.width(d.width), c.height(d.height), e.options.fitImagesInViewport && (l = b(window).width(), k = b(window).height(), j = l - e.containerLeftPadding - e.containerRightPadding - 20, i = k - e.containerTopPadding - e.containerBottomPadding - 110, (d.width > j || d.height > i) && (d.width / j > d.height / i ? (h = j, g = parseInt(d.height / (d.width / h), 10), c.width(h), c.height(g)) : (g = i, h = parseInt(d.width / (d.height / g), 10), c.width(h), c.height(g)))), e.sizeContainer(c.width(), c.height())
                    }, d.src = this.album[a].link, this.currentImageIndex = a
                }, a.prototype.sizeOverlay = function() {
                    return b("#lightboxOverlay").width(b(document).width()).height(b(document).height())
                }, a.prototype.sizeContainer = function(a, b) {
                    var c, d, e, f, g = this;
                    f = this.$outerContainer.outerWidth(), e = this.$outerContainer.outerHeight(), d = a + this.containerLeftPadding + this.containerRightPadding, c = b + this.containerTopPadding + this.containerBottomPadding, this.$outerContainer.animate({
                        width: d,
                        height: c
                    }, this.options.resizeDuration, "swing"), setTimeout(function() {
                        g.$lightbox.find(".lb-dataContainer").width(d), g.$lightbox.find(".lb-prevLink").height(c), g.$lightbox.find(".lb-nextLink").height(c), g.showImage()
                    }, this.options.resizeDuration)
                }, a.prototype.showImage = function() {
                    this.$lightbox.find(".lb-loader").hide(), this.$lightbox.find(".lb-image").fadeIn("slow"), this.updateNav(), this.updateDetails(), this.preloadNeighboringImages(), this.enableKeyboardNav()
                }, a.prototype.updateNav = function() {
                    this.$lightbox.find(".lb-nav").show(), this.album.length > 1 && (this.options.wrapAround ? this.$lightbox.find(".lb-prev, .lb-next").show() : (this.currentImageIndex > 0 && this.$lightbox.find(".lb-prev").show(), this.currentImageIndex < this.album.length - 1 && this.$lightbox.find(".lb-next").show()))
                }, a.prototype.updateDetails = function() {
                    var a = this;
                    "undefined" != typeof this.album[this.currentImageIndex].title && "" !== this.album[this.currentImageIndex].title && this.$lightbox.find(".lb-caption").html(this.album[this.currentImageIndex].title).fadeIn("fast"), this.album.length > 1 && this.options.showImageNumberLabel ? this.$lightbox.find(".lb-number").text(this.options.albumLabel(this.currentImageIndex + 1, this.album.length)).fadeIn("fast") : this.$lightbox.find(".lb-number").hide(), this.$outerContainer.removeClass("animating"), this.$lightbox.find(".lb-dataContainer").fadeIn(this.resizeDuration, function() {
                        return a.sizeOverlay()
                    })
                }, a.prototype.preloadNeighboringImages = function() {
                    var a, b;
                    this.album.length > this.currentImageIndex + 1 && (a = new Image, a.src = this.album[this.currentImageIndex + 1].link), this.currentImageIndex > 0 && (b = new Image, b.src = this.album[this.currentImageIndex - 1].link)
                }, a.prototype.enableKeyboardNav = function() {
                    b(document).on("keyup.keyboard", b.proxy(this.keyboardAction, this))
                }, a.prototype.disableKeyboardNav = function() {
                    b(document).off(".keyboard")
                }, a.prototype.keyboardAction = function(a) {
                    var b, c, d, e, f;
                    b = 27, c = 37, d = 39, f = a.keyCode, e = String.fromCharCode(f).toLowerCase(), f === b || e.match(/x|o|c/) ? this.end() : "p" === e || f === c ? 0 !== this.currentImageIndex && this.changeImage(this.currentImageIndex - 1) : ("n" === e || f === d) && this.currentImageIndex !== this.album.length - 1 && this.changeImage(this.currentImageIndex + 1)
                }, a.prototype.end = function() {
                    return this.disableKeyboardNav(), b(window).off("resize", this.sizeOverlay), this.$lightbox.fadeOut(this.options.fadeDuration), this.$overlay.fadeOut(this.options.fadeDuration), b("select, object, embed").css({
                        visibility: "visible"
                    })
                }, a
            }(), b(function() {
                var a, b;
                return b = new d, a = new c(b)
            })
        }.call(this)
    }), define("component/Scrollbar/jquery.mCustomScrollbar.concat.min", function(require) {
        require("jquery"), ! function(a) {
            "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
        }(function(a) {
            function b(b) {
                var g = b || window.event,
                    h = i.call(arguments, 1),
                    j = 0,
                    l = 0,
                    m = 0,
                    n = 0,
                    o = 0,
                    p = 0;
                if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
                    if (1 === g.deltaMode) {
                        var q = a.data(this, "mousewheel-line-height");
                        j *= q, m *= q, l *= q
                    } else if (2 === g.deltaMode) {
                        var r = a.data(this, "mousewheel-page-height");
                        j *= r, m *= r, l *= r
                    }
                    if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
                        var s = this.getBoundingClientRect();
                        o = b.clientX - s.left, p = b.clientY - s.top
                    }
                    return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h)
                }
            }

            function c() {
                f = null
            }

            function d(a, b) {
                return k.settings.adjustOldDeltas && "mousewheel" === a.type && 0 === b % 120
            }
            var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
                h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
                i = Array.prototype.slice;
            if (a.event.fixHooks)
                for (var j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
            var k = a.event.special.mousewheel = {
                version: "3.1.12",
                setup: function() {
                    if (this.addEventListener)
                        for (var c = h.length; c;) this.addEventListener(h[--c], b, !1);
                    else this.onmousewheel = b;
                    a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this))
                },
                teardown: function() {
                    if (this.removeEventListener)
                        for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1);
                    else this.onmousewheel = null;
                    a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height")
                },
                getLineHeight: function(b) {
                    var c = a(b),
                        d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
                    return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
                },
                getPageHeight: function(b) {
                    return a(b).height()
                },
                settings: {
                    adjustOldDeltas: !0,
                    normalizeOffset: !0
                }
            };
            a.fn.extend({
                mousewheel: function(a) {
                    return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
                },
                unmousewheel: function(a) {
                    return this.unbind("mousewheel", a)
                }
            })
        }), ! function(a) {
            "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
        }(function(a) {
            function b(b) {
                var g = b || window.event,
                    h = i.call(arguments, 1),
                    j = 0,
                    l = 0,
                    m = 0,
                    n = 0,
                    o = 0,
                    p = 0;
                if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
                    if (1 === g.deltaMode) {
                        var q = a.data(this, "mousewheel-line-height");
                        j *= q, m *= q, l *= q
                    } else if (2 === g.deltaMode) {
                        var r = a.data(this, "mousewheel-page-height");
                        j *= r, m *= r, l *= r
                    }
                    if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
                        var s = this.getBoundingClientRect();
                        o = b.clientX - s.left, p = b.clientY - s.top
                    }
                    return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h)
                }
            }

            function c() {
                f = null
            }

            function d(a, b) {
                return k.settings.adjustOldDeltas && "mousewheel" === a.type && 0 === b % 120
            }
            var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
                h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
                i = Array.prototype.slice;
            if (a.event.fixHooks)
                for (var j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
            var k = a.event.special.mousewheel = {
                version: "3.1.12",
                setup: function() {
                    if (this.addEventListener)
                        for (var c = h.length; c;) this.addEventListener(h[--c], b, !1);
                    else this.onmousewheel = b;
                    a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this))
                },
                teardown: function() {
                    if (this.removeEventListener)
                        for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1);
                    else this.onmousewheel = null;
                    a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height")
                },
                getLineHeight: function(b) {
                    var c = a(b),
                        d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
                    return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
                },
                getPageHeight: function(b) {
                    return a(b).height()
                },
                settings: {
                    adjustOldDeltas: !0,
                    normalizeOffset: !0
                }
            };
            a.fn.extend({
                mousewheel: function(a) {
                    return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
                },
                unmousewheel: function(a) {
                    return this.unbind("mousewheel", a)
                }
            })
        }), ! function(a) {
            "undefined" != typeof module && module.exports ? module.exports = a : a(jQuery, window, document)
        }(function(a) {
            ! function(b) {
                var c = "function" == typeof define && define.amd,
                    d = "undefined" != typeof module && module.exports,
                    e = "https:" == document.location.protocol ? "https:" : "http:",
                    f = "cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";
                c || (d ? require("jquery-mousewheel")(a) : a.event.special.mousewheel || a("head").append(decodeURI("%3Cscript src=" + e + "//" + f + "%3E%3C/script%3E"))), b()
            }(function() {
                var b, c = "mCustomScrollbar",
                    d = "mCS",
                    e = ".mCustomScrollbar",
                    f = {
                        setTop: 0,
                        setLeft: 0,
                        axis: "y",
                        scrollbarPosition: "inside",
                        scrollInertia: 950,
                        autoDraggerLength: !0,
                        alwaysShowScrollbar: 0,
                        snapOffset: 0,
                        mouseWheel: {
                            enable: !0,
                            scrollAmount: "auto",
                            axis: "y",
                            deltaFactor: "auto",
                            disableOver: ["select", "option", "keygen", "datalist", "textarea"]
                        },
                        scrollButtons: {
                            scrollType: "stepless",
                            scrollAmount: "auto"
                        },
                        keyboard: {
                            enable: !0,
                            scrollType: "stepless",
                            scrollAmount: "auto"
                        },
                        contentTouchScroll: 25,
                        documentTouchScroll: !0,
                        advanced: {
                            autoScrollOnFocus: "input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
                            updateOnContentResize: !0,
                            updateOnImageLoad: "auto",
                            autoUpdateTimeout: 60
                        },
                        theme: "light",
                        callbacks: {
                            onTotalScrollOffset: 0,
                            onTotalScrollBackOffset: 0,
                            alwaysTriggerOffsets: !0
                        }
                    },
                    g = 0,
                    h = {},
                    i = window.attachEvent && !window.addEventListener ? 1 : 0,
                    j = !1,
                    k = ["mCSB_dragger_onDrag", "mCSB_scrollTools_onDrag", "mCS_img_loaded", "mCS_disabled", "mCS_destroyed", "mCS_no_scrollbar", "mCS-autoHide", "mCS-dir-rtl", "mCS_no_scrollbar_y", "mCS_no_scrollbar_x", "mCS_y_hidden", "mCS_x_hidden", "mCSB_draggerContainer", "mCSB_buttonUp", "mCSB_buttonDown", "mCSB_buttonLeft", "mCSB_buttonRight"],
                    l = {
                        init: function(b) {
                            var b = a.extend(!0, {}, f, b),
                                c = m.call(this);
                            if (b.live) {
                                var i = b.liveSelector || this.selector || e,
                                    j = a(i);
                                if ("off" === b.live) return void o(i);
                                h[i] = setTimeout(function() {
                                    j.mCustomScrollbar(b), "once" === b.live && j.length && o(i)
                                }, 500)
                            } else o(i);
                            return b.setWidth = b.set_width ? b.set_width : b.setWidth, b.setHeight = b.set_height ? b.set_height : b.setHeight, b.axis = b.horizontalScroll ? "x" : p(b.axis), b.scrollInertia = b.scrollInertia > 0 && b.scrollInertia < 17 ? 17 : b.scrollInertia, "object" != typeof b.mouseWheel && 1 == b.mouseWheel && (b.mouseWheel = {
                                enable: !0,
                                scrollAmount: "auto",
                                axis: "y",
                                preventDefault: !1,
                                deltaFactor: "auto",
                                normalizeDelta: !1,
                                invert: !1
                            }), b.mouseWheel.scrollAmount = b.mouseWheelPixels ? b.mouseWheelPixels : b.mouseWheel.scrollAmount, b.mouseWheel.normalizeDelta = b.advanced.normalizeMouseWheelDelta ? b.advanced.normalizeMouseWheelDelta : b.mouseWheel.normalizeDelta, b.scrollButtons.scrollType = q(b.scrollButtons.scrollType), n(b), a(c).each(function() {
                                var c = a(this);
                                if (!c.data(d)) {
                                    c.data(d, {
                                        idx: ++g,
                                        opt: b,
                                        scrollRatio: {
                                            y: null,
                                            x: null
                                        },
                                        overflowed: null,
                                        contentReset: {
                                            y: null,
                                            x: null
                                        },
                                        bindEvents: !1,
                                        tweenRunning: !1,
                                        sequential: {},
                                        langDir: c.css("direction"),
                                        cbOffsets: null,
                                        trigger: null,
                                        poll: {
                                            size: {
                                                o: 0,
                                                n: 0
                                            },
                                            img: {
                                                o: 0,
                                                n: 0
                                            },
                                            change: {
                                                o: 0,
                                                n: 0
                                            }
                                        }
                                    });
                                    var e = c.data(d),
                                        f = e.opt,
                                        h = c.data("mcs-axis"),
                                        i = c.data("mcs-scrollbar-position"),
                                        j = c.data("mcs-theme");
                                    h && (f.axis = h), i && (f.scrollbarPosition = i), j && (f.theme = j, n(f)), r.call(this), e && f.callbacks.onCreate && "function" == typeof f.callbacks.onCreate && f.callbacks.onCreate.call(this), a("#mCSB_" + e.idx + "_container img:not(." + k[2] + ")").addClass(k[2]), l.update.call(null, c)
                                }
                            })
                        },
                        update: function(b, c) {
                            var e = b || m.call(this);
                            return a(e).each(function() {
                                var b = a(this);
                                if (b.data(d)) {
                                    var e = b.data(d),
                                        f = e.opt,
                                        g = a("#mCSB_" + e.idx + "_container"),
                                        h = a("#mCSB_" + e.idx),
                                        i = [a("#mCSB_" + e.idx + "_dragger_vertical"), a("#mCSB_" + e.idx + "_dragger_horizontal")];
                                    if (!g.length) return;
                                    e.tweenRunning && U(b), c && e && f.callbacks.onBeforeUpdate && "function" == typeof f.callbacks.onBeforeUpdate && f.callbacks.onBeforeUpdate.call(this), b.hasClass(k[3]) && b.removeClass(k[3]), b.hasClass(k[4]) && b.removeClass(k[4]), h.css("max-height", "none"), h.height() !== b.height() && h.css("max-height", b.height()), t.call(this), "y" === f.axis || f.advanced.autoExpandHorizontalScroll || g.css("width", s(g)), e.overflowed = y.call(this), C.call(this), f.autoDraggerLength && v.call(this), w.call(this), A.call(this);
                                    var j = [Math.abs(g[0].offsetTop), Math.abs(g[0].offsetLeft)];
                                    "x" !== f.axis && (e.overflowed[0] ? i[0].height() > i[0].parent().height() ? z.call(this) : (V(b, j[0].toString(), {
                                        dir: "y",
                                        dur: 0,
                                        overwrite: "none"
                                    }), e.contentReset.y = null) : (z.call(this), "y" === f.axis ? B.call(this) : "yx" === f.axis && e.overflowed[1] && V(b, j[1].toString(), {
                                        dir: "x",
                                        dur: 0,
                                        overwrite: "none"
                                    }))), "y" !== f.axis && (e.overflowed[1] ? i[1].width() > i[1].parent().width() ? z.call(this) : (V(b, j[1].toString(), {
                                        dir: "x",
                                        dur: 0,
                                        overwrite: "none"
                                    }), e.contentReset.x = null) : (z.call(this), "x" === f.axis ? B.call(this) : "yx" === f.axis && e.overflowed[0] && V(b, j[0].toString(), {
                                        dir: "y",
                                        dur: 0,
                                        overwrite: "none"
                                    }))), c && e && (2 === c && f.callbacks.onImageLoad && "function" == typeof f.callbacks.onImageLoad ? f.callbacks.onImageLoad.call(this) : 3 === c && f.callbacks.onSelectorChange && "function" == typeof f.callbacks.onSelectorChange ? f.callbacks.onSelectorChange.call(this) : f.callbacks.onUpdate && "function" == typeof f.callbacks.onUpdate && f.callbacks.onUpdate.call(this)), S.call(this)
                                }
                            })
                        },
                        scrollTo: function(b, c) {
                            if ("undefined" != typeof b && null != b) {
                                var e = m.call(this);
                                return a(e).each(function() {
                                    var e = a(this);
                                    if (e.data(d)) {
                                        var f = e.data(d),
                                            g = f.opt,
                                            h = {
                                                trigger: "external",
                                                scrollInertia: g.scrollInertia,
                                                scrollEasing: "mcsEaseInOut",
                                                moveDragger: !1,
                                                timeout: 60,
                                                callbacks: !0,
                                                onStart: !0,
                                                onUpdate: !0,
                                                onComplete: !0
                                            },
                                            i = a.extend(!0, {}, h, c),
                                            j = Q.call(this, b),
                                            k = i.scrollInertia > 0 && i.scrollInertia < 17 ? 17 : i.scrollInertia;
                                        j[0] = R.call(this, j[0], "y"), j[1] = R.call(this, j[1], "x"), i.moveDragger && (j[0] *= f.scrollRatio.y, j[1] *= f.scrollRatio.x), i.dur = cb() ? 0 : k, setTimeout(function() {
                                            null !== j[0] && "undefined" != typeof j[0] && "x" !== g.axis && f.overflowed[0] && (i.dir = "y", i.overwrite = "all", V(e, j[0].toString(), i)), null !== j[1] && "undefined" != typeof j[1] && "y" !== g.axis && f.overflowed[1] && (i.dir = "x", i.overwrite = "none", V(e, j[1].toString(), i))
                                        }, i.timeout)
                                    }
                                })
                            }
                        },
                        stop: function() {
                            var b = m.call(this);
                            return a(b).each(function() {
                                var b = a(this);
                                b.data(d) && U(b)
                            })
                        },
                        disable: function(b) {
                            var c = m.call(this);
                            return a(c).each(function() {
                                var c = a(this);
                                c.data(d) && (c.data(d), S.call(this, "remove"), B.call(this), b && z.call(this), C.call(this, !0), c.addClass(k[3]))
                            })
                        },
                        destroy: function() {
                            var b = m.call(this);
                            return a(b).each(function() {
                                var e = a(this);
                                if (e.data(d)) {
                                    var f = e.data(d),
                                        g = f.opt,
                                        h = a("#mCSB_" + f.idx),
                                        i = a("#mCSB_" + f.idx + "_container"),
                                        j = a(".mCSB_" + f.idx + "_scrollbar");
                                    g.live && o(g.liveSelector || a(b).selector), S.call(this, "remove"), B.call(this), z.call(this), e.removeData(d), Z(this, "mcs"), j.remove(), i.find("img." + k[2]).removeClass(k[2]), h.replaceWith(i.contents()), e.removeClass(c + " _" + d + "_" + f.idx + " " + k[6] + " " + k[7] + " " + k[5] + " " + k[3]).addClass(k[4])
                                }
                            })
                        }
                    },
                    m = function() {
                        return "object" != typeof a(this) || a(this).length < 1 ? e : this
                    },
                    n = function(b) {
                        var c = ["rounded", "rounded-dark", "rounded-dots", "rounded-dots-dark"],
                            d = ["rounded-dots", "rounded-dots-dark", "3d", "3d-dark", "3d-thick", "3d-thick-dark", "inset", "inset-dark", "inset-2", "inset-2-dark", "inset-3", "inset-3-dark"],
                            e = ["minimal", "minimal-dark"],
                            f = ["minimal", "minimal-dark"],
                            g = ["minimal", "minimal-dark"];
                        b.autoDraggerLength = a.inArray(b.theme, c) > -1 ? !1 : b.autoDraggerLength, b.autoExpandScrollbar = a.inArray(b.theme, d) > -1 ? !1 : b.autoExpandScrollbar, b.scrollButtons.enable = a.inArray(b.theme, e) > -1 ? !1 : b.scrollButtons.enable, b.autoHideScrollbar = a.inArray(b.theme, f) > -1 ? !0 : b.autoHideScrollbar, b.scrollbarPosition = a.inArray(b.theme, g) > -1 ? "outside" : b.scrollbarPosition
                    },
                    o = function(a) {
                        h[a] && (clearTimeout(h[a]), Z(h, a))
                    },
                    p = function(a) {
                        return "yx" === a || "xy" === a || "auto" === a ? "yx" : "x" === a || "horizontal" === a ? "x" : "y"
                    },
                    q = function(a) {
                        return "stepped" === a || "pixels" === a || "step" === a || "click" === a ? "stepped" : "stepless"
                    },
                    r = function() {
                        var b = a(this),
                            e = b.data(d),
                            f = e.opt,
                            g = f.autoExpandScrollbar ? " " + k[1] + "_expand" : "",
                            h = ["<div id='mCSB_" + e.idx + "_scrollbar_vertical' class='mCSB_scrollTools mCSB_" + e.idx + "_scrollbar mCS-" + f.theme + " mCSB_scrollTools_vertical" + g + "'><div class='" + k[12] + "'><div id='mCSB_" + e.idx + "_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>", "<div id='mCSB_" + e.idx + "_scrollbar_horizontal' class='mCSB_scrollTools mCSB_" + e.idx + "_scrollbar mCS-" + f.theme + " mCSB_scrollTools_horizontal" + g + "'><div class='" + k[12] + "'><div id='mCSB_" + e.idx + "_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
                            i = "yx" === f.axis ? "mCSB_vertical_horizontal" : "x" === f.axis ? "mCSB_horizontal" : "mCSB_vertical",
                            j = "yx" === f.axis ? h[0] + h[1] : "x" === f.axis ? h[1] : h[0],
                            l = "yx" === f.axis ? "<div id='mCSB_" + e.idx + "_container_wrapper' class='mCSB_container_wrapper' />" : "",
                            m = f.autoHideScrollbar ? " " + k[6] : "",
                            n = "x" !== f.axis && "rtl" === e.langDir ? " " + k[7] : "";
                        f.setWidth && b.css("width", f.setWidth), f.setHeight && b.css("height", f.setHeight), f.setLeft = "y" !== f.axis && "rtl" === e.langDir ? "989999px" : f.setLeft, b.addClass(c + " _" + d + "_" + e.idx + m + n).wrapInner("<div id='mCSB_" + e.idx + "' class='mCustomScrollBox mCS-" + f.theme + " " + i + "'><div id='mCSB_" + e.idx + "_container' class='mCSB_container' style='position:relative; top:" + f.setTop + "; left:" + f.setLeft + ";' dir=" + e.langDir + " /></div>");
                        var o = a("#mCSB_" + e.idx),
                            p = a("#mCSB_" + e.idx + "_container");
                        "y" === f.axis || f.advanced.autoExpandHorizontalScroll || p.css("width", s(p)), "outside" === f.scrollbarPosition ? ("static" === b.css("position") && b.css("position", "relative"), b.css("overflow", "visible"), o.addClass("mCSB_outside").after(j)) : (o.addClass("mCSB_inside").append(j), p.wrap(l)), u.call(this);
                        var q = [a("#mCSB_" + e.idx + "_dragger_vertical"), a("#mCSB_" + e.idx + "_dragger_horizontal")];
                        q[0].css("min-height", q[0].height()), q[1].css("min-width", q[1].width())
                    },
                    s = function(b) {
                        var c = [b[0].scrollWidth, Math.max.apply(Math, b.children().map(function() {
                                return a(this).outerWidth(!0)
                            }).get())],
                            d = b.parent().width();
                        return c[0] > d ? c[0] : c[1] > d ? c[1] : "100%"
                    },
                    t = function() {
                        var b = a(this),
                            c = b.data(d),
                            e = c.opt,
                            f = a("#mCSB_" + c.idx + "_container");
                        if (e.advanced.autoExpandHorizontalScroll && "y" !== e.axis) {
                            f.css({
                                width: "auto",
                                "min-width": 0,
                                "overflow-x": "scroll"
                            });
                            var g = Math.ceil(f[0].scrollWidth);
                            3 === e.advanced.autoExpandHorizontalScroll || 2 !== e.advanced.autoExpandHorizontalScroll && g > f.parent().width() ? f.css({
                                width: g,
                                "min-width": "100%",
                                "overflow-x": "inherit"
                            }) : f.css({
                                "overflow-x": "inherit",
                                position: "absolute"
                            }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                                width: Math.ceil(f[0].getBoundingClientRect().right + .4) - Math.floor(f[0].getBoundingClientRect().left),
                                "min-width": "100%",
                                position: "relative"
                            }).unwrap()
                        }
                    },
                    u = function() {
                        var b = a(this),
                            c = b.data(d),
                            e = c.opt,
                            f = a(".mCSB_" + c.idx + "_scrollbar:first"),
                            g = ab(e.scrollButtons.tabindex) ? "tabindex='" + e.scrollButtons.tabindex + "'" : "",
                            h = ["<a href='#' class='" + k[13] + "' oncontextmenu='return false;' " + g + " />", "<a href='#' class='" + k[14] + "' oncontextmenu='return false;' " + g + " />", "<a href='#' class='" + k[15] + "' oncontextmenu='return false;' " + g + " />", "<a href='#' class='" + k[16] + "' oncontextmenu='return false;' " + g + " />"],
                            i = ["x" === e.axis ? h[2] : h[0], "x" === e.axis ? h[3] : h[1], h[2], h[3]];
                        e.scrollButtons.enable && f.prepend(i[0]).append(i[1]).next(".mCSB_scrollTools").prepend(i[2]).append(i[3])
                    },
                    v = function() {
                        var b = a(this),
                            c = b.data(d),
                            e = a("#mCSB_" + c.idx),
                            f = a("#mCSB_" + c.idx + "_container"),
                            g = [a("#mCSB_" + c.idx + "_dragger_vertical"), a("#mCSB_" + c.idx + "_dragger_horizontal")],
                            h = [e.height() / f.outerHeight(!1), e.width() / f.outerWidth(!1)],
                            j = [parseInt(g[0].css("min-height")), Math.round(h[0] * g[0].parent().height()), parseInt(g[1].css("min-width")), Math.round(h[1] * g[1].parent().width())],
                            k = i && j[1] < j[0] ? j[0] : j[1],
                            l = i && j[3] < j[2] ? j[2] : j[3];
                        g[0].css({
                            height: k,
                            "max-height": g[0].parent().height() - 10
                        }).find(".mCSB_dragger_bar").css({
                            "line-height": j[0] + "px"
                        }), g[1].css({
                            width: l,
                            "max-width": g[1].parent().width() - 10
                        })
                    },
                    w = function() {
                        var b = a(this),
                            c = b.data(d),
                            e = a("#mCSB_" + c.idx),
                            f = a("#mCSB_" + c.idx + "_container"),
                            g = [a("#mCSB_" + c.idx + "_dragger_vertical"), a("#mCSB_" + c.idx + "_dragger_horizontal")],
                            h = [f.outerHeight(!1) - e.height(), f.outerWidth(!1) - e.width()],
                            i = [h[0] / (g[0].parent().height() - g[0].height()), h[1] / (g[1].parent().width() - g[1].width())];
                        c.scrollRatio = {
                            y: i[0],
                            x: i[1]
                        }
                    },
                    x = function(a, b, c) {
                        var d = c ? k[0] + "_expanded" : "",
                            e = a.closest(".mCSB_scrollTools");
                        "active" === b ? (a.toggleClass(k[0] + " " + d), e.toggleClass(k[1]), a[0]._draggable = a[0]._draggable ? 0 : 1) : a[0]._draggable || ("hide" === b ? (a.removeClass(k[0]), e.removeClass(k[1])) : (a.addClass(k[0]), e.addClass(k[1])))
                    },
                    y = function() {
                        var b = a(this),
                            c = b.data(d),
                            e = a("#mCSB_" + c.idx),
                            f = a("#mCSB_" + c.idx + "_container"),
                            g = null == c.overflowed ? f.height() : f.outerHeight(!1),
                            h = null == c.overflowed ? f.width() : f.outerWidth(!1),
                            i = f[0].scrollHeight,
                            j = f[0].scrollWidth;
                        return i > g && (g = i), j > h && (h = j), [g > e.height(), h > e.width()]
                    },
                    z = function() {
                        var b = a(this),
                            c = b.data(d),
                            e = c.opt,
                            f = a("#mCSB_" + c.idx),
                            g = a("#mCSB_" + c.idx + "_container"),
                            h = [a("#mCSB_" + c.idx + "_dragger_vertical"), a("#mCSB_" + c.idx + "_dragger_horizontal")];
                        if (U(b), ("x" !== e.axis && !c.overflowed[0] || "y" === e.axis && c.overflowed[0]) && (h[0].add(g).css("top", 0), V(b, "_resetY")), "y" !== e.axis && !c.overflowed[1] || "x" === e.axis && c.overflowed[1]) {
                            var i = dx = 0;
                            "rtl" === c.langDir && (i = f.width() - g.outerWidth(!1), dx = Math.abs(i / c.scrollRatio.x)), g.css("left", i), h[1].css("left", dx), V(b, "_resetX")
                        }
                    },
                    A = function() {
                        function b() {
                            g = setTimeout(function() {
                                a.event.special.mousewheel ? (clearTimeout(g), H.call(c[0])) : b()
                            }, 100)
                        }
                        var c = a(this),
                            e = c.data(d),
                            f = e.opt;
                        if (!e.bindEvents) {
                            if (E.call(this), f.contentTouchScroll && F.call(this), G.call(this), f.mouseWheel.enable) {
                                var g;
                                b()
                            }
                            K.call(this), M.call(this), f.advanced.autoScrollOnFocus && L.call(this), f.scrollButtons.enable && N.call(this), f.keyboard.enable && O.call(this), e.bindEvents = !0
                        }
                    },
                    B = function() {
                        var b = a(this),
                            c = b.data(d),
                            e = c.opt,
                            f = d + "_" + c.idx,
                            g = ".mCSB_" + c.idx + "_scrollbar",
                            h = a("#mCSB_" + c.idx + ",#mCSB_" + c.idx + "_container,#mCSB_" + c.idx + "_container_wrapper," + g + " ." + k[12] + ",#mCSB_" + c.idx + "_dragger_vertical,#mCSB_" + c.idx + "_dragger_horizontal," + g + ">a"),
                            i = a("#mCSB_" + c.idx + "_container");
                        e.advanced.releaseDraggableSelectors && h.add(a(e.advanced.releaseDraggableSelectors)), e.advanced.extraDraggableSelectors && h.add(a(e.advanced.extraDraggableSelectors)), c.bindEvents && (a(document).add(a(!I() || top.document)).unbind("." + f), h.each(function() {
                            a(this).unbind("." + f)
                        }), clearTimeout(b[0]._focusTimeout), Z(b[0], "_focusTimeout"), clearTimeout(c.sequential.step), Z(c.sequential, "step"), clearTimeout(i[0].onCompleteTimeout), Z(i[0], "onCompleteTimeout"), c.bindEvents = !1)
                    },
                    C = function(b) {
                        var c = a(this),
                            e = c.data(d),
                            f = e.opt,
                            g = a("#mCSB_" + e.idx + "_container_wrapper"),
                            h = g.length ? g : a("#mCSB_" + e.idx + "_container"),
                            i = [a("#mCSB_" + e.idx + "_scrollbar_vertical"), a("#mCSB_" + e.idx + "_scrollbar_horizontal")],
                            j = [i[0].find(".mCSB_dragger"), i[1].find(".mCSB_dragger")];
                        "x" !== f.axis && (e.overflowed[0] && !b ? (i[0].add(j[0]).add(i[0].children("a")).css("display", "block"), h.removeClass(k[8] + " " + k[10])) : (f.alwaysShowScrollbar ? (2 !== f.alwaysShowScrollbar && j[0].css("display", "none"), h.removeClass(k[10])) : (i[0].css("display", "none"), h.addClass(k[10])), h.addClass(k[8]))), "y" !== f.axis && (e.overflowed[1] && !b ? (i[1].add(j[1]).add(i[1].children("a")).css("display", "block"), h.removeClass(k[9] + " " + k[11])) : (f.alwaysShowScrollbar ? (2 !== f.alwaysShowScrollbar && j[1].css("display", "none"), h.removeClass(k[11])) : (i[1].css("display", "none"), h.addClass(k[11])), h.addClass(k[9]))), e.overflowed[0] || e.overflowed[1] ? c.removeClass(k[5]) : c.addClass(k[5])
                    },
                    D = function(b) {
                        var c = b.type,
                            d = b.target.ownerDocument !== document ? [a(frameElement).offset().top, a(frameElement).offset().left] : null,
                            e = I() && b.target.ownerDocument !== top.document ? [a(b.view.frameElement).offset().top, a(b.view.frameElement).offset().left] : [0, 0];
                        switch (c) {
                            case "pointerdown":
                            case "MSPointerDown":
                            case "pointermove":
                            case "MSPointerMove":
                            case "pointerup":
                            case "MSPointerUp":
                                return d ? [b.originalEvent.pageY - d[0] + e[0], b.originalEvent.pageX - d[1] + e[1], !1] : [b.originalEvent.pageY, b.originalEvent.pageX, !1];
                            case "touchstart":
                            case "touchmove":
                            case "touchend":
                                var f = b.originalEvent.touches[0] || b.originalEvent.changedTouches[0],
                                    g = b.originalEvent.touches.length || b.originalEvent.changedTouches.length;
                                return b.target.ownerDocument !== document ? [f.screenY, f.screenX, g > 1] : [f.pageY, f.pageX, g > 1];
                            default:
                                return d ? [b.pageY - d[0] + e[0], b.pageX - d[1] + e[1], !1] : [b.pageY, b.pageX, !1]
                        }
                    },
                    E = function() {
                        function b(a) {
                            var b = o.find("iframe");
                            if (b.length) {
                                var c = a ? "auto" : "none";
                                b.css("pointer-events", c)
                            }
                        }

                        function c(a, b, c, d) {
                            if (o[0].idleTimer = l.scrollInertia < 233 ? 250 : 0, e.attr("id") === n[1]) var f = "x",
                                g = (e[0].offsetLeft - b + d) * k.scrollRatio.x;
                            else var f = "y",
                                g = (e[0].offsetTop - a + c) * k.scrollRatio.y;
                            V(h, g.toString(), {
                                dir: f,
                                drag: !0
                            })
                        }
                        var e, f, g, h = a(this),
                            k = h.data(d),
                            l = k.opt,
                            m = d + "_" + k.idx,
                            n = ["mCSB_" + k.idx + "_dragger_vertical", "mCSB_" + k.idx + "_dragger_horizontal"],
                            o = a("#mCSB_" + k.idx + "_container"),
                            p = a("#" + n[0] + ",#" + n[1]),
                            q = l.advanced.releaseDraggableSelectors ? p.add(a(l.advanced.releaseDraggableSelectors)) : p,
                            r = l.advanced.extraDraggableSelectors ? a(!I() || top.document).add(a(l.advanced.extraDraggableSelectors)) : a(!I() || top.document);
                        p.bind("mousedown." + m + " touchstart." + m + " pointerdown." + m + " MSPointerDown." + m, function(c) {
                            if (c.stopImmediatePropagation(), c.preventDefault(), $(c)) {
                                j = !0, i && (document.onselectstart = function() {
                                    return !1
                                }), b(!1), U(h), e = a(this);
                                var d = e.offset(),
                                    k = D(c)[0] - d.top,
                                    m = D(c)[1] - d.left,
                                    n = e.height() + d.top,
                                    o = e.width() + d.left;
                                n > k && k > 0 && o > m && m > 0 && (f = k, g = m), x(e, "active", l.autoExpandScrollbar)
                            }
                        }).bind("touchmove." + m, function(a) {
                            a.stopImmediatePropagation(), a.preventDefault();
                            var b = e.offset(),
                                d = D(a)[0] - b.top,
                                h = D(a)[1] - b.left;
                            c(f, g, d, h)
                        }), a(document).add(r).bind("mousemove." + m + " pointermove." + m + " MSPointerMove." + m, function(a) {
                            if (e) {
                                var b = e.offset(),
                                    d = D(a)[0] - b.top,
                                    h = D(a)[1] - b.left;
                                if (f === d && g === h) return;
                                c(f, g, d, h)
                            }
                        }).add(q).bind("mouseup." + m + " touchend." + m + " pointerup." + m + " MSPointerUp." + m, function() {
                            e && (x(e, "active", l.autoExpandScrollbar), e = null), j = !1, i && (document.onselectstart = null), b(!0)
                        })
                    },
                    F = function() {
                        function c(a) {
                            if (!_(a) || j || D(a)[2]) return void(b = 0);
                            b = 1, w = 0, x = 0, k = 1, y.removeClass("mCS_touch_action");
                            var c = E.offset();
                            l = D(a)[0] - c.top, m = D(a)[1] - c.left, L = [D(a)[0], D(a)[1]]
                        }

                        function e(a) {
                            if (_(a) && !j && !D(a)[2] && (A.documentTouchScroll || a.preventDefault(), a.stopImmediatePropagation(), (!x || w) && k)) {
                                q = X();
                                var b = C.offset(),
                                    c = D(a)[0] - b.top,
                                    d = D(a)[1] - b.left,
                                    e = "mcsLinearOut";
                                if (G.push(c), H.push(d), L[2] = Math.abs(D(a)[0] - L[0]), L[3] = Math.abs(D(a)[1] - L[1]), z.overflowed[0]) var f = F[0].parent().height() - F[0].height(),
                                    g = l - c > 0 && c - l > -(f * z.scrollRatio.y) && (2 * L[3] < L[2] || "yx" === A.axis);
                                if (z.overflowed[1]) var h = F[1].parent().width() - F[1].width(),
                                    n = m - d > 0 && d - m > -(h * z.scrollRatio.x) && (2 * L[2] < L[3] || "yx" === A.axis);
                                g || n ? (O || a.preventDefault(), w = 1) : (x = 1, y.addClass("mCS_touch_action")), O && a.preventDefault(), u = "yx" === A.axis ? [l - c, m - d] : "x" === A.axis ? [null, m - d] : [l - c, null], E[0].idleTimer = 250, z.overflowed[0] && i(u[0], J, e, "y", "all", !0), z.overflowed[1] && i(u[1], J, e, "x", K, !0)
                            }
                        }

                        function f(a) {
                            if (!_(a) || j || D(a)[2]) return void(b = 0);
                            b = 1, a.stopImmediatePropagation(), U(y), p = X();
                            var c = C.offset();
                            n = D(a)[0] - c.top, o = D(a)[1] - c.left, G = [], H = []
                        }

                        function g(a) {
                            if (_(a) && !j && !D(a)[2]) {
                                k = 0, a.stopImmediatePropagation(), w = 0, x = 0, r = X();
                                var b = C.offset(),
                                    c = D(a)[0] - b.top,
                                    d = D(a)[1] - b.left;
                                if (!(r - q > 30)) {
                                    t = 1e3 / (r - p);
                                    var e = "mcsEaseOut",
                                        f = 2.5 > t,
                                        g = f ? [G[G.length - 2], H[H.length - 2]] : [0, 0];
                                    s = f ? [c - g[0], d - g[1]] : [c - n, d - o];
                                    var l = [Math.abs(s[0]), Math.abs(s[1])];
                                    t = f ? [Math.abs(s[0] / 4), Math.abs(s[1] / 4)] : [t, t];
                                    var m = [Math.abs(E[0].offsetTop) - s[0] * h(l[0] / t[0], t[0]), Math.abs(E[0].offsetLeft) - s[1] * h(l[1] / t[1], t[1])];
                                    u = "yx" === A.axis ? [m[0], m[1]] : "x" === A.axis ? [null, m[1]] : [m[0], null], v = [4 * l[0] + A.scrollInertia, 4 * l[1] + A.scrollInertia];
                                    var y = parseInt(A.contentTouchScroll) || 0;
                                    u[0] = l[0] > y ? u[0] : 0, u[1] = l[1] > y ? u[1] : 0, z.overflowed[0] && i(u[0], v[0], e, "y", K, !1), z.overflowed[1] && i(u[1], v[1], e, "x", K, !1)
                                }
                            }
                        }

                        function h(a, b) {
                            var c = [1.5 * b, 2 * b, b / 1.5, b / 2];
                            return a > 90 ? b > 4 ? c[0] : c[3] : a > 60 ? b > 3 ? c[3] : c[2] : a > 30 ? b > 8 ? c[1] : b > 6 ? c[0] : b > 4 ? b : c[2] : b > 8 ? b : c[3]
                        }

                        function i(a, b, c, d, e, f) {
                            a && V(y, a.toString(), {
                                dur: b,
                                scrollEasing: c,
                                dir: d,
                                overwrite: e,
                                drag: f
                            })
                        }
                        var k, l, m, n, o, p, q, r, s, t, u, v, w, x, y = a(this),
                            z = y.data(d),
                            A = z.opt,
                            B = d + "_" + z.idx,
                            C = a("#mCSB_" + z.idx),
                            E = a("#mCSB_" + z.idx + "_container"),
                            F = [a("#mCSB_" + z.idx + "_dragger_vertical"), a("#mCSB_" + z.idx + "_dragger_horizontal")],
                            G = [],
                            H = [],
                            J = 0,
                            K = "yx" === A.axis ? "none" : "all",
                            L = [],
                            M = E.find("iframe"),
                            N = ["touchstart." + B + " pointerdown." + B + " MSPointerDown." + B, "touchmove." + B + " pointermove." + B + " MSPointerMove." + B, "touchend." + B + " pointerup." + B + " MSPointerUp." + B],
                            O = void 0 !== document.body.style.touchAction;
                        E.bind(N[0], function(a) {
                            c(a)
                        }).bind(N[1], function(a) {
                            e(a)
                        }), C.bind(N[0], function(a) {
                            f(a)
                        }).bind(N[2], function(a) {
                            g(a)
                        }), M.length && M.each(function() {
                            a(this).load(function() {
                                I(this) && a(this.contentDocument || this.contentWindow.document).bind(N[0], function(a) {
                                    c(a), f(a)
                                }).bind(N[1], function(a) {
                                    e(a)
                                }).bind(N[2], function(a) {
                                    g(a)
                                })
                            })
                        })
                    },
                    G = function() {
                        function c() {
                            return window.getSelection ? window.getSelection().toString() : document.selection && "Control" != document.selection.type ? document.selection.createRange().text : 0
                        }

                        function e(a, b, c) {
                            k.type = c && f ? "stepped" : "stepless", k.scrollAmount = 10, P(g, a, b, "mcsLinearOut", c ? 60 : null)
                        }
                        var f, g = a(this),
                            h = g.data(d),
                            i = h.opt,
                            k = h.sequential,
                            l = d + "_" + h.idx,
                            m = a("#mCSB_" + h.idx + "_container"),
                            n = m.parent();
                        m.bind("mousedown." + l, function() {
                            b || f || (f = 1, j = !0)
                        }).add(document).bind("mousemove." + l, function(a) {
                            if (!b && f && c()) {
                                var d = m.offset(),
                                    g = D(a)[0] - d.top + m[0].offsetTop,
                                    j = D(a)[1] - d.left + m[0].offsetLeft;
                                g > 0 && g < n.height() && j > 0 && j < n.width() ? k.step && e("off", null, "stepped") : ("x" !== i.axis && h.overflowed[0] && (0 > g ? e("on", 38) : g > n.height() && e("on", 40)), "y" !== i.axis && h.overflowed[1] && (0 > j ? e("on", 37) : j > n.width() && e("on", 39)))
                            }
                        }).bind("mouseup." + l + " dragend." + l, function() {
                            b || (f && (f = 0, e("off", null)), j = !1)
                        })
                    },
                    H = function() {
                        function b(b, d) {
                            if (U(c), !J(c, b.target)) {
                                var g = "auto" !== f.mouseWheel.deltaFactor ? parseInt(f.mouseWheel.deltaFactor) : i && b.deltaFactor < 100 ? 100 : b.deltaFactor || 100,
                                    k = f.scrollInertia;
                                if ("x" === f.axis || "x" === f.mouseWheel.axis) var l = "x",
                                    m = [Math.round(g * e.scrollRatio.x), parseInt(f.mouseWheel.scrollAmount)],
                                    n = "auto" !== f.mouseWheel.scrollAmount ? m[1] : m[0] >= h.width() ? .9 * h.width() : m[0],
                                    o = Math.abs(a("#mCSB_" + e.idx + "_container")[0].offsetLeft),
                                    p = j[1][0].offsetLeft,
                                    q = j[1].parent().width() - j[1].width(),
                                    r = b.deltaX || b.deltaY || d;
                                else var l = "y",
                                    m = [Math.round(g * e.scrollRatio.y), parseInt(f.mouseWheel.scrollAmount)],
                                    n = "auto" !== f.mouseWheel.scrollAmount ? m[1] : m[0] >= h.height() ? .9 * h.height() : m[0],
                                    o = Math.abs(a("#mCSB_" + e.idx + "_container")[0].offsetTop),
                                    p = j[0][0].offsetTop,
                                    q = j[0].parent().height() - j[0].height(),
                                    r = b.deltaY || d;
                                "y" === l && !e.overflowed[0] || "x" === l && !e.overflowed[1] || ((f.mouseWheel.invert || b.webkitDirectionInvertedFromDevice) && (r = -r), f.mouseWheel.normalizeDelta && (r = 0 > r ? -1 : 1), (r > 0 && 0 !== p || 0 > r && p !== q || f.mouseWheel.preventDefault) && (b.stopImmediatePropagation(), b.preventDefault()), b.deltaFactor < 2 && !f.mouseWheel.normalizeDelta && (n = b.deltaFactor, k = 17), V(c, (o - r * n).toString(), {
                                    dir: l,
                                    dur: k
                                }))
                            }
                        }
                        if (a(this).data(d)) {
                            var c = a(this),
                                e = c.data(d),
                                f = e.opt,
                                g = d + "_" + e.idx,
                                h = a("#mCSB_" + e.idx),
                                j = [a("#mCSB_" + e.idx + "_dragger_vertical"), a("#mCSB_" + e.idx + "_dragger_horizontal")],
                                k = a("#mCSB_" + e.idx + "_container").find("iframe");
                            k.length && k.each(function() {
                                a(this).load(function() {
                                    I(this) && a(this.contentDocument || this.contentWindow.document).bind("mousewheel." + g, function(a, c) {
                                        b(a, c)
                                    })
                                })
                            }), h.bind("mousewheel." + g, function(a, c) {
                                b(a, c)
                            })
                        }
                    },
                    I = function(a) {
                        var b = null;
                        if (a) {
                            try {
                                var c = a.contentDocument || a.contentWindow.document;
                                b = c.body.innerHTML
                            } catch (d) {}
                            return null !== b
                        }
                        try {
                            var c = top.document;
                            b = c.body.innerHTML
                        } catch (d) {}
                        return null !== b
                    },
                    J = function(b, c) {
                        var e = c.nodeName.toLowerCase(),
                            f = b.data(d).opt.mouseWheel.disableOver,
                            g = ["select", "textarea"];
                        return a.inArray(e, f) > -1 && !(a.inArray(e, g) > -1 && !a(c).is(":focus"))
                    },
                    K = function() {
                        var b, c = a(this),
                            e = c.data(d),
                            f = d + "_" + e.idx,
                            g = a("#mCSB_" + e.idx + "_container"),
                            h = g.parent(),
                            i = a(".mCSB_" + e.idx + "_scrollbar ." + k[12]);
                        i.bind("mousedown." + f + " touchstart." + f + " pointerdown." + f + " MSPointerDown." + f, function(c) {
                            j = !0, a(c.target).hasClass("mCSB_dragger") || (b = 1)
                        }).bind("touchend." + f + " pointerup." + f + " MSPointerUp." + f, function() {
                            j = !1
                        }).bind("click." + f, function(d) {
                            if (b && (b = 0, a(d.target).hasClass(k[12]) || a(d.target).hasClass("mCSB_draggerRail"))) {
                                U(c);
                                var f = a(this),
                                    i = f.find(".mCSB_dragger");
                                if (f.parent(".mCSB_scrollTools_horizontal").length > 0) {
                                    if (!e.overflowed[1]) return;
                                    var j = "x",
                                        l = d.pageX > i.offset().left ? -1 : 1,
                                        m = Math.abs(g[0].offsetLeft) - .9 * l * h.width()
                                } else {
                                    if (!e.overflowed[0]) return;
                                    var j = "y",
                                        l = d.pageY > i.offset().top ? -1 : 1,
                                        m = Math.abs(g[0].offsetTop) - .9 * l * h.height()
                                }
                                V(c, m.toString(), {
                                    dir: j,
                                    scrollEasing: "mcsEaseInOut"
                                })
                            }
                        })
                    },
                    L = function() {
                        var b = a(this),
                            c = b.data(d),
                            e = c.opt,
                            f = d + "_" + c.idx,
                            g = a("#mCSB_" + c.idx + "_container"),
                            h = g.parent();
                        g.bind("focusin." + f, function() {
                            var c = a(document.activeElement),
                                d = g.find(".mCustomScrollBox").length,
                                f = 0;
                            c.is(e.advanced.autoScrollOnFocus) && (U(b), clearTimeout(b[0]._focusTimeout), b[0]._focusTimer = d ? (f + 17) * d : 0, b[0]._focusTimeout = setTimeout(function() {
                                var a = [bb(c)[0], bb(c)[1]],
                                    d = [g[0].offsetTop, g[0].offsetLeft],
                                    i = [d[0] + a[0] >= 0 && d[0] + a[0] < h.height() - c.outerHeight(!1), d[1] + a[1] >= 0 && d[0] + a[1] < h.width() - c.outerWidth(!1)],
                                    j = "yx" !== e.axis || i[0] || i[1] ? "all" : "none";
                                "x" === e.axis || i[0] || V(b, a[0].toString(), {
                                    dir: "y",
                                    scrollEasing: "mcsEaseInOut",
                                    overwrite: j,
                                    dur: f
                                }), "y" === e.axis || i[1] || V(b, a[1].toString(), {
                                    dir: "x",
                                    scrollEasing: "mcsEaseInOut",
                                    overwrite: j,
                                    dur: f
                                })
                            }, b[0]._focusTimer))
                        })
                    },
                    M = function() {
                        var b = a(this),
                            c = b.data(d),
                            e = d + "_" + c.idx,
                            f = a("#mCSB_" + c.idx + "_container").parent();
                        f.bind("scroll." + e, function() {
                            (0 !== f.scrollTop() || 0 !== f.scrollLeft()) && a(".mCSB_" + c.idx + "_scrollbar").css("visibility", "hidden")
                        })
                    },
                    N = function() {
                        var b = a(this),
                            c = b.data(d),
                            e = c.opt,
                            f = c.sequential,
                            g = d + "_" + c.idx,
                            h = ".mCSB_" + c.idx + "_scrollbar",
                            i = a(h + ">a");
                        i.bind("mousedown." + g + " touchstart." + g + " pointerdown." + g + " MSPointerDown." + g + " mouseup." + g + " touchend." + g + " pointerup." + g + " MSPointerUp." + g + " mouseout." + g + " pointerout." + g + " MSPointerOut." + g + " click." + g, function(d) {
                            function g(a, c) {
                                f.scrollAmount = e.scrollButtons.scrollAmount, P(b, a, c)
                            }
                            if (d.preventDefault(), $(d)) {
                                var h = a(this).attr("class");
                                switch (f.type = e.scrollButtons.scrollType, d.type) {
                                    case "mousedown":
                                    case "touchstart":
                                    case "pointerdown":
                                    case "MSPointerDown":
                                        if ("stepped" === f.type) return;
                                        j = !0, c.tweenRunning = !1, g("on", h);
                                        break;
                                    case "mouseup":
                                    case "touchend":
                                    case "pointerup":
                                    case "MSPointerUp":
                                    case "mouseout":
                                    case "pointerout":
                                    case "MSPointerOut":
                                        if ("stepped" === f.type) return;
                                        j = !1, f.dir && g("off", h);
                                        break;
                                    case "click":
                                        if ("stepped" !== f.type || c.tweenRunning) return;
                                        g("on", h)
                                }
                            }
                        })
                    },
                    O = function() {
                        function b(b) {
                            function d(a, b) {
                                g.type = f.keyboard.scrollType, g.scrollAmount = f.keyboard.scrollAmount, "stepped" === g.type && e.tweenRunning || P(c, a, b)
                            }
                            switch (b.type) {
                                case "blur":
                                    e.tweenRunning && g.dir && d("off", null);
                                    break;
                                case "keydown":
                                case "keyup":
                                    var h = b.keyCode ? b.keyCode : b.which,
                                        i = "on";
                                    if ("x" !== f.axis && (38 === h || 40 === h) || "y" !== f.axis && (37 === h || 39 === h)) {
                                        if ((38 === h || 40 === h) && !e.overflowed[0] || (37 === h || 39 === h) && !e.overflowed[1]) return;
                                        "keyup" === b.type && (i = "off"), a(document.activeElement).is(l) || (b.preventDefault(), b.stopImmediatePropagation(), d(i, h))
                                    } else if (33 === h || 34 === h) {
                                        if ((e.overflowed[0] || e.overflowed[1]) && (b.preventDefault(), b.stopImmediatePropagation()), "keyup" === b.type) {
                                            U(c);
                                            var m = 34 === h ? -1 : 1;
                                            if ("x" === f.axis || "yx" === f.axis && e.overflowed[1] && !e.overflowed[0]) var n = "x",
                                                o = Math.abs(j[0].offsetLeft) - .9 * m * k.width();
                                            else var n = "y",
                                                o = Math.abs(j[0].offsetTop) - .9 * m * k.height();
                                            V(c, o.toString(), {
                                                dir: n,
                                                scrollEasing: "mcsEaseInOut"
                                            })
                                        }
                                    } else if ((35 === h || 36 === h) && !a(document.activeElement).is(l) && ((e.overflowed[0] || e.overflowed[1]) && (b.preventDefault(), b.stopImmediatePropagation()), "keyup" === b.type)) {
                                        if ("x" === f.axis || "yx" === f.axis && e.overflowed[1] && !e.overflowed[0]) var n = "x",
                                            o = 35 === h ? Math.abs(k.width() - j.outerWidth(!1)) : 0;
                                        else var n = "y",
                                            o = 35 === h ? Math.abs(k.height() - j.outerHeight(!1)) : 0;
                                        V(c, o.toString(), {
                                            dir: n,
                                            scrollEasing: "mcsEaseInOut"
                                        })
                                    }
                            }
                        }
                        var c = a(this),
                            e = c.data(d),
                            f = e.opt,
                            g = e.sequential,
                            h = d + "_" + e.idx,
                            i = a("#mCSB_" + e.idx),
                            j = a("#mCSB_" + e.idx + "_container"),
                            k = j.parent(),
                            l = "input,textarea,select,datalist,keygen,[contenteditable='true']",
                            m = j.find("iframe"),
                            n = ["blur." + h + " keydown." + h + " keyup." + h];
                        m.length && m.each(function() {
                            a(this).load(function() {
                                I(this) && a(this.contentDocument || this.contentWindow.document).bind(n[0], function(a) {
                                    b(a)
                                })
                            })
                        }), i.attr("tabindex", "0").bind(n[0], function(a) {
                            b(a)
                        })
                    },
                    P = function(b, c, e, f, g) {
                        function h(a) {
                            l.snapAmount && (m.scrollAmount = l.snapAmount instanceof Array ? "x" === m.dir[0] ? l.snapAmount[1] : l.snapAmount[0] : l.snapAmount);
                            var c = "stepped" !== m.type,
                                d = g ? g : a ? c ? p / 1.5 : q : 1e3 / 60,
                                e = a ? c ? 7.5 : 40 : 2.5,
                                i = [Math.abs(n[0].offsetTop), Math.abs(n[0].offsetLeft)],
                                k = [j.scrollRatio.y > 10 ? 10 : j.scrollRatio.y, j.scrollRatio.x > 10 ? 10 : j.scrollRatio.x],
                                o = "x" === m.dir[0] ? i[1] + m.dir[1] * k[1] * e : i[0] + m.dir[1] * k[0] * e,
                                r = "x" === m.dir[0] ? i[1] + m.dir[1] * parseInt(m.scrollAmount) : i[0] + m.dir[1] * parseInt(m.scrollAmount),
                                s = "auto" !== m.scrollAmount ? r : o,
                                t = f ? f : a ? c ? "mcsLinearOut" : "mcsEaseInOut" : "mcsLinear",
                                u = a ? !0 : !1;
                            return a && 17 > d && (s = "x" === m.dir[0] ? i[1] : i[0]), V(b, s.toString(), {
                                dir: m.dir[0],
                                scrollEasing: t,
                                dur: d,
                                onComplete: u
                            }), a ? void(m.dir = !1) : (clearTimeout(m.step), void(m.step = setTimeout(function() {
                                h()
                            }, d)))
                        }

                        function i() {
                            clearTimeout(m.step), Z(m, "step"), U(b)
                        }
                        var j = b.data(d),
                            l = j.opt,
                            m = j.sequential,
                            n = a("#mCSB_" + j.idx + "_container"),
                            o = "stepped" === m.type ? !0 : !1,
                            p = l.scrollInertia < 26 ? 26 : l.scrollInertia,
                            q = l.scrollInertia < 1 ? 17 : l.scrollInertia;
                        switch (c) {
                            case "on":
                                if (m.dir = [e === k[16] || e === k[15] || 39 === e || 37 === e ? "x" : "y", e === k[13] || e === k[15] || 38 === e || 37 === e ? -1 : 1], U(b), ab(e) && "stepped" === m.type) return;
                                h(o);
                                break;
                            case "off":
                                i(), (o || j.tweenRunning && m.dir) && h(!0)
                        }
                    },
                    Q = function(b) {
                        var c = a(this).data(d).opt,
                            e = [];
                        return "function" == typeof b && (b = b()), b instanceof Array ? e = b.length > 1 ? [b[0], b[1]] : "x" === c.axis ? [null, b[0]] : [b[0], null] : (e[0] = b.y ? b.y : b.x || "x" === c.axis ? null : b, e[1] = b.x ? b.x : b.y || "y" === c.axis ? null : b), "function" == typeof e[0] && (e[0] = e[0]()), "function" == typeof e[1] && (e[1] = e[1]()), e
                    },
                    R = function(b, c) {
                        if (null != b && "undefined" != typeof b) {
                            var e = a(this),
                                f = e.data(d),
                                g = f.opt,
                                h = a("#mCSB_" + f.idx + "_container"),
                                i = h.parent(),
                                j = typeof b;
                            c || (c = "x" === g.axis ? "x" : "y");
                            var k = "x" === c ? h.outerWidth(!1) : h.outerHeight(!1),
                                m = "x" === c ? h[0].offsetLeft : h[0].offsetTop,
                                n = "x" === c ? "left" : "top";
                            switch (j) {
                                case "function":
                                    return b();
                                case "object":
                                    var o = b.jquery ? b : a(b);
                                    if (!o.length) return;
                                    return "x" === c ? bb(o)[1] : bb(o)[0];
                                case "string":
                                case "number":
                                    if (ab(b)) return Math.abs(b);
                                    if (-1 !== b.indexOf("%")) return Math.abs(k * parseInt(b) / 100);
                                    if (-1 !== b.indexOf("-=")) return Math.abs(m - parseInt(b.split("-=")[1]));
                                    if (-1 !== b.indexOf("+=")) {
                                        var p = m + parseInt(b.split("+=")[1]);
                                        return p >= 0 ? 0 : Math.abs(p)
                                    }
                                    if (-1 !== b.indexOf("px") && ab(b.split("px")[0])) return Math.abs(b.split("px")[0]);
                                    if ("top" === b || "left" === b) return 0;
                                    if ("bottom" === b) return Math.abs(i.height() - h.outerHeight(!1));
                                    if ("right" === b) return Math.abs(i.width() - h.outerWidth(!1));
                                    if ("first" === b || "last" === b) {
                                        var o = h.find(":" + b);
                                        return "x" === c ? bb(o)[1] : bb(o)[0]
                                    }
                                    return a(b).length ? "x" === c ? bb(a(b))[1] : bb(a(b))[0] : (h.css(n, b), void l.update.call(null, e[0]))
                            }
                        }
                    },
                    S = function(b) {
                        function c() {
                            return clearTimeout(m[0].autoUpdate), 0 === h.parents("html").length ? void(h = null) : void(m[0].autoUpdate = setTimeout(function() {
                                return j.advanced.updateOnSelectorChange && (i.poll.change.n = f(), i.poll.change.n !== i.poll.change.o) ? (i.poll.change.o = i.poll.change.n, void g(3)) : j.advanced.updateOnContentResize && (i.poll.size.n = h[0].scrollHeight + h[0].scrollWidth + m[0].offsetHeight + h[0].offsetHeight + h[0].offsetWidth, i.poll.size.n !== i.poll.size.o) ? (i.poll.size.o = i.poll.size.n, void g(1)) : !j.advanced.updateOnImageLoad || "auto" === j.advanced.updateOnImageLoad && "y" === j.axis || (i.poll.img.n = m.find("img").length, i.poll.img.n === i.poll.img.o) ? void((j.advanced.updateOnSelectorChange || j.advanced.updateOnContentResize || j.advanced.updateOnImageLoad) && c()) : (i.poll.img.o = i.poll.img.n, void m.find("img").each(function() {
                                    e(this)
                                }))
                            }, j.advanced.autoUpdateTimeout))
                        }

                        function e(b) {
                            function c(a, b) {
                                return function() {
                                    return b.apply(a, arguments)
                                }
                            }

                            function d() {
                                this.onload = null, a(b).addClass(k[2]), g(2)
                            }
                            if (a(b).hasClass(k[2])) return void g();
                            var e = new Image;
                            e.onload = c(e, d), e.src = b.src
                        }

                        function f() {
                            j.advanced.updateOnSelectorChange === !0 && (j.advanced.updateOnSelectorChange = "*");
                            var a = 0,
                                b = m.find(j.advanced.updateOnSelectorChange);
                            return j.advanced.updateOnSelectorChange && b.length > 0 && b.each(function() {
                                a += this.offsetHeight + this.offsetWidth
                            }), a
                        }

                        function g(a) {
                            clearTimeout(m[0].autoUpdate), l.update.call(null, h[0], a)
                        }
                        var h = a(this),
                            i = h.data(d),
                            j = i.opt,
                            m = a("#mCSB_" + i.idx + "_container");
                        return b ? (clearTimeout(m[0].autoUpdate), void Z(m[0], "autoUpdate")) : void c()
                    },
                    T = function(a, b, c) {
                        return Math.round(a / b) * b - c
                    },
                    U = function(b) {
                        var c = b.data(d),
                            e = a("#mCSB_" + c.idx + "_container,#mCSB_" + c.idx + "_container_wrapper,#mCSB_" + c.idx + "_dragger_vertical,#mCSB_" + c.idx + "_dragger_horizontal");
                        e.each(function() {
                            Y.call(this)
                        })
                    },
                    V = function(b, c, e) {
                        function f(a) {
                            return i && j.callbacks[a] && "function" == typeof j.callbacks[a]
                        }

                        function g() {
                            return [j.callbacks.alwaysTriggerOffsets || u >= v[0] + y, j.callbacks.alwaysTriggerOffsets || -z >= u]
                        }

                        function h() {
                            var a = [n[0].offsetTop, n[0].offsetLeft],
                                c = [s[0].offsetTop, s[0].offsetLeft],
                                d = [n.outerHeight(!1), n.outerWidth(!1)],
                                f = [m.height(), m.width()];
                            b[0].mcs = {
                                content: n,
                                top: a[0],
                                left: a[1],
                                draggerTop: c[0],
                                draggerLeft: c[1],
                                topPct: Math.round(100 * Math.abs(a[0]) / (Math.abs(d[0]) - f[0])),
                                leftPct: Math.round(100 * Math.abs(a[1]) / (Math.abs(d[1]) - f[1])),
                                direction: e.dir
                            }
                        }
                        var i = b.data(d),
                            j = i.opt,
                            k = {
                                trigger: "internal",
                                dir: "y",
                                scrollEasing: "mcsEaseOut",
                                drag: !1,
                                dur: j.scrollInertia,
                                overwrite: "all",
                                callbacks: !0,
                                onStart: !0,
                                onUpdate: !0,
                                onComplete: !0
                            },
                            e = a.extend(k, e),
                            l = [e.dur, e.drag ? 0 : e.dur],
                            m = a("#mCSB_" + i.idx),
                            n = a("#mCSB_" + i.idx + "_container"),
                            o = n.parent(),
                            p = j.callbacks.onTotalScrollOffset ? Q.call(b, j.callbacks.onTotalScrollOffset) : [0, 0],
                            q = j.callbacks.onTotalScrollBackOffset ? Q.call(b, j.callbacks.onTotalScrollBackOffset) : [0, 0];
                        if (i.trigger = e.trigger, (0 !== o.scrollTop() || 0 !== o.scrollLeft()) && (a(".mCSB_" + i.idx + "_scrollbar").css("visibility", "visible"), o.scrollTop(0).scrollLeft(0)), "_resetY" !== c || i.contentReset.y || (f("onOverflowYNone") && j.callbacks.onOverflowYNone.call(b[0]), i.contentReset.y = 1), "_resetX" !== c || i.contentReset.x || (f("onOverflowXNone") && j.callbacks.onOverflowXNone.call(b[0]), i.contentReset.x = 1), "_resetY" !== c && "_resetX" !== c) {
                            if (!i.contentReset.y && b[0].mcs || !i.overflowed[0] || (f("onOverflowY") && j.callbacks.onOverflowY.call(b[0]), i.contentReset.x = null), !i.contentReset.x && b[0].mcs || !i.overflowed[1] || (f("onOverflowX") && j.callbacks.onOverflowX.call(b[0]), i.contentReset.x = null), j.snapAmount) {
                                var r = j.snapAmount instanceof Array ? "x" === e.dir ? j.snapAmount[1] : j.snapAmount[0] : j.snapAmount;
                                c = T(c, r, j.snapOffset)
                            }
                            switch (e.dir) {
                                case "x":
                                    var s = a("#mCSB_" + i.idx + "_dragger_horizontal"),
                                        t = "left",
                                        u = n[0].offsetLeft,
                                        v = [m.width() - n.outerWidth(!1), s.parent().width() - s.width()],
                                        w = [c, 0 === c ? 0 : c / i.scrollRatio.x],
                                        y = p[1],
                                        z = q[1],
                                        A = y > 0 ? y / i.scrollRatio.x : 0,
                                        B = z > 0 ? z / i.scrollRatio.x : 0;
                                    break;
                                case "y":
                                    var s = a("#mCSB_" + i.idx + "_dragger_vertical"),
                                        t = "top",
                                        u = n[0].offsetTop,
                                        v = [m.height() - n.outerHeight(!1), s.parent().height() - s.height()],
                                        w = [c, 0 === c ? 0 : c / i.scrollRatio.y],
                                        y = p[0],
                                        z = q[0],
                                        A = y > 0 ? y / i.scrollRatio.y : 0,
                                        B = z > 0 ? z / i.scrollRatio.y : 0
                            }
                            w[1] < 0 || 0 === w[0] && 0 === w[1] ? w = [0, 0] : w[1] >= v[1] ? w = [v[0], v[1]] : w[0] = -w[0], b[0].mcs || (h(), f("onInit") && j.callbacks.onInit.call(b[0])), clearTimeout(n[0].onCompleteTimeout), W(s[0], t, Math.round(w[1]), l[1], e.scrollEasing), (i.tweenRunning || !(0 === u && w[0] >= 0 || u === v[0] && w[0] <= v[0])) && W(n[0], t, Math.round(w[0]), l[0], e.scrollEasing, e.overwrite, {
                                onStart: function() {
                                    e.callbacks && e.onStart && !i.tweenRunning && (f("onScrollStart") && (h(), j.callbacks.onScrollStart.call(b[0])), i.tweenRunning = !0, x(s), i.cbOffsets = g())
                                },
                                onUpdate: function() {
                                    e.callbacks && e.onUpdate && f("whileScrolling") && (h(), j.callbacks.whileScrolling.call(b[0]))
                                },
                                onComplete: function() {
                                    if (e.callbacks && e.onComplete) {
                                        "yx" === j.axis && clearTimeout(n[0].onCompleteTimeout);
                                        var a = n[0].idleTimer || 0;
                                        n[0].onCompleteTimeout = setTimeout(function() {
                                            f("onScroll") && (h(), j.callbacks.onScroll.call(b[0])), f("onTotalScroll") && w[1] >= v[1] - A && i.cbOffsets[0] && (h(), j.callbacks.onTotalScroll.call(b[0])), f("onTotalScrollBack") && w[1] <= B && i.cbOffsets[1] && (h(), j.callbacks.onTotalScrollBack.call(b[0])), i.tweenRunning = !1, n[0].idleTimer = 0, x(s, "hide")
                                        }, a)
                                    }
                                }
                            })
                        }
                    },
                    W = function(a, b, c, d, e, f, g) {
                        function h() {
                            v.stop || (s || o.call(), s = X() - r, i(), s >= v.time && (v.time = s > v.time ? s + m - (s - v.time) : s + m - 1, v.time < s + 1 && (v.time = s + 1)), v.time < d ? v.id = n(h) : q.call())
                        }

                        function i() {
                            d > 0 ? (v.currVal = l(v.time, t, w, d, e), u[b] = Math.round(v.currVal) + "px") : u[b] = c + "px", p.call()
                        }

                        function j() {
                            m = 1e3 / 60, v.time = s + m, n = window.requestAnimationFrame ? window.requestAnimationFrame : function(a) {
                                return i(), setTimeout(a, .01)
                            }, v.id = n(h)
                        }

                        function k() {
                            null != v.id && (window.requestAnimationFrame ? window.cancelAnimationFrame(v.id) : clearTimeout(v.id), v.id = null)
                        }

                        function l(a, b, c, d, e) {
                            switch (e) {
                                case "linear":
                                case "mcsLinear":
                                    return c * a / d + b;
                                case "mcsLinearOut":
                                    return a /= d, a--, c * Math.sqrt(1 - a * a) + b;
                                case "easeInOutSmooth":
                                    return a /= d / 2, 1 > a ? c / 2 * a * a + b : (a--, -c / 2 * (a * (a - 2) - 1) + b);
                                case "easeInOutStrong":
                                    return a /= d / 2, 1 > a ? c / 2 * Math.pow(2, 10 * (a - 1)) + b : (a--, c / 2 * (-Math.pow(2, -10 * a) + 2) + b);
                                case "easeInOut":
                                case "mcsEaseInOut":
                                    return a /= d / 2, 1 > a ? c / 2 * a * a * a + b : (a -= 2, c / 2 * (a * a * a + 2) + b);
                                case "easeOutSmooth":
                                    return a /= d, a--, -c * (a * a * a * a - 1) + b;
                                case "easeOutStrong":
                                    return c * (-Math.pow(2, -10 * a / d) + 1) + b;
                                case "easeOut":
                                case "mcsEaseOut":
                                default:
                                    var f = (a /= d) * a,
                                        g = f * a;
                                    return b + c * (.499999999999997 * g * f + -2.5 * f * f + 5.5 * g + -6.5 * f + 4 * a)
                            }
                        }
                        a._mTween || (a._mTween = {
                            top: {},
                            left: {}
                        });
                        var m, n, g = g || {},
                            o = g.onStart || function() {},
                            p = g.onUpdate || function() {},
                            q = g.onComplete || function() {},
                            r = X(),
                            s = 0,
                            t = a.offsetTop,
                            u = a.style,
                            v = a._mTween[b];
                        "left" === b && (t = a.offsetLeft);
                        var w = c - t;
                        v.stop = 0, "none" !== f && k(), j()
                    },
                    X = function() {
                        return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
                    },
                    Y = function() {
                        var a = this;
                        a._mTween || (a._mTween = {
                            top: {},
                            left: {}
                        });
                        for (var b = ["top", "left"], c = 0; c < b.length; c++) {
                            var d = b[c];
                            a._mTween[d].id && (window.requestAnimationFrame ? window.cancelAnimationFrame(a._mTween[d].id) : clearTimeout(a._mTween[d].id), a._mTween[d].id = null, a._mTween[d].stop = 1)
                        }
                    },
                    Z = function(a, b) {
                        try {
                            delete a[b]
                        } catch (c) {
                            a[b] = null
                        }
                    },
                    $ = function(a) {
                        return !(a.which && 1 !== a.which)
                    },
                    _ = function(a) {
                        var b = a.originalEvent.pointerType;
                        return !(b && "touch" !== b && 2 !== b)
                    },
                    ab = function(a) {
                        return !isNaN(parseFloat(a)) && isFinite(a)
                    },
                    bb = function(a) {
                        var b = a.parents(".mCSB_container");
                        return [a.offset().top - b.offset().top, a.offset().left - b.offset().left]
                    },
                    cb = function() {
                        function a() {
                            var a = ["webkit", "moz", "ms", "o"];
                            if ("hidden" in document) return "hidden";
                            for (var b = 0; b < a.length; b++)
                                if (a[b] + "Hidden" in document) return a[b] + "Hidden";
                            return null
                        }
                        var b = a();
                        return b ? document[b] : !1
                    };
                a.fn[c] = function(b) {
                    return l[b] ? l[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? void a.error("Method " + b + " does not exist") : l.init.apply(this, arguments)
                }, a[c] = function(b) {
                    return l[b] ? l[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? void a.error("Method " + b + " does not exist") : l.init.apply(this, arguments)
                }, a[c].defaults = f, window[c] = !0, a(window).load(function() {
                    a(e)[c](), a.extend(a.expr[":"], {
                        mcsInView: a.expr[":"].mcsInView || function(b) {
                            var c, d, e = a(b),
                                f = e.parents(".mCSB_container");
                            return f.length ? (c = f.parent(), d = [f[0].offsetTop, f[0].offsetLeft], d[0] + bb(e)[0] >= 0 && d[0] + bb(e)[0] < c.height() - e.outerHeight(!1) && d[1] + bb(e)[1] >= 0 && d[1] + bb(e)[1] < c.width() - e.outerWidth(!1)) : void 0
                        },
                        mcsOverflow: a.expr[":"].mcsOverflow || function(b) {
                            var c = a(b).data(d);
                            return c ? c.overflowed[0] || c.overflowed[1] : void 0
                        }
                    })
                })
            })
        })
    }), define("component/jquery-ui-tooltip/core", function(require) {
            var a = require("jquery");
            ! function(a, b) {
                function c(b, c) {
                    var e, f, g, h = b.nodeName.toLowerCase();
                    return "area" === h ? (e = b.parentNode, f = e.name, b.href && f && "map" === e.nodeName.toLowerCase() ? (g = a("img[usemap=#" + f + "]")[0], !!g && d(g)) : !1) : (/input|select|textarea|button|object/.test(h) ? !b.disabled : "a" === h ? b.href || c : c) && d(b)
                }

                function d(b) {
                    return a.expr.filters.visible(b) && !a(b).parents().addBack().filter(function() {
                        return "hidden" === a.css(this, "visibility")
                    }).length
                }
                var e = 0,
                    f = /^ui-id-\d+$/;
                a.ui = a.ui || {}, a.extend(a.ui, {
                        version: "1.10.4",
                        keyCode: {
                            BACKSPACE: 8,
                            COMMA: 188,
                            DELETE: 46,
                            DOWN: 40,
                            END: 35,
                            ENTER: 13,
                            ESCAPE: 27,
                            HOME: 36,
                            LEFT: 37,
                            NUMPAD_ADD: 107,
                            NUMPAD_DECIMAL: 110,
                            NUMPAD_DIVIDE: 111,
                            NUMPAD_ENTER: 108,
                            NUMPAD_MULTIPLY: 106,
                            NUMPAD_SUBTRACT: 109,
                            PAGE_DOWN: 34,
                            PAGE_UP: 33,
                            PERIOD: 190,
                            RIGHT: 39,
                            SPACE: 32,
                            TAB: 9,
                            UP: 38
                        }
                    }), a.fn.extend({
                        focus: function(b) {
                            return function(c, d) {
                                return "number" == typeof c ? this.each(function() {
                                    var b = this;
                                    setTimeout(function() {
                                        a(b).focus(), d && d.call(b)
                                    }, c)
                                }) : b.apply(this, arguments)
                            }
                        }(a.fn.focus),
                        scrollParent: function() {
                            var b;
                            return b = a.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                                return /(relative|absolute|fixed)/.test(a.css(this, "position")) && /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"))
                            }).eq(0) : this.parents().filter(function() {
                                return /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"))
                            }).eq(0), /fixed/.test(this.css("position")) || !b.length ? a(document) : b
                        },
                        zIndex: function(c) {
                            if (c !== b) return this.css("zIndex", c);
                            if (this.length)
                                for (var d, e, f = a(this[0]); f.length && f[0] !== document;) {
                                    if (d = f.css("position"), ("absolute" === d || "relative" === d || "fixed" === d) && (e = parseInt(f.css("zIndex"), 10), !isNaN(e) && 0 !== e)) return e;
                                    f = f.parent()
                                }
                            return 0
                        },
                        uniqueId: function() {
                            return this.each(function() {
                                this.id || (this.id = "ui-id-" + ++e)
                            })
                        },
                        removeUniqueId: function() {
                            return this.each(function() {
                                f.test(this.id) && a(this).removeAttr("id")
                            })
                        }
                    }), a.extend(a.expr[":"], {
                        data: a.expr.createPseudo ? a.expr.createPseudo(function(b) {
                            return function(c) {
                                return !!a.data(c, b)
                            }
                        }) : function(b, c, d) {
                            return !!a.data(b, d[3])
                        },
                        focusable: function(b) {
                            return c(b, !isNaN(a.attr(b, "tabindex")))
                        },
                        tabbable: function(b) {
                            var d = a.attr(b, "tabindex"),
                                e = isNaN(d);
                            return (e || d >= 0) && c(b, !e)
                        }
                    }), a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function(c, d) {
                        function e(b, c, d, e) {
                            return a.each(f, function() {
                                c -= parseFloat(a.css(b, "padding" + this)) || 0, d && (c -= parseFloat(a.css(b, "border" + this + "Width")) || 0), e && (c -= parseFloat(a.css(b, "margin" + this)) || 0)
                            }), c
                        }
                        var f = "Width" === d ? ["Left", "Right"] : ["Top", "Bottom"],
                            g = d.toLowerCase(),
                            h = {
                                innerWidth: a.fn.innerWidth,
                                innerHeight: a.fn.innerHeight,
                                outerWidth: a.fn.outerWidth,
                                outerHeight: a.fn.outerHeight
                            };
                        a.fn["inner" + d] = function(c) {
                            return c === b ? h["inner" + d].call(this) : this.each(function() {
                                a(this).css(g, e(this, c) + "px")
                            })
                        }, a.fn["outer" + d] = function(b, c) {
                            return "number" != typeof b ? h["outer" + d].call(this, b) : this.each(function() {
                                a(this).css(g, e(this, b, !0, c) + "px")
                            })
                        }
                    }), a.fn.addBack || (a.fn.addBack = function(a) {
                        return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
                    }), a("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (a.fn.removeData = function(b) {
                        return function(c) {
                            return arguments.length ? b.call(this, a.camelCase(c)) : b.call(this)
                        }
                    }(a.fn.removeData)), a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), a.support.selectstart = "onselectstart" in document.createElement("div"), a.fn.extend({
                        disableSelection: function() {
                            return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(a) {
                                a.preventDefault()
                            })
                        },
                        enableSelection: function() {
                            return this.unbind(".ui-disableSelection")
                        }
                    }), a.extend(a.ui, {
                            plugin: {
                                add: function(b, c, d) {
                                    var e, f = a.ui[b].prototype;
                                    for (e in d) f.plugins[e] = f.plugins[e] || [], f.plugins[e].push([c, d[e]])
                                },
                                call: function(a, b, c) {
                                        var d, e = a.plugins[b];
                                        if (e && a.element[0].parentNode && 11 !== a.element[0].parentNode.nodeType)
                        for (d = 0; d < e.length; d++) a.options[e[d][0]] && e[d][1].apply(a.element, c) } }, hasScroll: function(b, c) { if ("hidden" === a(b).css("overflow")) return !1; var d = c && "left" === c ? "scrollLeft" : "scrollTop",
                    e = !1; return b[d] > 0 ? !0 : (b[d] = 1, e = b[d] > 0, b[d] = 0, e) } }) }(a) }), define("component/jquery-ui-tooltip/widget", function(require) {
    var a = require("jquery");
    ! function(a, b) {
        var c = 0,
            d = Array.prototype.slice,
            e = a.cleanData;
        a.cleanData = function(b) { for (var c, d = 0; null != (c = b[d]); d++) try { a(c).triggerHandler("remove") } catch (f) {} e(b) }, a.widget = function(b, c, d) { var e, f, g, h, i = {},
                j = b.split(".")[0];
            b = b.split(".")[1], e = j + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][e.toLowerCase()] = function(b) { return !!a.data(b, e) }, a[j] = a[j] || {}, f = a[j][b], g = a[j][b] = function(a, b) { return this._createWidget ? (arguments.length && this._createWidget(a, b), void 0) : new g(a, b) }, a.extend(g, f, { version: d.version, _proto: a.extend({}, d), _childConstructors: [] }), h = new c, h.options = a.widget.extend({}, h.options), a.each(d, function(b, d) { return a.isFunction(d) ? (i[b] = function() { var a = function() { return c.prototype[b].apply(this, arguments) },
                        e = function(a) { return c.prototype[b].apply(this, a) }; return function() { var b, c = this._super,
                            f = this._superApply; return this._super = a, this._superApply = e, b = d.apply(this, arguments), this._super = c, this._superApply = f, b } }(), void 0) : (i[b] = d, void 0) }), g.prototype = a.widget.extend(h, { widgetEventPrefix: f ? h.widgetEventPrefix || b : b }, i, { constructor: g, namespace: j, widgetName: b, widgetFullName: e }), f ? (a.each(f._childConstructors, function(b, c) { var d = c.prototype;
                a.widget(d.namespace + "." + d.widgetName, g, c._proto) }), delete f._childConstructors) : c._childConstructors.push(g), a.widget.bridge(b, g) }, a.widget.extend = function(c) { for (var e, f, g = d.call(arguments, 1), h = 0, i = g.length; i > h; h++)
                for (e in g[h]) f = g[h][e], g[h].hasOwnProperty(e) && f !== b && (c[e] = a.isPlainObject(f) ? a.isPlainObject(c[e]) ? a.widget.extend({}, c[e], f) : a.widget.extend({}, f) : f); return c }, a.widget.bridge = function(c, e) { var f = e.prototype.widgetFullName || c;
            a.fn[c] = function(g) { var h = "string" == typeof g,
                    i = d.call(arguments, 1),
                    j = this; return g = !h && i.length ? a.widget.extend.apply(null, [g].concat(i)) : g, h ? this.each(function() { var d, e = a.data(this, f); return e ? a.isFunction(e[g]) && "_" !== g.charAt(0) ? (d = e[g].apply(e, i), d !== e && d !== b ? (j = d && d.jquery ? j.pushStack(d.get()) : d, !1) : void 0) : a.error("no such method '" + g + "' for " + c + " widget instance") : a.error("cannot call methods on " + c + " prior to initialization; " + "attempted to call method '" + g + "'") }) : this.each(function() { var b = a.data(this, f);
                    b ? b.option(g || {})._init() : a.data(this, f, new e(g, this)) }), j } }, a.Widget = function() {}, a.Widget._childConstructors = [], a.Widget.prototype = { widgetName: "widget", widgetEventPrefix: "", defaultElement: "<div>", options: { disabled: !1, create: null }, _createWidget: function(b, d) { d = a(d || this.defaultElement || this)[0], this.element = a(d), this.uuid = c++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = a.widget.extend({}, this.options, this._getCreateOptions(), b), this.bindings = a(), this.hoverable = a(), this.focusable = a(), d !== this && (a.data(d, this.widgetFullName, this), this._on(!0, this.element, { remove: function(a) { a.target === d && this.destroy() } }), this.document = a(d.style ? d.ownerDocument : d.document || d), this.window = a(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init() }, _getCreateOptions: a.noop, _getCreateEventData: a.noop, _create: a.noop, _init: a.noop, destroy: function() { this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus") }, _destroy: a.noop, widget: function() { return this.element }, option: function(c, d) { var e, f, g, h = c; if (0 === arguments.length) return a.widget.extend({}, this.options); if ("string" == typeof c)
                    if (h = {}, e = c.split("."), c = e.shift(), e.length) { for (f = h[c] = a.widget.extend({}, this.options[c]), g = 0; g < e.length - 1; g++) f[e[g]] = f[e[g]] || {}, f = f[e[g]]; if (c = e.pop(), 1 === arguments.length) return f[c] === b ? null : f[c];
                        f[c] = d } else { if (1 === arguments.length) return this.options[c] === b ? null : this.options[c];
                        h[c] = d }
                return this._setOptions(h), this }, _setOptions: function(a) { var b; for (b in a) this._setOption(b, a[b]); return this }, _setOption: function(a, b) { return this.options[a] = b, "disabled" === a && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!b).attr("aria-disabled", b), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this }, enable: function() { return this._setOption("disabled", !1) }, disable: function() { return this._setOption("disabled", !0) }, _on: function(b, c, d) { var e, f = this; "boolean" != typeof b && (d = c, c = b, b = !1), d ? (c = e = a(c), this.bindings = this.bindings.add(c)) : (d = c, c = this.element, e = this.widget()), a.each(d, function(d, g) {
                    function h() { return b || f.options.disabled !== !0 && !a(this).hasClass("ui-state-disabled") ? ("string" == typeof g ? f[g] : g).apply(f, arguments) : void 0 } "string" != typeof g && (h.guid = g.guid = g.guid || h.guid || a.guid++); var i = d.match(/^(\w+)\s*(.*)$/),
                        j = i[1] + f.eventNamespace,
                        k = i[2];
                    k ? e.delegate(k, j, h) : c.bind(j, h) }) }, _off: function(a, b) { b = (b || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, a.unbind(b).undelegate(b) }, _delay: function(a, b) {
                function c() { return ("string" == typeof a ? d[a] : a).apply(d, arguments) } var d = this; return setTimeout(c, b || 0) }, _hoverable: function(b) { this.hoverable = this.hoverable.add(b), this._on(b, { mouseenter: function(b) { a(b.currentTarget).addClass("ui-state-hover") }, mouseleave: function(b) { a(b.currentTarget).removeClass("ui-state-hover") } }) }, _focusable: function(b) { this.focusable = this.focusable.add(b), this._on(b, { focusin: function(b) { a(b.currentTarget).addClass("ui-state-focus") }, focusout: function(b) { a(b.currentTarget).removeClass("ui-state-focus") } }) }, _trigger: function(b, c, d) { var e, f, g = this.options[b]; if (d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent)
                    for (e in f) e in c || (c[e] = f[e]); return this.element.trigger(c, d), !(a.isFunction(g) && g.apply(this.element[0], [c].concat(d)) === !1 || c.isDefaultPrevented()) } }, a.each({ show: "fadeIn", hide: "fadeOut" }, function(b, c) {
            a.Widget.prototype["_" + b] = function(d, e, f) {
                "string" == typeof e && (e = { effect: e });
                var g, h = e ? e === !0 || "number" == typeof e ? c : e.effect || c : b;
                e = e || {}, "number" == typeof e && (e = { duration: e }), g = !a.isEmptyObject(e), e.complete = f, e.delay && d.delay(e.delay), g && a.effects && a.effects.effect[h] ? d[b](e) : h !== b && d[h] ? d[h](e.duration, e.easing, f) : d.queue(function(c) {
                    a(this)[b](), f && f.call(d[0]), c()
                })
            }
        })
    }(a)
}), define("component/jquery-ui-tooltip/position", function(require) { var a = require("jquery");! function(a, b) {
        function c(a, b, c) { return [parseFloat(a[0]) * (n.test(a[0]) ? b / 100 : 1), parseFloat(a[1]) * (n.test(a[1]) ? c / 100 : 1)] }

        function d(b, c) { return parseInt(a.css(b, c), 10) || 0 }

        function e(b) { var c = b[0]; return 9 === c.nodeType ? { width: b.width(), height: b.height(), offset: { top: 0, left: 0 } } : a.isWindow(c) ? { width: b.width(), height: b.height(), offset: { top: b.scrollTop(), left: b.scrollLeft() } } : c.preventDefault ? { width: 0, height: 0, offset: { top: c.pageY, left: c.pageX } } : { width: b.outerWidth(), height: b.outerHeight(), offset: b.offset() } } a.ui = a.ui || {}; var f, g = Math.max,
            h = Math.abs,
            i = Math.round,
            j = /left|center|right/,
            k = /top|center|bottom/,
            l = /[\+\-]\d+(\.[\d]+)?%?/,
            m = /^\w+/,
            n = /%$/,
            o = a.fn.position;
        a.position = { scrollbarWidth: function() { if (f !== b) return f; var c, d, e = a("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                        g = e.children()[0]; return a("body").append(e), c = g.offsetWidth, e.css("overflow", "scroll"), d = g.offsetWidth, c === d && (d = e[0].clientWidth), e.remove(), f = c - d }, getScrollInfo: function(b) { var c = b.isWindow || b.isDocument ? "" : b.element.css("overflow-x"),
                        d = b.isWindow || b.isDocument ? "" : b.element.css("overflow-y"),
                        e = "scroll" === c || "auto" === c && b.width < b.element[0].scrollWidth,
                        f = "scroll" === d || "auto" === d && b.height < b.element[0].scrollHeight; return { width: f ? a.position.scrollbarWidth() : 0, height: e ? a.position.scrollbarWidth() : 0 } }, getWithinInfo: function(b) { var c = a(b || window),
                        d = a.isWindow(c[0]),
                        e = !!c[0] && 9 === c[0].nodeType; return { element: c, isWindow: d, isDocument: e, offset: c.offset() || { left: 0, top: 0 }, scrollLeft: c.scrollLeft(), scrollTop: c.scrollTop(), width: d ? c.width() : c.outerWidth(), height: d ? c.height() : c.outerHeight() } } }, a.fn.position = function(b) { if (!b || !b.of) return o.apply(this, arguments);
                b = a.extend({}, b); var f, n, p, q, r, s, t = a(b.of),
                    u = a.position.getWithinInfo(b.within),
                    v = a.position.getScrollInfo(u),
                    w = (b.collision || "flip").split(" "),
                    x = {}; return s = e(t), t[0].preventDefault && (b.at = "left top"), n = s.width, p = s.height, q = s.offset, r = a.extend({}, q), a.each(["my", "at"], function() { var a, c, d = (b[this] || "").split(" ");
                    1 === d.length && (d = j.test(d[0]) ? d.concat(["center"]) : k.test(d[0]) ? ["center"].concat(d) : ["center", "center"]), d[0] = j.test(d[0]) ? d[0] : "center", d[1] = k.test(d[1]) ? d[1] : "center", a = l.exec(d[0]), c = l.exec(d[1]), x[this] = [a ? a[0] : 0, c ? c[0] : 0], b[this] = [m.exec(d[0])[0], m.exec(d[1])[0]] }), 1 === w.length && (w[1] = w[0]), "right" === b.at[0] ? r.left += n : "center" === b.at[0] && (r.left += n / 2), "bottom" === b.at[1] ? r.top += p : "center" === b.at[1] && (r.top += p / 2), f = c(x.at, n, p), r.left += f[0], r.top += f[1], this.each(function() { var e, j, k = a(this),
                        l = k.outerWidth(),
                        m = k.outerHeight(),
                        o = d(this, "marginLeft"),
                        s = d(this, "marginTop"),
                        y = l + o + d(this, "marginRight") + v.width,
                        z = m + s + d(this, "marginBottom") + v.height,
                        A = a.extend({}, r),
                        B = c(x.my, k.outerWidth(), k.outerHeight()); "right" === b.my[0] ? A.left -= l : "center" === b.my[0] && (A.left -= l / 2), "bottom" === b.my[1] ? A.top -= m : "center" === b.my[1] && (A.top -= m / 2), A.left += B[0], A.top += B[1], a.support.offsetFractions || (A.left = i(A.left), A.top = i(A.top)), e = { marginLeft: o, marginTop: s }, a.each(["left", "top"], function(c, d) { a.ui.position[w[c]] && a.ui.position[w[c]][d](A, { targetWidth: n, targetHeight: p, elemWidth: l, elemHeight: m, collisionPosition: e, collisionWidth: y, collisionHeight: z, offset: [f[0] + B[0], f[1] + B[1]], my: b.my, at: b.at, within: u, elem: k }) }), b.using && (j = function(a) { var c = q.left - A.left,
                            d = c + n - l,
                            e = q.top - A.top,
                            f = e + p - m,
                            i = { target: { element: t, left: q.left, top: q.top, width: n, height: p }, element: { element: k, left: A.left, top: A.top, width: l, height: m }, horizontal: 0 > d ? "left" : c > 0 ? "right" : "center", vertical: 0 > f ? "top" : e > 0 ? "bottom" : "middle" };
                        l > n && h(c + d) < n && (i.horizontal = "center"), m > p && h(e + f) < p && (i.vertical = "middle"), i.important = g(h(c), h(d)) > g(h(e), h(f)) ? "horizontal" : "vertical", b.using.call(this, a, i) }), k.offset(a.extend(A, { using: j })) }) }, a.ui.position = { fit: { left: function(a, b) { var c, d = b.within,
                            e = d.isWindow ? d.scrollLeft : d.offset.left,
                            f = d.width,
                            h = a.left - b.collisionPosition.marginLeft,
                            i = e - h,
                            j = h + b.collisionWidth - f - e;
                        b.collisionWidth > f ? i > 0 && 0 >= j ? (c = a.left + i + b.collisionWidth - f - e, a.left += i - c) : a.left = j > 0 && 0 >= i ? e : i > j ? e + f - b.collisionWidth : e : i > 0 ? a.left += i : j > 0 ? a.left -= j : a.left = g(a.left - h, a.left) }, top: function(a, b) { var c, d = b.within,
                            e = d.isWindow ? d.scrollTop : d.offset.top,
                            f = b.within.height,
                            h = a.top - b.collisionPosition.marginTop,
                            i = e - h,
                            j = h + b.collisionHeight - f - e;
                        b.collisionHeight > f ? i > 0 && 0 >= j ? (c = a.top + i + b.collisionHeight - f - e, a.top += i - c) : a.top = j > 0 && 0 >= i ? e : i > j ? e + f - b.collisionHeight : e : i > 0 ? a.top += i : j > 0 ? a.top -= j : a.top = g(a.top - h, a.top) } }, flip: { left: function(a, b) { var c, d, e = b.within,
                            f = e.offset.left + e.scrollLeft,
                            g = e.width,
                            i = e.isWindow ? e.scrollLeft : e.offset.left,
                            j = a.left - b.collisionPosition.marginLeft,
                            k = j - i,
                            l = j + b.collisionWidth - g - i,
                            m = "left" === b.my[0] ? -b.elemWidth : "right" === b.my[0] ? b.elemWidth : 0,
                            n = "left" === b.at[0] ? b.targetWidth : "right" === b.at[0] ? -b.targetWidth : 0,
                            o = -2 * b.offset[0];
                        0 > k ? (c = a.left + m + n + o + b.collisionWidth - g - f, (0 > c || c < h(k)) && (a.left += m + n + o)) : l > 0 && (d = a.left - b.collisionPosition.marginLeft + m + n + o - i, (d > 0 || h(d) < l) && (a.left += m + n + o)) }, top: function(a, b) { var c, d, e = b.within,
                            f = e.offset.top + e.scrollTop,
                            g = e.height,
                            i = e.isWindow ? e.scrollTop : e.offset.top,
                            j = a.top - b.collisionPosition.marginTop,
                            k = j - i,
                            l = j + b.collisionHeight - g - i,
                            m = "top" === b.my[1],
                            n = m ? -b.elemHeight : "bottom" === b.my[1] ? b.elemHeight : 0,
                            o = "top" === b.at[1] ? b.targetHeight : "bottom" === b.at[1] ? -b.targetHeight : 0,
                            p = -2 * b.offset[1];
                        0 > k ? (d = a.top + n + o + p + b.collisionHeight - g - f, a.top + n + o + p > k && (0 > d || d < h(k)) && (a.top += n + o + p)) : l > 0 && (c = a.top - b.collisionPosition.marginTop + n + o + p - i, a.top + n + o + p > l && (c > 0 || h(c) < l) && (a.top += n + o + p)) } }, flipfit: { left: function() { a.ui.position.flip.left.apply(this, arguments), a.ui.position.fit.left.apply(this, arguments) }, top: function() { a.ui.position.flip.top.apply(this, arguments), a.ui.position.fit.top.apply(this, arguments) } } },
            function() { var b, c, d, e, f, g = document.getElementsByTagName("body")[0],
                    h = document.createElement("div");
                b = document.createElement(g ? "div" : "body"), d = { visibility: "hidden", width: 0, height: 0, border: 0, margin: 0, background: "none" }, g && a.extend(d, { position: "absolute", left: "-1000px", top: "-1000px" }); for (f in d) b.style[f] = d[f];
                b.appendChild(h), c = g || document.documentElement, c.insertBefore(b, c.firstChild), h.style.cssText = "position: absolute; left: 10.7432222px;", e = a(h).offset().left, a.support.offsetFractions = e > 10 && 11 > e, b.innerHTML = "", c.removeChild(b) }() }(a) }), define("component/jquery-ui-tooltip/tooltip", function(require) { var a = require("jquery");
    require("component/jquery-ui-tooltip/core"), require("component/jquery-ui-tooltip/widget"), require("component/jquery-ui-tooltip/position"),
        function(a) {
            function b(b, c) { var d = (b.attr("aria-describedby") || "").split(/\s+/);
                d.push(c), b.data("ui-tooltip-id", c).attr("aria-describedby", a.trim(d.join(" "))) }

            function c(b) { var c = b.data("ui-tooltip-id"),
                    d = (b.attr("aria-describedby") || "").split(/\s+/),
                    e = a.inArray(c, d); - 1 !== e && d.splice(e, 1), b.removeData("ui-tooltip-id"), d = a.trim(d.join(" ")), d ? b.attr("aria-describedby", d) : b.removeAttr("aria-describedby") } var d = 0;
            a.widget("ui.tooltip", { version: "1.10.4", options: { content: function() { var b = a(this).attr("title") || ""; return a("<a>").text(b).html() }, hide: !0, items: "[title]:not([disabled])", position: { my: "left top+15", at: "left bottom", collision: "flipfit flip" }, show: !0, tooltipClass: null, track: !1, close: null, open: null }, _create: function() { this._on({ mouseover: "open", focusin: "open" }), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable() }, _setOption: function(b, c) { var d = this; return "disabled" === b ? (this[c ? "_disable" : "_enable"](), this.options[b] = c, void 0) : (this._super(b, c), "content" === b && a.each(this.tooltips, function(a, b) { d._updateContent(b) }), void 0) }, _disable: function() { var b = this;
                    a.each(this.tooltips, function(c, d) { var e = a.Event("blur");
                        e.target = e.currentTarget = d[0], b.close(e, !0) }), this.element.find(this.options.items).addBack().each(function() { var b = a(this);
                        b.is("[title]") && b.data("ui-tooltip-title", b.attr("title")).attr("title", "") }) }, _enable: function() { this.element.find(this.options.items).addBack().each(function() { var b = a(this);
                        b.data("ui-tooltip-title") && b.attr("title", b.data("ui-tooltip-title")) }) }, open: function(b) { var c = this,
                        d = a(b ? b.target : this.element).closest(this.options.items);
                    d.length && !d.data("ui-tooltip-id") && (d.attr("title") && d.data("ui-tooltip-title", d.attr("title")), d.data("ui-tooltip-open", !0), b && "mouseover" === b.type && d.parents().each(function() { var b, d = a(this);
                        d.data("ui-tooltip-open") && (b = a.Event("blur"), b.target = b.currentTarget = this, c.close(b, !0)), d.attr("title") && (d.uniqueId(), c.parents[this.id] = { element: this, title: d.attr("title") }, d.attr("title", "")) }), this._updateContent(d, b)) }, _updateContent: function(a, b) { var c, d = this.options.content,
                        e = this,
                        f = b ? b.type : null; return "string" == typeof d ? this._open(b, a, d) : (c = d.call(a[0], function(c) { a.data("ui-tooltip-open") && e._delay(function() { b && (b.type = f), this._open(b, a, c) }) }), c && this._open(b, a, c), void 0) }, _open: function(c, d, e) {
                    function f(a) { j.of = a, g.is(":hidden") || g.position(j) } var g, h, i, j = a.extend({}, this.options.position); if (e) { if (g = this._find(d), g.length) return g.find(".ui-tooltip-content").html(e), void 0;
                        d.is("[title]") && (c && "mouseover" === c.type ? d.attr("title", "") : d.removeAttr("title")), g = this._tooltip(d), b(d, g.attr("id")), g.find(".ui-tooltip-content").html(e), this.options.track && c && /^mouse/.test(c.type) ? (this._on(this.document, { mousemove: f }), f(c)) : g.position(a.extend({ of: d }, this.options.position)), g.hide(), this._show(g, this.options.show), this.options.show && this.options.show.delay && (i = this.delayedShow = setInterval(function() { g.is(":visible") && (f(j.of), clearInterval(i)) }, a.fx.interval)), this._trigger("open", c, { tooltip: g }), h = { keyup: function(b) { if (b.keyCode === a.ui.keyCode.ESCAPE) { var c = a.Event(b);
                                    c.currentTarget = d[0], this.close(c, !0) } }, remove: function() { this._removeTooltip(g) } }, c && "mouseover" !== c.type || (h.mouseleave = "close"), c && "focusin" !== c.type || (h.focusout = "close"), this._on(!0, d, h) } }, close: function(b) { var d = this,
                        e = a(b ? b.currentTarget : this.element),
                        f = this._find(e);
                    this.closing || (clearInterval(this.delayedShow), e.data("ui-tooltip-title") && e.attr("title", e.data("ui-tooltip-title")), c(e), f.stop(!0), this._hide(f, this.options.hide, function() { d._removeTooltip(a(this)) }), e.removeData("ui-tooltip-open"), this._off(e, "mouseleave focusout keyup"), e[0] !== this.element[0] && this._off(e, "remove"), this._off(this.document, "mousemove"), b && "mouseleave" === b.type && a.each(this.parents, function(b, c) { a(c.element).attr("title", c.title), delete d.parents[b] }), this.closing = !0, this._trigger("close", b, { tooltip: f }), this.closing = !1) }, _tooltip: function(b) { var c = "ui-tooltip-" + d++,
                        e = a("<div>").attr({ id: c, role: "tooltip" }).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || "")); return a("<div>").addClass("ui-tooltip-content").appendTo(e), e.appendTo(this.document[0].body), this.tooltips[c] = b, e }, _find: function(b) { var c = b.data("ui-tooltip-id"); return c ? a("#" + c) : a() }, _removeTooltip: function(a) { a.remove(), delete this.tooltips[a.attr("id")] }, _destroy: function() { var b = this;
                    a.each(this.tooltips, function(c, d) { var e = a.Event("blur");
                        e.target = e.currentTarget = d[0], b.close(e, !0), a("#" + c).remove(), d.data("ui-tooltip-title") && (d.attr("title", d.data("ui-tooltip-title")), d.removeData("ui-tooltip-title")) }) } }) }(a) }), define(function(require) { require("build/base"), seajs.use(["jquery", "module/common/load_file"], function(a) { 0 != a("#project_ppt").length && (seajs.use(["component/lightbox/lightbox-2.6.min", "component/Scrollbar/jquery.mCustomScrollbar.concat.min"], function() { a("#ppt_project_good").each(function() { var b = a(this).attr("data"),
                    c = a(this).attr("data-tpl");
                b && a(this).find("li").each(function() { b.indexOf(a(this).attr("data-id")) > -1 ? a(this).addClass("active").show() : a(this).remove() }), "pptb" == c ? a("img.J_part_img").each(function(b) { a(this).attr("src", "/assets/src/images/v6/bussiness-plan2/part_" + (b + 1) + ".png") }) : "pptc" == c && a("div.J_part_txt").each(function(b) { b += 1, a(this).text(10 > b ? "0" + b : b) }) }), a("#ppt_menu li").click(function() { var b = a(this).attr("i"),
                    c = a("#part_" + b).offset().top;
                a("html,body").animate({ scrollTop: c }) }) }), a("#ppt_internet_busmodel").each(function() { var b = a(this).find("li");
            1 == b.length && b.first().addClass("fn-pa").css("left", "430px"), 2 == b.length && (b.addClass("fn-pa"), b.first().css("left", "280px"), b.last().css("left", "580px")) }), a("#J_ppt_invite_bar_cls").click(function() { a("#J_ppt_invite_bar").remove() })) }), seajs.use("page/member/front_businesscard", function(a) { a.init(base_url) }); var a = function() { seajs.use(["jquery", "component/scroll_bar", "component/jquery.ustore", "component/SuperSlide/SuperSlide"], function(a) { var b = function() { if (window.Trjcn.LoginID) return a("#float-bottom-toolbar").remove(), !0; var b = new Date; return USTORE.init(), "undefined" == typeof USTORE || USTORE.getValue("login_username") || USTORE.getValue("closed_bottom_contact_bar") == b.getDate() || USTORE.getValue("closed_bottom_contact_project") == b.getDate() ? !0 : (a(".j-sll-bar .bottom-toolbar-close").on("click", function() { USTORE.setValue("closed_bottom_contact_project", b.getDate()), a(".j-sll-bar").remove() }), !1) },
                c = !b();
            c && (a("#float-bottom-toolbar").addClass("j-sll-bar").show(), a("#TA-submit").on("click", function() { if (!c) return alert("您已成功申请交换联系方式过了，不用再次申请"), a("#float-bottom-toolbar").removeClass("j-sll-bar").hide(), void 0; var b = a(".j-sll-bar .quick-register-tips"),
                    d = a("#TA-name"),
                    e = a("#TA-mobile"),
                    f = d.val(),
                    g = e.val(); return f && f != d.attr("tip") ? Trjcn.Util.isChinese(f) ? g && Trjcn.Util.isMobile(g) ? (Trjcn.Ajax.post("/api/guest/submit", "type=toolbar&name=" + f + "&mobile=" + g + "&fromurl=" + document.location.href, function(c) { 200 == c.code ? (alert("您已成功申请交换联系方式，稍候我们会将对方合作意向告知您"), USTORE.setValue("closed_bottom_contact_bar", (new Date).getDate()), a(".j-sll-bar").remove()) : 100 == c.code ? b.text("您已成功提交多次了") : 101 == c.code ? b.text("验证码不正确") : c.data && c.data.message && b.text(c.data.message) }), void 0) : (b.text("请输入您的真实手机号码"), e.focus(), void 0) : (b.text("请输入您的中文姓名"), d.focus(), void 0) : (b.text("请输入您的姓名"), d.focus(), void 0) })); var d = a(".m-xxfj-list"); for (d.find("li:last").css("border", "0"), i = 0; i < d.find("dt").find("span").length; i++) { var e = d.find("dt").find("span").eq(i).width();
                d.find("dt").eq(i).width(e), d.find("dd").eq(i).css("margin-left", e + 4 + "px") } }) };
    seajs.use(["component/SuperSlide/SuperSlide", "module/common/dialog", "module/common/login"], function(a, b, c) { $("#J_addfav").on("click", function() { var a = $(this); return "0" == window.Trjcn.LoginID ? (c.dialog(), void 0) : (b.dialog({ title: "温馨提示", ok: function() {}, ajax: { url: "/ajax/fav/zjxm.html", data: { item_id: $(this).data("id") }, dataType: "json", callback: function(b, c) { var d = "";
                        200 == b.code ? (d = "收藏成功", a.parent().html('<i class="m-icoAll m-ico7 right5"></i><span style="margin-left:20px;color:#666">已收藏</span>')) : d = b.data.message, c.content(d) } } }), void 0) }); var d = $("#J_pic_view");
        $("#J_pic_list").slide({ mainCell: "ul", vis: 4, prevCell: ".sPrev", nextCell: ".sNext", effect: "leftLoop" }), $("#J_pic_list li").on("mouseover", function() { d.attr("src", $(this).find("img").attr("src")) }), $("#J_send_to_phone").on("click", function() { b.dialog({ title: "免费发送至手机", lock: !0, fixed: !0, width: "550px", ajax: { url: "/zjxm/sendsms/step", data: { zjxm_id: zjxminfo_id }, callback: function(a, c) { 200 == a.code ? (c.content(a.data.html), $(".aui_main").css("padding", 0)) : (c.close(), b.dialog_ok(a.data.message || "网络错误，请重试")) } } }) }) }), seajs.use("module/ajax/ajax", function(a) {
        function b() { var a = $("#leave_messages a");
            a.filter('[event="page"]').click(function() { c.jsonp($(this).attr("url"), "", function(a) {
                    (a.code = 200) && ($("#leave_messages").html(a.html), $("#leave_msg_num").html(a.count), b(), a.page > 1 && (location.href = "#cm")) }) }).removeAttr("event") } var c = a();
        b() }), seajs.use(["jquery", "component/jquery-ui-tooltip/tooltip"], function(a) { a(".detail-info-dl dd").tooltip({ track: !0, tooltipClass: "custom-tooltip-style" }) }), seajs.use("page/v6/lib.history", function(a) { a.add(zjxminfo_id) }), seajs.use(["page/v6/openapi", "page/v6/lib.login_user", "page/v6/lib.zjxm_view"], function(b, c, d) { c.add_aftercall(function() { a(), seajs.use("page/v6/message", function(a) { a.initialize(window.Trjcn.LoginID, { type: 1, f_type: 2, uid: zjxmuser_id, username: zjxmuser_username, fid: zjxminfo_id, title: zjxminfo_title }) }) }), b.add_method(c), d.add_param("id", zjxminfo_id), b.add_method(d), b.docall() }) });