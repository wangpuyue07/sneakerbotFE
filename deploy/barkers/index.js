var  algoliasearch = require('algoliasearch');
var axios = require('axios');
var client = algoliasearch('M96FY1SE39', '632024b3ded8e1171aa6385e7d11601c');
var index = client.initIndex('barkers_index_copy');
var fs = require('fs');
var browser = index.browseAll();
var old = [];
var nnn;
var html = require('html-escaper');
var qwe = [];
var asd = [];
var result=[];
axios.get('http://adrianwithaw.com/barkers.php').then(res=>{
    nnn=res.data;

});
browser.on('result', function onResult(content) {
    old  = old.concat(content.hits);
});
browser.on('end', function onEnd() {
    setTimeout(function () {
        old.forEach(item=>{
            qwe.push(item);
        });
        nnn.forEach(item=>{
            asd.push(item);
        });
        asd.forEach(as=>{
            as.category = html.unescape(as.category).split(' ').join('_').split('>').join(' ').split('_ _').join(' ').split('_&_').join('&').split('_-_').join('-');
            as.productType ='N/A';
            result.push(as);
        });
        qwe.forEach(qw=>{
            var flag=true;
            asd.forEach(as=>{
                if(as.sku==qw.sku)
                {
                    flag=false;
                }
            });
            if(flag){
                qw.updatedAt = new Date();
                result.push(qw);
            }
        });
        asd.forEach(as=>{
            var flag=true;
            result.forEach(re=>{
                if(re.sku==as.sku)
                {
                    flag=false;
                }
            });
            if(flag){
                result.push(as);
            }
        });
        result.forEach(res=>{
            res.productType='N/A';
            var img = [res.image[0]];
            /*res.image.forEach((item,i)=>{
                if(i%4==3){
                    img.push(item);
                }
            });
            if(img.length>5){
                console.log(res.image.length,img.length);
            }*/
            res.image = img;
            res.season='N/A';
            res.brand='Barkers';
            res.variations.forEach(va=>{
                if(va.salePrice=='N/A'){
                    va.salePrice = va.rrp;
                }
                va.barCode=res.sku+va.colour;
                va.sku = res.sku+va.colour;
            });
        });
        console.log(result.length);
         fs.writeFile("./re.json", JSON.stringify(result), () => {});
    },2000);


});
browser.on('error', function onError(err) {
    console.log(err);
});
