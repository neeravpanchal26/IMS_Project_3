-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 01, 2018 at 11:00 AM
-- Server version: 5.6.40
-- PHP Version: 7.2.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ims_schema`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `uspAddEquipment_Brands` ()  BEGIN
SELECT BrandID, BrandDesc
FROM brand
Order BY case when BrandDesc = 'Other' then 1 else 0 End, BrandDesc;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `uspAddEquipment_Condition` ()  NO SQL
SELECT *
FROM `condition`$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `uspAddEquipment_Insert` (IN `EquipmentID` INT(11), IN `Name` VARCHAR(45), IN `Desc` VARCHAR(45), IN `LocationGps` VARCHAR(45), IN `LocationPerson` INT(11), IN `Cost` INT(11), IN `EquipmentCondition` INT(11), IN `Brand` INT(11), IN `Section` INT(11), IN `Type` INT(11), IN `Status` INT(11), IN `ConditionPicture` BLOB, IN `DateReceived` DATETIME)  BEGIN
	DECLARE errno INT;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
	GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
	SELECT errno AS MYSQL_ERROR;
	ROLLBACK;
	END;
		
	START TRANSACTION;
    SET autocommit=0;
	SET @equipmentID = (SELECT MAX(equipment.EquipmentID)+1 FROM equipment);
	INSERT INTO `ims_schema`.`equipment`
	(`EquipmentID`,
	`Name`,
	`Desc`,
	`LocationGps`,
	`LocationPerson`,
	`Cost`,
	`EquipmentCondition`,
	`Brand`,
	`Section`,
	`Type`,
	`Status`,
	`ConditionPicture`,
	`DateReceived`)
	VALUES
	(@equipmentID,`Name`,`Desc`,LocationGps,LocationPerson,Cost,EquipmentCondition,Brand,Section,`Type`,`Status`,ConditionPicture,DateReceived);
	COMMIT WORK;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `uspAddEquipment_Section` ()  NO SQL
SELECT *
from section$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `uspAddEquipment_Status` ()  BEGIN
SELECT StatusID, StatusDesc
FROM status
Order by StatusDesc;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `uspAddEquipment_Types` ()  NO SQL
select s.SubTypeID, s.SubTypeDesc
from subtype s$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `uspAddEquipment_Users` ()  NO SQL
SELECT CONCAT(u.Surname, ', ',u.FirstName) as 'FullName', u.UserID
FROM user u Where u.FirstName != 'root' AND u.Surname != 'localhost'
ORDER BY u.Surname$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `uspAddUser_City` ()  BEGIN
SELECT *
FROM city;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `uspAddUser_Create` (IN `firstName` VARCHAR(45), IN `lastName` VARCHAR(45), IN `dob` VARCHAR(10), IN `num` VARCHAR(45), IN `email` VARCHAR(100), IN `pword` VARCHAR(60), IN `uType` INT, IN `address1` VARCHAR(45), IN `address2` VARCHAR(45), IN `sub` INT)  BEGIN
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
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `uspAddUser_Suburb` (IN `city` INT)  BEGIN
SELECT *
FROM suburb
WHERE cityID = city;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `uspAddUser_UserType` ()  BEGIN
SELECT *
FROM usertype;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `uspAllocateEquipment_Equipments` ()  BEGIN
SELECT *
FROM equipment;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `uspAllocateEquipment_TechnicalEmployees` ()  BEGIN
Select CONCAT(user.FirstName,' ',user.Surname, ' (',user.UserID,')') AS TechEmployee, user.UserID
FROM user
Where user.Type=3;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `uspLogin_Check` (IN `uEmail` VARCHAR(100), IN `pWord` VARCHAR(50))  BEGIN
	SELECT  user.UserID,user.Email,user.Salt,user.Type INTO @id,@email,@salt,@type FROM user WHERE user.Email = uEmail;
    IF (SELECT COUNT(user.UserID) FROM user WHERE user.Email = uEmail AND user.Hash = UNHEX(SHA1(CONCAT(HEX(@salt), pWord)))) != 1 THEN
		SELECT false;
    ELSE
		SELECT user.Status,CONCAT(user.FirstName,' ',user.SurName,' - (',user.Email,')') AS username,user.UserID,usertype.UserTypeID,usertype.UserTypeDesc FROM user,usertype WHERE user.UserID = @id AND usertype.UserTypeID = @type;
    END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `uspUserPassword_OldCheck` (IN `userID` INT, IN `pWord` VARCHAR(50))  BEGIN
	SELECT user.Salt INTO @salt
    FROM user
    WHERE user.UserID = userID;
    IF(SELECT COUNT(user.UserID) FROM user WHERE user.UserID = userID AND user.Hash = UNHEX(SHA1(CONCAT(HEX(@salt), pWord)))) != 1 THEN
		SELECT false AS result;
	ELSE
		SELECT true AS result;
	END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `uspUserPassword_UpdatePass` (IN `userID` INT, IN `pWord` VARCHAR(50))  BEGIN
	DECLARE errno INT;
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
	GET CURRENT DIAGNOSTICS CONDITION 1 errno = MYSQL_ERRNO;
	SELECT errno AS MYSQL_ERROR;
	ROLLBACK;
	END;
		
	START TRANSACTION;
    SET autocommit=0;
	SET @salt = UNHEX(SHA1(CONCAT(RAND(), RAND(), RAND())));
	SET @ehash = UNHEX(SHA1(CONCAT(HEX(@salt), pWord)));
    UPDATE user
	SET
	user.Salt = @salt,
	user.Hash = @ehash
	WHERE user.UserID = userID;
	COMMIT WORK;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `uspUserSetting_SpecificUser` (IN `id` INT)  BEGIN
SELECT u.FirstName,u.Surname,u.Dob,u.ContactNumber,u.Email,u.Address1,u.Address2,u.Suburb,c.CityID
FROM user AS u,city AS c,suburb AS s
WHERE u.UserID = id AND u.Suburb = s.suburbID AND s.CityID = c.cityID;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `uspUserSetting_Suburbs` ()  BEGIN
SELECT s.SuburbID,s.suburbName
FROM suburb AS s;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `uspUserSetting_Update` (IN `userID` INT, IN `firstName` VARCHAR(45), IN `lastName` VARCHAR(45), IN `dob` VARCHAR(10), IN `num` VARCHAR(45), IN `email` VARCHAR(100), IN `address1` VARCHAR(45), IN `address2` VARCHAR(45), IN `sub` INT)  BEGIN
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
	SET
	user.FirstName = firstName,
	user.Surname = lastName,
	user.Dob = dob,
	user.ContactNumber = num,
	user.Email = email,
	user.Address1 = address1,
	user.Address2 = address2,
	user.Suburb = sub
	WHERE user.UserID = userID;
	
    COMMIT WORK;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `uspVoidUser_ByType` (IN `typeid` INT)  BEGIN
SELECT user.UserID,user.FirstName,user.SurName,user.Status,user.Email
FROM user
WHERE user.Type = typeid;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `uspVoidUser_Status` (IN `id` INT, IN `sta` INT)  BEGIN
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
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE IF NOT EXISTS `brand` (
  `BrandID` int(11) NOT NULL,
  `BrandDesc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`BrandID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`BrandID`, `BrandDesc`) VALUES
(1, 'Generac'),
(2, 'Motorolla'),
(3, 'Yamaha'),
(4, 'Greenlee'),
(5, 'PowerGenix'),
(6, 'Other');

-- --------------------------------------------------------

--
-- Table structure for table `business`
--

CREATE TABLE IF NOT EXISTS `business` (
  `BusinessID` int(11) NOT NULL,
  `BusinessName` varchar(45) NOT NULL,
  `Logo` blob,
  `Contact` varchar(45) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `GroupPolicy` blob,
  PRIMARY KEY (`BusinessID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE IF NOT EXISTS `city` (
  `cityID` int(11) NOT NULL,
  `cityName` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`cityID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`cityID`, `cityName`) VALUES
(1, 'Port Elizabeth'),
(2, 'East London'),
(3, 'Grahamstown'),
(4, 'Graff-Reinet');

-- --------------------------------------------------------

--
-- Table structure for table `condition`
--

CREATE TABLE IF NOT EXISTS `condition` (
  `ConditionID` int(11) NOT NULL,
  `ConditionDesc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`ConditionID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `condition`
--

INSERT INTO `condition` (`ConditionID`, `ConditionDesc`) VALUES
(1, 'New'),
(2, 'Excellent'),
(3, 'Very Good'),
(4, 'Good'),
(5, 'Fair'),
(6, 'Scrap');

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE IF NOT EXISTS `equipment` (
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
  KEY `statusID_idx` (`Status`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `inspection`
--

CREATE TABLE IF NOT EXISTS `inspection` (
  `InspectionID` int(11) DEFAULT NULL,
  `InspectionDesc` varchar(45) DEFAULT NULL,
  `Date` datetime DEFAULT NULL,
  `Status` int(11) DEFAULT NULL,
  KEY `user_Id_idx` (`InspectionID`),
  KEY `inspectionStatus_idx` (`Status`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `inspectionstatus`
--

CREATE TABLE IF NOT EXISTS `inspectionstatus` (
  `InspectionStatusID` int(11) NOT NULL,
  `InspectionDesc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`InspectionStatusID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `maintenance`
--

CREATE TABLE IF NOT EXISTS `maintenance` (
  `MaintenanceID` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Condition` int(11) NOT NULL,
  `Picture` blob,
  `Value` decimal(50,0) NOT NULL,
  PRIMARY KEY (`MaintenanceID`,`Date`),
  KEY `condition_Idd_idx` (`Condition`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `section`
--

CREATE TABLE IF NOT EXISTS `section` (
  `SectionID` int(11) NOT NULL,
  `SectionDesc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`SectionID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `section`
--

INSERT INTO `section` (`SectionID`, `SectionDesc`) VALUES
(1, 'Electrical'),
(2, 'Machanical');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE IF NOT EXISTS `status` (
  `StatusID` int(11) NOT NULL,
  `StatusDesc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`StatusID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`StatusID`, `StatusDesc`) VALUES
(1, 'Assigned'),
(2, 'Un-assigned'),
(3, 'Installed');

-- --------------------------------------------------------

--
-- Table structure for table `subtype`
--

CREATE TABLE IF NOT EXISTS `subtype` (
  `SubTypeID` int(11) NOT NULL,
  `SubTypeDesc` varchar(45) DEFAULT NULL,
  `TypeID` int(11) DEFAULT NULL,
  PRIMARY KEY (`SubTypeID`),
  KEY `typeID_idx` (`TypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subtype`
--

INSERT INTO `subtype` (`SubTypeID`, `SubTypeDesc`, `TypeID`) VALUES
(1, 'Generator', 1),
(2, 'Walkie Talkie', 2);

-- --------------------------------------------------------

--
-- Table structure for table `suburb`
--

CREATE TABLE IF NOT EXISTS `suburb` (
  `suburbID` int(11) NOT NULL,
  `suburbName` varchar(45) DEFAULT NULL,
  `cityID` int(11) DEFAULT NULL,
  PRIMARY KEY (`suburbID`),
  KEY `cityID_idx` (`cityID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `suburb`
--

INSERT INTO `suburb` (`suburbID`, `suburbName`, `cityID`) VALUES
(1, 'Algoa Park', 1),
(2, 'Beachview', 1),
(3, 'Blue Horizon Bay', 1),
(4, 'Bluewater Bay', 1),
(5, 'Charlo', 1),
(6, 'Amalinda', 2),
(7, 'Baysville', 2),
(8, 'Beacon Bay', 2),
(9, 'Belgravia', 2),
(10, 'Berea', 2),
(11, 'Fort England', 3),
(12, 'Hill 60', 3),
(13, 'Oatsland', 3),
(14, 'Kingswood', 3),
(15, 'Somerset Heights', 3),
(16, 'Adenorp', 4),
(17, 'Rural', 4),
(18, 'Nieu Bethesda', 4);

-- --------------------------------------------------------

--
-- Table structure for table `type`
--

CREATE TABLE IF NOT EXISTS `type` (
  `TypeID` int(11) NOT NULL,
  `Desc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`TypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `type`
--

INSERT INTO `type` (`TypeID`, `Desc`) VALUES
(1, 'Fixed'),
(2, 'Mobile');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
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
  KEY `suburbID_idx` (`Suburb`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`UserID`, `FirstName`, `Surname`, `Dob`, `ContactNumber`, `Email`, `Salt`, `Hash`, `Type`, `Status`, `Address1`, `Address2`, `Suburb`) VALUES
(1, 'root', 'localhost', '2018-06-21', '12345678', '1234@ims.com', 0x2911047d82d5600493c404fa7b60c6521e6adaef, 0xa3ff998638d2fdecd87696492c2be460a361cba2, 1, b'1', '1 Main Street', 'complex', 1),
(2, 'Neerav', 'Panchal', '1996-07-26', '0711231234', 'nsp@ims.com', 0x3c87d77ae85233dca2c6460f86678202a326a94e, 0x7bbf50a543d2e6fe286fc7043b75c7870b7acd28, 1, b'1', '1 Main', 'House 101', 1),
(3, 'Mauritz', 'Langeveld', '2018-06-21', '12345', 'm@ims.com', 0xc6e9dc1466bba99a45d62f68af450a4e63e4bebc, 0x641fc6f397b36ce36224f1d12e5d8e11c0f8d14e, 1, b'1', '1 mains', 'House 1', 2),
(4, 'Mehul', 'Panchal', '2000-09-28', '0711231234', 'mehul@ims.com', 0x760cd1310d6539a961c7714c64fe683235da2f3b, 0xc2c3eccd613225fbb7956b942019332f98b3783b, 2, b'1', '4 Scanlan', 'Street', 1),
(5, 'Nirmal', 'Gajjar', '1988-11-11', '0713214321', 'nirmal@ims.com', 0x3840d506cd76333d76f29d1af797993bb59c8337, 0x32b2d8814085c529b88759c1bc448efb17430fb7, 3, b'1', '6 Scanlan', 'Street', 2);

-- --------------------------------------------------------

--
-- Table structure for table `usertype`
--

CREATE TABLE IF NOT EXISTS `usertype` (
  `UserTypeID` int(11) NOT NULL,
  `UserTypeDesc` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`UserTypeID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usertype`
--

INSERT INTO `usertype` (`UserTypeID`, `UserTypeDesc`) VALUES
(1, 'IT Technicain'),
(2, 'Technical Employee'),
(3, 'Section Head');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `equipment`
--
ALTER TABLE `equipment`
  ADD CONSTRAINT `brandID` FOREIGN KEY (`Brand`) REFERENCES `brand` (`BrandID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `conditionID` FOREIGN KEY (`EquipmentCondition`) REFERENCES `condition` (`ConditionID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `sectionID` FOREIGN KEY (`Section`) REFERENCES `section` (`SectionID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `statusID` FOREIGN KEY (`Status`) REFERENCES `status` (`StatusID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `subTypeID` FOREIGN KEY (`Type`) REFERENCES `subtype` (`SubTypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `userID` FOREIGN KEY (`LocationPerson`) REFERENCES `user` (`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `inspection`
--
ALTER TABLE `inspection`
  ADD CONSTRAINT `equipment_Id` FOREIGN KEY (`InspectionID`) REFERENCES `equipment` (`EquipmentID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `inspectionStatus` FOREIGN KEY (`Status`) REFERENCES `inspectionstatus` (`InspectionStatusID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `user_Id` FOREIGN KEY (`InspectionID`) REFERENCES `user` (`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `maintenance`
--
ALTER TABLE `maintenance`
  ADD CONSTRAINT `condition_Idd` FOREIGN KEY (`Condition`) REFERENCES `condition` (`ConditionID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `equipment_Idd` FOREIGN KEY (`MaintenanceID`) REFERENCES `equipment` (`EquipmentID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `user_Idd` FOREIGN KEY (`MaintenanceID`) REFERENCES `user` (`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `subtype`
--
ALTER TABLE `subtype`
  ADD CONSTRAINT `typeID` FOREIGN KEY (`TypeID`) REFERENCES `type` (`TypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `suburb`
--
ALTER TABLE `suburb`
  ADD CONSTRAINT `cityID` FOREIGN KEY (`cityID`) REFERENCES `city` (`cityID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `suburbID` FOREIGN KEY (`Suburb`) REFERENCES `suburb` (`suburbID`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `userTpyeID` FOREIGN KEY (`Type`) REFERENCES `usertype` (`UserTypeID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
