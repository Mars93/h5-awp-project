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
	});