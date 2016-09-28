var redis = require('then-redis');
var log = require('../logger')('providers/redis');
var Promise = require('bluebird');
var client;
var config = require('../../../config');
var _ = require('lodash');

exports.init = function () {
    return new Promise(function(resolve, reject) {
        if (client) return resolve();
        try {
            client = redis.createClient(config.redis);
            log.info('Connected to REDIS:', config.redis.host, config.redis.port);
            resolve();
        } catch (e) {
            log.error('Error connecting to one of the Redis servers.', e);
            reject(e);
        }
    });
};

exports.createClient = function (redisConfig) {
    return redis.createClient(redisConfig || config.redis);
};

exports.client = function () {
    return client;
};