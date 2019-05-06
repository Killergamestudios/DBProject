var mysql = require('./sql');
const Promise = require('bluebird');

// Get Books
const getBooks = () => {
    console.log('Fetch Books');
    return Promise.try(() => {
        return mysql.queryAsync('SELECT * FROM Book;');
    }).then((res) => {
        console.log('Fetched Books successfully');
        return res;
    }).catch((error) => {
        console.error('Failed to fetch books' + error);
        throw error;
    });
};

// Update Books
const updateBooks = (input) => {
    console.log('Update Books');
    let sub = '';
    for (const key in input) {
        if (input[key]) {
            if (sub != '') sub = sub + ',';
            sub = sub + (mysql.escapeId(key) + ' = \'' + mysql.escape(input[key]) + '\'');
        }
    }
    let query = 'UPDATE Book SET ' + sub + ' WHERE ISBN = ' + mysql.escape(input.book);
    console.log(query);
    return Promise.try(() => {
        return mysql.queryAsync('UPDATE Book FROM Book;');
    }).then((res) => {
        console.log('Updated Books successfully');
        return {success: 'True'};
    }).catch((error) => {
        console.error('Failed to update book' + error);
        throw error;
    });
};

module.exports = {
    getBooks,
    updateBooks
};