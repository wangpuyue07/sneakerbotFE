var route = require('express').Router();
var service = require('../../lib_new/application/serviceUtils');
var organizationService = require('../../lib_new/base_service/organisationService');
var axios = require('axios');
var algoliasearch = require('algoliasearch');
var config = require('../../config');
var client = algoliasearch(config.algolia.clientId, config.algolia.key);
var index = client.initIndex(process.env.SEARCHINDEX);
var constants = require('../../lib_new/application/constants');
route.post('/product-update', service.handleWith(command => {
    var product = JSON.parse(command.payload);
    organizationService.getOrganisation({deleted: 0}).then(res => {
        var expansion = JSON.parse(res.expansion);
        axios.get('https://' + command.domain_prefix + '.vendhq.com/api/products/' + product.id, {
            headers: {
                Authorization: expansion.token_type + ' ' + expansion.access_token
            }
        }).then(res => {
            var param
            var pinfo = res.data.products[0];
            index.search(pinfo.sku, function searchDone(err, content) {
                var a_pinfo = content.hits[0];
                delete a_pinfo._highlightResult;
                a_pinfo.category=pinfo.type;
                a_pinfo.description=pinfo.base_name;
                a_pinfo.active =pinfo.active ? 1 : 0;
                a_pinfo.tags=pinfo.tags;
                a_pinfo.longDescription=pinfo.description;
                a_pinfo.variations.forEach(item=>{
                    if(item.sku==pinfo.sku){

                        param = {};
                        param[pinfo.variant_option_one_name] = pinfo.variant_option_one_value;
                        param[pinfo.variant_option_two_name] = pinfo.variant_option_two_value;
                        param[pinfo.variant_option_three_name] = pinfo.variant_option_three_value;
                        Object.keys(param).forEach(name => {
                            var lowName = name.toLowerCase();
                            if (lowName.indexOf('colour') > 0 || lowName.indexOf('color') > 0) {
                                param.Colour = param[name];
                            }
                            if (lowName.indexOf('size') > 0) {
                                param.Size = param[name];
                            }
                            if (lowName.indexOf('fit') > 0) {
                                param.Fit = param[name];
                            }
                        });
                            item.image = pinfo.image_large;
                            item.size = param.Size ? param.Size : "N/A";
                            item.colour = param.Colour ? param.Colour : "N/A";
                            item.fit = param.Fit ? param.Fit : "N/A";
                            item.brand = pinfo.brand_name;
                            item.rrp = '$' + pinfo.supply_price;
                    }

                });
                index.addObjects(a_pinfo, function (err, content) {
                    constants.products[a_pinfo.sku] = a_pinfo;
                    });

                });

            });
        });
}));

module.exports = route;