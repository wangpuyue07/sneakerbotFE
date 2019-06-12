var route = require('express').Router();
var service = require('../../lib_new/application/serviceUtils');
//var activityService = require('../../lib/activity/activityService');
//var newsService = require('../../lib/newsService');
var newsService = require('../../lib_new/mid_service/newsService');

route.get('/', service.handleWith(newsService.getNews));

route.get('/suggestion/:id', service.handleWith(newsService.getNews));

// route.get('/', service.handleWith(nnewsService.getNews));

route.put('/mark-as-read', service.handleWith(newsService.markAsRead));

module.exports = route;