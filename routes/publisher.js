var express = require('express');
var router = express.Router();

router.get('/update', function(req, res, next) {
    res.render('publisherUpdate', { bodyClass: 'publisher-update' });
});

  /* POST users listing. */
router.post('/update', function(req, res, next) {
    let variables = req.body;
    res.render('publisherUpdate', { bodyClass: 'publisher-update' });
});
  
  module.exports = router;