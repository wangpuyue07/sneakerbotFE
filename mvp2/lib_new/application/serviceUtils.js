var cassandra = require('cassandra-driver');
var constants = require('constants');
var async = require('async');
var util = require('util');
var Joi = require('joi');
var _ = require('lodash');
// var spotService = require('../spots/spotService');
exports.createTimeUuid = function () {
    return cassandra.types.timeuuid();
};

exports.validateSync = function (command, validationRules, options) {

    options = options || {abortEarly: false, convert: true, stripUnknown: false, userContextRequired: true};
    if (!validationRules) throw new Error('an object is required for validationRules');
    validationRules._raw = Joi.boolean();

    validationRules._userContext = Joi.object({
        id: Joi.string().guid().required(),
        names: Joi.array(),
        email: Joi.string(),
        staff: Joi.array(),
        barCode: Joi.string(),
        expansion: Joi.string(),
        stores: Joi.array(),
        image: Joi.string(),
        role: Joi.string(),
        createdAt: Joi.date(),
        updatedAt: Joi.date(),
        staffId: Joi.string().guid(),
        organisation: Joi.object()
    });
    if (options.userContextRequired) {
        validationRules._userContext.required();
    }
    delete options.userContextRequired;
    var result = Joi.validate(command, validationRules, options);
    if (result.error) {
        //throw new exports.MultiValidationError(result.error);
    }
    (function removeAllKeysFromCommand() {
        for (var key1 in command) {
            if (!command.hasOwnProperty(key1)) continue;
            //If contextual parameter
            if (key1.indexOf('_') === 0) continue;
            delete command[key1];
        }
    }());
    (function applyValidatedKeys() {
        for (var key2 in result.value) {
            if (!result.value.hasOwnProperty(key2)) continue;
            command[key2] = result.value[key2];
        }
    }());
    return command;
};

/**
 *
 * @param handler Service method used to handle the command.
 * @param [options] {Object}
 * @param options.inMappers {Array} A list of functions which perform operations on the command
 * immediately before handling it.
 * @param options.outMappers {Array} A list of function to map the response with.
 * @param options.customParams {Object} An object containing key value pairs for any additional parameters.
 * @param options.responseType {String} Response type if different from standard responses.
 * @param options.setCookie {bool} If the underlying service returns an accessToken then set the cookie.
 * @returns {Function}
 */
exports.handleWith = function (handler, options) {
    options = options || {};
    options.inMappers = options.inMappers || [];
    options.outMappers = options.outMappers || [];
    options.customParams = options.customParams || {};
    return function (req, res) {
        if (!handler) throw new Error('No handler has been specified for this route.');
        if (!res) throw new Error('Response object is required.');
        if (!req) throw new Error('Request object is required.');
        if (!options.responseType) options.responseType = responseMap[req.method] || exports.responseTypes.empty;

        var command = paramMergeMap[req.method](req);
        command._userContext = req.profile;
        command = _.merge(command, options.customParams); // options.customParams 没懂

        options.inMappers.forEach(function (mapper) {
            command = mapper(command, req);
        });
        return new Promise(function (resolve) {
            resolve(handler(command));
        }).then(function (data) {
            if (options.setCookie && data.accessToken) {
                exports.setCookie(res, data.accessToken); // cookie
            }
            options.outMappers.forEach(function (mapper) {
                if (Array.isArray(data)) {
                    data = data.map(function (item) {
                        return mapper(item);
                    })
                }
                data = mapper(data);
            });

            return new APIResponse(res, options.responseType)(data)
        }).catch(function (err) {
            return exports.sendError(err, res);
        })
    }
};

exports.pagingValidationRules = function () {
    return exports.createRules({
        page: Joi.number().integer().default(0),
        limit: Joi.number().integer().default(50),
        orderBy: Joi.string().default('createdAt'),
        direction: Joi.string().allow('asc', 'desc').default('desc')
    });
};

exports.validateListCommand = function (command, rules, options) {
    command = command || {};
    rules = _.merge(exports.pagingValidationRules(), rules);
    command = exports.validateSync(command, rules, options);
    return command;
};

exports.validateIntId = function (command) {
    var rules = {
        id: Joi.number().integer().required()
    };
    return exports.validateSync(command, rules);
};

exports.validateUuidId = function (command) {
    var rules = {
        id: Joi.string().guid().required()
    };
    return exports.validateSync(command, rules);
};

exports.responseTypes = {
    full: 'full',
    idOnly: 'idOnly',
    empty: 'empty',
    /**
     * If service returns an item then return it entirely or
     * if not still return a 200 with no body.
     */
    fullOrEmpty: 'fullOrEmpty'
};

var APIResponse = function (res, responseType) {
    return function (serviceResponse) {
        if (responseType === exports.responseTypes.full) {
            if (!serviceResponse) return res.status(404).end();
            res.status(200);
            return res.send(serviceResponse).end()
        } else if (responseType === exports.responseTypes.idOnly) {
            if (!serviceResponse) return res.status(404).end();
            res.status(200);
            return res.send({id: serviceResponse.cid}).end();
        } else if (responseType === exports.responseTypes.fullOrEmpty) {
            res.status(200);
            if (!serviceResponse) return res.end();
            return res.send(serviceResponse).end()
        }
        return res.status(200).end();
    }
};

