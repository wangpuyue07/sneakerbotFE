/**
 * Created by Anthony on 2017/4/3.
 */
var Joi = require('joi');
var Persistence = require('../application/persistence');
var constants = require('../application/constants');
var service = require('../application/serviceUtils');
var persistence = new Persistence(constants.entityTypes.requestFeedback);
var sql = require('../application/providers/sqlClient');
var config = require('../../config');
var mailgun = require('mailgun-js')({apiKey: config.mailgun.api_key, domain: config.mailgun.domain});
var mailcomposer = require('mailcomposer');
var template = require('../application/templateUtils');
var a_staffActCntService = require('../base_service/a_staffActCntService');
var storeService = require('../base_service/storeService');
var productService = require('../base_service/productService');
var staffService = require('../base_service/staffService');
var _ = require('lodash');
/*
 add by mia for notification;
* **/
var notifcationService = require('../base_service/notificationService');

exports.createRequestFeedback = function (data) {
    var command = data;
    command.staffId = command._userContext.staffId;
    command.storeId = '';
    command.cid = service.createTimeUuid();
    delete command._userContext;
    constants.requestFeedback[command.sku] = undefined;

    /*
     * add events for requestFeedback
     * */
    //


    return new Promise(function (resolve) {
        persistence.createItem(command).then(res => {
            constants.requestFeedback[command.sku] = undefined;
            if(process.env.HOST!='http://localhost:3000'){
                a_staffActCntService.listStaffActCnt({storeId: {$ne: ''}}).then(res => {
                    if (res && res.length > 0) {
                        var storeList = _.chain(res).groupBy("storeId").map(function (storeId, key) {
                            return [key, _.reduce(storeId, function (result, currentObject) {
                                return {
                                    storeId: currentObject.storeId,
                                    fdbSugNum: result.fdbSugNum + currentObject.fdbSugNum,
                                }
                            })];
                        }).object().value();
                        var storeListDesc = _.sortBy(storeList, function (item) {
                            return -item.fdbSugNum;
                        });
                        var staffList = _.chain(res).groupBy("staffId").map(function (staffId, key) {
                            return [key, _.reduce(staffId, function (result, currentObject) {
                                return {
                                    staffId: currentObject.staffId,
                                    storeId: currentObject.storeId,
                                    fdbSugNum: result.fdbSugNum + currentObject.fdbSugNum,
                                }
                            })];
                        }).object().value();
                        var staffListDesc = _.sortBy(staffList, function (item) {
                            return -item.fdbSugNum;
                        });
                    } else {
                        var staffListDesc = [];
                        var storeListDesc = [];
                    }
                    storeService.listStores({}).then(res => {
                        var result = {};
                        result.data = [];
                        var stores = res;
                        res.forEach(currentStore => {
                            var data = {};
                            data.storeName = currentStore.names[0].text;
                            data.storeRank = 'N/A';
                            data.staffId = 'N/A';
                            data.description = command.description;
                            data.creatorId = command.staffId;
                            data.email=currentStore.email;
                            storeListDesc.forEach((s, index) => {
                                if (currentStore.id == s.storeId) {
                                    data.storeRank = index + 1;
                                }

                            });
                            staffListDesc.forEach((s) => {
                                if (data.staffId == 'N/A' && currentStore.id == s.storeId) {
                                    data.staffId = s.staffId;
                                }
                            });
                            result.data.push(data);
                        });
                        if (staffListDesc.length > 5) staffListDesc.length = 5;
                        if (storeListDesc.length > 5) storeListDesc.length = 5;
                        result.storeListDesc = storeListDesc;
                        result.staffListDesc = staffListDesc;
                        res.forEach(currentStore => {
                            result.staffListDesc.forEach(d => {
                                if (d.storeId == currentStore.id) {
                                    d.storeName = currentStore.names[0].text;
                                    delete d.storeId;
                                }
                            })
                            result.storeListDesc.forEach(d => {
                                if (d.storeId == currentStore.id) {
                                    d.storeName = currentStore.names[0].text;
                                    delete d.storeId;
                                }
                            })
                        });
                        staffService.listStaff({}).then(res => {
                            res.forEach(currentStaff => {
                                result.staffListDesc.forEach(d => {
                                    if (d.staffId == currentStaff.id) {
                                        d.staffName = currentStaff.names[0].text;
                                        d.staffRole = currentStaff.role;
                                        d.staffRole_ab = currentStaff.role_ab;
                                        delete d.staffId;
                                    }
                                });
                                result.data.forEach(d => {
                                    if (d.staffId == currentStaff.id) {
                                        d.staffName = currentStaff.names[0].text;
                                        delete d.staffId;
                                    }
                                    if (d.creatorId == currentStaff.id) {
                                        d.creatorName = currentStaff.names[0].text;
                                        d.role = currentStaff.role;
                                        delete d.creatorId;
                                    }
                                })
                            });
                            productService.getProductBySku(command.sku).then(res => {
                                result.product = res;
                                result.data.forEach(data => {
                                    data.storeListDesc = result.storeListDesc;
                                    data.staffListDesc = result.staffListDesc;
                                    data.product = result.product;
                                    var mail = mailcomposer({
                                        from: 'hello@seekstock.com',
                                        to: [data.email,'support@seekstock.co.nz'],
                                        subject: 'Feedback Request From Head Office',
                                        html: template.requestFeedback(data)
                                    });
                                    mail.build(function (mailBuildError, message) {
                                        var dataToSend = {
                                            to: [data.email,'support@seekstock.co.nz'],
                                            message: message.toString('ascii')
                                        };
                                        mailgun.messages().sendMime(dataToSend, function (sendError, body) {
                                        });
                                    });
                                })
                            });


                        });


                    })
                });
            }
            // for notification
            staffService.listStaff({}).then(staffs =>{
                staffs.forEach(staff=>{
                    if(staff.permission_level<3){
                        var notificationItem = {
                            recipientId: staff.id,
                            createStoreId: res.storeId,
                            content:res.description,
                            subjectId: res.cid,
                            notificationType: constants.notificationType.requestFeedback,
                            read: 0,
                            creatorId: res.staffId,
                            subjectType:'requestFeedback',
                            productId: res.sku
                        };
                        notifcationService.createNotification(notificationItem);
                    }
                });
            });
            resolve(true);
        });

    })
};

exports.getRequestFeedback = function (command) {
    return new Promise(function(resolve,reject){
        /*if(constants.requestFeedback[command.sku]){
            resolve(constants.requestFeedback[command.sku]);
        }else{*/
            persistence.getItem(command).then(res=>{
                //constants.requestFeedback[command.sku]=res;
                resolve(res);
            });
       // }
    });


};

exports.listRequestFeedbacks = function (command) {
    return new Promise(function(resolve,reject){
        if(constants.requestFeedback[command.sku]){
            resolve(constants.requestFeedback[command.sku]);
        }else{
            persistence.listItems(command).then(res=>{
                constants.requestFeedback[command.sku]=res;
                resolve(res);
            })
        }
    });


};

exports.deleteRequestFeedback = function (command) {
    constants.requestFeedback[command.sku] = undefined;
    return persistence.deleteItem(command);
};


exports.listRequestFeedback = function (command) {
    return new Promise(function (resolve, reject) {
        if (constants.requestFeedback[command.sku]) {
            resolve(constants.requestFeedback[command.sku])
        } else {
            persistence.listItems(command).then(res => {
                constants.requestFeedback[command.sku] = res;
                resolve(res);
            })
        }
    });
};
