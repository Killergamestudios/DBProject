var express = require('express');
var methods = require('../middleware/methods/publishers');
var router = express.Router();
const Promise = require('bluebird');


router.get('/update', function(req, res, next) {
  methods.getPublishers().then((result) => {
    res.render('publisherUpdate', { 
      bodyClass: 'publisher-update',
      year: new Date().getFullYear(),
      publishers: result.publishers
    });
  })
});



router.post('/update', function(req, res, next) {
  methods.updatePublisher(req.body).then((result) => {
    res.render('thankyou', { 
      bodyClass: 'thankyou',
      link: '/publisher/update',
      text: 'Update another publisher'
    });
  }).catch((error) => {
    console.log(error);
    methods.getPublishers().then((result) => {
      res.render('publisherUpdate', 
        { 
          bodyClass: 'publisher-update',
          year: new Date().getFullYear(),
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
        year: new Date().getFullYear(),
        publishers: result.publishers
      });
  });
});

router.post('/insert', function(req, res, next) {
  methods.insertPublishers(req.body).then((result) => {
    res.render('thankyou', { 
      bodyClass: 'thankyou',
      link: '/publisher/insert',
      text: 'Add another publisher'
    });
  }).catch((error) => {
    console.log(error);
    methods.getPublishers().then((result) => {
      res.render('publisherInsert', 
        { 
          bodyClass: 'publisher-insert', 
          publishers: result.publishers,
          year: new Date().getFullYear(),
          error: error
        });
    });
  });
})

/* Publisher Delete GET */
router.get('/delete', function(req, res, next) {
  methods.getPublishers().then((result) => {
    res.render('publisherDelete', 
      {
        bodyClass: 'publisher-delete',
        publishers: result.publishers
      });
  });
});

/* Publisher Delete POST */
router.post('/delete', function(req, res, next) {
  methods.deletePublishers(req.body).then(() => {
    res.render('thankyou', { 
      bodyClass: 'thankyou',
      link: '/publisher/delete',
      text: 'Delete another publisher'
    });
  }).catch((error) => {
    console.log(error);
    methods.getPublishers().then((result) => {
      res.render('publisherDelete', 
        { 
          bodyClass: 'publisher-delete',
          publishers: result.publishers,
          error: error
        });
    });
  });
});

module.exports = router;