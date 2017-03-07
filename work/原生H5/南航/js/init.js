(function() {
    var preloadOption = {
        "during": 3000, // 3秒完成预加载
        "timeStep": 50, // 50毫秒间隔+1;
        "feedback": null, // 预加载的反馈
        "finish": null,
    }

    window.startPreload = function(opt) {
        $.extend(preloadOption, opt);

        var Interval = 0;
        var imgsrc = [];
        var imgsrcLength = 0;
        $("body").find("img").each(function() {
            imgsrc.push($(this).attr("src"));
        });
        imgsrcLength = imgsrc.length;
        var preloadImages = function() {
            if (imgsrcLength <= 0 || imgsrc.length <= 0) {
                //isPreloadReady = true;
            } else {
                var src = imgsrc.pop();
                var Img = new Image();
                Img.src = src;
                Img.onload = function() {
                    preloadImages();
                }
            }
        };

        var percent = 0;
        if (imgsrcLength > 0) {
            preloadImages();
            Interval = setInterval(function() {
                var maxPercent = Math.floor((imgsrcLength - imgsrc.length) / imgsrcLength * 100);
                if (percent < maxPercent) {
                    percent++;
                    typeof preloadOption.feedback == "function" && (preloadOption.feedback(percent));
                }
                if (percent >= 100) {
                    clearInterval(Interval);
                    typeof preloadOption.finish == "function" && (preloadOption.finish());
                }

            }, preloadOption.timeStep);
        }
    }
})();

startPreload({
    timeStep: 10,
    feedback: function(percent) {
        $("#loadPer").html("loading..." + percent + "%");
        if (percent < 100){
            $(".progress").css("width", percent/1.6 + "%");
            $(".progress-inside").css("margin-left", percent/1.3 + "%");
        }
        
    },
    finish: function() {
        console.log("finish");
        document.getElementById('loading').style.display = "none";
        $(".container1 .content").addClass("show");
    }
});

var mySwiper = new Swiper('.swiper-container', {
    loop: false,
    // autoplay: 3000,
    direction: 'vertical',
    onTransitionEnd: function(swiper) {
        $(".swiper-slide").children(".content").css("display", "none");
        $(".swiper-slide-active").children(".content").css("display", "block");
    }
});
