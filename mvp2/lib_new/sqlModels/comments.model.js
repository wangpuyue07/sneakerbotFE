var Sequelize = require('sequelize');
var constants = require('../application/constants');
var genUtils = require('../application/genUtils');

module.exports = function (db, models) {
    models.comments = db.define('comments', {
        cid: { type: Sequelize.UUID, primaryKey: true },
        content: {type: Sequelize.STRING(2048)},
        staffId:{ type: Sequelize.UUID, allowNull: false},
        storeId:{ type: Sequelize.UUID, allowNull: false},
        activityId:{ type: Sequelize.UUID, allowNull: false},
        mentionId: {type: Sequelize.STRING(1024)},
        topic: {type: Sequelize.STRING(20), allowNull: false},
        createdAt:{type:Sequelize.DATE, allowNull:false},
        updatedAt:{type:Sequelize.DATE, allowNull:false},
        deleted:{type:Sequelize.BOOLEAN, allowNull:true,defaultValue:0}
    },{
        entityName: constants.entityTypes.comments,
        getterMethods : {
            activityId: function () {//feedbackId or suggestionId
                return this.getDataValue('activityId');
            },
            id: function () {
                return this.getDataValue('cid');
            },
            mentionId: function () {
                return genUtils.PNAN.parse(this.getDataValue('mentionId'));
            },
            storeId: function () {
                return [this.getDataValue('storeId')];
            },
            subjectId: function () {
                return this.getDataValue('staffId');
            },
            recipientId: function () {
                return this.getDataValue('staffId');
            },
            creatorId: function () {
                return this.getDataValue('storeId');
            },
            subjectType: function () {
                return "staff";
            },
            storeType: function () {
                return "store";
            }
        },
        setterMethods : {
            mentionId: function (val) {
                this.setDataValue('mentionId', genUtils.PNAN.stringify(val));
            }
        }
    });
};