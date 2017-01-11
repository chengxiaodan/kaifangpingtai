/**
 * Filename: Progress.js Company: 葡萄维度科技
 * comment : 进度条
 * @author: chengxiaodan
 * @version: 1.0
 */
if (!Progress)
	var Progress = {};

Progress = function(config){
	this.renderTo = config.renderTo;
	//上传文件的进度值
	this.defaultProgress = config.defaultProgress||0;
	this.uploadsize = config.uploadsize;
	this.filesize = config.filesize;
	this.id = config.id;
	this._init();
};
Progress.prototype = {
		_init : function(){
			var self = this;
			this.$loading = $('<div class="loading"></div>');
			this.$pro = $('<div class="pro processing" id="pro-'+self.id+'"></div>');
			this.$pro.appendTo(this.$loading);
			this.$size = $('<div class="appsize"><span id="uploadsize" class="uploadsize">'+self.uploadsize+'</span><span id="filesize" class="filesize">/'+self.filesize+'</span></div>');
			this.$loading.appendTo(this.renderTo);
			this.$size.appendTo(this.renderTo);
		},
		//跟新进度条
		_doProgress : function(percentum){
			var self=this;
			if (percentum <= 100) { 
				self._setProccess(percentum,self.id); 
				percentum++; 
			}
		},
		_setProccess :function(progress,id){
			var self = this;
			var stepSequence_size = {};
			if (progress) { 
				if($('#pro-'+id)!=null){
					stepSequence_size.width = String(progress) + "%";
					$('#pro-'+id).css("width", stepSequence_size.width); //控制div宽度 
					$('#pro-'+id).animate(stepSequence_size, 1000, "easeOutCubic");
				}
			}
		},
		_uploadsize: function(uploadsize){
				this.uploadsize = uploadsize;
				$('#uploadsize').text(uploadsize);
		},
		//文件上传中
		fileUploading : function(percent,uploadsize){
			this._doProgress(percent);
			this._uploadsize(uploadsize);
		},
		//文件长传成功后
		fileUploadSuccess : function(){
			this._doProgress(100);
			this._uploadsize(this.fileSize);
			$('#pro-'+this.id).removeClass('processing').addClass('processed');
			$('#uploadsize').removeClass('uploadsize').addClass('uploadedsize');
			$('#filesize').removeClass('filesize').addClass('uploadsize');
		},
		reset : function () {
			$('#uploadsize').text("");
			$('#filesize').text("");
			$('#pro-'+this.id).removeClass('processed').addClass('processing');
			$('#uploadsize').removeClass('uploadedsize').addClass('uploadsize');
			$('#filesize').removeClass('uploadsize').addClass('filesize');
			$('#pro-'+this.id).css("width", String(0) + "%"); //控制div宽度 
		}
};
