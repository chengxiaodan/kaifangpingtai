// 基于准备好的dom，初始化echarts图表
(function($) {
	var setting = {
		title: "",
		xdatas: [],
		ydatas: [],
		color: "#8c65d7",
		labelColor: "#d8d8d8",
		backgroundColor: "rgba(243,238,251,0.7)"
	};
	//执行删除操作
	var methods = {
		echart: function(options) {
			return this.each(function() {
				var o = $.extend(o, setting);
				if(options) $.extend(o, options);

				var myChart = echarts.init(this);
				var option = {
					tooltip: {
						trigger: 'axis'
					},
					xAxis: [{
						type: 'category',
						splitLine: {
							show: false
						},
						axisLine: {
							show: false,
						},
						boundaryGap: false,
						axisLabel: {
							margin: 10,
							textStyle: {
								color: o.labelColor,
								align: "center",
								fontSize: 14
							}
						},
						data: o.xdatas
					}],
					yAxis: [{
						type: 'value',
						splitLine: {
							show: true,
							lineStyle: {
								color: "#d8d8d8"
							}
						},
						axisLabel: {
							margin: 10,
							textStyle: {
								color: o.labelColor,
								fontSize: 14
							}
						},
						axisLine: {
							show: false
						}
					}],
					series: [{
						name: o.title,
						type: 'line',
						tooltip: {
							backgroundColor: 'rgba(255,255,255,1)',
							borderColor: "#e0e0e0",
							borderWidth: 1,
							padding: 5 | 10 | 5 | 10,
							axisPointer: {
								type: "line",
								lineStyle: {
									color: o.color,
									type: "dashed", //dotted,dashed
									width: 1,
									shadowColor: 'rgba(139,100,214,1)'
								}
							},
							textStyle: {
								color: "#4a4a4a",
								fontSize: 14
							}
						},
						stack: '总量',
						itemStyle: {
							normal: {
								color: o.color,
								lineStyle: {
									width: 1
								},
								areaStyle: {
									color: o.backgroundColor,
									type: 'default'
								}
							}
						},
						symbol: "emptyCircle",
						symbolSize: 3 | 3,
						data: o.ydatas
					}]
				};
				// 为echarts对象加载数据 
				myChart.setOption(option);
			});
		}
	};

	$.fn.echart = function(method) {
		if(methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if(typeof method === 'object' || !method) {
			return methods.echart.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.multiselect2side');
		}
	};
})(jQuery);