(function(w){
	
	w.transformCss = function (node,name,value){
			if(!node.transform){
				node.transform = {};
			};
			
			
			if(arguments.length > 2){
				//写
				//把名值对添加到对象里面
				node.transform[name] = value;
				
				var result = '';
				//遍历对象中的属性名
				for (var item in node.transform) {
					
					switch (item){
						case 'rotate':
						
						case 'skew':
						case 'skewX':
						case 'skewY':
						case 'skewZ':
							result += item+ '('+ node.transform[item] +'deg) ';
							break;
						case 'scale':
						case 'scaleX':
						case 'scaleY':
						case 'scaleZ':
							result += item+ '('+ node.transform[item] +') ';
							break;
						case 'translate':
						case 'translateX':
						case 'translateY':
						case 'translateZ':
							result += item+ '('+ node.transform[item] +'px) ';
							break;	
					};
										
				};
				
				node.style.transform = result;
				
			}else {
				//读
				if(typeof node.transform[name] == 'undefined'){
					//默认状态
					if(name == 'scale' ||name == 'scaleX' || name == 'scaleY'){
						value = 1;
					}else{
						value = 0;
					};				
										
				}else{
					//正常
					value = node.transform[name];
				};
				
				return value;
			};
			
			
		};
		
	
})(window);


