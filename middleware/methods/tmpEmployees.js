var mysql = require('../sql');
const Promise = require('bluebird');
const myError = require('../errors');

const getTmpEmployeesView = () => {
  console.log('Fetching view temporary Employees');
  return Promise.try(() => {
    return mysql.queryAsync('SELECT * FROM tmpEmployees ORDER BY ELast');
  }).then((res) => {
    console.log('Fetched view temporary Employees successfully');
    return { tmpEmps: res };
  }).catch((error) => {
    console.error('Failed to fetch view temporary Employees');
    throw error;
  })
};

const updateTmpEmployeesView = (input) => {
  let errors = {}, errValues = {};
  console.log('Update Temporary Employee');
  return Promise.try(() => {
    return mysql.queryAsync('SELECT * FROM tmpEmployees WHERE empID = '+ mysql.escape(input.tmpEmp));
  }).then((res) => {
    if (res.length == 0) {
      errors.tmpEmployeeExists = true;
      errValues.tmpEmployeeExists = input.tmpEmp;
    }

    if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
      throw new myError('MALFORMED_INPUT', errors, errValues);
    }

    let sub = '';
    for (const key in input) {
      if (key == 'tmpEmp') continue;
      if (input[key]) {
        if (sub != '') sub = sub + ',';
        sub = sub + (mysql.escapeId(key) + ' = ' + mysql.escape(input[key]) + '');
      }
    }
    let query = 'UPDATE tmpEmployees SET ' + sub + ' WHERE empID = ' + mysql.escape(input.tmpEmp);
    console.log('Executing query: ' + query);
    return mysql.queryAsync(query);
  }).then((res) => {
    console.log('Updated Temporary Employee successfully');
    return ;
  }).catch((error) => {
    console.error('Failed to update Temporary Employee ' + error);
    throw error;
  });
};


// Insert Books
const insertTmpEmployeesView = (input) => {
  let errors = {}, errValues = {};
  console.log('Insert Temporary Employee');
  return Promise.try(() => {
    return mysql.queryAsync('SELECT * FROM tmpEmployees WHERE empID = '+ mysql.escape(input.empID));
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
    let query = 'INSERT INTO tmpEmployees (' + keys + ') VALUES (' + values + ')';
    console.log('Executing query: ' + query);
    return mysql.queryAsync(query);
  }).then((res) => {
    console.log('Insert to Temporary Employees successfully');
    return ;
  }).catch((error) => {
    console.error('Failed to insert Temporary Employee ' + error);
    throw error;
  });
};

const deleteTmpEmployeesView = (input) => {
  let errors = {}, errValues = {};
  console.log('Deleting Temporary Employee');
  return Promise.try(() => {
    return mysql.queryAsync('SELECT * FROM tmpEmployees WHERE empID = '+ mysql.escape(input.tmpEmp));
  }).then((res) => {
    if (res.length == 0) {
      errors.tmpEmployeeExists = true;
      errValues.tmpEmployeeExists = input.tmpEmp;
    }

    if (Object.entries(errors).length !== 0 && errors.constructor === Object) {
      throw new myError('MALFORMED_INPUT', errors, errValues);
    }

    let query = 'DELETE FROM tmpEmployees WHERE empID = ' + mysql.escape(input.tmpEmp);
    console.log('Executing query: ' + query);
    return mysql.queryAsync(query);
  }).then((_res) => {
    console.log('Temporary Employee deleted successfully');
    return ;
  }).catch((error) => {
    console.error('Failed to delete Temporary Employee ' + error);
    throw error;
  });
};

module.exports = {
  getTmpEmployeesView,
  updateTmpEmployeesView,
  insertTmpEmployeesView,
  deleteTmpEmployeesView
};