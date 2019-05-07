var mysql = require('../sql');
const Promise = require('bluebird');
const myError = require('../errors');

// Get Books
const getBooks = () => {
  let books;
  console.log('Fetch Books');
  return Promise.try(() => {
    return mysql.queryAsync('SELECT * FROM Book;');
  }).then((res) => {
    books = res;
    console.log('Fetched Books successfully');
    return mysql.queryAsync('SELECT * FROM Publisher;');
  }).then((res) => {
    console.log('Fetched Publishers successfully');
    return { books: books, publishers: res };
  }).catch((error) => {
    console.error('Failed to fetch books' + error);
    throw error;
  });
};

// Update Books
const updateBooks = (input) => {
  let error = '';
  console.log('Update Books');
  return Promise.try(() => {
    return mysql.queryAsync(
      "SELECT * FROM Book WHERE ISBN = " + 
      mysql.escape(input.ISBN) + " and ISBN != " + 
      mysql.escape(input.book) + "")
  }).then((res) => {
    if (res.length != 0) {
      throw new myError('ISBN_ALREADY_EXISTS', input.ISBN);
    }  
    console.log(error); 
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
    return { error: ''};
  }).catch((error) => {
    console.error('Failed to update book ' + error);
    throw error;
  });
};

module.exports = {
  getBooks,
  updateBooks
};