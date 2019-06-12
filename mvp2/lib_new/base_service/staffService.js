var service = require('../application/serviceUtils');
var Persistence = require('../application/persistence');
var genUtils = require('../application/genUtils');
var constants = require('../application/constants');
var persistence = new Persistence(constants.entityTypes.staffs);
var bcrypt = require('bcryptjs');
var Joi = require('joi');

exports.listStaff = function (command, options) {
    command.all=true;
    return persistence.listItems(command, options);
};

exports.createStaff = function (command) {

    return exports.getStaff({userId:command.userId}).then((res) => {
        if (res) {
            return {errMsg:'id exits'}
        } else {
            return encryptPassword(command.barCode).then(function (hash) {
                command.cid = service.createTimeUuid();
                command.deleted = 0;
                command.active = 1;
                command.barCode = hash;
                command.creatorId = command._userContext.staffId;
                return persistence.createItem(command).catch(asd=>{console.log(asd)});
            });
        }
    }).catch(asd=>{console.log(asd)});


};

// 已更新
exports.getStaff = function (command) {
    command.all=true;
     return persistence.getItem(command);
};
//

exports.staffLogin = function (command) {
    // var storeId;
    // command._userContext.stores.forEach(store=>{
    //     if(store.email==command._userContext.email){
    //         storeId = store.id;
    //     }
    // });
    return persistence.getItem({userId: command.userId, storeId: command._userContext.id}).then((res)=>{
        if (res === null) return new Promise((reslove,reject)=>{reslove({errMsg:'Id is not exist in this store.'})});
        var staff = res;
        return bcrypt.compareAsync(command.barCode, res.barCode).then((res)=>{
        // res = true;
            return new Promise((reslove,reject)=>{
                if(res){
                    reslove({result:staff});
                }else{
                    reslove({result:res});
                }});
        });
    });
};
exports.checkUserId = function (command) {
    // var storeId;
    // command._userContext.stores.forEach(store=>{
    //     if(store.email==command._userContext.email){
    //         storeId = store.id;
    //     }
    // });
    return persistence.getItem({userId: command.userId, storeId: command._userContext.id}).then((res)=>{
        return new Promise((reslove,reject)=> {
            if (res === null) {
                reslove({errMsg: 'Id is not exist in this store.'});
            } else {
                if(res.active == 0){
                    reslove({errMsg: 'Id is not actived'});
                }else{
                    reslove({result: res});
                }

            }
        });
    });
};
exports.updateStaff = function (command) {
    if(!command.storeId) command.storeId=null;
    if (command.barCode.length > 30) {
        constants.staffs[command.id] = undefined;
        return persistence.updateItem(command);
    } else {
        return encryptPassword(command.barCode).then(function (hash) {
            command.barCode = hash;
            constants.staffs[command.id] = undefined;
            return persistence.updateItem(command);
        });
    }

};

exports.deleteStaff = function (command) {
    var rules = service.createRules({
        id: Joi.string().guid().required()
    });
    service.validateSync(command, rules);
    constants.staffs[command.id] = undefined;
     return persistence.deleteItem(command);
};
exports.deactiveStaff = function (command) {
    var rules = service.createRules({
        id: Joi.string().guid().required()
    });
    service.validateSync(command, rules);
    constants.staffs[command.id] = undefined;
    return persistence.getItem(command).then((res)=>{
        res.active = 0;
        return persistence.updateItem(res);
    });
};
exports.activeStaff = function (command) {
    var rules = service.createRules({
        id: Joi.string().guid().required()
    });
    service.validateSync(command, rules);
    constants.staffs[command.id] = undefined;
    return persistence.getItem(command).then((res)=>{
        res.active = 1;
        return persistence.updateItem(res);
    });
};
var encryptPassword = function (password) {
    return bcrypt.genSaltAsync(process.env.NODE_ENV == 'production' ? 10 : 5).then(function (salt) {
        return bcrypt.hashAsync(password, salt);
    }).then(function (hash) {
        return hash;
    });
};

exports.getStaffById = function (id) {
    // return persistence.getItem({userId: command.userId, storeId: command._userContext.id}).then((res)=>{
    //     return new Promise((reslove,reject)=> {
    //         if (res === null) {
    //             reslove({errMsg: 'Id is not exist in this store.'});
    //         } else {
    //             reslove({result: res});
    //         }
    //     });
    //});
    return new Promise((resolve) => {
        if (constants.staffs[id]) {
            resolve(constants.staffs[id]);
        }else{
            var command = service.validateListCommand({});
            command.cid = id;
            command.all = true;
            persistence.getItem(command).then((res) => {
                if (res) {
                    constants.staffs[res.cid] = res;
                    resolve(res);
                }else{
                    resolve({});
                }
            });
        }
    });
};
exports.getStaffByIds = function (ids) {
    return new Promise((resolve) => {
        var items = [];
        ids.forEach((id, i) => {
            if (constants.staffs[id]) {
                items.push(constants.staffs[id]);
                ids.splice(i, 1);
            }
        });
        if (ids && ids.length > 0) {
            var command = service.validateListCommand({});
            command.cid = {$in: ids};
            command.all = true;
            persistence.listItems(command).then((res) => {
                if (res) {
                    res.forEach(item => {
                        constants.staffs[item.cid] = item;
                        items.push(item);
                    });
                }
                resolve(items);
            });
        } else {
            resolve(items);
        }
    });
    //
    //
    // var command = service.validateListCommand({});
    // command.cid = { $in : ids };
    // command.all = true;
    // return persistence.listItems(command);
};
exports.namesValidation = namesValidation = Joi.array().items(Joi.object().keys({
    text: Joi.string().required(),
    culture: Joi.string()
}).required());


exports.cacheStaffs = function (command) {
    return new Promise((resolve) => {
        command.all=true;
        persistence.listItems(command).then((res) => {
            if (res) {
                res.forEach(item => {
                    constants.staffs[item.cid] = item;
                });
            }
        });
        resolve({});
    });
};