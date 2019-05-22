var mysql = require('../sql');
const Promise = require('bluebird');

const getAllBooksDetails = () => {
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

const getBooksPerCategory = () => {
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

const getBooksPerPublisher = () =>{
  console.log('Fetching books per publisher');
  return Promise.try(() => {
    const query = `
    SELECT R.pubName, COUNT(R.Title)
    FROM
    (SELECT P.pubName , B.Title
    FROM Publisher AS P 
    LEFT JOIN Book AS B ON P.pubName = B.pubName) AS R 
    GROUP BY R.pubName 
    ORDER BY R.pubName DESC;`;
    return mysql.queryAsync(query);
  }).then((res) => {
    console.log('Fetched books per publisher successfully');
    return { publishers: res };
  }).catch((error) => {
    console.error('Failed to fetch books per publisher ' + error);
    throw error;
  });
};

const getAvailableBooks = () =>{
  console.log('Fetching Available Books');
  return Promise.try(() => {
    const query = `
    SELECT R.Title , COUNT(R.copyNr) AS AvailableBooks FROM
    (SELECT R2.Title , R2.copyNr FROM 
      (SELECT BR.copyNr , BR.ISBN 
      FROM Borrows AS BR WHERE BR.DateOfReturn IS NULL) AS R1 
    RIGHT JOIN 
      (SELECT B.Title,C.copyNr,B.ISBN
      FROM Book AS B 
      INNER JOIN Copies AS C ON C.ISBN = B.ISBN) AS R2 ON R2.ISBN = R1.ISBN AND R2.copyNr = R1.copyNr WHERE R1.ISBN IS NULL) AS R 
    GROUP BY R.Title;`;
    return mysql.queryAsync(query);
  }).then((res) => {
    console.log('Fetched Available Books successfully');
    return { Abooks: res };
  }).catch((error) => {
    console.error('Failed to fetch Available Books' + error);
    throw error;
  });
};

const getPopularAuthors = () => {
  console.log('Fetching popular authors');
  return Promise.try(() => {
    const query = `
    SELECT CONCAT(AW.AFirst, " ", AW.ALast) AS Author, COUNT(BBr.ISBN) AS Popularity
    FROM
    (SELECT A.authID, A.AFirst, A.ALast, W.ISBN
    FROM Author AS A
    INNER JOIN WrittenBy AS W ON W.authID = A.authID) AS AW,
    (SELECT B.ISBN
    FROM Borrows As Br
    INNER JOIN Book AS B ON Br.ISBN = B.ISBN) AS BBr
    WHERE AW.ISBN = BBr.ISBN
    GROUP BY AW.authID
    ORDER BY Popularity DESC;`;
    return mysql.queryAsync(query);
  }).then((res) => {
    console.log('Fetched popular authors successfully');
    return { authors: res }
  }).catch((error) => {
    console.error('Failed to fetch popular authors ' + error);
    throw error;
  })
}

const getActiveWriters = (input) =>{
  console.log('Fetching Active Writers');
  return Promise.try(() => {
    const query = `
    SELECT CONCAT (R.AFirst , " " , R.ALast) AS Name , COUNT(R.ISBN) AS C FROM (SELECT W.ISBN,A.AFirst,A.ALast,A.authID 
      FROM WrittenBy AS W RIGHT JOIN Author AS A ON A.authID = W.authID) 
      AS R GROUP BY R.authID HAVING C > 0 ORDER BY R.ALast;`;
    return mysql.queryAsync(query);
  }).then((res) => {
    console.log('Fetched Active Writers successfully');
    return { AWriters: res };
  }).catch((error) => {
    console.error('Failed to fetch Active Writers' + error);
    throw error;
  });
};

module.exports = {
  getAllBooksDetails,
  getBooksPerCategory,
  getBooksPerPublisher,
  getAvailableBooks,
  getPopularAuthors,
  getActiveWriters
};