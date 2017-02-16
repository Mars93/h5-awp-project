// JavaScript Document
$(document).ready(function(){
    //页面滚动到一定高度，显示导航
    if ($(this).scrollTop() >= 64) {
        $(".secondHeader").addClass("open");
    } else {
        $(".secondHeader").removeClass("open");
    }
    $(document).bind("scroll", function (e) {
        //console.log($(this).scrollTop());
        if ($(this).scrollTop() >= 64) {
            $(".secondHeader").addClass("open");
        } else {
            $(".secondHeader").removeClass("open");
        }
    });
	
	getHistory();
	
	//鼠标移到子标签上改变背景
	$(".returnTop img").mouseover(function(){
		$(this).attr("src","images/topUp.png");
	});
	$(".returnTop img").mouseout(function(){
		$(this).attr("src","images/top.png");
	});
	
	
	//搜索
	$(".seekTxt a").click(function(){
		var val = $(".seekTxt .seekTxtStyle").val();
		if (val != "" && val != '搜索你喜欢的'){
			$('#content').empty();
			$(".contentSonType").fadeOut(300);
			$(".contentType a").removeClass("ahover");
			content_update_value(val);
		}
	});
	$(".seek a").click(function(){
		var val = $(".seek .seekText").val();
		if (val != "" && val != '搜索你喜欢的'){
			$('#content').empty();
			$(".contentSonType").fadeOut(300);
			$(".contentType a").removeClass("ahover");
			content_update_value(val);
		}
	});
	
	function getQueryString(name) {  
    	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
    	var r = location.search.substr(1).match(reg);  
    	if (r != null) return unescape(decodeURI(r[2])); return null;  
	}  
	var $typeTagId = getQueryString("typeTagId");
	var $typeSeekVal = getQueryString("typeSeekVal");
	
	var contentType_a_id = 0;
	var type_n_arr = ["type_1","type_2","type_3","type_4","type_5","type_6"];
	as.queryTagGroup(function(param){
		if (param && param.length){
			$("#topNav_a_js").tmpl(param).appendTo('#topNav_a');
			$("#contentType_js").tmpl(param).appendTo('#contentType');
			
			//默认显示第一个主标签下第一个子标签下的内容
			if ($typeSeekVal && $typeSeekVal != ""){
				content_update_value($typeSeekVal);
			}else if ($typeTagId){
				masterLabel_content_update($typeTagId, null, false);
			}else{
				masterLabel_content_update(param[0].id, null, false);
			}
			
			//点击主标签更新子标签
			//首页最新，阅读，推荐,场景,玩法,行业
			$("#topNav_a a").click(mainTab_a_click_handler);
			$(".contentType a").click(mainTab_a_click_handler);
			/*$(".contentType a").click(function(){
				var contentType_a = $(this);
				var data_tab_id = $(this).attr("id");
				$(".contentType a").removeClass("ahover");
					
				masterLabel_content_update(data_tab_id, contentType_a, true);
			});*/
		}
	});
	
	function mainTab_a_click_handler(){
		//var contentType_a = $(this);
		var data_tab_id = $(this).attr("id");
		$(".contentType a").removeClass("ahover");
			
		masterLabel_content_update(data_tab_id, true);
	}
	
	//主标签下内容更新
	function masterLabel_content_update(data_tab_id, bo){
		as.queryTag(data_tab_id, function(sonTypeParam){
					
			if (contentType_a_id != data_tab_id){
				contentType_a_id = data_tab_id;
				$('#type_nav').empty();
				if (sonTypeParam && sonTypeParam.length){
					var gameTypeObjData = { gameTypeDatas: sonTypeParam };
					$("#section_js").tmpl(gameTypeObjData).appendTo('#type_nav');
					
					$('.contentSonType').addClass(type_n_arr[data_tab_id-1]);
					$('#content').empty();
					
					//默认显示第一个子标签下的内容
					content_update(sonTypeParam[0].id);
				}
			}else{
				
			}
			
			if (bo == true){
				var $contentSonType = $(".contentSonType");
				if($contentSonType.is(":hidden")){
					$contentSonType.siblings("section").fadeOut(300);
					$contentSonType.fadeIn(300);
					for (var i = 0; i < $(".contentType a").length; i++){
						var type_a = $(".contentType a")[i];
						if ($(type_a).attr("id") == data_tab_id){
							$(type_a).addClass("ahover");
							break;
						}
					}
				}else{
					$contentSonType.fadeOut(300);
				}
			}
			
			
			//鼠标移到子标签上改变背景
			$(".contentSonType li").mouseover(function(){
				$(this).addClass("select");
			});
			$(".contentSonType li").mouseout(function(){
				$(this).removeClass("select");
			});
			
			$(".contentSonType li").unbind("click");
			
			//点击子标签更新内容（项目案例）
			$(".contentSonType li").click(function(){
				var contentSonType_li = $(this);
				var contentSonType_li_id = $(this).attr("id");
				$('#content').empty();
				content_update(contentSonType_li_id);
			});
			
			
		});
	}
	
	//子标签下内容更新
	function content_update(li_id){
			as.queryActivityList(li_id, function(contentParam){
			if (contentParam && contentParam.length){
				var contentData = { gameDatas: contentParam, arrowIcon: 'images/arrows.png', firmName: 'by 爱玩派', caseUrl: 'awpH5/awpH5GameShow.html'}
				$("#row_js").tmpl(contentData).appendTo('#content');
				
				$(".element img").unbind("click");
				
				$(".element img").click(function(){
					var element_a_img = $(this);
					var element_id = $(this).attr("elementId");
					var case_url = $(this).attr("caseUrl");
					
					//location.href=qrcode_url+"?caseId="+element_id;//发送id给详情页
					window.open(case_url+"?caseId="+element_id);
				});
			}
			
			
			
			//鼠标移到内容项目上周围有灰色阴影
			/*$(".content .element").mouseover(function(){
				$(this).addClass("elementMouseOver");
			});
			$(".content .element").mouseout(function(){
				$(this).removeClass("elementMouseOver");
			});*/
			
		});
	}
	
	//根据搜索条件获取案例列表
	function content_update_value(value){
			as.querySearch(value, function(contentParam){
			if (contentParam && contentParam.length){
				
				contentType_a_id = 0;
				setHistory(value);
				setHistoryData(value);
				
				var contentData = { gameDatas: contentParam, arrowIcon: 'images/arrows.png', firmName: 'by 爱玩派',caseUrl: 'awpH5/awpH5GameShow.html'}
				$("#row_js").tmpl(contentData).appendTo('#content');
				
				$(".element img").unbind("click");
				
				$(".element img").click(function(){
					var element_a_img = $(this);
					var element_id = $(this).attr("elementId");
					var case_url = $(this).attr("caseUrl");
					
					//location.href=qrcode_url+"?caseId="+element_id;//发送id给详情页
					window.open(case_url+"?caseId="+element_id);
				});
				
				getHistory();
			}
		});
	}
	
	
	
	var historyCount = 15; //保存历史记录个数
	/**
	 * 增加浏览历史记录
	 * @return
	 */
	function setHistory(keyWord) {
			var keyWords = $.cookie('keyWord');
			if (keyWords) {
				if(keyWord) {
					var keys = keyWords.split(",");
					for (var i = keys.length - 1; i >= 0; i--) {
						if (keys[i] == keyWord) {
							keys.splice(i, 1);
						}
					}
					keys.push(keyWord);
					if (keys.length >= historyCount) {
						//删除最开始的多余记录
						var count = keys.length - historyCount + 1; //需要删除的个数
						keys.splice(0, count); //开始位置,删除个数
					}
					$.cookie('keyWord', keys.join(','), {expires: 365, path: '/'});
				}
			} else {
				$.cookie('keyWord', keyWord, {expires: 365, path: '/'});
			}
	}
	
	function  delHistory(){
		$.cookie("keyWord",null,{path:"/",expires: -1});
	}
	
	function  getHistory(){
		var keyWords = $.cookie('keyWord');
		if(keyWords) {
			var keys=  keyWords.split(",");
			var length = keys.length;
			$('#hot').empty();
			var hotDataObj = { hotData: keys };
			$("#hot_js").tmpl(hotDataObj).appendTo('#hot');
			hot_a_click();
		}
	}
	
	//点击历史搜索记录（热门搜索）
	function hot_a_click(){
		$(".hot a").unbind("click");
		
		$(".hot a").click(function(){
			var val = $(this).text();
			$('#content').empty();
			$(".contentSonType").fadeOut(300);
			$(".contentType a").removeClass("ahover");
			content_update_value(val);
		});	
	}
	
	//$("#gover_search_key").focus(function(){
		//这里写获得焦点之后运行的代码。
		$(document).keydown(function(event){ 
			 if(event.keyCode == 13){
			 	var isFocus=$('#gover_search_key').is(':focus');
				//console.log("11111111111",isFocus);
			 	if (true == isFocus){
					var val = $("#gover_search_key").val();
					if (val.length > 0){
						$('#content').empty();
						$(".contentSonType").fadeOut(300);
						$(".contentType a").removeClass("ahover");
						$('#gov_search_suggest').hide();  
						$('#hot').show(); 
						content_update_value(val);
					}
				}
			 }
		});
	//});


	//禁用chrome和firefox浏览器自带的自动提示 
	$('#gover_search_key').attr("autocomplete","off"); 
	$('.seek .seekText').attr("autocomplete","off");
	
	
	//实现搜索输入框的输入提示js类  
	function oSearchSuggest(searchFuc){  
		var input = $('#gover_search_key');  
		var suggestWrap = $('#gov_search_suggest');  
		var key = "";  
		var init = function(){  
			input.bind('keyup',sendKeyWord);  
			input.bind('blur',function(){setTimeout(hideSuggest,100);})  
		}  
		var hideSuggest = function(){  
			suggestWrap.hide();  
			$('#hot').show();  
		}  
		  
		//发送请求，根据关键字到后台查询  
		var sendKeyWord = function(event){  
			  
			//键盘选择下拉项  
			if(suggestWrap.css('display')=='block'&&event.keyCode == 38||event.keyCode == 40){  
				var current = suggestWrap.find('li.hover');  
				if(event.keyCode == 38){  
					if(current.length>0){  
						var prevLi = current.removeClass('hover').prev();  
						if(prevLi.length>0){  
							prevLi.addClass('hover');  
							input.val(prevLi.html());  
						}  
					}else{  
						var last = suggestWrap.find('li:last');  
						last.addClass('hover');  
						input.val(last.html());  
					}  
					  
				}else if(event.keyCode == 40){  
					if(current.length>0){  
						var nextLi = current.removeClass('hover').next();  
						if(nextLi.length>0){  
							nextLi.addClass('hover');  
							input.val(nextLi.html());  
						}  
					}else{  
						var first = suggestWrap.find('li:first');  
						first.addClass('hover');  
						input.val(first.html());  
					}  
				}  
				  
			//输入字符  
			}else{   
				var valText = $.trim(input.val());  
				if(valText ==''||valText==key){  
					return;  
				}  
				searchFuc(valText);  
				key = valText;  
			}             
			  
		}  
		//请求返回后，执行数据展示  
		this.dataDisplay = function(data){  
			if(data.length<=0){  
				suggestWrap.hide();  
				$('#hot').show();  
				return;  
			}  
			  
			//往搜索框下拉建议显示栏中添加条目并显示  
			var li;  
			var tmpFrag = document.createDocumentFragment();  
			suggestWrap.find('ul').html('');  
			for(var i=0; i<data.length; i++){  
				li = document.createElement('LI');  
				li.innerHTML = data[i];  
				tmpFrag.appendChild(li);  
			}  
			suggestWrap.find('ul').append(tmpFrag);  
			suggestWrap.show();  
			$('#hot').hide(); 
			  
			//为下拉选项绑定鼠标事件  
			suggestWrap.find('li').hover(function(){  
					suggestWrap.find('li').removeClass('hover');  
					$(this).addClass('hover');  
			  
				},function(){  
					$(this).removeClass('hover');  
			}).bind('click',function(){  
				input.val(this.innerHTML);  
				suggestWrap.hide(); 
				$('#hot').show(); 
			});  
		}  
		init();  
	};  
	  
	//实例化输入提示的JS,参数为进行查询操作时要调用的函数名  
	var searchSuggest =  new oSearchSuggest(sendKeyWordToBack);  
	  
	//这是一个模似函数，实现向后台发送ajax查询请求，并返回一个查询结果数据，传递给前台的JS,再由前台JS来展示数据。本函数由程序员进行修改实现查询的请求  
	//参数为一个字符串，是搜索输入框中当前的内容  
	function sendKeyWordToBack(keyword){  
		   /*  var obj = {  
					"keyword" : keyword  
				 };  
				 $.ajax({  
						   type: "POST",  
						   url: "${ctx}/front/suqiu2/search/prompt-keyword.action",  
						   async:false,  
						   data: obj,  
						   dataType: "json",  
						   success: function(data){  
							 //var json = eval("("+data+")");  
							 var key=data.split(",");  
							 var aData = [];  
							 for(var i=0;i<key.length;i++){  
									//以下为根据输入返回搜索结果的模拟效果代码,实际数据由后台返回  
								if(key[i]!=""){  
									  aData.push(key[i]);  
								}  
							 }  
							//将返回的数据传递给实现搜索输入框的输入提示js类  
							 searchSuggest.dataDisplay(aData);  
						   }  
			 });      */  
				   //console.log(keyword);
					//以下为根据输入返回搜索结果的模拟效果代码,实际数据由后台返回  
					var aData = getHistoryData(keyword);  //(这里取的是存在cookie里面的数据)
					//aData.push(keyword+'返回数据1');  
					//aData.push(keyword+'返回数据2');  
					//aData.push(keyword+'不是有的人天生吃素的');  
					//aData.push(keyword+'不是有的人天生吃素的');  
					//aData.push(keyword+'2012是真的');  
					//aData.push(keyword+'2012是假的');  
					//将返回的数据传递给实现搜索输入框的输入提示js类  
					searchSuggest.dataDisplay(aData);  
		  
	}  
	
	/**
	搜索历史下拉框数据
	*/
	function setHistoryData(keyWord) {
			var keyWords = $.cookie('keyWordData');
			if (keyWords) {
				if(keyWord) {
					var keys = keyWords.split(",");
					for (var i = keys.length - 1; i >= 0; i--) {
						if (keys[i] == keyWord) {
							keys.splice(i, 1);
						}
					}
					keys.push(keyWord);
					$.cookie('keyWordData', keys.join(','), {expires: 365, path: '/'});
				}
			} else {
				$.cookie('keyWordData', keyWord, {expires: 365, path: '/'});
			}
	}
	
	//function  delHistory(){
	//	$.cookie("keyWord",null,{path:"/",expires: -1});
	//}
	/**
		获取搜索历史下拉框数据
	*/
	function getHistoryData(sr){
		var keyWords = $.cookie('keyWordData');
		var arr = [];
		if(keyWords) {
			var keys=  keyWords.split(",");
			var length = keys.length;
			for (var i = 0; i < length; i++){
				var str = keys[i];
				if(str.indexOf(sr)>=0){
					arr.push(str);
				}
			}
		}
		return arr;
	}
	
});
