/* 
    https://api.upbit.com/v1/accounts
    전체 계좌 조회 - GET
    "currency"              : "BTC",
    "balance"               : "1000000.0",
    "locked"                : "0.0",
    "avg_buy_price"         : "0",
    "avg_buy_price_modified": false,
    "unit_currency"         : "KRW",
*/
function getHoldAssets(request) {
    let requestData = (request != undefined) ? request : new Object();
    requestData["callUrl"] = requestUrl.holdAssets;

    return new Promise(function(resolve, reject) {
        CommonUtil.sendMessage(serverSocket, "GET", $Global["serverMessage"].holdAssets, requestData, function(data) {
            let response = JSON.parse(data);
            (response.result == -1) ? reject(JSON.parse(response.data)) : resolve(JSON.parse(response.data));
        });
    });
}
/* 
    https://api.upbit.com/v1/orders/chance
    주문 가능 정보 GET
*/
function getOrderChance(request){
    let requestData = (request != undefined) ? request : new Object();
    requestData["callUrl"] = requestUrl.orderChance;

    return new Promise(function(resolve, reject) {
        CommonUtil.sendMessage(serverSocket, "GET", $Global["serverMessage"].orderChance, requestData, function(data) {
            let response = JSON.parse(data);
            (response.result == -1) ? reject(JSON.parse(response.data)) : resolve(JSON.parse(response.data));
        });
    });
}
/* 
    https://api.upbit.com/v1/orders
    주문하기 - POST
    주문 리스트 조회 - GET
*/
function getOrders(request) {
    let requestData = (request != undefined) ? request : new Object();
    requestData["callUrl"] = requestUrl.orders + "?" + $.param(request["queryString"]);

    return new Promise(function(resolve, reject) {
        CommonUtil.sendMessage(serverSocket, "GET", $Global["serverMessage"].orders, requestData, function(data) {
            let response = JSON.parse(data);
            (response.result == -1) ? reject(JSON.parse(response.data)) : resolve(response.data);
        });
    });
}

