const mysql = require('mysql');
const config = require('./config/db_config.json');

/* 커넥션 풀 만들기 */
let connectionPool = mysql.createPool(config);

async function getConnection(callback) {
  pool.getConnection(function (err, conn) {
    (!err) ? callback(conn) : error(err);
  });
}

function error(err){
  console.log(err);
}

module.exports = {
  getConnection : getConnection,
  connectionPool : connectionPool
};
