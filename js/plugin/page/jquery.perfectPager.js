//分页插件
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
				//中间页码
				if(args.current != 1 && args.current >= 4 && args.pageCount != 4 && !args.easyMode){
					obj.append('<a href="javascript:void(0);" class="chNumber">'+1+'</a>');
				}
				if(args.current-2> 2 && args.current <= args.pageCount && args.pageCount > 4 && !args.easyMode){
					obj.append('<span>...</span>');
				}
				var start = args.current -2,end = args.current+2;
				if((start > 1 && args.current < 4)||args.current == 1){
					if(args.easyMode){
						end+=2;
					}else{
						end++;
					}
				}
				//add
				if(args.current == 2 && args.easyMode){
					end++;
				}
				if(args.current > args.pageCount-4 && args.current >= args.pageCount){
					if(args.easyMode){
						start-=2;
					}else{
						start--;
					}
				}
				//add
				if(args.current == args.pageCount-1 && args.easyMode){
					start--;
				}
				for (;start <= end; start++) {
					if(start <= args.pageCount && start >= 1){
						if(start != args.current){
							obj.append('<a href="javascript:void(0);" class="chNumber">'+ start +'</a>');
						}else{
							obj.append('<span class="current">'+ start +'</span>');
						}
					}
				}
				if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 4 && !args.easyMode){
					obj.append('<span>...</span>');
				}
				if(args.current != args.pageCount && args.current < args.pageCount -2  && args.pageCount != 4 && !args.easyMode){
					obj.append('<a href="javascript:void(0);" class="chNumber">'+args.pageCount+'</a>');
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
				obj.off("click","a.chNumber");
				obj.off("click","a.prevPage");
				obj.off("click","a.nextPage");
				obj.on("click","a.chNumber",function(e){
					var current = parseInt($(this).text());
					ms.fillHtml(obj,{"current":current,"pageCount":args.pageCount,"easyMode":args.easyMode});
					if(typeof(args.callback)=="function"){
						args.callback(current);
					}
					e.preventDefault();
				});
				//上一页
				obj.on("click","a.prevPage",function(e){
					var current = parseInt(obj.children("span.current").text());
					ms.fillHtml(obj,{"current":current-1,"pageCount":args.pageCount,"easyMode":args.easyMode});
					if(typeof(args.callback)=="function"){
						args.callback(current-1);
					}
					e.preventDefault();
				});
				//下一页
				obj.on("click","a.nextPage",function(e){
					var current = parseInt(obj.children("span.current").text());
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
			pageCount : 5,
			current : 1,
			easyMode : true,
			callback : function(){}
		},options);
		ms.init(this,args);
		return this;
	}
})(jQuery);