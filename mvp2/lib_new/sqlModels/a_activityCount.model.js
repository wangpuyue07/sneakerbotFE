var Sequelize = require('sequelize');
var constants = require('../application/constants');

module.exports = function (db, models) {
    models.a_activityCounts = db.define('a_activityCounts', {
        cid: { type: Sequelize.UUID, primaryKey: true },
        voteNum:{ type: Sequelize.INTEGER(16),defaultValue:0},
        commentNum:{ type: Sequelize.INTEGER(16),defaultValue:0},
        subjectId:{type:Sequelize.STRING(36),allowNull:false},
        type:{type: Sequelize.STRING(36)},
        face:{type: Sequelize.STRING(36)},
        topic:{type: Sequelize.STRING(36)},
        subTopic:{type: Sequelize.STRING(36)},
        productId:{type: Sequelize.STRING(36)},
        region:{type: Sequelize.STRING(64)},
        createdAt:{type:Sequelize.DATE, allowNull:false},
        updatedAt:{type:Sequelize.DATE, allowNull:false},
        deleted:{type:Sequelize.INTEGER, allowNull:true,defaultValue:0},
    },{
        entityName: constants.entityTypes.a_activityCounts,
        getterMethods : {
            id: function () {
                return this.getDataValue('cid');
            }
        }
    });
};