PT_utils.namespace('PT.Forgetpw');

PT.Forgetpw = function(domSelector) {
	this.domSelector = domSelector;
	this.lock = false;
	this.init();
	this.bindEvent();
}
PT.Forgetpw.prototype = {
	init: function() {
		var self = this;

		var ui = $(self.domSelector);
		
		$('[name=next]', ui).click(function() {
			if(self.validate()){
				self.sendmail(ui);
			}
		});
	},
	bindEvent: function() {
		var self = this;
		var ui = $(self.domSelector);
		$('#login_email').click(function() {
			PT_utils.goEail($('#emailstr').text(),'login_email');
		});
	},
	validate: function() {
		var self = this;
		var ui = $(self.domSelector);
		var valid = false;
		var username = $('[name=username]', ui);
		var codetext = $('[name=codetext]', ui);

		
		username.blur(function() {
			if(null == this.value || "" == this.value ||
				this.value.length == 0) {
				self.showBox(username, "请输入邮箱地址", true);
			} else if(!PT_utils.fChkMail($.trim(username.val()))) {
				self.showBox(username, "邮箱地址格式错误", true);
			} else if(PT_utils.fChkMail($.trim(username.val()))) {
				self.showBox(username, "", false);
				valid = true;
				//验证成功后面加对勾图片
			} else {
				//邮箱已注册ajax同步处理，提示语“该邮箱地址已注册，立即登录”
			}
		});
		username.blur();
		if(codetext.val() == null || codetext.val() == '' ||
			codetext.val() == undefined) {
			self.showBox($('.checkcode'), "请输入验证码", true);
		} else {
			//获取到验证码数据，判断输入的内容和展示的内容是否一致
			//self.showBox($('.checkcode'),"验证码错误",true);
			//点击刷新按钮更换
			//  目前假设一致
			valid = true;
			self.showBox($('.checkcode'), "", false);
		}
		return valid;
	},
	sendmail: function(ui) {
		var self = this;
		var username = $('[name=username]', ui).val();

		if(username !== null && username !== '' && username !== undefined) {
			$('#emailstr').text(username);
			self.active("mail_pw");
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
	},
	//显示的页面
	active: function(str) {
		var self = this;
		var arr = ['find_pw', 'mail_pw'];
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