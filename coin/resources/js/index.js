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
        logWrite("범용 고유 식별자 발급 - " + data);
    }).catch(function(err) {
        logWrite("범용 고유 식별자 발급 오류 발생", err);
    });
}

/* 보유 자산 조회 */
function initAssets(){
    let request = new Object();
    getHoldAssets(request).then(function(data){
        let listData = data;
        let $cryptos = document.getElementById("cryptos");
        /* 로그 작업 */
        logWrite("보유 자산 내역 조회", listData);
        /* 화면 초기화 */
        document.getElementById("cryptos").innerHTML = ""
        /* 화면 드로잉 */
        for(key in listData) {
            $cryptos.append(createCrypto(listData[key]));
        }

        let marketArr = new Array();
        let marketName;
        for(let i = 0 ; i < listData.length; i++){
            marketName = CommonUtil.selectMarketName(listData[i]);
            if(marketName != "KRW-KRW" && listData[i].avg_buy_price != 0){
                marketArr.push(marketName)
            }
        }
        let request = new Object();
        console.log("marketArr.length", marketArr.length);
        request["marketStr"] = marketArr.toLocaleString();
        getTicker(request).then(function(data){
            let nowData = data;
            let myAssets,nowAssets;

            for(let i in listData){
                myAssets = listData[i];
                for(let j in nowData){
                    nowAssets = nowData[j];
                    if(CommonUtil.selectMarketName(myAssets) == CommonUtil.selectMarketName(nowAssets)){
                        logWrite(CommonUtil.selectMarketName(myAssets) + "의 수익률 : " + CommonUtil.getYield(nowAssets, myAssets));
                        break;
                    }
                }   
            }
        }).catch(function(err) {
            console.log(err);
        }); 
        /* 테스트 소스 */
        assetsCoins();
    }).catch(function(err) {
        logWrite("보유 자산 내역 조회 오류 발생", err);
    });
}

function createCrypto(list) {
    let alreadyCoin = (list.balance != undefined) ? true : false;
    let airDrop = (alreadyCoin && list.avg_buy_price == 0) ? true : false;
    let marketName = CommonUtil.getMarketName(list);
    let $crypto = document.createElement("div");
    $crypto.classList = "crypto";

    let $name = document.createElement("h4");
    $name.innerHTML = marketName + ((alreadyCoin) ? "" : " [미보유 코인]");
    let $sellType = document.createElement("div");
    $sellType.classList = "sell_type";
        let $radio = document.createElement("input");
        $radio.type = "radio";
        $radio.checked = "checked";
        $sellType.append($radio);
        $sellType.append("시장");
    
    let $amount = document.createElement("div");
    $amount.classList = "amount";
        if(alreadyCoin){
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
            $dd.innerHTML = new Number(list.avg_buy_price).toFixed(2);
            $dl.append($dt);
              
            $dl.append($dd);
    
            $dt = document.createElement("dt");
            $dd = document.createElement("dd");
            $dt.innerHTML = "매수금액";
            $dd.innerHTML = Math.round((list.balance * list.avg_buy_price)).toLocaleString();
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
                // logWrite("<span class='log_buy'>매수</span> : " + marketName);
            } else {
                logWrite("<span class='log_buy'>매수 취소</span> : " + marketName);
            }
        });
        $crypto.append(button);
    }

    if(alreadyCoin && marketName != "KRW-KRW" && !airDrop){
        button = document.createElement("button");
        // button.innerHTML = list[i].currency + " 시장가 매도";
        button.innerHTML = "매도";
        button.classList = "round_button sell"
        button.addEventListener("click", function(e){
            if(confirm("누르면 정말 팔림")){
                orderData = new Object();
                orderData["market"] = marketName;
                orderData["side"] = "ask";
                orderData["volume"] =  list.balance;
                orderData["price"] = null;
                orderData["ord_type"] = "market";
                orderData["identifier"] = $Global["uniqueTicket"];
                orderTarget(orderData, marketSell);
                // logWrite("<span class='log_sell'>매도</span> : " + marketName);
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
            initAssetsOne(list)
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
            logWrite("코인 정보 조회 : " + CommonUtil.getMarketName(marketOne) +
            ", 시가 : " + marketOne.opening_price + 
            ", 저가 : " + marketOne.low_price + 
            ", 고가 : " + marketOne.high_price + 
            ", 현재가 : " + marketOne.trade_price + 
            ((assets.balance != undefined ) ? ", 수익률 : " + CommonUtil.getYield(marketOne, assets) : "" ))
        } else {
            logWrite("조회 불가 정보 : " + CommonUtil.getMarketName(assets));
        }
    }).catch(function(err) {
        logWrite("코인 정보 조회 오류 발생", err);
    });
}

