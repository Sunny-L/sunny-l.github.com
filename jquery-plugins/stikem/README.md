[DEMO](https://sunny-l.github.io/jquery-plugins/stikem/)

##元素悬浮插件
###Usage
1、载入插件

	<script type="text/javascript" src="js/jquery.min.js"></script>
	<script type="text/javascript" src="js/jquery.stickem.js"></script>
2、调用

    <div class="container" id="stickem-container">
		<div class="nav text-center stickem">我要置顶了</div>
		<div class="floor"></div>
		<div class="floor"></div>
		<div class="floor"></div>
	</div>


	$(function(){
		$("body").stickem();
	});
###Options
	$(function(){
		$("body").stickem({
			containerSelecter:'#stickem-container',     悬浮高度Conatiner选择器
			spend:200,				//延迟速度
			ev:function(){			//传入的执行事件
				alert(110);
			},
			eventExecute:2			//传入的执行事件次数
		});
	});