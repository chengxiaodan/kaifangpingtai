PT_utils.namespace('PT.RgResult');

PT.RgResult = function() {
	this.init();
	this.bindEvent();
}
PT.RgResult.prototype = {
	init: function() {
		var self = this;
		self.geturl();
	},
	geturl: function(){
		var self = this;
		var flag = false;
		if(flag){
			self.active("success");
		}else{
			self.active("lose_effect");
		}
		
			//			$.ajax({
			//				url: '/service/signin',
			//				data: {
			//					username: username,
			//					password: password
			//				},
			//				type: 'POST',
			//				dataType: 'json',
			//				success: function(response) {
			//
			//					self.lock = false;
			//					if(response.httpStatusCode == 200) {
			//						window.location.href = response.data.url;
			//					} else {
			//						alert(response.data.message);
			//					}
			//				}
			//			});
	},
	//显示的页面
	active: function(str) {
		var self = this;
		var arr = ['success','lose_effect'];
		$.each(arr, function(i, value) {
			if(str == value) {
				$('#' + value).show();
				$.each(arr, function(j, other) {
					if(other !== value) {
						$('#' + other).hide();
					}
				});
			}
		});
	}
}