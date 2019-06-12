var constants = require('../application/constants');
var objects = require('../objects');
var bcrypt = require('bcryptjs');
var Joi = require('joi');
var Persistence = require('../application/persistence');
var persistence = new Persistence(constants.entityTypes.stores);
var genUtils = require('../application/genUtils');
var service = require('../application/serviceUtils');
var newPrincipalService = require('../base_service/newPrincipalService');
var newStaffService = require('../base_service/staffService');



exports.createStore = function (command, options) {
    return encryptPassword(command.barCode).then(function (hash) {
        command.barCode = hash;
        return persistence.createItem({
            cid:genUtils.createTimeUuid(),
            names:command.names,
            email:command.email,
            city: JSON.parse(command.expansion).city,
            location:JSON.parse(command.expansion).location,
            country:JSON.parse(command.expansion).country,
            province:JSON.parse(command.expansion).province,
            phone:JSON.parse(command.expansion).phoneNumber,
            postCode:JSON.parse(command.expansion).postCode,
            barCode:command.barCode,
            creatorId:command._userContext.id,
            active:1,
            deleted:0
        },{
            uniqueQuery:{email:command.email, deleted:0}
        })
    });
};

/*exports.signUp = function (command) {
    var schema = {
        username: Joi.string().required().email(),
        password: Joi.string().required().min(7)
    };
    delete command._userContext;
    service.validateSync(command, schema, {userContextRequired: false});
    var emailStruct = genUtils.getEmailStruct(command.username);
    return organisationService.getOrganisation({domain: emailStruct.domain}, {userContextRequired: false}).then(org => {
        if (!org) throw new service.ValidationError('Organisation is not registered.');
        return principalService.checkExists(command.username).then(function (exists) {
            if (exists) throw new service.ValidationError('Email already exists.');
            return principalService.createPrincipal(command.username, command.password, command._userContext);
        }).then(function (res) {
            var store = {
                email: command.username,
                names: [{text: emailStruct.address}],
                organisationId: org.id
            };
            return exports.createStore(store, {userContextRequired: false});
        }).then(function (res) {
            return userService.signIn(command);
        })
    });
};*/

exports.updateStore = function (command) {
    if(command.id){
        command.cid = command.id;
    }
    if (command.barCode.length > 30) {        
        constants.stores[command.cid] = undefined;
        return persistence.updateItem(command);
    } else {
        return encryptPassword(command.barCode).then(function (hash) {
            command.barCode = hash;        
            constants.stores[command.cid] = undefined;
            return persistence.updateItem(command);
        });
    }

};

// // 已更新
// first time login
exports.getStore = function (command) {
    if(command.id){
        command.cid = command.id
    }
    command.all=true;
    return persistence.getItem(command, {responseObject: objects.store_S});
};

exports.listStores = function (command) {
    command.all=true;
    return persistence.listItems(command, {responseObject: objects.store_S});
};

//deleted
/**
 * do de-active action
 * @param command
 * @returns {*|Promise.<TResult>}
 */
exports.deleteStore = function (command) {
    if(command.id){
        command.cid = command.id;
    }
    constants.stores[command.id]=undefined;
    return persistence.deleteItem(command);
};
exports.deactiveStore = function (command) {

    if(command.id){
        command.cid = command.id;
    }
    constants.stores[command.id]=undefined;
    return persistence.getItem(command).then((res)=>{
        res.active = 0;
        delete res.shortCode;
        return persistence.updateItem(res);
    });
};
exports.activeStore = function (command) {
    if(command.id){
        command.cid = command.id;
    }
    constants.stores[command.id]=undefined;
    return persistence.getItem(command).then((res)=>{
        res.active = 1;
        delete res.shortCode;
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

exports.namesValidation = namesValidation = Joi.array().items(Joi.object().keys({
    text: Joi.string().required(),
    culture: Joi.string()
}).required());


exports.getStoreByIds = function (ids) {
    if(ids.length==0||ids[0]==''||!ids[0]){
        return new Promise((resolve)=> {
            resolve([{
                id:'',
                names: [{"text": "Head Office"},{"text": "Head Office"}],
                shortCode: {text: 'HQ'},
                expansion: '{"city":"Head Office","location":"Head Office","country":"Head Office","province":"Head Office","phoneNumber":"","postCode":""}',
                email: 'lambtonquay@brand.com',
                city: 'Head Office',
                active: 1,
                deleted: 0,
                country: 'Head Office',
                location: 'Head Office',
                phone: '',
                postCode: '',
                createdAt: 'Wed Feb 15 2017 10:56:31 GMT+1300 (NZDT)',
                updatedAt: 'Thu Feb 16 2017 10:31:00 GMT+1300 (NZDT)',
                creatorId: 'seekstock'
            }])
        });
    }else{
        return new Promise((resolve) => {
            var items = [];
            ids.forEach((id, i) => {
                if (constants.stores[id]) {
                    items.push(constants.stores[id]);
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
                            constants.stores[item.cid] = item;
                            items.push(item);
                        });
                    }
                    resolve(items);
                });
            } else {
                resolve(items);
            }
        });
    }

};

exports.cacheStores = function (command) {
    return new Promise((resolve) => {

        command.all=true;
        persistence.listItems(command).then((res) => {
            if (res) {
                res.forEach(item => {
                    constants.stores[item.cid] = item;
                });
            }
        });
        resolve({});
    });
};