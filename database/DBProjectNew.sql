-- MySQL dump 10.13  Distrib 5.7.26, for Linux (x86_64)
--
-- Host: localhost    Database: DBProject
-- ------------------------------------------------------
-- Server version	5.7.26-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Author`
--

DROP TABLE IF EXISTS `Author`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Author` (
  `authID` int(7) unsigned NOT NULL AUTO_INCREMENT,
  `AFirst` tinytext CHARACTER SET utf8,
  `ALast` tinytext CHARACTER SET utf8,
  `ABirthDate` date DEFAULT NULL,
  PRIMARY KEY (`authID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Author`
--

LOCK TABLES `Author` WRITE;
/*!40000 ALTER TABLE `Author` DISABLE KEYS */;
INSERT INTO `Author` VALUES (1,'Νικόλαος','Παπασπύρου','1970-01-01'),(2,'Νεκτάριος','Κοζύρης','1970-01-01'),(3,'Ιωάννης','Ρουμελιώτης','1953-01-01'),(4,'Ιωάννης','Τσαλαμέγκας','1958-01-01'),(5,'Ιωάννης','Ράπτης','1959-01-01'),(6,'Ιωάννης','Γκαρούτσος','1961-01-01'),(7,'Θεμιστοκλής','Ρασσιάς','1951-01-01'),(8,'Ιωσήφ-Γεώργιος','Παναγιωτόπουλος','1998-01-01'),(9,'Morris','Mano','1968-01-01'),(10,'Stephen','Hawking','1942-01-08'),(11,'Stan','Lee','1922-12-28');
/*!40000 ALTER TABLE `Author` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `BelongTo`
--

DROP TABLE IF EXISTS `BelongTo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `BelongTo` (
  `ISBN` varchar(13) NOT NULL,
  `categoryName` varchar(30) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`ISBN`,`categoryName`),
  KEY `BelongTo_ibfk_2` (`categoryName`),
  CONSTRAINT `BelongTo_ibfk_1` FOREIGN KEY (`ISBN`) REFERENCES `Book` (`ISBN`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `BelongTo_ibfk_2` FOREIGN KEY (`categoryName`) REFERENCES `Category` (`categoryName`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BelongTo`
--

LOCK TABLES `BelongTo` WRITE;
/*!40000 ALTER TABLE `BelongTo` DISABLE KEYS */;
INSERT INTO `BelongTo` VALUES ('9034686234786','Action and Adventure'),('9034676831986','Comedy'),('9024686234786','Science'),('9024686234986','Science'),('9031686234786','Science'),('9034686234986','Science'),('9034686541986','Science'),('9024586134986','Text Book'),('9024686134986','Text Book'),('9024686234786','Text Book'),('9024686234986','Text Book'),('9034686541986','Text book'),('9789604911073','Text book');
/*!40000 ALTER TABLE `BelongTo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Book`
--

DROP TABLE IF EXISTS `Book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Book` (
  `ISBN` varchar(13) NOT NULL,
  `Title` tinytext CHARACTER SET utf8,
  `PubYear` int(5) unsigned DEFAULT NULL,
  `NumPages` int(5) unsigned DEFAULT NULL,
  `pubName` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`ISBN`),
  KEY `pubName` (`pubName`),
  CONSTRAINT `Book_ibfk_1` FOREIGN KEY (`pubName`) REFERENCES `Publisher` (`pubName`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Book`
--

LOCK TABLES `Book` WRITE;
/*!40000 ALTER TABLE `Book` DISABLE KEYS */;
INSERT INTO `Book` VALUES ('9024586134986','Μαθηματική Ανάλυση Ι',2017,800,'Τσότρας'),('9024686134986','Μαθηματική Ανάλυση ΙI',2017,750,'Τσότρας'),('9024686234786','Ηλεκτρομαγνητικά Πεδία ΙΙ',2016,1000,'Τζιόλα'),('9024686234986','Ηλεκτρομαγνητικά Πεδία Ι',2016,1000,'Τζιόλα'),('9031686234786','Η Μαγεία της Φυσικής',2008,1100,'Παπασωτηρίου'),('9034676831986','Ποιος θα φορέσει τόσα ρούχα;;',2017,135,'Ζάχος'),('9034686234786','Περιπέτειες της Arjumand',2019,100,'Ζάχος'),('9034686234986','Προγραμματίζοντας με την γιαγιά σας',2019,542,'Ζάχος'),('9034686541986','Πως να Διδάξετε Pipeline στο Ανιψάκι σας',2018,700,'SPIN'),('9789604911073','Μικροηλεκρονικά Κυκλώματα',2014,800,'Παπασωτηρίου');
/*!40000 ALTER TABLE `Book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `BorrowedBooks`
--

DROP TABLE IF EXISTS `BorrowedBooks`;
/*!50001 DROP VIEW IF EXISTS `BorrowedBooks`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `BorrowedBooks` AS SELECT 
 1 AS `title`,
 1 AS `MFirst`,
 1 AS `MLast`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Borrows`
--

DROP TABLE IF EXISTS `Borrows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Borrows` (
  `memberID` int(7) unsigned NOT NULL,
  `ISBN` varchar(13) NOT NULL,
  `copyNr` int(2) unsigned NOT NULL,
  `dateOfBorrowing` date NOT NULL,
  `dateOfReturn` date DEFAULT NULL,
  PRIMARY KEY (`memberID`,`ISBN`,`copyNr`,`dateOfBorrowing`),
  KEY `ISBN` (`ISBN`,`copyNr`),
  CONSTRAINT `Borrows_ibfk_1` FOREIGN KEY (`ISBN`, `copyNr`) REFERENCES `Copies` (`ISBN`, `copyNr`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Borrows_ibfk_2` FOREIGN KEY (`memberID`) REFERENCES `Member` (`memberID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Borrows`
--

LOCK TABLES `Borrows` WRITE;
/*!40000 ALTER TABLE `Borrows` DISABLE KEYS */;
INSERT INTO `Borrows` VALUES (1,'9024586134986',1,'2019-04-01','2019-05-10'),(1,'9031686234786',1,'2017-01-01','2017-02-01'),(1,'9034686234786',1,'2019-04-01',NULL),(2,'9034686234786',2,'2019-04-01',NULL),(3,'9024686234786',1,'2018-09-10','2019-02-20'),(4,'9031686234786',2,'2007-01-01',NULL),(5,'9789604911073',1,'2019-04-01','2019-05-10'),(6,'9789604911073','2','2017-09-11',NULL),(1,'9034686234786',1,'2019-05-01','2019-05-19'),(3,'9034686234786',2,'2019-04-01','2019-08-16');
/*!40000 ALTER TABLE `Borrows` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER incrBorrowed BEFORE INSERT ON Borrows
FOR EACH ROW
BEGIN
    IF NEW.dateOfReturn IS NULL THEN
        UPDATE Member 
        SET NumOfBorrowed = NumOfBorrowed + 1
        WHERE memberID = NEW.memberID;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER decrBorrowed BEFORE UPDATE ON Borrows
FOR EACH ROW
BEGIN
  IF OLD.dateOfReturn IS NULL AND NEW.dateOfReturn IS NOT NULL THEN
    UPDATE Member AS M
    SET NumOfBorrowed = NumOfBorrowed - 1
    WHERE memberID = OLD.memberID;
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRiGGER unBlackList AFTER UPDATE ON Borrows
FOR EACH ROW
BEGIN
  IF (SELECT COUNT(*) FROM Borrows
  WHERE dateOfReturn IS NULL AND DATEDIFF(NOW(), dateOfBorrowing) >= 30 
  AND memberID = OLD.memberID) = 0 THEN
    UPDATE Member
    SET blackListed = false
    WHERE memberID = OLD.memberID;
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Category` (
  `categoryName` varchar(30) CHARACTER SET utf8 NOT NULL,
  `superCategoryName` varchar(30) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`categoryName`),
  KEY `superCategoryName` (`superCategoryName`),
  CONSTRAINT `Category_ibfk_1` FOREIGN KEY (`superCategoryName`) REFERENCES `Category` (`categoryName`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
INSERT INTO `Category` VALUES ('Action and Adventure',NULL),('Biography',NULL),('Comedy',NULL),('Comic Book',NULL),('Philosophy',NULL),('Science',NULL),('Fantasy','Action and Adventure'),('Autobiography','Biography'),('Manga','Comic book'),('Text Book','Science');
/*!40000 ALTER TABLE `Category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Copies`
--

DROP TABLE IF EXISTS `Copies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Copies` (
  `ISBN` varchar(13) NOT NULL,
  `copyNr` int(2) unsigned NOT NULL,
  `shelf` int(4) unsigned DEFAULT NULL,
  PRIMARY KEY (`ISBN`,`copyNr`),
  CONSTRAINT `Copies_ibfk_1` FOREIGN KEY (`ISBN`) REFERENCES `Book` (`ISBN`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Copies`
--

LOCK TABLES `Copies` WRITE;
/*!40000 ALTER TABLE `Copies` DISABLE KEYS */;
INSERT INTO `Copies` VALUES ('9024586134986',1,1),('9024586134986',2,1),('9024686134986',1,1),('9024686134986',2,1),('9024686234786',1,1),('9024686234786',2,1),('9024686234986',1,1),('9024686234986',2,1),('9031686234786',1,1),('9031686234786',2,1),('9034676831986',1,2),('9034686234786',1,1),('9034686234786',2,1),('9034686234986',1,17),('9034686234986',2,17),('9034686234986',3,17),('9034686541986',1,3),('9034686541986',2,4),('9789604911073',1,2),('9789604911073',2,2);
/*!40000 ALTER TABLE `Copies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Employee`
--

DROP TABLE IF EXISTS `Employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Employee` (
  `empID` int(7) unsigned NOT NULL AUTO_INCREMENT,
  `EFirst` tinytext CHARACTER SET utf8,
  `ELast` tinytext CHARACTER SET utf8,
  `Salary` int(4) unsigned DEFAULT NULL,
  PRIMARY KEY (`empID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employee`
--

LOCK TABLES `Employee` WRITE;
/*!40000 ALTER TABLE `Employee` DISABLE KEYS */;
INSERT INTO `Employee` VALUES (1,'Μιχαέλα','Αντωνοπούλου',2000),(2,'Γεώργιος','Γέννης',200),(3,'Χριστίνα','Τζε',3000),(4,'Κώστας','Πλακετόπουλος',5000),(5,'Ηλίας','Παπανδρέου',10000),(6,'Alexander','The Great',3000),(7,'Δημήτρης','Γαλάνης',2000),(8,'Παναγιώτης','Κολιός',2000),(9,'Χρίστος','Χριστάκης',2000),(10,'John','Cena',7000);
/*!40000 ALTER TABLE `Employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Member`
--

DROP TABLE IF EXISTS `Member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Member` (
  `memberID` int(7) unsigned NOT NULL AUTO_INCREMENT,
  `MFirst` tinytext CHARACTER SET utf8,
  `MLast` tinytext CHARACTER SET utf8,
  `Street` tinytext CHARACTER SET utf8,
  `Number` int(4) unsigned DEFAULT NULL,
  `PostalCode` tinytext,
  `MBirthDate` date DEFAULT NULL,
  `NumOfBorrowed` int(2) unsigned NOT NULL DEFAULT '0',
  `BlackListed` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`memberID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Member`
--

LOCK TABLES `Member` WRITE;
/*!40000 ALTER TABLE `Member` DISABLE KEYS */;
INSERT INTO `Member` VALUES (1,'Αντώνιος','Βαλμάς','Σουλίου',6,'15235','1998-03-07',1,1),(2,'Παναγιώτης','Λουλάκης','Νερατζιωτίσσης',49,'14235','1998-08-18',1,1),(3,'Ισαβέλλα','Κουκουλά','28ης Οκτωβρίου',10,'14135','1998-08-04',0,0),(4,'Elon','Musk','Mars',9,'98765','1978-08-04',1,1),(5,'Μιχαήλ','Θοδώρου','Μουσικής',12,'12345','1998-05-04',0,0),(6,'Δημοσθένης','Κανιάρης','Δουκίσσης',17,'15123','1998-01-01',1,1),(7,'Παναγιώτης','Μιναϊδης','Πεύκης',4,'15134','1998-07-12',0,0),(8,'Χρίστος','Χριστοδούλου','Πεύκης',5,'16789','1998-08-04',0,0),(9,'Σάμι','Χαντζικαλήλ','Ηρακλείου',12,'12345','1998-04-26',0,0),(10,'Jason','Milionis','Αγίου Κωνσταντίνου',6,'15124','1998-06-29',0,0);
/*!40000 ALTER TABLE `Member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `PermanentEmployee`
--

DROP TABLE IF EXISTS `PermanentEmployee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PermanentEmployee` (
  `empID` int(7) unsigned NOT NULL,
  `HiringDate` date DEFAULT NULL,
  PRIMARY KEY (`empID`),
  CONSTRAINT `PermanentEmployee_ibfk_1` FOREIGN KEY (`empID`) REFERENCES `Employee` (`empID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PermanentEmployee`
--

LOCK TABLES `PermanentEmployee` WRITE;
/*!40000 ALTER TABLE `PermanentEmployee` DISABLE KEYS */;
INSERT INTO `PermanentEmployee` VALUES (1,'2016-10-01'),(4,'2000-10-01'),(5,'2016-10-01'),(6,'0206-10-01'),(9,'2006-10-01');
/*!40000 ALTER TABLE `PermanentEmployee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Publisher`
--

DROP TABLE IF EXISTS `Publisher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Publisher` (
  `pubName` varchar(50) CHARACTER SET utf8 NOT NULL,
  `estYear` int(5) unsigned DEFAULT NULL,
  `Street` tinytext CHARACTER SET utf8,
  `Number` int(6) unsigned DEFAULT NULL,
  `PostalCode` tinytext,
  PRIMARY KEY (`pubName`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Publisher`
--

LOCK TABLES `Publisher` WRITE;
/*!40000 ALTER TABLE `Publisher` DISABLE KEYS */;
INSERT INTO `Publisher` VALUES ('Event Horizon',1990,'Ανδρομέδας',10,'10149'),('SPIN',1980,'Πανεπιστημίου',44,'10679'),('Ζάχος',1942,'Πολυτεχνείου',42,'17742'),('Παπασωτηρίου',1970,'Στουρναρη',49,'10682'),('Τζιόλα',1978,'Χαριλάου Τρικούπη',16,'10681'),('Τσότρας',1975,'Σμύρνης',14,'15772');
/*!40000 ALTER TABLE `Publisher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Reminder`
--

DROP TABLE IF EXISTS `Reminder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Reminder` (
  `empID` int(7) unsigned NOT NULL,
  `memberID` int(7) unsigned NOT NULL,
  `ISBN` varchar(13) NOT NULL,
  `copyNr` int(2) unsigned NOT NULL,
  `dateOfBorrowing` date NOT NULL,
  `dateOfReminder` date NOT NULL,
  PRIMARY KEY (`empID`,`memberID`,`ISBN`,`copyNr`,`dateOfBorrowing`,`dateOfReminder`),
  KEY `memberID` (`memberID`,`ISBN`,`copyNr`,`dateOfBorrowing`),
  KEY `ISBN` (`ISBN`,`copyNr`),
  CONSTRAINT `Reminder_ibfk_1` FOREIGN KEY (`memberID`, `ISBN`, `copyNr`, `dateOfBorrowing`) REFERENCES `Borrows` (`memberID`, `ISBN`, `copyNr`, `dateOfBorrowing`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `Reminder_ibfk_2` FOREIGN KEY (`empID`) REFERENCES `Employee` (`empID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Reminder`
--

LOCK TABLES `Reminder` WRITE;
/*!40000 ALTER TABLE `Reminder` DISABLE KEYS */;
INSERT INTO `Reminder` VALUES (1,1,'9031686234786',1,'2017-01-01','2017-01-15'),(1,1,'9031686234786',1,'2017-01-01','2017-01-20'),(1,1,'9034686234786',1,'2019-04-01','2019-04-15'),(1,2,'9034686234786',2,'2019-04-01','2019-04-15'),(2,2,'9034686234786',2,'2019-04-01','2019-04-20');
/*!40000 ALTER TABLE `Reminder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `TemporaryEmployee`
--

DROP TABLE IF EXISTS `TemporaryEmployee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `TemporaryEmployee` (
  `empID` int(7) unsigned NOT NULL,
  `ContractNr` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`empID`),
  CONSTRAINT `TemporaryEmployee_ibfk_1` FOREIGN KEY (`empID`) REFERENCES `Employee` (`empID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `TemporaryEmployee`
--

LOCK TABLES `TemporaryEmployee` WRITE;
/*!40000 ALTER TABLE `TemporaryEmployee` DISABLE KEYS */;
INSERT INTO `TemporaryEmployee` VALUES (2,333333333),(3,694691323),(7,184651423),(8,289745423),(10,189795413);
/*!40000 ALTER TABLE `TemporaryEmployee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `WrittenBy`
--

DROP TABLE IF EXISTS `WrittenBy`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `WrittenBy` (
  `ISBN` varchar(13) NOT NULL,
  `authID` int(7) unsigned NOT NULL,
  PRIMARY KEY (`ISBN`,`authID`),
  KEY `authID` (`authID`),
  CONSTRAINT `WrittenBy_ibfk_1` FOREIGN KEY (`ISBN`) REFERENCES `Book` (`ISBN`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `WrittenBy_ibfk_2` FOREIGN KEY (`authID`) REFERENCES `Author` (`authID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WrittenBy`
--

LOCK TABLES `WrittenBy` WRITE;
/*!40000 ALTER TABLE `WrittenBy` DISABLE KEYS */;
INSERT INTO `WrittenBy` VALUES ('9034686234786',1),('9034686234986',1),('9034676831986',2),('9034686541986',2),('9024686234786',3),('9024686234986',3),('9024686234786',4),('9024686234986',4),('9789604911073',4),('9031686234786',5),('9024586134986',7),('9024686134986',7);
/*!40000 ALTER TABLE `WrittenBy` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `largeMathBooks`
--

DROP TABLE IF EXISTS `largeMathBooks`;
/*!50001 DROP VIEW IF EXISTS `largeMathBooks`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `largeMathBooks` AS SELECT 
 1 AS `ISBN`,
 1 AS `Title`,
 1 AS `NumPages`,
 1 AS `PubYear`,
 1 AS `pubName`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `BorrowedBooks`
--

/*!50001 DROP VIEW IF EXISTS `BorrowedBooks`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=TEMPTABLE */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `BorrowedBooks` AS select `Book`.`Title` AS `title`,`Member`.`MFirst` AS `MFirst`,`Member`.`MLast` AS `MLast` from ((`Book` join `Borrows`) join `Member`) where ((`Book`.`ISBN` = `Borrows`.`ISBN`) and isnull(`Borrows`.`dateOfReturn`) and (`Member`.`memberID` = `Borrows`.`memberID`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `largeMathBooks`
--

/*!50001 DROP VIEW IF EXISTS `largeMathBooks`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `largeMathBooks` AS select `B`.`ISBN` AS `ISBN`,`B`.`Title` AS `Title`,`B`.`NumPages` AS `NumPages`,`B`.`PubYear` AS `PubYear`,`B`.`pubName` AS `pubName` from `Book` `B` where ((`B`.`NumPages` > 500) and (`B`.`Title` like '%Μαθηματ%')) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-25 19:26:11
