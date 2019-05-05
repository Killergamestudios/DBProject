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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Author`
--

LOCK TABLES `Author` WRITE;
/*!40000 ALTER TABLE `Author` DISABLE KEYS */;
INSERT INTO `Author` VALUES (1,'Νικόλαος','Παπασπύρου','1970-01-01');
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
  `catagoryName` varchar(30) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`ISBN`,`catagoryName`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `BelongTo`
--

LOCK TABLES `BelongTo` WRITE;
/*!40000 ALTER TABLE `BelongTo` DISABLE KEYS */;
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
  `Title` text CHARACTER SET utf8,
  `PubYear` year(4) DEFAULT NULL,
  `NumPages` int(5) unsigned DEFAULT NULL,
  `PubName` tinytext CHARACTER SET utf8,
  PRIMARY KEY (`ISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Book`
--

LOCK TABLES `Book` WRITE;
/*!40000 ALTER TABLE `Book` DISABLE KEYS */;
/*!40000 ALTER TABLE `Book` ENABLE KEYS */;
UNLOCK TABLES;

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
  PRIMARY KEY (`memberID`,`ISBN`,`copyNr`,`dateOfBorrowing`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Borrows`
--

LOCK TABLES `Borrows` WRITE;
/*!40000 ALTER TABLE `Borrows` DISABLE KEYS */;
/*!40000 ALTER TABLE `Borrows` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Category`
--

DROP TABLE IF EXISTS `Category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Category` (
  `catagoryName` varchar(30) CHARACTER SET utf8 NOT NULL,
  `superCategoryName` tinytext CHARACTER SET utf8,
  PRIMARY KEY (`catagoryName`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Category`
--

LOCK TABLES `Category` WRITE;
/*!40000 ALTER TABLE `Category` DISABLE KEYS */;
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
  PRIMARY KEY (`ISBN`,`copyNr`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Copies`
--

LOCK TABLES `Copies` WRITE;
/*!40000 ALTER TABLE `Copies` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employee`
--

LOCK TABLES `Employee` WRITE;
/*!40000 ALTER TABLE `Employee` DISABLE KEYS */;
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
  PRIMARY KEY (`memberID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Member`
--

LOCK TABLES `Member` WRITE;
/*!40000 ALTER TABLE `Member` DISABLE KEYS */;
/*!40000 ALTER TABLE `Member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Publisher`
--

DROP TABLE IF EXISTS `Publisher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Publisher` (
  `pubName` varchar(50) CHARACTER SET utf8 DEFAULT NULL,
  `estYear` year(4) DEFAULT NULL,
  `Street` tinytext CHARACTER SET utf8,
  `Number` int(4) unsigned DEFAULT NULL,
  `PostalCode` tinytext
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Publisher`
--

LOCK TABLES `Publisher` WRITE;
/*!40000 ALTER TABLE `Publisher` DISABLE KEYS */;
/*!40000 ALTER TABLE `Publisher` ENABLE KEYS */;
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
  PRIMARY KEY (`ISBN`,`authID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `WrittenBy`
--

LOCK TABLES `WrittenBy` WRITE;
/*!40000 ALTER TABLE `WrittenBy` DISABLE KEYS */;
/*!40000 ALTER TABLE `WrittenBy` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-05-05 15:53:42
