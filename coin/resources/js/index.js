let $Global = new Object();
window.onload = function (){
    load('../resources/modules/sharedObject.js').then(function(module){
        $Global["message"] = module.sharedObject;
        initializeApplication();
    });
}

function initializeApplication(){
    // logWrite("initializeApplication");
    initializeComponent();
    initializeComponentData();
    initializeBindEvent();
}

function initializeComponent(){
    // logWrite("initializeComponent");
    document.getElementsByClassName("log-toggle_button")[0].addEventListener("click", function(e) {
        let $scriptContainer = document.getElementById("scriptContainer");
        $scriptContainer.classList = ($scriptContainer.classList == "log_close") ? "" : "log_close";
    })
}

function initializeBindEvent(){
    // logWrite("initializeComponent");
    document.getElementById("selectBtn").addEventListener("click", function(e){
        document.getElementById("cryptos").innerHTML = ""
        selectAccounts();
    });
    document.getElementById("classifyBtn").addEventListener("click", function(e){
        classifyAssets();
    });
    
}

function initializeComponentData(){
    serverSocket.initialize();
    bitSocket.initialize();
    makeUidv4();
    selectAccounts();
    setTimeout(function(){
        assetsCoins(); 
    }, 2000);
}

function makeUidv4(){
    let request = new Object();
    CommonUtil.sendMessage(serverSocket, "GET", $Global["message"].uuidv4, request, function(data){
        $Global["uniqueTicket"] = data;
    });
}

function selectMarketList(){
    let request = new Object();
    request["method"] = "GET";
    request["callUrl"] = upbitUrl.selectMarkets;
    CommonUtil.sendMessage(serverSocket, "GET", $Global["message"].selectMarkets, request, function(data){
        let response = JSON.parse(data);
        createMarketTable(response.data);
    });
}

function orderTarget(marketData, type){
    /* 
        시장가 매수 시 volume null 
        시장가 매도 시 price null 
    */
    let orderData = new Object();
    let marketName = marketData.market ? marketData.market : marketData.unit_currency + "-" + marketData.currency;

    orderData["market"] = marketName;
    orderData["side"] = (type == 0) ? "bid" : "ask";
    orderData["volume"] = (type == 0) ? null : marketData.balance;
    orderData["price"] = (type == 0) ? buyPrice : null;
    orderData["ord_type"] = (type == 0) ? "price" : "market";
    orderData["identifier"] = $Global["uniqueTicket"];

    logWrite(((type == 0) ? "<span class='log_buy'>매수</span>" : "<span class='log_sell'>매도</span>") + " " + marketName);
    // orderMarket(orderData);
} 

/* 시장가 매수,매도 */
function orderMarket(orderData){
    let request = new Object();
    request["method"] = "POST";
    request["type"] = 1;
    request["callUrl"] = upbitUrl.marketOrders;
    request["queryString"] = orderData;
    logWrite("시장가 매수,매도 API 데이터", request);

    CommonUtil.sendMessage(serverSocket, "POST", $Global["message"].marketOrders, request, function(data){
        let response = JSON.parse(data);
        logWrite("시장가 매수,매도 API 결과", response);
    });
}

/* 보유 자산 조회 */
function selectAccounts(){
    let request = new Object();
    request["method"] = "GET";
    request["callUrl"] = upbitUrl.accounts;
    
    CommonUtil.sendMessage(serverSocket, "GET", $Global["message"].accounts, request, function(data){
        let response = JSON.parse(data);
        initAccounts(response.data);
    });
}

