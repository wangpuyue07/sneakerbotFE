var route = require('express').Router();
var service = require('../../lib/application/serviceUtils');
var personService = require('../../lib/spots/personService');
var spotService = require('../../lib/spots/spotService');

route.put('/:id', service.handleWith(personService.updatePerson, { inMappers : [spotService.dehydrateSpot] }));

module.exports = route;
