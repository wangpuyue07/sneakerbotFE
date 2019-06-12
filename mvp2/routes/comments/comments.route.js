var route = require('express').Router();
var service = require('../../lib_new/application/serviceUtils');
var commentService = require('../../lib_new/base_service/commentService');

route.post('/', service.handleWith(commentService.createComment));

route.delete('/:id', service.handleWith(commentService.deleteComment));

route.get('/', service.handleWith(commentService.getcomments));

module.exports = route;
