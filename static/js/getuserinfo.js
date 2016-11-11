//初始化用户信息
var logUser = {
	nickname: null,
	userUUID: null,
	headimgurl: null,
	mygold: null,
}
//对局者信息
var playUser = {
		  playA : null,
		  playB : null,
		};
var tencent_cloud = {
		sdkAppID: null,
		accountType: null,
		appIdAt3rd: null,
		identifier: null,
		userSig: null,

	}
	//获取当前url并对url并返回指定name参数，若name不存在则返回null
function GetQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return unescape(r[2]);
	return null;
}

function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";
 
    var uuid = s.join("");
    return uuid;
}
//获取code
var code = GetQueryString("code");
var machineUUID = "2"+uuid();
//发送type给后台，如果type为0后台走网页获取权限接口
var type = "0";
//若获取到code，则将code发送后台，后台使用code换取token再使用token换取userinfo后返回
if(code != null && code.toString().length > 1) {
	console.log("code" + code);

	$.ajax({
		type: "get",
		url: "http://wangpeng.s1.natapp.cc/WeChat/login",
		async: true,
		data: {
			code: code,
			machineUUID: machineUUID,
			type: type,
		},
		success: function(data) {
			var data = data;
			//返回用户信息
			console.log("登录成功");
			//登录用户的信息
			logUser = {
				nickname: data.userName,
				userUUID: data.userUUID,
				headimgurl: data.headerImgUrl,
				mygold: data.gold,

			}
			tencent_cloud = {
				sdkAppID: data.sdkAppId,
				accountType: data.user.accountType,
				appIdAt3rd: data.user.appIdAt3rd,
				identifier: data.user.identifier,
				userSig: data.userSig,
			}
			gettencent_info(tencent_cloud);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(XMLHttpRequest.status);
			alert(XMLHttpRequest.readyState);
			alert(textStatus);
			$("#confirm").hide();
		},
	});
	
	$.ajax({
	    type: "post",
	    url : "http://wangpeng.s1.natapp.cc/gameVideoRoom/create",
	    async: true,
	    data: {
	      machineId: "7777777",
	      user : "developadmin",
	    },
	    success : function (data) {
	    	var list =data.resultList;
	    	console.log("收到玩家数" + data);
	      playUser = {
	        playA : list[0].titlea,
	        playB : list[0].titleb,
	       // playA : "aaaaa",
	       // playB : "bbbbbb",
	      }
	      $("#info_nameA").text(playUser.playA);
	      $("#info_nameB").text(playUser.playB);

	      $("#grade_name_A").text(playUser.playA);
	      $("#grade_name_B").text(playUser.playB);

	      $("#content_nameA").text(playUser.playA);
	      $("#content_nameB").text(playUser.playB);

	      

	    },
	    error: function(XMLHttpRequest, textStatus, errorThrown) {
	      alert(XMLHttpRequest.status);
	      alert(XMLHttpRequest.readyState);
	      alert(textStatus);
	      $("#confirm").hide();
	    },
	  })
	
} else {
	alert("登录失败，请退出页面重新登录");
}