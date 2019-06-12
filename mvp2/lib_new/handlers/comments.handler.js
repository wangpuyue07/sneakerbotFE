/**
 * Created by Anthony on 2017/2/16.
 */
var events = require('../application/eventBroker');
var Persistence = require('../application/persistence');
var constants = require('../application/constants');
var persistence = new Persistence(constants.entityTypes.comments);
var notificatonService = require('../base_service/notificationService');
var feedbackService = require('../mid_service/feedbackService');
var suggestionService = require('../base_service/suggestionService');
var a_activityCountService = require('../base_service/a_activityCount');
var a_classifyfaceCntService = require('../base_service/a_classifyfaceCntServie');
var a_staffActCntService = require('../base_service/a_staffActCntService');
var staffService = require('../base_service/staffService');
var storeService = require('../base_service/storeService');

events.on(persistence.events.onCreated, function (data) {
    switch(data.current.topic){
        case 'feedback':
             feedbackService.getFeedback({cid:data.current.activityId}).then(fb=>{
                 if(fb.staffId!=data.current.staffId) {
                     notificatonService.createNotification({
                         recipientId: fb.staffId,
                         content: data.current.content,
                         commentId: data.current.id,
                         productId: fb.productId,
                         createStoreId:data.current.storeId[0],
                         subjectId: fb.id,
                         subjectType: 'feedback',
                         notificationType: constants.notificationType.commented,
                         read: 0,
                         creatorId: data.current.staffId
                     }).catch(err => {
                         console.log(err)
                     });
                 }
                 data.current.mentionId.forEach(mentionId=>{
                     notificatonService.createNotification({
                         recipientId:mentionId,
                         content:data.current.content,
                         commentId: data.current.id,
                         productId: fb.productId,
                         createStoreId:data.current.storeId[0],
                         subjectId:fb.id,
                         subjectType:'feedback',
                         notificationType:constants.notificationType.mentioned,
                         read:0,
                         creatorId:data.current.staffId
                     }).catch(err=>{console.log(err)});
                 });
                 if (fb != null) {
                     var command = {
                         subjectId: data.current.activityId,
                         productId: fb.productId,
                         numType: 'comment',
                         type: 'feedback',
                         num: 1,
                         updateFiled: ['commentNum'],
                         face: fb.face,
                         topic: fb.tags[0],
                         subTopic: fb.topic[0]
                     };
                     a_activityCountService.updateNum(command);
                     a_classifyfaceCntService.updateNum(command);
                 }
            });
            break;
        case 'suggestion':
            suggestionService.getSuggestion({id:data.current.activityId}).then(sg=>{
                if(sg.staffId!=data.current.staffId){
                    notificatonService.createNotification({
                        recipientId:sg.staffId,
                        content:data.current.content,
                        commentId: data.current.id,
                        //productId: sg.productId,
                        createStoreId:data.current.storeId[0],
                        subjectId:sg.id,
                        subjectType:'suggestion',
                        notificationType:constants.notificationType.commented,
                        read:0,
                        creatorId:data.current.staffId,
                    }).catch(err=>{console.log(err)});
                }
                data.current.mentionId.forEach(mentionId=>{
                    notificatonService.createNotification({
                        recipientId:mentionId,
                        content:data.current.content,
                        commentId: data.current.id,
                       // productId: sg.productId,
                        createStoreId:data.current.storeId[0],
                        subjectId:sg.id,
                        subjectType:'suggestion',
                        notificationType:constants.notificationType.mentioned,
                        read:0,
                        creatorId:data.current.staffId
                    }).catch(err=>{console.log(err)});
                });
                if (sg != null) {
                    var command = {
                        subjectId: data.current.activityId,
                        productId: sg.productId,
                        numType: 'comment',
                        type: 'suggestion',
                        num: 1,
                        updateFiled: ['commentNum']
                    };
                    a_activityCountService.updateNum(command);
                    // a_classifyfaceCntService.updateNum(command);
                }
            });
            break;
    }
    storeService.getStoreByIds([data.current.storeId]).then(store => {
        var region = store[0].city;

        staffService.getStaff({
            cid: data.current.staffId}).then(res => {
            if (res != null) {
                var command = {
                    staffId: res.cid,
                    storeId: res.storeId?res.storeId:'',
                    role: res.role_ab,
                    numType: 'comment',
                    region: region,
                    num: 1
                };
                a_staffActCntService.updateNum(command);
            }
        });
    })
});


events.on(persistence.events.onDeleted,function(data) {
 if(data.current.length!=0){
     switch(data.current[0].topic){
         case 'feedback':
             feedbackService.getFeedback({cid:data.current[0].activityId}).then(fb=>{
                 if (fb != null) {
                     var command = {
                         subjectId: data.current[0].activityId,
                         productId: fb.productId,
                         numType: 'comment',
                         type: 'feedback',
                         num: -1,
                         updateFiled: ['commentNum'],
                         face: fb.face,
                         topic: fb.tags[0],
                         subTopic: fb.topic[0]
                     };
                     a_activityCountService.updateNum(command);
                     a_classifyfaceCntService.updateNum(command);
                 }
             });
             break;
         case 'suggestion':
             suggestionService.getSuggestion({id:data.current[0].activityId}).then(sg=>{
                 if (sg != null) {
                     var command = {
                         subjectId: data.current[0].activityId,
                         productId: sg.productId,
                         numType: 'comment',
                         type: 'suggestion',
                         num: -1,
                         updateFiled: ['commentNum']
                     };
                     a_activityCountService.updateNum(command);
                 }
             });
             break;
     };
     storeService.getStoreByIds([data.current[0].storeId]).then(store => {
         staffService.getStaff({
             cid: data.current[0].staffId,
             storeId: data.current[0].storeId}).then(res => {
             if (res != null) {
                 var command = {
                     staffId: res.cid,
                     storeId: res.storeId,
                     role: res.role_ab,
                     numType: 'comment',
                     region: store[0].city,
                     num: -1
                 };
                 a_staffActCntService.updateNum(command);
             }
         });
     });
     notificatonService.deleteNotifications({commentId:data.current[0].cid});
 }

});