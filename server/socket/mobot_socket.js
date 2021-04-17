let request = require('request');
let serverMessage = require("../../coin/resources/modules/sharedObject.js").serverMessage;
let key = require("../../storage/key.js");
let uuid = require("uuid");
let executor = require("../mysql/executor").executor;

function initialize(io){
  
  io.sockets.on('connection', function (socket) { // connection이 발생할 때 핸들러를 실행합니다.
    socket.on("testCall", function(data){ socket.emit("testCall", "testCall")});

    /* 업비트 관련 API 메시지*/
    socket.on(serverMessage.holdAssets, function(data){
      callMethod(socket, serverMessage.holdAssets, JSON.parse(data));
    });
    socket.on(serverMessage.orders, function(data){
      callMethod(socket, serverMessage.orders, JSON.parse(data));
    });
    socket.on(serverMessage.order, function(data){
      callMethod(socket, serverMessage.order, JSON.parse(data));
    });
    socket.on(serverMessage.orderChance, function(data){
      callMethod(socket, serverMessage.orderChance, JSON.parse(data));
    });
    socket.on(serverMessage.marketAll, function(data){
      callMethod(socket, serverMessage.marketAll, JSON.parse(data));
    });
    socket.on(serverMessage.ticker, function(data){
      callMethod(socket, serverMessage.ticker, JSON.parse(data));
    });
    socket.on(serverMessage.dayCandle, function(data){
      callMethod(socket, serverMessage.dayCandle, JSON.parse(data));
    });

    /* MySQL 관련 통신 메시지*/
    socket.on(serverMessage.selectMarket, function(data){
      executor.selectMarket(socket, serverMessage.selectMarket, JSON.parse(data));
    });
    socket.on(serverMessage.selectAssetsMarket, function(data){
      executor.selectAssetsMarket(socket, serverMessage.selectAssetsMarket, JSON.parse(data));
    });
    socket.on(serverMessage.selectAssetsMarketUsedTrade, function(data){
      executor.selectAssetsMarketUsedTrade(socket, serverMessage.selectAssetsMarketUsedTrade, JSON.parse(data));
    });
    socket.on(serverMessage.insertTrade, function(data){
      executor.insertMarketTrade(socket, serverMessage.insertTrade, JSON.parse(data));
    });
    socket.on(serverMessage.updateTrade, function(data){
      executor.updateMarketTrade(socket, serverMessage.updateTrade, JSON.parse(data));
    });
    socket.on(serverMessage.deleteTrade, function(data){
      executor.deleteMarketTrade(socket, serverMessage.deleteTrade, JSON.parse(data));
    });

    /* 유틸 메시지*/
    socket.on(serverMessage.uuidv4, function(data){
      socket.emit(serverMessage.uuidv4, uuid.v4());
    });
    
    // socket 통신 종료 후  DBConnection end
    socket.on('disconnect', function () {
      console.log('user disconnected');
    });
  });
}

async function callMethod(socket, message, requestData){
	let sendCall = {
		method : requestData.method,
		url : requestData.callUrl,
		headers: {
			Authorization: key.createToken(requestData)
		}
	}
	if(requestData.queryString){
		sendCall["json"] = requestData.queryString;
	}
	// console.log(sendCall);
	await request(sendCall, function (err, res, result) {
		if(res.statusCode == 200){
			// console.log("code : " + res.statusCode + ", get request result success", result);
			socket.emit(message, socketCallback(1, result));
		} else {
			// console.log("code : " + res.statusCode + ", get request result fail", result);
			socket.emit(message, socketCallback(-1, result));
		}
	});
}

function socketCallback(result, data){
	return JSON.stringify({ result : result, data : data })
}

module.exports = {
  initialize : initialize
};