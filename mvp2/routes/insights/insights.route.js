var route = require('express').Router();
var insightService = require('../../lib_new/mid_service/insightService');
var service = require('../../lib_new/application/serviceUtils');
var constants = require('../../lib_new/application/constants');

route.get('/top-staff', service.handleWith(insightService.getTopStaff));
// route.get('/top-staff-weekly', service.handleWith(insightService.getTopStaffWeekly));
route.get('/top-stores', service.handleWith(insightService.getTopStores));

module.exports = route;
