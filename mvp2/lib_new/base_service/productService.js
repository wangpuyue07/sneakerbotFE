var Joi = require('joi');
var Persistence = require('../application/persistence');
var genUtils = require('../application/genUtils');
var constants = require('../application/constants');
var service = require('../application/serviceUtils');
var persistence = new Persistence(constants.entityTypes.products);
var sql = require('../application/providers/sqlClient');
var util = require('util');
var _ = require('lodash');
var axios = require('axios');
var config = require('../../config');
var qs = require('qs');
var algoliasearch = require('algoliasearch');
var client = algoliasearch(config.algolia.clientId, config.algolia.key);
var index = client.initIndex(process.env.SEARCHINDEX);
var organizationService = require('./organisationService');


exports.createProduct = function (command) {
    var rules = {
        sku: Joi.string().required(),
    };
    service.validateSync(command, rules);
    command.cid = genUtils.createTimeUuid();
    return persistence.createItem({cid: genUtils.createTimeUuid(), sku: command.sku});
};







exports.getProduct = function (command) {
    var rules = {
        sku: Joi.string()
    };
    command = service.validateSync(command, rules);
    return exports.getProductBySku(command.sku);
};

exports.synVendProducts = function (command) {
    var command = command;
    return axios.get('https://' + command.domain_prefix + '.vendhq.com/api/products/', {
        headers: {
            Authorization: command.token_type + ' ' + command.access_token
        }
    }).then(res => {
        var results = [];
        var handle = '';
        var cell;
        var sort = [];
        var handleCell={}
        var hits = [];
        var newProducts;
        var newHits;
        var newResults;
        res.data.products.forEach(item=>{
            if(handleCell[item.handle]){
                handleCell[item.handle].push(item);
            }else{
                handleCell[item.handle]=[];
                handleCell[item.handle].push(item);
            }
        });
        Object.keys(handleCell).forEach(name=>{
            sort = sort.concat(handleCell[name]);
        });
        sort.forEach(item => {
            if (!isNaN(item.sku)) {
                if (handle != item.handle) {
                    handle = item.handle;
                    cell && results.push(cell);
                    cell = {
                        "sku": item.sku,
                        "category": item.type,
                        "description": item.base_name,
                        "variations": [],
                        "active": item.active ? 1 : 0,
                        "tags": item.tags,
                        "longDescription": item.description,
                    };
                    var param = {};
                    param[item.variant_option_one_name] = item.variant_option_one_value;
                    param[item.variant_option_two_name] = item.variant_option_two_value;
                    param[item.variant_option_three_name] = item.variant_option_three_value;
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
                    var variation = {
                        "sku": item.sku,
                        "image": item.image_large,
                        "size": param.Size ? param.Size : "N/A",
                        "colour": param.Colour ? param.Colour : "N/A",
                        "fit": param.Fit ? param.Fit : "N/A",
                        "brand": item.brand_name,
                        "rrp": '$' + item.supply_price
                    }
                    cell.variations.push(variation);
                } else {
                    var param = {};
                    param[item.variant_option_one_name] = item.variant_option_one_value;
                    param[item.variant_option_two_name] = item.variant_option_two_value;
                    param[item.variant_option_three_name] = item.variant_option_three_value;
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
                    var variation = {
                        "sku": item.sku,
                        "image": item.image_large,
                        "size": param.Size ? param.Size : "N/A",
                        "colour": param.Colour ? param.Colour : "N/A",
                        "fit": param.Fit ? param.Fit : "N/A",
                        "brand": item.brand_name,
                        "rrp": '$' + item.supply_price
                    }
                    cell.variations.push(variation);
                }
            }
            ;
        });
        results.push(cell);
        return new Promise((resolve, reject) => {
            index.search('', {
                hitsPerPage: 2000
            }, function searchDone(err, content) {
                hits = content.hits;
                newProducts = [];
                newHits = hits.concat([]);
                newResults = results.concat([]);
                newHits.forEach((agoliaProd) => {
                    var TagoliaProd = _.cloneDeep(agoliaProd);
                    TagoliaProd.active = 0;
                    newResults.forEach(vendProd => {
                        var TvendProd = _.cloneDeep(vendProd);
                        if (TvendProd.sku == TagoliaProd.sku) {
                            TvendProd.objectID = TagoliaProd.objectID;
                            TagoliaProd = TvendProd;
                            vendProd.delete = 1;
                        }
                    });
                    newProducts.push(TagoliaProd);
                });
                newResults.forEach(vendProd => { //vend
                    if (vendProd.delete != 1) {
                        var TvendProd = _.cloneDeep(vendProd);
                        newProducts.push(TvendProd);
                    }
                });
                //清除之前的webhook保证没有冗余
                axios.get('https://' + command.domain_prefix + '.vendhq.com/api/webhooks', {
                    headers: {
                        Authorization: command.token_type + ' ' + command.access_token
                    }
                }).then((res) => {
                    res.data.forEach(item => {
                        axios.delete('https://' + command.domain_prefix + '.vendhq.com/api/webhooks/' + item.id, {
                            headers: {
                                Authorization: command.token_type + ' ' + command.access_token
                            }
                        })
                    });
                    axios.post('https://' + command.domain_prefix + '.vendhq.com/api/webhooks?data=' + JSON.stringify({
                            type: "product.update",
                            url: config.host + "/api/vend/product-update",
                            active: true
                        }), {}, {
                        headers: {
                            'Authorization': command.token_type + ' ' + command.access_token,
                        }
                    })
                        .then((res) => {
                            var vend = res.data;
                            organizationService.getOrganisation({deleted: 0}).then(res => {
                                organizationService.updateOrganisation({
                                    cid: res.cid,
                                    productUrlPrefix: '',
                                    expansion: JSON.stringify({
                                        type: 'vend',
                                        id: vend.id,
                                        retailer_id: vend.retailer_id,
                                        user_id: vend.user_id,
                                        domain_prefix:command.domain_prefix,
                                        access_token:command.access_token,
                                        refresh_token: command.refresh_token,
                                        token_type:command.token_type
                                    })
                                });
                                index.addObjects(newProducts, function (err, content) {
                                    axios.get('https://' + command.domain_prefix + '.vendhq.com/api/webhooks', {
                                        headers: {
                                            Authorization: command.token_type + ' ' + command.access_token
                                        }
                                    }).then((res) => {
                                        resolve({info: res.data});
                                    });

                                });
                            });
                        })
                        .catch(err => {
                            console.log(err);
                        });
                });


            });
        });
         // axios.get('https://' + command.domain_prefix + '.vendhq.com/api/webhooks', {
         // headers: {
         // Authorization: command.token_type + ' ' + command.access_token
         // }
         // }).then((res) => {
         // console.log(res);
         // });
    }).catch(err => {
        return {err: err.response.data.error_description}
    })
};

