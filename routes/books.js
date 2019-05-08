var express = require('express');
var methods = require('../middleware/methods/books');
var router = express.Router();
const Promise = require('bluebird');

/* Books Update GET */
router.get('/update', function(req, res, next) {
  methods.getBooks().then((result) => {
    res.render('booksUpdate', 
      {
        bodyClass: 'books-update', 
        books: result.books, 
        publishers: result.publishers, 
        error: {}
      });
  });
});

/* Books Update POST */
router.post('/update', function(req, res, next) {
  methods.updateBooks(req.body).then((result) => {
    res.render('thankyou', { bodyClass: 'books-update' });
    console.log('Rendered');
  }).catch((error) => {
    methods.getBooks().then((result) => {
      res.render('booksUpdate', 
        { 
          bodyClass: 'books-update', 
          books: result.books, 
          publishers: result.publishers, 
          error: error
        });
    });
  });
});

module.exports = router;