function createCrypto(list) {
    let $crypto = document.createElement("div");
    $crypto.classList = "crypto";

    let $name = document.createElement("h4");
    $name.innerHTML = list.currency+"/"+list.unit_currency;

    let $sellType = document.createElement("div");
    $sellType.classList = "sell_type";
        let $radio = document.createElement("input");
        $radio.type = "radio";
        $radio.checked = "checked";
        $sellType.append($radio);
        $sellType.append("시장");
    
    let $amount = document.createElement("div");
    $amount.classList = "amount";
        let $dl = document.createElement("dl");
        let $dt = document.createElement("dt");
        let $dd = document.createElement("dd");

        $dt.innerHTML = "보유수량";
        $dd.innerHTML = list.balance;
        $dl.append($dt);
        $dl.append($dd);

        $dt = document.createElement("dt");
        $dd = document.createElement("dd");
        $dt.innerHTML = "매수평균가";
        $dd.innerHTML = Math.round(list.avg_buy_price).toLocaleString();
        $dl.append($dt);
        $dl.append($dd);

        $dt = document.createElement("dt");
        $dd = document.createElement("dd");
        $dt.innerHTML = "매수금액";
        $dd.innerHTML = Math.round((list.balance * list.avg_buy_price)).toLocaleString();
        $dl.append($dt);
        $dl.append($dd);

        $amount.append($dl);
    
    $crypto.append($name);
    $crypto.append($sellType);
    $crypto.append($amount);


    button = document.createElement("button")
    // button.innerHTML = list[i].currency + " 시장가 매수";
    button.innerHTML = "매수";
    button.classList = "round_button buy"
    button.addEventListener("click", function(e){
        if(confirm("누르면 정말 사짐")){
            orderData = new Object();
            orderData["market"] = listunit_currency + "-" + list.currency;
            orderData["side"] = "bid";
            orderData["volume"] = null;
            orderData["price"] = buyPrice;
            orderData["ord_type"] = "price";
            orderData["identifier"] = $Global["uniqueTicket"];
            orderTarget(orderData, marketBuy);
            logWrite("<span class='log_buy'>매수</span> : " + list.currency + "/" + list.unit_currency);
        } else {
            logWrite("<span class='log_buy'>매수 취소</span> : " + list.currency + "/" + list.unit_currency);
        }
    });
    $crypto.append(button);

    button = document.createElement("button");
    // button.innerHTML = list[i].currency + " 시장가 매도";
    button.innerHTML = "매도";
    button.classList = "round_button sell"
    button.addEventListener("click", function(e){
        if(confirm("누르면 정말 팔림")){
            orderData = new Object();
            orderData["market"] = list.unit_currency + "-" + list.currency;
            orderData["side"] = "ask";
            orderData["volume"] =  list.balance;
            orderData["price"] = null;
            orderData["ord_type"] = "market";
            orderData["identifier"] = $Global["uniqueTicket"];
            orderTarget(orderData, marketSell);
            logWrite("<span class='log_sell'>매도</span> : " + list.currency + "/" + list.unit_currency);
        } else {
            logWrite("<span class='log_sell'>매도 취소</span> : " + list.currency + "/" + list.unit_currency);
        }
    });
    $crypto.append(button);

    button = document.createElement("button")
    button.innerHTML = list.currency + " 현재 금액 조회";
    button.addEventListener("click", function(e){ 
        selectMarketOne(list)
    });
    $crypto.append(button);

    return $crypto;
}
function initAccounts(data){
    let listData = JSON.parse(data);
    let $cryptos = document.getElementById("cryptos");
    logWrite("보유 자산 내역 조회", listData);

    for(key in listData) {
        $cryptos.append(createCrypto(listData[key]))
    }
}
/* 선택 코인 조회 */
function selectMarketOne(market){
    let request = new Object();
    request["method"] = "GET";
    request["callUrl"] = upbitUrl.selectMarket + market.unit_currency + "-" + market.currency;
    CommonUtil.sendMessage(serverSocket, "GET", $Global["message"].selectMarket, request, function(data){
        let response = JSON.parse(data);
        initMarket(response.data, market);
    });
}

function selectMarket(market, assets){
    let marketStr = '';
    for(let i = 0 ; i < market.length; i++){
        marketStr += market[i].market;
        if(i < (market.length -1)) marketStr += ",";
    }

    let request = new Object();
    request["method"] = "GET";
    request["callUrl"] = upbitUrl.selectMarket + marketStr;
    CommonUtil.sendMessage(serverSocket, "GET", $Global["message"].selectMarket, request, function(data){
        let response = JSON.parse(data);
        initMarket(response.data, assets);
    });
}

