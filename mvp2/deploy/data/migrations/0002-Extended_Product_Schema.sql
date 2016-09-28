DROP TABLE IF EXISTS `comments`;
DROP TABLE IF EXISTS `destinations`;
DROP TABLE IF EXISTS `link_type_pairs`;
DROP TABLE IF EXISTS `link_types`;
DROP TABLE IF EXISTS `links`;
DROP TABLE IF EXISTS `spot_type_groups`;
DROP TABLE IF EXISTS `spot_types`;
DROP TABLE IF EXISTS `staff_activity_reads`;
DROP TABLE IF EXISTS `wanteds`;

ALTER TABLE `organisations` ADD `productUrlPrefix` varchar(500) NOT NULL;
ALTER TABLE `organisations` ADD `productSearchIndex` varchar(200) NOT NULL;
ALTER TABLE `organisations` ADD `feature_feedback` tinyint(1) DEFAULT '1';
ALTER TABLE `organisations` ADD `feature_request` tinyint(1) DEFAULT '0';

UPDATE organisations SET productUrlPrefix='https://www.iloveugly.co.nz/media/catalog/product/', productSearchIndex='ilu_products', feature_request='1' WHERE
id = '68843e60-1e46-11e6-8548-0c44bcfedd28';

UPDATE organisations SET productUrlPrefix='https://www.iloveugly.co.nz/media/catalog/product/', productSearchIndex='ilu_products', feature_request='1' WHERE
id = 'e33882d0-1ffc-11e6-a4b3-0f84f7b1616c';

ALTER TABLE `products` ADD      `size` varchar(300) DEFAULT NULL;
ALTER TABLE `products` ADD     `colour` varchar(300) DEFAULT NULL;
ALTER TABLE `products` ADD    `fit` varchar(300) DEFAULT NULL;
ALTER TABLE `products` ADD    `category` varchar(300) DEFAULT NULL;
ALTER TABLE `products` ADD     `brand` varchar(300) DEFAULT NULL;
ALTER TABLE `products` ADD     `rrp` decimal(10,2) DEFAULT NULL;


DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `requests` (
  `id` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `sku` varchar(255) NOT NULL,
  `staffId` char(36) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `expiry` datetime NOT NULL,
  `colour` varchar(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `productType` varchar(255) NOT NULL,
  `description` varchar(500) NOT NULL,
  `customerName` varchar(200) DEFAULT NULL,
  `customerPhone` varchar(50) DEFAULT NULL,
  `deleted` tinyint(1) NOT NULL DEFAULT '0',
  `creatorId` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
