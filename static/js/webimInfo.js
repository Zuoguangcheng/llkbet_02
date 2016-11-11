var accountMode = 1;
var sdkAppID = 1400014977;
var accountType = 7699;

var avChatRoomId = "90909090";

var selType = webim.SESSION_TYPE.GROUP;
var selToID = avChatRoomId; //当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
var selSess = null; //当前聊天会话

var loginInfo = {
	'sdkAppID': sdkAppID,
	'appIDAt3rd': sdkAppID,
	'accountType': accountType,
	'identifier': "U0C24QD605", //当前用户ID,必须是否字符串类型，选填
	'identifierNick': null, //当前用户昵称，选填
	'userSig': 'eJxNkNFOgzAUht*Fa2NaoBS8I1AFRXTZlig3pIFS6rbSQYGp8d3FhiWey*-Lyf*f823tsu0tVUrUJdWl09fWnQWsG4PZRYmelbTRrF*wjQIbmFn9xPpBdPJPAYig7fyXomZSi0aY1T2IbHcTewCtdhB8wc-kPUo3ERqll*cP88jTvDoVbSjaibc*d1qSuITSp-3wMr2mXsF52oaP8j505*ItPDT*zI8kkmd1iSafBggmXfbBSXKOs*Ar3h6vYfWhNCcukdBdKkI3wHiVWpyY4Rj7GAfo2pBWVTdKXepPxcxPfn4BXr1ZOg__', //当前用户身份凭证
};
var listeners = {
	"onConnNotify": onConnNotify, //监听连接状态回调变化事件,必填
	"onMsgNotify": onMsgNotify, //监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
	"onGroupSystemNotifys": onGroupSystemNotifys, //监听（多终端同步）群系统消息事件，必填
};
//监听连接状态回调变化事件
var onConnNotify = function(resp) {
	switch(resp.ErrorCode) {
		case webim.CONNECTION_STATUS.ON:
			//webim.Log.warn('连接状态正常...');
			break;
		case webim.CONNECTION_STATUS.OFF:
			webim.Log.warn('连接已断开，无法收到新消息，请检查下你的网络是否正常');
			break;
		default:
			webim.Log.error('未知连接状态,status=' + resp.ErrorCode);
			break;
	}
};
var isAccessFormalEnv = true;
var isLogOn = true;
var options = {
	'isAccessFormalEnv': isAccessFormalEnv, //是否访问正式环境，默认访问正式，选填
	'isLogOn': isLogOn //是否开启控制台打印日志,默认开启，选填
};
sdkLogin();