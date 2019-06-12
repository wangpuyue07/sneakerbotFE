var service = require('./../application/serviceUtils');
var constants = require('../application/constants');
var Joi = require('joi');
var Persistence = require('../application/persistence');
var persistence = new Persistence(constants.entityTypes.votes);

/**

 * match a client generated item which is eventually consistent
 * with the backend.
 * @returns {*}
 */
var createVote = function (command) {
    var rules = {
        type:Joi.string().guid().required(),
        activityId: Joi.string().required()
    };
    service.validateSync(command, rules);
    var myCommand = {
        cid: service.createTimeUuid(),
        type: command.type,
        staffId: command._userContext.staffId,
        activityId: command.activityId,
        storeId: command._userContext.permission_level>2?'':command._userContext.id,
        active: 1
    };
    constants.vatesByActivId[myCommand.activityId] = undefined;
    constants.vates[myCommand.activityId + myCommand.type + myCommand.staffId] = undefined;
    return persistence.createItem(myCommand);
};
/**
 * update vote info
 * @param command
 */
var updateVote = function (command) {
    return persistence.updateItem(command);
};

var getVote = function (command){
    return new Promise(function(resolve,reject) {
        if (constants.vates[command.activityId + command.type + command._userContext.staffId]) {
            resolve(constants.vates[command.activityId + command.type + command._userContext.staffId]);
        } else {
            var rules = {
                type:Joi.string().guid().required(),
                activityId: Joi.string().required()
            };
            service.validateSync(command, rules);
            persistence.getItem({activityId: command.activityId,type: command.type, staffId: command._userContext.staffId}).then(res => {
                constants.vates[command.activityId + command.type + command._userContext.staffId] = res;
                resolve(res);
            });
        }
    });
}
/**
 * deal with do vote active
 * @param command
 */
exports.doVote = function (command) {
    getVote(command).then(res=>{
        if(res){
            var myCommand = {
                id: res.cid,
                type: res.type,
                staffId: res.staffId,
                activityId: res.activityId,
                storeId: res.storeId,
                active: res.active
            };
            //change active status
            if(res.active == 0){
                myCommand.active = 1;
            }else{
                myCommand.active = 0;
            }
            constants.vatesByActivId[myCommand.activityId] = undefined;
            constants.vates[myCommand.activityId + myCommand.type + myCommand.staffId] = undefined;
            return updateVote(myCommand);
        }else{
            return createVote(command);
        }
    }).catch(asd=>{console.log(asd)});
}

/**
 * get votes from activityId
 * @param command
 * @returns {*}
 */
exports.getVoteListByActId = function (activityId){
    return new Promise(function(resolve,reject) {
        if (constants.vatesByActivId[activityId]) {
            resolve(constants.vatesByActivId[activityId]);
        } else {
            var command = service.validateListCommand({});
            command.activityId = activityId;
            command.limit = 1000000;
            command.active = 1;
            persistence.listItems(command).then(res => {
                if (res) {
                    constants.vatesByActivId[activityId] = res;
                }
                resolve(res);
            })
        }
    });
}

/**
 * delete
 * @param command
 * @returns {*}
 */
exports.deleteVote = function (command) {
    return persistence.deleteItems(command);
}