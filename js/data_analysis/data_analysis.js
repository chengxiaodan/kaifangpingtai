//我的应用
PT_utils.namespace('PT.Manage');

PT.Manage.dataAnalysis = function() {
	this.dastart = 0;
	this.dystart = 0;
	this.oustart = 0;
	this.init();
	this.bindEvent();
}
PT.Manage.dataAnalysis.prototype = {
	init: function() {
		var self = this;

		self.getAppInfo(); //配置app信息

		self.setOutline("outline"); //默认显示概览模块
		Analysis_util.tabRender({
			name: "tractor",
			callback: function(arr, id) {
				switch(id) {
					case arr[0]:
						self.setOutline(id);
						break;
					case arr[1]:
						self.setDownAnalyse(id);
						break;
					case arr[2]:
						self.setDynamic(id);
						break;
					case arr[3]:
						self.setOpenup(id);
						break;
				}
			}
		});
	},
	bindEvent: function() {
		var self = this;
	},
	getAppInfo: function() {
		var self = this;
		var id = PT_utils.getUrlParameter("appId");
		//ajax 参数某个应用数据id

		//模拟获取到的数据
		var data = {
			applogo: "../../img/manage/delete-app.png",
			apptitle: "水果忍者(cc破解版)",
			appID: 'SPD20160710SE',
			appKey: "6f73c74712dc61fcc8530ef8ee",
			packageName: '20160710BETA0', //包名
			version: '12.5.1', //版本号
			checkState: '已下架' //审核状态
		}
		$("#applogo").attr('src', data.applogo);
		$("#apptitle").text(data.apptitle);
		$("#appId").text(data.appID);
		$("#appIdKey").text(data.appKey);
		$("#packgename").text(data.packageName);
		$("#version").text(data.version);
		$("#checkState").text(data.checkState);
		self.setRootBtn(data.checkState);
	},
	pcheckstate: function() {
		var checkStatebtn = $("#checkState");
		if($("right-part").find(".uncheckedbtn")) {
			checkStatebtn.removeClass("uncheckedbtn");
		} else if($("right-part").find(".successbtn")) {
			checkStatebtn.removeClass("successbtn");
		}
		checkStatebtn.addClass("normalbtn");
	},
	setRootBtn: function(checkState) {
		var self = this;
		var checkStatebtn = $("#checkState");
		switch(checkState) {
			case "待提交":
				self.pcheckstate();
				break;
			case "审核中":
				self.pcheckstate();
				break;
			case "审核未通过":
				checkStatebtn.removeClass("normalbtn").addClass("uncheckedbtn");
				break;
			case "已上架":
				checkStatebtn.removeClass("normalbtn").addClass("successbtn");
				break;
			case "已下架":
				self.pcheckstate();
				break;
		}
	},
	//数据统计信息
	getDataCount: function(time) {
		var requestData = {
				startTime: time.startTime,
				endTime: time.endTime
			}
			//ajax
		var data = {
			//如果是timestamp类型，Analysis_util.parseFormat(new Date(parseInt(timestamp) * 1000));
			endDate: Analysis_util.parseFormat(new Date(), "/"), //截止时间
			downCountTotal: PT_utils.thousandBitSeparator(71516), //累计下载次数
			downUserTotal: PT_utils.thousandBitSeparator(1862), //累计下载人数
			userTotal: PT_utils.thousandBitSeparator(68195), //累计用户
			startCount: PT_utils.thousandBitSeparator(1832), //累计启动次数
			yAddUser: PT_utils.thousandBitSeparator(2000), //昨日新增用户
			yDownCount: PT_utils.thousandBitSeparator(12714), //昨日下载次数
			yDownUser: PT_utils.thousandBitSeparator(2000), //昨日下载人数
			yStartCount: PT_utils.thousandBitSeparator(12714) //昨日启动次数
		};
		$("#endDate").text(data.endDate);
		$("#downCountTotal").text(data.downCountTotal);
		$("#downUserTotal").text(data.downUserTotal);
		$("#userTotal").text(data.userTotal);
		$("#startCount").text(data.startCount);
		$("#yAddUser").text(data.yAddUser);
		$("#yDownCount").text(data.yDownCount);
		$("#yDownUser").text(data.yDownUser);
		$("#yStartCount").text(data.yStartCount);
	},
	setOutline: function(id) {
		var self = this;
		$("#" + id).parent().height(878);
		Analysis_util.dataTime(id,function(value){
			self.setOutline(id);
		}); //初始化时间插件
		var date = Analysis_util.getDateTime(id);
		self.getDataCount(date); //设置数据信息
		Analysis_util.getUser("adduser", date);
		//tab切换
		Analysis_util.tabRender({
			name: "dev-chart", //tab模块下的radio name
			callback: function(arr, id2) {
				switch(id2) {
					case arr[0]:
						var time = Analysis_util.getDateTime(id); //获取开始和结束时间
						Analysis_util.getUser(id2, time);
						break;
					case arr[1]:
						var time = Analysis_util.getDateTime(id); //获取开始和结束时间
						Analysis_util.getAcivityUser(id2, time);
						break;
					case arr[2]:
						var time = Analysis_util.getDateTime(id); //获取开始和结束时间
						Analysis_util.getDownUser(id2, time);
						break;
					case arr[3]:
						var time = Analysis_util.getDateTime(id); //获取开始和结束时间
						Analysis_util.getDownCount(id2, time);
						break;
					case arr[4]:
						var time = Analysis_util.getDateTime(id); //获取开始和结束时间
						Analysis_util.getOpenCount(id2, time);
						break;
				}
			}
		});
	},
	//下载分析
	setDownAnalyse: function(id) {
		var self = this;
		$("#" + id).parent().height(1020);
		self.dastart = 0;
		$("#daTable").empty();
		Analysis_util.dataTime(id,function(value){
			self.setDownAnalyse(id);
		}); //初始化时间插件

		var date = Analysis_util.getDateTime(id); //默认显示下载人数

		self.getDaList(id, date);

		Analysis_util.getDownUser("da_downuser", date);

		Analysis_util.tabRender({
			name: "da-chart", //tab模块下的radio name
			callback: function(arr, id2) {
				switch(id2) {
					case arr[0]:
						var time = Analysis_util.getDateTime(id); //获取开始和结束时间
						Analysis_util.getDownUser(id2, time);
						break;
					case arr[1]:
						var time = Analysis_util.getDateTime(id); //获取开始和结束时间
						Analysis_util.getDownCount(id2, time);
						break;
					case arr[2]:
						var time = Analysis_util.getDateTime(id); //获取开始和结束时间
						Analysis_util.getUser(id2, time);
						break;
				}
			}
		});
	},
	//活跃分析
	setDynamic: function(id) {
		var self = this;
		$("#" + id).parent().height(1020);
		self.dystart = 0;
		$("#dyTable").empty();
		Analysis_util.dataTime(id,function(value){
			self.setDynamic(id);
		}); //初始化时间插件
		var date = Analysis_util.getDateTime(id); //默认显示新增用户

		self.getDyList(id, date);

		Analysis_util.getUser("dy_adduser", date);

		Analysis_util.tabRender({
			name: "dy-chart", //tab模块下的radio name
			callback: function(arr, id2) {
				switch(id2) {
					case arr[0]:
						var time = Analysis_util.getDateTime(id); //获取开始和结束时间
						Analysis_util.getUser(id2, time);
						break;
					case arr[1]:
						var time = Analysis_util.getDateTime(id); //获取开始和结束时间
						Analysis_util.getAcivityUser(id2, time);
						break;
				}
			}
		});
	},
	//启动分析
	setOpenup: function(id) {
		var self = this;
		$("#" + id).parent().height(1020);
		self.oustart = 0;
		$("#ouTable").empty();
		Analysis_util.dataTime(id,function(value){
			self.setOpenup(id);
		}); //初始化时间插件
		var date = Analysis_util.getDateTime(id); //默认显示启动用户

		self.getOuList(id, date);

		Analysis_util.getOpenUser("ou_user", date);

		Analysis_util.tabRender({
			name: "ou-chart", //tab模块下的radio name
			callback: function(arr, id2) {
				switch(id2) {
					case arr[0]:
						var time = Analysis_util.getDateTime(id); //获取开始和结束时间
						Analysis_util.getOpenUser(id2, time);
						break;
					case arr[1]:
						var time = Analysis_util.getDateTime(id); //获取开始和结束时间
						Analysis_util.getOpenCount(id2, time);
						break;
				}
			}
		});
	},
	//获取时间段内每天的数据
	getDaList: function(id, time) {
		var self = this;
		//滚动条分页
		$("#daTable").scroll(function() {
			var viewH = $(this).height(); //可见高度
			var contentH = $(this)[0].scrollHeight; //内容高度
			var scrollTop = $(this).scrollTop(); //滚动高度
			if(scrollTop / (contentH - viewH) >= 1) {
				//此处加载数据
				var date = Analysis_util.getDateTime(id); //获取开始和结束时间
				self.getDaList(id, date);
			}
		});
		var requestData = {
				startTime: time.startTime,
				endTime: time.endTime,
				start: self.dastart,
				limit: 5
			}
			//ajax  参数 requestData

		//模拟成功
		self.dastart += 5;
		var dataList = [{
			//如果是timestamp类型，Analysis_util.parseFormat(new Date(parseInt(timestamp) * 1000),"");
			date: Analysis_util.parseFormat(new Date(), "-"), //截止时间
			userTotal: PT_utils.thousandBitSeparator(68195), //累计用户数
			downCountTotal: PT_utils.thousandBitSeparator(71516), //累计下载次数
			addUser: PT_utils.thousandBitSeparator(2000), //新增用户数
			downUser: PT_utils.thousandBitSeparator(1862), //当日下载人数
			downCount: PT_utils.thousandBitSeparator(1862) //当日下载人数
		}, {
			//如果是timestamp类型，Analysis_util.parseFormat(new Date(parseInt(timestamp) * 1000),"");
			date: Analysis_util.parseFormat(new Date(), "-"), //截止时间
			userTotal: PT_utils.thousandBitSeparator(68195), //累计用户数
			downCountTotal: PT_utils.thousandBitSeparator(71516), //累计下载次数
			addUser: PT_utils.thousandBitSeparator(2000), //新增用户数
			downUser: PT_utils.thousandBitSeparator(1862), //当日下载人数
			downCount: PT_utils.thousandBitSeparator(1862) //当日下载人数
		}];
		if(dataList && dataList.length > 0) {
			$.each(dataList, function(index, item) {
				self.renderDaTable(item);
			});
		}
	},
	//获取时间段内每天的数据
	getDyList: function(id, time) {
		var self = this;
		//滚动条分页
		$("#dyTable").scroll(function() {
			var viewH = $(this).height(); //可见高度
			var contentH = $(this)[0].scrollHeight; //内容高度
			var scrollTop = $(this).scrollTop(); //滚动高度
			if(scrollTop / (contentH - viewH) >= 1) {
				//此处加载数据
				var date = Analysis_util.getDateTime(id); //获取开始和结束时间
				self.getDyList(id, date);
			}
		});
		var requestData = {
				startTime: time.startTime,
				endTime: time.endTime,
				start: self.dystart,
				limit: 5
			}
			//ajax  参数 requestData

		//模拟成功
		self.dystart += 5;
		var dataList = [{
			//如果是timestamp类型，Analysis_util.parseFormat(new Date(parseInt(timestamp) * 1000),"");
			date: Analysis_util.parseFormat(new Date(), "-"), //日期
			addUser: PT_utils.thousandBitSeparator(2000), //新增用户数
			activetyUser: PT_utils.thousandBitSeparator(2000), //活跃用户数
			sevenActivetyUser: PT_utils.thousandBitSeparator(2000), //7活跃用户数
			thirtyActivetyUser: PT_utils.thousandBitSeparator(2000) //30活跃用户数
		}, {
			//如果是timestamp类型，Analysis_util.parseFormat(new Date(parseInt(timestamp) * 1000),"");
			date: Analysis_util.parseFormat(new Date(), "-"), //截止时间
			addUser: PT_utils.thousandBitSeparator(2000), //新增用户数
			activetyUser: PT_utils.thousandBitSeparator(2000), //活跃用户数
			sevenActivetyUser: PT_utils.thousandBitSeparator(2000), //7活跃用户数
			thirtyActivetyUser: PT_utils.thousandBitSeparator(2000) //30活跃用户数
		}];
		if(dataList && dataList.length > 0) {
			$.each(dataList, function(index, item) {
				self.renderDyTable(item);
			});
		}
	},
	//获取时间段内每天的数据
	getOuList: function(id, time) {
		var self = this;
		//滚动条分页
		$("#ouTable").scroll(function() {
			var viewH = $(this).height(); //可见高度
			var contentH = $(this)[0].scrollHeight; //内容高度
			var scrollTop = $(this).scrollTop(); //滚动高度
			if(scrollTop / (contentH - viewH) >= 1) {
				//此处加载数据
				var date = Analysis_util.getDateTime(id); //获取开始和结束时间
				self.getOuList(id, date);
			}
		});
		var requestData = {
				startTime: time.startTime,
				endTime: time.endTime,
				start: self.oustart,
				limit: 5
			}
			//ajax  参数 requestData

		//模拟成功
		self.oustart += 5;
		var dataList = [{
			//如果是timestamp类型，Analysis_util.parseFormat(new Date(parseInt(timestamp) * 1000),"");
			date: Analysis_util.parseFormat(new Date(), "-"), //日期
			startUser: PT_utils.thousandBitSeparator(1832), //启动人数
			startCount: PT_utils.thousandBitSeparator(1832), //启动次数
			sevenActivetyUser: PT_utils.thousandBitSeparator(2000), //7活跃用户数
			thirtyActivetyUser: PT_utils.thousandBitSeparator(2000) //30活跃用户数
		}, {
			//如果是timestamp类型，Analysis_util.parseFormat(new Date(parseInt(timestamp) * 1000),"");
			date: Analysis_util.parseFormat(new Date(), "-"), //日期
			startUser: PT_utils.thousandBitSeparator(1832), //启动人数
			startCount: PT_utils.thousandBitSeparator(1832), //启动次数
			sevenActivetyUser: PT_utils.thousandBitSeparator(2000), //7活跃用户数
			thirtyActivetyUser: PT_utils.thousandBitSeparator(2000) //30活跃用户数
		}];
		if(dataList && dataList.length > 0) {
			$.each(dataList, function(index, item) {
				self.renderOuTable(item);
			});
		}
	},
	//有数据
	renderDaTable: function(data) {
		var $tr = $('<tr></tr>');
		var $date = $('<td>' + data.date + '</td>');
		var $userTotal = $('<td>' + data.userTotal + '</td>');
		var $downCountTotal = $('<td>' + data.downCountTotal + '</td>');
		var $addUser = $('<td>' + data.addUser + '</td>');
		var $downUser = $('<td>' + data.downUser + '</td>');
		var $downCount = $('<td>' + data.downCount + '</td>');
		$date.appendTo($tr);
		$userTotal.appendTo($tr);
		$downCountTotal.appendTo($tr);
		$addUser.appendTo($tr);
		$downUser.appendTo($tr);
		$downCount.appendTo($tr);
		$tr.appendTo($('#daTable'));
	},
	//有数据
	renderDyTable: function(data) {
		var $tr = $('<tr></tr>');
		var $date = $('<td>' + data.date + '</td>');
		var $addUser = $('<td>' + data.addUser + '</td>');
		var $activetyUser = $('<td>' + data.activetyUser + '</td>');
		var $sevenActivetyUser = $('<td>' + data.sevenActivetyUser + '</td>');
		var $thirtyActivetyUser = $('<td>' + data.thirtyActivetyUser + '</td>');
		$date.appendTo($tr);
		$addUser.appendTo($tr);
		$activetyUser.appendTo($tr);
		$sevenActivetyUser.appendTo($tr);
		$thirtyActivetyUser.appendTo($tr);
		$tr.appendTo($('#dyTable'));
	},
	//有数据
	renderOuTable: function(data) {
		var $tr = $('<tr></tr>');
		var $date = $('<td>' + data.date + '</td>');
		var $startUser = $('<td>' + data.startUser + '</td>');
		var $startCount = $('<td>' + data.startCount + '</td>');
		var $sevenActivetyUser = $('<td>' + data.sevenActivetyUser + '</td>');
		var $thirtyActivetyUser = $('<td>' + data.thirtyActivetyUser + '</td>');
		$date.appendTo($tr);
		$startUser.appendTo($tr);
		$startCount.appendTo($tr);
		$sevenActivetyUser.appendTo($tr);
		$thirtyActivetyUser.appendTo($tr);
		$tr.appendTo($('#ouTable'));
	}
}