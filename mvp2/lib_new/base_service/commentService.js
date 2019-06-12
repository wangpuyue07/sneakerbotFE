// var activityService = require('../../lib_new/activityService');
var service = require('./../application/serviceUtils');
// var spotService = require('./../spots/spotService');
var objects = require('../objects');
var constants = require('../application/constants');
var async = require('async');
var S = require('string');
var Joi = require('joi');
var _ = require('lodash');
var util = require('util');
var Persistence = require('../application/persistence');
var persistence = new Persistence(constants.entityTypes.comments);
var staffService = require('../../lib_new/base_service/staffService');
var storeService = require('../../lib_new/base_service/storeService');
var sql = require('../application/providers/sqlClient');

/**

 * match a client generated item which is eventually consistent
 * with the backend.
 * @returns {*}
 */
exports.createComment = function (command) {
    var myCommand = {
        cid: service.createTimeUuid(),
        storeId: command._userContext.permission_level>2?'':command._userContext.id,
        staffId: command._userContext.staffId,
        content: command.comment,
        topic: command.objectType,
        activityId: command.objectId,
        mentionId: command.mentions,
        deleted: 0
    };
    return persistence.createItem(myCommand);
};

exports.deleteComment = function (command) {
    return persistence.deleteItems(command);
};


exports.getComment = function (command){
    return persistence.getItem(command)
}
exports.getcomments = function (command){
    return persistence.listItems({limit:1000000, direction: command.direction, activityId: command.activityId }).then(res=>{
        var raw = res;

        return new Promise(resolve=>{
           Promise.all(res.map(item=>{
               return Promise.all([staffService.getStaffByIds([item.staffId]),storeService.getStoreByIds([item.storeId])])
           })).then(res=>{
               resolve(raw.map((item,i)=>{
                   item.staff = res[i][0][0];
                   item.store = res[i][1][0];
                   return item;
               }))
           })
        });
    });
}