function postOrders(request) {
    let requestData = (request != undefined) ? request : new Object();
    requestData["callUrl"] = requestUrl.orders;
    requestData["type"] = 1;

    throw '미쳤니 영재야 그만해';
    
    return false;

    return new Promise(function(resolve, reject) {
        CommonUtil.sendMessage(serverSocket, "POST", $Global["serverMessage"].orders, requestData, function(data) {
            let response = JSON.parse(data);
            (response.result == -1) ? reject(JSON.parse(response.data)) : resolve(JSON.parse(response.data));
        });
    });
}
/*
    https://api.upbit.com/v1/order
    주문취소 - DELETE
    개별 주문 조회 - GET
*/
function getOrder(request) {
    let requestData = (request != undefined) ? request : new Object();
    requestData["callUrl"] = requestUrl.order;

    return new Promise(function(resolve, reject) {
        CommonUtil.sendMessage(serverSocket, "GET", $Global["serverMessage"].order, requestData, function(data) {
            let response = JSON.parse(data);
            (response.result == -1) ? reject(JSON.parse(response.data)) : resolve(JSON.parse(response.data));
        });
    });
}
function deleteOrder(request) {
    let requestData = (request != undefined) ? request : new Object();
    requestData["callUrl"] = requestUrl.order + "?" + $.param(request["queryString"]);
    requestData["type"] = 1;

    return new Promise(function(resolve, reject) {
        CommonUtil.sendMessage(serverSocket, "DELETE", $Global["serverMessage"].order, requestData, function(data) {
            let response = JSON.parse(data);
            (response.result == -1) ? reject(JSON.parse(response.data)) : resolve(response.data);
        });
    });
}
/*
    https://api.upbit.com/v1/market/all
    마켓 전체 조회 - GET
*/
function getMarketAll(request) {
    let requestData = (request != undefined) ? request : new Object();
    requestData["callUrl"] = requestUrl.marketAll;

    return new Promise(function(resolve, reject) {
        CommonUtil.sendMessage(serverSocket, "GET", $Global["serverMessage"].marketAll, requestData, function(data) {
            let response = JSON.parse(data);
            (response.result == -1) ? reject(JSON.parse(response.data)) : resolve(JSON.parse(response.data));
        });
    });
}
/*
    https://api.upbit.com/v1/ticker?markets=KRW-BTC
    마켓 선택 조회 - GET
*/
function getTicker(request) {
    let requestData = (request != undefined) ? request : new Object();
    requestData["callUrl"] = requestUrl.ticker + request["marketStr"];

    return new Promise(function(resolve, reject) {
        CommonUtil.sendMessage(serverSocket, "GET", $Global["serverMessage"].ticker, requestData, function(data) {
            let response = JSON.parse(data);
            (response.result == -1) ? reject(JSON.parse(response.data)) : resolve(JSON.parse(response.data));
        });
    });
}
/*
    https://api.upbit.com/v1/candles/days?market=KRW-BTC,KRW-XRP&count=3
    마켓 선택 조회 - GET
*/
function getDayCandles(request,count) {
    let requestData = (request != undefined) ? request : new Object();
    requestData["callUrl"] = requestUrl.dayCandles + request["marketStr"] + "&count=" + count;

    return new Promise(function(resolve, reject) {
        CommonUtil.sendMessage(serverSocket, "GET", $Global["serverMessage"].dayCandle, requestData, function(data) {
            let response = JSON.parse(data);
            (response.result == -1) ? reject(JSON.parse(response.data)) : resolve(JSON.parse(response.data));
        });
    });
}
/*
    uuid 발급 - GET
*/
function getUuidv4(request) {
    return new Promise(function(resolve, reject) {
        CommonUtil.sendMessage(serverSocket, "GET", $Global["serverMessage"].uuidv4, ((request == undefined) ? new Object() : request), function(data) {
            resolve(data);
        });
    });
}
/*
    자동 매수,매도 할 코인 목록 조회
    "market_warning"    : "NONE",
    "market"            : "KRW-BTC",
    "korean_name"       : "비트코인",
    "english_name"      : "BTC",
    "coin_name"         : "BTC",
    "code_name"         : "BTC/KRW"
*/
function getParamMarket() {
    return new Promise(function(resolve, reject) {
        resolve(market);
    });
}

