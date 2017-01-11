PT_utils.namespace('PT.FindResult');

PT.FindResult = function(domSelector) {
	this.domSelector = domSelector;
	this.lock = false;
	this.init();
	this.bindEvent();
}
PT.FindResult.prototype = {
	init: function() {
		var self = this;
		self.geturl();
		var ui = $(self.domSelector);
		if(self.validate()){
			$('[name=confire]', ui).click(function() {
					self.submit(ui);
			});
		}
	},
	geturl: function(){
		var self = this;
		var flag = false;
		if(flag){
			self.active("replace_pw");
		}else{
			self.active("lose_effect");
		}
		
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
	},
	bindEvent: function() {
		var self = this;
	},
	validate: function() {
		var self = this;
		var ui = $(self.domSelector);
		var valid = false;
		var password = $('[name=password]', ui);
		var password2 = $('[name=password2]', ui);

		password.keyup(function() {
			this.value = this.value.replace(/[^\w\.\/]/ig, '');
		});
		password2.keyup(function() {
			this.value = this.value.replace(/[^\w\.\/]/ig, '');
		});

		password.blur(function() {
			if(null == this.value || "" == this.value ||
				this.value.length == 0) {
				self.showBox(password, "请输入密码", true);
			} else if(!PT_utils.fChkPassword($.trim(this.value))) {
				self.showBox(password, "密码长度应为8-16个字符的英文字母和数字", true);
			} else {
				self.showBox(password, "", false);
				valid = true;
				//验证成功后面加对勾图片
			}
		});
		password2.blur(function() {
			if(null == this.value || "" == this.value ||
				this.value.length == 0) {
				self.showBox(password2, "请再次输入密码", true);
			} else if(this.value !== password.val()) {
				self.showBox(password2, "请确认两次密码是否一致", true);
			} else {
				self.showBox(password2, "", false);
				valid = true;
				//验证成功后面加对勾图片
			}
		});
		return valid;
	},
	submit: function(ui) {
		var self = this;
		var password = $('[name=password]', ui).val();

		if(password !== null && password !== '' && password !== undefined) {
			self.active("success_pw");
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
			alert("请检查密码");
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
		var arr = ['replace_pw', 'success_pw','lose_effect'];
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