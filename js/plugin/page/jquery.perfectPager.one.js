//分页插件  无中间页码
(function($){
	var ms = {
		init:function(obj,args){
			return (function(){
				ms.fillHtml(obj,args);
				ms.bindEvent(obj,args);
			})();
		},
		//填充html
		fillHtml:function(obj,args){
			return (function(){
				obj.empty();
				obj.addClass('perfectPager');
				
				//上一页
				if(args.current > 1){
					obj.append('<a href="javascript:void(0);" class="prevPage">上一页</a>');
				}else{
					obj.remove('.prevPage');
					obj.append('<span class="disabled">上一页</span>');
				}
				//下一页
				if(args.current < args.pageCount){
					obj.append('<a href="javascript:void(0);" class="nextPage">下一页</a>');
				}else{
					obj.remove('.nextPage');
					obj.append('<span class="disabled">下一页</span>');
				}
			})();
		},
		//绑定事件
		bindEvent:function(obj,args){
			return (function(){
				obj.off("click","a.prevPage");
				obj.off("click","a.nextPage");
				//上一页
				obj.on("click","a.prevPage",function(e){
					var current = args.current;
					ms.fillHtml(obj,{"current":current-1,"pageCount":args.pageCount,"easyMode":args.easyMode});
					if(typeof(args.callback)=="function"){
						args.callback(current-1);
					}
					e.preventDefault();
				});
				//下一页
				obj.on("click","a.nextPage",function(e){
					var current = args.current;
					ms.fillHtml(obj,{"current":current+1,"pageCount":args.pageCount,"easyMode":args.easyMode});
					if(typeof(args.callback)=="function"){
						args.callback(current+1);
					}
					e.preventDefault();
				});
			})();
		}
	}
	$.fn.perfectPager = function(options){
		var args = $.extend({
			pageCount : 0,
			current : 1,
			easyMode : true,
			callback : function(){}
		},options);
		ms.init(this,args);
		return this;
	}
})(jQuery);