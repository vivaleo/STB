if (typeof(define) == 'function')
define(function(){
				});
var regexEnum =
{
	intege:"^-?[1-9]\\d*$",					//整数
	intege1:"^[1-9]\\d*$",					//正整数
	intege2:"^-[1-9]\\d*$",					//负整数
	num:"^([+-]?)\\d*\\.?\\d+$",			//数字
	num1:"^[1-9]\\d*|0$",					//正数（正整数 + 0）
	num2:"^-[1-9]\\d*|0$",					//负数（负整数 + 0）
	num3:"^[0-9]\\d*$",					//数字
	decmal:"^([+-]?)\\d*\\.\\d+$",			//浮点数
	decmal1:"^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$",	//正浮点数
	decmal2:"^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$",//负浮点数
	decmal3:"^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$", //浮点数
	decmal4:"^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$",//非负浮点数（正浮点数 + 0）
	decmal5:"^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$",//非正浮点数（负浮点数 + 0）

	email:"^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
	color:"^[a-fA-F0-9]{6}$",				//颜色
	url:"^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$",	//url
	chinese:"^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$",					//仅中文
	ascii:"^[\\x00-\\xFF]+$",				//仅ACSII字符
	zipcode:"^\\d{6}$",						//邮编
	mobile:"^1(3[0-9]|4[0-9]|5[0-9]|7[0|1|3|5|6|7|8]|8[0-9])\\d{8}$",				//手机
	ip4:"^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$",	//ip地址
	notempty:"^\\S+$",						//非空
	picture:"(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$",	//图片
	rar:"(.*)\\.(rar|zip|7zip|tgz)$",								//压缩文件
	date:"^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$",					//日期
	qq:"^[1-9]*[1-9][0-9]*$",				//QQ号码
	tel:"^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{3,}))?$",	//电话号码的函数(包括验证国内区号,国际区号,分机号)
	username:"^\\w+$",						//用来用户注册。匹配由数字、26个英文字母或者下划线组成的字符串
	letter:"^[A-Za-z]+$",					//字母
	letter_u:"^[A-Z]+$",					//大写字母
	letter_l:"^[a-z]+$",					//小写字母
	//idcard:"^[1-9]([0-9]{14}|[0-9]{17})$",	//身份证
	idcard:"(^\\d{15}$)|(^\\d{18}$)|(^\\d{17}(\\d|X|x))$",	//身份证
	passwd:"^[0-9|a-z|A-Z]{6,20}$",
	passwd2:"^[0-9|a-z|A-Z|!\\+=\\<\\>\\/@#\\$%^&\\*~\\(\\)_:;\\?\\.,]{6,20}$",
	ps_username:"^[\\u4E00-\\u9FA5\\uF900-\\uFA2D|a-zA-Z]+$", //中文、字母、数字 _
	numberAndLettersVal:"^[a-zA-Z0-9]+$", //字母，数字
	price:"^[1-9]\\d*$"
}

