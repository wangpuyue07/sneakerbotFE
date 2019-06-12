/**
 * Created by Anthony on 2017/1/17.
 */
var route = require('express').Router();
var dashboardService = require('../../lib_new/mid_service/dashboardService');
var service = require('../../lib_new/application/serviceUtils');
var constants = require('../../lib_new/application/constants');

route.get('/HR', service.handleWith(dashboardService.HR));
route.get('/management', service.handleWith(dashboardService.management));
route.get('/production', service.handleWith(dashboardService.production));
route.get('/search', service.handleWith(dashboardService.productionSearch));
// /api/dashboard/search?type='style'&topic='fabric'

module.exports = route;
