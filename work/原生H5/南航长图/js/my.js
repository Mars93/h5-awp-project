// JavaScript Document
$(document).ready(function(){
    bounced();

    addListener();

});

var yuyue = {
    "25-1" :{
        "name" : "广州-湛江1元旅行套餐",
        "date" : "2月25日上午10点",
        "id" : "25-1"
    },
    "25-2" :{
        "name" : "广州-湛江半价旅行套餐",
        "date" : "2月25日上午10点",
        "id" : "25-2"
    },
    "26-1" :{
        "name" : "广州-梅州1元旅行套餐",
        "date" : "2月26日上午10点",
        "id" : "26-1"
    },
    "26-2" :{
        "name" : "广州-湛江半价旅行套餐",
        "date" : "2月26日上午10点",
        "id" : "26-2"
    },
    "27-1" :{
        "name" : "广州-厦门1元旅行套餐",
        "date" : "2月27日上午10点",
        "id" : "27-1"
    },
    "27-2" :{
        "name" : "广州-厦门半价旅行套餐",
        "date" : "2月27日上午10点",
        "id" : "27-2"
    }
}

function capacity(id){
    var data = yuyue[id];
    
    if (data && data.id != ""){
        $(".tan").show();
        $(".matte").show();
        $(".tijiao").show();
        $(".win").hide();
        // document.getElementById("imgUpdate").src="images/"+data.id+".png";
        $("#imgUpdate").attr("src","images/tan"+data.id+".png");
        $("#tijiaoBtn").attr("vId",data.id);

        // switch (data.id) {
        //     case "25-1":
        //         $("#imgUpdate").attr("src","images/+"data.id"+.png");
        //         break;
        // }   
    }
}

function bounced(){
    $("#tijiaoBtn").click(function(){
        var vId = $(this).attr("vId");
        var vData = yuyue[vId];
        var phone = document.getElementById("phone").value;
        var mail = document.getElementById("mail").value;
        if (vData){
            saveUserInfo(phone,mail,vData.name,vData.date,function(bo){
                if (bo){
                    $(".tijiao").hide();
                    $(".win").show();
                }
            });
        }
        
    });

    $("#winBtn").click(function(){
        $(".tan").hide();
        $(".matte").hide();
    });
    $(".matte").click(function(){
        $(".tan").hide();
        $(".matte").hide();
    });
    $(".bott").click(function(){
        $(".tan").hide();
        $(".matte").hide();
    });
}

