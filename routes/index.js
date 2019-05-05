var express = require('express');
var router = express.Router();
var mysql = require('../middleware/sql');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { bodyClass: 'front' });
  var result = Promise.try(() => {
    return mysql.query()
  }).catch((error) => {
    console.error('Failed to connect to databse' + error);
    throw error;
  });
});

module.exports = router;
