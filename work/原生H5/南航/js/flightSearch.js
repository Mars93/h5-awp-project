$.fn.extend({
	flightSearch:function(chanel,depCode,arrCode,depName,arrName,queryWay,dateGo,dateBack,inter){
		//chanel;//chanel：大号：csairwx,小号：scsairwx
		//depCode;//始发地机场三字码
		//arrCode;//目的地机场三字码
		//depName;//始发地（中文名）
		//arrName;//目的地（中文名）
		//queryWay;//single单程，double来回程
		//dateGo;//去程时间yyyy-MM-dd
		//dateBack;//回程时间yyyy-MM-dd
		//inter;//0是国内，1是国际
		//
		//window.CSNativeObject.nativeBooking(param)参数说明
		//param = {
		// 	mode:"1"//（字符串）:0表示跳转机票预订输入页面，1表示跳转国内航班列表，2表示跳转国际航班列表(ios暂时未实现跳转列表页功能，Android国内可跳转列表页)
		// 	flightGoDate:"2016-01-01",
		// 	flightBackDate:"2016-01-01",//来回程，这个值为空
		// 	depCityCode:"CAN",
		// 	arrCityCode:"BEK"
		// }
		var goListPage = function(){
	        //如果是APP的广告，点击航班跳转会APP原生页面
	        if (window.CSNativeObject && typeof window.CSNativeObject.nativeBooking === 'function' && dateGo && depCode && arrCode && inter == 0) {
	        	var mode = inter == 0?"1":"2";
	        	var info;
	        	if(queryWay == "double" && dateBack){
	        		info = '{"flightGoDate":"' + dateGo + '","flightBackDate":"' + dateBack + '","depCityCode":"'+depCode+'","arrCityCode":"'+arrCode+'","mode":"'+mode+'"}';
	        	}else{
	        		info = '{"flightGoDate":"' + dateGo + '","depCityCode":"'+depCode+'","arrCityCode":"'+arrCode+'","mode":"'+mode+'"}';
	        	}
	            window.CSNativeObject.nativeBooking(info);
	        } else {
	        	if(inter == 0){
	        		var hrefUncode = 'https://m.csair.com/touch/com.csair.mbp.index/index.html#com.csair.mbp.booking_new/bookinglist?t={"chanel":"'+chanel+'","discount":"Y","info":{"dep":"'+depCode+'","arr":"'+arrCode+'","queryWay":"'+queryWay+'","date_go":"'+dateGo+'","date_back":"'+dateBack+'","depport_name":"'+depName+'","arrport_name":"'+arrName+'","vipday":null}}';
	        	}else{
	        		var hrefUncode = 'https://m.csair.com/touch/com.csair.mbp.index/index.html#com.csair.mbp.booking_new/bookinglistInternation?t={"chanel":"'+chanel+'","discount":"Y","info":{"dep":"'+depCode+'","arr":"'+arrCode+'","queryWay":"'+queryWay+'","date_go":"'+dateGo+'","date_back":"'+dateBack+'","depport_name":"'+depName+'","arrport_name":"'+arrName+'","vipday":null}}';
	        	}
				window.location.href = encodeURI(hrefUncode);
	        }
	    };
	    var goQueryPage = function(){
	    	if (window.CSNativeObject && typeof window.CSNativeObject.nativeBooking === 'function') {
	            var mode = "0";//跳转查询页
	            window.CSNativeObject.nativeBooking('{"mode":"'+mode+'"}');
	        }else{
	            window.location.href="https://m.csair.com/touch/com.csair.mbp.index/index.html#com.csair.mbp.booking_new/";
	        }
	    };
	    var isXiZang = function(airport){
            var arr_array = ['LXA','LZY','BPX','RKZ','NGQ'];
            return arr_array.indexOf(airport)==-1?false:true;
        };
        /**
     * 模态窗口，用于提示用户
     * 参数格式：{title:'',content:'',btnMap:{}}
     * @param title 窗口标题
     * @param content 提示信息
     * @param btnMap 以按键名称为键、callback函数为值的map对象,为空时有默认值,不多于4个按键
     */
	    var alertMsg = function(data){
	        var dialogTPL = function(data){
	                var it = data;
	                var title = it.title || '提示',
	                    content = it.content || '';
	                var btnHtmlStr = '',
	                    count = 0;
	                for(var key in it.btnMap){
	                    btnHtmlStr += '<div class="dialog-bb-btn" data-key="'+key+'">'+key+'</div>';
	                    count++;
	                }
	                var htmlStr = '<div class="modelWindow">'
	                    +'<div class="dialog-table">'
	                        +'<div class="dialog-t-cell">'
	                            +'<div class="dialog-container">'
	                                +'<div class="dialog-title">'+title+'</div>'
	                                +'<div class="dialog-body">'+content+'</div>'
	                                +'<div class="dialog-btnBar" data-dialog-btnCount="'+count+'">'
	                                    +btnHtmlStr
	                                +'</div></div></div></div></div>';
	                return htmlStr;
	            };
	        //默认一个确定按钮
	        var defaultBtn = {};
	        defaultBtn['确定'] = function (){}
	        //默认回调函数
	        var defaultAction = function () {
	            $(this).remove();
	        };
	        var btnMap = data.btnMap || defaultBtn;
	        data.btnMap = btnMap;
	        var htmlStr = dialogTPL(data);
	        var $modelWindow = $(htmlStr);
	        for (var key in btnMap) {
	            $modelWindow
	                .find("[data-key=" + key + "]")
	                .click($.proxy(btnMap[key] ||defaultAction , $modelWindow))
                	.click($.proxy(defaultAction, $modelWindow));
	        }
	        $modelWindow.appendTo("body");
	        return $modelWindow;
	    };

	    if(chanel && depCode && arrCode && depName && arrName && queryWay && dateGo){
	    	//飞往西藏城市先提示
	    	if (isXiZang(arrCode)) {
	            alertMsg({
	                content:"根据相关规定，凡购买飞往西藏拉萨、林芝、昌都、日喀则、阿里，或在上述城市中转的旅客，移动端只支持持有中国公民身份证的旅客在网站自助出票，持其他证件购票的旅客，需持《进藏批准函》前往南航当地营业部验证购票。如因旅客违反此规定造成无法乘机等损失，将由旅客自行承担。感谢您的配合。"
	                ,
	                btnMap:{
	                    '知道了':goListPage
	                }
	            });
	        }else{
	            goListPage();
	        }
	    }else{
	    	goQueryPage();
	    }

	}
});