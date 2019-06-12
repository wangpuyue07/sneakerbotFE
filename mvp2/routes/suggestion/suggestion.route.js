var route = require('express').Router();
var suggestionService = require('../../lib_new/base_service/suggestionService');
var service = require('../../lib_new/application/serviceUtils');
var constants = require('../../lib_new/application/constants');

route.post('/', service.handleWith(suggestionService.createSuggestion));

route.get('/:id', service.handleWith(suggestionService.getSuggestion));

route.get('/', service.handleWith(suggestionService.listSuggestion));

route.put('/:id', service.handleWith(suggestionService.updateSuggestion));

route.delete('/:id', service.handleWith(suggestionService.deleteSuggestion));

module.exports = route;


