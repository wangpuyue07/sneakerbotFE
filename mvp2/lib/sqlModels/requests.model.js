var Sequelize = require('sequelize');
var constants = require('../constants');
var genUtils = require('../application/genUtils');

module.exports = function (db, models) {
    models.requests = db.define('requests', {
        id: { type: Sequelize.UUID, primaryKey: true },
        sku: { type: Sequelize.STRING, allowNull: false },
        staffId: { type: Sequelize.UUID, allowNull: false },
        expiry: { type: Sequelize.DATE, allowNull: false },
        colour: { type: Sequelize.STRING, allowNull: false },
        size: { type: Sequelize.STRING, allowNull: false },
        productType: { type: Sequelize.STRING, allowNull: false },
        description: {type: Sequelize.STRING(500), allowNull: false},
        customerName: {type: Sequelize.STRING(200), allowNull: true},
        customerPhone: {type: Sequelize.STRING(50), allowNull: true}
    }, {
        entityName: constants.entityTypes.request,
        mapFromContext: ['staffId'],
    });
};

