let $Global = new Object();
window.onload = function (){
    load('../resources/modules/sharedObject.js').then(function(module){
        $Global["message"] = module.sharedObject;
        initializeApplication();
    });
}

function initializeApplication(){
//    console.log("initializeApplication start");
    initializeComponent();
    initializeComponentData();
    initializeBindEvent();
}

function initializeComponent(){
//    console.log("initializeComponent start");
}

function initializeBindEvent(){
//    console.log("initializeComponent start");
    document.getElementById("selectBtn").addEventListener("click", function(e){
        document.getElementById("container").innerHTML = ""
        selectAccounts();
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

/* Upbit API 호출 구간 START */

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
/* Upbit API 호출 구간 END */

/* 선택 코인 선정 */
/*
    예시 함수 
*/
function orderTarget(marketData, type){
    /* 
        시장가 매수 시 volume null 
        시장가 매도 시 price null 
    */
    let orderData = new Object();
    orderData["market"] = marketData.market;
    orderData["side"] = (type == 0) ? "bid" : "ask";
    orderData["volume"] = (type == 0) ? null : marketData.balance;
    orderData["price"] = (type == 0) ? buyPrice : null;
    orderData["ord_type"] = (type == 0) ? "price" : "market";
    orderData["identifier"] = $Global["uniqueTicket"];
    orderMarket(orderData);
}

/* 시장가 매수,매도 */
function orderMarket(orderData){
    let request = new Object();
    request["method"] = "POST";
    request["type"] = 1;
    request["callUrl"] = upbitUrl.marketOrder;
    request["queryString"] = orderData;
    CommonUtil.sendMessage(serverSocket, "POST", $Global["message"].marketOrder, request, function(data){
        let response = JSON.parse(data);
        console.log(response);
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

let enter = "\n";
function initAccounts(data){
    let list = JSON.parse(data), button, $container = document.getElementById("container");
    console.log("initAccounts list", list);
    $container.append("보유 자산 내역" + enter);
    for(let i = 0 ; i < list.length; i++) {
        $container.append(list[i].unit_currency 
            + "-" + list[i].currency 
            + " : " + list[i].balance 
            + ", 평균 단가 : " + list[i].avg_buy_price
            + ". 총 매수 금액 : " + Math.round((list[i].balance * list[i].avg_buy_price)).toLocaleString()
        );
        button = document.createElement("button")
        button.innerHTML = list[i].currency + " 시장가 매수";
        button.addEventListener("click", function(e){
            if(confirm("진짜살거임?")){
                console.log("삼");
                orderData = new Object();
                orderData["market"] = list[i].unit_currency + "-" + list[i].currency;
                orderData["side"] = "bid";
                orderData["volume"] = null;
                orderData["price"] = buyPrice;
                orderData["ord_type"] = "price";
                orderData["identifier"] = $Global["uniqueTicket"];
                console.log("orderData", orderData);
            } else {
                console.log("안삼");
            }
        });

        $container.appendChild(button);
        button = document.createElement("button")
        button.innerHTML = list[i].currency + " 시장가 매도";
        button.addEventListener("click", function(e){
            if(confirm("진짜팔거임?")){
                console.log("팜");
                orderData = new Object();
                orderData["market"] = list[i].unit_currency + "-" + list[i].currency;
                orderData["side"] = "ask";
                orderData["volume"] =  list[i].balance;
                orderData["price"] = null;
                orderData["ord_type"] = "market";
                orderData["identifier"] = $Global["uniqueTicket"];
                console.log("orderData", orderData);
//                orderMarket(orderData);
            } else {
                console.log("안팜");
            }
        });
        $container.appendChild(button);

        button = document.createElement("button")
        button.innerHTML = list[i].currency + " 현재 금액 조회";
        button.addEventListener("click", function(e){ 
            selectMarketOne(list[i])
        });
        $container.appendChild(button);

        $container.appendChild(button);
        $container.append(enter);
           
    }
}
/* 선택 코인 조회 */
function selectMarketOne(market){
    let request = new Object();
    request["method"] = "GET";
    request["callUrl"] = upbitUrl.selectMarket + market.unit_currency + "-" + market.currency;

    console.log("selectMarketOne request", request);
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
    let list = JSON.parse(data)
    let marketData = list[0];
    console.log("initMarket",marketData);

    document.getElementById("container").append(
    "조회 정보 : " + marketData.market +
    ", 시가 : " + marketData.opening_price + 
    ", 저가 : " + marketData.low_price + 
    ", 고가 : " + marketData.high_price + 
    ", 현재가 : " + marketData.trade_price + 
    ", 수익률 : " + new Number( ( (assets.balance * marketData.trade_price) / (assets.balance * assets.avg_buy_price) ) * 100 - 100 ).toFixed(2)
    + enter);
        
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
                if(confirm("진짜살거임?")){
                    console.log("삼");
                    orderData = new Object();
                    orderData["market"] = market[j].market;
                    orderData["side"] = "bid";
                    orderData["volume"] = null;
                    orderData["price"] = buyPrice;
                    orderData["ord_type"] = "price";
                    orderData["identifier"] = $Global["uniqueTicket"];
                    //orderMarket(orderData);
                } else {
                    console.log("안삼");
                }
            });
            $container.appendChild(button);
            $container.append(enter);

        }
    });
}
