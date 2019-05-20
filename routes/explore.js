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

router.get('/books-per-publisher',function(req,res,next){
  methods.getBooksPerPublisher().then((result) => {
    res.render('booksPerPublisher',{
      bodyClass: 'books-per-publisher',
      publishers: result.publishers
    })
  });
});

router.get('/available-books',function(req,res,next){
  methods.getAvailableBooks().then((result) => {
    res.render('availableBooks',{
      bodyClass: 'available-books',
      Abooks: result.Abooks
    })
  });
});

router.get('/active-writers',function(req,res,next){
  methods.getActiveWriters().then((result) => {
    res.render('active-writers',{
      bodyClass: 'active-writers',
      AWriters: result.AWriters
    })
  });
});
module.exports = router;