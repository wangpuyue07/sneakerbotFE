var Sequelize = require('sequelize');
var constants = require('../constants');
var genUtils = require('../application/genUtils');

module.exports = function (db, models) {
    models.feedback = db.define('feedback', {
        id: { type: Sequelize.UUID, primaryKey: true },
        sku: { type: Sequelize.STRING, allowNull: false },
        staffId: { type: Sequelize.UUID, allowNull: false },
        tags: {type: Sequelize.STRING(300), allowNull: true},
        appliesTo: {type: Sequelize.STRING(300), allowNull: true},
        description: {type: Sequelize.STRING(500), allowNull: false}
    }, {
        entityName: constants.entityTypes.feedback,
        mapFromContext: ['staffId'],
        getterMethods : {
            tags: function () {
                return genUtils.PNAN.parse(this.getDataValue('tags'));
            },
            appliesTo: function () {
                return genUtils.PNAN.parse(this.getDataValue('appliesTo'));
            }
        },
        setterMethods : {
            tags: function (val) {
                this.setDataValue('tags', genUtils.PNAN.stringify(val));
            },
            appliesTo: function (val) {
                this.setDataValue('appliesTo', genUtils.PNAN.stringify(val));
            }
        }
    });
};

