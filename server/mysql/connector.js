const mysql = require('mysql2/promise');
const config = require('./config/db_config.json');

/* 커넥션 풀 만들기 */
let connectionPool = mysql.createPool(config);

/* 커넥션 전달 함수 */
async function getConnection() {
  try {
    return await connectionPool.getConnection(async conn => conn);
  } catch (error) {
    return -1;
  }
}

module.exports = {
  getConnection : getConnection,
  connectionPool : connectionPool
};

