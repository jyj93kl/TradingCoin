// connectionPool require 
const connector = require('./connector');
// mybatis-mapper require 
const mybatis = require('mybatis-mapper');
// mybatis-mapper setting format
const format = {language: 'sql', indent: ' '};
// mybatis-mapper mapper.xml load
mybatis.createMapper([ "./server/mappers/market.xml" ]);

/* let query = mybatis.getStatement(param1,param2,param3,param4)
  param 1: namespace
  param 2: namespace 안에 불러온 id
  param 3: 파라미터 정보
  param 4: 불러올 정보의 포맷
*/
const executor = {
  selectMarket : function(socket, message, request){
    executeQuery("market.selectMarkets", request, function(result, data){
      socket.emit(message, data);
    });
  },
  selectAssetsMarket : function(socket, message, request){
    executeQuery("market.selectAssetsMarket", request, function(result, data){
      socket.emit(message, data);
    });
  },
  insertMarketTrade : function(socket, message, request){
    executeQuery("market.insertMarketTrade", request, function(result, data){
      socket.emit(message, data);
    });
  },
  updateMarketTrade : function(socket, message, request){
    executeQuery("market.updateMarketTrade", request, function(result, data){
      socket.emit(message, data);
    });
  },
  deleteMarketTrade : function(socket, message, request){
    executeQuery("market.deleteMarketTrade", request, function(result, data){
      socket.emit(message, data);
    });
  },
  selectAssetsMarketUsedTrade : function(socket, message, request){
    executeQuery("market.selectAssetsMarketUsedTrade", request, function(result, data){
      socket.emit(message, data);
    });
  }
  
}

function executeQuery(mapper, request, callback){
  let namespace = mapper.split(".")[0];
  let id = mapper.split(".")[1];

  return new Promise(function(resolve, reject) {
    connector.connectionPool.getConnection(function (err, conn) {
      (!err) ? resolve(conn) : error(err);
    });
  }).then(function(conn){
    let query = mybatis.getStatement(namespace, id, (request != undefined) ? request : new Object(), format);
    conn.query(query, [], function(err, result, field){
      (err) ? callback(-1, err) : callback(1, result);
    });
    conn.release();
  });
}

function error(err){
  console.log(err);
}

function initialize(){
  let initData = selectMarket({ market_id : 3 });
  console.log(initData);
  let param = {market_id : 1};
  let query = mybatis.getStatement('market', 'selectMarkets', param, format);

  connector.getConnection(function(conn){
    conn.query(query, [], function(err, result, field){
      if (err) throw err;
      console.log(result);
    });

    conn.release();
  })
}

module.exports = {
  executor : executor,
  initialize : initialize
};