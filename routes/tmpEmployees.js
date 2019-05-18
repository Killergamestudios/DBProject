var express = require('express');
var methods = require('../middleware/methods/tmpEmployees');
var router = express.Router();
const Promise = require('bluebird');

/* Temporary Employees View GET */
router.get('/', function(req, res, next) {
  methods.getTmpEmployeesView().then((result) => {
    res.render('tmpEmployees',
    {
      bodyClass: 'temporary-employees', 
      tmpEmps: result.tmpEmps
    });
  });
});

/* Temporary Employees Update GET */
router.get('/update', function(req, res, next) {
  methods.getTmpEmployeesView().then((result) => {
    res.render('tmpEmployeesUpdate',
    {
      bodyClass: 'temporary-employees-update', 
      tmpEmps: result.tmpEmps
    });
  });
});

/* Temporary Employees Update POST */
router.post('/update', function(req, res, next) {
  methods.updateTmpEmployeesView(req.body).then(() => {
    res.render('thankyou', { bodyClass: 'thankyou' });
  }).catch((error) => {
    console.log(error);
    methods.getTmpEmployeesView().then((result) => {
      res.render('tmpEmployeesUpdate',
      {
        bodyClass: 'temporary-employees-update', 
        tmpEmps: result.tmpEmps,
        error: error
      });
    });
  });
});

/* Temporary Employees Insert GET */
router.get('/insert', function(req, res, next) {
  res.render('tmpEmployeesInsert', 
    {
      bodyClass: 'temporary-employees-insert'
    });
});

/* Temporary Employees Insert POST */
router.post('/insert', function(req, res, next) {
  methods.insertTmpEmployeesView(req.body).then(() => {
    res.render('thankyou', { bodyClass: 'thankyou' });
  }).catch((error) => {
    console.log(error);
    res.render('tmpEmployeesInsert', 
    {
      bodyClass: 'temporary-employees-insert',
      error: error
    });
  });
});

/* Temporary Employees Delete GET */
router.get('/delete', function(req, res, next) {
  methods.getTmpEmployeesView().then((result) => {
    res.render('tmpEmployeesDelete',
    {
      bodyClass: 'temporary-employees-delete', 
      tmpEmps: result.tmpEmps
    });
  });
});

/* Temporary Employees Delete POST */
router.post('/delete', function(req, res, next) {
  methods.deleteTmpEmployeesView(req.body).then(() => {
    res.render('thankyou', { bodyClass: 'thankyou' });
  }).catch((error) => {
    console.log(error);
    methods.getTmpEmployeesView().then((result) => {
      res.render('tmpEmployeesDelete',
      {
        bodyClass: 'temporary-employees-delete', 
        tmpEmps: result.tmpEmps,
        error: error
      });
    });
  });
});

module.exports = router;