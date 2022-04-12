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
  selectMarket : async function(request){
    return new Promise(async function(resolve, reject) {
      try {
        let [rows, fields] = await executeQuery("market.selectMarkets",request);
        resolve(rows);
      } catch (error) {
        reject(error);
      }
    });
  },
  selectAssetsMarketUsedTrade : function(request){
    return new Promise(async function(resolve, reject) {
      try {
        let [rows, fields] = await executeQuery("market.selectAssetsMarketUsedTrade",request);
        resolve(rows);
      } catch (error) {
        reject(error);
      }
    });
  },
  selectAssetsMarket : function(request){
    return new Promise(async function(resolve, reject) {
      try {
        let [rows, fields] = await executeQuery("market.selectAssetsMarket",request);
        resolve(rows);
      } catch (error) {
        reject(error);
      }
    });
  },
  insertMarketTrade : function(request){
    return new Promise(async function(resolve, reject) {
      try {
        let [rows, fields] = await executeQuery("market.insertMarketTrade",request);
        resolve(rows);
      } catch (error) {
        reject(error);
      }
    });
  },
  updateMarketTrade : function(request){
    return new Promise(async function(resolve, reject) {
      try {
        let [rows, fields] = await executeQuery("market.updateMarketTrade",request);
        resolve(rows);
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteMarketTrade : function(request){
    return new Promise(async function(resolve, reject) {
      try {
        let [rows, fields] = await executeQuery("market.deleteMarketTrade",request);
        resolve(rows);
      } catch (error) {
        reject(error);
      }
    });
  }
}

// function executeQuery(mapper, request, callback){
//   let namespace = mapper.split(".")[0];
//   let id = mapper.split(".")[1];

//   return new Promise(function(resolve, reject) {
//     connector.connectionPool.getConnection(function (err, conn) {
//       (!err) ? resolve(conn) : error(err);
//     });
//   }).then(function(conn){
//     let query = mybatis.getStatement(namespace, id, (request != undefined) ? request : new Object(), format);
//     conn.query(query, [], function(err, result, field){
//       (err) ? callback(-1, err) : callback(1, result);
//     });
//     conn.release();
//   });
// }

async function executeQuery(mapper, request){
  let namespace = mapper.split(".")[0];
  let id = mapper.split(".")[1];
  let conn = await connector.getConnection();
  let query = mybatis.getStatement(namespace, id, (request != undefined) ? request : new Object(), format);
  let result = conn.query(query);
  conn.release();
  return result;
}

module.exports = {
  executor : executor,
  executeQuery : executeQuery
};