exports.ForbiddenError = ForbiddenError = function () {
    this.constructor.prototype.__proto__ = Error.prototype;
    Error.captureStackTrace(this, this.constructor);
    this.name = 'ForbiddenError';
    this.category = 'Forbidden';
};
ForbiddenError.prototype.getBody = function () {
};

exports.SignInError = SignInError = function (message) {
    this.constructor.prototype.__proto__ = Error.prototype;
    Error.captureStackTrace(this, this.constructor);
    this.message = message;
    this.name = 'SignInError';
    this.category = 'SignIn';
};
SignInError.prototype.getBody = function () {
};

exports.ValidationError = ValidationError = function (message, path, reference) {
    this.constructor.prototype.__proto__ = Error.prototype;
    Error.captureStackTrace(this, this.constructor);
    this.name = 'ValidationError';
    this.category = 'Validation';
    this.message = message || 'Default Message';
    this.reference = reference;
    this.path = path || null;
};
ValidationError.prototype.getBody = function () {
    return [{path: this.path, message: this.message}]
};

exports.MultiValidationError = MultiValidationError = function (validationError) {
    this.constructor.prototype.__proto__ = Error.prototype;
    Error.captureStackTrace(this, this.constructor);
    this.name = 'MultiValidationError';
    this.category = 'Validation';
    this.message = validationError.message;
    if (validationError) {
        this.validationError = validationError.details.map(function (x) {
            return {
                message: x.message,
                path: x.path,
                type: x.type
            }
        });
    }
};
MultiValidationError.prototype.getBody = function () {
    return this.validationError;
};

var responseMap = {
    GET: exports.responseTypes.full,
    PUT: exports.responseTypes.empty,
    POST: exports.responseTypes.idOnly,
    DELETE: exports.responseTypes.empty
};

var paramMergeMap = {
    GET: function (req) {
        return _.merge(req.params, req.query);
    },
    POST: function (req) {
        return _.merge(req.params, req.body);
    },
    PUT: function (req) {
        return _.merge(req.params, req.body);
    },
    DELETE: function (req) {
        return _.merge(req.params, req.query);
    }
};

exports.sendError = function sendError(err, res) {
    if (err.category === 'Validation') {
        res.status(400).send(err.getBody());
    } else if (err.category === 'Forbidden') {
        res.status(403).send();
    } else {

        res.status(err.status || 500).send();
    }
};

exports.createRules = function (rules) {
    var base = {
        _userContext: Joi.object().keys({
            id: Joi.string().guid(),
            names: Joi.array(),
            location: Joi.object()
            //Add additional user context properties here.
        })
    };
    return _.merge(base, rules);
};

exports.primeForPersistence = function (command, entityType) {
    if (command.cid) {
        command.created = parseInt(command.created);
        command.updated = new Date().getTime();
    } else {
        command.entityType = entityType;
        command.updated = new Date().getTime();
    }
};

/**
 * Removes context properties (i.e. that start with _)
 * @param command
 */
exports.stripContext = function (command) {
    var response = {};
    for (var key in command) {
        if (!command.hasOwnProperty(key)) continue;
        if (key.indexOf('_') !== 0) {
            response[key] = command[key];

        }
    }
    return response
};

exports.coerceToArray = function (value) {
    if (value && !util.isArray(value)) value = [value];
    return value;
};

exports.parse = function (serializedJson) {
    if (!serializedJson) return;
    return JSON.parse(serializedJson);
};

exports.applyUpdates = function (original, updates) {
    Object.keys(updates).forEach(function (updatesKey) {
        original[updatesKey] = updates[updatesKey];
    });
};

exports.setCookie = function (res, accessToken) {
    res.set('Set-Cookie', util.format('accessToken=%s; Path=/;', accessToken));
};

exports.hydrateList = function (items, hydrateTargets, entityResolvers, filter) {
    var entityTypesIdGroups = {};

    function initIdGroups(type) {
        entityTypesIdGroups[type] = entityTypesIdGroups[type] || [];
    }

    items.forEach(item => {
        hydrateTargets.forEach(target => {
            var type = item[target.entityTypeField] || target.entityType;
                initIdGroups(type);
                entityTypesIdGroups[type].push(item[target.entityIdField])
        });
    });
    var tasks = [];

    function createResolverFunc(entityType, resolverGroups) {
        return function (cb) {
            var entityResolver = entityResolvers[entityType];
            if (!entityResolver) throw new RangeError('An entity resolver for entityType "' + entityType + '" is required.');
            entityResolver(resolverGroups[entityType]).then(group => {
                cb(null, group);
            });
        }
    }

    Object.keys(entityTypesIdGroups).forEach(key => {
        tasks.push(createResolverFunc(key, entityTypesIdGroups))
    });
    return new Promise((resolve, reject) => {
        async.parallel(tasks, function (err, results) {
            if (err) return reject(new Error(err));
            results = _.flatten(results);
            var foo = 0;
            items.forEach(item => {
                hydrateTargets.forEach(target => {
                    item[target.hydratedField] = _.find(results, function (x) {
                        return x.id == item[target.entityIdField];
                    });

                })
            });
            foo == 0 && resolve(items);
        });
    });
};