function initMarket(data, assets){
    let list = JSON.parse(data);
    let marketData = list[0];
    if(marketData != undefined) {
        logWrite("조회 정보 : " + marketData.market +
        ", 시가 : " + marketData.opening_price + 
        ", 저가 : " + marketData.low_price + 
        ", 고가 : " + marketData.high_price + 
        ", 현재가 : " + marketData.trade_price + 
        ", 수익률 : " + CommonUtil.getYield(marketData, assets))
    }
        
}

function assetsCoins(){
    let request = new Object();
    request["method"] = "GET";
    request["callUrl"] = upbitUrl.accounts;
    
    CommonUtil.sendMessage(serverSocket, "GET", $Global["message"].accounts, request, function(data){
        let response = JSON.parse(data);
        let list = JSON.parse(response.data);
        let alreadyCoin = false;
        let $container = document.getElementById("testContainer");

        $container.append("테스트 할 코인 내역" + enter);
        for(let j = 0 ; j < market.length; j++){
            alreadyCoin = false;
            for(let i = 0 ; i < list.length; i++) {
                if(market[j].market == list[i].unit_currency + "-" + list[i].currency){
                    alreadyCoin = true;
                    break;
                }
            }
            
            $container.append( ((alreadyCoin) ? "보유 코인 - " : "미보유 코인 - ") + market[j].market);
            button = document.createElement("button")
            button.innerHTML = market[j].market + " 시장가 매수";
            button.addEventListener("click", function(e){
                if(confirm("누르면 정말 사짐")){
                    orderData = new Object();
                    orderData["market"] = market[j].market;
                    orderData["side"] = "bid";
                    orderData["volume"] = null;
                    orderData["price"] = buyPrice;
                    orderData["ord_type"] = "price";
                    orderData["identifier"] = $Global["uniqueTicket"];
                    orderTarget(orderData, marketBuy);
                    logWrite("매수 코인 : " + market[j].market);
                } else {
                    logWrite("매수 코인 취소 : " + market[j].market);
                }
            });
            $container.appendChild(button);
            $container.append(enter);

        }
    });
}

/* 구분 */
function classifyAssets(){

    let request = new Object();
    request["method"] = "GET";
    request["callUrl"] = upbitUrl.accounts;
    CommonUtil.sendMessage(serverSocket, "GET", $Global["message"].accounts, request, function(data){
        let response = JSON.parse(data);
        let list = JSON.parse(response.data);
        let alreadyCoin = false;
        let tragetCoin = null;
        let notExistAssets = new Array(); 
        let existAssets = new Array();

        for(let j = 0 ; j < market.length; j++){
            alreadyCoin = false;
            tragetCoin = market[j];
            for(let i = 0 ; i < list.length; i++) {
                if(market[j].market == list[i].unit_currency + "-" + list[i].currency){
                    alreadyCoin = true;
                    tragetCoin = list[i];
                    break;
                }
            }

            if(alreadyCoin){
                existAssets.push(tragetCoin);
            } else {
                notExistAssets.push(tragetCoin);
            }
        }

        logWrite("existAssets", existAssets);
        logWrite("notExistAssets", notExistAssets);
        
        /* 미보유 매수 */
        notExistAssetsBuy(notExistAssets);
        /* 평균 단가 기준 수익률 기준 +10% 이상 매도 && 평균 단가 기준 수익률 기준 -5% 이하 매수 */
        lowAndHighAssets(existAssets);

    });
}
function lowAndHighAssets(existAssets){
    let marketStr = '';
    for(let i = 0 ; i < market.length; i++){
        marketStr += market[i].market;
        if(i < (market.length -1)) marketStr += ",";
    }
    let request = new Object();
    request["method"] = "GET";
    request["callUrl"] = upbitUrl.selectMarket + marketStr;

    CommonUtil.sendMessage(serverSocket, "GET", $Global["message"].selectMarket, request, function(data){
        let response = JSON.parse(data);
        let list = JSON.parse(response.data);
        let standard = 0;
        let highAssets = new Array();
        let lowAssets = new Array();
        let waitAssets = new Array();
        
        for(let j = 0 ; j < existAssets.length; j++) {
            for(let i = 0 ; i < list.length; i++) {
                if(list[i].market == existAssets[j].unit_currency + "-" + existAssets[j].currency) {
                    standard = CommonUtil.getYield(list[i], existAssets[j]);
                    if(standard >= highPercent){ 
                        highAssets.push(existAssets[j]);
                    } else if(standard <= lowPercent){
                        lowAssets.push(existAssets[j]);
                    } else {
                        waitAssets.push(existAssets[j]);
                    }
                }
            }
        }

        logWrite("변화 정보 없음");
        for(let i = 0 ; i < waitAssets.legnth; i++){
            logWrite("코인 정보 - " + marketData.market);
        }
        logWrite("변화 정보 없음");

        /* 평균 단가 기준 수익률 기준 +10% 이상 매도 */
        highAssetsSell(highAssets);
        /* 평균 단가 기준 수익률 기준 -5% 이하 매수 */
        lowAssetsBuy(lowAssets);

    });
}

