var Sequelize = require('sequelize');
var constants = require('../application/constants');

module.exports = function (db, models) {
    models.newPrincipals = db.define('newPrincipals', {
            cid: {type: Sequelize.UUID, primaryKey: true},
            username: {type: Sequelize.STRING(255), allowNull: false},
            passwordHash: {type: Sequelize.STRING(255), allowNull: false},
            googleId: {type: Sequelize.STRING(36), allowNull: true},
            type: {type: Sequelize.STRING(36), allowNull: true},
            createdAt: {type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW},
            updatedAt: {type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW},
            deleted: {type: Sequelize.INTEGER, allowNull: false, defaultValue: 0},
            active: {type: Sequelize.INTEGER, allowNull: true, defaultValue: 1},
            creatorId: {type: Sequelize.STRING(36)}
        },
        {
            entityName: constants.entityTypes.newPrincipals,
            getterMethods: {
                id: function () {
                    return this.getDataValue('cid');
                }
            }

        },
        {
            entityName: constants.entityTypes.newPrincipals
        }
    );
};