/*-----------------------------------------------------------------------------
 * @Description: 验证码 
 * @author: 	chengxiaodan
 * @date		2016.10.19
 * ---------------------------------------------------------------------------*/
function Checkcode(config) {
	this.inputId = config.inputId;
	this.domSelector = config.domSelector;
	this.flash = config.flash;
	this.code = "";
	this.domReady();
}
Checkcode.prototype.domReady = function(){
	var self = this;
	$(self.flash).click(function(){
		alert('');
		self.createCode();
	});
}
/* 显示验证码图片 */
Checkcode.prototype.showCheck = function(code) {
	var self = this;
	var c = document.getElementById(self.domSelector);
	var ctx = c.getContext("2d");
	ctx.clearRect(0, 0, 1000, 1000);
	ctx.font = "80px Arial";
	ctx.fillText(code, 0, 100);
}
Checkcode.prototype.createCode = function() {
	var self = this;
	var codeLength = 4; //验证码的长度
	var selectChar = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');

	for(var i = 0; i < codeLength; i++) {
		var charIndex = Math.floor(Math.random() * 60);
		self.code += selectChar[charIndex];
	}
	if(self.code.length != codeLength) {
		createCode();
	}
	self.showCheck(self.code);
}

Checkcode.prototype.validate = function() {
	var self = this;
	var inputCode = document.getElementById(self.inputId).value.toUpperCase();
	var codeToUp = self.code.toUpperCase();
	if(inputCode.length <= 0) {
		document.getElementById(self.inputId).setAttribute("placeholder", "请输入图形验证码");
		createCode();
		return false;
	} else if(inputCode != codeToUp) {
		document.getElementById(self.inputId).value = "";
		document.getElementById(self.inputId).setAttribute("placeholder", "验证码错误");
		createCode();
		return false;
	} else {
		alert("验证码正确");
		return true;
	}

}