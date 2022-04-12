let $Global = new Object();
window.onload = function () {
    load('../resources/modules/sharedObject.js').then(function (module) {
        $Global["serverMessage"] = module.serverMessage;
        initializeApplication();
    });
}

function initializeApplication() {
    // logWrite("initializeApplication");
    initializeComponent();
    initializeComponentData();
    initializeBindEvent();
}

function initializeComponent() {
    // logWrite("initializeComponent");

    createAssetsDonutChart();
}

function initializeBindEvent() {
    // logWrite("initializeComponent");
    document.getElementsByClassName("log-toggle_button")[0].addEventListener("click", function (e) {
        let $scriptContainer = document.getElementById("scriptContainer");
        $scriptContainer.classList = ($scriptContainer.classList == "log_close") ? "" : "log_close";
    })
}

function initializeComponentData() {
    serverSocket.initialize();
    bitSocket.initialize();

    initUidv4();
    initAssets();
    setTimeout(() => {
        initAssetsMarketUsedTrade();
    }, 1000);
    // initMySQL();
}

function initUidv4() {
    let request = new Object();
    getUuidv4(request).then(function (data) {
        $Global["uniqueTicket"] = data;
        logWrite("[initUidv4][getUuidv4] - 범용 고유 식별자 발급 - " + data);
    }).catch(function (err) {
        logWrite("[initUidv4][getUuidv4] - 범용 고유 식별자 발급 오류 발생", err);
    });
}

/* 보유 자산 조회 */
function initAssets() {
    let request = new Object();
    tradeAssets(request).then(function (data) {
        let listData = data;
        let $cryptos = document.getElementById("cryptos");
        /* 로그 작업 */
        logWrite("[initAssets][tradeAssets] - 보유 자산 조회");
        let assetsKrw = 0;                                              // 보유 KRW
        let totalSum = 0;                                               // 총 보유 자산
        let totalPrice = 0;                                             // 총 매수 금액
        let totalBenefitPrice = 0;                                      // 총 평가 금액
        let totalBenefit = 0;                                           // 총 평가 손익
        let totalYield = 0;                                             // 총 평가 수익률
        let balance, avg_buy_price, trade_price, market;
        for (key in listData) {
            market = listData[key], balance = new Number(market.balance), avg_buy_price = new Number(market.avg_buy_price), trade_price = new Number(market.trade_price);
            if (market.market == "KRW-KRW") {
                assetsKrw += balance;
                continue;
            }
            if (!market.isAssetsCoin) continue;

            totalPrice += balance * avg_buy_price;                      // 기존 총 매수 금액 + 해당 코인의 보유 수량 * 평균 단가
            totalBenefitPrice += balance * trade_price                  // 기존 총 평가 금액 + 해당 코인의  보유 수량 * 현재가

            logWrite("[initAssets][tradeAssets] - " +
                "코인 : " + listData[key]["english_name"] +
                ", 시가 : " + listData[key]["opening_price"] +
                ", 저가 : " + listData[key]["low_price"] +
                ", 고가 : " + listData[key]["high_price"] +
                ", 현재가 : " + listData[key]["trade_price"] +
                ", 수익률 : " + CommonUtil.getAssetsYield(listData[key]))
        }

        totalBenefit = totalBenefitPrice - totalPrice;                  // 총 평가 금액 - 총 매수 금액
        totalYield = ((totalBenefitPrice / totalPrice) * 100) - 100;    // ((총 평가 금액 / 총 매수 금액) * 100) - 100
        totalSum = assetsKrw + totalBenefitPrice;                       // 보유 KRW + 총 평가 금액

        for (key in listData) {
            listData[key]["chargePercent"] = ((new Number(listData[key]["balance"]) * new Number(listData[key]["trade_price"])) / totalSum) * 100;
        }
        logWrite("보유 KRW :" + Math.round(assetsKrw).toLocaleString());
        logWrite("총 보유 자산 :" + Math.round(totalSum).toLocaleString());
        logWrite("총 매수 금액 :" + Math.round(totalPrice).toLocaleString());
        logWrite("총 평가 금액 :" + Math.round(totalBenefitPrice).toLocaleString());
        logWrite("총 평가 손익 :" + Math.round(totalBenefit).toLocaleString());
        logWrite("총 평가 수익률 :" + new Number(totalYield).toFixed(2));

        initAssetsKrw({ assetsKrw: assetsKrw, totalSum: totalSum, totalPrice: totalPrice, totalBenefitPrice: totalBenefitPrice, totalBenefit: totalBenefit, totalYield: totalYield });
        updateAssetsDonutChart(listData);

        /* 화면 초기화 */
        // document.getElementById("cryptos").innerHTML = ""
        /* 화면 드로잉 */
        // for(key in listData) {
        // $cryptos.append(createCrypto(listData[key]));
        // }



    }).catch(function (err) {
        console.log(err);
        logWrite("[initAssets][tradeAssets] - 보유 자산 조회 오류 발생", err);
    });
}

