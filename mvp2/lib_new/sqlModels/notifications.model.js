var Sequelize = require('sequelize');
var constants = require('../application/constants');

module.exports = function (db, models) {
    models.notifications = db.define('notifications', {
        cid: { type: Sequelize.UUID, primaryKey: true },
        recipientId:{ type: Sequelize.UUID, allowNull: false},
        content: {type: Sequelize.STRING(512)},
        subjectId: {type: Sequelize.STRING(36), allowNull: false},
        subjectType: {type: Sequelize.STRING(32)},
        notificationType: { type: Sequelize.STRING(256), allowNull: false },
        read: {type: Sequelize.BOOLEAN, allowNull: false, defaultValue: 0},
        createdAt:{type:Sequelize.DATE, allowNull:false},
        updatedAt:{type:Sequelize.DATE, allowNull:false},
        deleted:{type:Sequelize.BOOLEAN, allowNull:false,defaultValue:0},
        creatorId:{type:Sequelize.UUID, allowNull: true},
        commentId:{type:Sequelize.UUID, allowNull: true},
        createStoreId:{type:Sequelize.UUID, allowNull: true},
        productId:{type:Sequelize.UUID, allowNull: true},
    },{
        entityName: constants.entityTypes.notifications,
        getterMethods: {
            id: function(){
                return this.getDataValue('cid');
            }
        },
    });
};