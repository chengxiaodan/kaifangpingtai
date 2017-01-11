PT_utils.namespace('PT.index');
PT.index = function() {
	this.init();
}
PT.index.prototype = {
	init: function() {
		this.setBanner();
		this.setloginState();
		this.renderPartner();
	},
	setBanner: function(){
		//ajax
		var datas = ["../../img/1.jpg","../../img/2.jpg","../../img/3.jpg"];
		$(".icon1").css("background-image","url("+datas[0]+")");
		$(".icon2").css("background-image","url("+datas[1]+")");
		$(".icon3").css("background-image","url("+datas[2]+")");
		prevAndNext('#btn1', '#btn2'); //banner
	},
	setloginState: function() {
		//ajax
		var state = true; //true已登录
		if(!state) {
			$("#optionBtn").text("加入我们");
			$("#optionBtn").attr("href", "../login.html");
		} else {
			//点击跳转到管理中心（如果未进行开发者登记则是开发者登记页面
			$("#optionBtn").text("管理中心");
			var regiester = true; //true已登记
			if(regiester) {
				$("#optionBtn").attr("href", "../manage/appstore.html");
			} else {
				$("#optionBtn").attr("href", "html/developer/business_register.html");
			}
		}
	},
	//合作伙伴
	renderPartner: function() {
		//ajax
		var datalist = [{
			name: "",
			url: "../../img/index/qingting_logo.png"
		},{
			name: "",
			url: "../../img/index/kuke_logo.png"
		},{
			name: "",
			url: "../../img/index/txchilds_logo.png"
		},{
			name: "",
			url: "../../img/index/tinmanArts_logo.png"
		},{
			name: "",
			url: "../../img/index/colorfull.png"
		},{
			name: "",
			url: "../../img/index/wacom_logo.png"
		},{
			name: "",
			url: "../../img/index/wechat_logo.png"
		},{
			name: "",
			url: "../../img/index/penggui_logo.png"
		},{
			name: "",
			url: "../../img/index/dict_logo.png"
		},{
			name: "",
			url: "../../img/index/bitmap_logo.png"
		},{
			name: "",
			url: "../../img/index/yellephant_logo.png"
		},{
			name: "",
			url: "../../img/index/babybus_logo.png"
		},{
			name: "",
			url: "../../img/index/ickypen_logo.png"
		},{
			name: "",
			url: "../../img/index/tocaboca_logo.png"
		},{
			name: "",
			url: "../../img/index/web_logo.png"
		}];
		$.each(datalist, function(i,data) {
			var $li = $("<li></li>");
			var $img = $("<img alt='" + data.name + "' src='" + data.url + "'/>");
			$li.append($img);
			$("#cptPartner ul").append($li);
		});
		$('#cptPartner ul').height(Math.ceil(datalist.length/5)*118);
		$('#cptPartner ul').parent().height($('#cptPartner ul').height()+26);
		$('#cptPartner ul').parent().parent().height($('#cptPartner ul').height()+186);
	}
}