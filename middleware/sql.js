var mysql      = require('mysql');
var connection = mysql.createConnection({
  host: 'http://localhost:3306',
  user: 'root',
  database: 'DBProject'
});

module.exports = connection;