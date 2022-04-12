const scheduler = require('node-schedule'); //모듈 
let executeQuery = require("../mysql/executor").executeQuery;
let Util = require("../util/util").CommonUtil;
let requestUrl = {
    upbitSocket: "wss://api.upbit.com/websocket/v1",
    holdAssets: "https://api.upbit.com/v1/accounts",
    orders: "https://api.upbit.com/v1/orders",
    orderChance: "https://api.upbit.com/v1/order",
    orderChance: "https://api.upbit.com/v1/order/chance",
    marketAll: "https://api.upbit.com/v1/market/all",
    ticker: "https://api.upbit.com/v1/ticker?markets=",
    dayCandles: "https://api.upbit.com/v1/candles/days?market="
}

const sellScheduler = {
    param: {
        scheduler: null,
        event: null,
        rule: null
    },
    setRule(rule) {
        this.param.rule = rule;
    },
    getRule() {
        return this.param.rule;
    },
    setEvent(event) {
        this.param.event = event;
    },
    getEvent() {
        return this.param.event;
    },
    async event() {
        Util.logWrite("[sellScheduler][event] 이벤트 실행");
        let requestData;
        requestData = new Object();
        requestData["member_id"] = 1;

        let [rows, fields] = await executeQuery("market.selectMmeberKey", requestData);
        let member = rows[0];
        Util.logWrite("[sellScheduler][event] 사용자 정보 : " + member.user_name);

        requestData = new Object();
        requestData["accessKey"] = member.access_key;
        requestData["secretKey"] = member.secret_key;
        Util.logWrite("[sellScheduler][event] 사용자 토큰 정보 : " + Util.createToken(requestData));

        requestData["method"] = "GET";
        requestData["callUrl"] = requestUrl.holdAssets;
        let holdAssets = await Util.callMethod(requestData);

        console.log(holdAssets);

    },
    start() {
        Util.logWrite("[sellScheduler][start] 이벤트 시작");
        this.param.scheduler = scheduler.scheduleJob(this.param.rule, function () {
            sellScheduler.event();
        });
    },
    stop() {
        Util.logWrite("[sellScheduler][stop] 이벤트 중지");
        scheduler.cancelJob(this.param.scheduler);
    },
    restart() {
        Util.logWrite("[sellScheduler][restart] 이벤트 재시작");
        scheduler.rescheduleJob(this.param.scheduler, this.param.rule);
    },
    destroy() {
        Util.logWrite("[sellScheduler][destroy] 이벤트 삭제");
        scheduler.cancelJob(this.param.scheduler);
        this.param.scheduler = null;
        this.param.event = null;
        this.param.rule = null;
    }
}
module.exports = {
    sellScheduler: sellScheduler
};
/*
* * * * * *
[0]* second      (0 ~ 59) Optional
[1]* minute      (0 ~ 59)
[2]* hour        (0 ~ 23)
[3]* day of month(1 ~ 31)
[4]* month       (1 ~ 12)
[5]* day of week (0 ~ 7)

scheduleJob : 스케줄 생성, cancelJob : 스케줄 중지, rescheduleJob : 스케줄 재실행

*/

