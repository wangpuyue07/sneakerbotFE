var route = require('express').Router();
var service = require('../../lib_new/application/serviceUtils');
var newStaffService = require('../../lib_new/base_service/staffService');


route.get('/', service.handleWith(newStaffService.listStaff));
route.post('/', service.handleWith(newStaffService.createStaff));
route.get('/login', service.handleWith(newStaffService .staffLogin));
route.get('/checkUserId', service.handleWith(newStaffService.checkUserId));
route.put('/:id', service.handleWith(newStaffService.updateStaff));
route.delete('/:id', service.handleWith(newStaffService.deleteStaff));
route.put('/active/:id', service.handleWith(newStaffService.activeStaff));
route.put('/deactive/:id', service.handleWith(newStaffService.deactiveStaff));

module.exports = route;
