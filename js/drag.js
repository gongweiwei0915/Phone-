(function(w){
	w.condrag = function (navs,callback){
			//滑动，快速滑屏，防抖动，橡皮筋，即点即停
//			var navs = document.getElementById('wrap');
			var navsList = navs.children[0];
			transformCss(navsList,'translateZ',0.01);
			
			var eleY = 0;
			var startY = 0;
			
			var beginTime = 0;
			var beginValue = 0;
			var endTime = 0;
			var endValue = 0;
//			var disTime = 1;
			var disTime = 0;
			var disValue = 0;
			
			//防抖动
			var startX = 0;
			var isFirst = true;
			var isY = true;
			
			var Tween = {
				//中间过渡
				Linear: function(t,b,c,d){ return c*t/d + b; },
				//回弹
				easeOut: function(t,b,c,d,s){
		            if (s == undefined) s = 1.70158;
		            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	       	 	}
			};
			
			navs.addEventListener('touchstart',function(event){
				var touch = event.changedTouches[0];
				
				//即点即停
				clearInterval(navs.setTimer);
				
				navsList.style.transition = 'none';
				
				startY = touch.clientY;
				startX = touch.clientX;
				
				eleY = transformCss(navsList,'translateY');
				
				beginTime = new Date().getTime();
				beginValue = eleY;
				
				disValue = 0;
				
				if(callback&&callback['start']){
					callback['start']();
				};
				
				isFirst = true;
				isY = true;
			
			});
			navs.addEventListener('touchmove',function(event){
				var touch = event.changedTouches[0];
				
				if(!isY){
					return;
				};
				
				
				var nowY = touch.clientY;
				var disY = nowY - startY;
				var nowX = touch.clientX;
				var disX = nowX - startX;
				
				
				if(isFirst){
					isFirst = false;
					
					if(Math.abs(disX) > Math.abs(disY)){
						isY = false;
					};
				};
				
				
				
				var translateY = eleY+disY;
				var minY = document.documentElement.clientHeight-navsList.offsetHeight;
				//限定范围
				if(translateY > 0){
					//   留白区域/屏幕宽度
					var scale = 1 - translateY/document.documentElement.clientHeight;
					translateY = translateY*scale;
				}else if(translateY < minY){
					var over = minY - translateY;
					var scale = 1 - over/document.documentElement.clientHeight;

					translateY = minY - over*scale;
				};
				
				
				transformCss(navsList,'translateY',translateY);
				
				endTime = new Date().getTime();
				endValue = translateY;
				
//				disTime = endTime - beginTime;
				disValue = endValue - beginValue;
				
				if(callback&&callback['move']){
					callback['move']();
				};
				
			});
			navs.addEventListener('touchend',function(event){
				var touch = event.changedTouches[0];
				var speed = disValue/(endTime - beginTime);
			
				//快速滑屏
				var target = transformCss(navsList,'translateY') + speed*100;
				var minY = document.documentElement.clientHeight-navsList.offsetHeight;
				
//				console.log(target)
				
				//回弹
				var type = 'Linear';
				if(target > 0){
					target = 0;
					type = 'easeOut';
				}else if(target < minY){
					target = minY;
					type = 'easeOut';
				};
				
				var time = '2';
				move(target,time,type);
								
			});
			
			function move(target,time,type){
				var t = 0;
				var b = transformCss(navsList,'translateY');
				var c = target - b;
				var d = time/0.02;
				
				clearInterval(navs.setTimer);
				navs.setTimer = setInterval(function(){
					t++;
					
					if(t > d){
						clearInterval(navs.setTimer);
						
						if(callback&&callback['end']){
							callback['end']();
						};
						
					}else{
						//正常
						var ponit = Tween[type](t,b,c,d);					
						transformCss(navsList,'translateY',ponit);
//						console.log(ponit)
						if(callback&&callback['move']){
							callback['move']();
						};
					};				
										
				},20);							
				
			}
		};
		
		
	
	
	
})(window);
