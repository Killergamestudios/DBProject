var mysql = require('../sql');
const Promise = require('bluebird');
const myError = require('../errors');

const getLargeMathBooksView = () => {
  console.log('Fetching view large math books');
  return Promise.try(() => {
    return mysql.queryAsync('SELECT * FROM largeMathBooks ORDER BY Title');
  }).then((res) => {
    console.log('Fetched view large math books successfully');
    return { books: res };
  }).catch((error) => {
    console.error('Failed to fetch view large math books');
    throw error;
  })
};

const updateLargeMathBooksView = (input) => {
  let errors = {}, errValues = {};
  console.log('Update large math books');
  return Promise.try(() => {
    return mysql.queryAsync('SELECT * FROM largeMathBooks WHERE ISBN = '+ mysql.escape(input.book));
  }).then((res) => {
    if (res.length == 0) {
      errors.BookExists = true;
      errValues.BookExists = input.book;
    }

    return mysql.queryAsync('SELECT * FROM Publisher WHERE pubName = '+ mysql.escape(input.pubName));
  }).then((res) => {
    if (res.length == 0 && input.pubName != '') {
      errors.PublisherExists = true;
      errValues.PublisherExists = input.pubName;
    }

    if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
      throw new myError('MALFORMED_INPUT', errors, errValues);
    }

    let sub = '';
    for (const key in input) {
      if (key == 'book') continue;
      if (input[key]) {
        if (sub != '') sub = sub + ',';
        sub = sub + (mysql.escapeId(key) + ' = ' + mysql.escape(input[key]) + '');
      }
    }
    let query = 'UPDATE largeMathBooks SET ' + sub + ' WHERE ISBN = ' + mysql.escape(input.book);
    console.log('Executing query: ' + query);
    return mysql.queryAsync(query);
  }).then((res) => {
    console.log('Updated Books successfully');
    return ;
  }).catch((error) => {
    console.error('Failed to update book ' + error);
    throw error;
  });
};


// Insert Books
const insertLargeMathBooksView = (input) => {
  let errors = {}, errValues = {};
  console.log('Insert large math books');
  return Promise.try(() => {
    return mysql.queryAsync('SELECT * FROM largeMathBooks WHERE empID = '+ mysql.escape(input.empID));
  }).then((res) => {
    if (res.length != 0) {
      errors.empID = true;
      errValues.empID = input.empID;
    }

    if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
      throw new myError('MALFORMED_INPUT', errors, errValues);
    }

    let keys = '', values = '';
    for (const key in input) {
      if (input[key]) {
        if (keys != '') { 
          keys = keys + ',';
          values = values + ',';
        }
        keys = keys + mysql.escapeId(key);
        values = values + mysql.escape(input[key]);
      }
    }
    let query = 'INSERT INTO largeMathBooks (' + keys + ') VALUES (' + values + ')';
    console.log('Executing query: ' + query);
    return mysql.queryAsync(query);
  }).then((res) => {
    console.log('Insert to large math bookss successfully');
    return ;
  }).catch((error) => {
    console.error('Failed to insert large math books ' + error);
    throw error;
  });
};

const deleteLargeMathBooksView = (input) => {
  let errors = {}, errValues = {};
  console.log('Deleting large math books');
  return Promise.try(() => {
    return mysql.queryAsync('SELECT * FROM largeMathBooks WHERE ISBN = '+ mysql.escape(input.book));
  }).then((res) => {
    if (res.length == 0) {
      errors.BookExists = true;
      errValues.BookExists = input.book;
    }

    return mysql.queryAsync('SELECT * FROM Borrows WHERE ISBN = ' + mysql.escape(input.book) + ' AND dateOfReturn IS NULL');
  }).then((res) => {
    if (res.length != 0) {
      errors.Borrowed = true;
      errValues.Borrowed = input.book;
    }

    if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
      throw new myError('MALFORMED_INPUT', errors, errValues);
    }

    let query = 'DELETE FROM largeMathBooks WHERE ISBN = ' + mysql.escape(input.book);
    console.log('Executing query: ' + query);
    return mysql.queryAsync(query);
  }).then((_res) => {
    console.log('large math books deleted successfully');
    return ;
  }).catch((error) => {
    console.error('Failed to delete large math books ' + error);
    throw error;
  });
};

module.exports = {
  getLargeMathBooksView,
  updateLargeMathBooksView,
  insertLargeMathBooksView,
  deleteLargeMathBooksView
};