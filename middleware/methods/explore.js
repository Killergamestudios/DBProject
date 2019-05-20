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

const getAvailableBooks = (input) =>{
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

const getEmpLeaderboard = (input) => {
    console.log('Fetching Available Employees');
    return Promise.try(() => {
        const query = `
        SELECT CONCAT(Employee.EFirst, " ", Employee.ELast) AS Employee, COUNT(Reminder.empID) AS NumOfReminders
        FROM Employee
        LEFT JOIN Reminder ON Employee.empID = Reminder.empID
        GROUP BY Employee.empID
        ORDER BY NumOfReminders DESC;`;
        return mysql.queryAsync(query);
    }).then((res) => {
        console.log('Fetched Employees Leaderboard successfully');
        return { aEmployees: res };
    }).catch((error) => {
        console.error('Failed to fetch Employees Leaderboard ' + error);
        throw error;
    });
};

const getTopBorrowers = (input) => {
    console.log("Fetching Members Sorted by Borrows")
    return Promise.try(() => {
        const query = `
        SELECT CONCAT(Member.MFirst, " ", Member.MLast) AS Member, COUNT(Borrows.memberID) AS NumOfBorrows
        FROM Member
        LEFT JOIN Borrows ON Member.memberID = Borrows.memberID
        GROUP BY Member.memberID
        ORDER BY NumOfBorrows DESC;`;
        return mysql.queryAsync(query);
    }).then((res) => {
        console.log('Fetched Members Borrow List successfully');
        return { memberB: res };
    }).catch((error) => {
        console.error('Failed to fetch Members Borrow List ' + error);
        throw error;
    });
};



module.exports = {
  getAllBooksDetails,
  getBooksPerCategory,
  getBooksPerPublisher,
  getAvailableBooks,
  getEmpLeaderboard,
  getTopBorrowers
};