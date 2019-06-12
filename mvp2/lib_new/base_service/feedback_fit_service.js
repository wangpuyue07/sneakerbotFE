// var objects = require('./objects');
var Joi = require('joi');
var Persistence = require('../application/persistence');
// var genUtils = require('./application/genUtils');
var constants = require('../application/constants');
var service = require('../application/serviceUtils');
var persistence = new Persistence(constants.entityTypes.feedback_fits);
var sql = require('../application/providers/sqlClient');


exports.createFeedback = function(command){
    var rules = {
        cid: Joi.string().guid().required(),
        staffId:Joi.string().guid().required(),
        productId:Joi.string().guid().required(),
        face:Joi.string(),
        description: Joi.string(),
        topic: Joi.array().items(Joi.string()),
        tag: Joi.string(),
        // appliesTo: Joi.array().items(Joi.string())
        where:Joi.string(),
        storeId:Joi.string().guid()
    };
    service.validateSync(command, rules);
    constants.fit_feedback_bundle[command.productId]=undefined;
    return persistence.createItem(command);
};

// exports.updateFeedback = function (command) {
//     var rules = {
//         cid: Joi.string().guid().required(),
//         description: Joi.string(),
//         updatedAt:Joi.date().iso().min(Joi.ref('start')),
//         tags:Joi.array()
//     };
//     service.validateSync(command, rules);
//     constants.fit_feedback_bundle[command.productId]=undefined;
//     return persistence.updateItem(command);
// };

exports.getFeedback = function (command) {
    return new Promise(function(resolve,reject){
        if(constants.fit_feedback[command.cid]){
            resolve(constants.fit_feedback[command.cid]);
        }else{
            persistence.getItem(command).then(res=>{
                constants.fit_feedback[command.cid]=res;
                resolve(res);
            })
        }
    });


};

exports.listFeedback = function (command) {
    return new Promise(function (resolve,reject) {
        if(constants.fit_feedback_bundle[command.productId]){
            resolve(constants.fit_feedback_bundle[command.productId])
        }else{
            persistence.listItems(command).then(res=>{
                constants.fit_feedback_bundle[command.productId]=res;
                resolve(res);
            })
        }
    });
};

exports.getFeedbackByIds = function (ids) {
    var command = service.validateListCommand({});
    command.cid = { $in : ids };
    return persistence.listItems(command);
};
/**
 * change deleted to 1
 * @param cid
 */
exports.deleteFeedback = function (command){
    return persistence.deleteItem(command);
}