var service = require('./../application/serviceUtils');
var constants = require('./../constants');
var activityService = require('./../activity/activityService');
var objects = require('../objects');
var async = require('async');
var _ = require('lodash');
var Joi = require('joi');
var Persistence = require('../application/persistence');
var persistence = new Persistence(constants.entityTypes.spot);
var squel = require('squel');

exports.getSpot = function (command) {
    service.validateSync(command, {
        id: Joi.string().guid(),
        apiKey: Joi.string(),
        externalId: Joi.string(),
        email: Joi.string()
    }, { userContextRequired : false });
    return persistence.getItem(command).then(function(spot){
        if(!spot) return null;
        var responseObject = objects[spot.category + '_L'];
        if(!responseObject) throw new Error('Category:' + spot.category + ' does not have a response object.');
        return command._raw  ? spot : responseObject({ obj : spot });
    });
};

exports.getSpotsById = function (ids) {
    var command = service.validateListCommand({});
    command.id = { $in : ids };
    return persistence.listItems(command);
};

exports.hydrateSpot = function (spot) {
    if(!spot) return;
    spot.cultures = lookup.hydrateSync(constants.entityTypes.culture, spot.cultures);
    spot.types = lookup.hydrateSync(constants.entityTypes.spotType, spot.types);
    _.forEach(spot.names, function (name) {
        name.culture = lookup.hydrateSync(constants.entityTypes.culture, name.culture);
    });
    return spot;
};

exports.dehydrateSpot = function (spot) {
    lookup.dehydrate('id', 'cultures', spot);
    lookup.dehydrate('id', 'types', spot);
    lookup.dehydrate('id', 'origins', spot);
    lookup.dehydrate('id', 'generics', spot);
    _.forEach(spot.names, function (name) {
        lookup.dehydrate('id', 'culture', name);
    });
    return spot;
};

exports.locationValidation = locationValidation = Joi.object().keys({
    id: Joi.string().required(),
    point: Joi.object().keys({
        lat: Joi.number().required(),
        lng: Joi.number().required()
    }).required(),
    name: Joi.string().required(),
    longName: Joi.string()
});

exports.locationDetailValidation =  locationDetailValidation = Joi.object().keys({
    addressType: Joi.string(),
    neighbourhood: Joi.string(),
    city: Joi.string(),
    subregion: Joi.string(),
    region: Joi.string(),
    country: Joi.string()
});

exports.standardCreateSchema = standardCreateSchema = function(){
    return service.createRules({
        names: namesValidation.min(1).required(),
        imageId: Joi.string(),
        cultureIds: Joi.array().items(Joi.number().integer().required()),
        originIds: Joi.array().items(Joi.number().integer().required()),
        isGeneric: Joi.boolean(),
        isMainGeneric: Joi.boolean(),
        externalId: Joi.string(),
        genericIDs: Joi.array().items(Joi.string().guid()),
        exclusiveToSpotIds: Joi.array().items(Joi.string().guid()),
        status: Joi.allow(Object.keys(constants.publishStatuses))
    });
};

exports.standardUpdateSchema =  standardUpdateSchema = function(){
    return service.createRules({
        id: Joi.string().regex(constants.regex.uuid).required(),
        names: namesValidation,
        text: Joi.string().max(100),
        imageId: Joi.string(),
        status: Joi.allow(Object.keys(constants.publishStatuses))
    });
};

exports.namesValidation = namesValidation = Joi.array().items(Joi.object().keys({
    text: Joi.string().required(),
    culture: Joi.string()
}).required());


//Full text search across all or any categories
exports.searchSpots = function (term, context, categories) {
    var filters = [{
        "fquery": {
            "query": {
                "match": {
                    "namesText": {
                        "query": term,
                        "fuzziness": 1,
                        "prefix_length": 3,
                        "max_expansions": 10
                    }
                }
            },
            "_cache": true
        }
    }];
    if (categories) filters.push({"terms": {"category": categories.split(',')}});
    var query = {
        "constant_score": {
            "filter": {
                "and": {
                    "filters": filters
                }
            }
        }
    };
    return client().search({
        index: getIndex(constants.searchIndexes.mainSearch),
        body: {
            "query": query
        }
    }).then(function (res) {
        var hits = res.hits.hits;
        if (context) {
            if (hits.length < 1 && term.length > 2) {
                indexMiss({aid: context.aid, pid: context.pid, host: context.host, ip: context.ip, term: term, missTime: new Date()});
            } else {
                logSuggest(term, context)
            }
        }
        return _.map(hits, function (x) {
            var spot = x._source;
            spotService.hydrateSpot(spot);
            return spot;
        });
    })
};

exports.mapSpot = mapSpot = function (spot) {
    var mappedSpot = {
        "id": spot.id,
        "category": spot.category,
        "types": spot.types,
        "cultures": spot.cultures,
        "generics": spot.generics,
        "namesText": _.pluck(spot.names, 'text'),
        "isGeneric": spot.isGeneric,
        "rawAddress" : spot.rawAddress,
        "branchName" : spot.branchName,
        "isMainGeneric": spot.isMainGeneric,
        "image": spot.imageId,
        "status": spot.status,
        "created": spot.created,
        "updated": spot.updated
    };
    if (spot.location && spot.location.point) mappedSpot.locationPoint = [spot.location.point.lat, spot.location.point.lng];
    return mappedSpot;
};

exports.indexSpot = function (spot) {
    return client().index({
        index: getIndex(constants.searchIndexes.mainSearch),
        type: constants.entityTypes.spot,
        id: spot.id,
        body: mapSpot(spot)
    });
};


exports.suggestMainIngredients = function () {
    var body =
    {
        "filter": {
            "bool": {
                "must": [
                    {"term": {"isMainGeneric": true}},
                    {"terms": {"types": ['55b807d0-b1d2-11e4-9cab-9fc39f5deef0']}}
                ]
            }
        }
    };
    return client().search({
        index: getIndex(constants.searchIndexes.mainSearch),
        body: body
    }).then(function (res) {
        if (!res.hits || res.hits.total < 1) return [];
        return _.map(res.hits.hits, function (x) {
            return x._source;
        });
    });
};

exports.suggestGenericsBySpotTypes = function (typeIds) {
    if (!util.isArray(typeIds)) typeIds = [typeIds];
    var body =
    {
        "filter": {
            "bool": {
                "must": [
                    {"term": {"isMainGeneric": true}},
                    {"terms": {"types": typeIds}}
                ]
            }
        }
    };
    return client().search({
        index: getIndex(constants.searchIndexes.mainSearch),
        body: body,
        size: 30
    }).then(function (res) {
        if (!res.hits || res.hits.total < 1) return [];
        return _.map(res.hits.hits, function (x) {
            return x._source;
        });
    });
};