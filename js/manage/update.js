PT_utils.namespace('PT.Creatapp');

PT.Creatapp.update = function(config) {
	this.domSelector = config.domSelector;
	this.appinfo = null;
	this.keywords = [];
	this.valid = true;
	this.init();
	this.bindEvent();
}
PT.Creatapp.update.prototype = {
	init: function() {
		var self = this;
		self.setAppInfo(); //设置包信息
		self.setkeywords();
		self.getClassify(self.appinfo); //获取分类标签
		self.getKeyword(self.appinfo); //获取关键词
		self.uploaderImgAndApp(); //上传图片和app
		self.uploaderVideo(); //上传视频
	},
	//使用webUploader
	uploaderImgAndApp: function() {
		var self = this;
		var app = new PT.webUploader({
			$list: $("#appUploaderFile"),
			pick: '#appUpload_file', //选择按钮id
			// 选完文件后，是否自动上传。
			auto: true,
			fileVal: "appUpload_file", //设置文件上传域的name 指明参数名称，后台也用这个参数接收文件
			// swf文件路径
			swf: 'Uploader.swf',
			// 文件接收服务端。
			server: "../../../ptdev_platform/js/plugin/webuploader/fileupload.php",
			accept: {
				title: 'Apk',
				extensions: 'apk',
				mimeTypes: '.apk'
			}, //限制类型
			chunked: true, //分片处理
			formData: {}, //文件上传请求的参数表， 每次发送都会发送此对象中的参数。
			method: "POST", //请求方式
			fileNumLimit: 1, //限制上传文件个数
			fileSingleSizeLimit: 50 * 1024 * 1024, //限制单个上传文件大小50M
			thumbnailWidth: 425,
			thumbnailHeight: 240,
			paste: "#appUploaderFile"
		});
		var appinfo = app.uploaderApp(); //上传,返回的是webuploader对象 
		appinfo.on('uploadSuccess', function(file) {
			//上传成功之后数据处理
			self.setUploadInfo();
		});
		//应用图标
		var applogo = new PT.webUploader({
			$list: $("#applogo"), //图片列表区域
			pick: '#applogo_file', //选择按钮id
			accept: {
				title: 'Images',
				extensions: 'gif,jpg,jpeg,bmp,png',
				mimeTypes: 'image/*'
			}, //允许的文件类型
			server: '../../../ptdev_platform/js/plugin/webuploader/fileupload.php', // 文件接收服务端。
			auto: true, //是否开启自动上传
			formData: {}, //文件上传请求的参数表， 每次发送都会发送此对象中的参数。
			fileVal: "applogo_file", //设置文件上传域的name 指明参数名称，后台也用这个参数接收文件
			method: "POST", // //请求方式
			fileNumLimit: 1, //限制上传文件个数
			fileSingleSizeLimit: 5 * 1024 * 1024, //限制单个上传文件大小1M
			thumbnailWidth: 241,
			thumbnailHeight: 241,
			paste: "#applogo"
		});
		applogo.uploaderImage(); //上传,返回的是webuploader对象 
		//应用截图
		var appcut = new PT.webUploader({
			$list: $("#appcut"), //图片列表区域
			pick: '#appcut-file', //选择按钮id
			accept: {
				title: 'Images',
				extensions: 'jpg,jpeg,bmp,png',
				mimeTypes: 'image/*'
			}, //允许的文件类型
			server: '../../../ptdev_platform/js/plugin/webuploader/fileupload.php', // 文件接收服务端。
			auto: true, //是否开启自动上传
			formData: {}, //文件上传请求的参数表， 每次发送都会发送此对象中的参数。
			fileVal: "appcut-file", //设置文件上传域的name 指明参数名称，后台也用这个参数接收文件
			method: "POST", // //请求方式
			fileNumLimit: 5, //限制上传文件个数
			fileSingleSizeLimit: 5 * 1024 * 1024, //限制单个上传文件大小
			thumbnailWidth: 256,
			thumbnailHeight: 256,
			paste: "#appcut"
		});
		appcut.uploaderImage(); //上传,返回的是webuploader对象
		//版权证明
		var copyright = new PT.webUploader({
			$list: $("#copyright"), //图片列表区域
			pick: '#copyright-file', //选择按钮id
			accept: {
				title: 'Images',
				extensions: 'jpeg,png',
				mimeTypes: 'image/*'
			}, //允许的文件类型
			server: '../../../ptdev_platform/js/plugin/webuploader/fileupload.php', // 文件接收服务端。
			auto: true, //是否开启自动上传
			formData: {}, //文件上传请求的参数表， 每次发送都会发送此对象中的参数。
			fileVal: "copyright-file", //设置文件上传域的name 指明参数名称，后台也用这个参数接收文件
			method: "POST", // //请求方式
			fileNumLimit: 1, //限制上传文件个数
			fileSingleSizeLimit: 5 * 1024 * 1024, //限制单个上传文件大小
			thumbnailWidth: 425,
			thumbnailHeight: 244,
			paste: "#copyright"
		});
		copyright.uploaderImage(); //上传,返回的是webuploader对象 

	},
	setUploadInfo: function() {
		$("#uploadApp").hide(); //上传隐藏
		$("#appinfo").show(); //显示信息
		//ajax获取安装包信息
		var appinfo = {
			packgename: "20160710BETA0.apk",
			version: "12.5.1",
			size: "30.0MB",
			md5: "83847dbbf61a59c1d4b443741c2e3ab9",
			uploadTime: PT_utils.dateFormat(new Date())
		};
		$("#packgename").text(appinfo.packgename);
		$("#version").text(appinfo.version);
		$("#size").text(appinfo.size);
		$("#md5").text(appinfo.md5);
		$("#uploadTime").text(appinfo.uploadTime);
	},
	uploaderVideo: function() {
		var appVideo = new PT.webUploader({
			$list: $("#appvideo"), //图片列表区域
			pick: '#appvideo-file', //选择按钮id
			// 选完文件后，是否自动上传。
			auto: true,
			// swf文件路径
			swf: 'Uploader.swf',
			// 文件接收服务端。
			server: "../../../ptdev_platform/js/plugin/webuploader/fileupload.php",
			accept: {
				title: 'Video',
				extensions: 'mov,mp4,avi',
				mimeTypes: 'video/*'
			}, //限制类型
			chunked: true, //分片处理
			formData: {}, //文件上传请求的参数表， 每次发送都会发送此对象中的参数。
			method: "POST", //请求方式
			fileNumLimit: 1, //限制上传文件个数
			fileSingleSizeLimit: 50 * 1024 * 1024, //限制单个上传文件大小50M
			thumbnailWidth: 256,
			thumbnailHeight: 256
		});
		appVideo.uploaderVideo(); //上传,返回的是webuploader对象 
	},
	bindEvent: function() {
		var self = this;
		var ui = $(self.domSelector);

		$('[name=savebtn]', ui).click(function() {
//			if(self.validate()) {
				Showbo.Msg.confirm('所有编辑都将被保存，下次可以继续进行修改。', function(flag) {
					if(flag) {
						self.save();
					}
				});
//			}
		});
		$('[name=submitbtn]', ui).click(function() {
			if(self.validate()) {
				Showbo.Msg.confirm('请确认已经完成所有必填信息的填写。', function(flag) {
					if(flag) {
						self.submit();
					}
				});
			}
		});
		//实时监听文本框输入字数
		var list = $(".textareali textarea");
		for(var i = 0; i < list.length; i++) {
			(function(Index) {
				$(list[i]).keydown(function() {
					var length = 500;
					var content_len = $(this).val().length;
					var in_len = length - content_len;
					$(this).siblings(".count").find("span").text(in_len);
				});
			})(i)
		}
	},
	setkeywords: function() {
		var self = this;
		//关键词
		$("#keyword input[type=checkbox]").click(function() {
			if($(this).is(':checked')) {
				if($.inArray($(this).next("label").text(), self.keywords) == -1) {
					self.keywords.push($(this).next("label").text());
				}
			} else {
				self.keywords.splice($.inArray($(this).next("label").text(), self.keywords), 1);
			}
			PT_utils.myArray_Unique(self.keywords);
			var str = "";
			for(var i = 0; i < self.keywords.length; i++) {
				if(i !== self.keywords.length - 1) {
					str += self.keywords[i] + " ";
				} else {
					str += self.keywords[i];
				}
			}
			$("#keywordText").val(str);
		});
		$("#keywordText").keydown(function(event) {
			var checkeds = $("#keyword input[type=checkbox]:checked");
			var uncheckeds = $("#keyword input[type=checkbox]");
			var labels = [];
			$("#keyword label").each(function() {
				labels.push($(this).text());
			});
			if(event.keyCode == 8) {
				checkeds.each(function() {
					var str = $(this).next("label").text();
					if($("#keywordText").val().lastIndexOf(str) == -1) {
						$(this).attr("checked", false);
						self.keywords.splice($.inArray(str, self.keywords), 1);
					}
				})
			} else {
				uncheckeds.each(function(j, item) {
					var str = $(this).next("label").text();
					if($("#keywordText").val() !== "") {
						var newkeywords = $("#keywordText").val().split(" ");
						if(newkeywords) {
							for(var i = 0; i < newkeywords.length; i++) {
								if($.inArray(newkeywords[i], labels) !== -1) {
									if($.inArray(newkeywords[i], self.keywords) == -1) {
										self.keywords.push(str);
										$(this).attr("checked", true);
									}
								}
							}
						}
					}

				});
			}
		});
	},
	setAppInfo: function() {
		var self = this;
		//ajax

		var appinfo = {
			appid: "203050406",
			appkey: "6f73c7471512dc61fcc82956530ef8ee",
			appType: "游戏",
			appName: "水果忍者(CC破解版)",
			agePart: '0~20',
			free: 10,
			languges: ["简体中文", "繁体中文", "英语"],
			appintro: "从Fruitasia的惊人的世界联袂行动的新特点。！当你从一个新手水果彪形大汉增长到全力以赴的切片机和胜郎马里将引导您在游戏过程中切片水果，不需要去用太多的精力与技巧就能轻松通关，并且有丰富的奖励机制，快来一起挑战吧。",
			keywords: ["亲子互动", "艺术创造", "家庭游戏", "在线教育", "医疗资讯", "心理健康", "艺术创造", "家庭游戏"],
			applogo: "http://test.fe.ptdev.cn/ptdev_platform/img/developer/deletephoto.png",
			copyright: "http://test.fe.ptdev.cn/ptdev_platform/img/developer/deletephoto.png"
		};
		self.appinfo = appinfo;

		$("#apptype").text(appinfo.appType);
		$("#appid").text(appinfo.appid);
		$("#appkey").text(appinfo.appkey);
		$("#appname").text(appinfo.appName);
		var ages = [];
		if(appinfo.agePart !== "0+") {
			ages = appinfo.agePart.split("~");
			$("#minage").val(ages[0]);
			$("#maxage").val(ages[1]);
		}
		if(appinfo.free > 0) {
			$("#nba").attr("checked", true);
		} else {
			$("#cba").attr("checked", true);
		}
		$.each(appinfo.languges, function(i, value) {
			$("#languges input[type=checkbox]").each(function() {
				var text = $(this).siblings("span").text();
				if(text == value) {
					$(this).attr("checked", true);
				}
			});
		});
		$("#appintro").text(appinfo.appintro);

		var str = "";
		$.each(appinfo.keywords, function(i, value) {
			if(i !== appinfo.keywords.length - 1) {
				str += value + " ";
			} else {
				str += value;
			}
		});
		$("#keywordText").val(str);
		$('#applogo').find("div.photo").remove();
		var $fileitem = $('<div class="file-item" style="width: 256px; height: 256px;"></div>');
		var $applogo = $('<img src="'+appinfo.applogo+'">');
		$fileitem.append($applogo);
		$('#applogo').append($fileitem);
		PT_utils.changeImageSize($applogo,256,256);
		
		$('#copyright').find(".photo").remove();
		var $fileitem2 = $('<div class="file-item" style="width: 425px; height: 244px;"></div>');
		var $copyright = $('<img src="'+appinfo.copyright+'">');
		$copyright.appendTo($fileitem2);
		$fileitem2.appendTo($('#copyright'));
		PT_utils.changeImageSize($copyright,425,244);
	},
	//获取分类标签
	getClassify: function(appinfo) {
		//ajax
		var list = ["亲子互动", "艺术创造", "家庭游戏", "在线教育", "医疗资讯", "心理健康", "艺术创造", "家庭游戏"];
		for(var i = 0; i < list.length; i++) {
			var id = "item" + (i + 1);
			var $item = $('<div class="checkitem pb-itemsflex"></div>');
			var $checkbox = $('<div class="checkbox">' +
				'<input type="checkbox" name="checkbox" id="' + id + '" />' +
				'<label for="' + id + '" class="btn-check"></label>' +
				'</div><span>' + list[i] + '</span>');
			$item.append($checkbox);
			$("#classify").append($item);
		}
	},
	getKeyword: function(appinfo) {
		//ajax 参数appinfo.appid

		var list = ["亲子互动", "艺术创造", "家庭游戏", "在线教育", "医疗资讯", "心理健康", "艺术创造", "家庭游戏"];
		for(var i = 0; i < list.length; i++) {
			var id = "key" + (i + 1);
			var $li = $('<li><div class="checkbox">' +
				'<input type="checkbox" name="checkbox" id="' + id + '" />' +
				'<label for="' + id + '" class="btn-keyword">' + list[i] + '</label>' +
				'</div></li>');
			$li.appendTo($("#keyword"));
		}
	},
	fromData: function() {
		var self = this;
		var ui = $(self.domSelector);
		var appname = $('#appname').val(); //应用名称
		var agePart = "";
		if($.trim($('#minage').val()) !== "" && $.trim($('#maxage').val()) !== "") {
			agePart = $.trim($('#minage').val()) + "～" + $.trim($('#maxage').val());
		} else {
			agePart = "0+";
		} //年龄段
		var free = 0; //0免费1收费
		if($("input[name='free']:checked").val() == 1) {
			free = $("#money").val();
		}
		var classList = [];
		$("#classify input[type=checkbox]:checked").each(function() {
			var text = $(this).parent().siblings("span").text();
			classList.push(text);
		}); //分类标签
		var languges = [];
		$("#languges input[type=checkbox]:checked").each(function() {
			var text = $(this).siblings("span").text();
			languges.push(text);
		}); //支持语言
		var appintro = $('#appintro').val(); //应用简介
		var keywords = $("#keywordText").val().split(" "); //关键词
		keywords.splice($.inArray(" ", keywords), 1);
		var versioninfo = $('#versioninfo').val(); //版本介绍
		return {
			appname: appname,
			agePart: agePart,
			free: free,
			classList: classList,
			languges: languges,
			appintro: appintro,
			keywords: keywords,
			versioninfo: versioninfo
		};
	},
	// 保存
	save: function() {
		var self = this;
		var requestData = self.fromData();
		//ajax requestData
		//保存成功跳转到应用详情
		window.location.href = "appinfo.html";
	},
	//提交审核
	submit: function() {
		var self = this;
		var requestData = self.fromData();
		//ajax requestData
		//保存成功跳转到应用详情
		window.location.href = "appinfo.html";
	},
	validate: function() {
		var self = this;
		var ui = $(self.domSelector);
		var valid = true;
		var appintro = $('#appintro'); //应用简介
		var versioninfo = $('#versioninfo'); //版本介绍
		var classifys = $('#classify input[type=checkbox]:checked'); //分类标签
		var languges = $("#languges input[type=checkbox]:checked"); //支持语言
		var keywords = $("#keywordText"); //关键词
		var applogo = $('#applogo').find("img").length; //应用图标
		var appcuts = $('#appcut').find("img").length; //应用截图

		(function() {
			var flag = true;
			if($.trim(appcuts) == 0) {
				flag = false;
				Showbo.Msg.alert("请上传应用截图");
			}
			valid = valid && flag;
		})();
		(function() {
			var flag = true;
			if($.trim(applogo) == 0) {
				flag = false;
				Showbo.Msg.alert("请上传应用图标");
			}
			valid = valid && flag;
		})();
		(function() {
			var flag = true;
			if($.trim(keywords.val()) == "") {
				flag = false;
				Showbo.Msg.alert("请输入关键词");
			}
			valid = valid && flag;
		})();
		(function() {
			var flag = true;
			if(languges.length == 0) {
				flag = false;
				Showbo.Msg.alert("请选择支持语言");
			}
			valid = valid && flag;
		})();
		(function() {
			var flag = true;
			if(classifys.length == 0) {
				flag = false;
				Showbo.Msg.alert("请选择分类标签");
			}
			valid = valid && flag;
		})();

		(function() {
			var flag = true;
			if(null == $.trim(versioninfo.val()) || "" == $.trim(versioninfo.val())) {
				flag = false;
				Showbo.Msg.alert("请输入版本介绍");
			}
			valid = valid && flag;
		})();
		(function() {
			var flag = true;
			if(null == $.trim(appintro.val()) || "" == $.trim(appintro.val())) {
				flag = false;
				Showbo.Msg.alert("请输入应用简介");
			}
			valid = valid && flag;
		})();
		return valid;
	}

}