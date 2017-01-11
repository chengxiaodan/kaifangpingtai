//未读通知
PT_utils.namespace('PT.Notify');

PT.Notify.noread = function() {
	this.count = 0; // 总数
	this.pageCount = 0; // 后台总页数
	this.current = 1; // 当前页
	this.start = 0; // 起始页
	this.limit = 10; // 每页信息条数
	this.init();
	this.bindEvent();
}
PT.Notify.noread.prototype = {
	init: function() {
		var self = this;
		self.getUnreadNotify(self.current, self.limit, self.start);
	},
	bindEvent: function() {},
	//获取所有通知信息集合
	getUnreadNotify: function(currentNum, limit, start) {
		var self = this;
		//模拟分页开始
		var infolist = [{
			type: 0,
			url: 'notify_detail.html',
			content: '中秋节祝愿各位开发者节日快乐，葡萄科技中秋奔月抽奖大活动正在进行中！',
			time: PT_utils.dateFormat(new Date()) 
			//格式化时间，如果是timestamp类型，格式化选这个PT_utils.dateFormat(new Date(parseInt(timestamp) * 1000));
		}, {
			type: 0,
			url: 'notify_detail.html',
			content: '开发者登记审核结果通知',
			time: PT_utils.dateFormat(new Date()) 
			//格式化时间，如果是timestamp类型，格式化选这个PT_utils.dateFormat(new Date(parseInt(timestamp) * 1000));
		}, {
			type: 0,
			url: 'notify_detail.html',
			content: '中秋节祝愿各位开发者节日快乐，葡萄科技中秋奔月抽奖大活动正在进行中！',
			time: PT_utils.dateFormat(new Date()) //格式化时间，如果是timestamp类型，格式化选这个new Date(parseInt(timestamp) * 1000);
		}, {
			type: 0,
			url: 'notify_detail.html',
			content: '开发者登记审核结果通知',
			time: PT_utils.dateFormat(new Date()) //格式化时间，如果是timestamp类型，格式化选这个new Date(parseInt(timestamp) * 1000);
		}, {
			type: 0,
			url: 'notify_detail.html',
			content: '中秋节祝愿各位开发者节日快乐，葡萄科技中秋奔月抽奖大活动正在进行中！',
			time: PT_utils.dateFormat(new Date()) //格式化时间，如果是timestamp类型，格式化选这个new Date(parseInt(timestamp) * 1000);
		}, {
			type: 0,
			url: 'notify_detail.html',
			content: '开发者登记审核结果通知',
			time: PT_utils.dateFormat(new Date()) //格式化时间，如果是timestamp类型，格式化选这个new Date(parseInt(timestamp) * 1000);
		}, {
			type: 0,
			url: 'notify_detail.html',
			content: '中秋节祝愿各位开发者节日快乐，葡萄科技中秋奔月抽奖大活动正在进行中！',
			time: PT_utils.dateFormat(new Date()) //格式化时间，如果是timestamp类型，格式化选这个new Date(parseInt(timestamp) * 1000);
		}, {
			type: 0,
			url: 'notify_detail.html',
			content: '开发者登记审核结果通知',
			time: PT_utils.dateFormat(new Date()) //格式化时间，如果是timestamp类型，格式化选这个new Date(parseInt(timestamp) * 1000);
		}, {
			type: 0,
			url: 'notify_detail.html',
			content: '中秋节祝愿各位开发者节日快乐，葡萄科技中秋奔月抽奖大活动正在进行中！',
			time: PT_utils.dateFormat(new Date()) //格式化时间，如果是timestamp类型，格式化选这个new Date(parseInt(timestamp) * 1000);
		}, {
			type: 0,
			url: 'notify_detail.html',
			content: '开发者登记审核结果通知',
			time: PT_utils.dateFormat(new Date()) //格式化时间，如果是timestamp类型，格式化选这个new Date(parseInt(timestamp) * 1000);
		}];
		for(var i = 0; i < infolist.length; i++) {
			self.render(infolist[i].type, infolist[i].url, infolist[i].content, infolist[i].time);
		}
		$('#noread-page').perfectPager({
			pageCount: 2,
			current: (currentNum == -1) ? self.pageCount : currentNum,
			easyMode: true,
			callback: function(currentNum) {
				//此处是激活当前页
				//currentNum 当前页码
				var start = (currentNum - 1) * self.limit; //从后台获取第多少条开始获取数据 比如 0 10 20
				$('#noreadlist').empty(); //清空之前渲染数据
				self.getUnreadNotify(currentNum, self.limit, start);
			}
		}).appendTo($('#noread-page'));
		//模拟分页结束

		//		var requestData = {
		//			current: currentNum, //当前页码
		//			limit: limit //每页信息最多显示条数
		//			start: start //请求第多少条数据 比如 0 10 20
		//		};

		//ajax
		//		$.ajax({
		//			url: "",
		//			type: "post",
		//			data: JSON.stringify(requestData),
		//			dataType: "json",
		//			contentType: 'application/json;',
		//			success: function(data) {
		//				if(data.dataList){
		//					self.count = data.total;
		//					self.pageCount = Math.ceil(self.count / self.limit); // 模拟后台总页数
		//					if(self.count != 0) {
		//						$('#read-page').perfectPager({
		//							pageCount: self.pageCount,
		//							current: (currentNum==-1)?self.pageCount:currentNum,
		//							easyMode: true,
		//							callback: function(currentNum) {
		//								//此处是激活当前页
		//								//currentNum 当前页码
		//								var start = (currentNum - 1) * self.limit;
		//								$('#notifylist').empty();//清空渲染数据
		//								self.getUnreadNotify(currentNum,self.limit,start);
		//							}
		//						}).appendTo($('#read-page'));
		//					}
		//							var infolist = data.dataList;
		//							for(var i=0; i<infolist.length; i++){
		//								self.render(infolist[i].type,infolist[i].url,infolist[i].content,infolist[i].time);
		//							}
		//							}
		//
		//			},
		//			error: function(xmlHttpRequest, status, error) {}
		//		});
	},
	render: function(type, url, context, time) {
		var $li = $('<li></li>');
		var $readPart = null;
		if(type == 0) { //0 未读 1已读
			$readPart = $('<div class="noread-part items"></div>');
		}
		var $title = $('<div class="title"></div>');
		var $titleA = $('<a href="' + url + '">' + context + '</a>');
		var $time = $('<div class="datetime">' + time + '</div>');
		$titleA.appendTo($title);
		$title.appendTo($readPart);
		$time.appendTo($readPart);
		$readPart.appendTo($li);
		$li.appendTo($('#noreadlist'));
	}
}