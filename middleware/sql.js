var mysql = require('mysql');
const Promise = require('bluebird');
var connection = mysql.createConnection({
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'DBProject'
});

var sql = Promise.promisifyAll(connection);

module.exports = sql;