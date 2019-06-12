// var activityService = require('./activity/activityService');
var service = require('../application/serviceUtils');
var Joi = require('joi');
var sql = require('../application/providers/sqlClient');
var constants = require('../application/constants');
var Persistence = require('../application/persistence');
var async = require('async');
var _ = require('lodash');
var persistence = new Persistence(constants.entityTypes.staffActivityReads);
var feedbackService = require('../mid_service/feedbackService');
var feedbackFitService = require('../base_service/feedback_fit_service');
var feedbackPriceService = require('../base_service/feedback_price_service');
var feedbackStyleService = require('../base_service/feedback_style_service');
var feedbackStockService = require('../base_service/feedback_stock_service');
var feedbackQualityService = require('../base_service/feedback_quality_service');
var productService = require('../base_service/productService');
var activityService = require('../mid_service/activityService');
var staffService = require('../../lib_new/base_service/staffService');
var storeService = require('../../lib_new/base_service/storeService');
var suggestionService = require('../base_service/suggestionService');
var voteService = require('../base_service/voteService');
var requestFeedbackService = require('../base_service/requestFeedbackService');
var util = require('util');

/**
 * get child result list
 * @param type
 * @param comand
 */

var myentityResolver = {
    fit: function (command) {
        return feedbackFitService.listFeedback(command);
    },
    price: function (command) {
        return feedbackPriceService.listFeedback(command);
    },
    style: function (command) {
        return feedbackStyleService.listFeedback(command);
    },
    stock: function (command) {
        return feedbackStockService.listFeedback(command);
    },
    quality: function (command) {
        return feedbackQualityService.listFeedback(command);
    },
    product: function (ids) {
        return productService.getProductById(ids);
    },
    suggestion: function (command) {
        return suggestionService.listSuggestion(command);
    },
    requestFeedback: function (command) {
        return requestFeedbackService.listRequestFeedback(command);
    }
}

exports.markAsRead = function (command) {
    var rules = {
        notificationIds: Joi.array(Joi.string().guid())
    };
    command = service.validateSync(command, rules);
    if (command.notificationIds.length < 1) return new Promise(resolve => {
        resolve();
    });
    var ids = command.notificationIds.map(x => {
        return "'" + x + "'"
    }).join(',');
    return sql.db.query(util.format("UPDATE notifications SET `read`=true where id in(%s);", ids));
};

