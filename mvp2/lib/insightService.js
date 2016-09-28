var sql = require('../lib/application/providers/sqlClient');
var service = require('./application/serviceUtils');
var spotService = require('./spots/spotService');
var util = require('util');

var hydrationTargets = [
    { entityType: 'staff', entityIdField: 'subjectId', hydratedField: 'staffMember'},
    { entityType: 'store', entityIdField: 'storeId', hydratedField: 'store'},
];

var entityResolver = {
    staff: function (ids) {
        return spotService.getSpotsById(ids);
    },
    store: function (ids) {
        return spotService.getSpotsById(ids);
    },
};

exports.getTopStaff = function(){
    var query =  "select subjectId, count(*) as quantity from activities group by subjectId order by quantity desc limit 5;";
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
    var query =  "select storeId, count(*) as quantity from activities group by storeId order by quantity desc limit 5;";
    return sql.db.query(query, {type: sql.db.QueryTypes.SELECT}).then(res => {
        return service.hydrateList(res, hydrationTargets, entityResolver);
    });
};