/*
    데이터 가공한 보유 / 미보유 재산 정보
    "isAssetsCoin"      : 보유 여부 true : false,
    "market"            : "KRW-BTC"
    "korean_name"       : "비트코인" 
    "english_name"      : "BTC/KRW" 
    "balance"           : 보유 수량
    "locked"            : 주문 중 묶여있는 금액/수량
    "avg_buy_price"     : 평균 단가
    "coin_name"         : "BTC"
    "low_price"         : "저가"
    "opening_price"     : "시가"
    "high_price"        : "고가"
    "trade_price"       : "현재가"
    "prev_closing_price": "전일종가"
*/
function tradeAssets(request) {
    return new Promise(function(resolve, reject) {
        getHoldAssets(request).then(function(data){
            logWrite("[tradeAssets][getHoldAssets] - Success");
            let marketData      = new Object();
            let market          = null;
            let listData        = data;
            let alreadyCoin     = false;
            let targetCoin      = null;
            let existAssets     = new Array();
            /* 보유 자산 등록 */
            for(let j in listData){
                market = new Object();
                market["isAssetsCoin"]          = true;
                market["market"]                = CommonUtil.selectMarketName(listData[j]);     // KRW-BTC
                market["korean_name"]           = CommonUtil.getKoreanName(market["market"]);   // 비트코인
                market["english_name"]          = CommonUtil.getMarketName(listData[j]);        // BTC/KRW
                market["balance"]               = listData[j]["balance"];
                market["locked"]                = listData[j]["locked"];
                market["avg_buy_price"]         = listData[j]["avg_buy_price"];
                market["low_price"]             = 0;
                market["opening_price"]         = 0;
                market["high_price"]            = 0;
                market["trade_price"]           = 0;
                market["prev_closing_price"]    = 0;
                marketData[market["market"]]    = market;
            }

            getParamMarket().then(function(data){
                logWrite("[tradeAssets][getParamMarket] - Success");
                let paramMarket = data;
                for(let i in paramMarket){
                    alreadyCoin = false;
                    targetCoin = paramMarket[i];
                    for(let j in listData){
                        // if(CommonUtil.selectMarketName(listData[j]) == paramMarket[i].market && !marketData.hasOwnProperty(paramMarket[i].market)){
                        if(CommonUtil.selectMarketName(listData[j]) == paramMarket[i].market){
                            alreadyCoin = true;
                            market = (marketData.hasOwnProperty(paramMarket[i].market)) ? marketData[paramMarket[i].market] : new Object();
                            market["isAssetsCoin"]          = true;
                            market["market"]                = CommonUtil.selectMarketName(listData[j]);  // KRW-BTC
                            market["korean_name"]           = CommonUtil.getKoreanName(CommonUtil.selectMarketName(listData[j]));                   // 비트코인
                            market["english_name"]          = CommonUtil.getMarketName(listData[j]);     // BTC/KRW
                            market["balance"]               = listData[j]["balance"];
                            market["locked"]                = listData[j]["locked"];
                            market["avg_buy_price"]         = listData[j]["avg_buy_price"];
                            market["coin_name"]             = listData[j]["currency"];
                            market["low_price"]             = 0;
                            market["opening_price"]         = 0;
                            market["high_price"]            = 0;
                            market["trade_price"]           = 0;
                            market["prev_closing_price"]    = 0;
                            marketData[market["market"]]    = market;
                            existAssets.push(market);
                            break;
                        }
                    }
                    
                    if(!alreadyCoin){
                        market = new Object();
                        market["isAssetsCoin"]          = false;
                        market["market"]                = targetCoin.market;
                        market["korean_name"]           = CommonUtil.getKoreanName(market["market"]);
                        market["english_name"]          = targetCoin.code_name;
                        market["balance"]               = 0;
                        market["locked"]                = 0;
                        market["avg_buy_price"]         = 0;
                        market["low_price"]             = 0;
                        market["opening_price"]         = 0;
                        market["high_price"]            = 0;
                        market["trade_price"]           = 0;
                        market["prev_closing_price"]    = 0;
                        market["coin_name"]             = targetCoin.coin_name;
                        marketData[market["market"]]    = market;
                    }
                }
                if(existAssets.length > 0){
                    let request = new Object();
                    request["marketStr"] = CommonUtil.getMarketArrayName(existAssets, returnString);
                    getTicker(request).then(function(data){
                        logWrite("[tradeAssets][getTicker] - Success");
                        let tickers = data;
                        for(let i in tickers){
                            marketData[tickers[i].market]["low_price"]          = tickers[i].low_price;
                            marketData[tickers[i].market]["opening_price"]      = tickers[i].opening_price;
                            marketData[tickers[i].market]["high_price"]         = tickers[i].high_price;
                            marketData[tickers[i].market]["trade_price"]        = tickers[i].trade_price;
                            marketData[tickers[i].market]["prev_closing_price"] = tickers[i].prev_closing_price;
                        }
                        resolve(marketData);
                    }).catch(function(err) {
                        logWrite("[tradeAssets][getTicker] - Error", err);
                    });
                } else {
                    resolve(marketData);
                }
            }).catch(function(err) { 
                logWrite("[tradeAssets][getParamMarket] - Error", err);
            });
        }).catch(function(err) {  
            logWrite("[tradeAssets][getHoldAssets] - Error", err);
        });
    });
}