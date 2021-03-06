var mysql = require('../sql');
const Promise = require('bluebird');
const myError = require('../errors');

const getPublishers = () => {
  console.log('Fetch publishers');
  return Promise.try(() => {
    return mysql.queryAsync('SELECT * FROM Publisher;');
  }).then((res) => {
    console.log('Fetched publishers successfully');
    return { publishers: res };
  }).catch((error) => {
    console.error('Failed to fetch publishers' + error);
    throw error;
  });
};

const updatePublisher = (input) => {
  let errors = {}, errValues = {};
  console.log('Update Publisher');
  return Promise.try(() => {
    let flag = true;
    for (const key in input) {
      if (key == 'publisher') continue;
      if (input[key] !== '') flag = false;
    }
    if (flag) {
      errors.nothingSubmitted = true;
    }
    return mysql.queryAsync('SELECT * FROM Publisher WHERE pubName = '+ mysql.escape(input.publisher));
  }).then((res) => {
    if (res.length == 0) {
      errors.PublisherExists = true;
      errValues.PublisherExists = input.publisher;
    }
    
    return mysql.queryAsync(
      'SELECT * FROM Publisher WHERE pubName = ' + 
      mysql.escape(input.pubName) + ' and pubName != ' + 
      mysql.escape(input.publisher) + '')
  }).then((res) => {
    if (res.length != 0) {
      errors.pubName = true;
      errValues.pubName = input.pubName;
    }  
    
    if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
      throw new myError('MALFORMED_INPUT', errors, errValues);
    }

    let sub = '';
    for (const key in input) {
      if (key == 'publisher') continue;
      if (input[key]) {
        if (sub != '') sub = sub + ',';
        sub = sub + (mysql.escapeId(key) + ' = ' + mysql.escape(input[key]) + '');
      }
    }
    let query = 'UPDATE Publisher SET ' + sub + ' WHERE pubName = ' + mysql.escape(input.publisher) + ' ;';
    console.log('Executing query: ' + query);
    return mysql.queryAsync(query);
  }).then((res) => {
    console.log('Updated Publishers successfully');
    return ;
  }).catch((error) => {
    console.error('Failed to update Publishers ' + error);
    throw error;
  });
};

const insertPublishers = (input) => {
  let errors = {}, errValues = {};
  console.log('Insert Publishers');
  return Promise.try(() => {
    return mysql.queryAsync('SELECT * FROM Publisher WHERE pubName = ' + mysql.escape(input.pubName));
  }).then((res) => {
    if (res.length != 0) {
      errors.pubName = true;
      errValues.pubName = input.pubName;
    }

    if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
      throw new myError('MALFORMED_INPUT', errors, errValues);
    }

    let keys = '', values = '';
    for (const key in input) {
      if (key == 'publisher') continue;
      if (input[key]) {
        if (keys != '') { 
          keys = keys + ',';
          values = values + ',';
        }
        keys = keys + mysql.escapeId(key);
        values = values + mysql.escape(input[key]);
      }
    }
    let query = 'INSERT INTO Publisher (' + keys + ') VALUES (' + values + ')';
    console.log('Executing query: ' + query);
    return mysql.queryAsync(query);
  }).then((res) => {
    console.log('Insert to Publisher successfully');
    return ;
  }).catch((error) => {
    console.error('Failed to insert publisher ' + error);
    throw error;
  });
};


const deletePublishers = (input) => {
  let errors = {}, errValues = {};
  console.log('Deleting publisher');
  return Promise.try(() => {
    return mysql.queryAsync('SELECT * FROM Publisher WHERE pubName = '+ mysql.escape(input.publisher));
  }).then((res) =>{
    if (res.length == 0) {
      errors.PublisherExists = true;
      errValues.PublisherExists = input.publisher;
    }

    if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
      throw new myError('MALFORMED_INPUT', errors, errValues);
    }

    let query = 'DELETE FROM Publisher WHERE pubName = ' + mysql.escape(input.publisher);
    console.log('Executing query: ' + query);
    return mysql.queryAsync(query);
  }).then((_res) => {
    console.log('Publisher deleted successfully');
    return ;
  })
};



module.exports = {
  getPublishers,
  updatePublisher,
  insertPublishers,
  deletePublishers
};