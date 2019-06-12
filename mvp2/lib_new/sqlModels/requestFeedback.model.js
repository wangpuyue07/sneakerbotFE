/**
 * Created by Anthony on 2017/4/3.
 */
var Sequelize = require('sequelize');
var constants = require('../application/constants');
var genUtils = require('../application/genUtils');

module.exports = function (db, models) {
    models.requestFeedback = db.define('requestFeedbacks', {
        cid: { type: Sequelize.UUID, primaryKey: true },
        staffId:{ type: Sequelize.UUID, allowNull: false},
        sku:{ type: Sequelize.UUID, allowNull: false},
        storeId: {type: Sequelize.STRING(36)},
        description:{type: Sequelize.STRING(2048)},
        createdAt:{type:Sequelize.DATE, allowNull:false},
        updatedAt:{type:Sequelize.DATE, allowNull:false},
        deleted:{type:Sequelize.BOOLEAN, allowNull:true,defaultValue:0}
    },{
        entityName: constants.entityTypes.requestFeedback,
        getterMethods : {


        },
        setterMethods : {

        }
    });
};