var PT_utils = (function() {
	var namespace = function() {
		var a, v, x, o, d, i, j, len1, len2;
		a = arguments;
		len1 = a.length;
		// 支持多参数,如两个参数（a.b.c, d.e）
		for(i = 0; i < len1; i++) {
			d = a[i].split('.'); // 分解成数组，如把a.b.c分解成[a,b,c]
			o = window[d[0]] = window[d[0]] || {}; // 保证a是对象,若果全局有就用全局的，如果没有就新建{}
			x = d.slice(1); //取出[b,c]
			len2 = x.length;

			// 支持嵌套，对b和c
			for(j = 0; j < len2; j++) {
				v = x[j]
				o = o[v] = o[v] || {}; // o逐层深入，保证每层都是对象，如果是b，o变为a.b，如果是c，o最后变成a.b.c
			}
		}
	};

	if(typeof Array.prototype.indexOf != "function") {
		Array.prototype.indexOf = function(searchElement, fromIndex) {
			var index = -1;
			fromIndex = fromIndex * 1 || 0;

			for(var k = 0, length = this.length; k < length; k++) {
				if(k >= fromIndex && this[k] === searchElement) {
					index = k;
					break;
				}
			}
			return index;
		};
	}
	/*判断输入是否为合法的手机号码*/
	var isphone = function(inputString) {
			var partten = /^1[0-9]{10}$/;
			var bchk = partten.test(inputString);
			return bchk;
		}
		//验证护照是否正确
	var isPassport = function(number) {
		var str = number;
		//在JavaScript中，正则表达式只能使用"/"开头和结束，不能使用双引号
		var Expression = /(P\d{7})|(G\d{8})/;
		var objExp = new RegExp(Expression);
		var bchk = objExp.test(str);
		return bchk;
	}
	var isCardNo = function(card) {
			// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
			var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
			var bchk = reg.test(card);
			return bchk;
		}
		//验证邮箱
	var fChkMail = function(mail) {
		var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,5}$/;
		var bchk = reg.test(mail);
		return bchk;
	}
	var fChkPassword = function(password) {
			var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
			var bchk = reg.test(password);
			return bchk;
		}
		//验证字符串不能大于8个汉字或不能大于16个字符
	var isAppname = function(appname) {
			var reg = /^(?!\d{16}$)(?:[a-z\d_]{4,16}|[\u4E00-\u9FA5]{8})$/;
			var bchk = reg.test(appname);
			return bchk;
		}
		//右边数每三位数加逗号
	var thousandBitSeparator = function(num) {
		return num && (num
			.toString().indexOf('.') != -1 ? num.toString().replace(/(\d)(?=(\d{3})+\.)/g, function($0, $1) {
				return $1 + ",";
			}) : num.toString().replace(/(\d)(?=(\d{3})+\b)/g, function($0, $1) {
				return $1 + ",";
			}));
	}

	var dateFormat = function(time) {
		var format_result = time.getFullYear() + "-";

		if(time.getMonth() + 1 < 10) {
			format_result += "0";
		}
		format_result += time.getMonth() + 1 + "-";
		if(time.getDate() < 10) {
			format_result += "0";
		}
		format_result += time.getDate() + " ";
		if(time.getHours() < 10) {
			format_result += "0";
		}
		format_result += time.getHours() + ":";
		if(time.getMinutes() < 10) {
			format_result += "0";
		}
		format_result += time.getMinutes();
		//		format_result += time.getMinutes() + ":";
		//		if(time.getSeconds() < 10) {
		//			format_result += "0";
		//		}
		//		format_result += time.getSeconds();
		return format_result;
	};
	var dateFormatStr = function(time) {
		var format_result = '';
		if(time.getHours() > 0) {
			format_result = time.getHours() + "小时";
		}
		if(time.getMinutes() > 0) {
			format_result += time.getMinutes() + "分钟";
		}
		if(time.getSeconds() > 0) {
			format_result += time.getSeconds() + "秒";
		}
		return format_result;
	};
	//邮箱
	var goEail = function(email, ln) {
			var Link = document.getElementById(ln);
			var MailLink = email.split("@")[1];
			MailLink = MailLink.toLowerCase();
			var hash = {
				'qq.com': 'http://mail.qq.com',
				'gmail.com': 'http://mail.google.com',
				'sina.com': 'http://mail.sina.com.cn',
				'163.com': 'http://mail.163.com',
				'126.com': 'http://mail.126.com',
				'yeah.net': 'http://www.yeah.net/',
				'sohu.com': 'http://mail.sohu.com/',
				'tom.com': 'http://mail.tom.com/',
				'sogou.com': 'http://mail.sogou.com/',
				'139.com': 'http://mail.10086.cn/',
				'hotmail.com': 'http://www.hotmail.com',
				'live.com': 'http://login.live.com/',
				'live.cn': 'http://login.live.cn/',
				'live.com.cn': 'http://login.live.com.cn',
				'189.com': 'http://webmail16.189.cn/webmail/',
				'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
				'yahoo.cn': 'http://mail.cn.yahoo.com/',
				'eyou.com': 'http://www.eyou.com/',
				'21cn.com': 'http://mail.21cn.com/',
				'188.com': 'http://www.188.com/',
				'foxmail.com': 'http://www.foxmail.com'
			};
			for(var j in hash) {
				if(hash[MailLink]) {
					Link.href = hash[MailLink];
				} else {
					Link.href = "http://mail." + hash[MailLink];
				}
			}
		}
		//错误提示框
	var showBox = function(domselector, content, flag) {
			domselector.poshytip('reset');
			domselector.poshytip({
				className: 'tip-yellowsimple',
				content: content,
				showOn: 'none',
				alignTo: 'target',
				alignX: 'right',
				alignY: 'center',
				offsetX: 5,
				offsetY: 5
			});
			if(flag) {
				domselector.poshytip('show');
				domselector.css('border-color', '#FF5722');
			} else {
				domselector.poshytip('hide');
				domselector.css('border-color', '#dbdbdb');
			}
			if(domselector.is('input')||domselector.is('textarea')) {
				domselector.focus(function(){
					domselector.poshytip('hide');
					domselector.css('border-color', '#dbdbdb');
				});	
			}
		}
		//进度条
	var progress = function(id, process) {
			var canvas = document.getElementById(id);
			if(process == 100) {
				$("#" + id).hide();
			} else {
				$("#" + id).show();
			}
			//x,y 坐标,radius 半径,process 百分比,backColor 中心颜色, proColor 进度颜色, fontColor 中心文字颜色
			var x = canvas.width / 2;
			var y = canvas.height / 2;
			var radius = 60;
			var process = process;
			var backColor = '#f3f3f3';
			var proColor = '#8C61DA';
			var fontColor = '#8C61DA';
			if(canvas.getContext) {
				var cts = canvas.getContext('2d');
			} else {
				return;
			}
			cts.beginPath();
			// 坐标移动到圆心  
			cts.moveTo(x, y);
			// 画圆,圆心是24,24,半径24,从角度0开始,画到2PI结束,最后一个参数是方向顺时针还是逆时针  
			cts.arc(x, y, radius, 0, Math.PI * 2, false);
			cts.closePath();
			// 填充颜色  
			cts.fillStyle = backColor;
			cts.fill();

			cts.beginPath();
			// 画扇形的时候这步很重要,画笔不在圆心画出来的不是扇形  
			cts.moveTo(x, y);
			cts.lineWidth = 10; //预填充环的宽度
			// 跟上面的圆唯一的区别在这里,不画满圆,画个扇形  
			cts.arc(x, y, radius, Math.PI * 1.5, Math.PI * 1.5 - Math.PI * 2 * process / 100, true);
			cts.closePath();
			cts.fillStyle = proColor;
			cts.fill();

			//填充背景白色
			cts.beginPath();
			cts.moveTo(x, y);
			cts.arc(x, y, radius - (radius * 0.26) + 10, 0, Math.PI * 2, true);
			cts.closePath();
			cts.fillStyle = '#ffffff';
			cts.fill();

			//在中间写字 
			cts.font = "bold 9pt Arial";
			cts.fillStyle = fontColor;
			cts.textAlign = 'center';
			cts.textBaseline = 'middle';
			cts.moveTo(x, y);
			cts.fillText(process + "%", x, y);
		}
		/*
		 * 等比缩放图片
		 * imgobj 图片对象, W_LIMIT 限制宽度, H_LIMIT 限制高度
		 */
	var changeImageSize = function(imgobj, W_LIMIT, H_LIMIT) {
			imgobj.load(function() {
				var img_h = $(this).height();
				var img_w = $(this).width();
				var width = img_w;
				var height = img_h;
				if(width > W_LIMIT) { //如果图片宽度超出容器宽度--要撑破了 
					width = W_LIMIT;
					height = (W_LIMIT * height) / width; //高度等比缩放 
				}
				if(height > H_LIMIT) {
					height = H_LIMIT;
					width = (H_LIMIT * width) / height; //高度等比缩放 
				}
				$(this).css({
					"width": width + 'px',
					"height": height + 'px'
				}); //设置缩放后的宽度和高度 
			});
		}
		// 根据参数名称获取value    
	var getUrlParameter = function(paramKey) {
		var sURLVariables, i, sParameterName, sPageURL = window.location.search.substring(1);
		if(sPageURL) {
			sURLVariables = sPageURL.split("&");
			for(i = 0; i < sURLVariables.length; i++) {
				sParameterName = sURLVariables[i].split("=");
				if(sParameterName[0] === paramKey) return sParameterName[1]
			}
		}
	}
	var Arabia_to_Chinese = function(num) {
			var tmpnewchar = "";
			switch(num) {
				case 0:
					tmpnewchar = "一" + tmpnewchar;
					break;
				case 1:
					tmpnewchar = "二" + tmpnewchar;
					break;
				case 2:
					tmpnewchar = "三" + tmpnewchar;
					break;
				case 3:
					tmpnewchar = "四" + tmpnewchar;
					break;
				case 4:
					tmpnewchar = "五" + tmpnewchar;
					break;
				case 5:
					tmpnewchar = "六" + tmpnewchar;
					break;
				case 6:
					tmpnewchar = "七" + tmpnewchar;
					break;
				case 7:
					tmpnewchar = "八" + tmpnewchar;
					break;
				case 8:
					tmpnewchar = "九" + tmpnewchar;
					break;
				case 9:
					tmpnewchar = "十" + tmpnewchar;
					break;
			}
			return tmpnewchar;
		}
		/**
		 * 过滤数组中重复的数据
		 */
	var myArray_Unique = function(someArray) {
		tempArray = someArray.slice(0); //复制数组到临时数组
		for(var i = 0; i < tempArray.length; i++) {
			for(var j = i + 1; j < tempArray.length;) {
				if(tempArray[j] == null) {
					tempArray.splice(j, 1);
				} else {
					if(tempArray[j] == tempArray[i])
					//后面的元素若和待比较的相同，则删除并计数；
					//删除后，后面的元素会自动提前，所以指针j不移动
					{
						tempArray.splice(j, 1);
					} else {
						j++;
					}
					//不同，则指针移动
				}
			}
		}
		return tempArray;
	}
	return {
		dateFormat: dateFormat,
		namespace: namespace,
		fChkMail: fChkMail,
		fChkPassword: fChkPassword,
		goEail: goEail,
		showBox: showBox,
		progress: progress,
		isCardNo: isCardNo,
		isPassport: isPassport,
		isphone: isphone,
		changeImageSize: changeImageSize,
		getUrlParameter: getUrlParameter,
		dateFormatStr: dateFormatStr,
		myArray_Unique: myArray_Unique,
		isAppname: isAppname,
		thousandBitSeparator: thousandBitSeparator,
		Arabia_to_Chinese: Arabia_to_Chinese
	};
})();

$(document).ready(function() {
	$.get("../common/header.html", function(data) {
		$("#header").html(data);
	});
	$.get("../common/footer.html", function(data) {
		$("#footer").html(data);
	});
});