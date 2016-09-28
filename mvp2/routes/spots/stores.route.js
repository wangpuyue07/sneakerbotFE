var route = require('express').Router();
var storeService = require('../../lib/spots/storeService');
var service = require('../../lib/application/serviceUtils');

route.post('/', service.handleWith(storeService.createStore, {
    inMappers : [
        function (command) {
            command.organisationId = command._userContext.organisationId;
            return command;
        }
    ]
}));

route.post('/sign-up', service.handleWith(storeService.signUp, { responseType : service.responseTypes.full, setCookie: true }));

route.get('/:id', service.handleWith(storeService.getStore));

route.put('/:id', service.handleWith(storeService.updateStore));

route.get('/', service.handleWith(storeService.listStores));

route.delete('/:id', service.handleWith(storeService.deleteStore));

module.exports = route;
