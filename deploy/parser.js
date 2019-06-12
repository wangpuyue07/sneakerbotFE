var res = {data: {}};
var fs = require('fs');

res.data = JSON.parse(fs.readFileSync("./source.json", "utf-8"));
var results = [];

res.data.forEach(item=>{
    item.image=[item.variations[0].image];
    item.fit='N/A';
    item.soleType='N/A';
    item.category='N/A';
    item.brand='SeekStock';
    item.season='SS1718';
    item.variations.forEach(va=>{
        va.barCode=va.sku;
        delete va.fit;
        delete va.brand;
        delete va.image;
    })
    results.push(item);
});

fs.writeFile("./result.json", JSON.stringify(results), function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The file was saved!");
});
