var route = require('express').Router();
var service = require('../../lib/application/serviceUtils');
var staffService = require('../../lib/spots/staffService');
var spotService = require('../../lib/spots/spotService');

route.get('/', service.handleWith(staffService.listStaff));
route.post('/', service.handleWith(staffService.createStaff));
route.put('/:id', service.handleWith(staffService.updateStaff));
route.delete('/:id', service.handleWith(staffService.deleteStaff));

module.exports = route;
