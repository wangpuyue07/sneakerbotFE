var route = require('express').Router();
var feedbackService = require('../../lib/feedbackService');
var service = require('../../lib/application/serviceUtils');
var constants = require('../../lib/constants');

route.post('/', service.handleWith(feedbackService.createFeedback));

route.get('/:id', service.handleWith(feedbackService.getFeedback));

route.get('/', service.handleWith(feedbackService.listFeedback));

route.put('/:id', service.handleWith(feedbackService.updateFeedback));

route.delete('/:id', service.handleWith(feedbackService.deleteFeedback));

module.exports = route;


