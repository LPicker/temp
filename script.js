(function () {
	var timeoutNum = 0;
	var location = window.location;
	var locationHost = location.host;
	var locationPort = location.port;
	var locationOrigin = "https://" + locationHost;
	if(!locationPort || locationPort !== "31943"){
		return;
	}
	var Config = {
		login_type: "Login",
		delay: 500,
		redirect: locationOrigin + "/csmresmgrwebsite/res/SYS_PhysicalServer"
	};

	var messageBlock = $("<div class='msg-container'></div>");

	var insertMessageBlock = function () {
		$("body").append(messageBlock);
	};

	var appendMessage = function (msg, style) {
		var nowDate = new Date();
		var h = nowDate.getHours();
		var m = nowDate.getMinutes();
		var s = nowDate.getSeconds();
		var messageParagraph = $("<p>");
		if (style) {
			messageParagraph.css(style);
		}
		messageParagraph.text(h + ':' + m + ':' + s + ' ' + msg);
		if($(".msg-container").length === 0){
			insertMessageBlock();
		}
		messageBlock.prepend(messageParagraph);
	};

	var checkLogin = function () {
		return 0 === $(".loginforminput").length;
	};

	var loginResult = function (restr) {
		var loginResult = {isLogin: false};
		const errTipArr = ["登录失败，请输入正确的用户名或密码。", '<label class="btn_submit_a icon_error">验证码输入有误。</label>'];
		
		if(restr.indexOf("Log In Successful") !== -1){
			loginResult.isLogin = true;
			loginResult.result = "Log In Successful";
		}else{
			for(let tip of errTipArr){
				if (restr.indexOf(tip) !== -1){
					loginResult.isLogin = false;
					loginResult.result = tip;
					break;
				}
			}
		}
		return loginResult;
	};

	var tryLogin = function (Config) {
		appendMessage("login...");
		const $ssoUser = $("#ssoUser");
		const $value = $("#value");
		const loginDada = {
			"userpasswordcredentials.username": Config.username,
			"userpasswordcredentials.password": Config.password,
		};
		$.post("/unisso/validateUser.action", Object.assign({
			__checkbox_warnCheck: true,
			Submit: Config.login_type,
		}, loginDada), function (result) {
			var loginRes = loginResult(result);
			if (loginRes.isLogin) {
				appendMessage(loginRes.result, { color: "lightgreen" });
				// appendMessage("准备跳转到系统资源……", { color: "lightgreen" });
				// window.location.href = Config.redirect;
				appendMessage("准备跳转到主页……", { color: "lightgreen" });
				window.location.href = locationOrigin;
			} else {
				if (loginRes.result) {
					appendMessage(loginRes.result, { color: "red" });
				}
			}
		}).fail(function (err) {
			appendMessage("发生错误，刷新重试...", { color: "red" });
			console.log("%cError...", "color: red", err);
			appendMessage("尝试跳转到主页……", { color: "lightgreen" });
			window.location.href = locationOrigin;
		});
	};

	var doLogin = function (Config) {
		if (checkLogin()) {
			return;
		}
		appendMessage("Begin login process...");
		tryLogin(Config);
	};

	var judgeUrl = function () {
		var curUrl = window.location.href;
		var timeout = locationHost + "/unisso/login.action?sessionFlag=timeout";
		var loginIndex = locationHost + "/unisso/login.action";
		var verify = locationHost + "/plat/licapp/v1/themes/default";
		var postVerfiy = locationHost + "/adminhomewebsite/index.html";
		var targetUrl = locationHost + "/csmresmgrwebsite/";

		if (curUrl.indexOf(timeout) > 0) {	//超时跳转到登陆
			window.location.href = locationOrigin + "/unisso/login.action";
		} else if (curUrl.indexOf(loginIndex) > 0) {
			doLogin(Config);
		} else if (curUrl.indexOf(verify) > 0) {	//登陆之后需要验证
			window.location.href = locationOrigin + "/plat/licapp/v1/licensedirectlogin?service=/unisess/v1/auth?service=/";
		} else if (curUrl.indexOf(postVerfiy) > 0) {	//验证之后跳转的是主页，并不是我们想要的展示页
			window.location.href = Config.redirect;
		}
	};
	var loadSetting = function(envInfo){
		if (!envInfo) {
			appendMessage("请先配置环境登录信息", { color: "red" });
			return;
		}
		Object.assign(Config, envInfo);
	};

	chrome.storage.local.get(locationHost, function(result){
		loadSetting(result[locationHost]);
		if(Config.username){
			judgeUrl();
		}
	});
})();



	window.localStorage["LPickerEnvList"] = JSON.stringify(loginInfo);

	const envMap = {};
	loginInfo.forEach(env => {
		Object.assign(envMap, {[env.host]: env});
	});
	
	chrome.storage.local.set(envMap);



	chrome.storage.local.get(locationHost, function(result){
		loadSetting(result[locationHost]);
		if(Config.username){
			judgeUrl();
		}
	});







