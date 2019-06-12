var suggestionService = require('../base_service/suggestionService');
var feedbackService = require('../mid_service/feedbackService');
var productService = require('../base_service/productService');
var staffService = require('../base_service/staffService');
var storeService = require('../base_service/storeService');
var commentService = require('../base_service/commentService');
var service = require('../application/serviceUtils');
var Joi = require('joi');
//var activityService = require('./activity/activityService');
var sql = require('../application/providers/sqlClient');
var genUtils = require('../application/genUtils');
var _ = require('lodash')
var constants = require('../application/constants');
//add by mia
var requestFeedback = require('../base_service/requestFeedbackService');

var Persistence = require('../application/persistence');
var persistence = new Persistence(constants.entityTypes.notifications);
var util = require('util');


exports.markAsRead = function (command) {
    if (command.notificationIds.length < 1) return new Promise(resolve => {
        resolve();
    });
    var ids = command.notificationIds.map(x => {
        return "'" + x + "'"
    }).join(',');
    return sql.db.query(util.format("UPDATE notifications SET `read`=true where cid in(%s);", ids));
};

exports.createNotification = function (command) {
    var schema = {
        recipientId: Joi.string().guid().required(),
        subjectId: Joi.string().guid().required(),
        notificationType: Joi.string().required(),
        creatorId: Joi.string().guid().required()
    };
    service.validateSync(command, schema, {userContextRequired: false});
    command.cid = genUtils.createTimeUuid();
    return persistence.createItem(command);
};

exports.listNotifications = function (command) {
    var monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    var schema = {
        recipientId: Joi.string().guid().required(),
        since: Joi.date().default(monthAgo),
        hydrate: Joi.boolean()
    };
    service.validateListCommand(command, schema, {userContextRequired: false});
    delete command.hydrate;
    delete command._userContext;
    return persistence.listItems(command).then(function (res) {
        var result=[];
        var acivityTasks=[];
        var creatorTasks=[];
        var createStoreTasks=[];
        var commentTasks=[];
        var productTasks = [];
        res.forEach(item=>{
            if(item.subjectType=='suggestion'){
                acivityTasks.push(suggestionService.getSuggestion({cid:item.subjectId}));
                productTasks.push('');
            }else if(item.subjectType == 'feedback'){
                acivityTasks.push(feedbackService.getFeedback({cid:item.subjectId}));
                productTasks.push(productService.getProductBySku(item.productId));
            }else{
                acivityTasks.push(requestFeedback.getRequestFeedback({cid:item.subjectId}));
                productTasks.push(productService.getProductBySku(item.productId));
            }

            creatorTasks.push(staffService.getStaff({cid:item.creatorId}));
            createStoreTasks.push(storeService.getStoreByIds([item.createStoreId]));
            commentTasks.push(commentService.getComment({cid:item.commentId}));

            result.push({
                id:item.cid,
                notificationType: item.notificationType,
                read: item.read,
                subjectType:item.subjectType,
                updatedAt: item.updatedAt,
                createdAt: item.createdAt
            });
        });
        var tasks=acivityTasks.concat(creatorTasks).concat(createStoreTasks).concat(commentTasks).concat(productTasks);

        return Promise.all(tasks).then(res=>{
            var temp=[];
            result.forEach((item,i)=>{
                item.activity=res[i];
                item.creator=res[i+result.length];
                item.createStore=res[i+result.length*2][0];
                item.comment = res[i+result.length*3];
                if(item.subjectType!='suggestion'){
                    item.product = res[i+result.length*4];
                }
                if(item.creator){
                    temp.push(item);
                }

            });
            return result;
        })
    });
};

exports.deleteNotifications = function (command) {
    return persistence.deleteItems(command);
};
