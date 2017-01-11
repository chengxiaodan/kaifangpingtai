PT_utils.namespace('PT.Business');

PT.Business.Add = function(domSelector) {
	this.domSelector = domSelector;
	this.valid = true;
	this.init();
	this.bindEvent();
}
PT.Business.Add.prototype = {
	init: function() {
		var self = this;
		var ui = $(self.domSelector);
		$('[name=submit]', ui).click(function() {
			if(self.validate()){
				self.submit(ui);
			}
		});
	},
	bindEvent: function() {
		var self = this;
		var ui = $(self.domSelector);
		//上传营业执照
		$('[name=licence]', ui).on('change',function(){
			var path = $(this).val();
			self.fileUpload('licence',path,237);
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
//		var devId = $('#devId').val(); //开发者id
		var enterprise = $('#enterprise'); //企业名称
		var firm = $('#firm'); //注册号
		var business_licence = $('#business_licence').attr('href'); //营业执照扫描件图片路径
		var username = $('#username'); //联系人姓名
		var tel = $('#tel'); //联系人电话 
		var emailAddress = $('#emailaddress'); //邮箱地址
		var address = $('#address'); //联系地址
		var isAgree = $("#agreement").is(':checked'); //是否同意协议
		
		(function() {
			var flag = true;
			if(null == $.trim(enterprise.val()) || "" == $.trim(enterprise.val())) {
				flag = false;
				PT_utils.showBox(enterprise, "请输入营业执照上的企业名称", true);
			}else{
				PT_utils.showBox(enterprise, "", false);
			}
			valid = valid && flag;
		})();
		(function() {
			var flag = true;
			if(null == $.trim(firm.val()) || "" == $.trim(firm.val())) {
				flag = false;
				PT_utils.showBox(firm, "请输入企业营业执照注册号", true);
			}else{
				PT_utils.showBox(firm, "", false);
			}
			valid = valid && flag;
		})();
		(function() {
			var flag = true;
			if(null == $.trim(business_licence) || "" == $.trim(business_licence) ||
			undefined == $.trim(business_licence)) {
				flag = false;
				alert("请输入企业营业执照注册号");
			}
			valid = valid && flag;
		})();
		(function() {
			var flag = true;
			if(null == $.trim(username.val()) || "" == $.trim(username.val())) {
				flag = false;
				PT_utils.showBox(username, "请输入您的真实姓名", true);
			}else{
				PT_utils.showBox(username, "", false);
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
			}else{
				PT_utils.showBox(emailAddress, "", false);
			}
			valid = valid && flag;
		})();
		(function() {
			var flag = true;
			if(null == $.trim(address.val()) || "" == $.trim(address.val())) {
				flag = false;
				PT_utils.showBox(address, "请输入您的联系地址", true);
			}else{
				PT_utils.showBox(address, "", false);
			}
			valid = valid && flag;
		})();
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
		var devId = $('#devId').val(); //开发者id
		var enterprise = $('#enterprise]').val(); //企业名称
		var firm = $('#firm').val(); //注册号
		var business_licence = $('#business_licence').attr('href'); //营业执照扫描件图片路径
		var website = $('#website').val(); //网站 选填
		var brandname = $('#brandname').val(); //品牌名称 选填
		var brandlogo = $('#brandlogo').attr('href'); //品牌log 选填
		var brandintro = $('#brandintro').val(); //品牌简介 选填
		var username = $('#username').val(); //联系人姓名
		var tel = $('#tel').val(); //联系人电话 
		var fixedtel = $('#areacode').val() + $('#fixedtel').val(); //联系人座机电话 选填
		var emailAddress = $('#emailaddress').val(); //邮箱地址
		var address = $('#address').val(); //居住地址
		var isAgree = $("#agreement").is(':checked'); //是否同意协议

		//json  传参key值以后台接口为准,相关人员可以修改
		return data = {
			devId: devId,
			enterprise: enterprise,
			firm: firm,
			business_licence: business_licence,
			website: website,
			brandname: brandname,
			brandlogo: brandlogo,
			brandintro: brandintro,
			username: username,
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