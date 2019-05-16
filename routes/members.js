var express = require('express');
var methods = require('../middleware/methods/members');
var router = express.Router();
const Promise = require('bluebird');


router.get('/update', function(req, res, next) {
  methods.getMembers().then((result) => {
    res.render('memberUpdate', { 
      bodyClass: 'member-update', 
      members: result.members
    });
  })
});



router.post('/update', function(req, res, next) {
  methods.updateMembers(req.body).then((result) => {
    res.render('thankyou', { bodyClass: 'member-update' });
  }).catch((error) => {
    console.log(error);
    methods.getMembers().then((result) => {
      res.render('memberUpdate', 
        { 
          bodyClass: 'member-update', 
          members: result.members,
          error: error
        });
    });
  });
});

router.get('/insert', function(req, res, next) {
    methods.getMembers().then((result) => {
      res.render('memberInsert', 
        {
          bodyClass: 'member-insert',
          members: result.members
        });
    });
});

  
  router.post('/insert', function(req, res, next) {
    methods.insertMembers(req.body).then((result) => {
      res.render('thankyou', { bodyClass: 'thankyou' });
    }).catch((error) => {
      console.log(error);
      methods.getMembers().then((result) => {
        res.render('memberInsert', 
          { 
            bodyClass: 'member-insert', 
            members: result.members, 
            error: error
          });
      });
    });
});

module.exports = router;