var submitData = function (f) {
    var d = f.split(",");
    var e = d[4] === "R" ? "double" : "single";
    // console.log(e, d[0], d[1], d[2], d[3], d[5], d[6], 1, 0, 0, true);
    // $(this).flightSearch(e, d[0], d[1], d[2], d[3], d[5], d[6], 1, 0, 0, true)
    // console.log("scsairwx",d[1],d[3],d[0],d[2],e,d[5], d[6],1);
    $(this).flightSearch("scsairwx",d[1],d[3],d[0],d[2],e,d[5], d[6],1);
};
var mixData = [];

getMinPrice = function (b) {
    // console.log(JSON.stringify(b));
    // console.log(JSON.parse(JSON.stringify(b)));
    // console.log("-----------------------");
    // console.log(b);
    b = JSON.parse(JSON.stringify(b));
    mixData = b.FROMOFLIGHTS;
    var c = mixData;

    var splitIndex = 0 ;
    for(var i = 0 ;i < mixData.length; i++){
        var obj = mixData[i];
        if(obj.DEPCTIYNAME_ZH == "广州" && obj.FLIGHT.length >1){
            splitIndex = i;
        }
    }
    var others = mixData.splice(splitIndex, 1);
    console.log(others);
    find(mixData);
    console.log(mixData);
    var a = build(others);
    $("#flights").html(a)
};
function find(c) {
    // console.log(c);
    for (var a = 0; a < c.length; a++) {
        var d = c[a].FLIGHT;
        for (fl in d) {
            if (d[fl].MINPRICE == "") {
                continue
            }//<i>往返</i>
            if (c[a].DEPCTIYNAME_ZH == "广州" && d[fl].ARRCTIYNAME_ZH == "墨西哥城"){
                var yh = "<a style='cursor:pointer;position:relative;float: left;' onclick='submitData(\"" + c[a].DEPCTIYNAME_ZH + "," + c[a].DEPCITY + "," + d[fl].ARRCTIYNAME_ZH + "," + d[fl].ARRCITY + "," + d[fl].SEGTYPE + "," + d[fl].DEPDATE + "," + d[fl].RETURNDATE + "\")'>";
                yh = yh + "<li style='float: right;z-index: 999;'><i style='font-size: 12px;color: #ffe958;'>￥</i><b style='color: #ffe958;'>" + d[fl].MINPRICE + "</b><i style='font-size: 12px;color: #ffe958;'>元起*</i></li><img style='position:relative;' src='images/p8-2.png' alt='往返'/>";
                yh = yh  + "</a>";
                $("#privilege").html(yh);
                break;
            }
        
        }
    }
};

function build(c){
    // console.log(c);
    var b = "";
    for (var a = 0; a < c.length; a++) {
        var d = c[a].FLIGHT;
        for (fl in d) {
            if (d[fl].MINPRICE == "") {
                continue
            }//<i>往返</i>
            b = b + "<ul><div class='uibg'><img src='images/jijiaBg.png'/></div><a style='cursor:pointer' onclick='submitData(\"" + c[a].DEPCTIYNAME_ZH + "," + c[a].DEPCITY + "," + d[fl].ARRCTIYNAME_ZH + "," + d[fl].ARRCITY + "," + d[fl].SEGTYPE + "," + d[fl].DEPDATE + "," + d[fl].RETURNDATE + "\")'>";
             b = b + "<li class = 'fll'><span>" + c[a].DEPCTIYNAME_ZH + "</span><span><img class='icon' src='images/fenji.png' alt='往返'/></span><span class='daoda'>" + d[fl].ARRCTIYNAME_ZH + "</span></li><li class = 'frr'><i style='font-size:12px;'>￥</i><b style='font-size:16px;'>" + d[fl].MINPRICE + "</b><i style='font-size:12px;'>起</i><i style='font-size:14px;'>  往返</i></li>";
              b = b + "</a></ul>"
        
        }
    }
    return b

}