function createCrypto(market) {
    let airDrop = (market.isAssetsCoin && market.avg_buy_price == 0) ? true : false;
    let $crypto = document.createElement("div");
    $crypto.classList = "crypto";

    let $name = document.createElement("h4");
    $name.innerHTML = market.korean_name + "(" + market.english_name + ")" + ((market.isAssetsCoin) ? "" : " [미보유]");
    let $sellType = document.createElement("div");
    $sellType.classList = "sell_type";
    let $radio = document.createElement("input");
    $radio.type = "radio";
    $radio.checked = "checked";
    $sellType.append($radio);
    $sellType.append("시장");

    let $amount = document.createElement("div");
    $amount.classList = "amount";
    if (market.isAssetsCoin) {
        let $dl = document.createElement("dl");
        let $dt = document.createElement("dt");
        let $dd = document.createElement("dd");

        $dt.innerHTML = "보유수량";
        $dd.innerHTML = market.balance;
        $dl.append($dt);
        $dl.append($dd);

        $dt = document.createElement("dt");
        $dd = document.createElement("dd");
        $dt.innerHTML = "매수평균가";
        $dd.innerHTML = new Number(market.avg_buy_price).toFixed(2);
        $dl.append($dt);
        $dl.append($dd);

        $dt = document.createElement("dt");
        $dd = document.createElement("dd");
        $dt.innerHTML = "매수금액";
        $dd.innerHTML = Math.round((market.balance * market.avg_buy_price)).toLocaleString();
        $dl.append($dt);
        $dl.append($dd);

        $dt = document.createElement("dt");
        $dd = document.createElement("dd");
        $dt.innerHTML = "수익률";
        $dd.innerHTML = CommonUtil.getAssetsYield(market);
        $dl.append($dt);
        $dl.append($dd);

        $amount.append($dl);
    }

    $crypto.append($name);
    $crypto.append($sellType);
    $crypto.append($amount);

    if (market.market != "KRW-KRW" && !airDrop) {
        button = document.createElement("button")
        // button.innerHTML = list[i].currency + " 시장가 매수";
        button.innerHTML = "매수";
        button.classList = "round_button buy"
        button.addEventListener("click", function (e) {
            if (confirm("누르면 정말 사짐")) {
                orderData = new Object();
                orderData["market"] = market.market;
                orderData["side"] = "bid";
                orderData["volume"] = null;
                orderData["price"] = buyPrice;
                orderData["ord_type"] = "price";
                orderData["identifier"] = $Global["uniqueTicket"];
                orderTarget(orderData, marketBuy);
            } else {
                logWrite("<span class='log_buy'>매수 취소</span> : " + market.market);
            }
        });
        $crypto.append(button);
    }

    if (market.isAssetsCoin && market.market != "KRW-KRW" && !airDrop) {
        button = document.createElement("button");
        // button.innerHTML = list[i].currency + " 시장가 매도";
        button.innerHTML = "매도";
        button.classList = "round_button sell"
        button.addEventListener("click", function (e) {
            if (confirm("누르면 정말 팔림")) {
                orderData = new Object();
                orderData["market"] = market.market;
                orderData["side"] = "ask";
                orderData["volume"] = market.balance;
                orderData["price"] = null;
                orderData["ord_type"] = "market";
                orderData["identifier"] = $Global["uniqueTicket"];
                orderTarget(orderData, marketSell);
            } else {
                logWrite("<span class='log_sell'>매도 취소</span> : " + market.market);
            }
        });
        $crypto.append(button);
    }

    if (market.market != "KRW-KRW" && !airDrop) {
        button = document.createElement("button")
        button.classList = "round_button search";
        button.innerHTML = "조회";
        button.addEventListener("click", function (e) {
            initAssetsOne(market)
        });
        $crypto.append(button);
    }

    return $crypto;
}

