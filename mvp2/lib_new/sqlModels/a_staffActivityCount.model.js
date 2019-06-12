var Sequelize = require('sequelize');
var constants = require('../application/constants');

module.exports = function (db, models) {
    models.a_staffActivityCounts = db.define('a_staffActivityCounts', {
        cid: { type: Sequelize.UUID, primaryKey: true },
        staffId:{type:Sequelize.STRING(36),allowNull:false},
        storeId:{type:Sequelize.STRING(36),allowNull:false},
        voteNum:{ type: Sequelize.INTEGER(16),defaultValue:0},
        commentNum:{ type: Sequelize.INTEGER(16),defaultValue:0},
        preRank:{ type: Sequelize.INTEGER(16),defaultValue:0},
        curRank:{ type: Sequelize.INTEGER(16),defaultValue:0},
        feedbackNum:{ type: Sequelize.INTEGER(16),defaultValue:0},
        suggestionNum:{ type: Sequelize.INTEGER(16),defaultValue:0},
        role: {type: Sequelize.STRING(64)},
        region: {type: Sequelize.STRING(64)},
        createdAt:{type:Sequelize.DATE, allowNull:false},
        updatedAt:{type:Sequelize.DATE, allowNull:false},
        deleted:{type:Sequelize.INTEGER, allowNull:true,defaultValue:0}
    },{
        entityName: constants.entityTypes.a_staffActivityCounts,
        getterMethods : {
            fdbSugNum: function () {
                return this.getDataValue('feedbackNum') + this.getDataValue('suggestionNum');
            },
            id: function () {
                return this.getDataValue('cid');
            },
            curRank: function () {
                return this.getDataValue('voteNum') + this.getDataValue('commentNum') + this.getDataValue('feedbackNum') + this.getDataValue('suggestionNum')
            }
        }
    });
};