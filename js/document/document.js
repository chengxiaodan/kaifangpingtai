PT_utils.namespace('PT.Document');

PT.Document = function(domSelector) {
	this.domSelector = domSelector;
	this.init();
	this.bindEvent();
}

PT.Document.prototype = {
	init: function(){
		var self = this;
		self.getAppStore();
		self.getDevService();
	},
	bindEvent: function(){
		var self = this;
		var ui = $(self.domSelector);
		var $search = $("#search");
		$search.keydown(function(e) {
			if(e.keyCode == 13) { //enter键
				if($.trim(this.value) !== "") {
					window.location.href = "search.html?keyword=" + $.trim(this.value);
					new PT.Document.search();
				}
			}
		});
	},
	//获取应用商店下的模块集合
	getAppStore: function(){
		var self = this;
		//ajax
		
		var datalist = [{
			id: "1",
			name: "账号注册"
		},{
			id: "2",
			name: "应用管理"
		},{
			id: "3",
			name: "应用推广"
		},{
			id: "4",
			name: "账号注册"
		},{
			id: "5",
			name: "应用管理"
		},{
			id: "6",
			name: "应用推广"
		}];
		$.each(datalist, function(i,item) {
			self.renderli(item,$("#appStore"));
		});
		$("#appStore").height($("#appStore").height()+24);
	},
	//获取开发者服务下的模块集合
	getDevService: function(){
		var self = this;
		//ajax
		
		var datalist = [{
			id: "1",
			name: "葡萄账号"
		},{
			id: "2",
			name: "葡萄钱包"
		},{
			id: "3",
			name: "机器人"
		},{
			id: "5",
			name: "应用管理"
		},{
			id: "6",
			name: "应用推广"
		}];
		$.each(datalist, function(i,item) {
			self.renderli(item,$("#devService"));
		});
		$("#devService").height($("#devService").height()+24);
		
	},
	renderli: function(data,dom){
		var $li = $("<li></li>");
		var $a = $("<a href='docApi.html?id="+data.id+"'>"+data.name+"</a>");
		$a.appendTo($li);
		$li.appendTo(dom);
		dom.height(dom.height()+54);
	}
}
