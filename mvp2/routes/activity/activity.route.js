var route = require('express').Router();
var service = require('../../lib_new/application/serviceUtils');
var activityService = require('../../lib_new/mid_service/activityService');
var objects = require('../../lib_new/objects');


route.post('/:id/like', service.handleWith(activityService.likeActivity));

route.get('/:id', service.handleWith(activityService.getActivity));

route.get('/', service.handleWith(activityService.getLatest));

module.exports = route;