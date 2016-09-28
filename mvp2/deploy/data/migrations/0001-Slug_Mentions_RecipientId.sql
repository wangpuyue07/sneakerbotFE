alter table spots add  `slug` varchar(255) NOT NULL DEFAULT '';
alter table activities add `mentions` varchar(3000) DEFAULT NULL;
alter table activities modify column recipientId varchar(255) DEFAULT NULL;