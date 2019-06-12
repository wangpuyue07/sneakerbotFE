var route = require('express').Router();
var requestFeedbackService = require('../../lib_new/base_service/requestFeedbackService');
var service = require('../../lib_new/application/serviceUtils');

route.post('/', service.handleWith(requestFeedbackService.createRequestFeedback));

route.get('/:id', service.handleWith(requestFeedbackService.getRequestFeedback));

//route.get('/', service.handleWith(requestFeedbackService.listRequestFeedback));

//route.put('/:id', service.handleWith(requestFeedbackService.updateRequestFeedback));

route.delete('/:id', service.handleWith(requestFeedbackService.deleteRequestFeedback));

module.exports = route;


