/*
 * 开发者信息
 * chengxiaodan
 */
PT_utils.namespace('PT.Account');

PT.Account.datacount = function() {
	this.init();
}
PT.Account.datacount.prototype = {
	init: function() {
		var self = this;
		self.render();//渲染开发者信息页面
	},
	//判断是已登记，未登记, 如果已登记根据用户是企业或者个人进入相应的页面
	render: function(){
		var self = this;
		//ajax 获取登记状态、账户类型
		
		var data = {
			state: 1,// 0 未登记/1 已登记
			userType: 'business'//0 business 或者 1 owner
		}
		if(data.state == 0) {
			$.get("../../../ptdev_platform/html/personal_account/unwrite.html?userType="+data.userType,function(data){
				$('#render').html(data);
			});
		}else if(data.userType == "business"){
			$.get("../../../ptdev_platform/html/personal_account/businessinfo.html",function(data){
				$('#render').html(data);
			});
		}else if(data.userType == 'owner'){
			$.get("../../../ptdev_platform/html/personal_account/ownerinfo.html",function(data){
				$('#render').html(data);
			});
		}
	}

}