exports.getNews = function (command) {
    var requestFeedbackList = null;
    var monthAgo = new Date();
    monthAgo.setDate(monthAgo.getDate() - 30);
    if (command.tags && !Array.isArray(command.tags)) {
        command.tags = [command.tags];
    }
    var rules = {
        action: Joi.object(),
        recipientId: Joi.string(),
        objectId: Joi.string(),
        // since: Joi.date(),
        limit: Joi.number().default(6),
        entityResolver: Joi.object(),
        tags: Joi.array(Joi.string()),
        storeId: Joi.string(),
        direction: Joi.string(),
        page: Joi.number().default(0)
    };

    command = service.validateSync(command, rules);

    var listCommand = {limit: command.limit, _userContext: command._userContext};
    listCommand = service.validateListCommand(listCommand);
    if(command.since){
        listCommand.createdAt = {gt: command.since};
        delete command.since;
    }
    if (command.recipientId) listCommand.recipientId = command.recipientId;
    if (command.objectId) listCommand.objectId = command.objectId;
    if (command.direction) listCommand.direction = command.direction;
    if (command.page) listCommand.page = command.page;
    command.page = command.page || 0;
    command.limit = command.limit || 20;
    var hasSuggestion = false;
    command.hasRequestFeedback = false;
    //insert feedback sql
//     command.tags = ['suggestion'];
    if (!command.tags || command.tags.length == 0) {
        command.tags = ['fit', 'quality', 'price', 'style', 'stock', 'suggestion'];
        hasSuggestion = true;
        command.hasRequestFeedback = true;
    } else {
        if (_.indexOf(command.tags, 'suggestion') > -1) {
            hasSuggestion = true;
            // command.tags = _.difference(command.tags, ['suggestion']);
        }
    }
    var queryStr = "";
    // if(hasSuggestion && (!command.tags || command.tags.length ==0)){
    //     queryStr += "select storeId, cid  id,'staff' subjectType, 'createdStaffSuggestion' action, '-1' objectId," +
    //         " 'product'  objectType, 'suggestion'  bodyType," +
    //         "deleted, staffId creatorId, createdAt , updatedAt " +
    //         "from newsuggestions where  deleted=0  and type = 'suggestion' ";
    //     if (command.storeId) {
    //         queryStr += " and storeId = '" + command.storeId +"'";
    //     }
    //     queryStr += " and updatedAt > date_sub(now(),interval 1 month) order by updatedAT desc ";
    //     queryStr += " limit " + (command.page * command.limit) + " ," + command.limit;//control page and limit of every page
    //
    // }else{

    queryStr += "select * from " +
        "(";

    queryStr += "select p.sku  objectId, '' storeId, p.cid  id,'staff' subjectType, 'createdStaffFeedback'  action, 'product'  objectType," +
        "'feedback'  bodyType,p.deleted  deleted ,'' creatorId, p.createdAt ,p.updatedAt updatedAt " +
        "from " +
        "   (select cid,sku,deleted,createdAt,fbupdateAt updatedAt from newproducts  where deleted = 0 and active = 1) p,";
    queryStr += "(";
    for (var i = 0; i < command.tags.length; i++) {
        var tag = command.tags[i];
        if (tag == 'suggestion') {
            queryStr += "select DISTINCT(productId) as sku from newsuggestions where deleted=0 and type = 'styleSuggestion' ";
            if (command.recipientId) {
                queryStr += " and cid = '" + command.recipientId + "'";
            }
            if (command.storeId) {
                queryStr += " and storeId = '" + command.storeId + "'";
            }
        } else {
            queryStr += getchildSqlStr(tag);
            if (command.storeId) {
                queryStr += " and storeId = '" + command.storeId + "'";
            }
            if (command.recipientId) {
                queryStr += " and productId = '" + command.recipientId + "'";
            }
        }
        if (i < command.tags.length - 1) {
            queryStr += " union ";
        }
    }
    queryStr += ")";
    queryStr += " u where p.sku = u.sku ";
    if (hasSuggestion) {
        queryStr += " union " +
            "select '-1' objectId, storeId, cid  id,'staff' subjectType, 'createdStaffSuggestion' action, " +
            " 'product'  objectType, 'suggestion'  bodyType," +
            " deleted, staffId creatorId, createdAt , updatedAt " +
            " from newsuggestions where deleted = 0 and type = 'suggestion' ";
        if (command.storeId) {
            queryStr += " and storeId = '" + command.storeId + "'";
        }
        if (command.recipientId) {
            queryStr += " and cid = '" + command.recipientId + "'";
        }
    }
    queryStr += " ) t";
    //  queryStr += " where t.updatedAt > date_sub(now(),interval 1 month) ";

    queryStr += " order by updatedAt desc limit " + (command.page * command.limit) + " ," + command.limit;//control page and limit of every page
    // }
    return sql.db.query(queryStr, {type: sql.db.QueryTypes.SELECT}).then(res => {
        var myRes = [];
        // command.top = "7590190";
        // if(!command._userContext){
        //     command._userContext = {};
        // }
        // command._userContext.staffId = 'aea9ec40-e2d2-11e6-b4dd-7e86f10cad2e';
        return getTopFeedback(command).then(topRes=>{
            if(!command.page||command.page==0){
                if(topRes && topRes.length > 0){
                    myRes.push(topRes[0]);
                }
            }

            return getRequstFeedback(command).then(reqRes=>{
                if(!command.page||command.page==0) {
                    if (reqRes) {
                        reqRes.forEach(rqFbkItem => {
                            myRes.push(rqFbkItem);
                        });
                    }
                }
                if(res){
                    res.forEach(item=>{
                        if(!(command.top && command.top == item.objectId)){
                            myRes.push(item);
                        }
                    });
                }
                return hydrateList(myRes, command);
            });
        });
    });
};

