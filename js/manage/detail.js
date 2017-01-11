//应用详情
PT_utils.namespace('PT.Manage');

PT.Manage.detail = function() {
	this.start = 0;
	this.init();
	this.bindEvent();
}
PT.Manage.detail.prototype = {
	init: function() {
		var self = this;
		self.getAppInfo();
		self.getlist();
	},
	bindEvent: function() {
		var self = this;
		//滚动条分页
		$("#detailTable").scroll(function() {
			var viewH = $(this).height(); //可见高度
			var contentH = $(this)[0].scrollHeight; //内容高度
			var scrollTop = $(this).scrollTop(); //滚动高度
			if(scrollTop / (contentH - viewH) >= 1) {
				//此处加载数据
				self.getlist();
			}
		});
		//查看更多
		$("#appinfoBtn").click(function() {
			window.location.href = "appinfo.html?appId=" + PT_utils.getUrlParameter("data_id");
		});
		//查看详细
		$("#analysisBtn").click(function() {
			window.location.href = "../data_analysis/data_analysis.html?appId=" + PT_utils.getUrlParameter("data_id");
		});
	},
	getAppInfo: function() {
		var self = this;
		var id = PT_utils.getUrlParameter("data_id");
		//ajax 参数某个应用数据id

		//模拟获取到的数据
		var data = {
			applogo: "../../img/manage/delete-app.png",
			apptitle: "水果忍者(cc破解版)",
			appID: 'SPD20160710SE',
			appKey: "6f73c74712dc61fcc8530ef8ee",
			packageName: '20160710BETA0', //包名
			version: '12.5.1', //版本号
			checkState: '已下架', //审核状态
			appType: "游戏", //应用类型
			agePart: "6+", //适应年龄段
			appintro: "从Fruitasia的惊人的世界联袂行动的新特点。！当你从一个新手水果彪形大汉增长到全力以赴的切片机和胜郎马里将引导您在游戏过程中切片水果，不要加入妊拉黑舒服的沙发哈撒浪嘿疯了似的",
			downloadNum: "71,516", //累计下载次数
			ytpersonNum: "1,862", //昨日下载人数
			userCount: "68,195", //累计用户
			ytAddUser: "2,000", //昨日新增用户
			ytDownNum: "1,832", //昨日下载次数
			ytOpenNum: "12,724" //昨日启动次数
		}
		self.setAppInfo(data);
		self.setRootBtn(data.checkState, data.appID);
	},
	submit: function(id) {
		//ajax
		// 模拟
		Showbo.Msg.alert('提交成功');
	},
	delete: function(id) {
		//ajax
		// 模拟
		Showbo.Msg.alert('删除成功');
	},
	downline: function() {
		//ajax
		// 模拟
		Showbo.Msg.alert('下架成功');
	},
	getlist: function() {
		var self = this;
		var requestData = {
			id: PT_utils.getUrlParameter("data_id"),
			start: self.start,
			limit: 10
		};
		//ajax 参数某个应用数据requestData

		//模拟
		self.start += 10;
		var dataList = [{
			id: "1",
			version: "V2.12 beta",
			//格式化时间，如果是timestamp类型，格式化选这个参数new Date(parseInt(timestamp) * 1000);
			submitTime: PT_utils.dateFormat(new Date()), //提交时间
			updateTime: PT_utils.dateFormat(new Date()), //更新时间
			downline: PT_utils.dateFormat(new Date()) //下架时间
		}, {
			id: "2",
			version: "V2.12 beta",
			//格式化时间，如果是timestamp类型，格式化选这个参数new Date(parseInt(timestamp) * 1000);
			submitTime: PT_utils.dateFormat(new Date()), //提交时间
			updateTime: PT_utils.dateFormat(new Date()), //更新时间
			downline: PT_utils.dateFormat(new Date()) //下架时间
		}];
		if(dataList && dataList.length > 0) {
			$.each(dataList, function(index, item) {
				self.renderTable(item);
			});
		}
	},
	setAppInfo: function(data) {
		$("#applogo").attr('src', data.applogo);
		$("#apptitle").text(data.apptitle);
		$("#appId").text(data.appID);
		$("#appIdKey").text(data.appKey);
		$("#packgename").text(data.packageName);
		$("#version").text(data.version);
		$("#checkState").text(data.checkState);

		$("#appType").text(data.appType);
		$("#agePart").text(data.agePart);
		$("#appintro").text(data.appintro);

		$("#downloadNum").text(data.downloadNum);
		$("#ytpersonNum").text(data.ytpersonNum);
		$("#userCount").text(data.userCount);
		$("#ytAddUser").text(data.ytAddUser);
		$("#ytDownNum").text(data.ytDownNum);
		$("#ytOpenNum").text(data.ytOpenNum);
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
	setRootBtn: function(checkState, id) {
		var self = this;
		var edit = $("#edit");
		var update = $("#update");
		var submit = $("#submit");
		var downline = $("#downline");
		var deletebtn = $("#delete");
		var checkStatebtn = $("#checkState");
		switch(checkState) {
			case "待提交":
				self.pcheckstate();
				update.removeClass("update normal").addClass("dis-update disabled");
				downline.removeClass("downline normal").addClass("dis-downline disabled");
				edit.removeClass("dis-edit disabled").addClass("edit normal");
				edit.attr("href", "edit.html?id=" + id);
				submit.removeClass("dis-submit disabled").addClass("submit normal");
				submit.click(function() {
					Showbo.Msg.confirm('提交前请确认已完整填写应用信息，提交后需要经过人工审核，请耐心等待。', function(flag) {
						if(flag) {
							self.submit(id);
						}
					});
				});
				deletebtn.removeClass("dis-delete disabled").addClass("delete normal");
				deletebtn.click(function() {
					Showbo.Msg.confirm('应用的统计数据和财务数据将一同被删除，确认删除该应用？', function(flag) {
						if(flag) {
							self.delete(id);
						}
					});
				});
				break;
			case "审核中":
				self.pcheckstate();
				update.removeClass("update normal").addClass("dis-update disabled");
				downline.removeClass("downline normal").addClass("dis-downline disabled");
				deletebtn.removeClass("delete normal").addClass("dis-delete disabled");
				submit.removeClass("submit normal").addClass("dis-submit disabled");
				edit.removeClass("edit normal").addClass("dis-edit disabled");
				break;
			case "审核未通过":
				checkStatebtn.removeClass("normalbtn").addClass("uncheckedbtn");
				submit.removeClass("submit normal").addClass("dis-submit disabled");
				update.removeClass("update normal").addClass("dis-update disabled");
				downline.removeClass("downline normal").addClass("dis-downline disabled");
				edit.removeClass("dis-edit disabled").addClass("edit normal");
				edit.attr("href", "edit.html?id=" + id);
				deletebtn.removeClass("dis-delete disabled").addClass("delete normal");
				deletebtn.click(function() {
					Showbo.Msg.confirm('应用的统计数据和财务数据将一同被删除，确认删除该应用？', function(flag) {
						if(flag) {
							self.delete(id);
						}
					});
				});
				break;
			case "已上架":
				checkStatebtn.removeClass("normalbtn").addClass("successbtn");
				submit.removeClass("normal").addClass("dis-submit disabled");
				deletebtn.removeClass("delete normal").addClass("dis-delete disabled");
				edit.removeClass("dis-edit disabled").addClass("edit normal");
				edit.attr("href", "edit.html?id=" + id);

				update.removeClass("dis-update disabled").addClass("update normal");
				update.attr("href", "update.html?id=" + id);

				downline.removeClass("dis-downline disabled").addClass("downline normal");
				downline.click(function() {
					$("#downline_reason").val("");
					$('#downline-box').show();
				});
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
							$('#submitbtn').removeClass("bbtn-disabled");
						} else {
							$('#submitbtn').addClass("bbtn-disabled");
						}
					}
				});
				break;
			case "已下架":
				self.pcheckstate();
				submit.removeClass("submit normal").addClass("dis-submit disabled");
				update.removeClass("update normal").addClass("dis-update disabled");
				downline.removeClass("downline normal").addClass("dis-downline disabled");
				edit.removeClass("dis-edit disabled").addClass("edit normal");
				edit.attr("href", "edit.html?id=" + id);
				deletebtn.removeClass("dis-delete disabled").addClass("delete normal");
				deletebtn.click(function() {
					Showbo.Msg.confirm('应用的统计数据和财务数据将一同被删除，确认删除该应用？', function(flag) {
						if(flag) {
							self.delete(id);
						}
					});
				});
				break;
		}
	},
	//有数据
	renderTable: function(data) {
		var $tr = $('<tr data-id="tr-' + data.id + '"></tr>');
		var $version = $('<td>' + data.version + '</td>');
		var $submitTime = $('<td>' + data.submitTime + '</td>');
		var $updateTime = $('<td>' + data.updateTime + '</td>');
		var $downline = $('<td>' + data.downline + '</td>');
		var $btn = $('<td><a href="oldVersion.html?data_id=' + data.id + '">查看</a></td>');
		$version.appendTo($tr);
		$submitTime.appendTo($tr);
		$updateTime.appendTo($tr);
		$downline.appendTo($tr);
		$btn.appendTo($tr);
		$tr.appendTo($('#detailTable'));
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
			if(str == "查看") {
				$(this).attr('href', 'oldVersion.html?data_id=' + data_id); //data_id该条数据唯一id
			}
		});
	}
}