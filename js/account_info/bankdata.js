PT_utils.namespace('PT.Account');

PT.Account.bankUpdate = function(domSelector) {
	this.domSelector = domSelector;
	this.valid = true;
	this.init();
	this.bindEvent();
}
PT.Account.bankUpdate.prototype = {
	init: function() {
		var self = this;
		var ui = $(self.domSelector);
	},
	bindEvent: function() {
		var self = this;
		var ui = $(self.domSelector);
		var m = "";
		//下拉框选择
		var arr = ['bank', 'mpy', 'district'];
		$.each(arr, function(j, value) {
			var li = $('#' + value + '_ul li');
			for(var i = 0; i < li.length; i++) {
				(function(Index) {
					li[i].addEventListener('click', function(e) {
						$(this).siblings('li').removeClass('list_active');
						$(this).addClass("list_active");
						$(this).parent().siblings('label').text($(this).text());
						$(this).parent().siblings('input[type=checkbox]').attr('checked', false);
					}, false);
				})(i)
			}
			
			$("#"+value).change(function(){
				if($("#"+value).prop('checked')){
					$.each(arr, function(k, value2) {
						if(value !==value2){
							$("#"+value2).attr('checked', false);
						}
					});
				}
			});
		});
		//银行卡号输入
		$("#bank_card").keydown(function a(e) {
			var obj = e;
			if(obj.keyCode != 8) { //判断是否为Backspace键，若不是执行函数；
				var b = document.getElementById("bank_card").value; //定义变量input  value值；
				var maxValue = 23; //限制输入框的最大值；
				b = b.replace(/[^\d\s]/g, ""); //正则表达式：如果输入框中输入的不是数字或者空格，将不会显示；
				document.getElementById("bank_card").value = b; //把新得到得value值赋值给输入框；
				for(n = 1; n <= 4; n++) {
					if(b.length <= 5 * n - 2 || b.length > 5 * n - 1) { //判断是否是该加空格的时候，若不会，还是原来的值；
						b = b;
					} else {
						b = b + " "; //给value添加一个空格；
						document.getElementById("bank_card").value = b; //赋值给输入框新的value值；
					}
				}
			}
		});

		// 点击保存
		$('[name=bank_add]', ui).click(function() {
			if(self.validate()) {
				self.add();
			}
		});

		// 点击修改
		$('[name=bank_update]', ui).click(function() {
			$.get("../../../ptdev_platform/html/personal_account/bankUpdate.html", function(data) {
				$('#bankAccount').html(data);
			});
		});

		//取消
		$('[name=bank_cancle]', ui).click(function() {
			if(!self.isHaveinfo()) { //判断取消修改时进入详情还是添加
				$.get("../../../ptdev_platform/html/personal_account/bankAdd.html", function(data) {
					$('#bankAccount').html(data);
				});
			} else {
				$.get("../../../ptdev_platform/html/personal_account/bankinfo.html", function(data) {
					$('#bankAccount').html(data);
				});
			}
		});

		//修改之后提交
		$('[name=bank_submit]', ui).click(function() {
			if(self.validate()) {
				self.update();
			}
		});
	},
	//获取当前账户银行卡绑定状态
	isHaveinfo: function() {
		var flag = false;
		// true 已经绑定 false 未绑定
		//ajax请求后台（必须是同步请求设置async:false） 

		return flag;
	},
	validate: function() {
		var self = this;
		var ui = $(self.domSelector);
		var valid = true;

		var username = $('#apptype'); //账户名
		var bankname = $('#banktext'); //开户银行
		var province = $('#mpytext'); // 省／直辖市
		var municipality = $('#district_text'); // 市/地区
		var branchname = $('#branch_text'); //分行／支行
		var branchname = $('#branch_text'); //分行／支行
		var bankcard = $('#bank_card'); //银行卡号带空格
		(function() {
			var flag = true;
			if(null == $.trim(username.val()) || "" == $.trim(username.val())) {
				flag = false;
				PT_utils.showBox(username, "请输入账户名", true);
			} else {
				PT_utils.showBox(username, "", false);
			}
			valid = valid && flag;
		})();

		(function() {
			var flag = true;
			if($.trim(bankname.text()) == "请选择开户银行") {
				flag = false;
				alert("请选择开户银行");
			}
			valid = valid && flag;
		})();

		(function() {
			var flag = true;
			if($.trim(province.text()) == '请选择省/直辖市') {
				flag = false;
				alert("请选择省/直辖市");
			}
			valid = valid && flag;
		})();

		(function() {
			var flag = true;
			if($.trim(municipality.text()) == '请选择市/地区') {
				flag = false;
				alert("请选择市/地区");
			}
			valid = valid && flag;
		})();

		(function() {
			var flag = true;
			if(null == $.trim(branchname.val()) || "" == $.trim(branchname.val())) {
				flag = false;
				PT_utils.showBox(branchname, "请输入分行/支行", true);
			} else {
				PT_utils.showBox(branchname, "", false);
			}
			valid = valid && flag;
		})();

		(function() {
			var flag = true;
			if(null == $.trim(bankcard.val()) || "" == $.trim(bankcard.val())) {
				flag = false;
				PT_utils.showBox(bankcard, "请输入分行/支行", true);
			} else {
				PT_utils.showBox(bankcard, "", false);
			}
			valid = valid && flag;
		})();
		return valid;
	},
	formdata: function() {
		var data = {};
		var username = $.trim($('#apptype').val()); //账户名
		var bankname = $.trim($('#banktext').text()); //开户银行
		var province = $.trim($('#mpytext').text()); // 省／直辖市
		var municipality = $.trim($('#district_text').text()); // 市/地区
		var branchname = $.trim($('#branch_text').val()); //分行／支行
		var bankcard = $('#bank_card').val(); //银行卡号带空格
		//json  传参key值以后台接口参数名为准
		return data = {
			username: username, //账户名
			bankname: bankname, //开户银行
			province: province, // 省／直辖市
			municipality: municipality, // 市/地区
			branchname: branchname, //分行／支行
			bankcard: bankcard //银行卡号
		};
	},
	update: function() {
		var self = this;
		var data = self.formdata();
		//ajax提交
		//假设成功之后返回详情如下
		$.get("../../../ptdev_platform/html/personal_account/bankinfo.html", function(data) {
			$('#bankAccount').html(data);
		});
	},
	detail: function() {
		var self = this;
		var data = self.getValue();
		$('#apptype').text(data.username);
		$('#banktext').text(data.bankname);
		$('#branch_text').text(data.province + '-' + data.municipality + '-' + data.branchname);
		$('#bank_card').text(data.bankcard);
	},
	add: function() {
		var self = this;

		var data = self.formdata();
		//ajax提交
		//假设成功之后返回详情如下
		$.get("../../../ptdev_platform/html/personal_account/bankinfo.html", function(data) {
			$('#bankAccount').html(data);
		});
	},
	select: function(value, text) {
		var li = $('#' + value + '_ul li');
		for(var i = 0; i < li.length; i++) {
			(function(Index) {
				if($.trim($(li[Index]).text()) == text) {
					$(li[Index]).siblings('li').removeClass('list_active');
					$(li[Index]).addClass("list_active");
					$(li[Index]).parent().siblings('label').text($(li[Index]).text());
				}
			})(i)
		}
	},
	setValue: function() {
		var self = this;

		var data = self.getValue();
		$('#apptype').val(data.username);
		$('#banktext').val(data.bankname);
		self.select('bank', data.bankname); //将页面中该数据选中
		$('#mpytext').val(data.province);
		self.select('mpy', data.province); //将页面中该数据选中
		$('#district_text').val(data.municipality);
		self.select('district', data.municipality); //将页面中该数据选中
		$('#branch_text').val(data.branchname);
		$('#bank_card').val(data.bankcard);
	},
	//获取信息
	getValue: function() {

		//ajax
		/*$.ajax({
			url: '/conference/rank',
			data: formdata,
			type: 'POST',
			dataType:'json',
			processData: false,
			contentType: false,
			cache:false,
			async:false,
			success: function(data){
				if(data.httpStatusCode = 200) {
				}
			},
			error: function (data) {
				
			}
		});*/
		//假设请求之后返回的data 如下
		var data = {
			username: '程晓丹', //账户名
			bankname: '中国招商银行', //开户银行
			province: '上海市', // 省／直辖市
			municipality: '松江区', // 市/地区
			branchname: '松江区支行', //分行／支行
			bankcard: '1234 5678 9101 1121 131' //银行卡号
		};
		return data;
	}
}