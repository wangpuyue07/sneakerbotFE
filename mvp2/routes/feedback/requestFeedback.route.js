var route = require('express').Router();
var requestFeedbackService = require('../../lib/requestFeedbackService');
var service = require('../../lib/application/serviceUtils');
var constants = require('../../lib/constants');

route.post('/', service.handleWith(requestFeedbackService.createRequestFeedback));

route.get('/:id', service.handleWith(requestFeedbackService.getRequestFeedback));

route.get('/', service.handleWith(requestFeedbackService.listRequestFeedback));

route.put('/:id', service.handleWith(requestFeedbackService.updateRequestFeedback));

route.delete('/:id', service.handleWith(requestFeedbackService.deleteRequestFeedback));

module.exports = route;


