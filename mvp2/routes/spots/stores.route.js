var route = require('express').Router();

var service = require('../../lib_new/application/serviceUtils');
var storeService = require('../../lib_new/base_service/storeService');




route.post('/',service.handleWith(storeService.createStore));

//route.post('/sign-up', service.handleWith(storeService.signUp, { responseType : service.responseTypes.full, setCookie: true }));
//
route.get('/:id', service.handleWith(storeService.getStore));
//
//
route.put('/:id', service.handleWith(storeService.updateStore));
//
route.get('/', service.handleWith(storeService.listStores));

route.delete('/:id', service.handleWith(storeService.deleteStore));
route.put('/active/:id', service.handleWith(storeService.activeStore));
route.put('/deactive/:id', service.handleWith(storeService.deactiveStore));

module.exports = route;
