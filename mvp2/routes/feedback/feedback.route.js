var route = require('express').Router();
var feedbackService = require('../../lib_new/mid_service/feedbackService');
var service = require('../../lib_new/application/serviceUtils');
// var constants = require('../../lib_new/application/constants');

route.post('/', service.handleWith(feedbackService.createFeedback));

route.get('/:id', service.handleWith(feedbackService.getFeedback));//此接口应该没有调用

route.get('/', service.handleWith(feedbackService.listFeedback));//此接口应该没有调用

// route.put('/:id', service.handleWith(feedbackService.updateFeedback));

route.delete('/:id', service.handleWith(feedbackService.deleteFeedback));

module.exports = route;