if (!window.Trjcn) {
	window.Trjcn = new Object()
};
if (!window.Trjcn.cache) {
	window.Trjcn.cache = new Object()
};
var formValidator = function(options){
  this.config=$.extend({
		isIcon:true,
		errIcoCls:'icoErr16',
		succIcoCls:'icoCor16',
		nomalIcoCls:'icoPro16',
		errFontCls:'',
		okHide:false
	}, options || {});
	this.els = null;
	this.els=null;
	this.okhide=this.config.okHide;
}
formValidator.prototype ={
	cerror:function(self){
		var name =self.attr('name').replace('[','').replace(']','');
		if ($('#'+name+'-error').length > 0)
		{
			self = $('#'+name+'-error');
		}
		else
		{
			self = self.nextAll('em');
			if (!self || self.length==0)self = self.end().parent().nextAll('em').first();
		}
		return self;
	},
	tip:function(self, style,msg){
		self = this.cerror(self);
		var ymsg = self.attr('data-msg');
		if (!ymsg)
		{
			ymsg = self.text();
			self.attr('data-msg', ymsg);
		}
		self.show();
		if (msg)
		{
			ymsg = msg;
		}
		else
		{
			if (style == this.config.succIcoCls)ymsg='';
		}
		this.config.isIcon && ( ymsg  = '<i class="'+style+'"></i>'+ymsg);
		this.config.errFontCls && style == this.config.errIcoCls && self.addClass(this.config.errFontCls);
		this.config.errFontCls && style != this.config.errIcoCls && self.removeClass(this.config.errFontCls);
		self.html(ymsg);
	},
	errtip:function(self,msg,def){
		if (def === true)
			msg = languages[msg] || '';
		else
			msg = languages[msg] || msg;
		this.tip(self, this.config.errIcoCls, msg);
		return false;
	},
	hidetip:function(self){
		this.cerror(self).hide();
	},
	setels:function(id){
		this.els = document.getElementById(id).elements;
	},
	init:function(id){
		var $this  = this;
			els=null;
			if(document.getElementById(id))
				els = document.getElementById(id).elements;
			$this.els = els;
		if ($this.els)
		for(var i=0, max=els.length; i < max; i++)
		{
			var  el = els[i],
				self =$( el );
			if (el.type=='application/x-shockwave-flash' || !self.attr('data-rule') || self.attr('bind-event')=='1')continue;
			if (el.type == 'file')
			{
			   self.change(function(e){
				   $this.valid($(this));
			   });
			}
			else
			{
				self.blur(function(e){
					if ($(this).attr('name').substring(0,1)==='S')
					{
						$(this).val($(this).val().replace(/#/g,'').replace(/\|/g,''));
					}
					var flag = $this.valid($(this), true, el.type);
					if (flag && $(this).attr('name') == 'amount_interval_min')
					{
						var omax = $(this).nextAll('input');
						if (!omax.val())omax.val($(this).val());
					}
				}).focus(function(){
					$this.tip($(this), 'icoPro16');
				})
		   }
		   self.attr('bind-event','1');
		}
		$this.placeholder();
	},
	placeholder:function()
	{
		try{
			if (window.T_Config && (window.T_Config.page == 'm_publish' || window.T_Config.page=='publish'))
			{
				var $this = this,val=$this.els['cat_id'].value;
				switch(val.substring(0,val.length-32))
				{
					case '1':
						var fields = {'i_overview':'项目背景+项目介绍+融资需求+详细用途','title':'例如：北京某餐饮平台项目股权融资100万-300万元'};
						for(var k in fields)
						{
							window.console.log(k);
							$($this.els[k]).each(function(){
								var _this = $(this);
								var holder = fields[k];
								_this.attr('holder',holder);
								_this.focus(function(){
									if (holder == _this.val())_this.val('');
								}).blur(function(){
									if (!_this.val())_this.val(holder);
								});
								if (!_this.val())_this.val(holder);
							})
						}
						break;
				}
			}
		}catch (e){}
	},
	valid:function(self, is_merge,type){
		if (!self.is(":visible") && !self.attr('data-force'))return;
		var $this  = this,
			merge = '',
			_val = '';
		switch((self.attr('type')||type))
		{
			case 'select-one':
			case 'select':
			case 'raido':
			case 'hidden':
			case 'text':
			case 'password':
			case 'textarea':
			case 'file':
				if (is_merge)
				{
					merge = self.attr('data-merge');
					if(merge)
					{
						merge = merge.split(',');
						for(var i=0;i<merge.length;i++)
						{
						   if ( ! $this.valid(  $($this.els[merge[i]]), false  ) ) return false;
						}
					}
				}
				_val = self.val();
				if(self.attr('tip') && self.attr('tip')==_val)_val='';
				break;
			case 'checkbox':
				_val = $('input[name='+self.attr('name').replace('[','\\[').replace(']','\\]')+']').map(function(){
					if ($(this).attr('checked') == true)return $(this).val();
				}).get().join(',');
				break;
			default:
				return true;
				break;
		}
		_val = $.trim(_val);
		if (_val && _val == self.attr('holder')) _val = '';
		var $rules = self.attr('data-rule');
		if (!$rules)return true;
		var _rules = $rules.split('|');
		if (_rules[0] == 'required' && !_val)
		{
			$this.errtip(self);
			return false;
		}


		if (!_val)return true;
		var _ajaxcheck = false;
		for(var i=0;i<_rules.length;i++)
		{
			var _rule = _rules[i];
			if (_rule == 'required')continue;
			var _pos   = _rule.indexOf('[');
			var _type  = _rule.substring(0,_pos);
			var _dval  = _rule.substring(_pos+1, _rule.length-1) || '';
			switch(_type)
			{
				case 'regexp':
					if (_dval && !(new RegExp(eval("regexEnum." + _dval), 'i').test(_val)))
						return $this.errtip(self, _dval+'_error', true);
				break;
				case 'F':
					if (_dval)eval('var _fs ='+_dval+'("'+_val+'")');
					if (_dval && !_fs)
						return $this.errtip(self, _dval+'_error', true);
				break;
				case 'matches':
					if (_dval && $this.els[_dval].value != _val)
						return $this.errtip(self, _dval+'_matches', true);
				break;
				case 'minlength':
				case 'min_length':
					var _len = parseFloat(_dval);
					if (_val.length < _len)
					   return $this.errtip(self, '该值长度必须大于 '+_len+' 个字符');
				break;
				case 'maxlength':
				case 'max_length':
					var _len = parseFloat(_dval);
					if (_val.length > _len)
					   return $this.errtip(self, '该值长度必须小于 '+_len+' 个字符');
				break;
				case 'greater':
					if (_dval == 'min_max')
					{
						var _name = self.attr('name');
						_name	= _name.substr(0,_name.length-4);
						var _min = parseFloat($this.els[_name+'_min'].value);
						var _max = parseFloat($this.els[_name+'_max'].value);
						//暂时额外处理一下
						try{
							switch(_name)
							{
								case 'amount_interval':
								_min *= parseInt($this.els[_name+'_min_unit'].value);
								_max *= parseInt($this.els[_name+'_max_unit'].value);
								if(_min && _max && new String(parseInt(_max)).length - new String(parseInt(_min)).length >2)
									return $this.errtip(self, '金额区间超出2个数量级，请重新填写');

								if ($this.els['amount'])$this.valid($($this.els['amount']), false);
								break;
							}
						}catch (e){}
						if (_name &&  _min> _max)
						  return $this.errtip(self, '起始值必须小于结束值');
					}
					else if (parseInt(_dval) != _dval)
					{
						try{
							var o = $($this.els[_dval]);
							var _dval = parseFloat(o.val())*parseInt($this.els[_dval+'_unit'].value);
							var _name = self.attr('name');
							var _max  =  parseFloat($this.els[_name].value)*parseInt($this.els[_name+'_unit'].value);
							if (_name && $this.els[_name].value.length>0 && _max < _dval && self.attr('iname') && o.attr('iname'))
							   return $this.errtip(self, self.attr('iname')+'不能小于'+o.attr('iname'));
						}catch (e){}
					}
					else
					{
						var _dval = parseInt(_dval);
						var _name = self.attr('name');
						var _max  =  parseFloat($this.els[_name].value);
						if (_name && $this.els[_name].value.length>0 && _max <= _dval)
						   return $this.errtip(self, '该值必须大于'+(_dval < 0 ? '等于'+(_dval+1) : _dval));
					}
				break;
				case 'valmin':
					var _min = parseFloat(_dval);
						_val = parseFloat(_val);
					if (_val < _min)
					{
						var msg = '该值必须大于'+_min;
						var re = new RegExp("valmin\\[(\\d+)\\]\\|valmax\\[(\\d+)\\]", "i" );
						var a = re.exec( $rules );
						if (a !==null)
							msg = '该值的取值范围为'+a[1]+'-'+a[2]+'之间';
						return $this.errtip(self, msg);
					}
				break;
				case 'valmax':
					var _max = parseFloat(_dval);
						_val = parseFloat(_val);
					if (_val > _max)
					{
						var msg = '该值必须小于'+_max;
						var re = new RegExp("valmin\\[(\\d+)\\]\\|valmax\\[(\\d+)\\]", "i" );
						var a = re.exec( $rules );
						if (a !==null)
							var msg = '该值的取值范围为'+a[1]+'-'+a[2]+'之间';
						return $this.errtip(self, msg);
					}
				break;
				case 'ajaxcheck':
					_ajaxcheck = true;
					var _other = '';
					var _field = _dval;
					if (_field.indexOf('-') > -1)
					{
					   var fields = _field.split('-');
					   _field = fields[0];
					   for(var i=1;i<fields.length;i++)
					   {
						   _other += '&'+fields[i]+'='+$this.els[fields[i]].value;
					   }
					}
					var param = _field+"="+_val+_other;
					var success = function(res){
						Trjcn.cache[param] = res;
						if (res.code == 200)
						{
							$this.okhide == true ? $this.hidetip(self) : $this.tip(self, $this.config.succIcoCls);
							return true;
						}
						else
						{
							return $this.errtip(self, res.data.error);
						}
					}
					if (Trjcn.cache[param])
					{
						return success(Trjcn.cache[param]);
					}
					Trjcn.Ajax.post("/api/reg/formcheck", "type="+_field+"&"+param, success);
				break;
				case 'investor':
					if(!$("#investor_id").val() || $("#investor_id").val()==0)
					{
						return $this.errtip(self,'该投资人不存在');
					}
				break;
			}

			switch(self.attr('name'))
			{
				case 'xmrz_revenue':
				case 'xmrz_asset':
				if($this.els['xmrz_revenue'].value > 0 && $this.els['xmrz_revenue'].value <10  && $this.els['xmrz_revenue'].value == $this.els['xmrz_asset'].value)
				{
					return $this.errtip(self, '请重新填写营业额和净资产');
				}
				break;
				case 'last_year_revenue':
				case 'net_asset':
				if($this.els['last_year_revenue'].value > 0 && $this.els['last_year_revenue'].value <10  && $this.els['last_year_revenue'].value == $this.els['net_asset'].value)
				{
					return $this.errtip(self, '请重新填写营业额和净资产');
				}
				break;
			}

		}
	   if (_ajaxcheck==false)$this.okhide == true ? $this.hidetip(self) : $this.tip(self, 'icoCor16');

	   return true;
	},
	isValid:function(id,callback){
		var $this  = this;
		if (id)$this.els = document.getElementById(id).elements;
		var callback = callback || function(){};
		var error = false;
		if($this.els)
		for(var i=0, max=$this.els.length; i < max; i++)
		{
			if ($this.els[i].type =='application/x-shockwave-flash')continue;
			if ( $this.valid( $($this.els[i]), true, $this.els[i].type) == false )error = true;
		}

		if (error == false) callback();
		return error;
	},
	errors:function(error_messages){
		var $this  = this;
		for(var name in error_messages){
			if (!$this.els[name])continue;
		   $this.tip($(this.els[name]), $this.config.errIcoCls, error_messages[name]);
		}
	}
}



Trjcn.Util = {
	isMobile:function(mobile){
		return /^1(3[0-9]|4[0-9]|5[0-9]|7[0|1|3|5|6|7|8]|8[0-9])\d{8}$/.test( mobile );
	},
	isChinese:function(val){
		return /^[\u4E00-\u9FA5\uF900-\uFA2D]+$/.test(val);
	},
	isEmail:function(email){
		 return /^\w+((-\w+)|(\.\w+))*\@\w+((\.|-)\w+)*\.\w+$/.test( email );
	},
	isEmpty:function(val){
			  switch (typeof(val))
			  {
				case 'string':
				  return $.trim(val).length == 0 ? true : false;
				  break;
				case 'number':
				  return val == 0;
				  break;
				case 'object':
				  return val == null;
				  break;
				case 'array':
				  return val.length == 0;
				  break;
				default:
				  return true;
			  }
	}
}


Trjcn.Ajax = {
	dataType:'json',
	type:'POST',
	post:function(url,param,callback_success,callback_error){
		Trjcn.Ajax.type = 'POST';
		Trjcn.Ajax.request(url,param,callback_success,callback_error);
	},
	get:function(url,param,callback_success,callback_error){
		Trjcn.Ajax.type = 'GET';
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
						 //Trjcn.ui.alert('请先登录');
						 return;
					  }
					  if (typeof(callback_success)=='function')callback_success(res);
				 },
				 error:function(res){
					  if (typeof(callback_error)=='function')callback_error(res);
				 }
		});
	}

}


