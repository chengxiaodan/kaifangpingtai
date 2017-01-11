PT_utils.namespace('PT.Creatapp');

PT.Creatapp = function() {
	this.progresss = null; //进度条对象
	this.init();
	this.bindEvent();
}
PT.Creatapp.prototype = {
	init: function() {
		var self = this;
		stepBar.init("stepBar", { //步骤
			step: 1,
			animation: true
		}); //执行步骤初始化
		self.render('step1'); //默认显示第一步上传应用

//		stepBar.init("stepBar", { //步骤
//			step: 2,
//			animation: true
//		}); //执行步骤初始化
//		self.render('step3'); //默认显示第一步上传应用
//		new PT.Creatapp.addInfo({
//				appinfo: "",
//				domSelector: $("#step3")
//		});
	},
	bindEvent: function() {
		var self = this;
		self.uploadfile();
		$("#cancle").click(function() {
			$('#upload_app').uploadify('cancel');
		});
	},
	uploadfile: function() {
		var self = this;
		var obj = {
				id: "fileQueue",
				actionUrl: '', //请求路径
				method: 'post', //请求方式
				swf: '../../../ptdev_platform/js/plugin/uploadify/uploadify.swf',
				checkExisting: '../../../ptdev_platform/js/plugin/uploadify/check-exists.php',
				folder: '../../../ptdev_platform/js/plugin/uploadify/uploads', //您想将文件保存到的路径 
				uploadLimit: 1, //最多上传几个文件
				simUploadLimit: 1, //允许同时上传的个数 默认值：1
				fileDesc: 'apk文件',
				fileExt: '*.apk;', //控制可上传文件的扩展名，启用本项时需同时声明fileDesc  
				multi: false, //设置为true时可以上传多个文件
				fileSizeLimit: '1024KB' //上传文件的大小限制
			}
			//官网API地址ttp://www.uploadify.com/documentation/
		$("#upload_app").uploadify({
			//			'uploader': '../../../ptdev_platform/js/plugin/uploadify/uploadify.php',
			'uploader': obj.actionUrl,
			'method': obj.method,
			'swf': obj.swf,
			'checkExisting': obj.checkExisting, //判断上传选择的文件在服务器是否存在的后台处理程序的相对路径
			//			'cancelImg': '../../../ptdev_platform/js/plugin/uploadify/uploadify-cancel.png', //取消上传图片
			'folder': obj.folder, //您想将文件保存到的路径  
			'queueID': obj.id, //与下面的id对应  
			'queueSizeLimit': 1, //在同一时间是在队列中的文件的最大数量,超过该限制，onSelectError被触发事件。
			'uploadLimit': obj.uploadLimit, //最多上传几个文件
			'fileDataName': 'upload_app', //设置一个名字，在服务器处理程序中根据该名字来取上传文件的数据。默认为Filedata
			'fileDesc': obj.fileDesc,
			'fileExt': obj.fileExt, //控制可上传文件的扩展名，启用本项时需同时声明fileDesc  
			'auto': true, //设置为true当选择文件后就直接上传了，为false需要点击上传按钮才上传 
			'multi': obj.multi, //设置为true时可以上传多个文件 
			'fileSizeLimit': obj.fileSizeLimit, //上传文件的大小限制
			'simUploadLimit': obj.simUploadLimit, //允许同时上传的个数 默认值：1 。 
			'width': 340,
			'height': 50,
			'preventCaching': false,
			'progressData': 'percentage', //百分比
			'wmode': 'transparent',
			//设置该项为transparent 可以使浏览按钮的flash背景文件透明，并且flash文件会被置为页面的最高层。 默认值：opaque 。
			'overrideEvents': ['onSelectError', 'onDialogClose', 'onUploadProgress', 'onUploadStart'], // 不执行默认的事件
			'onFallback': function() {
				Showbo.Msg.alert("您未安装FLASH控件，无法上传图片！请安装FLASH控件后再试。");
			}, // 检测FLASH失败调用
			'onSelect': function(file) {
				self.uploadStart(file);
			}, //当每个文件添加至队列后触发
			'onSelectError': function(file, errorCode, errorMsg) {
				if(errorCode == SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT) { // -110
					Showbo.Msg.alert("文件大小超出限制（" + this.settings.fileSizeLimit + "）");
				} else if(errorCode == SWFUpload.QUEUE_ERROR.INVALID_FILETYPE) { // -130
					Showbo.Msg.alert("请选择以下类型文件（" + this.settings.fileTypeExts + "）");
				}
			}, //当文件选定发生错误时触发
			'onUploadError': function(file, errorCode, errorMsg, errorString, swfuploadifyQueue) {
				self.uploadError(file, errorCode, errorMsg, errorString, swfuploadifyQueue);
			}, //上传文件出错是触发（每个出错文件触发一次)
			'onUploadProgress': function(file, fileBytesLoaded, fileTotalBytes, queueBytesLoaded, swfuploadifyQueueUploadSize) {
				self.uploadProgress(file, fileBytesLoaded, fileTotalBytes, queueBytesLoaded, swfuploadifyQueueUploadSize);
			}, //上传进度发生变更时触发
			'onUploadStart': function(file) {
				self.uploadStart(file);
			}, //上传开始时触发（每个文件触发一次)
			'onUploadSuccess': function(file, data, response) {
					self.uploadSuccess(file, data, response);
				} //上传完成时触发（每个文件触发一次）
		});
	},
	//开始上传
	uploadStart: function(file) {
		var self = this;
		file.size = "23.0MB";
		stepBar.init("stepBar", {
			step: 1,
			animation: true
		});
		self.render('step2'); //默认显示第一步上传应用
		$(".uploadify-queue-item").hide(); //隐藏自带进度条
		// 获取应用logo 的地址假设参数为file.logo
		file.logo = "../../img/delete_applogo.png";
		$("#appLogo").css("background", "url(" + file.logo + ") no-repeat center center");
		$("#fileName").text(file.name);
		self.progress = new Progress({
			renderTo: $('#progress'),
			defaultProgress: 0,
			uploadsize: "0",
			filesize: file.size
		});
	},
	//上传中
	uploadProgress: function(file, fileBytesLoaded, fileTotalBytes, queueBytesLoaded, swfuploadifyQueueUploadSize) {
		var self = this;
		var percent = fileBytesLoaded / fileTotalBytes * 100;
		percent = 50; //模拟上传百分比是50
		fileBytesLoaded = "6.8MB";
		self.progresss.fileUploading(percent, fileBytesLoaded);

		//				alert('id: ' + file.id +
		//					' - 索引: ' + file.index +
		//					' - 文件名: ' + file.name +
		//					' - 文件大小: ' + file.size +
		//					' - 类型: ' + file.type +
		//					' - 创建日期: ' + file.creationdate +
		//					' - 修改日期: ' + file.modificationdate +
		//					' - 文件状态: ' + file.filestatus +
		//					' - 当前文件已上传: ' + fileBytesLoaded +
		//					' - 当前文件大小: ' + fileTotalBytes +
		//					' - 队列已上传: ' + queueBytesLoaded +
		//					' - 队列大小: ' + swfuploadifyQueueUploadSize);
	},
	//上传成功
	uploadSuccess: function(file, data, response) {
		var self = this;
		if(response.state == "success") {
			self.progresss.fileUploadSuccess(); //上传成功进度条展示
			stepBar.init("stepBar", {
				step: 2,
				animation: true
			});
			self.render('step3');
			var appinfo = {
				packgename: file.name,
				version: file.version,
				size: file.size,
				md5: file.md5,
				appid: file.appId,
				appkey: file.appKey,
				appType: file.appType
			}
			var addInfo = new PT.Creatapp.addInfo({
				appinfo: appinfo,
				domSelector: $("#step3")
			});
		}
		//				alert('id: ' + file.id +
		//					' - 索引: ' + file.index +
		//					' - 文件名: ' + file.name +
		//					' - 文件大小: ' + file.size +
		//					' - 类型: ' + file.type +
		//					' - 创建日期: ' + file.creationdate +
		//					' - 修改日期: ' + file.modificationdate +
		//					' - 文件状态: ' + file.filestatus +
		//					' - 服务器端消息: ' + data +
		//					' - 是否上传成功: ' + response);
	},
	//上传出错
	uploadError: function(file, errorCode, errorMsg, errorString, swfuploadifyQueue) {
		var self = this;
		Showbo.Msg.alert('id: ' + file.id +
			' - 索引: ' + file.index +
			' - 文件名: ' + file.name +
			' - 文件大小: ' + file.size +
			' - 类型: ' + file.type +
			' - 创建日期: ' + file.creationdate +
			' - 修改日期: ' + file.modificationdate +
			' - 文件状态: ' + file.filestatus +
			' - 错误代码: ' + errorCode +
			' - 错误描述: ' + errorMsg +
			' - 简要错误描述: ' + errorString);
	},
	//显示的页面
	render: function(str) {
		var arr = ['step1', 'step2', 'step3', 'step4'];
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