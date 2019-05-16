var express = require('express');
var methods = require('../middleware/methods/members');
var router = express.Router();
const Promise = require('bluebird');


router.get('/update', function(req, res, next) {
  methods.getMembers().then((result) => {
    res.render('memberUpdate', { 
      bodyClass: 'member-update', 
      members: result.members, 
      error: {}
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
          members: result.members,
          error: {}
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

/* Member Delete GET */
router.get('/delete', function (req, res, next) {
    methods.getMembers().then((result) => {
        res.render('memberDelete',
            {
                bodyClass: 'member-delete',
                members: result.members,
                error: {}
            });
    });
});

/* Member Delete POST */
router.post('/delete', function (req, res, next) {
    methods.deleteMembers(req.body).then(() => {
        res.render('thankyou', { bodyClass: 'thankyou' });
    }).catch((error) => {
        console.log(error);
        methods.getMembers().then((result) => {
            res.render('memberDelete',
                {
                    bodyClass: 'member-delete',
                    members: result.members,
                    error: error
                });
        });
    });
});

module.exports = router;