function TrjcnLogin()
{
var oLogin={
	state:false,
	error_num:0,
	is_ustore:true,
	is_tip:true,
	hinfo:false,
	jump:true,
	ver:'',
	form:null,
	test:function(){ alert(this.error_num)
	},
	d:function(id){
		return $('#'+id, this.form);
	},
	init:function(id){
		this.form= $('#'+id);
		var self = this;
		if (self.is_ustore &&  typeof (USTORE)!='undefined'){
			USTORE.init();
			var _login_username = USTORE.getValue('login_username') || '';
		}
		if (_login_username)self.d('login_username').val(_login_username);

		self.d('yzimg_refresh').click(function(){
			self.d('yzimg').trigger('click');
		});
		if (self.is_tip)
		self.d('login_username').focus(function(){
			if ($(this).attr('tip') == $(this).val())$(this).val('');
		}).blur(function(){
			if (!$(this).val())$(this).val($(this).attr('tip'));
		}).trigger('blur');

		$('#login_yzcode,#login_password', self.form).bind('keypress',function(evt){
			var k=window.event?evt.keyCode:evt.which;
			if(k == 13)self.login();
		});

		self.d('btn-login').click(function(){
			self.login();
		});

	},
	after:function(){
		return true;
	},
	login:function(){
		var self = this,
			 _this=self.d('btn-login'),
			login_username = self.d('login_username').val(),
			login_password = self.d('login_password').val(),
			login_yzcode = self.d('login_yzcode').val();
		if (!login_username || login_username == self.d('login_username').attr('tip'))
		{
			self.login_msg('请输入用户名！');
			self.d('login_username').focus();
			return ;
		}
		if (!login_password)
		{
			self.login_msg('请输入密码！');
			return ;
		}

		if (self.error_num>=3 && !login_yzcode)
		{
			self.login_msg('请输入验证码！');
			return ;
		}
		self.login_msg();
		if (self.state === true)return;
		var success = function(res){
			 self.error_num = res.error_num;
			 if (res.code == 110){
				 location.href=res.forward;
				 return;
			 }else if(res.code == 200){
				 if (!self.after())return false;
				 if (self.is_ustore &&  typeof (USTORE)!='undefined')USTORE.setValue('login_username', login_username);
				 if (self.hinfo)
				 {
					 self.hinfo.html(res.data.user_info);
				 }
				 else if (self.jump)
				 {
					 if (window.T_Config && window.T_Config.page=='publish')
					 {
					   Trjcn.cache.dialog.close();
					   var pid = $('#T-cat-pid').val().substr(0,4);
					   Trjcn.LoginID = res.data.login_user_id;
					   $('#T-userid').val(res.data.login_user_id);
					   $('#userform').html('');
						return;
					 }

					 var forword_url = self.d('forword_url').val() || '';
					 location.href=forword_url ? forword_url : "/manage/home.html";
				 }
				 else
				 {
					location.reload();
				 }
				 return;
			 }else{
				 self.login_msg(res.data.error_messages.result);
			 }
			 if (self.error_num>=3){
				 var _eurl = _this.attr('data-error-url');
				 if(_eurl)
				 {
					 location.href=_eurl;
					 return;
				 }
				 else
				 {
					 self.d('yzimg').trigger('click');
					 self.form.find('.J-yzm').show();
				 }
			 }
			  self.state = false;
			 _this.find('i').html('登录');
		}
		var error = function(){
			  self.state = false;
			 _this.find('i').html('登录');
			  self.login_msg('网络异常，请重试！');
		 }
		var is_auto_login = 0;
		if (self.d('is_auto_login').length==1)
		{
			try{
				is_auto_login = self.d('is_auto_login').prop('checked');
			}catch(e){
				is_auto_login = self.d('is_auto_login').attr('checked');
			}
		}
		_this.find('i').html('正在登录中');
		Trjcn.Ajax.post("/login/check", "_=&type=box&username="+login_username+'&password='+login_password+'&login_yzcode='+login_yzcode+'&is_auto_login='+is_auto_login+'&ver='+self.ver, success, error);

	},

	login_tip:function(msg)
	{
		var self = this;
		if (msg)
			self.d('login-msg').html(msg).show();
		else
			self.d('login-msg').hide();
	},
	login_msg:function(msg){
		this.login_tip(msg);
	}
}
return oLogin;
}

