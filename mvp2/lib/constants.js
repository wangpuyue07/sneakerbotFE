var _ = require('lodash');
var util = require('util');
var Joi = require('joi');

exports.getSearchIndex = function(indexName) {
    if (process.env.NODE_ENV === 'test') return 'test_' + indexName;
    return indexName;
};

exports.regex = {
    uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
};

exports.spotCategories = {
    thing: 'thing',
    place: 'place',
    person: 'person',
    other: 'other',
    store: 'store',
    staff: 'staff'
};

exports.spotExtras = {
    address: 'address',
    geoLocation: 'geoLocation',
    place: 'place',
    areaName: 'areaName'
};

exports.postStatuses = {
    pending : 'pending',
    sent : 'sent',
    failed: 'failed',
    wontFix: 'wontFix',
    deleted: 'deleted',
    unreadNotification: 'unreadNotification',
    readNotification: 'readNotification'
};

exports.distanceUnits = {
    km: 'km',
    m: 'm',
    ft: 'ft',
    mi: 'mi'
};

exports.publishStatuses = {
    published : 1,
    reported : 5,
    deleted : 10
};

exports.spotCounts = {
    views: 'views',
    likes: 'likes',
    comments: 'comments'
};

exports.entityTypes = {
    spot: 'spot',
    principal : 'principal',
    profile: 'profile',
    person: 'person',
    comment: 'comment',
    passwordReset: 'passwordReset',
    find: 'find',
    activity: 'activity',
    organisation: 'organisation',
    store: 'store',
    feedback: 'feedback',
    restock: 'restock',
    staff: 'staff',
    product: 'product',
    staffActivityReads : 'staffActivityReads',
    notification : 'notification',
    request : 'request'
};

exports.actions = {
    suggested: 'suggested',
    commented : 'commented',
    uploaded : 'uploaded',
    liked : 'liked',
    createdStaffFeedback : 'createdStaffFeedback',
    createdStaffRequest : 'createdStaffRequest',
    createdCustomerRequest : 'createdCustomerRequest',
    createdCustomerRestock : 'createdCustomerRestock'
};

exports.notificationType = {
    mentioned: 'mentioned',
    liked: 'liked'
};

exports.environments = {
    development : 'development',
    test : 'test',
    staging : 'staging',
    production : 'production'
};

exports.arrayWithIdValidation = function(){
    return Joi.array().items(Joi.object().keys({id : Joi.string().regex(exports.regex.uuid).required()})).min(1);
};

exports.optionalArrayWithIdValidation = function(){
    return Joi.array().items(Joi.object().keys({id : Joi.string().regex(exports.regex.uuid).required()}));
};