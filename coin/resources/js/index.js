let $Global = new Object();
window.onload = function () {
    load('../resources/modules/sharedObject.js').then(function (module) {
        $Global["serverMessage"] = module.serverMessage;
        initializeApplication();
    });
}

function initializeApplication() {
    // logWrite("initializeApplication");
    initializeComponent();
    initializeComponentData();
    initializeBindEvent();
}

function initializeComponent() {
    // logWrite("initializeComponent");
    document.getElementsByClassName("log-toggle_button")[0].addEventListener("click", function (e) {
        let $scriptContainer = document.getElementById("scriptContainer");
        $scriptContainer.classList = ($scriptContainer.classList == "log_close") ? "" : "log_close";
    })
}

function initializeBindEvent() {
    // logWrite("initializeComponent");
    document.getElementById("selectBtn").addEventListener("click", function (e) {
        initAssets();
    });
    document.getElementById("classifyBtn").addEventListener("click", function (e) {
        tradingCoinBot();
    });
    document.getElementById("waitBtn").addEventListener("click", function (e) {
        initOrders();
    });
}

function initializeComponentData() {
    serverSocket.initialize();
    bitSocket.initialize();

    initUidv4();
    initAssets();
}

function initUidv4() {
    let request = new Object();
    getUuidv4(request).then(function (data) {
        $Global["uniqueTicket"] = data;
        logWrite("[initUidv4][getUuidv4] - 범용 고유 식별자 발급 - " + data);
    }).catch(function (err) {
        logWrite("[initUidv4][getUuidv4] - 범용 고유 식별자 발급 오류 발생", err);
    });
}

/* 보유 자산 조회 */
function initAssets() {
    let request = new Object();
    tradeAssets(request).then(function (data) {
        let listData = data;
        let $cryptos = document.getElementById("cryptos");
        /* 로그 작업 */
        logWrite("[initAssets][tradeAssets] - 보유 자산 조회");
        let assetsKrw = 0;                                              // 보유 KRW
        let totalSum = 0;                                               // 총 보유 자산
        let totalPrice = 0;                                             // 총 매수 금액
        let totalBenefitPrice = 0;                                      // 총 평가 금액
        let totalBenefit = 0;                                           // 총 평가 손익
        let totalYield = 0;                                             // 총 평가 수익률
        let balance, avg_buy_price, trade_price, market;
        for (key in listData) {
            market = listData[key], balance = new Number(market.balance), avg_buy_price = new Number(market.avg_buy_price), trade_price = new Number(market.trade_price);
            if (market.market == "KRW-KRW") {
                assetsKrw += balance;
                continue;
            }
            if (!market.isAssetsCoin) continue;

            totalPrice += balance * avg_buy_price;                      // 기존 총 매수 금액 + 해당 코인의 보유 수량 * 평균 단가
            totalBenefitPrice += balance * trade_price                  // 기존 총 평가 금액 + 해당 코인의  보유 수량 * 현재가

            logWrite("[initAssets][tradeAssets] - " +
                "코인 : " + listData[key]["english_name"] +
                ", 시가 : " + listData[key]["opening_price"] +
                ", 저가 : " + listData[key]["low_price"] +
                ", 고가 : " + listData[key]["high_price"] +
                ", 현재가 : " + listData[key]["trade_price"] +
                ", 수익률 : " + CommonUtil.getAssetsYield(listData[key]))
        }

        totalBenefit = totalBenefitPrice - totalPrice;                  // 총 평가 금액 - 총 매수 금액
        totalYield = ((totalBenefitPrice / totalPrice) * 100) - 100;    // ((총 평가 금액 / 총 매수 금액) * 100) - 100
        totalSum = assetsKrw + totalBenefitPrice;                       // 보유 KRW + 총 평가 금액

        logWrite("보유 KRW :" + Math.round(assetsKrw).toLocaleString());
        logWrite("총 보유 자산 :" + Math.round(totalSum).toLocaleString());
        logWrite("총 매수 금액 :" + Math.round(totalPrice).toLocaleString());
        logWrite("총 평가 금액 :" + Math.round(totalBenefitPrice).toLocaleString());
        logWrite("총 평가 손익 :" + Math.round(totalBenefit).toLocaleString());
        logWrite("총 평가 수익률 :" + new Number(totalYield).toFixed(2));

        /* 화면 초기화 */
        document.getElementById("cryptos").innerHTML = ""
        /* 화면 드로잉 */
        for (key in listData) {
            $cryptos.append(createCrypto(listData[key]));
        }



    }).catch(function (err) {
        console.log(err);
        logWrite("[initAssets][tradeAssets] - 보유 자산 조회 오류 발생", err);
    });
}

