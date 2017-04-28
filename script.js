(function() {
	var loginInfo = [{
		name: "alpha",
		host: "10.93.45.194:31943",
		username: "public",
		password: "Changeme_123",
	},{
		name: "beta2",
		host: "10.145.69.191:31943",
		username: "admin",
		password: "Huawei12#$",
	}];
	var timeoutNum = 0;
	var locationHost = window.location.host;
	var locationOrigin = "https://" + locationHost;
	var Config = {
		login_type: "Login",
		delay: 500,
		redirect : locationOrigin + "/csmresmgrwebsite/res/SYS_PhysicalServer"
	};
	var i, len = loginInfo.length;
	for(i = 0; i < len; i++){
		if(loginInfo[i].host === locationHost){
			Config = Object.assign(Config, loginInfo[i]);
			break;
		}
	}
	
    var messageBlock = $("<div style='position: fixed;left: 50%; top: 50%; width: 500px; height: 500px;transform: translate(-50%, -50%); background: #eee;color: #333;box-shadow: 2px 2px 5px #999; overflow-y: auto; z-index: 999999999;'></div>");

    var insertMessageBlock = function() {
        $("body").append(messageBlock);
    };

    var appendMessage = function(msg, style) {
        var nowDate=new Date();
        var h = nowDate.getHours();
        var m = nowDate.getMinutes();
        var s = nowDate.getSeconds();
        var messageParagraph = $("<p>");
        if(style){
        	messageParagraph.css(style);
        }
        messageParagraph.text(h + ':' + m + ':' + s + ' ' + msg);
        messageBlock.prepend(messageParagraph);
    };

    var checkLogin = function() {
        return 0 === $(".loginforminput").length;
    };

    var isLoginSucceed = function(restr){
    	return (restr.indexOf("Welcome") !== -1) || (restr.indexOf("Log In Successful") !== -1)
    };

    var tryLogin = function(Config) {
        appendMessage("login...");
        $.post("/unisso/validateUser.action", {
			"userpasswordcredentials.username": Config.username,
			"userpasswordcredentials.password": Config.password,
			__checkbox_warnCheck: true,
			Submit: Config.login_type,
        }, function(result) {
        	if(isLoginSucceed(result)){
	            appendMessage("Succeed.", {color: "lightgreen"});
	            appendMessage("准备跳转到系统资源……", {color: "lightgreen"});
	            window.location.href = Config.redirect;
        	}else{
            	appendMessage("Login failed! Please input verification Code by yourself!", {color: "red"});
        	}
        }).fail(function() {
            appendMessage("Error...", {color: "red"});
            alert("Error...");
        });
    };

    var doLogin = function(Config) {
		if (checkLogin()) {
			return;
		}
        insertMessageBlock();
        appendMessage("Begin login process...");
        tryLogin(Config);
    };
	
	var judgeUrl = function(){
		var curUrl = window.location.href;
		var timeout = locationHost + "/unisso/login.action?sessionFlag=timeout";
		var loginIndex = locationHost + "/unisso/login.action";
		var verify = locationHost + "/plat/licapp/v1/themes/default";
		var postVerfiy = locationHost + "/adminhomewebsite/index.html";

		if (curUrl.indexOf(timeout) > 0)//超时跳转到登陆
		{
			window.location.href = locationOrigin + "/unisso/login.action";
		}else if (curUrl.indexOf(loginIndex) > 0) {
			doLogin(Config);

		}else if (curUrl.indexOf(verify) > 0)//登陆之后需要验证
		{
			window.location.href = locationOrigin + "/plat/licapp/v1/licensedirectlogin?service=/unisess/v1/auth?service=/";	
		}else if (curUrl.indexOf(postVerfiy) > 0)//验证之后跳转的是主页，并不是我们想要的展示页
		{
			window.location.href = Config.redirect;	
		}
	}

    judgeUrl();
})();
