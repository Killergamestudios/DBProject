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
          year: new Date().getFullYear(),
          books: result.books, 
          publishers: result2.publishers
        });
    });
  });
});

/* Books Update POST */
router.post('/update', function(req, res, next) {
  methodsBook.updateBooks(req.body).then(() => {
    res.render('thankyou', {
      bodyClass: 'thankyou',
      link: '/books/update',
      text: 'Update another book'
    });
  }).catch((error) => {
    console.log(error);
    methodsBook.getBooks().then((result) => {
      methodsPub.getPublishers().then((result2) => {
        res.render('booksUpdate', 
          {
            bodyClass: 'books-update', 
            year: new Date().getFullYear(),
            books: result.books, 
            publishers: result2.publishers, 
            error: error
          });
      });
    });
  });
});

/* Books Insert GET */
router.get('/insert', function(req, res, next) {
  methodsPub.getPublishers().then((result) => {
    res.render('booksInsert', 
      {
        bodyClass: 'books-insert',
        year: new Date().getFullYear(),
        publishers: result.publishers
      });
  });
});

/* Books Insert POST */
router.post('/insert', function(req, res, next) {
  methodsBook.insertBooks(req.body).then(() => {
    res.render('thankyou', {
      bodyClass: 'thankyou',
      link: '/books/insert',
      text: 'Insert another book'
    });
  }).catch((error) => {
    console.log(error);
    methodsPub.getPublishers().then((result) => {
      res.render('booksInsert', 
        { 
          bodyClass: 'books-insert',
          year: new Date().getFullYear(),
          publishers: result.publishers, 
          error: error
        });
    });
  });
});

/* Books Delete GET */
router.get('/delete', function(req, res, next) {
  methodsBook.getBooks().then((result) => {
    res.render('booksDelete', 
      {
        bodyClass: 'books-delete',
        books: result.books
      });
  });
});

/* Books Delete POST */
router.post('/delete', function(req, res, next) {
  methodsBook.deleteBooks(req.body).then(() => {
    res.render('thankyou', {
      bodyClass: 'thankyou',
      link: '/books/delete',
      text: 'Delete another book'
    });
  }).catch((error) => {
    console.log(error);
    methodsBook.getBooks().then((result) => {
      res.render('booksDelete', 
        { 
          bodyClass: 'books-delete',
          books: result.books,
          error: error
        });
    });
  });
});

module.exports = router;