function createCrypto(market) {
    let airDrop = (market.isAssetsCoin && market.avg_buy_price == 0) ? true : false;
    let $crypto = document.createElement("div");
    $crypto.classList = "crypto";

    let $name = document.createElement("h4");
    $name.innerHTML = market.korean_name + "(" + market.english_name + ")" + ((market.isAssetsCoin) ? "" : " [미보유]");
    let $sellType = document.createElement("div");
    $sellType.classList = "sell_type";
    let $radio = document.createElement("input");
    $radio.type = "radio";
    $radio.checked = "checked";
    $sellType.append($radio);
    $sellType.append("시장");

    let $amount = document.createElement("div");
    $amount.classList = "amount";
    if (market.isAssetsCoin) {
        let $dl = document.createElement("dl");
        let $dt = document.createElement("dt");
        let $dd = document.createElement("dd");

        $dt.innerHTML = "보유수량";
        $dd.innerHTML = market.balance;
        $dl.append($dt);
        $dl.append($dd);

        $dt = document.createElement("dt");
        $dd = document.createElement("dd");
        $dt.innerHTML = "매수평균가";
        $dd.innerHTML = new Number(market.avg_buy_price).toFixed(2);
        $dl.append($dt);
        $dl.append($dd);

        $dt = document.createElement("dt");
        $dd = document.createElement("dd");
        $dt.innerHTML = "매수금액";
        $dd.innerHTML = Math.round((market.balance * market.avg_buy_price)).toLocaleString();
        $dl.append($dt);
        $dl.append($dd);

        $dt = document.createElement("dt");
        $dd = document.createElement("dd");
        $dt.innerHTML = "수익률";
        $dd.innerHTML = CommonUtil.getAssetsYield(market);
        $dl.append($dt);
        $dl.append($dd);

        $amount.append($dl);
    }

    $crypto.append($name);
    $crypto.append($sellType);
    $crypto.append($amount);

    if (market.market != "KRW-KRW" && !airDrop) {
        button = document.createElement("button")
        // button.innerHTML = list[i].currency + " 시장가 매수";
        button.innerHTML = "매수";
        button.classList = "round_button buy"
        button.addEventListener("click", function (e) {
            if (confirm("누르면 정말 사짐")) {
                orderData = new Object();
                orderData["market"] = market.market;
                orderData["side"] = "bid";
                orderData["volume"] = null;
                orderData["price"] = buyPrice;
                orderData["ord_type"] = "price";
                orderData["identifier"] = $Global["uniqueTicket"];
                orderTarget(orderData, marketBuy);
            } else {
                logWrite("<span class='log_buy'>매수 취소</span> : " + market.market);
            }
        });
        $crypto.append(button);
    }

    if (market.isAssetsCoin && market.market != "KRW-KRW" && !airDrop) {
        button = document.createElement("button");
        // button.innerHTML = list[i].currency + " 시장가 매도";
        button.innerHTML = "매도";
        button.classList = "round_button sell"
        button.addEventListener("click", function (e) {
            if (confirm("누르면 정말 팔림")) {
                orderData = new Object();
                orderData["market"] = market.market;
                orderData["side"] = "ask";
                orderData["volume"] = market.balance;
                orderData["price"] = null;
                orderData["ord_type"] = "market";
                orderData["identifier"] = $Global["uniqueTicket"];
                orderTarget(orderData, marketSell);
            } else {
                logWrite("<span class='log_sell'>매도 취소</span> : " + market.market);
            }
        });
        $crypto.append(button);
    }

    if (market.market != "KRW-KRW" && !airDrop) {
        button = document.createElement("button")
        button.classList = "round_button search";
        button.innerHTML = "조회";
        button.addEventListener("click", function (e) {
            initAssetsOne(market)
        });
        $crypto.append(button);
    }

    return $crypto;
}

function initAssetsOne(assets) {
    let request = new Object();
    request["marketStr"] = CommonUtil.getMarketName(assets);
    getTicker(request).then(function (data) {
        let listData = data;
        let marketOne = listData[0];
        if (marketOne != undefined) {
            logWrite("[initAssetsOne][getTicker] " +
                "코인 : " + CommonUtil.getMarketName(marketOne) +
                ", 시가 : " + marketOne.opening_price +
                ", 저가 : " + marketOne.low_price +
                ", 고가 : " + marketOne.high_price +
                ", 현재가 : " + marketOne.trade_price +
                ((assets.balance != undefined) ? ", 수익률 : " + CommonUtil.getYield(marketOne, assets) : ""))
        } else {
            logWrite("[initAssetsOne][getTicker] - 조회 불가 정보 : " + CommonUtil.getMarketName(assets));
        }
    }).catch(function (err) {
        logWrite("[initAssetsOne][getTicker] - 코인 정보 조회 오류 발생", err);
    });
}

/* 로그 이력 남기기 */
function logWrite(msg, object) {
    let logContainer = document.getElementById("scriptContainer");
    let logWrite = document.createElement("pre");
    logWrite.classList = "log_write";

    if (object != undefined) {
        logWrite.innerHTML = "<span style='opacity: 0.4;'>[" + new Date().toLocaleString() + "]</span> - " + msg + enter + ((typeof (object) == "object") ? JSON.stringify(object, null, '\t') : object);
    } else {
        logWrite.innerHTML = "<span style='opacity: 0.4;'>[" + new Date().toLocaleString() + "]</span> - " + msg;
    }
    logContainer.appendChild(logWrite);
    document.querySelector(".log_write:last-child").scrollIntoView();
}

/* 주문 리스트 가져오기 */
function initOrders(market) {
    let orderData = new Object();
    if (market != undefined) {
        orderData["market"] = CommonUtil.getMarketName(market);
    }
    orderData["state"] = "wait";

    let request = new Object();
    request["callUrl"] = requestUrl.orders + "?" + $.param(orderData);
    request["queryString"] = orderData;

    logWrite("[initOrders] - 주문 리스트 가져오기 데이터", request);
    getOrders(request).then(function (data) {
        logWrite("[initOrders][getOrders] - 주문 리스트 가져오기", data);
    }).catch(function (err) {
        logWrite("[initOrders][getOrders] - 주문 리스트 가져오기 오류 발생", err);
    });
}

/* 주문 취소하기 */
function deleteOrders(uuid) {
    let orderData = new Object();
    orderData["uuid"] = uuid;

    let request = new Object();
    request["queryString"] = orderData;

    logWrite("[deleteOrders] - 주문 취소하기 데이터", request);
    deleteOrder(request).then(function (data) {
        logWrite("[deleteOrders][deleteOrder] - 주문 취소하기", data);
    }).catch(function (err) {
        logWrite("[deleteOrders][deleteOrder] - 주문 취소하기 오류 발생", err);
    });
}

