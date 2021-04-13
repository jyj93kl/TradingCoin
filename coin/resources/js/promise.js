/* 
    https://api.upbit.com/v1/accounts
    전체 계좌 조회 - GET
*/
function getHoldAssets(request) {
    if(request != undefined){
        request["callUrl"] = requestUrl.holdAssets;
    } else {
        let request = new Object();
        request["callUrl"] = requestUrl.holdAssets;
    }
    return new Promise(function(resolve, reject) {
        CommonUtil.sendMessage(serverSocket, "GET", $Global["serverMessage"].holdAssets, ((request == undefined) ? new Object() : request), function(data) {
            let response = JSON.parse(data);
            if(response.result == -1){
                reject(JSON.parse(response.data));
            } else {
                resolve(JSON.parse(response.data));
            }
        });
    });
}
/* 
    https://api.upbit.com/v1/orders/chance
    주문 가능 정보 GET
*/
function getOrderChance(request){
    if(request != undefined){
        request["callUrl"] = requestUrl.orderChance;
    } else {
        let request = new Object();
        request["callUrl"] = requestUrl.orderChance;
    }
    return new Promise(function(resolve, reject) {
        CommonUtil.sendMessage(serverSocket, "GET", $Global["serverMessage"].orderChance, ((request == undefined) ? new Object() : request), function(data) {
            let response = JSON.parse(data);
            if(response.result == -1){
                reject(JSON.parse(response.data));
            } else {
                resolve(JSON.parse(response.data));
            }
        });
    });
}
/* 
    https://api.upbit.com/v1/orders
    주문하기 - POST
    주문 리스트 조회 - GET
*/
function getOrders(request) {
    if(request != undefined){
        request["callUrl"] = requestUrl.orders + "?" + $.param(request["queryString"]);
    } else {
        let request = new Object();
        request["callUrl"] = requestUrl.orders + "?" + $.param(request["queryString"]);
    }
    return new Promise(function(resolve, reject) {
        CommonUtil.sendMessage(serverSocket, "GET", $Global["serverMessage"].orders, ((request == undefined) ? new Object() : request), function(data) {
            let response = JSON.parse(data);
            if(response.result == -1){
                reject(JSON.parse(response.data));
            } else {
                resolve(response.data);
            }
        });
    });
}

function postOrders(request) {
    if(request != undefined){
        request["callUrl"] = requestUrl.orders;
    } else {
        let request = new Object();
        request["callUrl"] = requestUrl.orders;
    }
    request["type"] = 1;

    return new Promise(function(resolve, reject) {
        CommonUtil.sendMessage(serverSocket, "POST", $Global["serverMessage"].orders, ((request == undefined) ? new Object() : request), function(data) {
            let response = JSON.parse(data);
            if(response.result == -1){
                reject(JSON.parse(response.data));
            } else {
                resolve(JSON.parse(response.data));
            }
        });
    });
}
/*
    https://api.upbit.com/v1/order
    주문취소 - DELETE
    개별 주문 조회 - GET
*/
function getOrder(request) {
    if(request != undefined){
        request["callUrl"] = requestUrl.order;
    } else {
        let request = new Object();
        request["callUrl"] = requestUrl.order;
    }
    return new Promise(function(resolve, reject) {
        CommonUtil.sendMessage(serverSocket, "GET", $Global["serverMessage"].order, ((request == undefined) ? new Object() : request), function(data) {
            let response = JSON.parse(data);
            if(response.result == -1){
                reject(JSON.parse(response.data));
            } else {
                resolve(JSON.parse(response.data));
            }
        });
    });
}
function deleteOrder(request) {
    if(request != undefined){
        request["callUrl"] = requestUrl.order + "?" + $.param(request["queryString"]);
    } else {
        let request = new Object();
        request["callUrl"] = requestUrl.order + "?" + $.param(request["queryString"]);
    }
    request["type"] = 1;
    return new Promise(function(resolve, reject) {
        CommonUtil.sendMessage(serverSocket, "DELETE", $Global["serverMessage"].order, ((request == undefined) ? new Object() : request), function(data) {
            let response = JSON.parse(data);
            if(response.result == -1){
                resolve(response.data);
            } else {
                resolve(response.data);
            }
        });
    });
}
/*
    https://api.upbit.com/v1/market/all
    마켓 전체 조회 - GET
*/
function getMarketAll(request) {
    if(request != undefined){
        request["callUrl"] = requestUrl.marketAll;
    } else {
        let request = new Object();
        request["callUrl"] = requestUrl.marketAll;
    }
    return new Promise(function(resolve, reject) {
        CommonUtil.sendMessage(serverSocket, "GET", $Global["serverMessage"].marketAll, ((request == undefined) ? new Object() : request), function(data) {
            let response = JSON.parse(data);
            if(response.result == -1){
                reject(JSON.parse(response.data));
            } else {
                resolve(JSON.parse(response.data));
            }
        });
    });
}
/*
    https://api.upbit.com/v1/ticker?markets=KRW-BTC
    마켓 선택 조회 - GET
*/
function getTicker(request) {
    if(request != undefined){
        request["callUrl"] = requestUrl.ticker + request["marketStr"];
    } else {
        let request = new Object();
        request["callUrl"] = requestUrl.ticker + request["marketStr"];
    }
    return new Promise(function(resolve, reject) {
        CommonUtil.sendMessage(serverSocket, "GET", $Global["serverMessage"].ticker, ((request == undefined) ? new Object() : request), function(data) {
            let response = JSON.parse(data);
            console.log(response);
            if(response.result == -1){
                reject(JSON.parse(response.data));
            } else {
                resolve(JSON.parse(response.data));
            }
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
