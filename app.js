const { Console } = require('console');
let express = require('express')
  , http = require('http')
  , path = require('path');

let app = express();
let router = require('./routes/router.js')(app);
let fs = require('fs');

// express 서버 실행
let server = app.listen(3000, function () {
  // console.log("Express server has started on port 3000");
});

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/coin/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, '/coin/')));
app.engine('html', require('ejs').renderFile);
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

////////////////////////// 소켓 설정 /////////////////////

let io = require('socket.io').listen(server);
let mobot_socket = require('./server/socket/mobot_socket')
mobot_socket.initialize(io);

//////////////////////////////////////////////////////////////

// let sellScheduler = require("./server/schedule/sell-scheduler").sellScheduler;
// sellScheduler.setRule("*/10 * * * * *");

// sellScheduler.start();

// setTimeout(function () {
//   sellScheduler.stop();
// }, 3000);

// setTimeout(function(){
//   sellScheduler.restart();
// },10000);

// const mysql = require('mysql2');
// const key = require('./storage/key');
// const config = require('./server/mysql/config/db_config.json');
// const request = require('request');
// const connection = mysql.createConnection(config);

// function databaseConnection(){
//   console.log("databaseConnection");
// //   connection.connect();
//   pushMarket();
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
//       console.log(marketArr.length);
// 			connection.query("insert into mt_market (market, market_ui, name_korea, name_english, name_symbol, type) values ?", [marketArr], function(err) {
//         console.log(err);
// 				if (err) throw err;
// 			});
// 		} else {
// 			console.log("code : " + res.statusCode + ", get request result fail", result);
// 		}
// 	});
// }

// databaseConnection();