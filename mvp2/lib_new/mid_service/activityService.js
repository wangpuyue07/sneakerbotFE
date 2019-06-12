var service = require('../application/serviceUtils');
var sql = require('../application/providers/sqlClient');
var constants = require('../application/constants');
var productService = require('../base_service/productService');
var feedbackService = require('../mid_service/feedbackService');
var suggestionService = require('../base_service/suggestionService');
var commentService = require('../base_service/commentService');
var objects = require('../objects');
var S = require('string');
var Joi = require('joi');
var _ = require('lodash');
var util = require('util');
var async = require('async');



exports.hydrateSingleActivity = function (activity) {
    return service.hydrateList([activity], hydrationTargets, entityResolver).then(function (res) {
        return res[0];
    })
};

exports.getLatest = function (command) {
    var monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    if (command.tags && !Array.isArray(command.tags)) {
        command.tags = [command.tags];
    }
    var listCommand = {limit: command.limit, _userContext: command._userContext};
    listCommand = service.validateListCommand(listCommand);
    if(command.since){
        listCommand.createdAt = {gt: command.since};
        delete command.since;
    }
    if (command.recipientId) listCommand.recipientId = command.recipientId;
    if (command.objectId) listCommand.objectId = command.objectId;
    if (command.direction) listCommand.direction = command.direction;
    if (command.page) listCommand.page = command.page;
    if (command.tags && command.tags.length > 0) {
        listCommand.tags = {
            $or: command.tags.map(tag => {
                return {$like: '%|' + tag + '|%'};
            })
        };
    }
    if (command.storeId) {
       // listCommand.storeId = command.storeId;
        listCommand.storeId = {
            $or: {$like: '%|' + command.storeId + '|%'}
        };
    }
    if(command.action) listCommand.action = command.action;
    //
    // var query =  "select * from activities where (action = 'createdStaffFeedback' or action ='createdStaffSuggestion') and bodyId is not null " +
    //     "order by updatedAT desc limit 5;";
    // return sql.db.query(query, {type: sql.db.QueryTypes.SELECT}).then(res => {
    //     return service.hydrateList(res, hydrationTargets, entityResolver,{storeId:command.storeId,tags:command.tags});
    // });

    return persistence.listItems(listCommand).then(res => {
        return service.hydrateList(res, hydrationTargets, entityResolver,{storeId:command.storeId,tags:command.tags});
    });
};

exports.getActivityByIds = function(ids){
    return persistence.listItems({ id : {$in : ids }}).then(res => {
        return service.hydrateList(res, hydrationTargets, entityResolver);
    });
};






