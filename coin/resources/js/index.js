let $Global = new Object();
window.onload = function (){
    load('../resources/modules/sharedObject.js').then(function(module){
        $Global["serverMessage"] = module.serverMessage;
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
        initAssets();
    });
    document.getElementById("classifyBtn").addEventListener("click", function(e){
        classifyAssets();
    });
    document.getElementById("waitBtn").addEventListener("click", function(e){
        initOrders();
    });
}

function initializeComponentData(){
    serverSocket.initialize();
    bitSocket.initialize();

    initUidv4();
    initAssets();
}

function initUidv4(){
    let request = new Object();
    getUuidv4(request).then(function(data){
        $Global["uniqueTicket"] = data;
        logWrite("[initUidv4][getUuidv4] - 범용 고유 식별자 발급 - " + data);
    }).catch(function(err) {
        logWrite("[initUidv4][getUuidv4] - 범용 고유 식별자 발급 오류 발생", err);
    });
}

/* 보유 자산 조회 */
function initAssets(){
    let request = new Object();
    tradeAssets(request).then(function(data){
        let listData = data;
        let $cryptos = document.getElementById("cryptos");
        /* 로그 작업 */
        logWrite("[initAssets][tradeAssets] - 보유 자산 조회", data);
        /* 화면 초기화 */
        document.getElementById("cryptos").innerHTML = ""
        /* 화면 드로잉 */
        for(key in listData) {
            $cryptos.append(createCrypto(listData[key]));
        }

    }).catch(function(err) {
        console.log(err);
        logWrite("[initAssets][tradeAssets] - 보유 자산 조회 오류 발생", err);
    });
}

function createCrypto(market) {
    let airDrop = (market.isAssetsCoin && market.avg_buy_price == 0) ? true : false;
    let marketName = CommonUtil.getMarketName(market);
    let $crypto = document.createElement("div");
    $crypto.classList = "crypto";

    let $name = document.createElement("h4");
    $name.innerHTML = marketName + ((market.isAssetsCoin) ? "" : " [미보유 코인]");
    let $sellType = document.createElement("div");
    $sellType.classList = "sell_type";
        let $radio = document.createElement("input");
        $radio.type = "radio";
        $radio.checked = "checked";
        $sellType.append($radio);
        $sellType.append("시장");
    
    let $amount = document.createElement("div");
    $amount.classList = "amount";
        if(market.isAssetsCoin){
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
    
            $amount.append($dl);
        }
    
    $crypto.append($name);
    $crypto.append($sellType);
    $crypto.append($amount);

    if(marketName != "KRW-KRW" && !airDrop){
        button = document.createElement("button")
        // button.innerHTML = list[i].currency + " 시장가 매수";
        button.innerHTML = "매수";
        button.classList = "round_button buy"
        button.addEventListener("click", function(e){
            if(confirm("누르면 정말 사짐")){
                orderData = new Object();
                orderData["market"] = marketName
                orderData["side"] = "bid";
                orderData["volume"] = null;
                orderData["price"] = buyPrice;
                orderData["ord_type"] = "price";
                orderData["identifier"] = $Global["uniqueTicket"];
                orderTarget(orderData, marketBuy);
            } else {
                logWrite("<span class='log_buy'>매수 취소</span> : " + marketName);
            }
        });
        $crypto.append(button);
    }

    if(market.isAssetsCoin && marketName != "KRW-KRW" && !airDrop){
        button = document.createElement("button");
        // button.innerHTML = list[i].currency + " 시장가 매도";
        button.innerHTML = "매도";
        button.classList = "round_button sell"
        button.addEventListener("click", function(e){
            if(confirm("누르면 정말 팔림")){
                orderData = new Object();
                orderData["market"] = marketName;
                orderData["side"] = "ask";
                orderData["volume"] =  market.balance;
                orderData["price"] = null;
                orderData["ord_type"] = "market";
                orderData["identifier"] = $Global["uniqueTicket"];
                orderTarget(orderData, marketSell);
            } else {
                logWrite("<span class='log_sell'>매도 취소</span> : " + marketName);
            }
        });
        $crypto.append(button);
    }

    if(marketName != "KRW-KRW" && !airDrop){
        button = document.createElement("button")
        button.classList = "round_button search";
        button.innerHTML = "조회";
        button.addEventListener("click", function(e){ 
            initAssetsOne(market)
        });
        $crypto.append(button);
    }

    return $crypto;
}

function initAssetsOne(assets){
    let request = new Object();
    request["marketStr"] = CommonUtil.getMarketName(assets);
    getTicker(request).then(function(data){
        let listData = data;
        let marketOne = listData[0];
        if(marketOne != undefined) {
            logWrite("[initAssetsOne][getTicker] 코인 정보 조회 : " + CommonUtil.getMarketName(marketOne) +
            ", 시가 : " + marketOne.opening_price + 
            ", 저가 : " + marketOne.low_price + 
            ", 고가 : " + marketOne.high_price + 
            ", 현재가 : " + marketOne.trade_price + 
            ((assets.balance != undefined ) ? ", 수익률 : " + CommonUtil.getYield(marketOne, assets) : "" ))
        } else {
            logWrite("[initAssetsOne][getTicker] - 조회 불가 정보 : " + CommonUtil.getMarketName(assets));
        }
    }).catch(function(err) {
        logWrite("[initAssetsOne][getTicker] - 코인 정보 조회 오류 발생", err);
    });
}

/* 로그 이력 남기기 */
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