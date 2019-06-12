var route = require('express').Router();
var productService = require('../../lib_new/base_service/productService');
var service = require('../../lib_new/application/serviceUtils');
var constants = require('../../lib_new/application/constants');


route.get('/vend/synProduct', service.handleWith(productService.synVendProducts));

route.get('/:sku', service.handleWith(productService.getProduct));



module.exports = route;
