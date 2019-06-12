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

// exports.entityTypes = {
//     spot: 'spot',
//     principal : 'principal',
//     profile: 'profile',
//     person: 'person',
//     comment: 'comment',
//     passwordReset: 'passwordReset',
//     find: 'find',
//     activity: 'activity',
//     organisation: 'organisation',
//     store: 'store',
//     feedback: 'feedback',
//     restock: 'restock',
//     staff: 'staff',
//     product: 'product',
//     staffActivityReads : 'staffActivityReads',
//     notification : 'notification',
//     request : 'request',
//     suggestion : 'suggestion'
// };

exports.actions = {
    suggested: 'suggested',
    commented : 'commented',
    uploaded : 'uploaded',
    liked : 'liked',
    createdStaffSuggestion : 'createdStaffSuggestion',
    createdStaffFeedback : 'createdStaffFeedback',
    createdStaffRequest : 'createdStaffRequest',
    createdCustomerRequest : 'createdCustomerRequest',
    createdCustomerRestock : 'createdCustomerRestock',
    updatedStaffFeedback : 'updatedStaffFeedback'
};

exports.notificationType = {
    commented: 'commented',
    mentioned: 'mentioned',
    liked: 'liked',
    requestFeedback:'requestFeedback',
    responseForRequest:'responseForRequest'
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


/*
* tables: applies
* tables: feedback_fit
* tables: feedback_price
* tables: feedback_stock
* tables: feedback_style
* tables: notifications
* tables: principals
* tables:production_info
* tables: productions
* tables: staff
* tables: store
* tables: suggestions
* tables: vote
* */

exports.entityTypes =
{
    a_activityCounts:'a_activityCounts',
    a_classifyfaceCounts:'a_classifyfaceCounts',
    a_staffActivityCounts:'a_staffActivityCounts',
    applies: 'applies',
    comments:'comments',
    feedback_fits:'feedback_fits',
    feedback_prices:'feedback_prices',
    feedback_qualitys:'feedback_qualitys',
    feedback_stocks:'feedback_stocks',
    feedback_styles:'feedback_styles',
    images:'images',
    notifications:'notifications',
    newPrincipals:'newPrincipals',
    product_Infos:'product_Infos',
    products:'newproducts',
    organisation:'organisation',
    staffs:'staffs',
    stores:'stores',
    suggestions:'newsuggestions',
    votes:'votes',
    requestFeedback:'requestFeedback'
};



exports.types = {
    feedbackCreated: 'feedbackCreated',
    suggestionCreated: 'suggestionCreated'
};


exports.suggestionType = {
    suggestion : 'suggestion',
    styleSuggestion : 'styleSuggestion'
};

exports.cacheHR = ""; 
exports.cacheProduction = "";
 exports.cacheManagement = "";
 exports.ii = 0;

exports.products={};
exports.localProducts={};
exports.stores={};
// exports.comments_bundle={};
exports.staffs={};
exports.fit_feedback={};
exports.price_feedback={};
exports.quality_feedback={};
exports.stock_feedback={};
exports.style_feedback={};
exports.fit_feedback_bundle={};
exports.price_feedback_bundle={};
exports.quality_feedback_bundle={};
exports.stock_feedback_bundle={};
exports.style_feedback_bundle={};
exports.vates={};
exports.vatesByActivId={};
exports.suggestionsById={};
exports.suggestionsByProId={};
exports.requestFeedback={};


exports.activeStore = {};
exports.activeFunc = {};