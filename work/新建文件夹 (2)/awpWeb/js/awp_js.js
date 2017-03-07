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
	
	//鼠标移到字体和搜索框上面渐变
    $(".contentSonType li").mouseover(function(){
        $(this).addClass("select");
    });
    $(".contentSonType li").mouseout(function(){
        $(this).removeClass("select");
    });
	
	
	
	var type_nav_li = $('.type_2 ul li');
	var type_nav_ul = $('.type_2 ul');
	$('.type_2 ul li').remove();
		for (var i = 0; i < 109; i++){
			$(type_nav_li).html(i);
			$(type_nav_ul).append( $(type_nav_li).clone(true));
		}

	/*var type_nav_li;
	var type_nav_ul;
	type_nav_li = $('.type_1 ul li');
	type_nav_ul = $('.type_1 ul');
	$('.type_1 ul li').remove();
	for (var i = 0; i < 20; i++){
		$(type_nav_li).html(i);
		$(type_nav_ul).append( $(type_nav_li).clone(true));
	}*/

	
	//首页最新，阅读，推荐,场景,玩法,行业
    $(".contentType a").click(function(){
        var data_tab = $(this).attr("data-tab");
		$(".contentType .typeNav_1").removeClass("ahover");
		$(".contentType .typeNav_2").removeClass("ahover");
		$(".contentType .typeNav_3").removeClass("ahover");
		$(".contentType .typeNav_4").removeClass("ahover");
		$(".contentType .typeNav_5").removeClass("ahover");
		$(".contentType .typeNav_6").removeClass("ahover");
        switch(data_tab){
            case "type_nav_1":
                var $this = $(".type_1");
                if($this.is(":hidden")){
                    $this.siblings("section").fadeOut(300);
                    $this.fadeIn(300);
					$(".contentType .typeNav_1").addClass("ahover");
                }else{
                    $this.fadeOut(300);
                }
                break;
            case "type_nav_2":
                var $this = $(".type_2");
                if($this.is(":hidden")){
                   	$this.siblings("section").fadeOut(300);
                    $this.fadeIn(300);
					$(".contentType .typeNav_2").addClass("ahover");
                }else{
                    $this.fadeOut(300);
                }
                break;
            case "type_nav_3":
                var $this = $(".type_3");
                if($this.is(":hidden")){
                   	$this.siblings("section").fadeOut(300);
                    $this.fadeIn(300);
					$(".contentType .typeNav_3").addClass("ahover");
                }else{
                    $this.fadeOut(300);
                }
                break;
			case "type_nav_4":
                var $this = $(".type_4");
                if($this.is(":hidden")){
                   	$this.siblings("section").fadeOut(300);
                    $this.fadeIn(300);
					$(".contentType .typeNav_4").addClass("ahover");
                }else{
                    $this.fadeOut(300);
                }
                break;
			case "type_nav_5":
                var $this = $(".type_5");
                if($this.is(":hidden")){
                   	$this.siblings("section").fadeOut(300);
                    $this.fadeIn(300);
					$(".contentType .typeNav_5").addClass("ahover");
                }else{
                    $this.fadeOut(300);
                }
                break;
			case "type_nav_6":
                var $this = $(".type_6");
                if($this.is(":hidden")){
                   	$this.siblings("section").fadeOut(300);
                    $this.fadeIn(300);
					$(".contentType .typeNav_6").addClass("ahover");
                }else{
                    $this.fadeOut(300);
                }
                break;
        }
    });
});




/*window.onload=awpLogic;

function awpLogic(){
	var contentType=document.getElementById('contentType'),
		list_a=contentType.getElementsByTagName('a');
	for (var i = 0;i < list_a.length; i++){
		list_a[i].onclick = function(e){
      	e = e || window.event;
      	if(e.stopPropagation){
          e.stopPropagation();
      	}else{
          e.cancelBubble=true;
      	}
		var contentSonType=document.getElementById('contentSonType');
		contentSonType.style.display = 'block'
		
		console.log(contentSonType.style.display, this.innerHTML);
      }
	}
}

function contentSonType_ondown(e){
	e = e || window.event;
	console.log("123123123123121");
	var contentSonType=document.getElementById('contentSonType');
	console.log(contentSonType.style.display);
}*/