/*
 Navicat Premium Data Transfer

 Source Server         : mysql_localhost_3308
 Source Server Type    : MySQL
 Source Server Version : 50714
 Source Host           : localhost
 Source Database       : seekstock

 Target Server Type    : MySQL
 Target Server Version : 50714
 File Encoding         : utf-8

 Date: 02/27/2017 20:00:54 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `a_activityCounts`
-- ----------------------------
DROP TABLE IF EXISTS `a_activityCounts`;
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

-- ----------------------------
--  Table structure for `a_classifyfaceCounts`
-- ----------------------------
DROP TABLE IF EXISTS `a_classifyfaceCounts`;
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

-- ----------------------------
--  Table structure for `a_staffActivityCounts`
-- ----------------------------
DROP TABLE IF EXISTS `a_staffActivityCounts`;
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

-- ----------------------------
--  Table structure for `applies`
-- ----------------------------
DROP TABLE IF EXISTS `applies`;
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

-- ----------------------------
--  Table structure for `comments`
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
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

-- ----------------------------
--  Table structure for `feedback_fits`
-- ----------------------------
DROP TABLE IF EXISTS `feedback_fits`;
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

-- ----------------------------
--  Table structure for `feedback_prices`
-- ----------------------------
DROP TABLE IF EXISTS `feedback_prices`;
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

-- ----------------------------
--  Table structure for `feedback_qualitys`
-- ----------------------------
DROP TABLE IF EXISTS `feedback_qualitys`;
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

-- ----------------------------
--  Table structure for `feedback_stocks`
-- ----------------------------
DROP TABLE IF EXISTS `feedback_stocks`;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- ----------------------------
--  Table structure for `feedback_styles`
-- ----------------------------
DROP TABLE IF EXISTS `feedback_styles`;
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
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- ----------------------------
--  Table structure for `newPrincipals`
-- ----------------------------
DROP TABLE IF EXISTS `newPrincipals`;
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

-- ----------------------------
--  Records of `newPrincipals`
-- ----------------------------
BEGIN;
INSERT INTO `newPrincipals` VALUES ('3502b7b0-f307-11e6-a988-79e419214f0f', 'toni.s@brand.com', '$2a$05$0TBwT7E4Co85sEh0FvD5pek7fDrITgN.06ii8hXJhzItff6gCK1xO', null, 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '2017-02-14 22:44:56', '2017-02-14 22:44:56', '1', '0', 'manager'), ('521c3600-f307-11e6-be05-54fe2b70b1d5', 'sacha.s@brand.com', '$2a$05$6WgrNV3RGzsmvw1tNSiWN.u8b.JdsLJZqW2tljPKOB49dYJo2AwvO', null, 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '2017-02-14 22:45:44', '2017-02-14 22:45:44', '1', '0', 'manager'), ('7160d5e0-f300-11e6-bfb6-9746ee07ad9e', 'lambtonquay@brand.com', '$2a$05$128U1dCYrD5KrNuOI64hYeKQWwV9U531bZU2aQI1q7a.ICjulOMLK', null, 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '2017-02-14 21:56:30', '2017-02-14 21:56:30', '1', '0', 'store'), ('8ff29820-f307-11e6-90f5-1a69dc02402b', 'rose.m@brand.com', '$2a$05$lJialJP2yucaAqp9NN7tOuxC8H56WWQ6w3A/YQnfKW2DwrjFrvzzC', null, 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '2017-02-14 22:47:28', '2017-02-14 22:47:28', '1', '0', 'manager'), ('ac9b0950-f300-11e6-bd90-7d357d469ba2', 'riccarton@brand.com', '$2a$05$MogXb9uK4ynklz.bY6bwp.Mj.2FVQpBaw8pCXxJ5SSsKNPHu2pFZu', null, 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '2017-02-14 21:58:10', '2017-02-14 21:58:10', '1', '0', 'store'), ('ae9a82f0-e2d2-11e6-abfb-4f701a3880eb', 'chris.r@brand.com', '$2a$05$ELCGssmnUicIsZSmDp80FOfBFEb9S7DSKxOQ3M49RbV8efXKNHKC.', null, 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '2017-02-07 07:48:38', '2017-02-07 07:48:38', '1', '0', 'manager'), ('d0ce5260-f304-11e6-bdf7-a0b6e70129ec', 'queenstreet@brand.com', '$2a$05$cLG1rzqqi3/5xLsa/nKTduFrZZJO8azMyMeSWYP/77N/JLwRSdSqW', null, 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '2017-02-14 22:27:48', '2017-02-14 22:27:49', '1', '0', 'store'), ('db548dc0-f300-11e6-b2c1-7d3645cfb260', 'sylviapark@brand.com', '$2a$05$PSgOOtHNwehidZ75wGZ0kecDIGG/QIcHKrsh5/zNQgqHcSd6XiTBC', null, 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '2017-02-14 21:59:28', '2017-02-14 21:59:28', '1', '0', 'store');
COMMIT;

-- ----------------------------
--  Table structure for `newproducts`
-- ----------------------------
DROP TABLE IF EXISTS `newproducts`;
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

-- ----------------------------
--  Table structure for `newsuggestions`
-- ----------------------------
DROP TABLE IF EXISTS `newsuggestions`;
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

-- ----------------------------
--  Table structure for `notifications`
-- ----------------------------
DROP TABLE IF EXISTS `notifications`;
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

-- ----------------------------
--  Table structure for `organisations`
-- ----------------------------
DROP TABLE IF EXISTS `organisations`;
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

-- ----------------------------
--  Records of `organisations`
-- ----------------------------
BEGIN;
INSERT INTO `organisations` VALUES ('4d49e6de-3289-11e6-93c3-0242ac110002', 'hallensteins.co.nz', 'ChrisR@hallensteins.co.nz', null, 'http://fastly.hallensteins.com/products/original/', 'hallensteins_products', '1', '0', '0', null, '2016-06-14 23:39:56', '2016-06-14 23:39:56', null);
COMMIT;

-- ----------------------------
--  Table structure for `product_Info`
-- ----------------------------
DROP TABLE IF EXISTS `product_Info`;
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

-- ----------------------------
--  Table structure for `staffs`
-- ----------------------------
DROP TABLE IF EXISTS `staffs`;
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

-- ----------------------------
--  Records of `staffs`
-- ----------------------------
BEGIN;
INSERT INTO `staffs` VALUES ('00dc14d0-f308-11e6-8dee-39e40c1be012', '[{\"text\":\"Joanne Smith\"}]', null, 'JS', '$2a$05$3iZMlEc9gEf4q3EmYwS8cOkQfou4jYwJ8eQy3BJLaPzOXI6w6V.dO', '1', null, 'Visual Merchandiser', null, 'VM', '8131dc10-f276-11e6-8485-9593c266a862', '0', 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '2017-02-14 22:50:38', '2017-02-15 21:35:16', '1'), ('1cd0c230-f308-11e6-b549-7425e29221bd', '[{\"text\":\"Lucy Osborne\"}]', null, 'LO', '$2a$05$h2Aekpgx2ul5lO..Pz0A7OFp/3E8PoZa4M68Ii9EpuuHeV/auIyMK', '2', null, 'Store Manager', null, 'STM', 'acae9150-f300-11e6-9def-5a450ba48e1b', '0', 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '2017-02-14 22:51:25', '2017-02-14 22:51:25', '1'), ('3512bd40-f307-11e6-817b-6b5527025193', '[{\"text\":\"Toni Street\"}]', 'toni.s@brand.com', 'toni.s@brand.com', '$2a$05$hmbyhvH1Lj0T6Y0UYhkVrOVyER74yMiKv2Pfps2ODv6CGcEL0EyHG', '4', null, 'Chief Digital Officer ', null, 'CDO', null, '0', 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '2017-02-14 22:44:56', '2017-02-14 22:44:56', '1'), ('3fc2fc90-f308-11e6-8d69-954877a342c3', '[{\"text\":\"Emily Paul\"}]', null, 'EP', '$2a$05$3VwSS34G5nKdHIgP8WLv0e4a4KZzI8m072jrM7LgoR01tV.W2ecMW', '1', null, 'Part-timer', null, 'PT', 'acae9150-f300-11e6-9def-5a450ba48e1b', '0', 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '2017-02-14 22:52:23', '2017-02-14 22:52:23', '1'), ('52262110-f307-11e6-bbc7-1c9ee76a66e1', '[{\"text\":\"Sacha Scott\"}]', 'sacha.s@brand.com', 'sacha.s@brand.com', '$2a$05$KN.ln9ebxam3of7dU22t4.7oy3ehYCotXw6vNQ/V.YAXcjpBK6rti', '4', null, 'National Retail Manager', null, 'NRM', null, '0', 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '2017-02-14 22:45:44', '2017-02-14 22:46:01', '1'), ('59147660-f308-11e6-993c-6464004a7b67', '[{\"text\":\"Mia Cooper\"}]', null, 'MC', '$2a$05$Tm1RQ2qwm2a.oOCNiqfbWO.ETu9HXNU/PHpykwXYDqGTx5t8IBeIO', '2', null, 'Assistant Manager', null, '2IC', 'db629780-f300-11e6-8e89-dc13fa451e7f', '0', 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '2017-02-14 22:53:06', '2017-02-14 22:53:06', '1'), ('85b66570-f308-11e6-8bde-2d37ec5669b7', '[{\"text\":\"Charlie Adams\"}]', null, 'CA', '$2a$05$ReCukDLsaD67aKov0kndt./k/2jtMGFM5M7RLXXrKf4OhjfeBYtxK', '2', null, 'Store Manager', null, 'STM', 'db629780-f300-11e6-8e89-dc13fa451e7f', '0', 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '2017-02-14 22:54:21', '2017-02-14 22:54:21', '1'), ('87d28cd0-f407-11e6-b268-8264c774fa6e', '[{\"text\":\"headMaster Tony\"}]', 'test@test.com', 'test@test.com', '$2a$05$O5I4A6NB5mWbuKaua73FsuqlOk/E4kPIs7H9oSWfMVIj48cuvlOpS', '4', null, 'Chief Executive Officer', null, 'CEO', null, '1', 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '2017-02-16 05:19:46', '2017-02-16 05:20:52', '1'), ('8ffde2c0-f307-11e6-b884-a3ef6923e912', '[{\"text\":\"Rose Mackenzie\"}]', 'rose.m@brand.com', 'rose.m@brand.com', '$2a$05$yvUbgshLEEtEN6M7z8axe.ALACLE0wwsocCMUZc/dFCQ5pcYDFrY2', '3', null, 'Regional/Area Manager', null, 'REM', null, '0', 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '2017-02-14 22:47:28', '2017-02-14 22:47:28', '1'), ('9ed3fe00-f308-11e6-a666-6bc35dc1d690', '[{\"text\":\"Mona Shepherd\"}]', null, 'MS', '$2a$05$/1/dE0.aGccvQeZiZLOCbON/PK6Ae.ICIkZ/ZanEEesQ7k/w80AOy', '1', null, 'Third in Charge', null, '3IC', '3a0f14a0-ecc8-11e6-809f-9d4ed400052a', '0', 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '2017-02-14 22:55:03', '2017-02-15 21:36:36', '1'), ('aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '[{\"text\":\"Chris Ramsay\"}]', 'chris.r@brand.com', 'chris.r@brand.com', '$2a$05$o0xR/.BerDgqrD1/7LoDyu/7Gq7IKvvnS3jf1MReylMAsN4sy/o.y', '4', null, 'Chief Executive Officer', '{\"text\":\"CR\"}', 'CEO', null, '0', 'e5a9bc40-c584-11e6-8fe3-3647b3651d99', '2017-02-07 07:48:38', '2017-02-07 07:48:38', '1'), ('b4d6e910-f308-11e6-a152-adad7a589b72', '[{\"text\":\"Eve Jacobs\"}]', null, 'EJ', '$2a$05$9UPs82onl.xhvTatELdIaelRGz/yxQPt6WfoGIE205JScCMNgRZiW', '1', null, 'Casual', null, 'CAS', '3a0f14a0-ecc8-11e6-809f-9d4ed400052a', '0', 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '2017-02-14 22:55:40', '2017-02-15 21:35:52', '1'), ('be312030-f307-11e6-aa1f-3d9a3a5c8068', '[{\"text\":\"Amy Pearson\"}]', null, 'AP', '$2a$05$kGgSYvpllRlvPtU.HLhdF.WF5U66ujRfDkD4cEGgOUohgJAaPgXX6', '2', null, 'Store Manager', null, 'STM', '8131dc10-f276-11e6-8485-9593c266a862', '0', 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '2017-02-14 22:48:46', '2017-02-15 21:31:10', '1'), ('c2f394d0-f308-11e6-b8a4-a0e46f06766b', '[{\"text\":\"Sara Warren\"}]', null, 'SW', '$2a$05$v2nOyOB/c.QRlCozUa.wQ.Yj0Btkv8AN7GFfUvTJSgAL5uWx1IwVS', '1', null, 'Part-timer', null, 'PT', '3a0f14a0-ecc8-11e6-809f-9d4ed400052a', '0', 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '2017-02-14 22:56:03', '2017-02-15 21:37:00', '1'), ('e27fdd50-f307-11e6-b042-14dbd6710666', '[{\"text\":\"Lauren Thompson\"}]', null, 'LT', '$2a$05$ctOjlK5wqfU1Rdb0FAGQmeAQzyy8pYncmo0AZlnNcTXeMU/Z/TEXe', '1', null, 'Full-timer', null, 'FT', '8131dc10-f276-11e6-8485-9593c266a862', '0', 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '2017-02-14 22:49:47', '2017-02-15 21:35:24', '1');
COMMIT;

-- ----------------------------
--  Table structure for `stores`
-- ----------------------------
DROP TABLE IF EXISTS `stores`;
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

-- ----------------------------
--  Records of `stores`
-- ----------------------------
BEGIN;
INSERT INTO `stores` VALUES ('3a0f14a0-ecc8-11e6-809f-9d4ed400052a', '[{\"text\":\"Queen Street\"}]', 'queenstreet@brand.com', null, null, null, null, null, null, null, null, null, '0', 'Auckland', '78 Queen Street/nAuckland City', 'New Zealand', '', '9090909090', '1010', '2017-02-14 22:27:49', '2017-02-14 22:40:52', 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '{\"text\":\"QUE\"}', '1', '$2a$05$jjgwFNKZ65aMi1WwnFFaSuu6gHPvd7y0mnnEwhosbjt9SmvNEp2JS'), ('8131dc10-f276-11e6-8485-9593c266a862', '[{\"text\":\"Lambton Quay\"}]', 'lambtonquay@brand.com', null, null, null, null, null, null, null, null, null, '0', 'Wellington', '123 Lambton Quay/nTe Aro', 'New Zealand', '', '0987665432', '6011', '2017-02-14 21:56:31', '2017-02-15 21:31:00', 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '{\"text\":\"LMQ\"}', '1', '$2a$05$a4BD1YgkHvxXl4onpVJENe95FV2/MwC49vxVoLGRSYzJL1KXphaMi'), ('acae9150-f300-11e6-9def-5a450ba48e1b', '[{\"text\":\"Riccarton\"}]', 'riccarton@brand.com', null, null, null, null, null, null, null, null, null, '0', 'Christchurch', '60 Riccarton Road/nRiccarton', 'New Zealand', '', '0987765432', '8011', '2017-02-14 21:58:10', '2017-02-14 21:58:10', 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '{\"text\":\"RIC\"}', '1', '$2a$05$9QLyiKsEBu8adBA72/lmEeAjOjaoNLxkwR2G5hSNzmzM2gsJ5Rho6'), ('db629780-f300-11e6-8e89-dc13fa451e7f', '[{\"text\":\"Sylvia Park\"}]', 'sylviapark@brand.com', null, null, null, null, null, null, null, null, null, '0', 'Auckland', 'Shop 25, Sylvia Park Mall, 286 Mount Wellington Hwy/nMount Wellington', 'New Zealand', '', '0987766545454', '1060', '2017-02-14 21:59:28', '2017-02-14 21:59:28', 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '{\"text\":\"SYL\"}', '1', '$2a$05$FqnxfFfcePrnFWEUfZhX.e9ee32hier/LvxLF0LgjDV4bQjCbs83S');
COMMIT;

-- ----------------------------
--  Table structure for `votes`
-- ----------------------------
DROP TABLE IF EXISTS `votes`;
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

SET FOREIGN_KEY_CHECKS = 1;
