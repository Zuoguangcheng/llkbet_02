//定义repalceAll
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, "gm"), s2);
};

//	console.log(obj);
//a和b的收益率
var areturnrate = 1;
var breturnrate = 2;

var onConnNotify = function (resp) {
    switch (resp.ErrorCode) {
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


function gettencent_info(obj) {
    obj = obj;
    accountMode = 1;
    sdkAppID = obj.sdkAppID;
    accountType = obj.accountType;

    avChatRoomId = "7777777";

    selType = webim.SESSION_TYPE.GROUP;
    selToID = avChatRoomId; //当前选中聊天id（当聊天类型为私聊时，该值为好友帐号，否则为群号）
    selSess = null; //当前聊天会话

    loginInfo = {
        'sdkAppID': sdkAppID,
        'appIDAt3rd': sdkAppID,
        'accountType': accountType,
        'identifier': obj.identifier, //当前用户ID,必须是否字符串类型，选填
        'identifierNick': null, //当前用户昵称，选填
        'userSig': obj.userSig, //当前用户身份凭证
    };
    listeners = {
        "onConnNotify": onConnNotify, //监听连接状态回调变化事件,必填
        "onMsgNotify": onMsgNotify, //监听新消息(私聊，普通群(非直播聊天室)消息，全员推送消息)事件，必填
        "onGroupSystemNotifys": onGroupSystemNotifys, //监听（多终端同步）群系统消息事件，必填
    };
    //监听连接状态回调变化事件

    isAccessFormalEnv = true;
    isLogOn = true;
    options = {
        'isAccessFormalEnv': isAccessFormalEnv, //是否访问正式环境，默认访问正式，选填
        'isLogOn': isLogOn //是否开启控制台打印日志,默认开启，选填
    };
    sdkLogin();
}

function onMsgNotify(newMsgList) {
    //console.warn(newMsgList);
    var sess, newMsg;
    //获取所有聊天会话
    var sessMap = webim.MsgStore.sessMap();

    for (var j in newMsgList) { //遍历新消息
        newMsg = newMsgList[j];

        if (newMsg.getSession().id() == selToID) { //为当前聊天对象的消息
            selSess = newMsg.getSession();
            //在聊天窗体中新增一条消息
            //console.warn(newMsg);
            addMsg(newMsg);
        }
    }
    //消息已读上报，以及设置会话自动已读标记
    webim.setAutoRead(selSess, true, true);

    //  for (var i in sessMap) {
    //      console.log(i);
    //      if (selToID != sess.id()) {//更新其他聊天对象的未读消息数
    //          updateSessDiv(sess.type(), sess.id(), sess.unread());
    //      }
    //  }
}

function addMsg(msg) {
    var isSelfSend, fromAccount, fromAccountNick, sessType, subType;

    fromAccount = msg.getFromAccount();
    if (!fromAccount) {
        fromAccount = '';
    }
    fromAccountNick = msg.getFromAccountNick();
    if (!fromAccountNick) {
        fromAccountNick = fromAccount;
    }
    isSelfSend = msg.getIsSend(); //消息是否为自己发的

    //接收消息 变量 receiveMsg
    var receiveMsg = null;
    //	var onemsg = document.createElement("div");
    //	onemsg.className = "onemsg";
    //	var msghead = document.createElement("p");
    //	var msgbody = document.createElement("p");
    //	var msgPre = document.createElement("pre");
    //	msghead.className = "msghead";
    //	msgbody.className = "msgbody";

    //如果是发给自己的消息
    if (!isSelfSend)
    //		msghead.style.color = "blue";
    //昵称  消息时间
    //	msghead.innerHTML = fromAccountNick + "&nbsp;&nbsp;" + webim.Tool.formatTimeStamp(msg.getTime());

    //解析消息
    //获取会话类型，目前只支持群聊
    //webim.SESSION_TYPE.GROUP-群聊，
    //webim.SESSION_TYPE.C2C-私聊，
        sessType = msg.getSession().type();
    //获取消息子类型
    //会话类型为群聊时，子类型为：webim.GROUP_MSG_SUB_TYPE
    //会话类型为私聊时，子类型为：webim.C2C_MSG_SUB_TYPE
    subType = msg.getSubType();

    switch (subType) {

        case webim.GROUP_MSG_SUB_TYPE.COMMON: //群普通消息
            //			msgPre.innerHTML = convertMsgtoHtml(msg);
            receiveMsg = convertMsgtoHtml(msg);
            break;
        case webim.GROUP_MSG_SUB_TYPE.REDPACKET: //群红包消息
            //			msgPre.innerHTML = "[群红包消息]" + convertMsgtoHtml(msg);
            receiveMsg = convertMsgtoHtml(msg);
            break;
        case webim.GROUP_MSG_SUB_TYPE.LOVEMSG: //群点赞消息
            //业务自己可以增加逻辑，比如展示点赞动画效果
            //			msgPre.innerHTML = "[群点赞消息]" + convertMsgtoHtml(msg);
            receiveMsg = convertMsgtoHtml(msg);
            //展示点赞动画
            //showLoveMsgAnimation();
            break;
        case webim.GROUP_MSG_SUB_TYPE.TIP: //群提示消息
            //			msgPre.innerHTML = "[群提示消息]" + convertMsgtoHtml(msg);
            receiveMsg = convertMsgtoHtml(msg);
            break;
    }

    //	msgbody.appendChild(msgPre);

    //	onemsg.appendChild(msghead);
    //	onemsg.appendChild(msgbody);
    //消息列表
    //	var msgflow = document.getElementById("content");
    //	msgflow.appendChild(onemsg);
    //300ms后,等待图片加载完，滚动条自动滚动到底部
    //	setTimeout(function() {
    //		msgflow.scrollTop = msgflow.scrollHeight;
    //	}, 300);

    console.log("收到从腾讯云的消息——————————————" + receiveMsg + "——————————————收到从腾讯云的消息");
//	console.log("typeof(receiveMsg)" + typeof(receiveMsg));

    var json_re = receiveMsg.replaceAll("'", "\"");
    // console.log("json_re" + json_re);
    // console.log("json_re" + json_re);
    var json_receiveMsg = JSON.parse(json_re);
    // alert(json_receiveMsg);
    var type = json_receiveMsg.type;

    if (type) {
        if (type == 1) {
            return;
        } else {
            var two_play_info = {
                amoney: json_receiveMsg.amoney,
                bmoney: json_receiveMsg.bmoney,
                anumber: json_receiveMsg.anumber,
                bnumber: json_receiveMsg.bnumber,
                arate: json_receiveMsg.arate,
                brate: json_receiveMsg.brate,
                areturnrate: json_receiveMsg.areturnrate,
                breturnrate: json_receiveMsg.breturnrate,
            };
            // 赋值A和B的收益率
            areturnrate = two_play_info.areturnrate;
            breturnrate = two_play_info.breturnrate;
            //更新首页信息 通过通讯云收到的消息,进行更新
            $("#playAgolds").text(two_play_info.amoney);
            $("#playBgolds").text(two_play_info.bmoney);
            $("#playApeople").text(two_play_info.anumber);
            $("#playBpeople").text(two_play_info.bnumber);
            $("#playAreturnRate").text(two_play_info.areturnrate);
            $("#playBreturnRate").text(two_play_info.breturnrate);
            $(".guess_line_one span").text(two_play_info.arate);
            $(".guess_line_two span").text(two_play_info.brate);

            //改变支持率的显示条
            var ticketNumPlaysA = $("#playAgolds").text();
            var ticketNumPlaysB = $("#playBgolds").text();

            var ticketTotal = parseInt(ticketNumPlaysA) + parseInt(ticketNumPlaysB);
            var percentage = (ticketNumPlaysA / ticketTotal);

            var scoreAWidth = (window.base / 20 * 700 * percentage) + "px";
            var scoreBWidth = (window.base / 20 * 700 * (1 - percentage)) + "px";
            $(".guess_line_one").css({
                width: scoreAWidth,
            });
            $(".guess_line_two").css({
                width: scoreBWidth,
            });
            console.log("scoreAWidth, scoreBWidth" + scoreAWidth, scoreBWidth);
            var text_one = parseInt(percentage * 100);
            var text_two = 100 - parseInt(percentage * 100);
            // alert(text_one);
            // alert(text_two);
            $(".guess_line_one span").text(text_one + "%");
            $(".guess_line_two span").text(text_two + "%");

        }
    } else {
        var message = json_receiveMsg.message;
        if (message == "结束押分") {
            $("#gold_return button:nth-of-type(3)").css({
                display: "block",
            });
            alert("压分结束");
        } else if (message == "结束比赛") {

            alert("比赛结束");

        } else if (message == "押分无效") {
            alert("押分无效");
            $.ajax({
                type: "get",
                url: "http://wangpeng.s1.natapp.cc/gameVideoRoom/endgame/usergold",
                async: true,
                data: {
                    userUUID: logUser.userUUID,
                },
                success: function (data) {
                    var dataJson = JSON.parse(data);
                    var gold = dataJson.gold;
                    $("#mygoldNum").text(gold);
                }
            });
        } else if (message == "分配完成") {
            alert("分配完成");
            $.ajax({
                type: "get",
                url: "http://wangpeng.s1.natapp.cc/gameVideoRoom/endgame/usergold",
                async: true,
                data: {
                    userUUID: logUser.userUUID,
                },
                success: function (data) {
                    var dataJson = JSON.parse(data);
                    var gold = dataJson.gold;
                    $("#mygoldNum").text(gold);
                }
            });
        } else {
            return 0;
        }
    }


}

function convertMsgtoHtml(msg) {
    var html = "",
        elems, elem, type, content;
    elems = msg.getElems(); //获取消息包含的元素数组
    for (var i in elems) {
        elem = elems[i];
        type = elem.getType(); //获取元素类型
        content = elem.getContent(); //获取元素对象
        switch (type) {
            case webim.MSG_ELEMENT_TYPE.TEXT:
                html += convertTextMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.FACE:
                html += convertFaceMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.IMAGE:
                html += convertImageMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.SOUND:
                html += convertSoundMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.FILE:
                html += convertFileMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.LOCATION: //暂不支持地理位置
                //html += convertLocationMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.CUSTOM:
                html += convertCustomMsgToHtml(content);
                break;
            case webim.MSG_ELEMENT_TYPE.GROUP_TIP:
                html += convertGroupTipMsgToHtml(content);
                break;
            default:
                webim.Log.error('未知消息元素类型: elemType=' + type);
                break;
        }
    }
    return html;
}

//解析文本消息元素
function convertTextMsgToHtml(content) {
    return content.getText();
}

//监听（多终端同步）群系统消息方法，方法都定义在demo_group_notice.js文件中
//注意每个数字代表的含义，比如，
//1表示监听申请加群消息，2表示监听申请加群被同意消息，3表示监听申请加群被拒绝消息等
var onGroupSystemNotifys = {
    "1": {}, //申请加群请求（只有管理员会收到）
    "2": {}, //申请加群被同意（只有申请人能够收到）
    "3": {}, //申请加群被拒绝（只有申请人能够收到）
    "4": {}, //被管理员踢出群(只有被踢者接收到)
    "5": {}, //群被解散(全员接收)
    "6": {}, //创建群(创建者接收)
    "7": {}, //邀请加群(被邀请者接收)
    "8": {}, //主动退群(主动退出者接收)
    "9": {}, //设置管理员(被设置者接收)
    "10": {}, //取消管理员(被取消者接收)
    "11": {}, //群已被回收(全员接收)
    "255": {} //用户自定义通知(默认全员接收,暂不支持)
};

//sdk登录
function sdkLogin() {
    //web sdk 登录
    webim.login(loginInfo, listeners, options,
        function (identifierNick) {
            //identifierNick为登录用户昵称(没有设置时，为帐号)，无登录态时为空
            console.log(identifierNick)
            webim.Log.info('webim登录成功');
            alert("登录成功");
            applyJoinBigGroup(avChatRoomId); //加入大群
            //              hideDiscussForm();//隐藏评论表单
            //              initEmotionUL();//初始化表情
        },
        function (err) {
            alert(err.ErrorInfo);
        }
    ); //
}

//function onSendMsg() {
//	var msg = document.getElementById("txt").value;
//	console.log(msg);
//	webim.sendMsg(msg, function(resp) {
//		console.log(resp);
//		webim.Log.info("发消息成功");
//		$("#send_msg_text").val('');
//
//	}, function(err) {
//		webim.Log.error("发消息失败:" + err.ErrorInfo);
//		alert("发消息失败:" + err.ErrorInfo);
//	});
//}

function onSendMsg() {

    if (!loginInfo.identifier) { //未登录
        if (accountMode == 1) { //托管模式
            //将account_type保存到cookie中,有效期是1天
            webim.Tool.setCookie('accountType', loginInfo.accountType, 3600 * 24);
            //调用tls登录服务
            tlsLogin();
        } else { //独立模式
            alert('请填写帐号和票据');
        }
        return;
    }

    if (!selToID) {
        alert("您还没有进入房间，暂不能聊天");
        $("#txt").val('');
        return;
    }
    //获取消息内容
    //  var msgtosend += "1" + "|{]}|" + $("#txt").val();
    var msgtosend = $("#betMoney span").html();
    //	var msgtosend = ;
    console.log("msgtosend" + msgtosend);
    var msgLen = webim.Tool.getStrBytes(msgtosend);
    // msgtosend += "|{]}|" + "1";

    //测试
    msgtosend = "{'name1':'Mike','sex':'女','age':'29'}";
    if (msgtosend.length < 1) {
        alert("发送的消息不能为空!");
        return;
    }

    var maxLen, errInfo;
    if (selType == webim.SESSION_TYPE.GROUP) {
        maxLen = webim.MSG_MAX_LENGTH.GROUP;
        errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
    } else {
        maxLen = webim.MSG_MAX_LENGTH.C2C;
        errInfo = "消息长度超出限制(最多" + Math.round(maxLen / 3) + "汉字)";
    }
    if (msgLen > maxLen) {
        alert(errInfo);
        return;
    }

    if (!selSess) {
        selSess = new webim.Session(selType, selToID, selToID, 0, Math.round(new Date().getTime() / 1000));
    }
    var isSend = true; //是否为自己发送
    var seq = -1; //消息序列，-1表示sdk自动生成，用于去重
    var random = Math.round(Math.random() * 4294967296); //消息随机数，用于去重
    var msgTime = Math.round(new Date().getTime() / 1000); //消息时间戳
    var subType; //消息子类型
    if (selType == webim.SESSION_TYPE.GROUP) {
        //群消息子类型如下：
        //webim.GROUP_MSG_SUB_TYPE.COMMON-普通消息,
        //webim.GROUP_MSG_SUB_TYPE.LOVEMSG-点赞消息，优先级最低
        //webim.GROUP_MSG_SUB_TYPE.TIP-提示消息(不支持发送，用于区分群消息子类型)，
        //webim.GROUP_MSG_SUB_TYPE.REDPACKET-红包消息，优先级最高
        subType = webim.GROUP_MSG_SUB_TYPE.COMMON;

    } else {
        //C2C消息子类型如下：
        //webim.C2C_MSG_SUB_TYPE.COMMON-普通消息,
        subType = webim.C2C_MSG_SUB_TYPE.COMMON;
    }
    var msg = new webim.Msg(selSess, isSend, seq, random, msgTime, loginInfo.identifier, subType, loginInfo.identifierNick);
    //解析文本和表情
    var expr = /\[[^[\]]{1,3}\]/mg;
    var emotions = msgtosend.match(expr);
    var text_obj, face_obj, tmsg, emotionIndex, emotion, restMsgIndex;
    if (!emotions || emotions.length < 1) {
        text_obj = new webim.Msg.Elem.Text(msgtosend);
        msg.addText(text_obj);
    } else { //有表情

        for (var i = 0; i < emotions.length; i++) {
            tmsg = msgtosend.substring(0, msgtosend.indexOf(emotions[i]));
            if (tmsg) {
                text_obj = new webim.Msg.Elem.Text(tmsg);
                msg.addText(text_obj);
            }
            emotionIndex = webim.EmotionDataIndexs[emotions[i]];
            emotion = webim.Emotions[emotionIndex];
            if (emotion) {
                face_obj = new webim.Msg.Elem.Face(emotionIndex, emotions[i]);
                msg.addFace(face_obj);
            } else {
                text_obj = new webim.Msg.Elem.Text(emotions[i]);
                msg.addText(text_obj);
            }
            restMsgIndex = msgtosend.indexOf(emotions[i]) + emotions[i].length;
            msgtosend = msgtosend.substring(restMsgIndex);
        }
        if (msgtosend) {
            text_obj = new webim.Msg.Elem.Text(msgtosend);
            msg.addText(text_obj);
        }
    }
    webim.sendMsg(msg, function (resp) {
        if (selType == webim.SESSION_TYPE.C2C) { //私聊时，在聊天窗口手动添加一条发的消息，群聊时，长轮询接口会返回自己发的消息
            showMsg(msg);
        }
        webim.Log.info("发消息成功");
        $("#txt").val('');

        //      hideDiscussForm();//隐藏评论表单
        //      showDiscussTool();//显示评论工具栏
        //      hideDiscussEmotion();//隐藏表情
    }, function (err) {
        webim.Log.error("发消息失败:" + err.ErrorInfo);
        alert("发消息失败:" + err.ErrorInfo);
    });
}

//进入大群
function applyJoinBigGroup(groupId) {
    var options = {
        'GroupId': groupId //群id
    };
    webim.applyJoinBigGroup(
        options,
        function (resp) {
            //JoinedSuccess:加入成功; WaitAdminApproval:等待管理员审批
            if (resp.JoinedStatus && resp.JoinedStatus == 'JoinedSuccess') {
                webim.Log.info('进群成功');
                selToID = groupId;
            } else {
                alert('进群失败');
            }
        },
        function (err) {
            if (err.SrcErrorInfo == "already group member") {
                console.log(err.SrcErrorInfo);
            } else {
                // alert(err);
            }
        }
    );
}

//金币更新
function goldUpdate(userName) {
    //userName  用户openid
    var userName = userName;
    $.ajax({
        type: "post",
        url: "",
        async: true,
        data: {
            userName: userName,
        },
        success: function (data) {
            //data  该用户的金币数量
            console.log(data);
            //再此处更新用户的金币显示数量
        }
    });
}

//获取对战用户信息
function getBattleinformation() {

}

//下注竞猜   未调试
function guess(userName, guessId, guessScore) {
    var guessId = guessId;
    var guessScore = guessScore;
    var userName = userName;
    $.ajax({
        type: "post",
        url: "",
        async: true,
        data: {
            userName: userName,
            guessId: guessId,
            guessScore: guessScore
        },
        success: function (data) {
            console.log(data);
        }
    });
}
