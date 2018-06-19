CREATE DATABASE  IF NOT EXISTS `ims_schema` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `ims_schema`;
-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: localhost    Database: ims_schema
-- ------------------------------------------------------
-- Server version	5.6.40

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
-- Table structure for table `brand`
--

DROP TABLE IF EXISTS `brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `brand` (
  `brandID` int(11) NOT NULL,
  `Desc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`brandID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brand`
--

LOCK TABLES `brand` WRITE;
/*!40000 ALTER TABLE `brand` DISABLE KEYS */;
/*!40000 ALTER TABLE `brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `business`
--

DROP TABLE IF EXISTS `business`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `business` (
  `idbusiness` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Logo` blob,
  `Contact` varchar(45) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `GroupPolicy` blob,
  PRIMARY KEY (`idbusiness`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `business`
--

LOCK TABLES `business` WRITE;
/*!40000 ALTER TABLE `business` DISABLE KEYS */;
/*!40000 ALTER TABLE `business` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `condition`
--

DROP TABLE IF EXISTS `condition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `condition` (
  `conditionID` int(11) NOT NULL,
  `Desc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`conditionID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `condition`
--

LOCK TABLES `condition` WRITE;
/*!40000 ALTER TABLE `condition` DISABLE KEYS */;
INSERT INTO `condition` VALUES (1,'New'),(2,'Exellent'),(3,'Very Good'),(4,'Good'),(5,'Fair'),(6,'Scrap');
/*!40000 ALTER TABLE `condition` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `equipment`
--

DROP TABLE IF EXISTS `equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `equipment` (
  `equipmentID` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Desc` varchar(45) NOT NULL,
  `LocationGps` varchar(45) DEFAULT NULL,
  `LocationPerson` int(11) DEFAULT NULL,
  `Cost` decimal(30,0) NOT NULL,
  `Condition` int(11) DEFAULT NULL,
  `Brand` int(11) DEFAULT NULL,
  `Section` int(11) DEFAULT NULL,
  `Type` int(11) DEFAULT NULL,
  `Status` int(11) DEFAULT NULL,
  `ConditionPicture` blob,
  `DateRecieved` datetime DEFAULT NULL,
  `Quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`equipmentID`),
  KEY `userID_idx` (`LocationPerson`),
  KEY `conditionID_idx` (`Condition`),
  KEY `brandID_idx` (`Brand`),
  KEY `typeID_idx` (`Type`),
  KEY `sectionID_idx` (`Section`),
  KEY `statusID_idx` (`Status`),
  CONSTRAINT `brandID` FOREIGN KEY (`Brand`) REFERENCES `brand` (`brandID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `conditionID` FOREIGN KEY (`Condition`) REFERENCES `condition` (`conditionID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `sectionID` FOREIGN KEY (`Section`) REFERENCES `section` (`sectionID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `statusID` FOREIGN KEY (`Status`) REFERENCES `status` (`statusID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `subTypeID` FOREIGN KEY (`Type`) REFERENCES `subType` (`subTypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `userID` FOREIGN KEY (`LocationPerson`) REFERENCES `user` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `equipment`
--

LOCK TABLES `equipment` WRITE;
/*!40000 ALTER TABLE `equipment` DISABLE KEYS */;
/*!40000 ALTER TABLE `equipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `installation`
--

DROP TABLE IF EXISTS `installation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `installation` (
  `euqipmentID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `Desc` varchar(45) DEFAULT NULL,
  `Date` datetime DEFAULT NULL,
  PRIMARY KEY (`euqipmentID`,`userID`),
  KEY `equipment_ID_idx` (`euqipmentID`),
  KEY `user_ID_idx` (`userID`),
  KEY `user_IID_idx` (`userID`),
  CONSTRAINT `equipment_ID` FOREIGN KEY (`euqipmentID`) REFERENCES `equipment` (`equipmentID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_IID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `installation`
--

LOCK TABLES `installation` WRITE;
/*!40000 ALTER TABLE `installation` DISABLE KEYS */;
/*!40000 ALTER TABLE `installation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maintenance`
--

DROP TABLE IF EXISTS `maintenance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maintenance` (
  `userID` int(11) NOT NULL,
  `equipmentID` int(11) NOT NULL,
  `Date` datetime NOT NULL,
  `Condition` int(11) NOT NULL,
  `Picture` blob,
  `Value` decimal(50,0) NOT NULL,
  `Quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`Date`,`equipmentID`,`userID`),
  KEY `user_ID_idx` (`userID`),
  KEY `equipement_ID_idx` (`equipmentID`),
  KEY `condition_ID_idx` (`Condition`),
  CONSTRAINT `condition_ID` FOREIGN KEY (`Condition`) REFERENCES `condition` (`conditionID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `equipement_ID` FOREIGN KEY (`equipmentID`) REFERENCES `equipment` (`equipmentID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_ID` FOREIGN KEY (`userID`) REFERENCES `user` (`userID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `maintenance`
--

LOCK TABLES `maintenance` WRITE;
/*!40000 ALTER TABLE `maintenance` DISABLE KEYS */;
/*!40000 ALTER TABLE `maintenance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `section`
--

DROP TABLE IF EXISTS `section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `section` (
  `sectionID` int(11) NOT NULL,
  `Desc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`sectionID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `section`
--

LOCK TABLES `section` WRITE;
/*!40000 ALTER TABLE `section` DISABLE KEYS */;
INSERT INTO `section` VALUES (1,'Electrical'),(2,'Machanical');
/*!40000 ALTER TABLE `section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `status` (
  `statusID` int(11) NOT NULL,
  `Desc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`statusID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Assigned'),(2,'Un-assigned'),(3,'Installed');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subType`
--

DROP TABLE IF EXISTS `subType`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subType` (
  `subTypeID` int(11) NOT NULL,
  `Desc` varchar(45) DEFAULT NULL,
  `typeID` int(11) DEFAULT NULL,
  PRIMARY KEY (`subTypeID`),
  KEY `typeID_idx` (`typeID`),
  CONSTRAINT `typeID` FOREIGN KEY (`typeID`) REFERENCES `type` (`typeID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subType`
--

LOCK TABLES `subType` WRITE;
/*!40000 ALTER TABLE `subType` DISABLE KEYS */;
/*!40000 ALTER TABLE `subType` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type` (
  `typeID` int(11) NOT NULL,
  `Desc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`typeID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1,'Fixed'),(2,'Mobile');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Surname` varchar(45) DEFAULT NULL,
  `Dob` datetime NOT NULL,
  `ContactNumber` varchar(45) DEFAULT NULL,
  `Email` varchar(45) NOT NULL,
  `Password` varchar(60) NOT NULL,
  `Type` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-19 10:56:38
