
var Sequelize = require('sequelize');
var constants = require('../application/constants');

module.exports = function(db, models) {
    models.votes = db.define('votes',
        {
            cid: { type: Sequelize.UUID, primaryKey: true },
            staffId: {type: Sequelize.UUID, allowNull: false},
            activityId: {type: Sequelize.UUID, allowNull: false},
            active:{type:Sequelize.INTEGER, allowNull:false, defaultValue:1},
            deleted:{type:Sequelize.INTEGER, allowNull:false, defaultValue:0},
            type:{type:Sequelize.STRING(36), allowNull:false},
            storeId:{type:Sequelize.STRING(36), allowNull:false},
            createdAt:{type:Sequelize.DATE, allowNull:true},
            updatedAt:{type:Sequelize.DATE, allowNull:true}
        },{
            entityName:constants.entityTypes.votes,
        })
};