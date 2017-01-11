//我的应用
PT_utils.namespace('PT.Manage');

PT.Manage.appstore = function() {
	this.basicStart = 0;
	this.dataStart = 0;
	this.fptStart = 0;
	this.init();
	this.bindEvent();
}
PT.Manage.appstore.prototype = {
	init: function() {
		var self = this;
		var id = $("input[name=tractor]:checked").attr("id");
		var arr = ['basicinfo', 'datacount', 'finreport'];
		if(id == arr[0]) {
			$('#basicinfo_table tbody').empty();
			self.basicStart = 0;
			self.getBasiclist(id);
		} else if(id == arr[1]) {
			$('#datacount_table tbody').empty();
			self.dataStart = 0;
			self.getCountlist(id);
		} else if(id.attr('id') == arr[2]) {
			$('#finreport_table tbody').empty();
			self.fpstart = 0;
			self.getFinreportlist(id);
		}
	},
	bindEvent: function() {
		var self = this;

		var arr2 = ['basicAllType', 'basicAllState', 'dataAllType', 'finreportAllType'];
		for(var i = 0; i < arr2.length; i++) {
			self.eachLi($('#' + arr2[i] + ' li'));
		}
		$('#' + arr2[0]).parent().hover(function() {
			$('#' + arr2[0]).show();
		}, function() {
			$('#' + arr2[0]).hide();
		});
		$('#' + arr2[1]).parent().hover(function() {
			$('#' + arr2[1]).show();
		}, function() {
			$('#' + arr2[1]).hide();
		});
		$('#' + arr2[2]).parent().hover(function() {
			$('#' + arr2[2]).show();
		}, function() {
			$('#' + arr2[2]).hide();
		});
		$('#' + arr2[3]).parent().hover(function() {
			$('#' + arr2[3]).show();
		}, function() {
			$('#' + arr2[3]).hide();
		});

		//关闭创建应用窗口
		$('#creatApp')[0].addEventListener('click', function(e) {
			if(e.target.className == 'close pb-cursor') {
				$(this).hide();
			}
		});
		//创建应用
		var li = $('.apptypes li');
		for(var i = 0; i < li.length; i++) {
			(function(Index) {
				li[i].addEventListener('click', function(e) {
					$(this).siblings('li').removeClass('down-active');
					$(this).addClass("down-active");
					var type = $.trim($(this).children(".type-tip").text());
					$("#beginCreate").attr("href","../create_app/creatapp.html?type="+type);
				}, false);
			})(i)
		}
		$('#creatAppBtn').click(function() {
			$('#creatApp').show();
		});
		//数据为空时点击创建
		$('.creatAppBtn2').click(function() {
			$('#creatApp').show();
		});
		
		var arr = ['basicinfo', 'datacount', 'finreport'];
		$("input[name=tractor]").change(function() {
			if($(this).prop("checked")) {
				if($(this).attr('id') == arr[0]) {
					$('#basicinfo_table tbody').empty();
					self.basicStart = 0;
					self.getBasiclist('basicinfo');
				} else if($(this).attr('id') == arr[1]) {
					$('#datacount_table tbody').empty();
					self.dataStart = 0;
					self.getCountlist('datacount');
				} else if($(this).attr('id') == arr[2]) {
					$('#finreport_table tbody').empty();
					self.fpstart = 0;
					self.getFinreportlist('finreport');
				}
			}
		});

	},
	getBasiclist: function(str) {
		var self = this;
		//滚动条分页
		$("#" + str + "_table tbody").scroll(function() {
			var viewH = $(this).height(); //可见高度
			var contentH = $(this)[0].scrollHeight; //内容高度
			var scrollTop = $(this).scrollTop(); //滚动高度
			if(scrollTop / (contentH - viewH) >= 1) {
				//此处加载数据
				self.getBasiclist(str);
			}
		});
		var data = {
				type: $('#basicTypeText').text(), //选择的类型
				state: $('#stateText').text(), //选择的状态
				start: self.basicStart,
				limit: 10
			}
			// ajax 请求后台参数为data

		//模拟获取到基本信息的数据
		self.basicStart += 10;
		var dataList = [{
			id: "1",
			appLogo: '../../img/table/delete.png',
			appName: 'QQ音乐',
			appType: '应用',
			appState: '待提交',
			appVersion: 'V2.12 beta',
			updateTime: PT_utils.dateFormat(new Date())
				//格式化时间，如果是timestamp类型，格式化选这个PT_utils.dateFormat(new Date(parseInt(timestamp) * 1000));
		}, {
			id: "2",
			appLogo: '../../img/table/delete.png',
			appName: '微信',
			appType: '应用',
			appState: '审核中',
			appVersion: 'V2.12 beta',
			updateTime: PT_utils.dateFormat(new Date())
				//格式化时间，如果是timestamp类型，格式化选这个PT_utils.dateFormat(new Date(parseInt(timestamp) * 1000));
		}, {
			id: "3",
			appLogo: '../../img/table/delete.png',
			appName: '锤子时钟',
			appType: '应用',
			appState: '审核未通过',
			appVersion: 'V2.12 beta',
			updateTime: PT_utils.dateFormat(new Date())
		}, {
			id: "4",
			appLogo: '../../img/table/delete.png',
			appName: '水果忍者',
			appType: '应用',
			appState: '已上架',
			appVersion: 'V2.12 beta',
			updateTime: PT_utils.dateFormat(new Date())
				//格式化时间，如果是timestamp类型，格式化选这个PT_utils.dateFormat(new Date(parseInt(timestamp) * 1000));
		}, {
			id: "5",
			appLogo: '../../img/table/delete.png',
			appName: '开心消消乐',
			appType: '应用',
			appState: '已下架',
			appVersion: 'V2.12 beta',
			updateTime: PT_utils.dateFormat(new Date())
				//格式化时间，如果是timestamp类型，格式化选这个PT_utils.dateFormat(new Date(parseInt(timestamp) * 1000));
		}];
		
		if(dataList.length == 0) {
			self.renderEmpty(str); //数据为空时渲染页面
		} else {
			$.each(dataList, function(index, item) {
				self.renderTable(str, item);
			});
		}

		self.clickBtn("basicinfo_table");
	},
	getCountlist: function(str) {
		var self = this;
		//滚动条分页
		$("#" + str + "_table tbody").scroll(function() {
			var viewH = $(this).height(); //可见高度
			var contentH = $(this)[0].scrollHeight; //内容高度
			var scrollTop = $(this).scrollTop(); //滚动高度
			if(scrollTop / (contentH - viewH) >= 1) {
				//此处加载数据
				self.getCountlist(str);
			}
		});
		var data = {
				type: $('#dataTypeText').text(), //选择的类型
				start: self.dataStart,
				limit: 10
			}
			// ajax 请求后台参数为data

		//模拟获取到数据统计的数据
		self.basicStart += 10;
		var dataList = [{
			id: "1",
			appLogo: '../../img/table/delete.png',
			appName: 'QQ音乐',
			appType: '应用',
			TPeopleNum: 201031,
			YPeopleNum: 284,
			Tfrequency: 394012,
			Yfrequency: 312,
			//			sevenTime: '4小时40分钟5用1秒'
			sevenTime: PT_utils.dateFormatStr(new Date())
				//格式化时间，如果是timestamp类型，格式化选这个PT_utils.dateFormat(new Date(parseInt(timestamp) * 1000));
		}, {
			id: "2",
			appLogo: '../../img/table/delete.png',
			appName: '微信',
			appType: '应用',
			TPeopleNum: 201031,
			YPeopleNum: 284,
			Tfrequency: 394012,
			Yfrequency: 312,
			//			sevenTime: '4小时40分钟5用1秒'
			sevenTime: PT_utils.dateFormatStr(new Date())
				//格式化时间，如果是timestamp类型，格式化选这个PT_utils.dateFormat(new Date(parseInt(timestamp) * 1000));
		}];
		if(dataList.length == 0) {
			self.renderEmpty(str); //数据为空时渲染页面
		} else {
			$.each(dataList, function(index, item) {
				self.renderTable(str, item);
			});
		}
		self.clickBtn("datacount_table");
	},
	getFinreportlist: function(str) {
		var self = this;
		$("#" + str + "_table tbody").scroll(function() {
			var viewH = $(this).height(); //可见高度
			var contentH = $(this)[0].scrollHeight; //内容高度
			var scrollTop = $(this).scrollTop(); //滚动高度
			if(scrollTop / (contentH - viewH) >= 1) {
				//此处加载数据
				self.getFinreportlist(str);
			}
		});
		var data = {
				type: $('#finreportText').text(), //选择的类型
				start: self.fptStart,
				limit: 10
			}
			// ajax 请求后台参数为data

		//模拟获取到财务预算的数据
		self.fptStart += 10;
		var dataList = [{
			id: "1",
			//格式化时间，如果是timestamp类型，格式化选这个参数new Date(parseInt(timestamp) * 1000);
			month: self.formatMonth(new Date()), //结算月份
			accountNum: 124735, //结算单号
			appName: '迪斯尼',
			appType: '应用',
			effectiveOrder: 6183, //有效订单数
			totalAmount: '7,189.00', //总金额
			commission: '71.89', //手续费
			devIncome: '7,117.11', //开发者收入
			accountState: '已打款' // 结算状态
		}, {
			id: "2",
			//格式化时间，如果是timestamp类型，格式化选这个参数new Date(parseInt(timestamp) * 1000);
			month: self.formatMonth(new Date()), //结算月份
			accountNum: 124735, //结算单号
			appName: '宝宝巴士',
			appType: '应用',
			effectiveOrder: 6183, //有效订单数
			totalAmount: '7,189.00', //总金额
			commission: '71.89', //手续费
			devIncome: '7,117.11', //开发者收入
			accountState: '未结算' // 结算状态
		}, {
			id: "3",
			//格式化时间，如果是timestamp类型，格式化选这个参数new Date(parseInt(timestamp) * 1000);
			month: self.formatMonth(new Date()), //结算月份
			accountNum: 124735, //结算单号
			appName: '水果忍者',
			appType: '应用',
			effectiveOrder: 6183, //有效订单数
			totalAmount: '7,189.00', //总金额
			commission: '71.89', //手续费
			devIncome: '7,117.11', //开发者收入
			accountState: '已结算' // 结算状态
		}];
		if(dataList.length == 0) {
			self.renderEmpty(str); //数据为空时渲染页面
		} else {
			$.each(dataList, function(index, item) {
				self.renderTable(str, item);
			});
		}
	},
	//点击操作按钮
	clickBtn: function(id) {
		var self = this;
		$('#' + id + ' tbody td a').click(function() {
			var tdSeq = $(this).parent().parent().find("td").index($(this).parent()); //触发的列数
			var trSeq = $(this).parent().parent().parent().find("tr").index($(this).parent().parent()); //触发的行数
			//			alert("第" + (trSeq) + "行，第" + (tdSeq + 1) + "列");
			var data_id = $(this).parent().parent().parent().find("tr:eq(" + trSeq + ")").attr('data-id');
			var str = $(this).text();
			switch(str) {
				case "查看":
					$(this).attr('href', 'detail.html?data_id=' + data_id); //data_id该条数据唯一id
					break;
				case "编辑":
					$(this).attr('href', 'edit.html?data_id=' + data_id); //data_id该条数据唯一id
					break;
				case "提交":
					Showbo.Msg.confirm('提交前请确认已完整填写应用信息，提交后需要经过人工审核，请耐心等待。', function(flag) {
						if(flag) {
							self.submit();
						}
					});
					break;
				case "删除":
					Showbo.Msg.confirm('应用的统计数据和财务数据将一同被删除，确认删除该应用？', function(flag) {
						if(flag) {
							var $tr = $('#' + id + ' tr:gt(0):eq(' + trSeq + ')');
							self.delete($tr);
						}
					});
					break;
				case "更新":
					$(this).attr('href', 'update.html?data_id=' + data_id); //data_id该条数据唯一id
					break;
				case "下架":
					$("#downline_reason").val("");
					$('#downline-box').show();
					// 下架窗口操作
					$('#downline-box')[0].addEventListener('click', function(e) {
						if(e.target.className == 'close pb-cursor') {
							$(this).hide();
						} else if(e.target.className == 'bbtn btn-sign bbtn-disabled') {
							return;
						} else if(e.target.className == 'bbtn btn-sign') {
							$('#downline-box').hide();
							self.downline();
						}
					});
					$('#downline-box')[0].addEventListener('keydown', function(e) {
						if(e.target.id == 'downline_reason') {
							if($.trim($("#downline_reason").val()) !== "") {
								$('#submit').removeClass("bbtn-disabled");
							} else {
								$('#submit').addClass("bbtn-disabled");
							}
						}
					});
					break;
			}
		});
	},
	submit: function() {
		//ajax
		// 模拟
		Showbo.Msg.alert('提交成功');
	},
	delete: function(tr) {
		//ajax
		// 模拟
		tr.remove(); //删除行
		Showbo.Msg.alert('删除成功');
	},
	downline: function() {
		//ajax
		// 模拟
		Showbo.Msg.alert('下架成功');
	},
	//有数据
	renderTable: function(item, data) {
		if(!$('#' + item + '_table').prev().is(":hidden")) {
			$('#' + item + '_table').prev().hide(); //空的隐藏
		}
		if($('#' + item + '_table').is(":hidden")) {
			$('#' + item + '_table').show(); //表格显示
		}
		var $tr = $('<tr data-id="tr-' + data.id + '"></tr>');
		if(item == "basicinfo") {
			var $appLogo = $('<td><figure class="applogo"><img src="' + data.appLogo + '"></figure></td>');
			var $appName = $('<td>' + data.appName + '</td>');
			var $appType = $('<td>' + data.appType + '</td>');
			var $appState = null;
			var $btn = null;
			switch(data.appState) {
				case "待提交":
					$appState = $('<td>' + data.appState + '</td>');
					$btn = $('<td class="pb-left"><a>查看</a><a>编辑</a><a>提交</a><a>删除</a></td>');
					break;
				case "审核中":
					$appState = $('<td>' + data.appState + '</td>');
					$btn = $('<td class="pb-left"><a>查看</a></td>');
					break;
				case "审核未通过":
					$appState = $('<td class="unchecked">' + data.appState + '</td>');
					$btn = $('<td class="pb-left"><a>查看</a><a>编辑</a><a>删除</a></td>');
					break;
				case "已上架":
					$appState = $('<td class="line">' + data.appState + '</td>');
					$btn = $('<td class="pb-left"><a>查看</a><a>编辑</a><a>更新</a><a>下架</a></td>');
					break;
				case "已下架":
					$appState = $('<td>' + data.appState + '</td>');
					$btn = $('<td class="pb-left"><a >查看</a><a >编辑</a><a>删除</a></td>');
					break;
			}
			var $appVersion = $('<td>' + data.appVersion + '</td>');
			var $updateTime = $('<td>' + data.updateTime + '</td>');
			$appLogo.appendTo($tr);
			$appName.appendTo($tr);
			$appType.appendTo($tr);
			$appState.appendTo($tr);
			$appVersion.appendTo($tr);
			$updateTime.appendTo($tr);
			$btn.appendTo($tr);
			$tr.appendTo($('#basicTbody'));
		} else if(item == "datacount") {
			var $appLogo = $('<td><figure class="applogo"><img src="' + data.appLogo + '"></figure></td>');
			var $appName = $('<td>' + data.appName + '</td>');
			var $appType = $('<td>' + data.appType + '</td>');
			var $TPeopleNum = $('<td>' + data.TPeopleNum + '</td>');
			var $YPeopleNum = $('<td>' + data.YPeopleNum + '</td>');
			var $Tfrequency = $('<td>' + data.Tfrequency + '</td>');
			var $Yfrequency = $('<td>' + data.Yfrequency + '</td>');
			var $sevenTime = $('<td style="width: 140px;">' + data.sevenTime + '</td>');
			var $btn = $('<td><a >查看</a></td>');
			$appLogo.appendTo($tr);
			$appName.appendTo($tr);
			$appType.appendTo($tr);
			$TPeopleNum.appendTo($tr);
			$YPeopleNum.appendTo($tr);
			$Tfrequency.appendTo($tr);
			$Yfrequency.appendTo($tr);
			$sevenTime.appendTo($tr);
			$btn.appendTo($tr);
			$tr.appendTo($('#dataTbody'));
		} else {
			var $month = $('<td>' + data.month + '</td>');
			var $accountNum = $('<td>' + data.accountNum + '</td>');
			var $appName = $('<td>' + data.appName + '</td>');
			var $appType = $('<td>' + data.appType + '</td>');
			var $effectiveOrder = $('<td>' + data.effectiveOrder + '</td>');
			var $totalAmount = $('<td>' + data.totalAmount + '</td>');
			var $commission = $('<td>' + data.commission + '</td>');
			var $devIncome = $('<td>' + data.devIncome + '</td>');
			var $accountState = $('<td>' + data.accountState + '</td>');
			if(data.accountState == "已打款"){
				$accountState.css("color","#35c25B");
			}else{
				$accountState.css("color","#4A4A4A");
			}
			$month.appendTo($tr);
			$accountNum.appendTo($tr);
			$appName.appendTo($tr);
			$appType.appendTo($tr);
			$effectiveOrder.appendTo($tr);
			$totalAmount.appendTo($tr);
			$commission.appendTo($tr);
			$devIncome.appendTo($tr);
			$accountState.appendTo($tr);
			$tr.appendTo($('#accountTbody'));
		}
	},
	//数据为空 item：basicinfo ／ datacount／ finreport
	renderEmpty: function(item) {
		$('#' + item + '_table').prev().show(); //空的显示
		$('#' + item + '_table').hide(); //表格隐藏
	},
	eachLi: function(li) {
		var self = this;
		for(var i = 0; i < li.length; i++) {
			(function(Index) {
				li[i].addEventListener('click', function(e) {
					$(this).siblings('li').removeClass('list_active');
					$(this).addClass("list_active");
					$(this).parent().prev().text($(this).text());
					$(this).parent().hide();

					// 选条件重新获取数据渲染
					var arr = ['basicinfo_table', 'datacount_table', 'finreport_table'];
					var $section = $(this).parent().parent().parent().parent();
					if($section.attr('id') == arr[0]) {
						$('#basicinfo_table tbody').empty();
						self.getBasiclist('basicinfo');
					} else if($section.attr('id') == arr[1]) {
						$('#datacount_table tbody').empty();
						self.getCountlist('datacount');
					} else if($section.attr('id') == arr[2]) {
						$('#finreport_table tbody').empty();
						self.getFinreportlist('finreport');
					}
				}, false);
			})(i)
		}
	},
	formatMonth: function(time) {
		var format_result = time.getFullYear() + "/";

		if(time.getMonth() + 1 < 10) {
			format_result += "0";
		}
		format_result += time.getMonth() + 1;
		return format_result;
	}
}