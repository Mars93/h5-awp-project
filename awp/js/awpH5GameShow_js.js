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
	
	//禁用chrome和firefox浏览器自带的自动提示
	$('.seek .seekText').attr("autocomplete","off");
	
	$(".seek a").click(function(){
		var val = $(".seek .seekText").val();
		if (val != "" && val != '搜索你喜欢的'){
			location.href = "../index.html?typeSeekVal="+val;
		}
	});
	
	as.queryTagGroup(function(param){
		if (param && param.length){
			$("#topNav_a_js").tmpl(param).appendTo('#topNav_a');
			
			$("#topNav_a a").click(function(){
				//var element_a_img = $(this);
				var element_id = $(this).attr("id");
				
				//window.open("../index.html");
				location.href = "../index.html?typeTagId="+element_id;//发送id给目标页
			});
		}
	});
	
	//鼠标移上去改变熟悉
	$(".returnTop img").mouseover(function(){
		$(this).attr("src","../images/topUp.png");
	});
	$(".returnTop img").mouseout(function(){
		$(this).attr("src","../images/top.png");
	});
	
	function getQueryString(name) {  
    	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");  
    	var r = location.search.substr(1).match(reg);  
    	if (r != null) return unescape(decodeURI(r[2])); return null;  
	}  

	var $caseId = getQueryString("caseId");
	//console.log($caseId);
	//获取案例详细信息
	as.queryActivity($caseId, function(caseProjectParam){
		if (caseProjectParam){
			console.log(caseProjectParam);
			caseProjectParam["likeBg"] = "../images/likeBg.png";
			$("#caseProjectParam_js").tmpl(caseProjectParam).appendTo('#contentIntroduce');
		}
	});
	
	//获取相关案例
	as.queryRelatedCases($caseId, function(contentParam){
			if (contentParam && contentParam.length){
				var contentData = { gameDatas: contentParam, arrowIcon: '../images/arrows.png', firmName: 'by 爱玩派', caseUrl: 'awpH5GameShow.html'}
				$("#row_js").tmpl(contentData).appendTo('#recommend_row');
				
				$(".element img").unbind("click");
				
				$(".element img").click(function(){
					var element_a_img = $(this);
					var element_id = $(this).attr("elementId");
					var case_url = $(this).attr("caseUrl");
					
					//location.href=qrcode_url+"?caseId="+element_id;//发送id给详情页
					window.open(case_url+"?caseId="+element_id);
				});
			}
			
		});
	
});