/* 주문 취소 */
function cancleAssets(){

}

/* 미보유 매수 */
function notExistAssetsBuy(assets){
    logWrite("미보유 매수 시작");
    for(key in assets) {
        orderTarget(assets[key], marketBuy);        
    }
    logWrite("미보유 매수 종료");
}

/* 평단가 기준 예약 매도(22%) */
function bestAssetsSell(){

}

/* 평균 단가 기준 수익률 기준 +10% 이상 매도 */
function highAssetsSell(assets){
    logWrite("평균 단가 기준 수익률 기준 +10% 이상 매도 시작");
    for(let i = 0 ; i < assets.length; i++){
        orderTarget(assets[i], marketSell);        
    }
    logWrite("평균 단가 기준 수익률 기준 +10% 이상 매도 종료");
}

/* 평균 단가 기준 수익률 기준 -5% 이하 매수 */
function lowAssetsBuy(assets){
    logWrite("평균 단가 기준 수익률 기준 -5% 이하 매수 시작");
    for(let i = 0 ; i < assets.length; i++){
        orderTarget(assets[i], marketBuy);        
    }
    logWrite("평균 단가 기준 수익률 기준 -5% 이하 매수 종료");
}

function logWrite(msg, object){
    let logContainer = document.getElementById("scriptContainer");
    let logWrite = document.createElement("pre");
    logWrite.classList = "log_write";

    if(object != undefined){
        logWrite.innerHTML = "<span style='opacity: 0.4;'>[" + new Date().toLocaleString() + "]</span> - " + msg + enter + ((typeof(object) == "object") ? JSON.stringify(object, null, '\t') : object); 
    } else {
        logWrite.innerHTML = "<span style='opacity: 0.4;'>[" + new Date().toLocaleString() + "]</span> - " + msg; 
    }
    logContainer.appendChild(logWrite);
    document.querySelector(".log_write:last-child").scrollIntoView();
}

/* 주문 리스트 가져오기 */
function orderList(){
    let orderData = new Object();
    orderData["market"] = "KRW-BTT";
    orderData["state"] = "wait";

    let request = new Object();
    request["method"] = "GET";
    request["type"] = 0;
    request["callUrl"] = upbitUrl.marketOrders + "?" + $.param(orderData);
    request["queryString"] = orderData;
    logWrite("주문 리스트 가져오기  API 데이터", request);
    CommonUtil.sendMessage(serverSocket, "POST", $Global["message"].marketOrders, request, function(data){
        let response = JSON.parse(data);
        logWrite("주문 리스트 가져오기  API 결과", response);
    });
}

/* 주문 취소하기 */
function orderCancle(){
    let orderData = new Object();
    orderData["uuid"] = "0f8de28d-4151-4470-966d-6ad589c45685";

    let request = new Object();
    request["method"] = "DELETE";
    request["type"] = 1;
    request["callUrl"] = upbitUrl.marketOrder + "?" + $.param(orderData);
    request["queryString"] = orderData;

    logWrite("주문 취소하기  API 데이터", request);
    CommonUtil.sendMessage(serverSocket, "DELETE", $Global["message"].marketOrder, request, function(data){
        let response = JSON.parse(data);
        logWrite("주문 취소하기  API 결과", response);
    });
}
