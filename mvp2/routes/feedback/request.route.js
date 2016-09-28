var route = require('express').Router();
var requestService = require('../../lib/requestService');
var service = require('../../lib/application/serviceUtils');
var constants = require('../../lib/constants');

route.post('/', service.handleWith(requestService.createRequest));

route.get('/:id', service.handleWith(requestService.getRequest));

route.get('/', service.handleWith(requestService.listRequest));

route.put('/:id', service.handleWith(requestService.updateRequest));

route.delete('/:id', service.handleWith(requestService.deleteRequest));

module.exports = route;


