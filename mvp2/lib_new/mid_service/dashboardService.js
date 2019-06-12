/**
 * Created by Anthony on 2017/1/17.
 */
var sql = require('../application/providers/sqlClient');
var service = require('../application/serviceUtils');
var a_staffActCntService = require('../base_service/a_staffActCntService');
var a_activityCntService = require('../base_service/a_activityCount');
var newsService = require('../mid_service/newsService');
var feedbackService = require('../mid_service/feedbackService');
var suggestionService = require('../base_service/suggestionService');
var _ = require('lodash');
var storeService = require('../base_service/storeService');
var productService = require('../base_service/productService');
var staffService = require('../base_service/staffService');
var events = require('../application/eventBroker');
var constants = require('../application/constants');
var util = require('util');


var getNewsTags = ['fit', 'quality', 'price', 'style', 'stock', 'suggestion'];
var getMostDiscProducts = function(limitStr){
    // var limitStr = "";
    // if (command.page) {
    //     limitStr = " limit " + command.page * pageCount + "," + pageCount;
    // }
    if(!limitStr){
        limitStr = "";
    }
    return sql.db.query(
        "select * from a_classifyfaceCounts where deleted=0 and " +
        "(quality_damagedbroken_sad!=0 " +
        "or quality_fabric_happy!=0 " +
        "or quality_fabric_sad!=0 " +
        "or quality_general_happy!=0 " +
        "or quality_general_sad!=0 " +
        "or quality_finishings_happy !=0 "+
        "or quality_finishings_sad !=0 "+
        "or fit_fitssmall_happy!=0  " +
        "or fit_fitslarge_happy!=0  " +
        "or fit_fitstrue_happy!=0  " +
        "or fit_fitssmall_sad!=0  " +
        "or fit_fitslarge_sad!=0  " +
        "or fit_fitstrue_sad!=0  " +
        "or fit_general_happy!=0  " +
        "or fit_general_sad!=0  " +
        "or style_colourpattern_happy!=0  " +
        "or style_colourpattern_sad!=0  " +
        "or style_design_happy!=0  " +
        "or style_design_sad!=0  " +
        "or style_fabric_happy!=0  " +
        "or style_general_happy!=0  " +
        "or style_general_sad!=0  " +
        "or price_tooexpensive_happy!=0  " +
        "or price_tooexpensive_sad!=0  " +
        "or price_toocheap_happy!=0  " +
        "or price_toocheap_sad!=0  " +
        "or price_incorrectprice_happy!=0  " +
        "or price_incorrectprice_sad!=0  " +
        "or price_general_happy!=0  " +
        "or price_general_sad!=0  " +
        "or stock_toohigh_happy!=0  " +
        "or stock_toohigh_sad!=0  " +
        "or stock_toolow_happy!=0  " +
        "or stock_toolow_sad!=0  " +
        "or stock_general_happy!=0  " +
        "or stock_general_sad!=0  " +
        "or style_fabric_sad!=0)" +
        " order by (voteNum + commentNum + " +
        "quality_fabric_happy + quality_damagedbroken_sad +quality_finishings_happy+quality_finishings_sad+ quality_fabric_sad + quality_general_happy + quality_general_sad + " +
        "fit_fitssmall_happy +  fit_fitslarge_happy +  fit_fitstrue_happy +  fit_fitssmall_sad +  fit_fitslarge_sad +  fit_fitstrue_sad +  fit_general_happy +  fit_general_sad +  " +
        "style_colourpattern_happy +  style_colourpattern_sad +  style_design_happy +  style_design_sad +  style_fabric_happy +  style_general_happy +  style_general_sad +  " +
        "price_tooexpensive_happy +  price_tooexpensive_sad +  price_toocheap_happy +  price_toocheap_sad +  price_incorrectprice_happy +  price_incorrectprice_sad +  price_general_happy + price_general_sad +  " +
        "stock_toohigh_happy +  stock_toohigh_sad +  stock_toolow_happy +  stock_toolow_sad + stock_general_happy+stock_general_sad+style_fabric_sad)  desc " + limitStr,
        {type: sql.db.QueryTypes.SELECT}).then(res => {
        var a_pros = [];
        var tags = ['fit', 'quality', 'price', 'style', 'stock'];
        var tasks = res.map(ac => productService.getProductBySku(ac.productId));
        if (tasks.length == 0) {
            // management.tableData = [];
            // return management;
            return [];
        }
        return Promise.all(tasks).then(product => {
            return res.map((item, index) => {
                var pro = {};
                pro.index = 0;
                pro.index = index + 1;
                pro.object = product[0];
                // delete  pro.object.variations;
                // delete  pro.object._highlightResult;

                // var a_pro = a_pros[index];

                var mytags = ['fit', 'quality', 'price', 'style', 'stock'];
                var getTooltipsDatas = _.uniq(_.flatten(tags.map(tag => {
                    var data = {};
                    switch (tag) {
                        case 'fit' :
                            data['positiveAmount'] = item.fit_fitssmall_happy + item.fit_fitslarge_happy + item.fit_fitstrue_happy + item.fit_general_happy;
                            data['negativeAmount'] = item.fit_fitssmall_sad
                                + item.fit_fitslarge_sad
                                + item.fit_fitstrue_sad
                                + item.fit_general_sad;
                            break;
                        case 'price':
                            data['positiveAmount'] = item.price_general_happy
                                + item.price_tooexpensive_happy
                                + item.price_toocheap_happy
                                + item.price_incorrectprice_happy;

                            data['negativeAmount'] = item.price_tooexpensive_sad
                                + item.price_toocheap_sad
                                + item.price_incorrectprice_sad
                                + item.price_general_sad;
                            break;
                        case 'stock':
                            data['positiveAmount'] = item.stock_toohigh_happy + item.stock_toolow_happy + item.stock_general_happy;
                            data['negativeAmount'] = item.stock_toohigh_sad
                                + item.stock_toolow_sad
                                + item.stock_general_sad;
                            break;
                        case 'quality':
                            data['positiveAmount'] = item.quality_fabric_happy
                                + item.quality_general_happy + item.quality_finishings_happy ;
                            data['negativeAmount'] = item.quality_damagedbroken_sad
                                + item.quality_fabric_sad
                                + item.quality_general_sad+item.quality_finishings_sad;
                            break;
                        case 'style':
                            data['positiveAmount'] = item.style_colourpattern_happy
                                + item.style_design_happy
                                + item.style_fabric_happy
                                + item.style_general_happy;
                            data['negativeAmount'] = item.style_fabric_sad + item.style_colourpattern_sad
                                + item.style_design_sad
                                + item.style_general_sad;
                            break;
                    }
                    data['productionId'] = item.productId;
                    data['topic'] = tag;
                    if ((data['positiveAmount'] + data['negativeAmount']) == 0) {
                        _.omit(mytags, tag);
                        return null;
                    } else {
                        return data;
                    }
                })));
                pro.tags = mytags;
                pro.TooltipsDatas = _.compact(_.uniq(getTooltipsDatas, 'topic'));

                // pro.TooltipsDatas = _.uniq(getTooltipsDatas, 'topic');
                pro.voteNumb = item.voteNum;
                pro.commentNumb = item.commentNum;
                pro.negativeAmount =
                    item.quality_damagedbroken_sad
                    + item.quality_fabric_sad
+item.quality_finishings_sad
                    + item.fit_fitssmall_sad
                    + item.fit_fitslarge_sad
                    + item.fit_fitstrue_sad
                    + item.fit_general_sad
                    + item.style_colourpattern_sad
                    + item.style_design_sad
                    + item.style_general_sad
                    + item.price_tooexpensive_sad
                    + item.price_toocheap_sad
                    + item.price_incorrectprice_sad
                    + item.price_general_sad
                    + item.stock_toohigh_sad
                    + item.stock_toolow_sad
                    + item.stock_general_sad
                    + item.style_fabric_sad;
                pro.positiveAmount =
                    +item.quality_fabric_happy
                    + item.quality_general_happy
                        +item.quality_finishings_happy
                    + item.fit_fitssmall_happy
                    + item.fit_fitslarge_happy
                    + item.fit_fitstrue_happy
                    + item.fit_general_happy
                    + item.style_colourpattern_happy
                    + item.style_design_happy
                    + item.style_fabric_happy
                    + item.style_general_happy
                    + item.price_tooexpensive_happy
                    + item.price_toocheap_happy
                    + item.price_incorrectprice_happy
                    + item.price_general_happy
                    + item.stock_toohigh_happy
                    + item.stock_toolow_happy
                    + item.stock_general_happy;
                // a_pros.push(pro);
                return pro;
            });
        });
        // console.log(a_pros);
        //     return a_pros;

        // var tasks = res.map(ac => newsService.getNews({recipientId: ac.productId}));
        // if (tasks.length == 0) {
        //     // management.tableData = [];
        //     // return management;
        //     return [];
        // }

        // return Promise.all(res.map(ac => {return newsService.getNews({recipientId: ac.productId})})).then(products => {
        //     return products.map((product, index) => {
        //         product[0].index = 0;
        //         product[0].index = index + 1;
        //         var pro = product[0];
        //         var a_pro = a_pros[index];
        //
        //         pro.tags=_.uniq(_.flatten(pro.body.map(body=>{
        //             if(body.tags.length!=1){
        //                 return ['suggestion'];
        //             }
        //             return body.tags;
        //
        //         })));
        //         var getTooltipsDatas = _.uniq(_.flatten(pro.body.map(body=>{
        //             var data = {};
        //             if(body.tags.length!=1){
        //                 return ['suggestion'];
        //             }
        //             if(data['productionId'] != body.productId && data['topic'] != body.tags[0]){
        //
        //                 data['productionId'] = body.productId;
        //                 data['topic'] = body.tags[0];
        //             }
        //             switch (body.tags[0]){
        //                 case 'fit' :
        //                     data['positiveAmount']= a_pro.fit_fitssmall_happy +a_pro.fit_fitslarge_happy +a_pro.fit_fitstrue_happy +a_pro.fit_general_happy;
        //                     data['negativeAmount'] =  a_pro.fit_fitssmall_sad
        //                         +a_pro.fit_fitslarge_sad
        //                         +a_pro.fit_fitstrue_sad
        //                         +a_pro.fit_general_sad;
        //                     break;
        //                 case 'price':
        //                     data['positiveAmount']= a_pro.price_general_happy
        //                         +a_pro.price_tooexpensive_happy
        //                         +a_pro.price_toocheap_happy
        //                         +a_pro.price_incorrectprice_happy;
        //
        //                     data['negativeAmount'] = a_pro.price_tooexpensive_sad
        //                         +a_pro.price_toocheap_sad
        //                         +a_pro.price_incorrectprice_sad
        //                         +a_pro.price_general_sad;
        //                     break;
        //                 case 'stock':
        //                     data['positiveAmount']= a_pro.stock_toohigh_happy +a_pro.stock_toolow_happy +a_pro.stock_general_happy;
        //                     data['negativeAmount'] =  a_pro.stock_toohigh_sad
        //                         +a_pro.stock_toolow_sad
        //                         +a_pro.stock_general_sad;
        //                     break;
        //                 case 'quality':
        //                     data['positiveAmount']= a_pro.quality_fabric_happy
        //                         +a_pro.quality_general_happy;
        //                     data['negativeAmount'] = a_pro.quality_damagedbroken_sad
        //                         +a_pro.quality_fabric_sad
        //                         +a_pro.quality_general_sad;
        //                     break;
        //                 case 'style':
        //                     data['positiveAmount']= a_pro.style_colourpattern_happy
        //                         +a_pro.style_design_happy
        //                         +a_pro.style_fabric_happy
        //                         +a_pro.style_general_happy;
        //                     data['negativeAmount'] = a_pro.style_fabric_sad+a_pro.style_colourpattern_sad
        //                         +a_pro.style_design_sad
        //                         +a_pro.style_general_sad;
        //                     break;
        //             }
        //             return data;
        //         })));
        //
        //         pro.TooltipsDatas = _.uniq(getTooltipsDatas, 'topic');
        //         pro.voteNumb = a_pro.voteNum;
        //         pro.commentNumb = a_pro.commentNum;
        //         pro.negativeAmount=
        //             a_pro.quality_damagedbroken_sad
        //             +a_pro.quality_fabric_sad
        //             +a_pro.quality_general_sad
        //             +a_pro.fit_fitssmall_sad
        //             +a_pro.fit_fitslarge_sad
        //             +a_pro.fit_fitstrue_sad
        //             +a_pro.fit_general_sad
        //             +a_pro.style_colourpattern_sad
        //             +a_pro.style_design_sad
        //             +a_pro.style_general_sad
        //             +a_pro.price_tooexpensive_sad
        //             +a_pro.price_toocheap_sad
        //             +a_pro.price_incorrectprice_sad
        //             +a_pro.price_general_sad
        //             +a_pro.stock_toohigh_sad
        //             +a_pro.stock_toolow_sad
        //             +a_pro.stock_general_sad
        //             +a_pro.style_fabric_sad;
        //         pro.positiveAmount=
        //             +a_pro.quality_fabric_happy
        //             +a_pro.quality_general_happy
        //             +a_pro.fit_fitssmall_happy
        //             +a_pro.fit_fitslarge_happy
        //             +a_pro.fit_fitstrue_happy
        //             +a_pro.fit_general_happy
        //             +a_pro.style_colourpattern_happy
        //             +a_pro.style_design_happy
        //             +a_pro.style_fabric_happy
        //             +a_pro.style_general_happy
        //             +a_pro.price_tooexpensive_happy
        //             +a_pro.price_toocheap_happy
        //             +a_pro.price_incorrectprice_happy
        //             +a_pro.price_general_happy
        //             +a_pro.stock_toohigh_happy
        //             +a_pro.stock_toolow_happy
        //             +a_pro.stock_general_happy;
        //         return pro;
        //     });
        // })
    });
}

