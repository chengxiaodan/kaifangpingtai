/*
 * 账户信息
 * chengxiaodan
 */

PT_utils.namespace('PT.Account');

PT.Account.basicinfo = function(domSelector) {
	this.domSelector = domSelector;
	this.valid = true;
	this.init();
	this.bindEvent();
}
PT.Account.basicinfo.prototype = {
	init: function() {
		var self = this;
		var ui = $(self.domSelector);
		self.getData();
	},
	bindEvent: function() {
		var self = this;
		var ui = $(self.domSelector);

		$('#showbox').click(function() {
			$('input[name=password1]').val("");
			$('input[name=password2]').val("");
			$('input[name=password3]').val("");
			$('#downline-box').show();
		});
		$('#close').click(function() {
			$('#downline-box').hide();
		});
		var password = $('[name=password]', ui);
		var password2 = $('[name=password2]', ui);
		var password3 = $('[name=password3]', ui);

		password.keyup(function() {
			this.value = this.value.replace(/[^\w\.\/]/ig, '');
		});
		password2.keyup(function() {
			this.value = this.value.replace(/[^\w\.\/]/ig, '');
		});
		password3.keyup(function() {
			this.value = this.value.replace(/[^\w\.\/]/ig, '');
		});
		$("#updatePassword").click(function() {
			if(self.validate()) {
				self.updatePassword();
			}
		});
	},
	validate: function() {
		var self = this;
		var ui = $(self.domSelector);
		var valid = true;
		var password = $('input[name=password1]');
		var password2 = $('input[name=password2]');
		var password3 = $('input[name=password3]');

		(function() {
			var flag = true;
			if(null == $.trim(password.val()) || "" == $.trim(password.val())) {
				flag = false;
				alert("请输入当前登录密码");
			} else if(!PT_utils.fChkPassword($.trim(password.val()))) {
				flag = false;
				alert("密码长度应为8-16个字符的英文字母和数字");
			} else if(self.getPassword() !== $.trim(password.val())) {
				flag = false;
				alert("密码输入不正确,请重新输入！");
			}
			valid = valid && flag;
		})();
		(function() {
			var flag = true;
			if(null == $.trim(password2.val()) || "" == $.trim(password2.val())) {
				flag = false;
				alert("请输入新密码");
			} else if(!PT_utils.fChkPassword($.trim(password2.val()))) {
				flag = false;
				alert("密码长度应为8-16个字符的英文字母和数字");
			}
			valid = valid && flag;
		})();
		(function() {
			var flag = true;
			if(null == $.trim(password3.val()) || "" == $.trim(password3.val())) {
				flag = false;
				alert("请再次输入密码");
			} else if($.trim(password3.val()) !== $.trim(password2.val())) {
				flag = false;
				alert("请确认两次密码是否一致");
			}
			valid = valid && flag;
		})();
		return valid;
	},
	getData: function() {
		//写请求后台代码
		//ajax
		//假设返回的参数，email、state
		var email = "chengxiaodan@putao.com";
		var state = "已验证"; //0或1

		$('#userEmail').text(email);
		$('#checkState').text(state);
	},
	//获取当前登录密码
	getPassword: function() {
		var usercode = $('#userEmail').text();
		//ajax 参数usercode
		return "1234567abc"; //模拟密码
	},
	updatePassword: function() {
		var data = {
			usercode: $('#userEmail').text(),
			password: $('input[name=password2]')
		}
		console.log(data);
		//写请求后台代码
		//ajax  参数data
		alert("修改密码成功");
		$('#close').click();
	}
}