function assetsCoins(){
    let request = new Object();
    getHoldAssets(request).then(function(data){
        logWrite("미보유/보유 데이터 1차 수집");
        let listData = data;
        let alreadyCoin = false;
        let notExistAssets = new Array(); 
        getParamMarket().then(function(data){
            logWrite("미보유/보유 데이터 2차 수집");
            let paramMarket = data;
            for(let i in paramMarket){
                alreadyCoin = false;
                for(let j in listData){
                    if(CommonUtil.getMarketName(paramMarket[i]) == CommonUtil.getMarketName(listData[j])){
                        alreadyCoin = true;
                        break;
                    }
                }

                if(!alreadyCoin){
                    notExistAssets.push(paramMarket[i]);
                }
            }
            
            let $cryptos = document.getElementById("cryptos");
        
            /* 화면 드로잉 */
            for(key in notExistAssets) {
                $cryptos.append(createCrypto(notExistAssets[key]));
            }

        }).catch(function(err) {
            logWrite("미보유/보유 데이터 2차 수집", err);
        });
    }).catch(function(err) {
        logWrite("미보유/보유 데이터 1차 수집", err);
    });
}

/* 구분 */
function classifyAssets(){
    
    let request = new Object();
    getHoldAssets(request).then(function(data){
        logWrite("미보유/보유 데이터 1차 수집");
        let listData = data;
        let alreadyCoin = false;
        let targetCoin = null;
        let notExistAssets = new Array(); 
        let existAssets = new Array();
        getParamMarket().then(function(data){
            logWrite("미보유/보유 데이터 2차 수집");
            let paramMarket = data;
            for(let i in paramMarket){
                alreadyCoin = false;
                targetCoin = paramMarket[i];
                for(let j in listData){
                    if(CommonUtil.getMarketName(targetCoin) == CommonUtil.getMarketName(listData[j])){
                        alreadyCoin = true;
                        targetCoin = listData[j];
                        break;
                    }
                }

                if(alreadyCoin){
                    existAssets.push(targetCoin);
                } else {
                    notExistAssets.push(targetCoin);
                }
            }

            logWrite("existAssets", existAssets);
            logWrite("notExistAssets", notExistAssets);
            /* 미보유 매수 */
            notExistAssetsBuy(notExistAssets);
            /* 평균 단가 기준 수익률 기준 +10% 이상 매도 && 평균 단가 기준 수익률 기준 -5% 이하 매수 */
            lowAndHighAssets(existAssets);
        }).catch(function(err) {
            logWrite("미보유/보유 데이터 2차 수집", err);
        });
    }).catch(function(err) {
        logWrite("미보유/보유 데이터 1차 수집", err);
    });

}

