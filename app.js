var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mysql = require('mysql');

// Editable!!
var indexRouter = require('./routes/index');
var booksRouter = require('./routes/books');
var publisherRouter = require('./routes/publisher');
var memberRouter = require('./routes/members');
var tmpEmployeesRouter = require('./routes/tmpEmployees');
var borrowedBooks = require('./routes/borrowedBooks');
var exploreRouter = require('./routes/explore');
// Editable!!

var app = express();

// body parser setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Add js file to route
// Editable!!
app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/publisher',publisherRouter);
app.use('/members',memberRouter);
app.use('/tmpemployees', tmpEmployeesRouter);
app.use('/borrowedBooks',borrowedBooks);
app.use('/explore', exploreRouter);
// Editable!!

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
