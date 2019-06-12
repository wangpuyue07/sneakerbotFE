var Sequelize = require('sequelize');
var constants = require('../application/constants');

module.exports = function (db, models) {
    models.applies = db.define('applies', {
        cid: { type: Sequelize.UUID, primaryKey: true },
        feedbackId:{ type: Sequelize.STRING(36), allowNull: false},
        product_info_id:{ type: Sequelize.STRING(36), allowNull: false},
        type:{type: Sequelize.STRING(36)},
        createdAt:{type:Sequelize.DATE, allowNull:false},
        updatedAt:{type:Sequelize.DATE, allowNull:false},
        deleted:{type:Sequelize.BOOLEAN, allowNull:true,defaultValue:0}
    },{
        entityName: constants.entityTypes.applies
    });
};