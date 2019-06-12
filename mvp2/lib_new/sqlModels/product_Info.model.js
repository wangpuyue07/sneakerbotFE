var Sequelize = require('sequelize');
var genUtils = require('../application/genUtils');
var constants = require('../application/constants');

module.exports = function (db, models) {
    models.product_Info = db.define('product_Info', {
        cid: { type: Sequelize.UUID, primaryKey: true },
        productId: {type: Sequelize.UUID, allowNull: false},
        sku: {type: Sequelize.STRING(32), allowNull: false},
        image: {type: Sequelize.STRING(256)},
        size: {type: Sequelize.STRING(32)},
        colour: {type: Sequelize.STRING(32)},
        fit: {type: Sequelize.STRING(32)},
        brand: {type: Sequelize.STRING(32)},
        rrp: {type: Sequelize.STRING(32)}
    }, {
        entityName: constants.entityTypes.product_Info
    });
};