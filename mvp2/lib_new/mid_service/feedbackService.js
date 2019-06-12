// var objects = require('../application/objects');
var Joi = require('joi');
// var Persistence = require('../application/persistence');
var genUtils = require('../application/genUtils');
var constants = require('../application/constants');
var service = require('../application/serviceUtils');
var _ = require('lodash');
var async = require('async');
var sql = require('../application/providers/sqlClient');

var feedbackFitService = require('../base_service/feedback_fit_service');
var feedbackPriceService = require('../base_service/feedback_price_service');
var feedbackStyleService = require('../base_service/feedback_style_service');
var feedbackStockService = require('../base_service/feedback_stock_service');
var feedbackQualityService = require('../base_service/feedback_quality_service');
var productService = require('../base_service/productService');
var appliesService = require('../base_service/appliesService');
var a_staffActCntService = require('../base_service/a_staffActCntService');
var a_classifyfaceCntServie = require('../base_service/a_classifyfaceCntServie');
var storeService = require('../base_service/storeService');
var staffService = require('../base_service/staffService');
// add by mia
var notificationService = require('../base_service/notificationService');
var requestFeedbackService = require('../base_service/requestFeedbackService');

// service emit
function getFeedbackType(type) {
    switch (type) {
        case 'fit':
            return feedbackFitService;
            break;
        case 'price':
            return feedbackPriceService;
            break;
        case 'style':
            return feedbackStyleService;
            break;
        case 'stock':
            return feedbackStockService;
            break;
        case 'quality':
            return feedbackQualityService;
            break;
    }
};
function creatChildFeedback(type, tag, commanInfos, command) {
    var myCommand = {
        cid: service.createTimeUuid(),
        face: commanInfos.face,
        staffId: command._userContext.staffId,
        productId: command.sku,
        topic: commanInfos.topic.tags,
        tag: commanInfos.topic.topicTag,
        img: commanInfos.topic.img ? commanInfos.topic.img : "",
        storeId: command._userContext.permission_level > 2 ? '' : command._userContext.id,
        description: commanInfos.topic.tellUsMore ? commanInfos.topic.tellUsMore : "",
        appliesTo: commanInfos.appliesTo,
        // appliesToSKU : command.appliesToSKU,
        deleted: 0
    };
    switch (tag) {
        case 'fit':
            myCommand.where = commanInfos.topic.where ? commanInfos.topic.where : "";
            break;
        case 'price':
            myCommand.where = commanInfos.topic.where ? commanInfos.topic.where : "";
            break;
        case 'style':
            myCommand.what = commanInfos.topic.what ? commanInfos.topic.what : "";
            break;
        case 'stock':
            myCommand.overstocked = commanInfos.topic.overstocked ? commanInfos.topic.overstocked : "";
            myCommand.understocked = commanInfos.topic.understocked ? commanInfos.topic.understocked : "";
            myCommand.stockHighTUM = commanInfos.topic.stockHighTUM ? commanInfos.topic.stockHighTUM : "";
            myCommand.stockLowTUM = commanInfos.topic.stockLowTUM ? commanInfos.topic.stockLowTUM : "";
            myCommand.description = commanInfos.topic.tellUsMore ? commanInfos.topic.tellUsMore : "";
            break;
        case 'quality':
            myCommand.where = commanInfos.topic.where ? commanInfos.topic.where : "";
            myCommand.what = commanInfos.topic.what ? commanInfos.topic.what : "";
            myCommand.when = commanInfos.topic.when ? commanInfos.topic.when : "";
            break;
    }
    //if stock's topic's tags include two tags, it should insert two infos
    if (type == 'stockLow') {
        myCommand.stockHighTUM = "";
        myCommand.overstocked = "";
        myCommand.topic = ['Too Low'];
        return getFeedbackType(tag).createFeedback(myCommand);
    } else if (type == 'stockHigh') {
        myCommand.stockLowTUM = "";
        myCommand.understocked = "";
        myCommand.topic = ['Too High'];
        return getFeedbackType(tag).createFeedback(myCommand);
    } else {
        return getFeedbackType(tag).createFeedback(myCommand);
    }
}

