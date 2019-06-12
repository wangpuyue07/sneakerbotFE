var route = require('express').Router();
var service = require('../../lib_new/application/serviceUtils');
var voteService = require('../../lib_new/base_service/voteService');


// route.post('/', service.handleWith(voteService.createVote));


// route.delete('/:id', service.handleWith(voteService.deleteVote));

route.put('/', service.handleWith(voteService.doVote));

module.exports = route;
