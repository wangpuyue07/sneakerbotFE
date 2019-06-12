var Sequelize = require('sequelize');
var constants = require('../application/constants');

module.exports = function (db, models) {
    models.organisations = db.define('organisations', {
         cid: { type: Sequelize.UUID, primaryKey: true },
         domain: { type: Sequelize.STRING, allowNull: false, unique: true },
         leadUserEmail: { type: Sequelize.STRING, allowNull: false, unique: true },
         parentId: {type: Sequelize.INTEGER(2), allowNull: true },
         productUrlPrefix: {type: Sequelize.STRING(500), allowNull: false },
         productSearchIndex: {type: Sequelize.STRING(200), allowNull: false },
         feature_feedback: {type: Sequelize.BOOLEAN, defaultValue: true },
         feature_request: {type: Sequelize.BOOLEAN, defaultValue: false },
         expansion:{type: Sequelize.STRING(1000), allowNull: true},
         createdAt:{type:Sequelize.DATE, allowNull:true,defaultValue:Sequelize.NOW},
         updatedAt:{type:Sequelize.DATE, allowNull:true,defaultValue:Sequelize.NOW},
         creatorId:{type:Sequelize.STRING(255)},
         deleted:{type:Sequelize.INTEGER, allowNull:false, defaultValue:0},
    },{
        entityName: constants.entityTypes.organisation,
        getterMethods: {
            id: function(){
                return this.getDataValue('cid');
            }
        }
    });
};