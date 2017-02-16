var as = {};

/*------------------初始化基础数据 start---------------------*/
as.domains = "http://"+document.domain+"/rpap/";
as.AppID = "83007cebc8e311e6bb186c92bf3148fb";
as.AppKey = "80cc8a248e5f4ba4b984b81ea184a5f2";
/*------------------初始化基础数据 end-----------------------*/

/*------------------HDP初始化 start---------------------*/
HDP.init(as.AppID, as.AppKey);
weixinGetConfig();
//隐藏微信右上角菜单
hideOptionMenu();

//以下初始化不需要使用可以注释掉
as.func = HDP.getFunction();        //自定义函数
/*------------------HDP初始化 end-----------------------*/

/*------------------自定义函数 start---------------------*/
//单语句查询
as.queryFun = function(funName, data, callback) {
    as.func.runFunction(funName, {
        "param": data,
        "success": function(res) {
            if (typeof callback == "function") callback(res);
        },
        "error": function(res) {
            if (typeof callback == "function") callback(null);
        }
    });
};
//插入，修改，多语句查询
as.queryFunV2 = function(funName, data, callback) {
    as.func.runFunctionV2(funName, {
        "param": data,
        "success": function(res) {
            if (typeof callback == "function") callback(res);
        },
        "error": function(res) {
            if (typeof callback == "function") callback(null);
        }
    });
};
/*------------------自定义函数 end---------------------*/

/*------------------其它 start---------------------*/
/*
 * tableName 要存的表的名字
 * data 为字典结构
 * 例如 data = {}
 *    data["key"] = value;
 */
as.saveTable = function(tableName, value, callback) {
    var table = HDP.getTable(tableName);
    for (var key in value) {
        table.set(key, value[key]);
    }
    table.save({
        "success": function(res) {
            if (typeof callback == "function") callback(res);
        },
        "error": function(res) {
            if (typeof callback == "function") callback(null);
        }
    });
};
/*------------------其它 end-----------------------*/

/*------------------ 以下为定制化接口 ---------------------*/
//获取标签组
as.queryTagGroup = function(callback){
    as.queryFun("queryTagGroup", {}, function(res){
        if(typeof callback == "function") callback(res);
    }); 
};
//获取归属在标签组下的标签
as.queryTag = function(tag_group_id, callback){
    as.queryFun("queryTag", {
        "tag_group_id" : tag_group_id
    }, function(res){
        if(typeof callback == "function") callback(res);
    }); 
};
//获取归属在标签下的案例列表
as.queryActivityList = function(tag_id, callback){
    as.queryFun("queryActivityList", {
        "tag_id" : tag_id
    }, function(res){
        if(res && res.length > 0){
            for(var i = 0;i < res.length;i++){
                var img_url = res[i]["img_url"];
                if(img_url != ""){
                    res[i]["img_url"] = img_url.split(",");
                }else{
                    res[i]["img_url"] = [];
                }
            }
        }
        if(typeof callback == "function") callback(res);
    }); 
};
//获取案例详细信息
as.queryActivity = function(activity_id, callback){
    as.queryFunV2("queryActivity", {
        "activity_id" : activity_id
    }, function(res){
        if(res && res[0].length > 0){
            if(res[0][0]["img_url"] != ""){
                res[0][0]["img_url"] = res[0][0]["img_url"].split(",");
            }else{
                res[0][0]["img_url"] = [];
            }
            if(typeof callback == "function") callback(res[0][0]);
        }else{
            if(typeof callback == "function") callback(null);
        }
    }); 
};
//根据搜索条件获取案例列表
as.querySearch = function(search, callback){
    as.queryFun("querySearch", {
        "search" : search
    }, function(res){
        if(res && res.length > 0){
            for(var i = 0;i < res.length;i++){
                var img_url = res[i]["img_url"];
                if(img_url != ""){
                    res[i]["img_url"] = img_url.split(",");
                }else{
                    res[i]["img_url"] = [];
                }
            }
        }
        if(typeof callback == "function") callback(res);
    }); 
};

//注册
as.registered = function(account_number, password, callback){
    as.queryFunV2("registered", {
        "account_number" : account_number,
        "password"       : password
    }, function(res){
        var flag = false;
        if(res && res.length > 0){
            flag = res[0];
        }
        if(typeof callback == "function") callback(flag);
    });
};
//登录
as.login = function(account_number, password, callback){
    as.queryFun("login", {
        "account_number" : account_number,
        "password"       : password
    }, function(res){
        var flag = false;
        if(res && res.length > 0){
            flag = true;
            sessionStorage.setItem("accountnumber", account_number);
        }
        if(typeof callback == "function") callback(flag);
    });
};
//判断是否登录
as.checkLogin = function(callback){
    var accountnumber = sessionStorage.getItem("accountnumber");
    var flag = false;
    if(accountnumber != null && accountnumber != ""){
       flag = true;
    }
    if(typeof callback == "function") callback(flag);
};