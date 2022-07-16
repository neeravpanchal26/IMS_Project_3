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
  `BrandID` int(11) NOT NULL,
  `BrandDesc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`BrandID`)
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
  `BusinessID` int(11) NOT NULL,
  `BusinessName` varchar(45) NOT NULL,
  `Logo` blob,
  `Contact` varchar(45) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `GroupPolicy` blob,
  PRIMARY KEY (`BusinessID`)
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
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `city` (
  `cityID` int(11) NOT NULL,
  `cityName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`cityID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (1,'Port Elizabeth'),(2,'East London'),(3,'Grahamstown'),(4,'Graff-Reinet');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `condition`
--

DROP TABLE IF EXISTS `condition`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `condition` (
  `ConditionID` int(11) NOT NULL,
  `ConditionDesc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ConditionID`)
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
  `EquipmentID` int(11) NOT NULL,
  `Name` varchar(45) NOT NULL,
  `Desc` varchar(45) NOT NULL,
  `LocationGps` varchar(45) DEFAULT NULL,
  `LocationPerson` int(11) DEFAULT NULL,
  `Cost` decimal(50,0) NOT NULL,
  `EquipmentCondition` int(11) DEFAULT NULL,
  `Brand` int(11) DEFAULT NULL,
  `Section` int(11) DEFAULT NULL,
  `Type` int(11) DEFAULT NULL,
  `Status` int(11) DEFAULT NULL,
  `ConditionPicture` blob,
  `DateReceived` datetime DEFAULT NULL,
  PRIMARY KEY (`EquipmentID`),
  KEY `userID_idx` (`LocationPerson`),
  KEY `conditionID_idx` (`EquipmentCondition`),
  KEY `brandID_idx` (`Brand`),
  KEY `typeID_idx` (`Type`),
  KEY `sectionID_idx` (`Section`),
  KEY `statusID_idx` (`Status`),
  CONSTRAINT `brandID` FOREIGN KEY (`Brand`) REFERENCES `brand` (`BrandID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `conditionID` FOREIGN KEY (`EquipmentCondition`) REFERENCES `condition` (`ConditionID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `sectionID` FOREIGN KEY (`Section`) REFERENCES `section` (`SectionID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `statusID` FOREIGN KEY (`Status`) REFERENCES `status` (`StatusID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `subTypeID` FOREIGN KEY (`Type`) REFERENCES `subtype` (`SubTypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `userID` FOREIGN KEY (`LocationPerson`) REFERENCES `user` (`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
-- Table structure for table `inspection`
--

DROP TABLE IF EXISTS `inspection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inspection` (
  `InspectionID` int(11) DEFAULT NULL,
  `InspectionDesc` varchar(45) DEFAULT NULL,
  `Date` datetime DEFAULT NULL,
  `Status` int(11) DEFAULT NULL,
  KEY `user_Id_idx` (`InspectionID`),
  KEY `inspectionStatus_idx` (`Status`),
  CONSTRAINT `equipment_Id` FOREIGN KEY (`InspectionID`) REFERENCES `equipment` (`EquipmentID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `inspectionStatus` FOREIGN KEY (`Status`) REFERENCES `inspectionstatus` (`InspectionStatusID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_Id` FOREIGN KEY (`InspectionID`) REFERENCES `user` (`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inspection`
--

LOCK TABLES `inspection` WRITE;
/*!40000 ALTER TABLE `inspection` DISABLE KEYS */;
/*!40000 ALTER TABLE `inspection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inspectionstatus`
--

DROP TABLE IF EXISTS `inspectionstatus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `inspectionstatus` (
  `InspectionStatusID` int(11) NOT NULL,
  `InspectionDesc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`InspectionStatusID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inspectionstatus`
--

LOCK TABLES `inspectionstatus` WRITE;
/*!40000 ALTER TABLE `inspectionstatus` DISABLE KEYS */;
/*!40000 ALTER TABLE `inspectionstatus` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `maintenance`
--

DROP TABLE IF EXISTS `maintenance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `maintenance` (
  `MaintenanceID` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Condition` int(11) NOT NULL,
  `Picture` blob,
  `Value` decimal(50,0) NOT NULL,
  PRIMARY KEY (`MaintenanceID`,`Date`),
  KEY `condition_Idd_idx` (`Condition`),
  CONSTRAINT `condition_Idd` FOREIGN KEY (`Condition`) REFERENCES `condition` (`ConditionID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `equipment_Idd` FOREIGN KEY (`MaintenanceID`) REFERENCES `equipment` (`EquipmentID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `user_Idd` FOREIGN KEY (`MaintenanceID`) REFERENCES `user` (`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION
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
  `SectionID` int(11) NOT NULL,
  `SectionDesc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`SectionID`)
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
  `StatusID` int(11) NOT NULL,
  `StatusDesc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`StatusID`)
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
-- Table structure for table `subtype`
--

DROP TABLE IF EXISTS `subtype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subtype` (
  `SubTypeID` int(11) NOT NULL,
  `SubTypeDesc` varchar(45) DEFAULT NULL,
  `TypeID` int(11) DEFAULT NULL,
  PRIMARY KEY (`SubTypeID`),
  KEY `typeID_idx` (`TypeID`),
  CONSTRAINT `typeID` FOREIGN KEY (`TypeID`) REFERENCES `type` (`TypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subtype`
--

LOCK TABLES `subtype` WRITE;
/*!40000 ALTER TABLE `subtype` DISABLE KEYS */;
/*!40000 ALTER TABLE `subtype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suburb`
--

DROP TABLE IF EXISTS `suburb`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `suburb` (
  `suburbID` int(11) NOT NULL,
  `suburbName` varchar(45) DEFAULT NULL,
  `cityID` int(11) DEFAULT NULL,
  PRIMARY KEY (`suburbID`),
  KEY `cityID_idx` (`cityID`),
  CONSTRAINT `cityID` FOREIGN KEY (`cityID`) REFERENCES `city` (`cityID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suburb`
--

LOCK TABLES `suburb` WRITE;
/*!40000 ALTER TABLE `suburb` DISABLE KEYS */;
INSERT INTO `suburb` VALUES (1,'Algoa Park',1),(2,'Beachview',1),(3,'Blue Horizon Bay',1),(4,'Bluewater Bay',1),(5,'Charlo',1),(6,'Amalinda',2),(7,'Baysville',2),(8,'Beacon Bay',2),(9,'Belgravia',2),(10,'Berea',2),(11,'Fort England',3),(12,'Hill 60',3),(13,'Oatsland',3),(14,'Kingswood',3),(15,'Somerset Heights',3),(16,'Adenorp',4),(17,'Rural',4),(18,'Nieu Bethesda',4);
/*!40000 ALTER TABLE `suburb` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `type` (
  `TypeID` int(11) NOT NULL,
  `Desc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`TypeID`)
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
  `UserID` int(11) NOT NULL,
  `FirstName` varchar(45) NOT NULL,
  `Surname` varchar(45) NOT NULL,
  `Dob` date NOT NULL,
  `ContactNumber` varchar(45) DEFAULT NULL,
  `Email` varchar(100) NOT NULL,
  `Salt` binary(20) NOT NULL,
  `Hash` binary(20) NOT NULL,
  `Type` int(11) NOT NULL,
  `Status` bit(1) NOT NULL,
  `Address1` varchar(45) DEFAULT NULL,
  `Address2` varchar(45) DEFAULT NULL,
  `Suburb` int(11) NOT NULL,
  PRIMARY KEY (`UserID`),
  KEY `userTpyeID_idx` (`Type`),
  KEY `suburbID_idx` (`Suburb`),
  CONSTRAINT `suburbID` FOREIGN KEY (`Suburb`) REFERENCES `suburb` (`suburbID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `userTpyeID` FOREIGN KEY (`Type`) REFERENCES `usertype` (`UserTypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'root','localhost','2018-06-21','12345678','1234@ims.com','\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0','admin\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0',1,'','1 Main Street','complex',1),(2,'Neerav','Panchal','1996-07-26','0711231234','neerav@ims.com','kh{Bc™,ry\î\Ô\ÇÄ…,8<ˆ','~\ë6\ã?Œ\Ý%E\n[z®+\èU[\â',1,'','1 Main','House 101',1),(3,'Mauritz','Langeveld','2018-06-21','12345','m@ims.com','[\Ù\ÛO\Ûø:¹š\ÈÁ-±´\ÍET\â','\ÒN\Âí°\Äü\Þ\ê\Ú6Ò‘/‘',1,'','1 mains','House 1',2),(4,'Mehul','Panchal','2000-08-28','0711231234','mehul@ims.com','\Ø9u¥\Ðö=¥vy¸m+[r','\0\Æ (\Ûcš¼i\ë±	ƒm‘\æ=G',2,'\0','4 Scanlan','Street',1);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertype`
--

DROP TABLE IF EXISTS `usertype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usertype` (
  `UserTypeID` int(11) NOT NULL,
  `UserTypeDesc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`UserTypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertype`
--

LOCK TABLES `usertype` WRITE;
/*!40000 ALTER TABLE `usertype` DISABLE KEYS */;
INSERT INTO `usertype` VALUES (1,'IT Technicain'),(2,'Technical Employee'),(3,'Section Head');
/*!40000 ALTER TABLE `usertype` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'ims_schema'
--
/*!50003 DROP PROCEDURE IF EXISTS `uspAddEquipment_Brands` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `uspAddEquipment_Brands`()
BEGIN
SELECT BrandID, BrandDesc
FROM brand
Order BY BrandDesc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `uspAddEquipment_Status` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `uspAddEquipment_Status`()
BEGIN
SELECT StatusID, StatusDesc
FROM status
Order by StatusDesc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `uspAddUser_City` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `uspAddUser_City`()
BEGIN
SELECT *
FROM city;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `uspAddUser_Create` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `uspAddUser_Create`(
IN firstName varchar(45),
IN lastName varchar(45),
IN dob varchar(10),
IN num varchar(45),
IN email varchar(100),
IN pword varchar(60),
IN uType int,
IN address1 varchar(45),
IN address2 varchar(45),
IN sub int
)
BEGIN
	DECLARE errno INT;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
	GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
	SELECT errno AS MYSQL_ERROR;
	ROLLBACK;
	END;
		
	START TRANSACTION;
    SET autocommit=0;
	SET @userID = (SELECT MAX(user.UserID)+1 FROM user);
	SET @salt = UNHEX(SHA1(CONCAT(RAND(), RAND(), RAND())));
	SET @ehash = UNHEX(SHA1(CONCAT(HEX(@salt), pword)));
	INSERT INTO `ims_schema`.`user`
	(`UserID`,
	`FirstName`,
	`Surname`,
	`Dob`,
	`ContactNumber`,
	`Email`,
	`salt`,
	`Hash`,
	`Type`,
	`Status`,
	`Address1`,
	`Address2`,
	`Suburb`)
	VALUES
	(@userID,firstName,lastName,dob,num,email,@salt,@ehash,uType,0,address1,address2,sub);
	COMMIT WORK;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `uspAddUser_Suburb` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `uspAddUser_Suburb`(IN `city` int)
BEGIN
SELECT *
FROM suburb
WHERE cityID = city;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `uspAddUser_UserType` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `uspAddUser_UserType`()
BEGIN
SELECT *
FROM usertype;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `uspLogin_Check` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `uspLogin_Check`(
IN uEmail varchar(100),
IN pWord varchar(50)
)
BEGIN
	SELECT  user.UserID,user.Email,user.Salt,user.Type INTO @id,@email,@salt,@type FROM user WHERE user.Email = uEmail;
    IF (SELECT COUNT(user.UserID) FROM user WHERE user.Email = uEmail AND user.Hash = UNHEX(SHA1(CONCAT(HEX(@salt), pWord)))) != 1 THEN
		SELECT false;
    ELSE
		SELECT user.Status,usertype.UserTypeID,usertype.UserTypeDesc FROM user,usertype WHERE user.UserID = @id AND usertype.UserTypeID = @type;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `uspVoidUser_ByType` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `uspVoidUser_ByType`(IN `typeid` INT)
BEGIN
SELECT user.UserID,user.FirstName,user.SurName,user.Status,user.Email
FROM user
WHERE user.Type = typeid;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `uspVoidUser_Status` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `uspVoidUser_Status`(
	IN id int,
    IN sta int
)
BEGIN
DECLARE errno INT;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
	GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
	SELECT errno AS MYSQL_ERROR;
	ROLLBACK;
	END;
	START TRANSACTION;
    SET autocommit=0;
    UPDATE user
	SET user.Status = sta
	WHERE user.UserID = id;
	COMMIT WORK;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-22 16:27:23