exports.listProducts = function (command) {
    return new Promise((resolve) => {
        var result = [];
        command.ids.forEach((item) => {
            if (constants.products[item]) {
                result.push(constants.products[item]);
                if (result.length == command.ids.length) {
                    resolve(result)
                }
            } else {
                index.search(item, function searchDone(err, content) {
                    result.push(content.hits[0]);
                    constants.products[item] = content.hits[0];
                    if (result.length == command.ids.length) {
                        resolve(result)
                    }
                });
            }

        })
    });


};


exports.getProductById = function (ids) {
    return exports.listProducts({ids: ids});
};


/*
 update fbDate
 */
exports.updateFBDate = function (sku) {
    return sql.db.query(util.format("update newproducts set fbupdateAt = now() where sku = '%s'", sku)).spread(function (results, metadata) {
        // Results 会是一个空数组和一个包含受影响行数的metadata 元数据对象
        return results;
    });
};
/*
 de-active
 */
exports.de_active = function (sku) {
    return sql.db.query(util.format("update newproducts set active = 0 where sku = '%s'", sku)).spread(function (results, metadata) {
        // Results 会是一个空数组和一个包含受影响行数的metadata 元数据对象
        return results;
    });
};
/*
 get product by sku
 */
exports.getProductBySku = function (sku) {
    return new Promise((resolve) => {
        if (sku == null)
            resolve({});
        if (constants.products[sku]) {
            resolve(constants.products[sku]);
        } else {
            index.search(sku, function searchDone(err, content) {
                constants.products[sku] = content.hits[0];
                resolve(content.hits[0]);
            });
        }
    });
};
exports.getMyProductBySku = function (sku) {
    return new Promise((resolve) => {
        if (sku == null)
            resolve({});
        if (constants.localProducts[sku]) {
            resolve(constants.localProducts[sku]);
        } else {
            persistence.getItem({sku: sku}).then(res => {
                constants.localProducts[sku] = res;
                resolve(res);
            });
        }
    });

};