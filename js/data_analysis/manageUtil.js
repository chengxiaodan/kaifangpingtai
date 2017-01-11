var Analysis_util = (function() {
	var parseFormat = function(time, format) {
			var format_result = time.getFullYear() + format;

			if(time.getMonth() + 1 < 10) {
				format_result += "0";
			}
			format_result += time.getMonth() + 1 + format;
			if(time.getDate() < 10) {
				format_result += "0";
			}
			format_result += time.getDate();
			return format_result;
		}
		//Datepicker时间插件
	var dataTime = function(id,callback) {
		var $datetime = $("#" + id + "_date input[type=datetime]");
		$datetime.keydown(function(event) {
			if(event.keyCode == 8) {
				return false;
			}
		});
		$datetime.Datepicker('multipleClear');
		$picker = $datetime.Datepicker('update', {
			mode: 'range',
			max: "today"
		});
		$picker = $datetime.Datepicker({
			mode: 'range',
			max: "today",
			callback: function(value){
				callback(value);
				$("#" + id + "_date input[type=radio]").attr("checked",false);
				$datetime.val(value);
			}
		});

		$("#" + id + "_date input[type=radio]").click(function() {
			if($(this).prop("checked")) {
				var date = new Date();
				if($(this).val() == 1) { //昨日
					date.setDate(date.getDate() - 1);
					$datetime.Datepicker('update', {
						mode: 'range',
						date: Analysis_util.parseFormat(date, "-"),
						endTime: Analysis_util.parseFormat(date, "-"),
						max: "today"
					});
					callback($datetime.val());
				} else if($(this).val() == 7) {
					date.setDate(date.getDate() - 7);
					$datetime.Datepicker('update', {
						mode: 'range',
						date: Analysis_util.parseFormat(date, "-"),
						endTime: Analysis_util.parseFormat(new Date(), "-"),
						max: "today"
					});
					callback($datetime.val());
				} else if($(this).val() == 30) {
					date.setMonth(date.getMonth() - 1);
					$datetime.Datepicker('update', {
						mode: 'range',
						date: Analysis_util.parseFormat(date, "-"),
						endTime: Analysis_util.parseFormat(new Date(), "-"),
						max: "today"
					});
					callback($datetime.val());
				}
			}
		});
	}
	var stringToTime = function(str) {
			var dateArr = str.split("-");
			var date = new Date(dateArr[0], dateArr[1], dateArr[2], 0, 0, 0);
			date.setMonth(date.getMonth() - 1);
			return date.getTime();
		}
		//获取开始和截止时间
	var getDateTime = function(id) {
			var str = $("#" + id + "_date input[type=datetime]").val();
			var arr = str.split(" 至 ");
			var starttimeStr = arr[0];
			var endtimeStr = arr[1];
			var starttime = stringToTime(starttimeStr);
			var endtime = stringToTime(endtimeStr);
			return {
				startTime: starttime,
				endTime: endtime
			};
		}
		//tab切换，渲染数据
	var tabRender = function(option) {
			var arr = [];
			$("input[name=" + option.name + "]").each(function() {
				arr.push($(this).attr("id"));
			});
			$("input[name=" + option.name + "]").change(function() {
				if($(this).prop("checked")) {
					for(var i = 0; i < arr.length; i++) {
						if($(this).attr('id') == arr[i]) {
							option.callback(arr, arr[i]);
						}
					}
				}
			});
		}
		//新增用户
	var getUser = function(id, time) {
			var requestData = {
					startTime: time.startTime,
					endTime: time.endTime
				}
				//ajax
				//成功显示chart 图表
			var data = {
				dates: ['2016/08/30', '2016/09/01', '2016/10/03', '2016/11/05', '2016/12/05', '2016/08/01', '2016/09/09'],
				count: [110, 120, 401, 1134, 1190, 1230, 1210]
			}
			$("." + id).echart({
				title: "新增用户",
				xdatas: data.dates,
				ydatas: data.count
			});
		}
		//活跃用户
	var getAcivityUser = function(id, time) {;
			var requestData = {
					startTime: time.startTime,
					endTime: time.endTime
				}
				//ajax
				//成功显示chart 图表
			var data = {
				dates: ['2016/08/30', '2016/09/01', '2016/10/03', '2016/11/05', '2016/12/05', '2016/08/01', '2016/09/09'],
				count: [110, 120, 401, 1134, 1190, 1230, 1210]
			}
			$("." + id).echart({
				title: "活跃用户",
				xdatas: data.dates,
				ydatas: data.count
			});
		}
		//下载人数
	var getDownUser = function(id, time) {
			var requestData = {
					startTime: time.startTime,
					endTime: time.endTime
				}
				//ajax
				//成功显示chart 图表
			var data = {
				dates: ['2016/08/30', '2016/09/01', '2016/10/03', '2016/11/05', '2016/12/05', '2016/08/01', '2016/09/09'],
				count: [110, 120, 401, 1134, 1190, 1230, 1210]
			}
			$("." + id).echart({
				title: "下载人数",
				xdatas: data.dates,
				ydatas: data.count
			});
		}
		//下载次数
	var getDownCount = function(id, time) {
			var requestData = {
					startTime: time.startTime,
					endTime: time.endTime
				}
				//ajax
				//成功显示chart 图表
			var data = {
				dates: ['2016/08/30', '2016/09/01', '2016/10/03', '2016/11/05', '2016/12/05', '2016/08/01', '2016/09/09'],
				count: [110, 120, 401, 1134, 1190, 1230, 1210]
			}
			$("." + id).echart({
				title: "下载次数",
				xdatas: data.dates,
				ydatas: data.count
			});
		}
		//启动次数
	var getOpenCount = function(id, time) {
			var requestData = {
					startTime: time.startTime,
					endTime: time.endTime
				}
				//ajax
				//成功显示chart 图表
			var data = {
				dates: ['2016/08/30', '2016/09/01', '2016/10/03', '2016/11/05', '2016/12/05', '2016/08/01', '2016/09/09'],
				count: [110, 120, 401, 1134, 1190, 1230, 1210]
			}
			$("." + id).echart({
				title: "启动次数",
				xdatas: data.dates,
				ydatas: data.count
			});
		}
		//启动人数
	var getOpenUser = function(id, time) {
		var requestData = {
				startTime: time.startTime,
				endTime: time.endTime
			}
			//ajax
			//成功显示chart 图标
		var data = {
			dates: ['2016/08/30', '2016/09/01', '2016/10/03', '2016/11/05', '2016/12/05', '2016/08/01', '2016/09/09'],
			count: [110, 120, 401, 1134, 1190, 1230, 1210]
		}
		$("." + id).echart({
			title: "启动人数",
			xdatas: data.dates,
			ydatas: data.count
		});
	}
	return {
		dataTime: dataTime,
		tabRender: tabRender,
		getUser: getUser,
		getAcivityUser: getAcivityUser,
		getDownUser: getDownUser,
		getDownCount: getDownCount,
		getOpenCount: getOpenCount,
		getOpenUser: getOpenUser,
		getDateTime: getDateTime,
		parseFormat: parseFormat
	};
})();