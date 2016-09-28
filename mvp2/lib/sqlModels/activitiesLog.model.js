var Sequelize = require('sequelize');
var genUtils = require('../application/genUtils');
var constants = require('../constants');

module.exports = function (db, models) {
    models.activitiesLog = db.define('activities_log', {
        activityId: { type: Sequelize.UUID, allowNull : false },
        stackTrace: {type: Sequelize.STRING(3000)},
        json: {type: Sequelize.STRING(3000) }
    }, {
        entityName: constants.entityTypes.activity,
        getterMethods: {
            json: function () {
                return JSON.parse(this.getDataValue('json'));
            }
        },
        setterMethods: {
            json: function (val) {
                if(val == null || !val) return;
                this.setDataValue('json', JSON.stringify(val));
            }
        }
    });
};