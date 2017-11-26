seajs.use(['jquery', 'component/dialog/dialog'], function ($, dialog) {
	seajs.use(['page/common','jquery.form','module/common/mobile_code'], function (co,form,mobile) {
		window.mobileCode = new mobile.MobileCode();
		window.mobileCode.init_page('mobile');
		
		var J_regfrm = $('#J_regfrm');
		var J_mobile_info = $('#J_mobile_info',J_regfrm);
		var J_mobilecode_info = $('#mobilecode',J_regfrm);
		var J_argeement_check_info = $('#J_argeement_check_info',J_regfrm);
		Trjcn.cache.loading = false;
		$('.ui-btn-big',J_regfrm).click(function(){
			if (Trjcn.cache.loading) return false;
			var _mobile = $('#J_mobile',J_regfrm).val();
			if(_mobile == '请输入您的手机号码'){
				_mobile = '';
			}
			var _mobilecode = $('#login_yzcode',J_regfrm).val();
			if(_mobilecode == '请输入图片验证码'){
				_mobilecode = '';
			}
			var _mobilecode = $('#J_mobile_code',J_regfrm).val();
			if(_mobilecode == '请输入验证码'){
				_mobilecode = '';
			}
			var _argeement_check = $('#argeement_check',J_regfrm).prop('checked');
			var check_flag = true;
			
			if(_mobile == ''){
				J_mobile_info.html('<span><i class="icoPro16"></i>请输入您的手机号码</span>').css('display','inline-block');
				check_flag =  false;
	        }else{
	        	if (!Trjcn.Util.isMobile(_mobile))
				{
					J_mobile_info.html('<span><i class="icoPro16"></i>请输入正确的手机号码</span>').css('display','inline-block');
					check_flag =  false;
				}else{
					J_mobile_info.html('');
				}
	        }
			if (!_mobilecode)
			{
				J_mobilecode_info.html('<span><i class="icoPro16"></i>请输入验证码</span>');
				check_flag =  false;
			}else{
				J_mobilecode_info.html('');
			}
			if(!_argeement_check){
				J_argeement_check_info.html('<span><i class="icoPro16"></i>请同意投融界服务协议</span>');
				check_flag =  false;
	        }else{
	        	J_argeement_check_info.html('');
	        }
			
			if(!check_flag){
				return false;
			}
			
			var param = J_regfrm.serialize();
			var success = function(res){
				Trjcn.cache.loading = false;
				if (res.code == 200)
				{
					var forword_url = $('#forword_url').val() || '';
					location.href='/register/success.html?forward='+ encodeURIComponent(forword_url);
					return;
				}
				for(var k in res.data.error_messages){
					if(k == 'mobilecode'){
		 				J_mobilecode_info.html('<span><i class="icoPro16"></i>'+res.data.error_messages[k]);
		 			}else{
		 				J_mobile_info.html('<span><i class="icoPro16"></i>'+res.data.error_messages[k]+'</span>').css('display','inline-block');
		 			}
					break;
				}
			};
			Trjcn.cache.loading = true;
			Trjcn.Ajax.post("/api/reg/submit", param, success);
			return false;
		});
	});
})