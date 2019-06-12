var service = require('./../application/serviceUtils');
var constants = require('../application/constants');
var Joi = require('joi');
var Persistence = require('../application/persistence');
var persistence = new Persistence(constants.entityTypes.applies);

/**

 * match a client generated item which is eventually consistent
 * with the backend.
 * @returns {*}
 */
exports.createApply = function (command) {
    var rules = {
        cid: Joi.string().guid().required(),
        feedbackId:Joi.string().guid().required(),
        product_info_id:Joi.string().guid().required(),
        type:Joi.string().required()
    };
    service.validateSync(command, rules);
    return persistence.createItem(command);
};
/**
 * delete
 * @param command
 * @returns {*}
 */
exports.deleteApply = function (command) {
    return persistence.deleteItems(command);
};