var updateHR = function () {
    return a_staffActCntService.listStaffActCnt({storeId:{$ne: ''}}).then(res => {
        if (res && res.length > 0) {
            var topShopId = "";
            var topShopName = "";
            var topStaffId = "";
            var topStaffName = "";
            var topRegion = "";
            var storeList = _.chain(res)
                .groupBy("storeId")
                .map(function (storeId, key) {
                    return [key, _.reduce(storeId, function (result, currentObject) {
                        return {
                            storeId: currentObject.storeId,
                            fdbSugNum: result.fdbSugNum + currentObject.fdbSugNum,
                            preRank: result.preRank + currentObject.preRank,
                        }
                    }, {
                        storeId: 0,
                        fdbSugNum: 0,
                        preRank: 0,
                    })];
                })
                .object()
                .value();
            var storeListDesc = _.sortBy(storeList, function (item) {
                return -item.fdbSugNum;
            });
            //get pre store list order
            var preStoreListDesc = _.sortBy(storeList, function (item) {
                return -item.preRank;
            });
            // console.log(doGroupBy(res,'storeId', ['feedbackNum','preRank','curRank']));

            var TOP_STORES = {};//recode top stores
            TOP_STORES.type = "TOP STORES";
            TOP_STORES.data = [];
            var count = 0;
            storeListDesc.forEach((res) => {
                count++;
                TOP_STORES.data.push({
                    index: count,
                    storeId: res.storeId,
                    totalFeedbackAmount: res.fdbSugNum,
                    rank: ((_.indexOf(preStoreListDesc, res) + 1) - count)
                });
                if (count == 1) {
                    topShopId = res.storeId;
                }
            });
            // var storeListDes = _.sortBy(storeList, function(item) {
            //     return -item.fdbSugNum;
            // });
            var BOTTOM_STORES = {};//recode bottom stores
            BOTTOM_STORES.type = "BOTTOM STORES";
            BOTTOM_STORES.data = [];
            var count = 0;
            for (var i = storeListDesc.length - 1; i >= 0; i--) {
                count++;
                BOTTOM_STORES.data.push({
                    index: i + 1,
                    storeId: storeListDesc[i].storeId,
                    totalFeedbackAmount: storeListDesc[i].fdbSugNum,
                    rank: ((_.indexOf(preStoreListDesc, storeListDesc[i]) + 1) - (i + 1))
                });
            }


            var staffList = _.chain(res)
                .groupBy("staffId")
                .map(function (staffId, key) {
                    return [key, _.reduce(staffId, function (result, currentObject) {
                        return {
                            staffId: currentObject.staffId,
                            fdbSugNum: result.fdbSugNum + currentObject.fdbSugNum,
                            preRank: result.preRank + currentObject.preRank,
                            curRank: result.curRank + currentObject.curRank,
                        }
                    }, {
                        staffId: 0,
                        fdbSugNum: 0,
                        preRank: 0,
                        curRank: 0,
                    })];
                })
                .object()
                .value();
            var staffListDesc = _.sortBy(staffList, function (item) {
                return -item.fdbSugNum;
            });
            var preStaffListDesc = _.sortBy(staffList, function (item) {
                return -item.preRank;
            });

            var TOP_STAFF = {};//recode top stores
            TOP_STAFF.type = "TOP STAFF";
            TOP_STAFF.data = [];
            var count = 0;
            staffListDesc.forEach((res) => {
                count++;
                if (count == 1) {
                    topStaffId = res.staffId;
                }
                TOP_STAFF.data.push({
                    index: count,
                    subjectId: res.staffId,
                    totalFeedbackAmount: res.fdbSugNum,
                    rank: ((_.indexOf(preStaffListDesc, res) + 1) - count)
                });
            });

            // var staffListDes = _.sortBy(staffList, function(item) {
            //     return -item.fdbSugNum;
            // });
            var BOTTOM_STAFF = {};//recode bottom stores
            BOTTOM_STAFF.type = "BOTTOM STAFF";
            BOTTOM_STAFF.data = [];
            var count = 0;
            for (var i = staffListDesc.length - 1; i >= 0; i--) {
                count++;
                BOTTOM_STAFF.data.push({
                    index: i + 1,
                    subjectId: staffListDesc[i].staffId,
                    totalFeedbackAmount: staffListDesc[i].fdbSugNum,
                    rank: ((_.indexOf(preStaffListDesc, staffListDesc[i]) + 1) - (i+1))
                });
            }

            var roleList = _.chain(res)
                .groupBy("role")
                .map(function (role, key) {
                    return [key, _.reduce(role, function (result, currentObject) {
                        return {
                            role: currentObject.role,
                            fdbSugNum: result.fdbSugNum + currentObject.fdbSugNum
                        }
                    }, {
                        role: 0,
                        fdbSugNum: 0
                    })];
                })
                .object()
                .value();
            var roleListAsc = _.sortBy(roleList, function (item) {
                return -item.fdbSugNum;
            });

            var topic = ["STM", "DPM", "FM", "2IC", "3IC", "FT", "PT", "CAS", "VM"];
            var amount = [];
            var percent = [];
            var totalCount = 0;
            topic.forEach(item => {
                var myNum = _.result(_.find(roleListAsc, {'role': item}), 'fdbSugNum');
                myNum = myNum ? myNum : 0
                amount.push(myNum);
                totalCount = totalCount + myNum;
            });
            amount.forEach(item => {
                if (totalCount == 0) {
                    percent.push(0);
                } else {
                    percent.push((item * 100 / totalCount).toFixed(0));
                }
            });

            var chartData = {
                "title": "FEEDBACK PER ROLE",
                "topic": topic,
                "amount": amount,
                "percent": percent
            };

            var regionList = _.chain(res)
                .groupBy("region")
                .map(function (region, key) {
                    return [key, _.reduce(region, function (result, currentObject) {
                        return {
                            region: currentObject.region,
                            fdbSugNum: result.fdbSugNum + currentObject.fdbSugNum
                        }
                    }, {
                        region: 0,
                        fdbSugNum: 0
                    })];
                })
                .object()
                .value();
            var regionListDesc = _.sortBy(regionList, function (item) {
                return item.fdbSugNum;
            });
            regionListDesc.forEach(res => {
                topRegion = res.region;
                return;
            })

            return service.hydrateList(TOP_STORES.data, hydrationTargets, entityResolver).then(res => {
                TOP_STORES.data = res;
                return service.hydrateList(BOTTOM_STORES.data, hydrationTargets, entityResolver).then(res => {
                    BOTTOM_STORES.data = res;
                    return service.hydrateList(TOP_STAFF.data, hydrationTargets, entityResolver).then(res => {
                        TOP_STAFF.data = res;
                        return service.hydrateList(BOTTOM_STAFF.data, hydrationTargets, entityResolver).then(res => {
                            BOTTOM_STAFF.data = res;
                            return staffService.getStaffByIds([topStaffId]).then(res => {
                                topStaffName = res[0].names[0].text;
                                return storeService.getStoreByIds([topShopId]).then(res => {
                                    topShopName = res[0].names[0].text;
                                    return storeService.listStores({}).then(res =>{
                                        var storeNum = 0;
                                        var activeNum = 0;
                                        if(res){
                                            res.forEach(storeItem=>{
                                                if(storeItem.active == 1 && storeItem.deleted == 0){
                                                    storeNum++;
                                                }
                                            })
                                        }
                                        // console.log(constants.activeStore)
                                        Object.keys(constants.activeStore).forEach(key => {
                                            if(constants.activeStore[key] == 1){
                                                activeNum++;
                                            }

                                        });
                                        var tableData = [TOP_STORES, BOTTOM_STORES, TOP_STAFF, BOTTOM_STAFF];
                                        var chunkData = [
                                            {
                                                "name": activeNum + " / " + storeNum,
                                                "chunkName": "ACITVE STORES"
                                            },
                                            {
                                                "name": topShopName,
                                                "chunkName": "TOP STORE"
                                            },
                                            {
                                                "name": topRegion,
                                                "chunkName": "TOP REGION"
                                            },
                                            {
                                                "name": topStaffName,
                                                "chunkName": "TOP STAFF MEMBER"
                                            }

                                        ];
                                        return {
                                            "tableData": tableData,
                                            "chartData": chartData,
                                            "chunkData": chunkData
                                        }
                                    });

                                });
                            });
                        });
                    });
                });
            });
        } else {
            return storeService.listStores({}).then(res => {
                var storeNum = 0;
                var activeNum = 0;
                if (res) {
                    res.forEach(storeItem => {
                        if (storeItem.active == 1 && storeItem.deleted == 0) {
                            storeNum++;
                        }
                    })
                }
                Object.keys(constants.activeStore).forEach(key => {
                    if(constants.activeStore[key] == 1){
                        activeNum++;
                    }

                });
                return {
                    "tableData": [
                        {
                            "type": "TOP STORES",
                            "data": []
                        },
                        {
                            "type": "BOTTOM STORES",
                            "data": []
                        },
                        {
                            "type": "TOP STAFF",
                            "data": []
                        },
                        {
                            "type": "BOTTOM STAFF",
                            "data": []
                        }
                    ],
                    "chunkData": [
                        {
                            "name": activeNum + " / " + storeNum,
                            "chunkName": "ACITVE STORES"
                        },
                        {
                            "name": "N/A",
                            "chunkName": "TOP STORE"
                        },
                        {
                            "name": "N/A",
                            "chunkName": "TOP REGION"
                        },
                        {
                            "name": "N/A",
                            "chunkName": "TOP STAFF MEMBER"
                        }

                    ],
                    "chartData": {
                        "title": "FEEDBACK PER ROLE",
                        "topic": ["STM", "DPM", "FM", "2IC", "3IC", "FT", "PT", "CAS", "VM"],
                        "amount": [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        "percent": ["0%", "0%", "0%", "0%", "0%", "0%", "0%"]
                    }
                };
            });

        }

    });
};
var updateManagement = function () {
    var management={};
    // return Promise.all([a_activityCntService.listActCnt({face: 'happy'}),
    //     a_activityCntService.listActCnt({face: 'sad'}),
    //     a_activityCntService.listActCnt({type: 'suggestion'}),
    //     a_activityCntService.listActCnt({topic: 'fit',type:'feedback'}),
    //     a_activityCntService.listActCnt({topic: 'quality',type:'feedback'}),
    //     a_activityCntService.listActCnt({topic: 'style',type:'feedback'}),
    //     a_activityCntService.listActCnt({topic: 'price',type:'feedback'}),
    //     a_activityCntService.listActCnt({topic: 'stock',type:'feedback'})]).then(res => {

    //#########################memory operate method#############################
    return Promise.all([a_activityCntService.listActCnt({})]).then(myres => {
        var res = [];
        res[0] = _.filter(myres[0],{face: 'happy'});
        res[1] = _.filter(myres[0],{face: 'sad'});
        res[2] = _.filter(myres[0],{type: 'suggestion'});
        res[3] = _.filter(myres[0],{topic: 'fit',type:'feedback'});
        res[4] = _.filter(myres[0],{topic: 'quality',type:'feedback'});
        res[5] = _.filter(myres[0],{topic: 'style',type:'feedback'});
        res[6] = _.filter(myres[0],{topic: 'price',type:'feedback'});
        res[7] = _.filter(myres[0],{topic: 'stock',type:'feedback'});
    //#########################memory operate method#############################
        // todo: newData for mapData;
        var newData = [];
                for(var datas of res){
                    for(var i = datas.length;i--;){
                        var data = {};
                        data['region'] = datas[i].region;
                        data['type'] = datas[i].type;
                        data['topic'] = datas[i].topic;
                        newData.push(data);
                    }
                }
        //todo:end newData

        var chunkData = [
            {
                "name": res[0].length,
                "chunkName": "+ FEEDBACK"
            },
            {
                "name": res[1].length,
                "chunkName": "- FEEDBACK"
            },
            {
                "name": res[2].length,
                "chunkName": "SUGGESTIONS"
            }
            /*{
                "name": "0",
                "chunkName": "CONTROVERSIAL"
            }*/
        ];
        var chartData = {
            "title": "MOST DISCUSSED TOPICS",
            "topic": ["Fit", "Quality", "Style", "Price", "Stock Levels", "Suggestions"],
            "amount": [res[3].length, res[4].length, res[5].length, res[6].length, res[7].length, res[2].length]
        };
        var mapData = {
            "title": "MOST DISCUSSED TOPICS PER REGION",
            "region": [],
        };
        management.chunkData = chunkData;
        management.chartData = chartData;
        management.mapData = mapData;
        return getMostDiscProducts().then(res =>{
            management.tableData = res;
            return management;
        });

    }).catch(err=>{console.log(err)});
};
var updateProduction = function () {
    var production={};
    return Promise.all([a_activityCntService.listActCnt({})]).then(myres => {
        var res = [];
        res[0] = _.filter(myres[0],{topic: 'fit', face: 'sad',type:'feedback'});
        res[1] = _.filter(myres[0],{topic: 'fit', face: 'happy',type:'feedback'});
        res[2] = _.filter(myres[0],{topic: 'stock', face: 'sad',type:'feedback'});
        res[3] = _.filter(myres[0],{topic: 'stock', face: 'happy',type:'feedback'});
        res[4] = _.filter(myres[0],{topic: 'price', face: 'sad',type:'feedback'});
        res[5] = _.filter(myres[0],{topic: 'price', face: 'happy',type:'feedback'});
        res[6] = _.filter(myres[0],{topic: 'quality', face: 'sad',type:'feedback'});
        res[7] = _.filter(myres[0],{topic: 'quality', face: 'happy',type:'feedback'});
        res[8] = _.filter(myres[0],{topic: 'style', face: 'sad',type:'feedback'});
        res[9] = _.filter(myres[0],{topic: 'style', face: 'happy',type:'feedback'});
        res[10] = _.filter(myres[0],{type: 'suggestion'});
        res[11] = _.filter(myres[0],{subTopic: 'Damaged/Broken', topic: 'quality',type:'feedback'});
        res[12] = _.filter(myres[0],{subTopic: 'Fabric', topic: 'quality',type:'feedback'});
        res[13] = _.filter(myres[0],{subTopic: 'General', topic: 'quality',type:'feedback'});
        res[14] = _.filter(myres[0],{subTopic: 'Fits Small', topic: 'fit',type:'feedback'});
        res[15] = _.filter(myres[0],{subTopic: 'Fits True', topic: 'fit',type:'feedback'});
        res[16] = _.filter(myres[0],{subTopic: 'Fits Large', topic: 'fit',type:'feedback'});
        res[17] = _.filter(myres[0],{subTopic: 'General', topic: 'fit',type:'feedback'});
        res[18] = _.filter(myres[0],{subTopic: 'Colour/Pattern', topic: 'style',type:'feedback'});
        res[19] = _.filter(myres[0],{subTopic: 'Design', topic: 'style',type:'feedback'});
        res[20] = _.filter(myres[0],{subTopic: 'Fabric', topic: 'style',type:'feedback'});
        res[21] = _.filter(myres[0],{subTopic: 'General', topic: 'style',type:'feedback'});
        res[22] = _.filter(myres[0],{subTopic: 'Too High', topic: 'stock',type:'feedback'});
        res[23] = _.filter(myres[0],{subTopic: 'Too Low', topic: 'stock',type:'feedback'});
        res[24] = _.filter(myres[0],{subTopic: 'General', topic: 'stock',type:'feedback'});
        res[25] = _.filter(myres[0],{subTopic: 'Too Expensive', topic: 'price',type:'feedback'});
        res[26] = _.filter(myres[0],{subTopic: 'Too Cheap', topic: 'price',type:'feedback'});
        res[27] = _.filter(myres[0],{subTopic: 'Incorrect Price', topic: 'price',type:'feedback'});
        res[28] = _.filter(myres[0],{subTopic: 'General', topic: 'price',type:'feedback',face:'sad'});
        res[29] = _.filter(myres[0],{topic: 'Tops', type: 'suggestion'});
        res[30] = _.filter(myres[0],{topic: 'Pants & Leggings', type: 'suggestion'});
        res[31] = _.filter(myres[0],{topic: 'Dresses', type: 'suggestion'});
        res[32] = _.filter(myres[0],{topic: 'Jeans', type: 'suggestion'});
        res[33] = _.filter(myres[0],{topic: 'Skirts', type: 'suggestion'});
        res[34] = _.filter(myres[0],{topic: 'Knitwear', type: 'suggestion'});
        res[35] = _.filter(myres[0],{topic: 'Coats & jackets', type: 'suggestion'});
        res[36] = _.filter(myres[0],{topic: 'Playsuits + Jumpsuits', type: 'suggestion'});
        res[37] = _.filter(myres[0],{topic: 'Shorts', type: 'suggestion'});
        res[38] = _.filter(myres[0],{topic: 'Merino', type: 'suggestion'});
        res[39] = _.filter(myres[0],{topic: 'Swimwear', type: 'suggestion'});
        res[40] = _.filter(myres[0],{topic: 'Denim', type: 'suggestion'});
        res[41] = _.filter(myres[0],{topic: 'Intimates', type: 'suggestion'});
        res[42] = _.filter(myres[0],{topic: 'Activewear', type: 'suggestion'});
        res[43] = _.filter(myres[0],{topic: 'Shoes', type: 'suggestion'});
        res[44] = _.filter(myres[0],{topic: 'Hats & Hair', type: 'suggestion'});
        res[45] = _.filter(myres[0],{topic: 'Socks & Tights', type: 'suggestion'});
        res[46] = _.filter(myres[0],{topic: 'Jewellery', type: 'suggestion'});
        res[47] = _.filter(myres[0],{topic: 'Bags & Wallets', type: 'suggestion'});
        res[48] = _.filter(myres[0],{topic: 'Scarves', type: 'suggestion'});
        res[49] = _.filter(myres[0],{topic: 'Belts', type: 'suggestion'});
        res[50] = _.filter(myres[0],{topic: 'Sunglasses', type: 'suggestion'});
        res[51] = _.filter(myres[0],{topic: 'Gloves', type: 'suggestion'});
        res[52] = _.filter(myres[0],{topic: 'Sunglasses', type: 'Badges'});
        res[53] = _.filter(myres[0],{topic: 'style', type: 'suggestion'});
        res[54] = _.filter(myres[0],{subTopic: 'General', topic: 'price',type:'feedback',face:'happy'});
        res[55]=_.filter(myres[0],{subTopic: 'Finishings', topic: 'quality',type:'feedback'});
    //#########################memory operate method#############################


        var chunkData = [
            {
                "tag": "Quality",
                "positive": res[7].length,
                "nagetive": res[6].length
            },
            {
                "tag": "Fit",
                "positive": res[1].length,
                "nagetive": res[0].length
            },
            {
                "tag": "Style",
                "positive": res[9].length,
                "nagetive": res[8].length
            },
            {
                "tag": "Stock Levels",
                "positive": res[3].length,
                "nagetive": res[2].length
            },
            {
                "tag": "Price",
                "positive": res[5].length,
                "nagetive": res[4].length
            },
            {
                "tag": "Suggestions",
                "amount": res[10].length
            }
        ];
        var chartData = [
            {
                "title": "Quality",
                "topic": ["Damaged/Broken", "Fabric Quality", "Finishings","General"],
                "amount": [res[11].length, res[12].length, res[55].length, res[13].length],
            },
            {
                "title": "Fit",
                "topic": ["Fits Small", "Fits True", "Fits Large", "General"],
                "amount": [res[14].length, res[15].length, res[16].length, res[17].length],
            },
            {
                "title": "Style",
                "topic": ["Colour/Print", "Design/Shape", "Fabric Choice","General","Suggestion"],
                "amount": [res[18].length, res[19].length, res[20].length, res[21].length, res[53].length],
            },
            {
                "title": "Stock Levels",
                "topic": ["Too High", "Too Low","General"],
                "amount": [res[22].length,res[23].length,res[24].length]
            },
            {
                "title": "Price",
                "topic": ["Too Expensive", "Too Cheap", "Incorrect Price", "Well Priced","General"],
                "amount": [res[25].length,res[26].length,res[27].length,res[54].length,res[28].length]
            },
            {
                "title": "Suggestion",
                "topic": ["Tops", "Pants", "Dresses", 'Jeans','Skirts',"Skirts", 'Knitwear','Coats & jackets',
                    'Playsuits + Jumpsuits','Shorts','Merino','Swimwear','Denim','Intimates','Activewear',
                    'Shoes', 'Hats & Hair','Socks & Tights','Jewellery','Bags & Wallets',
                    'Scarves','Belts','Sunglasses','Gloves',
                    'Badges'],
                "amount": [res[29].length,res[30].length,res[31].length,res[32].length,res[33].length,res[34].length,res[35].length,
                    res[36].length,res[37].length,res[38].length,res[39].length,res[40].length,res[41].length,res[42].length,res[43].length
                    ,res[44].length,res[45].length,res[46].length,res[47].length,res[48].length,res[49].length,res[50].length,
                    res[51].length,res[50].length,res[52].length]
            }
        ];

       production.chunkData = chunkData;
       production.chartData = chartData;
       return Promise.all([
           sql.db.query("select * from a_activityCounts where topic='quality' and deleted=0 order by voteNum + commentNum desc",{type: sql.db.QueryTypes.SELECT}),//limit 0,5
           sql.db.query("select * from a_activityCounts where topic='fit' and deleted=0 order by voteNum + commentNum desc",{type: sql.db.QueryTypes.SELECT}),
           sql.db.query("select * from a_activityCounts where topic='style' and deleted=0  order by voteNum + commentNum desc",{type: sql.db.QueryTypes.SELECT}),
           sql.db.query("select * from a_activityCounts where topic='stock' and deleted=0 order by voteNum + commentNum desc",{type: sql.db.QueryTypes.SELECT}),
           sql.db.query("select * from a_activityCounts where topic='price' and deleted=0 order by voteNum + commentNum desc",{type: sql.db.QueryTypes.SELECT}),
           sql.db.query("select * from a_activityCounts where type='suggestion' and deleted=0 and topic!='style' order by voteNum + commentNum desc",{type: sql.db.QueryTypes.SELECT})
       ]).then(res=>{
           var raw = res;
               var tasks=[];
               tasks.push(newsService.getNews({tags: ['quality'],limit: 1000000}));
               tasks.push(newsService.getNews({tags: ['fit'],limit: 1000000}));
               tasks.push(newsService.getNews({tags: ['style','suggestion'],limit: 1000000}));
               tasks.push(newsService.getNews({tags: ['stock'],limit: 1000000}));
               tasks.push(newsService.getNews({tags: ['price'],limit: 1000000}));
               tasks.push(newsService.getNews({tags: ['suggestion'],limit: 1000000}));
               return Promise.all(tasks).then(myres=>{
                   var result=[];
                   raw.forEach((items,i)=>{
                       var resultCell=[];
                       items.forEach((item,j)=>{
                           var resItem = null;
                           //from getnews api  filter every item
                           if(myres && myres[i]) {
                               for (var m = 0; m < myres[i].length; m++) {
                                   var myItem = myres[i][m];
                                   if (myItem.bodyType != 'suggestion') {
                                       if (!myItem || !item || !myItem.body || myItem.objectId != item.productId)  {
                                           continue;
                                       }
                                       for (var n = 0; n < myItem.body.length; n++) {
                                           var obj = myItem.body[n];
                                           if (obj.id == item.subjectId) {
                                               resItem = _.cloneDeep(myItem);
                                               resItem.index = j + 1;
                                               resItem.body = resItem.body[n];
                                               resItem.body.voteNumb = item.voteNum;
                                               resItem.body.commentNumb = item.commentNum;
                                               delete resItem.suggestion;
                                               // delete resItem.body.likes;
                                               break;
                                           }
                                       }
                                       if (myItem.suggestion) {
                                           for (var k = 0; k < myItem.suggestion.length; k++) {
                                               var obj = myItem.suggestion[k];
                                               if (obj.id == item.subjectId) {
                                                   resItem = _.cloneDeep(myItem);
                                                   resItem.body = myItem.suggestion[k]
                                                   resItem.index = j + 1;
                                                   resItem.body.voteNumb = item.voteNum;
                                                   resItem.body.commentNumb = item.commentNum;
                                                   delete resItem.suggestion;
                                                   // delete resItem.body.likes;
                                                   break;
                                               }
                                           }
                                       }
                                   } else {
                                       if(i == 5 && myItem.objectId == '-1' && myItem.id == item.subjectId) {
                                           resItem = _.cloneDeep(myItem);
                                           resItem.index = j + 1;
                                           resItem.body.voteNumb = item.voteNum;
                                           resItem.body.commentNumb = item.commentNum;
                                           // delete resItem.likes;
                                       }
                                   }

                               }
                           }
                           if(resItem) {
                               resultCell.push(resItem);
                           }
                       });
                       result.push(resultCell);

                   });

                   production.tableData = result;

                   return production;

               });

           // });

       });

    });
};

var hydrationTargets = [
    {entityType: 'staff', entityIdField: 'subjectId', hydratedField: 'staffMember'},
    {entityType: 'store', entityIdField: 'storeId', hydratedField: 'store'},
];

var entityResolver = {
    staff: function (ids) {
        return staffService.getStaffByIds(ids);
    },
    store: function (ids) {
        return storeService.getStoreByIds(ids);
    },
}

 exports.HR = function(){ 
    return constants.cacheHR ? constants.cacheHR : updateHR();
} 
exports.production = function(){ 
    return constants.cacheProduction ? constants.cacheProduction : updateProduction(); 
} 
exports.management = function(){ 
    return constants.cacheManagement ? constants.cacheManagement : updateManagement();
 }   
/** 
 * deel with half min update the cache of HR production management 
 */ 
events.on("everyHalfMinPlanTask", function () { 
    constants.cacheHR = updateHR(); 
    constants.cacheProduction = updateProduction(); 
    constants.cacheManagement = updateManagement();
 });

// var getActivityCountsTable = function () {
//     return
// }

exports.productionSearch = function(command) {
    var limitStr = "";
    var mySqlStr = "";
    var pageCount = 30;
    var type = command.type;
    if (type == "Stock Levels") {
        type = "stock";
    }
    var topic = command.topic;
    if (!type) {
        return [];
    }
    //filter result
    var myTags = [];
    myTags.push(type.toLowerCase());
    if(_.indexOf(myTags, 'style') >=0 ){
        myTags.push('suggestion')
    }
    // console.log(myTags)
    if (command.page) {
        limitStr = " limit " + command.page * pageCount + "," + pageCount;
    }
    // var mySqlStr = "select * from a_activityCounts where topic='"+type+"' and subTopic = '"+topic+"' and deleted=0 order by voteNum + commentNum desc";
    // return sql.db.query(util.format(mySqlStr)).then(res=>{
    mySqlStr += "select * from a_activityCounts where 1=1 ";
    mySqlStr += " and topic=$type ";
    var mybind = {type:type};
    if(topic){
        mySqlStr += " and subTopic = $topic ";
        if (topic == 'Suggestion') {
            mybind.topic = '';
        }else {
            mybind.topic = topic;
        }
    }
    if(command.face){
        mySqlStr += " and face = $face ";
        mybind.face = command.face;
    }
    mySqlStr += " and deleted=0 ";
    mySqlStr += " order by voteNum + commentNum desc " + limitStr;
    //
    // mySqlStr = "select * from a_activityCounts where topic='%s' and subTopic = '%s' and deleted=0 order by voteNum + commentNum desc";
    // console.log(mySqlStr)
    return sql.db.query(util.format(mySqlStr), {bind:mybind}).then(res=>{
        var raw = res;
        return newsService.getNews({tags: myTags,limit: 1000000}).then(myres=>{
            var result=[];
            raw.forEach((items,i)=>{
                var resultCell=[];
                items.forEach((item,j)=>{
                    var resItem = null;
                    //from getnews api  filter every item
                    if(myres) {
                        for (var m = 0; m < myres.length; m++) {
                            var myItem = myres[m];
                            if (myItem.bodyType != 'suggestion') {
                                if (!myItem || !item || !myItem.body || myItem.objectId != item.productId)  {
                                    continue;
                                }
                                for (var n = 0; n < myItem.body.length; n++) {
                                    var obj = myItem.body[n];
                                    if (obj.id == item.subjectId) {
                                        resItem = _.cloneDeep(myItem);
                                        resItem.index = j + 1;
                                        resItem.body = resItem.body[n];
                                        resItem.body.voteNumb = item.voteNum;
                                        resItem.body.commentNumb = item.commentNum;
                                        break;
                                    }
                                }
                                if (myItem.suggestion) {
                                    for (var k = 0; k < myItem.suggestion.length; k++) {
                                        var obj = myItem.suggestion[k];
                                        if (obj.id == item.subjectId) {
                                            resItem = _.cloneDeep(myItem);
                                            resItem.body = myItem.suggestion[k]
                                            resItem.index = j + 1;
                                            resItem.body.voteNumb = item.voteNum;
                                            resItem.body.commentNumb = item.commentNum;
                                            delete resItem.suggestion;
                                            break;
                                        }
                                    }
                                }
                            } else {
                                if(i == 5 && myItem.objectId == '-1' && myItem.id == item.subjectId) {
                                    resItem = _.cloneDeep(myItem);
                                    resItem.index = j + 1;
                                    resItem.body.voteNumb = item.voteNum;
                                    resItem.body.commentNumb = item.commentNum;
                                }
                            }

                        }
                    }
                    if(resItem) {
                        resultCell.push(resItem);
                    }
                });
                result.push(resultCell);

            });
            // production.tableData = result;
            // console.log(result[0]);
            return result[0] ? result[0] : [];

        });

    });

    // });
}

exports.mostDiscProducts = function(command) {
    var pageCount = 30;
    var limitStr = "";
    if (command.page) {
        limitStr = " limit " + command.page * pageCount + "," + pageCount;
    }
    return getMostDiscProducts(limitStr);
}
