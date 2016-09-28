var route = require('express').Router();
var service = require('../../lib/application/serviceUtils');
var commentService = require('../../lib/activity/commentService');

route.post('/', service.handleWith(commentService.createComment));

route.put('/:id', service.handleWith(commentService.updateComment));

route.delete('/:id', service.handleWith(commentService.deleteComment));

module.exports = route;
