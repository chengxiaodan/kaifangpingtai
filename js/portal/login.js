PT_utils.namespace('PT.Signin');

PT.Signin = function(domSelector) {
	this.domSelector = domSelector;
	this.lock = false;
	this.init();
	this.bindEvent();
}
PT.Signin.prototype = {
	init: function() {
		var self = this;

		var ui = $(self.domSelector);

		$('[name=login]', ui).click(function() {
			if(self.validate()) {
				self.sendSignin(ui);
			}
		});

		//		$('[name=password]', ui).keypress(function(event) {
		//			if(event.which == 13) {
		//				if(self.validate()){
		//					self.sendSignin(ui);
		//					event.preventDefault();
		//				}
		//			}
		//		});
	},
	bindEvent: function() {
		var self = this;
		var ui = $(self.domSelector);
		var username = $('[name=username]', ui);
		var password = $('[name=password]', ui);
		var codetext = $('[name=codetext]', ui);

		username.focus(function() {
			$(this).css('border', '1px solid #dbdbdb');
			self.showBox(username, "", false);
		});

		password.focus(function() {
			$(this).css('border', '1px solid #dbdbdb');
			self.showBox(password, "", false);
		});
		codetext.focus(function() {
			$(this).css('border', '1px solid #dbdbdb');
			self.showBox($('.checkcode'), "", false);
		});
		var agreement = $('#agreement');
		if(agreement.is(':checked')) {
			self.showBox($('#read'), "", false);
		}
	},
	validate: function() {
		var self = this;
		var ui = $(self.domSelector);
		var valid = false;
		var username = $('[name=username]', ui);
		var password = $('[name=password]', ui);
		var codetext = $('[name=codetext]', ui);

		var agreement = $('#agreement');

		if(!agreement.is(':checked')) {
			alert('请阅读并同意用户协议');
		} else {
			valid = true;
		}
		password.keyup(function() {
			this.value = this.value.replace(/[^\w\.\/]/ig, '');
		});

		if(username.val() == null || username.val() == '' ||
			username.val() == undefined) {
			username.css('border', '1px solid #FF5722');
			self.showBox(username, "请输入邮箱地址", true);
		} else if(!PT_utils.fChkMail($.trim(username.val()))) {
			username.css('border', '1px solid #FF5722');
			self.showBox(username, "邮箱地址格式错误", true);
		} else if(PT_utils.fChkMail($.trim(username.val()))) {
			username.css('border', '1px solid #dbdbdb');
			self.showBox(username, "", false);
			valid = true;
			//验证成功后面加对勾图片
		} else {
			username.css('border', '1px solid #dbdbdb');
			//邮箱已注册ajax同步处理，提示语“该邮箱地址已注册，立即登录”
		}

		if(password.val() == null || password.val() == '' ||
			password.val() == undefined) {
			password.css('border', '1px solid #FF5722');
			self.showBox(password, "请输入密码", true);
		} else if(!PT_utils.fChkPassword($.trim(password.val()))) {
			password.css('border', '1px solid #FF5722');
			self.showBox(password, "密码长度应为8-16个字符的英文字母和数字", true);
		} else {
			password.css('border', '1px solid #dbdbdb');
			self.showBox(password, "", false);
			valid = true;
			//验证成功后面加对勾图片
		}

		if(codetext.val() == null || codetext.val() == '' ||
			codetext.val() == undefined) {
			codetext.css('border', '1px solid #FF5722');
			self.showBox($('.checkcode'), "请输入验证码", true);
		} else {
			codetext.css('border', '1px solid #dbdbdb');
			//获取到验证码数据，判断输入的内容和展示的内容是否一致
			//self.showBox(codetext,"验证码错误",true);
			//点击刷新按钮更换
			//  目前假设一致
			valid = true;
			self.showBox($('.checkcode'), "", false);
		}
		return valid;
	},
	sendSignin: function() {
		var self = this;
		var ui = $(self.domSelector);
		var username = $('[name=username]', ui).val();
		var password = $('[name=password]', ui).val();

		if(password !== null && password !== '' && password !== undefined &&
			username !== null && username !== '' && username !== undefined) {
			window.location.href = 'ptdev/index.html';
			//		if(!self.lock) {
			//			self.lock = true;
			//			$.ajax({
			//				url: '/service/signin',
			//				data: {
			//					username: username,
			//					password: password
			//				},
			//				type: 'POST',
			//				dataType: 'json',
			//				success: function(response) {
			//
			//					self.lock = false;
			//					if(response.httpStatusCode == 200) {
			//						window.location.href = response.data.url;
			//					} else {
			//						alert(response.data.message);
			//					}
			//				}
			//			});
			//		}
		} else {
			alert("请检查帐号或密码");
		}
	},
	showBox: function(domselector, content, flag) {
		domselector.poshytip('reset');
		domselector.poshytip({
			className: 'tip-yellowsimple',
			content: content,
			showOn: 'none',
			alignTo: 'target',
			alignX: 'right',
			alignY: 'center',
			offsetX: 5
		});
		if(flag) {
			domselector.poshytip('show');
		} else {
			domselector.poshytip('hide');
		}
	}
}