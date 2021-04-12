const CommonUtil = {
    sendMessage : function(sc, method, url, request, callback){
        if(callback != null){
            sc.getSocket().off(url).on(url, callback);
        }
        console.log("==== send socket ====", sc.param.desc);
        console.log("==== send method ====", method);
        console.log("==== send url ====", url);
        console.log("==== send request ====", request);
        sc.getSocket().emit(url, JSON.stringify(request));
    },
    getYield : function(nowMarket,assets){
        return new Number( ( (assets.balance * nowMarket.trade_price) / (assets.balance * assets.avg_buy_price) ) * 100 - 100 ).toFixed(2);  
    }
}

//console.logCopy = console.log.bind(console);
//console.log = function(data){
//    var currentDate = "[" + new Date().toUTCString() + "] ";
//    this.logCopy(currentDate, data);
//}
