$(function () {

    //创建A玩家的用户信息
    var playAInfoObject = {
        headurl: null,
        name: null,
        totalGames: null,
        lastTenGame: null,
    }
    var playBInfoObject = {
        headurl: null,
        name: null,
        totalGames: null,
        lastTenGame: null,
    }

    //ajax加载访问后台，缓存A玩家和B玩家的信息
    $.ajax({
        type: "get",
        url: "#",
        async: true,
        success: function (data) {
            playAInfoObject = {
                headurl: "img/aa.png",
                name: "Armstrong",
                totalGames: "42",
                lastTenGame: [true, false, true, true, true, true, false, true, true, false],
            }
            playBInfoObject = {
                headurl: "img/bb.png",
                name: "Brmstrong",
                totalGames: "40",
                lastTenGame: [true, true, true, false, true, true, false, false, true, true],
            }
            //获取到玩家信息后调用
            main(playAInfoObject, playBInfoObject);
        }
    });

    //改变上方玩家双方支持百分比
    function changePercentage() {
        var ticketNumPlaysA = $("#playAgolds").text();
        var ticketNumPlaysB = $("#playBgolds").text();

        var ticketTotal = parseInt(ticketNumPlaysA) + parseInt(ticketNumPlaysB);
        var percentage = (ticketNumPlaysA / ticketTotal);

        var scoreAWidth = (window.base / 20 * 702 * percentage + 5) + "px";
        var scoreBWidth = (window.base / 20 * 702 * (1 - percentage) + 5) + "px";
        $(".guess_line_one").css({
            width: scoreAWidth,
        });
        $(".guess_line_two").css({
            width: scoreBWidth,
        });
        console.log("scoreAWidth, scoreBWidth" + scoreAWidth, scoreBWidth);
        $(".guess_line_one span").text(parseInt(percentage * 100) + "%")
        $(".guess_line_two span").text(parseInt((1 - percentage) * 100) + "%")
    }

    //	changePercentage();

    //
    function main(playAInfoObject, playBInfoObject) {

        //获取玩家A、B信息
        var playAInfoObject = playAInfoObject;
        var playBInfoObject = playBInfoObject;

        //定义押的金币数以及获取的金币数
        var betgoldNum = 0;
        var returngoldNum = 0;

        //选择押A还是押B 选择A则bolA为true，默认为都不选
        var bolA = false;
        var bolB = false;

        //替换页面头像
        $("#info_imgA").css({
            'background-image': 'url(' + playAInfoObject.headurl + ')',
        });
        $("#info_imgB").css({
            'background-image': 'url(' + playBInfoObject.headurl + ')',
        });
        $("#grade_imgA").css({
            'background-image': 'url(' + playAInfoObject.headurl + ')',
        });
        $("#grade_imgB").css({
            'background-image': 'url(' + playBInfoObject.headurl + ')',
        });
        $("#content_imgA").css({
            'background-image': 'url(' + playAInfoObject.headurl + ')',
        });
        $("#content_imgB").css({
            'background-image': 'url(' + playBInfoObject.headurl + ')',
        });

        //替换用户名
        $("#info_nameA").text(playAInfoObject.name);
        $("#info_nameB").text(playBInfoObject.name);

        $("#grade_name_A").text(playAInfoObject.name);
        $("#grade_name_B").text(playBInfoObject.name);

        $("#content_nameA").text(playAInfoObject.name);
        $("#content_nameB").text(playBInfoObject.name);

        //生成后十场对战数据
        for (var i = 0; i < 5; i++) {
            if (playAInfoObject.lastTenGame[i]) {
                var li = $("<li class='win'>胜</li>");
            } else {
                var li = $("<li class='loss'>负</li>");
            }
            $(".playA_lastTen ul:nth-of-type(1)").append(li);
        }
        for (var i = 5; i < 10; i++) {
            if (playAInfoObject.lastTenGame[i]) {
                var li = $("<li class='win'>胜</li>");
            } else {
                var li = $("<li class='loss'>负</li>");
            }
            $(".playA_lastTen ul:nth-of-type(2)").append(li);
        }
        for (var i = 0; i < 5; i++) {
            if (playBInfoObject.lastTenGame[i]) {
                var li = $("<li class='win'>胜</li>");
            } else {
                var li = $("<li class='loss'>负</li>");
            }
            $(".playB_lastTen ul:nth-of-type(1)").append(li);
        }
        for (var i = 5; i < 10; i++) {
            if (playBInfoObject.lastTenGame[i]) {
                var li = $("<li class='win'>胜</li>");
            } else {
                var li = $("<li class='loss'>负</li>");
            }
            $(".playB_lastTen ul:nth-of-type(2)").append(li);
        }

        //点击压分详情页面切换
        $("#title_one").on("touchstart", function () {

            betgoldNum = 0;
            returngoldNum = 0;
            bolA = false;
            bolB = false;
            $("#guess_info_page").css({
                display: "block",
            });

            $("#guess_grade").css({
                display: "none",
            });

            $("#play_info_content").css({
                display: "none",
            });
            $("#recharge_content").css({
                display: "none",
            });
            $("#title_one").css({
                color: '#FF5569',
            });
            $("#title_two").css({
                color: 'black',
            });
            $("#title_three").css({
                color: 'black',
            });
            $("#title_line").css({
                left: '0',
            });
        });

        //将用户金币数量设置到dom中
        $("#mygoldNum").text(logUser.mygold);
        //点击押分页面切换
        $("#title_two").on("touchstart", function () {
            betgoldNum = 0;
            returngoldNum = 0;
            bolA = false;
            bolB = false;
            $("#guess_info_page").css({
                display: "none",
            });
            $("#guess_grade").css({
                display: "block",
            });
            $("#play_info_content").css({
                display: "none",
            });
            $("#recharge_content").css({
                display: "none",
            });
            var left = 250 * window.base / 20;
            $("#title_one").css({
                color: 'black',
            });
            $("#title_two").css({
                color: '#FF5569',
            });
            $("#title_three").css({
                color: 'black',
            });
            $("#title_line").css({
                left: left,
            });

            var showbetGold = betgoldNum.toLocaleString();
            var showgetMoney = returngoldNum.toLocaleString();

            $("#betMoney span").text(showbetGold);
            $("#getMoney span").text(showgetMoney);
            $("#choseA").attr("class", "choseA");
            $("#choseB").attr("class", "choseB");

            $("#mygoldNum").text(logUser.mygold);

        });
        //点击对局者信息页面切换
        $("#title_three").on("touchstart", function () {
            betgoldNum = 0;
            returngoldNum = 0;
            bolA = false;
            bolB = false;
            $("#guess_info_page").css({
                display: "none",
            });
            $("#guess_grade").css({
                display: "none",
            });
            $("#play_info_content").css({
                display: "block",
            });
            $("#recharge_content").css({
                display: "none",
            });
            var left = 500 * window.base / 20;
            $("#title_one").css({
                color: 'black',
            });
            $("#title_two").css({
                color: 'black',
            });
            $("#title_three").css({
                color: '#FF5569',
            });
            $("#title_line").css({
                left: left,
            });

        });

        //点击获取金币切换到购买界面
        $("#mygold button").on("touchstart", function () {
            $("#guess_info_page").css({
                display: "none",
            });
            $("#guess_grade").css({
                display: "none",
            });
            $("#play_info_content").css({
                display: "none",
            });
            $("#recharge_content").css({
                display: "block",
            });
            $("#title").hide();
        })

        //点击购买界面中购买返回
        $(".item").on("touchstart", function () {
            $("#confirm_shop").show();
        });

        //获取手机IP地址
        function getLocalIPAddress() {
            var obj = null;
            var rslt = "127.0.0.1";
            try {
                obj = new ActiveXObject("rcbdyctl.Setting");
                if (!isNull(obj.GetIPAddress)) {
                    rslt = obj.GetIPAddress;
                }
                obj = null;
            }
            catch (e) {
                //异常发生
            }

            return rslt;
        }

        //点击充值确认购买界面确认按钮
        $("#confirmBtn_shop button:nth-of-type(2)").on("touchstart", function () {
            var rand_str = new Date().getTime();
            $.ajax({
                type: "post",
                url: "http://wangpeng.s1.natapp.cc/WeChat/Pay/betpay",
                data: {
                    body: "头像",
                    orderId: rand_str,
                    totalFee: "1",
                    createIp: "10.128.213.150",
                    createBy: logUser.userUUID,
                    payType: "0",
                },
                async: true,
                success: function (data) {
                    // alert(data.toString());
                    // alert(1111);
                    var appid = null;
                    var nonceStr = null;
                    var paySign = null;
                    //var xml_prm = data.payDetailPrm;
                    var xml_prm = data.returnDetail;
                    // alert(xml_prm);
                    var xml_prm_obj = $.parseXML(xml_prm);
                    $(xml_prm_obj).find('xml').each(function () {
                        appid = $(this).children('appid').text();
                        nonceStr = $(this).children('nonce_str').text();
                    });

                    // alert("appid" + appid);
                    // alert( "nonceStr" + nonceStr);
                    // alert("data.timeStamp" + data.timeStamp);
                    // alert("data.paySign" +　data.paySign);
                    // alert("data.prepayId" + data.prepayId);
                    function onBridgeReady() {
                        WeixinJSBridge.invoke(
                            'getBrandWCPayRequest', {
                                "appId": appid,     //公众号名称，由商户传入
                                "timeStamp": data.timeStamp,         //时间戳，自1970年以来的秒数
                                "nonceStr": nonceStr, //随机串
                                "package": "prepay_id=" + data.prepayId,
                                "signType": "MD5",         //微信签名方式：
                                "paySign": data.paySign //微信签名
                            },
                            function (res) {
                                if(res.err_msg == "get_brand_wcpay_request：ok" ) {
                                    alert("充值成功");
                                }else{
                                    alert(res.err_msg);
                                }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
                            }
                        );
                    }

                    if (typeof WeixinJSBridge == "undefined") {
                        if (document.addEventListener) {
                            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                        } else if (document.attachEvent) {
                            document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                        }
                    } else {
                        onBridgeReady();
                    }


                    $("#confirm_shop").css({
                        display: "none",
                    });

                    alert("购买成功");
                    $("#recharge_content").css({
                        display: "none",
                    });
                    $("#title").show();

                    $("#guess_grade").css({
                        display: "block",
                    });
                    var left = 250 * window.base / 20;
                    $("#title_one").css({
                        color: 'black',
                    });
                    $("#title_two").css({
                        color: '#FF5569',
                    });
                    $("#title_three").css({
                        color: 'black',
                    });
                    $("#title_line").css({
                        left: left,
                    });
                }
            });
        });
        //点击充值确认购买界面取消按钮
        $("#confirmBtn_shop button:nth-of-type(1)").on("touchstart", function () {
            $("#confirm_shop").hide();
        });
        //点击充值页面右上方的X
        $("#recharge_return").on("touchstart", function () {
            $("#title").show();
            $("#guess_info_page").css({
                display: "none",
            });
            $("#guess_grade").css({
                display: "block",
            });
            $("#play_info_content").css({
                display: "none",
            });
            $("#recharge_content").css({
                display: "none",
            });
            var left = 250 * window.base / 20;
            $("#title_one").css({
                color: 'black',
            });
            $("#title_two").css({
                color: '#FF5569',
            });
            $("#title_three").css({
                color: 'black',
            });
            $("#title_line").css({
                left: left,
            });
        })

        //点击马上压分
        $("#guess_now").on("touchstart", function () {
            betgoldNum = 0;
            returngoldNum = 0;
            $("#guess_info_page").css({
                display: "none",
            });
            $("#guess_grade").css({
                display: "block",
            });
            $("#play_info_content").css({
                display: "none",
            });
            $("#recharge_content").css({
                display: "none",
            });
            var left = 250 * window.base / 20;
            $("#title_one").css({
                color: 'black',
            });
            $("#title_two").css({
                color: '#FF5569',
            });
            $("#title_three").css({
                color: 'black',
            });
            $("#title_line").css({
                left: left,
            });
        });

        $("#chip").on("touchstart", ".chipEvery", function (ev) {
            var goldStr = $(this).find("p:nth-of-type(2)").text();
            var strTemp = goldStr.split(",");
            var goldNum = strTemp.join("");

            //获取当前可计算(去除，)betgoldNum
            var betgoldNumTemp = String(betgoldNum).split(",").join("");

            //计算当前已经押注金币和即将押注金币之和
            var betgoldNumTitle = Number(betgoldNumTemp) + Number(goldNum);

            //获取我的金币数
            var mygold = Number($("#mygoldNum").text());

            //判断当前即将押金币纸盒是否大于我的金币数
            if (betgoldNumTitle <= mygold) {
                console.log(1);
                betgoldNum += Number(goldNum);
                if (bolA) {
                    returngoldNum = parseInt(betgoldNum) * parseInt(areturnrate);
                } else if (bolB) {
                    returngoldNum = parseInt(betgoldNum) * parseInt(breturnrate);
                } else {
                    returngoldNum = 0;
                }


                // console.log("areturnrate" +　areturnrate);

                var showbetGold = betgoldNum.toLocaleString();
                var showgetMoney = returngoldNum.toLocaleString();

                $("#betMoney span").text(showbetGold);
                $("#getMoney span").text(showgetMoney);
            } else {
                alert("金币数不足，请购买金币");
            }

        });

        //押上自己所有金币
        $("#all").on("touchstart", function (e) {
            e.preventDefault();

            var mygold = $("#mygoldNum").text();
            var thousandGold = parseInt(mygold / 1000) * 1000;


            if (thousandGold >= 5000000) {
                alert("金币总额大于5000000不能全压或押一半");
            } else {
                betgoldNum = thousandGold;
                if (bolA) {
                    returngoldNum = parseInt(betgoldNum) * parseInt(areturnrate);
                } else if (bolB) {
                    returngoldNum = parseInt(betgoldNum) * parseInt(breturnrate);
                } else {
                    returngoldNum = 0;
                }
                //设置押金币和获取金币数
                betgoldNum = thousandGold;
                returngoldNum = returngoldNum;
                var showbetGold = thousandGold.toLocaleString();
                var showgetMoney = returngoldNum.toLocaleString();

                $("#betMoney span").text(showbetGold);
                $("#getMoney span").text(showgetMoney);
            }
        });
        //押上自己一半金币
        $("#half").on("touchstart", function (e) {
            e.preventDefault();
            var mygold = $("#mygoldNum").text() / 2;
            var thousandGold = parseInt(mygold / 1000) * 1000;

            if (thousandGold >= 5000000) {
                alert("金币总额大于5000000不能全压或押一半");
            } else {
                betgoldNum = thousandGold;
                if (bolA) {
                    returngoldNum = parseInt(betgoldNum) * parseInt(areturnrate);
                } else if (bolB) {
                    returngoldNum = parseInt(betgoldNum) * parseInt(breturnrate);
                } else {
                    returngoldNum = 0;
                }
                //设置押金币和获取金币数
                betgoldNum = thousandGold;
                returngoldNum = returngoldNum;
                var showbetGold = thousandGold.toLocaleString();
                var showgetMoney = returngoldNum.toLocaleString();
                $("#betMoney span").text(showbetGold);
                $("#getMoney span").text(showgetMoney);
            }
        });
        //点击押分页面确认按钮提交压分信息
        $("#gold_return button:nth-of-type(2)").on("touchstart", function (e) {
            e.stopPropagation();
            if (betgoldNum > 0) {
                if (bolA || bolB) {
                    $("#confirm").show();
                    $("#confirmMoney").text(betgoldNum);
                    if (bolA) {
                        $("#confirmPlay").text("Aname");
                    } else if (bolB) {
                        $("#confirmPlay").text("Bname");
                    }
                } else {
                    alert("请支持一位选手哦");
                }
            } else if (betgoldNum == 0) {
                alert("请押金币");
            }
        });
        //点击押分页面取消按钮金币归零
        $("#gold_return button:nth-of-type(1)").on("touchstart", function () {

            betgoldNum = 0;
            returngoldNum = 0;
            $("#betMoney span").text(0);
            $("#getMoney span").text(0);
        })

        //确认点击取消后确认界面消失
        $("#confirmBtn button:nth-of-type(1)").on("touchstart", function () {
            $("#confirm").hide();

        });
        //确认界面点击确认按钮发送数据
        $("#confirmBtn button:nth-of-type(2)").on("touchstart", function () {

            //调用腾讯云发送消息
            //			var getInfo = getInfo();
            //onSendMsg();

            // console.log("aaaaaa");

            var judgeAorB = null;
            if (bolA) {
                judgeAorB = playUser.playA;
//        judgeAorB = "A";
            } else {
                judgeAorB = playUser.playB;
//        judgeAorB = "B";
            }
            var data = {
                loguser: logUser.nickname,
                AorB: judgeAorB,
                gold: betgoldNum,
                openID: logUser.openid
            }
            //			console.log("数据data" + 　data);
            console.log("数据data" + JSON.stringify(data));
            $.ajax({
                type: "post",
                url: "http://wangpeng.s1.natapp.cc/gameVideoRoom/bet",
                async: true,
                data: {
                    aorb: judgeAorB,
                    money: betgoldNum,
                    uuid: logUser.userUUID,
                    groupId: "7777777",
                },
                success: function (data) {

                    var dataJson = JSON.parse(data);

                    if (dataJson.betmessage == "已经押注") {
                        alert("您 已经押注，不能重复押注");
                        $("#confirm").hide();
                    } else if (dataJson.betmessage == "押注成功") {
                        var gold = dataJson.gold;
                        logUser.mygold = gold;
                        $("#mygoldNum").text(gold);
                        alert("押分成功");
                        $("#confirm").hide();
                        betgoldNum = 0;
                        returngoldNum = 0;
                        var showbetGold = betgoldNum.toLocaleString();
                        var showgetMoney = returngoldNum.toLocaleString();

                        $("#betMoney span").text(betgoldNum);
                        $("#getMoney span").text(returngoldNum);
                    }

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.status);
                    alert(XMLHttpRequest.readyState);
                    alert(textStatus);
                    $("#confirm").hide();
                },
            });

        });

        //选择压分是压A还是B 点击A
        $("#guessplayA_head").on("touchstart", function () {

            if (bolB) {
                $("#choseB").attr("class", "choseB");
                bolB = false;
            }

            if (!bolA) {
                $("#choseA").attr("class", "choseAPic");
                bolA = true;
            } else {
                $("#choseA").attr("class", "choseA");
                bolA = false;
            }

            console.log(bolA, bolB);

            if (bolA) {
                //获取当前可计算(去除，)betgoldNum
                var betgoldNumTemp = String(betgoldNum).split(",").join("");
                returngoldNum = parseInt(betgoldNumTemp) * parseInt(areturnrate);

                var showgetMoney = returngoldNum.toLocaleString();

                $("#getMoney span").text(showgetMoney);

            } else {
                $("#getMoney span").text(0);
            }
        });

        //选择压分是压A还是B 点击B
        $("#guessplayB_head").on("touchstart", function () {
            if (bolA) {
                $("#choseA").attr("class", "choseA");
                bolA = false;
            }
            if (!bolB) {
                $("#choseB").attr("class", "choseBPic");
                bolB = true;
            } else {
                $("#choseB").attr("class", "choseB");
                bolB = false;
            }
            console.log(bolA, bolB);
            if (bolB) {
                //获取当前可计算(去除，)betgoldNum
                var betgoldNumTemp = String(betgoldNum).split(",").join("");
                returngoldNum = parseInt(betgoldNumTemp) * parseInt(breturnrate);

                var showgetMoney = returngoldNum.toLocaleString();

                $("#getMoney span").text(showgetMoney);

            } else {
                $("#getMoney span").text(0);
            }
        })
    }

})
