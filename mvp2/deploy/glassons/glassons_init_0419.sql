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

 Date: 04/19/2017 18:57:51 PM
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
  `productId` varchar(36) DEFAULT NULL,
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
  `commentNum` int(16) DEFAULT NULL,
  `quality_finishings_happy` int(16) DEFAULT '0',
  `quality_finishings_sad` int(16) DEFAULT '0'
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
--  Table structure for `feedbacks`
-- ----------------------------
DROP TABLE IF EXISTS `feedbacks`;
CREATE TABLE `feedbacks` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `sku` varchar(255) NOT NULL,
  `staffId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `tags` varchar(300) DEFAULT NULL,
  `appliesTo` varchar(300) DEFAULT NULL,
  `description` mediumtext NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `creatorId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

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
INSERT INTO `newPrincipals` VALUES ('b6017490-24c7-11e7-9ca8-01dedee8d81e', 'support@seekstock.co.nz', '$2a$05$JJsyjqbV2ysMhHAVmQQWD.cygTernXAcEUdMThkQLiv4RsiNVVgKG', null, 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '2017-04-19 06:16:22', '2017-04-19 06:16:22', '1', '0', 'manager');
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
INSERT INTO `organisations` VALUES ('4d49e6de-3289-11e6-93c3-0242ac110002', 'glassons.co.nz', 'ChrisR@hallensteins.co.nz', null, '', 'glassons_products', '1', '0', '0', null, '2016-06-14 23:39:56', '2017-03-31 04:57:19', null);
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
--  Table structure for `requestFeedbacks`
-- ----------------------------
DROP TABLE IF EXISTS `requestFeedbacks`;
CREATE TABLE `requestFeedbacks` (
  `cid` varchar(36) NOT NULL,
  `staffId` varchar(36) DEFAULT NULL,
  `storeId` varchar(36) DEFAULT NULL,
  `sku` varchar(36) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  `description` varchar(2048) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
INSERT INTO `staffs` VALUES ('b613eb20-24c7-11e7-9ea4-94965d2271e0', '[{\"text\":\"SeekStock Assistant\"}]', 'support@seekstock.co.nz', 'support@seekstock.co.nz', '$2a$05$SXKdR7BTdIiBNeTALilzCOf/4FiJhkixYve0AKjphfIwl1taVlIXW', '5', null, 'SeekStock Support', null, 'CEO', null, '0', 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '2017-04-19 06:16:22', '2017-04-19 06:16:23', '1');
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
