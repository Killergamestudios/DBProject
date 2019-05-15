var mysql = require('../sql');
const Promise = require('bluebird');
const myError = require('../errors');

// Get Members
const getMembers = () => {
  console.log('Fetch Memberss');
  return Promise.try(() => {
    return mysql.queryAsync('SELECT * FROM Member;');
  }).then((res) => {
    console.log('Fetched Members successfully');
    return { members: res };
  }).catch((error) => {
    console.error('Failed to fetch members' + error);
    throw error;
  });
};

// Update Members
const updateMembers = (input) => {
    let errors = {}, errValues = {};
    console.log('Update Members');
    return Promise.try(() => {
      return mysql.queryAsync('SELECT * FROM Member WHERE memberID = '+ mysql.escape(input.memberID));
    }).then((res) => {
      if (res.length == 0) {
        errors.memberExists = true;
        errValues.memberExists = input.member;
      }
  
      return mysql.queryAsync(
        'SELECT * FROM Member WHERE memberID = ' + 
        mysql.escape(input.memberID) + ' and memberID != ' + 
        mysql.escape(input.member) + '')
    }).then((res) => {
      if (res.length != 0) {
        errors.memberID = true;
        values.memberID = input.memberID;
      }  
      
      if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
        throw new myError('MALFORMED_INPUT', errors, values);
      }
  
      let sub = '';
      for (const key in input) {
        if (key == 'member') continue;
        if (input[key]) {
          if (sub != '') sub = sub + ',';
          sub = sub + (mysql.escapeId(key) + ' = ' + mysql.escape(input[key]) + '');
        }
      }
      let query = 'UPDATE Member SET ' + sub + ' WHERE memberID = ' + mysql.escape(input.member) + ' ;';
      console.log('Executing query: ' + query);
      return mysql.queryAsync(query);
    }).then((res) => {
      console.log('Updated Members successfully');
      return ;
    }).catch((error) => {
      console.error('Failed to update Members ' + error);
      throw error;
    });
  };

  const insertMembers = (input) => {
    let errors = {}, errValues = {};
    console.log('Insert Members');
    return Promise.try(() => {
      return mysql.queryAsync('SELECT * FROM Member WHERE memberID = ' + mysql.escape(input.memberID));
    }).then((res) => {
      if (res.length != 0) {
        errors.memberID = true;
        errValues.memberID = input.memberID;
      }
  
      if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
        throw new myError('MALFORMED_INPUT', errors, errValues);
      }
  
      let keys = '', values = '';
      for (const key in input) {
        if (key == 'member') continue;
        if (input[key]) {
          if (keys != '') { 
            keys = keys + ',';
            values = values + ',';
          }
          keys = keys + mysql.escapeId(key);
          values = values + mysql.escape(input[key]);
        }
      }
      let query = 'INSERT INTO Member (' + keys + ') VALUES (' + values + ')';
      console.log('Executing query: ' + query);
      return mysql.queryAsync(query);
    }).then((res) => {
      console.log('Insert to Member successfully');
      return ;
    }).catch((error) => {
      console.error('Failed to insert member ' + error);
      throw error;
    });
  };

module.exports = {
    getMembers,
    updateMembers,
    insertMembers
};