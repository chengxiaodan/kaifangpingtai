//通知详情
PT_utils.namespace('PT.Notify');

PT.Notify.detail = function() {
	this.count = 0; // 总数
	this.pageCount = 0; // 后台总页数
	this.start = 0; // 起始页
	this.limit = 1; // 每页信息条数
	this.current = 1; //当前页
	this.init();
	this.bindEvent();
}
PT.Notify.detail.prototype = {
	init: function() {
		var self = this;
		self.getInfo(self.current, self.limit);
	},
	bindEvent: function() {
		var self = this;
		if(self.count != 0) {
			$('#notifypage').perfectPager({
				pageCount: self.pageCount,
				current: (self.current == -1) ? self.pageCount : self.current,
				easyMode: true,
				callback: function(currentNum) {
					//此处是激活当前页
					//currentNum 当前页码
					$('.notify-header').empty(); //清空之前渲染数据
					$('.notify-body').empty(); //清空之前渲染数据
					self.getInfo(currentNum, self.limit);
				}
			}).appendTo($('#notifypage'));
		}
	},
	getInfo: function(currentNum, limit) {
		var self = this;
		var requestData = {
				current: currentNum, //当前页码
				limit: limit, //每页信息最多显示条数
				id: ''
			}
			//ajax 参数id

		//假设请求成功
		var data = {
			total: 1,
			item: {
				title: "应用“ VR 播放器” （11391014）上线审核不通过",
				time: PT_utils.dateFormat(new Date()),
				//如果obj.time是timestamp类型，格式化选这个PT_utils.dateFormat(new Date(parseInt(timestamp) * 1000));
				summary: "您上传的移动应用上线审核不通过，请查阅。",
				appname: "VR播放器",
				pakegename: "com.stephanelx.vrplayer",
				reason: "该应用存在基本信息问题，应用简介过于简单，无法说明应用功能，且应用截图无法说明应用内容，请修改后重新提交。 该应用存在基本信息问题，应用截图存在重复图片，请修改后重新提交。",
				wiki: "http://wiki.open.putao.com/wiki/"
			}
		}
		self.render(data.item);
		var index = 2; //该数据所在集合的索引+1也就是当前页
		self.current = index+1;
		self.count = data.total; // 总数
		self.pageCount = data.total; // 后台总页数

	},
	render: function(obj) {
		var $title = $('<div id="notifyTitle" class="title">审核结果通知：'+obj.title+'</div>');
		var $time = $('<div id="notifyTime" class="datetime">'+obj.time+'</div>');
		var $article = $("<article>尊敬的开发者，您好：<br /> " + obj.summary +
			"<br /> 应用名称：" + obj.appname +
			"<br /> 安装包：" + obj.pakegename +
			"<br /> 理由： " + obj.reason +
			"<br /> 点击这里详见wiki：" + obj.wiki +
			"<br /> 请到应用总览页查看并修改。<br /> 系统自动发出，请勿回复。<br /></article>");
		$title.appendTo($('.notify-header'));
		$time.appendTo($('.notify-header'));
		$article.appendTo($('.notify-body'));
	}
}