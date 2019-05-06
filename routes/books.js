var express = require('express');
var methods = require('../middleware/books');
var router = express.Router();
const Promise = require('bluebird');

/* GET users listing. */
router.get('/update', function(req, res, next) {
  methods.getBooks().then((result) => {
    res.render('booksUpdate', { bodyClass: 'books-update', books: result });
  });
});

/* POST users listing. */
router.post('/update', function(req, res, next) {
  // var results = methods.updateBooks(req.body);
  res.render('booksUpdate', { bodyClass: 'books-update' });
});

module.exports = router;
