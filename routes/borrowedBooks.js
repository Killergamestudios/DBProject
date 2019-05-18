var express = require('express');
var methods = require('../middleware/methods/borrowedBooks');
var router = express.Router();
const Promise = require('bluebird');

router.get('/', function(req, res, next) {
    methods.getBorrowedBooks().then((result) => {
      res.render('borrowedBooks',
      {
        bodyClass: 'Borrowed-Books', 
        brdBooks: result.brdBooks
      });
    });
});


module.exports = router;

