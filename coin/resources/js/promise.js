/* 
    https://api.upbit.com/v1/accounts
    전체 계좌 조회 - GET
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
            (response.result == -1) ? reject(JSON.parse(response.data)) : resolve(JSON.parse(response.data));
        });
    });
}

function postOrders(request) {
    let requestData = (request != undefined) ? request : new Object();
    requestData["callUrl"] = requestUrl.orders;
    requestData["type"] = 1;

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
            (response.result == -1) ? reject(JSON.parse(response.data)) : resolve(JSON.parse(response.data));
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
*/
function getParamMarket() {
    return new Promise(function(resolve, reject) {
        resolve(market);
    });
}
