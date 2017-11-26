function TrjcnLogin() {
    var a = {
        state: !1,
        error_num: 0,
        is_ustore: !0,
        is_tip: !0,
        hinfo: !1,
        jump: !0,
        ver: "",
        form: null,
        test: function() {
            alert(this.error_num)
        },
        d: function(a) {
            return $("#" + a, this.form)
        },
        init: function(a) {
            this.form = $("#" + a);
            var b = this;
            if (b.is_ustore && "undefined" != typeof USTORE) {
                USTORE.init();
                var c = USTORE.getValue("login_username") || ""
            }
            c && b.d("login_username").val(c), b.d("yzimg_refresh").click(function() {
                b.d("yzimg").trigger("click")
            }), b.is_tip && b.d("login_username").focus(function() {
                $(this).attr("tip") == $(this).val() && $(this).val("")
            }).blur(function() {
                $(this).val() || $(this).val($(this).attr("tip"))
            }).trigger("blur"), $("#login_yzcode,#login_password", b.form).bind("keypress", function(a) {
                var c = window.event ? a.keyCode : a.which;
                13 == c && b.login()
            }), b.d("btn-login").click(function() {
                b.login()
            })
        },
        after: function() {
            return !0
        },
        login: function() {
            var a = this,
                b = a.d("btn-login"),
                c = a.d("login_username").val(),
                d = a.d("login_password").val(),
                e = a.d("login_yzcode").val();
            if (!c || c == a.d("login_username").attr("tip")) return a.login_msg("请输入用户名！"), a.d("login_username").focus(), void 0;
            if (!d) return a.login_msg("请输入密码！"), void 0;
            if (a.error_num >= 3 && !e) return a.login_msg("请输入验证码！"), void 0;
            if (a.login_msg(), a.state !== !0) {
                var f = function(d) {
                        if (a.error_num = d.error_num, 110 == d.code) return location.href = d.forward, void 0;
                        if (200 != d.code) {
                            if (a.login_msg(d.data.error_messages.result), a.error_num >= 3) {
                                var e = b.attr("data-error-url");
                                if (e) return location.href = e, void 0;
                                a.d("yzimg").trigger("click"), a.form.find(".J-yzm").show()
                            }
                            a.state = !1, b.find("i").html("登录")
                        } else {
                            if (!a.after()) return !1;
                            if (a.is_ustore && "undefined" != typeof USTORE && USTORE.setValue("login_username", c), a.hinfo) a.hinfo.html(d.data.user_info);
                            else if (a.jump) {
                                if (window.T_Config && "publish" == window.T_Config.page) return Trjcn.cache.dialog.close(), $("#T-cat-pid").val().substr(0, 4), Trjcn.LoginID = d.data.login_user_id, $("#T-userid").val(d.data.login_user_id), $("#userform").html(""), void 0;
                                var f = a.d("forword_url").val() || "";
                                location.href = f ? f : "/manage/home.html"
                            } else location.reload()
                        }
                    },
                    g = function() {
                        a.state = !1, b.find("i").html("登录"), a.login_msg("网络异常，请重试！")
                    },
                    h = 0;
                if (1 == a.d("is_auto_login").length) try {
                    h = a.d("is_auto_login").prop("checked")
                } catch (i) {
                    h = a.d("is_auto_login").attr("checked")
                }
                b.find("i").html("正在登录中"), Trjcn.Ajax.post("/login/check", "_=&type=box&username=" + c + "&password=" + d + "&login_yzcode=" + e + "&is_auto_login=" + h + "&ver=" + a.ver, f, g)
            }
        },
        login_tip: function(a) {
            var b = this;
            a ? b.d("login-msg").html(a).show() : b.d("login-msg").hide()
        },
        login_msg: function(a) {
            this.login_tip(a)
        }
    };
    return a
}

function MobileVoice(a) {
    switch (a) {
        case "phone":
            window.phoneCode.voice();
            break;
        default:
            window.mobileCode && window.mobileCode.voice()
    }
}

function TrjcnMobileCode() {
    var a = {
        mobile: null,
        mobileId: null,
        mobileHand: null,
        mobileInfoHand: null,
        mobileCaptchaMsg: "",
        process: !1,
        smsid: 0,
        time: 60,
        nt: 60,
        succMsg: "",
        btnType: "",
        setBtnVal: function(a) {
            return "input" == this.btnType ? this.btn.val(a) : this.btn.html(a)
        },
        interval: function() {
            var a, b = this,
                c = languages.codetime,
                d = function() {
                    b.time = b.time - 1, b.time > 0 ? b.setBtnVal(c.replace("[s]", b.time)).addClass("popup-code-cur").show() : (a && clearInterval(a), b.time = b.nt, b.setBtnVal(languages.mobile_btn).removeClass("popup-code-cur"), b.mobileInfoHand.html(b.succMsg).css({
                        display: "block"
                    }), b.mobileInfoHand.attr("data-code-msg", b.succMsg), $("#T-" + b.mobileId + "-voice-df").show(), b.mobileHand.removeAttr("readonly"))
                };
            a && clearInterval(a), d(), a = setInterval(d, 1e3)
        },
        voice: function() {
            var a = this;
            a.mobile && a.mobile == a.mobileHand.val() && a.smsid && !Trjcn.cache.voice && (Trjcn.cache.voice = !0, Trjcn.Ajax.post("/api/mobile_regcode_voice", "smsid=" + a.smsid, function(b) {
                if (Trjcn.cache.voice = !1, 200 == b.code) {
                    var c = "请准备接听来自125909888601的自动语音呼入电话";
                    a.mobileInfoHand.html(c).css({
                        display: "block"
                    }), a.mobileInfoHand.attr("data-code-msg", c), a.mobileHand.attr("readonly"), $("#T-" + a.mobileId + "-voice-df").hide(), 60 == a.time && a.interval()
                }
            }))
        },
        captcha: function() {
            var a = this;
            return $("#J_" + a.mobileId + "_captcha_img").length > 0 ? (a.mobileCaptchaMsg.html("请输入计算结果"), void 0) : (window.mobileSendBtn = $("#T-reg-" + a.mobileId + "-code"), "object" == typeof seajs && seajs.use(["jquery", "module/common/dialog"], function(b, c) {
                window.dlgCaptcha = c.dialog({
                    title: "请输入图片验证码",
                    content: '<article class="part-fieldset"><aside style="width:17%;text-align:right; float:left; color:#666666; height:30px; line-height:30px;">&nbsp;</aside><section class="part-fieldset-section" style="padding:0; display:inline-block; color:#999;"><input type="text" class="t_input w140" id="J_' + a.mobileId + '_captcha" maxlength="4" style="border-radius:5px;height:28px; border:1px solid #ddd; background:#fff; line-height:28px; padding:0 10px; width:248px; margin-right:5px; display:inline-block; vertical-align:middle; position:relative;"><img id="J_' + a.mobileId + '_captcha_img" style="vertical-align:middle;border-radius:5px;" src="/util/captcha_page.html?' + Math.random() + '" onclick="this.src=\'/util/captcha_page.html?\'+Math.random()" alt="验证码"> <span class="part-fieldset-msg" id="J_' + a.mobileId + '_captcha_msg" style="color:red"></span></section></article>',
                    ok: function() {
                        var c = b("#J_" + a.mobileId + "_captcha").val();
                        return c ? (window.captchaVal = c, window.mobileSendBtn.trigger("click"), !1) : (a.mobileCaptchaMsg.html("请输入计算结果"), !1)
                    }
                })
            }), void 0)
        },
        init: function(a, b) {
            var b = b || "/api/mobile_regcode_send",
                c = this;
            c.mobileId = a || "mobile", c.succMsg = languages.mobile_code_ok2;
            var d = ($("#J_" + c.mobileId + "_info"), $("#J_" + c.mobileId));
            c.mobileHand = d, c.mobileInfoHand = $("#J_" + c.mobileId + "_info"), c.mobileCaptcha = $("#J_" + c.mobileId + "_captcha"), c.mobileCaptchaMsg = $("#J_" + c.mobileId + "_captcha_msg"), c.process = !1, c.time = c.nt, window.captchaVal = "", $("#T-reg-" + c.mobileId + "-code").click(function() {
                if (c.time == c.nt && !c.process) {
                    var e = $(this),
                        f = d.val();
                    if (!f || "您的手机号码" == f) return a ? c.handmsg("请输入您的手机号码") : c.handmsg('<span><i class="icoPro16"></i>请输入您的手机号码</span>'), void 0;
                    if (!Trjcn.Util.isMobile(f)) return a ? c.handmsg("手机号码格式不对") : c.handmsg('<span><i class="icoPro16"></i>手机号码格式不对</span>'), void 0;
                    if (c.mobileCaptcha.length > 0 && c.mobileCaptcha.val() != c.mobileCaptcha.attr("tip") && (window.captchaVal = c.mobileCaptcha.val()), "" == window.captchaVal) return c.captcha(), void 0;
                    c.btn = c.btntxt = e, 1 == e.find("i").length && (c.btntxt = e.find("i"), languages.mobile_btn = c.btntxt.attr("label")), c.process = !0;
                    var g = function(b) {
                            if (b.time && (c.nt = parseInt(b.time)), b.data && b.data.time && (c.time = parseInt(b.data.time)), c.process = !1, c.mobileInfoHand.hide(), window.captchaVal = "", c.mobileCaptchaMsg.html(""), 520 == b.code) return c.captcha(), void 0;
                            if (521 == b.code) return $("#J_" + c.mobileId + "_captcha_img").trigger("click"), c.mobileCaptchaMsg.html("计算结果不正确").show(), void 0;
                            try {
                                window.dlgCaptcha && window.dlgCaptcha.close().remove()
                            } catch (d) {}
                            if (200 == b.code) c.smsid = b.data.smsid, c.mobile = f, c.mobileHand.attr("readonly", !0);
                            else {
                                if (203 != b.code) return c.handmsg(b.data.error).show(), $("#T-" + c.mobileId + "-voice-info").hide(), void 0;
                                c.smsid = b.data.smsid, c.mobile = f, c.mobileHand.attr("readonly", !0), c.time = parseInt(b.data.time)
                            }
                            b.data.smsid || (c.succMsg = languages.mobile_code_ok), $("#T-" + c.mobileId + "-voice-info").show(), c.mobileInfoHand.html(c.succMsg).css({
                                display: "block"
                            }), c.interval(), window.Trjcn.cache.voiceid = a
                        },
                        h = function() {
                            c.process = !1, c.handmsg("发送过于频繁请稍后再试！").css({
                                display: "block"
                            })
                        };
                    if (a) var i = "mobile=" + f;
                    else var i = "mobile=" + f + "&msg=common";
                    i += "&mobilecaptcha=" + window.captchaVal, Trjcn.Ajax.post(b, i, g, h)
                }
            })
        },
        init_page: function(a, b) {
            var b = b || "/api/mobile_regcode_send",
                c = this;
            c.mobileId = a || "mobile", c.succMsg = languages.mobile_code_ok2;
            var d = ($("#J_" + c.mobileId + "_info"), $("#J_" + c.mobileId));
            c.mobileHand = d, c.mobileInfoHand = $("#J_" + c.mobileId + "_info"), c.mobileCaptcha = $("#J_" + c.mobileId + "_captcha"), c.process = !1, c.time = c.nt, window.captchaVal = "", $("#T-reg-" + c.mobileId + "-code").click(function() {
                if (c.time == c.nt && !c.process) {
                    var e = $(this),
                        f = d.val();
                    if (!f || "您的手机号码" == f) return a ? c.handmsg("请输入您的手机号码") : c.handmsg('<span><i class="icoPro16"></i>请输入您的手机号码</span>'), void 0;
                    if (!Trjcn.Util.isMobile(f)) return a ? c.handmsg("手机号码格式不对") : c.handmsg('<span><i class="icoPro16"></i>手机号码格式不对</span>'), void 0;
                    if ($("#login_yzcode").length > 0 && (window.captchaVal = $("#login_yzcode").val()), "" == window.captchaVal || "输入计算结果" === window.captchaVal) return c.handmsg("请输入计算结果"), void 0;
                    c.btn = c.btntxt = e, 1 == e.find("i").length && (c.btntxt = e.find("i"), languages.mobile_btn = c.btntxt.attr("label")), c.process = !0;
                    var g = function(b) {
                            if (b.time && (c.nt = parseInt(b.time)), b.data && b.data.time && (c.time = parseInt(b.data.time)), c.process = !1, c.mobileInfoHand.hide(), window.captchaVal = "", 520 == b.code) return c.handmsg("请输入计算结果"), void 0;
                            if (521 == b.code) return $("#yzimg").trigger("click"), c.handmsg("计算结果不正确").show(), void 0;
                            try {
                                window.dlgCaptcha && window.dlgCaptcha.close().remove()
                            } catch (d) {}
                            if (200 == b.code) c.smsid = b.data.smsid, c.mobile = f, c.mobileHand.attr("readonly", !0);
                            else {
                                if (203 != b.code) return c.handmsg(b.data.error).show(), $("#T-" + c.mobileId + "-voice-info").hide(), void 0;
                                c.smsid = b.data.smsid, c.mobile = f, c.mobileHand.attr("readonly", !0), c.time = parseInt(b.data.time)
                            }
                            b.data.smsid || (c.succMsg = languages.mobile_code_ok), $("#T-" + c.mobileId + "-voice-info").show(), c.mobileInfoHand.html(c.succMsg).css({
                                display: "block"
                            }), c.interval(), window.Trjcn.cache.voiceid = a
                        },
                        h = function() {
                            c.process = !1, c.handmsg("发送过于频繁请稍后再试！").css({
                                display: "block"
                            })
                        };
                    if (a) var i = "mobile=" + f;
                    else var i = "mobile=" + f + "&msg=common";
                    i += "&mobilecaptcha=" + window.captchaVal, Trjcn.Ajax.post(b, i, g, h)
                }
            })
        },
        handmsg: function(a) {
            var b = this;
            return b.mobileInfoHand.html(a)
        }
    };
    return a
}

function TrjcnLogin() {
    var a = {
        state: !1,
        error_num: 0,
        is_ustore: !0,
        is_tip: !0,
        hinfo: !1,
        jump: !0,
        ver: "",
        form: null,
        test: function() {
            alert(this.error_num)
        },
        d: function(a) {
            return $("#" + a, this.form)
        },
        init: function(a) {
            this.form = $("#" + a);
            var b = this;
            if (b.is_ustore && "undefined" != typeof USTORE) {
                USTORE.init();
                var c = USTORE.getValue("login_username") || ""
            }
            c && b.d("login_username").val(c), b.d("yzimg_refresh").click(function() {
                b.d("yzimg").trigger("click")
            }), b.is_tip && b.d("login_username").focus(function() {
                $(this).attr("tip") == $(this).val() && $(this).val("")
            }).blur(function() {
                $(this).val() || $(this).val($(this).attr("tip"))
            }).trigger("blur"), $("#login_yzcode,#login_password", b.form).bind("keypress", function(a) {
                var c = window.event ? a.keyCode : a.which;
                13 == c && b.login()
            }), b.d("btn-login").click(function() {
                b.login()
            })
        },
        after: function() {
            return !0
        },
        login: function() {
            var a = this,
                b = a.d("btn-login"),
                c = a.d("login_username").val(),
                d = a.d("login_password").val(),
                e = a.d("login_yzcode").val();
            if (!c || c == a.d("login_username").attr("tip")) return a.login_msg("请输入用户名！"), a.d("login_username").focus(), void 0;
            if (!d) return a.login_msg("请输入密码！"), void 0;
            if (a.error_num >= 3 && !e) return a.login_msg("请输入验证码！"), void 0;
            if (a.login_msg(), a.state !== !0) {
                var f = function(d) {
                        if (a.error_num = d.error_num, 110 == d.code) return location.href = d.forward, void 0;
                        if (200 != d.code) {
                            if (a.login_msg(d.data.error_messages.result), a.error_num >= 3) {
                                var e = b.attr("data-error-url");
                                if (e) return location.href = e, void 0;
                                a.d("yzimg").trigger("click"), a.form.find(".J-yzm").show()
                            }
                            a.state = !1, b.find("i").html("登录")
                        } else {
                            if (!a.after()) return !1;
                            if (a.is_ustore && "undefined" != typeof USTORE && USTORE.setValue("login_username", c), a.hinfo) a.hinfo.html(d.data.user_info);
                            else if (a.jump) {
                                if (window.T_Config && "publish" == window.T_Config.page) return Trjcn.cache.dialog.close(), $("#T-cat-pid").val().substr(0, 4), Trjcn.LoginID = d.data.login_user_id, $("#T-userid").val(d.data.login_user_id), $("#userform").html(""), void 0;
                                var f = a.d("forword_url").val() || "";
                                location.href = f ? f : "/manage/home.html"
                            } else location.reload()
                        }
                    },
                    g = function() {
                        a.state = !1, b.find("i").html("登录"), a.login_msg("网络异常，请重试！")
                    },
                    h = 0;
                if (1 == a.d("is_auto_login").length) try {
                    h = a.d("is_auto_login").prop("checked")
                } catch (i) {
                    h = a.d("is_auto_login").attr("checked")
                }
                b.find("i").html("正在登录中"), Trjcn.Ajax.post("/login/check", "_=&type=box&username=" + c + "&password=" + d + "&login_yzcode=" + e + "&is_auto_login=" + h + "&ver=" + a.ver, f, g)
            }
        },
        login_tip: function(a) {
            var b = this;
            a ? b.d("login-msg").html(a).show() : b.d("login-msg").hide()
        },
        login_msg: function(a) {
            this.login_tip(a)
        }
    };
    return a
}

function MobileVoice(a) {
    switch (a) {
        case "phone":
            window.phoneCode.voice();
            break;
        default:
            window.mobileCode && window.mobileCode.voice()
    }
}

function TrjcnMobileCode() {
    var a = {
        mobile: null,
        mobileId: null,
        mobileHand: null,
        mobileInfoHand: null,
        mobileCaptchaMsg: "",
        process: !1,
        smsid: 0,
        time: 60,
        nt: 60,
        succMsg: "",
        btnType: "",
        setBtnVal: function(a) {
            return "input" == this.btnType ? this.btn.val(a) : this.btn.html(a)
        },
        interval: function() {
            var a, b = this,
                c = languages.codetime,
                d = function() {
                    b.time = b.time - 1, b.time > 0 ? b.setBtnVal(c.replace("[s]", b.time)).addClass("popup-code-cur").show() : (a && clearInterval(a), b.time = b.nt, b.setBtnVal(languages.mobile_btn).removeClass("popup-code-cur"), b.mobileInfoHand.html(b.succMsg).css({
                        display: "block"
                    }), b.mobileInfoHand.attr("data-code-msg", b.succMsg), $("#T-" + b.mobileId + "-voice-df").show(), b.mobileHand.removeAttr("readonly"))
                };
            a && clearInterval(a), d(), a = setInterval(d, 1e3)
        },
        voice: function() {
            var a = this;
            a.mobile && a.mobile == a.mobileHand.val() && a.smsid && !Trjcn.cache.voice && (Trjcn.cache.voice = !0, Trjcn.Ajax.post("/api/mobile_regcode_voice", "smsid=" + a.smsid, function(b) {
                if (Trjcn.cache.voice = !1, 200 == b.code) {
                    var c = "请准备接听来自125909888601的自动语音呼入电话";
                    a.mobileInfoHand.html(c).css({
                        display: "block"
                    }), a.mobileInfoHand.attr("data-code-msg", c), a.mobileHand.attr("readonly"), $("#T-" + a.mobileId + "-voice-df").hide(), 60 == a.time && a.interval()
                }
            }))
        },
        captcha: function() {
            var a = this;
            return $("#J_" + a.mobileId + "_captcha_img").length > 0 ? (a.mobileCaptchaMsg.html("请输入计算结果"), void 0) : (window.mobileSendBtn = $("#T-reg-" + a.mobileId + "-code"), "object" == typeof seajs && seajs.use(["jquery", "module/common/dialog"], function(b, c) {
                window.dlgCaptcha = c.dialog({
                    title: "请输入图片验证码",
                    content: '<article class="part-fieldset"><aside style="width:17%;text-align:right; float:left; color:#666666; height:30px; line-height:30px;">&nbsp;</aside><section class="part-fieldset-section" style="padding:0; display:inline-block; color:#999;"><input type="text" class="t_input w140" id="J_' + a.mobileId + '_captcha" maxlength="4" style="border-radius:5px;height:28px; border:1px solid #ddd; background:#fff; line-height:28px; padding:0 10px; width:248px; margin-right:5px; display:inline-block; vertical-align:middle; position:relative;"><img id="J_' + a.mobileId + '_captcha_img" style="vertical-align:middle;border-radius:5px;" src="/util/captcha_page.html?' + Math.random() + '" onclick="this.src=\'/util/captcha_page.html?\'+Math.random()" alt="验证码"> <span class="part-fieldset-msg" id="J_' + a.mobileId + '_captcha_msg" style="color:red"></span></section></article>',
                    ok: function() {
                        var c = b("#J_" + a.mobileId + "_captcha").val();
                        return c ? (window.captchaVal = c, window.mobileSendBtn.trigger("click"), !1) : (a.mobileCaptchaMsg.html("请输入计算结果"), !1)
                    }
                })
            }), void 0)
        },
        init: function(a, b) {
            var b = b || "/api/mobile_regcode_send",
                c = this;
            c.mobileId = a || "mobile", c.succMsg = languages.mobile_code_ok2;
            var d = ($("#J_" + c.mobileId + "_info"), $("#J_" + c.mobileId));
            c.mobileHand = d, c.mobileInfoHand = $("#J_" + c.mobileId + "_info"), c.mobileCaptcha = $("#J_" + c.mobileId + "_captcha"), c.mobileCaptchaMsg = $("#J_" + c.mobileId + "_captcha_msg"), c.process = !1, c.time = c.nt, window.captchaVal = "", $("#T-reg-" + c.mobileId + "-code").click(function() {
                if (c.time == c.nt && !c.process) {
                    var e = $(this),
                        f = d.val();
                    if (!f || "您的手机号码" == f) return a ? c.handmsg("请输入您的手机号码") : c.handmsg('<span><i class="icoPro16"></i>请输入您的手机号码</span>'), void 0;
                    if (!Trjcn.Util.isMobile(f)) return a ? c.handmsg("手机号码格式不对") : c.handmsg('<span><i class="icoPro16"></i>手机号码格式不对</span>'), void 0;
                    if (c.mobileCaptcha.length > 0 && c.mobileCaptcha.val() != c.mobileCaptcha.attr("tip") && (window.captchaVal = c.mobileCaptcha.val()), "" == window.captchaVal) return c.captcha(), void 0;
                    c.btn = c.btntxt = e, 1 == e.find("i").length && (c.btntxt = e.find("i"), languages.mobile_btn = c.btntxt.attr("label")), c.process = !0;
                    var g = function(b) {
                            if (b.time && (c.nt = parseInt(b.time)), b.data && b.data.time && (c.time = parseInt(b.data.time)), c.process = !1, c.mobileInfoHand.hide(), window.captchaVal = "", c.mobileCaptchaMsg.html(""), 520 == b.code) return c.captcha(), void 0;
                            if (521 == b.code) return $("#J_" + c.mobileId + "_captcha_img").trigger("click"), c.mobileCaptchaMsg.html("计算结果不正确").show(), void 0;
                            try {
                                window.dlgCaptcha && window.dlgCaptcha.close().remove()
                            } catch (d) {}
                            if (200 == b.code) c.smsid = b.data.smsid, c.mobile = f, c.mobileHand.attr("readonly", !0);
                            else {
                                if (203 != b.code) return c.handmsg(b.data.error).show(), $("#T-" + c.mobileId + "-voice-info").hide(), void 0;
                                c.smsid = b.data.smsid, c.mobile = f, c.mobileHand.attr("readonly", !0), c.time = parseInt(b.data.time)
                            }
                            b.data.smsid || (c.succMsg = languages.mobile_code_ok), $("#T-" + c.mobileId + "-voice-info").show(), c.mobileInfoHand.html(c.succMsg).css({
                                display: "block"
                            }), c.interval(), window.Trjcn.cache.voiceid = a
                        },
                        h = function() {
                            c.process = !1, c.handmsg("发送过于频繁请稍后再试！").css({
                                display: "block"
                            })
                        };
                    if (a) var i = "mobile=" + f;
                    else var i = "mobile=" + f + "&msg=common";
                    i += "&mobilecaptcha=" + window.captchaVal, Trjcn.Ajax.post(b, i, g, h)
                }
            })
        },
        init_page: function(a, b) {
            var b = b || "/api/mobile_regcode_send",
                c = this;
            c.mobileId = a || "mobile", c.succMsg = languages.mobile_code_ok2;
            var d = ($("#J_" + c.mobileId + "_info"), $("#J_" + c.mobileId));
            c.mobileHand = d, c.mobileInfoHand = $("#J_" + c.mobileId + "_info"), c.mobileCaptcha = $("#J_" + c.mobileId + "_captcha"), c.process = !1, c.time = c.nt, window.captchaVal = "", $("#T-reg-" + c.mobileId + "-code").click(function() {
                if (c.time == c.nt && !c.process) {
                    var e = $(this),
                        f = d.val();
                    if (!f || "您的手机号码" == f) return a ? c.handmsg("请输入您的手机号码") : c.handmsg('<span><i class="icoPro16"></i>请输入您的手机号码</span>'), void 0;
                    if (!Trjcn.Util.isMobile(f)) return a ? c.handmsg("手机号码格式不对") : c.handmsg('<span><i class="icoPro16"></i>手机号码格式不对</span>'), void 0;
                    if ($("#login_yzcode").length > 0 && (window.captchaVal = $("#login_yzcode").val()), "" == window.captchaVal || "输入计算结果" === window.captchaVal) return c.handmsg("请输入计算结果"), void 0;
                    c.btn = c.btntxt = e, 1 == e.find("i").length && (c.btntxt = e.find("i"), languages.mobile_btn = c.btntxt.attr("label")), c.process = !0;
                    var g = function(b) {
                            if (b.time && (c.nt = parseInt(b.time)), b.data && b.data.time && (c.time = parseInt(b.data.time)), c.process = !1, c.mobileInfoHand.hide(), window.captchaVal = "", 520 == b.code) return c.handmsg("请输入计算结果"), void 0;
                            if (521 == b.code) return $("#yzimg").trigger("click"), c.handmsg("计算结果不正确").show(), void 0;
                            try {
                                window.dlgCaptcha && window.dlgCaptcha.close().remove()
                            } catch (d) {}
                            if (200 == b.code) c.smsid = b.data.smsid, c.mobile = f, c.mobileHand.attr("readonly", !0);
                            else {
                                if (203 != b.code) return c.handmsg(b.data.error).show(), $("#T-" + c.mobileId + "-voice-info").hide(), void 0;
                                c.smsid = b.data.smsid, c.mobile = f, c.mobileHand.attr("readonly", !0), c.time = parseInt(b.data.time)
                            }
                            b.data.smsid || (c.succMsg = languages.mobile_code_ok), $("#T-" + c.mobileId + "-voice-info").show(), c.mobileInfoHand.html(c.succMsg).css({
                                display: "block"
                            }), c.interval(), window.Trjcn.cache.voiceid = a
                        },
                        h = function() {
                            c.process = !1, c.handmsg("发送过于频繁请稍后再试！").css({
                                display: "block"
                            })
                        };
                    if (a) var i = "mobile=" + f;
                    else var i = "mobile=" + f + "&msg=common";
                    i += "&mobilecaptcha=" + window.captchaVal, Trjcn.Ajax.post(b, i, g, h)
                }
            })
        },
        handmsg: function(a) {
            var b = this;
            return b.mobileInfoHand.html(a)
        }
    };
    return a
}! function(a, b) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = a.document ? b(a, !0) : function(a) {
        if (!a.document) throw new Error("jQuery requires a window with a document");
        return b(a)
    } : b(a)
}("undefined" != typeof window ? window : this, function(a, b) {
    function c(a) {
        var b = !!a && "length" in a && a.length,
            c = nb.type(a);
        return "function" === c || nb.isWindow(a) ? !1 : "array" === c || 0 === b || "number" == typeof b && b > 0 && b - 1 in a
    }

    function d(a, b, c) {
        if (nb.isFunction(b)) return nb.grep(a, function(a, d) {
            return !!b.call(a, d, a) !== c
        });
        if (b.nodeType) return nb.grep(a, function(a) {
            return a === b !== c
        });
        if ("string" == typeof b) {
            if (xb.test(b)) return nb.filter(b, a, c);
            b = nb.filter(b, a)
        }
        return nb.grep(a, function(a) {
            return nb.inArray(a, b) > -1 !== c
        })
    }

    function e(a, b) {
        do a = a[b]; while (a && 1 !== a.nodeType);
        return a
    }

    function f(a) {
        var b = {};
        return nb.each(a.match(Db) || [], function(a, c) {
            b[c] = !0
        }), b
    }

    function g() {
        db.addEventListener ? (db.removeEventListener("DOMContentLoaded", h), a.removeEventListener("load", h)) : (db.detachEvent("onreadystatechange", h), a.detachEvent("onload", h))
    }

    function h() {
        (db.addEventListener || "load" === a.event.type || "complete" === db.readyState) && (g(), nb.ready())
    }

    function i(a, b, c) {
        if (void 0 === c && 1 === a.nodeType) {
            var d = "data-" + b.replace(Ib, "-$1").toLowerCase();
            if (c = a.getAttribute(d), "string" == typeof c) {
                try {
                    c = "true" === c ? !0 : "false" === c ? !1 : "null" === c ? null : +c + "" === c ? +c : Hb.test(c) ? nb.parseJSON(c) : c
                } catch (e) {}
                nb.data(a, b, c)
            } else c = void 0
        }
        return c
    }

    function j(a) {
        var b;
        for (b in a)
            if (("data" !== b || !nb.isEmptyObject(a[b])) && "toJSON" !== b) return !1;
        return !0
    }

    function k(a, b, c, d) {
        if (Gb(a)) {
            var e, f, g = nb.expando,
                h = a.nodeType,
                i = h ? nb.cache : a,
                j = h ? a[g] : a[g] && g;
            if (j && i[j] && (d || i[j].data) || void 0 !== c || "string" != typeof b) return j || (j = h ? a[g] = cb.pop() || nb.guid++ : g), i[j] || (i[j] = h ? {} : {
                toJSON: nb.noop
            }), "object" != typeof b && "function" != typeof b || (d ? i[j] = nb.extend(i[j], b) : i[j].data = nb.extend(i[j].data, b)), f = i[j], d || (f.data || (f.data = {}), f = f.data), void 0 !== c && (f[nb.camelCase(b)] = c), "string" == typeof b ? (e = f[b], null == e && (e = f[nb.camelCase(b)])) : e = f, e
        }
    }

    function l(a, b, c) {
        if (Gb(a)) {
            var d, e, f = a.nodeType,
                g = f ? nb.cache : a,
                h = f ? a[nb.expando] : nb.expando;
            if (g[h]) {
                if (b && (d = c ? g[h] : g[h].data)) {
                    nb.isArray(b) ? b = b.concat(nb.map(b, nb.camelCase)) : b in d ? b = [b] : (b = nb.camelCase(b), b = b in d ? [b] : b.split(" ")), e = b.length;
                    for (; e--;) delete d[b[e]];
                    if (c ? !j(d) : !nb.isEmptyObject(d)) return
                }(c || (delete g[h].data, j(g[h]))) && (f ? nb.cleanData([a], !0) : lb.deleteExpando || g != g.window ? delete g[h] : g[h] = void 0)
            }
        }
    }

    function m(a, b, c, d) {
        var e, f = 1,
            g = 20,
            h = d ? function() {
                return d.cur()
            } : function() {
                return nb.css(a, b, "")
            },
            i = h(),
            j = c && c[3] || (nb.cssNumber[b] ? "" : "px"),
            k = (nb.cssNumber[b] || "px" !== j && +i) && Kb.exec(nb.css(a, b));
        if (k && k[3] !== j) {
            j = j || k[3], c = c || [], k = +i || 1;
            do f = f || ".5", k /= f, nb.style(a, b, k + j); while (f !== (f = h() / i) && 1 !== f && --g)
        }
        return c && (k = +k || +i || 0, e = c[1] ? k + (c[1] + 1) * c[2] : +c[2], d && (d.unit = j, d.start = k, d.end = e)), e
    }

    function n(a) {
        var b = Sb.split("|"),
            c = a.createDocumentFragment();
        if (c.createElement)
            for (; b.length;) c.createElement(b.pop());
        return c
    }

    function o(a, b) {
        var c, d, e = 0,
            f = "undefined" != typeof a.getElementsByTagName ? a.getElementsByTagName(b || "*") : "undefined" != typeof a.querySelectorAll ? a.querySelectorAll(b || "*") : void 0;
        if (!f)
            for (f = [], c = a.childNodes || a; null != (d = c[e]); e++) !b || nb.nodeName(d, b) ? f.push(d) : nb.merge(f, o(d, b));
        return void 0 === b || b && nb.nodeName(a, b) ? nb.merge([a], f) : f
    }

    function p(a, b) {
        for (var c, d = 0; null != (c = a[d]); d++) nb._data(c, "globalEval", !b || nb._data(b[d], "globalEval"))
    }

    function q(a) {
        Ob.test(a.type) && (a.defaultChecked = a.checked)
    }

    function r(a, b, c, d, e) {
        for (var f, g, h, i, j, k, l, m = a.length, r = n(b), s = [], t = 0; m > t; t++)
            if (g = a[t], g || 0 === g)
                if ("object" === nb.type(g)) nb.merge(s, g.nodeType ? [g] : g);
                else if (Ub.test(g)) {
            for (i = i || r.appendChild(b.createElement("div")), j = (Pb.exec(g) || ["", ""])[1].toLowerCase(), l = Tb[j] || Tb._default, i.innerHTML = l[1] + nb.htmlPrefilter(g) + l[2], f = l[0]; f--;) i = i.lastChild;
            if (!lb.leadingWhitespace && Rb.test(g) && s.push(b.createTextNode(Rb.exec(g)[0])), !lb.tbody)
                for (g = "table" !== j || Vb.test(g) ? "<table>" !== l[1] || Vb.test(g) ? 0 : i : i.firstChild, f = g && g.childNodes.length; f--;) nb.nodeName(k = g.childNodes[f], "tbody") && !k.childNodes.length && g.removeChild(k);
            for (nb.merge(s, i.childNodes), i.textContent = ""; i.firstChild;) i.removeChild(i.firstChild);
            i = r.lastChild
        } else s.push(b.createTextNode(g));
        for (i && r.removeChild(i), lb.appendChecked || nb.grep(o(s, "input"), q), t = 0; g = s[t++];)
            if (d && nb.inArray(g, d) > -1) e && e.push(g);
            else if (h = nb.contains(g.ownerDocument, g), i = o(r.appendChild(g), "script"), h && p(i), c)
            for (f = 0; g = i[f++];) Qb.test(g.type || "") && c.push(g);
        return i = null, r
    }

    function s() {
        return !0
    }

    function t() {
        return !1
    }

    function u() {
        try {
            return db.activeElement
        } catch (a) {}
    }

    function v(a, b, c, d, e, f) {
        var g, h;
        if ("object" == typeof b) {
            "string" != typeof c && (d = d || c, c = void 0);
            for (h in b) v(a, h, c, d, b[h], f);
            return a
        }
        if (null == d && null == e ? (e = c, d = c = void 0) : null == e && ("string" == typeof c ? (e = d, d = void 0) : (e = d, d = c, c = void 0)), e === !1) e = t;
        else if (!e) return a;
        return 1 === f && (g = e, e = function(a) {
            return nb().off(a), g.apply(this, arguments)
        }, e.guid = g.guid || (g.guid = nb.guid++)), a.each(function() {
            nb.event.add(this, b, e, d, c)
        })
    }

    function w(a, b) {
        return nb.nodeName(a, "table") && nb.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a
    }

    function x(a) {
        return a.type = (null !== nb.find.attr(a, "type")) + "/" + a.type, a
    }

    function y(a) {
        var b = ec.exec(a.type);
        return b ? a.type = b[1] : a.removeAttribute("type"), a
    }

    function z(a, b) {
        if (1 === b.nodeType && nb.hasData(a)) {
            var c, d, e, f = nb._data(a),
                g = nb._data(b, f),
                h = f.events;
            if (h) {
                delete g.handle, g.events = {};
                for (c in h)
                    for (d = 0, e = h[c].length; e > d; d++) nb.event.add(b, c, h[c][d])
            }
            g.data && (g.data = nb.extend({}, g.data))
        }
    }

    function A(a, b) {
        var c, d, e;
        if (1 === b.nodeType) {
            if (c = b.nodeName.toLowerCase(), !lb.noCloneEvent && b[nb.expando]) {
                e = nb._data(b);
                for (d in e.events) nb.removeEvent(b, d, e.handle);
                b.removeAttribute(nb.expando)
            }
            "script" === c && b.text !== a.text ? (x(b).text = a.text, y(b)) : "object" === c ? (b.parentNode && (b.outerHTML = a.outerHTML), lb.html5Clone && a.innerHTML && !nb.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : "input" === c && Ob.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : "option" === c ? b.defaultSelected = b.selected = a.defaultSelected : "input" !== c && "textarea" !== c || (b.defaultValue = a.defaultValue)
        }
    }

    function B(a, b, c, d) {
        b = fb.apply([], b);
        var e, f, g, h, i, j, k = 0,
            l = a.length,
            m = l - 1,
            n = b[0],
            p = nb.isFunction(n);
        if (p || l > 1 && "string" == typeof n && !lb.checkClone && dc.test(n)) return a.each(function(e) {
            var f = a.eq(e);
            p && (b[0] = n.call(this, e, f.html())), B(f, b, c, d)
        });
        if (l && (j = r(b, a[0].ownerDocument, !1, a, d), e = j.firstChild, 1 === j.childNodes.length && (j = e), e || d)) {
            for (h = nb.map(o(j, "script"), x), g = h.length; l > k; k++) f = j, k !== m && (f = nb.clone(f, !0, !0), g && nb.merge(h, o(f, "script"))), c.call(a[k], f, k);
            if (g)
                for (i = h[h.length - 1].ownerDocument, nb.map(h, y), k = 0; g > k; k++) f = h[k], Qb.test(f.type || "") && !nb._data(f, "globalEval") && nb.contains(i, f) && (f.src ? nb._evalUrl && nb._evalUrl(f.src) : nb.globalEval((f.text || f.textContent || f.innerHTML || "").replace(fc, "")));
            j = e = null
        }
        return a
    }

    function C(a, b, c) {
        for (var d, e = b ? nb.filter(b, a) : a, f = 0; null != (d = e[f]); f++) c || 1 !== d.nodeType || nb.cleanData(o(d)), d.parentNode && (c && nb.contains(d.ownerDocument, d) && p(o(d, "script")), d.parentNode.removeChild(d));
        return a
    }

    function D(a, b) {
        var c = nb(b.createElement(a)).appendTo(b.body),
            d = nb.css(c[0], "display");
        return c.detach(), d
    }

    function E(a) {
        var b = db,
            c = jc[a];
        return c || (c = D(a, b), "none" !== c && c || (ic = (ic || nb("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = (ic[0].contentWindow || ic[0].contentDocument).document, b.write(), b.close(), c = D(a, b), ic.detach()), jc[a] = c), c
    }

    function F(a, b) {
        return {
            get: function() {
                return a() ? void delete this.get : (this.get = b).apply(this, arguments)
            }
        }
    }

    function G(a) {
        if (a in yc) return a;
        for (var b = a.charAt(0).toUpperCase() + a.slice(1), c = xc.length; c--;)
            if (a = xc[c] + b, a in yc) return a
    }

    function H(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++) d = a[g], d.style && (f[g] = nb._data(d, "olddisplay"), c = d.style.display, b ? (f[g] || "none" !== c || (d.style.display = ""), "" === d.style.display && Mb(d) && (f[g] = nb._data(d, "olddisplay", E(d.nodeName)))) : (e = Mb(d), (c && "none" !== c || !e) && nb._data(d, "olddisplay", e ? c : nb.css(d, "display"))));
        for (g = 0; h > g; g++) d = a[g], d.style && (b && "none" !== d.style.display && "" !== d.style.display || (d.style.display = b ? f[g] || "" : "none"));
        return a
    }

    function I(a, b, c) {
        var d = uc.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b
    }

    function J(a, b, c, d, e) {
        for (var f = c === (d ? "border" : "content") ? 4 : "width" === b ? 1 : 0, g = 0; 4 > f; f += 2) "margin" === c && (g += nb.css(a, c + Lb[f], !0, e)), d ? ("content" === c && (g -= nb.css(a, "padding" + Lb[f], !0, e)), "margin" !== c && (g -= nb.css(a, "border" + Lb[f] + "Width", !0, e))) : (g += nb.css(a, "padding" + Lb[f], !0, e), "padding" !== c && (g += nb.css(a, "border" + Lb[f] + "Width", !0, e)));
        return g
    }

    function K(a, b, c) {
        var d = !0,
            e = "width" === b ? a.offsetWidth : a.offsetHeight,
            f = oc(a),
            g = lb.boxSizing && "border-box" === nb.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (e = pc(a, b, f), (0 > e || null == e) && (e = a.style[b]), lc.test(e)) return e;
            d = g && (lb.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0
        }
        return e + J(a, b, c || (g ? "border" : "content"), d, f) + "px"
    }

    function L(a, b, c, d, e) {
        return new L.prototype.init(a, b, c, d, e)
    }

    function M() {
        return a.setTimeout(function() {
            zc = void 0
        }), zc = nb.now()
    }

    function N(a, b) {
        var c, d = {
                height: a
            },
            e = 0;
        for (b = b ? 1 : 0; 4 > e; e += 2 - b) c = Lb[e], d["margin" + c] = d["padding" + c] = a;
        return b && (d.opacity = d.width = a), d
    }

    function O(a, b, c) {
        for (var d, e = (R.tweeners[b] || []).concat(R.tweeners["*"]), f = 0, g = e.length; g > f; f++)
            if (d = e[f].call(c, b, a)) return d
    }

    function P(a, b, c) {
        var d, e, f, g, h, i, j, k, l = this,
            m = {},
            n = a.style,
            o = a.nodeType && Mb(a),
            p = nb._data(a, "fxshow");
        c.queue || (h = nb._queueHooks(a, "fx"), null == h.unqueued && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() {
            h.unqueued || i()
        }), h.unqueued++, l.always(function() {
            l.always(function() {
                h.unqueued--, nb.queue(a, "fx").length || h.empty.fire()
            })
        })), 1 === a.nodeType && ("height" in b || "width" in b) && (c.overflow = [n.overflow, n.overflowX, n.overflowY], j = nb.css(a, "display"), k = "none" === j ? nb._data(a, "olddisplay") || E(a.nodeName) : j, "inline" === k && "none" === nb.css(a, "float") && (lb.inlineBlockNeedsLayout && "inline" !== E(a.nodeName) ? n.zoom = 1 : n.display = "inline-block")), c.overflow && (n.overflow = "hidden", lb.shrinkWrapBlocks() || l.always(function() {
            n.overflow = c.overflow[0], n.overflowX = c.overflow[1], n.overflowY = c.overflow[2]
        }));
        for (d in b)
            if (e = b[d], Bc.exec(e)) {
                if (delete b[d], f = f || "toggle" === e, e === (o ? "hide" : "show")) {
                    if ("show" !== e || !p || void 0 === p[d]) continue;
                    o = !0
                }
                m[d] = p && p[d] || nb.style(a, d)
            } else j = void 0;
        if (nb.isEmptyObject(m)) "inline" === ("none" === j ? E(a.nodeName) : j) && (n.display = j);
        else {
            p ? "hidden" in p && (o = p.hidden) : p = nb._data(a, "fxshow", {}), f && (p.hidden = !o), o ? nb(a).show() : l.done(function() {
                nb(a).hide()
            }), l.done(function() {
                var b;
                nb._removeData(a, "fxshow");
                for (b in m) nb.style(a, b, m[b])
            });
            for (d in m) g = O(o ? p[d] : 0, d, l), d in p || (p[d] = g.start, o && (g.end = g.start, g.start = "width" === d || "height" === d ? 1 : 0))
        }
    }

    function Q(a, b) {
        var c, d, e, f, g;
        for (c in a)
            if (d = nb.camelCase(c), e = b[d], f = a[c], nb.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = nb.cssHooks[d], g && "expand" in g) {
                f = g.expand(f), delete a[d];
                for (c in f) c in a || (a[c] = f[c], b[c] = e)
            } else b[d] = e
    }

    function R(a, b, c) {
        var d, e, f = 0,
            g = R.prefilters.length,
            h = nb.Deferred().always(function() {
                delete i.elem
            }),
            i = function() {
                if (e) return !1;
                for (var b = zc || M(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++) j.tweens[g].run(f);
                return h.notifyWith(a, [j, f, c]), 1 > f && i ? c : (h.resolveWith(a, [j]), !1)
            },
            j = h.promise({
                elem: a,
                props: nb.extend({}, b),
                opts: nb.extend(!0, {
                    specialEasing: {},
                    easing: nb.easing._default
                }, c),
                originalProperties: b,
                originalOptions: c,
                startTime: zc || M(),
                duration: c.duration,
                tweens: [],
                createTween: function(b, c) {
                    var d = nb.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing);
                    return j.tweens.push(d), d
                },
                stop: function(b) {
                    var c = 0,
                        d = b ? j.tweens.length : 0;
                    if (e) return this;
                    for (e = !0; d > c; c++) j.tweens[c].run(1);
                    return b ? (h.notifyWith(a, [j, 1, 0]), h.resolveWith(a, [j, b])) : h.rejectWith(a, [j, b]), this
                }
            }),
            k = j.props;
        for (Q(k, j.opts.specialEasing); g > f; f++)
            if (d = R.prefilters[f].call(j, a, k, j.opts)) return nb.isFunction(d.stop) && (nb._queueHooks(j.elem, j.opts.queue).stop = nb.proxy(d.stop, d)), d;
        return nb.map(k, O, j), nb.isFunction(j.opts.start) && j.opts.start.call(a, j), nb.fx.timer(nb.extend(i, {
            elem: a,
            anim: j,
            queue: j.opts.queue
        })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always)
    }

    function S(a) {
        return nb.attr(a, "class") || ""
    }

    function T(a) {
        return function(b, c) {
            "string" != typeof b && (c = b, b = "*");
            var d, e = 0,
                f = b.toLowerCase().match(Db) || [];
            if (nb.isFunction(c))
                for (; d = f[e++];) "+" === d.charAt(0) ? (d = d.slice(1) || "*", (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c)
        }
    }

    function U(a, b, c, d) {
        function e(h) {
            var i;
            return f[h] = !0, nb.each(a[h] || [], function(a, h) {
                var j = h(b, c, d);
                return "string" != typeof j || g || f[j] ? g ? !(i = j) : void 0 : (b.dataTypes.unshift(j), e(j), !1)
            }), i
        }
        var f = {},
            g = a === $c;
        return e(b.dataTypes[0]) || !f["*"] && e("*")
    }

    function V(a, b) {
        var c, d, e = nb.ajaxSettings.flatOptions || {};
        for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
        return c && nb.extend(!0, a, c), a
    }

    function W(a, b, c) {
        for (var d, e, f, g, h = a.contents, i = a.dataTypes;
            "*" === i[0];) i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader("Content-Type"));
        if (e)
            for (g in h)
                if (h[g] && h[g].test(e)) {
                    i.unshift(g);
                    break
                }
        if (i[0] in c) f = i[0];
        else {
            for (g in c) {
                if (!i[0] || a.converters[g + " " + i[0]]) {
                    f = g;
                    break
                }
                d || (d = g)
            }
            f = f || d
        }
        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0
    }

    function X(a, b, c, d) {
        var e, f, g, h, i, j = {},
            k = a.dataTypes.slice();
        if (k[1])
            for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        for (f = k.shift(); f;)
            if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift())
                if ("*" === f) f = i;
                else if ("*" !== i && i !== f) {
            if (g = j[i + " " + f] || j["* " + f], !g)
                for (e in j)
                    if (h = e.split(" "), h[1] === f && (g = j[i + " " + h[0]] || j["* " + h[0]])) {
                        g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1]));
                        break
                    }
            if (g !== !0)
                if (g && a["throws"]) b = g(b);
                else try {
                    b = g(b)
                } catch (l) {
                    return {
                        state: "parsererror",
                        error: g ? l : "No conversion from " + i + " to " + f
                    }
                }
        }
        return {
            state: "success",
            data: b
        }
    }

    function Y(a) {
        return a.style && a.style.display || nb.css(a, "display")
    }

    function Z(a) {
        if (!nb.contains(a.ownerDocument || db, a)) return !0;
        for (; a && 1 === a.nodeType;) {
            if ("none" === Y(a) || "hidden" === a.type) return !0;
            a = a.parentNode
        }
        return !1
    }

    function $(a, b, c, d) {
        var e;
        if (nb.isArray(b)) nb.each(b, function(b, e) {
            c || dd.test(a) ? d(a, e) : $(a + "[" + ("object" == typeof e && null != e ? b : "") + "]", e, c, d)
        });
        else if (c || "object" !== nb.type(b)) d(a, b);
        else
            for (e in b) $(a + "[" + e + "]", b[e], c, d)
    }

    function _() {
        try {
            return new a.XMLHttpRequest
        } catch (b) {}
    }

    function ab() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP")
        } catch (b) {}
    }

    function bb(a) {
        return nb.isWindow(a) ? a : 9 === a.nodeType ? a.defaultView || a.parentWindow : !1
    }
    var cb = [],
        db = a.document,
        eb = cb.slice,
        fb = cb.concat,
        gb = cb.push,
        hb = cb.indexOf,
        ib = {},
        jb = ib.toString,
        kb = ib.hasOwnProperty,
        lb = {},
        mb = "1.12.4",
        nb = function(a, b) {
            return new nb.fn.init(a, b)
        },
        ob = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        pb = /^-ms-/,
        qb = /-([\da-z])/gi,
        rb = function(a, b) {
            return b.toUpperCase()
        };
    nb.fn = nb.prototype = {
        jquery: mb,
        constructor: nb,
        selector: "",
        length: 0,
        toArray: function() {
            return eb.call(this)
        },
        get: function(a) {
            return null != a ? 0 > a ? this[a + this.length] : this[a] : eb.call(this)
        },
        pushStack: function(a) {
            var b = nb.merge(this.constructor(), a);
            return b.prevObject = this, b.context = this.context, b
        },
        each: function(a) {
            return nb.each(this, a)
        },
        map: function(a) {
            return this.pushStack(nb.map(this, function(b, c) {
                return a.call(b, c, b)
            }))
        },
        slice: function() {
            return this.pushStack(eb.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(a) {
            var b = this.length,
                c = +a + (0 > a ? b : 0);
            return this.pushStack(c >= 0 && b > c ? [this[c]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: gb,
        sort: cb.sort,
        splice: cb.splice
    }, nb.extend = nb.fn.extend = function() {
        var a, b, c, d, e, f, g = arguments[0] || {},
            h = 1,
            i = arguments.length,
            j = !1;
        for ("boolean" == typeof g && (j = g, g = arguments[h] || {}, h++), "object" == typeof g || nb.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++)
            if (null != (e = arguments[h]))
                for (d in e) a = g[d], c = e[d], g !== c && (j && c && (nb.isPlainObject(c) || (b = nb.isArray(c))) ? (b ? (b = !1, f = a && nb.isArray(a) ? a : []) : f = a && nb.isPlainObject(a) ? a : {}, g[d] = nb.extend(j, f, c)) : void 0 !== c && (g[d] = c));
        return g
    }, nb.extend({
        expando: "jQuery" + (mb + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(a) {
            throw new Error(a)
        },
        noop: function() {},
        isFunction: function(a) {
            return "function" === nb.type(a)
        },
        isArray: Array.isArray || function(a) {
            return "array" === nb.type(a)
        },
        isWindow: function(a) {
            return null != a && a == a.window
        },
        isNumeric: function(a) {
            var b = a && a.toString();
            return !nb.isArray(a) && b - parseFloat(b) + 1 >= 0
        },
        isEmptyObject: function(a) {
            var b;
            for (b in a) return !1;
            return !0
        },
        isPlainObject: function(a) {
            var b;
            if (!a || "object" !== nb.type(a) || a.nodeType || nb.isWindow(a)) return !1;
            try {
                if (a.constructor && !kb.call(a, "constructor") && !kb.call(a.constructor.prototype, "isPrototypeOf")) return !1
            } catch (c) {
                return !1
            }
            if (!lb.ownFirst)
                for (b in a) return kb.call(a, b);
            for (b in a);
            return void 0 === b || kb.call(a, b)
        },
        type: function(a) {
            return null == a ? a + "" : "object" == typeof a || "function" == typeof a ? ib[jb.call(a)] || "object" : typeof a
        },
        globalEval: function(b) {
            b && nb.trim(b) && (a.execScript || function(b) {
                a.eval.call(a, b)
            })(b)
        },
        camelCase: function(a) {
            return a.replace(pb, "ms-").replace(qb, rb)
        },
        nodeName: function(a, b) {
            return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
        },
        each: function(a, b) {
            var d, e = 0;
            if (c(a))
                for (d = a.length; d > e && b.call(a[e], e, a[e]) !== !1; e++);
            else
                for (e in a)
                    if (b.call(a[e], e, a[e]) === !1) break;
            return a
        },
        trim: function(a) {
            return null == a ? "" : (a + "").replace(ob, "")
        },
        makeArray: function(a, b) {
            var d = b || [];
            return null != a && (c(Object(a)) ? nb.merge(d, "string" == typeof a ? [a] : a) : gb.call(d, a)), d
        },
        inArray: function(a, b, c) {
            var d;
            if (b) {
                if (hb) return hb.call(b, a, c);
                for (d = b.length, c = c ? 0 > c ? Math.max(0, d + c) : c : 0; d > c; c++)
                    if (c in b && b[c] === a) return c
            }
            return -1
        },
        merge: function(a, b) {
            for (var c = +b.length, d = 0, e = a.length; c > d;) a[e++] = b[d++];
            if (c !== c)
                for (; void 0 !== b[d];) a[e++] = b[d++];
            return a.length = e, a
        },
        grep: function(a, b, c) {
            for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++) d = !b(a[f], f), d !== h && e.push(a[f]);
            return e
        },
        map: function(a, b, d) {
            var e, f, g = 0,
                h = [];
            if (c(a))
                for (e = a.length; e > g; g++) f = b(a[g], g, d), null != f && h.push(f);
            else
                for (g in a) f = b(a[g], g, d), null != f && h.push(f);
            return fb.apply([], h)
        },
        guid: 1,
        proxy: function(a, b) {
            var c, d, e;
            return "string" == typeof b && (e = a[b], b = a, a = e), nb.isFunction(a) ? (c = eb.call(arguments, 2), d = function() {
                return a.apply(b || this, c.concat(eb.call(arguments)))
            }, d.guid = a.guid = a.guid || nb.guid++, d) : void 0
        },
        now: function() {
            return +new Date
        },
        support: lb
    }), "function" == typeof Symbol && (nb.fn[Symbol.iterator] = cb[Symbol.iterator]), nb.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(a, b) {
        ib["[object " + b + "]"] = b.toLowerCase()
    });
    var sb = function(a) {
        function b(a, b, c, d) {
            var e, f, g, h, i, j, l, n, o = b && b.ownerDocument,
                p = b ? b.nodeType : 9;
            if (c = c || [], "string" != typeof a || !a || 1 !== p && 9 !== p && 11 !== p) return c;
            if (!d && ((b ? b.ownerDocument || b : O) !== G && F(b), b = b || G, I)) {
                if (11 !== p && (j = rb.exec(a)))
                    if (e = j[1]) {
                        if (9 === p) {
                            if (!(g = b.getElementById(e))) return c;
                            if (g.id === e) return c.push(g), c
                        } else if (o && (g = o.getElementById(e)) && M(b, g) && g.id === e) return c.push(g), c
                    } else {
                        if (j[2]) return $.apply(c, b.getElementsByTagName(a)), c;
                        if ((e = j[3]) && v.getElementsByClassName && b.getElementsByClassName) return $.apply(c, b.getElementsByClassName(e)), c
                    }
                if (!(!v.qsa || T[a + " "] || J && J.test(a))) {
                    if (1 !== p) o = b, n = a;
                    else if ("object" !== b.nodeName.toLowerCase()) {
                        for ((h = b.getAttribute("id")) ? h = h.replace(tb, "\\$&") : b.setAttribute("id", h = N), l = z(a), f = l.length, i = mb.test(h) ? "#" + h : "[id='" + h + "']"; f--;) l[f] = i + " " + m(l[f]);
                        n = l.join(","), o = sb.test(a) && k(b.parentNode) || b
                    }
                    if (n) try {
                        return $.apply(c, o.querySelectorAll(n)), c
                    } catch (q) {} finally {
                        h === N && b.removeAttribute("id")
                    }
                }
            }
            return B(a.replace(hb, "$1"), b, c, d)
        }

        function c() {
            function a(c, d) {
                return b.push(c + " ") > w.cacheLength && delete a[b.shift()], a[c + " "] = d
            }
            var b = [];
            return a
        }

        function d(a) {
            return a[N] = !0, a
        }

        function e(a) {
            var b = G.createElement("div");
            try {
                return !!a(b)
            } catch (c) {
                return !1
            } finally {
                b.parentNode && b.parentNode.removeChild(b), b = null
            }
        }

        function f(a, b) {
            for (var c = a.split("|"), d = c.length; d--;) w.attrHandle[c[d]] = b
        }

        function g(a, b) {
            var c = b && a,
                d = c && 1 === a.nodeType && 1 === b.nodeType && (~b.sourceIndex || V) - (~a.sourceIndex || V);
            if (d) return d;
            if (c)
                for (; c = c.nextSibling;)
                    if (c === b) return -1;
            return a ? 1 : -1
        }

        function h(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a
            }
        }

        function i(a) {
            return function(b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a
            }
        }

        function j(a) {
            return d(function(b) {
                return b = +b, d(function(c, d) {
                    for (var e, f = a([], c.length, b), g = f.length; g--;) c[e = f[g]] && (c[e] = !(d[e] = c[e]))
                })
            })
        }

        function k(a) {
            return a && "undefined" != typeof a.getElementsByTagName && a
        }

        function l() {}

        function m(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
            return d
        }

        function n(a, b, c) {
            var d = b.dir,
                e = c && "parentNode" === d,
                f = Q++;
            return b.first ? function(b, c, f) {
                for (; b = b[d];)
                    if (1 === b.nodeType || e) return a(b, c, f)
            } : function(b, c, g) {
                var h, i, j, k = [P, f];
                if (g) {
                    for (; b = b[d];)
                        if ((1 === b.nodeType || e) && a(b, c, g)) return !0
                } else
                    for (; b = b[d];)
                        if (1 === b.nodeType || e) {
                            if (j = b[N] || (b[N] = {}), i = j[b.uniqueID] || (j[b.uniqueID] = {}), (h = i[d]) && h[0] === P && h[1] === f) return k[2] = h[2];
                            if (i[d] = k, k[2] = a(b, c, g)) return !0
                        }
            }
        }

        function o(a) {
            return a.length > 1 ? function(b, c, d) {
                for (var e = a.length; e--;)
                    if (!a[e](b, c, d)) return !1;
                return !0
            } : a[0]
        }

        function p(a, c, d) {
            for (var e = 0, f = c.length; f > e; e++) b(a, c[e], d);
            return d
        }

        function q(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)(f = a[h]) && (c && !c(f, d, e) || (g.push(f), j && b.push(h)));
            return g
        }

        function r(a, b, c, e, f, g) {
            return e && !e[N] && (e = r(e)), f && !f[N] && (f = r(f, g)), d(function(d, g, h, i) {
                var j, k, l, m = [],
                    n = [],
                    o = g.length,
                    r = d || p(b || "*", h.nodeType ? [h] : h, []),
                    s = !a || !d && b ? r : q(r, m, a, h, i),
                    t = c ? f || (d ? a : o || e) ? [] : g : s;
                if (c && c(s, t, h, i), e)
                    for (j = q(t, n), e(j, [], h, i), k = j.length; k--;)(l = j[k]) && (t[n[k]] = !(s[n[k]] = l));
                if (d) {
                    if (f || a) {
                        if (f) {
                            for (j = [], k = t.length; k--;)(l = t[k]) && j.push(s[k] = l);
                            f(null, t = [], j, i)
                        }
                        for (k = t.length; k--;)(l = t[k]) && (j = f ? ab(d, l) : m[k]) > -1 && (d[j] = !(g[j] = l))
                    }
                } else t = q(t === g ? t.splice(o, t.length) : t), f ? f(null, g, t, i) : $.apply(g, t)
            })
        }

        function s(a) {
            for (var b, c, d, e = a.length, f = w.relative[a[0].type], g = f || w.relative[" "], h = f ? 1 : 0, i = n(function(a) {
                    return a === b
                }, g, !0), j = n(function(a) {
                    return ab(b, a) > -1
                }, g, !0), k = [function(a, c, d) {
                    var e = !f && (d || c !== C) || ((b = c).nodeType ? i(a, c, d) : j(a, c, d));
                    return b = null, e
                }]; e > h; h++)
                if (c = w.relative[a[h].type]) k = [n(o(k), c)];
                else {
                    if (c = w.filter[a[h].type].apply(null, a[h].matches), c[N]) {
                        for (d = ++h; e > d && !w.relative[a[d].type]; d++);
                        return r(h > 1 && o(k), h > 1 && m(a.slice(0, h - 1).concat({
                            value: " " === a[h - 2].type ? "*" : ""
                        })).replace(hb, "$1"), c, d > h && s(a.slice(h, d)), e > d && s(a = a.slice(d)), e > d && m(a))
                    }
                    k.push(c)
                }
            return o(k)
        }

        function t(a, c) {
            var e = c.length > 0,
                f = a.length > 0,
                g = function(d, g, h, i, j) {
                    var k, l, m, n = 0,
                        o = "0",
                        p = d && [],
                        r = [],
                        s = C,
                        t = d || f && w.find.TAG("*", j),
                        u = P += null == s ? 1 : Math.random() || .1,
                        v = t.length;
                    for (j && (C = g === G || g || j); o !== v && null != (k = t[o]); o++) {
                        if (f && k) {
                            for (l = 0, g || k.ownerDocument === G || (F(k), h = !I); m = a[l++];)
                                if (m(k, g || G, h)) {
                                    i.push(k);
                                    break
                                }
                            j && (P = u)
                        }
                        e && ((k = !m && k) && n--, d && p.push(k))
                    }
                    if (n += o, e && o !== n) {
                        for (l = 0; m = c[l++];) m(p, r, g, h);
                        if (d) {
                            if (n > 0)
                                for (; o--;) p[o] || r[o] || (r[o] = Y.call(i));
                            r = q(r)
                        }
                        $.apply(i, r), j && !d && r.length > 0 && n + c.length > 1 && b.uniqueSort(i)
                    }
                    return j && (P = u, C = s), p
                };
            return e ? d(g) : g
        }
        var u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N = "sizzle" + 1 * new Date,
            O = a.document,
            P = 0,
            Q = 0,
            R = c(),
            S = c(),
            T = c(),
            U = function(a, b) {
                return a === b && (E = !0), 0
            },
            V = 1 << 31,
            W = {}.hasOwnProperty,
            X = [],
            Y = X.pop,
            Z = X.push,
            $ = X.push,
            _ = X.slice,
            ab = function(a, b) {
                for (var c = 0, d = a.length; d > c; c++)
                    if (a[c] === b) return c;
                return -1
            },
            bb = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            cb = "[\\x20\\t\\r\\n\\f]",
            db = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            eb = "\\[" + cb + "*(" + db + ")(?:" + cb + "*([*^$|!~]?=)" + cb + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + db + "))|)" + cb + "*\\]",
            fb = ":(" + db + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + eb + ")*)|.*)\\)|)",
            gb = new RegExp(cb + "+", "g"),
            hb = new RegExp("^" + cb + "+|((?:^|[^\\\\])(?:\\\\.)*)" + cb + "+$", "g"),
            ib = new RegExp("^" + cb + "*," + cb + "*"),
            jb = new RegExp("^" + cb + "*([>+~]|" + cb + ")" + cb + "*"),
            kb = new RegExp("=" + cb + "*([^\\]'\"]*?)" + cb + "*\\]", "g"),
            lb = new RegExp(fb),
            mb = new RegExp("^" + db + "$"),
            nb = {
                ID: new RegExp("^#(" + db + ")"),
                CLASS: new RegExp("^\\.(" + db + ")"),
                TAG: new RegExp("^(" + db + "|[*])"),
                ATTR: new RegExp("^" + eb),
                PSEUDO: new RegExp("^" + fb),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + cb + "*(even|odd|(([+-]|)(\\d*)n|)" + cb + "*(?:([+-]|)" + cb + "*(\\d+)|))" + cb + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + bb + ")$", "i"),
                needsContext: new RegExp("^" + cb + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + cb + "*((?:-\\d)?\\d*)" + cb + "*\\)|)(?=[^-]|$)", "i")
            },
            ob = /^(?:input|select|textarea|button)$/i,
            pb = /^h\d$/i,
            qb = /^[^{]+\{\s*\[native \w/,
            rb = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            sb = /[+~]/,
            tb = /'|\\/g,
            ub = new RegExp("\\\\([\\da-f]{1,6}" + cb + "?|(" + cb + ")|.)", "ig"),
            vb = function(a, b, c) {
                var d = "0x" + b - 65536;
                return d !== d || c ? b : 0 > d ? String.fromCharCode(d + 65536) : String.fromCharCode(55296 | d >> 10, 56320 | 1023 & d)
            },
            wb = function() {
                F()
            };
        try {
            $.apply(X = _.call(O.childNodes), O.childNodes), X[O.childNodes.length].nodeType
        } catch (xb) {
            $ = {
                apply: X.length ? function(a, b) {
                    Z.apply(a, _.call(b))
                } : function(a, b) {
                    for (var c = a.length, d = 0; a[c++] = b[d++];);
                    a.length = c - 1
                }
            }
        }
        v = b.support = {}, y = b.isXML = function(a) {
            var b = a && (a.ownerDocument || a).documentElement;
            return b ? "HTML" !== b.nodeName : !1
        }, F = b.setDocument = function(a) {
            var b, c, d = a ? a.ownerDocument || a : O;
            return d !== G && 9 === d.nodeType && d.documentElement ? (G = d, H = G.documentElement, I = !y(G), (c = G.defaultView) && c.top !== c && (c.addEventListener ? c.addEventListener("unload", wb, !1) : c.attachEvent && c.attachEvent("onunload", wb)), v.attributes = e(function(a) {
                return a.className = "i", !a.getAttribute("className")
            }), v.getElementsByTagName = e(function(a) {
                return a.appendChild(G.createComment("")), !a.getElementsByTagName("*").length
            }), v.getElementsByClassName = qb.test(G.getElementsByClassName), v.getById = e(function(a) {
                return H.appendChild(a).id = N, !G.getElementsByName || !G.getElementsByName(N).length
            }), v.getById ? (w.find.ID = function(a, b) {
                if ("undefined" != typeof b.getElementById && I) {
                    var c = b.getElementById(a);
                    return c ? [c] : []
                }
            }, w.filter.ID = function(a) {
                var b = a.replace(ub, vb);
                return function(a) {
                    return a.getAttribute("id") === b
                }
            }) : (delete w.find.ID, w.filter.ID = function(a) {
                var b = a.replace(ub, vb);
                return function(a) {
                    var c = "undefined" != typeof a.getAttributeNode && a.getAttributeNode("id");
                    return c && c.value === b
                }
            }), w.find.TAG = v.getElementsByTagName ? function(a, b) {
                return "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(a) : v.qsa ? b.querySelectorAll(a) : void 0
            } : function(a, b) {
                var c, d = [],
                    e = 0,
                    f = b.getElementsByTagName(a);
                if ("*" === a) {
                    for (; c = f[e++];) 1 === c.nodeType && d.push(c);
                    return d
                }
                return f
            }, w.find.CLASS = v.getElementsByClassName && function(a, b) {
                return "undefined" != typeof b.getElementsByClassName && I ? b.getElementsByClassName(a) : void 0
            }, K = [], J = [], (v.qsa = qb.test(G.querySelectorAll)) && (e(function(a) {
                H.appendChild(a).innerHTML = "<a id='" + N + "'></a><select id='" + N + "-\r\\' msallowcapture=''><option selected=''></option></select>", a.querySelectorAll("[msallowcapture^='']").length && J.push("[*^$]=" + cb + "*(?:''|\"\")"), a.querySelectorAll("[selected]").length || J.push("\\[" + cb + "*(?:value|" + bb + ")"), a.querySelectorAll("[id~=" + N + "-]").length || J.push("~="), a.querySelectorAll(":checked").length || J.push(":checked"), a.querySelectorAll("a#" + N + "+*").length || J.push(".#.+[+~]")
            }), e(function(a) {
                var b = G.createElement("input");
                b.setAttribute("type", "hidden"), a.appendChild(b).setAttribute("name", "D"), a.querySelectorAll("[name=d]").length && J.push("name" + cb + "*[*^$|!~]?="), a.querySelectorAll(":enabled").length || J.push(":enabled", ":disabled"), a.querySelectorAll("*,:x"), J.push(",.*:")
            })), (v.matchesSelector = qb.test(L = H.matches || H.webkitMatchesSelector || H.mozMatchesSelector || H.oMatchesSelector || H.msMatchesSelector)) && e(function(a) {
                v.disconnectedMatch = L.call(a, "div"), L.call(a, "[s!='']:x"), K.push("!=", fb)
            }), J = J.length && new RegExp(J.join("|")), K = K.length && new RegExp(K.join("|")), b = qb.test(H.compareDocumentPosition), M = b || qb.test(H.contains) ? function(a, b) {
                var c = 9 === a.nodeType ? a.documentElement : a,
                    d = b && b.parentNode;
                return a === d || !(!d || 1 !== d.nodeType || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)))
            } : function(a, b) {
                if (b)
                    for (; b = b.parentNode;)
                        if (b === a) return !0;
                return !1
            }, U = b ? function(a, b) {
                if (a === b) return E = !0, 0;
                var c = !a.compareDocumentPosition - !b.compareDocumentPosition;
                return c ? c : (c = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & c || !v.sortDetached && b.compareDocumentPosition(a) === c ? a === G || a.ownerDocument === O && M(O, a) ? -1 : b === G || b.ownerDocument === O && M(O, b) ? 1 : D ? ab(D, a) - ab(D, b) : 0 : 4 & c ? -1 : 1)
            } : function(a, b) {
                if (a === b) return E = !0, 0;
                var c, d = 0,
                    e = a.parentNode,
                    f = b.parentNode,
                    h = [a],
                    i = [b];
                if (!e || !f) return a === G ? -1 : b === G ? 1 : e ? -1 : f ? 1 : D ? ab(D, a) - ab(D, b) : 0;
                if (e === f) return g(a, b);
                for (c = a; c = c.parentNode;) h.unshift(c);
                for (c = b; c = c.parentNode;) i.unshift(c);
                for (; h[d] === i[d];) d++;
                return d ? g(h[d], i[d]) : h[d] === O ? -1 : i[d] === O ? 1 : 0
            }, G) : G
        }, b.matches = function(a, c) {
            return b(a, null, null, c)
        }, b.matchesSelector = function(a, c) {
            if ((a.ownerDocument || a) !== G && F(a), c = c.replace(kb, "='$1']"), !(!v.matchesSelector || !I || T[c + " "] || K && K.test(c) || J && J.test(c))) try {
                var d = L.call(a, c);
                if (d || v.disconnectedMatch || a.document && 11 !== a.document.nodeType) return d
            } catch (e) {}
            return b(c, G, null, [a]).length > 0
        }, b.contains = function(a, b) {
            return (a.ownerDocument || a) !== G && F(a), M(a, b)
        }, b.attr = function(a, b) {
            (a.ownerDocument || a) !== G && F(a);
            var c = w.attrHandle[b.toLowerCase()],
                d = c && W.call(w.attrHandle, b.toLowerCase()) ? c(a, b, !I) : void 0;
            return void 0 !== d ? d : v.attributes || !I ? a.getAttribute(b) : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }, b.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a)
        }, b.uniqueSort = function(a) {
            var b, c = [],
                d = 0,
                e = 0;
            if (E = !v.detectDuplicates, D = !v.sortStable && a.slice(0), a.sort(U), E) {
                for (; b = a[e++];) b === a[e] && (d = c.push(e));
                for (; d--;) a.splice(c[d], 1)
            }
            return D = null, a
        }, x = b.getText = function(a) {
            var b, c = "",
                d = 0,
                e = a.nodeType;
            if (e) {
                if (1 === e || 9 === e || 11 === e) {
                    if ("string" == typeof a.textContent) return a.textContent;
                    for (a = a.firstChild; a; a = a.nextSibling) c += x(a)
                } else if (3 === e || 4 === e) return a.nodeValue
            } else
                for (; b = a[d++];) c += x(b);
            return c
        }, w = b.selectors = {
            cacheLength: 50,
            createPseudo: d,
            match: nb,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(a) {
                    return a[1] = a[1].replace(ub, vb), a[3] = (a[3] || a[4] || a[5] || "").replace(ub, vb), "~=" === a[2] && (a[3] = " " + a[3] + " "), a.slice(0, 4)
                },
                CHILD: function(a) {
                    return a[1] = a[1].toLowerCase(), "nth" === a[1].slice(0, 3) ? (a[3] || b.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * ("even" === a[3] || "odd" === a[3])), a[5] = +(a[7] + a[8] || "odd" === a[3])) : a[3] && b.error(a[0]), a
                },
                PSEUDO: function(a) {
                    var b, c = !a[6] && a[2];
                    return nb.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || "" : c && lb.test(c) && (b = z(c, !0)) && (b = c.indexOf(")", c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3))
                }
            },
            filter: {
                TAG: function(a) {
                    var b = a.replace(ub, vb).toLowerCase();
                    return "*" === a ? function() {
                        return !0
                    } : function(a) {
                        return a.nodeName && a.nodeName.toLowerCase() === b
                    }
                },
                CLASS: function(a) {
                    var b = R[a + " "];
                    return b || (b = new RegExp("(^|" + cb + ")" + a + "(" + cb + "|$)")) && R(a, function(a) {
                        return b.test("string" == typeof a.className && a.className || "undefined" != typeof a.getAttribute && a.getAttribute("class") || "")
                    })
                },
                ATTR: function(a, c, d) {
                    return function(e) {
                        var f = b.attr(e, a);
                        return null == f ? "!=" === c : c ? (f += "", "=" === c ? f === d : "!=" === c ? f !== d : "^=" === c ? d && 0 === f.indexOf(d) : "*=" === c ? d && f.indexOf(d) > -1 : "$=" === c ? d && f.slice(-d.length) === d : "~=" === c ? (" " + f.replace(gb, " ") + " ").indexOf(d) > -1 : "|=" === c ? f === d || f.slice(0, d.length + 1) === d + "-" : !1) : !0
                    }
                },
                CHILD: function(a, b, c, d, e) {
                    var f = "nth" !== a.slice(0, 3),
                        g = "last" !== a.slice(-4),
                        h = "of-type" === b;
                    return 1 === d && 0 === e ? function(a) {
                        return !!a.parentNode
                    } : function(b, c, i) {
                        var j, k, l, m, n, o, p = f !== g ? "nextSibling" : "previousSibling",
                            q = b.parentNode,
                            r = h && b.nodeName.toLowerCase(),
                            s = !i && !h,
                            t = !1;
                        if (q) {
                            if (f) {
                                for (; p;) {
                                    for (m = b; m = m[p];)
                                        if (h ? m.nodeName.toLowerCase() === r : 1 === m.nodeType) return !1;
                                    o = p = "only" === a && !o && "nextSibling"
                                }
                                return !0
                            }
                            if (o = [g ? q.firstChild : q.lastChild], g && s) {
                                for (m = q, l = m[N] || (m[N] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === P && j[1], t = n && j[2], m = n && q.childNodes[n]; m = ++n && m && m[p] || (t = n = 0) || o.pop();)
                                    if (1 === m.nodeType && ++t && m === b) {
                                        k[a] = [P, n, t];
                                        break
                                    }
                            } else if (s && (m = b, l = m[N] || (m[N] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), j = k[a] || [], n = j[0] === P && j[1], t = n), t === !1)
                                for (;
                                    (m = ++n && m && m[p] || (t = n = 0) || o.pop()) && ((h ? m.nodeName.toLowerCase() !== r : 1 !== m.nodeType) || !++t || (s && (l = m[N] || (m[N] = {}), k = l[m.uniqueID] || (l[m.uniqueID] = {}), k[a] = [P, t]), m !== b)););
                            return t -= e, t === d || 0 === t % d && t / d >= 0
                        }
                    }
                },
                PSEUDO: function(a, c) {
                    var e, f = w.pseudos[a] || w.setFilters[a.toLowerCase()] || b.error("unsupported pseudo: " + a);
                    return f[N] ? f(c) : f.length > 1 ? (e = [a, a, "", c], w.setFilters.hasOwnProperty(a.toLowerCase()) ? d(function(a, b) {
                        for (var d, e = f(a, c), g = e.length; g--;) d = ab(a, e[g]), a[d] = !(b[d] = e[g])
                    }) : function(a) {
                        return f(a, 0, e)
                    }) : f
                }
            },
            pseudos: {
                not: d(function(a) {
                    var b = [],
                        c = [],
                        e = A(a.replace(hb, "$1"));
                    return e[N] ? d(function(a, b, c, d) {
                        for (var f, g = e(a, null, d, []), h = a.length; h--;)(f = g[h]) && (a[h] = !(b[h] = f))
                    }) : function(a, d, f) {
                        return b[0] = a, e(b, null, f, c), b[0] = null, !c.pop()
                    }
                }),
                has: d(function(a) {
                    return function(c) {
                        return b(a, c).length > 0
                    }
                }),
                contains: d(function(a) {
                    return a = a.replace(ub, vb),
                        function(b) {
                            return (b.textContent || b.innerText || x(b)).indexOf(a) > -1
                        }
                }),
                lang: d(function(a) {
                    return mb.test(a || "") || b.error("unsupported lang: " + a), a = a.replace(ub, vb).toLowerCase(),
                        function(b) {
                            var c;
                            do
                                if (c = I ? b.lang : b.getAttribute("xml:lang") || b.getAttribute("lang")) return c = c.toLowerCase(), c === a || 0 === c.indexOf(a + "-");
                            while ((b = b.parentNode) && 1 === b.nodeType);
                            return !1
                        }
                }),
                target: function(b) {
                    var c = a.location && a.location.hash;
                    return c && c.slice(1) === b.id
                },
                root: function(a) {
                    return a === H
                },
                focus: function(a) {
                    return a === G.activeElement && (!G.hasFocus || G.hasFocus()) && !!(a.type || a.href || ~a.tabIndex)
                },
                enabled: function(a) {
                    return a.disabled === !1
                },
                disabled: function(a) {
                    return a.disabled === !0
                },
                checked: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && !!a.checked || "option" === b && !!a.selected
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0
                },
                empty: function(a) {
                    for (a = a.firstChild; a; a = a.nextSibling)
                        if (a.nodeType < 6) return !1;
                    return !0
                },
                parent: function(a) {
                    return !w.pseudos.empty(a)
                },
                header: function(a) {
                    return pb.test(a.nodeName)
                },
                input: function(a) {
                    return ob.test(a.nodeName)
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return "input" === b && "button" === a.type || "button" === b
                },
                text: function(a) {
                    var b;
                    return "input" === a.nodeName.toLowerCase() && "text" === a.type && (null == (b = a.getAttribute("type")) || "text" === b.toLowerCase())
                },
                first: j(function() {
                    return [0]
                }),
                last: j(function(a, b) {
                    return [b - 1]
                }),
                eq: j(function(a, b, c) {
                    return [0 > c ? c + b : c]
                }),
                even: j(function(a, b) {
                    for (var c = 0; b > c; c += 2) a.push(c);
                    return a
                }),
                odd: j(function(a, b) {
                    for (var c = 1; b > c; c += 2) a.push(c);
                    return a
                }),
                lt: j(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; --d >= 0;) a.push(d);
                    return a
                }),
                gt: j(function(a, b, c) {
                    for (var d = 0 > c ? c + b : c; ++d < b;) a.push(d);
                    return a
                })
            }
        }, w.pseudos.nth = w.pseudos.eq;
        for (u in {
                radio: !0,
                checkbox: !0,
                file: !0,
                password: !0,
                image: !0
            }) w.pseudos[u] = h(u);
        for (u in {
                submit: !0,
                reset: !0
            }) w.pseudos[u] = i(u);
        return l.prototype = w.filters = w.pseudos, w.setFilters = new l, z = b.tokenize = function(a, c) {
            var d, e, f, g, h, i, j, k = S[a + " "];
            if (k) return c ? 0 : k.slice(0);
            for (h = a, i = [], j = w.preFilter; h;) {
                d && !(e = ib.exec(h)) || (e && (h = h.slice(e[0].length) || h), i.push(f = [])), d = !1, (e = jb.exec(h)) && (d = e.shift(), f.push({
                    value: d,
                    type: e[0].replace(hb, " ")
                }), h = h.slice(d.length));
                for (g in w.filter) !(e = nb[g].exec(h)) || j[g] && !(e = j[g](e)) || (d = e.shift(), f.push({
                    value: d,
                    type: g,
                    matches: e
                }), h = h.slice(d.length));
                if (!d) break
            }
            return c ? h.length : h ? b.error(a) : S(a, i).slice(0)
        }, A = b.compile = function(a, b) {
            var c, d = [],
                e = [],
                f = T[a + " "];
            if (!f) {
                for (b || (b = z(a)), c = b.length; c--;) f = s(b[c]), f[N] ? d.push(f) : e.push(f);
                f = T(a, t(e, d)), f.selector = a
            }
            return f
        }, B = b.select = function(a, b, c, d) {
            var e, f, g, h, i, j = "function" == typeof a && a,
                l = !d && z(a = j.selector || a);
            if (c = c || [], 1 === l.length) {
                if (f = l[0] = l[0].slice(0), f.length > 2 && "ID" === (g = f[0]).type && v.getById && 9 === b.nodeType && I && w.relative[f[1].type]) {
                    if (b = (w.find.ID(g.matches[0].replace(ub, vb), b) || [])[0], !b) return c;
                    j && (b = b.parentNode), a = a.slice(f.shift().value.length)
                }
                for (e = nb.needsContext.test(a) ? 0 : f.length; e-- && (g = f[e], !w.relative[h = g.type]);)
                    if ((i = w.find[h]) && (d = i(g.matches[0].replace(ub, vb), sb.test(f[0].type) && k(b.parentNode) || b))) {
                        if (f.splice(e, 1), a = d.length && m(f), !a) return $.apply(c, d), c;
                        break
                    }
            }
            return (j || A(a, l))(d, b, !I, c, !b || sb.test(a) && k(b.parentNode) || b), c
        }, v.sortStable = N.split("").sort(U).join("") === N, v.detectDuplicates = !!E, F(), v.sortDetached = e(function(a) {
            return 1 & a.compareDocumentPosition(G.createElement("div"))
        }), e(function(a) {
            return a.innerHTML = "<a href='#'></a>", "#" === a.firstChild.getAttribute("href")
        }) || f("type|href|height|width", function(a, b, c) {
            return c ? void 0 : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2)
        }), v.attributes && e(function(a) {
            return a.innerHTML = "<input/>", a.firstChild.setAttribute("value", ""), "" === a.firstChild.getAttribute("value")
        }) || f("value", function(a, b, c) {
            return c || "input" !== a.nodeName.toLowerCase() ? void 0 : a.defaultValue
        }), e(function(a) {
            return null == a.getAttribute("disabled")
        }) || f(bb, function(a, b, c) {
            var d;
            return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null
        }), b
    }(a);
    nb.find = sb, nb.expr = sb.selectors, nb.expr[":"] = nb.expr.pseudos, nb.uniqueSort = nb.unique = sb.uniqueSort, nb.text = sb.getText, nb.isXMLDoc = sb.isXML, nb.contains = sb.contains;
    var tb = function(a, b, c) {
            for (var d = [], e = void 0 !== c;
                (a = a[b]) && 9 !== a.nodeType;)
                if (1 === a.nodeType) {
                    if (e && nb(a).is(c)) break;
                    d.push(a)
                }
            return d
        },
        ub = function(a, b) {
            for (var c = []; a; a = a.nextSibling) 1 === a.nodeType && a !== b && c.push(a);
            return c
        },
        vb = nb.expr.match.needsContext,
        wb = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
        xb = /^.[^:#\[\.,]*$/;
    nb.filter = function(a, b, c) {
        var d = b[0];
        return c && (a = ":not(" + a + ")"), 1 === b.length && 1 === d.nodeType ? nb.find.matchesSelector(d, a) ? [d] : [] : nb.find.matches(a, nb.grep(b, function(a) {
            return 1 === a.nodeType
        }))
    }, nb.fn.extend({
        find: function(a) {
            var b, c = [],
                d = this,
                e = d.length;
            if ("string" != typeof a) return this.pushStack(nb(a).filter(function() {
                for (b = 0; e > b; b++)
                    if (nb.contains(d[b], this)) return !0
            }));
            for (b = 0; e > b; b++) nb.find(a, d[b], c);
            return c = this.pushStack(e > 1 ? nb.unique(c) : c), c.selector = this.selector ? this.selector + " " + a : a, c
        },
        filter: function(a) {
            return this.pushStack(d(this, a || [], !1))
        },
        not: function(a) {
            return this.pushStack(d(this, a || [], !0))
        },
        is: function(a) {
            return !!d(this, "string" == typeof a && vb.test(a) ? nb(a) : a || [], !1).length
        }
    });
    var yb, zb = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        Ab = nb.fn.init = function(a, b, c) {
            var d, e;
            if (!a) return this;
            if (c = c || yb, "string" == typeof a) {
                if (d = "<" === a.charAt(0) && ">" === a.charAt(a.length - 1) && a.length >= 3 ? [null, a, null] : zb.exec(a), !d || !d[1] && b) return !b || b.jquery ? (b || c).find(a) : this.constructor(b).find(a);
                if (d[1]) {
                    if (b = b instanceof nb ? b[0] : b, nb.merge(this, nb.parseHTML(d[1], b && b.nodeType ? b.ownerDocument || b : db, !0)), wb.test(d[1]) && nb.isPlainObject(b))
                        for (d in b) nb.isFunction(this[d]) ? this[d](b[d]) : this.attr(d, b[d]);
                    return this
                }
                if (e = db.getElementById(d[2]), e && e.parentNode) {
                    if (e.id !== d[2]) return yb.find(a);
                    this.length = 1, this[0] = e
                }
                return this.context = db, this.selector = a, this
            }
            return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : nb.isFunction(a) ? "undefined" != typeof c.ready ? c.ready(a) : a(nb) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), nb.makeArray(a, this))
        };
    Ab.prototype = nb.fn, yb = nb(db);
    var Bb = /^(?:parents|prev(?:Until|All))/,
        Cb = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    nb.fn.extend({
        has: function(a) {
            var b, c = nb(a, this),
                d = c.length;
            return this.filter(function() {
                for (b = 0; d > b; b++)
                    if (nb.contains(this, c[b])) return !0
            })
        },
        closest: function(a, b) {
            for (var c, d = 0, e = this.length, f = [], g = vb.test(a) || "string" != typeof a ? nb(a, b || this.context) : 0; e > d; d++)
                for (c = this[d]; c && c !== b; c = c.parentNode)
                    if (c.nodeType < 11 && (g ? g.index(c) > -1 : 1 === c.nodeType && nb.find.matchesSelector(c, a))) {
                        f.push(c);
                        break
                    }
            return this.pushStack(f.length > 1 ? nb.uniqueSort(f) : f)
        },
        index: function(a) {
            return a ? "string" == typeof a ? nb.inArray(this[0], nb(a)) : nb.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(a, b) {
            return this.pushStack(nb.uniqueSort(nb.merge(this.get(), nb(a, b))))
        },
        addBack: function(a) {
            return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
        }
    }), nb.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && 11 !== b.nodeType ? b : null
        },
        parents: function(a) {
            return tb(a, "parentNode")
        },
        parentsUntil: function(a, b, c) {
            return tb(a, "parentNode", c)
        },
        next: function(a) {
            return e(a, "nextSibling")
        },
        prev: function(a) {
            return e(a, "previousSibling")
        },
        nextAll: function(a) {
            return tb(a, "nextSibling")
        },
        prevAll: function(a) {
            return tb(a, "previousSibling")
        },
        nextUntil: function(a, b, c) {
            return tb(a, "nextSibling", c)
        },
        prevUntil: function(a, b, c) {
            return tb(a, "previousSibling", c)
        },
        siblings: function(a) {
            return ub((a.parentNode || {}).firstChild, a)
        },
        children: function(a) {
            return ub(a.firstChild)
        },
        contents: function(a) {
            return nb.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : nb.merge([], a.childNodes)
        }
    }, function(a, b) {
        nb.fn[a] = function(c, d) {
            var e = nb.map(this, b, c);
            return "Until" !== a.slice(-5) && (d = c), d && "string" == typeof d && (e = nb.filter(d, e)), this.length > 1 && (Cb[a] || (e = nb.uniqueSort(e)), Bb.test(a) && (e = e.reverse())), this.pushStack(e)
        }
    });
    var Db = /\S+/g;
    nb.Callbacks = function(a) {
        a = "string" == typeof a ? f(a) : nb.extend({}, a);
        var b, c, d, e, g = [],
            h = [],
            i = -1,
            j = function() {
                for (e = a.once, d = b = !0; h.length; i = -1)
                    for (c = h.shift(); ++i < g.length;) g[i].apply(c[0], c[1]) === !1 && a.stopOnFalse && (i = g.length, c = !1);
                a.memory || (c = !1), b = !1, e && (g = c ? [] : "")
            },
            k = {
                add: function() {
                    return g && (c && !b && (i = g.length - 1, h.push(c)), function d(b) {
                        nb.each(b, function(b, c) {
                            nb.isFunction(c) ? a.unique && k.has(c) || g.push(c) : c && c.length && "string" !== nb.type(c) && d(c)
                        })
                    }(arguments), c && !b && j()), this
                },
                remove: function() {
                    return nb.each(arguments, function(a, b) {
                        for (var c;
                            (c = nb.inArray(b, g, c)) > -1;) g.splice(c, 1), i >= c && i--
                    }), this
                },
                has: function(a) {
                    return a ? nb.inArray(a, g) > -1 : g.length > 0
                },
                empty: function() {
                    return g && (g = []), this
                },
                disable: function() {
                    return e = h = [], g = c = "", this
                },
                disabled: function() {
                    return !g
                },
                lock: function() {
                    return e = !0, c || k.disable(), this
                },
                locked: function() {
                    return !!e
                },
                fireWith: function(a, c) {
                    return e || (c = c || [], c = [a, c.slice ? c.slice() : c], h.push(c), b || j()), this
                },
                fire: function() {
                    return k.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!d
                }
            };
        return k
    }, nb.extend({
        Deferred: function(a) {
            var b = [
                    ["resolve", "done", nb.Callbacks("once memory"), "resolved"],
                    ["reject", "fail", nb.Callbacks("once memory"), "rejected"],
                    ["notify", "progress", nb.Callbacks("memory")]
                ],
                c = "pending",
                d = {
                    state: function() {
                        return c
                    },
                    always: function() {
                        return e.done(arguments).fail(arguments), this
                    },
                    then: function() {
                        var a = arguments;
                        return nb.Deferred(function(c) {
                            nb.each(b, function(b, f) {
                                var g = nb.isFunction(a[b]) && a[b];
                                e[f[1]](function() {
                                    var a = g && g.apply(this, arguments);
                                    a && nb.isFunction(a.promise) ? a.promise().progress(c.notify).done(c.resolve).fail(c.reject) : c[f[0] + "With"](this === d ? c.promise() : this, g ? [a] : arguments)
                                })
                            }), a = null
                        }).promise()
                    },
                    promise: function(a) {
                        return null != a ? nb.extend(a, d) : d
                    }
                },
                e = {};
            return d.pipe = d.then, nb.each(b, function(a, f) {
                var g = f[2],
                    h = f[3];
                d[f[1]] = g.add, h && g.add(function() {
                    c = h
                }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() {
                    return e[f[0] + "With"](this === e ? d : this, arguments), this
                }, e[f[0] + "With"] = g.fireWith
            }), d.promise(e), a && a.call(e, e), e
        },
        when: function(a) {
            var b, c, d, e = 0,
                f = eb.call(arguments),
                g = f.length,
                h = 1 !== g || a && nb.isFunction(a.promise) ? g : 0,
                i = 1 === h ? a : nb.Deferred(),
                j = function(a, c, d) {
                    return function(e) {
                        c[a] = this, d[a] = arguments.length > 1 ? eb.call(arguments) : e, d === b ? i.notifyWith(c, d) : --h || i.resolveWith(c, d)
                    }
                };
            if (g > 1)
                for (b = new Array(g), c = new Array(g), d = new Array(g); g > e; e++) f[e] && nb.isFunction(f[e].promise) ? f[e].promise().progress(j(e, c, b)).done(j(e, d, f)).fail(i.reject) : --h;
            return h || i.resolveWith(d, f), i.promise()
        }
    });
    var Eb;
    nb.fn.ready = function(a) {
        return nb.ready.promise().done(a), this
    }, nb.extend({
        isReady: !1,
        readyWait: 1,
        holdReady: function(a) {
            a ? nb.readyWait++ : nb.ready(!0)
        },
        ready: function(a) {
            (a === !0 ? --nb.readyWait : nb.isReady) || (nb.isReady = !0, a !== !0 && --nb.readyWait > 0 || (Eb.resolveWith(db, [nb]), nb.fn.triggerHandler && (nb(db).triggerHandler("ready"), nb(db).off("ready"))))
        }
    }), nb.ready.promise = function(b) {
        if (!Eb)
            if (Eb = nb.Deferred(), "complete" === db.readyState || "loading" !== db.readyState && !db.documentElement.doScroll) a.setTimeout(nb.ready);
            else if (db.addEventListener) db.addEventListener("DOMContentLoaded", h), a.addEventListener("load", h);
        else {
            db.attachEvent("onreadystatechange", h), a.attachEvent("onload", h);
            var c = !1;
            try {
                c = null == a.frameElement && db.documentElement
            } catch (d) {}
            c && c.doScroll && ! function e() {
                if (!nb.isReady) {
                    try {
                        c.doScroll("left")
                    } catch (b) {
                        return a.setTimeout(e, 50)
                    }
                    g(), nb.ready()
                }
            }()
        }
        return Eb.promise(b)
    }, nb.ready.promise();
    var Fb;
    for (Fb in nb(lb)) break;
    lb.ownFirst = "0" === Fb, lb.inlineBlockNeedsLayout = !1, nb(function() {
            var a, b, c, d;
            c = db.getElementsByTagName("body")[0], c && c.style && (b = db.createElement("div"), d = db.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), "undefined" != typeof b.style.zoom && (b.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", lb.inlineBlockNeedsLayout = a = 3 === b.offsetWidth, a && (c.style.zoom = 1)), c.removeChild(d))
        }),
        function() {
            var a = db.createElement("div");
            lb.deleteExpando = !0;
            try {
                delete a.test
            } catch (b) {
                lb.deleteExpando = !1
            }
            a = null
        }();
    var Gb = function(a) {
            var b = nb.noData[(a.nodeName + " ").toLowerCase()],
                c = +a.nodeType || 1;
            return 1 !== c && 9 !== c ? !1 : !b || b !== !0 && a.getAttribute("classid") === b
        },
        Hb = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        Ib = /([A-Z])/g;
    nb.extend({
            cache: {},
            noData: {
                "applet ": !0,
                "embed ": !0,
                "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
            },
            hasData: function(a) {
                return a = a.nodeType ? nb.cache[a[nb.expando]] : a[nb.expando], !!a && !j(a)
            },
            data: function(a, b, c) {
                return k(a, b, c)
            },
            removeData: function(a, b) {
                return l(a, b)
            },
            _data: function(a, b, c) {
                return k(a, b, c, !0)
            },
            _removeData: function(a, b) {
                return l(a, b, !0)
            }
        }), nb.fn.extend({
            data: function(a, b) {
                var c, d, e, f = this[0],
                    g = f && f.attributes;
                if (void 0 === a) {
                    if (this.length && (e = nb.data(f), 1 === f.nodeType && !nb._data(f, "parsedAttrs"))) {
                        for (c = g.length; c--;) g[c] && (d = g[c].name, 0 === d.indexOf("data-") && (d = nb.camelCase(d.slice(5)), i(f, d, e[d])));
                        nb._data(f, "parsedAttrs", !0)
                    }
                    return e
                }
                return "object" == typeof a ? this.each(function() {
                    nb.data(this, a)
                }) : arguments.length > 1 ? this.each(function() {
                    nb.data(this, a, b)
                }) : f ? i(f, a, nb.data(f, a)) : void 0
            },
            removeData: function(a) {
                return this.each(function() {
                    nb.removeData(this, a)
                })
            }
        }), nb.extend({
            queue: function(a, b, c) {
                var d;
                return a ? (b = (b || "fx") + "queue", d = nb._data(a, b), c && (!d || nb.isArray(c) ? d = nb._data(a, b, nb.makeArray(c)) : d.push(c)), d || []) : void 0
            },
            dequeue: function(a, b) {
                b = b || "fx";
                var c = nb.queue(a, b),
                    d = c.length,
                    e = c.shift(),
                    f = nb._queueHooks(a, b),
                    g = function() {
                        nb.dequeue(a, b)
                    };
                "inprogress" === e && (e = c.shift(), d--), e && ("fx" === b && c.unshift("inprogress"), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire()
            },
            _queueHooks: function(a, b) {
                var c = b + "queueHooks";
                return nb._data(a, c) || nb._data(a, c, {
                    empty: nb.Callbacks("once memory").add(function() {
                        nb._removeData(a, b + "queue"), nb._removeData(a, c)
                    })
                })
            }
        }), nb.fn.extend({
            queue: function(a, b) {
                var c = 2;
                return "string" != typeof a && (b = a, a = "fx", c--), arguments.length < c ? nb.queue(this[0], a) : void 0 === b ? this : this.each(function() {
                    var c = nb.queue(this, a, b);
                    nb._queueHooks(this, a), "fx" === a && "inprogress" !== c[0] && nb.dequeue(this, a)
                })
            },
            dequeue: function(a) {
                return this.each(function() {
                    nb.dequeue(this, a)
                })
            },
            clearQueue: function(a) {
                return this.queue(a || "fx", [])
            },
            promise: function(a, b) {
                var c, d = 1,
                    e = nb.Deferred(),
                    f = this,
                    g = this.length,
                    h = function() {
                        --d || e.resolveWith(f, [f])
                    };
                for ("string" != typeof a && (b = a, a = void 0), a = a || "fx"; g--;) c = nb._data(f[g], a + "queueHooks"), c && c.empty && (d++, c.empty.add(h));
                return h(), e.promise(b)
            }
        }),
        function() {
            var a;
            lb.shrinkWrapBlocks = function() {
                if (null != a) return a;
                a = !1;
                var b, c, d;
                return c = db.getElementsByTagName("body")[0], c && c.style ? (b = db.createElement("div"), d = db.createElement("div"), d.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", c.appendChild(d).appendChild(b), "undefined" != typeof b.style.zoom && (b.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", b.appendChild(db.createElement("div")).style.width = "5px", a = 3 !== b.offsetWidth), c.removeChild(d), a) : void 0
            }
        }();
    var Jb = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        Kb = new RegExp("^(?:([+-])=|)(" + Jb + ")([a-z%]*)$", "i"),
        Lb = ["Top", "Right", "Bottom", "Left"],
        Mb = function(a, b) {
            return a = b || a, "none" === nb.css(a, "display") || !nb.contains(a.ownerDocument, a)
        },
        Nb = function(a, b, c, d, e, f, g) {
            var h = 0,
                i = a.length,
                j = null == c;
            if ("object" === nb.type(c)) {
                e = !0;
                for (h in c) Nb(a, b, h, c[h], !0, f, g)
            } else if (void 0 !== d && (e = !0, nb.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) {
                    return j.call(nb(a), c)
                })), b))
                for (; i > h; h++) b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
            return e ? a : j ? b.call(a) : i ? b(a[0], c) : f
        },
        Ob = /^(?:checkbox|radio)$/i,
        Pb = /<([\w:-]+)/,
        Qb = /^$|\/(?:java|ecma)script/i,
        Rb = /^\s+/,
        Sb = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
    ! function() {
        var a = db.createElement("div"),
            b = db.createDocumentFragment(),
            c = db.createElement("input");
        a.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", lb.leadingWhitespace = 3 === a.firstChild.nodeType, lb.tbody = !a.getElementsByTagName("tbody").length, lb.htmlSerialize = !!a.getElementsByTagName("link").length, lb.html5Clone = "<:nav></:nav>" !== db.createElement("nav").cloneNode(!0).outerHTML, c.type = "checkbox", c.checked = !0, b.appendChild(c), lb.appendChecked = c.checked, a.innerHTML = "<textarea>x</textarea>", lb.noCloneChecked = !!a.cloneNode(!0).lastChild.defaultValue, b.appendChild(a), c = db.createElement("input"), c.setAttribute("type", "radio"), c.setAttribute("checked", "checked"), c.setAttribute("name", "t"), a.appendChild(c), lb.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, lb.noCloneEvent = !!a.addEventListener, a[nb.expando] = 1, lb.attributes = !a.getAttribute(nb.expando)
    }();
    var Tb = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: lb.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    };
    Tb.optgroup = Tb.option, Tb.tbody = Tb.tfoot = Tb.colgroup = Tb.caption = Tb.thead, Tb.th = Tb.td;
    var Ub = /<|&#?\w+;/,
        Vb = /<tbody/i;
    ! function() {
        var b, c, d = db.createElement("div");
        for (b in {
                submit: !0,
                change: !0,
                focusin: !0
            }) c = "on" + b, (lb[b] = c in a) || (d.setAttribute(c, "t"), lb[b] = d.attributes[c].expando === !1);
        d = null
    }();
    var Wb = /^(?:input|select|textarea)$/i,
        Xb = /^key/,
        Yb = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        Zb = /^(?:focusinfocus|focusoutblur)$/,
        $b = /^([^.]*)(?:\.(.+)|)/;
    nb.event = {
        global: {},
        add: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = nb._data(a);
            if (q) {
                for (c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = nb.guid++), (g = q.events) || (g = q.events = {}), (k = q.handle) || (k = q.handle = function(a) {
                        return "undefined" == typeof nb || a && nb.event.triggered === a.type ? void 0 : nb.event.dispatch.apply(k.elem, arguments)
                    }, k.elem = a), b = (b || "").match(Db) || [""], h = b.length; h--;) f = $b.exec(b[h]) || [], n = p = f[1], o = (f[2] || "").split(".").sort(), n && (j = nb.event.special[n] || {}, n = (e ? j.delegateType : j.bindType) || n, j = nb.event.special[n] || {}, l = nb.extend({
                    type: n,
                    origType: p,
                    data: d,
                    handler: c,
                    guid: c.guid,
                    selector: e,
                    needsContext: e && nb.expr.match.needsContext.test(e),
                    namespace: o.join(".")
                }, i), (m = g[n]) || (m = g[n] = [], m.delegateCount = 0, j.setup && j.setup.call(a, d, o, k) !== !1 || (a.addEventListener ? a.addEventListener(n, k, !1) : a.attachEvent && a.attachEvent("on" + n, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? m.splice(m.delegateCount++, 0, l) : m.push(l), nb.event.global[n] = !0);
                a = null
            }
        },
        remove: function(a, b, c, d, e) {
            var f, g, h, i, j, k, l, m, n, o, p, q = nb.hasData(a) && nb._data(a);
            if (q && (k = q.events)) {
                for (b = (b || "").match(Db) || [""], j = b.length; j--;)
                    if (h = $b.exec(b[j]) || [], n = p = h[1], o = (h[2] || "").split(".").sort(), n) {
                        for (l = nb.event.special[n] || {}, n = (d ? l.delegateType : l.bindType) || n, m = k[n] || [], h = h[2] && new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)"), i = f = m.length; f--;) g = m[f], !e && p !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && ("**" !== d || !g.selector) || (m.splice(f, 1), g.selector && m.delegateCount--, l.remove && l.remove.call(a, g));
                        i && !m.length && (l.teardown && l.teardown.call(a, o, q.handle) !== !1 || nb.removeEvent(a, n, q.handle), delete k[n])
                    } else
                        for (n in k) nb.event.remove(a, n + b[j], c, d, !0);
                nb.isEmptyObject(k) && (delete q.handle, nb._removeData(a, "events"))
            }
        },
        trigger: function(b, c, d, e) {
            var f, g, h, i, j, k, l, m = [d || db],
                n = kb.call(b, "type") ? b.type : b,
                o = kb.call(b, "namespace") ? b.namespace.split(".") : [];
            if (h = k = d = d || db, 3 !== d.nodeType && 8 !== d.nodeType && !Zb.test(n + nb.event.triggered) && (n.indexOf(".") > -1 && (o = n.split("."), n = o.shift(), o.sort()), g = n.indexOf(":") < 0 && "on" + n, b = b[nb.expando] ? b : new nb.Event(n, "object" == typeof b && b), b.isTrigger = e ? 2 : 3, b.namespace = o.join("."), b.rnamespace = b.namespace ? new RegExp("(^|\\.)" + o.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, b.result = void 0, b.target || (b.target = d), c = null == c ? [b] : nb.makeArray(c, [b]), j = nb.event.special[n] || {}, e || !j.trigger || j.trigger.apply(d, c) !== !1)) {
                if (!e && !j.noBubble && !nb.isWindow(d)) {
                    for (i = j.delegateType || n, Zb.test(i + n) || (h = h.parentNode); h; h = h.parentNode) m.push(h), k = h;
                    k === (d.ownerDocument || db) && m.push(k.defaultView || k.parentWindow || a)
                }
                for (l = 0;
                    (h = m[l++]) && !b.isPropagationStopped();) b.type = l > 1 ? i : j.bindType || n, f = (nb._data(h, "events") || {})[b.type] && nb._data(h, "handle"), f && f.apply(h, c), f = g && h[g], f && f.apply && Gb(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault());
                if (b.type = n, !e && !b.isDefaultPrevented() && (!j._default || j._default.apply(m.pop(), c) === !1) && Gb(d) && g && d[n] && !nb.isWindow(d)) {
                    k = d[g], k && (d[g] = null), nb.event.triggered = n;
                    try {
                        d[n]()
                    } catch (p) {}
                    nb.event.triggered = void 0, k && (d[g] = k)
                }
                return b.result
            }
        },
        dispatch: function(a) {
            a = nb.event.fix(a);
            var b, c, d, e, f, g = [],
                h = eb.call(arguments),
                i = (nb._data(this, "events") || {})[a.type] || [],
                j = nb.event.special[a.type] || {};
            if (h[0] = a, a.delegateTarget = this, !j.preDispatch || j.preDispatch.call(this, a) !== !1) {
                for (g = nb.event.handlers.call(this, a, i), b = 0;
                    (e = g[b++]) && !a.isPropagationStopped();)
                    for (a.currentTarget = e.elem, c = 0;
                        (f = e.handlers[c++]) && !a.isImmediatePropagationStopped();) a.rnamespace && !a.rnamespace.test(f.namespace) || (a.handleObj = f, a.data = f.data, d = ((nb.event.special[f.origType] || {}).handle || f.handler).apply(e.elem, h), void 0 !== d && (a.result = d) === !1 && (a.preventDefault(), a.stopPropagation()));
                return j.postDispatch && j.postDispatch.call(this, a), a.result
            }
        },
        handlers: function(a, b) {
            var c, d, e, f, g = [],
                h = b.delegateCount,
                i = a.target;
            if (h && i.nodeType && ("click" !== a.type || isNaN(a.button) || a.button < 1))
                for (; i != this; i = i.parentNode || this)
                    if (1 === i.nodeType && (i.disabled !== !0 || "click" !== a.type)) {
                        for (d = [], c = 0; h > c; c++) f = b[c], e = f.selector + " ", void 0 === d[e] && (d[e] = f.needsContext ? nb(e, this).index(i) > -1 : nb.find(e, this, null, [i]).length), d[e] && d.push(f);
                        d.length && g.push({
                            elem: i,
                            handlers: d
                        })
                    }
            return h < b.length && g.push({
                elem: this,
                handlers: b.slice(h)
            }), g
        },
        fix: function(a) {
            if (a[nb.expando]) return a;
            var b, c, d, e = a.type,
                f = a,
                g = this.fixHooks[e];
            for (g || (this.fixHooks[e] = g = Yb.test(e) ? this.mouseHooks : Xb.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new nb.Event(f), b = d.length; b--;) c = d[b], a[c] = f[c];
            return a.target || (a.target = f.srcElement || db), 3 === a.target.nodeType && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return null == a.which && (a.which = null != b.charCode ? b.charCode : b.keyCode), a
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, b) {
                var c, d, e, f = b.button,
                    g = b.fromElement;
                return null == a.pageX && null != b.clientX && (d = a.target.ownerDocument || db, e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)), !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== u() && this.focus) try {
                        return this.focus(), !1
                    } catch (a) {}
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    return this === u() && this.blur ? (this.blur(), !1) : void 0
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    return nb.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : void 0
                },
                _default: function(a) {
                    return nb.nodeName(a.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(a) {
                    void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result)
                }
            }
        },
        simulate: function(a, b, c) {
            var d = nb.extend(new nb.Event, c, {
                type: a,
                isSimulated: !0
            });
            nb.event.trigger(d, null, b), d.isDefaultPrevented() && c.preventDefault()
        }
    }, nb.removeEvent = db.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c)
    } : function(a, b, c) {
        var d = "on" + b;
        a.detachEvent && ("undefined" == typeof a[d] && (a[d] = null), a.detachEvent(d, c))
    }, nb.Event = function(a, b) {
        return this instanceof nb.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? s : t) : this.type = a, b && nb.extend(this, b), this.timeStamp = a && a.timeStamp || nb.now(), void(this[nb.expando] = !0)) : new nb.Event(a, b)
    }, nb.Event.prototype = {
        constructor: nb.Event,
        isDefaultPrevented: t,
        isPropagationStopped: t,
        isImmediatePropagationStopped: t,
        preventDefault: function() {
            var a = this.originalEvent;
            this.isDefaultPrevented = s, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1)
        },
        stopPropagation: function() {
            var a = this.originalEvent;
            this.isPropagationStopped = s, a && !this.isSimulated && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0)
        },
        stopImmediatePropagation: function() {
            var a = this.originalEvent;
            this.isImmediatePropagationStopped = s, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation()
        }
    }, nb.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(a, b) {
        nb.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c, d = this,
                    e = a.relatedTarget,
                    f = a.handleObj;
                return e && (e === d || nb.contains(d, e)) || (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c
            }
        }
    }), lb.submit || (nb.event.special.submit = {
        setup: function() {
            return nb.nodeName(this, "form") ? !1 : void nb.event.add(this, "click._submit keypress._submit", function(a) {
                var b = a.target,
                    c = nb.nodeName(b, "input") || nb.nodeName(b, "button") ? nb.prop(b, "form") : void 0;
                c && !nb._data(c, "submit") && (nb.event.add(c, "submit._submit", function(a) {
                    a._submitBubble = !0
                }), nb._data(c, "submit", !0))
            })
        },
        postDispatch: function(a) {
            a._submitBubble && (delete a._submitBubble, this.parentNode && !a.isTrigger && nb.event.simulate("submit", this.parentNode, a))
        },
        teardown: function() {
            return nb.nodeName(this, "form") ? !1 : void nb.event.remove(this, "._submit")
        }
    }), lb.change || (nb.event.special.change = {
        setup: function() {
            return Wb.test(this.nodeName) ? ("checkbox" !== this.type && "radio" !== this.type || (nb.event.add(this, "propertychange._change", function(a) {
                "checked" === a.originalEvent.propertyName && (this._justChanged = !0)
            }), nb.event.add(this, "click._change", function(a) {
                this._justChanged && !a.isTrigger && (this._justChanged = !1), nb.event.simulate("change", this, a)
            })), !1) : void nb.event.add(this, "beforeactivate._change", function(a) {
                var b = a.target;
                Wb.test(b.nodeName) && !nb._data(b, "change") && (nb.event.add(b, "change._change", function(a) {
                    !this.parentNode || a.isSimulated || a.isTrigger || nb.event.simulate("change", this.parentNode, a)
                }), nb._data(b, "change", !0))
            })
        },
        handle: function(a) {
            var b = a.target;
            return this !== b || a.isSimulated || a.isTrigger || "radio" !== b.type && "checkbox" !== b.type ? a.handleObj.handler.apply(this, arguments) : void 0
        },
        teardown: function() {
            return nb.event.remove(this, "._change"), !Wb.test(this.nodeName)
        }
    }), lb.focusin || nb.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var c = function(a) {
            nb.event.simulate(b, a.target, nb.event.fix(a))
        };
        nb.event.special[b] = {
            setup: function() {
                var d = this.ownerDocument || this,
                    e = nb._data(d, b);
                e || d.addEventListener(a, c, !0), nb._data(d, b, (e || 0) + 1)
            },
            teardown: function() {
                var d = this.ownerDocument || this,
                    e = nb._data(d, b) - 1;
                e ? nb._data(d, b, e) : (d.removeEventListener(a, c, !0), nb._removeData(d, b))
            }
        }
    }), nb.fn.extend({
        on: function(a, b, c, d) {
            return v(this, a, b, c, d)
        },
        one: function(a, b, c, d) {
            return v(this, a, b, c, d, 1)
        },
        off: function(a, b, c) {
            var d, e;
            if (a && a.preventDefault && a.handleObj) return d = a.handleObj, nb(a.delegateTarget).off(d.namespace ? d.origType + "." + d.namespace : d.origType, d.selector, d.handler), this;
            if ("object" == typeof a) {
                for (e in a) this.off(e, b, a[e]);
                return this
            }
            return b !== !1 && "function" != typeof b || (c = b, b = void 0), c === !1 && (c = t), this.each(function() {
                nb.event.remove(this, a, c, b)
            })
        },
        trigger: function(a, b) {
            return this.each(function() {
                nb.event.trigger(a, b, this)
            })
        },
        triggerHandler: function(a, b) {
            var c = this[0];
            return c ? nb.event.trigger(a, b, c, !0) : void 0
        }
    });
    var _b = / jQuery\d+="(?:null|\d+)"/g,
        ac = new RegExp("<(?:" + Sb + ")[\\s/>]", "i"),
        bc = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
        cc = /<script|<style|<link/i,
        dc = /checked\s*(?:[^=]|=\s*.checked.)/i,
        ec = /^true\/(.*)/,
        fc = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        gc = n(db),
        hc = gc.appendChild(db.createElement("div"));
    nb.extend({
        htmlPrefilter: function(a) {
            return a.replace(bc, "<$1></$2>")
        },
        clone: function(a, b, c) {
            var d, e, f, g, h, i = nb.contains(a.ownerDocument, a);
            if (lb.html5Clone || nb.isXMLDoc(a) || !ac.test("<" + a.nodeName + ">") ? f = a.cloneNode(!0) : (hc.innerHTML = a.outerHTML, hc.removeChild(f = hc.firstChild)), !(lb.noCloneEvent && lb.noCloneChecked || 1 !== a.nodeType && 11 !== a.nodeType || nb.isXMLDoc(a)))
                for (d = o(f), h = o(a), g = 0; null != (e = h[g]); ++g) d[g] && A(e, d[g]);
            if (b)
                if (c)
                    for (h = h || o(a), d = d || o(f), g = 0; null != (e = h[g]); g++) z(e, d[g]);
                else z(a, f);
            return d = o(f, "script"), d.length > 0 && p(d, !i && o(a, "script")), d = h = e = null, f
        },
        cleanData: function(a, b) {
            for (var c, d, e, f, g = 0, h = nb.expando, i = nb.cache, j = lb.attributes, k = nb.event.special; null != (c = a[g]); g++)
                if ((b || Gb(c)) && (e = c[h], f = e && i[e])) {
                    if (f.events)
                        for (d in f.events) k[d] ? nb.event.remove(c, d) : nb.removeEvent(c, d, f.handle);
                    i[e] && (delete i[e], j || "undefined" == typeof c.removeAttribute ? c[h] = void 0 : c.removeAttribute(h), cb.push(e))
                }
        }
    }), nb.fn.extend({
        domManip: B,
        detach: function(a) {
            return C(this, a, !0)
        },
        remove: function(a) {
            return C(this, a)
        },
        text: function(a) {
            return Nb(this, function(a) {
                return void 0 === a ? nb.text(this) : this.empty().append((this[0] && this[0].ownerDocument || db).createTextNode(a))
            }, null, a, arguments.length)
        },
        append: function() {
            return B(this, arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = w(this, a);
                    b.appendChild(a)
                }
            })
        },
        prepend: function() {
            return B(this, arguments, function(a) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var b = w(this, a);
                    b.insertBefore(a, b.firstChild)
                }
            })
        },
        before: function() {
            return B(this, arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this)
            })
        },
        after: function() {
            return B(this, arguments, function(a) {
                this.parentNode && this.parentNode.insertBefore(a, this.nextSibling)
            })
        },
        empty: function() {
            for (var a, b = 0; null != (a = this[b]); b++) {
                for (1 === a.nodeType && nb.cleanData(o(a, !1)); a.firstChild;) a.removeChild(a.firstChild);
                a.options && nb.nodeName(a, "select") && (a.options.length = 0)
            }
            return this
        },
        clone: function(a, b) {
            return a = null == a ? !1 : a, b = null == b ? a : b, this.map(function() {
                return nb.clone(this, a, b)
            })
        },
        html: function(a) {
            return Nb(this, function(a) {
                var b = this[0] || {},
                    c = 0,
                    d = this.length;
                if (void 0 === a) return 1 === b.nodeType ? b.innerHTML.replace(_b, "") : void 0;
                if (!("string" != typeof a || cc.test(a) || !lb.htmlSerialize && ac.test(a) || !lb.leadingWhitespace && Rb.test(a) || Tb[(Pb.exec(a) || ["", ""])[1].toLowerCase()])) {
                    a = nb.htmlPrefilter(a);
                    try {
                        for (; d > c; c++) b = this[c] || {}, 1 === b.nodeType && (nb.cleanData(o(b, !1)), b.innerHTML = a);
                        b = 0
                    } catch (e) {}
                }
                b && this.empty().append(a)
            }, null, a, arguments.length)
        },
        replaceWith: function() {
            var a = [];
            return B(this, arguments, function(b) {
                var c = this.parentNode;
                nb.inArray(this, a) < 0 && (nb.cleanData(o(this)), c && c.replaceChild(b, this))
            }, a)
        }
    }), nb.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        nb.fn[a] = function(a) {
            for (var c, d = 0, e = [], f = nb(a), g = f.length - 1; g >= d; d++) c = d === g ? this : this.clone(!0), nb(f[d])[b](c), gb.apply(e, c.get());
            return this.pushStack(e)
        }
    });
    var ic, jc = {
            HTML: "block",
            BODY: "block"
        },
        kc = /^margin/,
        lc = new RegExp("^(" + Jb + ")(?!px)[a-z%]+$", "i"),
        mc = function(a, b, c, d) {
            var e, f, g = {};
            for (f in b) g[f] = a.style[f], a.style[f] = b[f];
            e = c.apply(a, d || []);
            for (f in b) a.style[f] = g[f];
            return e
        },
        nc = db.documentElement;
    ! function() {
        function b() {
            var b, k, l = db.documentElement;
            l.appendChild(i), j.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", c = e = h = !1, d = g = !0, a.getComputedStyle && (k = a.getComputedStyle(j), c = "1%" !== (k || {}).top, h = "2px" === (k || {}).marginLeft, e = "4px" === (k || {
                width: "4px"
            }).width, j.style.marginRight = "50%", d = "4px" === (k || {
                marginRight: "4px"
            }).marginRight, b = j.appendChild(db.createElement("div")), b.style.cssText = j.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", b.style.marginRight = b.style.width = "0", j.style.width = "1px", g = !parseFloat((a.getComputedStyle(b) || {}).marginRight), j.removeChild(b)), j.style.display = "none", f = 0 === j.getClientRects().length, f && (j.style.display = "", j.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", j.childNodes[0].style.borderCollapse = "separate", b = j.getElementsByTagName("td"), b[0].style.cssText = "margin:0;border:0;padding:0;display:none", f = 0 === b[0].offsetHeight, f && (b[0].style.display = "", b[1].style.display = "none", f = 0 === b[0].offsetHeight)), l.removeChild(i)
        }
        var c, d, e, f, g, h, i = db.createElement("div"),
            j = db.createElement("div");
        j.style && (j.style.cssText = "float:left;opacity:.5", lb.opacity = "0.5" === j.style.opacity, lb.cssFloat = !!j.style.cssFloat, j.style.backgroundClip = "content-box", j.cloneNode(!0).style.backgroundClip = "", lb.clearCloneStyle = "content-box" === j.style.backgroundClip, i = db.createElement("div"), i.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", j.innerHTML = "", i.appendChild(j), lb.boxSizing = "" === j.style.boxSizing || "" === j.style.MozBoxSizing || "" === j.style.WebkitBoxSizing, nb.extend(lb, {
            reliableHiddenOffsets: function() {
                return null == c && b(), f
            },
            boxSizingReliable: function() {
                return null == c && b(), e
            },
            pixelMarginRight: function() {
                return null == c && b(), d
            },
            pixelPosition: function() {
                return null == c && b(), c
            },
            reliableMarginRight: function() {
                return null == c && b(), g
            },
            reliableMarginLeft: function() {
                return null == c && b(), h
            }
        }))
    }();
    var oc, pc, qc = /^(top|right|bottom|left)$/;
    a.getComputedStyle ? (oc = function(b) {
        var c = b.ownerDocument.defaultView;
        return c && c.opener || (c = a), c.getComputedStyle(b)
    }, pc = function(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || oc(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, "" !== g && void 0 !== g || nb.contains(a.ownerDocument, a) || (g = nb.style(a, b)), c && !lb.pixelMarginRight() && lc.test(g) && kc.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f), void 0 === g ? g : g + ""
    }) : nc.currentStyle && (oc = function(a) {
        return a.currentStyle
    }, pc = function(a, b, c) {
        var d, e, f, g, h = a.style;
        return c = c || oc(a), g = c ? c[b] : void 0, null == g && h && h[b] && (g = h[b]), lc.test(g) && !qc.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = "fontSize" === b ? "1em" : g, g = h.pixelLeft + "px", h.left = d, f && (e.left = f)), void 0 === g ? g : g + "" || "auto"
    });
    var rc = /alpha\([^)]*\)/i,
        sc = /opacity\s*=\s*([^)]*)/i,
        tc = /^(none|table(?!-c[ea]).+)/,
        uc = new RegExp("^(" + Jb + ")(.*)$", "i"),
        vc = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        wc = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        xc = ["Webkit", "O", "Moz", "ms"],
        yc = db.createElement("div").style;
    nb.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = pc(a, "opacity");
                        return "" === c ? "1" : c
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": lb.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e, f, g, h = nb.camelCase(b),
                    i = a.style;
                if (b = nb.cssProps[h] || (nb.cssProps[h] = G(h) || h), g = nb.cssHooks[b] || nb.cssHooks[h], void 0 === c) return g && "get" in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b];
                if (f = typeof c, "string" === f && (e = Kb.exec(c)) && e[1] && (c = m(a, b, e), f = "number"), null != c && c === c && ("number" === f && (c += e && e[3] || (nb.cssNumber[h] ? "" : "px")), lb.clearCloneStyle || "" !== c || 0 !== b.indexOf("background") || (i[b] = "inherit"), !(g && "set" in g && void 0 === (c = g.set(a, c, d))))) try {
                    i[b] = c
                } catch (j) {}
            }
        },
        css: function(a, b, c, d) {
            var e, f, g, h = nb.camelCase(b);
            return b = nb.cssProps[h] || (nb.cssProps[h] = G(h) || h), g = nb.cssHooks[b] || nb.cssHooks[h], g && "get" in g && (f = g.get(a, !0, c)), void 0 === f && (f = pc(a, b, d)), "normal" === f && b in wc && (f = wc[b]), "" === c || c ? (e = parseFloat(f), c === !0 || isFinite(e) ? e || 0 : f) : f
        }
    }), nb.each(["height", "width"], function(a, b) {
        nb.cssHooks[b] = {
            get: function(a, c, d) {
                return c ? tc.test(nb.css(a, "display")) && 0 === a.offsetWidth ? mc(a, vc, function() {
                    return K(a, b, d)
                }) : K(a, b, d) : void 0
            },
            set: function(a, c, d) {
                var e = d && oc(a);
                return I(a, c, d ? J(a, b, d, lb.boxSizing && "border-box" === nb.css(a, "boxSizing", !1, e), e) : 0)
            }
        }
    }), lb.opacity || (nb.cssHooks.opacity = {
        get: function(a, b) {
            return sc.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : ""
        },
        set: function(a, b) {
            var c = a.style,
                d = a.currentStyle,
                e = nb.isNumeric(b) ? "alpha(opacity=" + 100 * b + ")" : "",
                f = d && d.filter || c.filter || "";
            c.zoom = 1, (b >= 1 || "" === b) && "" === nb.trim(f.replace(rc, "")) && c.removeAttribute && (c.removeAttribute("filter"), "" === b || d && !d.filter) || (c.filter = rc.test(f) ? f.replace(rc, e) : f + " " + e)
        }
    }), nb.cssHooks.marginRight = F(lb.reliableMarginRight, function(a, b) {
        return b ? mc(a, {
            display: "inline-block"
        }, pc, [a, "marginRight"]) : void 0
    }), nb.cssHooks.marginLeft = F(lb.reliableMarginLeft, function(a, b) {
        return b ? (parseFloat(pc(a, "marginLeft")) || (nb.contains(a.ownerDocument, a) ? a.getBoundingClientRect().left - mc(a, {
            marginLeft: 0
        }, function() {
            return a.getBoundingClientRect().left
        }) : 0)) + "px" : void 0
    }), nb.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(a, b) {
        nb.cssHooks[a + b] = {
            expand: function(c) {
                for (var d = 0, e = {}, f = "string" == typeof c ? c.split(" ") : [c]; 4 > d; d++) e[a + Lb[d] + b] = f[d] || f[d - 2] || f[0];
                return e
            }
        }, kc.test(a) || (nb.cssHooks[a + b].set = I)
    }), nb.fn.extend({
        css: function(a, b) {
            return Nb(this, function(a, b, c) {
                var d, e, f = {},
                    g = 0;
                if (nb.isArray(b)) {
                    for (d = oc(a), e = b.length; e > g; g++) f[b[g]] = nb.css(a, b[g], !1, d);
                    return f
                }
                return void 0 !== c ? nb.style(a, b, c) : nb.css(a, b)
            }, a, b, arguments.length > 1)
        },
        show: function() {
            return H(this, !0)
        },
        hide: function() {
            return H(this)
        },
        toggle: function(a) {
            return "boolean" == typeof a ? a ? this.show() : this.hide() : this.each(function() {
                Mb(this) ? nb(this).show() : nb(this).hide()
            })
        }
    }), nb.Tween = L, L.prototype = {
        constructor: L,
        init: function(a, b, c, d, e, f) {
            this.elem = a, this.prop = c, this.easing = e || nb.easing._default, this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (nb.cssNumber[c] ? "" : "px")
        },
        cur: function() {
            var a = L.propHooks[this.prop];
            return a && a.get ? a.get(this) : L.propHooks._default.get(this)
        },
        run: function(a) {
            var b, c = L.propHooks[this.prop];
            return this.pos = b = this.options.duration ? nb.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : L.propHooks._default.set(this), this
        }
    }, L.prototype.init.prototype = L.prototype, L.propHooks = {
        _default: {
            get: function(a) {
                var b;
                return 1 !== a.elem.nodeType || null != a.elem[a.prop] && null == a.elem.style[a.prop] ? a.elem[a.prop] : (b = nb.css(a.elem, a.prop, ""), b && "auto" !== b ? b : 0)
            },
            set: function(a) {
                nb.fx.step[a.prop] ? nb.fx.step[a.prop](a) : 1 !== a.elem.nodeType || null == a.elem.style[nb.cssProps[a.prop]] && !nb.cssHooks[a.prop] ? a.elem[a.prop] = a.now : nb.style(a.elem, a.prop, a.now + a.unit)
            }
        }
    }, L.propHooks.scrollTop = L.propHooks.scrollLeft = {
        set: function(a) {
            a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now)
        }
    }, nb.easing = {
        linear: function(a) {
            return a
        },
        swing: function(a) {
            return .5 - Math.cos(a * Math.PI) / 2
        },
        _default: "swing"
    }, nb.fx = L.prototype.init, nb.fx.step = {};
    var zc, Ac, Bc = /^(?:toggle|show|hide)$/,
        Cc = /queueHooks$/;
    nb.Animation = nb.extend(R, {
            tweeners: {
                "*": [function(a, b) {
                    var c = this.createTween(a, b);
                    return m(c.elem, a, Kb.exec(b), c), c
                }]
            },
            tweener: function(a, b) {
                nb.isFunction(a) ? (b = a, a = ["*"]) : a = a.match(Db);
                for (var c, d = 0, e = a.length; e > d; d++) c = a[d], R.tweeners[c] = R.tweeners[c] || [], R.tweeners[c].unshift(b)
            },
            prefilters: [P],
            prefilter: function(a, b) {
                b ? R.prefilters.unshift(a) : R.prefilters.push(a)
            }
        }), nb.speed = function(a, b, c) {
            var d = a && "object" == typeof a ? nb.extend({}, a) : {
                complete: c || !c && b || nb.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !nb.isFunction(b) && b
            };
            return d.duration = nb.fx.off ? 0 : "number" == typeof d.duration ? d.duration : d.duration in nb.fx.speeds ? nb.fx.speeds[d.duration] : nb.fx.speeds._default, null != d.queue && d.queue !== !0 || (d.queue = "fx"), d.old = d.complete, d.complete = function() {
                nb.isFunction(d.old) && d.old.call(this), d.queue && nb.dequeue(this, d.queue)
            }, d
        }, nb.fn.extend({
            fadeTo: function(a, b, c, d) {
                return this.filter(Mb).css("opacity", 0).show().end().animate({
                    opacity: b
                }, a, c, d)
            },
            animate: function(a, b, c, d) {
                var e = nb.isEmptyObject(a),
                    f = nb.speed(b, c, d),
                    g = function() {
                        var b = R(this, nb.extend({}, a), f);
                        (e || nb._data(this, "finish")) && b.stop(!0)
                    };
                return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
            },
            stop: function(a, b, c) {
                var d = function(a) {
                    var b = a.stop;
                    delete a.stop, b(c)
                };
                return "string" != typeof a && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || "fx", []), this.each(function() {
                    var b = !0,
                        e = null != a && a + "queueHooks",
                        f = nb.timers,
                        g = nb._data(this);
                    if (e) g[e] && g[e].stop && d(g[e]);
                    else
                        for (e in g) g[e] && g[e].stop && Cc.test(e) && d(g[e]);
                    for (e = f.length; e--;) f[e].elem !== this || null != a && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1));
                    !b && c || nb.dequeue(this, a)
                })
            },
            finish: function(a) {
                return a !== !1 && (a = a || "fx"), this.each(function() {
                    var b, c = nb._data(this),
                        d = c[a + "queue"],
                        e = c[a + "queueHooks"],
                        f = nb.timers,
                        g = d ? d.length : 0;
                    for (c.finish = !0, nb.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;) f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1));
                    for (b = 0; g > b; b++) d[b] && d[b].finish && d[b].finish.call(this);
                    delete c.finish
                })
            }
        }), nb.each(["toggle", "show", "hide"], function(a, b) {
            var c = nb.fn[b];
            nb.fn[b] = function(a, d, e) {
                return null == a || "boolean" == typeof a ? c.apply(this, arguments) : this.animate(N(b, !0), a, d, e)
            }
        }), nb.each({
            slideDown: N("show"),
            slideUp: N("hide"),
            slideToggle: N("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(a, b) {
            nb.fn[a] = function(a, c, d) {
                return this.animate(b, a, c, d)
            }
        }), nb.timers = [], nb.fx.tick = function() {
            var a, b = nb.timers,
                c = 0;
            for (zc = nb.now(); c < b.length; c++) a = b[c], a() || b[c] !== a || b.splice(c--, 1);
            b.length || nb.fx.stop(), zc = void 0
        }, nb.fx.timer = function(a) {
            nb.timers.push(a), a() ? nb.fx.start() : nb.timers.pop()
        }, nb.fx.interval = 13, nb.fx.start = function() {
            Ac || (Ac = a.setInterval(nb.fx.tick, nb.fx.interval))
        }, nb.fx.stop = function() {
            a.clearInterval(Ac), Ac = null
        }, nb.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, nb.fn.delay = function(b, c) {
            return b = nb.fx ? nb.fx.speeds[b] || b : b, c = c || "fx", this.queue(c, function(c, d) {
                var e = a.setTimeout(c, b);
                d.stop = function() {
                    a.clearTimeout(e)
                }
            })
        },
        function() {
            var a, b = db.createElement("input"),
                c = db.createElement("div"),
                d = db.createElement("select"),
                e = d.appendChild(db.createElement("option"));
            c = db.createElement("div"), c.setAttribute("className", "t"), c.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", a = c.getElementsByTagName("a")[0], b.setAttribute("type", "checkbox"), c.appendChild(b), a = c.getElementsByTagName("a")[0], a.style.cssText = "top:1px", lb.getSetAttribute = "t" !== c.className, lb.style = /top/.test(a.getAttribute("style")), lb.hrefNormalized = "/a" === a.getAttribute("href"), lb.checkOn = !!b.value, lb.optSelected = e.selected, lb.enctype = !!db.createElement("form").enctype, d.disabled = !0, lb.optDisabled = !e.disabled, b = db.createElement("input"), b.setAttribute("value", ""), lb.input = "" === b.getAttribute("value"), b.value = "t", b.setAttribute("type", "radio"), lb.radioValue = "t" === b.value
        }();
    var Dc = /\r/g,
        Ec = /[\x20\t\r\n\f]+/g;
    nb.fn.extend({
        val: function(a) {
            var b, c, d, e = this[0];
            return arguments.length ? (d = nb.isFunction(a), this.each(function(c) {
                var e;
                1 === this.nodeType && (e = d ? a.call(this, c, nb(this).val()) : a, null == e ? e = "" : "number" == typeof e ? e += "" : nb.isArray(e) && (e = nb.map(e, function(a) {
                    return null == a ? "" : a + ""
                })), b = nb.valHooks[this.type] || nb.valHooks[this.nodeName.toLowerCase()], b && "set" in b && void 0 !== b.set(this, e, "value") || (this.value = e))
            })) : e ? (b = nb.valHooks[e.type] || nb.valHooks[e.nodeName.toLowerCase()], b && "get" in b && void 0 !== (c = b.get(e, "value")) ? c : (c = e.value, "string" == typeof c ? c.replace(Dc, "") : null == c ? "" : c)) : void 0
        }
    }), nb.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = nb.find.attr(a, "value");
                    return null != b ? b : nb.trim(nb.text(a)).replace(Ec, " ")
                }
            },
            select: {
                get: function(a) {
                    for (var b, c, d = a.options, e = a.selectedIndex, f = "select-one" === a.type || 0 > e, g = f ? null : [], h = f ? e + 1 : d.length, i = 0 > e ? h : f ? e : 0; h > i; i++)
                        if (c = d[i], !(!c.selected && i !== e || (lb.optDisabled ? c.disabled : null !== c.getAttribute("disabled")) || c.parentNode.disabled && nb.nodeName(c.parentNode, "optgroup"))) {
                            if (b = nb(c).val(), f) return b;
                            g.push(b)
                        }
                    return g
                },
                set: function(a, b) {
                    for (var c, d, e = a.options, f = nb.makeArray(b), g = e.length; g--;)
                        if (d = e[g], nb.inArray(nb.valHooks.option.get(d), f) > -1) try {
                            d.selected = c = !0
                        } catch (h) {
                            d.scrollHeight
                        } else d.selected = !1;
                    return c || (a.selectedIndex = -1), e
                }
            }
        }
    }), nb.each(["radio", "checkbox"], function() {
        nb.valHooks[this] = {
            set: function(a, b) {
                return nb.isArray(b) ? a.checked = nb.inArray(nb(a).val(), b) > -1 : void 0
            }
        }, lb.checkOn || (nb.valHooks[this].get = function(a) {
            return null === a.getAttribute("value") ? "on" : a.value
        })
    });
    var Fc, Gc, Hc = nb.expr.attrHandle,
        Ic = /^(?:checked|selected)$/i,
        Jc = lb.getSetAttribute,
        Kc = lb.input;
    nb.fn.extend({
        attr: function(a, b) {
            return Nb(this, nb.attr, a, b, arguments.length > 1)
        },
        removeAttr: function(a) {
            return this.each(function() {
                nb.removeAttr(this, a)
            })
        }
    }), nb.extend({
        attr: function(a, b, c) {
            var d, e, f = a.nodeType;
            return 3 !== f && 8 !== f && 2 !== f ? "undefined" == typeof a.getAttribute ? nb.prop(a, b, c) : (1 === f && nb.isXMLDoc(a) || (b = b.toLowerCase(), e = nb.attrHooks[b] || (nb.expr.match.bool.test(b) ? Gc : Fc)), void 0 !== c ? null === c ? void nb.removeAttr(a, b) : e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : (a.setAttribute(b, c + ""), c) : e && "get" in e && null !== (d = e.get(a, b)) ? d : (d = nb.find.attr(a, b), null == d ? void 0 : d)) : void 0
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (!lb.radioValue && "radio" === b && nb.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b
                    }
                }
            }
        },
        removeAttr: function(a, b) {
            var c, d, e = 0,
                f = b && b.match(Db);
            if (f && 1 === a.nodeType)
                for (; c = f[e++];) d = nb.propFix[c] || c, nb.expr.match.bool.test(c) ? Kc && Jc || !Ic.test(c) ? a[d] = !1 : a[nb.camelCase("default-" + c)] = a[d] = !1 : nb.attr(a, c, ""), a.removeAttribute(Jc ? c : d)
        }
    }), Gc = {
        set: function(a, b, c) {
            return b === !1 ? nb.removeAttr(a, c) : Kc && Jc || !Ic.test(c) ? a.setAttribute(!Jc && nb.propFix[c] || c, c) : a[nb.camelCase("default-" + c)] = a[c] = !0, c
        }
    }, nb.each(nb.expr.match.bool.source.match(/\w+/g), function(a, b) {
        var c = Hc[b] || nb.find.attr;
        Hc[b] = Kc && Jc || !Ic.test(b) ? function(a, b, d) {
            var e, f;
            return d || (f = Hc[b], Hc[b] = e, e = null != c(a, b, d) ? b.toLowerCase() : null, Hc[b] = f), e
        } : function(a, b, c) {
            return c ? void 0 : a[nb.camelCase("default-" + b)] ? b.toLowerCase() : null
        }
    }), Kc && Jc || (nb.attrHooks.value = {
        set: function(a, b, c) {
            return nb.nodeName(a, "input") ? void(a.defaultValue = b) : Fc && Fc.set(a, b, c)
        }
    }), Jc || (Fc = {
        set: function(a, b, c) {
            var d = a.getAttributeNode(c);
            return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += "", "value" === c || b === a.getAttribute(c) ? b : void 0
        }
    }, Hc.id = Hc.name = Hc.coords = function(a, b, c) {
        var d;
        return c ? void 0 : (d = a.getAttributeNode(b)) && "" !== d.value ? d.value : null
    }, nb.valHooks.button = {
        get: function(a, b) {
            var c = a.getAttributeNode(b);
            return c && c.specified ? c.value : void 0
        },
        set: Fc.set
    }, nb.attrHooks.contenteditable = {
        set: function(a, b, c) {
            Fc.set(a, "" === b ? !1 : b, c)
        }
    }, nb.each(["width", "height"], function(a, b) {
        nb.attrHooks[b] = {
            set: function(a, c) {
                return "" === c ? (a.setAttribute(b, "auto"), c) : void 0
            }
        }
    })), lb.style || (nb.attrHooks.style = {
        get: function(a) {
            return a.style.cssText || void 0
        },
        set: function(a, b) {
            return a.style.cssText = b + ""
        }
    });
    var Lc = /^(?:input|select|textarea|button|object)$/i,
        Mc = /^(?:a|area)$/i;
    nb.fn.extend({
        prop: function(a, b) {
            return Nb(this, nb.prop, a, b, arguments.length > 1)
        },
        removeProp: function(a) {
            return a = nb.propFix[a] || a, this.each(function() {
                try {
                    this[a] = void 0, delete this[a]
                } catch (b) {}
            })
        }
    }), nb.extend({
        prop: function(a, b, c) {
            var d, e, f = a.nodeType;
            return 3 !== f && 8 !== f && 2 !== f ? (1 === f && nb.isXMLDoc(a) || (b = nb.propFix[b] || b, e = nb.propHooks[b]), void 0 !== c ? e && "set" in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && "get" in e && null !== (d = e.get(a, b)) ? d : a[b]) : void 0
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var b = nb.find.attr(a, "tabindex");
                    return b ? parseInt(b, 10) : Lc.test(a.nodeName) || Mc.test(a.nodeName) && a.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }), lb.hrefNormalized || nb.each(["href", "src"], function(a, b) {
        nb.propHooks[b] = {
            get: function(a) {
                return a.getAttribute(b, 4)
            }
        }
    }), lb.optSelected || (nb.propHooks.selected = {
        get: function(a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null
        },
        set: function(a) {
            var b = a.parentNode;
            b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex)
        }
    }), nb.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        nb.propFix[this.toLowerCase()] = this
    }), lb.enctype || (nb.propFix.enctype = "encoding");
    var Nc = /[\t\r\n\f]/g;
    nb.fn.extend({
        addClass: function(a) {
            var b, c, d, e, f, g, h, i = 0;
            if (nb.isFunction(a)) return this.each(function(b) {
                nb(this).addClass(a.call(this, b, S(this)))
            });
            if ("string" == typeof a && a)
                for (b = a.match(Db) || []; c = this[i++];)
                    if (e = S(c), d = 1 === c.nodeType && (" " + e + " ").replace(Nc, " ")) {
                        for (g = 0; f = b[g++];) d.indexOf(" " + f + " ") < 0 && (d += f + " ");
                        h = nb.trim(d), e !== h && nb.attr(c, "class", h)
                    }
            return this
        },
        removeClass: function(a) {
            var b, c, d, e, f, g, h, i = 0;
            if (nb.isFunction(a)) return this.each(function(b) {
                nb(this).removeClass(a.call(this, b, S(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof a && a)
                for (b = a.match(Db) || []; c = this[i++];)
                    if (e = S(c), d = 1 === c.nodeType && (" " + e + " ").replace(Nc, " ")) {
                        for (g = 0; f = b[g++];)
                            for (; d.indexOf(" " + f + " ") > -1;) d = d.replace(" " + f + " ", " ");
                        h = nb.trim(d), e !== h && nb.attr(c, "class", h)
                    }
            return this
        },
        toggleClass: function(a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c ? b ? this.addClass(a) : this.removeClass(a) : nb.isFunction(a) ? this.each(function(c) {
                nb(this).toggleClass(a.call(this, c, S(this), b), b)
            }) : this.each(function() {
                var b, d, e, f;
                if ("string" === c)
                    for (d = 0, e = nb(this), f = a.match(Db) || []; b = f[d++];) e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                else void 0 !== a && "boolean" !== c || (b = S(this), b && nb._data(this, "__className__", b), nb.attr(this, "class", b || a === !1 ? "" : nb._data(this, "__className__") || ""))
            })
        },
        hasClass: function(a) {
            var b, c, d = 0;
            for (b = " " + a + " "; c = this[d++];)
                if (1 === c.nodeType && (" " + S(c) + " ").replace(Nc, " ").indexOf(b) > -1) return !0;
            return !1
        }
    }), nb.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        nb.fn[b] = function(a, c) {
            return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b)
        }
    }), nb.fn.extend({
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a)
        }
    });
    var Oc = a.location,
        Pc = nb.now(),
        Qc = /\?/,
        Rc = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    nb.parseJSON = function(b) {
        if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");
        var c, d = null,
            e = nb.trim(b + "");
        return e && !nb.trim(e.replace(Rc, function(a, b, e, f) {
            return c && b && (d = 0), 0 === d ? a : (c = e || b, d += !f - !e, "")
        })) ? Function("return " + e)() : nb.error("Invalid JSON: " + b)
    }, nb.parseXML = function(b) {
        var c, d;
        if (!b || "string" != typeof b) return null;
        try {
            a.DOMParser ? (d = new a.DOMParser, c = d.parseFromString(b, "text/xml")) : (c = new a.ActiveXObject("Microsoft.XMLDOM"), c.async = "false", c.loadXML(b))
        } catch (e) {
            c = void 0
        }
        return c && c.documentElement && !c.getElementsByTagName("parsererror").length || nb.error("Invalid XML: " + b), c
    };
    var Sc = /#.*$/,
        Tc = /([?&])_=[^&]*/,
        Uc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Vc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Wc = /^(?:GET|HEAD)$/,
        Xc = /^\/\//,
        Yc = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        Zc = {},
        $c = {},
        _c = "*/".concat("*"),
        ad = Oc.href,
        bd = Yc.exec(ad.toLowerCase()) || [];
    nb.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: ad,
            type: "GET",
            isLocal: Vc.test(bd[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": _c,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": nb.parseJSON,
                "text xml": nb.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(a, b) {
            return b ? V(V(a, nb.ajaxSettings), b) : V(nb.ajaxSettings, a)
        },
        ajaxPrefilter: T(Zc),
        ajaxTransport: T($c),
        ajax: function(b, c) {
            function d(b, c, d, e) {
                var f, l, s, t, v, x = c;
                2 !== u && (u = 2, i && a.clearTimeout(i), k = void 0, h = e || "", w.readyState = b > 0 ? 4 : 0, f = b >= 200 && 300 > b || 304 === b, d && (t = W(m, w, d)), t = X(m, t, w, f), f ? (m.ifModified && (v = w.getResponseHeader("Last-Modified"), v && (nb.lastModified[g] = v), v = w.getResponseHeader("etag"), v && (nb.etag[g] = v)), 204 === b || "HEAD" === m.type ? x = "nocontent" : 304 === b ? x = "notmodified" : (x = t.state, l = t.data, s = t.error, f = !s)) : (s = x, !b && x || (x = "error", 0 > b && (b = 0))), w.status = b, w.statusText = (c || x) + "", f ? p.resolveWith(n, [l, x, w]) : p.rejectWith(n, [w, x, s]), w.statusCode(r), r = void 0, j && o.trigger(f ? "ajaxSuccess" : "ajaxError", [w, m, f ? l : s]), q.fireWith(n, [w, x]), j && (o.trigger("ajaxComplete", [w, m]), --nb.active || nb.event.trigger("ajaxStop")))
            }
            "object" == typeof b && (c = b, b = void 0), c = c || {};
            var e, f, g, h, i, j, k, l, m = nb.ajaxSetup({}, c),
                n = m.context || m,
                o = m.context && (n.nodeType || n.jquery) ? nb(n) : nb.event,
                p = nb.Deferred(),
                q = nb.Callbacks("once memory"),
                r = m.statusCode || {},
                s = {},
                t = {},
                u = 0,
                v = "canceled",
                w = {
                    readyState: 0,
                    getResponseHeader: function(a) {
                        var b;
                        if (2 === u) {
                            if (!l)
                                for (l = {}; b = Uc.exec(h);) l[b[1].toLowerCase()] = b[2];
                            b = l[a.toLowerCase()]
                        }
                        return null == b ? null : b
                    },
                    getAllResponseHeaders: function() {
                        return 2 === u ? h : null
                    },
                    setRequestHeader: function(a, b) {
                        var c = a.toLowerCase();
                        return u || (a = t[c] = t[c] || a, s[a] = b), this
                    },
                    overrideMimeType: function(a) {
                        return u || (m.mimeType = a), this
                    },
                    statusCode: function(a) {
                        var b;
                        if (a)
                            if (2 > u)
                                for (b in a) r[b] = [r[b], a[b]];
                            else w.always(a[w.status]);
                        return this
                    },
                    abort: function(a) {
                        var b = a || v;
                        return k && k.abort(b), d(0, b), this
                    }
                };
            if (p.promise(w).complete = q.add, w.success = w.done, w.error = w.fail, m.url = ((b || m.url || ad) + "").replace(Sc, "").replace(Xc, bd[1] + "//"), m.type = c.method || c.type || m.method || m.type, m.dataTypes = nb.trim(m.dataType || "*").toLowerCase().match(Db) || [""], null == m.crossDomain && (e = Yc.exec(m.url.toLowerCase()), m.crossDomain = !(!e || e[1] === bd[1] && e[2] === bd[2] && (e[3] || ("http:" === e[1] ? "80" : "443")) === (bd[3] || ("http:" === bd[1] ? "80" : "443")))), m.data && m.processData && "string" != typeof m.data && (m.data = nb.param(m.data, m.traditional)), U(Zc, m, c, w), 2 === u) return w;
            j = nb.event && m.global, j && 0 === nb.active++ && nb.event.trigger("ajaxStart"), m.type = m.type.toUpperCase(), m.hasContent = !Wc.test(m.type), g = m.url, m.hasContent || (m.data && (g = m.url += (Qc.test(g) ? "&" : "?") + m.data, delete m.data), m.cache === !1 && (m.url = Tc.test(g) ? g.replace(Tc, "$1_=" + Pc++) : g + (Qc.test(g) ? "&" : "?") + "_=" + Pc++)), m.ifModified && (nb.lastModified[g] && w.setRequestHeader("If-Modified-Since", nb.lastModified[g]), nb.etag[g] && w.setRequestHeader("If-None-Match", nb.etag[g])), (m.data && m.hasContent && m.contentType !== !1 || c.contentType) && w.setRequestHeader("Content-Type", m.contentType), w.setRequestHeader("Accept", m.dataTypes[0] && m.accepts[m.dataTypes[0]] ? m.accepts[m.dataTypes[0]] + ("*" !== m.dataTypes[0] ? ", " + _c + "; q=0.01" : "") : m.accepts["*"]);
            for (f in m.headers) w.setRequestHeader(f, m.headers[f]);
            if (m.beforeSend && (m.beforeSend.call(n, w, m) === !1 || 2 === u)) return w.abort();
            v = "abort";
            for (f in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) w[f](m[f]);
            if (k = U($c, m, c, w)) {
                if (w.readyState = 1, j && o.trigger("ajaxSend", [w, m]), 2 === u) return w;
                m.async && m.timeout > 0 && (i = a.setTimeout(function() {
                    w.abort("timeout")
                }, m.timeout));
                try {
                    u = 1, k.send(s, d)
                } catch (x) {
                    if (!(2 > u)) throw x;
                    d(-1, x)
                }
            } else d(-1, "No Transport");
            return w
        },
        getJSON: function(a, b, c) {
            return nb.get(a, b, c, "json")
        },
        getScript: function(a, b) {
            return nb.get(a, void 0, b, "script")
        }
    }), nb.each(["get", "post"], function(a, b) {
        nb[b] = function(a, c, d, e) {
            return nb.isFunction(c) && (e = e || d, d = c, c = void 0), nb.ajax(nb.extend({
                url: a,
                type: b,
                dataType: e,
                data: c,
                success: d
            }, nb.isPlainObject(a) && a))
        }
    }), nb._evalUrl = function(a) {
        return nb.ajax({
            url: a,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            "throws": !0
        })
    }, nb.fn.extend({
        wrapAll: function(a) {
            if (nb.isFunction(a)) return this.each(function(b) {
                nb(this).wrapAll(a.call(this, b))
            });
            if (this[0]) {
                var b = nb(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                    for (var a = this; a.firstChild && 1 === a.firstChild.nodeType;) a = a.firstChild;
                    return a
                }).append(this)
            }
            return this
        },
        wrapInner: function(a) {
            return nb.isFunction(a) ? this.each(function(b) {
                nb(this).wrapInner(a.call(this, b))
            }) : this.each(function() {
                var b = nb(this),
                    c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a)
            })
        },
        wrap: function(a) {
            var b = nb.isFunction(a);
            return this.each(function(c) {
                nb(this).wrapAll(b ? a.call(this, c) : a)
            })
        },
        unwrap: function() {
            return this.parent().each(function() {
                nb.nodeName(this, "body") || nb(this).replaceWith(this.childNodes)
            }).end()
        }
    }), nb.expr.filters.hidden = function(a) {
        return lb.reliableHiddenOffsets() ? a.offsetWidth <= 0 && a.offsetHeight <= 0 && !a.getClientRects().length : Z(a)
    }, nb.expr.filters.visible = function(a) {
        return !nb.expr.filters.hidden(a)
    };
    var cd = /%20/g,
        dd = /\[\]$/,
        ed = /\r?\n/g,
        fd = /^(?:submit|button|image|reset|file)$/i,
        gd = /^(?:input|select|textarea|keygen)/i;
    nb.param = function(a, b) {
        var c, d = [],
            e = function(a, b) {
                b = nb.isFunction(b) ? b() : null == b ? "" : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b)
            };
        if (void 0 === b && (b = nb.ajaxSettings && nb.ajaxSettings.traditional), nb.isArray(a) || a.jquery && !nb.isPlainObject(a)) nb.each(a, function() {
            e(this.name, this.value)
        });
        else
            for (c in a) $(c, a[c], b, e);
        return d.join("&").replace(cd, "+")
    }, nb.fn.extend({
        serialize: function() {
            return nb.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var a = nb.prop(this, "elements");
                return a ? nb.makeArray(a) : this
            }).filter(function() {
                var a = this.type;
                return this.name && !nb(this).is(":disabled") && gd.test(this.nodeName) && !fd.test(a) && (this.checked || !Ob.test(a))
            }).map(function(a, b) {
                var c = nb(this).val();
                return null == c ? null : nb.isArray(c) ? nb.map(c, function(a) {
                    return {
                        name: b.name,
                        value: a.replace(ed, "\r\n")
                    }
                }) : {
                    name: b.name,
                    value: c.replace(ed, "\r\n")
                }
            }).get()
        }
    }), nb.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function() {
        return this.isLocal ? ab() : db.documentMode > 8 ? _() : /^(get|post|head|put|delete|options)$/i.test(this.type) && _() || ab()
    } : _;
    var hd = 0,
        id = {},
        jd = nb.ajaxSettings.xhr();
    a.attachEvent && a.attachEvent("onunload", function() {
        for (var a in id) id[a](void 0, !0)
    }), lb.cors = !!jd && "withCredentials" in jd, jd = lb.ajax = !!jd, jd && nb.ajaxTransport(function(b) {
        if (!b.crossDomain || lb.cors) {
            var c;
            return {
                send: function(d, e) {
                    var f, g = b.xhr(),
                        h = ++hd;
                    if (g.open(b.type, b.url, b.async, b.username, b.password), b.xhrFields)
                        for (f in b.xhrFields) g[f] = b.xhrFields[f];
                    b.mimeType && g.overrideMimeType && g.overrideMimeType(b.mimeType), b.crossDomain || d["X-Requested-With"] || (d["X-Requested-With"] = "XMLHttpRequest");
                    for (f in d) void 0 !== d[f] && g.setRequestHeader(f, d[f] + "");
                    g.send(b.hasContent && b.data || null), c = function(a, d) {
                        var f, i, j;
                        if (c && (d || 4 === g.readyState))
                            if (delete id[h], c = void 0, g.onreadystatechange = nb.noop, d) 4 !== g.readyState && g.abort();
                            else {
                                j = {}, f = g.status, "string" == typeof g.responseText && (j.text = g.responseText);
                                try {
                                    i = g.statusText
                                } catch (k) {
                                    i = ""
                                }
                                f || !b.isLocal || b.crossDomain ? 1223 === f && (f = 204) : f = j.text ? 200 : 404
                            }
                        j && e(f, i, j, g.getAllResponseHeaders())
                    }, b.async ? 4 === g.readyState ? a.setTimeout(c) : g.onreadystatechange = id[h] = c : c()
                },
                abort: function() {
                    c && c(void 0, !0)
                }
            }
        }
    }), nb.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(a) {
                return nb.globalEval(a), a
            }
        }
    }), nb.ajaxPrefilter("script", function(a) {
        void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1)
    }), nb.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var b, c = db.head || nb("head")[0] || db.documentElement;
            return {
                send: function(d, e) {
                    b = db.createElement("script"), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function(a, c) {
                        (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, "success"))
                    }, c.insertBefore(b, c.firstChild)
                },
                abort: function() {
                    b && b.onload(void 0, !0)
                }
            }
        }
    });
    var kd = [],
        ld = /(=)\?(?=&|$)|\?\?/;
    nb.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var a = kd.pop() || nb.expando + "_" + Pc++;
            return this[a] = !0, a
        }
    }), nb.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e, f, g, h = b.jsonp !== !1 && (ld.test(b.url) ? "url" : "string" == typeof b.data && 0 === (b.contentType || "").indexOf("application/x-www-form-urlencoded") && ld.test(b.data) && "data");
        return h || "jsonp" === b.dataTypes[0] ? (e = b.jsonpCallback = nb.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(ld, "$1" + e) : b.jsonp !== !1 && (b.url += (Qc.test(b.url) ? "&" : "?") + b.jsonp + "=" + e), b.converters["script json"] = function() {
            return g || nb.error(e + " was not called"), g[0]
        }, b.dataTypes[0] = "json", f = a[e], a[e] = function() {
            g = arguments
        }, d.always(function() {
            void 0 === f ? nb(a).removeProp(e) : a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, kd.push(e)), g && nb.isFunction(f) && f(g[0]), g = f = void 0
        }), "script") : void 0
    }), nb.parseHTML = function(a, b, c) {
        if (!a || "string" != typeof a) return null;
        "boolean" == typeof b && (c = b, b = !1), b = b || db;
        var d = wb.exec(a),
            e = !c && [];
        return d ? [b.createElement(d[1])] : (d = r([a], b, e), e && e.length && nb(e).remove(), nb.merge([], d.childNodes))
    };
    var md = nb.fn.load;
    nb.fn.load = function(a, b, c) {
        if ("string" != typeof a && md) return md.apply(this, arguments);
        var d, e, f, g = this,
            h = a.indexOf(" ");
        return h > -1 && (d = nb.trim(a.slice(h, a.length)), a = a.slice(0, h)), nb.isFunction(b) ? (c = b, b = void 0) : b && "object" == typeof b && (e = "POST"), g.length > 0 && nb.ajax({
            url: a,
            type: e || "GET",
            dataType: "html",
            data: b
        }).done(function(a) {
            f = arguments, g.html(d ? nb("<div>").append(nb.parseHTML(a)).find(d) : a)
        }).always(c && function(a, b) {
            g.each(function() {
                c.apply(this, f || [a.responseText, b, a])
            })
        }), this
    }, nb.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(a, b) {
        nb.fn[b] = function(a) {
            return this.on(b, a)
        }
    }), nb.expr.filters.animated = function(a) {
        return nb.grep(nb.timers, function(b) {
            return a === b.elem
        }).length
    }, nb.offset = {
        setOffset: function(a, b, c) {
            var d, e, f, g, h, i, j, k = nb.css(a, "position"),
                l = nb(a),
                m = {};
            "static" === k && (a.style.position = "relative"), h = l.offset(), f = nb.css(a, "top"), i = nb.css(a, "left"), j = ("absolute" === k || "fixed" === k) && nb.inArray("auto", [f, i]) > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), nb.isFunction(b) && (b = b.call(a, c, nb.extend({}, h))), null != b.top && (m.top = b.top - h.top + g), null != b.left && (m.left = b.left - h.left + e), "using" in b ? b.using.call(a, m) : l.css(m)
        }
    }, nb.fn.extend({
        offset: function(a) {
            if (arguments.length) return void 0 === a ? this : this.each(function(b) {
                nb.offset.setOffset(this, a, b)
            });
            var b, c, d = {
                    top: 0,
                    left: 0
                },
                e = this[0],
                f = e && e.ownerDocument;
            return f ? (b = f.documentElement, nb.contains(b, e) ? ("undefined" != typeof e.getBoundingClientRect && (d = e.getBoundingClientRect()), c = bb(f), {
                top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0),
                left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0)
            }) : d) : void 0
        },
        position: function() {
            if (this[0]) {
                var a, b, c = {
                        top: 0,
                        left: 0
                    },
                    d = this[0];
                return "fixed" === nb.css(d, "position") ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), nb.nodeName(a[0], "html") || (c = a.offset()), c.top += nb.css(a[0], "borderTopWidth", !0), c.left += nb.css(a[0], "borderLeftWidth", !0)), {
                    top: b.top - c.top - nb.css(d, "marginTop", !0),
                    left: b.left - c.left - nb.css(d, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var a = this.offsetParent; a && !nb.nodeName(a, "html") && "static" === nb.css(a, "position");) a = a.offsetParent;
                return a || nc
            })
        }
    }), nb.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(a, b) {
        var c = /Y/.test(b);
        nb.fn[a] = function(d) {
            return Nb(this, function(a, d, e) {
                var f = bb(a);
                return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void(f ? f.scrollTo(c ? nb(f).scrollLeft() : e, c ? e : nb(f).scrollTop()) : a[d] = e)
            }, a, d, arguments.length, null)
        }
    }), nb.each(["top", "left"], function(a, b) {
        nb.cssHooks[b] = F(lb.pixelPosition, function(a, c) {
            return c ? (c = pc(a, b), lc.test(c) ? nb(a).position()[b] + "px" : c) : void 0
        })
    }), nb.each({
        Height: "height",
        Width: "width"
    }, function(a, b) {
        nb.each({
            padding: "inner" + a,
            content: b,
            "": "outer" + a
        }, function(c, d) {
            nb.fn[d] = function(d, e) {
                var f = arguments.length && (c || "boolean" != typeof d),
                    g = c || (d === !0 || e === !0 ? "margin" : "border");
                return Nb(this, function(b, c, d) {
                    var e;
                    return nb.isWindow(b) ? b.document.documentElement["client" + a] : 9 === b.nodeType ? (e = b.documentElement, Math.max(b.body["scroll" + a], e["scroll" + a], b.body["offset" + a], e["offset" + a], e["client" + a])) : void 0 === d ? nb.css(b, c, g) : nb.style(b, c, d, g)
                }, b, f ? d : void 0, f, null)
            }
        })
    }), nb.fn.extend({
        bind: function(a, b, c) {
            return this.on(a, null, b, c)
        },
        unbind: function(a, b) {
            return this.off(a, null, b)
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d)
        },
        undelegate: function(a, b, c) {
            return 1 === arguments.length ? this.off(a, "**") : this.off(b, a || "**", c)
        }
    }), nb.fn.size = function() {
        return this.length
    }, nb.fn.andSelf = nb.fn.addBack, "function" == typeof define && define("jquery", [], function() {
        return nb
    });
    var nd = a.jQuery,
        od = a.$;
    return nb.noConflict = function(b) {
        return a.$ === nb && (a.$ = od), b && a.jQuery === nb && (a.jQuery = nd), nb
    }, b || (a.jQuery = a.$ = nb), nb
}), "function" == typeof define && define("module/pages/common", function() {});
var regexEnum = {
    intege: "^-?[1-9]\\d*$",
    intege1: "^[1-9]\\d*$",
    intege2: "^-[1-9]\\d*$",
    num: "^([+-]?)\\d*\\.?\\d+$",
    num1: "^[1-9]\\d*|0$",
    num2: "^-[1-9]\\d*|0$",
    num3: "^[0-9]\\d*$",
    decmal: "^([+-]?)\\d*\\.\\d+$",
    decmal1: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$",
    decmal2: "^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$",
    decmal3: "^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$",
    decmal4: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$",
    decmal5: "^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$",
    email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$",
    color: "^[a-fA-F0-9]{6}$",
    url: "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$",
    chinese: "^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$",
    ascii: "^[\\x00-\\xFF]+$",
    zipcode: "^\\d{6}$",
    mobile: "^1(3[0-9]|4[0-9]|5[0-9]|7[0|1|3|5|6|7|8]|8[0-9])\\d{8}$",
    ip4: "^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$",
    notempty: "^\\S+$",
    picture: "(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$",
    rar: "(.*)\\.(rar|zip|7zip|tgz)$",
    date: "^\\d{4}(\\-|\\/|.)\\d{1,2}\\1\\d{1,2}$",
    qq: "^[1-9]*[1-9][0-9]*$",
    tel: "^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{3,}))?$",
    username: "^\\w+$",
    letter: "^[A-Za-z]+$",
    letter_u: "^[A-Z]+$",
    letter_l: "^[a-z]+$",
    idcard: "(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x))$",
    passwd: "^[0-9|a-z|A-Z]{6,20}$",
    passwd2: "^[0-9|a-z|A-Z|!\\+=\\<\\>\\/@#\\$%^&\\*~\\(\\)_:;\\?\\.,]{6,20}$",
    ps_username: "^[\\u4E00-\\u9FA5\\uF900-\\uFA2D|a-zA-Z]+$",
    numberAndLettersVal: "^[a-zA-Z0-9]+$",
    price: "^[1-9]\\d*$"
};
window.Trjcn || (window.Trjcn = new Object), window.Trjcn.cache || (window.Trjcn.cache = new Object);
var formValidator = function(a) {
    this.config = $.extend({
        isIcon: !0,
        errIcoCls: "icoErr16",
        succIcoCls: "icoCor16",
        nomalIcoCls: "icoPro16",
        errFontCls: "",
        okHide: !1
    }, a || {}), this.els = null, this.els = null, this.okhide = this.config.okHide
};
formValidator.prototype = {
    cerror: function(a) {
        var b = a.attr("name").replace("[", "").replace("]", "");
        return $("#" + b + "-error").length > 0 ? a = $("#" + b + "-error") : (a = a.nextAll("em"), a && 0 != a.length || (a = a.end().parent().nextAll("em").first())), a
    },
    tip: function(a, b, c) {
        a = this.cerror(a);
        var d = a.attr("data-msg");
        d || (d = a.text(), a.attr("data-msg", d)), a.show(), c ? d = c : b == this.config.succIcoCls && (d = ""), this.config.isIcon && (d = '<i class="' + b + '"></i>' + d), this.config.errFontCls && b == this.config.errIcoCls && a.addClass(this.config.errFontCls), this.config.errFontCls && b != this.config.errIcoCls && a.removeClass(this.config.errFontCls), a.html(d)
    },
    errtip: function(a, b, c) {
        return b = c === !0 ? languages[b] || "" : languages[b] || b, this.tip(a, this.config.errIcoCls, b), !1
    },
    hidetip: function(a) {
        this.cerror(a).hide()
    },
    setels: function(a) {
        this.els = document.getElementById(a).elements
    },
    init: function(a) {
        var b = this;
        if (els = null, document.getElementById(a) && (els = document.getElementById(a).elements), b.els = els, b.els)
            for (var c = 0, d = els.length; d > c; c++) {
                var e = els[c],
                    f = $(e);
                "application/x-shockwave-flash" != e.type && f.attr("data-rule") && "1" != f.attr("bind-event") && ("file" == e.type ? f.change(function() {
                    b.valid($(this))
                }) : f.blur(function() {
                    "S" === $(this).attr("name").substring(0, 1) && $(this).val($(this).val().replace(/#/g, "").replace(/\|/g, ""));
                    var a = b.valid($(this), !0, e.type);
                    if (a && "amount_interval_min" == $(this).attr("name")) {
                        var c = $(this).nextAll("input");
                        c.val() || c.val($(this).val())
                    }
                }).focus(function() {
                    b.tip($(this), "icoPro16")
                }), f.attr("bind-event", "1"))
            }
        b.placeholder()
    },
    placeholder: function() {
        try {
            if (window.T_Config && ("m_publish" == window.T_Config.page || "publish" == window.T_Config.page)) {
                var a = this,
                    b = a.els.cat_id.value;
                switch (b.substring(0, b.length - 32)) {
                    case "1":
                        var c = {
                            i_overview: "项目背景+项目介绍+融资需求+详细用途",
                            title: "例如：北京某餐饮平台项目股权融资100万-300万元"
                        };
                        for (var d in c) window.console.log(d), $(a.els[d]).each(function() {
                            var a = $(this),
                                b = c[d];
                            a.attr("holder", b), a.focus(function() {
                                b == a.val() && a.val("")
                            }).blur(function() {
                                a.val() || a.val(b)
                            }), a.val() || a.val(b)
                        })
                }
            }
        } catch (e) {}
    },
    valid: function(self, is_merge, type) {
        if (self.is(":visible") || self.attr("data-force")) {
            var $this = this,
                merge = "",
                _val = "";
            switch (self.attr("type") || type) {
                case "select-one":
                case "select":
                case "raido":
                case "hidden":
                case "text":
                case "password":
                case "textarea":
                case "file":
                    if (is_merge && (merge = self.attr("data-merge"))) {
                        merge = merge.split(",");
                        for (var i = 0; i < merge.length; i++)
                            if (!$this.valid($($this.els[merge[i]]), !1)) return !1
                    }
                    _val = self.val(), self.attr("tip") && self.attr("tip") == _val && (_val = "");
                    break;
                case "checkbox":
                    _val = $("input[name=" + self.attr("name").replace("[", "\\[").replace("]", "\\]") + "]").map(function() {
                        return 1 == $(this).attr("checked") ? $(this).val() : void 0
                    }).get().join(",");
                    break;
                default:
                    return !0
            }
            _val = $.trim(_val), _val && _val == self.attr("holder") && (_val = "");
            var $rules = self.attr("data-rule");
            if (!$rules) return !0;
            var _rules = $rules.split("|");
            if ("required" == _rules[0] && !_val) return $this.errtip(self), !1;
            if (!_val) return !0;
            for (var _ajaxcheck = !1, i = 0; i < _rules.length; i++) {
                var _rule = _rules[i];
                if ("required" != _rule) {
                    var _pos = _rule.indexOf("["),
                        _type = _rule.substring(0, _pos),
                        _dval = _rule.substring(_pos + 1, _rule.length - 1) || "";
                    switch (_type) {
                        case "regexp":
                            if (_dval && !new RegExp(eval("regexEnum." + _dval), "i").test(_val)) return $this.errtip(self, _dval + "_error", !0);
                            break;
                        case "F":
                            if (_dval && eval("var _fs =" + _dval + '("' + _val + '")'), _dval && !_fs) return $this.errtip(self, _dval + "_error", !0);
                            break;
                        case "matches":
                            if (_dval && $this.els[_dval].value != _val) return $this.errtip(self, _dval + "_matches", !0);
                            break;
                        case "minlength":
                        case "min_length":
                            var _len = parseFloat(_dval);
                            if (_val.length < _len) return $this.errtip(self, "该值长度必须大于 " + _len + " 个字符");
                            break;
                        case "maxlength":
                        case "max_length":
                            var _len = parseFloat(_dval);
                            if (_val.length > _len) return $this.errtip(self, "该值长度必须小于 " + _len + " 个字符");
                            break;
                        case "greater":
                            if ("min_max" == _dval) {
                                var _name = self.attr("name");
                                _name = _name.substr(0, _name.length - 4);
                                var _min = parseFloat($this.els[_name + "_min"].value),
                                    _max = parseFloat($this.els[_name + "_max"].value);
                                try {
                                    switch (_name) {
                                        case "amount_interval":
                                            if (_min *= parseInt($this.els[_name + "_min_unit"].value), _max *= parseInt($this.els[_name + "_max_unit"].value), _min && _max && new String(parseInt(_max)).length - new String(parseInt(_min)).length > 2) return $this.errtip(self, "金额区间超出2个数量级，请重新填写");
                                            $this.els.amount && $this.valid($($this.els.amount), !1)
                                    }
                                } catch (e) {}
                                if (_name && _min > _max) return $this.errtip(self, "起始值必须小于结束值")
                            } else if (parseInt(_dval) != _dval) try {
                                var o = $($this.els[_dval]),
                                    _dval = parseFloat(o.val()) * parseInt($this.els[_dval + "_unit"].value),
                                    _name = self.attr("name"),
                                    _max = parseFloat($this.els[_name].value) * parseInt($this.els[_name + "_unit"].value);
                                if (_name && $this.els[_name].value.length > 0 && _dval > _max && self.attr("iname") && o.attr("iname")) return $this.errtip(self, self.attr("iname") + "不能小于" + o.attr("iname"))
                            } catch (e) {} else {
                                var _dval = parseInt(_dval),
                                    _name = self.attr("name"),
                                    _max = parseFloat($this.els[_name].value);
                                if (_name && $this.els[_name].value.length > 0 && _dval >= _max) return $this.errtip(self, "该值必须大于" + (0 > _dval ? "等于" + (_dval + 1) : _dval))
                            }
                            break;
                        case "valmin":
                            var _min = parseFloat(_dval);
                            if (_val = parseFloat(_val), _min > _val) {
                                var msg = "该值必须大于" + _min,
                                    re = new RegExp("valmin\\[(\\d+)\\]\\|valmax\\[(\\d+)\\]", "i"),
                                    a = re.exec($rules);
                                return null !== a && (msg = "该值的取值范围为" + a[1] + "-" + a[2] + "之间"), $this.errtip(self, msg)
                            }
                            break;
                        case "valmax":
                            var _max = parseFloat(_dval);
                            if (_val = parseFloat(_val), _val > _max) {
                                var msg = "该值必须小于" + _max,
                                    re = new RegExp("valmin\\[(\\d+)\\]\\|valmax\\[(\\d+)\\]", "i"),
                                    a = re.exec($rules);
                                if (null !== a) var msg = "该值的取值范围为" + a[1] + "-" + a[2] + "之间";
                                return $this.errtip(self, msg)
                            }
                            break;
                        case "ajaxcheck":
                            _ajaxcheck = !0;
                            var _other = "",
                                _field = _dval;
                            if (_field.indexOf("-") > -1) {
                                var fields = _field.split("-");
                                _field = fields[0];
                                for (var i = 1; i < fields.length; i++) _other += "&" + fields[i] + "=" + $this.els[fields[i]].value
                            }
                            var param = _field + "=" + _val + _other,
                                success = function(a) {
                                    return Trjcn.cache[param] = a, 200 == a.code ? (1 == $this.okhide ? $this.hidetip(self) : $this.tip(self, $this.config.succIcoCls), !0) : $this.errtip(self, a.data.error)
                                };
                            if (Trjcn.cache[param]) return success(Trjcn.cache[param]);
                            Trjcn.Ajax.post("/api/reg/formcheck", "type=" + _field + "&" + param, success);
                            break;
                        case "investor":
                            if (!$("#investor_id").val() || 0 == $("#investor_id").val()) return $this.errtip(self, "该投资人不存在")
                    }
                    switch (self.attr("name")) {
                        case "xmrz_revenue":
                        case "xmrz_asset":
                            if ($this.els.xmrz_revenue.value > 0 && $this.els.xmrz_revenue.value < 10 && $this.els.xmrz_revenue.value == $this.els.xmrz_asset.value) return $this.errtip(self, "请重新填写营业额和净资产");
                            break;
                        case "last_year_revenue":
                        case "net_asset":
                            if ($this.els.last_year_revenue.value > 0 && $this.els.last_year_revenue.value < 10 && $this.els.last_year_revenue.value == $this.els.net_asset.value) return $this.errtip(self, "请重新填写营业额和净资产")
                    }
                }
            }
            return 0 == _ajaxcheck && (1 == $this.okhide ? $this.hidetip(self) : $this.tip(self, "icoCor16")), !0
        }
    },
    isValid: function(a, b) {
        var c = this;
        a && (c.els = document.getElementById(a).elements);
        var b = b || function() {},
            d = !1;
        if (c.els)
            for (var e = 0, f = c.els.length; f > e; e++) "application/x-shockwave-flash" != c.els[e].type && 0 == c.valid($(c.els[e]), !0, c.els[e].type) && (d = !0);
        return 0 == d && b(), d
    },
    errors: function(a) {
        var b = this;
        for (var c in a) b.els[c] && b.tip($(this.els[c]), b.config.errIcoCls, a[c])
    }
}, Trjcn.Util = {
    isMobile: function(a) {
        return /^1(3[0-9]|4[0-9]|5[0-9]|7[0|1|3|5|6|7|8]|8[0-9])\d{8}$/.test(a)
    },
    isChinese: function(a) {
        return /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/.test(a)
    },
    isEmail: function(a) {
        return /^\w+((-\w+)|(\.\w+))*\@\w+((\.|-)\w+)*\.\w+$/.test(a)
    },
    isEmpty: function(a) {
        switch (typeof a) {
            case "string":
                return 0 == $.trim(a).length ? !0 : !1;
            case "number":
                return 0 == a;
            case "object":
                return null == a;
            case "array":
                return 0 == a.length;
            default:
                return !0
        }
    }
}, Trjcn.Ajax = {
    dataType: "json",
    type: "POST",
    post: function(a, b, c, d) {
        Trjcn.Ajax.type = "POST", Trjcn.Ajax.request(a, b, c, d)
    },
    get: function(a, b, c, d) {
        Trjcn.Ajax.type = "GET", Trjcn.Ajax.request(a, b, c, d)
    },
    jsonp: function(a, b, c, d) {
        $.ajax({
            type: "POST",
            url: a,
            dataType: "jsonp",
            jsonp: "callback",
            data: b,
            success: function(a) {
                "function" == typeof c && c(a)
            },
            error: function(a) {
                "function" == typeof d && d(a)
            }
        })
    },
    request: function(a, b, c, d) {
        $.ajax({
            type: Trjcn.Ajax.type,
            url: a,
            dataType: Trjcn.Ajax.dataType,
            data: b + "&_t=20150723",
            success: function(a) {
                500 != a.code && "function" == typeof c && c(a)
            },
            error: function(a) {
                "function" == typeof d && d(a)
            }
        })
    }
};
var languages = {
    mobile_error: "请输入正确的手机号码",
    chinese_error: "只允许输入中文",
    passwd_error: "请输入6-20位字符组成的密码",
    newpwd_matches: "确认新密码输入不一致",
    email_error: "请输入正确的邮箱地址",
    ps_username_error: "请输入您的真实姓名",
    password_error: "请输入6-20位字符组成的密码",
    password_matches: "确认密码输入不一致",
    mobile_code: "请输入您收到的手机验证码",
    mobile_code_ok: "验证码已发送，若未收到，仍未发现请联系客服",
    mobile_code_ok2: '验证码已发送，若60秒未收到，可点击<a href="javascript:;" onclick="MobileVoice();" class="red" style="text-decoration:underline;">语音播报验证码</a>',
    mobile_btn: "获取验证码",
    codetime: "[s]秒后重新发送",
    codetime2: '验证码已发送，请在<font color="red">{$s}</font>秒后重新获取，若未收到，请在拦截信息中查找或直接<a href="http://chat.53kf.com/webCompany.php?arg=trjcn&style=1" target="_blank"><span style="text-decoration: underline;color:red;">联系客服</span></a>',
    neterror: "网络异常，请重试！",
    isIdCard_error: "身份证号码错误！",
    numberAndLettersVal_error: "请正确输入您的营业执照注册号",
    price_error: "请输入正确的价格"
};
define("component/trjcn", function() {
    return {
        cache: {},
        Util: {
            isChinese: function(a) {
                return /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/.test(a)
            },
            isMobile: function(a) {
                return /^1(3[0-9]|4[0-9]|5[0-9]|7[0|1|3|5|6|7|8]|8[0-9])\d{8}$/.test(a)
            }
        }
    }
}), define("page/v6/openapi", function(require) {
    function a() {
        var a = JSON.stringify(c);
        $.ajax({
            type: "POST",
            url: "/openapi" + h,
            dataType: "json",
            data: "data=" + a,
            success: function(a) {
                for (var b in a)
                    if ("SUCCESS" == a[b].code) {
                        var f = d[a[b].method];
                        "function" == typeof f && f(a[b].data)
                    } else if (e && e[a[b].method]) {
                    var g = e[a[b].method];
                    "function" == typeof g && g(a[b].form_error, a[b].action)
                }
                c = [], d = {}, e = {}
            },
            error: function() {}
        })
    }

    function b(a) {
        c.push(a.get_param()), d[a.method] = a.callback, a.errorback && (e[a.method] = a.errorback)
    }
    require("jquery");
    var c = [],
        d = {},
        e = {},
        f = new RegExp("trackid=([^&]*)", "i"),
        g = f.exec(document.location.search),
        h = "";
    return null !== g && g[1] && (h = "?trackid=" + g[1]), {
        "do": a,
        docall: a,
        add_method: b
    }
}), "function" == typeof define && define("page/common", function() {});
var regexEnum = {
    intege: "^-?[1-9]\\d*$",
    intege1: "^[1-9]\\d*$",
    intege2: "^-[1-9]\\d*$",
    num: "^([+-]?)\\d*\\.?\\d+$",
    num1: "^[1-9]\\d*|0$",
    num2: "^-[1-9]\\d*|0$",
    num3: "^[0-9]\\d*$",
    decmal: "^([+-]?)\\d*\\.\\d+$",
    decmal1: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$",
    decmal2: "^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$",
    decmal3: "^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$",
    decmal4: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$",
    decmal5: "^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$",
    email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$",
    color: "^[a-fA-F0-9]{6}$",
    url: "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$",
    chinese: "^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$",
    ascii: "^[\\x00-\\xFF]+$",
    zipcode: "^\\d{6}$",
    mobile: "^1(3[0-9]|4[0-9]|5[0-9]|7[0|1|3|5|6|7|8]|8[0-9])\\d{8}$",
    ip4: "^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$",
    notempty: "^\\S+$",
    picture: "(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$",
    rar: "(.*)\\.(rar|zip|7zip|tgz)$",
    date: "^\\d{4}(\\-|\\/|.)\\d{1,2}\\1\\d{1,2}$",
    qq: "^[1-9]*[1-9][0-9]*$",
    tel: "^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{3,}))?$",
    username: "^\\w+$",
    letter: "^[A-Za-z]+$",
    letter_u: "^[A-Z]+$",
    letter_l: "^[a-z]+$",
    idcard: "(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x))$",
    passwd: "^[0-9|a-z|A-Z]{6,20}$",
    passwd2: "^[0-9|a-z|A-Z|!\\+=\\<\\>\\/@#\\$%^&\\*~\\(\\)_:;\\?\\.,]{6,20}$",
    ps_username: "^[\\u4E00-\\u9FA5\\uF900-\\uFA2D|a-zA-Z]+$",
    numberAndLettersVal: "^[a-zA-Z0-9]+$",
    price: "^[1-9]\\d*$"
};
window.Trjcn || (window.Trjcn = new Object), window.Trjcn.cache || (window.Trjcn.cache = new Object);
var formValidator = function(a) {
    this.config = $.extend({
        isIcon: !0,
        errIcoCls: "icoErr16",
        succIcoCls: "icoCor16",
        nomalIcoCls: "icoPro16",
        errFontCls: "",
        okHide: !1
    }, a || {}), this.els = null, this.els = null, this.okhide = this.config.okHide
};
formValidator.prototype = {
    cerror: function(a) {
        var b = a.attr("name").replace("[", "").replace("]", "");
        return $("#" + b + "-error").length > 0 ? a = $("#" + b + "-error") : (a = a.nextAll("em"), a && 0 != a.length || (a = a.end().parent().nextAll("em").first())), a
    },
    tip: function(a, b, c) {
        a = this.cerror(a);
        var d = a.attr("data-msg");
        d || (d = a.text(), a.attr("data-msg", d)), a.show(), c ? d = c : b == this.config.succIcoCls && (d = ""), this.config.isIcon && (d = '<i class="' + b + '"></i>' + d), this.config.errFontCls && b == this.config.errIcoCls && a.addClass(this.config.errFontCls), this.config.errFontCls && b != this.config.errIcoCls && a.removeClass(this.config.errFontCls), a.html(d)
    },
    errtip: function(a, b, c) {
        return b = c === !0 ? languages[b] || "" : languages[b] || b, this.tip(a, this.config.errIcoCls, b), !1
    },
    hidetip: function(a) {
        this.cerror(a).hide()
    },
    setels: function(a) {
        this.els = document.getElementById(a).elements
    },
    init: function(a) {
        var b = this;
        if (els = null, document.getElementById(a) && (els = document.getElementById(a).elements), b.els = els, b.els)
            for (var c = 0, d = els.length; d > c; c++) {
                var e = els[c],
                    f = $(e);
                "application/x-shockwave-flash" != e.type && f.attr("data-rule") && "1" != f.attr("bind-event") && ("file" == e.type ? f.change(function() {
                    b.valid($(this))
                }) : f.blur(function() {
                    "S" === $(this).attr("name").substring(0, 1) && $(this).val($(this).val().replace(/#/g, "").replace(/\|/g, ""));
                    var a = b.valid($(this), !0, e.type);
                    if (a && "amount_interval_min" == $(this).attr("name")) {
                        var c = $(this).nextAll("input");
                        c.val() || c.val($(this).val())
                    }
                }).focus(function() {
                    b.tip($(this), "icoPro16")
                }), f.attr("bind-event", "1"))
            }
        b.placeholder()
    },
    placeholder: function() {
        try {
            if (window.T_Config && ("m_publish" == window.T_Config.page || "publish" == window.T_Config.page)) {
                var a = this,
                    b = a.els.cat_id.value;
                switch (b.substring(0, b.length - 32)) {
                    case "1":
                        var c = {
                            i_overview: "项目背景+项目介绍+融资需求+详细用途",
                            title: "例如：北京某餐饮平台项目股权融资100万-300万元"
                        };
                        for (var d in c) window.console.log(d), $(a.els[d]).each(function() {
                            var a = $(this),
                                b = c[d];
                            a.attr("holder", b), a.focus(function() {
                                b == a.val() && a.val("")
                            }).blur(function() {
                                a.val() || a.val(b)
                            }), a.val() || a.val(b)
                        })
                }
            }
        } catch (e) {}
    },
    valid: function(self, is_merge, type) {
        if (self.is(":visible") || self.attr("data-force")) {
            var $this = this,
                merge = "",
                _val = "";
            switch (self.attr("type") || type) {
                case "select-one":
                case "select":
                case "raido":
                case "hidden":
                case "text":
                case "password":
                case "textarea":
                case "file":
                    if (is_merge && (merge = self.attr("data-merge"))) {
                        merge = merge.split(",");
                        for (var i = 0; i < merge.length; i++)
                            if (!$this.valid($($this.els[merge[i]]), !1)) return !1
                    }
                    _val = self.val(), self.attr("tip") && self.attr("tip") == _val && (_val = "");
                    break;
                case "checkbox":
                    _val = $("input[name=" + self.attr("name").replace("[", "\\[").replace("]", "\\]") + "]").map(function() {
                        return 1 == $(this).attr("checked") ? $(this).val() : void 0
                    }).get().join(",");
                    break;
                default:
                    return !0
            }
            _val = $.trim(_val), _val && _val == self.attr("holder") && (_val = "");
            var $rules = self.attr("data-rule");
            if (!$rules) return !0;
            var _rules = $rules.split("|");
            if ("required" == _rules[0] && !_val) return $this.errtip(self), !1;
            if (!_val) return !0;
            for (var _ajaxcheck = !1, i = 0; i < _rules.length; i++) {
                var _rule = _rules[i];
                if ("required" != _rule) {
                    var _pos = _rule.indexOf("["),
                        _type = _rule.substring(0, _pos),
                        _dval = _rule.substring(_pos + 1, _rule.length - 1) || "";
                    switch (_type) {
                        case "regexp":
                            if (_dval && !new RegExp(eval("regexEnum." + _dval), "i").test(_val)) return $this.errtip(self, _dval + "_error", !0);
                            break;
                        case "F":
                            if (_dval && eval("var _fs =" + _dval + '("' + _val + '")'), _dval && !_fs) return $this.errtip(self, _dval + "_error", !0);
                            break;
                        case "matches":
                            if (_dval && $this.els[_dval].value != _val) return $this.errtip(self, _dval + "_matches", !0);
                            break;
                        case "minlength":
                        case "min_length":
                            var _len = parseFloat(_dval);
                            if (_val.length < _len) return $this.errtip(self, "该值长度必须大于 " + _len + " 个字符");
                            break;
                        case "maxlength":
                        case "max_length":
                            var _len = parseFloat(_dval);
                            if (_val.length > _len) return $this.errtip(self, "该值长度必须小于 " + _len + " 个字符");
                            break;
                        case "greater":
                            if ("min_max" == _dval) {
                                var _name = self.attr("name");
                                _name = _name.substr(0, _name.length - 4);
                                var _min = parseFloat($this.els[_name + "_min"].value),
                                    _max = parseFloat($this.els[_name + "_max"].value);
                                try {
                                    switch (_name) {
                                        case "amount_interval":
                                            if (_min *= parseInt($this.els[_name + "_min_unit"].value), _max *= parseInt($this.els[_name + "_max_unit"].value), _min && _max && new String(parseInt(_max)).length - new String(parseInt(_min)).length > 2) return $this.errtip(self, "金额区间超出2个数量级，请重新填写");
                                            $this.els.amount && $this.valid($($this.els.amount), !1)
                                    }
                                } catch (e) {}
                                if (_name && _min > _max) return $this.errtip(self, "起始值必须小于结束值")
                            } else if (parseInt(_dval) != _dval) try {
                                var o = $($this.els[_dval]),
                                    _dval = parseFloat(o.val()) * parseInt($this.els[_dval + "_unit"].value),
                                    _name = self.attr("name"),
                                    _max = parseFloat($this.els[_name].value) * parseInt($this.els[_name + "_unit"].value);
                                if (_name && $this.els[_name].value.length > 0 && _dval > _max && self.attr("iname") && o.attr("iname")) return $this.errtip(self, self.attr("iname") + "不能小于" + o.attr("iname"))
                            } catch (e) {} else {
                                var _dval = parseInt(_dval),
                                    _name = self.attr("name"),
                                    _max = parseFloat($this.els[_name].value);
                                if (_name && $this.els[_name].value.length > 0 && _dval >= _max) return $this.errtip(self, "该值必须大于" + (0 > _dval ? "等于" + (_dval + 1) : _dval))
                            }
                            break;
                        case "valmin":
                            var _min = parseFloat(_dval);
                            if (_val = parseFloat(_val), _min > _val) {
                                var msg = "该值必须大于" + _min,
                                    re = new RegExp("valmin\\[(\\d+)\\]\\|valmax\\[(\\d+)\\]", "i"),
                                    a = re.exec($rules);
                                return null !== a && (msg = "该值的取值范围为" + a[1] + "-" + a[2] + "之间"), $this.errtip(self, msg)
                            }
                            break;
                        case "valmax":
                            var _max = parseFloat(_dval);
                            if (_val = parseFloat(_val), _val > _max) {
                                var msg = "该值必须小于" + _max,
                                    re = new RegExp("valmin\\[(\\d+)\\]\\|valmax\\[(\\d+)\\]", "i"),
                                    a = re.exec($rules);
                                if (null !== a) var msg = "该值的取值范围为" + a[1] + "-" + a[2] + "之间";
                                return $this.errtip(self, msg)
                            }
                            break;
                        case "ajaxcheck":
                            _ajaxcheck = !0;
                            var _other = "",
                                _field = _dval;
                            if (_field.indexOf("-") > -1) {
                                var fields = _field.split("-");
                                _field = fields[0];
                                for (var i = 1; i < fields.length; i++) _other += "&" + fields[i] + "=" + $this.els[fields[i]].value
                            }
                            var param = _field + "=" + _val + _other,
                                success = function(a) {
                                    return Trjcn.cache[param] = a, 200 == a.code ? (1 == $this.okhide ? $this.hidetip(self) : $this.tip(self, $this.config.succIcoCls), !0) : $this.errtip(self, a.data.error)
                                };
                            if (Trjcn.cache[param]) return success(Trjcn.cache[param]);
                            Trjcn.Ajax.post("/api/reg/formcheck", "type=" + _field + "&" + param, success);
                            break;
                        case "investor":
                            if (!$("#investor_id").val() || 0 == $("#investor_id").val()) return $this.errtip(self, "该投资人不存在")
                    }
                    switch (self.attr("name")) {
                        case "xmrz_revenue":
                        case "xmrz_asset":
                            if ($this.els.xmrz_revenue.value > 0 && $this.els.xmrz_revenue.value < 10 && $this.els.xmrz_revenue.value == $this.els.xmrz_asset.value) return $this.errtip(self, "请重新填写营业额和净资产");
                            break;
                        case "last_year_revenue":
                        case "net_asset":
                            if ($this.els.last_year_revenue.value > 0 && $this.els.last_year_revenue.value < 10 && $this.els.last_year_revenue.value == $this.els.net_asset.value) return $this.errtip(self, "请重新填写营业额和净资产")
                    }
                }
            }
            return 0 == _ajaxcheck && (1 == $this.okhide ? $this.hidetip(self) : $this.tip(self, "icoCor16")), !0
        }
    },
    isValid: function(a, b) {
        var c = this;
        a && (c.els = document.getElementById(a).elements);
        var b = b || function() {},
            d = !1;
        if (c.els)
            for (var e = 0, f = c.els.length; f > e; e++) "application/x-shockwave-flash" != c.els[e].type && 0 == c.valid($(c.els[e]), !0, c.els[e].type) && (d = !0);
        return 0 == d && b(), d
    },
    errors: function(a) {
        var b = this;
        for (var c in a) b.els[c] && b.tip($(this.els[c]), b.config.errIcoCls, a[c])
    }
}, Trjcn.Util = {
    isMobile: function(a) {
        return /^1(3[0-9]|4[0-9]|5[0-9]|7[0|1|3|5|6|7|8]|8[0-9])\d{8}$/.test(a)
    },
    isChinese: function(a) {
        return /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/.test(a)
    },
    isEmail: function(a) {
        return /^\w+((-\w+)|(\.\w+))*\@\w+((\.|-)\w+)*\.\w+$/.test(a)
    },
    isEmpty: function(a) {
        switch (typeof a) {
            case "string":
                return 0 == $.trim(a).length ? !0 : !1;
            case "number":
                return 0 == a;
            case "object":
                return null == a;
            case "array":
                return 0 == a.length;
            default:
                return !0
        }
    }
}, Trjcn.Ajax = {
    dataType: "json",
    type: "POST",
    post: function(a, b, c, d) {
        Trjcn.Ajax.type = "POST", Trjcn.Ajax.request(a, b, c, d)
    },
    get: function(a, b, c, d) {
        Trjcn.Ajax.type = "GET", Trjcn.Ajax.request(a, b, c, d)
    },
    jsonp: function(a, b, c, d) {
        $.ajax({
            type: "POST",
            url: a,
            dataType: "jsonp",
            jsonp: "callback",
            data: b,
            success: function(a) {
                "function" == typeof c && c(a)
            },
            error: function(a) {
                "function" == typeof d && d(a)
            }
        })
    },
    request: function(a, b, c, d) {
        $.ajax({
            type: Trjcn.Ajax.type,
            url: a,
            dataType: Trjcn.Ajax.dataType,
            data: b + "&_t=20150723",
            success: function(a) {
                500 != a.code && "function" == typeof c && c(a)
            },
            error: function(a) {
                "function" == typeof d && d(a)
            }
        })
    }
};
var languages = {
    mobile_error: "请输入正确的手机号码",
    chinese_error: "只允许输入中文",
    passwd_error: "请输入6-20位字符组成的密码",
    newpwd_matches: "确认新密码输入不一致",
    email_error: "请输入正确的邮箱地址",
    ps_username_error: "请输入您的真实姓名",
    password_error: "请输入6-20位字符组成的密码",
    password_matches: "确认密码输入不一致",
    mobile_code: "请输入您收到的手机验证码",
    mobile_code_ok: "验证码已发送，若未收到，仍未发现请联系客服",
    mobile_code_ok2: '验证码已发送，若60秒未收到，可点击<a href="javascript:;" onclick="MobileVoice();" class="red" style="text-decoration:underline;">语音播报验证码</a>',
    mobile_btn: "获取验证码",
    codetime: "[s]秒后重新发送",
    codetime2: '验证码已发送，请在<font color="red">{$s}</font>秒后重新获取，若未收到，请在拦截信息中查找或直接<a href="http://chat.53kf.com/webCompany.php?arg=trjcn&style=1" target="_blank"><span style="text-decoration: underline;color:red;">联系客服</span></a>',
    neterror: "网络异常，请重试！",
    isIdCard_error: "身份证号码错误！",
    numberAndLettersVal_error: "请正确输入您的营业执照注册号",
    price_error: "请输入正确的价格"
};
define("jquery.form", function(require) {
    jQuery = require("jquery"),
        function(a) {
            "use strict";
            "function" == typeof define && define.amd ? define(["jquery"], a) : a("undefined" != typeof jQuery ? jQuery : window.Zepto)
        }(function(a) {
            "use strict";

            function b(b) {
                var c = b.data;
                b.isDefaultPrevented() || (b.preventDefault(), a(b.target).ajaxSubmit(c))
            }

            function c(b) {
                var c = b.target,
                    d = a(c);
                if (!d.is("[type=submit],[type=image]")) {
                    var e = d.closest("[type=submit]");
                    if (0 === e.length) return;
                    c = e[0]
                }
                var f = this;
                if (f.clk = c, "image" == c.type)
                    if (void 0 !== b.offsetX) f.clk_x = b.offsetX, f.clk_y = b.offsetY;
                    else if ("function" == typeof a.fn.offset) {
                    var g = d.offset();
                    f.clk_x = b.pageX - g.left, f.clk_y = b.pageY - g.top
                } else f.clk_x = b.pageX - c.offsetLeft, f.clk_y = b.pageY - c.offsetTop;
                setTimeout(function() {
                    f.clk = f.clk_x = f.clk_y = null
                }, 100)
            }

            function d() {
                if (a.fn.ajaxSubmit.debug) {
                    var b = "[jquery.form] " + Array.prototype.join.call(arguments, "");
                    window.console && window.console.log ? window.console.log(b) : window.opera && window.opera.postError && window.opera.postError(b)
                }
            }
            var e = {};
            e.fileapi = void 0 !== a("<input type='file'/>").get(0).files, e.formdata = void 0 !== window.FormData;
            var f = !!a.fn.prop;
            a.fn.attr2 = function() {
                if (!f) return this.attr.apply(this, arguments);
                var a = this.prop.apply(this, arguments);
                return a && a.jquery || "string" == typeof a ? a : this.attr.apply(this, arguments)
            }, a.fn.ajaxSubmit = function(b) {
                function c(c) {
                    var d, e, f = a.param(c, b.traditional).split("&"),
                        g = f.length,
                        h = [];
                    for (d = 0; g > d; d++) f[d] = f[d].replace(/\+/g, " "), e = f[d].split("="), h.push([decodeURIComponent(e[0]), decodeURIComponent(e[1])]);
                    return h
                }

                function g(d) {
                    for (var e = new FormData, f = 0; f < d.length; f++) e.append(d[f].name, d[f].value);
                    if (b.extraData) {
                        var g = c(b.extraData);
                        for (f = 0; f < g.length; f++) g[f] && e.append(g[f][0], g[f][1])
                    }
                    b.data = null;
                    var h = a.extend(!0, {}, a.ajaxSettings, b, {
                        contentType: !1,
                        processData: !1,
                        cache: !1,
                        type: i || "POST"
                    });
                    b.uploadProgress && (h.xhr = function() {
                        var c = a.ajaxSettings.xhr();
                        return c.upload && c.upload.addEventListener("progress", function(a) {
                            var c = 0,
                                d = a.loaded || a.position,
                                e = a.total;
                            a.lengthComputable && (c = Math.ceil(100 * (d / e))), b.uploadProgress(a, d, e, c)
                        }, !1), c
                    }), h.data = null;
                    var j = h.beforeSend;
                    return h.beforeSend = function(a, c) {
                        c.data = b.formData ? b.formData : e, j && j.call(this, a, c)
                    }, a.ajax(h)
                }

                function h(c) {
                    function e(a) {
                        var b = null;
                        try {
                            a.contentWindow && (b = a.contentWindow.document)
                        } catch (c) {
                            d("cannot get iframe.contentWindow document: " + c)
                        }
                        if (b) return b;
                        try {
                            b = a.contentDocument ? a.contentDocument : a.document
                        } catch (c) {
                            d("cannot get iframe.contentDocument: " + c), b = a.document
                        }
                        return b
                    }

                    function g() {
                        function b() {
                            try {
                                var a = e(r).readyState;
                                d("state = " + a), a && "uninitialized" == a.toLowerCase() && setTimeout(b, 50)
                            } catch (c) {
                                d("Server abort: ", c, " (", c.name, ")"), h(A), w && clearTimeout(w), w = void 0
                            }
                        }
                        var c = l.attr2("target"),
                            f = l.attr2("action"),
                            g = "multipart/form-data",
                            j = l.attr("enctype") || l.attr("encoding") || g;
                        x.setAttribute("target", o), (!i || /post/i.test(i)) && x.setAttribute("method", "POST"), f != m.url && x.setAttribute("action", m.url), m.skipEncodingOverride || i && !/post/i.test(i) || l.attr({
                            encoding: "multipart/form-data",
                            enctype: "multipart/form-data"
                        }), m.timeout && (w = setTimeout(function() {
                            v = !0, h(z)
                        }, m.timeout));
                        var k = [];
                        try {
                            if (m.extraData)
                                for (var n in m.extraData) m.extraData.hasOwnProperty(n) && (a.isPlainObject(m.extraData[n]) && m.extraData[n].hasOwnProperty("name") && m.extraData[n].hasOwnProperty("value") ? k.push(a('<input type="hidden" name="' + m.extraData[n].name + '">').val(m.extraData[n].value).appendTo(x)[0]) : k.push(a('<input type="hidden" name="' + n + '">').val(m.extraData[n]).appendTo(x)[0]));
                            m.iframeTarget || q.appendTo("body"), r.attachEvent ? r.attachEvent("onload", h) : r.addEventListener("load", h, !1), setTimeout(b, 15);
                            try {
                                x.submit()
                            } catch (p) {
                                var s = document.createElement("form").submit;
                                s.apply(x)
                            }
                        } finally {
                            x.setAttribute("action", f), x.setAttribute("enctype", j), c ? x.setAttribute("target", c) : l.removeAttr("target"), a(k).remove()
                        }
                    }

                    function h(b) {
                        if (!s.aborted && !F) {
                            if (E = e(r), E || (d("cannot access response document"), b = A), b === z && s) return s.abort("timeout"), y.reject(s, "timeout"), void 0;
                            if (b == A && s) return s.abort("server abort"), y.reject(s, "error", "server abort"), void 0;
                            if (E && E.location.href != m.iframeSrc || v) {
                                r.detachEvent ? r.detachEvent("onload", h) : r.removeEventListener("load", h, !1);
                                var c, f = "success";
                                try {
                                    if (v) throw "timeout";
                                    var g = "xml" == m.dataType || E.XMLDocument || a.isXMLDoc(E);
                                    if (d("isXml=" + g), !g && window.opera && (null === E.body || !E.body.innerHTML) && --G) return d("requeing onLoad callback, DOM not available"), setTimeout(h, 250), void 0;
                                    var i = E.body ? E.body : E.documentElement;
                                    s.responseText = i ? i.innerHTML : null, s.responseXML = E.XMLDocument ? E.XMLDocument : E, g && (m.dataType = "xml"), s.getResponseHeader = function(a) {
                                        var b = {
                                            "content-type": m.dataType
                                        };
                                        return b[a.toLowerCase()]
                                    }, i && (s.status = Number(i.getAttribute("status")) || s.status, s.statusText = i.getAttribute("statusText") || s.statusText);
                                    var j = (m.dataType || "").toLowerCase(),
                                        k = /(json|script|text)/.test(j);
                                    if (k || m.textarea) {
                                        var l = E.getElementsByTagName("textarea")[0];
                                        if (l) s.responseText = l.value, s.status = Number(l.getAttribute("status")) || s.status, s.statusText = l.getAttribute("statusText") || s.statusText;
                                        else if (k) {
                                            var o = E.getElementsByTagName("pre")[0],
                                                p = E.getElementsByTagName("body")[0];
                                            o ? s.responseText = o.textContent ? o.textContent : o.innerText : p && (s.responseText = p.textContent ? p.textContent : p.innerText)
                                        }
                                    } else "xml" == j && !s.responseXML && s.responseText && (s.responseXML = H(s.responseText));
                                    try {
                                        D = J(s, j, m)
                                    } catch (t) {
                                        f = "parsererror", s.error = c = t || f
                                    }
                                } catch (t) {
                                    d("error caught: ", t), f = "error", s.error = c = t || f
                                }
                                s.aborted && (d("upload aborted"), f = null), s.status && (f = s.status >= 200 && s.status < 300 || 304 === s.status ? "success" : "error"), "success" === f ? (m.success && m.success.call(m.context, D, "success", s), y.resolve(s.responseText, "success", s), n && a.event.trigger("ajaxSuccess", [s, m])) : f && (void 0 === c && (c = s.statusText), m.error && m.error.call(m.context, s, f, c), y.reject(s, "error", c), n && a.event.trigger("ajaxError", [s, m, c])), n && a.event.trigger("ajaxComplete", [s, m]), n && !--a.active && a.event.trigger("ajaxStop"), m.complete && m.complete.call(m.context, s, f), F = !0, m.timeout && clearTimeout(w), setTimeout(function() {
                                    m.iframeTarget ? q.attr("src", m.iframeSrc) : q.remove(), s.responseXML = null
                                }, 100)
                            }
                        }
                    }
                    var j, k, m, n, o, q, r, s, t, u, v, w, x = l[0],
                        y = a.Deferred();
                    if (y.abort = function(a) {
                            s.abort(a)
                        }, c)
                        for (k = 0; k < p.length; k++) j = a(p[k]), f ? j.prop("disabled", !1) : j.removeAttr("disabled");
                    if (m = a.extend(!0, {}, a.ajaxSettings, b), m.context = m.context || m, o = "jqFormIO" + (new Date).getTime(), m.iframeTarget ? (q = a(m.iframeTarget), u = q.attr2("name"), u ? o = u : q.attr2("name", o)) : (q = a('<iframe name="' + o + '" src="' + m.iframeSrc + '" />'), q.css({
                            position: "absolute",
                            top: "-1000px",
                            left: "-1000px"
                        })), r = q[0], s = {
                            aborted: 0,
                            responseText: null,
                            responseXML: null,
                            status: 0,
                            statusText: "n/a",
                            getAllResponseHeaders: function() {},
                            getResponseHeader: function() {},
                            setRequestHeader: function() {},
                            abort: function(b) {
                                var c = "timeout" === b ? "timeout" : "aborted";
                                d("aborting upload... " + c), this.aborted = 1;
                                try {
                                    r.contentWindow.document.execCommand && r.contentWindow.document.execCommand("Stop")
                                } catch (e) {}
                                q.attr("src", m.iframeSrc), s.error = c, m.error && m.error.call(m.context, s, c, b), n && a.event.trigger("ajaxError", [s, m, c]), m.complete && m.complete.call(m.context, s, c)
                            }
                        }, n = m.global, n && 0 === a.active++ && a.event.trigger("ajaxStart"), n && a.event.trigger("ajaxSend", [s, m]), m.beforeSend && m.beforeSend.call(m.context, s, m) === !1) return m.global && a.active--, y.reject(), y;
                    if (s.aborted) return y.reject(), y;
                    t = x.clk, t && (u = t.name, u && !t.disabled && (m.extraData = m.extraData || {}, m.extraData[u] = t.value, "image" == t.type && (m.extraData[u + ".x"] = x.clk_x, m.extraData[u + ".y"] = x.clk_y)));
                    var z = 1,
                        A = 2,
                        B = a("meta[name=csrf-token]").attr("content"),
                        C = a("meta[name=csrf-param]").attr("content");
                    C && B && (m.extraData = m.extraData || {}, m.extraData[C] = B), m.forceSync ? g() : setTimeout(g, 10);
                    var D, E, F, G = 50,
                        H = a.parseXML || function(a, b) {
                            return window.ActiveXObject ? (b = new ActiveXObject("Microsoft.XMLDOM"), b.async = "false", b.loadXML(a)) : b = (new DOMParser).parseFromString(a, "text/xml"), b && b.documentElement && "parsererror" != b.documentElement.nodeName ? b : null
                        },
                        I = a.parseJSON || function(a) {
                            return window.eval("(" + a + ")")
                        },
                        J = function(b, c, d) {
                            var e = b.getResponseHeader("content-type") || "",
                                f = "xml" === c || !c && e.indexOf("xml") >= 0,
                                g = f ? b.responseXML : b.responseText;
                            return f && "parsererror" === g.documentElement.nodeName && a.error && a.error("parsererror"), d && d.dataFilter && (g = d.dataFilter(g, c)), "string" == typeof g && ("json" === c || !c && e.indexOf("json") >= 0 ? g = I(g) : ("script" === c || !c && e.indexOf("javascript") >= 0) && a.globalEval(g)), g
                        };
                    return y
                }
                if (!this.length) return d("ajaxSubmit: skipping submit process - no element selected"), this;
                var i, j, k, l = this;
                "function" == typeof b ? b = {
                    success: b
                } : void 0 === b && (b = {}), i = b.type || this.attr2("method"), j = b.url || this.attr2("action"), k = "string" == typeof j ? a.trim(j) : "", k = k || window.location.href || "", k && (k = (k.match(/^([^#]+)/) || [])[1]), b = a.extend(!0, {
                    url: k,
                    success: a.ajaxSettings.success,
                    type: i || a.ajaxSettings.type,
                    iframeSrc: /^https/i.test(window.location.href || "") ? "javascript:false" : "about:blank"
                }, b);
                var m = {};
                if (this.trigger("form-pre-serialize", [this, b, m]), m.veto) return d("ajaxSubmit: submit vetoed via form-pre-serialize trigger"), this;
                if (b.beforeSerialize && b.beforeSerialize(this, b) === !1) return d("ajaxSubmit: submit aborted via beforeSerialize callback"), this;
                var n = b.traditional;
                void 0 === n && (n = a.ajaxSettings.traditional);
                var o, p = [],
                    q = this.formToArray(b.semantic, p);
                if (b.data && (b.extraData = b.data, o = a.param(b.data, n)), b.beforeSubmit && b.beforeSubmit(q, this, b) === !1) return d("ajaxSubmit: submit aborted via beforeSubmit callback"), this;
                if (this.trigger("form-submit-validate", [q, this, b, m]), m.veto) return d("ajaxSubmit: submit vetoed via form-submit-validate trigger"), this;
                var r = a.param(q, n);
                o && (r = r ? r + "&" + o : o), "GET" == b.type.toUpperCase() ? (b.url += (b.url.indexOf("?") >= 0 ? "&" : "?") + r, b.data = null) : b.data = r;
                var s = [];
                if (b.resetForm && s.push(function() {
                        l.resetForm()
                    }), b.clearForm && s.push(function() {
                        l.clearForm(b.includeHidden)
                    }), !b.dataType && b.target) {
                    var t = b.success || function() {};
                    s.push(function(c) {
                        var d = b.replaceTarget ? "replaceWith" : "html";
                        a(b.target)[d](c).each(t, arguments)
                    })
                } else b.success && s.push(b.success);
                if (b.success = function(a, c, d) {
                        for (var e = b.context || this, f = 0, g = s.length; g > f; f++) s[f].apply(e, [a, c, d || l, l])
                    }, b.error) {
                    var u = b.error;
                    b.error = function(a, c, d) {
                        var e = b.context || this;
                        u.apply(e, [a, c, d, l])
                    }
                }
                if (b.complete) {
                    var v = b.complete;
                    b.complete = function(a, c) {
                        var d = b.context || this;
                        v.apply(d, [a, c, l])
                    }
                }
                var w = a("input[type=file]:enabled", this).filter(function() {
                        return "" !== a(this).val()
                    }),
                    x = w.length > 0,
                    y = "multipart/form-data",
                    z = l.attr("enctype") == y || l.attr("encoding") == y,
                    A = e.fileapi && e.formdata;
                d("fileAPI :" + A);
                var B, C = (x || z) && !A;
                b.iframe !== !1 && (b.iframe || C) ? b.closeKeepAlive ? a.get(b.closeKeepAlive, function() {
                    B = h(q)
                }) : B = h(q) : B = (x || z) && A ? g(q) : a.ajax(b), l.removeData("jqxhr").data("jqxhr", B);
                for (var D = 0; D < p.length; D++) p[D] = null;
                return this.trigger("form-submit-notify", [this, b]), this
            }, a.fn.ajaxForm = function(e) {
                if (e = e || {}, e.delegation = e.delegation && a.isFunction(a.fn.on), !e.delegation && 0 === this.length) {
                    var f = {
                        s: this.selector,
                        c: this.context
                    };
                    return !a.isReady && f.s ? (d("DOM not ready, queuing ajaxForm"), a(function() {
                        a(f.s, f.c).ajaxForm(e)
                    }), this) : (d("terminating; zero elements found by selector" + (a.isReady ? "" : " (DOM not ready)")), this)
                }
                return e.delegation ? (a(document).off("submit.form-plugin", this.selector, b).off("click.form-plugin", this.selector, c).on("submit.form-plugin", this.selector, e, b).on("click.form-plugin", this.selector, e, c), this) : this.ajaxFormUnbind().bind("submit.form-plugin", e, b).bind("click.form-plugin", e, c)
            }, a.fn.ajaxFormUnbind = function() {
                return this.unbind("submit.form-plugin click.form-plugin")
            }, a.fn.formToArray = function(b, c) {
                var d = [];
                if (0 === this.length) return d;
                var f, g = this[0],
                    h = this.attr("id"),
                    i = b ? g.getElementsByTagName("*") : g.elements;
                if (i && !/MSIE [678]/.test(navigator.userAgent) && (i = a(i).get()), h) try {
                    f = a(':input[form="' + h + '"]').get(), f.length && (i = (i || []).concat(f))
                } catch (j) {
                    i = document.getElementById(h).elements
                }
                if (!i || !i.length) return d;
                var k, l, m, n, o, p, q;
                for (k = 0, p = i.length; p > k; k++)
                    if (o = i[k], "application/x-shockwave-flash" != o.type && (m = o.name, m && !o.disabled))
                        if (b && g.clk && "image" == o.type) g.clk == o && (d.push({
                            name: m,
                            value: a(o).val(),
                            type: o.type
                        }), d.push({
                            name: m + ".x",
                            value: g.clk_x
                        }, {
                            name: m + ".y",
                            value: g.clk_y
                        }));
                        else if (n = a.fieldValue(o, !0), n && n.constructor == Array)
                    for (c && c.push(o), l = 0, q = n.length; q > l; l++) d.push({
                        name: m,
                        value: n[l]
                    });
                else if (e.fileapi && "file" == o.type) {
                    c && c.push(o);
                    var r = o.files;
                    if (r.length)
                        for (l = 0; l < r.length; l++) d.push({
                            name: m,
                            value: r[l],
                            type: o.type
                        });
                    else d.push({
                        name: m,
                        value: "",
                        type: o.type
                    })
                } else null !== n && "undefined" != typeof n && (c && c.push(o), d.push({
                    name: m,
                    value: n,
                    type: o.type,
                    required: o.required
                }));
                if (!b && g.clk) {
                    var s = a(g.clk),
                        t = s[0];
                    m = t.name, m && !t.disabled && "image" == t.type && (d.push({
                        name: m,
                        value: s.val()
                    }), d.push({
                        name: m + ".x",
                        value: g.clk_x
                    }, {
                        name: m + ".y",
                        value: g.clk_y
                    }))
                }
                return d
            }, a.fn.formSerialize = function(b) {
                return a.param(this.formToArray(b))
            }, a.fn.fieldSerialize = function(b) {
                var c = [];
                return this.each(function() {
                    var d = this.name;
                    if (d) {
                        var e = a.fieldValue(this, b);
                        if (e && e.constructor == Array)
                            for (var f = 0, g = e.length; g > f; f++) c.push({
                                name: d,
                                value: e[f]
                            });
                        else null !== e && "undefined" != typeof e && c.push({
                            name: this.name,
                            value: e
                        })
                    }
                }), a.param(c)
            }, a.fn.fieldValue = function(b) {
                for (var c = [], d = 0, e = this.length; e > d; d++) {
                    var f = this[d],
                        g = a.fieldValue(f, b);
                    null === g || "undefined" == typeof g || g.constructor == Array && !g.length || (g.constructor == Array ? a.merge(c, g) : c.push(g))
                }
                return c
            }, a.fieldValue = function(b, c) {
                var d = b.name,
                    e = b.type,
                    f = b.tagName.toLowerCase();
                if (void 0 === c && (c = !0), c && (!d || b.disabled || "reset" == e || "button" == e || ("checkbox" == e || "radio" == e) && !b.checked || ("submit" == e || "image" == e) && b.form && b.form.clk != b || "select" == f && -1 == b.selectedIndex)) return null;
                if ("select" == f) {
                    var g = b.selectedIndex;
                    if (0 > g) return null;
                    for (var h = [], i = b.options, j = "select-one" == e, k = j ? g + 1 : i.length, l = j ? g : 0; k > l; l++) {
                        var m = i[l];
                        if (m.selected) {
                            var n = m.value;
                            if (n || (n = m.attributes && m.attributes.value && !m.attributes.value.specified ? m.text : m.value), j) return n;
                            h.push(n)
                        }
                    }
                    return h
                }
                return a(b).val()
            }, a.fn.clearForm = function(b) {
                return this.each(function() {
                    a("input,select,textarea", this).clearFields(b)
                })
            }, a.fn.clearFields = a.fn.clearInputs = function(b) {
                var c = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i;
                return this.each(function() {
                    var d = this.type,
                        e = this.tagName.toLowerCase();
                    c.test(d) || "textarea" == e ? this.value = "" : "checkbox" == d || "radio" == d ? this.checked = !1 : "select" == e ? this.selectedIndex = -1 : "file" == d ? /MSIE/.test(navigator.userAgent) ? a(this).replaceWith(a(this).clone(!0)) : a(this).val("") : b && (b === !0 && /hidden/.test(d) || "string" == typeof b && a(this).is(b)) && (this.value = "")
                })
            }, a.fn.resetForm = function() {
                return this.each(function() {
                    ("function" == typeof this.reset || "object" == typeof this.reset && !this.reset.nodeType) && this.reset()
                })
            }, a.fn.enable = function(a) {
                return void 0 === a && (a = !0), this.each(function() {
                    this.disabled = !a
                })
            }, a.fn.selected = function(b) {
                return void 0 === b && (b = !0), this.each(function() {
                    var c = this.type;
                    if ("checkbox" == c || "radio" == c) this.checked = b;
                    else if ("option" == this.tagName.toLowerCase()) {
                        var d = a(this).parent("select");
                        b && d[0] && "select-one" == d[0].type && d.find("option").selected(!1), this.selected = b
                    }
                })
            }, a.fn.ajaxSubmit.debug = !1
        })
}), define("component/jquery.tabs", function(require) {
    var a = require("jquery");
    a.fn.Tabs = function(b) {
        return this.each(function() {
            b = a.extend({
                event: "mouseover",
                timeout: 0,
                auto: 0,
                callback: null,
                switchBtn: !1
            }, b);
            var c, d = a(this),
                e = d.children(".ui-tab-cont").children("div"),
                f = d.children(".ui-tab-head"),
                g = f.find("li"),
                h = function(a) {
                    a.siblings("li").removeClass("ui-tab-head-current").end().addClass("ui-tab-head-current"), e.siblings("div").addClass("fn-hide").end().eq(a.index()).removeClass("fn-hide")
                },
                i = function(a, b) {
                    b ? setTimeout(function() {
                        h(a)
                    }, b) : h(a)
                },
                j = function() {
                    b.auto && (c = setInterval(k, b.auto))
                },
                k = function(a) {
                    var c, h, i = f.find("li.ui-tab-head-current"),
                        j = g.eq(0),
                        k = g.eq(g.length - 1),
                        l = g.length,
                        m = i.index();
                    a ? (m -= 1, c = -1 === m ? k : i.prev("li")) : (m += 1, c = m === l ? j : i.next("li")), h = m === l ? 0 : m, i.removeClass("ui-tab-head-current"), c.addClass("ui-tab-head-current"), e.siblings("div").addClass("fn-hide").end().eq(h).removeClass("fn-hide"), b.callback && b.callback.call(d)
                };
            if (g.bind(b.event, function() {
                    i(a(this), b.timeout), b.callback && b.callback.call(d)
                }), b.auto && (j(), d.hover(function() {
                    clearInterval(c), c = void 0
                }, function() {
                    j()
                })), b.switchBtn) {
                d.append('<a href="#prev" class="tab-prev">previous</a><a href="#next" class="tab-next">next</a>');
                var l = a(".tab-prev", d),
                    m = a(".tab-next", d);
                l.click(function(a) {
                    k(!0), a.preventDefault()
                }), m.click(function(a) {
                    k(), a.preventDefault()
                })
            }
        })
    }
}), define("component/jquery.ustore", function() {
    USTORE = function() {
        var a, b, c, d, e, f, g, h, i = {
                setValue: function(e, g, i) {
                    a ? i && b ? sessionStorage.setItem(e, g) : localStorage.setItem(e, g) : c && (i ? (f.setAttribute(e, g), f.save(h)) : (d.setAttribute(e, g), d.save(ieDb)))
                },
                getValue: function(e, g) {
                    var i = "";
                    return a ? i = g && b ? sessionStorage.getItem(e) : localStorage.getItem(e) : c && (g ? (f.load(h), i = f.getAttribute(e)) : (d.load(ieDb), i = d.getAttribute(e))), i
                },
                deleteValue: function(b, e) {
                    a ? this.setValue(b, null, e) : c && (e ? (f.removeAttribute(b), f.save(h)) : (d.removeAttribute(b), d.save(ieDb)))
                },
                clearDB: function(b) {
                    a ? b ? sessionStorage.clear() : localStorage.clear() : c && j.clearDB(b)
                }
            },
            j = {
                detectIE: function() {
                    if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {
                        var a = new Number(RegExp.$1);
                        if (a >= 5.5 && 8 >= a) return !0
                    }
                    return !1
                },
                init: function() {
                    var a = document.createElement("meta");
                    a.name = "save", a.content = "userdata", document.getElementsByTagName("head").item(0).appendChild(a);
                    var b = (new Date).getTime(),
                        c = document.createElement("div");
                    e = "ie-db-" + b, ieDb = "userStorage", c.setAttribute("id", e), document.body.appendChild(c), d = document.getElementById(e), d.style.behavior = "url('#default#userData')", d.style.display = "none", (null === window.name || void 0 === window.name || "" === window.name) && (window.name = "ie-sesh-db-" + b), g = window.name, h = g, c = document.createElement("div"), c.setAttribute("id", g), d.appendChild(c), f = document.getElementById(g), f.style.behavior = "url('#default#userData')", f.style.display = "none"
                },
                clearDB: function(a) {
                    for (var b, c = ((new Date).getTime(), document.createElement("div"), a ? f : d), e = a ? h : ieDb, g = c.xmlDocument, i = g.firstChild.attributes, j = i.length; 0 <= --j;) b = i[j], c.removeAttribute(b.nodeName);
                    c.save(e)
                }
            };
        return {
            init: function() {
                if ("object" == typeof window.localStorage) {
                    a = !0;
                    try {
                        "object" == typeof window.sessionStorage && (b = !0)
                    } catch (d) {
                        b = !1
                    }
                } else j.detectIE() && (c = !0, j.init())
            },
            setValue: function(a, b) {
                i.setValue(a, b, !1)
            },
            setSessionValue: function(a, b) {
                i.setValue(a, b, !0)
            },
            getValue: function(a) {
                return i.getValue(a, !1)
            },
            getSessionValue: function(a) {
                return i.getValue(a, !0)
            },
            deleteValue: function(a) {
                i.deleteValue(a, !1)
            },
            deleteSessionValue: function(a) {
                i.deleteValue(a, !0)
            },
            clearLocalStorage: function() {
                i.clearDB(!1)
            },
            clearSessionStorage: function() {
                i.clearDB(!0)
            },
            clearDOMStorage: function() {
                i.clearDB(!1), i.clearDB(!0)
            }
        }
    }()
}), ! function() {
    function a(a) {
        return a.replace(t, "").replace(u, ",").replace(v, "").replace(w, "").replace(x, "").split(y)
    }

    function b(a) {
        return "'" + a.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
    }

    function c(c, d) {
        function e(a) {
            return m += a.split(/\n/).length - 1, k && (a = a.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")), a && (a = s[1] + b(a) + s[2] + "\n"), a
        }

        function f(b) {
            var c = m;
            if (j ? b = j(b, d) : g && (b = b.replace(/\n/g, function() {
                    return m++, "$line=" + m + ";"
                })), 0 === b.indexOf("=")) {
                var e = l && !/^=[=#]/.test(b);
                if (b = b.replace(/^=[=#]?|[\s;]*$/g, ""), e) {
                    var f = b.replace(/\s*\([^\)]+\)/, "");
                    n[f] || /^(include|print)$/.test(f) || (b = "$escape(" + b + ")")
                } else b = "$string(" + b + ")";
                b = s[1] + b + s[2]
            }
            return g && (b = "$line=" + c + ";" + b), r(a(b), function(a) {
                if (a && !p[a]) {
                    var b;
                    b = "print" === a ? u : "include" === a ? v : n[a] ? "$utils." + a : o[a] ? "$helpers." + a : "$data." + a, w += a + "=" + b + ",", p[a] = !0
                }
            }), b + "\n"
        }
        var g = d.debug,
            h = d.openTag,
            i = d.closeTag,
            j = d.parser,
            k = d.compress,
            l = d.escape,
            m = 1,
            p = {
                $data: 1,
                $filename: 1,
                $utils: 1,
                $helpers: 1,
                $out: 1,
                $line: 1
            },
            q = "".trim,
            s = q ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"],
            t = q ? "$out+=text;return $out;" : "$out.push(text);",
            u = "function(){var text=''.concat.apply('',arguments);" + t + "}",
            v = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + t + "}",
            w = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (g ? "$line=0," : ""),
            x = s[0],
            y = "return new String(" + s[3] + ");";
        r(c.split(h), function(a) {
            a = a.split(i);
            var b = a[0],
                c = a[1];
            1 === a.length ? x += e(b) : (x += f(b), c && (x += e(c)))
        });
        var z = w + x + y;
        g && (z = "try{" + z + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + b(c) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
        try {
            var A = new Function("$data", "$filename", z);
            return A.prototype = n, A
        } catch (B) {
            throw B.temp = "function anonymous($data,$filename) {" + z + "}", B
        }
    }
    var d = function(a, b) {
        return "string" == typeof b ? q(b, {
            filename: a
        }) : g(a, b)
    };
    d.version = "3.0.0", d.config = function(a, b) {
        e[a] = b
    };
    var e = d.defaults = {
            openTag: "<%",
            closeTag: "%>",
            escape: !0,
            cache: !0,
            compress: !1,
            parser: null
        },
        f = d.cache = {};
    d.render = function(a, b) {
        return q(a, b)
    };
    var g = d.renderFile = function(a, b) {
        var c = d.get(a) || p({
            filename: a,
            name: "Render Error",
            message: "Template not found"
        });
        return b ? c(b) : c
    };
    d.get = function(a) {
        var b;
        if (f[a]) b = f[a];
        else if ("object" == typeof document) {
            var c = document.getElementById(a);
            if (c) {
                var d = (c.value || c.innerHTML).replace(/^\s*|\s*$/g, "");
                b = q(d, {
                    filename: a
                })
            }
        }
        return b
    };
    var h = function(a, b) {
            return "string" != typeof a && (b = typeof a, "number" === b ? a += "" : a = "function" === b ? h(a.call(a)) : ""), a
        },
        i = {
            "<": "&#60;",
            ">": "&#62;",
            '"': "&#34;",
            "'": "&#39;",
            "&": "&#38;"
        },
        j = function(a) {
            return i[a]
        },
        k = function(a) {
            return h(a).replace(/&(?![\w#]+;)|[<>"']/g, j)
        },
        l = Array.isArray || function(a) {
            return "[object Array]" === {}.toString.call(a)
        },
        m = function(a, b) {
            var c, d;
            if (l(a))
                for (c = 0, d = a.length; d > c; c++) b.call(a, a[c], c, a);
            else
                for (c in a) b.call(a, a[c], c)
        },
        n = d.utils = {
            $helpers: {},
            $include: g,
            $string: h,
            $escape: k,
            $each: m
        };
    d.helper = function(a, b) {
        o[a] = b
    };
    var o = d.helpers = n.$helpers;
    d.onerror = function(a) {
        var b = "Template Error\n\n";
        for (var c in a) b += "<" + c + ">\n" + a[c] + "\n\n";
        "object" == typeof console && console.error(b)
    };
    var p = function(a) {
            return d.onerror(a),
                function() {
                    return "{Template Error}"
                }
        },
        q = d.compile = function(a, b) {
            function d(c) {
                try {
                    return new i(c, h) + ""
                } catch (d) {
                    return b.debug ? p(d)() : (b.debug = !0, q(a, b)(c))
                }
            }
            b = b || {};
            for (var g in e) void 0 === b[g] && (b[g] = e[g]);
            var h = b.filename;
            try {
                var i = c(a, b)
            } catch (j) {
                return j.filename = h || "anonymous", j.name = "Syntax Error", p(j)
            }
            return d.prototype = i.prototype, d.toString = function() {
                return i.toString()
            }, h && b.cache && (f[h] = d), d
        },
        r = n.$each,
        s = "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",
        t = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,
        u = /[^\w$]+/g,
        v = new RegExp(["\\b" + s.replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g"),
        w = /^\d[^,]*|,\d[^,]*/g,
        x = /^,+|,+$/g,
        y = /^$|,+/;
    e.openTag = "{%", e.closeTag = "%}";
    var z = function(a, b) {
        var c = b.split(":"),
            d = c.shift(),
            e = c.join(":") || "";
        return e && (e = ", " + e), "$helpers." + d + "(" + a + e + ")"
    };
    e.parser = function(a) {
        a = a.replace(/^\s/, "");
        var b = a.split(" "),
            c = b.shift(),
            e = b.join(" ");
        switch (c) {
            case "if":
                a = "if(" + e + "){";
                break;
            case "else":
                b = "if" === b.shift() ? " if(" + b.join(" ") + ")" : "", a = "}else" + b + "{";
                break;
            case "/if":
                a = "}";
                break;
            case "each":
                var f = b[0] || "$data",
                    g = b[1] || "as",
                    h = b[2] || "$value",
                    i = b[3] || "$index",
                    j = h + "," + i;
                "as" !== g && (f = "[]"), a = "$each(" + f + ",function(" + j + "){";
                break;
            case "/each":
                a = "});";
                break;
            case "echo":
                a = "print(" + e + ");";
                break;
            case "print":
            case "include":
                a = c + "(" + b.join(",") + ");";
                break;
            default:
                if (/^\s*\|\s*[\w\$]/.test(e)) {
                    var k = !0;
                    0 === a.indexOf("#") && (a = a.substr(1), k = !1);
                    for (var l = 0, m = a.split("|"), n = m.length, o = m[l++]; n > l; l++) o = z(o, m[l]);
                    a = (k ? "=" : "=#") + o
                } else a = d.helpers[c] ? "=#" + c + "(" + b.join(",") + ");" : "=" + a
        }
        return a
    }, "function" == typeof define ? define("component/template", function() {
        return d
    }) : "undefined" != typeof exports ? module.exports = d : this.template = d
}(), define("page/v6/lib.login_user", function(require) {
    function a() {
        return h
    }

    function b(a, b) {
        h[a] = b
    }

    function c(a) {
        e.push(a)
    }
    var d = require("component/template"),
        e = [],
        f = function(a) {
            var b = function() {
                $(".login-bg").each(function() {
                    "300px" != $(this).height() && $(this).height("300px")
                })
            };
            if ("login" == a.login_status ? (window.Trjcn.LoginID = a.id, $("#J_G_msg").each(function() {
                    $(this).show().find(".num").html(a.tongji.system)
                }), $("#J_G_login_info").each(function() {
                    $("#J_G_guide_info").hide(), $(this).show().find(".name").html(a.login_name)
                }), a.user_logo && $("img.J_G_user_logo").attr("src", a.user_logo), $(".J_G_user_box").show(), $(".J_G_guide_box").remove(), $("#J_mobile_msg").each(function() {
                    $(this).val(a.user_mobile).attr("disabled", !0), $(this).next("#he").each(function() {
                        $(this).hide()
                    })
                }), $("#float-bottom-toolbar").remove()) : $("#float-bottom-toolbar").each(function() {
                    $(this).removeAttr("lock").find(".show_count").html(a.footer_seo_num)
                }), $("#J_index_login_info").each(function() {
                    var c = d("J_index_login_info_TPL", a);
                    $(this).html(c), seajs.use(["page/common", "jquery.form", "component/jquery.tabs", "component/jquery.ustore"], function() {
                        if ($("#J_index_login_info input.J_placeholder").focus(function() {
                                var a = $(this);
                                a.val() == a.attr("tip") && a.val("").css({
                                    color: "#333"
                                })
                            }).blur(function() {
                                var a = $(this);
                                "" == a.val() && a.val(a.attr("tip")).css({
                                    color: "#999"
                                })
                            }).css({
                                color: "#999"
                            }), $("#login-tab").Tabs({
                                event: "click"
                            }), "undefined" != typeof USTORE) {
                            USTORE.init(), $("#float-bottom-toolbar"), USTORE.getValue("login_username") || $("#login-tab .ui-tab-head li:eq(1)").trigger("click");
                            var c = a.user_type;
                            a.id ? USTORE.setValue("login_utype", c) : c = USTORE.getValue("login_utype"), 2 == c && $("#look-tab .look-tab-head .ui-tab-head-current").next().trigger("click")
                        }
                        var d = new TrjcnLogin;
                        d.init("J_loginfrm"), d.jump = !1;
                        var e = $("#login_password", $("#J_loginfrm"));
                        e.next().focus(function() {
                            $(this).hide(), e.show().focus()
                        }), e.blur(function() {
                            ("" == e.val() || e.val() == e.attr("tip")) && (e.hide(), $(this).next().show())
                        }), window.mobileCode = new TrjcnMobileCode, window.mobileCode.init_page("mobile");
                        var f = $("#J_regfrm"),
                            g = $("#J_mobile_info", f);
                        Trjcn.cache.loading = !1, $("#J_btn_reg", f).click(function() {
                            if (!Trjcn.cache.loading) {
                                var a = $("#J_mobile", f).val(),
                                    c = $("#J_mobile_code", f).val();
                                if (!a || !Trjcn.Util.isMobile(a)) return g.html("请输入正确的手机号码"), b(), void 0;
                                if (!c || "请输入验证码" == c) return g.html("请输入验证码"), b(), void 0;
                                if (!document.getElementById("trj_agreement").checked) return g.html("请同意投融界服务协议"), b(), void 0;
                                var d = f.formSerialize(),
                                    e = function(a) {
                                        if (Trjcn.cache.loading = !1, 200 == a.code) {
                                            var c = $("#forword_url").val() || "",
                                                d = location.host.split("."),
                                                e = "http://www." + d[1] + "." + d[2];
                                            return location.href = e + "/register/success.html?forward=" + encodeURIComponent(c), void 0
                                        }
                                        for (var f in a.data.error_messages) {
                                            g.html(a.data.error_messages[f]);
                                            break
                                        }
                                        b()
                                    };
                                Trjcn.cache.loading = !0, Trjcn.Ajax.post("/api/reg/submit", d, e)
                            }
                        }), $("#T-reg-mobile-code").click(function() {
                            b()
                        });
                        var h = $("#J_regfrmfooter"),
                            i = new Date;
                        if (1 == h.length && "undefined" != typeof USTORE && !USTORE.getValue("login_username") && USTORE.getValue("login_old") != i.getDate()) {
                            $(window).scroll(function() {
                                var a = $("#float-bottom-toolbar");
                                if (1 == a.length) {
                                    var b = 380,
                                        c = $(document).scrollTop();
                                    c >= b ? (a.slideDown(), "#" == $("#J_phone_captcha_img").attr("src") && $("#J_phone_captcha_img").trigger("click")) : b > c && a.slideUp()
                                }
                            }), window.phoneCode = new TrjcnMobileCode, window.phoneCode.init("phone"), window.phoneCode.mobileCaptchaMsg = $("#J_phone_info");
                            var j = $("#J_phone_info", h);
                            Trjcn.cache.loading = !1, $("#J_btn_reg", h).click(function() {
                                if (!Trjcn.cache.loading) {
                                    var a = $("#J_phone", h).val(),
                                        b = $("#J_phone_code", h).val();
                                    if (!a || !Trjcn.Util.isMobile(a)) return j.html("请输入正确的手机号码"), void 0;
                                    if (!b) return j.html("请输入验证码"), void 0;
                                    var c = h.formSerialize(),
                                        d = function(a) {
                                            if (Trjcn.cache.loading = !1, 200 == a.code) {
                                                var b = $("#forword_url").val() || "";
                                                return location.href = "/register/success.html?forward=" + encodeURIComponent(b), void 0
                                            }
                                            for (var c in a.data.error_messages) {
                                                j.html(a.data.error_messages[c]);
                                                break
                                            }
                                        };
                                    Trjcn.cache.loading = !0, Trjcn.Ajax.post("/api/reg/submit", c, d)
                                }
                            }), $("#float-bottom-toolbar .bottom-toolbar-close").click(function() {
                                USTORE.setValue("login_old", i.getDate()), $("#float-bottom-toolbar").remove()
                            })
                        }
                    })
                }), e) {
                for (var c in e) {
                    var f = e[c];
                    f(a)
                }
                e = []
            }
        },
        g = "user.login.info",
        h = {
            method: g
        };
    return {
        get_param: a,
        add_aftercall: c,
        add_param: b,
        method: g,
        callback: f
    }
}), define("component/dialog/popup", function(require) {
    function a() {
        this.destroyed = !1, this.__popup = b("<div />").css({
            display: "none",
            position: "absolute",
            outline: 0
        }).attr("tabindex", "-1").html(this.innerHTML).appendTo("body"), this.__backdrop = this.__mask = b("<div />").css({
            opacity: .7,
            background: "#000"
        }), this.node = this.__popup[0], this.backdrop = this.__backdrop[0], c++
    }
    var b = require("jquery"),
        c = 0,
        d = !("minWidth" in b("html")[0].style),
        e = !d;
    return b.extend(a.prototype, {
        node: null,
        backdrop: null,
        fixed: !1,
        destroyed: !0,
        open: !1,
        returnValue: "",
        autofocus: !0,
        align: "bottom left",
        innerHTML: "",
        className: "ui-popup",
        show: function(c) {
            if (this.destroyed) return this;
            var f = this.__popup,
                g = this.__backdrop;
            if (this.__activeElement = this.__getActive(), this.open = !0, this.follow = c || this.follow, !this.__ready) {
                if (f.addClass(this.className).attr("role", this.modal ? "alertdialog" : "dialog").css("position", this.fixed ? "fixed" : "absolute"), d || b(window).on("resize", b.proxy(this.reset, this)), this.modal) {
                    var h = {
                        position: "fixed",
                        left: 0,
                        top: 0,
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                        userSelect: "none",
                        zIndex: this.zIndex || a.zIndex
                    };
                    f.addClass(this.className + "-modal"), e || b.extend(h, {
                        position: "absolute",
                        width: b(window).width() + "px",
                        height: b(document).height() + "px"
                    }), g.css(h).attr({
                        tabindex: "0"
                    }).on("focus", b.proxy(this.focus, this)), this.__mask = g.clone(!0).attr("style", "").insertAfter(f), g.addClass(this.className + "-backdrop").insertBefore(f), this.__ready = !0
                }
                f.html() || f.html(this.innerHTML)
            }
            return f.addClass(this.className + "-show").show(), g.show(), this.reset().focus(), this.__dispatchEvent("show"), this
        },
        showModal: function() {
            return this.modal = !0, this.show.apply(this, arguments)
        },
        close: function(a) {
            return !this.destroyed && this.open && (void 0 !== a && (this.returnValue = a), this.__popup.hide().removeClass(this.className + "-show"), this.__backdrop.hide(), this.open = !1, this.blur(), this.__dispatchEvent("close")), this
        },
        remove: function() {
            if (this.destroyed) return this;
            this.__dispatchEvent("beforeremove"), a.current === this && (a.current = null), this.__popup.remove(), this.__backdrop.remove(), this.__mask.remove(), d || b(window).off("resize", this.reset), this.__dispatchEvent("remove");
            for (var c in this) delete this[c];
            return this
        },
        reset: function() {
            var a = this.follow;
            return a ? this.__follow(a) : this.__center(), this.__dispatchEvent("reset"), this
        },
        focus: function() {
            var c = this.node,
                d = this.__popup,
                e = a.current,
                f = this.zIndex = a.zIndex++;
            if (e && e !== this && e.blur(!1), !b.contains(c, this.__getActive())) {
                var g = d.find("[autofocus]")[0];
                !this._autofocus && g ? this._autofocus = !0 : g = c, this.__focus(g)
            }
            return d.css("zIndex", f), a.current = this, d.addClass(this.className + "-focus"), this.__dispatchEvent("focus"), this
        },
        blur: function() {
            var a = this.__activeElement,
                b = arguments[0];
            return b !== !1 && this.__focus(a), this._autofocus = !1, this.__popup.removeClass(this.className + "-focus"), this.__dispatchEvent("blur"), this
        },
        addEventListener: function(a, b) {
            return this.__getEventListener(a).push(b), this
        },
        removeEventListener: function(a, b) {
            for (var c = this.__getEventListener(a), d = 0; d < c.length; d++) b === c[d] && c.splice(d--, 1);
            return this
        },
        __getEventListener: function(a) {
            var b = this.__listener;
            return b || (b = this.__listener = {}), b[a] || (b[a] = []), b[a]
        },
        __dispatchEvent: function(a) {
            var b = this.__getEventListener(a);
            this["on" + a] && this["on" + a]();
            for (var c = 0; c < b.length; c++) b[c].call(this)
        },
        __focus: function(a) {
            try {
                this.autofocus && !/^iframe$/i.test(a.nodeName) && a.focus()
            } catch (b) {}
        },
        __getActive: function() {
            try {
                var a = document.activeElement,
                    b = a.contentDocument,
                    c = b && b.activeElement || a;
                return c
            } catch (d) {}
        },
        __center: function() {
            var a = this.__popup,
                c = b(window),
                d = b(document),
                e = this.fixed,
                f = e ? 0 : d.scrollLeft(),
                g = e ? 0 : d.scrollTop(),
                h = c.width(),
                i = c.height(),
                j = a.width(),
                k = a.height(),
                l = (h - j) / 2 + f,
                m = 382 * (i - k) / 1e3 + g,
                n = a[0].style;
            n.left = Math.max(parseInt(l), f) + "px", n.top = Math.max(parseInt(m), g) + "px"
        },
        __follow: function(a) {
            var c = a.parentNode && b(a),
                d = this.__popup;
            if (this.__followSkin && d.removeClass(this.__followSkin), c) {
                var e = c.offset();
                if (e.left * e.top < 0) return this.__center()
            }
            var f = this,
                g = this.fixed,
                h = b(window),
                i = b(document),
                j = h.width(),
                k = h.height(),
                l = i.scrollLeft(),
                m = i.scrollTop(),
                n = d.width(),
                o = d.height(),
                p = c ? c.outerWidth() : 0,
                q = c ? c.outerHeight() : 0,
                r = this.__offset(a),
                s = r.left,
                t = r.top,
                u = g ? s - l : s,
                v = g ? t - m : t,
                w = g ? 0 : l,
                x = g ? 0 : m,
                y = w + j - n,
                z = x + k - o,
                A = {},
                B = this.align.split(" "),
                C = this.className + "-",
                D = {
                    top: "bottom",
                    bottom: "top",
                    left: "right",
                    right: "left"
                },
                E = {
                    top: "top",
                    bottom: "top",
                    left: "left",
                    right: "left"
                },
                F = [{
                    top: v - o,
                    bottom: v + q,
                    left: u - n,
                    right: u + p
                }, {
                    top: v,
                    bottom: v - o + q,
                    left: u,
                    right: u - n + p
                }],
                G = {
                    left: u + p / 2 - n / 2,
                    top: v + q / 2 - o / 2
                },
                H = {
                    left: [w, y],
                    top: [x, z]
                };
            b.each(B, function(a, b) {
                F[a][b] > H[E[b]][1] && (b = B[a] = D[b]), F[a][b] < H[E[b]][0] && (B[a] = D[b])
            }), B[1] || (E[B[1]] = "left" === E[B[0]] ? "top" : "left", F[1][B[1]] = G[E[B[1]]]), C += B.join("-") + " " + this.className + "-follow", f.__followSkin = C, c && d.addClass(C), A[E[B[0]]] = parseInt(F[0][B[0]]), A[E[B[1]]] = parseInt(F[1][B[1]]), d.css(A)
        },
        __offset: function(a) {
            var c = a.parentNode,
                d = c ? b(a).offset() : {
                    left: a.pageX,
                    top: a.pageY
                };
            a = c ? a : a.target;
            var e = a.ownerDocument,
                f = e.defaultView || e.parentWindow;
            if (f == window) return d;
            var g = f.frameElement,
                h = b(e),
                i = h.scrollLeft(),
                j = h.scrollTop(),
                k = b(g).offset(),
                l = k.left,
                m = k.top;
            return {
                left: d.left + l - i,
                top: d.top + m - j
            }
        }
    }), a.zIndex = 2024, a.current = null, a
}), define("component/dialog/dialog-config", function() {
    return {
        backdropBackground: "#000",
        backdropOpacity: .7,
        content: '<span class="ui-dialog-loading">Loading..</span>',
        title: "",
        statusbar: "",
        button: null,
        ok: null,
        cancel: null,
        okValue: "ok",
        cancelValue: "取消",
        cancelDisplay: !0,
        cancelStyle: "",
        okStyle: "",
        width: "",
        height: "",
        padding: "",
        skin: "",
        quickClose: !1,
        cssUri: "./css/ui-dialog.css",
        innerHTML: '<div i="dialog" class="ui-dialog"><div class="ui-dialog-arrow-a"></div><div class="ui-dialog-arrow-b"></div><table class="ui-dialog-grid"><tr><td i="header" class="ui-dialog-header"><button i="close" class="ui-dialog-close">&#215;</button><div i="title" class="ui-dialog-title"></div></td></tr><tr><td i="body" class="ui-dialog-body"><div i="content" class="ui-dialog-content" style="display:block;"></div></td></tr><tr><td i="footer" class="ui-dialog-footer"><div i="statusbar" class="ui-dialog-statusbar"></div><div i="button" class="ui-dialog-button"></div></td></tr></table></div>'
    }
}), define("component/dialog/dialog", function(require) {
    var a = require("jquery"),
        b = require("component/dialog/popup"),
        c = require("component/dialog/dialog-config"),
        d = c.cssUri;
    if (d) {
        var e = require[require.toUrl ? "toUrl" : "resolve"];
        e && (d = e(d), d = '<link rel="stylesheet" href="' + d + '" />', a("base")[0] ? a("base").before(d) : a("head").append(d))
    }
    var f = 0,
        g = new Date - 0,
        h = !("minWidth" in a("html")[0].style),
        i = "createTouch" in document && !("onmousemove" in document) || /(iPhone|iPad|iPod)/i.test(navigator.userAgent),
        j = !h && !i,
        k = function(b, c, d) {
            var e = b = b || {};
            ("string" == typeof b || 1 === b.nodeType) && (b = {
                content: b,
                fixed: !i
            }), b = a.extend(!0, {}, k.defaults, b), b.original = e;
            var h = b.id = b.id || g + f,
                l = k.get(h);
            return l ? l.focus() : (j || (b.fixed = !1), b.quickClose && (b.modal = !0, b.backdropOpacity = 0), a.isArray(b.button) || (b.button = []), void 0 !== d && (b.cancel = d), b.cancel && b.button.push({
                id: "cancel",
                value: b.cancelValue,
                callback: b.cancel,
                style: b.cancelStyle,
                display: b.cancelDisplay
            }), void 0 !== c && (b.ok = c), b.ok && b.button.push({
                id: "ok",
                value: b.okValue,
                callback: b.ok,
                style: b.okStyle
            }), k.list[h] = new k.create(b))
        },
        l = function() {};
    l.prototype = b.prototype;
    var m = k.prototype = new l;
    return k.create = function(c) {
        var d = this;
        a.extend(this, new b), c.original;
        var e = a(this.node).html(c.innerHTML),
            g = a(this.backdrop);
        return this.options = c, this._popup = e, a.each(c, function(a, b) {
            "function" == typeof d[a] ? d[a](b) : d[a] = b
        }), c.zIndex && (b.zIndex = c.zIndex), e.attr({
            "aria-labelledby": this._$("title").attr("id", "title:" + this.id).attr("id"),
            "aria-describedby": this._$("content").attr("id", "content:" + this.id).attr("id")
        }), this._$("close").css("display", this.cancel === !1 ? "none" : "").attr("title", this.cancelValue).on("click", function(a) {
            d._trigger("cancel"), a.preventDefault()
        }), this._$("dialog").addClass(this.skin), this._$("body").css("padding", this.padding), c.quickClose && g.on("onmousedown" in document ? "mousedown" : "click", function() {
            return d._trigger("cancel"), !1
        }), this.addEventListener("show", function() {
            g.css({
                opacity: 0,
                background: c.backdropBackground
            }).animate({
                opacity: c.backdropOpacity
            }, 150)
        }), this._esc = function(a) {
            var c = a.target,
                e = c.nodeName,
                f = /^input|textarea$/i,
                g = b.current === d,
                h = a.keyCode;
            !g || f.test(e) && "button" !== c.type || 27 === h && d._trigger("cancel")
        }, a(document).on("keydown", this._esc), this.addEventListener("remove", function() {
            a(document).off("keydown", this._esc), delete k.list[this.id]
        }), f++, k.oncreate(this), this
    }, k.create.prototype = m, a.extend(m, {
        content: function(b) {
            var c = this._$("content");
            return "object" == typeof b ? (b instanceof jQuery || (b = a(b)), c.empty("").append(b.show()), this.addEventListener("beforeremove", function() {
                a("body").append(b.hide())
            })) : c.html(b), this.reset()
        },
        time: function(a, b) {
            var c = this,
                d = c._timer;
            if (d && clearTimeout(d), a) {
                var e = "";
                if (b) {
                    e = c._$("content").html(), c._i = a / 1e3;
                    var f = function() {
                        c.content(e + "<span>(" + c._i + "秒后关闭)</span>"), !c._i && c.close(), c._i--
                    };
                    c._timer = setInterval(f, 1e3), f()
                } else c._timer = setTimeout(function() {
                    c.close().remove()
                }, a)
            }
            return c
        },
        title: function(a) {
            return this._$("title").text(a), this._$("header")[a ? "show" : "hide"](), this
        },
        width: function(a) {
            return this._$("content").css("width", a), this.reset()
        },
        height: function(a) {
            return this._$("content").css("height", a), this.reset()
        },
        button: function(b) {
            b = b || [];
            var c = this,
                d = "",
                e = 0;
            return this.callbacks = {}, "string" == typeof b ? (d = b, e++) : a.each(b, function(b, f) {
                var g = f.id = f.id || f.value,
                    h = "";
                c.callbacks[g] = f.callback, f.display === !1 ? h = ' style="display:none"' : (e++, f.style ? h = 'style="' + f.style + '"' : "cancel" == g && (h = 'style="background-color:#ededed;border-color:#ededed;color:#999"')), d += '<button type="button" i-id="' + g + '"' + h + (f.disabled ? " disabled" : "") + (f.autofocus ? ' autofocus class="ui-dialog-autofocus"' : "") + ">" + f.value + "</button>", c._$("button").on("click", "[i-id=" + g + "]", function(b) {
                    var d = a(this);
                    d.attr("disabled") || c._trigger(g), b.preventDefault()
                })
            }), this._$("button").html(d), this._$("footer")[e ? "show" : "hide"](), this
        },
        statusbar: function(a) {
            return this._$("statusbar").html(a)[a ? "show" : "hide"](), this
        },
        _$: function(a) {
            return this._popup.find("[i=" + a + "]")
        },
        _trigger: function(a) {
            var b = this.callbacks[a];
            return "function" != typeof b || b.call(this) !== !1 ? this.close().remove() : this
        }
    }), k.oncreate = a.noop, k.getCurrent = function() {
        return b.current
    }, k.get = function(a) {
        return void 0 === a ? k.list : k.list[a]
    }, k.list = {}, k.defaults = c, k
}), define("module/common/dialog", function(require, a, b) {
    require("jquery");
    var c = require("component/dialog/dialog");
    b.exports = {
        loading: !1,
        dl: null,
        close: function() {
            try {
                b.exports.dl && b.exports.dl.close().remove()
            } catch (a) {}
        },
        dialog_ok: function(a, b) {
            window.dlo = c({
                title: b || "温馨提示",
                lock: !0,
                fixed: !0,
                width: "480px",
                content: ' <div class="popup-msg-a fn-tac"><p class="part-popup-ittext">' + a + '</p><footer class="fn-mt-30"><a href="javascript:;" id="J_dialog_close" class="ui-btn ui-btn-red">确定</a></footer></div>',
                okValue: "确定",
                cancelValue: "取消"
            }).showModal(), $("#J_dialog_close").click(function() {
                try {
                    window.dlo.close().remove()
                } catch (a) {}
            })
        },
        dialog: function(a, d) {
            "object" != typeof a && (a = {
                content: a
            });
            var e = c($.extend({
                title: d || "温馨提示",
                lock: !0,
                fixed: !0,
                width: "480px",
                okValue: "确定",
                cancelValue: "取消",
                close: function() {
                    e = null
                }
            }, a)).showModal();
            return b.exports.loading = !1, b.exports.dl = e, a.ajax ? ($.ajax({
                url: a.ajax.url || "",
                type: a.ajax.type || "POST",
                cache: !1,
                data: a.ajax.data || "_=",
                dataType: a.ajax.dataType || "json",
                success: function(b) {
                    a.ajax.callback && a.ajax.callback(b, e)
                },
                error: a.ajax.error || function(a, b) {
                    b.close()
                }
            }), e) : e
        },
        delDialog: function(a, b) {
            return c({
                id: "trj_cn_common_delte_dialog",
                title: "删除确认",
                content: "是否确定要删除?删除后，将无法恢复！",
                onclose: function() {
                    if (this._isDialogCanceled) return !0;
                    if (b) {
                        if (b && b.removed) {
                            for (var a = 0; a < b.removed.length; a++) $(b.removed[a]).fadeOut("slow");
                            window.location.reload()
                        }
                    } else window.location.reload();
                    return !0
                },
                cancelValue: "取消",
                cancel: function() {
                    this._isDialogCanceled = !0
                },
                okValue: "删除",
                ok: function() {
                    var b = this;
                    return $.ajax({
                        type: "post",
                        url: a.url,
                        data: a.data,
                        cache: !1,
                        dataType: "json",
                        success: function(a) {
                            if (a.code < 1 || 200 == a.code) return b.close(), void 0;
                            var c = a.message + "(错误码:" + a.code + ")";
                            b.content(""), b.button(""), b.content(c), b.ok = function() {}, b.okValue = "确定"
                        }
                    }), !1
                }
            })
        },
        confirmDialog: function(a, b, d, e) {
            window.dlo = c({
                title: b || "温馨提示",
                lock: !0,
                fixed: !0,
                width: "480px",
                content: ' <div class="popup-msg-a fn-tac"><p class="part-popup-ittext">' + a + '</p><footer class="fn-mt-30"><a href="javascript:;" id="J_dialog_btn_action"  class="ui-btn ui-btn-red">' + d + '</a>&nbsp;&nbsp;<a href="javascript:;" id="J_dialog_close"  class="ui-btn ui-btn-red">取消</a></footer></div>',
                okValue: "确定",
                cancelValue: "取消",
                close: function() {
                    dl = null
                }
            }).showModal(), $("#J_dialog_close").click(function() {
                window.dlo.remove()
            }), "function" == typeof e && $("#J_dialog_btn_action").click(function() {
                e()
            })
        },
        dialog_have_callback: function(a, b, d, e) {
            window.dlo = c({
                title: b || "温馨提示",
                lock: !0,
                fixed: !0,
                width: "480px",
                content: ' <div class="popup-msg-a fn-tac"><p class="part-popup-ittext">' + a + '</p><footer class="fn-mt-30"><a href="javascript:;" id="J_dialog_btn_action"  class="ui-btn ui-btn-red">' + d + "</a></footer></div>",
                okValue: "确定",
                cancelValue: "取消",
                close: function() {
                    dl = null
                }
            }).showModal(), $("#J_dialog_close").click(function() {
                window.dlo.remove()
            }), "function" == typeof e && $("#J_dialog_btn_action").click(function() {
                e()
            })
        },
        initDialog: function(a, b) {
            "object" != typeof a && (a = {
                content: a
            });
            var d = c($.extend({
                title: b || "温馨提示",
                lock: !0,
                fixed: !0,
                width: "480px",
                okValue: "确定",
                cancelValue: "取消",
                close: function() {
                    d = null
                }
            }, a));
            return d
        }
    }
}), define("component/jquery.validate.min", function(require) {
    jQuery = require("jquery"), ! function(a) {
        "function" == typeof define && define.amd ? define(["jquery"], a) : a(jQuery)
    }(function(a) {
        a.extend(a.fn, {
            validate: function(b) {
                if (!this.length) return void(b && b.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing."));
                var c = a.data(this[0], "validator");
                return c ? c : (this.attr("novalidate", "novalidate"), c = new a.validator(b, this[0]), a.data(this[0], "validator", c), c.settings.onsubmit && (this.validateDelegate(":submit", "click", function(b) {
                    c.settings.submitHandler && (c.submitButton = b.target), a(b.target).hasClass("cancel") && (c.cancelSubmit = !0), void 0 !== a(b.target).attr("formnovalidate") && (c.cancelSubmit = !0)
                }), this.submit(function(b) {
                    function d() {
                        var d, e;
                        return c.settings.submitHandler ? (c.submitButton && (d = a("<input type='hidden'/>").attr("name", c.submitButton.name).val(a(c.submitButton).val()).appendTo(c.currentForm)), e = c.settings.submitHandler.call(c, c.currentForm, b), c.submitButton && d.remove(), void 0 !== e ? e : !1) : !0
                    }
                    return c.settings.debug && b.preventDefault(), c.cancelSubmit ? (c.cancelSubmit = !1, d()) : c.form() ? c.pendingRequest ? (c.formSubmitted = !0, !1) : d() : (c.focusInvalid(), !1)
                })), c)
            },
            valid: function() {
                var b, c;
                return a(this[0]).is("form") ? b = this.validate().form() : (b = !0, c = a(this[0].form).validate(), this.each(function() {
                    b = c.element(this) && b
                })), b
            },
            removeAttrs: function(b) {
                var c = {},
                    d = this;
                return a.each(b.split(/\s/), function(a, b) {
                    c[b] = d.attr(b), d.removeAttr(b)
                }), c
            },
            rules: function(b, c) {
                var d, e, f, g, h, i, j = this[0];
                if (b) switch (d = a.data(j.form, "validator").settings, e = d.rules, f = a.validator.staticRules(j), b) {
                    case "add":
                        a.extend(f, a.validator.normalizeRule(c)), delete f.messages, e[j.name] = f, c.messages && (d.messages[j.name] = a.extend(d.messages[j.name], c.messages));
                        break;
                    case "remove":
                        return c ? (i = {}, a.each(c.split(/\s/), function(b, c) {
                            i[c] = f[c], delete f[c], "required" === c && a(j).removeAttr("aria-required")
                        }), i) : (delete e[j.name], f)
                }
                return g = a.validator.normalizeRules(a.extend({}, a.validator.classRules(j), a.validator.attributeRules(j), a.validator.dataRules(j), a.validator.staticRules(j)), j), g.required && (h = g.required, delete g.required, g = a.extend({
                    required: h
                }, g), a(j).attr("aria-required", "true")), g.remote && (h = g.remote, delete g.remote, g = a.extend(g, {
                    remote: h
                })), g
            }
        }), a.extend(a.expr[":"], {
            blank: function(b) {
                return !a.trim("" + a(b).val())
            },
            filled: function(b) {
                return !!a.trim("" + a(b).val())
            },
            unchecked: function(b) {
                return !a(b).prop("checked")
            }
        }), a.validator = function(b, c) {
            this.settings = a.extend(!0, {}, a.validator.defaults, b), this.currentForm = c, this.init()
        }, a.validator.format = function(b, c) {
            return 1 === arguments.length ? function() {
                var c = a.makeArray(arguments);
                return c.unshift(b), a.validator.format.apply(this, c)
            } : (arguments.length > 2 && c.constructor !== Array && (c = a.makeArray(arguments).slice(1)), c.constructor !== Array && (c = [c]), a.each(c, function(a, c) {
                b = b.replace(new RegExp("\\{" + a + "\\}", "g"), function() {
                    return c
                })
            }), b)
        }, a.extend(a.validator, {
            defaults: {
                messages: {},
                groups: {},
                rules: {},
                errorClass: "error",
                validClass: "valid",
                errorElement: "label",
                focusCleanup: !1,
                focusInvalid: !0,
                errorContainer: a([]),
                errorLabelContainer: a([]),
                onsubmit: !0,
                ignore: ":hidden",
                ignoreTitle: !1,
                onfocusin: function(a) {
                    this.lastActive = a, this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, a, this.settings.errorClass, this.settings.validClass), this.hideThese(this.errorsFor(a)))
                },
                onfocusout: function(a) {
                    this.checkable(a) || !(a.name in this.submitted) && this.optional(a) || this.element(a)
                },
                onkeyup: function(a, b) {
                    (9 !== b.which || "" !== this.elementValue(a)) && (a.name in this.submitted || a === this.lastElement) && this.element(a)
                },
                onclick: function(a) {
                    a.name in this.submitted ? this.element(a) : a.parentNode.name in this.submitted && this.element(a.parentNode)
                },
                highlight: function(b, c, d) {
                    "radio" === b.type ? this.findByName(b.name).addClass(c).removeClass(d) : a(b).addClass(c).removeClass(d)
                },
                unhighlight: function(b, c, d) {
                    "radio" === b.type ? this.findByName(b.name).removeClass(c).addClass(d) : a(b).removeClass(c).addClass(d)
                }
            },
            setDefaults: function(b) {
                a.extend(a.validator.defaults, b)
            },
            messages: {
                required: "This field is required.",
                remote: "Please fix this field.",
                email: "Please enter a valid email address.",
                url: "Please enter a valid URL.",
                date: "Please enter a valid date.",
                dateISO: "Please enter a valid date ( ISO ).",
                number: "Please enter a valid number.",
                digits: "Please enter only digits.",
                creditcard: "Please enter a valid credit card number.",
                equalTo: "Please enter the same value again.",
                maxlength: a.validator.format("Please enter no more than {0} characters."),
                minlength: a.validator.format("Please enter at least {0} characters."),
                rangelength: a.validator.format("Please enter a value between {0} and {1} characters long."),
                range: a.validator.format("Please enter a value between {0} and {1}."),
                max: a.validator.format("Please enter a value less than or equal to {0}."),
                min: a.validator.format("Please enter a value greater than or equal to {0}.")
            },
            autoCreateRanges: !1,
            prototype: {
                init: function() {
                    function b(b) {
                        var c = a.data(this[0].form, "validator"),
                            d = "on" + b.type.replace(/^validate/, ""),
                            e = c.settings;
                        e[d] && !this.is(e.ignore) && e[d].call(c, this[0], b)
                    }
                    this.labelContainer = a(this.settings.errorLabelContainer), this.errorContext = this.labelContainer.length && this.labelContainer || a(this.currentForm), this.containers = a(this.settings.errorContainer).add(this.settings.errorLabelContainer), this.submitted = {}, this.valueCache = {}, this.pendingRequest = 0, this.pending = {}, this.invalid = {}, this.reset();
                    var c, d = this.groups = {};
                    a.each(this.settings.groups, function(b, c) {
                        "string" == typeof c && (c = c.split(/\s/)), a.each(c, function(a, c) {
                            d[c] = b
                        })
                    }), c = this.settings.rules, a.each(c, function(b, d) {
                        c[b] = a.validator.normalizeRule(d)
                    }), a(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']", "focusin focusout keyup", b).validateDelegate("select, option, [type='radio'], [type='checkbox']", "click", b), this.settings.invalidHandler && a(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler), a(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
                },
                form: function() {
                    return this.checkForm(), a.extend(this.submitted, this.errorMap), this.invalid = a.extend({}, this.errorMap), this.valid() || a(this.currentForm).triggerHandler("invalid-form", [this]), this.showErrors(), this.valid()
                },
                checkForm: function() {
                    this.prepareForm();
                    for (var a = 0, b = this.currentElements = this.elements(); b[a]; a++) this.check(b[a]);
                    return this.valid()
                },
                element: function(b) {
                    var c = this.clean(b),
                        d = this.validationTargetFor(c),
                        e = !0;
                    return this.lastElement = d, void 0 === d ? delete this.invalid[c.name] : (this.prepareElement(d), this.currentElements = a(d), e = this.check(d) !== !1, e ? delete this.invalid[d.name] : this.invalid[d.name] = !0), a(b).attr("aria-invalid", !e), this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)), this.showErrors(), e
                },
                showErrors: function(b) {
                    if (b) {
                        a.extend(this.errorMap, b), this.errorList = [];
                        for (var c in b) this.errorList.push({
                            message: b[c],
                            element: this.findByName(c)[0]
                        });
                        this.successList = a.grep(this.successList, function(a) {
                            return !(a.name in b)
                        })
                    }
                    this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
                },
                resetForm: function() {
                    a.fn.resetForm && a(this.currentForm).resetForm(), this.submitted = {}, this.lastElement = null, this.prepareForm(), this.hideErrors(), this.elements().removeClass(this.settings.errorClass).removeData("previousValue").removeAttr("aria-invalid")
                },
                numberOfInvalids: function() {
                    return this.objectLength(this.invalid)
                },
                objectLength: function(a) {
                    var b, c = 0;
                    for (b in a) c++;
                    return c
                },
                hideErrors: function() {
                    this.hideThese(this.toHide)
                },
                hideThese: function(a) {
                    a.not(this.containers).text(""), this.addWrapper(a).hide()
                },
                valid: function() {
                    return 0 === this.size()
                },
                size: function() {
                    return this.errorList.length
                },
                focusInvalid: function() {
                    if (this.settings.focusInvalid) try {
                        a(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                    } catch (b) {}
                },
                findLastActive: function() {
                    var b = this.lastActive;
                    return b && 1 === a.grep(this.errorList, function(a) {
                        return a.element.name === b.name
                    }).length && b
                },
                elements: function() {
                    var b = this,
                        c = {};
                    return a(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled], [readonly]").not(this.settings.ignore).filter(function() {
                        return !this.name && b.settings.debug && window.console && console.error("%o has no name assigned", this), this.name in c || !b.objectLength(a(this).rules()) ? !1 : (c[this.name] = !0, !0)
                    })
                },
                clean: function(b) {
                    return a(b)[0]
                },
                errors: function() {
                    var b = this.settings.errorClass.split(" ").join(".");
                    return a(this.settings.errorElement + "." + b, this.errorContext)
                },
                reset: function() {
                    this.successList = [], this.errorList = [], this.errorMap = {}, this.toShow = a([]), this.toHide = a([]), this.currentElements = a([])
                },
                prepareForm: function() {
                    this.reset(), this.toHide = this.errors().add(this.containers)
                },
                prepareElement: function(a) {
                    this.reset(), this.toHide = this.errorsFor(a)
                },
                elementValue: function(b) {
                    var c, d = a(b),
                        e = b.type;
                    return "radio" === e || "checkbox" === e ? a("input[name='" + b.name + "']:checked").val() : "number" === e && "undefined" != typeof b.validity ? b.validity.badInput ? !1 : d.val() : (c = d.val(), "string" == typeof c ? c.replace(/\r/g, "") : c)
                },
                check: function(b) {
                    b = this.validationTargetFor(this.clean(b));
                    var c, d, e, f = a(b).rules(),
                        g = a.map(f, function(a, b) {
                            return b
                        }).length,
                        h = !1,
                        i = this.elementValue(b);
                    for (d in f) {
                        e = {
                            method: d,
                            parameters: f[d]
                        };
                        try {
                            if (c = a.validator.methods[d].call(this, i, b, e.parameters), "dependency-mismatch" === c && 1 === g) {
                                h = !0;
                                continue
                            }
                            if (h = !1, "pending" === c) return void(this.toHide = this.toHide.not(this.errorsFor(b)));
                            if (!c) return this.formatAndAdd(b, e), !1
                        } catch (j) {
                            throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + b.id + ", check the '" + e.method + "' method.", j), j
                        }
                    }
                    return h ? void 0 : (this.objectLength(f) && this.successList.push(b), !0)
                },
                customDataMessage: function(b, c) {
                    return a(b).data("msg" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()) || a(b).data("msg")
                },
                customMessage: function(a, b) {
                    var c = this.settings.messages[a];
                    return c && (c.constructor === String ? c : c[b])
                },
                findDefined: function() {
                    for (var a = 0; a < arguments.length; a++)
                        if (void 0 !== arguments[a]) return arguments[a];
                    return void 0
                },
                defaultMessage: function(b, c) {
                    return this.findDefined(this.customMessage(b.name, c), this.customDataMessage(b, c), !this.settings.ignoreTitle && b.title || void 0, a.validator.messages[c], "<strong>Warning: No message defined for " + b.name + "</strong>")
                },
                formatAndAdd: function(b, c) {
                    var d = this.defaultMessage(b, c.method),
                        e = /\$?\{(\d+)\}/g;
                    "function" == typeof d ? d = d.call(this, c.parameters, b) : e.test(d) && (d = a.validator.format(d.replace(e, "{$1}"), c.parameters)), this.errorList.push({
                        message: d,
                        element: b,
                        method: c.method
                    }), this.errorMap[b.name] = d, this.submitted[b.name] = d
                },
                addWrapper: function(a) {
                    return this.settings.wrapper && (a = a.add(a.parent(this.settings.wrapper))), a
                },
                defaultShowErrors: function() {
                    var a, b, c;
                    for (a = 0; this.errorList[a]; a++) c = this.errorList[a], this.settings.highlight && this.settings.highlight.call(this, c.element, this.settings.errorClass, this.settings.validClass), this.showLabel(c.element, c.message);
                    if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)), this.settings.success)
                        for (a = 0; this.successList[a]; a++) this.showLabel(this.successList[a]);
                    if (this.settings.unhighlight)
                        for (a = 0, b = this.validElements(); b[a]; a++) this.settings.unhighlight.call(this, b[a], this.settings.errorClass, this.settings.validClass);
                    this.toHide = this.toHide.not(this.toShow), this.hideErrors(), this.addWrapper(this.toShow).show()
                },
                validElements: function() {
                    return this.currentElements.not(this.invalidElements())
                },
                invalidElements: function() {
                    return a(this.errorList).map(function() {
                        return this.element
                    })
                },
                showLabel: function(b, c) {
                    var d, e, f, g = this.errorsFor(b),
                        h = this.idOrName(b),
                        i = a(b).attr("aria-describedby");
                    g.length ? (g.removeClass(this.settings.validClass).addClass(this.settings.errorClass), g.html(c)) : (g = a("<" + this.settings.errorElement + ">").attr("id", h + "-error").addClass(this.settings.errorClass).html(c || ""), d = g, this.settings.wrapper && (d = g.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()), this.labelContainer.length ? this.labelContainer.append(d) : this.settings.errorPlacement ? this.settings.errorPlacement(d, a(b)) : d.insertAfter(b), g.is("label") ? g.attr("for", h) : 0 === g.parents("label[for='" + h + "']").length && (f = g.attr("id").replace(/(:|\.|\[|\])/g, "\\$1"), i ? i.match(new RegExp("\\b" + f + "\\b")) || (i += " " + f) : i = f, a(b).attr("aria-describedby", i), e = this.groups[b.name], e && a.each(this.groups, function(b, c) {
                        c === e && a("[name='" + b + "']", this.currentForm).attr("aria-describedby", g.attr("id"))
                    }))), !c && this.settings.success && (g.text(""), "string" == typeof this.settings.success ? g.addClass(this.settings.success) : this.settings.success(g, b)), this.toShow = this.toShow.add(g)
                },
                errorsFor: function(b) {
                    var c = this.idOrName(b),
                        d = a(b).attr("aria-describedby"),
                        e = "label[for='" + c + "'], label[for='" + c + "'] *";
                    return d && (e = e + ", #" + d.replace(/\s+/g, ", #")), this.errors().filter(e)
                },
                idOrName: function(a) {
                    return this.groups[a.name] || (this.checkable(a) ? a.name : a.id || a.name)
                },
                validationTargetFor: function(b) {
                    return this.checkable(b) && (b = this.findByName(b.name)), a(b).not(this.settings.ignore)[0]
                },
                checkable: function(a) {
                    return /radio|checkbox/i.test(a.type)
                },
                findByName: function(b) {
                    return a(this.currentForm).find("[name='" + b + "']")
                },
                getLength: function(b, c) {
                    switch (c.nodeName.toLowerCase()) {
                        case "select":
                            return a("option:selected", c).length;
                        case "input":
                            if (this.checkable(c)) return this.findByName(c.name).filter(":checked").length
                    }
                    return b.length
                },
                depend: function(a, b) {
                    return this.dependTypes[typeof a] ? this.dependTypes[typeof a](a, b) : !0
                },
                dependTypes: {
                    "boolean": function(a) {
                        return a
                    },
                    string: function(b, c) {
                        return !!a(b, c.form).length
                    },
                    "function": function(a, b) {
                        return a(b)
                    }
                },
                optional: function(b) {
                    var c = this.elementValue(b);
                    return !a.validator.methods.required.call(this, c, b) && "dependency-mismatch"
                },
                startRequest: function(a) {
                    this.pending[a.name] || (this.pendingRequest++, this.pending[a.name] = !0)
                },
                stopRequest: function(b, c) {
                    this.pendingRequest--, this.pendingRequest < 0 && (this.pendingRequest = 0), delete this.pending[b.name], c && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (a(this.currentForm).submit(), this.formSubmitted = !1) : !c && 0 === this.pendingRequest && this.formSubmitted && (a(this.currentForm).triggerHandler("invalid-form", [this]), this.formSubmitted = !1)
                },
                previousValue: function(b) {
                    return a.data(b, "previousValue") || a.data(b, "previousValue", {
                        old: null,
                        valid: !0,
                        message: this.defaultMessage(b, "remote")
                    })
                }
            },
            classRuleSettings: {
                required: {
                    required: !0
                },
                email: {
                    email: !0
                },
                url: {
                    url: !0
                },
                date: {
                    date: !0
                },
                dateISO: {
                    dateISO: !0
                },
                number: {
                    number: !0
                },
                digits: {
                    digits: !0
                },
                creditcard: {
                    creditcard: !0
                }
            },
            addClassRules: function(b, c) {
                b.constructor === String ? this.classRuleSettings[b] = c : a.extend(this.classRuleSettings, b)
            },
            classRules: function(b) {
                var c = {},
                    d = a(b).attr("class");
                return d && a.each(d.split(" "), function() {
                    this in a.validator.classRuleSettings && a.extend(c, a.validator.classRuleSettings[this])
                }), c
            },
            attributeRules: function(b) {
                var c, d, e = {},
                    f = a(b),
                    g = b.getAttribute("type");
                for (c in a.validator.methods) "required" === c ? (d = b.getAttribute(c), "" === d && (d = !0), d = !!d) : d = f.attr(c), /min|max/.test(c) && (null === g || /number|range|text/.test(g)) && (d = Number(d)), d || 0 === d ? e[c] = d : g === c && "range" !== g && (e[c] = !0);
                return e.maxlength && /-1|2147483647|524288/.test(e.maxlength) && delete e.maxlength, e
            },
            dataRules: function(b) {
                var c, d, e = {},
                    f = a(b);
                for (c in a.validator.methods) d = f.data("rule" + c.charAt(0).toUpperCase() + c.substring(1).toLowerCase()), void 0 !== d && (e[c] = d);
                return e
            },
            staticRules: function(b) {
                var c = {},
                    d = a.data(b.form, "validator");
                return d.settings.rules && (c = a.validator.normalizeRule(d.settings.rules[b.name]) || {}), c
            },
            normalizeRules: function(b, c) {
                return a.each(b, function(d, e) {
                    if (e === !1) return void delete b[d];
                    if (e.param || e.depends) {
                        var f = !0;
                        switch (typeof e.depends) {
                            case "string":
                                f = !!a(e.depends, c.form).length;
                                break;
                            case "function":
                                f = e.depends.call(c, c)
                        }
                        f ? b[d] = void 0 !== e.param ? e.param : !0 : delete b[d]
                    }
                }), a.each(b, function(d, e) {
                    b[d] = a.isFunction(e) ? e(c) : e
                }), a.each(["minlength", "maxlength"], function() {
                    b[this] && (b[this] = Number(b[this]))
                }), a.each(["rangelength", "range"], function() {
                    var c;
                    b[this] && (a.isArray(b[this]) ? b[this] = [Number(b[this][0]), Number(b[this][1])] : "string" == typeof b[this] && (c = b[this].replace(/[\[\]]/g, "").split(/[\s,]+/), b[this] = [Number(c[0]), Number(c[1])]))
                }), a.validator.autoCreateRanges && (null != b.min && null != b.max && (b.range = [b.min, b.max], delete b.min, delete b.max), null != b.minlength && null != b.maxlength && (b.rangelength = [b.minlength, b.maxlength], delete b.minlength, delete b.maxlength)), b
            },
            normalizeRule: function(b) {
                if ("string" == typeof b) {
                    var c = {};
                    a.each(b.split(/\s/), function() {
                        c[this] = !0
                    }), b = c
                }
                return b
            },
            addMethod: function(b, c, d) {
                a.validator.methods[b] = c, a.validator.messages[b] = void 0 !== d ? d : a.validator.messages[b], c.length < 3 && a.validator.addClassRules(b, a.validator.normalizeRule(b))
            },
            methods: {
                required: function(b, c, d) {
                    if (!this.depend(d, c)) return "dependency-mismatch";
                    if ("select" === c.nodeName.toLowerCase()) {
                        var e = a(c).val();
                        return e && e.length > 0
                    }
                    return this.checkable(c) ? this.getLength(b, c) > 0 : a.trim(b).length > 0
                },
                email: function(a, b) {
                    return this.optional(b) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(a)
                },
                url: function(a, b) {
                    return this.optional(b) || /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(a)
                },
                date: function(a, b) {
                    return this.optional(b) || !/Invalid|NaN/.test(new Date(a).toString())
                },
                dateISO: function(a, b) {
                    return this.optional(b) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(a)
                },
                number: function(a, b) {
                    return this.optional(b) || /^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(a)
                },
                digits: function(a, b) {
                    return this.optional(b) || /^\d+$/.test(a)
                },
                creditcard: function(a, b) {
                    if (this.optional(b)) return "dependency-mismatch";
                    if (/[^0-9 \-]+/.test(a)) return !1;
                    var c, d, e = 0,
                        f = 0,
                        g = !1;
                    if (a = a.replace(/\D/g, ""), a.length < 13 || a.length > 19) return !1;
                    for (c = a.length - 1; c >= 0; c--) d = a.charAt(c), f = parseInt(d, 10), g && (f *= 2) > 9 && (f -= 9), e += f, g = !g;
                    return 0 === e % 10
                },
                minlength: function(b, c, d) {
                    var e = a.isArray(b) ? b.length : this.getLength(b, c);
                    return this.optional(c) || e >= d
                },
                maxlength: function(b, c, d) {
                    var e = a.isArray(b) ? b.length : this.getLength(b, c);
                    return this.optional(c) || d >= e
                },
                rangelength: function(b, c, d) {
                    var e = a.isArray(b) ? b.length : this.getLength(b, c);
                    return this.optional(c) || e >= d[0] && e <= d[1]
                },
                min: function(a, b, c) {
                    return this.optional(b) || a >= c
                },
                max: function(a, b, c) {
                    return this.optional(b) || c >= a
                },
                range: function(a, b, c) {
                    return this.optional(b) || a >= c[0] && a <= c[1]
                },
                equalTo: function(b, c, d) {
                    var e = a(d);
                    return this.settings.onfocusout && e.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                        a(c).valid()
                    }), b === e.val()
                },
                remote: function(b, c, d) {
                    if (this.optional(c)) return "dependency-mismatch";
                    var e, f, g = this.previousValue(c);
                    return this.settings.messages[c.name] || (this.settings.messages[c.name] = {}), g.originalMessage = this.settings.messages[c.name].remote, this.settings.messages[c.name].remote = g.message, d = "string" == typeof d && {
                        url: d
                    } || d, g.old === b ? g.valid : (g.old = b, e = this, this.startRequest(c), f = {}, f[c.name] = b, a.ajax(a.extend(!0, {
                        url: d,
                        mode: "abort",
                        port: "validate" + c.name,
                        dataType: "json",
                        data: f,
                        context: e.currentForm,
                        success: function(d) {
                            var f, h, i, j = d === !0 || "true" === d;
                            e.settings.messages[c.name].remote = g.originalMessage, j ? (i = e.formSubmitted, e.prepareElement(c), e.formSubmitted = i, e.successList.push(c), delete e.invalid[c.name], e.showErrors()) : (f = {}, h = d || e.defaultMessage(c, "remote"), f[c.name] = g.message = a.isFunction(h) ? h(b) : h, e.invalid[c.name] = !0, e.showErrors(f)), g.valid = j, e.stopRequest(c, j)
                        }
                    }, d)), "pending")
                }
            }
        }), a.format = function() {
            throw "$.format has been deprecated. Please use $.validator.format instead."
        };
        var b, c = {};
        a.ajaxPrefilter ? a.ajaxPrefilter(function(a, b, d) {
            var e = a.port;
            "abort" === a.mode && (c[e] && c[e].abort(), c[e] = d)
        }) : (b = a.ajax, a.ajax = function(d) {
            var e = ("mode" in d ? d : a.ajaxSettings).mode,
                f = ("port" in d ? d : a.ajaxSettings).port;
            return "abort" === e ? (c[f] && c[f].abort(), c[f] = b.apply(this, arguments), c[f]) : b.apply(this, arguments)
        }), a.extend(a.fn, {
            validateDelegate: function(b, c, d) {
                return this.bind(c, function(c) {
                    var e = a(c.target);
                    return e.is(b) ? d.apply(e, arguments) : void 0
                })
            }
        })
    })
}), define("module/common/reg", function(require, a, b) {
    require("jquery");
    var c = require("component/dialog/dialog");
    b.exports = {
        dialog: function() {
            require("page/common"), require("jquery.form"), require("component/jquery.validate.min");
            var a = c({
                title: "请注册",
                lock: !0,
                fixed: !0,
                width: "480px",
                close: function() {
                    a = null
                }
            });
            a.showModal(), $.ajax({
                url: "/ajax/reg/dialog",
                type: "POST",
                cache: !1,
                data: "_=",
                success: function(b) {
                    a.content(b), $("#T-reg-mobile-code").each(function() {
                        window.mobileCode = new TrjcnMobileCode, window.mobileCode.init("mobile"), window.mobileCode.handmsg = function(a) {
                            return window.mobileCode.mobileInfoHand.html('<em class="ui-text-red"><i class="icoErr16"></i>' + a + "</em>")
                        }
                    });
                    var c = $("#J_dl_reg_frm").validate({
                        rules: {
                            mobile: "required",
                            mobilecode: "required"
                        },
                        messages: {
                            mobile: {
                                required: '<i class="icoErr16"></i>请输入手机号码.'
                            },
                            mobilecode: {
                                required: '<i class="icoErr16"></i>请输入验证码.'
                            }
                        },
                        errorElement: "em",
                        errorClass: "ui-text-red",
                        errorPlacement: function(a, b) {
                            var c = b.nextAll("span");
                            c.html(""), a.appendTo(c)
                        }
                    });
                    $("#J_dl_btn_reg").click(function() {
                        if (c.form()) {
                            var a = $("#J_dl_reg_frm").formSerialize();
                            $.ajax({
                                url: "/api/reg/submit",
                                type: "POST",
                                dataType: "json",
                                data: a,
                                success: function(a) {
                                    if (200 == a.code) location.reload();
                                    else
                                        for (var b in a.data.error_messages) {
                                            $("#J_mobile_info").html('<em class="ui-text-red"><i class="icoErr16"></i>' + a.data.error_messages[b] + "</em>").show();
                                            break
                                        }
                                }
                            })
                        }
                    })
                }
            })
        }
    }
}), define("module/common/login", function(require, a, b) {
    require("jquery"), require("page/common"), require("jquery.form");
    var c = require("component/dialog/dialog");
    b.exports = {
        dialog: function() {
            var a = c({
                title: "请登录",
                lock: !0,
                fixed: !0,
                width: "480px",
                close: function() {
                    a = null
                }
            });
            a.showModal(), $.ajax({
                url: "/ajax/login/dialog",
                type: "POST",
                cache: !1,
                data: "_=",
                success: function(b) {
                    a.content(b);
                    var c = new TrjcnLogin;
                    c.init("J_dl_login_frm"), c.login_tip = function(a) {
                        var b = this;
                        a ? b.d("login-msg").html('<i class="icoErr16"></i>' + a).parents(".part-fieldset").show() : b.d("login-msg").parents(".part-fieldset").hide()
                    }, c.jump = !1;
                    var d = require("module/common/reg");
                    $("#J_dl_reg").click(function() {
                        a.remove(), d.dialog()
                    })
                }
            })
        }
    }
}), define("component/jquery.hover", function(require) {
    require("jquery"), $.fn.hoverClass = function(a) {
        var b = this;
        return b.each(function(c) {
            b.eq(c).hover(function() {
                $(this).addClass(a)
            }, function() {
                $(this).removeClass(a)
            })
        }), b
    }
}), define("component/SuperSlide/SuperSlide", function(require) {
    window.jQuery = require("jquery"), ! function(a) {
        a.fn.slide = function(b) {
            return a.fn.slide.defaults = {
                type: "slide",
                effect: "fade",
                autoPlay: !1,
                delayTime: 500,
                interTime: 2500,
                triggerTime: 150,
                defaultIndex: 0,
                titCell: ".hd li",
                mainCell: ".bd",
                targetCell: null,
                trigger: "mouseover",
                scroll: 1,
                vis: 1,
                titOnClassName: "on",
                autoPage: !1,
                prevCell: ".prev",
                nextCell: ".next",
                pageStateCell: ".pageState",
                opp: !1,
                pnLoop: !0,
                easing: "swing",
                startFun: null,
                endFun: null,
                switchLoad: null,
                playStateCell: ".playState",
                mouseOverStop: !0,
                defaultPlay: !0,
                returnDefault: !1
            }, this.each(function() {
                var c = a.extend({}, a.fn.slide.defaults, b),
                    d = a(this),
                    e = c.effect,
                    f = a(c.prevCell, d),
                    g = a(c.nextCell, d),
                    h = a(c.pageStateCell, d),
                    i = a(c.playStateCell, d),
                    j = a(c.titCell, d),
                    k = j.size(),
                    l = a(c.mainCell, d),
                    m = l.children().size(),
                    n = c.switchLoad,
                    o = a(c.targetCell, d),
                    p = parseInt(c.defaultIndex),
                    q = parseInt(c.delayTime),
                    r = parseInt(c.interTime);
                parseInt(c.triggerTime);
                var s, t = parseInt(c.scroll),
                    u = parseInt(c.vis),
                    v = "false" == c.autoPlay || 0 == c.autoPlay ? !1 : !0,
                    w = "false" == c.opp || 0 == c.opp ? !1 : !0,
                    x = "false" == c.autoPage || 0 == c.autoPage ? !1 : !0,
                    y = "false" == c.pnLoop || 0 == c.pnLoop ? !1 : !0,
                    z = "false" == c.mouseOverStop || 0 == c.mouseOverStop ? !1 : !0,
                    A = "false" == c.defaultPlay || 0 == c.defaultPlay ? !1 : !0,
                    B = "false" == c.returnDefault || 0 == c.returnDefault ? !1 : !0,
                    C = 0,
                    D = 0,
                    E = 0,
                    F = 0,
                    G = c.easing,
                    H = null,
                    I = null,
                    J = null,
                    K = c.titOnClassName,
                    L = j.index(d.find("." + K)),
                    M = p = -1 == L ? p : L,
                    N = p,
                    O = p,
                    P = m >= u ? 0 != m % t ? m % t : t : 0,
                    Q = "leftMarquee" == e || "topMarquee" == e ? !0 : !1,
                    R = function() {
                        a.isFunction(c.startFun) && c.startFun(p, k, d, a(c.titCell, d), l, o, f, g)
                    },
                    S = function() {
                        a.isFunction(c.endFun) && c.endFun(p, k, d, a(c.titCell, d), l, o, f, g)
                    },
                    T = function() {
                        j.removeClass(K), A && j.eq(N).addClass(K)
                    };
                if ("menu" == c.type) return A && j.removeClass(K).eq(p).addClass(K), j.hover(function() {
                    s = a(this).find(c.targetCell);
                    var b = j.index(a(this));
                    I = setTimeout(function() {
                        switch (p = b, j.removeClass(K).eq(p).addClass(K), R(), e) {
                            case "fade":
                                s.stop(!0, !0).animate({
                                    opacity: "show"
                                }, q, G, S);
                                break;
                            case "slideDown":
                                s.stop(!0, !0).animate({
                                    height: "show"
                                }, q, G, S)
                        }
                    }, c.triggerTime)
                }, function() {
                    switch (clearTimeout(I), e) {
                        case "fade":
                            s.animate({
                                opacity: "hide"
                            }, q, G);
                            break;
                        case "slideDown":
                            s.animate({
                                height: "hide"
                            }, q, G)
                    }
                }), B && d.hover(function() {
                    clearTimeout(J)
                }, function() {
                    J = setTimeout(T, q)
                }), void 0;
                if (0 == k && (k = m), Q && (k = 2), x) {
                    if (m >= u)
                        if ("leftLoop" == e || "topLoop" == e) k = 0 != m % t ? (0 ^ m / t) + 1 : m / t;
                        else {
                            var U = m - u;
                            k = 1 + parseInt(0 != U % t ? U / t + 1 : U / t), 0 >= k && (k = 1)
                        }
                    else k = 1;
                    j.html("");
                    var V = "";
                    if (1 == c.autoPage || "true" == c.autoPage)
                        for (var W = 0; k > W; W++) V += "<li>" + (W + 1) + "</li>";
                    else
                        for (var W = 0; k > W; W++) V += c.autoPage.replace("$", W + 1);
                    j.html(V);
                    var j = j.children()
                }
                if (m >= u) {
                    l.children().each(function() {
                        a(this).width() > E && (E = a(this).width(), D = a(this).outerWidth(!0)), a(this).height() > F && (F = a(this).height(), C = a(this).outerHeight(!0))
                    });
                    var X = l.children(),
                        Y = function() {
                            for (var a = 0; u > a; a++) X.eq(a).clone().addClass("clone").appendTo(l);
                            for (var a = 0; P > a; a++) X.eq(m - a - 1).clone().addClass("clone").prependTo(l)
                        };
                    switch (e) {
                        case "fold":
                            l.css({
                                position: "relative",
                                width: D,
                                height: C
                            }).children().css({
                                position: "absolute",
                                width: E,
                                left: 0,
                                top: 0,
                                display: "none"
                            });
                            break;
                        case "top":
                            l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:' + u * C + 'px"></div>').css({
                                top: -(p * t) * C,
                                position: "relative",
                                padding: "0",
                                margin: "0"
                            }).children().css({
                                height: F
                            });
                            break;
                        case "left":
                            l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:' + u * D + 'px"></div>').css({
                                width: m * D,
                                left: -(p * t) * D,
                                position: "relative",
                                overflow: "hidden",
                                padding: "0",
                                margin: "0"
                            }).children().css({
                                "float": "left",
                                width: E
                            });
                            break;
                        case "leftLoop":
                        case "leftMarquee":
                            Y(), l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; width:' + u * D + 'px"></div>').css({
                                width: (m + u + P) * D,
                                position: "relative",
                                overflow: "hidden",
                                padding: "0",
                                margin: "0",
                                left: -(P + p * t) * D
                            }).children().css({
                                "float": "left",
                                width: E
                            });
                            break;
                        case "topLoop":
                        case "topMarquee":
                            Y(), l.wrap('<div class="tempWrap" style="overflow:hidden; position:relative; height:' + u * C + 'px"></div>').css({
                                height: (m + u + P) * C,
                                position: "relative",
                                padding: "0",
                                margin: "0",
                                top: -(P + p * t) * C
                            }).children().css({
                                height: F
                            })
                    }
                }
                var Z = function(a) {
                        var b = a * t;
                        return a == k ? b = m : -1 == a && 0 != m % t && (b = -m % t), b
                    },
                    $ = function(b) {
                        var c = function(c) {
                            for (var d = c; u + c > d; d++) b.eq(d).find("img[" + n + "]").each(function() {
                                var b = a(this);
                                if (b.attr("src", b.attr(n)).removeAttr(n), l.find(".clone")[0])
                                    for (var c = l.children(), d = 0; d < c.size(); d++) c.eq(d).find("img[" + n + "]").each(function() {
                                        a(this).attr(n) == b.attr("src") && a(this).attr("src", a(this).attr(n)).removeAttr(n)
                                    })
                            })
                        };
                        switch (e) {
                            case "fade":
                            case "fold":
                            case "top":
                            case "left":
                            case "slideDown":
                                c(p * t);
                                break;
                            case "leftLoop":
                            case "topLoop":
                                c(P + Z(O));
                                break;
                            case "leftMarquee":
                            case "topMarquee":
                                var d = "leftMarquee" == e ? l.css("left").replace("px", "") : l.css("top").replace("px", ""),
                                    f = "leftMarquee" == e ? D : C,
                                    g = P;
                                if (0 != d % f) {
                                    var h = Math.abs(0 ^ d / f);
                                    g = 1 == p ? P + h : P + h - 1
                                }
                                c(g)
                        }
                    },
                    _ = function(a) {
                        if (!A || M != p || a || Q) {
                            if (Q ? p >= 1 ? p = 1 : 0 >= p && (p = 0) : (O = p, p >= k ? p = 0 : 0 > p && (p = k - 1)), R(), null != n && $(l.children()), o[0] && (s = o.eq(p), null != n && $(o), "slideDown" == e ? (o.not(s).stop(!0, !0).slideUp(q), s.slideDown(q, G, function() {
                                    l[0] || S()
                                })) : (o.not(s).stop(!0, !0).hide(), s.animate({
                                    opacity: "show"
                                }, q, function() {
                                    l[0] || S()
                                }))), m >= u) switch (e) {
                                case "fade":
                                    l.children().stop(!0, !0).eq(p).animate({
                                        opacity: "show"
                                    }, q, G, function() {
                                        S()
                                    }).siblings().hide();
                                    break;
                                case "fold":
                                    l.children().stop(!0, !0).eq(p).animate({
                                        opacity: "show"
                                    }, q, G, function() {
                                        S()
                                    }).siblings().animate({
                                        opacity: "hide"
                                    }, q, G);
                                    break;
                                case "top":
                                    l.stop(!0, !1).animate({
                                        top: -p * t * C
                                    }, q, G, function() {
                                        S()
                                    });
                                    break;
                                case "left":
                                    l.stop(!0, !1).animate({
                                        left: -p * t * D
                                    }, q, G, function() {
                                        S()
                                    });
                                    break;
                                case "leftLoop":
                                    var b = O;
                                    l.stop(!0, !0).animate({
                                        left: -(Z(O) + P) * D
                                    }, q, G, function() {
                                        -1 >= b ? l.css("left", -(P + (k - 1) * t) * D) : b >= k && l.css("left", -P * D), S()
                                    });
                                    break;
                                case "topLoop":
                                    var b = O;
                                    l.stop(!0, !0).animate({
                                        top: -(Z(O) + P) * C
                                    }, q, G, function() {
                                        -1 >= b ? l.css("top", -(P + (k - 1) * t) * C) : b >= k && l.css("top", -P * C), S()
                                    });
                                    break;
                                case "leftMarquee":
                                    var c = l.css("left").replace("px", "");
                                    0 == p ? l.animate({
                                        left: ++c
                                    }, 0, function() {
                                        l.css("left").replace("px", "") >= 0 && l.css("left", -m * D)
                                    }) : l.animate({
                                        left: --c
                                    }, 0, function() {
                                        l.css("left").replace("px", "") <= -(m + P) * D && l.css("left", -P * D)
                                    });
                                    break;
                                case "topMarquee":
                                    var d = l.css("top").replace("px", "");
                                    0 == p ? l.animate({
                                        top: ++d
                                    }, 0, function() {
                                        l.css("top").replace("px", "") >= 0 && l.css("top", -m * C)
                                    }) : l.animate({
                                        top: --d
                                    }, 0, function() {
                                        l.css("top").replace("px", "") <= -(m + P) * C && l.css("top", -P * C)
                                    })
                            }
                            j.removeClass(K).eq(p).addClass(K), M = p, y || (g.removeClass("nextStop"), f.removeClass("prevStop"), 0 == p && f.addClass("prevStop"), p == k - 1 && g.addClass("nextStop")), h.html("<span>" + (p + 1) + "</span>/" + k)
                        }
                    };
                A && _(!0), B && d.hover(function() {
                    clearTimeout(J)
                }, function() {
                    J = setTimeout(function() {
                        p = N, A ? _() : "slideDown" == e ? s.slideUp(q, T) : s.animate({
                            opacity: "hide"
                        }, q, T), M = p
                    }, 300)
                });
                var ab = function(a) {
                        H = setInterval(function() {
                            w ? p-- : p++, _()
                        }, a ? a : r)
                    },
                    bb = function(a) {
                        H = setInterval(_, a ? a : r)
                    },
                    cb = function() {
                        z || (clearInterval(H), ab())
                    },
                    db = function() {
                        (y || p != k - 1) && (p++, _(), Q || cb())
                    },
                    eb = function() {
                        (y || 0 != p) && (p--, _(), Q || cb())
                    },
                    fb = function() {
                        clearInterval(H), Q ? bb() : ab(), i.removeClass("pauseState")
                    },
                    gb = function() {
                        clearInterval(H), i.addClass("pauseState")
                    };
                if (v ? Q ? (w ? p-- : p++, bb(), z && l.hover(gb, fb)) : (ab(), z && d.hover(gb, fb)) : (Q && (w ? p-- : p++), i.addClass("pauseState")), i.click(function() {
                        i.hasClass("pauseState") ? fb() : gb()
                    }), "mouseover" == c.trigger ? j.hover(function() {
                        var a = j.index(this);
                        I = setTimeout(function() {
                            p = a, _(), cb()
                        }, c.triggerTime)
                    }, function() {
                        clearTimeout(I)
                    }) : j.click(function() {
                        p = j.index(this), _(), cb()
                    }), Q) {
                    if (g.mousedown(db), f.mousedown(eb), y) {
                        var hb, ib = function() {
                                hb = setTimeout(function() {
                                    clearInterval(H), bb(0 ^ r / 10)
                                }, 150)
                            },
                            jb = function() {
                                clearTimeout(hb), clearInterval(H), bb()
                            };
                        g.mousedown(ib), g.mouseup(jb), f.mousedown(ib), f.mouseup(jb)
                    }
                    "mouseover" == c.trigger && (g.hover(db, function() {}), f.hover(eb, function() {}))
                } else g.click(db), f.click(eb)
            })
        }
    }(jQuery), jQuery.easing.jswing = jQuery.easing.swing, jQuery.extend(jQuery.easing, {
        def: "easeOutQuad",
        swing: function(a, b, c, d, e) {
            return jQuery.easing[jQuery.easing.def](a, b, c, d, e)
        },
        easeInQuad: function(a, b, c, d, e) {
            return d * (b /= e) * b + c
        },
        easeOutQuad: function(a, b, c, d, e) {
            return -d * (b /= e) * (b - 2) + c
        },
        easeInOutQuad: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c
        },
        easeInCubic: function(a, b, c, d, e) {
            return d * (b /= e) * b * b + c
        },
        easeOutCubic: function(a, b, c, d, e) {
            return d * ((b = b / e - 1) * b * b + 1) + c
        },
        easeInOutCubic: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
        },
        easeInQuart: function(a, b, c, d, e) {
            return d * (b /= e) * b * b * b + c
        },
        easeOutQuart: function(a, b, c, d, e) {
            return -d * ((b = b / e - 1) * b * b * b - 1) + c
        },
        easeInOutQuart: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c
        },
        easeInQuint: function(a, b, c, d, e) {
            return d * (b /= e) * b * b * b * b + c
        },
        easeOutQuint: function(a, b, c, d, e) {
            return d * ((b = b / e - 1) * b * b * b * b + 1) + c
        },
        easeInOutQuint: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c
        },
        easeInSine: function(a, b, c, d, e) {
            return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
        },
        easeOutSine: function(a, b, c, d, e) {
            return d * Math.sin(b / e * (Math.PI / 2)) + c
        },
        easeInOutSine: function(a, b, c, d, e) {
            return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
        },
        easeInExpo: function(a, b, c, d, e) {
            return 0 == b ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
        },
        easeOutExpo: function(a, b, c, d, e) {
            return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c
        },
        easeInOutExpo: function(a, b, c, d, e) {
            return 0 == b ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c
        },
        easeInCirc: function(a, b, c, d, e) {
            return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
        },
        easeOutCirc: function(a, b, c, d, e) {
            return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
        },
        easeInOutCirc: function(a, b, c, d, e) {
            return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
        },
        easeInElastic: function(a, b, c, d, e) {
            var f = 1.70158,
                g = 0,
                h = d;
            if (0 == b) return c;
            if (1 == (b /= e)) return c + d;
            if (g || (g = .3 * e), h < Math.abs(d)) {
                h = d;
                var f = g / 4
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g)) + c
        },
        easeOutElastic: function(a, b, c, d, e) {
            var f = 1.70158,
                g = 0,
                h = d;
            if (0 == b) return c;
            if (1 == (b /= e)) return c + d;
            if (g || (g = .3 * e), h < Math.abs(d)) {
                h = d;
                var f = g / 4
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return h * Math.pow(2, -10 * b) * Math.sin(2 * (b * e - f) * Math.PI / g) + d + c
        },
        easeInOutElastic: function(a, b, c, d, e) {
            var f = 1.70158,
                g = 0,
                h = d;
            if (0 == b) return c;
            if (2 == (b /= e / 2)) return c + d;
            if (g || (g = 1.5 * .3 * e), h < Math.abs(d)) {
                h = d;
                var f = g / 4
            } else var f = g / (2 * Math.PI) * Math.asin(d / h);
            return 1 > b ? -.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g) + c : .5 * h * Math.pow(2, -10 * (b -= 1)) * Math.sin(2 * (b * e - f) * Math.PI / g) + d + c
        },
        easeInBack: function(a, b, c, d, e, f) {
            return void 0 == f && (f = 1.70158), d * (b /= e) * b * ((f + 1) * b - f) + c
        },
        easeOutBack: function(a, b, c, d, e, f) {
            return void 0 == f && (f = 1.70158), d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c
        },
        easeInOutBack: function(a, b, c, d, e, f) {
            return void 0 == f && (f = 1.70158), (b /= e / 2) < 1 ? d / 2 * b * b * (((f *= 1.525) + 1) * b - f) + c : d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c
        },
        easeInBounce: function(a, b, c, d, e) {
            return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c
        },
        easeOutBounce: function(a, b, c, d, e) {
            return (b /= e) < 1 / 2.75 ? 7.5625 * d * b * b + c : 2 / 2.75 > b ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : 2.5 / 2.75 > b ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
        },
        easeInOutBounce: function(a, b, c, d, e) {
            return e / 2 > b ? .5 * jQuery.easing.easeInBounce(a, 2 * b, 0, d, e) + c : .5 * jQuery.easing.easeOutBounce(a, 2 * b - e, 0, d, e) + .5 * d + c
        }
    })
}), define("module/matches", function() {
    window.Modernizr = function(a, b, c) {
        function d(a) {
            t.cssText = a
        }

        function e(a, b) {
            return d(w.join(a + ";") + (b || ""))
        }

        function f(a, b) {
            return typeof a === b
        }

        function g(a, b) {
            return !!~("" + a).indexOf(b)
        }

        function h(a, b) {
            for (var d in a) {
                var e = a[d];
                if (!g(e, "-") && t[e] !== c) return "pfx" == b ? e : !0
            }
            return !1
        }

        function i(a, b, d) {
            for (var e in a) {
                var g = b[a[e]];
                if (g !== c) return d === !1 ? a[e] : f(g, "function") ? g.bind(d || b) : g
            }
            return !1
        }

        function j(a, b, c) {
            var d = a.charAt(0).toUpperCase() + a.slice(1),
                e = (a + " " + y.join(d + " ") + d).split(" ");
            return f(b, "string") || f(b, "undefined") ? h(e, b) : (e = (a + " " + z.join(d + " ") + d).split(" "), i(e, b, c))
        }

        function k() {
            o.input = function(c) {
                for (var d = 0, e = c.length; e > d; d++) C[c[d]] = c[d] in u;
                return C.list && (C.list = !!b.createElement("datalist") && !!a.HTMLDataListElement), C
            }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), o.inputtypes = function(a) {
                for (var d, e, f, g = 0, h = a.length; h > g; g++) u.setAttribute("type", e = a[g]), d = "text" !== u.type, d && (u.value = v, u.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(e) && u.style.WebkitAppearance !== c ? (q.appendChild(u), f = b.defaultView, d = f.getComputedStyle && "textfield" !== f.getComputedStyle(u, null).WebkitAppearance && 0 !== u.offsetHeight, q.removeChild(u)) : /^(search|tel)$/.test(e) || (d = /^(url|email)$/.test(e) ? u.checkValidity && u.checkValidity() === !1 : u.value != v)), B[a[g]] = !!d;
                return B
            }("search tel url email datetime date month week time datetime-local number range color".split(" "))
        }
        var l, m, n = "2.6.2",
            o = {},
            p = !0,
            q = b.documentElement,
            r = "modernizr",
            s = b.createElement(r),
            t = s.style,
            u = b.createElement("input"),
            v = ":)",
            w = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")),
            x = "Webkit Moz O ms",
            y = x.split(" "),
            z = x.toLowerCase().split(" "),
            A = {},
            B = {},
            C = {},
            D = [],
            E = D.slice,
            F = function(a, c, d, e) {
                var f, g, h, i, j = b.createElement("div"),
                    k = b.body,
                    l = k || b.createElement("body");
                if (parseInt(d, 10))
                    for (; d--;) h = b.createElement("div"), h.id = e ? e[d] : r + (d + 1), j.appendChild(h);
                return f = ["&#173;", '<style id="s', r, '">', a, "</style>"].join(""), j.id = r, (k ? j : l).innerHTML += f, l.appendChild(j), k || (l.style.background = "", l.style.overflow = "hidden", i = q.style.overflow, q.style.overflow = "hidden", q.appendChild(l)), g = c(j, a), k ? j.parentNode.removeChild(j) : (l.parentNode.removeChild(l), q.style.overflow = i), !!g
            },
            G = function() {
                function a(a, e) {
                    e = e || b.createElement(d[a] || "div"), a = "on" + a;
                    var g = a in e;
                    return g || (e.setAttribute || (e = b.createElement("div")), e.setAttribute && e.removeAttribute && (e.setAttribute(a, ""), g = f(e[a], "function"), f(e[a], "undefined") || (e[a] = c), e.removeAttribute(a))), e = null, g
                }
                var d = {
                    select: "input",
                    change: "input",
                    submit: "form",
                    reset: "form",
                    error: "img",
                    load: "img",
                    abort: "img"
                };
                return a
            }(),
            H = {}.hasOwnProperty;
        m = f(H, "undefined") || f(H.call, "undefined") ? function(a, b) {
            return b in a && f(a.constructor.prototype[b], "undefined")
        } : function(a, b) {
            return H.call(a, b)
        }, Function.prototype.bind || (Function.prototype.bind = function(a) {
            var b = this;
            if ("function" != typeof b) throw new TypeError;
            var c = E.call(arguments, 1),
                d = function() {
                    if (this instanceof d) {
                        var e = function() {};
                        e.prototype = b.prototype;
                        var f = new e,
                            g = b.apply(f, c.concat(E.call(arguments)));
                        return Object(g) === g ? g : f
                    }
                    return b.apply(a, c.concat(E.call(arguments)))
                };
            return d
        }), A.touch = function() {
            var c;
            return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : F(["@media (", w.join("touch-enabled),("), r, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) {
                c = 9 === a.offsetTop
            }), c
        }, A.opacity = function() {
            return e("opacity:.55"), /^0.55$/.test(t.opacity)
        }, A.cssanimations = function() {
            return j("animationName")
        }, A.cssgradients = function() {
            var a = "background-image:",
                b = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
                c = "linear-gradient(left top,#9f9, white);";
            return d((a + "-webkit- ".split(" ").join(b + a) + w.join(c + a)).slice(0, -a.length)), g(t.backgroundImage, "gradient")
        }, A.csstransforms = function() {
            return !!j("transform")
        }, A.csstransforms3d = function() {
            var a = !!j("perspective");
            return a && "webkitPerspective" in q.style && F("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(b) {
                a = 9 === b.offsetLeft && 3 === b.offsetHeight
            }), a
        }, A.csstransitions = function() {
            return j("transition")
        }, A.fontface = function() {
            var a;
            return F('@font-face {font-family:"font";src:url("https://")}', function(c, d) {
                var e = b.getElementById("smodernizr"),
                    f = e.sheet || e.styleSheet,
                    g = f ? f.cssRules && f.cssRules[0] ? f.cssRules[0].cssText : f.cssText || "" : "";
                a = /src/i.test(g) && 0 === g.indexOf(d.split(" ")[0])
            }), a
        }, A.generatedcontent = function() {
            var a;
            return F(["#", r, "{font:0/0 a}#", r, ':after{content:"', v, '";visibility:hidden;font:3px/1 a}'].join(""), function(b) {
                a = b.offsetHeight >= 3
            }), a
        };
        for (var I in A) m(A, I) && (l = I.toLowerCase(), o[l] = A[I](), D.push((o[l] ? "" : "no-") + l));
        return o.input || k(), o.addTest = function(a, b) {
                if ("object" == typeof a)
                    for (var d in a) m(a, d) && o.addTest(d, a[d]);
                else {
                    if (a = a.toLowerCase(), o[a] !== c) return o;
                    b = "function" == typeof b ? b() : b, "undefined" != typeof p && p && (q.className += " " + (b ? "" : "no-") + a), o[a] = b
                }
                return o
            }, d(""), s = u = null,
            function(a, b) {
                function c(a, b) {
                    var c = a.createElement("p"),
                        d = a.getElementsByTagName("head")[0] || a.documentElement;
                    return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
                }

                function d() {
                    var a = r.elements;
                    return "string" == typeof a ? a.split(" ") : a
                }

                function e(a) {
                    var b = q[a[o]];
                    return b || (b = {}, p++, a[o] = p, q[p] = b), b
                }

                function f(a, c, d) {
                    if (c || (c = b), k) return c.createElement(a);
                    d || (d = e(c));
                    var f;
                    return f = d.cache[a] ? d.cache[a].cloneNode() : n.test(a) ? (d.cache[a] = d.createElem(a)).cloneNode() : d.createElem(a), f.canHaveChildren && !m.test(a) ? d.frag.appendChild(f) : f
                }

                function g(a, c) {
                    if (a || (a = b), k) return a.createDocumentFragment();
                    c = c || e(a);
                    for (var f = c.frag.cloneNode(), g = 0, h = d(), i = h.length; i > g; g++) f.createElement(h[g]);
                    return f
                }

                function h(a, b) {
                    b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function(c) {
                        return r.shivMethods ? f(c, a, b) : b.createElem(c)
                    }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + d().join().replace(/\w+/g, function(a) {
                        return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")'
                    }) + ");return n}")(r, b.frag)
                }

                function i(a) {
                    a || (a = b);
                    var d = e(a);
                    return r.shivCSS && !j && !d.hasCSS && (d.hasCSS = !!c(a, "article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}mark{background:#FF0;color:#000}")), k || h(a, d), a
                }
                var j, k, l = a.html5 || {},
                    m = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    n = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    o = "_html5shiv",
                    p = 0,
                    q = {};
                ! function() {
                    try {
                        var a = b.createElement("a");
                        a.innerHTML = "<xyz></xyz>", j = "hidden" in a, k = 1 == a.childNodes.length || function() {
                            b.createElement("a");
                            var a = b.createDocumentFragment();
                            return "undefined" == typeof a.cloneNode || "undefined" == typeof a.createDocumentFragment || "undefined" == typeof a.createElement
                        }()
                    } catch (c) {
                        j = !0, k = !0
                    }
                }();
                var r = {
                    elements: l.elements || "abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",
                    shivCSS: l.shivCSS !== !1,
                    supportsUnknownElements: k,
                    shivMethods: l.shivMethods !== !1,
                    type: "default",
                    shivDocument: i,
                    createElement: f,
                    createDocumentFragment: g
                };
                a.html5 = r, i(b)
            }(this, b), o._version = n, o._prefixes = w, o._domPrefixes = z, o._cssomPrefixes = y, o.hasEvent = G, o.testProp = function(a) {
                return h([a])
            }, o.testAllProps = j, o.testStyles = F, q.className = q.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (p ? " js " + D.join(" ") : ""), o
    }(this, this.document), Modernizr.addTest("placeholder", function() {
        return "placeholder" in (Modernizr.input || document.createElement("input")) && "placeholder" in (Modernizr.textarea || document.createElement("textarea"))
    }), $(function() {
        if (Modernizr.touch) $(".flipcard").bind("touchstart MSPointerDown", function() {
            $(this).toggleClass("hover")
        });
        else if (!Modernizr.csstransforms3d) {
            $(".flipcard-container").css({
                overflow: "hidden"
            });
            var a = function() {
                    $(".face.back").css({
                        left: "100%"
                    }), $(".face.front", $(this)).animate({
                        left: "-100%"
                    }), $(".face.back", $(this)).animate({
                        left: "0"
                    })
                },
                b = function() {
                    $(".face.front", $(this)).animate({
                        left: "0"
                    }), $(".face.back", $(this)).animate({
                        left: "100%"
                    })
                };
            $(".flipcard").hover(a, b)
        }
    })
}), define("component/jquery.cookie", function(require) {
    require("jquery"),
        function(a) {
            "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a(jQuery) : a(jQuery)
        }(function(a) {
            function b(a) {
                return h.raw ? a : encodeURIComponent(a)
            }

            function c(a) {
                return h.raw ? a : decodeURIComponent(a)
            }

            function d(a) {
                return b(h.json ? JSON.stringify(a) : String(a))
            }

            function e(a) {
                0 === a.indexOf('"') && (a = a.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, "\\"));
                try {
                    return a = decodeURIComponent(a.replace(g, " ")), h.json ? JSON.parse(a) : a
                } catch (b) {}
            }

            function f(b, c) {
                var d = h.raw ? b : e(b);
                return a.isFunction(c) ? c(d) : d
            }
            var g = /\+/g,
                h = a.cookie = function(e, g, i) {
                    if (arguments.length > 1 && !a.isFunction(g)) {
                        if (i = a.extend({}, h.defaults, i), "number" == typeof i.expires) {
                            var j = i.expires,
                                k = i.expires = new Date;
                            k.setMilliseconds(k.getMilliseconds() + 864e5 * j)
                        }
                        return document.cookie = [b(e), "=", d(g), i.expires ? "; expires=" + i.expires.toUTCString() : "", i.path ? "; path=" + i.path : "", i.domain ? "; domain=" + i.domain : "", i.secure ? "; secure" : ""].join("")
                    }
                    for (var l = e ? void 0 : {}, m = document.cookie ? document.cookie.split("; ") : [], n = 0, o = m.length; o > n; n++) {
                        var p = m[n].split("="),
                            q = c(p.shift()),
                            r = p.join("=");
                        if (e === q) {
                            l = f(r, g);
                            break
                        }
                        e || void 0 === (r = f(r)) || (l[q] = r)
                    }
                    return l
                };
            h.defaults = {}, a.removeCookie = function(b, c) {
                return a.cookie(b, "", a.extend({}, c, {
                    expires: -1
                })), !a.cookie(b)
            }
        })
}), define("page/v6/lib.gotop", function() {
    var a = $("#go-top");
    if (0 != a.length && "1" != a.attr("lock")) {
        a.attr("lock", 1);
        var b = $(window);
        b.scroll(function() {
            b.scrollTop() >= 300 ? a.css("display", "block") : a.css("display", "none")
        }), a.click(function() {
            return $("body,html").animate({
                scrollTop: 0
            }, 500), !1
        })
    }
}), define("page/v6/lib.header", function() {
    $("#J_page_header_2017").each(function() {
        $.fn.extend({
            goSelectInput: function(a) {
                for (var b = [], c = "0123456789abcdef", d = 0; 36 > d; d++) b[d] = c.substr(Math.floor(16 * Math.random()), 1);
                b[14] = "4", b[19] = c.substr(8 | 3 & b[19], 1), b[8] = b[13] = b[18] = b[23] = "-";
                var e = b.join(""),
                    f = this;
                f.css("display", "none");
                var g = {
                        width: a.width ? a.width : parseInt(f.css("width").replace("px", "")),
                        height: a.height ? a.height : parseInt(f.css("height").replace("px", ""))
                    },
                    h = '<div class="_htools-select" style="height: ' + g.height + "px;line-height: " + g.height + "px;width: " + g.width + 'px;" onclick="htools.select.doSelect(\'' + e + "');\">";
                h += '<div id="_select-input_' + e + '" class="_select-input" style="height: ' + g.height + "px; width: " + (g.width - 30) + 'px;">', h += "" != f.find("option:selected").html() && f.find("option:selected").html() ? f.find("option:selected").html() : f.find("option:first").html(), h += '</div><div class="_select-selectbtn"></div>', h += '<ul id="' + e + '" class="_select-select-ul" style="width: ' + g.width + 'px;">';
                var i = f.find("option");
                i.each(function(a) {
                    h += i[a].selected ? '<li ind="' + i[a].value + '" class="_select-li-selected">' + i[a].innerHTML + "</li>" : '<li ind="' + i[a].value + '" >' + i[a].innerHTML + "</li>"
                }), h += "</ul>", f.before(h), f.after("</div>");
                var j = f.parent();
                j.find("._select-input");
                var k = j.find("._select-select-ul");
                j.mouseleave(function() {
                    k.css("display", "none")
                });
                var l = k.find("li");
                l.click(function() {
                    $("#_select-input_" + e).html($(this).text()), f.val($(this).attr("ind")), l.removeClass("_select-li-selected"), $(this).addClass("_select-li-selected")
                })
            }
        });
        var a = "",
            b = function() {
                a = "", setTimeout(function() {
                    a || $("#J_findMoney_List").slideUp("slow", function() {
                        $("#J_findMoney").removeClass("current"), $("#J_nav_index").addClass("current").siblings().removeClass("current")
                    })
                }, 400)
            },
            c = function() {
                a = "", setTimeout(function() {
                    a || $("#J_findPro_List").slideUp("slow", function() {
                        $("#J_findPro").removeClass("current"), $("#J_nav_index").addClass("current").siblings().removeClass("current")
                    })
                }, 400)
            };
        $("#J_findMoney").hover(function() {
            a = 1, $(this).addClass("current").siblings().removeClass("current"), $("#J_findPro_List").hide(), $("#J_findMoney_List").slideDown("fast")
        }, function() {
            b()
        }), $("#J_findPro").hover(function() {
            a = 1, $(this).addClass("current").siblings().removeClass("current"), $("#J_findMoney_List").hide(), $("#J_findPro_List").slideDown("fast")
        }, function() {
            c()
        }), $("#J_findMoney_List").hover(function() {
            a = 1
        }, function() {
            b()
        }), $("#J_findPro_List").hover(function() {
            a = 1
        }, function() {
            c()
        });
        var d = $("#J_page_header_2017");
        d.each(function() {
            var a = $(window),
                b = d.next("#header");
            b.css({
                position: "fixed",
                width: "100%",
                top: "30px"
            }), d.css({
                "padding-bottom": "70px"
            }), a.scroll(function() {
                a.scrollTop() > 0 ? b.css("top", "0") : b.css("top", "30px")
            }), a.scrollTop() > 0 ? b.css("top", "0") : b.css("top", "30px")
        }), $("#find-select").each(function() {
            var a = $(this);
            a.goSelectInput({
                height: 26,
                width: 74
            });
            try {
                var b = window.T_Config.page;
                if (b) {
                    var c = "";
                    $("#find-select option").each(function() {
                        $(this).attr("page") == b && (c = $(this).attr("value"))
                    }), $("ul._select-select-ul li").each(function() {
                        var a = $(this);
                        a.attr("ind") == c && a.addClass("_select-li-selected").trigger("click")
                    })
                }
            } catch (d) {}
        }), $.jqhover = function(a) {
            $(a).hover(function() {
                $(this).addClass("cur")
            }, function() {
                $(this).removeClass("cur")
            })
        }, $.jqhover(".j-hover-all"), $.jqhover(".top-allnav-icon2"), $("input.J_placeholder").focus(function() {
            var a = $(this);
            a.val() == a.attr("tip") && a.val("").css({
                color: "#333"
            })
        }).blur(function() {
            var a = $(this);
            "" == a.val() && a.val(a.attr("tip")).css({
                color: "#999"
            })
        }).css({
            color: "#999"
        }), $("button.J_search_submit").click(function() {
            var a = $(this).prev(".J_placeholder");
            a.val() == a.attr("tip") && a.val("")
        })
    })
});
var htools = {
    select: {
        doSelect: function(a) {
            var b = $("#" + a);
            "none" == b.css("display") ? b.css("display", "block") : b.css("display", "none");
            var c = b.find("._select-li-selected").attr("ind");
            $("#J_s_frm").attr("action", c), $("#find-select option").each(function() {
                $(this).attr("value") == c && $("#J_search_keyword").attr("name", $(this).attr("kname") || "k")
            })
        }
    }
};
define("page/v6/lib.history", function(require) {
    function a(a, b) {
        var c = [],
            d = $.cookie(a);
        d && (c = d.split("|"));
        var e = !1;
        for (var f in c)
            if (c[f] == b) {
                e = !0;
                break
            }
        e === !1 && c.push(b), c.length > 10 && delete c[0], d = [];
        for (var f in c) c[f] && d.push(c[f]);
        $.cookie(a, d.join("|"), {
            path: "/"
        })
    }
    return require("component/jquery.cookie"), {
        add: function(b, c) {
            c = c || "HS", a(c, b)
        }
    }
}), define("page/v6/lib.zjxm_view", function(require) {
    function a() {
        return e
    }

    function b(a, b) {
        return e[a] = b
    }
    var c = function(a) {
            if (a.view_num && $("#J_G_view_num").each(function() {
                    $(this).html(a.view_num)
                }), a.is_fav && $("#J_addfav").each(function() {
                    $(this).html("已收藏")
                }), a.history) {
                var b = require("component/template");
                $("#J_G_history").each(function() {
                    var c = b("J_G_history_TPL", a);
                    $(this).html(c)
                })
            }
            if (a.meta)
                for (var c in a.meta) $("#J_" + c + "_auth").each(function() {
                    $(this).html(a.meta[c]);
                    try {
                        $(this).find(".mCustomScrollbar").each(function() {
                            $(this).mCustomScrollbar()
                        })
                    } catch (b) {}
                });
            a.id && $("#J_G_load_comment").each(function() {
                a.comment_num ? $(this).attr("url", "ajax/comment/get/" + a.id + "?n=" + a.comment_num).trigger("click") : $(this).parent().html('<div class="part-not-cont fn-pb-30 fn-border-t-gary"><i class="icoPro16yellow"></i><span class="fn-vam">暂时还没有用户留言</span></div>')
            });
            var d = function(a) {
                $("#J_view_contact_name").each(function() {
                    -1 == a.contact_name.indexOf(a.contact_sex) && (a.contact_name += a.contact_sex), $(this).html(a.contact_name)
                }), $("#J_view_company_name").each(function() {
                    $(this).html(a.company)
                });
                var b = "";
                return 0 == $("#J_view_company_name").length && a.company && (b += "公司：" + a.company + "<br/>"), a.mobile && (b += "手机：" + a.mobile + "<br/>"), a.phone && (b += "电话：" + a.phone + "<br/>"), a.email && (b += "邮箱：" + a.email + "<br/>"), b
            };
            $("#J_G_PPT_getcontact").each(function() {
                var b = $(this);
                b.attr("data-id", a.uid).show(), a.user && ($("#J_contact_ctr").append(d(a.user)), b.find('a[event="click.getcontact"]').remove())
            }), $("#J_G_getcontact").each(function() {
                var b = $(this);
                b.attr("data-id", a.uid).show(), a.user && ($("#J_G_contact").append(d(a.user)), b.remove())
            }), $("#J_G_getzjxmcontact").each(function() {
                var b = $(this);
                b.attr("data-id", a.idk).show(), a.user && ($("#J_G_contact").append(d(a.user)), b.remove())
            })
        },
        d = "page.zjxm.view",
        e = {
            method: d
        },
        f = [];
    return $(".J_ppt_auth_1").each(function() {
        f.push($(this).attr("data-f"))
    }), f.length > 0 && b("dauth", f.join("|")), {
        get_param: a,
        add_param: b,
        method: d,
        callback: c
    }
}), define("page/v6/home_foot", function() {
    seajs.use(["jquery", "module/common/dialog", "module/common/login", "component/jquery.ustore", "page/common"], function(a, b) {
        function c(b) {
            var c = a(".float_left");
            1 == b ? d.stop(!0).animate({
                left: "-2000px"
            }, 1200, function() {
                c.animate({
                    left: "0px"
                }, 500)
            }) : 2 == b ? c.animate({
                left: "-500px"
            }, 500, function() {
                d.stop(!0).animate({
                    left: "0"
                }, 1200).show()
            }) : 3 == b ? (d.stop(!0).animate({
                left: "-2000px"
            }, 0, function() {
                c.animate({
                    left: "0px"
                }, 500)
            }), d.addClass("j-sll-bar").show()) : 4 == b && d.addClass("j-sll-bar").show()
        }
        var d = a("#float-bottom-toolbar");
        if (d.length) {
            try {
                if (window.Trjcn.LoginID) return
            } catch (e) {}
            var f = 1,
                g = new Date,
                h = 0;
            if (USTORE.init(), !USTORE.getValue("login_username")) {
                var i = g.getDate();
                USTORE.getValue("_today") != i && (h = 1), h || c(3), f > 0 && a("#TA-submit").on("click", function() {
                    var c = a(".j-sll-bar .quick-register-tips2"),
                        d = a("#TA-name"),
                        e = a("#TA-mobile"),
                        f = a("#TA-message"),
                        g = d.val(),
                        h = e.val();
                    return (_message = f.val()) ? h && Trjcn.Util.isMobile(h) ? (g = _message, Trjcn.Ajax.post("/api/guest/submit", "type=seo_toolbar&name=" + g + "&message=" + _message + "&mobile=" + h + "&fromurl=" + document.location.href, function(d) {
                        200 == d.code ? (b.dialog_ok("投递成功"), USTORE.setValue("closed_bottom_contact_bar", (new Date).getDate()), a(".j-sll-bar").remove()) : 100 == d.code ? c.text("您已成功提交多次了") : 101 == d.code ? c.text("验证码不正确") : d.data && d.data.message && c.text(d.data.message)
                    }), void 0) : (c.text("请输入您的真实手机号码"), e.focus(), void 0) : (c.text("请输入融资金额"), d.focus(), void 0)
                }), a(window).scroll(function() {
                    var b = a(document).height() / 6;
                    a(window).scrollTop() > b && h && c(4)
                }), a(".close-bottombar").click(function() {
                    USTORE.setValue("_today", i), h = 0, c(1)
                }), a(".float_left").click(function() {
                    h = 0, c(2)
                })
            }
        }
    })
}), define("module/common/invite", function(require, a, b) {
    require("jquery");
    var c = require("module/common/dialog");
    b.exports = {
        dialog: function(a, b, d) {
            require("jquery.form"), c.dialog({
                title: "约谈项目方",
                ajax: {
                    url: "/ajax/invite/dialog",
                    dataType: "html",
                    data: "_=&zjxm_id=" + b + "&user_id=" + a + "&title=" + d,
                    callback: function(a, b) {
                        b.content(a), b.title("填写约谈意向"), window.dl = b, $("#J_dialog_close").click(function() {
                            window.dl.close().remove()
                        }), $("#J_btn_continue_invite").click(function() {
                            $("#J_hasinvite_msg").hide().next().show()
                        });
                        var d = !1;
                        $("#J_btn_send_invite").click(function() {
                            if (!d) {
                                d = !0;
                                var a = $("#J_invite_frm").formSerialize();
                                $.ajax({
                                    url: "/ajax/invite/save",
                                    type: "POST",
                                    dataType: "json",
                                    data: a,
                                    success: function(a) {
                                        d = !1, 200 == a.code && (b.remove(), c.dialog({
                                            content: a.data.msg,
                                            ok: !0
                                        }))
                                    }
                                })
                            }
                        })
                    }
                }
            })
        },
        dialog_guest: function(a, b) {
            require("page/common"), require("jquery.form"), c.close(), c.dialog({
                title: "约谈项目方",
                width: "600px",
                onclose: function() {
                    $("#J_upload_file").each(function() {
                        $(this).uploadify("destroy")
                    })
                },
                ajax: {
                    url: "/ajax/deliver_guest/dialog",
                    dataType: "html",
                    data: "_=&zjxm_id=" + b + "&user_id=" + a,
                    callback: function(a, b) {
                        b.content(a), window.dl = b, $("#J_dialog_close").click(function() {
                            try {
                                window.dl.close().remove()
                            } catch (a) {}
                        });
                        var d = new formValidator;
                        d.init("J_deliver_frm"), d.errtip = function(a, b, c) {
                            if (a) {
                                switch (b = c === !0 ? languages[b] || "" : languages[b] || b, a.attr("name")) {
                                    case "invite_title":
                                        b = "请输入项目标题.";
                                        break;
                                    case "invite_content":
                                        b = "请简单介绍项目情况、项目优势及融资用途。字数20-500之间.";
                                        break;
                                    case "contact_name":
                                        b = "请输入联系人.";
                                        break;
                                    case "mobile":
                                        b || (b = "请输入手机号码.");
                                        break;
                                    case "mobilecode":
                                        b = "请输入验证码.";
                                        break;
                                    case "feed_zjxm_id":
                                        b = "请选择项目."
                                }
                                return a.nextAll(".part-fieldset-msg").html('<em class="ui-text-red"><i class="icoErr16"></i>' + b + "</em>"), !1
                            }
                        }, d.tip = function(a) {
                            a.nextAll(".part-fieldset-msg").html("")
                        };
                        var e = !1;
                        $("#J_btn_send_guest").click(function() {
                            if (!d.isValid() && !e) {
                                e = !0;
                                var a = $("#J_deliver_frm").formSerialize();
                                $.ajax({
                                    url: "/ajax/deliver_guest/save",
                                    type: "POST",
                                    dataType: "json",
                                    data: a,
                                    success: function(a) {
                                        if (e = !1, 200 == a.code) {
                                            if (a.data.forward_url) return location.href = a.data.forward_url, void 0;
                                            try {
                                                window.dl.close().remove()
                                            } catch (b) {}
                                            c.dialog_ok(a.data.msg)
                                        } else $("#J_deliver_msg").html('<em class="ui-text-red"><i class="icoErr16"></i>' + a.data.msg + "</em>").show()
                                    }
                                })
                            }
                        })
                    }
                }
            })
        },
        run: function() {
            $("a.J_btn_dl_invite").click(function() {
                if (!window.Trjcn.LoginID) {
                    var a = require("module/common/login");
                    return a.dialog(), void 0
                }
                var c = parseInt($(this).attr("data-user-id")),
                    d = $(this).attr("data-zjxm-id") || 0,
                    e = $(this).attr("data-title") || "";
                c > 0 ? b.exports.dialog(c, d, e) : b.exports.dialog_guest(c, d)
            }).removeClass("J_btn_dl_invite")
        }
    }, b.exports.run()
});
var swfobject = function() {
        function a() {
            if (!R) {
                try {
                    var a = K.getElementsByTagName("body")[0].appendChild(q("span"));
                    a.parentNode.removeChild(a)
                } catch (b) {
                    return
                }
                R = !0;
                for (var c = N.length, d = 0; c > d; d++) N[d]()
            }
        }

        function b(a) {
            R ? a() : N[N.length] = a
        }

        function c(a) {
            if (typeof J.addEventListener != C) J.addEventListener("load", a, !1);
            else if (typeof K.addEventListener != C) K.addEventListener("load", a, !1);
            else if (typeof J.attachEvent != C) r(J, "onload", a);
            else if ("function" == typeof J.onload) {
                var b = J.onload;
                J.onload = function() {
                    b(), a()
                }
            } else J.onload = a
        }

        function d() {
            M ? e() : f()
        }

        function e() {
            var a = K.getElementsByTagName("body")[0],
                b = q(D);
            b.setAttribute("type", G);
            var c = a.appendChild(b);
            if (c) {
                var d = 0;
                ! function() {
                    if (typeof c.GetVariable != C) {
                        var e = c.GetVariable("$version");
                        e && (e = e.split(" ")[1].split(","), U.pv = [parseInt(e[0], 10), parseInt(e[1], 10), parseInt(e[2], 10)])
                    } else if (10 > d) return d++, setTimeout(arguments.callee, 10), void 0;
                    a.removeChild(b), c = null, f()
                }()
            } else f()
        }

        function f() {
            var a = O.length;
            if (a > 0)
                for (var b = 0; a > b; b++) {
                    var c = O[b].id,
                        d = O[b].callbackFn,
                        e = {
                            success: !1,
                            id: c
                        };
                    if (U.pv[0] > 0) {
                        var f = p(c);
                        if (f)
                            if (!s(O[b].swfVersion) || U.wk && U.wk < 312)
                                if (O[b].expressInstall && h()) {
                                    var k = {};
                                    k.data = O[b].expressInstall, k.width = f.getAttribute("width") || "0", k.height = f.getAttribute("height") || "0", f.getAttribute("class") && (k.styleclass = f.getAttribute("class")), f.getAttribute("align") && (k.align = f.getAttribute("align"));
                                    for (var l = {}, m = f.getElementsByTagName("param"), n = m.length, o = 0; n > o; o++) "movie" != m[o].getAttribute("name").toLowerCase() && (l[m[o].getAttribute("name")] = m[o].getAttribute("value"));
                                    i(k, l, c, d)
                                } else j(f), d && d(e);
                        else u(c, !0), d && (e.success = !0, e.ref = g(c), d(e))
                    } else if (u(c, !0), d) {
                        var q = g(c);
                        q && typeof q.SetVariable != C && (e.success = !0, e.ref = q), d(e)
                    }
                }
        }

        function g(a) {
            var b = null,
                c = p(a);
            if (c && "OBJECT" == c.nodeName)
                if (typeof c.SetVariable != C) b = c;
                else {
                    var d = c.getElementsByTagName(D)[0];
                    d && (b = d)
                }
            return b
        }

        function h() {
            return !S && s("6.0.65") && (U.win || U.mac) && !(U.wk && U.wk < 312)
        }

        function i(a, b, c, d) {
            S = !0, y = d || null, z = {
                success: !1,
                id: c
            };
            var e = p(c);
            if (e) {
                "OBJECT" == e.nodeName ? (w = k(e), x = null) : (w = e, x = c), a.id = H, (typeof a.width == C || !/%$/.test(a.width) && parseInt(a.width, 10) < 310) && (a.width = "310"), (typeof a.height == C || !/%$/.test(a.height) && parseInt(a.height, 10) < 137) && (a.height = "137"), K.title = K.title.slice(0, 47) + " - Flash Player Installation";
                var f = U.ie && U.win ? "ActiveX" : "PlugIn",
                    g = "MMredirectURL=" + J.location.toString().replace(/&/g, "%26") + "&MMplayerType=" + f + "&MMdoctitle=" + K.title;
                if (typeof b.flashvars != C ? b.flashvars += "&" + g : b.flashvars = g, U.ie && U.win && 4 != e.readyState) {
                    var h = q("div");
                    c += "SWFObjectNew", h.setAttribute("id", c), e.parentNode.insertBefore(h, e), e.style.display = "none",
                        function() {
                            4 == e.readyState ? e.parentNode.removeChild(e) : setTimeout(arguments.callee, 10)
                        }()
                }
                l(a, b, c)
            }
        }

        function j(a) {
            if (U.ie && U.win && 4 != a.readyState) {
                var b = q("div");
                a.parentNode.insertBefore(b, a), b.parentNode.replaceChild(k(a), b), a.style.display = "none",
                    function() {
                        4 == a.readyState ? a.parentNode.removeChild(a) : setTimeout(arguments.callee, 10)
                    }()
            } else a.parentNode.replaceChild(k(a), a)
        }

        function k(a) {
            var b = q("div");
            if (U.win && U.ie) b.innerHTML = a.innerHTML;
            else {
                var c = a.getElementsByTagName(D)[0];
                if (c) {
                    var d = c.childNodes;
                    if (d)
                        for (var e = d.length, f = 0; e > f; f++) 1 == d[f].nodeType && "PARAM" == d[f].nodeName || 8 == d[f].nodeType || b.appendChild(d[f].cloneNode(!0))
                }
            }
            return b
        }

        function l(a, b, c) {
            var d, e = p(c);
            if (U.wk && U.wk < 312) return d;
            if (e)
                if (typeof a.id == C && (a.id = c), U.ie && U.win) {
                    var f = "";
                    for (var g in a) a[g] != Object.prototype[g] && ("data" == g.toLowerCase() ? b.movie = a[g] : "styleclass" == g.toLowerCase() ? f += ' class="' + a[g] + '"' : "classid" != g.toLowerCase() && (f += " " + g + '="' + a[g] + '"'));
                    var h = "";
                    for (var i in b) b[i] != Object.prototype[i] && (h += '<param name="' + i + '" value="' + b[i] + '" />');
                    e.outerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"' + f + ">" + h + "</object>", P[P.length] = a.id, d = p(a.id)
                } else {
                    var j = q(D);
                    j.setAttribute("type", G);
                    for (var k in a) a[k] != Object.prototype[k] && ("styleclass" == k.toLowerCase() ? j.setAttribute("class", a[k]) : "classid" != k.toLowerCase() && j.setAttribute(k, a[k]));
                    for (var l in b) b[l] != Object.prototype[l] && "movie" != l.toLowerCase() && m(j, l, b[l]);
                    e.parentNode.replaceChild(j, e), d = j
                }
            return d
        }

        function m(a, b, c) {
            var d = q("param");
            d.setAttribute("name", b), d.setAttribute("value", c), a.appendChild(d)
        }

        function n(a) {
            var b = p(a);
            b && "OBJECT" == b.nodeName && (U.ie && U.win ? (b.style.display = "none", function() {
                4 == b.readyState ? o(a) : setTimeout(arguments.callee, 10)
            }()) : b.parentNode.removeChild(b))
        }

        function o(a) {
            var b = p(a);
            if (b) {
                for (var c in b) "function" == typeof b[c] && (b[c] = null);
                b.parentNode.removeChild(b)
            }
        }

        function p(a) {
            var b = null;
            try {
                b = K.getElementById(a)
            } catch (c) {}
            return b
        }

        function q(a) {
            return K.createElement(a)
        }

        function r(a, b, c) {
            a.attachEvent(b, c), Q[Q.length] = [a, b, c]
        }

        function s(a) {
            var b = U.pv,
                c = a.split(".");
            return c[0] = parseInt(c[0], 10), c[1] = parseInt(c[1], 10) || 0, c[2] = parseInt(c[2], 10) || 0, b[0] > c[0] || b[0] == c[0] && b[1] > c[1] || b[0] == c[0] && b[1] == c[1] && b[2] >= c[2] ? !0 : !1
        }

        function t(a, b, c, d) {
            if (!U.ie || !U.mac) {
                var e = K.getElementsByTagName("head")[0];
                if (e) {
                    var f = c && "string" == typeof c ? c : "screen";
                    if (d && (A = null, B = null), !A || B != f) {
                        var g = q("style");
                        g.setAttribute("type", "text/css"), g.setAttribute("media", f), A = e.appendChild(g), U.ie && U.win && typeof K.styleSheets != C && K.styleSheets.length > 0 && (A = K.styleSheets[K.styleSheets.length - 1]), B = f
                    }
                    U.ie && U.win ? A && typeof A.addRule == D && A.addRule(a, b) : A && typeof K.createTextNode != C && A.appendChild(K.createTextNode(a + " {" + b + "}"))
                }
            }
        }

        function u(a, b) {
            if (T) {
                var c = b ? "visible" : "hidden";
                R && p(a) ? p(a).style.visibility = c : t("#" + a, "visibility:" + c)
            }
        }

        function v(a) {
            var b = /[\\\"<>\.;]/,
                c = null != b.exec(a);
            return c && typeof encodeURIComponent != C ? encodeURIComponent(a) : a
        }
        var w, x, y, z, A, B, C = "undefined",
            D = "object",
            E = "Shockwave Flash",
            F = "ShockwaveFlash.ShockwaveFlash",
            G = "application/x-shockwave-flash",
            H = "SWFObjectExprInst",
            I = "onreadystatechange",
            J = window,
            K = document,
            L = navigator,
            M = !1,
            N = [d],
            O = [],
            P = [],
            Q = [],
            R = !1,
            S = !1,
            T = !0,
            U = function() {
                var a = typeof K.getElementById != C && typeof K.getElementsByTagName != C && typeof K.createElement != C,
                    b = L.userAgent.toLowerCase(),
                    c = L.platform.toLowerCase(),
                    d = c ? /win/.test(c) : /win/.test(b),
                    e = c ? /mac/.test(c) : /mac/.test(b),
                    f = /webkit/.test(b) ? parseFloat(b.replace(/^.*webkit\/(\d+(\.\d+)?).*$/, "$1")) : !1,
                    g = !1,
                    h = [0, 0, 0],
                    i = null;
                if (typeof L.plugins != C && typeof L.plugins[E] == D) i = L.plugins[E].description, !i || typeof L.mimeTypes != C && L.mimeTypes[G] && !L.mimeTypes[G].enabledPlugin || (M = !0, g = !1, i = i.replace(/^.*\s+(\S+\s+\S+$)/, "$1"), h[0] = parseInt(i.replace(/^(.*)\..*$/, "$1"), 10), h[1] = parseInt(i.replace(/^.*\.(.*)\s.*$/, "$1"), 10), h[2] = /[a-zA-Z]/.test(i) ? parseInt(i.replace(/^.*[a-zA-Z]+(.*)$/, "$1"), 10) : 0);
                else if (typeof J.ActiveXObject != C) try {
                    var j = new ActiveXObject(F);
                    j && (i = j.GetVariable("$version"), i && (g = !0, i = i.split(" ")[1].split(","), h = [parseInt(i[0], 10), parseInt(i[1], 10), parseInt(i[2], 10)]))
                } catch (k) {}
                return {
                    w3: a,
                    pv: h,
                    wk: f,
                    ie: g,
                    win: d,
                    mac: e
                }
            }();
        return function() {
                U.w3 && ((typeof K.readyState != C && "complete" == K.readyState || typeof K.readyState == C && (K.getElementsByTagName("body")[0] || K.body)) && a(), R || (typeof K.addEventListener != C && K.addEventListener("DOMContentLoaded", a, !1), U.ie && U.win && (K.attachEvent(I, function() {
                    "complete" == K.readyState && (K.detachEvent(I, arguments.callee), a())
                }), J == top && function() {
                    if (!R) {
                        try {
                            K.documentElement.doScroll("left")
                        } catch (b) {
                            return setTimeout(arguments.callee, 0), void 0
                        }
                        a()
                    }
                }()), U.wk && function() {
                    return R ? void 0 : /loaded|complete/.test(K.readyState) ? (a(), void 0) : (setTimeout(arguments.callee, 0), void 0)
                }(), c(a)))
            }(),
            function() {
                U.ie && U.win && window.attachEvent("onunload", function() {
                    for (var a = Q.length, b = 0; a > b; b++) Q[b][0].detachEvent(Q[b][1], Q[b][2]);
                    for (var c = P.length, d = 0; c > d; d++) n(P[d]);
                    for (var e in U) U[e] = null;
                    U = null;
                    for (var f in swfobject) swfobject[f] = null;
                    swfobject = null
                })
            }(), {
                registerObject: function(a, b, c, d) {
                    if (U.w3 && a && b) {
                        var e = {};
                        e.id = a, e.swfVersion = b, e.expressInstall = c, e.callbackFn = d, O[O.length] = e, u(a, !1)
                    } else d && d({
                        success: !1,
                        id: a
                    })
                },
                getObjectById: function(a) {
                    return U.w3 ? g(a) : void 0
                },
                embedSWF: function(a, c, d, e, f, g, j, k, m, n) {
                    var o = {
                        success: !1,
                        id: c
                    };
                    U.w3 && !(U.wk && U.wk < 312) && a && c && d && e && f ? (u(c, !1), b(function() {
                        d += "", e += "";
                        var b = {};
                        if (m && typeof m === D)
                            for (var p in m) b[p] = m[p];
                        b.data = a, b.width = d, b.height = e;
                        var q = {};
                        if (k && typeof k === D)
                            for (var r in k) q[r] = k[r];
                        if (j && typeof j === D)
                            for (var t in j) typeof q.flashvars != C ? q.flashvars += "&" + t + "=" + j[t] : q.flashvars = t + "=" + j[t];
                        if (s(f)) {
                            var v = l(b, q, c);
                            b.id == c && u(c, !0), o.success = !0, o.ref = v
                        } else {
                            if (g && h()) return b.data = g, i(b, q, c, n), void 0;
                            u(c, !0)
                        }
                        n && n(o)
                    })) : n && n(o)
                },
                switchOffAutoHideShow: function() {
                    T = !1
                },
                ua: U,
                getFlashPlayerVersion: function() {
                    return {
                        major: U.pv[0],
                        minor: U.pv[1],
                        release: U.pv[2]
                    }
                },
                hasFlashPlayerVersion: s,
                createSWF: function(a, b, c) {
                    return U.w3 ? l(a, b, c) : void 0
                },
                showExpressInstall: function(a, b, c, d) {
                    U.w3 && h() && i(a, b, c, d)
                },
                removeSWF: function(a) {
                    U.w3 && n(a)
                },
                createCSS: function(a, b, c, d) {
                    U.w3 && t(a, b, c, d)
                },
                addDomLoadEvent: b,
                addLoadEvent: c,
                getQueryParamValue: function(a) {
                    var b = K.location.search || K.location.hash;
                    if (b) {
                        if (/\?/.test(b) && (b = b.split("?")[1]), null == a) return v(b);
                        for (var c = b.split("&"), d = 0; d < c.length; d++)
                            if (c[d].substring(0, c[d].indexOf("=")) == a) return v(c[d].substring(c[d].indexOf("=") + 1))
                    }
                    return ""
                },
                expressInstallCallback: function() {
                    if (S) {
                        var a = p(H);
                        a && w && (a.parentNode.replaceChild(w, a), x && (u(x, !0), U.ie && U.win && (w.style.display = "block")), y && y(z)), S = !1
                    }
                }
            }
    }(),
    SWFUpload;
void 0 == SWFUpload && (SWFUpload = function(a) {
        this.initSWFUpload(a)
    }), SWFUpload.prototype.initSWFUpload = function(a) {
        try {
            this.customSettings = {}, this.settings = a, this.eventQueue = [], this.movieName = "SWFUpload_" + SWFUpload.movieCount++, this.movieElement = null, SWFUpload.instances[this.movieName] = this, this.initSettings(), this.loadFlash(), this.displayDebugInfo()
        } catch (b) {
            throw delete SWFUpload.instances[this.movieName], b
        }
    }, SWFUpload.instances = {}, SWFUpload.movieCount = 0, SWFUpload.version = "2.2.0 2009-03-25", SWFUpload.QUEUE_ERROR = {
        QUEUE_LIMIT_EXCEEDED: -100,
        FILE_EXCEEDS_SIZE_LIMIT: -110,
        ZERO_BYTE_FILE: -120,
        INVALID_FILETYPE: -130
    }, SWFUpload.UPLOAD_ERROR = {
        HTTP_ERROR: -200,
        MISSING_UPLOAD_URL: -210,
        IO_ERROR: -220,
        SECURITY_ERROR: -230,
        UPLOAD_LIMIT_EXCEEDED: -240,
        UPLOAD_FAILED: -250,
        SPECIFIED_FILE_ID_NOT_FOUND: -260,
        FILE_VALIDATION_FAILED: -270,
        FILE_CANCELLED: -280,
        UPLOAD_STOPPED: -290
    }, SWFUpload.FILE_STATUS = {
        QUEUED: -1,
        IN_PROGRESS: -2,
        ERROR: -3,
        COMPLETE: -4,
        CANCELLED: -5
    }, SWFUpload.BUTTON_ACTION = {
        SELECT_FILE: -100,
        SELECT_FILES: -110,
        START_UPLOAD: -120
    }, SWFUpload.CURSOR = {
        ARROW: -1,
        HAND: -2
    }, SWFUpload.WINDOW_MODE = {
        WINDOW: "window",
        TRANSPARENT: "transparent",
        OPAQUE: "opaque"
    }, SWFUpload.completeURL = function(a) {
        if ("string" != typeof a || a.match(/^https?:\/\//i) || a.match(/^\//)) return a;
        window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "");
        var b = window.location.pathname.lastIndexOf("/");
        return path = 0 >= b ? "/" : window.location.pathname.substr(0, b) + "/", path + a
    }, SWFUpload.prototype.initSettings = function() {
        this.ensureDefault = function(a, b) {
            this.settings[a] = void 0 == this.settings[a] ? b : this.settings[a]
        }, this.ensureDefault("upload_url", ""), this.ensureDefault("preserve_relative_urls", !1), this.ensureDefault("file_post_name", "Filedata"), this.ensureDefault("post_params", {}), this.ensureDefault("use_query_string", !1), this.ensureDefault("requeue_on_error", !1), this.ensureDefault("http_success", []), this.ensureDefault("assume_success_timeout", 0), this.ensureDefault("file_types", "*.*"), this.ensureDefault("file_types_description", "All Files"), this.ensureDefault("file_size_limit", 0), this.ensureDefault("file_upload_limit", 0), this.ensureDefault("file_queue_limit", 0), this.ensureDefault("flash_url", "swfupload.swf"), this.ensureDefault("prevent_swf_caching", !0), this.ensureDefault("button_image_url", ""), this.ensureDefault("button_width", 1), this.ensureDefault("button_height", 1), this.ensureDefault("button_text", ""), this.ensureDefault("button_text_style", "color: #000000; font-size: 16pt;"), this.ensureDefault("button_text_top_padding", 0), this.ensureDefault("button_text_left_padding", 0), this.ensureDefault("button_action", SWFUpload.BUTTON_ACTION.SELECT_FILES), this.ensureDefault("button_disabled", !1), this.ensureDefault("button_placeholder_id", ""), this.ensureDefault("button_placeholder", null), this.ensureDefault("button_cursor", SWFUpload.CURSOR.ARROW), this.ensureDefault("button_window_mode", SWFUpload.WINDOW_MODE.WINDOW), this.ensureDefault("debug", !1), this.settings.debug_enabled = this.settings.debug, this.settings.return_upload_start_handler = this.returnUploadStart, this.ensureDefault("swfupload_loaded_handler", null), this.ensureDefault("file_dialog_start_handler", null), this.ensureDefault("file_queued_handler", null), this.ensureDefault("file_queue_error_handler", null), this.ensureDefault("file_dialog_complete_handler", null), this.ensureDefault("upload_start_handler", null), this.ensureDefault("upload_progress_handler", null), this.ensureDefault("upload_error_handler", null), this.ensureDefault("upload_success_handler", null), this.ensureDefault("upload_complete_handler", null), this.ensureDefault("debug_handler", this.debugMessage), this.ensureDefault("custom_settings", {}), this.customSettings = this.settings.custom_settings, this.settings.prevent_swf_caching && (this.settings.flash_url = this.settings.flash_url + (this.settings.flash_url.indexOf("?") < 0 ? "?" : "&") + "preventswfcaching=" + (new Date).getTime()), this.settings.preserve_relative_urls || (this.settings.upload_url = SWFUpload.completeURL(this.settings.upload_url), "" != this.settings.button_image_url && (this.settings.button_image_url = SWFUpload.completeURL(this.settings.button_image_url))), delete this.ensureDefault
    }, SWFUpload.prototype.loadFlash = function() {
        var a, b;
        if (null !== document.getElementById(this.movieName)) throw "ID " + this.movieName + " is already in use. The Flash Object could not be added";
        if (a = document.getElementById(this.settings.button_placeholder_id) || this.settings.button_placeholder, void 0 == a) throw "Could not find the placeholder element: " + this.settings.button_placeholder_id;
        b = document.createElement("div"), b.innerHTML = this.getFlashHTML(), a.parentNode.replaceChild(b.firstChild, a), void 0 == window[this.movieName] && (window[this.movieName] = this.getMovieElement())
    }, SWFUpload.prototype.getFlashHTML = function() {
        return ['<object id="', this.movieName, '" type="application/x-shockwave-flash" data="', this.settings.flash_url, '" width="', this.settings.button_width, '" height="', this.settings.button_height, '" class="swfupload">', '<param name="wmode" value="', this.settings.button_window_mode, '" />', '<param name="movie" value="', this.settings.flash_url, '" />', '<param name="quality" value="high" />', '<param name="menu" value="false" />', '<param name="allowScriptAccess" value="always" />', '<param name="flashvars" value="' + this.getFlashVars() + '" />', "</object>"].join("")
    }, SWFUpload.prototype.getFlashVars = function() {
        var a = this.buildParamString(),
            b = this.settings.http_success.join(",");
        return ["movieName=", encodeURIComponent(this.movieName), "&amp;uploadURL=", encodeURIComponent(this.settings.upload_url), "&amp;useQueryString=", encodeURIComponent(this.settings.use_query_string), "&amp;requeueOnError=", encodeURIComponent(this.settings.requeue_on_error), "&amp;httpSuccess=", encodeURIComponent(b), "&amp;assumeSuccessTimeout=", encodeURIComponent(this.settings.assume_success_timeout), "&amp;params=", encodeURIComponent(a), "&amp;filePostName=", encodeURIComponent(this.settings.file_post_name), "&amp;fileTypes=", encodeURIComponent(this.settings.file_types), "&amp;fileTypesDescription=", encodeURIComponent(this.settings.file_types_description), "&amp;fileSizeLimit=", encodeURIComponent(this.settings.file_size_limit), "&amp;fileUploadLimit=", encodeURIComponent(this.settings.file_upload_limit), "&amp;fileQueueLimit=", encodeURIComponent(this.settings.file_queue_limit), "&amp;debugEnabled=", encodeURIComponent(this.settings.debug_enabled), "&amp;buttonImageURL=", encodeURIComponent(this.settings.button_image_url), "&amp;buttonWidth=", encodeURIComponent(this.settings.button_width), "&amp;buttonHeight=", encodeURIComponent(this.settings.button_height), "&amp;buttonText=", encodeURIComponent(this.settings.button_text), "&amp;buttonTextTopPadding=", encodeURIComponent(this.settings.button_text_top_padding), "&amp;buttonTextLeftPadding=", encodeURIComponent(this.settings.button_text_left_padding), "&amp;buttonTextStyle=", encodeURIComponent(this.settings.button_text_style), "&amp;buttonAction=", encodeURIComponent(this.settings.button_action), "&amp;buttonDisabled=", encodeURIComponent(this.settings.button_disabled), "&amp;buttonCursor=", encodeURIComponent(this.settings.button_cursor)].join("")
    }, SWFUpload.prototype.getMovieElement = function() {
        if (void 0 == this.movieElement && (this.movieElement = document.getElementById(this.movieName)), null === this.movieElement) throw "Could not find Flash element";
        return this.movieElement
    }, SWFUpload.prototype.buildParamString = function() {
        var a = this.settings.post_params,
            b = [];
        if ("object" == typeof a)
            for (var c in a) a.hasOwnProperty(c) && b.push(encodeURIComponent(c.toString()) + "=" + encodeURIComponent(a[c].toString()));
        return b.join("&amp;")
    }, SWFUpload.prototype.destroy = function() {
        try {
            this.cancelUpload(null, !1);
            var a = null;
            if (a = this.getMovieElement(), a && "unknown" == typeof a.CallFunction) {
                for (var b in a) try {
                    "function" == typeof a[b] && (a[b] = null)
                } catch (c) {}
                try {
                    a.parentNode.removeChild(a)
                } catch (d) {}
            }
            return window[this.movieName] = null, SWFUpload.instances[this.movieName] = null, delete SWFUpload.instances[this.movieName], this.movieElement = null, this.settings = null, this.customSettings = null, this.eventQueue = null, this.movieName = null, !0
        } catch (e) {
            return !1
        }
    }, SWFUpload.prototype.displayDebugInfo = function() {
        this.debug(["---SWFUpload Instance Info---\n", "Version: ", SWFUpload.version, "\n", "Movie Name: ", this.movieName, "\n", "Settings:\n", "	", "upload_url:               ", this.settings.upload_url, "\n", "	", "flash_url:                ", this.settings.flash_url, "\n", "	", "use_query_string:         ", this.settings.use_query_string.toString(), "\n", "	", "requeue_on_error:         ", this.settings.requeue_on_error.toString(), "\n", "	", "http_success:             ", this.settings.http_success.join(", "), "\n", "	", "assume_success_timeout:   ", this.settings.assume_success_timeout, "\n", "	", "file_post_name:           ", this.settings.file_post_name, "\n", "	", "post_params:              ", this.settings.post_params.toString(), "\n", "	", "file_types:               ", this.settings.file_types, "\n", "	", "file_types_description:   ", this.settings.file_types_description, "\n", "	", "file_size_limit:          ", this.settings.file_size_limit, "\n", "	", "file_upload_limit:        ", this.settings.file_upload_limit, "\n", "	", "file_queue_limit:         ", this.settings.file_queue_limit, "\n", "	", "debug:                    ", this.settings.debug.toString(), "\n", "	", "prevent_swf_caching:      ", this.settings.prevent_swf_caching.toString(), "\n", "	", "button_placeholder_id:    ", this.settings.button_placeholder_id.toString(), "\n", "	", "button_placeholder:       ", this.settings.button_placeholder ? "Set" : "Not Set", "\n", "	", "button_image_url:         ", this.settings.button_image_url.toString(), "\n", "	", "button_width:             ", this.settings.button_width.toString(), "\n", "	", "button_height:            ", this.settings.button_height.toString(), "\n", "	", "button_text:              ", this.settings.button_text.toString(), "\n", "	", "button_text_style:        ", this.settings.button_text_style.toString(), "\n", "	", "button_text_top_padding:  ", this.settings.button_text_top_padding.toString(), "\n", "	", "button_text_left_padding: ", this.settings.button_text_left_padding.toString(), "\n", "	", "button_action:            ", this.settings.button_action.toString(), "\n", "	", "button_disabled:          ", this.settings.button_disabled.toString(), "\n", "	", "custom_settings:          ", this.settings.custom_settings.toString(), "\n", "Event Handlers:\n", "	", "swfupload_loaded_handler assigned:  ", ("function" == typeof this.settings.swfupload_loaded_handler).toString(), "\n", "	", "file_dialog_start_handler assigned: ", ("function" == typeof this.settings.file_dialog_start_handler).toString(), "\n", "	", "file_queued_handler assigned:       ", ("function" == typeof this.settings.file_queued_handler).toString(), "\n", "	", "file_queue_error_handler assigned:  ", ("function" == typeof this.settings.file_queue_error_handler).toString(), "\n", "	", "upload_start_handler assigned:      ", ("function" == typeof this.settings.upload_start_handler).toString(), "\n", "	", "upload_progress_handler assigned:   ", ("function" == typeof this.settings.upload_progress_handler).toString(), "\n", "	", "upload_error_handler assigned:      ", ("function" == typeof this.settings.upload_error_handler).toString(), "\n", "	", "upload_success_handler assigned:    ", ("function" == typeof this.settings.upload_success_handler).toString(), "\n", "	", "upload_complete_handler assigned:   ", ("function" == typeof this.settings.upload_complete_handler).toString(), "\n", "	", "debug_handler assigned:             ", ("function" == typeof this.settings.debug_handler).toString(), "\n"].join(""))
    }, SWFUpload.prototype.addSetting = function(a, b, c) {
        return this.settings[a] = void 0 == b ? c : b
    }, SWFUpload.prototype.getSetting = function(a) {
        return void 0 != this.settings[a] ? this.settings[a] : ""
    }, SWFUpload.prototype.callFlash = function(functionName, argumentArray) {
        argumentArray = argumentArray || [];
        var movieElement = this.getMovieElement(),
            returnValue, returnString;
        try {
            returnString = movieElement.CallFunction('<invoke name="' + functionName + '" returntype="javascript">' + __flash__argumentsToXML(argumentArray, 0) + "</invoke>"), returnValue = eval(returnString)
        } catch (ex) {
            throw "Call to " + functionName + " failed"
        }
        return void 0 != returnValue && "object" == typeof returnValue.post && (returnValue = this.unescapeFilePostParams(returnValue)), returnValue
    }, SWFUpload.prototype.selectFile = function() {
        this.callFlash("SelectFile")
    }, SWFUpload.prototype.selectFiles = function() {
        this.callFlash("SelectFiles")
    }, SWFUpload.prototype.startUpload = function(a) {
        this.callFlash("StartUpload", [a])
    }, SWFUpload.prototype.cancelUpload = function(a, b) {
        b !== !1 && (b = !0), this.callFlash("CancelUpload", [a, b])
    }, SWFUpload.prototype.stopUpload = function() {
        this.callFlash("StopUpload")
    }, SWFUpload.prototype.getStats = function() {
        return this.callFlash("GetStats")
    }, SWFUpload.prototype.setStats = function(a) {
        this.callFlash("SetStats", [a])
    }, SWFUpload.prototype.getFile = function(a) {
        return "number" == typeof a ? this.callFlash("GetFileByIndex", [a]) : this.callFlash("GetFile", [a])
    }, SWFUpload.prototype.addFileParam = function(a, b, c) {
        return this.callFlash("AddFileParam", [a, b, c])
    }, SWFUpload.prototype.removeFileParam = function(a, b) {
        this.callFlash("RemoveFileParam", [a, b])
    }, SWFUpload.prototype.setUploadURL = function(a) {
        this.settings.upload_url = a.toString(), this.callFlash("SetUploadURL", [a])
    }, SWFUpload.prototype.setPostParams = function(a) {
        this.settings.post_params = a, this.callFlash("SetPostParams", [a])
    }, SWFUpload.prototype.addPostParam = function(a, b) {
        this.settings.post_params[a] = b, this.callFlash("SetPostParams", [this.settings.post_params])
    }, SWFUpload.prototype.removePostParam = function(a) {
        delete this.settings.post_params[a], this.callFlash("SetPostParams", [this.settings.post_params])
    }, SWFUpload.prototype.setFileTypes = function(a, b) {
        this.settings.file_types = a, this.settings.file_types_description = b, this.callFlash("SetFileTypes", [a, b])
    }, SWFUpload.prototype.setFileSizeLimit = function(a) {
        this.settings.file_size_limit = a, this.callFlash("SetFileSizeLimit", [a])
    }, SWFUpload.prototype.setFileUploadLimit = function(a) {
        this.settings.file_upload_limit = a, this.callFlash("SetFileUploadLimit", [a])
    }, SWFUpload.prototype.setFileQueueLimit = function(a) {
        this.settings.file_queue_limit = a, this.callFlash("SetFileQueueLimit", [a])
    }, SWFUpload.prototype.setFilePostName = function(a) {
        this.settings.file_post_name = a, this.callFlash("SetFilePostName", [a])
    }, SWFUpload.prototype.setUseQueryString = function(a) {
        this.settings.use_query_string = a, this.callFlash("SetUseQueryString", [a])
    }, SWFUpload.prototype.setRequeueOnError = function(a) {
        this.settings.requeue_on_error = a, this.callFlash("SetRequeueOnError", [a])
    }, SWFUpload.prototype.setHTTPSuccess = function(a) {
        "string" == typeof a && (a = a.replace(" ", "").split(",")), this.settings.http_success = a, this.callFlash("SetHTTPSuccess", [a])
    }, SWFUpload.prototype.setAssumeSuccessTimeout = function(a) {
        this.settings.assume_success_timeout = a, this.callFlash("SetAssumeSuccessTimeout", [a])
    }, SWFUpload.prototype.setDebugEnabled = function(a) {
        this.settings.debug_enabled = a, this.callFlash("SetDebugEnabled", [a])
    }, SWFUpload.prototype.setButtonImageURL = function(a) {
        void 0 == a && (a = ""), this.settings.button_image_url = a, this.callFlash("SetButtonImageURL", [a])
    }, SWFUpload.prototype.setButtonDimensions = function(a, b) {
        this.settings.button_width = a, this.settings.button_height = b;
        var c = this.getMovieElement();
        void 0 != c && (c.style.width = a + "px", c.style.height = b + "px"), this.callFlash("SetButtonDimensions", [a, b])
    }, SWFUpload.prototype.setButtonText = function(a) {
        this.settings.button_text = a, this.callFlash("SetButtonText", [a])
    }, SWFUpload.prototype.setButtonTextPadding = function(a, b) {
        this.settings.button_text_top_padding = b, this.settings.button_text_left_padding = a, this.callFlash("SetButtonTextPadding", [a, b])
    }, SWFUpload.prototype.setButtonTextStyle = function(a) {
        this.settings.button_text_style = a, this.callFlash("SetButtonTextStyle", [a])
    }, SWFUpload.prototype.setButtonDisabled = function(a) {
        this.settings.button_disabled = a, this.callFlash("SetButtonDisabled", [a])
    }, SWFUpload.prototype.setButtonAction = function(a) {
        this.settings.button_action = a, this.callFlash("SetButtonAction", [a])
    }, SWFUpload.prototype.setButtonCursor = function(a) {
        this.settings.button_cursor = a, this.callFlash("SetButtonCursor", [a])
    }, SWFUpload.prototype.queueEvent = function(a, b) {
        void 0 == b ? b = [] : b instanceof Array || (b = [b]);
        var c = this;
        if ("function" == typeof this.settings[a]) this.eventQueue.push(function() {
            this.settings[a].apply(this, b)
        }), setTimeout(function() {
            c.executeNextEvent()
        }, 0);
        else if (null !== this.settings[a]) throw "Event handler " + a + " is unknown or is not a function"
    }, SWFUpload.prototype.executeNextEvent = function() {
        var a = this.eventQueue ? this.eventQueue.shift() : null;
        "function" == typeof a && a.apply(this)
    }, SWFUpload.prototype.unescapeFilePostParams = function(a) {
        var b, c = /[$]([0-9a-f]{4})/i,
            d = {};
        if (void 0 != a) {
            for (var e in a.post)
                if (a.post.hasOwnProperty(e)) {
                    b = e;
                    for (var f; null !== (f = c.exec(b));) b = b.replace(f[0], String.fromCharCode(parseInt("0x" + f[1], 16)));
                    d[b] = a.post[e]
                }
            a.post = d
        }
        return a
    }, SWFUpload.prototype.testExternalInterface = function() {
        try {
            return this.callFlash("TestExternalInterface")
        } catch (a) {
            return !1
        }
    }, SWFUpload.prototype.flashReady = function() {
        var a = this.getMovieElement();
        return a ? (this.cleanUp(a), this.queueEvent("swfupload_loaded_handler"), void 0) : (this.debug("Flash called back ready but the flash movie can't be found."), void 0)
    }, SWFUpload.prototype.cleanUp = function(a) {
        try {
            if (this.movieElement && "unknown" == typeof a.CallFunction) {
                this.debug("Removing Flash functions hooks (this should only run in IE and should prevent memory leaks)");
                for (var b in a) try {
                    "function" == typeof a[b] && (a[b] = null)
                } catch (c) {}
            }
        } catch (d) {}
        window.__flash__removeCallback = function(a, b) {
            try {
                a && (a[b] = null)
            } catch (c) {}
        }
    }, SWFUpload.prototype.fileDialogStart = function() {
        this.queueEvent("file_dialog_start_handler")
    }, SWFUpload.prototype.fileQueued = function(a) {
        a = this.unescapeFilePostParams(a), this.queueEvent("file_queued_handler", a)
    }, SWFUpload.prototype.fileQueueError = function(a, b, c) {
        a = this.unescapeFilePostParams(a), this.queueEvent("file_queue_error_handler", [a, b, c])
    }, SWFUpload.prototype.fileDialogComplete = function(a, b, c) {
        this.queueEvent("file_dialog_complete_handler", [a, b, c])
    }, SWFUpload.prototype.uploadStart = function(a) {
        a = this.unescapeFilePostParams(a), this.queueEvent("return_upload_start_handler", a)
    }, SWFUpload.prototype.returnUploadStart = function(a) {
        var b;
        if ("function" == typeof this.settings.upload_start_handler) a = this.unescapeFilePostParams(a), b = this.settings.upload_start_handler.call(this, a);
        else if (void 0 != this.settings.upload_start_handler) throw "upload_start_handler must be a function";
        void 0 === b && (b = !0), b = !!b, this.callFlash("ReturnUploadStart", [b])
    }, SWFUpload.prototype.uploadProgress = function(a, b, c) {
        a = this.unescapeFilePostParams(a), this.queueEvent("upload_progress_handler", [a, b, c])
    }, SWFUpload.prototype.uploadError = function(a, b, c) {
        a = this.unescapeFilePostParams(a), this.queueEvent("upload_error_handler", [a, b, c])
    }, SWFUpload.prototype.uploadSuccess = function(a, b, c) {
        a = this.unescapeFilePostParams(a), this.queueEvent("upload_success_handler", [a, b, c])
    }, SWFUpload.prototype.uploadComplete = function(a) {
        a = this.unescapeFilePostParams(a), this.queueEvent("upload_complete_handler", a)
    }, SWFUpload.prototype.debug = function(a) {
        this.queueEvent("debug_handler", a)
    }, SWFUpload.prototype.debugMessage = function(a) {
        if (this.settings.debug) {
            var b, c = [];
            if ("object" == typeof a && "string" == typeof a.name && "string" == typeof a.message) {
                for (var d in a) a.hasOwnProperty(d) && c.push(d + ": " + a[d]);
                b = c.join("\n") || "", c = b.split("\n"), b = "EXCEPTION: " + c.join("\nEXCEPTION: "), SWFUpload.Console.writeLine(b)
            } else SWFUpload.Console.writeLine(a)
        }
    }, SWFUpload.Console = {}, SWFUpload.Console.writeLine = function(a) {
        var b, c;
        try {
            b = document.getElementById("SWFUpload_Console"), b || (c = document.createElement("form"), document.getElementsByTagName("body")[0].appendChild(c), b = document.createElement("textarea"), b.id = "SWFUpload_Console", b.style.fontFamily = "monospace", b.setAttribute("wrap", "off"), b.wrap = "off", b.style.overflow = "auto", b.style.width = "700px", b.style.height = "350px", b.style.margin = "5px", c.appendChild(b)), b.value += a + "\n", b.scrollTop = b.scrollHeight - b.clientHeight
        } catch (d) {
            alert("Exception: " + d.name + " Message: " + d.message)
        }
    }, define("module/uploadify/jquery.uploadify.min", function(require) {
        var a = jQuery = require("jquery");
        ! function(a) {
            var b = {
                    init: function(b, d) {
                        return this.each(function() {
                            var e = a(this),
                                f = e.clone(),
                                g = a.extend({
                                    id: e.attr("id"),
                                    swf: "uploadify.swf",
                                    uploader: "uploadify.php",
                                    auto: !0,
                                    buttonClass: "",
                                    buttonCursor: "hand",
                                    buttonImage: null,
                                    buttonText: "SELECT FILES",
                                    checkExisting: !1,
                                    debug: !1,
                                    fileObjName: "Filedata",
                                    fileSizeLimit: 0,
                                    fileTypeDesc: "All Files",
                                    fileTypeExts: "*.*",
                                    height: 30,
                                    itemTemplate: !1,
                                    method: "post",
                                    multi: !0,
                                    formData: {},
                                    preventCaching: !0,
                                    progressData: "percentage",
                                    queueID: !1,
                                    queueSizeLimit: 999,
                                    removeCompleted: !0,
                                    removeTimeout: 3,
                                    requeueErrors: !1,
                                    successTimeout: 30,
                                    uploadLimit: 0,
                                    width: 120,
                                    overrideEvents: []
                                }, b),
                                h = {
                                    assume_success_timeout: g.successTimeout,
                                    button_placeholder_id: g.id,
                                    button_width: g.width,
                                    button_height: g.height,
                                    button_text: null,
                                    button_text_style: null,
                                    button_text_top_padding: 0,
                                    button_text_left_padding: 0,
                                    button_action: g.multi ? SWFUpload.BUTTON_ACTION.SELECT_FILES : SWFUpload.BUTTON_ACTION.SELECT_FILE,
                                    button_disabled: !1,
                                    button_cursor: "arrow" == g.buttonCursor ? SWFUpload.CURSOR.ARROW : SWFUpload.CURSOR.HAND,
                                    button_window_mode: SWFUpload.WINDOW_MODE.TRANSPARENT,
                                    debug: g.debug,
                                    requeue_on_error: g.requeueErrors,
                                    file_post_name: g.fileObjName,
                                    file_size_limit: g.fileSizeLimit,
                                    file_types: g.fileTypeExts,
                                    file_types_description: g.fileTypeDesc,
                                    file_queue_limit: g.queueSizeLimit,
                                    file_upload_limit: g.uploadLimit,
                                    flash_url: g.swf,
                                    prevent_swf_caching: g.preventCaching,
                                    post_params: g.formData,
                                    upload_url: g.uploader,
                                    use_query_string: "get" == g.method,
                                    file_dialog_complete_handler: c.onDialogClose,
                                    file_dialog_start_handler: c.onDialogOpen,
                                    file_queued_handler: c.onSelect,
                                    file_queue_error_handler: c.onSelectError,
                                    swfupload_loaded_handler: g.onSWFReady,
                                    upload_complete_handler: c.onUploadComplete,
                                    upload_error_handler: c.onUploadError,
                                    upload_progress_handler: c.onUploadProgress,
                                    upload_start_handler: c.onUploadStart,
                                    upload_success_handler: c.onUploadSuccess
                                };
                            d && (h = a.extend(h, d)), h = a.extend(h, g);
                            var i = swfobject.getFlashPlayerVersion(),
                                j = i.major >= 9;
                            if (j) {
                                window["uploadify_" + g.id] = new SWFUpload(h);
                                var k = window["uploadify_" + g.id];
                                e.data("uploadify", k);
                                var l = a("<div />", {
                                    id: g.id,
                                    "class": "uploadify",
                                    css: {
                                        height: g.height + "px",
                                        width: g.width + "px"
                                    }
                                });
                                a("#" + k.movieName).wrap(l), l = a("#" + g.id), l.data("uploadify", k);
                                var m = a("<div />", {
                                    id: g.id + "-button",
                                    "class": "uploadify-button " + g.buttonClass
                                });
                                if (g.buttonImage && m.css({
                                        "background-image": "url('" + g.buttonImage + "')",
                                        "text-indent": "-9999px"
                                    }), m.html('<span class="uploadify-button-text">' + g.buttonText + "</span>").css({
                                        height: g.height + "px",
                                        "line-height": g.height + "px",
                                        width: g.width + "px"
                                    }), l.append(m), a("#" + k.movieName).css({
                                        position: "absolute",
                                        "z-index": 1
                                    }), !g.queueID) {
                                    var n = a("<div />", {
                                        id: g.id + "-queue",
                                        "class": "uploadify-queue"
                                    });
                                    l.after(n), k.settings.queueID = g.id + "-queue", k.settings.defaultQueue = !0
                                }
                                k.queueData = {
                                    files: {},
                                    filesSelected: 0,
                                    filesQueued: 0,
                                    filesReplaced: 0,
                                    filesCancelled: 0,
                                    filesErrored: 0,
                                    uploadsSuccessful: 0,
                                    uploadsErrored: 0,
                                    averageSpeed: 0,
                                    queueLength: 0,
                                    queueSize: 0,
                                    uploadSize: 0,
                                    queueBytesUploaded: 0,
                                    uploadQueue: [],
                                    errorMsg: "您选择的文件不能添加到上传队列中:"
                                }, k.original = f, k.wrapper = l, k.button = m, k.queue = n, g.onInit && g.onInit.call(e, k)
                            } else g.onFallback && g.onFallback.call(e)
                        })
                    },
                    cancel: function() {
                        var b = arguments;
                        this.each(function() {
                            var c = a(this),
                                d = c.data("uploadify"),
                                e = d.settings,
                                f = -1;
                            if (b[0])
                                if ("*" == b[0]) {
                                    var g = d.queueData.queueLength;
                                    a("#" + e.queueID).find(".uploadify-queue-item").each(function() {
                                        f++, b[1] === !0 ? d.cancelUpload(a(this).attr("id"), !1) : d.cancelUpload(a(this).attr("id")), a(this).find(".data").removeClass("data").html(" - Cancelled"), a(this).find(".uploadify-progress-bar").remove(), a(this).delay(1e3 + 100 * f).fadeOut(500, function() {
                                            a(this).remove()
                                        })
                                    }), d.queueData.queueSize = 0, d.queueData.queueLength = 0, e.onClearQueue && e.onClearQueue.call(c, g)
                                } else
                                    for (var h = 0; h < b.length; h++) d.cancelUpload(b[h]), a("#" + b[h]).find(".data").removeClass("data").html(" - Cancelled"), a("#" + b[h]).find(".uploadify-progress-bar").remove(), a("#" + b[h]).delay(1e3 + 100 * h).fadeOut(500, function() {
                                        a(this).remove()
                                    });
                            else {
                                var i = a("#" + e.queueID).find(".uploadify-queue-item").get(0);
                                $item = a(i), d.cancelUpload($item.attr("id")), $item.find(".data").removeClass("data").html(" - Cancelled"), $item.find(".uploadify-progress-bar").remove(), $item.delay(1e3).fadeOut(500, function() {
                                    a(this).remove()
                                })
                            }
                        })
                    },
                    destroy: function() {
                        this.each(function() {
                            var b = a(this),
                                c = b.data("uploadify"),
                                d = c.settings;
                            c.destroy(), d.defaultQueue && a("#" + d.queueID).remove(), a("#" + d.id).replaceWith(c.original), d.onDestroy && d.onDestroy.call(this), delete c
                        })
                    },
                    disable: function(b) {
                        this.each(function() {
                            var c = a(this),
                                d = c.data("uploadify"),
                                e = d.settings;
                            b ? (d.button.addClass("disabled"), e.onDisable && e.onDisable.call(this)) : (d.button.removeClass("disabled"), e.onEnable && e.onEnable.call(this)), d.setButtonDisabled(b)
                        })
                    },
                    settings: function(b, c, d) {
                        var e = arguments,
                            f = c;
                        return this.each(function() {
                            var g = a(this),
                                h = g.data("uploadify"),
                                i = h.settings;
                            if ("object" == typeof e[0])
                                for (var j in c) setData(j, c[j]);
                            if (1 === e.length) f = i[b];
                            else {
                                switch (b) {
                                    case "uploader":
                                        h.setUploadURL(c);
                                        break;
                                    case "formData":
                                        d || (c = a.extend(i.formData, c)), h.setPostParams(i.formData);
                                        break;
                                    case "method":
                                        "get" == c ? h.setUseQueryString(!0) : h.setUseQueryString(!1);
                                        break;
                                    case "fileObjName":
                                        h.setFilePostName(c);
                                        break;
                                    case "fileTypeExts":
                                        h.setFileTypes(c, i.fileTypeDesc);
                                        break;
                                    case "fileTypeDesc":
                                        h.setFileTypes(i.fileTypeExts, c);
                                        break;
                                    case "fileSizeLimit":
                                        h.setFileSizeLimit(c);
                                        break;
                                    case "uploadLimit":
                                        h.setFileUploadLimit(c);
                                        break;
                                    case "queueSizeLimit":
                                        h.setFileQueueLimit(c);
                                        break;
                                    case "buttonImage":
                                        h.button.css("background-image", settingValue);
                                        break;
                                    case "buttonCursor":
                                        "arrow" == c ? h.setButtonCursor(SWFUpload.CURSOR.ARROW) : h.setButtonCursor(SWFUpload.CURSOR.HAND);
                                        break;
                                    case "buttonText":
                                        a("#" + i.id + "-button").find(".uploadify-button-text").html(c);
                                        break;
                                    case "width":
                                        h.setButtonDimensions(c, i.height);
                                        break;
                                    case "height":
                                        h.setButtonDimensions(i.width, c);
                                        break;
                                    case "multi":
                                        c ? h.setButtonAction(SWFUpload.BUTTON_ACTION.SELECT_FILES) : h.setButtonAction(SWFUpload.BUTTON_ACTION.SELECT_FILE)
                                }
                                i[b] = c
                            }
                        }), 1 === e.length ? f : void 0
                    },
                    stop: function() {
                        this.each(function() {
                            var b = a(this),
                                c = b.data("uploadify");
                            c.queueData.averageSpeed = 0, c.queueData.uploadSize = 0, c.queueData.bytesUploaded = 0, c.queueData.uploadQueue = [], c.stopUpload()
                        })
                    },
                    upload: function() {
                        var b = arguments;
                        this.each(function() {
                            var c = a(this),
                                d = c.data("uploadify");
                            if (d.queueData.averageSpeed = 0, d.queueData.uploadSize = 0, d.queueData.bytesUploaded = 0, d.queueData.uploadQueue = [], b[0])
                                if ("*" == b[0]) d.queueData.uploadSize = d.queueData.queueSize, d.queueData.uploadQueue.push("*"), d.startUpload();
                                else {
                                    for (var e = 0; e < b.length; e++) d.queueData.uploadSize += d.queueData.files[b[e]].size, d.queueData.uploadQueue.push(b[e]);
                                    d.startUpload(d.queueData.uploadQueue.shift())
                                }
                            else d.startUpload()
                        })
                    }
                },
                c = {
                    onDialogOpen: function() {
                        var a = this.settings;
                        this.queueData.errorMsg = "您选择的文件不能添加到上传队列中:", this.queueData.filesReplaced = 0, this.queueData.filesCancelled = 0, a.onDialogOpen && a.onDialogOpen.call(this)
                    },
                    onDialogClose: function(b, c, d) {
                        var e = this.settings;
                        this.queueData.filesErrored = b - c, this.queueData.filesSelected = b, this.queueData.filesQueued = c - this.queueData.filesCancelled, this.queueData.queueLength = d, a.inArray("onDialogClose", e.overrideEvents) < 0 && this.queueData.filesErrored > 0 && alert(this.queueData.errorMsg), e.onDialogClose && e.onDialogClose.call(this, this.queueData), e.auto && a("#" + e.id).uploadify("upload", "*")
                    },
                    onSelect: function(b) {
                        var c = this.settings,
                            d = {};
                        for (var e in this.queueData.files)
                            if (d = this.queueData.files[e], 1 != d.uploaded && d.name == b.name) {
                                var f = confirm('The file named "' + b.name + '" is already in the queue.\nDo you want to replace the existing item in the queue?');
                                if (!f) return this.cancelUpload(b.id), this.queueData.filesCancelled++, !1;
                                a("#" + d.id).remove(), this.cancelUpload(d.id), this.queueData.filesReplaced++
                            }
                        var g = Math.round(b.size / 1024),
                            h = "KB";
                        g > 1e3 && (g = Math.round(g / 1e3), h = "MB");
                        var i = g.toString().split(".");
                        g = i[0], i.length > 1 && (g += "." + i[1].substr(0, 2)), g += h;
                        var j = b.name;
                        if (j.length > 25 && (j = j.substr(0, 25) + "..."), itemData = {
                                fileID: b.id,
                                instanceID: c.id,
                                fileName: j,
                                fileSize: g
                            }, 0 == c.itemTemplate && (c.itemTemplate = '<div id="${fileID}" class="uploadify-queue-item">					<div class="cancel">						<a href="javascript:$(\'#${instanceID}\').uploadify(\'cancel\', \'${fileID}\')">X</a>					</div>					<span class="fileName">${fileName} (${fileSize})</span><span class="data"></span>					<div class="uploadify-progress">						<div class="uploadify-progress-bar"><!--Progress Bar--></div>					</div>				</div>'), a.inArray("onSelect", c.overrideEvents) < 0) {
                            itemHTML = c.itemTemplate;
                            for (var k in itemData) itemHTML = itemHTML.replace(new RegExp("\\$\\{" + k + "\\}", "g"), itemData[k]);
                            a("#" + c.queueID).append(itemHTML)
                        }
                        this.queueData.queueSize += b.size, this.queueData.files[b.id] = b, c.onSelect && c.onSelect.apply(this, arguments)
                    },
                    onSelectError: function(b, c, d) {
                        var e = this.settings;
                        if (a.inArray("onSelectError", e.overrideEvents) < 0) switch (c) {
                            case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:
                                e.queueSizeLimit > d ? (this.queueData.errorMsg += "\nThe number of files selected exceeds the remaining upload limit (" + d + ").", this.queueData.errorMsg = "上传数量已满") : this.queueData.errorMsg += "\nThe number of files selected exceeds the queue size limit (" + e.queueSizeLimit + ").";
                                break;
                            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                                this.queueData.errorMsg += '\n文件 "' + b.name + '" 超过了系统限定的上传大小' + e.fileSizeLimit + ".";
                                break;
                            case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:
                                this.queueData.errorMsg += '\n文件  "' + b.name + '" 是空的.';
                                break;
                            case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:
                                this.queueData.errorMsg += '\n文件  "' + b.name + '" is not an accepted file type (' + e.fileTypeDesc + ")."
                        }
                        c != SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED && delete this.queueData.files[b.id], e.onSelectError && e.onSelectError.apply(this, arguments)
                    },
                    onQueueComplete: function() {
                        this.settings.onQueueComplete && this.settings.onQueueComplete.call(this, this.settings.queueData)
                    },
                    onUploadComplete: function(b) {
                        var c = this.settings,
                            d = this,
                            e = this.getStats();
                        if (this.queueData.queueLength = e.files_queued, "*" == this.queueData.uploadQueue[0] ? this.queueData.queueLength > 0 ? this.startUpload() : (this.queueData.uploadQueue = [], c.onQueueComplete && c.onQueueComplete.call(this, this.queueData)) : this.queueData.uploadQueue.length > 0 ? this.startUpload(this.queueData.uploadQueue.shift()) : (this.queueData.uploadQueue = [], c.onQueueComplete && c.onQueueComplete.call(this, this.queueData)), a.inArray("onUploadComplete", c.overrideEvents) < 0)
                            if (c.removeCompleted) switch (b.filestatus) {
                                case SWFUpload.FILE_STATUS.COMPLETE:
                                    setTimeout(function() {
                                        a("#" + b.id) && (d.queueData.queueSize -= b.size, d.queueData.queueLength -= 1, delete d.queueData.files[b.id], a("#" + b.id).fadeOut(500, function() {
                                            a(this).remove()
                                        }))
                                    }, 1e3 * c.removeTimeout);
                                    break;
                                case SWFUpload.FILE_STATUS.ERROR:
                                    c.requeueErrors || setTimeout(function() {
                                        a("#" + b.id) && (d.queueData.queueSize -= b.size, d.queueData.queueLength -= 1, delete d.queueData.files[b.id], a("#" + b.id).fadeOut(500, function() {
                                            a(this).remove()
                                        }))
                                    }, 1e3 * c.removeTimeout)
                            } else b.uploaded = !0;
                        c.onUploadComplete && c.onUploadComplete.call(this, b)
                    },
                    onUploadError: function(b, c, d) {
                        var e = this.settings,
                            f = "Error";
                        switch (c) {
                            case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
                                f = "HTTP Error (" + d + ")";
                                break;
                            case SWFUpload.UPLOAD_ERROR.MISSING_UPLOAD_URL:
                                f = "Missing Upload URL";
                                break;
                            case SWFUpload.UPLOAD_ERROR.IO_ERROR:
                                f = "IO Error";
                                break;
                            case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
                                f = "Security Error";
                                break;
                            case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
                                f = "Exceeds Upload Limit";
                                break;
                            case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
                                f = "Failed";
                                break;
                            case SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND:
                                break;
                            case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
                                f = "Validation Error";
                                break;
                            case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
                                f = "Cancelled", this.queueData.queueSize -= b.size, this.queueData.queueLength -= 1, (b.status == SWFUpload.FILE_STATUS.IN_PROGRESS || a.inArray(b.id, this.queueData.uploadQueue) >= 0) && (this.queueData.uploadSize -= b.size), e.onCancel && e.onCancel.call(this, b), delete this.queueData.files[b.id];
                                break;
                            case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
                                f = "Stopped"
                        }
                        b && a.inArray("onUploadError", e.overrideEvents) < 0 && (c != SWFUpload.UPLOAD_ERROR.FILE_CANCELLED && c != SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED && a("#" + b.id).addClass("uploadify-error"), a("#" + b.id).find(".uploadify-progress-bar").css("width", "1px"), c != SWFUpload.UPLOAD_ERROR.SPECIFIED_FILE_ID_NOT_FOUND && b.status != SWFUpload.FILE_STATUS.COMPLETE && a("#" + b.id).find(".data").html(" - " + f));
                        var g = this.getStats();
                        this.queueData.uploadsErrored = g.upload_errors, e.onUploadError && e.onUploadError.call(this, b, c, d, f)
                    },
                    onUploadProgress: function(b, c, d) {
                        var e = this.settings,
                            f = new Date,
                            g = f.getTime(),
                            h = g - this.timer;
                        h > 500 && (this.timer = g);
                        var i = c - this.bytesLoaded;
                        this.bytesLoaded = c;
                        var j = this.queueData.queueBytesUploaded + c,
                            k = Math.round(100 * (c / d)),
                            l = "KB/s",
                            m = 0,
                            n = i / 1024 / (h / 1e3);
                        n = Math.floor(10 * n) / 10, this.queueData.averageSpeed = this.queueData.averageSpeed > 0 ? Math.floor((this.queueData.averageSpeed + n) / 2) : Math.floor(n), n > 1e3 && (m = .001 * n, this.queueData.averageSpeed = Math.floor(m), l = "MB/s"), a.inArray("onUploadProgress", e.overrideEvents) < 0 && ("percentage" == e.progressData ? a("#" + b.id).find(".data").html(" - " + k + "%") : "speed" == e.progressData && h > 500 && a("#" + b.id).find(".data").html(" - " + this.queueData.averageSpeed + l), a("#" + b.id).find(".uploadify-progress-bar").css("width", k + "%")), e.onUploadProgress && e.onUploadProgress.call(this, b, c, d, j, this.queueData.uploadSize)
                    },
                    onUploadStart: function(b) {
                        var c = this.settings,
                            d = new Date;
                        this.timer = d.getTime(), this.bytesLoaded = 0, 0 == this.queueData.uploadQueue.length && (this.queueData.uploadSize = b.size), c.checkExisting && a.ajax({
                            type: "POST",
                            async: !1,
                            url: c.checkExisting,
                            data: {
                                filename: b.name
                            },
                            success: function(c) {
                                if (1 == c) {
                                    var d = confirm('A file with the name "' + b.name + '" already exists on the server.\nWould you like to replace the existing file?');
                                    d || (this.cancelUpload(b.id), a("#" + b.id).remove(), this.queueData.uploadQueue.length > 0 && this.queueData.queueLength > 0 && ("*" == this.queueData.uploadQueue[0] ? this.startUpload() : this.startUpload(this.queueData.uploadQueue.shift())))
                                }
                            }
                        }), c.onUploadStart && c.onUploadStart.call(this, b)
                    },
                    onUploadSuccess: function(b, c, d) {
                        var e = this.settings,
                            f = this.getStats();
                        this.queueData.uploadsSuccessful = f.successful_uploads, this.queueData.queueBytesUploaded += b.size, a.inArray("onUploadSuccess", e.overrideEvents) < 0 && a("#" + b.id).find(".data").html(" - Complete"), e.onUploadSuccess && e.onUploadSuccess.call(this, b, c, d)
                    }
                };
            a.fn.uploadify = function(c) {
                return b[c] ? b[c].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof c && c ? (a.error("The method " + c + " does not exist in $.uploadify"), void 0) : b.init.apply(this, arguments)
            }
        }(a)
    }), define("module/common/deliver", function(require, a, b) {
        require("jquery");
        var c = require("module/common/dialog");
        window.i_attr_del = function(a, b) {
            $(a).parent().remove(), $("#F_att").val(""), $.ajax({
                url: "/service/upload.del.html",
                type: "POST",
                dataType: "json",
                data: "id=" + b,
                success: function() {}
            }), limit_att()
        }, window.limit_att = function() {
            var a = $("#F_att").val();
            $("#J_upload_file").uploadify("disable", a ? !0 : !1), $("#J_upload_file-button").css({
                "background-image": "url(/static/js/uploadify/" + (a ? "un" : "") + "button.png)"
            })
        }, b.exports = {
            dialog: function(a, b) {
                require("page/common"), require("jquery.form"), c.close(), c.dialog({
                    title: "投递项目",
                    width: "720px",
                    onclose: function() {
                        $("#J_upload_file").each(function() {
                            $(this).uploadify("destroy")
                        })
                    },
                    ajax: {
                        url: "/ajax/deliver/dialog",
                        dataType: "html",
                        data: "_=&zjxm_id=" + b + "&user_id=" + a,
                        callback: function(a, d) {
                            d.content(a), window.dl = d, $("#J_deliver_frm .J_tip").blur(function() {
                                $(this).val() || $(this).val($(this).attr("tip")).css({
                                    color: "#999"
                                })
                            }).focus(function() {
                                $(this).attr("tip") == $(this).val() && $(this).val("").css({
                                    color: "#666"
                                })
                            }).trigger("blur"), $("#J_dialog_close").click(function() {
                                try {
                                    window.dl.close().remove()
                                } catch (a) {}
                            });
                            var e = !1,
                                f = [];
                            $("#J_mobile").each(function() {
                                $(this).blur(function() {
                                    var a = $("#J_mobile").val();
                                    !e && !f[a] && a && Trjcn.Util.isMobile(a) && (e = !0, f[a] = 1, $.ajax({
                                        url: "/ajax/deliver_mobile",
                                        type: "POST",
                                        data: "mobile=" + a + "&contact_name=" + $("#J_contact_name").val() + "&zjxm_id=" + b,
                                        success: function() {
                                            e = !1
                                        }
                                    }))
                                })
                            }), require("module/uploadify/jquery.uploadify.min");
                            var g = window.uploadify_token || "";
                            if (g) {
                                var h = {
                                    formData: {
                                        token: g,
                                        attach_type: "zjxm_deliver"
                                    },
                                    auto: !0,
                                    debug: !1,
                                    multi: !1,
                                    removeTimeout: 0,
                                    fileSizeLimit: "1024KB",
                                    fileTypeDesc: "上传文件",
                                    fileTypeExts: "*.zip;*.rar;.tgz;*.doc;*.docx;*.xls;*.xlsx;*.pdf",
                                    buttonImage: "/static/js/uploadify/button.png",
                                    height: 22,
                                    width: 61,
                                    swf: "/static/js/uploadify/uploadify.swf",
                                    uploader: "/service/upload.uploadfile.html",
                                    onUploadSuccess: function(a, b) {
                                        return b ? (b = $.parseJSON(b), 100 == b.code ? alert(b.error) : ($("#F_att").each(function() {
                                            $(this).val(b.aid);
                                            var c = "<div>" + a.name + '&nbsp;&nbsp;<a href="javascript:void(0);" onclick="i_attr_del(this,\'' + b.aidkey + '\')" class="ml20">删除</a></div>';
                                            $("#J_upload_file_view").show().append(c)
                                        }), limit_att()), void 0) : (alert("上传失败"), void 0)
                                    }
                                };
                                $("#J_upload_file").uploadify(h)
                            }
                            if ($("#J-fieldset-select").each(function() {
                                    var a = $(this),
                                        b = $(".t_input", a);
                                    b.bind("click", function() {
                                        $(this).parent().toggleClass("cur")
                                    }), b.next().bind("click", function() {
                                        $(this).parent().toggleClass("cur")
                                    }), $("a", a).bind("click", function() {
                                        $(this).parents(".j-fieldset-select").removeClass("cur"), $("#J_feed_zjxm_id").val($(this).attr("data-id")).trigger("blur");
                                        var a = $(this).attr("data-idkey");
                                        a && ($("#J_zjxm_edit").each(function() {
                                            $(this).attr("href", $(this).attr("data-domain") + "/manage/zjxm_publish/edit/" + a + ".html").show()
                                        }), b.html($(this).text()))
                                    })
                                }), $("#J_go_deliver").click(function() {
                                    $(this).parents(".popup-msg-a").hide().next().show()
                                }), $("#J_btn_fdl_login").click(function() {
                                    try {
                                        window.dl.close().remove()
                                    } catch (a) {}
                                    var b = require("module/common/login");
                                    b.dialog()
                                }), $("#T-reg-mobile-code").each(function() {
                                    window.mobileCode = new TrjcnMobileCode, window.mobileCode.init("mobile", "/api/mobile_reglogin_send"), window.mobileCode.handmsg = function(a) {
                                        return $("#J_deliver_msg").html(""), window.mobileCode.mobileInfoHand.html('<em class="ui-text-red"><i class="icoErr16"></i>' + a + "</em>")
                                    }
                                }), 0 != $("#J_deliver_frm").length) {
                                var i = new formValidator;
                                i.init("J_deliver_frm"), i.errtip = function(a, b, c) {
                                    if (a) {
                                        switch (b = c === !0 ? languages[b] || "" : languages[b] || b, a.attr("name")) {
                                            case "invite_title":
                                                b = "请输入项目标题.";
                                                break;
                                            case "invite_content":
                                                b = "请简单介绍项目情况、项目优势及融资用途。字数20-500之间.";
                                                break;
                                            case "contact_name":
                                                b = "请输入联系人.";
                                                break;
                                            case "mobile":
                                                b || (b = "请输入手机号码.");
                                                break;
                                            case "mobilecode":
                                                b = "请输入验证码.";
                                                break;
                                            case "feed_zjxm_id":
                                                b = "请选择项目."
                                        }
                                        return $("#J_deliver_msg").html(""), a.nextAll(".part-fieldset-msg").html('<em class="ui-text-red"><i class="icoErr16"></i>' + b + "</em>"), !1
                                    }
                                }, i.tip = function(a) {
                                    a.nextAll(".part-fieldset-msg").html("")
                                };
                                var j = !1;
                                $("#J_btn_send_deliver").click(function() {
                                    if (!i.isValid() && !j) {
                                        j = !0;
                                        var a = $("#J_deliver_frm").formSerialize();
                                        $.ajax({
                                            url: "/ajax/deliver/save",
                                            type: "POST",
                                            dataType: "json",
                                            data: a,
                                            success: function(a) {
                                                if (j = !1, 200 == a.code) {
                                                    if (a.data.forward_url) return location.href = a.data.forward_url, void 0;
                                                    try {
                                                        window.dl.close().remove()
                                                    } catch (b) {}
                                                    c.dialog_ok(a.data.msg)
                                                } else $("#J_deliver_msg").html('<em class="ui-text-red"><i class="icoErr16"></i>' + a.data.msg + "</em>").show()
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    }
                })
            },
            dialog_guest: function(a, b) {
                require("page/common"), require("jquery.form"), c.close(), c.dialog({
                    title: "投递项目",
                    width: "600px",
                    onclose: function() {
                        $("#J_upload_file").each(function() {
                            $(this).uploadify("destroy")
                        })
                    },
                    ajax: {
                        url: "/ajax/deliver_guest/dialog",
                        dataType: "html",
                        data: "_=&zjxm_id=" + b + "&user_id=" + a,
                        callback: function(a, b) {
                            b.content(a), window.dl = b, $("#J_dialog_close").click(function() {
                                try {
                                    window.dl.close().remove()
                                } catch (a) {}
                            });
                            var d = new formValidator;
                            d.init("J_deliver_frm"), d.errtip = function(a, b, c) {
                                if (a) {
                                    switch (b = c === !0 ? languages[b] || "" : languages[b] || b, a.attr("name")) {
                                        case "invite_title":
                                            b = "请输入项目标题.";
                                            break;
                                        case "invite_content":
                                            b = "请简单介绍项目情况、项目优势及融资用途。字数20-500之间.";
                                            break;
                                        case "contact_name":
                                            b = "请输入联系人.";
                                            break;
                                        case "mobile":
                                            b || (b = "请输入手机号码.");
                                            break;
                                        case "mobilecode":
                                            b = "请输入验证码.";
                                            break;
                                        case "feed_zjxm_id":
                                            b = "请选择项目."
                                    }
                                    return a.nextAll(".part-fieldset-msg").html('<em class="ui-text-red"><i class="icoErr16"></i>' + b + "</em>"), !1
                                }
                            }, d.tip = function(a) {
                                a.nextAll(".part-fieldset-msg").html("")
                            };
                            var e = !1;
                            $("#J_btn_send_guest").click(function() {
                                if (!d.isValid() && !e) {
                                    e = !0;
                                    var a = $("#J_deliver_frm").formSerialize();
                                    $.ajax({
                                        url: "/ajax/deliver_guest/save",
                                        type: "POST",
                                        dataType: "json",
                                        data: a,
                                        success: function(a) {
                                            if (e = !1, 200 == a.code) {
                                                if (a.data.forward_url) return location.href = a.data.forward_url, void 0;
                                                try {
                                                    window.dl.close().remove()
                                                } catch (b) {}
                                                c.dialog_ok(a.data.msg)
                                            } else $("#J_deliver_msg").html('<em class="ui-text-red"><i class="icoErr16"></i>' + a.data.msg + "</em>").show()
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
            },
            run: function() {
                $("a.J_btn_dl_deliver").click(function() {
                    var a = $(this).attr("data-capital") || "",
                        c = parseInt($(this).attr("data-user-id")),
                        d = $(this).attr("data-zjxm-id") || 0;
                    if (!window.Trjcn.LoginID && 1 == a) {
                        var e = require("module/common/login");
                        return e.dialog(), void 0
                    }
                    c > 0 ? b.exports.dialog(c, d) : b.exports.dialog_guest(c, d)
                }).removeClass("J_btn_dl_deliver")
            }
        }, b.exports.run()
    }), define("module/ajax/ajax", function(require) {
        require("jquery");
        var a = function() {
            var a = {
                dataType: "json",
                type: "POST",
                post: function(b, c, d, e) {
                    a.type = "POST", a.request(b, c, d, e)
                },
                get: function(b, c, d, e) {
                    a.type = "GET", a.request(b, c, d, e)
                },
                jsonp: function(a, b, c, d) {
                    $.ajax({
                        type: "POST",
                        url: a,
                        dataType: "jsonp",
                        jsonp: "callback",
                        data: b,
                        success: function(a) {
                            "function" == typeof c && c(a)
                        },
                        error: function(a) {
                            "function" == typeof d && d(a)
                        }
                    })
                },
                request: function(b, c, d, e) {
                    $.ajax({
                        type: a.type,
                        url: b,
                        dataType: a.dataType,
                        data: c,
                        success: function(a) {
                            500 != a.code && "function" == typeof d && d(a)
                        },
                        error: function(a) {
                            "function" == typeof e && e(a)
                        }
                    })
                }
            };
            return a
        };
        return a
    }), define("page/member/ui", function(require, a) {
        require("jquery");
        var b = require("module/common/dialog");
        a.cache = null, a.success = function(a) {
            b.dialog_ok(a)
        }, a.alert = function(a) {
            this.success(a)
        }, a.error = function(a) {
            this.success(a)
        }, a.confirm = function(a, c, d) {
            b.confirmDialog(a, "", c, d)
        }, a.loading = function() {
            var c = b({
                title: "",
                lock: !0,
                width: "746px",
                fixed: !0
            });
            c.showModal(), a.cache = c
        }, a.sendCompany = function(b) {
            a.cache.content(b)
        }
    }), define("page/member/businesscard", function(require, a) {
        function b(a) {
            return "/" + a
        }
        var c = require("jquery"),
            d = new Object,
            e = 0;
        d.ui = require("page/member/ui"), d.Ajax = {}, d.Ajax.post = function(b, c, d, e) {
            a.post(b, c, d, e)
        }, a.post = function(a, b, d, e) {
            c.ajax({
                url: a,
                data: b,
                success: d,
                error: e,
                dataType: "json",
                type: "post"
            })
        }, a.unfollow = function(a, c) {
            d.Ajax.post(b("service/businesscard.unfollow"), "uid=" + a, function(a) {
                200 == a.code ? ("function" == typeof c && c(a), d.ui.success("关注取消成功")) : d.ui.alert(a.data.message || "关注取消失败，请重试")
            })
        }, a.exchange = function(a, c) {
            e || (e = 1, d.Ajax.post(b("service/businesscard/exchange"), "uid=" + a, function(a) {
                if (e = 0, 200 == a.code) {
                    if ("function" == typeof c) return a.data.message && d.ui.alert(a.data.message), c(a), void 0;
                    d.ui.success("交换名片申请成功")
                } else if (500 == a.code) {
                    var b = require("module/common/login");
                    b.dialog()
                } else -2 == a.code ? d.ui.alert(a.data.error_message || a.data.message) : d.ui.alert(a.data.error_message || a.data.message || "交换失败，请重试")
            }, function() {
                e = 0, d.ui.error("系统错误")
            }))
        }, a.getcontact = function(a, c) {
            e || (e = 1, d.Ajax.post(b("service/businesscard/getcontact"), "uid=" + a, function(a) {
                e = 0;
                var b = "http://www" + window.location.host.substring(location.host.indexOf("."), location.host.length);
                if (200 == a.code) {
                    if ("function" == typeof c) return c(a), void 0
                } else if (500 == a.code) {
                    var f = require("module/common/login");
                    f.dialog()
                } else 201 == a.code ? d.ui.confirm(a.error, "了解VIP会员", function() {
                    window.location.href = b + "/service_B_RONGZI.html"
                }) : 202 == a.code ? d.ui.confirm(a.error, "了解VIP会员", function() {
                    window.location.href = b + "/service_B_TOUZI.html"
                }) : d.ui.alert(a.data.error_message || a.error)
            }, function() {
                e = 0, d.ui.error("系统错误")
            }))
        }, a.getzjxmcontact = function(a, c) {
            e || (e = 1, d.Ajax.post(b("service/businesscard/getzjxmcontact"), "zjxmid=" + a, function(a) {
                e = 0;
                var b = "http://www" + window.location.host.substring(location.host.indexOf("."), location.host.length);
                if (200 == a.code) {
                    if ("function" == typeof c) return c(a), void 0
                } else if (500 == a.code) {
                    var f = require("module/common/login");
                    f.dialog()
                } else 201 == a.code ? d.ui.confirm(a.error, "了解VIP会员", function() {
                    window.location.href = b + "/service_B_RONGZI.html"
                }) : 202 == a.code ? d.ui.confirm(a.error, "申请实地认证", function() {
                    window.location.href = b + "/zt/certification.html"
                }) : d.ui.alert(a.data.error_message || a.error)
            }, function() {
                e = 0, d.ui.error("系统错误")
            }))
        }, a.sendCompany = function(a, b) {
            d.ui.loading(), d.Ajax.post("/service/deliveryCompany/fbox_for_manage", "company=" + a + "&type=1", function(a) {
                200 == a.code ? (d.ui.sendCompany(a.data), b()) : d.ui.alert(a.data), 500 == a.code && d.ui.alert("您的登录已失效，请刷新重新登录")
            })
        }, a.sendZjxm = function(a, b) {
            d.Ajax.post("/service/deliveryZjxm/fbox_for_manage", "zjxm=" + a + "&type=1", function(a) {
                200 == a.code ? (d.ui.sendCompany(a.data), b()) : d.ui.alert(a.data), 500 == a.code && d.ui.alert("您的登录已失效，请刷新重新登录")
            })
        }, a.sendMessage = function(a, c, f) {
            return "" == a ? (d.ui.alert("收信人不能为空"), !1) : "" == c ? (d.ui.alert("内容不可为空"), !1) : (e || (e = 1, d.Ajax.post(b("msg/save"), {
                uid: a,
                fid: 0,
                f_type: 0,
                type: 2,
                msg: c
            }, function(a) {
                if (e = 0, 0 == a.code) {
                    if ("function" == typeof f) return f(a), void 0;
                    d.ui.success("发送成功")
                } else d.ui.alert(a.msg)
            }, function() {
                e = 0, d.ui.error("发送失败")
            })), void 0)
        }, a.delMsg = function(a, c) {
            return "" == a ? (d.ui.alert("请选择要删除的对话！"), !1) : (d.Core.isLogin() && d.ui.confirm("确定要删除该条私信吗？", function() {
                d.Ajax.post(b("service/message.delmsg"), {
                    id: a
                }, function(a) {
                    if (200 == a.code) {
                        if ("function" == typeof c) return c(a), void 0;
                        d.ui.success("删除成功")
                    } else d.ui.alert("删除失败")
                }, function() {
                    d.ui.error("删除失败")
                })
            }), void 0)
        }, a.delList = function(a, c) {
            return "" == a ? (d.ui.alert("请选择要删除的私信！"), !1) : (d.Core.isLogin() && d.ui.confirm("确定要删除该条私信吗？", function() {
                d.Ajax.post(b("service/message.dellist"), {
                    list_id: a
                }, function(a) {
                    if (200 == a.code) {
                        if ("function" == typeof c) return c(a), void 0;
                        d.ui.success("删除成功")
                    } else d.ui.alert("删除失败")
                }, function() {
                    d.ui.error("删除失败")
                })
            }), void 0)
        }
    }), define("page/member/front_businesscard", function(require, a) {
        a.init = function() {
            var a = require("jquery"),
                b = require("page/member/businesscard"),
                c = a("a");
            c.filter('[event="click.exchange"]').off("click").on("click", function() {
                var c = a(this);
                b.exchange(c.parent().attr("data-id"), function(a) {
                    if (1 == a.data.status) c.html("发私信"), c.attr("href", "/manage/private_message/detail/uid/" + c.parent().attr("data-id") + ".html"), c.unbind();
                    else {
                        var b = c.attr("class");
                        b.indexOf("small") > 0 ? c.parent().html('<span class="ui-btn-small ui-btn-gray">已递送名片</span>') : c.parent().html('<span class="ui-btn ui-btn-gray">已递送名片</span>')
                    }
                })
            }), c.filter('[event="click.sendCompany"]').off("click").on("click", function() {
                var c = a(this);
                b.sendCompany(c.parent().attr("data-id"), function() {})
            }), c.filter('[event="click.getcontact"]').off("click").on("click", function() {
                var c = a(this);
                b.getcontact(c.parent().attr("data-id"), function(b) {
                    var d = a("#J_view_contact_name");
                    if (d.length > 0) {
                        d.html(b.data.contact_name + b.data.contact_sex_name), a("#J_view_company_name").html(b.data.company);
                        var e = "";
                        return b.data.contact_job_name && (e += "职位：" + b.data.contact_job_name + "<br/>"), b.data.mobile && (e += "手机：" + b.data.mobile + "<br/>"), b.data.phone && (e += "电话：" + b.data.phone + "<br/>"), b.data.email && (e += "邮箱：" + b.data.email + "<br/>"), "ppt" == c.attr("data-type") ? (a("#" + c.attr("data-dst")).append(e), c.remove(), void 0) : (c.parent().prev().addClass("m-hyxm-ittext").append(e), c.parent().next().show(), c.parent().remove(), void 0)
                    }
                    var e = '<p class=" line24"><span class="font14">' + b.data.contact_name + "</span>" + b.data.contact_sex_name;
                    b.data.company && (e += "<br/>" + b.data.company), b.data.contact_job_name && (e += "<br/>职位：" + b.data.contact_job_name), b.data.mobile && (e += "<br/>手机：" + b.data.mobile), b.data.phone && (e += "<br/>电话：" + b.data.phone), b.data.email && (e += "<br/>邮箱：" + b.data.email), c.parent().parent().html(e)
                }, 1)
            }), c.filter('[event="click.getzjxmcontact"]').off("click").on("click", function() {
                var c = a(this);
                b.getzjxmcontact(c.parent().attr("data-id"), function(b) {
                    var d = "http://www" + window.location.host.substring(location.host.indexOf("."), location.host.length);
                    if (200 == b.code) {
                        a("#J_view_contact_name").html(b.data.contact_name);
                        var e = "";
                        return b.data.company && (e += "公司：" + b.data.company + "<br/>"), b.data.contact_job_name && (e += "职位：" + b.data.contact_job_name + "<br/>"), b.data.mobile && (e += "手机：" + b.data.mobile + "<br/>"), b.data.phone && (e += "电话：" + b.data.phone + "<br/>"), b.data.email && (e += "邮箱：" + b.data.email + "<br/>"), c.parent().prev().addClass("m-hyxm-ittext").append(e), c.parent().next().show().next().hide(), c.parent().remove(), void 0
                    }
                    if (500 == b.code) {
                        var f = require("module/common/login");
                        f.dialog()
                    } else 201 == b.code ? Trjcn.ui.confirm(b.error, "了解VIP会员", function() {
                        window.location.href = d + "/service_B_RONGZI.html"
                    }) : 202 == b.code ? Trjcn.ui.confirm(b.error, "了解VIP会员", function() {
                        window.location.href = d + "/service_B_TOUZI.html"
                    }) : Trjcn.ui.alert(b.data.error_message || b.error)
                })
            });
            var c = a(".table-part-all a");
            c.filter('[event="click.sendZjxm"]').off("click").on("click", function() {
                var c = a(this);
                b.sendZjxm(c.parent().attr("data-id"), function() {})
            })
        }, a.init()
    }), define("module/common/mobile_code", function(require, a) {
        function b(a) {
            switch (a) {
                case "phone":
                    window.phoneCode.voice();
                    break;
                case "mobile":
                    window.mobileCode.voice()
            }
        }

        function c() {
            var a = {
                mobile: null,
                mobileId: null,
                mobileHand: null,
                mobileInfoHand: null,
                process: !1,
                smsid: 0,
                time: 60,
                nt: 60,
                succMsg: "",
                hasCaptcha: !0,
                interval: function() {
                    var a, b = this,
                        c = f.codetime,
                        e = function() {
                            b.time = b.time - 1, b.time > 0 ? (b.btn.html(c.replace("[s]", b.time)), b.btn.addClass("popup-code-cur").show()) : (a && clearInterval(a), b.time = b.nt, b.btn.html(f.mobile_btn).removeClass("popup-code-cur"), b.mobileInfoHand.html(b.succMsg).css({
                                display: "block"
                            }), b.mobileInfoHand.attr("data-code-msg", b.succMsg), d("#T-" + b.mobileId + "-voice-df").show(), b.mobileHand.removeAttr("readonly"))
                        };
                    a && clearInterval(a), e(), a = setInterval(e, 1e3)
                },
                voice: function() {
                    var a = this;
                    a.mobile && a.mobile == a.mobileHand.val() && a.smsid && !e.cache.voice && (e.cache.voice = !0, e.Ajax.post("/api/mobile_regcode_voice", "smsid=" + a.smsid, function(b) {
                        if (e.cache.voice = !1, 200 == b.code) {
                            var c = "请准备接听来自125909888601的自动语音呼入电话";
                            a.mobileInfoHand.html(c).css({
                                display: "block"
                            }), a.mobileInfoHand.attr("data-code-msg", c), a.mobileHand.attr("readonly"), d("#T-" + a.mobileId + "-voice-df").hide(), a.time == a.nt && a.interval()
                        }
                    }))
                },
                captcha: function() {
                    if (d("#J_mobile_captcha_img").length > 0) return d("#J_mobile_captcha_msg").html("请输入图片验证码"), void 0;
                    var a = this;
                    window.mobileSendBtn = d("#T-reg-" + a.mobileId + "-code"), "object" == typeof seajs && seajs.use(["jquery", "module/common/dialog"], function(a, b) {
                        var c = "http://www" + location.host.substring(location.host.indexOf("."), location.host.length);
                        window.dlgCaptcha = b.dialog({
                            title: "请输入图片验证码",
                            content: '<article class="part-fieldset" style="overflow:hidden; zoom:1;"><section class="part-fieldset-section" style="width:100% ; padding:0; display:inline-block; color:#999;"><input type="text" class="t_input w140" id="J_mobile_captcha" maxlength="4" style="border-radius:5px;height:28px; border:1px solid #ddd; background:#fff; line-height:28px; padding:0 10px; width:248px; margin-right:5px; display:inline-block; vertical-align:middle; position:relative;"><img id="J_mobile_captcha_img" style="vertical-align:middle;border-radius:5px;" src="' + c + "/util/captcha_page.html?" + Math.random() + '" onclick="this.src=\'' + c + '/util/captcha_page.html?\'+Math.random()" alt="验证码"> <span class="part-fieldset-msg" id="J_mobile_captcha_msg" style="color:red"></span></section></article>',
                            width: "255px",
                            ok: function() {
                                var b = a("#J_mobile_captcha").val();
                                return b ? (window.captchaVal = b, window.mobileSendBtn.trigger("click"), !1) : (a("#J_mobile_captcha_msg").html("请输入计算结果"), a("#J_mobile_captcha").focus(), !1)
                            }
                        })
                    })
                },
                init: function(a, b) {
                    var b = b || "/api/mobile_regcode_send",
                        c = function() {},
                        g = this;
                    a || (c = require("module/common/dialog")), g.mobileId = a || "mobile", g.succMsg = "验证码已发送，若未收到，请先到拦截信息中查找";
                    var h = (d("#J_" + g.mobileId + "_info"), d("#J_" + g.mobileId));
                    g.mobileHand = h, g.mobileInfoHand = d("#J_" + g.mobileId + "_info"), g.process = !1, g.time = g.nt, window.captchaVal = "", d("#T-reg-" + g.mobileId + "-code").on("click", function() {
                        if (g.time == g.nt && !g.process) {
                            var i = d(this),
                                j = h.val();
                            if (!j || j.indexOf("手机号码") > -1) return a ? void 0 == g.mobileInfoHand.html() ? alert("请输入您的手机号码") : g.handmsg("请输入您的手机号码") : g.handmsg('<span><i class="icoPro16"></i>请输入您的手机号码</span>'), void 0;
                            if (!e.Util.isMobile(j)) return a ? void 0 == g.mobileInfoHand.html() ? alert("手机号码格式不对") : g.handmsg("手机号码格式不正确") : g.handmsg('<span><i class="icoPro16"></i>手机号码格式不正确</span>'), void 0;
                            if (g.hasCaptcha === !0) {
                                if (d("#J_mobile_captcha").length > 0 && (window.captchaVal = d("#J_mobile_captcha").val()), "" == window.captchaVal) return g.captcha(), void 0;
                                d("#verify_code").hide()
                            }
                            g.btn = g.btntxt = i, 1 == i.find("i").length && (g.btntxt = i.find("i"), f.mobile_btn = g.btntxt.attr("label")), g.process = !0;
                            var k = function(b) {
                                    if (b.time && (g.nt = parseInt(b.time)), b.data && b.data.time && (g.time = parseInt(b.data.time)), g.process = !1, g.mobileInfoHand.hide(), window.captchaVal = "", d("#J_mobile_captcha_msg").html(""), 520 == b.code) return g.captcha(), void 0;
                                    if (521 == b.code) return d("#J_mobile_captcha_img").trigger("click"), d("#J_mobile_captcha_msg").html(b.data.msg), void 0;
                                    try {
                                        window.dlgCaptcha && window.dlgCaptcha.close().remove()
                                    } catch (e) {}
                                    if (200 == b.code) a ? (g.smsid = b.data.smsid, g.mobile = j, g.mobileHand.attr("readonly", !0)) : c.dialog({
                                        width: "300px",
                                        lock: !0,
                                        fixed: !0,
                                        okValue: "确定",
                                        ok: function() {},
                                        content: "您好，您手机接收到的验证码将作为您登录投融界的登录密码使用，请妥善保管。",
                                        onclose: function() {
                                            g.smsid = b.data.smsid, g.mobile = j, g.mobileHand.attr("readonly", !0), b.data.smsid || (g.succMsg = f.mobile_code_ok), d("#T-" + g.mobileId + "-voice-info").show(), g.handmsg(g.succMsg).css({
                                                display: "block"
                                            }), g.interval(), window.Trjcn.cache.voiceid = a
                                        }
                                    });
                                    else {
                                        if (203 != b.code) return g.handmsg(b.data.error).show(), d("#T-" + g.mobileId + "-voice-info").hide(), void 0;
                                        a ? (g.smsid = b.data.smsid, g.mobile = j, g.mobileHand.attr("readonly", !0), g.time = parseInt(b.data.time)) : (g.smsid = b.data.smsid, g.mobile = j, g.mobileHand.attr("readonly", !0), g.time = parseInt(b.data.time), b.data.smsid || (g.succMsg = f.mobile_code_ok), d("#T-" + g.mobileId + "-voice-info").show(), g.handmsg(g.succMsg).css({
                                            display: "block"
                                        }), g.interval(), window.Trjcn.cache.voiceid = a)
                                    }
                                    a && (g.succMsg = b.data.smsid ? '验证码已发送，若60秒未收到，可点击<a href="javascript:;" class="red mobile_voice_' + g.mobileId + '" style="text-decoration:underline;">语音播报验证码</a>' : f.mobile_code_ok, d("#T-" + g.mobileId + "-voice-info").show(), g.handmsg(g.succMsg).css({
                                        display: "block"
                                    }), g.mobileInfoHand.find(".mobile_voice_" + g.mobileId).on("click", function() {
                                        g.voice()
                                    }), g.interval(), window.Trjcn.cache.voiceid = a)
                                },
                                l = function() {
                                    g.process = !1, g.handmsg("发送过于频繁请稍后再试！").css({
                                        display: "block"
                                    })
                                };
                            if (a) var m = "mobile=" + j;
                            else var m = "mobile=" + j + "&msg=common";
                            m += "&mobilecaptcha=" + window.captchaVal, e.Ajax.post(b, m, k, l)
                        }
                    })
                },
                init_page: function(a, b) {
                    var b = b || "/api/mobile_regcode_send",
                        c = function() {},
                        g = this;
                    a || (c = require("module/common/dialog")), g.mobileId = a || "mobile", g.succMsg = "验证码已发送，若未收到，请先到拦截信息中查找";
                    var h = (d("#J_" + g.mobileId + "_info"), d("#J_" + g.mobileId));
                    g.mobileHand = h, g.mobileInfoHand = d("#J_" + g.mobileId + "_info"), g.process = !1, g.time = g.nt, window.captchaVal = "", d("#T-reg-" + g.mobileId + "-code").on("click", function() {
                        if (g.time == g.nt && !g.process) {
                            var i = d(this),
                                j = h.val();
                            if (!j || j.indexOf("手机号码") > -1) return a ? void 0 == g.mobileInfoHand.html() ? alert("请输入您的手机号码") : g.handmsg("请输入您的手机号码") : g.handmsg('<span><i class="icoPro16"></i>请输入您的手机号码</span>'), void 0;
                            if (!e.Util.isMobile(j)) return a ? void 0 == g.mobileInfoHand.html() ? alert("手机号码格式不对") : g.handmsg("手机号码格式不正确") : g.handmsg('<span><i class="icoPro16"></i>手机号码格式不正确</span>'), void 0;
                            if (d("#login_yzcode").length > 0) window.captchaVal = d("#login_yzcode").val();
                            else if ("" == window.captchaVal) return g.captcha(), void 0;
                            if ("" == window.captchaVal || "输入计算结果" === window.captchaVal) return g.mobileInfoHand.html(""), d("#J_mobile_msg_info").html("请输入计算结果").show(), void 0;
                            d("#J_mobile_msg_info").hide(), g.btn = g.btntxt = i, 1 == i.find("i").length && (g.btntxt = i.find("i"), f.mobile_btn = g.btntxt.attr("label")), g.process = !0;
                            var k = function(b) {
                                    if (b.time && (g.nt = b.time), b.data && b.data.time && (g.time = parseInt(b.data.time)), g.process = !1, g.mobileInfoHand.hide(), window.captchaVal = "", 520 != b.code)
                                        if (521 != b.code) {
                                            try {
                                                window.dlgCaptcha && window.dlgCaptcha.close().remove()
                                            } catch (e) {}
                                            if (200 == b.code) a ? (g.smsid = b.data.smsid, g.mobile = j, g.mobileHand.attr("readonly", !0)) : c.dialog({
                                                width: "300px",
                                                lock: !0,
                                                fixed: !0,
                                                okValue: "确定",
                                                ok: function() {},
                                                content: "您好，您手机接收到的验证码将作为您登录投融界的登录密码使用，请妥善保管。",
                                                onclose: function() {
                                                    g.smsid = b.data.smsid, g.mobile = j, g.mobileHand.attr("readonly", !0), b.data.smsid || (g.succMsg = f.mobile_code_ok), d("#T-" + g.mobileId + "-voice-info").show(), g.handmsg(g.succMsg).css({
                                                        display: "block"
                                                    }), g.interval(), window.Trjcn.cache.voiceid = a
                                                }
                                            });
                                            else {
                                                if (203 != b.code) return g.handmsg(b.data.error).show(), d("#T-" + g.mobileId + "-voice-info").hide(), void 0;
                                                a ? (g.smsid = b.data.smsid, g.mobile = j, g.mobileHand.attr("readonly", !0), g.time = parseInt(b.data.time)) : (g.smsid = b.data.smsid, g.mobile = j, g.mobileHand.attr("readonly", !0), g.time = parseInt(b.data.time), b.data.smsid || (g.succMsg = f.mobile_code_ok), d("#T-" + g.mobileId + "-voice-info").show(), g.handmsg(g.succMsg).css({
                                                    display: "block"
                                                }), g.interval(), window.Trjcn.cache.voiceid = a)
                                            }
                                            a && (g.succMsg = b.data.smsid ? '验证码已发送，若60秒未收到，可点击<a href="javascript:;" class="red mobile_voice_' + g.mobileId + '" style="text-decoration:underline;">语音播报验证码</a>' : f.mobile_code_ok, d("#T-" + g.mobileId + "-voice-info").show(), g.handmsg(g.succMsg).css({
                                                display: "block"
                                            }), g.mobileInfoHand.find(".mobile_voice_" + g.mobileId).on("click", function() {
                                                g.voice()
                                            }), g.interval(), window.Trjcn.cache.voiceid = a)
                                        } else {
                                            d("#yzimg").trigger("click"), g.mobileInfoHand.html(""), d("#J_mobile_msg_info").html("计算结果不正确").show();
                                            try {
                                                window.dlgCaptcha && d("#J_mobile_captcha_msg").html("请输入计算结果").show() && d("#J_mobile_captcha_img").trigger("click")
                                            } catch (e) {}
                                        }
                                    else {
                                        g.mobileInfoHand.html(""), d("#J_mobile_msg_info").html("请输入计算结果").show();
                                        try {
                                            window.dlgCaptcha && d("#J_mobile_captcha_msg").html("请输入计算结果").show()
                                        } catch (e) {}
                                    }
                                },
                                l = function() {
                                    g.process = !1, g.handmsg("发送过于频繁请稍后再试！").css({
                                        display: "block"
                                    })
                                };
                            if (a) var m = "mobile=" + j;
                            else var m = "mobile=" + j + "&msg=common";
                            m += "&mobilecaptcha=" + window.captchaVal, e.Ajax.post(b, m, k, l)
                        }
                    })
                },
                handmsg: function(a) {
                    var b = this;
                    return b.mobileInfoHand.html(a)
                }
            };
            return a
        }
        var d = require("jquery"),
            e = {
                cache: {},
                Ajax: {
                    dataType: "json",
                    type: "POST",
                    post: function(a, b, c, d) {
                        e.Ajax.type = "POST", e.Ajax.request(a, b, c, d)
                    },
                    jsonp: function(a, b, c, e) {
                        d.ajax({
                            type: "POST",
                            url: a,
                            dataType: "jsonp",
                            jsonp: "callback",
                            data: b,
                            success: function(a) {
                                "function" == typeof c && c(a)
                            },
                            error: function(a) {
                                "function" == typeof e && e(a)
                            }
                        })
                    },
                    request: function(a, b, c, f) {
                        d.ajax({
                            type: e.Ajax.type,
                            url: a,
                            dataType: e.Ajax.dataType,
                            data: b + "&_t=20150723",
                            success: function(a) {
                                500 != a.code && "function" == typeof c && c(a)
                            },
                            error: function(a) {
                                "function" == typeof f && f(a)
                            }
                        })
                    }
                },
                Util: {
                    isMobile: function(a) {
                        return /^1(3[0-9]|4[0-9]|5[0-9]|7[0|1|3|5|6|7|8]|8[0-9])\d{8}$/.test(a)
                    }
                }
            },
            f = {
                mobile_error: "请输入正确的手机号码",
                chinese_error: "只允许输入中文",
                passwd_error: "请输入6-20位字符组成的密码",
                newpwd_matches: "确认新密码输入不一致",
                email_error: "请输入正确的邮箱地址",
                ps_username_error: "请输入您的真实姓名",
                password_error: "请输入6-20位字符组成的密码",
                password_matches: "确认密码输入不一致",
                mobile_code: "请输入您收到的手机验证码",
                mobile_code_ok: "验证码已发送，若未收到，请先到拦截信息中查找，仍未发现请联系客服",
                mobile_code_ok2: "验证码已发送，若未收到，请先到拦截信息中查找，仍未发现请联系客服",
                mobile_btn: "获取验证码",
                codetime: "[s]秒后重新发送",
                codetime2: '验证码已发送，请在<font color="red">{$s}</font>秒后重新获取，若未收到，请在拦截信息中查找或直接<a href="http://chat.53kf.com/webCompany.php?arg=trjcn&style=1" target="_blank"><span style="text-decoration: underline;color:red;">联系客服</span></a>',
                neterror: "网络异常，请重试！",
                isIdCard_error: "身份证号码错误！"
            };
        a.MobileCode = c, a.MobileVoice = b
    }), define("page/v6/message", function(require) {
        var a = jQuery = require("jquery"),
            b = require("module/common/dialog"),
            c = require("component/trjcn"),
            d = function() {
                return "placeholder" in document.createElement("input")
            }(),
            e = {
                initialize: function(e, f) {
                    var g = function(c) {
                        c.msg = a("#leave_msg_content").val(), c.public = a("#public").val(), a.ajax({
                            url: "/service/msg/save",
                            type: "POST",
                            dataType: "JSON",
                            data: c,
                            success: function(c) {
                                if (c.code) {
                                    if ("20000" == c.code) {
                                        var d = a("#comment_login_reg");
                                        return d.removeClass("fn-hide"), b.dialog_ok("登录检测失败，请登录后再发布留言"), e = 0, void 0
                                    }
                                    return "20044" == c.code || "20045" == c.code ? (b.dialog({
                                        title: "温馨提示",
                                        content: '<p style="text-align:center;height:40px;margin-top:10px;">' + c.msg + "</p>",
                                        okValue: "立即申请",
                                        ok: function() {
                                            var a = window.T_Config && window.T_Config.baseUrl ? window.T_Config.baseUrl : "";
                                            window.location.href = "20044" == c.code ? a + "/help/detail_151277.html" : a + "/service_B_TOUZI.html"
                                        },
                                        onclose: function() {}
                                    }), void 0) : (b.dialog_ok(c.msg), void 0)
                                }
                                b.dialog({
                                    title: "温馨提示",
                                    content: '<p style="text-align:center;height:40px;margin-top:10px;">留言成功，请等待审核!</p>',
                                    ok: function() {},
                                    onclose: function() {
                                        var a = window.location.pathname,
                                            b = a.indexOf("company_");
                                        if (b > 0) {
                                            var c = a.indexOf("/", b);
                                            0 > c && (c = a.indexOf(".", b));
                                            var d = a.length - b + 1;
                                            c > 0 && (d = c - b + 1);
                                            var e = a.substring(b + 8, d);
                                            return window.location.href = "http://" + window.location.host + "/company_" + e + "/message.html#tab", void 0
                                        }
                                    }
                                }), a("#leave_msg_content").val("")
                            },
                            error: function() {
                                b.dialog_ok("对不起，留言失败!")
                            }
                        })
                    };
                    a(".j-hover-all ul").on("click", function(b) {
                        var c = a(this),
                            d = c.prev(),
                            e = a(b.target),
                            f = e.data("scope");
                        a("#public").attr("value", f), d.text(e.text())
                    }), a("#leave_msg_content").on("keyup", function() {
                        var b = a(this),
                            c = b.attr("maxlength") || 300,
                            d = c - b.val().length,
                            e = a("#leave_msg_input_tip");
                        e && (0 > d ? e.html('<span class="colye">您输入的内容，已超过' + c + "个字，请重新编辑</span>") : 0 != d ? e.html('还可输入<span class="colye">' + d + "</span>个字") : e.html("已经" + c + "个字了"))
                    }), a(".btn-publish-leave-msg").on("click", function() {
                        var h = a("#leave_msg_content"),
                            i = h.val(),
                            j = i.length;
                        if (0 == j) return b.dialog_ok("留言内容不能为空"), void 0;
                        if (j > 300) return b.dialog_ok("留言内容最多只能300个字符"), void 0;
                        if (e) return g(f), void 0;
                        var k = a("#J_name"),
                            l = k.val();
                        if (!l || "姓名" == l) return b.dialog_ok("请输入姓名"), void 0;
                        if (!c.Util.isChinese(l)) return b.dialog_ok("请输入您的中文姓名"), k.focus(), void 0;
                        var m = a("#J_mobile_msg"),
                            n = m.val();
                        if (!n || "手机号码" == n) return b.dialog_ok("请输入您的手机号码"), void 0;
                        if (!c.Util.isMobile(n)) return b.dialog_ok("请输入您的真实手机号码"), m.focus(), void 0;
                        var o = "type=umessage&name=" + l + "&mobile=" + n + "&url=";
                        o += "&message=" + i + "&fromurl=" + document.location.href, c.cache.imgcode && (o += "&imgcode=" + c.cache.imgcode), c.cache.submit = !0;
                        var p = "/api/guest/submit";
                        a.ajax({
                            url: p,
                            type: "POST",
                            dataType: "JSON",
                            data: o,
                            success: function(a) {
                                if (100 == a.code) return b.dialog_ok("您已成功提交多次了"), void 0;
                                if (101 == a.code) return b.dialog_ok("验证码不正确"), void 0;
                                if (a.data && a.data.message) b.dialog_ok(a.data.message), 200 == a.code && (h.val(""), d || h.parent().find(".prompt_pass").css("display", "block"), m.val(""), d || m.parent().find(".prompt_pass").css("display", "block"), k.val(""), d || k.parent().find(".prompt_pass").css("display", "block"));
                                else if (a.data && a.data.error_messages)
                                    for (var c in a.data.error_messages) {
                                        b.dialog_ok(a.data.error_messages[c]);
                                        break
                                    } else b.dialog_ok("留言失败")
                            },
                            error: function() {
                                b.dialog_ok("留言异常")
                            }
                        })
                    })
                }
            };
        return {
            initialize: function(a, b) {
                e.initialize(a, b)
            }
        }
    }), define("page/v6/rzjsq_260", function() {
        seajs.use(["jquery", "module/common/dialog", "module/common/mobile_code", "page/common"], function(a, b, c) {
            function d(b) {
                a.ajax({
                    url: "/api/industry.html?id=" + b,
                    type: "GET",
                    dataType: "json",
                    beforeSend: function() {
                        a("#industrySelectTips").hide(), a("#industrySelectTipsLoading").show()
                    },
                    success: function(b) {
                        a("#industrySelectTipsLoading").hide(), a("#industrySelectTips").show(), a("#funds").html(b.zijin_num), a("#project").html(b.xiangmu_num)
                    }
                })
            }

            function e() {
                1 == g() && (window.Trjcn.LoginID ? h(1) : f())
            }

            function f() {
                var c = a("#frmRegOrLogin"),
                    d = "/ajax/login/logreg",
                    e = c.serialize();
                a.ajax({
                    url: d,
                    type: "POST",
                    dataType: "JSON",
                    data: e,
                    success: function(a) {
                        return "200" == a.code ? (h(0), void 0) : (a.data && a.data.msg ? b.dialog_ok(a.data.msg) : b.dialog_ok("网络异常，请重试！"), void 0)
                    },
                    error: function() {
                        b.dialog_ok("网络异常，请重试！")
                    }
                })
            }

            function g() {
                var b = 0;
                return a("#J_mobile_msg_code , #J_mobile_msg , #content").each(function() {
                    var c = a.trim(a(this).val()),
                        d = a(this).attr("name");
                    if (c == a(this).attr("tip") && (c = ""), "" == c) return j.html(a(this).attr("title") + "不能为空").show(), b = 1, !1;
                    if ("content" == d) {
                        var e = /^[\d\u4E00-\u9FA5\uF900-\uFA2D]+$/;
                        if (0 == e.test(c)) return j.html("融资金额只能为中文和数字").show(), b = 1, !1
                    } else if ("mobile" == d && !Trjcn.Util.isMobile(c)) return j.html("请输入正确的手机号码").show(), b = 1, !1
                }), 0 == b ? !0 : !1
            }

            function h(c) {
                var d = "mobile=" + a("#J_mobile_msg").val() + "&content=项目名称:" + a("#content").val();
                Trjcn.Ajax.post("/item_publish_quick/quick_save", d, function(a) {
                    i(a.data.error_messages) !== !1 && 200 == a.code && (b.dialog_ok("恭喜，您已经提交成功，请耐心等候。"), document.getElementById("J_dialog_close").onclick = function() {
                        c ? window.location.reload() : window.location.href = $base_url + "/register/success.html"
                    })
                }, function() {
                    b.dialog_ok("网络异常，请重试！")
                })
            }

            function i(a) {
                if ("undefined" != typeof a) {
                    var c = "";
                    for (var d in a) {
                        c += a[d];
                        break
                    }
                    return b.dialog_ok(c), !1
                }
            }
            var j = a("#J_mobile_msg_info");
            0 != j.length && (window.phoneCode = new c.MobileCode, window.phoneCode.init_page("mobile_msg", "/api/mobile_reglogin_send.html"), a(".accelerator-all section").hover(function() {
                a(this).addClass("hover")
            }, function() {
                a(this).removeClass("hover")
            }), a(".accelerator-all section a").click(function() {
                a("#industry_name").html(a(this).html()), a(".accelerator-all section").removeClass("hover"), a("#industry_id").val(a(this).attr("value")), d(a(this).attr("value"))
            }), a(".financingBtn").click(function() {
                e()
            }), a("#J_mobile_msg_code , #J_mobile_msg , #content,#login_yzcode").each(function() {
                a(this).click(function() {
                    var b = a.trim(a(this).val());
                    b == a(this).attr("tip") && a(this).val("")
                })
            }), a("#industrySelectTips").each(function() {
                d(23)
            }))
        })
    }), define("jquery-mousewheel", function() {}),
    function(a) {
        "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
    }(function(a) {
        function b(b) {
            var e, f = b || window.event,
                g = [].slice.call(arguments, 1),
                h = 0,
                i = 0,
                j = 0,
                k = 0,
                l = 0;
            return b = a.event.fix(f), b.type = "mousewheel", f.wheelDelta && (h = f.wheelDelta), f.detail && (h = -1 * f.detail), f.deltaY && (j = -1 * f.deltaY, h = j), f.deltaX && (i = f.deltaX, h = -1 * i), void 0 !== f.wheelDeltaY && (j = f.wheelDeltaY), void 0 !== f.wheelDeltaX && (i = -1 * f.wheelDeltaX), k = Math.abs(h), (!c || c > k) && (c = k), l = Math.max(Math.abs(j), Math.abs(i)), (!d || d > l) && (d = l), e = h > 0 ? "floor" : "ceil", h = Math[e](h / c), i = Math[e](i / d), j = Math[e](j / d), g.unshift(b, h, i, j), (a.event.dispatch || a.event.handle).apply(this, g)
        }
        var c, d, e = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
            f = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"];
        if (a.event.fixHooks)
            for (var g = e.length; g;) a.event.fixHooks[e[--g]] = a.event.mouseHooks;
        a.event.special.mousewheel = {
            setup: function() {
                if (this.addEventListener)
                    for (var a = f.length; a;) this.addEventListener(f[--a], b, !1);
                else this.onmousewheel = b
            },
            teardown: function() {
                if (this.removeEventListener)
                    for (var a = f.length; a;) this.removeEventListener(f[--a], b, !1);
                else this.onmousewheel = null
            }
        }, a.fn.extend({
            mousewheel: function(a) {
                return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
            },
            unmousewheel: function(a) {
                return this.unbind("mousewheel", a)
            }
        })
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
    }), define("component/placetext", function(require) {
        var a = require("jquery"),
            b = {
                _isInit: !1,
                _check: function() {
                    return "placeholder" in document.createElement("input")
                },
                init: function() {
                    this._check() || this.fix()
                },
                fix: function() {
                    jQuery(":input[placeholder]").each(function() {
                        var b = a(this),
                            c = b.attr("placeholder");
                        if ("1" != b.attr("ph")) {
                            b.attr("pl", 1).wrap(a('<div id="hes"></div>').css({
                                position: "relative",
                                zoom: "1",
                                border: "none",
                                background: "none",
                                padding: "none",
                                margin: "none"
                            }));
                            var d = b.position(),
                                e = b.outerHeight(!0),
                                f = b.css("padding-left"),
                                g = a('<span id="he"></span>').text(c).css({
                                    position: "absolute",
                                    left: d.left,
                                    top: d.top + b.css("padding-top"),
                                    height: e,
                                    lienHeight: e,
                                    paddingLeft: f,
                                    color: "#aaa"
                                }).appendTo(b.parent());
                            b.focusin(function() {
                                g.hide()
                            }).focusout(function() {
                                b.val() ? g.hide() : g.show()
                            }).trigger("focusout"), g.click(function() {
                                g.hide(), b.focus()
                            })
                        }
                    })
                }
            };
        return b.init(), {
            placeholder: function() {
                b.init()
            }
        }
    }), define(function() {
        seajs.use(["jquery"]), seajs.use(["module/pages/common"]), seajs.use(["component/trjcn"]), seajs.use(["page/v6/openapi"]), seajs.use(["page/v6/lib.login_user"]), seajs.use(["module/common/dialog"]), seajs.use(["module/common/login"]), seajs.use(["jquery.form"]), seajs.use(["component/jquery.hover"]), seajs.use(["component/SuperSlide/SuperSlide"]), seajs.use(["module/matches"]), seajs.use(["component/jquery.tabs"]), seajs.use(["component/jquery.cookie"]), seajs.use(["page/v6/lib.gotop"]), seajs.use(["page/v6/lib.header"]), seajs.use(["page/v6/lib.history"]), seajs.use(["page/v6/lib.zjxm_view"]), seajs.use(["page/v6/home_foot"]), seajs.use(["module/common/invite"]), seajs.use(["module/common/deliver"]), seajs.use(["module/ajax/ajax"]), seajs.use(["page/member/front_businesscard"]), seajs.use(["module/common/mobile_code"]), seajs.use(["page/v6/message"]), seajs.use(["page/v6/rzjsq_260"]), seajs.use(["component/Scrollbar/jquery.mCustomScrollbar.concat.min"]), seajs.use(["component/placetext"])
    });