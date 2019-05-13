var mysql = require('../sql');
const Promise = require('bluebird');
const myError = require('../errors');

// Get Books
const getBooks = () => {
  console.log('Fetch Books');
  return Promise.try(() => {
    return mysql.queryAsync('SELECT * FROM Book;');
  }).then((res) => {
    console.log('Fetched Books successfully');
    return { books: res };
  }).catch((error) => {
    console.error('Failed to fetch books' + error);
    throw error;
  });
};

// Update Books
const updateBooks = (input) => {
  let errors = {}, errValues = {};
  console.log('Update Books');
  return Promise.try(() => {
    return mysql.queryAsync('SELECT * FROM Book WHERE ISBN = '+ mysql.escape(input.book));
  }).then((res) => {
    if (res.length == 0) {
      errors.BookExists = true;
      errValues.BookExists = input.book;
    }

    return mysql.queryAsync('SELECT * FROM Publisher WHERE pubName = '+ mysql.escape(input.pubName));
  }).then((res) => {
    if (res.length == 0) {
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
    let query = 'UPDATE Book SET ' + sub + ' WHERE ISBN = ' + mysql.escape(input.book);
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
const insertBooks = (input) => {
  let errors = {}, errValues = {};
  console.log('Insert Books');
  return Promise.try(() => {
    return mysql.queryAsync("SELECT * FROM Book WHERE ISBN = " + mysql.escape(input.ISBN));
  }).then((res) => {
    if (res.length != 0) {
      errors.ISBN = true;
      errValues.ISBN = input.ISBN;
    }

    return mysql.queryAsync('SELECT * FROM Publisher WHERE pubName = '+ mysql.escape(input.pubName));
  }).then((res) => {
    if (res.length == 0) {
      errors.PublisherExists = true;
      errValues.PublisherExists = input.pubName;
    }

    if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
      throw new myError('MALFORMED_INPUT', errors, errValues);
    }

    let keys = '', values = '';
    for (const key in input) {
      if (key == 'book') continue;
      if (input[key]) {
        if (keys != '') { 
          keys = keys + ',';
          values = values + ',';
        }
        keys = keys + mysql.escapeId(key);
        values = values + mysql.escape(input[key]);
      }
    }
    let query = 'INSERT INTO Book (' + keys + ') VALUES (' + values + ')';
    console.log('Executing query: ' + query);
    return mysql.queryAsync(query);
  }).then((res) => {
    console.log('Insert to Books successfully');
    return ;
  }).catch((error) => {
    console.error('Failed to insert book ' + error);
    throw error;
  });
};

const deleteBooks = (input) => {
  let errors = {}, errValues = {};
  console.log('Deleting book');
  return Promise.try(() => {
    return mysql.queryAsync('SELECT * FROM Book WHERE ISBN = '+ mysql.escape(input.book));
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

    let query = 'DELETE FROM Book WHERE ISBN = ' + mysql.escape(input.book);
    console.log('Executing query: ' + query);
    return mysql.queryAsync(query);
  }).then((_res) => {
    console.log('Book deleted successfully');
    return ;
  })
};

module.exports = {
  deleteBooks,
  getBooks,
  insertBooks,
  updateBooks
};