function initAssetsOne(assets) {
    let request = new Object();
    request["marketStr"] = CommonUtil.getMarketName(assets);
    getTicker(request).then(function (data) {
        let listData = data;
        let marketOne = listData[0];
        if (marketOne != undefined) {
            logWrite("[initAssetsOne][getTicker] " +
                "코인 : " + CommonUtil.getMarketName(marketOne) +
                ", 시가 : " + marketOne.opening_price +
                ", 저가 : " + marketOne.low_price +
                ", 고가 : " + marketOne.high_price +
                ", 현재가 : " + marketOne.trade_price +
                ((assets.balance != undefined) ? ", 수익률 : " + CommonUtil.getYield(marketOne, assets) : ""))
        } else {
            logWrite("[initAssetsOne][getTicker] - 조회 불가 정보 : " + CommonUtil.getMarketName(assets));
        }
    }).catch(function (err) {
        logWrite("[initAssetsOne][getTicker] - 코인 정보 조회 오류 발생", err);
    });
}

/* 로그 이력 남기기 */
function logWrite(msg, object) {
    let logContainer = document.getElementById("scriptContainer");
    let logWrite = document.createElement("pre");
    logWrite.classList = "log_write";

    if (object != undefined) {
        logWrite.innerHTML = "<span style='opacity: 0.4;'>[" + new Date().toLocaleString() + "]</span> - " + msg + enter + ((typeof (object) == "object") ? JSON.stringify(object, null, '\t') : object);
    } else {
        logWrite.innerHTML = "<span style='opacity: 0.4;'>[" + new Date().toLocaleString() + "]</span> - " + msg;
    }
    logContainer.appendChild(logWrite);
    document.querySelector(".log_write:last-child").scrollIntoView();
}

/* 주문 리스트 가져오기 */
function initOrders(market) {
    let orderData = new Object();
    if (market != undefined) {
        orderData["market"] = CommonUtil.getMarketName(market);
    }
    orderData["state"] = "wait";

    let request = new Object();
    request["callUrl"] = requestUrl.orders + "?" + $.param(orderData);
    request["queryString"] = orderData;

    logWrite("[initOrders] - 주문 리스트 가져오기 데이터", request);
    getOrders(request).then(function (data) {
        logWrite("[initOrders][getOrders] - 주문 리스트 가져오기", data);
    }).catch(function (err) {
        logWrite("[initOrders][getOrders] - 주문 리스트 가져오기 오류 발생", err);
    });
}

/* 주문 취소하기 */
function deleteOrders(uuid) {
    let orderData = new Object();
    orderData["uuid"] = uuid;

    let request = new Object();
    request["queryString"] = orderData;

    logWrite("[deleteOrders] - 주문 취소하기 데이터", request);
    deleteOrder(request).then(function (data) {
        logWrite("[deleteOrders][deleteOrder] - 주문 취소하기", data);
    }).catch(function (err) {
        logWrite("[deleteOrders][deleteOrder] - 주문 취소하기 오류 발생", err);
    });
}

function initAssetsKrw(assets) {
    let krwHtml = '<i>KRW</i>';
    let percentHtml = '<i>%</i>';
    document.getElementById("assetsKrw").innerHTML = Math.round(assets.assetsKrw).toLocaleString() + krwHtml;            // 보유 KRW
    document.getElementById("totalSum").innerHTML = Math.round(assets.totalSum).toLocaleString() + krwHtml;             // 총 보유 자산
    document.getElementById("totalPrice").innerHTML = Math.round(assets.totalPrice).toLocaleString() + krwHtml;           // 총 매수 금액
    document.getElementById("totalBenefitPrice").innerHTML = Math.round(assets.totalBenefitPrice).toLocaleString() + krwHtml;    // 총 평가 금액
    document.getElementById("totalBenefit").innerHTML = Math.round(assets.totalBenefit).toLocaleString() + krwHtml;         // 총 평가 손익
    document.getElementById("totalYield").innerHTML = new Number(assets.totalYield).toFixed(2) + percentHtml;             // 총 평가 수익률
}

function updateAssetsDonutChart(assets) {
    let series = new Array();
    let labels = new Array();
    let market;

    for (key in assets) {
        market = assets[key];
        if (market.market == "KRW-KRW") {
            labels.push("KRW");
            series.push(new Number(market.chargePercent.toFixed(1)));
        }
        if (market.avg_buy_price == 0 || !market.isAssetsCoin) {
            continue;
        }

        labels.push(market.coin_name);
        series.push(new Number(market.chargePercent.toFixed(1)));
    }

    let opts = $Global["myAssetsChart"].opts;
    opts.labels = labels;
    opts.series = series;
    $Global["myAssetsChart"].updateOptions(opts, true);
}

