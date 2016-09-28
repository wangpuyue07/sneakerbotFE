var route = require('express').Router();
var insightService = require('../../lib/insightService');
var service = require('../../lib/application/serviceUtils');
var constants = require('../../lib/constants');

route.get('/top-staff', service.handleWith(insightService.getTopStaff));
route.get('/top-staff-weekly', service.handleWith(insightService.getTopStaffWeekly));
route.get('/top-stores', service.handleWith(insightService.getTopStores));

module.exports = route;
