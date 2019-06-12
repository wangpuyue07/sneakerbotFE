var events = require('../application/eventBroker');
var Persistence = require('../application/persistence');
var constants = require('../application/constants');
var suggestionPersistence = new Persistence(constants.entityTypes.suggestions);
var voteService = require('../base_service/voteService');
var commentService = require('../base_service/commentService');
var a_staffActCntService = require('../base_service/a_staffActCntService');
var storeService = require('../base_service/storeService');
var staffService = require('../base_service/staffService');
var a_activityCount = require('../base_service/a_activityCount');
var genUtils = require('../application/genUtils');
/**
 * delete info which linked to comments
 * @param data
 */
var doDelete = function (data) {
    voteService.deleteVote({activityId: data.current.cid});
    commentService.deleteComment({activityId: data.current.cid});
    a_activityCount.deleteActCnt({subjectId:data.current.cid});
}
events.on(suggestionPersistence.events.onDeleted, function (data) {
    if(!!data.current.pre.productId){
        constants.suggestionsByProId[data.current.pre.productId]=undefined;
    }else{
        constants.suggestionsById[data.current.pre.cid]=undefined;
    }
    doDelete(data);
    var storeId = data.current.pre.storeId;
    var staffId = data.current.pre.staffId;
    updateStaffActCnt(storeId, staffId, 'suggestion', -1);
});

events.on(suggestionPersistence.events.onCreated, function (data) {
    if(data.current.type!='suggestion'){
        //update AppliesToSKU
    }
    createActCnt(data);
    // var storeId = data.current.storeId;
    // var staffId = data.current.staffId;
    // updateStaffActCnt(storeId, staffId, 'suggestion', 1);
});

events.on(suggestionPersistence.events.onUpdated, function (data) {
    if(!!data.current.pre.productId){
        constants.suggestionsByProId[data.current.pre.productId]=undefined;
    }else{
        constants.suggestionsById[data.current.pre.cid]=undefined;
    }
});


/**
 * update staffActCnt infos
 * @param storeId
 * @param staffId
 * @param type
 * @param num
 */
var updateStaffActCnt = function (storeId,staffId, type, num) {
    storeService.getStoreByIds([storeId]).then(storeItem => {
        var region = storeItem[0].city;
        staffService.getStaffByIds([staffId]).then(staffItem => {
            a_staffActCntService.updateNum({
                staffId: staffId,
                storeId: storeId,
                role: staffItem[0].role_ab,
                region: region,
                num: num,
                numType: type
            });
        });
    });
}

var createActCnt = function (data) {
    var topic = data.current.product_type;
    // if(data.current.type == 'styleSuggestion'){
    //     topic = "style";
    // }
    storeService.getStoreByIds([data.current.storeId]).then(store => {
        a_activityCount.createActCnt({
            cid: genUtils.createTimeUuid(),
            subjectId:data.current.cid,
            type:"suggestion",
            face: "",
            topic: topic?topic:"style",
            subTopic: "",
            productId: data.current.productId,
            region: store[0].city
        });
    });
}