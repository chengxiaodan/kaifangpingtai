PT_utils.namespace('PT.Owner');

PT.Owner.Add = function(domSelector) {
	this.domSelector = domSelector;
	this.valid = true;
	this.init();
	this.bindEvent();
}
PT.Owner.Add.prototype = {
	init: function() {
		var self = this;
		var ui = $(self.domSelector);
		$('[name=submit]', ui).click(function() {
			if(self.validate()) {
				self.submit(ui);
			}
		});
	},
	bindEvent: function() {
		var self = this;
		var ui = $(self.domSelector);
		var credentials = $('#credentials'); //证件号
		var li = $('#credential li');
		credentials.keyup(function() {
			this.value = this.value.replace(/[^\w\.\/]/ig, '');
		});
		for(var i = 0; i < li.length; i++) {
			(function(Index) {
				li[i].addEventListener('click', function(e) {
					$(this).siblings('li').removeClass('list_active');
					$(this).addClass("list_active");
					$('#tabtitle').text($(this).text());
					$('#tap1').attr('checked', false);
				}, false);
			})(i)
		}
		//上传手持身份证照片
		$('[name=cardPhoto]', ui).on('change',function(){
			var path = $(this).val();
			self.fileUpload('cardPhoto',path,237);
		});
		//上传身份证正反面照片
		$('[name=frontback]', ui).on('change',function(){
			var path = $(this).val();
			self.fileUpload('frontback',path,237);
		});
		//上传品牌logo
		$('[name=brandlogo]', ui).on('change',function(){
			var path = $(this).val();
			self.fileUpload('brandlogo',path,241);
		});
	},
	validate: function() {
		var self = this;
		var ui = $(self.domSelector);
		var valid = true;
		var usercode = $('#usercode'); //开发者id
		var username = $('#username'); //真实姓名
		var credentials = $('#credentials'); //证件号
		var handPhoto = $('#cardPhoto'); //身份证手持照片
		var frontback = $('#frontback'); //身份证正反面照片
		var tel = $('#tel'); //联系人电话 
		var emailAddress = $('#emailaddress'); //邮箱地址
		var address = $('#address'); //居住地址
		var isAgree = $("#agreement").is(':checked'); //是否同意协议

		(function() {
			var flag = true;
			if(null == $.trim(usercode.val()) || "" == $.trim(usercode.val())) {
				flag = false;
				PT_utils.showBox(usercode, "请输入您的账号", true);
			} else if(!PT_utils.fChkMail($.trim(usercode.val()))) {
				flag = false;
				PT_utils.showBox(usercode, "您的账号格式错误", true);
			} else {
				PT_utils.showBox(usercode, "", false);
			}
			valid = valid && flag;
		})();
		usercode.focus(function() {
			$(this).css('border', '1px solid #dbdbdb');
			PT_utils.showBox(usercode, "", false);
		});
		(function() {
			var flag = true;
			if(null == $.trim(username.val()) || "" == $.trim(username.val())) {
				flag = false;
				PT_utils.showBox(username, "请输入您的真实姓名", true);
			} else {
				PT_utils.showBox(username, "", false);
			}
			valid = valid && flag;
		})();
		username.focus(function() {
			$(this).css('border', '1px solid #dbdbdb');
			PT_utils.showBox(username, "", false);
		});
		(function() {
			var credentype = ["身份证", "护照"]; //证件类型
			var flag = true;
			if(null == $.trim(credentials.val()) || "" == $.trim(credentials.val())) {
				flag = false;
				PT_utils.showBox(credentials, "请输入证件号", true);
			}else if($.trim($('#tabtitle').text()) == credentype[0]) {
				if(!PT_utils.isCardNo($.trim(credentials.val()))) {
					flag = false;
					PT_utils.showBox(credentials, "请输入正确的身份证号码", true);
				}
			}else if($.trim($('#tabtitle').text()) == credentype[1]){
				if(!PT_utils.isPassport($.trim(credentials.val()))) {
					flag = false;
					PT_utils.showBox(credentials, "请输入正确的护照号码", true);
				}
			} else {
				PT_utils.showBox(credentials, "", false);
			}
			valid = valid && flag;
		})();
		credentials.focus(function() {
			$(this).css('border', '1px solid #dbdbdb');
			PT_utils.showBox(credentials, "", false);
		});
		(function() {
			var flag = true;
			if(null == $.trim(handPhoto.attr('href')) || "" == $.trim(handPhoto.attr('href'))) {
				flag = false;
				alert("请上传手持身份证照片");
			}
			valid = valid && flag;
		})();
		(function() {
			var flag = true;
			if(null == $.trim(frontback.attr('href')) || "" == $.trim(frontback.attr('href'))) {
				flag = false;
				alert("请上传身份证正反面照片");
			}
			valid = valid && flag;
		})();
		(function() {
			var flag = true;
			if(null == $.trim(tel.val()) || "" == $.trim(tel.val())) {
				flag = false;
				tel.css('border', '1px solid #FF5722');
				PT_utils.showBox($('.tipdiv2'), "请输入联系人电话", true);
			}else if(!PT_utils.isphone($.trim(tel.val()))){
				flag = false;
				tel.css('border', '1px solid #FF5722');
				PT_utils.showBox($('.tipdiv2'), "请输入正确的联系人电话", true);
			} else {
				tel.css('border', '1px solid #dbdbdb');
				PT_utils.showBox($('.tipdiv2'), "", false);
			}
			valid = valid && flag;
		})();
		tel.focus(function() {
			$(this).css('border', '1px solid #dbdbdb');
			PT_utils.showBox($('.tipdiv2'), "", false);
		});
		(function() {
			var flag = true;
			if(null == $.trim(emailAddress.val()) || "" == $.trim(emailAddress.val())) {
				flag = false;
				PT_utils.showBox(emailAddress, "请输入邮箱地址", true);
			} else if(!PT_utils.fChkMail($.trim(emailAddress.val()))) {
				flag = false;
				PT_utils.showBox(emailAddress, "邮箱地址格式错误", true);
			} else {
				PT_utils.showBox(emailAddress, "", false);
			}
			valid = valid && flag;
		})();
		emailAddress.focus(function() {
			$(this).css('border', '1px solid #dbdbdb');
			PT_utils.showBox(emailAddress, "", false);
		});
		(function() {
			var flag = true;
			if(null == $.trim(address.val()) || "" == $.trim(address.val())) {
				flag = false;
				PT_utils.showBox(address, "请输入您的联系地址", true);
			} else {
				PT_utils.showBox(address, "", false);
			}
			valid = valid && flag;
		})();
		address.focus(function() {
			$(this).css('border', '1px solid #dbdbdb');
			PT_utils.showBox(address, "", false);
		});
		(function() {
			var flag = true;
			if(!isAgree) {
				alert('请阅读并同意用户协议');
				flag = false;
			}
			valid = valid && flag;
		})();
		return valid;
	},
	//上传失败
	_uploadFail: function(img){
		img.attr('src', "");
		img.parent().addClass('pb-border');
		img.hide();
	},
	//上传成功
	_uploadSucess: function(img,url,w,h){
		img.parent().removeClass('pb-border');
		img.show();
		img.attr('src', url); //品牌log 选填
		PT_utils.changeImageSize(img,w,h);
	},
	//上传插件
	fileUpload: function(id,url,height) {
		var self = this;
		//上传中进度条
		PT_utils.progress(id+'_pc',25);//进度条显示
		//上传成功之后需要更改图片路径
		PT_utils.progress(id+'_pc',100);//进度条隐藏
		self._uploadSucess($('#'+id+'2'),url,$('#'+id+'2').width,height);
		//上传失败处理
//		PT_utils.progress(id+'_pc',100);//进度条隐藏
//		self._uploadFail($('#'+id+'2'));//上传成功图片隐藏
		//上传中进度条，参数二是进度
	},
	formdata: function(ui) {
		var data = {};
		var usercode = $('#email').val(); //开发者账号
		var username = $('#username').val(); //真实姓名
		var credentype = $('#tabtitle').text(); //证件类型
		var credentials = $('#credentials').val(); //证件号
		var handPhoto = $('#cardPhoto').attr('href'); //身份证手持照片
		var frontback = $('#frontback').attr('href'); //身份证正反面照片
		var brandname = $('#brandname').val(); //品牌名称 选填
		var brandlogo = $('#brandlogo').attr('href'); //品牌log 选填
		var brandintro = $('#brandintro').val(); //品牌简介 选填
		var tel = $('#tel').val(); //联系人电话 
		var fixedtel = $('#areacode').val() + $('#fixedtel').val(); //联系人座机电话 选填
		var emailAddress = $('#emailaddress').val(); //邮箱地址
		var address = $('#address').val(); //居住地址
		var isAgree = $("#agreement").is(':checked'); //是否同意协议

		//json  传参key值以后台接口为准,相关人员可以修改
		return data = {
			usercode: usercode,
			username: username,
			credentype: credentype,
			credentials: credentials,
			handPhoto: handPhoto,
			frontback: frontback,
			brandname: brandname,
			brandlogo: brandlogo,
			brandintro: brandintro,
			tel: tel,
			fixedtel: fixedtel,
			emailAddress: emailAddress,
			address: address,
			isAgree: isAgree
		};
	},
	submit: function(ui) {
		var self = this;

		var formdata = self.formdata(ui);
		console.logo(formdata);
		//成功之后显示正在审核页面
		window.location.href = "checking.html";
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
					//成功之后显示正在审核页面
					window.location.href = "checking.html";
				}
			},
			error: function (data) {
				
			}
		});*/
	}
}