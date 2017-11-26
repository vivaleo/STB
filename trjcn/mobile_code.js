define(function(require,exports){
    var $=require('jquery');
	var Trjcn={
        cache:{},
        Ajax:{
		dataType:'json',
		type:'POST',
		post:function(url,param,callback_success,callback_error){
			Trjcn.Ajax.type = 'POST';
			Trjcn.Ajax.request(url,param,callback_success,callback_error);
		},
		jsonp:function(url,param,callback_success,callback_error){

			$.ajax({
					 type: 'POST',
					 url: url,
					 dataType:'jsonp',
					 jsonp:'callback',
					 data:param,
					 success: function(res){
						  if (typeof(callback_success)=='function')callback_success(res);
					 },
					 error:function(res){
						  if (typeof(callback_error)=='function')callback_error(res);
					 }
			});
		},
		request:function(url,param,callback_success,callback_error){
			$.ajax({
                 type: Trjcn.Ajax.type,
                 url: url,
                 dataType:Trjcn.Ajax.dataType,
				 data:param+'&_t=20150723',
                 success: function(res){
                      if (res.code==500){
                         return;
                      }
                      if (typeof(callback_success)=='function')callback_success(res);
                 },
                 error:function(res){
                      if (typeof(callback_error)=='function')callback_error(res);
                 }
			});
		}
	},
        Util:{
		isMobile : function(mobile) {
			return /^1(3[0-9]|4[0-9]|5[0-9]|7[0|1|3|5|6|7|8]|8[0-9])\d{8}$/.test(mobile);
		}
	}
    };
	var languages = {
		'mobile_error' : '请输入正确的手机号码',
		'chinese_error' : '只允许输入中文',
		'passwd_error' : '请输入6-20位字符组成的密码',
		'newpwd_matches' : '确认新密码输入不一致',
		'email_error' : '请输入正确的邮箱地址',
		'ps_username_error' : '请输入您的真实姓名',
		'password_error' : '请输入6-20位字符组成的密码',
		'password_matches' : '确认密码输入不一致',

		'mobile_code' : '请输入您收到的手机验证码',
		'mobile_code_ok' : '验证码已发送，若未收到，请先到拦截信息中查找，仍未发现请联系客服',
		'mobile_code_ok2' : '验证码已发送，若未收到，请先到拦截信息中查找，仍未发现请联系客服',
		'mobile_btn' : '获取验证码',
		'codetime' : '[s]秒后重新发送',
		'codetime2' : '验证码已发送，请在<font color="red">{$s}</font>秒后重新获取，若未收到，请在拦截信息中查找或直接<a href="http://chat.53kf.com/webCompany.php?arg=trjcn&style=1" target="_blank"><span style="text-decoration: underline;color:red;">联系客服</span></a>',
		'neterror' : '网络异常，请重试！',
		'isIdCard_error' : '身份证号码错误！'
	};
	function MobileVoice(voice) {
		switch (voice) {
		case 'phone':
			window.phoneCode.voice();
			break;
		case 'mobile':
			window.mobileCode.voice();
			break;
		}
	}
	function TrjcnMobileCode(){
        var MobileCode = {
            mobile:null,
            mobileId:null,
            mobileHand:null,
            mobileInfoHand:null,
            process:false,
            smsid:0,
            time:60,
            nt:60,
            succMsg:'',
            hasCaptcha:true,
            interval:function(){
                var self = this,hand,_timestr = languages.codetime;
                var _interval = function () {
                    self.time = self.time - 1;
                    if (self.time > 0){
                        self.btn.html( _timestr.replace('[s]', self.time));
                        self.btn.addClass('popup-code-cur').show();
                    }
                    else{
                        if (hand){clearInterval(hand);}
                        self.time = self.nt;
                        self.btn.html(languages.mobile_btn).removeClass('popup-code-cur');
                        self.mobileInfoHand.html(self.succMsg).css({'display':'block'});
                        self.mobileInfoHand.attr('data-code-msg', self.succMsg);
                        $('#T-'+self.mobileId+'-voice-df').show();
                        self.mobileHand.removeAttr('readonly');
                    }
                };
                if (hand){clearInterval(hand);}
                _interval();
                hand = setInterval(_interval, 1000);
            },
            voice:function(){
                 var self = this;
                 if(!self.mobile || self.mobile != self.mobileHand.val() || !self.smsid || Trjcn.cache.voice)return;
                 Trjcn.cache.voice = true;
                 Trjcn.Ajax.post('/api/mobile_regcode_voice','smsid='+self.smsid,function(res){
                     Trjcn.cache.voice = false;
                     if(res.code==200){
                          var msg = '请准备接听来自125909888601的自动语音呼入电话';
                          self.mobileInfoHand.html(msg).css({'display':'block'});
                          self.mobileInfoHand.attr('data-code-msg', msg);
                          self.mobileHand.attr('readonly');
                          $('#T-'+self.mobileId+'-voice-df').hide();
                          if(self.time == self.nt)self.interval();
                      };

                 });
            },
            captcha:function(){
                if($('#J_mobile_captcha_img').length>0)
                {
                    $('#J_mobile_captcha_msg').html('请输入图片验证码');
                    return;
                }
                var self = this;
                window.mobileSendBtn = $('#T-reg-'+self.mobileId+'-code');
                typeof(seajs) =='object' && seajs.use(['jquery', 'module/common/dialog'], function ($, dialog) {
                	var host = 'http://www'+location.host.substring(location.host.indexOf('.'),location.host.length);
                    window.dlgCaptcha = dialog.dialog({title:'请输入图片验证码',content:'<article class="part-fieldset" style="overflow:hidden; zoom:1;"><section class="part-fieldset-section" style="width:100% ; padding:0; display:inline-block; color:#999;"><input type="text" class="t_input w140" id="J_mobile_captcha" maxlength="4" style="border-radius:5px;height:28px; border:1px solid #ddd; background:#fff; line-height:28px; padding:0 10px; width:248px; margin-right:5px; display:inline-block; vertical-align:middle; position:relative;"><img id="J_mobile_captcha_img" style="vertical-align:middle;border-radius:5px;" src="'+host+'/util/captcha_page.html?'+Math.random()+'" onclick="this.src=\''+host+'/util/captcha_page.html?\'+Math.random()" alt="验证码"> <span class="part-fieldset-msg" id="J_mobile_captcha_msg" style="color:red"></span></section></article>',width:"255px",ok:function(){
                        var captchaVal = $('#J_mobile_captcha').val();
                        if(!captchaVal){
                            $('#J_mobile_captcha_msg').html('请输入计算结果');
                            $('#J_mobile_captcha').focus();
                            return false;
                        }
                        window.captchaVal = captchaVal;
                        window.mobileSendBtn.trigger('click');
                        return false;
                    }});
                })
            },
            init:function(mobile,url){
                var url=url||"/api/mobile_regcode_send";
                var dialog=function(){};
                var self = this;
                if(!mobile){
                    dialog=require('module/common/dialog');
                }
                self.mobileId = mobile || 'mobile';
                self.succMsg = '验证码已发送，若未收到，请先到拦截信息中查找';
                var _code_info=$('#J_'+self.mobileId+'_info'),_mobile = $('#J_'+self.mobileId);
                self.mobileHand = _mobile;
                self.mobileInfoHand = $('#J_'+self.mobileId+'_info');
                self.process=false;
                self.time = self.nt;
                window.captchaVal = '';
                $('#T-reg-'+self.mobileId+'-code').on('click',function(){
                    if (self.time != self.nt || self.process)return;
                    var _this = $(this),_mobile_val=_mobile.val();
                    if (!_mobile_val || _mobile_val.indexOf('手机号码')>-1) {
                        if(mobile){
                            if(self.mobileInfoHand.html() == undefined){
                                alert('请输入您的手机号码');
                            }else{
                                self.handmsg('请输入您的手机号码');
                            }
                        }
                        else{
                            self.handmsg('<span><i class="icoPro16"></i>请输入您的手机号码</span>');
                        }
                        return;
                    }
                    if (!Trjcn.Util.isMobile(_mobile_val)){
                        if(mobile){
                            if(self.mobileInfoHand.html() == undefined){
                                alert('手机号码格式不对');
                            }else{
                                self.handmsg('手机号码格式不正确');
                            }
                        }
                        else{
                            self.handmsg('<span><i class="icoPro16"></i>手机号码格式不正确</span>');
                        }
                        return;
                    }
                    if(self.hasCaptcha===true)
                    {
                        if($('#J_mobile_captcha').length>0)
                        {
                            window.captchaVal = $('#J_mobile_captcha').val();
                        }

                        if(window.captchaVal=='')
                        {
                            self.captcha();
                            return;
                        }else{
                            $('#verify_code').hide();
                        }
                    }
                    self.btn = self.btntxt =  _this;
                    if (_this.find('i').length==1){
                        self.btntxt = _this.find('i');
                        languages.mobile_btn = self.btntxt.attr('label');
                    }
                    self.process = true;
                    var success = function(res){
                        if (res.time) {
                            self.nt = parseInt(res.time);
                        }
                        if (res.data && res.data.time) {
                            self.time = parseInt(res.data.time);
                        }
                        self.process = false;
                        self.mobileInfoHand.hide();
                        window.captchaVal = '';
                        $('#J_mobile_captcha_msg').html('');
                        if(res.code==520)
                        {
                            self.captcha();
                            return;
                        }
                        else if(res.code==521)
                        {
                            $('#J_mobile_captcha_img').trigger('click');
                            $('#J_mobile_captcha_msg').html(res.data.msg);
                            return;
                        }

                        try{window.dlgCaptcha&&window.dlgCaptcha.close().remove();}catch(e){}
                        if(res.code == 200){
                            if(mobile){
                                self.smsid = res.data.smsid;
                                self.mobile = _mobile_val;
                                self.mobileHand.attr('readonly', true);
                            }
                            else{
                                dialog.dialog({
                                    width:'300px',
                                    lock:true,
                                    fixed:true,
                                    okValue: '确定',
                                    ok:function(){},
                                    content:'您好，您手机接收到的验证码将作为您登录投融界的登录密码使用，请妥善保管。',
                                    onclose:function(){
                                        self.smsid = res.data.smsid;
                                        self.mobile = _mobile_val;
                                        self.mobileHand.attr('readonly', true);
                                        if (!res.data.smsid) {
                                            self.succMsg = languages.mobile_code_ok;
                                        }
                                        $('#T-'+self.mobileId+'-voice-info').show();
                                        self.handmsg(self.succMsg).css({'display':'block'});
                                        self.interval();
                                        window.Trjcn.cache.voiceid=mobile;
                                    }
                                });
                            }
                        }
                        else if (res.code == 203)
                        {
                            if(mobile){
                                self.smsid = res.data.smsid;
                                self.mobile = _mobile_val;
                                self.mobileHand.attr('readonly', true);
                                self.time = parseInt(res.data.time);
                            }
                            else
                            {
                                self.smsid = res.data.smsid;
                                self.mobile = _mobile_val;
                                self.mobileHand.attr('readonly', true);
                                self.time = parseInt(res.data.time);
                                if (!res.data.smsid) {
                                    self.succMsg = languages.mobile_code_ok;
                                }
                                $('#T-'+self.mobileId+'-voice-info').show();
                                self.handmsg(self.succMsg).css({'display':'block'});
                                self.interval();
                                window.Trjcn.cache.voiceid=mobile;

                            }
                        }
                        else
                        {
                            self.handmsg(res.data.error).show();
                            $('#T-'+self.mobileId+'-voice-info').hide();
                            return;
                        }

                        if(mobile){
                            if (!res.data.smsid) self.succMsg = languages.mobile_code_ok;
                            else{
                                self.succMsg = '验证码已发送，若60秒未收到，可点击<a href="javascript:;" class="red mobile_voice_'+self.mobileId+'" style="text-decoration:underline;">语音播报验证码</a>';
                            }
                            $('#T-'+self.mobileId+'-voice-info').show();
                            self.handmsg(self.succMsg).css({'display':'block'});
                            self.mobileInfoHand.find('.mobile_voice_'+self.mobileId).on('click',function(){self.voice();});
                            self.interval();
                            window.Trjcn.cache.voiceid=mobile;
                        }
                    }

                    var error = function(res){
                        self.process = false;
                        self.handmsg('发送过于频繁请稍后再试！').css({'display':'block'});
                    }
                    if(mobile){
                        var params = "mobile="+_mobile_val;
                    }else{
                        var params = "mobile="+_mobile_val+'&msg=common';
                    }
                    params += '&mobilecaptcha='+window.captchaVal;
                    Trjcn.Ajax.post(url, params, success, error);
                });

            },
            init_page:function(mobile,url){
                var url=url||"/api/mobile_regcode_send";
                var dialog=function(){};
                var self = this;
                if(!mobile){
                    dialog=require('module/common/dialog');
                }
                self.mobileId = mobile || 'mobile';
                self.succMsg = '验证码已发送，若未收到，请先到拦截信息中查找';
                var _code_info=$('#J_'+self.mobileId+'_info'),_mobile = $('#J_'+self.mobileId);
                self.mobileHand = _mobile;
                self.mobileInfoHand = $('#J_'+self.mobileId+'_info');
                self.process=false;
                self.time = self.nt;
                window.captchaVal = '';
                $('#T-reg-'+self.mobileId+'-code').on('click',function(){
                    if (self.time != self.nt || self.process)return;
                    var _this = $(this),_mobile_val=_mobile.val();
                    if (!_mobile_val || _mobile_val.indexOf('手机号码')>-1) {
                        if(mobile){
                            if(self.mobileInfoHand.html() == undefined){
                                alert('请输入您的手机号码');
                            }else{
                                self.handmsg('请输入您的手机号码');
                            }
                        }
                        else{
                            self.handmsg('<span><i class="icoPro16"></i>请输入您的手机号码</span>');
                        }
                        return;
                    }
                    if (!Trjcn.Util.isMobile(_mobile_val)){
                        if(mobile){
                            if(self.mobileInfoHand.html() == undefined){
                                alert('手机号码格式不对');
                            }else{
                                self.handmsg('手机号码格式不正确');
                            }
                        }
                        else{
                            self.handmsg('<span><i class="icoPro16"></i>手机号码格式不正确</span>');
                        }
                        return;
                    }

                    if($('#login_yzcode').length>0){
                        window.captchaVal = $('#login_yzcode').val();
                    } else {
                        if(window.captchaVal=='') {
                            self.captcha();
                            return;
                        }
                    }


                    if(window.captchaVal==''|| window.captchaVal==='输入计算结果')
                    {
                        //self.handmsg('请输入计算结果');
                        self.mobileInfoHand.html('');
                        $('#J_mobile_msg_info').html('请输入计算结果').show();
                        return;
                    }else{
                        $('#J_mobile_msg_info').hide();
                    }
                    self.btn = self.btntxt =  _this;
                    if (_this.find('i').length==1){
                        self.btntxt = _this.find('i');
                        languages.mobile_btn = self.btntxt.attr('label');
                    }
                    self.process = true;
                    var success = function(res){
                        if (res.time) {
                            self.nt = res.time;
                        }                        
                        if (res.data && res.data.time) {
                            self.time = parseInt(res.data.time);
                        }
                        self.process = false;
                        self.mobileInfoHand.hide();
                        window.captchaVal = '';
                        if(res.code==520)
                        {
                            //self.handmsg('请输入计算结果');
                            self.mobileInfoHand.html('');
                            $('#J_mobile_msg_info').html('请输入计算结果').show();
                            try{window.dlgCaptcha&&$('#J_mobile_captcha_msg').html('请输入计算结果').show();}catch(e){}
                            return;
                        }
                        else if(res.code==521)
                        {
                            $('#yzimg').trigger('click');
                            //$('#J_mobile_msg_info').html(res.data.msg).show();
                            self.mobileInfoHand.html('');
                            $('#J_mobile_msg_info').html('计算结果不正确').show();
                            try{window.dlgCaptcha&&$('#J_mobile_captcha_msg').html('请输入计算结果').show() && $('#J_mobile_captcha_img').trigger('click');}catch(e){}
                            return;
                        }

                        try{window.dlgCaptcha&&window.dlgCaptcha.close().remove();}catch(e){}
                        if(res.code == 200){
                            if(mobile){
                                self.smsid = res.data.smsid;
                                self.mobile = _mobile_val;
                                self.mobileHand.attr('readonly', true);
                            }
                            else{
                                dialog.dialog({
                                    width:'300px',
                                    lock:true,
                                    fixed:true,
                                    okValue: '确定',
                                    ok:function(){},
                                    content:'您好，您手机接收到的验证码将作为您登录投融界的登录密码使用，请妥善保管。',
                                    onclose:function(){
                                        self.smsid = res.data.smsid;
                                        self.mobile = _mobile_val;
                                        self.mobileHand.attr('readonly', true);
                                        if (!res.data.smsid) {
                                            self.succMsg = languages.mobile_code_ok;
                                        }
                                        $('#T-'+self.mobileId+'-voice-info').show();
                                        self.handmsg(self.succMsg).css({'display':'block'});
                                        self.interval();
                                        window.Trjcn.cache.voiceid=mobile;
                                    }
                                });
                            }
                        }
                        else if (res.code == 203)
                        {
                            if(mobile){
                                self.smsid = res.data.smsid;
                                self.mobile = _mobile_val;
                                self.mobileHand.attr('readonly', true);
                                self.time = parseInt(res.data.time);
                            }
                            else
                            {
                                self.smsid = res.data.smsid;
                                self.mobile = _mobile_val;
                                self.mobileHand.attr('readonly', true);
                                self.time = parseInt(res.data.time);
                                if (!res.data.smsid) {
                                    self.succMsg = languages.mobile_code_ok;
                                }
                                $('#T-'+self.mobileId+'-voice-info').show();
                                self.handmsg(self.succMsg).css({'display':'block'});
                                self.interval();
                                window.Trjcn.cache.voiceid=mobile;

                            }
                        }
                        else
                        {
                            self.handmsg(res.data.error).show();
                            $('#T-'+self.mobileId+'-voice-info').hide();
                            return;
                        }

                        if(mobile){
                            if (!res.data.smsid) self.succMsg = languages.mobile_code_ok;
                            else{
                                self.succMsg = '验证码已发送，若60秒未收到，可点击<a href="javascript:;" class="red mobile_voice_'+self.mobileId+'" style="text-decoration:underline;">语音播报验证码</a>';
                            }
                            $('#T-'+self.mobileId+'-voice-info').show();
                            self.handmsg(self.succMsg).css({'display':'block'});
                            self.mobileInfoHand.find('.mobile_voice_'+self.mobileId).on('click',function(){self.voice();});
                            self.interval();
                            window.Trjcn.cache.voiceid=mobile;
                        }
                    }
                    var error = function(res){
                        self.process = false;
                        self.handmsg('发送过于频繁请稍后再试！').css({'display':'block'});
                    }
                    if(mobile){
                        var params = "mobile="+_mobile_val;
                    }else{
                        var params = "mobile="+_mobile_val+'&msg=common';
                    }
                    params += '&mobilecaptcha='+window.captchaVal;
                    Trjcn.Ajax.post(url, params, success, error);
                });

            },
            handmsg:function(msg){
                var self = this;
                return self.mobileInfoHand.html(msg);
            }
        };
        return MobileCode;
	}
	exports.MobileCode=TrjcnMobileCode;
	exports.MobileVoice=MobileVoice;
});