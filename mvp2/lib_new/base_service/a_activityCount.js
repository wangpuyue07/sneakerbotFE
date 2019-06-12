/**
 * Created by Anthony on 2017/2/20.
 */
// var objects = require('./objects');
var Joi = require('joi');
var Persistence = require('../application/persistence');
var genUtils = require('../application/genUtils');
var constants = require('../application/constants');
var service = require('../application/serviceUtils');
var persistence = new Persistence(constants.entityTypes.a_activityCounts);
var sql = require('../application/providers/sqlClient');


exports.createActCnt = function(command){
    return persistence.createItem(command).catch(e=>{
        console.log(e)
    });
};
var getActCnt = function (command) {
    return persistence.getItem(command);
};

var doUpdateNum = function (res, command) {
    switch (command.numType){
        case 'vote': updateVoteNum(res,command);
            break;
        case 'comment': updateCommentNum(res,command);
            break;
    }
};
exports.updateNum = function (command) {
    return getActCnt({
        subjectId:command.subjectId,
    }).then(res=>{
        if(!res){
            return this.createActCnt({
                cid: genUtils.createTimeUuid(),
                voteNum:0,
                commentNum:0,
                subjectId:command.subjectId,
                productId:command.productId,
                type:command.type
            }).then(res=>{
                return doUpdateNum(res, command);
            });
        }else{
            return doUpdateNum(res, command);
        }
    });
};



var updateVoteNum = function (res, command) {
    res.voteNum = res.voteNum + command.num;
    return updateActCnt(res);
};
var updateCommentNum = function (res, command) {
    res.commentNum = res.commentNum + command.num;
    return updateActCnt(res);
};
var updateActCnt = function (command){
    return persistence.updateItem(command);
};
exports.listActCnt = function (command) {
    command.limit = 100000000;
    return persistence.listItems(command);
};

exports.deleteActCnt = function (command) {
    return persistence.deleteItem(command);
}