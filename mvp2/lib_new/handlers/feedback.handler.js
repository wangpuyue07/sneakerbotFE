var events = require('../application/eventBroker');
var Persistence = require('../application/persistence');
var constants = require('../application/constants');
var genUtils = require('../application/genUtils');
var fitPersistence = new Persistence(constants.entityTypes.feedback_fits);
var pricePersistence = new Persistence(constants.entityTypes.feedback_prices);
var qualityPersistence = new Persistence(constants.entityTypes.feedback_qualitys);
var stockPersistence = new Persistence(constants.entityTypes.feedback_stocks);
var stylePersistence = new Persistence(constants.entityTypes.feedback_styles);
var voteService = require('../base_service/voteService');
var commentService = require('../base_service/commentService');
var appliesService = require('../base_service/appliesService');
var suggestionService = require('../base_service/suggestionService');
var a_staffActCntService = require('../base_service/a_staffActCntService');
var a_classifyfaceCntServie = require('../base_service/a_classifyfaceCntServie');
var storeService = require('../base_service/storeService');
var staffService = require('../base_service/staffService');
var a_activityCount = require('../base_service/a_activityCount');
// add by mia
var requestFeedback = new Persistence(constants.entityTypes.requestFeedback);
var notificationService = require('../base_service/notificationService');
var requestFeedbackService = require('../base_service/requestFeedbackService');
//
/**
 * delete info which linked to feedback
 * @param data
 */
var doDelete = function (data) {
    voteService.deleteVote({activityId: data.current.cid});
    commentService.deleteComment({activityId: data.current.cid});
    appliesService.deleteApply({feedbackId: data.current.cid});
};
events.on(fitPersistence.events.onDeleted, function (data) {
    notificationService.deleteNotifications({subjectId:data.current.cid});
    constants.fit_feedback_bundle[data.current.pre.productId]=undefined;
    constants.fit_feedback[data.current.pre.cid]=undefined;
    doDelete(data);
    var storeId = data.current.pre.storeId;
    var staffId = data.current.pre.staffId;
    updateStaffActCnt(storeId, staffId, 'feedback', -1);
    a_classifyfaceCntServie.doUpdateNum({
        productId:data.current.pre.dataValues.productId,
        updateFiled:["fit_" + genUtils.PNAN.parse(data.current.pre.dataValues.topic)[0] + "_" + data.current.pre.dataValues.face],
        num: -1
    });
    a_activityCount.deleteActCnt({subjectId:data.current.cid});

});
events.on(pricePersistence.events.onDeleted, function (data) {
    notificationService.deleteNotifications({subjectId:data.current.cid});
    constants.price_feedback_bundle[data.current.pre.productId]=undefined;
    constants.price_feedback[data.current.pre.cid]=undefined;
    doDelete(data);
    var storeId = data.current.pre.storeId;
    var staffId = data.current.pre.staffId;
    updateStaffActCnt(storeId, staffId, 'feedback', -1);
    a_classifyfaceCntServie.doUpdateNum({
        productId:data.current.pre.dataValues.productId,
        updateFiled:["price_" + genUtils.PNAN.parse(data.current.pre.dataValues.topic)[0] + "_" + data.current.pre.face],
        num: -1
    });
    a_activityCount.deleteActCnt({subjectId:data.current.cid});
});
events.on(qualityPersistence.events.onDeleted, function (data) {
    notificationService.deleteNotifications({subjectId:data.current.cid});
    constants.quality_feedback_bundle[data.current.pre.productId]=undefined;
    constants.quality_feedback[data.current.pre.cid]=undefined;
    doDelete(data);

    var storeId = data.current.pre.storeId;
    var staffId = data.current.pre.staffId;
    updateStaffActCnt(storeId, staffId, 'feedback', -1);
    a_classifyfaceCntServie.doUpdateNum({
        productId:data.current.pre.productId,
        updateFiled:["quality_" + genUtils.PNAN.parse(data.current.pre.dataValues.topic)[0] + "_" + data.current.pre.face],
        num: -1
    });
    a_activityCount.deleteActCnt({subjectId:data.current.cid});
});
events.on(stockPersistence.events.onDeleted, function (data) {
    notificationService.deleteNotifications({subjectId:data.current.cid});
    constants.stock_feedback_bundle[data.current.pre.productId]=undefined;
    constants.stock_feedback[data.current.pre.cid]=undefined;
    doDelete(data);
    var storeId = data.current.pre.storeId;
    var staffId = data.current.pre.staffId;
    updateStaffActCnt(storeId, staffId, 'feedback', -1);
    a_classifyfaceCntServie.doUpdateNum({
        productId:data.current.pre.productId,
        updateFiled:["stock_" + genUtils.PNAN.parse(data.current.pre.dataValues.topic)[0] + "_" + data.current.pre.face],
        num: -1
    });
    a_activityCount.deleteActCnt({subjectId:data.current.cid});
});
events.on(stylePersistence.events.onDeleted, function (data) {
    notificationService.deleteNotifications({subjectId:data.current.cid});
    constants.style_feedback_bundle[data.current.pre.productId]=undefined;
    constants.style_feedback[data.current.pre.cid]=undefined;
    doDelete(data);
    var storeId = data.current.pre.storeId;
    var staffId = data.current.pre.staffId;
    updateStaffActCnt(storeId, staffId, 'feedback', -1);
    a_classifyfaceCntServie.doUpdateNum({
        productId:data.current.pre.productId,
        updateFiled:["style_" + genUtils.PNAN.parse(data.current.pre.dataValues.topic)[0] + "_" + data.current.pre.face],
        num: -1
    });
    a_activityCount.deleteActCnt({subjectId:data.current.cid});
});
/**
 * style check is need add suggestion
 */
