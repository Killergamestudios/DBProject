var express = require('express');
var methods = require('../middleware/methods/explore');
var router = express.Router();
const Promise = require('bluebird');

router.get('/books-list', function(req, res, next) {
  methods.getAllBooksDetails().then((result) => {
    res.render('booksListExplore',{
      bodyClass: 'books-list',
      books: result.books
    })
  });
});

router.get('/books-per-category', function(req, res, next) {
  methods.getBooksPerCategory().then((result) => {
    res.render('booksPerCategory',{
      bodyClass: 'books-per-category',
      categories: result.categories
    })
  });
});


module.exports = router;