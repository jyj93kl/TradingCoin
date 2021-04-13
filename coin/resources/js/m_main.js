let $Global = new Object();
let totalAssetsMoney = 0;
let totalBalanceMoney = 0;
window.onload = function (){
    load('../resources/modules/sharedObject.js').then(function(module){
        $Global["serverMessage"] = module.serverMessage;
        initializeApplication();
    });
}

function initializeApplication(){
    document.getElementById("refreshAssets").addEventListener("click", () => {
        initAssets();
    })
    initializeComponentData();
}

function initializeComponentData(){
    serverSocket.initialize();
    bitSocket.initialize();

    initUidv4();
    initAssets();
}
function initUidv4(){
    let request = new Object();
    getUuidv4(request).then(function(data){
        $Global["uniqueTicket"] = data;
        logWrite("범용 고유 식별자 발급 - " + data);
    }).catch(function(err) {
        logWrite("범용 고유 식별자 발급 오류 발생", err);
    });
}

function logWrite(msg, object){
    let logContainer = document.getElementById("scriptContainer");
    let logWrite = document.createElement("pre");
    logWrite.classList = "log_write";

    if(object != undefined){
        logWrite.innerHTML = "<span style='opacity: 0.4;'>[" + new Date().toLocaleString() + "]</span> - " + msg + enter + ((typeof(object) == "object") ? JSON.stringify(object, null, '\t') : object); 
    } else {
        logWrite.innerHTML = "<span style='opacity: 0.4;'>[" + new Date().toLocaleString() + "]</span> - " + msg; 
    }
    logContainer.appendChild(logWrite);
    document.querySelector(".log_write:last-child").scrollIntoView();
}

/* 보유 자산 조회 */
function initAssets(){
    totalAssetsMoney = 0;
    let request = new Object();
    getHoldAssets(request).then((data) => {
        /* 로그 작업 */
        logWrite("보유 자산 내역 조회", data);
        /* 화면 드로잉 */
        let template = "";
        for(key in data) {
            if(data[key].currency !== "KRW") {
                template += createCrypto(data[key]);
            } else {
                document.getElementById("totalKRW").innerHTML = '<i class="fas fa-won-sign"></i> ' + Math.round(data[key].balance).toLocaleString();
                totalBalanceMoney = data[key].balance;
                totalAssetsMoney += Math.round(totalBalanceMoney);
            }
        }
        document.getElementsByClassName("assets-crypto_lists")[0].innerHTML = template;
        document.getElementById("totalAssetsMoney").innerHTML = Math.round(totalAssetsMoney).toLocaleString();
        document.getElementById("totalAssets").innerHTML = ' <i class="fab fa-cuttlefish"></i> ' + Math.round(totalAssetsMoney - totalBalanceMoney).toLocaleString();
    }).catch(function(err) {
        logWrite("보유 자산 내역 조회 오류 발생", err);
    });
}

function createCrypto(list) {
    let balance = new Number(list.balance).toLocaleString(undefined, { maximumFractionDigits: 8 });
    let template = `
    <div class="assets-crypto_item">
        <div class="crypto_img">
            <img src="https://static.upbit.com/logos/${list.currency}.png" alt="BTC Logo" />
        </div>
        <div class="crypto_desc">
            <p class="crypto_name">${list.currency}/${list.unit_currency}</p>
            <p class="crypto_price">${new Number(list.avg_buy_price).toLocaleString()}</p>
        </div>
        <div class="crypto_volumn">
            <p>amount</p>
            <span>${balance}</span>
        </div>
    </div>
    `;
    totalAssetsMoney += (+list.avg_buy_price * balance);
    return template;
}