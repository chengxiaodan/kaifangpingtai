PT_utils.namespace('PT.webUploader');
PT.webUploader = function(config) {
	this.$list = config.$list; //图片列表区域
	this.pick = config.pick; //选择按钮id
	this.accept = config.accept || {}; //允许的文件类型
	this.server = config.server || ""; // 文件接收服务端。
	this.auto = config.auto || false; //是否开启自动上传
	this.formData = config.formData || {}; //文件上传请求的参数表， 每次发送都会发送此对象中的参数。
	this.fileVal = config.fileVal || ""; //设置文件上传域的name。
	this.method = config.method || ""; // //请求方式
	this.fileNumLimit = config.fileNumLimit || 5; //限制上传文件个数
	this.fileSingleSizeLimit = config.fileSingleSizeLimit || 5242880; //限制单个上传文件大小
	this.fileVal = config.fileVal || "file"; //指明参数名称，后台也用这个参数接收文件
	this.thumbnailWidth = config.thumbnailWidth || "110";
	this.thumbnailHeight = config.thumbnailHeight || "110";
	this.chunked = config.chunked || false; //分片处理, //分片处理
	this.duplicate = config.duplicate || false;
	this.paste = config.paste;
	var self = this;
}
PT.webUploader.prototype = {
	uploaderApp: function() {
		var self = this;
		var $list = self.$list;
		var uploader = WebUploader.create({
			// 选完文件后，是否自动上传。
			auto: self.auto,
			// swf文件路径
			swf: 'Uploader.swf',
			// 文件接收服务端。
			server: self.server,
			dnd: self.paste, //拖拽区域
			// 选择文件的按钮。可选。
			// 内部根据当前运行是创建，可能是input元素，也可能是flash.
			pick: self.pick,
			accept: self.accept, //限制类型
			chunked: true, //分片处理
			chunkSize: 5242880, //如果要分片，分多大一片？ 默认大小为5M.
			chunkRetry: 3, //如果某个分片由于网络问题出错，允许自动重传多少次？
			formData: self.formData, //文件上传请求的参数表， 每次发送都会发送此对象中的参数。
			method: self.method, //请求方式
			fileNumLimit: self.fileNumLimit, //限制上传文件个数
			fileSingleSizeLimit: self.fileSingleSizeLimit, //限制单个上传文件大小
			duplicate: self.duplicate
		});
		self.beforeFileQueued(uploader, $list, self.fileNumLimit);
		self.showApp(uploader, self.$list, self.thumbnailWidth, self.thumbnailHeight);
		self.uploadProgress(uploader);
		self.uploadVideoSuccess(uploader);
		self.uploadError(uploader);
		self.typeError(uploader, self.accept.extensions, self.fileSingleSizeLimit);
		self.uploadComplete(uploader);
		return uploader;
	},
	uploaderVideo: function() {
		var self = this;
		var $list = self.$list;
		var uploader = WebUploader.create({
			// 选完文件后，是否自动上传。
			auto: self.auto,
			// swf文件路径
			swf: 'Uploader.swf',
			// 文件接收服务端。
			server: self.server,
			// 选择文件的按钮。可选。
			// 内部根据当前运行是创建，可能是input元素，也可能是flash.
			pick: self.pick,
			accept: self.accept, //限制类型
			chunked: true, //分片处理
			chunkSize: 5242880, //如果要分片，分多大一片？ 默认大小为5M.
			chunkRetry: 3, //如果某个分片由于网络问题出错，允许自动重传多少次？
			formData: self.formData, //文件上传请求的参数表， 每次发送都会发送此对象中的参数。
			method: self.method, //请求方式
			fileNumLimit: self.fileNumLimit, //限制上传文件个数
			fileSingleSizeLimit: self.fileSingleSizeLimit, //限制单个上传文件大小
			duplicate: self.duplicate
		});
		self.beforeFileQueued(uploader, $list, self.fileNumLimit);
		self.showVideo(uploader, self.$list, self.thumbnailWidth, self.thumbnailHeight);
		self.uploadProgress(uploader);
		self.uploadVideoSuccess(uploader);
		self.uploadError(uploader);
		self.typeError(uploader, self.accept.extensions, self.fileSingleSizeLimit);
		self.uploadComplete(uploader);
		return uploader;
	},
	uploaderImage: function() {
		var self = this;
		var $list = self.$list;
		// 初始化Web Uploader
		var uploader = WebUploader.create({
			// 选完文件后，是否自动上传。
			auto: self.auto,
			// swf文件路径
			swf: 'Uploader.swf',
			// 文件接收服务端。
			server: self.server,
			// 选择文件的按钮。可选。
			// 内部根据当前运行是创建，可能是input元素，也可能是flash.
			pick: self.pick,
			accept: self.accept, //限制图片类型
			dnd: self.paste, //拖拽区域
			disableGlobalDnd: true, //禁止浏览器打开图片
			paste: self.paste, //黏贴区域
			prepareNextFile: true, //把下一个文件准备好
			chunked: false, //分片处理
			chunkSize: 5242880, //如果要分片，分多大一片？ 默认大小为5M.
			chunkRetry: 3, //如果某个分片由于网络问题出错，允许自动重传多少次？
			formData: self.formData, //文件上传请求的参数表， 每次发送都会发送此对象中的参数。
			fileVal: self.fileVal, //设置文件上传域的name。指明参数名称，后台也用这个参数接收文件
			method: self.method, //请求方式
			fileNumLimit: self.fileNumLimit, //限制上传文件个数
			fileSingleSizeLimit: self.fileSingleSizeLimit, //限制单个上传文件大小
			duplicate: self.duplicate //flase禁止重复上传true允许
		});
		if(self.fileNumLimit > 1) {
			self.beforeFileQueued(uploader, $list, self.fileNumLimit);
		}
		self.showImage(uploader, self.$list, self.thumbnailWidth, self.thumbnailHeight, self.accept, self.fileNumLimit);
		self.uploadProgress(uploader);
		self.uploadSuccess(uploader, self.$list,self.thumbnailWidth,self.thumbnailHeight);
		self.uploadError(uploader);
		self.typeError(uploader, self.accept.extensions, self.fileSingleSizeLimit);
		self.uploadComplete(uploader);
		return uploader;
	},
	// 修改后图片上传前，尝试将图片压缩到w * h
	compress: function(width, height) {
		uploader.option('compress', {
			width: width,
			height: height
		});
	},
	//超出限制文件数时不添加到队列
	beforeFileQueued: function(uploader, $list, uploadLimit) {
		uploader.on('beforeFileQueued', function(file) {
			var count = $list.find(".file-item").length;
			/**
			 * count 已经选择的图片数量
			 * uploadLimit  允许上传的数量
			 */
			return count >= uploadLimit ? false : true;
		});
	},
	showApp: function(uploader, $list, thumbnailWidth, thumbnailHeight) {
		//当有文件被添加进队列的时候
		uploader.on('fileQueued', function(file) {
			var $li = $(
				'<div id="' + file.id + '" class="file-item pb-border">' +
				'<div class="info">' + file.name + '</div>' +
				'</div>'
			);
			$list.find(".photo4").remove(); //先把占位的背景删除
			$li.css({
				"width": thumbnailWidth + "px",
				"height": thumbnailHeight + "px"
			});
			// $list为容器jQuery实例
			$list.append($li);

		});
	},
	showVideo: function(uploader, $list, thumbnailWidth, thumbnailHeight) {
		//当有文件被添加进队列的时候
		uploader.on('fileQueued', function(file) {
			//测试数据
			file.name = "myvideo.mp4";
			file.url = "myvideo.mp4";

			var $li = $(
				'<div id="' + file.id + '" class="file-item pb-border">' +
				'<a href="' + file.url + '" class="video" target="_blank"></a>' +
				'<video>' +
				'<source src="' + file.name + '" type="video/mp4"></source>' +
				'<source src="' + file.name + '" type="video/avi"></source>' +
				'<source src="' + file.name + '" type="video/mov"></source>' +
				'<object type="application/x-shockwave-flash" data="' + file.name + '">' +
				'<param name="movie" value="' + file.name + '" />' +
				'<param name="flashvars" value="autostart=true&amp;file=' + file.name + '" />' +
				'</object> 当前浏览器不支持 video直接播放，点击这里下载视频：' +
				'<a href="' + file.url + '">下载视频</a></video>' +
				'<div class="info">' + file.name + '</div>' +
				'</div>'
			);
			$list.find(".photo").remove(); //先把占位的背景删除
			$li.css({
				"width": thumbnailWidth + "px",
				"height": thumbnailHeight + "px"
			});
			// $list为容器jQuery实例
			$list.append($li);

		});
	},
	//预览图片
	showImage: function(uploader, $list, thumbnailWidth, thumbnailHeight, accept, limit) {
		uploader.on('fileQueued', function(file) {
			if(accept.title == "Images") {
				if(limit == 1) {
					$list.find(".file-item").remove(); //先把占位的背景删除
				}
				var $li = $(
						'<div id="' + file.id + '" class="file-item pb-border">' +
						'<img>' +
						'<div class="info">' + file.name + '</div>' +
						'</div>'
					),
					$img = $li.find('img');
				$list.find(".photo").remove(); //先把占位的背景删除
				$li.css({
					"width": thumbnailWidth + "px",
					"height": thumbnailHeight + "px"
				});
				// $list为容器jQuery实例
				$list.append($li);
				// 创建缩略图
				// 如果为非图片文件，可以不用调用此方法。
				// thumbnailWidth x thumbnailHeight 为 100 x 100
				uploader.makeThumb(file, function(error, src) {
					if(error) {
						$img.replaceWith('<div class="imgerror">不能预览</div>');
						return;
					}
					$img.attr('src', src);
				}, thumbnailWidth, thumbnailHeight);
			}
		});
	},
	// 文件上传过程中创建进度条实时显示。
	uploadProgress: function(uploader) {
		uploader.on('uploadProgress', function(file, percentage) {
			var $li = $('#' + file.id),
				$percent = $li.find('canvas');
			// 避免重复创建
			if(!$percent.length) {
				$percent = $('<canvas id="progress-' + file.id + '" width="172" height="172">您的浏览器不支持canvas！</canvas>')
					.appendTo($li);
			}
			PT_utils.progress('progress-' + file.id, Math.ceil(percentage) * 100); //进度条显示
		});
	},
	// 文件上传成功，给item删除默认样式添加成功class, 用样式标记上传成功。
	uploadVideoSuccess: function(uploader) {
		uploader.on('uploadSuccess', function(file, response) {
			var result = response;
			var url = result.url;
			var status = result.status;
			if(status) {
				$('#' + file.id).removeClass("pb-border");
			}

		});
	},
	// 文件上传成功，给item删除默认样式添加成功class, 用样式标记上传成功。
	uploadSuccess: function(uploader,$list,thumbnailHeight,type) {
		uploader.on('uploadSuccess', function(file, response) {
			var result = response;
			var url = result.url;
			var status = (result.code == 200);
			if(status) {
				var $li = $('#' + file.id);
				$li.removeClass("pb-border");
				var $btns = $('<div class="file-panel"></div>').appendTo($li);
				var $cancle = $('<span class="cancel">删除</span>').appendTo($btns);
				$cancle.hide();
				$btns.height(0);
				$li.on('mouseenter', function() {
					$cancle.show();
					$btns.stop().animate({
						height: thumbnailHeight
					});
				});
				$li.on('mouseleave', function() {
					$cancle.hide();
					$btns.stop().animate({
						height: 0
					});
				});
				$btns.on('click', '.cancel', function() {
					$list.find("#" + file.id).remove();
					if($list.find(".file-item").length == 0) {
						$list.append($('<div class="photo"></div>'));
					}
					uploader.removeFile(file);
					uploader.reset();
				});
			}
		});
	},
	// 文件上传失败，显示上传出错。
	uploadError: function(uploader) {
		uploader.on('uploadError', function(file) {
			var $li = $('#' + file.id),
				$error = $li.find('div.error');
			// 避免重复创建
			if(!$error.length) {
				$error = $('<div class="error"></div>').appendTo($li);
			}
			$error.text('上传失败');
		});
	},
	// 文件上传失败，显示上传出错。
	typeError: function(uploader, accept, fileSingleSizeLimit) {
		uploader.on('error', function(type) {
			if(type == "Q_TYPE_DENIED") {
				Showbo.Msg.alert("请上传" + accept + "格式文件");
			} else if(type == "F_EXCEED_SIZE") {
				Showbo.Msg.alert("文件大小不能超过" + fileSingleSizeLimit);
			}
		});
	},
	// 完成上传完了，成功或者失败，先删除进度条。
	uploadComplete: function(uploader) {
		uploader.on('uploadComplete', function(file) {
			$('#' + file.id).removeClass("pb-border");
			$('#' + file.id).find('progress-' + file.id).remove();
		});
	}
}