// function generateTestData(command){
//     for(var i = 0; i < 100; i++){
//         console.log(i)
//         var checkStyleAddSug = false;
//         var classifyFaceCntFiledList = [];//in order to update classifyFaceCounts list infos
//         var myTags  = {};
//         var description = JSON.parse(command.description);
//         var tasks = [];
//         // if(_.indexOf(command.tags, 'stock') >= 0){
//         command.tags.forEach(myTag => {
//             if(myTag == 'stock'){
//                 description['stock'].topic.tags.forEach(childTag=>{
//                     if(childTag == "Too High"){
//                         myTags['stockHigh'] = 'stock';
//                         classifyFaceCntFiledList.push(myTag + "_toohigh_" + description[myTag].face);
//                     }else if(childTag == "Too Low"){
//                         myTags['stockLow'] = 'stock';
//                         classifyFaceCntFiledList.push(myTag + "_toolow_" + description[myTag].face);
//                     }else {
//                         myTags[myTag] = myTag;
//                         classifyFaceCntFiledList.push(myTag + "_" + description[myTag].topic.tags +  "_" + description[myTag].face);
//                     }
//                 });
//             }else {
//                 myTags[myTag] = myTag;
//                 classifyFaceCntFiledList.push(myTag + "_" + description[myTag].topic.tags +  "_" + description[myTag].face);
//             }
//             if(myTag == 'style' && (description[myTag].topic.tellUsMore != '' || description[myTag].topic.img != '')){
//                 checkStyleAddSug = true;
//             }
//         });
//         Object.keys(myTags).forEach(type => {
//             var tag = myTags[type];
//             tasks.push(creatChildFeedback(type, tag, description[tag],command).then(res =>
//             {
//                 var myAppliesToSKU;
//                 if(type == 'stockLow'){
//                     myAppliesToSKU = description[tag].appliesLowToSKU;
//                 }else if(type == 'stockHigh'){
//                     myAppliesToSKU = description[tag].appliesHighToSKU;
//                 }else{
//                     myAppliesToSKU = description[tag].appliesToSKU;
//                 }
//                 if(myAppliesToSKU && myAppliesToSKU.length > 0) {
//                     var childTasks = [];
//                     myAppliesToSKU.forEach(sku => {
//                         var myCommand = {
//                             cid: service.createTimeUuid(),
//                             feedbackId: res.cid,
//                             product_info_id: sku,
//                             type: tag
//                         };
//                         childTasks.push(appliesService.createApply(myCommand));
//                     });
//                     Promise.all(childTasks).then(cres=>{
//                         // return cres;
//                     }).catch(e=>{
//                         console.log(e);
//                     });
//                 }else{
//                     // return res;
//                 }
//             }));
//         });
//
//         var num =  Object.keys(myTags).length;
//         Promise.all(tasks).then(res => {
//             //update products
//             productService.getMyProductBySku(command.sku).then(res => {
//                 if(!res){
//                     productService.createProduct(command);
//                 }else{
//                     productService.updateFBDate(command.sku);
//                 }
//             }).then(res=>{
//
//                 var storeId = command._userContext.permission_level>2?'':command._userContext.id;
//                 var staffId = command._userContext.staffId;
//                 //create staffActCnt infos
//                 updateStaffActCnt(storeId, staffId, 'feedback', num).then(res => {
//                     if(_.indexOf(command.tags,'style') >= 0 && checkStyleAddSug){
//                         updateStaffActCnt(storeId, staffId, 'suggestion', 1);
//                     }
//                 }).then(res=>{
//                     a_classifyfaceCntServie.updateNum({
//                         productId: command.sku,
//                         updateFiled: classifyFaceCntFiledList,
//                         num: 1
//                     });
//                 });
//                 // return res;
//             });
//         }).catch(e=>{
//             console.log(e);
//         });
//     }
// }
exports.createFeedback = function (command) {

    // generateTestData(command);

    var checkStyleAddSug = false;
    var classifyFaceCntFiledList = [];//in order to update classifyFaceCounts list infos
    var myTags = {};
    var description = JSON.parse(command.description);
    var tasks = [];
    // if(_.indexOf(command.tags, 'stock') >= 0){
    command.tags.forEach(myTag => {
        if (myTag == 'stock') {
            description['stock'].topic.tags.forEach(childTag=> {
                if (childTag == "Too High") {
                    myTags['stockHigh'] = 'stock';
                    classifyFaceCntFiledList.push(myTag + "_toohigh_" + description[myTag].face);
                } else if (childTag == "Too Low") {
                    myTags['stockLow'] = 'stock';
                    classifyFaceCntFiledList.push(myTag + "_toolow_" + description[myTag].face);
                } else {
                    myTags[myTag] = myTag;
                    classifyFaceCntFiledList.push(myTag + "_" + description[myTag].topic.tags + "_" + description[myTag].face);
                }
            });
        } else {
            myTags[myTag] = myTag;
            classifyFaceCntFiledList.push(myTag + "_" + description[myTag].topic.tags + "_" + description[myTag].face);
        }
        if (myTag == 'style' && (description[myTag].topic.tellUsMore != '' || description[myTag].topic.img != '')) {
            checkStyleAddSug = true;
        }
    });
    Object.keys(myTags).forEach(type => {
        var tag = myTags[type];
        tasks.push(creatChildFeedback(type, tag, description[tag], command).then(res => {
            var myAppliesToSKU;
            if (type == 'stockLow') {
                myAppliesToSKU = description[tag].appliesLowToSKU;
            } else if (type == 'stockHigh') {
                myAppliesToSKU = description[tag].appliesHighToSKU;
            } else {
                myAppliesToSKU = description[tag].appliesToSKU;
            }
            if (myAppliesToSKU && myAppliesToSKU.length > 0) {
                var childTasks = [];
                myAppliesToSKU.forEach(sku => {
                    var myCommand = {
                        cid: service.createTimeUuid(),
                        feedbackId: res.cid,
                        product_info_id: sku,
                        type: tag
                    };
                    childTasks.push(appliesService.createApply(myCommand));
                });
                return Promise.all(childTasks).then(cres=> {
                    return cres;
                }).catch(e=> {
                    console.log(e);
                });
            } else {
                return res;
            }
        }));
    });

    var num = Object.keys(myTags).length;
    return Promise.all(tasks).then(res => {
        //update products
        createNoti(command);
        return productService.getMyProductBySku(command.sku).then(res => {
            if (!res) {
                return productService.createProduct(command);
            } else {
                return productService.updateFBDate(command.sku);
            }
        }).then(res=> {

            var storeId = command._userContext.permission_level > 2 ? '' : command._userContext.id;
            var staffId = command._userContext.staffId;
            //create staffActCnt infos
            updateStaffActCnt(storeId, staffId, 'feedback', num).then(res => {
                if (_.indexOf(command.tags, 'style') >= 0 && checkStyleAddSug) {
                    updateStaffActCnt(storeId, staffId, 'suggestion', 1);
                }
            }).then(res=> {
                a_classifyfaceCntServie.updateNum({
                    productId: command.sku,
                    updateFiled: classifyFaceCntFiledList,
                    num: 1
                });
            });
            return res;
        });
    }).catch(e=> {
        console.log(e);
    });
    // return "";
};