function lowAndHighAssets(existAssets){
    let request = new Object();
    getParamMarket(request).then(function(data){
        logWrite("코인 데이터 수집");
        let paramMarket = data;
        let marketStr = '';
        for(let i = 0 ; i < paramMarket.length; i++){
            marketStr += paramMarket[i].market;
            if(i < (paramMarket.length -1)) marketStr += ",";
        }
        let request = new Object();
        request["marketStr"] = marketStr;
        getTicker(request).then(function(data){
            logWrite("현재가 코인 데이터 수집");
            let listData = data;
            let standard = 0;
            let highAssets = new Array();
            let lowAssets = new Array();
            let waitAssets = new Array();
            for(let i in existAssets) {
                for(let j in listData) {
                    if(CommonUtil.getMarketName(listData[j]) == CommonUtil.getMarketName(existAssets[i])) {
                        standard = CommonUtil.getYield(listData[j], existAssets[i]);
                        if(standard >= highPercent){ 
                            highAssets.push(existAssets[i]);
                        } else if(standard <= lowPercent){
                            lowAssets.push(existAssets[i]);
                        } else {
                            waitAssets.push(existAssets[i]);
                        }
                    }
                }
            }

            /* 평균 단가 기준 수익률 기준 +10% 이상 매도 */
            highAssetsSell(highAssets);
            /* 평균 단가 기준 수익률 기준 -5% 이하 매수 */
            lowAssetsBuy(lowAssets);
            
            logWrite("변화 정보 없음");
            for(key in waitAssets) {
                logWrite("코인 정보 - " + CommonUtil.getMarketName(waitAssets[key]));
            }
            logWrite("변화 정보 없음");

        }).catch(function(err) {
            logWrite("코인 정보 조회 오류 발생", err);
        });
    }).catch(function(err) {
        logWrite("코인 정보 조회 오류 발생", err);
    });
}

/* 미보유 매수 */
function notExistAssetsBuy(assets){
    logWrite("미보유 매수 시작");
    for(let key in assets) {
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
    for(let key in assets) {
        orderTarget(assets[key], marketSell);        
    }
    logWrite("평균 단가 기준 수익률 기준 +10% 이상 매도 종료");
}

/* 평균 단가 기준 수익률 기준 -5% 이하 매수 */
function lowAssetsBuy(assets){
    logWrite("평균 단가 기준 수익률 기준 -5% 이하 매수 시작");
    for(let key in assets) {
        orderTarget(assets[key], marketBuy);        
    }
    logWrite("평균 단가 기준 수익률 기준 -5% 이하 매수 종료");
}

/*  
    시장가 매수,매도 전 데이터 가공 함수
        # 시장가 매도 시 price 값 null 입력
        # 시장가 매수 시 volumn 값 null 입력
*/
function orderTarget(marketData, type){
    let marketName = CommonUtil.getMarketName(marketData);
    let orderData = new Object();
    orderData["market"] = marketName;
    orderData["side"] = (type == 0) ? "bid" : "ask";
    orderData["volume"] = (type == 0) ? null : marketData.balance;
    orderData["price"] = (type == 0) ? buyPrice : null;
    orderData["ord_type"] = (type == 0) ? "price" : "market";
    orderData["identifier"] = $Global["uniqueTicket"];

    logWrite(((type == 0) ? "<span class='log_buy'>매수</span>" : "<span class='log_sell'>매도</span>") + " " + marketName);
    // orderMarket(orderData);
} 

/* 시장가 매수,매도 함수 */
function orderMarket(orderData){
    let request = new Object();
    request["queryString"] = orderData;
    logWrite("시장가 매수,매도 API 데이터", request);
    // postOrders(request).then(function(data){
    //     logWrite("시장가 매수 매도 API" + data);
    // }).catch(function(err) {
    //     logWrite("시장가 매수 매도 API 오류 발생", err);
    // });
}

/* 주문 리스트 가져오기 */
function initOrders(market){
    let orderData = new Object();
    if(market != undefined) {
        orderData["market"] = CommonUtil.getMarketName(market);
    }
    orderData["state"] = "wait";

    let request = new Object();
    request["callUrl"] = requestUrl.orders + "?" + $.param(orderData);
    request["queryString"] = orderData;

    logWrite("주문 리스트 가져오기 데이터", request);
    getOrders(request).then(function(data){
        logWrite("주문 리스트 가져오기", data);
    }).catch(function(err) {
        logWrite("주문 리스트 가져오기 오류 발생", err);
    });
}

/* 주문 취소하기 */
function deleteOrders(uuid){
    let orderData = new Object();
    orderData["uuid"] = uuid;

    let request = new Object();
    request["queryString"] = orderData;
    
    logWrite("주문 취소하기 데이터", request);
    deleteOrder(request).then(function(data){
        logWrite("주문 취소하기", data);
    }).catch(function(err) {
        logWrite("주문 취소하기 오류 발생", err);
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