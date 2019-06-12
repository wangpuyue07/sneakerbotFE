var route = require('express').Router();
var constants = require('../../lib_new/application/constants');
var organisationService = require('../../lib_new/base_service/organisationService');
var service = require('../../lib_new/application/serviceUtils');


route.post('/', service.handleWith(organisationService.createOrganisation));

route.get('/checkOrganizationDomain/:domain', service.handleWith(organisationService.checkOrganizationName));

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
