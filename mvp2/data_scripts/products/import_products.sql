-- IN WEBSTORM FIND AND REPLACE RAW DATA (WITH DUPLICATE sku column)
([0-9])[SMLX]*",
([0-9])-[A-Z0-9\.]*",
([0-9])-[SMLX]*",
([0-9])-[A-Z0-9]*",

$1",

-- TRIM ALL DESCRIPTIONS TO REMOVE SIZING ELSE GROUP CONCAT WILL NOT WORK


-- THEN

insert into products (id, parentSku, sku, image, description, deleted, creatorId, createdAt, updatedAt)
select UUID(), pd.parentSku, pd.sku, i.image, pd.description, 0, 'import', '2016-05-16', '2016-05-16' from products_drea pd
left join `_images` i on pd.parentSku = i.sku

