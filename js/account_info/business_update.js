PT_utils.namespace('PT.Account');

PT.Account.BUpdate = function(domSelector) {
	this.domSelector = domSelector;
	this.valid = true;
	this.init();
	this.bindEvent();
}
PT.Account.BUpdate.prototype = {
	init: function() {
		var self = this;
		var ui = $(self.domSelector);

		self.getinfo();
		//		self.fileUpload(); //测试上传
	},
	bindEvent: function() {
		var self = this;
		var ui = $(self.domSelector);
		$('[name=business_cancle]', ui).click(function() {
			$.get("../../../ptdev_platform/html/personal_account/businessinfo.html", function(data) {
				$('#render').html(data);
			});
		});

		$('[name=business_submit]', ui).click(function() {
			if(self.validate()) {
				self.submit(ui);
			}
		});
		$('[name=brandlogo]', ui).on('change',function(){
			var path = $(this).val();
			self.fileUpload(path);
		});
	},
	//获取不能修改的信息，开发者id、企业名称、注册号、执照图片
	getinfo: function() {
		var self = this;
		//ajax
		var data = {
			devId: 'S6ED20160901', //开发者id
			enterprise: '上海大观多媒体娱乐有限公司', //企业名称
			firm: 'a4651-sjdis4-654sadas45fdfadfds', //注册号
			business_licence: '../../img/developer/deletephoto.png', //营业执照扫描件图片路径
			website: 'http://www.daguandeyule.com',
			brandname: 'CCCLUB',
			brandlogo: '../../img/developer/deletephoto.png',
			brandintro: '致力于开发儿童数字游戏和互动应用，让孩子们通过动态的交互方式来了解世界，' +
				'每一款应用都可以激发孩子们的想象力，让孩子不再仅限于从书本上获取知识。',
			username: "chengxiaodan",
			tel: '180174881771',
			areacode: '0215',
			fixedtel: '7118291',
			emailaddress: 'chengxiaodan@putao.com',
			address: '上海市闵行区虹桥镇田林路1016号绿洲科技三期2号楼葡萄科技'
		}
		$('#devId').text(data.devId); //开发者id
		$('#enterprise').text(data.enterprise); //企业名称
		$('#firm').text(data.firm); //注册号
		$('#business_licence').attr('src', data.business_licence); //营业执照扫描件图片路径
		if(data.website){
			$('#website').val(data.website); //网站 选填
		}
		if(data.brandname) {
			$('#brandname').val(data.brandname); //品牌名称 选填
		}
		if(data.brandlogo == "" || data.brandlogo == null || data.brandlogo == undefined) {
			self._uploadFail($('#brandlogo2')); //图片隐藏
		}else{
			self._uploadSucess($('#brandlogo2'),data.brandlogo,$('#brandlogo2').width,241);
		}
		if(data.brandintro) {
			$('#brandintro').val(data.brandintro); //品牌简介 选填
		}
		$('#username').val(data.username);//联系人姓名
		$('#tel').val(data.tel); //联系人电话 
		if(data.fixedtel) {
			$('#areacode').val(data.areacode);
			$('#fixedtel').val(data.fixedtel); //联系人座机电话 选填
		}
		$('#emailaddress').val(data.emailaddress); //邮箱地址
		$('#address').val(data.address); //居住地址
	},
	validate: function() {
		var self = this;
		var ui = $(self.domSelector);
		var valid = true;
		var username = $('#username'); //联系人姓名
		var tel = $('#tel'); //联系人电话 
		var emailAddress = $('#emailaddress'); //邮箱地址
		var address = $('#address'); //联系地址

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

		(function() {
			var flag = true;
			if(null == $.trim(tel.val()) || "" == $.trim(tel.val())) {
				flag = false;
				tel.css('border', '1px solid #FF5722');
				PT_utils.showBox($('.tipdiv2'), "请输入联系人电话", true);
			} else if(!PT_utils.isphone($.trim(tel.val()))) {
				flag = false;
				tel.css('border', '1px solid #FF5722');
				PT_utils.showBox($('.tipdiv2'), "请输入正确的联系人电话", true);
			} else {
				tel.css('border', '1px solid #dbdbdb');
				PT_utils.showBox($('.tipdiv2'), "", false);
			}
			valid = valid && flag;
		})();

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
	fileUpload: function(url) {
		var self = this;
		//上传中进度条
		PT_utils.progress('brandlogo_pc',25);//进度条显示
		//上传成功之后需要更改图片路径
		PT_utils.progress('brandlogo_pc',100);//进度条隐藏
//		var url = "../../img/developer/deletephoto.png";//假设上传到服务器的路径值
		self._uploadSucess($('#brandlogo2'),url,$('#brandlogo2').width,241);
		//上传失败
//		PT_utils.progress('brandlogo_pc',100);//进度条隐藏
//		self._uploadFail($('#brandlogo2'));//图片隐藏
	},
	formdata: function() {
		var data = {};
		var website = $('#website').val(); //网站 选填
		var brandname = $('#brandname').val(); //品牌名称 选填
		var brandlogo = "";
		if(!$('#brandlogo2').is(':hidden')){
			var brandlogo = $('#brandlogo2').attr('src'); //品牌log 选填
		}
		var brandintro = $('#brandintro').val(); //品牌简介 选填
		var username = $('#username').val(); //联系人姓名
		var tel = $('#tel').val(); //联系人电话 
		var areacode = $('#areacode').val();//区号 选填
		var fixedtel = $('#fixedtel').val(); //联系人座机电话 选填
		var emailAddress = $('#emailaddress').val(); //邮箱地址
		var address = $('#address').val(); //居住地址

		//json  传参key值以后台接口为准,相关人员可以修改
		return data = {
			website: website,
			brandname: brandname,
			brandlogo: brandlogo,
			brandintro: brandintro,
			username: username,
			tel: tel,
			areacode:areacode,
			fixedtel: fixedtel,
			emailAddress: emailAddress,
			address: address
		};
	},
	submit: function() {
		var self = this;
		var formdata = self.formdata();
		//提交成功之后，进入详情页面
		$.get("../../../ptdev_platform/html/personal_account/businessinfo.html", function(data) {
			$('#render').html(data);
		});
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
					$.get("../../../ptdev_platform/html/personal_account/businessinfo.html",function(data){
						$('#render').html(data);
					});
				}
			},
			error: function (data) {
				
			}
		});*/
	}

}