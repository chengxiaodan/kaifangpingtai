PT_utils.namespace('PT.Document');

PT.Document.search = function(domSelector) {
	this.domSelector = domSelector;
	this.count = 0; // 总数
	this.pageCount = 0; // 后台总页数
	this.current = 1; // 当前页
	this.start = 0; // 起始页
	this.limit = 8; // 每页信息条数
	this.init();
	this.bindEvent();
}

PT.Document.search.prototype = {
	init: function() {
		var self = this;
		self.getSearch(self.current, self.limit, self.start);
		var keyword = $("#search").val();
		//  $("#doc-wrapper")[0].innerHTML = $("#doc-wrapper")[0].innerHTML.replace(/keyword/g, '<font color="#5CB85C">'+keyword+'</font>')
//		self.setHeightKeyWord("doc-main", keyword, "#5CB85C");
	},
	bindEvent: function() {
		var self = this;
		var $search = $("#search");
		$search.keydown(function(e) {
			if(e.keyCode == 13) { //enter键
				if($.trim(this.value) !== "") {
					window.location.href = "html/document/search.html?keyword=" + $.trim(this.value);
				}
			}
		});
	},
	setHeightKeyWord: function(id, keyword, color) {
//		var search = '(.*)('+keyword+')(.*)';
//		var s = new RegExp('<(a|p|div)\\s+(.*)>' + search + '<\/(a|p|div)>', 'ig');
//		document.documentElement.innerHTML = document.documentElement.innerHTML.replace(s, '<$1 $2><span style="color:red;">$3</span></$1>');
		
		var key = keyword.split(' ');
		for(var i = 0; i < key.length; i++) {
			var search = '([^<>]*?)('+key[i]+')([^<>]*?)';
			var s = new RegExp('<(a|p|div)\\s+(.*)>' + search + '<\/(a|p|div)>', 'ig');
			document.getElementById(id).innerHTML = document.getElementById(id).innerHTML.replace(s, '<$1 $2>$3<span style="color:#5CB85C;">$4</span>$5</$1>');
		}
	},
	getSearch: function(currentNum, limit, start) {
		var self = this;
		var keyword = PT_utils.getUrlParameter("keyword");
		keyword = "CPD 推广";
		$("#search").val(keyword);
		//ajax text搜索内容CPD 推广
		var datalist = [{
			url: "#",
			title: "CPD账户服务介绍",
			text: "推广简介 葡萄软件商店是国内强有力的安卓分发平台。日分发量超过4000万。 葡萄应用推广希望能够建立一套公平、健康的推广机制，帮助开发者及时、准确的将应用推送给目标用户，帮助用户发现更匹配更优质的应用，提升开发者应用的用户量以及品牌知名度。二、CPD竞价总体流程 签订协议--->充值--->新建推广计划--->查看数据..."
		}, {
			url: "#",
			title: "CPD账户服务介绍",
			text: "推广简介 葡萄软件商店是国内强有力的安卓分发平台。日分发量超过4000万。 葡萄应用推广希望能够建立一套公平、健康的推广机制，帮助开发者及时、准确的将应用推送给目标用户，帮助用户发现更匹配更优质的应用，提升开发者应用的用户量以及品牌知名度。二、CPD竞价总体流程 签订协议--->充值--->新建推广计划--->查看数据..."
		}, {
			url: "#",
			title: "CPD账户服务介绍",
			text: "推广简介 葡萄软件商店是国内强有力的安卓分发平台。日分发量超过4000万。 葡萄应用推广希望能够建立一套公平、健康的推广机制，帮助开发者及时、准确的将应用推送给目标用户，帮助用户发现更匹配更优质的应用，提升开发者应用的用户量以及品牌知名度。二、CPD竞价总体流程 签订协议--->充值--->新建推广计划--->查看数据..."
		}, {
			url: "#",
			title: "CPD账户服务介绍",
			text: "推广简介 葡萄软件商店是国内强有力的安卓分发平台。日分发量超过4000万。 葡萄应用推广希望能够建立一套公平、健康的推广机制，帮助开发者及时、准确的将应用推送给目标用户，帮助用户发现更匹配更优质的应用，提升开发者应用的用户量以及品牌知名度。二、CPD竞价总体流程 签订协议--->充值--->新建推广计划--->查看数据..."
		}, {
			url: "#",
			title: "CPD账户服务介绍",
			text: "推广简介 葡萄软件商店是国内强有力的安卓分发平台。日分发量超过4000万。 葡萄应用推广希望能够建立一套公平、健康的推广机制，帮助开发者及时、准确的将应用推送给目标用户，帮助用户发现更匹配更优质的应用，提升开发者应用的用户量以及品牌知名度。二、CPD竞价总体流程 签订协议--->充值--->新建推广计划--->查看数据..."
		}, {
			url: "#",
			title: "CPD账户服务介绍",
			text: "推广简介 葡萄软件商店是国内强有力的安卓分发平台。日分发量超过4000万。 葡萄应用推广希望能够建立一套公平、健康的推广机制，帮助开发者及时、准确的将应用推送给目标用户，帮助用户发现更匹配更优质的应用，提升开发者应用的用户量以及品牌知名度。二、CPD竞价总体流程 签订协议--->充值--->新建推广计划--->查看数据..."
		}, {
			url: "#",
			title: "CPD账户服务介绍",
			text: "推广简介 葡萄软件商店是国内强有力的安卓分发平台。日分发量超过4000万。 葡萄应用推广希望能够建立一套公平、健康的推广机制，帮助开发者及时、准确的将应用推送给目标用户，帮助用户发现更匹配更优质的应用，提升开发者应用的用户量以及品牌知名度。二、CPD竞价总体流程 签订协议--->充值--->新建推广计划--->查看数据..."
		}, {
			url: "#",
			title: "CPD账户服务介绍",
			text: "推广简介 葡萄软件商店是国内强有力的安卓分发平台。日分发量超过4000万。 葡萄应用推广希望能够建立一套公平、健康的推广机制，帮助开发者及时、准确的将应用推送给目标用户，帮助用户发现更匹配更优质的应用，提升开发者应用的用户量以及品牌知名度。二、CPD竞价总体流程 签订协议--->充值--->新建推广计划--->查看数据..."
		}];
		if(datalist.length > 0) {
			$("#keyword").text("关键词“ " + keyword + " ”的搜索结果");
			$.each(datalist, function(i, item) {
				self.render(item);
			});
			$('#search-page').perfectPager({
				pageCount: Math.ceil(datalist.length / self.limit),
				current: (currentNum == -1) ? self.pageCount : currentNum,
				easyMode: true,
				callback: function(currentNum) {
					//此处是激活当前页
					//currentNum 当前页码
					var start = (currentNum - 1) * self.limit; //从后台获取第多少条开始获取数据 比如 0 10 20
					$('.doc-main').empty(); //清空之前渲染数据
					self.getSearch(currentNum, self.limit, start);
				}
			}).appendTo($('#search-page'));
		} else {
			$("#keyword").text("无搜索结果");
			$('#search-page').hide();
		}

	},
	render: function(data) {
		var $article = $('<article></article>');
		var $a = $('<a href="' + data.url + '"></a>');
		var $title = $('<p class="title">' + data.title + '</p>');
		var $content = $('<p class="article">' + data.text + '</p>');

		$title.appendTo($a);
		$a.appendTo($article);
		$content.appendTo($article);
		$article.appendTo($(".doc-main"));
	}
}