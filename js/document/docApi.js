PT_utils.namespace('PT.Document');

PT.Document.docApi = function(domSelector) {
	this.domSelector = domSelector;
	this.init();
	this.bindEvent();
}

PT.Document.docApi.prototype = {
	init: function() {
		var self = this;
		self.changeTab();
		self.getCatalogue();
	},
	bindEvent: function() {
		var self = this;
		var ui = $(self.domSelector);
		$(".title-01", ui).hover(function() {
			$(".tabbox").show();
		}, function() {
			$(".tabbox").hide();
		});
		
		var $search = $("#search");
		$search.keydown(function(e) {
			if(e.keyCode == 13) { //enter键
				if($.trim(this.value) !== "") {
					window.location.href = "html/document/search.html?keyword=" + $.trim(this.value);
					new PT.Document.search();
				}
			}
		});
	},
	//切换模块列表
	changeTab: function() {
		var self = this;
		//		var arr = ['appstore', 'bfstore', 'service'];
		var arr = ['appstore', 'service'];
		var whichIsClicked = [];
		$.each(arr, function(i, value) {
			$('#' + value + '_list').click(function() {
				if(whichIsClicked.length == 0) {
					$('#' + value + '_list').addClass("list_active");
					$('#' + value).show();
					$('#tabtitle').text($('#' + value + '_list').text());
					$('#tabtitle2')[0].innerText = $('#' + value + '_list').text();
					$.each(arr, function(j, other) {
						if(other !== value) {
							$('#' + other).hide();
						}
					});
					whichIsClicked.length = 0;
					whichIsClicked.push(value);
				} else if(whichIsClicked[0] == value) {
					return false;
				} else {
					$('#tabtitle2')[0].innerText = $('#' + value + '_list').text();
					$('#tabtitle').text($('#' + value + '_list').text());
					$('#' + whichIsClicked[0] + '_list').removeClass("list_active");
					$('#' + whichIsClicked[0]).hide();
					$('#' + value + '_list').addClass("list_active");
					$('#' + value).show();
					$.each(arr, function(j, other) {
						if(other !== value) {
							$('#' + other).hide();
						}
					});
					whichIsClicked.length = 0;
					whichIsClicked.push(value);
				}
				if($('#tabtitle').text() == "应用商店") {
					$("#" + value + " .dropdown").empty();
					self.getAppStore(value);
				} else if($('#tabtitle').text() == "开发者服务") {
					$("#" + value + " .dropdown").empty();
					self.getService(value);
				}
				$(".tabbox").hide();
			});
			if(i == 0) {
				$('#' + value + '_list').click();
			}
		});
	},
	//模拟数据
	getData: function() {
		var dataList = [{
			id: "1",
			title: "账号注册",
			list: [{
				url: "acticle1",
				name: "个人开发注册"
			}, {
				url: "acticle2",
				name: "企业开发注册"
			}, {
				url: "acticle3",
				name: "开发者服务"
			}]
		}, {
			id: "2",
			title: "应用管理",
			list: [{
				url: "acticle3",
				name: "应用提交"
			}, {
				url: "acticle3",
				name: "版本更新"
			}, {
				url: "acticle3",
				name: "应用审核规范"
			}, {
				url: "acticle3",
				name: "应用下线"
			}, {
				url: "acticle3",
				name: "应用信息修改"
			}]
		}, {
			id: "3",
			title: "应用推广",
			list: [{
				url: "acticle3",
				name: "应用提交"
			}, {
				url: "acticle3",
				name: "版本更新"
			}, {
				url: "acticle3",
				name: "应用审核规范"
			}, {
				url: "acticle3",
				name: "应用下线"
			}, {
				url: "acticle3",
				name: "应用信息修改"
			}]
		}, {
			id: "4",
			title: "FAQ",
			list: [{
				url: "acticle3",
				name: "个人开发注册"
			}, {
				url: "acticle3",
				name: "企业开发注册"
			}, {
				url: "acticle3",
				name: "开发者服务"
			}]
		}];
		return dataList;
	},
	getAppStore: function(id) {
		var self = this;
		//ajax 
		//模拟
		var dataList = self.getData();
		$.each(dataList, function(i, item) {
			self.renderlist(id, item);
		});
		$("#" + id + " input[type='checkbox']:first").attr("checked", true);
	},
	getService: function(id) {
		var self = this;
		//ajax 
		//模拟
		var dataList = self.getData();
		$.each(dataList, function(i, item) {
			self.renderlist(id, item);
		});
		$("#" + id + " input[type='checkbox']:first").attr("checked", true); //默认第一个展开
	},
	renderlist: function(id, data) {
		var $div = $("<div></div>");
		var $input = $('<input id="' + data.id + '" type="checkbox">');
		var $label = $('<label for="' + data.id + '">' + data.title + '</label>');
		var $ul = $('<ul class="animate"></ul>');

		$.each(data.list, function(i, item) {
			var $li = $('<li></li>');
			var $a = $('<a href="#' + item.url + '">' + item.name + '</a>');
			$li.append($a);
			$ul.append($li);
		});

		$div.append($input);
		$div.append($label);
		$div.append($ul);
		$("#" + id + " .dropdown").append($div);
	},
	//跟踪目录
	catalogue: function(num, item) {
		var subNav_active = $("#catalogue");
		var subNav_scroll = function(target) {
			subNav_active = target.parent();
		};
		$("#catalogue a").click(function() {
			subNav_scroll($(this));
			var target = $(this).attr("href");
			var targetScroll = $(target).offset().top;
			$(".article-wrapper").animate({
				scrollTop: targetScroll
			}, 300);
			return false;
		});
		$('.article-wrapper').scroll(function() {
			var $this = $(this);
			var targetTop = $(this).scrollTop();
			//			var height = $('.article-wrapper').height();
			if(targetTop < $("#" + item.id).height()) {
				subNav_scroll($("#" + item.id));
			}
		})
	},
	//目录
	getCatalogue: function() {
		var self = this;
		//ajax
		var dataList = [{
			id: "acticle1",
			title: "开发者收录标准",
			text: "safhsdjkfg"
		}, {
			id: "acticle2",
			title: "app收录标准",
			text: "safhsdjkfg",
			list: [{
				id: "two1",
				title: "二级目录",
				list: [{
					id: "three1",
					title: "三级目录"
				}, {
					id: "three2",
					title: "三级目录"
				}]
			}, {
				id: "two2",
				title: "二级目录"
			}]
		}, {
			id: "acticle3",
			text: "safhsdjkfg",
			title: "其他款项"
		}];
		var $li = $("<li>目录</li>");
		$li.appendTo($("#catalogue"));
		$.each(dataList, function(i, item) {
			self.renderCatalogue(i + 1, item);
			self.renderActicle(i + 1, item);
			self.catalogue(i + 1, item);
		});
	},
	//目录
	renderCatalogue: function(num, item) {
		var $oneli = $("<li></li");
		var $oneA = $("<a href = '#" + item.id + "'>" + num + "." + item.title + "</a>");
		$oneA.appendTo($oneli);
		if(item.list) {
			var $twoUl = $("<ul></ul>");
			$.each(item.list, function(i, data) {
				var $twoLi = $("<li></li>");
				var $twoA = $("<a href = '#" + data.id + "'>" + num + "." + (i + 1) + " " + data.title + "</a>");
				$twoA.appendTo($twoLi);
				$twoLi.appendTo($twoUl);
				if(data.list) {
					var $threeUl = $("<ul></ul>");
					$.each(data.list, function(j, item3) {
						var $threeLi = $("<li></li>");
						var $threeA = $("<a href = '#" + item3.id + "'>" + num + "." + (i + 1) + '.' + (j + 1) + " " + item3.title + "</a>");
						$threeA.appendTo($threeLi);
						$threeLi.appendTo($threeUl);
					});
					$threeUl.appendTo($twoLi);
				}
			});
			$twoUl.appendTo($oneli);
		}
		$oneli.appendTo($("#catalogue"));
	},
	//内容
	renderActicle: function(num, item) {
		var $acticle = $('<div id="' + item.id + '" class="wrap"></div>');
		var $title = $('<div class="title">' + PT_utils.Arabia_to_Chinese(num) + '、' + item.title + '</div>');
		$title.appendTo($acticle);
		var $text = null;
		if(item.text) {
			$text = $('<div class="article">' + item.text + '</div>');
			$text.appendTo($acticle);
		}
		$acticle.appendTo($('.article-wrapper'));
	}
}