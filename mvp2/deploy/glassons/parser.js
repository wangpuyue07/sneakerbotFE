var res = {data: {}};
var fs = require('fs');

res.data = JSON.parse(fs.readFileSync("./source.json", "utf-8"));
var results = [];
var itemgroupid = '';
var cell;
var sort = [];
var itemgroupidCell = {};
res.data.forEach(item => {
    if (itemgroupidCell[item.itemgroupid]) {
        itemgroupidCell[item.itemgroupid].push(item);
    } else {
        itemgroupidCell[item.itemgroupid] = [];
        itemgroupidCell[item.itemgroupid].push(item);
    }
});
Object.keys(itemgroupidCell).forEach(name => {
    sort = sort.concat(itemgroupidCell[name]);
});
sort.forEach(item => {
    if (!isNaN(item.id)) {
        if (itemgroupid != item.itemgroupid) {
            itemgroupid = item.itemgroupid;
            cell && results.push(cell);
            cell = {
                "sku": item.id,
                "category": item.producttype,
                "description": item.title,
                "variations": [],
                "active": 1,
                "longDescription": item.description,
                "agegroup": item.agegroup,
                "gender": item.gender,
                "condition":item.condition,
                "avaliable":item.avaliable
            };
            var variation = {
                "sku": item.id,
                "image": item.imagelink,
                "size": item.size,
                "colour": item.color,
                "fit": "N/A",
                "brand": item.brand,
                "rrp": '$' + item.saleprice
            }
            cell.variations.push(variation);
        } else {
            var variation = {
                "sku": item.id,
                "image": item.imagelink,
                "size": item.size,
                "colour": item.color,
                "fit": "N/A",
                "brand": item.brand,
                "rrp": '$' + item.saleprice
            }
            cell.variations.push(variation);
        }
    }
    ;
});
results.push(cell);
fs.writeFile("./result.json", JSON.stringify(results), function(err) {
 if(err) {
 return console.log(err);
 }
 console.log("The file was saved!");
 });
