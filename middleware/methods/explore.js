var mysql = require('../sql');
const Promise = require('bluebird');

const getAllBooksDetails = (input) => {
  console.log('Fetching books list');
  return Promise.try(() => {
    const query = 
    `SELECT BP.ISBN, BP.Title, BP.pubName,
    GROUP_CONCAT(DISTINCT BP.estYear) AS estYear,
    GROUP_CONCAT(DISTINCT CONCAT(ALast, " ", AFirst) SEPARATOR ', ') AS AName,
    GROUP_CONCAT(DISTINCT CBT.categoryName) AS categoryName,
    COUNT(DISTINCT BC.copyNr) AS copies
    FROM
    (SELECT ISBN, AFirst, ALast
    FROM Author AS A
    INNER JOIN WrittenBy AS W ON W.authID = A.authID) AS WA,
    (SELECT Title, estYear, ISBN, B.pubName
    FROM Book AS B
    INNER JOIN Publisher AS P ON P.pubName = B.pubName) AS BP,
    (SELECT C.categoryName, ISBN
    FROM Category AS C
    INNER JOIN BelongTo AS BT ON BT.categoryName = C.categoryName) AS CBT,
    (SELECT copyNr, B.ISBN
    FROM Copies AS C
    INNER JOIN Book AS B ON B.ISBN = C.ISBN) AS BC
    WHERE WA.ISBN = BP.ISBN AND CBT.ISBN = BP.ISBN AND BC.ISBN = BP.ISBN
    GROUP BY BP.ISBN;`;
    return mysql.queryAsync(query);
  }).then((res) => {
    console.log('Fetched books list successfully');
    return { books: res };
  }).catch((error) => {
    console.error('Failed to get full books list ' + error);
    throw error;
  })
};

const getBooksPerCategory = (input) => {
  console.log('Fetching books per category');
  return Promise.try(() => {
    const query = `
    SELECT C.categoryName, COUNT(ISBN) AS Books
    FROM BelongTo AS BT, Category AS C
    WHERE C.categoryName = BT.categoryName
    GROUP BY C.categoryName
    ORDER BY C.categoryName;`;
    return mysql.queryAsync(query);
  }).then((res) => {
    console.log('Fetched books per category successfully');
    return { categories: res };
  }).catch((error) => {
    console.error('Failed to fetch books per category ' + error);
    throw error;
  });
};

const getBooksPerPublisher = (input) =>{
  console.log('Fetching books per publisher');
  return Promise.try(() => {
    const query = `
    SELECT R.pubName, COUNT(R.Title) FROM (SELECT P.pubName , B.Title FROM Publisher AS P LEFT JOIN Book AS B ON P.pubName = B.pubName) AS R GROUP BY R.pubName ORDER BY R.pubName DESC;`;
    return mysql.queryAsync(query);
  }).then((res) => {
    console.log('Fetched books per publisher successfully');
    return { publishers: res };
  }).catch((error) => {
    console.error('Failed to fetch books per publisher ' + error);
    throw error;
  });
};



module.exports = {
  getAllBooksDetails,
  getBooksPerCategory,
  getBooksPerPublisher
};