var getRequstFeedback = function(command) {
    if(!command.hasRequestFeedback){
        return new Promise(function (resolve,reject) {
            resolve([]);
        });
    }
    var currentStaffid = null;
    if(!command._userContext || !command._userContext.staffId){
        return new Promise(function (resolve,reject) {
            resolve([]);
        });
    }else{
        currentStaffid = command._userContext.staffId;
    }
    var queryStr =
        "select a.sku objectId,null storeId, null  id,'staff' subjectType, 'createdRequestFeedback' action," +
        " 'product'  objectType, 'requestFeedback'  bodyType," +
        " 0 deleted, null creatorId, null createdAt ,a.updatedAt  updatedAt  " +
        " from (SELECT max(updatedAt) updatedAt, sku FROM requestFeedbacks " +
        "WHERE deleted = 0 AND TO_DAYS(NOW()) - TO_DAYS(updatedAt) <= 2 ";

    if (command.storeId) {
        queryStr += " and storeId = '" + command.storeId + "' ";
    }
    if (command.recipientId) {
        queryStr += " and sku = '" + command.recipientId + "' ";
    }
    queryStr += " group by sku order by updatedAt desc ) a";
    queryStr += " where not exists( " +
        "select 1 from ( " +
        "   select max(b.updatedAt) updatedAt ,b.productId from (  " +

        " select staffId, updatedAt,productId from feedback_fits where deleted = 0 and staffid = '"+ currentStaffid +"'  " +
        "union all  " +
        "select staffId, updatedAt,productId from feedback_prices where deleted = 0 and staffid = '"+ currentStaffid +"'  " +
        "union all  " +
        "select staffId, updatedAt,productId from feedback_styles where deleted = 0 and staffid = '"+ currentStaffid +"'  " +
        "union all  " +
        "select staffId, updatedAt,productId from feedback_qualitys where deleted = 0 and staffid = '"+ currentStaffid +"'  " +
        "union all  " +
        "select staffId, updatedAt,productId from feedback_stocks where deleted = 0 and staffid = '"+ currentStaffid +"') b group by b.productId  " +

        ") c where	a.sku = c.productId and a.updatedAt < c.updatedAt" +
        ")";
    return sql.db.query(queryStr, {type: sql.db.QueryTypes.SELECT});
}

var getTopFeedback = function(command) {
    if(!command.top){
        return new Promise(function (resolve,reject) {
            resolve([]);
        });
    }
    var queryStr =
        "select sku  objectId, '' storeId, cid  id,'staff' subjectType, 'createdStaffFeedback'  action, 'product'  objectType," +
        "'feedback'  bodyType, deleted  deleted ,'' creatorId, createdAt , updatedAt updatedAt " +
        "from  newproducts  where deleted = 0 and active = 1 and sku = '"+command.top+"'";
    return sql.db.query(util.format(queryStr), {type: sql.db.QueryTypes.SELECT});
}

function getchildSqlStr(type) {
    return " select DISTINCT(productId) as sku from feedback_" + type + "s  where deleted = 0 ";
}

function createResolverFunc(type, info) {
    return function (cb) {
        var entityResolver = myentityResolver[type];
        if (!entityResolver) throw new RangeError('An entity resolver for entityType "' + entityType + '" is required.');
        entityResolver(info).then(group => {
            cb(null, group);
        });
    }
}