function createAssetsDonutChart() {
    let options = {
        series: [1, 2, 3,],
        chart: {
            width: 340,
            type: 'pie',
        },
        labels: ["label1", "label2", "label3"],
        dataLabels: {
            enabled: false
        },
        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    width: 200
                },
                legend: {
                    show: false
                }
            }
        }]
        , legend: {
            position: 'left',
            offsetY: 0,
        }
    };

    $Global["myAssetsChart"] = new ApexCharts(document.querySelector("#myAssetsChart"), options);
    $Global["myAssetsChart"].render();
}

function initTradeTable(data) {
    let market, table = document.querySelector("#tradeTable");

    for (let key in data) {
        market = data[key];
        if (market.market == "KRW-KRW") {
            continue;
        }

        tr = createMarketRow(market);
        tr.dataset.market = market.market;
        tr.data = market;
        table.querySelector("tbody").appendChild(tr);
    }
}

function createMarketRow(row) {
    let tr, td, a, em, p, strong;

    tr = document.createElement("tr");
    td = document.createElement("td");
    td.classList = "title";
    a = document.createElement("a");
    a.href = "#";
    strong = document.createElement("strong");
    strong.innerHTML = row.korean_name;
    a.appendChild(strong);
    td.appendChild(a);

    em = document.createElement("em");
    em.innerHTML = row.market;
    td.appendChild(em);

    tr.appendChild(td);
    td = document.createElement("td");
    td.classList = "price";
    strong = document.createElement("strong");
    strong.innerHTML = row.trade_price;
    td.appendChild(strong);
    tr.appendChild(td);

    td = document.createElement("td");
    td.classList = "change";
    p = document.createElement("p");
    p.innerHTML = "-";
    em = document.createElement("em");
    em.innerHTML = "-";
    td.appendChild(p);
    td.appendChild(em);
    tr.appendChild(td);

    td = document.createElement("td");
    td.classList = "price24";
    p = document.createElement("p");
    p.innerHTML = "-";
    td.appendChild(p);
    tr.appendChild(td);

    return tr;

}

function initAssetsSync() {
    let request = new Object();
    request["type"] = "KRW";
    tradeAssets(request).then(function (data) {
        let listData = data;
        CommonUtil.sendMessage(serverSocket, "GET", $Global["serverMessage"].selectMarket, request, function (data) {
            let dbData = data;
            let assetsArr = new Array();
            for (let i in listData) {
                for (let j in dbData) {
                    if (listData[i].market == dbData[j].market && listData[i].isAssetsCoin) {
                        dbData[j]["balance"] = listData[i].balance;
                        dbData[j]["avg_buy_price"] = listData[i].avg_buy_price;
                        assetsArr.push(dbData[j]);
                        break;
                    }
                }
            }

            deleteAssetsMarketAll();

            setTimeout(() => {
                for (let i in assetsArr) {
                    insertAssetsMarket(assetsArr[i]);
                }
            }, 2000);
            setTimeout(() => {
                initAssetsMarketUsedTrade();
            }, 5000);


        });
    }).catch(function (err) {
        logWrite("[initMySQL][tradeAssets] - 보유 자산 조회 오류 발생", err);
    });
}

function initAssetsMarketUsedTrade() {
    let request = new Object();

    CommonUtil.sendMessage(serverSocket, "GET", $Global["serverMessage"].selectAssetsMarketUsedTrade, request, function (data) {
        console.log(data);
        let assets = data;
        let request = new Object();
        request["marketStr"] = CommonUtil.getMarketArrayName(data, returnString);
        getTicker(request).then(function (data) {
            logWrite("[initAssetsMarketUsedTrade][getTicker] - Success");
            let tickers = data, table = document.querySelector("#usedTradeTable"), tr;

            table.querySelector("tbody").innerHTML = "";
            for (let i in assets) {
                for (let j in tickers) {
                    if (assets[i].market == tickers[j].market) {
                        assets[i]["low_price"] = tickers[j].low_price;
                        assets[i]["opening_price"] = tickers[j].opening_price;
                        assets[i]["high_price"] = tickers[j].high_price;
                        assets[i]["trade_price"] = tickers[j].trade_price;
                        assets[i]["prev_closing_price"] = tickers[j].prev_closing_price;
                        tr = createUsedTradeMarket(assets[i]);
                        tr.dataset.market = assets[i].market;
                        tr.data = assets[i];
                        table.querySelector("tbody").appendChild(tr);
                        break;
                    }
                }
            }
        }).catch(function (err) {
            console.log(err);
            logWrite("[initAssetsMarketUsedTrade][getTicker] - Error", err);
        });

    });
}

