var route = require('express').Router();
var productService = require('../../lib/productService');
var service = require('../../lib/application/serviceUtils');
var constants = require('../../lib/constants');

route.get('/random-product', service.handleWith(productService.getRandomProduct));

route.get('/:sku', service.handleWith(productService.getProduct));

module.exports = route;
