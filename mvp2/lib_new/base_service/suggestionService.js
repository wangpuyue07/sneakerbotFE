var Joi = require('joi');
var Persistence = require('../application/persistence');
var genUtils = require('../application/genUtils');
var constants = require('../application/constants');
var service = require('../application/serviceUtils');
var persistence = new Persistence(constants.entityTypes.suggestions);
var sql = require('../application/providers/sqlClient');
var util = require('util');
var a_staffActCntService = require('../base_service/a_staffActCntService');
var storeService = require('../base_service/storeService');
var staffService = require('../base_service/staffService');

/*
 create nonproduct suggestion
 */
exports.createSuggestion = function (command) {
    var rules = {
        info: Joi.string().required(),
        images: Joi.array().items(Joi.string())
    };
    service.validateSync(command, rules);

    command.cid = genUtils.createTimeUuid();
    command.productId = command.sku;
    command.storeId = command._userContext.permission_level>2?'':command._userContext.id;
    command.creatorId = command._userContext.staffId;
    command.type = constants.suggestionType.suggestion;//no product
    // command.organisationId = command._userContext.organisation.id;
    return persistence.createItem(command).then(res=>{
        constants.suggestionsByProId[command.productId] = undefined;
        var storeId = command._userContext.permission_level>2?'':command._userContext.id;
        var staffId = command._userContext.staffId;
        updateStaffActCnt(storeId, staffId, 'suggestion', 1);
        return res;
    });
};
/*
 create feedback suggestion
 */
exports.createFeedbackSuggestion = function (command) {
    constants.suggestionsByProId[command.productId] = undefined;
    return persistence.createItem(command);
};

exports.updateSuggestion = function (command) {
    var rules = {
        id: Joi.string().guid().required(),
        description: Joi.string()
    };
    command.cid = command.id;
    service.validateSync(command, rules);
    return persistence.updateItem(command);
};

exports.getSuggestion = function (command) {
    return new Promise(function (resolve,reject) {
        var myId = "";
        if(command.cid) myId = command.cid;
        if(command.id) myId = command.id;
        if(constants.suggestionsById[myId]){
            resolve(constants.suggestionsById[myId])
        }else{
            service.validateUuidId(command);
            persistence.getItem(command).then(res=>{
                constants.suggestionsById[command.cid]=res;
                resolve(res);
            })
        }
    });

    // return persistence.getItem(command);
};

/**
 * cache only use for filting by productId
 * @param command
 * @returns {*}
 */
exports.listSuggestion = function (command) {
    // var rules = {
    //     staffId: Joi.string().guid()
    // };
    // command.cid = command.id;
    // command = service.validateListCommand(command, rules);
    // return persistence.listItems(command);

    return new Promise(function (resolve,reject) {
        if(command.productId && constants.suggestionsByProId[command.productId]){
            resolve(constants.suggestionsByProId[command.productId])
        }else{
            persistence.listItems(command).then(res=>{
                constants.suggestionsByProId[command.productId]=res;
                resolve(res);
            })
        }
    });
};

exports.getSuggestionById = function (ids) {
    var command = service.validateListCommand({});
    command.cid = { $in : ids };
    return persistence.listItems(command);
};

exports.deleteSuggestion = function (command) {
    var rules = {
        id: Joi.string().guid().required()
    };
    command = service.validateListCommand(command, rules);
    return persistence.deleteItem({id: command.id});
};


/**
 * update staffActCnt infos
 * @param storeId
 * @param staffId
 * @param type
 * @param num
 */
var updateStaffActCnt = function (storeId,staffId, type, num) {
    return storeService.getStoreByIds([storeId]).then(storeItem=>{
        var region = storeItem[0].city;
        return staffService.getStaffByIds([staffId]).then(staffItem=>{
            return a_staffActCntService.updateNum({
                staffId:staffId,
                storeId:storeId,
                role:staffItem[0].role_ab,
                region:region,
                num: num,
                numType: type
            });
        });
    });
}