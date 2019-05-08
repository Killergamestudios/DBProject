var express = require('express');
var methodsBook = require('../middleware/methods/books');
var methodsPub = require('../middleware/methods/publishers');
var router = express.Router();
const Promise = require('bluebird');

/* Books Update GET */
router.get('/update', function(req, res, next) {
  methodsBook.getBooks().then((result) => {
    methodsPub.getPublishers().then((result2) => {
      res.render('booksUpdate', 
        {
          bodyClass: 'books-update', 
          books: result.books, 
          publishers: result2.publishers, 
          error: {}
        });
    });
  });
});

/* Books Update POST */
router.post('/update', function(req, res, next) {
  methodsBook.updateBooks(req.body).then((result) => {
    res.render('thankyou', { bodyClass: 'thankyou' });
  }).catch((error) => {
    methodsBook.getBooks().then((result) => {
      methodsPub.getPublishers().then((result2) => {
        res.render('booksUpdate', 
          {
            bodyClass: 'books-update', 
            books: result.books, 
            publishers: result2.publishers, 
            error: {}
          });
      });
    });
  });
});

/* Books Inserrt GET */
router.get('/insert', function(req, res, next) {
  methodsPub.getPublishers().then((result) => {
    res.render('booksInsert', 
      {
        bodyClass: 'books-insert',
        publishers: result.publishers,
        error: {}
      });
  });
});

/* Books Inserrt POST */
router.post('/insert', function(req, res, next) {
  methodsBook.insertBooks(req.body).then((result) => {
    res.render('thankyou', { bodyClass: 'thankyou' });
  }).catch((error) => {
    methodsPub.getPublishers().then((result) => {
      res.render('booksInsert', 
        { 
          bodyClass: 'books-insert', 
          publishers: result.publishers, 
          error: error
        });
    });
  });
});


module.exports = router;
