/**
 * Created by Anthony on 2016/12/16.
 */
var route = require('express').Router();
var newService = require('../../lib_new/application/serviceUtils');
var newPrincipalService = require('../../lib_new/base_service/newPrincipalService');

route.post('/', newService.handleWith(newPrincipalService.createPrincipal));
//route.post('/:id', newService.handleWith(principalService.updatePrincipal));
route.put('/:email', newService.handleWith(newPrincipalService.updatePrincipal));
route.put('/deactive/:email', newService.handleWith(newPrincipalService.deactivePrincipal));
route.put('/active/:email', newService.handleWith(newPrincipalService.activePrincipal));
route.delete('/:email', newService.handleWith(newPrincipalService.deletePrincipal));
route.get('/active', newService.handleWith(newPrincipalService.doActive));

module.exports = route;