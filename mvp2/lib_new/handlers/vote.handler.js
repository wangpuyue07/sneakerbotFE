var events = require('../application/eventBroker');

var Persistence = require('../application/persistence');
var constants = require('../application/constants');
var votePersistence = new Persistence(constants.entityTypes.votes);
var notificationService = require('../base_service/notificationService');
var feedbackService = require('../mid_service/feedbackService');
var suggestionService = require('../base_service/suggestionService');
// var appliesService = require('../base_service/appliesService');
var voteService = require('../base_service/voteService');
var a_activityCountService = require('../base_service/a_activityCount');
var a_classifyfaceCntService = require('../base_service/a_classifyfaceCntServie');
var a_staffActCntService = require('../base_service/a_staffActCntService');
var staffService = require('../base_service/staffService');
var storeService = require('../base_service/storeService');
events.on(votePersistence.events.onCreated, function (data) {
    if (data.current.type == 'suggestion') {
        suggestionService.getSuggestion({cid: data.current.activityId}).then(res => {
            if (res.staffId != data.current.staffId) {
                var command = {
                    recipientId: res.staffId,
                    createStoreId: data.current.storeId,
                    subjectId: data.current.activityId,
                    subjectType: 'suggestion',
                    notificationType: constants.notificationType.liked,
                    read: 0,
                    creatorId: data.current.staffId
                };

                notificationService.createNotification(command);
            }
            if (res != null) {
                var command = {
                    subjectId: res.cid,
                    productId: res.productId,
                    numType: 'vote',
                    type: 'suggestion',
                    num: 1,
                    updateFiled: ['voteNum']
                };

                a_activityCountService.updateNum(command);
                 a_classifyfaceCntService.updateNum(command);
            }
        });
    } else {
        feedbackService.getFeedback({cid: data.current.activityId}).then(res => {
            if (res.staffId != data.current.staffId) {
                var command = {
                    recipientId: res.staffId,
                    createStoreId: data.current.storeId,
                    subjectId: data.current.activityId,
                    subjectType: 'feedback',
                    notificationType: constants.notificationType.liked,
                    read: 0,
                    creatorId: data.current.staffId,
                    productId:res.productId
                };
                notificationService.createNotification(command);
            }
            if (res != null) {
                var command = {
                    subjectId: data.current.activityId,
                    productId: res.productId,
                    numType: 'vote',
                    type: 'feedback',
                    num: 1,
                    updateFiled: ['voteNum']
                };
                a_activityCountService.updateNum(command);
                a_classifyfaceCntService.updateNum(command);
            }
        });
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
                    numType: 'vote',
                    region: region,
                    num: 1
                };
                a_staffActCntService.updateNum(command);
            }
        });
    })
});



events.on(votePersistence.events.onUpdated, function (data) {
    if(data.current.length==0) return;
    var num = 1;
    if(data.current.active == '0'){
        num = -1
    }
    if (data.current.type == 'suggestion') {
        suggestionService.getSuggestion({cid: data.current.activityId}).then(res => {
            if (res.staffId != data.current.staffId) {
                var command = {
                    recipientId: res.staffId,
                    createStoreId: data.current.storeId,
                    subjectId: data.current.activityId,
                    subjectType: 'suggestion',
                    notificationType: constants.notificationType.liked,
                    read: 0,
                    creatorId: data.current.staffId
                };

                notificationService.createNotification(command);
            }
            if (res != null) {
                var command = {
                    subjectId: res.cid,
                    productId: res.productId,
                    numType: 'vote',
                    type: 'suggestion',
                    num: num,
                    updateFiled: ['voteNum']
                };

                a_activityCountService.updateNum(command);
                // a_classifyfaceCntService.updateNum(command);
            }
        });
    } else {
        feedbackService.getFeedback({cid: data.current.activityId}).then(res => {
            if (res.staffId != data.current.staffId) {
                var command = {
                    recipientId: res.staffId,
                    createStoreId: data.current.storeId,
                    subjectId: data.current.activityId,
                    subjectType: 'feedback',
                    notificationType: constants.notificationType.liked,
                    read: 0,
                    creatorId: data.current.staffId
                };
                notificationService.createNotification(command);
            }
            if (res != null) {
                var command = {
                    subjectId: data.current.activityId,
                    productId: res.productId,
                    numType: 'vote',
                    type: 'feedback',
                    num: num,
                    updateFiled: ['voteNum']
                };
                a_activityCountService.updateNum(command);
                a_classifyfaceCntService.updateNum(command);
            }
        });
    }

    storeService.getStoreByIds([data.current.storeId]).then(str => {
        // var region = res.city;
        staffService.getStaff({
            cid: data.current.staffId,
            storeId: data.current.storeId}).then(res => {
            if (res != null) {
                var command = {
                    staffId: res.cid,
                    storeId: res.storeId,
                    role: res.role_ab,
                    numType: 'vote',
                    region: str[0].city,
                    num: num
                };
                a_staffActCntService.updateNum(command);
            }
        });
    })
});
