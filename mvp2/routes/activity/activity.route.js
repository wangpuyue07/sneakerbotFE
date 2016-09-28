var route = require('express').Router();
var service = require('../../lib/application/serviceUtils');
var activityService = require('../../lib/activity/activityService');
var spotService = require('../../lib/spots/spotService');
var objects = require('../../lib/objects');


route.post('/:id/like', service.handleWith(activityService.likeActivity));

//route.get('/:id', service.handleWith(activityService.getActivity));

route.get('/', service.handleWith(activityService.getLatest));

module.exports = route;