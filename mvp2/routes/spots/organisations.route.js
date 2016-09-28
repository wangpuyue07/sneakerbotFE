var route = require('express').Router();
var constants = require('../../lib/constants');
var organisationService = require('../../lib/spots/organisationService');
var service = require('../../lib/application/serviceUtils');

route.post('/', service.handleWith(organisationService.createOrganisation));

route.get('/me', service.handleWith(organisationService.getOrganisation, {
    inMappers : [function(command){
        command.id = command._userContext.organisationId;
        return command;
    }]
}));

route.put('/:id', service.handleWith(organisationService.updateOrganisation));

route.get('/', service.handleWith(organisationService.listOrganisations));

route.delete('/:id', service.handleWith(organisationService.deleteOrganisation));

module.exports = route;