events.on(stylePersistence.events.onCreated, function (data) {
    if (JSON.parse(data.current.description).style.topic.tellUsMore != '' || data.current.img != '') {
        suggestionService.createFeedbackSuggestion({
            cid: genUtils.createTimeUuid(),
            productId: data.current.productId,
            storeId: data.current.storeId,
            staffId: data.current.staffId,
            type: constants.suggestionType.styleSuggestion,
            tag: data.current.tag,
            topic: data.current.topic,
            appliesTo: JSON.parse(data.current.description).style.appliesTo,
            images: [data.current.img],
            description: JSON.parse(data.current.description).style.topic.tellUsMore,
        }).catch(err => {
            console.log(err)
        });
    }
    createActCnt(data);
    //createNoti(data);
});

events.on(fitPersistence.events.onCreated, function (data) {
    createActCnt(data);
    //createNoti(data);
});
events.on(pricePersistence.events.onCreated, function (data) {
    createActCnt(data);
    //createNoti(data);
});
events.on(qualityPersistence.events.onCreated, function (data) {
    createActCnt(data);
    //createNoti(data);
});
events.on(stockPersistence.events.onCreated, function (data) {
    createActCnt(data);
    //createNoti(data);
});



/**
 * update staffActCnt infos
 * @param storeId
 * @param staffId
 * @param type
 * @param num
 */
var updateStaffActCnt = function (storeId,staffId, type, num) {
    storeService.getStoreByIds([storeId]).then(storeItem=>{
        var region = storeItem[0].city;
        staffService.getStaffByIds([staffId]).then(staffItem=>{
            a_staffActCntService.updateNum({
                staffId:staffId,
                storeId:storeId,
                role:staffItem[0].role_ab,
                region:region,
                num: num,
                numType: type
            });
        });
    });
};
var createActCnt = function (data) {
    storeService.getStoreByIds([data.current.storeId]).then(store => {
        a_activityCount.createActCnt({
            cid: genUtils.createTimeUuid(),
            subjectId:data.current.cid,
            type:"feedback",
            face: data.current.face,
            topic: data.current.tags[0],
            subTopic: data.current.topic[0],
            productId: data.current.productId,
            region: store[0].city
        });
    });
};

// add by mia: for notifaction under requestFeedback
var createNoti = function(data){
   requestFeedbackService.getRequestFeedback({sku:data.current.sku}).then(requestFeedback =>{
       requestFeedback.map(item =>{
           var time = new Date(data.current.createdAt).getTime() -new Date(item.createdAt).getTime();
           var createdDays = Math.floor(time / (24 * 3600 * 1000));
           notificationService.listNotifications({recipientId:item.staffId, notificationType:constants.notificationType.responseForRequest, productId:data.current.sku})
               .then((isExist) => {
                       if(isExist.length == 0){
                           if ((item.staffId != data.current.staffId && createdDays <= 3)) {
                               var notificationItem = {
                                   recipientId: item.staffId,
                                   createStoreId: data.current.storeId,
                                   subjectId: data.current.id,
                                   notificationType: constants.notificationType.responseForRequest,
                                   read: 0,
                                   creatorId: data.current.staffId,
                                   subjectType: 'feedback',
                                   productId: data.current.sku
                               };
                               notificationService.createNotification(notificationItem);
                           }
                       }
               })
       });

   });
};