PT_utils.namespace('PT.Creatapp');

PT.Creatapp.appinfo = function(config) {
	this.domSelector = config.domSelector;
	this.init();
}
PT.Creatapp.appinfo.prototype = {
	init: function() {
		var appinfo = this.getinfo();
		this.setinfo(appinfo);
	},
	getinfo: function() {

		//ajax		
		var appinfo = {
			packgename: "20160710BETA0.apk",
			version: "12.5.1",
			size: "30.0MB",
			md5: "83847dbbf61a59c1d4b443741c2e3ab9",
			uploadTime: PT_utils.dateFormat(new Date()),
			appid: "203050406",
			appkey: "6f73c7471512dc61fcc82956530ef8ee",
			appType: "游戏",
			appName: "水果忍者(CC破解版)",
			agePart: '0~20',
			free: 10,
			languges: ["简体中文", "繁体中文", "英语"],
			classify: ["益智游戏", "艺术创意"],
			appintro: "从Fruitasia的惊人的世界联袂行动的新特点。！当你从一个新手水果彪形大汉增长到全力以赴的切片机和胜郎马里将引导您在游戏过程中切片水果，不需要去用太多的精力与技巧就能轻松通关，并且有丰富的奖励机制，快来一起挑战吧。",
			vsintro: "从Fruitasia的惊人的世界联袂行动的新特点。！当你从一个新手水果彪形大汉增长到全力以赴的切片机和胜郎马里将引导您在游戏过程中切片水果，不需要去用太多的精力与技巧就能轻松通关，并且有丰富的奖励机制，快来一起挑战吧。",
			keywords: ["亲子互动", "艺术创造", "家庭游戏", "在线教育", "医疗资讯", "心理健康", "艺术创造", "家庭游戏"],
			applogo: "http://test.fe.ptdev.cn/ptdev_platform/img/developer/deletephoto.png",
			appcuts: ["http://test.fe.ptdev.cn/ptdev_platform/img/developer/deletephoto3.png", 
			"http://test.fe.ptdev.cn/ptdev_platform/img/developer/deletephoto3.png",
			"http://test.fe.ptdev.cn/ptdev_platform/img/developer/deletephoto3.png", 
			"http://test.fe.ptdev.cn/ptdev_platform/img/developer/deletephoto3.png", 
			"http://test.fe.ptdev.cn/ptdev_platform/img/developer/deletephoto3.png"],
			copyright: "http://test.fe.ptdev.cn/ptdev_platform/img/developer/deletephoto.png",
			appVideo: "http://test.fe.ptdev.cn/ptdev_platform/html/create_app/myvideo.mp4",
			videoPoster: "http://test.fe.ptdev.cn/ptdev_platform/img/developer/deletephoto.png",
			state: "待提交" //待提交，审核中，不激活编辑按钮
		};
		return appinfo;
	},
	setinfo: function(appinfo) {
		var self = this;
		var ui = $(self.domSelector);
		$("[name=packgename]", ui).text(appinfo.packgename);
		$("[name=version]", ui).text(appinfo.version);
		$("[name=size]", ui).text(appinfo.size);
		$("[name=md5]", ui).text(appinfo.md5);
		$("[name=uploadTime]", ui).text(appinfo.uploadTime);
		$("[name=apptype]", ui).text(appinfo.appType);
		$("[name=appid]", ui).text(appinfo.appid);
		$("[name=appkey]", ui).text(appinfo.appkey);
		$("[name=appname]", ui).text(appinfo.appName);
		$("[name=agePart]", ui).text(appinfo.agePart);
		if(appinfo.free == 0) {
			$("[name=free]", ui).text("免费");
		} else if(appinfo.free > 0) {
			$("[name=free]", ui).text(appinfo.free);
		}
		var classify = "";
		$.each(appinfo.classify, function(i, value) {
			if(i !== appinfo.classify.length - 1) {
				classify += value + " ";
			} else {
				classify += value;
			}
		});
		$("[name=classify]", ui).text(classify);
		var languge = "";
		$.each(appinfo.languges, function(i, value) {
			if(i !== appinfo.languges.length - 1) {
				languge += value + " ";
			} else {
				languge += value;
			}
		});
		$("[name=languge]", ui).text(languge);
		$("[name=appintro]", ui).text(appinfo.appintro);

		var keywords = "";
		$.each(appinfo.keywords, function(i, value) {
			if(i !== appinfo.keywords.length - 1) {
				keywords += value + " ";
			} else {
				keywords += value;
			}
		});
		$("[name=keywords]", ui).text(keywords);
		$("[name=vsintro]", ui).text(appinfo.vsintro);
		$("[name=applogo]", ui).attr("src", appinfo.applogo);
		$.each(appinfo.appcuts, function(i, value) {
			$("[name=appcut" + (i + 1) + "]", ui).attr("src", value);
		});
		$("[name=appVideo]", ui).find("a").attr("href", appinfo.appVideo);
		$("[name=appVideo]", ui).find("source").attr("src", appinfo.appVideo);
		$("[name=appVideo]", ui).find("video").attr("poster", appinfo.videoPoster);
		$("[name=copyRight]", ui).attr("src", appinfo.copyright);

		if(appinfo.state == "审核中") {
			$("[name=editbtn]", ui).text("审核中").addClass("bbtn-disabled");
		} else {
			$("[name=editbtn]", ui).text("编辑").removeClass("bbtn-disabled");
			$("[name=editbtn]", ui).click(function(){
				window.location.href ="edit.html";
			});
		}
	}
}