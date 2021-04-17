// let executor = require("./server/mysql/executor");
// executor.initialize();

// function databaseConnection(){
// 	connection.connect(function(err){  
// 		if(err) { 
// 			console.log(err);
// 		} else {
// 			console.log("Connection success");
// 			pushMarket();
// 		}
// 	});  
// }

// function pushMarket(){
// 	let requestData = new Object();
// 	let sendCall = {
// 		method : "GET",
// 		url : "https://api.upbit.com/v1/market/all",
// 		headers: {
// 			Authorization: key.createToken(requestData)
// 		}
// 	}

// 	request(sendCall, function (err, res, result) {
// 		if(res.statusCode == 200){
// 			// console.log("code : " + res.statusCode + ", get request result success", result);
// 			let marketList = JSON.parse(result);
// 			let marketArr = new Array();
// 			let tempArr,code,tradeType;

// 			for(let i in marketList){
// 				tempArr = new Array();
// 				code = marketList[i].market.split("-")[1];
// 				tradeType = marketList[i].market.split("-")[0];
// 				tempArr.push(marketList[i].market);
// 				tempArr.push(code + "/" + tradeType);
// 				tempArr.push(marketList[i].korean_name);
// 				tempArr.push(marketList[i].english_name);
// 				tempArr.push(code);
// 				tempArr.push(tradeType);
// 				marketArr.push(tempArr);
// 			}

// 			connection.query("insert into mt_market (market, market_ui, name_korea, name_english, name_symbol, type) values ?", [marketArr], function(err) {
// 				if (err) throw err;
// 				connection.end();
// 			});
// 		} else {
// 			console.log("code : " + res.statusCode + ", get request result fail", result);
// 		}
// 	});
// }

// databaseConnection();