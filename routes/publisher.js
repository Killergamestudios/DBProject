var express = require('express');
var methods = require('../middleware/methods/publishers');
var router = express.Router();
const Promise = require('bluebird');


router.get('/update', function(req, res, next) {
  methods.getPublishers().then((result) => {
    res.render('publisherUpdate', { 
      bodyClass: 'publisher-update', 
      publishers: result.publishers, 
      error: ''
    });
  })
});



router.post('/update', function(req, res, next) {
  methods.updatePublisher(req.body).then((result) => {
    res.render('thankyou', { bodyClass: 'publisher-update' });
    console.log('Rendered');
  }).catch((error) => {
    methods.getPublishers().then((result) => {
      res.render('publisherUpdate', 
        { 
          bodyClass: 'publisher-update', 
          publishers: result.publishers,  
          error: error
        });
    });
  });
});

router.get('/insert', function(req, res, next) {
  methods.getPublishers().then((result) => {
    res.render('publisherInsert', 
      {
        bodyClass: 'publisher-insert',
        publishers: result.publishers,
        error: {}
      });
  });
});

router.post('/insert', function(req, res, next) {
  methods.insertPublishers(req.body).then((result) => {
    res.render('thankyou', { bodyClass: 'thankyou' });
  }).catch((error) => {
    methods.getPublishers().then((result) => {
      res.render('publisherInsert', 
        { 
          bodyClass: 'publisher-insert', 
          publishers: result.publishers, 
          error: error
        });
    });
  });
})


module.exports = router;