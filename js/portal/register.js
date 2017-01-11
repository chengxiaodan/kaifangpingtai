PT_utils.namespace('PT.register');

PT.register = function(domSelector) {
	this.domSelector = domSelector;
	this.valid = true;
	this.init();
	this.bindEvent();
}
PT.register.prototype = {
	init: function() {
		var self = this;
		var ui = $(self.domSelector);
		self.valid = self.validate();
		$('[name=registerbtn]', ui).click(function() {
			if(self.checkcode()) {
				self.register(ui);
			}
		});
	},
	bindEvent: function() {
		var self = this;
		var ui = $(self.domSelector);
		var codetext = $('[name=codetext]', ui);
		codetext.focus(function() {
			$(this).css('border', '1px solid #dbdbdb');
			PT_utils.showBox($('.checkcode'), "", false);
		});
	},
	validate: function() {
		var self = this;
		var ui = $(self.domSelector);
		var valid = true;
		var username = $('[name=username]', ui);
		var password = $('[name=password]', ui);
		var password2 = $('[name=password2]', ui);

		username.blur(function() {
			var flag = true;
			if(null == this.value || "" == this.value ||
				this.value.length == 0) {
				flag = false;
				$(this).css('border', '1px solid #FF5722');
				PT_utils.showBox(username, "请输入邮箱地址", true);
			} else if(!PT_utils.fChkMail($.trim(username.val()))) {
				flag = false;
				$(this).css('border', '1px solid #FF5722');
				self.showBox(username, "邮箱地址格式错误", true);
			} else if(PT_utils.fChkMail($.trim(username.val()))) {
				$(this).css('border', '1px solid #dbdbdb');
				PT_utils.showBox(username, "", false);
				flag = true;
				//验证成功后面加对勾图片
			} else {
				flag = false;
				$(this).css('border', '1px solid #dbdbdb');
				//邮箱已注册ajax同步处理，提示语“该邮箱地址已注册，立即登录”
			}
			valid = valid && flag;
		});

		password.blur(function() {
			var flag = true;
			if(null == this.value || "" == this.value ||
				this.value.length == 0) {
				flag = false;
				$(this).css('border', '1px solid #FF5722');
				PT_utils.showBox(password, "请输入密码", true);
			} else if(!PT_utils.fChkPassword($.trim(this.value))) {
				flag = false;
				$(this).css('border', '1px solid #FF5722');
				PT_utils.showBox(password, "密码长度应为8-16个字符的英文字母和数字", true);
			} else {
				$(this).css('border', '1px solid #dbdbdb');
				PT_utils.showBox(password, "", false);
				flag = true;
				//验证成功后面加对勾图片
			}
			valid = valid && flag;
		});
		password2.blur(function() {
			var flag = true;
			if(null == this.value || "" == this.value ||
				this.value.length == 0) {
				flag = false;
				$(this).css('border', '1px solid #FF5722');
				PT_utils.showBox(password2, "请再次输入密码", true);
			} else if(this.value !== password.val()) {
				flag = false;
				$(this).css('border', '1px solid #FF5722');
				PT_utils.showBox(password2, "请确认两次密码是否一致", true);
			} else {
				$(this).css('border', '1px solid #dbdbdb');
				PT_utils.showBox(password2, "", false);
				flag = true;
				//验证成功后面加对勾图片
			}
			valid = valid && flag;
		});
		return valid;
	},
	checkcode: function() {
		var self = this;
		var ui = $(self.domSelector);
		var valid = true;
		var username = $('[name=username]', ui);
		var password = $('[name=password]', ui);
		var password2 = $('[name=password2]', ui);

		(function() {
			username.blur();
			password.blur();
			password2.blur();
			valid = valid && self.valid;
		})();

		(function() {
			var agreement = $('#agreement');
			var flag = true;
			if(!agreement.is(':checked')) {
				flag = false;
				alert('请阅读并同意用户协议');
			}
			valid = valid && flag;
		})();

		(function() {
			var codetext = $('[name=codetext]', ui);
			var flag = true;
			if(codetext.val() == null || codetext.val() == '' ||
				codetext.val() == undefined) {
				codetext.css('border', '1px solid #FF5722');
				PT_utils.showBox($('.checkcode'), "请输入验证码", true);
				flag = false;
			} else {
				//获取到验证码数据，判断输入的内容和展示的内容是否一致
				//self.showBox($('.checkcode'),"验证码错误",true);
				//点击刷新按钮更换
				//  目前假设一致
				flag = true;
				codetext.css('border', '1px solid #dbdbdb');
				PT_utils.showBox($('.checkcode'), "", false);
			}
			valid = valid && flag;
		})();
		return valid;
	},
	register: function() {
		var self = this;
		//成功之后显示发送验证邮件页面
		self.active("sendmail");
		/*$.ajax({
			url: '/conference/rank',
			data: formdata,
			type: 'POST',
			dataType:'json',
			processData: false,
			contentType: false,
			cache:false,
			async:false,
			success: function(data){
				if(data.httpStatusCode = 200) {
					userList = data.data;
				}
			},
			error: function (data) {
				
			}
		});*/
	},
	//显示的页面
	active: function(str) {
		var self = this;
		var arr = ['register', 'sendmail'];
		$.each(arr, function(i, value) {
			if(str == value) {
				$('#' + value).show();
				$.each(arr, function(j, other) {
					if(other !== value) {
						$('#' + other).hide();
					}
				});
			}
		});
	}
}