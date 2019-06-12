/**
 * Created by Anthony on 2017/2/21.
 */
/**
 * Created by apple on 2017/2/20.
 */
// var objects = require('./objects');
var Joi = require('joi');
var Persistence = require('../application/persistence');
var genUtils = require('../application/genUtils');
var constants = require('../application/constants');
var service = require('../application/serviceUtils');
var persistence = new Persistence(constants.entityTypes.a_classifyfaceCounts);
var sql = require('../application/providers/sqlClient');
var util = require('util');


var createClassifyFaceCnt = function(command){
    var rules = {
        cid: Joi.string().guid().required(),
        productId:Joi.string().required()
    };
    service.validateSync(command, rules);
    return persistence.createItem(command);
};

var getClassifyFaceCnt = function (command) {
    return persistence.getItem(command);
};
exports.updateNum = function (command) {
    var rules = {
        productId: Joi.string().required(),
        updateFiled: Joi.array().items(Joi.string()),
        num:Joi.string().required()

    };
    service.validateSync(command, rules);
    return getClassifyFaceCnt({productId: command.productId}).then(res=>{
        if(!res){
            return createClassifyFaceCnt({
                cid: genUtils.createTimeUuid(),
                productId:command.productId
            }).then(res=>{
                return this.doUpdateNum(command);
            });
        }else{
            return this.doUpdateNum(command);
        }
    });
};

exports.doUpdateNum = function (command) {
    var myupdateFileds = command.updateFiled;
    myupdateFileds.forEach((item)=>{
        var filedStr = item.replace(' ','').replace('/','').replace('|','');
        filedStr = filedStr + "=(" + filedStr + "+" + command.num + ")";
        // res.voteNum = res.voteNum + command.num;
        var updateSql = "update a_classifyfaceCounts set " + filedStr + " " +
            "where productId = '" + command.productId +"'";
        execUpdateSql(updateSql);
    });
}

var execUpdateSql = function (updateSql) {
    sql.db.query(util.format(updateSql)).spread(function(results, metadata) {
        return results;
    }).catch(e=>{
        console.log("error:");
        console.log(e);
    });
}

exports.listClassifyFaceCnt = function (command) {
    // var rules = {
    //     staffId: Joi.string().guid()
    // };
    // command = service.validateListCommand(command, rules);
    if(!command) command = {};
    command.limit = 100000000;
    return persistence.listItems(command);
};
