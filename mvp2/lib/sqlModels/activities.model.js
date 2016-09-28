var Sequelize = require('sequelize');
var genUtils = require('../application/genUtils');
var constants = require('../constants');

module.exports = function (db, models) {
    models.activities = db.define('activities', {
        id: { type: Sequelize.UUID, primaryKey: true },
        parentActivityId: {type: Sequelize.UUID },
        recipientId: {type: Sequelize.STRING },

        subjectId: {type: Sequelize.STRING, allowNull: false},
        subjectType: {type: Sequelize.STRING, allowNull: false},

        action: {type: Sequelize.STRING, allowNull: false},

        objectId: {type: Sequelize.STRING, allowNull: false },
        objectType: {type: Sequelize.STRING, allowNull: false },

        subObjectId: {type: Sequelize.STRING, allowNull: true },
        subObjectType: {type: Sequelize.STRING, allowNull: true },

        bodyId: {type: Sequelize.STRING },
        bodyType: {type: Sequelize.STRING },
        comment: {type: Sequelize.STRING },
        imageUrl: {type: Sequelize.STRING, allowNull: true },

        cid: {type: Sequelize.STRING },
        likes: {type: Sequelize.STRING(3000) },
        tags: {type: Sequelize.STRING(3000) },
        mentions: {type: Sequelize.STRING(3000) },
        storeId: {type: Sequelize.STRING },
        status: {type: Sequelize.STRING },
        externalId: {type: Sequelize.STRING(1000) },
        externalUrl: {type: Sequelize.STRING(1000) }
    }, {
        entityName: constants.entityTypes.activity,
        getterMethods: {
            likes: function () {
                return genUtils.PNAN.parse(this.getDataValue('likes'));
            },
            tags: function () {
                return genUtils.PNAN.parse(this.getDataValue('tags'));
            },
            mentions: function () {
                return genUtils.PNAN.parse(this.getDataValue('mentions'));
            }
        },
        setterMethods: {
            likes: function (val) {
                this.setDataValue('likes', genUtils.PNAN.stringify(val));
            },
            tags: function (val) {
                this.setDataValue('tags', genUtils.PNAN.stringify(val));
            },
            mentions: function (val) {
                this.setDataValue('mentions', genUtils.PNAN.stringify(val));
            }
        }
    });
};