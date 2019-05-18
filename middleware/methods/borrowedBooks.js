var mysql = require('../sql');
const Promise = require('bluebird');
const myError = require('../errors');

const getBorrowedBooks = () => {
  console.log('Fetching view Borrowed Books');
  return Promise.try(() => {
    return mysql.queryAsync('SELECT * FROM BorrowedBooks');
  }).then((res) => {
    console.log('Fetched view BorrowedBooks successfully');
    return { brdBooks: res };
  }).catch((error) => {
    console.error('Failed to fetch view BorrowedBooks');
    throw error;
  })
};

module.exports = {
    getBorrowedBooks
  };