var languages ={
'mobile_error':'请输入正确的手机号码',
'chinese_error':'只允许输入中文',
'passwd_error':'请输入6-20位字符组成的密码',
'newpwd_matches':'确认新密码输入不一致',
'email_error':'请输入正确的邮箱地址',
'ps_username_error':'请输入您的真实姓名',
'password_error':'请输入6-20位字符组成的密码',
'password_matches':'确认密码输入不一致',

'mobile_code':'请输入您收到的手机验证码',
'mobile_code_ok':'验证码已发送，若未收到，仍未发现请联系客服',
'mobile_code_ok2':'验证码已发送，若60秒未收到，可点击<a href="javascript:;" onclick="MobileVoice();" class="red" style="text-decoration:underline;">语音播报验证码</a>',
'mobile_btn':'获取验证码',
'codetime':'[s]秒后重新发送',
'codetime2':'验证码已发送，请在<font color="red">{$s}</font>秒后重新获取，若未收到，请在拦截信息中查找或直接<a href="http://chat.53kf.com/webCompany.php?arg=trjcn&style=1" target="_blank"><span style="text-decoration: underline;color:red;">联系客服</span></a>',
'neterror':'网络异常，请重试！',
'isIdCard_error':'身份证号码错误！',
'numberAndLettersVal_error':'请正确输入您的营业执照注册号',
'price_error':'请输入正确的价格'
}
function MobileVoice(voice)
{
	switch(voice)
	{
		case 'phone':
    		window.phoneCode.voice();
			break;
		default:
    		window.mobileCode && window.mobileCode.voice();
			break;
	}
}

