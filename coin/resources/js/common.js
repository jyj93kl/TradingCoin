const CommonUtil = {
    sendMessage : function(sc, method, url, request, callback){
        if(callback != null){
            sc.getSocket().off(url).on(url, callback);
        }
        console.log("==== send socket ====", sc.param.desc);
        console.log("==== send method ====", method);
        console.log("==== send url ====", url);
        console.log("==== send request ====", request);
        /* request push method */
        request["method"] = method;
        sc.getSocket().emit(url, JSON.stringify(request));
    },
    getYield : function(nowMarket,assets){
        return new Number( ( (assets.balance * nowMarket.trade_price) / (assets.balance * assets.avg_buy_price) ) * 100 - 100 ).toFixed(2);  
    },
    getMarketName : function(nowMarket){
        return nowMarket.market ? nowMarket.market : nowMarket.currency + "/" + nowMarket.unit_currency;
    },
    transMarketName : function(market){
        return market.split("/")[1] + "-" + market.split("/")[0];
    },
    selectMarketName : function(nowMarket){
        return nowMarket.market ? nowMarket.market : nowMarket.unit_currency + "-" + nowMarket.currency;
    }
}

//console.logCopy = console.log.bind(console);
//console.log = function(data){
//    var currentDate = "[" + new Date().toUTCString() + "] ";
//    this.logCopy(currentDate, data);
//}