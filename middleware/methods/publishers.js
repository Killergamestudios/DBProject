var mysql = require('../sql');
const Promise = require('bluebird');
const myError = require('../errors');


const getPublishers = () => {
  let publishers;
  console.log('Fetch publishers');
  return Promise.try(() => {
    return mysql.queryAsync('SELECT * FROM Publisher;');
  }).then((res) => {
    publishers = res;
    console.log('Fetched publishers successfully');
    return { publishers: res };
  }).catch((error) => {
    console.error('Failed to fetch publishers' + error);
    throw error;
  });
};

const updatePublisher = (input) => {
  let error = '';
  console.log('Update Publisher');
  return Promise.try(() => {
    return mysql.queryAsync(
      "SELECT * FROM Publisher WHERE pubName = " + 
      mysql.escape(input.pubName) + " and pubName != " + 
      mysql.escape(input.publisher) + "")
  }).then((res) => {
    if (res.length != 0) {
      throw new myError('pubName_ALREADY_EXISTS', input.pubName);
    }  
    console.log(error); 
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
    return { error: ''};
  }).catch((error) => {
    console.error('Failed to update Publishers ' + error);
    throw error;
  });
};



module.exports = {
  getPublishers,
  updatePublisher
};