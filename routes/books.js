var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/update', function(req, res, next) {
  res.render('booksUpdate', { bodyClass: 'books-update' });
});

/* POST users listing. */
router.post('/update', function(req, res, next) {
  let variables = req.body;
  res.render('booksUpdate', { bodyClass: 'books-update' });
});

module.exports = router;
