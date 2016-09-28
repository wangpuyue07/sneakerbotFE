-- IMPORT
insert into products (id, parentSku, sku, image, description, deleted, creatorId, createdAt, updatedAt)
select UUID(), sm.parentSku, sm.sku, i.image, sl.description, 0, 'import', '2016-05-16', '2016-05-16' from _stock_master sm
left join `_images` i on sm.parentSku = i.sku
left join _style_list sl on sl.parentSku = sm.parentSku;

-- DEDUPE
select count(sku) as amount, sku from products
group by `sku`
having amount > 1
order by amount desc;

ALTER TABLE products DROP PRIMARY KEY;
alter table products add column id2 int unsigned primary KEY AUTO_INCREMENT;

DELETE a
FROM products as a, products as b
WHERE
          (a.sku = b.sku)
      AND a.id2 < b.id2;

-- RESTORE KEY
ALTER TABLE products MODIFY id CHAR(36) NOT NULL PRIMARY KEY;