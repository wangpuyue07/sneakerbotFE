// var objects = require('./objects');
var Joi = require('joi');
var Persistence = require('../application/persistence');
var genUtils = require('../application/genUtils');
var constants = require('../application/constants');
var service = require('../application/serviceUtils');
var persistence = new Persistence(constants.entityTypes.a_staffActivityCounts);
var sql = require('../application/providers/sqlClient');
var util = require('util');
var events = require('../application/eventBroker');


var createStaffActCnt = function(command){
    var rules = {
        cid: Joi.string().guid().required(),
        staffId:Joi.string().guid().required(),
        storeId:Joi.string().guid().required(),
        role:Joi.string(),
        region:Joi.string()
    };
    service.validateSync(command, rules);
    return persistence.createItem(command);
};

var getStaffActCnt = function (command) {
    service.validateUuidId(command);
    return persistence.getItem(command);
};
exports.updateNum = function (command) {
    var rules = {
        staffId: Joi.string().guid().required(),
        role: Joi.string().required(),
        storeId: Joi.string().guid().required(),
        numType: Joi.string().required(),
    };
    service.validateSync(command, rules);
    return getStaffActCnt({
        staffId: command.staffId,
        storeId: command.storeId,
        role: command.role
    }).then(res=>{
        if(!res){
            return createStaffActCnt({
                cid: genUtils.createTimeUuid(),
                staffId:command.staffId,
                storeId:command.storeId,
                role:command.role,
                region:command.region
            }).then(res=>{
                return doUpdateNum(res, command);
            });
        }else{
            return doUpdateNum(res, command);
        }
    });
};

var doUpdateNum = function (res, command) {
    switch (command.numType){
        case 'vote': updateVoteNum(res,command);
        break;
        case 'comment': updateCommentNum(res,command);
        break;
        case 'feedback': updateFeedbackNum(res,command);
        break;
        case 'suggestion': updateSuggestionNum(res,command);
        break;
    }
}

var updateVoteNum = function (res, command) {
    // res.voteNum = res.voteNum + command.num;
    var updateSql = "update a_staffActivityCounts set voteNum = voteNum + " + command.num + " " +
        "where staffId = '" + command.staffId + "' and storeId = '" + command.storeId + "' and role = '" + command.role + "'";
    return execUpdateSql(updateSql);
    // return updateStaffActCnt(res);
}
var updateCommentNum = function (res, command) {

    var updateSql = "update a_staffActivityCounts set commentNum = commentNum + " + command.num + " " +
        "where staffId = '" + command.staffId + "' and storeId = '" + command.storeId + "' and role = '" + command.role + "'";
    return execUpdateSql(updateSql);
    // res.commentNum = res.commentNum + command.num;
    // return updateStaffActCnt(res);
}
var updateFeedbackNum = function (res, command) {
    var updateSql = "update a_staffActivityCounts set feedbackNum = feedbackNum + " + command.num + " " +
        "where staffId = '" + command.staffId + "' and storeId = '" + command.storeId + "' and role = '" + command.role + "'";
    return execUpdateSql(updateSql);
    // res.feedbackNum = res.feedbackNum + command.num;
    // return updateStaffActCnt(res);
}
var updateSuggestionNum = function (res, command) {
    var updateSql = "update a_staffActivityCounts set suggestionNum = (suggestionNum + " + command.num + ") " +
    "where staffId = '" + command.staffId + "' and storeId = '" + command.storeId + "' and role = '" + command.role + "'";
    return execUpdateSql(updateSql);
    // res.suggestionNum = res.suggestionNum + command.num;
    // return updateStaffActCnt(res);
}

var execUpdateSql = function (updateSql) {
    sql.db.query(util.format(updateSql)).spread(function(results, metadata) {
        return results;
    }).catch(e=>{
        console.log("error:");
        console.log(e);
    });
}
//
// exports.listFeedback = function (command) {
//     // var rules = {
//     //     staffId: Joi.string().guid()
//     // };
//     // command = service.validateListCommand(command, rules);
//     return persistence.listItems(command);
// };
//
// exports.getFeedbackByIds = function (ids) {
//     var command = service.validateListCommand({});
//     command.cid = { $in : ids };
//     return persistence.listItems(command);
// };
/**
 * change deleted to 1
 * @param cid
 */
var updateStaffActCnt = function (command){
    delete command.fdbSugNum;
    return persistence.updateItem(command);
}
exports.listStaffActCnt = function (command) {
    // var rules = {
    //     staffId: Joi.string().guid()
    // };
    // command = service.validateListCommand(command, rules);
    command.limit = 100000000;
    return persistence.listItems(command);
}

var updatePreRank = function () {
    var updateSql = "update a_staffActivityCounts set preRank = (feedbackNum + suggestionNum) ";
    return execUpdateSql(updateSql);
}


events.on("everyHourPlanTask", function () {
    if (isWeekMonday(new Date())) {
        if (new Date().getHours() == 1) {
            try {
                updatePreRank();
            } catch (e) {
                console.log(e);
            }
        }
    }
});

var isWeekMonday = function (date){
    if( "天一二三四五六".charAt(new Date(date).getDay())=="一" ){
        return true;
    }else{
        return false;
    }
}