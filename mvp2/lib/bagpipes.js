var redis = require('./application/providers/redis');
var service = require('./application/serviceUtils');
var joi = require('joi');

exports.configure = function (config) {
    var validationRules = {
        redis: joi.object().required()
    };
    service.validateSync(config, validationRules, { allowUnknown: true, userContextRequired : false });
    return redis.init();
};

// PATCHING

var Promise = require('bluebird');
Promise.promisifyAll(require('async'));
Promise.promisifyAll(require('bcryptjs'));


var _ = require('lodash');
_.mixin({
    'findByIds': function(collection, key, ids) {
        return _.filter(collection, function(item) {
            return _.contains(ids, item[key]);
        });
    }
});
_.mixin({
    'objectIndex' : function(collection, property, value) {
            for (var i = 0, len = collection.length; i < len; i++)
                if (collection[i][property] === value) return i;
    }
});

Object.valAt = function(obj, index) {
    if(!obj) throw new RangeError('You must provide a valid object.');
    return obj[Object.keys(obj)[index]];
};