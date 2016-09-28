DROP TABLE IF EXISTS cultures;
DROP TABLE IF EXISTS link_type_pairs;
DROP TABLE IF EXISTS `spot_type_groups`;
DROP TABLE IF EXISTS `staff_activity_reads`;
DROP TABLE IF EXISTS `activities_logs`;
DROP TABLE IF EXISTS `cultures`;
DROP TABLE IF EXISTS `comments`;
DROP TABLE IF EXISTS `restocks`;

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `notifications` (
`id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
`recipientId` varchar(255) NOT NULL,
`activityId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
`notificationType` varchar(255) NOT NULL,
`read` tinyint(1) NOT NULL DEFAULT '0',
`deleted` tinyint(1) NOT NULL DEFAULT '0',
`creatorId` varchar(255) DEFAULT NULL,
`createdAt` datetime NOT NULL,
`updatedAt` datetime NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

ALTER TABLE organisations MODIFY `productUrlPrefix` varchar(500) NOT NULL;
ALTER TABLE organisations MODIFY `productSearchIndex` varchar(200) NOT NULL;
ALTER TABLE organisations MODIFY  `feature_feedback` tinyint(1) DEFAULT '1';
ALTER TABLE organisations MODIFY  `feature_request` tinyint(1) DEFAULT '0';

ALTER TABLE products MODIFY    `size` varchar(300) DEFAULT NULL;
ALTER TABLE products MODIFY  `colour` varchar(300) DEFAULT NULL;
ALTER TABLE products MODIFY   `fit` varchar(300) DEFAULT NULL;
ALTER TABLE products MODIFY  `category` varchar(300) DEFAULT NULL;
ALTER TABLE products MODIFY  `brand` varchar(300) DEFAULT NULL;
ALTER TABLE products MODIFY  `rrp` decimal(10,2) DEFAULT NULL;