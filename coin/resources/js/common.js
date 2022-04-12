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
        if(url.indexOf("upbit/") != -1){
            request["method"] = method;
        }
        sc.getSocket().emit(url, JSON.stringify(request));
    },
    getYield : function(nowMarket,assets){
        let yield = new Number( ( (assets.balance * nowMarket.trade_price) / (assets.balance * assets.avg_buy_price) ) * 100 - 100 ).toFixed(2); 
        return isNaN(yield) ? 0 : yield;
    },
    getAssetsYield : function(assets){  // 현재 수익률
        let yield = new Number( ( (assets.balance * assets.trade_price) / (assets.balance * assets.avg_buy_price) ) * 100 - 100 ).toFixed(2);  
        return isNaN(yield) ? 0 : yield;
    },
    getPrevAssetsYield : function(assets){  // 전일 대비 수익률
        let yield = new Number( ( (assets.balance * assets.prev_closing_price) / (assets.balance * assets.avg_buy_price) ) * 100 - 100 ).toFixed(2); 
        return isNaN(yield) ? 0 : yield;
    }, 
    getMarketName : function(nowMarket){
        return nowMarket.market ? nowMarket.market : nowMarket.currency + "/" + nowMarket.unit_currency;
    },
    transMarketName : function(market){
        return market.split("/")[1] + "-" + market.split("/")[0];
    }, 
    selectMarketName : function(nowMarket){
        return nowMarket.market ? nowMarket.market : nowMarket.unit_currency + "-" + nowMarket.currency;
    },
    getKoreanName : function (name){
        switch(name){
            case "KRW-STORJ"    : return "스토리지";
            case "KRW-DMT"      : return "디마켓";
            case "KRW-CHZ"      : return "칠리즈";
            case "KRW-PLA"      : return "플레이댑";
            case "KRW-OMG"      : return "오미세고";
            case "KRW-TRX"      : return "트론";
            case "KRW-BORA"     : return "보라";
            case "KRW-PCI"      : return "페이코인";
            case "KRW-PUNDIX"   : return "펀디엑스";
            case "KRW-TT"       : return "썬더토큰";
            
            case "KRW-BTC"       : return "비트코인";
            case "KRW-BCH"       : return "비트코인캐시";
            case "KRW-BTG"       : return "비트코인골드";
            case "KRW-BCHA"      : return "비트코인캐시에이비씨";
            case "KRW-XEM"       : return "넴";
            case "KRW-DON"       : return "돈";
            case "KRW-XYM"       : return "심볼";
            case "KRW-GRT"       : return "그래프";
            case "KRW-KRW"       : return "원화";
            case "KRW-ETH"       : return "이더리움";
            case "KRW-RFR"       : return "리퍼리움";
            case "KRW-SNT"       : return "스테이터스네트워크토큰";
            case "KRW-DOGE"      : return "도지";
            case "KRW-XRP"       : return "리플";
            case "KRW-BTT"       : return "비트토렌트";
            case "KRW-STRK"      : return "스트라이크";
            
            default              : return null;
        }
    },
    getMarketArrayName : function (list, isArray){
        let marketArr  = new Array();
        for(let i = 0 ; i < list.length; i++){
            marketArr.push(list[i].market);
        } 
        return (isArray) ? marketArr : marketArr.toLocaleString();
    }
}
