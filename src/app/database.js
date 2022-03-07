/**
 * mysql连接池
 */

const mysql = require("mysql2");

const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = require("./config");

const connection = mysql.createPool({
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD
});

connection.getConnection((err,conn) => {
  conn.connect(err => {
    if(err){
      console.log('创建失败~', err);
    } else {
      console.log('创建成功');
    }
  })
});

// 因为后续都是操作Promise 所以直接导出.promise()
module.exports = connection.promise();
