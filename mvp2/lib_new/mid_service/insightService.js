var sql = require('../application/providers/sqlClient');
var service = require('../application/serviceUtils');
var staffService = require('../../lib_new/base_service/staffService');
var storeService = require('../../lib_new/base_service/storeService');
var util = require('util');

var hydrationTargets = [
    { entityType: 'staff', entityIdField: 'subjectId', hydratedField: 'staffMember'},
    { entityType: 'store', entityIdField: 'storeId', hydratedField: 'store'},
];

var entityResolver = {
    staff: function (ids) {
        return staffService.getStaffByIds(ids);
    },
    store: function (ids) {
        return storeService.getStoreByIds(ids);
    },
};

exports.getTopStaff = function(){
    var query = "select c.staffId subjectId,count(*) quantity from ( " +
    " select staffId from feedback_fits where deleted = 0 " +
    " union all " +
    " select staffId from feedback_prices where deleted = 0 " +
    " union all " +
    " select staffId from feedback_styles where deleted = 0 " +
    " union all " +
    " select staffId from feedback_qualitys where deleted = 0 " +
    " union all " +
    " select staffId from feedback_stocks where deleted = 0 " +
    " union all " +
    " select staffId from newsuggestions where deleted = 0) c " +
    " group by c.staffId order by quantity desc  limit 5 ";
    // var query =  "select subjectId, count(*) as quantity from activities where action != 'commented' and deleted != 1 group by subjectId order by quantity desc limit 5;";
    return sql.db.query(query, {type: sql.db.QueryTypes.SELECT}).then(res => {
        return service.hydrateList(res, hydrationTargets, entityResolver);
    });
};

exports.getTopStaffWeekly = function(){
    var previousWeek = "select subjectId, count(*) as quantity, WEEKOFYEAR(NOW())-1 as week, 'Last Week' as description from activities where WEEKOFYEAR(createdAt)=WEEKOFYEAR(NOW())-1 group by subjectId order by quantity desc";

    var thisWeek = "select subjectId, count(*) as quantity, WEEKOFYEAR(NOW()) as week, 'This Week' as description from activities where WEEKOFYEAR(createdAt)=WEEKOFYEAR(NOW()) group by subjectId order by quantity desc";

    var allTime = "select subjectId, count(*) as quantity, '-' as week, 'All Time' as description from activities group by subjectId order by quantity desc";

    var query = util.format("(%s) UNION (%s) UNION (%s) order by quantity desc;", previousWeek, thisWeek, allTime);
    return sql.db.query(query, {type: sql.db.QueryTypes.SELECT}).then(res => {
        return service.hydrateList(res, hydrationTargets, entityResolver);
    });
};

exports.getTopStores = function(){
    var query = "select c.storeId storeId,count(*) quantity from ( " +
        " select storeId from feedback_fits where deleted = 0 " +
        " union all " +
        " select storeId from feedback_prices where deleted = 0 " +
        " union all " +
        " select storeId from feedback_styles where deleted = 0 " +
        " union all " +
        " select storeId from feedback_qualitys where deleted = 0 " +
        " union all " +
        " select storeId from feedback_stocks where deleted = 0 " +
        " union all " +
        " select storeId from newsuggestions where deleted = 0) c " +
        " group by c.storeId order by quantity desc  limit 5 ";
    // var query =  "select storeId, count(*) as quantity from activities where action != 'commented' and deleted != 1 group by storeId order by quantity desc limit 5;";
    return sql.db.query(query, {type: sql.db.QueryTypes.SELECT}).then(res => {
        var raw = res;
        return new Promise(resolve=>{
            Promise.all(res.map(item=>storeService.getStoreByIds([item.storeId]))).then(res=>{
                resolve(raw.map((item,i)=>{
                    item.store = res[i][0]
                    return item;
                }));
            })
        });

    });
};