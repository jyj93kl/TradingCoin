console.log(new Date().toLocaleString() + '[buyScheduler] 생성');
const scheduler = require('node-schedule'); //모듈 
const buyScheduler = {
    param : {
        scheduler   : null,
        rule        : "*/1 * * * * *"
    },
    start() {
        console.log(new Date().toLocaleString() + '[buyScheduler] 스케줄링 실행');
        this.param.scheduler = scheduler.scheduleJob(this.param.rule, function(){
        });
    },
    stop() {
        console.log(new Date().toLocaleString() + '[buyScheduler] 스케줄링 중지');
        scheduler.cancelJob(this.param.scheduler);
    },
    restart() {
        console.log(new Date().toLocaleString() + '[buyScheduler] 스케줄링 재시작');
        scheduler.rescheduleJob(this.param.scheduler, this.param.rule);
    }
}
module.exports = {
    buyScheduler : buyScheduler
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