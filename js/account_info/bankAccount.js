PT_utils.namespace('PT.Account');

PT.Account.bankAccount = function() {
	this.init();
}
PT.Account.bankAccount.prototype = {
	init: function() {
		var self = this;
		var ui = $(self.domSelector);
		if(!self.isHaveinfo()) { //判断一开始先进入详情还是添加
			$.get("../../../ptdev_platform/html/personal_account/bankAdd.html",function(data){
				$('#bankAccount').html(data);
			});
		} else {
			$.get("../../../ptdev_platform/html/personal_account/bankinfo.html", function(data) {
				$('#bankAccount').html(data);
			});
		}
	},
	//获取当前账户银行卡绑定状态
	isHaveinfo: function() {
		var flag = false;
		// true 已经绑定 false 未绑定
		//ajax请求后台（必须是同步请求设置async:false） 

		return flag;
	}

}