var express = require('express');
var methods = require('../middleware/methods/largeMathBooks');
var methodsPub = require('../middleware/methods/publishers');
var router = express.Router();
const Promise = require('bluebird');

/* Temporary Employees View GET */
router.get('/', function(req, res, next) {
  methods.getLargeMathBooksView().then((result) => {
    res.render('largeMathBooks', {
      bodyClass: 'large-math-books', 
      books: result.books,
    });
  });
});

/* Temporary Employees Update GET */
router.get('/update', function(req, res, next) {
  methods.getLargeMathBooksView().then((result) => {
    methodsPub.getPublishers().then((result2) => {
      res.render('largeMathBooksUpdate', {
        bodyClass: 'large-math-books-update', 
        year: new Date().getFullYear(),
        books: result.books,
        publishers: result2.publishers
      });
    });
  });
});

/* Temporary Employees Update POST */
router.post('/update', function(req, res, next) {
  methods.updateLargeMathBooksView(req.body).then(() => {
    res.render('thankyou', {
      bodyClass: 'thankyou',
      link: '/largeMathBooks/update',
      text: 'Update another large math book'
    });
  }).catch((error) => {
    console.log(error);
    methods.getLargeMathBooksView().then((result) => {
      methodsPub.getPublishers().then((result2) => {
        res.render('largeMathBooksUpdate', {
          bodyClass: 'large-math-books-update', 
          year: new Date().getFullYear(),
          books: result.books,
          publishers: result2.publishers,
          error: error
        });
      });
    });
  });
});

/* Temporary Employees Insert GET */
router.get('/insert', function(req, res, next) {
  methodsPub.getPublishers().then((result2) => {
    res.render('largeMathBooksInsert', 
      {
        bodyClass: 'large-math-books-insert',
        year: new Date().getFullYear(),
        publishers: result2.publishers
      });
  });
});

/* Temporary Employees Insert POST */
router.post('/insert', function(req, res, next) {
  methods.insertLargeMathBooksView(req.body).then(() => {
    res.render('thankyou', {
      bodyClass: 'thankyou',
      link: '/largeMathBooks/insert',
      text: 'Insert another large math book'
    });
  }).catch((error) => {
    console.log(error);
    methodsPub.getPublishers().then((result2) => {
      res.render('largeMathBooksInsert', 
        {
          bodyClass: 'large-math-books-insert',
          year: new Date().getFullYear(),
          publishers: result2.publishers,
          error: error
        });
    });
  });
});

/* Temporary Employees Delete GET */
router.get('/delete', function(req, res, next) {
  methods.getLargeMathBooksView().then((result) => {
    res.render('largeMathBooksDelete',{
      bodyClass: 'large-math-books-delete', 
      books: result.books
    });
  });
});

/* Temporary Employees Delete POST */
router.post('/delete', function(req, res, next) {
  methods.deleteLargeMathBooksView(req.body).then(() => {
    res.render('thankyou', {
      bodyClass: 'thankyou',
      link: '/largeMathBooks/delete',
      text: 'Delete another large math book'
    });
  }).catch((error) => {
    console.log(error);
    methods.getLargeMathBooksView().then((result) => {
      res.render('largeMathBooksDelete',
      {
        bodyClass: 'large-math-books-delete', 
        books: result.books,
        error: error
      });
    });
  });
});

module.exports = router;