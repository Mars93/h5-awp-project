var submitData = function(f) {
    var d = f.split(",");
    var e = d[4] === "R" ? "2" : "1";
    $(this).flightSearch(e, d[0], d[1], d[2], d[3], d[5], d[6], 1, 0, 0, true)
};
var mixData = [];
getMinPrice = function(a) {
    mixData = a.FROMOFLIGHTS;
    find2(mixData)
};

function find2(o) {
    var flights = {};
    var regions = [];
    for (var i = 0; i < o.length; i++) {
        var f = o[i];
        if (!flights[f["REGION"]]) {
            regions.push(f["REGION"]);
            flights[f["REGION"]] = [];
        }
        flights[f["REGION"]].push(f);
    };
    regions.sort(function(a, b) {
        return a > b;
    });
    // console.log(flights);
    var html = '';
    html += "<div class='tabBtn'><ul class='scrollUI'>";
    for (var i = 0; i < regions.length; i++) {
        var key = regions[i];
        var active = '';
        if (i == 0) {
            active = 'active';
        }
        if (i == 4){
            html += "<li style='margin-left:12%;' class='" + active + "' onClick='scrollActive(this,\"" + key + "\");'>" + key + "</li>";
        }else{
            html += "<li class='" + active + "' onClick='scrollActive(this,\"" + key + "\");'>" + key + "</li>";
        }
        
    }
    html += "</ul>";
    html += "</div>";

    // 机票展现
    for (var i = 0; i < regions.length; i++) {
        var h = '';
        var index = 0;
        var key = regions[i];
        var show = '';
        if (i == 0) {
            show = 'show';
        }
        h += "<div id='" + key + "' class='biao " + show + "'><div class='flights_wrap'>";
        var o = flights[key];
        for (var s = 0; s < o.length; s++) {
            var r = o[s]["FLIGHT"];
            for (var fl = 0; fl < r.length; fl++) {
                if (index % 5 == 0) {
                    h += "<div class='flights'>";
                }
                h += "<ul><a style='cursor:pointer' onclick='submitData(\"" + o[s].DEPCTIYNAME_ZH + "," + o[s].DEPCITY + "," + r[fl].ARRCTIYNAME_ZH + "," + r[fl].ARRCITY + "," + r[fl].SEGTYPE + "," + r[fl].DEPDATE + "," + r[fl].RETURNDATE + "\")'>";
                h += "<li>" + o[s].DEPCTIYNAME_ZH + "<span><img src='images/arrow.jpg' alt='往返'/></span>" + r[fl].ARRCTIYNAME_ZH + "</li><li style='margin-top:2px;'><i>￥</i><strong style='font-size:25px;color:#F00;'>" + r[fl].MINPRICE + "</strong><i>起</i>";
                h += "<span class='btn'>立抢</span></li>";
                h += "</a></ul>";
                index++;
                if (index % 5 == 4) {
                    h += "</div>";
                    h += "<div style='clear:both;'></div>";
                    index = 0;
                }
            }
        }
        if (index != 0) {
            h += "</div>";
            h += "<div style='clear:both;'></div>";
            index = 0;
        }
        h += "</div></div>";
        html += h;
    }
    $("#flights").html(html);
};

function scrollActive(obj, key) {
    $(".scrollUI li").removeClass("active");
    $(obj).addClass("active");
    $(".biao").removeClass("show");
    $("#" + key).addClass("show");
}


