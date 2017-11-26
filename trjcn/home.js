define(function(require) {
            require("build/base"), seajs.use(["jquery", "module/common/dialog"], function(a, b) {
                        a(document).on("click", "a.J_do_meeting_apply", function() {
                                if (!Trjcn.LoginID) return seajs.use(["module/common/login"], function(a) {
                                    a.dialog()
                                }), void 0;
                                var c = a(this).attr("data-id");
                                seajs.use(["module/pages/common", "jquery.form"], function() {
                                    b.close(), b.dialog({
                                        title: "约见投资人",
                                        width: "600px",
                                        ajax: {
                                            url: "/investor/apply",
                                            dataType: "html",
                                            data: "_=&inv_id=" + c,
                                            callback: function(c, d) {
                                                d.content(c), window.dl = d, a("#J_dialog_close").click(function() {
                                                    try {
                                                        window.dl.close().remove()
                                                    } catch (a) {}
                                                });
                                                var e = new formValidator;
                                                e.init("J_deliver_frm"), e.errtip = function(a, b, c) {
                                                    if (a) {
                                                        switch (b = c === !0 ? languages[b] || "" : languages[b] || b, a.attr("name")) {
                                                            case "invite_content":
                                                                b = "请填写约见说明.";
                                                                break;
                                                            case "user_name":
                                                                b = "请输入联系人.";
                                                                break;
                                                            case "user_mobile":
                                                                b || (b = "请输入手机号码.")
                                                        }
                                                        return a.nextAll(".part-fieldset-msg").html('<em class="ui-text-red"><i class="icoErr16"></i>' + b + "</em>"), !1
                                                    }
                                                }, e.tip = function(a) {
                                                    a.nextAll(".part-fieldset-msg").html("")
                                                };
                                                var f = !1;
                                                a("#J_btn_send_guest").click(function() {
                                                    if (!e.isValid() && !f) {
                                                        f = !0;
                                                        var c = a("#J_deliver_frm").formSerialize();
                                                        a.ajax({
                                                            url: "/investor/apply/save",
                                                            type: "POST",
                                                            dataType: "json",
                                                            data: c,
                                                            success: function(c) {
                                                                if (f = !1, 200 == c.code) {
                                                                    if (c.data.forward_url) return location.href = c.data.forward_url, void 0;
                                                                    try {
                                                                        window.dl.close().remove()
                                                                    } catch (d) {}
                                                                    b.dialog_ok(c.data.msg)
                                                                } else a("#J_deliver_msg").html('<em class="ui-text-red"><i class="icoErr16"></i>' + c.data.msg + "</em>").show()
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        }
                                    })
                                })
                            }), seajs.use(["component/jquery.hover", "component/SuperSlide/SuperSlide", "module/matches", "component/jquery.tabs", "component/jquery.cookie"], function() {
                                a("#focus").each(function() {
                                    a("#J_focus_ul").append(a("#J_focus_html").html()), a(this).slide({
                                        titCell: ".focus-nav ul",
                                        mainCell: ".focus-images ul",
                                        effect: "fold",
                                        autoPlay: !0,
                                        autoPage: !0,
                                        trigger: "click"
                                    }), a(this).hover(function() {
                                        a(this).find(".prev,.next").stop(!0, !0).fadeTo("show", .5)
                                    }, function() {
                                        a(this).find(".prev,.next").fadeOut()
                                    })
                                }), a("#J_succ_slide").each(function() {
                                    a(this).find("li").length > 1 && (a(this).find("li").show(), a(this).slide({
                                        mainCell: "ul",
                                        vis: 1,
                                        effect: "leftLoop",
                                        autoPlay: !0
                                    }))
                                }), a("#J_home_success").each(function() {
                                    var b = a("section li", a(this));
                                    b.length <= 1 || (b.show(), a(this).slide({
                                        mainCell: "section ul",
                                        effect: "leftLoop",
                                        autoPlay: !0,
                                        autoPage: !0,
                                        trigger: "click",
                                        prevCell: ".sPrev",
                                        nextCell: ".sNext"
                                    }), a(this).hover(function() {
                                        a(this).find(".sPrev,.sNext").stop(!0, !0).fadeTo("show", 1)
                                    }, function() {
                                        a(this).find(".sPrev,.sNext").fadeOut()
                                    }))
                                }), a("#exhibition").slide({
                                    mainCell: ".exhibition-scroll ul",
                                    effect: "leftLoop",
                                    vis: 5,
                                    autoPlay: !0
                                }), a("#j_hot_news").each(function() {
                                    a(this).slide({
                                        mainCell: "ul",
                                        autoPlay: !0,
                                        interTime: 3e3,
                                        effect: "topLoop"
                                    })
                                }), a("#j_ct_database").each(function() {
                                    a(this).slide({
                                        mainCell: "ul",
                                        autoPlay: !0,
                                        interTime: 3e3,
                                        vis: 7,
                                        effect: "topLoop"
                                    })
                                })
                            }), a("button.J_search_submit").click(function() {
                                    var b = a(this).prev(".J_placeholder");
            b.val() == b.attr("tip") && b.val("") }), seajs.use(["page/v6/lib.gotop", "page/v6/home_foot", "page/v6/lib.header"]), a("#J_index_adv20170527").each(function() { var b = a(this);
            b.show().find("i.close").click(function() { b.remove() }) }) }), seajs.use(["page/v6/openapi", "page/v6/lib.login_user"], function(a, b) { a.add_method(b), a.docall() }) });