-- MySQL dump 10.13  Distrib 5.7.17, for Linux (x86_64)
--
-- Host: localhost    Database: seekstock
-- ------------------------------------------------------
-- Server version	5.7.17

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
-- Table structure for table `a_activityCounts`
--

DROP TABLE IF EXISTS `a_activityCounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `a_activityCounts` (
  `cid` varchar(36) NOT NULL,
  `voteNum` int(16) DEFAULT NULL,
  `commentNum` int(16) DEFAULT NULL,
  `subjectId` varchar(36) NOT NULL,
  `type` varchar(36) DEFAULT NULL,
  `face` varchar(36) DEFAULT NULL,
  `topic` varchar(36) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  `subTopic` varchar(36) DEFAULT NULL,
  `region` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `a_activityCounts`
--

LOCK TABLES `a_activityCounts` WRITE;
/*!40000 ALTER TABLE `a_activityCounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `a_activityCounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `a_classifyfaceCounts`
--

DROP TABLE IF EXISTS `a_classifyfaceCounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `a_classifyfaceCounts` (
  `cid` varchar(36) DEFAULT NULL,
  `productId` varchar(36) DEFAULT NULL,
  `quality_damagedbroken_sad` int(16) DEFAULT NULL,
  `quality_fabric_happy` int(16) DEFAULT NULL,
  `quality_fabric_sad` int(16) DEFAULT NULL,
  `quality_general_happy` int(16) DEFAULT NULL,
  `quality_general_sad` int(16) DEFAULT NULL,
  `fit_fitssmall_happy` int(16) DEFAULT NULL,
  `fit_fitslarge_happy` int(16) DEFAULT NULL,
  `fit_fitstrue_happy` int(16) DEFAULT NULL,
  `fit_fitssmall_sad` int(16) DEFAULT NULL,
  `fit_fitslarge_sad` int(16) DEFAULT NULL,
  `fit_fitstrue_sad` int(16) DEFAULT NULL,
  `fit_general_happy` int(16) DEFAULT NULL,
  `fit_general_sad` int(16) DEFAULT NULL,
  `style_colourpattern_happy` int(16) DEFAULT NULL,
  `style_colourpattern_sad` int(16) DEFAULT NULL,
  `style_design_happy` int(16) DEFAULT NULL,
  `style_design_sad` int(16) DEFAULT NULL,
  `style_fabric_happy` int(16) DEFAULT NULL,
  `style_general_happy` int(16) DEFAULT NULL,
  `style_general_sad` int(16) DEFAULT NULL,
  `price_tooexpensive_happy` int(16) DEFAULT NULL,
  `price_tooexpensive_sad` int(16) DEFAULT NULL,
  `price_toocheap_happy` int(16) DEFAULT NULL,
  `price_toocheap_sad` int(16) DEFAULT NULL,
  `price_incorrectprice_happy` int(16) DEFAULT NULL,
  `price_incorrectprice_sad` int(16) DEFAULT NULL,
  `price_general_happy` int(16) DEFAULT NULL,
  `price_general_sad` int(16) DEFAULT NULL,
  `stock_toohigh_happy` int(16) DEFAULT NULL,
  `stock_toohigh_sad` int(16) DEFAULT NULL,
  `stock_toolow_happy` int(16) DEFAULT NULL,
  `stock_toolow_sad` int(16) DEFAULT NULL,
  `stock_general_happy` int(16) DEFAULT NULL,
  `stock_general_sad` int(16) DEFAULT NULL,
  `style_fabric_sad` int(16) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  `voteNum` int(16) DEFAULT NULL,
  `commentNum` int(16) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `a_classifyfaceCounts`
--

LOCK TABLES `a_classifyfaceCounts` WRITE;
/*!40000 ALTER TABLE `a_classifyfaceCounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `a_classifyfaceCounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `a_staffActivityCounts`
--

DROP TABLE IF EXISTS `a_staffActivityCounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `a_staffActivityCounts` (
  `cid` varchar(36) DEFAULT NULL,
  `staffId` varchar(36) DEFAULT NULL,
  `voteNum` int(16) DEFAULT NULL,
  `commentNum` int(16) DEFAULT NULL,
  `preRank` int(16) DEFAULT NULL,
  `curRank` int(16) DEFAULT NULL,
  `feedbackNum` int(16) DEFAULT NULL,
  `suggestionNum` int(16) DEFAULT NULL,
  `role` varchar(64) DEFAULT NULL,
  `region` varchar(64) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `storeId` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `a_staffActivityCounts`
--

LOCK TABLES `a_staffActivityCounts` WRITE;
/*!40000 ALTER TABLE `a_staffActivityCounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `a_staffActivityCounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `applies`
--

DROP TABLE IF EXISTS `applies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `applies` (
  `cid` varchar(36) NOT NULL,
  `feedbackId` varchar(36) NOT NULL,
  `product_info_id` varchar(36) NOT NULL,
  `type` varchar(36) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applies`
--

LOCK TABLES `applies` WRITE;
/*!40000 ALTER TABLE `applies` DISABLE KEYS */;
/*!40000 ALTER TABLE `applies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `cid` varchar(36) NOT NULL,
  `content` varchar(2048) DEFAULT NULL,
  `staffId` varchar(36) DEFAULT NULL,
  `activityId` varchar(36) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `mentionId` varchar(1024) DEFAULT NULL,
  `topic` varchar(20) DEFAULT NULL,
  `storeId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback_fits`
--

DROP TABLE IF EXISTS `feedback_fits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedback_fits` (
  `cid` varchar(36) NOT NULL,
  `staffId` varchar(36) NOT NULL,
  `productId` varchar(36) NOT NULL,
  `face` varchar(16) DEFAULT NULL,
  `topic` varchar(64) DEFAULT NULL,
  `tag` varchar(128) DEFAULT NULL,
  `where` varchar(128) DEFAULT NULL,
  `description` varchar(2048) DEFAULT NULL,
  `storeId` varchar(36) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  `img` varchar(1024) DEFAULT NULL,
  `appliesTo` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback_fits`
--

LOCK TABLES `feedback_fits` WRITE;
/*!40000 ALTER TABLE `feedback_fits` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback_fits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback_prices`
--

DROP TABLE IF EXISTS `feedback_prices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedback_prices` (
  `cid` varchar(36) NOT NULL,
  `staffId` varchar(36) NOT NULL,
  `productId` varchar(36) NOT NULL,
  `face` varchar(16) DEFAULT NULL,
  `topic` varchar(64) DEFAULT NULL,
  `tag` varchar(128) DEFAULT NULL,
  `where` varchar(128) DEFAULT NULL,
  `description` varchar(2048) DEFAULT NULL,
  `storeId` varchar(36) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  `img` varchar(1024) DEFAULT NULL,
  `appliesTo` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback_prices`
--

LOCK TABLES `feedback_prices` WRITE;
/*!40000 ALTER TABLE `feedback_prices` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback_prices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback_qualitys`
--

DROP TABLE IF EXISTS `feedback_qualitys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedback_qualitys` (
  `cid` varchar(36) NOT NULL,
  `staffId` varchar(36) NOT NULL,
  `productId` varchar(64) DEFAULT NULL,
  `face` varchar(16) DEFAULT NULL,
  `topic` varchar(64) DEFAULT NULL,
  `tag` varchar(300) NOT NULL,
  `when` varchar(128) DEFAULT NULL,
  `where` varchar(128) DEFAULT NULL,
  `what` varchar(128) DEFAULT NULL,
  `description` varchar(2048) DEFAULT NULL,
  `storeId` varchar(36) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  `img` varchar(1024) DEFAULT NULL,
  `appliesTo` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback_qualitys`
--

LOCK TABLES `feedback_qualitys` WRITE;
/*!40000 ALTER TABLE `feedback_qualitys` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback_qualitys` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback_stocks`
--

DROP TABLE IF EXISTS `feedback_stocks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedback_stocks` (
  `cid` varchar(36) DEFAULT NULL,
  `staffId` varchar(36) DEFAULT NULL,
  `productId` varchar(36) DEFAULT NULL,
  `face` varchar(16) DEFAULT NULL,
  `topic` varchar(64) DEFAULT NULL,
  `tag` varchar(128) DEFAULT NULL,
  `stockHighTUM` varchar(2048) DEFAULT NULL,
  `stockLowTUM` varchar(2048) DEFAULT NULL,
  `storeId` varchar(36) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  `img` varchar(1024) DEFAULT NULL,
  `appliesTo` varchar(512) DEFAULT NULL,
  `understocked` varchar(1024) DEFAULT NULL,
  `overstocked` varchar(1024) DEFAULT NULL,
  `description` varchar(2048) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback_stocks`
--

LOCK TABLES `feedback_stocks` WRITE;
/*!40000 ALTER TABLE `feedback_stocks` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback_stocks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedback_styles`
--

DROP TABLE IF EXISTS `feedback_styles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `feedback_styles` (
  `cid` varchar(36) NOT NULL,
  `staffId` varchar(36) NOT NULL,
  `productId` varchar(36) NOT NULL,
  `face` varchar(16) DEFAULT NULL,
  `topic` varchar(64) DEFAULT NULL,
  `tag` varchar(128) DEFAULT NULL,
  `description` varchar(2048) DEFAULT NULL,
  `storeId` varchar(36) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  `img` varchar(1024) DEFAULT NULL,
  `appliesTo` varchar(512) DEFAULT NULL,
  `what` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedback_styles`
--

LOCK TABLES `feedback_styles` WRITE;
/*!40000 ALTER TABLE `feedback_styles` DISABLE KEYS */;
/*!40000 ALTER TABLE `feedback_styles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `newPrincipals`
--

DROP TABLE IF EXISTS `newPrincipals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newPrincipals` (
  `cid` varchar(36) NOT NULL,
  `username` varchar(255) NOT NULL,
  `passwordHash` varchar(255) NOT NULL,
  `googleId` varchar(36) DEFAULT NULL,
  `creatorId` varchar(36) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL,
  `type` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newPrincipals`
--

LOCK TABLES `newPrincipals` WRITE;
/*!40000 ALTER TABLE `newPrincipals` DISABLE KEYS */;
INSERT INTO `newPrincipals` VALUES ('31ef6a80-f868-11e6-b658-905880b02086','benny@worldbrand.co.nz','$2a$05$ag43BiyxLiRFR8X5x92CNejA.Q7.wUM/IaXO8qP6m4aCQDUynQ48e',NULL,'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e','2017-02-21 19:01:47','2017-02-21 19:01:47',1,0,'manager'),('7be506a0-f8a8-11e6-9bd3-34f1e8394b63','asd@asd.com','$2a$05$WGJKz0WYwQ2JjXAdKO88r.m11ew4eLJkbCygbZbQo0.VkFgCYlNti',NULL,'84776240-f899-11e6-84ef-75773f976b77','2017-02-22 02:41:59','2017-02-22 02:42:09',1,1,'manager'),('7dcaf590-f864-11e6-a30d-4147216b8272','francis@worldbrand.co.nz','$2a$05$8HSpTIEAKeQMu3BGlDrsmOwKW5jK9B9s4WtFJU27plfbYRwdGmnmC',NULL,'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e','2017-02-21 18:35:17','2017-02-21 18:35:17',1,1,'store'),('846539d0-f899-11e6-b0bc-6276057aefd9','support@seekstock.co.nz','$2a$05$YIoRWDBVBOMdU1IahMbhOevIvhqnQGGxsMG1mOK.Lk98AQfk27Bl6',NULL,'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e','2017-02-22 00:54:51','2017-02-22 00:54:51',1,0,'manager'),('a36a4e90-f864-11e6-8002-fd9f7a25fe48','newmarket@worldbrand.co.nz','$2a$05$hGiV/NqZNI0WMrn4C6mL2eoqBVa6UUxirt0FyI97GMRuofMBtfS6C',NULL,'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e','2017-02-21 18:36:20','2017-02-21 18:36:20',1,0,'store'),('a6ce44a0-f865-11e6-9bae-0b87f9d15042','Eli@worldbrand.co.nz','$2a$05$t5/G/SrOs0Jg/wvVmJ4NxODcMniI.JJLeCVsJ.3XLJE/fNpBL5bQK',NULL,'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e','2017-02-21 18:43:35','2017-02-22 03:42:44',1,0,'manager'),('c3950480-f864-11e6-be34-42bf86e3efaf','queenstown@worldbrand.co.nz','$2a$05$nxYfCj1fr8DleHqqQrPeGOpbCA.rX.OvDK2RcdagrdBXw19i4wM6e',NULL,'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e','2017-02-21 18:37:14','2017-02-21 18:37:14',1,0,'store'),('e9029f20-f864-11e6-a494-b23c0a4ed826','wellington@worldbrand.co.nz','$2a$05$nKSnUe3D1XUK6Pb9RH7N0egUxILKTitvzKgGfsrjTIRGQkRTbJL4a',NULL,'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e','2017-02-21 18:38:17','2017-02-21 18:38:17',1,0,'store'),('f2193030-f8a8-11e6-a993-8a84df4214e5','francis@worldbrand.co.nz','$2a$05$UkDOdi62YmJGmhrY46nhp.QD4093ux/543jbuYbzdvphMPpAQAEim',NULL,'84776240-f899-11e6-84ef-75773f976b77','2017-02-22 02:45:18','2017-02-22 02:45:18',1,0,'manager');
/*!40000 ALTER TABLE `newPrincipals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `newproducts`
--

DROP TABLE IF EXISTS `newproducts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newproducts` (
  `cid` varchar(36) NOT NULL,
  `sku` varchar(32) NOT NULL,
  `category` varchar(64) DEFAULT NULL,
  `description` varchar(128) DEFAULT NULL,
  `brand` varchar(64) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `fbupdateAt` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newproducts`
--

LOCK TABLES `newproducts` WRITE;
/*!40000 ALTER TABLE `newproducts` DISABLE KEYS */;
/*!40000 ALTER TABLE `newproducts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `newsuggestions`
--

DROP TABLE IF EXISTS `newsuggestions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `newsuggestions` (
  `cid` char(36) NOT NULL,
  `productId` varchar(255) DEFAULT NULL,
  `staffId` char(36) NOT NULL,
  `images` mediumtext,
  `deleted` tinyint(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `product_type` varchar(128) DEFAULT NULL,
  `style_cut` varchar(128) DEFAULT NULL,
  `color` varchar(255) DEFAULT NULL,
  `description` varchar(2048) DEFAULT NULL,
  `type` varchar(64) DEFAULT NULL,
  `storeId` char(36) DEFAULT NULL,
  `topic` varchar(64) DEFAULT NULL,
  `tag` varchar(1280) DEFAULT NULL,
  `appliesTo` varchar(512) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newsuggestions`
--

LOCK TABLES `newsuggestions` WRITE;
/*!40000 ALTER TABLE `newsuggestions` DISABLE KEYS */;
/*!40000 ALTER TABLE `newsuggestions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
  `cid` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `recipientId` varchar(36) NOT NULL COMMENT 'recipient',
  `content` varchar(512) DEFAULT NULL,
  `subjectId` char(36) NOT NULL COMMENT 'feedbackid suggestionid',
  `notificationType` varchar(255) NOT NULL COMMENT ' mentioned: ''mentioned'',\n    liked: ''liked''',
  `read` tinyint(1) NOT NULL DEFAULT '0',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `creatorId` varchar(36) NOT NULL COMMENT 'current user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `subjectType` varchar(32) DEFAULT NULL COMMENT 'feedback suggestion ',
  `commentId` varchar(36) DEFAULT NULL,
  `createStoreId` varchar(36) DEFAULT NULL,
  `productId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `organisations`
--

DROP TABLE IF EXISTS `organisations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `organisations` (
  `cid` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `domain` varchar(255) NOT NULL,
  `leadUserEmail` varchar(255) NOT NULL,
  `parentId` int(2) DEFAULT NULL,
  `productUrlPrefix` varchar(500) NOT NULL,
  `productSearchIndex` varchar(200) NOT NULL,
  `feature_feedback` tinyint(1) DEFAULT '1',
  `feature_request` tinyint(1) DEFAULT '0',
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `creatorId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `expansion` varchar(1000) DEFAULT NULL,
  PRIMARY KEY (`cid`),
  UNIQUE KEY `domain` (`domain`),
  UNIQUE KEY `leadUserEmail` (`leadUserEmail`),
  UNIQUE KEY `organisations_domain_unique` (`domain`),
  UNIQUE KEY `organisations_leadUserEmail_unique` (`leadUserEmail`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `organisations`
--

LOCK TABLES `organisations` WRITE;
/*!40000 ALTER TABLE `organisations` DISABLE KEYS */;
INSERT INTO `organisations` VALUES ('4d49e6de-3289-11e6-93c3-0242ac110002','hallensteins.co.nz','ChrisR@hallensteins.co.nz',NULL,'http://fastly.hallensteins.com/products/original/','world_products',1,0,0,NULL,'2016-06-14 23:39:56','2016-06-14 23:39:56',NULL);
/*!40000 ALTER TABLE `organisations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_Info`
--

DROP TABLE IF EXISTS `product_Info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_Info` (
  `cid` varchar(36) NOT NULL,
  `productId` varchar(36) NOT NULL,
  `sku` varchar(36) NOT NULL,
  `brand` varchar(32) DEFAULT NULL,
  `colour` varchar(32) DEFAULT NULL,
  `fit` varchar(32) DEFAULT NULL,
  `image` varchar(256) DEFAULT NULL,
  `rrp` varchar(32) DEFAULT NULL,
  `size` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_Info`
--

LOCK TABLES `product_Info` WRITE;
/*!40000 ALTER TABLE `product_Info` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_Info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staffs`
--

DROP TABLE IF EXISTS `staffs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `staffs` (
  `cid` varchar(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `names` varchar(300) NOT NULL,
  `email` varchar(300) DEFAULT NULL,
  `userId` varchar(36) DEFAULT NULL,
  `barCode` varchar(100) DEFAULT NULL,
  `permission_level` tinyint(1) DEFAULT NULL,
  `apiKey` varchar(300) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `short_name` varchar(128) DEFAULT NULL,
  `role_ab` varchar(10) DEFAULT NULL,
  `storeId` varchar(36) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `creatorId` varchar(36) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staffs`
--

LOCK TABLES `staffs` WRITE;
/*!40000 ALTER TABLE `staffs` DISABLE KEYS */;
INSERT INTO `staffs` VALUES ('321fa240-f868-11e6-b04d-82b496e19166','[{\"text\":\"Benny Castles\"}]','benny@worldbrand.co.nz','benny@worldbrand.co.nz','$2a$05$ag43BiyxLiRFR8X5x92CNejA.Q7.wUM/IaXO8qP6m4aCQDUynQ48e',4,NULL,'Head Designer',NULL,'HED',NULL,0,'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e','2017-02-21 19:01:48','2017-02-21 19:01:48',1),('7bfaffa0-f8a8-11e6-b027-33f5b15a493e','[{\"text\":\"asd asd\"}]','asd@asd.com','asd@asd.com','$2a$05$l4Y7vgdJVaUDZUT/Mkrhq.5D/r1AZ1Sd.47eNasARrFJEhfW.VhgS',3,NULL,'Chief Marketing Officer',NULL,'CMO',NULL,1,'84776240-f899-11e6-84ef-75773f976b77','2017-02-22 02:41:59','2017-02-22 02:42:09',1),('84776240-f899-11e6-84ef-75773f976b77','[{\"text\":\"SeekStock Assistant\"}]','support@seekstock.co.nz','support@seekstock.co.nz','$2a$05$JaXwvdZzg3gPK5jpf8CVC.7QXClLK68yjhz0amfsu22Y0uDUFtdCG',5,NULL,'SeekStock Support',NULL,'SS',NULL,0,'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e','2017-02-22 00:54:51','2017-02-22 00:54:51',1),('a6f0c0c0-f865-11e6-8235-feb726a4fa32','[{\"text\":\"Eli -\"}]','Eli@worldbrand.co.nz','Eli@worldbrand.co.nz','$2a$05$mB.Mm92T9lPkIZuLgToZOeP1F8AkgGVUOE2OwSDRAGN7oAAeFz03i',4,NULL,'National Sales Manager',NULL,'NRM',NULL,0,'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e','2017-02-21 18:43:35','2017-02-22 03:42:44',1),('f222cd20-f8a8-11e6-99e6-e6b2c3190627','[{\"text\":\"Francis Hooper\"}]','francis@worldbrand.co.nz','francis@worldbrand.co.nz','$2a$05$usmkajTGS4sreVIpjNyQBu3KkQRFpRB4V5MiogJK2ikuveUkyH90a',4,NULL,'Head Designer',NULL,'HED',NULL,0,'84776240-f899-11e6-84ef-75773f976b77','2017-02-22 02:45:18','2017-02-22 02:45:18',1);
/*!40000 ALTER TABLE `staffs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stores`
--

DROP TABLE IF EXISTS `stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `stores` (
  `cid` varchar(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `names` varchar(300) NOT NULL,
  `email` varchar(300) DEFAULT NULL,
  `apiKey` varchar(300) DEFAULT NULL,
  `category` varchar(16) DEFAULT NULL,
  `provinceId` varchar(36) DEFAULT NULL,
  `googleId` varchar(36) DEFAULT NULL,
  `country_id` varchar(36) DEFAULT NULL,
  `location_lat` float(8,5) DEFAULT NULL,
  `location_lng` float(8,5) DEFAULT NULL,
  `location_name` varchar(100) DEFAULT NULL,
  `location_longName` varchar(300) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `city` varchar(64) DEFAULT NULL,
  `location` varchar(512) DEFAULT NULL,
  `country` varchar(64) DEFAULT NULL,
  `province` varchar(64) DEFAULT NULL,
  `phone` varchar(32) DEFAULT NULL,
  `postCode` varchar(32) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `creatorId` varchar(36) DEFAULT NULL,
  `shortCode` varchar(128) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `barCode` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores`
--

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
INSERT INTO `stores` VALUES ('7dd814f0-f864-11e6-b156-94c87d6e4d9e','[{\"text\":\"Britomart\"}]','auckland@worldbrand.co.nz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'Auckland','60 Tyler Street/nBritomart','New Zealand','','6493733034','1010','2017-02-21 18:35:17','2017-02-22 02:16:39','aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e','{\"text\":\"Brito\"}',1,'$2a$05$8HSpTIEAKeQMu3BGlDrsmOwKW5jK9B9s4WtFJU27plfbYRwdGmnmC'),('a37990d0-f864-11e6-9315-ba47979b1233','[{\"text\":\"Newmarket\"}]','newmarket@worldbrand.co.nz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'Auckland','32 Osborne Street/nNewmarket','New Zealand','','6495299444','1025','2017-02-21 18:36:20','2017-02-21 18:36:20','aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e','{\"text\":\"NMK\"}',1,'$2a$05$hGiV/NqZNI0WMrn4C6mL2eoqBVa6UUxirt0FyI97GMRuofMBtfS6C'),('c3a75400-f864-11e6-b2fb-7d5c223901b4','[{\"text\":\"Queenstown\"}]','queenstown@worldbrand.co.nz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'Queenstown','9-11 Marine Parade/nQueenstown','New Zealand','','6435552163','9300','2017-02-21 18:37:14','2017-02-21 18:37:14','aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e','{\"text\":\"QT\"}',1,'$2a$05$nxYfCj1fr8DleHqqQrPeGOpbCA.rX.OvDK2RcdagrdBXw19i4wM6e'),('e9160010-f864-11e6-8057-4510f493bb26','[{\"text\":\"Wellington\"}]','wellington@worldbrand.co.nz',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'Wellington CBD','102 Victoria Street/nWellington','New Zealand','','6444721595','6011','2017-02-21 18:38:17','2017-02-21 18:38:17','aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e','{\"text\":\"WGT\"}',1,'$2a$05$nKSnUe3D1XUK6Pb9RH7N0egUxILKTitvzKgGfsrjTIRGQkRTbJL4a');
/*!40000 ALTER TABLE `stores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `votes`
--

DROP TABLE IF EXISTS `votes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `votes` (
  `cid` varchar(36) NOT NULL,
  `staffId` varchar(36) NOT NULL,
  `activityId` varchar(36) NOT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  `type` varchar(36) DEFAULT NULL,
  `storeId` varchar(36) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `votes`
--

LOCK TABLES `votes` WRITE;
/*!40000 ALTER TABLE `votes` DISABLE KEYS */;
/*!40000 ALTER TABLE `votes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-02-22  4:51:27
