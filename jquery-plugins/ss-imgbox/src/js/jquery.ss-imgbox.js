;(function($){
	$.fn.extend({
		ssImgBox:function(options){
			var options = $.extend({
				t_width:40, //缩略图宽高
				//o_width:300px,  	//原始图宽度
				//o_height:400px,  	//原始图高度
				o_width_max:690,	//原始图最大宽度
				imageArray: new Array,
				isOpen:false,
				activeImage: null,
				open_speed:300,
				leftDeg:270
			},options);

			var self = this;

			function init(){
				var imgBox = '<div style="clear:both;"></div><div class="ss-display"><div class="ss-options"><span class="ss-close">收起</span><a target="_blank" class="ss-o-img">原图</a><span class="ss-sinistrogyration">向左转</span><span class="ss-dextrorotation">向右转</span></span></div><div class="ss-prev"><i></i></div><div class="ss-next"><i></i></div><img/></div>';
				self.append(imgBox);
				showImg();
			}

			function showImg(){
				var thumbnail = self.find(".ss-thumbnail"); //缩略图
				var display = self.find('.ss-display');		//大图
				var img = new Image();
				thumbnail.each(function(){
					options.imageArray.push($(this).find('img').attr('src'));
				});
				self.find('.ss-close').click(function(){
					display.hide(options.open_speed);
					self.find('.ss-thumbnail').removeClass('ss-thumbnail-current');
					options.isOpen = false;
				});

				thumbnail.click(function(){
					options.i = -1;
					var oSrc =  $(this).find('img').attr('src');
					loadImg(display,oSrc,this);
				});
				loadNeighborImages(display,thumbnail);
			}

			function loadImg(display,oSrc,thumbnail){
				var imgPre = new Image();
				self.find('.ss-thumbnail').removeClass('ss-thumbnail-current');
				$(thumbnail).addClass('ss-thumbnail-current');
				imgPre.onload = function(){
					var newWidth = imgPre.width;
					var newHeight = imgPre.height;
					var displayImg = display.find('img');
					displayImg.attr('src',oSrc);
					displayImg.css({'margin-top':0,'margin-left':0});
					displayImg.removeClass();
					display.css({width:newWidth+'px',height:newHeight+38+'px'});

					if(!options.isOpen){
						options.isOpen = true;
						display.show(options.open_speed);
					}else if(options.isOpen && oSrc==options.activeImage){
						$(thumbnail).removeClass('ss-thumbnail-current');
						display.hide(options.open_speed);
						options.isOpen = false;
					}
					options.activeImage = oSrc;
					if(options.activeImage==options.imageArray[0]){
						display.find('.ss-prev').css('display','none');
					}else{
						display.find('.ss-prev').css('display','block');
					}
					if(options.activeImage==options.imageArray[options.imageArray.length-1]){
						display.find('.ss-next').css('display','none');
					}else{
						display.find('.ss-next').css('display','block');
					}
					leftRotate();
				}
				imgPre.src = oSrc;
				display.find('a').attr('href',oSrc);
			}

			function loadNeighborImages(display,thumbnail){
				var prevImg,nextImg;
				self.find('.ss-prev').click(function(){
					//var activeImgIndex = options.imageArray.indexOf(options.activeImage);
					var activeImgIndex = $.inArray(options.activeImage,options.imageArray);
					var oSrc = options.imageArray[activeImgIndex-1];
					loadImg(display,oSrc,$(thumbnail[activeImgIndex-1]));
				});
				self.find('.ss-next').click(function(){
					//var activeImgIndex = options.imageArray.indexOf(options.activeImage);
					var activeImgIndex = $.inArray(options.activeImage,options.imageArray);
					var oSrc = options.imageArray[activeImgIndex+1];
					loadImg(display,oSrc,$(thumbnail[activeImgIndex+1]));
				});
			}

			function leftRotate(){
				self.find('.ss-display .ss-sinistrogyration').unbind('click').click(function(){
					if(options.i==-1){
						options.i=3;
					}
					if(options.right==1){
						options.i = options.i-2;
						options.right = 0;
					}
					var display = self.find('.ss-display');
					var displayImg = self.find('.ss-display img');
					displayImg.removeClass();
					displayImg.addClass('ss-rotating-'+options.i);
					if(options.i==2){
						displayImg.css({'margin-top':0,'margin-left':0});
						display.css({width:displayImg.width()+'px',height:displayImg.height()+38+'px'});
					}else {
						displayImg.css({'margin-top':(displayImg.width()-displayImg.height())/2,'margin-left':-(displayImg.width()-displayImg.height())/2});
						display.css({width:displayImg.height()+'px',height:displayImg.width()+38+'px'});
					}
					if(options.i==2&&options.right==1){
						console.log('adfdfs');
						options.i = -1;
						displayImg.removeClass();
						displayImg.css({'margin-top':0,'margin-left':0});	
						display.css({width:displayImg.width()+'px',height:displayImg.height()+38+'px'});
						options.right = 0;
					}else {
						options.i--;
					}
					if(options.i==-1){
						displayImg.removeClass();
						displayImg.css({'margin-top':0,'margin-left':0});	
						display.css({width:displayImg.width()+'px',height:displayImg.height()+38+'px'});
						//options.i=3;
						options.left = 0; 
					}else {
						options.left = 1;
					}
					console.log(options.i);
				});
				self.find('.ss-display .ss-dextrorotation').unbind('click').click(function(){
					var display = self.find('.ss-display');
					var displayImg = self.find('.ss-display img');
					if(options.i==-1){
						options.i = 1;
					}
					if(options.left==1){
						options.i = options.i+2;
						options.left = 0;
					}
					displayImg.removeClass();
					displayImg.addClass('ss-rotating-'+options.i);
					if(options.i==2){
						displayImg.css({'margin-top':0,'margin-left':0});
						display.css({width:displayImg.width()+'px',height:displayImg.height()+38+'px'});
					}else {
						displayImg.css({'margin-top':(displayImg.width()-displayImg.height())/2,'margin-left':-(displayImg.width()-displayImg.height())/2});
						display.css({width:displayImg.height()+'px',height:displayImg.width()+38+'px'});
					}
					if(options.i==2&&options.left==1){
						console.log('adfdfs');
						options.i = -1;
						displayImg.removeClass();
						displayImg.css({'margin-top':0,'margin-left':0});	
						display.css({width:displayImg.width()+'px',height:displayImg.height()+38+'px'});
						options.left = 0;
					}else {
						options.i++;
					}
					if(options.i==5){
						displayImg.removeClass();
						displayImg.css({'margin-top':0,'margin-left':0});	
						display.css({width:displayImg.width()+'px',height:displayImg.height()+38+'px'});
						options.i = -1;
						options.right = 0;
					}else {
						options.right = 1;
					}
					console.log(options.i);
				});
			}

			init();
			return this;
		}
	});
})(jQuery);