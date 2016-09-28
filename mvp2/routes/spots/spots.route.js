var route = require('express').Router();
var spotService = require('../../lib/spots/spotService');
var service = require('../../lib/application/serviceUtils');

//HIT: PULL BACK AND SPLIT INTO SPOT CATEGORY SPECIFIC SUGGESTS
route.get('/suggest', function (req, res) {
    var term = req.query.term;
    var includeExternalPlaces = req.query.includeExternalPlaces;
    var categories = req.query.categories;
    var items;
    core.searchService.mainSearch(term, getSearchContext(req), categories).then(function (response) {
        items = response;
        if (includeExternalPlaces) return externalPlaceSearch(term, req.profile.location.point);
    }).then(function (externalPlaces) {
        var results = _.map(items, function (spot) {
            var genericNames = [];
            _.forEach(spot.generics, function (generic) {
                _.forEach(generic.names, function (name) {
                    genericNames.push(name);
                })
            });
            var pattern = new RegExp('^' + term, 'i');
            if (spot.locationPoint) {
                var point = {lat: spot.locationPoint[0], lng: spot.locationPoint[0]};
            }
            return {
                item: {
                    id: spot.id,
                    name: _.find(spot.namesText, function (x) {
                        return pattern.test(x);
                    }) || spot.namesText[0],
                    names: _.map(spot.namesText, function (x) {
                        return {text: x}
                    }),
                    category: spot.category,
                    cultures: spot.cultures,
                    rawAddress: spot.rawAddress,
                    location: point ? {isPoint: true, point: {lat: spot.locationPoint[0], lng: spot.locationPoint[1]}} : null,
                    branchName: spot.branchName,
                    image: spot.imageId,
                    generics: genericNames,
                    types: spot.types,
                    source: 'chockr.com'
                },
                resultType: 'standard'
            };
        });
        if (externalPlaces) results = results.concat(externalPlaces);
        res.send(results);
    });
});

//route.post('/suggest/log-hit/:aid', service.handleWith(core.searchService.logHit, {
//    responseType: service.responseTypes.empty,
//    inMappers: [spotService.dehydrateSpot, addSearchContext]
//}));

//HIT: PULL BACK
//route.get('/suggest-generics', function (req, res) {
//    if (req.query.types) {
//        return service.send(res, core.searchService.suggestGenericsBySpotTypes(req.query.types));
//    } else if (req.query.genericId && req.query.subjectId) {
//        return service.send(res, core.searchService.suggestGenericsByParent(req.query.subjectId, req.query.genericId));
//    }
//    throw new RangeError('Either a genericId and subjectId or an array of types should be provided.');
//});

//route.get('/suggest-ingredients', service.handleWith(core.searchService.suggestMainIngredients));

//route.get('/:subjectId/links', service.handleWith(linkService.getLinks));

//HIT: Include logic to work out which facets are needed based on query
//route.get('/:subjectId/facets', service.handleWith(linkService.getGenericSpotsFacets));

route.get('/:id', service.handleWith(spotService.getSpot, {
    outMappers: [function (data) {
        return spotService.hydrateSpot(data, {generics: true})
    }]
}));

function addSearchContext(command, req) {
    command._searchContext = {
        aid: req.query.aid,
        scount: req.query.scount,
        profileId: req.profile.id,
        host: req.headers.host,
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress
    }
}

module.exports = route;