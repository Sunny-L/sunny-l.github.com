/*
 *	Created by Sunny.L on 2015/5/27
 *	GitHub:https://github.com/Sunny-L/stikem
*/

;(function($){
	$.fn.extend({
		stickem:function(options){
			var options = $.extend({
				containerSelecter:'#stickem-container',
				spend:0,
				ev:null,							//传入的执行函数
				eventExecute:1,								//传入的执行次数
				outContainerEv:null				//元素恢复时执行事件
			},options);
			var evCounts = 0;
			var self = this;
			var tabsTop = $(options.containerSelecter+'').offset().top;//获取nav-tabs距离顶部的位置
			var clearScroll = 0;

			$(window).on('scroll',function(){
				if(!options.speend){
					scrollFn();
				}else{
					clearTimeout(clearScroll);
					clearScroll = setTimeout(scrollFn,options.spend);
				}

			});
			var scrollFn = function(){
				var documentTop = $(document).scrollTop();//获取滚动条距离顶部距离
				if(tabsTop<=documentTop){
					$('.stickem').addClass('stickit');
					if(options.ev){
						if(evCounts<options.eventExecute){
							options.ev();
							evCounts++;
						}
					}

				}else {
					$('.stickem').removeClass('stickit');
					if(options.outContainerEv){
						options.outContainerEv();
					}
				}
			}
		}
	});
})(jQuery);