function createUsedTradeMarket(row) {
    let tr, td, a;

    tr = document.createElement("tr");

    //코인명
    td = document.createElement("td");
    td.innerHTML = row.name_korea + "(" + row.market_ui + ")";
    tr.appendChild(td);
    //보유 수량
    td = document.createElement("td");
    td.innerHTML = (row.trade_flag == 'Y') ? row.balance : "-";
    tr.appendChild(td);
    //평균 단가
    td = document.createElement("td");
    td.innerHTML = (row.trade_flag == 'Y') ? new Number(row.avg_buy_price).toLocaleString() : "-";
    tr.appendChild(td);
    //매수 금액
    td = document.createElement("td");
    td.innerHTML = (row.trade_flag == 'Y') ? new Number(row.balance * row.avg_buy_price).toLocaleString() : "-";
    tr.appendChild(td);
    //현재가
    td = document.createElement("td");
    td.innerHTML = new Number(row.trade_price).toLocaleString();
    tr.appendChild(td);
    //평가 금액
    td = document.createElement("td");
    td.innerHTML = (row.trade_flag == 'Y') ? new Number(row.balance * row.trade_price).toLocaleString() : "-";
    tr.appendChild(td);
    //평가 손익
    td = document.createElement("td");
    td.innerHTML = (row.trade_flag == 'Y') ? new Number((row.balance * row.trade_price) - (row.balance * row.avg_buy_price)).toLocaleString() : "-";
    tr.appendChild(td);
    //수익률
    td = document.createElement("td");
    td.innerHTML = (row.trade_flag == 'Y') ? new Number((row.trade_price / row.avg_buy_price) * 100 - 100).toFixed(2) + "%" : "-";
    // td.innerHTML = ((row.balance * row.trade_price / row.balance * row.avg_buy_price) * 100) - 100;
    tr.appendChild(td);
    //거래 상태
    td = document.createElement("td");
    a = document.createElement("a");
    span = document.createElement("span");
    span.innerHTML = (row.trade_flag == 'Y') ? "지정 코인(매도)" : "미지정(매수)";
    a.addEventListener("click", function () {
        if (row.trade_flag == 'Y') {
            if (confirm("[" + row.name_korea + "] 시장가 매도 수량 : " + row.balance)) {
                orderTarget(row, marketSell);
                setTimeout(() => {
                    initAssetsSync();
                }, 3000);
            } else {
                alert("주문 취소");
            }
        } else {
            if (confirm("[" + row.name_korea + "] 시장가 매수 " + buyPrice + "원")) {
                orderTarget(row, marketBuy);
                setTimeout(() => {
                    initAssetsSync();
                }, 3000);
            } else {
                alert("주문 취소");
            }
        }
    });
    a.appendChild(span);
    td.appendChild(a);
    tr.appendChild(td);

    totalBenefit = totalBenefitPrice - totalPrice;                  // 총 평가 금액 - 총 매수 금액
    totalYield = ((totalBenefitPrice / totalPrice) * 100) - 100;    // ((총 평가 금액 / 총 매수 금액) * 100) - 100
    totalSum = assetsKrw + totalBenefitPrice;                       // 보유 KRW + 총 평가 금액


    return tr;
}

function selectAssetsMarket() {
    let request = new Object();
    CommonUtil.sendMessage(serverSocket, "GET", $Global["serverMessage"].selectAssetsMarket, request, function (data) {
        console.log(data);
    });
}

function insertAssetsMarket(assets) {
    let request = new Object();
    request["market_id"] = assets.market_id;
    request["balance"] = assets.balance;
    request["avg_buy_price"] = assets.avg_buy_price;
    request["status"] = 1;
    CommonUtil.sendMessage(serverSocket, "GET", $Global["serverMessage"].insertTrade, request, function (data) {
        console.log(data);
    });
}

function deleteAssetsMarket(assets) {
    let request = new Object();
    request["market_id"] = assets.trade_id;
    CommonUtil.sendMessage(serverSocket, "GET", $Global["serverMessage"].deleteTrade, request, function (data) {
        console.log(data);
    });
}

function deleteAssetsMarketAll() {
    let request = new Object();
    CommonUtil.sendMessage(serverSocket, "GET", $Global["serverMessage"].deleteTrade, request, function (data) {
        console.log(data);
    });
}


function bootApi() {
    let request = new Object();
    CommonUtil.sendMessage(serverSocket, "POST", "boot_api", request, function (data) {
        console.log(data);
    });
}