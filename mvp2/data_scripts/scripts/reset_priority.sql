DROP TABLE IF EXISTS ordering_table;
CREATE TEMPORARY TABLE IF NOT EXISTS ordering_table AS (SELECT id, priority FROM [table_name] where [discriminator] = 2);
ALTER TABLE ordering_table MODIFY COLUMN id INT(11) NOT NULL;
ALTER TABLE ordering_table MODIFY COLUMN priority INT(11) NULL;
update ordering_table set priority = NULL;
ALTER TABLE ordering_table MODIFY COLUMN priority INT(11) NOT NULL auto_increment PRIMARY KEY;
UPDATE [table_name] sp set priority = (select priority from ordering_table where id = sp.id) where [discriminator] = 2;