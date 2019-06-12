/*
 Navicat Premium Data Transfer

 Source Server         : mysql_localhost_3308
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost
 Source Database       : seekstock

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : utf-8

 Date: 11/08/2017 21:57:54 PM
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
  `productId` varchar(128) DEFAULT NULL,
  `staffId` varchar(36) DEFAULT NULL,
  `storeId` varchar(36) DEFAULT NULL,
  `organisationId` varchar(36) NOT NULL,
  `thankNum` int(16) NOT NULL DEFAULT '0',
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- ----------------------------
--  Table structure for `a_classifyfaceCounts`
-- ----------------------------
DROP TABLE IF EXISTS `a_classifyfaceCounts`;
CREATE TABLE `a_classifyfaceCounts` (
  `cid` varchar(36) DEFAULT NULL,
  `productId` varchar(128) DEFAULT NULL,
  `quality_damagedbroken_sad` int(16) DEFAULT NULL,
  `quality_fabricquality_happy` int(16) DEFAULT NULL,
  `quality_fabricquality_sad` int(16) DEFAULT NULL,
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
  `style_colourprint_happy` int(16) DEFAULT NULL,
  `style_colourprint_sad` int(16) DEFAULT NULL,
  `style_designshape_happy` int(16) DEFAULT NULL,
  `style_designshape_sad` int(16) DEFAULT NULL,
  `style_fabricchoice_happy` int(16) DEFAULT NULL,
  `style_general_happy` int(16) DEFAULT NULL,
  `style_general_sad` int(16) DEFAULT NULL,
  `price_tooexpensive_happy` int(16) DEFAULT NULL,
  `price_tooexpensive_sad` int(16) DEFAULT NULL,
  `price_toocheap_happy` int(16) DEFAULT NULL,
  `price_toocheap_sad` int(16) DEFAULT NULL,
  `price_incorrectprice_happy` int(16) DEFAULT NULL,
  `price_incorrectprice_sad` int(16) DEFAULT NULL,
  `price_wellpriced_happy` int(16) DEFAULT NULL,
  `price_general_sad` int(16) DEFAULT NULL,
  `stock_toohigh_happy` int(16) DEFAULT NULL,
  `stock_toohigh_sad` int(16) DEFAULT NULL,
  `stock_toolow_happy` int(16) DEFAULT NULL,
  `stock_toolow_sad` int(16) DEFAULT NULL,
  `stock_wellstocked_happy` int(16) DEFAULT NULL,
  `stock_general_sad` int(16) DEFAULT NULL,
  `style_fabricchoice_sad` int(16) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  `voteNum` int(16) DEFAULT NULL,
  `commentNum` int(16) DEFAULT NULL,
  `quality_finishings_happy` int(11) DEFAULT '0',
  `quality_finishings_sad` int(11) DEFAULT '0',
  `organisationId` varchar(36) NOT NULL
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
  `storeId` varchar(36) DEFAULT NULL,
  `organisationId` varchar(36) NOT NULL,
  `thankNum` int(16) NOT NULL DEFAULT '0'
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
  `organisationId` varchar(36) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- ----------------------------
--  Table structure for `collections`
-- ----------------------------
DROP TABLE IF EXISTS `collections`;
CREATE TABLE `collections` (
  `cid` varchar(36) NOT NULL,
  `staffId` varchar(36) DEFAULT NULL,
  `activityId` varchar(36) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  `type` varchar(36) DEFAULT NULL,
  `storeId` varchar(36) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  `productId` varchar(128) DEFAULT NULL,
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
  `organisationId` varchar(36) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- ----------------------------
--  Table structure for `feedback_prices`
-- ----------------------------
DROP TABLE IF EXISTS `feedback_prices`;
CREATE TABLE `feedback_prices` (
  `cid` varchar(36) NOT NULL,
  `staffId` varchar(36) NOT NULL,
  `productId` varchar(128) DEFAULT NULL,
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
  `organisationId` varchar(36) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- ----------------------------
--  Table structure for `feedback_qualitys`
-- ----------------------------
DROP TABLE IF EXISTS `feedback_qualitys`;
CREATE TABLE `feedback_qualitys` (
  `cid` varchar(36) NOT NULL,
  `staffId` varchar(36) NOT NULL,
  `productId` varchar(128) DEFAULT NULL,
  `face` varchar(16) DEFAULT NULL,
  `topic` varchar(64) DEFAULT NULL,
  `tag` varchar(128) DEFAULT NULL,
  `when` varchar(128) DEFAULT NULL,
  `where` varchar(128) DEFAULT NULL,
  `what` varchar(2048) DEFAULT NULL,
  `description` varchar(2048) DEFAULT NULL,
  `storeId` varchar(36) DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  `img` varchar(1024) DEFAULT NULL,
  `appliesTo` varchar(512) DEFAULT NULL,
  `organisationId` varchar(36) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- ----------------------------
--  Table structure for `feedback_stocks`
-- ----------------------------
DROP TABLE IF EXISTS `feedback_stocks`;
CREATE TABLE `feedback_stocks` (
  `cid` varchar(36) DEFAULT NULL,
  `staffId` varchar(36) DEFAULT NULL,
  `productId` varchar(128) DEFAULT NULL,
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
  `description` varchar(2048) DEFAULT NULL,
  `organisationId` varchar(36) NOT NULL,
  `arrivedTime` varchar(20) DEFAULT NULL,
  `requestSize` varchar(128) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- ----------------------------
--  Table structure for `feedback_styles`
-- ----------------------------
DROP TABLE IF EXISTS `feedback_styles`;
CREATE TABLE `feedback_styles` (
  `cid` varchar(36) NOT NULL,
  `staffId` varchar(36) NOT NULL,
  `productId` varchar(128) DEFAULT NULL,
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
  `what` varchar(2048) DEFAULT NULL,
  `organisationId` varchar(36) NOT NULL,
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
  `organisationId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- ----------------------------
--  Records of `newPrincipals`
-- ----------------------------
BEGIN;
INSERT INTO `newPrincipals` VALUES ('021afbb0-a247-11e7-9284-636a8a23eb80', 'wyf_1212@163.com', '$2a$05$SA61Q9Vw/fF5RboaPcBwc.l/VVNKCuypVTHjmwZsruracQ1/m83G.', null, '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-25 23:12:31', '2017-10-31 01:38:55', '1', '0', 'store', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('2238c4e0-9397-11e7-b262-859e6519d98d', 'riccarton@brand.com', '$2a$05$8dsaH1Q9KXdLzwVWB1VhXesV9hHReRyav9h6npYPvu0yoMXlUNHAC', null, '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-07 06:38:18', '2017-09-07 06:38:18', '1', '0', 'store', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('31cbf840-9e51-11e7-ac95-c21c403b0c20', 'nelson@brand.com', '$2a$05$H8cm1U48bZWcCNgzulDONe.3VglrDXCF02ExAo22Hwb7dJk2QQWkK', null, '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-20 22:15:22', '2017-09-21 13:46:20', '1', '0', 'store', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('36caf800-a4a5-11e7-a0c2-47473209a8da', 'wanaka@brand.com', '$2a$05$fRWtvTkLzP/.ba2wTyncG.n06T9WFCJcd4yRrDpLcev61gHAB/GWm', null, '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-28 23:31:55', '2017-09-28 23:35:49', '1', '0', 'store', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('37e71230-9395-11e7-8be1-923535f53f6d', 'chris.r@brand.com', '$2a$05$sFDGbhdPCknNVWxaTs4R5u8QTTbxSu4hROoMYn0hjrH01pwmUvLWO', null, '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-07 06:24:35', '2017-09-25 23:54:05', '1', '0', 'manager', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('3879f430-a04a-11e7-9e09-d00a9ca72246', 'andrea@seekstock.co.nz', '$2a$05$TxgSrtooR/NXNiFd1Z9HEOhMCJ9Yr7HhEgqviF2qlqB1nhiSQ3h8m', null, '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-23 10:30:29', '2017-09-25 20:02:43', '0', '0', 'manager', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('3ef42cd0-9f4c-11e7-a4a3-314042c603f0', 'whangarei@brand.com', '$2a$05$nZ7eTo2WJDOnQZOuLxUWB.x5Z3F25aXgeRj6hzFrayBOh/evuP4/a', null, '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-22 04:12:28', '2017-09-22 04:15:38', '1', '0', 'store', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('4a195e90-a17d-11e7-ada1-2fe7b7569304', 'takapuna@brand.com', '$2a$05$s486pbx8a5rnZ3QULcCyl.LM7I/u2PHpQf5/uTxB8XaujxDqztVWK', null, '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-24 23:08:34', '2017-09-24 23:08:34', '1', '0', 'store', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('4c76e540-9395-11e7-9813-e849432e8c53', 'toni.s@brand.com', '$2a$05$UVjUTCssKABwpUJn5raDluKoMV8QOGh5H9fgy1KkabdGOhoaiNXhe', null, '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-07 06:25:10', '2017-09-23 01:28:40', '1', '0', 'manager', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('5f8743d0-a044-11e7-9ef2-41244a9830cf', 'ayebro@brand.com', '$2a$05$PAsh3fjdxqVLS96kcOJKuucB1RFX/7Htsi3N3mXgpdQGSW0/bLQhK', null, '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-23 09:48:37', '2017-10-31 01:11:51', '0', '0', 'store', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('60fec1b0-9398-11e7-942e-84d23fe15539', 'queenstreet@brand.com', '$2a$05$dbg0eZy59BaK4x5ThRrrm.CB0veJ./xRb.PvmlxbdN08eDiyUnQXG', null, '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-07 06:47:12', '2017-09-07 06:47:12', '1', '0', 'store', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('61d09550-9e88-11e7-a65c-d8ecb34b30b2', 'thames@brand.com', '$2a$05$l.C9YD/he2Ho/e/XCSDHfOOjtIccJlgP4JbQ47phEopUplumnf8Li', null, 'null', '2017-09-21 04:50:25', '2017-09-21 04:50:25', '1', '0', 'store', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('6372f030-b3bc-11e7-81b4-ff51395b1190', 'anthonywang0517@gmail.com', '$2a$05$WKN0Kx/Ub4KzlS8B5QdfP.dduVsIEx3lDgyzYFw/zAjuy3OkpXUj6', null, '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-10-18 04:25:36', '2017-10-18 04:25:36', '2', '0', 'manager', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('681b9de0-9395-11e7-a531-03d75de3c786', 'sacha.s@brand.com', '$2a$05$zg8dHQzRS1JgXcbuHXGgOOpcBZ/IEXEdcZYJ/SEJ10cj3olmAXHmG', null, '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-07 06:25:56', '2017-09-28 10:55:04', '1', '0', 'manager', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('8a36b220-9395-11e7-b0ec-44d15e1fafd7', 'rose.m@brand.com', '$2a$05$mcLTatCNfyq6/OamkOdG4.tvsoNthkSHXineByhiy/957jZn/2A7.', null, '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-07 06:26:53', '2017-10-31 03:13:17', '1', '0', 'manager', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('8c1a3a40-a1ae-11e7-96d8-a9af88379b49', 'rose.ardern@gmail.com', '$2a$05$Y1xMmud26FDyC0kkv6H3ReRCGdwQCw.a9/Y65Tr6f6mE1QldfrYbG', null, '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-25 05:01:10', '2017-09-25 05:01:10', '2', '0', 'manager', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('8f0ffd60-a22c-11e7-b620-27419f225ccb', 'andrea@seekstock.co.nz', '$2a$05$lMfxvsgMZ2mViHLiT1CpwuRttGMLM3oQ.op8wVT0tSMWe1Rx3m2my', null, '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-25 20:03:12', '2017-09-25 20:03:12', '2', '0', 'manager', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('90946290-9fff-11e7-b565-c60be0090bd6', 'cubastreet@brand.com', '$2a$05$zff6n4fw5NzL2OvaP2jCyeJJ6l8quueJXpULpH4o5S5CED9w.4fz6', null, '4c8256f0-9395-11e7-89a6-88568af3c30e', '2017-09-23 01:36:04', '2017-09-23 01:36:04', '1', '0', 'store', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('926fddc0-a43b-11e7-9363-797edccca2d6', 'tony@seesktock.co.nz', '$2a$05$WwgDrE1otdeuqSm3Uh.tu.lygZtZfqh7XBPAtggA6vGDc0TWssmpm', null, '68270f90-9395-11e7-a3f0-daa7744d684d', '2017-09-28 10:55:42', '2017-09-28 10:55:42', '2', '0', 'store', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('9d659dd0-6770-11e7-8d35-b2970c237fde', 'support@seekstock.co.nz', '$2a$05$zTCJeyo3p8Moje6trSeRdeJKJK4NWZVIfbWL9vqLx/q8vVtILxwmS', null, 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '2017-07-13 02:11:43', '2017-07-13 06:16:20', '1', '0', 'manager', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('a89e2f50-a1ae-11e7-ad9c-1888bb0f4649', 'drea.vdm@gmail.com', '$2a$05$8QzhLNwEKJ9BKZfj.LcDuuDNiwrdyrfob3MQXe.yGsmisX4GlY40m', null, '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-25 05:01:58', '2017-09-25 20:02:49', '0', '0', 'manager', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('a9dd6170-a4a0-11e7-9a66-b9aa26ff390c', 'dunedin@brand.com', '$2a$05$MnhJg86WFBlAaO3lU5lfZeM50pieBS7lxVzyNGvpWpqtUIwiojCtS', null, '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-28 22:59:20', '2017-09-28 22:59:20', '2', '0', 'store', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('b2cdb220-bdd8-11e7-a12e-5a005254a7f1', 'youfa@seeckstock.co.nz', '$2a$05$QRLQ512OE4iixKmFbu1dauhY9T1ri8kmL9QOjXjbPZSlphSjU.je6', null, '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-10-31 01:13:26', '2017-10-31 01:13:26', '2', '0', 'store', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('c7089d50-a7b1-11e7-94f7-3a091a346fd8', 'islandbay@brand.com', '$2a$05$1mSx1mFGc//f8thIJTSpB.XJUWOHm4oTGLbMWGu3vxrPhqgI.2vUW', null, '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-10-02 20:39:24', '2017-10-02 20:45:53', '1', '0', 'store', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('c8e33f10-a232-11e7-baf5-125e2d2efba0', 'drea.vdm@gmail.com', '$2a$05$e3oiqv.nLsJ64cO/SfSZB.R4DU8oh2k2asp570kOBZklbAWOZCJMi', null, '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-25 20:47:46', '2017-09-25 20:47:46', '2', '0', 'store', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('d5c742c0-9397-11e7-b18c-37c0d768b0c5', 'sylviapark@brand.com', '$2a$05$EpPW18dHnWhJJjgR7yeczuk9tbQ1ZLkA/hkTTUMBsVGmN7wSDGr6u', null, '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-07 06:43:19', '2017-09-07 06:44:24', '1', '0', 'store', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('d7a35200-a43b-11e7-ad8c-560ab46cdbf3', 'tony@seekstock.co.nz', '$2a$05$/RuIr5ZJlXqaREUmTcC97.uAvirImfArfW3yFQ.I24uPZVZDumqQC', null, '68270f90-9395-11e7-a3f0-daa7744d684d', '2017-09-28 10:57:38', '2017-10-18 03:41:57', '1', '0', 'store', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('dd97c210-9395-11e7-8c72-2c1babef671b', 'lambtonquay@brand.com', '$2a$05$hweJvPJvWqrjp4BxGEuBhuo.2KKDOOhanPUQ32.U8zHRWqhJaxW1u', null, '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-07 06:29:13', '2017-09-07 06:29:13', '1', '0', 'store', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('ddb44150-bdf3-11e7-9f88-c26e310939a1', 'aaa@www.com', '$2a$05$Aq4TtgeOPliCXDEcuoC3YOw6nGkZNcPLBysdQUwhpU5oaq94FR0Eu', null, '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-10-31 04:27:55', '2017-10-31 04:27:55', '2', '0', 'store', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('f92aa1d0-a1b6-11e7-bf7c-856339934353', 'andreamaria009@gmail.com', '$2a$05$KLDg/bTAXyDgUc57thl9SO4fIvyr/Y4VsIoVRgT5oULOTWC3bqNlG', null, 'a8ae0dd0-a1ae-11e7-9cec-fa9a2bcf3d12', '2017-09-25 06:01:29', '2017-09-25 20:05:11', '0', '0', 'store', '4d49e6de-3289-11e6-93c3-0242ac110002'), ('fd2cec90-a22c-11e7-a07e-e3115db10f1d', 'andreamaria009@gmail.com', '$2a$05$bL/o5Xf6AA6S5269TNjZFu8aO30QY8q95tG2AIorMVSQcbCvhMLUu', null, '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-25 20:06:16', '2017-09-25 20:24:20', '1', '0', 'store', '4d49e6de-3289-11e6-93c3-0242ac110002');
COMMIT;

-- ----------------------------
--  Table structure for `newproducts`
-- ----------------------------
DROP TABLE IF EXISTS `newproducts`;
CREATE TABLE `newproducts` (
  `cid` varchar(36) NOT NULL,
  `sku` varchar(128) DEFAULT NULL,
  `category` varchar(64) DEFAULT NULL,
  `description` varchar(128) DEFAULT NULL,
  `brand` varchar(64) DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `fbupdateAt` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  `pNum` int(11) DEFAULT NULL,
  `nNum` int(11) DEFAULT NULL,
  `price` decimal(18,2) DEFAULT NULL,
  `season` varchar(36) DEFAULT NULL,
  `organisationId` varchar(36) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 ROW_FORMAT=DYNAMIC;

-- ----------------------------
--  Table structure for `newsuggestions`
-- ----------------------------
DROP TABLE IF EXISTS `newsuggestions`;
CREATE TABLE `newsuggestions` (
  `cid` char(36) NOT NULL,
  `productId` varchar(128) DEFAULT NULL,
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
  `appliesTo` varchar(512) DEFAULT NULL,
  `organisationId` varchar(36) NOT NULL
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
  `productId` varchar(128) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
--  Table structure for `organisations`
-- ----------------------------
DROP TABLE IF EXISTS `organisations`;
CREATE TABLE `organisations` (
  `cid` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `domain` varchar(255) NOT NULL,
  `parentId` varchar(36) DEFAULT NULL,
  `productUrlPrefix` varchar(500) NOT NULL,
  `productSearchIndex` varchar(200) NOT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `creatorId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `expansion` varchar(1000) DEFAULT NULL,
  `active` tinyint(4) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
--  Records of `organisations`
-- ----------------------------
BEGIN;
INSERT INTO `organisations` VALUES ('4d49e6de-3289-11e6-93c3-0242ac110002', 'trial.seekstock.nz', null, '', 'hallensteins_products', '0', null, '2016-06-14 23:39:56', '2017-03-31 04:57:19', '{\"type\":\"vend\",\"id\":\"0adfd74a-15df-11e7-f182-15ce848185c4\",\"retailer_id\":\"0adfd74a-1555-11e7-f182-0a921c1a4476\",\"user_id\":\"0adfd74a-15df-11e7-f182-0d11f2dac435\",\"domain_prefix\":\"seekstock\",\"access_token\":\"KWDZNSo67g4xBSF3mga7a:D88DDMhWHkC3O7vUjQ\",\"refresh_token\":\"qYI6j7xckavWEzEhldZ4jHsS0Wmw2EEiFgokyIkd\",\"token_type\":\"Bearer\"}', '1', 'trial');
COMMIT;

-- ----------------------------
--  Table structure for `requestFeedbacks`
-- ----------------------------
DROP TABLE IF EXISTS `requestFeedbacks`;
CREATE TABLE `requestFeedbacks` (
  `cid` varchar(36) NOT NULL,
  `staffId` varchar(36) DEFAULT NULL,
  `storeId` varchar(36) DEFAULT NULL,
  `sku` varchar(128) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT NULL,
  `description` varchar(2048) DEFAULT NULL,
  `organisationId` varchar(36) NOT NULL,
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
  `permission_level` varchar(4) DEFAULT NULL,
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
  `staffCode` varchar(24) DEFAULT NULL,
  `organisationId` varchar(36) DEFAULT NULL,
  `type` tinyint(4) NOT NULL,
  `emailStatus` tinyint(1) NOT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
--  Records of `staffs`
-- ----------------------------
BEGIN;
INSERT INTO `staffs` VALUES ('03b6acc0-a1b7-11e7-b337-38136b008072', '[{\"text\":\"Drea van der Meel\"}]', null, 'drea m', '$2a$05$J2real1FzmxJCVU0ixNugexv121pIpoHIv/RSRMH.Og2/eBIhSdia', '2', null, 'Store Manager', null, 'STM', 'f93a8050-a1b6-11e7-bf0b-01a6c61679c2', '0', 'a8ae0dd0-a1ae-11e7-9cec-fa9a2bcf3d12', '2017-09-25 06:01:47', '2017-09-25 06:01:47', '1', '123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('0df4e460-9396-11e7-91d7-dd5dae17bad9', '[{\"text\":\"Lauren Thompson\"}]', null, 'LT', '$2a$05$vgsXuD3oG2sV/JWkFt8iyuAUfSK33iNY1VFAuEEkRxZAIbRR/NYcy', '1', null, 'Full-timer', null, 'FT', 'dd9f1510-9395-11e7-983e-aace4d7d4c3b', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-07 06:30:34', '2017-09-07 06:30:34', '1', '123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('1289fbe0-a247-11e7-bf06-7c5565af314a', '[{\"text\":\"Yf Wang\"}]', null, 'yf', '$2a$05$NIEKS.drG0AytzGZRgHJZ.4afsQ6mxeE0eXMHUe1Cu4S8pmmRIBvm', '2', null, 'Store Manager', null, 'STM', '02289040-a247-11e7-956c-00adf4781720', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-25 23:12:59', '2017-10-31 01:45:13', '1', '123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('181a0540-9398-11e7-b2f0-cfaf4e888818', '[{\"text\":\"Mia Cooper\"}]', null, 'mc', '$2a$05$W2oYtTUu8Yb6SreSC30uLeF9MbqwYVQh1xNDACGoo1UOcsoz9X.nW', '1.5', null, 'Assistant Manager', null, '2IC', 'd5cfce40-9397-11e7-b3b4-d217ca389f53', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-07 06:45:10', '2017-09-23 01:17:11', '1', '123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('20afd060-9396-11e7-ab5d-b795e7ba6e35', '[{\"text\":\"Joanne Smith\"}]', null, 'JS', '$2a$05$u6M5rZcreRLOjunrVzllWOiIXP9ZGzsXkND9StpUn2biAOo9dQ1Ta', '1', null, 'Visual Merchandiser', null, 'VM', 'dd9f1510-9395-11e7-983e-aace4d7d4c3b', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-07 06:31:06', '2017-09-07 06:31:06', '1', '123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('2b578200-a22e-11e7-8d9a-43992e7a9923', '[{\"text\":\"Andrea Maria\"}]', null, 'andrea m', '$2a$05$6bKW139Q1E8caDwFkDUVAuDRpSWt6MvgTV9m59kk8gbTtNoELzDY2', '2', null, 'Store Manager', null, 'STM', 'fd396fb0-a22c-11e7-9e77-d8c73906d7b4', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-25 20:14:43', '2017-09-25 20:24:39', '1', '123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('37f65470-9395-11e7-aef2-d79ace5f7884', '[{\"text\":\"Chris Ramsay\"}]', 'chris.r@brand.com', 'chris.r@brand.com', '$2a$05$cocdwIdeQD0dmaGJZq86y.9PcfhMXHq1iXz0h8D058SHPym2t4Exi', '4', null, 'Chief Executive Officer', null, 'CEO', 'b51b4bb0-827c-11e7-8a2c-f8cfbeb2ebca', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-07 06:24:35', '2017-09-25 23:54:05', '1', 'h3ad0ffice#', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('3886ec80-a04a-11e7-ba32-fb614cb61ee7', '[{\"text\":\"Andrea Maria\"}]', 'andrea@seekstock.co.nz', 'andrea@seekstock.co.nz', '$2a$05$0St4Mp6SC3f0txp/hLx8hutdL.VWURJNrD1yk.Tm4OxZQ7bZ9A3Pu', '4', null, 'National Retail Manager', null, 'NRM', 'b51b4bb0-827c-11e7-8a2c-f8cfbeb2ebca', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-23 10:30:29', '2017-09-25 20:02:43', '0', 'h3ad0ffice#', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('3ceba370-9397-11e7-8e9b-d7570b7c3f97', '[{\"text\":\"Lucy Osborne\"}]', null, 'LO', '$2a$05$IGwKea69udyTOHKzTFqaXe2rPLpK/Zi7o7.A6fiioud0kr7r7bet6', '2', null, 'Store Manager', null, 'STM', '224288e0-9397-11e7-839d-a0ba6612daa5', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-07 06:39:02', '2017-09-07 06:39:02', '1', '123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('3dce5160-a4a5-11e7-9e3a-ce5eedc867a1', '[{\"text\":\"James Blake\"}]', null, 'jamesb', '$2a$05$RFDrO5F1lQWOgj2g0C/Il.vaGy4tR96RHR84Wz62B3.grWE6wg8DG', '2', null, 'Store Manager', null, 'STM', '36d94fe0-a4a5-11e7-8e17-b05d61585cf4', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-28 23:32:07', '2017-09-28 23:36:03', '1', '123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('4c8256f0-9395-11e7-89a6-88568af3c30e', '[{\"text\":\"Toni Street\"}]', 'toni.s@brand.com', 'toni.s@brand.com', '$2a$05$4QLJpUVLhcsEQUl3qRX5neLCvF0kg5FYFyS7t4VjedPN9McMvlLd6', '4', null, 'National Retail Manager', null, 'NRM', 'b51b4bb0-827c-11e7-8a2c-f8cfbeb2ebca', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-07 06:25:10', '2017-09-23 01:28:40', '1', 'h3ad0ffice#', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('4fb38510-9e8a-11e7-a1c7-b577361dd49f', '[{\"text\":\"Jamie Rowe\"}]', null, 'Jamie R', '$2a$05$nEiaKyFPe6vQVlLkLUi3aeRXP4TOBUKby78nTpRk57cHU0v.maNsq', '2', null, 'Store Manager', null, 'STM', '61dc0700-9e88-11e7-a363-7c7793ef9f4b', '0', 'null', '2017-09-21 05:04:13', '2017-09-21 05:13:49', '1', '123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('52f44810-9e51-11e7-af98-6c27d0a4382e', '[{\"text\":\"Ricky Hu\"}]', null, 'Ricky H', '$2a$05$qs7boJSRS5zBCbIeyKRTGu5YkZnW/8BDDWY.nS7fOHBlxvPLwN5Q.', '2', null, 'Store Manager', null, 'STM', '31da0200-9e51-11e7-bbd6-13fc5a2ba2fe', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-20 22:16:17', '2017-09-20 22:16:17', '1', '123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('6384a370-b3bc-11e7-9de5-ca3ee9889c3e', '[{\"text\":\"Xiaoyu Fu\"}]', 'anthonywang0517@gmail.com', 'anthonywang0517@gmail.com', '$2a$05$LtC4lW8JJ3UF.tZYVJs7uO0dBj66q.eU8VjurkiF7glKhKG8EZzdW', '4', null, 'General Manager', null, 'GM', 'b51b4bb0-827c-11e7-8a2c-f8cfbeb2ebca', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-10-18 04:25:36', '2017-10-18 04:25:36', '2', 'asdASD123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '1'), ('65cae530-9397-11e7-81c4-179927a43dde', '[{\"text\":\"Emily Paul\"}]', null, 'EP', '$2a$05$Smd1nyeSWfpW79OZXspQUOO7NwgUavL/Qz3ktkLiiLw.filUYs6cm', '1', null, 'Part-timer', null, 'PT', '224288e0-9397-11e7-839d-a0ba6612daa5', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-07 06:40:11', '2017-09-07 06:40:11', '1', '123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('68270f90-9395-11e7-a3f0-daa7744d684d', '[{\"text\":\"Sacha Scott\"}]', 'sacha.s@brand.com', 'sacha.s@brand.com', '$2a$05$c9bHlJKl7nI6bxw1OtbaFeaGN3TYDrhF3G1aUL8RHMoXNnbZZgHsO', '3', null, 'Buyer', null, 'BUY', 'b51b4bb0-827c-11e7-8a2c-f8cfbeb2ebca', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-07 06:25:56', '2017-09-28 10:55:04', '1', 'h3ad0ffice#', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('69744160-a17d-11e7-b8fe-e0d8bb2f474c', '[{\"text\":\"Tracey Nichols\"}]', null, 'tracey n', '$2a$05$NV7nefGyUEPITbqe4IGea.cVCesO2k.pPzlhUk.d/3uo.hv6RgL6q', '2', null, 'Store Manager', null, 'STM', '4a29b240-a17d-11e7-b0a9-be7a48e21a16', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-24 23:09:27', '2017-09-24 23:09:27', '1', '123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('7389a3f0-a044-11e7-84ec-2b92e5acf41d', '[{\"text\":\"Jacob Mcmagikarp\"}]', null, 'jacob', '$2a$05$FcZ6tIX/JMB4xjYxiCSbo.uwrdVdub0Grq3Wx3/bS35HqXZ/p8x8W', '2', null, 'Store Manager', null, 'STM', '5f939fe0-a044-11e7-b1fe-cadb7137504f', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-23 09:49:11', '2017-09-23 09:49:11', '1', 'sU4QgKN9', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('804b73b0-9398-11e7-803d-e1af73884cbb', '[{\"text\":\"Mona Shepherd\"}]', null, 'MS', '$2a$05$jUYRn7hzePCKZlsg5SiRmuEaGBHeLTd09RZoqcRdEDd7lAgwIEtPm', '1.5', null, 'Third in Charge', null, '3IC', '610689e0-9398-11e7-99c3-6fa5f86ae7c2', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-07 06:48:05', '2017-09-07 06:48:05', '1', '123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('889b75f0-9f4c-11e7-9b4f-2e9ec46159d9', '[{\"text\":\"Petra Adams\"}]', null, 'Petra M', '$2a$05$xBTEiRWiGEDWwhth7KhZI.9jXnb8iNVIEVgdZvjGz.SS.3SyXBl2G', '1', null, 'Full-timer', null, 'FT', '3f02abc0-9f4c-11e7-b2a7-3c061eec96f8', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-22 04:14:31', '2017-09-22 04:22:04', '1', '63h7Orx5', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('8a402800-9395-11e7-9b19-0c3ab4078e1e', '[{\"text\":\"Rose Mackenzie\"}]', 'rose.m@brand.com', 'rose.m@brand.com', '$2a$05$BkOJvNSPXgvTsDYOseTnTuvKGlzkunNCBj7ceyMyRIS9abf9nyuhK', '3', null, 'Regional/Area Manager', null, 'REM', 'b51b4bb0-827c-11e7-8a2c-f8cfbeb2ebca', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-07 06:26:53', '2017-10-31 03:13:17', '1', 'h3ad0ffice#', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('8c27a7c0-a1ae-11e7-a3da-c6e5830b5e30', '[{\"text\":\"Rose Ardern\"}]', 'rose.ardern@gmail.com', 'rose.ardern@gmail.com', '$2a$05$L7bVRs9aoLyQWcrfPsabOO2zNHX7o1KwvZZe5dlbSEKlTHLh9kz56', '3', null, 'Regional/Area Manager', null, 'REM', 'b51b4bb0-827c-11e7-8a2c-f8cfbeb2ebca', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-25 05:01:10', '2017-09-25 05:01:10', '1', '@temporary99', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '1'), ('8f1d1cc0-a22c-11e7-b963-63972e3c0701', '[{\"text\":\"Andrea Maria\"}]', 'andrea@seekstock.co.nz', 'andrea@seekstock.co.nz', '$2a$05$qb28zTzQI.q3L9hTc0KR6eeHCiNfRCtf6XF2gWzBxXdRSCCPhbN1u', '4', null, 'Retail Operations Manager', null, 'POM', 'b51b4bb0-827c-11e7-8a2c-f8cfbeb2ebca', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-25 20:03:12', '2017-09-25 20:03:12', '1', '@temporary99', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('9006c060-aed8-11e7-b843-f517d2abf12a', '[{\"text\":\"Tina Grey\"}]', null, 'tinag', '$2a$05$IgYTcTVyl2Fo1UNcdamc0OEIJsZktfZDMQ6gXOFciH1b91KePFAXe', '1.5', null, 'Assistant Manager', null, '2IC', 'dd9f1510-9395-11e7-983e-aace4d7d4c3b', '0', 'ef01c410-9395-11e7-97d8-79c618a4276e', '2017-10-11 23:04:41', '2017-10-11 23:04:41', '2', '123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('9a825d30-a43b-11e7-9fb3-52c8f23c58dd', '[{\"text\":\"tony wang\"}]', null, 'tw', '$2a$05$8Ma5w4d2Z.71NZgVRMhxLOB5u7fzeGqd4nRZ1F05rYP2fyhgal5JC', '2', null, 'Store Manager', null, 'STM', '927e35a0-a43b-11e7-8a3c-2aa6e2f49709', '0', '68270f90-9395-11e7-a3f0-daa7744d684d', '2017-09-28 10:55:56', '2017-09-28 10:55:56', '2', '123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('9d11f000-9398-11e7-a45b-71cfa65a584c', '[{\"text\":\"Eve Jacobs\"}]', null, 'EJ', '$2a$05$lqwzkl.KE4s3.wCW0qadKOEI9VTdtH5M8jfLjvu.Zds.Z8zROyuTK', '1', null, 'Casual', null, 'CAS', '610689e0-9398-11e7-99c3-6fa5f86ae7c2', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-07 06:48:53', '2017-09-07 06:48:53', '1', '123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('9d7e7d00-6770-11e7-8064-f38bf4767f4b', '[{\"text\":\"SeekStock Support\"}]', 'support@seekstock.co.nz', 'support@seekstock.co.nz', '$2a$05$84/zh1kHQZEXkr1IjpCnDOhESvzyEzcmqTly.ojRTec6/Xm74pfhq', '5', null, 'SeekStock Support', null, 'SS', 'b51b4bb0-827c-11e7-8a2c-f8cfbeb2ebca', '0', 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e', '2017-07-13 02:11:43', '2017-07-13 06:23:51', '1', 'h3ad0ffice#', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('a8ae0dd0-a1ae-11e7-9cec-fa9a2bcf3d12', '[{\"text\":\"Andrea Maria\"}]', 'drea.vdm@gmail.com', 'drea.vdm@gmail.com', '$2a$05$VzZ8ljlb3SNob.5VV9k15ejH7t/085OH/irRPq3/Qf7f76iSv0KFS', '3', null, 'Regional/Area Manager', null, 'REM', 'b51b4bb0-827c-11e7-8a2c-f8cfbeb2ebca', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-25 05:01:58', '2017-09-25 20:02:49', '0', 'h3ad0ffice#', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '1'), ('aa695f20-9f4d-11e7-b5dc-03da657c9c87', '[{\"text\":\"Jane Yee\"}]', null, 'Jane Y', '$2a$05$trizQ4ukPAgTzp51nqT4m.w9sdTD8Ebioqt9EyXXIzQ9kjwqitY.e', '1.5', null, 'Assistant Manager', null, '2IC', '3f02abc0-9f4c-11e7-b2a7-3c061eec96f8', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-22 04:22:37', '2017-09-22 04:22:37', '1', '123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('b1064660-9398-11e7-9e5f-3733450a79a0', '[{\"text\":\"Sara Warren\"}]', null, 'SW', '$2a$05$6KdWAg7Oo4piSiYqfCcNhOnmpnIW3vHgryyeUbAc.ETigq4PlbpcK', '1', null, 'Part-timer', null, 'PT', '610689e0-9398-11e7-99c3-6fa5f86ae7c2', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-07 06:49:27', '2017-09-07 06:49:27', '1', '123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('b8112e20-9fff-11e7-a4eb-73e48f1bde05', '[{\"text\":\"John Doe\"}]', null, 'john.r', '$2a$05$.QEMZEk.BNlVEHzfXLs12O69w3YReRT.SZQXdRULzKCkPDJ10GPHS', '2', null, 'Store Manager', null, 'STM', '90a26c50-9fff-11e7-a1a0-ba76c3217095', '0', '4c8256f0-9395-11e7-89a6-88568af3c30e', '2017-09-23 01:37:11', '2017-09-23 01:37:11', '1', 'Lxx2bX4', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('c1ea1aa0-bdd8-11e7-b9d8-a2de171ae60b', '[{\"text\":\"YF Wang\"}]', null, 'yf', '$2a$05$cldS/By7jaottHEapvSHYepe0aCvqY9MI1v3YBBSiP31DOnIsmHt6', '2', null, 'Store Manager', null, 'STM', 'b2daf890-bdd8-11e7-8860-a0ad8ae49b5f', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-10-31 01:13:52', '2017-10-31 01:35:53', '2', '111', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('d0cfaa90-a7b1-11e7-aed5-e22771f42665', '[{\"text\":\"Jamie Burns\"}]', null, 'jamieb', '$2a$05$ZhEqsWVBbfv7vyuMao3RS.4TttWWPbXdfTUSMCO/e0wsHsLSJV6c2', '2', null, 'Store Manager', null, 'STM', 'c716f530-a7b1-11e7-bee1-4747d50a4fb3', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-10-02 20:39:41', '2017-10-02 20:46:43', '1', '123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('d1892c40-a4a0-11e7-bcac-2df719bae2be', '[{\"text\":\"Trent Pascoe\"}]', null, 'trent p', '$2a$05$9MZl522L3S3jHN.rehAUM.c4J2rK/e3h.v4q.OUpwKCcg44L3qV3.', '2', null, 'Store Manager', null, 'STM', 'a9ea59c0-a4a0-11e7-af92-836afa4a9f7e', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-28 23:00:27', '2017-09-28 23:00:27', '2', '123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('d437bbd0-9f4d-11e7-a658-1384ca7bc941', '[{\"text\":\"Tammy Love\"}]', null, 'Tammy L', '$2a$05$tla4HhJrq8zWh41jRo1IRuyXHDwLuw7y/OWbhKRGWk3d0MTzZLBtG', '2', null, 'Store Manager', null, 'STM', '3f02abc0-9f4c-11e7-b2a7-3c061eec96f8', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-22 04:23:47', '2017-09-22 04:23:47', '1', '123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('dc050330-a232-11e7-8e3f-ec57ae8d2f97', '[{\"text\":\"James Blake\"}]', null, 'jr', '$2a$05$qxtygzAX.DVNZUTz5NxeW.8zRTnGGUiwVHCmFfY5v2I49tDVS7FHy', '2', null, 'Store Manager', null, 'STM', 'c8f36bb0-a232-11e7-be69-7b31156153b7', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-25 20:48:18', '2017-09-25 20:48:18', '1', '123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('dc1f1620-a43b-11e7-b037-f0c3e400910b', '[{\"text\":\"tt tt\"}]', null, 'tt', '$2a$05$4/pE3BK158YrAQtpwR79a.juTJa0aX6hT9da3A.8yAIQBKfbDcdtu', '2', null, 'Store Manager', null, 'STM', 'd7b2bb50-a43b-11e7-ba03-095ca0c0aa88', '0', '68270f90-9395-11e7-a3f0-daa7744d684d', '2017-09-28 10:57:46', '2017-10-31 01:46:17', '1', '123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('e0ea6610-bdf3-11e7-9b2a-58fb56786d6e', '[{\"text\":\"11 11\"}]', null, '11', '$2a$05$Xwu8Ghcz9VGGqfnnkm/RQ.FvxAApqoxU4mjZB9/lF4/0GbtLnWN0q', '2', null, 'Store Manager', null, 'STM', 'ddc00120-bdf3-11e7-b557-21b41b66b271', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-10-31 04:28:00', '2017-10-31 04:28:00', '2', 'gPRbz98h', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('ef01c410-9395-11e7-97d8-79c618a4276e', '[{\"text\":\"Amy Pearson\"}]', null, 'AP', '$2a$05$IlXXsfJCdF6AJE.mgeOrSe4ffYvJByM5ipprEsQB75uxPTz7NXdSK', '2', null, 'Store Manager', null, 'STM', 'dd9f1510-9395-11e7-983e-aace4d7d4c3b', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-07 06:29:42', '2017-09-07 06:29:42', '1', '123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('ef5293a0-a000-11e7-a0cd-9d131b07cd33', '[{\"text\":\"Megan Crawford\"}]', null, 'megan.c', '$2a$05$mIFA72/JkBRl.70uQvprxel.hAR4pC7h7RRhtPaOEu5ieH0SmKWse', '1.5', null, 'Third in Charge', null, '3IC', '90a26c50-9fff-11e7-a1a0-ba76c3217095', '0', '4c8256f0-9395-11e7-89a6-88568af3c30e', '2017-09-23 01:45:53', '2017-09-23 01:45:53', '1', '123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0'), ('f8e436a0-9397-11e7-8b95-9a063eb9161f', '[{\"text\":\"Charlie Adams\"}]', null, 'CA', '$2a$05$.bWbO9LqlAHL0i0b91T3j.R/zzoHqhFRDpGeXGHW2dv2zg2eVRf.m', '2', null, 'Store Manager', null, 'STM', 'd5cfce40-9397-11e7-b3b4-d217ca389f53', '0', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '2017-09-07 06:44:18', '2017-09-07 06:44:18', '1', '123', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', '0');
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
  `organisationId` varchar(36) DEFAULT NULL,
  `emailStatus` tinyint(1) NOT NULL,
  `storeCode` varchar(24) DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
--  Records of `stores`
-- ----------------------------
BEGIN;
INSERT INTO `stores` VALUES ('02289040-a247-11e7-956c-00adf4781720', '[{\"text\":\"Yfyf\"}]', 'wyf_1212@163.com', null, null, null, null, null, null, null, null, null, '0', 'Auckland', '1111112222222222/n111122222', 'New Zealand', '', '111122222', '111222', '2017-09-25 23:12:32', '2017-10-31 01:38:55', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '{\"text\":\"Yfyf\"}', '1', '$2a$05$hDt8m/kSaC/MeBJMOcru6OEFM1Vn7.l5Gm/9iRNR0UmHeZN.zdXs.', '4d49e6de-3289-11e6-93c3-0242ac110002', '1', 'Aa1111'), ('224288e0-9397-11e7-839d-a0ba6612daa5', '[{\"text\":\"Riccarton\"}]', 'riccarton@brand.com', null, null, null, null, null, null, null, null, null, '0', 'N/A', '/nundefined', 'New Zealand', '', '(09)1234567', '1024', '2017-09-07 06:38:18', '2017-09-07 06:42:00', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '{\"text\":\"RIC\"}', '1', '$2a$05$smg8I6atAGEVbAAHVvEGqunTV0WoL8FpF381gPg/oM50TsHLm.q/y', '4d49e6de-3289-11e6-93c3-0242ac110002', '1', 's33kRIC#'), ('31da0200-9e51-11e7-bbd6-13fc5a2ba2fe', '[{\"text\":\"Nelson\"}]', 'nelson@brand.com', null, null, null, null, null, null, null, null, null, '0', 'Nelson', '1 Nelson Road/nNelson', 'New Zealand', '', '038967934', '7893', '2017-09-20 22:15:22', '2017-09-22 05:07:38', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '{\"text\":\"NEL\"}', '1', '$2a$05$j.dKpqpsg5j415V5CQhCJOXIKLk6Bg4XIjgNteMOT7rkdrux9THS.', '4d49e6de-3289-11e6-93c3-0242ac110002', '1', 's33kNEL#'), ('36d94fe0-a4a5-11e7-8e17-b05d61585cf4', '[{\"text\":\"Wanaka\"}]', 'wanaka@brand.com', null, null, null, null, null, null, null, null, null, '0', 'Wanaka', '/nWanaka Central', 'New Zealand', '', '809472359', '23798', '2017-09-28 23:31:55', '2017-09-28 23:35:49', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '{\"text\":\"WAN\"}', '1', '$2a$05$CzOfWxznDwRLYS3EA.dv6OWA3Bw.CQJ.PMp8XEilmyOdwumkynN2W', '4d49e6de-3289-11e6-93c3-0242ac110002', '1', '@permanent99'), ('3f02abc0-9f4c-11e7-b2a7-3c061eec96f8', '[{\"text\":\"Whangarei\"}]', 'whangarei@brand.com', null, null, null, null, null, null, null, null, null, '0', '123', '123/n123', 'New Zealand', '', '038900239', '1232', '2017-09-22 04:12:28', '2017-09-22 04:32:43', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '{\"text\":\"WGR\"}', '1', '$2a$05$O3DElyCNRiQvq7rR8.6lCe2VMVmLVoRAZg8lhvtUArwejpo8ojpgK', '4d49e6de-3289-11e6-93c3-0242ac110002', '1', 'Im3i5Sk0'), ('4a29b240-a17d-11e7-b0a9-be7a48e21a16', '[{\"text\":\"Takapuna\"}]', 'takapuna@brand.com', null, null, null, null, null, null, null, null, null, '0', 'Auckland', '/nTakapuna', 'New Zealand', '', '097836783', '2039', '2017-09-24 23:08:34', '2017-09-28 22:55:45', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '{\"text\":\"TAK\"}', '1', '$2a$05$GNuYkWvBq31.9nQcrfwgBuc.Bx1DVpcdGiPz7RWqLGd5aybbnY6fa', '4d49e6de-3289-11e6-93c3-0242ac110002', '1', 'EiVxyS4'), ('5f939fe0-a044-11e7-b1fe-cadb7137504f', '[{\"text\":\"Ayebro\"}]', 'ayebro@brand.com', null, null, null, null, null, null, null, null, null, '0', 'Auckland', '/nGrafton', 'New Zealand', '', '098765435', '1020', '2017-09-23 09:48:37', '2017-10-31 01:11:51', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '{\"text\":\"Ab\"}', '0', '$2a$05$c2W7sg9LIaIouY.Nsx9hRO2UukWazuo23ZmLG19WH7kKz9pbM/3dK', '4d49e6de-3289-11e6-93c3-0242ac110002', '1', 'hqeUVwoN'), ('610689e0-9398-11e7-99c3-6fa5f86ae7c2', '[{\"text\":\"Queen Street\"}]', 'queenstreet@brand.com', null, null, null, null, null, null, null, null, null, '0', 'N/A', '/nundefined', 'New Zealand', '', '(09)1234567', '1024', '2017-09-07 06:47:13', '2017-09-07 06:47:13', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '{\"text\":\"QUE\"}', '1', '$2a$05$nMYaMaaWx0N36Jsuai6T3ul6IxpykDch7huy6tRysrkgJxoV82vwe', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', 's33kQUE#'), ('61dc0700-9e88-11e7-a363-7c7793ef9f4b', '[{\"text\":\"Thames\"}]', 'thames@brand.com', null, null, null, null, null, null, null, null, null, '0', '11', '111/nundefined', 'New Zealand', '', '039824390', '1123', '2017-09-21 04:50:25', '2017-09-21 04:50:25', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '{\"text\":\"THA\"}', '1', '$2a$05$R4NqDRnKAFshrUQHUS6CX.AMLO9iSDwWT2PJnuiMpHAkxEdDJG/TW', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', 's33kTHA#'), ('90a26c50-9fff-11e7-a1a0-ba76c3217095', '[{\"text\":\"Cuba Street\"}]', 'cubastreet@brand.com', null, null, null, null, null, null, null, null, null, '0', 'Wellington', '170 Cuba Street/nTe Aro', 'New Zealand', '', '04-1232567', '6011', '2017-09-23 01:36:05', '2017-09-25 05:55:24', '4c8256f0-9395-11e7-89a6-88568af3c30e', '{\"text\":\"CUB\"}', '1', '$2a$05$atUEHsFgtipC90oVSLINV.JkBbxuHrmMj6kh2aTmq6GeL6h7xOb1y', '4d49e6de-3289-11e6-93c3-0242ac110002', '1', '3tQ1fG3X'), ('927e35a0-a43b-11e7-8a3c-2aa6e2f49709', '[{\"text\":\"Test\"}]', 'tony@seesktock.co.nz', null, null, null, null, null, null, null, null, null, '0', 'Auckland', '/neden', 'New Zealand', '', '(09)1234567', '1024', '2017-09-28 10:55:42', '2017-09-28 10:56:13', '68270f90-9395-11e7-a3f0-daa7744d684d', '{\"text\":\"123\"}', '1', '$2a$05$4lN9CYiJTUI8CQ0ipmVRt.REsgIEVTT0q/0LKgXB0b9IAoivik6KS', '4d49e6de-3289-11e6-93c3-0242ac110002', '1', '8gE8h4X'), ('a9ea59c0-a4a0-11e7-af92-836afa4a9f7e', '[{\"text\":\"Dunedin\"}]', 'dunedin@brand.com', null, null, null, null, null, null, null, null, null, '0', 'Dunedin', '/nDunedin South', 'New Zealand', '', '037495724', '9374', '2017-09-28 22:59:21', '2017-09-28 23:01:19', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '{\"text\":\"DUN\"}', '1', '$2a$05$lyMWgWFLMbtOLuZQOfTmyuAkXOczrfVatfV/1NjDboOb6uMncf6dm', '4d49e6de-3289-11e6-93c3-0242ac110002', '1', 'FggyJ9lE'), ('b2daf890-bdd8-11e7-8860-a0ad8ae49b5f', '[{\"text\":\"YF\"}]', 'youfa@seeckstock.co.nz', null, null, null, null, null, null, null, null, null, '0', 'Auckland', 'Queen Street/nCity', 'New Zealand', '', '111111111', '111', '2017-10-31 01:13:26', '2017-10-31 01:34:48', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '{\"text\":\"YF\"}', '1', '$2a$05$wzKUmLnD7y1vRnaP1nMstOXjIXupeQvWTsxmrAn5dXFaxvfbtEapy', '4d49e6de-3289-11e6-93c3-0242ac110002', '1', 'uk2Z4qA'), ('b51b4bb0-827c-11e7-8a2c-f8cfbeb2ebca', '[{\"text\":\"Head Office\"}]', null, null, null, null, null, null, null, null, null, null, '0', 'Head Office', 'Head Office', 'Head Office', 'Head Office', null, null, '2017-08-16 12:16:18', '2017-08-16 12:16:18', 'seekstock', '{\"text\":\"HQ\"}', '1', null, '4d49e6de-3289-11e6-93c3-0242ac110002', '0', null), ('c716f530-a7b1-11e7-bee1-4747d50a4fb3', '[{\"text\":\"island Bay\"}]', 'islandbay@brand.com', null, null, null, null, null, null, null, null, null, '0', 'Wellington', '/nIsland Bay', 'New Zealand', '', '048937281', '6023', '2017-10-02 20:39:24', '2017-10-02 20:45:53', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '{\"text\":\"IB\"}', '1', '$2a$05$NqC2qJ/JbWn8piStmejiYOkg.JJE62Zt97idFVFwoZXRWSAaV7Mne', '4d49e6de-3289-11e6-93c3-0242ac110002', '1', 's33kISL#'), ('c8f36bb0-a232-11e7-be69-7b31156153b7', '[{\"text\":\"Trentham\"}]', 'drea.vdm@gmail.com', null, null, null, null, null, null, null, null, null, '0', 'wellington', '/nTrentham', 'New Zealand', '', '089563458', '7949', '2017-09-25 20:47:46', '2017-09-25 20:50:50', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '{\"text\":\"TRE\"}', '1', '$2a$05$GduSCJQc2val3WC2xAIg9./d/KDDlv4jMF7mfugNd.673De/u5tX6', '4d49e6de-3289-11e6-93c3-0242ac110002', '1', 'vc5Y3VPv'), ('d5cfce40-9397-11e7-b3b4-d217ca389f53', '[{\"text\":\"Sylvia Park\"}]', 'sylviapark@brand.com', null, null, null, null, null, null, null, null, null, '0', 'N/A', '/nN/A', 'New Zealand', '', '(09)1234567', '1024', '2017-09-07 06:43:19', '2017-09-07 06:44:24', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '{\"text\":\"SYL\"}', '1', '$2a$05$Y8HKDYILoDO8wVCMGrrGcuXtFYwuuNFnjVMjnzUSHAWyYBQACl5Ey', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', 's33kSYL#'), ('d7b2bb50-a43b-11e7-ba03-095ca0c0aa88', '[{\"text\":\"Tony\"}]', 'tony@seekstock.co.nz', null, null, null, null, null, null, null, null, null, '0', 'auckland', '/n111', 'New Zealand', '', '12345678987654', '1024', '2017-09-28 10:57:38', '2017-10-18 03:41:57', '68270f90-9395-11e7-a3f0-daa7744d684d', '{\"text\":\"T\"}', '1', '$2a$05$H/A4.LYbHtDnbO03V9bX/OdZNDrnGvfi78yMiL4xYKcZM8aM64Iy2', '4d49e6de-3289-11e6-93c3-0242ac110002', '1', 'asdASD123'), ('dd9f1510-9395-11e7-983e-aace4d7d4c3b', '[{\"text\":\"Lambton Quay\"}]', 'lambtonquay@brand.com', null, null, null, null, null, null, null, null, null, '0', 'N/A', '/nundefined', 'New Zealand', '', '(09)1234567', '1024', '2017-09-07 06:29:13', '2017-09-25 01:59:37', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '{\"text\":\"LMQ\"}', '1', '$2a$05$QRNVqy3WkirXp6xUIVTrGe1tzMuwGLcqxXn9eGJGd1L4S0y1y7J6.', '4d49e6de-3289-11e6-93c3-0242ac110002', '1', 's33kLMQ#'), ('ddc00120-bdf3-11e7-b557-21b41b66b271', '[{\"text\":\"aa\"}]', 'aaa@www.com', null, null, null, null, null, null, null, null, null, '0', '11', 'sf/n11', 'New Zealand', '', '1111111111', '11', '2017-10-31 04:27:55', '2017-10-31 04:27:55', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '{\"text\":\"aaa\"}', '1', '$2a$05$Te7zSPn/.RxbGN7jATcmkuvDF8uo6vRrXghsty4K13n4nAZ43ysUS', '4d49e6de-3289-11e6-93c3-0242ac110002', '0', 'USJUa'), ('f93a8050-a1b6-11e7-bf0b-01a6c61679c2', '[{\"text\":\"Drea\"}]', 'andreamaria009@gmail.com', null, null, null, null, null, null, null, null, null, '0', 'Auckland', '/nMt Eden', 'New Zealand', '', '04893027489', '0223', '2017-09-25 06:01:29', '2017-09-25 20:05:11', 'a8ae0dd0-a1ae-11e7-9cec-fa9a2bcf3d12', '{\"text\":\"DRE\"}', '0', '$2a$05$rHCnASGWz50gKz.Z./L1h.3ri9nqVv/gEkoDmR1Gmyk3NCEygNCMy', '4d49e6de-3289-11e6-93c3-0242ac110002', '1', 'Z8uqgz5K'), ('fd396fb0-a22c-11e7-9e77-d8c73906d7b4', '[{\"text\":\"Andrea\"}]', 'andreamaria009@gmail.com', null, null, null, null, null, null, null, null, null, '0', 'Wellington', '/nIsland Bay', 'New Zealand', '', '04892748134', '6024', '2017-09-25 20:06:16', '2017-09-25 20:24:20', '9d7e7d00-6770-11e7-8064-f38bf4767f4b', '{\"text\":\"DREA\"}', '1', '$2a$05$PQ2BbuvE8sRYc260esX0ouP6yZVkaXWp/.XrjUxzdQks8u4SvVP4K', '4d49e6de-3289-11e6-93c3-0242ac110002', '1', 'h3ad0ffice#');
COMMIT;

-- ----------------------------
--  Table structure for `thanks`
-- ----------------------------
DROP TABLE IF EXISTS `thanks`;
CREATE TABLE `thanks` (
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
