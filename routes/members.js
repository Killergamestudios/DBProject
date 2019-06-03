var express = require('express');
var methods = require('../middleware/methods/members');
var router = express.Router();
const Promise = require('bluebird');

router.get('/update', function(req, res, next) {
  const date = new Date();
  const month = ((date.getMonth() + 1) + '').padStart(2,'0');
  const day = (date.getDate() + '').padStart(2,'0');
  const currentDate = date.getFullYear() + '-' + month + '-' + day;
  methods.getMembers().then((result) => {
    res.render('memberUpdate', { 
      bodyClass: 'member-update', 
      members: result.members,
      date: currentDate
    });
  })
});

router.post('/update', function(req, res, next) {
  methods.updateMembers(req.body).then((result) => {
    res.render('thankyou', {
      bodyClass: 'thankyou',
      link: '/members/update',
      text: 'Update another member'
    });
  }).catch((error) => {
    console.log(error);
    const date = new Date();
    const month = ((date.getMonth() + 1) + '').padStart(2,'0');
    const day = (date.getDate() + '').padStart(2,'0');
    const currentDate = date.getFullYear() + '-' + month + '-' + day;
    methods.getMembers().then((result) => {
      res.render('memberUpdate', 
        { 
          bodyClass: 'member-update', 
          members: result.members,
          error: error,
          date: currentDate
        });
    });
  });
});

router.get('/insert', function(req, res, next) {
  const date = new Date();
  const month = ((date.getMonth() + 1) + '').padStart(2,'0');
  const day = (date.getDate() + '').padStart(2,'0');
  const currentDate = date.getFullYear() + '-' + month + '-' + day;
  methods.getMembers().then((result) => {
    res.render('memberInsert', 
      {
        bodyClass: 'member-insert',
        members: result.members,
        date: currentDate
      });
  });
});
  
router.post('/insert', function(req, res, next) {
  methods.insertMembers(req.body).then((result) => {
    res.render('thankyou', {
      bodyClass: 'thankyou',
      link: '/members/insert',
      text: 'Insert another member'
    });
  }).catch((error) => {
    console.log(error);
    const date = new Date();
    const month = ((date.getMonth() + 1) + '').padStart(2,'0');
    const day = (date.getDate() + '').padStart(2,'0');
    const currentDate = date.getFullYear() + '-' + month + '-' + day;
    methods.getMembers().then((result) => {
      res.render('memberInsert', 
        { 
          bodyClass: 'member-insert', 
          members: result.members, 
          error: error,
          date: currentDate
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
    res.render('thankyou', {
      bodyClass: 'thankyou',
      link: '/members/delete',
      text: 'Delete another member'});
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