exports.deleteFeedback = function (command) {
    var rules = {
        id: Joi.string().guid().required(),
        type: Joi.string().required()
    };
    service.validateSync(command, rules);
    return getFeedbackType(command.type).deleteFeedback({id: command.id});
};

exports.getFeedback = function (command) {
    if (command.type) {
        getFeedbackType(command.type).getFeedback(command);
    } else {
        var tasks = [];
        ['fit', 'price', 'quality', 'stock', 'style'].forEach((type)=> {
            tasks.push(getFeedbackType(type).getFeedback(command))
        });
        return Promise.all(tasks).then(res=> {
            return _.compact(res)[0];
        })
    }

};

exports.listFeedback = function (command) {
    getFeedbackType(command.type).listFeedback(command);
};

// exports.getFeedbackById = function (ids) {
//     var command = service.validateListCommand({});
//     getFeedbackType(command.type).getFeedbackById(ids)
// };
function createResolverFunc(type, ids) {
    return function (cb) {
        getFeedbackType(type).getFeedbackByIds(ids).then(group => {
            cb(null, group);
        });
    }
}
/**
 * get all feedback infors from ids
 * @param ids
 * @returns {*|Promise.<TResult>}
 */
exports.getFeedbackByIds = function (ids) {
    var tasks = [];
    tasks.push(createResolverFunc('fit', ids));
    tasks.push(createResolverFunc('price', ids));
    tasks.push(createResolverFunc('quality', ids));
    tasks.push(createResolverFunc('stock', ids));
    tasks.push(createResolverFunc('style', ids));
    var resArray = [];
    return new Promise((resolve, reject) => {
        async.parallel(tasks, function (err, results) {
            if (err) return reject(new Error(err));
            results.forEach(res=> {
                res.forEach(resItem=> {
                    resArray.push(resItem);
                });
            });
            return resArray;
        });
    });
};


/*
 exports.deleteFeedback = function (command) {
 service.validateUuidId(command);
 return persistence.deleteItem(command);
 };*/

/*
 * feedback interface _
 * @parameter: type: which feedback
 * @command: what is included.
 * */

/**
 * update staffActCnt infos
 * @param storeId
 * @param staffId
 * @param type
 * @param num
 */
var updateStaffActCnt = function (storeId, staffId, type, num) {
    return storeService.getStoreByIds([storeId]).then(storeItem=> {
        var region = storeItem[0].city;
        return staffService.getStaffByIds([staffId]).then(staffItem=> {
            return a_staffActCntService.updateNum({
                staffId: staffId,
                storeId: storeId,
                role: staffItem[0].role_ab,
                region: region,
                num: num,
                numType: type
            });
        });
    });
};

// add by mia: for notifaction under requestFeedback
var createNoti = function (command) {
    requestFeedbackService.listRequestFeedbacks({sku: command.sku}).then(requestFeedback => {
        requestFeedback.map(item => {
            var time = new Date().getTime() - new Date(item.createdAt).getTime();
            var createdDays = Math.floor(time / (24 * 3600 * 1000));
            notificationService.listNotifications({
                recipientId: item.staffId,
                notificationType: constants.notificationType.responseForRequest,
                productId: command.sku
            })
                .then((isExist) => {
                    if (isExist.length == 0) {
                        if ((item.staffId != command._userContext.staffId && createdDays <= 3)) {
                            var notificationItem = {
                                recipientId: item.staffId,
                                createStoreId: command._userContext.role!='store'?'':command._userContext.id,
                                subjectId: '-1',
                                notificationType: constants.notificationType.responseForRequest,
                                read: 0,
                                creatorId: command._userContext.staffId,
                                subjectType: 'feedback',
                                productId: command.sku
                            };
                            notificationService.createNotification(notificationItem);
                        }
                    }
                }).catch(err=>console.log(err))
        });

    })
        .catch(err=>{console.log('asd',err)});
};