function hydrateList(myitems, command) {
    var entityTypesIdGroups = {};
    var tasks = [];
    var items = _.cloneDeep(myitems);
    items.forEach(item => {
        if (item.action == 'createdStaffFeedback') {
            //mychild search filter
            var mycommand = {limit: 100000};//persistence default is limit 20,so change it large enough
            if(command.since){
                mycommand.since = command.since;
                delete command.since;
            }
            if (command.storeId != null && typeof(command.storeId) != "undefined") {
                mycommand.storeId = command.storeId;
            }
            //cycle tags type
            command.tags.forEach(tag => {
                mycommand.productId = item.objectId;
                entityTypesIdGroups[tag] = mycommand;
                tasks.push(createResolverFunc(tag, mycommand));

            });
            //product search
            tasks.push(createResolverFunc("product", [item.objectId]));
        }else if(item.action == 'createdRequestFeedback') {
            tasks.push(createResolverFunc("product", [item.objectId]));
            tasks.push(createResolverFunc("requestFeedback", {sku: item.objectId}));
        }
    });

    return new Promise((resolve, reject) => {
        async.parallel(tasks, function (err, myResults) {
            var results = _.cloneDeep(myResults);
            if (err) return reject(new Error(err));
            // results = _.flatten(results);
            var i = 0;
            var foo = 0;
            items.forEach(item => {
                if (item.action == 'createdStaffFeedback') {
                    item.body = new Array();

                    //cycle tags type
                    command.tags.forEach(tag => {
                        var res = results[i++];
                        res = res ? res : [];
                        res.forEach(childItem => {
                            foo++;
                            var myItem = childItem;
                            if (tag == 'suggestion') {
                                if (!item.suggestion) {
                                    item.suggestion = [];
                                }
                                myItem.suggestionType = 'styleSuggestion';
                                item.suggestion.push(myItem);

                                delete myItem.appliesTo;
                                delete myItem.createdAt;
                                delete myItem.color;
                                delete myItem.deleted;
                                delete myItem.info;
                                delete myItem.productId;
                                delete myItem.product_type;
                                delete myItem.sku;
                                delete myItem.style_cut;
                                delete myItem.type;

                            } else {
                                item.body.push(myItem);
                                //delete body information (second level)
                                delete myItem.appliesTo;
                                delete myItem.createdAt;
                                delete myItem.deleted;
                             //   delete myItem.face;
                                delete myItem.img;
                                delete myItem.productId;
                                delete myItem.sku;
                                delete myItem.tag;
                                // delete myItem.tags;
                                // delete myItem.topic;
                                delete myItem.type;
                                delete myItem.what;
                                delete myItem.when;
                                delete myItem.where;
                            }
                            myItem.likes = [];
                            // staffService.getStaffById(childItem.staffId).then(staff => {
                            //USE OLD LOGIC
                            staffService.getStaffByIds([myItem.staffId]).then(staff => {
                                myItem.staff = _.cloneDeep(staff[0]);
                                // storeService.getStoreById(childItem.storeId).then(store => {
                                //USE OLD LOGIC
                                storeService.getStoreByIds([myItem.storeId]).then(store => {
                                    myItem.store = _.cloneDeep(store[0]);
                                    voteService.getVoteListByActId(myItem.cid).then(vote => {
                                        var likes = [];
                                        if (vote) {
                                            vote.forEach(voteItem => {
                                                if (voteItem.active == 1)
                                                    likes.push(voteItem.staffId);
                                            });
                                            myItem.likes = likes;
                                        }

                                        //delete first level unused information
                                        // delete item.bodyType;
                                        delete item.createdAt;
                                        delete item.creatorId;
                                        delete item.deleted;
                                        // delete item.id;
                                        // delete item.objectId;
                                        delete item.objectType;
                                        delete item.storeId;
                                        delete item.subjectType;
                                        delete item.updatedAt;

                                        //delete staff infomation
                                        delete myItem.staff.active;
                                        delete myItem.staff.apiKey;
                                        delete myItem.staff.barCode;
                                        delete myItem.staff.cid;
                                        delete myItem.staff.createdAt;
                                        delete myItem.staff.creatorId;
                                        delete myItem.staff.deleted;
                                        delete myItem.staff.email;
                                        delete myItem.staff.permission_level;
                                        delete myItem.staff.role;
                                        delete myItem.staff.short_name;
                                        delete myItem.staff.storeId;
                                        delete myItem.staff.userId;

                                        //delete store informations
                                        delete myItem.store.active;
                                        delete myItem.store.apiKey;
                                        delete myItem.store.barCode;
                                        delete myItem.store.category;
                                        delete myItem.store.cid;
                                        delete myItem.store.city;
                                        delete myItem.store.country;
                                        delete myItem.store.country_id;
                                        delete myItem.store.createdAt;
                                        delete myItem.store.creatorId;
                                        delete myItem.store.deleted;
                                        delete myItem.store.email;
                                        delete myItem.store.expansion;
                                        delete myItem.store.googleId;
                                        delete myItem.store.id;
                                        delete myItem.store.location_lat;
                                        delete myItem.store.location_lng;
                                        delete myItem.store.location_longName;
                                        delete myItem.store.location_name;
                                        delete myItem.store.phone;
                                        delete myItem.store.postCode;
                                        delete myItem.store.province;
                                        delete myItem.store.provinceId;
                                        delete myItem.store.shortCode;

                                        delete myItem.cid;
                                        delete myItem.staffId;
                                        delete myItem.storeId;

                                        foo--;
                                        if (foo == 0) {
                                            resolve(items);
                                        }
                                    });

                                });
                            });
                        });
                    });
                    var pro = results[i++];
                    pro = _.compact(pro);
                    pro.map(p => {
                        p.id = p.sku;
                        item.object = _.cloneDeep(p);

                        //delete object information
                        delete item.object.active;
                        delete item.object.category;
                        delete item.object.objectID;
                        delete item.object._highlightResult;

                    });
                } else if (item.action == 'createdStaffSuggestion') {
                    foo++;
                    suggestionService.getSuggestion({id: item.id}).then(myRes => {
                        var res = _.cloneDeep(myRes);
                        item.body = res;
                        item.subjectId = res.staffId;
                        item.storeId = res.storeId;
                        item.likes = [];
                        staffService.getStaffByIds([item.subjectId]).then(staff => {
                            item.subject = _.cloneDeep(staff[0]);
                            //USE OLD LOGIC
                            storeService.getStoreByIds([item.storeId]).then(store => {
                                item.store = _.cloneDeep(store[0]);
                                voteService.getVoteListByActId(res.cid).then(vote => {
                                    var likes = [];
                                    if (vote) {
                                        vote.forEach(voteItem => {
                                            likes.push(voteItem.staffId);
                                        });
                                        item.likes = likes;
                                    }

                                    //delete unused information
                                    // delete item.bodyType;
                                    delete item.createdAt;
                                    delete item.creatorId;
                                    delete item.deleted;
                                    // delete item.id;
                                    // delete item.objectId;
                                    delete item.objectType;
                                    delete item.storeId;
                                    delete item.subjectId;
                                    delete item.subjectType;

                                    //delete staff infomation
                                    delete item.subject.active;
                                    delete item.subject.apiKey;
                                    delete item.subject.barCode;
                                    delete item.subject.cid;
                                    delete item.subject.createdAt;
                                    delete item.subject.creatorId;
                                    delete item.subject.deleted;
                                    delete item.subject.email;
                                    delete item.subject.permission_level;
                                    delete item.subject.role;
                                    delete item.subject.short_name;
                                    delete item.subject.storeId;
                                    delete item.subject.userId;

                                    //delete store informations
                                    delete item.store.active;
                                    delete item.store.apiKey;
                                    delete item.store.barCode;
                                    delete item.store.category;
                                    delete item.store.cid;
                                    delete item.store.city;
                                    delete item.store.country;
                                    delete item.store.country_id;
                                    delete item.store.createdAt;
                                    delete item.store.creatorId;
                                    delete item.store.deleted;
                                    delete item.store.email;
                                    delete item.store.expansion;
                                    delete item.store.googleId;
                                    delete item.store.id;
                                    delete item.store.location_lat;
                                    delete item.store.location_lng;
                                    delete item.store.location_longName;
                                    delete item.store.location_name;
                                    delete item.store.phone;
                                    delete item.store.postCode;
                                    delete item.store.province;
                                    delete item.store.provinceId;
                                    delete item.store.shortCode;
                                    //delete item.body unused information
                                    delete item.body.appliesTo;
                                    delete item.body.cid;
                                    delete item.body.color;
                                    delete item.body.createdAt;
                                    delete item.body.deleted;
                                    delete item.body.description;
                                    // delete item.body.id;
                                    delete item.body.productId;
                                    delete item.body.product_type;
                                    delete item.body.sku;
                                    delete item.body.staffId;
                                    delete item.body.storeId;
                                    delete item.body.style_cut;
                                    delete item.body.tag;
                                    // delete item.body.tags;
                                    delete item.body.type;

                                    foo--;
                                    foo == 0 && resolve(items);
                                });
                            });
                        });

                    });
                }else if (item.action == 'createdRequestFeedback') {
                    var pro = results[i++];
                    pro = _.compact(pro);
                    pro.map(p => {
                        p.id = p.sku;
                        item.object = _.cloneDeep(p);
                        //delete object information
                        delete item.object.active;
                        delete item.object.category;
                        delete item.object.objectID;
                        delete item.object._highlightResult;
                    });
                    foo++;
                    var requestFeedbacks = results[i++];
                    delete item.createdAt;
                    delete item.creatorId;
                    delete item.deleted;
                    // delete item.id;
                    delete item.bodyType;
                    delete item.storeId;
                    delete item.subjectType;
                    delete item.updatedAt;
                    // delete item.objectId;
                    delete item.objectType;
                    item.body = [];
                    requestFeedbacks.forEach(res => {
                        var myItem = res;
                        myItem.id = res.cid;
                        myItem.subjectId = res.staffId;
                        myItem.storeId = res.storeId;
                        staffService.getStaffByIds([myItem.staffId]).then(staff => {
                            myItem.subject = _.cloneDeep(staff[0]);
                            //USE OLD LOGIC
                            storeService.getStoreByIds([myItem.storeId]).then(store => {
                                myItem.store = _.cloneDeep(store[0]);
                                item.body.push(myItem);

                                //delete staff infomation
                                delete myItem.subject.active;
                                delete myItem.subject.apiKey;
                                delete myItem.subject.barCode;
                                delete myItem.subject.cid;
                                delete myItem.subject.createdAt;
                                delete myItem.subject.creatorId;
                                delete myItem.subject.deleted;
                                delete myItem.subject.email;
                                delete myItem.subject.permission_level;
                                delete myItem.subject.role;
                                delete myItem.subject.short_name;
                                delete myItem.subject.storeId;
                                delete myItem.subject.userId;

                                //delete store informations
                                delete myItem.store.active;
                                delete myItem.store.apiKey;
                                delete myItem.store.barCode;
                                delete myItem.store.category;
                                delete myItem.store.cid;
                                delete myItem.store.city;
                                delete myItem.store.country;
                                delete myItem.store.country_id;
                                delete myItem.store.createdAt;
                                delete myItem.store.creatorId;
                                delete myItem.store.deleted;
                                delete myItem.store.email;
                                delete myItem.store.expansion;
                                delete myItem.store.googleId;
                                delete myItem.store.id;
                                delete myItem.store.location_lat;
                                delete myItem.store.location_lng;
                                delete myItem.store.location_longName;
                                delete myItem.store.location_name;
                                delete myItem.store.phone;
                                delete myItem.store.postCode;
                                delete myItem.store.province;
                                delete myItem.store.provinceId;
                                delete myItem.store.shortCode;

                                // delete myItem.cid;
                                delete myItem.staffId;
                                delete myItem.storeId;
                                delete myItem.createdAt;
                                delete myItem.deleted;
                                delete myItem.sku;
                                delete myItem.subjectId;

                                foo--;
                                foo == 0 && resolve(items);
                            });
                        });

                    });

                } else {
                }
                // foo++;
            });
            foo == 0 && resolve(items);
        });
    });
};
//
//
// exports.likeActivity = function (command) {
//     return voteService.doVote(command);
// };


/*
 exports.getNews = function (command) {
 return activityService.getLatest(command);
 };*/