function TrjcnMobileCode()
{

var MobileCode = {
	mobile:null,
	mobileId:null,
	mobileHand:null,
	mobileInfoHand:null,
	mobileCaptchaMsg:'',
	process:false,
	smsid:0,
	time:60,
	nt:60,
	succMsg:'',
	btnType:'',
	setBtnVal:function(txt){
		return this.btnType == 'input' ? this.btn.val(txt) : this.btn.html(txt);
	},
	interval:function(){
		 var self = this,hand,_timestr = languages.codetime;
		  var _interval = function () {
				self.time = self.time - 1;
				if (self.time > 0)self.setBtnVal( _timestr.replace('[s]', self.time)).addClass('popup-code-cur').show();
				else
				{
					if (hand)clearInterval(hand);
					self.time = self.nt;
					self.setBtnVal(languages.mobile_btn).removeClass('popup-code-cur');
					self.mobileInfoHand.html(self.succMsg).css({'display':'block'});
					self.mobileInfoHand.attr('data-code-msg', self.succMsg);
					$('#T-'+self.mobileId+'-voice-df').show();
					self.mobileHand.removeAttr('readonly');
				}
			}
			if (hand)clearInterval(hand);
			_interval();
			hand = setInterval(_interval, 1000);
	},
	voice:function(){
		 var self = this;
		 if(!self.mobile || self.mobile != self.mobileHand.val() || !self.smsid || Trjcn.cache.voice)return;
		 Trjcn.cache.voice = true;
		 Trjcn.Ajax.post('/api/mobile_regcode_voice','smsid='+self.smsid,function(res){
			 Trjcn.cache.voice = false;
			 if(res.code==200)
			 {
				  var msg = '请准备接听来自125909888601的自动语音呼入电话';
				  self.mobileInfoHand.html(msg).css({'display':'block'});
				  self.mobileInfoHand.attr('data-code-msg', msg);
				  self.mobileHand.attr('readonly');
				  $('#T-'+self.mobileId+'-voice-df').hide();
				  if(self.time == 60)self.interval();
			  };

		 });
	},
	captcha:function(){
		var self = this;
		if($('#J_'+self.mobileId+'_captcha_img').length>0)
		{
			self.mobileCaptchaMsg.html('请输入计算结果');
			return;
		}
		window.mobileSendBtn = $('#T-reg-'+self.mobileId+'-code');
		typeof(seajs) =='object' && seajs.use(['jquery', 'module/common/dialog'], function ($, dialog) {
			window.dlgCaptcha = dialog.dialog({title:'请输入图片验证码',content:'<article class="part-fieldset"><aside style="width:17%;text-align:right; float:left; color:#666666; height:30px; line-height:30px;">&nbsp;</aside><section class="part-fieldset-section" style="padding:0; display:inline-block; color:#999;"><input type="text" class="t_input w140" id="J_'+self.mobileId+'_captcha" maxlength="4" style="border-radius:5px;height:28px; border:1px solid #ddd; background:#fff; line-height:28px; padding:0 10px; width:248px; margin-right:5px; display:inline-block; vertical-align:middle; position:relative;"><img id="J_'+self.mobileId+'_captcha_img" style="vertical-align:middle;border-radius:5px;" src="/util/captcha_page.html?'+Math.random()+'" onclick="this.src=\'/util/captcha_page.html?\'+Math.random()" alt="验证码"> <span class="part-fieldset-msg" id="J_'+self.mobileId+'_captcha_msg" style="color:red"></span></section></article>',ok:function(){
				var captchaVal = $('#J_'+self.mobileId+'_captcha').val();
				if(!captchaVal){
					self.mobileCaptchaMsg.html('请输入计算结果');
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
		var self = this;
		self.mobileId = mobile || 'mobile';
		self.succMsg = languages.mobile_code_ok2;
		var _code_info=$('#J_'+self.mobileId+'_info'),_mobile = $('#J_'+self.mobileId);
		self.mobileHand = _mobile;
		self.mobileInfoHand = $('#J_'+self.mobileId+'_info');
		self.mobileCaptcha = $('#J_'+self.mobileId+'_captcha');
		self.mobileCaptchaMsg = $('#J_'+self.mobileId+'_captcha_msg');
		self.process=false;
		self.time = self.nt;
		window.captchaVal = '';
		$('#T-reg-'+self.mobileId+'-code').click(function(){
			if (self.time != self.nt || self.process)return;
			var _this = $(this),_mobile_val=_mobile.val();
			if (!_mobile_val || _mobile_val == '您的手机号码')
			{
				if(mobile){
					self.handmsg('请输入您的手机号码');
				}else{
					self.handmsg('<span><i class="icoPro16"></i>请输入您的手机号码</span>');
				}
				return;
			}
			if (!Trjcn.Util.isMobile(_mobile_val))
			{
				if(mobile){
					self.handmsg('手机号码格式不对');
				}else{
					self.handmsg('<span><i class="icoPro16"></i>手机号码格式不对</span>');
				}
				return;
			}

			if(self.mobileCaptcha.length>0 && self.mobileCaptcha.val() != self.mobileCaptcha.attr('tip'))
			{
				window.captchaVal = self.mobileCaptcha.val();
			}

			if(window.captchaVal=='')
			{
				self.captcha();
				return;
			}

			self.btn = self.btntxt =  _this;
			if (_this.find('i').length==1)
			{
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
				self.mobileCaptchaMsg.html('');
				if(res.code==520)
				{
				  	self.captcha();
				  	return;
				}
				else if(res.code==521)
				{
					$('#J_'+self.mobileId+'_captcha_img').trigger('click');
				  	self.mobileCaptchaMsg.html('计算结果不正确').show();
				  	return;
				}

				try{window.dlgCaptcha&&window.dlgCaptcha.close().remove();}catch(e){}

				 if(res.code == 200)
				 {
					  self.smsid = res.data.smsid;
					  self.mobile = _mobile_val;
					  self.mobileHand.attr('readonly', true);
				 }
				 else if (res.code == 203)
				 {
					 self.smsid = res.data.smsid;
					 self.mobile = _mobile_val;
					 self.mobileHand.attr('readonly', true);
					 self.time = parseInt(res.data.time);
				 }
				 else
				 {
					 self.handmsg(res.data.error).show();
					 $('#T-'+self.mobileId+'-voice-info').hide();
					 return;
				 }
				 if (!res.data.smsid) self.succMsg = languages.mobile_code_ok;
				 $('#T-'+self.mobileId+'-voice-info').show();
				 self.mobileInfoHand.html(self.succMsg).css({'display':'block'});
				 self.interval();
				 window.Trjcn.cache.voiceid=mobile;
			 }

			var error = function(){
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
		var self = this;
		self.mobileId = mobile || 'mobile';
		self.succMsg = languages.mobile_code_ok2;
		var _code_info=$('#J_'+self.mobileId+'_info'),_mobile = $('#J_'+self.mobileId);
		self.mobileHand = _mobile;
		self.mobileInfoHand = $('#J_'+self.mobileId+'_info');
		self.mobileCaptcha = $('#J_'+self.mobileId+'_captcha');
		self.process=false;
		self.time = self.nt;
		window.captchaVal = '';
		$('#T-reg-'+self.mobileId+'-code').click(function(){
			if (self.time != self.nt || self.process)return;
			var _this = $(this),_mobile_val=_mobile.val();
			if (!_mobile_val || _mobile_val == '您的手机号码')
			{
				if(mobile){
					self.handmsg('请输入您的手机号码');
				}else{
					self.handmsg('<span><i class="icoPro16"></i>请输入您的手机号码</span>');
				}
				return;
			}
			if (!Trjcn.Util.isMobile(_mobile_val))
			{
				if(mobile){
					self.handmsg('手机号码格式不对');
				}else{
					self.handmsg('<span><i class="icoPro16"></i>手机号码格式不对</span>');
				}
				return;
			}
			if($('#login_yzcode').length>0){
				window.captchaVal = $('#login_yzcode').val();
			}

			if(window.captchaVal=='' || window.captchaVal==='输入计算结果')
			{
				self.handmsg('请输入计算结果');
				return;
			}

			self.btn = self.btntxt =  _this;
			if (_this.find('i').length==1)
			{
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
				if(res.code==520)
				{
					self.handmsg('请输入计算结果');
					return;
				}
				else if(res.code==521)
				{
					$('#yzimg').trigger('click');
					//self.handmsg(res.data.msg).show();
					self.handmsg('计算结果不正确').show();
					return;
				}

				try{window.dlgCaptcha&&window.dlgCaptcha.close().remove();}catch(e){}

				if(res.code == 200)
				{
					self.smsid = res.data.smsid;
					self.mobile = _mobile_val;
					self.mobileHand.attr('readonly', true);
				}
				else if (res.code == 203)
				{
					self.smsid = res.data.smsid;
					self.mobile = _mobile_val;
					self.mobileHand.attr('readonly', true);
					self.time = parseInt(res.data.time);
				}
				else
				{
					self.handmsg(res.data.error).show();
					$('#T-'+self.mobileId+'-voice-info').hide();
					return;
				}
				if (!res.data.smsid) self.succMsg = languages.mobile_code_ok;
				$('#T-'+self.mobileId+'-voice-info').show();
				self.mobileInfoHand.html(self.succMsg).css({'display':'block'});
				self.interval();
				window.Trjcn.cache.voiceid=mobile;
			}

			var error = function(){
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

}
return MobileCode;

}
