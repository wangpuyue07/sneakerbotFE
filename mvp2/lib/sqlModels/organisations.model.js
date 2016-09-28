var Sequelize = require('sequelize');
var constants = require('../constants');

module.exports = function (db, models) {
    models.organisations = db.define('organisations', {
        id: { type: Sequelize.UUID, primaryKey: true },
        domain: { type: Sequelize.STRING, allowNull: false, unique: true },
        leadUserEmail: { type: Sequelize.STRING, allowNull: false, unique: true },
        parentId: {type: Sequelize.INTEGER(2), allowNull: true },
        productUrlPrefix: {type: Sequelize.STRING(500), allowNull: false },
        productSearchIndex: {type: Sequelize.STRING(200), allowNull: false },
        feature_feedback: {type: Sequelize.BOOLEAN, defaultValue: true },
        feature_request: {type: Sequelize.BOOLEAN, defaultValue: false }
    },{
        entityName: constants.entityTypes.organisation
    });
};