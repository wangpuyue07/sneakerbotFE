var route = require('express').Router();
var service = require('../../lib/application/serviceUtils');
var activityService = require('../../lib/activity/activityService');
var newsService = require('../../lib/newsService');

route.get('/', service.handleWith(newsService.getNews));

route.put('/:id/like', service.handleWith(activityService.likeActivity));

route.put('/mark-as-read', service.handleWith(newsService.markAsRead));

module.exports = route;