function tradingCoinBot(){
    let request = new Object();
    tradeAssets(request).then(function(data){
        logWrite("[tradingCoinBot][tradeAssets] - 보유 자산 조회");
        let marketData = data;
        let existAssets = new Array();
        let notExistAssets = new Array();
        for(let key in marketData) {
            if(marketData[key]["isAssetsCoin"]){
                existAssets.push(marketData[key]);
            } else {
                notExistAssets.push(marketData[key]);
            }
        }
        
        logWrite("existAssets", existAssets);
        logWrite("notExistAssets", notExistAssets);
        /* 미보유 매수 */
        notExistAssetsBuy(notExistAssets);
        /* 평균 단가 기준 수익률 기준 +10% 이상 매도 && 평균 단가 기준 수익률 기준 -5% 이하 매수 */
        lowAndHighAssets(existAssets);
    }).catch(function(err) {
        console.log(err);
        logWrite("[tradingCoinBot][tradeAssets] - 보유 자산 조회 오류 발생", err);
    });
}

function lowAndHighAssets(existAssets){
    let highAssets = new Array();
    let lowAssets = new Array();
    let waitAssets = new Array();
    let price,prevPrice;
    for(let i in existAssets) {
        price = CommonUtil.getAssetsYield(existAssets[i]);
        prevPrice = CommonUtil.getPrevAssetsYield(existAssets[i]);
        // logWrite(existAssets[i].market +", price : " + price +", prevPrice : " + prevPrice);
        if(price >= 10 || (prevPrice >= 15 && price >= 8)){/* 수익률 10% 이상 or 전일 대비 15이상 and 수익률 8% 이상 */
            highAssets.push(existAssets[i]);
        } else if(price <= -8 || prevPrice <= -10){ /* 전일 대비 -8%이하 and 진입가 대비 10%마다 1회 and 수익률 -10%이하 */
            lowAssets.push(existAssets[i]);
        } else {
            waitAssets.push(existAssets[i]);
        }
    }
    /* 수익률 10% 이상 or 전일 대비 15이상 and 수익률 8% 이상 매도 */
    highAssetsSell(highAssets);
    /* 전일 대비 -8%이하 and 진입가 대비 10%마다 1회 and 수익률 -10% 이하 매수 */
    lowAssetsBuy(lowAssets);
            
    logWrite("[lowAndHighAssets] - 변화 정보 없음");
    for(key in waitAssets) {
        logWrite("[lowAndHighAssets] - 코인 정보 - " + CommonUtil.getMarketName(waitAssets[key]));
    }
    logWrite("[lowAndHighAssets] - 변화 정보 없음");
}

/* 미보유 매수 */
function notExistAssetsBuy(assets){
    logWrite("[notExistAssetsBuy] - 미보유 매수 시작");
    for(let key in assets) {
        orderTarget(assets[key], marketBuy);        
    }
    logWrite("[notExistAssetsBuy] - 미보유 매수 종료");
}

/* 평단가 기준 예약 매도(22%) */
function bestAssetsSell(){

}

/* 
    1차. 평균 단가 기준 수익률 기준 +10% 이상 매도 
    2차. 수익률 10% 이상 or 전일 대비 15이상 and 수익률 8% 이상 매도
*/
function highAssetsSell(assets){
    logWrite("[highAssetsSell] - 수익률 10% 이상 or 전일 대비 15이상 and 수익률 8% 이상 매도 시작");
    for(let key in assets) {
        orderTarget(assets[key], marketSell);        
    }
    logWrite("[highAssetsSell] - 수익률 10% 이상 or 전일 대비 15이상 and 수익률 8% 이상 매도 종료");
}

/* 
    1차. 평균 단가 기준 수익률 기준 -5% 이하 매수 
    2차. 전일 대비 -8%이하 and 진입가 대비 10%마다 1회 and 수익률 -10%이하    
*/
function lowAssetsBuy(assets){
    logWrite("[lowAssetsBuy] - 전일 대비 -8%이하 and 진입가 대비 10%마다 1회 and 수익률 -10%이하 시작");
    for(let key in assets) {
        orderTarget(assets[key], marketBuy);        
    }
    logWrite("[lowAssetsBuy] - 전일 대비 -8%이하 and 진입가 대비 10%마다 1회 and 수익률 -10%이하 종료");
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
    
     
    logWrite("[orderTarget] - " + (((type == 0) ? "<span class='log_buy'>매수</span>" : "<span class='log_sell'>매도</span>")) + " " + marketName + ", 수익률" + CommonUtil.getAssetsYield(marketData) + ", 전일 대비 수익률 : " + CommonUtil.getPrevAssetsYield(marketData));
    // orderMarket(orderData);
} 

/* 시장가 매수,매도 함수 */
function orderMarket(orderData){
    let request = new Object();
    request["queryString"] = orderData;
    logWrite("시장가 매수,매도 API 데이터", request);
    // postOrders(request).then(function(data){
    //     logWrite("[orderMarket][postOrders] - 시장가 매수 매도 API" + data);
    // }).catch(function(err) {
    //     logWrite("[orderMarket][postOrders] - 시장가 매수 매도 API 오류 발생", err);
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

    logWrite("[initOrders] - 주문 리스트 가져오기 데이터", request);
    getOrders(request).then(function(data){
        logWrite("[initOrders][getOrders] - 주문 리스트 가져오기", data);
    }).catch(function(err) {
        logWrite("[initOrders][getOrders] - 주문 리스트 가져오기 오류 발생", err);
    });
}

/* 주문 취소하기 */
function deleteOrders(uuid){
    let orderData = new Object();
    orderData["uuid"] = uuid;

    let request = new Object();
    request["queryString"] = orderData;
    
    logWrite("[deleteOrders] - 주문 취소하기 데이터", request);
    deleteOrder(request).then(function(data){
        logWrite("[deleteOrders][deleteOrder] - 주문 취소하기", data);
    }).catch(function(err) {
        logWrite("[deleteOrders][deleteOrder] - 주문 취소하기 오류 발생", err);
    });
}