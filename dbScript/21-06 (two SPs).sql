-- phpMyAdmin SQL Dump
-- version 4.8.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 21, 2018 at 07:17 PM
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
Order BY BrandDesc;

END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `uspAddEquipment_Status` ()  NO SQL
SELECT StatusID, StatusDesc
FROM status
Order by StatusDesc$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `uspAddUser_City` ()  BEGIN
SELECT *
FROM city;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `uspAddUser_Create` (IN `firstName` VARCHAR(45), IN `lastName` VARCHAR(45), IN `dob` DATE, IN `num` VARCHAR(45), IN `email` VARCHAR(100), IN `pword` VARCHAR(60), IN `uType` INT, IN `address1` VARCHAR(45), IN `address2` VARCHAR(45), IN `sub` INT)  BEGIN
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
	INSERT INTO `ims_schema`.`user`
	(`UserID`,
	`FirstName`,
	`Surname`,
	`Dob`,
	`ContactNumber`,
	`Email`,
	`Password`,
	`Type`,
	`Status`,
	`Address1`,
	`Address2`,
	`Suburb`)
	VALUES
	(@userID,firstName,lastName,dob,num,email,pword,uType,1,address1,address2,sub);
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

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `BrandID` int(11) NOT NULL,
  `BrandDesc` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`BrandID`, `BrandDesc`) VALUES
(1, 'Cummins'),
(2, 'Faw'),
(3, 'Weifang'),
(4, 'Perkins');

-- --------------------------------------------------------

--
-- Table structure for table `business`
--

CREATE TABLE `business` (
  `BusinessID` int(11) NOT NULL,
  `BusinessName` varchar(45) NOT NULL,
  `Logo` blob,
  `Contact` varchar(45) DEFAULT NULL,
  `Email` varchar(45) DEFAULT NULL,
  `GroupPolicy` blob
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `cityID` int(11) NOT NULL,
  `cityName` varchar(45) DEFAULT NULL
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

CREATE TABLE `condition` (
  `ConditionID` int(11) NOT NULL,
  `ConditionDesc` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `condition`
--

INSERT INTO `condition` (`ConditionID`, `ConditionDesc`) VALUES
(1, 'New'),
(2, 'Exellent'),
(3, 'Very Good'),
(4, 'Good'),
(5, 'Fair'),
(6, 'Scrap');

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

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
  `DateReceived` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `inspection`
--

CREATE TABLE `inspection` (
  `InspectionID` int(11) DEFAULT NULL,
  `InspectionDesc` varchar(45) DEFAULT NULL,
  `Date` datetime DEFAULT NULL,
  `Status` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `inspectionstatus`
--

CREATE TABLE `inspectionstatus` (
  `InspectionStatusID` int(11) NOT NULL,
  `InspectionDesc` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `maintenance`
--

CREATE TABLE `maintenance` (
  `MaintenanceID` int(11) NOT NULL,
  `Date` date NOT NULL,
  `Condition` int(11) NOT NULL,
  `Picture` blob,
  `Value` decimal(50,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `section`
--

CREATE TABLE `section` (
  `SectionID` int(11) NOT NULL,
  `SectionDesc` varchar(45) DEFAULT NULL
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

CREATE TABLE `status` (
  `StatusID` int(11) NOT NULL,
  `StatusDesc` varchar(45) DEFAULT NULL
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

CREATE TABLE `subtype` (
  `SubTypeID` int(11) NOT NULL,
  `SubTypeDesc` varchar(45) DEFAULT NULL,
  `TypeID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `suburb`
--

CREATE TABLE `suburb` (
  `suburbID` int(11) NOT NULL,
  `suburbName` varchar(45) DEFAULT NULL,
  `cityID` int(11) DEFAULT NULL
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

CREATE TABLE `type` (
  `TypeID` int(11) NOT NULL,
  `Desc` varchar(45) DEFAULT NULL
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

CREATE TABLE `user` (
  `UserID` int(11) NOT NULL,
  `FirstName` varchar(45) NOT NULL,
  `Surname` varchar(45) NOT NULL,
  `Dob` date NOT NULL,
  `ContactNumber` varchar(45) DEFAULT NULL,
  `Email` varchar(100) NOT NULL,
  `Password` varchar(60) NOT NULL,
  `Type` int(11) NOT NULL,
  `Status` bit(1) NOT NULL,
  `Address1` varchar(45) DEFAULT NULL,
  `Address2` varchar(45) DEFAULT NULL,
  `Suburb` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`UserID`, `FirstName`, `Surname`, `Dob`, `ContactNumber`, `Email`, `Password`, `Type`, `Status`, `Address1`, `Address2`, `Suburb`) VALUES
(0, 'dummie', 'record', '1996-01-10', '12345678', 'dummy@ims.com', '12345', 1, b'0', '1 main str', 'complex', 1);

-- --------------------------------------------------------

--
-- Table structure for table `usertype`
--

CREATE TABLE `usertype` (
  `UserTypeID` int(11) NOT NULL,
  `UserTypeDesc` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `usertype`
--

INSERT INTO `usertype` (`UserTypeID`, `UserTypeDesc`) VALUES
(1, 'IT Technicain'),
(2, 'Technical Employee'),
(3, 'Section Head');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`BrandID`);

--
-- Indexes for table `business`
--
ALTER TABLE `business`
  ADD PRIMARY KEY (`BusinessID`);

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`cityID`);

--
-- Indexes for table `condition`
--
ALTER TABLE `condition`
  ADD PRIMARY KEY (`ConditionID`);

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`EquipmentID`),
  ADD KEY `userID_idx` (`LocationPerson`),
  ADD KEY `conditionID_idx` (`EquipmentCondition`),
  ADD KEY `brandID_idx` (`Brand`),
  ADD KEY `typeID_idx` (`Type`),
  ADD KEY `sectionID_idx` (`Section`),
  ADD KEY `statusID_idx` (`Status`);

--
-- Indexes for table `inspection`
--
ALTER TABLE `inspection`
  ADD KEY `user_Id_idx` (`InspectionID`),
  ADD KEY `inspectionStatus_idx` (`Status`);

--
-- Indexes for table `inspectionstatus`
--
ALTER TABLE `inspectionstatus`
  ADD PRIMARY KEY (`InspectionStatusID`);

--
-- Indexes for table `maintenance`
--
ALTER TABLE `maintenance`
  ADD PRIMARY KEY (`MaintenanceID`,`Date`),
  ADD KEY `condition_Idd_idx` (`Condition`);

--
-- Indexes for table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`SectionID`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`StatusID`);

--
-- Indexes for table `subtype`
--
ALTER TABLE `subtype`
  ADD PRIMARY KEY (`SubTypeID`),
  ADD KEY `typeID_idx` (`TypeID`);

--
-- Indexes for table `suburb`
--
ALTER TABLE `suburb`
  ADD PRIMARY KEY (`suburbID`),
  ADD KEY `cityID_idx` (`cityID`);

--
-- Indexes for table `type`
--
ALTER TABLE `type`
  ADD PRIMARY KEY (`TypeID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserID`),
  ADD KEY `userTpyeID_idx` (`Type`),
  ADD KEY `suburbID_idx` (`Suburb`);

--
-- Indexes for table `usertype`
--
ALTER TABLE `usertype`
  ADD PRIMARY KEY (`UserTypeID`);

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
